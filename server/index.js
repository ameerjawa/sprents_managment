// server/index.js
const path = require('path');
const express = require("express");
require('dotenv').config();
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const fs = require('fs-extra');
const relations = require("../backend/relations");
const routes = require("../utils/routes");



// globals
global.BASE_DIR = path.dirname(__filename).slice(0,-7);


// Setup - Logger
const logger = require('../utils/logger');
module.exports.logger = logger;

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
	app.use(express.static(path.resolve(__dirname, '../client/build')));
	
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

