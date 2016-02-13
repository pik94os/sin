define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Calendar',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Календарь');
        $rootScope.$broadcast('html100', false);
    }])
});