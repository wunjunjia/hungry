<template>
  <div class="good-container">
    <div class="good-wrapper" ref="good-wrapper">
      <ul>
        <li v-for="(good) in goods" class="good" :key="good.name" ref="good">
          <p class="name">{{ good.name }}</p>
          <ul style="padding: 0 18px">
            <li v-for="food in good.foods"
                class="food border-1px border-bottom-1px"
                :key="food.name"
                @click="showDetail(food)"
            >
              <img :src="food.icon" alt="image">
              <div class="content">
                <p class="name">{{ food.name }}</p>
                <div class="description">
                  <p style="line-height: 16px;">{{ food.description }}</p>
                  <p class="performance">
                    <span class="sellCount">
                      月售{{ food.sellCount }}份
                    </span>
                    <span>
                      好评率{{ food.rating }}%
                    </span>
                   </p>
                  <p class="price">
                    <span class="new">￥{{ food.price }}</span>
                    <span v-if="food.oldPrice" class="old">￥{{ food.oldPrice }}</span>
                  </p>
                </div>
                <div class="purchase-control">
                  <PurchaseControl :shopCar="shopCar" :food="food" :addListen="drop"/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <transition name="detail">
      <Detail v-if="food !== null" :shopCar="shopCar" :food="food" :hidden="hiddenDetail" :drop="drop"/>
    </transition>
  </div>
</template>

<script>
  import PurchaseControl from '@/components/PurchaseControl'
  import Detail from './Detail'

  export default {
    name: 'GoodList',
    props: {
      goods: {
        type: Array
      },
      shopCar: {
        type: Array
      },
      drop: {
        type: Function
      }
    },
    data() {
      return {
        food: null
      }
    },
    methods: {
      showDetail(food) {
        this.food = food
      },
      hiddenDetail() {
        this.food = null
      }
    },
    components: {
      PurchaseControl,
      Detail
    }
  }
</script>

<style scoped lang="scss">
  .good-container {
    flex: 1;
    background-color: #fff;

    > .good-wrapper {
      height: 100%;

      .good {
        > .name {
          position: relative;
          font-size: 12px;
          line-height: 26px;
          color: rgba(147, 153, 159);
          background-color: #f3f5f7;
          padding-left: 14px;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 26px;
            border-right: 2px solid #d9dde1;
          }
        }

        .food {
          display: flex;
          padding: 18px 0;
          background-color: rgb(255, 255, 255);

          &:last-child::after {
            height: 0;
          }

          > img {
            width: 70px;
            height: 70px;
            border-radius: 4px;
            margin-right: 10px;
          }

          > .content {
            position: relative;
            flex: 1;

            > .name {
              padding-top: 2px;
              font-size: 14px;
              color: rgb(7, 17, 27);
            }

            > .description {
              font-size: 12px;
              color: rgb(147, 153, 159);

              > p {
                margin-top: 8px;

                &.performance {
                  > .sellCount {
                    margin-right: 8px;
                  }
                }

                &.price {
                  > .new {
                    font-size: 14px;
                    font-weight: 600;
                    color: rgb(240, 20, 20);
                    margin-right: 8px;
                  }

                  > .old {
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                    text-decoration: line-through;
                    vertical-align: top;
                  }
                }
              }
            }

            > .purchase-control {
              position: absolute;
              bottom: 0;
              right: 0;
            }
          }
        }
      }
    }
  }

  .detail-enter, .detail-leave-to {
    transform: translateX(100%);
  }

  .detail-enter-to, .detail-leave {
    transform: translateX(0);
  }

  .detail-enter-active, .detail-leave-active {
    transition: transform .4s ease;
  }
</style>
