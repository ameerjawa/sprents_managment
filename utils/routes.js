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
    
    app.get("/get_user_items", SC.item.get.getUserItems);
    
    app.post("/add_item", SC.item.post.add);
    app.post("/remove_item", SC.item.post.removeItem);
    app.post("/edit_item", SC.item.post.editItem);
    
    app.get("/get_user_projects", SC.project.get.getUserProject);
    
    app.post("/add_project", SC.project.post.add);
    app.post("/remove_project", SC.project.post.removeItem);
    app.post("/edit_project", SC.project.post.editItem);
    
    app.post("/signup", SC.user.post.signup);
    app.post("/login",SC.user.post.login);
    app.post("/edit_user_details", SC.user.post.editDetails);
  
    // All other GET requests not handled before will return our React app
    if(!process.env.DEVELOPMENT) {
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
        });     
    }
    
}