function Promiseall(proms) {
  return new Promise((resolve, reject) => {
    if (!proms[Symbol.iterator]) {
      throw new TypeError("Promise.all requires an iterable object");
    }
    if (proms.length === 0) {
      resolve([]); // 修复：直接调用resolve而不是return Promise.resolve
      return;
    }
    const res = [];
    let count = 0;
    for (let i = 0; i < proms.length; i++) {
      console.log(proms[i]);
      Promise.resolve(proms[i]).then(
        (value) => {
          res[i] = value;
          if (++count === proms.length) {
            resolve(res);
          }
        },
        (reserror) => {
          reject(reserror);
        }
      );
    }
  });
}
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "foo");
});

Promiseall([promise3, promise2, promise1]).then(
  (values) => {
    console.log(values);
  },
  (error) => {
    console.log(error);
  }
);
