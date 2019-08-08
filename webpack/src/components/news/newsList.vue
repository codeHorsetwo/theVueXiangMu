<template>
    <div class="newsList_container">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h2>{{item.title}}</h2>
                        <p>
                            <span>发表时间：{{item.add_time | dateFormat("YYYY-MM-DD")}}</span>
                            <span>点击次数：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>

        </ul>
    </div>
</template>

<script>
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
</script>

<style scoped lang="less">
    .newsList_container{
        .mui-media-body{
            h2{
                font-size:14px;
            }
            p{
                font-size:12px;
                color:blue;
                display:flex;
                justify-content:space-between;

            }
        }
    }
</style>