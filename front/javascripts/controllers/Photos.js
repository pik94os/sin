define(['./module'],function(controllers){
    'use strict';
    controllers.controller('Photos',['$rootScope','$scope', '$stateParams', '$http', function($rootScope,$scope,$stateParams,$http){
        $('title').text('Фотографии');
        $rootScope.$broadcast('html100', false);
        $scope.albums = [];
        $scope.photos = [];
        if($stateParams.id==undefined){
            $http.get('/ajax/albums.json').then(function (response) {
                if(response.data.err){

                }else{
                    $scope.albums = response.data.albums;
                }
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        $http.get('/ajax/photos.json').then(function (response) {
            if(response.data.err){

            }else{
                $scope.photos = response.data.photos;
            }
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }])
});