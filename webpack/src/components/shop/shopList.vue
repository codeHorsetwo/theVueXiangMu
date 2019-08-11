<template>
    <div>

           <div class="shop"   v-for="item in shopListr" :key="item.id">
               <router-link  :to="'/home/shopInfo'+item.id">
                <img :src="item.img_url" alt="">

                <p class="shop-title">{{item.title}} </p>
                <div class="shop-body">
                    <p class="body-p">
                        <span>￥{{item.sell_price}}</span>
                        <span>￥{{item.market_price}}</span>
                    </p>
                    <p class="body-s">
                        <span>热卖中</span>
                        <span>剩余4件</span>
                    </p>
                </div>
               </router-link>
            </div>
                    <div>
                        <mt-button  class="button" type="danger" size="large" @click="jia">加载更多</mt-button>
                    </div>

    </div>
</template>

<script>
    export default {
        name: "shopList",
        data(){
            return {
                shopListr:[],
                mun:1
            }
        },
        created(){
            this.getshopList();
        },
        methods:{
            getshopList(){
                this.$axios.get('api/getgoods?pageindex='+this.mun)
                    .then(result => {
                        if(result.data.status === 0){
                            this.shopListr = this.shopListr.concat(result.data.message);
                        }
                    })
            },
            jia(){
                this.mun++;
                this.getshopList();
            }
        }
    }
</script>

<style scoped lang="less">
    .shop{
        width:45%;

        overflow:hidden;
        margin:10px 10px;
        box-shadow:0 0 9px #999;
        display:inline-block;
        img{
            width: 100%;
            height: 200px;
        }
        .shop-title{
            color: black;
            font-weight:bolder;
            font-size:20px;
            margin:0 5px;
        }
        .shop-body{
            background: gray;
            .body-p{
                margin:10px 10px;
                span:nth-child(1){
                    font-size:22px;
                    color:red;
                }
                span:nth-child(2){
                    color: #444;
                    font-size:18px;
                    text-decoration:line-through;
                }
            }
            .body-s{
                margin:4px 8px;
                color: #444;
                font-size:14px;
                display:flex;
                justify-content:space-between;
            }
        }
    }
    .button{
        margin:1px 0;
        height:50px;
        margin-bottom:50px;
    }
</style>