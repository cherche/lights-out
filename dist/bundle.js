"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_slicedToArray=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h["return"]&&h["return"]()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a["default"]}:function(){return a};return b.d(c,"a",c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p="",b(b.s=1)})([function(a,b){"use strict";function c(a,b,c){var e=b-a+(c?1:0);return d(Math.random()*e)+a}var d=Math.floor;b.a=function(){return!!d(2*Math.random())},b.b=function(a){var b=c(0,a.length);return a[b]}},function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d=c(2),f=c(5),e=c(6),g=c(7),h=c(0),k=Object(d.a)({width:3,height:3}),i=document.body,j=Object(e.a)("tbody"),l=k.map.map2(function(a,b){var c=_slicedToArray(b,2),d=c[0],f=c[1],g=Object(e.a)("td",{children:[Object(e.a)("div",{attr:{className:"circle"}})]});return g});l.forEach(function(a){var b=Object(e.a)("tr",{children:a});j.appendChild(b)});var m=Object(e.a)("div",{attr:{className:"main flex-container"},children:[Object(e.a)("table",{attr:{id:"game"},children:[j]})]}),n=Object(e.a)("h1",{attr:{className:"win-message"}}),o=Object(e.a)("div",{attr:{className:"win flex-container"},children:[n]});i.appendChild(m),i.appendChild(o),document.addEventListener("touchmove",function(a){return a.preventDefault()});var p=function(){l.forEach2(function(a,b){var c=_slicedToArray(b,2),d=c[0],e=c[1];a.className=k.map[d][e]?"lit":""})},q={$body:Object(g.a)(i,function(){i.className="",k.randomizeMap(),p(),q.$body.active=!1,q.$tbody.active=!0}),$tbody:Object(g.a)(j,function(a){var b="TD"===a.target.tagName?a.target:a.target.parentNode,c=l.getIndices(b);if(k.press(c),p(),k.isWon()){i.className="paused",q.$tbody.active=!1,q.$body.active=!0;var d=Object(h.b)(f.a);n.className=d.type,n.textContent=d.text,a.stopPropagation()}})};q.$body.active=!1,p()},function(a,b,c){"use strict";var d=c(3),e=c(4),f=c(0);b.a=function(a){var b={options:a};return b.coordsToVal=function(a){return Object(e.a)(b.map,a)},b.getInitMap=function(){var a=b.options,c=a.width,e=a.height;b.map=Object(d.a)({fill:!1,size:[c,e]}),b.randomizeMap()},b.randomizeMap=function(){do b.map.forEach2(function(a,c){Object(f.a)()&&b.press(c)});while(b.isWon())},b.toggle=function(a){var c=_slicedToArray(a,2),d=c[0],e=c[1];b.map[d][e]=!b.map[d][e]},b.press=function(a){var c=b.options,d=c.width,f=c.height,g=Object(e.b)(d,f,a);return g.forEach(function(a){return b.toggle(a)}),g},b.isWon=function(){return b.map.every2(function(a){return!1===a})},b.getInitMap(),b}},function(a,b){"use strict";function c(a){for(var b=a.fill,d=_slicedToArray(a.size,2),e=d[0],f=d[1],g=[],h=0;h<e;h++)g.push(Array(f).fill(b));return g.forEach2=function(a){return g.forEach(function(b,c){return b.forEach(function(b,d){return a(b,[c,d])})})},g.map2=function(a){var d=c({fill:b,size:[e,f]});return g.forEach2(function(b,c){var e=_slicedToArray(c,2),f=e[0],g=e[1];d[f][g]=a(b,[f,g])}),d},g.getIndices=function(a){for(var b=0;b<e;b++)for(var c=0;c<f;c++)if(g[b][c]===a)return[b,c];return-1},g.every2=function(a){return g.every(function(b){return b.every(a)})},g}b.a=c},function(a,b){"use strict";b.b=function(a,b,c){var d=_slicedToArray(c,2),e=d[0],f=d[1];return[[e,f-1],[e-1,f],[e,f],[e+1,f],[e,f+1]].filter(function(c){var d=_slicedToArray(c,2),e=d[0],f=d[1];return 0<=f&&f<b&&0<=e&&e<a})},b.a=function(a,b){var c=_slicedToArray(b,2),d=c[0],e=c[1];return a[d][e]}},function(a,b){"use strict";b.a=[{type:"symbol",text:"<3"},{type:"word",text:"Amazing!"},{type:"word",text:"Awesome!"},{type:"word",text:"Beautiful!"},{type:"word",text:"Bingo!"},{type:"word",text:"Cool!"},{type:"word",text:"Delightful!"},{type:"word",text:"Eureka!"},{type:"word",text:"Excellent!"},{type:"word",text:"Fantastic!"},{type:"word",text:"Grand!"},{type:"word",text:"Great!"},{type:"word",text:"Incredible!"},{type:"word",text:"Lovely!"},{type:"word",text:"Magnificent!"},{type:"word",text:"Nice!"},{type:"word",text:"Spectacular!"},{type:"word",text:"Sweet!"},{type:"word",text:"Swell!"},{type:"word",text:"Terrific!"},{type:"word",text:"Tremendous!"},{type:"word",text:"Well done!"},{type:"word",text:"Whew!"},{type:"word",text:"Wonderful!"},{type:"word",text:"Woo-hoo!"},{type:"word",text:"Wow!"},{type:"word",text:"Yipee!"},{type:"phrase",text:"18 pages. Front and back!!"},{type:"phrase",text:"A more creative person would've had cooler animations."},{type:"phrase",text:"Also try: literally any other game. It's guaranteed to be better than this one."},{type:"phrase",text:"Don't stop playing. I need your love."},{type:"phrase",text:"I bet you don't even read these, do you?"},{type:"phrase",text:"I'm sorry if these messages have hurt your feelings."},{type:"phrase",text:"How long does it take you to complete a single puzzle? Disappointing."},{type:"phrase",text:"Listen to all of ABBA's songs. They're really good."},{type:"phrase",text:"My sandwich? MY SANDWICH?!?!!"},{type:"phrase",text:"Now if only I could get people to pay this much attention to me instead..."},{type:"phrase",text:"Sais-tu parler fran\xE7ais?"},{type:"phrase",text:"The music video for \"The Scientist\" by Coldplay is pretty good."},{type:"phrase",text:"These win messages are really the only reason to play."},{type:"phrase",text:"This is the most warmth I've ever felt."},{type:"phrase",text:"\"What is Love?\" is better than \"TT\"."},{type:"phrase",text:"Woah, you're a pro at button-pressing."},{type:"phrase",text:"You could be out with friends, but instead, you're here."},{type:"phrase",text:"Your happiness brings me happiness. Mostly."},{type:"phrase",text:"You're really pushing my buttons."}]},function(a,b){"use strict";b.a=function(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},c=document.createElement(a),d=b.attr,e=b.children;if("object"===("undefined"==typeof d?"undefined":_typeof(d))){var f,g=!0,h=!1;try{for(var i,j=Object.keys(d)[Symbol.iterator]();!(g=(i=j.next()).done);g=!0){var k=i.value,l=d[k];c[k]=l}}catch(a){h=!0,f=a}finally{try{!g&&j.return&&j.return()}finally{if(h)throw f}}}return Array.isArray(e)&&e.forEach(function(a){return c.appendChild(a)}),c}},function(a,b){"use strict";b.a=function(a,b){var c={el:a,active:!0},d=function(a){c.active&&b(a)};return a.addEventListener("click",d),a.addEventListener("touchstart",function(a){a.preventDefault(),d(a)}),c}}]);