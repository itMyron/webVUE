<template>
	<div>
		<section id="baseInfoSection">
			<article class="news news1 clear">
				<span>基本信息</span>
				<a id="change" style="display: none;">修改</a>
			</article>
			<article class="news news2 clear">
				<p class="list list12 clear">
					<font>&lowast;</font>
					<strong>个人信息</strong>
				</p>
				<p class="list list1 clear">
					<font>&lowast;</font>
					<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
					<input id="userName" class="state" type="text" placeholder="请输入您的姓名" ref="userName" v-model="userData.userName"/>
				</p>
				<p  class="list list2 clear">
					<font>&lowast;</font>
					<span>身份证号码</span>
					<input id="idcardNo" class="state" type="text" placeholder="请输入您的身份证号码" ref="idcardNo" v-model="userData.idcardNo" />
				</p>
				<p class="list list3 clear">
					<font>&lowast;</font>
					<span>手机号码</span>
					<input id="mobilePhone" class="state" type="text" placeholder="请输入您的手机号码" ref="mobilePhone" v-model="userData.mobilePhone" />
				</p>
				<p class="list list20 clear" >
					<font>&lowast;</font>
					<span>银行卡号</span>
					<input id="bankCard" class="state" type="text" placeholder="请输入您的银行卡号码" ref="bankCard" v-model="userData.bankCard" />
				</p>
				<div class="list list4 clear">
					<font>&lowast;</font>
					<span style="margin-right: 4px;">居住地址</span>
					<v-distpicker :province="userData.province" :city="userData.city" :area="userData.area" @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
					
				</div>
				
				<p class="list list5 clear">
					<font>&lowast;</font>
					<span>详细地址</span>
					<input id="detailAddress" class="state" placeholder="请输入详细地址……" ref="detailAddress" v-model="userData.detailAddress" />
				</p>
				<p class="list list12 clear">
					<font>&lowast;</font>
					<strong>个人状态</strong>
				</p>
				<p class="list list6 clear">
					<font>&lowast;</font>
					<span>婚姻状况</span>
					<select id="marryType" class="state" ref="marryType" v-model="userData.marryType">
						<option value="1">已婚</option>
						<option value="2">未婚</option>
						<option value="3">离异</option>
						<option value="4">丧偶</option>
					</select>
				</p>
				<p class="list list7 clear">
					<font>&lowast;</font>
					<span>有无子女</span>
					<select id="boolenChildren" class="state" ref="boolenChildren" v-model="userData.boolenChildren" >
						<option value="1">有</option>
						<option value="2">无</option>
					</select>
				</p>
				<p class="list list8 clear">
					<font>&lowast;</font>
					<span>最高学历</span>
					<select id="educationType" class="state" ref="educationType" v-model="userData.educationType" >
						<option value="1">高中及以下</option>
						<option value="2">大专</option>
						<option value="3">本科</option>
						<option value="4">本科及以上</option>
					</select>
				</p>
				<p class="list list9 clear">
					<font>&lowast;</font>
					<span>信用状况</span>
					<select id="creditCardType" class="state" ref="creditCardType" v-model="userData.creditCardType">
						<option value="1">无信用卡或贷款</option>
                        <option value="2">信用良好</option>
                        <option value="3">1年内逾期少于3次且少于90天</option>
                        <option value="4">1年内逾期超过3次或超过90天</option>
					</select>
				</p>
				<p class="list list10 clear">
					<font>&lowast;</font>
					<span>是否购车</span>
					<select id="booleanBuyCar" class="state" ref="booleanBuyCar" v-model="userData.booleanBuyCar">
						<option value="1">无车</option>
						<option value="2">有车 有车贷</option>
						<option value="3">有车 无车贷</option>
					</select>
				</P>
				<p class="list list11 clear">
					<font>&lowast;</font>
					<span>房产状况</span>
					<select id="houseType" class="state" ref="houseType" v-model="userData.houseType" >
						<option value="1">没有房产</option>
						<option value="2">有房 有房贷</option>
						<option value="3">有房 无放贷</option>
					</select>
				</p>
			
				<p class="list list12 clear">
					<font>&lowast;</font>
					<strong>第一联系人</strong>
				</p>
				<p class="list list13 clear">
					<font>&lowast;</font>
					<span>联系人姓名</span>
					<input id="firstLinkMan" class="state" type="text" ref="firstLinkMan" v-model="userData.firstLinkMan" />
				</p>
				<p class="list list14 clear">
					<font>&lowast;</font>
					<span>手机号码</span>
					<input id="firstLinkManMobile" class="state" type="text" ref="firstLinkManMobile" v-model="userData.firstLinkManMobile" />
				</p>
				<p class="list list15 clear">
					<font>&lowast;</font>
					<span>关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系</span>
					<select id="firstRelation" class="state" ref="firstRelation" v-model="userData.firstRelation" >
						<option value="夫妻">夫妻</option>
						<option value="父母">父母</option>
						<option value="子女">子女</option>
					</select>
				</p>
				<p class="list list116 clear">
					<font>&lowast;</font>
					<strong>第二联系人</strong>
				</p>
				<p class="list list17 clear">
					<font>&lowast;</font>
					<span>联系人姓名</span>
					<input id="secondLinkMan" class="state" type="text" ref="secondLinkMan" v-model="userData.secondLinkMan" />
				</p>
				<p class="list list18 clear">
					<font>&lowast;</font>
					<span>手机号码</span>
					<input id="secondLinkManMobile" class="state" type="text" ref="secondLinkManMobile" v-model="userData.secondLinkManMobile" />
				</p>
				<p class="list list19 clear">
					<font>&lowast;</font>
					<span>关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系</span>
					<select id="secondRelation" class="state" ref="secondRelation" v-model="userData.secondRelation" >
						<option value="朋友">朋友</option>
						<option value="同学">同学</option>
						<option value="供应商">供应商</option>
						<option value="服务商">服务商</option>
					</select>
				</p>
			</article>
			<article class="news news3 clear">
				<p id="point" style="color: red; text-align: center; padding-bottom: 10px;">{{info}}</p>
				<p id="submitBaseInfo" >
					<a class="state" @click="submit">提交</a>
				</p>
			</article>
			<article class="news news4 clear">
				<photo-list @postPhotoList="postPhotoList">
					<!-- 图片地址 -->
				</photo-list>
			</article>

		</section>
	</div>
