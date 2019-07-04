import { isDef, isObj } from '../util'
import { VnodeInterFace } from './vnode'
export function updateStyle (vnode : VnodeInterFace) {
    const style = vnode.data.style
    if (isDef(style) && isObj(style)) {
        let key : string | number
        for (key in style) {
            vnode.elm.style[key] = style[key]
        }
    }

}

