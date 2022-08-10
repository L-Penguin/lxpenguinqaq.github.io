function selectSort(arr) {
    const len = arr.length;
    let minIndex;
    for (let i=0; i<len-1; i++) {
        minIndex = i;
        // 找到i到最后一位最小值的索引
        for (let j=i; j<len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

let arr = [19, 2, 46, 1, 35, 8, 10, 4, 23];

let arr_sort = selectSort(arr);
console.log(arr_sort);