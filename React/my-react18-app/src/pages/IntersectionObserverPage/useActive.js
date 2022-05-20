// 判断组件是否激活
import { useState, useEffect } from 'react'
export function useActive(domId) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    // 监听组件dom节点在父级节点rootId内是否可见，并在状态变更时通过第三个回调抛出
    const visibleObserve = new VisibleObserve(domId, 'rootId', setActive)
    // 启动监听
    visibleObserve.observe()
    return () => {
      // 取消监听
      visibleObserve.unobserve()
    }
  }, [domId])
  return active
}
// 监听元素是否可见的抽象类
class AVisibleObserve {
  // 监听元素的 DOM ID
  targetDomId;
  // 可见范围根节点 DOM ID
  rootDomId;
  // 变化回调
  onActiveChange;
  constructor(targetDomId, rootDomId, onActiveChange) {
    this.targetDomId = targetDomId
    this.rootDomId = rootDomId
    this.onActiveChange = onActiveChange
  }
  /**
   * 开始监听
   */
  observe(){

  }
  /**
   * 取消监听
   */
  unobserve() {

  }
}
// 两套方案：方案1：利用setInterval实现的轮询检测的方法；方案2：利用浏览器高级API IntersectionObserver 
// 实现思想：父类关系接口层API,子类关系基于这套接口API如何具体实现
/**
 * 监听元素是否可见总类
 */
class VisibleObserve extends AVisibleObserve {
  actualVisibleObserve;
  constructor(targetDomId, rootDomId, onActiveChange) {
    super(targetDomId, rootDomId, onActiveChange)

    if ('InterSectionObserver' in window) {
      // 最新 IntersectionObserve 方案
      this.actualVisibleObserve = new IntersectionVisibleObserver(targetDomId, rootDomId, onActiveChange)
    } else {
      // 兼容的 SetInterval 方案
      this.actualVisibleObserve = new SetIntervalVisibleObserve(targetDomId, rootDomId, onActiveChange)
    }
  }
  observe() {
    this.actualVisibleObserve.observe()
  }
  unobserve() {
    this.actualVisibleObserve.unobserve()
  }

}
// IntersectionObserve 版本
class IntersectionVisibleObserver extends AVisibleObserve {
  intersectionObserver;
  constructor(targetDomId, rootDomId, onActiveChange) {
    super(targetDomId, rootDomId, onActiveChange)
    this.intersectionObserver = new IntersectionObserver(changes => {
      // 大于0， 可以判断元素是否出现在父级容器中
      if (changes[0].intersectionRatio > 0) {
        onActiveChange(true)
      } else {
        onActiveChange(false)
        // 因为虚拟dom更新导致实际dom更新，也会在此触发，判断dom丢失则重新监听
        if (!document.body.contains(changes[0].target)) {
          this.intersectionObserver.unobserve(changes[0].target)
          this.intersectionObserver.observe(document.getElementById(targetDomId))
        }
      }
    }, {
      root: document.getElementById(rootDomId)
    })
  }
  observe() {
    if (document.getElementById(this.targetDomId)) {
      this.intersectionObserver.observe(document.getElementById(this.targetDomId))
    }
  }
  unobserve() {
    this.intersectionObserver.disconnect()
  }
}
// 兼容版本
class SetIntervalVisibleObserve extends AVisibleObserve {
  interval;
  // 检查是否可见的时间间隔
  checkInterval = 1000
  constructor(targetDomId, rootDomId, onActiveChange) {
    super(targetDomId, rootDomId, onActiveChange)
  }
  /**
   * 判断元素是否可见:
   * 根据容器rootDOMId与组件targetDomId，拿到其对应DOM实例，并调用getBoundingClientReact拿到其对应矩形的位置与宽高
   */
  judgeActive() {
    const rootComponentDom = document.getElementById(this.rootDomId)
    // 当前组件
    const componentDom = document.getElementById(this.targetDomId)
    if (!rootComponentDom && !componentDom) return
    // root 组件 rect  返回元素大小及其相对于视口的位置
    const rootComponentRect = rootComponentDom.getBoundingClientRect()
    // 当前组件 rect
    const componentRect = componentDom.getBoundingClientRect()

    // 算法思路
    // 设容器为root,组件为component
    // 1. 计算root和component长度之和和宽度之和
    // 2. 计算root和component长度之和+两倍间距与宽度之和+两倍间距
    // 3. sumOfWidthWithGap - sumOfWidth 的差值就是横向gap距离，sumOfHeightWithGap - sumOfHeight 的差值就是纵向的gap距离，两个值都为负数表示在内部

    // 判断当前组件是否在 root 组件可视范围内
    // 长度之和
    const sumOfWidth = Math.abs(rootComponentRect.left - rootComponentRect.right) + Math.abs(componentRect.left - componentRect.right)
    // 宽度之和
    const sumOfHeight = Math.abs(rootComponentRect.bottom - rootComponentRect.top) + Math.abs(componentRect.bottom - componentRect.top)
    // 长度之和 + 两倍间距（ 交叉则间距为负）
    const sumOfWidthWithGap = Math.abs(rootComponentRect.left + rootComponentRect.right - componentRect.left - componentRect.right)
    // 宽度之和 + 两倍间距（交叉则间距为负）
    const sumOfHeightWithGap = Math.abs(rootComponentRect.bottom + rootComponentRect.top - componentRect.bottom - componentRect.top)
    if (sumOfWidthWithGap <= sumOfWidth && sumOfHeightWithGap <= sumOfHeight) {
      // 在内部
      this.onActiveChange(true)
    } else {
      // 在外部
      this.onActiveChange(false)
    }
  }
  observe() {
    // 监听时就判断一次元素是否可见
    this.judgeActive()
    this.interval = setInterval(this.judgeActive, this.checkInterval)
  }
  unobserve() {
    clearInterval(this.interval)
  }
}