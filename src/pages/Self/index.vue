<template>
  <div class="warp">
    <van-nav-bar class="header" title="网易严选" fixed>
      <template #right>
        <van-icon name="search" size="28" @click="goSearch" />
        <van-icon name="cart-o" size="28" />
      </template>
      <template #left>
        <van-icon name="wap-home-o" size="28" @click="goHome" />
      </template>
    </van-nav-bar>
    <van-icon name="checked" size="100px" color="blue" />
    <div class="centent">
      <van-button type="danger" size="large">已经登录了可以买买买了哈哈哈哈</van-button>
      <van-button @click="LogOut" color="#DC143C" size="large" plain>退出登录</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Self",
  methods: {
    LogOut() {
      this.$dialog
        .confirm({
          message: "确定退出吗"
        })
        .then(() => {
          const a1 = localStorage.removeItem("touken");
          setTimeout(() => {
            this.$bus.$emit("goHome", "/");
            this.$router.push("/home");
          }, 500);
        })
        .catch(() => {
          // on cancel
        });
    },
    //去主页
    goHome() {
      this.$router.push("/");
      this.$bus.$emit("goHome", "/");
    },
    //去搜索
    goSearch() {
      this.$router.push("/search");
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.warp {
  width: 100%;
  height: 100%;
  position: absolute;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  background-color: white;
  .centent {
    width: 100%;
  }
}
</style>