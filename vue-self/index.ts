import Vue from './src/index'

new Vue({
    el: '#app',
    data: {
        name: 'hello, vue',
        arr: [1, 2, 3]
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
                h('h1',{
                    style: {
                        color: 'red',
                        fontSize: '48px'
                    },
                    attrs: {
                        id: 'test'
                    },
                    on: {
                        click: this.alert
                    }
                },undefined, '一则头条'),
                h('div', undefined,[
                    h('h2', {
                        domProps: {
                            innerHTML: this.name
                        },
                        attrs: {
                            class: 'h2'
                        }
                    }, undefined),
                    h('p', undefined, undefined, '啊和世界各地哈健身房卡积分')
                ])
            ]
        )
    },
    methods: {
        change () {
            this.name = this.name.split('').reverse().join('')
        },
        alert () {
            window.alert(11)
        }
    }
})