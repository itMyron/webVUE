let root = process.env.API_ROOT ;

let API = {
  // 接口备注
  GET_PWD_STR: root + "/pc/login/get", //获取MD5加密串
  GET_LOGIN_code: root + "/pc/login/getImgCode", //登录页面验证码接口
  GET_LOGIN: root + "/pc/login/login", //登录接口
  GET_OUTLOGIN: root + "/pc/login/loginOut", //用户退出接口
  POST_IMG: root + "/pc/fileResource/uploadImg.do", // 接收上传文件的后台地址
  POST_VERIFYIMG_CODE: root + "/pc/login/verifyImgCode", //忘记密码第一步，验证校验码
  GET_FORGET_PASSWORD_CODE: root + "/app/login/getAuthCode", //忘记密码第二步，获取手机验证码
  POST_NEW_PASSWORD: root + "/pc/login/forgetPaw", //忘记密码第二步，提交新密码
  GET_USER_ISLOAN: root + "/pc/loan/isLoanApply", //判断用户是否可申请贷款
  POST_APPLY_LOAN_SUBMIT: root + "/pc/loan/applyLoanAdd",//贷款申请提交
  GET_USER_APPLY_MSG: root + "/pc/loan/applyLoan",//贷款信息初始化--贷款详情
  GET_QUERY_PAY_TYPE: root + "/pc/loan/queryPayType", //贷款详情去支付居间费
  GET_PAY_AGENCY_ZJ_MSG: root + "/pc/loan/queryPayType", //中金支付页面初始化
  GET_MOBILE_CODE: root + "/pc/zj/getBankInfoVerifyCode.do", //中金绑卡手机验证码
  GET_BANK_CARD_SUBMIT: root + "/pc/zj/bindBankInfo.do", //中金绑卡信息提交
  POST_PAY_CODE_ZJ: root + "/pc/zj/getPayVerifyCode.do", //中金支付居间费获取验证码
  POST_FAST_PAY_ZJ: root + "/pc/zj/fastPay.do", //中金支付居间费提交
  POST_FAST_PAY_RESULT_ZJ: root + "/app/loan/queryPayLoanResult", //中金支付居间费结果
  GET_AUTHORIZATION_MSG:root + "/pc/user/myAccount" , //获取授权人信息
  POST_WECHAT: root + "/app/login/webpageAuthorize", //用户申请贷款，微信授权接口
  GET_SHOPLIST: root + "/pc/user/shopList", //获取用户店铺列表
  GET_SHOPINFO: root + "/pc/user/findStoreMessage", //获取店铺信息
  POST_SHOPINFO: root + "/pc/user/renewalStore", //提交店铺信息
  POST_SHOPSWITCH: root + "/pc/user/shopSwitchover", //切换店铺
  GET_SAASLIST: root + "/pc/user/saasList", //获取saas商列表
  POST_SAAS: root + "/pc/user/saasAuthUrl", //提交saas上授权
  GET_USERMSG: root + "/pc/user/findUserMessage", //获取基本信息
  POST_USERMSG: root + "/pc/user/renewalUser.do", //提交基本信息
  GET_BANKLIST: root + "/pc/user/bankInfoList", //获取银行卡列表
  GET_USER_MESSAGE: root + "/app/user/myAccount", //绑定银行卡，获取个人信息
  GET_BANK_CODE: root + "/pc/zj/getBankInfoVerifyCode.do", //添加银行获取手机验证码
  POST_BANK_DATA: root + "/pc/zj/bindBankInfo.do" ,   //添加银行卡，提交数据
  POST_MODIFY_PASSWORD_SUBMIT: root + "/pc/user/updatePaw" ,  //修改密码提交
  GET_MODUFY_MOBILE_AUTHCODE: root + "/pc/login/getAuthCode" ,   //修改手机号码获取验证码
  POST_MOBILE_MOBILE_SUBMIT: root + "/pc/user/updateMobilePhone" ,   //修改手机号码提交
};

export default API;
