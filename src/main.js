// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

//����·�ɰ�
import vueRouter from 'vue-router'
//��·�ɰ�
Vue.use(vueRouter)


//���ر�����ģʽ�¸�������ʾ
Vue.config.productionTip = false

//�����̨����ϵͳ�����岼�����
import layout from './components/admin/layout.vue'

//����goodslist.vue
import goodslist from './components/admin/goods/goodslist.vue'


//����·��
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

//axiosʹ��
//����axios��
//import axios from 'axios'
//axios.defaults.baseURL = 'http://157.122.54.189:9095'
////��Ҫ�ڽ�����ÿ��������еķ����о�����ʹ��this.$httpȥ�����䷽��ִ��ajax����
////����vueԭ�͵�����$http��
//Vue.prototype.$http = axios
//
////��axios
//Vue.use(axios);


//����element-ui
import elementUi from 'element-ui'
//�����Զ�����ʽ

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