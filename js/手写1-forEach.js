let arr = [1, 3, 5, 7, 9];

arr.forEach(function(value, index, arr) {
    // 其中this为windows
    console.log(value, index, arr);
})

console.log("-------手写forEach-------")

Array.prototype.myForEach = function(func) {
    for (let i=0; i<this.length; i++) {
        func(this[i], i, this);
    }
}

arr.myForEach((value, index, arr)=> {
    console.log(value, index, arr);
})