## 描述

 通用下拉框

## 使用

```js
import PYTitleSelect from '@/components/PYTitleSelect/index.vue';

<PYTitleSelect 
  title="供应商"
  placeholder="请输入供应商"
  :multiple="false"
  :filterable="true"
  :options="this.productCategoryOptions"
/>
```

## 属性

| 参数 | 是否必传 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | --- |
| title | 是 | 标题 | string | - |
| options | 是 | 下拉选项列表数据 | array | - |
| remote | 否 | 是否为远程搜索 | boolean | false |

其他参数详见:https://element.eleme.cn/#/zh-CN/component/select