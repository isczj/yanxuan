<template>
  <div>
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item name="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="/category/11" icon="search">分类</van-tabbar-item>
      <van-tabbar-item name="/purchase" icon="friends-o">值得买</van-tabbar-item>
      <van-tabbar-item name="/shopCar" icon="setting-o">购物车</van-tabbar-item>
      <van-tabbar-item name="/self" icon="setting-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      active: "/"
    };
  },

  mounted() {
    this.$router.push("/");
    this.$bus.$on("goHome", tagget => {
      this.active = tagget;
    });
  },
  //当路由发生改变的时候,跳转至目标页面,并且存入localStorage中
  watch: {
    active() {
      this.$router.push({ path: this.active });
      localStorage.setItem("route", JSON.stringify(this.active));
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less'>
</style>

 