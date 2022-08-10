const obj = {
    name: "小明",
    age: 18,
    habit: ["抽烟", "喝酒", "烫头"],
    friend: {
        name: "小红",
        age: 17, 
        habit: ["吃饭", "跳舞", "化妆"]
    },
    drink() {
        console.log("喝水");
    }
};

// JSON.parse(JSON.stringify(obj))深拷贝
const obj_copyJSON = JSON.parse(JSON.stringify(obj));
console.log("JSON.parse(JSON.stringify(obj))", obj_copyJSON);

// jQuery中的$.extend,true表示深拷贝，false为浅拷贝
let obj_copyjQuery = {};
$.extend(true, obj_copyjQuery, obj);
console.log("$.extend", obj_copyjQuery);

// 递归实现深拷贝
// 判断是否为对象
function isObject(obj) {
    return typeof obj === "object" && obj !== null;
}

function deepClone_1(source) {
    if (!isObject(source)) return source;   // 非对象返回本身
    
    let target = Array.isArray(source) ? [] : {};   // 判断为数组或对象
    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                // 使用递归
                target[key] = deepClone_1(source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }

    return target;
}

let obj_deepcopy = deepClone_1(obj)
console.log("递归深拷贝", obj_deepcopy);
