// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import routes from './router'
import store from './store/index'

import { timeToNow, transTab } from './filter'

Vue.filter( 'timeToNow', timeToNow );
Vue.filter( 'transTab', transTab );

/* eslint-disable no-new */
Vue.use(VueRouter)

const router = new VueRouter({
	routes
})
router.beforeEach((to, from, next) => {
	document.body.scrollTop = 0;
	next()
})

Vue.config.devtools = true;

new Vue({
  el: '#app',
  router,
  store,
  ...App
})

