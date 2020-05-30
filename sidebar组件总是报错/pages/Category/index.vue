<template>
  <div>
    <van-sidebar v-model="activeKey">
      <van-sidebar-item :title="item.name" v-for="item in list" :key="item.id" to="/category/1" />
    </van-sidebar>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "Category",
  data() {
    return {
      activeKey: 0,
      list: []
    };
  },
  mounted() {
    this.reqList();
  },
  methods: {
    async reqList() {
      const result = await this.$store.dispatch("getCategoryList");
      this.list = this.$store.state.Category.categoryList.categoryL1List;
    }
  },
  watch: {
    $route() {
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.van-sidebar {
  .van-sidebar-item--select > van-sidebar-item__text {
    display: inline;
    color: red;
    // width: 80px;
  }
}
</style>