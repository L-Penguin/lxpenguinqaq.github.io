/**
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * 
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 */

/**
 * @param {string} s
 * @return {string}
 */

 var longestPalindrome = function(s) {
    /**暴力解法，找出所有的子串判断是否为回文串并比较长度
    let max = 0;
    let res = "";
    // 判断字符串是否为回文串
    function judge(s) {
        for (let i=0; i<Math.floor(s.length/2); i++) {
            if (s.charAt(i) !== s.charAt(s.length-1-i)) return false;
        }
        return true;
    }
    for (let i=0; i<s.length; i++) {
        for (let j=i+1; j<s.length+1; j++) {
            let temp_str = s.substring(i, j);
            if (judge(temp_str) && temp_str.length>max) {
                max = temp_str.length;
                res = temp_str;
            }
        }
    }
    return res;
     */ 

    /**动态规划
    const len = s.length;
    let maxLen = 1;
    let index = 0;
    // 行代表i，列代表j，表示s[i, j]是否为回文串
    let dp = new Array(len).fill(0).map(_=> new Array(len).fill(false));
    for (let i=0; i<len; i++) dp[i][i] = true;
    // 从矩阵右对角线往里以对角线动态延伸
    for (let L=2; L<=len; L++) {
        for (let i=0; i<len-1; i++) {
            // 由L长度和i头部推断尾部j，j - i + 1 = L ==> j = L + i - 1
            let j = L + i - 1;
            // 右边界超出时，结束循环
            if (j >= len) break;

            if (s[i] === s[j]) {
                if (L <= 3) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = dp[i+1][j-1];
                }
            }
            if (dp[i][j] && L > maxLen) {
                maxLen = L;
                index = i;
            }
        }
    }
    return s.substr(index, maxLen);
     */
    
    // 中心扩展算法
    const expandFunc = function(s, left, right) {
        while (left>=0 && right<s.length && s[left]===s[right]) {
            left--;
            right++;
        }
        return [++left, --right];
    }

    let start = 0, end = 0;
    for (let i=0; i<s.length; i++) {
        // 当子串长度为奇数时候
        let [left_1, right_1] = expandFunc(s, i, i);
        // 当子串长度为偶数时候
        let [left_2, right_2] = expandFunc(s, i, i+1);

        if (right_1 - left_1 > end - start) [start, end] = [left_1, right_1];
        if (right_2 - left_2 > end - start) [start, end] = [left_2, right_2];
    }

    return s.substring(start, end+1);
 };