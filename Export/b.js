import {a} from './a.js';

console.log('b.js:',a);//output b.js: foo;
setTimeout(()=>console.log('b.js after 500ms:'+a),500);//after 500ms output b.js after 500ms: bar;
//Infact, change 500 to range 498 to 500 also works; 