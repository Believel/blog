
// ! 虚拟 DOM: 用JavaScript描述真实的DOM对象
// ! 渲染器作用是将虚拟DOM渲染为真实的DOM
// 展示一个 vnode 是标签元素
const vnode = {
  // 字符串时表示是原生的HTML元素，函数时表示是一个组件
  tag: 'div',
  props: {
    onClick: () => alert('哈哈哈')
  },
  children: 'hello'
}

// 组件的本质是：对一组DOM元素的封装
function comp () {
  return {
    tag: 'p',
    props: {
      onClick: () => alert('我是p标签')
    },
    children: '这是一个段落'
  }
}
// 展示 vnode 是一个组件
const vnode2 = {
  tag: comp
}

// 渲染器： 把用 JavaScript对象 描述的虚拟 DOM,渲染为真实的 DOM
function render (vnode, container) {
  if (typeof vnode.tag === 'string') {
    mountElement(vnode, container)
  } else if (typeof vnode.tag === 'function') {
    mountComponent(vnode, container)
  }
}

// vnode描述的是标签元素
function mountElement (vnode, container) {
  const el = document.createElement(vnode.tag)

  for (let key in vnode.props) {
    // 处理事件
    if (/^on/.test(key)) {
      el.addEventListener(key.substr(2).toLocaleLowerCase(), vnode.props[key])
    }
  }
  // 处理children
  if (typeof vnode.children === 'string') {
    // 文本节点
    el.appendChild(document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode.children)) {
    // 递归地调用 render 函数渲染子节点，使用当前元素 el 作为挂载点
    vnode.children.forEach(child => render(child, el))
  }
  // 将元素添加到挂载点下
  container.appendChild(el)
}

// vnode 描述的是组件
function mountComponent (vnode, container) {
  // 调用组件函数，获取组件要渲染的内容（vnode）
  const subtree = vnode.tag()
  // 递归的调用 render 渲染 subtree
  render(subtree, container)
}

// 使用
render(vnode, document.body)
render(vnode2, document.body)
