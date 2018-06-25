<template>
   <article class="news news3">
        <p class="list1">
            <span class="span1">输入手机号</span>
            <span class="span2">重置密码</span>
            <span class="span3">完成</span>
        </p>
        <div class="list2 list">
            <p>恭喜您重置密码成功！</p>
            <p>现在可以使用新密码登录鑫火云贷</p>
        </div>
        <p class="list3 list" @click="goLogin">立即登录</p>
    </article>
</template>
<script type="text/javascript">
	import API from "@/config/api";
	import fn from "@/static/common";
	export default{
		data(){
			return{
				
			}
		},
		methods: {
			
			goLogin(){
				this.$router.push({
					path:"/login",
				})
			}
		},
		created(){
			
		}
	}
</script>
<style lang="scss" scoped type="text/css">
   @import "./inputDone.scss";
</style>