/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default=Elem;function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}function Elem(name,attr){var el=document.createElement(name);if(_typeof(attr)==="object"){var _arr=Object.keys(attr);for(var _i=0;_i<_arr.length;_i++){var key=_arr[_i];var val=attr[key];el[key]=val}}return el}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.getRandomInt=getRandomInt;exports.getRandomVal=getRandomVal;function getRandomInt(min,max,inclusive){var range=max-min+(inclusive?1:0);var offset=min;return Math.floor(Math.random()*range)+offset}function getRandomVal(arr){var index=getRandomInt(0,arr.length);return arr[index]}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _element=_interopRequireDefault(__webpack_require__(0));var _fastclick=_interopRequireDefault(__webpack_require__(3));var _controller=__webpack_require__(4);var _probability=__webpack_require__(1);var _messagesProcessed=_interopRequireDefault(__webpack_require__(8));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var $winContainer=(0,_element.default)("div",{className:"win-container flex-container"});var $winMessage=(0,_element.default)("h1",{className:"win-message"});$winContainer.appendChild($winMessage);document.addEventListener("DOMContentLoaded",function(){var $body=document.body;var $gameContainer=(0,_element.default)("div",{className:"game-container flex-container"});var tableCells=(0,_controller.getTableCells)({onPause:function onPause(){$body.classList.add("paused");var winMessage=(0,_probability.getRandomVal)(_messagesProcessed.default);$winMessage.textContent=winMessage.text;$winMessage.id=winMessage.type},onPlay:function onPlay(){$body.classList.remove("paused")}});var $table=(0,_controller.getTable)(tableCells);$gameContainer.appendChild($table);$body.appendChild($gameContainer);$body.appendChild($winContainer);_fastclick.default.attach($body);document.addEventListener("touchmove",function(e){return e.preventDefault()})});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;function FastClick(layer,options){var oldOnClick;options=options||{};this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=options.touchBoundary||10;this.layer=layer;this.tapDelay=options.tapDelay||200;this.tapTimeout=options.tapTimeout||700;if(FastClick.notNeeded(layer)){return}function bind(method,context){return function(){return method.apply(context,arguments)}}var methods=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"];var context=this;for(var i=0,l=methods.length;i<l;i++){context[methods[i]]=bind(context[methods[i]],context)}if(deviceIsAndroid){layer.addEventListener("mouseover",this.onMouse,true);layer.addEventListener("mousedown",this.onMouse,true);layer.addEventListener("mouseup",this.onMouse,true)}layer.addEventListener("click",this.onClick,true);layer.addEventListener("touchstart",this.onTouchStart,false);layer.addEventListener("touchmove",this.onTouchMove,false);layer.addEventListener("touchend",this.onTouchEnd,false);layer.addEventListener("touchcancel",this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){layer.removeEventListener=function(type,callback,capture){var rmv=Node.prototype.removeEventListener;if(type==="click"){rmv.call(layer,type,callback.hijacked||callback,capture)}else{rmv.call(layer,type,callback,capture)}};layer.addEventListener=function(type,callback,capture){var adv=Node.prototype.addEventListener;if(type==="click"){adv.call(layer,type,callback.hijacked||(callback.hijacked=function(event){if(!event.propagationStopped){callback(event)}}),capture)}else{adv.call(layer,type,callback,capture)}}}if(typeof layer.onclick==="function"){oldOnClick=layer.onclick;layer.addEventListener("click",function(event){oldOnClick(event)},false);layer.onclick=null}}var deviceIsWindowsPhone=navigator.userAgent.indexOf("Windows Phone")>=0;var deviceIsAndroid=navigator.userAgent.indexOf("Android")>0&&!deviceIsWindowsPhone;var deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent)&&!deviceIsWindowsPhone;var deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent);var deviceIsIOSWithBadTarget=deviceIsIOS&&/OS [6-7]_\d/.test(navigator.userAgent);var deviceIsBlackBerry10=navigator.userAgent.indexOf("BB10")>0;FastClick.prototype.needsClick=function(target){switch(target.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(target.disabled){return true}break;case"input":if(deviceIsIOS&&target.type==="file"||target.disabled){return true}break;case"label":case"iframe":case"video":return true;}return /\bneedsclick\b/.test(target.className)};FastClick.prototype.needsFocus=function(target){switch(target.nodeName.toLowerCase()){case"textarea":return true;case"select":return!deviceIsAndroid;case"input":switch(target.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return false;}return!target.disabled&&!target.readOnly;default:return /\bneedsfocus\b/.test(target.className);}};FastClick.prototype.sendClick=function(targetElement,event){var clickEvent,touch;if(document.activeElement&&document.activeElement!==targetElement){document.activeElement.blur()}touch=event.changedTouches[0];clickEvent=document.createEvent("MouseEvents");clickEvent.initMouseEvent(this.determineEventType(targetElement),true,true,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,false,false,false,false,0,null);clickEvent.forwardedTouchEvent=true;targetElement.dispatchEvent(clickEvent)};FastClick.prototype.determineEventType=function(targetElement){if(deviceIsAndroid&&targetElement.tagName.toLowerCase()==="select"){return"mousedown"}return"click"};FastClick.prototype.focus=function(targetElement){var length;if(deviceIsIOS&&targetElement.setSelectionRange&&targetElement.type.indexOf("date")!==0&&targetElement.type!=="time"&&targetElement.type!=="month"&&targetElement.type!=="email"){length=targetElement.value.length;targetElement.setSelectionRange(length,length)}else{targetElement.focus()}};FastClick.prototype.updateScrollParent=function(targetElement){var scrollParent,parentElement;scrollParent=targetElement.fastClickScrollParent;if(!scrollParent||!scrollParent.contains(targetElement)){parentElement=targetElement;do{if(parentElement.scrollHeight>parentElement.offsetHeight){scrollParent=parentElement;targetElement.fastClickScrollParent=parentElement;break}parentElement=parentElement.parentElement}while(parentElement)}if(scrollParent){scrollParent.fastClickLastScrollTop=scrollParent.scrollTop}};FastClick.prototype.getTargetElementFromEventTarget=function(eventTarget){if(eventTarget.nodeType===Node.TEXT_NODE){return eventTarget.parentNode}return eventTarget};FastClick.prototype.onTouchStart=function(event){var targetElement,touch,selection;if(event.targetTouches.length>1){return true}targetElement=this.getTargetElementFromEventTarget(event.target);touch=event.targetTouches[0];if(deviceIsIOS){selection=window.getSelection();if(selection.rangeCount&&!selection.isCollapsed){return true}if(!deviceIsIOS4){if(touch.identifier&&touch.identifier===this.lastTouchIdentifier){event.preventDefault();return false}this.lastTouchIdentifier=touch.identifier;this.updateScrollParent(targetElement)}}this.trackingClick=true;this.trackingClickStart=event.timeStamp;this.targetElement=targetElement;this.touchStartX=touch.pageX;this.touchStartY=touch.pageY;if(event.timeStamp-this.lastClickTime<this.tapDelay){event.preventDefault()}return true};FastClick.prototype.touchHasMoved=function(event){var touch=event.changedTouches[0],boundary=this.touchBoundary;if(Math.abs(touch.pageX-this.touchStartX)>boundary||Math.abs(touch.pageY-this.touchStartY)>boundary){return true}return false};FastClick.prototype.onTouchMove=function(event){if(!this.trackingClick){return true}if(this.targetElement!==this.getTargetElementFromEventTarget(event.target)||this.touchHasMoved(event)){this.trackingClick=false;this.targetElement=null}return true};FastClick.prototype.findControl=function(labelElement){if(labelElement.control!==undefined){return labelElement.control}if(labelElement.htmlFor){return document.getElementById(labelElement.htmlFor)}return labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};FastClick.prototype.onTouchEnd=function(event){var forElement,trackingClickStart,targetTagName,scrollParent,touch,targetElement=this.targetElement;if(!this.trackingClick){return true}if(event.timeStamp-this.lastClickTime<this.tapDelay){this.cancelNextClick=true;return true}if(event.timeStamp-this.trackingClickStart>this.tapTimeout){return true}this.cancelNextClick=false;this.lastClickTime=event.timeStamp;trackingClickStart=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(deviceIsIOSWithBadTarget){touch=event.changedTouches[0];targetElement=document.elementFromPoint(touch.pageX-window.pageXOffset,touch.pageY-window.pageYOffset)||targetElement;targetElement.fastClickScrollParent=this.targetElement.fastClickScrollParent}targetTagName=targetElement.tagName.toLowerCase();if(targetTagName==="label"){forElement=this.findControl(targetElement);if(forElement){this.focus(targetElement);if(deviceIsAndroid){return false}targetElement=forElement}}else if(this.needsFocus(targetElement)){if(event.timeStamp-trackingClickStart>100||deviceIsIOS&&window.top!==window&&targetTagName==="input"){this.targetElement=null;return false}this.focus(targetElement);this.sendClick(targetElement,event);if(!deviceIsIOS||targetTagName!=="select"){this.targetElement=null;event.preventDefault()}return false}if(deviceIsIOS&&!deviceIsIOS4){scrollParent=targetElement.fastClickScrollParent;if(scrollParent&&scrollParent.fastClickLastScrollTop!==scrollParent.scrollTop){return true}}if(!this.needsClick(targetElement)){event.preventDefault();this.sendClick(targetElement,event)}return false};FastClick.prototype.onTouchCancel=function(){this.trackingClick=false;this.targetElement=null};FastClick.prototype.onMouse=function(event){if(!this.targetElement){return true}if(event.forwardedTouchEvent){return true}if(!event.cancelable){return true}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(event.stopImmediatePropagation){event.stopImmediatePropagation()}else{event.propagationStopped=true}event.stopPropagation();event.preventDefault();return false}return true};FastClick.prototype.onClick=function(event){var permitted;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}if(event.target.type==="submit"&&event.detail===0){return true}permitted=this.onMouse(event);if(!permitted){this.targetElement=null}return permitted};FastClick.prototype.destroy=function(){var layer=this.layer;if(deviceIsAndroid){layer.removeEventListener("mouseover",this.onMouse,true);layer.removeEventListener("mousedown",this.onMouse,true);layer.removeEventListener("mouseup",this.onMouse,true)}layer.removeEventListener("click",this.onClick,true);layer.removeEventListener("touchstart",this.onTouchStart,false);layer.removeEventListener("touchmove",this.onTouchMove,false);layer.removeEventListener("touchend",this.onTouchEnd,false);layer.removeEventListener("touchcancel",this.onTouchCancel,false)};FastClick.notNeeded=function(layer){var metaViewport;var chromeVersion;var blackberryVersion;var firefoxVersion;if(typeof window.ontouchstart==="undefined"){return true}chromeVersion=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(chromeVersion){if(deviceIsAndroid){metaViewport=document.querySelector("meta[name=viewport]");if(metaViewport){if(metaViewport.content.indexOf("user-scalable=no")!==-1){return true}if(chromeVersion>31&&document.documentElement.scrollWidth<=window.outerWidth){return true}}}else{return true}}if(deviceIsBlackBerry10){blackberryVersion=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);if(blackberryVersion[1]>=10&&blackberryVersion[2]>=3){metaViewport=document.querySelector("meta[name=viewport]");if(metaViewport){if(metaViewport.content.indexOf("user-scalable=no")!==-1){return true}if(document.documentElement.scrollWidth<=window.outerWidth){return true}}}}if(layer.style.msTouchAction==="none"||layer.style.touchAction==="manipulation"){return true}firefoxVersion=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(firefoxVersion>=27){metaViewport=document.querySelector("meta[name=viewport]");if(metaViewport&&(metaViewport.content.indexOf("user-scalable=no")!==-1||document.documentElement.scrollWidth<=window.outerWidth)){return true}}if(layer.style.touchAction==="none"||layer.style.touchAction==="manipulation"){return true}return false};FastClick.attach=function(layer,options){return new FastClick(layer,options)};var _default=FastClick;exports.default=_default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.getTableCells=getTableCells;exports.getTable=getTable;var _game=_interopRequireDefault(__webpack_require__(5));var _element=_interopRequireDefault(__webpack_require__(0));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}_game.default.getUnsolvedMap([true,false]);var Controller={isPaused:false,pause:function pause(fn){if(fn)fn();Controller.isPaused=true},play:function play(fn){if(fn)fn();Controller.isPaused=false}};function refreshTable(tableCells){tableCells.forEach(function(row,x){return row.forEach(function(cell,y){cell.className=_game.default.map[x][y]})})}function getTableCells(_ref){var onPause=_ref.onPause,onPlay=_ref.onPlay;var tableCells=_game.default.map.map(function(row,x){return row.map(function(cell,y){var $td=(0,_element.default)("td",{className:_game.default.map[x][y]});$td.addEventListener("click",function(){if(Controller.isPaused)return;_game.default.press([x,y]);refreshTable(tableCells);if(!_game.default.isWon())return;Controller.pause(onPause);setTimeout(function(){return window.addEventListener("click",function startGame(e){e.preventDefault();_game.default.getUnsolvedMap();Controller.play(onPlay);this.removeEventListener("click",startGame);refreshTable(tableCells)})},0)});var $circle=(0,_element.default)("div",{className:"circle"});$td.appendChild($circle);return $td})});return tableCells}function getTable(tableCells){var $table=(0,_element.default)("table");tableCells.forEach(function(row,x){var $tr=(0,_element.default)("tr");$table.appendChild($tr);row.forEach(function($td,y){return $tr.appendChild($td)})});return $table}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _arrayHelpers=__webpack_require__(6);var _grid=__webpack_require__(7);var _probability=__webpack_require__(1);function _sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _slicedToArray(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return _sliceIterator(arr,i)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}var Game={};Game.coordsToVal=function(coords){return(0,_grid.coordsToVal)(Game.map,coords)};Game.options={width:3,height:3};Game.getMap=function(){var _Game$options=Game.options,width=_Game$options.width,height=_Game$options.height;var map=[];var vals=[true,false];for(var i=0;i<width*height;i++){map.push((0,_probability.getRandomVal)(vals))}Game.map=(0,_arrayHelpers.splitInto2dArray)(map,height)};Game.getUnsolvedMap=function(){do{Game.getMap()}while(Game.isWon())};Game.toggle=function(_ref){var _ref2=_slicedToArray(_ref,2),x=_ref2[0],y=_ref2[1];Game.map[x][y]=!Game.map[x][y]};Game.press=function(coords){var _Game$options2=Game.options,width=_Game$options2.width,height=_Game$options2.height;var queue=(0,_grid.getDirectAdjacents)(width,height,coords);queue.forEach(function(coords){return Game.toggle(coords)});return queue};Game.isWon=function(){var _Game$options3=Game.options,width=_Game$options3.width,height=_Game$options3.height;for(var x=0;x<width;x++){for(var y=0;y<height;y++){var cell=Game.map[x][y];if(cell)return false}}return true};var _default=Game;exports.default=_default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.splitInto2dArray=splitInto2dArray;function splitInto2dArray(arr,len){var copy=arr.slice();var output=[];while(copy.length>0){output.push(copy.splice(0,len))}return output}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.getAdjacents=getAdjacents;exports.getDirectAdjacents=getDirectAdjacents;exports.coordsToVal=coordsToVal;function _sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _slicedToArray(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return _sliceIterator(arr,i)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}function getAdjacents(width,height,_ref){var _ref2=_slicedToArray(_ref,2),x1=_ref2[0],y1=_ref2[1];var adjacents=[];var ranges={x:[x1-1,x1+1],y:[y1-1,y1+1]};for(var y2=ranges.y[0];y2<=ranges.y[1];y2++){if(y2<0||y2>=height)continue;for(var x2=ranges.x[0];x2<=ranges.x[1];x2++){if(x2<0||x2>=width)continue;adjacents.push([x2,y2])}}return adjacents}function getDirectAdjacents(width,height,_ref3){var _ref4=_slicedToArray(_ref3,2),x=_ref4[0],y=_ref4[1];var adjacents=[[x,y-1],[x-1,y],[x,y],[x+1,y],[x,y+1]];return adjacents.filter(function(_ref5){var _ref6=_slicedToArray(_ref5,2),x=_ref6[0],y=_ref6[1];return y>=0&&y<height&&x>=0&&x<width})}function coordsToVal(map,_ref7){var _ref8=_slicedToArray(_ref7,2),x=_ref8[0],y=_ref8[1];return map[x][y]}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var winMessages=[{type:"symbol",text:"<3"},{type:"word",text:"Amazing!"},{type:"word",text:"Awesome!"},{type:"word",text:"Beautiful!"},{type:"word",text:"Bingo!"},{type:"word",text:"Cool!"},{type:"word",text:"Delightful!"},{type:"word",text:"Eureka!"},{type:"word",text:"Excellent!"},{type:"word",text:"Fantastic!"},{type:"word",text:"Grand!"},{type:"word",text:"Great!"},{type:"word",text:"Incredible!"},{type:"word",text:"Lovely!"},{type:"word",text:"Magnificent!"},{type:"word",text:"Nice!"},{type:"word",text:"Spectacular!"},{type:"word",text:"Sweet!"},{type:"word",text:"Swell!"},{type:"word",text:"Terrific!"},{type:"word",text:"Tremendous!"},{type:"word",text:"Well done!"},{type:"word",text:"Whew!"},{type:"word",text:"Wonderful!"},{type:"word",text:"Woo-hoo!"},{type:"word",text:"Wow!"},{type:"word",text:"Yipee!"},{type:"phrase",text:"18 pages. Front and back!!"},{type:"phrase",text:"A more creative person would've had cooler animations."},{type:"phrase",text:"Also try: literally any other game. It's guaranteed to be better than this one."},{type:"phrase",text:"Do you hear that? It's the sound of your sadness after realizing that you spent hours playing this."},{type:"phrase",text:"Don't stop playing. I need your love."},{type:"phrase",text:"I bet you don't even read these, do you?"},{type:"phrase",text:"I could've use this message as free advertising space..."},{type:"phrase",text:"I'm sorry if these messages have hurt your feelings."},{type:"phrase",text:"How long does it take you to complete a single puzzle? Disappointing."},{type:"phrase",text:"Listen to all of ABBA's songs. They're really good."},{type:"phrase",text:"My sandwich? MY SANDWICH?!?!"},{type:"phrase",text:"Now if only I could get people to pay this much attention to me instead..."},{type:"phrase",text:"Sais-tu parler fran\xE7ais?"},{type:"phrase",text:"Somebody once told me the world is gonna roll me."},{type:"phrase",text:"The music video for \"The Scientist\" by Coldplay is pretty good."},{type:"phrase",text:"These win messages are really the only reason to play."},{type:"phrase",text:"This game is the reason that I don't have a girlfriend."},{type:"phrase",text:"This is the most warmth I've ever felt."},{type:"phrase",text:"What is love? Baby don't hurt me."},{type:"phrase",text:"Woah, you're a pro at button-pressing."},{type:"phrase",text:"You could be out with friends, but instead, you're with me. Nice."},{type:"phrase",text:"Your happiness brings me happiness. Mostly."},{type:"phrase",text:"You're really pushing my buttons."}];var _default=winMessages;exports.default=_default;

/***/ })
/******/ ]);