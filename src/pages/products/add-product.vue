<template>
    <py-main title="添加产品" class="width-expand">
        <py-content sidebar>
          <el-form 
            :model="productForm" 
            :rules="rules"
            ref="productForm"
          >
            <py-card>
               <el-form-item label="">
                  <PYTitleInput
                      v-model="productForm.title"
                      title="标题"
                      :hasTooltip="true"
                      tooltip_content="提示信息XXXXXX"
                      placeholder="请输入标题"
                      maxlength="255"
                  />
               </el-form-item>
               <el-form-item label="">
                  描述
               </el-form-item>
            </py-card>
            <py-card>
               <el-form-item>
                 <el-button  @click="submitForm('productForm')">保存</el-button>
               </el-form-item>
            </py-card>
          </el-form>
        </py-content>
    </py-main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PYTitleInput } from '@/components/shared/form/index.ts';
import { Form as ElForm } from "element-ui";

@Component({
  components: {
    PYTitleInput
  }
})
export default class AddProduct extends Vue {
  private productForm: object = {
    title: '',
  };
  private rules: object = {
    title: [{
      required: true, message: '标题不能为空', trigger: 'blur' 
    }]
  }

  private submitForm(): void {
    (this.$refs.productForm as ElForm).validate((valid: boolean) => {
      if (valid) {
        alert('submit!');
      } 
    });
  }
}
</script>
