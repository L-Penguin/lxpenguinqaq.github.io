/**
 * 给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。返回 需要移除区间的最小数量，使剩余区间互不重叠 。
 * 输入: intervals = [[1,2],[2,3],[3,4],[1,3]]
 * 输出: 1
 * 解释: 移除 [1,3] 后，剩下的区间没有重叠。
 */

/**
 * @param {number[][]} intervals
 * @return {number}
 */
 var eraseOverlapIntervals = function(intervals) {
    if (!intervals.length) return 0;
    // 将数组按子数组区间的第二个升序排列
    intervals.sort((a, b)=> a[1]-b[1]);

    const len = intervals.length;
    let right = intervals[0][1];
    // ans表示不需要被移除的区间
    let ans = 1;
    for (let i=1; i<len; i++) {
        // 如果前一个区间后者小于等于后一个区间的前者时，ans数量++，并将right指向后者区间的后者。
        if (intervals[i][0] >= right) {
            ans++;
            right = intervals[i][1];
        }
    }
    return len - ans;
};