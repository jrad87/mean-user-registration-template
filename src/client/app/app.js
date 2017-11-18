import angular from 'angular';

require('angular-route');
require('angular-cookies');
angular.module('app', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', function($routeProvider){
	$routeProvider
	    .when('/', {templateUrl: 'partials/_index.html'})
    }]);

const serviceContext = require.context('./services', true, /\.js$/);
const factoryContext = require.context('./factories',true, /\.js$/);
const controllerContext = require.context('./controllers', true, /\.js$/);

serviceContext.keys().forEach(function(file){
    serviceContext(file);
});
factoryContext.keys().forEach(function(file){
    factoryContext(file);
});
controllerContext.keys().forEach(function(file){
    controllerContext(file);
});
