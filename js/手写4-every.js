let arr_1 = [1, 2, 3, 4, 5];
let arr_2 = arr_1.every(function(el) {
    return el < 10;
});
console.log(arr_2);
let arr_3 = arr_1.every(function(el) {
    return el < 3;
});
console.log(arr_3);

Array.prototype.myEvery = function(func) {
    for (let i=0; i<this.length; i++) {
        if (!func(this[i])) return false;
    }
    return true;
}
let arr_4 = arr_1.every(function(el) {
    return el < 10;
});
console.log(arr_4);
let arr_5 = arr_1.every(function(el) {
    return el < 3;
});
console.log(arr_5);