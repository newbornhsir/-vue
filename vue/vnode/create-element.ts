import {VNode} from './vnode'

export function createElement(tag?:string,data?:object,children?:Array<any>):VNode {
  let childrenFinal = children.map(item=>{
    if (typeof item === 'string'){
      return new VNode(undefined, undefined, undefined, item)
    }
    return item
  })
  return new VNode(tag, data, childrenFinal)
}