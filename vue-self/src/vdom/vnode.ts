/**TODO:
 * 类接口:
 * 类接口检查类的实例部分，
 * constructor属于类的静态部分
 */
// 检查类静态部分构造函数的参数
interface VnodeConstructor {
    new (tag : any, data : any, children : any, text : any, elm ?:object, context ?: object)
}
interface DomAttrs {
    [propName:string] : any;
    [propName:number] : any;
}
// 检查类实例部分
export interface VnodeInterFace {
    tag: string;
    data: any;
    text: string;
    children: Array<any>;
    elm: DomAttrs;
    context: object;
    parent: undefined | object;
    ns: undefined;
    isRootInsert: boolean;
}
function CreateVnode(
    ctor : VnodeConstructor, 
    tag : null, 
    data : any, 
    children : any, 
    text : any, 
    elm ?: object, 
    context ?: object
) :VnodeInterFace {
    return new ctor(tag, data, children, text, elm, context)
}
export class VNode implements VnodeInterFace {
    /**FIXME: 
     * 类中类型的定义在这里？ 
     */
    tag: string;
    data: object;
    text: string;
    children: Array<any>;
    elm: object;
    context: object;
    parent: undefined | object;
    ns: undefined;
    isRootInsert: boolean;
    constructor (tag, data, children, text, elm ?:object, context ?: object) {
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
    say () {
        console.log(this.tag||'empty tag');
    }
}


export function createTextVNode (text : string | number) {
    /**
     * FIXME:
     * null,和undefiend是所有类型的子类型，所以可以赋值给所有类型的变量
     * 除非开启strictNullCHecks
     */
    let textVnode = CreateVnode(VNode, undefined, undefined, undefined, String(text))
    return textVnode
}
