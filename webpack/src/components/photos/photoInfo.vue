<template>
    <div class="photoinfo-container">
        <h3>{{ photoInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoInfo.click }}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview :slides="imgList" @close="handleClose">
            </vue-preview>
        </div>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoInfo.content"></div>
        <cmt-box :cmtid="id"></cmt-box>
    </div>
</template>

<script>
    import comment from "../common/comment.vue";
    export default {
        name: "photoInfo",
        components: {
            "cmt-box": comment
        },
        data(){
            return {
                id:this.$route.params.id,
                photoInfo:{},
                imgList:[]
            }
        },
        created(){
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods:{
           getPhotoInfo(){
                this.$axios.get('api/getimageInfo/'+this.id)
                    .then( result => {
                        if(result.data.status === 0){
                            this.photoInfo = result.data.message[0];
                        }
                    })
            },
            getThumbs(){
                this.$axios.get('api/getthumimages/'+this.id)
                    .then( result => {
                        if(result.data.status === 0){
                            //加工
                            result.data.message.forEach( item => {
                                item.msrc=item.src;
                                item.w = 600;
                                item.h = 400;
                            })
                            this.imgList = result.data.message;
                        }
                    })
            },
            handleClose () {
                console.log('close event')
            }
        }

    }
</script>

<style scoped lang="less">
    .photoinfo-container {
        padding: 3px;
        height: 500px;
        h3 {
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        .content {
            font-size: 13px;
            line-height: 30px;
        }

        .thumbs{
            img{
                margin: 10px;
                box-shadow: 0 0 8px #999;
            }
        }


    }
</style>