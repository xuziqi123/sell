<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
        <div class="tab-item">
         <router-link to="/goods"><div class="tab-link">商品</div></router-link>
        </div>
        <div class="tab-item">
         <router-link to="/ratings"><div class="tab-link">评价</div></router-link>
        </div>
        <div class="tab-item">
         <router-link to="/seller"><div class="tab-link">商家</div></router-link>
        </div>
    </div>
    <keep-alive>
       <router-view :seller="seller" ></router-view>
    </keep-alive>
   <div class="bottom">
     
   </div>
  </div>
</template>

<script>
import {urlParse} from "./common/js/util.js"
import header from "./components/header/header.vue"
const ERR_OK=0;
export default {
  name: 'App',
  data() {
    return{
      seller:{
        id:(()=>{
          let queryParam=urlParse();
          console.log(queryParam);
          return queryParam.id;
        })()
      }
    }
  },
  created(){
    this.$http.get("/api/seller/?id="+this.seller.id).then((response)=>{
        response=response.body;
        if(response.error==ERR_OK){
            this.seller=Object.assign({},this.seller,response.data);
            console.log(this.seller);
        }
    })
  },
  components:{
    "v-header":header
  }
}
</script>
<style scope lang="stylus" rel="stylesheet/stylus">
 @import './common/stylus/mixin.styl';
#app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
      & > a
          color:red
          display:block
  .router-link-active .tab-link{ 
  color:#f01414;border-bottom:1px solid #f01414;
}


</style>
