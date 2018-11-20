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



