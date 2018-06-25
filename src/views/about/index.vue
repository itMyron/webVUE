<template>
		<section id="section" class="clear">
			<nav class="nav">
				<a  @click="nav(1)" :class="{bg:flag}"><b>公司概况</b></a>
				<a style="display: none;"><b>精英团队</b></a>
				<a  @click="nav(2)" :class="{bg:!flag}"><b>合作伙伴</b></a>
			</nav>
		<article class="news1 news" v-if="flag">
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;杭州鑫火信息科技有限公司，自成立伊始，即专注于以各行业SaaS平台商下的小微企业的流水经营数据作为征信依据，为其提供专业便捷的融资服务。已于2016年底获万豪投资基金数百万天使轮投资。</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目前餐饮创业群体数量多规模不大，但由于信息不对称，多数无缘获得银行的贷款资金支持。餐饮业是个资金流水密集进出的行业，日常收入和支出频繁，这过程中并不是所有餐馆都能始终保持正向现金流的，餐饮业日常资金借贷周转需求具有相当市场。我司产品“鑫火云金融”以餐饮行业为切入口，与二维火（杭州迪火信息科技有限公司旗下产品）等餐饮管理软件龙头企业展开战略合作。在提供大量真实可靠的信息数据前提下能有效降低银行及其他资金方信贷准入风险，能为银行带来大量小微企业及个体工商客户，使得银行能利用崭新形式为餐饮业提供金融服务。</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我司作为信贷居间服务商，与多家银行（如杭州银行、北京银行、浙商银行等）及金融服务公司（如聚有财等）深度合作，开拓基于SaaS行业服务商之下的小微企业批量信贷市场，提供基于企业流水及行业大数据为风控模型的信贷解决方案。拥有高素质的专业化团队，科学的管理制度，严格的风险控制体系。并由资深金融专家和银行、互联网IT等行业专业人才组成的顾问智囊团。</p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;鑫火云贷是基于大数据系统的云端存储数据分析设计的用于餐饮企业装修、改造、流动资金等融资需求的信用贷款产品。本产品的特点是基于saas平台大量的使用客户（餐饮业），进行互联网远程融资申请、系统风控模型自动筛选，并以餐饮企业云端营业额数据作为授信依据的信用贷款类产品。能提供的云端数据包括：日均流水、人均消费、单桌消费、每日每月每季的营业额等多项参考数据。本产品解决了银行对于餐饮中小企业融资的获客难、业务处理成本高、数据客观依据性差等问题。</p>
		</article>
		<article class="news2 news" style="display: none;">
			<div class="wrapNews2">
				<a class="left"></a>
				<a class="right"></a>
				<div id="banner" class="wrap">
					<ul>
						<li class="li1">
							<strong>薛超</strong>
							<font>董事长</font>
							<a>企业金融部门总经理</a>
							<a>建设银行、华夏银行、兴业银行担任支行行长</a>
							<span>
								长期从事金融行业工作，20多年银行业务、经营管理经验。
							</span>
						</li>
						<li class="li2">
							<strong>龚林</strong>
							<font>CEO兼CTO</font>
							<a>杭州威富通科技有限公司创始人</a>
							<span>
								长期从事互联网支付、金融及营销系统研发及业务服务，并且期间与支付宝、微信、翼支付以及多家银行建立了长期合作关系。<br />
								 浙江大学工商管理学位
							</span>
						</li>
						<li class="li3">
							<strong>李大学</strong>
							<font>首席战略官兼联合投资人</font>
							<a>曾任京东集团   高级副总裁、终身荣誉技术顾问</a>
							<a>北京磁云科技   CEO</a>
							<span>
								2005年获得全国五一劳动奖章
							</span>
						</li>
						<li class="li4">
							<strong>龚小林</strong>
							<font>联合创始人</font>
							<a>万银资产管理有限公司  董事长</a>
							<a>中国并购公会浙江分会  会长</a>
							<a>浙江并购俱乐部  轮值主席兼秘书长</a>
							<a>中国并购公会  常务理事</a>
							
						</li>
						<li class="li5">
							<strong>诸莉</strong>
							<font>市场总监</font>
							<a>州拉普兰贸易有限公司 创始人</a>
							<a>宝马4S  市场总监</a>
							<a>建设银行杭州分行个人金融部  经理</a>
							<span>
								北京语言大学本科
							</span>
						</li>
						<li class="li6">
							<strong>杨科锋</strong>
							<font>运营总监</font>
							<a>昆吾九鼎投资管理有限公司 华东分公司投资副总监</a>
							<a>兴业银行杭州企金部 部门经理</a>
							<a>华夏银行杭州分行 客户经理</a>
							<span>
								15年银行工作经验，对于银企业金融服务及合作，有丰富的实操及运作经验。熟悉互联网金融并付诸实践。<br />
								浙江财务大学金融工程本科
							</span>
							
						</li>
						<li class="li7">
							<strong>缪维红</strong>
							<font>首席金融顾问</font>
							<a>曾任浙江省银行业协会  秘书长</a>
							<a>曾任建设银行浙江省分行公司部  副总经理曾任</a>
							<a>建设银行杭州分行信贷处  处长</a>
							
						</li>
					</ul>	
				</div>
			</div>
			
		</article>
		<article class="news3 news"v-if="!flag">
			<ul class="clear">
				<li class="l1 l"></li>
				<li class="l2 l"></li>
				<li class="l3 l"></li>
				<li class="l4 l"></li>
				<li class="l5 l"></li>
				<li class="l6 l"></li>
				<li class="l7 l"></li>
				<li class="l8 l"></li>
				<li class="l9 l"></li>
			</ul>
			<p></p>
		</article>
	</section>	
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				flag : true 
			}
		},
		methods: {
          nav(index){
			if(index == 1){
				this.flag = true ;
			}else{
				this.flag =false ;
			}
			this.$emit("getData",true) ;
		  }  
        }
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>