/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
/**
 *
 * @param {*} nums
 * @param {*} target
 * @returns
 * 两数之和
 */
var twoSum = function (nums, target) {
  const mymap = new Map();
  for (let [index, item] of nums.entries()) {
    // console.log(mymap.has(target - item));
    // console.log(mymap);
    // console.log(target);
    // console.log(item);
    if (mymap.has(target - item)) {
      return [index, mymap.get(target - item)];
    }
    mymap.set(item, index);
  }
};

// console.log(twoSum([2, 7, 11, 15], 9));

/**
 * @param {string[]} strs
 * @return {string[][]}
 *49. 字母异位词分组
 *主要是因为固化思维，没有利用好map的key
 */
var groupAnagrams = function (strs) {
  const map = new Map();
  for (let str of strs) {
    let array = Array.from(str);
    array.sort();
    let key = array.toString();
    let list = map.get(key) ? map.get(key) : new Array();
    list.push(str);
    map.set(key, list);
    console.log(map);
  }
  return Array.from(map.values());
};
// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
/**
 * lekou 83 去除链表中的重复
 *
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
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let nowNode;
  let newHead = new Array();
  for (let [index, item] of head) {
    if (item === nowNode) {
      continue;
    }
    newHead.add(item);
    nowNode = item;
  }
  return newHead;
};

// console.log(deleteDuplicates([1, 1, 2, 3, 3]));

/**
 * @param {number[]} height
 * @return {number}
 * 11. 盛最多水的容器
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length;
  let maxA = 0;

  while (left < right) {
    let area = (right - left) * Math.min(height[left], height[right]);

    // (height[left] > height[right] ? height[left] : height[right]);
    console.log(height[left]);
    console.log(height[right]);
    console.log(right - left);
    console.log(area);
    if (area > maxA) maxA = area;
    if (height[left] < height[right]) {
      left += 1;
    } else {
      right -= 1;
    }
  }
  return maxA;
};
// console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));

/**
 * @param {number[]} height
 * @return {number}
 * 42接雨水（动态规划
 */
var trap = function (height) {
  const mlenth = height.length;
  const leftheight = [height[0]];
  const rightheight = [];
  rightheight[mlenth - 1] = height[mlenth - 1];
  let res = 0;
  // 从左向右
  for (let i = 1; i < mlenth - 1; i++) {
    leftheight[i] = Math.max(height[i], leftheight[i - 1]);
  }
  // 从右向左
  for (let i = mlenth - 2; i >= 0; i--) {
    rightheight[i] = Math.max(height[i], rightheight[i + 1]);
  }

  for (let i = 0; i < mlenth; i++) {
    const inres = Math.min(leftheight[i], rightheight[i]) - height[i];
    console.log(inres, "inres");
    if (inres > 0) {
      res += inres;
    }
  }
  return res;
};
/**
 * @param {number[]} height
 * @return {number}
 * 42接雨水（双指针
 */
var trap = function (height) {
  const mylength = height.length;
  let left = 0;
  let right = mylength;
  let leftmax = height[left];
  let rightmax = height[right - 1];
  let res = 0;
  while (left < right) {
    let newres;
    if (leftmax > rightmax) {
      right--;
      newres = rightmax - height[right];
    } else {
      left++;
      newres = leftmax - height[left];
    }
    if (newres > 0) {
      res += newres;
    }
    leftmax = height[left];
    rightmax = height[right];
  }
  return res;
};
// console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
/**
 * @param {string} s
 * @return {number}
 *42接雨水滑动窗口
 */

var lengthOfLongestSubstring = function (s) {
  let maxlength = 1;
  let left = 0;
  let right = 1;
  const myarray = s.split("");
  while (right < s.length && left < right) {
    let thisarray = myarray.slice(left, right);
    const myset = new Set(thisarray);
    console.log(myset);
    console.log(myarray[right + 1], "myarray[right + 1]");
    console.log(
      !myset.has(myarray[right + 1]),
      "!myset.has(myarray[right + 1])"
    );
    if (right < s.length - 1 && !myset.has(myarray[right + 1])) {
      console.log(right);
      right++;
      maxlength = Math.max(right - left, maxlength);
    } else {
      left++;
    }
  }
  return maxlength;
};

// console.log(lengthOfLongestSubstring("abcabcbb"));

/**
 * @param {string} s
 * @return {number}
 *无重复字符的最长子串
 */
var lengthOfLongestSubstring = function (s) {
  if (s.length === 0) return 0;

  let maxLength = 0;
  let left = 0;
  const charMap = new Map();

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];

    if (charMap.has(currentChar) && charMap.get(currentChar) >= left) {
      left = charMap.get(currentChar) + 1;
    }

    charMap.set(currentChar, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};
// console.log(lengthOfLongestSubstring("pwwkew"));

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 * 438. 找到字符串中所有字母异位词
 * 用的set，不行，当p为重复的时候不能找出
 */
