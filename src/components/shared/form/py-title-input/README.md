## 描述

 通用输入框

## 使用

```js
import PYTitleInput from '@/components/PYTitleInput/index.vue';

<PYTitleInput 
  title="标题"
  placeholder="请输入标题"
/>
```

## 属性

| 参数 | 是否必传 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | --- |
| title | 是 | 标题 | string | - |
| hasWordNum | 否 | 是否显示字数 | boolean | false |
| maxlength | 否 | 最大字数 需要配合hasWordNum=true | number | - |
| hasTooltip | 否 | 是否显示tooltip | boolean | false |
| tooltip_content | 否 | tooltip内容 需要配合hasTooltip=true | string | - |
| hasErrorTip | 否 | 是否显示错误提示 | boolean | false |
| verificationValue | 否 | 验证方法 需要配合hasErrorTip=true | function | - |

其他参数详见:https://element.eleme.cn/#/zh-CN/component/input
