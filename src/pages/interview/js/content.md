# 薪资上涨 5K 以上系列：JS 基础篇
## 数据类型

JS 数据类型分为两大类，九个数据类型：

1. 原始类型
2. 对象类型

其中原始类型又分为七种类型，分别为：

- `boolean`
- `number`
- `string`
- `undefined`
- `null`
- `symbol`
- **`bigint`**

对象类型分为两种，分别为：

- `Object`
- `Function`

其中 `Object` 中又包含了很多子类型，比如 `Array`、`RegExp`、`Math`、`Map`、`Set` 等等，也就不一一列出了。

原始类型存储在栈上，对象类型存储在堆上，但是它的引用地址还是存在栈上。

**注意：以上结论前半句是不准确的，更准确的内容我会在闭包章节里说明。**

### 常见考点

- JS 类型有哪些？
- 大数相加、相乘算法题，可以直接使用 `bigint`，当然再加上字符串的处理会更好。
- `NaN` 如何判断

另外还有一类常见的题目是对于对象的修改，比如说往函数里传一个对象进去，函数内部修改参数。

```js
function test(person) {
  person.age = 26
  person = {}

  return person
}
const p1 = {
  age: 25
}
```

这类题目我们只需要牢记以下几点：

1. 对象存储的是引用地址，传来传去、赋值给别人那都是在传递值（存在栈上的那个内容），别人一旦修改对象里的属性，大家都被修改了。
2. 但是一旦对象被重新赋值了，只要不是原对象被重新赋值，那么就永远不会修改原对象。

## 类型判断

类型判断有好几种方式。

### typeof

原始类型中除了 `null`，其它类型都可以通过 `typeof` 来判断。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/26/16167245597616.jpg)

`typeof null` 的值为 `object`，这是因为一个久远的 Bug，没有细究的必要，了解即可。如果想具体判断 `null` 类型的话直接 `xxx === null` 即可。

对于对象类型来说，`typeof` 只能具体判断函数的类型为 `function`，其它均为 `object`。

### instanceof

`instanceof` 内部通过原型链的方式来判断是否为构建函数的实例，常用于判断具体的对象类型。

```js
[] instanceof Array
```

都说 `instanceof` 只能判断对象类型，其实这个说法是不准确的，我们是可以通过 hake 的方式得以实现，虽然不会有人这样去玩吧。

```js
class CheckIsNumber {
  static [Symbol.hasInstance](number) {
    return typeof number === 'number'
  }
}

// true
1 instanceof CheckIsNumber
```

另外其实我们还可以直接通过构建函数来判断类型：

```js
// true
[].constructor === Array
```

### Object.prototype.toString

前几种方式或多或少都存在一些缺陷，`Object.prototype.toString` 综合来看是最佳选择，能判断的类型最完整。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/26/16167262728324.jpg)

上图是一部分类型判断，更多的就不列举了，`[object XXX]` 中的 `XXX` 就是判断出来的类型。

### isXXX API

同时还存在一些判断特定类型的 API，选了两个常见的：

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/26/16167498169233.jpg)

### 常见考点

- JS 类型如何判断，有哪几种方式可用
- `instanceof` 原理
- 手写 `instanceof`

## 类型转换

类型转换分为两种情况，分别为强制转换及隐式转换。

### 强制转换

强制转换就是转成特定的类型：

```js
Number(false) // -> 0
Number('1') // -> 1
Number('zb') // -> NaN
(1).toString() // '1'
```
这部分是日常常用的内容，就不具体展开说了，主要记住强制转数字和布尔值的规则就行。

转布尔值规则：

- `undefined、null、false、NaN、''、0、-0` 都转为 `false`。
- 其他所有值都转为 `true`，包括所有对象。

转数字规则：

- `true` 为 1，`false` 为 0
- `null` 为 0，`undefined` 为 `NaN`，`symbol` 报错
- 字符串看内容，如果是数字或者进制值就正常转，否则就 `NaN`
- 对象的规则隐式转换再讲

### 隐式转换

隐式转换规则是最烦的，其实笔者也记不住那么多内容。况且根据笔者目前收集到的最新面试题来说，这部分考题基本绝迹了，当然讲还是讲一下吧。

对象转基本类型：

- 调用 `Symbol.toPrimitive`，转成功就结束
- 调用 `valueOf`，转成功就结束
- 调用 `toString`，转成功就结束
- 报错

