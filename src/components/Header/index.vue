<template>
  <div class="header">
    <div class="primary">
      <img class="avatar" :src="seller.avatar" alt="avatar">
      <div class="content">
        <p class="title">{{ seller.name }}</p>
        <p class="description">{{ seller.description }} / {{ seller.deliveryTime }}分钟送达</p>
        <p class="support" v-if="seller.supports">
          <Support style="width: 12px; height: 12px; margin-right: 4px;" :index="seller.supports[0].type"/>
          {{ seller.supports[0].description }}
        </p>
        <div class="button" v-if="seller.supports" @click="handleClick">
          {{ seller.supports.length }}个
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin" @click="handleClick">
      <span>{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <img class="background" :src="seller.avatar"/>
    <transition name="detail">
      <Detail v-if="show" ref="detail" :seller="seller" :handleClick="handleClick"/>
    </transition>
  </div>
</template>

<script>
  import Detail from './Detail'
  import Support from '@/components/Support'

  export default {
    name: 'Header',
    data() {
      return {
        show: false
      }
    },
    methods: {
      handleClick() {
        this.show = !this.show
        // if (this.show) {
        //   this.$nextTick(() => {
        //     this.$refs.detail.detailScroll.refresh()
        //   })
        // }
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      Detail,
      Support
    }
  }
</script>

<style scoped lang="scss">
  .header {
    position: relative;
    padding-top: 24px;
    background-color: rgba(7, 17, 27, 0.5);
    color: rgb(255, 255, 255);
    overflow: hidden;

    > .primary {
      display: flex;
      margin-bottom: 18px;

      > .avatar {
        width: 64px;
        height: 64px;
        border-radius: 2px;
        margin-left: 24px;
        margin-right: 16px;
      }

      > .content {
        flex: 1;
        padding-right: 12px;
        position: relative;

        > .title {
          display: flex;
          padding-top: 2px;
          font-size: 16px;
          font-weight: 700;
          line-height: 18px;
          width: 200px;
          @include text-overflow;

          &::before {
            content: '';
            width: 30px;
            height: 18px;
            margin-right: 6px;
            @include bg-url('./img/brand');
          }
        }

        > .description {
          padding-top: 8px;
          font-size: 12px;
          font-weight: 200;
        }

        > .support {
          padding-top: 10px;
          display: flex;
          font-size: 12px;
          font-weight: 200;
          width: 200px;
          @include text-overflow;
        }

        > .button {
          padding: 7px 8px 2px 8px;
          font-size: 12px;
          font-weight: 200;
          position: absolute;
          bottom: 0;
          right: 12px;
          background-color: rgba(7,17,27,.2);
          border-radius: 14px;
        }
      }
    }

    > .bulletin {
      height: 28px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      background-color: rgba(7, 17, 27, .2);
      font-size: 12px;

      &::before {
        content: '';
        width: 22px;
        height: 12px;
        margin-right: 4px;
        @include bg-url('./img/bulletin');
      }

      > span {
        font-weight: 200;
        width: 100%;
        @include text-overflow;
      }
    }

    > .background {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      filter: blur(10px);
    }

    .detail-enter, .detail-leave-to {
      opacity: 0;
    }

    .detail-enter-to, .detail-leave {
      opacity: 1;
    }

    .detail-enter-active, .detail-leave-active {
      transition: opacity .4s ease;
    }
  }
</style>
