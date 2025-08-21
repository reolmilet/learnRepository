// promise 实现一个简单的任务调度器，限制同时运行的任务数量为 max。
class Scheduler {
  constructor(max) {
    this.task = [];
    this.count = 0;
    this.max = max;
  }
  async add(fn) {
    if (this.count >= this.max) {
      await new Promise((resolve) => this.task.push(resolve));
    }
    this.count++;
    await fn();

    this.count--;
    if (this.task.length) {
      this.task.shift()();
    }
  }
}
const sleep = (time) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );
};
const myscheduler = new Scheduler(2);
myscheduler.add(() => sleep(5000).then(() => console.log(1)));
myscheduler.add(() => sleep(2000).then(() => console.log(2)));
myscheduler.add(() => sleep(3000).then(() => console.log(3)));
