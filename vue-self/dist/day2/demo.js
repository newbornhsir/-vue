/*
 * 修改响应式对象，在之前的基础上通过观察者模式实现简单的双向数据绑定
 */
function defineReactive(data, key, value) {
    if (typeof value === 'object') {
        observe(value);
    }
    var dep = new Dep();
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get: function () {
            // 说明是watcher调用，因此需要添加watcher到subs中
            if (Dep.target) {
                dep.depend();
            }
            return value;
        },
        set: function (newVal) {
            if (newVal !== value) {
                // 值改变，通知更新
                value = newVal;
                dep.notify();
            }
            else {
                console.log('设置相同的值，不需要更新');
            }
        }
    });
    return dep;
}
var Dep = /** @class */ (function () {
    /*
     * 某一个主体对象的依赖收集器，可以有多个观察者对其感兴趣，
     * 实际上是defineReactive中data[key]抽象出来的管理类，用来处理依赖，减少耦合
     * 发布订阅的变体，data可以发布，可以订阅
     * 当主体发生改变的时候，可以通知相对应的观察者更新
     * 因此其有三个基本的方法，添加观察者，移除观察者，提醒更新
     */
    function Dep() {
        this.subs = [];
    }
    Dep.prototype.addSub = function (watcher) {
        if (this.subs.indexOf(watcher) === -1) {
            // 避免重复添加
            this.subs.push(watcher);
        }
    };
    Dep.prototype.removeSub = function (watcher) {
        this.subs.splice(this.subs.indexOf(watcher), 1);
    };
    Dep.prototype.notify = function () {
        console.log(this.subs);
        this.subs.forEach(function (sub) { return sub.update(); });
    };
    Dep.prototype.depend = function () {
        /*
         * 通过target，来建立Watcher和Dep之间的联系，将watcher添加到subs数组中去
         */
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    };
    return Dep;
}());
Dep.target = null;
function parsePath(expOrFn) {
    /**解析路径 */
    if (/[^\w.$]/.test(expOrFn)) {
        return;
    }
    var segments = expOrFn.split('.');
    return function (obj) {
        for (var i = 0; i < segments.length; i++) {
            if (!obj)
                return;
            obj = obj[segments[i]];
        }
        return obj;
    };
}
var Watcher = /** @class */ (function () {
    /*
     * 观察者，对某一目标主体感兴趣，在目标主体发生变化的时候会update
     */
    function Watcher(obj, expOrFn, cb) {
        /** expOrFn: a.b.c或者函数的情况 */
        this.obj = obj;
        this.getter = parsePath(expOrFn);
        this.get();
        this.cb = cb;
    }
    Watcher.prototype.update = function () {
        if (this.cb)
            this.cb.call(this.obj, this.obj);
    };
    Watcher.prototype.addDep = function (dep) {
        dep.addSub(this);
    };
    Watcher.prototype.get = function () {
        Dep.target = this;
        var val = this.getter.call(this.obj, this.obj);
        Dep.target = null;
        return val;
    };
    return Watcher;
}());
/** 数组代理，处理其它的操作 */
var arrayMethod = Object.create(Array.prototype);
var hasProto = '__proto__' in {};
var arrayKeys = Object.getOwnPropertyNames(arrayMethod);
function protoAugment(target, src) {
    target.__proto__ = src;
}
function copyAugment(target, src, keys) {
    /**直接将属性定义在数组上 */
    for (var i = 0; i < keys.length; i++) {
        Object.defineProperty(target, keys[i], src[keys[i]]);
    }
}
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
    var original = Array.prototype[method];
    Object.defineProperty(arrayMethod, method, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var res = original.apply(this, args);
            /**
             * FIXME:
             * 执行过代理方法之后，需要重新设置响应式对象，
             * 这里设置重复了，
             */
            observe(this);
            return res;
        }
    });
});
/** 函数递归的将对象所有的属性定义成响应式 */
function observe(data) {
    var keys = Object.keys(data);
    /**处理值为数组的情况 */
    if (Array.isArray(data)) {
        // 检测是否支持__proto__
        var augment = hasProto ? protoAugment : copyAugment;
        augment(data, arrayMethod, arrayKeys);
    }
    keys.forEach(function (key) {
        defineReactive(data, key, data[key]);
        new Watcher(data, key, function () {
            console.log(key + '==> update');
        });
    });
}
data = {
    test: 'name',
    age: 12,
    a: [1, 2]
};
observe(data);
