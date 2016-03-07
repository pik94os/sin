define(['./module'],function(controllers){
    'use strict';
    controllers.controller('Friends',['$rootScope','$scope', '$stateParams', '$http', function($rootScope,$scope,$stateParams,$http){
        $('title').text('Друзья');
        $rootScope.$broadcast('html100', false);
        $scope.friends = [];
        $scope.onlineOnly = function(){
            $http.get('/ajax/friends-online.json').then(function (response) {
                if(response.data.err){

                }else{
                    $scope.friends = response.data.friends;
                }
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };
        $scope.allFriends = function(){
            $http.get('/ajax/friends.json').then(function (response) {
                if(response.data.err){

                }else{
                    $scope.friends = response.data.friends;
                }
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };
        $scope.allFriends();
    }])
});