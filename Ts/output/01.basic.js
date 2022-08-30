"use strict";
let arrayOfNumber = [1, 2, 3];
let greaterThan2 = arrayOfNumber.find(num => num > 2);
let result;
// result.toFixed() ts(2571)
// 所有类型缩小手段对 unknown 都有效
if (typeof result === 'number') {
    result.toFixed();
}
function convert(x) {
    if (typeof x === 'string') {
        return Number(x);
    }
    if (typeof x === 'number') {
        return String(x);
    }
    return -1;
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
var Day;
(function (Day) {
    Day[Day["SUNDAY"] = 0] = "SUNDAY";
    Day[Day["MONDAY"] = 1] = "MONDAY";
    Day[Day["TUESDAY"] = 2] = "TUESDAY";
    Day[Day["WEDNESDAY"] = 3] = "WEDNESDAY";
    Day[Day["THURSDAY"] = 4] = "THURSDAY";
    Day[Day["FRIDAY"] = 5] = "FRIDAY";
    Day[Day["SATURDAY"] = 6] = "SATURDAY";
})(Day || (Day = {}));
