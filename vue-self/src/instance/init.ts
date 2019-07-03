import { observe } from '../observer/observer'
import { createElement } from '../vdom/create-vnode'
export function initMixin(Vue) {
    Vue.prototype.__init = function (options) {
        let vm = this
        // FIXME:合并options，这里只是简单处理,其它情况原样返回，只有data为函数的时候返回函数执行后的结果
        vm.$options = mergeOptios({}, options, vm)
        /* TODO: 初始化生命周期钩子 */
        /* FIXME: 初始化事件 */
        vm._event = {}
        /* TODO: 初始化render */
        {
            vm._renderProxy = vm
            vm._c = (a,b,c,d) => createElement(vm, a,b,c,d, false)
            vm.$createElemet = (a,b,c,d) => createElement(vm, a, b, c, d, true)
        }
        /* 调用声明周期钩子beforeCreate */
        /**
         * TODO:
         * 注入
         * 初始化State
         * 初始化state
         * provider
         * 调用created
         */
        {
            // 这里对状态进行简单处理
            vm._watcher = []
            let opts = vm.$options
            // 实现vm.a形式访问方法
            if (opts.methods) {
                for (const key in opts.methods) {
                    vm[key] = typeof opts.methods[key] !== 'function' ? () => {} : opts.methods[key].bind(vm)
                }
            }
            // 代理，实现wm.a的形式访问data属性
            if (opts.data) {
                let keys = Object.keys(opts.data)
                vm._data = opts.data
                let i = keys.length
                while (i--) {
                    const key = keys[i]
                    proxy(vm, '_data', key)
                }
                /**
                 * FIXME:
                 * 数据劫持，数据变为响应式，此时并没有watcher监听dep
                 */
                observe(opts.data, true)
            }
        }
        /**
         * TODO:
         * 此处挂载， 执行另外的任务
         */
        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    }
}

function proxy(target, sourceKey, key) {
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get () {
            return target[sourceKey][key]
        },
        set (val) {
            target[sourceKey][key] = val
        }
    })
}

function extend (to, from) {
    for (const key in from) {
        to[key] = from[key]
    }
    return to
}
const starts = {
    el (parentVal, childVal) {
        return childVal
    },
    data (parentVal, childVal, vm) {
        let instatce = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal
        return instatce
    },
    methods (parentVal, childVal) {
        let ret = Object.create(null)
        extend(ret, childVal)
        return ret
    }
}
const defaultStart = function (parent, child) {
    return child === undefined ? parent : child
}

function mergeOptios (parent, child, vm) {
    const options = {}
    let key
    function mergeField (key) {
        const start = starts[key] || defaultStart
        options[key] = start(parent[key], child[key], vm, key)
    }
    for (key in parent) {
        mergeField(key)
    }
    for (key in child) {
        if (!parent.hasOwnProperty(key)) {
            mergeField(key)
        }
    }
    return options
}