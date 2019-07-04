import { isArray } from '../util';
import { Dep } from './Dep';
var Observer = /** @class */ (function () {
    function Observer(data) {
        if (isArray(data)) {
            proxyArray(data);
            this.walkArray(data);
        }
        else {
            this.walk(data);
        }
    }
    Observer.prototype.walk = function (data) {
        Object.keys(data).forEach(function (key) {
            defineReactive(data, key, data[key]);
        });
    };
    Observer.prototype.walkArray = function (data) {
        var i = 0;
        for (i; i < data.length; i++) {
            observe(data[i]);
        }
    };
    return Observer;
}());
export { Observer };
function defineReactive(data, key, value) {
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
var arrayMethod = Object.create(Array.prototype);
var methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
var arrayKeysLength = methods.length;
methods.forEach(function (method) {
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
// 这样只需要定义一次
var hasProto = '__proto__' in {};
function proxyArray(arr) {
    if (hasProto) {
        arr.__proto__ = arrayMethod;
    }
    else {
        for (var i = 0; i < arrayKeysLength; i++) {
            Object.defineProperty(arr, arrayKeysLength[i], arrayMethod[arrayKeysLength[i]]);
        }
    }
}
export function observe(data) {
    var ob = new Observer(data);
    return ob;
}
