<template>
  <div class="warp">
    <div class="header">
      <div class="header-top">
        <van-icon size="30" name="wap-home-o" @click="gohome" />
        <span class="remove" v-show="value" @click="returnSearch">x</span>
        <input type="text" v-model="value" ref="ipt" @keyup.enter="enter" placeholder="请入搜素内容" />
        <van-icon class="fangdajing" name="search" />
      </div>
      <div class="header-bottom">
        <span :class="{active:currentIndex==1}" @click="clickSwitchSolt(1)">综合</span>
        <span :class="{active:currentIndex==2}" @click="clickSwitchSolt(2)">价格</span>
        <span :class="{active:currentIndex==3}" @click="clickSwitchSolt(3)">分类</span>
      </div>
    </div>
    <div class="content">
      <SwitchSolt v-if="isShowSwitch" :currentIndex="currentIndex" @clickOk="clickOk" />
      <ul v-for="item in reqInfo" :key="item.id">
        <li>
          <img :src="item.listPicUrl" alt />
          <p>{{item.name}}</p>
          <span>￥{{item.retailPrice}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import SwitchSolt from "./SwitchSolt";
export default {
  name: "SearchValue",
  data() {
    //搜素到的数据
    return {
      reqInfo: [],
      value: "",
      isLoad: false,
      currentIndex: "1", //默认选中综合,
      isShowSwitch: false,
      descSorted: "false"
    };
  },
  components: {
    SwitchSolt
  },
  //descSorted，false是升序，true是降序
  methods: {
    //点击切换搜索条件
    clickSwitchSolt(index) {
      if (index == 1) {
        this.isShowSwitch = false;
        return;
      }
      if (this.isShowSwitch == true) {
        if (this.currentIndex == index) {
          this.isShowSwitch = false;
          return;
        }
      }
      this.currentIndex = index;
      this.isShowSwitch = true;
    },
    //搜素功能
    async enter() {
      console.log(this.value)
      console.log( this.$refs.ipt.value)
      // if (!this.$refs.ipt.value) return;
      this.value = this.$refs.ipt.value;
      const sortType = 0;
      const descSorted = this.descSorted;
      const categoryId = 0;
      const matchType = 0;
      const floorPrice = -1;
      const upperPrice = -1;
      const size = 40;
      const itemId = 0;
      const stillSearch = false;
      const searchWordSource = 1;
      const needPopWindow = "false";

      const data = `keyword=${this.value}&sortType=1&descSorted=${descSorted}&categoryId=0&matchType=0&floorPrice=-1&upperPrice=-1&size=40&itemId=0&stillSearch=false&searchWordSource=1&needPopWindow=false`;
      await this.$store.dispatch("getSearchData", data);
      this.reqInfo = this.$store.state.home.searchData;
    },
    //回主页
    gohome() {
      this.$router.replace("/home");
    },

    returnSearch() {
      this.$router.push("/search");
    },
    clickOk(value, sort) {
      this.isShowSwitch = false;
      if (value === "确定") {
        if (sort === 1) {
          this.descSorted = "false";
        } else {
          this.descSorted = "true";
        }
        this.enter();
      }
    }
  },
  mounted() {
    //一进来获取焦点
    this.$refs.ipt.focus();
    this.isLoad = true;
    this.reqInfo = this.$store.state.home.searchData;
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.header {
  background-color: white;
  padding: 10px 0;
  width: 100%;
  position: fixed;
  .header-top {
    position: relative;
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 10px;
    input {
      width: 80%;
      border-radius: 5px;
      border: none;
      background-color: #fafafa;
      padding-left: 25px;
    }
    .fangdajing {
      position: absolute;
      left: 13%;
      top: 20%;
    }
    .remove {
      position: absolute;
      left: 92%;
      top: 10%;
    }
  }
  .header-bottom {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fafafa;
    height: 40px;
    position: relative;
  }
}
.content {
  width: 95%;
  // height: 1000px;
  margin: 0 auto;
  padding-top: 99px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
  ul {
    width: 48%;
    // height: 200px;
    // background-color: red;
    img {
      width: 100%;
    }
  }
}

.active {
  color: red;
}
</style>