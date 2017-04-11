<template>
	<div>
		<start v-if="!show"></start>
		<div class="shortCmt" v-if="show">
			<div class="header">
				<div class="back" v-on:click="routerGo(-1)"><div></div></div>
				<h2>短评--{{shortCmt.subject.title}}</h2>
				<div class="box"></div>
			</div>
			<div class="main">
				<div class="item" v-for="item in shortCmt.comments">
					<div class="clearfix">
						<star :score=item.rating.value*10></star>
						<p class="time">{{item.created_at}}</p>
					</div>
					<p class="cont">{{item.content}}</p>
					<div class="user clearfix">
						<img class="img_cover" v-bind:src="item.author.avatar">
						<span>{{item.author.name}}</span>
						<span class="like">{{item.useful_count}}赞同</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import star from './star.vue';
import start from './start.vue';

export default {
	data() {
		return {
			show: 0,
			shortCmt: {
				title: ''
			}
		}
	},
	components: {
		star: star,
		start: start
	},
	mounted() {
		var id = this.$route.params.id;
		this.$http.jsonp('https://api.douban.com/v2/movie/subject/'+id+'/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&count=40&client=something&udid=dddddddddddddddddddddd%27').then(function(response){
			this.shortCmt = response.body;
			this.show=1;
		})
	},
	methods: {
		routerGo: function(i){
			this.$router.go(i)
		}
	}
}	
</script>

<style scoped>
.shortCmt {
	background: #e5e9f2;
}
.header {
	display: flex;
	height: 50px;
	line-height: 50px;
	background-color: #e54847;
	text-align: center;
}
.header .back {
	position: relative;
	flex: 1;
	width: 50px;
	height: 100%;
	text-align: center;
}
.header .back div{
	position: absolute;
	left: 20px;
	top: 17px;
	display: inline-block;
	width: 14px;
	height: 14px;
	border-left: 2px solid #fff;
	border-bottom: 2px solid #fff;
	transform: rotate(45deg);
}
.header h2{
	flex: 5;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 20px;
	color: #fff;
}
.header .box{
	flex: 1;
}
.main {
	padding: 10px;
}
.item {
	padding-bottom: 5px;
	padding: 10px;
	border-bottom: 1px solid #d6d3d3;
}

.item .time {
	float: left;
	margin-left: 5px;
	color: #2c3e50;
	font-size: 12px;
}
.item .cont{
	margin: 10px 0;
	line-height: 20px;
	font-size: 14px;
	color: #333;
}

.item .user .img_cover {
	border-radius: 50%;
}
.item .user span {
	font-size: 12px;
	color: #999;
	vertical-align: 150%;
}
.item .user span.like {
	float: right;
	margin-top: 18px;
	margin-right: 10px;
}
</style>