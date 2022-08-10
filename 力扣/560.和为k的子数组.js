/**
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数。
 */

 var subarraySum = function(nums, k) {
    // 使用枚举
    // let count = 0;
    // for (let start=0; start<nums.length; start++) {
    //     let sum = 0;
    //     // 枚举所有子串，并计算和是否满足要求
    //     for(let end=start; end>=0; end--) {
    //         sum += nums[end];
    //         if (sum == k) count++;
    //     }
    // }
    // return count;

    // 使用前缀和 + 哈希表
    // pre表示前面项相加的和，即前缀和，哈希表中存放的是前缀和。
    // (0, 1)是一开始即存在的前缀和
    // pre[i] = nums[0] + ... + nums[i]
    // pre[j, i] = nums[j] + ... + nums[i] = pre[i] - pre[j-1]

    // 哈希表：key -- 前缀和  value -- 出现次数
    const map = new Map();
    map.set(0, 1);
    let count = 0, pre = 0;
    for (const x of nums) {
        pre += x;
        // 表示如果map中存在(pre-k)，则将现前缀和减去该前缀和即可得到k，将count加上前缀和出现的次数
        if (map.has(pre - k)) {
            count += map.get(pre - k);
        }
        // 如果该前缀和存在的话，则将value+1，即该前缀和出现的次数有value+1次
        if (map.has(pre)) {
            map.set(pre, map.get(pre) + 1);
        } else {
            // 没有该前缀和则新创建该前缀和
            map.set(pre, 1);
        }
    }

    return count;
};