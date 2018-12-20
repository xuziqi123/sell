<template>
<div>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class='content-left'>
				<div class="logo-wrapper">
					<div class="logo" :class="{'highLight':totalPrice>0}">
						<i class="icon-shopping_cart" :class="{'highLight':totalPrice>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">
						{{totalCount}}
					</div>
				</div>
				<div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop.prevent="pay()" >
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>

		<!-- 曲线小球 -->
		<div class="ball-container">
			<transition-group name="drop" 
							  v-on:before-enter="beforeEnter"
							  v-on:enter="enter"
							  v-on:after-enter="afterEnter"

			>
				<div v-for="(ball,index) in balls" v-show="ball.show" class="ball" :key="index">
					<span class="inner inner-hook" :key="index"></span>
				</div>
			</transition-group>
		</div>
		<!-- 底部列表 -->
		<transition name="fold">
			<div class="shopcart-list" v-show="showList">
			<div class="list-header">
				<div class="title">购物车</div>
				<div class="empty" @click="empty()">清空</div>
			</div>
			<div class="list-content" ref="listContent">
				<ul>
					<li  class="food" v-for="food in selectFoods">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span class="price">￥{{food.price*food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
		</transition>
	</div>
	<!-- 遮罩 -->
	<transition name="fade">
		<div class="list-mask" @click="hideList()" v-show="showList"></div>
	</transition>
</div>	
</template>
<script>
import BScroll from "better-scroll";
import cartcontrol from "../carcontrol/carcontrol.vue"
	export default{
		props:{
			//通过该属性去统计选择的商品
			selectFoods:{
				type:Array,
				default(){
					return [
						{
							price:10,
							count:2
						}
					]
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		data(){
			return {
				balls:[
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
				],
				dropBall:[],
				fold:true  //购物车的详情状态，true表示折叠
			}
		},
		computed:{
			totalPrice(){
				let total=0;
				this.selectFoods.forEach((food) =>{
					total+=food.price*food.count
				});
				return total;
			},
			totalCount(){
				let total=0;
				this.selectFoods.forEach((food)=>{
					total+=food.count
				});
				return total;
			},
			payDesc(){
				if(this.totalPrice==0){
					return `￥{{this.minPrice}}起送`
				}else if(this.totalPrice<this.minPrice){
					let diff=this.minPrice-this.totalPrice
					return  `还差￥${diff}元起送`;
				}else{
					return `去结算`
				}
			},
			payClass(){
				if(this.totalPrice<this.minPrice){
					return "no-enough"
				}else{
					return "enough"
				}
			},
			showList(){
				if(!this.totalCount){
					this.fold=true;  //折叠状态
					return false
				}
				let show=!this.fold;
				//当列表显示的时候触发BScroll，为解决列表中的不能点击事件
				if(show){
					this.$nextTick(()=>{
						if(!this.scroll){
							this.scroll=new BScroll(this.$refs.listContent,{
								click:true
							})
						}else{
							this.scroll.refresh();
						}
					});
				}
				return show;
			}
		},
		methods:{
			pay(){
				if(this.totalPrice<this.minPrice){
					return;
				}
				window.alert(`一共支付￥${this.totalPrice}元`);
			},
			drop(el){
				console.log("抛物线动画");
				for(let i=0;i<this.balls.length;i++){
					let ball=this.balls[i];
					if(!ball.show){
						ball.show=true  //触发动画
						ball.el=el;
						this.dropBall.push(ball);
						return;
					}
				}
			},
			empty(){
				this.selectFoods.forEach((food)=>{
					food.count=0;
				});
			},
			hideList(){
				this.fold=true;
			},
			beforeEnter:function(el){
				//el是要加动画的元素，遍历所有的小球，找到show为true的小球进行动画
				var count=this.balls.length;
				while(count--){
					let ball=this.balls[count];
					if(ball.show){
						let rect=ball.el.getBoundingClientRect();  //获取元素的位置
						let x=rect.left-32;
						let y=-(window.innerHeight-rect.top);
						//获得初始位置
						el.style.display=""   //让其显示出来
						//外层元素做纵向动画，内层元素做横向动画
						el.style.webkitTransform=`translate3d(0,${y}px,0)`;
						el.style.transform=`translate3d(0,${y}px,0)`;
						let inner=el.getElementsByClassName("inner-hook")[0];
						inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
						inner.style.transform=`translate3d(${x}px,0,0)`;
					}
				}
			},
			enter:function(el){
				/* eslint-disable no-unused-vars */
				let rf=el.offsetHeight;
				this.$nextTick(() => {
						el.style.webkitTransform=`translate3d(0,0,0)`;
						el.style.transform=`translate3d(0,0,0)`;
						let inner=el.getElementsByClassName("inner-hook")[0];
						inner.style.webkitTransform=`translate3d(0,0,0)`;
						inner.style.transform=`translate3d(0,0,0)`;
				});
			},
			afterEnter:function(el){
				let ball=this.dropBall.shift();
				if(ball){
					ball.show=false;
					el.style.display="none";
				}
			},
			toggleList(){
				//e.stopPropagation();
				if(!this.totalCount){
					return;
				}
				this.fold=!this.fold
			}
		},
		components:{
			cartcontrol
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/mixin.styl";
.shopcart
	position:fixed
	left:0
	bottom:0
	z-index:50
	width:100%
	height:48px
	.content
		display:flex
		background:#141d27
		font-size:0
		color:rgba(255,255,255,0.4)
		.content-left
			flex:1
			.logo-wrapper
				display:inline-block
				position:relative
				top:-10px
				margin:0 12px
				padding:6px
				width:56px
				height:56px
				box-sizing:border-box
				vertical-align:top
				border-radius:50%
				background:#141d27
				.logo
					width:100%
					height:100%
					background:#2b343c
					border-radius:50%
					text-align:center
					&.highLight
						background:rgb(0,160,220)
					.icon-shopping_cart
						font-size:34px
						color:#80858a
						line-height:44px
						&.highLight
							color:#fff
				.num
					position:absolute
					top:0
					right:0
					width:24px
					height:16px
					line-height:16px
					text-align:center
					border-radius:16px
					font-size:9px
					font-weight:700
					color:#fff
					background:rgba(240,20,20,1)
					box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
			.price
				display:inline-block
				vertical-align:top
				margin-top:12px
				line-height:24px
				padding-right:12px
				box-sizing:border-box
				border-right:1px solid rgba(255,255,255,0.1)
				font-size:16px
				font-weight:700
				&.highLight
					color:#fff
				
			.desc
				display:inline-block
				vertical-align:top
				margin:12px 0 0 12px
				line-height:24px
				
				font-size:10px
		.content-right
			flex:0 0 105px
			width:105px
			.pay
				height:48px
				line-height:48px
				text-align:center
				font-size:12px
				font-weight:700
				background:#2b333b
				&.no-enough
					background:#2b333b
				&.enough
					background:#00b43c;
					color:#fff
	.ball-container
		.ball
			position:fixed
			left:32px
			bottom:22px
			z-index:200
			&.drop-enter-active,&.drop-leave-active
				transition:all 0.4s cubic-bezier(.49,-0.29,.5,-0.07)
				.inner
					display:inline-block
					width:16px
					height:16px
					border-radius:50%
					background:rgb(0,160,220)
					transition:all 0.4s linear
	.shopcart-list
		position:absolute
		left:0
		top:0
		width:100%
		z-index:-1
		transform:translate3d(0,-100%,0)
		&.fold-enter-active,&.fold-leave-active
			transition:all 0.5s			
		&.fold-enter,&.fold-leave-to
			transform:translate3d(0,0,0)
		.list-header
			height:40px
			line-height:40px
			background:#f3f5f7
			border-bottom:1px solid rgba(7,17,27,0.1)
			.title
				float:left
				font-size:14px
				color:rgb(7,17,27)
			.empty
				float:right
				font-size:12px
				color:rgb(0,160,220)
		.list-content
			padding:0 18px
			max-height:217px
			overflow:hidden
			background:#fff
			.food
				position:relative
				padding:12px 0
				box-sizing:border-box
				border-1px(rgba(7,17,27,0.1))
				.name
					line-height:24px
					font-size:14px
					color:rgb(7,17,27)
				.price
					position:absolute
					right:60px
					bottom:6px
					line-height:24px
					font-size:14px
					font-weight:700
					color:red
				.cartcontrol-wrapper
					position:absolute
					right:0
					bottom:6px
.list-mask
	position:fixed
	left:0
	top:0
	width:100%
	height:100%
	z-index:40
	background:rgba(7,17,27,0.6)
	backdrop-filter:blur(10px)
	&.fade-enter-active,&.fade-leave-active
		opacity:1
		transition:all 0.5s
	&.fade-enter,&.fade-leave-to
		opacity:1
		background:rgba(7,17,27,0)
				

				
</style>