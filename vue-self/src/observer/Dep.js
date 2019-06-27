export class Dep {
    /*
     * 某一个主体对象，可以有多个观察者对其感兴趣，
     * 当主体发生改变的时候，可以通知相对应的观察者更新
     * 因此其有三个基本的方法，添加观察者，移除观察者，提醒更新
     */
    constructor () {
        this.subs = [];
    }
    addSub (watcher) {
        if (this.subs.indexOf(watcher) === -1) {
            // 避免重复添加
            this.subs.push(watcher);
        }
    }
    removeSub (watcher) {
        this.subs.splice(this.subs.indexOf(watcher), 1);
    }
    notify () {
        console.log(this.subs);
        this.subs.forEach(sub => sub.update());
    }
    depend () {
        /*
         * 通过target，来建立Watcher和Dep之间的联系，将watcher添加到subs数组中去
         */
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }
}

Dep.target = null;
