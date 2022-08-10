// 将两对象进行合并
const a = { a: {e:9}, b: 4 };
const b = { b: 2, c: 3 };
const c = { c: 5, d: 6 };

// 方法1：使用Object.assign合并对象，浅拷贝方式
const result_1 = {}
Object.assign(result_1, a, b, c)    // 将里面参数合并，属性会被覆盖，并赋值给第一个参数
console.log("result_1", result_1);

// 扩展操作符...
const result_2 = { ...a, ...b, ...c };
console.log("result_2", result_2);

// 自己封装函数
function extend(target, ...source) {
    for (let i of source) {
        for (let obj in i) {
            target[obj] = i[obj];
        }
    }
    return target;
}
const result_3 = {};
extend(result_3, a, b, c);
console.log("result_3", result_3);