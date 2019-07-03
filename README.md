## vue源码学习

![vue工作原理](./assert/132184689-57b310ea1804f_articlex.png)

### 数据劫持，实现响应式对象

vue通过Object.defineProperty实现数据劫持，监听数据变动

### 观察者模式，实现响应式对象发生变化的时候，观察者接收到更新通知

1. 收集依赖的时机： get的时候
2. 数组的响应式处理
- defineProperty只能定义已经存在的属性，所以vm.a=1之类实例化之后添加的属性不是响应式
- 数组的splice,sort,reverse,pop,push,shif,unshift通过代理数组的方法，来实现响应式
- 代理有两种方式，第一种__proto__,第二种直接在数组对象上定义代理的方法属性

```
const arrayMethod = Object.create(Array.prototype);
const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethod)
function protoAugment (target, src) {
    target.__proto__ = src
}
function copyAugment (target, src, keys) {
    /**直接将属性定义在数组上 */
    for (let i = 0; i < keys.length; i++) {
        Object.defineProperty(target, keys[i], src[keys[i]])
    }
}
```
### vnode到dom元素
vnode是描述dom节点的对象

createElement函数创建vnode => 递归处理vnode，为vnode创建$elm属性，并添加到上级vnode的$elm属性中 => 处理data,与elm绑定 => 最顶级的$app中添加了所有的elm，呈现在页面上，这是最有一步，所以只操作一次dom对象


### 添加ts支持
1. 安装 typescript ts-loader依赖
2. 配置module
3. 配置tsconfig.json



