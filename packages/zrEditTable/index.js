import zrEditTable from './src'

// 为组件提供 install 安装方法，供按需引入
zrEditTable.install = function (Vue) {
  Vue.component(zrEditTable.name, zrEditTable)
}

// 默认导出组件
export default zrEditTable