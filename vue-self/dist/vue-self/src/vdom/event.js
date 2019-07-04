export function updateEvent(vnode) {
    var events = vnode.data.on || {}, vm = vnode.context;
    var key;
    for (key in events) {
        vnode.elm.addEventListener(key, function () { return events[key].call(vm); });
    }
}
