/**
 * Created by pik on 10.03.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('GroupItem',['$rootScope','$scope', '$stateParams', '$state', function($rootScope,$scope,$stateParams,$state){
        $('title').text('Группа');
        $rootScope.$broadcast('html100', false);
        $scope.groupVerticalMenu = [
            {title:'смартфоны'},
            {
                title:'планшеты',
                subCateg:[
                    {
                        title:"MI PAD",
                        icon:"1"
                    },
                    {
                        title:"MI PAD 2",
                        icon:"1"
                    },
                    {
                        title:"Аксессуары",
                        icon:"1"
                    },
                ]
            },
            {title:'внешние аккумуляторы'},
            {title:'аудио'},
            {title:'фитнес браслеты'},
            {title:'комплектующие'},
        ];
        $scope.actItemF=function(i){
            $scope.actItem=i;
        };
        $scope.tab = $stateParams.tab;
    }]);
});