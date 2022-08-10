// 升序
function bubbleSort(arr) {
    const len = arr.length;
    for (let i=1; i<len; i++) {
        for (let j=0; j<len-i; j++) {
            // 改变运算符可改变排序方式
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }

    return arr;
}

let arr = [19, 2, 46, 1, 35, 8, 10, 4, 23];

let arr_sort = bubbleSort(arr);
console.log(arr_sort);  // [1, 2, 4, 8, 10, 19, 23, 35, 46]
