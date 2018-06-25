<template>
	<div>
		<section id="bankCardSection">
			<article class="news1" v-if="noBankCard">
				<p class="list list1 clear">
					<img src="../../../assets/user/bank/bankCard0.png" />
				</p>
				<p class="list list2 clear">
					<strong>暂无添加银行卡</strong>
				</p>
				<p class="list list3 clear">
					<a @click="addBank">+添加银行卡</a>
				</p>
			</article>
			<article class="news2 clear" v-if="bankCardList">
				<!--银行卡列表-->
				<div v-for="key in bankList">
					<p class="list1 list">
						<strong>{{key.bankName}}</strong>
					</p>
					<p class="list2 list">
						<span>(尾号{{key.tailNo}})</span>
					</p>
					<p class="list3 list">限额：单笔5万元，单日5万元，单月不限</p>
				</div>
				
				<div class="add" @click="addBank">
					<p class="p1">+</p>
					<p class="p2">添加银行卡</p>
				</div>
			</article>
			<bankCard-info v-if="bankCardInfo" @turnCheck="turnCheck"></bankCard-info>
		</section>
	</div>
</template>
<script type="text/javascript">
	import API from "@/config/api";
	import fn from "@/static/common";
	import BankCardInfo from './bindCardsZJ/bankCardInfo';
	export default{
		components:{
			"bankCard-info" : BankCardInfo,
		},
		data(){
			return{
				token: "" ,
				bankList:[] ,
				noBankCard : false ,
				bankCardList : false ,
				bankCardInfo : false
			}
		},
		methods:{
			init(){
				let _this = this ;
				_this.$post(_this.$API.GET_BANKLIST)
				.then((result) => {
					console.log("修改密码提交：",result)
					if(result.result == "success"){
						let len = result.data.length;
						console.log(len)
						if(len > 0){
							_this.bankCardList = true ;
							_this.bankList = result.data ;
						}else{
							_this.noBankCard = true ;
						}
					}else{
						_this.$toast(result.msg) ;
					}
				})
				.catch((error)=>{
					_this.$toast(error.msg)
				})
			},
			addBank(){
				let _this = this ;
				_this.noBankCard = false ;
				_this.bankCardList = false ;
				_this.bankCardInfo = true ;	
			},
			turnCheck(data){
				this.init();
				this.bankCardInfo = false ;	
			}
		},
		created(){
			this.init();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
