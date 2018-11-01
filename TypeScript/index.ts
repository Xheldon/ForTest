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

function world (name: Array<number>) { // 确定数组元素类型
    return name;
}

function accross (name: number[]) {
    return name;
}

enum Color {Red, Blue, Green};

let c: Color = Color.Blue;

console.log('c:', c);
console.log(Color[2]);

console.log(world([2, 3, 4]));
console.log(accross([1, 2, 3]));

let user = new A('cao', 'xu', 'dong');
let a = 'b';
document.body.innerHTML = hello(user);