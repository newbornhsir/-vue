import {VNode, createVNode, createElm, createText} from './vnode/vnode'
import {Watcher} from './observer/watcher'
import {initState} from './state'
import {initRender} from './render'
interface renderConfig {
  (a):VNode
}
interface OptionConfig {
  render(h):renderConfig,
  data ?: any
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


export default class Vue {
  $options : OptionConfig
  _data: any
  [propsName: string]: any

  constructor (option) {
    const vm = this
    this.$options = option
    // initLifecycle(vm)
    // initEvents(vm)
    initRender(vm)
    // callHook(vm, 'beforeCreate')
    initState(vm)
    //
    const updateComponent = () => {
      this.mountComponent()
      console.log('mount element')
    }
    new Watcher(this, updateComponent)
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
    document.body.innerHTML = ''
    document.body.appendChild(elm)
  }
}

const vm = new Vue({
  data: {
    child: [1,2,3,4]
  },
  render (h) {
    console.log(this)
    const child = this.child.map(item=>{
      // TODO: 这里判断不严谨，所以使用隐式转换转换成字符串
      console.log(item)
      return h('div', {}, [item + ''])
    })
    return h(
      'div',
      {},
      [
        'first text node',
        ...child
      ]
    )
  }
})

let count = 10
while (count > 0) {
  (function (c) {
    setTimeout(()=>vm.child.push(c),c*1000)
  })(count)
  count--
}
