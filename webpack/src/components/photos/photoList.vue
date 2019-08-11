<template>
    <div>
        <!--顶部滑动区域-->
        <div class="mui-content">
            <div id="slider" class="mui-slider" data-slider="4">
                <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control
                mui-segmented-control-inverted  mui-scroll-wrapper">

                        <div class="mui-scroll">
                            <!--这里放置真实显示的DOM内容-->
                            <a @click="getPhotoList(item.id)" v-for="(item,index) in cates" :key="item.id" >
                                {{item.title}}
                            </a>
                        </div>
                </div>
            </div>

            <ul class="photo-list">
                <router-link tag="li" :to="'/home/photoInfo'+item.id" v-for="item in list" :key="item.id">
                    <img v-lazy="item.img_url">
                    <div class="info">
                        <h1 class="info-titlt">{{item.title}}</h1>
                        <div class="info-body">{{item.zhaiyao}}</div>
                    </div>
                </router-link>
                <div class="cc"></div>
            </ul>

        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "photoList",
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        data(){
            return {
                cates:[],
                list:[]
            }
        },
        created(){
            this.getAllCategory();
            this.getPhotoList(0);
        },
        methods:{
            getAllCategory(){
                this.$axios.get('/api/getimgcategory')
                    .then(result => {
                        if(result.data.status === 0){
                            result.data.message.unshift({title:"全部",id:0});
                            this.cates = result.data.message
                        }
                    })
            },
            getPhotoList(cateId){
                this.$axios.get('api/getimages/'+cateId)
                    .then( result => {
                        if(result.data.status === 0){
                            this.list = result.data.message
                        }
                    })
            }
        }

    }
</script>

<style scoped lang="less">
    /*.gao{
        height: 50px;
    }*/

    .photo-list{
        width:96%;
        list-style: none;
        margin-left:10px;
        padding: 0 0;

        li{
            text-align:center;
            margin-bottom:10px;
            box-shadow:0 0 9px #999;
            position:relative;
            height: 600px;
            overflow:hidden;

            img{
                width:100%;
                height: 100%;
                display:block;
                position: absolute;
                top: 0;
                left: 0;
            }
            .info{
                position: absolute;
                bottom:0;
                background: #887C65;
                text-align:left;
                width: 100%;
                opacity:0.5;
                .info-titlt{
                    font-size:20px;
                    color:white;
                }
                .info-body{
                    color:white;
                }
            }
        }
    }
    .cc{
        clear:both;
    }

</style>