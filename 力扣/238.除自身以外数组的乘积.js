/**
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */

/**
 * 思路：
 *  当前位置的除自身以外数组的乘积为该位置之前的数值相乘 * 当前位置之后的数值相乘。
 * 时间复杂度O(1+1+1+1+(n-1)+1+(n-1)+n) = O(3+3*n) = O(n)
 * 空间复杂度：创建两个和输入数组长度相同的相乘数组，空间复杂度为O(n)
 * 将其中一个相乘数组变为输出数组（输出数组不算进空间复杂度中）
 */
 var productExceptSelf = function(nums) {
    /**
     * 左相乘数组：L_arr[i] = nums[0: i]相乘
     * 右相乘数组：R_arr[i] = nums[i+1:]相乘
     */
    // 从左往右相乘的数组
    let L_arr = [];
    let R_arr = [];
    const len = nums.length;
    // 创建左相乘数组
    L_arr[0] = 1;
    for (let i=1; i<len; i++) {
        L_arr[i] = L_arr[i-1] * nums[i-1];
    }
    // 右相乘数组
    R_arr[len-1] = 1;
    for (let i=len-1; i>0; i--) {
        R_arr[i-1] = R_arr[i] * nums[i]; 
    }

    return L_arr.map((num, index)=> {
        return num * R_arr[index];
    })
};