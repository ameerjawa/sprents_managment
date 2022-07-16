'use strict';

const server = require("../../server");

// dependencies

// public

module.exports = {
	'namespace': 'item',
	'get': {
		'getUserItems': getUserItems
	},
	'post': {
		'add': postAdd,
		'removeItem': removeItem,
		'editItem': editItem
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
	return server.models.item.addItem(text, user_id).then(onAddItemSuccess).catch(server.e500(res));
	
	
	function onAddItemSuccess(response){
		return server.postResponse(res, true, 'new item added', parameters);
	}
	
}

function getUserItems(req, res, next){
	let parameters = req.url;
	let proxy = "http://" + process.env.HOST + ":" + process.env.PORT;
	let params = (new URL(proxy + req.url)).searchParams;

	let user_id = params.get("id");
	
	
	if(!parameters || server.isEmptyObject(parameters)) {
		return res.send({message:"invalid request parameters"});
	}
	
	
	return server.models.item.getUserItems(user_id).then(onGetAllItemsSuccess).catch(server.e500(res))
	
	function onGetAllItemsSuccess(result){
		return server.postResponse(res, true, 'all user items arrived', result);
	}
}

function removeItem(req, res, next){	
	let parameters = req.body;
	let item_id;
	
	if(!parameters || server.isEmptyObject(parameters)) {
		return res.send({message:"invalid request parameters"});
	}
	item_id = parameters.id;
	
	return server.models.item.removeItem(item_id).then(onRemoveItemSuccess).catch(server.e500(res));
	
	function onRemoveItemSuccess(result){
		return server.postResponse(res, true, 'item removed', result);
	}
	
}

function editItem(req, res, next){
	let parameters = req.body;
	let newValue;
	
	
	if(!parameters || server.isEmptyObject(parameters)) {
		return res.send({message:"invalid request parameters"});
	}
	newValue = parameters.newValue;
	return server.models.item.editItem(newValue).then(onEditItemSuccess).catch(server.e500(res));
	
	function onEditItemSuccess(result){
		return server.postResponse(res, true, 'item edited', result);
	}
}