四则运算符：

- 只有当加法运算时，其中一方是字符串类型，就会把另一个也转为字符串类型
- 其他运算只要其中一方是数字，那么另一方就转为数字

`==` 操作符

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-043719.png)

### 常见考点

如果这部分规则记不住也不碍事，确实有点繁琐，而且考的也越来越少了，拿一道以前常考的题目看看吧：

```js
[] == ![] // -> ?
```

## this

`this` 是很多人会混淆的概念，但是其实他一点都不难，不要被那些长篇大论的文章吓住了（我其实也不知道为什么他们能写那么多字），你只需要记住几个规则就可以了。

### 普通函数

```js
function foo() {
	console.log(this.a)
}
var a = 1
foo()

var obj = {
	a: 2,
	foo: foo
}
obj.foo()

// 以上情况就是看函数是被谁调用，那么 `this` 就是谁，没有被对象调用，`this` 就是 `window`

// 以下情况是优先级最高的，`this` 只会绑定在 `c` 上，不会被任何方式修改 `this` 指向
var c = new foo()
c.a = 3
console.log(c.a)

// 还有种就是利用 call，apply，bind 改变 this，这个优先级仅次于 new
```

### 箭头函数

因为箭头函数没有 `this`，所以一切妄图改变箭头函数 `this` 指向都是无效的。

箭头函数的 `this` 只取决于定义时的环境。比如如下代码中的 `fn` 箭头函数是在 `windows` 环境下定义的，无论如何调用，`this` 都指向 `window`。

```js
var a = 1
const fn = () => {
  console.log(this.a)
}
const obj = {
  fn,
  a: 2
}
obj.fn()
```

### 常见考点

这里一般都是考 `this` 的指向问题，牢记上述的几个规则就够用了，比如下面这道题：

```js
const a = {
  b: 2,
  foo: function () { console.log(b) }
}

function b(foo) {
  // 输出什么？
  foo()
}

b(a.foo)
```

## 闭包

首先闭包正确的定义是：**假如一个函数能访问外部的变量，那么这个函数它就是一个闭包，而不是一定要返回一个函数**。这个定义很重要，下面的内容需要用到。

```js
let a = 1
// fn 是闭包
function fn() {
  console.log(a);
}

function fn1() {
  let a = 1
  // 这里也是闭包
  return () => {
    console.log(a);
  }
}
const fn2 = fn1()
fn2()
```
大家都知道闭包其中一个作用是访问私有变量，就比如上述代码中的 `fn2` 访问到了 `fn1` 函数中的变量 `a`。但是此时 `fn1` 早已销毁，我们是如何访问到变量 `a` 的呢？不是都说原始类型是存放在栈上的么，为什么此时却没有被销毁掉？

接下来笔者会根据浏览器的表现来重新理解关于原始类型存放位置的说法。

先来说下数据存放的正确规则是：局部、占用空间确定的数据，一般会存放在栈中，否则就在堆中（也有例外）。 那么接下来我们可以通过 Chrome 来帮助我们验证这个说法说法。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/27/16168151767374.jpg)

上图中画红框的位置我们能看到一个内部的对象 `[[Scopes]]`，其中存放着变量 `a`，该对象是被存放在堆上的，其中包含了闭包、全局对象等等内容，因此我们能通过闭包访问到本该销毁的变量。

另外最开始我们对于闭包的定位是：**假如一个函数能访问外部的变量，那么这个函数它就是一个闭包**，因此接下来我们看看在全局下的表现是怎么样的。

```js
let a = 1
var b = 2
// fn 是闭包
function fn() {
  console.log(a, b);
}
```

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/27/16168161295337.jpg)

从上图我们能发现全局下声明的变量，如果是 var 的话就直接被挂到 `globe` 上，如果是其他关键字声明的话就被挂到 `Script` 上。虽然这些内容同样还是存在 `[[Scopes]]`，但是全局变量应该是存放在静态区域的，因为全局变量无需进行垃圾回收，等需要回收的时候整个应用都没了。

只有在下图的场景中，原始类型才可能是被存储在栈上。

> 这里为什么要说可能，是因为 JS 是门动态类型语言，一个变量声明时可以是原始类型，马上又可以赋值为对象类型，然后又回到原始类型。这样频繁的在堆栈上切换存储位置，内部引擎是不是也会有什么优化手段，或者干脆全部都丢堆上？只有 `const` 声明的原始类型才一定存在栈上？当然这只是笔者的一个推测，暂时没有深究，读者可以忽略这段瞎想。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/27/16168167470524.jpg)

