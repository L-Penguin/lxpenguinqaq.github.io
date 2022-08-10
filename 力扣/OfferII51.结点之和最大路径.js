/**
 * 路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。
 * 路径和 是路径中各节点值的总和。
 * 给定一个二叉树的根节点 root ，返回其 最大路径和，即所有路径上节点值之和的最大值。
 * 
 * 输入：root = [-10,9,20,null,null,15,7]
 * 输出：42
 * 解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var maxPathSum = function(root) {
    let ans = -Number.MAX_VALUE;
    const dfs = function(root) {
        if (!root) return 0;

        // 深度优先搜索左子树和右子树的路径最大值
        let l = Math.max(dfs(root.left), 0);
        let r = Math.max(dfs(root.right), 0);

        // 以传入的root作为根结点时的路径之和最大值
        const sum = l + r + root.val;

        // 更新最大值
        ans = Math.max(ans, sum);
        // 当该root不作为根结点，所以返回值最大的子路径
        return root.val + Math.max(l, r);
    }
    dfs(root);
    return ans;
};
// 时间复杂度：O(N)
// 空间复杂度：O(N)