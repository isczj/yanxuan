<template>
  <!-- 点击分类组件左侧nav导航后显示的详情 -->
  <div class="warp">
    <div class="border">
      <div class="header-ipt">
        <van-icon name="search" />
        <span class="placeholder">搜索商品,共27908款好物</span>
      </div>
    </div>

    <div class="content">
      <van-sidebar class="left" @change="change" v-model="activeKey">
        <van-sidebar-item
          :title="item.name"
          v-for="item in list"
          :key="item.id"
          :to="`/category/${item.id}`"
        />
      </van-sidebar>
      <div class="right">
        <img :src="rightData.img" alt />
        <ul v-if="currentIndex">
          <li v-for="item in rightData.categoryList" :key="item.id">
            <!-- {{rightData}}
            {{item}}-->
            <img :src="item.bannerUrl" alt />
            <p>{{item.name}}</p>
          </li>
        </ul>
        <ul v-else>
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
      activeKey: 0,
      list: [],
      rightData: {},
      currentIndex: 0
    };
  },
  mounted() {
    this.reqList();
    this.reqRightData();
  },
  methods: {
    async reqList() {
      const result = await this.$store.dispatch("getCategoryList");
      this.list = this.$store.state.Category.categoryList.categoryL1List;
    },
    async reqRightData() {
      const result = await this.$store.dispatch("getRightData");
    },
    change(value) {
      if(value>=4){
        this.currentIndex=0
      }else{
        this.currentIndex=1
      }
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
/* .van-sidebar {
  .van-sidebar-item--select > van-sidebar-item__text {
    display: inline;
    color: red;
    // width: 80px;
  }
} */
/* .left {
  // display:inline-block;
  float: left;
}
.right {
  float: right;
  // width: 290px;
} */

.border {
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  .header-ipt {
    // border-bottom: 1px solid red;
    width: 80%;
    margin: 10px auto;
    padding-bottom: 10px;
    text-align: center;
    .search {
      display: block;
      margin-top: 10px;
    }
    background-color: #ededed;
    padding: 5px 14px;
    border-radius: 5px;
    font-size: 15px;
  }
}
.content {
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