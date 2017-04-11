<template>
	<div class="star clearfix">
		<span v-bind:class="star" v-for="star in stars"></span>
	</div>
</template>

<script>
export default {
	name: 'star',
	props: ['score'],
	computed: {
		stars: function(){
			var s = [];
			var LENGTH = 5;
			var int_part = Math.floor(parseInt(this.score)/10);
			var half_part = parseInt(this.score)%10==0?0:1;
			for(var i=0;i<int_part;i++){
				s.push('on');
			}
			if(half_part){
				s.push('half');
			}
			while(s.length < LENGTH) {
				for (var i = 0; i < LENGTH-s.length; i++) {
					s.push('off');
				}
			}
			return s;
		}
	}
}
</script>

<style scoped>
.star {
	float: left;
}
.star span {
	display: block;
	float: left;
	width: 12px;
	height: 12px;
	background-repeat: no-repeat;
	background-size: 100%;
}
.star span.on {
	background-image: url('../assets/star.png');
}
.star span.half {
	background-image: url('../assets/star24_half@2x.png');
}
.star span.off {
	background-image: url('../assets/totalstar.png');
}
</style>