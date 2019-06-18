class Dep {
    /*
     * 某一个主体对象，可以有多个观察者对其感兴趣，
     * 当主体发生改变的时候，可以通知相对应的观察者更新
     * 因此其有三个基本的方法，添加观察者，移除观察者，提醒更新
     */
    constructor () {
        this.subs = [];
    }
    addSub (watcher) {
        this.subs.push(watcher);
    }
    removeSub (watcher) {
        this.subs.splice(this.subs.indexOf(watcher), 1);
    }
    notify () {
        // 传入参数this, 提供给观察者获取对象主体信息的接口
        this.subs.forEach(sub => sub.update(this));
    }
}


class Observer {
    /*
     * 观察者，对某一目标主体感兴趣，在目标主体发生变化的时候会update
     */
    constructor () {

    }
    update (dep) {
        console.log(dep);
        console.log('update');
    }
}

let d = new Dep(), o = new Observer();
d.addSub(o);
d.notify();