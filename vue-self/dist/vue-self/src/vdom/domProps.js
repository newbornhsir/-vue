export function updateDomProps(vnode) {
    /** 假设为value, innerHTML */
    /**FIXME:
     * 什么时候添加观察者
     */
    var props = vnode.data.domProps || {}, elm = vnode.elm, vm = vnode.context;
    var key;
    for (key in props) {
        elm[key] = props[key];
    }
}
