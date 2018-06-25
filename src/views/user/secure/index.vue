<template>
	<div>
		<section id="secureSection">
			<article class="news1 news">
				<p class="title">
					<span>修改密码</span>
					<strong>定期更改可以让您的账户更加安全</strong>
					<a class="flag" @click = "takeOpen('1')">修改</a>
				</p>
				<div class="box" v-show = "show1">
					<p class="list1 list">
						<i></i>
						<input id="oldPwd" v-model="oldPwd" type="password" ref="oldPwd" placeholder="请输入旧密码" />
					</p>
					<p class="list2 list">
						<i></i>
						<input id="newPwd" v-model="newPwd" type="password" ref="newPwd" placeholder="请输入新密码" />
					</p>
					<p class="list3 list">
						<i></i>
						<input id="surePwd" v-model="surePwd" type="password" ref="surePwd" placeholder="确认新密码" />
					</p>
					<p class="list5 list point">{{infoPwd}}</p>
					<p class="list4 list" @click = "submitPwd()">提交</p>
				</div>
			</article>
			<article class="news2 news" style="display: none;">
				<p class="title">
					<span>高级认证</span>
					<strong>认证成功可以加快审批速度和提高放贷额度</strong>
					<a>认证</a>
				</p>
				<div>
					<p>
						<i></i>
						<input type="text" placeholder="请输入姓名" />
					</p>
					<p>
						<i></i>
						<input type="text" placeholder="请输入身份证号" />
						<font></font>
					</p>
					<p>
						<i></i>
						<input type="text" placeholder="请输入手机号" />
						<font>手机号需与贷款人手机号一致，否则将影响贷款进度</font>
					</p>
					<p>
						<input type="text" placeholder="手机服务密码" />
						<a>忘记密码？</a>
						<font>密码输入3次当天将无法再次验证，请确保密码无误。</font>
					</p>
					<p>
						<a>认证</a>
					</p>
				</div>
			</article>
			<article class="news3 news">
				<p class="title">
					<span>手机号码</span>
					<strong>可以修改您的手机号码</strong>
					<a class="flag" @click = "takeOpen('3')">修改</a>
				</p>
				<div class="box" v-show = "show3">
					<p class="list1 list">
						<i></i>
						<input id="oldphone" v-model="oldphone" type="text" ref="oldphone" placeholder="请输入原手机号码" />
					</p>
					<p class="list2 list">
						<i></i>
						<input id="password" v-model="password" type="password" ref="password" placeholder="请输入密码" />
					</p>
					<p class="list3 list">
						<i></i>
						<input id="newPhone" v-model="newPhone" type="text" ref="newPhone" placeholder="请输入新手机号码" />
					</p>
					<p class="list4 list">
						<input id="code" v-model="code" type="text" ref="code" placeholder="验证码" />
						<input id="getCode" @click="changeCode()" :class="{ changeCode: isSetCode }" :disabled="isSetCode"  type="button" v-model="setCode" />
						<i></i>
					</p>
					<p id="submit" class="list5 list" @click = "submitPhone()" >提交</p>
				</div>
			</article>
		</section>
	</div>
</template>
<script type="text/javascript">
	import API from "@/config/api";
	import fn from "@/static/common";
	let BASE64 = require('js-base64').Base64;
	export default{
		data(){
			return{
				md5 : '' ,
				show1:false,
				show3:false,
				oldPwd:"",
				newPwd:"",
				surePwd:"",
				'setCode':"获取验证码" ,
				'i':"" ,
				'isSetCode':false ,
				oldphone:"",
				password:"",
				newPhone:"",
				code:""
			}
		},
		methods:{
			takeOpen(item){
				switch(item){
					case '1' : this.show1 = !this.show1 ;this.show3 = false ; break ;
					case '3' : this.show3 = !this.show3 ;this.show1 = false ; break ;
				}
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
			//修改密码提交按钮
			submitPwd(){
				let _this = this ;
				//校验旧密码格式
				if(!fn.checkPwd(_this.oldPwd)){
					_this.$toast('旧密码格式不正取') ;
					_this.$refs['oldPwd'].focus() ;
					return false ;
				}
				//校验新密码格式
				if(!fn.checkPwd(_this.newPwd)){
					_this.$toast('新密码格式不正取') ;
					_this.$refs['newPwd'].focus() ;
					return false ;
				}
				//校验确认密码
				if(_this.surePwd != _this.newPwd){
					_this.$toast('确认密码和新密码不一致') ;
					_this.$refs['surePwd'].focus() ;
					return false ;
				}
				let params = {
					pwd : BASE64.encode(BASE64.encode(_this.oldPwd)+_this.md5) ,
					pwdNew : BASE64.encode(BASE64.encode(_this.newPwd)+_this.md5) ,
				} ;
				_this.$post(_this.$API.POST_MODIFY_PASSWORD_SUBMIT,params)
				.then((result) => {
					console.log("修改密码提交：",result)
					if(result.result == "success"){
						_this.$toast("密码修改成功") ;
						_this.$router.push({
							path:"/login",	
						}) ;
					}else{
						_this.$toast(result.msg) ;
					}
				})
				.catch((error)=>{
					_this.$toast(error.msg)
				})
			},
			//获取手机验证码，倒计时
			changeCode(){
                let _this = this ;
				if(!_this.$fn.checkModile(_this.oldphone)){
					_this.$toast('旧手机号码格式不正确')
					return false ;
                }
				if(!_this.$fn.checkModile(_this.newPhone)){
					_this.$toast('新手机号码格式不正确')
					return false ;
				}
				if(_this.oldphone == _this.newPhone){
					_this.$toast('新手机号与旧手机号不能相同')
					return false ;
				}
				_this.getCode() ;   //调取手机验证码接口
				_this.i = 60;
				var timer = setInterval(function() { 
					_this.setCode = "重新发送" + _this.i + "s" ;
					_this.isSetCode = true ;
					_this.i = _this.i - 1;
					if(_this.i < 0) {
						clearInterval(timer);
						_this.setCode = "获取验证码" ;
						_this.isSetCode = false ;
					} 
				}, 1000);
            },
			//获取手机验证码，调接口
			 getCode(){
				let _this = this ;
				let params = {
					mobilePhone:_this.newPhone,
				    codeType:1003,
				} 
				_this.$post(_this.$API.GET_MODUFY_MOBILE_AUTHCODE , params)
				.then((result) => {
					console.log(result)
					if(result.result == "success"){
						_this.$toast("发送成功")
					}else{
						_this.$toast(result.msg)
						_this.i = 0 ;
					}
				})
			},
			//修改手机号码提交按钮
			submitPhone(){
				let _this = this ;
				//校验手机验证码
				if(_this.code == "" || _this.code == null){
					_this.$toast('手机验证码不能为空') ;
					_this.$refs['code'].focus() ;
					return false ;
				}
				 //校验密码格式
				if(!_this.$fn.checkPwd(_this.password)){
					_this.$toast("密码不正确") ;
					return false ;
				}
				let params = {
					'mobilePhone':_this.oldphone,
					'mobilePhoneNew':_this.newPhone,
					'authCode': _this.code,
					'pwd': BASE64.encode(BASE64.encode(_this.password)+_this.md5),
					
				} 
				_this.$post(_this.$API.POST_MOBILE_MOBILE_SUBMIT , params)
				.then((result) => {
					console.log(result)
					if(result.result == "success"){
						_this.$toast("手机号码修改成功") ;	
					}else{
						_this.$toast(result.msg) ;
					}
				})
			}
		},
		created(){
			this.loginMd5();
		},
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
