function defineReactive(data, key, value) {
    var property = Object.getOwnPropertyDescriptor(data, key);
    var getter = property.get, setter = property.set;
    var dep = new Dep();
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
            var val = getter ? getter.call(data) : value;
            if (newVal !== val) {
                // 值改变，通知更新
                if (setter) {
                    setter.call(data, newVal);
                }
                else {
                    value = newVal;
                }
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
     * 某一个主体对象，可以有多个观察者对其感兴趣，
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
var Watcher = /** @class */ (function () {
    /*
     * 观察者，对某一目标主体感兴趣，在目标主体发生变化的时候会update
     */
    function Watcher(obj, key, cb) {
        this.obj = obj;
        this.key = key;
        this.get();
        this.cb = cb;
    }
    Watcher.prototype.update = function () {
        this.cb();
    };
    Watcher.prototype.addDep = function (dep) {
        dep.addSub(this);
    };
    Watcher.prototype.get = function () {
        Dep.target = this;
        var val = this.obj[this.key];
        Dep.target = null;
        return val;
    };
    return Watcher;
}());
function observe(data) {
    var keys = Object.keys(data);
    keys.forEach(function (key) {
        defineReactive(data, key, data[key]);
    });
}
var Vue = /** @class */ (function () {
    function Vue(option) {
        var element = document.getElementById(option.el);
        this.$data = option.data();
        this.$methods = option.methods;
        observe(this.$data); // 定义响应式对象
        this.parse(element);
    }
    Vue.prototype.parse = function (element) {
        var _this_1 = this;
        var outerHtml = element.outerHTML;
        // 这里只捕获一个事件
        var eventMatch = /^<.*?v-on:([a-zA-Z]+)="\s*(\w+)\s*.*?">/;
        // 只捕获一个模版语法
        var attrMatch = /.*?{{\s*(\w+)\s*}}.*/;
        // 这里只捕获一个v-model
        var modelMatch = /^<.*?v-model="\s*(\w+)\s*.*?">/;
        //处理绑定的事件，
        var result = outerHtml.match(eventMatch);
        if (result) {
            var event_1 = result[1], handler = result[2];
            element.addEventListener(event_1, this.$methods[handler].bind(this.$data));
        }
        // 处理v-model绑定
        var modelMatched = outerHtml.match(modelMatch);
        if (modelMatched) {
            var _this_2 = this;
            var bindVal = function () {
                element.value = _this_1.$data[modelMatched[1]];
            };
            element.addEventListener('input', function (e) {
                _this_2.$data[modelMatched[1]] = e.target.value;
            });
            bindVal();
            new Watcher(this.$data, modelMatched[1], bindVal);
        }
        // 处理子节点
        var childNodes = element.childNodes;
        childNodes.forEach(function (node) {
            if (node.nodeType === 3) {
                var matched_1 = node.nodeValue.match(attrMatch);
                if (matched_1) {
                    var setValue = function () {
                        node.nodeValue = _this_1.$data[matched_1[1]];
                    };
                    setValue();
                    new Watcher(_this_1.$data, matched_1[1], setValue);
                }
            }
            else if (node.nodeType === 1) {
                // 元素
                _this_1.parse(node);
            }
        });
    };
    return Vue;
}());
var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            name: 1
        };
    },
    methods: {
        change: function () {
            this.name += 1;
        }
    }
});
