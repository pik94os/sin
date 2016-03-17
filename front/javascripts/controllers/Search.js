/**
 * Created by pik on 15.03.16.
 */
define(['./module'],function(controllers){
    'use strict';
    controllers.controller('Search',['$rootScope','$scope', '$stateParams', '$http', function($rootScope,$scope,$stateParams,$http){
        $('title').text('Поиск');
        $rootScope.$broadcast('html100', false);
        $scope.sText = $stateParams.text;
        $scope.searchType = $stateParams.type;
    }])
});