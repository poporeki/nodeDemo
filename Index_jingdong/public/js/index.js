
$(function () {

    cw_hover();
    my_cart_hover();
    getLeftMenu();
    carousel();
    //newsTab();
    serviceTab();
    countDown();
    sk();
    getData();
    $('.news-tab').tabs3({
        headPanel:'.tab-head',
        contentPanel:'.tab-content',
        contentItem:'.news-list',
        side:false
    });
   $(window).on('scroll',function(){
       var _wH=$(window).scrollTop();
       var $sBox=$('#search');
       var _sH=$('.banner-block').outerHeight()+$('.banner-block').offset().top;
       if(_wH>_sH){
        $sBox.addClass('search-fixed');
       }else{
               $sBox.removeClass('search-fixed');
       }
   });
});
//citylist
function cw_hover() {
    $(".dropdown").hover(function () {
        $(".cw", this).addClass("cw-hover");
        $(".dropdown-layer", this).show();
        load_cw_data();
    }, function () {
        $(".cw", this).removeClass("cw-hover");
        $(".dropdown-layer", this).hide();
    });
}
//加载城市列表
function load_cw_data() {
    var $lr = $(".navbar-header .dropdown .dropdown-layer");

    $.ajax({
        type: "get",
        url: "./getCity",
        dataType: "json",
        beforeSend: function () {
           ajaxLoadingImg.start($lr);
        },
        error: function (e) {
            console.log(e);
        },
        success: function (data) {
            $lr.empty();
            if (!data)return; 
            $.each(data, function (key, val) {
                console.log(val.c_name);
                var addHtmls = '<div class="item">' +
                    '<a href="##" class="cn" data-cid='+val.c_id+'>' + val.c_name + '</a>' +
                    '</div>';
                $lr.append(addHtmls);
            });
        }
    });
}
//购物车
function my_cart_hover() {
    $(".my-cart").hover(function () {
        $(".word-icon", this).addClass("hover");
        $(".dropdown-layer", this).show();
    }, function () {
        $(".word-icon", this).removeClass("hover");
        $(".dropdown-layer", this).hide();
    });
}

