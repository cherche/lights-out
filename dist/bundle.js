"use strict";var _slicedToArray=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h["return"]&&h["return"]()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};function _toConsumableArray(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a["default"]}:function(){return a};return b.d(c,"a",c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p="",b(b.s=2)})([function(a,b){"use strict";b.a=function(a,b){var c=document.createElement(a);if("object"===("undefined"==typeof b?"undefined":_typeof(b))){var d,e=!0,f=!1;try{for(var g,h=Object.keys(b)[Symbol.iterator]();!(e=(g=h.next()).done);e=!0){var i=g.value,j=b[i];c[i]=j}}catch(a){f=!0,d=a}finally{try{!e&&h.return&&h.return()}finally{if(f)throw d}}}return c}},function(a,b){"use strict";function c(a,b,c){var d=b-a+(c?1:0);return Math.floor(Math.random()*d)+a}b.a=function(a){var b=c(0,a.length);return a[b]}},function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d=c(0),e=c(3),f=c(1),g=c(8),h=Object(d.a)("div",{className:"win-container flex-container"}),i=Object(d.a)("h1",{className:"win-message"});h.appendChild(i),document.addEventListener("DOMContentLoaded",function(){var a=document.body,b=Object(d.a)("div",{className:"game-container flex-container"}),c=Object(e.b)({onPause:function(){a.classList.add("paused");var b=Object(f.a)(g.a);i.textContent=b.text,i.id=b.type},onPlay:function(){a.classList.remove("paused")}}),j=Object(e.a)(c);b.appendChild(j),a.appendChild(b),a.appendChild(h),document.addEventListener("touchmove",function(a){return a.preventDefault()})})},function(a,b,c){"use strict";function d(a){a.forEach(function(a,b){return a.forEach(function(a,c){a.className=f.a.map[b][c]})})}b.b=function(a){var b=a.onPause,c=a.onPlay,i=f.a.map.map(function(a,j){return a.map(function(a,k){var l=Object(e.a)("td",{className:f.a.map[j][k]}),m=Object(g.a)(l,function(a){if(!h.isPaused&&(a.stopPropagation(),f.a.press([j,k]),d(i),!!f.a.isWon())){h.pause(b);var l=Object(g.a)(window,function(a){a.stopPropagation(),f.a.getUnsolvedMap(),h.play(c),l.unbind(),d(i)});l.bind()}});m.bind();var n=Object(e.a)("div",{className:"circle"});return l.appendChild(n),l})});return i},b.a=function(a){var b=Object(e.a)("table");return a.forEach(function(a){var c=Object(e.a)("tr");b.appendChild(c),a.forEach(function(a){return c.appendChild(a)})}),b};var f=c(4),e=c(0),g=c(7);f.a.getUnsolvedMap([!0,!1]);var h={isPaused:!1,pause:function(a){a&&a(),h.isPaused=!0},play:function(a){a&&a(),h.isPaused=!1}}},function(a,b,c){"use strict";var d=c(5),e=c(6),f=c(1),g={};g.coordsToVal=function(a){return Object(e.a)(g.map,a)},g.options={width:3,height:3},g.getMap=function(){for(var a=g.options,b=a.width,c=a.height,e=[],h=[!0,!1],j=0;j<b*c;j++)e.push(Object(f.a)(h));g.map=Object(d.a)(e,c)},g.getUnsolvedMap=function(){do g.getMap();while(g.isWon())},g.toggle=function(a){var b=_slicedToArray(a,2),c=b[0],d=b[1];g.map[c][d]=!g.map[c][d]},g.press=function(a){var b=g.options,c=b.width,d=b.height,f=Object(e.b)(c,d,a);return f.forEach(function(a){return g.toggle(a)}),f},g.isWon=function(){for(var a=g.options,b=a.width,c=a.height,d=0;d<b;d++)for(var e,f=0;f<c;f++)if(e=g.map[d][f],e)return!1;return!0},b.a=g},function(a,b){"use strict";b.a=function(a,b){for(var c=[].concat(_toConsumableArray(a)),d=[];0<c.length;)d.push(c.splice(0,b));return d}},function(a,b){"use strict";b.b=function(a,b,c){var d=_slicedToArray(c,2),e=d[0],f=d[1];return[[e,f-1],[e-1,f],[e,f],[e+1,f],[e,f+1]].filter(function(c){var d=_slicedToArray(c,2),e=d[0],f=d[1];return 0<=f&&f<b&&0<=e&&e<a})},b.a=function(a,b){var c=_slicedToArray(b,2),d=c[0],e=c[1];return a[d][e]}},function(a,b){"use strict";b.a=function(a,b){var c=function(a){a.stopPropagation(),a.preventDefault(),b(a)};return{el:a,bind:function(){a.addEventListener("click",b),a.addEventListener("touchstart",c)},unbind:function(){a.removeEventListener("click",b),a.removeEventListener("touchstart",c)}}}},function(a,b){"use strict";b.a=[{type:"symbol",text:"<3"},{type:"word",text:"Amazing!"},{type:"word",text:"Awesome!"},{type:"word",text:"Beautiful!"},{type:"word",text:"Bingo!"},{type:"word",text:"Cool!"},{type:"word",text:"Delightful!"},{type:"word",text:"Eureka!"},{type:"word",text:"Excellent!"},{type:"word",text:"Fantastic!"},{type:"word",text:"Grand!"},{type:"word",text:"Great!"},{type:"word",text:"Incredible!"},{type:"word",text:"Lovely!"},{type:"word",text:"Magnificent!"},{type:"word",text:"Nice!"},{type:"word",text:"Spectacular!"},{type:"word",text:"Sweet!"},{type:"word",text:"Swell!"},{type:"word",text:"Terrific!"},{type:"word",text:"Tremendous!"},{type:"word",text:"Well done!"},{type:"word",text:"Whew!"},{type:"word",text:"Wonderful!"},{type:"word",text:"Woo-hoo!"},{type:"word",text:"Wow!"},{type:"word",text:"Yipee!"},{type:"phrase",text:"18 pages. Front and back!!"},{type:"phrase",text:"A more creative person would've had cooler animations."},{type:"phrase",text:"Also try: literally any other game. It's guaranteed to be better than this one."},{type:"phrase",text:"Do you hear that? It's the sound of your sadness after realizing that you spent hours playing this."},{type:"phrase",text:"Don't stop playing. I need your love."},{type:"phrase",text:"I bet you don't even read these, do you?"},{type:"phrase",text:"I could've used this message as free advertising space..."},{type:"phrase",text:"I'm sorry if these messages have hurt your feelings."},{type:"phrase",text:"How long does it take you to complete a single puzzle? Disappointing."},{type:"phrase",text:"Listen to all of ABBA's songs. They're really good."},{type:"phrase",text:"My sandwich? MY SANDWICH?!?!"},{type:"phrase",text:"Now if only I could get people to pay this much attention to me instead..."},{type:"phrase",text:"Sais-tu parler fran\xE7ais?"},{type:"phrase",text:"Somebody once told me the world is gonna roll me."},{type:"phrase",text:"The music video for 'The Scientist' by Coldplay is pretty good."},{type:"phrase",text:"These win messages are really the only reason to play."},{type:"phrase",text:"This game is the reason that I don't have a girlfriend."},{type:"phrase",text:"This is the most warmth I've ever felt."},{type:"phrase",text:"What is love? Baby don't hurt me."},{type:"phrase",text:"Woah, you're a pro at button-pressing."},{type:"phrase",text:"You could be out with friends, but instead, you're with me. Nice."},{type:"phrase",text:"Your happiness brings me happiness. Mostly."},{type:"phrase",text:"You're really pushing my buttons."}]}]);