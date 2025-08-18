// 我更喜欢这种，因为在真是业务场景中，应该保留原始解构
// 只是把深层的children拿出来放到第一层 个人想法
// 树形结构转成列表

function treeToList(data) {
  if (!Array.isArray(data) && data.length === 0) return;
  // 方式1
  return data.reduce((prev, cur) => {
    const { children } = cur;
    return Array.isArray(children) && children.length > 0
      ? prev.concat(treeToList(children), cur)
      : prev.concat(cur);
  }, []);
  //方式2
}
const data = [
  {
    id: "1",
    name: "父节点1",
    children: [
      {
        id: "1-1",
        name: "子节点1-1",
        children: [
          {
            id: "1-1-1",
            name: "子节点1-1-1",
          },
          {
            id: "1-1-2",
            name: "子节点1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "父节点2",
    children: [
      {
        id: "2-1",
        name: "子节点2-1",
      },
    ],
  },
];
// console.log(treeToList(data));
// 列表转成树形结构

let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
  { id: 6, name: "部门6", pid: 0 },
];
function get_tree(arr) {
  const list = [];

  arr.forEach((element) => {
    const chiildren_arr = arr.filter((ele) => {
      return element.id === ele.pid;
    });

    if (chiildren_arr.length > 0) {
      element.chiildren = chiildren_arr;
    }

    if (element.pid === 0) {
      list.push(element);
    }
  });

  return list;
}
// console.log(get_tree(arr));
// console.log(typeof get_tree);
//Array.prototype.flat

Array.prototype.flat = function (deep = 1) {
  const res = [];
  if (deep === 0) {
    return this;
  }
  deep--;
  this.forEach((item) => {
    item instanceof Array ? res.push(...item.flat(deep)) : res.push(item);
  });
  return res;
};
const newarr = [1, 2, [3, 4, [5, 6]]];

// console.log(newarr.flat(2));

// instanceof
function myInstanceof(left, right) {
  let ptoto = Object.getPrototypeOf(left);
  console.log(ptoto, "ptoto");
  while (true) {
    if (ptoto === null) return false;
    if (ptoto === right.prototype) return true;
    ptoto = Object.getPrototypeOf(ptoto);
  }
}

function Person() {}

// console.log(myInstanceof(newarr, Function));

// call bind apply
Function.prototype._mycall = function (content, ...arrs) {
  console.log(this, "this");
  content.fn = this;
  const res = content.fn(...arrs);
  delete content.fn;
  return res;
};
// 同理
Function.prototype._myapply = (thisArg, args = []) => {
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;
  let fn = Symbol();
  thisArg[fn] = this;
  const res = thisArg[fn](...args);
  delete thisArg[fn];
  return res;
};
// 同理
Function.prototype._mybind = (thisArg, ...args) => {
  let fn = this;
  return (...args) => {
    return fn._myCall(thisArg, ...args);
  };
};
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product._mycall(this, name, price);
  this.category = "food";
}

console.log(new Food("cheese", 5).name);
// Expected output: "cheese"

// 微派面试
/**
 * @param {int} limit 记录的最大动作数
 */
function makeHistory(limit) {
  const myarr = new Array();

  if (limit < 0) return;

  if (limit == 0) {
    return function (action) {
      if (action === "undo") {
        return "nothing to do";
      }
      return action + " done";
    };
  } else {
    return function (action) {
      if (action === "undo") {
        if (myarr.length > 0) {
          const lastAction = myarr.pop(); // 移除并返回最后一个元素
          return lastAction + " undone";
        } else {
          return "nothing to do";
        }
      } else {
        // 如果数组已满，移除第一个元素
        if (myarr.length >= limit) {
          myarr.shift(); // 移除第一个元素
        }
        myarr.push(action); // 添加新动作
        return action + " done";
      }
    };
  }
}

// 请勿删除，模块导出的函数才能被测试模块调用
module.exports = {
  makeHistory,
};

// 手写map
Array.prototype.mymap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (Object.hasOwn(this, i)) result.push(callback(this[i], i, this));
    // this.hasOwnProperty(i) 检查当前索引是否存在
  }
  return result;
};
// console.log([2, 4, 66, 7, , , ,].mymap((item) => item * 2));

//
function _get(obj, path, defaultValue = "undefined") {
  //先将path处理成统一格式
  let newPath = [];
  if (Array.isArray(path)) {
    newPath = path;
  } else {
    // 字符串类型 obj[a] obj.a  这里把'[' 替换成'.' ']' 替换成''
    newPath = path.replace(/\[/g, ".").replace(/\]/g, "").split("."); //最后转成数组
    console.log(newPath);
  }
  //obj 替换成 obj.a 逐步调用
  return (
    newPath.reduce((o, k) => {
      return (o || {})[k];
    }, obj) || defaultValue
    // 关键是把obj作为第一个参数传入
  );
}

var object = { a: [{ b: { c: 3 } }, { d: { e: 4 } }] };

console.log(_get(object, "a[1].d.e"));
// => 3

console.log(_get(object, ["a", "0", "b", "c"]));
// => 3

console.log(_get(object, "a.b.c", "default"));
// => 'default'
