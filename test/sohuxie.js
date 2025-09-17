/**
 *
 * @param {*} arr
 * @returns
 * 拍平数组
 */

function flatten(arr) {
  const result = [];
  const stack = [...arr]; // 复制原数组到栈中

  while (stack.length > 0) {
    const current = stack.pop(); // 取出栈顶元素
    console.log(current);
    if (Array.isArray(current)) {
      // 如果是数组，将其元素展开后压入栈
      stack.push(...current);
    } else {
      // 如果是普通元素，直接添加到结果数组
      result.unshift(current); // 使用 unshift 保持元素顺序
    }
  }

  return result;
}

// 示例
// console.log(flatten([1, [2, [3, 4], 5], 6])); // [1, 2, 3, 4, 5, 6]

/**
 *
 *
 * 节流
 */
function throttle(fn, delay = 1000) {
  let timeout = null;
  return function () {
    if (!timeout) {
      timeout = setTimeout(() => {
        console.log(1);
        fn.apply(this, arguments);
        timeout = null;
      }, delay);
    }
  };
}

/**
 * 防抖
 *
 */

function noshake(fn, delay = 1000) {
  let timeout = null;
  return function (ary) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(this, ary);
    }, delay);
  };
}

/**
 * 深拷贝
 */

function deepclone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  const newobj = Array.isArray(obj) ? [] : {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null)
      newobj[key] = deepclone(obj[key]);
    newobj[key] = obj[key];
  }
  return newobj;
}
const obj2 = {
  a: { b: 2 },
  c: [1, 2, { d: 3 }],
};
const clone2 = deepclone(obj2);
console.log(obj2);
console.log(clone2);

// 百度面试
versions.sort((a, b) => {
  const partsA = a.split(".").map(Number);
  const partsB = b.split(".").map(Number);
  let i = 0;
  while (i < partsA.length && i < partsB.length) {
    if (partsA[i] !== partsB[i]) {
      return partsA[i] - partsB[i];
    }
    i++;
  }
  return partsA.length - partsB.length;
});

console.log(versions);

// 防抖

function debo(func, delay) {
  let timer = null;
  return function (...ary) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, ary);
      timer = null;
    }, delay);
  };
}
function strAdd(str1, str2) {
  //
  let i = str1.length - 1;
  let j = str2.length - 1;
  let carry = 0;
  let result = [];
  if (i < j) {
    str1 = str1.padStart(j + 1, "0");
  } else if (j < i) {
    str2 = str2.padStart(i + 1, "0");
  }
  while (i >= 0 || carry > 0) {
    const digit1 = i >= 0 ? parseInt(str1, 10) : 0;
    const digit2 = i >= 0 ? parseInt(str2, 10) : 0;
    const sum = digit1 + digit2;
    result.unshift(sum % 10);
    i--;
    j--;
  }
  return result.join("");
}
console.log(strAdd("1", "1"));

// 深言科技  字符串的相加
function strAdd(str1, str2) {
  //
  let i = str1.length - 1;
  let j = str2.length - 1;
  let carry = 0;
  let result = [];
  if (i < j) {
    str1 = str1.padStart(j + 1, "0");
    i = j;
  } else if (j < i) {
    str2 = str2.padStart(i + 1, "0");
    j = i;
  }
  while (i >= 0 || carry > 0) {
    const digit1 = i >= 0 ? parseInt(str1[i], 10) : 0;
    const digit2 = i >= 0 ? parseInt(str2[i], 10) : 0;
    const sum = digit1 + digit2 + carry;
    result.unshift(sum % 10);
    carry = Math.floor(sum / 10);
    i--;
  }
  return result.join("");
}
// console.log(strAdd("11", "99"));

// output: '2'
// input: strAdd('11', '99')
// output: '110'
// input: strAdd('11', '999999999999999999')
console.log(strAdd.length);
