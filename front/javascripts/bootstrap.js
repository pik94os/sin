/**
 * Created by Роман on 07.12.2014.
 */
define([
    'require',
    'angular',
    'app',
    'domReady',
    'routes'
], function (require, ng) {
    'use strict';

    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);
    });
});