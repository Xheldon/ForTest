var A = /** @class */ (function () {
    function A(firstname, mid, lastname) {
        this.firstname = firstname;
        this.mid = mid;
        this.lastname = lastname;
        this.fullname = firstname + mid + lastname;
    }
    return A;
}());
function hello(person) {
    return 'Hello' + person;
}
function world(name) {
    return name;
}
function accross(name) {
    return name;
}
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Blue"] = 1] = "Blue";
    Color[Color["Green"] = 2] = "Green";
})(Color || (Color = {}));
;
var c = Color.Blue;
console.log('c:', c);
console.log(Color[2]);
console.log(world([2, 3, 4]));
console.log(accross([1, 2, 3]));
var user = new A('cao', 'xu', 'dong');
var a = 'b';
document.body.innerHTML = hello(user);
