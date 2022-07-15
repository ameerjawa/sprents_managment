// server/index.js
const path = require('path');
const express = require("express");
var bodyParser = require('body-parser')
require('dotenv').config();
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const fs = require('fs-extra');
const relations = require("../backend/relations");
const routes = require("../utils/routes");
const cors = require('cors');



module.exports.postResponse = postResponse;
module.exports.e500 = e500;



// globals
global.BASE_DIR = path.dirname(__filename).slice(0,-7);


// Setup - Logger
const logger = require('../utils/logger');
module.exports.logger = logger;
module.exports.isEmptyObject = isEmptyObject;




// Paths

const modelsPath = path.join(BASE_DIR, 'backend/models');
const controllersPath = path.join(BASE_DIR, 'backend/controllers');


// Global Namespace

var models = {};
var controllers = {};



// variables 

let serverLoaded = false;



const PORT = process.env.PORT || 3001;

const app = express();

// Timer

var timeStart = new Date().getTime();
logger.log('Starting server... (' + (new Date().getTime() - timeStart) + 'ms)');




// setup databases


let sequelize;
let resetDatabaseTables = false;
const db = {};



if(dbConfig.dialect.toLowerCase() === 'mysql') {
	let Mysql;
	try{
		Mysql = require('mysql2');
	}
	catch(e) {
		logger.warn(`Could not find the mysql lib - the database ${dbConfig.DB} will need to have been created manually`);
    onDbReady()
	}

	if(Mysql) {
		const mysqlConnection = Mysql.createConnection({
			'user': dbConfig.USER,
			'password': dbConfig.PASSWORD,
			'host': dbConfig.HOST,
			'port': dbConfig.PORT
		});
		mysqlConnection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`, (err, res) => {
			logger.debug('[mysqlConnection]', err, res);
			mysqlConnection.close();
      onDbReady();
		});
	}
}

function onDbReady(){
    sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
          max: dbConfig.pool.max,
          min: dbConfig.pool.min,
          acquire: dbConfig.pool.acquire,
          idle: dbConfig.pool.idle
        },
        logging: SQL_LOGGER,
			  define: {
				underscored: true
			  },
		  	operatorsAliases: false
      });     
      db.Sequelize = Sequelize;
      if(sequelize) {
        db.sequelize = sequelize;
      }

      if(db.sequelize) {
          db.sequelize
          .authenticate()
          .then(onDatabaseAuthSuccess)
          .catch(onDatabaseAuthFail);
      } 
      
      function SQL_LOGGER(query) {
        if(
          //true || // disable all
          !serverLoaded ||
          query.indexOf('`sessions`') !== -1 ||
          query.indexOf('SHOW INDEX FROM') !== -1 ||
          query.indexOf('CREATE TABLE') !== -1
        ) {
          return;
        }
        
        logger.debug('\x1b[36m' + query + '\x1b[0m ' + '\n');
      }
      
}

function onDatabaseAuthSuccess(){
    loadModels({ 'resetTables': resetDatabaseTables, })
    .then(onModelsLoaded)
    .catch(onModelLoadingFailed);

  function onModelsLoaded() {
    relations();

    loadControllers()
      .then(initExpress)
      .catch(internalCatch(null));
  }

  function onModelLoadingFailed(err) {
    logger.error('Model Loading Failed', err);
    throw new Error('E_MODEL');
  }
}

function onDatabaseAuthFail(err){
  logger.error('\x1b[41m' + 'INIT ERROR' + '\x1b[0m' + ': Can\'t connect to the database.', err);

	process.exit(48);
}

function isEmptyObject(obj) {
	return Object.keys(obj).length === 0;
}

function loadModels(attr) {
	logger.log('loading models... (' + (new Date().getTime() - timeStart) + 'ms)');
	return new Promise(modelsLoader);
	
	function modelsLoader(resolve, reject) {
		var modelFiles = fs.readdirSync(modelsPath);
		var remaining = modelFiles.length;
		modelFiles.forEach(loadModel);
		
		function loadModel(filename) {
			var modelFile = require(modelsPath + '/' + filename);
			if(modelFile.namespace && modelFile.model) {
				var model = modelFile.model(sequelize, Sequelize);
				
				var force = (attr.resetTables &&
					(typeof attr.resetTables == 'boolean' ||
					attr.resetTables[modelFile.namespace]))
					|| false;
				
				model.sync({
					'force': force
				}).then(onModelLoaded).catch(internalCatch(null));
			}
			else {
				onCompleted();
			}
			
			function onModelLoaded(result) {
				logger.log('loaded ' + modelFile.namespace +
					' model (' + filename + ')');
				models[modelFile.namespace] = model;

				if(force && modelFile.seeder) {
					logger.log('launched ' + modelFile.namespace +
						' seeder');
					modelFile.seeder(model);
				}
				
				onCompleted();
			}
		}
		
		function onCompleted() {
			remaining--;
			if(remaining <= 0) {
				logger.log("asdasda",models);
				module.exports.models = models;
				resolve();
			}
		}
	}
}

// Setup - Controllers

function loadControllers(attr) {
	logger.log('loading controllers... (' + (new Date().getTime() - timeStart) + 'ms)');
	return new Promise(controllersLoader);
	
	function controllersLoader(resolve, reject) {
		var controllerFiles = fs.readdirSync(controllersPath);
		var remaining = controllerFiles.length;
		controllerFiles.forEach(loadController);
		
		function loadController(filename) {
			var controller = require(controllersPath + '/' + filename);
			
			logger.log('loaded ' + controller.namespace +
				' controller (' + filename + ')');
			controllers[controller.namespace] = controller;
			onCompleted();
		}
		
		function onCompleted() {
			remaining--;
			if(remaining <= 0) {
				module.exports.controllers = controllers;
				resolve();
			}
		}
	}
}

function initExpress(){
	
	// Have Node serve the files for our built React app
	if(!process.env.DEVELOPMENT) {
		app.use(express.static(path.resolve(__dirname, '../client/build')));
	}
	
	app.use(cors());
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));

	// parse application/json
	app.use(bodyParser.json());
	routes.routes(app);
	app.listen(PORT, () => {
		serverLoaded = true;
		console.log(`Server listening on ${PORT}`);
	});
}

function internalCatch(callback) {
	var stream = [];
	for(var i = 1; i < arguments.length; i++) {
		stream.push(arguments[i]);
	}
	
	return catcher;
	
	function catcher(err) {

		logger.error('\x1b[41m' + 'SERVER ERROR' + '\x1b[0m: ', err);
		if(callback) {
			callback.apply(null, stream);
		}
	}
}

function postResponse(res, success, message, data) {
	if(!success) {
		res.status(403);
	}
	res.send({
		'success': success,
		'message': message,
		'data': data
	});

}

function errorCatch(callback) {
	var stream = [];
	for(var i = 1; i < arguments.length; i++) {
		stream.push(arguments[i]);
	}
	
	return catcher;
	
	function catcher(err) {
		if(err && err.stack) {
			if(
				err.stack.indexOf('SequelizeConnectionRefusedError') !== -1 &&
				err.stack.indexOf('ECONNREFUSED') !== -1
			) {
				logger.error('\x1b[41m' + 'ERROR' + '\x1b[0m: ' +
					'ECONNREFUSED: Database connection unavailable');
			}
			else {
				logger.error('\x1b[41m' + 'ERROR' + '\x1b[0m: ' + err.stack);
				// + err.stack.replace(/ \((.*?)app(\\|\/)/g, ' (..'));
			}
		}
		else {
			logger.error('\x1b[41m' + 'ERROR' + '\x1b[0m: ', err);
		}
		
		callback.apply(null, stream);
	}
}

function errorPage(res, errorCode, { title, description } = {}) {
	res.status(errorCode);

	if(res.req.method !== 'GET') {
		// express layouts module supports only GET ..
		return res.send({
			'success': false,
			'message': title || null,
			'data': {
				'code': errorCode,
				'description': description || null
			}
		});
	}

	if(title && description) {
		res.send({title, description});
	}
	
	res.send({title: "Error"});


	// function onRender(err, html) {
	// 	if(err) {
	// 		return onError(err);
	// 	}
	// 	res.send(html);
	// }

	// function onError(err) {
	// 	logger.error(err);
	// 	res.render('error/customError', {
	// 		'title': '(500) Internal Server Error',
	// 		'description': `The server encountered an unexpected condition which prevented it from fulfilling the request. (code ${errorCode})`,
	// 		'layout': 'error/errorLayout'
	// 	});
	// }
}

function e500(res) {
	return errorCatch(errorPage, res, 500);
}

