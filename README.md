# Vue2�¶���ôapp
����vue-cli���ּܹ�����Ŀ��ҳ���еĹ���Ԫ��ʹ��better-scroll���ʵ�֣�ʹ�÷������˴���get��������

## ��Ŀ��ͼ
<figure class="third">
    <img src="http://wx4.sinaimg.cn/mw690/0069H5XJgy1fyd86lddwcj30bg0katct.jpg" width="200"/> <img src="http://wx2.sinaimg.cn/mw690/0069H5XJgy1fyd88jf9dkj30bk0kitbs.jpg" width="200"/> <img src="http://wx4.sinaimg.cn/mw690/0069H5XJgy1fyd88nhf1nj30bg0kaad6.jpg" width="200"/> <img src="http://wx3.sinaimg.cn/mw690/0069H5XJgy1fyd9lf0n9rj30bh0kdjvc.jpg" width="200"/>
</figure>

------------


## ��Ҫ����ջ
- vue-cli:���ּܹ�����Ŀ
- vue-router:ʵ��·���л�
- webpack:�����Ŀ�ļ�
- es6��ģ�黯����
- flex:���Ժ�ģ�Ͳ���ҳ��
- stylus:��ʽ��д�����Ƽ�ʹ�ã�̫���ź��ˣ��ٸ��ո񣬶���ո񶼱���������~��
- vue�еĹ��ȶ��������빺�ﳵ�ǿ��ʹ���˱��������ߣ�
- better-scroll:�˵���������
- localStorage:�������ݴ�ȡ
## ��Ҫ����
- Goods��Ratings��Seller �����ͼ�������¹���
- ��Ʒҳ ������menu���Ҳ�list��Ӧ��ת����Ӧλ��
- ���list�鿴��Ʒ����ҳ�����������ͨ��
- �������ݿ���ɸѡ�鿴
- ���ﳵ������������ɾ����Ʒ����Ч������ؼ��빺�ﳵ���֮��Ϊ�ֵ����ͨ�ţ�������ﳵͼ�꣬չʾ��ѡ�����Ʒ�б�
- �̼�ʵ��ͼƬ�������һ���
- loaclStorage �����̼���Ϣ��id��name��
## ���֮��Ĺ�ϵ
|������������app.vue
&emsp;&emsp;|&emsp;&emsp;|��������header.vue(ͷ�����)
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|��������star.vue���������������
&emsp;&emsp;|&emsp;&emsp;|��������goods.vue����Ʒ�����
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|��������food.vue����Ʒ����ҳ��
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|��������ratingselect.vue����������˧ѡ�����
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|��������carcontrol.vue�����Ӽ��ٹ��������
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|��������shopcart.vue�����ﳵ������캯С����붯����
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|��������carcontrol.vue������Ӽ�ͼ��ؼ�--ѡ���������ظ������goods��goods��Ӧ�����¼���ѡ�������������ݷ��͸����ﳵ�������
&emsp;&emsp;|&emsp;&emsp;|��������ratings.vue(�������)
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|��������star.vue���������������
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|��������ratingselect.vue����������˧ѡ�����
&emsp;&emsp;|&emsp;&emsp;|��������seller.vue(�̼����)
&emsp;&emsp;|&emsp;&emsp;|&emsp;&emsp;|��������star.vue���������������
## ��Ŀ�ṹ
- common/---- �ļ��д�ŵ���ͨ�õ�css��fonts
- components/---- �ļ���������� Vue ���
- router/---- �ļ��д�ŵ���vue-router������ã�linkActiveClass,routesע�����·�ɣ�
- build/---- �ļ��� webpack �Ĵ�����������ļ�
- config/---- �ļ��д�ŵ���һЩ������������Ƿ��������ʵĶ˿����õ�
- dist/---- ���ļ���һ��ʼ�ǲ����ڣ�����Ŀ���� build ֮��Ż�����
- prod.server.js---- ���ļ��ǲ�����ģ��ķ��������ã���������dist������ļ�����config/index.js��,build���������һ���˿�����port��9000��
- App.vue---- ����������е���������������ﱻ����
- index.html---- ������Ŀ������ļ��������������ǵĸ���� App.vue
- main.js---- ����ļ��� js �߼����� webpack ���֮�󽫱�ע�뵽 index.html ��

