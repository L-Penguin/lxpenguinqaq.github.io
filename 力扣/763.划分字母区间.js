/**
 * 字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。返回一个表示每个字符串片段的长度的列表。
 * 输入：S = "ababcbacadefegdehijhklij"
 * 输出：[9,7,8]
 * 解释：划分结果为 "ababcbaca", "defegde", "hijhklij"。
每个字母最多出现在一个片段中。
像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
 */

/**
 * @param {string} s
 * @return {number[]}
 */
 var partitionLabels = function(s) {
    // 存放字母的最后出现的索引
    let hash = {};
    for (let i = 0; i < s.length; i++) {
        hash[s[i]] = i;
    }
    let result = [];
    let left = 0;
    let right = 0;
    for (let i = 0; i <s.length; i++) {
        // 存放已遍历字符串中字符最小无重复时的索引
        right = Math.max(right, hash[s[i]]);
        // 当当前遍历索引等于right时，即满足条件同意字母最多出现在一个片段中。
        if (i === right) {
            result.push(right - left + 1);
            left = i + 1;
        }
    }  
    return result;
};