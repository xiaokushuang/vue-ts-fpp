<template>
  <div class="py-tinymce-editor">
    <editor :id="tinymceId"
            ref="tinymceEditor"
            v-model="editor_value"
            :init="init"
            @input="onEditorInput"></editor>
    <!-- 自定义上传图片弹窗 -->
    <el-dialog title="插入图片"
               :visible.sync="uploadImg_dialog"
               :modal-append-to-body="false"
               width="600">
      <!-- tab 切换 -->
      <section class="py-section">
        <el-tabs v-model="active_name"
                 @tab-click="handleClick">
          <el-tab-pane label="上传的图片"
                       name="first">
            <el-scrollbar class="py-scroll-height">
              <ul class="py-section-ul">
                <li v-for="(data) in upload_img_list"
                    :key="data.id"
                    @click="handleClickImg1(data)"
                    :class="current1===data.id?'py-active-img1':''">
                  <img :src="data.url"
                       alt="">
                  <i v-if="current1===data.id"
                     class="el-icon-success"></i>
                </li>
              </ul>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="产品图片"
                       name="second">
                       <el-scrollbar class="py-scroll-height">
              <ul class="py-section-ul">
                <li v-for="(data) in upload_img_list"
                    :key="data.id"
                    @click="handleClickImg2(data)"
                    :class="current2===data.id?'py-active-img1':''">
                  <img :src="data.url"
                       alt="">
                  <i v-if="current2===data.id"
                     class="el-icon-success"></i>
                </li>
              </ul>
            </el-scrollbar></el-tab-pane>
          <el-tab-pane label="URL"
                       name="third">
                       <p>粘贴图片URL</p>
                       <el-input v-model="img_url" placeholder="请输入图片URL"></el-input>
                       </el-tab-pane>
        </el-tabs>
      </section>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="uploadImg_dialog = false">取 消</el-button>
        <el-upload class="upload-btn"
                   :show-file-list="false"
                   action="https://jsonplaceholder.typicode.com/posts/">
          <el-button v-if="active_name==='first'">上传文件</el-button>
        </el-upload>
        <el-button :disabled="handleDisabled()" @click="handleInsertImg">插入图片</el-button>
      </span>
    </el-dialog>
    <!-- 自定义上传图片弹窗 -->
    <el-dialog title="插入视频"
               :visible.sync="uploadVideo_dialog" 
               :modal-append-to-body="false"
               width="600">
      <!-- tab 切换 -->
      <section class="py-section"> 
        <el-scrollbar class="py-scroll-height">
           <p>通过将嵌入代码片段粘贴到下面的框中来插入视频。</p>
           <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入代码片段"
              v-model="video_iframe">
            </el-input>
            <p>嵌入代码片段通常以{{this.iframe_tag}}开头</p>
          </el-scrollbar>
      </section>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="uploadVideo_dialog = false">取 消</el-button>
        <el-button :disabled="video_iframe===''" @click="handleInsertVideo">插入视频</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';

import tinymce from 'tinymce';

import 'tinymce/themes/silver/theme.min.js';
import 'tinymce/icons/default/icons';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/media';
import 'tinymce/plugins/paste';
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import './plugins/ax_wordlimit/plugin'; //设置字数限制

import Editor from '@tinymce/tinymce-vue';

