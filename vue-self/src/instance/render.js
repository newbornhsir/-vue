function installRenderHelpers (target) {
    target._o = () =>{}
}

export function renderMixin (Vue) {
    // 在vue原型上添加渲染方法
    installRenderHelpers(Vue.prototype)
    Vue.prototype._render = function () {
        const vm = this, {render} = this.$options
        let vnode
        vnode = render.call(vm, vm.$createElemet)
        return vnode
    }
}