/**
 * Created by xheldon on 16/6/3.
 */
var proto = new Zeroclass();
for(var name in proto){
    proto[name] = typeof proto[name] == 'function' &&
        typeof _super[name] == 'function' ? (function(name,fn){
        return function(){
            
        }
    })(name,proto[name]) : proto[name];
}
