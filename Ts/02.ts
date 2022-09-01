// !在使用 ts 编写代码的过程中，遇到：
// 1. 某些库没有提供类型声明
// 2. 库的版本和类型声明不一致
// 3. 没有注入全局变量类型

// !解决办法：增强类型系统
// 1. 声明：declare 关键字，可以声明全局的变量、方法、类、对象。

// 在 TypeScript 中，以 .d.ts 为后缀的文件为声明文件。
// 使用声明文件：安装 TypeScript 依赖后，一般我们会顺带安装一个 lib.d.ts 声明文件，这个文件包含了 JavaScript 运行时以及 DOM 中各种全局变量的声明，如下示例：

// typescript/lib/lib.d.ts
/// <reference no-default-lib="true"/>
/// <reference lib="es5" />
/// <reference lib="dom" />
/// <reference lib="webworker.importscripts" />
/// <reference lib="scripthost" />

// 其中 /// 是ts中三斜线指令，后面的内容类似于 XML 标签的语法，用来指代引用其他的声明文件。通过三斜线指令，我们可以更好地复用和拆分类型声明
// no-default-lib="true" 表示这个文件是一个默认库。而最后 4 行的lib="..." 表示引用内部的库类型声明。


// !操作类型接口
// !1. Partial 工具类型可以将一个类型的所有属性变为可选的，且该工具类型返回的类型是给定类型的所有子集

// type Partial<T> = {
//   [P in keyof T]?: T[P]
// }
interface Person {
  name: string
  age?: number;
  weight?: number
}

type PartialPerson = Partial<Person>
// 相当于
// interface PartialPerson {
//   name?: string
//   age?: number;
//   weight?: number
// }

// !2. Required 工具类型可以将给定类型的所有属性变为必填的
  // type Required<T> = {
  //   [P in keyof T]-?: T[P];
  // };

type RequiredPerson = Required<Person>
// 相当于
// interface RequiredPerson {
//   name: string;
//   age: number;
//   weight: number;
// }

// !3. Readonly 工具类型可以将给定类型的所有属性设为只读
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// };
type ReadonlyPerson = Readonly<Person>
// 相当于
// interface ReadonlyPerson {
//   readonly name: string;
//   readonly age?: number;
//   readonly weight?: number;
// }

// !4. Pick 工具类型可以从给定的类型中选取出指定的键值，然后组成一个新的类型
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

type PickPerson = Pick<Person, 'name' | 'age'>
// 相当于
// interface NewPerson {
//   name: string;
//   age?: number;
// }

// !5. Omit 工具类型的功能是返回去除指定的键值之后返回的新类型
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

type OmitPerson = Omit<Person, 'age' | 'name'>
// 相当于
// type OmitPerson = {
//   weight?: number | undefined;
// }

// ! 联合类型
// ! 1. Exclude 从联合类型中去除指定的类型
// type Exclude<T, U> = T extends U ? never : U

type T = Exclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'

// !2. Extract 用来从联合类型中提取指定的类型，类似于操作接口类型中的 Pick 类型。
// type Extract<T, U> = T extends U ? T : never;
type T1 = Extract<'a' | 'b' | 'c', 'a'>; // => 'a'

// !3. NonNullable 从联合类型中去除 null 或者 undefined 的类型。
// type NonNullable<T> = T extends null | undefined ? never : T;

// !4. Record 的作用是生成接口类型，然后我们使用传入的泛型参数分别作为接口类型的属性和值
// 在 TypeScript 中，keyof any 指代可以作为对象键的属性
// type Record<K extends keyof any, T> = {
//   [P in K]: T;
// };

type MenuKey = 'home' | 'about' | 'more'
interface Menu {
  label: string;
  hidden?: boolean
}
const menus: Record<MenuKey, Menu> = {
  home: { label: '主页'},
  about: { label: '关于'},
  more: { label: '更多', hidden: true}
}

// type T = keyof any; // => string | number | symbol
// 说明：目前，JavaScript 仅支持string、number、symbol作为对象的键值。

// ! 函数类型
// !1. ConstructorParameters 可以用来获取构造函数的构造参数,而 ConstructorParameters 类型的实现则需要使用 infer 关键字推断构造参数的类型。

class Student {
  constructor(name: string, age?: number) {}
}
type Stu = ConstructorParameters<typeof Student>; // [name: string, age?: number | undefined]

// !2. Parameters 的作用与 ConstructorParameters 类似，Parameters 可以用来获取函数的参数并返回序对

// !3. ReturnType 用来获取函数的返回类型
type T0 = ReturnType<() => void> // void

// !4. ThisParameterType 可以用来获取函数的 this 参数类型。
type T2 = ThisParameterType<(this: Number, x: number) => void>; // Number

// !5. ThisType 的作用是可以在对象字面量中指定 this 的类型
// 注意：如果你想使用这个工具类型，那么需要开启noImplicitThis的 TypeScript 配置



// keyof 关键字提取对象属性名、索引名、索引签名

// typeof 用来获取表达式值的类型

// 注意：in 和 keyof 也只能在类型别名定义中组合使用。

// 可以使用索引签名语法和 in 关键字限定对象属性的范围
type SpecifiedKeys = 'id' | 'name';
// 注意：我们只能在类型别名定义中使用 in，如果在接口中使用，则会提示一个 ts(1169) 的错误
type TargetType = {
  [key in SpecifiedKeys]: any;
}; // { id: any; name: any; }

// ts(1169)
// interface ITargetType {
//   [key in SpecifiedKeys]: any
// }