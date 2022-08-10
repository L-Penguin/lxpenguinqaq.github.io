function merge(left, right) {
    let res = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            res.push(left[i]);
            i++;
        } else {
            res.push(right[j]);
            j++;
        }
    }
    // 一旦一端移入新数组完毕后，另一端剩余元素直接全部移入
    if (i < left.length) {
        res.push(...left.slice(i));
    } else {
        res.push(...right.slice(j));
    }
    return res;
}
  
function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);

    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

let arr = [3, 2, 1, 4];

let arr_result = mergeSort(arr);

console.log(arr_result);