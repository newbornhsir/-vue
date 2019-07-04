/**
 * render.call(vm, vm.$createElement)的时候创建vnode
 */
import { VNode, createTextVNode } from './vnode';
import { isPrimitive, isArray } from '../util';
function normalizeChildren(children) {
    /**
     * res存储产生的值，递归调用的都存放在这里后返回新的children
     */
    var res = [];
    var i, child;
    // FIXME: 这里只处理两种类型vnode, text,和element类型
    for (i = 0; i < children.length; i++) {
        child = children[i];
        if (Object.prototype.toString.call(child).slice(8, -1).toLowerCase() === 'array') {
            // children嵌套的情况
            res.push(normalizeChildren(child));
        }
        else if (isPrimitive(child)) {
            // child是文本节点
            res.push(createTextVNode(child));
        }
        else {
            /**
             * 这里children是嵌套h()写的，所以函数执行之后就是Vnode
             */
            res.push(child);
        }
    }
    return res;
}
export function createElement(context, tag, data, children, text, bool) {
    /**
     * TODO:
     * 创建vnode需要传递四个参数，但是在vue中最少可以传递1个
     * 此处没处理，所以需要按照vnode所需要的顺序传递参数
     */
    if (isArray(children)) {
        // 处理子vnode
        children = normalizeChildren(children);
    }
    var vnode = new VNode(tag, data, children, text, undefined, context);
    return vnode;
}
