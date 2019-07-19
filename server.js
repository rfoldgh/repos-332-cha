var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
//may have called the public folder
var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

var Item = require('./models/item');
//calls models item
//Express get//
app.get('/items', function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });
});

//calls models item
//Express post//
app.post('/items', function(req, res) {
    if(!('name' in req.body)){
        return res.sendStatus(400);
    }
    Item.create({
        name: req.body.name
    }, function(err, item) {
        if (err) {
            // console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

//calls models item
//Express put//

app.put('/items/:id', function(req, res) {
    if(!('name' in req.body)){
        return res.status(400).json({message:'Not a valid id'})
}
    Item.findOneAndUpdate({
        
        _id: req.params.id
        
    }, {$set:{name:req.body.name}},function(err, item) {
        if(err){
            // console.log(err);
            return res.status(404).json({
                message: 'Item not found'
            });
        }
        res.status(200).json(item)
            })

    
});
//calls models item
//Express delete//

app.delete('/items/:id', function(req, res) {
    Item.remove({
        
        _id: req.params.id
        
    }, function(err, item) {
        if(err){
            // console.log(err);
            return res.status(404).json({
                message: 'Item not found'
            });
        }
        res.status(200).json(item)
            })

    
});
//calls
//Express use//

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;