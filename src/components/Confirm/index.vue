<template>
  <div class="mask">
    <div class="confirm">
      <div class="header border-1px">清理购物车?</div>
      <div>
        <span class="cancel" @click="cancel">取消</span>
        <span class="certain" @click="certain">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Confirm',
    props: {
      certain: {
        type: Function
      },
      cancel: {
        type: Function
      }
    }
  }
</script>

<style scoped lang="scss">
  .mask {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, .8);
    z-index: 999;

    > .confirm {
      background-color: #fff;
      width: 271px;
      height: 104px;
      border-radius: 4px;
      color: #666;
      transform-origin: center center;

      > .header {
        width: 100%;
        height: 54px;
        line-height: 54px;
        text-align: center;
        font-size: 14px;
        @include border-bottom-1px(rgb(235, 235, 235));
      }

      span {
        display: inline-block;
        width: 135px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        color: #999;

        &.certain {
          border-left: 1px solid #ebebeb;
          color: #fc9153;
        }
      }
    }
  }
</style>
