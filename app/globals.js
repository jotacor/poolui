'use strict';

angular.module('pool.globals', [])

.factory('GLOBALS', function() {
	return {
		pool_name: "micolabs.com",
		api_url : 'http://xmrpool.micolabs.com/api',
		api_refresh_interval: 5000,
		app_update_interval: 5*60000
	};
});
