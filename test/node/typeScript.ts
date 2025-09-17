// 设置只读
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// 测试
interface Example {
  a: number;
  b: {
    c: string;
  };
}

const obj: DeepReadonly<Example> = { a: 1, b: { c: 'test' } };
obj.a = 2; // 报错
obj.b.c = 'new'; // 报错
interface myobj  {
    a:unknown,
}

type PartialByKeys<T, K extends keyof T> = {
  [P in K]?: T[P];
} & {
  [P in Exclude<keyof T, K>]: T[P];
} extends infer O
  ? { [P in keyof O]: O[P] }
  : never;

// 测试
interface User {
  name: string;
  age: number;
  address: string;
}

type PartialName = PartialByKeys<User, 'name'>;
// 结果：{ name?: string; age: number; address: string }

type DeepReadOnly<T> = {
    readonly [K in keyof T]:T[K] extends Object?DeepReadOnly<T[K]>:T[K]
}

interface User {
  id: number;
  name: string;
}

// 定义异步函数类型
type FetchData = () => Promise<User>;

// 实现异步函数
const fetchData: FetchData = async () => {
  const response = await fetch('/api/user');
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

// 调用函数并处理结果
async function handleFetch() {
  try {
    const user = await fetchData();
    console.log('Success:', user.name);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
  }
}
type myArr<T> = T[]
var myArr: Array<number | string> = [1, 2, 3]
var myArr: (number | string)[] = [1, 2, 3, '4']


let a :Array<number|string> = [1,2,3,'4']