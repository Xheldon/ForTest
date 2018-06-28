var MyModules=(function Manager(){
    var modules = {};
    function define(name,deps,impl){
        for(var i=0;i<deps.length;i++){
//             本来deps[i]为模块名字（字符串），这么一赋值，deps[i]就被modules读出来，其就指向了模块的API
            deps[i]=modules[deps[i]];
        }
        modules[name] = impl.apply(impl,deps);
    }
    function get(name){
        return modules[name];
    }
    return {
        define:define,
        get:get
    };
})();
// 定义bar，将其扩充到moudle中去，这样modules就有了一个
MyModules.define("bar",[],function(){
    function hello(who){
        return "Let me introduce:" + who;
    }
    return {
        hello:hello
    };
});
MyModules.define("foo",["bar"],function(bar){
    var hungry = "hippo";
    function awesome(){
        console.log(bar.hello(hungry).toUpperCase());
    }
    return {
        awesome:awesome
    };
});
var bar = MyModules.get("bar");
var foo = MyModules.get("foo");
console.log(bar.hello("hippo"));
foo.awesome();