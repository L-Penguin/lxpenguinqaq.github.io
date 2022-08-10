// 父类
function Person() {
    this.name = "小明";
    this.eats = ["苹果"];
    this.getName = function() {
        console.log(this.name);
    }
}
Person.prototype.get = ()=> {
    console.log("Person.prototype上的方法");
}
// 子类
function Student() {
    Person.call(this);
}
Student.prototype = new Person();

let stu_1 = new Student();
stu_1.name = "小花";
stu_1.eats.push("香蕉");
console.log(stu_1.name);    // 小花
console.log(stu_1.eats);    // [ '苹果', '香蕉' ]
stu_1.getName();
stu_1.get();    // Person.prototype上的方法

console.log("---------------")

let stu_2 = new Student();
console.log(stu_2.name);    // 小明
console.log(stu_2.eats);    // [ '苹果' ]
stu_2.getName();    // 小明
stu_2.get();    // Person.prototype上的方法
console.log(stu_1);