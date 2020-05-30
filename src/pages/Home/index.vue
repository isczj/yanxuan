<template>
  <div class="warp">
    <Top></Top>
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
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },
  async mounted() {
    this.$store.dispatch("getHomeData");
    this.$store.dispatch("getNavList");
  },
  computed: {
    ...mapGetters(["carousel", "policyDescList", "kingKongModule"]) // 获取商品信息
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.warp {
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
      margin-top: 2px;
      height: 30px;
      li {
        float: left;
        margin: 0 10px;
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
  .carousel {
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
</style>