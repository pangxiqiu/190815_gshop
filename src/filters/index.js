import Vue from 'vue'
import moment from 'moment'
// 日期过滤器
Vue.filter('data-format', function (value, formatString = 'YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(formatString)
})
