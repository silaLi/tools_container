let _$ = require('./DomAPI-0.0.2.js');
let AutoprefixerCssStyle = require('./AutoprefixerCssStyle-0.0.1.js');

export default class VerticalSwiper {
    swiper: any;
    wrapper: any;
    trackY: any;
    trainY: any;

    swiperHeight: number;
    wrapperHeight: number;
    trackHeight: number;
    trainHeight: number;
    constructor(option) {
        this.swiper = option.swiper;
        this.wrapper = option.wrapper;
        this.trackY = option.trackY;
        this.trainY = option.trainY;

        this.swiperHeight = this.swiper.clientHeight;
        this.wrapperHeight = this.wrapper.clientHeight;

        this.trackHeight = this.trackY.clientHeight;
        this.trainHeight = this.swiperHeight / this.wrapperHeight * this.trackHeight;

        this.trainY.css({ height: this.trainHeight + 'px', top: 0})
        this.Event();
    }
    Event(){

    }
    setScrollTop(){
        
    }
}
function getElemHeight(elem){
    elem.style.cssText = 'visibility: hidden;display: block';
    let height = 0;
    try{
        height = elem.clientHeight;
    }catch(e){ }
    
    elem.style.cssText = '';
    return height;
}
