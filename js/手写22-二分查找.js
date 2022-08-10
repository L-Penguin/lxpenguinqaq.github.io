function search(arr, target, start, end) {
    let targetIndex = -1;
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

let arr = [1, 3, 5, 7, 9, 11, 13];
let index = search(arr, 2, 0, 6);
console.log(index);