因此笔者对于原始类型存储位置的理解为：**局部变量才是被存储在栈上，全局变量存在静态区域上，其它都存储在堆上。**

当然这个理解是建立的 Chrome 的表现之上的，在不同的浏览器上因为引擎的不同，可能存储的方式还是有所变化的。

### 常见考点

闭包能考的很多，概念和笔试题都会考。

概念题就是考考闭包是什么了。

笔试题的话基本都会结合上异步，比如最常见的：

```js
for (var i = 0; i < 6; i++) {
  setTimeout(() => {
    console.log(i)
  })
}
```

这道题会问输出什么，有哪几种方式可以得到想要的答案？

## new

`new` 操作符可以帮助我们构建出一个实例，并且绑定上 `this`，内部执行步骤可大概分为以下几步：

1. 新生成了一个对象
2. 对象连接到构造函数原型上，并绑定 this
3. 执行构造函数代码
4. 返回新对象

在第四步返回新对象这边有一个情况会例外：

```js
function Test(name) {
  this.name = name
  console.log(this) // Test { name: 'yck' }
  return { age: 26 }
}
const t = new Test('yck')
console.log(t) // { age: 26 }
console.log(t.name) // 'undefined'
```

当在构造函数中返回一个对象时，内部创建出来的新对象就被我们返回的对象所覆盖，所以一般来说构建函数就别返回对象了（返回原始类型不影响）。

### 常见考点

- `new` 做了那些事？
- `new` 返回不同的类型时会有什么表现？
- 手写 `new` 的实现过程

## 作用域

作用域可以理解为变量的可访问性，总共分为三种类型，分别为：

- 全局作用域
- 函数作用域
- 块级作用域，ES6 中的 `let`、`const` 就可以产生该作用域

其实看完前面的闭包、`this` 这部分内部的话，应该基本能了解作用域的一些应用。

一旦我们将这些作用域嵌套起来，就变成了另外一个重要的知识点「作用域链」，也就是 JS 到底是如何访问需要的变量或者函数的。

首先作用域链是在定义时就被确定下来的，和箭头函数里的 `this` 一样，后续不会改变，JS 会一层层往上寻找需要的内容。

其实作用域链这个东西我们在闭包小结中已经看到过它的实体了：`[[Scopes]]`

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/27/16168151767374.jpg)

图中的 `[[Scopes]]` 是个数组，作用域的一层层往上寻找就等同于遍历 `[[Scopes]]`。

### 常见考点

- 什么是作用域
- 什么是作用域链

## 原型

原型在面试里只需要几句话、一张图的概念就够用了，没人会让你长篇大论讲上一堆内容的，问原型更多的是为了引出继承这个话题。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/27/16168535874977.png)

根据上图，原型总结下来的概念为：

- 所有对象都有一个属性 `__proto__` 指向一个对象，也就是原型
- 每个对象的原型都可以通过 `constructor` 找到构造函数，构造函数也可以通过 `prototype` 找到原型
- 所有函数都可以通过 `__proto__` 找到 `Function` 对象
- 所有对象都可以通过 `__proto__` 找到 `Object` 对象
- 对象之间通过 `__proto__` 连接起来，这样称之为原型链。当前对象上不存在的属性可以通过原型链一层层往上查找，直到顶层 `Object` 对象，再往上就是 `null` 了

### 常见考点

- 聊聊你理解的原型是什么

## 继承

即使是 ES6 中的 `class` 也不是其他语言里的类，本质就是一个函数。

```js
class Person {}
Person instanceof Function // true
```

其实在当下都用 ES6 的情况下，ES5 的继承写法已经没啥学习的必要了，但是因为面试还会被问到，所以复习一下还是需要的。

首先来说下 ES5 和 6 继承的区别：

1. ES6 继承的子类需要调用 `super()` 才能拿到子类，ES5 的话是通过 `apply` 这种绑定的方式
2. 类声明不会提升，和 `let` 这些一致

接下来就是回字的几种写法的名场面了，ES5 实现继承的方式有很多种，面试了解一种已经够用：

```js
function Super() {}
Super.prototype.getNumber = function() {
  return 1
}

function Sub() {}
Sub.prototype = Object.create(Super.prototype, {
  constructor: {
    value: Sub,
    enumerable: false,
    writable: true,
    configurable: true
  }
})
let s = new Sub()
s.getNumber()
```

