import { VNode, createTextVNode } from './vnode'
function isPrimitive (value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'symbol'
    )
}
function normalizeChildren (children) {
    /**
     * res存储产生的值，递归调用的都存放在这里后返回新的children
     */
    let res = []
    let i, child
    for (i = 0; i < children.length; i++) {
        child = children[i]
        if (Object.prototype.toString.call(child).slice(8, -1).toLowerCase() === 'array') {
            // children嵌套的情况
            res.push(normalizeChildren(child))
        } else if (isPrimitive(child)) {
            // child是文本节点
            res.push(createTextVNode(child))
        } else {
            /**
             * 这里children是嵌套h()写的，所以函数执行之后就是Vnode
             */
            res.push(child)
        }
    }
    return res
}
export function createElement (context, tag, data, children) {
    if (Object.prototype.toString.call(children).slice(8, -1).toLowerCase() === 'array') {
        // 处理子vnode
        children = normalizeChildren(children)
    }
    let vnode = new VNode(tag,data,children, undefined, undefined, context)
    return vnode
}