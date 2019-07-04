/*
 * 定义响应式对象
 */
var _toString = Object.prototype.toString;
function defineReactive(data) {
    var keys = Object.keys(data);
    keys.forEach(function (key) {
        var property = Object.getOwnPropertyDescriptor(data, key);
        var getter = property.get, setter = property.set;
        var val = data[key];
        var valType = _toString.call(val).slice(8, -1).toLowerCase();
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
                var value = getter ? getter.call(data) : val;
                if (newVal !== value) {
                    console.log('设置新的值，需要更新');
                    if (setter) {
                        setter.call(data, newVal);
                    }
                    else {
                        value = newVal;
                    }
                }
                else {
                    console.log('设置相同的值，不需要更新');
                }
            }
        });
    });
}
