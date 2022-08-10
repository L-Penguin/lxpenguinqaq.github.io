let arr_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arr_2 = arr_1.filter(function(el, index) {
    return index % 3 === 0 || el >= 8;
})
console.log(arr_2);

Array.prototype.myFilter = function(func) {
    let arr_temp = [];
    for (let i=0; i<this.length; i++) {
        if (func(this[i], i)) {
            arr_temp.push(this[i]);
        }
    }
    return arr_temp;
}

console.log("-------手写filter-------");

let arr_3 = arr_1.myFilter(function(el, index) {

    return index % 3 === 0 || el >= 8;
})
console.log(arr_3);