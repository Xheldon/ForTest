(()=>{
    /* 这个文件用来记录泛型 generics */
// 泛型函数, 其中的 T 只用来表示一种类型而不是值
function g<T>(n: T): T {
    return n;
}
// 接下来使用这个泛型函数
let gg = g<string>('666');
// 或者直接
let ggg = g('777');

/* 泛型类, 只能对实例部分使用, 静态部分不能用 */
class aaa<T> {
    a: T;
    b: (c: T) => T;
    d(e: T): T {
        return e;
    };
}
// 不能 
class bbb<T> {
    c: T;
    // static d = T; // error => Static members cannot reference class type parameters.
    static d (a: T): T {}; // error => Static members cannot reference class type parameters.
    static e: (a: T) => T; 
}


})();