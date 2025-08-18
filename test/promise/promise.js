const PADDING = "pending";
const FULDILLED = "fulfilled";
const REJECTED = "rejected";
class myPromise {
  #state = "pending";
  #result = undefined;
  #handers = [];
  constructor(excutor) {
    const resolve = (data) => {
      this.#changeState(FULDILLED, data);
    };
    const reject = (res) => {
      this.#changeState(REJECTED, res);
    };
    try {
      excutor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  #changeState(state, result) {
    if (this.#state !== PADDING) return;
    this.#state = state;
    this.#result = result;
  }
  getstate() {
    return this.#state;
  }
  #run() {
    while (this.#handers.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handers.shift();
      if (this.#state === FULDILLED) {
        if (typeof onFulfilled === "function") {
          onFulfilled(this.#result);
        }
      } else if (this.#state === REJECTED) {
        if (typeof onRejected === "function") {
          onRejected(this.#result);
        }
      }
    }
  }
  then(onFulfilled, onRejected) {
    this.#handers.push({ onFulfilled, onRejected, resolve, reject });
    this.#run();
    return new myPromise((resolve, reject) => {
      this.#handers.push({ onFulfilled, onRejected, resolve, reject });
      this.#run();
    });
  }
}

const mypromise = new myPromise((resolve, reject) => {
  resolve("成功");
  reject("失败");
});
// console.log(mypromise.getstate());