//获取商品列表
function getLeftMenu() {
    $lm = $(".left-menu");
    $sm = $(".menu-content-extends");
    $.ajax({
        type: "get",
        url: "../data/menu-list-data.json",
        dataType: "json",
        async: false,
        beforeSend:function(){
          ajaxLoadingImg.start($lm);  
        },
        error: function (e) {
            console.log(e);
        },
        success: function (data) {
            ajaxLoadingImg.remove($lm);
            if (data.data_name == "left-menu") {
                console.log("成功");
            } else { return }
            //菜单内容
            $.each(data.data_content, function (key, val) {
                var addHtmls = '<li class="menu-items" data-index=' + val.menu_num + '></li>';
                $lm.find(".menu-content").append(addHtmls);
                //console.log(val.menu_num+'+'+this);
                $.each(val.menu_content, function (key, vals) {
                    //console.log(val.name);
                    console.log(val.menu_content.length);
                    if (key < val.menu_content.length - 1) {
                        $lm.find(".menu-items:last").append('<a href="' + vals.href + '" class="a-item">' + vals.name + '</a><span class="menu-line">/</span>');
                    } else {
                        $lm.find(".menu-items:last").append('<a href="' + vals.href + '" class="a-item">' + vals.name + '</a>');
                    }
                });
            });


            //二级菜单内容
            $.each(data.data_content, function (key, val) {
                if (!val.second_menu_content) { return }
                $.each(val.second_menu_content, function (key, vals) {
                    var addC = '<div id="item' + val.menu_num + '" class="item-wrap clearfix">' +
                        '<div class="details-cols-left">' +
                        '<div class="d-head"></div>' +
                        '<div class="details-items"></div>' +
                        '</div>' +
                        '<div class="details-cols-right">' +
                        '<div class="brand-img-up clearfix"></div>' +
                        '<div class="promotion-img"></div>' +
                        '</div>' +
                        '</div>';
                    $sm.append(addC);

                    if (vals.d_head_lk) {
                        $.each(vals.d_head_lk, function (key, lk) {
                            var addHtmls = '<a href="' + lk.href + '" class="details-lk">' + lk.name +
                                ' <i class="fa fa-angle-right details-lk-arrow"></i>' +
                                '</a>';
                            $sm.find(".details-cols-left:last").find(".d-head").append(addHtmls);
                        });
                    } else {
                        return console.log("null");
                    }
                    if (vals.d_body_items_lk) {
                        var $di = $(".details-items:last");
                        $.each(vals.d_body_items_lk, function (key, lk) {
                            var addHtmls = '<dl class="detail-item-dl">' +
                                '<dt class="tit"></dt>' +
                                '<dd class="con"></dd>' +
                                '</dl>';
                            $di.append(addHtmls);
                            if (lk.details_tit) {
                                $.each(lk.details_tit, function (key, dtl) {
                                    var addC = '<a href="' + dtl.href + '">' + dtl.name +
                                        '<i class="fa fa-angle-right details-lk-arrow"></i>' +
                                        '</a>';
                                    $di.find(".detail-item-dl:last").find(".tit").append(addC);
                                });
                            }
                            if (lk.details_items) {
                                $.each(lk.details_items, function (key, dis) {
                                    var addC = '<a href="' + dis.href + '">' + dis.name + '</a>';
                                    $di.find(".detail-item-dl:last").find(".con").append(addC);
                                });
                            }
                        });
                    } else {
                        return console.log("没有找到");
                    }
                    if (vals.d_img_lk) {
                        var $dcr = $(".details-cols-right:last");
                        $.each(vals.d_img_lk, function (key, lk) {
                            if (lk.brand_lk) {
                                $.each(lk.brand_lk, function (key, blk) {
                                    var addC = '<a href="' + blk.href + '" class="brand-lk">' +
                                        '<img src="' + blk.img_src + '">' +
                                        '</a>';
                                    $dcr.find(".brand-img-up:last").append(addC);
                                });
                            }
                            if (lk.promotion_lk) {
                                $.each(lk.promotion_lk, function (key, plk) {
                                    var addC = '<a href="' + plk.href + '" class="promotion-lk">' +
                                        '<img src="' + plk.img_src + '">' +
                                        '</a>';
                                    $dcr.find(".promotion-img:last").append(addC);
                                });
                            }
                        });
                    } else {
                        return console.log("没有找到")
                    }
                });
            });

        }
    });

    controlMenu();
}

//二级菜单
function controlMenu() {
    var $lm = $(".left-menu"),
        $miLi = $lm.find(".menu-content").find(".menu-items"),
        $mce = $lm.find(".menu-content-extends"),
        $iw = $mce.find(".item-wrap");
    if (!$miLi.length == $iw.length)  return 
    var idx = reidx = 0;
    /*鼠标移入 */
    $miLi
        .on('mouseenter',function () {
            $(this).addClass("hover").siblings().removeClass("hover");
            idx = $(this).index();
            $iw.eq(idx).addClass("false");
            $iw.eq(idx).css({ "display": "block" })
                .siblings().css({ "display": "none" });
        /*鼠标移出*/
        })
        .on('mouseleave',function () {
            reidx = idx;
            setTimeout(function () {
                if ($iw.eq(reidx).hasClass("false")) {
                    $miLi.eq(reidx).removeClass("hover");
                    $iw.eq(reidx).css({ "display": "none" });
                } else (console.log("不是"));
                reidx = "";
            }, 1);
        });

    // $miLi.eq(idx).mouseout(function () {
    //     reidx = idx;
    //     setTimeout(function () {
    //         if ($iw.eq(reidx).hasClass("false")) {
    //             $miLi.eq(reidx).removeClass("hover");
    //             $iw.eq(reidx).css({ "display": "none" });
    //         } else (console.log("不是"));
    //         reidx = "";
    //     }, 1);
    // });
    $iw.hover(function () {
        idx = $(this).index();
        $iw.eq(idx).removeClass("false");
    }, function () {
        $miLi.eq(idx).removeClass("hover");
        $iw.eq(idx).css({ "display": "none" });
    });
}

