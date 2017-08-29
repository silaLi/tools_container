let _window: any = window;
let _document: any = document;
_window.onresize = a;

function a(){
	var c = _document.getElementsByTagName('html')[0];
	var b = c.clientWidth;
	c.style.fontSize=b/20/16*100+'px'
}

export function Init(){
	a();
};
export default {init: Init};