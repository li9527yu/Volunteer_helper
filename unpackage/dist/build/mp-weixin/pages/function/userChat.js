(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/function/userChat"],{1188:function(t,e,n){"use strict";(function(t){n("d241");o(n("66fd"));var e=o(n("488c"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},3090:function(t,e,n){"use strict";n.r(e);var o=n("dd10"),c=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=c.a},"3cd4":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return o}));var c=function(){var t=this,e=t.$createElement;t._self._c},s=[]},"488c":function(t,e,n){"use strict";n.r(e);var o=n("3cd4"),c=n("3090");for(var s in c)"default"!==s&&function(t){n.d(e,t,(function(){return c[t]}))}(s);n("4de3");var i,r=n("f0c5"),a=Object(r["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);e["default"]=a.exports},"4de3":function(t,e,n){"use strict";var o=n("be06"),c=n.n(o);c.a},be06:function(t,e,n){},dd10:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("2f62");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r={data:function(){return{talkList:[],taskID:"",chatContent:"",socketTask:null,is_open_socket:!1,timer:null}},computed:s({},(0,o.mapState)(["token","uid","tel","pw","vid","picture","name"])),onLoad:function(t){console.log(t.taskID),this.taskID=t.taskID,this.connectSocketInit()},beforeDestroy:function(){this.closeSocket()},destroyed:function(){this.closeSocket()},onShow:function(){this.connectSocketInit()},onHide:function(){this.closeSocket()},methods:{sendMessage:function(){var e=this;if(this.chatContent){if(this.is_open_socket){var n=this,o=new Date;console.log(o),console.log(n.name);var c={vid:n.vid,tid:n.taskID,picture:n.picture,time:o,name:n.name,message:n.chatContent};console.log(c),c=JSON.stringify(c),this.socketTask.send({data:c}),t.showLoading({title:"正在发送"}),setTimeout((function(){t.hideLoading(),e.$nextTick((function(){e.chatContent="",t.pageScrollTo({scrollTop:999999,duration:0})}))}),1500)}}else t.showToast({title:"请输入有效的内容",icon:"none"})},connectSocketInit:function(){var e=this,n=this;this.socketTask=t.connectSocket({url:"wss://fwwb2020-proxy-slk.tgucsdn.com/websocket/message/"+n.taskID,success:function(t){console.log("websocket连接成功")}}),this.socketTask.onOpen((function(t){console.log("WebSocket连接正常打开中...！"),n.is_open_socket=!0,e.socketTask.onMessage((function(t){var e=JSON.parse(t.data);console.log(e),e.forEach((function(t,e){var o={};t.vid==n.vid?o.type=1:o.type=0,o.time=t.time,o.name=t.name,o.pic=t.picture,o.content=t.message,o.vid=t.vid,console.log(o),n.talkList.splice(e,1,o)})),console.log(n.talkList)}))})),this.socketTask.onClose((function(){console.log("已经被关闭了")}))},closeSocket:function(){var t=this;this.socketTask.close({success:function(e){t.is_open_socket=!1,console.log("关闭成功",e)},fail:function(t){console.log("关闭失败",t)}})}}};e.default=r}).call(this,n("543d")["default"])}},[["1188","common/runtime","common/vendor"]]]);