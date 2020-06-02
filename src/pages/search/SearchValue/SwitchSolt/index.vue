<template>
  <div class="warp">
    <div class="SoltDetailItem">
      <div class="price">
        <div class="switch">
          <div class="switchTop">
            <span>筛选</span>
            <input type="text" placeholder="最低价" />
            <div class="line"></div>
            <input type="text" placeholder="最高价" />
          </div>
          <div class="switchTop">
            <span>排序</span>
            <div :class="{text:true,switch1:sort==1}" id="ww" @click="clickSort(1)">从低到高</div>
            <div class="line" id="ww"></div>
            <div :class="{text:true,switch1:sort==2}" id="ww" @click="clickSort(2)">从高到低</div>
          </div>
        </div>
        <div class="btn"  @click="clickChild">
          <button>取消</button>
          <button>确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SwitchSolt",
  data() {
    return {
      sort: 1
    };
  },
  props: ["currentIndex"],
  methods: {
    clickSort(index) {
      this.sort = index;
    },
    clickChild(e) {
       const text= e.target.innerText 
      this.$emit('clickOk',text,this.sort)
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less'>
html {
  // overflow: hidden;
}
.active {
  color: red;
}
#ww.switch1 {
  border: 1px solid red;
  color: red;
}
.warp {
  width: 375px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  margin-left: -2px;
  .SoltDetailItem {
    width: 100%;
    .price {
      .switch {
        width: 100%;
        height: 150px;
        box-sizing: border-box;
        padding-top: 20px;
        padding-left: 10px;
        .switchTop {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 30px;
          .text {
            padding: 5px 20px;
            border: 1px solid #ccc;
            border-radius: 3px;
          }
          input {
            width: 100px;
            padding: 0 5px 0 30px;
            height: 30px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }
          .line {
            width: 20px;
            height: 1px;
            background-color: #000;
            float: right;
          }
        }
      }
      .btn {
        display: flex;
        button:nth-child(2) {
          color: red;
        }
        button {
          flex: 1;
          background: white;
          border: 1px solid #ccc;
          padding: 13px 0;
          border-left: none;
        }
      }
    }
  }
}
</style>