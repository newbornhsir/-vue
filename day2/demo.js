/*
 * 修改响应式对象，在之前的基础上通过观察者模式实现简单的双向数据绑定
 */

function defineReactive(data, key, value) {
    let property = Object.getOwnPropertyDescriptor(data,key);
    let {get: getter, set: setter} = property;
    let dep = new Dep();
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get: function () {
            // 说明是watcher调用，因此需要添加watcher到subs中
            if (Dep.target) {
                dep.depend();
            }
            return getter ? getter.call(data) : value;
        },
        set: function (newVal) {
            let val = getter ? getter.call(data) : value;
            if (newVal !== val) {
                // 值改变，通知更新
                if (setter) {
                    setter.call(data, newVal);
                } else {
                    value = newVal;
                }
                dep.notify();
            } else {
                console.log('设置相同的值，不需要更新');
            }
        }
    });
    return dep;
}


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


class Watcher {
    /*
     * 观察者，对某一目标主体感兴趣，在目标主体发生变化的时候会update
     */
    constructor (obj, key) {
        this.obj = obj;
        this.key = key;
        this.get();
    }
    update () {
        console.log(this.get());
        console.log('update');
    }
    addDep (dep) {
        dep.addSub(this);
    }
    get () {
        Dep.target = this;
        let val = this.obj[this.key];
        Dep.target = null;
        return val;
    }
}

function observe (data) {
    let keys = Object.keys(data);
    keys.forEach(key => {
        defineReactive(data, key, data[key]);
        new Watcher(data, key);
    });
}

data = {
    test: 'name',
    age: 12
};
observe(data);