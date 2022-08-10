let arr_1 = [1, 2, 3, 4, 5];
let arr_2 = arr_1.some(function(el) {
    return el > 3;
})
console.log(arr_2);
let arr_3 = arr_1.some(function(el) {
    return el < 1;
})
console.log(arr_3);

Array.prototype.mySome = function(func) {
    for (let i=0; i<this.length; i++) {
        if (func(this[i])) return true;
    }
    return false;
};

console.log("-------手写some-------");

let arr_4 = arr_1.some(function(el) {
    return el > 3;
})
console.log(arr_4);
let arr_5 = arr_1.some(function(el) {
    return el < 1;
})
console.log(arr_5);