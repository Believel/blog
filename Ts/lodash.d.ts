// declare module '模块名' {}
declare module 'lodash' {
  export function first<T extends unknown>(array: T[]): T
}

// 声明的文件 主要是为了给其他没有类型声明的第三方代码补齐类型