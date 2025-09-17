function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched"), 2000);
  });
}
function* asyncGenerator() {
  console.log(111);
  let step = 0;

  step = yield step;
  console.log(step);
  const data = yield fetchData();
  console.log(data); // 输出: Data fetched
}
const generator = asyncGenerator();
generator.next(3);
const promise = generator.next().value;
promise.then((result) => {
  generator.next(result);
});
console.log(asyncGenerator.prototype.prototype);
