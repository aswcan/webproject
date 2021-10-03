import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './utils/playbar.js'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: import('./img/sona.png'), // 加载失败显示的图片
  loading: require('./img/播放.png'), // 加载中显示的图片
  attempt: 3
  // listenEvents: [ 'scroll' ]
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
