; (function ($) {
    var __DEFAULTS__ = {


    }
    $.fn.extend({
        'days': function (options) {
            var option = $.extend({}, __DEFAULTS__, options);
            var newDates = new Date();
            console.log(newDates);
            var o = {
                "M+": newDates.getMonth() + 1, //月份         
                "d+": newDates.getDate(), //日         
                "h+": newDates.getHours() % 12 == 0 ? 12 : newDates.getHours() % 12, //小时         
                "H+": newDates.getHours(), //小时         
                "m+": newDates.getMinutes(), //分         
                "s+": newDates.getSeconds(), //秒         
                "q+": Math.floor((newDates.getMonth() + 3) / 3), //季度         
                "S": newDates.getMilliseconds() //毫秒         
            };
            $.each(o,function(){
                console.log(this);
            });
            console.log(newDates);
        }
    });
})(jQuery);