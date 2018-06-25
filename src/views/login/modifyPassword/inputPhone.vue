<template>
    <article class="news news1">
			<p class="list1">
				<span class="span1">输入手机号</span>
				<span class="span2">重置密码</span>
				<span class="span3">完成</span>
			</p>
			<p class="list2 list">
				<font></font>
				<input id="phoneNo" v-model="phoneNo" ref="phoneNo" type="text" placeholder="请输入您的手机号" />
			</p>
			<p class="list3 list">
				<input id="code1" v-model="code" ref="code" type="text" placeholder="验证码" />
                <img id="getCode1" @click="getCode" :src="getCodeUrl" />
				<i></i>
			</p>
			<p class="list4 list">{{info}}</p>
			<p class="list5 list" @click="next">下一步</p>
		</article>
</template>
<script type="text/javascript">
	import API from "@/config/api";
    import fn from "@/static/common";
    let anchor = {
            phoneState : true ,
            codeState : false
        }
	export default{
		data(){
			return{
                anchor ,
				getCodeUrl:"",
				type:"" ,
                phoneNo:"",
                code:"",
			}
        },
		methods: {
            //获取验证码
			getCode:function(){
				this.type = new Date().getTime() ;
				this.getCodeUrl = API.GET_LOGIN_code+'?type=' + this.type;
            },
            next:function(){
            	let _this = this ;
                //校验手机号码
				if(!fn.checkModile(_this.phoneNo)){
					_this.$toast("手机号码格式不正取") ;
                    _this.$refs['phoneNo'].focus() ;
					return false ;
				}
                //校验验证码
				if(_this.code==""||_this.code==null){
					_this.$toast("请输入验证码") ;
					_this.$refs['code'].focus() ;
					return false ;
				}
				//开始请求数据
				let params={
					authCode : _this.code,
					type : _this.type ,
				}
				_this.$post(_this.$API.POST_VERIFYIMG_CODE,params)
				.then((result) => {
					console.log("第一步",result)
					if(result.result == "success"){
						_this.$emit('setInputPhoneFlag', {state:true,index:1,phoneNo:_this.phoneNo}) ;
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
            this.getCode();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./inputPhone.scss";
</style>


