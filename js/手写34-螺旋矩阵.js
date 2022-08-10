/**
 * 螺旋矩阵
 * 举例4*3
 * 1  ->  2  ->  3  ->  4
 *                      |
 *                      v
 * 10 ->  11 ->  12 ->  5
 * ^                    |
 * |                    v
 * 9  <-  8  <-  7  <-  6
 */

const createSpiralMatrix = function(n, m) {
    // 创建全为null的n*m矩阵数组
    let arr = new Array(n).fill(0).map(_=> new Array(m).fill(null));
    // 插入的数据
    let val = 1;

    let row = 0, column = 0;

    arr[row][column] = val++;
    // 判断该(row, column)点下一步方向
    function judgeDirection(arr, row, column) {
        let arr_direction = [];
        if (arr[row][column+1] === null) {
            arr_direction.push("right");
        }
        try {
            if (arr[row+1][column] === null) {
                arr_direction.push("down");
            }
        } catch(e) {}
        
        if (arr[row][column-1] === null) {
            arr_direction.push("left");
        }
        try {
            if (arr[row-1][column] === null) {
                arr_direction.push("up");
            }
        } catch(e) {}
        
        if (arr_direction.length === 0) {
            return "end";
        } else if (arr_direction.length === 1) {
            return arr_direction[0];
        } else {
            if (arr_direction.indexOf("up") >= 0 && arr_direction.indexOf("right") >= 0) {
                return "up";
            } else {
                return arr_direction.shift();
            }
        }
    }
    while (val <= n*m) {
        switch(judgeDirection(arr, row, column)) {
            case "right": 
                column++;
                break;
            case "down": {
                row++;
                break;
            }
            case "left": 
                column--;
                break;
            case "up":
                row--;
                break;
            case "end":
                console.log("结束");
                break;
        }
        arr[row][column] = val++;
    }
    return arr;
}