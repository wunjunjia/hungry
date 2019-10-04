<template>
  <div class="seller-container" ref="seller-container">
    <div class="seller-wrapper">
      <div class="card overview border-1px border-bottom-1px">
        <p class="name">{{ seller.name }}</p>
        <div class="description border-bottom-1px border-1px">
          <Star :size="36" :score="seller.score"/>
          <span class="ratingCount">({{ seller.ratingCount }})</span>
          <span>月售{{ seller.sellCount }}单</span>
        </div>
        <div class="extra">
          <div class="minPrice">
            <p>起送价</p>
            <p><span>{{ seller.minPrice }}</span>元</p>
          </div>
          <div class="deliveryPrice">
            <p>商家配送</p>
            <p><span>{{ seller.deliveryPrice }}</span>元</p>
          </div>
          <div class="deliveryTime">
            <p>平均配送时间</p>
            <p><span>{{ seller.deliveryTime }}</span>分钟</p>
          </div>
        </div>
        <div class="favorite">
          <p class="icon" :class="{active: favorite}" @click="favorite = !favorite"><i class="icon-favorite"></i></p>
          <p class="text">{{ favorite ? '已收藏' : '收藏' }}</p>
        </div>
      </div>
      <div class="card bulletin border-1px border-bottom-1px border-top-1px">
        <h1 class="title">公告与活动</h1>
        <p class="content">{{ seller.bulletin }}</p>
        <ul class="supports">
          <li v-for="support in seller.supports" :key="support.description" class="support border-1px border-top-1px">
            <support :index="support.type" :kind="3" style="width: 16px; height: 16px; margin-right: 6px;"/>
            {{ support.description }}
          </li>
        </ul>
      </div>
      <div class="card scene-container border-1px border-top-1px border-bottom-1px">
        <h1 class="title">商家实景</h1>
        <div class="scene-wrapper" ref="scene-wrapper">
          <ul>
            <li v-for="picture in seller.pics" :key="picture">
              <img :src="picture" alt="picture">
            </li>
          </ul>
        </div>
      </div>
      <div class="card info border-top-1px border-1px">
        <h1 class="title">商家信息</h1>
        <ul>
          <li v-for="info in seller.infos" :key="info" class="border-1px border-top-1px">{{ info }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from '@/components/Star'
  import Support from '@/components/Support'
  import BScroll from '@better-scroll/core'

  export default {
    name: 'Seller',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: false
      }
    },
    watch: {
      seller(val) {
        this.$nextTick(() => {
          this.sellerScroll.refresh()
          this.sceneScroll.refresh()
        })
      }
    },
    components: {
      Star,
      Support
    },
    mounted() {
      this.sellerScroll = new BScroll(this.$refs['seller-container'], {
        click: true,
        bounce: {
          top: false
        }
      })
      this.sceneScroll = new BScroll(this.$refs['scene-wrapper'], {click: false, scrollX: true})
    },
    beforeDestroy() {
      this.sellerScroll.destroy()
    }
  }
</script>

<style scoped lang="scss">
  .card {
    background-color: #fff;
    padding: 18px;
    margin-bottom: 18px;
    color: rgb(7, 17, 27);

    > .title {
      font-size: 12px;
      margin-bottom: 8px;
    }
  }

  .seller-container {
    height: 100%;
    overflow: hidden;

    > .seller-wrapper {
      > .overview {
        position: relative;

        > .name {
          font-size: 14px;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        }

        > .description {
          display: flex;
          font-size: 12px;
          color: rgb(77, 85, 93);
          padding-bottom: 18px;
          margin-bottom: 18px;

          > .ratingCount {
            margin: 0 12px 0 8px;
          }
        }

        > .extra {
          display: flex;
          justify-content: space-between;

          > div {
            flex: 1;
            text-align: center;

            &:first-child {
              border-right: 1px solid rgba(7, 17, 27, .1);
            }

            &:last-child {
              border-left: 1px solid rgba(7, 17, 27, .1);
            }

            > p {
              font-size: 12px;
              color: rgb(147, 153, 159);

              &:first-child {
                margin-bottom: 4px;
              }

              &:last-child {
                > span {
                  font-size: 24px;
                  color: rgb(7, 17, 27);
                }
              }
            }
          }
        }

        > .favorite {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 40px;
          text-align: center;

          > .icon {
            font-size: 24px;
            margin-bottom: 4px;
            color: rgb(147, 153, 159);

            &.active {
              color: rgb(220, 20, 20);
            }
          }

          > .text {
            font-size: 12px;
            color: rgb(77, 85, 93);
          }
        }
      }

      > .bulletin {
        > .content {
          padding: 0 12px 16px 12px;
          color: rgb(220, 20, 20);
          font-size: 12px;
          line-height: 20px;
        }

        > .supports {
          > .support {
            display: flex;
            align-items: center;
            padding: 16px 12px;
            font-size: 12px;
          }
        }
      }

      > .scene-container {
        > .scene-wrapper {
          white-space: nowrap;
          overflow: hidden;

          > ul {
            display: inline-block;

            > li {
              display: inline-block;
              width: 120px;
              height: 90px;
              margin-right: 6px;

              &:last-child {
                margin-right: 0;
              }

              > img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }

      > .info {
        margin-bottom: 0;

        > ul {
          > li {
            font-size: 12px;
            padding: 16px 12px;
          }
        }
      }
    }
  }
</style>
