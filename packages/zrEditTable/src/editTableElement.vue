<template>
	<div :class="{'not-edit':cNotEdit}">
		<el-input
			v-if="!cNotEdit && item.edit.includes('text')"
			size="medium"
			:disabled="cNotEdit"
			v-model="scope.row[item.prop]"
			:placeholder="item.edit | editData"
			@change="$emit('input-change',scope,item.prop)"
		></el-input>
		<el-checkbox
			v-else-if="item.edit.includes('checkbox')"
			size="medium"
			:true-label="Object.keys(item.data)[0]"
			:false-label="Object.keys(item.data)[1]"
			v-model="scope.row[item.prop]"
			class="pd3-table__edit-checkbox"
			@change="$emit('checkbox-change',scope,item.prop)"
		></el-checkbox>
		<el-select
			v-else-if="!cNotEdit && item.edit.includes('select')"
			v-model="scope.row[item.prop]"
			:placeholder="item.edit | editData"
			:disabled="cNotEdit"
			size="medium"
			@change="$emit('select-change',scope,item.prop)"
		>
			<template v-for="(value,index) in item.data">
				<el-option :label="value.label" :value="value.value" :key="index"></el-option>
			</template>
		</el-select>
		<el-input-number
			v-else-if="!cNotEdit && item.edit.includes('number')"
			v-model="scope.row[item.prop]"
			size="medium"
			:disabled="cNotEdit"
			controls-position="right"
			:min="item.min || 0"
			:max="item.max || 100"
			@change="$emit('number-change',scope,item.prop)"
		></el-input-number>
		<el-date-picker
			v-else-if="!cNotEdit && item.edit.includes('date')"
			size="medium"
			v-model="scope.row[item.prop]"
			type="date"
			:disabled="cNotEdit"
			:placeholder="item.edit | editData"
			:format="item.format"
			:value-format="item['value-format']"
			@change="$emit('date-change',scope,item.prop)"
		></el-date-picker>
		<el-color-picker
			v-else-if="item.edit.includes('color')"
			size="mini"
			:disabled="cNotEdit"
			v-model="scope.row[item.prop]"
			@change="$emit('color-change',scope,item.prop)"
			style="display: inherit;"
		></el-color-picker>
		<div
			v-if="!item.edit.includes('color') && !item.edit.includes('icon') && !item.edit.includes('checkbox')"
		>
			<template v-if="item.text_left">{{item | editText(scope)}}</template>
			<!-- <template v-if="item.icon && item.icon.length">
				<my-icon v-for="(icon, index) in item.icon" :key="index" :use="icon" scale="1"></my-icon>
			</template>-->
			<template v-if="!item.text_left">{{item | editText(scope)}}</template>
		</div>
	</div>
</template>

<script>
export default {
	name: 'edit-table-element',
	props: {
		item: Object, // 节点数据
		scope: Object, // table数据
		notEditColKeyArr: {
			// 控制不可编辑列
			type: Array,
			default () {
				return []
			}
		}
	},
	data () {
		return {}
	},
	computed: {
		cNotEdit () {
			// 控制不可以编辑的列数组
			return this.notEditColKeyArr.includes(this.item.prop)
		}
	},
	filters: {
		editData (value, index = 1) {
			return value.split('|')[index]
		},
		editText (item, scope) {
			if (item.data && item.edit.includes('checkbox')) {
				return item.data[scope.row[item.prop]]
			}
			if (item.data && item.edit.includes('select')) {
				return item.data.find(v => v.value === scope.row[item.prop]).label
			}
			return scope.row[item.prop]
		}
	}
}
</script>
