import {createElement} from './vnode/create-element'

export function initRender(vm) {
  vm._createElement = (a,b,c)=>createElement(a,b,c)
  vm.$createElement = (a,b,c)=>createElement(a,b,c)
}