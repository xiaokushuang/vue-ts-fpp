<!--
 * @Author: Vhen
 * @Date: 2021-01-06 13:10:59
 * @LastEditors: Vhen
 * @LastEditTime: 2021-01-06 14:35:44
 * @Description: 
-->
<template>
  <div class="custom-image">
    <div class="custom-image-dialog">
      <div class="custom-image-dialog-header">
        <div
          class="item"
          v-for="(item, index) of tabList"
          :key="index"
          @click="tabType = index"
        >
          {{ item }}
        </div>
      </div>
      <div class="custom-image-dialog-body">
        <template v-if="tabType === 0">
          <div>
            <label for="upload-box" class="upload-box">+</label>
            <input
              type="file"
              style="display: none"
              accept=".png, .jpg,.jpeg,.gif"
              id="upload-box"
              @change="uploadFile"
            />
          </div>
        </template>
        <template v-if="tabType === 1">
          <div class="img-box">
            <img
              :src="item.src"
              alt=""
              class="img"
              :class="{ on: item.isSelect }"
              @click="selectImg(index)"
              v-for="(item, index) of imgList"
              :key="index"
            />
          </div>
        </template>
      </div>
      <div class="custom-image-dialog-footer">
        <div class="item" @click="cancel()">取消</div>
        <div class="item" @click="handleSubmit()">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      tabList: ["上传图片", "选择图片"],
      tabType: 0,
      imgList: [
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1740269478,4164279905&fm=26&gp=0.jpg",
          isSelect: false,
        },
        {
          src:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2542054890,4291997804&fm=26&gp=0.jpg",
          isSelect: false,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3729147266,3284903073&fm=26&gp=0.jpg",
          isSelect: false,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1740269478,4164279905&fm=26&gp=0.jpg",
          isSelect: false,
        },
        {
          src:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2542054890,4291997804&fm=26&gp=0.jpg",
          isSelect: false,
        },
        {
          src:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3729147266,3284903073&fm=26&gp=0.jpg",
          isSelect: false,
        },
      ],
      imgArr: [] //上传图片或者是选择的图片
    };
  },
  computed: {},
  components: {},
  methods: {
    /**
     * 关闭弹窗
     */
    cancel() {
      this.$emit("cancel");
    },
    /**
     * 选择图片
     */
    selectImg(index) {
      this.imgList[index].isSelect = !this.imgList[index].isSelect;
    },
    /**
     * 上传文件
     */
    uploadFile(file) {
      console.log(file);
      this.imgArr.push(file.name)
    },
    handleSubmit() {
      if(this.tabType===1){
        this.imgArr= this.imgList.filter(v=>v.isSelect).map(v=>v.src)
      }
      this.$emit("successCBK", this.imgArr);
    },
  },
  mounted() {},
  watch: {},
};
</script>
<style  scoped>
.custom-image {
  /* position: fixed; */
  position: absolute;
  top: 150px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3000;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  width: 100%;
  height: auto;
  /* background: rgba(0, 0, 0, 0.5); */
}
.custom-image-dialog {
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  width: 500px;
  height: 500px;
  border: 1px solid #ccc;
  background-color: #fff;
}
.custom-image-dialog-header {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #ccc;
}
.custom-image-dialog-header .item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 50px;
  color: #666;
}
.custom-image-dialog-header .item:not(:last-child) {
  border-right: 1px solid #ccc;
}
.custom-image-dialog-body {
  flex: 1;
  padding: 20px;
}
.custom-image-dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-top: 1px solid #ccc;
}
.custom-image-dialog-footer .item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 50px;
  padding: 0 10px;
  color: #666;
}
.custom-image-dialog-footer .item:not(:last-child) {
  border-right: 1px solid #ccc;
}
.upload-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  color: #ccc;
  margin: 50px auto;
}
.img-box {
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
}
.img {
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}
.on {
  border: 2px solid red;
}
.img:hover {
  cursor: pointer;
}
.img:not(:nth-child(4n)) {
  margin-right: 12px;
}
</style>