<template>
	<div class="zr-table g-pr z-hidden" :style="heightStyle">
		<el-table
			ref="table"
			:row-class-name="tableRowClassNameFun"
			:header-row-class-name="editHeadColumn?'zr-table__header header__edit':'zr-table__header'"
			border
			:span-method="spanMethodFun"
			:data="data"
			:cell-class-name="cellClassNameFun"
			@row-contextmenu="rowContextmenuFun"
			@cell-mouse-enter="cellMouseEnterFun"
			@header-click="headerClickFun"
			@row-click="rowClickFun"
			@current-change="currentChangeFun"
			class="g-pr z-hidden"
			:class="{'zr-table__last':fullClass || isForm,'zr-table-fullitem':fullClass}"
			v-on="$listeners"
			v-bind="$attrs"
		>
			<slot name="left"></slot>
			<template v-if="headData.length">
				<template v-for="item in headData">
					<el-table-column
						:prop="item.prop"
						:width="item.width"
						:min-width="item.mWidth"
						:sortable="item.sortable"
						:key="item.prop"
					>
						<template slot="header" slot-scope="scope">
							<el-checkbox
								v-if="item.headCheckBox"
								class="z-clr-white head__checkbox"
								v-show="!scope.column.headEdit"
								:disabled="item.headCheckBox.disabled"
								v-model="item.headCheckBox.checked"
								@click.native="(event)=>event.stopPropagation()"
								@change="item.headCheckBox.change?item.headCheckBox.change(item.headCheckBox.checked,scope):()=>{}"
							></el-checkbox>
							<span v-show="!scope.column.headEdit">{{item.label}}</span>
							<el-input
								v-if="headData.length"
								v-show="scope.column.headEdit"
								v-model="item.label"
								size="medium"
								placeholder="输入名称"
								class="head-input_edit"
							/>
						</template>
						<template slot-scope="scope">
							<el-form-item
								v-if="!isEmptyObject(rules)"
								:prop="`data.${scope.$index}.${item.prop}`"
								:rules="rules[item.prop]"
							>
								<edit-table-element
									:item="item"
									:scope="scope"
									:notEditColKeyArr="notEditColKeyArr"
									v-on="$listeners"
								></edit-table-element>
							</el-form-item>
							<edit-table-element
								v-else
								:item="item"
								:scope="scope"
								:notEditColKeyArr="notEditColKeyArr"
								v-on="$listeners"
							></edit-table-element>
						</template>
					</el-table-column>
				</template>
			</template>
			<slot></slot>
		</el-table>
		<div v-show="selectBoxShow" class="m-pa-lt">
			<div
				class="edit__top"
				:style="{top:TLRTop-scrollTop +'px',width:wTB +'px',left:TBLLeft-scrollLeft +'px'}"
			></div>
			<div
				class="edit__bottom"
				:style="{top:TLRTop-scrollTop+hLR +'px',width:wTB+1 +'px',left:TBLLeft-scrollLeft +'px'}"
			></div>
			<div
				class="edit__left"
				:style="{top:TLRTop-scrollTop +'px',height:hLR +'px',left:TBLLeft-scrollLeft +'px'}"
			></div>
			<div
				class="edit__right"
				:style="{top:TLRTop-scrollTop +'px',height:hLR+1 +'px',left:TBLLeft+wTB-scrollLeft +'px'}"
			></div>
		</div>
		<div
			v-if="(hasmenu && menuArr.length) || (hasselect && selectBoxShow)"
			v-show="contextmenuShow"
			class="zr-contextmenu"
			ref="contextmenu"
		>
			<template v-for="(item, index) in menuArr">
				<div
					:divider="isEmptyObject(item)"
					class="unhide-select zr-contextmenu-item"
					v-if="item.isHide!==true"
					@click="item.fun(item,rowContextmenuData.row,rowContextmenuData.event)"
					:key="index"
				>{{item.name}}</div>
			</template>
		</div>
	</div>
</template>

<script>
import editTableElement from './editTableElement'
const trim = str =>
	str && !(str instanceof Object)
		? String(str).replace(/(^\s+)|(\s+$)/g, '')
		: str
const isEmpty = value =>
	!value ||
	value === undefined ||
	trim(value) === '' ||
	trim(value) === 'null' ||
	value === '' ||
	value.length === 0
