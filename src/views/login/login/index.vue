<template>
	<section id="loginSection" class="clear">
		<header>
			<strong>用户登录</strong>
			<span></span>
		</header>
		<article class="news news1"></article>
		<article class="news news2">
			<form id="loginForm">
				<p class="list1 list clear">
					<font></font>
					<input type="text" id="phoneNo" v-model="mobilePhone" name="mobilePhone" ref="mobilePhone" class="phoneNo" placeholder="请输入您的手机号" />
				</p>
				<p class="list2 list clear">
					<font></font>
					<input type="password" id="pwd" v-model="pwd" class="pwd" ref="pwd" placeholder="请输入密码" />
				</p>
				<p class="list3 list clear">
					<input id="code" v-model="authCode" name="authCode" ref="authCode" type="text" placeholder="验证码" />
					<img id="getCode" @click="getCode" :src="getCodeUrl" />
					<i></i>
				</p>
				<p class="list4 list clear">
					<label>
						<input id="checkBox" type="checkbox" v-model="isStore" />
						<span>记住用户名</span>
					</label>
					<a id="forget" href="#/forgotPassword">忘记密码?</a>
				</p>
				<p id="info" class="list5 list clear" style="color: red;">{{info}}</p>
				<p id="btn" @click="login" class="list6 list clear">登录</p>
				<p class="list7 list clear">
					<a id="loginWork">切换至机构登录&rarr;</a>
				</p>
			</form>	
		</article>
	</section>	
</template>
<script type="text/javascript">
	import API from "@/config/api";
	import fn from "@/static/common";
	//let BASE64 = require('js-base64').Base64;
	import Base64 from "js-base64";
	let BASE64 = Base64.Base64 ;
	import MD5 from 'js-md5';
	export default{
		data(){
			return{
				getCodeUrl:"",
				mobilePhone:"",
				pwd:"",
				authCode:"",
				info:"",
				type:"",
				md5:"",
				base64:"",
				basePwd:"",
				isStore:false
			}
		},
		methods:{
			//获取验证码
			getCode:function(){
				this.type = new Date().getTime() ;
				this.getCodeUrl = API.GET_LOGIN_code+'?type=' + this.type;
			},
			//获取MD5串
			loginMd5:function(){
				let _this = this ;
				_this.$fetch(_this.$API.GET_PWD_STR)
				.then((result) => {
					if(result.result == "success"){
						_this.md5 = result.data;
					}else{
						_this.$toast(result.msg)
					}
				})
				.catch((error)=>{
					_this.$toast(error.msg)
				});
			},
			login:function(){
				let _this = this ;
				//是否记住用户名
				if(_this.isStore){
					sessionStorage.setItem('mobilePhone',_this.mobilePhone);
				}else{
					sessionStorage.removeItem('mobilePhone');
				}
				//校验手机号码
				if(!fn.checkModile(_this.mobilePhone)){
					_this.$toast("手机号码格式不正取") ;
					_this.$refs['mobilePhone'].focus() ;
					return false ;
				}
				//校验密码格式
				if(!fn.checkPwd(_this.pwd)){
					_this.$toast("密码格式不正取") ;
					_this.$refs['pwd'].focus()
					return false ;
				}
				//校验验证码不能为空
				if(_this.authCode == ""||_this.authCode==null){
					_this.$toast("请输入验证码") ;
					_this.$refs['authCode'].focus()
					return false ;
				}	
				let params={
					mobilePhone : _this.mobilePhone ,
					pwd : BASE64.encode(BASE64.encode(_this.pwd)+_this.md5),
					authCode : _this.authCode,
					type : _this.type 
				}
				_this.$post(_this.$API.GET_LOGIN,params)
				.then((result) => {
					if(result.result == "success"){
						let token = result.data.token ;
						//存储用户名
						let user = _this.mobilePhone
						var reg = /^(\d{3})\d{4}(\d{4})$/;
		    			user = user.replace(reg, "$1****$2");
		    			sessionStorage.setItem('userName', user);
						_this.$emit("getUserDate", user)
						//存储tokien
						sessionStorage.setItem('myron', token);
						//删除之前存储的序列记录
						sessionStorage.removeItem('listIndex');
						//改变路由地址
						_this.$router.push({
							path:"/user",
						})
					}else{
						_this.$toast(result.msg) ;
						_this.getCode() ;
					}
				})
				.catch((error)=>{
					_this.$toast(error.msg)
				})
			},
			init:function(){
				//回车键登录
				let _this = this ;
				document.onkeydown=function(event){
					var e = event || window.event || arguments.callee.caller.arguments[0];      
					if(e && e.keyCode==13){ 
						_this.login()	;
					}
				}; 
			}
		},
		created(){
			//document.title="登录";
			//判断是否记住用户名状态
			if(sessionStorage.getItem('mobilePhone') != null){
				this.mobilePhone = sessionStorage.getItem('mobilePhone');
				this.isStore = true ;	
			}
			this.init();
			this.getCode();
			this.loginMd5();
		},
	}//end---export default
	
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>