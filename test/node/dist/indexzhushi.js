"use strict"; // 启用严格模式

// === Polyfill导入部分 ===
// 这些是core-js提供的polyfill，用于在不支持ES6+特性的环境中提供兼容性
require("core-js/modules/es.symbol.js"); // Symbol支持
require("core-js/modules/es.symbol.description.js"); // Symbol.description支持
require("core-js/modules/es.object.get-prototype-of.js"); // Object.getPrototypeOf支持
require("core-js/modules/es.object.set-prototype-of.js"); // Object.setPrototypeOf支持
require("core-js/modules/es.object.to-string.js"); // Object.prototype.toString支持
require("core-js/modules/es.promise.js"); // Promise支持（ES5没有原生Promise）
require("core-js/modules/web.timers.js"); // setTimeout等定时器支持

// === Regenerator Runtime ===
// 这是Facebook开发的运行时库，用于将ES6的generator函数转换为ES5兼容代码
// 因为async/await本质上是generator函数的语法糖，所以需要这个库来支持
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {}, // 检查Symbol是否存在，不存在则用空对象
    n = r.iterator || "@@iterator", // 获取迭代器符号
    o = r.toStringTag || "@@toStringTag"; // 获取toString标签符号

  // 这个函数创建一个generator实例
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator, // 确定构造函数
      u = Object.create(c.prototype); // 创建generator实例
    return (
      _regeneratorDefine2(u, "_invoke", function (r, n, o) {
        // 这里是generator的核心执行逻辑，管理状态机的转换
        var i,
          c,
          u,
          f = 0,
          p = o || [],
          y = !1,
          G = {
            p: 0,
            n: 0,
            v: e,
            a: d,
            f: d.bind(e, 4),
            d: function d(t, r) {
              return (i = t), (c = 0), (u = e), (G.n = r), a;
            },
          };

        // 状态机执行函数
        function d(r, n) {
          // 这里实现了generator的状态转换逻辑
          // r是操作类型（next/throw/return），n是传入的值
          for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
            // 处理各种状态转换...
          }
          if (o || r > 1) return a;
          throw ((y = !0), n);
        }

        // 返回generator的执行函数
        return function (o, p, l) {
          // 这是generator.next()、generator.throw()等方法的实现
          if (f > 1) throw TypeError("Generator is already running");
          for (
            y && 1 === p && d(p, l), c = p, u = l;
            (t = c < 2 ? e : u) || !y;

          ) {
            i ||
              (c
                ? c < 3
                  ? (c > 1 && (G.n = -1), d(c, u))
                  : (G.n = u)
                : (G.v = u));
            try {
              if (((f = 2), i)) {
                if ((c || (o = "next"), (t = i[o]))) {
                  if (!(t = t.call(i, u)))
                    throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  (u = t.value), c < 2 && (c = 0);
                } else
                  1 === c && (t = i.return) && t.call(i),
                    c < 2 &&
                      ((u = TypeError(
                        "The iterator does not provide a '" + o + "' method"
                      )),
                      (c = 1));
                i = e;
              } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
            } catch (t) {
              (i = e), (c = 1), (u = t);
            } finally {
              f = 1;
            }
          }
          return { value: t, done: y }; // 返回{value, done}格式的结果
        };
      }),
      u
    );
  }

  // Generator相关的构造函数定义
  function Generator() {} // Generator基类
  function GeneratorFunction() {} // GeneratorFunction构造函数
  function GeneratorFunctionPrototype() {} // 原型对象

  // 设置原型链关系
  t = Object.getPrototypeOf;
  var c = [][n]
      ? t(t([][n]()))
      : (_regeneratorDefine2((t = {}), n, function () {
          return this;
        }),
        t),
    u =
      (GeneratorFunctionPrototype.prototype =
      Generator.prototype =
        Object.create(c));

  // 创建generator函数的工厂函数
  function f(e) {
    return (
      Object.setPrototypeOf
        ? Object.setPrototypeOf(e, GeneratorFunctionPrototype)
        : ((e.__proto__ = GeneratorFunctionPrototype),
          _regeneratorDefine2(e, o, "GeneratorFunction")),
      (e.prototype = Object.create(u)),
      e
    );
  }

  // 设置各种属性和方法
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype),
    _regeneratorDefine2(
      GeneratorFunctionPrototype,
      "constructor",
      GeneratorFunction
    ),
    (GeneratorFunction.displayName = "GeneratorFunction"),
    _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"),
    _regeneratorDefine2(u),
    _regeneratorDefine2(u, o, "Generator"),
    _regeneratorDefine2(u, n, function () {
      return this;
    }),
    _regeneratorDefine2(u, "toString", function () {
      return "[object Generator]";
    }),
    (_regenerator = function _regenerator() {
      return { w: i, m: f };
    })()
  );
}

// === 属性定义辅助函数 ===
// 用于在对象上定义属性，兼容不支持Object.defineProperty的环境
function _regeneratorDefine2(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {}); // 测试Object.defineProperty是否可用
  } catch (e) {
    i = 0; // 如果不可用，设为0
  }
  (_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine2(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r
      ? i
        ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t })
        : (e[r] = n)
      : (o("next", 0), o("throw", 1), o("return", 2));
  }),
    _regeneratorDefine2(e, r, n, t);
}

// === Async/Await转换辅助函数 ===
// 这个函数处理generator的单步执行
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c), // 调用generator的方法（next/throw/return）
      u = i.value; // 获取返回值
  } catch (n) {
    return void e(n); // 如果出错，调用reject
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o); // 如果完成则resolve，否则继续执行
}

// === 主要的async转换函数 ===
// 这个函数将async函数转换为返回Promise的普通函数
function _asyncToGenerator(n) {
  return function () {
    var t = this, // 保存this上下文
      e = arguments; // 保存参数
    return new Promise(function (r, o) {
      // 返回一个Promise
      var a = n.apply(t, e); // 调用generator函数

      // 定义next和throw处理函数
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }

      _next(void 0); // 开始执行
    });
  };
}

// === 你的原始代码转换部分 ===
// 原始的async function test()被分解为两个函数

// 1. 外层包装函数，保持原有的函数名和调用方式
function test() {
  return _test.apply(this, arguments); // 委托给内部实现
}

// 2. 内部实现函数，包含实际的异步逻辑
function _test() {
  // 使用_asyncToGenerator将generator函数转换为async函数
  _test = _asyncToGenerator(
    /*#__PURE__*/ // 纯函数标记，用于代码优化
    _regenerator().m(function _callee() {
      // 创建generator函数
      return _regenerator().w(function (_context) {
        // generator的执行体
        while (1)
          switch (
            _context.n // 状态机，_context.n是当前状态
          ) {
            case 0: // 初始状态
              _context.n = 1; // 设置下一个状态
              // 返回Promise，这对应原代码中的await
              return new Promise(function (resolve, reject) {
                setTimeout(function () {
                  resolve();
                  console.log("test");
                }, 1000);
              });
            case 1: // Promise完成后的状态
              return _context.a(2); // 结束generator执行
          }
      }, _callee);
    })
  );
  return _test.apply(this, arguments);
}

// === 执行部分 ===
test(); // 调用异步函数
console.log("test2"); // 同步执行，会先于"test"输出
