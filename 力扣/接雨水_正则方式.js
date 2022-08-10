/**
 * @param {number[]} height
 * @return {number}
 */

 // 重点需要实现重叠匹配
var trap = function(height) {
    let arr = [];
    let num = 0;
    let sum = 0;
    // 按行将数组分解为二维数组
    for (let i=0; i<Math.max(...height); i++) {
        num++;
        let arr_item = [];
        height.forEach((item, index)=> {
            arr_item.push(item >= num ? 1 : 0);
            // 在确定为1的后面再添加1，从另一方面实现重叠匹配的功能
            if (item >= num) {
                if (height[index+1] < num) {
                    arr_item.push(1);
                }
            }
        });
        arr.push(arr_item);
    }

    // 创建正则对象
    let reg = /1(0+)1/g;

    sum = arr.reduce((pre, cur)=> {
        // 将数组中的内容转换为字符串进行正则匹配
        let str = cur.join("");

        // 方法1：使用str.match(reg)一次匹配出所有满足条件的元素
        // str.match(reg)当没有匹配的时候会返回null
        let sum_part = (str.match(reg) || []).reduce((pre, cur)=> {
            return pre + cur.length - 2;
        }, 0);

        // 方法2：使用reg.exec(str)，得到匹配信息，每次只匹配一个，需要使用while
        // let sum_part = 0;
        // let temp = reg.exec(str);
        // while (temp) {
        //     sum_part += temp[1].length;
        //     temp = reg.exec(str);
        // }

        return pre + sum_part;
    }, 0);

    return sum;
};