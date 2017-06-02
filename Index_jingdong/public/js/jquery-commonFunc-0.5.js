; (function ($) {
    $.fn.extend({
        dropdownLayer: function (options) {//下拉内容 
            var __DEFAULTS__ = {
                layer: $('.dropdown-layer')
            }
            var ops = $.extend({}, __DEFAULTS__, options);

            var _this = this,
                func = ops.func;

            _this.hover(function () {
                var $layer = $(".dropdown-layer", this)
                $layer.show();
                func ? f() : '';
                function f() {
                    var len = $layer.children('.dd-item').length;
                    len ? '' : func();
                }
            }, function () {
                var $layer = $(".dropdown-layer", this);
                $layer.hide();
            });
        }
    })
})(jQuery);