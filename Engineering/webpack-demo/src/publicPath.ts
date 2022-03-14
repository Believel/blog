// node端设置静态 cdn 路径， 在这里获取后拼接静态 publicPath
const path = document.querySelector('meta[name="AppPublic"]');

// @ts-ignore
__webpack_public_path__ = path ? path.getAttribute("content") : "/";

// 在运行时设置 publicPath
// webpack 暴露一个名为 __webpack_public_path__ 的全局变量。所以在应用程序的 entry point 中，可以直接设置
