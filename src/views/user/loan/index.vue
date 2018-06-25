<template>
	<div>
		<section id="loanSection" class="clear">
			<article class="news1 news">
				<p class="list1">
					<strong>流水贷</strong>
				</p>
				<p class="list2">
					只要您的店铺流水符合我们的贷款要求，都能轻松获得贷款哦！
				</p>
				<p class="list3">
					<a class="btn btn-primary " @click="applyLoan">申请贷款</a>
				</p>
			</article>
			<article class="news2 news">
				<p  class="list1">
					<strong>供应链贷</strong>
				</p>
				<p class="list2">
					只要您使用的供应链系统能对接我们的系统，都能轻松获得贷款哦！
				</p>
				<p class="list3">
					<a class="btn btn-primary" @click="applyLoan">申请贷款</a>
				</p>
			</article>
			<input type="hidden" id="fc" />
		</section>
	</div>
</template>
<script type="text/javascript">
	export default{
		
		data(){
			return{
				loanState:""	
			}
		},
		methods:{
			//判断用户是否可申请贷款
			isLoan(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_USER_ISLOAN)
				.then((result) => {
					if(result.result == "success"){
						_this.loanState = result.data ;
					}else{
						_this.$toast(result.msg)
					}
				})
			},
			//点击申请贷款
			applyLoan(){
				let _this = this ;
				if(_this.loanState == 1){	//1可申请贷款0不可以再次申请贷款
					_this.$router.push({
						path:"/user/applyLoan"
					})
				}else{
					_this.$router.push({
						path:"/user/loanDetail"
					})
				}
			}
		},
		created(){
			this.isLoan();
		},
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
