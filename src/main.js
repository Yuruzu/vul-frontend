// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import './assets/css/global.css'   // 导入全局样式表

Vue.use(ElementUI) //使用elementUI
Vue.config.productionTip = false
Vue.prototype.$http=axios
// axios.defaults.baseURL = ''  // 配置请求的根路径
// 通过axios 拦截器添加token验证
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须添加return
  return config
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})