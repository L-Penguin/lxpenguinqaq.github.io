/**
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 */

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
 var merge = function(intervals) {
    // 比较两数组是否重叠
    function judgeCover(arr_1, arr_2) {
        if ((arr_1[0]>=arr_2[0] && arr_1[0] <= arr_2[1]) || (arr_2[0]>=arr_1[0] && arr_2[0] <= arr_1[1])) return true;
        return false;
    }
    // 输入按照第一项的大小升序，重点
    intervals.sort((fir, sec)=> fir[0]-sec[0]);
    let res = [];
    // 数组长度小于2，直接返回
    if (intervals.length < 2) return intervals;

    let pre = intervals.shift();
    let nex = intervals.shift();
    while (nex) {
        // 当前一数组和后一数组重叠时，将两数组合并
        if (judgeCover(pre, nex)) {
            pre = [Math.min(pre[0], nex[0]), Math.max(pre[1], nex[1])];
            nex = intervals.shift();
        } else {
            // 当两数组无法重叠时，将前一数组（或合并的）导入res
            res.push(pre);
            pre = nex;
            nex = intervals.shift();
        }
    }
    // 将无法合并的数组导入res
    res.push(pre);
    return res;
};