global.DATABASE_URL = 'mongodb://Holmberg18:Patience1!@ds147975.mlab.com:47975/thinkful-jon';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
    

   it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });
    
    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})//you can put something else rather than 'name' to check if val_id object. 
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                // console.log(storage);
                // res.body.name.should.equal('Kale');
                // storage.items.should.be.a('array');
                // storage.items.should.have.length(4);
                // storage.items[3].should.be.a('object');
                // storage.items[3].should.have.property('id');
                // storage.items[3].should.have.property('name');
                // storage.items[3].id.should.be.a('number');
                // storage.items[3].name.should.be.a('string');
                // storage.items[3].name.should.equal('Kale');
                done();
            });
    });
    
        it('should get 400 when POST with no name', function(done) {
        chai.request(app)
            .post('/items')
            .end(function(err, res) {
                should.not.equal(err, null);
                 res.should.have.status(400);
                done();
            });
    });
    
        //Add two more ITs for DELETE and PUT, one or two check errors. For example, if you're returning a 404 request or 500. If delete does not exist, 
        //add a test that checks if the item does not exist as well. A test to check for invalid id name (look at line 38). Try to make it run locally rather
        //than just in c9. 
     it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                console.log(res.body);
                res.body.should.have.length(4);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });
    
     it('should delete an item on DELETE', function(done) {
         
         chai.request(app)
            .get('/items/')
            .end(function(err, res) {
                var itemId = res.body[0]._id;
                
                 chai.request(app)
                .delete('/items/'+itemId+'')
                .end(function(err, res) {
                     should.equal(err, null)
                     res.should.have.status(200)
                     res.should.be.json;
                     
                     chai.request(app).get('/items/').end(function(err, res){
                         res.body.length.should.equal(3);
                     });
                     done();
            });
            
        });
    });
    
    
    
     
     it("If item[id] doesn't exist, check if 404", function(done) {
        chai.request(app)
            .delete('/items/10')
            .end(function(err, res) {
                should.not.equal(err, null);
                res.should.have.status(404);
                // storage.items[2].should.be.a('object');
                // storage.items[2].should.have.property('id');
                // storage.items[2].should.have.property('name');
                // storage.items[0].id.should.be.a('number');
                // storage.items[0].name.should.be.a('string');
                // should.not.exist(storage.items[1]);
                done();
            });
    });
    
    
    
    
     it('should edit an item on PUT', function(done) {
         
         
          chai.request(app)
            .get('/items/')
            .end(function(err, res) {
                var itemId = res.body[0]._id;
                
                 chai.request(app)
                 .put('/items/'+itemId+'')
                 .send({'name': 'Spinach'})
                .end(function(err, res) {
                     should.equal(err, null)
                     res.should.have.status(200)
                     res.should.be.json;
                     
                     chai.request(app).get('/items/').end(function(err, res){
                         res.body.length.should.equal(3);
                     });
                     done();
            });
            
        });
        // chai.request(app)
        //     .put('/items/4')
        //     .send({'name': 'Spinach'})//you can put something else rather than 'name' to check if valid object. 
        //     .end(function(err, res) {
        //         should.equal(err, null);
        //         res.should.have.status(200);
        //         res.should.be.json;
        //         res.body.should.be.a('object');
        //         res.body.should.have.property('name');
        //         res.body.should.have.property('_id');
        //         res.body.name.should.be.a('string');
        //         res.body._id.should.be.a('string');
                // console.log(storage);
                // res.body.name.should.equal('Spinach');
                // storage.items.should.be.a('array');
                // storage.items.should.have.length(4);
                // storage.items[3].should.be.a('object');
                // storage.items[3].should.have.property('id');
    //             // storage.items[3].should.have.property('name');
    //             // storage.items[3].id.should.be.a('number');
    //             // storage.items[3].name.should.be.a('string');
    //             // storage.items[3].name.should.equal('Spinach');
    //             done();
    //         });
    });


it('should return a 400 if a nonvalid name is passed for put', function(done) {
        chai.request(app)
        .put('/items/4')
        .send({})
        .end(function(err, res) {
                // var itemId = res.body[0]._id;
                should.not.equal(err, null);
                res.should.have.status(400);
                // storage.items[2].should.be.a('object');
                // storage.items[2].should.have.property('id');
                // storage.items[2].should.have.property('name');
                // storage.items[0].id.should.be.a('number');
                // storage.items[0].name.should.be.a('string');
                // should.not.exist(storage.items[1]);
                done();
            });
    });
    
       it('Should return a 404 when cant find an id during put', function(done) {
         
         
          chai.request(app)
                 .put('/items/5')
                 .send({'name': 'Spinach'})
                 .end(function(err, res) {
                     should.not.equal(err, null)
                     res.should.have.status(404)
                     res.should.be.json;
                     });
                     done();
            });
        
});
