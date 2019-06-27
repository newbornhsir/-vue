import { Dep } from './Dep'

export class Watcher {
    constructor (vm, expOrFn, cb) {
        this.cb = cb
        this.vm = vm
        this.getter = expOrFn
        this.get()
    }
    update () {
        this.cb()
    }
    addDep (dep) {
        dep.addSub(this)
    }
    get () {
        Dep.target = this
        let val = this.vm[this.getter]
        Dep.target = null
        return val
    }
}