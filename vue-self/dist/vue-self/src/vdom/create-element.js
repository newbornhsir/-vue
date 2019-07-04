import { isDef, isArray } from '../util/index';
import { updateStyle } from './style';
import { updateAttrs } from './attrs';
import { updateEvent } from './event';
import { updateDomProps } from './domProps';
function insert(parent, elm, ref) {
    if (isDef(parent)) {
        if (isDef(ref)) {
            if (ref.parentNode === parent) {
                parent.insertBefore(elm, ref);
            }
        }
        else {
            parent.appendChild(elm);
        }
    }
}
function createChild(vnode, children, insertedVnodeQueue) {
    /**FIXME:这里存在问题 */
    // vnode存在子节点
    if (isArray(children)) {
        for (var i = 0; i < children.length; ++i) {
            createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
        }
    }
    else if (isDef(vnode.tag) && isDef(vnode.text)) {
        // vndoe不存在子节点，且vnode是元素类型，尝试插入vndoe的文本
        // 次节点无子节点
        vnode.elm.appendChild(document.createTextNode(vnode.text));
    }
}
export function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested;
    var data = vnode.data, children = vnode.children, tag = vnode.tag;
    /**FIXME:这里只对两种节点类型处理： 文本节点和元素节点 */
    if (isDef(tag)) {
        // tag是元素类型
        vnode.elm = document.createElement(tag);
    }
    else {
        // 创建文本节点
        vnode.elm = document.createTextNode(vnode.text);
    }
    // child存在，处理child
    createChild(vnode, children, insertedVnodeQueue);
    if (vnode.data) {
        /**TODO: 存在data,处理属性
         * 1. 样式绑定
         * 2. attrs
         * 3. 事件
         * 4. domProps
         */
        invokeCreateHooks(vnode);
    }
    // vnode.elm中插入子节点， 所以根结点的elm存储所有的dom结构
    insert(parentElm, vnode.elm, refElm);
}
var cbs = {
    create: []
};
// 这里是创建的时候需要的执行的函数
cbs.create = [];
cbs.create.push(updateStyle);
cbs.create.push(updateAttrs);
cbs.create.push(updateEvent);
cbs.create.push(updateDomProps);
function invokeCreateHooks(vnode) {
    for (var i = 0; i < cbs.create.length; i++) {
        cbs.create[i](vnode);
    }
}
