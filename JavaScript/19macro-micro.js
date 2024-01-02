const p = document.createElement('p')
p.innerText = '这是一段文字'
p.setAttribute('id', 'pp ')

document.body.appendChild(p)

Promise.resolve().then(() => {
 console.log('promise')
 alert('微任务DOM渲染前执行')
})

setTimeout(() => {
  console.log('setTimeout')
  alert('宏任务DOM渲染后执行')
}, 1000)