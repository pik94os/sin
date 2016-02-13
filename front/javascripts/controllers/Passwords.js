define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Passwords',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Пароли');
        $rootScope.$broadcast('html100', false);
    }])
});