<template>
  <div class="py-image-lazyload">
    <el-image 
      v-for="url in urls" 
      :key="url" 
      :src="url" 
      lazy
    ></el-image>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

@Component({
  name: "PYImageLazy",
})
export default class extends Vue {
  @Prop({}) private imgurls!: string[]; // 图片路径地址

  private urls: string[] = [];
  @Watch('imgurls', {immediate: true})
  private watchValue(val: string[] ): void{
    this.urls = val;
  }
}
</script>

<style lang='scss' scoped>
.el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
</style>