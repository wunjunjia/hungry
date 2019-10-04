<template>
  <div class="root">
    <Header :seller="seller"/>
    <ul class="navBar border-1px border-bottom-1px">
      <li>
        <router-link to="/goods">商品</router-link>
      </li>
      <li>
        <router-link to="/ratings">评论</router-link>
      </li>
      <li>
        <router-link to="/seller">商家</router-link>
      </li>
    </ul>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Header from '@/components/Header'

  const SUCCESS_CODE = 0

  export default {
    name: 'app',
    data() {
      return {
        seller: {}
      }
    },
    created() {
      axios.get('/api/seller')
        .then((res) => {
          if (res.data.code === SUCCESS_CODE) {
            this.seller = res.data.data
          }
        })
    },
    components: {
      Header
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped>
  .root {
    position: relative;
    min-height: 100%;

    > .navBar {
      display: flex;
      height: 40px;

      > li {
        flex: 1;

        > a {
          display: block;
          height: 100%;
          line-height: 40px;
          font-size: 14px;
          text-align: center;
          color: rgb(77, 85, 93);

          &.router-link-active {
            color: rgb(240, 20, 20);
          }
        }
      }
    }

    > .content {
      position: absolute;
      top: 174px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #f3f6f7;
    }
  }
</style>
