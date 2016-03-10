/**
 * Created by pik on 10.03.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Groups',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Группы');
        $rootScope.$broadcast('html100', false);
    }])
});