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
console.log(treeToList(data));
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
  // console.log(this, "this");
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

// console.log(new Food("cheese", 5).name);
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
const arrobj = {
  prefix: "Item:",
  processItems(items) {
    // 用普通函数作为 forEach 回调
    console.log("普通函数回调：");
    items.mymap(function (item) {
      // this 指向全局对象，无法访问 obj 的 prefix
      console.log(`${this.prefix} ${item}`); // 输出：undefined 1（等）
    });

    // 用箭头函数作为 forEach 回调
    console.log("箭头函数回调：");
    items.mymap((item) => {
      // this 继承自 processItems 的 this（即 obj），可正常访问 prefix
      console.log(`${this.prefix} ${item}`); // 输出：Item: 1（等）
    });
  },
};

arrobj.processItems([1, 2, 3]);

//获取路径
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

// console.log(_get(object, "a[1].d.e"));
// // => 3

// console.log(_get(object, ["a", "0", "b", "c"]));
// // => 3

// console.log(_get(object, "a.b.c", "default"));
// // => 'default'
// 深拷贝
const deepCopy = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      newObj[key] = deepCopy(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
const reduceDeepCopy = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const newObj = Array.isArray(obj) ? [] : {};
  return Object.keys(obj).reduce((inobj, key) => {
    if (typeof obj[key] === "object") {
      inobj[key] = reduceDeepCopy(obj[key]);
    } else {
      inobj[key] = obj[key];
    }
    return inobj;
  }, newObj);
};
let obj = {
  a: 1,
  b: 2,
  c: {
    c: 1,
    d: 2,
  },
};
// console.log(reduceDeepCopy(obj));

//寄生组合式继承
/**
 * 
 * @param {*} value 
 * 核心问题：传统继承的缺陷
组合继承的问题：
组合继承通过 Parent.call(this) 继承实例属性，通过 Child.prototype = new Parent() 继承原型方法。但这种方式会调用两次父类构造函数：
一次是在创建子类原型时（new Parent()）
一次是在子类构造函数内部（Parent.call(this)）
导致父类的实例属性被重复定义（原型上有一份，实例上又有一份），造成冗余。
原型链继承的问题：
直接让 Child.prototype = Parent.prototype 会导致子类原型和父类原型指向同一个对象，修改子类原型会污染父类原型。
寄生组合式继承的解决方案
核心思路是：只调用一次父类构造函数，同时保持原型链的完整性。

实现步骤：

继承实例属性：通过 Parent.call(this, ...args) 在子类构造函数中调用父类构造函数，继承父类的实例属性（同组合继承）。
继承原型方法：
不直接使用 new Parent() 创建子类原型（避免二次调用父类构造函数），而是通过 Object.create(Parent.prototype) 创建一个父类原型的副本作为子类原型。
手动修正子类原型的 constructor 指向（指向子类自身），保证原型链正确。
 */

function Parent(value) {
  this.a = value;
}
Parent.prototype.getValue = function () {
  console.log(this.val);
};
function Child(value1, value2) {
  Parent.call(this, value1);
  this.b = value2;
}
// 将child的原型指向parent的原型
//第二个参数将child的constructor指向child的自身
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

Child.prototype[Symbol.toStringTag] = "Child.prototype";
// Child.prototype[Symbol.toStringTag] 是用于自定义对象的 toString () 行为的特殊属性，它会影响 Object.prototype.toString.call() 对该对象的类型描述。
Parent.prototype[Symbol.toStringTag] = "Parent.prototype";
// console.log(Child.prototype.constructor);
// console.log(Parent.prototype.constructor(1));
// console.log(global.a);

// 发布订阅
/**
 * 事件发布订阅模式
 * 1. on(name, fn) 订阅事件
 * 2. off(name, fn) 取消订阅事件
 * 3. emit(name, ...args) 发布事件
 */
class EventEmiter {
  constructor() {
    this.arr = [];
  }
  on(name, fn) {
    if (this.arr[name]) {
      this.arr[name].push(fn);
    } else {
      this.arr[name] = [fn];
    }
  }
  off(name, fn) {
    const inFn = this.arr[name];
    if (inFn) {
      if (fn) {
        const index = inFn.indexOf(fn);
        inFn.splice(index, 1);
      } else {
        const index = this.arr.indexOf(inFn);
        this.arr.splice(index, 1);
      }
    } else {
      console.log("没有这个事件");
    }
  }
  emit(name, ...arr) {
    const inFn = this.arr[name];
    if (inFn) {
      inFn.forEach((fn) => fn(...arr));
    } else {
      console.log("没有这个事件");
    }
  }
}
let eventsBus = new EventEmiter();
let fn1 = function (name, age) {
  console.log(name, age);
};
let fn2 = function (name, age) {
  console.log("fn", name, age);
};
eventsBus.on("test", fn1);
eventsBus.on("test", fn2);
eventsBus.emit("test", "Jason", 18);

const json = {
  a: {
    b: {
      c: 1,
    },
  },
  d: {
    e: 2,
  },
  f: {
    g: 3,
  },
  h: 4,
  i: {
    j: 6,
    k: 7,
  },
};
const jsonToFlat = function (json, oldkey) {
  let result = {};

  for (let key in json) {
    let newkey = oldkey ? `${oldkey}.${key}` : key;

    if (typeof json[key] === "object") {
      const res = jsonToFlat(json[key], newkey);
      result = { ...result, ...res };
    } else {
      result[newkey] = json[key];
    }
  }
  return result;
};
// console.log(jsonToFlat(json));
// {
//   "a.b.c": 1,
//   "d.e": 2,
//   "f.g": 3,
//   "h": 4,
//   "i.j": 6,
//   "i.k": 7
// }
