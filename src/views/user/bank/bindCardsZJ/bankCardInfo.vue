<template>
	<form id="addBankCardSectionForm">
        <article class="news1 clear">
            <p class="list1 list clear">
                <font>&lowast;</font>
                <span>账户名称</span>
                <input type="text" placeholder="请输入您的账户名称" ref="accountName" v-model="bankData.accountName" />
            </p>
            <p class="list2 list clear">
                <font>&lowast;</font>
                <span>身份证号码</span>
                <input type="text" onkeyup="value=value.replace(/[^\d.]/g,'')" placeholder="请输入您的身份证号码" ref="idNumber" v-model="bankData.idNumber" />
            </p>
            <p class="list3 list clear">
                <font>&lowast;</font>
                <span>银行名称</span>
                <select ref="bank_id" v-model="bankData.bank_value" >
                    <option v-for="key in bankList" :value="key.id+','+key.name">{{key.name}}</option>
                </select>
            </p>
            <p class="list4 list clear">
                <font>&lowast;</font>
                <span>银行卡号</span>
                <input type="text" onkeyup="value=value.replace(/[^\d.]/g,'')" placeholder="请输入您的银行卡号" ref="account_number" v-model="bankData.account_number" />
            </p>
            <p class="list5 list clear">
                <font>&lowast;</font>
                <span>预留手机号</span>
                <input type="text" onkeyup="value=value.replace(/[^\d.]/g,'')" placeholder="请输入您的预留手机号" ref="bank_reserved_phone" v-model="bankData.bank_reserved_phone" />
            </p>
            <p class="list6 list clear">
                <font>&lowast;</font>
                <span>手机验证码</span>
                <input ref="verifyCode" type="text" onkeyup="value=value.replace(/[^\d.]/g,'')" placeholder="验证码" v-model="bankData.verifyCode" />
                <input id="getCode" @click="changeCode()" :class="{ changeCode: isSetCode }" :disabled="isSetCode"  type="button" v-model="setCode" />
                <i></i>
            </p>
        </article>
        <input type="hidden" value="10" name="bank_card_type" />
        <input type="hidden" name="txSNBinding" id="txSNBinding" />
        <p class="point">{{info}}</p>
        <article class="news2 clear">
            <a id="cancle" @click="cancel">取消</a>
            <a id="submit" @click="submit">提交</a>
        </article>
	</form>
</template>
<script>
import API from "@/config/api";
import fn from "@/static/common";
let bankData = {
    accountName : "" ,
    idNumber : "" ,
    bank_value : "" ,
    account_number : "" ,
    bank_reserved_phone : "" ,
    verifyCode : "" ,
    token : "" ,
    bank_card_type : "10" ,
    txSNBinding : "" 
} ;
let bankList = [						//中金对接银行
                {id:"104",name:"中国银行"},
                {id:"102",name:"工商银行"},
                {id:"105",name:"建设银行"},
                {id:"103",name:"农业银行"},
                {id:"303",name:"光大银行"},
                {id:"302",name:"中信银行"},
                {id:"307",name:"平安银行"},
                {id:"100",name:"邮储银行"},
                {id:"301",name:"交通银行"},
                {id:"309",name:"兴业银行"},
                {id:"306",name:"广发银行"},
                {id:"316",name:"浙商银行"},
                {id:"310",name:"浦发银行"},
                {id:"401",name:"上海银行"},
                {id:"424",name:"南京银行"},
				] ;
export default {
    components:{
        
    },
    data(){
        return{
            bankData ,
            bankList ,
            token:"",
            setCode:"获取验证码" ,
            i:"" ,
            isSetCode:false ,
            authCode : "" ,
            info : ""
        }
    },
    methods: {
        init(){
            let _this = this ;
            let params = _this.userData ;
			_this.$post(_this.$API.GET_USER_MESSAGE,params)
			.then((result) => {
				console.log("瀚华绑定银行卡：",result)
				if(result.result == "success"){
					_this.bankData.accountName = result.data.name ;
					_this.bankData.idNumber = result.data.idCard ;
					_this.bankData.bank_reserved_phone = result.data.tel ;
				}else{
					_this.$toast(result.msg) ;
				}
			})
			.catch((error)=>{
				_this.$toast(error.msg)
			})
        },
        //获取手机验证码
        getCode(){
            let _this = this ;
            let params=  _this.bankData ;
			_this.$post(_this.$API.GET_BANK_CODE,params)
			.then((result) => {
				console.log("提交验证码：",result);
                if(result.result == "success"){
                    _this.bankData.txSNBinding = result.data.txSNBinding ;
                }else{
                    _this.info = result.msg ;
                    this.i = 0 ;
                }
			})
			.catch((error)=>{
				_this.$toast("服务器出问题，请及时联系客服人员") ;
				this.i = 0 ;
			})            
        },
        //获取手机验证码，倒计时
        changeCode(){
            let _this = this ;
            //校验是否填写账户名称
            if(_this.bankData.accountName == "" || _this.bankData.accountName ==null){
                _this.$toast("请输入您的账户名称") ;
                _this.$refs['accountName'].focus() ;
                return false ;
            }
            //校验身份证号码
            if(_this.bankData.idNumber == "" || _this.bankData.idNumber == null){
                _this.$toast("请输入您的正确身份证号码") ;
                _this.$refs['idNumber'].focus() ;
                return false ;
            }
            //校验银行名称
            if(_this.bankData.bank_value == "" || _this.bankData.bank_value ==null){
                _this.$toast("请输入您的银行名称") ;
                return false ;
            }
            //校验银行卡号
            if(_this.bankData.account_number == "" || _this.bankData.account_number ==null){
                _this.$toast("请输入您的银行卡号") ;
                _this.$refs['account_number'].focus() ;
                return false ;
            }
            //校验预留手机号码
            if(!fn.checkModile(_this.bankData.bank_reserved_phone)){
                _this.$toast("请正确输入您的预留手机号") ;
                _this.$refs['bank_reserved_phone'].focus() ;
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
        //点击取消按钮
        cancel(){
        	this.$emit('turnCheck', false) ;
        },
        //提交数据
        submit(){
            let _this = this ;
            let params=  _this.bankData ;
            _this.$post(_this.$API.POST_BANK_DATA,params)
			.then((result) => {
				console.log("提交数据结果：",result);
                if(result.result == "success"){
                    _this.$emit('turnCheck', false) ;
                }else{
                    _this.$toast(result.msg) ;
                }
			})
			.catch((error)=>{
				_this.$toast(error.msg) ;
			}) 
        }
    },
    created(){
        this.init();
    },
}
</script>
<style lang="scss" scoped type="text/css">
   @import "./bankCardInfo.scss";
</style>