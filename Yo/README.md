# yo-in-action
----
### 这是个用yo生成的webapp的精简版,在Gruntfile任务配置中去掉了小学生前端用不到的单元测试mocha,但是保留了实际文件,方便以后万一用到时的扩展.

### 这个可以帮你起一个服务器,包含的功能有:
    1. watch功能
    2. IDE中更改代码实时同步到浏览器
    3. css/scss目录的scss代码自动转css同时autoprefixer并压缩输出到css目录下,提交给后端时可以选择忽略scss目录
    4. 压缩css到css.min.css,压缩js到app.min.js,这一步不需要的可以在Gruntfile取消
    5. 同一个网段设备访问同一个页面,任意设备滚动页面,其他设备同步滚动,方便页面展示给产品和设计看.

#### 注意:
    1. 请严格按照目录结构名字来,如果改动目录名,请到Gruntfile对应改动.
    2. scss编译时,是先编译成没有加兼容性前缀的css到同级目录,再执行autoprefixer并输出到上级目录
   	3. 请先安装package.json中的依赖

### 启动服务器请cd到Gruntfile所在目录执行: grunt serve  即可.
