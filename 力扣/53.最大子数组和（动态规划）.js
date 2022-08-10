/**
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组 是数组中的一个连续部分。
 * 
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 * 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
    let maxVal = -Number.MAX_VALUE;
    let sum = 0;
    // 整体思路：当所寻找的子数组的和小于0时候，则舍弃之前所有子数组（即sum=0）。
    for (let i=0; i<nums.length; i++) {
        sum += nums[i];
        maxVal = sum > maxVal ? sum : maxVal;
        sum = sum < 0 ? 0 : sum; 
    }
    return maxVal;
};

// 动态规划
var maxSubArray = function(nums) {
    for(var i = 1; i < nums.length; i++){
        // nums[i]存放以当前元素作为子数组结尾时的最大值。
        if(nums[i - 1] > 0){
            nums[i] += nums[i - 1];
        }
    }
    return Math.max(...nums);
};
