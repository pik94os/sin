/**
 * Created by pik on 06.01.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Main',['$scope','$http', function($scope,$http){
        $scope.html100=false;
        $scope.$on('html100', function(event,html100){
            $scope.html100 = html100;
        });
        $scope.friends = [];
        $http.get('/ajax/friends.json').then(function (response) {
            if(response.data.err){

            }else{
                $scope.friends = response.data.friends;
            }
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        $scope.user = {};
        $http.get('/ajax/user.json').then(function (response) {
            if(response.data.err){

            }else{
                $scope.user = response.data.user;
            }
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        $scope.$on('getMessages', function(){

            $http.get('/ajax/messages.json').then(function (response) {
                if(response.data.err){

                }else{
                    $scope.messages = response.data.messages;
                }
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        });

        $scope.activeUser = null;

        $scope.$on('getUser', function(event,data){

            $http.get('/ajax/user/'+data.id+'.json').then(function (response) {
                if(response.data.err){
                    $scope.activeUser = null;
                }else{
                    $scope.activeUser = response.data.user;
                }
            }, function (response) {
                $scope.activeUser = null;
            });
        });

        $scope.chat = [];

        $scope.$on('getChat', function(event,currentFriendId){

            $http.get('/ajax/chat/'+currentFriendId+'.json').then(function (response) {
                if(response.data.err){

                }else{
                    $scope.chat = response.data.chat;
                }
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        });

        function wrap_soc(){
            $('.wrap_soc').height($('.btn-panel').height()+'px');
        }

        $(window).resize( function(){
            wrap_soc();
        });


        $(document).on('click', '#status', function(){
            $(this).css('width', '96%');
            $(this).children('span').html('');
            $(this).children('input').removeClass('hide').focus();
        }).on('click', '#btn_bot', function(){
            wrap_soc();
        }).on('blur', '#status input', function(){
            $('#status').css('width', '180px');
            $('#status span').html('Изменить статус');
            $('#status input').addClass('hide');
        });
    }])
});