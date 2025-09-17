// 传统Generator使用方式
function* myGenerator() {
  const result1 = yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
  const result2 = yield Promise.resolve(2);
  return result1 + result2;
}

const gen = myGenerator();
console.log(gen, "gen");
const step1 = gen.next(); // 手动调用
console.log(step1, "step1");
step1.value.then((result) => {
  const step2 = gen.next(result); // 手动传递结果并调用
  console.log(step2, "step2");
  step2.value.then((result2) => {
    const final = gen.next(result2); // 继续手动调用
    console.log(final.value); // 最终结果
  });
});
// next的参数作为上一个yield的返回值
