import  Vue from 'Vue'
import App from './app.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI);

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './app.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter);
import router from './router.js'

import axios from 'axios'
axios.defaults.baseURL='http://www.liulongbin.top:3005/';
Vue.prototype.$axios = axios ;

import moment from 'moment'
Vue.filter('dateFormat',function(dataStr,partner = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(partner);
})


new Vue({
    el:"#app",
    render:c => c(App),
    router
})