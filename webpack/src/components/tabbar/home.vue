<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in banner" :key="item.id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/newsList">
                    <span><img src="../../images/menu1.png" alt="" class="menu"></span>
                    <div class="mui-media-body">新闻资讯</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/photoList">
                    <span ><img src="../../images/menu2.png" alt="" class="menu"></span>
                    <div class="mui-media-body">图片分享</div>
                    </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/shopList">
                    <span><img src="../../images/menu3.png" alt="" class="menu"></span>
                    <div class="mui-media-body">商品购买</div>
                    </router-link></li>
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

    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return{
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
                        if(result.data.status === 0){
                            this.banner = result.data.message;
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    .mint-swipe{
    height: 5rem;
        img{
             width:100%;
             height:200px;
        }
    }
    .menu{
        width: 50px;
        height: 50px;
    }
</style>