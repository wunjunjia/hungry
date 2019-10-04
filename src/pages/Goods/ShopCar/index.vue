<template>
  <div class="shopCar-container">
    <div class="shopCar-wrapper">
      <div class="left">
        <span
          class="shopCar"
          :class="{ active: cost > 0 }"
          @click="showShopList"
        >
          <i class="icon-shopping_cart"></i>
          <span v-show="total > 0" class="bubble">{{ total }}</span>
        </span>
        <span class="cost" :class="{ active: cost > 0 }">￥{{ cost }}</span>
        <span class="dividing-line"></span>
        <span class="deliveryPrice">另需配送费￥{{ deliveryPrice }}元</span>
      </div>
      <span class="minPrice" :class="{ active: cost >= minPrice }" @click="showPay">{{ description }}</span>
    </div>
    <transition
      name="shopList"
      @before-enter="shopListBeforeEnter"
      @enter="shopListEnter"
      @after-enter="shopListAfterEnter"
      @leave="shopListLeave"
    >
      <ShopList v-show="showList" :shopCar="shopCar" :hidden="hiddenShopList" ref="shopList"/>
    </transition>
    <transition
      name="ball-wrapper"
      v-on:before-enter="ballBeforeEnter"
      v-on:enter="ballEnter"
      v-on:after-enter="ballAfterEnter"
      v-for="(ball, index) in balls"
      :key="index"
    >
      <div v-show="ball.active" class="ball-wrapper">
        <div class="ball"></div>
      </div>
    </transition>
    <confirm-transition>
      <Payment v-if="pay" :hidden="hiddenPay" :cost="cost"/>
    </confirm-transition>
  </div>
</template>

<script>
  import ShopList from './ShopList'
  import Payment from './Payment'

  export default {
    name: 'ShopCar',
    data() {
      return {
        balls: [
          {active: false},
          {active: false},
          {active: false},
          {active: false},
          {active: false},
          {active: false},
          {active: false},
          {active: false},
        ],
        index: 0,
        dropBalls: [],
        showList: false,
        pay: false
      }
    },
    props: {
      minPrice: {
        type: Number
      },
      deliveryPrice: {
        type: Number
      },
      shopCar: {
        type: Array
      }
    },
    computed: {
      description() {
        if (this.minPrice <= this.cost) {
          return '去结算'
        } else {
          return `还差￥${this.minPrice - this.cost}元起送`
        }
      },
      cost() {
        return this.shopCar.reduce((result, item) => {
          result += item.price * item.count
          return result
        }, 0)
      },
      total() {
        return this.shopCar.reduce((result, item) => {
          result += item.count
          return result
        }, 0)
      }
    },
    methods: {
      drop(el) {
        this.ball = this.balls[this.index++]
        this.ball.active = true
        this.ball.el = el
        this.dropBalls.push(this.ball)
        if (this.index >= this.balls.length) this.index = 0
      },

      showShopList() {
        if (this.cost > 0) this.showList = !this.showList
      },

      hiddenShopList() {
        this.showList = false
      },

      showPay() {
        if (this.cost >= this.minPrice) {
          this.pay = true
        }
      },

      hiddenPay() {
        this.pay = false
      },

      ballBeforeEnter(el) {
        const rect = this.ball.el.getBoundingClientRect()
        el.style.transform = `translateY(-${window.innerHeight - rect.top - 38}px)`
        const ball = el.firstChild
        ball.style.transform = `translateX(${rect.left - 34 + (rect.width / 2 - 8)}px)`
      },

      ballEnter: function (el, done) {
        /* eslint-disable-next-line */
        var rf = el.offsetHeight
        el.style.transform = 'translateY(0)'
        el.style.transition = 'all .6s cubic-bezier(.49, -.29, .75, .41)'
        const ball = el.firstChild
        ball.style.transform = `translateX(0)`
        ball.style.transition = 'all .6s linear'
        done()
      },

      ballAfterEnter: function (el) {
        const ball = this.dropBalls.shift()
        if (ball) {
          ball.active = false
          ball.el = null
        }
      },

      shopListBeforeEnter(el) {
        el.style.opacity = 0
        el.style.transition = 'opacity .4s ease'
        const shopList = el.firstChild
        shopList.style.transform = 'translateY(100%)'
        shopList.style.transition = 'transform .4s ease'
      },

      shopListEnter(el, done) {
        /* eslint-disable-next-line */
        var rf = el.offsetHeight
        el.style.opacity = 1
        const shopList = el.firstChild
        shopList.style.transform = 'translateY(0)'
        done()
      },

      shopListAfterEnter(el) {
        this.$refs.shopList.shopListScroll.refresh()
      },

      shopListLeave(el, done) {
        el.style.opacity = 0
        const shopList = el.firstChild
        shopList.style.transform = 'translateY(100%)'
        const timer = setTimeout(() => {
          clearTimeout(timer)
          done()
        }, 400)
      }
    },
    components: {
      ShopList,
      Payment
    }
  }
</script>

<style scoped lang="scss">
  .shopCar-container {
    > .shopCar-wrapper {
      position: relative;
      display: flex;
      justify-content: space-between;
      height: 46px;
      width: 100%;
      background-color: #141d27;
      color: rgba(255, 255, 255, .4);
      z-index: 999;

      > .left {
        display: flex;

        .shopCar {
          position: relative;
          width: 44px;
          height: 44px;
          line-height: 44px;
          border: 6px solid #141d27;
          border-radius: 50%;
          margin: -12px 14px 0 14px;
          background-color: #333;
          text-align: center;
          font-size: 24px;

          &.active {
            color: #fff;
            background-color: #00a0dc;
          }

          > .bubble {
            font-size: 12px;
            font-weight: 700;
            color: #fff;
            height: 16px;
            line-height: 16px;
            padding: 0 5px;
            position: absolute;
            top: -4px;
            right: -4px;
            border-radius: 16px;
            background: linear-gradient(90deg, #fc9153, #f01414)
          }
        }

        .cost {
          font-size: 16px;
          font-weight: 700;
          line-height: 46px;

          &.active {
            color: #fff
          }
        }

        .dividing-line {
          width: 1px;
          height: 20px;
          background-color: rgba(255, 255, 255, .1);
          margin: 12px 10px;
        }

        .deliveryPrice {
          font-size: 12px;
          line-height: 46px;
        }
      }

      > .minPrice {
        width: 110px;
        height: 100%;
        line-height: 46px;
        font-size: 12px;
        font-weight: 700;
        text-align: center;
        background-color: #333;

        &.active {
          background-color: #00b43c;
          color: #fff;
        }
      }
    }

    > .ball-wrapper {
      position: fixed;
      bottom: 22px;
      left: 34px;
      z-index: 1999;

      > .ball {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
      }
    }
  }
</style>
