var angular = require('angular');

var routes = require('/route/routes.js');



var app = angular.module('lil', [
	'ui.router',
	'lilPage',
	'lilImage'
]);

app.config(function ($sceDelegateProvider, $httpProvider) {
	$sceDelegateProvider.resourceUrlWhitelist(['**']);	
});

app.config(routes);