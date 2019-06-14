/*
 * 响应式对象实现
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
        // 定义树形之后，再次访问对象，使用新定义的get,同理set也是
        let next = obj[key];
        console.log(next);
     });
     return obj;
 }


 // test code
 let testObject = {
     name: 'test'
 };
 defineProperty(testObject);
 console.log(testObject.name);
 testObject.name = 'new Value';

 