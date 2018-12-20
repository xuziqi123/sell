<template>
<div>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" 
				:class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref="goodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h2 class="title">{{item.name}}</h2>
					<ul>
						<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img width="57px" height="57px" :src="food.icon"/>
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol @event="getEvent" :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- 购物车 -->
		<shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
	</div>
	<food :food="selectedFood" @add="getEvent" ref="food"></food>
</div>
</template>
<script>
import BScroll from "better-scroll"    /*引用滚动内容的插件*/
import shopcart from "../shopcart/shopcart.vue"
import cartcontrol from "../carcontrol/carcontrol.vue"
import food from "../food/food.vue"
const ERR_OK=0;
export default{
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return{
			goods:[],
			listHeight:[], //存放每一类food的区间高度
			scrollY:0,      //根据跟踪这个变量进行映射menu索引值
			selectedFood:{}
		};
	},
	computed:{
		//计算当前索引值
		currentIndex(){
			for(let i=0;i<this.listHeight.length;i++){
				var height1=this.listHeight[i];
				var height2=this.listHeight[i+1];
				////listHeight[length]返回undefined,所以可以用!height2做判断不是最后一个
				if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
					return i;       //在某个区间就返回某个区间的索引值
				}
			}
			return 0;
		},
		selectFoods(){
			let foods=[];
			this.goods.forEach((good)=>{
				good.foods.forEach((food)=>{
					if(food.count){
						foods.push(food);
					}
				})
			});
			return foods;
		}
	},
	created(){
		this.classMap=["decrease","discount","special","guarantee","invoice"];
		this.$http.get("/api/goods").then((response)=>{
			response=response.body;
			if(response.error==ERR_OK){
				this.goods=response.data;
				this.$nextTick( () =>{
					this._initScroll();
					this.calculateHeight();
				});
			}
		})
	},
	methods:{
		//接收子组件传来的target
		getFood(el){
			this.$nextTick(()=>{
				//goods组件调用子组件的方法
				this.$refs.shopcart.drop(el)
			})
		},
		//体验优化，异步执行下滑动画
		getEvent(el){
			this.$nextTick(()=>{
				this.$refs.shopcart.drop(el);
			})
		},
		selectMenu(index,event){
			//阻止pc端出啊发两次点击事件
			if(!event._constructed){
				return;
			}
			let foodList=this.$refs.goodsWrapper.getElementsByClassName("food-list-hook");
			let el=foodList[index];
			this.goodsCroll.scrollToElement(el, 300);

		},
		selectFood(food,event){
			if(!event._constructed){
				return;
			}
			this.selectedFood=food;
			//访问food子组件的show方法
			this.$refs.food.show();
		},
		_drop(target){

		},
		_initScroll(){
			this.menuScroll=new BScroll(this.$refs.menuWrapper,{
				click:true    
			});
			this.goodsCroll=new BScroll(this.$refs.goodsWrapper,{
				click:true,
				//探针作用，实时监听滚动位置监听事件的触发时间，1为即时触发，3为延迟到事件完毕后触发
				probeType:3     
			});
			this.goodsCroll.on("scroll",(pos)=>{
				this.scrollY=Math.abs(Math.round(pos.y));  //取一个正值的整数
			})
		},
		calculateHeight(){
			let foodList=this.$refs.goodsWrapper.getElementsByClassName("food-list-hook");
			//定义临时变量
			let height=0
			this.listHeight.push(height);
			for(let i=0;i<foodList.length;i++){
				let item=foodList[i]    		//每个大的区间块
				height+=item.clientHeight;  	//获得每个区间的高度值
				this.listHeight.push(height);	//将每个区间的高度值放在数组中
			}
		}
	},
	components:{
		shopcart,
		cartcontrol,
		food
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus//mixin.styl"
.goods
	display:flex
	position:absolute
	top:187px
	bottom:46px
	width:100%
	overflow:hidden
	.menu-wrapper
		flex:0 0 80px
		width:80px    /*为了兼容性适应andriod*/
		background:#f3f5f7
		.menu-item
			display:table   //让内容垂直居中的好办法
			height:56px
			width:54px
			line-height:14px
			padding:0 12px
			&.current
				position:relative
				margin-top:-1px
				z-index:10
				background:#fff
				font-weight:700
			.text
				display:table-cell
				vertical-align:middle
				width:56px
				font-size:12px
				border-1px(rgba(7, 17, 27, 0.6))
			.icon
				display:inline-block
				verticla-align:top
				width:12px
				height:12px
				background-size:12px 12px
				background-repeat:no-repeat
				margin-right:4px
				&.decrease
					bg-image("decrease_3")
				&.discount
					bg-image("discount_3")
				&.guarantee
					bg-image("guarantee_3")
				&.invoice
					bg-image("invoice_3")
				&.special
					bg-image("special_3")
				
	.goods-wrapper
		flex:1
		.title
			padding-left:14px
			height:26px
			line-height:26px
			border-left:2px solid #d9dde1
			font-size:12px
			color:rgba(147,153,159,0.9)
			background:#f3f5f7
		.food-item
			display:flex
			margin:18px
			padding-bottom:18px
			border-1px(rgba(7,17,27,0.1))
			&:last-child
				border-none()
				padding-bottom:0
			.icon
				flex:0 0 57px
				margin-right:10px
			.content
				flex:1
				.name
					margin:2px 0 8px 0
					height:14px
					line-height:14px
					font-size:14px
					color:rgba(7,17,27,1)
				.desc,.extra
					line-height:10px
					font-size:10px
					color:rgba(147,153,159,1)
				.desc
					margin-bottom:8px
					line-height:12px
				.extra
					.count
						margin-right:12px
				.price
					font-weight:700
					line-height:24px
					.now
						margin-right:8px
						font-size:14px
						color:rgba(240,20,20,1)
						
					.old
						text-decoration:line-through
						font-size:10px
						color:rgba(147,153,159,1)
				.cartcontrol-wrapper
					position:absolute
					right:0
					bottom:12px
				
					
			
			
</style>