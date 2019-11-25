// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '~/static/reset.less'
import '~/static/style.less'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import create from '../src/plugin/myapi'
import VueCookies from 'vue-cookies'
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 });
Vue.config.productionTip = false
Vue.prototype.$api = create
Vue.prototype.$cookies = VueCookies
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})