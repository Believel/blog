// Ajax: Async JavaScript and XML,即异步的JavaScript和XML,是一种创建交互式网页应用的网页开发技术，可以在不重新加载整个网页的情况下，与服务器交换数据，并且重新部分网页
function format(params) {
  let str = '';
  Object.keys(params).forEach(key => {
    str += `${key}=${params[key]}`
  })
  return str
}

function ajax(options) {
  // 1. 初始化一个 XMLHttpRequest 实例对象
  const xhr = new XMLHttpRequest()

  // 初始化参数
  options = options || {}
  options.type = (options.type || 'GET').toUpperCase()
  options.dataType = options.dataType || 'json'
  const params = options.data

  // 发送请求
  if (options.type === 'GET') {
    // 处理params为字符串：a=b&c=3
    xhr.open('GET', options.url + '?' + format(params), true)
    xhr.send(url)
  } else if (options.type === 'POST') {
    xhr.open('POST', options.url, true)
    xhr.send(params)
  }

  // 用于监听服务器端的通信状态，主要监听的属性为 xhr.readyState
  xhr.onreadystatechange = function() {
    // 整个请求过程完毕
    if (xhr.readyState === 4) {
      if (xhr.status >=200 && xhr.status <= 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML)
        console.log(xhr.responseText) // 服务端返回的结果
      } else if (xhr.status >= 400) {
        options.fail && options.fail(xhr.status)
        console.log('错误信息：' + xhr.status)
      }
    }
  }

  // 与服务器建立连接
  // xhr.open(method, url, [async][,user][,password])
}