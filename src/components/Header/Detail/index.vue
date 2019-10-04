<template>
  <div class="detail-container" ref="detail-container">
    <div class="detail-wrapper">
      <div class="content">
        <p class="name">{{ seller.name }}</p>
        <div class="star-wrapper">
          <Star :size="48" :score="seller.score"/>
        </div>
        <p class="title border-1px">优惠信息</p>
        <ul class="supports">
          <li v-for="support in seller.supports"
              :key="support.description"
              class="support"
          >
            <Support :index="support.type" style="width: 16px; height: 16px; margin-right: 6px;"/>
            {{ support.description }}
          </li>
        </ul>
        <p class="title border-1px">商家公告</p>
        <p class="bulletin">
          {{ seller.bulletin }}
        </p>
      </div>
      <div class="footer" @click="handleClick">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from '@/components/Star'
  import Support from '@/components/Support'
  import BScroll from '@better-scroll/core'

  export default {
    name: 'Detail',
    props: {
      seller: {
        type: Object
      },
      handleClick: {
        type: Function
      }
    },
    mounted() {
      this.detailScroll = new BScroll(this.$refs['detail-container'], {click: true})
    },
    beforeDestroy() {
      this.detailScroll.destroy()
    },
    components: {
      Star,
      Support
    }
  }
</script>

<style scoped lang="scss">
  .detail-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(7, 17, 27, .8);
    z-index: 1999;
    color: #fff;
    overflow: hidden;

    .detail-wrapper {
      position: relative;
      min-height: 100%;

      > .content {
        padding: 64px 36px;

        > .name {
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }

        > .star-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 16px;
          margin-bottom: 28px;
        }

        > .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-weight: 700;

          &::before, &::after {
            content: '';
            width: 112px;
            border-bottom: 1px solid rgba(255, 255, 255, .2);
          }
        }

        > .supports {
          margin-top: 24px;
          margin-bottom: 28px;
          padding: 0 12px;

          > .support {
            display: flex;
            align-items: center;
            font-size: 12px;
            font-weight: 200;
            margin-bottom: 12px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        > .bulletin {
          margin-top: 24px;
          padding: 0 12px;
          font-size: 12px;
          font-weight: 200;
          line-height: 24px;
        }
      }

      > .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 32px;
        padding-bottom: 32px;
        text-align: center;
        font-size: 32px;
        color: rgba(255, 255, 255, .5);
      }
    }
  }
</style>
