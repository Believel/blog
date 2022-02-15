// 自定义指令
// 必须以 小写字母 v开头的小驼峰 的格式来命名本地自定义指定
const vFocus = {
  mounted: (el) => el.focus()
}

export {
  vFocus
}