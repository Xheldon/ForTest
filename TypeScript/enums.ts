/* 此文件为枚举类型示例 */

// 不能使用函数返回值初始化常量后, 后面还有未初始化的值, 换句话说, 函数返回值初始化的话, 必须放到最后面
(() => {
    function a () {
        return 9;
    }
    enum b {
        // c = a(), // 如果下面的 d 没有分配值, 或者分配给一个数字, 且 a 函数返回 string, 则报错: Type 'string' is not assignable to type 'b'
        // 如果下面的 d 分配给一个 string, 且 a 函数返回 string , 则报错: Computed values are not permitted in an enum with string valued members.
        // d = '是'
    }
    // 数字值会生成反响映射
    enum e {
        d,
        c = a() // 如果函数 a 返回一个字符串则报错: Type 'string' is not assignable to type 'b', 如果返回数字则正常
    }
    console.log('e:', e);

    enum E {
        FOO,
        BAR
    }
    function f (x: E) {
        // if (x !== E.FOO || x !== E.BAR) { // 报错: This condition will always return 'true' since the types 'E.FOO' and 'E.BAR' have no overlap.
        if (x !== E.FOO) {
            console.log('???');
        }
    }
    // 字符串不会生成反向映射
    enum A {
        B = 'C',
        D = 'E'
    }
    console.log(A.B);

    /* 外部枚举(不知道什么用, 后续补充) */

    // declare enum Enum { ==> 报错了
    //     A = 1,
    //     B,
    //     C = 4
    // }
})();