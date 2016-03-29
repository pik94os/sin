define(['./module'], function (filters) {
    'use strict';
    filters.filter('DocTypeFilt', function(){
        return function(t) {
            var str ='';
            switch (t){
                case 'folder':
                    str = 'Папка';
                    break;
                case 'book':
                    str='Книга';
                    break;
                case 'archive':
                    str = 'Архив';
                    break;
                case 'doc':
                    str = 'Документ';
                    break;
                case 'text':
                    str = 'Текстовый файл';
                    break;
                case 'pdf':
                    str = 'PDF файл';
                    break;
                case 'img':
                    str = 'Изображение';
                    break;
            }
            return str;
        }
    });
});