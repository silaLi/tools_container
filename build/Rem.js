"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _window = window;
var _document = document;
_window.onresize = a;
function a() {
    var c = _document.getElementsByTagName('html')[0];
    var b = c.clientWidth;
    c.style.fontSize = b / 20 / 16 * 100 + 'px';
}
function Init() {
    a();
}
exports.Init = Init;
;
exports.default = { init: Init };
