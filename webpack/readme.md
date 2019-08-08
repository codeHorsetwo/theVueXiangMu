# 对于vue的一个综合案例

# 1.目录结构

![1565263015797](C:\Users\邓小龙\AppData\Local\Temp\1565263015797.png)

首先是创建相应的文件

# 2.在 index.js中的操作

首先是导入相应的内容

```
//导入项目框架
import  Vue from 'Vue'
import App from './app.vue'
```

创建实例对象

```
new Vue({
    el:"#app",
    render:c => c(App)
})
```

在 app.vue中的template 中加入语句

```
<template>
<div>
我不做人了，jojo
</div>
</template>
```

此时先进行一次测试 运行 npm run dev，如果正常会出现一个空白的网页，其中会有 “我不做人了，jojo”文字出现，如此，可进行下一步的操作，出现问题的话，可以根据控制台中的错误进行排除

头部可以使用mint-ui的样式（<https://mint-ui.github.io/docs/#/en2/header> ）

这时需要导入

```
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI);
```

```
 <mt-header fixed title="fixed top"></mt-header>
```

底部可以使用mui的样式，首先是进入mui的官网

![1565276632867](C:\Users\邓小龙\AppData\Local\Temp\1565276632867.png)

再是点击感叹号

![1565276719996](C:\Users\邓小龙\AppData\Local\Temp\1565276719996.png)

![1565276768375](C:\Users\邓小龙\AppData\Local\Temp\1565276768375.png)

在这个地址栏中，将examples及之后的去掉

![1565276837877](C:\Users\邓小龙\AppData\Local\Temp\1565276837877.png)

此时的页面是这样的

![1565276883418](C:\Users\邓小龙\AppData\Local\Temp\1565276883418.png)

再打开控制台，切换到手机模式，此时可以点击进入相应的手机页面，在其中可复制需要的代码。有几次打开的时候，右边的手机图形是黑的，可以尝试刷新或者换一个浏览器打开。

首先是导入

```
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './app.css'
```

再是结构

```
<nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
</nav>
```

# 3.在 home.vue的操作

在最开始的页面写好之后，就是跳转了，这个时候就是需要路由

要在router.js里面

```
/*导入路由*/
import VueRouter from 'vue-router'

import Home from './components/tabbar/home.vue'
import Member from './components/tabbar/member.vue'
import Shopcar from './components/tabbar/shopcar.vue'
import Search from './components/tabbar/search.vue'

//创建路由对象
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/member',component:Member},
        {path:'/shopcar',component:Shopcar},
        {path:'/search',component:Search}
    ],
    /*高亮显示对应的图标*/
    linkActiveClass:'mui-active'
})
//把路由对象挂载
export default router
```

导入路由以及挂载

```
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import router from './router.js'

new Vue({
    el:"#app",
    render:c => c(App),
    router
})
```

在去app.vue中站位， router-view 运行。看看是否有内容，由于头部是不占位的，可能没看到你写的内容，这个时候可以查看控制台，看看是否有自己写的内容。在router-link的to中，有路由判断点击的to的跳转位置。在底部进行点击时要跳转到相应的页面，在页面跳转时，要实现一定的动画效果。

```
		<transition>
            <router-view></router-view>
        </transition>
```

```
.app_container{
    padding-top:40px;
    /*底部的滑动去掉*/
    overflow-x:hidden;
    }
    .v-enter{
        opacity:0;
        transform:translateX(100%);
    }
    .v-leave-to{
        /*去除占位*/
        position:absolute;
        opacity:0;
        transform:translateX(-100%);
    }
    .v-enter-active,
    .v-leave-active{
        transition:all 0.8s;
    }
```

## 轮播图，使用mint-ui的swipe

```
//最基本的
<mt-swipe :auto="4000">
  <mt-swipe-item>1</mt-swipe-item>
  <mt-swipe-item>2</mt-swipe-item>
  <mt-swipe-item>3</mt-swipe-item>
</mt-swipe>
```

可以看到轮播图后，就要开始使用接口，从后台中获取图片的数据，在这里使用axios来从接口中获取数据。导入文件

```
import axios from 'axios'
axios.defaults.baseURL='http://www.liulongbin.top:3005/';
Vue.prototype.$axios = axios ;
```

要从后台中获取数据

```
<script>
    export default {
        name: "home",
        data(){
            return{
            //数组存入数据
                banner:[]
            }
        },
        created(){
            /*初始化*/
            this.getBanner();
        },
        methods:{
            getBanner(){
                this.$axios.get('http://www.liulongbin.top:3005/api/getlunbo')
                    .then(result => {
                    //在data中可以看到数据，这个时候的status是为0的
                        if(result.data.status === 0){
                            this.banner = result.data.message;
                        }
                    })
            }
        }
    }
</script>
```

渲染轮播图的数据

```
mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in banner" :key="item.id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

```

轮播图下方的九宫格

```
  <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/newsList">
                    <span><img src="../../images/menu1.png" alt="" class="menu"></span>
                    <div class="mui-media-body">新闻资讯</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span ><img src="../../images/menu2.png" alt="" class="menu"></span>
                    <div class="mui-media-body">图片分享</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span><img src="../../images/menu3.png" alt="" class="menu"></span>
                    <div class="mui-media-body">商品购买</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span><img src="../../images/menu4.png" alt="" class="menu"></span>
                    <div class="mui-media-body">留言反馈</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span><img src="../../images/menu5.png" alt="" class="menu"></span>
                    <div class="mui-media-body">视频专区</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span><img src="../../images/menu6.png" alt="" class="menu"></span>
                    <div class="mui-media-body">联系我们</div></a></li>
            </ul>
        </div>
```

