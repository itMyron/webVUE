<template>
    <article class="news2 clear">
        <div v-for="key in shopListData.data" @click="shopInfo(key.applyFlag,key.main,key.saasId,key.shopNo)" :class="['shopList',key.applyFlag==1?'shopList1':'shopList0']" >
            <p class="list list1">
                <img src="../../../assets/user/shop/shopMain.png" v-if="key.main">
                <img src="../../../assets/user/shop/shop.png" v-if="!key.main">
            </p>
            <p class="list list2">
                <strong>{{key.shopName}}</strong>
            </p>
            <p class="list list3">
                <a v-if="key.applyFlag==1">可申请贷款</a>
                <a v-else-if="key.loanCase==101" style="background:green;">审批中</a>
                <a v-else-if="key.loanCase==102" style="background:red;">拒绝</a>
                <a v-else-if="key.loanCase==103" style="background:green;">审批通过</a>
                <a v-else-if="key.loanCase==104" style="background:green;">放款</a>
                <a v-else-if="key.loanCase==105" style="background:red;">未知</a>
                <a v-else style="background:red;">其它</a>
            </p>
        </div>
        <p id="add2" class="add">
            <a @click="addShop">+新增店铺</a>
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
            token:"",
        }
    },
    props: {
        "shopListData":{
            type:Object,		//Array,Boolean,Number
            default:false
        }
	},
    methods: {
        init(){
            let _this = this ;
            _this.token = sessionStorage.getItem("myron");	//获取token值
        },
        shopInfo(key,shopFlag,saasId,shopNo){
            let _this = this ;
            let params={
                saasId : saasId ,
                shopNo : shopNo,
                token :  _this.token,
            }
            _this.$emit('getShopInfoData', params) ;
               
        },
        addShop(){
            this.$emit('takeAdd', true) ;
        }
    },
    created(){
        this.init();
    },
}
</script>
<style lang="scss" scoped type="text/css">
    @import "./shopList.scss";
</style>
