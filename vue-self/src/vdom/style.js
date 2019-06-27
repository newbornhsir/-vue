import { isDef, isObj } from '../util'

export function updateStyle (vnode) {
    const style = vnode.data.style
    if (isDef(style) && isObj(style)) {
        let key
        for (key in style) {
            vnode.elm.style[key] = style[key]
        }
    }

}

