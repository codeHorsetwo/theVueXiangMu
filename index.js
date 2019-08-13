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

import VuePreview from 'vue-preview'
Vue.use(VuePreview);

router.afterEach((to, from, next) => {
    window.scrollTo(0,0);
})

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次加载页面时, 先从本地缓存中获取数据
let car = JSON.parse(localStorage.getItem("shopCar") || '[]');

const store = new Vuex.Store({
    state:{
        car:car
    },
    mutations:{
        //1.点击加入购物车, 把数据保存到store的car中
        addToCar(state,goodsList){
            let flag = true;
            /*如果不是数组，就返回*/
            if(!state.car) return;

            state.car.forEach(item => {
                if(item.id == goodsList.id){
                    //更新数据
                    item.count += parseInt(goodsList.count);
                    flag = false;
                    return true;
                }
            })
            if(flag){
                //如果没有找到
                state.car.push(goodsList);
            }
            //把数据存储到本地缓存中去
            localStorage.setItem('shopCar',JSON.stringify(state.car));
        },
        /*删除*/
        removeGoodsList(state, id) {
            state.car.some((item, index) => {
                if (item.id === id) {
                    state.car.splice(index, 1)
                }
            })
            localStorage.setItem('shopCar', JSON.stringify(state.car))
        }
    },
    getters:{
        /*设置徽标的个数*/
        getAllCount(state){
            let c = 0;
            state.car.forEach(item => {
                c += item.count;
            })
            return c;
        },
        /*设置商品数据的状态*/
        getGoodsSelected(state){
            let selected = {};
            state.car.forEach(item => {
                selected[item.id] = item.selected;
            })
            return selected;
        },
        /*获取商品数量*/
        getGoodsCount(state){
            let num = {};
            state.car.forEach(item => {
                num[item.id] = item.count;
            })
            return num;
        },
        /*计算总价和总量*/
        getGoodsTotal(state){
            let num ={
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                num.count += item.count;
                num.amount += item.price*item.count;
            })
            return num;
        }
    },
})

new Vue({
    el:"#app",
    render:c => c(App),
    router,
    store
})

const setHtmlFontSize = () => {
    const htmlDom = document.getElementsByTagName('html')[0];
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (htmlWidth >= 750) {
        htmlWidth = 750;
    }
    if (htmlWidth <= 320) {
        htmlWidth = 320;
    }
    htmlDom.style.fontSize = `${htmlWidth / 7.5}px`;
};
window.onresize = setHtmlFontSize;
setHtmlFontSize();
