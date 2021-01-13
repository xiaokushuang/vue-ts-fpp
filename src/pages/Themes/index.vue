<template>
  <div class="test">
    <h1>Themes</h1>
    <el-container>
      <el-aside width="500px">
        <div class="drag-div">
        <el-collapse v-model="activeNames" @change="handleChange">
          <PYDraggable> 
            <el-collapse-item title="一致性 Consistency" name="1">
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
          </PYDraggable>
        </el-collapse>
        </div>
        <div class="drag-div">
          <PYDraggable
            element="ul"
          > 
            <li class="drag-div-item">标头</li>
            <li class="drag-div-item">带文本图片</li>
            <li class="drag-div-item">带文本折叠图片</li>
            <li class="drag-div-item">带有图片的文本列</li>
            <li class="drag-div-item">特色产品系列</li>
            <li class="drag-div-item">图库</li>
          </PYDraggable>
        </div>
        <div class="drag-div">
          <PYDraggable> 
            <img 
              v-for="(item, index) in urlArr"
              :key="index"
              :src="item"
            >
          </PYDraggable>
        </div>
        <div class="imgs-div">
          <PYImageLazy 
            :imgurls="imageUrls"
          />
        </div>
      </el-aside>
      <el-main>
        <div>
          <PYTitleInput 
            v-model="inputMessage"
            title="标题"
            :hasWordNum="true"
            :maxlength="10"
            :hasTooltip="true"
            tooltip_content="提示信息XXXXXX"
            placeholder="请输入标题"
            name="输入框名称"
            @change="handleInputChange"
          />
          
          <!-- <div>
            {{this.inputMessage}}
          </div> -->
        </div>
        <div>
          <PYTitleInput 
            title="标题"
            :hasTooltip="true"
            tooltip_content="提示信息XXXXXX"
            placeholder="请输入标题"
            :hasErrorTip="true"
            :verificationValue="handleVerificationValue"
            :defaultFirstOption="true"
          />
        </div>
        <div>
          <PYTitleSelect 
            v-model="selectValue"
            title="产品类别"
            placeholder="请输入产品类别"
            :multiple="false"
            :filterable="true"
            :allow-create="true"
            :default-first-option="false"
            :options="this.productCategoryOptions"
            :remote="false"
          >
            <!-- <template slot="add">
              <div 
                class="py-add"
                @click="handleClickAdd" 
              >
                <i class='el-icon-circle-plus'>添加
                  {{this.selectValue}}
                </i>
              </div>
            </template> -->
          </PYTitleSelect>
          <PYTitleSelect 
            v-model="selectTag"
            title="标签"
            placeholder="请输入标签"
            allow-create
            multiple
            filterable
            :options="this.productCategoryOptions"
            :hasTag="true"
            :remote="false"
            @change="handleSelectChange"
          />
        </div>
        <div>
          <div style="margin-top:20px">表单</div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
              <PYTitleInput 
                v-model="formInline.user" 
                title=""
                placeholder="审批人"
              ></PYTitleInput>
            </el-form-item>
            <el-form-item label="活动区域">
              <PYTitleSelect 
                v-model="formInline.region" 
                title=""
                placeholder="活动区域"
                :options="formSelectOption"
              >
              </PYTitleSelect>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <div style="margin-top:20px">媒体</div>
          <AddMedia />
        </div>
      </el-main>
    </el-container>
  </div>
 
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  PYDraggable,
  PYTitleInput,
  PYTitleSelect,
  PYImageLazy
}from '@/components/shared/form/index.ts';
import { AddMedia } from '@/components/py-media';


@Component({
  components: {
    PYDraggable,
    PYTitleInput,
    PYTitleSelect,
    PYImageLazy,
    AddMedia
  }
})
export default class Themes extends Vue {
  public activeNames = ['1'];
  public urlArr = ['https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1510416263,3095872003&fm=26&gp=0.jpg',
   'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3149938290,1499572739&fm=26&gp=0.jpg', 
   'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2759078875,3643456742&fm=26&gp=0.jpg'];
  private inputMessage: string = '初始标题';
  private selectValue: string = 'shirt';
  private selectTag: string[] = ['shirt'];
  private productCategoryOptions: object[] = [{
    value: 'shirt',
    label: 'shirt'
  }, {
    value: 'skirt',
    label: 'skirt'
  }, {
    value: 'trousers',
    label: 'trousers'
  }];
  private tags: string[] = []; 
  private formInline = {
    user: '用户一',
    region: ''
  };
  private formSelectOption = [{
    value: 'shanghai',
    label: '区域一'
  }, {
    value: 'beijing',
    label: '区域二'
  }];

  private imageUrls = [
    'http://hilongjw.github.io/vue-lazyload/dist/avatar/test1.jpg',
    'http://hilongjw.github.io/vue-lazyload/dist/avatar/test2.jpg',
    'http://hilongjw.github.io/vue-lazyload/dist/avatar/test3.jpg',
    'http://hilongjw.github.io/vue-lazyload/dist/avatar/test4.jpg',
    'http://hilongjw.github.io/vue-lazyload/dist/avatar/test5.jpg',
    'http://hilongjw.github.io/vue-lazyload/dist/avatar/test6.jpg',
    'http://hilongjw.github.io/vue-lazyload/dist/avatar/test7.jpg',

  ];

  private handleChange(val: any) {
    console.log(val);
  }

  private handleInputChange(val: any): void {
    console.log('输入框', val);
  }

  private handleVerificationValue(val: string): string {
    let result = '';
    if(val.length === 0) {
      result = '请输入标题, 标题不能为空';
    } else if(val.length > 10) {
      result = '标题不能超过10个字符';
    }
    return result;
  }

  private handleClickAdd(): void {
    // this.productCategoryOptions.push({
    //   value: this.selectValue,
    //   label: this.selectValue,
    // })
  }

  private handleSelectChange(val: any): void {
    
  }

  private onSubmit(): void {
    console.log(this.formInline);
  }

}
</script>

<style lang='scss' scoped>
.drag-div {
  width: 300px;
  padding: 20px;
  border: 1px solid #222;
  margin-bottom: 30px;

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  ul {
    padding-inline-start: 0px;
  }

  li {
    list-style-type:none;
  }
}
.drag-div-item {
  height: 50px;
  border: 1px solid #222;
  margin-bottom: 10px;
  cursor: grab;
}
.py-add {
  padding: 10px 10px 10px 25px;
  cursor: pointer;
}

.imgs-div {
  border: 1px solid #444;
  height: 400px;
  width: 300px;
  overflow: scroll;
}

</style>