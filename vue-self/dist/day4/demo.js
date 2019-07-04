import { createElement } from './create-element';
var Vue = /** @class */ (function () {
    function Vue(options) {
        var _this = this;
        this.$options = options;
        this.$createElement = function (a, b, c, d) { return createElement(_this, a, b, c, d); };
        this._render();
    }
    Vue.prototype._render = function () {
        var render = this.$options.render;
        if (render) {
            var vnode = render.call(this, this.$createElement);
            console.log(vnode);
        }
    };
    return Vue;
}());
new Vue({
    render: function (h) {
        return h('div', {
            on: {
                click: this.change
            },
        }, [
            '先写一些文asd字',
            h('h1', '一则头条'),
        ]);
    }
});
