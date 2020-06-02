<template>
  <div class="header">
    <!-- 头部上部分 -->
    <div class="header-top">
      <a href="javascript:;">网易严选</a>
      <div class="header-ipt" @click="toSearch">
        <van-icon name="search" />
        <span class="placeholder">搜索商品,共27908款好物</span>
      </div>
      <div class="login" @click="goLogin" v-if="LogNo">登录</div>
    </div>
    <!-- 头部上部分nav导航 -->
    <div class="header-bottom">
      <ul ref="ul">
        <!-- 用来滑屏的 -->
        <div class="slide" ref="silde">
          <!-- 推荐按钮 遍历的时候会传入一个索引,然后动态更改索引和预设上去的值匹配就变颜色-->
          <li @click="goHome(1)" :class="{active:currentIndex===-1}">推荐</li>
          <!-- 除开推荐的其他按钮 遍历的时候会传入一个索引,然后动态更改索引和预设上去的值匹配就变颜色-->
          <li
            v-for="(item,index) in getNavList"
            :class="{active:currentIndex==index}"
            @click="xiugai(index)"
            :key="item.id"
          >
            <router-link :to="`/home/${item.id}`">{{item.name}}</router-link>
          </li>
        </div>
      </ul>
      <div class="icon">
        <van-icon name="arrow-down" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import tools from "./js/tools";
export default {
  name: "Top",
  data() {
    return {
      currentIndex: -1,
      LogNo: true
    };
  },
  mounted() {
    //如果已经登录过了,登录的按钮就不要显示了
    const token = localStorage.getItem("touken");
    if (token) {
      this.LogNo = false;
    }
    //滑屏
    this.drag();
  },
  computed: {
    ...mapGetters(["getNavList"])
  },
  methods: {
    //去主页
    goHome() {
      this.currentIndex = -1;
      this.$router.push("/");
    },
    // 去搜索
    toSearch() {
      this.$router.push("/search");
    },
    // 选中变色
    xiugai(index) {
      this.currentIndex = index;
    },
    goLogin() {
      this.$router.push("/login");
    },
    //拖动导航栏效果
    drag() {

      //手指滑动在哪里滑动
      let oNav = this.$refs.ul;
      //要拖动的元素
      let oList = this.$refs.silde;

      //定义一些变量的初始值
      let startX = 0; //初始化当前手开始点击的位置
      let elementX = 0; //初始化当前元素的位置
      let translateX = 0; //初始化元素应该最终的位置
      let minX = oNav.offsetWidth - oList.offsetWidth;
      oNav.addEventListener(
        "touchstart",
        function(e) {       
          //获取当前事件的手指头,touchList的内容
          let touch = e.changedTouches[0];
          //获取当前手指的位置
          startX = touch.clientX;
          //获取元素现在的位置信息,用来位移
          elementX = tools1.css(oList, "translateX");
        },
        { passive: false }
      );
      oNav.addEventListener("touchmove", function(e) {
        //获取当前事件的手指头
        let touch = e.changedTouches[0];
        //获取当前手指头的位置
        let nowX = touch.clientX;
        //计算差值
        let disX = nowX - startX;
        //给元素的最终位置赋值
        translateX = elementX + disX;

        //判断临界值
        if (translateX >= 0) {
          translateX = 0;
        } else if (translateX < minX) translateX = minX;
        //把元素的最终位置赋值给元素
        tools1.css(oList, "translateX", translateX);
      });
    }
  },
  watch: {
    $route() {}
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.header {
  width: 100%;
  position: fixed;
  background-color: white;
  z-index: 1;
  .header-top {
    // width: 100%;
    display: flex;
    padding: 5px 12px;
    align-items: center;
    justify-content: space-between;
    .header-ipt {
      background-color: #ededed;
      padding: 5px 14px;
      border-radius: 5px;
      font-size: 15px;
      margin-right: 60px;
    }
    .login {
      color: red;
      border: 1px solid red;
      border-radius: 4px;
      padding: 3px 7px;
      font-size: 12px;
      line-height: 12px;
      position: absolute;
      left: 85%;
    }
  }
  .header-bottom {
    display: flex;
    justify-content: space-between;
    ul {
      // position: absolute;
      margin-top: 2px;
      height: 30px;
      white-space: nowrap;
      overflow: hidden;
      color: #ccc;
      .slide {
        float: left;
        li {
          margin: 0 10px;
          display: inline-block;
        }
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
  .active a {
    color: red;
  }
  .active {
    color: red;
  }
}
</style>