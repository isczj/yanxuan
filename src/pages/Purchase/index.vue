<template>

<!-- 值得买组件 -->
  <div class="warp">
    <header class="header">
      <van-icon name="wap-home-o" size="30" @click="clickIcon" />
      <h1>值得买</h1>
      <div>
        <van-icon name="search" size="30" @click="goSearch" />
        <van-icon class="rightIcon" name="shopping-cart-o" size="30" />
      </div>
    </header>
    <div class="content">
      <h2>
        值得买
        <span>严选好物 用心生活</span>
      </h2>
      <!--导航栏数据 -->
      <ul class="titleImg" ref="oUl">
        <!-- 导航栏容器-->
        <div class="container" ref="container">
          <li v-for="(item,index) in navList" :key="index">
            <div class="containerItem" v-for="(item2,index) in item" :key="index">
              <img :src="item2.picUrl" alt />
              <p>{{item2.mainTitle}}</p>
              <span>{{item2.viceTitle}}</span>
            </div>
          </li>
        </div>
        <!-- 分页 -->
        <div class="paging">
          <div class="pagingItem" ref="jingdutiao"></div>
        </div>
      </ul>
      <!-- 底部瀑布流 -->
      <div class="footer">
        <div class="left">
          <div class="leftItem" v-for="(item,index) in leftWaterfallData" :key="index">
            <!-- 如果有buyNow这个属性的话,就从buy里面的itemUrl里面取属性 -->
            <img v-if="item.buyNow" :src="item.buyNow.itemUrl" v-lazy="item.buyNow.itemUrl" />
            <!-- 如果没有的话就在picUrl里面取属性 -->
            <img v-else :src="item.picUrl" v-lazy="item.picUrl" />
            <p class="describe">{{item.title}}</p>
            <p class="userInfo">
              <img :src="item.avatar" alt class="userInfoImg" />
              <span class="userInfoName">{{item.title}}</span>
            </p>
            <p class="leftItemFooter" v-if="item.buyNow">{{item.buyNow.itemName}}</p>
          </div>
        </div>
        <div class="right">
          <div class="rightItem" v-for="(item,index) in rightWaterfallData" :key="index">
            <!-- 如果有buyNow这个属性的话,就从buy里面的itemUrl里面取属性 -->
            <img v-if="item.buyNow" :src="item.buyNow.itemUrl" alt />
            <!-- 如果没有的话就在picUrl里面取属性 -->
            <img v-else :src="item.picUrl" alt />
            <p class="rightItem-describe">{{item.title}}</p>
            <p class="rightItem-userInfo">
              <img :src="item.avatar" alt class="rightItem-userInfoImg" />
              <span class="rightItem-userInfoName">{{item.title}}</span>
            </p>
            <p class="leftItemFooter" v-if="item.buyNow">{{item.buyNow.itemName}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* 
  瀑布流有两种数据一种是具体的商品，一种是类似广告的数据
  如果是具体的商品就有buyNow属性,要在他身上拿大图片buyNow.itemUrl和底部信息buyNow.itemName
*/
import { mapGetters } from "vuex";
export default {
  name: "Purchase",
  data() {
    return {
      // 导航栏数据
      navList: [],
      // 瀑布流结构为两竖,左边的数据
      leftWaterfallData: [],
      // 瀑布流结构为两竖,右边的数据
      rightWaterfallData: []
    };
  },
  //红条跟实际内容同比例
  updated() {
    const neicengrongqi = this.$refs.container.clientWidth;
    const waicengrongqi = this.$refs.oUl.clientWidth;
    const bili = waicengrongqi/neicengrongqi
    this.$refs.jingdutiao.style.width=(bili*100)+'%'
  },
  mounted() {
    //获取导航栏数据  
    this.getNavList();
    // 获取瀑布流数据
    this.getWaterfall();
  },
  computed: {
    //计算左右两边瀑布流的数据
    ...mapGetters(["leftData", "rightData"])
  },
  methods: {
    //获取导航栏数据
    async getNavList() {
      await this.$store.dispatch("getTopData");
      let result = this.$store.state.Purchase.topData.navList;
      this.navList = this.tool(result);
    },
    //获取瀑布流数据
    async getWaterfall() {
      await this.$store.dispatch("getWaterfallData", 1);
      this.leftWaterfallData = this.leftData;
      this.rightWaterfallData = this.rightData;
    },
    //封装的一个工具函数把[{1},{2},{3},{4},{5}]变成[[{1},{2}],[{3},{4}],[{5}]]的形式
    tool(value) {
      var newArr = [];
      var j = 0;
      var rongqi = [];
      for (var i = 0; i < value.length; i++) {
        ++j;
        rongqi.push(value[i]);
        if (j % 2 == 0) {
          newArr.push(rongqi);
          rongqi = [];
        }
        if (i === value.length - 1 && rongqi.length === 1) {
          newArr.push(rongqi);
        }
      }
      return newArr;
    },
    //点击去主页
    clickIcon() {
      this.$router.push("/home");
    },
    //去搜索页面
    goSearch() {
      this.$router.push("/search");
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.warp {
  height: 2000px;
  .header {
    background-color: white;
    position: fixed;
    height: 50px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    z-index: 1;
    width: 100%;
    align-items: center;
    overflow: hidden;
    .rightIcon {
      margin-left: 10px;
    }
    h1 {
      margin-left: 30px;
    }
  }
  .content {
    position: relative;
    width: 100%;
    // height: 10000px;
    // padding-top: 50px;
    background-image: url(./topic_title_bg.2373a140.png);
    background-repeat: no-repeat;
    background-size: 100%;
    //照片墙的框框
    .titleImg {
      width: 352px;
      height: 270px;
      border: 1px solid #ccc;
      margin: 34px auto 0;
      border-radius: 15px;
      overflow: hidden;
      .container {
        float: left;
        white-space: nowrap;
        li {
          width: 88px;
          height: 272px;
          // border: 1px solid red;
          display: inline-block;
          box-sizing: border-box;
          .containerItem {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            height: 50%;
            background-color: white;
            img {
              width: 70%;
            }
            span {
              font-size: 10px;
              color: #ccc;
            }
          }
        }
      }
    }
    h2 {
      padding-top: 90px;
      padding-left: 10px;
      font-size: 20px;
      color: white;
      span {
        font-size: 15px;
      }
    }
    .paging {
      position: absolute;
      width: 80px;
      height: 5px;
      border-radius: 30px;
      background-color: #ccc;
      left: 50%;
      transform: translateX(-50%);
      top: 20%;
    }
    .pagingItem {
      width: 20px;
      height: 5px;
      background-color: red;
    }
  }
  .footer {
    background: #eee;
    width: 352px;
    margin: 20px auto;
    border-radius: 10px;
    // background-color: red;
    display: flex;
    justify-content: space-between;
    // overflow: hidden;
    .left {
      width: 48%;
      // background-color: rosybrown;
      // 这里是每一个对象的less
      .leftItem {
        background-color: white;
        border-radius: 10px;
        // background-color: red;
        margin-bottom: 15px;
        & > img {
          width: 100%;
          border-radius: 10px;
        }
        .describe {
          padding: 0 5px;
        }
        .userInfo {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          border-bottom: 1px solid #ccc;
          .userInfoImg {
            width: 30px;
            border-radius: 50%;
            padding: 5px;
            vertical-align: middle;
          }
          .userInfoName {
            font-size: 10px;
            vertical-align: middle;
            // float: left;
          }
        }
        .leftItemFooter {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 12px;
          padding: 5px;
        }
      }
    }
    .right {
      width: 48%;
      .rightItem {
        background-color: white;
        border-radius: 10px;
        margin-bottom: 15px;
        & > img {
          width: 100%;
          border-radius: 10px;
        }
        .rightItem-describe {
          padding: 0 5px;
        }
        .rightItem-userInfo {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          border-bottom: 1px solid #ccc;
          .rightItem-userInfoImg {
            width: 30px;
            border-radius: 50%;
            padding: 5px;
            vertical-align: middle;
          }
          .rightItem-userInfoName {
            font-size: 10px;
            vertical-align: middle;
            // float: left;
          }
        }
      }
    }
  }
}
</style>






 






















