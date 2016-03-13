/**
 * Created by pik on 11.03.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Cart',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Счёт');
        $rootScope.$broadcast('html100', false);
    }])
});