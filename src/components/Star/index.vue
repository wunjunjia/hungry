<template>
  <div :class="sizeType">
    <span v-for="(star, index) in stars" :class="star" :key="index"/>
  </div>
</template>

<script>
  export default {
    name: 'Star',
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      sizeType() {
        return `size-${this.size}`
      },
      stars() {
        const result = []
        const score = Math.floor(this.score * 2) / 2
        let count = Math.floor(score)
        for (let i = 0; i < count; ++i) {
          result.push('star-on')
        }
        if (score % 1 !== 0) {
          result.push('star-half')
          ++count
        }
        for (let i = count; i < 5; ++i) {
          result.push('star-off')
        }
        return result
      }
    }
  }
</script>

<style scoped lang="scss">
  .size-48 {
    display: flex;

    span {
      width: 20px;
      height: 19px;
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }

      &.star-on {
        @include bg-url('./img/star48_on');
      }

      &.star-off {
        @include bg-url('./img/star48_off');
      }

      &.star-half {
        @include bg-url('./img/star48_half');
      }
    }
  }

  .size-36 {
    display: flex;

    span {
      width: 15px;
      height: 14px;
      margin-right: 6px;

      &:last-child {
        margin-right: 0;
      }

      &.star-on {
        @include bg-url('./img/star36_on');
      }

      &.star-off {
        @include bg-url('./img/star36_off');
      }

      &.star-half {
        @include bg-url('./img/star36_half');
      }
    }
  }

  .size-24 {
    display: flex;

    span {
      width: 10px;
      height: 10px;
      margin-right: 4px;

      &:last-child {
        margin-right: 0;
      }

      &.star-on {
        @include bg-url('./img/star24_on');
      }

      &.star-off {
        @include bg-url('./img/star24_off');
      }

      &.star-half {
        @include bg-url('./img/star24_half');
      }
    }
  }
</style>
