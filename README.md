# Vue2仿饿了么app
基于vue-cli脚手架构建项目，页面中的滚动元素使用better-scroll插件实现，使用服务器端代理get请求数据

## 项目截图
<figure class="third">
    <img src="http://wx4.sinaimg.cn/mw690/0069H5XJgy1fyd86lddwcj30bg0katct.jpg" width="200"/> <img src="http://wx2.sinaimg.cn/mw690/0069H5XJgy1fyd88jf9dkj30bk0kitbs.jpg" width="200"/> <img src="http://wx4.sinaimg.cn/mw690/0069H5XJgy1fyd88nhf1nj30bg0kaad6.jpg" width="200"/> <img src="http://wx3.sinaimg.cn/mw690/0069H5XJgy1fyd9lf0n9rj30bh0kdjvc.jpg" width="200"/>
</figure>

------------


## 主要技术栈
- vue-cli:脚手架构建项目
- vue-router:实现路由切换
- webpack:打包项目文件
- es6：模块化开发
- flex:弹性盒模型布局页面
- stylus:样式编写（不推荐使用，太难伺候了，少个空格，多个空格都报错，搞死你~）
- vue中的过度动画（加入购物车那块儿使用了贝塞尔曲线）
- better-scroll:菜单联动滚动
- localStorage:本地数据存取
## 主要功能
- Goods、Ratings、Seller 组件视图均可上下滚动
- 商品页 点击左侧menu，右侧list对应跳转到相应位置
- 点击list查看商品详情页，父子组件的通信
- 评论内容可以筛选查看
- 购物车组件，包括添加删除商品及动效，购物控件与购物车组件之间为兄弟组件通信，点击购物车图标，展示已选择的商品列表
- 商家实景图片可以左右滑动
- loaclStorage 缓存商家信息（id、name）
## 组件之间的关系
|——————app.vue
&emsp;&emsp;|&emsp;&emsp;|————header.vue(头部组件)
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|————star.vue（星星评分组件）
&emsp;&emsp;|&emsp;&emsp;|————goods.vue（商品组件）
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|————food.vue（商品详情页）
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|————ratingselect.vue（评论内容帅选组件）
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|————carcontrol.vue（增加减少购物组件）
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|————shopcart.vue（购物车组件，办函小球飞入动画）
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|————carcontrol.vue（购买加减图标控件--选中数量返回给父组件goods，goods响应后，重新计算选中数量，将数据发送给购物车组件，）
&emsp;&emsp;|&emsp;&emsp;|————ratings.vue(评价组件)
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|————star.vue（星星评分组件）
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|————ratingselect.vue（评论内容帅选组件）
&emsp;&emsp;|&emsp;&emsp;|————seller.vue(商家组件)
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|————star.vue（星星评分组件）
## 项目结构
- common/---- 文件夹存放的是通用的css和fonts
- components/---- 文件夹用来存放 Vue 组件
- router/---- 文件夹存放的是vue-router相关配置（linkActiveClass,routes注册组件路由）
- build/---- 文件是 webpack 的打包编译配置文件
- config/---- 文件夹存放的是一些配置项，比如我们服务器访问的端口配置等
- dist/---- 该文件夹一开始是不存在，在项目经过 build 之后才会生成
- prod.server.js---- 该文件是测试是模拟的服务器配置，用来运行dist里面的文件，在config/index.js中,build对象中添加一条端口设置port：9000，
- App.vue---- 根组件，所有的子组件都将在这里被引用
- index.html---- 整个项目的入口文件，将会引用我们的根组件 App.vue
- main.js---- 入口文件的 js 逻辑，在 webpack 打包之后将被注入到 index.html 中

