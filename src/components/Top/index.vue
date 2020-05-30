<template>
  <div class="header">
    <div class="header-top">
      <a href="javascript:;">网易严选</a>
      <div class="header-ipt">
        <van-icon name="search" />
        <span class="placeholder">搜索商品,共27908款好物</span>
      </div>
      <div class="login">登录</div>
    </div>
    <div class="header-bottom">
      <ul ref='ul' @touchmove='touchmove' @touchstart="touchstart">
        <!-- 推荐按钮 -->
        <li @click="goHome">推荐</li>
        <!-- 除开推荐的其他按钮 -->
        <li v-for="item in getNavList" :key="item.id">
          <router-link :to="`/details/${item.id}`">{{item.name}}</router-link>
        </li>
      </ul>
      <div class="icon">
        <van-icon name="arrow-down" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Top",
  data() {
    return {
      currentX:0
    };
  },
  computed: {
    // ...mapState({
    //   getNavList: state => {
    //     state.home.navList;
    //   }
    // })
    ...mapGetters(["getNavList"])
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    touchstart(e){
      // const downX = e.changedTouches[0].pageX
      // this.currentX=downX
    },
    touchmove(){
    //   const oUl = this.$refs.ul
    //  oUl.style.transform=oUl.style.transform
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.header-top {
  display: flex;
  padding: 5px 12px;
  align-items: center;
  justify-content: space-between;
  .header-ipt {
    .search {
      display: block;
      margin-top: 10px;
    }
    background-color: #ededed;
    padding: 5px 14px;
    border-radius: 5px;
    font-size: 15px;
  }
  .login {
    color: red;
    border: 1px solid red;
    border-radius: 4px;
    padding: 3px 7px;
    font-size: 12px;
    line-height: 12px;
  }
}
.header-bottom {
  display: flex;
  justify-content: space-between;
  ul {
    // position: absolute;
    margin-top: 2px;
    height: 30px;
    white-space: nowrap;
    overflow: hidden;
    color: #ccc;
    li {
      margin: 0 10px;
      display: inline-block;
    }
  }
  .icon {
    width: 50px;
    height: 30px;
    //   background-color: red;
    text-align: center;
    .van-icon {
      font-size: 30px;
    }
  }
}
.active {
  color: red;
}
</style>