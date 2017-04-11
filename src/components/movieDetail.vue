<template>
	<div>
		<start v-if="!show"></start>
		<div class="movieDetail" v-if="show">
			<div class="header">
				<div class="back" v-on:click="routerGo(-1)"><div></div></div>
				<h2>{{movieDetail.title}}</h2>
				<div class="box"></div>
			</div>
			<div class="movieInfo clearfix">
				 <img v-bind:src="movieDetail.images.medium">
				 <div class="info">
				 	<h3>{{movieDetail.title}}</h3>
				 	<p>{{movieDetail.rating.average}}({{movieDetail.collect_count}}评分)</p>
				 	<p>{{movieDetail.year}}年</p>
				 	<div class="loop">
				 	<p v-for="genre in movieDetail.genres">{{genre}}&nbsp;&nbsp;</p>
				 	</div>
				 	<div class="loop">
				 	<p v-for="country in movieDetail.countries">{{country}}</p>
				 	</div>
				 	<p v-for="pubdate in movieDetail.pubdates">{{pubdate}}</p>
				 </div>
			</div>
			<div class="main">
				<div class="focus_count">
					<span>{{movieDetail.wish_count}}人想看</span><span>{{movieDetail.reviews_count}}人看过</span>
				</div>
				<div class="summary">{{movieDetail.summary}}</div>
				<div class="scroll">
					<h6>演职人员</h6>
					<div class="casts">
						<div class="cast_item" v-for="item in movieDetail.directors" v-on:click="CastDetail(item.id)">
							<img v-bind:src="item.avatars.small">
							<p>{{item.name}}[导演]</p>
						</div>
						<div class="cast_item" v-for="item in movieDetail.casts" v-on:click="CastDetail(item.id)">
							<img v-bind:src="item.avatars.small">
							<p>{{item.name}}</p>
						</div>
					</div>
				</div>
				<div class="comment">
					<h6>热门短评</h6>
					<div class="item" v-for="item in movieDetail.popular_comments">
						<div class="clearfix">
							<star :score=item.rating.value*10></star>
							<p class="time">{{item.created_at}}</p>
						</div>
						<p class="cont">{{item.content}}</p>
						<div class="user clearfix">
							<img class="img_cover" v-bind:src="item.author.avatar">
							<span>{{item.author.name}}</span>
						</div>
					</div>
					<p class="toSee" v-on:click="gotoShortCmt(movieDetail.id)">查看全部短论</p>
					<p class="toSee" v-on:click="gotoComment(movieDetail.id)">查看全部影评</p>
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
			movieDetail: {
				images: '',
				rating: ''
			}
		}
	},
	components: {
		star: star,
		start: start
	},
	mounted() {
		var id = this.$route.params.id;
		this.$http.jsonp('https://api.douban.com/v2/movie/subject/'+id+'?apikey=0b2bdeda43b5688921839c8ecb20399b').then(function(response){
			this.movieDetail = response.body;
			this.show=1;
		})
	},
	methods: {
		routerGo: function(i){
			this.$router.go(i)
		},
		gotoShortCmt: function(id){
			this.$router.push({ name: 'shortCmt', params: { id: id }});
		},
		gotoComment: function(id){
			this.$router.push({ name: 'comment', params: { id: id }});
		},
		CastDetail: function(id){
			this.$router.push({ name: 'castDetail', params: { id : id}})
		}
	}
}
</script>

<style scoped>
.movieDetail {
	background-color: #e5e9f2;
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
.movieInfo {
	padding: 15px;
	color: #6b6868;
	background-color: #b4b1b1;
}
.movieInfo img {
	float: left;
}
.movieInfo .info {
	float: left;
	padding-left: 10px;
}
.movieInfo .info h3 {
	font-size: 20px;
	line-height: 30px;
	color: #000;
}
.movieInfo .info p {
	font-size: 12px;
	line-height: 20px;
}
.movieInfo .info .loop p {
	display: inline-block;
}

.main {
	padding: 10px;
}
.main .focus_count {
	text-align: center;
	padding: 10px;
}
.main .focus_count span{
	display: inline-block;
	background: #e54847;
	width: 100px;
    height: 30px;
    line-height: 30px;
	margin-left: 10px;
	margin-right: 10px;
	border-radius: 6px;
	color: #fff;
	font-size: 14px;
}
.main .summary {
	padding-top: 10px;
	padding-bottom: 16px;
    font-size: 14px;
    line-height: 20px;
    color: #555;
}
.scroll {
	height: 160px;
    margin: 0 auto;
    overflow: hidden;
}
.casts {
	white-space: nowrap;
	overflow-x: scroll;
	padding-bottom: 30px;
}
.casts .cast_item {
	display: inline-block;
	margin-right: 5px;
}
.casts .cast_item p {
	width: 70px;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
	font-size: 12px;
	line-height: 20px;
	color: #2c3e50;
}
.main h6 {
	margin-bottom: 10px;    
	font-size: 15px;
    font-weight: 700;
    color: #666;
}

.comment {
	margin-top: 20px;
}
.comment .item {
	padding-bottom: 5px;
	border-bottom: 1px solid #d6d3d3;
}

.comment .item .time {
	float: left;
	margin-left: 5px;
	color: #2c3e50;
	font-size: 12px;
}
.comment .item .cont{
	margin: 10px 0;
	line-height: 16px;
	font-size: 12px;
	color: #333;
}

.comment .item .user .img_cover {
	border-radius: 50%;
}
.comment .item .user span {
	font-size: 12px;
	color: #999;
	vertical-align: 80%;
}
.comment .toSee {
	color: #e54847;
	line-height: 30px;
	font-size: 15px;
	text-align: center;
	border-bottom: 1px solid #d6d3d3;
}
</style>