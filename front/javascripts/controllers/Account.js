/**
 * Created by pik on 06.01.16.
 */
define(['./module','jquery', 'bootstrap'],function(controllers,$){
    'use strict';
    controllers.controller('Account',['$rootScope','$scope', function($rootScope,$scope){
        $rootScope.$broadcast('html100', false);
        $('title').text('Главная');
    }])
});