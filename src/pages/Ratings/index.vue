<template>
  <div class="rating-container" ref="rating-container">
    <div class="rating-wrapper">
      <div class="overview border-1px border-bottom-1px">
        <div class="left">
          <p class="score">{{ seller.score }}</p>
          <p class="synthesis-score">综合得分</p>
          <p class="rank">高于周边商家{{ seller.rankRate }}%</p>
        </div>
        <div class="right">
          <p>
            <span>服务态度</span>
            <Star :size="36" :score="seller.serviceScore"/>
            <span>{{ seller.serviceScore }}</span>
          </p>
          <p>
            <span>商品评分</span>
            <Star :size="36" :score="seller.foodScore"/>
            <span>{{ seller.foodScore }}</span>
          </p>
          <p>
            <span>送达时间</span>
            <span class="deliveryTime">{{ seller.deliveryTime}}分钟</span>
          </p>
        </div>
      </div>
      <RatingFilter :filter="filter" :ratings="ratings" :toggle="toggle" :changeType="changeType"/>
      <ul class="rating-list">
        <li v-for="rating in filterRatings" :key="rating.rateTime" class="rating border-1px border-bottom-1px">
          <img class="avatar" :src="rating.avatar" alt="avatar"/>
          <div class="content">
            <p style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span class="name">{{ rating.username }}</span>
              <span class="time">{{ rating.rateTime | formatDate('YYYY-MM-DD hh:mm:ss') }}</span>
            </p>
            <div class="extra">
              <Star :size="24" :score="rating.score"/>
              <span v-if="rating.deliveryTime" class="deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
            </div>
            <p class="content">{{ rating.text }}</p>
            <div class="recommend">
              <i class="icon" :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType !== 0 }"></i>
              <span v-for="recommend in rating.recommend" :key="recommend">{{ recommend }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Star from '@/components/Star'
  import RatingFilter from './RatingFilter'
  import axios from 'axios'
  import BScroll from '@better-scroll/core'

  export default {
    name: 'Ratings',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        filter: true,
        type: -1,
        ratings: []
      }
    },
    methods: {
      toggle() {
        this.filter = !this.filter
        this.$nextTick(() => {
          this.ratingScroll.refresh()
        })
      },
      changeType(type) {
        this.type = type
        this.$nextTick(() => {
          this.ratingScroll.refresh()
        })
      }
    },
    computed: {
      filterRatings() {
        return this.ratings.filter((rating) => {
          let flag = true
          if (this.filter) {
            if (rating.text === '') flag = false
          }
          if (!flag) return flag
          if (this.type !== -1) {
            if (rating.rateType !== this.type) flag = false
          }
          return flag
        })
      }
    },
    components: {
      Star,
      RatingFilter
    },
    created() {
      axios.get('/api/ratings')
        .then((res) => {
          this.ratings = res.data.data
          this.$nextTick(() => {
            this.ratingScroll = new BScroll(this.$refs['rating-container'], {click: true, bounce: {top: false}})
          })
        })
    },
    beforeDestroy() {
      this.ratingScroll.destroy()
    }
  }
</script>

<style scoped lang="scss">
  .rating-container {
    height: 100%;
    overflow: hidden;

    > .rating-wrapper {
      > .overview {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 0;
        background-color: #fff;
        margin-bottom: 18px;

        > .left {
          width: 138px;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, .1);

          > .score {
            font-size: 24px;
            font-weight: 700;
            line-height: 28px;
            color: rgb(255, 153, 0);
            margin-bottom: 6px;
          }

          > .synthesis-score {
            font-size: 12px;
            color: rgb(7, 17, 27);
            margin-bottom: 8px;
          }

          > .rank {
            font-size: 12px;
            color: rgb(147, 153, 159);
            padding-bottom: 6px;
          }
        }

        > .right {
          flex: 1;
          padding: 0 24px;

          > p {
            display: flex;
            align-items: center;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
            margin-bottom: 8px;

            &:last-child {
              margin-bottom: 0;
            }

            > span {
              &:first-child {
                margin-right: 12px;
              }

              &:last-child {
                margin-left: 12px;
              }

              &.deliveryTime {
                margin-left: 0;
                color: rgb(147, 153, 159);
              }
            }
          }
        }
      }

      > .rating-list {
        background-color: #fff;
        padding: 0 18px;

        > .rating {
          display: flex;
          justify-content: space-between;
          padding: 18px 0;

          &:last-child::after {
            height: 0;
          }

          > .avatar {
            height: 28px;
            width: 28px;
            border-radius: 50%;
            margin-right: 12px;
            background-color: red;
          }

          > .content {
            flex: 1;

            > p {
              font-size: 12px;
              line-height: 14px;
              color: rgb(7, 17, 27);

              > .time {
                color: rgb(147, 153, 159);
              }

              &.content {
                font-size: 14px;
                line-height: 16px;
                margin-bottom: 8px;
              }
            }

            > .extra {
              display: flex;
              align-items: center;
              font-size: 12px;
              color: rgb(147, 153, 159);
              margin-bottom: 6px;

              > .deliveryTime {
                margin-left: 6px;
              }
            }

            > .recommend {
              width: 260px;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              color: rgb(147, 153,159);

              > span {
                font-size: 12px;
                border: 1px solid rgba(7, 17, 27, .1);
                padding: 2px 6px;
                border-radius: 2px;
                margin-right: 8px;
                margin-bottom: 4px;
              }

              > .icon {
                font-size: 14px;
                margin-right: 4px;

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
