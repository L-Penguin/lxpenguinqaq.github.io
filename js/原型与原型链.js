// 原型prototype    原型链__proto__
// 构造函数或者类、实例对象分别使用prototype和__proto__指向原型对象
class Person {
    constructor(name) {
        this.name = name;
    }
    drink() {
        console.log(`${this.name}喝水`);
    }
}

class Student extends Person {
    constructor(name, score) {
        super(name);
        this.score = score;
    }
    getScore() {
        console.log(`${this.name}得分${this.score}`);
    }
}

let student = new Student("小明", 99);
console.log(student.__proto__ === Student.prototype)    // true，隐式原型 === 显示原型
console.log(student.__proto__ instanceof Person);   // 由于继承，所以student指向的原型对象为Person的实例对象，即Student.prototype = new Person()，原型链继承