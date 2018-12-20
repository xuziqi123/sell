// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router";
import VueResource from "vue-resource"
import goods from "components/goods/goods.vue";
import ratings from "components/ratings/ratings.vue";
import sellers from "components/seller/seller.vue";

import './common/stylus/index.styl';

Vue.use(VueRouter);
/*全局注册vueResource*/
Vue.use(VueResource);
Vue.config.productionTip = false

/* eslint-disable no-new */

/*定义路由*/
const routes=[
	{path:"/goods",component:goods},
	{path:"/ratings",component:ratings},
	{path:"/seller",component:sellers}
]

/*创建router实例，传入routes配置，记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能*/
const router=new VueRouter({
	routes
})
//页面加载，自动导航到goods页面
router.push("/goods");
/*创建和挂载根实例*/
const app=new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
