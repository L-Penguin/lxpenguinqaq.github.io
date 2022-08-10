// 实现：myAdd(1)(2)(3)() = 6、myAdd(1, 2, 3)(4)() = 10

function myAdd(...args) {
    let allArgs = [...args];
    function fn(...newArgs) {
        if (newArgs.length === 0) {
            return allArgs.reduce((pre, cur)=> pre+cur);
        } else {
            allArgs = [...allArgs, ...newArgs];
            return fn;
        }
    }
    fn.toString = function() {
        if (!allArgs.length) {
            return;
        }
        return allArgs.reduce((pre, cur)=> pre+cur);
    }
    return fn;
}

let func = myAdd(1);
console.log(myAdd(1)(2)(3)());
console.log(myAdd(1, 2, 3)(4)());
// console.log(myAdd(1, 2, 4).toString())