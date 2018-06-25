//公共js方法
let fn = {
	//获取url参数
	getUrlParam : function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if(r != null) return unescape(r[2]);
		return null; //返回参数值
	},
	//验证手机号
	checkModile : function (phone) {
		var res = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
		return res.test(phone);
	},
	//验证身份证号
	checkIdNum : function (idCard) {
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		return reg.test(idCard) ;
	},		
	//校验密码：只能输入6-20个字母、数字、下划线  
	checkPwd : function (pwd) {  
		var patrn=/^(\w){6,20}$/;  
		return patrn.test(pwd) ;
	},		
	//校验邮箱
	checkEmail : function (szMail){ 
		var szReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;  
		var bChk=szReg.test(szMail); 
		return bChk; 
	},
	//去除字符串空格
	trim : function (str){
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        result = result.replace(/\s/g,"");
        return result;
	},
	//写cookies  
	setCookie : function (c_name, value, expiredays) {　　　　
		var exdate = new Date();　　　　
		exdate.setDate(exdate.getDate() + expiredays);　　　　
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());　　
	},
	//读取cookies  
	getCookie : function (name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return(arr[2]);
		else
			return null;
	},
	//删除cookies  
	delCookie : function (name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if(cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}

export default fn;
















