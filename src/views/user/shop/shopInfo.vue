<template>
    <form id="shopInfoSectionForm">
		<section id="shopInfoSection">
			<article class="news news0 clear">
				<span>店铺信息</span>
				<a id="change" style="display: none;">修改</a>
			</article>
			<article class="news news1">
				<p class="list list1">
					<font>&lowast;</font>
					<span>店铺名称</span>
					<input id="storeName" class="state" placeholder="请填写店铺名称" type="text" ref="storeName" v-model="shopData.storeName" />
				</p>
				<p class="list list2">
					<font>&lowast;</font>
					<span>店铺地址</span>
					<input id="storeAddress" class="state" placeholder="请填写店铺地址" type="text" ref="storeAddress" v-model="shopData.storeAddress" />
				</p>
				<div class="list list3">
					<p style="display: inline-block;">
						<font>&lowast;</font>
						<span>单店年销售额</span>
						<input id="storeYearSale" class="state" placeholder="请填写单店年销售额"  onkeyup="value=value.replace(/[^\-?\d.]/g,'')" type="text" ref="storeYearSale" v-model="shopData.storeYearSale" />
						<b>(元)</b>
					</p>
					<p style="display: inline-block; float: right;">
						<font>&lowast;</font>
						<span>单店月房租</span>
						<input id="storeMonthRent" class="state" placeholder="请填写单店月房租"  onkeyup="value=value.replace(/[^\-?\d.]/g,'')" type="text" ref="storeMonthRent"  v-model="shopData.storeMonthRent" />
						<b>(元)</b>
					</p>
				</div>
				<div class="list list4">
					<p style="display: inline-block;">
						<font>&lowast;</font>
						<span>单月水电费用</span>
						<input id="monthForWaterAndElectric" class="state" placeholder="请填写单月水电费"  onkeyup="value=value.replace(/[^\-?\d.]/g,'')" type="text" ref="monthForWaterAndElectric" v-model="shopData.monthForWaterAndElectric" />	
						<b>(元)</b>
					</p>
					<p style="display: inline-block; float: right;">
						<font>&lowast;</font>
						<span>单月员工工资</span>
						<input id="monthForWages" class="state" placeholder="请填写单月员工工资"  onkeyup="value=value.replace(/[^\-?\d.]/g,'')" type="text" ref="monthForWages" v-model="shopData.monthForWages" />	
						<b>(元)</b>
					</p>
					
				</div>
				<p class="list list5">
					<font>&lowast;</font>
					<span>食材占比</span>
					<input id="percentage" class="state" placeholder="请填写食材占比"  onkeyup="value=value.replace(/[^\-?\d.]/g,'')" type="text" ref="percentage" v-model="shopData.percentage" />
					<b>(%)</b>
				</p>
				<div class="list list6">
					<p style="display: inline-block;">
						<span class="span1">工商字号名称或公司名称</span>
						<input id="commercialNames" class="state" placeholder="请填写工商字号名称或公司名称" type="text" ref="commercialNames" v-model="shopData.commercialNames" />
					</p>
					<p style="display: inline-block; float: right;">
						<font>&lowast;</font>
						<span>法定代表人姓名</span>
						<input id="legal" class="state" placeholder="请填写法定代表人姓名" type="text" ref="storeProprietor" v-model="shopData.storeProprietor" />
						<b style="padding: 0 12px;">&nbsp;</b>
					</p>
				</div>
			</article>	
			<article class="news news2">
				<p class="list list2">
					<a id="submit" class="state shopInfoSubmit" @click="subShopInfo">提交</a>
				</p>
			</article>
            <shopInfo-shopList @getImagesList = "getImagesList" :postShopInfoData = "postShopInfoData" ><!-- 图片列表 --></shopInfo-shopList>
			<article class="news4 news">
				<div class="list5 list clear">
					<span>租赁合同拍照上传</span>
					<font class="clear">
						* 首页、签章页、其他页（内容包含：租赁方、承租方、租赁地址、期限、付款方式、租金等）,最多上传十张照片
					</font>
					<div class="otherPhotoBox">
						<p class="wrap clear" v-for="(item,index) in listUrl.length">
							<a class="del" @click="del(index)">x</a>
							<input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg;capture=camera"/>
							<img id="otherPhotoList" alt="" :src="listUrl[index]" />
						</p>
						<p id="add" class="wrap clear add">
							<input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg;capture=camera"  @change="upload($event)"/>
							<strong>+</strong>
							<span>添加图片</span>
						</p>
					</div>
				</div>
			</article>
		</section>
	</form>