@Component({ name: 'TinymceEditor', components: { Editor } })
export default class PyTinymce extends Vue {
    @Prop({ default: '' }) content!: string;
    @Prop(String) value: string | undefined;//v-model封装需要的地方1
    // @Prop({ default: 'vue-tinymce-' +new Date() }) tinymceId!: string;
    //v-model封装需要的地方2
    @Watch('editor_value')
    private editorValue(newVal: string, oldVal: string) {
        this.input(newVal);
    }
    //v-model封装需要的地方3
    @Emit('input')
    private input(val: string): string {
        return val;
    }
    public editor_value: string = '321';// 富文本框值
    private tinymceId: string =  'vue-tinymce-' +((Math.random() * 1000).toFixed(0) + "");//富文本选择器ID
    private uploadImg_dialog: boolean = false;//上传图片弹窗
    private uploadVideo_dialog: boolean = false;//上传视频弹窗
    private active_name: string = 'first';//上传图片tab标签高亮值
    private current1: string = '';
    private current2: string = '';
    private current_img1: any;
    private current_img2: any;
    private img_url: string = '';//上传图片url
    private video_iframe: string = '';//上传视频iframe代码
    private iframe_tag:string = '<iframe ...'//文案展示
    //上传图片列表
    private upload_img_list = [
        {
            id: '1',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/cf2b6b9238f71a0ed9982019a6065221.jpg?v=1609815385',
        },
        {
            id: '2',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/aa885f2ab600412bde464c5a233a8252.jpg?v=1609815376',
        },
        {
            id: '3',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/7b47f0ee5f2c290b7932980741d94861.jpg?v=1609815367',
        },
        {
            id: '4',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/ab37b834087fd6075fa5ebec9f3a55e3.jpg?v=1609815361',
        },
        {
            id: '5',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/cf2b6b9238f71a0ed9982019a6065221.jpg?v=1609815385',
        },
        {
            id: '6',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/aa885f2ab600412bde464c5a233a8252.jpg?v=1609815376',
        },
        {
            id: '7',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/7b47f0ee5f2c290b7932980741d94861.jpg?v=1609815367',
        },
        {
            id: '8',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/ab37b834087fd6075fa5ebec9f3a55e3.jpg?v=1609815361',
        },
        {
            id: '9',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/cf2b6b9238f71a0ed9982019a6065221.jpg?v=1609815385',
        },
        {
            id: '10',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/aa885f2ab600412bde464c5a233a8252.jpg?v=1609815376',
        },
        {
            id: '11',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/7b47f0ee5f2c290b7932980741d94861.jpg?v=1609815367',
        },
        {
            id: '12',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/ab37b834087fd6075fa5ebec9f3a55e3.jpg?v=1609815361',
        },
        {
            id: '13',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/cf2b6b9238f71a0ed9982019a6065221.jpg?v=1609815385',
        },
        {
            id: '14',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/aa885f2ab600412bde464c5a233a8252.jpg?v=1609815376',
        },
        {
            id: '15',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/7b47f0ee5f2c290b7932980741d94861.jpg?v=1609815367',
        },
        {
            id: '16',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/ab37b834087fd6075fa5ebec9f3a55e3.jpg?v=1609815361',
        },
        {
            id: '17',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/cf2b6b9238f71a0ed9982019a6065221.jpg?v=1609815385',
        },
        {
            id: '18',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/aa885f2ab600412bde464c5a233a8252.jpg?v=1609815376',
        },
        {
            id: '19',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/7b47f0ee5f2c290b7932980741d94861.jpg?v=1609815367',
        },
        {
            id: '20',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/ab37b834087fd6075fa5ebec9f3a55e3.jpg?v=1609815361',
        },
        {
            id: '21',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/cf2b6b9238f71a0ed9982019a6065221.jpg?v=1609815385',
        },
        {
            id: '22',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/aa885f2ab600412bde464c5a233a8252.jpg?v=1609815376',
        },
        {
            id: '23',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/7b47f0ee5f2c290b7932980741d94861.jpg?v=1609815367',
        },
        {
            id: '24',
            url: 'https://cdn.shopify.com/s/files/1/0247/0743/2510/products/ab37b834087fd6075fa5ebec9f3a55e3.jpg?v=1609815361',
        },
    ];

    // 富文本框init配置
    private get init() {
        return {
            selector: "#" + this.tinymceId,//富文本id
            language_url: '/tinymce/langs/zh_CN.js',//引入语言包文件
            language: 'zh_CN', //语言类型
            skin_url: '/tinymce/skins/ui/oxide',//皮肤：浅色
            menubar: false, //菜单条
            height: 350,//富文本高度
            ax_wordlimit_num:4,//最大字数限制
            ax_wordlimit_callback: function(editor:any,txt:string,num:number){//最大字数限制回调
               if (txt.length > num) {
                  console.log('当前字数：' + txt.length + '，限制字数：' + num);
                }
            },
            branding: false,//tiny技术支持信息是否显示
            resize: false,  //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
            plugins: 'link lists code table wordcount table  paste image media  ax_wordlimit customImage', // 插件
            contextmenu: "customImage link" ,//右键点击图片出现的菜单项
            content_style: "img {max-width:100%;}",  //直接自定义可编辑区域的css样式
            // content_css: '/tinycontent.css',  //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
            toolbar: 'formatselect | bold italic underline bullist numlist | alignleft aligncenter alignright alignjustify | forecolor backcolor |  outdent indent | link image uploadImg uploadVideo table | removeformat | code', // 工具条
            font_formats: 'Arial=arial,helvetica,sans-serif; 宋体=SimSun;  微软雅黑=Microsoft Yahei; Impact=impact,chicago;', // 字体
            fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px 64px 72px', // 文字大小
            paste_data_images: true,//允许粘贴图片
            //自定义图标功能
            setup: (editor:any) => {
                // 注册一个图片icon
                editor.ui.registry.addIcon(
                    'img-icon',
                    `<svg width="24" height="24"><path d="M5 15.7l3.3-3.2c.3-.3.7-.3 1 0L12 15l4.1-4c.3-.4.8-.4 1 0l2 1.9V5H5v10.7zM5 18V19h3l2.8-2.9-2-2L5 17.9zm14-3l-2.5-2.4-6.4 6.5H19v-4zM4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 01-1-1V4c0-.6.4-1 1-1zm6 8a2 2 0 100-4 2 2 0 000 4z" fill-rule="nonzero"></path></svg>`
                );
                editor.ui.registry.addButton('uploadImg', {
                    icon: `img-icon`,
                    tooltip: '插入图片',
                    onAction: () => {
                        this.uploadImg_dialog = true;
                    },
                });
                   // 注册一个视频icon
                editor.ui.registry.addIcon(
                    'video-icon',
                    `<svg width="24" height="24"><path d="M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 01-1-1V4c0-.6.4-1 1-1zm1 2v14h14V5H5zm4.8 2.6l5.6 4a.5.5 0 010 .8l-5.6 4A.5.5 0 019 16V8a.5.5 0 01.8-.4z" fill-rule="nonzero"></path></svg>`
                );
                editor.ui.registry.addButton('uploadVideo', {
                    icon: `video-icon`,
                    tooltip: '插入视频',
                    onAction: () => {
                        this.uploadVideo_dialog = true;
                    },
                });
            },
        };
    }
    //生命周期
    private mounted(): void {
        this.registerPlugin();
        tinymce.init({});
        // this.editor_value = this.content;
    }
      /**
     * 自定义插件函数（右键点击图片出现编辑弹窗）
     */
    registerPlugin() {
      let self = this;
      tinymce.PluginManager.add("customImage", (editor:any)=> {
        editor.ui.registry.addMenuItem("customImage", {
          icon: "img-icon",
          text: "自定义图片",
          onAction: () => {
              self.uploadImg_dialog = true;
           },
        });
      });
    }
    private onEditorInput(e: any): void {
        this.$emit('input', this.editor_value);
    }

