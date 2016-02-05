var path = require('path');
var express = require('express');

// Описание настроек:
var staticSiteOptions = {
    portnum: 8888, // слушать порт 80
    maxAge: 1000 // хранить страницы в кэше
};


// Запуск сайта:
express().use(express.static(
    path.join(__dirname, 'public'),
    staticSiteOptions
)).use(function(req,res){
    res.sendFile(path.join(__dirname, 'public/index.html'));
}).listen(staticSiteOptions.portnum);