define(['./module','jquery', 'slimScroll'],function(controllers,$){
    'use strict';
    controllers.controller('Calendar',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Календарь');
        $rootScope.$broadcast('html100', false);
    }])
});