(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{1737:function(n,t,o){"use strict";var e=o("76af"),i=o.n(e);i.a},3446:function(n,t,o){"use strict";(function(n){o("d241");e(o("66fd"));var t=e(o("a2ad"));function e(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,o("543d")["createPage"])},3848:function(n,t,o){"use strict";o.r(t);var e=o("4d22"),i=o.n(e);for(var s in e)"default"!==s&&function(n){o.d(t,n,(function(){return e[n]}))}(s);t["default"]=i.a},"4d22":function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=i(o("60ba"));o("2f62");function i(n){return n&&n.__esModule?n:{default:n}}var s={data:function(){return{phone:"",password:"",code:"",loginType:0,loginTypeList:["密码登录","免密登录"],loading:!1,codeDuration:0,codeInterVal:null,clickable:!1}},methods:{registerTo:function(){console.log("register"),n.navigateTo({url:"../register/register"})},sendCode:function(){var t=this,o=this;console.log(this.phone),this.codeDuration&&n.showToast({title:"请在".concat(this.codeDuration,"秒后重试"),icon:"none",mask:!0,image:"../../static/img/error.png"}),/^1\d{10}$/.test(this.phone)?n.request({url:"https://fwwb2020-proxy-slk.tgucsdn.com/user/getMsgCode",data:{tel:o.phone},header:{"content-type":"application/json"},method:"POST",success:function(o){console.log(o),201==o.data.status?(n.showToast({title:"发送成功！",icon:"none",mask:!0,image:"../../static/img/success.png"}),t.codeDuration=60,t.codeInterVal=setInterval((function(){t.clickable=!0,t.codeDuration--,0===t.codeDuration&&(t.clickable=!1,t.codeInterVal&&(clearInterval(t.codeInterVal),t.codeInterVal=null))}),1e3)):n.showToast({title:"发送失败！",icon:"none",mask:!0,image:"../../static/img/error.png"})},fail:function(t){console.log(t),n.showToast({title:"发送失败"})}}):n.showToast({title:"手机号填写错误",icon:"none",mask:!0,image:"../../static/img/error.png"})},loginBySms:function(){var t=this;/^1\d{10}$/.test(this.phone)?/^\d{6}$/.test(this.code)?(t.loading=!0,setTimeout((function(n){t.loading=!1}),1500),n.request({url:"https://fwwb2020-proxy-slk.tgucsdn.com/user/loginByMessage",data:{tel:t.phone,code:t.code},method:"POST",header:{"content-type":"application/json"},success:function(t){console.log(t.data),200==t.data.status?(n.showToast({title:"登录成功",icon:"none",mask:!0,image:"../../static/img/success.png"}),e.default.commit("login",t.data.data),setTimeout((function(){n.switchTab({url:"../person/person"})}),1e3)):500==t.data.status?n.showToast({title:"服务器错误",icon:"none",mask:!0,image:"../../static/img/error.png"}):n.showToast({title:"".concat(t.data.msg),icon:"none",mask:!0,image:"../../static/img/error.png"})},fail:function(t){console.log(),n.showToast({title:"登录失败！",icon:"none",mask:!0,image:"../../static/img/error.png"})}})):n.showToast({title:"验证码为6位数",icon:"none",mask:!0,image:"../../static/img/error.png"}):n.showToast({title:"手机号填写错误",icon:"none",mask:!0,image:"../../static/img/error.png"})},bindLogin:function(){switch(this.loginType){case 0:this.defaultHandlerLogin();break;case 1:this.loginBySms();break;default:break}},defaultHandlerLogin:function(){var t=this;console.log(this.phone),console.log(this.password),/^1\d{10}$/.test(this.phone)?this.password.length<6?n.showToast({title:"密码最短为 6 个字符",icon:"none",mask:!0,image:"../../static/img/error.png"}):(t.loading=!0,setTimeout((function(n){t.loading=!1}),1500),n.request({url:"https://fwwb2020-proxy-slk.tgucsdn.com/user/loginByPassword",method:"POST",header:{"Content-Type":"application/json"},data:{tel:t.phone,password:t.password},success:function(t){console.log(t.data),200===t.data.status?(n.showToast({title:"登录成功!",icon:"none",mask:!0,image:"../../static/img/success.png"}),e.default.commit("login",t.data.data),console.log(t.data.data),setTimeout((function(){n.switchTab({url:"../person/person"})}),1e3)):500==t.data.status?n.showToast({title:"服务器错误",icon:"none",mask:!0,image:"../../static/img/error.png"}):n.showToast({title:"".concat(t.data.msg),icon:"none",mask:!0,image:"../../static/img/error.png"})},fail:function(t){n.showToast({title:"登录错误",icon:"none",mask:!0,image:"../../static/img/error.png"})}})):n.showToast({title:"手机号填写错误",icon:"none",mask:!0,image:"../../static/img/error.png"})}}};t.default=s}).call(this,o("543d")["default"])},5103:function(n,t,o){"use strict";o.d(t,"b",(function(){return i})),o.d(t,"c",(function(){return s})),o.d(t,"a",(function(){return e}));var e={uniForms:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(o.bind(null,"35fd"))},uniFormsItem:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item")]).then(o.bind(null,"41e4"))},uniEasyinput:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput")]).then(o.bind(null,"3c21"))},uniRow:function(){return o.e("uni_modules/uni-row/components/uni-row/uni-row").then(o.bind(null,"8719"))},uniCol:function(){return o.e("uni_modules/uni-row/components/uni-col/uni-col").then(o.bind(null,"cc0e"))}},i=function(){var n=this,t=n.$createElement;n._self._c;n._isMounted||(n.e0=function(t,o){var e=arguments[arguments.length-1].currentTarget.dataset,i=e.eventParams||e["event-params"];o=i.index;n.loginType=o})},s=[]},"76af":function(n,t,o){},a2ad:function(n,t,o){"use strict";o.r(t);var e=o("5103"),i=o("3848");for(var s in i)"default"!==s&&function(n){o.d(t,n,(function(){return i[n]}))}(s);o("1737");var a,c=o("f0c5"),r=Object(c["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],a);t["default"]=r.exports}},[["3446","common/runtime","common/vendor"]]]);