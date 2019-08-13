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

# 4.新闻列表

1.首先在components文件下新建一个news文件，在新建一个newsList。vue

2.在router.js中导入和配置

3 在mui中找到图文列表，将样式拷贝来使用

4.可以使用axios来获取后台的数据，同时设置全局的url

```
import axios from 'axios'
axios.defaults.baseURL='http://www.liulongbin.top:3005/';
Vue.prototype.$axios = axios ;
```

5.渲染数据

```
export default {
        name: "newsList",
        data(){
            return {
                newsList:[]
            }
        },
        created(){
            this.getNewsList();
        },
        methods:{
            getNewsList(){
                this.$axios.get('api/getnewslist')
                    .then(result => {
                        if(result.data.status === 0){
                            this.newsList = result.data.message;
                        }
                    })
            }
        }
    }
```

6.从后台得到的时间格式，并不符合要求，同时对于时间在其他的页面也会多次用到，此时，需要使用全局的过滤器。

使用moment.js这个处理时间的插件。运行npm i moment

7 导入文件，配置

```
import moment from 'moment'
Vue.filter('dateFormat',function(dataStr,partner = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(partner);
})

 <span>发表时间：{{item.add_time | dateFormat("YYYY-MM-DD")}}</span>
```

# 5.新闻详情

1.新建文件newsInfo.vue

2.新闻详情需要点击新闻列表时，将id传过来

```
 <router-link :to="'/home/newsInfo/'+item.id">
 
  {path:'/home/newsInfo/:id',component:NewsInfo},
```



3.新闻详情的数据是个对象

```
data(){
            return {
                id:this.$route.params.id,
                newsInfo:{}
            }
        },
        created(){
            this.getNewsInfo();
        },
        methods:{
            getNewsInfo(){
                this.$axios.get('api/getnew/'+this.id)
                    .then(result => {
                        if(result.data.status === 0){
                            this.newsInfo = result.data.message[0]
                        }
                    })
            }
        }
```

4.评论。使用父子组件来传参，最好封装，之后还会使用。

新建common文件夹，里面有comment。js文件。在父组件里导入和注册。

```
import comment from '../common/comment.vue'
    export default {
        name: "newsInfo",
        components:{
            comment
        },
        
        //绑定id
         <comment :cmtid="id"></comment>
```

在comment.veu中进行数据的获取和渲染

```
<div class="cmt_list">
            <div v-for="(item,index) in comments" :key="item.id" class="cmt_item">
                <div class="cmt_title">
                    第{{index+1}}楼 用户：{{item.user_name}}
                    发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt_body">
                    {{item.content}}
                </div>
            </div>
            <!---->
        </div>
        
        /*获取数据库中的数据*/
            getComments(){
                this.$axios.get('api/getcomments/'+this.cmtid+'?pageindex='+this.index)
                    .then(result => {
                        if(result.data.status === 0){
                            this.comments = this.comments.concat(result.data.message);
                        }
                    })
            },
```

还需要提交数据

```
 /*提交数据*/
            postComments(){
                this.$axios.post('/api/postcomment/'+this.cmtid,{content:this.content})
                    .then(result => {
                        if(result.data.status === 0){
                            this.getComments();
                            this.content='';
                        }
                    })
            },
```

# 6.图片列表

1.新建文件photos，里面有photoList.vue,再是配置路由。在mui中找到顶部选项卡-可左右拖动，复制样式，同时加入mui的区域滚动，需要导入mui的js和初始化

```
import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "photoList",
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
```

2.这是会有严格模式的报错，mui中的celler无法使用，这时选择在webpack中移除严格模式。运行 npm i babel-plugin-transform-remove-strict-mode,还有barbel文件

```
"plugins": ["transform-remove-strict-mode","transform-runtime",["component", [
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]]
}
```

能够运行之后，发现下方的导航有错误，这时，需要将导航里面的类进行修改，找到css后，复制再换的类名。

3.渲染顶部

```
 <!--顶部滑动区域-->
        <div class="mui-content">
            <div id="slider" class="mui-slider" data-slider="4">
                <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control
                mui-segmented-control-inverted  mui-scroll-wrapper">

                        <div class="mui-scroll">
                            <!--这里放置真实显示的DOM内容-->
                            <a  v-for="(item,index) in cates" :key="item.id" >
                                {{item.title}}
                            </a>
                        </div>
                </div>
            </div>
            
            getAllCategory(){
                this.$axios.get('/api/getimgcategory')
                    .then(result => {
                        if(result.data.status === 0){
                            result.data.message.unshift({title:"全部",id:0});
                            this.cates = result.data.message
                        }
                    })
            },
```

