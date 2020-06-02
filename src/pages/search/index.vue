<template>
  <div class="warp">
    <div class="top">
      <div class="ipt">
        <van-icon name="search" />
        <input type="text" ref="ipt" @keyup.enter="enter" placeholder="致我们共同的61节,童趣好礼4折起" />
        <span @click="goBack">取消</span>
      </div>
      <div class="test">
        <div class="test-top">
          <span>历史记录</span>
          <van-icon name="delete" />
        </div>
        <div class="test-bottom">
          <van-tag plain size="medium">鞋子</van-tag>
          <van-tag plain size="medium">衣服</van-tag>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="hot">热门搜素</div>
      <div class="hotSearch">
        <van-tag plain size="medium" color="red">看视频领红包</van-tag>
        <van-tag plain size="medium">拖鞋</van-tag>
        <van-tag plain size="medium" color="red">口罩专区</van-tag>
        <van-tag plain size="medium">风扇</van-tag>
        <van-tag plain size="medium" color="red">云闪付立减商品2折起</van-tag>
        <van-tag plain size="medium">驱蚊</van-tag>
        <van-tag plain size="medium">被子</van-tag>
        <van-tag plain size="medium">湿巾</van-tag>
        <van-tag plain size="medium">水杯</van-tag>
        <van-tag plain size="medium">小龙虾</van-tag>
        <van-tag plain size="medium">洗衣液</van-tag>
        <van-tag plain size="medium">筷子</van-tag>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Search",
  methods: {
    //按回车进行搜索
    async enter() {
      if (!this.$refs.ipt.value) return;
      const value = this.$refs.ipt.value;
      this.$refs.ipt.value = "";
      const keyword = value;
      const sortType = 0;
      const descSorted = false;
      const categoryId = 0;
      const matchType = 0;
      const floorPrice = -1;
      const upperPrice = -1;
      const size = 40;
      const itemId = 0;
      const stillSearch = false;
      const searchWordSource = 1;
      const needPopWindow = true;
      const _stat_search = "userhand";
      const data = `keyword=${keyword}&sortType=0&descSorted=false&categoryId=0&matchType=0&floorPrice=-1&upperPrice=-1&size=40&itemId=0&stillSearch=false&searchWordSource=1&needPopWindow=true&_stat_search=userhand`;
      await this.$store.dispatch("getSearchData", data);
      this.$router.push("/search/value");
    },
    // 点击取消
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    //一进来获取焦点
    this.$refs.ipt.focus();
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.warp {
  position: absolute;
  z-index: 3;
  height: 100%;
  background-color: #eee;
  .top {
    background-color: white;
    overflow: hidden;
    .ipt {
      position: relative;
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      .van-icon {
        position: absolute;
        left: 25px;
        top: 7px;
      }
      & > input {
        width: 250px;
        background-color: #ccc;
        padding: 5px 0px 5px 30px;
        border-radius: 3px;
        border: none;
      }
      span {
        margin-left: -15px;
        align-self: center;
      }
    }
    .test {
      .test-top {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        span {
          margin-left: 20px;
        }
        .van-icon {
          position: absolute;
          left: 90%;
        }
      }
      .test-bottom {
        display: flex;
        margin: 30px 0;
        .van-tag {
          margin-left: 20px;
        }
      }
    }
  }
  .bottom {
    background-color: white;
    margin-top: 20px;
    //   height: 100px;
    //   background-color: blue;
    overflow: hidden;
    padding-bottom: 30px;
    .hot {
      padding: 20px;
      padding-bottom: 5px;
    }
    .hotSearch {
      width: 90%;
      .van-tag {
        margin-left: 20px;
        margin-top: 20px;
      }
    }
  }
}
</style>