function carousel() {
    var $cb = $(".carousel-block");
    var $cbImg = $cb.find(">img");
    var _arrImgcon = [];
    var addc =  '<ul class="ul-wrap"></ul>' +
                '<div class="car-tips-wrap"></div>' +
                '<div class="car-arrow">' +
                    '<a href="javascript:;" id="left-arr">' +
                        '<i class="fa fa-angle-left"></i>' +
                    '</a>' +
                    '<a href="javascript:;" id="right-arr">' +
                        '<i class="fa fa-angle-right"></i>' +
                    '</a>' +
                '</div>';
    $cb.append(addc);
    $.each($cbImg, function (key, val) {
        _arrImgcon.push(val);
    });
    $cbImg.remove();
    var $wrap = $(".ul-wrap");
    var $tips = $(".car-tips-wrap");
    var $ca = $(".car-arrow");
    for (var i = 0; i < _arrImgcon.length; i++) {
        var addc =  '<li>' +
                        '<a href="' + $(_arrImgcon[i]).attr("src") + '">' +
                            '<img src="' + $(_arrImgcon[i]).attr("src") + '" alt="' + $(_arrImgcon[i]).attr("alt") + '">' + $(_arrImgcon[i]).attr("alt") +
                        '</a>' +
                    '</li>';
        var addc2 = '<i class="car-tips"></i>';
        $wrap.append(addc);
        $tips.append(addc2);
    }
    var $li = $wrap.find('li'),
        $t = $tips.find('i'),
        _tipwrapWId=$tips.outerWidth();
    /*重定位 */
    $tips.css({'margin-left':-_tipwrapWId/2});
    $t.eq($t.length-1).css({'margin-right':0});
    var idx = 0,
        reidx = idx,
        _speed = 500,
        _timSpd = 2000,
        aniTime='';
        animate(_timSpd);

    /*banner运动 */
    function animate(_s) {
        /*判断动画是否在执行中  如果是 则返回 */
        if ($li.is(":animated")) return
        idx == $li.length?idx = 0:'console.log("animate!=")';
        /*当前页淡入，其它页淡出  时间_speed */
        $li.eq(idx).fadeIn(_speed)
                    .siblings().fadeOut(_speed);
        $t.eq(idx).addClass('tips-active')
                    .siblings().removeClass('tips-active');
        /*页数+1 */
        idx++;
        /*创建定时器 */
        aniTime=setInterval(function(){
            animate(_s);
        },_s);
        
    }
    /* 鼠标移入页码时停止滚动，移出重新开始*/
    $tips.hover(function () {
        clearInterval(aniTime);
    }, function () {
        animate(_timSpd);
    });
    /*鼠标移入箭头时停止滚动，移出重新开始 */
    $ca.find("a").hover(function () {
        clearInterval(aniTime);
    }, function () {
        animate(_timSpd);
    });
    /*单击页码 */
    $t.hover(function () {
        var thisidx = $(this).index(),
            $t_s=$t.eq(thisidx),
            $l_s=$li.eq(thisidx);
        $t_s.addClass('tips-active')
            .siblings().removeClass('tips-active');
        if ($li.is(":animated")) return
        $l_s.fadeIn(_speed)
            .siblings().fadeOut(_speed);
    });
    /*单击前一页或后一页 */
    $ca.find("a").on('click', function () {
        var _tarId=$(this).attr('id');
        switch (_tarId){
            case 'left-arr':
                idx == 0?idx = $li.length:'';
                idx--;
                $li.eq(idx).fadeIn(_speed).siblings().fadeOut(_speed);
                $t.eq(idx).addClass('tips-active').siblings().removeClass('tips-active');
                break;
            case 'right-arr':
                idx == $li.length?idx = 0:'';
                idx++;
                $li.eq(idx).fadeIn(_speed).siblings().fadeOut(_speed);
                $t.eq(idx).addClass('tips-active').siblings().removeClass('tips-active');
                break;
            default:
                console.log($(this));
        }
    });

}



