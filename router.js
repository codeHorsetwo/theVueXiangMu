/*导入路由*/
import VueRouter from 'vue-router'

import Home from './components/tabbar/home.vue'
import Member from './components/tabbar/member.vue'
import Shopcar from './components/tabbar/shopcar.vue'
import Search from './components/tabbar/search.vue'
import NewsList from './components/news/newsList.vue'
import NewsInfo from './components/news/newsInfo.vue'
import PhotoList from './components/photos/photoList.vue'
import PhotoInfo from './components/photos/photoInfo.vue'
import ShopList from './components/shop/shopList.vue'
import ShopInfo from './components/shop/shopInfo.vue'
import TuWen from './components/shop/tuWen.vue'
import Shopcom from './components/common/shopcom.vue'
/*路由对象*/
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/member',component:Member},
        {path:'/shopcar',component:Shopcar},
        {path:'/search',component:Search},
        {path:'/home/newsList',component:NewsList},
        {path:'/home/newsInfo/:id',component:NewsInfo},
        {path:'/home/photoList',component:PhotoList},
        {path:'/home/photoInfo/:id',component:PhotoInfo},
        {path:'/home/shopList',component:ShopList},
        {path:'/home/shopInfo/:id',component:ShopInfo},
        {path:'/home/tuWen/:id',component:TuWen},
        {path:'/home/shopcom/:id',component:Shopcom}
    ],
    /*高亮显示对应的图标*/
    linkActiveClass:'mui-active'
    /*scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }*/
})

export default router















