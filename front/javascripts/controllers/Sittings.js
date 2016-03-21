define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Sittings',['$rootScope','$scope','$stateParams', function($rootScope,$scope,$stateParams){
        $('title').text('Настройки');
        $rootScope.$broadcast('html100', false);
        $scope.tab=$stateParams.tab;
    }]);
});