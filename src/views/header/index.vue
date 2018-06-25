<template>
	<div class="headerWrap">
		<div class="headerTop">
			<p>
				<a class="list1" href="http://web.firedai.com/login.html">合作机构登录</a>
				<a class="list4" href="#/login" v-if="!userDate.isLogin">{{userDate.userName}}</a>
				<el-dropdown  class="list5" v-else="userDate.isLogin" @command="handleCommand" >
				  	<span class="el-dropdown-link">
				    	{{userDate.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
				  	</span>
				  	<el-dropdown-menu class="el-dropdown-menu" slot="dropdown">
					    <el-dropdown-item command="outlogin">退出</el-dropdown-item>
				  	</el-dropdown-menu>
				</el-dropdown>				
				<span class="list3">咨询热线：<b>0571-85890982</b></span>
				<a class="list2"  v-show ="userDate.isLogin" @click="handleClick">我要贷款</a>
			</p>
		</div>
		<div class="headerBottom">
			<ul class="nav">
		      <li v-for="item in menuList">
		        <router-link :to ="item.path">{{item.name}}</router-link>
		      </li>
		    </ul>
		</div>	
	</div>
</template>
<script type="text/javascript">
import API from "@/config/api";
	let menuList = [
		{
			"path" : "/about" ,
			"name" : "关于我们"
		},
		{
			"path" : "/data" ,
			"name" : "行业大数据"
		},
		{
			"path" : "/loan" ,
			"name" : "商贷"
		},
		{
			"path" : "/index" ,
			"name" : "首页"
		}
		
	]
	export default{
		data(){
			return{
				menuList,
				isShow:false,
				state:1 ,
				user : '',
				token:""
			}
		},
		props: {
			"userDate":{
				type:Object,		//Array,Boolean,Number
				default:false
			}
	    },
		methods:{
			handleClick(){
				this.$router.push({
					path:"/user",
					query:{
						id:1,
						name:11
					}
				})
			},
			handleCommand(command) {
        		let _this = this ;
        		let request = new Request(API.GET_OUTLOGIN+"?token="+_this.token,{
				    headers: {},
				    method : "get",
			 		mode: "cors",
			 		redirect : "follow",
				});
				fetch(request)
				    .then((response) => {
    				//返回 object 类型
			        return response.json();
			    })
			    .then((result) => {
			    	console.log("退出：",result) ;
					if(result.result == "success"){
						sessionStorage.removeItem('myron');
						sessionStorage.removeItem('userName');
						_this.userDate.isLogin = false ;
						_this.userDate.userName = "商户登录" ;
						//改变路由地址
						_this.$router.push({
							path:"/login",
							query:{
								//id:1,
								//name:11
							}
						})
					}else{
						_this.info = result.msg ;
						_this.getCode() ;
					}
			    })
				.catch((error)=>{
				    this.info = error.msg ;
				});
        		
        		
        		
        		
      		},
			init:function(){
				this.token = sessionStorage.getItem('token');
				//console.log("用户名字：",this.userDate)
			}
		},
		created(){
			this.init();
		},
		mounted(){
			
		},
		watch: {
	        $route(to) {
	            console.log(to)
	        }
    	}

	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
    .el-dropdown-wrap{
   		float: right;
    }
    .el-dropdown-link {
    	cursor: pointer;
    	color: #FF5001;
    }
    .el-icon-arrow-down {
    	font-size: 12px;
    }
    .el-dropdown-menu{
    	width: 100px;
    	text-align: center;
    	top: 30px !important;
    	li{
    		color: red;
    	}
    }
    
</style>


