<template>
    <div>
        <div class="mui-card">
            <!--页眉，放置标题-->
            <div class="mui-card-header">{{tu.title}}</div>
            <!--内容区-->
            <div class="mui-card-content" >
                <div class="mui-card-content-inner" v-html="tu.content"></div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "tuWen",
        data(){
            return {
                id:this.$route.params.id,
                tu:{}
            }
        },
        created(){
            this.getTu();
        },
        methods:{
            getTu(){
                this.$axios.get('api/goods/getdesc/'+this.id)
                    .then(result => {
                        if(result.data.status === 0){
                            this.tu = result.data.message[0];
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    .mui-card-header{
        text-align: center;
    }


</style>