interface Person {
    firstname: string;
    lastname: string
}

class A {
    fullname: string;
    constructor (public firstname, public mid, public lastname) {
        this.fullname = firstname + mid + lastname;
    }
}

function hello (person: Person) {
    return 'Hello' + person;
}

function world (name: Array<number>) {
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