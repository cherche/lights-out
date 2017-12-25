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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default=Elem;function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}function Elem(name,attr){var el=document.createElement(name);if(_typeof(attr)==="object"){var _arr=Object.keys(attr);for(var _i=0;_i<_arr.length;_i++){var key=_arr[_i];var val=attr[key];el[key]=val}}return el}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.getRandomInt=getRandomInt;exports.getRandomVal=getRandomVal;function getRandomInt(min,max,inclusive){var range=max-min+(inclusive?1:0);var offset=min;return Math.floor(Math.random()*range)+offset}function getRandomVal(arr){var index=getRandomInt(0,arr.length);return arr[index]}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _element=_interopRequireDefault(__webpack_require__(2));var _controller=__webpack_require__(5);var _probability=__webpack_require__(3);var _winMessages=_interopRequireDefault(__webpack_require__(10));__webpack_require__(11);__webpack_require__(14);__webpack_require__(16);__webpack_require__(18);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}document.addEventListener("DOMContentLoaded",function(){var $body=document.body;var $gameContainer=(0,_element.default)("div",{className:"game-container flex-container"});$body.appendChild($gameContainer);var tableCells=(0,_controller.getTableCellsArray)({onPause:function onPause(){$body.classList.add("paused");var winMessage=(0,_probability.getRandomVal)(_winMessages.default);$winMessage.textContent=winMessage.text;$winMessage.id=winMessage.type},onPlay:function onPlay(){$body.classList.remove("paused")}});var $table=(0,_controller.getTable)(tableCells);$gameContainer.appendChild($table);var $winContainer=(0,_element.default)("div",{className:"win-container flex-container"});$body.appendChild($winContainer);var $winMessage=(0,_element.default)("h1",{className:"win-message"});$winContainer.appendChild($winMessage)});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.getTableCellsArray=getTableCellsArray;exports.getTable=getTable;var _game=_interopRequireDefault(__webpack_require__(6));var _element=_interopRequireDefault(__webpack_require__(2));var _fastclick=_interopRequireDefault(__webpack_require__(9));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}_game.default.getUnsolvedMap([true,false]);document.addEventListener("DOMContentLoaded",function(){var $body=document.body;_fastclick.default.attach($body)},false);var Controller={isPaused:false,pause:function pause(fn){if(fn)fn();Controller.isPaused=true},play:function play(fn){if(fn)fn();Controller.isPaused=false}};function refreshTable(tableCells){tableCells.forEach(function(row,x){return row.forEach(function(cell,y){cell.className=_game.default.map[x][y]})})}// A 2D array with the same layout as the game
// map, but all booleans are replaced with elements
function getTableCellsArray(_ref){var onPause=_ref.onPause,onPlay=_ref.onPlay;var tableCells=_game.default.map.map(function(row,x){return row.map(function(cell,y){var $td=(0,_element.default)("td",{className:_game.default.map[x][y]});$td.addEventListener("click",function(){if(Controller.isPaused)return;_game.default.press([x,y]);refreshTable(tableCells);if(!_game.default.isWon())return;Controller.pause(onPause);// I guess this works
// Surely, there's a better way to do it, though
setTimeout(function(){return window.addEventListener("click",function startGame(){_game.default.getUnsolvedMap();Controller.play(onPlay);// Temporarily prevented actions
// Re-allowed and reset game after clicking anywhere
this.removeEventListener("click",startGame);refreshTable(tableCells)})},0)});var $circle=(0,_element.default)("div",{className:"circle"});$td.appendChild($circle);return $td})});return tableCells}// Haha, because it's a portmanteau of "cell"
// and "elements". I'm funny.
function getTable(celements){var $table=(0,_element.default)("table");celements.forEach(function(row,x){var $tr=(0,_element.default)("tr");$table.appendChild($tr);row.forEach(function($td,y){return $tr.appendChild($td)})});return $table}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _arrayHelpers=__webpack_require__(7);var _grid=__webpack_require__(8);var _probability=__webpack_require__(3);function _sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _slicedToArray(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return _sliceIterator(arr,i)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}var Game={};// coordsToVal(), but it's always using Game.map
Game.coordsToVal=function(coords){return(0,_grid.coordsToVal)(Game.map,coords)};// Someday, I'll implement a way to change the options
// Someday...
Game.options={width:3,height:3};Game.getMap=function(){var _Game$options=Game.options,width=_Game$options.width,height=_Game$options.height;var map=[];var vals=[true,false];for(var i=0;i<width*height;i++){map.push((0,_probability.getRandomVal)(vals))}Game.map=(0,_arrayHelpers.splitInto2dArray)(map,height)};Game.getUnsolvedMap=function(){do{Game.getMap()}while(Game.isWon())};// Toggle a single tile
Game.toggle=function(_ref){var _ref2=_slicedToArray(_ref,2),x=_ref2[0],y=_ref2[1];Game.map[x][y]=!Game.map[x][y]};// Toggle a tile, and all that surround it
// (only up, down, left, and right)
Game.press=function(coords){var _Game$options2=Game.options,width=_Game$options2.width,height=_Game$options2.height;var queue=(0,_grid.getDirectAdjacents)(width,height,coords);queue.forEach(function(coords){return Game.toggle(coords)});return queue};Game.isWon=function(){var _Game$options3=Game.options,width=_Game$options3.width,height=_Game$options3.height;for(var x=0;x<width;x++){for(var y=0;y<height;y++){var cell=Game.map[x][y];// All lights must be off
// As soon as you find a true value, return false
if(cell)return false}}return true};var _default=Game;exports.default=_default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.splitInto2dArray=splitInto2dArray;// Split array into 2D array where each
// sub-array has a desired length
function splitInto2dArray(arr,len){// Obviously, avoid mutation of argument
var copy=arr.slice();var output=[];// Pull out the leading chunk of the array
// Repeat until the original is empty
while(copy.length>0){output.push(copy.splice(0,len))}return output}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.getAdjacents=getAdjacents;exports.getDirectAdjacents=getDirectAdjacents;exports.coordsToVal=coordsToVal;function _sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _slicedToArray(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return _sliceIterator(arr,i)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}function getAdjacents(width,height,_ref){var _ref2=_slicedToArray(_ref,2),x1=_ref2[0],y1=_ref2[1];var adjacents=[];// Actually includes self (whoops?)
var ranges={x:[x1-1,x1+1],y:[y1-1,y1+1]// Look within the range, but exclude anything
// outside of the map boundaries
};for(var y2=ranges.y[0];y2<=ranges.y[1];y2++){if(y2<0||y2>=height)continue;for(var x2=ranges.x[0];x2<=ranges.x[1];x2++){if(x2<0||x2>=width)continue;adjacents.push([x2,y2])}}return adjacents}function getDirectAdjacents(width,height,_ref3){var _ref4=_slicedToArray(_ref3,2),x=_ref4[0],y=_ref4[1];// I couldn't think of a better way, and was lazy
var adjacents=[[x,y-1],[x-1,y],[x,y],[x+1,y],[x,y+1]];return adjacents.filter(function(_ref5){var _ref6=_slicedToArray(_ref5,2),x=_ref6[0],y=_ref6[1];return y>=0&&y<height&&x>=0&&x<width})}function coordsToVal(map,_ref7){var _ref8=_slicedToArray(_ref7,2),x=_ref8[0],y=_ref8[1];return map[x][y]}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */ /*jslint browser:true, node:true*/ /*global define, Event, Node*/ /**
 * Instantiate fast-clicking listeners on the specified layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 * @param {Object} [options={}] The options to override the defaults
 */function FastClick(layer,options){var oldOnClick;options=options||{};/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */this.trackingClick=false;/**
	 * Timestamp for when click tracking started.
	 *
	 * @type number
	 */this.trackingClickStart=0;/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */this.targetElement=null;/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */this.touchStartX=0;/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */this.touchStartY=0;/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */this.lastTouchIdentifier=0;/**
	 * Touchmove boundary, beyond which a click will be cancelled.
	 *
	 * @type number
	 */this.touchBoundary=options.touchBoundary||10;/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */this.layer=layer;/**
	 * The minimum time between tap(touchstart and touchend) events
	 *
	 * @type number
	 */this.tapDelay=options.tapDelay||200;/**
	 * The maximum time for a tap
	 *
	 * @type number
	 */this.tapTimeout=options.tapTimeout||700;if(FastClick.notNeeded(layer)){return}// Some old versions of Android don't have Function.prototype.bind
function bind(method,context){return function(){return method.apply(context,arguments)}}var methods=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"];var context=this;for(var i=0,l=methods.length;i<l;i++){context[methods[i]]=bind(context[methods[i]],context)}// Set up event handlers as required
if(deviceIsAndroid){layer.addEventListener("mouseover",this.onMouse,true);layer.addEventListener("mousedown",this.onMouse,true);layer.addEventListener("mouseup",this.onMouse,true)}layer.addEventListener("click",this.onClick,true);layer.addEventListener("touchstart",this.onTouchStart,false);layer.addEventListener("touchmove",this.onTouchMove,false);layer.addEventListener("touchend",this.onTouchEnd,false);layer.addEventListener("touchcancel",this.onTouchCancel,false);// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
// layer when they are cancelled.
if(!Event.prototype.stopImmediatePropagation){layer.removeEventListener=function(type,callback,capture){var rmv=Node.prototype.removeEventListener;if(type==="click"){rmv.call(layer,type,callback.hijacked||callback,capture)}else{rmv.call(layer,type,callback,capture)}};layer.addEventListener=function(type,callback,capture){var adv=Node.prototype.addEventListener;if(type==="click"){adv.call(layer,type,callback.hijacked||(callback.hijacked=function(event){if(!event.propagationStopped){callback(event)}}),capture)}else{adv.call(layer,type,callback,capture)}}}// If a handler is already declared in the element's onclick attribute, it will be fired before
// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
// adding it as listener.
if(typeof layer.onclick==="function"){// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
// - the old one won't work if passed to addEventListener directly.
oldOnClick=layer.onclick;layer.addEventListener("click",function(event){oldOnClick(event)},false);layer.onclick=null}}/**
* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
*
* @type boolean
*/var deviceIsWindowsPhone=navigator.userAgent.indexOf("Windows Phone")>=0;/**
 * Android requires exceptions.
 *
 * @type boolean
 */var deviceIsAndroid=navigator.userAgent.indexOf("Android")>0&&!deviceIsWindowsPhone;/**
 * iOS requires exceptions.
 *
 * @type boolean
 */var deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent)&&!deviceIsWindowsPhone;/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */var deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent);/**
 * iOS 6.0-7.* requires the target element to be manually derived
 *
 * @type boolean
 */var deviceIsIOSWithBadTarget=deviceIsIOS&&/OS [6-7]_\d/.test(navigator.userAgent);/**
 * BlackBerry requires exceptions.
 *
 * @type boolean
 */var deviceIsBlackBerry10=navigator.userAgent.indexOf("BB10")>0;/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */FastClick.prototype.needsClick=function(target){switch(target.nodeName.toLowerCase()){// Don't send a synthetic click to disabled inputs (issue #62)
case"button":case"select":case"textarea":if(target.disabled){return true}break;case"input":// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
if(deviceIsIOS&&target.type==="file"||target.disabled){return true}break;case"label":case"iframe":// iOS8 homescreen apps can prevent events bubbling into frames
case"video":return true;}return /\bneedsclick\b/.test(target.className)};/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */FastClick.prototype.needsFocus=function(target){switch(target.nodeName.toLowerCase()){case"textarea":return true;case"select":return!deviceIsAndroid;case"input":switch(target.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return false;}// No point in attempting to focus disabled inputs
return!target.disabled&&!target.readOnly;default:return /\bneedsfocus\b/.test(target.className);}};/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */FastClick.prototype.sendClick=function(targetElement,event){var clickEvent,touch;// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
if(document.activeElement&&document.activeElement!==targetElement){document.activeElement.blur()}touch=event.changedTouches[0];// Synthesise a click event, with an extra attribute so it can be tracked
clickEvent=document.createEvent("MouseEvents");clickEvent.initMouseEvent(this.determineEventType(targetElement),true,true,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,false,false,false,false,0,null);clickEvent.forwardedTouchEvent=true;targetElement.dispatchEvent(clickEvent)};FastClick.prototype.determineEventType=function(targetElement){//Issue #159: Android Chrome Select Box does not open with a synthetic click event
if(deviceIsAndroid&&targetElement.tagName.toLowerCase()==="select"){return"mousedown"}return"click"};/**
 * @param {EventTarget|Element} targetElement
 */FastClick.prototype.focus=function(targetElement){var length;// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
if(deviceIsIOS&&targetElement.setSelectionRange&&targetElement.type.indexOf("date")!==0&&targetElement.type!=="time"&&targetElement.type!=="month"&&targetElement.type!=="email"){length=targetElement.value.length;targetElement.setSelectionRange(length,length)}else{targetElement.focus()}};/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */FastClick.prototype.updateScrollParent=function(targetElement){var scrollParent,parentElement;scrollParent=targetElement.fastClickScrollParent;// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
// target element was moved to another parent.
if(!scrollParent||!scrollParent.contains(targetElement)){parentElement=targetElement;do{if(parentElement.scrollHeight>parentElement.offsetHeight){scrollParent=parentElement;targetElement.fastClickScrollParent=parentElement;break}parentElement=parentElement.parentElement}while(parentElement)}// Always update the scroll top tracker if possible.
if(scrollParent){scrollParent.fastClickLastScrollTop=scrollParent.scrollTop}};/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */FastClick.prototype.getTargetElementFromEventTarget=function(eventTarget){// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
if(eventTarget.nodeType===Node.TEXT_NODE){return eventTarget.parentNode}return eventTarget};/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */FastClick.prototype.onTouchStart=function(event){var targetElement,touch,selection;// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
if(event.targetTouches.length>1){return true}targetElement=this.getTargetElementFromEventTarget(event.target);touch=event.targetTouches[0];if(deviceIsIOS){// Only trusted events will deselect text on iOS (issue #49)
selection=window.getSelection();if(selection.rangeCount&&!selection.isCollapsed){return true}if(!deviceIsIOS4){// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
// with the same identifier as the touch event that previously triggered the click that triggered the alert.
// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
// random integers, it's safe to to continue if the identifier is 0 here.
if(touch.identifier&&touch.identifier===this.lastTouchIdentifier){event.preventDefault();return false}this.lastTouchIdentifier=touch.identifier;// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
// 1) the user does a fling scroll on the scrollable layer
// 2) the user stops the fling scroll with another tap
// then the event.target of the last 'touchend' event will be the element that was under the user's finger
// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
this.updateScrollParent(targetElement)}}this.trackingClick=true;this.trackingClickStart=event.timeStamp;this.targetElement=targetElement;this.touchStartX=touch.pageX;this.touchStartY=touch.pageY;// Prevent phantom clicks on fast double-tap (issue #36)
if(event.timeStamp-this.lastClickTime<this.tapDelay){event.preventDefault()}return true};/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */FastClick.prototype.touchHasMoved=function(event){var touch=event.changedTouches[0],boundary=this.touchBoundary;if(Math.abs(touch.pageX-this.touchStartX)>boundary||Math.abs(touch.pageY-this.touchStartY)>boundary){return true}return false};/**
 * Update the last position.
 *
 * @param {Event} event
 * @returns {boolean}
 */FastClick.prototype.onTouchMove=function(event){if(!this.trackingClick){return true}// If the touch has moved, cancel the click tracking
if(this.targetElement!==this.getTargetElementFromEventTarget(event.target)||this.touchHasMoved(event)){this.trackingClick=false;this.targetElement=null}return true};/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */FastClick.prototype.findControl=function(labelElement){// Fast path for newer browsers supporting the HTML5 control attribute
if(labelElement.control!==undefined){return labelElement.control}// All browsers under test that support touch events also support the HTML5 htmlFor attribute
if(labelElement.htmlFor){return document.getElementById(labelElement.htmlFor)}// If no for attribute exists, attempt to retrieve the first labellable descendant element
// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
return labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */FastClick.prototype.onTouchEnd=function(event){var forElement,trackingClickStart,targetTagName,scrollParent,touch,targetElement=this.targetElement;if(!this.trackingClick){return true}// Prevent phantom clicks on fast double-tap (issue #36)
if(event.timeStamp-this.lastClickTime<this.tapDelay){this.cancelNextClick=true;return true}if(event.timeStamp-this.trackingClickStart>this.tapTimeout){return true}// Reset to prevent wrong click cancel on input (issue #156).
this.cancelNextClick=false;this.lastClickTime=event.timeStamp;trackingClickStart=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;// On some iOS devices, the targetElement supplied with the event is invalid if the layer
// is performing a transition or scroll, and has to be re-detected manually. Note that
// for this to function correctly, it must be called *after* the event target is checked!
// See issue #57; also filed as rdar://13048589 .
if(deviceIsIOSWithBadTarget){touch=event.changedTouches[0];// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
targetElement=document.elementFromPoint(touch.pageX-window.pageXOffset,touch.pageY-window.pageYOffset)||targetElement;targetElement.fastClickScrollParent=this.targetElement.fastClickScrollParent}targetTagName=targetElement.tagName.toLowerCase();if(targetTagName==="label"){forElement=this.findControl(targetElement);if(forElement){this.focus(targetElement);if(deviceIsAndroid){return false}targetElement=forElement}}else if(this.needsFocus(targetElement)){// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
if(event.timeStamp-trackingClickStart>100||deviceIsIOS&&window.top!==window&&targetTagName==="input"){this.targetElement=null;return false}this.focus(targetElement);this.sendClick(targetElement,event);// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
if(!deviceIsIOS||targetTagName!=="select"){this.targetElement=null;event.preventDefault()}return false}if(deviceIsIOS&&!deviceIsIOS4){// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
scrollParent=targetElement.fastClickScrollParent;if(scrollParent&&scrollParent.fastClickLastScrollTop!==scrollParent.scrollTop){return true}}// Prevent the actual click from going though - unless the target node is marked as requiring
// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
if(!this.needsClick(targetElement)){event.preventDefault();this.sendClick(targetElement,event)}return false};/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */FastClick.prototype.onTouchCancel=function(){this.trackingClick=false;this.targetElement=null};/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */FastClick.prototype.onMouse=function(event){// If a target element was never set (because a touch event was never fired) allow the event
if(!this.targetElement){return true}if(event.forwardedTouchEvent){return true}// Programmatically generated events targeting a specific element should be permitted
if(!event.cancelable){return true}// Derive and check the target element to see whether the mouse event needs to be permitted;
// unless explicitly enabled, prevent non-touch click events from triggering actions,
// to prevent ghost/doubleclicks.
if(!this.needsClick(this.targetElement)||this.cancelNextClick){// Prevent any user-added listeners declared on FastClick element from being fired.
if(event.stopImmediatePropagation){event.stopImmediatePropagation()}else{// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
event.propagationStopped=true}// Cancel the event
event.stopPropagation();event.preventDefault();return false}// If the mouse event is permitted, return true for the action to go through.
return true};/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */FastClick.prototype.onClick=function(event){var permitted;// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
if(event.target.type==="submit"&&event.detail===0){return true}permitted=this.onMouse(event);// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
if(!permitted){this.targetElement=null}// If clicks are permitted, return true for the action to go through.
return permitted};/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */FastClick.prototype.destroy=function(){var layer=this.layer;if(deviceIsAndroid){layer.removeEventListener("mouseover",this.onMouse,true);layer.removeEventListener("mousedown",this.onMouse,true);layer.removeEventListener("mouseup",this.onMouse,true)}layer.removeEventListener("click",this.onClick,true);layer.removeEventListener("touchstart",this.onTouchStart,false);layer.removeEventListener("touchmove",this.onTouchMove,false);layer.removeEventListener("touchend",this.onTouchEnd,false);layer.removeEventListener("touchcancel",this.onTouchCancel,false)};/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */FastClick.notNeeded=function(layer){var metaViewport;var chromeVersion;var blackberryVersion;var firefoxVersion;// Devices that don't support touch don't need FastClick
if(typeof window.ontouchstart==="undefined"){return true}// Chrome version - zero for other browsers
chromeVersion=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(chromeVersion){if(deviceIsAndroid){metaViewport=document.querySelector("meta[name=viewport]");if(metaViewport){// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
if(metaViewport.content.indexOf("user-scalable=no")!==-1){return true}// Chrome 32 and above with width=device-width or less don't need FastClick
if(chromeVersion>31&&document.documentElement.scrollWidth<=window.outerWidth){return true}}// Chrome desktop doesn't need FastClick (issue #15)
}else{return true}}if(deviceIsBlackBerry10){blackberryVersion=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);// BlackBerry 10.3+ does not require Fastclick library.
// https://github.com/ftlabs/fastclick/issues/251
if(blackberryVersion[1]>=10&&blackberryVersion[2]>=3){metaViewport=document.querySelector("meta[name=viewport]");if(metaViewport){// user-scalable=no eliminates click delay.
if(metaViewport.content.indexOf("user-scalable=no")!==-1){return true}// width=device-width (or less than device-width) eliminates click delay.
if(document.documentElement.scrollWidth<=window.outerWidth){return true}}}}// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
if(layer.style.msTouchAction==="none"||layer.style.touchAction==="manipulation"){return true}// Firefox version - zero for other browsers
firefoxVersion=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(firefoxVersion>=27){// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
metaViewport=document.querySelector("meta[name=viewport]");if(metaViewport&&(metaViewport.content.indexOf("user-scalable=no")!==-1||document.documentElement.scrollWidth<=window.outerWidth)){return true}}// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
if(layer.style.touchAction==="none"||layer.style.touchAction==="manipulation"){return true}return false};/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 * @param {Object} [options={}] The options to override the defaults
 */FastClick.attach=function(layer,options){return new FastClick(layer,options)};var _default=FastClick;exports.default=_default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var messages={symbol:["<3"],word:["Amazing","Awesome","Beautiful","Bingo","Delightful","Eureka","Excellent","Fantastic","Grand","Great","Incredible","Lovely","Nice","Spectacular","Sweet","Swell","Terrific","Tremendous","Well done","Whew","Wonderful","Wow","Yipee"].map(function(word){return"".concat(word,"!")}),phrase:["I hope you appreciate these messages. They took time to make.","I love you. Sorry, too soon?","Please share with your friends. I need love.","The reason that I don't have a girlfriend is this game ... among others.","This is the most warmth I've ever felt."]/*
const longs = {
  symbol: [
    '<3'
  ],

  word: [
    'Amazing',
    'Beautiful',
    'Delightful',
    'Excellent',
    'Fantastic',
    'Incredible',
    'Spectacular',
    'Terrific',
    'Tremendous',
    'Well done',
    'Wonderful',
  ].map(word => `${word}!`),

  phrase: [
    'I hope you appreciate these messages. They took time to make.',
    'Please share with your friends. I need love.',
    'This game is the reason that I don\'t have a girlfriend ... among many.',
    'This is the most warmth I\'ve ever felt.'
  ]
}
*/};var winMessages=[];// This makes it super easy to add more groups in the future
var _loop=function _loop(type){var vals=messages[type];vals.forEach(function(text){return winMessages.push({type:type,text:text})})};var _arr=Object.keys(messages);for(var _i=0;_i<_arr.length;_i++){var type=_arr[_i];_loop(type)}var _default=winMessages;exports.default=_default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/* {\n  outline: 1px solid red;\n} /**/\n\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n\n  cursor: default;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\nhtml,\nbody,\n.flex-container {\n  width: 100%;\n  height: 100vh;\n}\n\nbody {\n  background-color: #222;\n  color: #ddd;\n}\n\n.flex-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: 0.5s all;\n}\n\ntd {\n  padding: 0.5rem;\n}\n\ntd,\ntd .circle {\n  width: 4rem;\n  height: 4rem;\n}\n\ntd .circle {\n  border: 0.75rem solid #ddd;\n  border-radius: 50%;\n\n  transition: 0.1s all;\n}\n\ntd.true .circle {\n  background-color: #ddd;\n}\n\nbody.paused .flex-container {\n  transform: translateY(-100vh)\n}\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./win-messages.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./win-messages.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".win-message {\n  max-width: 80%;\n\n  font-family: 'Courgette';\n  text-align: center;\n\n  transition: 0.5s transform;\n}\n\n.win-message#symbol {\n  font-size: 8rem;\n}\n\n.win-message#word {\n  font-size: 5rem;\n}\n\n.win-message#phrase {\n  font-size: 3rem;\n}\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./mobile.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./mobile.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/*\nThese awesome media queries are from https://stackoverflow.com/a/40542824.\n*/\n\n/* smartphones, portrait iPhone, portrait 480x320 phones (Android) */\n@media only screen\nand (min-width: 320px)\nand (max-width: 480px) {\n  .win-message#symbol {\n    font-size: 6.5rem;\n  }\n\n  .win-message#word {\n    font-size: 3.5rem;\n  }\n\n  .win-message#phrase {\n    font-size: 2rem;\n  }\n\n  /*body {\n    background-color: purple;\n  }/**/\n}\n\n/* smartphones, Android phones, landscape iPhone */\n@media only screen\nand (min-width: 480px)\nand (max-width: 600px) {\n  /*body {\n    background-color: orange;\n  }/**/\n}\n\n/* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */\n@media only screen\nand (min-width: 600px)\nand (max-width: 767px) {\n  /*body {\n    background-color: green;\n  }/**/\n\n  td {\n    padding: 0.375rem;\n  }\n\n  td,\n  td .circle {\n    width: 3rem;\n    height: 3rem;\n  }\n\n  td .circle {\n    border-width: 0.5625rem;\n  }\n}\n\n/* big landscape tablets */\n@media only screen\nand (min-width: 767px)\nand (max-width: 1030px) {\n  /*body {\n    background-color: red;\n  }/**/\n\n  td {\n    padding: 0.75rem;\n  }\n\n  td,\n  td .circle {\n    width: 6rem;\n    height: 6rem;\n  }\n\n  .win-message {\n    margin: 6rem;\n  }\n\n  td .circle {\n    border-width: 1.125rem;\n  }\n}\n\n/* Specifically landscape iPhone X */\n/* Goddammit, Apple. So unnaturally wide but narrow. */\n@media only screen\nand (device-width: 375px)\nand (device-height: 812px)\nand (-webkit-device-pixel-ratio: 3)\nand (orientation: landscape) {\n  /*body {\n    background-color: white;\n  }/**/\n}\n\n/* Specifically landscape iPad Pro */\n@media only screen\nand (min-device-width: 1030px)\nand (max-device-width: 1366px)\nand (-webkit-min-device-pixel-ratio: 1.5)\nand (orientation: landscape) {\n  /*body {\n    background-color: blue;\n  }/**/\n\n  td {\n    padding: 1rem;\n  }\n\n  td,\n  td .circle {\n    width: 8rem;\n    height: 8rem;\n  }\n\n  td .circle {\n    border-width: 1.5rem;\n  }\n\n  .win-message#symbol {\n    font-size: 11rem;\n  }\n\n  .win-message#word {\n    font-size: 8rem;\n  }\n\n  .win-message#phrase {\n    font-size: 5rem;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./courgette.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./courgette.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/* latin-ext */\n@font-face {\n  font-family: 'Courgette';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Courgette Regular'), local('Courgette-Regular'), url(https://fonts.gstatic.com/s/courgette/v5/Gkr63O-aJXf4Mv4t7cBUcoX0hVgzZQUfRDuZrPvH3D8.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Courgette';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Courgette Regular'), local('Courgette-Regular'), url(https://fonts.gstatic.com/s/courgette/v5/BHG8ZtTfO0yYnp02--QxqpBw1xU1rKptJj_0jans920.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215;\n}\n", ""]);

// exports


/***/ })
/******/ ]);