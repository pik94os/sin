/**
 * Created by pik on 12.02.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Documents',['$rootScope','$scope', '$http', function($rootScope,$scope,$http){
        $('title').text('Документы');
        $rootScope.$broadcast('html100', false);
        $scope.documents = [];
        $scope.checkedCount = 0;
        $scope.checkedDocument = null;
        $scope.type='grid';
        $scope.setChecked = function (b,doc) {
            $scope.checkedCount = b?$scope.checkedCount+1:$scope.checkedCount-1;
            $scope.checkedDocument = doc;
        };
        $http.get('/ajax/documents.json').then(function (response) {
            if(response.data.err){

            }else{
                $scope.documents = response.data.documents;
            }
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }])
});