define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Message',['$rootScope','$scope','$http', function($rootScope,$scope,$http){
        $('title').text('Сообщения');
        $rootScope.$broadcast('html100', true);
        $rootScope.$broadcast('getMessages', true);
    }])
});