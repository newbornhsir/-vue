export class VNode {
  tag : string | undefined
  data ?: object
  children : Array<VNode>
  elm: HTMLElement | Text
  text ?: string
  constructor(tag, data, children, text?:string) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
  }
}

export function createElm (vnode:VNode):HTMLElement {
  const {tag} = vnode;
  const elm = document.createElement(tag)
  return elm
}

export function createText (text:string):Text {
  return document.createTextNode(text)
}

export function createVNode(tag?:string,data?:object,children?:Array<any>):VNode {
  let childrenFinal = children.map(item=>{
    if (typeof item === 'string'){
      return new VNode(undefined, undefined, undefined, item)
    }
    return item
  })
  return new VNode(tag, data, childrenFinal)
}