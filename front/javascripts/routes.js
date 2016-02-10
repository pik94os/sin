define(['./app'], function (app) {
    'use strict';
    return app.config(function($stateProvider, $urlRouterProvider, $locationProvider ) {
        // Любые неопределенные url перенаправлять на /err404
        $urlRouterProvider.otherwise("/err404");
        $stateProvider
            //Стартовая страница
            .state('account', {
                url: "/",
                templateUrl: "/templates/account/list.html",
                controller: 'Account'
            })
            .state('message', {
                url: "/message",
                templateUrl: "/templates/message/list.html",
                controller: 'Message'
            })
            .state('chat', {
                url: "/chat/:friendId",
                templateUrl: "/templates/message/chat.html",
                controller: 'Chat'
            })
            .state('calendar', {
                url: "/calendar",
                templateUrl: "/templates/calendar/list.html",
                controller: 'Calendar'
            })
            //Ошибка 404
            .state('err_404', {
                url: "/err404",
                templateUrl: "/templates/err404.html"
            })
        //Включаем красивые url(требуется html5)
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });
});