
import xheldonFile from '../../../other-src/strange-file.xheldon';

console.log('xheldon file:', xheldonFile);
console.log('???!!!what???跟你新年');

import bar from '../../bar';
console.log('index');
bar();
document.body.style.background = 'yellow';
console.log('module:', module.hot);
if (module.hot) {
    // 设定哪个文件更新才启用替换, 除了指定的模块外, 其他的模块更新都不热更新
    module.hot.accept('../../bar', function() {
        console.log('Accepting the updated bar module!');
    })
}
