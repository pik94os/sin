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
            if(resize.oldHeight){
                $('.wrapper-message-list').css('height','calc(100% - '+($('.add-message-wrapper').height() + resize.difference + 21)+'px)');
            }
        });
        $('title').text('Чат');
    }])
});