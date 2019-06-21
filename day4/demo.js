import { createElement } from './create-element'
class Vue {
    constructor (options) {
        this.$options = options
        this.$createElement = (a,b,c,d) => createElement(this, a, b, c, d)
        this._render()
    }
    _render () {
        const render = this.$options.render
        if (render) {
            const vnode = render.call(this,this.$createElement)
            console.log(vnode)
        }
    }
}

new Vue({
    render (h) {
        return h(
            'div',
            {
                on: {
                    click: this.change
                },
            },
            [
                '先写一些文asd字',
                h('h1', '一则头条'),
            ]
        )
    }
})