function quickSort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    const cur = arr[arr.length - 1];
    const left = arr.filter((v, i) => v <= cur && i !== arr.length - 1);
    const right = arr.filter((v) => v > cur);
    return [...quickSort(left), cur, ...quickSort(right)];
}

let arr = [19, 2, 46, 1, 35, 8, 10, 4, 23, 12];
let arr_result = quickSort(arr);
console.log(arr_result);


  