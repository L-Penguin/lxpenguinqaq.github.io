// 该函数讨论的是升序数组的查找方法
function search(arr, target, start, end) {
    let targetIndex = -1;
    // 升序使用Math.floor()，降序使用Math.ceil()
    let mid = Math.floor((start+end) / 2);

    if (arr[mid] === target) {
        targetIndex = mid;
        return targetIndex;
    }

    if (start >= end) {
        return targetIndex;
    }

    if (arr[mid] < target) {
        return search(arr, target, mid+1, end);
    } else {
        return search(arr, target, start, mid-1);
    }
}

let arr = [3, 1];
let index = search(arr, 3, 0, 2);
console.log(index);