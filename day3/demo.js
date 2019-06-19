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
    constructor (obj, key, cb) {
        this.obj = obj;
        this.key = key;
        this.get();
        this.cb = cb;
    }
    update () {
        this.cb();
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
    });
}

class Vue {
    constructor (option) {
        let element = document.getElementById(option.el);
        this.$data = option.data();
        this.$methods = option.methods;
        observe(this.$data); // 定义响应式对象
        this.parse(element);
    }
    parse (element) {
        let outerHtml = element.outerHTML;
        // 这里只捕获一个事件
        let eventMatch = /^<.*?v-on:([a-zA-Z]+)="\s*(\w+)\s*.*?">/;
        // 只捕获一个模版语法
        let attrMatch = /.*?{{\s*(\w+)\s*}}.*/;
        // 这里只捕获一个v-model
        let modelMatch = /^<.*?v-model="\s*(\w+)\s*.*?">/;
        //处理绑定的事件，
        let result = outerHtml.match(eventMatch);
        if (result) {
            let event = result[1], handler = result[2];
            element.addEventListener(event, this.$methods[handler].bind(this.$data));
        }
        // 处理v-model绑定
        let modelMatched = outerHtml.match(modelMatch);
        if (modelMatched) {
            let _this = this;
            let bindVal = () => {
                element.value = this.$data[modelMatched[1]];
            };
            element.addEventListener('input', function (e) {
                _this.$data[modelMatched[1]] = e.target.value;
            });
            bindVal();
            new Watcher(this.$data, modelMatched[1], bindVal);
        }
        // 处理子节点
        let childNodes = element.childNodes;
        childNodes.forEach(node => {
            if (node.nodeType === 3) {
                let matched = node.nodeValue.match(attrMatch);
                if (matched) {
                    let setValue = () => {
                        node.nodeValue = this.$data[matched[1]];
                    };
                    setValue();
                    new Watcher(this.$data, matched[1], setValue);   
                }
            } else if (node.nodeType === 1) {
                // 元素
                this.parse(node);
            }
        });
    }
}

let vm = new Vue({
    el: '#app',
    data () {
        return {
            name: 1
        };
    },
    methods: {
        change () {
            this.name += 1;
        }
    }
});