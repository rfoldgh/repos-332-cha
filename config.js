exports.DATABASE_URL =  'mongodb://Holmberg18:Patience1!@ds147975.mlab.com:47975/thinkful-jon';//process.env.DATABASE_URL ||
//in a real world setting you’d have that set to a local variable, but assuming this is just a learning project, that should work
//                       global.DATABASE_URL ||
//                       (process.env.NODE_ENV === 'production' ?
                           
                            // // 'mongodb://localhost/shopping-list' :
                            // 'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;