4.要点击不同的主题时，获取id，再根据id来渲染图片的数据

```
<a @click="getPhotoList(item.id)" v-for="(item,index) in cates" :key="item.id" >
                                {{item.title}}
                            </a>
                            
getPhotoList(cateId){
                this.$axios.get('api/getimages/'+cateId)
                    .then( result => {
                        if(result.data.status === 0){
                            this.list = result.data.message
                        }
                    })
            }
```

5.提示性能，对于图片使用懒加载，需要用到mint-ui

```
<img v-lazy="item.img_url">

img[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
```

# 7.图文详情

1.新建文件photoInfo.vue,先配置路由。还要获取id

```
 <router-link tag="li" :to="'/home/photoInfo'+item.id" v-for="item in list" :key="item.id">
                  
```

2.由id来获取对应的对象

```
data(){
            return {
                id:this.$route.params.id,
                photoInfo:{}
            }
        },
        
        getPhotoInfo(){
                this.$axios.get('api/getimageInfo/'+this.id)
                    .then( result => {
                        if(result.data.status === 0){
                            this.photoInfo = result.data.message[0];
                        }
                    })
            },
```

3.获取缩略图的数据，运行npm i vue-preview -S,导入

```
import VuePreview from 'vue-preview'
Vue.use(VuePreview);
```



```
getThumbs(){
                this.$axios.get('api/getthumimages/'+this.id)
                    .then( result => {
                        if(result.data.status === 0){
                            //加工
                            result.data.message.forEach( item => {
                                item.msrc=item.src;
                                item.w = 600;
                                item.h = 600;
                            })
                            this.imgList = result.data.message;
                        }
                    })
            },
```

这个时候就获取到了缩略图的数据了，接下来是要将数据渲染处理

```
<!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview :slides="imgList" @close="handleClose">
            </vue-preview>
        </div>
        
        //新增的数据
        data(){
            return {
                id:this.$route.params.id,
                photoInfo:{},
                imgList:[]
            }
        },
```

有时候，后台也会做一部分前端的事，在图文详情的内容部分，后台已经写好了，

```
<div class="content" v-html="photoInfo.content"></div>
```

# 8.编程式导航

有时候，路径没有错误，网页也可以跳转，就是没有出现网页的内容，在这个时候，可以考虑使用编程式导航，使用简单。在路由写好后

```
<div @click="goDetail(item.id)">

goDetail(id){
                this.$router.push('/home/shopInfo/'+id);
            }
 原本还有几种写法，笔者不一一写出来，这个是使用的比较顺手的，一般是用于根据id跳转到新闻或者图片的详细介绍的页面
```

# 9 商品列表

新建shopList.vue,由接口获取数据，进行渲染，在对样式进行修改。如此便完成了商品列表的页面。

# 10 封装轮播图

点击某一个商品后会进入商品详情的页面，会看到具体商品的轮播图。这时，将轮播图进行封装。

首先是新建一个swiper。vue文件。

```
<div>
    <mt-swipe :auto="2000">
        <mt-swipe-item v-for="item in banner" :key="item.id">
            <img :src="item.img" alt="" :class="{home:isHome}">
        </mt-swipe-item>
    </mt-swipe>
</div>
```

新建商品详情页面shopInfo.vue，想写路径。对于轮播图要导入和注册

```
import swiper from '../common/swiper.vue'
import number from '../common/number.vue'
export default {
    name: "shopInfo",
    components:{
        swiper,
        number
    },
```

在用接口获取轮播图的数据，由父子组件之间进行传递。

```
export default {
    name: "swiper",
    props:['banner','isHome']
}
```

在这里由于首页的轮播图是要图片全部占满的，而商品详情是要展示完整 的商品图片的的，在这里要对图片有不同的样式

<img :src="item.img" alt="" :class="{home:isHome}">

```
//这是个样式，
.home{
    width:100%;
}
//商品详情的
<swiper :banner="banner" :isHome="false"></swiper>
//首页的相反就可以了
```

# 11封装输入框

对于商品的数量在之后会有需多的操作，在此做个封装

```
<div>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' data-numbox-max='maxNum'>
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>

        <input class="mui-numbox-input" type="number" :value="count" @change="countChange"
        ref="num"/>

        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</div>
```

这些样式是直接在mui中找到合适的拷贝过来

