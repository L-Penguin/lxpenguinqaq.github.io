/**
 * 给定一个长度为4的整数数组 cards 。你有 4 张卡片，每张卡片上都包含一个范围在 [1,9] 的数字。您应该使用运算符 ['+', '-', '*', '/'] 和括号 '(' 和 ')' 将这些卡片上的数字排列成数学表达式，以获得值24。
 * 
 * 输入：cards = [4, 1, 8, 7]
 * 输出：true
 * 解释：(8-4) * (7-1) = 24
 */

/**
 * @param {number[]} cards
 * @return {boolean}
 */
 var judgePoint24 = function(cards) {
    const len = cards.length;
    // 递归出口
    if (len === 1) return Math.abs(cards[0] - 24) < 1e-9;

    // 判断是否满足24点；
    let isValid = false;
    // 有序选择两个数进行运算，得到一个新数（替代原来两数）
    for (let i=0; i<len-1; i++) {
        for (let j=i+1; j<len; j++) {
            const n1 = cards[i], n2 = cards[j];
            // 创建新数组存放两数计算后的新数组
            const newCards = [];
            // 将没有计算的值直接push进newCards
            for (let k=0; k<len; k++) {
                if (k !== i && k !== j) newCards.push(cards[k]);
            }
            // 使用或运算，当isValid变为true时，后面的表达式不会执行
            isValid = isValid || judgePoint24([...newCards, n1 + n2]);
            isValid = isValid || judgePoint24([...newCards, n1 * n2]);
            isValid = isValid || judgePoint24([...newCards, n1 - n2]);
            isValid = isValid || judgePoint24([...newCards, n2 - n1]);
            isValid = isValid || judgePoint24([...newCards, n1 / n2]);
            isValid = isValid || judgePoint24([...newCards, n2 / n1]);

            // 对isValid进行判断
            if (isValid) return true;
        }
    }
    return false;
};
