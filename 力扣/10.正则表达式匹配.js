/**
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 * 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
 var isMatch = function(s, p) {
    /*
            递归思路：
                两字符完成匹配后，根据字符规律p的情况，截取字符串s，递归进行匹配
        */

    let s_len = s.length;
    let p_len = p.length;

    // s 和 p 都为空的情况
    if (0 === s_len && 0 === p_len)
        return true;

    // s不为空，p为空的情况
    if (0 !== s_len && 0 === p_len)
        return false;

    // s为空，p不为空的情况: 1、p_len为奇数，直接返回false；2、p_len为偶数，第偶数位不是'*'，返回false；3、p_len为偶数，第偶数位是'*'，返回true
    if (0 === s_len && 0 !== p_len)
    {
        if (1 === p_len % 2)
            return false;
        else
        {
            let i = 1;
            while (i < p_len)
            {
                if (p[i] !== '*')
                    return false;
                i += 2;
            }

            return true;
        }
    }

    let p_1 = (p_len>1) ? p[1] : '0';
    // s 和 p 都不为空的情况: p_1是否为'*'，s和p第一项是否匹配；
    if (p_1 !== '*') {
        if (s[0] !== p[0] && p[0] !== '.')
            return false;
        else
            return isMatch(s.substr(1), p.substr(1));
    }

    if (s[0] !== p[0] && p[0] !== '.') {
        return isMatch(s, p.substr(2));
    } else {
        return isMatch(s.substr(1), p) || isMatch(s, p.substr(2));
    } 
};