其中，要获取商品的库存，使得商品的数量变化要以1开始，以库存的最大值为结束。这涉及到数值的传递

```
<number :maxNum="shopInfo.stock_quantity" :count="selectedCount"
@getCount="getSelectedCount"></number>

getSelectedCount(num){
                this.selectedCount = num;
            },
```

需要导入mui的js

```
import mui from '../../lib/mui/js/mui.min.js'
```

```
export default {
    name: "number",
    mounted(){
        mui('.mui-numbox').numbox();
    },
    /*子组件，接收数据*/
    props:['maxNum','count'],
    methods:{
      countChange(){
          this.$emit('getCount',parseInt(this.$refs.num.value));
      }
    },
    watch:{
        maxNum:function (newVal,oldVal){
            mui('.mui-numbox').numbox().setOption('max',newVal);
        }
    }
}
```

# 12 购物车的小球

在搞定了数量之后，当你点击购买的时候，实现一个小球的出现，跳到下方的购物车中。

```
<mt-button type="danger" size = "small"
           @click="goShop">加入购物车</mt-button>
           
           //这个位置要在根元素下，不然小球会在指定的容器内出现，而无法在整个浏览器中看到
           <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div @transitionend="end" class="ball" v-show="flag"></div>
        </transition>
        
        beforeEnter(el){//动画入场前, 设置动画的起始样子
                if(!this.isShow) {
                    el.style.transform = "translate(0, 0)";
                }
            },
            enter(el, done){//正在入场的状态, 设置小球之后的样子
                //强制触发动画刷新, 实际没有什么多大的作用
                if(!this.isShow){
                    el.offsetWidth;
                    let ball = document.querySelector('.ball').getBoundingClientRect();
                    let badge = document.querySelector('.mui-badge').getBoundingClientRect();
                    let x = badge.left - ball.left,y = badge.top - ball.top;
                    el.style.transform = `translate(${x}px,${y}px)`;
                    el.style.transition="all 1s cubic-bezier(0.4, -0.3, 1, 0.6)";

                    done();
                }
                //为了直接执行完enter()函数后立即调用afterEnter
            },
            afterEnter(){//入场之后
                this.flag = !this.flag;
            },

            //监听过渡完成
            end(){
                this.isShow = true;
            },
            goShop(){
                if(this.isShow){
                    this.flag = !this.flag;
                    this.isShow = false;
                }            },
```

在最开始，可以使用定位先将小球的位置放好，之后小球就会从这个位置出现，使用子绝父相。这里使用了个插件，

getBoundingClientRect();由此来获取小球的位置与购物车的位置的左右和上下的动态距离，以此做好小球的位置移动。

# 13 使用vuex

因为涉及到组件之间的传值，我将需要传递的数据，放在Vuex中，可以方便供整个Vue实例使用/修改。

import Vuex from 'vuex' 

Vue.use(Vuex) 

const store = new Vuex.Store（{}） 

使用change事件监听购买数量input框的修改，使用$emit触发父组件方法，将input修改数据传递父组件data中selectedCount存储（默认数据为1）。

```
//子组件
<input class="mui-numbox-input" type="number" :value="count" @change="countChange"
ref="num"/>

countChange(){
              this.$emit('getCount',parseInt(this.$refs.num.value));
          }
          //父组件
          data(){
            return {
                id:this.$route.params.id,
                banner:[],
                shopInfo:{},
                shopDesc:[],
                flag: false,
                isShow: true,
                selectedCount: 1
            }
        },
```

添加购物车绑定点击事件，在事件处理函数中手动定义对象，对象包含商品id，商品数量，商品价格以及选择状态（默认为true），因为需要在购物车页面根据选中状态判断是否勾选购买商品，然后通过this.$store.commit('addToCar',goodsList)调用vuex中定义的addToCar方法，且将定义的goodsList值传过去。

```
<mt-button type="danger" size = "small"
           @click="goShop">加入购物车</mt-button>
           
                goShop(){
                if(this.isShow){
                    this.flag = !this.flag;
                    this.isShow = false;

                    let goodsList = {
                        id: this.id,//id
                        count: this.selectedCount,//数量
                        price: this.shopInfo.sell_price,//价格
                        selected: true
                    }

                    //把数据添加到store仓库去
                    this.$store.commit('addToCar',goodsList)
                }

            },
```

