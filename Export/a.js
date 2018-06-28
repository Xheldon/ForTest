export var a = 'foo';

setTimeout(()=>a = 'bar', 500);
console.log('a.js:',a);