/**
 * Created by pik on 06.01.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Account',['$rootScope','$scope', '$stateParams', '$http', function($rootScope,$scope,$stateParams,$http){
        $rootScope.$broadcast('html100', false);
        $('title').text('Главная');
        if($stateParams.id!==undefined && $stateParams.id!=$scope.user._id){
            $rootScope.$broadcast('getUser', {"id":$stateParams.id});
            $rootScope.$broadcast('getChat', $stateParams.id);
        }else{
            $scope.activeUser = $scope.user;
        }
        $rootScope.$on('$viewContentLoaded',function(){
            $('#wrap_bot_message > div').slimScroll({
                height: '100%',
                color: '#99c3d9',
                wheelStep: '5',
            });
        });


        $scope.friendsOnline = [];
        $http.get('/ajax/friends-online.json').then(function (response) {
            if(response.data.err){

            }else{
                $scope.friendsOnline = response.data.friends;
            }
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        $scope.editStatus = function(){

        }
    }])
});