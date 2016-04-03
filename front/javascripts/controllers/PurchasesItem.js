/**
 * Created by pik on 17.02.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('PurchasesItem',['$rootScope','$scope','$http', '$stateParams',function($rootScope,$scope,$http,$stateParams){
        $('title').text('Покупки');
        $rootScope.$broadcast('html100', false);
        $scope.tab = $stateParams.tab;
    }])
});