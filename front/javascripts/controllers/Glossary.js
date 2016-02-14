define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Glossary',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Голлосариум');
        $rootScope.$broadcast('html100', false);
    }])
});