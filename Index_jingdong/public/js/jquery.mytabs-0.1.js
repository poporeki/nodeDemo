/**
 * 选项卡
 * 功能：选项卡切换{
 *                  
 *                }
 * 结构：.tab-panel
 *          .tab-head-item
 *          .tab-head-item
 *      .tab-content-panel
 *          .tab-content-item
 *          .tab-content-item
 */



;
(function ($) {
    var __DEFAULT__ = {                                  /*默认参数 */
        headPanel: '.tab-panel',                         /*标题wrap */
        headItem: '.tab-head-item',                      /*选项卡标题 */
        contentPanel: '.tab-content-panel',              /*内容页wrap */
        contentItem: '.tab-content-item',                /*选项卡内容 */
        sidebar: '.tab-sidebar',                         /*滑动条 */
        _speed: 200,                                     /*速度 */
        direction: 'left',                               /*方向 */
        side: true                                       /*是否生成滑动条 */
    }
    $.fn.extend({

        /*普通切换 */
        'tabs': function (options) {
            var option = $.extend({}, __DEFAULT__, options);
            var $tHead = $(option.headPanel, this),
                $tContent = $(option.contentPanel, this),
                $thItem = $(option.headItem, $tHead),
                $tcItem = $(option.contentItem, $tContent);
            if (!$thItem == $tcItem) return console.log('!=');
            $tcItem.eq(0).siblings().css({ 'display': 'none' });
            $thItem.on('mouseover', function () {
                var _idx = $(this).index();
                $tcItem.eq(_idx).css({ 'display': 'block' })
                    .siblings().css({ 'display': 'none' });
                $(this).addClass('clicked')
                    .siblings().removeClass('clicked');
            });
            return this;
        },

        /*横向移动切换 */
        'anitabs': function (options) {
            var option = $.extend({}, __DEFAULT__, options);
            var $tHead = $(option.headPanel, this),
                $tContent = $(option.contentPanel, this),
                $thItem = $(option.headItem, $tHead),
                $tcItem = $(option.contentItem, $tContent);
            _dir = option.direction;
            if (!$thItem == $tcItem) return console.log('!=');
            $tContent.wrapAll('<div class="content-wrapper"></div');
            var _wid = 0,
                _idx = 0,
                _speed = option._speed,
                _awid = $tcItem.width();
            $.each($tcItem, function () {
                _wid += $(this).width();
            });
            $tContent.width(_wid);
            /*鼠标移入 */
            $thItem.on('mouseenter', function () {
                if ($tContent.is(':animated')) return;
                var _nidx = $(this).index(),
                    _twid = parseFloat($tContent.css(_dir));
                $(this).addClass('clicked')
                    .siblings().removeClass('clicked');
                if (_nidx != 0) {
                    if (_nidx > _idx || _nidx < _idx) {
                        var _ix = _nidx - _idx;
                        $tContent.animate({ 'left': _twid - _awid * _ix }, _speed);
                        _idx = _nidx;
                        return
                    }
                } else if (_nidx == 0) {
                    $tContent.animate({ 'left': _nidx }, _speed);
                    _idx = _nidx;
                    return
                }
            });
            return this;
        },
        'tabs3': function (options) {
            var option = $.extend({}, __DEFAULT__, options);
            var $tHd = $(option.headPanel, this),
                $tHdItems = $tHd.find(option.headItem),
                $tCnt = $(option.contentPanel, this),
                $nLists = $tCnt.find(option.contentItem),
                $li = $nLists.find('news-item'),
                _idx = _reidx = 0,
                $tBar;
            if(option.side){
                var addCon='<div class="tab-sidebar" style="position: absolute;bottom: -1px;margin-left: -2px;width: 28px;height: 2px;background: #db192b;transition: transform .3s ease;-webkit-transition: transform .3s ease;"></div>';
                $tHd = $(option.headPanel, this)
                $tHd.append(addCon);
                $tBar=$tHd.find(option.sidebar);
                var bMargin=$tHdItems.eq(0).css('marginLeft');
                $tBar.width($tHdItems.width()).css({'margin-left':bMargin});
            }else{
                $tBar=$tHd.find(option.sidebar);
            }
            
            if ($tHdItems.length != $nLists.length) return console.log($tHdItems.length + "!=" + $nLists.length);
            /*隐藏非第一个标签内容 */
            $nLists.eq(0).siblings().hide();
            //$tBar[0].addEventListener('transitionend',hditemsHover());

            /*给标签添加hover事件*/
            $tHdItems.hover(function () {
                //if($tBar.is(':transitionend')) return 
                var _idx = $(this).index();
                var _allWid = 0;
                for (i = 0; i < _idx; i++) {
                    _allWid += $tHdItems.eq(_idx).outerWidth();
                }
                // console.log(_allWid);
                // var _thisWid=$(this).outerWidth();
                // var _barLeft=$tBar.position().left;
                /*显示标签索引的内容 */
                $nLists.eq(_idx).show().siblings().hide();
                if (_idx == _reidx) return
                //$tBar.css({ 'left': _barLeft+_thisWid*(_idx-_reidx) });
                $tBar.css({ 'transform': 'translateX(' + _allWid + 'px)' });
                _reidx = _idx;
            });
            return this;
        }
    });
})(jQuery);