<template>
	<div>
		<start v-if='!show'></start>
		<div class="castDetail" v-if='show'>
			<div class="title">
				<div class="back" v-on:click="routerGo(-1)"></div>
				<h2>{{castDetail.name_en}}&nbsp;{{castDetail.name}}</h2>
			</div>
			 <div class="castInfo">
				 <img v-bind:src="castDetail.avatars.medium">
				 <div class="info">
				 	<h3>影星资料</h3>
				 	<p>{{castDetail.name}}</p>
				 	<p>{{castDetail.name_en}}</p>
				 	<p>{{castDetail.gender}}</p>
				 </div>
			</div>
			<div class="main">
				<h6 v-if="castDetail.gender=='男'">他的代表作品</h6>
				<h6 v-if="castDetail.gender=='女'">她的代表作品</h6>
				<div class="movieList" v-if="show">
					<div class="movie clearfix" v-for="movie in castDetail.works" v-on:click="gotoDetail(movie.subject.id)">
						<div class="img-view">
							<img v-bind:src="movie.subject.images.small">
						</div>
						<div class="summary">
							<p>{{movie.subject.title}}</p>
							<p><span v-for="role in movie.roles">{{role}}</span></p>
							<p>{{movie.subject.year}}</p>
							<div class="clearfix">
								<star :score=movie.subject.rating.stars></star>
							</div>
							<p>{{movie.subject.rating.average}}分&nbsp;&nbsp; {{movie.subject.collect_count}}评价</p>
						</div>
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
			castDetail: {
				title: '',
				images: ''
			}
		}
	},
	components: {
		star: star,
		start: start
	},
	mounted() {
		var id = this.$route.params.id;
		this.$http.jsonp('https://api.douban.com/v2/movie/celebrity/'+id).then(function(response){
			this.castDetail = response.body;
			this.show=1;
		})
	},
	methods: {
		gotoDetail: function(id) {
			this.$router.push({ name: 'movieDetail', params: { id: id }});
		},
		routerGo: function(i){
			this.$router.go(i)
		}
	}
}
</script>

<style scoped>
.castDetail {
	background-color: #e5e9f2;
}
.title {
	position: relative;
	height: 50px;
	line-height: 50px;
	background-color: #e54847;
	text-align: center;
}
.title h2{
	display: inline-block;
	width: 80%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 20px;
	color: #fff;
}
.title .back {
	position: absolute;
	left: 20px;
	top: 17px;
	width: 14px;
	height: 14px;
	border-left: 2px solid #fff;
	border-bottom: 2px solid #fff;
	transform: rotate(45deg);
}
.castInfo {
	padding: 15px;
	color: #6b6868;
	background-color: #b4b1b1;
}
.castInfo img {
	display: inline-block;
	margin-right: 10px;
}
.castInfo .info {
	display: inline-block;
	vertical-align: bottom;
	width: 45%;
}
.castInfo .info h3 {
	font-size: 25px;
	line-height: 30px;
	color: #fff;
}
.castInfo .info p {
	font-size: 20px;
	color: #f0eeee;
	font-weight: normal;
	line-height: 30px;
}
.main {
	padding: 10px;
}
.main h6 {
	color: #333;
    font-size: 18px;
    line-height: 30px;
    margin-bottom: 10px;
}
.movie {
	position: relative;
	padding-top: 10px;
	padding-bottom: 10px;
	border-bottom: 1px solid #aaa;
}

.movie .img-view {
	float: left;
}
.movie .summary {
	float: left;
	width: 69%;
	padding-left: 15px;
}

.movie .summary p {
	font-size: 14px;
    color: #2c3e50;
    line-height: 22px;
    word-wrap:break-word;
}
.movie .summary p:last-child {
	margin-top: 10px;
}
</style>