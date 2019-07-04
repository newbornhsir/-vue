import { isDef, isObj } from '../util';
export function updateStyle(vnode) {
    var style = vnode.data.style;
    if (isDef(style) && isObj(style)) {
        var key = void 0;
        for (key in style) {
            vnode.elm.style[key] = style[key];
        }
    }
}
