(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["zr-edit-table"] = factory();
	else
		root["zr-edit-table"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    if (document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "b6c7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d66b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "caf4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_73d2b742_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ccd9");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_73d2b742_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_73d2b742_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_1_id_73d2b742_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ccd9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d66b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"45d9bdfa-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/zrEditTable/src/index.vue?vue&type=template&id=73d2b742&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"zr-table g-pr z-hidden",style:(_vm.heightStyle)},[_c('el-table',_vm._g(_vm._b({ref:"table",staticClass:"zr-table g-pr z-hidden",class:{'zr-table__last':_vm.isForm},attrs:{"row-class-name":_vm.tableRowClassNameFun,"header-row-class-name":_vm.editHeadColumn?'zr-table__header header__edit':'zr-table__header',"border":"","span-method":_vm.spanMethodFun,"data":_vm.data,"cell-class-name":_vm.cellClassNameFun},on:{"row-contextmenu":_vm.rowContextmenuFun,"cell-mouse-enter":_vm.cellMouseEnterFun,"header-click":_vm.headerClickFun,"row-click":_vm.rowClickFun,"current-change":_vm.currentChangeFun}},'el-table',_vm.$attrs,false),_vm.$listeners),[_vm._t("left"),(_vm.headData.length)?[_vm._l((_vm.headData),function(item){return [_c('el-table-column',{key:item.prop,attrs:{"prop":item.prop,"width":item.width,"min-width":item.mWidth,"sortable":item.sortable},scopedSlots:_vm._u([{key:"header",fn:function(scope){return [(item.headCheckBox)?_c('el-checkbox',{directives:[{name:"show",rawName:"v-show",value:(!scope.column.headEdit),expression:"!scope.column.headEdit"}],staticClass:"z-clr-white head__checkbox",attrs:{"disabled":item.headCheckBox.disabled},on:{"change":function($event){item.headCheckBox.change?item.headCheckBox.change(item.headCheckBox.checked,scope):function (){}}},nativeOn:{"click":function($event){return (function (event){ return event.stopPropagation(); })($event)}},model:{value:(item.headCheckBox.checked),callback:function ($$v) {_vm.$set(item.headCheckBox, "checked", $$v)},expression:"item.headCheckBox.checked"}}):_vm._e(),_c('span',{directives:[{name:"show",rawName:"v-show",value:(!scope.column.headEdit),expression:"!scope.column.headEdit"}]},[_vm._v(_vm._s(item.label))]),(_vm.headData.length)?_c('el-input',{directives:[{name:"show",rawName:"v-show",value:(scope.column.headEdit),expression:"scope.column.headEdit"}],staticClass:"head-input_edit",attrs:{"size":"medium","placeholder":"输入名称"},model:{value:(item.label),callback:function ($$v) {_vm.$set(item, "label", $$v)},expression:"item.label"}}):_vm._e()]}},{key:"default",fn:function(scope){return [(!_vm.isEmptyObject(_vm.rules))?_c('el-form-item',{attrs:{"prop":("data." + (scope.$index) + "." + (item.prop)),"rules":_vm.rules[item.prop]}},[_c('edit-table-element',_vm._g({attrs:{"item":item,"scope":scope,"notEditColKeyArr":_vm.notEditColKeyArr}},_vm.$listeners))],1):_c('edit-table-element',_vm._g({attrs:{"item":item,"scope":scope,"notEditColKeyArr":_vm.notEditColKeyArr}},_vm.$listeners))]}}],null,true)})]})]:_vm._e(),_vm._t("default")],2),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.selectBoxShow),expression:"selectBoxShow"}],staticClass:"m-pa-lt"},[_c('div',{staticClass:"edit__top",style:({top:_vm.TLRTop-_vm.scrollTop +'px',width:_vm.wTB +'px',left:_vm.TBLLeft-_vm.scrollLeft +'px'})}),_c('div',{staticClass:"edit__bottom",style:({top:_vm.TLRTop-_vm.scrollTop+_vm.hLR +'px',width:_vm.wTB+1 +'px',left:_vm.TBLLeft-_vm.scrollLeft +'px'})}),_c('div',{staticClass:"edit__left",style:({top:_vm.TLRTop-_vm.scrollTop +'px',height:_vm.hLR +'px',left:_vm.TBLLeft-_vm.scrollLeft +'px'})}),_c('div',{staticClass:"edit__right",style:({top:_vm.TLRTop-_vm.scrollTop +'px',height:_vm.hLR+1 +'px',left:_vm.TBLLeft+_vm.wTB-_vm.scrollLeft +'px'})})]),((_vm.hasmenu && _vm.menuArr.length) || (_vm.hasselect && _vm.selectBoxShow))?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.contextmenuShow),expression:"contextmenuShow"}],ref:"contextmenu",staticClass:"zr-contextmenu"},[_vm._l((_vm.menuArr),function(item,index){return [(item.isHide!==true)?_c('div',{key:index,staticClass:"unhide-select zr-contextmenu-item",attrs:{"divider":_vm.isEmptyObject(item)},on:{"click":function($event){return item.fun(item,_vm.rowContextmenuData.row,_vm.rowContextmenuData.event)}}},[_vm._v(_vm._s(item.name))]):_vm._e()]})],2):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/zrEditTable/src/index.vue?vue&type=template&id=73d2b742&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"45d9bdfa-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/zrEditTable/src/editTableElement.vue?vue&type=template&id=7d2cead2&