### 常见考点

- JS 中如何实现继承
- 通过原型实现的继承和 `class` 有何区别
- 手写任意一种原型继承

## 深浅拷贝

### 浅拷贝

两个对象第一层的引用不相同就是浅拷贝的含义。

我们可以通过 `assign` 、扩展运算符等方式来实现浅拷贝：

```js
let a = {
    age: 1
}
let b = Object.assign({}, a)
a.age = 2
console.log(b.age) // 1
b = {...a}
a.age = 3
console.log(b.age) // 2
```

### 深拷贝

两个对象内部所有的引用都不相同就是深拷贝的含义。

最简单的深拷贝方式就是使用 `JSON.parse(JSON.stringify(object))`，但是该方法存在不少缺陷。

比如说只支持 JSON 支持的类型，JSON 是门通用的语言，并不支持 JS 中的所有类型。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/03/28/16169243754994.jpg)

同时还存在不能处理循环引用的问题：

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-043724.png)

如果想解决以上问题，我们可以通过递归的方式来实现代码：

```js
// 利用 WeakMap 解决循环引用
let map = new WeakMap()
function deepClone(obj) {
  if (obj instanceof Object) {
    if (map.has(obj)) {
      return map.get(obj)
    }
    let newObj
    if (obj instanceof Array) {
      newObj = []     
    } else if (obj instanceof Function) {
      newObj = function() {
        return obj.apply(this, arguments)
      }
    } else if (obj instanceof RegExp) {
      // 拼接正则
      newobj = new RegExp(obj.source, obj.flags)
    } else if (obj instanceof Date) {
      newobj = new Date(obj)
    } else {
      newObj = {}
    }
    // 克隆一份对象出来
    let desc = Object.getOwnPropertyDescriptors(obj)
    let clone = Object.create(Object.getPrototypeOf(obj), desc)
    map.set(obj, clone)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key])
      }
    }
    return newObj
  }
  return obj
}
```

上述代码解决了常见的类型以及循环引用的问题，当然还是一部分缺陷的，但是面试时候能写出上面的代码已经足够了，剩下的能口述思路基本这道题就能拿到高分了。

比如说递归肯定会存在爆栈的问题，因为执行栈的大小是有限制的，到一定数量栈就会爆掉。

因此遇到这种问题，我们可以通过遍历的方式来改写递归。这个就是如何写层序遍历（BFS）的问题了，通过数组来模拟执行栈就能解决爆栈问题，有兴趣的读者可以咨询查阅。

## Promise

`Promise` 是一个高频考点了，但是更多的是在笔试题中出现，概念题反倒基本没有，多是来问 Event loop 的。

对于这块内容的复习我们需要熟悉涉及到的所有 API，因为考题里可能会问到 `all`、`race` 等等用法或者需要你用这些 API 实现一些功能。

