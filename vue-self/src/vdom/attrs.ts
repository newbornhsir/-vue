import { isDef, isObj } from '../util'

export function updateAttrs (vnode) {
    /**FIXME:普通的HTML属性？ */
    const attrs = vnode.data.attrs
    if (isDef(attrs) && isObj(attrs)) {
        let key
        for (key in attrs) {
            vnode.elm.setAttribute(key, attrs[key])
        }
    }

}

