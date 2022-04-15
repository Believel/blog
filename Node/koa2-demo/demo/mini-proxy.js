const MiniProxy = require("mini-proxy");

const myProxy = new MiniProxy({
  "port": 9393,
  "onBeforeRequest": function(requestOptions) {
    console.log("proxy request:" + requestOptions.host + (requestOptions.path || ""));
  }
})

myProxy.start();
console.log("proxy start at 9393");