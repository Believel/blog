"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../types.d.ts" />
// 上面是：显式地引入手动补齐的缺失的类型声明文件
var ecstatic_1 = __importDefault(require("ecstatic"));
var http_1 = __importDefault(require("http"));
// 简单静态文件服务 NPM 模
var HttpServer = /** @class */ (function () {
    function HttpServer(options) {
        // process.cwd(): /Users/xxx/studys/blog/Ts/http-serve
        var root = options.root || process.cwd();
        this.server = http_1.default.createServer((0, ecstatic_1.default)({
            root: root,
            cache: options.cache === undefined ? 3600 : options.cache,
            showDir: true,
            defaultExt: 'html',
            gzip: true,
            contentType: 'application/octet-stream'
        }));
    }
    HttpServer.prototype.listen = function (port) {
        this.server.listen(port);
    };
    HttpServer.prototype.close = function () {
        this.server.close();
    };
    return HttpServer;
}());
exports.default = HttpServer;
//# sourceMappingURL=http-serve.js.map