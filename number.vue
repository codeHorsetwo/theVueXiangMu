<template>
    <div>
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' data-numbox-max='maxNum'>
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>

            <input class="mui-numbox-input" type="number" :value="count" @change="countChange"
            ref="num"/>

            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "number",
        mounted(){
            mui('.mui-numbox').numbox();
        },
        /*子组件，接收数据*/
        props:['maxNum','count'],
        methods:{
          countChange(){
              this.$emit('getCount',parseInt(this.$refs.num.value));
          }
        },
        watch:{
            maxNum:function (newVal,oldVal){
                mui('.mui-numbox').numbox().setOption('max',newVal);
            }
        }
    }
</script>

<style scoped>

</style>