## ��Ŀ�ѵ�
**1�����ڹ��ﳵ��Ӱ�ť�Ķ���**
**html����**
- ����һ������С���div,�����������С��,�����Ϊ������һ��������С������Ϊ����ʹ��,����С�򶯻����ٶ�,һ����˵���Ҳ���Ա�֤���㹻��С�����������ж���
- ���������ݷֱ��������ڲ�,�����ƶ���С��Ĺ���ͷ���,�ڲ���ƶ���С�����������״̬
- ����ʹ��vue��js����ʵ��
- ��ΪС�򶯻�ֻ��һ������(ִֻ�е�������ϵ��¹���),����ֻ����before-enter,enter,after-enter
- ��v-show����С��Ŀɼ���,�ڶ���ִ���ڼ�ɼ�,����ʱ������
```html
 <div class="ball-container">
      <div v-for="ball in balls">
      //�������ַ�ʽ�Ķ���,css��js����
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
        //��㶯��
          <div class="ball" v-show="ball.show">
          //�ڲ㶯��
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
```
**js����**
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
- ֻҪ������drop�¼�,��ֹ��drop�¼�����Ĵ����ִ��,���⼸��vue��js��������Ҳ��һ��˳��ִ��
 - ������ drop �¼�
 - beforeDrop ��ʼִ��
 - dropping ��ʼִ��
 - afterDrop ��ʼִ��
 drop �¼��Ĵ�������ͨ����� cartcontrol ��������С��ť addCart �¼�����ʹ�� $emit ��Ҳ���Ը���� this.$refs.shopcart.drop(target); ֱ�Ӵ���
- ��ô����Ŀ����ʵ�֣�������� cartcontrol ���֮�󣬿��Խ��������� dom ��������� goods Ȼ���ٴ�������� shopcart������ΪĿǰ����֮���ͨ������������shopcart�������û�е���cartcontrol�����������û��ֱ��ͨѶ��������ʵ���˶�����֮���ͨѶ��Ҳ����ʹ�� EventBus �� vuex�����Ӷ�����ʵ�����������������ʵ�ֵ������� cartcontrol �����һ������,��С���䵽����һ�����shopcart
- $emit �Ǵ�����ǰʵ���ϵ��¼������Ӳ������ᴫ���������ص���
```javascript
methods: {
      drop(el) {
      //����һ���¼��ͻὫ����С����б���
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { //��false��С��ŵ�dropBalls
            ball.show = true;
            ball.el = el; //����С���el����Ϊһ��dom����
            this.dropBalls.push(ball);
            return;
          }
        }
      },

      beforeDrop(el){ //���������ִ������Ϊ����һ��vue�ļ����¼�
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); //��ȡС���������ӿڵ�λ��(С��߶�)
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22); //����,��Ϊ�Ǵ����Ͻ����µĵķ���
            el.style.display = ''; //���display
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            //�����ڲ㶯��
            let inner = el.getElementsByClassName('inner-hook')[0]; //ʹ��inner-hook����������js����
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },

      dropping(el, done) { //���������ִ������Ϊ����һ��vue�ļ����¼�
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; //�����ػ�html
        this.$nextTick(() => { //�ö���Ч���첽ִ��,�������
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          //�����ڲ㶯��
          let inner = el.getElementsByClassName('inner-hook')[0]; //ʹ��inner-hook����������js����
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done); //VueΪ��֪�����ɵ���ɣ�����������Ӧ���¼���������
        });
      },

      afterDrop(el) { //���������ִ������Ϊ����һ��vue�ļ����¼�
        let ball = this.dropBalls.shift(); //���һ�ζ�����ɾ��һ��dropBalls��С��
        if (ball) {
          ball.show = false;
          el.style.display = 'none'; //����С��
        }
      }
    }
	```
- ���� transitionend
- ����drop����,��ʵ��ÿһ��ball��show���Ժ�el���Դ���,���ҵ��һ�λ��Զ���һ��С��ŵ� dropBalls ��������,�ŵ�����ʹ������һ��С���Ѿ�����ʼִ�ж���,�������ڶ������첽��,��������������.
- ���� getBoundingClientRect (λ�Ƶļ����Ǵ����Ͻǿ�ʼ)
 - ʹ�� getBoundingClientRect ��ȡ����ǰԪ�ص�����,Ȼ����Ҫλ�Ƶ�left��ȥԪ�صĿ��ȡ����������λ��x����
 - ʹ�� getBoundingClientRect ��ȡ����ǰԪ�ص�����,Ȼ����Ҫ��ǰ��Ļ�ĸ߶ȼ�ȥԪ�ص� top �ټ�ȥԪ�ر���ĸ߶Ȼ�ȡ������������λ�� y ����,��������Ǹ���,��Ϊ�Ǵ����Ͻ����µķ���
- ����html�ػ�
 - ��Ϊ����������ػ�����Ҫ�������ж�����ɵ�,������ҪΪ������,��Ȼ����������С��display none,��û�д���html�ػ�,����˵û����������html�ػ�,������Ҫ�ֶ�
 - let rf = el.offsetHeight; ����һ���ֶ�����html�ػ�ķ���
 - ��ҳ���ܹ������
 - ������JavaScript �������ػ�
**css����**
.ball-container
      .ball
        position: fixed //С�򶯻���������html������
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
- ����cubic-bezier(0.49, -0.29, 0.75, 0.41),�Ƕ�����������(����������)�����ã�����css3ʵ�֣��ο�������������CSS3������SVG��canvas�Ļ��� ,���������߷���������Ϊ�˿����ڲ��Ԫ�صĹ���ͷ����.
