export function updateEvent(vnode) {
    const events = vnode.data.on || {}, vm = vnode.context
    let key
    for (key in events) {
        vnode.elm.addEventListener(key,()=>events[key].call(vm))
    }
}
