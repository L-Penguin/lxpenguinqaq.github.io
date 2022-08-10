/**
 * 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
 * 
 * 1 -> 2 -> 3 -> 4 -> 5
 * 2 -> 3 -> 4 -> 5 -> 1    链表向右移动1个位置
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
 var rotateRight = function(head, k) {
    // 链表为空，返回空链表
    if (!head) return head;
    // 将链表变为循环链表
    let tail_node = head;
    let node_len = 1;
    // 得到尾结点和链表长度
    while(tail_node.next !== null) {
        tail_node = tail_node.next;
        node_len++;
    }
    // 首尾相连形成循环链表
    tail_node.next = head;
    // k与node_len取余，减少移动次数
    const trans_num = k % node_len;

    for (let i=0; i<node_len-trans_num; i++) {
        tail_node = head;
        head = head.next;
    }
    tail_node.next = null;
    return head;
};