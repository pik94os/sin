/**
 * Created by pik on 17.02.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Purchases',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Покупки');
        $rootScope.$broadcast('html100', false);
    }])
});