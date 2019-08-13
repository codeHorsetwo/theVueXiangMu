<template>
    <div class="cmt_container">
        <h3>发表评论</h3>
        <hr>
        <textarea  placeholder="请输入内容（做多吐槽120字）" maxlength="120" cols="30" rows="5"
                   v-model="content"></textarea>
        <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
        <!--评论内容-->
        <div class="cmt-list">
            <div v-for="(item,index) in comments" :key="item.id" class="cmt-item">
                <div class="cmt-title">
                    第{{index+1}}楼 用户：{{item.user_name}}
                    发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '系统默认好评': item.content }}
                </div>
            </div>
            <!---->
        </div>
        <!--加载更多-->
        <mt-button type="danger" size="large"  plain @click="jia">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";
    export default {
        name: "comment",
        data(){
            return {
                comments:[],
                index:1,
                content:''
            }
        },
        /*接收*/
        props:["cmtid"],
        created(){
            this.getComments();
        },
        /**/
        methods:{
            /*获取数据库中的数据*/
            getComments(){
                this.$axios.get('api/getcomments/'+this.cmtid+'?pageindex='+this.index)
                    .then(result => {
                        if(result.data.status === 0){
                            this.comments = this.comments.concat(result.data.message);
                        }else {
                            Toast("获取评论失败！");
                        }
                    })
            },
            /*提交数据*/
            postComments(){
                // 校验是否为空内容
                if (this.content.trim().length === 0) {
                    return Toast("评论内容不能为空！");
                }
                this.$axios.post('/api/postcomment/'+this.cmtid,{content:this.content.trim()})
                    .then(result => {
                        if(result.data.status === 0){
                            var cmt = {
                                user_name: "匿名用户",
                                add_time: Date.now(),
                                content: this.content.trim()
                            };
                            this.comments.unshift(cmt);
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

<style scoped lang="less">
    .cmt_container{
             h3 {
                 font-size: 18px;
             }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                .cmt-title {
                    line-height: 30px;
                    background: #ccc;
                }
                .cmt-body {
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>