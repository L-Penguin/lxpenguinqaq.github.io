/**
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 
 * 说明：一个机器人每次只能向下或者向右移动一步。
 * 
 * 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
 * 输出：7
 * 解释：因为路径 1→3→1→1→1 的总和最小。
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
 var minPathSum = function(grid) {
    /**
        grid去掉第一行grid.slice(1);
        grid去掉第一列grid.map(arr=> arr.slice(1));
     */
    // 递归算法
    // let sum = grid[0][0];
    // if (grid.length === 1) {
    //     for (let i=1; i<grid[0].length; i++) {
    //         sum += grid[0][i];
    //     }
    //     return sum;
    // }
    // if (grid[0].length === 1) {
    //     for (let i=1; i<grid.length; i++) {
    //         sum += grid[i][0];
    //     }
    //     return sum;
    // }
    // return sum + Math.min(minPathSum(grid.slice(1)), minPathSum(grid.map(arr=> arr.slice(1))));

    // 动态规划
    let rows = grid.length, columns = grid[0].length;
    let dp = new Array(rows).fill(0).map(_=> new Array(columns).fill(0));
    dp[0][0] = grid[0][0]
    // 首先可知第一行和第二行的各个位置的最小路径和
    for (let i=1; i<rows; i++) {
        dp[i][0] = dp[i-1][0] + grid[i][0];
    }
    for (let i=1; i<columns; i++) {
        dp[0][i] = dp[0][i-1] + grid[0][i];
    }

    for (let i=1; i<rows; i++) {
        for (let j=1; j<columns; j++) { 
            dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
        }
    }
    return dp[rows-1][columns-1];
};