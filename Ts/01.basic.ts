let arrayOfNumber: number[] = [1, 2, 3]
let greaterThan2: number = arrayOfNumber.find(num => num > 2) as number

let result: unknown;
// result.toFixed() ts(2571)

// 所有类型缩小手段对 unknown 都有效
if (typeof result === 'number') {
  result.toFixed()
}

// 函数重载:
// 函数重载列表的各个成员必须是函数实现的子集
function convert(x: string): number;
function convert(x: number): string;
function convert(x: null): -1;
function convert(x: string | number | null): any {
  if (typeof x === 'string') {
    return Number(x)
  }
  if (typeof x === 'number') {
    return String(x)
  }
  return -1
}

// 联合类型   a | b

// 交叉类型   a & b
// type IntersectionType = { id: number; name: string } & { age: number, name: number }
// const mixed: IntersectionType = {
//   id: 1,
//   name: 1, // 合并的同名类型是一个never类型
//   age: 18
// }


// 枚举类型
enum Day {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}




