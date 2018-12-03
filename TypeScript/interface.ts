(()=>{
    /* 接口用来自定义某种类型 */

/* 可选属性 */
interface LabeldValue {
    color?: string;
    width?: number
}

/* 只读属性 */
interface Point {
    readonly w: number;
    readonly h: number
}
let point: Point = {w: 1, h: 2};
// point.w = 3 => error!

/* 创建函数的时候指定了参数类型, 如果给了该类型不存在的字段, 会报错, 为了避免则需要这样: */
interface SquareConfig {
    w: string;
    h: number;
    [propName: string]: number | string
}

/* 函数参数类型检查只会检查对象字面量, 而不会检查变量(very interesting) */
function createLabel (config: LabeldValue): {color: string; width: number} {
    return {
        color: 'red',
        width: 22
    };
}

// createLabel({c: 'green', width: 33}) => 报错, 因为 c 在 LabelValue 类型中不存在, 但是下面这种写法就可以:
let config = {
    c: 'yellow',
    width: 444
}
createLabel(config);// 上述参数, 只要有一个属性跟 LabeldValue 中的相同即可, 此例中是 width

/* 函数类型 */
interface Handler {
    (n: number, c: string): boolean
}
let handler: Handler;
handler = function (m: number, v: string) { // 不在乎形参, 只在乎相同位置的参数类型是对的即可;
    return true;
}
// 上述形参声明不是必须的, 因为已经指定了该函数参数类型:
let handlerNoParams: Handler;
handlerNoParams = function (a, b) {
    return false;
}

/* 类接口(其实是 Java 中的抽象类) */
interface ClockInterface { // 只会描述公共部分, 不会检查类的私有成员
    name: string;
    date: Date;
    setTime(d: Date);
}
class Clock implements ClockInterface {
    name: 'clock';
    date: Date;
    setTime(d: Date) {
        this.date = d;
    }
    contructor(h: number, m: number) {}
}

/* 因为类实现接口只能定义实例部分, 如果想操作静态部分(即 constructor 的参数) 需要这么做: */
// 首先定义一个构造函数用的接口, 其类型为 函数
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterfaceForClass;
}
// 再定义一个实例方法用的接口, 该接口类型同时为构造函数所用, 其类型为类
interface ClockInterfaceForClass {
    tick();
}
// 然后创建一个构造函数, 参数类型为上述的 ClockConstructor:
function createClock (ctor: ClockConstructor, hour: number, minute: number): ClockInterfaceForClass {
    return new ctor(hour, minute);
}
// 最后上述的两个接口只是抽象接口, 我们现在来实现这两个接口:
class DigiTalClcok implements ClockInterfaceForClass {
    constructor(h: number, m: number) {}
    tick () {
        console.log('666');
    }
}
class AnalogClock implements ClockInterfaceForClass {
    constructor(h: number, m: number) {}
    tick () {
        console.log('999');
    }
}
// 最后用构造函数来实例化拥有相同静态方法和实例方法:
let digital = createClock(DigiTalClcok, 12, 13);
let analog = createClock(AnalogClock, 35,  66);

/* 继承接口 */
interface Shape {
    color: string;
}
interface Square extends Shape {
    width: number;
}
let square = <Square>{};
square.color = 'red';
square.width = 666;

/* 混合类型, 就是一个接口, 既可以作为函数类型, 也可以作为对象/类类型(牛逼) */
interface Counter {
    (color: string): string;
    width: number;
    reset(): void
}

function getCounter (): Counter {
    let counter = <Counter> function (color: string) {};
    counter.width = 666;
    counter.reset = function () {};
    return counter;
}

/* 最后注明一下 extends 和 implement 的区别 */
/* 
    extends 理解为扩展一个 interface, 但是其还是一个 interface, 其只声明了一些方法, 并没有声明实现, 如果需要实现则仍然需要下面的 implements 
    implements 理解为实现一个 interface, 即在 interface 中交代了方法的参数/返回值, 具体实现还是需要 implements 来完成
    一个 class implement 另一个 class 的时候, 前者会将后者作为 interface, 只使用后者的类型, 而非实现; 这意味着你需要在前者中自己实现接口;
    例子:
*/
interface Control {
    color: string
}
interface SelectableControl extends Control { // => 依然是个interface, 并没有交代具体实现
    select(): void
}
class InputControl implements Control { // 属性看不出区别, 看下面的方法
    color: string
}
class RadisControl implements SelectableControl {
    color: string;
    select () { // select 的具体实现
        console.log(999);
    }
}

/* 最 interesting 的是, interface 可以继承 类, 另外还有私有属性之类的, 就不写了*/
class Cup {
    color: string
}
interface BigCup extends Cup {
    size: string
}
})();