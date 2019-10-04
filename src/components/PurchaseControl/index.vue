<template>
  <div class="control">
    <transition name="sub-btn">
      <i v-show="food.count > 0" class="sub-btn icon-remove_circle_outline" @click.stop="sub"></i>
    </transition>
    <span v-show="food.count > 0" class="count">{{ food.count }}</span>
    <i class="add-btn icon-add_circle" @click.stop="add"></i>
  </div>
</template>

<script>
  export default {
    name: 'PurchaseControl',
    props: {
      food: {
        type: Object,
      },
      shopCar: {
        type: Array
      },
      addListen: {
        type: Function,
        default: () => {}
      },
      subListen: {
        type: Function,
        default: () => {}
      }
    },
    methods: {
      add(event) {
        this.addListen(event.target)
        this.food.count += 1
        const result = this.shopCar.find((item) => item.name === this.food.name)
        if (!result) {
          this.shopCar.push(this.food)
        }
      },
      sub() {
        if (this.food.count > 0) {
          this.food.count -= 1
          const index = this.shopCar.findIndex((item) => item.name === this.food.name)
          if (this.shopCar[index].count === 0) this.shopCar.splice(index, 1)
          this.subListen(this.food)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .control {
    display: flex;
    align-items: center;

    > .sub-btn {
      font-size: 24px;
      color: rgb(0, 160, 220);

      &.sub-btn-enter {
        opacity: 0;
        transform: translateX(24px) rotate(0);
      }

      &.sub-btn-enter-to {
        opacity: 1;
        transform: translateX(0) rotate(-360deg);
      }

      &.sub-btn-leave {
        opacity: 1;
        transform: translateX(0) rotate(0);
      }

      &.sub-btn-leave-to {
        opacity: 0;
        transform: translateX(24px) rotate(360deg);
      }

      &.sub-btn-enter-active, &.sub-btn-leave-active {
        transition: all .4s ease;
      }
    }

    > .count {
      color: #666;
      font-size: 16px;
      margin: 0 4px;
    }

    > .add-btn {
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }
</style>