</template>
<script type="text/javascript">
	import API from "@/config/api";
	import fn from "@/static/common";
	import VDistpicker from 'v-distpicker' ;
	import PhotoList from './photoList';	//子组建图片列表
	let userData = {
		userName : '' ,
		idcardNo : '' ,
		mobilePhone : '' ,
		bankCard : '' ,
		province : '' ,
		city : '' ,
		area : '' ,
		detailAddress : '' ,
		marryType : '' ,
		boolenChildren : '' ,
		educationType : '' ,
		creditCardType : '' ,
		booleanBuyCar : '' ,
		houseType : '' ,
		firstLinkMan : '' ,
		firstLinkManMobile : '' ,
		firstRelation : '' ,
		secondLinkMan : '' ,
		secondLinkManMobile : '' ,
		secondRelation : '' ,
		cardFrontPhoto : '' ,
		cardBackPhoto : '' ,
		drivePhoto : '' ,
		houseCertificatePhoto : '' ,
		userId : '' ,
	}
	export default{
		components:{
			"photo-list" : PhotoList ,
			VDistpicker
		},
		data(){
			return{
				userData ,
				info : "" ,
			}
		},
		methods: {
			init(){
				let _this = this ;
				_this.$post(_this.$API.GET_USERMSG)
				.then((result) => {
					if(result.result == "success"){
						_this.userData.userId = result.data.userId ;
						_this.userData.userName = result.data.userName ;
						_this.userData.idcardNo = result.data.idcardNo ;
						_this.userData.mobilePhone = result.data.mobilePhone ;
						_this.userData.bankCard = result.data.bankCard ;
						_this.userData.province = result.data.province ;
						_this.userData.city = result.data.city ;
						_this.userData.area = result.data.area ;
						_this.userData.detailAddress = result.data.detailAddress ;
						_this.userData.marryType = result.data.marryType ;
						_this.userData.boolenChildren = result.data.boolenChildren ;
						_this.userData.educationType = result.data.educationType ;
						_this.userData.creditCardType = result.data.creditCardType ;
						_this.userData.booleanBuyCar = result.data.booleanBuyCar ;
						_this.userData.houseType = result.data.houseType ;
						_this.userData.firstLinkMan = result.data.firstLinkMan ;
						_this.userData.firstLinkManMobile = result.data.firstLinkManMobile ;
						_this.userData.firstRelation = result.data.firstRelation ;
						_this.userData.secondLinkMan = result.data.secondLinkMan ;
						_this.userData.secondLinkManMobile = result.data.secondLinkManMobile ;
						_this.userData.secondRelation = result.data.secondRelation ;
						_this.userData.cardFrontPhoto =result.data.cardFrontPhoto ;
						_this.userData.cardBackPhoto = result.data.cardBackPhoto ;
						_this.userData.drivePhoto = result.data.drivePhoto ;
						_this.userData.houseCertificatePhoto = result.data.houseCertificatePhoto ;
					}else{
						_this.$toast(result.msg) ;
					}
				})
				.catch((error)=>{
					_this.$toast(error.msg) ;
				})
			},
			//接收居住地址传过来的数据
			postAdress(data){
				let _this = this ;
				_this.userData.province = data.prov ;
				_this.userData.city = data.city ;
				_this.userData.area = data.district ;
			},
			//接收图片列表传过来的数据
			postPhotoList(data){
				let _this = this ;
				_this.userData.cardFrontPhoto = data.img1 ;
				_this.userData.cardBackPhoto = data.img2 ;
				_this.userData.drivePhoto = data.img3 ;
				_this.userData.houseCertificatePhoto = data.img4 ; 
			},
			submit(){
				let _this = this ;
				if(_this.userData.userName == "" ||_this.userData.userName == null){
					_this.$toast("请填写您的姓名") ;
					return false ;
				}
				if(_this.userData.idcardNo == "" ||_this.userData.idcardNo == null){
					_this.$toast("请填写您的身份证号码") ;
					return false ;
				}
				if(!_this.$fn.checkModile(_this.userData.mobilePhone)){
					_this.$toast('请正确填写手机号码')
					return false ;
				}
				if(_this.userData.bankCard == "" ||_this.userData.bankCard == null){
					_this.$toast("请填写您的银行卡号") ;
					return false ;
				}
				if(_this.userData.province == "省"||_this.userData.city == "市"||_this.userData.area == "区"){
					_this.$toast("请选择您的居住地址") ;
					return false ;
				} 
				if(_this.userData.detailAddress == ""||_this.userData.detailAddress == null){
					_this.$toast("请填写您的详细地址") ;
					return false ;
				}
				if(_this.userData.marryType == 0 ||_this.userData.marryType == ""||_this.userData.marryType == null ){
					_this.$toast("请选择您的婚姻类型") ;
					return false ;
				}
				if(_this.userData.boolenChildren == "" ||_this.userData.boolenChildren == null){
					_this.$toast("请选择您是否有子女") ;
					return false ;
				}		
				
				if(_this.userData.educationType == "" ||_this.userData.educationType == null){
					_this.$toast("请选择您的学历") ;
					return false ;
				}
				if(_this.userData.creditCardType == "" ||_this.userData.creditCardType == null){
					_this.$toast("请选择您的信用状况") ;
					return false ;
				}
				if(_this.userData.booleanBuyCar == "" || _this.userData.booleanBuyCar == null){
					_this.$toast("请选择您是否购车") ;
					return false ;
				}
				if( _this.userData.houseType == null || _this.userData.houseType == ""){
					_this.$toast("请选择您的房产状况") ;
					return false ;
				}
				if(_this.userData.firstLinkMan == ""||_this.userData.firstLinkMan == null){
					_this.$toast("请填写第一联系人姓名") ;
					return false ;
				}
				if(_this.userData.firstRelation == ""||_this.userData.firstRelation == null){
					_this.$toast("请选择与第一联系人关系") ;
					return false ;
				}
				if(!_this.$fn.checkModile(_this.userData.firstLinkManMobile)){
					_this.$toast('请正确填写第一联系人手机号码')
					return false ;
				}
				if(_this.userData.secondLinkMan == ""||_this.userData.secondLinkMan == null){
					_this.$toast("请填写第二联系人姓名") ;
					return false ;
				}
				if(_this.userData.secondRelation == "" || _this.userData.secondRelation == null){
					_this.$toast("请选择与第二联系人关系") ;
					return false ;
				}
				if(!_this.$fn.checkModile(_this.userData.secondLinkManMobile)){
					_this.$toast('请正确填写第二联系人手机号码')
					return false ;
				}
				
				if(_this.userData.cardFrontPhoto == ""||_this.userData.cardBackPhoto == ""){
					_this.$toast("请上传您的身份证照片") ;
					return false ;
				}
				let params = _this.userData ;
				_this.$post(_this.$API.POST_USERMSG,params)
				.then((result) => {
					console.log("基本信息点击提交：",result)
					if(result.result == "success"){
						_this.$toast("提交成功") ;
					}else{
						_this.$toast(result.msg) ;
					}
					document.documentElement.scrollTop=0;	//滚动条置顶
				})
				.catch((error)=>{
					_this.$toast(error.msg)
				})
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

