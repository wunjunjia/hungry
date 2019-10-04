<template>
  <div class="payment-container">
    <div class="confirm">
      <div class="desc border-1px border-bottom-1px">
        <p class="primary">支付</p>
        <p class="secondary">您需要支付{{ cost }}元</p>
      </div>
      <div class="certain" @click="hidden">确定</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Payment',
    props: {
      hidden: {
        type: Function
      },
      cost: {
        type: Number
      }
    }
  }
</script>

<style scoped lang="scss">
  .payment-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(7, 17, 27, .8);
    z-index: 1999;

    > .confirm {
      width: 270px;
      background: #fff;
      border-radius: 2px;
      text-align: center;

      > .desc {
        > .primary {
          color: rgb(7, 17, 27);
          font-size: 16px;
          padding: 30px 16px 0 16px;
        }

        > .secondary {
          color: rgb(147, 153, 159);
          font-size: 14px;
          line-height: 22px;
          margin-top: 12px;
          padding-bottom: 16px;
        }
      }

      > .certain {
        color: #fc9153;
        font-size: 16px;
        height: 50px;
        line-height: 50px;
      }
    }
  }
</style>
