<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64px" height="64px" :src="seller.avatar"/>
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class='description'>
					{{seller.description}}将在{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>

			<div v-if="seller.supports" class="support-count" v-on:click="showDetail()">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" v-on:click="showDetail()">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" height="100%" width="100%"/>
		</div>
		<!-- 详情页面弹层 -->
		<transition name="fade">
			<div class="detail" v-show="detailShow" >
				<div class="detail-wrapper clearfix">
					<div class='detail-main'>
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score" ></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<div v-if="seller.supports" class="supports">
							<div class="support-item" v-for="(item,index) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</div>
						</div>

						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close icon-close" @click="hideDetail()"></div>
			</div>
		</transition>
	</div>
</template>
<script>
  import star from "../star/star.vue";
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				detailShow:false
			}
		},
		methods:{
			showDetail(){
				this.detailShow=true
			},
			hideDetail(){
				this.detailShow=false
			}
		},
		created(){
			this.classMap=["decrease","discount","special","guarantee","invoice"];
			console.log(star);
		},
		components: {
      		star
    	}

	}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
	.header
		position:relative
		color:#fff
		overflow:hidden
		background:rgba(7,17,27,0.5)
		.content-wrapper
			position:relative
			padding:24px 12px 28px 24px
			font-size:0 /*解决空白间距问题*/
			.avatar
				display:inline-block
				vertical-align:top
			.content
				display:inline-block
				font-size:14px
				margin-left:12px
				.title
					margin:2px 0 8px 0
					.brand
						display:inline-block
						width:30px
						height:18px
						bg-image("brand")
						background-size:30px 18px
						background-repeat:no-repeat
						vertical-align:top
					.name
						line-height:18px
						font-weight:bold
						margin-left:12px
				.description
					font-size:12px
					line-height:12px
					margin-bottom:12px
				.support
					.icon
						display:inline-block
						verticla-align:top
						width:12px
						height:12px
						background-size:12px 12px
						background-repeat:no-repeat
						margin-right:10px
						&.decrease
							bg-image("decrease_1")
						&.discount
							bg-image("discount_1")
						&.guarantee
							bg-image("guarantee_1")
						&.invoice
							bg-image("invoice_1")
						&.special
							bg-image("special_1")
					.text
						font-size:12px
						line-height:12px
			.support-count
				position:absolute
				right:12px
				bottom:14px
				padding:0 8px
				border-radius:14px
				height:24px
				line-height:24px
				background:rgba(0,0,0,0.5)
				text-align:center
				vertical-align:top
				.count
					font-size:10px
				.icon-keyboard_arrow_right
					font-size:10px
					line-height:24px
					margin-left:2px
		.bulletin-wrapper
			position:relative
			height:28px
			line-height:28px
			white-space:nowrap
			overflow:hidden
			padding:0 22px 0 12px
			text-overflow:ellipsis
			background:rgba(7,17,27,0.2)
			
			.bulletin-title
				display:inline-block
				width:22px
				height:12px
				vertical-align:top
				margin-top:8px
				bg-image("bulletin")
				background-size:22px 12px
				background-repeat:no-repeat
			.bulletin-text
				font-size:10px
				margin:0 4px
				vertical-align:top
			.icon-keyboard_arrow_right
				position:absolute
				top:10px
				right:12px
				font-size:10px
		.background
			position:absolute
			width:100%
			height:100%
			left:0
			top:0
			z-index:-1
			filter:blur(1)
		.detail
			position:fixed
			left:0
			top:0
			width:100%
			height:100%
			z-index:100
			overflow:auto
			background:rgba(7,17,27,0.7)
			backdrop:filter(10px)
			&.fade-enter-active, &.fade-leave-active
				transition:opacity 0.5s
			&.fade-enter, &.fade-leave-to
				opacity:0
			.detail-wrapper
				width:100%
				min-height:100%
				.detail-main
					margin-top:64px
					padding-bottom:64px
					.name
						font-size:16px
						line-height:16px
						text-align:center
						font-weight:bold
					.star-wrapper
						text-align:center
						margin-top:18px
						padding:2px 0
					.title
						display:flex
						width:80%
						margin:28px auto 24px auto
						.line
							flex:1
							position:relative
							top:-6px
							border-bottom:1px solid rgba(255,255,255,0.2)
						.text
							font-size:14px
							padding:0 12px
							font-weight:700
					.supports
						width:80%
						margin:0 auto
						.support-item
							padding:0 12px
							margin-bottom:12px
							font-size:0
							&.last-child
								margin-bottom:0
							.icon
								display:inline-block
								width:16px
								height:16px
								background-repeat:no-repeat
								background-size:16px 16px
								vertical-align:top
								margin-right:6px
								&.decrease
									bg-image("decrease_2")
								&.discount
									bg-image("discount_2")
								&.guarantee
									bg-image("guarantee_2")
								&.invoice
									bg-image("invoice_2")
								&.special
									bg-image("special_2")
							.text
								font-size:12px
								line-height:16px
					.bulletin
						width:80%
						margin:0 auto
						.content
							padding:0 12px
							font-size:12px
							line-height:24px
							
							
								
							
							
			.detail-close
				position:relative
				width:32px
				height:32px
				margin:-64px auto 0 auto
				clear:both
				font-size:32px
				
			
	   
</style>