## 项目难点
**1、关于购物车添加按钮的动画**
**html代码**
- 生成一个动画小球的div,并且生成五个小球,五个是为了生成一定数量的小球来作为操作使用,按照小球动画的速度,一般来说五个也可以保证有足够的小球数量来运行动画
- 动画的内容分别是外层和内层,外层控制动画小球的轨道和方向,内层控制动画小球自身的运行状态
- 动画使用vue的js钩子实现
- 因为小球动画只有一个方向(只执行单方向从上到下滚落),所以只用了before-enter,enter,after-enter
- 用v-show控制小球的可见性,在动画执行期间可见,其余时候隐藏
```html
 <div class="ball-container">
      <div v-for="ball in balls">
      //用了两种方式的动画,css和js钩子
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
        //外层动画
          <div class="ball" v-show="ball.show">
          //内层动画
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
```
**js代码**
```javascript
 data(){
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: []
      }
    },
```
- 只要触发了drop事件,不止是drop事件里面的代码会执行,另外几个vue的js监听钩子也会一起按顺序执行
 - 触发了 drop 事件
 - beforeDrop 开始执行
 - dropping 开始执行
 - afterDrop 开始执行
 drop 事件的触发可以通过点击 cartcontrol 组件的添加小球按钮 addCart 事件触发使用 $emit ，也可以父组件 this.$refs.shopcart.drop(target); 直接触发
- 这么做的目的是实现，在子组件 cartcontrol 点击之后，可以将具体点击的 dom 传给父组件 goods 然后再传给子组件 shopcart，（因为目前他们之间的通道就是这样，shopcart子组件并没有导入cartcontrol子组件，所以没有直接通讯）这样就实现了多个组件之间的通讯（也可以使用 EventBus 和 vuex），从而可以实现需求，例如这里就是实现点击子组件 cartcontrol 后添加一个动画,将小球滑落到另外一个组件shopcart
- $emit 是触发当前实例上的事件。附加参数都会传给监听器回调。
```javascript
methods: {
      drop(el) {
      //触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { //将false的小球放到dropBalls
            ball.show = true;
            ball.el = el; //设置小球的el属性为一个dom对象
            this.dropBalls.push(ball);
            return;
          }
        }
      },

      beforeDrop(el){ //这个方法的执行是因为这是一个vue的监听事件
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
            el.style.display = ''; //清空display
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            //处理内层动画
            let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },

      dropping(el, done) { //这个方法的执行是因为这是一个vue的监听事件
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; //触发重绘html
        this.$nextTick(() => { //让动画效果异步执行,提高性能
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          //处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
        });
      },

      afterDrop(el) { //这个方法的执行是因为这是一个vue的监听事件
        let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
        if (ball) {
          ball.show = false;
          el.style.display = 'none'; //隐藏小球
        }
      }
    }
	```
- 关于 transitionend
- 关于drop方法,是实现每一个ball的show属性和el属性处理,并且点击一次会自动将一个小球放到 dropBalls 数组里面,放到里面就代表的是一个小球已经被开始执行动画,但是由于动画是异步的,所以先主动设置.
- 关于 getBoundingClientRect (位移的计算是从左上角开始)
 - 使用 getBoundingClientRect 获取到当前元素的坐标,然后需要位移的left减去元素的宽获取真正的最终位移x坐标
 - 使用 getBoundingClientRect 获取到当前元素的坐标,然后需要当前屏幕的高度减去元素的 top 再减去元素本身的高度获取到真正的最终位移 y 坐标,并且这个是负数,因为是从左上角往下的方向
- 关于html重绘
 - 因为浏览器对于重绘是有要求并且是有队列完成的,这是主要为了性能,虽然动画隐藏了小球display none,但没有触发html重绘,或者说没有立即触发html重绘,所以需要手动
 - let rf = el.offsetHeight; 这是一个手动触发html重绘的方法
 - 网页性能管理详解
 - 高性能JavaScript 重排与重绘
**css代码**
.ball-container
      .ball
        position: fixed //小球动画必须脱离html布局流
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
- 关于cubic-bezier(0.49, -0.29, 0.75, 0.41),是动画抛物曲线(贝塞尔曲线)的配置，基于css3实现，参考贝塞尔曲线与CSS3动画、SVG和canvas的基情 ,至于抛物线放在外层就是为了控制内层的元素的轨道和方向的.
