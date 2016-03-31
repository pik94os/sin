/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Thom Seddon
 * Copyright (c) 2010 Google
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.

 * Adapted from: http://code.google.com/p/gaequery/source/browse/trunk/src/static/scripts/jquery.autogrow-textarea.js
 *
 * Works nicely with the following styles:
 * textarea {
 *  resize: none;
 *  word-wrap: break-word;
 *  transition: 0.05s;
 *  -moz-transition: 0.05s;
 *  -webkit-transition: 0.05s;
 *  -o-transition: 0.05s;
 * }
 *
 * Usage: <textarea auto-grow></textarea>
 */
define(['./module'], function (directives) {
  directives.directive('autoGrow', function() {
    return function(scope, element, attr){
      var minHeight = element[0].offsetHeight,
        paddingLeft = element.css('paddingLeft'),
        paddingRight = element.css('paddingRight');

      var $shadow = angular.element('<div></div>').css({
        position: 'absolute',
        top: 0,
        left: 0,
        'z-index': -1,
        'word-wrap': 'break-word',
        'width': (element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0)) + 'px',
        fontSize: element.css('fontSize'),
        fontFamily: element.css('fontFamily'),
        lineHeight: element.css('lineHeight'),
        resize:     'none'
      });
      angular.element(element.parent()).append($shadow);

      var update = function() {
        var times = function(string, number) {
          for (var i = 0, r = ''; i < number; i++) {
            r += string;
          }
          return r;
        };

        var val = element.val().replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/&/g, '&amp;')
          .replace(/\n$/, '<br/>&nbsp;')
          .replace(/\n/g, '<br/>')
          .replace(/\s{2,}/g, function(space) { return times('&nbsp;', space.length - 1) + ' ' });
        $shadow.html(val);
        var oldHeight = parseInt(element.css('height'));
        var newHeight = Math.max($shadow[0].offsetHeight + 10 /* the "threshold" */, minHeight);
        element.css('height', newHeight + 'px');
        scope.$broadcast('textareaNewSize',{oldHeight:oldHeight, newHeight:newHeight, difference:newHeight-oldHeight});
      };

      scope.$on('$destroy', function() {
        $shadow.remove();
      });

      element.bind('keyup keydown keypress change', update);
      update();
    }
  });
});