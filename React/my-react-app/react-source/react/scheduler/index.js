
import { push, peek, pop } from './minHeap'
let taskQueue = [];
let taskIdCounter = 1;
export function scheduleCallback(callback) {
  const currentTime = getCurrentTime()
  const timeout = -1
  const expirationTime = currentTime - timeout
  const newTask = {
    id: taskIdCounter++,
    callback,
    expirationTime,
    sortIndex: expirationTime
  }
  push(taskQueue, newTask)
  // 请求调度
  requestHostCallback()
}

function requestHostCallback() {
  port.postMessage(null)
}
// MessageChannel   浏览器提供的一种数据通信接口，可用来实现订阅发布。其特点是其两个端口属性支持双向通信和异步发布事件
// 创建一个新的消息通道，并通过它的两个MessagePort属性发送数据
// port1: 返回channel的port1,只读
// port2: 返回channel的port2,只读
const channel = new MessageChannel()
const port = channel.port2
channel.port1.onmessage = function() {
  workLoop()
}

function workLoop() {
  let currentTask = peek(taskQueue)
  while(currentTask) {
    const callback = currentTask.callback;
    currentTask.callback = null
    callback()
    pop(taskQueue)
    currentTask = peek(taskQueue)
  }
}

export function getCurrentTime() {
  return performance.now();
}