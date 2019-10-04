<template>
  <span :class="'support-' + kind + ' ' + supports[index]"/>
</template>

<script>
  export default {
    name: 'Support',
    data() {
      return {
        supports: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    props: {
      index: {
        type: Number
      },
      kind: {
        type: Number,
        default: 1
      }
    }
  }
</script>

<style scoped lang="scss">
  .support-1 {
    display: inline-block;

    &.decrease {
      @include bg-url('./img/decrease_1');
    }

    &.discount {
      @include bg-url('./img/discount_1');
    }

    &.guarantee {
      @include bg-url('./img/guarantee_1');
    }

    &.invoice {
      @include bg-url('./img/invoice_1');
    }

    &.special {
      @include bg-url('./img/special_1');
    }
  }

  .support-3 {
    display: inline-block;

    &.decrease {
      @include bg-url('./img/decrease_3');
    }

    &.discount {
      @include bg-url('./img/discount_3');
    }

    &.guarantee {
      @include bg-url('./img/guarantee_3');
    }

    &.invoice {
      @include bg-url('./img/invoice_3');
    }

    &.special {
      @include bg-url('./img/special_3');
    }
  }
</style>
