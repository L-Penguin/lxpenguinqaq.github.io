let arr = [1, 2, 3, [4, 5, [6, 7], [8, 9], 10], 11, [12, 13]];

// 递归版本
function flatter_recursion(arr) {
    if (!Array.isArray(arr)) {
        console.warn("type error");
        return;
    }
    return arr.reduce((pre, cur)=> Array.isArray(cur) ? [...pre, ...flatter_recursion(cur)] : [...pre, cur], []);
}

let result_1 = flatter_recursion(arr);
console.log(result_1);

// 迭代版本
function flatter_iteration(arr) {
    if (!Array.isArray(arr)) {
        console.warn("type error");
        return;
    }
    while (arr.some((item)=> Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

let result_2 = flatter_iteration(arr);
console.log(result_2);