function serviceTab() {
    var $service = $('.service'),
        $sEntry = $service.find('.service-entry'),
        $sContent = $service.find(".service-content"),
        $closeBtn = $sContent.find('#close_btn'),
        $sList = $sEntry.find('.service-list'),
        $sTHItem = $sList.find('.tab-head-item'),
        $sTCItem = $sContent.find('.tab-content-item'),
        $sLk = $sTHItem.find('.service-lk');


    $sTHItem.on('mouseenter', function () {
        var $this = $(this),
            _idx = $(this).index(),
            $txt = $this.find('.service-txt'),
            $sibTxt = $this.siblings().find('.service-txt');

        $this.addClass('extends')
            .siblings().removeClass('extends');
        $txt.css({ 
            'border-top': '2px solid #e01121' 
        });
        $sibTxt.css({ 
            'border-top': '2px solid #fff' 
        });
        $sLk.css({ 
            'transform': 'translate3d(0,-38px,0)' 
        });
        $sContent.css({ 
            'top': '24px' 
        });
        $sTCItem.eq(_idx).css({ 
            'display': 'block' 
        }).siblings('div').css({ 
            'display': 'none' 
        });


    });

    $closeBtn.on('click', function () {
        for (var i = 0; i < $sTHItem.length; i++) {
            var $target = $sTHItem.eq(i);
            if (!$target.hasClass('extends')) return;

            $target.removeClass('extends');
            var $txt = $target.find('.service-txt');
            $txt.css({ 
                'border-top': '2px solid #fff' 
            });
            $sLk.css({ 
                'transform': 'translate3d(0,0,0)' 
            });
            $sContent.css({ 
                'top': '210px' 
            });
            var addLayer = '<div class="service-item-layer"></div>';
            $sTHItem.parent().append(addLayer);
            var $sitem_layer = $sList.find('.service-item-layer');

            $sitem_layer.on('mouseleave', function () {
                $(this).remove();
            });
        }
    });

}


/***********秒杀倒计时***** */
function countDown() {
    var $hour_text=$('.cd-hour').find('.cd-item-text'),
        $minute_text=$('.cd-minute').find('.cd-item-text'),
        $second_text=$('.cd-second').find('.cd-item-text');
        /*目标时间 */
        time_target=new Date('2017/5/10 00:00:00').getTime();
        
    timer(time_target,$hour_text,$minute_text,$second_text);
}

/**
 * 倒计时
 * h，m，s为需要填充数值的jquery对象
 * 
 */
function timer(t_target,h,m,s){
        /*获取系统时间 毫秒 */
        var time_now = new Date().getTime();
        /*目标时间和系统时间差值 */
        var _time = t_target - time_now;
        /*取整 获得距目标时间天数 */
        var _day = Math.floor(_time / 86400000);
        /*减去时间 */
        _time -= _day * 86400000;
        /*取整 获得距目标时间小时数 */
        var _hour = Math.floor(_time / 3600000);
        _time -= _hour * 3600000;
        /*取整 获得距目标时间分钟数 */
        var _minute = Math.floor(_time / 60000);
        _time -= _minute * 60000;
        /*取整 获得距目标时间秒数 */
        var _second = Math.floor(_time / 1000);
        /*如果单位小于10 则前面加0 */
        if (_day < 10) {
            _day = "0" + _day;
        }
        if (_hour < 10) {
            _hour = "0" + _hour;
        }
        if (_minute < 10) {
            _minute = "0" + _minute;
        }
        if (_second < 10) {
            _second = "0" + _second;
        }
        h?$(h).text(_hour):'console.log("目标对象不存在h")';
        m?$(m).text(_minute):'console.log("目标对象不存在m")';
        s?$(s).text(_second):'console.log("目标对象不存在s")';
        if (_time > 0) {
            /*console.log(_day + ':' + _hour + ':' + _minute + ':' + _second);*/
            setTimeout(function(){
                timer(t_target,h,m,s);
            }, 1000);
        }
    }


