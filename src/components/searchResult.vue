<template>
	<div>
		<vHeader></vHeader>
		<start v-if="!show"></start>
		<div class="searchResult" v-if="show">
			<h1>{{searchResult.title}}，共{{searchResult.total}}条</h1>
			<div class="movie clearfix" v-for="movie in searchResult.subjects" v-on:click="gotoDetail(movie.id)">
				<div class="img-view">
					<img v-bind:src="movie.images.small">
				</div>
				<div class="summary">
					<h3>{{movie.title}}</h3>
					<div class="clearfix">
						<star :score=movie.rating.stars></star>
					</div>
					<p>{{movie.rating.average}}分 <span>({{movie.collect_count}}评价)</span></p>
					<p>{{movie.year}}年</p>
				</div>
			</div>    
		</div>
	</div>
</template>

<script>
	import start from './start.vue';
	import vHeader from './header.vue';
	import star from './star.vue';
	export default {
		data() {
			return {
				show: 0,
				val: '',
				searchResult: {

				}
			}
		},
		components: {
			vHeader: vHeader,
			star: star,
			start: start
		},
		mounted() {
			this.val = this.$route.query.name;
			this.$http.jsonp('https://api.douban.com/v2/movie/search?q='+this.val).then(function(response){
					this.searchResult = response.body
			      	this.show=1;
		  	})
		},
		methods: {
			gotoDetail: function(id) {
				this.$router.push({name: 'movieDetail',params:{id: id}})
			}
		}
	}
</script>


<style scoped>
.searchResult {
	background-color: #fff;
}
.searchResult h1 {
	text-align: center;
	padding: 15px 0;
	font-size: 20px;
	font-weight: 700;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	background-color: #f2fbfb;
}
.movie {
	position: relative;
	padding: 20px;
	padding-bottom: 10px;
	border-bottom: 1px solid #aaa;
}
.movie .img-view {
	max-width: 70px;
	float: left;
	overflow: hidden;
}
.movie .summary {
	float: left;
	width: 69%;
	padding-left: 15px;
}
.movie .summary h3 {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;	
}
.movie .summary p {
	font-size: 14px;
    color: #666;
    line-height: 28px;
    word-wrap:break-word;
}
</style>