<template>
	<div class="searchPage">
		<div class="search">
			<input type="text" v-model="query" v-on:keyup.enter="search()">
			<span v-on:click="goBack(-1)">取消</span>
		</div>
		<div class="main">
			<h6>热门搜索</h6>
			<span class="btn" v-for="item in hotSearch" v-on:click="gotoDetail(item.id)">{{item.name}}</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			query: '',
			hotSearch: [
				{name: '金刚狼3', id: '25765735'},
				{name: '一条狗的使命', id: '6873143'},
				{name: '生化危机:终章', id: '20471852'},
				{name: '乐高蝙蝠侠', id: '26145033'},
				{name: '爱乐之城', id: '25934014'},
				{name: '欢乐好声音', id: '26354572'}
			]
		}
	},
	methods: {
		goBack: function(i) {
			this.$router.go(i)
		},
		gotoDetail: function(id) {
			this.$router.push({name:'movieDetail',params:{id: id}})
		},
		search: function() {
			this.$router.push({name:'searchResult',query:{name: this.query}})
		}
	}
}
</script>

<style scoped>
	.search {
		padding: 10px 0;
		text-align: center;
	}
	.search input {
		line-height: 25px;
		width: 75%;
	    border: 1px solid #e5e9f2;
		border-radius: 15px;
		outline: none;
		padding-left: 20px;
	}
	.search span {
		vertical-align: middle;
    	font-size: 15px;
    	color: #2c3e50;
    	cursor: pointer;
	}
	.main {
		padding: 10px;
	}
	.main h6 {
		padding-bottom: 10px;
		font-size: 16px;
		color: #2c3e50;
	}
	.main .btn {
		display: inline-block;
		height: 16px;
		padding: 6px 8px;
		margin-right: 5px;
    	margin-bottom: 5px;
		line-height: 16px;
		border: 1px solid #e5e9f2;
		border-radius: 15px;
		background: #fff;
		font-size: 14px;
		color: #e54847;
    	cursor: pointer;
	}
</style>