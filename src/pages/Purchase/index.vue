<template>
  <div class="warp">
    <header class="header">
      <van-icon name="wap-home-o" size="30" />
      <h1>值得买</h1>
      <div>
        <van-icon name="search" size="30" />
        <van-icon class="rightIcon" name="shopping-cart-o" size="30" />
      </div>
    </header>
    <div class="content">
      <img class="background" src="./topic_title_bg.2373a140.png" alt />
      <h2>值得买 严选好物 用心生活</h2>
      <van-swipe class="my-swipe" width="90% " indicator-color="red">
        <van-swipe-item>
          <div class="item">
            <div class="item-item" v-for="item in topData1" :key="item.id">
              <img :src="item.picUrl" alt />
              <p>{{item.viceTitle}}</p>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="item">
            <div class="item-item" v-for="item in topData2" :key="item.id">
              <img :src="item.picUrl" alt />
              <p>{{item.viceTitle}}</p>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="item">
            <div class="item-item" v-for="item in topData3" :key="item.id">
              <img :src="item.picUrl" alt />
              <p>{{item.viceTitle}}</p>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="tag" v-if="leftData &&rightData">
        <div class="leftWaterfall">
          <div class="item" v-for="(item,index) in leftData" :key="index">
            <ul v-if="item.buyNow">
              <li class="a">
                <img :src="item.buyNow.itemUrl" alt />
              </li>
              <li class="b">{{item.title}}</li>
              <li class="c">
                <img :src="item.avatar" alt />
                <span>{{item.nickname}}</span>
              </li>
              <li class="d">{{item.buyNow.itemName}}</li>
            </ul>
            <ul v-if="!item.buyNow">
              <li class="aa">
                <img :src="item.picUrl" alt />
              </li>
              <li class="bb">{{item.title}}</li>
              <li class="cc">
                <img :src="item.avatar" alt />
              </li>
            </ul>
          </div>
        </div>
        <div class="rightWaterfall"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Purchase",
  data() {
    return {
      topData1: [],
      topData2: [],
      topData3: []
      // numberDiv: 0
    };
  },
  mounted() {
    this.dispatch();
    this.getWaterfall();
    setTimeout(() => {
      const total = this.gettotal;
      total.forEach((item, index) => {
        if (index <= 7) {
          this.topData1.push(item);
        } else if (index <= 15) {
          this.topData2.push(item);
        } else {
          this.topData3.push(item);
        }
      });
      // this.numberDiv = Math.ceil(this.topData.length / 8);
      // console.log(this.numberDiv);
    }, 200);
  },
  computed: {
    ...mapGetters(["gettotal", "leftData", "rightData"])
  },
  methods: {
    //获取小图
    async dispatch() {
      await this.$store.dispatch("getTopData");
    },
    //获取瀑布流数据
    async getWaterfall() {
      await this.$store.dispatch("getWaterfallData", 1);
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
    .rightIcon {
      margin-left: 10px;
    }
    h1 {
      margin-left: 30px;
    }
  }
  .content {
    h2 {
      margin-top: -50px;
      margin-left: 20px;
      margin-bottom: 30px;
      font-size: 20px;
      color: white;
      font-weight: 900;
    }
    .background {
      box-shadow: 0px 15px 10px 0px rgba(204, 204, 204, 0.3);
      width: 100%;
      margin-bottom: -120px;
    }
    .item {
      width: 90%;
      height: 250px;
      margin: 0 auto;
      background-color: white;
      border-radius: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      .item-item {
        width: 20%;
        margin: 2px 5px;
        img {
          width: 100%;
        }
      }
    }
    .tag {
      display: flex;
      justify-content: space-evenly;
      .leftWaterfall {
        width: 45%;
        li {
          border-radius: 10px;
          overflow: hidden;
          img {
            width: 100%;
            display: block;
          }
        }
        .a {
          img {
          }
        }
        .c {
          border-radius: 0%;
          padding-bottom: 5px;
          border-bottom: 1px solid #ccc;
          img {
            width: 30px;
            border: 50%;
            border-radius: 50%;
            display: inline-block;
            vertical-align: middle;
          }
          span {
            font-size: 10px;
          }
        }
        .d {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-top: 8px;
          font-size: 10px;
        }
    .cc{
        img {
            width: 30px;
            border: 50%;
            border-radius: 50%;
            display: inline-block;
            vertical-align: middle;
          }
    }
      }
    }
  }
}
</style>