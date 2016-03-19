/**
 * Created by pik on 10.03.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('GroupOpen',['$rootScope','$scope', function($rootScope,$scope){
        $('title').text('Группа');
        $rootScope.$broadcast('html100', false);
        $scope.groupVerticalMenu = [
            {title:'смартфоны'},
            {title:'планшеты'},
            {title:'внешние аккумуляторы'},
            {title:'аудио'},
            {title:'фитнес браслеты'},
            {title:'комплектующие'},
        ]
    }]);
});