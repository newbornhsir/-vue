/* jshint esversion: 6 */ 
/*
 * 响应式对象实现原理
 */
 function defineProperty(obj) {
     let keys = Object.keys(obj);
     keys.forEach(key => {
         // 定义属性之前访问使用默认的get
        let previous = obj[key];
        console.log(previous);
        Object.defineProperty(obj,key,{
            configurable: false,
            enumerable: true,
            get () {
                return `get ${key}`;
            },
            set (val) {
                console.log(val)
            }
        });
        // 定义属性之后，再次访问对象，使用新定义的get,同理set也是
        /*
         * 定义的属性才是响应式的，之后添加的都不是，对于数组来说，通过索引实现监听的，再通过索引获取和修改的时候可以监听
         * 到变动，通过push等不能， 因此vue实现了数组的变异方法
         */
        let next = obj[key];
        console.log(next);
     });
     return obj;
 }


 // test code
 let testObject = {
     name: 'test'
 };
 /*
 defineProperty(testObject);
 console.log(testObject.name);
 testObject.name = 'new Value';
 */

 
 // 复杂对象需要递归定义属性
let _toString = Object.prototype.toString
function defineReactive(data) {
    let keys = Object.keys(data);
    keys.forEach(key => {
        let val = data[key];
        let valType = _toString.call(val).slice(8, -1).toLowerCase();
        if (['object', 'array'].indexOf(valType) > -1) {
            console.log(val);
            defineReactive(val);
        }
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get: function () {
                console.log('get');
                return val;
            },
            set: function (newVal) {
                if (newVal !== val) {
                    console.log('设置新的值，需要更新');
                    val = newVal;
                } else {
                    console.log('设置相同的值，不需要更新');
                }
            }
        })
    });
}

testObject = {
    name: 's',
    info: {
        sex: 'girl',
        description: 'obj'
    },
    a: [1]
};
defineReactive(testObject);