var editTableElementvue_type_template_id_7d2cead2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'not-edit':_vm.cNotEdit}},[(!_vm.cNotEdit && _vm.item.edit.includes('text'))?_c('el-input',{attrs:{"size":"medium","disabled":_vm.cNotEdit,"placeholder":_vm._f("editData")(_vm.item.edit)},on:{"change":function($event){return _vm.$emit('input-change',_vm.scope,_vm.item.prop)}},model:{value:(_vm.scope.row[_vm.item.prop]),callback:function ($$v) {_vm.$set(_vm.scope.row, _vm.item.prop, $$v)},expression:"scope.row[item.prop]"}}):(_vm.item.edit.includes('checkbox'))?_c('el-checkbox',{staticClass:"pd3-table__edit-checkbox",attrs:{"size":"medium","true-label":Object.keys(_vm.item.data)[0],"false-label":Object.keys(_vm.item.data)[1]},on:{"change":function($event){return _vm.$emit('checkbox-change',_vm.scope,_vm.item.prop)}},model:{value:(_vm.scope.row[_vm.item.prop]),callback:function ($$v) {_vm.$set(_vm.scope.row, _vm.item.prop, $$v)},expression:"scope.row[item.prop]"}}):(!_vm.cNotEdit && _vm.item.edit.includes('select'))?_c('el-select',{attrs:{"placeholder":_vm._f("editData")(_vm.item.edit),"disabled":_vm.cNotEdit,"size":"medium"},on:{"change":function($event){return _vm.$emit('select-change',_vm.scope,_vm.item.prop)}},model:{value:(_vm.scope.row[_vm.item.prop]),callback:function ($$v) {_vm.$set(_vm.scope.row, _vm.item.prop, $$v)},expression:"scope.row[item.prop]"}},[_vm._l((_vm.item.data),function(value,index){return [_c('el-option',{key:index,attrs:{"label":value.label,"value":value.value}})]})],2):(!_vm.cNotEdit && _vm.item.edit.includes('number'))?_c('el-input-number',{attrs:{"size":"medium","disabled":_vm.cNotEdit,"controls-position":"right","min":_vm.item.min || 0,"max":_vm.item.max || 100},on:{"change":function($event){return _vm.$emit('number-change',_vm.scope,_vm.item.prop)}},model:{value:(_vm.scope.row[_vm.item.prop]),callback:function ($$v) {_vm.$set(_vm.scope.row, _vm.item.prop, $$v)},expression:"scope.row[item.prop]"}}):(!_vm.cNotEdit && _vm.item.edit.includes('date'))?_c('el-date-picker',{attrs:{"size":"medium","type":"date","disabled":_vm.cNotEdit,"placeholder":_vm._f("editData")(_vm.item.edit),"format":_vm.item.format,"value-format":_vm.item['value-format']},on:{"change":function($event){return _vm.$emit('date-change',_vm.scope,_vm.item.prop)}},model:{value:(_vm.scope.row[_vm.item.prop]),callback:function ($$v) {_vm.$set(_vm.scope.row, _vm.item.prop, $$v)},expression:"scope.row[item.prop]"}}):(_vm.item.edit.includes('color'))?_c('el-color-picker',{staticStyle:{"display":"inherit"},attrs:{"size":"mini","disabled":_vm.cNotEdit},on:{"change":function($event){return _vm.$emit('color-change',_vm.scope,_vm.item.prop)}},model:{value:(_vm.scope.row[_vm.item.prop]),callback:function ($$v) {_vm.$set(_vm.scope.row, _vm.item.prop, $$v)},expression:"scope.row[item.prop]"}}):_vm._e(),(!_vm.item.edit.includes('color') && !_vm.item.edit.includes('icon') && !_vm.item.edit.includes('checkbox'))?_c('span',[(_vm.item.text_left)?[_vm._v(_vm._s(_vm._f("editText")(_vm.item,_vm.scope)))]:_vm._e(),(!_vm.item.text_left)?[_vm._v(_vm._s(_vm._f("editText")(_vm.item,_vm.scope)))]:_vm._e()],2):_vm._e()],1)}
var editTableElementvue_type_template_id_7d2cead2_staticRenderFns = []


