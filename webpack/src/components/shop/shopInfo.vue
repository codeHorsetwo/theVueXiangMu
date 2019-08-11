<template>
    <div>
        ddddd
    </div>
</template>

<script>
    export default {
        name: "shopInfo",
        data(){
            return {
                id:this.$route.params.id,
                shopInfo:{}
            }
        },
        created(){
            this.getshopInfo();
        },
        methods:{
            getshopInfo(){
                this.$axios.get('api/goods/getshopcarlist/'+this.id)
                    .then(result => {
                        if(result.data.status === 0){
                            this.shopInfo = result.data.message[0];
                            console.log(this.shopInfo)
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>