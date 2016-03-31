define(['./module'], function (filters) {
    'use strict';
    filters.filter('docSizeFilt', function(){
        return function(doc) {
            var aEndings =["","а","ов"];
            var sEnding, i;
            var num = doc['doc-size'] % 100;
            if (num>=11 && num<=19) {
                sEnding=aEndings[2];
            }
            else {
                i = num % 10;
                switch (i)
                {
                    case (1): sEnding = aEndings[0]; break;
                    case (2):
                    case (3):
                    case (4): sEnding = aEndings[1]; break;
                    default: sEnding = aEndings[2];
                }
            }
            return doc['doc-size']+' '+(doc.type==='folder'?'файл'+sEnding:'кБ');
        }
    });
});