/**
 * Created by Роман on 07.12.2014.
 */
define([
    'angular',
    'uiRouter',
    './controllers/index',
    './filters/index',
], function (ng) {
    'use strict';

    return ng.module('app', [
        'ui.router',
        'app.controllers',
        'app.filters'
    ]);
});