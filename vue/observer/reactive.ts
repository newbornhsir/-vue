namespace oldReactive{
  export function defineReactive(data:object, key:any) {
    // 递归....
    let value = data[key]
    Object.defineProperty(data, key, {
      get() {
        console.log('get value');
        return value
      },
      set(newValue) {
        value = newValue
      }
    })
  }
}