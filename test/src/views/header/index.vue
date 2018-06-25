<template>
	<div class="header">
		<h1>header content</h1>
    <ul class="nav">
      <li>
        <router-link to="/about" >关于我们</router-link>
      </li>
      <li>
        <router-link to="/data" >行业大数据</router-link>
      </li>
      <li>
        <router-link to="/loan" >商贷</router-link>
      </li>
      <li>
        <router-link to="/index" >首页</router-link>
      </li>
    </ul>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{

			}
		}
	}
</script>
<style scope>
   @import "./index.css";
</style>

