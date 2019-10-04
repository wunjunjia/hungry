<template>
  <div class="detail-container" ref="detail-container">
    <div class="detail-wrapper">
      <div class="avatar">
        <img :src="food.image" alt="avatar">
        <div class="back" @click="hidden">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content card border-1px border-bottom-1px">
        <p class="name">{{ food.name }}</p>
        <p class="performance">
          <span class="sellCount">月售{{ food.sellCount }}份</span>
          <span>好评率{{ food.rating }}%</span>
        </p>
        <p class="price">
          <span class="new">￥{{ food.price }}</span>
          <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
        </p>
        <div class="control">
          <PurchaseControl :shopCar="shopCar" :food="food" :addListen="drop"/>
          <transition name="add-btn">
            <div v-if="food.count === 0" class="add-btn" @click.stop="add">
              加入购物车
            </div>
          </transition>
        </div>
      </div>
      <div class="description card border-1px border-top-1px border-bottom-1px" v-if="food.description">
        <p class="title">商品介绍</p>
        <p class="content">{{ food.description }}</p>
      </div>
      <div class="comment-container">
        <div class="header border-1px border-top-1px border-bottom-1px">
          <p class="title">商品评价</p>
          <div class="type border-1px border-bottom-1px">
            <span class="all">全部 {{ food.ratings.length }}</span>
            <span class="good">推荐 {{ recommend }}</span>
            <span class="bad">吐槽 {{ roast }}</span>
          </div>
          <div class="filter">
            <span class="icon" :class="{active: filter}" @click="change">
              <i class="icon-check_circle"></i>
            </span>
            <span class="text">
              只看有内容的评价
            </span>
          </div>
        </div>
        <ul class="commentList">
          <li v-for="rating in ratings" :key="rating.rateTime" class="comment border-1px border-bottom-1px">
            <div class="description">
              <span class="time">{{ rating.rateTime | formatDate('YYYY-MM-DD hh:mm:ss') }}</span>
              <div class="left">
                <span class="name">{{ rating.username }}</span>
                <img :src="rating.avatar" alt="avatar">
              </div>
            </div>
            <div class="content">
              <i class="icon"
                 :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1 }"></i>
              {{ rating.text }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import PurchaseControl from '@/components/PurchaseControl'
  import BScroll from '@better-scroll/core'

  export default {
    name: 'Detail',
    props: {
      shopCar: {
        type: Array
      },
      food: {
        type: Object
      },
      hidden: {
        type: Function
      },
      drop: {
        type: Function
      },
    },
    data() {
      return {
        filter: true
      }
    },
    methods: {
      add(event) {
        if (this.food.count === 0) {
          this.drop(event.target)
          this.food.count += 1
          const result = this.shopCar.find((item) => item.name === this.food.name)
          if (!result) {
            this.shopCar.push(this.food)
          }
        }
      },
      change() {
        this.filter = !this.filter
        this.$nextTick(() => {
          this.detailScroll.refresh()
        })
      }
    },
    computed: {
      recommend() {
        return this.food.ratings.reduce((result, food) => {
          if (food.rateType === 0) result += 1
          return result
        }, 0)
      },
      roast() {
        return this.food.ratings.reduce((result, food) => {
          if (food.rateType === 1) result += 1
          return result
        }, 0)
      },
      ratings() {
        if (this.filter) {
          return this.food.ratings.filter((rating) => rating.text)
        } else {
          return this.food.ratings
        }
      }
    },
    mounted() {
      this.detailScroll = new BScroll(this.$refs['detail-container'], {click: true, bounce: {top: false}})
    },
    beforeDestroy() {
      this.detailScroll.destroy()
    },
    components: {
      PurchaseControl
    }
  }
</script>

<style scoped lang="scss">
  .card {
    padding: 18px;
    background-color: #fff;
    margin-bottom: 18px;
  }

  .detail-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 46px;
    background-color: #f3f5f7;
    overflow: hidden;

    > .detail-wrapper {

      > .avatar {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;  // padding-top会设置为宽度的大小
        font-size: 0;

        > img {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }

        > .back {
          position: absolute;
          top: 10px;
          left: 0;
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 20px;
          color: #fff;
        }
      }

      > .content {
        position: relative;

        > .name {
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        }

        > .performance {
          font-size: 12px;
          color: rgb(147, 153, 159);
          margin-bottom: 18px;

          > .sellCount {
            margin-right: 12px;
          }
        }

        > .price {
          > .new {
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
            margin-right: 8px;
          }

          > .old {
            font-size: 12px;
            font-weight: 700;
            color: rgb(147, 153, 159);
            text-decoration: line-through;
          }
        }

        > .control {
          position: absolute;
          bottom: 18px;
          right: 18px;

          > .add-btn {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 84px;
            height: 24px;
            line-height: 24px;
            background-color: rgba(0, 160, 220);
            color: #fff;
            font-size: 12px;
            text-align: center;
            border-radius: 12px;

            &.add-btn-enter, &.add-btn-leave-to {
              opacity: 0;
            }

            &.add-btn-enter-to, &.add-btn-leave {
              opacity: 1;
            }

            &.add-btn-enter-active, &.add-btn-leave-active {
              transition: opacity .4s ease;
            }
          }
        }
      }

      > .description {
        > .title {
          font-size: 14px;
          color: rgb(7, 17, 27);
          margin-bottom: 6px;
        }

        > .content {
          padding: 0 8px;
          font-size: 12px;
          line-height: 2;
          color: rgb(77, 85, 93);
        }
      }

      > .comment-container {
        > .header {
          background-color: #fff;
          padding: 18px 18px 0 18px;

          > .title {
            font-size: 14px;
            color: rgb(7, 17, 27);
            margin-bottom: 18px;
          }

          > .type {
            color: #fff;
            padding-bottom: 18px;

            > span {
              display: inline-block;
              font-size: 12px;
              padding: 8px 12px;
              margin-right: 8px;
              border-radius: 2px;

              &:last-child {
                margin-right: 0;
              }

              &.all {
                background-color: rgb(0, 160, 220);
              }

              &.good {
                color: rgb(77, 85, 93);
                background-color: rgba(0, 160, 220, .2);
              }

              &.bad {
                color: rgb(77, 85, 93);
                background-color: rgba(77, 85, 93, .2);
              }
            }
          }

          > .filter {
            padding: 12px 0;
            color: rgb(147, 153, 159);
            display: flex;
            align-items: center;

            > .icon {
              font-size: 24px;
              margin-right: 4px;

              &.active {
                color: #00b43c;
              }
            }

            > .text {
              font-size: 14px;
            }
          }
        }

        > .commentList {
          background-color: #fff;
          padding: 0 18px;

          > .comment {
            padding: 18px 0;

            &:last-child::after {
              height: 0;
            }

            > .description {
              display: flex;
              justify-content: space-between;
              text-align: center;
              color: rgb(147, 153, 159);
              font-size: 12px;
              margin-bottom: 6px;

              > .left {
                display: flex;
                align-items: center;

                > img {
                  width: 12px;
                  height: 12px;
                  border-radius: 100%;
                  margin-left: 6px;
                }
              }
            }

            > .content {
              position: relative;
              padding-left: 20px;
              font-size: 12px;
              min-height: 16px;
              line-height: 16px;
              color: rgb(7, 17, 27);

              > .icon {
                position: absolute;
                top: 0;
                left: 0;
                font-size: 14px;
                line-height: 1;
                color: rgb(147, 153, 159);

                &.icon-thumb_up {
                  color: rgb(0, 160, 220);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
