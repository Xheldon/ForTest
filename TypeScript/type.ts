/* 接口定义 */
interface Person {
    firstname: string;
    lastname: string
}
class A {
    fullname: string // 实例属性
    constructor (public firstname: string, public mid: string, public lastname: string) { // 因为 tsconfig.json 中的 strict 被设置成了 true, 因此 参数需要指明 类型; public 创建同名成员
        this.fullname = firstname + mid + lastname;
    }
} 
function hello (person: Person) { // 自定义参数类型
    return 'Hello' + person.firstname + person.lastname;
}
let user = new A('cao', 'xu', 'dong');
let a = 'b';
document.body.innerHTML = hello(user);

/* 元组 Tuple */
// 元组表示已知数量和类型的数组
let x: [string, number];
x = ['hello', 1];
// 文档说访问其越界索引时, 会以联合类型代替(即其已经声明的 string/number), 但是实际 eslint 会报错
// x[3] = 'world'; // world 属于 string, 因此合法

/* 声明数组类型参数的两种方式 */
// 数组泛型
function world (name: Array<number>) { // 确定数组元素类型
    return name;
}
// 在类型后面接上 []
function accross (name: number[]) {
    return name;
}
console.log(world([2, 3, 4]));
console.log(accross([1, 2, 3]));

/* 只读数组 */
let rAndW: Array<number> = [4, 5, 6];
let ro: ReadonlyArray<number> = [1, 2, 3];
// ro.push(4) => error!
ro = rAndW // 居然可以???
// rAndW = ro => error
// 上述 error 可以这么解决:
rAndW = ro as number[];

/* 枚举类型 */
enum Color {Red, Blue, Green}; // 枚举类型
let c: Color = Color.Blue;
console.log('c:', c);
console.log(Color[2]);

/* Object 类型 */
// 其上不能调用方法, 只允许给该类型赋任意值
let o: Object = 4;
// o.m(); // error: Property 'm' does not exist on type 'Object'

/* Any 类型 */
// 其上可以调用方法
let b: any = 'i';
b.m(); // Fine

/* Void 类型, 相当于是 any 类型的补集 */
// 一般是函数没有返回值的时候会标注为 void, 声明一个 void 类型的值, 只能为它赋予 null 或者 undefined
function noReturn (): void {
    // do something
}

/* null 和 indefined 类型 */
// 这两种类型是 所有类型的子类型, 即声明一个 number 可以将 null 或者 undefined 类型的值赋给它, 前提是设置中 strictNullChecks 为 false
let u: undefined = undefined; // 只能赋值这个
let n: null = null; // 只能赋值这个, 没啥大用

/* never 类型 */
// 返回 never 的函数*必须*存在无法到达的终点(此例中, 其没有返回值--甚至连返回 undefined 也没有)
function err (msg: string): never {
    throw new Error(msg);
}

/* 类型断言断言 */
// 目前还不知道使用场景, 后续补充
// 两种:
let some: any = 'this is a string'
let l: number = (<string>some).length;
// or:
let i: number = (some as string).length;