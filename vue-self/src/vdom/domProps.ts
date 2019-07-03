import { Watcher } from '../observer/watcher';

export function updateDomProps (vnode) {
    /** 假设为value, innerHTML */
    /**FIXME:
     * 什么时候添加观察者
     */
    const props = vnode.data.domProps || {}, elm = vnode.elm, vm = vnode.context
    let key
    for (key in props) {
        elm[key] = props[key]
    }
}