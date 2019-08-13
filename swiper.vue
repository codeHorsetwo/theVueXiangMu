<template>
    <div>
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in banner" :key="item.id">
                <img :src="item.img" alt="" :class="{home:isHome}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        name: "swiper",
        props:['banner','isHome']
    }
</script>

<style scoped lang="less">
    .home{
        width:100%;
    }
    .mint-swipe{
        width: 100%;
        height: 2rem;
        text-align:center;
    img{
        height:100%;
    }
    }
</style>