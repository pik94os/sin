/**
 * Created by pik on 19.03.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('GroupCategory',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Категория');
        $rootScope.$broadcast('html100', false);
    }]);
});