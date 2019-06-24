import Vue from './instance'
import { VNode } from './vdom/vnode';
import { createElm } from './vdom/create-element';

Vue.prototype.__patch__ = function (oldVNode, vnode) {
    /** 判断oldVnoe */
    let isRealElement = !!oldVNode.nodeType
    const insertedVnodeQueue = []
    if (isRealElement) {
        /**
         * 第一次的时候，vnode是真是的dom元素，所以需要创建一个vnode来替换
         */
        oldVNode = new VNode(oldVNode.tagName.toLowerCase(), {}, [], undefined, oldVNode)
        const oldElm = oldVNode.elm
        const parentElm = oldElm.parentNode
        createElm(vnode, insertedVnodeQueue,parentElm,oldElm.nextSibling)
    }
    console.log(vnode.elm)
    return vnode.elm
}
Vue.prototype._update = function (vnode) {
    const vm = this
    const prevVnode = vm._vnode
    vm._vnode = vnode
    if (!prevVnode) {
        vm.$el = vm.__patch__(vm.$el, vnode, false, false)
    } else {
        vm.$el = vm.__patch__(prevVnode, vnode)
    }
}
Vue.prototype.$mount = function (el) {
    el = document.querySelector(el)
    const vm = this
    vm.$el = el
    /* TODO: beforeMount */
    const updateComponent = function () {
        vm._update(vm._render())
    }
    /*TODO: watcher */
    updateComponent.call(vm,vm)
    /**TODO: mounted声明周期钩子 */
    return vm
}
export default Vue