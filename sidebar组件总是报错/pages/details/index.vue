<template>
  <div class="warp">
    <Top></Top>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in getLunbotu" :key="index">
        <img :src="item.url" alt />
      </van-swipe-item>
    </van-swipe>
    <div class="title">
      <h1>{{details.titile1}}</h1>
      <span>{{details.titile2}}</span>
    </div>
    <div class="details">
      <div v-for="item in details.subCateList" :key="item.showIndex">
         <img :src="item.wapBannerUrl" alt="">
         <p style="backgroundColor:#ccc">{{item.frontDesc}}</p>
         <p>{{item.name}}</p>
         <p>￥100元</p>
      </div>
    </div>
  </div>
</template>
<script>
// 这个组件是点击nav导航栏进入的详情页面,点击不同的nav会有不同的详情内容
import { mapGetters } from "vuex";
export default {
  name: "Details",
  data() {
    return {
      details: []
    };
  },
  mounted() {
    this.$store.dispatch("getNavList");
    this.$store.dispatch("getLunbotu");
  },
  watch: {
    /* 
    每个nav都有自己的id,监视路由跳转,跳转的时候路由传入id,因为我获取了所有nav的详情信息,所以我只要遍历全部
    数据,然后拿到所有数据里面每个对象的id,然后跟我传入进来的id对比,对比上了就存入data里面
    */
    $route(to, from) {
      const data = this.getNavList;
      const id = to.params.id;
      data.forEach(item => {
        if (item.id == id) {
          this.details = item;
        }
      });
    }
  },
  computed: {
    ...mapGetters(["getNavList", "getLunbotu"])
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.warp {
  .title {
    height: 70px;
    text-align: center;
    overflow: hidden;
    h1 {
      font-size: 20px;
      margin: 5px 5px;
    }
    span {
      text-align: center;
      margin: auto;
      color: #ccc;
    }
  }
  .details {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    div {
      width: 45%;
      // height: 220px;
      // background-color: red;
      margin-top: 10px;
    }
  }
}
img {
  width: 100%;
}
</style>