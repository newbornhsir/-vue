import Vue from './instance'
import { VNode } from './vdom/vnode';
import { createElm } from './vdom/create-element';
import { Watcher } from './observer/watcher';

Vue.prototype.__patch__ = function (oldVNode, vnode) {
    /** FIXME:
     * 这里只判断了是否为真是元素，但是没有对非真是元素进行处理
     */
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
    /**
     * FIXME:
     * 目前不对新旧vnode进行对比,
     */
    if (!prevVnode) {
        vm.$el = vm.__patch__(vm.$el, vnode, false, false)
    } else {
        /**FIXME:直接情况 */
        vm.$el.innerHTML = '';
        vm.$el = vm.__patch__(vm.$el, vnode)
    }
}
Vue.prototype.$mount = function (el) {
    el = document.querySelector(el)
    const vm = this
    vm.$el = el
    /* TODO: beforeMount */
    const updateComponent = function () {
        const vnode = vm._render()
        console.log(vnode)
        vm._update(vnode)
    }
    /*TODO: 
     * 创建wathcer,更新数据
     */

    new Watcher(vm, updateComponent,()=>{})
    /**TODO: mounted声明周期钩子 */
    return vm
}
export default Vue