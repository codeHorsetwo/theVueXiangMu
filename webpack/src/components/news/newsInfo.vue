<template>
    <div class="newsInfo_container">
        <h3 class="title">{{newsInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newsInfo.add_time | dateFormat()}}</span>
            <span>点击次数：{{newsInfo.click}}</span>
        </p>
        <hr>
        <!--content-->
        <div v-html="newsInfo.content"></div>
        <comment :cmtid="id"></comment>
    </div>
</template>

<script>
    import comment from '../common/comment.vue'
    export default {
        name: "newsInfo",
        components:{
            comment
        },
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
    }
</script>

<style scoped lang="less">
    .newsInfo_container{
        h3{
            font-size:16px;
            color:red;
        }
        .subtitle{

        }
    }
</style>