    // private setContent(str: any): void {
    //     this.editor_value = str;
    // }
    private handleClick(tab: any, event: any) {
        console.log(tab, event);
    }
    private handleClickImg1(data:any): void  {
        this.current1 = data.id;
        this.current_img1 = data;
    }
    private handleClickImg2(data:any): void  {
        this.current2 = data.id;
        this.current_img2 = data;
    }
    private handleDisabled():boolean{
      if(this.active_name==='first'&&this.current1===''){
          return true;
      }else if(this.active_name==='second'&&this.current2===''){
          return true;
      }else if(this.active_name==='third'&&this.img_url===''){
          return true;
      }else{
          return false;
      }
    }
    private handleInsertImg(): void  {
      let insert_img_url = '';
      if(this.active_name==='first'){
        insert_img_url = this.current_img1.url;
      }else if(this.active_name==='second'){
        insert_img_url = this.current_img2.url;
      }else if(this.active_name==='third'){
        insert_img_url = this.img_url;
      }
        tinymce.get(this.tinymceId).insertContent(`<img class='goodsImg' src='${insert_img_url}'/>`);
        this.uploadImg_dialog = false;
    }
      private handleInsertVideo(): void  {  
        tinymce.get(this.tinymceId).insertContent(`${this.video_iframe}`);
        this.uploadVideo_dialog = false;
    }
    private displayContextMenu(editor:any):void{
      var m = editor.plugins.contextmenu._getMenu(editor); 
      m.add({title : 'advanced.bold_desc', icon : 'bold', cmd : 'bold'}); 
    }
}
</script>

<style lang="scss">
.py-tinymce-editor {
    .py-section {
        padding: 0 20px;
        .py-scroll-height{
          height: calc(100vh - 300px);
        }
        .py-section-ul {
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            .py-active-img1 {
                border: 2px solid #202e78 !important;
                transform: scale(0.8);
                transition: transform 0.1s cubic-bezier(0.18, 0.67, 0.6, 1.22);
            }
            li {
                width: 128px;
                height: 133px;
                margin-right: 10px;
                margin-bottom: 10px;
                list-style: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border: 1px solid #c9cccf;
                position: relative;
                img {
                    height: 100%;
                    display: inline-block;
                    padding: 10px;
                }
                i {
                    position: absolute;
                    right: -11px;
                    font-size: 20px;
                    bottom: -12px;
                    color: #8c9196;
                }
            }
            li:hover {
                border: 1px solid #8c9196;
            }
            li:nth-of-type(4n) {
                margin-right: 0;
            }
        }
    }
    .upload-btn {
        display: inline-block;
        margin: 0 10px;
    }
    // 自定义弹窗样式修改
    .el-dialog {
        width: 610px;
        margin-top: 40px !important;
        max-height: calc(100vh - 80px);
    }
    .el-dialog__body {
        padding: 10px 0;
    }
    .el-dialog__footer {
        padding: 10px;
        border-top: 1px solid #ccc;
    }
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
}
</style>