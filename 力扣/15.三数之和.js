/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
 * 
 * 注意：答案中不可以包含重复的三元组。
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 
 * 输入：nums = []
 * 输出：[]
 * 
 * 输入：nums = [0]
 * 输出：[]
 */

let nums = [-1, 0, 1, 2, -1, -4];

const threeSum = function(nums) {
    let res = [];
    // 升序排列
    nums.sort((fir, sec)=> fir-sec);
    let i = 0;
    const len = nums.length;
    while (i < len-2) {
        // 三个值中最小值大于0，无解
        if (nums[i] > 0) break;
        let first = i + 1;
        let last = len - 1;
        while (first < last) {
            // 三个值同号，无解
            if (nums[i] * nums[last] > 0) break;
            let sum = nums[i] + nums[first] + nums[last];
            if (sum === 0) {
                res.push([nums[i], nums[first], nums[last]]);
            }
            // 负数过小，first右移
            if (sum <= 0) {
                // 设置first重复时跳过
                while (nums[first] === nums[++first]) continue;
            } else {    // 正数过大，last左移   
                // 设置last重复时跳过
                while (nums[last] === nums[--last]) continue;
            }
        }
        // 设置i重复时跳过
        while (nums[i] === nums[++i]) continue;
    }
    return res;
}