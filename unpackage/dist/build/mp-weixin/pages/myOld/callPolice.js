(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myOld/callPolice"],{"02d4":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var o={uniForms:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(n.bind(null,"35fd"))},uniFormsItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item")]).then(n.bind(null,"41e4"))},uniEasyinput:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput")]).then(n.bind(null,"3c21"))},uniDataCheckbox:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox")]).then(n.bind(null,"eab5"))},uniDatetimePicker:function(){return n.e("uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker").then(n.bind(null,"a453"))},uniRow:function(){return n.e("uni_modules/uni-row/components/uni-row/uni-row").then(n.bind(null,"8719"))},uniCol:function(){return n.e("uni_modules/uni-row/components/uni-col/uni-col").then(n.bind(null,"cc0e"))}},i=function(){var e=this,t=e.$createElement;e._self._c},a=[]},"23eb":function(e,t,n){"use strict";n.r(t);var o=n("d0ca"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a},"5c6c":function(e,t,n){"use strict";var o=n("a824"),i=n.n(o);i.a},"776d":function(e,t,n){"use strict";(function(e){n("d241");o(n("66fd"));var t=o(n("9e28"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"9e28":function(e,t,n){"use strict";n.r(t);var o=n("02d4"),i=n("23eb");for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("5c6c");var s,c=n("f0c5"),r=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);t["default"]=r.exports},a824:function(e,t,n){},d0ca:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c,r=n("5b7e"),u={data:function(){return{flag:!1,TaskInfo:{LoseTime:"",description:"",latitude:"",longitude:"",city:"",district:"",province:"",address:"",place:"",eid:""},Oldinfo:{address:"",back_card:"",city:"",district:"",front_card:"",gender:0,latitude:"",longitude:"",name:"",place:"",level:"",province:"",birthday:"",height:"",uid:"",eid:""},oldInfo:{},value:0,range:[{value:0,text:"男"},{value:1,text:"女"}],date:"",changeStatus:!0,Oldimage:[],nowDate:""}},created:function(){c=new r({key:"QV7BZ-6M76X-TFL4M-TGKDY-FFC76-VJF7O"});var e=this.dateFormat(new Date);this.nowDate=e,console.log(this.nowDate),console.log(e)},computed:a({},(0,o.mapState)(["token","uid","tel","pw"])),methods:{dateFormat:function(e){var t=new Date(e),n=t.getFullYear(),o=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,i=t.getDate()<10?"0"+t.getDate():t.getDate(),a=t.getHours()<10?"0"+t.getHours():t.getHours(),s=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),c=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds();return n+"-"+o+"-"+i+" "+a+":"+s+":"+c},chooseLocation:function(){var t=this;e.chooseLocation({success:function(e){t.TaskInfo.latitude=e.latitude,t.TaskInfo.longitude=e.longitude,t.TaskInfo.address=e.address,t.TaskInfo.place=e.name,t.analysisLocation(e.latitude,e.longitude)}})},analysisLocation:function(e,t){var n=this;c.reverseGeocoder({location:{latitude:e,longitude:t},success:function(e){n.TaskInfo.province=e.result.address_component.province,n.TaskInfo.city=e.result.address_component.city,n.TaskInfo.district=e.result.address_component.district}}),console.log(this.TaskInfo)},dateChange:function(e){this.TaskInfo.LoseTime="".concat(e)},selectImg:function(t){var n=t.tempFilePaths,o="Bearer ".concat(this.token);e.uploadFile({url:"https://fwwb2020-proxy-slk.tgucsdn.com/file/upload",header:{Authorization:o,"Content-Type":"multipart/form-data"},filePath:n[0],name:"photo",success:function(e){if(200==e.statusCode){var t=JSON.parse(e.data);console.log(t)}},fail:function(e){console.log(e)}})},CallPolice:function(){var t=this,n="Bearer ".concat(this.token);console.log(this.Oldinfo),console.log(this.TaskInfo),this.TaskInfo.LoseTime?this.TaskInfo.place?this.TaskInfo.description?e.request({url:"https://fwwb2020-proxy-slk.tgucsdn.com/task/addTask",method:"POST",header:{"content-type":"application/json",Authorization:n},data:{address:t.TaskInfo.address,city:t.TaskInfo.city,district:t.TaskInfo.district,eid:t.Oldinfo.eid,description:t.TaskInfo.description,start:t.TaskInfo.LoseTime,latitude:t.TaskInfo.latitude,longitude:t.TaskInfo.longitude,place:t.TaskInfo.place,province:t.TaskInfo.province},success:function(t){console.log(t.data),200==t.data.status?(e.showToast({title:"报警成功",icon:"none",mask:!0,image:"../../static/img/success.png"}),setTimeout((function(){e.switchTab({url:"./oldPeople"})}),1e3)):e.showToast({title:"".concat(t.data.msg),icon:"none",mask:!0,image:"../../static/img/error.png"})},fail:function(t){e.showToast({title:"报警失败！",icon:"none",mask:!0,image:"../../static/img/error.png"})}}):e.showToast({mask:!0,image:"../../static/img/error.png",icon:"none",title:"请填写老人描述"}):e.showToast({mask:!0,image:"../../static/img/error.png",icon:"none",title:"请填写走失地点"}):e.showToast({mask:!0,image:"../../static/img/error.png",icon:"none",title:"请填写走失时间"})}},onLoad:function(e){if(null!=e){var t=JSON.parse(e.oldInfo);t.back_card=decodeURIComponent(t.back_card),t.front_card=decodeURIComponent(t.front_card),this.Oldinfo=t,this.date=this.Oldinfo.birthday,this.value=this.Oldinfo.gender,this.TaskInfo.eid=this.Oldinfo.eid}console.log(this.Oldinfo)}};t.default=u}).call(this,n("543d")["default"])}},[["776d","common/runtime","common/vendor"]]]);