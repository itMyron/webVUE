<template>
    <article class="news news2">
        <p class="list1">
            <span class="span1">输入手机号</span>
            <span class="span2">重置密码</span>
            <span class="span3">完成</span>
        </p>
        <p class="list2 list">
            <strong>您绑定的手机号码：</strong><span>{{phoneNo}}</span>
        </p>
        <p class="list3 list">
            <input id="code" type="text" placeholder="验证码" v-model="authCode"  ref="authCode" />
            <input id="getCode" @click="changeCode()" :class="{ changeCode: isSetCode }" :disabled="isSetCode"  type="button" v-model="setCode" />
            <i></i>
        </p>
        <p class="list4 list">
            <font></font>
            <input id="newPwd" type="text" ref="newPwd" v-model="newPwd" placeholder="新密码：6-18位数字或字母" />
        </p>
        <p class="list6 list" @click="next">下一步</p>
    </article>
</template>
<script type="text/javascript">
	import API from "@/config/api";
    import fn from "@/static/common";
    let BASE64 = require('js-base64').Base64;
	export default{
		data(){
			return{
				token:"",
                setCode:"获取验证码" ,
                i:"" ,
                isSetCode:false ,
                authCode : "" ,
                newPwd : "" ,
                basePwd : "" ,
                md5:"",
			}
		},
        props: {
			"phoneNo":{
				type:String,		//Array,Boolean,Number
				default:false
			}
	    },
		methods: {
            //获取MD5串
			loginMd5:function(){
                let _this = this ;
                _this.$post(_this.$API.GET_PWD_STR)
				.then((result) => {
					if(result.result == "success"){
						_this.md5 = result.data;
					}else{
						_this.$toast(result.msg) ;
					}
				})
				.catch((error)=>{
					_this.$toast(error.msg) ;
				})
			},
            //获取手机验证码，倒计时
            changeCode(){
                let _this = this ;
                if(_this.phoneNo){
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
                }else{
                	_this.$toast("无法获取到手机号码") ;
                }
            },
            //获取手机验证码，调接口
            getCode(){
               //开始请求数据
				let _this = this ;
				let params={
					mobilePhone:_this.phoneNo,
				    codeType:"1002",
				}
                _this.$post(_this.$API.GET_FORGET_PASSWORD_CODE,params)
				.then((result) => {
					if(result.result == "success"){
						_this.$toast("发送成功") ;
					}else{
						_this.$toast(result.msg) ;
                        this.i = 0 ;
					}
				})
				.catch((error)=>{
					_this.$toast(error.msg) ;
				})
            },
            //点击下一步，提交数据
            next(){
                let _this = this ;
                //校验是否填写验证码
				if(_this.authCode==""||_this.authCode==null){
					_this.$toast("请输入验证码") ;
					_this.$refs['authCode'].focus() ;
					return false ;
				}
                //校验密码格式
				if(!fn.checkPwd(_this.newPwd)){
					_this.$toast("密码格式不正取") ;
					_this.$refs['newPwd'].focus() ;
					return false ;
				}
                //开始请求数据
				let params={
                    mobilePhone : _this.phoneNo,
					authCode : _this.authCode,
					pwd : BASE64.encode(BASE64.encode(_this.newPwd)+_this.md5) ,
				}
				
				_this.$post(_this.$API.POST_NEW_PASSWORD,params)
				.then((result) => {
					console.log("第二步",result)
					if(result.result == "success"){
						_this.$emit('setInputPasswordFlag', {state:true,index:2}) ;
					}else{
						_this.$toast(result.msg) ;
					}
				})
				.catch((error)=>{
					_this.$toast(error.msg)
				})
            }
		},
		created(){
            this.loginMd5();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./inputPassword.scss";
</style>
