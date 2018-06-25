<template>
	<section id="section">
		<article class="news1 news">
			<nav class="nav">
				<p :class="{bg:flag}">
					<a @click="flag = true">流水贷</a>
					<i></i>
				</p>
				<p :class="{bg:!flag}">
					<a @click="flag = false">供应链贷</a>
					<i></i>
				</p>
			</nav>
			<p class="photo"></p>
		</article>
		<article class="news2 news" v-if="flag">
			<p class="p1">
				<font>产品介绍</font>
			</p>
			<p class="p2">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>流水贷</strong>
				产品是基于大数据系统的云端存储数据分析设计的
				用于餐饮企业装修、修改、流动资金等融资需求的信用贷款产品。
			</p>
		</article>
		<article class="news2_2 news" v-if="!flag">
			<p class="p1">
				<font>产品介绍</font>
			</p>
			<p class="p2">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>供应链贷</strong>
				产品是基于sass平台原材料供应模块设计的，由餐饮企业向特定餐饮原材料供应商进行采购的流动资金贷款。
			</p>
		</article>
		<article class="news3 news">
			<p class="p1">
				<font>申请条件</font>
			</p>
			<p class="p2 clear">
				<span class="s1"></span>
				<span class="s2"></span>
			</p>
		</article>
		<article class="news4 news" v-if="flag">
			<p class="p1">
				<font>申请流程</font>
			</p>
			<div class="p2 clear">
				<p class="list1 list">
					<strong>准备材料</strong>
					<font>相关证件及经营证明</font>
				</p>
				<p class="list2 list">
					<strong>数据授权</strong>
					<font>根据SAAS系统获取运营数据</font>
				</p>
				<p class="list3 list">
					<strong>审核授信</strong>
					<font>大数据分析输出授信报告</font>
				</p>
				<p class="list4 list">
					<strong>签约支用</strong>
					<font>从金额机构处获得授信</font>
				</p>
			</div>
		</article>
		<article class="news4_4 news" v-if="!flag">
			<p class="p1">
				<font>申请流程</font>
			</p>
			<div class="p2 clear">
				<p class="list1 list">
					<strong>准备材料</strong>
					<font>相关证件及经营证明</font>
				</p>
				<p class="list2 list">
					<strong>数据授权</strong>
					<font>根据SAAS系统获取运营数据</font>
				</p>
				<p class="list3 list">
					<strong>审核授信</strong>
					<font>大数据分析输出授信报告</font>
				</p>
				<p class="list4 list">
					<strong>签约支用</strong>
					<font>从金额机构处获得授信</font>
				</p>
				<p class="list5 list">
					<strong>系统对接</strong>
					<font>下单流转用贷款支付货款</font>
				</p>
			</div>
		</article>
	
	</section>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				flag : true 
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
