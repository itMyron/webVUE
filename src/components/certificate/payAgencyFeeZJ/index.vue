<template>
    <div class="clear">
        <div class="modelWrap">
			<div class="wrap"></div>
			<div class="box">
				<div class="modelHeader">
					<h3>借款居间服务合同</h3>
					<span @click="close()">x</span>
				</div>
				<div class="modelBody">
					
					<p class="text-list" style="font-size: 12px; color: red;">本协议由以下两方于<time>2017年7月10日</time>在浙江省杭州市签署：</p>
					<p class="text-list"><strong>甲方：</strong><span>{{creditData.userName}}</span></p>
					<p class="text-list"><strong>身份证(营业执照)号码：</strong><span>{{creditData.idCard}}</span></p>
					<p class="text-list"><strong>地址(注册地址)：</strong><span>{{creditData.address}}</span></p>
					<p class="text-list"><strong>乙方：</strong>杭州鑫火信息科技有限公司</p>
					<p class="text-list"><strong>地址：</strong>教工路552号二维火科技大厦403室</p>
					<p class="text-list"><strong>鉴于：</strong></p>
					<p class="text-list">甲方有借款需求，乙方为甲方联系合适的银行且帮助甲方获得借款，属于乙方为甲方提供了借款居间服务。因此，甲乙双方根据中华人民共和国《民法通则》、《合同法》有关规定，经平等、自愿协商一致，达成如下条款，双方遵照履行。</p>
					<p class="text-list"><strong>第一条： 合作的内容</strong></p>
					<p class="text-list">甲方委托乙方向银行联系和申请<b>{{creditData.applyAmount}}</b>元人民币的借款（具体借贷金额由银行评估审批后确定），用于甲方的实体经营，乙方接受委托。</p>
					<p class="text-list"><strong>第二条：合作的期限</strong></p>
					<p class="text-list">本合同履行以甲方向乙方支付借款居间服务费用后，银行将甲方所申请之借款到达甲方银行账户为准（甲方银行账号为银行之指定账户）。</p>
					<p class="text-list"><strong>第三条： 甲方需承担的费用：</strong></p>
					<p class="text-list">1、 银行贷款利息（详见甲方与贷款银行间签订的相关合同、协议约定）；</p>
					<p class="text-list">2、 居间服务费：当银行确定甲方所提供资料之真实性，及甲方所需借款之合理性后，乙方及时通知甲方。甲方拉到通知后，最晚截止次日，需一次性将贷款总额的居间服务费支付到乙方。该乙方通知之形式包括且不限于电话短信及其它文字方式。</p>
					<p class="text-list"><strong>第四条：居间服务费用支付标准</strong></p>
					<p class="text-list">鉴于此次借款是由乙方为甲方服务，甲方需要向乙方支付居间服务费用。该费用支付标准：由甲方与银行达成借款金额的<span>{{creditData.rate}}</span>%向乙方支付居间服务费用。该费用需支付至乙方指定账户。</p>
					<p class="text-list">账户名：<span class="openAccountName" style="text-decoration: underline;">{{creditData.openAccountName}}</span></p>
					<p class="text-list">开户行：<span class="openAccountBank" style="text-decoration: underline;">{{creditData.openAccountBank}}</span></p>
					<p class="text-list">账号：<span class="openAccount" style="text-decoration: underline;">{{creditData.openAccount}}</span></p>
					<p class="text-list"><strong>第五条：甲方职责</strong></p>
					<p class="text-list">1、 确保提供借款所需资料之真实性；</p>
					<p class="text-list">2、 积极配合乙方，以办理借款所需之相关手续；</p>
					<p class="text-list">3、 甲方及时向乙方支付居间服务费；</p>
					<p class="text-list">4、 维护乙方权益。</p>
					<p class="text-list"><strong>第六条：乙方职责</strong></p>
					<p class="text-list">1、 向甲方告知业务进展情况及提供订立合同的相关服务；</p>
					<p class="text-list">2、充分发挥资源优势，加速办理所有借款手续，在银行审批后，借款全额汇入甲方指定的账号即视为贷款成功；</p>
					<p class="text-list">3、 全面协调甲方与银行的关系；</p>
					<p class="text-list">4、 维护甲方权益。</p>
					<p class="text-list"><strong>第七条：违约责任</strong></p>
					<p class="text-list">1、 在本合同生效后，如任何一方擅自撤销委托则视作违约，违约方即须支付人民币 1 万元给守约方作为违约金；</p>
					<p class="text-list">2、 银行贷款审核通过后，甲方保证在合同规定时间内，支付居间服务费到乙方指定的账号。如有延误，甲方需按居间费用的双倍向乙方支付违约金；</p>
					<p class="text-list">3、乙方须在服务费到达后2日内通知银行将贷款汇入甲方指定的账号；</p>
					<p class="text-list">4、如因国家政策调整及甲方未能达到银行贷款条件造成银行无法放贷的，乙方对此不承担违约责任。</p>
					<p class="text-list"><strong>第八条：其它</strong></p>
					<p class="text-list">1、 本合同甲乙双方双方签字盖章后即生效，在履约完毕后自行终止；</p>
					<p class="text-list">2、 本合同一式贰份，甲乙双方各执壹份，具有同等法律效力；</p>
					<p class="text-list">3、 本合同未尽事宜，甲乙双方可协商解决；</p>
					<p class="text-list">4、本合同内容双方均有义务保守机密，不得擅自对外泄露。</p>
					<div class="clear">
						<p class="text-list" style="width: 49%; float: left;">
							<span>甲方（签字）</span>
							<font>{{creditData.userName}}</font>
						</p>
						<p class="text-list" style="width: 49%; float: left;">
							<span>乙方（盖章）</span>
							<font>杭州鑫火信息科技有限公司</font>
						</p>
						<p class="text-list" style="width: 49%; float: left;">
							<span>日期：</span>
							<font class="rq">{{new Date().toLocaleDateString()}}</font>
						</p>
						<p class="text-list" style="width: 49%; float: left;">
							<span>日期：</span>
							<font class="rq">{{new Date().toLocaleDateString()}}</font>
						</p>
					</div>
				</div>
				<div class="modelFooter">
					<button @click="close()">确定</button>
				</div>
					
			</div>
		</div>
    </div>
