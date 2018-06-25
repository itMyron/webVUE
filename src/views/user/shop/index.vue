<template>
	<div>
		<section id="shopSection">
			<no-shop v-if="noShopFlag" @addShop="getNoshopData"></no-shop>
			<shop-list v-if="ShopListFlag" @getShopInfoData="getShopInfoData" @takeAdd="isAddShop" :shopListData="shopListData"></shop-list>
			<shop-info v-if="shopInfoFlag" @shopInfoFlag="getShopInfoFlag"  :postShopInfoData="shopInfoData"></shop-info>
			<add-shop v-if="addShopFlag"></add-shop>
		</section>
	</div>
</template>
<script type="text/javascript">
	import API from "@/config/api";
	import fn from "@/static/common";
	import NoShop from './noShop';
	import ShopList from './shopList';	
	import ShopInfo from './shopInfo';	
	import AddShop from './addShop';
	let shopListData = {
	}
	let shopInfoData = {
		data: ""
	}
	export default{
		components:{
			"no-shop" : NoShop ,
			"shop-info" : ShopInfo ,
			"add-shop" : AddShop ,
			"shop-list" : ShopList
		},
		data(){
			return{
				shopListData ,
				shopInfoData ,
				noShopFlag : false ,
				shopInfoFlag : false ,
				addShopFlag : false ,
				ShopListFlag : false
			}
		},
		methods: {
			init(){
				let _this = this ;
				//获取用户店铺列表
				_this.$post(_this.$API.GET_SHOPLIST) 
				.then((result) => {
					if(result.result == "success"){
						let len = result.data.length ;
						if(len>0){
							_this.ShopListFlag = true ;
							_this.shopListData = result ;
						}else{
							_this.noShopFlag = true ;
						} 
					}else{
						_this.$toast(result.msg) ;
					}
				})
				.catch((error)=>{
					_this.$toast(error.msg)
				})
			},
			//接收无店铺传来的数据
			getNoshopData(data){
				let _this = this ;
				_this.noShopFlag = false ;
				_this.addShopFlag = true ;
			},
			//接收店铺列表传输过来的数据---是否打开店铺详情
			getShopInfoData(data){
				console.log(123)
				let _this = this ;
				_this.shopInfoData.data = data ;
				_this.ShopListFlag = false ;
				_this.shopInfoFlag = true ;
			},
			//接收店铺列表传输过来的数据---是否添加店铺
			isAddShop(data){
				if(data){
					this.ShopListFlag = false ;
					this.addShopFlag = true ;
				}
			},
			//接收店铺详情传过来的数据---切换到店铺列表
			getShopInfoFlag(data){
				let _this = this ;
				_this.shopInfoFlag = false ;
				_this.ShopListFlag =true ; 
			}

		},
		created(){
			this.init();
		},
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
