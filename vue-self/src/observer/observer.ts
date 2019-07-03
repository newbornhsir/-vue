import { isArray } from '../util'
import { Dep } from './Dep'

export class Observer {
    constructor (data) {
        if (isArray(data)) {
            proxyArray(data)
            this.walkArray(data)
        } else {
            this.walk(data)
        }
    }
    walk(data) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key])
        })
    }
    walkArray (data) {
        let i = 0
        for (i; i< data.length; i++) {
            observe(data[i])
        }
    }
}


function defineReactive(data, key, value) {
    let dep = new Dep();
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get: function () {
            // 说明是watcher调用，因此需要添加watcher到subs中
            if (Dep.target) {
                dep.depend();
            }
            return value
        },
        set: function (newVal) {
            if (newVal !== value) {
                // 值改变，通知更新
                value = newVal
                dep.notify();
            } else {
                console.log('设置相同的值，不需要更新');
            }
        }
    });
    return dep;
}

const arrayMethod = Object.create(Array.prototype)
const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
const arrayKeysLength = methods.length
methods.forEach(method => {
    const original = Array.prototype[method]
    Object.defineProperty(arrayMethod,method, {
        enumerable: false,
        configurable: true,
        writable: true,
        value (...args) {
            let res = original.apply(this, args)
            /**
             * FIXME:
             * 执行过代理方法之后，需要重新设置响应式对象， 
             * 这里设置重复了， 
             */
            observe(this)
            return res
        }
    })
})
// 这样只需要定义一次
const hasProto = '__proto__' in {}
function proxyArray (arr) {
    if (hasProto) {
        arr.__proto__ = arrayMethod
    } else {
        for (let i = 0; i < arrayKeysLength; i++) {
            Object.defineProperty(arr, arrayKeysLength[i], arrayMethod[arrayKeysLength[i]])
        }
    }
}
export function observe (data) {
    let ob = new Observer(data)
    return ob
}