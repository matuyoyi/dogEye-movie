<template>	
	<div>
		<div class="header clearfix">
			<div class="logo">
	        	<img src="../assets/logo.png">
	        </div>
	        <div class="slogen">
	        	<h5>{{msg}}</h5>
	        	<p>查影讯，上狗眼电影就够了！</p>
	        </div>
	        <span class="search" v-on:click="searchPage()">请输入电影名</span>
		</div>
		<ul class="nav clearfix">
	    	<li><router-link to="/inTheaters" class="v-nav">正在热映</router-link></li>
	    	<li><router-link to="/comingSoon" class="v-nav">即将上映</router-link></li>
	    </ul>
	</div>
</template>

<script type="text/javascript">
export default {
	name: 'header',
	data() {
		return {
			msg: '狗眼电影'
		}
	},
	methods: {
		searchPage: function() {
			this.$router.push({ name: 'searchPage'});
		}
	}
}
</script>
<style scoped>
.header {
    padding: 10px;
    color: #2c3e50;
    background-color: #e5e9f2;
}
.header .logo {
	float: left;
	margin-right: 5px;
}
.header .logo img {
	width: 42px;
	height: 42px;
}
.header .slogen {
	display: inline-block;
}
.header .slogen h5 {
    font-size: 17px;
    font-weight: 700;
    color: #333;
    line-height: 26px;
}
.header .slogen p {
    font-size: 12px;
    color: #999;
}
.header .search {
	float: right;
	margin-top: 7px;
	min-width: 28%;
	text-align: center;
	border-radius: 15px;
	color: #999;
	background-color: #fff;
	line-height: 30px;
	font-size: 12px;
}
.nav {
	background: #df2d2d;
}
.nav li {
	width: 50%;
	float: left;
	text-align: center;
}
.nav li .v-nav {
	text-decoration: none;
	font-size: 20px;
	height: 35px;
	line-height: 35px;
	color: #fff;
}
</style>