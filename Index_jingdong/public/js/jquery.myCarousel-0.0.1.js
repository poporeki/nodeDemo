/**
 * jquery.myCarousel-0.0.1.js
 * 轮播插件
 * 
 */




; (function ($, nm) {
    var __DEFAULTS__ = {
        controls: 'carousels-controls',
        events: 'click',
        speed: 200,
        time: 5000,
        tips: true,
        direction: false,
        autoPlay: false

    }
    var para = {
        wrapWid: 0,
        oriWid: 0,
        c_timer: 0,
        direction: true
    }
    $.fn[nm] = function (options) {
        var option = $.extend({}, __DEFAULTS__, options);
        var $this = $(this),
            $ul = $this.find('.goods-list'),
            _wid = $this.width(),
            _t = option.time,
            _mode = option.autoPlay,
            $controls = $(option.controls),
            $li = $this.find('.carousel-list');
        para.direction = option.direction;
        para.mode = _mode;
        var _ulWid = setUlWid($li);
        $ul.width(_ulWid);
        para.oriWid = para.wrapWid = $ul.width() - _wid;
        if (!para.direction) {
            para.wrapWid = 0;
        }
        play(_t, _wid, $ul);
        triggerEvents($controls, option, _wid, $ul);
        _mode ? hoverEvents($this, _t, _wid, $ul) : '';



    }






    /*获取并设置ul宽度 */
    var setUlWid = function ($li) {
        var _w = 0;
        for (var i = 0; i < $li.length; i++) {
            _w += $li.eq(i).outerWidth();
        }
        return _w;
    }
    /*按钮触发事件 */
    var triggerEvents = function ($c, option, _wid, $ul) {
        var
            t = option.time,
            spd = option.speed,
            _events = option.events,
            $prevBtn = $c.find('.prev'),
            $nextBtn = $c.find('next');


        $c.on(_events, function (e) {
            clearTimer();
            var $target = $(e.target);
            if ($target.hasClass('prev')) {
                para.direction = true;
                play(t, _wid, $ul);
                return
            }
            if ($target.hasClass('next')) {
                para.direction = false;
                play(t, _wid, $ul);
                return
            }
        });
    }


    /*清除定时器 */
    var clearTimer = function () {
        return para.c_timer ? clearTimeout(para.c_timer) : '';
    }
    /*鼠标移入容器内停止动画 */
    var hoverEvents = function (e, _t, _wid, $ul) {
        e.hover(function () {
            console.log(para.c_timer);
            clearTimer();
        }, function () {
            clearTimer();
            para.c_timer = setTimeout(function () {
                play(_t, _wid, $ul);
            }, _t);

        });
    }
    /*开始动画 时间t  */
    var play = function (t, _wid, $ul) {
        clearTimer();
        switch (para.direction) {
            case false:
                if (para.wrapWid < -para.oriWid) {
                    para.wrapWid = 0;
                }
                $ul.css({ 'transform': 'translateX(' + para.wrapWid + 'px)' });
                para.wrapWid -= _wid;
                run();
                break;
            case true:
                if (para.wrapWid < 0) {
                    para.wrapWid = para.oriWid;
                }
                $ul.css({ 'transform': 'translateX(' + -para.wrapWid + 'px)' });
                para.wrapWid -= _wid;
                run();
                break;
            default:
                console.log(para.direction);
        }
        function run() {
            if (!para.mode) return;
            return para.c_timer = setTimeout(function () {
                play(t, _wid, $ul);
            }, t);
        }
    }
})(jQuery, 'myCarousel');

