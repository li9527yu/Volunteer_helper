(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myOld/oldPeople"],{"0ce0":function(t,o,n){"use strict";var e=n("abc9"),i=n.n(e);i.a},"463b":function(t,o,n){"use strict";(function(t){n("d241");e(n("66fd"));var o=e(n("a51c"));function e(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,n("543d")["createPage"])},4686:function(t,o,n){"use strict";n.d(o,"b",(function(){return i})),n.d(o,"c",(function(){return s})),n.d(o,"a",(function(){return e}));var e={uniRow:function(){return n.e("uni_modules/uni-row/components/uni-row/uni-row").then(n.bind(null,"8719"))},uniCol:function(){return n.e("uni_modules/uni-row/components/uni-col/uni-col").then(n.bind(null,"cc0e"))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"6e0a"))}},i=function(){var t=this,o=t.$createElement;t._self._c},s=[]},a51c:function(t,o,n){"use strict";n.r(o);var e=n("4686"),i=n("e1eb");for(var s in i)"default"!==s&&function(t){n.d(o,t,(function(){return i[t]}))}(s);n("0ce0");var c,a=n("f0c5"),r=Object(a["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],c);o["default"]=r.exports},abc9:function(t,o,n){},e1eb:function(t,o,n){"use strict";n.r(o);var e=n("f4fa"),i=n.n(e);for(var s in e)"default"!==s&&function(t){n.d(o,t,(function(){return e[t]}))}(s);o["default"]=i.a},f4fa:function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e=n("2f62");function i(t,o){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);o&&(e=e.filter((function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable}))),n.push.apply(n,e)}return n}function s(t){for(var o=1;o<arguments.length;o++){var n=null!=arguments[o]?arguments[o]:{};o%2?i(Object(n),!0).forEach((function(o){c(t,o,n[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(o){Object.defineProperty(t,o,Object.getOwnPropertyDescriptor(n,o))}))}return t}function c(t,o,n){return o in t?Object.defineProperty(t,o,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[o]=n,t}var a={data:function(){return{olds:[],photos:[],oldShow:!1,oldsNum:!1,photosNum:[]}},computed:s({},(0,e.mapState)(["token","uid","tel","pw","isLogin"])),created:function(){this.oldShow=!1,this.isLogin?this.getAllOlds():t.showModal({title:"您还未登录，是否现在登录？",success:function(o){o.confirm&&t.reLaunch({url:"../login/login"})}})},onShow:function(){this.isLogin||(this.oldShow=!1)},onLoad:function(){this.isLogin&&this.getAllOlds()},onPullDownRefresh:function(){this.getAllOlds(),setTimeout((function(){t.stopPullDownRefresh()}),1500)},methods:{getAllOlds:function(){var o=this,n="Bearer ".concat(this.token);this.isLogin?(t.request({url:"https://fwwb2020-proxy-slk.tgucsdn.com/elder/getAll",method:"POST",data:{uid:this.uid},header:{Authorization:n,"Content-Type":"application/json"},success:function(n){if(200==n.data.status){var e=n.data.data.elders;0==e.length?(o.oldsNum=!0,t.showToast({title:"当前暂无老人",icon:"none",mask:!0,image:"../../static/img/success.png"})):t.showToast({title:"成功获得老人！",icon:"none",mask:!0,image:"../../static/img/success.png"}),o.oldShow=!0,e.forEach((function(t,n){null!=t.photo.photo1?o.photosNum.splice(n,1,1):o.photosNum.splice(n,1,0),console.log(t),console.log(o.photosNum),o.olds.splice(n,1,t.elder),o.photos.splice(n,1,t.photo)}))}else t.showToast({title:"".concat(n.data.msg),icon:"none",mask:!0,image:"../../static/img/error.png"})},fail:function(n){o.oldsNum=!0,t.showToast({title:"获得老人失败",icon:"none",mask:!0,image:"../../static/img/error.png"}),console.log(n)}}),console.log(this.olds),console.log(this.photos)):t.showToast({title:"请先登录！",icon:"none",mask:!0,image:"../../static/img/error.png"})},deleteOld:function(o){var n=this.olds[o].eid,e="Bearer ".concat(this.token);t.showModal({title:"确定删除老人？",success:function(o){o.confirm&&t.request({url:"https://fwwb2020-proxy-slk.tgucsdn.com/elder/delete",method:"POST",data:{eid:n},header:{Authorization:e,"Content-Type":"application/json"},success:function(o){console.log(o.data),200==o.data.status?(t.showToast({title:"删除成功！",icon:"none",mask:!0,image:"../../static/img/success.png"}),setTimeout((function(){t.reLaunch({url:"./oldPeople"})}),1e3)):t.showToast({title:"".concat(o.data.msg),icon:"none",mask:!0,image:"../../static/img/error.png"})},fail:function(o){t.showToast({title:"删除失败",icon:"none",mask:!0,image:"../../static/img/error.png"}),console.log(o)}})}})},call:function(o){if(this.olds[o].status){var n=this.olds[o];n.back_card=encodeURIComponent(n.back_card),n.front_card=encodeURIComponent(n.front_card),n=JSON.stringify(n),t.navigateTo({url:"./callPolice?oldInfo="+n})}else t.showToast({title:"老人未通过审核",icon:"none",mask:!0,image:"../../static/img/error.png"})},addOld:function(){this.isLogin?t.navigateTo({url:"./AddOld"}):t.showToast({title:"请先登录！",icon:"none",mask:!0,image:"../../static/img/error.png"})},change:function(o){if(this.olds[o].status){var n=this.olds[o];this.photos[o];n.back_card=encodeURIComponent(n.back_card),n.front_card=encodeURIComponent(n.front_card),n=JSON.stringify(n),t.navigateTo({url:"./changeOldInfo?oldInfo="+n})}else t.showToast({title:"老人未通过审核",icon:"none",mask:!0,image:"../../static/img/error.png"})}}};o.default=a}).call(this,n("543d")["default"])}},[["463b","common/runtime","common/vendor"]]]);