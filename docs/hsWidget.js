this["hsWidget"] =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./bin/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/Config.js":
/*!*******************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/Config.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! ./mithril */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/mithril.js");
class Config {
    oninit(node) {
        const context = node.attrs.context;
        if (typeof node.attrs.source === 'string') {
            if (!node.state.cfg) {
                mithril_1.m.request({ method: "GET", url: node.attrs.source }).then((s) => {
                    node.state.cfg = translate(s, s.root, context);
                });
            }
        }
        else {
            node.state.cfg = translate(node.attrs.source, node.attrs.source.root, context);
        }
    }
    view(node) {
        const cfg = node.state.cfg;
        return (cfg && cfg.compClass) ? mithril_1.m(cfg.compClass, Object.assign(cfg.attrs, node.attrs)) : mithril_1.m('div', 'waiting');
    }
}
exports.Config = Config;
function translate(config, subcfg, context) {
    if (isSynonym(config, subcfg)) {
        subcfg = config[subcfg];
    }
    if (['string', 'number', 'boolean', 'function'].indexOf(typeof subcfg) >= 0) {
        return subcfg;
    }
    let result = subcfg.length ? [] : {};
    const options = Object.keys(subcfg);
    options.map((opt) => {
        const cl = resolve(opt, context);
        const content = translate(config, subcfg[opt], context);
        if (cl) {
            const r = {
                compClass: cl,
                attrs: content
            };
            (!Array.isArray(subcfg) && options.length === 1) ?
                result = r :
                result[opt] = r;
        }
        else {
            result[opt] = content;
        }
    });
    return result;
}
function resolve(sym, context) {
    let cl;
    context.some((c) => cl = c[sym]);
    return cl;
}
function isSynonym(config, key) { return typeof key === 'string' && config[key]; }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTJEQSx1Q0FBcUM7QUFLckMsTUFBYSxNQUFNO0lBQ2YsTUFBTSxDQUFDLElBQVU7UUFDYixNQUFNLE9BQU8sR0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN6QyxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFBRSxXQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUssRUFBQyxFQUFFO29CQUN0RixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDO2FBQUU7U0FDUjthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNsRjtJQUNMLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBVTtRQUNYLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxXQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQUMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDaEgsQ0FBQztDQUNKO0FBZkQsd0JBZUM7QUFhRCxTQUFTLFNBQVMsQ0FBQyxNQUFVLEVBQUUsTUFBVSxFQUFFLE9BQWE7SUFFcEQsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUFFO0lBRTNELElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxNQUFNLENBQUMsSUFBRSxDQUFDLEVBQUU7UUFBRSxPQUFPLE1BQU0sQ0FBQztLQUFFO0lBQzdGLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRXBDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVUsRUFBUSxFQUFFO1FBQzdCLE1BQU0sRUFBRSxHQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDckMsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDeEQsSUFBSSxFQUFFLEVBQUU7WUFDSixNQUFNLENBQUMsR0FBRztnQkFDTixTQUFTLEVBQUMsRUFBRTtnQkFDWixLQUFLLEVBQUMsT0FBTzthQUNoQixDQUFDO1lBQ0YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUM3QyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjthQUNJO1lBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQztTQUFFO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVVELFNBQVMsT0FBTyxDQUFDLEdBQVUsRUFBRSxPQUFhO0lBQ3RDLElBQUksRUFBTSxDQUFDO0lBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUssRUFBRSxFQUFFLENBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLE1BQVUsRUFBRSxHQUFPLElBQUksT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyJ9

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js":
/*!******************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const pillars = __webpack_require__(/*! ./view/PillaredLayouter */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/PillaredLayouter.js");
if (pillars) { }
const tiles = __webpack_require__(/*! ./view/TileLayouter */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/TileLayouter.js");
if (tiles) { }
var Layout_1 = __webpack_require__(/*! ./view/Layout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Layout.js");
exports.Layout = Layout_1.Layout;
var Tokens_1 = __webpack_require__(/*! ./view/Tokens */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Tokens.js");
exports.FILL = Tokens_1.FILL;
exports.px = Tokens_1.px;
exports.pc = Tokens_1.pc;
exports.LayoutToken = Tokens_1.LayoutToken;
var Layouter_1 = __webpack_require__(/*! ./view/Layouter */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Layouter.js");
exports.Layouter = Layouter_1.Layouter;
var Config_1 = __webpack_require__(/*! ./Config */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/Config.js");
exports.Config = Config_1.Config;
var mithril_1 = __webpack_require__(/*! ./mithril */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/mithril.js");
exports.m = mithril_1.m;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxtREFBdUQ7QUFBTSxJQUFHLE9BQU8sRUFBRSxHQUFFO0FBQzNFLDZDQUFtRDtBQUFVLElBQUcsS0FBSyxFQUFFLEdBQUU7QUFFekUsd0NBQTZDO0FBQXBDLDBCQUFBLE1BQU0sQ0FBQTtBQUNmLHdDQUM2QztBQURwQyx3QkFBQSxJQUFJLENBQUE7QUFBRSxzQkFBQSxFQUFFLENBQUE7QUFBRSxzQkFBQSxFQUFFLENBQUE7QUFDWiwrQkFBQSxXQUFXLENBQUE7QUFDcEIsNENBQStDO0FBQXRDLDhCQUFBLFFBQVEsQ0FBQTtBQUNqQixtQ0FBd0M7QUFBL0IsMEJBQUEsTUFBTSxDQUFBO0FBQ2YscUNBQXdDO0FBQS9CLHNCQUFBLENBQUMsQ0FBQSJ9

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/mithril.js":
/*!********************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/mithril.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.m = __webpack_require__(/*! mithril */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/mithril.js");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl0aHJpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taXRocmlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUWEsUUFBQSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDIn0=

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/mithril.js":
/*!*****************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/mithril.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, global) {;(function() {
"use strict"
function Vnode(tag, key, attrs0, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: undefined, _state: undefined, events: undefined, instance: undefined, skip: false}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node === false ? "" : node, undefined, undefined)
	return node
}
Vnode.normalizeChildren = function normalizeChildren(children) {
	for (var i = 0; i < children.length; i++) {
		children[i] = Vnode.normalize(children[i])
	}
	return children
}
var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = {}
var hasOwn = {}.hasOwnProperty
function isEmpty(object) {
	for (var key in object) if (hasOwn.call(object, key)) return false
	return true
}
function compileSelector(selector) {
	var match, tag = "div", classes = [], attrs = {}
	while (match = selectorParser.exec(selector)) {
		var type = match[1], value = match[2]
		if (type === "" && value !== "") tag = value
		else if (type === "#") attrs.id = value
		else if (type === ".") classes.push(value)
		else if (match[3][0] === "[") {
			var attrValue = match[6]
			if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
			if (match[4] === "class") classes.push(attrValue)
			else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true
		}
	}
	if (classes.length > 0) attrs.className = classes.join(" ")
	return selectorCache[selector] = {tag: tag, attrs: attrs}
}
function execSelector(state, attrs, children) {
	var hasAttrs = false, childList, text
	var className = attrs.className || attrs.class
	if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
		var newAttrs = {}
		for(var key in attrs) {
			if (hasOwn.call(attrs, key)) {
				newAttrs[key] = attrs[key]
			}
		}
		attrs = newAttrs
	}
	for (var key in state.attrs) {
		if (hasOwn.call(state.attrs, key)) {
			attrs[key] = state.attrs[key]
		}
	}
	if (className !== undefined) {
		if (attrs.class !== undefined) {
			attrs.class = undefined
			attrs.className = className
		}
		if (state.attrs.className != null) {
			attrs.className = state.attrs.className + " " + className
		}
	}
	for (var key in attrs) {
		if (hasOwn.call(attrs, key) && key !== "key") {
			hasAttrs = true
			break
		}
	}
	if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
		text = children[0].children
	} else {
		childList = children
	}
	return Vnode(state.tag, attrs.key, hasAttrs ? attrs : undefined, childList, text)
}
function hyperscript(selector) {
	// Because sloppy mode sucks
	var attrs = arguments[1], start = 2, children
	if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}
	if (typeof selector === "string") {
		var cached = selectorCache[selector] || compileSelector(selector)
	}
	if (attrs == null) {
		attrs = {}
	} else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
		attrs = {}
		start = 1
	}
	if (arguments.length === start + 1) {
		children = arguments[start]
		if (!Array.isArray(children)) children = [children]
	} else {
		children = []
		while (start < arguments.length) children.push(arguments[start++])
	}
	var normalized = Vnode.normalizeChildren(children)
	if (typeof selector === "string") {
		return execSelector(cached, attrs, normalized)
	} else {
		return Vnode(selector, attrs.key, attrs, normalized)
	}
}
hyperscript.trust = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}
hyperscript.fragment = function(attrs1, children) {
	return Vnode("[", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined)
}
var m = hyperscript
/** @constructor */
var PromisePolyfill = function(executor) {
	if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
	if (typeof executor !== "function") throw new TypeError("executor must be a function")
	var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
	var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
	function handler(list, shouldAbsorb) {
		return function execute(value) {
			var then
			try {
				if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
					if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
					executeOnce(then.bind(value))
				}
				else {
					callAsync(function() {
						if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
						for (var i = 0; i < list.length; i++) list[i](value)
						resolvers.length = 0, rejectors.length = 0
						instance.state = shouldAbsorb
						instance.retry = function() {execute(value)}
					})
				}
			}
			catch (e) {
				rejectCurrent(e)
			}
		}
	}
	function executeOnce(then) {
		var runs = 0
		function run(fn) {
			return function(value) {
				if (runs++ > 0) return
				fn(value)
			}
		}
		var onerror = run(rejectCurrent)
		try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
	}
	executeOnce(executor)
}
PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
	var self = this, instance = self._instance
	function handle(callback, list, next, state) {
		list.push(function(value) {
			if (typeof callback !== "function") next(value)
			else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
		})
		if (typeof instance.retry === "function" && state === instance.state) instance.retry()
	}
	var resolveNext, rejectNext
	var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
	handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
	return promise
}
PromisePolyfill.prototype.catch = function(onRejection) {
	return this.then(null, onRejection)
}
PromisePolyfill.resolve = function(value) {
	if (value instanceof PromisePolyfill) return value
	return new PromisePolyfill(function(resolve) {resolve(value)})
}
PromisePolyfill.reject = function(value) {
	return new PromisePolyfill(function(resolve, reject) {reject(value)})
}
PromisePolyfill.all = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		var total = list.length, count = 0, values = []
		if (list.length === 0) resolve([])
		else for (var i = 0; i < list.length; i++) {
			(function(i) {
				function consume(value) {
					count++
					values[i] = value
					if (count === total) resolve(values)
				}
				if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
					list[i].then(consume, reject)
				}
				else consume(list[i])
			})(i)
		}
	})
}
PromisePolyfill.race = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		for (var i = 0; i < list.length; i++) {
			list[i].then(resolve, reject)
		}
	})
}
if (typeof window !== "undefined") {
	if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill
	var PromisePolyfill = window.Promise
} else if (typeof global !== "undefined") {
	if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill
	var PromisePolyfill = global.Promise
} else {
}
var buildQueryString = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""
	var args = []
	for (var key0 in object) {
		destructure(key0, object[key0])
	}
	return args.join("&")
	function destructure(key0, value) {
		if (Array.isArray(value)) {
			for (var i = 0; i < value.length; i++) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else if (Object.prototype.toString.call(value) === "[object Object]") {
			for (var i in value) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else args.push(encodeURIComponent(key0) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
	}
}
var FILE_PROTOCOL_REGEX = new RegExp("^file://", "i")
var _8 = function($window, Promise) {
	var callbackCount = 0
	var oncompletion
	function setCompletionCallback(callback) {oncompletion = callback}
	function finalizer() {
		var count = 0
		function complete() {if (--count === 0 && typeof oncompletion === "function") oncompletion()}
		return function finalize(promise0) {
			var then0 = promise0.then
			promise0.then = function() {
				count++
				var next = then0.apply(promise0, arguments)
				next.then(complete, function(e) {
					complete()
					if (count === 0) throw e
				})
				return finalize(next)
			}
			return promise0
		}
	}
	function normalize(args, extra) {
		if (typeof args === "string") {
			var url = args
			args = extra || {}
			if (args.url == null) args.url = url
		}
		return args
	}
	function request(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			if (args.method == null) args.method = "GET"
			args.method = args.method.toUpperCase()
			var useBody = (args.method === "GET" || args.method === "TRACE") ? false : (typeof args.useBody === "boolean" ? args.useBody : true)
			if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify
			if (typeof args.deserialize !== "function") args.deserialize = deserialize
			if (typeof args.extract !== "function") args.extract = extract
			args.url = interpolate(args.url, args.data)
			if (useBody) args.data = args.serialize(args.data)
			else args.url = assemble(args.url, args.data)
			var xhr = new $window.XMLHttpRequest(),
				aborted = false,
				_abort = xhr.abort
			xhr.abort = function abort() {
				aborted = true
				_abort.call(xhr)
			}
			xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)
			if (args.serialize === JSON.stringify && useBody && !(args.headers && args.headers.hasOwnProperty("Content-Type"))) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (args.deserialize === deserialize && !(args.headers && args.headers.hasOwnProperty("Accept"))) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			for (var key in args.headers) if ({}.hasOwnProperty.call(args.headers, key)) {
				xhr.setRequestHeader(key, args.headers[key])
			}
			if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr
			xhr.onreadystatechange = function() {
				// Don't throw errors on xhr.abort().
				if(aborted) return
				if (xhr.readyState === 4) {
					try {
						var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {
							resolve(cast(args.type, response))
						}
						else {
							var error = new Error(xhr.responseText)
							for (var key in response) error[key] = response[key]
							reject(error)
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}
			if (useBody && (args.data != null)) xhr.send(args.data)
			else xhr.send()
		})
		return args.background === true ? promise0 : finalize(promise0)
	}
	function jsonp(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				script.parentNode.removeChild(script)
				resolve(cast(args.type, data))
				delete $window[callbackName]
			}
			script.onerror = function() {
				script.parentNode.removeChild(script)
				reject(new Error("JSONP request failed"))
				delete $window[callbackName]
			}
			if (args.data == null) args.data = {}
			args.url = interpolate(args.url, args.data)
			args.data[args.callbackKey || "callback"] = callbackName
			script.src = assemble(args.url, args.data)
			$window.document.documentElement.appendChild(script)
		})
		return args.background === true? promise0 : finalize(promise0)
	}
	function interpolate(url, data) {
		if (data == null) return url
		var tokens = url.match(/:[^\/]+/gi) || []
		for (var i = 0; i < tokens.length; i++) {
			var key = tokens[i].slice(1)
			if (data[key] != null) {
				url = url.replace(tokens[i], data[key])
			}
		}
		return url
	}
	function assemble(url, data) {
		var querystring = buildQueryString(data)
		if (querystring !== "") {
			var prefix = url.indexOf("?") < 0 ? "?" : "&"
			url += prefix + querystring
		}
		return url
	}
	function deserialize(data) {
		try {return data !== "" ? JSON.parse(data) : null}
		catch (e) {throw new Error(data)}
	}
	function extract(xhr) {return xhr.responseText}
	function cast(type0, data) {
		if (typeof type0 === "function") {
			if (Array.isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					data[i] = new type0(data[i])
				}
			}
			else return new type0(data)
		}
		return data
	}
	return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
}
var requestService = _8(window, PromisePolyfill)
var coreRenderer = function($window) {
	var $doc = $window.document
	var $emptyFragment = $doc.createDocumentFragment()
	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}
	var onevent
	function setEventCallback(callback) {return onevent = callback}
	function getNameSpace(vnode) {
		return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]
	}
	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				createNode(parent, vnode, hooks, ns, nextSibling)
			}
		}
	}
	function createNode(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		if (typeof tag === "string") {
			vnode.state = {}
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			switch (tag) {
				case "#": return createText(parent, vnode, nextSibling)
				case "<": return createHTML(parent, vnode, nextSibling)
				case "[": return createFragment(parent, vnode, hooks, ns, nextSibling)
				default: return createElement(parent, vnode, hooks, ns, nextSibling)
			}
		}
		else return createComponent(parent, vnode, hooks, ns, nextSibling)
	}
	function createText(parent, vnode, nextSibling) {
		vnode.dom = $doc.createTextNode(vnode.children)
		insertNode(parent, vnode.dom, nextSibling)
		return vnode.dom
	}
	function createHTML(parent, vnode, nextSibling) {
		var match1 = vnode.children.match(/^\s*?<(\w+)/im) || []
		var parent1 = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match1[1]] || "div"
		var temp = $doc.createElement(parent1)
		temp.innerHTML = vnode.children
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createFragment(parent, vnode, hooks, ns, nextSibling) {
		var fragment = $doc.createDocumentFragment()
		if (vnode.children != null) {
			var children = vnode.children
			createNodes(fragment, children, 0, children.length, hooks, null, ns)
		}
		vnode.dom = fragment.firstChild
		vnode.domSize = fragment.childNodes.length
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		var attrs2 = vnode.attrs
		var is = attrs2 && attrs2.is
		ns = getNameSpace(vnode) || ns
		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode.dom = element
		if (attrs2 != null) {
			setAttrs(vnode, attrs2, ns)
		}
		insertNode(parent, element, nextSibling)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else {
			if (vnode.text != null) {
				if (vnode.text !== "") element.textContent = vnode.text
				else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			}
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(element, children, 0, children.length, hooks, null, ns)
				setLateAttrs(vnode)
			}
		}
		return element
	}
	function initComponent(vnode, hooks) {
		var sentinel
		if (typeof vnode.tag.view === "function") {
			vnode.state = Object.create(vnode.tag)
			sentinel = vnode.state.view
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
		} else {
			vnode.state = void 0
			sentinel = vnode.tag
			if (sentinel.$$reentrantLock$$ != null) return $emptyFragment
			sentinel.$$reentrantLock$$ = true
			vnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function") ? new vnode.tag(vnode) : vnode.tag(vnode)
		}
		vnode._state = vnode.state
		if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
		initLifecycle(vnode._state, vnode, hooks)
		vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		sentinel.$$reentrantLock$$ = null
	}
	function createComponent(parent, vnode, hooks, ns, nextSibling) {
		initComponent(vnode, hooks)
		if (vnode.instance != null) {
			var element = createNode(parent, vnode.instance, hooks, ns, nextSibling)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
			insertNode(parent, element, nextSibling)
			return element
		}
		else {
			vnode.domSize = 0
			return $emptyFragment
		}
	}
	//update
	function updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)
		else if (vnodes == null) removeNodes(old, 0, old.length, vnodes)
		else {
			if (old.length === vnodes.length) {
				var isUnkeyed = false
				for (var i = 0; i < vnodes.length; i++) {
					if (vnodes[i] != null && old[i] != null) {
						isUnkeyed = vnodes[i].key == null && old[i].key == null
						break
					}
				}
				if (isUnkeyed) {
					for (var i = 0; i < old.length; i++) {
						if (old[i] === vnodes[i]) continue
						else if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling))
						else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)
						else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns)
					}
					return
				}
			}
			recycling = recycling || isRecyclable(old, vnodes)
			if (recycling) {
				var pool = old.pool
				old = old.concat(old.pool)
			}
			var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldStart], v = vnodes[start]
				if (o === v && !recycling) oldStart++, start++
				else if (o == null) oldStart++
				else if (v == null) start++
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldStart >= old.length - pool.length) || ((pool == null) && recycling)
					oldStart++, start++
					updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
				}
				else {
					var o = old[oldEnd]
					if (o === v && !recycling) oldEnd--, start++
					else if (o == null) oldEnd--
					else if (v == null) start++
					else if (o.key === v.key) {
						var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
						if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))
						oldEnd--, start++
					}
					else break
				}
			}
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldEnd], v = vnodes[end]
				if (o === v && !recycling) oldEnd--, end--
				else if (o == null) oldEnd--
				else if (v == null) end--
				else if (o.key === v.key) {
					var shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)
					updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
					if (o.dom != null) nextSibling = o.dom
					oldEnd--, end--
				}
				else {
					if (!map) map = getKeyMap(old, oldEnd)
					if (v != null) {
						var oldIndex = map[v.key]
						if (oldIndex != null) {
							var movable = old[oldIndex]
							var shouldRecycle = (pool != null && oldIndex >= old.length - pool.length) || ((pool == null) && recycling)
							updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
							insertNode(parent, toFragment(movable), nextSibling)
							old[oldIndex].skip = true
							if (movable.dom != null) nextSibling = movable.dom
						}
						else {
							var dom = createNode(parent, v, hooks, ns, nextSibling)
							nextSibling = dom
						}
					}
					end--
				}
				if (end < start) break
			}
			createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
			removeNodes(old, oldStart, oldEnd + 1, vnodes)
		}
	}
	function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		var oldTag = old.tag, tag = vnode.tag
		if (oldTag === tag) {
			vnode.state = old.state
			vnode._state = old._state
			vnode.events = old.events
			if (!recycling && shouldNotUpdate(vnode, old)) return
			if (typeof oldTag === "string") {
				if (vnode.attrs != null) {
					if (recycling) {
						vnode.state = {}
						initLifecycle(vnode.attrs, vnode, hooks)
					}
					else updateLifecycle(vnode.attrs, vnode, hooks)
				}
				switch (oldTag) {
					case "#": updateText(old, vnode); break
					case "<": updateHTML(parent, old, vnode, nextSibling); break
					case "[": updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns); break
					default: updateElement(old, vnode, recycling, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)
		}
		else {
			removeNode(old, null)
			createNode(parent, vnode, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode) {
		if (old.children.toString() !== vnode.children.toString()) {
			old.dom.nodeValue = vnode.children
		}
		vnode.dom = old.dom
	}
	function updateHTML(parent, old, vnode, nextSibling) {
		if (old.children !== vnode.children) {
			toFragment(old)
			createHTML(parent, vnode, nextSibling)
		}
		else vnode.dom = old.dom, vnode.domSize = old.domSize
	}
	function updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns)
		var domSize = 0, children = vnode.children
		vnode.dom = null
		if (children != null) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i]
				if (child != null && child.dom != null) {
					if (vnode.dom == null) vnode.dom = child.dom
					domSize += child.domSize || 1
				}
			}
			if (domSize !== 1) vnode.domSize = domSize
		}
	}
	function updateElement(old, vnode, recycling, hooks, ns) {
		var element = vnode.dom = old.dom
		ns = getNameSpace(vnode) || ns
		if (vnode.tag === "textarea") {
			if (vnode.attrs == null) vnode.attrs = {}
			if (vnode.text != null) {
				vnode.attrs.value = vnode.text //FIXME handle0 multiple children
				vnode.text = undefined
			}
		}
		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else if (old.text != null && vnode.text != null && vnode.text !== "") {
			if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
		}
		else {
			if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
			if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			updateNodes(element, old.children, vnode.children, recycling, hooks, null, ns)
		}
	}
	function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		if (recycling) {
			initComponent(vnode, hooks)
		} else {
			vnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))
			if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
			if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)
			updateLifecycle(vnode._state, vnode, hooks)
		}
		if (vnode.instance != null) {
			if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(old.instance, null)
			vnode.dom = undefined
			vnode.domSize = 0
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
		}
	}
	function isRecyclable(old, vnodes) {
		if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
			var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0
			var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0
			var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0
			if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
				return true
			}
		}
		return false
	}
	function getKeyMap(vnodes, end) {
		var map = {}, i = 0
		for (var i = 0; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				var key2 = vnode.key
				if (key2 != null) map[key2] = i
			}
		}
		return map
	}
	function toFragment(vnode) {
		var count0 = vnode.domSize
		if (count0 != null || vnode.dom == null) {
			var fragment = $doc.createDocumentFragment()
			if (count0 > 0) {
				var dom = vnode.dom
				while (--count0) fragment.appendChild(dom.nextSibling)
				fragment.insertBefore(dom, fragment.firstChild)
			}
			return fragment
		}
		else return vnode.dom
	}
	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}
	function insertNode(parent, dom, nextSibling) {
		if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}
	function setContentEditable(vnode) {
		var children = vnode.children
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children
			if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
		}
		else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
	}
	//remove
	function removeNodes(vnodes, start, end, context) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				if (vnode.skip) vnode.skip = false
				else removeNode(vnode, context)
			}
		}
	}
	function removeNode(vnode, context) {
		var expected = 1, called = 0
		if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
			var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeremove === "function") {
			var result = vnode._state.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		continuation()
		function continuation() {
			if (++called === expected) {
				onremove(vnode)
				if (vnode.dom) {
					var count0 = vnode.domSize || 1
					if (count0 > 1) {
						var dom = vnode.dom
						while (--count0) {
							removeNodeFromDOM(dom.nextSibling)
						}
					}
					removeNodeFromDOM(vnode.dom)
					if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") { //TODO test custom elements
						if (!context.pool) context.pool = [vnode]
						else context.pool.push(vnode)
					}
				}
			}
		}
	}
	function removeNodeFromDOM(node) {
		var parent = node.parentNode
		if (parent != null) parent.removeChild(node)
	}
	function onremove(vnode) {
		if (vnode.attrs && typeof vnode.attrs.onremove === "function") vnode.attrs.onremove.call(vnode.state, vnode)
		if (typeof vnode.tag !== "string") {
			if (typeof vnode._state.onremove === "function") vnode._state.onremove.call(vnode.state, vnode)
			if (vnode.instance != null) onremove(vnode.instance)
		} else {
			var children = vnode.children
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null) onremove(child)
				}
			}
		}
	}
	//attrs2
	function setAttrs(vnode, attrs2, ns) {
		for (var key2 in attrs2) {
			setAttr(vnode, key2, null, attrs2[key2], ns)
		}
	}
	function setAttr(vnode, key2, old, value, ns) {
		var element = vnode.dom
		if (key2 === "key" || key2 === "is" || (old === value && !isFormAttribute(vnode, key2)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key2)) return
		var nsLastIndex = key2.indexOf(":")
		if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === "xlink") {
			element.setAttributeNS("http://www.w3.org/1999/xlink", key2.slice(nsLastIndex + 1), value)
		}
		else if (key2[0] === "o" && key2[1] === "n" && typeof value === "function") updateEvent(vnode, key2, value)
		else if (key2 === "style") updateStyle(element, old, value)
		else if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {
			if (key2 === "value") {
				var normalized0 = "" + value // eslint-disable-line no-implicit-coercion
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select") {
					if (value === null) {
						if (vnode.dom.selectedIndex === -1 && vnode.dom === $doc.activeElement) return
					} else {
						if (old !== null && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return
					}
				}
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && old != null && vnode.dom.value === normalized0) return
			}
			// If you assign an input type1 that is not supported by IE 11 with an assignment expression, an error0 will occur.
			if (vnode.tag === "input" && key2 === "type") {
				element.setAttribute(key2, value)
				return
			}
			element[key2] = value
		}
		else {
			if (typeof value === "boolean") {
				if (value) element.setAttribute(key2, "")
				else element.removeAttribute(key2)
			}
			else element.setAttribute(key2 === "className" ? "class" : key2, value)
		}
	}
	function setLateAttrs(vnode) {
		var attrs2 = vnode.attrs
		if (vnode.tag === "select" && attrs2 != null) {
			if ("value" in attrs2) setAttr(vnode, "value", null, attrs2.value, undefined)
			if ("selectedIndex" in attrs2) setAttr(vnode, "selectedIndex", null, attrs2.selectedIndex, undefined)
		}
	}
	function updateAttrs(vnode, old, attrs2, ns) {
		if (attrs2 != null) {
			for (var key2 in attrs2) {
				setAttr(vnode, key2, old && old[key2], attrs2[key2], ns)
			}
		}
		if (old != null) {
			for (var key2 in old) {
				if (attrs2 == null || !(key2 in attrs2)) {
					if (key2 === "className") key2 = "class"
					if (key2[0] === "o" && key2[1] === "n" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined)
					else if (key2 !== "key") vnode.dom.removeAttribute(key2)
				}
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function isAttribute(attr) {
		return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"// || attr === "type"
	}
	function isCustomElement(vnode){
		return vnode.attrs.is || vnode.tag.indexOf("-") > -1
	}
	function hasIntegrationMethods(source) {
		return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)
	}
	//style
	function updateStyle(element, old, style) {
		if (old === style) element.style.cssText = "", old = null
		if (style == null) element.style.cssText = ""
		else if (typeof style === "string") element.style.cssText = style
		else {
			if (typeof old === "string") element.style.cssText = ""
			for (var key2 in style) {
				element.style[key2] = style[key2]
			}
			if (old != null && typeof old !== "string") {
				for (var key2 in old) {
					if (!(key2 in style)) element.style[key2] = ""
				}
			}
		}
	}
	//event
	function updateEvent(vnode, key2, value) {
		var element = vnode.dom
		var callback = typeof onevent !== "function" ? value : function(e) {
			var result = value.call(element, e)
			onevent.call(element, e)
			return result
		}
		if (key2 in element) element[key2] = typeof value === "function" ? callback : null
		else {
			var eventName = key2.slice(2)
			if (vnode.events === undefined) vnode.events = {}
			if (vnode.events[key2] === callback) return
			if (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false)
			if (typeof value === "function") {
				vnode.events[key2] = callback
				element.addEventListener(eventName, vnode.events[key2], false)
			}
		}
	}
	//lifecycle
	function initLifecycle(source, vnode, hooks) {
		if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode)
		if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode))
	}
	function updateLifecycle(source, vnode, hooks) {
		if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode))
	}
	function shouldNotUpdate(vnode, old) {
		var forceVnodeUpdate, forceComponentUpdate
		if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)
		if (typeof vnode.tag !== "string" && typeof vnode._state.onbeforeupdate === "function") forceComponentUpdate = vnode._state.onbeforeupdate.call(vnode.state, vnode, old)
		if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
			vnode.instance = old.instance
			return true
		}
		return false
	}
	function render(dom, vnodes) {
		if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = []
		var active = $doc.activeElement
		var namespace = dom.namespaceURI
		// First time0 rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = ""
		if (!Array.isArray(vnodes)) vnodes = [vnodes]
		updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
		dom.vnodes = vnodes
		// document.activeElement can return null in IE https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
		if (active != null && $doc.activeElement !== active) active.focus()
		for (var i = 0; i < hooks.length; i++) hooks[i]()
	}
	return {render: render, setEventCallback: setEventCallback}
}
function throttle(callback) {
	//60fps translates to 16.6ms, round it down since setTimeout requires int
	var time = 16
	var last = 0, pending = null
	var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout
	return function() {
		var now = Date.now()
		if (last === 0 || now - last >= time) {
			last = now
			callback()
		}
		else if (pending === null) {
			pending = timeout(function() {
				pending = null
				callback()
				last = Date.now()
			}, time - (now - last))
		}
	}
}
var _11 = function($window) {
	var renderService = coreRenderer($window)
	renderService.setEventCallback(function(e) {
		if (e.redraw === false) e.redraw = undefined
		else redraw()
	})
	var callbacks = []
	function subscribe(key1, callback) {
		unsubscribe(key1)
		callbacks.push(key1, throttle(callback))
	}
	function unsubscribe(key1) {
		var index = callbacks.indexOf(key1)
		if (index > -1) callbacks.splice(index, 2)
	}
	function redraw() {
		for (var i = 1; i < callbacks.length; i += 2) {
			callbacks[i]()
		}
	}
	return {subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render}
}
var redrawService = _11(window)
requestService.setCompletionCallback(redrawService.redraw)
var _16 = function(redrawService0) {
	return function(root, component) {
		if (component === null) {
			redrawService0.render(root, [])
			redrawService0.unsubscribe(root)
			return
		}
		
		if (component.view == null && typeof component !== "function") throw new Error("m.mount(element, component) expects a component, not a vnode")
		
		var run0 = function() {
			redrawService0.render(root, Vnode(component))
		}
		redrawService0.subscribe(root, run0)
		redrawService0.redraw()
	}
}
m.mount = _16(redrawService)
var Promise = PromisePolyfill
var parseQueryString = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)
	var entries = string.split("&"), data0 = {}, counters = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key5 = decodeURIComponent(entry[0])
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""
		if (value === "true") value = true
		else if (value === "false") value = false
		var levels = key5.split(/\]\[?|\[/)
		var cursor = data0
		if (key5.indexOf("[") > -1) levels.pop()
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			var isValue = j === levels.length - 1
			if (level === "") {
				var key5 = levels.slice(0, j).join()
				if (counters[key5] == null) counters[key5] = 0
				level = counters[key5]++
			}
			if (cursor[level] == null) {
				cursor[level] = isValue ? value : isNumber ? [] : {}
			}
			cursor = cursor[level]
		}
	}
	return data0
}
var coreRouter = function($window) {
	var supportsPushState = typeof $window.history.pushState === "function"
	var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout
	function normalize1(fragment0) {
		var data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
		if (fragment0 === "pathname" && data[0] !== "/") data = "/" + data
		return data
	}
	var asyncId
	function debounceAsync(callback0) {
		return function() {
			if (asyncId != null) return
			asyncId = callAsync0(function() {
				asyncId = null
				callback0()
			})
		}
	}
	function parsePath(path, queryData, hashData) {
		var queryIndex = path.indexOf("?")
		var hashIndex = path.indexOf("#")
		var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length
		if (queryIndex > -1) {
			var queryEnd = hashIndex > -1 ? hashIndex : path.length
			var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))
			for (var key4 in queryParams) queryData[key4] = queryParams[key4]
		}
		if (hashIndex > -1) {
			var hashParams = parseQueryString(path.slice(hashIndex + 1))
			for (var key4 in hashParams) hashData[key4] = hashParams[key4]
		}
		return path.slice(0, pathEnd)
	}
	var router = {prefix: "#!"}
	router.getPath = function() {
		var type2 = router.prefix.charAt(0)
		switch (type2) {
			case "#": return normalize1("hash").slice(router.prefix.length)
			case "?": return normalize1("search").slice(router.prefix.length) + normalize1("hash")
			default: return normalize1("pathname").slice(router.prefix.length) + normalize1("search") + normalize1("hash")
		}
	}
	router.setPath = function(path, data, options) {
		var queryData = {}, hashData = {}
		path = parsePath(path, queryData, hashData)
		if (data != null) {
			for (var key4 in data) queryData[key4] = data[key4]
			path = path.replace(/:([^\/]+)/g, function(match2, token) {
				delete queryData[token]
				return data[token]
			})
		}
		var query = buildQueryString(queryData)
		if (query) path += "?" + query
		var hash = buildQueryString(hashData)
		if (hash) path += "#" + hash
		if (supportsPushState) {
			var state = options ? options.state : null
			var title = options ? options.title : null
			$window.onpopstate()
			if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path)
			else $window.history.pushState(state, title, router.prefix + path)
		}
		else $window.location.href = router.prefix + path
	}
	router.defineRoutes = function(routes, resolve, reject) {
		function resolveRoute() {
			var path = router.getPath()
			var params = {}
			var pathname = parsePath(path, params, params)
			var state = $window.history.state
			if (state != null) {
				for (var k in state) params[k] = state[k]
			}
			for (var route0 in routes) {
				var matcher = new RegExp("^" + route0.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
				if (matcher.test(pathname)) {
					pathname.replace(matcher, function() {
						var keys = route0.match(/:[^\/]+/g) || []
						var values = [].slice.call(arguments, 1, -2)
						for (var i = 0; i < keys.length; i++) {
							params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
						}
						resolve(routes[route0], params, path, route0)
					})
					return
				}
			}
			reject(path, params)
		}
		if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)
		else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute
		resolveRoute()
	}
	return router
}
var _20 = function($window, redrawService0) {
	var routeService = coreRouter($window)
	var identity = function(v) {return v}
	var render1, component, attrs3, currentPath, lastUpdate
	var route = function(root, defaultRoute, routes) {
		if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
		var run1 = function() {
			if (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)))
		}
		var bail = function(path) {
			if (path !== defaultRoute) routeService.setPath(defaultRoute, null, {replace: true})
			else throw new Error("Could not resolve default route " + defaultRoute)
		}
		routeService.defineRoutes(routes, function(payload, params, path) {
			var update = lastUpdate = function(routeResolver, comp) {
				if (update !== lastUpdate) return
				component = comp != null && (typeof comp.view === "function" || typeof comp === "function")? comp : "div"
				attrs3 = params, currentPath = path, lastUpdate = null
				render1 = (routeResolver.render || identity).bind(routeResolver)
				run1()
			}
			if (payload.view || typeof payload === "function") update({}, payload)
			else {
				if (payload.onmatch) {
					Promise.resolve(payload.onmatch(params, path)).then(function(resolved) {
						update(payload, resolved)
					}, bail)
				}
				else update(payload, "div")
			}
		}, bail)
		redrawService0.subscribe(root, run1)
	}
	route.set = function(path, data, options) {
		if (lastUpdate != null) {
			options = options || {}
			options.replace = true
		}
		lastUpdate = null
		routeService.setPath(path, data, options)
	}
	route.get = function() {return currentPath}
	route.prefix = function(prefix0) {routeService.prefix = prefix0}
	route.link = function(vnode1) {
		vnode1.dom.setAttribute("href", routeService.prefix + vnode1.attrs.href)
		vnode1.dom.onclick = function(e) {
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
			e.preventDefault()
			e.redraw = false
			var href = this.getAttribute("href")
			if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length)
			route.set(href, undefined, undefined)
		}
	}
	route.param = function(key3) {
		if(typeof attrs3 !== "undefined" && typeof key3 !== "undefined") return attrs3[key3]
		return attrs3
	}
	return route
}
m.route = _20(window, redrawService)
m.withAttr = function(attrName, callback1, context) {
	return function(e) {
		callback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
	}
}
var _28 = coreRenderer(window)
m.render = _28.render
m.redraw = redrawService.redraw
m.request = requestService.request
m.jsonp = requestService.jsonp
m.parseQueryString = parseQueryString
m.buildQueryString = buildQueryString
m.version = "1.1.6"
m.vnode = Vnode
if (true) module["exports"] = m
else {}
}());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/node_modules/timers-browserify/main.js */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/node_modules/timers-browserify/main.js").setImmediate, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Layout.js":
/*!************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Layout.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! ../mithril */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/mithril.js");
const Layouter_1 = __webpack_require__(/*! ./Layouter */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Layouter.js");
class Layout {
    getComponents(node) {
        return !Array.isArray(node.attrs.content) ? node.attrs.content :
            node.attrs.content.map((c) => {
                if (c.compClass) {
                    c.attrs.route = node.attrs.route;
                    return mithril_1.m(c.compClass, c.attrs);
                }
                else {
                    return c;
                }
            });
    }
    getCSS(node) {
        return node.attrs.css || '';
    }
    normalizeContent(components) {
        if (typeof components === 'string') {
            return [mithril_1.m('.hs-leaf', mithril_1.m.trust(components))];
        }
        if (components.length > 0) {
            return components.map((comp) => (comp instanceof Layout) ? comp : mithril_1.m(Layout, { content: comp }));
        }
        return [components];
    }
    view(node) {
        const content = this.normalizeContent(this.getComponents(node));
        let css = Layouter_1.Layouter.createLayout(node.attrs, content);
        const attrs = {
            style: node.style,
            route: node.attrs.route,
            onclick: node.attrs.onclick
        };
        node.attrs.route = undefined;
        if (node.attrs.href) {
            attrs.href = node.attrs.href;
            attrs.oncreate = mithril_1.m.route.link;
            attrs.onupdate = mithril_1.m.route.link;
        }
        return mithril_1.m(`.hs-layout ${css} ${this.getCSS(node)}`, attrs, content.map((c) => c));
    }
}
exports.Layout = Layout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvTGF5b3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBaUJBLHdDQUFzQztBQUN0Qyx5Q0FBc0M7QUF5QnRDLE1BQWEsTUFBTTtJQW9CTCxhQUFhLENBQUMsSUFBVTtRQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUssRUFBRSxFQUFFO2dCQUM3QixJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7b0JBQ2IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLE9BQU8sV0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQztxQkFBTTtvQkFDSCxPQUFPLENBQUMsQ0FBQztpQkFDWjtZQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQVFTLE1BQU0sQ0FBQyxJQUFVO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFHTyxnQkFBZ0IsQ0FBQyxVQUE2QztRQUNsRSxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxPQUFPLENBQUMsV0FBQyxDQUFDLFVBQVUsRUFBRSxXQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQztRQUNELElBQUksVUFBVSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUU7WUFDckIsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBeUIsRUFBUSxFQUFFLENBQ2xELENBQUMsSUFBSSxZQUFZLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FDakUsQ0FBQztTQUNMO1FBRUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFxQkQsSUFBSSxDQUFDLElBQVU7UUFDWCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksR0FBRyxHQUFHLG1CQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDckQsTUFBTSxLQUFLLEdBQU87WUFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1NBQzlCLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNqQixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzdCLEtBQUssQ0FBQyxRQUFRLEdBQUcsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDOUIsS0FBSyxDQUFDLFFBQVEsR0FBRyxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUNqQztRQUNELE9BQU8sV0FBQyxDQUFDLGNBQWMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0NBQ0o7QUEzRkQsd0JBMkZDIn0=

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Layouter.js":
/*!**************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Layouter.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Tokens_1 = __webpack_require__(/*! ./Tokens */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Tokens.js");
class Layouter {
    constructor(areaDesc) {
        this.areaDesc = areaDesc;
        this.spacing = 0;
    }
    static translate(params) {
        if (params.length === 0) {
            params.push('');
        }
        return params.map((param) => {
            if (typeof param === 'string') {
                if (param.endsWith('px')) {
                    return Tokens_1.px(parseInt(param));
                }
                if (param.endsWith('%')) {
                    return Tokens_1.pc(parseInt(param));
                }
                if (param.toLowerCase() === 'fill') {
                    return Tokens_1.FILL;
                }
            }
            else {
                return param;
            }
        });
    }
    static register(keyword, style) {
        Layouter.layoutStyles[keyword] = style;
    }
    static createLayout(attrs, components) {
        let css = '';
        Object.keys(Layouter.layoutStyles).some(key => {
            if (attrs[key]) {
                css = new Layouter.layoutStyles[key](Layouter.translate(attrs[key])).getStyles(components);
                attrs[key] = undefined;
                return true;
            }
            return false;
        });
        return css;
    }
    ;
}
Layouter.layoutStyles = {};
exports.Layouter = Layouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9MYXlvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVlBLHFDQUF3QztBQXlCeEMsTUFBc0IsUUFBUTtJQXlFMUIsWUFBbUIsUUFBc0I7UUFBdEIsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQVJ6QyxZQUFPLEdBQUcsQ0FBQyxDQUFDO0lBUWdDLENBQUM7SUF6RHJDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBd0I7UUFDN0MsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FBRTtRQUM3QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFnQixFQUFFLEVBQUU7WUFDbkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFBRSxPQUFPLFdBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFBRTtnQkFDekQsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUFFLE9BQU8sV0FBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUFFO2dCQUN4RCxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBRyxNQUFNLEVBQUU7b0JBQUUsT0FBTyxhQUFJLENBQUM7aUJBQUM7YUFDcEQ7aUJBQU07Z0JBQ0gsT0FBTyxLQUFLLENBQUM7YUFDaEI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFXTSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQWMsRUFBRSxLQUFxQjtRQUV4RCxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMzQyxDQUFDO0lBVU0sTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFTLEVBQUUsVUFBdUI7UUFDekQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNaLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDM0YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBVzRDLENBQUM7O0FBcEV2QyxxQkFBWSxHQUF1QixFQUFFLENBQUM7QUFMakQsNEJBMEZDIn0=

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/PillaredLayouter.js":
/*!**********************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/PillaredLayouter.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Layouter_1 = __webpack_require__(/*! ./Layouter */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Layouter.js");
const Tokens_1 = __webpack_require__(/*! ./Tokens */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Tokens.js");
exports.PillarLayouts = [
    'columns', 'rows'
];
const cParams = {
    columns: {
        cssClass: '.hs-column-layout',
        fields: ['top', 'bottom', 'left', 'right', 'height', 'width']
    },
    rows: {
        cssClass: '.hs-row-layout',
        fields: ['left', 'right', 'top', 'bottom', 'width', 'height']
    }
};
class PillarLayouter extends Layouter_1.Layouter {
    constructor(params, areaDesc) {
        super(areaDesc);
        this.areaDesc = areaDesc;
        this.fields = params.fields;
        this.cssClass = params.cssClass;
        let n = areaDesc.length - 1;
        let first = 0;
        let last = 0;
        this.unit = areaDesc.some((area) => (area instanceof Tokens_1.PixelToken)) ?
            this.unitPixel : this.unitPercent;
        areaDesc.some((area, i) => ((areaDesc[i] instanceof Tokens_1.DefinedToken) ? ++first < 0 : true));
        areaDesc.some((area, i) => ((areaDesc[n - i] instanceof Tokens_1.DefinedToken) ? ++last < 0 : true));
        this.firstFixed = first;
        this.lastFixed = Math.min(last, areaDesc.length - first);
    }
    ;
    getSizes(num) {
        const first = this.firstFixed;
        const last = this.lastFixed;
        const desc = this.areaDesc;
        const len = desc.length;
        return [...Array(num).keys()].map((i) => {
            let size = null;
            let t = null;
            if (i > num - 1 - last) {
                size = desc[len - (num - i)].getSize();
                t = 'end';
            }
            else if (i < first) {
                size = desc[i].getSize();
                t = 'start';
            }
            else if (len > 0 && len === first) {
                size = desc[len - 1].getSize();
                t = 'start';
            }
            return { size: size, code: t, fields: {} };
        });
    }
    unitPercent(num) {
        let f = this.fields;
        let max = 100.0;
        let styles = this.getSizes(num);
        styles.forEach(style => { if (style.size) {
            max = max - style.size;
            num--;
        } });
        let defDim = max / num;
        function pass(styles, ix0, ix1, breakCond) {
            let sumDim = 0;
            styles.some(style => {
                let size = style.size || defDim;
                if (breakCond(style.code)) {
                    return true;
                }
                style.fields[ix0] = sumDim + '%';
                sumDim += size;
                style.fields[ix1] = (100 - sumDim) + '%';
                style.fields[f[5]] = 'auto';
                return false;
            });
        }
        pass(styles, f[2], f[3], (e) => e === 'end');
        pass(styles.reverse(), f[3], f[2], (e) => e !== 'end');
        return styles.reverse();
    }
    ;
    unitPixel(num) {
        let styles = this.getSizes(num);
        let f = this.fields;
        let defDim = 100.0 / num;
        let sumDim = 0;
        styles.some((style, i) => {
            if (style.code === 'start') {
                style.fields[f[2]] = sumDim + 'px';
                sumDim += style.size + (this.spacing || 0) + (this.spacing || 0);
                style.fields[f[3]] = 'auto';
                style.fields[f[5]] = style.size + 'px';
            }
            else if (style.code === null) {
                style.fields[f[2]] = (sumDim > 0) ? (sumDim + 'px') : (i * defDim + '%');
                sumDim = -1;
                style.fields[f[3]] = (100 - (i + 1) * defDim) + '%';
                style.fields[f[5]] = 'auto';
            }
            else if (style.code === 'end') {
                return true;
            }
            return false;
        });
        sumDim = 0;
        styles.slice().reverse().some((style, i) => {
            style.fields[f[3]] = sumDim + 'px';
            if (style.code === 'end') {
                sumDim += style.size + (this.spacing || 0) + (this.spacing || 0);
                style.fields[f[2]] = 'auto';
                style.fields[f[5]] = style.size + 'px';
            }
            else {
                if (sumDim > 0 && style.code !== 'start') {
                    style.fields[f[5]] = 'auto';
                }
                return true;
            }
            return false;
        });
        return styles;
    }
    ;
    getStyles(components) {
        let f = this.fields;
        let styles = this.unit(components.length);
        components.map((c, i) => {
            c.style = `${f[0]}:0%; ${f[1]}:0%; `;
            Object.keys(styles[i].fields).forEach((st) => { c.style += `${st}: ${styles[i].fields[st]};`; });
        });
        return this.cssClass;
    }
    ;
}
;
class Columns extends PillarLayouter {
    constructor(areaDesc) {
        super(cParams[exports.PillarLayouts[0]], areaDesc);
        this.areaDesc = areaDesc;
    }
    ;
}
;
class Rows extends PillarLayouter {
    constructor(areaDesc) {
        super(cParams[exports.PillarLayouts[1]], areaDesc);
        this.areaDesc = areaDesc;
    }
    ;
}
;
Layouter_1.Layouter.register(exports.PillarLayouts[0], Columns);
Layouter_1.Layouter.register(exports.PillarLayouts[1], Rows);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlsbGFyZWRMYXlvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3L1BpbGxhcmVkTGF5b3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUEyQ0EseUNBQTBDO0FBQzFDLHFDQUV3QztBQWdCM0IsUUFBQSxhQUFhLEdBQUc7SUFDekIsU0FBUyxFQUFFLE1BQU07Q0FDcEIsQ0FBQztBQUtGLE1BQU0sT0FBTyxHQUFHO0lBQ1osT0FBTyxFQUFnQjtRQUNuQixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO0tBQ2hFO0lBQ0QsSUFBSSxFQUFnQjtRQUNoQixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0tBQ2hFO0NBQ0osQ0FBQztBQU9GLE1BQWUsY0FBZSxTQUFRLG1CQUFRO0lBYTFDLFlBQVksTUFBbUIsRUFBUyxRQUFzQjtRQUMxRCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFEb0IsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUUxRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBRWhDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksSUFBSSxHQUFJLENBQUMsQ0FBQztRQUVkLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLG1CQUFV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

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/TileLayouter.js":
/*!******************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/TileLayouter.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Layouter_1 = __webpack_require__(/*! ./Layouter */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Layouter.js");
const Tokens_1 = __webpack_require__(/*! ./Tokens */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Tokens.js");
class TileLayouter extends Layouter_1.Layouter {
    constructor(areaDesc) {
        super(areaDesc);
        this.areaDesc = areaDesc;
        this.unit = areaDesc.some((area) => (area instanceof Tokens_1.PixelToken)) ?
            this.unitPixel : this.unitPercent;
    }
    ;
    unitPercent(num) {
        const desc = this.areaDesc;
        const fill = this.areaDesc.some(a => (a instanceof Tokens_1.FillToken));
        const root = Math.sqrt(num);
        const rows = Math.round(root);
        let cols = Math.floor(root);
        if (root > cols) {
            cols++;
        }
        let width = (desc[0] instanceof Tokens_1.DefinedToken) ? desc[0].getSize() : undefined;
        let height = (desc[1] instanceof Tokens_1.DefinedToken) ? desc[1].getSize() : width;
        width = width || 100 / cols;
        height = height || 100 / rows;
        let left = 0;
        let top = 0;
        let styles = [...Array(num).keys()].map(i => {
            let r = 'auto';
            let w = width + '%';
            let b = 'auto';
            let h = height + '%';
            if ((left + 2 * width) > 100 && fill) {
                r = '0%';
                w = 'auto';
            }
            if ((top + 2 * height) > 100 && fill) {
                b = '0%';
                h = 'auto';
            }
            const style = `
                top: ${Math.floor(top)}%; bottom:${b};
                left: ${left}%;           right:${r};
                width: ${w};              height: ${h};
            `;
            if (Math.round(left += width) > 100 - Math.floor(width)) {
                left = 0;
                top += height;
            }
            return style;
        });
        return styles;
    }
    ;
    unitPixel(num) {
        const desc = this.areaDesc;
        const root = Math.sqrt(num);
        const rows = Math.round(root);
        let cols = Math.floor(root);
        if (root > cols) {
            cols++;
        }
        let width = (desc[0] instanceof Tokens_1.DefinedToken) ? desc[0].getSize() : undefined;
        let height = (desc[1] instanceof Tokens_1.DefinedToken) ? desc[1].getSize() : width;
        width = width || 100 / cols;
        height = height || 100 / rows;
        let left = 0;
        let top = 0;
        let styles = [...Array(num).keys()].map(i => {
            let r = 'auto';
            let w = width + 'px';
            let b = 'auto';
            let h = height + 'px';
            const style = `
                top: ${Math.floor(top)}%; bottom:${b};
                left: ${left}%;           right:${r};
                width: ${w};              height: ${h};
            `;
            if (Math.round(left += width) > 100 - Math.floor(width)) {
                left = 0;
                top += height;
            }
            return style;
        });
        return styles;
    }
    ;
    getStyles(components) {
        let styles = this.unit(components.length);
        components.map((c, i) => {
            c.style = styles[i];
        });
        return '.hs-tile-layout';
    }
    ;
}
;
Layouter_1.Layouter.register('tiles', TileLayouter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGlsZUxheW91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvVGlsZUxheW91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBOERBLHlDQUEwQztBQUMxQyxxQ0FHd0M7QUFPeEMsTUFBTSxZQUFhLFNBQVEsbUJBQVE7SUFRL0IsWUFBbUIsUUFBc0I7UUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBREQsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUlyQyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxtQkFBVSxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQzFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUMsQ0FBQztJQUFBLENBQUM7SUFFTSxXQUFXLENBQUMsR0FBVTtRQUMxQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzNCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksa0JBQVMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO1lBQUUsSUFBSSxFQUFFLENBQUM7U0FBRTtRQUM1QixJQUFJLEtBQUssR0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxxQkFBWSxDQUFDLENBQUEs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

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Tokens.js":
/*!************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/Tokens.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class LayoutToken {
    constructor(size) {
        this.size = size;
    }
    getSize() { return this.size; }
}
exports.LayoutToken = LayoutToken;
class DefinedToken extends LayoutToken {
    constructor(size) { super(size); }
}
exports.DefinedToken = DefinedToken;
class FillToken extends LayoutToken {
    constructor() { super(-1); }
}
exports.FillToken = FillToken;
class PixelToken extends DefinedToken {
    constructor(size) { super(size); }
}
exports.PixelToken = PixelToken;
class PercentToken extends DefinedToken {
    constructor(size) { super(size); }
}
exports.PercentToken = PercentToken;
function px(px) { return new PixelToken(px); }
exports.px = px;
function pc(pc) { return new PercentToken(pc); }
exports.pc = pc;
exports.FILL = new FillToken();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvVG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUEsTUFBc0IsV0FBVztJQUM3QixZQUFvQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFHLENBQUM7SUFDN0IsT0FBTyxLQUFLLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDekM7QUFIRCxrQ0FHQztBQUtELE1BQXNCLFlBQWEsU0FBUSxXQUFXO0lBQ2xELFlBQVksSUFBWSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDN0M7QUFGRCxvQ0FFQztBQUtELE1BQWEsU0FBVSxTQUFRLFdBQVc7SUFDdEMsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUMvQjtBQUZELDhCQUVDO0FBS0QsTUFBYSxVQUFXLFNBQVEsWUFBWTtJQUN4QyxZQUFZLElBQVcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzVDO0FBRkQsZ0NBRUM7QUFLRCxNQUFhLFlBQWEsU0FBUSxZQUFZO0lBQzFDLFlBQVksSUFBVyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDNUM7QUFGRCxvQ0FFQztBQU1ELFNBQWdCLEVBQUUsQ0FBQyxFQUFTLElBQU0sT0FBTyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFBOUQsZ0JBQThEO0FBTTlELFNBQWdCLEVBQUUsQ0FBQyxFQUFTLElBQU0sT0FBTyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFBaEUsZ0JBQWdFO0FBS25ELFFBQUEsSUFBSSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUMifQ==

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/node_modules/process/browser.js":
/*!*************************************************!*\
  !*** (webpack)/node_modules/process/browser.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/node_modules/setimmediate/setImmediate.js":
/*!***********************************************************!*\
  !*** (webpack)/node_modules/setimmediate/setImmediate.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buildin/global.js */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/node_modules/process/browser.js")))

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/node_modules/timers-browserify/main.js":
/*!********************************************************!*\
  !*** (webpack)/node_modules/timers-browserify/main.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buildin/global.js */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./bin/Button.js":
/*!***********************!*\
  !*** ./bin/Button.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ToggleButton_1 = __webpack_require__(/*! ./ToggleButton */ "./bin/ToggleButton.js");
class Button extends ToggleButton_1.ToggleButton {
    oninit(node) {
        node.attrs.desc.items = [node.attrs.desc.name || 'button'];
        super.oninit(node);
        ToggleButton_1.ToggleButton.ensureSelected(node);
    }
}
exports.Button = Button;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0J1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWdDQSxpREFBOEM7QUFlOUMsTUFBYSxNQUFPLFNBQVEsMkJBQVk7SUFDcEMsTUFBTSxDQUFDLElBQVc7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLENBQUM7UUFDM0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQiwyQkFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0o7QUFORCx3QkFNQyJ9

/***/ }),

/***/ "./bin/Collapsible.js":
/*!****************************!*\
  !*** ./bin/Collapsible.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
class Collapsible {
    oninit(node) {
        node.state = {
            initial: true,
            expanded: false,
            toggle: () => {
                node.state.expanded = !node.state.expanded;
                node.state.initial = false;
            }
        };
    }
    view(node) {
        const css = node.attrs.css;
        const components = node.attrs.components;
        const preArrow = node.attrs.preArrow;
        const postArrow = node.attrs.postArrow;
        if (node.state.initial && node.attrs.isExpanded !== undefined) {
            node.state.expanded = node.attrs.isExpanded;
        }
        const expCSS = node.state.expanded ? 'hs-collapsible-expanded' : '';
        return hslayout_1.m(`.hs-collapsible ${css}`, [
            hslayout_1.m('.hs-collapsible-title', { onclick: node.state.toggle }, [
                !preArrow ? hslayout_1.m('') : hslayout_1.m(`.hs-collapsible-pre .hs-collapsible-arrow-${node.state.expanded ? 'down' : 'right'}`),
                components[0],
                !postArrow ? hslayout_1.m('') : hslayout_1.m(`.hs-collapsible-post .hs-collapsible-arrow-${node.state.expanded ? 'down' : 'left'}`),
            ]),
            components[1] ? hslayout_1.m(`.hs-collapsible-content ${expCSS}`, components[1].map((c) => hslayout_1.m('', c))) : undefined
        ]);
    }
}
exports.Collapsible = Collapsible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFwc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ29sbGFwc2libGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpREEsdUNBQW9DO0FBRXBDLE1BQWEsV0FBVztJQUNwQixNQUFNLENBQUMsSUFBVTtRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDL0IsQ0FBQztTQUNKLENBQUM7SUFDTixDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQVU7UUFDWCxNQUFNLEdBQUcsR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUN6QyxNQUFNLFFBQVEsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN2QyxNQUFNLFNBQVMsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN4QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFHLFNBQVMsRUFBRTtZQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztTQUMvQztRQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQSx5QkFBeUIsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFDO1FBQ2hFLE9BQU8sWUFBQyxDQUFDLG1CQUFtQixHQUFHLEVBQUUsRUFBRTtZQUMvQixZQUFDLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxPQUFPLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsRUFBRTtnQkFDckQsQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFDLFlBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBQyxDQUFDLDZDQUE2QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQSxDQUFDLENBQUEsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekcsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDYixDQUFDLFNBQVMsQ0FBQSxDQUFDLENBQUMsWUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFDLENBQUMsOENBQThDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzdHLENBQUM7WUFDRixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLFlBQUMsQ0FBQywyQkFBMkIsTUFBTSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUssRUFBRSxFQUFFLENBQUEsWUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDMUcsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBN0JELGtDQTZCQyJ9

/***/ }),

/***/ "./bin/Label.js":
/*!**********************!*\
  !*** ./bin/Label.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
class Label {
    view(node) {
        const css = node.attrs.css || '';
        const style = node.attrs.style || '';
        const text = node.attrs.text || 'unspecified';
        return hslayout_1.m(`.hs-label ${css}`, { style: style }, hslayout_1.m.trust(text));
    }
}
exports.Label = Label;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFnQ0EsdUNBQXdDO0FBWXhDLE1BQWEsS0FBSztJQUNkLElBQUksQ0FBQyxJQUFXO1FBQ1osTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxNQUFNLElBQUksR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxhQUFhLENBQUM7UUFDL0MsT0FBTyxZQUFDLENBQUMsYUFBYSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBQyxLQUFLLEVBQUUsRUFBRSxZQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztDQUNKO0FBUEQsc0JBT0MifQ==

/***/ }),

/***/ "./bin/Menu.js":
/*!*********************!*\
  !*** ./bin/Menu.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RadioButton_1 = __webpack_require__(/*! ./RadioButton */ "./bin/RadioButton.js");
class Menu extends RadioButton_1.RadioButton {
    view(node) { return RadioButton_1.RadioButton.viewGroup('.hs-menu', node); }
}
exports.Menu = Menu;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBd0RBLCtDQUE2QztBQU03QyxNQUFhLElBQUssU0FBUSx5QkFBVztJQUNqQyxJQUFJLENBQUMsSUFBVyxJQUFXLE9BQU8seUJBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUMvRTtBQUZELG9CQUVDO0FBQUEsQ0FBQyJ9

/***/ }),

/***/ "./bin/Modal.js":
/*!**********************!*\
  !*** ./bin/Modal.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
const ToolbarButton_1 = __webpack_require__(/*! ./ToolbarButton */ "./bin/ToolbarButton.js");
class Modal {
    oninit(node) {
        node.state.id = Math.floor(Math.random() * 1000);
        node.state.showModal = false;
    }
    view(node) {
        const trigger = () => {
            node.state.showModal = true;
            hslayout_1.m.redraw();
        };
        const dismiss = () => {
            node.state.showModal = false;
            if (node.attrs.dismiss) {
                node.attrs.dismiss();
            }
        };
        const w = node.attrs.width || 'auto';
        const h = node.attrs.height || 'auto';
        const attrs = { style: `width:${w}; height:${h};` };
        if (node.attrs.setTrigger) {
            node.attrs.setTrigger(trigger);
        }
        else {
            console.log(`required attribute function 'setTrigger' is not defined`);
        }
        return !node.state.showModal ? hslayout_1.m('span') : hslayout_1.m('.hs-modal-frame', [
            hslayout_1.m('.hs-modal-background', { onclick: dismiss }, ''),
            hslayout_1.m('.hs-modal-foreground', attrs, !node.attrs.content ? 'modal pane' : [
                node.attrs.content,
                hslayout_1.m(ToolbarButton_1.ToolbarButton, { onclick: dismiss, symbols: ToolbarButton_1.ToolbarButton.getSymbol('cross') })
            ])
        ]);
    }
}
exports.Modal = Modal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvTW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFvQ0EsdUNBQW9DO0FBQ3BDLG1EQUFnRDtBQUVoRCxNQUFhLEtBQUs7SUFDZCxNQUFNLENBQUMsSUFBVTtRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQVU7UUFDWCxNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzVCLFlBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQztRQUNGLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTtZQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQUU7UUFDckQsQ0FBQyxDQUFDO1FBQ0YsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUssTUFBTSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztRQUN0QyxNQUFNLEtBQUssR0FBRyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBQyxDQUFDO1FBQ25ELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUFFO2FBQ3pEO1lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO1NBQUU7UUFDaEYsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFBLENBQUMsQ0FBQyxZQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQUMsQ0FBQyxpQkFBaUIsRUFBRTtZQUMzRCxZQUFDLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2xELFlBQUMsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO2dCQUNsQixZQUFDLENBQUMsNkJBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLDZCQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7YUFDbkYsQ0FBQztTQUNMLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTNCRCxzQkEyQkMifQ==

/***/ }),

/***/ "./bin/OptionsButton.js":
/*!******************************!*\
  !*** ./bin/OptionsButton.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
const hslayout_2 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
const Selector_1 = __webpack_require__(/*! ./Selector */ "./bin/Selector.js");
const Selector_2 = __webpack_require__(/*! ./Selector */ "./bin/Selector.js");
class OptionsButton extends Selector_1.Selector {
    oninit(node) {
        Selector_1.Selector.init(node, Selector_2.anyItems);
    }
    static viewGroup(css, node) {
        css = `${css} ${node.attrs.css || ''}`;
        const style = node.attrs.style || '';
        return hslayout_1.m(css, { style: style }, hslayout_1.m(hslayout_2.Layout, {
            columns: [],
            content: node.state.items.map((l, i) => Selector_1.Selector.renderItem(node, i))
        }));
    }
    view(node) { return OptionsButton.viewGroup('.hs-options-buttons', node); }
}
exports.OptionsButton = OptionsButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3B0aW9uc0J1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9PcHRpb25zQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBK0JBLHVDQUF5QztBQUN6Qyx1Q0FBeUM7QUFDekMseUNBQTJDO0FBQzNDLHlDQUEyQztBQWtCM0MsTUFBYSxhQUFjLFNBQVEsbUJBQVE7SUFDdkMsTUFBTSxDQUFDLElBQVU7UUFDYixtQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsbUJBQVEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQVUsRUFBRSxJQUFXO1FBQ3BDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUN2QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFFckMsT0FBTyxZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxFQUFFLFlBQUMsQ0FBQyxpQkFBTSxFQUFFO1lBQ25DLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVEsRUFBRSxDQUFRLEVBQUUsRUFBRSxDQUFDLG1CQUFRLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0RixDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBVyxJQUFXLE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDNUY7QUFkRCxzQ0FjQyJ9

/***/ }),

/***/ "./bin/RadioButton.js":
/*!****************************!*\
  !*** ./bin/RadioButton.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
const hslayout_2 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
const Selector_1 = __webpack_require__(/*! ./Selector */ "./bin/Selector.js");
class RadioButton extends Selector_1.Selector {
    static viewGroup(css, node) {
        css = `${css} ${node.attrs.css || ''}`;
        const style = node.attrs.style || '';
        return hslayout_1.m(css, { style: style }, hslayout_1.m(hslayout_2.Layout, {
            columns: [],
            content: node.state.items.map((l, i) => Selector_1.Selector.renderItem(node, i))
        }));
    }
    oninit(node) {
        super.oninit(node);
        Selector_1.Selector.ensureSelected(node);
    }
    onupdate(node) {
        super.onupdate(node);
        Selector_1.Selector.ensureSelected(node);
    }
    view(node) { return RadioButton.viewGroup('.hs-radio-buttons', node); }
}
exports.RadioButton = RadioButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9CdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmFkaW9CdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpQ0EsdUNBQTRDO0FBQzVDLHVDQUE0QztBQUM1Qyx5Q0FBOEM7QUFrQjlDLE1BQWEsV0FBWSxTQUFRLG1CQUFRO0lBQ3JDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBVSxFQUFFLElBQVc7UUFDcEMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUVyQyxPQUFPLFlBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEVBQUUsWUFBQyxDQUFDLGlCQUFNLEVBQUU7WUFDbkMsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUSxFQUFFLENBQVEsRUFBRSxFQUFFLENBQUMsbUJBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3RGLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFXO1FBQ2QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixtQkFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQVc7UUFDaEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixtQkFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQVcsSUFBVyxPQUFPLFdBQVcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3hGO0FBbkJELGtDQW1CQyJ9

/***/ }),

/***/ "./bin/Selector.js":
/*!*************************!*\
  !*** ./bin/Selector.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
function oneOfItems(items, title) {
    items.forEach((item) => {
        item.isSelected = (item.title === title);
    });
    if (!items.some((item) => item.isSelected)) {
        items[0].isSelected = true;
    }
    return items.filter((item) => item.isSelected)[0];
}
exports.oneOfItems = oneOfItems;
function anyItems(items, title) {
    items[title].isSelected = !items[title].isSelected;
    return items[title];
}
exports.anyItems = anyItems;
class Selector {
    static updateItems(node) {
        const items = node.attrs.desc.items || [];
        items.map((itm, i) => {
            const item = node.state.items[itm] || {
                title: itm,
                isSelected: false
            };
            node.state.items[i] = item;
            node.state.items[itm] = item;
        });
    }
    static init(node, model = oneOfItems) {
        node.state = {
            updateModel: model,
            items: [],
            events: {},
            itemClicked: (item) => item,
            defaultItem: node.attrs.desc.defaultItem
        };
        node.state.events.mouseDown = node.attrs.desc.mouseDown;
        node.state.events.mouseUp = node.attrs.desc.mouseUp;
        node.attrs.desc.clicked = node.attrs.desc.clicked || ((item) => console.log(`missing clicked() function for selector item ${item}`));
        node.state.events.clicked = node.attrs.desc.clicked;
        Selector.updateItems(node);
    }
    oninit(node) {
        Selector.init(node);
    }
    onupdate(node) {
        Selector.updateItems(node);
    }
    static ensureSelected(node) {
        if (!node.state.items.some((i) => i.isSelected) && node.state.items.length > 0) {
            if (node.state.defaultItem && node.state.items[node.state.defaultItem]) {
                node.state.items[node.state.defaultItem].isSelected = true;
            }
            else {
                node.state.items[0].isSelected = true;
            }
        }
    }
    static renderItem(node, i) {
        const reactor = (callback) => (title) => {
            node.state.updateModel(node.state.items, title);
            title = node.state.itemClicked(title);
            if (typeof callback === 'function') {
                callback(title);
            }
        };
        if (i < 0) {
            console.log(`illegal render index ${i} ${node.state.items.map((i) => i.title).join('|')}`);
            i = 0;
        }
        const item = node.state.items[i];
        const title = item.title || '';
        const itemCss = item.css || '';
        return renderSelectable({
            title: title,
            css: itemCss,
            isSelected: node.state.items[title] ? node.state.items[title].isSelected : false,
            mouseDown: node.state.events.mouseDown,
            mouseUp: node.state.events.mouseUp,
            clicked: reactor(node.state.events.clicked)
        });
    }
}
exports.Selector = Selector;
;
function renderSelectable(d) {
    const onclick = d.clicked ? () => { d.clicked(d.title); } : undefined;
    const onmousedown = d.mouseDown ? () => { d.mouseDown(d.title); } : undefined;
    const onmouseup = d.mouseUp ? () => { d.mouseUp(d.title); } : undefined;
    return hslayout_1.m(`.hs-selectable ${d.css || ''} ${d.isSelected ? 'hs-selected' : ''}`, { style: d.style, onclick: onclick, onmousedown: onmousedown, onmouseup: onmouseup }, d.title);
}
exports.renderSelectable = renderSelectable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU2VsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFxQkEsdUNBQW9DO0FBK0NwQyxTQUFnQixVQUFVLENBQUMsS0FBc0IsRUFBRSxLQUFZO0lBQzNELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFtQixFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUcsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0tBQUU7SUFDMUYsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBbUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7QUFORCxnQ0FNQztBQU1ELFNBQWdCLFFBQVEsQ0FBQyxLQUFzQixFQUFFLEtBQVk7SUFDekQsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDbkQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUhELDRCQUdDO0FBcUJELE1BQXNCLFFBQVE7SUFLMUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFVO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDMUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVUsRUFBRSxDQUFRLEVBQUUs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

/***/ }),

/***/ "./bin/Slider.js":
/*!***********************!*\
  !*** ./bin/Slider.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
class Slider {
    oninit(node) {
        node.state = {
            range: [],
            value: 0.5,
            mouse: -1,
            slider: 0,
            notified: '',
            onchange: () => { }
        };
    }
    view(node) {
        const id = node.attrs.id;
        const css = node.attrs.css || '';
        node.state.range = node.attrs.range || [];
        node.state.onchange = node.attrs.onchange;
        return hslayout_1.m(`.hs-slider ${css}`, {
            id: id,
            onmousedown: (e) => mousedown(e, node),
            onmousemove: (e) => mousemove(e, node),
            onmouseup: (e) => mouseup(e, node),
            onmouseout: (e) => mouseout(e, node)
        }, [renderSlider(node)]);
    }
}
exports.Slider = Slider;
function renderSlider(node) {
    return hslayout_1.m('.hs-slider-slot', [
        hslayout_1.m('.hs-slider-markers', node.state.range.map(renderMarker)),
        hslayout_1.m('.hs-slider-handle', { style: `left:${100 * node.state.value}%` })
    ]);
}
function renderMarker(value, i, markers) {
    const share = i / (markers.length - 1);
    const left = markers.length < 2 ? 0 : 100 * share;
    return hslayout_1.m('.hs-slider-marker', { style: `left: ${left}%` }, renderLabel(value));
}
function renderLabel(value) {
    return hslayout_1.m('.hs-slider-label', value);
}
function getTargetOffset(e) {
    let target = e.target;
    let leftOffset = 0;
    while (target.className.trim() !== e.currentTarget.className.trim()) {
        leftOffset += target.offsetLeft;
        target = target.parentNode;
    }
    return leftOffset - target.lastChild.offsetLeft;
}
function getValue(e, node) {
    e.stopPropagation();
    e.preventDefault();
    const slotWidth = e.currentTarget.lastChild.clientWidth;
    node.state.value = (e.clientX - node.state.mouse) / slotWidth + node.state.slider;
    return notify(node);
}
function mousedown(e, node) {
    const offset = getTargetOffset(e);
    node.state.mouse = e.clientX;
    if (['hs-slider', 'hs-slider-slot'].indexOf(e.target.className.trim()) >= 0) {
        const slotWidth = e.currentTarget.lastChild.clientWidth;
        const handleWidth = e.currentTarget.lastChild.lastChild.clientWidth;
        node.state.mouse -= handleWidth / 2;
        node.state.value = (e.offsetX - handleWidth / 2 + offset) / slotWidth;
    }
    node.state.slider = node.state.value;
    getValue(e, node);
}
function mousemove(e, node) {
    if (node.state.mouse > 0) {
        getValue(e, node);
        if (node.state.value > 1 || node.state.value < 0) {
            mouseup(e, node);
        }
    }
}
function mouseup(e, node) {
    if (node.state.mouse > 0) {
        node.state.value = getValue(e, node);
        node.state.mouse = -1;
    }
}
function mouseout(e, node) {
    if (node.state.mouse > 0 && e.target.className.trim() === 'hs-slider') {
        mouseup(e, node);
    }
}
function notify(node) {
    if ((node.state.range.length > 1) && (typeof node.state.range[0] === 'string')) {
        const v = Math.floor(node.state.value * (node.state.range.length - 1) + 0.5);
        if (node.state.notified !== node.state.range[v]) {
            node.state.onchange(node.state.range[v]);
            node.state.notified = node.state.range[v];
        }
        return v / (node.state.range.length - 1);
    }
    else {
        const numRange = node.state.range;
        const v = Math.floor((numRange[0] * (1 - node.state.value) + numRange[1] * node.state.value) * 100) / 100;
        node.state.onchange(Math.min(node.state.range[1], Math.max(node.state.range[0], v)));
        return node.state.value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTBDQSx1Q0FBb0M7QUFvQnBDLE1BQWEsTUFBTTtJQUNmLE1BQU0sQ0FBQyxJQUFVO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULEtBQUssRUFBZSxFQUFFO1lBQ3RCLEtBQUssRUFBRSxHQUFHO1lBQ1YsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUNULE1BQU0sRUFBQyxDQUFDO1lBQ1IsUUFBUSxFQUFDLEVBQUU7WUFDWCxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUNELElBQUksQ0FBQyxJQUFXO1FBQ1osTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUMxQyxPQUFPLFlBQUMsQ0FBQyxjQUFjLEdBQUcsRUFBRSxFQUFFO1lBQzFCLEVBQUUsRUFBQyxFQUFFO1lBQ0wsV0FBVyxFQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUN6QyxXQUFXLEVBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDO1lBQ3pDLFNBQVMsRUFBQyxDQUFDLENBQUssRUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7WUFDdkMsVUFBVSxF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

/***/ }),

/***/ "./bin/ToggleButton.js":
/*!*****************************!*\
  !*** ./bin/ToggleButton.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
const Selector_1 = __webpack_require__(/*! ./Selector */ "./bin/Selector.js");
class ToggleButton extends Selector_1.Selector {
    oninit(node) {
        super.oninit(node);
        node.state.mouseDownCSS = '';
        node.state.events.mouseDown = () => node.state.mouseDownCSS = '.hs-button-pressed';
        node.state.events.mouseUp = () => node.state.mouseDownCSS = '';
        node.state.itemClicked = (title) => {
            const i = node.state.items.map((i) => i.title).indexOf(title);
            const newTitle = node.state.items[(i + 1) % node.state.items.length].title;
            node.state.items[title].isSelected = false;
            node.state.items[newTitle].isSelected = true;
            return newTitle;
        };
        Selector_1.Selector.ensureSelected(node);
    }
    onupdate(node) {
        super.onupdate(node);
        Selector_1.Selector.ensureSelected(node);
    }
    view(node) {
        const css = node.attrs.css || '';
        const style = node.attrs.style || '';
        const i = node.state.items.findIndex((i) => i.isSelected);
        return hslayout_1.m(`.hs-toggle-button ${css} ${node.state.mouseDownCSS}`, { style: style }, hslayout_1.m('span', Selector_1.Selector.renderItem(node, i)));
    }
}
exports.ToggleButton = ToggleButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9nZ2xlQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1RvZ2dsZUJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWlDQSx1Q0FBb0Q7QUFDcEQseUNBQXNEO0FBbUJ0RCxNQUFhLFlBQWEsU0FBUSxtQkFBUTtJQUN0QyxNQUFNLENBQUMsSUFBVTtRQUNiLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxvQkFBb0IsQ0FBQztRQUNuRixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRWpFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFFLENBQUMsS0FBWSxFQUFPLEVBQUU7WUFDMUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBZ0IsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDekUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQzdDLE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUMsQ0FBQztRQUNGLG1CQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBVztRQUNoQixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLG1CQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBVztRQUNaLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDckMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXpFLE9BQU8sWUFBQyxDQUFDLHFCQUFxQixHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBQyxLQUFLLEVBQUMsRUFBRSxZQUFDLENBQUMsTUFBTSxFQUNwRixtQkFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQy9CLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTdCRCxvQ0E2QkMifQ==

/***/ }),

/***/ "./bin/ToolbarButton.js":
/*!******************************!*\
  !*** ./bin/ToolbarButton.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
exports.ButtonSymbols = {
    cross: { sym: '&times;' },
    minus: { sym: '&minus;' },
    plus: { sym: '+' },
    dLeft: { sym: '&laquo;' },
    dRight: { sym: '&raquo;' },
    left: { sym: '&lsaquo;' },
    right: { sym: '&rsaquo;' },
    leftTri: { sym: '&ltrif;' },
    rightTri: { sym: '&rtrif;' },
    upTri: { sym: '&utrif;' },
    downTri: { sym: '&dtrif;' },
    up: { sym: '&and;' },
    down: { sym: '&or;' },
    lArrow: { sym: '&larr;' },
    rArrow: { sym: '&rarr;' },
    uArrow: { sym: '&uarr;' },
    dArrow: { sym: '&darr;' },
    empty: { sym: '&#9675;' },
    emptySlash: { sym: '&empty;' },
    oSlash: { sym: '&oslash;' },
    o: { sym: '&omicron;' },
    lines3: { sym: '&equiv;' },
    sum: { sym: '&Sigma;' },
    ellipsis: { sym: '&hellip;' },
    vertEllips: { sym: '&#8285;' },
    bullet: { sym: '&bull;' },
    enter: { sym: '&crarr;' },
    again: { sym: '&#8635;' },
    start: { sym: '&#8689;' },
    end: { sym: '&#8690;' }
};
class ToolbarButton {
    static getSymbol(name) {
        return exports.ButtonSymbols[name] ? exports.ButtonSymbols[name].sym : '';
    }
    view(node) {
        if (typeof node.attrs.symbols === 'string') {
            return hslayout_1.m('.hs-corner-button', { onclick: node.attrs.onclick }, hslayout_1.m.trust(node.attrs.symbols));
        }
        else {
            return hslayout_1.m('.hs-corner-button', { onclick: node.attrs.onclick }, node.attrs.symbols.map((sym) => hslayout_1.m.trust(sym)));
        }
    }
}
exports.ToolbarButton = ToolbarButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbGJhckJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Ub29sYmFyQnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBMkVBLHVDQUFvQztBQUV2QixRQUFBLGFBQWEsR0FBRztJQUN6QixLQUFLLEVBQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFO0lBQzlCLEtBQUssRUFBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUM7SUFDN0IsSUFBSSxFQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBQztJQUN2QixLQUFLLEVBQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQzdCLE1BQU0sRUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUM7SUFDN0IsSUFBSSxFQUFRLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQztJQUM5QixLQUFLLEVBQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFDO0lBQzlCLE9BQU8sRUFBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUM7SUFDN0IsUUFBUSxFQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQztJQUM3QixLQUFLLEVBQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQzdCLE9BQU8sRUFBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUM7SUFDN0IsRUFBRSxFQUFVLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBQztJQUMzQixJQUFJLEVBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFDO0lBQzFCLE1BQU0sRUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUM7SUFDNUIsTUFBTSxFQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBQztJQUM1QixNQUFNLEVBQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFDO0lBQzVCLE1BQU0sRUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUM7SUFDNUIsS0FBSyxFQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQztJQUM3QixVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQzdCLE1BQU0sRUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUM7SUFDOUIsQ0FBQyxFQUFXLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBQztJQUMvQixNQUFNLEVBQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQzdCLEdBQUcsRUFBUyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUM7SUFDN0IsUUFBUSxFQUFJLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBQztJQUM5QixVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQzdCLE1BQU0sRUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUM7SUFDNUIsS0FBSyxFQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQztJQUM3QixLQUFLLEVBQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDO0lBQzdCLEtBQUssRUFBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUM7SUFDN0IsR0FBRyxFQUFTLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQztDQUNoQyxDQUFDO0FBRUYsTUFBYSxhQUFhO0lBRXRCLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBVztRQUN4QixPQUFPLHFCQUFhLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLHFCQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDN0QsQ0FBQztJQUNELElBQUksQ0FBQyxJQUFVO1FBQ1gsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUN4QyxPQUFPLFlBQUMsQ0FBQyxtQkFBbUIsRUFDeEIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFDL0IsWUFBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUM5QixDQUFDO1NBQ0w7YUFBTTtZQUNILE9BQU8sWUFBQyxDQUFDLG1CQUFtQixFQUNwQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFVLEVBQUUsRUFBRSxDQUFBLFlBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDMUQsQ0FBQztTQUNMO0lBQ0wsQ0FBQztDQUNKO0FBbEJELHNDQWtCQyJ9

/***/ }),

/***/ "./bin/TypeAhead.js":
/*!**************************!*\
  !*** ./bin/TypeAhead.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
function emphasize(item, match) {
    const re = new RegExp(match, 'gi');
    const decorations = item
        .replace(re, (m) => `<b>${m}</b>`)
        .split('<')
        .map((s) => {
        if (s.startsWith('/b>')) {
            return hslayout_1.m('span', { name: item }, s.slice(3));
        }
        else if (s.startsWith('b>')) {
            return hslayout_1.m('b', { name: item }, s.slice(2));
        }
        else {
            return hslayout_1.m('span', { name: item }, s);
        }
    });
    return hslayout_1.m('span', decorations);
}
class GetList {
    constructor(list, map) {
        this.list = [];
        if (typeof list === 'string') {
            hslayout_1.m.request({ method: "GET", url: list })
                .then((data) => this.captureList(data, map));
        }
        else {
            this.captureList(list, map);
        }
    }
    captureList(list, map) {
        this.list = map ? map(list) : list;
    }
}
class TypeAhead {
    oninit(node) {
        node.state.inputNode = '';
        node.state.hidePopdown = true;
        node.state.value = '';
        node.state.typeAheadList = [];
        node.state.onsubmit = node.attrs.onsubmit;
        node.state.list = node.attrs.list;
    }
    view(node) {
        const gl = new GetList(node.state.list);
        const nosubmit = () => console.log('no submit function defined');
        const submit = (v) => {
            node.state.inputNode.setSelectionRange(0, node.state.inputNode.value.length);
            node.state.hidePopdown = true;
            return node.state.onsubmit ? node.state.onsubmit(v) : nosubmit();
        };
        const select = (e) => {
            if (e) {
                node.state.inputNode.value = e.target.attributes.name.value;
                submit(e.target.attributes.name.value);
            }
        };
        const input = (e) => {
            const n = node.state.inputNode = e.target;
            const input = node.state.value = n.value;
            const withinInput = new RegExp(`${input}`, 'gi');
            const beginningOfInput = new RegExp(`^${input}`, 'gi');
            node.state.typeAheadList = gl.list.filter((l) => l.match(withinInput));
            n.value = node.state.typeAheadList.filter((l) => l.match(beginningOfInput))[0] || input;
            node.state.hidePopdown = n.value.length === 0;
            let pos = input.length;
            n.setSelectionRange(pos, n.value.length);
        };
        const keyPressed = (e) => {
            const n = node.state.inputNode = e.target;
            if (e.code === 'Enter') {
                submit(n.value);
            }
            else if (e.code === 'Backspace') {
                const input = n.firstChild.data;
                if (input.length > 0) {
                    n.value = input.slice(0);
                }
            }
        };
        const inputNode = {
            contenteditable: true,
            placeholder: node.attrs.placeholder,
            autofocus: node.attrs.autofocus || true,
            onkeydown: keyPressed,
            oninput: input
        };
        return hslayout_1.m('.hs-form', [
            hslayout_1.m(`input.hs-typeahead-input${node.state.value ? '.hs-typeahead-value' : '.hs-typeahead-placeholder'}`, inputNode, hslayout_1.m.trust(node.state.value ? node.state.value : node.attrs.placeholder)),
            node.state.hidePopdown ? undefined :
                hslayout_1.m('.hs-typeahead-list', node.state.typeAheadList.map((l) => hslayout_1.m('', { onclick: select }, emphasize(l, node.state.value))))
        ]);
    }
}
exports.TypeAhead = TypeAhead;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZUFoZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1R5cGVBaGVhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTBDQSx1Q0FBb0M7QUFHcEMsU0FBUyxTQUFTLENBQUMsSUFBVyxFQUFFLEtBQVk7SUFDeEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLE1BQU0sV0FBVyxHQUFHLElBQUk7U0FDbkIsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUN4QyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUU7UUFDZCxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckIsT0FBTyxZQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QzthQUFNLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQixPQUFPLFlBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDSCxPQUFPLFlBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLE9BQU8sWUFBQyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBRUQsTUFBTSxPQUFPO0lBS1QsWUFBWSxJQUFvQixFQUFFLEdBQTJCO1FBSnRELFNBQUksR0FB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

/***/ }),

/***/ "./bin/index.js":
/*!**********************!*\
  !*** ./bin/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Menu_1 = __webpack_require__(/*! ./Menu */ "./bin/Menu.js");
exports.Menu = Menu_1.Menu;
var Button_1 = __webpack_require__(/*! ./Button */ "./bin/Button.js");
exports.Button = Button_1.Button;
var Label_1 = __webpack_require__(/*! ./Label */ "./bin/Label.js");
exports.Label = Label_1.Label;
var Slider_1 = __webpack_require__(/*! ./Slider */ "./bin/Slider.js");
exports.Slider = Slider_1.Slider;
var RadioButton_1 = __webpack_require__(/*! ./RadioButton */ "./bin/RadioButton.js");
exports.RadioButton = RadioButton_1.RadioButton;
var OptionsButton_1 = __webpack_require__(/*! ./OptionsButton */ "./bin/OptionsButton.js");
exports.OptionsButton = OptionsButton_1.OptionsButton;
var ToggleButton_1 = __webpack_require__(/*! ./ToggleButton */ "./bin/ToggleButton.js");
exports.ToggleButton = ToggleButton_1.ToggleButton;
var ToolbarButton_1 = __webpack_require__(/*! ./ToolbarButton */ "./bin/ToolbarButton.js");
exports.ToolbarButton = ToolbarButton_1.ToolbarButton;
var ToolbarButton_2 = __webpack_require__(/*! ./ToolbarButton */ "./bin/ToolbarButton.js");
exports.ButtonSymbols = ToolbarButton_2.ButtonSymbols;
var Collapsible_1 = __webpack_require__(/*! ./Collapsible */ "./bin/Collapsible.js");
exports.Collapsible = Collapsible_1.Collapsible;
var Modal_1 = __webpack_require__(/*! ./Modal */ "./bin/Modal.js");
exports.Modal = Modal_1.Modal;
var TypeAhead_1 = __webpack_require__(/*! ./TypeAhead */ "./bin/TypeAhead.js");
exports.TypeAhead = TypeAhead_1.TypeAhead;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSwrQkFBc0M7QUFBN0Isc0JBQUEsSUFBSSxDQUFBO0FBRWIsbUNBQXdDO0FBQS9CLDBCQUFBLE1BQU0sQ0FBQTtBQUNmLGlDQUF1QztBQUE5Qix3QkFBQSxLQUFLLENBQUE7QUFDZCxtQ0FBd0M7QUFBL0IsMEJBQUEsTUFBTSxDQUFBO0FBQ2YsNkNBQTZDO0FBQXBDLG9DQUFBLFdBQVcsQ0FBQTtBQUNwQixpREFBK0M7QUFBdEMsd0NBQUEsYUFBYSxDQUFBO0FBQ3RCLCtDQUE4QztBQUFyQyxzQ0FBQSxZQUFZLENBQUE7QUFDckIsaURBQStDO0FBQXRDLHdDQUFBLGFBQWEsQ0FBQTtBQUN0QixpREFBK0M7QUFBdEMsd0NBQUEsYUFBYSxDQUFBO0FBQ3RCLDZDQUE2QztBQUFwQyxvQ0FBQSxXQUFXLENBQUE7QUFDcEIsaUNBQXVDO0FBQTlCLHdCQUFBLEtBQUssQ0FBQTtBQUNkLHlDQUEyQztBQUFsQyxnQ0FBQSxTQUFTLENBQUEifQ==

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oc1dpZGdldC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L0NvbmZpZy5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L2luZGV4LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbWl0aHJpbC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL21pdGhyaWwuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC92aWV3L0xheW91dC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvTGF5b3V0ZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC92aWV3L1BpbGxhcmVkTGF5b3V0ZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC92aWV3L1RpbGVMYXlvdXRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvVG9rZW5zLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Lyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8od2VicGFjaykvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8od2VicGFjaykvbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvKHdlYnBhY2spL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9Db2xsYXBzaWJsZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9MYWJlbC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9NZW51LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL01vZGFsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL09wdGlvbnNCdXR0b24uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vUmFkaW9CdXR0b24uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vU2xpZGVyLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL1RvZ2dsZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9Ub29sYmFyQnV0dG9uLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL1R5cGVBaGVhZC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtR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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDLDJEQUEyRDtBQUMzRCxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscUJBQXFCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtQkFBbUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEhBQTRIO0FBQzVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUMsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELEVBQUU7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSxjQUFjO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBNkI7QUFDakMsS0FBSyxFQUFZO0FBQ2pCLENBQUMsSTs7Ozs7Ozs7Ozs7OztBQ3h1Q1k7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyxtSEFBWTtBQUN0QyxtQkFBbUIsbUJBQU8sQ0FBQyx5SEFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1HQUFtRyxnQkFBZ0I7QUFDbkg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxJQUFJLEdBQUcsa0JBQWtCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQywyNkU7Ozs7Ozs7Ozs7OztBQy9DOUI7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxpQkFBaUIsbUJBQU8sQ0FBQyxxSEFBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHUxRDs7Ozs7Ozs7Ozs7O0FDaEQ5QjtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELG1CQUFtQixtQkFBTyxDQUFDLHlIQUFZO0FBQ3ZDLGlCQUFpQixtQkFBTyxDQUFDLHFIQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnQ0FBZ0M7QUFDcEQsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLFNBQVMsRUFBRTtBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixLQUFLLElBQUksR0FBRyxLQUFLLElBQUk7QUFDOUMsMkRBQTJELGVBQWUsR0FBRyxJQUFJLHNCQUFzQixFQUFFLEVBQUU7QUFDM0csU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsMm5SOzs7Ozs7Ozs7Ozs7QUM3SjlCO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsbUJBQW1CLG1CQUFPLENBQUMseUhBQVk7QUFDdkMsaUJBQWlCLG1CQUFPLENBQUMscUhBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0JBQWdCLEVBQUUsVUFBVTtBQUNuRCx3QkFBd0IsS0FBSyxFQUFFLG1CQUFtQjtBQUNsRCx5QkFBeUIsR0FBRyx3QkFBd0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0JBQWdCLEVBQUUsVUFBVTtBQUNuRCx3QkFBd0IsS0FBSyxFQUFFLG1CQUFtQjtBQUNsRCx5QkFBeUIsR0FBRyx3QkFBd0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQywyNko7Ozs7Ozs7Ozs7OztBQ2xHOUI7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0JBQWtCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixXQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDO0FBQ0E7QUFDQSxpQkFBaUIsMkJBQTJCO0FBQzVDO0FBQ0EsaUJBQWlCLDZCQUE2QjtBQUM5QztBQUNBO0FBQ0EsMkNBQTJDLG1vQzs7Ozs7Ozs7Ozs7QUM5QjNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLHNCQUFzQixFQUFFO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDekxEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxtQkFBTyxDQUFDLG1KQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM5RGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCx1QkFBdUIsbUJBQU8sQ0FBQyw2Q0FBZ0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxtZ0I7Ozs7Ozs7Ozs7OztBQ1g5QjtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELG1CQUFtQixtQkFBTyxDQUFDLCtHQUFVO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsSUFBSTtBQUNuRCxtREFBbUQsNkJBQTZCO0FBQ2hGLHlHQUF5Ryx1Q0FBdUM7QUFDaEo7QUFDQSwyR0FBMkcsc0NBQXNDO0FBQ2pKO0FBQ0Esb0VBQW9FLE9BQU87QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsdWtFOzs7Ozs7Ozs7Ozs7QUNsQzlCO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsbUJBQW1CLG1CQUFPLENBQUMsK0dBQVU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxJQUFJLElBQUksZUFBZTtBQUNoRTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsK25COzs7Ozs7Ozs7Ozs7QUNaOUI7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxzQkFBc0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUM3QztBQUNBLGdCQUFnQiw4REFBOEQ7QUFDOUU7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDJWOzs7Ozs7Ozs7Ozs7QUNSOUI7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxtQkFBbUIsbUJBQU8sQ0FBQywrR0FBVTtBQUNyQyx3QkFBd0IsbUJBQU8sQ0FBQywrQ0FBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlCQUFpQixHQUFHLFVBQVUsR0FBRztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxtQkFBbUI7QUFDckU7QUFDQTtBQUNBLDZEQUE2RCw4RUFBOEU7QUFDM0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQywyNUQ7Ozs7Ozs7Ozs7OztBQ3ZDOUI7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxtQkFBbUIsbUJBQU8sQ0FBQywrR0FBVTtBQUNyQyxtQkFBbUIsbUJBQU8sQ0FBQywrR0FBVTtBQUNyQyxtQkFBbUIsbUJBQU8sQ0FBQyxxQ0FBWTtBQUN2QyxtQkFBbUIsbUJBQU8sQ0FBQyxxQ0FBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLElBQUksR0FBRyxxQkFBcUI7QUFDN0M7QUFDQSxrQ0FBa0MsZUFBZTtBQUNqRDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsZ0JBQWdCLDZEQUE2RDtBQUM3RTtBQUNBO0FBQ0EsMkNBQTJDLCtsQzs7Ozs7Ozs7Ozs7O0FDckI5QjtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELG1CQUFtQixtQkFBTyxDQUFDLCtHQUFVO0FBQ3JDLG1CQUFtQixtQkFBTyxDQUFDLCtHQUFVO0FBQ3JDLG1CQUFtQixtQkFBTyxDQUFDLHFDQUFZO0FBQ3ZDO0FBQ0E7QUFDQSxpQkFBaUIsSUFBSSxHQUFHLHFCQUFxQjtBQUM3QztBQUNBLGtDQUFrQyxlQUFlO0FBQ2pEO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHlEQUF5RDtBQUN6RTtBQUNBO0FBQ0EsMkNBQTJDLDJ3Qzs7Ozs7Ozs7Ozs7O0FDekI5QjtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELG1CQUFtQixtQkFBTyxDQUFDLCtHQUFVO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0lBQW9JLEtBQUs7QUFDekk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsRUFBRSxHQUFHLCtDQUErQztBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxvQkFBb0IsRUFBRTtBQUM3RCw2Q0FBNkMsc0JBQXNCLEVBQUU7QUFDckUseUNBQXlDLG9CQUFvQixFQUFFO0FBQy9ELDBDQUEwQyxZQUFZLEdBQUcsa0NBQWtDLElBQUksbUZBQW1GO0FBQ2xMO0FBQ0E7QUFDQSwyQ0FBMkMsK3hMOzs7Ozs7Ozs7Ozs7QUM5RjlCO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsbUJBQW1CLG1CQUFPLENBQUMsK0dBQVU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxJQUFJO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGdCQUFnQix1QkFBdUIsSUFBSTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGlCQUFpQixLQUFLLElBQUk7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsKzZNOzs7Ozs7Ozs7Ozs7QUMxRzlCO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsbUJBQW1CLG1CQUFPLENBQUMsK0dBQVU7QUFDckMsbUJBQW1CLG1CQUFPLENBQUMscUNBQVk7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxJQUFJLEdBQUcsd0JBQXdCLElBQUksZUFBZTtBQUNuRztBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsdW5FOzs7Ozs7Ozs7Ozs7QUMvQjlCO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsbUJBQW1CLG1CQUFPLENBQUMsK0dBQVU7QUFDckM7QUFDQSxZQUFZLGNBQWMsR0FBRztBQUM3QixZQUFZLGNBQWMsR0FBRztBQUM3QixXQUFXLFdBQVc7QUFDdEIsWUFBWSxjQUFjLEdBQUc7QUFDN0IsYUFBYSxjQUFjLEdBQUc7QUFDOUIsV0FBVyxlQUFlLEdBQUc7QUFDN0IsWUFBWSxlQUFlLEdBQUc7QUFDOUIsY0FBYyxjQUFjLEdBQUc7QUFDL0IsZUFBZSxjQUFjLEdBQUc7QUFDaEMsWUFBWSxjQUFjLEdBQUc7QUFDN0IsY0FBYyxjQUFjLEdBQUc7QUFDL0IsU0FBUyxZQUFZLEdBQUc7QUFDeEIsV0FBVyxXQUFXLEdBQUc7QUFDekIsYUFBYSxhQUFhLEdBQUc7QUFDN0IsYUFBYSxhQUFhLEdBQUc7QUFDN0IsYUFBYSxhQUFhLEdBQUc7QUFDN0IsYUFBYSxhQUFhLEdBQUc7QUFDN0IsWUFBWSxjQUFjLEdBQUc7QUFDN0IsaUJBQWlCLGNBQWMsR0FBRztBQUNsQyxhQUFhLGVBQWUsR0FBRztBQUMvQixRQUFRLGdCQUFnQixHQUFHO0FBQzNCLGFBQWEsY0FBYyxHQUFHO0FBQzlCLFVBQVUsY0FBYyxHQUFHO0FBQzNCLGVBQWUsZUFBZSxHQUFHO0FBQ2pDLGlCQUFpQixjQUFjLEdBQUc7QUFDbEMsYUFBYSxhQUFhLEdBQUc7QUFDN0IsWUFBWSxjQUFjLEdBQUc7QUFDN0IsWUFBWSxjQUFjLEdBQUc7QUFDN0IsWUFBWSxjQUFjLEdBQUc7QUFDN0IsVUFBVSxjQUFjO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELDhCQUE4QjtBQUNwRjtBQUNBO0FBQ0Esc0RBQXNELDhCQUE4QjtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxtb0Y7Ozs7Ozs7Ozs7OztBQ2pEOUI7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxtQkFBbUIsbUJBQU8sQ0FBQywrR0FBVTtBQUNyQztBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsRUFBRTtBQUNwQztBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsYUFBYTtBQUN0RDtBQUNBO0FBQ0Esc0NBQXNDLGFBQWE7QUFDbkQ7QUFDQTtBQUNBLHlDQUF5QyxhQUFhO0FBQ3REO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQywyQkFBMkI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLE1BQU07QUFDcEQsb0RBQW9ELE1BQU07QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCx1RUFBdUU7QUFDM0g7QUFDQSx5R0FBeUcsa0JBQWtCO0FBQzNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDIwTDs7Ozs7Ozs7Ozs7O0FDakc5QjtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyw2QkFBUTtBQUM3QjtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQztBQUNBLGNBQWMsbUJBQU8sQ0FBQywrQkFBUztBQUMvQjtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQztBQUNBLG9CQUFvQixtQkFBTyxDQUFDLDJDQUFlO0FBQzNDO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0NBQWlCO0FBQy9DO0FBQ0EscUJBQXFCLG1CQUFPLENBQUMsNkNBQWdCO0FBQzdDO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0NBQWlCO0FBQy9DO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0NBQWlCO0FBQy9DO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMkNBQWU7QUFDM0M7QUFDQSxjQUFjLG1CQUFPLENBQUMsK0JBQVM7QUFDL0I7QUFDQSxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QztBQUNBLDJDQUEyQywyckIiLCJmaWxlIjoiaHNXaWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Jpbi9pbmRleC5qc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbWl0aHJpbF8xID0gcmVxdWlyZShcIi4vbWl0aHJpbFwiKTtcbmNsYXNzIENvbmZpZyB7XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IG5vZGUuYXR0cnMuY29udGV4dDtcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlLmF0dHJzLnNvdXJjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICghbm9kZS5zdGF0ZS5jZmcpIHtcbiAgICAgICAgICAgICAgICBtaXRocmlsXzEubS5yZXF1ZXN0KHsgbWV0aG9kOiBcIkdFVFwiLCB1cmw6IG5vZGUuYXR0cnMuc291cmNlIH0pLnRoZW4oKHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5jZmcgPSB0cmFuc2xhdGUocywgcy5yb290LCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuY2ZnID0gdHJhbnNsYXRlKG5vZGUuYXR0cnMuc291cmNlLCBub2RlLmF0dHJzLnNvdXJjZS5yb290LCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgY29uc3QgY2ZnID0gbm9kZS5zdGF0ZS5jZmc7XG4gICAgICAgIHJldHVybiAoY2ZnICYmIGNmZy5jb21wQ2xhc3MpID8gbWl0aHJpbF8xLm0oY2ZnLmNvbXBDbGFzcywgT2JqZWN0LmFzc2lnbihjZmcuYXR0cnMsIG5vZGUuYXR0cnMpKSA6IG1pdGhyaWxfMS5tKCdkaXYnLCAnd2FpdGluZycpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29uZmlnID0gQ29uZmlnO1xuZnVuY3Rpb24gdHJhbnNsYXRlKGNvbmZpZywgc3ViY2ZnLCBjb250ZXh0KSB7XG4gICAgaWYgKGlzU3lub255bShjb25maWcsIHN1YmNmZykpIHtcbiAgICAgICAgc3ViY2ZnID0gY29uZmlnW3N1YmNmZ107XG4gICAgfVxuICAgIGlmIChbJ3N0cmluZycsICdudW1iZXInLCAnYm9vbGVhbicsICdmdW5jdGlvbiddLmluZGV4T2YodHlwZW9mIHN1YmNmZykgPj0gMCkge1xuICAgICAgICByZXR1cm4gc3ViY2ZnO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gc3ViY2ZnLmxlbmd0aCA/IFtdIDoge307XG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5rZXlzKHN1YmNmZyk7XG4gICAgb3B0aW9ucy5tYXAoKG9wdCkgPT4ge1xuICAgICAgICBjb25zdCBjbCA9IHJlc29sdmUob3B0LCBjb250ZXh0KTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRyYW5zbGF0ZShjb25maWcsIHN1YmNmZ1tvcHRdLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKGNsKSB7XG4gICAgICAgICAgICBjb25zdCByID0ge1xuICAgICAgICAgICAgICAgIGNvbXBDbGFzczogY2wsXG4gICAgICAgICAgICAgICAgYXR0cnM6IGNvbnRlbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAoIUFycmF5LmlzQXJyYXkoc3ViY2ZnKSAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMSkgP1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHIgOlxuICAgICAgICAgICAgICAgIHJlc3VsdFtvcHRdID0gcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtvcHRdID0gY29udGVudDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiByZXNvbHZlKHN5bSwgY29udGV4dCkge1xuICAgIGxldCBjbDtcbiAgICBjb250ZXh0LnNvbWUoKGMpID0+IGNsID0gY1tzeW1dKTtcbiAgICByZXR1cm4gY2w7XG59XG5mdW5jdGlvbiBpc1N5bm9ueW0oY29uZmlnLCBrZXkpIHsgcmV0dXJuIHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmIGNvbmZpZ1trZXldOyB9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRMjl1Wm1sbkxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMME52Ym1acFp5NTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVRKRVFTeDFRMEZCY1VNN1FVRkxja01zVFVGQllTeE5RVUZOTzBsQlEyWXNUVUZCVFN4RFFVRkRMRWxCUVZVN1VVRkRZaXhOUVVGTkxFOUJRVThzUjBGQlV5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJRenRSUVVONlF5eEpRVUZKTEU5QlFVOHNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFdEJRVXNzVVVGQlVTeEZRVUZGTzFsQlEzWkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NSVUZCUlR0blFrRkJSU3hYUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETEVWQlFVVXNUVUZCVFN4RlFVRkZMRXRCUVVzc1JVRkJSU3hIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVc3NSVUZCUXl4RlFVRkZPMjlDUVVOMFJpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1IwRkJSeXhUUVVGVExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03WjBKQlEyNUVMRU5CUVVNc1EwRkJReXhEUVVGRE8yRkJRVVU3VTBGRFVqdGhRVUZOTzFsQlEwZ3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFZEJRVWNzVTBGQlV5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6dFRRVU5zUmp0SlFVTk1MRU5CUVVNN1NVRkRSQ3hKUVVGSkxFTkJRVU1zU1VGQlZUdFJRVU5ZTEUxQlFVMHNSMEZCUnl4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETzFGQlF6TkNMRTlCUVU4c1EwRkJReXhIUVVGSExFbEJRVWtzUjBGQlJ5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkJMRU5CUVVNc1EwRkJReXhYUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEZOQlFWTXNSVUZCUlN4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZkQlFVTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1UwRkJVeXhEUVVGRExFTkJRVU03U1VGRGFFZ3NRMEZCUXp0RFFVTktPMEZCWmtRc2QwSkJaVU03UVVGaFJDeFRRVUZUTEZOQlFWTXNRMEZCUXl4TlFVRlZMRVZCUVVVc1RVRkJWU3hGUVVGRkxFOUJRV0U3U1VGRmNFUXNTVUZCU1N4VFFVRlRMRU5CUVVNc1RVRkJUU3hGUVVGRkxFMUJRVTBzUTBGQlF5eEZRVUZGTzFGQlFVVXNUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dExRVUZGTzBsQlJUTkVMRWxCUVVrc1EwRkJReXhSUVVGUkxFVkJRVVVzVVVGQlVTeEZRVUZGTEZOQlFWTXNSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zVDBGQlR5eE5RVUZOTEVOQlFVTXNTVUZCUlN4RFFVRkRMRVZCUVVVN1VVRkJSU3hQUVVGUExFMUJRVTBzUTBGQlF6dExRVUZGTzBsQlF6ZEdMRWxCUVVrc1RVRkJUU3hIUVVGSExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVRXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETzBsQlJYQkRMRTFCUVUwc1QwRkJUeXhIUVVGSExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1NVRkRjRU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWRCUVZVc1JVRkJVU3hGUVVGRk8xRkJRemRDTEUxQlFVMHNSVUZCUlN4SFFVRlBMRTlCUVU4c1EwRkJReXhIUVVGSExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdVVUZEY2tNc1RVRkJUU3hQUVVGUExFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNSVUZCUlN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdVVUZEZUVRc1NVRkJTU3hGUVVGRkxFVkJRVVU3V1VGRFNpeE5RVUZOTEVOQlFVTXNSMEZCUnp0blFrRkRUaXhUUVVGVExFVkJRVU1zUlVGQlJUdG5Ra0ZEV2l4TFFVRkxMRVZCUVVNc1QwRkJUenRoUVVOb1FpeERRVUZETzFsQlEwWXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NUMEZCVHl4RFFVRkRMRTFCUVUwc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlFTeERRVUZETzJkQ1FVTTNReXhOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUTFvc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0VFFVTjJRanRoUVVOSk8xbEJRVVVzVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRTlCUVU4c1EwRkJRenRUUVVGRk8wbEJRMjVETEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTBnc1QwRkJUeXhOUVVGTkxFTkJRVU03UVVGRGJFSXNRMEZCUXp0QlFWVkVMRk5CUVZNc1QwRkJUeXhEUVVGRExFZEJRVlVzUlVGQlJTeFBRVUZoTzBsQlEzUkRMRWxCUVVrc1JVRkJUU3hEUVVGRE8wbEJRMWdzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVzc1JVRkJSU3hGUVVGRkxFTkJRVVVzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRM1JETEU5QlFVOHNSVUZCUlN4RFFVRkRPMEZCUTJRc1EwRkJRenRCUVVWRUxGTkJRVk1zVTBGQlV5eERRVUZETEUxQlFWVXNSVUZCUlN4SFFVRlBMRWxCUVVrc1QwRkJUeXhQUVVGUExFZEJRVWNzUzBGQlN5eFJRVUZSTEVsQlFVa3NUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHBpbGxhcnMgPSByZXF1aXJlKFwiLi92aWV3L1BpbGxhcmVkTGF5b3V0ZXJcIik7XG5pZiAocGlsbGFycykgeyB9XG5jb25zdCB0aWxlcyA9IHJlcXVpcmUoXCIuL3ZpZXcvVGlsZUxheW91dGVyXCIpO1xuaWYgKHRpbGVzKSB7IH1cbnZhciBMYXlvdXRfMSA9IHJlcXVpcmUoXCIuL3ZpZXcvTGF5b3V0XCIpO1xuZXhwb3J0cy5MYXlvdXQgPSBMYXlvdXRfMS5MYXlvdXQ7XG52YXIgVG9rZW5zXzEgPSByZXF1aXJlKFwiLi92aWV3L1Rva2Vuc1wiKTtcbmV4cG9ydHMuRklMTCA9IFRva2Vuc18xLkZJTEw7XG5leHBvcnRzLnB4ID0gVG9rZW5zXzEucHg7XG5leHBvcnRzLnBjID0gVG9rZW5zXzEucGM7XG5leHBvcnRzLkxheW91dFRva2VuID0gVG9rZW5zXzEuTGF5b3V0VG9rZW47XG52YXIgTGF5b3V0ZXJfMSA9IHJlcXVpcmUoXCIuL3ZpZXcvTGF5b3V0ZXJcIik7XG5leHBvcnRzLkxheW91dGVyID0gTGF5b3V0ZXJfMS5MYXlvdXRlcjtcbnZhciBDb25maWdfMSA9IHJlcXVpcmUoXCIuL0NvbmZpZ1wiKTtcbmV4cG9ydHMuQ29uZmlnID0gQ29uZmlnXzEuQ29uZmlnO1xudmFyIG1pdGhyaWxfMSA9IHJlcXVpcmUoXCIuL21pdGhyaWxcIik7XG5leHBvcnRzLm0gPSBtaXRocmlsXzEubTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdmFXNWtaWGd1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkpRU3h0UkVGQmRVUTdRVUZCVFN4SlFVRkhMRTlCUVU4c1JVRkJSU3hIUVVGRk8wRkJRek5GTERaRFFVRnRSRHRCUVVGVkxFbEJRVWNzUzBGQlN5eEZRVUZGTEVkQlFVVTdRVUZGZWtVc2QwTkJRVFpETzBGQlFYQkRMREJDUVVGQkxFMUJRVTBzUTBGQlFUdEJRVU5tTEhkRFFVTTJRenRCUVVSd1F5eDNRa0ZCUVN4SlFVRkpMRU5CUVVFN1FVRkJSU3h6UWtGQlFTeEZRVUZGTEVOQlFVRTdRVUZCUlN4elFrRkJRU3hGUVVGRkxFTkJRVUU3UVVGRFdpd3JRa0ZCUVN4WFFVRlhMRU5CUVVFN1FVRkRjRUlzTkVOQlFTdERPMEZCUVhSRExEaENRVUZCTEZGQlFWRXNRMEZCUVR0QlFVTnFRaXh0UTBGQmQwTTdRVUZCTDBJc01FSkJRVUVzVFVGQlRTeERRVUZCTzBGQlEyWXNjVU5CUVhkRE8wRkJRUzlDTEhOQ1FVRkJMRU5CUVVNc1EwRkJRU0o5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm0gPSByZXF1aXJlKFwibWl0aHJpbFwiKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJXbDBhSEpwYkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OXRhWFJvY21sc0xuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCVVdFc1VVRkJRU3hEUVVGRExFZEJRVWNzVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRJbjA9IiwiOyhmdW5jdGlvbigpIHtcblwidXNlIHN0cmljdFwiXG5mdW5jdGlvbiBWbm9kZSh0YWcsIGtleSwgYXR0cnMwLCBjaGlsZHJlbiwgdGV4dCwgZG9tKSB7XG5cdHJldHVybiB7dGFnOiB0YWcsIGtleToga2V5LCBhdHRyczogYXR0cnMwLCBjaGlsZHJlbjogY2hpbGRyZW4sIHRleHQ6IHRleHQsIGRvbTogZG9tLCBkb21TaXplOiB1bmRlZmluZWQsIHN0YXRlOiB1bmRlZmluZWQsIF9zdGF0ZTogdW5kZWZpbmVkLCBldmVudHM6IHVuZGVmaW5lZCwgaW5zdGFuY2U6IHVuZGVmaW5lZCwgc2tpcDogZmFsc2V9XG59XG5Wbm9kZS5ub3JtYWxpemUgPSBmdW5jdGlvbihub2RlKSB7XG5cdGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSByZXR1cm4gVm5vZGUoXCJbXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbihub2RlKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG5cdGlmIChub2RlICE9IG51bGwgJiYgdHlwZW9mIG5vZGUgIT09IFwib2JqZWN0XCIpIHJldHVybiBWbm9kZShcIiNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG5vZGUgPT09IGZhbHNlID8gXCJcIiA6IG5vZGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxuXHRyZXR1cm4gbm9kZVxufVxuVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4gPSBmdW5jdGlvbiBub3JtYWxpemVDaGlsZHJlbihjaGlsZHJlbikge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2hpbGRyZW5baV0gPSBWbm9kZS5ub3JtYWxpemUoY2hpbGRyZW5baV0pXG5cdH1cblx0cmV0dXJuIGNoaWxkcmVuXG59XG52YXIgc2VsZWN0b3JQYXJzZXIgPSAvKD86KF58I3xcXC4pKFteI1xcLlxcW1xcXV0rKSl8KFxcWyguKz8pKD86XFxzKj1cXHMqKFwifCd8KSgoPzpcXFxcW1wiJ1xcXV18LikqPylcXDUpP1xcXSkvZ1xudmFyIHNlbGVjdG9yQ2FjaGUgPSB7fVxudmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5XG5mdW5jdGlvbiBpc0VtcHR5KG9iamVjdCkge1xuXHRmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSBpZiAoaGFzT3duLmNhbGwob2JqZWN0LCBrZXkpKSByZXR1cm4gZmFsc2Vcblx0cmV0dXJuIHRydWVcbn1cbmZ1bmN0aW9uIGNvbXBpbGVTZWxlY3RvcihzZWxlY3Rvcikge1xuXHR2YXIgbWF0Y2gsIHRhZyA9IFwiZGl2XCIsIGNsYXNzZXMgPSBbXSwgYXR0cnMgPSB7fVxuXHR3aGlsZSAobWF0Y2ggPSBzZWxlY3RvclBhcnNlci5leGVjKHNlbGVjdG9yKSkge1xuXHRcdHZhciB0eXBlID0gbWF0Y2hbMV0sIHZhbHVlID0gbWF0Y2hbMl1cblx0XHRpZiAodHlwZSA9PT0gXCJcIiAmJiB2YWx1ZSAhPT0gXCJcIikgdGFnID0gdmFsdWVcblx0XHRlbHNlIGlmICh0eXBlID09PSBcIiNcIikgYXR0cnMuaWQgPSB2YWx1ZVxuXHRcdGVsc2UgaWYgKHR5cGUgPT09IFwiLlwiKSBjbGFzc2VzLnB1c2godmFsdWUpXG5cdFx0ZWxzZSBpZiAobWF0Y2hbM11bMF0gPT09IFwiW1wiKSB7XG5cdFx0XHR2YXIgYXR0clZhbHVlID0gbWF0Y2hbNl1cblx0XHRcdGlmIChhdHRyVmFsdWUpIGF0dHJWYWx1ZSA9IGF0dHJWYWx1ZS5yZXBsYWNlKC9cXFxcKFtcIiddKS9nLCBcIiQxXCIpLnJlcGxhY2UoL1xcXFxcXFxcL2csIFwiXFxcXFwiKVxuXHRcdFx0aWYgKG1hdGNoWzRdID09PSBcImNsYXNzXCIpIGNsYXNzZXMucHVzaChhdHRyVmFsdWUpXG5cdFx0XHRlbHNlIGF0dHJzW21hdGNoWzRdXSA9IGF0dHJWYWx1ZSA9PT0gXCJcIiA/IGF0dHJWYWx1ZSA6IGF0dHJWYWx1ZSB8fCB0cnVlXG5cdFx0fVxuXHR9XG5cdGlmIChjbGFzc2VzLmxlbmd0aCA+IDApIGF0dHJzLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbihcIiBcIilcblx0cmV0dXJuIHNlbGVjdG9yQ2FjaGVbc2VsZWN0b3JdID0ge3RhZzogdGFnLCBhdHRyczogYXR0cnN9XG59XG5mdW5jdGlvbiBleGVjU2VsZWN0b3Ioc3RhdGUsIGF0dHJzLCBjaGlsZHJlbikge1xuXHR2YXIgaGFzQXR0cnMgPSBmYWxzZSwgY2hpbGRMaXN0LCB0ZXh0XG5cdHZhciBjbGFzc05hbWUgPSBhdHRycy5jbGFzc05hbWUgfHwgYXR0cnMuY2xhc3Ncblx0aWYgKCFpc0VtcHR5KHN0YXRlLmF0dHJzKSAmJiAhaXNFbXB0eShhdHRycykpIHtcblx0XHR2YXIgbmV3QXR0cnMgPSB7fVxuXHRcdGZvcih2YXIga2V5IGluIGF0dHJzKSB7XG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoYXR0cnMsIGtleSkpIHtcblx0XHRcdFx0bmV3QXR0cnNba2V5XSA9IGF0dHJzW2tleV1cblx0XHRcdH1cblx0XHR9XG5cdFx0YXR0cnMgPSBuZXdBdHRyc1xuXHR9XG5cdGZvciAodmFyIGtleSBpbiBzdGF0ZS5hdHRycykge1xuXHRcdGlmIChoYXNPd24uY2FsbChzdGF0ZS5hdHRycywga2V5KSkge1xuXHRcdFx0YXR0cnNba2V5XSA9IHN0YXRlLmF0dHJzW2tleV1cblx0XHR9XG5cdH1cblx0aWYgKGNsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKGF0dHJzLmNsYXNzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGF0dHJzLmNsYXNzID0gdW5kZWZpbmVkXG5cdFx0XHRhdHRycy5jbGFzc05hbWUgPSBjbGFzc05hbWVcblx0XHR9XG5cdFx0aWYgKHN0YXRlLmF0dHJzLmNsYXNzTmFtZSAhPSBudWxsKSB7XG5cdFx0XHRhdHRycy5jbGFzc05hbWUgPSBzdGF0ZS5hdHRycy5jbGFzc05hbWUgKyBcIiBcIiArIGNsYXNzTmFtZVxuXHRcdH1cblx0fVxuXHRmb3IgKHZhciBrZXkgaW4gYXR0cnMpIHtcblx0XHRpZiAoaGFzT3duLmNhbGwoYXR0cnMsIGtleSkgJiYga2V5ICE9PSBcImtleVwiKSB7XG5cdFx0XHRoYXNBdHRycyA9IHRydWVcblx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cdGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSAmJiBjaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgY2hpbGRyZW5bMF0gIT0gbnVsbCAmJiBjaGlsZHJlblswXS50YWcgPT09IFwiI1wiKSB7XG5cdFx0dGV4dCA9IGNoaWxkcmVuWzBdLmNoaWxkcmVuXG5cdH0gZWxzZSB7XG5cdFx0Y2hpbGRMaXN0ID0gY2hpbGRyZW5cblx0fVxuXHRyZXR1cm4gVm5vZGUoc3RhdGUudGFnLCBhdHRycy5rZXksIGhhc0F0dHJzID8gYXR0cnMgOiB1bmRlZmluZWQsIGNoaWxkTGlzdCwgdGV4dClcbn1cbmZ1bmN0aW9uIGh5cGVyc2NyaXB0KHNlbGVjdG9yKSB7XG5cdC8vIEJlY2F1c2Ugc2xvcHB5IG1vZGUgc3Vja3Ncblx0dmFyIGF0dHJzID0gYXJndW1lbnRzWzFdLCBzdGFydCA9IDIsIGNoaWxkcmVuXG5cdGlmIChzZWxlY3RvciA9PSBudWxsIHx8IHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Ygc2VsZWN0b3IgIT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2Ygc2VsZWN0b3IudmlldyAhPT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0dGhyb3cgRXJyb3IoXCJUaGUgc2VsZWN0b3IgbXVzdCBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYSBjb21wb25lbnQuXCIpO1xuXHR9XG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIpIHtcblx0XHR2YXIgY2FjaGVkID0gc2VsZWN0b3JDYWNoZVtzZWxlY3Rvcl0gfHwgY29tcGlsZVNlbGVjdG9yKHNlbGVjdG9yKVxuXHR9XG5cdGlmIChhdHRycyA9PSBudWxsKSB7XG5cdFx0YXR0cnMgPSB7fVxuXHR9IGVsc2UgaWYgKHR5cGVvZiBhdHRycyAhPT0gXCJvYmplY3RcIiB8fCBhdHRycy50YWcgIT0gbnVsbCB8fCBBcnJheS5pc0FycmF5KGF0dHJzKSkge1xuXHRcdGF0dHJzID0ge31cblx0XHRzdGFydCA9IDFcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gc3RhcnQgKyAxKSB7XG5cdFx0Y2hpbGRyZW4gPSBhcmd1bWVudHNbc3RhcnRdXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkgY2hpbGRyZW4gPSBbY2hpbGRyZW5dXG5cdH0gZWxzZSB7XG5cdFx0Y2hpbGRyZW4gPSBbXVxuXHRcdHdoaWxlIChzdGFydCA8IGFyZ3VtZW50cy5sZW5ndGgpIGNoaWxkcmVuLnB1c2goYXJndW1lbnRzW3N0YXJ0KytdKVxuXHR9XG5cdHZhciBub3JtYWxpemVkID0gVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4oY2hpbGRyZW4pXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXhlY1NlbGVjdG9yKGNhY2hlZCwgYXR0cnMsIG5vcm1hbGl6ZWQpXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIFZub2RlKHNlbGVjdG9yLCBhdHRycy5rZXksIGF0dHJzLCBub3JtYWxpemVkKVxuXHR9XG59XG5oeXBlcnNjcmlwdC50cnVzdCA9IGZ1bmN0aW9uKGh0bWwpIHtcblx0aWYgKGh0bWwgPT0gbnVsbCkgaHRtbCA9IFwiXCJcblx0cmV0dXJuIFZub2RlKFwiPFwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaHRtbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG59XG5oeXBlcnNjcmlwdC5mcmFnbWVudCA9IGZ1bmN0aW9uKGF0dHJzMSwgY2hpbGRyZW4pIHtcblx0cmV0dXJuIFZub2RlKFwiW1wiLCBhdHRyczEua2V5LCBhdHRyczEsIFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG59XG52YXIgbSA9IGh5cGVyc2NyaXB0XG4vKiogQGNvbnN0cnVjdG9yICovXG52YXIgUHJvbWlzZVBvbHlmaWxsID0gZnVuY3Rpb24oZXhlY3V0b3IpIHtcblx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2VQb2x5ZmlsbCkpIHRocm93IG5ldyBFcnJvcihcIlByb21pc2UgbXVzdCBiZSBjYWxsZWQgd2l0aCBgbmV3YFwiKVxuXHRpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb25cIilcblx0dmFyIHNlbGYgPSB0aGlzLCByZXNvbHZlcnMgPSBbXSwgcmVqZWN0b3JzID0gW10sIHJlc29sdmVDdXJyZW50ID0gaGFuZGxlcihyZXNvbHZlcnMsIHRydWUpLCByZWplY3RDdXJyZW50ID0gaGFuZGxlcihyZWplY3RvcnMsIGZhbHNlKVxuXHR2YXIgaW5zdGFuY2UgPSBzZWxmLl9pbnN0YW5jZSA9IHtyZXNvbHZlcnM6IHJlc29sdmVycywgcmVqZWN0b3JzOiByZWplY3RvcnN9XG5cdHZhciBjYWxsQXN5bmMgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBzZXRUaW1lb3V0XG5cdGZ1bmN0aW9uIGhhbmRsZXIobGlzdCwgc2hvdWxkQWJzb3JiKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGV4ZWN1dGUodmFsdWUpIHtcblx0XHRcdHZhciB0aGVuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoc2hvdWxkQWJzb3JiICYmIHZhbHVlICE9IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikgJiYgdHlwZW9mICh0aGVuID0gdmFsdWUudGhlbikgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gc2VsZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgdy8gaXRzZWxmXCIpXG5cdFx0XHRcdFx0ZXhlY3V0ZU9uY2UodGhlbi5iaW5kKHZhbHVlKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjYWxsQXN5bmMoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoIXNob3VsZEFic29yYiAmJiBsaXN0Lmxlbmd0aCA9PT0gMCkgY29uc29sZS5lcnJvcihcIlBvc3NpYmxlIHVuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbjpcIiwgdmFsdWUpXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIGxpc3RbaV0odmFsdWUpXG5cdFx0XHRcdFx0XHRyZXNvbHZlcnMubGVuZ3RoID0gMCwgcmVqZWN0b3JzLmxlbmd0aCA9IDBcblx0XHRcdFx0XHRcdGluc3RhbmNlLnN0YXRlID0gc2hvdWxkQWJzb3JiXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5yZXRyeSA9IGZ1bmN0aW9uKCkge2V4ZWN1dGUodmFsdWUpfVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKSB7XG5cdFx0XHRcdHJlamVjdEN1cnJlbnQoZSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gZXhlY3V0ZU9uY2UodGhlbikge1xuXHRcdHZhciBydW5zID0gMFxuXHRcdGZ1bmN0aW9uIHJ1bihmbikge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChydW5zKysgPiAwKSByZXR1cm5cblx0XHRcdFx0Zm4odmFsdWUpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciBvbmVycm9yID0gcnVuKHJlamVjdEN1cnJlbnQpXG5cdFx0dHJ5IHt0aGVuKHJ1bihyZXNvbHZlQ3VycmVudCksIG9uZXJyb3IpfSBjYXRjaCAoZSkge29uZXJyb3IoZSl9XG5cdH1cblx0ZXhlY3V0ZU9uY2UoZXhlY3V0b3IpXG59XG5Qcm9taXNlUG9seWZpbGwucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3Rpb24pIHtcblx0dmFyIHNlbGYgPSB0aGlzLCBpbnN0YW5jZSA9IHNlbGYuX2luc3RhbmNlXG5cdGZ1bmN0aW9uIGhhbmRsZShjYWxsYmFjaywgbGlzdCwgbmV4dCwgc3RhdGUpIHtcblx0XHRsaXN0LnB1c2goZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgbmV4dCh2YWx1ZSlcblx0XHRcdGVsc2UgdHJ5IHtyZXNvbHZlTmV4dChjYWxsYmFjayh2YWx1ZSkpfSBjYXRjaCAoZSkge2lmIChyZWplY3ROZXh0KSByZWplY3ROZXh0KGUpfVxuXHRcdH0pXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZS5yZXRyeSA9PT0gXCJmdW5jdGlvblwiICYmIHN0YXRlID09PSBpbnN0YW5jZS5zdGF0ZSkgaW5zdGFuY2UucmV0cnkoKVxuXHR9XG5cdHZhciByZXNvbHZlTmV4dCwgcmVqZWN0TmV4dFxuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7cmVzb2x2ZU5leHQgPSByZXNvbHZlLCByZWplY3ROZXh0ID0gcmVqZWN0fSlcblx0aGFuZGxlKG9uRnVsZmlsbGVkLCBpbnN0YW5jZS5yZXNvbHZlcnMsIHJlc29sdmVOZXh0LCB0cnVlKSwgaGFuZGxlKG9uUmVqZWN0aW9uLCBpbnN0YW5jZS5yZWplY3RvcnMsIHJlamVjdE5leHQsIGZhbHNlKVxuXHRyZXR1cm4gcHJvbWlzZVxufVxuUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS5jYXRjaCA9IGZ1bmN0aW9uKG9uUmVqZWN0aW9uKSB7XG5cdHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3Rpb24pXG59XG5Qcm9taXNlUG9seWZpbGwucmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2VQb2x5ZmlsbCkgcmV0dXJuIHZhbHVlXG5cdHJldHVybiBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUpIHtyZXNvbHZlKHZhbHVlKX0pXG59XG5Qcm9taXNlUG9seWZpbGwucmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7cmVqZWN0KHZhbHVlKX0pXG59XG5Qcm9taXNlUG9seWZpbGwuYWxsID0gZnVuY3Rpb24obGlzdCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHR2YXIgdG90YWwgPSBsaXN0Lmxlbmd0aCwgY291bnQgPSAwLCB2YWx1ZXMgPSBbXVxuXHRcdGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkgcmVzb2x2ZShbXSlcblx0XHRlbHNlIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0KGZ1bmN0aW9uKGkpIHtcblx0XHRcdFx0ZnVuY3Rpb24gY29uc3VtZSh2YWx1ZSkge1xuXHRcdFx0XHRcdGNvdW50Kytcblx0XHRcdFx0XHR2YWx1ZXNbaV0gPSB2YWx1ZVxuXHRcdFx0XHRcdGlmIChjb3VudCA9PT0gdG90YWwpIHJlc29sdmUodmFsdWVzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChsaXN0W2ldICE9IG51bGwgJiYgKHR5cGVvZiBsaXN0W2ldID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBsaXN0W2ldID09PSBcImZ1bmN0aW9uXCIpICYmIHR5cGVvZiBsaXN0W2ldLnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGxpc3RbaV0udGhlbihjb25zdW1lLCByZWplY3QpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBjb25zdW1lKGxpc3RbaV0pXG5cdFx0XHR9KShpKVxuXHRcdH1cblx0fSlcbn1cblByb21pc2VQb2x5ZmlsbC5yYWNlID0gZnVuY3Rpb24obGlzdCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxpc3RbaV0udGhlbihyZXNvbHZlLCByZWplY3QpXG5cdFx0fVxuXHR9KVxufVxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0aWYgKHR5cGVvZiB3aW5kb3cuUHJvbWlzZSA9PT0gXCJ1bmRlZmluZWRcIikgd2luZG93LlByb21pc2UgPSBQcm9taXNlUG9seWZpbGxcblx0dmFyIFByb21pc2VQb2x5ZmlsbCA9IHdpbmRvdy5Qcm9taXNlXG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWwuUHJvbWlzZSA9PT0gXCJ1bmRlZmluZWRcIikgZ2xvYmFsLlByb21pc2UgPSBQcm9taXNlUG9seWZpbGxcblx0dmFyIFByb21pc2VQb2x5ZmlsbCA9IGdsb2JhbC5Qcm9taXNlXG59IGVsc2Uge1xufVxudmFyIGJ1aWxkUXVlcnlTdHJpbmcgPSBmdW5jdGlvbihvYmplY3QpIHtcblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpICE9PSBcIltvYmplY3QgT2JqZWN0XVwiKSByZXR1cm4gXCJcIlxuXHR2YXIgYXJncyA9IFtdXG5cdGZvciAodmFyIGtleTAgaW4gb2JqZWN0KSB7XG5cdFx0ZGVzdHJ1Y3R1cmUoa2V5MCwgb2JqZWN0W2tleTBdKVxuXHR9XG5cdHJldHVybiBhcmdzLmpvaW4oXCImXCIpXG5cdGZ1bmN0aW9uIGRlc3RydWN0dXJlKGtleTAsIHZhbHVlKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGRlc3RydWN0dXJlKGtleTAgKyBcIltcIiArIGkgKyBcIl1cIiwgdmFsdWVbaV0pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBPYmplY3RdXCIpIHtcblx0XHRcdGZvciAodmFyIGkgaW4gdmFsdWUpIHtcblx0XHRcdFx0ZGVzdHJ1Y3R1cmUoa2V5MCArIFwiW1wiICsgaSArIFwiXVwiLCB2YWx1ZVtpXSlcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBhcmdzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleTApICsgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IFwiXCIgPyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgOiBcIlwiKSlcblx0fVxufVxudmFyIEZJTEVfUFJPVE9DT0xfUkVHRVggPSBuZXcgUmVnRXhwKFwiXmZpbGU6Ly9cIiwgXCJpXCIpXG52YXIgXzggPSBmdW5jdGlvbigkd2luZG93LCBQcm9taXNlKSB7XG5cdHZhciBjYWxsYmFja0NvdW50ID0gMFxuXHR2YXIgb25jb21wbGV0aW9uXG5cdGZ1bmN0aW9uIHNldENvbXBsZXRpb25DYWxsYmFjayhjYWxsYmFjaykge29uY29tcGxldGlvbiA9IGNhbGxiYWNrfVxuXHRmdW5jdGlvbiBmaW5hbGl6ZXIoKSB7XG5cdFx0dmFyIGNvdW50ID0gMFxuXHRcdGZ1bmN0aW9uIGNvbXBsZXRlKCkge2lmICgtLWNvdW50ID09PSAwICYmIHR5cGVvZiBvbmNvbXBsZXRpb24gPT09IFwiZnVuY3Rpb25cIikgb25jb21wbGV0aW9uKCl9XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGZpbmFsaXplKHByb21pc2UwKSB7XG5cdFx0XHR2YXIgdGhlbjAgPSBwcm9taXNlMC50aGVuXG5cdFx0XHRwcm9taXNlMC50aGVuID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvdW50Kytcblx0XHRcdFx0dmFyIG5leHQgPSB0aGVuMC5hcHBseShwcm9taXNlMCwgYXJndW1lbnRzKVxuXHRcdFx0XHRuZXh0LnRoZW4oY29tcGxldGUsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRjb21wbGV0ZSgpXG5cdFx0XHRcdFx0aWYgKGNvdW50ID09PSAwKSB0aHJvdyBlXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHJldHVybiBmaW5hbGl6ZShuZXh0KVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHByb21pc2UwXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIG5vcm1hbGl6ZShhcmdzLCBleHRyYSkge1xuXHRcdGlmICh0eXBlb2YgYXJncyA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0dmFyIHVybCA9IGFyZ3Ncblx0XHRcdGFyZ3MgPSBleHRyYSB8fCB7fVxuXHRcdFx0aWYgKGFyZ3MudXJsID09IG51bGwpIGFyZ3MudXJsID0gdXJsXG5cdFx0fVxuXHRcdHJldHVybiBhcmdzXG5cdH1cblx0ZnVuY3Rpb24gcmVxdWVzdChhcmdzLCBleHRyYSkge1xuXHRcdHZhciBmaW5hbGl6ZSA9IGZpbmFsaXplcigpXG5cdFx0YXJncyA9IG5vcm1hbGl6ZShhcmdzLCBleHRyYSlcblx0XHR2YXIgcHJvbWlzZTAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdGlmIChhcmdzLm1ldGhvZCA9PSBudWxsKSBhcmdzLm1ldGhvZCA9IFwiR0VUXCJcblx0XHRcdGFyZ3MubWV0aG9kID0gYXJncy5tZXRob2QudG9VcHBlckNhc2UoKVxuXHRcdFx0dmFyIHVzZUJvZHkgPSAoYXJncy5tZXRob2QgPT09IFwiR0VUXCIgfHwgYXJncy5tZXRob2QgPT09IFwiVFJBQ0VcIikgPyBmYWxzZSA6ICh0eXBlb2YgYXJncy51c2VCb2R5ID09PSBcImJvb2xlYW5cIiA/IGFyZ3MudXNlQm9keSA6IHRydWUpXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3Muc2VyaWFsaXplICE9PSBcImZ1bmN0aW9uXCIpIGFyZ3Muc2VyaWFsaXplID0gdHlwZW9mIEZvcm1EYXRhICE9PSBcInVuZGVmaW5lZFwiICYmIGFyZ3MuZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhID8gZnVuY3Rpb24odmFsdWUpIHtyZXR1cm4gdmFsdWV9IDogSlNPTi5zdHJpbmdpZnlcblx0XHRcdGlmICh0eXBlb2YgYXJncy5kZXNlcmlhbGl6ZSAhPT0gXCJmdW5jdGlvblwiKSBhcmdzLmRlc2VyaWFsaXplID0gZGVzZXJpYWxpemVcblx0XHRcdGlmICh0eXBlb2YgYXJncy5leHRyYWN0ICE9PSBcImZ1bmN0aW9uXCIpIGFyZ3MuZXh0cmFjdCA9IGV4dHJhY3Rcblx0XHRcdGFyZ3MudXJsID0gaW50ZXJwb2xhdGUoYXJncy51cmwsIGFyZ3MuZGF0YSlcblx0XHRcdGlmICh1c2VCb2R5KSBhcmdzLmRhdGEgPSBhcmdzLnNlcmlhbGl6ZShhcmdzLmRhdGEpXG5cdFx0XHRlbHNlIGFyZ3MudXJsID0gYXNzZW1ibGUoYXJncy51cmwsIGFyZ3MuZGF0YSlcblx0XHRcdHZhciB4aHIgPSBuZXcgJHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpLFxuXHRcdFx0XHRhYm9ydGVkID0gZmFsc2UsXG5cdFx0XHRcdF9hYm9ydCA9IHhoci5hYm9ydFxuXHRcdFx0eGhyLmFib3J0ID0gZnVuY3Rpb24gYWJvcnQoKSB7XG5cdFx0XHRcdGFib3J0ZWQgPSB0cnVlXG5cdFx0XHRcdF9hYm9ydC5jYWxsKHhocilcblx0XHRcdH1cblx0XHRcdHhoci5vcGVuKGFyZ3MubWV0aG9kLCBhcmdzLnVybCwgdHlwZW9mIGFyZ3MuYXN5bmMgPT09IFwiYm9vbGVhblwiID8gYXJncy5hc3luYyA6IHRydWUsIHR5cGVvZiBhcmdzLnVzZXIgPT09IFwic3RyaW5nXCIgPyBhcmdzLnVzZXIgOiB1bmRlZmluZWQsIHR5cGVvZiBhcmdzLnBhc3N3b3JkID09PSBcInN0cmluZ1wiID8gYXJncy5wYXNzd29yZCA6IHVuZGVmaW5lZClcblx0XHRcdGlmIChhcmdzLnNlcmlhbGl6ZSA9PT0gSlNPTi5zdHJpbmdpZnkgJiYgdXNlQm9keSAmJiAhKGFyZ3MuaGVhZGVycyAmJiBhcmdzLmhlYWRlcnMuaGFzT3duUHJvcGVydHkoXCJDb250ZW50LVR5cGVcIikpKSB7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiKVxuXHRcdFx0fVxuXHRcdFx0aWYgKGFyZ3MuZGVzZXJpYWxpemUgPT09IGRlc2VyaWFsaXplICYmICEoYXJncy5oZWFkZXJzICYmIGFyZ3MuaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShcIkFjY2VwdFwiKSkpIHtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0LypcIilcblx0XHRcdH1cblx0XHRcdGlmIChhcmdzLndpdGhDcmVkZW50aWFscykgeGhyLndpdGhDcmVkZW50aWFscyA9IGFyZ3Mud2l0aENyZWRlbnRpYWxzXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJncy5oZWFkZXJzKSBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChhcmdzLmhlYWRlcnMsIGtleSkpIHtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBhcmdzLmhlYWRlcnNba2V5XSlcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgYXJncy5jb25maWcgPT09IFwiZnVuY3Rpb25cIikgeGhyID0gYXJncy5jb25maWcoeGhyLCBhcmdzKSB8fCB4aHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0Ly8gRG9uJ3QgdGhyb3cgZXJyb3JzIG9uIHhoci5hYm9ydCgpLlxuXHRcdFx0XHRpZihhYm9ydGVkKSByZXR1cm5cblx0XHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHZhciByZXNwb25zZSA9IChhcmdzLmV4dHJhY3QgIT09IGV4dHJhY3QpID8gYXJncy5leHRyYWN0KHhociwgYXJncykgOiBhcmdzLmRlc2VyaWFsaXplKGFyZ3MuZXh0cmFjdCh4aHIsIGFyZ3MpKVxuXHRcdFx0XHRcdFx0aWYgKCh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB8fCB4aHIuc3RhdHVzID09PSAzMDQgfHwgRklMRV9QUk9UT0NPTF9SRUdFWC50ZXN0KGFyZ3MudXJsKSkge1xuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKGNhc3QoYXJncy50eXBlLCByZXNwb25zZSkpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKHhoci5yZXNwb25zZVRleHQpXG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiByZXNwb25zZSkgZXJyb3Jba2V5XSA9IHJlc3BvbnNlW2tleV1cblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGUpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodXNlQm9keSAmJiAoYXJncy5kYXRhICE9IG51bGwpKSB4aHIuc2VuZChhcmdzLmRhdGEpXG5cdFx0XHRlbHNlIHhoci5zZW5kKClcblx0XHR9KVxuXHRcdHJldHVybiBhcmdzLmJhY2tncm91bmQgPT09IHRydWUgPyBwcm9taXNlMCA6IGZpbmFsaXplKHByb21pc2UwKVxuXHR9XG5cdGZ1bmN0aW9uIGpzb25wKGFyZ3MsIGV4dHJhKSB7XG5cdFx0dmFyIGZpbmFsaXplID0gZmluYWxpemVyKClcblx0XHRhcmdzID0gbm9ybWFsaXplKGFyZ3MsIGV4dHJhKVxuXHRcdHZhciBwcm9taXNlMCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIGNhbGxiYWNrTmFtZSA9IGFyZ3MuY2FsbGJhY2tOYW1lIHx8IFwiX21pdGhyaWxfXCIgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxZTE2KSArIFwiX1wiICsgY2FsbGJhY2tDb3VudCsrXG5cdFx0XHR2YXIgc2NyaXB0ID0gJHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXG5cdFx0XHQkd2luZG93W2NhbGxiYWNrTmFtZV0gPSBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdClcblx0XHRcdFx0cmVzb2x2ZShjYXN0KGFyZ3MudHlwZSwgZGF0YSkpXG5cdFx0XHRcdGRlbGV0ZSAkd2luZG93W2NhbGxiYWNrTmFtZV1cblx0XHRcdH1cblx0XHRcdHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdClcblx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIkpTT05QIHJlcXVlc3QgZmFpbGVkXCIpKVxuXHRcdFx0XHRkZWxldGUgJHdpbmRvd1tjYWxsYmFja05hbWVdXG5cdFx0XHR9XG5cdFx0XHRpZiAoYXJncy5kYXRhID09IG51bGwpIGFyZ3MuZGF0YSA9IHt9XG5cdFx0XHRhcmdzLnVybCA9IGludGVycG9sYXRlKGFyZ3MudXJsLCBhcmdzLmRhdGEpXG5cdFx0XHRhcmdzLmRhdGFbYXJncy5jYWxsYmFja0tleSB8fCBcImNhbGxiYWNrXCJdID0gY2FsbGJhY2tOYW1lXG5cdFx0XHRzY3JpcHQuc3JjID0gYXNzZW1ibGUoYXJncy51cmwsIGFyZ3MuZGF0YSlcblx0XHRcdCR3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKHNjcmlwdClcblx0XHR9KVxuXHRcdHJldHVybiBhcmdzLmJhY2tncm91bmQgPT09IHRydWU/IHByb21pc2UwIDogZmluYWxpemUocHJvbWlzZTApXG5cdH1cblx0ZnVuY3Rpb24gaW50ZXJwb2xhdGUodXJsLCBkYXRhKSB7XG5cdFx0aWYgKGRhdGEgPT0gbnVsbCkgcmV0dXJuIHVybFxuXHRcdHZhciB0b2tlbnMgPSB1cmwubWF0Y2goLzpbXlxcL10rL2dpKSB8fCBbXVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIga2V5ID0gdG9rZW5zW2ldLnNsaWNlKDEpXG5cdFx0XHRpZiAoZGF0YVtrZXldICE9IG51bGwpIHtcblx0XHRcdFx0dXJsID0gdXJsLnJlcGxhY2UodG9rZW5zW2ldLCBkYXRhW2tleV0pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB1cmxcblx0fVxuXHRmdW5jdGlvbiBhc3NlbWJsZSh1cmwsIGRhdGEpIHtcblx0XHR2YXIgcXVlcnlzdHJpbmcgPSBidWlsZFF1ZXJ5U3RyaW5nKGRhdGEpXG5cdFx0aWYgKHF1ZXJ5c3RyaW5nICE9PSBcIlwiKSB7XG5cdFx0XHR2YXIgcHJlZml4ID0gdXJsLmluZGV4T2YoXCI/XCIpIDwgMCA/IFwiP1wiIDogXCImXCJcblx0XHRcdHVybCArPSBwcmVmaXggKyBxdWVyeXN0cmluZ1xuXHRcdH1cblx0XHRyZXR1cm4gdXJsXG5cdH1cblx0ZnVuY3Rpb24gZGVzZXJpYWxpemUoZGF0YSkge1xuXHRcdHRyeSB7cmV0dXJuIGRhdGEgIT09IFwiXCIgPyBKU09OLnBhcnNlKGRhdGEpIDogbnVsbH1cblx0XHRjYXRjaCAoZSkge3Rocm93IG5ldyBFcnJvcihkYXRhKX1cblx0fVxuXHRmdW5jdGlvbiBleHRyYWN0KHhocikge3JldHVybiB4aHIucmVzcG9uc2VUZXh0fVxuXHRmdW5jdGlvbiBjYXN0KHR5cGUwLCBkYXRhKSB7XG5cdFx0aWYgKHR5cGVvZiB0eXBlMCA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRkYXRhW2ldID0gbmV3IHR5cGUwKGRhdGFbaV0pXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgcmV0dXJuIG5ldyB0eXBlMChkYXRhKVxuXHRcdH1cblx0XHRyZXR1cm4gZGF0YVxuXHR9XG5cdHJldHVybiB7cmVxdWVzdDogcmVxdWVzdCwganNvbnA6IGpzb25wLCBzZXRDb21wbGV0aW9uQ2FsbGJhY2s6IHNldENvbXBsZXRpb25DYWxsYmFja31cbn1cbnZhciByZXF1ZXN0U2VydmljZSA9IF84KHdpbmRvdywgUHJvbWlzZVBvbHlmaWxsKVxudmFyIGNvcmVSZW5kZXJlciA9IGZ1bmN0aW9uKCR3aW5kb3cpIHtcblx0dmFyICRkb2MgPSAkd2luZG93LmRvY3VtZW50XG5cdHZhciAkZW1wdHlGcmFnbWVudCA9ICRkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG5cdHZhciBuYW1lU3BhY2UgPSB7XG5cdFx0c3ZnOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG5cdFx0bWF0aDogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCJcblx0fVxuXHR2YXIgb25ldmVudFxuXHRmdW5jdGlvbiBzZXRFdmVudENhbGxiYWNrKGNhbGxiYWNrKSB7cmV0dXJuIG9uZXZlbnQgPSBjYWxsYmFja31cblx0ZnVuY3Rpb24gZ2V0TmFtZVNwYWNlKHZub2RlKSB7XG5cdFx0cmV0dXJuIHZub2RlLmF0dHJzICYmIHZub2RlLmF0dHJzLnhtbG5zIHx8IG5hbWVTcGFjZVt2bm9kZS50YWddXG5cdH1cblx0Ly9jcmVhdGVcblx0ZnVuY3Rpb24gY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHRmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0dmFyIHZub2RlID0gdm5vZGVzW2ldXG5cdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkge1xuXHRcdFx0XHRjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciB0YWcgPSB2bm9kZS50YWdcblx0XHRpZiAodHlwZW9mIHRhZyA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0dm5vZGUuc3RhdGUgPSB7fVxuXHRcdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwpIGluaXRMaWZlY3ljbGUodm5vZGUuYXR0cnMsIHZub2RlLCBob29rcylcblx0XHRcdHN3aXRjaCAodGFnKSB7XG5cdFx0XHRcdGNhc2UgXCIjXCI6IHJldHVybiBjcmVhdGVUZXh0KHBhcmVudCwgdm5vZGUsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRjYXNlIFwiPFwiOiByZXR1cm4gY3JlYXRlSFRNTChwYXJlbnQsIHZub2RlLCBuZXh0U2libGluZylcblx0XHRcdFx0Y2FzZSBcIltcIjogcmV0dXJuIGNyZWF0ZUZyYWdtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdGRlZmF1bHQ6IHJldHVybiBjcmVhdGVFbGVtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgcmV0dXJuIGNyZWF0ZUNvbXBvbmVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZVRleHQocGFyZW50LCB2bm9kZSwgbmV4dFNpYmxpbmcpIHtcblx0XHR2bm9kZS5kb20gPSAkZG9jLmNyZWF0ZVRleHROb2RlKHZub2RlLmNoaWxkcmVuKVxuXHRcdGluc2VydE5vZGUocGFyZW50LCB2bm9kZS5kb20sIG5leHRTaWJsaW5nKVxuXHRcdHJldHVybiB2bm9kZS5kb21cblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVIVE1MKHBhcmVudCwgdm5vZGUsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIG1hdGNoMSA9IHZub2RlLmNoaWxkcmVuLm1hdGNoKC9eXFxzKj88KFxcdyspL2ltKSB8fCBbXVxuXHRcdHZhciBwYXJlbnQxID0ge2NhcHRpb246IFwidGFibGVcIiwgdGhlYWQ6IFwidGFibGVcIiwgdGJvZHk6IFwidGFibGVcIiwgdGZvb3Q6IFwidGFibGVcIiwgdHI6IFwidGJvZHlcIiwgdGg6IFwidHJcIiwgdGQ6IFwidHJcIiwgY29sZ3JvdXA6IFwidGFibGVcIiwgY29sOiBcImNvbGdyb3VwXCJ9W21hdGNoMVsxXV0gfHwgXCJkaXZcIlxuXHRcdHZhciB0ZW1wID0gJGRvYy5jcmVhdGVFbGVtZW50KHBhcmVudDEpXG5cdFx0dGVtcC5pbm5lckhUTUwgPSB2bm9kZS5jaGlsZHJlblxuXHRcdHZub2RlLmRvbSA9IHRlbXAuZmlyc3RDaGlsZFxuXHRcdHZub2RlLmRvbVNpemUgPSB0ZW1wLmNoaWxkTm9kZXMubGVuZ3RoXG5cdFx0dmFyIGZyYWdtZW50ID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHR2YXIgY2hpbGRcblx0XHR3aGlsZSAoY2hpbGQgPSB0ZW1wLmZpcnN0Q2hpbGQpIHtcblx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuXHRcdH1cblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZnJhZ21lbnQsIG5leHRTaWJsaW5nKVxuXHRcdHJldHVybiBmcmFnbWVudFxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSAkZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXHRcdGlmICh2bm9kZS5jaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdFx0Y3JlYXRlTm9kZXMoZnJhZ21lbnQsIGNoaWxkcmVuLCAwLCBjaGlsZHJlbi5sZW5ndGgsIGhvb2tzLCBudWxsLCBucylcblx0XHR9XG5cdFx0dm5vZGUuZG9tID0gZnJhZ21lbnQuZmlyc3RDaGlsZFxuXHRcdHZub2RlLmRvbVNpemUgPSBmcmFnbWVudC5jaGlsZE5vZGVzLmxlbmd0aFxuXHRcdGluc2VydE5vZGUocGFyZW50LCBmcmFnbWVudCwgbmV4dFNpYmxpbmcpXG5cdFx0cmV0dXJuIGZyYWdtZW50XG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlRWxlbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIHRhZyA9IHZub2RlLnRhZ1xuXHRcdHZhciBhdHRyczIgPSB2bm9kZS5hdHRyc1xuXHRcdHZhciBpcyA9IGF0dHJzMiAmJiBhdHRyczIuaXNcblx0XHRucyA9IGdldE5hbWVTcGFjZSh2bm9kZSkgfHwgbnNcblx0XHR2YXIgZWxlbWVudCA9IG5zID9cblx0XHRcdGlzID8gJGRvYy5jcmVhdGVFbGVtZW50TlMobnMsIHRhZywge2lzOiBpc30pIDogJGRvYy5jcmVhdGVFbGVtZW50TlMobnMsIHRhZykgOlxuXHRcdFx0aXMgPyAkZG9jLmNyZWF0ZUVsZW1lbnQodGFnLCB7aXM6IGlzfSkgOiAkZG9jLmNyZWF0ZUVsZW1lbnQodGFnKVxuXHRcdHZub2RlLmRvbSA9IGVsZW1lbnRcblx0XHRpZiAoYXR0cnMyICE9IG51bGwpIHtcblx0XHRcdHNldEF0dHJzKHZub2RlLCBhdHRyczIsIG5zKVxuXHRcdH1cblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZWxlbWVudCwgbmV4dFNpYmxpbmcpXG5cdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwgJiYgdm5vZGUuYXR0cnMuY29udGVudGVkaXRhYmxlICE9IG51bGwpIHtcblx0XHRcdHNldENvbnRlbnRFZGl0YWJsZSh2bm9kZSlcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodm5vZGUudGV4dCAhPSBudWxsKSB7XG5cdFx0XHRcdGlmICh2bm9kZS50ZXh0ICE9PSBcIlwiKSBlbGVtZW50LnRleHRDb250ZW50ID0gdm5vZGUudGV4dFxuXHRcdFx0XHRlbHNlIHZub2RlLmNoaWxkcmVuID0gW1Zub2RlKFwiI1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdm5vZGUudGV4dCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXVxuXHRcdFx0fVxuXHRcdFx0aWYgKHZub2RlLmNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRcdFx0dmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHRcdFx0Y3JlYXRlTm9kZXMoZWxlbWVudCwgY2hpbGRyZW4sIDAsIGNoaWxkcmVuLmxlbmd0aCwgaG9va3MsIG51bGwsIG5zKVxuXHRcdFx0XHRzZXRMYXRlQXR0cnModm5vZGUpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBlbGVtZW50XG5cdH1cblx0ZnVuY3Rpb24gaW5pdENvbXBvbmVudCh2bm9kZSwgaG9va3MpIHtcblx0XHR2YXIgc2VudGluZWxcblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZy52aWV3ID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHZub2RlLnN0YXRlID0gT2JqZWN0LmNyZWF0ZSh2bm9kZS50YWcpXG5cdFx0XHRzZW50aW5lbCA9IHZub2RlLnN0YXRlLnZpZXdcblx0XHRcdGlmIChzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCAhPSBudWxsKSByZXR1cm4gJGVtcHR5RnJhZ21lbnRcblx0XHRcdHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkID0gdHJ1ZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2bm9kZS5zdGF0ZSA9IHZvaWQgMFxuXHRcdFx0c2VudGluZWwgPSB2bm9kZS50YWdcblx0XHRcdGlmIChzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCAhPSBudWxsKSByZXR1cm4gJGVtcHR5RnJhZ21lbnRcblx0XHRcdHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkID0gdHJ1ZVxuXHRcdFx0dm5vZGUuc3RhdGUgPSAodm5vZGUudGFnLnByb3RvdHlwZSAhPSBudWxsICYmIHR5cGVvZiB2bm9kZS50YWcucHJvdG90eXBlLnZpZXcgPT09IFwiZnVuY3Rpb25cIikgPyBuZXcgdm5vZGUudGFnKHZub2RlKSA6IHZub2RlLnRhZyh2bm9kZSlcblx0XHR9XG5cdFx0dm5vZGUuX3N0YXRlID0gdm5vZGUuc3RhdGVcblx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCkgaW5pdExpZmVjeWNsZSh2bm9kZS5hdHRycywgdm5vZGUsIGhvb2tzKVxuXHRcdGluaXRMaWZlY3ljbGUodm5vZGUuX3N0YXRlLCB2bm9kZSwgaG9va3MpXG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBWbm9kZS5ub3JtYWxpemUodm5vZGUuX3N0YXRlLnZpZXcuY2FsbCh2bm9kZS5zdGF0ZSwgdm5vZGUpKVxuXHRcdGlmICh2bm9kZS5pbnN0YW5jZSA9PT0gdm5vZGUpIHRocm93IEVycm9yKFwiQSB2aWV3IGNhbm5vdCByZXR1cm4gdGhlIHZub2RlIGl0IHJlY2VpdmVkIGFzIGFyZ3VtZW50XCIpXG5cdFx0c2VudGluZWwuJCRyZWVudHJhbnRMb2NrJCQgPSBudWxsXG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHRpbml0Q29tcG9uZW50KHZub2RlLCBob29rcylcblx0XHRpZiAodm5vZGUuaW5zdGFuY2UgIT0gbnVsbCkge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSBjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUuaW5zdGFuY2UsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR2bm9kZS5kb20gPSB2bm9kZS5pbnN0YW5jZS5kb21cblx0XHRcdHZub2RlLmRvbVNpemUgPSB2bm9kZS5kb20gIT0gbnVsbCA/IHZub2RlLmluc3RhbmNlLmRvbVNpemUgOiAwXG5cdFx0XHRpbnNlcnROb2RlKHBhcmVudCwgZWxlbWVudCwgbmV4dFNpYmxpbmcpXG5cdFx0XHRyZXR1cm4gZWxlbWVudFxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHZub2RlLmRvbVNpemUgPSAwXG5cdFx0XHRyZXR1cm4gJGVtcHR5RnJhZ21lbnRcblx0XHR9XG5cdH1cblx0Ly91cGRhdGVcblx0ZnVuY3Rpb24gdXBkYXRlTm9kZXMocGFyZW50LCBvbGQsIHZub2RlcywgcmVjeWNsaW5nLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKSB7XG5cdFx0aWYgKG9sZCA9PT0gdm5vZGVzIHx8IG9sZCA9PSBudWxsICYmIHZub2RlcyA9PSBudWxsKSByZXR1cm5cblx0XHRlbHNlIGlmIChvbGQgPT0gbnVsbCkgY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIDAsIHZub2Rlcy5sZW5ndGgsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0ZWxzZSBpZiAodm5vZGVzID09IG51bGwpIHJlbW92ZU5vZGVzKG9sZCwgMCwgb2xkLmxlbmd0aCwgdm5vZGVzKVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKG9sZC5sZW5ndGggPT09IHZub2Rlcy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGlzVW5rZXllZCA9IGZhbHNlXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdm5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKHZub2Rlc1tpXSAhPSBudWxsICYmIG9sZFtpXSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRpc1Vua2V5ZWQgPSB2bm9kZXNbaV0ua2V5ID09IG51bGwgJiYgb2xkW2ldLmtleSA9PSBudWxsXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaXNVbmtleWVkKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvbGQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmIChvbGRbaV0gPT09IHZub2Rlc1tpXSkgY29udGludWVcblx0XHRcdFx0XHRcdGVsc2UgaWYgKG9sZFtpXSA9PSBudWxsICYmIHZub2Rlc1tpXSAhPSBudWxsKSBjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGVzW2ldLCBob29rcywgbnMsIGdldE5leHRTaWJsaW5nKG9sZCwgaSArIDEsIG5leHRTaWJsaW5nKSlcblx0XHRcdFx0XHRcdGVsc2UgaWYgKHZub2Rlc1tpXSA9PSBudWxsKSByZW1vdmVOb2RlcyhvbGQsIGksIGkgKyAxLCB2bm9kZXMpXG5cdFx0XHRcdFx0XHRlbHNlIHVwZGF0ZU5vZGUocGFyZW50LCBvbGRbaV0sIHZub2Rlc1tpXSwgaG9va3MsIGdldE5leHRTaWJsaW5nKG9sZCwgaSArIDEsIG5leHRTaWJsaW5nKSwgcmVjeWNsaW5nLCBucylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJlY3ljbGluZyA9IHJlY3ljbGluZyB8fCBpc1JlY3ljbGFibGUob2xkLCB2bm9kZXMpXG5cdFx0XHRpZiAocmVjeWNsaW5nKSB7XG5cdFx0XHRcdHZhciBwb29sID0gb2xkLnBvb2xcblx0XHRcdFx0b2xkID0gb2xkLmNvbmNhdChvbGQucG9vbClcblx0XHRcdH1cblx0XHRcdHZhciBvbGRTdGFydCA9IDAsIHN0YXJ0ID0gMCwgb2xkRW5kID0gb2xkLmxlbmd0aCAtIDEsIGVuZCA9IHZub2Rlcy5sZW5ndGggLSAxLCBtYXBcblx0XHRcdHdoaWxlIChvbGRFbmQgPj0gb2xkU3RhcnQgJiYgZW5kID49IHN0YXJ0KSB7XG5cdFx0XHRcdHZhciBvID0gb2xkW29sZFN0YXJ0XSwgdiA9IHZub2Rlc1tzdGFydF1cblx0XHRcdFx0aWYgKG8gPT09IHYgJiYgIXJlY3ljbGluZykgb2xkU3RhcnQrKywgc3RhcnQrK1xuXHRcdFx0XHRlbHNlIGlmIChvID09IG51bGwpIG9sZFN0YXJ0Kytcblx0XHRcdFx0ZWxzZSBpZiAodiA9PSBudWxsKSBzdGFydCsrXG5cdFx0XHRcdGVsc2UgaWYgKG8ua2V5ID09PSB2LmtleSkge1xuXHRcdFx0XHRcdHZhciBzaG91bGRSZWN5Y2xlID0gKHBvb2wgIT0gbnVsbCAmJiBvbGRTdGFydCA+PSBvbGQubGVuZ3RoIC0gcG9vbC5sZW5ndGgpIHx8ICgocG9vbCA9PSBudWxsKSAmJiByZWN5Y2xpbmcpXG5cdFx0XHRcdFx0b2xkU3RhcnQrKywgc3RhcnQrK1xuXHRcdFx0XHRcdHVwZGF0ZU5vZGUocGFyZW50LCBvLCB2LCBob29rcywgZ2V0TmV4dFNpYmxpbmcob2xkLCBvbGRTdGFydCwgbmV4dFNpYmxpbmcpLCBzaG91bGRSZWN5Y2xlLCBucylcblx0XHRcdFx0XHRpZiAocmVjeWNsaW5nICYmIG8udGFnID09PSB2LnRhZykgaW5zZXJ0Tm9kZShwYXJlbnQsIHRvRnJhZ21lbnQobyksIG5leHRTaWJsaW5nKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHZhciBvID0gb2xkW29sZEVuZF1cblx0XHRcdFx0XHRpZiAobyA9PT0gdiAmJiAhcmVjeWNsaW5nKSBvbGRFbmQtLSwgc3RhcnQrK1xuXHRcdFx0XHRcdGVsc2UgaWYgKG8gPT0gbnVsbCkgb2xkRW5kLS1cblx0XHRcdFx0XHRlbHNlIGlmICh2ID09IG51bGwpIHN0YXJ0Kytcblx0XHRcdFx0XHRlbHNlIGlmIChvLmtleSA9PT0gdi5rZXkpIHtcblx0XHRcdFx0XHRcdHZhciBzaG91bGRSZWN5Y2xlID0gKHBvb2wgIT0gbnVsbCAmJiBvbGRFbmQgPj0gb2xkLmxlbmd0aCAtIHBvb2wubGVuZ3RoKSB8fCAoKHBvb2wgPT0gbnVsbCkgJiYgcmVjeWNsaW5nKVxuXHRcdFx0XHRcdFx0dXBkYXRlTm9kZShwYXJlbnQsIG8sIHYsIGhvb2tzLCBnZXROZXh0U2libGluZyhvbGQsIG9sZEVuZCArIDEsIG5leHRTaWJsaW5nKSwgc2hvdWxkUmVjeWNsZSwgbnMpXG5cdFx0XHRcdFx0XHRpZiAocmVjeWNsaW5nIHx8IHN0YXJ0IDwgZW5kKSBpbnNlcnROb2RlKHBhcmVudCwgdG9GcmFnbWVudChvKSwgZ2V0TmV4dFNpYmxpbmcob2xkLCBvbGRTdGFydCwgbmV4dFNpYmxpbmcpKVxuXHRcdFx0XHRcdFx0b2xkRW5kLS0sIHN0YXJ0Kytcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBicmVha1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR3aGlsZSAob2xkRW5kID49IG9sZFN0YXJ0ICYmIGVuZCA+PSBzdGFydCkge1xuXHRcdFx0XHR2YXIgbyA9IG9sZFtvbGRFbmRdLCB2ID0gdm5vZGVzW2VuZF1cblx0XHRcdFx0aWYgKG8gPT09IHYgJiYgIXJlY3ljbGluZykgb2xkRW5kLS0sIGVuZC0tXG5cdFx0XHRcdGVsc2UgaWYgKG8gPT0gbnVsbCkgb2xkRW5kLS1cblx0XHRcdFx0ZWxzZSBpZiAodiA9PSBudWxsKSBlbmQtLVxuXHRcdFx0XHRlbHNlIGlmIChvLmtleSA9PT0gdi5rZXkpIHtcblx0XHRcdFx0XHR2YXIgc2hvdWxkUmVjeWNsZSA9IChwb29sICE9IG51bGwgJiYgb2xkRW5kID49IG9sZC5sZW5ndGggLSBwb29sLmxlbmd0aCkgfHwgKChwb29sID09IG51bGwpICYmIHJlY3ljbGluZylcblx0XHRcdFx0XHR1cGRhdGVOb2RlKHBhcmVudCwgbywgdiwgaG9va3MsIGdldE5leHRTaWJsaW5nKG9sZCwgb2xkRW5kICsgMSwgbmV4dFNpYmxpbmcpLCBzaG91bGRSZWN5Y2xlLCBucylcblx0XHRcdFx0XHRpZiAocmVjeWNsaW5nICYmIG8udGFnID09PSB2LnRhZykgaW5zZXJ0Tm9kZShwYXJlbnQsIHRvRnJhZ21lbnQobyksIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdGlmIChvLmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IG8uZG9tXG5cdFx0XHRcdFx0b2xkRW5kLS0sIGVuZC0tXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0aWYgKCFtYXApIG1hcCA9IGdldEtleU1hcChvbGQsIG9sZEVuZClcblx0XHRcdFx0XHRpZiAodiAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHR2YXIgb2xkSW5kZXggPSBtYXBbdi5rZXldXG5cdFx0XHRcdFx0XHRpZiAob2xkSW5kZXggIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgbW92YWJsZSA9IG9sZFtvbGRJbmRleF1cblx0XHRcdFx0XHRcdFx0dmFyIHNob3VsZFJlY3ljbGUgPSAocG9vbCAhPSBudWxsICYmIG9sZEluZGV4ID49IG9sZC5sZW5ndGggLSBwb29sLmxlbmd0aCkgfHwgKChwb29sID09IG51bGwpICYmIHJlY3ljbGluZylcblx0XHRcdFx0XHRcdFx0dXBkYXRlTm9kZShwYXJlbnQsIG1vdmFibGUsIHYsIGhvb2tzLCBnZXROZXh0U2libGluZyhvbGQsIG9sZEVuZCArIDEsIG5leHRTaWJsaW5nKSwgcmVjeWNsaW5nLCBucylcblx0XHRcdFx0XHRcdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIHRvRnJhZ21lbnQobW92YWJsZSksIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdFx0XHRvbGRbb2xkSW5kZXhdLnNraXAgPSB0cnVlXG5cdFx0XHRcdFx0XHRcdGlmIChtb3ZhYmxlLmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IG1vdmFibGUuZG9tXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0dmFyIGRvbSA9IGNyZWF0ZU5vZGUocGFyZW50LCB2LCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdFx0XHRuZXh0U2libGluZyA9IGRvbVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbmQtLVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChlbmQgPCBzdGFydCkgYnJlYWtcblx0XHRcdH1cblx0XHRcdGNyZWF0ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCBzdGFydCwgZW5kICsgMSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdHJlbW92ZU5vZGVzKG9sZCwgb2xkU3RhcnQsIG9sZEVuZCArIDEsIHZub2Rlcylcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlTm9kZShwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgcmVjeWNsaW5nLCBucykge1xuXHRcdHZhciBvbGRUYWcgPSBvbGQudGFnLCB0YWcgPSB2bm9kZS50YWdcblx0XHRpZiAob2xkVGFnID09PSB0YWcpIHtcblx0XHRcdHZub2RlLnN0YXRlID0gb2xkLnN0YXRlXG5cdFx0XHR2bm9kZS5fc3RhdGUgPSBvbGQuX3N0YXRlXG5cdFx0XHR2bm9kZS5ldmVudHMgPSBvbGQuZXZlbnRzXG5cdFx0XHRpZiAoIXJlY3ljbGluZyAmJiBzaG91bGROb3RVcGRhdGUodm5vZGUsIG9sZCkpIHJldHVyblxuXHRcdFx0aWYgKHR5cGVvZiBvbGRUYWcgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwpIHtcblx0XHRcdFx0XHRpZiAocmVjeWNsaW5nKSB7XG5cdFx0XHRcdFx0XHR2bm9kZS5zdGF0ZSA9IHt9XG5cdFx0XHRcdFx0XHRpbml0TGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgdXBkYXRlTGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MpXG5cdFx0XHRcdH1cblx0XHRcdFx0c3dpdGNoIChvbGRUYWcpIHtcblx0XHRcdFx0XHRjYXNlIFwiI1wiOiB1cGRhdGVUZXh0KG9sZCwgdm5vZGUpOyBicmVha1xuXHRcdFx0XHRcdGNhc2UgXCI8XCI6IHVwZGF0ZUhUTUwocGFyZW50LCBvbGQsIHZub2RlLCBuZXh0U2libGluZyk7IGJyZWFrXG5cdFx0XHRcdFx0Y2FzZSBcIltcIjogdXBkYXRlRnJhZ21lbnQocGFyZW50LCBvbGQsIHZub2RlLCByZWN5Y2xpbmcsIGhvb2tzLCBuZXh0U2libGluZywgbnMpOyBicmVha1xuXHRcdFx0XHRcdGRlZmF1bHQ6IHVwZGF0ZUVsZW1lbnQob2xkLCB2bm9kZSwgcmVjeWNsaW5nLCBob29rcywgbnMpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgdXBkYXRlQ29tcG9uZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCByZWN5Y2xpbmcsIG5zKVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJlbW92ZU5vZGUob2xkLCBudWxsKVxuXHRcdFx0Y3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVUZXh0KG9sZCwgdm5vZGUpIHtcblx0XHRpZiAob2xkLmNoaWxkcmVuLnRvU3RyaW5nKCkgIT09IHZub2RlLmNoaWxkcmVuLnRvU3RyaW5nKCkpIHtcblx0XHRcdG9sZC5kb20ubm9kZVZhbHVlID0gdm5vZGUuY2hpbGRyZW5cblx0XHR9XG5cdFx0dm5vZGUuZG9tID0gb2xkLmRvbVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUhUTUwocGFyZW50LCBvbGQsIHZub2RlLCBuZXh0U2libGluZykge1xuXHRcdGlmIChvbGQuY2hpbGRyZW4gIT09IHZub2RlLmNoaWxkcmVuKSB7XG5cdFx0XHR0b0ZyYWdtZW50KG9sZClcblx0XHRcdGNyZWF0ZUhUTUwocGFyZW50LCB2bm9kZSwgbmV4dFNpYmxpbmcpXG5cdFx0fVxuXHRcdGVsc2Ugdm5vZGUuZG9tID0gb2xkLmRvbSwgdm5vZGUuZG9tU2l6ZSA9IG9sZC5kb21TaXplXG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlRnJhZ21lbnQocGFyZW50LCBvbGQsIHZub2RlLCByZWN5Y2xpbmcsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHR1cGRhdGVOb2RlcyhwYXJlbnQsIG9sZC5jaGlsZHJlbiwgdm5vZGUuY2hpbGRyZW4sIHJlY3ljbGluZywgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHR2YXIgZG9tU2l6ZSA9IDAsIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHR2bm9kZS5kb20gPSBudWxsXG5cdFx0aWYgKGNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGNoaWxkID0gY2hpbGRyZW5baV1cblx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwgJiYgY2hpbGQuZG9tICE9IG51bGwpIHtcblx0XHRcdFx0XHRpZiAodm5vZGUuZG9tID09IG51bGwpIHZub2RlLmRvbSA9IGNoaWxkLmRvbVxuXHRcdFx0XHRcdGRvbVNpemUgKz0gY2hpbGQuZG9tU2l6ZSB8fCAxXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChkb21TaXplICE9PSAxKSB2bm9kZS5kb21TaXplID0gZG9tU2l6ZVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVFbGVtZW50KG9sZCwgdm5vZGUsIHJlY3ljbGluZywgaG9va3MsIG5zKSB7XG5cdFx0dmFyIGVsZW1lbnQgPSB2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0bnMgPSBnZXROYW1lU3BhY2Uodm5vZGUpIHx8IG5zXG5cdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJ0ZXh0YXJlYVwiKSB7XG5cdFx0XHRpZiAodm5vZGUuYXR0cnMgPT0gbnVsbCkgdm5vZGUuYXR0cnMgPSB7fVxuXHRcdFx0aWYgKHZub2RlLnRleHQgIT0gbnVsbCkge1xuXHRcdFx0XHR2bm9kZS5hdHRycy52YWx1ZSA9IHZub2RlLnRleHQgLy9GSVhNRSBoYW5kbGUwIG11bHRpcGxlIGNoaWxkcmVuXG5cdFx0XHRcdHZub2RlLnRleHQgPSB1bmRlZmluZWRcblx0XHRcdH1cblx0XHR9XG5cdFx0dXBkYXRlQXR0cnModm5vZGUsIG9sZC5hdHRycywgdm5vZGUuYXR0cnMsIG5zKVxuXHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsICYmIHZub2RlLmF0dHJzLmNvbnRlbnRlZGl0YWJsZSAhPSBudWxsKSB7XG5cdFx0XHRzZXRDb250ZW50RWRpdGFibGUodm5vZGUpXG5cdFx0fVxuXHRcdGVsc2UgaWYgKG9sZC50ZXh0ICE9IG51bGwgJiYgdm5vZGUudGV4dCAhPSBudWxsICYmIHZub2RlLnRleHQgIT09IFwiXCIpIHtcblx0XHRcdGlmIChvbGQudGV4dC50b1N0cmluZygpICE9PSB2bm9kZS50ZXh0LnRvU3RyaW5nKCkpIG9sZC5kb20uZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSB2bm9kZS50ZXh0XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKG9sZC50ZXh0ICE9IG51bGwpIG9sZC5jaGlsZHJlbiA9IFtWbm9kZShcIiNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG9sZC50ZXh0LCB1bmRlZmluZWQsIG9sZC5kb20uZmlyc3RDaGlsZCldXG5cdFx0XHRpZiAodm5vZGUudGV4dCAhPSBudWxsKSB2bm9kZS5jaGlsZHJlbiA9IFtWbm9kZShcIiNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHZub2RlLnRleHQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKV1cblx0XHRcdHVwZGF0ZU5vZGVzKGVsZW1lbnQsIG9sZC5jaGlsZHJlbiwgdm5vZGUuY2hpbGRyZW4sIHJlY3ljbGluZywgaG9va3MsIG51bGwsIG5zKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVDb21wb25lbnQocGFyZW50LCBvbGQsIHZub2RlLCBob29rcywgbmV4dFNpYmxpbmcsIHJlY3ljbGluZywgbnMpIHtcblx0XHRpZiAocmVjeWNsaW5nKSB7XG5cdFx0XHRpbml0Q29tcG9uZW50KHZub2RlLCBob29rcylcblx0XHR9IGVsc2Uge1xuXHRcdFx0dm5vZGUuaW5zdGFuY2UgPSBWbm9kZS5ub3JtYWxpemUodm5vZGUuX3N0YXRlLnZpZXcuY2FsbCh2bm9kZS5zdGF0ZSwgdm5vZGUpKVxuXHRcdFx0aWYgKHZub2RlLmluc3RhbmNlID09PSB2bm9kZSkgdGhyb3cgRXJyb3IoXCJBIHZpZXcgY2Fubm90IHJldHVybiB0aGUgdm5vZGUgaXQgcmVjZWl2ZWQgYXMgYXJndW1lbnRcIilcblx0XHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKSB1cGRhdGVMaWZlY3ljbGUodm5vZGUuYXR0cnMsIHZub2RlLCBob29rcylcblx0XHRcdHVwZGF0ZUxpZmVjeWNsZSh2bm9kZS5fc3RhdGUsIHZub2RlLCBob29rcylcblx0XHR9XG5cdFx0aWYgKHZub2RlLmluc3RhbmNlICE9IG51bGwpIHtcblx0XHRcdGlmIChvbGQuaW5zdGFuY2UgPT0gbnVsbCkgY3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLmluc3RhbmNlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0ZWxzZSB1cGRhdGVOb2RlKHBhcmVudCwgb2xkLmluc3RhbmNlLCB2bm9kZS5pbnN0YW5jZSwgaG9va3MsIG5leHRTaWJsaW5nLCByZWN5Y2xpbmcsIG5zKVxuXHRcdFx0dm5vZGUuZG9tID0gdm5vZGUuaW5zdGFuY2UuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gdm5vZGUuaW5zdGFuY2UuZG9tU2l6ZVxuXHRcdH1cblx0XHRlbHNlIGlmIChvbGQuaW5zdGFuY2UgIT0gbnVsbCkge1xuXHRcdFx0cmVtb3ZlTm9kZShvbGQuaW5zdGFuY2UsIG51bGwpXG5cdFx0XHR2bm9kZS5kb20gPSB1bmRlZmluZWRcblx0XHRcdHZub2RlLmRvbVNpemUgPSAwXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dm5vZGUuZG9tID0gb2xkLmRvbVxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IG9sZC5kb21TaXplXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGlzUmVjeWNsYWJsZShvbGQsIHZub2Rlcykge1xuXHRcdGlmIChvbGQucG9vbCAhPSBudWxsICYmIE1hdGguYWJzKG9sZC5wb29sLmxlbmd0aCAtIHZub2Rlcy5sZW5ndGgpIDw9IE1hdGguYWJzKG9sZC5sZW5ndGggLSB2bm9kZXMubGVuZ3RoKSkge1xuXHRcdFx0dmFyIG9sZENoaWxkcmVuTGVuZ3RoID0gb2xkWzBdICYmIG9sZFswXS5jaGlsZHJlbiAmJiBvbGRbMF0uY2hpbGRyZW4ubGVuZ3RoIHx8IDBcblx0XHRcdHZhciBwb29sQ2hpbGRyZW5MZW5ndGggPSBvbGQucG9vbFswXSAmJiBvbGQucG9vbFswXS5jaGlsZHJlbiAmJiBvbGQucG9vbFswXS5jaGlsZHJlbi5sZW5ndGggfHwgMFxuXHRcdFx0dmFyIHZub2Rlc0NoaWxkcmVuTGVuZ3RoID0gdm5vZGVzWzBdICYmIHZub2Rlc1swXS5jaGlsZHJlbiAmJiB2bm9kZXNbMF0uY2hpbGRyZW4ubGVuZ3RoIHx8IDBcblx0XHRcdGlmIChNYXRoLmFicyhwb29sQ2hpbGRyZW5MZW5ndGggLSB2bm9kZXNDaGlsZHJlbkxlbmd0aCkgPD0gTWF0aC5hYnMob2xkQ2hpbGRyZW5MZW5ndGggLSB2bm9kZXNDaGlsZHJlbkxlbmd0aCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0ZnVuY3Rpb24gZ2V0S2V5TWFwKHZub2RlcywgZW5kKSB7XG5cdFx0dmFyIG1hcCA9IHt9LCBpID0gMFxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZW5kOyBpKyspIHtcblx0XHRcdHZhciB2bm9kZSA9IHZub2Rlc1tpXVxuXHRcdFx0aWYgKHZub2RlICE9IG51bGwpIHtcblx0XHRcdFx0dmFyIGtleTIgPSB2bm9kZS5rZXlcblx0XHRcdFx0aWYgKGtleTIgIT0gbnVsbCkgbWFwW2tleTJdID0gaVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbWFwXG5cdH1cblx0ZnVuY3Rpb24gdG9GcmFnbWVudCh2bm9kZSkge1xuXHRcdHZhciBjb3VudDAgPSB2bm9kZS5kb21TaXplXG5cdFx0aWYgKGNvdW50MCAhPSBudWxsIHx8IHZub2RlLmRvbSA9PSBudWxsKSB7XG5cdFx0XHR2YXIgZnJhZ21lbnQgPSAkZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXHRcdFx0aWYgKGNvdW50MCA+IDApIHtcblx0XHRcdFx0dmFyIGRvbSA9IHZub2RlLmRvbVxuXHRcdFx0XHR3aGlsZSAoLS1jb3VudDApIGZyYWdtZW50LmFwcGVuZENoaWxkKGRvbS5uZXh0U2libGluZylcblx0XHRcdFx0ZnJhZ21lbnQuaW5zZXJ0QmVmb3JlKGRvbSwgZnJhZ21lbnQuZmlyc3RDaGlsZClcblx0XHRcdH1cblx0XHRcdHJldHVybiBmcmFnbWVudFxuXHRcdH1cblx0XHRlbHNlIHJldHVybiB2bm9kZS5kb21cblx0fVxuXHRmdW5jdGlvbiBnZXROZXh0U2libGluZyh2bm9kZXMsIGksIG5leHRTaWJsaW5nKSB7XG5cdFx0Zm9yICg7IGkgPCB2bm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh2bm9kZXNbaV0gIT0gbnVsbCAmJiB2bm9kZXNbaV0uZG9tICE9IG51bGwpIHJldHVybiB2bm9kZXNbaV0uZG9tXG5cdFx0fVxuXHRcdHJldHVybiBuZXh0U2libGluZ1xuXHR9XG5cdGZ1bmN0aW9uIGluc2VydE5vZGUocGFyZW50LCBkb20sIG5leHRTaWJsaW5nKSB7XG5cdFx0aWYgKG5leHRTaWJsaW5nICYmIG5leHRTaWJsaW5nLnBhcmVudE5vZGUpIHBhcmVudC5pbnNlcnRCZWZvcmUoZG9tLCBuZXh0U2libGluZylcblx0XHRlbHNlIHBhcmVudC5hcHBlbmRDaGlsZChkb20pXG5cdH1cblx0ZnVuY3Rpb24gc2V0Q29udGVudEVkaXRhYmxlKHZub2RlKSB7XG5cdFx0dmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHRpZiAoY2hpbGRyZW4gIT0gbnVsbCAmJiBjaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgY2hpbGRyZW5bMF0udGFnID09PSBcIjxcIikge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjaGlsZHJlblswXS5jaGlsZHJlblxuXHRcdFx0aWYgKHZub2RlLmRvbS5pbm5lckhUTUwgIT09IGNvbnRlbnQpIHZub2RlLmRvbS5pbm5lckhUTUwgPSBjb250ZW50XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHZub2RlLnRleHQgIT0gbnVsbCB8fCBjaGlsZHJlbiAhPSBudWxsICYmIGNoaWxkcmVuLmxlbmd0aCAhPT0gMCkgdGhyb3cgbmV3IEVycm9yKFwiQ2hpbGQgbm9kZSBvZiBhIGNvbnRlbnRlZGl0YWJsZSBtdXN0IGJlIHRydXN0ZWRcIilcblx0fVxuXHQvL3JlbW92ZVxuXHRmdW5jdGlvbiByZW1vdmVOb2Rlcyh2bm9kZXMsIHN0YXJ0LCBlbmQsIGNvbnRleHQpIHtcblx0XHRmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0dmFyIHZub2RlID0gdm5vZGVzW2ldXG5cdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkge1xuXHRcdFx0XHRpZiAodm5vZGUuc2tpcCkgdm5vZGUuc2tpcCA9IGZhbHNlXG5cdFx0XHRcdGVsc2UgcmVtb3ZlTm9kZSh2bm9kZSwgY29udGV4dClcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcmVtb3ZlTm9kZSh2bm9kZSwgY29udGV4dCkge1xuXHRcdHZhciBleHBlY3RlZCA9IDEsIGNhbGxlZCA9IDBcblx0XHRpZiAodm5vZGUuYXR0cnMgJiYgdHlwZW9mIHZub2RlLmF0dHJzLm9uYmVmb3JlcmVtb3ZlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHZhciByZXN1bHQgPSB2bm9kZS5hdHRycy5vbmJlZm9yZXJlbW92ZS5jYWxsKHZub2RlLnN0YXRlLCB2bm9kZSlcblx0XHRcdGlmIChyZXN1bHQgIT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRleHBlY3RlZCsrXG5cdFx0XHRcdHJlc3VsdC50aGVuKGNvbnRpbnVhdGlvbiwgY29udGludWF0aW9uKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Ygdm5vZGUuX3N0YXRlLm9uYmVmb3JlcmVtb3ZlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHZhciByZXN1bHQgPSB2bm9kZS5fc3RhdGUub25iZWZvcmVyZW1vdmUuY2FsbCh2bm9kZS5zdGF0ZSwgdm5vZGUpXG5cdFx0XHRpZiAocmVzdWx0ICE9IG51bGwgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0ZXhwZWN0ZWQrK1xuXHRcdFx0XHRyZXN1bHQudGhlbihjb250aW51YXRpb24sIGNvbnRpbnVhdGlvbilcblx0XHRcdH1cblx0XHR9XG5cdFx0Y29udGludWF0aW9uKClcblx0XHRmdW5jdGlvbiBjb250aW51YXRpb24oKSB7XG5cdFx0XHRpZiAoKytjYWxsZWQgPT09IGV4cGVjdGVkKSB7XG5cdFx0XHRcdG9ucmVtb3ZlKHZub2RlKVxuXHRcdFx0XHRpZiAodm5vZGUuZG9tKSB7XG5cdFx0XHRcdFx0dmFyIGNvdW50MCA9IHZub2RlLmRvbVNpemUgfHwgMVxuXHRcdFx0XHRcdGlmIChjb3VudDAgPiAxKSB7XG5cdFx0XHRcdFx0XHR2YXIgZG9tID0gdm5vZGUuZG9tXG5cdFx0XHRcdFx0XHR3aGlsZSAoLS1jb3VudDApIHtcblx0XHRcdFx0XHRcdFx0cmVtb3ZlTm9kZUZyb21ET00oZG9tLm5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZW1vdmVOb2RlRnJvbURPTSh2bm9kZS5kb20pXG5cdFx0XHRcdFx0aWYgKGNvbnRleHQgIT0gbnVsbCAmJiB2bm9kZS5kb21TaXplID09IG51bGwgJiYgIWhhc0ludGVncmF0aW9uTWV0aG9kcyh2bm9kZS5hdHRycykgJiYgdHlwZW9mIHZub2RlLnRhZyA9PT0gXCJzdHJpbmdcIikgeyAvL1RPRE8gdGVzdCBjdXN0b20gZWxlbWVudHNcblx0XHRcdFx0XHRcdGlmICghY29udGV4dC5wb29sKSBjb250ZXh0LnBvb2wgPSBbdm5vZGVdXG5cdFx0XHRcdFx0XHRlbHNlIGNvbnRleHQucG9vbC5wdXNoKHZub2RlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiByZW1vdmVOb2RlRnJvbURPTShub2RlKSB7XG5cdFx0dmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZVxuXHRcdGlmIChwYXJlbnQgIT0gbnVsbCkgcGFyZW50LnJlbW92ZUNoaWxkKG5vZGUpXG5cdH1cblx0ZnVuY3Rpb24gb25yZW1vdmUodm5vZGUpIHtcblx0XHRpZiAodm5vZGUuYXR0cnMgJiYgdHlwZW9mIHZub2RlLmF0dHJzLm9ucmVtb3ZlID09PSBcImZ1bmN0aW9uXCIpIHZub2RlLmF0dHJzLm9ucmVtb3ZlLmNhbGwodm5vZGUuc3RhdGUsIHZub2RlKVxuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRpZiAodHlwZW9mIHZub2RlLl9zdGF0ZS5vbnJlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSB2bm9kZS5fc3RhdGUub25yZW1vdmUuY2FsbCh2bm9kZS5zdGF0ZSwgdm5vZGUpXG5cdFx0XHRpZiAodm5vZGUuaW5zdGFuY2UgIT0gbnVsbCkgb25yZW1vdmUodm5vZGUuaW5zdGFuY2UpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG5cdFx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwpIG9ucmVtb3ZlKGNoaWxkKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdC8vYXR0cnMyXG5cdGZ1bmN0aW9uIHNldEF0dHJzKHZub2RlLCBhdHRyczIsIG5zKSB7XG5cdFx0Zm9yICh2YXIga2V5MiBpbiBhdHRyczIpIHtcblx0XHRcdHNldEF0dHIodm5vZGUsIGtleTIsIG51bGwsIGF0dHJzMltrZXkyXSwgbnMpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHNldEF0dHIodm5vZGUsIGtleTIsIG9sZCwgdmFsdWUsIG5zKSB7XG5cdFx0dmFyIGVsZW1lbnQgPSB2bm9kZS5kb21cblx0XHRpZiAoa2V5MiA9PT0gXCJrZXlcIiB8fCBrZXkyID09PSBcImlzXCIgfHwgKG9sZCA9PT0gdmFsdWUgJiYgIWlzRm9ybUF0dHJpYnV0ZSh2bm9kZSwga2V5MikpICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIgfHwgaXNMaWZlY3ljbGVNZXRob2Qoa2V5MikpIHJldHVyblxuXHRcdHZhciBuc0xhc3RJbmRleCA9IGtleTIuaW5kZXhPZihcIjpcIilcblx0XHRpZiAobnNMYXN0SW5kZXggPiAtMSAmJiBrZXkyLnN1YnN0cigwLCBuc0xhc3RJbmRleCkgPT09IFwieGxpbmtcIikge1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiwga2V5Mi5zbGljZShuc0xhc3RJbmRleCArIDEpLCB2YWx1ZSlcblx0XHR9XG5cdFx0ZWxzZSBpZiAoa2V5MlswXSA9PT0gXCJvXCIgJiYga2V5MlsxXSA9PT0gXCJuXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHVwZGF0ZUV2ZW50KHZub2RlLCBrZXkyLCB2YWx1ZSlcblx0XHRlbHNlIGlmIChrZXkyID09PSBcInN0eWxlXCIpIHVwZGF0ZVN0eWxlKGVsZW1lbnQsIG9sZCwgdmFsdWUpXG5cdFx0ZWxzZSBpZiAoa2V5MiBpbiBlbGVtZW50ICYmICFpc0F0dHJpYnV0ZShrZXkyKSAmJiBucyA9PT0gdW5kZWZpbmVkICYmICFpc0N1c3RvbUVsZW1lbnQodm5vZGUpKSB7XG5cdFx0XHRpZiAoa2V5MiA9PT0gXCJ2YWx1ZVwiKSB7XG5cdFx0XHRcdHZhciBub3JtYWxpemVkMCA9IFwiXCIgKyB2YWx1ZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWltcGxpY2l0LWNvZXJjaW9uXG5cdFx0XHRcdC8vc2V0dGluZyBpbnB1dFt2YWx1ZV0gdG8gc2FtZSB2YWx1ZSBieSB0eXBpbmcgb24gZm9jdXNlZCBlbGVtZW50IG1vdmVzIGN1cnNvciB0byBlbmQgaW4gQ2hyb21lXG5cdFx0XHRcdGlmICgodm5vZGUudGFnID09PSBcImlucHV0XCIgfHwgdm5vZGUudGFnID09PSBcInRleHRhcmVhXCIpICYmIHZub2RlLmRvbS52YWx1ZSA9PT0gbm9ybWFsaXplZDAgJiYgdm5vZGUuZG9tID09PSAkZG9jLmFjdGl2ZUVsZW1lbnQpIHJldHVyblxuXHRcdFx0XHQvL3NldHRpbmcgc2VsZWN0W3ZhbHVlXSB0byBzYW1lIHZhbHVlIHdoaWxlIGhhdmluZyBzZWxlY3Qgb3BlbiBibGlua3Mgc2VsZWN0IGRyb3Bkb3duIGluIENocm9tZVxuXHRcdFx0XHRpZiAodm5vZGUudGFnID09PSBcInNlbGVjdFwiKSB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRpZiAodm5vZGUuZG9tLnNlbGVjdGVkSW5kZXggPT09IC0xICYmIHZub2RlLmRvbSA9PT0gJGRvYy5hY3RpdmVFbGVtZW50KSByZXR1cm5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKG9sZCAhPT0gbnVsbCAmJiB2bm9kZS5kb20udmFsdWUgPT09IG5vcm1hbGl6ZWQwICYmIHZub2RlLmRvbSA9PT0gJGRvYy5hY3RpdmVFbGVtZW50KSByZXR1cm5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly9zZXR0aW5nIG9wdGlvblt2YWx1ZV0gdG8gc2FtZSB2YWx1ZSB3aGlsZSBoYXZpbmcgc2VsZWN0IG9wZW4gYmxpbmtzIHNlbGVjdCBkcm9wZG93biBpbiBDaHJvbWVcblx0XHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJvcHRpb25cIiAmJiBvbGQgIT0gbnVsbCAmJiB2bm9kZS5kb20udmFsdWUgPT09IG5vcm1hbGl6ZWQwKSByZXR1cm5cblx0XHRcdH1cblx0XHRcdC8vIElmIHlvdSBhc3NpZ24gYW4gaW5wdXQgdHlwZTEgdGhhdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IElFIDExIHdpdGggYW4gYXNzaWdubWVudCBleHByZXNzaW9uLCBhbiBlcnJvcjAgd2lsbCBvY2N1ci5cblx0XHRcdGlmICh2bm9kZS50YWcgPT09IFwiaW5wdXRcIiAmJiBrZXkyID09PSBcInR5cGVcIikge1xuXHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXkyLCB2YWx1ZSlcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHRlbGVtZW50W2tleTJdID0gdmFsdWVcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xuXHRcdFx0XHRpZiAodmFsdWUpIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleTIsIFwiXCIpXG5cdFx0XHRcdGVsc2UgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoa2V5Milcblx0XHRcdH1cblx0XHRcdGVsc2UgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5MiA9PT0gXCJjbGFzc05hbWVcIiA/IFwiY2xhc3NcIiA6IGtleTIsIHZhbHVlKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBzZXRMYXRlQXR0cnModm5vZGUpIHtcblx0XHR2YXIgYXR0cnMyID0gdm5vZGUuYXR0cnNcblx0XHRpZiAodm5vZGUudGFnID09PSBcInNlbGVjdFwiICYmIGF0dHJzMiAhPSBudWxsKSB7XG5cdFx0XHRpZiAoXCJ2YWx1ZVwiIGluIGF0dHJzMikgc2V0QXR0cih2bm9kZSwgXCJ2YWx1ZVwiLCBudWxsLCBhdHRyczIudmFsdWUsIHVuZGVmaW5lZClcblx0XHRcdGlmIChcInNlbGVjdGVkSW5kZXhcIiBpbiBhdHRyczIpIHNldEF0dHIodm5vZGUsIFwic2VsZWN0ZWRJbmRleFwiLCBudWxsLCBhdHRyczIuc2VsZWN0ZWRJbmRleCwgdW5kZWZpbmVkKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVBdHRycyh2bm9kZSwgb2xkLCBhdHRyczIsIG5zKSB7XG5cdFx0aWYgKGF0dHJzMiAhPSBudWxsKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkyIGluIGF0dHJzMikge1xuXHRcdFx0XHRzZXRBdHRyKHZub2RlLCBrZXkyLCBvbGQgJiYgb2xkW2tleTJdLCBhdHRyczJba2V5Ml0sIG5zKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAob2xkICE9IG51bGwpIHtcblx0XHRcdGZvciAodmFyIGtleTIgaW4gb2xkKSB7XG5cdFx0XHRcdGlmIChhdHRyczIgPT0gbnVsbCB8fCAhKGtleTIgaW4gYXR0cnMyKSkge1xuXHRcdFx0XHRcdGlmIChrZXkyID09PSBcImNsYXNzTmFtZVwiKSBrZXkyID0gXCJjbGFzc1wiXG5cdFx0XHRcdFx0aWYgKGtleTJbMF0gPT09IFwib1wiICYmIGtleTJbMV0gPT09IFwiblwiICYmICFpc0xpZmVjeWNsZU1ldGhvZChrZXkyKSkgdXBkYXRlRXZlbnQodm5vZGUsIGtleTIsIHVuZGVmaW5lZClcblx0XHRcdFx0XHRlbHNlIGlmIChrZXkyICE9PSBcImtleVwiKSB2bm9kZS5kb20ucmVtb3ZlQXR0cmlidXRlKGtleTIpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gaXNGb3JtQXR0cmlidXRlKHZub2RlLCBhdHRyKSB7XG5cdFx0cmV0dXJuIGF0dHIgPT09IFwidmFsdWVcIiB8fCBhdHRyID09PSBcImNoZWNrZWRcIiB8fCBhdHRyID09PSBcInNlbGVjdGVkSW5kZXhcIiB8fCBhdHRyID09PSBcInNlbGVjdGVkXCIgJiYgdm5vZGUuZG9tID09PSAkZG9jLmFjdGl2ZUVsZW1lbnRcblx0fVxuXHRmdW5jdGlvbiBpc0xpZmVjeWNsZU1ldGhvZChhdHRyKSB7XG5cdFx0cmV0dXJuIGF0dHIgPT09IFwib25pbml0XCIgfHwgYXR0ciA9PT0gXCJvbmNyZWF0ZVwiIHx8IGF0dHIgPT09IFwib251cGRhdGVcIiB8fCBhdHRyID09PSBcIm9ucmVtb3ZlXCIgfHwgYXR0ciA9PT0gXCJvbmJlZm9yZXJlbW92ZVwiIHx8IGF0dHIgPT09IFwib25iZWZvcmV1cGRhdGVcIlxuXHR9XG5cdGZ1bmN0aW9uIGlzQXR0cmlidXRlKGF0dHIpIHtcblx0XHRyZXR1cm4gYXR0ciA9PT0gXCJocmVmXCIgfHwgYXR0ciA9PT0gXCJsaXN0XCIgfHwgYXR0ciA9PT0gXCJmb3JtXCIgfHwgYXR0ciA9PT0gXCJ3aWR0aFwiIHx8IGF0dHIgPT09IFwiaGVpZ2h0XCIvLyB8fCBhdHRyID09PSBcInR5cGVcIlxuXHR9XG5cdGZ1bmN0aW9uIGlzQ3VzdG9tRWxlbWVudCh2bm9kZSl7XG5cdFx0cmV0dXJuIHZub2RlLmF0dHJzLmlzIHx8IHZub2RlLnRhZy5pbmRleE9mKFwiLVwiKSA+IC0xXG5cdH1cblx0ZnVuY3Rpb24gaGFzSW50ZWdyYXRpb25NZXRob2RzKHNvdXJjZSkge1xuXHRcdHJldHVybiBzb3VyY2UgIT0gbnVsbCAmJiAoc291cmNlLm9uY3JlYXRlIHx8IHNvdXJjZS5vbnVwZGF0ZSB8fCBzb3VyY2Uub25iZWZvcmVyZW1vdmUgfHwgc291cmNlLm9ucmVtb3ZlKVxuXHR9XG5cdC8vc3R5bGVcblx0ZnVuY3Rpb24gdXBkYXRlU3R5bGUoZWxlbWVudCwgb2xkLCBzdHlsZSkge1xuXHRcdGlmIChvbGQgPT09IHN0eWxlKSBlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBcIlwiLCBvbGQgPSBudWxsXG5cdFx0aWYgKHN0eWxlID09IG51bGwpIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IFwiXCJcblx0XHRlbHNlIGlmICh0eXBlb2Ygc3R5bGUgPT09IFwic3RyaW5nXCIpIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlXG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodHlwZW9mIG9sZCA9PT0gXCJzdHJpbmdcIikgZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gXCJcIlxuXHRcdFx0Zm9yICh2YXIga2V5MiBpbiBzdHlsZSkge1xuXHRcdFx0XHRlbGVtZW50LnN0eWxlW2tleTJdID0gc3R5bGVba2V5Ml1cblx0XHRcdH1cblx0XHRcdGlmIChvbGQgIT0gbnVsbCAmJiB0eXBlb2Ygb2xkICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleTIgaW4gb2xkKSB7XG5cdFx0XHRcdFx0aWYgKCEoa2V5MiBpbiBzdHlsZSkpIGVsZW1lbnQuc3R5bGVba2V5Ml0gPSBcIlwiXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Ly9ldmVudFxuXHRmdW5jdGlvbiB1cGRhdGVFdmVudCh2bm9kZSwga2V5MiwgdmFsdWUpIHtcblx0XHR2YXIgZWxlbWVudCA9IHZub2RlLmRvbVxuXHRcdHZhciBjYWxsYmFjayA9IHR5cGVvZiBvbmV2ZW50ICE9PSBcImZ1bmN0aW9uXCIgPyB2YWx1ZSA6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdHZhciByZXN1bHQgPSB2YWx1ZS5jYWxsKGVsZW1lbnQsIGUpXG5cdFx0XHRvbmV2ZW50LmNhbGwoZWxlbWVudCwgZSlcblx0XHRcdHJldHVybiByZXN1bHRcblx0XHR9XG5cdFx0aWYgKGtleTIgaW4gZWxlbWVudCkgZWxlbWVudFtrZXkyXSA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gY2FsbGJhY2sgOiBudWxsXG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgZXZlbnROYW1lID0ga2V5Mi5zbGljZSgyKVxuXHRcdFx0aWYgKHZub2RlLmV2ZW50cyA9PT0gdW5kZWZpbmVkKSB2bm9kZS5ldmVudHMgPSB7fVxuXHRcdFx0aWYgKHZub2RlLmV2ZW50c1trZXkyXSA9PT0gY2FsbGJhY2spIHJldHVyblxuXHRcdFx0aWYgKHZub2RlLmV2ZW50c1trZXkyXSAhPSBudWxsKSBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB2bm9kZS5ldmVudHNba2V5Ml0sIGZhbHNlKVxuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHZub2RlLmV2ZW50c1trZXkyXSA9IGNhbGxiYWNrXG5cdFx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHZub2RlLmV2ZW50c1trZXkyXSwgZmFsc2UpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdC8vbGlmZWN5Y2xlXG5cdGZ1bmN0aW9uIGluaXRMaWZlY3ljbGUoc291cmNlLCB2bm9kZSwgaG9va3MpIHtcblx0XHRpZiAodHlwZW9mIHNvdXJjZS5vbmluaXQgPT09IFwiZnVuY3Rpb25cIikgc291cmNlLm9uaW5pdC5jYWxsKHZub2RlLnN0YXRlLCB2bm9kZSlcblx0XHRpZiAodHlwZW9mIHNvdXJjZS5vbmNyZWF0ZSA9PT0gXCJmdW5jdGlvblwiKSBob29rcy5wdXNoKHNvdXJjZS5vbmNyZWF0ZS5iaW5kKHZub2RlLnN0YXRlLCB2bm9kZSkpXG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlTGlmZWN5Y2xlKHNvdXJjZSwgdm5vZGUsIGhvb2tzKSB7XG5cdFx0aWYgKHR5cGVvZiBzb3VyY2Uub251cGRhdGUgPT09IFwiZnVuY3Rpb25cIikgaG9va3MucHVzaChzb3VyY2Uub251cGRhdGUuYmluZCh2bm9kZS5zdGF0ZSwgdm5vZGUpKVxuXHR9XG5cdGZ1bmN0aW9uIHNob3VsZE5vdFVwZGF0ZSh2bm9kZSwgb2xkKSB7XG5cdFx0dmFyIGZvcmNlVm5vZGVVcGRhdGUsIGZvcmNlQ29tcG9uZW50VXBkYXRlXG5cdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwgJiYgdHlwZW9mIHZub2RlLmF0dHJzLm9uYmVmb3JldXBkYXRlID09PSBcImZ1bmN0aW9uXCIpIGZvcmNlVm5vZGVVcGRhdGUgPSB2bm9kZS5hdHRycy5vbmJlZm9yZXVwZGF0ZS5jYWxsKHZub2RlLnN0YXRlLCB2bm9kZSwgb2xkKVxuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2bm9kZS5fc3RhdGUub25iZWZvcmV1cGRhdGUgPT09IFwiZnVuY3Rpb25cIikgZm9yY2VDb21wb25lbnRVcGRhdGUgPSB2bm9kZS5fc3RhdGUub25iZWZvcmV1cGRhdGUuY2FsbCh2bm9kZS5zdGF0ZSwgdm5vZGUsIG9sZClcblx0XHRpZiAoIShmb3JjZVZub2RlVXBkYXRlID09PSB1bmRlZmluZWQgJiYgZm9yY2VDb21wb25lbnRVcGRhdGUgPT09IHVuZGVmaW5lZCkgJiYgIWZvcmNlVm5vZGVVcGRhdGUgJiYgIWZvcmNlQ29tcG9uZW50VXBkYXRlKSB7XG5cdFx0XHR2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gb2xkLmRvbVNpemVcblx0XHRcdHZub2RlLmluc3RhbmNlID0gb2xkLmluc3RhbmNlXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXHRmdW5jdGlvbiByZW5kZXIoZG9tLCB2bm9kZXMpIHtcblx0XHRpZiAoIWRvbSkgdGhyb3cgbmV3IEVycm9yKFwiRW5zdXJlIHRoZSBET00gZWxlbWVudCBiZWluZyBwYXNzZWQgdG8gbS5yb3V0ZS9tLm1vdW50L20ucmVuZGVyIGlzIG5vdCB1bmRlZmluZWQuXCIpXG5cdFx0dmFyIGhvb2tzID0gW11cblx0XHR2YXIgYWN0aXZlID0gJGRvYy5hY3RpdmVFbGVtZW50XG5cdFx0dmFyIG5hbWVzcGFjZSA9IGRvbS5uYW1lc3BhY2VVUklcblx0XHQvLyBGaXJzdCB0aW1lMCByZW5kZXJpbmcgaW50byBhIG5vZGUgY2xlYXJzIGl0IG91dFxuXHRcdGlmIChkb20udm5vZGVzID09IG51bGwpIGRvbS50ZXh0Q29udGVudCA9IFwiXCJcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkodm5vZGVzKSkgdm5vZGVzID0gW3Zub2Rlc11cblx0XHR1cGRhdGVOb2Rlcyhkb20sIGRvbS52bm9kZXMsIFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKHZub2RlcyksIGZhbHNlLCBob29rcywgbnVsbCwgbmFtZXNwYWNlID09PSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiA/IHVuZGVmaW5lZCA6IG5hbWVzcGFjZSlcblx0XHRkb20udm5vZGVzID0gdm5vZGVzXG5cdFx0Ly8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBjYW4gcmV0dXJuIG51bGwgaW4gSUUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L2FjdGl2ZUVsZW1lbnRcblx0XHRpZiAoYWN0aXZlICE9IG51bGwgJiYgJGRvYy5hY3RpdmVFbGVtZW50ICE9PSBhY3RpdmUpIGFjdGl2ZS5mb2N1cygpXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7IGkrKykgaG9va3NbaV0oKVxuXHR9XG5cdHJldHVybiB7cmVuZGVyOiByZW5kZXIsIHNldEV2ZW50Q2FsbGJhY2s6IHNldEV2ZW50Q2FsbGJhY2t9XG59XG5mdW5jdGlvbiB0aHJvdHRsZShjYWxsYmFjaykge1xuXHQvLzYwZnBzIHRyYW5zbGF0ZXMgdG8gMTYuNm1zLCByb3VuZCBpdCBkb3duIHNpbmNlIHNldFRpbWVvdXQgcmVxdWlyZXMgaW50XG5cdHZhciB0aW1lID0gMTZcblx0dmFyIGxhc3QgPSAwLCBwZW5kaW5nID0gbnVsbFxuXHR2YXIgdGltZW91dCA9IHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09IFwiZnVuY3Rpb25cIiA/IHJlcXVlc3RBbmltYXRpb25GcmFtZSA6IHNldFRpbWVvdXRcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBub3cgPSBEYXRlLm5vdygpXG5cdFx0aWYgKGxhc3QgPT09IDAgfHwgbm93IC0gbGFzdCA+PSB0aW1lKSB7XG5cdFx0XHRsYXN0ID0gbm93XG5cdFx0XHRjYWxsYmFjaygpXG5cdFx0fVxuXHRcdGVsc2UgaWYgKHBlbmRpbmcgPT09IG51bGwpIHtcblx0XHRcdHBlbmRpbmcgPSB0aW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRwZW5kaW5nID0gbnVsbFxuXHRcdFx0XHRjYWxsYmFjaygpXG5cdFx0XHRcdGxhc3QgPSBEYXRlLm5vdygpXG5cdFx0XHR9LCB0aW1lIC0gKG5vdyAtIGxhc3QpKVxuXHRcdH1cblx0fVxufVxudmFyIF8xMSA9IGZ1bmN0aW9uKCR3aW5kb3cpIHtcblx0dmFyIHJlbmRlclNlcnZpY2UgPSBjb3JlUmVuZGVyZXIoJHdpbmRvdylcblx0cmVuZGVyU2VydmljZS5zZXRFdmVudENhbGxiYWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRpZiAoZS5yZWRyYXcgPT09IGZhbHNlKSBlLnJlZHJhdyA9IHVuZGVmaW5lZFxuXHRcdGVsc2UgcmVkcmF3KClcblx0fSlcblx0dmFyIGNhbGxiYWNrcyA9IFtdXG5cdGZ1bmN0aW9uIHN1YnNjcmliZShrZXkxLCBjYWxsYmFjaykge1xuXHRcdHVuc3Vic2NyaWJlKGtleTEpXG5cdFx0Y2FsbGJhY2tzLnB1c2goa2V5MSwgdGhyb3R0bGUoY2FsbGJhY2spKVxuXHR9XG5cdGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGtleTEpIHtcblx0XHR2YXIgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihrZXkxKVxuXHRcdGlmIChpbmRleCA+IC0xKSBjYWxsYmFja3Muc3BsaWNlKGluZGV4LCAyKVxuXHR9XG5cdGZ1bmN0aW9uIHJlZHJhdygpIHtcblx0XHRmb3IgKHZhciBpID0gMTsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkgKz0gMikge1xuXHRcdFx0Y2FsbGJhY2tzW2ldKClcblx0XHR9XG5cdH1cblx0cmV0dXJuIHtzdWJzY3JpYmU6IHN1YnNjcmliZSwgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlLCByZWRyYXc6IHJlZHJhdywgcmVuZGVyOiByZW5kZXJTZXJ2aWNlLnJlbmRlcn1cbn1cbnZhciByZWRyYXdTZXJ2aWNlID0gXzExKHdpbmRvdylcbnJlcXVlc3RTZXJ2aWNlLnNldENvbXBsZXRpb25DYWxsYmFjayhyZWRyYXdTZXJ2aWNlLnJlZHJhdylcbnZhciBfMTYgPSBmdW5jdGlvbihyZWRyYXdTZXJ2aWNlMCkge1xuXHRyZXR1cm4gZnVuY3Rpb24ocm9vdCwgY29tcG9uZW50KSB7XG5cdFx0aWYgKGNvbXBvbmVudCA9PT0gbnVsbCkge1xuXHRcdFx0cmVkcmF3U2VydmljZTAucmVuZGVyKHJvb3QsIFtdKVxuXHRcdFx0cmVkcmF3U2VydmljZTAudW5zdWJzY3JpYmUocm9vdClcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRcblx0XHRpZiAoY29tcG9uZW50LnZpZXcgPT0gbnVsbCAmJiB0eXBlb2YgY29tcG9uZW50ICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcihcIm0ubW91bnQoZWxlbWVudCwgY29tcG9uZW50KSBleHBlY3RzIGEgY29tcG9uZW50LCBub3QgYSB2bm9kZVwiKVxuXHRcdFxuXHRcdHZhciBydW4wID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZWRyYXdTZXJ2aWNlMC5yZW5kZXIocm9vdCwgVm5vZGUoY29tcG9uZW50KSlcblx0XHR9XG5cdFx0cmVkcmF3U2VydmljZTAuc3Vic2NyaWJlKHJvb3QsIHJ1bjApXG5cdFx0cmVkcmF3U2VydmljZTAucmVkcmF3KClcblx0fVxufVxubS5tb3VudCA9IF8xNihyZWRyYXdTZXJ2aWNlKVxudmFyIFByb21pc2UgPSBQcm9taXNlUG9seWZpbGxcbnZhciBwYXJzZVF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24oc3RyaW5nKSB7XG5cdGlmIChzdHJpbmcgPT09IFwiXCIgfHwgc3RyaW5nID09IG51bGwpIHJldHVybiB7fVxuXHRpZiAoc3RyaW5nLmNoYXJBdCgwKSA9PT0gXCI/XCIpIHN0cmluZyA9IHN0cmluZy5zbGljZSgxKVxuXHR2YXIgZW50cmllcyA9IHN0cmluZy5zcGxpdChcIiZcIiksIGRhdGEwID0ge30sIGNvdW50ZXJzID0ge31cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGVudHJ5ID0gZW50cmllc1tpXS5zcGxpdChcIj1cIilcblx0XHR2YXIga2V5NSA9IGRlY29kZVVSSUNvbXBvbmVudChlbnRyeVswXSlcblx0XHR2YXIgdmFsdWUgPSBlbnRyeS5sZW5ndGggPT09IDIgPyBkZWNvZGVVUklDb21wb25lbnQoZW50cnlbMV0pIDogXCJcIlxuXHRcdGlmICh2YWx1ZSA9PT0gXCJ0cnVlXCIpIHZhbHVlID0gdHJ1ZVxuXHRcdGVsc2UgaWYgKHZhbHVlID09PSBcImZhbHNlXCIpIHZhbHVlID0gZmFsc2Vcblx0XHR2YXIgbGV2ZWxzID0ga2V5NS5zcGxpdCgvXFxdXFxbP3xcXFsvKVxuXHRcdHZhciBjdXJzb3IgPSBkYXRhMFxuXHRcdGlmIChrZXk1LmluZGV4T2YoXCJbXCIpID4gLTEpIGxldmVscy5wb3AoKVxuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgbGV2ZWxzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHR2YXIgbGV2ZWwgPSBsZXZlbHNbal0sIG5leHRMZXZlbCA9IGxldmVsc1tqICsgMV1cblx0XHRcdHZhciBpc051bWJlciA9IG5leHRMZXZlbCA9PSBcIlwiIHx8ICFpc05hTihwYXJzZUludChuZXh0TGV2ZWwsIDEwKSlcblx0XHRcdHZhciBpc1ZhbHVlID0gaiA9PT0gbGV2ZWxzLmxlbmd0aCAtIDFcblx0XHRcdGlmIChsZXZlbCA9PT0gXCJcIikge1xuXHRcdFx0XHR2YXIga2V5NSA9IGxldmVscy5zbGljZSgwLCBqKS5qb2luKClcblx0XHRcdFx0aWYgKGNvdW50ZXJzW2tleTVdID09IG51bGwpIGNvdW50ZXJzW2tleTVdID0gMFxuXHRcdFx0XHRsZXZlbCA9IGNvdW50ZXJzW2tleTVdKytcblx0XHRcdH1cblx0XHRcdGlmIChjdXJzb3JbbGV2ZWxdID09IG51bGwpIHtcblx0XHRcdFx0Y3Vyc29yW2xldmVsXSA9IGlzVmFsdWUgPyB2YWx1ZSA6IGlzTnVtYmVyID8gW10gOiB7fVxuXHRcdFx0fVxuXHRcdFx0Y3Vyc29yID0gY3Vyc29yW2xldmVsXVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZGF0YTBcbn1cbnZhciBjb3JlUm91dGVyID0gZnVuY3Rpb24oJHdpbmRvdykge1xuXHR2YXIgc3VwcG9ydHNQdXNoU3RhdGUgPSB0eXBlb2YgJHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9PT0gXCJmdW5jdGlvblwiXG5cdHZhciBjYWxsQXN5bmMwID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0SW1tZWRpYXRlIDogc2V0VGltZW91dFxuXHRmdW5jdGlvbiBub3JtYWxpemUxKGZyYWdtZW50MCkge1xuXHRcdHZhciBkYXRhID0gJHdpbmRvdy5sb2NhdGlvbltmcmFnbWVudDBdLnJlcGxhY2UoLyg/OiVbYS1mODldW2EtZjAtOV0pKy9naW0sIGRlY29kZVVSSUNvbXBvbmVudClcblx0XHRpZiAoZnJhZ21lbnQwID09PSBcInBhdGhuYW1lXCIgJiYgZGF0YVswXSAhPT0gXCIvXCIpIGRhdGEgPSBcIi9cIiArIGRhdGFcblx0XHRyZXR1cm4gZGF0YVxuXHR9XG5cdHZhciBhc3luY0lkXG5cdGZ1bmN0aW9uIGRlYm91bmNlQXN5bmMoY2FsbGJhY2swKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKGFzeW5jSWQgIT0gbnVsbCkgcmV0dXJuXG5cdFx0XHRhc3luY0lkID0gY2FsbEFzeW5jMChmdW5jdGlvbigpIHtcblx0XHRcdFx0YXN5bmNJZCA9IG51bGxcblx0XHRcdFx0Y2FsbGJhY2swKClcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHBhcnNlUGF0aChwYXRoLCBxdWVyeURhdGEsIGhhc2hEYXRhKSB7XG5cdFx0dmFyIHF1ZXJ5SW5kZXggPSBwYXRoLmluZGV4T2YoXCI/XCIpXG5cdFx0dmFyIGhhc2hJbmRleCA9IHBhdGguaW5kZXhPZihcIiNcIilcblx0XHR2YXIgcGF0aEVuZCA9IHF1ZXJ5SW5kZXggPiAtMSA/IHF1ZXJ5SW5kZXggOiBoYXNoSW5kZXggPiAtMSA/IGhhc2hJbmRleCA6IHBhdGgubGVuZ3RoXG5cdFx0aWYgKHF1ZXJ5SW5kZXggPiAtMSkge1xuXHRcdFx0dmFyIHF1ZXJ5RW5kID0gaGFzaEluZGV4ID4gLTEgPyBoYXNoSW5kZXggOiBwYXRoLmxlbmd0aFxuXHRcdFx0dmFyIHF1ZXJ5UGFyYW1zID0gcGFyc2VRdWVyeVN0cmluZyhwYXRoLnNsaWNlKHF1ZXJ5SW5kZXggKyAxLCBxdWVyeUVuZCkpXG5cdFx0XHRmb3IgKHZhciBrZXk0IGluIHF1ZXJ5UGFyYW1zKSBxdWVyeURhdGFba2V5NF0gPSBxdWVyeVBhcmFtc1trZXk0XVxuXHRcdH1cblx0XHRpZiAoaGFzaEluZGV4ID4gLTEpIHtcblx0XHRcdHZhciBoYXNoUGFyYW1zID0gcGFyc2VRdWVyeVN0cmluZyhwYXRoLnNsaWNlKGhhc2hJbmRleCArIDEpKVxuXHRcdFx0Zm9yICh2YXIga2V5NCBpbiBoYXNoUGFyYW1zKSBoYXNoRGF0YVtrZXk0XSA9IGhhc2hQYXJhbXNba2V5NF1cblx0XHR9XG5cdFx0cmV0dXJuIHBhdGguc2xpY2UoMCwgcGF0aEVuZClcblx0fVxuXHR2YXIgcm91dGVyID0ge3ByZWZpeDogXCIjIVwifVxuXHRyb3V0ZXIuZ2V0UGF0aCA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciB0eXBlMiA9IHJvdXRlci5wcmVmaXguY2hhckF0KDApXG5cdFx0c3dpdGNoICh0eXBlMikge1xuXHRcdFx0Y2FzZSBcIiNcIjogcmV0dXJuIG5vcm1hbGl6ZTEoXCJoYXNoXCIpLnNsaWNlKHJvdXRlci5wcmVmaXgubGVuZ3RoKVxuXHRcdFx0Y2FzZSBcIj9cIjogcmV0dXJuIG5vcm1hbGl6ZTEoXCJzZWFyY2hcIikuc2xpY2Uocm91dGVyLnByZWZpeC5sZW5ndGgpICsgbm9ybWFsaXplMShcImhhc2hcIilcblx0XHRcdGRlZmF1bHQ6IHJldHVybiBub3JtYWxpemUxKFwicGF0aG5hbWVcIikuc2xpY2Uocm91dGVyLnByZWZpeC5sZW5ndGgpICsgbm9ybWFsaXplMShcInNlYXJjaFwiKSArIG5vcm1hbGl6ZTEoXCJoYXNoXCIpXG5cdFx0fVxuXHR9XG5cdHJvdXRlci5zZXRQYXRoID0gZnVuY3Rpb24ocGF0aCwgZGF0YSwgb3B0aW9ucykge1xuXHRcdHZhciBxdWVyeURhdGEgPSB7fSwgaGFzaERhdGEgPSB7fVxuXHRcdHBhdGggPSBwYXJzZVBhdGgocGF0aCwgcXVlcnlEYXRhLCBoYXNoRGF0YSlcblx0XHRpZiAoZGF0YSAhPSBudWxsKSB7XG5cdFx0XHRmb3IgKHZhciBrZXk0IGluIGRhdGEpIHF1ZXJ5RGF0YVtrZXk0XSA9IGRhdGFba2V5NF1cblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoLzooW15cXC9dKykvZywgZnVuY3Rpb24obWF0Y2gyLCB0b2tlbikge1xuXHRcdFx0XHRkZWxldGUgcXVlcnlEYXRhW3Rva2VuXVxuXHRcdFx0XHRyZXR1cm4gZGF0YVt0b2tlbl1cblx0XHRcdH0pXG5cdFx0fVxuXHRcdHZhciBxdWVyeSA9IGJ1aWxkUXVlcnlTdHJpbmcocXVlcnlEYXRhKVxuXHRcdGlmIChxdWVyeSkgcGF0aCArPSBcIj9cIiArIHF1ZXJ5XG5cdFx0dmFyIGhhc2ggPSBidWlsZFF1ZXJ5U3RyaW5nKGhhc2hEYXRhKVxuXHRcdGlmIChoYXNoKSBwYXRoICs9IFwiI1wiICsgaGFzaFxuXHRcdGlmIChzdXBwb3J0c1B1c2hTdGF0ZSkge1xuXHRcdFx0dmFyIHN0YXRlID0gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdGUgOiBudWxsXG5cdFx0XHR2YXIgdGl0bGUgPSBvcHRpb25zID8gb3B0aW9ucy50aXRsZSA6IG51bGxcblx0XHRcdCR3aW5kb3cub25wb3BzdGF0ZSgpXG5cdFx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlcGxhY2UpICR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCByb3V0ZXIucHJlZml4ICsgcGF0aClcblx0XHRcdGVsc2UgJHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgdGl0bGUsIHJvdXRlci5wcmVmaXggKyBwYXRoKVxuXHRcdH1cblx0XHRlbHNlICR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJvdXRlci5wcmVmaXggKyBwYXRoXG5cdH1cblx0cm91dGVyLmRlZmluZVJvdXRlcyA9IGZ1bmN0aW9uKHJvdXRlcywgcmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0ZnVuY3Rpb24gcmVzb2x2ZVJvdXRlKCkge1xuXHRcdFx0dmFyIHBhdGggPSByb3V0ZXIuZ2V0UGF0aCgpXG5cdFx0XHR2YXIgcGFyYW1zID0ge31cblx0XHRcdHZhciBwYXRobmFtZSA9IHBhcnNlUGF0aChwYXRoLCBwYXJhbXMsIHBhcmFtcylcblx0XHRcdHZhciBzdGF0ZSA9ICR3aW5kb3cuaGlzdG9yeS5zdGF0ZVxuXHRcdFx0aWYgKHN0YXRlICE9IG51bGwpIHtcblx0XHRcdFx0Zm9yICh2YXIgayBpbiBzdGF0ZSkgcGFyYW1zW2tdID0gc3RhdGVba11cblx0XHRcdH1cblx0XHRcdGZvciAodmFyIHJvdXRlMCBpbiByb3V0ZXMpIHtcblx0XHRcdFx0dmFyIG1hdGNoZXIgPSBuZXcgUmVnRXhwKFwiXlwiICsgcm91dGUwLnJlcGxhY2UoLzpbXlxcL10rP1xcLnszfS9nLCBcIiguKj8pXCIpLnJlcGxhY2UoLzpbXlxcL10rL2csIFwiKFteXFxcXC9dKylcIikgKyBcIlxcLz8kXCIpXG5cdFx0XHRcdGlmIChtYXRjaGVyLnRlc3QocGF0aG5hbWUpKSB7XG5cdFx0XHRcdFx0cGF0aG5hbWUucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBrZXlzID0gcm91dGUwLm1hdGNoKC86W15cXC9dKy9nKSB8fCBbXVxuXHRcdFx0XHRcdFx0dmFyIHZhbHVlcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxLCAtMilcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRwYXJhbXNba2V5c1tpXS5yZXBsYWNlKC86fFxcLi9nLCBcIlwiKV0gPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWVzW2ldKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmVzb2x2ZShyb3V0ZXNbcm91dGUwXSwgcGFyYW1zLCBwYXRoLCByb3V0ZTApXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmVqZWN0KHBhdGgsIHBhcmFtcylcblx0XHR9XG5cdFx0aWYgKHN1cHBvcnRzUHVzaFN0YXRlKSAkd2luZG93Lm9ucG9wc3RhdGUgPSBkZWJvdW5jZUFzeW5jKHJlc29sdmVSb3V0ZSlcblx0XHRlbHNlIGlmIChyb3V0ZXIucHJlZml4LmNoYXJBdCgwKSA9PT0gXCIjXCIpICR3aW5kb3cub25oYXNoY2hhbmdlID0gcmVzb2x2ZVJvdXRlXG5cdFx0cmVzb2x2ZVJvdXRlKClcblx0fVxuXHRyZXR1cm4gcm91dGVyXG59XG52YXIgXzIwID0gZnVuY3Rpb24oJHdpbmRvdywgcmVkcmF3U2VydmljZTApIHtcblx0dmFyIHJvdXRlU2VydmljZSA9IGNvcmVSb3V0ZXIoJHdpbmRvdylcblx0dmFyIGlkZW50aXR5ID0gZnVuY3Rpb24odikge3JldHVybiB2fVxuXHR2YXIgcmVuZGVyMSwgY29tcG9uZW50LCBhdHRyczMsIGN1cnJlbnRQYXRoLCBsYXN0VXBkYXRlXG5cdHZhciByb3V0ZSA9IGZ1bmN0aW9uKHJvb3QsIGRlZmF1bHRSb3V0ZSwgcm91dGVzKSB7XG5cdFx0aWYgKHJvb3QgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiRW5zdXJlIHRoZSBET00gZWxlbWVudCB0aGF0IHdhcyBwYXNzZWQgdG8gYG0ucm91dGVgIGlzIG5vdCB1bmRlZmluZWRcIilcblx0XHR2YXIgcnVuMSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHJlbmRlcjEgIT0gbnVsbCkgcmVkcmF3U2VydmljZTAucmVuZGVyKHJvb3QsIHJlbmRlcjEoVm5vZGUoY29tcG9uZW50LCBhdHRyczMua2V5LCBhdHRyczMpKSlcblx0XHR9XG5cdFx0dmFyIGJhaWwgPSBmdW5jdGlvbihwYXRoKSB7XG5cdFx0XHRpZiAocGF0aCAhPT0gZGVmYXVsdFJvdXRlKSByb3V0ZVNlcnZpY2Uuc2V0UGF0aChkZWZhdWx0Um91dGUsIG51bGwsIHtyZXBsYWNlOiB0cnVlfSlcblx0XHRcdGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IHJlc29sdmUgZGVmYXVsdCByb3V0ZSBcIiArIGRlZmF1bHRSb3V0ZSlcblx0XHR9XG5cdFx0cm91dGVTZXJ2aWNlLmRlZmluZVJvdXRlcyhyb3V0ZXMsIGZ1bmN0aW9uKHBheWxvYWQsIHBhcmFtcywgcGF0aCkge1xuXHRcdFx0dmFyIHVwZGF0ZSA9IGxhc3RVcGRhdGUgPSBmdW5jdGlvbihyb3V0ZVJlc29sdmVyLCBjb21wKSB7XG5cdFx0XHRcdGlmICh1cGRhdGUgIT09IGxhc3RVcGRhdGUpIHJldHVyblxuXHRcdFx0XHRjb21wb25lbnQgPSBjb21wICE9IG51bGwgJiYgKHR5cGVvZiBjb21wLnZpZXcgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgY29tcCA9PT0gXCJmdW5jdGlvblwiKT8gY29tcCA6IFwiZGl2XCJcblx0XHRcdFx0YXR0cnMzID0gcGFyYW1zLCBjdXJyZW50UGF0aCA9IHBhdGgsIGxhc3RVcGRhdGUgPSBudWxsXG5cdFx0XHRcdHJlbmRlcjEgPSAocm91dGVSZXNvbHZlci5yZW5kZXIgfHwgaWRlbnRpdHkpLmJpbmQocm91dGVSZXNvbHZlcilcblx0XHRcdFx0cnVuMSgpXG5cdFx0XHR9XG5cdFx0XHRpZiAocGF5bG9hZC52aWV3IHx8IHR5cGVvZiBwYXlsb2FkID09PSBcImZ1bmN0aW9uXCIpIHVwZGF0ZSh7fSwgcGF5bG9hZClcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAocGF5bG9hZC5vbm1hdGNoKSB7XG5cdFx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKHBheWxvYWQub25tYXRjaChwYXJhbXMsIHBhdGgpKS50aGVuKGZ1bmN0aW9uKHJlc29sdmVkKSB7XG5cdFx0XHRcdFx0XHR1cGRhdGUocGF5bG9hZCwgcmVzb2x2ZWQpXG5cdFx0XHRcdFx0fSwgYmFpbClcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHVwZGF0ZShwYXlsb2FkLCBcImRpdlwiKVxuXHRcdFx0fVxuXHRcdH0sIGJhaWwpXG5cdFx0cmVkcmF3U2VydmljZTAuc3Vic2NyaWJlKHJvb3QsIHJ1bjEpXG5cdH1cblx0cm91dGUuc2V0ID0gZnVuY3Rpb24ocGF0aCwgZGF0YSwgb3B0aW9ucykge1xuXHRcdGlmIChsYXN0VXBkYXRlICE9IG51bGwpIHtcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cdFx0XHRvcHRpb25zLnJlcGxhY2UgPSB0cnVlXG5cdFx0fVxuXHRcdGxhc3RVcGRhdGUgPSBudWxsXG5cdFx0cm91dGVTZXJ2aWNlLnNldFBhdGgocGF0aCwgZGF0YSwgb3B0aW9ucylcblx0fVxuXHRyb3V0ZS5nZXQgPSBmdW5jdGlvbigpIHtyZXR1cm4gY3VycmVudFBhdGh9XG5cdHJvdXRlLnByZWZpeCA9IGZ1bmN0aW9uKHByZWZpeDApIHtyb3V0ZVNlcnZpY2UucHJlZml4ID0gcHJlZml4MH1cblx0cm91dGUubGluayA9IGZ1bmN0aW9uKHZub2RlMSkge1xuXHRcdHZub2RlMS5kb20uc2V0QXR0cmlidXRlKFwiaHJlZlwiLCByb3V0ZVNlcnZpY2UucHJlZml4ICsgdm5vZGUxLmF0dHJzLmhyZWYpXG5cdFx0dm5vZGUxLmRvbS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0aWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkgfHwgZS5zaGlmdEtleSB8fCBlLndoaWNoID09PSAyKSByZXR1cm5cblx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0ZS5yZWRyYXcgPSBmYWxzZVxuXHRcdFx0dmFyIGhyZWYgPSB0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIilcblx0XHRcdGlmIChocmVmLmluZGV4T2Yocm91dGVTZXJ2aWNlLnByZWZpeCkgPT09IDApIGhyZWYgPSBocmVmLnNsaWNlKHJvdXRlU2VydmljZS5wcmVmaXgubGVuZ3RoKVxuXHRcdFx0cm91dGUuc2V0KGhyZWYsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxuXHRcdH1cblx0fVxuXHRyb3V0ZS5wYXJhbSA9IGZ1bmN0aW9uKGtleTMpIHtcblx0XHRpZih0eXBlb2YgYXR0cnMzICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBrZXkzICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gYXR0cnMzW2tleTNdXG5cdFx0cmV0dXJuIGF0dHJzM1xuXHR9XG5cdHJldHVybiByb3V0ZVxufVxubS5yb3V0ZSA9IF8yMCh3aW5kb3csIHJlZHJhd1NlcnZpY2UpXG5tLndpdGhBdHRyID0gZnVuY3Rpb24oYXR0ck5hbWUsIGNhbGxiYWNrMSwgY29udGV4dCkge1xuXHRyZXR1cm4gZnVuY3Rpb24oZSkge1xuXHRcdGNhbGxiYWNrMS5jYWxsKGNvbnRleHQgfHwgdGhpcywgYXR0ck5hbWUgaW4gZS5jdXJyZW50VGFyZ2V0ID8gZS5jdXJyZW50VGFyZ2V0W2F0dHJOYW1lXSA6IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpKVxuXHR9XG59XG52YXIgXzI4ID0gY29yZVJlbmRlcmVyKHdpbmRvdylcbm0ucmVuZGVyID0gXzI4LnJlbmRlclxubS5yZWRyYXcgPSByZWRyYXdTZXJ2aWNlLnJlZHJhd1xubS5yZXF1ZXN0ID0gcmVxdWVzdFNlcnZpY2UucmVxdWVzdFxubS5qc29ucCA9IHJlcXVlc3RTZXJ2aWNlLmpzb25wXG5tLnBhcnNlUXVlcnlTdHJpbmcgPSBwYXJzZVF1ZXJ5U3RyaW5nXG5tLmJ1aWxkUXVlcnlTdHJpbmcgPSBidWlsZFF1ZXJ5U3RyaW5nXG5tLnZlcnNpb24gPSBcIjEuMS42XCJcbm0udm5vZGUgPSBWbm9kZVxuaWYgKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIpIG1vZHVsZVtcImV4cG9ydHNcIl0gPSBtXG5lbHNlIHdpbmRvdy5tID0gbVxufSgpKTsiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG1pdGhyaWxfMSA9IHJlcXVpcmUoXCIuLi9taXRocmlsXCIpO1xuY29uc3QgTGF5b3V0ZXJfMSA9IHJlcXVpcmUoXCIuL0xheW91dGVyXCIpO1xuY2xhc3MgTGF5b3V0IHtcbiAgICBnZXRDb21wb25lbnRzKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuICFBcnJheS5pc0FycmF5KG5vZGUuYXR0cnMuY29udGVudCkgPyBub2RlLmF0dHJzLmNvbnRlbnQgOlxuICAgICAgICAgICAgbm9kZS5hdHRycy5jb250ZW50Lm1hcCgoYykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjLmNvbXBDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICBjLmF0dHJzLnJvdXRlID0gbm9kZS5hdHRycy5yb3V0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1pdGhyaWxfMS5tKGMuY29tcENsYXNzLCBjLmF0dHJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRDU1Mobm9kZSkge1xuICAgICAgICByZXR1cm4gbm9kZS5hdHRycy5jc3MgfHwgJyc7XG4gICAgfVxuICAgIG5vcm1hbGl6ZUNvbnRlbnQoY29tcG9uZW50cykge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gW21pdGhyaWxfMS5tKCcuaHMtbGVhZicsIG1pdGhyaWxfMS5tLnRydXN0KGNvbXBvbmVudHMpKV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudHMubWFwKChjb21wKSA9PiAoY29tcCBpbnN0YW5jZW9mIExheW91dCkgPyBjb21wIDogbWl0aHJpbF8xLm0oTGF5b3V0LCB7IGNvbnRlbnQ6IGNvbXAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbY29tcG9uZW50c107XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5ub3JtYWxpemVDb250ZW50KHRoaXMuZ2V0Q29tcG9uZW50cyhub2RlKSk7XG4gICAgICAgIGxldCBjc3MgPSBMYXlvdXRlcl8xLkxheW91dGVyLmNyZWF0ZUxheW91dChub2RlLmF0dHJzLCBjb250ZW50KTtcbiAgICAgICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICAgICAgICBzdHlsZTogbm9kZS5zdHlsZSxcbiAgICAgICAgICAgIHJvdXRlOiBub2RlLmF0dHJzLnJvdXRlLFxuICAgICAgICAgICAgb25jbGljazogbm9kZS5hdHRycy5vbmNsaWNrXG4gICAgICAgIH07XG4gICAgICAgIG5vZGUuYXR0cnMucm91dGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChub2RlLmF0dHJzLmhyZWYpIHtcbiAgICAgICAgICAgIGF0dHJzLmhyZWYgPSBub2RlLmF0dHJzLmhyZWY7XG4gICAgICAgICAgICBhdHRycy5vbmNyZWF0ZSA9IG1pdGhyaWxfMS5tLnJvdXRlLmxpbms7XG4gICAgICAgICAgICBhdHRycy5vbnVwZGF0ZSA9IG1pdGhyaWxfMS5tLnJvdXRlLmxpbms7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pdGhyaWxfMS5tKGAuaHMtbGF5b3V0ICR7Y3NzfSAke3RoaXMuZ2V0Q1NTKG5vZGUpfWAsIGF0dHJzLCBjb250ZW50Lm1hcCgoYykgPT4gYykpO1xuICAgIH1cbn1cbmV4cG9ydHMuTGF5b3V0ID0gTGF5b3V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVEdGNWIzVjBMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwzWnBaWGN2VEdGNWIzVjBMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQmFVSkJMSGREUVVGelF6dEJRVU4wUXl4NVEwRkJjME03UVVGNVFuUkRMRTFCUVdFc1RVRkJUVHRKUVc5Q1RDeGhRVUZoTEVOQlFVTXNTVUZCVlR0UlFVTTVRaXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlF6TkVMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVzc1JVRkJSU3hGUVVGRk8yZENRVU0zUWl4SlFVRkpMRU5CUVVNc1EwRkJReXhUUVVGVExFVkJRVVU3YjBKQlEySXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNN2IwSkJRMnBETEU5QlFVOHNWMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhUUVVGVExFVkJRVVVzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMmxDUVVOc1F6dHhRa0ZCVFR0dlFrRkRTQ3hQUVVGUExFTkJRVU1zUTBGQlF6dHBRa0ZEV2p0WlFVTk1MRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMWdzUTBGQlF6dEpRVkZUTEUxQlFVMHNRMEZCUXl4SlFVRlZPMUZCUTNaQ0xFOUJRVThzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRWxCUVVrc1JVRkJSU3hEUVVGRE8wbEJRMmhETEVOQlFVTTdTVUZIVHl4blFrRkJaMElzUTBGQlF5eFZRVUUyUXp0UlFVTnNSU3hKUVVGSkxFOUJRVThzVlVGQlZTeExRVUZMTEZGQlFWRXNSVUZCUlR0WlFVTm9ReXhQUVVGUExFTkJRVU1zVjBGQlF5eERRVUZETEZWQlFWVXNSVUZCUlN4WFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTXZRenRSUVVORUxFbEJRVWtzVlVGQlZTeERRVUZETEUxQlFVMHNSMEZCUXl4RFFVRkRMRVZCUVVVN1dVRkRja0lzVDBGQlR5eFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJlVUlzUlVGQlVTeEZRVUZGTEVOQlEyeEVMRU5CUVVNc1NVRkJTU3haUVVGWkxFMUJRVTBzUTBGQlF5eERRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExGZEJRVU1zUTBGQlF5eE5RVUZOTEVWQlFVVXNSVUZCUXl4UFFVRlBMRVZCUVVNc1NVRkJTU3hGUVVGRExFTkJRVU1zUTBGRGFrVXNRMEZCUXp0VFFVTk1PMUZCUlVRc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETzBsQlEzaENMRU5CUVVNN1NVRnhRa1FzU1VGQlNTeERRVUZETEVsQlFWVTdVVUZEV0N4TlFVRk5MRTlCUVU4c1IwRkJSeXhKUVVGSkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1NVRkJTU3hEUVVGRExHRkJRV0VzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTJoRkxFbEJRVWtzUjBGQlJ5eEhRVUZITEcxQ1FVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRja1FzVFVGQlRTeExRVUZMTEVkQlFVODdXVUZEWkN4TFFVRkxMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXM3V1VGRGFrSXNTMEZCU3l4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN6dFpRVU4yUWl4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTzFOQlF6bENMRU5CUVVNN1VVRkRSaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4VFFVRlRMRU5CUVVNN1VVRkROMElzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1JVRkJSVHRaUVVOcVFpeExRVUZMTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETzFsQlF6ZENMRXRCUVVzc1EwRkJReXhSUVVGUkxFZEJRVWNzVjBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNN1dVRkRPVUlzUzBGQlN5eERRVUZETEZGQlFWRXNSMEZCUnl4WFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF6dFRRVU5xUXp0UlFVTkVMRTlCUVU4c1YwRkJReXhEUVVGRExHTkJRV01zUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVXNzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVONlJpeERRVUZETzBOQlEwbzdRVUV6UmtRc2QwSkJNa1pESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgVG9rZW5zXzEgPSByZXF1aXJlKFwiLi9Ub2tlbnNcIik7XG5jbGFzcyBMYXlvdXRlciB7XG4gICAgY29uc3RydWN0b3IoYXJlYURlc2MpIHtcbiAgICAgICAgdGhpcy5hcmVhRGVzYyA9IGFyZWFEZXNjO1xuICAgICAgICB0aGlzLnNwYWNpbmcgPSAwO1xuICAgIH1cbiAgICBzdGF0aWMgdHJhbnNsYXRlKHBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcGFyYW1zLnB1c2goJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXMubWFwKChwYXJhbSkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0uZW5kc1dpdGgoJ3B4JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRva2Vuc18xLnB4KHBhcnNlSW50KHBhcmFtKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJhbS5lbmRzV2l0aCgnJScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUb2tlbnNfMS5wYyhwYXJzZUludChwYXJhbSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGFyYW0udG9Mb3dlckNhc2UoKSA9PT0gJ2ZpbGwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUb2tlbnNfMS5GSUxMO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyByZWdpc3RlcihrZXl3b3JkLCBzdHlsZSkge1xuICAgICAgICBMYXlvdXRlci5sYXlvdXRTdHlsZXNba2V5d29yZF0gPSBzdHlsZTtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZUxheW91dChhdHRycywgY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY3NzID0gJyc7XG4gICAgICAgIE9iamVjdC5rZXlzKExheW91dGVyLmxheW91dFN0eWxlcykuc29tZShrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKGF0dHJzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBjc3MgPSBuZXcgTGF5b3V0ZXIubGF5b3V0U3R5bGVzW2tleV0oTGF5b3V0ZXIudHJhbnNsYXRlKGF0dHJzW2tleV0pKS5nZXRTdHlsZXMoY29tcG9uZW50cyk7XG4gICAgICAgICAgICAgICAgYXR0cnNba2V5XSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjc3M7XG4gICAgfVxuICAgIDtcbn1cbkxheW91dGVyLmxheW91dFN0eWxlcyA9IHt9O1xuZXhwb3J0cy5MYXlvdXRlciA9IExheW91dGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVEdGNWIzVjBaWEl1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZkbWxsZHk5TVlYbHZkWFJsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVmxCTEhGRFFVRjNRenRCUVhsQ2VFTXNUVUZCYzBJc1VVRkJVVHRKUVhsRk1VSXNXVUZCYlVJc1VVRkJjMEk3VVVGQmRFSXNZVUZCVVN4SFFVRlNMRkZCUVZFc1EwRkJZenRSUVZKNlF5eFpRVUZQTEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCVVdkRExFTkJRVU03U1VGNlJISkRMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zVFVGQmQwSTdVVUZETjBNc1NVRkJTU3hOUVVGTkxFTkJRVU1zVFVGQlRTeExRVUZMTEVOQlFVTXNSVUZCUlR0WlFVRkZMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTTdVMEZCUlR0UlFVTTNReXhQUVVGUExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4TFFVRm5RaXhGUVVGRkxFVkJRVVU3V1VGRGJrTXNTVUZCU1N4UFFVRlBMRXRCUVVzc1MwRkJTeXhSUVVGUkxFVkJRVVU3WjBKQlF6TkNMRWxCUVVrc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlR0dlFrRkJSU3hQUVVGUExGZEJRVVVzUTBGQlF5eFJRVUZSTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRwUWtGQlJUdG5Ra0ZEZWtRc1NVRkJTU3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZPMjlDUVVGRkxFOUJRVThzVjBGQlJTeERRVUZETEZGQlFWRXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRE8ybENRVUZGTzJkQ1FVTjRSQ3hKUVVGSkxFdEJRVXNzUTBGQlF5eFhRVUZYTEVWQlFVVXNTMEZCUnl4TlFVRk5MRVZCUVVVN2IwSkJRVVVzVDBGQlR5eGhRVUZKTEVOQlFVTTdhVUpCUVVNN1lVRkRjRVE3YVVKQlFVMDdaMEpCUTBnc1QwRkJUeXhMUVVGTExFTkJRVU03WVVGRGFFSTdVVUZEVEN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03U1VGWFRTeE5RVUZOTEVOQlFVTXNVVUZCVVN4RFFVRkRMRTlCUVdNc1JVRkJSU3hMUVVGeFFqdFJRVVY0UkN4UlFVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEV0QlFVc3NRMEZCUXp0SlFVTXpReXhEUVVGRE8wbEJWVTBzVFVGQlRTeERRVUZETEZsQlFWa3NRMEZCUXl4TFFVRlRMRVZCUVVVc1ZVRkJkVUk3VVVGRGVrUXNTVUZCU1N4SFFVRkhMRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJRMklzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZPMWxCUXpGRExFbEJRVWtzUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZPMmRDUVVOYUxFZEJRVWNzUjBGQlJ5eEpRVUZKTEZGQlFWRXNRMEZCUXl4WlFVRlpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zVVVGQlVTeERRVUZETEZOQlFWTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZOQlFWTXNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRuUWtGRE0wWXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExGTkJRVk1zUTBGQlF6dG5Ra0ZEZGtJc1QwRkJUeXhKUVVGSkxFTkJRVU03WVVGRFpqdFpRVU5FTEU5QlFVOHNTMEZCU3l4RFFVRkRPMUZCUTJwQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NUMEZCVHl4SFFVRkhMRU5CUVVNN1NVRkRaaXhEUVVGRE8wbEJWelJETEVOQlFVTTdPMEZCY0VWMlF5eHhRa0ZCV1N4SFFVRjFRaXhGUVVGRkxFTkJRVU03UVVGTWFrUXNORUpCTUVaREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IExheW91dGVyXzEgPSByZXF1aXJlKFwiLi9MYXlvdXRlclwiKTtcbmNvbnN0IFRva2Vuc18xID0gcmVxdWlyZShcIi4vVG9rZW5zXCIpO1xuZXhwb3J0cy5QaWxsYXJMYXlvdXRzID0gW1xuICAgICdjb2x1bW5zJywgJ3Jvd3MnXG5dO1xuY29uc3QgY1BhcmFtcyA9IHtcbiAgICBjb2x1bW5zOiB7XG4gICAgICAgIGNzc0NsYXNzOiAnLmhzLWNvbHVtbi1sYXlvdXQnLFxuICAgICAgICBmaWVsZHM6IFsndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0JywgJ2hlaWdodCcsICd3aWR0aCddXG4gICAgfSxcbiAgICByb3dzOiB7XG4gICAgICAgIGNzc0NsYXNzOiAnLmhzLXJvdy1sYXlvdXQnLFxuICAgICAgICBmaWVsZHM6IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJywgJ3dpZHRoJywgJ2hlaWdodCddXG4gICAgfVxufTtcbmNsYXNzIFBpbGxhckxheW91dGVyIGV4dGVuZHMgTGF5b3V0ZXJfMS5MYXlvdXRlciB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zLCBhcmVhRGVzYykge1xuICAgICAgICBzdXBlcihhcmVhRGVzYyk7XG4gICAgICAgIHRoaXMuYXJlYURlc2MgPSBhcmVhRGVzYztcbiAgICAgICAgdGhpcy5maWVsZHMgPSBwYXJhbXMuZmllbGRzO1xuICAgICAgICB0aGlzLmNzc0NsYXNzID0gcGFyYW1zLmNzc0NsYXNzO1xuICAgICAgICBsZXQgbiA9IGFyZWFEZXNjLmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCBmaXJzdCA9IDA7XG4gICAgICAgIGxldCBsYXN0ID0gMDtcbiAgICAgICAgdGhpcy51bml0ID0gYXJlYURlc2Muc29tZSgoYXJlYSkgPT4gKGFyZWEgaW5zdGFuY2VvZiBUb2tlbnNfMS5QaXhlbFRva2VuKSkgP1xuICAgICAgICAgICAgdGhpcy51bml0UGl4ZWwgOiB0aGlzLnVuaXRQZXJjZW50O1xuICAgICAgICBhcmVhRGVzYy5zb21lKChhcmVhLCBpKSA9PiAoKGFyZWFEZXNjW2ldIGluc3RhbmNlb2YgVG9rZW5zXzEuRGVmaW5lZFRva2VuKSA/ICsrZmlyc3QgPCAwIDogdHJ1ZSkpO1xuICAgICAgICBhcmVhRGVzYy5zb21lKChhcmVhLCBpKSA9PiAoKGFyZWFEZXNjW24gLSBpXSBpbnN0YW5jZW9mIFRva2Vuc18xLkRlZmluZWRUb2tlbikgPyArK2xhc3QgPCAwIDogdHJ1ZSkpO1xuICAgICAgICB0aGlzLmZpcnN0Rml4ZWQgPSBmaXJzdDtcbiAgICAgICAgdGhpcy5sYXN0Rml4ZWQgPSBNYXRoLm1pbihsYXN0LCBhcmVhRGVzYy5sZW5ndGggLSBmaXJzdCk7XG4gICAgfVxuICAgIDtcbiAgICBnZXRTaXplcyhudW0pIHtcbiAgICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLmZpcnN0Rml4ZWQ7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmxhc3RGaXhlZDtcbiAgICAgICAgY29uc3QgZGVzYyA9IHRoaXMuYXJlYURlc2M7XG4gICAgICAgIGNvbnN0IGxlbiA9IGRlc2MubGVuZ3RoO1xuICAgICAgICByZXR1cm4gWy4uLkFycmF5KG51bSkua2V5cygpXS5tYXAoKGkpID0+IHtcbiAgICAgICAgICAgIGxldCBzaXplID0gbnVsbDtcbiAgICAgICAgICAgIGxldCB0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChpID4gbnVtIC0gMSAtIGxhc3QpIHtcbiAgICAgICAgICAgICAgICBzaXplID0gZGVzY1tsZW4gLSAobnVtIC0gaSldLmdldFNpemUoKTtcbiAgICAgICAgICAgICAgICB0ID0gJ2VuZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpIDwgZmlyc3QpIHtcbiAgICAgICAgICAgICAgICBzaXplID0gZGVzY1tpXS5nZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgdCA9ICdzdGFydCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsZW4gPiAwICYmIGxlbiA9PT0gZmlyc3QpIHtcbiAgICAgICAgICAgICAgICBzaXplID0gZGVzY1tsZW4gLSAxXS5nZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgdCA9ICdzdGFydCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBzaXplOiBzaXplLCBjb2RlOiB0LCBmaWVsZHM6IHt9IH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1bml0UGVyY2VudChudW0pIHtcbiAgICAgICAgbGV0IGYgPSB0aGlzLmZpZWxkcztcbiAgICAgICAgbGV0IG1heCA9IDEwMC4wO1xuICAgICAgICBsZXQgc3R5bGVzID0gdGhpcy5nZXRTaXplcyhudW0pO1xuICAgICAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7IGlmIChzdHlsZS5zaXplKSB7XG4gICAgICAgICAgICBtYXggPSBtYXggLSBzdHlsZS5zaXplO1xuICAgICAgICAgICAgbnVtLS07XG4gICAgICAgIH0gfSk7XG4gICAgICAgIGxldCBkZWZEaW0gPSBtYXggLyBudW07XG4gICAgICAgIGZ1bmN0aW9uIHBhc3Moc3R5bGVzLCBpeDAsIGl4MSwgYnJlYWtDb25kKSB7XG4gICAgICAgICAgICBsZXQgc3VtRGltID0gMDtcbiAgICAgICAgICAgIHN0eWxlcy5zb21lKHN0eWxlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IHN0eWxlLnNpemUgfHwgZGVmRGltO1xuICAgICAgICAgICAgICAgIGlmIChicmVha0NvbmQoc3R5bGUuY29kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tpeDBdID0gc3VtRGltICsgJyUnO1xuICAgICAgICAgICAgICAgIHN1bURpbSArPSBzaXplO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tpeDFdID0gKDEwMCAtIHN1bURpbSkgKyAnJSc7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbNV1dID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHBhc3Moc3R5bGVzLCBmWzJdLCBmWzNdLCAoZSkgPT4gZSA9PT0gJ2VuZCcpO1xuICAgICAgICBwYXNzKHN0eWxlcy5yZXZlcnNlKCksIGZbM10sIGZbMl0sIChlKSA9PiBlICE9PSAnZW5kJyk7XG4gICAgICAgIHJldHVybiBzdHlsZXMucmV2ZXJzZSgpO1xuICAgIH1cbiAgICA7XG4gICAgdW5pdFBpeGVsKG51bSkge1xuICAgICAgICBsZXQgc3R5bGVzID0gdGhpcy5nZXRTaXplcyhudW0pO1xuICAgICAgICBsZXQgZiA9IHRoaXMuZmllbGRzO1xuICAgICAgICBsZXQgZGVmRGltID0gMTAwLjAgLyBudW07XG4gICAgICAgIGxldCBzdW1EaW0gPSAwO1xuICAgICAgICBzdHlsZXMuc29tZSgoc3R5bGUsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChzdHlsZS5jb2RlID09PSAnc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbMl1dID0gc3VtRGltICsgJ3B4JztcbiAgICAgICAgICAgICAgICBzdW1EaW0gKz0gc3R5bGUuc2l6ZSArICh0aGlzLnNwYWNpbmcgfHwgMCkgKyAodGhpcy5zcGFjaW5nIHx8IDApO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzNdXSA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZls1XV0gPSBzdHlsZS5zaXplICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0eWxlLmNvZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZlsyXV0gPSAoc3VtRGltID4gMCkgPyAoc3VtRGltICsgJ3B4JykgOiAoaSAqIGRlZkRpbSArICclJyk7XG4gICAgICAgICAgICAgICAgc3VtRGltID0gLTE7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbM11dID0gKDEwMCAtIChpICsgMSkgKiBkZWZEaW0pICsgJyUnO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzVdXSA9ICdhdXRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0eWxlLmNvZGUgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBzdW1EaW0gPSAwO1xuICAgICAgICBzdHlsZXMuc2xpY2UoKS5yZXZlcnNlKCkuc29tZSgoc3R5bGUsIGkpID0+IHtcbiAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzNdXSA9IHN1bURpbSArICdweCc7XG4gICAgICAgICAgICBpZiAoc3R5bGUuY29kZSA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICAgICAgICBzdW1EaW0gKz0gc3R5bGUuc2l6ZSArICh0aGlzLnNwYWNpbmcgfHwgMCkgKyAodGhpcy5zcGFjaW5nIHx8IDApO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzJdXSA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZls1XV0gPSBzdHlsZS5zaXplICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzdW1EaW0gPiAwICYmIHN0eWxlLmNvZGUgIT09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbNV1dID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICAgIDtcbiAgICBnZXRTdHlsZXMoY29tcG9uZW50cykge1xuICAgICAgICBsZXQgZiA9IHRoaXMuZmllbGRzO1xuICAgICAgICBsZXQgc3R5bGVzID0gdGhpcy51bml0KGNvbXBvbmVudHMubGVuZ3RoKTtcbiAgICAgICAgY29tcG9uZW50cy5tYXAoKGMsIGkpID0+IHtcbiAgICAgICAgICAgIGMuc3R5bGUgPSBgJHtmWzBdfTowJTsgJHtmWzFdfTowJTsgYDtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHN0eWxlc1tpXS5maWVsZHMpLmZvckVhY2goKHN0KSA9PiB7IGMuc3R5bGUgKz0gYCR7c3R9OiAke3N0eWxlc1tpXS5maWVsZHNbc3RdfTtgOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNzc0NsYXNzO1xuICAgIH1cbiAgICA7XG59XG47XG5jbGFzcyBDb2x1bW5zIGV4dGVuZHMgUGlsbGFyTGF5b3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZWFEZXNjKSB7XG4gICAgICAgIHN1cGVyKGNQYXJhbXNbZXhwb3J0cy5QaWxsYXJMYXlvdXRzWzBdXSwgYXJlYURlc2MpO1xuICAgICAgICB0aGlzLmFyZWFEZXNjID0gYXJlYURlc2M7XG4gICAgfVxuICAgIDtcbn1cbjtcbmNsYXNzIFJvd3MgZXh0ZW5kcyBQaWxsYXJMYXlvdXRlciB7XG4gICAgY29uc3RydWN0b3IoYXJlYURlc2MpIHtcbiAgICAgICAgc3VwZXIoY1BhcmFtc1tleHBvcnRzLlBpbGxhckxheW91dHNbMV1dLCBhcmVhRGVzYyk7XG4gICAgICAgIHRoaXMuYXJlYURlc2MgPSBhcmVhRGVzYztcbiAgICB9XG4gICAgO1xufVxuO1xuTGF5b3V0ZXJfMS5MYXlvdXRlci5yZWdpc3RlcihleHBvcnRzLlBpbGxhckxheW91dHNbMF0sIENvbHVtbnMpO1xuTGF5b3V0ZXJfMS5MYXlvdXRlci5yZWdpc3RlcihleHBvcnRzLlBpbGxhckxheW91dHNbMV0sIFJvd3MpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVUdsc2JHRnlaV1JNWVhsdmRYUmxjaTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1TDNOeVl5OTJhV1YzTDFCcGJHeGhjbVZrVEdGNWIzVjBaWEl1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRXlRMEVzZVVOQlFUQkRPMEZCUXpGRExIRkRRVVYzUXp0QlFXZENNMElzVVVGQlFTeGhRVUZoTEVkQlFVYzdTVUZEZWtJc1UwRkJVeXhGUVVGRkxFMUJRVTA3UTBGRGNFSXNRMEZCUXp0QlFVdEdMRTFCUVUwc1QwRkJUeXhIUVVGSE8wbEJRMW9zVDBGQlR5eEZRVUZuUWp0UlFVTnVRaXhSUVVGUkxFVkJRVVVzYlVKQlFXMUNPMUZCUXpkQ0xFMUJRVTBzUlVGQlJTeERRVUZETEV0QlFVc3NSVUZCUlN4UlFVRlJMRVZCUVVVc1RVRkJUU3hGUVVGRkxFOUJRVThzUlVGQlJTeFJRVUZSTEVWQlFVVXNUMEZCVHl4RFFVRkRPMHRCUTJoRk8wbEJRMFFzU1VGQlNTeEZRVUZuUWp0UlFVTm9RaXhSUVVGUkxFVkJRVVVzWjBKQlFXZENPMUZCUXpGQ0xFMUJRVTBzUlVGQlJTeERRVUZETEUxQlFVMHNSVUZCUlN4UFFVRlBMRVZCUVVVc1MwRkJTeXhGUVVGRkxGRkJRVkVzUlVGQlJTeFBRVUZQTEVWQlFVVXNVVUZCVVN4RFFVRkRPMHRCUTJoRk8wTkJRMG9zUTBGQlF6dEJRVTlHTEUxQlFXVXNZMEZCWlN4VFFVRlJMRzFDUVVGUk8wbEJZVEZETEZsQlFWa3NUVUZCYlVJc1JVRkJVeXhSUVVGelFqdFJRVU14UkN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03VVVGRWIwSXNZVUZCVVN4SFFVRlNMRkZCUVZFc1EwRkJZenRSUVVVeFJDeEpRVUZKTEVOQlFVTXNUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU03VVVGRE5VSXNTVUZCU1N4RFFVRkRMRkZCUVZFc1IwRkJSeXhOUVVGTkxFTkJRVU1zVVVGQlVTeERRVUZETzFGQlJXaERMRWxCUVVrc1EwRkJReXhIUVVGSExGRkJRVkVzUTBGQlF5eE5RVUZOTEVkQlFVTXNRMEZCUXl4RFFVRkRPMUZCUXpGQ0xFbEJRVWtzUzBGQlN5eEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTmtMRWxCUVVrc1NVRkJTU3hIUVVGSkxFTkJRVU1zUTBGQlF6dFJRVVZrTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVsQlFXZENMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU1zU1VGQlNTeFpRVUZaTEcxQ1FVRlZMRU5CUVVNc1EwRkJReXhEUVVGQkxFTkJRVU03V1VGRE1VVXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXp0UlFVZDBReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNTVUZCWjBJc1JVRkJSU3hEUVVGUkxFVkJRVVVzUlVGQlJTeERRVU42UXl4RFFVRkRMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF5eFpRVUZqTEhGQ1FVRlpMRU5CUVVNc1EwRkJRU3hEUVVGRExFTkJRVU1zUlVGQlJTeExRVUZMTEVkQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlIycEZMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZuUWl4RlFVRkZMRU5CUVZFc1JVRkJSU3hGUVVGRkxFTkJRM3BETEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhIUVVGRExFTkJRVU1zUTBGQlF5eFpRVUZaTEhGQ1FVRlpMRU5CUVVNc1EwRkJRU3hEUVVGRExFTkJRVU1zUlVGQlJTeEpRVUZKTEVkQlFVTXNRMEZCUXl4RFFVRkZMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlJXcEZMRWxCUVVrc1EwRkJReXhWUVVGVkxFZEJRVWNzUzBGQlN5eERRVUZETzFGQlEzaENMRWxCUVVrc1EwRkJReXhUUVVGVExFZEJRVWtzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRVZCUVVVc1VVRkJVU3hEUVVGRExFMUJRVTBzUjBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0SlFVTTFSQ3hEUVVGRE8wbEJRVUVzUTBGQlF6dEpRVk5OTEZGQlFWRXNRMEZCUXl4SFFVRlZPMUZCUTNaQ0xFMUJRVTBzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNN1VVRkRPVUlzVFVGQlRTeEpRVUZKTEVkQlFVa3NTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJRenRSUVVNM1FpeE5RVUZOTEVsQlFVa3NSMEZCU1N4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRE8xRkJRelZDTEUxQlFVMHNSMEZCUnl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU03VVVGRmVFSXNUMEZCVHl4RFFVRkRMRWRCUVVjc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlVTeEZRVUZGTEVWQlFVVTdXVUZETTBNc1NVRkJTU3hKUVVGSkxFZEJRVlVzU1VGQlNTeERRVUZETzFsQlEzWkNMRWxCUVVrc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF6dFpRVU5pTEVsQlFVa3NRMEZCUXl4SFFVRkhMRWRCUVVjc1IwRkJReXhEUVVGRExFZEJRVU1zU1VGQlNTeEZRVUZITzJkQ1FVRkZMRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEhRVUZITEVOQlFVTXNSMEZCUnl4SFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdaMEpCUVVNc1EwRkJReXhIUVVGSExFdEJRVXNzUTBGQlF6dGhRVUZGTzJsQ1FVTndSU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eExRVUZMTEVWQlFVYzdaMEpCUVVVc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJRenRuUWtGQlF5eERRVUZETEVkQlFVY3NUMEZCVHl4RFFVRkRPMkZCUVVVN2FVSkJRekZFTEVsQlFVa3NSMEZCUnl4SFFVRkRMRU5CUVVNc1NVRkJTU3hIUVVGSExFdEJRVWNzUzBGQlN5eEZRVUZETzJkQ1FVRkZMRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEhRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRE8yZENRVUZETEVOQlFVTXNSMEZCUnl4UFFVRlBMRU5CUVVNN1lVRkJSVHRaUVVNMVJTeFBRVUZQTEVWQlFVTXNTVUZCU1N4RlFVRkRMRWxCUVVrc1JVRkJSU3hKUVVGSkxFVkJRVU1zUTBGQlF5eEZRVUZGTEUxQlFVMHNSVUZCUXl4RlFVRkZMRVZCUVVNc1EwRkJRenRSUVVNeFF5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNN1NVRkZUeXhYUVVGWExFTkJRVU1zUjBGQlZUdFJRVU14UWl4SlFVRkpMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETzFGQlEzQkNMRWxCUVVrc1IwRkJSeXhIUVVGSExFdEJRVXNzUTBGQlF6dFJRVU5vUWl4SlFVRkpMRTFCUVUwc1IwRkJaMElzU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVVM1F5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJReXhGUVVGRkxFZEJRVWNzU1VGQlNTeExRVUZMTEVOQlFVTXNTVUZCU1N4RlFVRkZPMWxCUVVVc1IwRkJSeXhIUVVGSExFZEJRVWNzUjBGQlJ5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRPMWxCUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU03VTBGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTJoR0xFbEJRVWtzVFVGQlRTeEhRVUZITEVkQlFVY3NSMEZCUnl4SFFVRkhMRU5CUVVNN1VVRkZka0lzVTBGQlV5eEpRVUZKTEVOQlFVTXNUVUZCYlVJc1JVRkJSU3hIUVVGVkxFVkJRVVVzUjBGQlZTeEZRVUZGTEZOQlFXZERPMWxCUTNaR0xFbEJRVWtzVFVGQlRTeEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTm1MRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVVTdaMEpCUTJoQ0xFbEJRVWtzU1VGQlNTeEhRVUZITEV0QlFVc3NRMEZCUXl4SlFVRkpMRWxCUVVrc1RVRkJUU3hEUVVGRE8yZENRVU5vUXl4SlFVRkpMRk5CUVZNc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVTdiMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU03YVVKQlFVVTdaMEpCUXpORExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1RVRkJUU3hIUVVGRExFZEJRVWNzUTBGQlF6dG5Ra0ZETDBJc1RVRkJUU3hKUVVGSkxFbEJRVWtzUTBGQlF6dG5Ra0ZEWml4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4SFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGRExFZEJRVWNzUTBGQlF6dG5Ra0ZEY2tNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU03WjBKQlF6VkNMRTlCUVU4c1MwRkJTeXhEUVVGRE8xbEJRMnBDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTFBc1EwRkJRenRSUVVWRUxFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVZFc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF5eExRVUZITEV0QlFVc3NRMEZCUXl4RFFVRkRPMUZCUTJ4RUxFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVkVzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXl4TFFVRkhMRXRCUVVzc1EwRkJReXhEUVVGRE8xRkJRelZFTEU5QlFVOHNUVUZCVFN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRE8wbEJRelZDTEVOQlFVTTdTVUZCUVN4RFFVRkRPMGxCUlUwc1UwRkJVeXhEUVVGRExFZEJRVlU3VVVGRGVFSXNTVUZCU1N4TlFVRk5MRWRCUVdkQ0xFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1VVRkROME1zU1VGQlNTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJRenRSUVVWd1FpeEpRVUZKTEUxQlFVMHNSMEZCUnl4TFFVRkxMRWRCUVVNc1IwRkJSeXhEUVVGRE8xRkJSM1pDTEVsQlFVa3NUVUZCVFN4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVObUxFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVU3V1VGRGNrSXNTVUZCU1N4TFFVRkxMRU5CUVVNc1NVRkJTU3hMUVVGSExFOUJRVThzUlVGQlJUdG5Ra0ZEZEVJc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhOUVVGTkxFZEJRVVVzU1VGQlNTeERRVUZETzJkQ1FVTnNReXhOUVVGTkxFbEJRVWtzUzBGQlN5eERRVUZETEVsQlFVa3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFbEJRVWtzUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTnFSU3hMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFMUJRVTBzUTBGQlF6dG5Ra0ZETlVJc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhMUVVGTExFTkJRVU1zU1VGQlNTeEhRVUZGTEVsQlFVa3NRMEZCUXp0aFFVTjZRenRwUWtGQlRTeEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRXRCUVVzc1NVRkJTU3hGUVVGRk8yZENRVU0xUWl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1RVRkJUU3hIUVVGRExFTkJRVU1zUTBGQlF5eERRVUZCTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTFCUVUwc1IwRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVNc1RVRkJUU3hIUVVGSExFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVTnVSU3hOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUTFvc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUjBGQlF5eERRVUZETEVOQlFVTXNSMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEhRVUZITEVOQlFVTTdaMEpCUXpsRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzVFVGQlRTeERRVUZETzJGQlF5OUNPMmxDUVVGTkxFbEJRVWtzUzBGQlN5eERRVUZETEVsQlFVa3NTMEZCUnl4TFFVRkxMRVZCUVVVN1owSkJRVVVzVDBGQlR5eEpRVUZKTEVOQlFVTTdZVUZCUlR0WlFVTXZReXhQUVVGUExFdEJRVXNzUTBGQlF6dFJRVU5xUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVkSUxFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVTTdVVUZEV0N4TlFVRk5MRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTzFsQlEzWkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1RVRkJUU3hIUVVGSExFbEJRVWtzUTBGQlF6dFpRVU51UXl4SlFVRkpMRXRCUVVzc1EwRkJReXhKUVVGSkxFdEJRVXNzUzBGQlN5eEZRVUZGTzJkQ1FVTjBRaXhOUVVGTkxFbEJRVWtzUzBGQlN5eERRVUZETEVsQlFVa3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFbEJRVWtzUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTnFSU3hMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFMUJRVTBzUTBGQlF6dG5Ra0ZETlVJc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhMUVVGTExFTkJRVU1zU1VGQlNTeEhRVUZETEVsQlFVa3NRMEZCUXp0aFFVTjRRenRwUWtGQlRUdG5Ra0ZEU0N4SlFVRkpMRTFCUVUwc1IwRkJReXhEUVVGRExFbEJRVWtzUzBGQlN5eERRVUZETEVsQlFVa3NTMEZCU3l4UFFVRlBMRVZCUVVVN2IwSkJRM0JETEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NUVUZCVFN4RFFVRkRPMmxDUVVNdlFqdG5Ra0ZEUkN4UFFVRlBMRWxCUVVrc1EwRkJRenRoUVVObU8xbEJRMFFzVDBGQlR5eExRVUZMTEVOQlFVTTdVVUZEYWtJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeFBRVUZQTEUxQlFVMHNRMEZCUXp0SlFVTnNRaXhEUVVGRE8wbEJRVUVzUTBGQlF6dEpRVkZSTEZOQlFWTXNRMEZCUXl4VlFVRTRRanRSUVVNNVF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRE8xRkJRM0JDTEVsQlFVa3NUVUZCVFN4SFFVRm5RaXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRSUVVOMlJDeFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJZeXhGUVVGRkxFTkJRVkVzUlVGQlJTeEZRVUZGTzFsQlEzaERMRU5CUVVNc1EwRkJReXhMUVVGTExFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZQTEVOQlFVTTdXVUZEY2tNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNSVUZCVXl4RlFVRkZMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU1zUzBGQlN5eEpRVUZKTEVkQlFVY3NSVUZCUlN4TFFVRkxMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlF6VkhMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzVDBGQlR5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRPMGxCUTNwQ0xFTkJRVU03U1VGQlFTeERRVUZETzBOQlEwdzdRVUZCUVN4RFFVRkRPMEZCZFVSR0xFMUJRVTBzVDBGQlVTeFRRVUZSTEdOQlFXTTdTVUZEYUVNc1dVRkJiVUlzVVVGQmMwSTdVVUZCU1N4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRExIRkNRVUZoTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hSUVVGUkxFTkJRVU1zUTBGQlF6dFJRVUZ5UlN4aFFVRlJMRWRCUVZJc1VVRkJVU3hEUVVGak8wbEJRV2xFTEVOQlFVTTdTVUZCUVN4RFFVRkRPME5CUXk5R08wRkJRVUVzUTBGQlF6dEJRWFZFUml4TlFVRk5MRWxCUVVzc1UwRkJVU3hqUVVGak8wbEJRemRDTEZsQlFXMUNMRkZCUVhOQ08xRkJRVWtzUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4eFFrRkJZU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkJja1VzWVVGQlVTeEhRVUZTTEZGQlFWRXNRMEZCWXp0SlFVRnBSQ3hEUVVGRE8wbEJRVUVzUTBGQlF6dERRVU12Ump0QlFVRkJMRU5CUVVNN1FVRkZSaXh0UWtGQlVTeERRVUZETEZGQlFWRXNRMEZCUXl4eFFrRkJZU3hEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRPMEZCUXpkRExHMUNRVUZSTEVOQlFVTXNVVUZCVVN4RFFVRkRMSEZDUVVGaExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVc3NTVUZCU1N4RFFVRkRMRU5CUVVNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IExheW91dGVyXzEgPSByZXF1aXJlKFwiLi9MYXlvdXRlclwiKTtcbmNvbnN0IFRva2Vuc18xID0gcmVxdWlyZShcIi4vVG9rZW5zXCIpO1xuY2xhc3MgVGlsZUxheW91dGVyIGV4dGVuZHMgTGF5b3V0ZXJfMS5MYXlvdXRlciB7XG4gICAgY29uc3RydWN0b3IoYXJlYURlc2MpIHtcbiAgICAgICAgc3VwZXIoYXJlYURlc2MpO1xuICAgICAgICB0aGlzLmFyZWFEZXNjID0gYXJlYURlc2M7XG4gICAgICAgIHRoaXMudW5pdCA9IGFyZWFEZXNjLnNvbWUoKGFyZWEpID0+IChhcmVhIGluc3RhbmNlb2YgVG9rZW5zXzEuUGl4ZWxUb2tlbikpID9cbiAgICAgICAgICAgIHRoaXMudW5pdFBpeGVsIDogdGhpcy51bml0UGVyY2VudDtcbiAgICB9XG4gICAgO1xuICAgIHVuaXRQZXJjZW50KG51bSkge1xuICAgICAgICBjb25zdCBkZXNjID0gdGhpcy5hcmVhRGVzYztcbiAgICAgICAgY29uc3QgZmlsbCA9IHRoaXMuYXJlYURlc2Muc29tZShhID0+IChhIGluc3RhbmNlb2YgVG9rZW5zXzEuRmlsbFRva2VuKSk7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBNYXRoLnNxcnQobnVtKTtcbiAgICAgICAgY29uc3Qgcm93cyA9IE1hdGgucm91bmQocm9vdCk7XG4gICAgICAgIGxldCBjb2xzID0gTWF0aC5mbG9vcihyb290KTtcbiAgICAgICAgaWYgKHJvb3QgPiBjb2xzKSB7XG4gICAgICAgICAgICBjb2xzKys7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdpZHRoID0gKGRlc2NbMF0gaW5zdGFuY2VvZiBUb2tlbnNfMS5EZWZpbmVkVG9rZW4pID8gZGVzY1swXS5nZXRTaXplKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBoZWlnaHQgPSAoZGVzY1sxXSBpbnN0YW5jZW9mIFRva2Vuc18xLkRlZmluZWRUb2tlbikgPyBkZXNjWzFdLmdldFNpemUoKSA6IHdpZHRoO1xuICAgICAgICB3aWR0aCA9IHdpZHRoIHx8IDEwMCAvIGNvbHM7XG4gICAgICAgIGhlaWdodCA9IGhlaWdodCB8fCAxMDAgLyByb3dzO1xuICAgICAgICBsZXQgbGVmdCA9IDA7XG4gICAgICAgIGxldCB0b3AgPSAwO1xuICAgICAgICBsZXQgc3R5bGVzID0gWy4uLkFycmF5KG51bSkua2V5cygpXS5tYXAoaSA9PiB7XG4gICAgICAgICAgICBsZXQgciA9ICdhdXRvJztcbiAgICAgICAgICAgIGxldCB3ID0gd2lkdGggKyAnJSc7XG4gICAgICAgICAgICBsZXQgYiA9ICdhdXRvJztcbiAgICAgICAgICAgIGxldCBoID0gaGVpZ2h0ICsgJyUnO1xuICAgICAgICAgICAgaWYgKChsZWZ0ICsgMiAqIHdpZHRoKSA+IDEwMCAmJiBmaWxsKSB7XG4gICAgICAgICAgICAgICAgciA9ICcwJSc7XG4gICAgICAgICAgICAgICAgdyA9ICdhdXRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodG9wICsgMiAqIGhlaWdodCkgPiAxMDAgJiYgZmlsbCkge1xuICAgICAgICAgICAgICAgIGIgPSAnMCUnO1xuICAgICAgICAgICAgICAgIGggPSAnYXV0byc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGBcbiAgICAgICAgICAgICAgICB0b3A6ICR7TWF0aC5mbG9vcih0b3ApfSU7IGJvdHRvbToke2J9O1xuICAgICAgICAgICAgICAgIGxlZnQ6ICR7bGVmdH0lOyAgICAgICAgICAgcmlnaHQ6JHtyfTtcbiAgICAgICAgICAgICAgICB3aWR0aDogJHt3fTsgICAgICAgICAgICAgIGhlaWdodDogJHtofTtcbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICBpZiAoTWF0aC5yb3VuZChsZWZ0ICs9IHdpZHRoKSA+IDEwMCAtIE1hdGguZmxvb3Iod2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgdG9wICs9IGhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICAgIDtcbiAgICB1bml0UGl4ZWwobnVtKSB7XG4gICAgICAgIGNvbnN0IGRlc2MgPSB0aGlzLmFyZWFEZXNjO1xuICAgICAgICBjb25zdCByb290ID0gTWF0aC5zcXJ0KG51bSk7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBNYXRoLnJvdW5kKHJvb3QpO1xuICAgICAgICBsZXQgY29scyA9IE1hdGguZmxvb3Iocm9vdCk7XG4gICAgICAgIGlmIChyb290ID4gY29scykge1xuICAgICAgICAgICAgY29scysrO1xuICAgICAgICB9XG4gICAgICAgIGxldCB3aWR0aCA9IChkZXNjWzBdIGluc3RhbmNlb2YgVG9rZW5zXzEuRGVmaW5lZFRva2VuKSA/IGRlc2NbMF0uZ2V0U2l6ZSgpIDogdW5kZWZpbmVkO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gKGRlc2NbMV0gaW5zdGFuY2VvZiBUb2tlbnNfMS5EZWZpbmVkVG9rZW4pID8gZGVzY1sxXS5nZXRTaXplKCkgOiB3aWR0aDtcbiAgICAgICAgd2lkdGggPSB3aWR0aCB8fCAxMDAgLyBjb2xzO1xuICAgICAgICBoZWlnaHQgPSBoZWlnaHQgfHwgMTAwIC8gcm93cztcbiAgICAgICAgbGV0IGxlZnQgPSAwO1xuICAgICAgICBsZXQgdG9wID0gMDtcbiAgICAgICAgbGV0IHN0eWxlcyA9IFsuLi5BcnJheShudW0pLmtleXMoKV0ubWFwKGkgPT4ge1xuICAgICAgICAgICAgbGV0IHIgPSAnYXV0byc7XG4gICAgICAgICAgICBsZXQgdyA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIGxldCBiID0gJ2F1dG8nO1xuICAgICAgICAgICAgbGV0IGggPSBoZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBgXG4gICAgICAgICAgICAgICAgdG9wOiAke01hdGguZmxvb3IodG9wKX0lOyBib3R0b206JHtifTtcbiAgICAgICAgICAgICAgICBsZWZ0OiAke2xlZnR9JTsgICAgICAgICAgIHJpZ2h0OiR7cn07XG4gICAgICAgICAgICAgICAgd2lkdGg6ICR7d307ICAgICAgICAgICAgICBoZWlnaHQ6ICR7aH07XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgaWYgKE1hdGgucm91bmQobGVmdCArPSB3aWR0aCkgPiAxMDAgLSBNYXRoLmZsb29yKHdpZHRoKSkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSAwO1xuICAgICAgICAgICAgICAgIHRvcCArPSBoZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH1cbiAgICA7XG4gICAgZ2V0U3R5bGVzKGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IHN0eWxlcyA9IHRoaXMudW5pdChjb21wb25lbnRzLmxlbmd0aCk7XG4gICAgICAgIGNvbXBvbmVudHMubWFwKChjLCBpKSA9PiB7XG4gICAgICAgICAgICBjLnN0eWxlID0gc3R5bGVzW2ldO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICcuaHMtdGlsZS1sYXlvdXQnO1xuICAgIH1cbiAgICA7XG59XG47XG5MYXlvdXRlcl8xLkxheW91dGVyLnJlZ2lzdGVyKCd0aWxlcycsIFRpbGVMYXlvdXRlcik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWR2xzWlV4aGVXOTFkR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dmMzSmpMM1pwWlhjdlZHbHNaVXhoZVc5MWRHVnlMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQk9FUkJMSGxEUVVFd1F6dEJRVU14UXl4eFEwRkhkME03UVVGUGVFTXNUVUZCVFN4WlFVRmhMRk5CUVZFc2JVSkJRVkU3U1VGUkwwSXNXVUZCYlVJc1VVRkJjMEk3VVVGRGNrTXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8xRkJSRVFzWVVGQlVTeEhRVUZTTEZGQlFWRXNRMEZCWXp0UlFVbHlReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGblFpeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1dVRkJXU3h0UWtGQlZTeERRVUZETEVOQlFVTXNRMEZCUVN4RFFVRkRPMWxCUXpGRkxFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU03U1VGRE1VTXNRMEZCUXp0SlFVRkJMRU5CUVVNN1NVRkZUU3hYUVVGWExFTkJRVU1zUjBGQlZUdFJRVU14UWl4TlFVRk5MRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETzFGQlF6TkNMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEZsQlFWa3NhMEpCUVZNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGREwwUXNUVUZCVFN4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTTFRaXhOUVVGTkxFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRemxDTEVsQlFVMHNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZET1VJc1NVRkJTU3hKUVVGSkxFZEJRVWNzU1VGQlNTeEZRVUZGTzFsQlFVVXNTVUZCU1N4RlFVRkZMRU5CUVVNN1UwRkJSVHRSUVVNMVFpeEpRVUZKTEV0QlFVc3NSMEZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zV1VGQldTeHhRa0ZCV1N4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zVTBGQlV5eERRVUZETzFGQlF6bEZMRWxCUVVrc1RVRkJUU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4WlFVRlpMSEZDUVVGWkxFTkJRVU1zUTBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNN1VVRkZNVVVzUzBGQlN5eEhRVUZKTEV0QlFVc3NTVUZCU3l4SFFVRkhMRWRCUVVNc1NVRkJTU3hEUVVGRE8xRkJRelZDTEUxQlFVMHNSMEZCUnl4TlFVRk5MRWxCUVVrc1IwRkJSeXhIUVVGRExFbEJRVWtzUTBGQlF6dFJRVU0xUWl4SlFVRkpMRWxCUVVrc1IwRkJSeXhEUVVGRExFTkJRVU03VVVGRFlpeEpRVUZKTEVkQlFVY3NSMEZCU1N4RFFVRkRMRU5CUVVNN1VVRkZZaXhKUVVGSkxFMUJRVTBzUjBGQlJ5eERRVUZETEVkQlFVY3NTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRk8xbEJRM2hETEVsQlFVa3NRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJRenRaUVVGSkxFbEJRVWtzUTBGQlF5eEhRVUZITEV0QlFVc3NSMEZCUXl4SFFVRkhMRU5CUVVNN1dVRkRja01zU1VGQlNTeERRVUZETEVkQlFVY3NUVUZCVFN4RFFVRkRPMWxCUVVrc1NVRkJTU3hEUVVGRExFZEJRVWNzVFVGQlRTeEhRVUZETEVkQlFVY3NRMEZCUXp0WlFVTjBReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEVOQlFVTXNSMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhIUVVGSExFbEJRVWtzU1VGQlNTeEZRVUZGTzJkQ1FVRkZMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU03WjBKQlFVTXNRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJRenRoUVVGRk8xbEJRemRFTEVsQlFVa3NRMEZCUXl4SFFVRkhMRWRCUVVjc1EwRkJReXhIUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVkQlFVY3NTVUZCU1N4SlFVRkpMRVZCUVVVN1owSkJRVVVzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXp0blFrRkJReXhEUVVGRExFZEJRVWNzVFVGQlRTeERRVUZETzJGQlFVVTdXVUZETjBRc1RVRkJUU3hMUVVGTExFZEJRVWM3ZFVKQlEwZ3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zWVVGQllTeERRVUZETzNkQ1FVTTFRaXhKUVVGSkxITkNRVUZ6UWl4RFFVRkRPM2xDUVVNeFFpeERRVUZETERCQ1FVRXdRaXhEUVVGRE8yRkJRM2hETEVOQlFVTTdXVUZEUml4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeEpRVUZKTEV0QlFVc3NRMEZCUXl4SFFVRkhMRWRCUVVjc1IwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4RlFVRkZPMmRDUVVGRkxFbEJRVWtzUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUVVNc1IwRkJSeXhKUVVGSkxFMUJRVTBzUTBGQlF6dGhRVUZGTzFsQlEyNUdMRTlCUVU4c1MwRkJTeXhEUVVGRE8xRkJRMmhDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBvc1QwRkJUeXhOUVVGTkxFTkJRVU03U1VGRGJFSXNRMEZCUXp0SlFVRkJMRU5CUVVNN1NVRkZUU3hUUVVGVExFTkJRVU1zUjBGQlZUdFJRVU40UWl4TlFVRk5MRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETzFGQlJUTkNMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1VVRkROVUlzVFVGQlRTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU01UWl4SlFVRk5MRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpsQ0xFbEJRVWtzU1VGQlNTeEhRVUZITEVsQlFVa3NSVUZCUlR0WlFVRkZMRWxCUVVrc1JVRkJSU3hEUVVGRE8xTkJRVVU3VVVGRE5VSXNTVUZCU1N4TFFVRkxMRWRCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEZsQlFWa3NjVUpCUVZrc1EwRkJReXhEUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEZOQlFWTXNRMEZCUXp0UlFVTTVSU3hKUVVGSkxFMUJRVTBzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1dVRkJXU3h4UWtGQldTeERRVUZETEVOQlFVRXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRE8xRkJSVEZGTEV0QlFVc3NSMEZCU1N4TFFVRkxMRWxCUVVzc1IwRkJSeXhIUVVGRExFbEJRVWtzUTBGQlF6dFJRVU0xUWl4TlFVRk5MRWRCUVVjc1RVRkJUU3hKUVVGSkxFZEJRVWNzUjBGQlF5eEpRVUZKTEVOQlFVTTdVVUZETlVJc1NVRkJTU3hKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETzFGQlEySXNTVUZCU1N4SFFVRkhMRWRCUVVrc1EwRkJReXhEUVVGRE8xRkJSV0lzU1VGQlNTeE5RVUZOTEVkQlFVY3NRMEZCUXl4SFFVRkhMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJUdFpRVU40UXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU03V1VGQlNTeEpRVUZKTEVOQlFVTXNSMEZCUnl4TFFVRkxMRWRCUVVNc1NVRkJTU3hEUVVGRE8xbEJRM1JETEVsQlFVa3NRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJRenRaUVVGSkxFbEJRVWtzUTBGQlF5eEhRVUZITEUxQlFVMHNSMEZCUXl4SlFVRkpMRU5CUVVNN1dVRkRka01zVFVGQlRTeExRVUZMTEVkQlFVYzdkVUpCUTBnc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNZVUZCWVN4RFFVRkRPM2RDUVVNMVFpeEpRVUZKTEhOQ1FVRnpRaXhEUVVGRE8zbENRVU14UWl4RFFVRkRMREJDUVVFd1FpeERRVUZETzJGQlEzaERMRU5CUVVNN1dVRkRSaXhKUVVGSkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4SlFVRkpMRXRCUVVzc1EwRkJReXhIUVVGSExFZEJRVWNzUjBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhGUVVGRk8yZENRVUZGTEVsQlFVa3NSMEZCUnl4RFFVRkRMRU5CUVVNN1owSkJRVU1zUjBGQlJ5eEpRVUZKTEUxQlFVMHNRMEZCUXp0aFFVRkZPMWxCUTI1R0xFOUJRVThzUzBGQlN5eERRVUZETzFGQlEyaENMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMG9zVDBGQlR5eE5RVUZOTEVOQlFVTTdTVUZEYkVJc1EwRkJRenRKUVVGQkxFTkJRVU03U1VGUlVTeFRRVUZUTEVOQlFVTXNWVUZCT0VJN1VVRkRPVU1zU1VGQlNTeE5RVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdVVUZETVVNc1ZVRkJWU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFXTXNSVUZCUlN4RFFVRlJMRVZCUVVVc1JVRkJSVHRaUVVONFF5eERRVUZETEVOQlFVTXNTMEZCU3l4SFFVRkhMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU40UWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOSUxFOUJRVThzYVVKQlFXbENMRU5CUVVNN1NVRkROMElzUTBGQlF6dEpRVUZCTEVOQlFVTTdRMEZEVER0QlFVRkJMRU5CUVVNN1FVRkhSaXh0UWtGQlVTeERRVUZETEZGQlFWRXNRMEZCUXl4UFFVRlBMRVZCUVVVc1dVRkJXU3hEUVVGRExFTkJRVU1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgTGF5b3V0VG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB9XG4gICAgZ2V0U2l6ZSgpIHsgcmV0dXJuIHRoaXMuc2l6ZTsgfVxufVxuZXhwb3J0cy5MYXlvdXRUb2tlbiA9IExheW91dFRva2VuO1xuY2xhc3MgRGVmaW5lZFRva2VuIGV4dGVuZHMgTGF5b3V0VG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHsgc3VwZXIoc2l6ZSk7IH1cbn1cbmV4cG9ydHMuRGVmaW5lZFRva2VuID0gRGVmaW5lZFRva2VuO1xuY2xhc3MgRmlsbFRva2VuIGV4dGVuZHMgTGF5b3V0VG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigtMSk7IH1cbn1cbmV4cG9ydHMuRmlsbFRva2VuID0gRmlsbFRva2VuO1xuY2xhc3MgUGl4ZWxUb2tlbiBleHRlbmRzIERlZmluZWRUb2tlbiB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSkgeyBzdXBlcihzaXplKTsgfVxufVxuZXhwb3J0cy5QaXhlbFRva2VuID0gUGl4ZWxUb2tlbjtcbmNsYXNzIFBlcmNlbnRUb2tlbiBleHRlbmRzIERlZmluZWRUb2tlbiB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSkgeyBzdXBlcihzaXplKTsgfVxufVxuZXhwb3J0cy5QZXJjZW50VG9rZW4gPSBQZXJjZW50VG9rZW47XG5mdW5jdGlvbiBweChweCkgeyByZXR1cm4gbmV3IFBpeGVsVG9rZW4ocHgpOyB9XG5leHBvcnRzLnB4ID0gcHg7XG5mdW5jdGlvbiBwYyhwYykgeyByZXR1cm4gbmV3IFBlcmNlbnRUb2tlbihwYyk7IH1cbmV4cG9ydHMucGMgPSBwYztcbmV4cG9ydHMuRklMTCA9IG5ldyBGaWxsVG9rZW4oKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVZHOXJaVzV6TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dmMzSmpMM1pwWlhjdlZHOXJaVzV6TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJVVUVzVFVGQmMwSXNWMEZCVnp0SlFVTTNRaXhaUVVGdlFpeEpRVUZaTzFGQlFWb3NVMEZCU1N4SFFVRktMRWxCUVVrc1EwRkJVVHRKUVVGSExFTkJRVU03U1VGRE4wSXNUMEZCVHl4TFFVRkxMRTlCUVU4c1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTTdRMEZEZWtNN1FVRklSQ3hyUTBGSFF6dEJRVXRFTEUxQlFYTkNMRmxCUVdFc1UwRkJVU3hYUVVGWE8wbEJRMnhFTEZsQlFWa3NTVUZCV1N4SlFVRkpMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRMEZETjBNN1FVRkdSQ3h2UTBGRlF6dEJRVXRFTEUxQlFXRXNVMEZCVlN4VFFVRlJMRmRCUVZjN1NVRkRkRU1zWjBKQlFXZENMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0RFFVTXZRanRCUVVaRUxEaENRVVZETzBGQlMwUXNUVUZCWVN4VlFVRlhMRk5CUVZFc1dVRkJXVHRKUVVONFF5eFpRVUZaTEVsQlFWY3NTVUZCU1N4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzBOQlF6VkRPMEZCUmtRc1owTkJSVU03UVVGTFJDeE5RVUZoTEZsQlFXRXNVMEZCVVN4WlFVRlpPMGxCUXpGRExGbEJRVmtzU1VGQlZ5eEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRE5VTTdRVUZHUkN4dlEwRkZRenRCUVUxRUxGTkJRV2RDTEVWQlFVVXNRMEZCUXl4RlFVRlRMRWxCUVUwc1QwRkJUeXhKUVVGSkxGVkJRVlVzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkJPVVFzWjBKQlFUaEVPMEZCVFRsRUxGTkJRV2RDTEVWQlFVVXNRMEZCUXl4RlFVRlRMRWxCUVUwc1QwRkJUeXhKUVVGSkxGbEJRVmtzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkJhRVVzWjBKQlFXZEZPMEZCUzI1RUxGRkJRVUVzU1VGQlNTeEhRVUZITEVsQlFVa3NVMEZCVXl4RlFVRkZMRU5CUVVNaWZRPT0iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuIiwidmFyIHNjb3BlID0gKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsKSB8fFxuICAgICAgICAgICAgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYpIHx8XG4gICAgICAgICAgICB3aW5kb3c7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbChzY29wZSwgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG4vLyBPbiBzb21lIGV4b3RpYyBlbnZpcm9ubWVudHMsIGl0J3Mgbm90IGNsZWFyIHdoaWNoIG9iamVjdCBgc2V0aW1tZWRpYXRlYCB3YXNcbi8vIGFibGUgdG8gaW5zdGFsbCBvbnRvLiAgU2VhcmNoIGVhY2ggcG9zc2liaWxpdHkgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlXG4vLyBgc2V0aW1tZWRpYXRlYCBsaWJyYXJ5LlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuc2V0SW1tZWRpYXRlKTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5jbGVhckltbWVkaWF0ZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFRvZ2dsZUJ1dHRvbl8xID0gcmVxdWlyZShcIi4vVG9nZ2xlQnV0dG9uXCIpO1xuY2xhc3MgQnV0dG9uIGV4dGVuZHMgVG9nZ2xlQnV0dG9uXzEuVG9nZ2xlQnV0dG9uIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBub2RlLmF0dHJzLmRlc2MuaXRlbXMgPSBbbm9kZS5hdHRycy5kZXNjLm5hbWUgfHwgJ2J1dHRvbiddO1xuICAgICAgICBzdXBlci5vbmluaXQobm9kZSk7XG4gICAgICAgIFRvZ2dsZUJ1dHRvbl8xLlRvZ2dsZUJ1dHRvbi5lbnN1cmVTZWxlY3RlZChub2RlKTtcbiAgICB9XG59XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVFuVjBkRzl1TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwwSjFkSFJ2Ymk1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRV2REUVN4cFJFRkJPRU03UVVGbE9VTXNUVUZCWVN4TlFVRlBMRk5CUVZFc01rSkJRVms3U1VGRGNFTXNUVUZCVFN4RFFVRkRMRWxCUVZjN1VVRkRaQ3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRWxCUVVrc1VVRkJVU3hEUVVGRExFTkJRVU03VVVGRE0wUXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU51UWl3eVFrRkJXU3hEUVVGRExHTkJRV01zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTjBReXhEUVVGRE8wTkJRMG83UVVGT1JDeDNRa0ZOUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNsYXNzIENvbGxhcHNpYmxlIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBub2RlLnN0YXRlID0ge1xuICAgICAgICAgICAgaW5pdGlhbDogdHJ1ZSxcbiAgICAgICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHRvZ2dsZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuc3RhdGUuZXhwYW5kZWQgPSAhbm9kZS5zdGF0ZS5leHBhbmRlZDtcbiAgICAgICAgICAgICAgICBub2RlLnN0YXRlLmluaXRpYWwgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzO1xuICAgICAgICBjb25zdCBjb21wb25lbnRzID0gbm9kZS5hdHRycy5jb21wb25lbnRzO1xuICAgICAgICBjb25zdCBwcmVBcnJvdyA9IG5vZGUuYXR0cnMucHJlQXJyb3c7XG4gICAgICAgIGNvbnN0IHBvc3RBcnJvdyA9IG5vZGUuYXR0cnMucG9zdEFycm93O1xuICAgICAgICBpZiAobm9kZS5zdGF0ZS5pbml0aWFsICYmIG5vZGUuYXR0cnMuaXNFeHBhbmRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLmV4cGFuZGVkID0gbm9kZS5hdHRycy5pc0V4cGFuZGVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGV4cENTUyA9IG5vZGUuc3RhdGUuZXhwYW5kZWQgPyAnaHMtY29sbGFwc2libGUtZXhwYW5kZWQnIDogJyc7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oYC5ocy1jb2xsYXBzaWJsZSAke2Nzc31gLCBbXG4gICAgICAgICAgICBoc2xheW91dF8xLm0oJy5ocy1jb2xsYXBzaWJsZS10aXRsZScsIHsgb25jbGljazogbm9kZS5zdGF0ZS50b2dnbGUgfSwgW1xuICAgICAgICAgICAgICAgICFwcmVBcnJvdyA/IGhzbGF5b3V0XzEubSgnJykgOiBoc2xheW91dF8xLm0oYC5ocy1jb2xsYXBzaWJsZS1wcmUgLmhzLWNvbGxhcHNpYmxlLWFycm93LSR7bm9kZS5zdGF0ZS5leHBhbmRlZCA/ICdkb3duJyA6ICdyaWdodCd9YCksXG4gICAgICAgICAgICAgICAgY29tcG9uZW50c1swXSxcbiAgICAgICAgICAgICAgICAhcG9zdEFycm93ID8gaHNsYXlvdXRfMS5tKCcnKSA6IGhzbGF5b3V0XzEubShgLmhzLWNvbGxhcHNpYmxlLXBvc3QgLmhzLWNvbGxhcHNpYmxlLWFycm93LSR7bm9kZS5zdGF0ZS5leHBhbmRlZCA/ICdkb3duJyA6ICdsZWZ0J31gKSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgY29tcG9uZW50c1sxXSA/IGhzbGF5b3V0XzEubShgLmhzLWNvbGxhcHNpYmxlLWNvbnRlbnQgJHtleHBDU1N9YCwgY29tcG9uZW50c1sxXS5tYXAoKGMpID0+IGhzbGF5b3V0XzEubSgnJywgYykpKSA6IHVuZGVmaW5lZFxuICAgICAgICBdKTtcbiAgICB9XG59XG5leHBvcnRzLkNvbGxhcHNpYmxlID0gQ29sbGFwc2libGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRMjlzYkdGd2MybGliR1V1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdlEyOXNiR0Z3YzJsaWJHVXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGcFJFRXNkVU5CUVc5RE8wRkJSWEJETEUxQlFXRXNWMEZCVnp0SlFVTndRaXhOUVVGTkxFTkJRVU1zU1VGQlZUdFJRVU5pTEVsQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjN1dVRkRWQ3hQUVVGUExFVkJRVVVzU1VGQlNUdFpRVU5pTEZGQlFWRXNSVUZCUlN4TFFVRkxPMWxCUTJZc1RVRkJUU3hGUVVGRkxFZEJRVWNzUlVGQlJUdG5Ra0ZEVkN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRE8yZENRVU16UXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUjBGQlJ5eExRVUZMTEVOQlFVTTdXVUZETDBJc1EwRkJRenRUUVVOS0xFTkJRVU03U1VGRFRpeERRVUZETzBsQlEwUXNTVUZCU1N4RFFVRkRMRWxCUVZVN1VVRkRXQ3hOUVVGTkxFZEJRVWNzUjBGQlZTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJRenRSUVVOc1F5eE5RVUZOTEZWQlFWVXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU42UXl4TlFVRk5MRkZCUVZFc1IwRkJTeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXp0UlFVTjJReXhOUVVGTkxGTkJRVk1zUjBGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRk5CUVZNc1EwRkJRenRSUVVONFF5eEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhKUVVGSkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWVUZCVlN4TFFVRkhMRk5CUVZNc1JVRkJSVHRaUVVONlJDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRkZCUVZFc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZWQlFWVXNRMEZCUXp0VFFVTXZRenRSUVVORUxFMUJRVTBzVFVGQlRTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGQkxFTkJRVU1zUTBGQlFTeDVRa0ZCZVVJc1EwRkJRU3hEUVVGRExFTkJRVUVzUlVGQlJTeERRVUZETzFGQlEyaEZMRTlCUVU4c1dVRkJReXhEUVVGRExHMUNRVUZ0UWl4SFFVRkhMRVZCUVVVc1JVRkJSVHRaUVVNdlFpeFpRVUZETEVOQlFVTXNkVUpCUVhWQ0xFVkJRVVVzUlVGQlJTeFBRVUZQTEVWQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFVkJRVU1zUlVGQlJUdG5Ra0ZEY2tRc1EwRkJReXhSUVVGUkxFTkJRVUVzUTBGQlF5eERRVUZETEZsQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zV1VGQlF5eERRVUZETERaRFFVRTJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUVN4RFFVRkRMRU5CUVVFc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXp0blFrRkRla2NzVlVGQlZTeERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRZaXhEUVVGRExGTkJRVk1zUTBGQlFTeERRVUZETEVOQlFVTXNXVUZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eFpRVUZETEVOQlFVTXNPRU5CUVRoRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkJMRU5CUVVNc1EwRkJRU3hOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEUxQlFVMHNSVUZCUlN4RFFVRkRPMkZCUXpkSExFTkJRVU03V1VGRFJpeFZRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExGbEJRVU1zUTBGQlF5d3lRa0ZCTWtJc1RVRkJUU3hGUVVGRkxFVkJRVVVzVlVGQlZTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVXNzUlVGQlJTeEZRVUZGTEVOQlFVRXNXVUZCUXl4RFFVRkRMRVZCUVVVc1JVRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRk5CUVZNN1UwRkRNVWNzUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXp0RFFVTktPMEZCTjBKRUxHdERRVFpDUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNsYXNzIExhYmVsIHtcbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgY29uc3QgY3NzID0gbm9kZS5hdHRycy5jc3MgfHwgJyc7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gbm9kZS5hdHRycy5zdHlsZSB8fCAnJztcbiAgICAgICAgY29uc3QgdGV4dCA9IG5vZGUuYXR0cnMudGV4dCB8fCAndW5zcGVjaWZpZWQnO1xuICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKGAuaHMtbGFiZWwgJHtjc3N9YCwgeyBzdHlsZTogc3R5bGUgfSwgaHNsYXlvdXRfMS5tLnRydXN0KHRleHQpKTtcbiAgICB9XG59XG5leHBvcnRzLkxhYmVsID0gTGFiZWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUR0ZpWld3dWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZUR0ZpWld3dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZuUTBFc2RVTkJRWGRETzBGQldYaERMRTFCUVdFc1MwRkJTenRKUVVOa0xFbEJRVWtzUTBGQlF5eEpRVUZYTzFGQlExb3NUVUZCVFN4SFFVRkhMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVsQlFVa3NSVUZCUlN4RFFVRkRPMUZCUTJwRExFMUJRVTBzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVU55UXl4TlFVRk5MRWxCUVVrc1IwRkJTU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NTVUZCU1N4aFFVRmhMRU5CUVVNN1VVRkRMME1zVDBGQlR5eFpRVUZETEVOQlFVTXNZVUZCWVN4SFFVRkhMRVZCUVVVc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlF5eExRVUZMTEVWQlFVVXNSVUZCUlN4WlFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEYWtVc1EwRkJRenREUVVOS08wRkJVRVFzYzBKQlQwTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBSYWRpb0J1dHRvbl8xID0gcmVxdWlyZShcIi4vUmFkaW9CdXR0b25cIik7XG5jbGFzcyBNZW51IGV4dGVuZHMgUmFkaW9CdXR0b25fMS5SYWRpb0J1dHRvbiB7XG4gICAgdmlldyhub2RlKSB7IHJldHVybiBSYWRpb0J1dHRvbl8xLlJhZGlvQnV0dG9uLnZpZXdHcm91cCgnLmhzLW1lbnUnLCBub2RlKTsgfVxufVxuZXhwb3J0cy5NZW51ID0gTWVudTtcbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVRXVnVkUzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMM055WXk5TlpXNTFMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQmQwUkJMQ3REUVVFMlF6dEJRVTAzUXl4TlFVRmhMRWxCUVVzc1UwRkJVU3g1UWtGQlZ6dEpRVU5xUXl4SlFVRkpMRU5CUVVNc1NVRkJWeXhKUVVGWExFOUJRVThzZVVKQlFWY3NRMEZCUXl4VFFVRlRMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0RFFVTXZSVHRCUVVaRUxHOUNRVVZETzBGQlFVRXNRMEZCUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IFRvb2xiYXJCdXR0b25fMSA9IHJlcXVpcmUoXCIuL1Rvb2xiYXJCdXR0b25cIik7XG5jbGFzcyBNb2RhbCB7XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgbm9kZS5zdGF0ZS5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApO1xuICAgICAgICBub2RlLnN0YXRlLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9ICgpID0+IHtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuc2hvd01vZGFsID0gdHJ1ZTtcbiAgICAgICAgICAgIGhzbGF5b3V0XzEubS5yZWRyYXcoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZGlzbWlzcyA9ICgpID0+IHtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuc2hvd01vZGFsID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobm9kZS5hdHRycy5kaXNtaXNzKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5hdHRycy5kaXNtaXNzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHcgPSBub2RlLmF0dHJzLndpZHRoIHx8ICdhdXRvJztcbiAgICAgICAgY29uc3QgaCA9IG5vZGUuYXR0cnMuaGVpZ2h0IHx8ICdhdXRvJztcbiAgICAgICAgY29uc3QgYXR0cnMgPSB7IHN0eWxlOiBgd2lkdGg6JHt3fTsgaGVpZ2h0OiR7aH07YCB9O1xuICAgICAgICBpZiAobm9kZS5hdHRycy5zZXRUcmlnZ2VyKSB7XG4gICAgICAgICAgICBub2RlLmF0dHJzLnNldFRyaWdnZXIodHJpZ2dlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgcmVxdWlyZWQgYXR0cmlidXRlIGZ1bmN0aW9uICdzZXRUcmlnZ2VyJyBpcyBub3QgZGVmaW5lZGApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhbm9kZS5zdGF0ZS5zaG93TW9kYWwgPyBoc2xheW91dF8xLm0oJ3NwYW4nKSA6IGhzbGF5b3V0XzEubSgnLmhzLW1vZGFsLWZyYW1lJywgW1xuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKCcuaHMtbW9kYWwtYmFja2dyb3VuZCcsIHsgb25jbGljazogZGlzbWlzcyB9LCAnJyksXG4gICAgICAgICAgICBoc2xheW91dF8xLm0oJy5ocy1tb2RhbC1mb3JlZ3JvdW5kJywgYXR0cnMsICFub2RlLmF0dHJzLmNvbnRlbnQgPyAnbW9kYWwgcGFuZScgOiBbXG4gICAgICAgICAgICAgICAgbm9kZS5hdHRycy5jb250ZW50LFxuICAgICAgICAgICAgICAgIGhzbGF5b3V0XzEubShUb29sYmFyQnV0dG9uXzEuVG9vbGJhckJ1dHRvbiwgeyBvbmNsaWNrOiBkaXNtaXNzLCBzeW1ib2xzOiBUb29sYmFyQnV0dG9uXzEuVG9vbGJhckJ1dHRvbi5nZXRTeW1ib2woJ2Nyb3NzJykgfSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pO1xuICAgIH1cbn1cbmV4cG9ydHMuTW9kYWwgPSBNb2RhbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVRXOWtZV3d1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdlRXOWtZV3d1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRnZRMEVzZFVOQlFXOURPMEZCUTNCRExHMUVRVUZuUkR0QlFVVm9SQ3hOUVVGaExFdEJRVXM3U1VGRFpDeE5RVUZOTEVOQlFVTXNTVUZCVlR0UlFVTmlMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUlVGQlJTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeEhRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXk5RExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVMEZCVXl4SFFVRkhMRXRCUVVzc1EwRkJRenRKUVVOcVF5eERRVUZETzBsQlEwUXNTVUZCU1N4RFFVRkRMRWxCUVZVN1VVRkRXQ3hOUVVGTkxFOUJRVThzUjBGQlJ5eEhRVUZITEVWQlFVVTdXVUZEYWtJc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFRRVUZUTEVkQlFVY3NTVUZCU1N4RFFVRkRPMWxCUXpWQ0xGbEJRVU1zUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXp0UlFVTm1MRU5CUVVNc1EwRkJRenRSUVVOR0xFMUJRVTBzVDBGQlR5eEhRVUZITEVkQlFVY3NSVUZCUlR0WlFVTnFRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZOQlFWTXNSMEZCUnl4TFFVRkxMRU5CUVVNN1dVRkROMElzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1JVRkJSVHRuUWtGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRE8yRkJRVVU3VVVGRGNrUXNRMEZCUXl4RFFVRkRPMUZCUTBZc1RVRkJUU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWxCUVVzc1RVRkJUU3hEUVVGRE8xRkJRM1JETEUxQlFVMHNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeEpRVUZKTEUxQlFVMHNRMEZCUXp0UlFVTjBReXhOUVVGTkxFdEJRVXNzUjBGQlJ5eEZRVUZGTEV0QlFVc3NSVUZCUlN4VFFVRlRMRU5CUVVNc1dVRkJXU3hEUVVGRExFZEJRVWNzUlVGQlF5eERRVUZETzFGQlEyNUVMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFZRVUZWTEVWQlFVVTdXVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGVkJRVlVzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0VFFVRkZPMkZCUTNwRU8xbEJRVVVzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4NVJFRkJlVVFzUTBGQlF5eERRVUZETzFOQlFVVTdVVUZEYUVZc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVMEZCVXl4RFFVRkJMRU5CUVVNc1EwRkJReXhaUVVGRExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRmxCUVVNc1EwRkJReXhwUWtGQmFVSXNSVUZCUlR0WlFVTXpSQ3haUVVGRExFTkJRVU1zYzBKQlFYTkNMRVZCUVVVc1JVRkJSU3hQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZETEVWQlFVVXNSVUZCUlN4RFFVRkRPMWxCUTJ4RUxGbEJRVU1zUTBGQlF5eHpRa0ZCYzBJc1JVRkJSU3hMUVVGTExFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJRU3hEUVVGRExFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRha1VzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBPMmRDUVVOc1FpeFpRVUZETEVOQlFVTXNOa0pCUVdFc1JVRkJSU3hGUVVGRkxFOUJRVThzUlVGQlJTeFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkRMRFpDUVVGaExFTkJRVU1zVTBGQlV5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZMRU5CUVVNN1lVRkRia1lzUTBGQlF6dFRRVU5NTEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNN1EwRkRTanRCUVROQ1JDeHpRa0V5UWtNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBoc2xheW91dF8yID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgU2VsZWN0b3JfMSA9IHJlcXVpcmUoXCIuL1NlbGVjdG9yXCIpO1xuY29uc3QgU2VsZWN0b3JfMiA9IHJlcXVpcmUoXCIuL1NlbGVjdG9yXCIpO1xuY2xhc3MgT3B0aW9uc0J1dHRvbiBleHRlbmRzIFNlbGVjdG9yXzEuU2VsZWN0b3Ige1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIFNlbGVjdG9yXzEuU2VsZWN0b3IuaW5pdChub2RlLCBTZWxlY3Rvcl8yLmFueUl0ZW1zKTtcbiAgICB9XG4gICAgc3RhdGljIHZpZXdHcm91cChjc3MsIG5vZGUpIHtcbiAgICAgICAgY3NzID0gYCR7Y3NzfSAke25vZGUuYXR0cnMuY3NzIHx8ICcnfWA7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gbm9kZS5hdHRycy5zdHlsZSB8fCAnJztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShjc3MsIHsgc3R5bGU6IHN0eWxlIH0sIGhzbGF5b3V0XzEubShoc2xheW91dF8yLkxheW91dCwge1xuICAgICAgICAgICAgY29sdW1uczogW10sXG4gICAgICAgICAgICBjb250ZW50OiBub2RlLnN0YXRlLml0ZW1zLm1hcCgobCwgaSkgPT4gU2VsZWN0b3JfMS5TZWxlY3Rvci5yZW5kZXJJdGVtKG5vZGUsIGkpKVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHZpZXcobm9kZSkgeyByZXR1cm4gT3B0aW9uc0J1dHRvbi52aWV3R3JvdXAoJy5ocy1vcHRpb25zLWJ1dHRvbnMnLCBub2RlKTsgfVxufVxuZXhwb3J0cy5PcHRpb25zQnV0dG9uID0gT3B0aW9uc0J1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVQzQjBhVzl1YzBKMWRIUnZiaTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMM055WXk5UGNIUnBiMjV6UW5WMGRHOXVMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQkswSkJMSFZEUVVGNVF6dEJRVU42UXl4MVEwRkJlVU03UVVGRGVrTXNlVU5CUVRKRE8wRkJRek5ETEhsRFFVRXlRenRCUVd0Q00wTXNUVUZCWVN4aFFVRmpMRk5CUVZFc2JVSkJRVkU3U1VGRGRrTXNUVUZCVFN4RFFVRkRMRWxCUVZVN1VVRkRZaXh0UWtGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc2JVSkJRVkVzUTBGQlF5eERRVUZETzBsQlEyeERMRU5CUVVNN1NVRkRSQ3hOUVVGTkxFTkJRVU1zVTBGQlV5eERRVUZETEVkQlFWVXNSVUZCUlN4SlFVRlhPMUZCUTNCRExFZEJRVWNzUjBGQlJ5eEhRVUZITEVkQlFVY3NTVUZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzU1VGQlNTeEZRVUZGTEVWQlFVVXNRMEZCUXp0UlFVTjJReXhOUVVGTkxFdEJRVXNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1NVRkJTU3hGUVVGRkxFTkJRVU03VVVGRmNrTXNUMEZCVHl4WlFVRkRMRU5CUVVNc1IwRkJSeXhGUVVGRkxFVkJRVU1zUzBGQlN5eEZRVUZETEV0QlFVc3NSVUZCUXl4RlFVRkZMRmxCUVVNc1EwRkJReXhwUWtGQlRTeEZRVUZGTzFsQlEyNURMRTlCUVU4c1JVRkJSU3hGUVVGRk8xbEJRMWdzVDBGQlR5eEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFWRXNSVUZCUlN4RFFVRlJMRVZCUVVVc1JVRkJSU3hEUVVGRExHMUNRVUZSTEVOQlFVTXNWVUZCVlN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dFRRVU4wUml4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOU0xFTkJRVU03U1VGRFJDeEpRVUZKTEVOQlFVTXNTVUZCVnl4SlFVRlhMRTlCUVU4c1lVRkJZU3hEUVVGRExGTkJRVk1zUTBGQlF5eHhRa0ZCY1VJc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRMEZETlVZN1FVRmtSQ3h6UTBGalF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBoc2xheW91dF8yID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgU2VsZWN0b3JfMSA9IHJlcXVpcmUoXCIuL1NlbGVjdG9yXCIpO1xuY2xhc3MgUmFkaW9CdXR0b24gZXh0ZW5kcyBTZWxlY3Rvcl8xLlNlbGVjdG9yIHtcbiAgICBzdGF0aWMgdmlld0dyb3VwKGNzcywgbm9kZSkge1xuICAgICAgICBjc3MgPSBgJHtjc3N9ICR7bm9kZS5hdHRycy5jc3MgfHwgJyd9YDtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBub2RlLmF0dHJzLnN0eWxlIHx8ICcnO1xuICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKGNzcywgeyBzdHlsZTogc3R5bGUgfSwgaHNsYXlvdXRfMS5tKGhzbGF5b3V0XzIuTGF5b3V0LCB7XG4gICAgICAgICAgICBjb2x1bW5zOiBbXSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IG5vZGUuc3RhdGUuaXRlbXMubWFwKChsLCBpKSA9PiBTZWxlY3Rvcl8xLlNlbGVjdG9yLnJlbmRlckl0ZW0obm9kZSwgaSkpXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgc3VwZXIub25pbml0KG5vZGUpO1xuICAgICAgICBTZWxlY3Rvcl8xLlNlbGVjdG9yLmVuc3VyZVNlbGVjdGVkKG5vZGUpO1xuICAgIH1cbiAgICBvbnVwZGF0ZShub2RlKSB7XG4gICAgICAgIHN1cGVyLm9udXBkYXRlKG5vZGUpO1xuICAgICAgICBTZWxlY3Rvcl8xLlNlbGVjdG9yLmVuc3VyZVNlbGVjdGVkKG5vZGUpO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHsgcmV0dXJuIFJhZGlvQnV0dG9uLnZpZXdHcm91cCgnLmhzLXJhZGlvLWJ1dHRvbnMnLCBub2RlKTsgfVxufVxuZXhwb3J0cy5SYWRpb0J1dHRvbiA9IFJhZGlvQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVW1Ga2FXOUNkWFIwYjI0dWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZVbUZrYVc5Q2RYUjBiMjR1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRnBRMEVzZFVOQlFUUkRPMEZCUXpWRExIVkRRVUUwUXp0QlFVTTFReXg1UTBGQk9FTTdRVUZyUWpsRExFMUJRV0VzVjBGQldTeFRRVUZSTEcxQ1FVRlJPMGxCUTNKRExFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNSMEZCVlN4RlFVRkZMRWxCUVZjN1VVRkRjRU1zUjBGQlJ5eEhRVUZITEVkQlFVY3NSMEZCUnl4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVWQlFVVXNSVUZCUlN4RFFVRkRPMUZCUTNaRExFMUJRVTBzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVVZ5UXl4UFFVRlBMRmxCUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlF5eExRVUZMTEVWQlFVTXNTMEZCU3l4RlFVRkRMRVZCUVVVc1dVRkJReXhEUVVGRExHbENRVUZOTEVWQlFVVTdXVUZEYmtNc1QwRkJUeXhGUVVGRkxFVkJRVVU3V1VGRFdDeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCVVN4RlFVRkZMRU5CUVZFc1JVRkJSU3hGUVVGRkxFTkJRVU1zYlVKQlFWRXNRMEZCUXl4VlFVRlZMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFOQlEzUkdMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUlzUTBGQlF6dEpRVU5FTEUxQlFVMHNRMEZCUXl4SlFVRlhPMUZCUTJRc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTnVRaXh0UWtGQlVTeERRVUZETEdOQlFXTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOc1F5eERRVUZETzBsQlEwUXNVVUZCVVN4RFFVRkRMRWxCUVZjN1VVRkRhRUlzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOeVFpeHRRa0ZCVVN4RFFVRkRMR05CUVdNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU5zUXl4RFFVRkRPMGxCUTBRc1NVRkJTU3hEUVVGRExFbEJRVmNzU1VGQlZ5eFBRVUZQTEZkQlFWY3NRMEZCUXl4VFFVRlRMRU5CUVVNc2JVSkJRVzFDTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wTkJRM2hHTzBGQmJrSkVMR3REUVcxQ1F5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5mdW5jdGlvbiBvbmVPZkl0ZW1zKGl0ZW1zLCB0aXRsZSkge1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5pc1NlbGVjdGVkID0gKGl0ZW0udGl0bGUgPT09IHRpdGxlKTtcbiAgICB9KTtcbiAgICBpZiAoIWl0ZW1zLnNvbWUoKGl0ZW0pID0+IGl0ZW0uaXNTZWxlY3RlZCkpIHtcbiAgICAgICAgaXRlbXNbMF0uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaXNTZWxlY3RlZClbMF07XG59XG5leHBvcnRzLm9uZU9mSXRlbXMgPSBvbmVPZkl0ZW1zO1xuZnVuY3Rpb24gYW55SXRlbXMoaXRlbXMsIHRpdGxlKSB7XG4gICAgaXRlbXNbdGl0bGVdLmlzU2VsZWN0ZWQgPSAhaXRlbXNbdGl0bGVdLmlzU2VsZWN0ZWQ7XG4gICAgcmV0dXJuIGl0ZW1zW3RpdGxlXTtcbn1cbmV4cG9ydHMuYW55SXRlbXMgPSBhbnlJdGVtcztcbmNsYXNzIFNlbGVjdG9yIHtcbiAgICBzdGF0aWMgdXBkYXRlSXRlbXMobm9kZSkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IG5vZGUuYXR0cnMuZGVzYy5pdGVtcyB8fCBbXTtcbiAgICAgICAgaXRlbXMubWFwKChpdG0sIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBub2RlLnN0YXRlLml0ZW1zW2l0bV0gfHwge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBpdG0sXG4gICAgICAgICAgICAgICAgaXNTZWxlY3RlZDogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBub2RlLnN0YXRlLml0ZW1zW2ldID0gaXRlbTtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuaXRlbXNbaXRtXSA9IGl0ZW07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgaW5pdChub2RlLCBtb2RlbCA9IG9uZU9mSXRlbXMpIHtcbiAgICAgICAgbm9kZS5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHVwZGF0ZU1vZGVsOiBtb2RlbCxcbiAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgIGV2ZW50czoge30sXG4gICAgICAgICAgICBpdGVtQ2xpY2tlZDogKGl0ZW0pID0+IGl0ZW0sXG4gICAgICAgICAgICBkZWZhdWx0SXRlbTogbm9kZS5hdHRycy5kZXNjLmRlZmF1bHRJdGVtXG4gICAgICAgIH07XG4gICAgICAgIG5vZGUuc3RhdGUuZXZlbnRzLm1vdXNlRG93biA9IG5vZGUuYXR0cnMuZGVzYy5tb3VzZURvd247XG4gICAgICAgIG5vZGUuc3RhdGUuZXZlbnRzLm1vdXNlVXAgPSBub2RlLmF0dHJzLmRlc2MubW91c2VVcDtcbiAgICAgICAgbm9kZS5hdHRycy5kZXNjLmNsaWNrZWQgPSBub2RlLmF0dHJzLmRlc2MuY2xpY2tlZCB8fCAoKGl0ZW0pID0+IGNvbnNvbGUubG9nKGBtaXNzaW5nIGNsaWNrZWQoKSBmdW5jdGlvbiBmb3Igc2VsZWN0b3IgaXRlbSAke2l0ZW19YCkpO1xuICAgICAgICBub2RlLnN0YXRlLmV2ZW50cy5jbGlja2VkID0gbm9kZS5hdHRycy5kZXNjLmNsaWNrZWQ7XG4gICAgICAgIFNlbGVjdG9yLnVwZGF0ZUl0ZW1zKG5vZGUpO1xuICAgIH1cbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBTZWxlY3Rvci5pbml0KG5vZGUpO1xuICAgIH1cbiAgICBvbnVwZGF0ZShub2RlKSB7XG4gICAgICAgIFNlbGVjdG9yLnVwZGF0ZUl0ZW1zKG5vZGUpO1xuICAgIH1cbiAgICBzdGF0aWMgZW5zdXJlU2VsZWN0ZWQobm9kZSkge1xuICAgICAgICBpZiAoIW5vZGUuc3RhdGUuaXRlbXMuc29tZSgoaSkgPT4gaS5pc1NlbGVjdGVkKSAmJiBub2RlLnN0YXRlLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChub2RlLnN0YXRlLmRlZmF1bHRJdGVtICYmIG5vZGUuc3RhdGUuaXRlbXNbbm9kZS5zdGF0ZS5kZWZhdWx0SXRlbV0pIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0YXRlLml0ZW1zW25vZGUuc3RhdGUuZGVmYXVsdEl0ZW1dLmlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5pdGVtc1swXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgcmVuZGVySXRlbShub2RlLCBpKSB7XG4gICAgICAgIGNvbnN0IHJlYWN0b3IgPSAoY2FsbGJhY2spID0+ICh0aXRsZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS51cGRhdGVNb2RlbChub2RlLnN0YXRlLml0ZW1zLCB0aXRsZSk7XG4gICAgICAgICAgICB0aXRsZSA9IG5vZGUuc3RhdGUuaXRlbUNsaWNrZWQodGl0bGUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRpdGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgaWxsZWdhbCByZW5kZXIgaW5kZXggJHtpfSAke25vZGUuc3RhdGUuaXRlbXMubWFwKChpKSA9PiBpLnRpdGxlKS5qb2luKCd8Jyl9YCk7XG4gICAgICAgICAgICBpID0gMDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtID0gbm9kZS5zdGF0ZS5pdGVtc1tpXTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBpdGVtLnRpdGxlIHx8ICcnO1xuICAgICAgICBjb25zdCBpdGVtQ3NzID0gaXRlbS5jc3MgfHwgJyc7XG4gICAgICAgIHJldHVybiByZW5kZXJTZWxlY3RhYmxlKHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGNzczogaXRlbUNzcyxcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IG5vZGUuc3RhdGUuaXRlbXNbdGl0bGVdID8gbm9kZS5zdGF0ZS5pdGVtc1t0aXRsZV0uaXNTZWxlY3RlZCA6IGZhbHNlLFxuICAgICAgICAgICAgbW91c2VEb3duOiBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZURvd24sXG4gICAgICAgICAgICBtb3VzZVVwOiBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZVVwLFxuICAgICAgICAgICAgY2xpY2tlZDogcmVhY3Rvcihub2RlLnN0YXRlLmV2ZW50cy5jbGlja2VkKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLlNlbGVjdG9yID0gU2VsZWN0b3I7XG47XG5mdW5jdGlvbiByZW5kZXJTZWxlY3RhYmxlKGQpIHtcbiAgICBjb25zdCBvbmNsaWNrID0gZC5jbGlja2VkID8gKCkgPT4geyBkLmNsaWNrZWQoZC50aXRsZSk7IH0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgb25tb3VzZWRvd24gPSBkLm1vdXNlRG93biA/ICgpID0+IHsgZC5tb3VzZURvd24oZC50aXRsZSk7IH0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgb25tb3VzZXVwID0gZC5tb3VzZVVwID8gKCkgPT4geyBkLm1vdXNlVXAoZC50aXRsZSk7IH0gOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGhzbGF5b3V0XzEubShgLmhzLXNlbGVjdGFibGUgJHtkLmNzcyB8fCAnJ30gJHtkLmlzU2VsZWN0ZWQgPyAnaHMtc2VsZWN0ZWQnIDogJyd9YCwgeyBzdHlsZTogZC5zdHlsZSwgb25jbGljazogb25jbGljaywgb25tb3VzZWRvd246IG9ubW91c2Vkb3duLCBvbm1vdXNldXA6IG9ubW91c2V1cCB9LCBkLnRpdGxlKTtcbn1cbmV4cG9ydHMucmVuZGVyU2VsZWN0YWJsZSA9IHJlbmRlclNlbGVjdGFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lVMlZzWldOMGIzSXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12VTJWc1pXTjBiM0l1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRnhRa0VzZFVOQlFXOURPMEZCSzBOd1F5eFRRVUZuUWl4VlFVRlZMRU5CUVVNc1MwRkJjMElzUlVGQlJTeExRVUZaTzBsQlF6TkVMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eEpRVUZ0UWl4RlFVRkZMRVZCUVVVN1VVRkRiRU1zU1VGQlNTeERRVUZETEZWQlFWVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFdEJRVWNzUzBGQlN5eERRVUZETEVOQlFVTTdTVUZETTBNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFbEJRVzFDTEVWQlFVVXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zUlVGQlJUdFJRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhWUVVGVkxFZEJRVWNzU1VGQlNTeERRVUZETzB0QlFVVTdTVUZETVVZc1QwRkJUeXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNTVUZCYlVJc1JVRkJSU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJRM0pGTEVOQlFVTTdRVUZPUkN4blEwRk5RenRCUVUxRUxGTkJRV2RDTEZGQlFWRXNRMEZCUXl4TFFVRnpRaXhGUVVGRkxFdEJRVms3U1VGRGVrUXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExGVkJRVlVzUjBGQlJ5eERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhWUVVGVkxFTkJRVU03U1VGRGJrUXNUMEZCVHl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03UVVGRGVFSXNRMEZCUXp0QlFVaEVMRFJDUVVkRE8wRkJjVUpFTEUxQlFYTkNMRkZCUVZFN1NVRkxNVUlzVFVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRlZPMUZCUTNwQ0xFMUJRVTBzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzU1VGQlNTeEZRVUZGTEVOQlFVTTdVVUZETVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVkQlFWVXNSVUZCUlN4RFFVRlJMRVZCUVVVc1JVRkJSVHRaUVVNdlFpeE5RVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1R0blFrRkRiRU1zUzBGQlN5eEZRVUZGTEVkQlFVYzdaMEpCUTFZc1ZVRkJWU3hGUVVGRkxFdEJRVXM3WVVGRGNFSXNRMEZCUXp0WlFVTkdMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJRenRaUVVNelFpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTTdVVUZEYWtNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETzBsQlYwUXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGWExFVkJRVVVzUzBGQlN5eEhRVUZETEZWQlFWVTdVVUZEY2tNc1NVRkJTU3hEUVVGRExFdEJRVXNzUjBGQmEwSTdXVUZEZUVJc1YwRkJWeXhGUVVGRkxFdEJRVXM3V1VGRGJFSXNTMEZCU3l4RlFVRnZRaXhGUVVGRk8xbEJRek5DTEUxQlFVMHNSVUZCUlN4RlFVRkZPMWxCUTFZc1YwRkJWeXhGUVVGRkxFTkJRVU1zU1VGQlZ5eEZRVUZGTEVWQlFVVXNRMEZCUXl4SlFVRkpPMWxCUTJ4RExGZEJRVmNzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWE8xTkJRek5ETEVOQlFVTTdVVUZEUml4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eFRRVUZUTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETzFGQlEzaEVMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEU5QlFVOHNSMEZCU3l4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTTdVVUZEZEVRc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRlBMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNTVUZCU1N4RFFVRkRMRU5CUVVNc1NVRkJWeXhGUVVGRkxFVkJRVVVzUTBGQlF5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMR2RFUVVGblJDeEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRhRW9zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1QwRkJUeXhIUVVGTExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJRenRSUVVOMFJDeFJRVUZSTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJReTlDTEVOQlFVTTdTVUZGUkN4TlFVRk5MRU5CUVVNc1NVRkJWenRSUVVOa0xGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRlRUlzUTBGQlF6dEpRVU5FTEZGQlFWRXNRMEZCUXl4SlFVRlhPMUZCUTJoQ0xGRkJRVkVzUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRMMElzUTBGQlF6dEpRVTlUTEUxQlFVMHNRMEZCUXl4alFVRmpMRU5CUVVNc1NVRkJWenRSUVVOMlF5eEpRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCWjBJc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEZWQlFWVXNRMEZCUXl4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUXl4RFFVRkRMRVZCUVVVN1dVRkRlRVlzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRmRCUVZjc1NVRkJTU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRVmNzUTBGQlF5eEZRVUZGTzJkQ1FVTndSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETEZWQlFWVXNSMEZCUnl4SlFVRkpMRU5CUVVNN1lVRkRPVVE3YVVKQlFVMDdaMEpCUTBnc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF6dGhRVU42UXp0VFFVTktPMGxCUTB3c1EwRkJRenRKUVZGVExFMUJRVTBzUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCVnl4RlFVRkZMRU5CUVZFN1VVRkROME1zVFVGQlRTeFBRVUZQTEVkQlFVY3NRMEZCUXl4UlFVRXlRaXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETEV0QlFWa3NSVUZCUlN4RlFVRkZPMWxCUXpsRUxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWMEZCVnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMWxCUTJoRUxFdEJRVXNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRmRCUVZjc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFpRVU4wUXl4SlFVRkpMRTlCUVU4c1VVRkJVU3hMUVVGTExGVkJRVlVzUlVGQlJUdG5Ra0ZEYUVNc1VVRkJVU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzJGQlEyNUNPMUZCUTB3c1EwRkJReXhEUVVGRE8xRkJRMFlzU1VGQlNTeERRVUZETEVkQlFVTXNRMEZCUXl4RlFVRkZPMWxCUVVVc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eDNRa0ZCZDBJc1EwRkJReXhKUVVGSkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVXNzUlVGQlF5eEZRVUZGTEVOQlFVRXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNN1dVRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFOQlFVVTdVVUZEYWtnc1RVRkJUU3hKUVVGSkxFZEJRV3RDTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEyaEVMRTFCUVUwc1MwRkJTeXhIUVVGVkxFbEJRVWtzUTBGQlF5eExRVUZMTEVsQlFVa3NSVUZCUlN4RFFVRkRPMUZCUTNSRExFMUJRVTBzVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXl4SFFVRkhMRWxCUVVrc1JVRkJSU3hEUVVGRE8xRkJSeTlDTEU5QlFVOHNaMEpCUVdkQ0xFTkJRVU03V1VGRGNFSXNTMEZCU3l4RlFVRkZMRXRCUVVzN1dVRkRXaXhIUVVGSExFVkJRVVVzVDBGQlR6dFpRVVZhTEZWQlFWVXNSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1ZVRkJWU3hEUVVGRExFTkJRVU1zUTBGQlF5eExRVUZMTzFsQlF5OUZMRk5CUVZNc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4VFFVRlRPMWxCUTNSRExFOUJRVThzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUE8xbEJRMnhETEU5QlFVOHNSVUZCUlN4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRPMU5CUXpsRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdRMEZGU2p0QlFUbEdSQ3cwUWtFNFJrTTdRVUZCUVN4RFFVRkRPMEZCVVVZc1UwRkJaMElzWjBKQlFXZENMRU5CUVVNc1EwRkJaMEk3U1VGRE4wTXNUVUZCVFN4UFFVRlBMRWRCUVZNc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlFTeERRVUZETEVOQlFVY3NSMEZCUnl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVWNzUTBGQlF5eERRVUZETEZOQlFWTXNRMEZCUXp0SlFVTXZSU3hOUVVGTkxGZEJRVmNzUjBGQlN5eERRVUZETEVOQlFVTXNVMEZCVXl4RFFVRkJMRU5CUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eERRVUZETEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1UwRkJVeXhEUVVGRE8wbEJReTlGTEUxQlFVMHNVMEZCVXl4SFFVRlBMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVUVzUTBGQlF5eERRVUZITEVkQlFVY3NSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGSExFTkJRVU1zUTBGQlF5eFRRVUZUTEVOQlFVTTdTVUZETDBVc1QwRkJUeXhaUVVGRExFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1EwRkJReXhIUVVGSExFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXl4VlFVRlZMRU5CUVVFc1EwRkJReXhEUVVGQkxHRkJRV0VzUTBGQlFTeERRVUZETEVOQlFVTXNSVUZCUlN4RlFVRkZMRVZCUTNSRkxFVkJRVVVzUzBGQlN5eEZRVUZGTEVOQlFVTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1QwRkJUeXhGUVVGRExFOUJRVThzUlVGQlJTeFhRVUZYTEVWQlFVTXNWMEZCVnl4RlFVRkZMRk5CUVZNc1JVRkJReXhUUVVGVExFVkJRVVVzUlVGRGFrWXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkRWaXhEUVVGRE8wRkJRMDRzUTBGQlF6dEJRVkpFTERSRFFWRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY2xhc3MgU2xpZGVyIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBub2RlLnN0YXRlID0ge1xuICAgICAgICAgICAgcmFuZ2U6IFtdLFxuICAgICAgICAgICAgdmFsdWU6IDAuNSxcbiAgICAgICAgICAgIG1vdXNlOiAtMSxcbiAgICAgICAgICAgIHNsaWRlcjogMCxcbiAgICAgICAgICAgIG5vdGlmaWVkOiAnJyxcbiAgICAgICAgICAgIG9uY2hhbmdlOiAoKSA9PiB7IH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGlkID0gbm9kZS5hdHRycy5pZDtcbiAgICAgICAgY29uc3QgY3NzID0gbm9kZS5hdHRycy5jc3MgfHwgJyc7XG4gICAgICAgIG5vZGUuc3RhdGUucmFuZ2UgPSBub2RlLmF0dHJzLnJhbmdlIHx8IFtdO1xuICAgICAgICBub2RlLnN0YXRlLm9uY2hhbmdlID0gbm9kZS5hdHRycy5vbmNoYW5nZTtcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShgLmhzLXNsaWRlciAke2Nzc31gLCB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBvbm1vdXNlZG93bjogKGUpID0+IG1vdXNlZG93bihlLCBub2RlKSxcbiAgICAgICAgICAgIG9ubW91c2Vtb3ZlOiAoZSkgPT4gbW91c2Vtb3ZlKGUsIG5vZGUpLFxuICAgICAgICAgICAgb25tb3VzZXVwOiAoZSkgPT4gbW91c2V1cChlLCBub2RlKSxcbiAgICAgICAgICAgIG9ubW91c2VvdXQ6IChlKSA9PiBtb3VzZW91dChlLCBub2RlKVxuICAgICAgICB9LCBbcmVuZGVyU2xpZGVyKG5vZGUpXSk7XG4gICAgfVxufVxuZXhwb3J0cy5TbGlkZXIgPSBTbGlkZXI7XG5mdW5jdGlvbiByZW5kZXJTbGlkZXIobm9kZSkge1xuICAgIHJldHVybiBoc2xheW91dF8xLm0oJy5ocy1zbGlkZXItc2xvdCcsIFtcbiAgICAgICAgaHNsYXlvdXRfMS5tKCcuaHMtc2xpZGVyLW1hcmtlcnMnLCBub2RlLnN0YXRlLnJhbmdlLm1hcChyZW5kZXJNYXJrZXIpKSxcbiAgICAgICAgaHNsYXlvdXRfMS5tKCcuaHMtc2xpZGVyLWhhbmRsZScsIHsgc3R5bGU6IGBsZWZ0OiR7MTAwICogbm9kZS5zdGF0ZS52YWx1ZX0lYCB9KVxuICAgIF0pO1xufVxuZnVuY3Rpb24gcmVuZGVyTWFya2VyKHZhbHVlLCBpLCBtYXJrZXJzKSB7XG4gICAgY29uc3Qgc2hhcmUgPSBpIC8gKG1hcmtlcnMubGVuZ3RoIC0gMSk7XG4gICAgY29uc3QgbGVmdCA9IG1hcmtlcnMubGVuZ3RoIDwgMiA/IDAgOiAxMDAgKiBzaGFyZTtcbiAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCcuaHMtc2xpZGVyLW1hcmtlcicsIHsgc3R5bGU6IGBsZWZ0OiAke2xlZnR9JWAgfSwgcmVuZGVyTGFiZWwodmFsdWUpKTtcbn1cbmZ1bmN0aW9uIHJlbmRlckxhYmVsKHZhbHVlKSB7XG4gICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1sYWJlbCcsIHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGdldFRhcmdldE9mZnNldChlKSB7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGxldCBsZWZ0T2Zmc2V0ID0gMDtcbiAgICB3aGlsZSAodGFyZ2V0LmNsYXNzTmFtZS50cmltKCkgIT09IGUuY3VycmVudFRhcmdldC5jbGFzc05hbWUudHJpbSgpKSB7XG4gICAgICAgIGxlZnRPZmZzZXQgKz0gdGFyZ2V0Lm9mZnNldExlZnQ7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gbGVmdE9mZnNldCAtIHRhcmdldC5sYXN0Q2hpbGQub2Zmc2V0TGVmdDtcbn1cbmZ1bmN0aW9uIGdldFZhbHVlKGUsIG5vZGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBzbG90V2lkdGggPSBlLmN1cnJlbnRUYXJnZXQubGFzdENoaWxkLmNsaWVudFdpZHRoO1xuICAgIG5vZGUuc3RhdGUudmFsdWUgPSAoZS5jbGllbnRYIC0gbm9kZS5zdGF0ZS5tb3VzZSkgLyBzbG90V2lkdGggKyBub2RlLnN0YXRlLnNsaWRlcjtcbiAgICByZXR1cm4gbm90aWZ5KG5vZGUpO1xufVxuZnVuY3Rpb24gbW91c2Vkb3duKGUsIG5vZGUpIHtcbiAgICBjb25zdCBvZmZzZXQgPSBnZXRUYXJnZXRPZmZzZXQoZSk7XG4gICAgbm9kZS5zdGF0ZS5tb3VzZSA9IGUuY2xpZW50WDtcbiAgICBpZiAoWydocy1zbGlkZXInLCAnaHMtc2xpZGVyLXNsb3QnXS5pbmRleE9mKGUudGFyZ2V0LmNsYXNzTmFtZS50cmltKCkpID49IDApIHtcbiAgICAgICAgY29uc3Qgc2xvdFdpZHRoID0gZS5jdXJyZW50VGFyZ2V0Lmxhc3RDaGlsZC5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaGFuZGxlV2lkdGggPSBlLmN1cnJlbnRUYXJnZXQubGFzdENoaWxkLmxhc3RDaGlsZC5jbGllbnRXaWR0aDtcbiAgICAgICAgbm9kZS5zdGF0ZS5tb3VzZSAtPSBoYW5kbGVXaWR0aCAvIDI7XG4gICAgICAgIG5vZGUuc3RhdGUudmFsdWUgPSAoZS5vZmZzZXRYIC0gaGFuZGxlV2lkdGggLyAyICsgb2Zmc2V0KSAvIHNsb3RXaWR0aDtcbiAgICB9XG4gICAgbm9kZS5zdGF0ZS5zbGlkZXIgPSBub2RlLnN0YXRlLnZhbHVlO1xuICAgIGdldFZhbHVlKGUsIG5vZGUpO1xufVxuZnVuY3Rpb24gbW91c2Vtb3ZlKGUsIG5vZGUpIHtcbiAgICBpZiAobm9kZS5zdGF0ZS5tb3VzZSA+IDApIHtcbiAgICAgICAgZ2V0VmFsdWUoZSwgbm9kZSk7XG4gICAgICAgIGlmIChub2RlLnN0YXRlLnZhbHVlID4gMSB8fCBub2RlLnN0YXRlLnZhbHVlIDwgMCkge1xuICAgICAgICAgICAgbW91c2V1cChlLCBub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIG1vdXNldXAoZSwgbm9kZSkge1xuICAgIGlmIChub2RlLnN0YXRlLm1vdXNlID4gMCkge1xuICAgICAgICBub2RlLnN0YXRlLnZhbHVlID0gZ2V0VmFsdWUoZSwgbm9kZSk7XG4gICAgICAgIG5vZGUuc3RhdGUubW91c2UgPSAtMTtcbiAgICB9XG59XG5mdW5jdGlvbiBtb3VzZW91dChlLCBub2RlKSB7XG4gICAgaWYgKG5vZGUuc3RhdGUubW91c2UgPiAwICYmIGUudGFyZ2V0LmNsYXNzTmFtZS50cmltKCkgPT09ICdocy1zbGlkZXInKSB7XG4gICAgICAgIG1vdXNldXAoZSwgbm9kZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gbm90aWZ5KG5vZGUpIHtcbiAgICBpZiAoKG5vZGUuc3RhdGUucmFuZ2UubGVuZ3RoID4gMSkgJiYgKHR5cGVvZiBub2RlLnN0YXRlLnJhbmdlWzBdID09PSAnc3RyaW5nJykpIHtcbiAgICAgICAgY29uc3QgdiA9IE1hdGguZmxvb3Iobm9kZS5zdGF0ZS52YWx1ZSAqIChub2RlLnN0YXRlLnJhbmdlLmxlbmd0aCAtIDEpICsgMC41KTtcbiAgICAgICAgaWYgKG5vZGUuc3RhdGUubm90aWZpZWQgIT09IG5vZGUuc3RhdGUucmFuZ2Vbdl0pIHtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUub25jaGFuZ2Uobm9kZS5zdGF0ZS5yYW5nZVt2XSk7XG4gICAgICAgICAgICBub2RlLnN0YXRlLm5vdGlmaWVkID0gbm9kZS5zdGF0ZS5yYW5nZVt2XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdiAvIChub2RlLnN0YXRlLnJhbmdlLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgbnVtUmFuZ2UgPSBub2RlLnN0YXRlLnJhbmdlO1xuICAgICAgICBjb25zdCB2ID0gTWF0aC5mbG9vcigobnVtUmFuZ2VbMF0gKiAoMSAtIG5vZGUuc3RhdGUudmFsdWUpICsgbnVtUmFuZ2VbMV0gKiBub2RlLnN0YXRlLnZhbHVlKSAqIDEwMCkgLyAxMDA7XG4gICAgICAgIG5vZGUuc3RhdGUub25jaGFuZ2UoTWF0aC5taW4obm9kZS5zdGF0ZS5yYW5nZVsxXSwgTWF0aC5tYXgobm9kZS5zdGF0ZS5yYW5nZVswXSwgdikpKTtcbiAgICAgICAgcmV0dXJuIG5vZGUuc3RhdGUudmFsdWU7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVTJ4cFpHVnlMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDFOc2FXUmxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFUQkRRU3gxUTBGQmIwTTdRVUZ2UW5CRExFMUJRV0VzVFVGQlRUdEpRVU5tTEUxQlFVMHNRMEZCUXl4SlFVRlZPMUZCUTJJc1NVRkJTU3hEUVVGRExFdEJRVXNzUjBGQlJ6dFpRVU5VTEV0QlFVc3NSVUZCWlN4RlFVRkZPMWxCUTNSQ0xFdEJRVXNzUlVGQlJTeEhRVUZITzFsQlExWXNTMEZCU3l4RlFVRkZMRU5CUVVNc1EwRkJRenRaUVVOVUxFMUJRVTBzUlVGQlF5eERRVUZETzFsQlExSXNVVUZCVVN4RlFVRkRMRVZCUVVVN1dVRkRXQ3hSUVVGUkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVVXNRMEZCUXp0VFFVTnlRaXhEUVVGRE8wbEJRMDRzUTBGQlF6dEpRVU5FTEVsQlFVa3NRMEZCUXl4SlFVRlhPMUZCUTFvc1RVRkJUU3hGUVVGRkxFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RlFVRkZMRU5CUVVNN1VVRkRla0lzVFVGQlRTeEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFbEJRVWtzUlVGQlJTeERRVUZETzFGQlEycERMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVU14UXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJRenRSUVVNeFF5eFBRVUZQTEZsQlFVTXNRMEZCUXl4alFVRmpMRWRCUVVjc1JVRkJSU3hGUVVGRk8xbEJRekZDTEVWQlFVVXNSVUZCUXl4RlFVRkZPMWxCUTB3c1YwRkJWeXhGUVVGRExFTkJRVU1zUTBGQlN5eEZRVUZGTEVWQlFVVXNRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF6dFpRVU42UXl4WFFVRlhMRVZCUVVNc1EwRkJReXhEUVVGTExFVkJRVVVzUlVGQlJTeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1NVRkJTU3hEUVVGRE8xbEJRM3BETEZOQlFWTXNSVUZCUXl4RFFVRkRMRU5CUVVzc1JVRkJTU3hGUVVGRkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNSVUZCUlN4SlFVRkpMRU5CUVVNN1dVRkRka01zVlVGQlZTeEZRVUZETEVOQlFVTXNRMEZCU3l4RlFVRkhMRVZCUVVVc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXp0VFFVTXpReXhGUVVORUxFTkJRVU1zV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVNeFFpeERRVUZETzBOQlIwbzdRVUV6UWtRc2QwSkJNa0pETzBGQlJVUXNVMEZCVXl4WlFVRlpMRU5CUVVNc1NVRkJWVHRKUVVNMVFpeFBRVUZQTEZsQlFVTXNRMEZCUXl4cFFrRkJhVUlzUlVGQlJUdFJRVU40UWl4WlFVRkRMRU5CUVVNc2IwSkJRVzlDTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEZsQlFWa3NRMEZCUXl4RFFVRkRPMUZCUXpORUxGbEJRVU1zUTBGQlF5eHRRa0ZCYlVJc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeFJRVUZSTEVkQlFVY3NSMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eEZRVUZGTEVOQlFVTTdTMEZEY2tVc1EwRkJReXhEUVVGRE8wRkJRMUFzUTBGQlF6dEJRVVZFTEZOQlFWTXNXVUZCV1N4RFFVRkRMRXRCUVc5Q0xFVkJRVVVzUTBGQlVTeEZRVUZGTEU5QlFXMUNPMGxCUTNKRkxFMUJRVTBzUzBGQlN5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhOUVVGTkxFZEJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEY2tNc1RVRkJUU3hKUVVGSkxFZEJRVWNzVDBGQlR5eERRVUZETEUxQlFVMHNSMEZCUXl4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4SFFVRkRMRXRCUVVzc1EwRkJRenRKUVVNM1F5eFBRVUZQTEZsQlFVTXNRMEZCUXl4dFFrRkJiVUlzUlVGQlJTeEZRVUZETEV0QlFVc3NSVUZCUlN4VFFVRlRMRWxCUVVrc1IwRkJSeXhGUVVGRExFVkJRVVVzVjBGQlZ5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRha1lzUTBGQlF6dEJRVVZFTEZOQlFWTXNWMEZCVnl4RFFVRkRMRXRCUVc5Q08wbEJRM0pETEU5QlFVOHNXVUZCUXl4RFFVRkRMR3RDUVVGclFpeEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRPMEZCUTNoRExFTkJRVU03UVVGSlJDeFRRVUZUTEdWQlFXVXNRMEZCUXl4RFFVRkxPMGxCUXpGQ0xFbEJRVWtzVFVGQlRTeEhRVUZQTEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNN1NVRkRNVUlzU1VGQlNTeFZRVUZWTEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUTI1Q0xFOUJRVThzVFVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU1zWVVGQllTeERRVUZETEZOQlFWTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1JVRkJSVHRSUVVOcVJTeFZRVUZWTEVsQlFVa3NUVUZCVFN4RFFVRkRMRlZCUVZVc1EwRkJRenRSUVVOb1F5eE5RVUZOTEVkQlFVY3NUVUZCVFN4RFFVRkRMRlZCUVZVc1EwRkJRenRMUVVNNVFqdEpRVU5FTEU5QlFVOHNWVUZCVlN4SFFVRkhMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zVlVGQlZTeERRVUZETzBGQlEzQkVMRU5CUVVNN1FVRkZSQ3hUUVVGVExGRkJRVkVzUTBGQlF5eERRVUZMTEVWQlFVVXNTVUZCVlR0SlFVTXZRaXhEUVVGRExFTkJRVU1zWlVGQlpTeEZRVUZGTEVOQlFVTTdTVUZEY0VJc1EwRkJReXhEUVVGRExHTkJRV01zUlVGQlJTeERRVUZETzBsQlEyNUNMRTFCUVUwc1UwRkJVeXhIUVVGSExFTkJRVU1zUTBGQlF5eGhRVUZoTEVOQlFVTXNVMEZCVXl4RFFVRkRMRmRCUVZjc1EwRkJRenRKUVVONFJDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZQTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eFRRVUZUTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU03U1VGRGJFWXNUMEZCVHl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRGVFSXNRMEZCUXp0QlFVVkVMRk5CUVZNc1UwRkJVeXhEUVVGRExFTkJRVXNzUlVGQlJTeEpRVUZWTzBsQlEyaERMRTFCUVUwc1RVRkJUU3hIUVVGSExHVkJRV1VzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTnNReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRU5CUVVNc1QwRkJUeXhEUVVGRE8wbEJRemRDTEVsQlFVa3NRMEZCUXl4WFFVRlhMRVZCUVVVc1owSkJRV2RDTEVOQlFVTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJReXhEUVVGRExFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1NVRkJSU3hEUVVGRExFVkJRVVU3VVVGRGRrVXNUVUZCVFN4VFFVRlRMRWRCUVVjc1EwRkJReXhEUVVGRExHRkJRV0VzUTBGQlF5eFRRVUZUTEVOQlFVTXNWMEZCVnl4RFFVRkRPMUZCUTNoRUxFMUJRVTBzVjBGQlZ5eEhRVUZITEVOQlFVTXNRMEZCUXl4aFFVRmhMRU5CUVVNc1UwRkJVeXhEUVVGRExGTkJRVk1zUTBGQlF5eFhRVUZYTEVOQlFVTTdVVUZEY0VVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVsQlFVa3NWMEZCVnl4SFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOc1F5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZQTEVkQlFVY3NWMEZCVnl4SFFVRkRMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU1zUjBGQlJ5eFRRVUZUTEVOQlFVTTdTMEZEZGtVN1NVRkRSQ3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF6dEpRVU55UXl4UlFVRlJMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzBGQlEzUkNMRU5CUVVNN1FVRkZSQ3hUUVVGVExGTkJRVk1zUTBGQlF5eERRVUZMTEVWQlFVVXNTVUZCVlR0SlFVTm9ReXhKUVVGSkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRkRMRU5CUVVNc1JVRkJSVHRSUVVOd1FpeFJRVUZSTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRMnhDTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFZEJRVWNzUTBGQlF5eEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGSExFTkJRVU1zUlVGQlJUdFpRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03VTBGQlJUdExRVU14UlR0QlFVTk1MRU5CUVVNN1FVRkZSQ3hUUVVGVExFOUJRVThzUTBGQlF5eERRVUZMTEVWQlFVVXNTVUZCVlR0SlFVTTVRaXhKUVVGSkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRkRMRU5CUVVNc1JVRkJSVHRSUVVOd1FpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1IwRkJSeXhSUVVGUkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNKRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRE8wdEJRM3BDTzBGQlEwd3NRMEZCUXp0QlFVVkVMRk5CUVZNc1VVRkJVU3hEUVVGRExFTkJRVXNzUlVGQlJTeEpRVUZWTzBsQlF5OUNMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVkQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zVTBGQlV5eERRVUZETEVsQlFVa3NSVUZCUlN4TFFVRkxMRmRCUVZjc1JVRkJSVHRSUVVOcVJTeFBRVUZQTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8wdEJRM0JDTzBGQlEwd3NRMEZCUXp0QlFVVkVMRk5CUVZNc1RVRkJUU3hEUVVGRExFbEJRVlU3U1VGRGRFSXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFdEJRVWtzVVVGQlVTeERRVUZETEVWQlFVVTdVVUZETTBVc1RVRkJUU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUjBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVNelJTeEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hMUVVGTExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRk8xbEJRemRETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGVrTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFZEJRVmNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VTBGRGNrUTdVVUZGUkN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dExRVU14UXp0VFFVRk5PMUZCUTBnc1RVRkJUU3hSUVVGUkxFZEJRWEZDTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRE8xRkJRM0JFTEUxQlFVMHNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVNc1EwRkJReXhEUVVGRExFZEJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhSUVVGUkxFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUXl4SFFVRkhMRU5CUVVNN1VVRkRhRWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlV5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRlRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU55Unl4UFFVRlBMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETzB0QlF6TkNPMEZCUTB3c1EwRkJReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgU2VsZWN0b3JfMSA9IHJlcXVpcmUoXCIuL1NlbGVjdG9yXCIpO1xuY2xhc3MgVG9nZ2xlQnV0dG9uIGV4dGVuZHMgU2VsZWN0b3JfMS5TZWxlY3RvciB7XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgc3VwZXIub25pbml0KG5vZGUpO1xuICAgICAgICBub2RlLnN0YXRlLm1vdXNlRG93bkNTUyA9ICcnO1xuICAgICAgICBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZURvd24gPSAoKSA9PiBub2RlLnN0YXRlLm1vdXNlRG93bkNTUyA9ICcuaHMtYnV0dG9uLXByZXNzZWQnO1xuICAgICAgICBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZVVwID0gKCkgPT4gbm9kZS5zdGF0ZS5tb3VzZURvd25DU1MgPSAnJztcbiAgICAgICAgbm9kZS5zdGF0ZS5pdGVtQ2xpY2tlZCA9ICh0aXRsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaSA9IG5vZGUuc3RhdGUuaXRlbXMubWFwKChpKSA9PiBpLnRpdGxlKS5pbmRleE9mKHRpdGxlKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1RpdGxlID0gbm9kZS5zdGF0ZS5pdGVtc1soaSArIDEpICUgbm9kZS5zdGF0ZS5pdGVtcy5sZW5ndGhdLnRpdGxlO1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5pdGVtc1t0aXRsZV0uaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5pdGVtc1tuZXdUaXRsZV0uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbmV3VGl0bGU7XG4gICAgICAgIH07XG4gICAgICAgIFNlbGVjdG9yXzEuU2VsZWN0b3IuZW5zdXJlU2VsZWN0ZWQobm9kZSk7XG4gICAgfVxuICAgIG9udXBkYXRlKG5vZGUpIHtcbiAgICAgICAgc3VwZXIub251cGRhdGUobm9kZSk7XG4gICAgICAgIFNlbGVjdG9yXzEuU2VsZWN0b3IuZW5zdXJlU2VsZWN0ZWQobm9kZSk7XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBjc3MgPSBub2RlLmF0dHJzLmNzcyB8fCAnJztcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBub2RlLmF0dHJzLnN0eWxlIHx8ICcnO1xuICAgICAgICBjb25zdCBpID0gbm9kZS5zdGF0ZS5pdGVtcy5maW5kSW5kZXgoKGkpID0+IGkuaXNTZWxlY3RlZCk7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oYC5ocy10b2dnbGUtYnV0dG9uICR7Y3NzfSAke25vZGUuc3RhdGUubW91c2VEb3duQ1NTfWAsIHsgc3R5bGU6IHN0eWxlIH0sIGhzbGF5b3V0XzEubSgnc3BhbicsIFNlbGVjdG9yXzEuU2VsZWN0b3IucmVuZGVySXRlbShub2RlLCBpKSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuVG9nZ2xlQnV0dG9uID0gVG9nZ2xlQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVkc5bloyeGxRblYwZEc5dUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMMVJ2WjJkc1pVSjFkSFJ2Ymk1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRV2xEUVN4MVEwRkJiMFE3UVVGRGNFUXNlVU5CUVhORU8wRkJiVUowUkN4TlFVRmhMRmxCUVdFc1UwRkJVU3h0UWtGQlVUdEpRVU4wUXl4TlFVRk5MRU5CUVVNc1NVRkJWVHRSUVVOaUxFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRia0lzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WlFVRlpMRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJRemRDTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExGTkJRVk1zUjBGQlJ5eEhRVUZITEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGbEJRVmtzUjBGQlJ5eHZRa0ZCYjBJc1EwRkJRenRSUVVOdVJpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFZEJRVXNzUjBGQlJ5eEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhaUVVGWkxFZEJRVWNzUlVGQlJTeERRVUZETzFGQlJXcEZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVjBGQlZ5eEhRVUZGTEVOQlFVTXNTMEZCV1N4RlFVRlBMRVZCUVVVN1dVRkRNVU1zVFVGQlRTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCWjBJc1JVRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFpRVU0xUlN4TlFVRk5MRkZCUVZFc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTTdXVUZEZWtVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1ZVRkJWU3hIUVVGSExFdEJRVXNzUTBGQlF6dFpRVU16UXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4VlFVRlZMRWRCUVVjc1NVRkJTU3hEUVVGRE8xbEJRemRETEU5QlFVOHNVVUZCVVN4RFFVRkRPMUZCUTNCQ0xFTkJRVU1zUTBGQlF6dFJRVU5HTEcxQ1FVRlJMRU5CUVVNc1kwRkJZeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzBsQlEyeERMRU5CUVVNN1NVRkRSQ3hSUVVGUkxFTkJRVU1zU1VGQlZ6dFJRVU5vUWl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEzSkNMRzFDUVVGUkxFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTJ4RExFTkJRVU03U1VGRFJDeEpRVUZKTEVOQlFVTXNTVUZCVnp0UlFVTmFMRTFCUVUwc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVOcVF5eE5RVUZOTEV0QlFVc3NSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzU1VGQlNTeEZRVUZGTEVOQlFVTTdVVUZEY2tNc1RVRkJUU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU1zUTBGQlowSXNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETzFGQlJYcEZMRTlCUVU4c1dVRkJReXhEUVVGRExIRkNRVUZ4UWl4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEVWQlFVVXNSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJReXhMUVVGTExFVkJRVU1zUlVGQlJTeFpRVUZETEVOQlFVTXNUVUZCVFN4RlFVTndSaXh0UWtGQlVTeERRVUZETEZWQlFWVXNRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJReTlDTEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNN1EwRkRTanRCUVRkQ1JDeHZRMEUyUWtNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5leHBvcnRzLkJ1dHRvblN5bWJvbHMgPSB7XG4gICAgY3Jvc3M6IHsgc3ltOiAnJnRpbWVzOycgfSxcbiAgICBtaW51czogeyBzeW06ICcmbWludXM7JyB9LFxuICAgIHBsdXM6IHsgc3ltOiAnKycgfSxcbiAgICBkTGVmdDogeyBzeW06ICcmbGFxdW87JyB9LFxuICAgIGRSaWdodDogeyBzeW06ICcmcmFxdW87JyB9LFxuICAgIGxlZnQ6IHsgc3ltOiAnJmxzYXF1bzsnIH0sXG4gICAgcmlnaHQ6IHsgc3ltOiAnJnJzYXF1bzsnIH0sXG4gICAgbGVmdFRyaTogeyBzeW06ICcmbHRyaWY7JyB9LFxuICAgIHJpZ2h0VHJpOiB7IHN5bTogJyZydHJpZjsnIH0sXG4gICAgdXBUcmk6IHsgc3ltOiAnJnV0cmlmOycgfSxcbiAgICBkb3duVHJpOiB7IHN5bTogJyZkdHJpZjsnIH0sXG4gICAgdXA6IHsgc3ltOiAnJmFuZDsnIH0sXG4gICAgZG93bjogeyBzeW06ICcmb3I7JyB9LFxuICAgIGxBcnJvdzogeyBzeW06ICcmbGFycjsnIH0sXG4gICAgckFycm93OiB7IHN5bTogJyZyYXJyOycgfSxcbiAgICB1QXJyb3c6IHsgc3ltOiAnJnVhcnI7JyB9LFxuICAgIGRBcnJvdzogeyBzeW06ICcmZGFycjsnIH0sXG4gICAgZW1wdHk6IHsgc3ltOiAnJiM5Njc1OycgfSxcbiAgICBlbXB0eVNsYXNoOiB7IHN5bTogJyZlbXB0eTsnIH0sXG4gICAgb1NsYXNoOiB7IHN5bTogJyZvc2xhc2g7JyB9LFxuICAgIG86IHsgc3ltOiAnJm9taWNyb247JyB9LFxuICAgIGxpbmVzMzogeyBzeW06ICcmZXF1aXY7JyB9LFxuICAgIHN1bTogeyBzeW06ICcmU2lnbWE7JyB9LFxuICAgIGVsbGlwc2lzOiB7IHN5bTogJyZoZWxsaXA7JyB9LFxuICAgIHZlcnRFbGxpcHM6IHsgc3ltOiAnJiM4Mjg1OycgfSxcbiAgICBidWxsZXQ6IHsgc3ltOiAnJmJ1bGw7JyB9LFxuICAgIGVudGVyOiB7IHN5bTogJyZjcmFycjsnIH0sXG4gICAgYWdhaW46IHsgc3ltOiAnJiM4NjM1OycgfSxcbiAgICBzdGFydDogeyBzeW06ICcmIzg2ODk7JyB9LFxuICAgIGVuZDogeyBzeW06ICcmIzg2OTA7JyB9XG59O1xuY2xhc3MgVG9vbGJhckJ1dHRvbiB7XG4gICAgc3RhdGljIGdldFN5bWJvbChuYW1lKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLkJ1dHRvblN5bWJvbHNbbmFtZV0gPyBleHBvcnRzLkJ1dHRvblN5bWJvbHNbbmFtZV0uc3ltIDogJyc7XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBpZiAodHlwZW9mIG5vZGUuYXR0cnMuc3ltYm9scyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oJy5ocy1jb3JuZXItYnV0dG9uJywgeyBvbmNsaWNrOiBub2RlLmF0dHJzLm9uY2xpY2sgfSwgaHNsYXlvdXRfMS5tLnRydXN0KG5vZGUuYXR0cnMuc3ltYm9scykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnLmhzLWNvcm5lci1idXR0b24nLCB7IG9uY2xpY2s6IG5vZGUuYXR0cnMub25jbGljayB9LCBub2RlLmF0dHJzLnN5bWJvbHMubWFwKChzeW0pID0+IGhzbGF5b3V0XzEubS50cnVzdChzeW0pKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLlRvb2xiYXJCdXR0b24gPSBUb29sYmFyQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVkc5dmJHSmhja0oxZEhSdmJpNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlVYjI5c1ltRnlRblYwZEc5dUxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCTWtWQkxIVkRRVUZ2UXp0QlFVVjJRaXhSUVVGQkxHRkJRV0VzUjBGQlJ6dEpRVU42UWl4TFFVRkxMRVZCUVU4c1JVRkJSU3hIUVVGSExFVkJRVVVzVTBGQlV5eEZRVUZGTzBsQlF6bENMRXRCUVVzc1JVRkJUeXhGUVVGRkxFZEJRVWNzUlVGQlJTeFRRVUZUTEVWQlFVTTdTVUZETjBJc1NVRkJTU3hGUVVGUkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NSVUZCUXp0SlFVTjJRaXhMUVVGTExFVkJRVThzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkRPMGxCUXpkQ0xFMUJRVTBzUlVGQlRTeEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVNN1NVRkROMElzU1VGQlNTeEZRVUZSTEVWQlFVVXNSMEZCUnl4RlFVRkZMRlZCUVZVc1JVRkJRenRKUVVNNVFpeExRVUZMTEVWQlFVOHNSVUZCUlN4SFFVRkhMRVZCUVVVc1ZVRkJWU3hGUVVGRE8wbEJRemxDTEU5QlFVOHNSVUZCU3l4RlFVRkZMRWRCUVVjc1JVRkJSU3hUUVVGVExFVkJRVU03U1VGRE4wSXNVVUZCVVN4RlFVRkpMRVZCUVVVc1IwRkJSeXhGUVVGRkxGTkJRVk1zUlVGQlF6dEpRVU0zUWl4TFFVRkxMRVZCUVU4c1JVRkJSU3hIUVVGSExFVkJRVVVzVTBGQlV5eEZRVUZETzBsQlF6ZENMRTlCUVU4c1JVRkJTeXhGUVVGRkxFZEJRVWNzUlVGQlJTeFRRVUZUTEVWQlFVTTdTVUZETjBJc1JVRkJSU3hGUVVGVkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEU5QlFVOHNSVUZCUXp0SlFVTXpRaXhKUVVGSkxFVkJRVkVzUlVGQlJTeEhRVUZITEVWQlFVVXNUVUZCVFN4RlFVRkRPMGxCUXpGQ0xFMUJRVTBzUlVGQlRTeEZRVUZGTEVkQlFVY3NSVUZCUlN4UlFVRlJMRVZCUVVNN1NVRkROVUlzVFVGQlRTeEZRVUZOTEVWQlFVVXNSMEZCUnl4RlFVRkZMRkZCUVZFc1JVRkJRenRKUVVNMVFpeE5RVUZOTEVWQlFVMHNSVUZCUlN4SFFVRkhMRVZCUVVVc1VVRkJVU3hGUVVGRE8wbEJRelZDTEUxQlFVMHNSVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSU3hSUVVGUkxFVkJRVU03U1VGRE5VSXNTMEZCU3l4RlFVRlBMRVZCUVVVc1IwRkJSeXhGUVVGRkxGTkJRVk1zUlVGQlF6dEpRVU0zUWl4VlFVRlZMRVZCUVVVc1JVRkJSU3hIUVVGSExFVkJRVVVzVTBGQlV5eEZRVUZETzBsQlF6ZENMRTFCUVUwc1JVRkJUU3hGUVVGRkxFZEJRVWNzUlVGQlJTeFZRVUZWTEVWQlFVTTdTVUZET1VJc1EwRkJReXhGUVVGWExFVkJRVVVzUjBGQlJ5eEZRVUZGTEZkQlFWY3NSVUZCUXp0SlFVTXZRaXhOUVVGTkxFVkJRVTBzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkRPMGxCUXpkQ0xFZEJRVWNzUlVGQlV5eEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVNN1NVRkROMElzVVVGQlVTeEZRVUZKTEVWQlFVVXNSMEZCUnl4RlFVRkZMRlZCUVZVc1JVRkJRenRKUVVNNVFpeFZRVUZWTEVWQlFVVXNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRE8wbEJRemRDTEUxQlFVMHNSVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSU3hSUVVGUkxFVkJRVU03U1VGRE5VSXNTMEZCU3l4RlFVRlBMRVZCUVVVc1IwRkJSeXhGUVVGRkxGTkJRVk1zUlVGQlF6dEpRVU0zUWl4TFFVRkxMRVZCUVU4c1JVRkJSU3hIUVVGSExFVkJRVVVzVTBGQlV5eEZRVUZETzBsQlF6ZENMRXRCUVVzc1JVRkJUeXhGUVVGRkxFZEJRVWNzUlVGQlJTeFRRVUZUTEVWQlFVTTdTVUZETjBJc1IwRkJSeXhGUVVGVExFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUXp0RFFVTm9ReXhEUVVGRE8wRkJSVVlzVFVGQllTeGhRVUZoTzBsQlJYUkNMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zU1VGQlZ6dFJRVU40UWl4UFFVRlBMSEZDUVVGaExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVRXNRMEZCUXl4RFFVRkRMSEZDUVVGaExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU03U1VGRE4wUXNRMEZCUXp0SlFVTkVMRWxCUVVrc1EwRkJReXhKUVVGVk8xRkJRMWdzU1VGQlNTeFBRVUZQTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhMUVVGTExGRkJRVkVzUlVGQlJUdFpRVU40UXl4UFFVRlBMRmxCUVVNc1EwRkJReXh0UWtGQmJVSXNSVUZEZUVJc1JVRkJSU3hQUVVGUExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRVZCUVVVc1JVRkRMMElzV1VGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVU01UWl4RFFVRkRPMU5CUTB3N1lVRkJUVHRaUVVOSUxFOUJRVThzV1VGQlF5eERRVUZETEcxQ1FVRnRRaXhGUVVOd1FpeEZRVUZGTEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUlVGQlJTeEZRVU12UWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRlZMRVZCUVVVc1JVRkJSU3hEUVVGQkxGbEJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkRNVVFzUTBGQlF6dFRRVU5NTzBsQlEwd3NRMEZCUXp0RFFVTktPMEZCYkVKRUxITkRRV3RDUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmZ1bmN0aW9uIGVtcGhhc2l6ZShpdGVtLCBtYXRjaCkge1xuICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChtYXRjaCwgJ2dpJyk7XG4gICAgY29uc3QgZGVjb3JhdGlvbnMgPSBpdGVtXG4gICAgICAgIC5yZXBsYWNlKHJlLCAobSkgPT4gYDxiPiR7bX08L2I+YClcbiAgICAgICAgLnNwbGl0KCc8JylcbiAgICAgICAgLm1hcCgocykgPT4ge1xuICAgICAgICBpZiAocy5zdGFydHNXaXRoKCcvYj4nKSkge1xuICAgICAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnc3BhbicsIHsgbmFtZTogaXRlbSB9LCBzLnNsaWNlKDMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzLnN0YXJ0c1dpdGgoJ2I+JykpIHtcbiAgICAgICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oJ2InLCB7IG5hbWU6IGl0ZW0gfSwgcy5zbGljZSgyKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCdzcGFuJywgeyBuYW1lOiBpdGVtIH0sIHMpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnc3BhbicsIGRlY29yYXRpb25zKTtcbn1cbmNsYXNzIEdldExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QsIG1hcCkge1xuICAgICAgICB0aGlzLmxpc3QgPSBbXTtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaHNsYXlvdXRfMS5tLnJlcXVlc3QoeyBtZXRob2Q6IFwiR0VUXCIsIHVybDogbGlzdCB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB0aGlzLmNhcHR1cmVMaXN0KGRhdGEsIG1hcCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYXB0dXJlTGlzdChsaXN0LCBtYXApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhcHR1cmVMaXN0KGxpc3QsIG1hcCkge1xuICAgICAgICB0aGlzLmxpc3QgPSBtYXAgPyBtYXAobGlzdCkgOiBsaXN0O1xuICAgIH1cbn1cbmNsYXNzIFR5cGVBaGVhZCB7XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgbm9kZS5zdGF0ZS5pbnB1dE5vZGUgPSAnJztcbiAgICAgICAgbm9kZS5zdGF0ZS5oaWRlUG9wZG93biA9IHRydWU7XG4gICAgICAgIG5vZGUuc3RhdGUudmFsdWUgPSAnJztcbiAgICAgICAgbm9kZS5zdGF0ZS50eXBlQWhlYWRMaXN0ID0gW107XG4gICAgICAgIG5vZGUuc3RhdGUub25zdWJtaXQgPSBub2RlLmF0dHJzLm9uc3VibWl0O1xuICAgICAgICBub2RlLnN0YXRlLmxpc3QgPSBub2RlLmF0dHJzLmxpc3Q7XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBnbCA9IG5ldyBHZXRMaXN0KG5vZGUuc3RhdGUubGlzdCk7XG4gICAgICAgIGNvbnN0IG5vc3VibWl0ID0gKCkgPT4gY29uc29sZS5sb2coJ25vIHN1Ym1pdCBmdW5jdGlvbiBkZWZpbmVkJyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdCA9ICh2KSA9PiB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLmlucHV0Tm9kZS5zZXRTZWxlY3Rpb25SYW5nZSgwLCBub2RlLnN0YXRlLmlucHV0Tm9kZS52YWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5oaWRlUG9wZG93biA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5zdGF0ZS5vbnN1Ym1pdCA/IG5vZGUuc3RhdGUub25zdWJtaXQodikgOiBub3N1Ym1pdCgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzZWxlY3QgPSAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0YXRlLmlucHV0Tm9kZS52YWx1ZSA9IGUudGFyZ2V0LmF0dHJpYnV0ZXMubmFtZS52YWx1ZTtcbiAgICAgICAgICAgICAgICBzdWJtaXQoZS50YXJnZXQuYXR0cmlidXRlcy5uYW1lLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgaW5wdXQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbiA9IG5vZGUuc3RhdGUuaW5wdXROb2RlID0gZS50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IG5vZGUuc3RhdGUudmFsdWUgPSBuLnZhbHVlO1xuICAgICAgICAgICAgY29uc3Qgd2l0aGluSW5wdXQgPSBuZXcgUmVnRXhwKGAke2lucHV0fWAsICdnaScpO1xuICAgICAgICAgICAgY29uc3QgYmVnaW5uaW5nT2ZJbnB1dCA9IG5ldyBSZWdFeHAoYF4ke2lucHV0fWAsICdnaScpO1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS50eXBlQWhlYWRMaXN0ID0gZ2wubGlzdC5maWx0ZXIoKGwpID0+IGwubWF0Y2god2l0aGluSW5wdXQpKTtcbiAgICAgICAgICAgIG4udmFsdWUgPSBub2RlLnN0YXRlLnR5cGVBaGVhZExpc3QuZmlsdGVyKChsKSA9PiBsLm1hdGNoKGJlZ2lubmluZ09mSW5wdXQpKVswXSB8fCBpbnB1dDtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuaGlkZVBvcGRvd24gPSBuLnZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgIGxldCBwb3MgPSBpbnB1dC5sZW5ndGg7XG4gICAgICAgICAgICBuLnNldFNlbGVjdGlvblJhbmdlKHBvcywgbi52YWx1ZS5sZW5ndGgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBrZXlQcmVzc2VkID0gKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBub2RlLnN0YXRlLmlucHV0Tm9kZSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgIHN1Ym1pdChuLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGUuY29kZSA9PT0gJ0JhY2tzcGFjZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IG4uZmlyc3RDaGlsZC5kYXRhO1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG4udmFsdWUgPSBpbnB1dC5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGlucHV0Tm9kZSA9IHtcbiAgICAgICAgICAgIGNvbnRlbnRlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBub2RlLmF0dHJzLnBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgYXV0b2ZvY3VzOiBub2RlLmF0dHJzLmF1dG9mb2N1cyB8fCB0cnVlLFxuICAgICAgICAgICAgb25rZXlkb3duOiBrZXlQcmVzc2VkLFxuICAgICAgICAgICAgb25pbnB1dDogaW5wdXRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnLmhzLWZvcm0nLCBbXG4gICAgICAgICAgICBoc2xheW91dF8xLm0oYGlucHV0LmhzLXR5cGVhaGVhZC1pbnB1dCR7bm9kZS5zdGF0ZS52YWx1ZSA/ICcuaHMtdHlwZWFoZWFkLXZhbHVlJyA6ICcuaHMtdHlwZWFoZWFkLXBsYWNlaG9sZGVyJ31gLCBpbnB1dE5vZGUsIGhzbGF5b3V0XzEubS50cnVzdChub2RlLnN0YXRlLnZhbHVlID8gbm9kZS5zdGF0ZS52YWx1ZSA6IG5vZGUuYXR0cnMucGxhY2Vob2xkZXIpKSxcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuaGlkZVBvcGRvd24gPyB1bmRlZmluZWQgOlxuICAgICAgICAgICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLXR5cGVhaGVhZC1saXN0Jywgbm9kZS5zdGF0ZS50eXBlQWhlYWRMaXN0Lm1hcCgobCkgPT4gaHNsYXlvdXRfMS5tKCcnLCB7IG9uY2xpY2s6IHNlbGVjdCB9LCBlbXBoYXNpemUobCwgbm9kZS5zdGF0ZS52YWx1ZSkpKSlcbiAgICAgICAgXSk7XG4gICAgfVxufVxuZXhwb3J0cy5UeXBlQWhlYWQgPSBUeXBlQWhlYWQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWSGx3WlVGb1pXRmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDFSNWNHVkJhR1ZoWkM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVEJEUVN4MVEwRkJiME03UVVGSGNFTXNVMEZCVXl4VFFVRlRMRU5CUVVNc1NVRkJWeXhGUVVGRkxFdEJRVms3U1VGRGVFTXNUVUZCVFN4RlFVRkZMRWRCUVVjc1NVRkJTU3hOUVVGTkxFTkJRVU1zUzBGQlN5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTI1RExFMUJRVTBzVjBGQlZ5eEhRVUZITEVsQlFVazdVMEZEYmtJc1QwRkJUeXhEUVVGRExFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFWRXNSVUZCUlN4RlFVRkZMRU5CUVVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF6dFRRVU40UXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRE8xTkJRMVlzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCVVN4RlFVRkZMRVZCUVVVN1VVRkRaQ3hKUVVGSkxFTkJRVU1zUTBGQlF5eFZRVUZWTEVOQlFVTXNTMEZCU3l4RFFVRkRMRVZCUVVVN1dVRkRja0lzVDBGQlR5eFpRVUZETEVOQlFVTXNUVUZCVFN4RlFVRkZMRVZCUVVNc1NVRkJTU3hGUVVGRExFbEJRVWtzUlVGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFRRVU0zUXp0aFFVRk5MRWxCUVVrc1EwRkJReXhEUVVGRExGVkJRVlVzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlR0WlFVTXpRaXhQUVVGUExGbEJRVU1zUTBGQlF5eEhRVUZITEVWQlFVVXNSVUZCUXl4SlFVRkpMRVZCUVVNc1NVRkJTU3hGUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xTkJRekZETzJGQlFVMDdXVUZEU0N4UFFVRlBMRmxCUVVNc1EwRkJReXhOUVVGTkxFVkJRVVVzUlVGQlF5eEpRVUZKTEVWQlFVTXNTVUZCU1N4RlFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03VTBGRGNFTTdTVUZEVEN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFOUJRVThzV1VGQlF5eERRVUZETEUxQlFVMHNSVUZCUlN4WFFVRlhMRU5CUVVNc1EwRkJRenRCUVVOc1F5eERRVUZETzBGQlJVUXNUVUZCVFN4UFFVRlBPMGxCUzFRc1dVRkJXU3hKUVVGdlFpeEZRVUZGTEVkQlFUSkNPMUZCU25SRUxGTkJRVWtzUjBGQldTeEZRVUZGTEVOQlFVTTdVVUZMZEVJc1NVRkJTU3hQUVVGUExFbEJRVWtzUzBGQlN5eFJRVUZSTEVWQlFVVTdXVUZETVVJc1dVRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTEUxQlFVMHNSVUZCUlN4TFFVRkxMRVZCUVVVc1IwRkJSeXhGUVVGRkxFbEJRVWtzUlVGQlJTeERRVUZETzJsQ1FVTjBReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZWTEVWQlFVVXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1UwRkRkRVE3WVVGQlRUdFpRVU5JTEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETzFOQlF5OUNPMGxCUTB3c1EwRkJRenRKUVZaUExGZEJRVmNzUTBGQlF5eEpRVUZWTEVWQlFVVXNSMEZCZFVJN1VVRkRia1FzU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4SFFVRkhMRU5CUVVFc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRE8wbEJRM1JETEVOQlFVTTdRMEZUU2p0QlFVVkVMRTFCUVdFc1UwRkJVenRKUVVOc1FpeE5RVUZOTEVOQlFVTXNTVUZCVlR0UlFVTmlMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTXhRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWY3NSMEZCUnl4SlFVRkpMRU5CUVVNN1VVRkRPVUlzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJRM1JDTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1lVRkJZU3hIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU01UWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJRenRSUVVNeFF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXp0SlFVTjBReXhEUVVGRE8wbEJRMFFzU1VGQlNTeERRVUZETEVsQlFWVTdVVUZEV0N4TlFVRk5MRVZCUVVVc1IwRkJSeXhKUVVGSkxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM2hETEUxQlFVMHNVVUZCVVN4SFFVRkhMRWRCUVVjc1JVRkJSU3hEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNORUpCUVRSQ0xFTkJRVU1zUTBGQlF6dFJRVU5xUlN4TlFVRk5MRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVkVzUlVGQlJTeEZRVUZGTzFsQlEzaENMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU1zUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRk5CUVZNc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdXVUZETjBVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFhRVUZYTEVkQlFVY3NTVUZCU1N4RFFVRkRPMWxCUXpsQ0xFOUJRVThzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVFc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXp0UlFVTndSU3hEUVVGRExFTkJRVU03VVVGRFJpeE5RVUZOTEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVzc1JVRkJSU3hGUVVGRk8xbEJRVWNzU1VGQlNTeERRVUZETEVWQlFVVTdaMEpCUXk5Q0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVMEZCVXl4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU1zVFVGQlRTeERRVUZETEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRE8yZENRVU0xUkN4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFMUJRVTBzUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8yRkJRekZETzFGQlFVRXNRMEZCUXl4RFFVRkRPMUZCUTBnc1RVRkJUU3hMUVVGTExFZEJRVWNzUTBGQlF5eERRVUZMTEVWQlFVVXNSVUZCUlR0WlFVTndRaXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRk5CUVZNc1IwRkJSeXhEUVVGRExFTkJRVU1zVFVGQlRTeERRVUZETzFsQlF6RkRMRTFCUVUwc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRkhMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU03V1VGRGVrTXNUVUZCVFN4WFFVRlhMRWRCUVVjc1NVRkJTU3hOUVVGTkxFTkJRVU1zUjBGQlJ5eExRVUZMTEVWQlFVVXNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRaUVVOcVJDeE5RVUZOTEdkQ1FVRm5RaXhIUVVGSExFbEJRVWtzVFVGQlRTeERRVUZETEVsQlFVa3NTMEZCU3l4RlFVRkZMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03V1VGRGRrUXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhoUVVGaExFZEJRVWNzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGUkxFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU01UlN4RFFVRkRMRU5CUVVNc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNZVUZCWVN4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVkVzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhuUWtGQlowSXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUzBGQlN5eERRVUZETzFsQlF5OUdMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVjBGQlZ5eEhRVUZITEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hMUVVGSExFTkJRVU1zUTBGQlF6dFpRVU0xUXl4SlFVRkpMRWRCUVVjc1IwRkJSeXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETzFsQlEzWkNMRU5CUVVNc1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4SFFVRkhMRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0UlFVTTNReXhEUVVGRExFTkJRVU03VVVGRFJpeE5RVUZOTEZWQlFWVXNSMEZCUnl4RFFVRkRMRU5CUVVzc1JVRkJSU3hGUVVGRk8xbEJRM3BDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eEhRVUZITEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNN1dVRkRNVU1zU1VGQlNTeERRVUZETEVOQlFVTXNTVUZCU1N4TFFVRkxMRTlCUVU4c1JVRkJSVHRuUWtGRGNFSXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dGhRVU51UWp0cFFrRkJUU3hKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NWMEZCVnl4RlFVRkZPMmRDUVVNdlFpeE5RVUZOTEV0QlFVc3NSMEZCUnl4RFFVRkRMRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF6dG5Ra0ZEYUVNc1NVRkJTU3hMUVVGTExFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNSVUZCUlR0dlFrRkRiRUlzUTBGQlF5eERRVUZETEV0QlFVc3NSMEZCUnl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzJsQ1FVTTFRanRoUVVOS08xRkJRMHdzUTBGQlF5eERRVUZETzFGQlEwWXNUVUZCVFN4VFFVRlRMRWRCUVVjN1dVRkRaQ3hsUVVGbExFVkJRVU1zU1VGQlNUdFpRVU53UWl4WFFVRlhMRVZCUVVzc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFhRVUZYTzFsQlEzUkRMRk5CUVZNc1JVRkJUeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZOQlFWTXNTVUZCU1N4SlFVRkpPMWxCUXpWRExGTkJRVk1zUlVGQlR5eFZRVUZWTzFsQlF6RkNMRTlCUVU4c1JVRkJVeXhMUVVGTE8xTkJRM2hDTEVOQlFVTTdVVUZGUml4UFFVRlBMRmxCUVVNc1EwRkJReXhWUVVGVkxFVkJRVVU3V1VGRGFrSXNXVUZCUXl4RFFVRkRMREpDUVVFeVFpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJRU3hEUVVGRExFTkJRVUVzY1VKQlFYRkNMRU5CUVVNc1EwRkJReXhEUVVGRExESkNRVUV5UWl4RlFVRkZMRVZCUXk5R0xGTkJRVk1zUlVGRFZDeFpRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZCTEVOQlFVTXNRMEZCUVN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGRGRFVTdXVUZEUkN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRVmNzUTBGQlFTeERRVUZETEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1owSkJReTlDTEZsQlFVTXNRMEZCUXl4dlFrRkJiMElzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMR0ZCUVdFc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZSTEVWQlFVVXNSVUZCUlN4RFFVTTVSQ3haUVVGRExFTkJRVU1zUlVGQlJTeEZRVUZGTEVWQlFVVXNUMEZCVHl4RlFVRkZMRTFCUVUwc1JVRkJSU3hGUVVGRkxGTkJRVk1zUTBGQlF5eERRVUZETEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVMEZEZGtVc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF6dERRVU5LTzBGQk4wUkVMRGhDUVRaRVF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNZW51XzEgPSByZXF1aXJlKFwiLi9NZW51XCIpO1xuZXhwb3J0cy5NZW51ID0gTWVudV8xLk1lbnU7XG52YXIgQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9CdXR0b25cIik7XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbl8xLkJ1dHRvbjtcbnZhciBMYWJlbF8xID0gcmVxdWlyZShcIi4vTGFiZWxcIik7XG5leHBvcnRzLkxhYmVsID0gTGFiZWxfMS5MYWJlbDtcbnZhciBTbGlkZXJfMSA9IHJlcXVpcmUoXCIuL1NsaWRlclwiKTtcbmV4cG9ydHMuU2xpZGVyID0gU2xpZGVyXzEuU2xpZGVyO1xudmFyIFJhZGlvQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9SYWRpb0J1dHRvblwiKTtcbmV4cG9ydHMuUmFkaW9CdXR0b24gPSBSYWRpb0J1dHRvbl8xLlJhZGlvQnV0dG9uO1xudmFyIE9wdGlvbnNCdXR0b25fMSA9IHJlcXVpcmUoXCIuL09wdGlvbnNCdXR0b25cIik7XG5leHBvcnRzLk9wdGlvbnNCdXR0b24gPSBPcHRpb25zQnV0dG9uXzEuT3B0aW9uc0J1dHRvbjtcbnZhciBUb2dnbGVCdXR0b25fMSA9IHJlcXVpcmUoXCIuL1RvZ2dsZUJ1dHRvblwiKTtcbmV4cG9ydHMuVG9nZ2xlQnV0dG9uID0gVG9nZ2xlQnV0dG9uXzEuVG9nZ2xlQnV0dG9uO1xudmFyIFRvb2xiYXJCdXR0b25fMSA9IHJlcXVpcmUoXCIuL1Rvb2xiYXJCdXR0b25cIik7XG5leHBvcnRzLlRvb2xiYXJCdXR0b24gPSBUb29sYmFyQnV0dG9uXzEuVG9vbGJhckJ1dHRvbjtcbnZhciBUb29sYmFyQnV0dG9uXzIgPSByZXF1aXJlKFwiLi9Ub29sYmFyQnV0dG9uXCIpO1xuZXhwb3J0cy5CdXR0b25TeW1ib2xzID0gVG9vbGJhckJ1dHRvbl8yLkJ1dHRvblN5bWJvbHM7XG52YXIgQ29sbGFwc2libGVfMSA9IHJlcXVpcmUoXCIuL0NvbGxhcHNpYmxlXCIpO1xuZXhwb3J0cy5Db2xsYXBzaWJsZSA9IENvbGxhcHNpYmxlXzEuQ29sbGFwc2libGU7XG52YXIgTW9kYWxfMSA9IHJlcXVpcmUoXCIuL01vZGFsXCIpO1xuZXhwb3J0cy5Nb2RhbCA9IE1vZGFsXzEuTW9kYWw7XG52YXIgVHlwZUFoZWFkXzEgPSByZXF1aXJlKFwiLi9UeXBlQWhlYWRcIik7XG5leHBvcnRzLlR5cGVBaGVhZCA9IFR5cGVBaGVhZF8xLlR5cGVBaGVhZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdmFXNWtaWGd1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRlBRU3dyUWtGQmMwTTdRVUZCTjBJc2MwSkJRVUVzU1VGQlNTeERRVUZCTzBGQlJXSXNiVU5CUVhkRE8wRkJRUzlDTERCQ1FVRkJMRTFCUVUwc1EwRkJRVHRCUVVObUxHbERRVUYxUXp0QlFVRTVRaXgzUWtGQlFTeExRVUZMTEVOQlFVRTdRVUZEWkN4dFEwRkJkME03UVVGQkwwSXNNRUpCUVVFc1RVRkJUU3hEUVVGQk8wRkJRMllzTmtOQlFUWkRPMEZCUVhCRExHOURRVUZCTEZkQlFWY3NRMEZCUVR0QlFVTndRaXhwUkVGQkswTTdRVUZCZEVNc2QwTkJRVUVzWVVGQllTeERRVUZCTzBGQlEzUkNMQ3REUVVFNFF6dEJRVUZ5UXl4elEwRkJRU3haUVVGWkxFTkJRVUU3UVVGRGNrSXNhVVJCUVN0RE8wRkJRWFJETEhkRFFVRkJMR0ZCUVdFc1EwRkJRVHRCUVVOMFFpeHBSRUZCSzBNN1FVRkJkRU1zZDBOQlFVRXNZVUZCWVN4RFFVRkJPMEZCUTNSQ0xEWkRRVUUyUXp0QlFVRndReXh2UTBGQlFTeFhRVUZYTEVOQlFVRTdRVUZEY0VJc2FVTkJRWFZETzBGQlFUbENMSGRDUVVGQkxFdEJRVXNzUTBGQlFUdEJRVU5rTEhsRFFVRXlRenRCUVVGc1F5eG5RMEZCUVN4VFFVRlRMRU5CUVVFaWZRPT0iXSwic291cmNlUm9vdCI6IiJ9