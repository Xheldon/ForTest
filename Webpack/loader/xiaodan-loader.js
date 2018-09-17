let getOptions = require('loader-utils').getOptions;

module.exports = function (src) {
    var cb = this.async();
    // var header = path.resolve('header.js');
    // this.addDependency(header); // 必须声明外部依赖, 才能使缓存 loader 无效, 以及在 watch 模式下重新编译
    return 'export default "I\'m a little babay!"';
};