</template>
<script>
import API from "@/config/api";
import fn from "@/static/common";
import ShopInfoShopList from './shopInfo_photoList' ;
let shopData = {
	storeName : '' ,
	storeAddress : '' ,
	storeYearSale : '' ,
	storeMonthRent : '' ,
	monthForWaterAndElectric : '' ,
	monthForWages : '' ,
	percentage : '' ,
	commercialNames : '' ,
	storeProprietor : '' ,
	id:"" ,
	saasId : "",
	shopNo : "" ,
	storeLicensePhoto : "" ,
	idcardFrontoPhoto : "" ,
	otherPhoto : ""
}


export default {
    components:{
        'shopInfo-shopList' : ShopInfoShopList
    },
    data(){
        return{
			shopData ,
			showUrl : "" ,
			info:"" ,
			otherPhoto : [] ,
			listUrl: [] ,
        }
	},
	props: {
        "postShopInfoData":{
            type:Object,		//Array,Boolean,Number
            default:false
        }
	},
    methods: {
		//获取店铺详情信息
		getShopInfo(){
			let _this = this ;
			let params = _this.postShopInfoData.data ;
			_this.$post(_this.$API.GET_SHOPINFO,params) 
			.then((result) => {
				console.log(result)
				if(result.result == "success"){
					_this.shopData.id = result.data.store.id ;	//店铺id
					_this.shopData.storeName = result.data.store.storeName ;	//店铺名称
					_this.shopData.storeAddress = result.data.store.storeAddress ;	//店铺地址
					_this.shopData.storeYearSale = result.data.store.storeYearSale ; //年销售额
					_this.shopData.storeMonthRent = result.data.store.storeMonthRent ; //单店房租
					_this.shopData.monthForWaterAndElectric = result.data.store.monthForWaterAndElectric ; //单月水电费
					_this.shopData.monthForWages = result.data.store.monthForWages ;	//员工工资
					_this.shopData.percentage = result.data.store.percentage ;	//食材占比
					_this.shopData.commercialNames = result.data.store.commercialNames ; //公司名称
					_this.shopData.storeProprietor = result.data.store.storeProprietor ;	//法人代表
					_this.showUrl = result.data.store.showUrl	//图片地址
					_this.shopData.storeLicensePhoto = result.data.store.storeLicensePhoto	//营业执照
					_this.shopData.idcardFrontoPhoto = result.data.store.idcardFrontoPhoto	//身份证正面
					_this.shopData.saasId = result.data.store.saasId ;	//店铺id
					_this.shopData.shopNo = result.data.store.shopNo ;	//shopNO
						if(result.data.store.otherPhoto !==null){
							let otherPhoto = result.data.store.otherPhoto.split(",") ;
							for(var i = 0 ; i < otherPhoto.length-1 ; i++){
								_this.listUrl.push(_this.showUrl+otherPhoto[i].trim());
								_this.otherPhoto.push(otherPhoto[i].trim());
							}
						}
				}else{
					_this.$toast(result.msg) ;
				}
			})
			.catch((error)=>{
				_this.$toast(error.msg)
			})
		},
		//接收上传图片的数据
		getImagesList(data){
			let _this = this ;
			switch (data.index) {
				case 1: _this.shopData.storeLicensePhoto = data.img; break;
				case 2: _this.shopData.idcardFrontoPhoto = data.img; break;
			}
		},
		//提交店铺详情信息
		subShopInfo(){
			let _this = this ;
			//店铺名称不能为空
			if(_this.shopData.storeName == ""){
				_this.$toast("店铺名称不能为空") ;
				this.$refs['storeName'].focus()
				return false ;
			}
			//店铺地址不能为空
			if(_this.shopData.storeAddress == ""){
				_this.$toast("店铺地址不能为空") ;
				this.$refs['storeName'].focus()
				return false ;
			}
			//单店年销售额不能为空
			if(_this.shopData.storeYearSale == ""){
				_this.$toast("单店年销售额不能为空") ;
				this.$refs['storeYearSale'].focus()
				return false ;
			}
			//单店月房租不能为空
			if(_this.shopData.storeMonthRent == ""){
				_this.$toast("单店月房租不能为空") ;
				this.$refs['storeMonthRent'].focus()
				return false ;
			}
			//单店水电费不能为空
			if(_this.shopData.monthForWaterAndElectric == ""){
				_this.$toast("单店水电费不能为空") ;
				this.$refs['monthForWaterAndElectric'].focus()
				return false ;
			}
			//单店员工工资不能为空
			if(_this.shopData.monthForWages == ""){
				_this.$toast("单店员工工资不能为空") ;
				this.$refs['monthForWages'].focus()
				return false ;
			}
			//食材占比不能为空
			if(_this.shopData.percentage == ""){
				_this.$toast("食材占比不能为空") ;
				this.$refs['percentage'].focus()
				return false ;
			}
			//工商字号名称或公司名称不能为空
			if(_this.shopData.commercialNames == ""){
				_this.$toast("工商字号名称或公司名称不能为空") ;
				this.$refs['commercialNames'].focus()
				return false ;
			}
			//法人代表姓名不能为空
			if(_this.shopData.storeProprietor == ""){
				_this.$toast("法人代表姓名不能为空") ;
				this.$refs['storeProprietor'].focus()
				return false ;
			}
			//校验是否营业执照上传成功
			if(_this.shopData.storeLicensePhoto == ""){
				_this.$toast("请上传营业执照照片") ;
				return false ;
			}
			//校验是否身份证正面照上传成功
			if(_this.shopData.idcardFrontoPhoto == ""){
				_this.$toast("请上传身份证正面照照片") ;
				return false ;
			}
			for(var i = 0 ; i < _this.otherPhoto.length ; i++){
				_this.shopData.otherPhoto += _this.otherPhoto[i]+"," ;
				console.log(_this.shopData.otherPhoto)
			}
			let params = _this.shopData; 
			_this.$post(_this.$API.POST_SHOPINFO,params) 
			.then((result) => {
				if(result.result == "success"){
					_this.$emit("shopInfoFlag",false) ;
				}else{
					_this.$toast(result.msg) ;
				}
			})
			.catch((error)=>{
				_this.$toast(error.msg)
			})
		},
		upload(e){
			let _this = this ;
            let file = e.target.files[0];
        	if(file){
        		let formData = new FormData();
        		//限制上传图片大小
				if(file.size>5*1024*1024) {
	                
	            }else{   
	                //formData.append("fileImg", file); 
	            }
				formData.append("fileImg", file); 
				let xhr = new XMLHttpRequest();
				//监听图片上传进度 
				xhr.open("post",API.POST_IMG+"?token="+this.token, true);
				xhr.send(formData);
				xhr.onload = function() {
					var str = xhr.responseText;
					var result = JSON.parse(str);
					if(result.result == "success") {
						let imgUrl = result.data.showUrl + result.data.fileName ;
						_this.listUrl.push(imgUrl) ;
						_this.otherPhoto.push(result.data.fileName) ;
					} 
				};
        	}  //end --if
		},
		del(index){
			this.listUrl.splice(index, 1) ;
			this.otherPhoto.splice(index, 1) ;
		},
    },
    created(){
		this.getShopInfo() ;
    },
}
</script>
<style lang="scss" scoped type="text/css">
   @import "./shopInfo.scss";
</style>