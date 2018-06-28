/**
 * Created by Xheldon on 16/6/14.
 */

(function(){
    // 类式继承
    var superClass = function(){
        this.superValue = true;
        this.books = ['one','two','three']
    };
    superClass.prototype.getSuperValue = function(){
        return this.superValue;
    };

    var subClass = function(){
        this.subValue = false;
    };
    //继承父类
    subClass.prototype = new superClass();
    // 为子类添加方法
    subClass.prototype.getSubValue = function(){
        return this.subValue;
    };

    var instance1 = new subClass();
    var instance2 = new subClass();
        instance1.books.push('four');
    console.time('类式继承↑↑↑↑↑↑');
    console.log(instance1.getSubValue());
    console.log(instance1.getSuperValue());
    console.log(instance1.books);
    console.log(instance2.getSubValue());
    console.log(instance2.getSuperValue());
    console.log(instance2.books);
    console.timeEnd('类式继承↑↑↑↑↑↑');
})();

(function(){
    // 构造函数继承
    var superClass = function(name){
        this.books = ['one','two','three'];
        this.name = name;
    };
    var subClass = function(name){
        superClass.call(this,name);
    };
    //不涉及原型,因此子类不继承父类原型方法(不再演示)
    var instance1 = new subClass('instance1');
    var instance2 = new subClass('instance2');
    instance1.books.push('four');
    console.time('构造函数继承↑↑↑↑↑↑');
    console.log(instance1.name);
    console.log(instance1.books);
    console.log(instance2.name);
    console.log(instance2.books);
    console.timeEnd('构造函数继承↑↑↑↑↑↑');
})();

(function(){
    // 组合继承
    // 即以上两种模式的混合,而父类中的引用类型使用call继承给子类,子类直接继承父类原型上的方法
    var superClass = function(name){
        this.books = ['one','two','three'];
        this.name = name;
    };
    superClass.prototype.getSuperName = function(){
        return 'super' + this.name;
    };
    var subClass = function(name){
        superClass.call(this,name);
    };
    //继承父类
    subClass.prototype = new superClass();
    // 为子类添加方法
    subClass.prototype.getSubName = function(){
        return this.name;
    };
    //不涉及原型,因此子类不继承父类原型方法(不再演示)
    var instance1 = new subClass('instance1');
    var instance2 = new subClass('instance2');
    instance1.books.push('four');
    console.time('组合继承↑↑↑↑↑↑');
    console.log(instance1.getSubName());
    console.log(instance1.getSuperName());
    console.log(instance1.name);
    console.log(instance1.books);
    console.log(instance2.getSubName());
    console.log(instance2.getSuperName());
    console.log(instance2.name);
    console.log(instance2.books);
    console.timeEnd('组合继承↑↑↑↑↑↑');
})();
(function(){
    // 寄生组合式继承(略)
    // 就是用寄生的方式继承父类的原型方法,构造函数继承来来传递除了函数外的引用类型
})();
(function(){
    //简单工厂模式(只对外暴露一个方法)
    var a = function(){
        return 'a'
    };
    var b = function(value){
        this.value = value;
    };
    b.prototype.getValue = function(){
        return this.value;
    };
    var c = function(){
        return 'c'
    };
    var theOne = function(data,content){
        switch (data){
            case 'a':
                return new a();
            case 'b':
                return new b(content);
            case 'c':
                return c();
        }
    };
    var instance = theOne('b','im b');
    console.time('简单工厂方法↑↑↑↑↑↑');
    console.log(instance.getValue());
    console.timeEnd('简单工厂方法↑↑↑↑↑↑');
})();

(function(){
    //简单工厂方法二(提取上一个中的三个abc三个函数的共同点,然后return)
    var theOne = function(type, value){
        var o = new Object();
        o.value = value;
        if(type == 'a'){
        }
        if(type == 'b'){
            o.getValue = function(){
                return this.value;
            }
        }
        if(type == 'c'){
        }
        return o;
    };
    var instance = theOne('b','im b copy');
    console.time('简单工厂方法↑↑↑↑↑↑');
    console.log(instance.getValue());
    console.timeEnd('简单工厂方法↑↑↑↑↑↑');
})();
(function(){
    //安全工厂方法,推迟创建子对象到子类中
    var Factory = function(type, content){
        if(this instanceof Factory){
            // 此处返回一个实例化的挂在工厂原型上的构造函数
            return new this[type](content);
        }else{
            return new Factory(type,content)
        }
    };
    //在工厂原型中设置创建所有类型数据对象的基类
    Factory.prototype = {
        java: function(content){},
        javascript: function(content){
            this.content = content;
        },
        UI: function(content){},
        php: function(content){}
    };
     var s = Factory('javascript','javascript is the best language!');
    console.time('安全工厂方法二↑↑↑↑↑↑');
    console.log(s.content);
    console.timeEnd('安全工厂方法二↑↑↑↑↑↑');
})();

(function(){
    //抽象工厂方法
    var abstractFactory = function(subObj, superObj){
        if(typeof abstractFactory[superObj] == 'function'){
            subObj.prototype = new abstractFactory[superObj]();
            subObj.constructor = subObj;
        }else{
            throw new Error('没有创建该对象!');
        }
    };
// 将抽象对象都绑定到抽象工厂上面
    abstractFactory.java = function(){
        this.type = 'java'
    };
    abstractFactory.java.prototype = {
        getValue:function(){
            return new Error('java抽象方法不能调用!请务必实例化!')
        }
    };
    abstractFactory.javascript = function(){
        this.type = 'javascript'
    };
    abstractFactory.javascript.prototype = {
        getName: function(){
            return new Error('javascript抽象方法不能调用!请务必实例化!');
        }
    };
    // json子类
    var json = function(){
        this.value = 'json';
        this.name = 'shit';
    };
    // 继承javascript父类,且必须实现父类的方法,否则实例化json时会继承javascript类从而继承return new Error的getName而报错;
    abstractFactory(json,'javascript');
    json.prototype.getName2 = function(){
        return {
            type: this.type,
            name: this.name,
            value: this.value
}
    };
    var instance = new json();

    console.time('抽象工厂方法↑↑↑↑↑↑');
    console.log(instance.getName());
    console.log(instance.getName2());
    console.timeEnd('抽象工厂方法↑↑↑↑↑↑');

})();