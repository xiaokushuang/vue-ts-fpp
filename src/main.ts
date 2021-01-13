import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import py_components from './components/shared/index';
import * as _ from 'lodash';
import './assets/scss/index.scss';
import 'element-ui/lib/theme-chalk/display.css';

import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import VueVirtualScroller from "vue-virtual-scroller";

Vue.use(VueVirtualScroller);

Vue.prototype['_'] = _;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(py_components);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
