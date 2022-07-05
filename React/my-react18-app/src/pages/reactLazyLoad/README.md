# react-lazyload
> 主要采用的类组件实现的

# 使用场景
1. 用在列表渲染每项时，需要在每项上出现在可视范围内才显示出来，此组件必传每项元素的高度

# 实现思路
1. 存储所有的要渲染的元素在数组中，即存储的是当前的实例对象
```js
// 类组件中：直接传递 this 属性 即为实例
// 然后获取当前实例元素：
// 方法1：const node = ReactDOM.findDOMNode(component),不过这个方法 deprecated
// 方法2：const node = component.ref,前提是组件的外层容器定义 ref 属性, 然后赋给实例中的 ref 实例属性
```
2. 如果元素的高度（node.getBoundingClientRect().top）在可视区域的高度(window.innerHeight || document.documentElement.clientHeight)内就渲染要显示的UI,并删除数组中这个元素,否则就显示默认的UI
  * 如果指定了特定的外层容器parent, 那么可是区域的高度
  ```js
  // 父容器大小
  const {
      top: parentTop,
      left: parentLeft,
      height: parentHeight,
      width: parentWidth
    } = parent.getBoundingClientRect()
  // 整个页面大小
  const windowInnerHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowInnerWidth =
    window.innerWidth || document.documentElement.clientWidth;
  // 可视区域的大小
  const intersectionTop = Math.max(parentTop, 0); // intersection's top relative to viewport
  const intersectionLeft = Math.max(parentLeft, 0);
  const intersectionHeight =
    Math.min(windowInnerHeight, parentTop + parentHeight) - intersectionTop; // height
  const intersectionWidth =
    Math.min(windowInnerWidth, parentLeft + parentWidth) - intersectionLeft; // width
  // 元素大小
  const { top, left, height, width } = node.getBoundingClientRect()
  // 元素相对于可视区域大小
  const offsetTop = top - intersectionTop; // element's top relative to intersection
  const offsetLeft = left - intersectionLeft; // element's left relative to intersection

  // 是否显示
  // offset是距离容器的多远会触发
    offsetTop - offsets[0] <= intersectionHeight &&
    offsetTop + height + offsets[1] >= 0 &&
    offsetLeft - offsets[0] <= intersectionWidth &&
    offsetLeft + width + offsets[1] >= 0

  ```
3. 当元素滚动的时候, 监听滚动事件，遍历存储页面实例的数组，判断每一项是否显示