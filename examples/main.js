import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
// 导入组件库
import zrEditTable from '../packages/index'
import '../packages/zrEditTable/src/zrEditTable.scss'

// 注册组件库
Vue.use(zrEditTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')