function Person(name) {
  this.name = name;
}
// 修改原型
Person.prototype.getName = function () {};
var p = new Person("hello");

// console.log(Person.prototype); // true
// console.log(p.constructor.prototype); // true
// console.log(p.__proto__);
// console.log(Person.prototype.__proto__);
// console.log(Object.prototype);
// const obj = new Object();
// console.log(obj.__proto__);

const newArr = new Array();
console.log(Object.prototype.toString.call(newArr));
