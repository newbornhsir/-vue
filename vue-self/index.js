import Vue from './src/instance/index'

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
            ]
        )
    },
    methods: {
        change () {
            this.name = this.name.split('').reverse().join('')
        }
    }
})