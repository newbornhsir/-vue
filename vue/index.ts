import {VNode, createVNode, createElm, createText} from './vnode'
interface renderConfig {
  (a):VNode
}
interface OptionConfig {
  render(h):renderConfig
}

function createElmFromVNode(vnode:VNode, parentElm?:HTMLElement):HTMLElement|Text {
  const elm = vnode.tag ? createElm(vnode) : createText(vnode.text);
  if (parentElm) {
    parentElm.appendChild(elm)
  }
  if (vnode.children){
    vnode.children.forEach(c=>createElmFromVNode(c,(elm as HTMLElement)))
  }
  return elm
}


class Vue {
  $options : OptionConfig

  constructor (option) {
    this.$options = option
    this.mountComponent()
  }

  _render () {

  }

  mountComponent () {
    const {render} = this.$options
    // render函数生成vnode
    const vnode = render.call(this, createVNode)
    console.log(vnode)
    // vnode生成elm
    const elm = createElmFromVNode(vnode)
    console.log(elm)
    document.body.appendChild(elm)
  }
}

const vm = new Vue({
  render (h) {
    return h(
      'div',
      {},
      [
        'first text node',
        h('div',{},['second div']),
        h('span',{},['third span'])
      ]
    )
  }
})