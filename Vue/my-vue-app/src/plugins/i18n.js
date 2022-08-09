// 插件：是一种能为Vue添加全局功能的工具代码

export default {
	install(app, options) {
		// 注入一个全局可用的 $translate 方法
		app.config.globalProperties.$translate = (key) => {
			return key.split('.').reduce((o, i) => {
				if (o) return o[i]
			}, options)
		}
	}
}