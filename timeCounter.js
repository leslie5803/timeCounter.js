(function(){
    'use strict';
    window.timeCounter = function(options){
        var elem = document.querySelector('#' + options.elem)
            || document.querySelector(options.elem)
            || document.querySelector('.' + options.elem),
            isValid = function(str){
                return /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/.test(str);
            },
            toStamp = function(str){
                if(!isValid(str)){
                    throw new Error('time\'s format is not valid');
                }
                return Date.parse(str);
            },
            toDateString = function(stamp){
                var total = Math.floor(stamp/1000),
                    second = format(total % 60,2),
                    minutes = Math.floor(total / 60),
                    hours = Math.floor(minutes / 60),
                    days = Math.floor(hours / 24),
                    months = Math.floor(days / 30),
                    years = format(Math.floor(months / 12),4),
                    minute = format(minutes % 60,2),
                    hour = format(hours % 24,2),
                    day = format(days % 30,2),
                    month = format(months % 12,2);
                return years + '-' + month + '-' + day
                    + ' '
                    + hour + ':' + minute + ':' + second;
            },
            format = function(str,len){
                var slen = str.toString().length,
                    res = len - slen,
                    empty = '';
                if(res > 0){
                    for (var i=0; i < res; ++i){
                        empty += '0';
                    }
                    return empty + str;
                }
                return str;
            },
            now = function(){
                return Date.now();
            },
            init = function(){
                var stamp = toStamp(options.time);
                setInterval(function(){
                    var _now = now(),
                        result = stamp > _now ? stamp - _now : 0;
                    elem.innerHTML = toDateString(result);
                }, 1000);
            };
        init();
    }
})();
