<template>
	<div>
		<div class="start">
			<div class="rect1"></div>
			<div class="rect2"></div>
			<div class="rect3"></div>
			<div class="rect4"></div>
			<div class="rect5"></div>
		</div>
	</div>
</template>

<script></script>

<style scoped>
.start {
	margin: 100px auto;
	width: 50px;
	height: 60px;
	text-align: center;
	font-size: 10px;
}
.start div{
	display: inline-block;
	background-color: red;
	width: 6px;
	height: 100%;
	-webkit-animation: loding 1.2s infinite ease-in-out;
	animation: loding 1.2s infinite ease-in-out;
}
.start div.rect2{
	-webkit-animation-delay:-1.1s;
	animation-delay:-1.1s;
}
.start div.rect3{
	-webkit-animation-delay:-1.0s;
	animation-delay:-1.0s;
}
.start div.rect4{
	-webkit-animation-delay:-0.9s;
	animation-delay:-0.9s;
}
.start div.rect5{
	-webkit-animation-delay:-0.8s;
	animation-delay:-0.8s;
}
@-webkit-keyframes loding {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
  20% { -webkit-transform: scaleY(1.0) }
}
 
@keyframes loding {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
</style>