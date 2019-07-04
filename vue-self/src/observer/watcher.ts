import { Dep } from './Dep'

export class Watcher {
    cb : any;
    vm: object;
    getter: any;
    constructor (vm, expOrFn, cb) {
        this.cb = cb
        this.vm = vm
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else {
            this.getter = () => this[expOrFn]
        }
    
        this.get()
    }
    update () {
        /**
         * 获取最新的值，如果有回掉函数，则执行
         */
        let val = this.get()
        if (this.cb) {
            this.cb(val)
        }
    }
    addDep (dep) {
        dep.addSub(this)
    }
    get () {
        Dep.target = this
        let val = this.getter.call(this.vm, this.vm)
        Dep.target = null
        return val
    }
}