<template>
	<div class="contain">
		<header>
			<el-steps :active="1" align-center>
				<el-step title="申请贷款" description=""></el-step>
				<el-step title="贷款审批" description=""></el-step>
				<el-step title="签约" description=""></el-step>
				<el-step title="放款" description=""></el-step>
			</el-steps>
		</header>
		<section>
			<article class="list list1">
				<p class="row">
					<span>您预计可贷金额:</span>
					<strong>{{predictPrice}}</strong>
					<span>元</span>
				</p>
			</article>
			<article class="list list2">
				<p class="row">
					<span class="listTitle">希望贷款的金额:</span>
					<input type="text" v-model="hopePrice" onkeyup="value=value.replace(/[^\d.]/g,'')" placeholder="请输入贷款金额(5万~100万)" />
					<span>万元</span>
				</p>
				<p class="row">
					<span>选择还款方式:</span>
					<select v-model="products">
						<option v-for="(key,index) in productList" :value="key.id">{{key.productName}}</option>
					</select>
				</p>
			</article>
			<article class="list list3">
				<p class="p1">
					<input id="credit" type="checkbox" v-model="isChecked"/>
					<span>《</span>
					<font @click="credit = true">征信授权书</font>
					<span style="width: 2px;">》</span>
				</p>
				<p class="p2">
					<span>《</span>
					<font @click="informationAcquisition = true">信息采集及融资进度反馈授权书</font>
					<span>》</span>
				</p>
			</article>
			<article class="list list4">
				<input type="button" :style="{'opacity':opacity}" @click="submit" :disabled="flag" value="提交贷款申请" />
			</article>
		</section>
		<footer></footer>
		<modelShowCredit v-if="credit" @isShow="isShowCredit"  :name = "name" :idCard = "idCard" />
      	<modelShowInformationAcquisition v-if="informationAcquisition" @isShow="isShowCredit" :name = "name" :idCard = "idCard" />
	</div>
	
</template>
<script type="text/javascript">
	import credit from '../../../../components/certificate/credit/index' ;//征信授权书
	import informationAcquisition from '../../../../components/certificate/informationAcquisition/index' ;	  //征信授权书
	export default{
		data(){
			return{
				credit:false ,
				informationAcquisition :false ,
				isChecked : true ,
				isBaseInfo : true ,
				isShopInfo : true ,
				idCard : "" ,
				name : "" ,
				predictPrice : "" ,
				hopePrice : "" ,	
				productList : [] ,
				products : "" ,
				openText : "信息" ,
				flag:false ,
				opacity:1 ,
			}
		},
		components:{
			"modelShowCredit" : credit ,
			"modelShowInformationAcquisition" : informationAcquisition
		},
		methods :{
			isShowCredit(data){
				this.credit = data ;
				this.informationAcquisition = data ;
			},
			authorization(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_AUTHORIZATION_MSG)
				.then((result) => {
					if(result.result == "success"){
						_this.name = result.data.name ;
						_this.idCard = result.data.idCard ;
					}else{
						_this.$toast(result.msg) ;
					}
				})
			},
			//贷款信息处事化
			init(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_USER_APPLY_MSG)
				.then((result) => {
					if(result.result == "success"){
						console.log(result)
						let predictPrice = result.data.predictPrice; //预计可贷金额
						if(predictPrice==null||predictPrice<100000){
							_this.predictPrice = 100000 ;						
						}else{
							_this.predictPrice = predictPrice ;
						}
						
						_this.productList = result.data.products ; //还款方式
						_this.products = _this.productList[0].id;
						_this.isBaseInfo = result.data.basicStatus;	//是否完善基本信息
						if(!_this.isBaseInfo){
							_this.openText = "基本信息" ;
							_this.open(1) ;
							return false ;
						}
						_this.isShopInfo = result.data.shopStatus ;	//是否完善店铺信息
						if(!_this.isShopInfo){
							_this.openText = "店铺信息" ;
							_this.open(2) ;
							return false ;
						}
					}else{
						_this.$toast(result.msg) ;
					}
				})
			},
			
			submit(){
				let _this = this ;
				//校验验证码不能为空
				if(_this.hopePrice == ""||_this.hopePrice==null){
					_this.$toast("请填写希望贷款金额") ;
					return false ;
				}else if(_this.hopePrice<5||_this.hopePrice>100){
					_this.$toast("请填写正确的贷款金额") ;
					return false ;
				}
				let params={
					hopePrice : _this.hopePrice * 10000 ,	//希望贷款金额
					operateProductId : _this.products , //选择还款方式
					predictPrice : _this.predictPrice 
				}
				_this.$post(_this.$API.POST_APPLY_LOAN_SUBMIT,params)
				.then((result) => {
					if(result.result == "success"){
						//贷款详情
						_this.$router.push({
							"path" : "/user/loanDetail"
						})
					}else{
						_this.$toast(result.msg) ;
					}
				})
				.catch((error)=>{
					_this.$toast(error.msg)
				})
				
				
				
			},
			open(item) {
				// item为1未完善基本信息，2未完善店铺信息
		        const h = this.$createElement;
		        this.$msgbox({
		          title: '提示',
		          message: h('p', null, [
		            h('span', null, '您还未完善'),
		            h('b', { style: 'color: teal' }, this.openText)
		          ]),
		          showCancelButton: true,
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          showClose: false,
		          showCancelButton:false ,
		          beforeClose: (action, instance, done) => {
		            if (action === 'confirm') {
			            done();
			            if(item == 1){
			            	this.$router.push({
			            		"path" : "/user/userBaseInfo"
			            	})
			            }
			            if(item == 2){
			            	this.$router.push({
			            		"path" : "/user/userShop"
			            	})
			            }
		            } else {
		              	done();
		            }
		          }
		        })
		    }
			
		},
		watch:{
			isChecked(data){
				if(data){
					this.flag = false ;
					this.opacity = 1 ;
				}else{
					this.flag = true ;
					this.opacity = 0.4 ;
				}
			}
		},
		created(){
　　　　　　　	this.init() ;　
			this.authorization() ;　
        }
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
