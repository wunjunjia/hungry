(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31603cc4"],{"521b":function(t,e,s){"use strict";var r=s("bffa"),i=s.n(r);i.a},"968c":function(t,e,s){"use strict";var r=s("d3cf"),i=s.n(r);i.a},a1d7:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:t.sizeType},t._l(t.stars,(function(t,e){return s("span",{key:e,class:t})})),0)},i=[],a=(s("c5f6"),{name:"Star",props:{size:{type:Number},score:{type:Number}},computed:{sizeType:function(){return"size-".concat(this.size)},stars:function(){for(var t=[],e=Math.floor(2*this.score)/2,s=Math.floor(e),r=0;r<s;++r)t.push("star-on");e%1!==0&&(t.push("star-half"),++s);for(var i=s;i<5;++i)t.push("star-off");return t}}}),l=a,c=(s("521b"),s("2877")),n=Object(c["a"])(l,r,i,!1,null,"6e2b2fc5",null);e["a"]=n.exports},bffa:function(t,e,s){},d3cf:function(t,e,s){},f881:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"seller-container",staticClass:"seller-container"},[s("div",{staticClass:"seller-wrapper"},[s("div",{staticClass:"card overview border-1px border-bottom-1px"},[s("p",{staticClass:"name"},[t._v(t._s(t.seller.name))]),s("div",{staticClass:"description border-bottom-1px border-1px"},[s("Star",{attrs:{size:36,score:t.seller.score}}),s("span",{staticClass:"ratingCount"},[t._v("("+t._s(t.seller.ratingCount)+")")]),s("span",[t._v("月售"+t._s(t.seller.sellCount)+"单")])],1),s("div",{staticClass:"extra"},[s("div",{staticClass:"minPrice"},[s("p",[t._v("起送价")]),s("p",[s("span",[t._v(t._s(t.seller.minPrice))]),t._v("元")])]),s("div",{staticClass:"deliveryPrice"},[s("p",[t._v("商家配送")]),s("p",[s("span",[t._v(t._s(t.seller.deliveryPrice))]),t._v("元")])]),s("div",{staticClass:"deliveryTime"},[s("p",[t._v("平均配送时间")]),s("p",[s("span",[t._v(t._s(t.seller.deliveryTime))]),t._v("分钟")])])]),s("div",{staticClass:"favorite"},[s("p",{staticClass:"icon",class:{active:t.favorite},on:{click:function(e){t.favorite=!t.favorite}}},[s("i",{staticClass:"icon-favorite"})]),s("p",{staticClass:"text"},[t._v(t._s(t.favorite?"已收藏":"收藏"))])])]),s("div",{staticClass:"card bulletin border-1px border-bottom-1px border-top-1px"},[s("h1",{staticClass:"title"},[t._v("公告与活动")]),s("p",{staticClass:"content"},[t._v(t._s(t.seller.bulletin))]),s("ul",{staticClass:"supports"},t._l(t.seller.supports,(function(e){return s("li",{key:e.description,staticClass:"support border-1px border-top-1px"},[s("support",{staticStyle:{width:"16px",height:"16px","margin-right":"6px"},attrs:{index:e.type,kind:3}}),t._v("\n          "+t._s(e.description)+"\n        ")],1)})),0)]),s("div",{staticClass:"card scene-container border-1px border-top-1px border-bottom-1px"},[s("h1",{staticClass:"title"},[t._v("商家实景")]),s("div",{ref:"scene-wrapper",staticClass:"scene-wrapper"},[s("ul",t._l(t.seller.pics,(function(t){return s("li",{key:t},[s("img",{attrs:{src:t,alt:"picture"}})])})),0)])]),s("div",{staticClass:"card info border-top-1px border-1px"},[s("h1",{staticClass:"title"},[t._v("商家信息")]),s("ul",t._l(t.seller.infos,(function(e){return s("li",{key:e,staticClass:"border-1px border-top-1px"},[t._v(t._s(e))])})),0)])])])},i=[],a=s("a1d7"),l=s("b067"),c=s("229e"),n={name:"Seller",props:{seller:{type:Object}},data:function(){return{favorite:!1}},watch:{seller:function(t){var e=this;this.$nextTick((function(){e.sellerScroll.refresh(),e.sceneScroll.refresh()}))}},components:{Star:a["a"],Support:l["default"]},mounted:function(){this.sellerScroll=new c["a"](this.$refs["seller-container"],{click:!0,bounce:{top:!1}}),this.sceneScroll=new c["a"](this.$refs["scene-wrapper"],{click:!1,scrollX:!0})},beforeDestroy:function(){this.sellerScroll.destroy()}},o=n,p=(s("968c"),s("2877")),u=Object(p["a"])(o,r,i,!1,null,"0d0341fa",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-31603cc4.26c3bbb9.js.map