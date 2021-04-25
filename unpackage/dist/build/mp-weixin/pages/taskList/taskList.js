(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/taskList/taskList"],{6799:function(t,n,e){"use strict";e.r(n);var a=e("db36"),o=e.n(a);for(var s in a)"default"!==s&&function(t){e.d(n,t,(function(){return a[t]}))}(s);n["default"]=o.a},"7b4c":function(t,n,e){},a811:function(t,n,e){"use strict";var a=e("7b4c"),o=e.n(a);o.a},c2e9:function(t,n,e){"use strict";e.r(n);var a=e("cf6c"),o=e("6799");for(var s in o)"default"!==s&&function(t){e.d(n,t,(function(){return o[t]}))}(s);e("a811");var u,c=e("f0c5"),i=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=i.exports},cf6c:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return a}));var o=function(){var t=this,n=t.$createElement;t._self._c},s=[]},db36:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){e.e("pages/taskList/taskItem").then(function(){return resolve(e("5fe5"))}.bind(null,e)).catch(e.oe)},o={name:"taskList",components:{taskItem:a},props:{Tasktype:{type:Number,default:0},task:{type:Array,default:function(){return[]}}},created:function(){this.taskRecognintion(),console.log(this.task)},data:function(){return{Contiune:!1,End:!1}},methods:{taskRecognintion:function(){var t=0,n=0;this.task.length>0&&(this.task.forEach((function(e,a){1==e.type?t++:n++})),console.log(t),console.log(n),this.task.length==t&&(this.End=!0),this.task.length==n&&(this.Contiune=!0))}}};n.default=o}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/taskList/taskList-create-component',
    {
        'pages/taskList/taskList-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c2e9"))
        })
    },
    [['pages/taskList/taskList-create-component']]
]);
