<template>
	<div class="footer">
		<footer id="footer">
			<ul class="link">
				<li class="list1 list" data-index = "1" @click="about">关于鑫火云贷</li>
				<li class="list2 list" data-index = "2" @click="help">帮助中心</li>
				<li class="list3 list" data-index = "3" style="cursor: no-drop;">招贤纳士</li>
				<li class="list4 list" data-index = "4" @click="cooperate">商务合作</li>
				<li class="list5 list" data-index = "5" style="border: none;cursor: no-drop;">友情链接</li>
			</ul>
			<div class="copyright">
				<a></a>
				<font>
					copyright &copy; 2014-2017鑫火云贷浙ICP备17002012号&nbsp;&nbsp;|&nbsp;&nbsp;
				</font>
				<span>
					杭州鑫火信息科技有限公司
				</span>
			</div>
		</footer>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{

			}
		}, 
		methods:{
			// 关于鑫火云贷
			about(){	
				this.$router.push({
                    path:"about",
                    query:{}
                });
			},
			//帮助中心
			help(){
				this.$router.push({
					path:"help"
				})
			},
			//上午合作
			cooperate(){
				this.$router.push({
					path:"cooperate"
				})
			},
		},
		created(){
			
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./index.scss";
</style>


