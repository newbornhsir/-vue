import Vue from './src/index'

window.vm = new Vue({
    el: '#app',
    data: {
        name: 'hello, vue'
    },
    render (h) {
        return h(
            'div',
            {
                on: {
                    click: this.change
                },
            },
            [
                '先写一些文字',
                h('h1',undefined,undefined, '一则头条'),
                h('div', undefined,[
                    h('h2', undefined, undefined, '标题'),
                    h('p', undefined, undefined, '啊和世界各地哈健身房卡积分')
                ])
            ]
        )
    },
    methods: {
        change () {
            this.name = this.name.split('').reverse().join('')
        }
    }
})