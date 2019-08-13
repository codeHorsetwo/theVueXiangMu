<!--
<template>
    <div class="cmt_container">
        <h3>发表评论</h3>
        <hr>
        <textarea  placeholder="请输入内容（做多吐槽120字）" maxlength="120"
                   cols="30" rows="5" v-model="content"></textarea>
        <mt-button type="primary" size="large" @click="postComments" >发表评论</mt-button>
        &lt;!&ndash;评论内容&ndash;&gt;
        <div class="cmt-list">
            <div  class="cmt-item" v-for="(item,index) in shopPin" :key="item.id">
                <div class="cmt-title">
                    第{{index+1}}楼 用户：{{item.user_name}}
                    发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '系统默认好评': item.content }}
                </div>
            </div>
            &lt;!&ndash;&ndash;&gt;
        </div>
        &lt;!&ndash;加载更多&ndash;&gt;
        <mt-button type="danger" size="large" plain @click="jia">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";
    export default {
        name: "shopcom",
        data(){
            return {
                id:this.$route.params.id,
                shopPin:[],
                content:'',
                index:1
            }
        },
        create(){
            this.getComments();
        },
        methods:{
            /*获取数据库中的数据*/
            getComments(){
                this.$axios.get('api/getcomments/'+this.id+'?pageindex='+this.index)
                    .then(result => {
                        if(result.data.status === 0){
                            this.shopPin = this.shopPin.concat(result.data.message);
                        }else {
                            Toast("获取评论失败！");
                        }
                    })
            },
            postComments(){
                // 校验是否为空内容
                if (this.content.trim().length === 0) {
                    return Toast("评论内容不能为空！");
                }
                this.$axios.post('/api/postcomment/'+this.id,{content:this.content.trim()})
                    .then(result => {
                        if(result.data.status === 0){
                            var cmt = {
                                user_name: "匿名用户",
                                add_time: Date.now(),
                                content: this.content.trim()
                            };
                            this.shopPin.unshift(cmt);
                            this.content='';
                        }
                    })
            },
            jia(){
                this.index++;
                this.getComments();
            }
        }
    }
</script>

<style scoped>

</style>-->