// CONCATENATED MODULE: ./packages/zrEditTable/src/editTableElement.vue?vue&type=template&id=7d2cead2&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/zrEditTable/src/editTableElement.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var editTableElementvue_type_script_lang_js_ = ({
	name: 'edit-table-element',
	props: {
		item: Object, // 节点数据
		scope: Object, // table数据
		notEditColKeyArr: {
			// 控制不可编辑列
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {}
	},
	computed: {
		cNotEdit() {
			// 控制不可以编辑的列数组
			return this.notEditColKeyArr.includes(this.item.prop)
		}
	},
	filters: {
		editData(value, index = 1) {
			return value.split('|')[index]
		},
		editText(item, scope) {
			if (item.data && item.edit.includes('checkbox')) {
				return item.data[scope.row[item.prop]]
			}
			if (item.data && item.edit.includes('select')) {
				return item.data.find(v => v.value === scope.row[item.prop]).label
			}
			return scope.row[item.prop]
		}
	}
});

// CONCATENATED MODULE: ./packages/zrEditTable/src/editTableElement.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_editTableElementvue_type_script_lang_js_ = (editTableElementvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./packages/zrEditTable/src/editTableElement.vue





/* normalize component */

var component = normalizeComponent(
  src_editTableElementvue_type_script_lang_js_,
  editTableElementvue_type_template_id_7d2cead2_render,
  editTableElementvue_type_template_id_7d2cead2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var editTableElement = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/zrEditTable/src/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


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
/* harmony default export */ var srcvue_type_script_lang_js_ = ({
	name: 'zr-edit-table',
	inheritAttrs: false,
	components: {
		editTableElement: editTableElement
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
});

// CONCATENATED MODULE: ./packages/zrEditTable/src/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var zrEditTable_srcvue_type_script_lang_js_ = (srcvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/zrEditTable/src/index.vue?vue&type=style&index=0&lang=scss&
var srcvue_type_style_index_0_lang_scss_ = __webpack_require__("b6c7");

// EXTERNAL MODULE: ./packages/zrEditTable/src/index.vue?vue&type=style&index=1&id=73d2b742&lang=scss&scoped=true&
var srcvue_type_style_index_1_id_73d2b742_lang_scss_scoped_true_ = __webpack_require__("caf4");

// CONCATENATED MODULE: ./packages/zrEditTable/src/index.vue







/* normalize component */

var src_component = normalizeComponent(
  zrEditTable_srcvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "73d2b742",
  null
  
)

/* harmony default export */ var zrEditTable_src = (src_component.exports);
// CONCATENATED MODULE: ./packages/zrEditTable/index.js


// 为组件提供 install 安装方法，供按需引入
zrEditTable_src.install = function (Vue) {
  Vue.component(zrEditTable_src.name, zrEditTable_src)
}

// 默认导出组件
/* harmony default export */ var zrEditTable = (zrEditTable_src);
// CONCATENATED MODULE: ./packages/index.js
// 导入颜色选择器组件


// 存储组件列表
const components = [
  zrEditTable
]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

/* harmony default export */ var packages_0 = ({
  install,
  zrEditTable: zrEditTable
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (packages_0);



/***/ })

/******/ });
});
//# sourceMappingURL=zr-edit-table.umd.js.map