对于 `Promise` 进阶点的知识可以具体阅读笔者的这篇文章，这里就不复制过来占用篇幅了：[Promise 你真的用明白了么？](https://juejin.cn/post/6869573288478113799)

### 常见考点

- 使用 `all` 实现并行需求
- [Promise all 错误处理](https://github.com/KieSun/fucking-frontend/issues/6)
- 手写 `all` 的实现

另外还有一道很常见的串行题目：

> 页面上有三个按钮，分别为 A、B、C，点击各个按钮都会发送异步请求且互不影响，每次请求回来的数据都为按钮的名字。 请实现当用户依次点击 A、B、C、A、C、B 的时候，最终获取的数据为 ABCACB。

这道题目主要两个考点：

1. 请求不能阻塞，但是输出可以阻塞。比如说 B 请求需要耗时 3 秒，其他请求耗时 1 秒，那么当用户点击 BAC 时，三个请求都应该发起，但是因为 B 请求回来的慢，所以得等着输出结果。
2. 如何实现一个队列？

其实我们无需自己去构建一个队列，直接利用 `promise.then` 方法就能实现队列的效果了。

```js
class Queue {
  promise = Promise.resolve();

  excute(promise) {
    this.promise = this.promise.then(() => promise);
    return this.promise;
  }
}

const queue = new Queue();

const delay = (params) => {
  const time = Math.floor(Math.random() * 5);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, time * 500);
  });
};

const handleClick = async (name) => {
  const res = await queue.excute(delay(name));
  console.log(res);
};

handleClick('A');
handleClick('B');
handleClick('C');
handleClick('A');
handleClick('C');
handleClick('B');
```

### async、await

`await` 和 `promise` 一样，更多的是考笔试题，当然偶尔也会问到和 `promise` 的一些区别。

`await` 相比直接使用 `Promise` 来说，优势在于处理 `then` 的调用链，能够更清晰准确的写出代码。缺点在于滥用 `await` 可能会导致性能问题，因为 `await` 会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致代码失去了并发性，此时更应该使用 `Promise.all`。

下面来看一道很容易做错的笔试题。

```js
var a = 0
var b = async () => {
  a = a + await 10
  console.log('2', a) // -> ？
}
b()
a++
console.log('1', a) // -> ？
```

这道题目大部分读者肯定会想到 `await` 左边是异步代码，因此会先把同步代码执行完，此时 `a` 已经变成 1，所以答案应该是 11。

其实 `a` 为 0 是因为加法运算法，先算左边再算右边，所以会把 0 固定下来。如果我们把题目改成 `await 10 + a` 的话，答案就是 11 了。

## 事件循环

在开始讲事件循环之前，我们一定要牢记一点：**JS 是一门单线程语言，在执行过程中永远只能同时执行一个任务，任何异步的调用都只是在模拟这个过程，或者说可以直接认为在 JS 中的异步就是延迟执行的同步代码**。另外别的什么 Web worker、浏览器提供的各种线程都不会影响这个点。

大家应该都知道执行 JS 代码就是往执行栈里 `push` 函数（不知道的自己搜索吧），那么当遇到异步代码的时候会发生什么情况？

其实当遇到异步的代码时，只有当遇到 Task、Microtask 的时候才会被挂起并在需要执行的时候加入到 Task（有多种 Task） 队列中。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/2021/04/04/16175397496891.jpg)

从图上我们得出两个疑问：

1. 什么任务会被丢到 Microtask Queue 和 Task Queue 中？它们分别代表了什么？
2. Event loop 是如何处理这些 task 的？

首先我们来解决问题一。

Task（宏任务）：同步代码、`setTimeout` 回调、`setInteval` 回调、IO、UI 交互事件、`postMessage`、`MessageChannel`。

MicroTask（微任务）：`Promise` 状态改变以后的回调函数（`then` 函数执行，如果此时状态没变，回调只会被缓存，只有当状态改变，缓存的回调函数才会被丢到任务队列）、`Mutation observer` 回调函数、`queueMicrotask` 回调函数（新增的 API）。

宏任务会被丢到下一次事件循环，并且宏任务队列每次只会执行一个任务。

微任务会被丢到本次事件循环，并且微任务队列每次都会执行任务直到队列为空。

**假如**每个微任务都会产生一个微任务，那么宏任务永远都不会被执行了。

接下来我们来解决问题二。

Event Loop 执行顺序如下所示：

1. 执行同步代码
2. 执行完所有同步代码后且执行栈为空，判断是否有微任务需要执行
3. 执行所有微任务且微任务队列为空
4. 是否有必要渲染页面
5. 执行一个宏任务

如果你觉得上面的表述不大理解的话，接下来我们通过代码示例来巩固理解上面的知识：

```js
console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
    queueMicrotask(() => console.log('queueMicrotask'))
    console.log('promise');
});

console.log('script end');
```

1. 遇到 `console.log` 执行并打印
2. 遇到 `setTimeout`，将回调加入宏任务队列
3. 遇到 `Promise.resolve()`，此时状态已经改变，因此将 `then` 回调加入微任务队列
4. 遇到 `console.log` 执行并打印

此时同步任务全部执行完毕，分别打印了 'script start' 以及 'script end'，开始判断是否有微任务需要执行。

5. 微任务队列存在任务，开始执行 `then` 回调函数
6. 遇到 `queueMicrotask`，将回到加入微任务队列
7. 遇到 `console.log` 执行并打印
8. 检查发现微任务队列存在任务，执行 `queueMicrotask` 回调
9. 遇到 `console.log` 执行并打印

此时发现微任务队列已经清空，判断是否需要进行 UI 渲染。

10. 执行宏任务，开始执行 `setTimeout` 回调
11. 遇到 `console.log` 执行并打印

执行一个宏任务即结束，寻找是否存在微任务，开始循环判断...

其实事件循环没啥难懂的，理解 JS 是个单线程语言，明白哪些是微宏任务、循环的顺序就好了。

最后需要注意的一点：正是因为 JS 是门单线程语言，只能同时执行一个任务。因此所有的任务都可能因为之前任务的执行时间过长而被延迟执行，尤其对于一些定时器而言。

### 常见考点

- 什么是事件循环？
- JS 的执行原理？
- 哪些是微宏任务？
- 定时器是准时的嘛？

## 模块化

当下模块化主要就是 CommonJS 和 ES6 的 ESM 了，其它什么的 AMD、UMD 了解下就行了。

ESM 我想应该没啥好说的了，主要我们来聊聊 CommonJS 以及 ESM 和 CommonJS 的区别。

### CommonJS

CommonJs 是 Node 独有的规范，当然 Webpack 也自己实现了这套东西，让我们能在浏览器里跑起来这个规范。

```js
// a.js
module.exports = {
    a: 1
}
// or
exports.a = 1

// b.js
var module = require('./a.js')
module.a // -> log 1
```

在上述代码中，`module.exports` 和 `exports` 很容易混淆，让我们来看看大致内部实现

```js
// 基本实现
var module = {
  exports: {} // exports 就是个空对象
}
// 这个是为什么 exports 和 module.exports 用法相似的原因
var exports = module.exports
var load = function (module) {
    // 导出的东西
    var a = 1
    module.exports = a
    return module.exports
};
```

根据上面的大致实现，我们也能看出为什么对 `exports` 直接赋值不会有任何效果。

对于 CommonJS 和 ESM 的两者区别是：

- 前者支持动态导入，也就是 `require(${path}/xx.js)`，后者使用 `import()`
- 前者是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
- 前者在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是后者采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化

## 垃圾回收

本小结内容建立在 V8 引擎之上。

首先聊垃圾回收之前我们需要知道堆栈到底是存储什么数据的，当然这块内容上文已经讲过，这里就不再赘述了。

接下来我们先来聊聊栈是如何垃圾回收的。其实栈的回收很简单，简单来说就是一个函数 push 进栈，执行完毕以后 pop 出来就当可以回收了。当然我们往深层了讲深层了讲就是汇编里的东西了，操作 esp 和 ebp 指针，了解下即可。

然后就是堆如何回收垃圾了，这部分的话会分为两个空间及多个算法。

两个空间分别为新生代和老生代，我们分开来讲每个空间中涉及到的算法。

### 新生代

新生代中的对象一般存活时间较短，空间也较小，使用 Scavenge GC 算法。

在新生代空间中，内存空间分为两部分，分别为 From 空间和 To 空间。在这两个空间中，必定有一个空间是使用的，另一个空间是空闲的。新分配的对象会被放入 From 空间中，当 From 空间被占满时，新生代 GC 就会启动了。算法会检查 From 空间中存活的对象并复制到 To 空间中，如果有失活的对象就会销毁。当复制完成后将 From 空间和 To 空间互换，这样 GC 就结束了。

### 老生代

老生代中的对象一般存活时间较长且数量也多，使用了两个算法，分别是标记清除和标记压缩算法。

在讲算法前，先来说下什么情况下对象会出现在老生代空间中：

- 新生代中的对象是否已经经历过一次以上 Scavenge 算法，如果经历过的话，会将对象从新生代空间移到老生代空间中。
- To 空间的对象占比大小超过 25 %。在这种情况下，为了不影响到内存分配，会将对象从新生代空间移到老生代空间中。

老生代中的空间很复杂，有如下几个空间

```c++
enum AllocationSpace {
  // TODO(v8:7464): Actually map this space's memory as read-only.
  RO_SPACE,    // 不变的对象空间
  NEW_SPACE,   // 新生代用于 GC 复制算法的空间
  OLD_SPACE,   // 老生代常驻对象空间
  CODE_SPACE,  // 老生代代码对象空间
  MAP_SPACE,   // 老生代 map 对象
  LO_SPACE,    // 老生代大空间对象
  NEW_LO_SPACE,  // 新生代大空间对象

  FIRST_SPACE = RO_SPACE,
  LAST_SPACE = NEW_LO_SPACE,
  FIRST_GROWABLE_PAGED_SPACE = OLD_SPACE,
  LAST_GROWABLE_PAGED_SPACE = MAP_SPACE
};
```

在老生代中，以下情况会先启动标记清除算法：

- 某一个空间没有分块的时候
- 空间中被对象超过一定限制
- 空间不能保证新生代中的对象移动到老生代中

在这个阶段中，会遍历堆中所有的对象，然后标记活的对象，在标记完成后，销毁所有没有被标记的对象。在标记大型对内存时，可能需要几百毫秒才能完成一次标记。这就会导致一些性能上的问题。为了解决这个问题，2011 年，V8 从 stop-the-world 标记切换到增量标志。在增量标记期间，GC 将标记工作分解为更小的模块，可以让 JS 应用逻辑在模块间隙执行一会，从而不至于让应用出现停顿情况。但在 2018 年，GC 技术又有了一个重大突破，这项技术名为并发标记。该技术可以让 GC 扫描和标记对象时，同时允许 JS 运行，你可以点击 [该博客](https://v8project.blogspot.com/2018/06/concurrent-marking.html) 详细阅读。

清除对象后会造成堆内存出现碎片的情况，当碎片超过一定限制后会启动压缩算法。在压缩过程中，将活的对象像一端移动，直到所有对象都移动完成然后清理掉不需要的内存。

## 其它考点
### 0.1 + 0.2 !== 0.3

因为 JS 采用 IEEE 754 双精度版本（64位），并且只要采用 IEEE 754 的语言都有该问题。

不止 0.1 + 0.2 存在问题，0.7 + 0.1、0.2 + 0.4 同样也存在问题。

存在问题的原因是浮点数用二进制表示的时候是无穷的，因为精度的问题，两个浮点数相加会造成截断丢失精度，因此再转换为十进制就出了问题。

解决的办法可以通过以下代码：

```js
export const addNum = (num1: number, num2: number) => {
  let sq1;
  let sq2;
  let m;
  try {
    sq1 = num1.toString().split('.')[1].length;
  } catch (e) {
    sq1 = 0;
  }
  try {
    sq2 = num2.toString().split('.')[1].length;
  } catch (e) {
    sq2 = 0;
  }
  m = Math.pow(10, Math.max(sq1, sq2));
  return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
};
```

核心就是计算出两个浮点数最大的小数长度，比如说 0.1 + 0.22 的小数最大长度为 2，然后两数乘上 10 的 2次幂再相加得出数字 32，然后除以 10 的 2次幂即可得出正确答案 0.32。

## 手写题
### 防抖

你是否在日常开发中遇到一个问题，在滚动事件中需要做个复杂计算或者实现一个按钮的防二次点击操作。

这些需求都可以通过函数防抖动来实现。尤其是第一个需求，如果在频繁的事件回调中做复杂计算，很有可能导致页面卡顿，不如将多次计算合并为一次计算，只在一个精确点做操作。

PS：防抖和节流的作用都是防止函数多次调用。区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于阈值，防抖的情况下只会调用一次，而节流会每隔一定时间调用函数。

我们先来看一个袖珍版的防抖理解一下防抖的实现：

```js
// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
// 不难看出如果用户调用该函数的间隔小于 wait 的情况下，上一次的时间还未到就被清除了，并不会执行函数
```
这是一个简单版的防抖，但是有缺陷，这个防抖只能在最后调用。一般的防抖会有immediate选项，表示是否立即调用。这两者的区别，举个栗子来说：
- 例如在搜索引擎搜索问题的时候，我们当然是希望用户输入完最后一个字才调用查询接口，这个时候适用**延迟执行**的防抖函数，它总是在一连串（间隔小于wait的）函数触发之后调用。
- 例如用户给interviewMap点star的时候，我们希望用户点第一下的时候就去调用接口，并且成功之后改变star按钮的样子，用户就可以立马得到反馈是否star成功了，这个情况适用`立即执行`的防抖函数，它总是在第一次调用，并且下一次调用必须与前一次调用的时间间隔大于wait才会触发。

下面我们来实现一个带有立即执行选项的防抖函数


```js
// 这个是用来获取当前时间戳的
function now() {
  return +new Date()
}
/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounce (func, wait = 50, immediate = true) {
  let timer, context, args
  
  // 延迟执行函数
  const later = () => setTimeout(() => {
    // 延迟函数执行完毕，清空缓存的定时器序号
    timer = null
    // 延迟执行的情况下，函数会在延迟函数中执行
    // 使用到之前缓存的参数和上下文
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  // 这里返回的函数是每次实际调用的函数
  return function(...params) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
    // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}
```

整体函数实现的不难，总结一下。

- 对于按钮防点击来说的实现：如果函数是立即执行的，就立即调用，如果函数是延迟执行的，就缓存上下文和参数，放到延迟函数中去执行。一旦我开始一个定时器，只要我定时器还在，你每次点击我都重新计时。一旦你点累了，定时器时间到，定时器重置为 `null`，就可以再次点击了。
- 对于延时执行函数来说的实现：清除定时器ID，如果是延迟调用就调用函数

### 节流

防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。

```js
/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数   
 */
_.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    // 之前的时间戳
    var previous = 0;
    // 如果 options 没传则设为空对象
    if (!options) options = {};
    // 定时器回调函数
    var later = function() {
      // 如果设置了 leading，就将 previous 设为 0
      // 用于下面函数的第一个 if 判断
      previous = options.leading === false ? 0 : _.now();
      // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      // 获得当前时间戳
      var now = _.now();
      // 首次进入前者肯定为 true
	  // 如果需要第一次不执行函数
	  // 就将上次时间戳设为当前的
      // 这样在接下来计算 remaining 的值时会大于0
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 如果当前调用已经大于上次调用时间 + wait
      // 或者用户手动调了时间
 	  // 如果设置了 trailing，只会进入这个条件
	  // 如果没有设置 leading，那么第一次会进入这个条件
	  // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
	  // 其实还是会进入的，因为定时器的延时
	  // 并不是准确的时间，很可能你设置了2秒
	  // 但是他需要2.2秒才触发，这时候就会进入这个条件
      if (remaining <= 0 || remaining > wait) {
        // 如果存在定时器就清理掉否则会调用二次回调
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // 判断是否设置了定时器和 trailing
	    // 没有的话就开启一个定时器
        // 并且不能不能同时设置 leading 和 trailing
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
```

### Event Bus

```js
class Events {
  constructor() {
    this.events = new Map();
  }

  addEvent(key, fn, isOnce, ...args) {
    const value = this.events.get(key) ? this.events.get(key) : this.events.set(key, new Map()).get(key)
    value.set(fn, (...args1) => {
        fn(...args, ...args1)
        isOnce && this.off(key, fn)
    })
  }

  on(key, fn, ...args) {
    if (!fn) {
      console.error(`没有传入回调函数`);
      return
    }
    this.addEvent(key, fn, false, ...args)
  }

  fire(key, ...args) {
    if (!this.events.get(key)) {
      console.warn(`没有 ${key} 事件`);
      return;
    }
    for (let [, cb] of this.events.get(key).entries()) {
      cb(...args);
    }
  }

  off(key, fn) {
    if (this.events.get(key)) {
      this.events.get(key).delete(fn);
    }
  }

  once(key, fn, ...args) {
    this.addEvent(key, fn, true, ...args)
  }
}
```

### instanceof

`instanceof` 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 `prototype`。

```js
function instanceof(left, right) {
    // 获得类型的原型
    let prototype = right.prototype
    // 获得对象的原型
    left = left.__proto__
    // 判断对象的类型是否等于类型的原型
    while (true) {
    	if (left === null)
    		return false
    	if (prototype === left)
    		return true
    	left = left.__proto__
    }
}
```

### call

```js
Function.prototype.myCall = function(context, ...args) {
  context = context || window
  let fn = Symbol()
  context[fn] = this
  let result = context[fn](...args)
  delete context[fn]
  return result
}
```

### apply

```js
Function.prototype.myApply = function(context) {
  context = context || window
  let fn = Symbol()
  context[fn] = this
  let result
  if (arguments[1]) {
    result = context[fn](...arguments[1])
  } else {
    result = context[fn]()
  }
  delete context[fn]
  return result
}
```

### bind

```js
Function.prototype.myBind = function (context) {
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```

### 其他

其他手写题上文已经有提及，比如模拟 `new`、ES5 实现继承、深拷贝。

另外大家可能经常能看到手写 Promise 的文章，其实根据笔者目前收集到的数百道面试题以及读者的反馈来看，压根就没人遇到这个考点，所以我们大可不必在这上面花时间。

## 最后

以上就是本篇基础的全部内容了，如果有各位读者认为重要的知识点笔者却遗漏的话，欢迎大家指出。