/****************************** */

function sk(){
    var $gList=$('.goods-list');
    var getdata=function (){
        $.ajax({
            url:"../data/secKill.json",
            type:'get',
            dataType:'json',
            beforeSend:function(){
                ajaxLoadingAnimate.start($gList.parent());
            },
            complete:function(){
                ajaxLoadingAnimate.remove($gList.parent());
            },
            success:function(data){
                if(data.txt_name!='seckillgoods-data'||!data.data) return
                $.each(data.data,function(key,val){
                    getGoodsList(val);
                    key==data.data.length-1?
                        $('.goods-list-wrap').myCarousel({
                            controls:'.goods-controls'
                        }):'';
                });
            }
        });
    }

    var getGoodsList=function(dt){
        var addCon= '<li class="goods-item carousel-list">'+
                        '<div class="goods-item-pic">'+
                            '<a href="'+dt.goods_href+'" class="lk">'+
                                '<img src="'+dt.goods_img_src+'" class="item-img">'+
                                '<p class="item-name">'+
                                    dt.goods_name+
                                '</p>'+
                            '</a>'+
                            '<span class="item-shadow"></span>'+
                        '</div>'+
                        '<p class="goods-item-price">'+
                            '<span class="item-price-new">'+
                                '<i>￥</i>'+
                                '<span>'+dt.goods_price_new+'</span>'+
                            '</span>'+
                            '<span class="item-price-origin">'+
                                '<i>￥</i>'+
                                '<del>'+dt.goods_price_origin+'</del>'+
                            '</span>'+
                        '</p>'+
                    '</li>';
        
        $gList.append(addCon);
    }
getdata();


}

var ajaxLoadingAnimate={
    start:function($t){
        var addCon='<div class="ajax-loading-animate"></div>';
        $t.append(addCon);
    },
    remove:function($t){
        var $target=$t.find('.ajax-loading-animate');
        $target?$target.remove():'';
    }
    
}
var ajaxLoadingImg={
    start:function($t){
        var addCon='<i class="loading-img" style="display:block;' +
                'position:relative;' +
                'height:25px;width:25px;' +
                'margin:0 auto;' +
                'background:url(../images/index/loading.gif)"></i>';
        $t.append(addCon);
    },
    remove:function($t){
        var $e=$t.find('.loading-img');
        $e.remove();
    }
}

var getData=function(){
    var $ele=$('.find'),
        $bd=$ele.find('.box-bd');
        if( $ele.offset().top <=$(window).scrollTop()) console.log('大于')
    $.ajax({
        type:'get',
        url:'../data/fbt.json',
        dataType:'json',
        beforeSend:function(){
            ajaxLoadingImg.start($bd);
        },
        complete:function(){
            ajaxLoadingImg.remove($bd);
        },
        success:function(data){
            if(!data&&data.data_name=='fbt'&&data.data_content) return;
            $.each(data.data_content,function(key,c_data){
                if(!c_data.content) return;
                switch (c_data.c_name){
                    case 'find':
                        var $ul=$bd.find('.find-list');
                        $.each(c_data.content,function(key,d){
                            var addCon= '<li class="find-item">'+
                                            '<a href="'+d.item_href+'" class="find-item-lk">'+
                                                '<p class="find-item-name">'+d.item_name+'</p>'+
                                                '<img src="'+d.item_img_src+'" title="'+d.item_text+'" class="find-item-img" alt="'+d.item_text+'"/>'+
                                            '</a>'+
                                          '</li>';
                            $ul.append(addCon);
                        });
                        break;
                    case 'sup':
                        var $e=$('.'+c_data.c_name).find('.box-bd');
                        $.each(c_data.content,function(key,d){
                            var addImg='';
                            var addImg2='';
                            for(i in d.item_img_src){
                                if(i>2){
                                    addImg2+='<img src="'+d.item_img_src[i]+'" class="sup-img"/>';
                                    continue;
                                }
                                addImg+='<img src="'+d.item_img_src[i]+'" class="sup-img"/>';
                            }
                            var addCon='<div class="sup-page">'+
                                      '<a href="'+d.item_href[0]+'" class="sup-page-lk">'+
                                        '<p class="sup-desc">'+d.item_tit[0]+'</p>'+
                                        addImg+
                                      '</a>'+
                                      '<div class="sup-line"></div>'+
                                      '<a href="'+d.item_href[1]+'" class="sup-page-lk">'+
                                        '<p class="sup-desc">'+d.item_tit[1]+'</p>'+
                                        addImg2+
                                        '</a>'+
                                    '</div>';
                            $e.append(addCon);
                            
                        });
                        supControls($e);
                        break;
                    case 'top':
                        var $e=$('.'+c_data.c_name);
                        var tit='',
                            img_src='';
                        $.each(c_data.content,function(key,d){
                            
                            for(i in d.item_tit){
                                tit+='<a href="javascript:;" class="tab-head-item">' +d.item_tit[i]+'</a>';
                            }
                            for(i in d.item_img_src){
                                img_src+='<div class="tab-content-item"><img src=" '+d.item_img_src[i]+'"></div>';
                            }
                        })
                        var addCon= '<div class="top-tab-head">'+
                                    tit+
                                    '</div>'+
                                    '<div class="top-tab-content">'+
                                    img_src+
                                    '</div>'
                        $e.find('.box-bd').append(addCon);
                        $('.box-bd',$e).tabs3({
                            headPanel:'.top-tab-head',
                            contentPanel:'.top-tab-content',
                            side:true
                        });
                }
               
            });
        }
    });
}

