<template>
  <div class="shopList-container" @click.self="hidden">
    <div class="shopList-wrapper">
      <div class="header border-1px border-bottom-1px">
        <span class="car">购物车</span>
        <span class="clear" @click="show">清空</span>
      </div>
      <div class="content" ref="shopList-wrapper">
        <ul class="shopList">
          <li v-for="shop in shopCar" :key="shop.name" class="shop border-1px border-bottom-1px">
            <span class="name">{{ shop.name }}</span>
            <div class="right">
              <span class="price">￥{{ shop.price * shop.count }}</span>
              <PurchaseControl :shopCar="shopCar" :food="shop" :subListen="sub"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <confirm-transition>
      <Confirm ref="confirm" v-show="showConfirm" :certain="clear" :cancel="cancel"/>
    </confirm-transition>
  </div>
</template>

<script>
  import PurchaseControl from '@/components/PurchaseControl'
  import BScroll from '@better-scroll/core'
  import Confirm from '@/components/Confirm'

  export default {
    name: 'ShopList',
    props: {
      shopCar: {
        type: Array
      },
      hidden: {
        type: Function
      }
    },
    data() {
      return {
        showConfirm: false
      }
    },
    methods: {
      sub(food) {
        if (this.shopCar.length === 0) {
          this.hidden()
        } else if (food.count === 0) {
          this.$nextTick(() => {
            this.shopListScroll.refresh()
          })
        }
      },
      clear() {
        this.showConfirm = false
        while (this.shopCar.length) {
          const shop = this.shopCar.pop()
          shop.count = 0
        }
        this.hidden()
      },
      cancel() {
        this.showConfirm = false
      },
      show() {
        this.showConfirm = true
      }
    },
    components: {
      PurchaseControl,
      Confirm
    },
    mounted() {
      this.shopListScroll = new BScroll(this.$refs['shopList-wrapper'], {click: true})
    },
    beforeDestroy() {
      this.shopListScroll.destroy()
    }
  }
</script>

<style scoped lang="scss">
  .shopList-container {
    position: fixed;
    top: 0;
    bottom: 46px;
    left: 0;
    right: 0;
    background-color: rgba(7, 17, 27, .6);

    > .shopList-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      /*animation-name: moveUp;*/
      /*animation-duration: .4s;*/
      /*animation-iteration-count: 1;*/
      /*animation-timing-function: ease;*/

      > .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        height: 40px;
        padding: 0 18px;
        background: #f3f5f7;

        > .car {
          font-size: 14px;
          font-weight: 200;
          color: rgb(7, 17, 27);
        }

        > .clear {
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }

      > .content {
        max-height: 216px;
        overflow: hidden;
        background-color: #fff;

        > .shopList {
          padding: 0 18px;

          > .shop {
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            height: 48px;

            &:last-child::after {
              height: 0;
            }

            > .name {
              font-size: 14px;
              color: rgb(7, 17, 27);
            }

            > .right {
              display: flex;
              justify-content: space-between;
              align-items: center;

              > .price {
                font-size: 14px;
                font-weight: 700;
                color: rgb(240, 20, 20);
                margin-right: 14px;
              }
            }
          }
        }
      }
    }
  }

  @keyframes moveUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
