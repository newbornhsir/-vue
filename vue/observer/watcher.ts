import {Dep} from './dep'

// watcher的标识符
let uid = 0

export class Watcher {
  // 和dep一样， 保存数组，可以建立多对多的关系
  deps:Array<Dep>
  id:number
  vm: any
  getter : any
  value : any
  constructor(vm, fn){
    this.id = uid++
    this.deps = []
    this.getter = fn
    this.vm = vm
    this.value = this.get()
  }

  addDep (dep:Dep) {
    if (!this.deps.includes(dep)){
      this.deps.push(dep)
      dep.addSub(this)
    }
  }

  update () {
    console.log('update')
    this.value = this.get()
  }

  get () {
    Dep.target = this
    const newValue = this.getter.call(this.vm)
    Dep.target = null
    return newValue
  }

}