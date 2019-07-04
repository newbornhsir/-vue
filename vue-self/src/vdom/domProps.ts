import { VnodeInterFace } from './vnode';
export function updateDomProps (vnode : VnodeInterFace) {
    /** 假设为value, innerHTML */
    /**FIXME:
     * 什么时候添加观察者
     */
    const props = vnode.data.domProps || {}, elm = vnode.elm, vm = vnode.context
    let key : string | number
    for (key in props) {
        elm[key] = props[key]
    }
}