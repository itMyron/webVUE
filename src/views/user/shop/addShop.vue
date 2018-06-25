<template>
    <div>
        <section id="addShopSection">
			<header>
				<strong>请选择贷款类型:</strong>
			</header>
			<article class="news1 news clear">
				<nav>
					<span :class="bg == '2' ? 'bg' : ''" @click="addBg(2)" >流水贷</span>
					<span :class="bg == '1' ? 'bg' : ''" @click="addBg(1)" > 供应链贷</span>
					<span :class="bg == '3' ? 'bg' : ''" @click="addBg(3)" style="display: none;">商超</span>
				</nav>
			</article>
			<article class="news2 news clear">
				<div class="saasList clear">
					<el-radio-group v-model="saasId">
					    <el-radio v-for="item in saasList" :label="item.saasId" border>{{item.saasName}}</el-radio>
					</el-radio-group>
				</div>
				<p id="submit"><button @click="submit">提交</button></p>
			</article>
		</section>
    </div>
</template>
<script>
import API from "@/config/api";
import fn from "@/static/common";
import Model from "@/views/cooperate/model";
export default {
    components:{
        'model-msg' : Model
    },
    data(){
        return{
			saasList : [] ,
			typeList : [] ,
			bg : 2 ,
			saasId : '' ,
			info : '' ,
			isSkip : false
        }
    },
    methods: {
		addBg(item){
			let _this = this ;
				//获取用户店铺列表
				_this.bg = item ;
				_this.radio = "" ;
				let params={
					type:item
				}
				_this.$post(_this.$API.GET_SAASLIST,params) 
				.then((result) => {
					if(result.result == "success"){
						_this.saasList = result.data.saasList ;
						_this.typeList = result.data.typeList ;
					}else{
						_this.$toast(result.msg) ;
					}
				})
				.catch((error)=>{
					_this.$toast(error.msg)
				})
		},
		//提交saas商
		submit(){
			let _this = this ;
			if (_this.saasId == "") {
				_this.$toast("请选择SaaS商")
				return false ;
			}
			let params = {
				saasId:_this.saasId,
			}
			_this.$post(_this.$API.POST_SAAS,params) 
			.then((result) => {
				if(result.result == "success"){
					if(!result.data.isSkip){
						_this.$toast("暂不可添加此店铺")
					}else{
						window.location.href = result.data.url ;
					}
				}else{
					_this.$toast(result.msg) ;
				}
			})
			.catch((error)=>{
				_this.$toast(error.msg)
			})
		},
    },
    created(){
		this.addBg(2);
    },
}
</script>
<style lang="scss" scoped type="text/css">
    @import "./addShop.scss";
</style>
