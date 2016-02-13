define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Wishes',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Желания');
        $rootScope.$broadcast('html100', false);
    }])
});