var findAnagrams = function (s, p) {
  let left = 0;
  let right = p.length - 1;

  const res = [];
  function fun(left, right) {
    let i = left;
    const myMap = new Set(p.split(""));
    while (myMap.has(s[i]) && i <= right) {
      myMap.delete(s[i]);
      i++;
    }
    console.log(i, "i");
    console.log(left, "left");
    console.log(i - left);
    if (i - left == p.length) {
      return true;
    } else {
      return false;
    }
  }
  while (right < s.length) {
    if (fun(left, right)) {
      res.push(left);
    }
    console.log(res);
    left++;
    right++;
  }
  return res;
};
// console.log(findAnagrams("bbaa", "aa"));

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 * 438. 找到字符串中所有字母异位词
 * 用的set，不行，当p为重复的时候不能找出
 */
var findAnagrams = function (s, p) {
  let left = 0;
  let right = p.length - 1;
  const res = [];

  // 统计p中字符频率
  const myMap = new Map();
  for (let char of p) {
    myMap.set(char, (myMap.get(char) || 0) + 1);
  }

  // 初始化窗口频率
  const window = new Map();
  // 正确截取初始窗口：从left到right(包含)的所有字符
  for (let i = left; i <= right; i++) {
    const char = s[i];
    window.set(char, (window.get(char) || 0) + 1);
  }

  function isAnagram(map1, map2) {
    if (map1.size !== map2.size) return false;
    for (const [key, val] of map1) {
      if (!map2.has(key) || map2.get(key) !== val) {
        return false;
      }
    }
    return true;
  }

  while (right < s.length) {
    if (isAnagram(window, myMap)) {
      res.push(left);
    }

    // 移动窗口前的准备：记录左指针字符，右指针+1
    const leftChar = s[left];
    const nextChar = s[right + 1];

    // 更新窗口：移除左指针字符，添加右指针下一个字符
    window.set(leftChar, window.get(leftChar) - 1);
    if (window.get(leftChar) === 0) {
      window.delete(leftChar);
    }

    // 只有当右指针+1不越界时，才添加新字符
    if (nextChar) {
      window.set(nextChar, (window.get(nextChar) || 0) + 1);
    }

    // 移动左右指针
    left++;
    right++;
  }

  return res;
};

// console.log(findAnagrams("bbaa", "aa")); // 输出: [2]

/**
 * @param {number[]} nums
 * @return {number}
 * 53. 最大子数组和

 */
var maxSubArray = function (nums) {
  const sumNums = [nums[0]];
  for (let i = 1; i < nums.length + 1; i++) {
    // console.log(nums.slice(0, i));
    // console.log(nums.slice(0, i).reduce((a, b) => a + b));
    sumNums.push(nums.slice(0, i).reduce((a, b) => a + b));
    console.log(sumNums);
  }

  console.log(sumNums);
};
// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

/**
 * 56. 合并区间
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let pre = intervals[0];
  let res = [];
  for (let i = 1; i < intervals.length; i++) {
    const cur = intervals[i];
    if (pre[1] >= cur[0]) {
      pre[1] = Math.max(pre[1], cur[1]);
    } else {
      res.push(pre);
      pre = cur;
    }
  }
  res.push(pre);
  return res;
};
// console.log(
//   merge([
//     [1, 3],
//     [2, 6],
//     [8, 10],
//     [15, 18],
//   ])
// );

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 * 189. 轮转数组
 */
var rotate = function (nums, k) {
  const len = nums.length;
  const right = k % len;
  const leftnums = nums.slice(0, len - right);
  const rightnums = nums.slice(len - right, len);
  // 清空原数组并插入旋转后的元素（原地修改）
  nums.length = 0;
  nums.push(...rightnums, ...leftnums);
};

/**
 * @param {number[]} nums
 * @return {number[]}
 * 
238. 除自身以外数组的乘积
 */
var productExceptSelf = function (nums) {
  const answer = [];
  left = [1];
  right = [];
  right[nums.length - 1] = 1;
  for (let i = 1; i < nums.length; i++) {
    left[i] = nums[i - 1] * left[i - 1];
  }
  for (let i = nums.length - 2; i >= 0; i--) {
    right[i] = nums[i + 1] * right[i + 1];
  }
  for (let i = 0; i < nums.length; i++) {
    answer[i] = left[i] * right[i];
  }
  return answer;
};
// console.log(productExceptSelf([1, 2, 3, 4]));

/**
 * @param {number[]} nums
 * @return {number}
 * 41. 缺失的第一个正数
 */
var firstMissingPositive = function (nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    // 如果当前学生的学号在 [1,n] 中，但（真身）没有坐在正确的座位上
    while (1 <= nums[i] && nums[i] <= n && nums[i] !== nums[nums[i] - 1]) {
      // 那么就交换 nums[i] 和 nums[j]，其中 j 是 i 的学号
      const j = nums[i] - 1; // 减一是因为数组下标从 0 开始
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }

  // 找第一个学号与座位编号不匹配的学生
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  // 所有学生都坐在正确的座位上
  return n + 1;
};

// console.log(firstMissingPositive([1, 2, 0]));

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 * 73. 矩阵置零
 */
var setZeroes = function (matrix) {
  const iarr = [];
  const jarr = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        iarr.push(i);
        jarr.push(j);
      }
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    if (iarr.some((element) => element === i)) {
      matrix[i] = new Array(matrix[i].length).fill(0);
      continue;
    }

    for (let j = 0; j < matrix[i].length; j++) {
      if (jarr.some((element) => element === j)) {
        matrix[i][j] = 0;
      }
    }
  }
  return matrix;
};

console.log(
  setZeroes([
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5],
  ])
);
