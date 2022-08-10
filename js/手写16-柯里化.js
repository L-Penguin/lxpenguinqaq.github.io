function currying(func, ...args) {
    const length = func.length; // 获得函数参数的个数，不包括默认参数和...args剩余参数。
    let allArgs = [...args];
    const res = (...newArgs)=> {
        allArgs = [...allArgs, ...newArgs];
        if (allArgs.length === length) {
            return func(...allArgs);
        } else {
            return res;
        }
    };
    return res;
}

const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
console.log(a(2,3));