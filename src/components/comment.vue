<template>
	<div>
		<start v-if="!show"></start>
		<div class="comment" v-if="show">
			<div class="header">
				<div class="back" v-on:click="routerGo(-1)"><div></div></div>
				<h2>长评--{{comment.subject.title}}</h2>
				<div class="box"></div>
			</div>
			<div class="main">
				<div class="item" v-for="(item, index) in comment.reviews" :key="comment.id">
					{{item.showDetail}}
					<p class="comment_title">
						标题：{{item.title}}
					</p>
					<div class="user clearfix">
						<img class="img_cover" v-bind:src="item.author.avatar">
						<div class="info clearfix">
							<span class="name">{{item.author.name}}</span>
							<star :score=item.rating.value*10></star>
							<p class="time">{{item.created_at}}</p>
						</div>
					</div>
					<div class="cont" v-on:click="toggle(index,$event)" >
						<div class="content" v-if="show_cont[index]">
							{{item.content}}
						</div>
						<div class="summary" v-if="!show_cont[index]">
							{{item.summary}}
						</div>
					</div>
					<p class="clearfix">
						<span class="like">{{item.useful_count}}赞同</span>
						<span class="like">{{item.useless_count}}反对</span>
					</p>
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
			show_cont:[],
			show: 0,
			comment: {}
		}
	},
	computed: {
		
	},
	components: {
		star: star,
		start: start
	},
	mounted() {
		var id = this.$route.params.id;
		this.$http.jsonp('https://api.douban.com/v2/movie/subject/'+id+'/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=20&client=something&udid=dddddddddddddddddddddd').then(function(response){
			this.comment = response.body;
			this.show = 1;
			for (var i = 0; i < this.comment.reviews.length; i++) {
				this.show_cont.push(false);
			}
		})
	},
	methods: {
		routerGo:  function(i){
			this.$router.go(i);
		},
		toggle: function(i){
			this.show_cont.splice(i, 1, !this.show_cont[i])
		}
	}
}
</script>

<style scoped>
.comment {
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
	border-bottom: 1px solid #d6d3d3;
}
.item .comment_title {
	padding: 10px 0px;
	font-size: 16px;
	line-height: 24px;
	color: #2c3e50;
}
.item .info {
	float: left;
	padding-left: 5px;
	padding-top: 16px;
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
	font-size: 12px;
	color: #2c3e50;
	overflow: hidden;
}

.item .user .img_cover {
	border-radius: 50%;
	float: left;
}
.item .user .name {
	float: left;
	width: 60px;
	overflow: hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
	font-size: 12px;
	color: #2c3e50;
}
.item .user .time {
	float: left;
}
.item .like {
	float: right;
	margin-right: 10px;
	font-size: 12px;
	color: #2c3e50;
}
</style>