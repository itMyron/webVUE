<template>
	<section id="section">
		<header>
			<strong>我的账户</strong>
			<b style="font-size: 22px;padding: 0 20px;color: #a1a1a1;font-weight: 200;">&gt;</b>
			<b class="two" style="font-size: 17px;color: #a1a1a1; font-weight: 200;">{{twoNav}}</b>
		</header>
		<article class="news clear">
			<div id="nav-Left" :style="{height: height+'px'}" class="list clear">
				<nav>
					<p v-for="(key,index) in menuList" :class="[key.class,listIndex==index ? 'nav_'+(index+1) : '']" @click="listRoute(index,key.name,key.path)" >
						<b></b><i></i>
						<a>{{key.name}}</a>
					</p>
				</nav>
			</div>
			<div ref="box">
				<router-view  id="box" class="list clear"></router-view>
			</div>
		</article>
	</section>
</template>
<script type="text/javascript">
	let menuList = [
		{
			"path" : "/user/userLoan" ,
			"name" : "我要贷款" ,
			"class": "nav1"
		},
		{
			"path" : "/user/userShop" ,
			"name" : "我的店铺" ,
			"class": "nav2"
		},
		{
			"path" :"/user/userBaseInfo",
			"name" : "基本信息" ,
			"class": "nav3"
		},
		{
			"path" : "/user/userSecure",
			"name" : "安全设置" ,
			"class": "nav4"
		},
		{
			"path" : "/user/userBank",
			"name" : "我的银行卡",
			"class": "nav5"
		}
		
	]
	export default{
		data(){
			return{
				menuList ,
				setToken:"",
				listIndex:0,
				twoNav:"我要贷款" ,
				height:"" ,
			}
		},
		props: {
			
	    },
		methods:{
			listRoute(index,value,path){
				sessionStorage.setItem('listIndex', index);		//存储当前列
				let _this = this ;
				_this.listIndex = index ;
				_this.twoNav = value ;
				setTimeout(function(){
					_this.height = _this.$refs.box.offsetHeight;
					
					console.log(_this.height)
				}, 0.00000000000001);
				this.$router.push({
					path:path,	//我的账户
				}) ;
				
			},
			init(){
				if(sessionStorage.getItem('listIndex')){
					this.listIndex = sessionStorage.getItem('listIndex');
					switch (this.listIndex) {
						case 0: this.twoNav = "我要贷款" ;break;
						case 1: this.twoNav = "我的店铺" ;break;
						case 2: this.twoNav = "基本信息" ;break;
						case 3: this.twoNav = "安全设置" ;break;
						case 4: this.twoNav = "我的银行卡" ;break;
						default:this.twoNav = "我要贷款" ;
					}	
				}
				
			}
		},
		created(){
			//document.title="登录";
			this.init();
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>
