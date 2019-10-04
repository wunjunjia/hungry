<template>
  <div class="goods-container">
    <div class="content">
      <Menu :goods="goods" :toggleGood="toggleGood" :current="current" ref="menu"/>
      <GoodList :goods="goods" :shopCar="shopCar" ref="goodList" :drop="drop"/>
    </div>
    <ShopCar :shopCar="shopCar" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" ref="shopCar"/>
  </div>
</template>

<script>
  import axios from 'axios'
  import BScroll from '@better-scroll/core'
  import Vue from 'vue'
  import Menu from './Menu'
  import GoodList from './GoodList'
  import ShopCar from './ShopCar'

  function debounce(fn, delay = 100) {
    let flag = false
    return function () {
      if (flag) return
      flag = true
      const timer = setTimeout(() => {
        clearTimeout(timer)
        flag = false
        fn.apply(this, arguments)
      }, delay)
      // 之所以要保留timer是因为当切换到另一个路由时，回调函数里取refs值的时候会因为undefined而报错，其实路由切换时我们也不需要执行回调，所以当此组件销毁之前手动把定时器关掉，这样就不会调用回调函数了。
      this.timer = timer
    }
  }

  export default {
    name: 'Goods',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        current: 0,
        toggle: false,
        shopCar: [],
        handleGoodScroll: debounce((pos) => {
          if (pos.y >= 0 || this.toggle) return
          pos.y = -pos.y
          const goods = this.$refs.goodList.$refs.good
          for (let i = goods.length - 1; i >= 0; --i) {
            if (pos.y >= goods[i].offsetTop) {
              if (this.current !== i) {
                this.current = i
                this.menuScroll.scrollToElement(this.$refs.menu.$refs.menuItem[i], 200)
              }
              return
            }
          }
        }, 100),
        handleGoodScrollEnd: () => {
          if (this.toggle) {
            this.toggle = false
            this.goodScroll.on('scroll', this.handleGoodScroll)
          }
        }
      }
    },
    methods: {
      initScroll() {
        const {menu, goodList} = this.$refs
        this.menuScroll = new BScroll(menu.$refs['menu-wrapper'], {probeType: 3, click: true})
        this.goodScroll = new BScroll(goodList.$refs['good-wrapper'], {probeType: 3, click: true})
        this.goodScroll.on('scroll', this.handleGoodScroll)
        this.goodScroll.on('scrollEnd', this.handleGoodScrollEnd)
      },
      toggleGood(index) {
        this.toggle = true
        this.current = index
        this.goodScroll.off('scroll', this.handleGoodScroll)
        this.menuScroll.scrollToElement(this.$refs.menu.$refs.menuItem[index], 200)
        this.goodScroll.scrollToElement(this.$refs.goodList.$refs.good[index], 200)
      },
      drop(el) {
        this.$refs.shopCar.drop(el)
      }
    },
    components: {
      Menu,
      GoodList,
      ShopCar
    },
    created() {
      axios.get('/api/goods')
        .then((res) => {
          const {code, data} = res.data
          if (code === 0) {
            this.goods = data
            this.goods.forEach((good) => {
              good.foods.forEach((food) => {
                Vue.set(food, 'count', 0)
              })
            })
            this.$nextTick(() => {
              this.goodScroll.refresh()
              this.menuScroll.refresh()
            })
          }
        })
    },
    mounted() {
      this.initScroll()
    },
    beforeDestroy() {
      clearTimeout(this.goodScroll.timer)
      // this.goodScroll.off('scroll', this.handleGoodScroll)
      // this.goodScroll.off('scrollEnd', this.handleGoodScrollEnd)
      this.goodScroll.destroy()
      this.menuScroll.destroy()
    }
  }
</script>

<style scoped lang="scss">
  .goods-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > .content {
      display: flex;
      flex: 1;
      width: 100%;
      overflow: hidden;
    }
  }
</style>
