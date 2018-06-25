<template>
	<div class="contain">
		<header>
			<el-steps :active="progress" align-center>
				<el-step title="申请贷款" description=""></el-step>
				<el-step title="贷款审批" description=""></el-step>
				<el-step title="签约" description=""></el-step>
				<el-step title="放款" description=""></el-step>
			</el-steps>
		</header>
		<section>
			<article class="list list1">
				<p class="row">
					<span>{{headerText}}</span>
					<strong>{{hopePrice}}</strong>
					<span>元</span>
					<b class="listTitle">还款方式:</b>
					<b>{{repayText}}</b>
					<b class="listTitle">{{rate}}</b>
				</p>
			
			</article>
			<article class="list list2">
				<p class="row row1">
					<span>状态:</span>
					<strong>{{statusText}}</strong>
				</p>
				<p class="row row2">{{remark}}</p>
			</article>
			<article class="list list3">
				<div class="row row1" v-if="isShow">
					<p>
						<span>放款前您要支付</span>
					</p>
					<p>
						担保费
						<a>{{guaranteeFeePrice}}元</a>
					</p>
					<p>
						居间费
						<a>{{factoragePrice}}元</a>
					</p>
				</div>
				<!--审核通过支付居间费-->
				<div class="row row2" v-if="isShow">
					<p class="declaration">如果您对上面的费用无异议，请进入下一步支付居间费。</p>
					<p class="btn" @click="next()">下一步</p>
				</div>
				<!--审核不过修改-->
				<div class="row row3" v-if="isModify">
					<p class="btn" @click="toModify">点击修改基本信息</p>
				</div>
			</article>
		</section>
		<footer></footer>
	</div>
	
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				"progress":2,
				"headerText":"您申请的贷款金额",
				"hopePrice":"0",
				"repayText":"等额本息12个月",
				"rate":"",
				"statusText":"",
				"remark":"",
				"isShow":false,
				"isModify":false,
				"guaranteeFeePrice":"",
				"factoragePrice":""
			}
		},
		methods :{
			init(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_USER_APPLY_MSG)
				.then((result) => {
					if(result.result == "success"){
						console.log(result)
						let obj = result.data ;
							_this.loanId = obj.id; //贷款申请记录
							_this.factoragePrice = obj.factoragePrice == null ? 0 : obj.factoragePrice; //居间服务费
							_this.guaranteeFeePrice = obj.guaranteeFeePrice == null ? 0 : obj.guaranteeFeePrice; //担保费
							_this.hopePrice = obj.hopePrice == null ? 0 : parseInt(obj.hopePrice.toFixed(2)); //贷款申请金额
							let repaymentMode = obj.repaymentMode == null ? "" : obj.repaymentMode; //贷款类型
							switch (repaymentMode) {
								case "1":
									_this.repayText = "随借随贷12个月" ;
									break;
								case "2":
									_this.repayText = "先息后本3个月" ;
									break;
								case "3":
									_this.repayText = "先息后本12个月" ;
									break;
							}
							if(obj.repaymentName != null && obj.repaymentName != '') {
								_this.repayText = obj.repaymentName;
							}
							if(obj.rate&&(obj.rate!=""||obj.rate!=null)){
								_this.rate ="年利率："+obj.rate+"%" ;		//年利率
							}
							//未审核
							if(obj.status == 0&&obj.applyStatus == 1){
								_this.statusText = "审核中";
								_this.remark = "亲~我们会在3个工作日内给您反馈信息哦~";
								_this.progress = 2 ;
							}
							//驳回
							if(obj.status == 0&&obj.applyStatus == 3){
								console.log("驳回了")
								_this.statusText = "驳回";
								_this.remark = "原因：" + (obj.modifyContent == null ? "" : obj.modifyContent);
								_this.isModify = true ;
								_this.progress = 2 ;
							}
							//拒绝
							if(obj.status == 0&&obj.applyStatus == 4){
								_this.statusText = "拒绝";
								_this.remark = "信用评分不足，短期内无法获批！";
								_this.progress = 2 ;
							}
							//初审中
							if(obj.status == 1){
								_this.statusText = "初审中";
								_this.remark = "我们正在处理中，请耐心等待！";
								_this.progress = 2 ;
							}
							//复审中
							if(obj.status == 2){
								_this.statusText = "复审中";
								_this.remark = "我们已经进入复审阶段，请耐心等待！";
								_this.progress = 2 ;
							}
							//审核通过
							if(obj.status == 3){
								_this.statusText = "审核通过";
								_this.remark = "您提交的贷款申请已通过,等待放款！";
								_this.headerText = "您获批的贷款金额" ;
								_this.progress = 2 ;
							}
							//居间费待付
							if(obj.status == 4&&obj.applyStatus == 6){
								_this.statusText = "居间费待付";
								_this.remark = "";
								_this.isShow = true ;
								_this.headerText = "您获批的贷款金额" ;
								_this.progress = 2 ;
							}
							//居间费待付
							if(obj.status == 4&&obj.applyStatus == 2){
								_this.statusText = "审批通过";
								_this.remark = "您提交的贷款申请已通过,等待放款！";
								_this.progress = 2 ;
							}
							//居间费已付
							if(obj.status == 4&&obj.applyStatus == 7){
								_this.statusText = "居间费已付";
								_this.remark = "您申请的贷款居间费已付，请立即签约！";
								_this.headerText = "您获批的贷款金额" ;
								_this.progress = 2 ;
								if(obj.signWay == "0"){		//线下签约
									if(obj.timeStatus){
										_this.$router.push({
											path:"/sign",	//签约时间
											query: {loanId: _this.loanId}
										}) ;
									}else{
										_this.$router.push({
											path:"/modifySign",	//修改签约时间
											query: {loanId: _this.loanId}
										}) ;
									}
								}
								if(obj.signWay == "1"){		//线上签约
									window.location.href= obj.redirectUrl ;
								}
							}
							//居间费退款中
							if(obj.applyStatus == 8){
								_this.statusText = "居间费退款中";
								_this.remark = "我们正在处理中，请耐心等待！";
								_this.progress = 2 ;
							}
							//居间费退款成功
							if(obj.applyStatus == 9){
								_this.statusText = "居间费退款成功";
								_this.remark = "";
								_this.progress = 2 ;
							}
							//放款
							if(obj.status == 5&&obj.applyStatus == 5){
								_this.statusText = "放款成功";
								_this.progress = 4 ;
							}
						
					}else{
						_this.$toast(result.msg) ;
					}
				})
			},
			toModify(){
				this.$router.push({
					"path" : "/user/applyLoan"	
				})
			},
			//支付居间费
			next(){
				let _this = this ;
				_this.$post(_this.$API.GET_QUERY_PAY_TYPE)
				.then((result) => {
					console.log("居间费待付：",result)
					if('success' == result.result) {
						let data = result.data ;
						let channel = data.channel.payCode ;	//支付通道通道
						if(channel == "104") {		//104中金支付
							var zjBank = data.bankList;
							if(zjBank==null||zjBank == ""){
								_this.open() ;	//未绑卡
							}else{
								_this.$router.push({
									path:"/user/payAgencyFeeZJ",		//中金支付居间费
								}) ;
							}
						}else{
							_this.$toast("暂不可以支付居间费，请及时联系客服人员")
						} 
					}else{
						_this.$toast(result.msg)
					}
				})
			},
			open() {
		        const h = this.$createElement;
		        this.$msgbox({
			        title: '提示',
			        message: h('p', null, [
			            h('span', null, '您还未绑定'),
			            h('b', { style: 'color: teal' }, "银行卡")
			        ]),
		            showCancelButton: true,
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            beforeClose: (action, instance, done) => {
			            if (action === 'confirm') {
				            done();
			            	this.$router.push({
			            		"path" : "/user/userBank"
			            	})
			            } else {
			              	done();
			            }
		        	}
		        })
		    }
			
		},
		created(){
　　　　　　　　　this.init() ;　　　
        },
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
