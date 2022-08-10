// 写版本号排序的方法
// ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'] ===> ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

let arr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5', '0.301.2', '4.402.5.2'];

arr.sort((first, second)=> {
    let i = 0;
    let j = 0;
    const arr_1 = first.split(".");
    const arr_2 = second.split(".");

    while (true) {
        const v_1 = arr_1[i];
        const v_2 = arr_2[i];
        i++

        if (v_1.length === v_2.length) {
            if (v_1 === undefined || v_2 === undefined) {
                return arr_2.length - arr_1.length;
            }
            if (v_1 === v_2) continue;
            return v_2 - v_1;
        } else {
            while (true) {
                if (v_1[j] === undefined || v_2[j] === undefined) {
                    return v_2.length - v_1.length;
                }
                if (v_1[j] === v_2[j]) {
                    j++;
                    continue;
                }
                return v_2[j] - v_1[j];
            }
        }
    }
});

console.log(arr);