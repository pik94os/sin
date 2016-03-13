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
            .state('friend', {
                url: "/id{id}",
                templateUrl: "/templates/account/list.html",
                controller: 'Account'
            })
            .state('message', {
                url: "/message",
                templateUrl: "/templates/message/list.html",
                controller: 'Message'
            })
            .state('chat', {
                url: "/chat/id{friendId}",
                templateUrl: "/templates/message/chat.html",
                controller: 'Chat'
            })
            .state('calendar', {
                url: "/calendar",
                templateUrl: "/templates/calendar/list.html",
                controller: 'Calendar'
            })
            .state('cart', {
                url: "/cart",
                templateUrl: "/templates/cart/list.html",
                controller: 'Cart'
            })
            .state('documents', {
                url: "/documents",
                templateUrl: "/templates/documents/list.html",
                controller: 'Documents'
            })
            .state('documents.create', {
                url: "/create",
                templateUrl: "/templates/documents/create.html",
                controller: 'Documents'
            })
            .state('notebook', {
                url: "/notebook",
                templateUrl: "/templates/notebook/list.html",
                controller: 'Notebook'
            })
            .state('wishes', {
                url: "/wishes",
                templateUrl: "/templates/wishes/list.html",
                controller: 'Wishes'
            })
            .state('glossary', {
                url: "/glossary",
                templateUrl: "/templates/glossary/list.html",
                controller: 'Glossary'
            })
            .state('groups', {
                url: "/groups",
                templateUrl: "/templates/groups/list.html",
                controller: 'Groups'
            })
            .state('passwords', {
                url: "/passwords",
                templateUrl: "/templates/passwords/list.html",
                controller: 'Passwords'
            })
            .state('purchases', {
                url: "/purchases",
                templateUrl: "/templates/purchases/list.html",
                controller: 'Purchases'
            })
            .state('photos', {
                url: "/photos",
                templateUrl: "/templates/photos/list.html",
                controller: 'Photos'
            })
            .state('album', {
                url: "/photos/album{id}",
                templateUrl: "/templates/photos/list.html",
                controller: 'Photos'
            })
            .state('friends', {
                url: "/friends",
                templateUrl: "/templates/friends/list.html",
                controller: 'Friends'
            })
            //Ошибка 404
            .state('err_404', {
                url: "/err404",
                templateUrl: "/templates/err404.html"
            });
        //Включаем красивые url(требуется html5)
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });
});