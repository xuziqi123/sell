<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>
<script>
	const LENGTH=5
	const CLS_ON="on"
	const CLS_HALF="half"
	const CLS_OFF="off"
	export default{
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			starType(){
				return "star-"+this.size
			},
			itemClasses(){
				var result=[];
				var score=Math.floor(this.score*2)/2;  //计算分数
				var hasDecimal=score%1!==0;           //判断是不是有小数，小数的话需要半星
				var Integer=Math.floor(score);       //向下取整，判断全星的个数
				for(var i=0;i<Integer;i++){
					result.push(CLS_ON);               //向数组中添加class
				}
				if(hasDecimal){
					result.push(CLS_HALF);            //因为半星只有一个
				}
				//剩下的就只能是灰色的星星
				while(result.length<LENGTH){
					result.push(CLS_OFF);
				}

				return result;
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/mixin.styl"
.star
  font-size: 0
  .star-item
    display: inline-block
    background-repeat: no-repeat
	&.star-48
    .star-item
      width: 20px
      height: 20px
      margin-right: 22px
      background-size: 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('star48_on')
      &.half
        bg-image('star48_half')
      &.off
        bg-image('star48_off')
	&.star-36
    .star-item
      width: 15px
      height: 15px
      margin-right: 6px
      background-size: 15px 15px
      &:last-child
        margin-right: 0
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
		&.star-24
    .star-item
      width: 10px
      height: 10px
      margin-right: 3px
      background-size: 10px 10px
      &:last-child
        margin-right: 0
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
</style>