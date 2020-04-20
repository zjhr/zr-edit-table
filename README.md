# zr-edit-table

## 说明

公共表格组件，带有编辑功能和合并列/行功能，基于[elementUi 的 table](https://element.eleme.cn/2.5/#/zh-CN/component/table)封装。

## 快速上手

> 先 npm 下载插件

```
`npm install zr-edit-table --save`
或
`npm i zr-edit-table -S`

import zrEditTable from 'zr-edit-table'
import 'zr-edit-table/lib/zr-edit-table.css'
Vue.use(zrEditTable)
```

## 参数

```js
  //列数据
  { label: "姓名",//标题
    prop: "name",//列的字段名，对应data的字段名
    width: "180",//固定宽度
    mWidth:"180",//最小宽度
    edit: "text|请输入内容",//编辑类型|编辑框提示说明，
    //""：不编辑，
    //"text":文本框
    //checkbox:多选框
    //select:下拉框
    //number:数字框
    //date:日期框
    //color:选择颜色框
    min: 1,//编辑类型为number时候，该属性为number框最小值
    max: 100,//编辑类型为number时候，该属性为number框最大值
    format: "yyyy 年 MM 月 dd 日",//当编辑类型为date时候，定义日期格式
    "value-format": "yyyy-MM-dd",//当编辑类型为date时候，定义日期格式
    data: { "1": "是", "2": "否" },//特殊类型的编辑需要用到的数据
    //checkbox:{ key1(选中的值): "是"(描述), key2(没选中的值): "否"(描述) }
    //select:[{ label: "男"(ui显示的值), value: 1(数据获取的值) }]
    text_left: true,//表格文字在图标哪一边
    headCheckBox: {//当有该属性时候，表头带有checkbox
      checked: false,//是否选中
      disabled: false,//是否屏蔽
      change: (value, scope) => {//回调事件
        console.log(value, scope);
      }
    }
  }
```

<table>
  <tr>
    <th>参数</th>
    <th>说明</th>
    <th>类型</th>
    <th>可选值</th>
    <th>默认值</th>
  </tr>
  <tr>
    <td>[elementUi的table](https://element.eleme.cn/2.5/#/zh-CN/component/table)的属性参数</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>menuArr</td>
    <td>右键数据</td>
    <td>Array</td>
    <td>{name: String(名称),fun: Function(点击回调)}</td>
    <td>[]</td>
  </tr>
  <tr>
    <td>mergeArr</td>
    <td>合并表格数据数组</td>
    <td>Array</td>
    <td>{rowId: Number(行id), colKey:String(列的key), rowspan:Number(跨行数), colspan:Number(跨列数)}</td>
    <td>[]</td>
  </tr>
  <tr>
    <td>selectDirection</td>
    <td>打开合并表格功能时候，控制选择框选择方向</td>
    <td>Array</td>
    <td>"up", "down", "left", "right"</td>
    <td>["up", "down", "left", "right"]</td>
  </tr>
  <tr>
    <td>notEditColKeyArr</td>
    <td>控制不可编辑列</td>
    <td>Array</td>
    <td>列数据的key字段，字符串</td>
    <td>[]</td>
  </tr>
  <tr>
    <td>hasselect</td>
    <td>是否含有选择框，打开选择合并表格模式</td>
    <td>Boolean</td>
    <td>true|false</td>
    <td>false</td>
  </tr>
  <tr>
    <td>hasmenu</td>
    <td>是否含有右键选择</td>
    <td>Boolean</td>
    <td>true|false</td>
    <td>false</td>
  </tr>
  <tr>
    <td>headData</td>
    <td>列数据的数据</td>
    <td>Array</td>
    <td>上面的列数据说明</td>
    <td>false</td>
  </tr>
  <tr>
    <td>data</td>
    <td>table数据</td>
    <td>Array</td>
    <td>具体说明和[elementUi的table](https://element.eleme.cn/2.5/#/zh-CN/component/table)一样</td>
    <td>[]</td>
  </tr>
  <tr>
    <td>headEdit</td>
    <td>表头是否可以编辑</td>
    <td>Boolean</td>
    <td>true|false</td>
    <td>false</td>
  </tr>
  <tr>
    <td>editClass</td>
    <td>是否使用编辑table样式</td>
    <td>Boolean</td>
    <td>true|false</td>
    <td>默认有headData时候是true</td>
  </tr>
  <tr>
    <td>notClickToEdit</td>
    <td>不使用点击后编辑状态</td>
    <td>Boolean</td>
    <td>true|false</td>
    <td>false</td>
  </tr>
  <tr>
    <td>notCloseEdit</td>
    <td>进入编辑状态后，不会发生关闭编辑状态</td>
    <td>Boolean</td>
    <td>true|false</td>
    <td>false</td>
  </tr>
  <tr>
    <td>rules</td>
    <td>校验规则，当用到校验规则时候，该组件的父级为[elementUI的form组件](https://element.eleme.cn/2.5/#/zh-CN/component/form) 必须含有:model="model" :rules="rules" ，该组件的data必须是model.data才能生效验证效果</td>
    <td>Object</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>$slot</td>
    <td>具体说明和[elementUi的table](https://element.eleme.cn/2.5/#/zh-CN/component/table)一样</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>$slot</td>
    <td>具体说明和[elementUi的table](https://element.eleme.cn/2.5/#/zh-CN/component/table)一样</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>$emit("xxx")</td>
    <td>具体说明和[elementUi的table](https://element.eleme.cn/2.5/#/zh-CN/component/table)一样</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>$emit('input-change',scope,prop)</td>
    <td>编辑模式时候，编辑类型为text时候，编辑的回调事件，返回单前行数据和列key</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>$emit('checkbox-change',scope,prop)</td>
    <td>编辑模式时候，编辑类型为checkbox时候，编辑的回调事件，返回单前行数据和列key</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>$emit('select-change',scope,prop)</td>
    <td>编辑模式时候，编辑类型为select时候，编辑的回调事件，返回单前行数据和列key</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>$emit('icon-change',scope,prop)</td>
    <td>编辑模式时候，编辑类型为icon时候，编辑的回调事件，返回单前行数据和列key</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>$emit('number-change',scope,prop)</td>
    <td>编辑模式时候，编辑类型为number时候，编辑的回调事件，返回单前行数据和列key</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>$emit('date-change',scope,prop)</td>
    <td>编辑模式时候，编辑类型为date时候，编辑的回调事件，返回单前行数据和列key</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>$emit('color-change',scope,prop)</td>
    <td>编辑模式时候，编辑类型为color时候，编辑的回调事件，返回单前行数据和列key</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
</table>
