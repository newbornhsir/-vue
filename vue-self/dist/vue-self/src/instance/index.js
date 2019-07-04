import { initMixin } from './init';
import { renderMixin } from './render';
function Vue(options) {
    this.__init(options);
}
initMixin(Vue);
/**
 * TODO:
 * 省略stateMixin,eventsMixin,lifecycleMixin
 */
renderMixin(Vue);
export default Vue;
