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
            {
                title:'планшеты',
                subCateg:[
                    {
                        title:"MI PAD",
                        icon:"Mi-Pad-White_296_1426456449.png"
                    },
                    {
                        title:"MI PAD 2",
                        icon:"xiaomi-mi-pad-2_330_1448536693__1449052268.png"
                    },
                    {
                        title:"Аксессуары",
                        icon:"Black_1_297_1427124064.png"
                    }
                ]
            },
            {title:'внешние аккумуляторы'},
            {title:'аудио'},
            {title:'фитнес браслеты'},
            {title:'комплектующие'},
        ];
        $scope.actItemF=function(i){
            $scope.actItem=i;
        }
    }]);
});