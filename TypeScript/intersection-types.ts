/**
 * 此文件演示交叉类型 Intersection Types
 */
(() =>{
    interface A {
        a ();
        b ();
    }
    interface B {
        b ();
        c ();
    }
    /* 交叉类型(并集) */
    let C: A & B; // 变量 D 为 A | B 的交叉类型
    C.a();
    C.b();
    C.c();
    /* 联合类型(交集) */
    let D: A | B; // 变量 D 为 A | B 的联合类型
    D.b(); // D 上调用的方法必须是 A 和 B 类型上都存在的, D.a() 或者 D.c() 会报错
    // 如果确实想使用, 则需要使用类型断言, 明确指明 D 在调用的时候是什么类型:
    (<A>D).a();
    (<B>D).c();
    /* 吐槽: 一般用 || 表示或, 用 && 表示且, 但是 ts 反其道而行之, 用 | (类似 ||) 表示实际意义是 *且* 的交叉类型; 用 & (类似 &&) 表示实际意义是 *或* 的联合类型, interesting */
    /* 需要注意的是, 联合类型并不是只能使用几个类型的交集, 而是说如果在写码的时候就能确定类型的话就必须要确定, 而不能等到运行时去确定, 否则会发生运营时类型不对的情况, 此时用两者的交集类型才更可靠; */

    /* 或者使用 类型保护(自定义类型保护, typeof/instanceof 类型保护, 略) */

    /* 索引类型 */
    function o<T, K extends keyof T> (o: T, name: K[]): T[K][] {
        return name.map(n => o[n]);
    }
    interface Person {
        name: string;
        age: number
    }
    let person: Person = {
        name: 'Xheldon',
        age: 35
    }
    let str: string[] = o(person, ['name']);
    // 以上示例, keyof 完全可以跟 'name' | 'age' 互换
})();