var supControls=function($box){
    var $box=$box,
        $page=$box.find('.sup-page'),
        $btn,$tips,$li;
    var _init={
        index:0,
        reindex:0,
        timer,
        speed:1000,
        autoPlay:false,
        time:5000,
        tips:true
    }
    var init=function(){
        $page.eq(0)
                .css({'opacity':'1'})
            .siblings('.sup-page')
                .css({'opacity':'0'});
        var addControls= '<a href="javascript:;" class="btn prev">'+'<i class="fa fa-angle-left"></i></a>'+
                    '<a href="javascript:;" class="btn next"><i class="fa fa-angle-right"></i></a>';
        $box.append(addControls);
        $btn=$box.find('.btn'),
        _init.tips?addTips():'';
        
        thishover($box);
        thisclick($box);

        $li.eq(_init.index)
                .addClass('active')
            .siblings()
                .removeClass('active');
        
    }
    var thisclick=function(box){
        $btn.on('click',function(){
            if($(this).hasClass('prev')){
                _init.index--;            
            }
            if($(this).hasClass('next')){
                _init.index++;
            }
            play();
        });
    }
    var thishover=function(page){
        $box.hover(function(e){
            console.log(e.target)
            clearTimeout(_init.timer);
            $btn.css({'display':'block'});
        },function(e){
            _init.autoPlay?play():'';
            $btn.css({'display':'none'});
        });

    }
    var addTips=function(){
        var add='';
        for(var i=0;i<$page.length;i++){
            add+='<li></li>';
        }
        var addCon= '<ul class="tips">'+
                        add+
                    '</ul>';
        $box.append(addCon);
        $tips=$box.find('.tips');
        $li=$tips.find('li');
        $li.hover(function(e){
            if(e.target)
            $(e.target).addClass('active')
                .siblings().removeClass('active');
            _init.index=$(this).index();
            play();
        },function(){
            
        });
    }
    var play=function(){
        var
            idx=_init.index,
            reidx=_init.reindex,
            speed=_init.speed;


        if(idx>$page.length-1){
            _init.index=0;
        }
        if(idx<0){
            _init.index=$page.length-1;
        }
        $page.eq(_init.index)
                .css({'opacity':'1'})
            .siblings('.sup-page')
                .css({'opacity':'0'});
        $li.eq(_init.index)
                .addClass('active')
            .siblings('li')
                .removeClass('active');
        if(!_init.autoPlay) return;

        _init.timer=setTimeout(function(){
            play();
        },_init.time);
    }
    init();
}

