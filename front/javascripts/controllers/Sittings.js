define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Sittings',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Настройки');
        $rootScope.$broadcast('html100', false);
    }]);
});