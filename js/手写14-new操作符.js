function myNew(func, ...args) {
  // 创建的对象的__proto__ === func.prototype
  let obj = Object.create(func.prototype);
  let res = func.call(obj, ...args);
  if (res && (typeof res === "object" || typeof res === "function")) {
      return res;
  }
  return obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function() {
  console.log(this.age);
};
let p1 = myNew(Person, "小明", 18);
console.log(p1.name);
p1.say();
console.log(p1);
