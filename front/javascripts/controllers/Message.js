define(['./module','jquery', 'slimScroll'],function(controllers,$){
    'use strict';
    controllers.controller('Message',['$rootScope','$scope','$http', function($rootScope,$scope,$http){
        $('title').text('Сообщения');
        $rootScope.$on('$viewContentLoaded',function(event, viewConfig){
            $('#dialog-list > div').slimScroll({
                height: '100%',
                color: '#99c3d9',
                wheelStep: '5',
                distance: '-5px'
            });
        });
        $rootScope.$broadcast('html100', true);
        $rootScope.$broadcast('getMessages', true);
    }])
});