const fs = require('fs');
const path = require('path');
const server = require('../server/index');

var SC;

module.exports.routes = routes;

function routes(app) {
	SC = server.controllers;
    // Handle GET requests to /api route
    // app.get("/api", (req, res) => {
    //  res.json({ message: "Hello from server!" });
    // });
    app.get('/', (req, res) => {
        res.json({message:"hello from server"});
    });
    
    app.get("/api/add_tutorial", SC.tutorial.post.add);
    
    
    
    app.post("/signup", SC.user.post.signup);
    
    app.post("/login",SC.user.post.login);
  
    // All other GET requests not handled before will return our React app
    if(!process.env.DEVELOPMENT) {
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
        });     
    }
    
}