'use strict';

const server = require("../../server");

// dependencies

// public

module.exports = {
	'namespace': 'user',
	// 'get': {
	// 	'index': getIndex
	// },
	'post': {
		'signup': signUp,
		'login': login,
		'editDetails': editDetails
	},


};


function signUp(req, res, next){ 
	let parameters = req.body;
	let name, email, password;
	server.logger.log(parameters);
	if(!parameters || isEmptyObject(parameters)) {
		return res.send({message:"invalid request parameters"});
	}
	name = parameters?.name;
	email = parameters?.email;
	password = parameters?.password;
	
	return server.models.user.register(name, email, password).then(onUserLoginSuccess).catch(server.e500(res));
	
	

	// implement signing up and adding new user to the database
	
	
	function onUserLoginSuccess(result){
		if(result.error) {
			return server.postResponse(res, true, result.message, parameters);
		}
		return server.postResponse(res, true, 'new user registered', parameters);

		// const user = result;
		// server.updateSession(req, {
		// 	'user': req.session.user,
		// 	'domain': domain
		// })
		// 	.then(onSessionUpdated)
		// 	.catch(server.e500(res));

		// function onSessionUpdated() {
		// 	return server.postResponse(res, true, 'new user registered, domain created', responseUser);
		// }
	}

	
}

function login(req, res, next){
	let parameters = req.body;
	let email, password;
	
	if(!parameters || server.isEmptyObject(parameters)) {
		return res.send({message:"invalid request parameters"});
	}
	email = parameters?.email;
	password = parameters?.password;
	
	return server.models.user.login(email, password).then(onUserLoginRequestSuccess).catch(server.e500(res));
	
	

	// implement signing up and adding new user to the database
	
	
	function onUserLoginRequestSuccess(result){
		parameters["result"] = !result.error;
		parameters["user"] = result?.user;
		return server.postResponse(res, true, result.message, parameters);			
	}
}

function isEmptyObject(obj) {
	return Object.keys(obj).length === 0;
}


function editDetails(req, res, next){
	let parameters = req.body;
	let id, name, email, password;
	
	if(!parameters || server.isEmptyObject(parameters)) {
		return res.send({message:"invalid request parameters"});
	}
	
	id = parameters?.user_id;
	name = parameters?.name;
	email = parameters?.email;
	password = parameters?.password;
	
	return server.models.user.editDetails(id, name, email, password).then(onEditUserDetailsRequestSuccess).catch(server.e500(res));
	
	

	// implement signing up and adding new user to the database
	
	
	function onEditUserDetailsRequestSuccess(result){
		parameters["result"] = !result.error;
		parameters["user"] = result?.user;
		return server.postResponse(res, true, result.message, parameters);			
	}
	
	
}

