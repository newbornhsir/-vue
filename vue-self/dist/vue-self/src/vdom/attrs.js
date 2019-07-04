import { isDef, isObj } from '../util';
export function updateAttrs(vnode) {
    /**FIXME:普通的HTML属性？ */
    var attrs = vnode.data.attrs;
    if (isDef(attrs) && isObj(attrs)) {
        var key = void 0;
        for (key in attrs) {
            vnode.elm.setAttribute(key, attrs[key]);
        }
    }
}
