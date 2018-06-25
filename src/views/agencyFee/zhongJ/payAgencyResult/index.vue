<template>
	<div class="contain">
		<header>
			<el-steps :active="2" align-center>
				<el-step title="申请贷款" description=""></el-step>
				<el-step title="贷款审批" description=""></el-step>
				<el-step title="签约" description=""></el-step>
				<el-step title="放款" description=""></el-step>
			</el-steps>
		</header>
		<section>
			<article class="list list1">
				<p class="row row1 green clear" v-if="false">
					<span>√</span>
					<strong>支付成功</strong>
				</p>
				<p class="row row2 red clear" >
					<span>×</span>
					<strong>支付失败</strong>
				</p>
			</article>
			<article class="list list2">
				<p class="row row1">
					<span>订单号：</span>
					<font>{{applyId}}</font>
				</p>
				<p class="row row2">
					<span>产品名称：</span>
					<font>{{productName}}</font>
				</p>
				<p class="row row3">
					<span>居间费：</span>
					<strong>{{amount}}</strong>
					<font>元</font>
				</p>
				<p class="row row4">
					<span>支付时间：</span>
					<font>{{new Date().toLocaleDateString()}}</font>
				</p>	
			</article>
			<article class="list list3">
				<p class="row row1" v-if="payErr" @click="repay()" >重新支付</p>
				<p class="row row2" v-else-if="signWay" @click="online()" >立即签约</p>
				<p class="row row3" v-else @click="line()" >预约签约</p>	
			</article>
		</section>
	</div>
</template>
<script type="text/javascript">
	export default{
		
		data(){
			return{
				height:"" ,
				signWay : true ,
				amount :5251 ,
				applyId : "" ,
				productName : "" ,
				payErr : false ,
				redirectUrl : "" ,//线上签约地址
			}
		},
		methods: {
			init(){
				let _this = this ;
				_this.$post(_this.$API.POST_FAST_PAY_RESULT_ZJ)
				.then((result) => {
					console.log(result)
					if(result.result == "success"){
						let obj = result.data ;
						_this.amount = obj.amount ;
						_this.applyId = obj.applyId ;
						let payStatus = obj.payStatus ;
						_this.productName = obj.productName ;
						//是否支付成功
						if(payStatus == "1"){	
							//signWay （1---线上签约 ， 2---线下签约）
							if(obj.signWay == "1"){
								_this.redirectUrl = obj.redirectUrl ;
							}else{
								_this.signWay = false ;
							}
						}else{
							_this.payErr = true ;	
						}
					}else{
						_this.$toast(result.msg)
					}
				})
			},
			//点击重新支付
			repay(){
				this.$router.push({
					path:"/payAgencyFeeZJ",	
				}) ;
			},
			//线上签约
			online(){
				console.log("试试")
				window.location.href = this.redirectUrl
			},
			//线下签约
			line(){
				this.$router.push({
					path:"/sign",
					query: {loanId: this.applyId}	
				}) ;
			},
		},
		created () {
			this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
			this.init();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>