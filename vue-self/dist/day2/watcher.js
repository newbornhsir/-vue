var Dep = /** @class */ (function () {
    /*
     * 某一个主体对象，可以有多个观察者对其感兴趣，
     * 当主体发生改变的时候，可以通知相对应的观察者更新
     * 因此其有三个基本的方法，添加观察者，移除观察者，提醒更新
     */
    function Dep() {
        this.subs = [];
    }
    Dep.prototype.addSub = function (watcher) {
        this.subs.push(watcher);
    };
    Dep.prototype.removeSub = function (watcher) {
        this.subs.splice(this.subs.indexOf(watcher), 1);
    };
    Dep.prototype.notify = function () {
        var _this = this;
        // 传入参数this, 提供给观察者获取对象主体信息的接口
        this.subs.forEach(function (sub) { return sub.update(_this); });
    };
    return Dep;
}());
var Observer = /** @class */ (function () {
    /*
     * 观察者，对某一目标主体感兴趣，在目标主体发生变化的时候会update
     */
    function Observer() {
    }
    Observer.prototype.update = function (dep) {
        console.log(dep);
        console.log('update');
    };
    return Observer;
}());
var d = new Dep(), o = new Observer();
d.addSub(o);
d.notify();
