/* 本文件说明类型兼容性 */
(() =>{
// 比较函数
let x = (a: string) => 0;
let y = (b: string, c: number) => 2;
// 能否赋值看等号右侧的函数参数列表是否能在等号左边的函数列表中找到
y = x; // 允许, 因为 x 只需要一个参数, 该参数 y 有
// 上面的 y 是源函数, x 是目标函数
// x = y; // 不允许, Type '(a: string, b: number) => number' is not assignable to type '(a: string) => number'

// 比较返回值(跟比较函数相反)
let xx = () => ({a: 'Xheldon'});
let yy = () => ({a: 'Xheldon', b: 'OK'});
// yy = xx; // error => Type '() => { a: string; }' is not assignable to type '() => { a: string; b: string; }'.Type '{ a: string; }' is not assignable to type '{ a: string; b: string; }'. Property 'b' is missing in type '{ a: string; }'
xx = yy;

// 枚举类型和数字类型兼容, 数字类型和枚举类型兼容(并不是啰嗦); 不同枚举类型之间不兼容
enum Status {Ready, Waiting};
enum Color {Red, Blud, Green};
let status = Status.Ready;
status = Status.Waiting; // OK
// status = Color.Red; // error: 不不能将类型“Color.Red”分配给类型“Status”。
})();