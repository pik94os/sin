define(['./module','jquery', 'slimScroll'],function(controllers,$){
    'use strict';
    controllers.controller('Chat',['$rootScope','$scope', '$stateParams', '$http', function($rootScope,$scope, $stateParams, $http){
        $rootScope.$broadcast('html100', true);
        $rootScope.$broadcast('getMessages', true);
        $rootScope.$on('$viewContentLoaded',function(){
            $('.messages-user-list > div').slimScroll({
                height: '100%',
                color: '#99c3d9',
                wheelStep: '5'
            });
            $('#wrap-message-list').slimScroll({
                height: '100%',
                color: '#99c3d9',
                wheelStep: '5',
                start: 'bottom'
            });
        });
        $('title').text('Чат');
        $scope.chat = [];
        $scope.currentFriendId=$stateParams.friendId;
        $http.get('/ajax/chat/'+$scope.currentFriendId+'.json').then(function (response) {
            if(response.data.err){

            }else{
                $scope.chat = response.data.chat;
            }
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }])
});