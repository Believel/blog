"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var http_serve_1 = __importDefault(require("./http-serve"));
commander_1.program
    .option('--cache, <cache>', '设置缓存时间，秒数')
    .option('--root, <root>', '静态文件目录')
    .option('-p, --port, <port>', '监听端口', '3000')
    .action(function (options) {
    var root = options.root, cache = options.cache, port = options.port;
    var server = new http_serve_1.default({
        root: root,
        cache: (cache && parseInt(cache))
    });
    server.listen(+port);
    console.log("\u76D1\u542C ".concat(port));
});
commander_1.program.parse(process.argv);
//# sourceMappingURL=cli.js.map