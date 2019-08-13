<template>
    <div class="shopcar-container">
        <!--商品列表区域-->
        <div class="mui-card goods-list" v-for="(item,index) in goodsList" :key="item.id">
            <div class="mui-card-content">
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
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{$store.getters.getGoodsTotal.count}}件，
                        总价 <span class="red">￥{{$store.getters.getGoodsTotal.amount}}</span></span> </p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    /*先导入，后注册*/
    import number from '../common/number.vue'
    export default {
        name: "shopcar",
        components:{
            number
        },
        data(){
            return {
                goodsList:[]
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
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
            removeGoodsList(id, index) {
                this.goodsList.splice(index, 1);
                this.$store.commit("removeGoodsList", id);
            }
        }
    }
</script>

<style scoped lang="less">
    .shopcar-container{
        background-color: #eee;
        overflow:hidden;
        .goods-list{
            .mui-card-content-inner{
                display:flex;
                justify-content: flex-start;
                img{
                    width: 100px;
                }
                .info{
                    p{
                        font-size:16px;
                        .price{
                            color: red;
                        }
                    }

                }
            }
        }
    }
</style>