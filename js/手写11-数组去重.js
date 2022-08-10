// 双循环去重
function unique_1(arr) {
    if (!Array.isArray(arr)) {
        console.warn("type error!");
        return;
    }
    let res = [arr[0]];
    for (let i=0; i<arr.length; i++) {
        let flag = true;
        for (let j=0; j<res.length; i++) {
            if (arr[i] === res[j]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            res.push(arr[i]);
        }
    }
    return res;
}

// indexOf方法去重1
function unique_2(arr) {
    if (!Array.isArray(arr)) {
            console.warn('type error!');
            return;
        }
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) === -1) {
            res.push(arr[i]);
        }
    }
    return res;
}

// indexOf方法去重2
function unique_3(arr) {
    if (!Array.isArray(arr)) {
        console.warn('type error!');
        return;
    }
    return Array.prototype.filter.call(arr, function(item, index){
        return arr.indexOf(item) === index;
    });
}

// 相邻元素去重
function unique_4(arr) {
    if (!Array.isArray(arr)) {
        console.warn('type error!');
        return;
    }
    arr = arr.sort();
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            res.push(arr[i]);
        }
    }
    return res;
}

// 利用对象属性去重
function unique_5(arr) {
    if (!Array.isArray(arr)) {
        console.warn('type error!');
        return;
    }
    let res = [], obj = {};
    for (let i=0; i<arr.length;i++) {
        if (!obj[arr[i]]) {
            res.push(arr[i]);
            obj[arr[i]] = 1;
        } else {
            obj[arr[i]]++;
        }
    }
    return res;
}

// set与解构赋值去重
function unique_6(arr) {
    if (!Array.isArray(arr)) {
        console.warn('type error!');
        return;
    }
    return [...new Set(arr)];
}

// Array.from与set去重
function unique_7(arr) {
    if (!Array.isArray(arr)) {
        console.warn('type error!');
        return;
    }
    return Array.from(new Set(arr));
}