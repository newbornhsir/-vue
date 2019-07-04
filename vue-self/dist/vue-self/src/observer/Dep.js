var Dep = /** @class */ (function () {
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
         * 即位Dep.target
         */
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    };
    return Dep;
}());
export { Dep };
Dep.target = null;
