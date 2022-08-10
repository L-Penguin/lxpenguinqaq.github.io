/**
 * 旋转矩阵(N * N)
 * 举例：
 * [
 *  [1, 2, 3],
 *  [4, 5, 6],
 *  [7, 8, 9]
 * ]
 *      |
 *      V
 * [
 *  [7, 4, 1],
 *  [8, 5, 2],
 *  [9, 6, 3]
 * ]
 */

 const rotateMatrix = function(matrix) {
    let arr_res = [];
    arr_res = matrix.map((arr_part, index)=> {
        let arr = [];
        // 返回矩阵第一行为原数组第一列
        for (let i=arr_part.length-1; i>=0; i--) {
            arr.push(matrix[i][index]);
        }
        return arr
    })
    return arr_res;
}

// N*M矩阵
const rotateMatrix_1 = function (matrix) {
    let arr_res = []
    const n = matrix.length;
    if (n === 0) return arr_res;
    const m = matrix[0].length;
    for (let i=0; i<m; i++) {
        let arr = []
        for (let j=n-1; j>=0; j--) {
            arr.push(matrix[j][i]);
        }
        arr_res.push(arr);
    }
    return arr_res;
}
