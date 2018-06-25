import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Loan from '@/views/loan/index'
import Data from '@/views/data/index'
import About from '@/views/about/index'
import Help from '@/views/help/index'
import Cooperate from '@/views/cooperate/index'
import Login from '@/views/login/login/index'
import ModifyPassword from '@/views/login/modifyPassword/index'
import User from '@/views/user/index'
import UserLoan from '@/views/user/loan/index'
import UserApplyLoan from '@/views/user/loan/applyLoan/index'
import UserLoanDetail from "@/views/user/loan/loanDetail/index"
import PayAgencyFeeZJ from "@/views/agencyFee/zhongJ/payAgencyFee/index"
import PayAgencyResultZJ from "@/views/agencyFee/zhongJ/payAgencyResult/index"
import UserSecure from '@/views/user/secure/index'
import UserShop from '@/views/user/shop/index'
import UserBaseInfo from '@/views/user/baseInfo/index'
import UserBank from '@/views/user/bank/index'
Vue.use(Router)
const routes = [
  { path: "/", component: Index },
  { path: "/index", name: "首页", component: Index },
  { path: "/loan", name: "商贷", component: Loan },
  { path: "/data", name: "行业大数据", component: Data },
  { path: "/about", name: "关于我们", component: About },
  { path: "/help", name: "帮助中心", component: Help },
  { path: "/cooperate", name: "商务合作", component: Cooperate },
  {
    path: "/user",
    name: "个人贷款中心",
    component: User,
    redirect: "/user/userLoan",
    children: [
      {
        path: "/user/userLoan",
        name: "我要贷款",
        component: UserLoan
      },
      {
        path: "/user/applyLoan",
        name: "申请贷款",
        component: UserApplyLoan
      },
      {
        path: "/user/loanDetail",
        name: "贷款审批",
        component: UserLoanDetail
      },
      {
        path: "/user/userShop",
        name: "我的店铺",
        component: UserShop
      },
      {
        path: "/user/payAgencyFeeZJ",
        name: "支付居间费（中金）",
        component: PayAgencyFeeZJ
      },
      {
        path: "/user/payAgencyResultZJ",
        name: "支付成功（中金）",
        component: PayAgencyResultZJ
      },
      {
        path: "/user/userBaseInfo",
        name: "基本信息",
        component: UserBaseInfo
      },
      {
        path: "/user/userSecure",
        name: "安全设置",
        component: UserSecure
      },
      {
        path: "/user/userBank",
        name: "我的银行卡",
        component: UserBank
      }
    ]
  },
  {
    path: "/login",
    name: "登录",
    component: Login
  },
  {
    path: "/forgotPassword",
    name: "修改密码",
    component: ModifyPassword
  }
];
export default new Router({
  routes
})
