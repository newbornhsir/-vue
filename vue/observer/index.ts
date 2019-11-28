import {Dep} from './dep'
// class Observer {
//   value:any
//   constructor(value) {
//     this.value = value
//     this.walk()
//   }

//   walk () {
//     Object.keys(this.value).forEach(key=>{
//       const item = this.value[key]
//       if (typeof item === 'object' && item !== null) {
//         observe(item)
//       }
//     })
//     observe(this.value)
//   }
// }


export function defineReactive(obj) {
  const dep = new Dep()
  obj.__ob__ = true
  // 通过proxy简单实现响应式
  return new Proxy(obj,{
    get (target, key, receiver) {
      console.log('get')
      if (Dep.target) {
        console.log('have watcher')
        dep.depend()
      }
      return Reflect.get(target, key, receiver)
    },
    set (target, key, value, reciver) {
      if (!(key in target)) {
        if (typeof value === 'object') {
          value = defineReactive(value)
        }
      }
      const result = Reflect.set(target, key, value, reciver)
      console.log('set')
      dep.notify()
      return result
    }
  })
}

export function observe(params:any) {
  Object.keys(params).forEach(key=>{
    const item = params[key]
    if (typeof item === 'object' && item !== null) {
      if (!item.__ob__) {
        params[key] = defineReactive(item)
      }
    }
  })
  if (params.__ob__) return params
  return defineReactive(params)
}