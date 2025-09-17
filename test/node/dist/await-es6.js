"use strict"; // 启用严格模式，确保代码在严格模式下运行

// 引入core-js的Promise polyfill，为不支持Promise的环境提供Promise功能
require("core-js/modules/es.promise.js");

// 异步生成器步骤函数 - 这是Babel生成的辅助函数，用于处理async/await的状态机逻辑
// 参数说明：generator=生成器, resolvePromise=resolve函数, rejectPromise=reject函数, nextStep=next函数, throwError=throw函数, methodName=方法名, value=参数
function asyncGeneratorStep(
  generator,
  resolvePromise,
  rejectPromise,
  nextStep,
  throwError,
  methodName,
  value
) {
  try {
    var result = generator[methodName](value), // 调用生成器的方法（next或throw）
      resultValue = result.value; // 获取生成器返回的值
  } catch (error) {
    return void rejectPromise(error); // 如果出错，调用reject函数
  }
  // 如果生成器完成，resolve结果；否则等待Promise并继续
  result.done
    ? resolvePromise(resultValue)
    : Promise.resolve(resultValue).then(nextStep, throwError);
}

// async/await转换器 - 将async函数转换为返回Promise的普通函数
// 这个函数接收一个生成器函数，返回一个返回Promise的函数
function _asyncToGenerator(generatorFunction) {
  return function () {
    var context = this, // 保存this上下文
      args = arguments; // 保存函数参数
    return new Promise(function (resolve, reject) {
      // 返回一个新的Promise
      var generator = generatorFunction.apply(context, args); // 执行生成器函数

      // 定义next函数，用于推进生成器执行
      function _next(value) {
        asyncGeneratorStep(
          generator,
          resolve,
          reject,
          _next,
          _throw,
          "next",
          value
        );
      }

      // 定义throw函数，用于向生成器抛出错误
      function _throw(error) {
        asyncGeneratorStep(
          generator,
          resolve,
          reject,
          _next,
          _throw,
          "throw",
          error
        );
      }

      _next(void 0); // 开始执行生成器
    });
  };
}

// 原始的async函数被转换为普通函数
function test() {
  return _test.apply(this, arguments); // 调用实际的实现函数
}

// 实际的async函数实现，被转换为生成器函数
function _test() {
  // 使用_asyncToGenerator包装生成器函数
  _test = _asyncToGenerator(function* () {
    // yield对应原来的await
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(); // 1秒后resolve Promise
        console.log("test");
      }, 1000);
    });
  });
  return _test.apply(this, arguments);
}

// 调用async函数
test();
console.log("test2"); // 这行会立即执行，不等待test()完成
