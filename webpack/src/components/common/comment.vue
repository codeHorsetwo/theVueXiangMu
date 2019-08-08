<template>
    <div class="cmt_container">
        <h3>发表评论</h3>
        <hr>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "comment",
        data(){
            return {
                comments:[]
            }
        },
        props:["cmtid"],
        created(){
            this.getComments();
        },
        methods:{
            getComments(){
                this.$axios.get('api/getcomments/'+this.cmtid+'?pageindex=1')
                    .then(result => {
                        if(result.data.status === 0){
                            this.comments = result.data.message
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>