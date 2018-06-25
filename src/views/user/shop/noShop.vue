<template>
    <article class="news1 clear">
        <p class="list list1">
            <img src="../../../assets/user/shop/shop0.png" />
        </p>
        <p class="list list2">暂无店铺信息</p>
        <p class="list list3" >
            <a @click="addShop">+添加店铺</a>
        </p>
    </article>
</template>
<script>
import API from "@/config/api";
import fn from "@/static/common";
export default {
    components:{
        
    },
    data(){
        return{
     
        }
    },
    methods: {
        //关联店铺
        addShop(){
            let _this = this ;
            _this.$emit("addShop",false) ;
        },
    },
    created(){
    
    },
}
</script>
<style lang="scss" scoped type="text/css">
   @import "./noShop.scss";
</style>
