function insertSort(arr) {
    for (let i=1; i<arr.length; i++) {
        let j = i;
        let target = arr[j];
        while (j > 0 && arr[j-1] > target) {
            arr[j] = arr[j-1];
            j--;
        }
        arr[j] = target;
    }
    return arr;
}

let arr = [19, 2, 46, 1, 35, 8, 10, 4, 23];

console.log(insertSort(arr))