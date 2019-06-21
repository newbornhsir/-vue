## vue源码学习

![vue工作原理](./assert/132184689-57b310ea1804f_articlex.png)

### 数据劫持，实现响应式对象

### 观察者模式，实现响应式对象发生变化的时候，观察者接收到更新通知

### 简单实现双向绑定

### vnode

vue的_render方法返回vnode，
```
let render = vm.$options.render

render.call(vm, vm.$createElement)

```

