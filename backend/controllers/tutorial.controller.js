'use strict';

const { logger } = require("../../server");

// dependencies

// public

module.exports = {
	'namespace': 'tutorial',
	// 'get': {
	// 	'index': getIndex
	// },
	'post': {
		'add': postAdd
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
	res.json({ message: "added ameer" });
}