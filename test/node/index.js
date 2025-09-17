async function test() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      console.log("test");
    }, 1000);
  });
}
test();
console.log("test2");
