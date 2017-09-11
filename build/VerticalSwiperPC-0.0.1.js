"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _$ = require('./DomAPI-0.0.2.js');
var AutoprefixerCssStyle = require('./AutoprefixerCssStyle-0.0.1.js');
var VerticalSwiper = (function () {
    function VerticalSwiper(option) {
        this.swiper = option.swiper;
        this.wrapper = option.wrapper;
        this.trackY = option.trackY;
        this.trainY = option.trainY;
        this.swiperHeight = this.swiper.clientHeight;
        this.wrapperHeight = this.wrapper.clientHeight;
        this.trackHeight = this.trackY.clientHeight;
        this.trainHeight = this.swiperHeight / this.wrapperHeight * this.trackHeight;
        this.trainY.css({ height: this.trainHeight + 'px', top: 0 });
        this.Event();
    }
    VerticalSwiper.prototype.Event = function () {
    };
    VerticalSwiper.prototype.setScrollTop = function () {
    };
    return VerticalSwiper;
}());
exports.default = VerticalSwiper;
function getElemHeight(elem) {
    elem.style.cssText = 'visibility: hidden;display: block';
    var height = 0;
    try {
        height = elem.clientHeight;
    }
    catch (e) { }
    elem.style.cssText = '';
    return height;
}
