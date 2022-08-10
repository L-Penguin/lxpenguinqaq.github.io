/**
 * DNA序列 由一系列核苷酸组成，缩写为 'A', 'C', 'G' 和 'T'。
 * 给定一个表示 DNA序列 的字符串 s ，返回所有在 DNA 分子中出现不止一次的 长度为 10 的序列(子字符串)。你可以按 任意顺序 返回答案。
 * 
 * 输入：s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
 * 输出：["AAAAACCCCC","CCCCCAAAAA"]
 */

/**
 * @param {string} s
 * @return {string[]}
 */
 var findRepeatedDnaSequences = function(s) {
    /** 哈希表方法
    const L = 10;
    const ans = [];
    // 创建hash表记录子串出现次数
    const hash = new Map();
    const len = s.length;
    for (let i=0; i<=len-L; i++) {
        const sub = s.substr(i, L);
        hash.set(sub, (hash.get(sub) || 0) + 1);
        // 当出现次数为2时，导入ans
        if (hash.get(sub) === 2) {
            ans.push(sub);
        }
    }
    return ans;
     */
    
    // 哈希表 + 滑动窗口 + 位运算
    const len = s.length;
    const L = 10;
    const ans = [];
    const hash_map = new Map([['A', 0], ['C', 1], ['G', 2], ['T', 3]]);
    if (len <= L) return ans;
    // 存放10位字母转换为二进制后的十进制数值
    let x = 0;
    // 存放前9位的数值
    for (let i=0; i<L-1; i++) {
        x = (x << 2) | hash_map.get(s[i]); 
    }
    const hash = new Map();
    // ((1 << (L * 2)) - 1)表示20位二进制数值全为1的窗口，匹配10位字母
    for (let i=0; i<=len-L; i++) {
        x = ((x << 2) | hash_map.get(s[i + L - 1])) & ((1 << (L * 2)) - 1);
        hash.set(x, (hash.get(x) || 0) + 1);
        if (hash.get(x) === 2) {
            ans.push(s.substr(i, L));
        }
    }
    return ans;
};