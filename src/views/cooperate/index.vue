<template>
	<section id="section" class="clear">
		<nav class="nav">
			<a class="s1">商户合作信息</a>
		</nav>
		<div id="wrap" class="clear">
			<article class="left">
			<ul>
				<li>公司地址：杭州市教工路552号</li>
				<li>杭州国际外包服务基地301室</li>
				<li>服务电话：0571-85890982</li>
				<li>工作时间：09:30-17:30</li>
			</ul>
			<div class="Ditumap">  
		        <div hidden="hidden" >
		            <input id="searchplace" style="width: 100%;" class="easyui-textbox-simple" placeholder="输入搜索关键字" />
		            <a id="s_p_search_btn" href="#" class="easyui-linkbutton" style="width: 0.8rem;" iconcls="icon-search">搜索</a>
		        </div>
		        <div style="width:100%;height:450px;border:none; float:left;" id="BaiduDitu"></div>
		        <div style="clear:both;"></div>
		    </div>
		</article>
		<article class="right">
			<div class="news1 news">
				<p class="list1 list">渠道合作</p>
				<p class="list2 list">渠道活动、SAAS渠道合作、平台合作等</p>
				<p class="list3 list">联系人：<span>杨先生</span></p>
				<p class="list4 list">邮<i style="color: #f7f9fa;">空</i>件：<font>yangkf@firedai.com</font></p>
			</div>
			<div class="news2 news">
				<p class="list1 list">金融机构合作</p>
				<p class="list2 list">金融资产业务、数据模型需求服务合作等</p>
				<p class="list3 list">联系人：<span>诸女士</span></p>
				<p class="list4 list">邮<i style="color: #f7f9fa;">空</i>件：<font>zhul@firedai.com</font></p>
			</div>
			<div class="news3 news">
				<p class="list1 list">品牌合作</p>
				<p class="list2 list">公司战略合作、媒体采访、广告合作等</p>
				<p class="list3 list">联系人：<span>龚先生</span></p>
				<p class="list4 list">邮<i style="color: #f7f9fa;">空</i>件：<font>gongl@firedai.com</font></p>
			</div>
		</article>
		</div>
	</section>
</template>
<script type="text/javascript">
	
	
	
	export default{
		data(){
			return{
								
			}
		},
		methods:{
			//百度地图
				initMap(){
				    this.createMap();//创建地图
				    this.setMapEvent();//设置地图事件
				    this.createSearch();
			 		this.createAutocomlete();
					this.searchPlace("杭州市拱墅区杭州迪火科技有限公司");
				},
				 createMap(){
				    var map = new BMap.Map("BaiduDitu");//在百度地图容器中创建一个地图
				    map.centerAndZoom('杭州',11);//设定地图的中心点和坐标并将地图显示在地图容器中
				    window.map = map;//将map变量存储在全局
				},
				//地图事件设置函数：
				 setMapEvent(){
				    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
				    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
				    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
				    map.enableKeyboard();//启用键盘上下左右键移动地图
				},
				   
				 createSearch() {
				    var map = window.map;
				    var local = new BMap.LocalSearch(map,
				        {
				            renderOptions: { map: map, panel: "searchlist" }
				        });
				    window.local = local;
				},
				//搜索
				 searchPlace(value) {
				    window.local.search(value);
				},
				createAutocomlete() {
				    var map = window.map;
				    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
				        {
				            "input": "searchplace",
				            "location": map
				        });
				},
		},
		beforecreated(){
			this.initMap();
		},
		created(){
			
		},
		mounted(){
			this.initMap();//创建和初始化地图
			 
		},
	  
		
		
		
		
		
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
