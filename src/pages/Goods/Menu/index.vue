<template>
  <div class="menu-wrapper" ref="menu-wrapper">
    <ul class="menu">
      <li v-for="(good, index) in goods"
          :class="{ active: index === current }"
          :key="good.name"
          ref="menuItem"
          @click="toggleGood(index)"
      >
        <p>
          <Support v-if="good.type !== -1" :index="good.type" style="width: 12px; height: 12px;"/>
          {{ good.name }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import Support from '@/components/Support'

  export default {
    name: 'Menu',
    props: {
      goods: {
        type: Array
      },
      toggleGood: {
        type: Function
      },
      current: {
        type: Number
      }
    },
    components: {
      Support
    }
  }
</script>

<style scoped lang="scss">
  .menu-wrapper {
    flex: 0 0 80px;

    .menu {
      > li {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 56px;
        min-height: 54px;
        padding: 0 12px;
        font-size: 12px;
        line-height: 14px;
        font-weight: 200;
        color: #333;

        &.active {
          border-top: none;
          background-color: rgb(255, 255, 255);
        }
      }
    }
  }
</style>
