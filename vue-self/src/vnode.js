export class VNode {
    constructor (tag, data, children, text, elm, context) {
        this.tag = tag
        this.data = data
        this.text = text
        this.children = children
        this.elm = elm
        this.context = context
        this.parent = undefined
        this.ns = undefined
        this.isRootInsert = true
    }
}

export function createTextVNode (text) {
    return new VNode(undefined, undefined, undefined, String(text))
}