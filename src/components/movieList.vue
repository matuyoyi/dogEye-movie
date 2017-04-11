<template>
  <div>
  	<v-header></v-header>
    <start v-if="!show"></start>
    <div class="movieList" v-if="show">
      <div class="movie clearfix" v-for="movie in movieList" v-on:click="gotoDetail(movie.id)">
      	<div class="img-view">
      		<img v-bind:src="movie.images.small">
      	</div>
      	<div class="summary">
      		<h3>{{movie.title}}</h3>
          <div class="clearfix">
            <star :score=movie.rating.stars></star>
          </div>
      		<p>{{movie.rating.average}}分</p>
      		<p>导演：{{movie.directors[0].name}}</p>
      		<p >主演：<span v-for="cast in movie.casts">{{cast.name}}&nbsp;&nbsp;</span></p>
      	</div>
      </div>    
    </div>
  </div>
</template>

<script>
import star from './star.vue'
import vHeader from './header.vue'
import start from './start.vue';
export default {
  name: 'movieList',
  data () {
    return {
      show: 0,
      movieList: []
    }
  },
  components: {
  	'v-header':vHeader,
  	star: star,
    start: start
  },
  mounted() {
  	this.$http.jsonp('https://api.douban.com/v2/movie/in_theaters').then(function(response){
  		this.movieList = response.body.subjects;
      this.show=1;
  	})
  },
  methods: {
  	gotoDetail: function(id){
    	this.$router.push({ name: 'movieDetail', params: { id: id }});
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


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
	font-size: 12px;
    color: #666;
    line-height: 20px;
    word-wrap:break-word;
}
</style>
