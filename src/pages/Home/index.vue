<template>
  <div class="warp">
    <Top></Top>
    <!-- 推荐页面的内容跟其他的页面内容不一样不太好复用，如果是推荐页面就显示这个结构 -->
    <div v-if="currentRouteisHome">
      <div class="carousel">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item width="20px" v-for="item in carousel" :key="item.id">
            <img :src="item.picUrl" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="policy">
        <ul class="policyList">
          <li v-for="(item,index) in policyDescList" :key="index">
            <a href="javascript:;">
              <i
                :style="{width:'12px',height:'12px',backgroundImage:`url(${item.icon})`,backgroundSize:'cover',display: 'inline-block'}"
              ></i>
              <span>{{item.desc}}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="categoryList" v-if="kingKongModule">
        <a href="javascript:;" v-for="(item,index) in kingKongModule.kingKongList" :key="index">
          <img :src="item.picUrl" alt width="60px" />
          <div>{{item.text}}</div>
        </a>
      </div>
      <div class="tupian">
        <img
          style="width:100%"
          src="https://yanxuan.nosdn.127.net/7fd95465634b18169466121fae470269.png?quality=75&type=webp&imageView&thumbnail=750x0"
          alt
        />
      </div>
    </div>
    <!-- 推荐页面的内容跟其他的页面内容不一样不太好复用，如果是不是推荐页面就显示这个结构 -->
    <div v-else>
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
          <img :src="item.wapBannerUrl" alt />
          <p style="backgroundColor:#ccc">{{item.frontDesc}}</p>
          <p>{{item.name}}</p>
          <p>￥100元</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      // 判断当前是否是推荐页面
      currentRouteisHome: 1,
      details: []
    };
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
          this.currentRouteisHome = this.$route.path === "/home" ? 1 : 0;
        }
      });
    }
  },
  async mounted() {
    // 获取推荐页面数据
    this.$store.dispatch("getHomeData");
    // 获取nav
    this.$store.dispatch("getNavList");
    //获取内容
    this.$store.dispatch("getLunbotu");
  },
  computed: {
    ...mapGetters([
      "carousel",
      "policyDescList",
      "kingKongModule",
      "getNavList",
      "getLunbotu"
    ])
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
// 主页推荐的样式
.warp {
  .carousel {
    // padding-top: 41px;
    img {
      width: 100%;
      height: 200px;
    }
  }
  .policy {
    .policyList {
      display: flex;
      justify-content: space-evenly;
      font-size: 14px;
      & > li {
        margin: 0 5px;
        color: #000;
      }
    }
  }
  .categoryList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 13px;
    text-align: center;
    & > a {
      margin: 9px 0 5px 5px;
    }
  }
}

// 主页除开推荐的样式
.my-swipe {
  & img {
    width: 100%;
  }
  padding-top: 71px;
}
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
  & img {
    width: 100%;
  }
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
</style>