需要在new vue.store的mutations中定义添加购物车方法addToCar，同时在state中定义加入购物车后的数据数组对象car。在addToCar中接收商品信息对象（goodsList），然后通过forEach方法，加入到car中存储，因为是本地临时数据，需要调用缓存，存储到localStrange中，页面加载同样需要将购物车数据显示，所以要调用缓存中的数据，获取数据到car中，将获取到的car拼接到state的car中。在这里需要注意，运行时，会报forEach未定义的错误，因为你要遍历的数组并不是数组，在最开始的时候，里面是没有任何数据存在的，为了解决这个bug，此时返回一个空数组。

```
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
```

这样就有了许多的数据。有了这些vuex的数据，就可以在shopcar。vue页面进行渲染

首先是获取到数据

```
/*获取购物车的数据，拼接id*/
getGoodsList(){
    let idArr = [];
    this.$store.state.car.forEach(item => idArr.push(item.id));
    if(idArr.length <= 0) return;
    this.$axios.get('api/goods/getshopcarlist/'+idArr.join(','))
        .then(result => {
            if(result.data.status === 0){
                this.goodsList = result.data.message;
            }
        })
},
```

在看到了数据后，就好办了

```
<div class="mui-card-content-inner">
    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch>
    <img :src="item.thumb_path" alt="">
    <div class="info">
        <h4>{{item.title}}</h4>
        <!--这是数量的子组件-->
        <number :count="$store.getters.getGoodsCount[item.id]"></number>

        <p>
            <span class="price">￥{{item.sell_price}}</span>
            <a href="" @click.prevent="removeGoodsList(item.id, index)">删除</a>
        </p>
    </div>
</div>
```

设置购物车徽标的个数，在商品详情界面添加购物车操作，同时购物车的徽标会随着你的添加数量而改变

```
    <span class="mui-badge">{{this.$store.getters.getAllCount}}</span>

getAllCount(state){
    let c = 0;
    state.car.forEach(item => {
        c += item.count;
    })
    return c;
},
```

删除功能，给a标签添加点击事件，将商品id和数据索引作为参数传递，调用数据的splice方法将选中的某条数据删除。同时调用vuex中的removeGoodsList方法删除本地存贮的数据，此时，只需要将商品的id作为参数传递即可，同时要将新的数据加入到本地存储中

```
<a href="" @click.prevent="removeGoodsList(item.id, index)">删除</a>

 removeGoodsList(id, index) {
                this.goodsList.splice(index, 1);
                this.$store.commit("removeGoodsList", id);
            }
            
            removeGoodsList(state, id) {
            state.car.some((item, index) => {
                if (item.id === id) {
                    state.car.splice(index, 1)
                }
            })
            localStorage.setItem('shopCar', JSON.stringify(state.car))
        }
```

购物车商品选中状态，在store的getters中定义getGoodsSelected，将某个商品的id与选中状态已对象返回，在mt-switch中可以使用v-model来双向的传递选中的状态。在这里要注意的一点，this.$store.getters.getGoodsSelected[item.id],这种写法，会出现$$store未定义的bug，这个时候可以把this去掉，不会对功能有影响，其余的地方可以自己进行尝试，笔者在确保功能实现后，没有进行多次的测试。

```
<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch>

/*设置商品数据的状态*/
        getGoodsSelected(state){
            let selected = {};
            state.car.forEach(item => {
                selected[item.id] = item.selected;
            })
            return selected;
        },
```

在商品的数量上，使用封装好了的组件number，在导入和注册组件后，可以直接绑定vuex中的选中商品数量总和

```
<number :count="$store.getters.getGoodsCount[item.id]"></number>

/*获取商品数量*/
        getGoodsCount(state){
            let num = {};
            state.car.forEach(item => {
                num[item.id] = item.count;
            })
            return num;
        },
```

最后将购物车界面的合计与勾选数量进行处理，和渲染

```
总价 <span class="red">￥{{$store.getters.getGoodsTotal.amount}}</span></span> </p>
```

```
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
```

还有一点优化的是每个页面的返回按钮，可以直接在mint-ui中找到结构使用

```
<mt-header fixed title="头铁">
    <span slot="left" @click="goBack">
        <mt-button icon="back" v-show="flag">返回</mt-button>
    </span>
</mt-header>
```

```
export default {
    name: "app",
    data(){
        return {
            flag:false
        }
    },
    methods:{
        goBack(){
        //是回到上一个页面
            this.$router.go(-1);
        }
    },
    created(){
    //在第一个一名隐藏
        this.flag = this.$route.path === "/home"?false:true;
    },
    watch:{
        '$route.path':function (newVal){
            this.flag = newVal === "/home"?false:true;
        }
    }
}
```

















