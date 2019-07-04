function CreateVnode(ctor, tag, data, children, text, elm, context) {
    return new ctor(tag, data, children, text, elm, context);
}
var VNode = /** @class */ (function () {
    function VNode(tag, data, children, text, elm, context) {
        this.tag = tag;
        this.data = data;
        this.text = text;
        this.children = children;
        this.elm = elm;
        this.context = context;
        this.parent = undefined;
        this.ns = undefined;
        this.isRootInsert = true;
    }
    VNode.prototype.say = function () {
        console.log(this.tag || 'empty tag');
    };
    return VNode;
}());
export { VNode };
export function createTextVNode(text) {
    /**
     * FIXME:
     * null,和undefiend是所有类型的子类型，所以可以赋值给所有类型的变量
     * 除非开启strictNullCHecks
     */
    var textVnode = CreateVnode(VNode, undefined, undefined, undefined, String(text));
    return textVnode;
}
