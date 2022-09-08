// pages/list/list.js
// Page() 构造器，注册一个小程序页面，接受一个Object类型参数，其指定页面的初始数据、生命周期回调、事件处理函数等。
// 注意：Object 内容在页面加载时会进行一次深拷贝，需考虑数据大小对页面加载的开销。
Page({

    /**
     * 页面的初始数据
     */
    data: {
        count: 0,
        type: 1
    },
    btnHandler(e) {
        // 事件传参：使用组件中data-*自定义属性传参，其中*代表的是参数的名字
        // 获取事件传参
        const data = e.target.dataset
        console.log(data.info)
    },

    /**
     * 生命周期函数--监听页面加载
     * 一个页面只会调用一次，可以在onLoad的参数中获取打开当前页面路径中的参数
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成，一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
     */
    onReady: function () {
      // getCurrentPages() 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面
      // console.log(getCurrentPages())
    },

    /**
     * 生命周期函数--监听页面显示/切入前台时触发
     * 调用参数 options
     * 小程序进入前台状态：当再次进入微信或再次打开小程序，又会从后台进入前台。
     */
    onShow: function (options) {
      // 获取 App 实例中的数据信息
      console.log(getApp().globalData.globalName)
    },

    /**
     * 生命周期函数--监听页面隐藏/切入后台时触发
     * 小程序进入后台状态：当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁。
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
// 注意
// 1. 当前页面路径的参数获取，只能在onLoad(query)的query参数中获取，无法在onShow()中获取
// 2. onLoad、onReady和onUnload，一个页面都只会调用一次
// 3. 页面是卸载还是切换到后台，这些除了与小程序的后台切换有关系，还会与页面的跳转、切换逻辑有关系