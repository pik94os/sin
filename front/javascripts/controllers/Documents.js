/**
 * Created by pik on 12.02.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Documents',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Документы');
        $rootScope.$broadcast('html100', false);
    }])
});