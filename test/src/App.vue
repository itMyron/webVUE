<template>
  <div id="app">
    <bmp-header />
    <div class="content">
        <router-view/>
    </div>
    <bmp-footer />
  </div>
</template>

<script>
import Header from '@/views/header';
import Footer from '@/views/footer';
	export default {
    name: 'app',
    components:{
			'bmp-header':Header,
	  	'bmp-footer':Footer
		}
	}
</script>

<style>
	#app {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	  margin-top: 60px;
  }
  .content{
    padding: 80px 0 100px;
  }
</style>
