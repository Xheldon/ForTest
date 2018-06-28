/**
 * Created by Xheldon on 16/9/5.
 */
var connect = require('connect'),
    staticServer = require('serve-static');
// 3.x版本的connect将static方法挪出来了,所以和 了不起的nodejs这本书不一样
var server = connect();
// 将website下的文件作为网站根目录
server.use(staticServer(__dirname + '/website'));
// 将img目录映射为此文件上一层中的images目录
server.use('/img', staticServer('../images'));
server.listen(3001);