export class DomAPI {
  static version = '0.0.4';
  private elemList: Array<Element>;
  elemSelector: string;
  elemParents: Array<Element>;
  constructor(elemSelector: string = "", elemParents?: Array<Element>) {
    this.elemSelector = elemSelector;
    this.elemParents = elemParents || [];
  }
  /**
   * 设置类的可操作的Dom元素列表
   * 
   * @param {Array<Element>} elemList 
   * @memberof DomAPI
   */
  setElemList(elemList: Array<Element>): void {
    this.elemList = elemList;
  }
  /**
   * 返回可以操作的Dom元素个数
   * 
   * @returns {number} 
   * @memberof DomAPI
   */
  size(): number {
    return this.getElemList().length;
  }
  /**
   * 获取Dom元素列表
   * 仅只能这样获取
   * 
   * @param {number} [index] 
   * @returns {Array<Element>} 
   * @memberof DomAPI
   */
  getElemList(index?: number): Array<Element> {
    if (this.elemList == null) {
      this.elemParents = [].slice.call(this.elemParents);
      if (this.elemParents.length === 0) {
        this.elemList = _$s(this.elemSelector);
      } else {
        this.elemList = [];
        this.elemParents.forEach((elemParent) => {
          this.elemList = ([].slice.call(_$s(this.elemSelector, elemParent))).concat(this.elemList);
        })
      }
    }
    return this.elemList;
  }
  /**
   * 返回指定下标的Dom元素
   * 同比eq方法
   * 
   * @param {number} index 
   * @returns 
   * @memberof DomAPI
   */
  getEl(index: number): Element {
    let list: Array<Element> = this.getElemList();
    return list[index];
  }
  /**
   * 返回指定下标的DomAPI类型Dom元素
   * 同比getEl方法
   * 
   * @param {number} index 
   * @returns {DomAPI} 
   * @memberof DomAPI
   */
  eq(index: number): DomAPI {
    return DomAPI.CreateByElem(this.getElemList()[index]);
  }
  /**
   * 遍历当前控制元素
   * 
   * @param {(elem: Element, index: number) => void} handle 
   * @memberof DomAPI
   */
  each(handle: (elem: Element, index: number) => void) {
    this.getElemList().forEach((thisElem, thisIndex) => handle(thisElem, thisIndex));
  }
  /**
   * 获取元素数组中的一部分，参数详情参考Array.slice
   * 
   * @param {number} [start] 
   * @param {number} [end] 
   * @returns 
   * @memberof DomAPI
   */
  slice(start?: number, end?: number) {
    return DomAPI.CreateByElemList(this.getElemList().slice(start, end));
  }
  /**
   * 在当前Dom元素下的查找选择器的元素
   * 
   * @param {string} selector 
   * @returns {DomAPI} 
   * @memberof DomAPI
   */
  find(selector: string): DomAPI {
    return new DomAPI(selector, this.getElemList());
  }
  /**
   * 把元素添加当前可操作元素的最后一个子元素的后面
   * 
   * @param {Array<Element>} insertElemList 
   * @memberof DomAPI
   */
  append(insertElemList: Array<Element>) {
    this.getElemList().forEach((elem) => {
      insertElemList.forEach((insertElem) => {
        elem.appendChild(insertElem)
      })
    })
  }
  /**
   * 把元素添加当前可操作元素的第一个子元素的前面
   * 按数组顺序添加
   * 
   * @param {Array<Element>} insertElemList 
   * @memberof DomAPI
   */
  appendBefore(insertElemList: Array<Element>) {
    this.getElemList().forEach((elem) => {
      for (let i = insertElemList.length - 1; i >= 0; i--) {
        elem.insertBefore(insertElemList[i], elem.children[0])
      }
    })
  }
  /**
   * 把元素插入到当前元素的前面
   * 
   * @param {Array<Element>} elemList 
   * @memberof DomAPI
   */
  insertFront(elemList: Array<Element>): void {
    elemList.forEach(newElem => {
      this.getElemList().forEach(meElem => meElem.parentElement && meElem.parentElement.insertBefore(newElem, meElem));
    });
  }
  /**
   * 把当前元素从渲染树中删除
   * 
   * @memberof DomAPI
   */
  remove() {
    this.getElemList().forEach(elem => {
      if (elem.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    })
  }
  /**
   * 用新元素替换当前元素
   * 
   * @param {Element} newElem 
   * @memberof DomAPI
   */
  replace(newElem: Element) {
    this.getElemList().forEach(oldElem => oldElem.parentElement && oldElem.parentElement.replaceChild(newElem, oldElem));
  }
  /**
   * 获取元素的父元素
   * 
   * @returns {DomAPI} 
   * @memberof DomAPI
   */
  parent(): DomAPI {
    let parentList: Array<Element> = [];
    this.getElemList().forEach(elem => {
      if(elem.parentElement)
        parentList.push(elem.parentElement)
    });
    return DomAPI.CreateByElemList(parentList);
  }
  /**
   * 获取所有满足条件的父元素
   * 
   * @param {string} parentElementSelector 
   * @returns {DomAPI} 
   * @memberof DomAPI
   */
  parents(parentElementSelector: string): DomAPI {
    let parentList: Array<Element> = [];
    if (parentElementSelector) {
      let parentCandidate = new DomAPI(parentElementSelector).getElemList();
      let pElem = this.getEl(0).parentElement;
      while ( pElem && pElem.tagName.toUpperCase() == 'body'.toUpperCase()) {
        parentCandidate.forEach(parentElementElem => {
          if (pElem == parentElementElem) {
            parentList.push(parentElementElem)
          }
        })
        if(pElem.parentElement)
        pElem = pElem.parentElement;
      }
    }
    return DomAPI.CreateByElemList(parentList);
  }
  /**
   * 给当前元素添加处理事件
   * 事件名可以以空格分割添加多个事件，如："click change input", "click"
   * 
   * @param {string} eventType 
   * @param {(ev) => void} handle 
   * @memberof DomAPI
   */
  on(eventType: string, handle: (ev: Event) => void) {
    EventCustomize.On(this.getElemList(), eventType, handle);
  }
  /**
   * 从当前元素删除处理事件
   * 事件名可以以空格分割添加多个事件，如："click change input", "click"
   * 
   * @param {string} eventType 
   * @param {(ev) => void} handle 
   * @memberof DomAPI
   */
  off(eventType: string, handle: (ev: Event) => void) {
    EventCustomize.Off(this.getElemList(), eventType, handle);
  }
  /**
   * 给当前元素设置css样式
   * 如{display: 'none', "font-size": "28px", fontSize: "28px"}
   * 
   * @param {Object} cssStyle 
   * @memberof DomAPI
   */
  css(cssStyle: any): void {
    this.getElemList().forEach(elem => {
      try {
        for (let cssName in cssStyle) {
          if (cssStyle.hasOwnProperty(cssName)) {
            let anyElem: any = elem;
            anyElem.style[cssName] = cssStyle[cssName];
          }
        }
      } catch (e) {
        console.error('DomAPI.css error');
      }
    })
  }
  /**
   * 设置元素的高度
   * 
   * @param {number} h 
   * @memberof DomAPI
   */
  height(h: number): void {
    this.css({ height: h + 'px' });
  }
  /**
   * 设置元素的宽度
   * 
   * @param {number} w 
   * @memberof DomAPI
   */
  width(w: number): void {
    this.css({ width: w + 'px' });
  }
  /**
   * 获取元素的属性值
   * 仅获取第一个元素的属性值
   * 
   * @param {any} name 
   * @returns {string} 
   * @memberof DomAPI
   */
  getAttr(name: string): string {
    if (this.getElemList()[0]) {
      return CommonAttr.get(this.getElemList()[0], name) || "";
    } else {
      return '';
    }
  }
  /**
   * 设置元素的属性值
   * 全部元素设置
   * 
   * @param {string} name 
   * @param {string} value 
   * @memberof DomAPI
   */
  setAttr(name: string, value: string): void {
    this.getElemList().forEach(elem => CommonAttr.set(elem, name, value));
  }
  /**
   * 删除元素的属性值
   * 所有元素
   * 
   * @param {any} name 
   * @memberof DomAPI
   */
  removeAttr(name: string): void {
    this.getElemList().forEach(elem => CommonAttr.remove(elem, name));
  }
  /**
   * 清除元素所有子元素
   * 
   * @memberof DomAPI
   */
  empty(): void {
    this.getElemList().forEach(elem => elem.innerHTML = '');
  }
  /**
   * 设置元素显示文本
   * 会先清除元素内的所有内容，后再设置文本
   * 
   * @param {string} text 
   * @memberof DomAPI
   */
  text(text: string): void {
    let textElem = document.createTextNode(text);
    this.empty();
    this.getElemList().forEach(elem => {
      elem.appendChild(textElem.cloneNode());
    })
  }
  /**
   * 对元素内部html进行赋值
   * 
   * @param {string} html 
   * @memberof DomAPI
   */
  html(html: string): void {
    this.getElemList().forEach(elem => {
      elem.innerHTML = html;
    })
  }
  /**
   * dom节点添加className
   * 
   * @param {string} className 
   * @memberof DomAPI
   */
  addClass(className: string): void {
    this.getElemList().forEach(elem => ClassCustomize.addClass(elem, className));
  }
  /**
   * dom节点删除className
   * 
   * @param {string} className 
   * @memberof DomAPI
   */
  removeClass(className: string): void {
    this.getElemList().forEach(elem => ClassCustomize.removeClass(elem, className));
  }
  /**
   * 判断元素是否包含className
   * 所有元素包含className，返回true；否则返回false
   * 
   * @param {string} className 
   * @returns {boolean} 
   * @memberof DomAPI
   */
  containClass(className: string): boolean {
    let elemList = this.getElemList();
    for (let i = 0, len = elemList.length; i < len; i++) {
      if (ClassCustomize.containsClass(elemList[i], className) == false) {
        return false;
      }
    }
    return true;
  }
  /**
   * 包含className的元素过滤器
   * 包含className的执行yesHandle函数
   * 不包含className的执行noHandle函数
   * 
   * @param {string} className 
   * @param {(elem) => void} yesHandle 
   * @param {(elem) => void} noHandle 
   * @memberof DomAPI
   */
  containClassFilter(className: string, yesHandle: (elem: Element) => void, noHandle: (elem: Element) => void): void {
    this.getElemList().forEach(elem => {
      if (ClassCustomize.containsClass(elem, className)) {
        yesHandle(elem);
      } else {
        noHandle(elem);
      }
    })
  }
  /**
   * addClass与removeClass切换
   * className存在就remove，不存在就add
   * 
   * @param {string} className 
   * @memberof DomAPI
   */
  toggleClass(className: string): void {
    this.getElemList().forEach(elem => {
      if (ClassCustomize.containsClass(elem, className)) {
        ClassCustomize.removeClass(elem, className);
      } else {
        ClassCustomize.addClass(elem, className);
      }
    })
  }
  /**
   * 显示元素
   * 
   * @memberof DomAPI
   */
  show(): void {
    this.css({ display: 'block' });
  }
  /**
   * 隐藏元素
   * 
   * @memberof DomAPI
   */
  hide(): void {
    this.css({ display: 'none' });
  }
  /**
   * 获取第一个元素距离顶部有多高
   * default 0
   * 
   * @returns {number} 
   * @memberof DomAPI
   */
  positionTop(): number {
    let thiselem = this.getElemList()[0];
    let top = 0
    if (thiselem) {
      try {
        let a: any = thiselem;
        let elem: HTMLElement = a;
        while (elem.tagName != 'BODY' && elem.tagName != 'HTML') {
          top += elem.offsetTop
          if (elem.parentElement)
            elem = elem.parentElement;
          else
            break;
        }
      } catch (e) {
        console.error('DomAPI positionTop error')
      }
    }
    return top;
  }

  /**
   * 通过字符串创建DomAPI类
   * 
   * @static
   * @param {string} htmlStr 
   * @returns {DomAPI} 
   * @memberof DomAPI
   */
  static CreateByHtmlString(htmlStr: string): DomAPI {
    let a: DomAPI = new DomAPI();
    a.setElemList(CommonFastRender(htmlStr));
    return a;
  }
  /**
   * 通过dom数组创建DomAPI类
   * 
   * @static
   * @param {Array<Element>} elemList 
   * @returns {DomAPI} 
   * @memberof DomAPI
   */
  static CreateByElemList(elemList: Array<Element>): DomAPI {
    let a: DomAPI = new DomAPI();
    a.setElemList(elemList);
    return a;
  }
  /**
   * CreateByElemList方法的缩写
   * 
   * @static
   * @param {Array<Element>} elemList 
   * @returns {DomAPI} 
   * @memberof DomAPI
   */
  static Create(elemList: Array<Element>): DomAPI {
    return DomAPI.CreateByElemList(elemList);
  }
  /**
   * 通过一个元素创建DomAPI类
   * 
   * @static
   * @param {Element} elem 
   * @returns {DomAPI} 
   * @memberof DomAPI
   */
  static CreateByElem(elem: Element): DomAPI {
    return DomAPI.CreateByElemList([elem]);
  }
}
class CommonAttr {
  static get(elem: Element, name: string): string | null {
    return elem.getAttribute(name);
  }
  static set(elem: Element, name: string, value: string): void {
    elem.setAttribute(name, value);
  }
  static remove(elem: Element, name: string): void {
    elem.removeAttribute(name);
  }
}
class EventCustomize {
  static On(elemList: Array<Element>, eventType: string, next: (ev: Event) => void, useCapture = true) {
    elemList.forEach((elem) => {
      EventCustomize.Bind(elem, eventType, next, useCapture);
    })
  }
  static Bind(elem: Element, eventType: string, next: (ev: Event) => void, useCapture: boolean) {
    let eventTypes: Array<string> = eventType.split(' ');
    eventTypes.forEach((eventType) => {
      elem.addEventListener(eventType, next, useCapture);
    });
  }
  static Off(elemList: Array<Element>, eventType: string, next: (ev: Event) => void, useCapture = true) {
    elemList.forEach((elem) => {
      EventCustomize.UnBind(elem, eventType, next, useCapture);
    })
  }
  static UnBind(elem: Element, eventType: string, next: (ev: Event) => void, useCapture: boolean) {
    let eventTypes: Array<string> = eventType.split(' ');
    eventTypes.forEach((eventType) => {
      elem.removeEventListener(eventType, next, useCapture);
    });
  }
}
function CommonFastRender(str: string): Array<Element> {
  let div: Element = document.createElement('div');
  div.innerHTML = str;

  let childElements: Array<Element> = [];
  for (var i = 0, len = div.children.length - 1; i <= len; i++) {
    if (div.children[i].nodeType == 1) {
      childElements.push(div.children[i]);
    }
  }
  return childElements;
}

function _$(selector: string, elem?: Element): Element | null {
  return elem ? elem.querySelector(selector) : document.querySelector(selector)
}

function _$s(selector: string, elem?: Element): Array<Element> {
  let nodeList: NodeListOf<Element> = elem ? elem.querySelectorAll(selector) : document.querySelectorAll(selector);
  let elemList: Array<Element> = [];
  for (let i = 0, len = nodeList.length; i < len; i++) {
    elemList[i] = nodeList[i]
  }
  return elemList;
}
class ClassCustomize {
  static addClass(elem: Element, className: string) {
    if (!elem) {
      return 'there is no elem';
    }

    let classList = ClassCustomize.getClassList(elem);
    if (ClassCustomize.contains(classList, className) < 0) {
      classList.push(className)
    }
    ClassCustomize.setClassList(elem, classList)
    return elem;
  }
  static removeClass(elem: Element, className: string): void {
    let classList = ClassCustomize.getClassList(elem);
    let index = ClassCustomize.contains(classList, className);
    if (index >= 0) {
      classList.splice(index, 1);
      ClassCustomize.setClassList(elem, classList);
    }
  }
  static containsClass(elem: Element, className: string): boolean {
    let classList = ClassCustomize.getClassList(elem);
    if (ClassCustomize.contains(classList, className) < 0) {
      return false
    }
    return true;
  }
  static setClassList(elem: Element, classList: Array<string>): void {
    elem.className = classList.join(' ');
  }
  static getClassList(elem: Element): Array<string> {
    let classList = (elem.className || '').split(' ')
    for (let i = classList.length - 1; i >= 0; i--) {
      if (classList[i] === '') {
        classList.splice(i, 1);
      }
    }
    return classList;
  }
  static contains(classList: Array<string>, className: string) {
    for (var i = 0, len = classList.length; i < len; i++) {
      if (classList[i] == className) {
        return i;
      }
    }
    return -1;
  }
}
