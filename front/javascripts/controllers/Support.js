define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Support',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Помощь');
        $rootScope.$broadcast('html100', false);
    }]);
});