</template>
<script>

export default {
    data(){
        return{
			isShow:false,
        }
	},
	props: {
			"creditData":{
				type:Object,		//Array,Boolean,Number
				default:false
			}
	    },
    methods:{
        close(){
           this.$emit( "isShow",false) ;
        },
        init(){
			let data = new Date();
  			data.setTime(data.getTime());
  			this.time = data.getFullYear()+"-" + (data.getMonth()+1) + "-" + data.getDate();
		},
    },
    created(){
        this.init() ;
    }
}
</script>
<style lang="scss" scoped type="text/css">
   .modelWrap {
    .wrap {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #000000;
        z-index: 11111;
        opacity: 0.7;
    }
    .box {
        position: absolute;
        top: 100px;
        left: 20%;
        padding: 0 2.5%;
        width: 60%;
        border-radius: 5PX;
        opacity: 1;
        z-index: 99999;
        background: #ffffff;
        margin-bottom: 100px;
        .modelHeader {
			position: relative;
            text-align: center;
            padding: 12PX 24PX;
            border-bottom: 2PX solid #e5e5e5;
            span {
				position: absolute ;
				right:10PX;
				top:12PX ;
				width: 20PX ;
				height: 20PX ;
				line-height: 20PX;
                font-size: 20PX;
				color: #bbb;
				cursor: pointer;
			}
			 h3 {
                text-align: center;
                color: #000000;
                font-size: 24px;
            }
        }
        .modelBody {
            padding: 20PX 0;
            border-bottom: 2PX solid #e5e5e5;
           
            p {
                font-size: 14px;
                color: #000333;
                padding: 8px 0;
            }
        }
        .modelFooter {
            padding: 10PX 24PX;
            text-align: right;
            button {
                color: #ffffff;
                background-color: #337ab7;
                border-color: #2e6da4;
                padding: 5PX 12PX;
                border-radius: 5PX;
            }
        }
    }
}
</style>

