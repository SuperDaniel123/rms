// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

//导入路由包
import vueRouter from 'vue-router'
//绑定路由包
Vue.use(vueRouter)


//来关闭生产模式下给出的提示
Vue.config.productionTip = false

//导入后台管理系统的整体布局组件
import layout from './components/admin/layout.vue'

//导入goodslist.vue
import goodslist from './components/admin/goods/goodslist.vue'


//配置路由
var router = new vueRouter({
  routes:[
    {name:'default',path:'/',redirect:'/admin'},
    {name:'layout',path:'/admin',component:layout,
      children:[
        {name:goodslist,path:'goodslist',component:goodslist}
      ]
    }
  ]
})

//axios使用
//导入axios包
//import axios from 'axios'
//axios.defaults.baseURL = 'http://157.122.54.189:9095'
////想要在将来的每个子组件中的方法中均可以使用this.$http去调用其方法执行ajax请求
////绑定在vue原型的属性$http上
//Vue.prototype.$http = axios
//
////绑定axios
//Vue.use(axios);


//导入element-ui
import elementUi from 'element-ui'
//创建自定义样式

//import 'element-ui/lib/theme-default/index.css';

import '../static/theme_rms/index.css';


import '../static/css/index.css'

Vue.use(elementUi);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:create=>create(App)
  //template: '<App/>',
  //components: { App }
})
