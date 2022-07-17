'use strict';

const server = require("../../server");

// dependencies

// public

module.exports = {
	'namespace': 'project',
	'get': {
		'getUserProject': getUserProjects
	},
	'post': {
		'add': postAdd,
		'removeItem': removeProject,
		'editItem': editProject
	},
	// 'models': {
	// 	'plans': modelsPlans
	// },

	// 'checkAnyDomainPlanLimitExceeded': checkAnyDomainPlanLimitExceeded,
	// 'checkDomainPlanCreatedAppLimit': checkDomainPlanCreatedAppLimit,
	// 'checkDomainPlanPublicStateCount': checkDomainPlanPublicStateCount,
	// 'checkDomainPlanStorageByteLimit': checkDomainPlanStorageByteLimit,

	// 'getDomainPlanUsage': getDomainPlanUsage,
	
	// 'getPlanByDomainId': getPlanByDomainId,
	// 'setupFreeDomainPlan': setupFreeDomainPlan
};



function postAdd(req, res, data){
	let parameters = req.body;
	let text, user_id;
	
	if(!parameters || server.isEmptyObject(parameters)) {
		return res.send({message:"invalid request parameters"});
	}
	text = parameters?.text;
	user_id = parameters?.user_id;
	return server.models.project.addproject(text, user_id).then(onAddItemSuccess).catch(server.e500(res));
	
	
	function onAddItemSuccess(response){
		return server.postResponse(res, true, 'new item added', parameters);
	}
	
}

function getUserProjects(req, res, next){
	let parameters = req.url;
	let proxy = "http://" + process.env.HOST + ":" + process.env.PORT;
	let params = (new URL(proxy + req.url)).searchParams;
    let dataType = "project";

	let user_id = params.get("id");
	
	
	if(!parameters || server.isEmptyObject(parameters)) {
		return res.send({message:"invalid request parameters"});
	}
	
	
	return server.models.project.getUserprojects(user_id).then(onGetAllItemsSuccess).catch(server.e500(res))
	
	function onGetAllItemsSuccess(result){
		return server.postResponse(res, true, 'all user items arrived', {result, dataType});
	}
}

function removeProject(req, res, next){	
	let parameters = req.body;
	let project_id;
	
	if(!parameters || server.isEmptyObject(parameters)) {
		return res.send({message:"invalid request parameters"});
	}
	project_id = parameters.id;
	
	return server.models.project.removeproject(project_id).then(onRemoveProjectSuccess).catch(server.e500(res));
	
	function onRemoveProjectSuccess(result){
		return server.postResponse(res, true, 'project removed', result);
	}
	
}

function editProject(req, res, next){
	let parameters = req.body;
	let newValue;
	
	
	if(!parameters || server.isEmptyObject(parameters)) {
		return res.send({message:"invalid request parameters"});
	}
	newValue = parameters.newValue;
	return server.models.project.editproject(newValue).then(onEditItemSuccess).catch(server.e500(res));
	
	function onEditItemSuccess(result){
		return server.postResponse(res, true, 'project edited', result);
	}
}