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
  
  function dfs(packageName) {
    // 若已在访问中，说明存在循环
    if (visited[packageName] === 1) {
      return true;
    }
    // 若已访问完毕，无需重复检查
    if (visited[packageName] === 2) {
      return false;
    }
    
    // 标记为“访问中”
    visited[packageName] = 1;
    
    // 处理依赖的包不存在的情况
    const currentPackage = packages[packageName];
    if (!currentPackage) {
      visited[packageName] = 2; // 标记为已访问（无效包）
      return false;
    }
    
    // 遍历依赖并递归检测
    for (const dep of currentPackage.dependencies) {
      if (dfs(dep)) {
        return true; // 发现循环，立即返回
      }
    }
    
    // 所有依赖遍历完毕，标记为“已访问”
    visited[packageName] = 2;
    return false;
  }
  
  // 检查所有包
  for (const packageName of Object.keys(packages)) {
    if (dfs(packageName)) {
      return true; // 存在循环依赖
    }
  }
  
  return false; // 无循环依赖
}



console.log(check(packages)); // 输出 true（正确检测到循环）

