import { Dep } from './Dep';
var Watcher = /** @class */ (function () {
    function Watcher(vm, expOrFn, cb) {
        var _this = this;
        this.cb = cb;
        this.vm = vm;
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        }
        else {
            this.getter = function () { return _this[expOrFn]; };
        }
        this.get();
    }
    Watcher.prototype.update = function () {
        /**
         * 获取最新的值，如果有回掉函数，则执行
         */
        var val = this.get();
        if (this.cb) {
            this.cb(val);
        }
    };
    Watcher.prototype.addDep = function (dep) {
        dep.addSub(this);
    };
    Watcher.prototype.get = function () {
        Dep.target = this;
        var val = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return val;
    };
    return Watcher;
}());
export { Watcher };
