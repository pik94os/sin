/**
 * Created by Шульгин Роман Константинович on 06.01.16.
 */
define(['./module','jquery'],function(controllers,$){
    'use strict';
    controllers.controller('Main',['$scope','$http', '$rootScope', '$state', function($scope,$http,$rootScope,$state){
        $scope.html100=false;
        $scope.$on('html100', function(event,html100){
            $scope.html100 = html100;
        });
        $scope.leftMenu=[
            {text:'Мой кабинет', state:'account',icon:'account.png'},
            {text:'Сообщения', state:'message',icon:'message.png',count:7},
            {text:'Покупки', state:'purchases',icon:'purchases.png'},
            {text:'Группы', state:'groups',icon:'groups.png'},
            {text:'Друзья', state:'friends',icon:'friends.png'},
            {text:'Фотографии', state:'photos',icon:'photos.png'},
            {text:'Блокнот', state:'notebook',icon:'notebook.png'},
            {text:'Голлосариум', state:'glossary',icon:'glossary.png'},
            {text:'Желания', state:'wishes',icon:'wishes.png'},
            {text:'Календарь', state:'calendar',icon:'calendar.png'},
            {text:'Счёт', state:'cart',icon:'cart.png'},
            {text:'Настройки', state:'sittings',icon:'sittings.png'}
        ];
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

        $scope.setPhotoModal=function(photo){
            $scope.photo = photo;
        };

        $scope.submitSearchForm = function(searchText){
            $state.go('search',{text:searchText, type:'all'});
        };

        function wrap_soc(){
            $('.wrap_soc').height($('.btn-panel').height()+'px');
            if( $('#wrap_browser .wrap_content').height()<$('#wrap_browser').height()){
                $('#wrap_browser .wrap_content').css('min-height',$('#wrap_browser').height()+'px');
            }
            $('.resize-me').each(function(){
                var info = $(this);
                if(info.attr('new-height') && !info.attr('new-height').indexOf('#') && info.attr('new-height').length>1 && $(info.attr('new-height')).length){
                    info.height($(info.attr('new-height')).height());
                }
                if(info.attr('auto-min-height')!=undefined && 0!==($('#wrap_browser').height() - $('.bg-main').height())){
                    info.css('min-height', (info.height() + $('#wrap_browser').height() - $('.bg-main').height()) +'px');
                }
            });
        }

        $(window).resize( function(){
            wrap_soc();
        });

        $scope.question_hide = true;
        $scope.questionHide = function () {
            $scope.question_hide=true;
        };
        $scope.questionShow = function () {
            $scope.question_hide=false;
        };
        $scope.hiHide = function () {
            $scope.hi=false;
            $('.wrap_soc').css('z-index',0);
        };
        $scope.hiTarget = function () {
            $scope.hi=!$scope.hi;
            if($scope.hi){
                $('.wrap_soc').css('z-index',200);
            }else{
                $('.wrap_soc').css('z-index',0);
            }
        };

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
        }).on('mouseup', 'body',function (e) {
            var container = $(".wrap_question");
            if (container.has(e.target).length === 0){
                $scope.questionHide();
                $scope.$apply();
            }
            container = $(".wrap_soc, #btn_bot");
            if (container.has(e.target).length === 0 && (container.get(0) != $(e.target).get(0))){
                $scope.hiHide();
                $scope.$apply();
            }
        }).on('mouseover','.categ-tab', function (e) {
            var container = $(this).parent();
            container.show();
            var wCont = container.width(),
                wTab = $(this).width()+2,
                wTabBody = $(this).find('.subCateg').width()+2,
                rToTab =$(this).position().left-15;
            var r = 1+((rToTab/wCont)*wTabBody);
            if(r > (wTabBody-wTab)){
                r = wTabBody-wTab;
            }
            $(this).find('.subCateg').css('margin-left',-r+'px');
        });
        $rootScope.$on('$viewContentLoaded',function(){
            wrap_soc();
            $scope.state = $state.current;
            $scope.hideFooter=$state.includes('chat');
            $scope.imgOnly = ($state.includes('purchases') || $state.includes('groupOpen'));
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
            $('#dialog-list > div').slimScroll({
                height: '100%',
                color: '#99c3d9',
                wheelStep: '5',
                distance: '-5px'
            });
        });
        $scope.$on('LastRepeaterElement', function(){
            wrap_soc();
        });
    }])
});