<template>
    <div class="app_container">
        <mt-header fixed title="fixed top"></mt-header>

        <transition>
            <router-view></router-view>
        </transition>


        <nav class="mui-bar mui-bar-tab">
            <router-link class="my-mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="my-mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="my-mui-tab-item" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="my-mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "app"
    }
</script>

<style scoped>
    .app_container{
    padding-top:40px;
    /*底部的滑动去掉*/
        padding-bottom:50px;
    overflow-x:hidden;
    }
    .v-enter{
        opacity:0;
        transform:translateX(100%);
    }
    .v-leave-to{
        /*去除占位*/
        position:absolute;
        opacity:0;
        transform:translateX(-100%);
    }
    .v-enter-active,
    .v-leave-active{
        transition:all 0.8s;
    }

    .mui-bar-tab .my-mui-tab-item
    {
        display: table-cell;
        overflow: hidden;

        width: 1%;
        height: 50px;

        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;

        color: #929292;
    }
    .mui-bar-tab .my-mui-tab-item.mui-active
    {
        color: #007aff;
    }
    .mui-bar-tab .my-mui-tab-item .mui-icon
    {
        top: 3px;

        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .mui-bar-tab .my-mui-tab-item .mui-icon ~ .mui-tab-label
    {
        font-size: 11px;

        display: block;
        overflow: hidden;

        text-overflow: ellipsis;
    }
    .mui-bar-tab .my-mui-tab-item .mui-icon:active
    {
        background: none;
    }
</style>