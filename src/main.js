import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import './mock/mockServer'
import './filters'
Vue.config.productionTip = false
// 注册全局组件标签
Vue.component(Button.name, Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // router
  store, // vuex
  render: h => h(App)
})
