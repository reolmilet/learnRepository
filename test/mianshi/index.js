const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // Write your code here
  let fin;
  while ((line = await readline())) {
    let tokens = line.split(" ");
    const l = tokens[0];
    const r = tokens[1];
    const k = tokens[2];
    const x = tokens[3];
    function count(l, r, k, x) {
      if (r < 0) {
        return 0;
      }
      if (r < x) {
        return 0;
      }
      return Math.floor((r - x) / k) + 1;
    }
    const retruned = count(l, r, k, x);
    fin = retruned - count(l, l - 1, k, x);
    console.log(fin);
  }
  return fin;
})();

const obj = {
  a: 1,
  b: 2,
};
const { c } = obj;
// console.log(c);

//作业帮二面
// 查找是否有依赖循环
const packages = {
  a: { dependencies: ["b"] },
  b: { dependencies: ["c"] },
  c: { dependencies: ["a", "d"] },
  d: { dependencies: [] },
  e: { dependencies: ["a"] },
};

function check(packages) {
  const visited = {};
  function dfs(package) {
    console.log(package, "package");
    if (visited[package] === 1) {
      return true;
    }
    if (visited[package] === 2) {
      return false;
    }
    visited[package] = 1;
    const currentPackage = packages[package];
    if (!currentPackage) {
      // 若包不存在，直接标记为已访问，避免无效递归
      visited[packageName] = 2;
      return false;
    }

    for (const i of packages[package].dependencies) {
      if (dfs(i)) return true;
    }
    visited[package] = 2;
    return false;
  }
  for (const i of Object.keys(packages)) {
    if (dfs(i)) return true;
  }
  return false;
}
console.log(check(packages));
