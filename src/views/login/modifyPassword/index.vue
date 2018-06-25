<template>
	<div id="modifyPasswordSection">
		<header>
			<input type="hidden" id="mobilePhone" />
			<strong>找回密码</strong>
			<span></span>
		</header>
		<input-phone @setInputPhoneFlag="setFlag" v-if="inputPhoneFlag"></input-phone>
		<input-password @setInputPasswordFlag="setFlag"  :phoneNo="phoneNo" v-if="inputPasswordFlag"></input-password>
		<input-done v-if="inputDoneFlag"></input-done>
	</div>
</template>
<script type="text/javascript">
	import API from "@/config/api";
	import fn from "@/static/common";
	import InputPhone from './inputPhone';	
	import InputPassword from './inputPassword';	
	import InputDone from './inputDone';	 
	export default{
		components:{
			"input-phone" : InputPhone ,
			"input-password" : InputPassword ,
			"input-done" : InputDone , 
		},
		data(){
			return{
				token:"",
				inputPhoneFlag : true ,
				inputPasswordFlag : false ,
				inputDoneFlag : false ,
				phoneNo:""
			}
		},
		methods: {
			setFlag:function(data){
				console.log(data)
				if(data.state){
					switch (data.index) {
						case 1:
							this.inputPhoneFlag = false ;
							this.inputPasswordFlag = true;
							this.phoneNo = data.phoneNo ;
							break;
						case 2:
							this.inputPasswordFlag = false ;
							this.inputDoneFlag = true;
							break;
					}
				}
			}
		},
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>