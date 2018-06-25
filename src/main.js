// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import iView from "iview"
import axios from "axios"
import API from "@/config/api"		//接口api
import fn from "@/static/common"	//公共方法

import { post, fetch, patch, put } from "./utils/axios";
//定义全局变量---请求方式
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

Vue.prototype.$API = API;
Vue.prototype.$fn = fn;
//import "iview/dist/styles/iview.css"
//Vue.use(iView)
Vue.use(VueResource)
Vue.config.productionTip = true		//关闭生产模式下给出的提示
Vue.config.silent = true;		//关闭警告

//mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App },
	created(){
		router.beforeEach((to, from, next) => {
			//console.log("to",to) ;
			//console.log("from", from);
			if (to.meta.title) {
				document.title = to.meta.title;
			}
			next();
		});	
	}
})

