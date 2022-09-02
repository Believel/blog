//  ecstatic 并不是一个对 TypeScript 友好的模块，因为它没有内置类型声明文件，也没有第三方贡献的 @types/ecstatic 类型声明模块
//  需要自己本地创建，用来补齐缺失的类型声明
declare module 'ecstatic' {
  export default (options?: {
    root?: string;
    baseDir?: string;
    autoIndex?: boolean;
    showDir?: boolean;
    showDotfiles?: boolean;
    humanReadable?: boolean;
    hidePermissions?: boolean;
    si?: boolean;
    cache?: string | number;
    cors?: boolean;
    gzip?: boolean;
    brotli?: boolean;
    defaultExt?: 'html' | string & {};
    handleError?: boolean;
    serverHeader?: boolean;
    contentType?: 'application/octet-stream' | string & {};
    weakEtags?: boolean;
    weakCompare?: boolean;
    handleOptionsMethod?: boolean;
  }) => any;
}