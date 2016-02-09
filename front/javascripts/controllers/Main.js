/**
 * Created by pik on 06.01.16.
 */
define(['./module','jquery', 'bootstrap'],function(controllers,$){
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
    }])
});