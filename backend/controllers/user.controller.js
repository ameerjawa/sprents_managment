'use strict';

const { logger } = require("../../server");

// dependencies

// public

module.exports = {
	'namespace': 'user',
	// 'get': {
	// 	'index': getIndex
	// },
	'post': {
		'signup': signUp
	},


};


function signUp(req, res, next){ 
    logger.log(req.body);
}


