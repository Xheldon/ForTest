const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

module.exports = class ConsoleLogOnBuildWebpackPlugin {
    constructor(options) {
        this.options = options;
    }
    apply (compiler) {
        // webpack 3 使用这种方式绑定编译时机进行处理, webpack 4 则使用 compiler.hooks.run.tap(name, cb) 方式
        compiler.plugin('done', (complination) => {
            console.warn('complination:', complination);
            console.log('Holy shit, this is a consoleWebpackPlugin with nothing use!');
        });
    }
};