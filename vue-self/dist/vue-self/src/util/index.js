export function isArray(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'array';
}
export function isPrimitive(value) {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'symbol');
}
export function isObj(value) {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'object';
}
export function isDef(val) {
    return val !== undefined && val !== null;
}
