class TreeNode {
    constructor(val, left, right) {
        this.val = val === undefined ? "*" : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
    putLeft(node) {
        if (node instanceof TreeNode) {
            this.left = node
            return node;
        }
    }
    putRight(node) {
        if (node instanceof TreeNode) {
            this.right = node;
            return node;
        }
    }
}

let temp = null;
const root = new TreeNode("A");
temp = root.putLeft(new TreeNode("B"));
temp = temp.putLeft(new TreeNode("D"));
temp = temp.putLeft(new TreeNode("G"));
temp.putRight(new TreeNode("H"));
temp = root.putRight(new TreeNode("C"));
temp.putLeft(new TreeNode("E")).putRight(new TreeNode("I"));
temp.putRight(new TreeNode("F")).putLeft(new TreeNode("J"));

// 二叉树遍历
const pre_order_recursion = function(root) {
    const res = [];
    function dfs(root) {
        if (!root) {
            return res;
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

const in_order_recursion = function(root) {
    const res = [];
    function dfs(root) {
        if (!root) {
            return res;
        }
        // 遍历左子节点，直到没有左子节点时，会导入根节点，再遍历右子节点
        // 遍历左子树，直到左子树遍历结束
        dfs(root.left);
        // 当左子节点为null时，导入该节点数据
        res.push(root.val);
        // 遍历右子树，直到右子树遍历结束
        dfs(root.right);
    }
    dfs(root);
    return res;
}

const post_order_recursion = function(root) {
    const res = [];
    function dfs(root) {
        if (!root) {
            return res;
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

// 根据栈完成迭代遍历
const pre_order_iteration = function(root) {
    const stack = [];
    const res = [];
    if (!root) {
        return res;
    }
    stack.push(root);
    while (stack.length > 0) {
        const node = stack.pop();
        res.push(node.val);
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    return res;
}

const in_order_iteration = function(root) {
    const res = [];
    let node = root;
    const stack = [];
    if (!root) {
        return res;
    }
    while (node !== null || stack.length > 0) {
        if (node) {
            stack.push(node);
            node = node.left;
        } else {
            node = stack.pop();
            res.push(node.val);
            node = node.right;
        }
    }
    return res;
}

const post_order_iteration = function(root) {

}

// 层序遍历
const level_order = function(root) {
    const res = [];
    const stack = [root];
    if (!root) {
        return res;
    }
    while (stack.length > 0) {
        res.push([])
        let levelSize = stack.length;
        for (let i=0; i<levelSize; i++) {
            let temp = stack.shift();
            res[res.length-1].push(temp.val);
            if (temp.left) stack.push(temp.left);
            if (temp.right) stack.push(temp.right);
        }
    }
    return res;
}

function test(root) {
    const res = [];
    if (!root) return res;
    const stack = [];
    let node = root;
    while (node !== null || stack.length > 0) {
        if (node) {
            stack.push(node);
            node = node.left;
        } else {
            node = stack.pop();
            res.push(node.val);
            node = node.right;
        }
    }
    return res;
}


