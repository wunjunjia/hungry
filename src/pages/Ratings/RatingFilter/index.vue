<template>
  <div class="ratingFilter-container border-1px border-bottom-1px border-top-1px">
    <div class="type border-1px border-bottom-1px">
      <span class="all" @click="changeType(-1)">全部 {{ ratings.length }}</span>
      <span class="recommend" @click="changeType(0)">推荐 {{ recommend }}</span>
      <span class="roast" @click="changeType(1)">吐槽 {{ roast }}</span>
    </div>
    <div class="filter">
      <span class="icon" :class="{active: filter}" @click="toggle">
        <i class="icon-check_circle"></i>
      </span>
      <span class="text">
        只看有内容的评价
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RatingFilter',
    props: {
      filter: {
        type: Boolean
      },
      ratings: {
        type: Array
      },
      toggle: {
        type: Function
      },
      changeType: {
        type: Function
      }
    },
    computed: {
      recommend() {
        return this.ratings.reduce((result, rating) => {
          if (rating.rateType === 0) {
            result += 1
          }
          return result
        }, 0)
      },
      roast() {
        return this.ratings.reduce((result, rating) => {
          if (rating.rateType === 1) {
            result += 1
          }
          return result
        }, 0)
      }
    }
  }
</script>

<style scoped lang="scss">
  .ratingFilter-container {
    padding: 0 18px;
    background-color: #fff;

    > .type {
      display: flex;
      padding: 18px 0;

      > span {
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 2px;
        font-size: 12px;
        line-height: 16px;

        &:last-child {
          margin-right: 0;
        }

        &.all {
          color: #fff;
          background-color: rgb(0, 160, 220);
        }

        &.recommend {
          color: rgb(77, 85, 93);
          background-color: rgba(0, 160, 220, .2);
        }

        &.roast {
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
</style>
