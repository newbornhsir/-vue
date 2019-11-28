import {observe} from './observer/index'
export function initState(vm) {
  let data = vm._data = observe(vm.$options.data)
  const keys = Object.keys(data)
  keys.forEach(key => {
    Object.defineProperty(vm, key, {
      enumerable: true,
      configurable: true,
      get () {
        return this._data[key]
      },
      set (value) {
        this._data[key] = value
      }
    })
  })
}