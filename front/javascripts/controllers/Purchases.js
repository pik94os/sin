/**
 * Created by pik on 17.02.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Purchases',['$rootScope','$scope','$http','$state','$stateParams',function($rootScope,$scope,$http,$state,$stateParams){
        $('title').text('Покупки');
        $rootScope.$broadcast('html100', false);
        $scope.categories =[];
        $http.get('/ajax/categ.json').then(function (response) {
            if(response.data.err){

            }else{
                $scope.categories = response.data.categories;
            }
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        $scope.tab = $stateParams.tab;
        $scope.isMainPage=true;

        $rootScope.$on('$viewContentLoaded',function(){
            $scope.isMainPage = $state.current.name=='purchases';
        });
    }])
});