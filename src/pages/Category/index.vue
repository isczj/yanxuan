<template>
  <!-- 点击分类组件左侧nav导航后显示的详情 -->
  <div class="warp">
    <div class="border">
      <div class="header-ipt" @click="goSearch">
        <van-icon name="search" />
        <span class="placeholder">搜索商品,共27908款好物</span>
      </div>
    </div>
 
    <div class="content">
      <van-sidebar class="left" v-model="activeKey">
        <van-sidebar-item
          :title="item.name"
          v-for="item in list"
          :key="item.id"
          :to="`/category/${item.id}`"
        />
      </van-sidebar>
      <div class="right">
        <!-- {{rightData}} -->
        <img :src="rightData.img" alt />
        <ul>
          <!-- 有些数据没有categoryList 结构不一样,动态改变结构-->
          <li v-for="item in rightData.categoryList" :key="item.id">
            <img :src="item.bannerUrl" alt />
            <p>{{item.name}}</p>
          </li>
        </ul>
        <!-- 有些数据没有categoryList 结构不一样,动态改变结构-->
        <ul>
          <li v-for="item in rightData.subCateList" :key="item.id">
            <img :src="item.wapBannerUrl" alt />
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Category",
  data() {
    return {
      //左侧navUI库自带属性
      activeKey: 0,
      //左侧nav的数据
      list: [],
      //右侧详情的数据
      rightData: {}
    };
  },
  mounted() {
    //获取左侧nav数据
    this.reqList();
    //获取右侧详情数据
    this.reqRightData();
  },
  methods: {
    //获取左侧nav数据
    async reqList() {
      const result = await this.$store.dispatch("getCategoryList");
      this.list = this.$store.state.Category.categoryList.categoryL1List;
    }, //获取右侧详情数据

    async reqRightData() {
      const result = await this.$store.dispatch("getRightData");
      this.rightData = this.$store.state.Category.rightData;
    },
    //去搜素页面
    goSearch(){
      this.$router.push('/search')
    }
  },
  watch: {
    $route() {
      const data = this.$store.state.Category.rightData;
      data.forEach(item => {
        const id = this.$route.params.id;
        const itemId = item.id;
        if (id == itemId) {
          this.rightData = item;
        }
      });
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.border {
  background-color: white;
  position: fixed;
  padding-bottom: 5px;
  width: 100%;
  z-index: 1;
  border-bottom: 1px solid #ccc;
  .header-ipt {
    width: 100%;
    margin: 10px auto;
    padding-bottom: 10px;
    text-align: center;
    .search {
      // display: block;
      // margin-top: 10px;
    }
    background-color: #ededed;
    padding: 5px 14px;
    border-radius: 5px;
    font-size: 15px;
  }
}
.content {
  padding-top: 56px;
  display: flex;

  .right {
    // flex: 1;
    width: 290.2px;
    border-left: 1px solid #ccc;
    & > img {
      width: 90%;
      margin-left: 10px;
      margin-top: 10px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-evenly;
      li {
        text-align: center;
        width: 28%;
        margin-left: 10px;
        margin-top: 10px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>