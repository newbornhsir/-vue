/*
 * 定义响应式对象
 */
let _toString = Object.prototype.toString;
function defineReactive(data) {
    let keys = Object.keys(data);
    keys.forEach(key => {
        let property = Object.getOwnPropertyDescriptor(data,key);
        let {get: getter, set: setter} = property;
        let val = data[key];
        let valType = _toString.call(val).slice(8, -1).toLowerCase();
        if (['object', 'array'].indexOf(valType) > -1) {
            defineReactive(val);
        }
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get: function () {
                console.log('get');
                return getter ? getter.call(data) : val;
            },
            set: function (newVal) {
                let value = getter ? getter.call(data) : val;
                if (newVal !== value) {
                    console.log('设置新的值，需要更新');
                    if (setter) {
                        setter.call(data, newVal);
                    } else {
                        value = newVal;
                    }
                } else {
                    console.log('设置相同的值，不需要更新');
                }
            }
        });
    });
}
