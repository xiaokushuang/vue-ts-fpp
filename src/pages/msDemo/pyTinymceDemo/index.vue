<template>
<div>
   <pyTinymce 
              v-model="tiny_model1"
              ref="editor"
             @input="handleInput($event)">
    </pyTinymce>
   <!-- <pyTinymce ref="editor2"
              v-model="tiny_model2"
             @input="content2 = $event">
    </pyTinymce> -->
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import pyTinymce from '@/components/shared/form/py-tinymce/index.vue'
@Component({
  components: {
    pyTinymce,
  },
})
export default class extends Vue {
  content1: any = '';
  content2: any = '';
  private tiny_model1:string = '123';
  private tiny_model2:string = '';
  private mounted(): void {
    // this.tiny_model1 = '123'
    // const editor: any = this.$refs.editor
    // editor.setContent('<h1>hello world</h1>')
  }
  //获取到富文本的内容
  private handleInput($event:any):void{
    console.log('-----',$event)
    this.content1 = $event
  }
  private updated():void{
    console.log('富文本内容',this.tiny_model1)
  }
}
</script>