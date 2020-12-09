const ele = {
  tag: 'div',
  attrs: {
    className: 'content',
    id: 'div',
    style: 'width:100px;height:200px;border:1px solid red;text-align:center',
  },
  children: [
    {
      tag: 'p',
      attrs: {
        className: 'header',
        style: 'background-color:#ccc',
      },
      children: ['我是p1啊']
    },
    {
      tag: 'p',
      attrs: {
        className: 'header',
      },
      children: ['我是p2啊']
    },
    {
      tag: 'p',
      attrs: {
        className: 'header',
      },
      children: ['我是p3啊']
    },
    {
      tag: 'p',
      attrs: {
        className: 'header',
      },
      children: ['我是p4啊']
    },
  ]
}

const ReactDOM = {
  render: function (vnode, container) {
    if (!vnode) return;
    if (typeof vnode === 'string') {
      return container.appendChild(document.createTextNode(vnode));
    } else {
      const { tag, attrs, children } = vnode;
      const dom = document.createElement(tag);

      attrs && Object.keys(attrs).forEach(key => {
        const value = attrs[key];
        if (key === 'style') {
          if (!value || typeof value === 'string') {
            dom.style.cssText = value || '';
          } else if (value || typeof value === 'object') {
            for (let k in value) {
              dom.style[k] = value[k];
            }
          }
        } else if (/on\w+/.test(key)) {
          key = key.toLowerCase();
          dom[key] = value || '';
        } else {
          if (key === 'className') {
            key = 'class';
          }
          if (value) {
            dom.setAttribute(key, value);
          } else {
            dom.removeAttribute(key);
          }
          if (key in dom) {
            dom[key] = value || '';
          }
        }
      })
      children.forEach(child => this.render(child, dom));
      return container.appendChild(dom);
    }
  }
}

ReactDOM.render(ele, document.getElementById('root'));

/*
  手动实现React JSX语法

  1、手动编译jsx：创建节点对象，包含以下三个属性：
    - tag：标签名称，字符串类型。
    - attrs：标签属性，对象类型。
    - children：标签子节点，数组类型。
    - 具体实现：
      const ele = {
        tag: 'div',
        attrs: {
          className: 'A',
          id: 'a',
        },
        children: [
          {
            tag: 'p',
            attrs: {
              className: 'B',
              style: 'width: 100px; height: 100px; border: 1px solid red;'
            },
            children:['我是手动实现的p标签']
          }
        ]
      }

  2、实现ReactDOM.render()方法：
    - 整体操作可概括为：
      - 创建标签节点。
      - 设置标签属性值。
      - 递归为标签追加子节点。
    - 具体实现如下：
      - 首先判断传入的节点对象是字符串还是对象，如果是字符串则直接使用document.createTextNode()方法创建文本节点，
      之后使用(根节点).appendChild()追加到根节点上即可。
      - 如果判断不是字符串类型，那么就是对象类型，此时就可从传入的节点对象中获取tag、attrs、children这三个属性。
      - 以tag为标签名，使用document.createElement(tag)设置DOM标签节点。

      - 为创建好的tag标签添加属性，此时需要对属性进行判断，attrs属性可能是style样式，或者是事件名称（onclick、onblur...），
      因此需要具体区分style及事件名称，具体区分如下：
        - 首先使用Object.keys()方法对attrs进行遍历，获取到attrs对象中的所有key值，之后对key值进行判断，
        判断key是否是style，如果是，那么还需要对value进行判断，因为style的属性值可以是字符串类型，也可以是对象类型。
        - 如果key为style，那么就需要对value进行判断，如果value属于字符出类型，
        那么就直接使用(创建的标签名称).style.cssText = value || ''。如果value不是字符串类型，而是对象类型，
        那么就需要对value对象进行遍历，可使用for...in对value进行循环遍历，获取到key，
        之后使用(标签节点).style[key] = value[key]为style属性设置属性值。
        - 如果key为事件类型，那么就需要使用key.toLowerCase()方法将key转为小写，再使用(标签名称)[key] = value || ''。
        - 如果key不为style或者事件类型，那么就是class类属性或者id属性等，如果是classNsme，则首先需要将className转化为class。
        之后判断value是否有值，如果有值那么就直接使用(标签名称).setAttribute(key, value)设置属性，
        否则就使用(标签节点).removeAttribute(key)移除属性。

      - 为标签追加子节点：可以对子节点（children）使用forEach进行遍历，之后为遍历出来的每一项递归执行一次render()方法即可。
*/