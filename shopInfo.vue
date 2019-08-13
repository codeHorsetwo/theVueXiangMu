<template>
    <div class="goodsinfo-container">
        <!--商品轮播图区域-->
        <div class="mui-card">
            <!--内容区-->
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!--轮播图区域-->
                    <swiper :banner="banner" :isHome="false"></swiper>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">
                {{shopInfo.title}}
            </div>
            <!--内容区-->
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>{{shopInfo.market_price}}</del>
                        销售价：<span class="now_price">{{shopInfo.sell_price}}</span>
                    </p>
                    <p>购买数量：
                        <!--这里是要加入子组件的-->
                        <number :maxNum="shopInfo.stock_quantity" :count="selectedCount"
                        @getCount="getSelectedCount"></number>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size = "small"
                                   @click="goShop">加入购物车</mt-button>

                    </p>
                </div>
            </div>
        </div>
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div @transitionend="end" class="ball" v-show="flag"></div>
        </transition>

        <!--商品参数区域-->
        <div class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">商品参数</div>
            <!--内容区-->
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        商品货号：<span>{{shopInfo.goods_no}}</span> <br>
                        库存情况：<span >{{shopInfo.stock_quantity}}</span> <br>
                        上架时间：<span>{{shopInfo.add_time | dateFormat()}}</span>
                    </p>
                </div>

            </div>
            <!--页脚，放置补充信息或支持的操作-->
            <div class="mui-card-footer">
                <p>
                    <button type="button"  @click="gotu(shopInfo.id)"
                            class="mui-btn mui-btn-primary mui-btn-outlined da" >图文介绍</button>
                    <br>
                    <button type="button"  @click="goPing(shopInfo.id)"
                            class="mui-btn mui-btn-danger mui-btn-outlined da">商品评论</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    /*1.导入 2，注册*/
    import swiper from '../common/swiper.vue'
    import number from '../common/number.vue'
    export default {
        name: "shopInfo",
        components:{
            swiper,
            number
        },
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
        created(){
            this.getshopInfo();
            this.getshopDesc();
            this.getPhotos();
        },
        methods:{
            /*获取商品信息*/
            getshopInfo(){
                this.$axios.get('/api/goods/getinfo/'+this.id)
                    .then(result => {
                        if(result.data.status === 0){
                            this.shopInfo = result.data.message[0];
                        }
                    })
            },
            getshopDesc(){
                this.$axios.get('api/goods/getdesc/'+this.id)
                    .then(result => {
                        if(result.data.status === 0){
                            this.shopDesc = result.data.message;
                        }
                    })
            },
            /*获取轮播图的数据，和缩略图共用*/
            getPhotos(){
                this.$axios.get('api/getthumimages/'+this.id)
                    .then(result => {
                        if(result.data.status === 0){
                            result.data.message.forEach(item =>{
                                item.img = item.src;
                            })
                            this.banner = result.data.message;
                        }
                    })
            },
            getSelectedCount(num){
                this.selectedCount = num;
            },

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


            gotu(id){
                this.$router.push('/home/tuWen/'+id);
            },
            goPing(id){
                this.$router.push('/home/shopcom/'+id);
            }
        }
    }
</script>

<style scoped lang="less">
    .da{
        display: block;
        width: 6rem;
        margin: 1px 10px;
    }
    .ball{
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        top: 360px;
        left: 140px;
        z-index:999;

    }
</style>