import "./publicPath";
import React from "react";
import ReactDOM from "react-dom";
import "./styles/common.css";
import "./styles/style.css";

import App from "@/container/App";

ReactDOM.render(<App />, document.getElementById("root"));

// 引入动态数据 - 懒加载
setTimeout(() => {
  import("./utils/dynamic-data").then((res) => {
    console.log(res.default.message);
  });
}, 1500);
