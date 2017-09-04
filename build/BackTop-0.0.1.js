"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _$ = require('../component/DomAPI-0.0.2.js');
var AutoprefixerCssStyle = require('../component/AutoprefixerCssStyle-0.0.1.js');
var html = "\n\t<div class=\"back_top\"></div>\n";
var BackTop = (function () {
    function BackTop() {
        this.domAPI = _$.render(html);
        this.elem = this.domAPI.getElemList(0);
        this.appWrapper = _$('.app');
        this.init();
        _$('body').append(this.elem);
    }
    BackTop.prototype.getScrollTop = function () {
        var scrollTop = 0;
        if (this.scrollElem) {
            scrollTop = this.scrollElem.scrollTop;
        }
        else {
            var theHTMLScrollTop = _$('html').getElemList(0).scrollTop;
            var theBODYScrollTop = _$('body').getElemList(0).scrollTop;
            if (theHTMLScrollTop) {
                scrollTop = theHTMLScrollTop;
                this.scrollElem = _$('html').getElemList(0);
            }
            else if (theBODYScrollTop) {
                scrollTop = theBODYScrollTop;
                this.scrollElem = _$('body').getElemList(0);
            }
        }
        return scrollTop;
    };
    BackTop.prototype.startGoTop = function () {
        var _this = this;
        if (this.appWrapper.containClass('scroll-top-animate')) {
            return;
        }
        var scrollTop = this.getScrollTop();
        this.setScrollTop(0);
        this.appWrapper
            .css(AutoprefixerCssStyle.obj('transform', 'translate3d(0, -' + scrollTop + 'px, 0)'))
            .addClass('scroll-top-animate')
            .on('animationend webkitAnimationEnd', function () {
            _this.appWrapper
                .css(AutoprefixerCssStyle.obj('transform', 'translate3d(0, 0, 0)'))
                .removeClass('scroll-top-animate');
        });
    };
    BackTop.prototype.setScrollTop = function (top) {
        if (this.scrollElem) {
            this.scrollElem.scrollTop = top;
        }
        else {
            _$('html').getElemList(0).scrollTop = top;
            _$('body').getElemList(0).scrollTop = top;
        }
    };
    BackTop.prototype.init = function () {
        var _this = this;
        this.domAPI.on('click', function () {
            _this.startGoTop();
        });
    };
    return BackTop;
}());
exports.default = BackTop;
//# sourceMappingURL=BackTop-0.0.1.js.map