/**
 * Created by pik on 13.02.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Notebook',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Блокнот');
        $rootScope.$broadcast('html100', false);
    }])
});