# vue实例化过程中数据的处理

## 合并option

## method

在vm实例上创建methods中的同名方法，并且判断是否支持函数的`function.prototype.bind`方法，支持则使用此函数绑定methods中方法的执行上下文，否则使用`call`来实现。

## data

获取data对象，在vm实例上定义同名属性

```js
let data = vm._data = vm.$options.data
Object.keys(data).forEach(key=>{
  Object.defineProperty(vm, key, {
    enumerable: true,
    configurable: true,
    get(){
      return this._data[key]
    },
    set (value) {
      this._data[key] = value
    }
  })
})
observe(data, true)
```
