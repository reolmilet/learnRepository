// 1. 题目定义的 TreeNode 构造函数
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// 2. 通用二叉树构建函数（入参：层序遍历数组，返回：二叉树根节点）
function buildBinaryTree(levelOrderArr) {
  // 边界：空数组返回空树
  if (!levelOrderArr || levelOrderArr.length === 0) return null;

  // 根节点：用数组第一个元素创建
  const root = new TreeNode(levelOrderArr[0]);
  // 队列：存储待分配子节点的父节点（确保按层处理）
  const parentQueue = [root];
  // 数组索引：从第二个元素开始，依次分配给左/右子节点
  let arrIndex = 1;

  // 循环：直到队列空或数组遍历完
  while (parentQueue.length > 0 && arrIndex < levelOrderArr.length) {
    // 取出队首父节点
    const currentParent = parentQueue.shift();

    // 1. 分配左子节点（当前索引对应左子节点）
    if (arrIndex < levelOrderArr.length) {
      const leftChild = new TreeNode(levelOrderArr[arrIndex]);
      currentParent.left = leftChild;
      parentQueue.push(leftChild); // 左子节点后续作为父节点
      arrIndex++; // 索引后移，准备处理右子节点
    }

    // 2. 分配右子节点（下一个索引对应右子节点）
    if (arrIndex < levelOrderArr.length) {
      const rightChild = new TreeNode(levelOrderArr[arrIndex]);
      currentParent.right = rightChild;
      parentQueue.push(rightChild); // 右子节点后续作为父节点
      arrIndex++; // 索引后移
    }
  }

  return root;
}

// 3. 验证：用 [1,2,2,3,4,4,3] 测试，生成目标二叉树
const targetArr = [1, 2, 2, null, 3, null, 3];
const root = buildBinaryTree(targetArr);

// 4. 层序遍历打印（验证结构正确）
function printLevelOrder(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];
  while (queue.length) {
    console.log(queue, "queue");
    const curr = queue.shift();
    result.push(curr.val);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }
  console.log("层序遍历验证：", result); // 输出 [1,2,2,3,4,4,3]
}
// printLevelOrder(root);
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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  let leftTree = root.left;
  let rightTree = root.right;
  const leftArr = [];
  const rightArr = [];
  function leftTTA(node, arr) {
    if (node === null) return 0;
    leftArr.push(node.val);
    leftTTA(node.left);
    leftTTA(node.right);
  }
  leftTTA(leftTree);
  function rightTTA(node, arr) {
    if (node === null) return 0;
    rightArr.push(node.val);
    rightTTA(node.right);
    rightTTA(node.left);
  }
  rightTTA(rightTree);
  console.log(rightArr, "rightArr");
  console.log(leftArr, "leftArr");
  for (let i = 0; i < leftArr.length; i++) {
    if (leftArr[i] !== rightArr[i]) return false;
  }
  return true;
};

var isSymmetric = function (root) {
  //使用递归遍历左右子树 递归三部曲
  // 1. 确定递归的参数 root.left root.right和返回值true false
  const compareNode = function (left, right) {
    //2. 确定终止条件 空的情况
    if (
      (left === null && right !== null) ||
      (left !== null && right === null)
    ) {
      return false;
    } else if (left === null && right === null) {
      return true;
    } else if (left.val !== right.val) {
      return false;
    }
    //3. 确定单层递归逻辑
    let outSide = compareNode(left.left, right.right);
    let inSide = compareNode(left.right, right.left);
    return outSide && inSide;
  };
  if (root === null) {
    return true;
  }
  return compareNode(root.left, root.right);
};
console.log(isSymmetric(root));

// 队列实现迭代判断是否为对称二叉树：
var isSymmetric = function (root) {
  //迭代方法判断是否是对称二叉树
  //首先判断root是否为空
  if (root === null) {
    return true;
  }
  let queue = [];
  queue.push(root.left);
  queue.push(root.right);
  while (queue.length) {
    let leftNode = queue.shift(); //左节点
    let rightNode = queue.shift(); //右节点
    if (leftNode === null && rightNode === null) {
      continue;
    }
    if (
      leftNode === null ||
      rightNode === null ||
      leftNode.val !== rightNode.val
    ) {
      return false;
    }
    queue.push(leftNode.left); //左节点左孩子入队
    queue.push(rightNode.right); //右节点右孩子入队
    queue.push(leftNode.right); //左节点右孩子入队
    queue.push(rightNode.left); //右节点左孩子入队
  }
  return true;
};
