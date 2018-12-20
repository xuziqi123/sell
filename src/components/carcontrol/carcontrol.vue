<template>
	<div class="cartControl">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="cartDecrease">
				<span class="inner inner1 icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>

		
	</div>
</template>
<script>
//当给一个对象添加不存在的值时，需要引入全局的vue来进行设置值
import Vue from "vue"
	export default{
		props:{
			food:{
				type:Object
			}
		},
		created(){
			//console.log(this.food)
		},
		methods:{
			//通过修改goods=>foods=>food的count,映射到原始数据中
			addCart(event){
				if(!event._constructed){
					return
				}
				if(!this.food.count){
					Vue.set(this.food,"count",1);
				}else{
					this.food.count++
				}
				console.log(event.target);
				//将点击的按钮对象传递给goods组件
				this.$emit("event",event.target)
				
			},
			cartDecrease(event){
				if(!event._constructed){
					return;
				}
				if(this.food.count){
					this.food.count--;
				}
			},
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.cartControl
	font-size:0
	.cart-decrease
		display:inline-block
		padding:6px
		transition:all 0.4s linear
		&.move-enter-active,&.move-leave-active
			transition:all 0.4s linear
		&.move-enter,&.move-leave-active
			opacity:0
			transform: translateX(24px)
      	 	.inner1
      	 		 transform:rotate(180deg)
		.inner
			display:inline-block
			font-size:24px
			line-height:24px
			color:rgba(0,160,220,1)
			transition:all 0.4s linear
			transform:rotate(0deg)
	.cart-count
		display:inline-block
		width:12px
		vertical-align:top
		padding-top:6px
		font-size:12px
		line-height:24px
		text-align:center
		color:rgb(147,153,159)
	.cart-add,.cart-decrease
		display:inline-block
		font-size:24px
		padding:6px
		line-height:24px
		color:rgba(0,160,220,1)
			
</style>