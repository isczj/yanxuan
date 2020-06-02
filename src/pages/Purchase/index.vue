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
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
          </van-list>
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
//用于拖拽的工具函数
import tools from "./js/tools";
export default {
  name: "Purchase",
  data() {
    return {
      // 导航栏数据
      navList: [],
      // 瀑布流结构为两竖,左边的数据
      leftWaterfallData: [],
      // 瀑布流结构为两竖,右边的数据
      rightWaterfallData: [],
      jingdutiaoWidth: "0",
      //第一次请求第一页的瀑布流
      page: 1,
      loading: false,
      finished: false
    };
  },
  //红条跟实际内容同比例
  updated() {
    //外层框框的宽度
    const neicengrongqi = this.$refs.container.clientWidth;
    //内容的实际宽度
    const waicengrongqi = this.$refs.oUl.clientWidth;
    //内容实际宽度是外层框框宽度的几倍,向上取整
    const jingdutiaoWidth = Math.ceil(neicengrongqi / waicengrongqi);
    const length = 1 / jingdutiaoWidth;
    //求出百分比给状态
    this.jingdutiaoWidth = length * 100 + "%";
    this.jingdutiaoWidth.split("%")[0];
    //给进度条一个过渡动画
    this.$refs.jingdutiao.style.transition = "all 1s";
    //赋值
    this.$refs.jingdutiao.style.width = this.jingdutiaoWidth;
  },
  mounted() {
    const _this = this;
    //获取导航栏数据
    this.getNavList();
    // 获取瀑布流数据
    this.getWaterfall();
    //拖拽
    this.drag();
  },
  computed: {
    //计算左右两边瀑布流的数据
    ...mapGetters(["leftData", "rightData"])
  },
  methods: {
    async onLoad() {
      await this.getWaterfall();
      this.loading = false;
      if (this.leftData.length <= 0 && this.rightData.length <= 0) {
        this.finished = true;
      }
    },
    //获取导航栏数据
    async getNavList() {
      await this.$store.dispatch("getTopData");
      let result = this.$store.state.Purchase.topData.navList;
      this.navList = this.tool(result).splice(0, 8);
    },
    //获取瀑布流数据
    async getWaterfall() {
      await this.$store.dispatch("getWaterfallData", this.page);
      this.page++;
      this.leftWaterfallData.push(...this.leftData);
      this.rightWaterfallData.push(...this.rightData);
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
      this.$router.push("/");
      this.$bus.$emit("goHome", "/");
    },
    //去搜索页面
    goSearch() {
      this.$router.push("/search");
    },
    //拖拽 ,(如果数据变多,部分逻辑无效)
    drag() {
      const _this = this;
      //手指在哪里滑动
      let oUl = this.$refs.oUl;
      //拖谁
      let oContainer = this.$refs.container;

      //定义一些变量的初始值
      let startX = 0; //初始化当前手指开始点击的位置
      let elmentX = 0; //初始化当前元素的位置
      let translateX = 0; //初始化元素应该最终的位置
      let minX = -oUl.offsetWidth - oContainer.offsetWidth; //最大临界值
      oUl.addEventListener(
        "touchstart",
        function(e) {
          //一点就取消过度动画
          oContainer.style.transition = "none";
          //获取当前事件的手指头,touchList的内容
          let touch = e.changedTouches[0];
          //获取当前手指的位置
          startX = touch.clientX;
          //获取元素现在的位置信息,用来位移
          elmentX = tools1.css(oContainer, "translateX");
        },
        { passive: false }
      );
      oUl.addEventListener(
        "touchmove",
        function(e) {
          //获取当前事件的手指头
          let touch = e.changedTouches[0];
          //获取当前手指头的位置
          let nowX = touch.clientX;
          //计算差值
          let disX = nowX - startX;
          //元素应该在的位置
          translateX = elmentX + disX;
          if (translateX >= 0) {
            translateX = 0;
          } else if (translateX < minX) translateX = minX;
          //赋值
          tools1.css(oContainer, "translateX", translateX);
        },
        {
          passive: false
        }
      );
      oUl.addEventListener(
        "touchend",
        function(e) {
          oContainer.style.transition = "all 1s";
          //获取手指头位置
          let touch = e.changedTouches[0].clientX;
          //判断手指头移动了多少
          const moveLength = touch - startX;
          const moveLengthAbs = Math.abs(moveLength);
          const wdith1 = oUl.offsetWidth / 2;
          if (moveLengthAbs < wdith1) {
            tools1.css(oContainer, "translateX", elmentX);
          } else {
            //内容翻到哪里进度条走到哪里
            if (moveLength < 0) {
              //如果到了百分白就不动了
              if (_this.jingdutiaoWidth === "100%") return;
              tools1.css(oContainer, "translateX", -wdith1 * 2);
              const value = _this.jingdutiaoWidth.split("%")[0];
              _this.jingdutiaoWidth = value * 2 + "%";
              _this.$refs.jingdutiao.style.width = _this.jingdutiaoWidth;
            } else {
              //如果等于百分50就不动了
              if (_this.jingdutiaoWidth === "50%") return;
              tools1.css(oContainer, "translateX", 0);
              const value = _this.jingdutiaoWidth.split("%")[0];
              _this.jingdutiaoWidth = value / 2 + "%";
              _this.$refs.jingdutiao.style.width = _this.jingdutiaoWidth;
            }
          }
        },
        {
          passive: false
        }
      );
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.warp {
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
      position: relative;
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
      top: 80%;
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






 






















