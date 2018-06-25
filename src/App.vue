<template>
  <div id="app">
    <bmp-header  :userDate="userDate" />
    <div class="content" ref="content" >
        <router-view @getUserDate="getUserDate" @getData="getData" />
    </div>
    <bmp-footer :class="flag" />
  </div>
</template>
<script>
import Header from '@/views/header';
import Footer from '@/views/footer';
let userDate = {
			userName : "商户登录" ,
			isLogin : false 
		}
	export default {
    name: 'app',
    components:{
		'bmp-header':Header,
	  	'bmp-footer':Footer
		},
		//fixedStyle' : 'absolutedStyle
		data(){
			return{
				token:"",
				userDate ,
				height:"" ,
				flag :"absolutedStyle",// 'fixedStyle' ,
			}
		},
		methods:{
			getToken:function(data){
				this.token = data ; 
			},
			//判断底部导航是固定定位还是绝对定位
			check:function(){
				let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
				//console.log("总高：",h)
				h = h - 130-95 ;
				//console.log("余高",h)
				let height = this.$refs.content.offsetHeight;
				this.height = height ;
				//console.log("content高度：",this.$refs.content)
				if(h>height){
					this.flag = "fixedStyle" ;
				}else{
					this.flag = "absolutedStyle" ;
				}
			},
			//接收登录组件传过来的数据
			getUserDate(data){
				console.log("接收登录组件传过来的数据",data)
				this.userDate.userName = data ;
				this.userDate.isLogin = true;
			},
			getData(data){
				setTimeout(this.check, 0.00000000000001);
				//this.check() ;
			}

		},
		updated(){
			this.check() ;
			console.log()
		},
		created () {
			if(sessionStorage.getItem('userName')){
				this.userDate.userName = sessionStorage.getItem('userName');
				this.userDate.isLogin = true;	
			}
		}
		
	
	}
</script>

<style>
@charset "utf-8";
/* CSS Document */
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, input, p, blockquote, th, td { margin:0; padding:0; }
body { font:14px "微软雅黑"; color:#333; background:#fff;}

img { border:0; }
ol, ul { list-style:none; }
h1, h2, h3, h4, h5, h6{ font-size:100%; }
em { font-style:normal; }
input, button, select, textarea { outline:none; font-size: 0.32rem;} 
textarea { resize:none; }
p{ text-align:justify;}
a { color: #666; text-decoration:none; }
a:hover { color: #f60; text-decoration:none; }

.clear:after{content:"";/*里面可以为空、内容的意思*/
				visibility:hidden; /*隐藏*/
				height:0;
				display:block;
				clear:both;
				overflow:hidden;
}
.clear{zoom:1;/*这个转为解决IE6的bug的*/}

.BMap_pop ,.anchorBL{
    display: none;
}

</style>
