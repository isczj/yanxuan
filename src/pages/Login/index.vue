<template>
  <div class="warp">
    <!-- 导航 -->
    <van-nav-bar class="header" title="网易严选" fixed>
      <template #right>
        <van-icon name="search" size="28" @click="goSearch" />
        <van-icon name="cart-o" size="28" />
      </template>
      <template #left>
        <van-icon name="wap-home-o" size="28" @click="goHome" />
      </template>
    </van-nav-bar>
    <!-- 图标 -->
    <h1>
      <img src="./images/39c5e4583753d4c3cb868a64c2c109ea.png" alt />
    </h1>
    <div class="btn">
      <van-button @click="quSelf" icon="phone-o" type="danger" size="large">手机账号快捷登录</van-button>
      <van-button @click="quSelf" icon="envelop-o" color="#DC143C" size="large" plain>邮箱账号登录</van-button>
    </div>
    <div class="footer">
      <div>
        <span>微信</span>
      </div>
      <div class="center">
        <span>QQ</span>
      </div>
      <div>微博</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  methods: {
    //去主页
    goHome() {
      this.$router.push("/");
      this.$bus.$emit("goHome",'/');
    },
    //去搜索
    goSearch() {
      this.$router.push("/search");
    },
    //点击登录
    quSelf() {
      this.$toast("登陆成功");
      const redirect = this.$route.query.redirect;
      setTimeout(() => {
        localStorage.setItem("touken", JSON.stringify("11111"));
        this.$router.replace(redirect || "/");
      }, 500);
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
html,
body {
  height: 100%;
}
.warp {
  .header {
    /deep/ i {
      color: #000;
    }
  }
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  //   justify-content: space-between;
  h1 {
    padding-top: 150px;
    text-align: center;
    & > img {
      width: 30%;
    }
  }
  .btn {
    padding-top: 100px;

    .van-button {
      transform: translateX(20px);
      width: 90%;
    }
  }
  .footer {
    flex: 1;
    display: flex;
    background-color: white;
    z-index: 2;
    align-items: center;
    justify-content: center;
    & > div {
      padding: 0 20px;
      margin-top: 120px;
    }
    .center {
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }
  }
}
</style>