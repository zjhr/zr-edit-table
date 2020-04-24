<template>
	<div id="app">
		<el-button type="primary" @click="addheadFun">新增表头数据</el-button>
		<el-button type="primary" class="unhide-select" @click="adddataFun">新增数据</el-button>
		<el-button type="primary" class="unhide-select">测试</el-button>实例1
		<el-form :model="model" :rules="rules" inline class="z-h-100">
			<zr-edit-table
				ref="tabel"
				size="mini"
				notClickToEdit
				:data="model.data"
				:headData="headData"
				highlight-current-row
				show-summary
				:rules="rules"
				:height="300"
				hasmenu
				hasselect
				headEdit
				:mergeArr="mergeArr"
				:menuArr="menuArr"
				:fullClass="false"
				style="width: 100%"
			></zr-edit-table>
		</el-form>实例2
		<zr-edit-table size="mini" :data="model.data" highlight-current-row style="width: 100%">
			<el-table-column prop="date" label="日期" width="180"></el-table-column>
			<el-table-column prop="name" label="姓名" width="180"></el-table-column>
			<el-table-column prop="address" label="地址"></el-table-column>
		</zr-edit-table>实例3
		<zr-edit-table
			size="mini"
			:data="data"
			:headData="headData"
			highlight-current-row
			height="300"
			style="width: 100%"
		>
			<el-table-column fixed="right" label="操作" width="90">
				<el-button type="text" size="small">删除</el-button>
			</el-table-column>
		</zr-edit-table>
	</div>
</template>

<script>
export default {
	name: 'App',
	data () {
		return {
			mergeArr: [],
			headData: [
				{
					label: '姓名',
					prop: 'name',
					width: '180',
					edit: 'text|请输入内容',
					headCheckBox: {
						checked: false,
						disabled: false,
						change: (value, scope) => {
							console.log(value, scope)
						}
					}
				},
				{
					label: '是学生',
					prop: 'isSB',
					width: '80',
					edit: 'checkbox',
					data: { '1': '是', '2': '否' }
				},
				{
					label: '是学生tf',
					prop: 'isSBtf',
					width: '80',
					edit: 'checkbox',
				},
				{
					label: '性别',
					prop: 'sex',
					width: '80',
					edit: 'select|请选择',
					data: [
						{ label: '男', value: 1 },
						{ label: '女', value: 0 }
					]
				},
				{
					label: '年龄',
					prop: 'age',
					width: '180',
					edit: 'number',
					min: 1,
					max: 100
				},
				{
					label: '日期',
					prop: 'date',
					width: '220',
					edit: 'date|选择日期',
					format: 'yyyy 年 MM 月 dd 日',
					'value-format': 'yyyy-MM-dd'
				},
				{ label: '地址', prop: 'address', edit: '' }
			],
			menuArr: [
				{
					name: '合并表格',
					fun: this.mergeFun
				},
				{
					name: '拆分合并',
					fun: this.relieveFun
				}
			],
			model: {
				data: [
					{
						id: 0,
						name: '测试text',
						isSB: '1',
						sex: 1,
						age: '22',
						date: '2016-05-02',
						address: '上海市普陀区金沙江路 1517 弄',
						isSBtf: false
					},
					{
						id: 1,
						name: '测试text',
						isSB: '2',
						sex: 0,
						age: '22',
						date: '2016-05-02',
						address: '上海市普陀区金沙江路 1517 弄',
						isSBtf: false
					}
				]
			},
			rules: {
				name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
			},
			data: [
				{
					name: '11',
					isSB: '2',
					sex: 1,
					age: '22',
					date: '2016-05-02',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					name: '测试text',
					isSB: '2',
					sex: 1,
					age: '22',
					date: '2016-05-02',
					address: '上海市普陀区金沙江路 1517 弄'
				}
			]
		}
	},
	methods: {
		adddataFun () {
			this.model.data.push({
				id: '0000',
				name: '测试00000',
				isSB: '2',
				sex: 0,
				age: '22',
				date: '2016-05-02',
				address: '上海市普陀区金沙江路 1517 弄'
			})
		},
		mergeFun () {
			this.$refs.tabel.mergeFun()
		},
		relieveFun () {
			this.$refs.tabel.mergeFun(false)
		},
		addheadFun () {
			this.headData.push({
				label: '地址2地址2地址2地址2地址2地址2',
				prop: 'address1',
				edit: ''
			})
		}
	}
}
</script>

<style lang="scss">
</style>
