function person(a, b, c, d, e) {
    console.log(this.name);
    return {
        name: this.name,
        a, b, c, d,
        e: e || undefined
    }
}

let p = {name: "小明"};

console.log("===========================Call===========================");

let result_call = person.call(p, "apple", "banana", "peach", "orange");
console.log("result_call:", result_call);

console.log("-------手写call-------");

// 重点在于在对象上创建需要执行的函数属性，这样执行函数时，this指向调用其的对象
// es5方法
Function.prototype.myCall_es5 = function(context) {
    // 当context为null时，指向window
    context = context || window;
    // 在元素内创造属性并执行，则函数内指向为调用对象context
    context.func = this;
    let newArgs = [];
    for (let i=0; i<arguments.length; i++) {
        newArgs.push('arguments[' + i + ']');
    }

    let result = eval('context.func(' + newArgs + ')');
    //删除属性
    delete context.func;
    return result;
}

// es6方法，使用扩展运算符
Function.prototype.myCall_es6 = function(context, ...args) {
    // 当context为null时，指向window
    context = context || window;
    // 在元素内创造属性并执行，则函数内指向为调用对象context
    // 此处this为调用的函数对象
    context.func = this;

    let result = context.func(...args);
    //删除属性
    delete context.func;
    return result;
}

let result_myCall = person.myCall_es6(p, "apple", "banana", "peach", "orange");
console.log("result_myCall:", result_myCall);

console.log("===========================Apply===========================");
let result_apply = person.apply(p, ["apple", "banana", "peach", "orange"]);
console.log("result_apply:", result_apply);

// es5
Function.prototype.myApply_es5 = function(context, arr) {
    context = context || window;
    context.func = this;
    let result = null;
    if (!arr || arr.length === 0) {
        result = context.func();
    } else {
        let newArgs = [];
        for (var i=0; i<arr.length; i++) {
            newArgs.push('arr[' + i + ']');
        }
        result = eval('context.func(' + newArgs + ')');
    }
    
    delete context.func;
    return result;
}

// es6
Function.prototype.myApply_es6 = function(context) {
    context = context || window;
    context.func = this;
    arguments[1] = arguments[1] || [];
    let result = context.func(...arguments[1]);

    
    delete context.func;
    return result;
}

console.log("-------手写apply-------");
let result_myApply = person.myApply_es5(p, ["apple", "banana", "peach", "orange"]);
console.log("result_myApply:", result_myApply);

console.log("===========================Bind===========================");
let result_func = person.bind(p, "apple", "banana", "peach", "orange");
let result_obj_new = new result_func("watermelon");
let result_obj = result_func("watermelon");
console.log("result_obj_new:", result_obj_new);
console.log("result_obj:", result_obj);

Function.prototype.myBind = function(context) {
    let that = this, arr_1 = Array.prototype.slice.call(arguments, 1);
    // o用于嫁接调用函数的原型链
    function o() {};
    function newFunc() {
        let result = null;
        let arr_2 = Array.prototype.slice.call(arguments), arrSum = arr_1.concat(arr_2);
        if (this instanceof newFunc) {
            // 当使用new操作符时执行，即绑定的context无效
            result = that.apply(this, arrSum);
        } else {
            result = that.apply(context, arrSum);
        }
        return result;
    };
    o.prototype = that.prototype;
    newFunc.prototype = new o();
    return newFunc;
}

let result_func_my = person.myBind(p, "apple", "banana", "peach", "orange")
let result_obj_my = new result_func_my("watermelon");
console.log(result_obj_my);
