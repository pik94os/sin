var log4js = require('log4js'); 
	log4js.loadAppender('file');
	log4js.addAppender(log4js.appenders.file(__dirname+'./../logs/log.log'), 'log');
var logger = log4js.getLogger('log');

module.exports = logger;