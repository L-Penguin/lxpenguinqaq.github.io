/**
 * 给你一个整数数组 nums ，判断这个数组中是否存在长度为 3 的递增子序列。
 * 
 * 如果存在这样的三元组下标 (i, j, k) 且满足 i < j < k ，使得 nums[i] < nums[j] < nums[k] ，返回 true ；否则，返回 false 。
 * 
 * 关键点在于找出second（大于first），循环数组，如果有大于second，则直接返回true
 * 如果找到的third大于first且小于second，则更新second的值；如果third的值小于first，则更新first（便于更新新的second）
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var increasingTriplet = function(nums) {
    const len = nums.length;
    if (len < 3) return false;

    let first = nums[0];
    let second = Number.MAX_VALUE;
    for (let i=0; i<len; i++) {
        // 如果第一次循环，会首先确定第二个值，第二个值确定比第一个值大
        // 如果
        const num = nums[i];
        // num为第三个值，当大于第二个值时返回true
        if (num > second) {
            return true;
            // 当第三个值小于第二个值大于第一个值时，将第二个值赋值为num
        } else if (num > first) {
            second = num;
            // 当num小于first时，将第一个值赋值为num
        } else {
            first = num;
        }
    }
    return false;
};