let _$ = require('./DomAPI-0.0.2.js');
export default class Selector {
	elem: any;
	domAPI: any;
	defaultItem: any;
	items: any;
	selectedIndex: any;
	change: any;
	initData: any;
	constructor(opt) {
		opt = opt || {};

		this.elem = opt.elem
		this.domAPI = _$.render(this.elem);

		this.defaultItem = {text: '请选择', value: '请选择'}
		this.defaultItem = opt.defaultItem || this.defaultItem;
		this.items = opt.items || [];
		this.selectedIndex = opt.selectedIndex !== undefined ? opt.selectedIndex : -1;
		this.change = opt.change || function(){}

		this.initData = opt.initData || function(){}
		this.init();
	}
	init(){
		this.setItems(this.items);

		if (this.elem) {
			this.elem.onchange = () => {
				this.setValueByIndex(this.elem.selectedIndex - 1);
			};
		}
	}
	setItems(items){
		this.items = items;
		this.initData && this.initData(this.items);

		var options = [this.defaultItem].concat(this.items);
		this.elem.innerHTML = ''
		if (this.elem) {
			var html = '';
			// 为什么不用innerHTML，因为在IE9的时候会不能插入这标签
			for (var i = 0; i < options.length; i++) {
				options[i].value = options[i].value || options[i].text;
				var option = document.createElement('option');
				option.setAttribute('value', options[i].value);
				option.innerText = options[i].text;
				this.elem.appendChild(option)
				// html += '<option value="'+options[i].value+'">'+options[i].text+'</option>'
			}
			// this.elem.innerHTML = html;
		}
		this.setValueByIndex(-1);
	}
	getValue(){
		return this.items[this.selectedIndex] || {text: '', value: ''};
	}
	getSelectedIndex(){
		return this.selectedIndex;
	}
	setElemValueByIndex(index){
		this.domAPI.find('option[selected]').removeAttr('selected');
		this.domAPI.find('option').index(this.selectedIndex + 1).setAttr('selected');
	}
	setValueByIndex(index){
		if (this.selectedIndex !== index) {
			this.selectedIndex = index;
			this.setElemValueByIndex(index);
			this.change(this)
		}else if(this.selectedIndex < 0){
			this.selectedIndex = -1;
			this.setElemValueByIndex(index);
			this.change(this)
		}
	}
}

