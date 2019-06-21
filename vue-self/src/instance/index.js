import { initMixin } from './init'
import { renderMixin } from './render'
import { VNode } from '../vdom/vnode';
import { createElement } from '../elemet';
import { isArray, isDef } from '../util';
function Vue (options) {
    this.__init(options)
}
initMixin(Vue)
/**
 * TODO:
 * 省略stateMixin,eventsMixin,lifecycleMixin
 */
renderMixin(Vue)
function insert(parent, elm, ref) {
    if (isDef(parent)) {
        if (isDef(ref)) {
            if (ref.parentNode === parent) {
                parent.insertBefore(elm, ref)
            }
        }else {
            parent.appendChild(elm)
        }
    }
}
function createChild (vnode, children, insertedVnodeQueue) {
    /**FIXME:这里存在问题 */
    // vnode存在子节点
    if (isArray(children)) {
        for (let i = 0; i < children.length; ++i) {
            createElm(children[i], insertedVnodeQueue, vnode.elm, null, true)
        }
    } else if(isDef(vnode.tag) && isDef(vnode.text)) {
        // vndoe不存在子节点，且vnode是元素类型，尝试插入vndoe的文本
        // 次节点无子节点
        vnode.elm.appendChild(document.createTextNode(vnode.text))
    }
}

function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested
    const {data, children, tag} = vnode
    /**FIXME:这里只对两种节点类型处理： 文本节点和元素节点 */
    if (isDef(tag)) {
        // tag是元素类型
        vnode.elm = document.createElement(tag)
    } else {
        // 创建文本节点
        vnode.elm = document.createTextNode(vnode.text)
    }
    // child存在，处理child
    createChild(vnode, children, insertedVnodeQueue)
    // 处理data invokeCreateHooks(vnode, insertedVnodeQueue)
    // vnode.elm中插入子节点， 所以根结点的elm存储所有的dom结构
    insert(parentElm, vnode.elm, refElm)
}
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