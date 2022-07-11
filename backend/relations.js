const server = require('../server/index');

module.exports = relations;

function relations() {
	const m = server.models;

	// m.user.belongsTo(m.adminRole, { 'foreignKey': 'admin_role_id' });
	// m.adminRole.hasMany(m.user, { 'foreignKey': 'admin_role_id' });

	// //deprecated
	// //m.domain.belongsTo(m.plan, { 'foreignKey': 'plan_id' });
	// //m.plan.hasMany(m.domain, { 'foreignKey': 'plan_id' });

	// m.publicStateEvent.belongsTo(m.publicState, { 'foreignKey': 'public_state_id' });
	// m.publicState.hasMany(m.publicStateEvent, { 'foreignKey': 'public_state_id' });
	// m.publicStateEvent.belongsTo(m.application, { 'foreignKey': 'application_id' });
	// m.application.hasMany(m.publicStateEvent, { 'foreignKey': 'application_id' });

	// m.user.hasMany(m.paymentMethod, { 'foreignKey': 'user_id' });
	// m.paymentMethod.belongsTo(m.user, { 'foreignKey': 'user_id' });

	// m.domain.hasMany(m.application, { 'foreignKey': 'domain_id' });
	// m.application.belongsTo(m.domain, { 'foreignKey': 'domain_id' });

	// m.application.hasMany(m.pageGroup, { 'foreignKey': 'application_id' });
	// m.pageGroup.belongsTo(m.application, { 'foreignKey': 'application_id' });

	// m.form.hasMany(m.formField, { 'foreignKey': 'form_id' });
	// m.formField.belongsTo(m.form, { 'foreignKey': 'form_id' });

	// m.realtimeEvent.hasMany(m.realtimeEventField, { 'foreignKey': 'realtime_event_id' });
	// m.realtimeEventField.belongsTo(m.realtimeEvent, { 'foreignKey': 'realtime_event_id' });

	// m.containerEvent.hasMany(m.containerEventField, { 'foreignKey': 'container_event_id' });
	// m.containerEventField.belongsTo(m.containerEvent, { 'foreignKey': 'container_event_id' });

	// m.fontFamily.hasMany(m.fontFamilySub, { 'foreignKey': 'font_family_id' });
	// m.fontFamilySub.belongsTo(m.fontFamily, { 'foreignKey': 'font_family_id' });

	// m.user.hasMany(m.previousPasswords, { 'foreginKey' : 'user_id'});

	// manyToMany(
	// 	m.domain, 'domain_id',
	// 	m.user, 'user_id',
	// 	m.domainsUsers
	// );

	// manyToMany(
	// 	m.domain, 'domain_id',
	// 	m.hostingClientType, 'hosting_client_type_id',
	// 	m.domainsHostingClientTypes
	// );

	// m.screen.hasOne(m.seoTraitSet, { 'foreignKey': 'screen_id', 'as': 'SeoTraitSet' });
	// m.seoTraitSet.belongsTo(m.screen, { 'foreignKey': 'screen_id' });
	// m.asset.hasOne(m.seoTraitSet, { 'foreignKey': 'thumbnail_asset_id', 'as': 'ThumbnailAsset' });
	// m.seoTraitSet.belongsTo(m.asset, { 'foreignKey': 'thumbnail_asset_id', 'as': 'ThumbnailAsset' });

	// //uploads, uploaded forms and events
	// m.formField.hasMany(m.uploadFormField, { 'foreignKey': 'form_field_id' });
	// m.uploadFormField.belongsTo(m.formField, { 'foreignKey': 'form_field_id' });

	// m.form.hasMany(m.uploadForm, { 'foreignKey': 'form_id' });
	// m.uploadForm.belongsTo(m.form, { 'foreignKey': 'form_id' });

	// m.realtimeEventField.hasMany(m.uploadRealtimeEventField, { 'foreignKey': 'realtime_event_field_id' });
	// m.uploadRealtimeEventField.belongsTo(m.realtimeEventField, { 'foreignKey': 'realtime_event_field_id' });

	// m.realtimeEvent.hasMany(m.uploadRealtimeEvent, { 'foreignKey': 'realtime_event_id' });
	// m.uploadRealtimeEvent.belongsTo(m.realtimeEvent, { 'foreignKey': 'realtime_event_id' });

	// m.containerEventField.hasMany(m.uploadContainerEventField, { 'foreignKey': 'container_event_field_id' });
	// m.uploadContainerEventField.belongsTo(m.containerEventField, { 'foreignKey': 'container_event_field_id' });

	// m.containerEvent.hasMany(m.uploadContainerEvent, { 'foreignKey': 'container_event_id' });
	// m.uploadContainerEvent.belongsTo(m.containerEvent, { 'foreignKey': 'container_event_id' });

	// m.uploadForm.hasMany(m.uploadFormField, { 'foreignKey': 'upload_form_id' });
	// m.uploadFormField.belongsTo(m.uploadForm, { 'foreignKey': 'upload_form_id' });

	// m.uploadRealtimeEvent.hasMany(m.uploadRealtimeEventField, { 'foreignKey': 'upload_realtime_event_id' });
	// m.uploadRealtimeEventField.belongsTo(m.uploadRealtimeEvent, { 'foreignKey': 'upload_realtime_event_id' });

	// m.uploadContainerEvent.hasMany(m.uploadContainerEventField, { 'foreignKey': 'upload_container_event_id' });
	// m.uploadContainerEventField.belongsTo(m.uploadContainerEvent, { 'foreignKey': 'upload_container_event_id' });

	// m.uploadDerivativeState.hasOne(m.uploadForm, { 'foreignKey': 'upload_derivative_state_id' });
	// m.uploadForm.belongsTo(m.uploadDerivativeState, { 'foreignKey': 'upload_derivative_state_id' });

	// m.uploadDerivativeState.hasOne(m.uploadRealtimeEvent, { 'foreignKey': 'upload_derivative_state_id' });
	// m.uploadRealtimeEvent.belongsTo(m.uploadDerivativeState, { 'foreignKey': 'upload_derivative_state_id' });

	// m.uploadDerivativeState.hasOne(m.uploadContainerEvent, { 'foreignKey': 'upload_derivative_state_id' });
	// m.uploadContainerEvent.belongsTo(m.uploadDerivativeState, { 'foreignKey': 'upload_derivative_state_id' });

	// m.upload.hasOne(m.uploadDerivativeState, { 'foreignKey': 'upload_id' });
	// m.uploadDerivativeState.belongsTo(m.upload, { 'foreignKey': 'upload_id' });

	// m.user.hasMany(m.upload, { 'foreignKey': 'user_id' });
	// m.upload.belongsTo(m.user, { 'foreignKey': 'user_id' });

	// //devices & OS
	// m.clientDevice.hasMany(m.upload, { 'foreignKey': 'client_device_id' });
	// m.upload.belongsTo(m.clientDevice, { 'foreignKey': 'client_device_id' });

	// m.hostingClientType.hasMany(m.clientDevice, { 'foreignKey': 'hosting_client_type_id' });
	// m.clientDevice.belongsTo(m.hostingClientType, { 'foreignKey': 'hosting_client_type_id' });

	// m.user.hasMany(m.clientDevicesDomains, { 'foreignKey': 'latest_user_id' });
	// m.clientDevicesDomains.belongsTo(m.user, { 'foreignKey': 'latest_user_id' });

	// m.clientDevice.hasMany(m.clientDevicesDomains, { 'foreignKey': 'client_device_id' });
	// m.clientDevicesDomains.belongsTo(m.clientDevice, { 'foreignKey': 'client_device_id' });

	// m.application.hasMany(m.clientDevicesDomains, { 'foreignKey': 'application_id' });
	// m.clientDevicesDomains.belongsTo(m.application, { 'foreignKey': 'application_id' });

	// m.application.hasMany(m.usersApplicationRoles, { 'foreignKey': 'application_id' });
	// m.usersApplicationRoles.belongsTo(m.application, { 'foreignKey': 'application_id' });

	// // manyToMany(
	// // 	m.domain, 'domain_id',
	// // 	m.clientDevice, 'client_device_id',
	// // 	m.clientDevicesDomains
	// // );

	// //ip-addresses
	// m.ipAddress.hasMany(m.upload, { 'foreignKey': 'ip_address_id' });
	// m.upload.belongsTo(m.ipAddress, { 'foreignKey': 'ip_address_id' });

	// //registration service
	// m.registrationServiceGroup.belongsTo(m.domain, { 'foreignKey': 'domain_id' });

	// m.registrationServiceGroup.hasMany(m.registrationServiceGroupValidation, { 'as': 'validations', 'foreignKey': 'group_id' });
	// m.registrationServiceGroupValidation.belongsTo(m.registrationServiceGroup, { 'foreignKey': 'group_id' });

	// m.registrationServiceGroup.hasMany(m.registrationServiceUser, { 'as': 'users', 'foreignKey': 'group_id' });
	// m.registrationServiceUser.belongsTo(m.registrationServiceGroup, { 'foreignKey': 'group_id' });

	// m.registrationServiceFlow.hasMany(m.registrationServiceUser, {'foreignKey': 'flow_id'});
	// m.registrationServiceUser.belongsTo(m.registrationServiceFlow, { 'foreignKey': 'flow_id' });

	// manyToMany(
	// 	m.registrationServiceGroup, 'registration_service_group_id',
	// 	m.registrationServiceFlow, 'registration_service_flow_id',
	// 	m.registrationServiceGroupsFlows
	// );

	// manyToMany(
	// 	m.domain, 'domain_id',
	// 	m.registrationServiceFlow, 'registration_service_flow_id',
	// 	m.registrationServiceFlowsDomains
	// );

	// //payments & subscriptions
	// m.subscription.belongsTo(m.domain, { 'foreignKey': 'domain_id' });
	// m.domain.hasMany(m.subscription, { 'foreignKey': 'domain_id' });
	
	// m.paymentMethod.hasOne(m.payment, { 'foreignKey': 'payment_method_id' });
	// m.payment.belongsTo(m.paymentMethod, { 'foreignKey': 'payment_method_id' });
	
	// m.payment.hasOne(m.paymentTransaction, { 'foreignKey': 'payment_id' });
	// m.paymentTransaction.belongsTo(m.payment, { 'foreignKey': 'payment_id' });

	// m.payment.hasMany(m.subscriptionCharge, { 'foreignKey': 'payment_id' });
	// m.subscriptionCharge.belongsTo(m.payment, { 'foreignKey': 'payment_id' });
	
	// m.subscription.hasMany(m.subscriptionCharge, { 'foreignKey': 'subscription_id' });
	// m.subscriptionCharge.belongsTo(m.subscription, { 'foreignKey': 'subscription_id' });

	// m.subscription.hasOne(m.subscriptionPlan, { 'foreignKey': 'subscription_id' });
	// m.subscriptionPlan.belongsTo(m.subscription, { 'foreignKey': 'subscription_id' });

	// m.domain.belongsTo(m.smtp, { 'foreignKey': 'smtp_id' });

	// m.domain.belongsTo(m.passwordSettings, { 'foreignKey': 'password_settings_id',});

	// m.domain.hasMany(m.analyticDashboard, { 'foreignKey': 'domain_id' });
	// m.analyticDashboard.belongsTo(m.domain, { 'foreignKey': 'domain_id' });
	
	// //taxonomies
	// m.taxonomyType.hasMany(m.taxonomyTerm, { 'foreignKey': 'taxonomy_type_id' });
	// m.taxonomyTerm.belongsTo(m.taxonomyType, { 'foreignKey': 'taxonomy_type_id' });
	
	// m.taxonomyTerm.hasMany(m.taxonomy, { 'foreignKey': 'taxonomy_term_id' });
	// m.taxonomy.belongsTo(m.taxonomyTerm, { 'foreignKey': 'taxonomy_term_id' });
}

function manyToMany(m1, m1_fk, m2, m2_fk, mp) {
	m1.belongsToMany(m2, {
		'through': mp,
		'foreignKey': m1_fk
	});
	m2.belongsToMany(m1, {
		'through': mp,
		'foreignKey': m2_fk
	});
}
