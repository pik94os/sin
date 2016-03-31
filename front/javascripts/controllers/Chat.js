define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Chat',['$rootScope','$scope', '$stateParams', '$http', function($rootScope,$scope, $stateParams, $http){
        $rootScope.$broadcast('html100', true);
        $rootScope.$broadcast('getMessages');
        $scope.currentFriendId=$stateParams.friendId;
        $rootScope.$broadcast('getChat',$scope.currentFriendId);
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
        $scope.$on('textareaNewSize',function(event,resize){
            console.log(resize);
            $('.wrapper-message-list').height($('.wrapper-message-list').height() - resize.difference);
        });
        $('title').text('Чат');
    }])
});