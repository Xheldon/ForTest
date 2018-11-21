/* 现在 es6 不支持像 ts 这样的类的静态属性的写法, 不过 es7 已经有以下提案了: */
/* class A {
    name = 'Xheldon'; // => 实例属性的写法
    static name =  'Xheldon' // => 类静态属性的写法
} */
// 目前 es6 的实例属性只能写到 constructor 中, 用 this.xxx 声明赋值; 但是 ts 可以这么写(也只能这么写实例属性): 
class B {
    name: 'Xheldon'; // 分号要不要都行, 此为声明实例属性
    static age = 666; // 静态属性
    greet () { // 实例方法
        return 'Hello' + this.name;
    };
    constructor (name) { // 构造器, 用来初始化的时候使用的
        this.name = name;
    }
}

/* public private protected 区别*/
// public 默认, 不解释
// private: 派生类中不可访问, 类外不能访问
// protected: 派生类中可访问, 类外不能访问, 构造函数 constructor 也能被标记为 protected, 此时该类不可被实例化, 只能被继承
// 构造器 contructor 中的参数带的修饰符, 会自动变成实例的属性:
class Show {
    constructor (public name: string, private age: number, protected sex: string) {
        this.name = '4'; // 和使用 name = '4'; 效果一样...?
    }
}
// 只有 get 没有 set 的方法自动被识别为 readonly:
class Me {
    get fullname(): string { // fullname 默认为 readonly
        return 'name';
    }
}

/* 最后, 类和接口的区别 */
// 类可以包含访问修饰符, 接口不能
// 接口的方法不包含具体实现, 类包含(抽象类类似于接口, 可以不包含具体实现, 而且声明方式跟接口一样)
// 其他基本上可以把类当成接口使用(声明类型等)

/* 抽象类限制了其子类的实例方法 */
abstract class Department {
    constructor (public name: string) {}
    printName(): void {
        console.log('shit');
    }
    abstract printAge(): void
}

class AccDepartment extends Department {
    constructor () {
        super(name);
    }
    printAge(): void {
        console.log('holy');
    }
    otherPrint(): void {
        // 该防范可以声明, 但是在实例中无法调用会报错
    }
}
let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department() => error!
department = new AccDepartment();
// department.otherPrint(); => error! 
