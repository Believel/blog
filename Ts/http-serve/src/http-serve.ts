/// <reference path="../typings/ecstatic/index.d.ts" />
// 上面是：显式地引入手动补齐的缺失的类型声明文件

/**
 * descriptions: 简单静态文件服务
 */

import ecstatic from 'ecstatic';
import http from 'http'
export interface IHttpServerOptions {
  // 静态文件目录，默认是当前目录
  root?: string;
  // 缓存时间
  cache?: number
}

export interface IHttpServer {
  // 启动服务
  listen(port: number): void;
  // 关闭服务
  close(): void
}

export default class HttpServer implements IHttpServer {
  private server: http.Server
  constructor(options: IHttpServerOptions) {
    // process.cwd(): /Users/xxx/studys/blog/Ts/http-serve
    const root = options.root || process.cwd()
    this.server = http.createServer(ecstatic({
      root,
      cache: options.cache === undefined ? 3600 : options.cache,
      showDir: true,
      defaultExt: 'html',
      gzip: true,
      contentType: 'application/octet-stream'
    }))
  }
  // 启动服务
  public listen(port: number): void {
    this.server.listen(port)
  }
  
  // 关闭服务
  public close(): void {
    this.server.close()
  }
}