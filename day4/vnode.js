/**
 * vnode, 虚拟dom，用来描述dom节点，最后转换为真是dom
 */

// 从vue源码抽离出基本的vnode需要的相关信息
export class VNode {
    constructor (tag, data, children, text, elm) {
        this.tag = tag // 标签名称
        this.data = data // 对应dom元素的相关数据，如style,事件等
        this.children = children
        this.text = text
        this.elm = elm // 对应真实的dom元素
        this.parent = undefined // 父vnode
        this.isComment = false // 注释vnode
    }
}

/**
 * 以下只是对创建vnode的简化
 * @param {String || number} text 
 * @return {Object} vnode
 */

export function createEmptyVNode (text='') {
    const node = new VNode()
    node.text = String(text)
    node.isComment = true
    return node
}

export function createTextVNode(text) {
    const node = new VNode()
    node.text = String(text)
    return node
}

