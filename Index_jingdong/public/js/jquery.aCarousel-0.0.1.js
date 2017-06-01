;(function($){
    var __DEFAULTS__={
        autoPlay:false,
        tips:true,
        speed:1000,
        time:5000
    }
    var _init={
        index:0,
        reindex:0,
        timer
    }
    $.fn.extend({
        "aCarousel":function(options){
            var option=$.extend({},__DEFAULTS__,options);
            _init.this=this;
            _init.speed=option.speed;
            _init.autoPlay=option.autoPlay;
            _init.time=option.time;
            init(option);
            console.log('useit')
        }
    });

    var init=function(option){
        _self=_init.this;
        var addControls= '<a class="prev">'+'<i class="fa fa-angle-left"></i></a>'+
                    '<a class="next"><i class="fa fa-angle-right"></i></a>';
        _self.append(addControls);
        option.tips?addTips():'';
        
    }
    var addTips=function(){
        var _self=_init.this;
        var addCon= '<ul class="tips">'+
                        '<li></li>'+
                        '<li></li>'+
                        '<li></li>'+
                    '</ul>';
        _self.append(addCon);
        var $tips=_self.find('tips'),
            $li=$tips.find('li');
        $tips.hover(function(){
            clearTimeout(_init.timer);
            $(this).addClass('active').sublings().removeClass('active');
            _init.index++;
            play();
        },function(){
            
        });
    }
    var play=function(){
        var _self=_init.this,
            $page=_self.find('.sup-page'),
            idx=_init.index,
            reidx=_init.reindex,
            speed=_init.speed;

        $page.eq(idx).show(speed).subling().hide(speed);
        if(_init.autoPlay) return;
        _init.timer=setTimeout(function(){
            play();
        },_imit.time);
    }
})(jQuery);