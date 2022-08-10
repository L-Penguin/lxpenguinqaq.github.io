function myNew() {
    // 创建新对象
    const obj = new Object();
    // 使该对象的__proto__属性与构造函数的prototype全等（p.__proto__ === Person.prototype）
    // Construct即为构造函数Person
    Constructor = Array.prototype.shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    // 判断构造函数是否存在返回值
    // 执行构造函数
    let ret = Constructor.apply(obj, arguments);
    return typeof ret === "object" ? ret : obj;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayHi = function() {
        console.log(`${this.name} hi!`);
    }
}

let p = myNew(Person, "小明", 18);