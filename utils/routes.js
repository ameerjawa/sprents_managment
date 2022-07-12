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
    
    app.get("/add_tutorial", SC.tutorial.post.add);
  
    // All other GET requests not handled before will return our React app
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });

	// app.get('/redirect/*', SC.guest.get.redirect);

	// app.post('/weather/get_current', SC.weather.post.getCurrent);
}