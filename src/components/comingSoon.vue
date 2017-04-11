<template>
	<div class="comingSoon">
		<v-header></v-header>
        <start v-if="!show"></start>
	    <div class="main" v-if="show">
			<div class="movie clearfix" v-for="movie in comingSoon" v-on:click="comingDetail(movie.id)" >
				<div class="img-view">
					<img v-bind:src="movie.images.small">
				</div>
				<div class="summary">
					<h3>{{movie.title}}</h3>
				<div class="clearfix">
				</div>
					<p>导演：{{movie.directors[0].name}}</p>
					<p>主演：<span v-for="cast in movie.casts">{{cast.name}}&nbsp;&nbsp;</span></p>
					<p class="genre">类型：<span v-for="genre in movie.genres">{{genre}}&nbsp;&nbsp;</span></p>
				</div>
			</div>    
		</div>
	</div>
</template>

<script>
import vHeader from './header.vue'
import start from './start.vue';
export default {
	name: 'comingSoon',
	data() {
		return {
			msg: '即将上映',
			show: 0,
			comingSoon: {

			}
		}
	},
	components: {
		'v-header':vHeader,
		start: start
	},
	mounted() {
		this.$http.jsonp('https://api.douban.com/v2/movie/coming_soon').then(function(response){
	  		this.comingSoon = response.body.subjects;
	      	this.show=1;
  		})
	},
	methods: {
  	comingDetail: function(id){
    	this.$router.push({ name: 'movieDetail', params: { id: id }});
  	}
  }
}
</script>

<style scoped>

.main {
	padding-left: 20px;
	padding-right: 20px;
}
.movie {
	position: relative;
	padding: 20px 0;
	padding-bottom: 10px;
	border-bottom: 1px solid #aaa;
}
.movie .link {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
.movie .img-view {
	float: left;
}
.movie .summary {
	float: left;
	width: 69%;
	padding-left: 15px;
}
.movie .summary h3 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 15px;	
}
.movie .summary p {
	font-size: 14px;
    color: #666;
    line-height: 20px;
    word-wrap:break-word;
}
</style>