const forEach = (arr, func) => {
	if (isEmpty(arr) || !func) {
		return
	}
	if (Array.isArray(arr)) {
		for (let i = 0; i < arr.length; i++) {
			let ret = func(arr[i], i) // 回调函数
			if (typeof ret !== 'undefined' && (ret === null || ret === false)) {
				break
			}
		}
	} else {
		// eslint-disable-next-line guard-for-in
		for (let item in arr) {
			let ret = func(arr[item], item) // 回调函数
			if (typeof ret !== 'undefined' && (ret === null || ret === false)) {
				break
			}
		}
	}
}
export default {
	name: 'zr-edit-table',
	inheritAttrs: false,
	components: {
		editTableElement
	},
	destroyed () {
		if (!this.notClickToEdit && !this.notCloseEdit) {
			document.removeEventListener('click', this.removeCurrentRowFun, false)
		}
		document.removeEventListener('click', this.removeHeadColFun, false)
		document.removeEventListener('mousedown', this.removeSelectBoxFun, false)
		document.removeEventListener('mouseup', this.changeMouseType, false)
		window.removeEventListener('resize', this.setSelectBoxStyleFun, false)
	},
	props: {
		menuArr: {
			// 右键数据
			type: Array,
			default () {
				return [] // {name: "合并表格",fun: this.mergeFun}
			}
		},
		mergeArr: {
			// 合并表格数据数组
			type: Array,
			default () {
				return [] // { "rowId": 1, "colKey": "sex", "rowspan": 3, "colspan": 1}
			}
		},
		selectDirection: {
			// 控制选择框选择方向
			type: Array,
			default () {
				return ['up', 'down', 'left', 'right']
			}
		},
		notEditColKeyArr: {
			// 控制不可编辑列
			type: Array,
			default () {
				return []
			}
		},
		hasselect: Boolean, // 是否含有选择框
		hasmenu: Boolean, // 是否含有右键选择
		headData: {
			// 列数据
			type: Array,
			default () {
				return []
			}
		},
		data: {
			// table数据
			type: Array,
			default () {
				return []
			}
		},
		headEdit: {
			// 表头是否可以编辑
			type: Boolean,
			default: false
		},
		editClass: Boolean, // 是否使用编辑table样式
		fullClass: {
			type: Boolean,
			default: true
		},
		notClickToEdit: {
			// 不使用点击后编辑状态
			type: Boolean,
			default: false
		},
		notCloseEdit: {
			// 使用编辑状态不关闭编辑状态
			type: Boolean,
			default: false
		},
		rules: Object // 校验规则
	},
	data () {
		return {
			contextmenuShow: false, // 控制右键菜单
			heightStyle: { height: '100%' },
			time: null,
			headElm: null, // table的head的dom
			tdElmObj: {}, // 根据key获取table的td的dom
			notRowIndexs: {}, // 记录被跨行数据,不渲染
			notColIndexs: {}, // 记录被跨列数据,不渲染
			moveType: '', // 记录选择框方向
			rowContextmenuData: {}, // 右键时候记录数据
			TLRTop: 0, // 选择框top,left,right的top
			wTB: 0, // 选择框top,bottom的宽度
			TBLLeft: 0, // 选择框top,bottom,left的left
			hLR: 0, // 选择框left,right的高
			selectBoxShow: false, // 控制选择框显示隐藏
			scrollTop: 0, // 记录滚动条top
			scrollLeft: 0, // 记录滚动条left
			headHeight: 0, // 记录表头高度，处理选择框偏移高度
			sRowCol: null, // 记录选择框首次选中的节点位置,例如[0,0]
			tRowCol: null, // 记录选择框最后选中的节点位置,例如[0,0]
			sTg: '', // 记录选择框首次选中的节点target
			tTg: '', // 记录选择框最后选中的节点target
			mouseType: '', // 记录鼠标状态
			isForm: false,
			currentRow: '',
			editHeadColumn: false // 记录选中的表头，标识是否打开了表头编辑
		}
	},
	computed: {
		cColLists () {
			// 记录列key数组
			const arr = this.$slots['default']
				? this.$slots['default'].map(v => v.componentOptions.propsData.prop)
				: []
			return this.headData.map(v => v.prop).concat(arr)
		}
	},
	created () {
		if (this.$attrs.height) {
			this.heightStyle = { height: this.$attrs.height }
		} else if (this.$attrs['max-height']) {
			this.heightStyle = { 'max-height': this.$attrs['max-height'] }
		}
	},
	mounted () {
		this.$nextTick(() => {
			// console.log(this.$parent);
			this.isForm = this.$parent.$options.componentName === 'ElForm'
			if (this.hasselect) {
				this.setDomFun()
				this.$watch('data', this.reLoadLatoutFun)
				this.$watch('headData', this.reLoadLatoutFun)
				window.addEventListener('resize', this.setSelectBoxStyleFun, false)
			}
		})
	},
	methods: {
		isEmptyObject (obj) {
			// 判断空对象
			let name
			for (name in obj) {
				if (name) {
					return false
				}
			}
			return true
		},
		tableRowClassNameFun ({ row, rowIndex }) {
			// 斑马纹和编辑样式
			const notClickToEdit = this.notClickToEdit ? ' not-click-edit' : ''
			if (this.headData.length || this.editClass) {
				if (rowIndex % 2 && !this.hasselect) {
					return 'zr-table__line zr-table__edit' + notClickToEdit
				}
				return 'zr-table__edit' + notClickToEdit
			} else {
				if (rowIndex % 2 && !this.hasselect) {
					return 'zr-table__line' + notClickToEdit
				}
				return '' + notClickToEdit
			}
		},
		cellClassNameFun ({ row, column, rowIndex, columnIndex }) {
			// 设置单元格classname
			return 'col-' + columnIndex
		},
		reLoadLatoutFun () {
			this.notRowIndexs = {}
			this.notColIndexs = {}
			this.$nextTick(() => {
				this.setDomFun()
			})
		},
		getStgTtgFun () {
			// 获取sTg,tTg数据
			const { row: sRowIndex, col: sColIndex } = this.sTg.dataset
			return {
				sRowIndex: ~~sRowIndex,
				sColIndex: ~~sColIndex,
				tRowIndex: this.tRowCol[0],
				tColIndex: this.tRowCol[1]
			}
		},
		removeCurrentRowFun (event) {
			// 移除表格选中编辑状态
			event.preventDefault()
			return new Promise(resolve => {
				if (this.isForm && !this.isEmptyObject(this.rules)) {
					this.$parent.validate(valid => {
						resolve(valid)
						if (!valid) {
							return
						}
						this.notRowIndexs = {}
						this.notColIndexs = {}
						this.$refs.table.setCurrentRow(undefined)
						document.removeEventListener(
							'click',
							this.removeCurrentRowFun,
							false
						)
					})
				} else {
					resolve(true)
					this.notRowIndexs = {}
					this.notColIndexs = {}
					this.$refs.table.setCurrentRow(undefined)
					document.removeEventListener('click', this.removeCurrentRowFun, false)
				}
			})
		},
		removeHeadColFun (event) {
			// 移除表头选中编辑状态
			if (this.editHeadColumn) {
				this.editHeadColumn.headEdit = false
				this.editHeadColumn = false
				this.$nextTick(() => {
					this.headHeight = this.headElm.scrollHeight
				})
				document.removeEventListener('click', this.removeHeadColFun, false)
			}
		},
		removeSelectBoxFun (event) {
			// document的mousedown事件后，删除处理selectBox
			if (event) {
				let target = event.target
				// console.log("mousedown::", target);
				while (target && target !== this.$refs.table.$el) {
					if (
						target.className !== undefined &&
						target.className.includes &&
						target.className.includes('unhide-select')
					) {
						target = null
						return
					}
					target = target.parentElement
				}
				if (!target) {
					// 如果不是当前table的话，处理选择框消失，清除内容
					this.clearSelectBoxFun()
				}
			}
			if (this.$refs.contextmenu) {
				this.contextmenuShow = false
			}
			document.removeEventListener('mousedown', this.removeSelectBoxFun, false)
		},
		clearSelectBoxFun () {
			// 删除处理selectBox显示隐藏，和消除记录
			this.selectBoxShow = false
			this.sTg = null
			this.tTg = null
			this.sRowCol = null
			this.tRowCol = null
		},
		changeMouseType (event) {
			// 改变鼠标状态
			this.mouseType = event.type
			document.addEventListener('mousedown', this.removeSelectBoxFun, false)
			document.removeEventListener('mouseup', this.changeMouseType, false)
		},
		bodyWrapperFun (event) {
			// 滚动条事件
			clearTimeout(this.time)
			this.time = setTimeout(() => {
				// console.log("scroll");
				this.scrollTop = event.target.scrollTop
				this.scrollLeft = event.target.scrollLeft
				if (this.$refs.contextmenu) {
					this.contextmenuShow = false
				}
			}, 10)
		},
		setDomFun () {
			const tableElm = this.$refs.table.$el
			const tableElmChildren = Array.from(tableElm.children)
			// console.dir(this.$slots["default"]);
			forEach(tableElmChildren, v => {
				if (v.className.includes('el-table__header-wrapper')) {
					this.headElm = v
					this.headHeight = v.scrollHeight
				} else if (v.className.includes('el-table__body-wrapper')) {
					v.removeEventListener('scroll', this.bodyWrapperFun)
					v.addEventListener('scroll', this.bodyWrapperFun, false)
					forEach(Array.from(v.querySelectorAll('tr')), (v, rIndex) => {
						forEach(Array.from(v.childNodes), (item, cIndex) => {
							item.dataset.row = rIndex
							item.dataset.col = item.className
								// eslint-disable-next-line no-useless-escape
								.match(/col\-?\d$/g)[0]
								.split('-')[1]
							this.tdElmObj[rIndex + '-' + item.dataset.col] = {
								rowIndex: rIndex,
								colIndex: item.dataset.col,
								target: item
							}
						})
					})
					// console.log(this.tdElmObj);
				}
			})
			tableElm.addEventListener('mousedown', this.selectDownFun, false)
		},
		spanMethodFun ({ row, column, rowIndex, columnIndex }) {
			// 合并表格控制
			// console.log({ row, column, rowIndex, columnIndex });
			const obj = {
				rowspan: 1,
				colspan: 1
			}
			if (this.mergeArr.length) {
				const notRowIndexs = this.notRowIndexs[rowIndex + '' + columnIndex]
				const notColIndexs = this.notColIndexs[columnIndex + '' + rowIndex]
				if (
					(notRowIndexs && notRowIndexs <= rowIndex) ||
					(notColIndexs && notColIndexs === columnIndex)
				) {
					obj.rowspan = 0
					obj.colspan = 0
					return obj
				}
				forEach(this.mergeArr, v => {
					const rIndex = this.data.findIndex(i => i.id === v.rowId) // 查找行下标
					const cIndex = this.cColLists.findIndex(i => i === v.colKey) // 查找列下标
					v.rowIndex = rIndex
					v.colIndex = cIndex
					if (rowIndex === rIndex && cIndex === columnIndex) {
						// 如果存在单前合并的单元格
						obj.rowspan = v.rowspan
						obj.colspan = v.colspan
						const rsum = v.rowspan + rIndex // 记录跨行总数
						const csum = v.colspan + cIndex // 记录跨列总数
						const rarr = []
						const carr = []
						for (let i = rsum; i--;) {
							if (i > rIndex) {
								this.notRowIndexs[i + '' + columnIndex] = i
								rarr.push(i)
							}
						}
						for (let t = csum; t--;) {
							if (t >= cIndex) {
								this.notColIndexs[t + '' + rowIndex] = t
								carr.push(t)
							}
						}
						forEach(rarr, (g, i) => {
							forEach(carr, c => {
								this.notColIndexs[c + '' + g] = c
							})
						})
						// console.log(this.notColIndexs);
						return false
					}
				})
			}
			return obj
		},
		mergeFun (isMerge = true) {
			// true合并表格,/false 拆分合并
			if (this.selectBoxShow) {
				const {
					sRowIndex,
					sColIndex,
					tRowIndex,
					tColIndex
				} = this.getStgTtgFun()
				// console.log("sRowIndex::", sRowIndex);
				// console.log("sColIndex::", sColIndex);
				// console.log("tRowIndex::", tRowIndex);
				// console.log("tColIndex::", tColIndex);
				const includeCells = this.includeCellsFun(
					this.mergeArr,
					sRowIndex,
					sColIndex,
					tRowIndex,
					tColIndex
				)
				// console.log("includeCells::", includeCells);
				const strIncludeCells = includeCells.map(v => v.rowId + '-' + v.colKey)
				// console.log("strIncludeCells::", strIncludeCells);
				for (let i = 0; i < this.mergeArr.length;) {
					const str = this.mergeArr[i].rowId + '-' + this.mergeArr[i].colKey
					console.log('str::', str)
					if (strIncludeCells.includes(str)) {
						this.mergeArr.splice(i, 1)
					} else {
						i++
					}
				}
				// console.log("this.mergeArr::", this.mergeArr);
				if (isMerge) {
					// 说明为合并
					this.mergeArr.push({
						rowId: this.data[sRowIndex].id,
						colKey: this.cColLists[sColIndex],
						rowspan:
							Math.max(sRowIndex, tRowIndex) -
							Math.min(sRowIndex, tRowIndex) +
							1,
						colspan:
							Math.max(sColIndex, tColIndex) -
							Math.min(sColIndex, tColIndex) +
							1
					})
				}
				this.tdElmObj = {}
				this.selectBoxShow = false
				this.reLoadLatoutFun()
				if (this.$refs.contextmenu) {
					this.contextmenuShow = false
				}
			}
		},
		rowContextmenuFun (row, _, event) {
			// 右键时候，处理右键菜单
			event.stopPropagation()
			event.preventDefault()
			if (this.hasmenu && this.$refs.contextmenu) {
				this.contextmenuShow = true
				this.rowContextmenuData.row = row
				this.rowContextmenuData.event = event
				this.$nextTick(() => {
					const $el = this.$refs.contextmenu
					const { offsetHeight } = $el
					$el.style.left = event.clientX + 'px'
					if (event.clientY + offsetHeight > window.innerHeight) {
						$el.style.top = event.clientY - offsetHeight + 'px'
					} else {
						$el.style.top = event.clientY + 'px'
					}
				})
				document.addEventListener('mousedown', this.removeSelectBoxFun, false)
			}
			this.$emit('row-contextmenu', row, event)
		},
		setSelectBoxStyleFun () {
			// 设置选择框样式
			this.headHeight = this.headElm.scrollHeight
			if (this.sTg) {
				const {
					offsetTop: sOffsetTop,
					offsetLeft: sOffsetLeft,
					offsetHeight: sOffsetHeight,
					offsetWidth: sOffsetWidth
				} = this.sTg
				this.TLRTop = sOffsetTop + this.headHeight
				this.wTB = sOffsetWidth
				this.TBLLeft = sOffsetLeft
				this.hLR = sOffsetHeight
				if (this.tTg) {
					const {
						offsetTop: tOffsetTop,
						offsetLeft: tOffsetLeft,
						offsetHeight: tOffsetHeight,
						offsetWidth: tOffsetWidth
					} = this.tTg
					const wTB = Math.max(sOffsetWidth, tOffsetWidth)
					const hLR = Math.max(sOffsetHeight, tOffsetHeight)
					this.wTB = wTB
					this.hLR = hLR
					if (
						tOffsetLeft > sOffsetLeft &&
						this.selectDirection.includes('right')
					) {
						// 向右选择
						this.wTB = tOffsetLeft - sOffsetLeft + tOffsetWidth
					}
					if (
						tOffsetLeft < sOffsetLeft &&
						this.selectDirection.includes('left')
					) {
						// 向左选择
						this.TBLLeft = tOffsetLeft
						this.wTB = sOffsetLeft - tOffsetLeft + tOffsetWidth
					}
					if (
						tOffsetTop > sOffsetTop &&
						this.selectDirection.includes('down')
					) {
						// 向下选择
						this.hLR = tOffsetTop - sOffsetTop + tOffsetHeight
					}
					if (tOffsetTop < sOffsetTop && this.selectDirection.includes('up')) {
						// 向上选择
						this.TLRTop = tOffsetTop + this.headHeight
						this.hLR = sOffsetTop - tOffsetTop + tOffsetHeight
					}
				}
			}
		},
		selectDownFun (event) {
			// 选择框事件，mousedown
			console.dir(event)
			if (event.which === 1) {
				// event.preventDefault();
				event.stopPropagation()
				this.changeMouseType(event)
				this.tTg = null
				let target = event.target
				while (target && target.tagName !== 'TD') {
					target = target.offsetParent
				}
				console.dir(target)
				this.sTg = target
				this.tTg = target
				this.sRowCol = null
				if (target) {
					const { row, col } = target.dataset
					this.sRowCol = [row, col]
					this.selectBoxShow = true
					this.setSelectBoxStyleFun()
				} else {
					this.selectBoxShow = false
				}
				document.addEventListener('mouseup', this.changeMouseType, false)
				if (this.$refs.contextmenu) {
					this.contextmenuShow = false
				}
			}
		},
		includeCellsFun (
			arr = this.mergeArr,
			sRowIndex,
			sColIndex,
			tRowIndex,
			tColIndex
		) {
			// 获取框选范围内合并过的单元格数组
			const maxColIndex = Math.max(sColIndex, tColIndex)
			const minColIndex = Math.min(sColIndex, tColIndex)
			const maxRowIndex = Math.max(sRowIndex, tRowIndex)
			const minRowIndex = Math.min(sRowIndex, tRowIndex)
			return arr.filter(v => {
				// 框选经过的合并单元格数组
				const rI =
					v.rowspan > 1
						? [v.rowIndex, v.rowIndex + v.rowspan - 1]
						: [v.rowIndex, v.rowIndex]
				const cI =
					v.colspan > 1
						? [v.colIndex, v.colIndex + v.colspan - 1]
						: [v.colIndex, v.colIndex]
				const judgeRow =
					Math.max(minRowIndex, rI[0]) <= Math.min(maxRowIndex, rI[1])
				const judgeCol =
					Math.max(minColIndex, cI[0]) <= Math.min(maxColIndex, cI[1])
				// console.log(judgeRow);
				// console.log(judgeCol);
				return judgeRow && judgeCol
			})
		},
		cellMouseEnterFun (row, column, cell, event) {
			// 单元格hover进入时候
			if (this.sTg && this.mouseType === 'mousedown') {
				// console.log("进入", row, column, cell, event);
				const { offsetTop: sOffsetTop, offsetLeft: sOffsetLeft } = this.sTg
				const { offsetTop: tOffsetTop, offsetLeft: tOffsetLeft } = cell
				if (tOffsetTop > sOffsetTop) {
					// 向下选择
					this.moveType = 'down'
				}
				if (tOffsetTop < sOffsetTop) {
					// 向上选择
					this.moveType = 'up'
				}
				if (tOffsetLeft > sOffsetLeft) {
					// 向右选择
					this.moveType = 'right'
				}
				if (tOffsetLeft < sOffsetLeft) {
					// 向左选择
					this.moveType = 'left'
				}
				if (this.selectDirection.includes(this.moveType)) {
					this.tTg = cell
					let sRowIndex = this.sRowCol[0]
					let sColIndex = this.sRowCol[1]
					let tRowIndex = event.target.dataset.row
					let tColIndex = event.target.dataset.col
					let oldIncludeCells = 0 // 缓存旧的框选合并单元格数组，处理判断是否停止递归寻找
					let includeCells = []
					// console.log("sColIndex::", sColIndex);
					// console.log("sRowIndex::", sRowIndex);
					// console.log("tColIndex::", tColIndex);
					// console.log("tRowIndex::", tRowIndex);
					const selectBoxFun = () => {
						const setRowColFun = (rowArr, colArr) => {
							const maxTop = Math.min(...rowArr)
							const maxBottom = Math.max(...rowArr)
							const maxLeft = Math.min(...colArr)
							const maxRight = Math.max(...colArr)
							sRowIndex = maxTop
							sColIndex = maxLeft
							tRowIndex = maxBottom
							tColIndex = maxRight
						}
						includeCells = this.includeCellsFun(
							this.mergeArr,
							sRowIndex,
							sColIndex,
							tRowIndex,
							tColIndex
						)
						// console.log("oldIncludeCells::", oldIncludeCells);
						// console.log("includeCells::", includeCells);
						if (includeCells.length) {
							forEach(includeCells, (v, i) => {
								const incRowIndex =
									v.rowspan > 1 ? v.rowIndex + v.rowspan - 1 : v.rowIndex
								const incColIndex =
									v.colspan > 1 ? v.colIndex + v.colspan - 1 : v.colIndex
								const rowArr = [v.rowIndex, incRowIndex, sRowIndex, tRowIndex]
								const colArr = [v.colIndex, incColIndex, sColIndex, tColIndex]
								setRowColFun(rowArr, colArr)
							})
							if (oldIncludeCells !== includeCells.length) {
								oldIncludeCells = includeCells.length
								selectBoxFun()
							}
						} else {
							const rowArr = [sRowIndex, tRowIndex]
							const colArr = [sColIndex, tColIndex]
							setRowColFun(rowArr, colArr)
						}
					}
					selectBoxFun()
					const sTg = this.tdElmObj[sRowIndex + '-' + sColIndex]
					const tTg = this.tdElmObj[tRowIndex + '-' + tColIndex]
					this.tRowCol = [tRowIndex, tColIndex]
					// console.log("tdElmObj::", this.tdElmObj);
					// console.log("sTgIndex::", sRowIndex + "-" + sColIndex);
					// console.log("tTgIndex::", tRowIndex + "-" + tColIndex);
					// console.log("sRowCol::", this.sRowCol);
					// console.log("tRowCol::", this.tRowCol);
					if (sTg) {
						this.sTg = sTg.target
					}
					if (tTg) {
						this.tTg = tTg.target
					} else {
						if (includeCells.length) {
							forEach(includeCells, v => {
								const sNewRowIndex =
									v.rowspan > 1 ? v.rowIndex + v.rowspan - 1 : v.rowIndex
								const sNewColIndex =
									v.colspan > 1 ? v.colIndex + v.colspan - 1 : v.colIndex
								const includeArr = this.includeCellsFun(
									includeCells,
									sNewRowIndex,
									sNewColIndex,
									tRowIndex,
									tColIndex
								)
								if (includeArr.length) {
									const rI = includeArr[includeArr.length - 1].rowIndex
									const cI = includeArr[includeArr.length - 1].colIndex
									this.tTg = this.tdElmObj[rI + '-' + cI].target
									return false
								}
							})
						}
					}
					// console.log("this.sTg:", this.sTg);
					// console.log("this.tTg:", this.tTg);
					this.setSelectBoxStyleFun()
				}
			}
			this.$emit('cell-mouse-enter', row, column, cell, event)
		},
		async headerClickFun (column, event) {
			// 表头点击事件
			event.stopPropagation()
			if (
				this.headEdit &&
				event.target.className !== undefined &&
				!event.target.className.includes('head__checkbox')
			) {
				// console.dir(event.target);
				const isPass = await this.removeCurrentRowFun(event)
				if (isPass) {
					this.removeHeadColFun()
					this.$nextTick(() => {
						console.log(column, event)
						column.headEdit = true
						this.editHeadColumn = column
						document.addEventListener('click', this.removeHeadColFun)
					})
				}
			}
			// this.$emit("header-click", column, event);
		},
		rowClickFun (row, column, event) {
			// 选中事件
			event.stopPropagation()
			if (this.editHeadColumn) {
				// 移除表头编辑状态
				this.removeHeadColFun()
			}
			this.notRowIndexs = {}
			this.notColIndexs = {}
			if (this.isForm && !this.isEmptyObject(this.rules)) {
				this.$parent.validate(valid => {
					if (!valid) {
						this.$refs.table.setCurrentRow(this.currentRow)
						return
					}
					this.currentRow = row
					this.$emit('row-click', row, event, column)
					if (!this.notClickToEdit && !this.notCloseEdit) {
						document.addEventListener('click', this.removeCurrentRowFun, false)
					}
				})
			} else {
				this.$emit('row-click', row, event, column)
				if (!this.notClickToEdit && !this.notCloseEdit) {
					document.addEventListener('click', this.removeCurrentRowFun, false)
				}
			}
		},
		currentChangeFun (currentRow, oldCurrentRow) {
			// 选中发生改变时候，处理选择框改变
			this.$nextTick(() => {
				if (this.hasselect) {
					this.setSelectBoxStyleFun()
				}
			})
			this.$emit('current-change', currentRow, oldCurrentRow)
		}
	}
}
</script>
<style lang="scss">
@import './zrEditTable.scss';
</style>
<style lang="scss" scoped>
.head__checkbox {
	margin-right: 10px;
}
.g-pr {
	position: relative;
}
.z-hidden {
	overflow: hidden;
}
.z-clr-white {
	color: white;
}
.m-pa-lt {
	position: absolute;
	left: 0;
	top: 0;
}
</style>
