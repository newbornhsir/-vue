function installRenderHelpers(target) {
    target._o = function () { };
}
export function renderMixin(Vue) {
    // 在vue原型上添加渲染方法
    installRenderHelpers(Vue.prototype);
    Vue.prototype._render = function () {
        var vm = this, render = this.$options.render;
        var vnode;
        vnode = render.call(vm, vm.$createElemet);
        return vnode;
    };
}
