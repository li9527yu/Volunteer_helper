(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox"],{"51c32":function(t,e,a){},"58f2":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"uniDataChecklist",mixins:[t.mixinDatacom],props:{mode:{type:String,default:"default"},multiple:{type:Boolean,default:!1},value:{type:[Array,String,Number],default:function(){return""}},localdata:{type:Array,default:function(){return[]}},min:{type:[Number,String],default:""},max:{type:[Number,String],default:""},wrap:{type:Boolean,default:!1},icon:{type:String,default:"left"},selectedColor:{type:String,default:"#007aff"},selectedTextColor:{type:String,default:"#333"},emptyText:{type:String,default:"暂无数据"},disabled:{type:Boolean,default:!1}},watch:{localdata:{handler:function(t){this.range=t,this.dataList=this.getDataList(this.getSelectedValue(t))},deep:!0},mixinDatacomResData:function(t){this.range=t,this.dataList=this.getDataList(this.getSelectedValue(t))},value:function(t){this.dataList=this.getDataList(t),this.formItem&&this.formItem.setValue(t)}},data:function(){return{dataList:[],range:[],contentText:{contentdown:"查看更多",contentrefresh:"加载中",contentnomore:"没有更多"},isLocal:!0,styles:{selectedColor:"#007aff",selectedTextColor:"#333"}}},created:function(){this.form=this.getForm("uniForms"),this.formItem=this.getForm("uniFormsItem"),this.formItem&&this.formItem.setValue(this.value),this.formItem&&this.formItem.name&&(this.rename=this.formItem.name,this.form.inputChildrens.push(this)),this.localdata&&0!==this.localdata.length?(this.isLocal=!0,this.range=this.localdata,this.dataList=this.getDataList(this.getSelectedValue(this.range))):this.collection&&(this.isLocal=!1,this.loadData())},methods:{loadData:function(){var t=this;this.mixinDatacomGet().then((function(e){t.mixinDatacomResData=e.result.data,0===t.mixinDatacomResData.length?(t.isLocal=!1,t.mixinDatacomErrorMessage=t.emptyText):t.isLocal=!0})).catch((function(e){t.mixinDatacomErrorMessage=e.message}))},getForm:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"uniForms",e=this.$parent,a=e.$options.name;while(a!==t){if(e=e.$parent,!e)return!1;a=e.$options.name}return e},chagne:function(t){var e=t.detail.value,a={value:[],data:[]};if(this.multiple)this.range.forEach((function(t){e.includes(t.value+"")&&(a.value.push(t.value),a.data.push(t))}));else{var i=this.range.find((function(t){return t.value+""===e}));i&&(a={value:i.value,data:i})}this.formItem&&this.formItem.setValue(a.value),this.$emit("input",a.value),this.$emit("change",{detail:a}),this.multiple?this.dataList=this.getDataList(a.value,!0):this.dataList=this.getDataList(a.value)},getDataList:function(t){var e=this,a=JSON.parse(JSON.stringify(this.range)),i=[];return this.multiple&&(Array.isArray(t)||(t=[])),a.forEach((function(a,n){if(a.disabled=a.disable||a.disabled||!1,e.multiple)if(t.length>0){var o=t.find((function(t){return t===a.value}));a.selected=void 0!==o}else a.selected=!1;else a.selected=t===a.value;i.push(a)})),this.setRange(i)},setRange:function(t){var e=this,a=t.filter((function(t){return t.selected})),i=Number(this.min)||0,n=Number(this.max)||"";return t.forEach((function(o,s){if(e.multiple){if(a.length<=i){var l=a.find((function(t){return t.value===o.value}));void 0!==l&&(o.disabled=!0)}if(a.length>=n&&""!==n){var r=a.find((function(t){return t.value===o.value}));void 0===r&&(o.disabled=!0)}}e.setStyles(o,s),t[s]=o})),t},setStyles:function(t,e){t.styleBackgroud=this.setStyleBackgroud(t),t.styleIcon=this.setStyleIcon(t),t.styleIconText=this.setStyleIconText(t),t.styleRightIcon=this.setStyleRightIcon(t)},getSelectedValue:function(t){if(!this.multiple)return this.value;var e=[];return t.forEach((function(t){t.selected&&e.push(t.value)})),this.value.length>0?this.value:e},setStyleBackgroud:function(t){var e={};"list"!==this.mode&&(e["border-color"]=t.selected?this.selectedColor:"#DCDFE6"),"tag"===this.mode&&(e["background-color"]=t.selected?this.selectedColor:"#f5f5f5");var a="";for(var i in e)a+="".concat(i,":").concat(e[i],";");return a},setStyleIcon:function(t){var e={},a="";for(var i in e["background-color"]=t.selected?this.selectedColor:"#fff",e["border-color"]=t.selected?this.selectedColor:"#DCDFE6",!t.selected&&t.disabled&&(e["background-color"]="#F2F6FC",e["border-color"]=t.selected?this.selectedColor:"#DCDFE6"),e)a+="".concat(i,":").concat(e[i],";");return a},setStyleIconText:function(t){var e={},a="";for(var i in"tag"===this.mode?e.color=t.selected?"#fff":"#333":e.color=t.selected?this.selectedColor:"#333",!t.selected&&t.disabled&&(e.color="#999"),e)a+="".concat(i,":").concat(e[i],";");return a},setStyleRightIcon:function(t){var e={},a="";for(var i in"list"===this.mode&&(e["border-color"]=t.selected?this.styles.selectedColor:"#DCDFE6"),e)a+="".concat(i,":").concat(e[i],";");return a}}};e.default=a}).call(this,a("a9ff")["default"])},"94bc":function(t,e,a){"use strict";var i=a("51c32"),n=a.n(i);n.a},a395:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var i={uniLoadMore:function(){return a.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more").then(a.bind(null,"c824"))}},n=function(){var t=this,e=t.$createElement;t._self._c},o=[]},eab5:function(t,e,a){"use strict";a.r(e);var i=a("a395"),n=a("eab7");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("94bc");var s,l=a("f0c5"),r=Object(l["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=r.exports},eab7:function(t,e,a){"use strict";a.r(e);var i=a("58f2"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox-create-component',
    {
        'uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("eab5"))
        })
    },
    [['uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox-create-component']]
]);