/* 唯一我觉得需要列出来的是这个: */
let q = {
    d: 'name',
    e: 999,
    f: 'hloy'
};

// 此处的 : 不是进行类型声明
let {d: god, e: dog} = q;
// 想要类型声明需要这样:
// let {d, e}: {d: string, e: number} = q;