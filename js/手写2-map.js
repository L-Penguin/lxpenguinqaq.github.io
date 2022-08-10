let arr_1 = [1, 3, 5, 7, 9];
let arr_2 = arr_1.map(function(item) {
    // this为window
    return item*item;
})
console.log(arr_2);

Array.prototype.myMap = function(func) {
    let arr_temp = [];
    for (let i=0; i<this.length; i++) {
        arr_temp.push(func(this[i]));
    }
}

console.log("-------手写map-------");

let arr_3 = arr_1.map(function(item) {
    return item*item;
})
console.log(arr_3);