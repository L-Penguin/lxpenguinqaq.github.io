const TreeNode = function(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}


const root = new TreeNode("A");
root.left = new TreeNode("B", new TreeNode("D", new TreeNode("H")), new TreeNode("E"));
root.right = new TreeNode("C", new TreeNode("F", null, new TreeNode("G")));

// 先序（根节点 -> 左节点 -> 右节点）
// 先序（递归）
function pre_order_recursion(root) {
    const res = [];
    function dfs(root) {
        if (!root) {
            return [];
        }
        // 首先导入根节点数据
        res.push(root.val);
        // 遍历左子树，直到左子树遍历结束
        dfs(root.left);
        // 遍历右子树，直到左子树遍历结束
        dfs(root.right);
    }
    dfs(root);
    return res;
}

// 先序（迭代）
function pre_order_iteration(root) {
    let temp = null;
    const stack = [root];
    const res = [];
    while (stack.length>0) {
			// 从栈顶出栈
        temp = stack.pop();
			// 先导出根元素
        res.push(temp.val);
        if (temp.right !== null) {
            stack.push(temp.right);
        }
			// 栈顶保持优先为根元素的左子元素
		  if (temp.left !== null) {
            stack.push(temp.left);
        }
    }
    return res;
}

// 中序（左节点 -> 根节点 -> 右节点）
// 中序（递归）
function in_order_recursion(root) {
    const res = [];
    function dfs(root) {
        if (!root) {
            return [];
        }
        // 遍历左子树，直到左子树遍历结束
        dfs(root.left);
        // 当左子节点为null时，导入该节点数据
        res.push(root.val);
        // 遍历右子树，直到左子树遍历结束
        dfs(root.right);
    }
    dfs(root);
    return res;
}

// 中序（迭代）
function in_order_iteration(root) {
    let temp = root;
    const res = [];
    const stack = [];

    while (temp !== null || stack.length > 0) {
			// 根元素压栈，知道某一根元素没有左子元素，则出栈根元素，再看是否有右子元素
			// 当弹出一个根元素则可以压入右子元素
        if (temp !== null) {
            stack.push(temp);
            temp = temp.left;
        } else {
            temp = stack.pop();
            res.push(temp.val);
            temp = temp.right
        }
    }
    return res;
}

// 后序（左节点 -> 右节点 -> 根节点）
// 后序（递归）
function post_order_recursion(root) {
    const res = [];
    function dfs(root) {
        if (!root) {
            return [];
        }
        // 遍历左右子节点，知道没有左右子节点时，导入根节点
        dfs(root.left);
        dfs(root.right);
        // 当左右子节点为null时，导入该点数据
        res.push(root.val);
    }
    dfs(root);
    return res;
}

// 后序（迭代）
// 根节点 -> 右节点 -> 左节点 反转等价于 左右根
function post_order_iteration(root) {
    let temp = root;
    const stack = [root];
    const res = [];
    while (stack.length>0) {
        temp = stack.pop();
        res.push(temp.val);
        if (temp.left !== null) {
            stack.push(temp.left)
        }
        if (temp.right !== null) {
            stack.push(temp.right);
        }
    }
    res.reverse();
    return res;
}

// 层序遍历
function level_order(root) {
    const res = [];
    if (!root) {
        return res;
    }

    // temp用于存放层级的父元素
    const temp = [];
    // 导入根元素
    temp.push(root);    // 或可以合并为 const temp = [root];
    // 当temp为空时，代表二叉树遍历结束
    while (temp.length !== 0) {
        // level代表该层级有父元素的个数，代表需要向res导入的空数组中导入多少元素数值
        const level = temp.length;
        res.push([]);
        // 将每一层的数值导入res
        for (let i=1; i<=level; i++) {
            // 导出一个父元素，改变数组temp
            const node = temp.shift();
            res[res.length - 1].push(node.val);
            if (node.left) temp.push(node.left);
            if (node .right) temp.push(node.right);
        }
    }
    return res;
}