/**
 * Created by pik on 06.01.16.
 */
define(['./module','jquery', 'bootstrap'],function(controllers,$){
    'use strict';
    controllers.controller('Account',['$rootScope','$scope', function($rootScope,$scope){
        $rootScope.$broadcast('html100', false);
        $('title').text('Главная');

        $rootScope.$on('$viewContentLoaded',function(event, viewConfig){
            $('#wrap_bot_message > div').slimScroll({
                height: '100%',
                color: '#99c3d9',
                wheelStep: '5',
            });
        });
        $scope.editStatus = function(){

        }
    }])
});