let _$ = require('../component/DomAPI-0.0.2.js');
let AutoprefixerCssStyle = require('../component/AutoprefixerCssStyle-0.0.1.js');

let html = `
	<div class="back_top"></div>
`;
export default class BackTop{
	elem: any;
	domAPI: any;
	scrollElem: any;
	appWrapper: any;
	constructor() {
		this.domAPI = _$.render(html);
		this.elem = this.domAPI.getElemList(0);
		this.appWrapper = _$('.app');

		this.init();
		_$('body').append(this.elem);
	}
	
	getScrollTop(){
		let scrollTop = 0;
		if (this.scrollElem) {
			scrollTop = this.scrollElem.scrollTop;
		}else{
			let theHTMLScrollTop = _$('html').getElemList(0).scrollTop;
			let theBODYScrollTop = _$('body').getElemList(0).scrollTop;
			if (theHTMLScrollTop) {
				scrollTop = theHTMLScrollTop;
				this.scrollElem = _$('html').getElemList(0);
			}else if (theBODYScrollTop) {
				scrollTop = theBODYScrollTop;
				this.scrollElem = _$('body').getElemList(0);
			}
		}

		return scrollTop;
	}
	startGoTop(){
		if ( this.appWrapper.containClass('scroll-top-animate') ) {
			return;
		}
		let scrollTop = this.getScrollTop();

		this.setScrollTop(0);
		this.appWrapper
		.css(AutoprefixerCssStyle.obj('transform', 'translate3d(0, -'+scrollTop+'px, 0)'))
		.addClass('scroll-top-animate')
		.on('animationend webkitAnimationEnd', () => {
			this.appWrapper
			.css(AutoprefixerCssStyle.obj('transform', 'translate3d(0, 0, 0)'))
			.removeClass('scroll-top-animate')
			;
		})
		;

	}
	setScrollTop(top){
		if (this.scrollElem) {
			this.scrollElem.scrollTop = top;
		}else{
			_$('html').getElemList(0).scrollTop = top;
			_$('body').getElemList(0).scrollTop = top;
		}
	}
	init(){
		this.domAPI.on('click', () => {
			this.startGoTop();
		})
	}
}
