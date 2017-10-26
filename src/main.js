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

//��½ҳ��
import  login from './components/admin/account/login.vue'
//�����̨����ϵͳ�����岼�����
import layout from './components/admin/layout.vue'

//����goodslist.vue
import goodslist from './components/admin/goods/goodslist.vue'
import goodsAdd from './components/admin/goods/goodsAdd.vue'
import goodsedit from './components/admin/goods/goodsedit.vue'



//����·��
var router = new vueRouter({
  routes:[
    {name:'login',path:'/login',component:login},
    {name:'default',path:'/',redirect:'/admin'},
    {name:'layout',path:'/admin',component:layout,
      children:[
        {name:'goodslist',path:'goodslist',component:goodslist},
        {name:'goodsAdd',path:'goodsAdd',component:goodsAdd},
        {name:'goodsedit',path:'goodsedit/:id',component:goodsedit}
      ]
    }
  ]
})

//axiosʹ��
//����axios��
import axios from 'axios'
axios.defaults.baseURL = 'http://157.122.54.189:9095'
//��Ҫ�ڽ�����ÿ��������еķ����о�����ʹ��this.$httpȥ�����䷽��ִ��ajax����
//����vueԭ�͵�����$http��
Vue.prototype.$http = axios

axios.defaults.withCredentials = true;
//��axios
Vue.use(axios);


//����element-ui
import elementUi from 'element-ui'
//�����Զ�����ʽ

//import 'element-ui/lib/theme-default/index.css';

import '../static/theme_rms/index.css';


import '../static/css/index.css'

Vue.use(elementUi);
/* eslint-disable no-new */
Vue.filter('datefmt',(val)=>{
  var mydate = new Date(val)
  var y = mydate.getFullYear();
  var m = mydate.getMonth() + 1;
  var d = mydate.getDate();

  return y + '-' + m + '-' + d

})
new Vue({
  el: '#app',
  router,
  render:create=>create(App)
  //template: '<App/>',
  //components: { App }
})
