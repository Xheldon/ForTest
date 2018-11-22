(()=>{
    /* 此文件介绍函数 */
// 注意, myAdd 后面的冒号 一直到等号, 都是在声明 myAdd 的函数类型
let myAdd: (x: number, y: number) => number = function (x: number, y: number): number { return x + y; }
// 下面那个的类型可以用下面这个 interface 定义: 
interface funType {
    (x: number, y: number): number;
}
// 上面很容易跟这个弄混, 下面是个箭头函数
let youAdd = (x: number, y: number) => function (): number {return 3;}
// 如果已经声明了函数类型的参数, 则后面的函数不必再传参数类型
let otherAdd: (x: number, y: number) => number = (xx, yy) => {return xx + yy};
// 可选参数必须跟在必选参数后面, 不能把可选参数放在前面, 这对于重构代码很不友好
function fullname (firstname: string, lastname?: string): void { console.log(firstname + lastname); }
// 不过带默认值的参数不用放到必选参数后面(示例略)

class otherHandler {
    info: string;
    on (this:void, e: Event)  {
        // 不能使用 this
    }
}
class otherHandlerTwo {
    info: string;
    // on = (this: void) => {} //error! 箭头函数不能有 this 参数
    on = (e: Event) => {
        // 可以使用 this, 且 this 指向 HandlerTwo
    }
}

/* 像 JAVA 一样的重载, 只是需要些多遍, 同时其按从上到下的参数进行匹配, 因此最好把最可能的参数类型放到最上面 */
function reload (x: {name: string, color: string}): void;
function reload (x: number): void;
// 以上重载完毕, 规定了不同参数情况下, 函数的返回值, 下面开始写具体实现
function reload (x): any {
    return 'i\'m reload';
}

/* 不知为何, 可以使用被官方成为 "带有调用签名的对象字面量" 来定义泛型函数 */
function aaa<T>(n: T): T {
    return n;
}
// 下面两个效果一样... 日, 拿对象不当对象???
let ccc: <T>(o: T) => T = aaa;
let bbb: {<T>(m: T): T} = aaa;
// 那如果该类型就是个对象呢? 想了半天没想出来类型是对象的该怎么写, 算了

// 然后 接口 就呼之欲出了:
interface ddd {
    <T>(a: T): T
}
let eee: ddd = aaa;

/* 区分一下下面的区别 */
interface hhh {
    <T>(arg: T):T
}
interface iii<T> {
    (arg: T): T
}
// 后者可以让调用接口的人清楚的知道, 该接口泛型的参数是什么类型
let jjj: iii<number> = aaa;
})();