/**
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
 * 输入：m = 3, n = 2
 * 输出：3
 * 解释：
    从左上角开始，总共有 3 条路径可以到达右下角。
    1. 向右 -> 向下 -> 向下
    2. 向下 -> 向下 -> 向右
    3. 向下 -> 向右 -> 向下
 */

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 var uniquePaths = function(m, n) {
    // 动态规划
    let dp = new Array(m).fill(0).map(_=> new Array(n).fill(0));
    // 设置已知的动态规划值
    
    for (let i=0; i<m; i++) {
        if (i === 0) {
            dp[i] = new Array(n).fill(1)
        } else {
            dp[i][0] = 1;
        }
    }
    for (let i=1; i<m; i++) {
        for (let j=1; j<n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
};