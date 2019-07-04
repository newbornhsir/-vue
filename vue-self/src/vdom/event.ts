import { VnodeInterFace } from './vnode';
export function updateEvent(vnode : VnodeInterFace ): void {
    const events = vnode.data.on || {}, vm = vnode.context
    let key : string | number
    for (key in events) {
        vnode.elm.addEventListener(key,()=>events[key].call(vm))
    }
}
