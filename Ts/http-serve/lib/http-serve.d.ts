/// <reference path="../typings/ecstatic/index.d.ts" />
export interface IHttpServerOptions {
    root?: string;
    cache?: number;
}
export interface IHttpServer {
    listen(port: number): void;
    close(): void;
}
export default class HttpServer implements IHttpServer {
    private server;
    constructor(options: IHttpServerOptions);
    listen(port: number): void;
    close(): void;
}
