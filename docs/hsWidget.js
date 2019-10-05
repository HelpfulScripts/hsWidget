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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mithril_1 = __webpack_require__(/*! ./mithril */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/mithril.js");
const hsutil_1 = __webpack_require__(/*! hsutil */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/index.js");
const log = hsutil_1.log('Config');
class Config {
    oninit(node) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = node.attrs.context;
            if (!node.state.cfg) {
                const s = (typeof node.attrs.source === 'string') ?
                    yield mithril_1.m.request({ method: "GET", url: node.attrs.source })
                    : node.attrs.source;
                node.state.cfg = translate(s, s.root, context);
            }
        });
    }
    view(node) {
        const cfg = node.state.cfg;
        return (cfg && cfg.compClass) ? mithril_1.m(cfg.compClass, Object.assign(Object.assign({}, cfg.attrs), node.attrs)) : mithril_1.m('div', 'waiting');
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
            log.debug(`resolved class '${opt}' to ${log.inspect(cl, 1)}`);
            const r = {
                compClass: cl,
                attrs: content
            };
            (!Array.isArray(subcfg) && options.length === 1) ?
                result = r :
                result[opt] = r;
        }
        else {
            if (isNaN(parseInt(opt))) {
                log.debug(`resolved direct '${opt}' to ${log.inspect(content, 0)}`);
            }
            result[opt] = content;
        }
    });
    return result;
}
function resolve(sym, context) {
    log.debug(`resolving ${sym} in context '${log.inspect(context, 0)}'`);
    let cl;
    context.some((c) => cl = c[sym]);
    log.debug(`resolving ${sym} => ${log.inspect(cl, 0)}`);
    return cl;
}
function isSynonym(config, key) { return typeof key === 'string' && config[key]; }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQXlGQSx1Q0FBeUM7QUFDekMsbUNBQXNDO0FBQUMsTUFBTSxHQUFHLEdBQUcsWUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBS2xFLE1BQWEsTUFBTTtJQUNULE1BQU0sQ0FBQyxJQUFVOztZQUNuQixNQUFNLE9BQU8sR0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQSxDQUFDO29CQUM5QyxNQUFNLFdBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDO29CQUMzRCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNsRDtRQUNMLENBQUM7S0FBQTtJQUNELElBQUksQ0FBQyxJQUFVO1FBQ1gsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDM0IsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLFdBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFDLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ25JLENBQUM7Q0FDSjtBQWRELHdCQWNDO0FBYUQsU0FBUyxTQUFTLENBQUMsTUFBVSxFQUFFLE1BQVUsRUFBRSxPQUFhO0lBRXBELElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtRQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FBRTtJQUUzRCxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sTUFBTSxDQUFDLElBQUUsQ0FBQyxFQUFFO1FBQUUsT0FBTyxNQUFNLENBQUM7S0FBRTtJQUM3RixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVwQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFVLEVBQVEsRUFBRTtRQUM3QixNQUFNLEVBQUUsR0FBTyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXhELElBQUksRUFBRSxFQUFFO1lBQ0osR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5RCxNQUFNLENBQUMsR0FBRztnQkFDTixTQUFTLEVBQUMsRUFBRTtnQkFDWixLQUFLLEVBQUMsT0FBTzthQUNoQixDQUFDO1lBQ0YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUM3QyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjthQUVJO1lBQ0QsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RCLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdkU7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBVUQsU0FBUyxPQUFPLENBQUMsR0FBVSxFQUFFLE9BQWE7SUFDdEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyRSxJQUFJLEVBQU0sQ0FBQztJQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0QyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0RCxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxNQUFVLEVBQUUsR0FBTyxJQUFJLE9BQU8sT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMifQ==

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js":
/*!******************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./view/PillaredLayouter */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/PillaredLayouter.js");
__webpack_require__(/*! ./view/TileLayouter */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/view/TileLayouter.js");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxtQ0FBaUM7QUFDakMsK0JBQTZCO0FBRzdCLHdDQUE2QztBQUFwQywwQkFBQSxNQUFNLENBQUE7QUFDZix3Q0FDNkM7QUFEcEMsd0JBQUEsSUFBSSxDQUFBO0FBQUUsc0JBQUEsRUFBRSxDQUFBO0FBQUUsc0JBQUEsRUFBRSxDQUFBO0FBQ1osK0JBQUEsV0FBVyxDQUFBO0FBQ3BCLDRDQUErQztBQUF0Qyw4QkFBQSxRQUFRLENBQUE7QUFDakIsbUNBQXdDO0FBQS9CLDBCQUFBLE1BQU0sQ0FBQTtBQUNmLHFDQUF5QztBQUFoQyxzQkFBQSxDQUFDLENBQUEifQ==

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/mithril.js":
/*!********************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/mithril.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.m = __webpack_require__(/*! mithril */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/index.js");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl0aHJpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taXRocmlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUWEsUUFBQSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDIn0=

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/api/mount-redraw.js":
/*!**************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/api/mount-redraw.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/vnode.js")

module.exports = function(render, schedule, console) {
	var subscriptions = []
	var rendering = false
	var pending = false

	function sync() {
		if (rendering) throw new Error("Nested m.redraw.sync() call")
		rendering = true
		for (var i = 0; i < subscriptions.length; i += 2) {
			try { render(subscriptions[i], Vnode(subscriptions[i + 1]), redraw) }
			catch (e) { console.error(e) }
		}
		rendering = false
	}

	function redraw() {
		if (!pending) {
			pending = true
			schedule(function() {
				pending = false
				sync()
			})
		}
	}

	redraw.sync = sync

	function mount(root, component) {
		if (component != null && component.view == null && typeof component !== "function") {
			throw new TypeError("m.mount(element, component) expects a component, not a vnode")
		}

		var index = subscriptions.indexOf(root)
		if (index >= 0) {
			subscriptions.splice(index, 2)
			render(root, [], redraw)
		}

		if (component != null) {
			subscriptions.push(root, component)
			render(root, Vnode(component), redraw)
		}
	}

	return {mount: mount, redraw: redraw}
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/api/router.js":
/*!********************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/api/router.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/vnode.js")
var m = __webpack_require__(/*! ../render/hyperscript */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/hyperscript.js")
var Promise = __webpack_require__(/*! ../promise/promise */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/promise/promise.js")

var buildPathname = __webpack_require__(/*! ../pathname/build */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/build.js")
var parsePathname = __webpack_require__(/*! ../pathname/parse */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/parse.js")
var compileTemplate = __webpack_require__(/*! ../pathname/compileTemplate */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/compileTemplate.js")
var assign = __webpack_require__(/*! ../pathname/assign */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/assign.js")

var sentinel = {}

module.exports = function($window, mountRedraw) {
	var fireAsync

	function setPath(path, data, options) {
		path = buildPathname(path, data)
		if (fireAsync != null) {
			fireAsync()
			var state = options ? options.state : null
			var title = options ? options.title : null
			if (options && options.replace) $window.history.replaceState(state, title, route.prefix + path)
			else $window.history.pushState(state, title, route.prefix + path)
		}
		else {
			$window.location.href = route.prefix + path
		}
	}

	var currentResolver = sentinel, component, attrs, currentPath, lastUpdate

	var SKIP = route.SKIP = {}

	function route(root, defaultRoute, routes) {
		if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
		// 0 = start
		// 1 = init
		// 2 = ready
		var state = 0

		var compiled = Object.keys(routes).map(function(route) {
			if (route[0] !== "/") throw new SyntaxError("Routes must start with a `/`")
			if ((/:([^\/\.-]+)(\.{3})?:/).test(route)) {
				throw new SyntaxError("Route parameter names must be separated with either `/`, `.`, or `-`")
			}
			return {
				route: route,
				component: routes[route],
				check: compileTemplate(route),
			}
		})
		var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
		var p = Promise.resolve()
		var scheduled = false
		var onremove

		fireAsync = null

		if (defaultRoute != null) {
			var defaultData = parsePathname(defaultRoute)

			if (!compiled.some(function (i) { return i.check(defaultData) })) {
				throw new ReferenceError("Default route doesn't match any known routes")
			}
		}

		function resolveRoute() {
			scheduled = false
			// Consider the pathname holistically. The prefix might even be invalid,
			// but that's not our problem.
			var prefix = $window.location.hash
			if (route.prefix[0] !== "#") {
				prefix = $window.location.search + prefix
				if (route.prefix[0] !== "?") {
					prefix = $window.location.pathname + prefix
					if (prefix[0] !== "/") prefix = "/" + prefix
				}
			}
			// This seemingly useless `.concat()` speeds up the tests quite a bit,
			// since the representation is consistently a relatively poorly
			// optimized cons string.
			var path = prefix.concat()
				.replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
				.slice(route.prefix.length)
			var data = parsePathname(path)

			assign(data.params, $window.history.state)

			function fail() {
				if (path === defaultRoute) throw new Error("Could not resolve default route " + defaultRoute)
				setPath(defaultRoute, null, {replace: true})
			}

			loop(0)
			function loop(i) {
				// 0 = init
				// 1 = scheduled
				// 2 = done
				for (; i < compiled.length; i++) {
					if (compiled[i].check(data)) {
						var payload = compiled[i].component
						var matchedRoute = compiled[i].route
						var localComp = payload
						var update = lastUpdate = function(comp) {
							if (update !== lastUpdate) return
							if (comp === SKIP) return loop(i + 1)
							component = comp != null && (typeof comp.view === "function" || typeof comp === "function")? comp : "div"
							attrs = data.params, currentPath = path, lastUpdate = null
							currentResolver = payload.render ? payload : null
							if (state === 2) mountRedraw.redraw()
							else {
								state = 2
								mountRedraw.redraw.sync()
							}
						}
						// There's no understating how much I *wish* I could
						// use `async`/`await` here...
						if (payload.view || typeof payload === "function") {
							payload = {}
							update(localComp)
						}
						else if (payload.onmatch) {
							p.then(function () {
								return payload.onmatch(data.params, path, matchedRoute)
							}).then(update, fail)
						}
						else update("div")
						return
					}
				}
				fail()
			}
		}

		// Set it unconditionally so `m.route.set` and `m.route.Link` both work,
		// even if neither `pushState` nor `hashchange` are supported. It's
		// cleared if `hashchange` is used, since that makes it automatically
		// async.
		fireAsync = function() {
			if (!scheduled) {
				scheduled = true
				callAsync(resolveRoute)
			}
		}

		if (typeof $window.history.pushState === "function") {
			onremove = function() {
				$window.removeEventListener("popstate", fireAsync, false)
			}
			$window.addEventListener("popstate", fireAsync, false)
		} else if (route.prefix[0] === "#") {
			fireAsync = null
			onremove = function() {
				$window.removeEventListener("hashchange", resolveRoute, false)
			}
			$window.addEventListener("hashchange", resolveRoute, false)
		}

		return mountRedraw.mount(root, {
			onbeforeupdate: function() {
				state = state ? 2 : 1
				return !(!state || sentinel === currentResolver)
			},
			oncreate: resolveRoute,
			onremove: onremove,
			view: function() {
				if (!state || sentinel === currentResolver) return
				// Wrap in a fragment to preserve existing key semantics
				var vnode = [Vnode(component, attrs.key, attrs)]
				if (currentResolver) vnode = currentResolver.render(vnode[0])
				return vnode
			},
		})
	}
	route.set = function(path, data, options) {
		if (lastUpdate != null) {
			options = options || {}
			options.replace = true
		}
		lastUpdate = null
		setPath(path, data, options)
	}
	route.get = function() {return currentPath}
	route.prefix = "#!"
	route.Link = {
		view: function(vnode) {
			var options = vnode.attrs.options
			// Remove these so they don't get overwritten
			var attrs = {}, onclick, href
			assign(attrs, vnode.attrs)
			// The first two are internal, but the rest are magic attributes
			// that need censored to not screw up rendering.
			attrs.selector = attrs.options = attrs.key = attrs.oninit =
			attrs.oncreate = attrs.onbeforeupdate = attrs.onupdate =
			attrs.onbeforeremove = attrs.onremove = null

			// Do this now so we can get the most current `href` and `disabled`.
			// Those attributes may also be specified in the selector, and we
			// should honor that.
			var child = m(vnode.attrs.selector || "a", attrs, vnode.children)

			// Let's provide a *right* way to disable a route link, rather than
			// letting people screw up accessibility on accident.
			//
			// The attribute is coerced so users don't get surprised over
			// `disabled: 0` resulting in a button that's somehow routable
			// despite being visibly disabled.
			if (child.attrs.disabled = Boolean(child.attrs.disabled)) {
				child.attrs.href = null
				child.attrs["aria-disabled"] = "true"
				// If you *really* do want to do this on a disabled link, use
				// an `oncreate` hook to add it.
				child.attrs.onclick = null
			} else {
				onclick = child.attrs.onclick
				href = child.attrs.href
				child.attrs.href = route.prefix + href
				child.attrs.onclick = function(e) {
					var result
					if (typeof onclick === "function") {
						result = onclick.call(e.currentTarget, e)
					} else if (onclick == null || typeof onclick !== "object") {
						// do nothing
					} else if (typeof onclick.handleEvent === "function") {
						onclick.handleEvent(e)
					}

					// Adapted from React Router's implementation:
					// https://github.com/ReactTraining/react-router/blob/520a0acd48ae1b066eb0b07d6d4d1790a1d02482/packages/react-router-dom/modules/Link.js
					//
					// Try to be flexible and intuitive in how we handle links.
					// Fun fact: links aren't as obvious to get right as you
					// would expect. There's a lot more valid ways to click a
					// link than this, and one might want to not simply click a
					// link, but right click or command-click it to copy the
					// link target, etc. Nope, this isn't just for blind people.
					if (
						// Skip if `onclick` prevented default
						result !== false && !e.defaultPrevented &&
						// Ignore everything but left clicks
						(e.button === 0 || e.which === 0 || e.which === 1) &&
						// Let the browser handle `target=_blank`, etc.
						(!e.currentTarget.target || e.currentTarget.target === "_self") &&
						// No modifier keys
						!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey
					) {
						e.preventDefault()
						e.redraw = false
						route.set(href, null, options)
					}
				}
			}
			return child
		},
	}
	route.param = function(key) {
		return attrs && key != null ? attrs[key] : attrs
	}

	return route
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/node_modules/timers-browserify/main.js */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/hyperscript.js":
/*!*********************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/hyperscript.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hyperscript = __webpack_require__(/*! ./render/hyperscript */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/hyperscript.js")

hyperscript.trust = __webpack_require__(/*! ./render/trust */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/trust.js")
hyperscript.fragment = __webpack_require__(/*! ./render/fragment */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/fragment.js")

module.exports = hyperscript


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/index.js":
/*!***************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hyperscript = __webpack_require__(/*! ./hyperscript */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/hyperscript.js")
var request = __webpack_require__(/*! ./request */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/request.js")
var mountRedraw = __webpack_require__(/*! ./mount-redraw */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/mount-redraw.js")

var m = function m() { return hyperscript.apply(this, arguments) }
m.m = hyperscript
m.trust = hyperscript.trust
m.fragment = hyperscript.fragment
m.mount = mountRedraw.mount
m.route = __webpack_require__(/*! ./route */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/route.js")
m.render = __webpack_require__(/*! ./render */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render.js")
m.redraw = mountRedraw.redraw
m.request = request.request
m.jsonp = request.jsonp
m.parseQueryString = __webpack_require__(/*! ./querystring/parse */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/querystring/parse.js")
m.buildQueryString = __webpack_require__(/*! ./querystring/build */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/querystring/build.js")
m.parsePathname = __webpack_require__(/*! ./pathname/parse */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/parse.js")
m.buildPathname = __webpack_require__(/*! ./pathname/build */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/build.js")
m.vnode = __webpack_require__(/*! ./render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/vnode.js")
m.PromisePolyfill = __webpack_require__(/*! ./promise/polyfill */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/promise/polyfill.js")

module.exports = m


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/mount-redraw.js":
/*!**********************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/mount-redraw.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var render = __webpack_require__(/*! ./render */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render.js")

module.exports = __webpack_require__(/*! ./api/mount-redraw */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/api/mount-redraw.js")(render, requestAnimationFrame, console)


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/assign.js":
/*!*************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/assign.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.assign || function(target, source) {
	if(source) Object.keys(source).forEach(function(key) { target[key] = source[key] })
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/build.js":
/*!************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/build.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildQueryString = __webpack_require__(/*! ../querystring/build */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/querystring/build.js")
var assign = __webpack_require__(/*! ./assign */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/assign.js")

// Returns `path` from `template` + `params`
module.exports = function(template, params) {
	if ((/:([^\/\.-]+)(\.{3})?:/).test(template)) {
		throw new SyntaxError("Template parameter names *must* be separated")
	}
	if (params == null) return template
	var queryIndex = template.indexOf("?")
	var hashIndex = template.indexOf("#")
	var queryEnd = hashIndex < 0 ? template.length : hashIndex
	var pathEnd = queryIndex < 0 ? queryEnd : queryIndex
	var path = template.slice(0, pathEnd)
	var query = {}

	assign(query, params)

	var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m, key, variadic) {
		delete query[key]
		// If no such parameter exists, don't interpolate it.
		if (params[key] == null) return m
		// Escape normal parameters, but not variadic ones.
		return variadic ? params[key] : encodeURIComponent(String(params[key]))
	})

	// In case the template substitution adds new query/hash parameters.
	var newQueryIndex = resolved.indexOf("?")
	var newHashIndex = resolved.indexOf("#")
	var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex
	var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex
	var result = resolved.slice(0, newPathEnd)

	if (queryIndex >= 0) result += template.slice(queryIndex, queryEnd)
	if (newQueryIndex >= 0) result += (queryIndex < 0 ? "?" : "&") + resolved.slice(newQueryIndex, newQueryEnd)
	var querystring = buildQueryString(query)
	if (querystring) result += (queryIndex < 0 && newQueryIndex < 0 ? "?" : "&") + querystring
	if (hashIndex >= 0) result += template.slice(hashIndex)
	if (newHashIndex >= 0) result += (hashIndex < 0 ? "" : "&") + resolved.slice(newHashIndex)
	return result
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/compileTemplate.js":
/*!**********************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/compileTemplate.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parsePathname = __webpack_require__(/*! ./parse */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/parse.js")

// Compiles a template into a function that takes a resolved path (without query
// strings) and returns an object containing the template parameters with their
// parsed values. This expects the input of the compiled template to be the
// output of `parsePathname`. Note that it does *not* remove query parameters
// specified in the template.
module.exports = function(template) {
	var templateData = parsePathname(template)
	var templateKeys = Object.keys(templateData.params)
	var keys = []
	var regexp = new RegExp("^" + templateData.path.replace(
		// I escape literal text so people can use things like `:file.:ext` or
		// `:lang-:locale` in routes. This is all merged into one pass so I
		// don't also accidentally escape `-` and make it harder to detect it to
		// ban it from template parameters.
		/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,
		function(m, key, extra) {
			if (key == null) return "\\" + m
			keys.push({k: key, r: extra === "..."})
			if (extra === "...") return "(.*)"
			if (extra === ".") return "([^/]+)\\."
			return "([^/]+)" + (extra || "")
		}
	) + "$")
	return function(data) {
		// First, check the params. Usually, there isn't any, and it's just
		// checking a static set.
		for (var i = 0; i < templateKeys.length; i++) {
			if (templateData.params[templateKeys[i]] !== data.params[templateKeys[i]]) return false
		}
		// If no interpolations exist, let's skip all the ceremony
		if (!keys.length) return regexp.test(data.path)
		var values = regexp.exec(data.path)
		if (values == null) return false
		for (var i = 0; i < keys.length; i++) {
			data.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1])
		}
		return true
	}
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/parse.js":
/*!************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/parse.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseQueryString = __webpack_require__(/*! ../querystring/parse */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/querystring/parse.js")

// Returns `{path, params}` from `url`
module.exports = function(url) {
	var queryIndex = url.indexOf("?")
	var hashIndex = url.indexOf("#")
	var queryEnd = hashIndex < 0 ? url.length : hashIndex
	var pathEnd = queryIndex < 0 ? queryEnd : queryIndex
	var path = url.slice(0, pathEnd).replace(/\/{2,}/g, "/")

	if (!path) path = "/"
	else {
		if (path[0] !== "/") path = "/" + path
		if (path.length > 1 && path[path.length - 1] === "/") path = path.slice(0, -1)
	}
	return {
		path: path,
		params: queryIndex < 0
			? {}
			: parseQueryString(url.slice(queryIndex + 1, queryEnd)),
	}
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/promise/polyfill.js":
/*!**************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/promise/polyfill.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {
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
PromisePolyfill.prototype.finally = function(callback) {
	return this.then(
		function(value) {
			return PromisePolyfill.resolve(callback()).then(function() {
				return value
			})
		},
		function(reason) {
			return PromisePolyfill.resolve(callback()).then(function() {
				return PromisePolyfill.reject(reason);
			})
		}
	)
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

module.exports = PromisePolyfill

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/node_modules/timers-browserify/main.js */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/promise/promise.js":
/*!*************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/promise/promise.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var PromisePolyfill = __webpack_require__(/*! ./polyfill */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/promise/polyfill.js")

if (typeof window !== "undefined") {
	if (typeof window.Promise === "undefined") {
		window.Promise = PromisePolyfill
	} else if (!window.Promise.prototype.finally) {
		window.Promise.prototype.finally = PromisePolyfill.prototype.finally
	}
	module.exports = window.Promise
} else if (typeof global !== "undefined") {
	if (typeof global.Promise === "undefined") {
		global.Promise = PromisePolyfill
	} else if (!global.Promise.prototype.finally) {
		global.Promise.prototype.finally = PromisePolyfill.prototype.finally
	}
	module.exports = global.Promise
} else {
	module.exports = PromisePolyfill
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/querystring/build.js":
/*!***************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/querystring/build.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""

	var args = []
	for (var key in object) {
		destructure(key, object[key])
	}

	return args.join("&")

	function destructure(key, value) {
		if (Array.isArray(value)) {
			for (var i = 0; i < value.length; i++) {
				destructure(key + "[" + i + "]", value[i])
			}
		}
		else if (Object.prototype.toString.call(value) === "[object Object]") {
			for (var i in value) {
				destructure(key + "[" + i + "]", value[i])
			}
		}
		else args.push(encodeURIComponent(key) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
	}
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/querystring/parse.js":
/*!***************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/querystring/parse.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)

	var entries = string.split("&"), counters = {}, data = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key = decodeURIComponent(entry[0])
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""

		if (value === "true") value = true
		else if (value === "false") value = false

		var levels = key.split(/\]\[?|\[/)
		var cursor = data
		if (key.indexOf("[") > -1) levels.pop()
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			if (level === "") {
				var key = levels.slice(0, j).join()
				if (counters[key] == null) {
					counters[key] = Array.isArray(cursor) ? cursor.length : 0
				}
				level = counters[key]++
			}
			// Disallow direct prototype pollution
			else if (level === "__proto__") break
			if (j === levels.length - 1) cursor[level] = value
			else {
				// Read own properties exclusively to disallow indirect
				// prototype pollution
				var desc = Object.getOwnPropertyDescriptor(cursor, level)
				if (desc != null) desc = desc.value
				if (desc == null) cursor[level] = desc = isNumber ? [] : {}
				cursor = desc
			}
		}
	}
	return data
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render.js":
/*!****************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./render/render */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/render.js")(window)


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/fragment.js":
/*!*************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/fragment.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/vnode.js")
var hyperscriptVnode = __webpack_require__(/*! ./hyperscriptVnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/hyperscriptVnode.js")

module.exports = function() {
	var vnode = hyperscriptVnode.apply(0, arguments)

	vnode.tag = "["
	vnode.children = Vnode.normalizeChildren(vnode.children)
	return vnode
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/hyperscript.js":
/*!****************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/hyperscript.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/vnode.js")
var hyperscriptVnode = __webpack_require__(/*! ./hyperscriptVnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/hyperscriptVnode.js")

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

function execSelector(state, vnode) {
	var attrs = vnode.attrs
	var children = Vnode.normalizeChildren(vnode.children)
	var hasClass = hasOwn.call(attrs, "class")
	var className = hasClass ? attrs.class : attrs.className

	vnode.tag = state.tag
	vnode.attrs = null
	vnode.children = undefined

	if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
		var newAttrs = {}

		for (var key in attrs) {
			if (hasOwn.call(attrs, key)) newAttrs[key] = attrs[key]
		}

		attrs = newAttrs
	}

	for (var key in state.attrs) {
		if (hasOwn.call(state.attrs, key) && key !== "className" && !hasOwn.call(attrs, key)){
			attrs[key] = state.attrs[key]
		}
	}
	if (className != null || state.attrs.className != null) attrs.className =
		className != null
			? state.attrs.className != null
				? String(state.attrs.className) + " " + String(className)
				: className
			: state.attrs.className != null
				? state.attrs.className
				: null

	if (hasClass) attrs.class = null

	for (var key in attrs) {
		if (hasOwn.call(attrs, key) && key !== "key") {
			vnode.attrs = attrs
			break
		}
	}

	if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
		vnode.text = children[0].children
	} else {
		vnode.children = children
	}

	return vnode
}

function hyperscript(selector) {
	if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}

	var vnode = hyperscriptVnode.apply(1, arguments)

	if (typeof selector === "string") {
		vnode.children = Vnode.normalizeChildren(vnode.children)
		if (selector !== "[") return execSelector(selectorCache[selector] || compileSelector(selector), vnode)
	}

	vnode.tag = selector
	return vnode
}

module.exports = hyperscript


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/hyperscriptVnode.js":
/*!*********************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/hyperscriptVnode.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/vnode.js")

// Call via `hyperscriptVnode.apply(startOffset, arguments)`
//
// The reason I do it this way, forwarding the arguments and passing the start
// offset in `this`, is so I don't have to create a temporary array in a
// performance-critical path.
//
// In native ES6, I'd instead add a final `...args` parameter to the
// `hyperscript` and `fragment` factories and define this as
// `hyperscriptVnode(...args)`, since modern engines do optimize that away. But
// ES5 (what Mithril requires thanks to IE support) doesn't give me that luxury,
// and engines aren't nearly intelligent enough to do either of these:
//
// 1. Elide the allocation for `[].slice.call(arguments, 1)` when it's passed to
//    another function only to be indexed.
// 2. Elide an `arguments` allocation when it's passed to any function other
//    than `Function.prototype.apply` or `Reflect.apply`.
//
// In ES6, it'd probably look closer to this (I'd need to profile it, though):
// module.exports = function(attrs, ...children) {
//     if (attrs == null || typeof attrs === "object" && attrs.tag == null && !Array.isArray(attrs)) {
//         if (children.length === 1 && Array.isArray(children[0])) children = children[0]
//     } else {
//         children = children.length === 0 && Array.isArray(attrs) ? attrs : [attrs, ...children]
//         attrs = undefined
//     }
//
//     if (attrs == null) attrs = {}
//     return Vnode("", attrs.key, attrs, children)
// }
module.exports = function() {
	var attrs = arguments[this], start = this + 1, children

	if (attrs == null) {
		attrs = {}
	} else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
		attrs = {}
		start = this
	}

	if (arguments.length === start + 1) {
		children = arguments[start]
		if (!Array.isArray(children)) children = [children]
	} else {
		children = []
		while (start < arguments.length) children.push(arguments[start++])
	}

	return Vnode("", attrs.key, attrs, children)
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/render.js":
/*!***********************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/render.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/vnode.js")

module.exports = function($window) {
	var $doc = $window && $window.document
	var currentRedraw

	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}

	function getNameSpace(vnode) {
		return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]
	}

	//sanity check to discourage people from doing `vnode.state = ...`
	function checkState(vnode, original) {
		if (vnode.state !== original) throw new Error("`vnode.state` must not be modified")
	}

	//Note: the hook is passed as the `this` argument to allow proxying the
	//arguments without requiring a full array allocation to do so. It also
	//takes advantage of the fact the current `vnode` is the first argument in
	//all lifecycle methods.
	function callHook(vnode) {
		var original = vnode.state
		try {
			return this.apply(original, arguments)
		} finally {
			checkState(vnode, original)
		}
	}

	// IE11 (at least) throws an UnspecifiedError when accessing document.activeElement when
	// inside an iframe. Catch and swallow this error, and heavy-handidly return null.
	function activeElement() {
		try {
			return $doc.activeElement
		} catch (e) {
			return null
		}
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
				case "#": createText(parent, vnode, nextSibling); break
				case "<": createHTML(parent, vnode, ns, nextSibling); break
				case "[": createFragment(parent, vnode, hooks, ns, nextSibling); break
				default: createElement(parent, vnode, hooks, ns, nextSibling)
			}
		}
		else createComponent(parent, vnode, hooks, ns, nextSibling)
	}
	function createText(parent, vnode, nextSibling) {
		vnode.dom = $doc.createTextNode(vnode.children)
		insertNode(parent, vnode.dom, nextSibling)
	}
	var possibleParents = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}
	function createHTML(parent, vnode, ns, nextSibling) {
		var match = vnode.children.match(/^\s*?<(\w+)/im) || []
		// not using the proper parent makes the child element(s) vanish.
		//     var div = document.createElement("div")
		//     div.innerHTML = "<td>i</td><td>j</td>"
		//     console.log(div.innerHTML)
		// --> "ij", no <td> in sight.
		var temp = $doc.createElement(possibleParents[match[1]] || "div")
		if (ns === "http://www.w3.org/2000/svg") {
			temp.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\">" + vnode.children + "</svg>"
			temp = temp.firstChild
		} else {
			temp.innerHTML = vnode.children
		}
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		// Capture nodes to remove, so we don't confuse them.
		vnode.instance = []
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			vnode.instance.push(child)
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
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
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		var attrs = vnode.attrs
		var is = attrs && attrs.is

		ns = getNameSpace(vnode) || ns

		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode.dom = element

		if (attrs != null) {
			setAttrs(vnode, attrs, ns)
		}

		insertNode(parent, element, nextSibling)

		if (!maybeSetContentEditable(vnode)) {
			if (vnode.text != null) {
				if (vnode.text !== "") element.textContent = vnode.text
				else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			}
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(element, children, 0, children.length, hooks, null, ns)
				if (vnode.tag === "select" && attrs != null) setLateSelectAttrs(vnode, attrs)
			}
		}
	}
	function initComponent(vnode, hooks) {
		var sentinel
		if (typeof vnode.tag.view === "function") {
			vnode.state = Object.create(vnode.tag)
			sentinel = vnode.state.view
			if (sentinel.$$reentrantLock$$ != null) return
			sentinel.$$reentrantLock$$ = true
		} else {
			vnode.state = void 0
			sentinel = vnode.tag
			if (sentinel.$$reentrantLock$$ != null) return
			sentinel.$$reentrantLock$$ = true
			vnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function") ? new vnode.tag(vnode) : vnode.tag(vnode)
		}
		initLifecycle(vnode.state, vnode, hooks)
		if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
		vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		sentinel.$$reentrantLock$$ = null
	}
	function createComponent(parent, vnode, hooks, ns, nextSibling) {
		initComponent(vnode, hooks)
		if (vnode.instance != null) {
			createNode(parent, vnode.instance, hooks, ns, nextSibling)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
		}
		else {
			vnode.domSize = 0
		}
	}

	//update
	/**
	 * @param {Element|Fragment} parent - the parent element
	 * @param {Vnode[] | null} old - the list of vnodes of the last `render()` call for
	 *                               this part of the tree
	 * @param {Vnode[] | null} vnodes - as above, but for the current `render()` call.
	 * @param {Function[]} hooks - an accumulator of post-render hooks (oncreate/onupdate)
	 * @param {Element | null} nextSibling - the next DOM node if we're dealing with a
	 *                                       fragment that is not the last item in its
	 *                                       parent
	 * @param {'svg' | 'math' | String | null} ns) - the current XML namespace, if any
	 * @returns void
	 */
	// This function diffs and patches lists of vnodes, both keyed and unkeyed.
	//
	// We will:
	//
	// 1. describe its general structure
	// 2. focus on the diff algorithm optimizations
	// 3. discuss DOM node operations.

	// ## Overview:
	//
	// The updateNodes() function:
	// - deals with trivial cases
	// - determines whether the lists are keyed or unkeyed based on the first non-null node
	//   of each list.
	// - diffs them and patches the DOM if needed (that's the brunt of the code)
	// - manages the leftovers: after diffing, are there:
	//   - old nodes left to remove?
	// 	 - new nodes to insert?
	// 	 deal with them!
	//
	// The lists are only iterated over once, with an exception for the nodes in `old` that
	// are visited in the fourth part of the diff and in the `removeNodes` loop.

	// ## Diffing
	//
	// Reading https://github.com/localvoid/ivi/blob/ddc09d06abaef45248e6133f7040d00d3c6be853/packages/ivi/src/vdom/implementation.ts#L617-L837
	// may be good for context on longest increasing subsequence-based logic for moving nodes.
	//
	// In order to diff keyed lists, one has to
	//
	// 1) match nodes in both lists, per key, and update them accordingly
	// 2) create the nodes present in the new list, but absent in the old one
	// 3) remove the nodes present in the old list, but absent in the new one
	// 4) figure out what nodes in 1) to move in order to minimize the DOM operations.
	//
	// To achieve 1) one can create a dictionary of keys => index (for the old list), then iterate
	// over the new list and for each new vnode, find the corresponding vnode in the old list using
	// the map.
	// 2) is achieved in the same step: if a new node has no corresponding entry in the map, it is new
	// and must be created.
	// For the removals, we actually remove the nodes that have been updated from the old list.
	// The nodes that remain in that list after 1) and 2) have been performed can be safely removed.
	// The fourth step is a bit more complex and relies on the longest increasing subsequence (LIS)
	// algorithm.
	//
	// the longest increasing subsequence is the list of nodes that can remain in place. Imagine going
	// from `1,2,3,4,5` to `4,5,1,2,3` where the numbers are not necessarily the keys, but the indices
	// corresponding to the keyed nodes in the old list (keyed nodes `e,d,c,b,a` => `b,a,e,d,c` would
	//  match the above lists, for example).
	//
	// In there are two increasing subsequences: `4,5` and `1,2,3`, the latter being the longest. We
	// can update those nodes without moving them, and only call `insertNode` on `4` and `5`.
	//
	// @localvoid adapted the algo to also support node deletions and insertions (the `lis` is actually
	// the longest increasing subsequence *of old nodes still present in the new list*).
	//
	// It is a general algorithm that is fireproof in all circumstances, but it requires the allocation
	// and the construction of a `key => oldIndex` map, and three arrays (one with `newIndex => oldIndex`,
	// the `LIS` and a temporary one to create the LIS).
	//
	// So we cheat where we can: if the tails of the lists are identical, they are guaranteed to be part of
	// the LIS and can be updated without moving them.
	//
	// If two nodes are swapped, they are guaranteed not to be part of the LIS, and must be moved (with
	// the exception of the last node if the list is fully reversed).
	//
	// ## Finding the next sibling.
	//
	// `updateNode()` and `createNode()` expect a nextSibling parameter to perform DOM operations.
	// When the list is being traversed top-down, at any index, the DOM nodes up to the previous
	// vnode reflect the content of the new list, whereas the rest of the DOM nodes reflect the old
	// list. The next sibling must be looked for in the old list using `getNextSibling(... oldStart + 1 ...)`.
	//
	// In the other scenarios (swaps, upwards traversal, map-based diff),
	// the new vnodes list is traversed upwards. The DOM nodes at the bottom of the list reflect the
	// bottom part of the new vnodes list, and we can use the `v.dom`  value of the previous node
	// as the next sibling (cached in the `nextSibling` variable).


	// ## DOM node moves
	//
	// In most scenarios `updateNode()` and `createNode()` perform the DOM operations. However,
	// this is not the case if the node moved (second and fourth part of the diff algo). We move
	// the old DOM nodes before updateNode runs because it enables us to use the cached `nextSibling`
	// variable rather than fetching it using `getNextSibling()`.
	//
	// The fourth part of the diff currently inserts nodes unconditionally, leading to issues
	// like #1791 and #1999. We need to be smarter about those situations where adjascent old
	// nodes remain together in the new list in a way that isn't covered by parts one and
	// three of the diff algo.

	function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null || old.length === 0) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)
		else if (vnodes == null || vnodes.length === 0) removeNodes(parent, old, 0, old.length)
		else {
			var isOldKeyed = old[0] != null && old[0].key != null
			var isKeyed = vnodes[0] != null && vnodes[0].key != null
			var start = 0, oldStart = 0
			if (!isOldKeyed) while (oldStart < old.length && old[oldStart] == null) oldStart++
			if (!isKeyed) while (start < vnodes.length && vnodes[start] == null) start++
			if (isKeyed === null && isOldKeyed == null) return // both lists are full of nulls
			if (isOldKeyed !== isKeyed) {
				removeNodes(parent, old, oldStart, old.length)
				createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns)
			} else if (!isKeyed) {
				// Don't index past the end of either list (causes deopts).
				var commonLength = old.length < vnodes.length ? old.length : vnodes.length
				// Rewind if necessary to the first non-null index on either side.
				// We could alternatively either explicitly create or remove nodes when `start !== oldStart`
				// but that would be optimizing for sparse lists which are more rare than dense ones.
				start = start < oldStart ? start : oldStart
				for (; start < commonLength; start++) {
					o = old[start]
					v = vnodes[start]
					if (o === v || o == null && v == null) continue
					else if (o == null) createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling))
					else if (v == null) removeNode(parent, o)
					else updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns)
				}
				if (old.length > commonLength) removeNodes(parent, old, start, old.length)
				if (vnodes.length > commonLength) createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns)
			} else {
				// keyed diff
				var oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v, oe, ve, topSibling

				// bottom-up
				while (oldEnd >= oldStart && end >= start) {
					oe = old[oldEnd]
					ve = vnodes[end]
					if (oe.key !== ve.key) break
					if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)
					if (ve.dom != null) nextSibling = ve.dom
					oldEnd--, end--
				}
				// top-down
				while (oldEnd >= oldStart && end >= start) {
					o = old[oldStart]
					v = vnodes[start]
					if (o.key !== v.key) break
					oldStart++, start++
					if (o !== v) updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns)
				}
				// swaps and list reversals
				while (oldEnd >= oldStart && end >= start) {
					if (start === end) break
					if (o.key !== ve.key || oe.key !== v.key) break
					topSibling = getNextSibling(old, oldStart, nextSibling)
					moveNodes(parent, oe, topSibling)
					if (oe !== v) updateNode(parent, oe, v, hooks, topSibling, ns)
					if (++start <= --end) moveNodes(parent, o, nextSibling)
					if (o !== ve) updateNode(parent, o, ve, hooks, nextSibling, ns)
					if (ve.dom != null) nextSibling = ve.dom
					oldStart++; oldEnd--
					oe = old[oldEnd]
					ve = vnodes[end]
					o = old[oldStart]
					v = vnodes[start]
				}
				// bottom up once again
				while (oldEnd >= oldStart && end >= start) {
					if (oe.key !== ve.key) break
					if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)
					if (ve.dom != null) nextSibling = ve.dom
					oldEnd--, end--
					oe = old[oldEnd]
					ve = vnodes[end]
				}
				if (start > end) removeNodes(parent, old, oldStart, oldEnd + 1)
				else if (oldStart > oldEnd) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
				else {
					// inspired by ivi https://github.com/ivijs/ivi/ by Boris Kaul
					var originalNextSibling = nextSibling, vnodesLength = end - start + 1, oldIndices = new Array(vnodesLength), li=0, i=0, pos = 2147483647, matched = 0, map, lisIndices
					for (i = 0; i < vnodesLength; i++) oldIndices[i] = -1
					for (i = end; i >= start; i--) {
						if (map == null) map = getKeyMap(old, oldStart, oldEnd + 1)
						ve = vnodes[i]
						var oldIndex = map[ve.key]
						if (oldIndex != null) {
							pos = (oldIndex < pos) ? oldIndex : -1 // becomes -1 if nodes were re-ordered
							oldIndices[i-start] = oldIndex
							oe = old[oldIndex]
							old[oldIndex] = null
							if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)
							if (ve.dom != null) nextSibling = ve.dom
							matched++
						}
					}
					nextSibling = originalNextSibling
					if (matched !== oldEnd - oldStart + 1) removeNodes(parent, old, oldStart, oldEnd + 1)
					if (matched === 0) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
					else {
						if (pos === -1) {
							// the indices of the indices of the items that are part of the
							// longest increasing subsequence in the oldIndices list
							lisIndices = makeLisIndices(oldIndices)
							li = lisIndices.length - 1
							for (i = end; i >= start; i--) {
								v = vnodes[i]
								if (oldIndices[i-start] === -1) createNode(parent, v, hooks, ns, nextSibling)
								else {
									if (lisIndices[li] === i - start) li--
									else moveNodes(parent, v, nextSibling)
								}
								if (v.dom != null) nextSibling = vnodes[i].dom
							}
						} else {
							for (i = end; i >= start; i--) {
								v = vnodes[i]
								if (oldIndices[i-start] === -1) createNode(parent, v, hooks, ns, nextSibling)
								if (v.dom != null) nextSibling = vnodes[i].dom
							}
						}
					}
				}
			}
		}
	}
	function updateNode(parent, old, vnode, hooks, nextSibling, ns) {
		var oldTag = old.tag, tag = vnode.tag
		if (oldTag === tag) {
			vnode.state = old.state
			vnode.events = old.events
			if (shouldNotUpdate(vnode, old)) return
			if (typeof oldTag === "string") {
				if (vnode.attrs != null) {
					updateLifecycle(vnode.attrs, vnode, hooks)
				}
				switch (oldTag) {
					case "#": updateText(old, vnode); break
					case "<": updateHTML(parent, old, vnode, ns, nextSibling); break
					case "[": updateFragment(parent, old, vnode, hooks, nextSibling, ns); break
					default: updateElement(old, vnode, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode, hooks, nextSibling, ns)
		}
		else {
			removeNode(parent, old)
			createNode(parent, vnode, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode) {
		if (old.children.toString() !== vnode.children.toString()) {
			old.dom.nodeValue = vnode.children
		}
		vnode.dom = old.dom
	}
	function updateHTML(parent, old, vnode, ns, nextSibling) {
		if (old.children !== vnode.children) {
			removeHTML(parent, old)
			createHTML(parent, vnode, ns, nextSibling)
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
			vnode.instance = old.instance
		}
	}
	function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns)
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
	function updateElement(old, vnode, hooks, ns) {
		var element = vnode.dom = old.dom
		ns = getNameSpace(vnode) || ns

		if (vnode.tag === "textarea") {
			if (vnode.attrs == null) vnode.attrs = {}
			if (vnode.text != null) {
				vnode.attrs.value = vnode.text //FIXME handle multiple children
				vnode.text = undefined
			}
		}
		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (!maybeSetContentEditable(vnode)) {
			if (old.text != null && vnode.text != null && vnode.text !== "") {
				if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
			}
			else {
				if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
				if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
				updateNodes(element, old.children, vnode.children, hooks, null, ns)
			}
		}
	}
	function updateComponent(parent, old, vnode, hooks, nextSibling, ns) {
		vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		updateLifecycle(vnode.state, vnode, hooks)
		if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)
		if (vnode.instance != null) {
			if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, ns)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(parent, old.instance)
			vnode.dom = undefined
			vnode.domSize = 0
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
		}
	}
	function getKeyMap(vnodes, start, end) {
		var map = Object.create(null)
		for (; start < end; start++) {
			var vnode = vnodes[start]
			if (vnode != null) {
				var key = vnode.key
				if (key != null) map[key] = start
			}
		}
		return map
	}
	// Lifted from ivi https://github.com/ivijs/ivi/
	// takes a list of unique numbers (-1 is special and can
	// occur multiple times) and returns an array with the indices
	// of the items that are part of the longest increasing
	// subsequece
	var lisTemp = []
	function makeLisIndices(a) {
		var result = [0]
		var u = 0, v = 0, i = 0
		var il = lisTemp.length = a.length
		for (var i = 0; i < il; i++) lisTemp[i] = a[i]
		for (var i = 0; i < il; ++i) {
			if (a[i] === -1) continue
			var j = result[result.length - 1]
			if (a[j] < a[i]) {
				lisTemp[i] = j
				result.push(i)
				continue
			}
			u = 0
			v = result.length - 1
			while (u < v) {
				// Fast integer average without overflow.
				// eslint-disable-next-line no-bitwise
				var c = (u >>> 1) + (v >>> 1) + (u & v & 1)
				if (a[result[c]] < a[i]) {
					u = c + 1
				}
				else {
					v = c
				}
			}
			if (a[i] < a[result[u]]) {
				if (u > 0) lisTemp[i] = result[u - 1]
				result[u] = i
			}
		}
		u = result.length
		v = result[u - 1]
		while (u-- > 0) {
			result[u] = v
			v = lisTemp[v]
		}
		lisTemp.length = 0
		return result
	}

	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}

	// This covers a really specific edge case:
	// - Parent node is keyed and contains child
	// - Child is removed, returns unresolved promise in `onbeforeremove`
	// - Parent node is moved in keyed diff
	// - Remaining children still need moved appropriately
	//
	// Ideally, I'd track removed nodes as well, but that introduces a lot more
	// complexity and I'm not exactly interested in doing that.
	function moveNodes(parent, vnode, nextSibling) {
		var frag = $doc.createDocumentFragment()
		moveChildToFrag(parent, frag, vnode)
		insertNode(parent, frag, nextSibling)
	}
	function moveChildToFrag(parent, frag, vnode) {
		// Dodge the recursion overhead in a few of the most common cases.
		while (vnode.dom != null && vnode.dom.parentNode === parent) {
			if (typeof vnode.tag !== "string") {
				vnode = vnode.instance
				if (vnode != null) continue
			} else if (vnode.tag === "<") {
				for (var i = 0; i < vnode.instance.length; i++) {
					frag.appendChild(vnode.instance[i])
				}
			} else if (vnode.tag !== "[") {
				// Don't recurse for text nodes *or* elements, just fragments
				frag.appendChild(vnode.dom)
			} else if (vnode.children.length === 1) {
				vnode = vnode.children[0]
				if (vnode != null) continue
			} else {
				for (var i = 0; i < vnode.children.length; i++) {
					var child = vnode.children[i]
					if (child != null) moveChildToFrag(parent, frag, child)
				}
			}
			break
		}
	}

	function insertNode(parent, dom, nextSibling) {
		if (nextSibling != null) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}

	function maybeSetContentEditable(vnode) {
		if (vnode.attrs == null || (
			vnode.attrs.contenteditable == null && // attribute
			vnode.attrs.contentEditable == null // property
		)) return false
		var children = vnode.children
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children
			if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
		}
		else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
		return true
	}

	//remove
	function removeNodes(parent, vnodes, start, end) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) removeNode(parent, vnode)
		}
	}
	function removeNode(parent, vnode) {
		var mask = 0
		var original = vnode.state
		var stateResult, attrsResult
		if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeremove === "function") {
			var result = callHook.call(vnode.state.onbeforeremove, vnode)
			if (result != null && typeof result.then === "function") {
				mask = 1
				stateResult = result
			}
		}
		if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
			var result = callHook.call(vnode.attrs.onbeforeremove, vnode)
			if (result != null && typeof result.then === "function") {
				// eslint-disable-next-line no-bitwise
				mask |= 2
				attrsResult = result
			}
		}
		checkState(vnode, original)

		// If we can, try to fast-path it and avoid all the overhead of awaiting
		if (!mask) {
			onremove(vnode)
			removeChild(parent, vnode)
		} else {
			if (stateResult != null) {
				var next = function () {
					// eslint-disable-next-line no-bitwise
					if (mask & 1) { mask &= 2; if (!mask) reallyRemove() }
				}
				stateResult.then(next, next)
			}
			if (attrsResult != null) {
				var next = function () {
					// eslint-disable-next-line no-bitwise
					if (mask & 2) { mask &= 1; if (!mask) reallyRemove() }
				}
				attrsResult.then(next, next)
			}
		}

		function reallyRemove() {
			checkState(vnode, original)
			onremove(vnode)
			removeChild(parent, vnode)
		}
	}
	function removeHTML(parent, vnode) {
		for (var i = 0; i < vnode.instance.length; i++) {
			parent.removeChild(vnode.instance[i])
		}
	}
	function removeChild(parent, vnode) {
		// Dodge the recursion overhead in a few of the most common cases.
		while (vnode.dom != null && vnode.dom.parentNode === parent) {
			if (typeof vnode.tag !== "string") {
				vnode = vnode.instance
				if (vnode != null) continue
			} else if (vnode.tag === "<") {
				removeHTML(parent, vnode)
			} else {
				if (vnode.tag !== "[") {
					parent.removeChild(vnode.dom)
					if (!Array.isArray(vnode.children)) break
				}
				if (vnode.children.length === 1) {
					vnode = vnode.children[0]
					if (vnode != null) continue
				} else {
					for (var i = 0; i < vnode.children.length; i++) {
						var child = vnode.children[i]
						if (child != null) removeChild(parent, child)
					}
				}
			}
			break
		}
	}
	function onremove(vnode) {
		if (typeof vnode.tag !== "string" && typeof vnode.state.onremove === "function") callHook.call(vnode.state.onremove, vnode)
		if (vnode.attrs && typeof vnode.attrs.onremove === "function") callHook.call(vnode.attrs.onremove, vnode)
		if (typeof vnode.tag !== "string") {
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

	//attrs
	function setAttrs(vnode, attrs, ns) {
		for (var key in attrs) {
			setAttr(vnode, key, null, attrs[key], ns)
		}
	}
	function setAttr(vnode, key, old, value, ns) {
		if (key === "key" || key === "is" || value == null || isLifecycleMethod(key) || (old === value && !isFormAttribute(vnode, key)) && typeof value !== "object") return
		if (key[0] === "o" && key[1] === "n") return updateEvent(vnode, key, value)
		if (key.slice(0, 6) === "xlink:") vnode.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value)
		else if (key === "style") updateStyle(vnode.dom, old, value)
		else if (hasPropertyKey(vnode, key, ns)) {
			if (key === "value") {
				// Only do the coercion if we're actually going to check the value.
				/* eslint-disable no-implicit-coercion */
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === "" + value && vnode.dom === activeElement()) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select" && old !== null && vnode.dom.value === "" + value) return
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && old !== null && vnode.dom.value === "" + value) return
				/* eslint-enable no-implicit-coercion */
			}
			// If you assign an input type that is not supported by IE 11 with an assignment expression, an error will occur.
			if (vnode.tag === "input" && key === "type") vnode.dom.setAttribute(key, value)
			else vnode.dom[key] = value
		} else {
			if (typeof value === "boolean") {
				if (value) vnode.dom.setAttribute(key, "")
				else vnode.dom.removeAttribute(key)
			}
			else vnode.dom.setAttribute(key === "className" ? "class" : key, value)
		}
	}
	function removeAttr(vnode, key, old, ns) {
		if (key === "key" || key === "is" || old == null || isLifecycleMethod(key)) return
		if (key[0] === "o" && key[1] === "n" && !isLifecycleMethod(key)) updateEvent(vnode, key, undefined)
		else if (key === "style") updateStyle(vnode.dom, old, null)
		else if (
			hasPropertyKey(vnode, key, ns)
			&& key !== "className"
			&& !(key === "value" && (
				vnode.tag === "option"
				|| vnode.tag === "select" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement()
			))
			&& !(vnode.tag === "input" && key === "type")
		) {
			vnode.dom[key] = null
		} else {
			var nsLastIndex = key.indexOf(":")
			if (nsLastIndex !== -1) key = key.slice(nsLastIndex + 1)
			if (old !== false) vnode.dom.removeAttribute(key === "className" ? "class" : key)
		}
	}
	function setLateSelectAttrs(vnode, attrs) {
		if ("value" in attrs) {
			if(attrs.value === null) {
				if (vnode.dom.selectedIndex !== -1) vnode.dom.value = null
			} else {
				var normalized = "" + attrs.value // eslint-disable-line no-implicit-coercion
				if (vnode.dom.value !== normalized || vnode.dom.selectedIndex === -1) {
					vnode.dom.value = normalized
				}
			}
		}
		if ("selectedIndex" in attrs) setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, undefined)
	}
	function updateAttrs(vnode, old, attrs, ns) {
		if (attrs != null) {
			for (var key in attrs) {
				setAttr(vnode, key, old && old[key], attrs[key], ns)
			}
		}
		var val
		if (old != null) {
			for (var key in old) {
				if (((val = old[key]) != null) && (attrs == null || attrs[key] == null)) {
					removeAttr(vnode, key, val, ns)
				}
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === activeElement() || vnode.tag === "option" && vnode.dom.parentNode === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function hasPropertyKey(vnode, key, ns) {
		// Filter out namespaced keys
		return ns === undefined && (
			// If it's a custom element, just keep it.
			vnode.tag.indexOf("-") > -1 || vnode.attrs != null && vnode.attrs.is ||
			// If it's a normal element, let's try to avoid a few browser bugs.
			key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height"// && key !== "type"
			// Defer the property check until *after* we check everything.
		) && key in vnode.dom
	}

	//style
	var uppercaseRegex = /[A-Z]/g
	function toLowerCase(capital) { return "-" + capital.toLowerCase() }
	function normalizeKey(key) {
		return key[0] === "-" && key[1] === "-" ? key :
			key === "cssFloat" ? "float" :
				key.replace(uppercaseRegex, toLowerCase)
	}
	function updateStyle(element, old, style) {
		if (old === style) {
			// Styles are equivalent, do nothing.
		} else if (style == null) {
			// New style is missing, just clear it.
			element.style.cssText = ""
		} else if (typeof style !== "object") {
			// New style is a string, let engine deal with patching.
			element.style.cssText = style
		} else if (old == null || typeof old !== "object") {
			// `old` is missing or a string, `style` is an object.
			element.style.cssText = ""
			// Add new style properties
			for (var key in style) {
				var value = style[key]
				if (value != null) element.style.setProperty(normalizeKey(key), String(value))
			}
		} else {
			// Both old & new are (different) objects.
			// Update style properties that have changed
			for (var key in style) {
				var value = style[key]
				if (value != null && (value = String(value)) !== String(old[key])) {
					element.style.setProperty(normalizeKey(key), value)
				}
			}
			// Remove style properties that no longer exist
			for (var key in old) {
				if (old[key] != null && style[key] == null) {
					element.style.removeProperty(normalizeKey(key))
				}
			}
		}
	}

	// Here's an explanation of how this works:
	// 1. The event names are always (by design) prefixed by `on`.
	// 2. The EventListener interface accepts either a function or an object
	//    with a `handleEvent` method.
	// 3. The object does not inherit from `Object.prototype`, to avoid
	//    any potential interference with that (e.g. setters).
	// 4. The event name is remapped to the handler before calling it.
	// 5. In function-based event handlers, `ev.target === this`. We replicate
	//    that below.
	// 6. In function-based event handlers, `return false` prevents the default
	//    action and stops event propagation. We replicate that below.
	function EventDict() {
		// Save this, so the current redraw is correctly tracked.
		this._ = currentRedraw
	}
	EventDict.prototype = Object.create(null)
	EventDict.prototype.handleEvent = function (ev) {
		var handler = this["on" + ev.type]
		var result
		if (typeof handler === "function") result = handler.call(ev.currentTarget, ev)
		else if (typeof handler.handleEvent === "function") handler.handleEvent(ev)
		if (this._ && ev.redraw !== false) (0, this._)()
		if (result === false) {
			ev.preventDefault()
			ev.stopPropagation()
		}
	}

	//event
	function updateEvent(vnode, key, value) {
		if (vnode.events != null) {
			if (vnode.events[key] === value) return
			if (value != null && (typeof value === "function" || typeof value === "object")) {
				if (vnode.events[key] == null) vnode.dom.addEventListener(key.slice(2), vnode.events, false)
				vnode.events[key] = value
			} else {
				if (vnode.events[key] != null) vnode.dom.removeEventListener(key.slice(2), vnode.events, false)
				vnode.events[key] = undefined
			}
		} else if (value != null && (typeof value === "function" || typeof value === "object")) {
			vnode.events = new EventDict()
			vnode.dom.addEventListener(key.slice(2), vnode.events, false)
			vnode.events[key] = value
		}
	}

	//lifecycle
	function initLifecycle(source, vnode, hooks) {
		if (typeof source.oninit === "function") callHook.call(source.oninit, vnode)
		if (typeof source.oncreate === "function") hooks.push(callHook.bind(source.oncreate, vnode))
	}
	function updateLifecycle(source, vnode, hooks) {
		if (typeof source.onupdate === "function") hooks.push(callHook.bind(source.onupdate, vnode))
	}
	function shouldNotUpdate(vnode, old) {
		do {
			if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") {
				var force = callHook.call(vnode.attrs.onbeforeupdate, vnode, old)
				if (force !== undefined && !force) break
			}
			if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeupdate === "function") {
				var force = callHook.call(vnode.state.onbeforeupdate, vnode, old)
				if (force !== undefined && !force) break
			}
			return false
		} while (false); // eslint-disable-line no-constant-condition
		vnode.dom = old.dom
		vnode.domSize = old.domSize
		vnode.instance = old.instance
		// One would think having the actual latest attributes would be ideal,
		// but it doesn't let us properly diff based on our current internal
		// representation. We have to save not only the old DOM info, but also
		// the attributes used to create it, as we diff *that*, not against the
		// DOM directly (with a few exceptions in `setAttr`). And, of course, we
		// need to save the children and text as they are conceptually not
		// unlike special "attributes" internally.
		vnode.attrs = old.attrs
		vnode.children = old.children
		vnode.text = old.text
		return true
	}

	return function(dom, vnodes, redraw) {
		if (!dom) throw new TypeError("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = []
		var active = activeElement()
		var namespace = dom.namespaceURI

		// First time rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = ""

		vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes])
		var prevRedraw = currentRedraw
		try {
			currentRedraw = typeof redraw === "function" ? redraw : undefined
			updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
		} finally {
			currentRedraw = prevRedraw
		}
		dom.vnodes = vnodes
		// `document.activeElement` can return null: https://html.spec.whatwg.org/multipage/interaction.html#dom-document-activeelement
		if (active != null && activeElement() !== active && typeof active.focus === "function") active.focus()
		for (var i = 0; i < hooks.length; i++) hooks[i]()
	}
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/trust.js":
/*!**********************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/trust.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/vnode.js")

module.exports = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/vnode.js":
/*!**********************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/render/vnode.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Vnode(tag, key, attrs, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs, children: children, text: text, dom: dom, domSize: undefined, state: undefined, events: undefined, instance: undefined}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node == null || typeof node === "boolean") return null
	if (typeof node === "object") return node
	return Vnode("#", undefined, undefined, String(node), undefined, undefined)
}
Vnode.normalizeChildren = function(input) {
	var children = []
	if (input.length) {
		var isKeyed = input[0] != null && input[0].key != null
		// Note: this is a *very* perf-sensitive check.
		// Fun fact: merging the loop like this is somehow faster than splitting
		// it, noticeably so.
		for (var i = 1; i < input.length; i++) {
			if ((input[i] != null && input[i].key != null) !== isKeyed) {
				throw new TypeError("Vnodes must either always have keys or never have keys!")
			}
		}
		for (var i = 0; i < input.length; i++) {
			children[i] = Vnode.normalize(input[i])
		}
	}
	return children
}

module.exports = Vnode


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/request.js":
/*!*****************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/request.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PromisePolyfill = __webpack_require__(/*! ./promise/promise */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/promise/promise.js")
var mountRedraw = __webpack_require__(/*! ./mount-redraw */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/mount-redraw.js")

module.exports = __webpack_require__(/*! ./request/request */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/request/request.js")(window, PromisePolyfill, mountRedraw.redraw)


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/request/request.js":
/*!*************************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/request/request.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildPathname = __webpack_require__(/*! ../pathname/build */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/pathname/build.js")

module.exports = function($window, Promise, oncompletion) {
	var callbackCount = 0

	function PromiseProxy(executor) {
		return new Promise(executor)
	}

	// In case the global Promise is some userland library's where they rely on
	// `foo instanceof this.constructor`, `this.constructor.resolve(value)`, or
	// similar. Let's *not* break them.
	PromiseProxy.prototype = Promise.prototype
	PromiseProxy.__proto__ = Promise // eslint-disable-line no-proto

	function makeRequest(factory) {
		return function(url, args) {
			if (typeof url !== "string") { args = url; url = url.url }
			else if (args == null) args = {}
			var promise = new Promise(function(resolve, reject) {
				factory(buildPathname(url, args.params), args, function (data) {
					if (typeof args.type === "function") {
						if (Array.isArray(data)) {
							for (var i = 0; i < data.length; i++) {
								data[i] = new args.type(data[i])
							}
						}
						else data = new args.type(data)
					}
					resolve(data)
				}, reject)
			})
			if (args.background === true) return promise
			var count = 0
			function complete() {
				if (--count === 0 && typeof oncompletion === "function") oncompletion()
			}

			return wrap(promise)

			function wrap(promise) {
				var then = promise.then
				// Set the constructor, so engines know to not await or resolve
				// this as a native promise. At the time of writing, this is
				// only necessary for V8, but their behavior is the correct
				// behavior per spec. See this spec issue for more details:
				// https://github.com/tc39/ecma262/issues/1577. Also, see the
				// corresponding comment in `request/tests/test-request.js` for
				// a bit more background on the issue at hand.
				promise.constructor = PromiseProxy
				promise.then = function() {
					count++
					var next = then.apply(promise, arguments)
					next.then(complete, function(e) {
						complete()
						if (count === 0) throw e
					})
					return wrap(next)
				}
				return promise
			}
		}
	}

	function hasHeader(args, name) {
		for (var key in args.headers) {
			if ({}.hasOwnProperty.call(args.headers, key) && name.test(key)) return true
		}
		return false
	}

	return {
		request: makeRequest(function(url, args, resolve, reject) {
			var method = args.method != null ? args.method.toUpperCase() : "GET"
			var body = args.body
			var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData)
			var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json")

			var xhr = new $window.XMLHttpRequest(), aborted = false
			var original = xhr, replacedAbort
			var abort = xhr.abort

			xhr.abort = function() {
				aborted = true
				abort.call(this)
			}

			xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)

			if (assumeJSON && body != null && !hasHeader(args, /^content-type$/i)) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (typeof args.deserialize !== "function" && !hasHeader(args, /^accept$/i)) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			if (args.timeout) xhr.timeout = args.timeout
			xhr.responseType = responseType

			for (var key in args.headers) {
				if ({}.hasOwnProperty.call(args.headers, key)) {
					xhr.setRequestHeader(key, args.headers[key])
				}
			}

			xhr.onreadystatechange = function(ev) {
				// Don't throw errors on xhr.abort().
				if (aborted) return

				if (ev.target.readyState === 4) {
					try {
						var success = (ev.target.status >= 200 && ev.target.status < 300) || ev.target.status === 304 || (/^file:\/\//i).test(url)
						// When the response type isn't "" or "text",
						// `xhr.responseText` is the wrong thing to use.
						// Browsers do the right thing and throw here, and we
						// should honor that and do the right thing by
						// preferring `xhr.response` where possible/practical.
						var response = ev.target.response, message

						if (responseType === "json") {
							// For IE and Edge, which don't implement
							// `responseType: "json"`.
							if (!ev.target.responseType && typeof args.extract !== "function") response = JSON.parse(ev.target.responseText)
						} else if (!responseType || responseType === "text") {
							// Only use this default if it's text. If a parsed
							// document is needed on old IE and friends (all
							// unsupported), the user should use a custom
							// `config` instead. They're already using this at
							// their own risk.
							if (response == null) response = ev.target.responseText
						}

						if (typeof args.extract === "function") {
							response = args.extract(ev.target, args)
							success = true
						} else if (typeof args.deserialize === "function") {
							response = args.deserialize(response)
						}
						if (success) resolve(response)
						else {
							try { message = ev.target.responseText }
							catch (e) { message = response }
							var error = new Error(message)
							error.code = ev.target.status
							error.response = response
							reject(error)
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}

			if (typeof args.config === "function") {
				xhr = args.config(xhr, args, url) || xhr

				// Propagate the `abort` to any replacement XHR as well.
				if (xhr !== original) {
					replacedAbort = xhr.abort
					xhr.abort = function() {
						aborted = true
						replacedAbort.call(this)
					}
				}
			}

			if (body == null) xhr.send()
			else if (typeof args.serialize === "function") xhr.send(args.serialize(body))
			else if (body instanceof $window.FormData) xhr.send(body)
			else xhr.send(JSON.stringify(body))
		}),
		jsonp: makeRequest(function(url, args, resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				delete $window[callbackName]
				script.parentNode.removeChild(script)
				resolve(data)
			}
			script.onerror = function() {
				delete $window[callbackName]
				script.parentNode.removeChild(script)
				reject(new Error("JSONP request failed"))
			}
			script.src = url + (url.indexOf("?") < 0 ? "?" : "&") +
				encodeURIComponent(args.callbackKey || "callback") + "=" +
				encodeURIComponent(callbackName)
			$window.document.documentElement.appendChild(script)
		}),
	}
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/route.js":
/*!***************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/route.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mountRedraw = __webpack_require__(/*! ./mount-redraw */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/mount-redraw.js")

module.exports = __webpack_require__(/*! ./api/router */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/node_modules/mithril/api/router.js")(window, mountRedraw)


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
const hsutil_1 = __webpack_require__(/*! hsutil */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/index.js");
const log = hsutil_1.log('Layout');
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
            log.info(`href ${node.attrs.href}`);
            attrs.href = node.attrs.href;
            attrs.target = attrs.target || '_blank';
            attrs.oncreate = mithril_1.m.route.link;
            attrs.onupdate = mithril_1.m.route.link;
            return mithril_1.m(`a.hs-layout ${css} ${this.getCSS(node)}`, attrs, content.map((c) => c));
        }
        else {
            return mithril_1.m(`.hs-layout ${css} ${this.getCSS(node)}`, attrs, content.map((c) => c));
        }
    }
}
exports.Layout = Layout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvTGF5b3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBcUNBLHdDQUFzQztBQUN0Qyx5Q0FBc0M7QUFDdEMsbUNBQXNDO0FBQUMsTUFBTSxHQUFHLEdBQUcsWUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBaUNsRSxNQUFhLE1BQU07SUFvQkwsYUFBYSxDQUFDLElBQVU7UUFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFO29CQUNiLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUNqQyxPQUFPLFdBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEM7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLENBQUM7aUJBQ1o7WUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFRUyxNQUFNLENBQUMsSUFBVTtRQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBUU8sZ0JBQWdCLENBQUMsVUFBNkM7UUFDbEUsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7WUFDaEMsT0FBTyxDQUFDLFdBQUMsQ0FBQyxVQUFVLEVBQUUsV0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFDRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQXlCLEVBQVEsRUFBRSxDQUNsRCxDQUFDLElBQUksWUFBWSxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDLENBQ2pFLENBQUM7U0FDTDtRQUVELE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBcUJELElBQUksQ0FBQyxJQUFVO1FBQ1gsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLEdBQUcsR0FBRyxtQkFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE1BQU0sS0FBSyxHQUFPO1lBQ2QsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztTQUM5QixDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDakIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNwQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzdCLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUM7WUFDeEMsS0FBSyxDQUFDLFFBQVEsR0FBRyxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUM5QixLQUFLLENBQUMsUUFBUSxHQUFHLFdBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBRTlCLE9BQU8sV0FBQyxDQUFDLGVBQWUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6RjthQUFNO1lBQ0gsT0FBTyxXQUFDLENBQUMsY0FBYyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hGO0lBQ0wsQ0FBQztDQUNKO0FBckdELHdCQXFHQyJ9

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
                return true;
            }
            return false;
        });
        return css;
    }
}
exports.Layouter = Layouter;
Layouter.layoutStyles = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9MYXlvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVlBLHFDQUF3QztBQXNCeEMsTUFBc0IsUUFBUTtJQXlFMUIsWUFBbUIsUUFBc0I7UUFBdEIsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQVJ6QyxZQUFPLEdBQUcsQ0FBQyxDQUFDO0lBUWdDLENBQUM7SUF6RHJDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBd0I7UUFDN0MsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FBRTtRQUM3QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFnQixFQUFFLEVBQUU7WUFDbkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFBRSxPQUFPLFdBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFBRTtnQkFDekQsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUFFLE9BQU8sV0FBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUFFO2dCQUN4RCxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBRyxNQUFNLEVBQUU7b0JBQUUsT0FBTyxhQUFJLENBQUM7aUJBQUM7YUFDcEQ7aUJBQU07Z0JBQ0gsT0FBTyxLQUFLLENBQUM7YUFDaEI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFXTSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQWMsRUFBRSxLQUFxQjtRQUV4RCxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMzQyxDQUFDO0lBVU0sTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFTLEVBQUUsVUFBdUI7UUFDekQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNaLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFM0YsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDOztBQTlETCw0QkEwRkM7QUFyRlUscUJBQVksR0FBdUIsRUFBRSxDQUFDIn0=

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
    getStyles(components) {
        let f = this.fields;
        let styles = this.unit(components.length);
        components.map((c, i) => {
            c.style = `${f[0]}:0%; ${f[1]}:0%; `;
            Object.keys(styles[i].fields).forEach((st) => { c.style += `${st}: ${styles[i].fields[st]};`; });
        });
        return this.cssClass;
    }
}
class Columns extends PillarLayouter {
    constructor(areaDesc) {
        super(cParams[exports.PillarLayouts[0]], areaDesc);
        this.areaDesc = areaDesc;
    }
}
class Rows extends PillarLayouter {
    constructor(areaDesc) {
        super(cParams[exports.PillarLayouts[1]], areaDesc);
        this.areaDesc = areaDesc;
    }
}
Layouter_1.Layouter.register(exports.PillarLayouts[0], Columns);
Layouter_1.Layouter.register(exports.PillarLayouts[1], Rows);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlsbGFyZWRMYXlvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3L1BpbGxhcmVkTGF5b3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUEyQ0EseUNBQTBDO0FBQzFDLHFDQUV3QztBQWdCM0IsUUFBQSxhQUFhLEdBQUc7SUFDekIsU0FBUyxFQUFFLE1BQU07Q0FDcEIsQ0FBQztBQUtGLE1BQU0sT0FBTyxHQUFHO0lBQ1osT0FBTyxFQUFnQjtRQUNuQixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO0tBQ2hFO0lBQ0QsSUFBSSxFQUFnQjtRQUNoQixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO0tBQ2hFO0NBQ0osQ0FBQztBQU9GLE1BQWUsY0FBZSxTQUFRLG1CQUFRO0lBYTFDLFlBQVksTUFBbUIsRUFBUyxRQUFzQjtRQUMxRCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFEb0IsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUUxRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBRWhDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksSUFBSSxHQUFJLENBQUMsQ0FBQztRQUVkLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLG1CQUFVLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDMUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUd0QyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBZ0IsRUFBRSxDQUFRLEVBQUUsRUFBRSxDQUN6QyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFjLHFCQUFZLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBR2pFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFnQixFQUFFLENBQVEsRUFBRSxFQUFFLENBQ3pDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxZQUFZLHFCQUFZLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxJQUFJLEdBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWpFLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBU08sUUFBUSxDQUFDLEdBQVU7UUFDdkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM5QixNQUFNLElBQUksR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzdCLE1BQU0sSUFBSSxHQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUV4QixPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRTtZQUMzQyxJQUFJLElBQUksR0FBVSxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFDLENBQUMsR0FBQyxJQUFJLEVBQUc7Z0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQUU7aUJBQ3BFLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRztnQkFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7YUFBRTtpQkFDMUQsSUFBSSxHQUFHLEdBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBRyxLQUFLLEVBQUM7Z0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQzthQUFFO1lBQzVFLE9BQU8sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFDLEVBQUUsRUFBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLFdBQVcsQ0FBQyxHQUFVO1FBQzFCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEIsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLElBQUksTUFBTSxHQUFnQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFBQyxHQUFHLEVBQUUsQ0FBQztTQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEYsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUV2QixTQUFTLElBQUksQ0FBQyxNQUFtQixFQUFFLEdBQVUsRUFBRSxHQUFVLEVBQUUsU0FBZ0M7WUFDdkYsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDaEIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUM7Z0JBQ2hDLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFBRSxPQUFPLElBQUksQ0FBQztpQkFBRTtnQkFDM0MsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUMsR0FBRyxDQUFDO2dCQUMvQixNQUFNLElBQUksSUFBSSxDQUFDO2dCQUNmLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUMsTUFBTSxDQUFDLEdBQUMsR0FBRyxDQUFDO2dCQUNyQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFDNUIsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUcsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUcsS0FBSyxDQUFDLENBQUM7UUFDNUQsT0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVPLFNBQVMsQ0FBQyxHQUFVO1FBQ3hCLElBQUksTUFBTSxHQUFnQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFcEIsSUFBSSxNQUFNLEdBQUcsS0FBSyxHQUFDLEdBQUcsQ0FBQztRQUd2QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JCLElBQUksS0FBSyxDQUFDLElBQUksS0FBRyxPQUFPLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFFLElBQUksQ0FBQztnQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7Z0JBQzVCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRSxJQUFJLENBQUM7YUFDekM7aUJBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDNUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDbkUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNaLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUM5QyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQzthQUMvQjtpQkFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUcsS0FBSyxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFHSCxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkMsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtnQkFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7Z0JBQzVCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUM7YUFDeEM7aUJBQU07Z0JBQ0gsSUFBSSxNQUFNLEdBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO29CQUNwQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztpQkFDL0I7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQVFTLFNBQVMsQ0FBQyxVQUE4QjtRQUM5QyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BCLElBQUksTUFBTSxHQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RCxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBYyxFQUFFLENBQVEsRUFBRSxFQUFFO1lBQ3hDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBUyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLEdBQUcsRUFBRSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVHLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7Q0FDSjtBQTJERCxNQUFNLE9BQVEsU0FBUSxjQUFjO0lBQ2hDLFlBQW1CLFFBQXNCO1FBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxxQkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFBckUsYUFBUSxHQUFSLFFBQVEsQ0FBYztJQUFpRCxDQUFDO0NBQzlGO0FBMkRELE1BQU0sSUFBSyxTQUFRLGNBQWM7SUFDN0IsWUFBbUIsUUFBc0I7UUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLHFCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUFyRSxhQUFRLEdBQVIsUUFBUSxDQUFjO0lBQWlELENBQUM7Q0FDOUY7QUFFRCxtQkFBUSxDQUFDLFFBQVEsQ0FBQyxxQkFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzdDLG1CQUFRLENBQUMsUUFBUSxDQUFDLHFCQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUssSUFBSSxDQUFDLENBQUMifQ==

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
    getStyles(components) {
        let styles = this.unit(components.length);
        components.map((c, i) => {
            c.style = styles[i];
        });
        return '.hs-tile-layout';
    }
}
Layouter_1.Layouter.register('tiles', TileLayouter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGlsZUxheW91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvVGlsZUxheW91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBOERBLHlDQUEwQztBQUMxQyxxQ0FHd0M7QUFPeEMsTUFBTSxZQUFhLFNBQVEsbUJBQVE7SUFRL0IsWUFBbUIsUUFBc0I7UUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBREQsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUlyQyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxtQkFBVSxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQzFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUMsQ0FBQztJQUVPLFdBQVcsQ0FBQyxHQUFVO1FBQzFCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDM0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxrQkFBUyxDQUFDLENBQUMsQ0FBQztRQUMvRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7WUFBRSxJQUFJLEVBQUUsQ0FBQztTQUFFO1FBQzVCLElBQUksS0FBSyxHQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLHFCQUFZLENBQUMsQ0FBQSxDQUFDLENBQUMs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

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

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/Checksum.js":
/*!*******************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/Checksum.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function shortCheckSum(s) {
    var chk = 0x12345678;
    var len = s.length;
    for (var i = 0; i < len; i++) {
        chk += (s.charCodeAt(i) * (i + 1));
    }
    return (chk & 0xffffffff).toString(16);
}
exports.shortCheckSum = shortCheckSum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tzdW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ2hlY2tzdW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQyxTQUFnQixhQUFhLENBQUMsQ0FBUTtJQUNuQyxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUM7SUFDckIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0QztJQUNELE9BQU8sQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFQRCxzQ0FPQyJ9

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/Date.js":
/*!***************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/Date.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const monthStr = [
    ['Jan', 'January'], ['Feb', 'February'], ['Mar', 'March'], ['Apr', 'April'], ['May', 'May'], ['Jun', 'June'],
    ['Jul', 'July'], ['Aug', 'August'], ['Sep', 'September'], ['Oct', 'October'], ['Nov', 'November'], ['Dec', 'December']
];
const dayStr = [
    ['Sun', 'Sunday'], ['Mon', 'Monday'], ['Tue', 'Tuesday'], ['Wed', 'Wednesday'], ['Thu', 'Thursday'], ['Fri', 'Friday'], ['Sat', 'Saturday']
];
function formatNumber(number, digits) {
    var r = '' + number;
    while (r.length < digits) {
        r = "0" + r;
    }
    return r;
}
function date(formatString, date = new Date()) {
    return (typeof formatString !== 'string' || isNaN(date.getTime())) ?
        'invalid' :
        formatString
            .replace(/%YYYY/g, '' + date.getFullYear())
            .replace(/%YY/g, '' + (date.getFullYear() % 100))
            .replace(/%MMMM/g, monthStr[date.getMonth()][1])
            .replace(/%MMM/g, monthStr[date.getMonth()][0])
            .replace(/%MM/g, formatNumber(date.getMonth() + 1, 2))
            .replace(/%M/g, '' + (date.getMonth() + 1))
            .replace(/%DDDD/g, dayStr[date.getDay()][1])
            .replace(/%DDD/g, dayStr[date.getDay()][0])
            .replace(/%DD/g, formatNumber(date.getDate(), 2))
            .replace(/%D/g, '' + date.getDate())
            .replace(/%hh/g, formatNumber(date.getHours(), 2))
            .replace(/%h/g, '' + date.getHours())
            .replace(/%mm/g, formatNumber(date.getMinutes(), 2))
            .replace(/%m/g, '' + date.getMinutes())
            .replace(/%ss/g, formatNumber(date.getSeconds(), 2))
            .replace(/%jjj/g, formatNumber(date.getMilliseconds(), 3))
            .replace(/%jj/g, formatNumber(date.getMilliseconds() / 10, 2))
            .replace(/%j/g, formatNumber(date.getMilliseconds() / 100, 1));
}
exports.date = date;
exports.ms = {
    fromMinutes: (min) => 1000 * 60 * min,
    fromHours: (h) => 1000 * 60 * 60 * h,
    fromDays: (d) => 1000 * 60 * 60 * 24 * d,
    fromWeeks: (w) => 1000 * 60 * 60 * 24 * 7 * w,
    toMinutes: (ms) => ms / (1000 * 60),
    toHours: (ms) => ms / (1000 * 60 * 60),
    toDays: (ms) => ms / (1000 * 60 * 60 * 24),
    toWeeks: (ms) => ms / (1000 * 60 * 60 * 24 * 7)
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9EYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBZUEsTUFBTSxRQUFRLEdBQUc7SUFDYixDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7SUFDNUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDO0NBQUMsQ0FBQztBQUc1SCxNQUFNLE1BQU0sR0FBRztJQUNYLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQztDQUFDLENBQUM7QUFHM0ksU0FBUyxZQUFZLENBQUMsTUFBYSxFQUFFLE1BQWE7SUFDOUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFDLE1BQU0sQ0FBQztJQUNsQixPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO1FBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FBRTtJQUMxQyxPQUFP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QUksR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxDQUFDO0lBQy9DLFNBQVMsRUFBTyxDQUFDLENBQVEsRUFBSSxFQUFFLENBQUMsSUFBSSxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLENBQUMsR0FBQyxDQUFDO0lBQ2pELFNBQVMsRUFBTyxDQUFDLEVBQVMsRUFBRyxFQUFFLENBQUMsRUFBRSxHQUFDLENBQUMsSUFBSSxHQUFDLEVBQUUsQ0FBQztJQUM1QyxPQUFPLEVBQVMsQ0FBQyxFQUFTLEVBQUcsRUFBRSxDQUFDLEVBQUUsR0FBQyxDQUFDLElBQUksR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDO0lBQy9DLE1BQU0sRUFBVSxDQUFDLEVBQVMsRUFBRyxFQUFFLENBQUMsRUFBRSxHQUFDLENBQUMsSUFBSSxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDO0lBQ2xELE9BQU8sRUFBUyxDQUFDLEVBQVMsRUFBRyxFQUFFLENBQUMsRUFBRSxHQUFDLENBQUMsSUFBSSxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQztDQUN2RCxDQUFDIn0=

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/Number.js":
/*!*****************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/Number.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function round(n, d = 0) {
    const f = Math.pow(10, d);
    const r = Math.round(n * f) / f;
    return '' + r;
}
exports.round = round;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL051bWJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVdDLFNBQWdCLEtBQUssQ0FBQyxDQUFRLEVBQUUsQ0FBQyxHQUFDLENBQUM7SUFPaEMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0lBQzVCLE9BQU8sRUFBRSxHQUFDLENBQUMsQ0FBQztBQUNmLENBQUM7QUFWRCxzQkFVQyJ9

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/TimedPromises.js":
/*!************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/TimedPromises.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function timeout(ms) {
    return new Promise((resolve, reject) => { setTimeout(reject, ms); });
}
exports.timeout = timeout;
function delay(ms) {
    return (args) => {
        return new Promise((resolve) => {
            setTimeout(() => { resolve(args); }, ms);
        });
    };
}
exports.delay = delay;
class Pace {
    constructor(pace = 100, maxConcurrent = -1) {
        this.maxConcurrent = -1;
        this.waitUntil = 0;
        this.waitCount = 0;
        this.beingCalled = 0;
        this.pace = pace + 5;
        this.maxConcurrent = maxConcurrent;
    }
    getWaitCount() { return this.waitCount; }
    getCallingCount() { return this.beingCalled; }
    add(fn) {
        return __awaiter(this, void 0, void 0, function* () {
            const addTime = Date.now();
            if (this.waitUntil < addTime) {
                this.waitUntil = addTime;
            }
            const diff = this.waitUntil - addTime;
            this.waitUntil += this.pace + 5;
            this.waitCount++;
            yield delay(diff)();
            yield new Promise(resolve => {
                const waitLoop = () => {
                    if (this.maxConcurrent < 0 || this.beingCalled < this.maxConcurrent) {
                        resolve();
                    }
                    else {
                        setTimeout(waitLoop, 10);
                    }
                };
                waitLoop();
            });
            this.waitCount--;
            this.beingCalled++;
            const ret = yield fn(Date.now() - addTime);
            this.beingCalled--;
            return ret;
        });
    }
}
exports.Pace = Pace;
function promiseChain(tasks, initialResult = []) {
    return tasks.reduce((chain, task) => chain.then((_results) => Promise.resolve(task(_results)).then((r) => {
        _results.push(r);
        return _results;
    })), Promise.resolve(initialResult));
}
exports.promiseChain = promiseChain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZWRQcm9taXNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9UaW1lZFByb21pc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBV0EsU0FBZ0IsT0FBTyxDQUFDLEVBQVM7SUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBRkQsMEJBRUM7QUF1QkQsU0FBZ0IsS0FBSyxDQUFDLEVBQVM7SUFDM0IsT0FBTyxDQUFJLElBQU8sRUFBYSxFQUFFO1FBQzdCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFzQixFQUFFLEVBQUU7WUFDMUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQztBQUNOLENBQUM7QUFORCxzQkFNQztBQWFELE1BQWEsSUFBSTtJQVliLFlBQVksSUFBSSxHQUFDLEdBQUcsRUFBRSxhQUFhLEdBQUMsQ0FBQyxDQUFDO1FBWDlCLGtCQUFhLEdBQUssQ0FBQyxDQUFDLENBQUM7UUFFckIsY0FBUyxHQUFTLENBQUMsQ0FBQztRQUNwQixjQUFTLEdBQVMsQ0FBQyxDQUFDO1FBQ3BCLGdCQUFXLEdBQU8sQ0FBQyxDQUFDO1FBUXhCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFDLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsWUFBWSxLQUFRLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsZUFBZSxLQUFLLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFReEMsR0FBRyxDQUFDLEVBQWlDOztZQUN2QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDM0IsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sRUFBRTtnQkFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQzthQUFFO1lBQzNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDcEIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDeEIsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO29CQUNsQixJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTt3QkFDakUsT0FBTyxFQUFFLENBQUM7cUJBQ2I7eUJBQU07d0JBQ0gsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztxQkFDNUI7Z0JBQ0wsQ0FBQyxDQUFDO2dCQUNGLFFBQVEsRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO0tBQUE7Q0FDSjtBQWpERCxvQkFpREM7QUFXRCxTQUFnQixZQUFZLENBQUksS0FBcUMsRUFBRSxnQkFBa0IsRUFBRTtJQUN2RixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFrQixFQUFFLElBQStCLEVBQWdCLEVBQUUsQ0FFdEYsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFHLEVBQUUsRUFBRTtRQUV0RSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDLEVBQ0gsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FDakMsQ0FBQztBQUNOLENBQUM7QUFWRCxvQ0FVQyJ9

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/index.js":
/*!****************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TimedPromises_1 = __webpack_require__(/*! ./TimedPromises */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/TimedPromises.js");
exports.timeout = TimedPromises_1.timeout;
exports.delay = TimedPromises_1.delay;
var TimedPromises_2 = __webpack_require__(/*! ./TimedPromises */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/TimedPromises.js");
exports.Pace = TimedPromises_2.Pace;
var TimedPromises_3 = __webpack_require__(/*! ./TimedPromises */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/TimedPromises.js");
exports.promiseChain = TimedPromises_3.promiseChain;
var Checksum_1 = __webpack_require__(/*! ./Checksum */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/Checksum.js");
exports.shortCheckSum = Checksum_1.shortCheckSum;
var Date_1 = __webpack_require__(/*! ./Date */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/Date.js");
exports.date = Date_1.date;
exports.ms = Date_1.ms;
var Number_1 = __webpack_require__(/*! ./Number */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/Number.js");
exports.round = Number_1.round;
var log_1 = __webpack_require__(/*! ./log */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/log.js");
exports.log = log_1.log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBdUQ7QUFBOUMsa0NBQUEsT0FBTyxDQUFBO0FBQUUsZ0NBQUEsS0FBSyxDQUFBO0FBQ3ZCLGlEQUF1RDtBQUE5QywrQkFBQSxJQUFJLENBQUE7QUFDYixpREFBdUQ7QUFBOUMsdUNBQUEsWUFBWSxDQUFBO0FBQ3JCLHVDQUFrRDtBQUF6QyxtQ0FBQSxhQUFhLENBQUE7QUFDdEIsK0JBQThDO0FBQXJDLHNCQUFBLElBQUksQ0FBQTtBQUFFLG9CQUFBLEVBQUUsQ0FBQTtBQUNqQixtQ0FBZ0Q7QUFBdkMseUJBQUEsS0FBSyxDQUFBO0FBQ2QsNkJBQTZDO0FBQXBDLG9CQUFBLEdBQUcsQ0FBQSJ9

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/log.js":
/*!**************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/log.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Date_1 = __webpack_require__(/*! ./Date */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/Date.js");
const DEBUG = Symbol('DEBUG');
const INFO = Symbol('INFO');
const WARN = Symbol('WARN');
const ERROR = Symbol('ERROR');
let gLogFile;
const gLevels = {
    [DEBUG]: { importance: 0, sym: DEBUG, desc: 'DEBUG' },
    [INFO]: { importance: 1, sym: INFO, desc: 'INFO' },
    [WARN]: { importance: 2, sym: WARN, desc: 'WARN' },
    [ERROR]: { importance: 3, sym: ERROR, desc: 'ERROR' }
};
let gGlobalLevel = gLevels[INFO];
const defDateFormat = '%YYYY%MM%DD %hh:%mm:%ss.%jjj';
let gDateFormat = defDateFormat;
let gColors = false;
const color = {
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m',
    green: '\x1b[32m',
    bold: '\x1b[1m',
    clear: '\x1b[0m'
};
exports.log = create('', (filename, msg) => Promise.resolve(undefined), (path) => Promise.resolve(path.indexOf('/') >= 0 ? false : true));
function create(_prefix, logToFile, pathExists) {
    const context = {
        level: undefined,
        prefix: _prefix,
        logToFile: logToFile,
        pathExists: pathExists
    };
    function level(newLevelSym, setGlobalLevel = false) {
        let newLevel = gLevels[newLevelSym] || gGlobalLevel;
        let oldLevel = context.level || gGlobalLevel;
        if (newLevelSym === undefined) {
            newLevel = oldLevel;
        }
        else if (newLevelSym === null) {
            context.level = undefined;
        }
        else if (gLevels[newLevelSym]) {
            if (setGlobalLevel) {
                gGlobalLevel = newLevel;
            }
            else {
                context.level = newLevel;
            }
            const msg = `new ${setGlobalLevel ? 'global' : context.prefix} log level ${newLevel.desc.toUpperCase()} (was ${oldLevel.desc.toUpperCase()})`;
            out((newLevel.sym === oldLevel.sym) ? DEBUG : INFO, msg);
        }
        else {
            out(ERROR, `unkown level ${newLevelSym.toString()}; log level remains ${oldLevel.sym.toString()}`);
        }
        return newLevel.sym;
    }
    function debug(msg, log2File = true) {
        return __awaiter(this, void 0, void 0, function* () { return yield out(DEBUG, msg, log2File); });
    }
    function info(msg, log2File = true) {
        return __awaiter(this, void 0, void 0, function* () { return yield out(INFO, msg, log2File); });
    }
    function warn(msg, log2File = true) {
        return __awaiter(this, void 0, void 0, function* () { return yield out(WARN, msg, log2File); });
    }
    function error(msg, log2File = true) {
        return __awaiter(this, void 0, void 0, function* () { return yield out(ERROR, msg, log2File); });
    }
    function format(fmtStr) {
        if (fmtStr === null) {
            gDateFormat = defDateFormat;
        }
        else if (fmtStr) {
            gDateFormat = fmtStr;
        }
        return gDateFormat;
    }
    function prefix(prf) {
        if (prf) {
            context.prefix = prf;
        }
        return context.prefix;
    }
    function out(lvl, msg, log2File = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const colors = { [ERROR]: color.red + color.bold, [WARN]: color.yellow + color.bold, [DEBUG]: color.blue, [INFO]: color.green };
            let desc = gLevels[lvl];
            const filterLevel = context.level || gGlobalLevel;
            if (desc.importance >= filterLevel.importance) {
                const dateStr = Date_1.date(gDateFormat);
                let line = (typeof msg === 'string') ? msg : inspect(msg, 0);
                const logLine = `${dateStr} ${context.prefix} ${desc.desc} ${line}`;
                const colorLine = `${colors[lvl] || ''} ${dateStr} ${context.prefix} ${desc.desc} ${color.clear} ${line}`;
                console.log(gColors ? colorLine : logLine);
                if (msg && msg.stack) {
                    console.log(msg.stack);
                }
                if (gLogFile && log2File) {
                    return yield context.logToFile(Date_1.date(gLogFile), logLine);
                }
            }
            return undefined;
        });
    }
    function logFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (file === null) {
                gLogFile = undefined;
                return yield info("disabling logfile");
            }
            else if (file === undefined) {
                return Date_1.date(gLogFile);
            }
            else if (file.indexOf('/') >= 0) {
                return yield context.pathExists(file)
                    .then((exists) => __awaiter(this, void 0, void 0, function* () {
                    if (!exists) {
                        gLogFile = undefined;
                        return yield warn(`path '${file}' doesn't exists; logfile disabled`);
                    }
                    gLogFile = file;
                    return yield info("now logging to file " + Date_1.date(file));
                }))
                    .catch(() => __awaiter(this, void 0, void 0, function* () {
                    gLogFile = undefined;
                    return yield error(`checking path ${file}; logfile disabled`);
                }));
            }
            else if (file === '') {
                file = 'log-%YYYY-%MM-%DD.txt';
            }
            else {
            }
            gLogFile = file;
            return yield info(gLogFile ? `now logging to file ${Date_1.date(gLogFile)}` : 'logfile disbaled');
        });
    }
    function config(cfg) {
        if (cfg.colors !== undefined) {
            gColors = cfg.colors;
        }
        if (cfg.format !== undefined) {
            format(cfg.format);
        }
        if (cfg.level !== undefined) {
            level(cfg.level);
        }
    }
    function inspect(msg, depth = 3, indent = '   ', colors) {
        function _inspect(msg, depth, level, currIndent) {
            if (msg === null) {
                return 'null';
            }
            if (msg === undefined) {
                return 'undefined';
            }
            if (typeof msg === 'function') {
                return 'function';
            }
            if (typeof msg === 'string') {
                return `'${msg}'`;
            }
            if (typeof msg === 'object') {
                if (depth < 0) {
                    return (msg.length === undefined) ? '{...}' : '[...]';
                }
                if (msg.length !== undefined) {
                    return `[${msg.map((e) => (e === undefined) ? '' : _inspect(e, depth - 1, level + 1, currIndent)).join(', ')}]`;
                }
                const c = colors ? `<b><span style='color:${colors[level % colors.length]};'>` : '';
                const prefix = `${c}${currIndent}${indent}`;
                const postfix = colors ? '</span></b>' : '';
                return '{\n' + Object.keys(msg).map(k => `${prefix}${k}${postfix}: ${_inspect(msg[k], depth - 1, level + 1, currIndent + indent)}`).join(',\n') + `\n${currIndent}}`;
            }
            return msg.toString();
        }
        if (colors) {
            indent = indent.replace(/ /g, '&nbsp;');
        }
        return _inspect(msg, depth === null ? 999 : depth, 0, '');
    }
    const newLog = (prefix, logToFile = context.logToFile, pathExists = context.pathExists) => create(prefix, logToFile, pathExists);
    newLog.DEBUG = DEBUG;
    newLog.INFO = INFO;
    newLog.WARN = WARN;
    newLog.ERROR = ERROR;
    newLog.level = level;
    newLog.debug = debug;
    newLog.info = info;
    newLog.warn = warn;
    newLog.error = error;
    newLog.format = format;
    newLog.prefix = prefix;
    newLog.out = out;
    newLog.logFile = logFile;
    newLog.config = config;
    newLog.inspect = inspect;
    return newLog;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQStFQSxpQ0FBa0M7QUFHbEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRzlCLE1BQU0sSUFBSSxHQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUc5QixNQUFNLElBQUksR0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHOUIsTUFBTSxLQUFLLEdBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRy9CLElBQUksUUFBZ0IsQ0FBQztBQVNyQixNQUFNLE9BQU8sR0FBRztJQUNaLENBQUMsS0FBSyxDQUFDLEVBQUssRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztJQUN0RCxDQUFDLElBQUksQ0FBQyxFQUFNLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRSxNQUFNLEVBQUM7SUFDckQsQ0FBQyxJQUFJLENBQUMsRUFBTSxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRyxJQUFJLEVBQUUsTUFBTSxFQUFDO0lBQ3JELENBQUMsS0FBSyxDQUFDLEVBQUssRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztDQUN6RCxDQUFDO0FBR0YsSUFBSSxZQUFZLEdBQWEsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRzNDLE1BQU0sYUFBYSxHQUFHLDhCQUE4QixDQUFDO0FBQ3JELElBQUksV0FBVyxHQUFPLGFBQWEsQ0FBQztBQUdwQyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFHcEIsTUFBTSxLQUFLLEdBQUc7SUFDVixHQUFHLEVBQUssVUFB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T0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFdkosTUFBTSxDQUFDLEtBQUssR0FBTSxLQUFLLENBQUM7SUFDeEIsTUFBTSxDQUFDLElBQUksR0FBTyxJQUFJLENBQUM7SUFDdkIsTUFBTSxDQUFDLElBQUksR0FBTyxJQUFJLENBQUM7SUFDdkIsTUFBTSxDQUFDLEtBQUssR0FBTSxLQUFLLENBQUM7SUFDeEIsTUFBTSxDQUFDLEtBQUssR0FBTSxLQUFLLENBQUM7SUFDeEIsTUFBTSxDQUFDLEtBQUssR0FBTSxLQUFLLENBQUM7SUFDeEIsTUFBTSxDQUFDLElBQUksR0FBTyxJQUFJLENBQUM7SUFDdkIsTUFBTSxDQUFDLElBQUksR0FBTyxJQUFJLENBQUM7SUFDdkIsTUFBTSxDQUFDLEtBQUssR0FBTSxLQUFLLENBQUM7SUFDeEIsTUFBTSxDQUFDLE1BQU0sR0FBSyxNQUFNLENBQUM7SUFDekIsTUFBTSxDQUFDLE1BQU0sR0FBSyxNQUFNLENBQUM7SUFDekIsTUFBTSxDQUFDLEdBQUcsR0FBUSxHQUFHLENBQUM7SUFDdEIsTUFBTSxDQUFDLE9BQU8sR0FBSSxPQUFPLENBQUM7SUFDMUIsTUFBTSxDQUFDLE1BQU0sR0FBSyxNQUFNLENBQUM7SUFDekIsTUFBTSxDQUFDLE9BQU8sR0FBSSxPQUFPLENBQUM7SUFDMUIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyJ9

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
        node.state.intial = true;
        node.state.expanded = false;
        node.state.toggle = () => {
            node.state.expanded = !node.state.expanded;
            node.state.initial = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFwc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ29sbGFwc2libGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpREEsdUNBQW9DO0FBRXBDLE1BQWEsV0FBVztJQUNwQixNQUFNLENBQUMsSUFBVTtRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBVTtRQUNYLE1BQU0sR0FBRyxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3pDLE1BQU0sUUFBUSxHQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLE1BQU0sU0FBUyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3hDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUcsU0FBUyxFQUFFO1lBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1NBQy9DO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFBLHlCQUF5QixDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUM7UUFDaEUsT0FBTyxZQUFDLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxFQUFFO1lBQy9CLFlBQUMsQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLE9BQU8sRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQyxFQUFFO2dCQUNyRCxDQUFDLFFBQVEsQ0FBQSxDQUFDLENBQUMsWUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFDLENBQUMsNkNBQTZDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6RyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNiLENBQUMsU0FBUyxDQUFBLENBQUMsQ0FBQyxZQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQUMsQ0FBQyw4Q0FBOEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDN0csQ0FBQztZQUNGLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsWUFBQyxDQUFDLDJCQUEyQixNQUFNLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUUsQ0FBQSxZQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztTQUMxRyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUEzQkQsa0NBMkJDIn0=

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
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
const hslayout_2 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
const RadioButton_1 = __webpack_require__(/*! ./RadioButton */ "./bin/RadioButton.js");
class Menu extends RadioButton_1.RadioButton {
    view(node) { return RadioButton_1.RadioButton.viewGroup('.hs-menu', node); }
}
exports.Menu = Menu;
class MenuPanel extends hslayout_2.Layout {
    oninit(node) {
        this.selected = node.attrs.items.indexOf(node.attrs.defaultItem);
    }
    view(node) {
        let items = node.attrs.items;
        return hslayout_1.m(hslayout_2.Layout, {
            rows: ["30px", "fill"],
            content: [
                hslayout_1.m(Menu, { desc: {
                        items: items,
                        defaultItem: node.attrs.defaultItem,
                        clicked: (item) => this.selected = items.indexOf(item)
                    } }),
                hslayout_1.m(hslayout_2.Layout, { css: '.hs-menu-panel', content: node.attrs.content[this.selected] })
            ]
        });
    }
}
exports.MenuPanel = MenuPanel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBa0ZBLHVDQUF3QztBQUN4Qyx1Q0FBd0M7QUFDeEMsK0NBQTZDO0FBZTdDLE1BQWEsSUFBSyxTQUFRLHlCQUFXO0lBQ2pDLElBQUksQ0FBQyxJQUFXLElBQVcsT0FBTyx5QkFBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQy9FO0FBRkQsb0JBRUM7QUFrQkQsTUFBYSxTQUFVLFNBQVEsaUJBQU07SUFFakMsTUFBTSxDQUFDLElBQVc7UUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBVztRQUNaLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzdCLE9BQU8sWUFBQyxDQUFDLGlCQUFNLEVBQUU7WUFDYixJQUFJLEVBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3JCLE9BQU8sRUFBQztnQkFDSixZQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFO3dCQUNaLEtBQUssRUFBRSxLQUFLO3dCQUNaLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7d0JBQ25DLE9BQU8sRUFBRSxDQUFDLElBQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztxQkFDaEUsRUFBQyxDQUFDO2dCQUNILFlBQUMsQ0FBQyxpQkFBTSxFQUFFLEVBQUUsR0FBRyxFQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQzthQUNsRjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQW5CRCw4QkFtQkMifQ==

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
        node.state.updateModel = model;
        node.state.items = [];
        node.state.events = {};
        node.state.itemClicked = (item) => item;
        node.state.defaultItem = node.attrs.desc.defaultItem;
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
            else if (node.state.items) {
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
        node.state.range = [];
        node.state.value = 0.5;
        node.state.mouse = -1;
        node.state.slider = 0;
        node.state.notified = '';
        node.state.onchange = () => { };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTBDQSx1Q0FBb0M7QUFvQnBDLE1BQWEsTUFBTTtJQUNmLE1BQU0sQ0FBQyxJQUFVO1FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNHLElBQUksQ0FBQyxJQUFXO1FBQ1osTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUMxQyxPQUFPLFlBQUMsQ0FBQyxjQUFjLEdBQUcsRUFBRSxFQUFFO1lBQzFCLEVBQUUsRUFBQyxFQUFFO1lBQ0wsV0FBVyxFQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUN6QyxXQUFXLEVBQUMsQ0FBQyxDQUFLLEVBQUUsRUFB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QUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3pCO0FBQ0wsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFDLENBQUssRUFBRSxJQUFVO0lBQy9CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLFdBQVcsRUFBRTtRQUNqRSxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQztBQUVELFNBQVMsTUFBTSxDQUFDLElBQVU7SUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUksUUFBUSxDQUFDLEVBQUU7UUFDM0UsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMzRSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckQ7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxQztTQUFNO1FBQ0gsTUFBTSxRQUFRLEdBQXFCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBQyxHQUFHLENBQUMsR0FBQyxHQUFHLENBQUM7UUFDaEcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQzNCO0FBQ0wsQ0FBQyJ9

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
var Menu_2 = __webpack_require__(/*! ./Menu */ "./bin/Menu.js");
exports.MenuPanel = Menu_2.MenuPanel;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSwrQkFBc0M7QUFBN0Isc0JBQUEsSUFBSSxDQUFBO0FBQ2IsK0JBQXNDO0FBQTdCLDJCQUFBLFNBQVMsQ0FBQTtBQUVsQixtQ0FBd0M7QUFBL0IsMEJBQUEsTUFBTSxDQUFBO0FBQ2YsaUNBQXVDO0FBQTlCLHdCQUFBLEtBQUssQ0FBQTtBQUNkLG1DQUF3QztBQUEvQiwwQkFBQSxNQUFNLENBQUE7QUFDZiw2Q0FBNkM7QUFBcEMsb0NBQUEsV0FBVyxDQUFBO0FBQ3BCLGlEQUErQztBQUF0Qyx3Q0FBQSxhQUFhLENBQUE7QUFDdEIsK0NBQThDO0FBQXJDLHNDQUFBLFlBQVksQ0FBQTtBQUNyQixpREFBK0M7QUFBdEMsd0NBQUEsYUFBYSxDQUFBO0FBQ3RCLGlEQUErQztBQUF0Qyx3Q0FBQSxhQUFhLENBQUE7QUFDdEIsNkNBQTZDO0FBQXBDLG9DQUFBLFdBQVcsQ0FBQTtBQUNwQixpQ0FBdUM7QUFBOUIsd0JBQUEsS0FBSyxDQUFBO0FBQ2QseUNBQTJDO0FBQWxDLGdDQUFBLFNBQVMsQ0FBQSJ9

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oc1dpZGdldC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L0NvbmZpZy5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L2luZGV4LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbWl0aHJpbC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL2FwaS9tb3VudC1yZWRyYXcuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC9ub2RlX21vZHVsZXMvbWl0aHJpbC9hcGkvcm91dGVyLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbm9kZV9tb2R1bGVzL21pdGhyaWwvaHlwZXJzY3JpcHQuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC9ub2RlX21vZHVsZXMvbWl0aHJpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL21vdW50LXJlZHJhdy5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL2J1aWxkLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbm9kZV9tb2R1bGVzL21pdGhyaWwvcGF0aG5hbWUvY29tcGlsZVRlbXBsYXRlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbm9kZV9tb2R1bGVzL21pdGhyaWwvcGF0aG5hbWUvcGFyc2UuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC9ub2RlX21vZHVsZXMvbWl0aHJpbC9wcm9taXNlL3BvbHlmaWxsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbm9kZV9tb2R1bGVzL21pdGhyaWwvcHJvbWlzZS9wcm9taXNlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbm9kZV9tb2R1bGVzL21pdGhyaWwvcXVlcnlzdHJpbmcvYnVpbGQuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC9ub2RlX21vZHVsZXMvbWl0aHJpbC9xdWVyeXN0cmluZy9wYXJzZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9mcmFnbWVudC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9oeXBlcnNjcmlwdC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9oeXBlcnNjcmlwdFZub2RlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyL3JlbmRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci90cnVzdC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci92bm9kZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC9ub2RlX21vZHVsZXMvbWl0aHJpbC9yZXF1ZXN0L3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC9ub2RlX21vZHVsZXMvbWl0aHJpbC9yb3V0ZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvTGF5b3V0LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvdmlldy9MYXlvdXRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvUGlsbGFyZWRMYXlvdXRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvVGlsZUxheW91dGVyLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvdmlldy9Ub2tlbnMuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc3V0aWwvQ2hlY2tzdW0uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc3V0aWwvRGF0ZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzdXRpbC9OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc3V0aWwvVGltZWRQcm9taXNlcy5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzdXRpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzdXRpbC9sb2cuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Lyh3ZWJwYWNrKS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Lyh3ZWJwYWNrKS9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8od2VicGFjaykvbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vQnV0dG9uLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0NvbGxhcHNpYmxlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0xhYmVsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL01lbnUuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vTW9kYWwuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vT3B0aW9uc0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9SYWRpb0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9TZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9TbGlkZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vVG9nZ2xlQnV0dG9uLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL1Rvb2xiYXJCdXR0b24uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vVHlwZUFoZWFkLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtR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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsdUNBQXVDLE9BQU87QUFDOUMsaUNBQWlDLE9BQU87QUFDeEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksaUJBQWlCO0FBQzdCLFlBQVksZUFBZTtBQUMzQjtBQUNBLFlBQVksZUFBZTtBQUMzQixZQUFZLFdBQVc7QUFDdkIsWUFBWSxlQUFlO0FBQzNCO0FBQ0E7QUFDQSxZQUFZLCtCQUErQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsc0JBQXNCLEVBQUU7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN6TEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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QkFBTyxDQUFDLDZDQUFnQjtBQUM3QztBQUNBLHNCQUFzQixtQkFBTyxDQUFDLCtDQUFpQjtBQUMvQztBQUNBLHNCQUFzQixtQkFBTyxDQUFDLCtDQUFpQjtBQUMvQztBQUNBLG9CQUFvQixtQkFBTyxDQUFDLDJDQUFlO0FBQzNDO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLCtCQUFTO0FBQy9CO0FBQ0Esa0JBQWtCLG1CQUFPLENBQUMsdUNBQWE7QUFDdkM7QUFDQSwyQ0FBMkMsdXVCIiwiZmlsZSI6ImhzV2lkZ2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9iaW4vaW5kZXguanNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbWl0aHJpbF8xID0gcmVxdWlyZShcIi4vbWl0aHJpbFwiKTtcbmNvbnN0IGhzdXRpbF8xID0gcmVxdWlyZShcImhzdXRpbFwiKTtcbmNvbnN0IGxvZyA9IGhzdXRpbF8xLmxvZygnQ29uZmlnJyk7XG5jbGFzcyBDb25maWcge1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gbm9kZS5hdHRycy5jb250ZXh0O1xuICAgICAgICAgICAgaWYgKCFub2RlLnN0YXRlLmNmZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSAodHlwZW9mIG5vZGUuYXR0cnMuc291cmNlID09PSAnc3RyaW5nJykgP1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCBtaXRocmlsXzEubS5yZXF1ZXN0KHsgbWV0aG9kOiBcIkdFVFwiLCB1cmw6IG5vZGUuYXR0cnMuc291cmNlIH0pXG4gICAgICAgICAgICAgICAgICAgIDogbm9kZS5hdHRycy5zb3VyY2U7XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5jZmcgPSB0cmFuc2xhdGUocywgcy5yb290LCBjb250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBjZmcgPSBub2RlLnN0YXRlLmNmZztcbiAgICAgICAgcmV0dXJuIChjZmcgJiYgY2ZnLmNvbXBDbGFzcykgPyBtaXRocmlsXzEubShjZmcuY29tcENsYXNzLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNmZy5hdHRycyksIG5vZGUuYXR0cnMpKSA6IG1pdGhyaWxfMS5tKCdkaXYnLCAnd2FpdGluZycpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29uZmlnID0gQ29uZmlnO1xuZnVuY3Rpb24gdHJhbnNsYXRlKGNvbmZpZywgc3ViY2ZnLCBjb250ZXh0KSB7XG4gICAgaWYgKGlzU3lub255bShjb25maWcsIHN1YmNmZykpIHtcbiAgICAgICAgc3ViY2ZnID0gY29uZmlnW3N1YmNmZ107XG4gICAgfVxuICAgIGlmIChbJ3N0cmluZycsICdudW1iZXInLCAnYm9vbGVhbicsICdmdW5jdGlvbiddLmluZGV4T2YodHlwZW9mIHN1YmNmZykgPj0gMCkge1xuICAgICAgICByZXR1cm4gc3ViY2ZnO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gc3ViY2ZnLmxlbmd0aCA/IFtdIDoge307XG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5rZXlzKHN1YmNmZyk7XG4gICAgb3B0aW9ucy5tYXAoKG9wdCkgPT4ge1xuICAgICAgICBjb25zdCBjbCA9IHJlc29sdmUob3B0LCBjb250ZXh0KTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRyYW5zbGF0ZShjb25maWcsIHN1YmNmZ1tvcHRdLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKGNsKSB7XG4gICAgICAgICAgICBsb2cuZGVidWcoYHJlc29sdmVkIGNsYXNzICcke29wdH0nIHRvICR7bG9nLmluc3BlY3QoY2wsIDEpfWApO1xuICAgICAgICAgICAgY29uc3QgciA9IHtcbiAgICAgICAgICAgICAgICBjb21wQ2xhc3M6IGNsLFxuICAgICAgICAgICAgICAgIGF0dHJzOiBjb250ZW50XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgKCFBcnJheS5pc0FycmF5KHN1YmNmZykgJiYgb3B0aW9ucy5sZW5ndGggPT09IDEpID9cbiAgICAgICAgICAgICAgICByZXN1bHQgPSByIDpcbiAgICAgICAgICAgICAgICByZXN1bHRbb3B0XSA9IHI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4ocGFyc2VJbnQob3B0KSkpIHtcbiAgICAgICAgICAgICAgICBsb2cuZGVidWcoYHJlc29sdmVkIGRpcmVjdCAnJHtvcHR9JyB0byAke2xvZy5pbnNwZWN0KGNvbnRlbnQsIDApfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W29wdF0gPSBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHJlc29sdmUoc3ltLCBjb250ZXh0KSB7XG4gICAgbG9nLmRlYnVnKGByZXNvbHZpbmcgJHtzeW19IGluIGNvbnRleHQgJyR7bG9nLmluc3BlY3QoY29udGV4dCwgMCl9J2ApO1xuICAgIGxldCBjbDtcbiAgICBjb250ZXh0LnNvbWUoKGMpID0+IGNsID0gY1tzeW1dKTtcbiAgICBsb2cuZGVidWcoYHJlc29sdmluZyAke3N5bX0gPT4gJHtsb2cuaW5zcGVjdChjbCwgMCl9YCk7XG4gICAgcmV0dXJuIGNsO1xufVxuZnVuY3Rpb24gaXNTeW5vbnltKGNvbmZpZywga2V5KSB7IHJldHVybiB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBjb25maWdba2V5XTsgfVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUTI5dVptbG5MbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDBOdmJtWnBaeTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3pzN096czdPenM3T3p0QlFYbEdRU3gxUTBGQmVVTTdRVUZEZWtNc2JVTkJRWE5ETzBGQlFVTXNUVUZCVFN4SFFVRkhMRWRCUVVjc1dVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzBGQlMyeEZMRTFCUVdFc1RVRkJUVHRKUVVOVUxFMUJRVTBzUTBGQlF5eEpRVUZWT3p0WlFVTnVRaXhOUVVGTkxFOUJRVThzUjBGQlV5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJRenRaUVVONlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFVkJRVVU3WjBKQlEycENMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zVDBGQlR5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1MwRkJTeXhSUVVGUkxFTkJRVU1zUTBGQlFTeERRVUZETzI5Q1FVTTVReXhOUVVGTkxGZEJRVU1zUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlN4TlFVRk5MRVZCUVVVc1MwRkJTeXhGUVVGRkxFZEJRVWNzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1JVRkJReXhEUVVGRE8yOUNRVU16UkN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTTdaMEpCUTNSQ0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4SFFVRkhMRk5CUVZNc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVsQlFVa3NSVUZCUlN4UFFVRlBMRU5CUVVNc1EwRkJRenRoUVVOc1JEdFJRVU5NTEVOQlFVTTdTMEZCUVR0SlFVTkVMRWxCUVVrc1EwRkJReXhKUVVGVk8xRkJRMWdzVFVGQlRTeEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU03VVVGRE0wSXNUMEZCVHl4RFFVRkRMRWRCUVVjc1NVRkJTU3hIUVVGSExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVRXNRMEZCUXl4RFFVRkRMRmRCUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zVTBGQlV5eEZRVUZGTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNSMEZCUnl4RFFVRkRMRXRCUVVzc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhYUVVGRExFTkJRVU1zUzBGQlN5eEZRVUZGTEZOQlFWTXNRMEZCUXl4RFFVRkRPMGxCUTI1SkxFTkJRVU03UTBGRFNqdEJRV1JFTEhkQ1FXTkRPMEZCWVVRc1UwRkJVeXhUUVVGVExFTkJRVU1zVFVGQlZTeEZRVUZGTEUxQlFWVXNSVUZCUlN4UFFVRmhPMGxCUlhCRUxFbEJRVWtzVTBGQlV5eERRVUZETEUxQlFVMHNSVUZCUlN4TlFVRk5MRU5CUVVNc1JVRkJSVHRSUVVGRkxFMUJRVTBzUjBGQlJ5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1MwRkJSVHRKUVVVelJDeEpRVUZKTEVOQlFVTXNVVUZCVVN4RlFVRkZMRkZCUVZFc1JVRkJSU3hUUVVGVExFVkJRVVVzVlVGQlZTeERRVUZETEVOQlFVTXNUMEZCVHl4RFFVRkRMRTlCUVU4c1RVRkJUU3hEUVVGRExFbEJRVVVzUTBGQlF5eEZRVUZGTzFGQlFVVXNUMEZCVHl4TlFVRk5MRU5CUVVNN1MwRkJSVHRKUVVNM1JpeEpRVUZKTEUxQlFVMHNSMEZCUnl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGQkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJRenRKUVVWd1F5eE5RVUZOTEU5QlFVOHNSMEZCUnl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETzBsQlEzQkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEhRVUZWTEVWQlFWRXNSVUZCUlR0UlFVTTNRaXhOUVVGTkxFVkJRVVVzUjBGQlR5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRE8xRkJRM0pETEUxQlFVMHNUMEZCVHl4SFFVRkhMRk5CUVZNc1EwRkJReXhOUVVGTkxFVkJRVVVzVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRE8xRkJSWGhFTEVsQlFVa3NSVUZCUlN4RlFVRkZPMWxCUTBvc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eHRRa0ZCYlVJc1IwRkJSeXhSUVVGUkxFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF6dFpRVU01UkN4TlFVRk5MRU5CUVVNc1IwRkJSenRuUWtGRFRpeFRRVUZUTEVWQlFVTXNSVUZCUlR0blFrRkRXaXhMUVVGTExFVkJRVU1zVDBGQlR6dGhRVU5vUWl4RFFVRkRPMWxCUTBZc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1QwRkJUeXhEUVVGRExFMUJRVTBzUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUVN4RFFVRkRPMmRDUVVNM1F5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRMW9zVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRUUVVOMlFqdGhRVVZKTzFsQlEwUXNTVUZCU1N4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVWQlFVVTdaMEpCUTNSQ0xFZEJRVWNzUTBGQlF5eExRVUZMTEVOQlFVTXNiMEpCUVc5Q0xFZEJRVWNzVVVGQlVTeEhRVUZITEVOQlFVTXNUMEZCVHl4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTTdZVUZEZGtVN1dVRkRSQ3hOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NUMEZCVHl4RFFVRkRPMU5CUTNwQ08wbEJRMHdzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEU0N4UFFVRlBMRTFCUVUwc1EwRkJRenRCUVVOc1FpeERRVUZETzBGQlZVUXNVMEZCVXl4UFFVRlBMRU5CUVVNc1IwRkJWU3hGUVVGRkxFOUJRV0U3U1VGRGRFTXNSMEZCUnl4RFFVRkRMRXRCUVVzc1EwRkJReXhoUVVGaExFZEJRVWNzWjBKQlFXZENMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zVDBGQlR5eEZRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRKUVVOeVJTeEpRVUZKTEVWQlFVMHNRMEZCUXp0SlFVTllMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZMTEVWQlFVVXNSVUZCUlN4RFFVRkZMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTjBReXhIUVVGSExFTkJRVU1zUzBGQlN5eERRVUZETEdGQlFXRXNSMEZCUnl4UFFVRlBMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zUlVGQlJTeEZRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJRenRKUVVOMFJDeFBRVUZQTEVWQlFVVXNRMEZCUXp0QlFVTmtMRU5CUVVNN1FVRkZSQ3hUUVVGVExGTkJRVk1zUTBGQlF5eE5RVUZWTEVWQlFVVXNSMEZCVHl4SlFVRkpMRTlCUVU4c1QwRkJUeXhIUVVGSExFdEJRVXNzVVVGQlVTeEpRVUZKTEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xucmVxdWlyZShcIi4vdmlldy9QaWxsYXJlZExheW91dGVyXCIpO1xucmVxdWlyZShcIi4vdmlldy9UaWxlTGF5b3V0ZXJcIik7XG52YXIgTGF5b3V0XzEgPSByZXF1aXJlKFwiLi92aWV3L0xheW91dFwiKTtcbmV4cG9ydHMuTGF5b3V0ID0gTGF5b3V0XzEuTGF5b3V0O1xudmFyIFRva2Vuc18xID0gcmVxdWlyZShcIi4vdmlldy9Ub2tlbnNcIik7XG5leHBvcnRzLkZJTEwgPSBUb2tlbnNfMS5GSUxMO1xuZXhwb3J0cy5weCA9IFRva2Vuc18xLnB4O1xuZXhwb3J0cy5wYyA9IFRva2Vuc18xLnBjO1xuZXhwb3J0cy5MYXlvdXRUb2tlbiA9IFRva2Vuc18xLkxheW91dFRva2VuO1xudmFyIExheW91dGVyXzEgPSByZXF1aXJlKFwiLi92aWV3L0xheW91dGVyXCIpO1xuZXhwb3J0cy5MYXlvdXRlciA9IExheW91dGVyXzEuTGF5b3V0ZXI7XG52YXIgQ29uZmlnXzEgPSByZXF1aXJlKFwiLi9Db25maWdcIik7XG5leHBvcnRzLkNvbmZpZyA9IENvbmZpZ18xLkNvbmZpZztcbnZhciBtaXRocmlsXzEgPSByZXF1aXJlKFwiLi9taXRocmlsXCIpO1xuZXhwb3J0cy5tID0gbWl0aHJpbF8xLm07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZhVzVrWlhndWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZMUVN4dFEwRkJhVU03UVVGRGFrTXNLMEpCUVRaQ08wRkJSemRDTEhkRFFVRTJRenRCUVVGd1F5d3dRa0ZCUVN4TlFVRk5MRU5CUVVFN1FVRkRaaXgzUTBGRE5rTTdRVUZFY0VNc2QwSkJRVUVzU1VGQlNTeERRVUZCTzBGQlFVVXNjMEpCUVVFc1JVRkJSU3hEUVVGQk8wRkJRVVVzYzBKQlFVRXNSVUZCUlN4RFFVRkJPMEZCUTFvc0swSkJRVUVzVjBGQlZ5eERRVUZCTzBGQlEzQkNMRFJEUVVFclF6dEJRVUYwUXl3NFFrRkJRU3hSUVVGUkxFTkJRVUU3UVVGRGFrSXNiVU5CUVhkRE8wRkJRUzlDTERCQ1FVRkJMRTFCUVUwc1EwRkJRVHRCUVVObUxIRkRRVUY1UXp0QlFVRm9ReXh6UWtGQlFTeERRVUZETEVOQlFVRWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm0gPSByZXF1aXJlKFwibWl0aHJpbFwiKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJXbDBhSEpwYkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OXRhWFJvY21sc0xuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCVVdFc1VVRkJRU3hEUVVGRExFZEJRVWNzVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHJlbmRlciwgc2NoZWR1bGUsIGNvbnNvbGUpIHtcblx0dmFyIHN1YnNjcmlwdGlvbnMgPSBbXVxuXHR2YXIgcmVuZGVyaW5nID0gZmFsc2Vcblx0dmFyIHBlbmRpbmcgPSBmYWxzZVxuXG5cdGZ1bmN0aW9uIHN5bmMoKSB7XG5cdFx0aWYgKHJlbmRlcmluZykgdGhyb3cgbmV3IEVycm9yKFwiTmVzdGVkIG0ucmVkcmF3LnN5bmMoKSBjYWxsXCIpXG5cdFx0cmVuZGVyaW5nID0gdHJ1ZVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaXB0aW9ucy5sZW5ndGg7IGkgKz0gMikge1xuXHRcdFx0dHJ5IHsgcmVuZGVyKHN1YnNjcmlwdGlvbnNbaV0sIFZub2RlKHN1YnNjcmlwdGlvbnNbaSArIDFdKSwgcmVkcmF3KSB9XG5cdFx0XHRjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKGUpIH1cblx0XHR9XG5cdFx0cmVuZGVyaW5nID0gZmFsc2Vcblx0fVxuXG5cdGZ1bmN0aW9uIHJlZHJhdygpIHtcblx0XHRpZiAoIXBlbmRpbmcpIHtcblx0XHRcdHBlbmRpbmcgPSB0cnVlXG5cdFx0XHRzY2hlZHVsZShmdW5jdGlvbigpIHtcblx0XHRcdFx0cGVuZGluZyA9IGZhbHNlXG5cdFx0XHRcdHN5bmMoKVxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRyZWRyYXcuc3luYyA9IHN5bmNcblxuXHRmdW5jdGlvbiBtb3VudChyb290LCBjb21wb25lbnQpIHtcblx0XHRpZiAoY29tcG9uZW50ICE9IG51bGwgJiYgY29tcG9uZW50LnZpZXcgPT0gbnVsbCAmJiB0eXBlb2YgY29tcG9uZW50ICE9PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJtLm1vdW50KGVsZW1lbnQsIGNvbXBvbmVudCkgZXhwZWN0cyBhIGNvbXBvbmVudCwgbm90IGEgdm5vZGVcIilcblx0XHR9XG5cblx0XHR2YXIgaW5kZXggPSBzdWJzY3JpcHRpb25zLmluZGV4T2Yocm9vdClcblx0XHRpZiAoaW5kZXggPj0gMCkge1xuXHRcdFx0c3Vic2NyaXB0aW9ucy5zcGxpY2UoaW5kZXgsIDIpXG5cdFx0XHRyZW5kZXIocm9vdCwgW10sIHJlZHJhdylcblx0XHR9XG5cblx0XHRpZiAoY29tcG9uZW50ICE9IG51bGwpIHtcblx0XHRcdHN1YnNjcmlwdGlvbnMucHVzaChyb290LCBjb21wb25lbnQpXG5cdFx0XHRyZW5kZXIocm9vdCwgVm5vZGUoY29tcG9uZW50KSwgcmVkcmF3KVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7bW91bnQ6IG1vdW50LCByZWRyYXc6IHJlZHJhd31cbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcbnZhciBtID0gcmVxdWlyZShcIi4uL3JlbmRlci9oeXBlcnNjcmlwdFwiKVxudmFyIFByb21pc2UgPSByZXF1aXJlKFwiLi4vcHJvbWlzZS9wcm9taXNlXCIpXG5cbnZhciBidWlsZFBhdGhuYW1lID0gcmVxdWlyZShcIi4uL3BhdGhuYW1lL2J1aWxkXCIpXG52YXIgcGFyc2VQYXRobmFtZSA9IHJlcXVpcmUoXCIuLi9wYXRobmFtZS9wYXJzZVwiKVxudmFyIGNvbXBpbGVUZW1wbGF0ZSA9IHJlcXVpcmUoXCIuLi9wYXRobmFtZS9jb21waWxlVGVtcGxhdGVcIilcbnZhciBhc3NpZ24gPSByZXF1aXJlKFwiLi4vcGF0aG5hbWUvYXNzaWduXCIpXG5cbnZhciBzZW50aW5lbCA9IHt9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHdpbmRvdywgbW91bnRSZWRyYXcpIHtcblx0dmFyIGZpcmVBc3luY1xuXG5cdGZ1bmN0aW9uIHNldFBhdGgocGF0aCwgZGF0YSwgb3B0aW9ucykge1xuXHRcdHBhdGggPSBidWlsZFBhdGhuYW1lKHBhdGgsIGRhdGEpXG5cdFx0aWYgKGZpcmVBc3luYyAhPSBudWxsKSB7XG5cdFx0XHRmaXJlQXN5bmMoKVxuXHRcdFx0dmFyIHN0YXRlID0gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdGUgOiBudWxsXG5cdFx0XHR2YXIgdGl0bGUgPSBvcHRpb25zID8gb3B0aW9ucy50aXRsZSA6IG51bGxcblx0XHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMucmVwbGFjZSkgJHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShzdGF0ZSwgdGl0bGUsIHJvdXRlLnByZWZpeCArIHBhdGgpXG5cdFx0XHRlbHNlICR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoc3RhdGUsIHRpdGxlLCByb3V0ZS5wcmVmaXggKyBwYXRoKVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdCR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJvdXRlLnByZWZpeCArIHBhdGhcblx0XHR9XG5cdH1cblxuXHR2YXIgY3VycmVudFJlc29sdmVyID0gc2VudGluZWwsIGNvbXBvbmVudCwgYXR0cnMsIGN1cnJlbnRQYXRoLCBsYXN0VXBkYXRlXG5cblx0dmFyIFNLSVAgPSByb3V0ZS5TS0lQID0ge31cblxuXHRmdW5jdGlvbiByb3V0ZShyb290LCBkZWZhdWx0Um91dGUsIHJvdXRlcykge1xuXHRcdGlmIChyb290ID09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIkVuc3VyZSB0aGUgRE9NIGVsZW1lbnQgdGhhdCB3YXMgcGFzc2VkIHRvIGBtLnJvdXRlYCBpcyBub3QgdW5kZWZpbmVkXCIpXG5cdFx0Ly8gMCA9IHN0YXJ0XG5cdFx0Ly8gMSA9IGluaXRcblx0XHQvLyAyID0gcmVhZHlcblx0XHR2YXIgc3RhdGUgPSAwXG5cblx0XHR2YXIgY29tcGlsZWQgPSBPYmplY3Qua2V5cyhyb3V0ZXMpLm1hcChmdW5jdGlvbihyb3V0ZSkge1xuXHRcdFx0aWYgKHJvdXRlWzBdICE9PSBcIi9cIikgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiUm91dGVzIG11c3Qgc3RhcnQgd2l0aCBhIGAvYFwiKVxuXHRcdFx0aWYgKCgvOihbXlxcL1xcLi1dKykoXFwuezN9KT86LykudGVzdChyb3V0ZSkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFN5bnRheEVycm9yKFwiUm91dGUgcGFyYW1ldGVyIG5hbWVzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggZWl0aGVyIGAvYCwgYC5gLCBvciBgLWBcIilcblx0XHRcdH1cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJvdXRlOiByb3V0ZSxcblx0XHRcdFx0Y29tcG9uZW50OiByb3V0ZXNbcm91dGVdLFxuXHRcdFx0XHRjaGVjazogY29tcGlsZVRlbXBsYXRlKHJvdXRlKSxcblx0XHRcdH1cblx0XHR9KVxuXHRcdHZhciBjYWxsQXN5bmMgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBzZXRUaW1lb3V0XG5cdFx0dmFyIHAgPSBQcm9taXNlLnJlc29sdmUoKVxuXHRcdHZhciBzY2hlZHVsZWQgPSBmYWxzZVxuXHRcdHZhciBvbnJlbW92ZVxuXG5cdFx0ZmlyZUFzeW5jID0gbnVsbFxuXG5cdFx0aWYgKGRlZmF1bHRSb3V0ZSAhPSBudWxsKSB7XG5cdFx0XHR2YXIgZGVmYXVsdERhdGEgPSBwYXJzZVBhdGhuYW1lKGRlZmF1bHRSb3V0ZSlcblxuXHRcdFx0aWYgKCFjb21waWxlZC5zb21lKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLmNoZWNrKGRlZmF1bHREYXRhKSB9KSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJEZWZhdWx0IHJvdXRlIGRvZXNuJ3QgbWF0Y2ggYW55IGtub3duIHJvdXRlc1wiKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlc29sdmVSb3V0ZSgpIHtcblx0XHRcdHNjaGVkdWxlZCA9IGZhbHNlXG5cdFx0XHQvLyBDb25zaWRlciB0aGUgcGF0aG5hbWUgaG9saXN0aWNhbGx5LiBUaGUgcHJlZml4IG1pZ2h0IGV2ZW4gYmUgaW52YWxpZCxcblx0XHRcdC8vIGJ1dCB0aGF0J3Mgbm90IG91ciBwcm9ibGVtLlxuXHRcdFx0dmFyIHByZWZpeCA9ICR3aW5kb3cubG9jYXRpb24uaGFzaFxuXHRcdFx0aWYgKHJvdXRlLnByZWZpeFswXSAhPT0gXCIjXCIpIHtcblx0XHRcdFx0cHJlZml4ID0gJHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKyBwcmVmaXhcblx0XHRcdFx0aWYgKHJvdXRlLnByZWZpeFswXSAhPT0gXCI/XCIpIHtcblx0XHRcdFx0XHRwcmVmaXggPSAkd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgcHJlZml4XG5cdFx0XHRcdFx0aWYgKHByZWZpeFswXSAhPT0gXCIvXCIpIHByZWZpeCA9IFwiL1wiICsgcHJlZml4XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIFRoaXMgc2VlbWluZ2x5IHVzZWxlc3MgYC5jb25jYXQoKWAgc3BlZWRzIHVwIHRoZSB0ZXN0cyBxdWl0ZSBhIGJpdCxcblx0XHRcdC8vIHNpbmNlIHRoZSByZXByZXNlbnRhdGlvbiBpcyBjb25zaXN0ZW50bHkgYSByZWxhdGl2ZWx5IHBvb3JseVxuXHRcdFx0Ly8gb3B0aW1pemVkIGNvbnMgc3RyaW5nLlxuXHRcdFx0dmFyIHBhdGggPSBwcmVmaXguY29uY2F0KClcblx0XHRcdFx0LnJlcGxhY2UoLyg/OiVbYS1mODldW2EtZjAtOV0pKy9naW0sIGRlY29kZVVSSUNvbXBvbmVudClcblx0XHRcdFx0LnNsaWNlKHJvdXRlLnByZWZpeC5sZW5ndGgpXG5cdFx0XHR2YXIgZGF0YSA9IHBhcnNlUGF0aG5hbWUocGF0aClcblxuXHRcdFx0YXNzaWduKGRhdGEucGFyYW1zLCAkd2luZG93Lmhpc3Rvcnkuc3RhdGUpXG5cblx0XHRcdGZ1bmN0aW9uIGZhaWwoKSB7XG5cdFx0XHRcdGlmIChwYXRoID09PSBkZWZhdWx0Um91dGUpIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCByZXNvbHZlIGRlZmF1bHQgcm91dGUgXCIgKyBkZWZhdWx0Um91dGUpXG5cdFx0XHRcdHNldFBhdGgoZGVmYXVsdFJvdXRlLCBudWxsLCB7cmVwbGFjZTogdHJ1ZX0pXG5cdFx0XHR9XG5cblx0XHRcdGxvb3AoMClcblx0XHRcdGZ1bmN0aW9uIGxvb3AoaSkge1xuXHRcdFx0XHQvLyAwID0gaW5pdFxuXHRcdFx0XHQvLyAxID0gc2NoZWR1bGVkXG5cdFx0XHRcdC8vIDIgPSBkb25lXG5cdFx0XHRcdGZvciAoOyBpIDwgY29tcGlsZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAoY29tcGlsZWRbaV0uY2hlY2soZGF0YSkpIHtcblx0XHRcdFx0XHRcdHZhciBwYXlsb2FkID0gY29tcGlsZWRbaV0uY29tcG9uZW50XG5cdFx0XHRcdFx0XHR2YXIgbWF0Y2hlZFJvdXRlID0gY29tcGlsZWRbaV0ucm91dGVcblx0XHRcdFx0XHRcdHZhciBsb2NhbENvbXAgPSBwYXlsb2FkXG5cdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gbGFzdFVwZGF0ZSA9IGZ1bmN0aW9uKGNvbXApIHtcblx0XHRcdFx0XHRcdFx0aWYgKHVwZGF0ZSAhPT0gbGFzdFVwZGF0ZSkgcmV0dXJuXG5cdFx0XHRcdFx0XHRcdGlmIChjb21wID09PSBTS0lQKSByZXR1cm4gbG9vcChpICsgMSlcblx0XHRcdFx0XHRcdFx0Y29tcG9uZW50ID0gY29tcCAhPSBudWxsICYmICh0eXBlb2YgY29tcC52aWV3ID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIGNvbXAgPT09IFwiZnVuY3Rpb25cIik/IGNvbXAgOiBcImRpdlwiXG5cdFx0XHRcdFx0XHRcdGF0dHJzID0gZGF0YS5wYXJhbXMsIGN1cnJlbnRQYXRoID0gcGF0aCwgbGFzdFVwZGF0ZSA9IG51bGxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFJlc29sdmVyID0gcGF5bG9hZC5yZW5kZXIgPyBwYXlsb2FkIDogbnVsbFxuXHRcdFx0XHRcdFx0XHRpZiAoc3RhdGUgPT09IDIpIG1vdW50UmVkcmF3LnJlZHJhdygpXG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHN0YXRlID0gMlxuXHRcdFx0XHRcdFx0XHRcdG1vdW50UmVkcmF3LnJlZHJhdy5zeW5jKClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gVGhlcmUncyBubyB1bmRlcnN0YXRpbmcgaG93IG11Y2ggSSAqd2lzaCogSSBjb3VsZFxuXHRcdFx0XHRcdFx0Ly8gdXNlIGBhc3luY2AvYGF3YWl0YCBoZXJlLi4uXG5cdFx0XHRcdFx0XHRpZiAocGF5bG9hZC52aWV3IHx8IHR5cGVvZiBwYXlsb2FkID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0cGF5bG9hZCA9IHt9XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZShsb2NhbENvbXApXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmIChwYXlsb2FkLm9ubWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0cC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcGF5bG9hZC5vbm1hdGNoKGRhdGEucGFyYW1zLCBwYXRoLCBtYXRjaGVkUm91dGUpXG5cdFx0XHRcdFx0XHRcdH0pLnRoZW4odXBkYXRlLCBmYWlsKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB1cGRhdGUoXCJkaXZcIilcblx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRmYWlsKClcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBTZXQgaXQgdW5jb25kaXRpb25hbGx5IHNvIGBtLnJvdXRlLnNldGAgYW5kIGBtLnJvdXRlLkxpbmtgIGJvdGggd29yayxcblx0XHQvLyBldmVuIGlmIG5laXRoZXIgYHB1c2hTdGF0ZWAgbm9yIGBoYXNoY2hhbmdlYCBhcmUgc3VwcG9ydGVkLiBJdCdzXG5cdFx0Ly8gY2xlYXJlZCBpZiBgaGFzaGNoYW5nZWAgaXMgdXNlZCwgc2luY2UgdGhhdCBtYWtlcyBpdCBhdXRvbWF0aWNhbGx5XG5cdFx0Ly8gYXN5bmMuXG5cdFx0ZmlyZUFzeW5jID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIXNjaGVkdWxlZCkge1xuXHRcdFx0XHRzY2hlZHVsZWQgPSB0cnVlXG5cdFx0XHRcdGNhbGxBc3luYyhyZXNvbHZlUm91dGUpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiAkd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdG9ucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZpcmVBc3luYywgZmFsc2UpXG5cdFx0XHR9XG5cdFx0XHQkd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBmaXJlQXN5bmMsIGZhbHNlKVxuXHRcdH0gZWxzZSBpZiAocm91dGUucHJlZml4WzBdID09PSBcIiNcIikge1xuXHRcdFx0ZmlyZUFzeW5jID0gbnVsbFxuXHRcdFx0b25yZW1vdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0JHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCByZXNvbHZlUm91dGUsIGZhbHNlKVxuXHRcdFx0fVxuXHRcdFx0JHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCByZXNvbHZlUm91dGUsIGZhbHNlKVxuXHRcdH1cblxuXHRcdHJldHVybiBtb3VudFJlZHJhdy5tb3VudChyb290LCB7XG5cdFx0XHRvbmJlZm9yZXVwZGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHN0YXRlID0gc3RhdGUgPyAyIDogMVxuXHRcdFx0XHRyZXR1cm4gISghc3RhdGUgfHwgc2VudGluZWwgPT09IGN1cnJlbnRSZXNvbHZlcilcblx0XHRcdH0sXG5cdFx0XHRvbmNyZWF0ZTogcmVzb2x2ZVJvdXRlLFxuXHRcdFx0b25yZW1vdmU6IG9ucmVtb3ZlLFxuXHRcdFx0dmlldzogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICghc3RhdGUgfHwgc2VudGluZWwgPT09IGN1cnJlbnRSZXNvbHZlcikgcmV0dXJuXG5cdFx0XHRcdC8vIFdyYXAgaW4gYSBmcmFnbWVudCB0byBwcmVzZXJ2ZSBleGlzdGluZyBrZXkgc2VtYW50aWNzXG5cdFx0XHRcdHZhciB2bm9kZSA9IFtWbm9kZShjb21wb25lbnQsIGF0dHJzLmtleSwgYXR0cnMpXVxuXHRcdFx0XHRpZiAoY3VycmVudFJlc29sdmVyKSB2bm9kZSA9IGN1cnJlbnRSZXNvbHZlci5yZW5kZXIodm5vZGVbMF0pXG5cdFx0XHRcdHJldHVybiB2bm9kZVxuXHRcdFx0fSxcblx0XHR9KVxuXHR9XG5cdHJvdXRlLnNldCA9IGZ1bmN0aW9uKHBhdGgsIGRhdGEsIG9wdGlvbnMpIHtcblx0XHRpZiAobGFzdFVwZGF0ZSAhPSBudWxsKSB7XG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXHRcdFx0b3B0aW9ucy5yZXBsYWNlID0gdHJ1ZVxuXHRcdH1cblx0XHRsYXN0VXBkYXRlID0gbnVsbFxuXHRcdHNldFBhdGgocGF0aCwgZGF0YSwgb3B0aW9ucylcblx0fVxuXHRyb3V0ZS5nZXQgPSBmdW5jdGlvbigpIHtyZXR1cm4gY3VycmVudFBhdGh9XG5cdHJvdXRlLnByZWZpeCA9IFwiIyFcIlxuXHRyb3V0ZS5MaW5rID0ge1xuXHRcdHZpZXc6IGZ1bmN0aW9uKHZub2RlKSB7XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHZub2RlLmF0dHJzLm9wdGlvbnNcblx0XHRcdC8vIFJlbW92ZSB0aGVzZSBzbyB0aGV5IGRvbid0IGdldCBvdmVyd3JpdHRlblxuXHRcdFx0dmFyIGF0dHJzID0ge30sIG9uY2xpY2ssIGhyZWZcblx0XHRcdGFzc2lnbihhdHRycywgdm5vZGUuYXR0cnMpXG5cdFx0XHQvLyBUaGUgZmlyc3QgdHdvIGFyZSBpbnRlcm5hbCwgYnV0IHRoZSByZXN0IGFyZSBtYWdpYyBhdHRyaWJ1dGVzXG5cdFx0XHQvLyB0aGF0IG5lZWQgY2Vuc29yZWQgdG8gbm90IHNjcmV3IHVwIHJlbmRlcmluZy5cblx0XHRcdGF0dHJzLnNlbGVjdG9yID0gYXR0cnMub3B0aW9ucyA9IGF0dHJzLmtleSA9IGF0dHJzLm9uaW5pdCA9XG5cdFx0XHRhdHRycy5vbmNyZWF0ZSA9IGF0dHJzLm9uYmVmb3JldXBkYXRlID0gYXR0cnMub251cGRhdGUgPVxuXHRcdFx0YXR0cnMub25iZWZvcmVyZW1vdmUgPSBhdHRycy5vbnJlbW92ZSA9IG51bGxcblxuXHRcdFx0Ly8gRG8gdGhpcyBub3cgc28gd2UgY2FuIGdldCB0aGUgbW9zdCBjdXJyZW50IGBocmVmYCBhbmQgYGRpc2FibGVkYC5cblx0XHRcdC8vIFRob3NlIGF0dHJpYnV0ZXMgbWF5IGFsc28gYmUgc3BlY2lmaWVkIGluIHRoZSBzZWxlY3RvciwgYW5kIHdlXG5cdFx0XHQvLyBzaG91bGQgaG9ub3IgdGhhdC5cblx0XHRcdHZhciBjaGlsZCA9IG0odm5vZGUuYXR0cnMuc2VsZWN0b3IgfHwgXCJhXCIsIGF0dHJzLCB2bm9kZS5jaGlsZHJlbilcblxuXHRcdFx0Ly8gTGV0J3MgcHJvdmlkZSBhICpyaWdodCogd2F5IHRvIGRpc2FibGUgYSByb3V0ZSBsaW5rLCByYXRoZXIgdGhhblxuXHRcdFx0Ly8gbGV0dGluZyBwZW9wbGUgc2NyZXcgdXAgYWNjZXNzaWJpbGl0eSBvbiBhY2NpZGVudC5cblx0XHRcdC8vXG5cdFx0XHQvLyBUaGUgYXR0cmlidXRlIGlzIGNvZXJjZWQgc28gdXNlcnMgZG9uJ3QgZ2V0IHN1cnByaXNlZCBvdmVyXG5cdFx0XHQvLyBgZGlzYWJsZWQ6IDBgIHJlc3VsdGluZyBpbiBhIGJ1dHRvbiB0aGF0J3Mgc29tZWhvdyByb3V0YWJsZVxuXHRcdFx0Ly8gZGVzcGl0ZSBiZWluZyB2aXNpYmx5IGRpc2FibGVkLlxuXHRcdFx0aWYgKGNoaWxkLmF0dHJzLmRpc2FibGVkID0gQm9vbGVhbihjaGlsZC5hdHRycy5kaXNhYmxlZCkpIHtcblx0XHRcdFx0Y2hpbGQuYXR0cnMuaHJlZiA9IG51bGxcblx0XHRcdFx0Y2hpbGQuYXR0cnNbXCJhcmlhLWRpc2FibGVkXCJdID0gXCJ0cnVlXCJcblx0XHRcdFx0Ly8gSWYgeW91ICpyZWFsbHkqIGRvIHdhbnQgdG8gZG8gdGhpcyBvbiBhIGRpc2FibGVkIGxpbmssIHVzZVxuXHRcdFx0XHQvLyBhbiBgb25jcmVhdGVgIGhvb2sgdG8gYWRkIGl0LlxuXHRcdFx0XHRjaGlsZC5hdHRycy5vbmNsaWNrID0gbnVsbFxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b25jbGljayA9IGNoaWxkLmF0dHJzLm9uY2xpY2tcblx0XHRcdFx0aHJlZiA9IGNoaWxkLmF0dHJzLmhyZWZcblx0XHRcdFx0Y2hpbGQuYXR0cnMuaHJlZiA9IHJvdXRlLnByZWZpeCArIGhyZWZcblx0XHRcdFx0Y2hpbGQuYXR0cnMub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBvbmNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IG9uY2xpY2suY2FsbChlLmN1cnJlbnRUYXJnZXQsIGUpXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvbmNsaWNrID09IG51bGwgfHwgdHlwZW9mIG9uY2xpY2sgIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0XHRcdC8vIGRvIG5vdGhpbmdcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvbmNsaWNrLmhhbmRsZUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdG9uY2xpY2suaGFuZGxlRXZlbnQoZSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBBZGFwdGVkIGZyb20gUmVhY3QgUm91dGVyJ3MgaW1wbGVtZW50YXRpb246XG5cdFx0XHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0VHJhaW5pbmcvcmVhY3Qtcm91dGVyL2Jsb2IvNTIwYTBhY2Q0OGFlMWIwNjZlYjBiMDdkNmQ0ZDE3OTBhMWQwMjQ4Mi9wYWNrYWdlcy9yZWFjdC1yb3V0ZXItZG9tL21vZHVsZXMvTGluay5qc1xuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0Ly8gVHJ5IHRvIGJlIGZsZXhpYmxlIGFuZCBpbnR1aXRpdmUgaW4gaG93IHdlIGhhbmRsZSBsaW5rcy5cblx0XHRcdFx0XHQvLyBGdW4gZmFjdDogbGlua3MgYXJlbid0IGFzIG9idmlvdXMgdG8gZ2V0IHJpZ2h0IGFzIHlvdVxuXHRcdFx0XHRcdC8vIHdvdWxkIGV4cGVjdC4gVGhlcmUncyBhIGxvdCBtb3JlIHZhbGlkIHdheXMgdG8gY2xpY2sgYVxuXHRcdFx0XHRcdC8vIGxpbmsgdGhhbiB0aGlzLCBhbmQgb25lIG1pZ2h0IHdhbnQgdG8gbm90IHNpbXBseSBjbGljayBhXG5cdFx0XHRcdFx0Ly8gbGluaywgYnV0IHJpZ2h0IGNsaWNrIG9yIGNvbW1hbmQtY2xpY2sgaXQgdG8gY29weSB0aGVcblx0XHRcdFx0XHQvLyBsaW5rIHRhcmdldCwgZXRjLiBOb3BlLCB0aGlzIGlzbid0IGp1c3QgZm9yIGJsaW5kIHBlb3BsZS5cblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHQvLyBTa2lwIGlmIGBvbmNsaWNrYCBwcmV2ZW50ZWQgZGVmYXVsdFxuXHRcdFx0XHRcdFx0cmVzdWx0ICE9PSBmYWxzZSAmJiAhZS5kZWZhdWx0UHJldmVudGVkICYmXG5cdFx0XHRcdFx0XHQvLyBJZ25vcmUgZXZlcnl0aGluZyBidXQgbGVmdCBjbGlja3Ncblx0XHRcdFx0XHRcdChlLmJ1dHRvbiA9PT0gMCB8fCBlLndoaWNoID09PSAwIHx8IGUud2hpY2ggPT09IDEpICYmXG5cdFx0XHRcdFx0XHQvLyBMZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGB0YXJnZXQ9X2JsYW5rYCwgZXRjLlxuXHRcdFx0XHRcdFx0KCFlLmN1cnJlbnRUYXJnZXQudGFyZ2V0IHx8IGUuY3VycmVudFRhcmdldC50YXJnZXQgPT09IFwiX3NlbGZcIikgJiZcblx0XHRcdFx0XHRcdC8vIE5vIG1vZGlmaWVyIGtleXNcblx0XHRcdFx0XHRcdCFlLmN0cmxLZXkgJiYgIWUubWV0YUtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5hbHRLZXlcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdFx0ZS5yZWRyYXcgPSBmYWxzZVxuXHRcdFx0XHRcdFx0cm91dGUuc2V0KGhyZWYsIG51bGwsIG9wdGlvbnMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY2hpbGRcblx0XHR9LFxuXHR9XG5cdHJvdXRlLnBhcmFtID0gZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIGF0dHJzICYmIGtleSAhPSBudWxsID8gYXR0cnNba2V5XSA6IGF0dHJzXG5cdH1cblxuXHRyZXR1cm4gcm91dGVcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBoeXBlcnNjcmlwdCA9IHJlcXVpcmUoXCIuL3JlbmRlci9oeXBlcnNjcmlwdFwiKVxuXG5oeXBlcnNjcmlwdC50cnVzdCA9IHJlcXVpcmUoXCIuL3JlbmRlci90cnVzdFwiKVxuaHlwZXJzY3JpcHQuZnJhZ21lbnQgPSByZXF1aXJlKFwiLi9yZW5kZXIvZnJhZ21lbnRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBoeXBlcnNjcmlwdFxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGh5cGVyc2NyaXB0ID0gcmVxdWlyZShcIi4vaHlwZXJzY3JpcHRcIilcbnZhciByZXF1ZXN0ID0gcmVxdWlyZShcIi4vcmVxdWVzdFwiKVxudmFyIG1vdW50UmVkcmF3ID0gcmVxdWlyZShcIi4vbW91bnQtcmVkcmF3XCIpXG5cbnZhciBtID0gZnVuY3Rpb24gbSgpIHsgcmV0dXJuIGh5cGVyc2NyaXB0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfVxubS5tID0gaHlwZXJzY3JpcHRcbm0udHJ1c3QgPSBoeXBlcnNjcmlwdC50cnVzdFxubS5mcmFnbWVudCA9IGh5cGVyc2NyaXB0LmZyYWdtZW50XG5tLm1vdW50ID0gbW91bnRSZWRyYXcubW91bnRcbm0ucm91dGUgPSByZXF1aXJlKFwiLi9yb3V0ZVwiKVxubS5yZW5kZXIgPSByZXF1aXJlKFwiLi9yZW5kZXJcIilcbm0ucmVkcmF3ID0gbW91bnRSZWRyYXcucmVkcmF3XG5tLnJlcXVlc3QgPSByZXF1ZXN0LnJlcXVlc3Rcbm0uanNvbnAgPSByZXF1ZXN0Lmpzb25wXG5tLnBhcnNlUXVlcnlTdHJpbmcgPSByZXF1aXJlKFwiLi9xdWVyeXN0cmluZy9wYXJzZVwiKVxubS5idWlsZFF1ZXJ5U3RyaW5nID0gcmVxdWlyZShcIi4vcXVlcnlzdHJpbmcvYnVpbGRcIilcbm0ucGFyc2VQYXRobmFtZSA9IHJlcXVpcmUoXCIuL3BhdGhuYW1lL3BhcnNlXCIpXG5tLmJ1aWxkUGF0aG5hbWUgPSByZXF1aXJlKFwiLi9wYXRobmFtZS9idWlsZFwiKVxubS52bm9kZSA9IHJlcXVpcmUoXCIuL3JlbmRlci92bm9kZVwiKVxubS5Qcm9taXNlUG9seWZpbGwgPSByZXF1aXJlKFwiLi9wcm9taXNlL3BvbHlmaWxsXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gbVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIHJlbmRlciA9IHJlcXVpcmUoXCIuL3JlbmRlclwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2FwaS9tb3VudC1yZWRyYXdcIikocmVuZGVyLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIGNvbnNvbGUpXG4iLCJcInVzZSBzdHJpY3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2UpIHtcblx0aWYoc291cmNlKSBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV0gfSlcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBidWlsZFF1ZXJ5U3RyaW5nID0gcmVxdWlyZShcIi4uL3F1ZXJ5c3RyaW5nL2J1aWxkXCIpXG52YXIgYXNzaWduID0gcmVxdWlyZShcIi4vYXNzaWduXCIpXG5cbi8vIFJldHVybnMgYHBhdGhgIGZyb20gYHRlbXBsYXRlYCArIGBwYXJhbXNgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRlbXBsYXRlLCBwYXJhbXMpIHtcblx0aWYgKCgvOihbXlxcL1xcLi1dKykoXFwuezN9KT86LykudGVzdCh0ZW1wbGF0ZSkpIHtcblx0XHR0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJUZW1wbGF0ZSBwYXJhbWV0ZXIgbmFtZXMgKm11c3QqIGJlIHNlcGFyYXRlZFwiKVxuXHR9XG5cdGlmIChwYXJhbXMgPT0gbnVsbCkgcmV0dXJuIHRlbXBsYXRlXG5cdHZhciBxdWVyeUluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihcIj9cIilcblx0dmFyIGhhc2hJbmRleCA9IHRlbXBsYXRlLmluZGV4T2YoXCIjXCIpXG5cdHZhciBxdWVyeUVuZCA9IGhhc2hJbmRleCA8IDAgPyB0ZW1wbGF0ZS5sZW5ndGggOiBoYXNoSW5kZXhcblx0dmFyIHBhdGhFbmQgPSBxdWVyeUluZGV4IDwgMCA/IHF1ZXJ5RW5kIDogcXVlcnlJbmRleFxuXHR2YXIgcGF0aCA9IHRlbXBsYXRlLnNsaWNlKDAsIHBhdGhFbmQpXG5cdHZhciBxdWVyeSA9IHt9XG5cblx0YXNzaWduKHF1ZXJ5LCBwYXJhbXMpXG5cblx0dmFyIHJlc29sdmVkID0gcGF0aC5yZXBsYWNlKC86KFteXFwvXFwuLV0rKShcXC57M30pPy9nLCBmdW5jdGlvbihtLCBrZXksIHZhcmlhZGljKSB7XG5cdFx0ZGVsZXRlIHF1ZXJ5W2tleV1cblx0XHQvLyBJZiBubyBzdWNoIHBhcmFtZXRlciBleGlzdHMsIGRvbid0IGludGVycG9sYXRlIGl0LlxuXHRcdGlmIChwYXJhbXNba2V5XSA9PSBudWxsKSByZXR1cm4gbVxuXHRcdC8vIEVzY2FwZSBub3JtYWwgcGFyYW1ldGVycywgYnV0IG5vdCB2YXJpYWRpYyBvbmVzLlxuXHRcdHJldHVybiB2YXJpYWRpYyA/IHBhcmFtc1trZXldIDogZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhwYXJhbXNba2V5XSkpXG5cdH0pXG5cblx0Ly8gSW4gY2FzZSB0aGUgdGVtcGxhdGUgc3Vic3RpdHV0aW9uIGFkZHMgbmV3IHF1ZXJ5L2hhc2ggcGFyYW1ldGVycy5cblx0dmFyIG5ld1F1ZXJ5SW5kZXggPSByZXNvbHZlZC5pbmRleE9mKFwiP1wiKVxuXHR2YXIgbmV3SGFzaEluZGV4ID0gcmVzb2x2ZWQuaW5kZXhPZihcIiNcIilcblx0dmFyIG5ld1F1ZXJ5RW5kID0gbmV3SGFzaEluZGV4IDwgMCA/IHJlc29sdmVkLmxlbmd0aCA6IG5ld0hhc2hJbmRleFxuXHR2YXIgbmV3UGF0aEVuZCA9IG5ld1F1ZXJ5SW5kZXggPCAwID8gbmV3UXVlcnlFbmQgOiBuZXdRdWVyeUluZGV4XG5cdHZhciByZXN1bHQgPSByZXNvbHZlZC5zbGljZSgwLCBuZXdQYXRoRW5kKVxuXG5cdGlmIChxdWVyeUluZGV4ID49IDApIHJlc3VsdCArPSB0ZW1wbGF0ZS5zbGljZShxdWVyeUluZGV4LCBxdWVyeUVuZClcblx0aWYgKG5ld1F1ZXJ5SW5kZXggPj0gMCkgcmVzdWx0ICs9IChxdWVyeUluZGV4IDwgMCA/IFwiP1wiIDogXCImXCIpICsgcmVzb2x2ZWQuc2xpY2UobmV3UXVlcnlJbmRleCwgbmV3UXVlcnlFbmQpXG5cdHZhciBxdWVyeXN0cmluZyA9IGJ1aWxkUXVlcnlTdHJpbmcocXVlcnkpXG5cdGlmIChxdWVyeXN0cmluZykgcmVzdWx0ICs9IChxdWVyeUluZGV4IDwgMCAmJiBuZXdRdWVyeUluZGV4IDwgMCA/IFwiP1wiIDogXCImXCIpICsgcXVlcnlzdHJpbmdcblx0aWYgKGhhc2hJbmRleCA+PSAwKSByZXN1bHQgKz0gdGVtcGxhdGUuc2xpY2UoaGFzaEluZGV4KVxuXHRpZiAobmV3SGFzaEluZGV4ID49IDApIHJlc3VsdCArPSAoaGFzaEluZGV4IDwgMCA/IFwiXCIgOiBcIiZcIikgKyByZXNvbHZlZC5zbGljZShuZXdIYXNoSW5kZXgpXG5cdHJldHVybiByZXN1bHRcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBwYXJzZVBhdGhuYW1lID0gcmVxdWlyZShcIi4vcGFyc2VcIilcblxuLy8gQ29tcGlsZXMgYSB0ZW1wbGF0ZSBpbnRvIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHJlc29sdmVkIHBhdGggKHdpdGhvdXQgcXVlcnlcbi8vIHN0cmluZ3MpIGFuZCByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0ZW1wbGF0ZSBwYXJhbWV0ZXJzIHdpdGggdGhlaXJcbi8vIHBhcnNlZCB2YWx1ZXMuIFRoaXMgZXhwZWN0cyB0aGUgaW5wdXQgb2YgdGhlIGNvbXBpbGVkIHRlbXBsYXRlIHRvIGJlIHRoZVxuLy8gb3V0cHV0IG9mIGBwYXJzZVBhdGhuYW1lYC4gTm90ZSB0aGF0IGl0IGRvZXMgKm5vdCogcmVtb3ZlIHF1ZXJ5IHBhcmFtZXRlcnNcbi8vIHNwZWNpZmllZCBpbiB0aGUgdGVtcGxhdGUuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG5cdHZhciB0ZW1wbGF0ZURhdGEgPSBwYXJzZVBhdGhuYW1lKHRlbXBsYXRlKVxuXHR2YXIgdGVtcGxhdGVLZXlzID0gT2JqZWN0LmtleXModGVtcGxhdGVEYXRhLnBhcmFtcylcblx0dmFyIGtleXMgPSBbXVxuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChcIl5cIiArIHRlbXBsYXRlRGF0YS5wYXRoLnJlcGxhY2UoXG5cdFx0Ly8gSSBlc2NhcGUgbGl0ZXJhbCB0ZXh0IHNvIHBlb3BsZSBjYW4gdXNlIHRoaW5ncyBsaWtlIGA6ZmlsZS46ZXh0YCBvclxuXHRcdC8vIGA6bGFuZy06bG9jYWxlYCBpbiByb3V0ZXMuIFRoaXMgaXMgYWxsIG1lcmdlZCBpbnRvIG9uZSBwYXNzIHNvIElcblx0XHQvLyBkb24ndCBhbHNvIGFjY2lkZW50YWxseSBlc2NhcGUgYC1gIGFuZCBtYWtlIGl0IGhhcmRlciB0byBkZXRlY3QgaXQgdG9cblx0XHQvLyBiYW4gaXQgZnJvbSB0ZW1wbGF0ZSBwYXJhbWV0ZXJzLlxuXHRcdC86KFteXFwvLi1dKykoXFwuezN9fFxcLig/IVxcLil8LSk/fFtcXFxcXiQqKy4oKXxcXFtcXF17fV0vZyxcblx0XHRmdW5jdGlvbihtLCBrZXksIGV4dHJhKSB7XG5cdFx0XHRpZiAoa2V5ID09IG51bGwpIHJldHVybiBcIlxcXFxcIiArIG1cblx0XHRcdGtleXMucHVzaCh7azoga2V5LCByOiBleHRyYSA9PT0gXCIuLi5cIn0pXG5cdFx0XHRpZiAoZXh0cmEgPT09IFwiLi4uXCIpIHJldHVybiBcIiguKilcIlxuXHRcdFx0aWYgKGV4dHJhID09PSBcIi5cIikgcmV0dXJuIFwiKFteL10rKVxcXFwuXCJcblx0XHRcdHJldHVybiBcIihbXi9dKylcIiArIChleHRyYSB8fCBcIlwiKVxuXHRcdH1cblx0KSArIFwiJFwiKVxuXHRyZXR1cm4gZnVuY3Rpb24oZGF0YSkge1xuXHRcdC8vIEZpcnN0LCBjaGVjayB0aGUgcGFyYW1zLiBVc3VhbGx5LCB0aGVyZSBpc24ndCBhbnksIGFuZCBpdCdzIGp1c3Rcblx0XHQvLyBjaGVja2luZyBhIHN0YXRpYyBzZXQuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wbGF0ZUtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0ZW1wbGF0ZURhdGEucGFyYW1zW3RlbXBsYXRlS2V5c1tpXV0gIT09IGRhdGEucGFyYW1zW3RlbXBsYXRlS2V5c1tpXV0pIHJldHVybiBmYWxzZVxuXHRcdH1cblx0XHQvLyBJZiBubyBpbnRlcnBvbGF0aW9ucyBleGlzdCwgbGV0J3Mgc2tpcCBhbGwgdGhlIGNlcmVtb255XG5cdFx0aWYgKCFrZXlzLmxlbmd0aCkgcmV0dXJuIHJlZ2V4cC50ZXN0KGRhdGEucGF0aClcblx0XHR2YXIgdmFsdWVzID0gcmVnZXhwLmV4ZWMoZGF0YS5wYXRoKVxuXHRcdGlmICh2YWx1ZXMgPT0gbnVsbCkgcmV0dXJuIGZhbHNlXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRkYXRhLnBhcmFtc1trZXlzW2ldLmtdID0ga2V5c1tpXS5yID8gdmFsdWVzW2kgKyAxXSA6IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZXNbaSArIDFdKVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgcGFyc2VRdWVyeVN0cmluZyA9IHJlcXVpcmUoXCIuLi9xdWVyeXN0cmluZy9wYXJzZVwiKVxuXG4vLyBSZXR1cm5zIGB7cGF0aCwgcGFyYW1zfWAgZnJvbSBgdXJsYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmwpIHtcblx0dmFyIHF1ZXJ5SW5kZXggPSB1cmwuaW5kZXhPZihcIj9cIilcblx0dmFyIGhhc2hJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKVxuXHR2YXIgcXVlcnlFbmQgPSBoYXNoSW5kZXggPCAwID8gdXJsLmxlbmd0aCA6IGhhc2hJbmRleFxuXHR2YXIgcGF0aEVuZCA9IHF1ZXJ5SW5kZXggPCAwID8gcXVlcnlFbmQgOiBxdWVyeUluZGV4XG5cdHZhciBwYXRoID0gdXJsLnNsaWNlKDAsIHBhdGhFbmQpLnJlcGxhY2UoL1xcL3syLH0vZywgXCIvXCIpXG5cblx0aWYgKCFwYXRoKSBwYXRoID0gXCIvXCJcblx0ZWxzZSB7XG5cdFx0aWYgKHBhdGhbMF0gIT09IFwiL1wiKSBwYXRoID0gXCIvXCIgKyBwYXRoXG5cdFx0aWYgKHBhdGgubGVuZ3RoID4gMSAmJiBwYXRoW3BhdGgubGVuZ3RoIC0gMV0gPT09IFwiL1wiKSBwYXRoID0gcGF0aC5zbGljZSgwLCAtMSlcblx0fVxuXHRyZXR1cm4ge1xuXHRcdHBhdGg6IHBhdGgsXG5cdFx0cGFyYW1zOiBxdWVyeUluZGV4IDwgMFxuXHRcdFx0PyB7fVxuXHRcdFx0OiBwYXJzZVF1ZXJ5U3RyaW5nKHVybC5zbGljZShxdWVyeUluZGV4ICsgMSwgcXVlcnlFbmQpKSxcblx0fVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcbi8qKiBAY29uc3RydWN0b3IgKi9cbnZhciBQcm9taXNlUG9seWZpbGwgPSBmdW5jdGlvbihleGVjdXRvcikge1xuXHRpZiAoISh0aGlzIGluc3RhbmNlb2YgUHJvbWlzZVBvbHlmaWxsKSkgdGhyb3cgbmV3IEVycm9yKFwiUHJvbWlzZSBtdXN0IGJlIGNhbGxlZCB3aXRoIGBuZXdgXCIpXG5cdGlmICh0eXBlb2YgZXhlY3V0b3IgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvblwiKVxuXG5cdHZhciBzZWxmID0gdGhpcywgcmVzb2x2ZXJzID0gW10sIHJlamVjdG9ycyA9IFtdLCByZXNvbHZlQ3VycmVudCA9IGhhbmRsZXIocmVzb2x2ZXJzLCB0cnVlKSwgcmVqZWN0Q3VycmVudCA9IGhhbmRsZXIocmVqZWN0b3JzLCBmYWxzZSlcblx0dmFyIGluc3RhbmNlID0gc2VsZi5faW5zdGFuY2UgPSB7cmVzb2x2ZXJzOiByZXNvbHZlcnMsIHJlamVjdG9yczogcmVqZWN0b3JzfVxuXHR2YXIgY2FsbEFzeW5jID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0SW1tZWRpYXRlIDogc2V0VGltZW91dFxuXHRmdW5jdGlvbiBoYW5kbGVyKGxpc3QsIHNob3VsZEFic29yYikge1xuXHRcdHJldHVybiBmdW5jdGlvbiBleGVjdXRlKHZhbHVlKSB7XG5cdFx0XHR2YXIgdGhlblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKHNob3VsZEFic29yYiAmJiB2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpICYmIHR5cGVvZiAodGhlbiA9IHZhbHVlLnRoZW4pID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRpZiAodmFsdWUgPT09IHNlbGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIHcvIGl0c2VsZlwiKVxuXHRcdFx0XHRcdGV4ZWN1dGVPbmNlKHRoZW4uYmluZCh2YWx1ZSkpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y2FsbEFzeW5jKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCFzaG91bGRBYnNvcmIgJiYgbGlzdC5sZW5ndGggPT09IDApIGNvbnNvbGUuZXJyb3IoXCJQb3NzaWJsZSB1bmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb246XCIsIHZhbHVlKVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSBsaXN0W2ldKHZhbHVlKVxuXHRcdFx0XHRcdFx0cmVzb2x2ZXJzLmxlbmd0aCA9IDAsIHJlamVjdG9ycy5sZW5ndGggPSAwXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5zdGF0ZSA9IHNob3VsZEFic29yYlxuXHRcdFx0XHRcdFx0aW5zdGFuY2UucmV0cnkgPSBmdW5jdGlvbigpIHtleGVjdXRlKHZhbHVlKX1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3RDdXJyZW50KGUpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGV4ZWN1dGVPbmNlKHRoZW4pIHtcblx0XHR2YXIgcnVucyA9IDBcblx0XHRmdW5jdGlvbiBydW4oZm4pIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0XHRpZiAocnVucysrID4gMCkgcmV0dXJuXG5cdFx0XHRcdGZuKHZhbHVlKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgb25lcnJvciA9IHJ1bihyZWplY3RDdXJyZW50KVxuXHRcdHRyeSB7dGhlbihydW4ocmVzb2x2ZUN1cnJlbnQpLCBvbmVycm9yKX0gY2F0Y2ggKGUpIHtvbmVycm9yKGUpfVxuXHR9XG5cblx0ZXhlY3V0ZU9uY2UoZXhlY3V0b3IpXG59XG5Qcm9taXNlUG9seWZpbGwucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3Rpb24pIHtcblx0dmFyIHNlbGYgPSB0aGlzLCBpbnN0YW5jZSA9IHNlbGYuX2luc3RhbmNlXG5cdGZ1bmN0aW9uIGhhbmRsZShjYWxsYmFjaywgbGlzdCwgbmV4dCwgc3RhdGUpIHtcblx0XHRsaXN0LnB1c2goZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgbmV4dCh2YWx1ZSlcblx0XHRcdGVsc2UgdHJ5IHtyZXNvbHZlTmV4dChjYWxsYmFjayh2YWx1ZSkpfSBjYXRjaCAoZSkge2lmIChyZWplY3ROZXh0KSByZWplY3ROZXh0KGUpfVxuXHRcdH0pXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZS5yZXRyeSA9PT0gXCJmdW5jdGlvblwiICYmIHN0YXRlID09PSBpbnN0YW5jZS5zdGF0ZSkgaW5zdGFuY2UucmV0cnkoKVxuXHR9XG5cdHZhciByZXNvbHZlTmV4dCwgcmVqZWN0TmV4dFxuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7cmVzb2x2ZU5leHQgPSByZXNvbHZlLCByZWplY3ROZXh0ID0gcmVqZWN0fSlcblx0aGFuZGxlKG9uRnVsZmlsbGVkLCBpbnN0YW5jZS5yZXNvbHZlcnMsIHJlc29sdmVOZXh0LCB0cnVlKSwgaGFuZGxlKG9uUmVqZWN0aW9uLCBpbnN0YW5jZS5yZWplY3RvcnMsIHJlamVjdE5leHQsIGZhbHNlKVxuXHRyZXR1cm4gcHJvbWlzZVxufVxuUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS5jYXRjaCA9IGZ1bmN0aW9uKG9uUmVqZWN0aW9uKSB7XG5cdHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3Rpb24pXG59XG5Qcm9taXNlUG9seWZpbGwucHJvdG90eXBlLmZpbmFsbHkgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRyZXR1cm4gdGhpcy50aGVuKFxuXHRcdGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZVBvbHlmaWxsLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0ZnVuY3Rpb24ocmVhc29uKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZVBvbHlmaWxsLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2VQb2x5ZmlsbC5yZWplY3QocmVhc29uKTtcblx0XHRcdH0pXG5cdFx0fVxuXHQpXG59XG5Qcm9taXNlUG9seWZpbGwucmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2VQb2x5ZmlsbCkgcmV0dXJuIHZhbHVlXG5cdHJldHVybiBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUpIHtyZXNvbHZlKHZhbHVlKX0pXG59XG5Qcm9taXNlUG9seWZpbGwucmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7cmVqZWN0KHZhbHVlKX0pXG59XG5Qcm9taXNlUG9seWZpbGwuYWxsID0gZnVuY3Rpb24obGlzdCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHR2YXIgdG90YWwgPSBsaXN0Lmxlbmd0aCwgY291bnQgPSAwLCB2YWx1ZXMgPSBbXVxuXHRcdGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkgcmVzb2x2ZShbXSlcblx0XHRlbHNlIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0KGZ1bmN0aW9uKGkpIHtcblx0XHRcdFx0ZnVuY3Rpb24gY29uc3VtZSh2YWx1ZSkge1xuXHRcdFx0XHRcdGNvdW50Kytcblx0XHRcdFx0XHR2YWx1ZXNbaV0gPSB2YWx1ZVxuXHRcdFx0XHRcdGlmIChjb3VudCA9PT0gdG90YWwpIHJlc29sdmUodmFsdWVzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChsaXN0W2ldICE9IG51bGwgJiYgKHR5cGVvZiBsaXN0W2ldID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBsaXN0W2ldID09PSBcImZ1bmN0aW9uXCIpICYmIHR5cGVvZiBsaXN0W2ldLnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGxpc3RbaV0udGhlbihjb25zdW1lLCByZWplY3QpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBjb25zdW1lKGxpc3RbaV0pXG5cdFx0XHR9KShpKVxuXHRcdH1cblx0fSlcbn1cblByb21pc2VQb2x5ZmlsbC5yYWNlID0gZnVuY3Rpb24obGlzdCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxpc3RbaV0udGhlbihyZXNvbHZlLCByZWplY3QpXG5cdFx0fVxuXHR9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2VQb2x5ZmlsbFxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFByb21pc2VQb2x5ZmlsbCA9IHJlcXVpcmUoXCIuL3BvbHlmaWxsXCIpXG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdGlmICh0eXBlb2Ygd2luZG93LlByb21pc2UgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHR3aW5kb3cuUHJvbWlzZSA9IFByb21pc2VQb2x5ZmlsbFxuXHR9IGVsc2UgaWYgKCF3aW5kb3cuUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSkge1xuXHRcdHdpbmRvdy5Qcm9taXNlLnByb3RvdHlwZS5maW5hbGx5ID0gUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS5maW5hbGx5XG5cdH1cblx0bW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuUHJvbWlzZVxufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsLlByb21pc2UgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRnbG9iYWwuUHJvbWlzZSA9IFByb21pc2VQb2x5ZmlsbFxuXHR9IGVsc2UgaWYgKCFnbG9iYWwuUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSkge1xuXHRcdGdsb2JhbC5Qcm9taXNlLnByb3RvdHlwZS5maW5hbGx5ID0gUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS5maW5hbGx5XG5cdH1cblx0bW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuUHJvbWlzZVxufSBlbHNlIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlUG9seWZpbGxcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSAhPT0gXCJbb2JqZWN0IE9iamVjdF1cIikgcmV0dXJuIFwiXCJcblxuXHR2YXIgYXJncyA9IFtdXG5cdGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcblx0XHRkZXN0cnVjdHVyZShrZXksIG9iamVjdFtrZXldKVxuXHR9XG5cblx0cmV0dXJuIGFyZ3Muam9pbihcIiZcIilcblxuXHRmdW5jdGlvbiBkZXN0cnVjdHVyZShrZXksIHZhbHVlKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGRlc3RydWN0dXJlKGtleSArIFwiW1wiICsgaSArIFwiXVwiLCB2YWx1ZVtpXSlcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIikge1xuXHRcdFx0Zm9yICh2YXIgaSBpbiB2YWx1ZSkge1xuXHRcdFx0XHRkZXN0cnVjdHVyZShrZXkgKyBcIltcIiArIGkgKyBcIl1cIiwgdmFsdWVbaV0pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgYXJncy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IFwiXCIgPyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgOiBcIlwiKSlcblx0fVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdHJpbmcpIHtcblx0aWYgKHN0cmluZyA9PT0gXCJcIiB8fCBzdHJpbmcgPT0gbnVsbCkgcmV0dXJuIHt9XG5cdGlmIChzdHJpbmcuY2hhckF0KDApID09PSBcIj9cIikgc3RyaW5nID0gc3RyaW5nLnNsaWNlKDEpXG5cblx0dmFyIGVudHJpZXMgPSBzdHJpbmcuc3BsaXQoXCImXCIpLCBjb3VudGVycyA9IHt9LCBkYXRhID0ge31cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGVudHJ5ID0gZW50cmllc1tpXS5zcGxpdChcIj1cIilcblx0XHR2YXIga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGVudHJ5WzBdKVxuXHRcdHZhciB2YWx1ZSA9IGVudHJ5Lmxlbmd0aCA9PT0gMiA/IGRlY29kZVVSSUNvbXBvbmVudChlbnRyeVsxXSkgOiBcIlwiXG5cblx0XHRpZiAodmFsdWUgPT09IFwidHJ1ZVwiKSB2YWx1ZSA9IHRydWVcblx0XHRlbHNlIGlmICh2YWx1ZSA9PT0gXCJmYWxzZVwiKSB2YWx1ZSA9IGZhbHNlXG5cblx0XHR2YXIgbGV2ZWxzID0ga2V5LnNwbGl0KC9cXF1cXFs/fFxcWy8pXG5cdFx0dmFyIGN1cnNvciA9IGRhdGFcblx0XHRpZiAoa2V5LmluZGV4T2YoXCJbXCIpID4gLTEpIGxldmVscy5wb3AoKVxuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgbGV2ZWxzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHR2YXIgbGV2ZWwgPSBsZXZlbHNbal0sIG5leHRMZXZlbCA9IGxldmVsc1tqICsgMV1cblx0XHRcdHZhciBpc051bWJlciA9IG5leHRMZXZlbCA9PSBcIlwiIHx8ICFpc05hTihwYXJzZUludChuZXh0TGV2ZWwsIDEwKSlcblx0XHRcdGlmIChsZXZlbCA9PT0gXCJcIikge1xuXHRcdFx0XHR2YXIga2V5ID0gbGV2ZWxzLnNsaWNlKDAsIGopLmpvaW4oKVxuXHRcdFx0XHRpZiAoY291bnRlcnNba2V5XSA9PSBudWxsKSB7XG5cdFx0XHRcdFx0Y291bnRlcnNba2V5XSA9IEFycmF5LmlzQXJyYXkoY3Vyc29yKSA/IGN1cnNvci5sZW5ndGggOiAwXG5cdFx0XHRcdH1cblx0XHRcdFx0bGV2ZWwgPSBjb3VudGVyc1trZXldKytcblx0XHRcdH1cblx0XHRcdC8vIERpc2FsbG93IGRpcmVjdCBwcm90b3R5cGUgcG9sbHV0aW9uXG5cdFx0XHRlbHNlIGlmIChsZXZlbCA9PT0gXCJfX3Byb3RvX19cIikgYnJlYWtcblx0XHRcdGlmIChqID09PSBsZXZlbHMubGVuZ3RoIC0gMSkgY3Vyc29yW2xldmVsXSA9IHZhbHVlXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Ly8gUmVhZCBvd24gcHJvcGVydGllcyBleGNsdXNpdmVseSB0byBkaXNhbGxvdyBpbmRpcmVjdFxuXHRcdFx0XHQvLyBwcm90b3R5cGUgcG9sbHV0aW9uXG5cdFx0XHRcdHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjdXJzb3IsIGxldmVsKVxuXHRcdFx0XHRpZiAoZGVzYyAhPSBudWxsKSBkZXNjID0gZGVzYy52YWx1ZVxuXHRcdFx0XHRpZiAoZGVzYyA9PSBudWxsKSBjdXJzb3JbbGV2ZWxdID0gZGVzYyA9IGlzTnVtYmVyID8gW10gOiB7fVxuXHRcdFx0XHRjdXJzb3IgPSBkZXNjXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBkYXRhXG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3JlbmRlci9yZW5kZXJcIikod2luZG93KVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxudmFyIGh5cGVyc2NyaXB0Vm5vZGUgPSByZXF1aXJlKFwiLi9oeXBlcnNjcmlwdFZub2RlXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHZhciB2bm9kZSA9IGh5cGVyc2NyaXB0Vm5vZGUuYXBwbHkoMCwgYXJndW1lbnRzKVxuXG5cdHZub2RlLnRhZyA9IFwiW1wiXG5cdHZub2RlLmNoaWxkcmVuID0gVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4odm5vZGUuY2hpbGRyZW4pXG5cdHJldHVybiB2bm9kZVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxudmFyIGh5cGVyc2NyaXB0Vm5vZGUgPSByZXF1aXJlKFwiLi9oeXBlcnNjcmlwdFZub2RlXCIpXG5cbnZhciBzZWxlY3RvclBhcnNlciA9IC8oPzooXnwjfFxcLikoW14jXFwuXFxbXFxdXSspKXwoXFxbKC4rPykoPzpcXHMqPVxccyooXCJ8J3wpKCg/OlxcXFxbXCInXFxdXXwuKSo/KVxcNSk/XFxdKS9nXG52YXIgc2VsZWN0b3JDYWNoZSA9IHt9XG52YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHlcblxuZnVuY3Rpb24gaXNFbXB0eShvYmplY3QpIHtcblx0Zm9yICh2YXIga2V5IGluIG9iamVjdCkgaWYgKGhhc093bi5jYWxsKG9iamVjdCwga2V5KSkgcmV0dXJuIGZhbHNlXG5cdHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVTZWxlY3RvcihzZWxlY3Rvcikge1xuXHR2YXIgbWF0Y2gsIHRhZyA9IFwiZGl2XCIsIGNsYXNzZXMgPSBbXSwgYXR0cnMgPSB7fVxuXHR3aGlsZSAobWF0Y2ggPSBzZWxlY3RvclBhcnNlci5leGVjKHNlbGVjdG9yKSkge1xuXHRcdHZhciB0eXBlID0gbWF0Y2hbMV0sIHZhbHVlID0gbWF0Y2hbMl1cblx0XHRpZiAodHlwZSA9PT0gXCJcIiAmJiB2YWx1ZSAhPT0gXCJcIikgdGFnID0gdmFsdWVcblx0XHRlbHNlIGlmICh0eXBlID09PSBcIiNcIikgYXR0cnMuaWQgPSB2YWx1ZVxuXHRcdGVsc2UgaWYgKHR5cGUgPT09IFwiLlwiKSBjbGFzc2VzLnB1c2godmFsdWUpXG5cdFx0ZWxzZSBpZiAobWF0Y2hbM11bMF0gPT09IFwiW1wiKSB7XG5cdFx0XHR2YXIgYXR0clZhbHVlID0gbWF0Y2hbNl1cblx0XHRcdGlmIChhdHRyVmFsdWUpIGF0dHJWYWx1ZSA9IGF0dHJWYWx1ZS5yZXBsYWNlKC9cXFxcKFtcIiddKS9nLCBcIiQxXCIpLnJlcGxhY2UoL1xcXFxcXFxcL2csIFwiXFxcXFwiKVxuXHRcdFx0aWYgKG1hdGNoWzRdID09PSBcImNsYXNzXCIpIGNsYXNzZXMucHVzaChhdHRyVmFsdWUpXG5cdFx0XHRlbHNlIGF0dHJzW21hdGNoWzRdXSA9IGF0dHJWYWx1ZSA9PT0gXCJcIiA/IGF0dHJWYWx1ZSA6IGF0dHJWYWx1ZSB8fCB0cnVlXG5cdFx0fVxuXHR9XG5cdGlmIChjbGFzc2VzLmxlbmd0aCA+IDApIGF0dHJzLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbihcIiBcIilcblx0cmV0dXJuIHNlbGVjdG9yQ2FjaGVbc2VsZWN0b3JdID0ge3RhZzogdGFnLCBhdHRyczogYXR0cnN9XG59XG5cbmZ1bmN0aW9uIGV4ZWNTZWxlY3RvcihzdGF0ZSwgdm5vZGUpIHtcblx0dmFyIGF0dHJzID0gdm5vZGUuYXR0cnNcblx0dmFyIGNoaWxkcmVuID0gVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4odm5vZGUuY2hpbGRyZW4pXG5cdHZhciBoYXNDbGFzcyA9IGhhc093bi5jYWxsKGF0dHJzLCBcImNsYXNzXCIpXG5cdHZhciBjbGFzc05hbWUgPSBoYXNDbGFzcyA/IGF0dHJzLmNsYXNzIDogYXR0cnMuY2xhc3NOYW1lXG5cblx0dm5vZGUudGFnID0gc3RhdGUudGFnXG5cdHZub2RlLmF0dHJzID0gbnVsbFxuXHR2bm9kZS5jaGlsZHJlbiA9IHVuZGVmaW5lZFxuXG5cdGlmICghaXNFbXB0eShzdGF0ZS5hdHRycykgJiYgIWlzRW1wdHkoYXR0cnMpKSB7XG5cdFx0dmFyIG5ld0F0dHJzID0ge31cblxuXHRcdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdFx0aWYgKGhhc093bi5jYWxsKGF0dHJzLCBrZXkpKSBuZXdBdHRyc1trZXldID0gYXR0cnNba2V5XVxuXHRcdH1cblxuXHRcdGF0dHJzID0gbmV3QXR0cnNcblx0fVxuXG5cdGZvciAodmFyIGtleSBpbiBzdGF0ZS5hdHRycykge1xuXHRcdGlmIChoYXNPd24uY2FsbChzdGF0ZS5hdHRycywga2V5KSAmJiBrZXkgIT09IFwiY2xhc3NOYW1lXCIgJiYgIWhhc093bi5jYWxsKGF0dHJzLCBrZXkpKXtcblx0XHRcdGF0dHJzW2tleV0gPSBzdGF0ZS5hdHRyc1trZXldXG5cdFx0fVxuXHR9XG5cdGlmIChjbGFzc05hbWUgIT0gbnVsbCB8fCBzdGF0ZS5hdHRycy5jbGFzc05hbWUgIT0gbnVsbCkgYXR0cnMuY2xhc3NOYW1lID1cblx0XHRjbGFzc05hbWUgIT0gbnVsbFxuXHRcdFx0PyBzdGF0ZS5hdHRycy5jbGFzc05hbWUgIT0gbnVsbFxuXHRcdFx0XHQ/IFN0cmluZyhzdGF0ZS5hdHRycy5jbGFzc05hbWUpICsgXCIgXCIgKyBTdHJpbmcoY2xhc3NOYW1lKVxuXHRcdFx0XHQ6IGNsYXNzTmFtZVxuXHRcdFx0OiBzdGF0ZS5hdHRycy5jbGFzc05hbWUgIT0gbnVsbFxuXHRcdFx0XHQ/IHN0YXRlLmF0dHJzLmNsYXNzTmFtZVxuXHRcdFx0XHQ6IG51bGxcblxuXHRpZiAoaGFzQ2xhc3MpIGF0dHJzLmNsYXNzID0gbnVsbFxuXG5cdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdGlmIChoYXNPd24uY2FsbChhdHRycywga2V5KSAmJiBrZXkgIT09IFwia2V5XCIpIHtcblx0XHRcdHZub2RlLmF0dHJzID0gYXR0cnNcblx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0aWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmIGNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBjaGlsZHJlblswXSAhPSBudWxsICYmIGNoaWxkcmVuWzBdLnRhZyA9PT0gXCIjXCIpIHtcblx0XHR2bm9kZS50ZXh0ID0gY2hpbGRyZW5bMF0uY2hpbGRyZW5cblx0fSBlbHNlIHtcblx0XHR2bm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuXG5cdH1cblxuXHRyZXR1cm4gdm5vZGVcbn1cblxuZnVuY3Rpb24gaHlwZXJzY3JpcHQoc2VsZWN0b3IpIHtcblx0aWYgKHNlbGVjdG9yID09IG51bGwgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBzZWxlY3Rvci52aWV3ICE9PSBcImZ1bmN0aW9uXCIpIHtcblx0XHR0aHJvdyBFcnJvcihcIlRoZSBzZWxlY3RvciBtdXN0IGJlIGVpdGhlciBhIHN0cmluZyBvciBhIGNvbXBvbmVudC5cIik7XG5cdH1cblxuXHR2YXIgdm5vZGUgPSBoeXBlcnNjcmlwdFZub2RlLmFwcGx5KDEsIGFyZ3VtZW50cylcblxuXHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKSB7XG5cdFx0dm5vZGUuY2hpbGRyZW4gPSBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbih2bm9kZS5jaGlsZHJlbilcblx0XHRpZiAoc2VsZWN0b3IgIT09IFwiW1wiKSByZXR1cm4gZXhlY1NlbGVjdG9yKHNlbGVjdG9yQ2FjaGVbc2VsZWN0b3JdIHx8IGNvbXBpbGVTZWxlY3RvcihzZWxlY3RvciksIHZub2RlKVxuXHR9XG5cblx0dm5vZGUudGFnID0gc2VsZWN0b3Jcblx0cmV0dXJuIHZub2RlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHlwZXJzY3JpcHRcbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcblxuLy8gQ2FsbCB2aWEgYGh5cGVyc2NyaXB0Vm5vZGUuYXBwbHkoc3RhcnRPZmZzZXQsIGFyZ3VtZW50cylgXG4vL1xuLy8gVGhlIHJlYXNvbiBJIGRvIGl0IHRoaXMgd2F5LCBmb3J3YXJkaW5nIHRoZSBhcmd1bWVudHMgYW5kIHBhc3NpbmcgdGhlIHN0YXJ0XG4vLyBvZmZzZXQgaW4gYHRoaXNgLCBpcyBzbyBJIGRvbid0IGhhdmUgdG8gY3JlYXRlIGEgdGVtcG9yYXJ5IGFycmF5IGluIGFcbi8vIHBlcmZvcm1hbmNlLWNyaXRpY2FsIHBhdGguXG4vL1xuLy8gSW4gbmF0aXZlIEVTNiwgSSdkIGluc3RlYWQgYWRkIGEgZmluYWwgYC4uLmFyZ3NgIHBhcmFtZXRlciB0byB0aGVcbi8vIGBoeXBlcnNjcmlwdGAgYW5kIGBmcmFnbWVudGAgZmFjdG9yaWVzIGFuZCBkZWZpbmUgdGhpcyBhc1xuLy8gYGh5cGVyc2NyaXB0Vm5vZGUoLi4uYXJncylgLCBzaW5jZSBtb2Rlcm4gZW5naW5lcyBkbyBvcHRpbWl6ZSB0aGF0IGF3YXkuIEJ1dFxuLy8gRVM1ICh3aGF0IE1pdGhyaWwgcmVxdWlyZXMgdGhhbmtzIHRvIElFIHN1cHBvcnQpIGRvZXNuJ3QgZ2l2ZSBtZSB0aGF0IGx1eHVyeSxcbi8vIGFuZCBlbmdpbmVzIGFyZW4ndCBuZWFybHkgaW50ZWxsaWdlbnQgZW5vdWdoIHRvIGRvIGVpdGhlciBvZiB0aGVzZTpcbi8vXG4vLyAxLiBFbGlkZSB0aGUgYWxsb2NhdGlvbiBmb3IgYFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKWAgd2hlbiBpdCdzIHBhc3NlZCB0b1xuLy8gICAgYW5vdGhlciBmdW5jdGlvbiBvbmx5IHRvIGJlIGluZGV4ZWQuXG4vLyAyLiBFbGlkZSBhbiBgYXJndW1lbnRzYCBhbGxvY2F0aW9uIHdoZW4gaXQncyBwYXNzZWQgdG8gYW55IGZ1bmN0aW9uIG90aGVyXG4vLyAgICB0aGFuIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgIG9yIGBSZWZsZWN0LmFwcGx5YC5cbi8vXG4vLyBJbiBFUzYsIGl0J2QgcHJvYmFibHkgbG9vayBjbG9zZXIgdG8gdGhpcyAoSSdkIG5lZWQgdG8gcHJvZmlsZSBpdCwgdGhvdWdoKTpcbi8vIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXR0cnMsIC4uLmNoaWxkcmVuKSB7XG4vLyAgICAgaWYgKGF0dHJzID09IG51bGwgfHwgdHlwZW9mIGF0dHJzID09PSBcIm9iamVjdFwiICYmIGF0dHJzLnRhZyA9PSBudWxsICYmICFBcnJheS5pc0FycmF5KGF0dHJzKSkge1xuLy8gICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkoY2hpbGRyZW5bMF0pKSBjaGlsZHJlbiA9IGNoaWxkcmVuWzBdXG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5sZW5ndGggPT09IDAgJiYgQXJyYXkuaXNBcnJheShhdHRycykgPyBhdHRycyA6IFthdHRycywgLi4uY2hpbGRyZW5dXG4vLyAgICAgICAgIGF0dHJzID0gdW5kZWZpbmVkXG4vLyAgICAgfVxuLy9cbi8vICAgICBpZiAoYXR0cnMgPT0gbnVsbCkgYXR0cnMgPSB7fVxuLy8gICAgIHJldHVybiBWbm9kZShcIlwiLCBhdHRycy5rZXksIGF0dHJzLCBjaGlsZHJlbilcbi8vIH1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHZhciBhdHRycyA9IGFyZ3VtZW50c1t0aGlzXSwgc3RhcnQgPSB0aGlzICsgMSwgY2hpbGRyZW5cblxuXHRpZiAoYXR0cnMgPT0gbnVsbCkge1xuXHRcdGF0dHJzID0ge31cblx0fSBlbHNlIGlmICh0eXBlb2YgYXR0cnMgIT09IFwib2JqZWN0XCIgfHwgYXR0cnMudGFnICE9IG51bGwgfHwgQXJyYXkuaXNBcnJheShhdHRycykpIHtcblx0XHRhdHRycyA9IHt9XG5cdFx0c3RhcnQgPSB0aGlzXG5cdH1cblxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gc3RhcnQgKyAxKSB7XG5cdFx0Y2hpbGRyZW4gPSBhcmd1bWVudHNbc3RhcnRdXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkgY2hpbGRyZW4gPSBbY2hpbGRyZW5dXG5cdH0gZWxzZSB7XG5cdFx0Y2hpbGRyZW4gPSBbXVxuXHRcdHdoaWxlIChzdGFydCA8IGFyZ3VtZW50cy5sZW5ndGgpIGNoaWxkcmVuLnB1c2goYXJndW1lbnRzW3N0YXJ0KytdKVxuXHR9XG5cblx0cmV0dXJuIFZub2RlKFwiXCIsIGF0dHJzLmtleSwgYXR0cnMsIGNoaWxkcmVuKVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCR3aW5kb3cpIHtcblx0dmFyICRkb2MgPSAkd2luZG93ICYmICR3aW5kb3cuZG9jdW1lbnRcblx0dmFyIGN1cnJlbnRSZWRyYXdcblxuXHR2YXIgbmFtZVNwYWNlID0ge1xuXHRcdHN2ZzogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuXHRcdG1hdGg6IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTFwiXG5cdH1cblxuXHRmdW5jdGlvbiBnZXROYW1lU3BhY2Uodm5vZGUpIHtcblx0XHRyZXR1cm4gdm5vZGUuYXR0cnMgJiYgdm5vZGUuYXR0cnMueG1sbnMgfHwgbmFtZVNwYWNlW3Zub2RlLnRhZ11cblx0fVxuXG5cdC8vc2FuaXR5IGNoZWNrIHRvIGRpc2NvdXJhZ2UgcGVvcGxlIGZyb20gZG9pbmcgYHZub2RlLnN0YXRlID0gLi4uYFxuXHRmdW5jdGlvbiBjaGVja1N0YXRlKHZub2RlLCBvcmlnaW5hbCkge1xuXHRcdGlmICh2bm9kZS5zdGF0ZSAhPT0gb3JpZ2luYWwpIHRocm93IG5ldyBFcnJvcihcImB2bm9kZS5zdGF0ZWAgbXVzdCBub3QgYmUgbW9kaWZpZWRcIilcblx0fVxuXG5cdC8vTm90ZTogdGhlIGhvb2sgaXMgcGFzc2VkIGFzIHRoZSBgdGhpc2AgYXJndW1lbnQgdG8gYWxsb3cgcHJveHlpbmcgdGhlXG5cdC8vYXJndW1lbnRzIHdpdGhvdXQgcmVxdWlyaW5nIGEgZnVsbCBhcnJheSBhbGxvY2F0aW9uIHRvIGRvIHNvLiBJdCBhbHNvXG5cdC8vdGFrZXMgYWR2YW50YWdlIG9mIHRoZSBmYWN0IHRoZSBjdXJyZW50IGB2bm9kZWAgaXMgdGhlIGZpcnN0IGFyZ3VtZW50IGluXG5cdC8vYWxsIGxpZmVjeWNsZSBtZXRob2RzLlxuXHRmdW5jdGlvbiBjYWxsSG9vayh2bm9kZSkge1xuXHRcdHZhciBvcmlnaW5hbCA9IHZub2RlLnN0YXRlXG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiB0aGlzLmFwcGx5KG9yaWdpbmFsLCBhcmd1bWVudHMpXG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGNoZWNrU3RhdGUodm5vZGUsIG9yaWdpbmFsKVxuXHRcdH1cblx0fVxuXG5cdC8vIElFMTEgKGF0IGxlYXN0KSB0aHJvd3MgYW4gVW5zcGVjaWZpZWRFcnJvciB3aGVuIGFjY2Vzc2luZyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHdoZW5cblx0Ly8gaW5zaWRlIGFuIGlmcmFtZS4gQ2F0Y2ggYW5kIHN3YWxsb3cgdGhpcyBlcnJvciwgYW5kIGhlYXZ5LWhhbmRpZGx5IHJldHVybiBudWxsLlxuXHRmdW5jdGlvbiBhY3RpdmVFbGVtZW50KCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gJGRvYy5hY3RpdmVFbGVtZW50XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9XG5cdH1cblx0Ly9jcmVhdGVcblx0ZnVuY3Rpb24gY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHRmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0dmFyIHZub2RlID0gdm5vZGVzW2ldXG5cdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkge1xuXHRcdFx0XHRjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciB0YWcgPSB2bm9kZS50YWdcblx0XHRpZiAodHlwZW9mIHRhZyA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0dm5vZGUuc3RhdGUgPSB7fVxuXHRcdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwpIGluaXRMaWZlY3ljbGUodm5vZGUuYXR0cnMsIHZub2RlLCBob29rcylcblx0XHRcdHN3aXRjaCAodGFnKSB7XG5cdFx0XHRcdGNhc2UgXCIjXCI6IGNyZWF0ZVRleHQocGFyZW50LCB2bm9kZSwgbmV4dFNpYmxpbmcpOyBicmVha1xuXHRcdFx0XHRjYXNlIFwiPFwiOiBjcmVhdGVIVE1MKHBhcmVudCwgdm5vZGUsIG5zLCBuZXh0U2libGluZyk7IGJyZWFrXG5cdFx0XHRcdGNhc2UgXCJbXCI6IGNyZWF0ZUZyYWdtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpOyBicmVha1xuXHRcdFx0XHRkZWZhdWx0OiBjcmVhdGVFbGVtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgY3JlYXRlQ29tcG9uZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlVGV4dChwYXJlbnQsIHZub2RlLCBuZXh0U2libGluZykge1xuXHRcdHZub2RlLmRvbSA9ICRkb2MuY3JlYXRlVGV4dE5vZGUodm5vZGUuY2hpbGRyZW4pXG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIHZub2RlLmRvbSwgbmV4dFNpYmxpbmcpXG5cdH1cblx0dmFyIHBvc3NpYmxlUGFyZW50cyA9IHtjYXB0aW9uOiBcInRhYmxlXCIsIHRoZWFkOiBcInRhYmxlXCIsIHRib2R5OiBcInRhYmxlXCIsIHRmb290OiBcInRhYmxlXCIsIHRyOiBcInRib2R5XCIsIHRoOiBcInRyXCIsIHRkOiBcInRyXCIsIGNvbGdyb3VwOiBcInRhYmxlXCIsIGNvbDogXCJjb2xncm91cFwifVxuXHRmdW5jdGlvbiBjcmVhdGVIVE1MKHBhcmVudCwgdm5vZGUsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciBtYXRjaCA9IHZub2RlLmNoaWxkcmVuLm1hdGNoKC9eXFxzKj88KFxcdyspL2ltKSB8fCBbXVxuXHRcdC8vIG5vdCB1c2luZyB0aGUgcHJvcGVyIHBhcmVudCBtYWtlcyB0aGUgY2hpbGQgZWxlbWVudChzKSB2YW5pc2guXG5cdFx0Ly8gICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cdFx0Ly8gICAgIGRpdi5pbm5lckhUTUwgPSBcIjx0ZD5pPC90ZD48dGQ+ajwvdGQ+XCJcblx0XHQvLyAgICAgY29uc29sZS5sb2coZGl2LmlubmVySFRNTClcblx0XHQvLyAtLT4gXCJpalwiLCBubyA8dGQ+IGluIHNpZ2h0LlxuXHRcdHZhciB0ZW1wID0gJGRvYy5jcmVhdGVFbGVtZW50KHBvc3NpYmxlUGFyZW50c1ttYXRjaFsxXV0gfHwgXCJkaXZcIilcblx0XHRpZiAobnMgPT09IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIikge1xuXHRcdFx0dGVtcC5pbm5lckhUTUwgPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj5cIiArIHZub2RlLmNoaWxkcmVuICsgXCI8L3N2Zz5cIlxuXHRcdFx0dGVtcCA9IHRlbXAuZmlyc3RDaGlsZFxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0ZW1wLmlubmVySFRNTCA9IHZub2RlLmNoaWxkcmVuXG5cdFx0fVxuXHRcdHZub2RlLmRvbSA9IHRlbXAuZmlyc3RDaGlsZFxuXHRcdHZub2RlLmRvbVNpemUgPSB0ZW1wLmNoaWxkTm9kZXMubGVuZ3RoXG5cdFx0Ly8gQ2FwdHVyZSBub2RlcyB0byByZW1vdmUsIHNvIHdlIGRvbid0IGNvbmZ1c2UgdGhlbS5cblx0XHR2bm9kZS5pbnN0YW5jZSA9IFtdXG5cdFx0dmFyIGZyYWdtZW50ID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHR2YXIgY2hpbGRcblx0XHR3aGlsZSAoY2hpbGQgPSB0ZW1wLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHZub2RlLmluc3RhbmNlLnB1c2goY2hpbGQpXG5cdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChjaGlsZClcblx0XHR9XG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIGZyYWdtZW50LCBuZXh0U2libGluZylcblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVGcmFnbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHRpZiAodm5vZGUuY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0dmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHRcdGNyZWF0ZU5vZGVzKGZyYWdtZW50LCBjaGlsZHJlbiwgMCwgY2hpbGRyZW4ubGVuZ3RoLCBob29rcywgbnVsbCwgbnMpXG5cdFx0fVxuXHRcdHZub2RlLmRvbSA9IGZyYWdtZW50LmZpcnN0Q2hpbGRcblx0XHR2bm9kZS5kb21TaXplID0gZnJhZ21lbnQuY2hpbGROb2Rlcy5sZW5ndGhcblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZnJhZ21lbnQsIG5leHRTaWJsaW5nKVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciB0YWcgPSB2bm9kZS50YWdcblx0XHR2YXIgYXR0cnMgPSB2bm9kZS5hdHRyc1xuXHRcdHZhciBpcyA9IGF0dHJzICYmIGF0dHJzLmlzXG5cblx0XHRucyA9IGdldE5hbWVTcGFjZSh2bm9kZSkgfHwgbnNcblxuXHRcdHZhciBlbGVtZW50ID0gbnMgP1xuXHRcdFx0aXMgPyAkZG9jLmNyZWF0ZUVsZW1lbnROUyhucywgdGFnLCB7aXM6IGlzfSkgOiAkZG9jLmNyZWF0ZUVsZW1lbnROUyhucywgdGFnKSA6XG5cdFx0XHRpcyA/ICRkb2MuY3JlYXRlRWxlbWVudCh0YWcsIHtpczogaXN9KSA6ICRkb2MuY3JlYXRlRWxlbWVudCh0YWcpXG5cdFx0dm5vZGUuZG9tID0gZWxlbWVudFxuXG5cdFx0aWYgKGF0dHJzICE9IG51bGwpIHtcblx0XHRcdHNldEF0dHJzKHZub2RlLCBhdHRycywgbnMpXG5cdFx0fVxuXG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIGVsZW1lbnQsIG5leHRTaWJsaW5nKVxuXG5cdFx0aWYgKCFtYXliZVNldENvbnRlbnRFZGl0YWJsZSh2bm9kZSkpIHtcblx0XHRcdGlmICh2bm9kZS50ZXh0ICE9IG51bGwpIHtcblx0XHRcdFx0aWYgKHZub2RlLnRleHQgIT09IFwiXCIpIGVsZW1lbnQudGV4dENvbnRlbnQgPSB2bm9kZS50ZXh0XG5cdFx0XHRcdGVsc2Ugdm5vZGUuY2hpbGRyZW4gPSBbVm5vZGUoXCIjXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB2bm9kZS50ZXh0LCB1bmRlZmluZWQsIHVuZGVmaW5lZCldXG5cdFx0XHR9XG5cdFx0XHRpZiAodm5vZGUuY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdFx0XHRjcmVhdGVOb2RlcyhlbGVtZW50LCBjaGlsZHJlbiwgMCwgY2hpbGRyZW4ubGVuZ3RoLCBob29rcywgbnVsbCwgbnMpXG5cdFx0XHRcdGlmICh2bm9kZS50YWcgPT09IFwic2VsZWN0XCIgJiYgYXR0cnMgIT0gbnVsbCkgc2V0TGF0ZVNlbGVjdEF0dHJzKHZub2RlLCBhdHRycylcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gaW5pdENvbXBvbmVudCh2bm9kZSwgaG9va3MpIHtcblx0XHR2YXIgc2VudGluZWxcblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZy52aWV3ID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHZub2RlLnN0YXRlID0gT2JqZWN0LmNyZWF0ZSh2bm9kZS50YWcpXG5cdFx0XHRzZW50aW5lbCA9IHZub2RlLnN0YXRlLnZpZXdcblx0XHRcdGlmIChzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCAhPSBudWxsKSByZXR1cm5cblx0XHRcdHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkID0gdHJ1ZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2bm9kZS5zdGF0ZSA9IHZvaWQgMFxuXHRcdFx0c2VudGluZWwgPSB2bm9kZS50YWdcblx0XHRcdGlmIChzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCAhPSBudWxsKSByZXR1cm5cblx0XHRcdHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkID0gdHJ1ZVxuXHRcdFx0dm5vZGUuc3RhdGUgPSAodm5vZGUudGFnLnByb3RvdHlwZSAhPSBudWxsICYmIHR5cGVvZiB2bm9kZS50YWcucHJvdG90eXBlLnZpZXcgPT09IFwiZnVuY3Rpb25cIikgPyBuZXcgdm5vZGUudGFnKHZub2RlKSA6IHZub2RlLnRhZyh2bm9kZSlcblx0XHR9XG5cdFx0aW5pdExpZmVjeWNsZSh2bm9kZS5zdGF0ZSwgdm5vZGUsIGhvb2tzKVxuXHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKSBpbml0TGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MpXG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBWbm9kZS5ub3JtYWxpemUoY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS52aWV3LCB2bm9kZSkpXG5cdFx0aWYgKHZub2RlLmluc3RhbmNlID09PSB2bm9kZSkgdGhyb3cgRXJyb3IoXCJBIHZpZXcgY2Fubm90IHJldHVybiB0aGUgdm5vZGUgaXQgcmVjZWl2ZWQgYXMgYXJndW1lbnRcIilcblx0XHRzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCA9IG51bGxcblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVDb21wb25lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdGluaXRDb21wb25lbnQodm5vZGUsIGhvb2tzKVxuXHRcdGlmICh2bm9kZS5pbnN0YW5jZSAhPSBudWxsKSB7XG5cdFx0XHRjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUuaW5zdGFuY2UsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR2bm9kZS5kb20gPSB2bm9kZS5pbnN0YW5jZS5kb21cblx0XHRcdHZub2RlLmRvbVNpemUgPSB2bm9kZS5kb20gIT0gbnVsbCA/IHZub2RlLmluc3RhbmNlLmRvbVNpemUgOiAwXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IDBcblx0XHR9XG5cdH1cblxuXHQvL3VwZGF0ZVxuXHQvKipcblx0ICogQHBhcmFtIHtFbGVtZW50fEZyYWdtZW50fSBwYXJlbnQgLSB0aGUgcGFyZW50IGVsZW1lbnRcblx0ICogQHBhcmFtIHtWbm9kZVtdIHwgbnVsbH0gb2xkIC0gdGhlIGxpc3Qgb2Ygdm5vZGVzIG9mIHRoZSBsYXN0IGByZW5kZXIoKWAgY2FsbCBmb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBwYXJ0IG9mIHRoZSB0cmVlXG5cdCAqIEBwYXJhbSB7Vm5vZGVbXSB8IG51bGx9IHZub2RlcyAtIGFzIGFib3ZlLCBidXQgZm9yIHRoZSBjdXJyZW50IGByZW5kZXIoKWAgY2FsbC5cblx0ICogQHBhcmFtIHtGdW5jdGlvbltdfSBob29rcyAtIGFuIGFjY3VtdWxhdG9yIG9mIHBvc3QtcmVuZGVyIGhvb2tzIChvbmNyZWF0ZS9vbnVwZGF0ZSlcblx0ICogQHBhcmFtIHtFbGVtZW50IHwgbnVsbH0gbmV4dFNpYmxpbmcgLSB0aGUgbmV4dCBET00gbm9kZSBpZiB3ZSdyZSBkZWFsaW5nIHdpdGggYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50IHRoYXQgaXMgbm90IHRoZSBsYXN0IGl0ZW0gaW4gaXRzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50XG5cdCAqIEBwYXJhbSB7J3N2ZycgfCAnbWF0aCcgfCBTdHJpbmcgfCBudWxsfSBucykgLSB0aGUgY3VycmVudCBYTUwgbmFtZXNwYWNlLCBpZiBhbnlcblx0ICogQHJldHVybnMgdm9pZFxuXHQgKi9cblx0Ly8gVGhpcyBmdW5jdGlvbiBkaWZmcyBhbmQgcGF0Y2hlcyBsaXN0cyBvZiB2bm9kZXMsIGJvdGgga2V5ZWQgYW5kIHVua2V5ZWQuXG5cdC8vXG5cdC8vIFdlIHdpbGw6XG5cdC8vXG5cdC8vIDEuIGRlc2NyaWJlIGl0cyBnZW5lcmFsIHN0cnVjdHVyZVxuXHQvLyAyLiBmb2N1cyBvbiB0aGUgZGlmZiBhbGdvcml0aG0gb3B0aW1pemF0aW9uc1xuXHQvLyAzLiBkaXNjdXNzIERPTSBub2RlIG9wZXJhdGlvbnMuXG5cblx0Ly8gIyMgT3ZlcnZpZXc6XG5cdC8vXG5cdC8vIFRoZSB1cGRhdGVOb2RlcygpIGZ1bmN0aW9uOlxuXHQvLyAtIGRlYWxzIHdpdGggdHJpdmlhbCBjYXNlc1xuXHQvLyAtIGRldGVybWluZXMgd2hldGhlciB0aGUgbGlzdHMgYXJlIGtleWVkIG9yIHVua2V5ZWQgYmFzZWQgb24gdGhlIGZpcnN0IG5vbi1udWxsIG5vZGVcblx0Ly8gICBvZiBlYWNoIGxpc3QuXG5cdC8vIC0gZGlmZnMgdGhlbSBhbmQgcGF0Y2hlcyB0aGUgRE9NIGlmIG5lZWRlZCAodGhhdCdzIHRoZSBicnVudCBvZiB0aGUgY29kZSlcblx0Ly8gLSBtYW5hZ2VzIHRoZSBsZWZ0b3ZlcnM6IGFmdGVyIGRpZmZpbmcsIGFyZSB0aGVyZTpcblx0Ly8gICAtIG9sZCBub2RlcyBsZWZ0IHRvIHJlbW92ZT9cblx0Ly8gXHQgLSBuZXcgbm9kZXMgdG8gaW5zZXJ0P1xuXHQvLyBcdCBkZWFsIHdpdGggdGhlbSFcblx0Ly9cblx0Ly8gVGhlIGxpc3RzIGFyZSBvbmx5IGl0ZXJhdGVkIG92ZXIgb25jZSwgd2l0aCBhbiBleGNlcHRpb24gZm9yIHRoZSBub2RlcyBpbiBgb2xkYCB0aGF0XG5cdC8vIGFyZSB2aXNpdGVkIGluIHRoZSBmb3VydGggcGFydCBvZiB0aGUgZGlmZiBhbmQgaW4gdGhlIGByZW1vdmVOb2Rlc2AgbG9vcC5cblxuXHQvLyAjIyBEaWZmaW5nXG5cdC8vXG5cdC8vIFJlYWRpbmcgaHR0cHM6Ly9naXRodWIuY29tL2xvY2Fsdm9pZC9pdmkvYmxvYi9kZGMwOWQwNmFiYWVmNDUyNDhlNjEzM2Y3MDQwZDAwZDNjNmJlODUzL3BhY2thZ2VzL2l2aS9zcmMvdmRvbS9pbXBsZW1lbnRhdGlvbi50cyNMNjE3LUw4Mzdcblx0Ly8gbWF5IGJlIGdvb2QgZm9yIGNvbnRleHQgb24gbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlLWJhc2VkIGxvZ2ljIGZvciBtb3Zpbmcgbm9kZXMuXG5cdC8vXG5cdC8vIEluIG9yZGVyIHRvIGRpZmYga2V5ZWQgbGlzdHMsIG9uZSBoYXMgdG9cblx0Ly9cblx0Ly8gMSkgbWF0Y2ggbm9kZXMgaW4gYm90aCBsaXN0cywgcGVyIGtleSwgYW5kIHVwZGF0ZSB0aGVtIGFjY29yZGluZ2x5XG5cdC8vIDIpIGNyZWF0ZSB0aGUgbm9kZXMgcHJlc2VudCBpbiB0aGUgbmV3IGxpc3QsIGJ1dCBhYnNlbnQgaW4gdGhlIG9sZCBvbmVcblx0Ly8gMykgcmVtb3ZlIHRoZSBub2RlcyBwcmVzZW50IGluIHRoZSBvbGQgbGlzdCwgYnV0IGFic2VudCBpbiB0aGUgbmV3IG9uZVxuXHQvLyA0KSBmaWd1cmUgb3V0IHdoYXQgbm9kZXMgaW4gMSkgdG8gbW92ZSBpbiBvcmRlciB0byBtaW5pbWl6ZSB0aGUgRE9NIG9wZXJhdGlvbnMuXG5cdC8vXG5cdC8vIFRvIGFjaGlldmUgMSkgb25lIGNhbiBjcmVhdGUgYSBkaWN0aW9uYXJ5IG9mIGtleXMgPT4gaW5kZXggKGZvciB0aGUgb2xkIGxpc3QpLCB0aGVuIGl0ZXJhdGVcblx0Ly8gb3ZlciB0aGUgbmV3IGxpc3QgYW5kIGZvciBlYWNoIG5ldyB2bm9kZSwgZmluZCB0aGUgY29ycmVzcG9uZGluZyB2bm9kZSBpbiB0aGUgb2xkIGxpc3QgdXNpbmdcblx0Ly8gdGhlIG1hcC5cblx0Ly8gMikgaXMgYWNoaWV2ZWQgaW4gdGhlIHNhbWUgc3RlcDogaWYgYSBuZXcgbm9kZSBoYXMgbm8gY29ycmVzcG9uZGluZyBlbnRyeSBpbiB0aGUgbWFwLCBpdCBpcyBuZXdcblx0Ly8gYW5kIG11c3QgYmUgY3JlYXRlZC5cblx0Ly8gRm9yIHRoZSByZW1vdmFscywgd2UgYWN0dWFsbHkgcmVtb3ZlIHRoZSBub2RlcyB0aGF0IGhhdmUgYmVlbiB1cGRhdGVkIGZyb20gdGhlIG9sZCBsaXN0LlxuXHQvLyBUaGUgbm9kZXMgdGhhdCByZW1haW4gaW4gdGhhdCBsaXN0IGFmdGVyIDEpIGFuZCAyKSBoYXZlIGJlZW4gcGVyZm9ybWVkIGNhbiBiZSBzYWZlbHkgcmVtb3ZlZC5cblx0Ly8gVGhlIGZvdXJ0aCBzdGVwIGlzIGEgYml0IG1vcmUgY29tcGxleCBhbmQgcmVsaWVzIG9uIHRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UgKExJUylcblx0Ly8gYWxnb3JpdGhtLlxuXHQvL1xuXHQvLyB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlIGlzIHRoZSBsaXN0IG9mIG5vZGVzIHRoYXQgY2FuIHJlbWFpbiBpbiBwbGFjZS4gSW1hZ2luZSBnb2luZ1xuXHQvLyBmcm9tIGAxLDIsMyw0LDVgIHRvIGA0LDUsMSwyLDNgIHdoZXJlIHRoZSBudW1iZXJzIGFyZSBub3QgbmVjZXNzYXJpbHkgdGhlIGtleXMsIGJ1dCB0aGUgaW5kaWNlc1xuXHQvLyBjb3JyZXNwb25kaW5nIHRvIHRoZSBrZXllZCBub2RlcyBpbiB0aGUgb2xkIGxpc3QgKGtleWVkIG5vZGVzIGBlLGQsYyxiLGFgID0+IGBiLGEsZSxkLGNgIHdvdWxkXG5cdC8vICBtYXRjaCB0aGUgYWJvdmUgbGlzdHMsIGZvciBleGFtcGxlKS5cblx0Ly9cblx0Ly8gSW4gdGhlcmUgYXJlIHR3byBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlczogYDQsNWAgYW5kIGAxLDIsM2AsIHRoZSBsYXR0ZXIgYmVpbmcgdGhlIGxvbmdlc3QuIFdlXG5cdC8vIGNhbiB1cGRhdGUgdGhvc2Ugbm9kZXMgd2l0aG91dCBtb3ZpbmcgdGhlbSwgYW5kIG9ubHkgY2FsbCBgaW5zZXJ0Tm9kZWAgb24gYDRgIGFuZCBgNWAuXG5cdC8vXG5cdC8vIEBsb2NhbHZvaWQgYWRhcHRlZCB0aGUgYWxnbyB0byBhbHNvIHN1cHBvcnQgbm9kZSBkZWxldGlvbnMgYW5kIGluc2VydGlvbnMgKHRoZSBgbGlzYCBpcyBhY3R1YWxseVxuXHQvLyB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlICpvZiBvbGQgbm9kZXMgc3RpbGwgcHJlc2VudCBpbiB0aGUgbmV3IGxpc3QqKS5cblx0Ly9cblx0Ly8gSXQgaXMgYSBnZW5lcmFsIGFsZ29yaXRobSB0aGF0IGlzIGZpcmVwcm9vZiBpbiBhbGwgY2lyY3Vtc3RhbmNlcywgYnV0IGl0IHJlcXVpcmVzIHRoZSBhbGxvY2F0aW9uXG5cdC8vIGFuZCB0aGUgY29uc3RydWN0aW9uIG9mIGEgYGtleSA9PiBvbGRJbmRleGAgbWFwLCBhbmQgdGhyZWUgYXJyYXlzIChvbmUgd2l0aCBgbmV3SW5kZXggPT4gb2xkSW5kZXhgLFxuXHQvLyB0aGUgYExJU2AgYW5kIGEgdGVtcG9yYXJ5IG9uZSB0byBjcmVhdGUgdGhlIExJUykuXG5cdC8vXG5cdC8vIFNvIHdlIGNoZWF0IHdoZXJlIHdlIGNhbjogaWYgdGhlIHRhaWxzIG9mIHRoZSBsaXN0cyBhcmUgaWRlbnRpY2FsLCB0aGV5IGFyZSBndWFyYW50ZWVkIHRvIGJlIHBhcnQgb2Zcblx0Ly8gdGhlIExJUyBhbmQgY2FuIGJlIHVwZGF0ZWQgd2l0aG91dCBtb3ZpbmcgdGhlbS5cblx0Ly9cblx0Ly8gSWYgdHdvIG5vZGVzIGFyZSBzd2FwcGVkLCB0aGV5IGFyZSBndWFyYW50ZWVkIG5vdCB0byBiZSBwYXJ0IG9mIHRoZSBMSVMsIGFuZCBtdXN0IGJlIG1vdmVkICh3aXRoXG5cdC8vIHRoZSBleGNlcHRpb24gb2YgdGhlIGxhc3Qgbm9kZSBpZiB0aGUgbGlzdCBpcyBmdWxseSByZXZlcnNlZCkuXG5cdC8vXG5cdC8vICMjIEZpbmRpbmcgdGhlIG5leHQgc2libGluZy5cblx0Ly9cblx0Ly8gYHVwZGF0ZU5vZGUoKWAgYW5kIGBjcmVhdGVOb2RlKClgIGV4cGVjdCBhIG5leHRTaWJsaW5nIHBhcmFtZXRlciB0byBwZXJmb3JtIERPTSBvcGVyYXRpb25zLlxuXHQvLyBXaGVuIHRoZSBsaXN0IGlzIGJlaW5nIHRyYXZlcnNlZCB0b3AtZG93biwgYXQgYW55IGluZGV4LCB0aGUgRE9NIG5vZGVzIHVwIHRvIHRoZSBwcmV2aW91c1xuXHQvLyB2bm9kZSByZWZsZWN0IHRoZSBjb250ZW50IG9mIHRoZSBuZXcgbGlzdCwgd2hlcmVhcyB0aGUgcmVzdCBvZiB0aGUgRE9NIG5vZGVzIHJlZmxlY3QgdGhlIG9sZFxuXHQvLyBsaXN0LiBUaGUgbmV4dCBzaWJsaW5nIG11c3QgYmUgbG9va2VkIGZvciBpbiB0aGUgb2xkIGxpc3QgdXNpbmcgYGdldE5leHRTaWJsaW5nKC4uLiBvbGRTdGFydCArIDEgLi4uKWAuXG5cdC8vXG5cdC8vIEluIHRoZSBvdGhlciBzY2VuYXJpb3MgKHN3YXBzLCB1cHdhcmRzIHRyYXZlcnNhbCwgbWFwLWJhc2VkIGRpZmYpLFxuXHQvLyB0aGUgbmV3IHZub2RlcyBsaXN0IGlzIHRyYXZlcnNlZCB1cHdhcmRzLiBUaGUgRE9NIG5vZGVzIGF0IHRoZSBib3R0b20gb2YgdGhlIGxpc3QgcmVmbGVjdCB0aGVcblx0Ly8gYm90dG9tIHBhcnQgb2YgdGhlIG5ldyB2bm9kZXMgbGlzdCwgYW5kIHdlIGNhbiB1c2UgdGhlIGB2LmRvbWAgIHZhbHVlIG9mIHRoZSBwcmV2aW91cyBub2RlXG5cdC8vIGFzIHRoZSBuZXh0IHNpYmxpbmcgKGNhY2hlZCBpbiB0aGUgYG5leHRTaWJsaW5nYCB2YXJpYWJsZSkuXG5cblxuXHQvLyAjIyBET00gbm9kZSBtb3Zlc1xuXHQvL1xuXHQvLyBJbiBtb3N0IHNjZW5hcmlvcyBgdXBkYXRlTm9kZSgpYCBhbmQgYGNyZWF0ZU5vZGUoKWAgcGVyZm9ybSB0aGUgRE9NIG9wZXJhdGlvbnMuIEhvd2V2ZXIsXG5cdC8vIHRoaXMgaXMgbm90IHRoZSBjYXNlIGlmIHRoZSBub2RlIG1vdmVkIChzZWNvbmQgYW5kIGZvdXJ0aCBwYXJ0IG9mIHRoZSBkaWZmIGFsZ28pLiBXZSBtb3ZlXG5cdC8vIHRoZSBvbGQgRE9NIG5vZGVzIGJlZm9yZSB1cGRhdGVOb2RlIHJ1bnMgYmVjYXVzZSBpdCBlbmFibGVzIHVzIHRvIHVzZSB0aGUgY2FjaGVkIGBuZXh0U2libGluZ2Bcblx0Ly8gdmFyaWFibGUgcmF0aGVyIHRoYW4gZmV0Y2hpbmcgaXQgdXNpbmcgYGdldE5leHRTaWJsaW5nKClgLlxuXHQvL1xuXHQvLyBUaGUgZm91cnRoIHBhcnQgb2YgdGhlIGRpZmYgY3VycmVudGx5IGluc2VydHMgbm9kZXMgdW5jb25kaXRpb25hbGx5LCBsZWFkaW5nIHRvIGlzc3Vlc1xuXHQvLyBsaWtlICMxNzkxIGFuZCAjMTk5OS4gV2UgbmVlZCB0byBiZSBzbWFydGVyIGFib3V0IHRob3NlIHNpdHVhdGlvbnMgd2hlcmUgYWRqYXNjZW50IG9sZFxuXHQvLyBub2RlcyByZW1haW4gdG9nZXRoZXIgaW4gdGhlIG5ldyBsaXN0IGluIGEgd2F5IHRoYXQgaXNuJ3QgY292ZXJlZCBieSBwYXJ0cyBvbmUgYW5kXG5cdC8vIHRocmVlIG9mIHRoZSBkaWZmIGFsZ28uXG5cblx0ZnVuY3Rpb24gdXBkYXRlTm9kZXMocGFyZW50LCBvbGQsIHZub2RlcywgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdGlmIChvbGQgPT09IHZub2RlcyB8fCBvbGQgPT0gbnVsbCAmJiB2bm9kZXMgPT0gbnVsbCkgcmV0dXJuXG5cdFx0ZWxzZSBpZiAob2xkID09IG51bGwgfHwgb2xkLmxlbmd0aCA9PT0gMCkgY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIDAsIHZub2Rlcy5sZW5ndGgsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0ZWxzZSBpZiAodm5vZGVzID09IG51bGwgfHwgdm5vZGVzLmxlbmd0aCA9PT0gMCkgcmVtb3ZlTm9kZXMocGFyZW50LCBvbGQsIDAsIG9sZC5sZW5ndGgpXG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgaXNPbGRLZXllZCA9IG9sZFswXSAhPSBudWxsICYmIG9sZFswXS5rZXkgIT0gbnVsbFxuXHRcdFx0dmFyIGlzS2V5ZWQgPSB2bm9kZXNbMF0gIT0gbnVsbCAmJiB2bm9kZXNbMF0ua2V5ICE9IG51bGxcblx0XHRcdHZhciBzdGFydCA9IDAsIG9sZFN0YXJ0ID0gMFxuXHRcdFx0aWYgKCFpc09sZEtleWVkKSB3aGlsZSAob2xkU3RhcnQgPCBvbGQubGVuZ3RoICYmIG9sZFtvbGRTdGFydF0gPT0gbnVsbCkgb2xkU3RhcnQrK1xuXHRcdFx0aWYgKCFpc0tleWVkKSB3aGlsZSAoc3RhcnQgPCB2bm9kZXMubGVuZ3RoICYmIHZub2Rlc1tzdGFydF0gPT0gbnVsbCkgc3RhcnQrK1xuXHRcdFx0aWYgKGlzS2V5ZWQgPT09IG51bGwgJiYgaXNPbGRLZXllZCA9PSBudWxsKSByZXR1cm4gLy8gYm90aCBsaXN0cyBhcmUgZnVsbCBvZiBudWxsc1xuXHRcdFx0aWYgKGlzT2xkS2V5ZWQgIT09IGlzS2V5ZWQpIHtcblx0XHRcdFx0cmVtb3ZlTm9kZXMocGFyZW50LCBvbGQsIG9sZFN0YXJ0LCBvbGQubGVuZ3RoKVxuXHRcdFx0XHRjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIHZub2Rlcy5sZW5ndGgsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHR9IGVsc2UgaWYgKCFpc0tleWVkKSB7XG5cdFx0XHRcdC8vIERvbid0IGluZGV4IHBhc3QgdGhlIGVuZCBvZiBlaXRoZXIgbGlzdCAoY2F1c2VzIGRlb3B0cykuXG5cdFx0XHRcdHZhciBjb21tb25MZW5ndGggPSBvbGQubGVuZ3RoIDwgdm5vZGVzLmxlbmd0aCA/IG9sZC5sZW5ndGggOiB2bm9kZXMubGVuZ3RoXG5cdFx0XHRcdC8vIFJld2luZCBpZiBuZWNlc3NhcnkgdG8gdGhlIGZpcnN0IG5vbi1udWxsIGluZGV4IG9uIGVpdGhlciBzaWRlLlxuXHRcdFx0XHQvLyBXZSBjb3VsZCBhbHRlcm5hdGl2ZWx5IGVpdGhlciBleHBsaWNpdGx5IGNyZWF0ZSBvciByZW1vdmUgbm9kZXMgd2hlbiBgc3RhcnQgIT09IG9sZFN0YXJ0YFxuXHRcdFx0XHQvLyBidXQgdGhhdCB3b3VsZCBiZSBvcHRpbWl6aW5nIGZvciBzcGFyc2UgbGlzdHMgd2hpY2ggYXJlIG1vcmUgcmFyZSB0aGFuIGRlbnNlIG9uZXMuXG5cdFx0XHRcdHN0YXJ0ID0gc3RhcnQgPCBvbGRTdGFydCA/IHN0YXJ0IDogb2xkU3RhcnRcblx0XHRcdFx0Zm9yICg7IHN0YXJ0IDwgY29tbW9uTGVuZ3RoOyBzdGFydCsrKSB7XG5cdFx0XHRcdFx0byA9IG9sZFtzdGFydF1cblx0XHRcdFx0XHR2ID0gdm5vZGVzW3N0YXJ0XVxuXHRcdFx0XHRcdGlmIChvID09PSB2IHx8IG8gPT0gbnVsbCAmJiB2ID09IG51bGwpIGNvbnRpbnVlXG5cdFx0XHRcdFx0ZWxzZSBpZiAobyA9PSBudWxsKSBjcmVhdGVOb2RlKHBhcmVudCwgdiwgaG9va3MsIG5zLCBnZXROZXh0U2libGluZyhvbGQsIHN0YXJ0ICsgMSwgbmV4dFNpYmxpbmcpKVxuXHRcdFx0XHRcdGVsc2UgaWYgKHYgPT0gbnVsbCkgcmVtb3ZlTm9kZShwYXJlbnQsIG8pXG5cdFx0XHRcdFx0ZWxzZSB1cGRhdGVOb2RlKHBhcmVudCwgbywgdiwgaG9va3MsIGdldE5leHRTaWJsaW5nKG9sZCwgc3RhcnQgKyAxLCBuZXh0U2libGluZyksIG5zKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvbGQubGVuZ3RoID4gY29tbW9uTGVuZ3RoKSByZW1vdmVOb2RlcyhwYXJlbnQsIG9sZCwgc3RhcnQsIG9sZC5sZW5ndGgpXG5cdFx0XHRcdGlmICh2bm9kZXMubGVuZ3RoID4gY29tbW9uTGVuZ3RoKSBjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIHZub2Rlcy5sZW5ndGgsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBrZXllZCBkaWZmXG5cdFx0XHRcdHZhciBvbGRFbmQgPSBvbGQubGVuZ3RoIC0gMSwgZW5kID0gdm5vZGVzLmxlbmd0aCAtIDEsIG1hcCwgbywgdiwgb2UsIHZlLCB0b3BTaWJsaW5nXG5cblx0XHRcdFx0Ly8gYm90dG9tLXVwXG5cdFx0XHRcdHdoaWxlIChvbGRFbmQgPj0gb2xkU3RhcnQgJiYgZW5kID49IHN0YXJ0KSB7XG5cdFx0XHRcdFx0b2UgPSBvbGRbb2xkRW5kXVxuXHRcdFx0XHRcdHZlID0gdm5vZGVzW2VuZF1cblx0XHRcdFx0XHRpZiAob2Uua2V5ICE9PSB2ZS5rZXkpIGJyZWFrXG5cdFx0XHRcdFx0aWYgKG9lICE9PSB2ZSkgdXBkYXRlTm9kZShwYXJlbnQsIG9lLCB2ZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdFx0XHRpZiAodmUuZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gdmUuZG9tXG5cdFx0XHRcdFx0b2xkRW5kLS0sIGVuZC0tXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gdG9wLWRvd25cblx0XHRcdFx0d2hpbGUgKG9sZEVuZCA+PSBvbGRTdGFydCAmJiBlbmQgPj0gc3RhcnQpIHtcblx0XHRcdFx0XHRvID0gb2xkW29sZFN0YXJ0XVxuXHRcdFx0XHRcdHYgPSB2bm9kZXNbc3RhcnRdXG5cdFx0XHRcdFx0aWYgKG8ua2V5ICE9PSB2LmtleSkgYnJlYWtcblx0XHRcdFx0XHRvbGRTdGFydCsrLCBzdGFydCsrXG5cdFx0XHRcdFx0aWYgKG8gIT09IHYpIHVwZGF0ZU5vZGUocGFyZW50LCBvLCB2LCBob29rcywgZ2V0TmV4dFNpYmxpbmcob2xkLCBvbGRTdGFydCwgbmV4dFNpYmxpbmcpLCBucylcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBzd2FwcyBhbmQgbGlzdCByZXZlcnNhbHNcblx0XHRcdFx0d2hpbGUgKG9sZEVuZCA+PSBvbGRTdGFydCAmJiBlbmQgPj0gc3RhcnQpIHtcblx0XHRcdFx0XHRpZiAoc3RhcnQgPT09IGVuZCkgYnJlYWtcblx0XHRcdFx0XHRpZiAoby5rZXkgIT09IHZlLmtleSB8fCBvZS5rZXkgIT09IHYua2V5KSBicmVha1xuXHRcdFx0XHRcdHRvcFNpYmxpbmcgPSBnZXROZXh0U2libGluZyhvbGQsIG9sZFN0YXJ0LCBuZXh0U2libGluZylcblx0XHRcdFx0XHRtb3ZlTm9kZXMocGFyZW50LCBvZSwgdG9wU2libGluZylcblx0XHRcdFx0XHRpZiAob2UgIT09IHYpIHVwZGF0ZU5vZGUocGFyZW50LCBvZSwgdiwgaG9va3MsIHRvcFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGlmICgrK3N0YXJ0IDw9IC0tZW5kKSBtb3ZlTm9kZXMocGFyZW50LCBvLCBuZXh0U2libGluZylcblx0XHRcdFx0XHRpZiAobyAhPT0gdmUpIHVwZGF0ZU5vZGUocGFyZW50LCBvLCB2ZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdFx0XHRpZiAodmUuZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gdmUuZG9tXG5cdFx0XHRcdFx0b2xkU3RhcnQrKzsgb2xkRW5kLS1cblx0XHRcdFx0XHRvZSA9IG9sZFtvbGRFbmRdXG5cdFx0XHRcdFx0dmUgPSB2bm9kZXNbZW5kXVxuXHRcdFx0XHRcdG8gPSBvbGRbb2xkU3RhcnRdXG5cdFx0XHRcdFx0diA9IHZub2Rlc1tzdGFydF1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBib3R0b20gdXAgb25jZSBhZ2FpblxuXHRcdFx0XHR3aGlsZSAob2xkRW5kID49IG9sZFN0YXJ0ICYmIGVuZCA+PSBzdGFydCkge1xuXHRcdFx0XHRcdGlmIChvZS5rZXkgIT09IHZlLmtleSkgYnJlYWtcblx0XHRcdFx0XHRpZiAob2UgIT09IHZlKSB1cGRhdGVOb2RlKHBhcmVudCwgb2UsIHZlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGlmICh2ZS5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2ZS5kb21cblx0XHRcdFx0XHRvbGRFbmQtLSwgZW5kLS1cblx0XHRcdFx0XHRvZSA9IG9sZFtvbGRFbmRdXG5cdFx0XHRcdFx0dmUgPSB2bm9kZXNbZW5kXVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChzdGFydCA+IGVuZCkgcmVtb3ZlTm9kZXMocGFyZW50LCBvbGQsIG9sZFN0YXJ0LCBvbGRFbmQgKyAxKVxuXHRcdFx0XHRlbHNlIGlmIChvbGRTdGFydCA+IG9sZEVuZCkgY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQgKyAxLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQvLyBpbnNwaXJlZCBieSBpdmkgaHR0cHM6Ly9naXRodWIuY29tL2l2aWpzL2l2aS8gYnkgQm9yaXMgS2F1bFxuXHRcdFx0XHRcdHZhciBvcmlnaW5hbE5leHRTaWJsaW5nID0gbmV4dFNpYmxpbmcsIHZub2Rlc0xlbmd0aCA9IGVuZCAtIHN0YXJ0ICsgMSwgb2xkSW5kaWNlcyA9IG5ldyBBcnJheSh2bm9kZXNMZW5ndGgpLCBsaT0wLCBpPTAsIHBvcyA9IDIxNDc0ODM2NDcsIG1hdGNoZWQgPSAwLCBtYXAsIGxpc0luZGljZXNcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgdm5vZGVzTGVuZ3RoOyBpKyspIG9sZEluZGljZXNbaV0gPSAtMVxuXHRcdFx0XHRcdGZvciAoaSA9IGVuZDsgaSA+PSBzdGFydDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRpZiAobWFwID09IG51bGwpIG1hcCA9IGdldEtleU1hcChvbGQsIG9sZFN0YXJ0LCBvbGRFbmQgKyAxKVxuXHRcdFx0XHRcdFx0dmUgPSB2bm9kZXNbaV1cblx0XHRcdFx0XHRcdHZhciBvbGRJbmRleCA9IG1hcFt2ZS5rZXldXG5cdFx0XHRcdFx0XHRpZiAob2xkSW5kZXggIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRwb3MgPSAob2xkSW5kZXggPCBwb3MpID8gb2xkSW5kZXggOiAtMSAvLyBiZWNvbWVzIC0xIGlmIG5vZGVzIHdlcmUgcmUtb3JkZXJlZFxuXHRcdFx0XHRcdFx0XHRvbGRJbmRpY2VzW2ktc3RhcnRdID0gb2xkSW5kZXhcblx0XHRcdFx0XHRcdFx0b2UgPSBvbGRbb2xkSW5kZXhdXG5cdFx0XHRcdFx0XHRcdG9sZFtvbGRJbmRleF0gPSBudWxsXG5cdFx0XHRcdFx0XHRcdGlmIChvZSAhPT0gdmUpIHVwZGF0ZU5vZGUocGFyZW50LCBvZSwgdmUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHRcdFx0XHRcdGlmICh2ZS5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2ZS5kb21cblx0XHRcdFx0XHRcdFx0bWF0Y2hlZCsrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5leHRTaWJsaW5nID0gb3JpZ2luYWxOZXh0U2libGluZ1xuXHRcdFx0XHRcdGlmIChtYXRjaGVkICE9PSBvbGRFbmQgLSBvbGRTdGFydCArIDEpIHJlbW92ZU5vZGVzKHBhcmVudCwgb2xkLCBvbGRTdGFydCwgb2xkRW5kICsgMSlcblx0XHRcdFx0XHRpZiAobWF0Y2hlZCA9PT0gMCkgY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQgKyAxLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKHBvcyA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0Ly8gdGhlIGluZGljZXMgb2YgdGhlIGluZGljZXMgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIHBhcnQgb2YgdGhlXG5cdFx0XHRcdFx0XHRcdC8vIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBpbiB0aGUgb2xkSW5kaWNlcyBsaXN0XG5cdFx0XHRcdFx0XHRcdGxpc0luZGljZXMgPSBtYWtlTGlzSW5kaWNlcyhvbGRJbmRpY2VzKVxuXHRcdFx0XHRcdFx0XHRsaSA9IGxpc0luZGljZXMubGVuZ3RoIC0gMVxuXHRcdFx0XHRcdFx0XHRmb3IgKGkgPSBlbmQ7IGkgPj0gc3RhcnQ7IGktLSkge1xuXHRcdFx0XHRcdFx0XHRcdHYgPSB2bm9kZXNbaV1cblx0XHRcdFx0XHRcdFx0XHRpZiAob2xkSW5kaWNlc1tpLXN0YXJ0XSA9PT0gLTEpIGNyZWF0ZU5vZGUocGFyZW50LCB2LCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGxpc0luZGljZXNbbGldID09PSBpIC0gc3RhcnQpIGxpLS1cblx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgbW92ZU5vZGVzKHBhcmVudCwgdiwgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmICh2LmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IHZub2Rlc1tpXS5kb21cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChpID0gZW5kOyBpID49IHN0YXJ0OyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0XHR2ID0gdm5vZGVzW2ldXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG9sZEluZGljZXNbaS1zdGFydF0gPT09IC0xKSBjcmVhdGVOb2RlKHBhcmVudCwgdiwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdFx0XHRcdFx0XHRpZiAodi5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2bm9kZXNbaV0uZG9tXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlTm9kZShwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHR2YXIgb2xkVGFnID0gb2xkLnRhZywgdGFnID0gdm5vZGUudGFnXG5cdFx0aWYgKG9sZFRhZyA9PT0gdGFnKSB7XG5cdFx0XHR2bm9kZS5zdGF0ZSA9IG9sZC5zdGF0ZVxuXHRcdFx0dm5vZGUuZXZlbnRzID0gb2xkLmV2ZW50c1xuXHRcdFx0aWYgKHNob3VsZE5vdFVwZGF0ZSh2bm9kZSwgb2xkKSkgcmV0dXJuXG5cdFx0XHRpZiAodHlwZW9mIG9sZFRhZyA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCkge1xuXHRcdFx0XHRcdHVwZGF0ZUxpZmVjeWNsZSh2bm9kZS5hdHRycywgdm5vZGUsIGhvb2tzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHN3aXRjaCAob2xkVGFnKSB7XG5cdFx0XHRcdFx0Y2FzZSBcIiNcIjogdXBkYXRlVGV4dChvbGQsIHZub2RlKTsgYnJlYWtcblx0XHRcdFx0XHRjYXNlIFwiPFwiOiB1cGRhdGVIVE1MKHBhcmVudCwgb2xkLCB2bm9kZSwgbnMsIG5leHRTaWJsaW5nKTsgYnJlYWtcblx0XHRcdFx0XHRjYXNlIFwiW1wiOiB1cGRhdGVGcmFnbWVudChwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpOyBicmVha1xuXHRcdFx0XHRcdGRlZmF1bHQ6IHVwZGF0ZUVsZW1lbnQob2xkLCB2bm9kZSwgaG9va3MsIG5zKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHVwZGF0ZUNvbXBvbmVudChwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmVtb3ZlTm9kZShwYXJlbnQsIG9sZClcblx0XHRcdGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlVGV4dChvbGQsIHZub2RlKSB7XG5cdFx0aWYgKG9sZC5jaGlsZHJlbi50b1N0cmluZygpICE9PSB2bm9kZS5jaGlsZHJlbi50b1N0cmluZygpKSB7XG5cdFx0XHRvbGQuZG9tLm5vZGVWYWx1ZSA9IHZub2RlLmNoaWxkcmVuXG5cdFx0fVxuXHRcdHZub2RlLmRvbSA9IG9sZC5kb21cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVIVE1MKHBhcmVudCwgb2xkLCB2bm9kZSwgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0aWYgKG9sZC5jaGlsZHJlbiAhPT0gdm5vZGUuY2hpbGRyZW4pIHtcblx0XHRcdHJlbW92ZUhUTUwocGFyZW50LCBvbGQpXG5cdFx0XHRjcmVhdGVIVE1MKHBhcmVudCwgdm5vZGUsIG5zLCBuZXh0U2libGluZylcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gb2xkLmRvbVNpemVcblx0XHRcdHZub2RlLmluc3RhbmNlID0gb2xkLmluc3RhbmNlXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUZyYWdtZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdHVwZGF0ZU5vZGVzKHBhcmVudCwgb2xkLmNoaWxkcmVuLCB2bm9kZS5jaGlsZHJlbiwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHR2YXIgZG9tU2l6ZSA9IDAsIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHR2bm9kZS5kb20gPSBudWxsXG5cdFx0aWYgKGNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGNoaWxkID0gY2hpbGRyZW5baV1cblx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwgJiYgY2hpbGQuZG9tICE9IG51bGwpIHtcblx0XHRcdFx0XHRpZiAodm5vZGUuZG9tID09IG51bGwpIHZub2RlLmRvbSA9IGNoaWxkLmRvbVxuXHRcdFx0XHRcdGRvbVNpemUgKz0gY2hpbGQuZG9tU2l6ZSB8fCAxXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChkb21TaXplICE9PSAxKSB2bm9kZS5kb21TaXplID0gZG9tU2l6ZVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVFbGVtZW50KG9sZCwgdm5vZGUsIGhvb2tzLCBucykge1xuXHRcdHZhciBlbGVtZW50ID0gdm5vZGUuZG9tID0gb2xkLmRvbVxuXHRcdG5zID0gZ2V0TmFtZVNwYWNlKHZub2RlKSB8fCBuc1xuXG5cdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJ0ZXh0YXJlYVwiKSB7XG5cdFx0XHRpZiAodm5vZGUuYXR0cnMgPT0gbnVsbCkgdm5vZGUuYXR0cnMgPSB7fVxuXHRcdFx0aWYgKHZub2RlLnRleHQgIT0gbnVsbCkge1xuXHRcdFx0XHR2bm9kZS5hdHRycy52YWx1ZSA9IHZub2RlLnRleHQgLy9GSVhNRSBoYW5kbGUgbXVsdGlwbGUgY2hpbGRyZW5cblx0XHRcdFx0dm5vZGUudGV4dCA9IHVuZGVmaW5lZFxuXHRcdFx0fVxuXHRcdH1cblx0XHR1cGRhdGVBdHRycyh2bm9kZSwgb2xkLmF0dHJzLCB2bm9kZS5hdHRycywgbnMpXG5cdFx0aWYgKCFtYXliZVNldENvbnRlbnRFZGl0YWJsZSh2bm9kZSkpIHtcblx0XHRcdGlmIChvbGQudGV4dCAhPSBudWxsICYmIHZub2RlLnRleHQgIT0gbnVsbCAmJiB2bm9kZS50ZXh0ICE9PSBcIlwiKSB7XG5cdFx0XHRcdGlmIChvbGQudGV4dC50b1N0cmluZygpICE9PSB2bm9kZS50ZXh0LnRvU3RyaW5nKCkpIG9sZC5kb20uZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSB2bm9kZS50ZXh0XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKG9sZC50ZXh0ICE9IG51bGwpIG9sZC5jaGlsZHJlbiA9IFtWbm9kZShcIiNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG9sZC50ZXh0LCB1bmRlZmluZWQsIG9sZC5kb20uZmlyc3RDaGlsZCldXG5cdFx0XHRcdGlmICh2bm9kZS50ZXh0ICE9IG51bGwpIHZub2RlLmNoaWxkcmVuID0gW1Zub2RlKFwiI1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdm5vZGUudGV4dCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXVxuXHRcdFx0XHR1cGRhdGVOb2RlcyhlbGVtZW50LCBvbGQuY2hpbGRyZW4sIHZub2RlLmNoaWxkcmVuLCBob29rcywgbnVsbCwgbnMpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUNvbXBvbmVudChwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHR2bm9kZS5pbnN0YW5jZSA9IFZub2RlLm5vcm1hbGl6ZShjYWxsSG9vay5jYWxsKHZub2RlLnN0YXRlLnZpZXcsIHZub2RlKSlcblx0XHRpZiAodm5vZGUuaW5zdGFuY2UgPT09IHZub2RlKSB0aHJvdyBFcnJvcihcIkEgdmlldyBjYW5ub3QgcmV0dXJuIHRoZSB2bm9kZSBpdCByZWNlaXZlZCBhcyBhcmd1bWVudFwiKVxuXHRcdHVwZGF0ZUxpZmVjeWNsZSh2bm9kZS5zdGF0ZSwgdm5vZGUsIGhvb2tzKVxuXHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKSB1cGRhdGVMaWZlY3ljbGUodm5vZGUuYXR0cnMsIHZub2RlLCBob29rcylcblx0XHRpZiAodm5vZGUuaW5zdGFuY2UgIT0gbnVsbCkge1xuXHRcdFx0aWYgKG9sZC5pbnN0YW5jZSA9PSBudWxsKSBjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUuaW5zdGFuY2UsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHRlbHNlIHVwZGF0ZU5vZGUocGFyZW50LCBvbGQuaW5zdGFuY2UsIHZub2RlLmluc3RhbmNlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0dm5vZGUuZG9tID0gdm5vZGUuaW5zdGFuY2UuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gdm5vZGUuaW5zdGFuY2UuZG9tU2l6ZVxuXHRcdH1cblx0XHRlbHNlIGlmIChvbGQuaW5zdGFuY2UgIT0gbnVsbCkge1xuXHRcdFx0cmVtb3ZlTm9kZShwYXJlbnQsIG9sZC5pbnN0YW5jZSlcblx0XHRcdHZub2RlLmRvbSA9IHVuZGVmaW5lZFxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IDBcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gb2xkLmRvbVNpemVcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gZ2V0S2V5TWFwKHZub2Rlcywgc3RhcnQsIGVuZCkge1xuXHRcdHZhciBtYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cdFx0Zm9yICg7IHN0YXJ0IDwgZW5kOyBzdGFydCsrKSB7XG5cdFx0XHR2YXIgdm5vZGUgPSB2bm9kZXNbc3RhcnRdXG5cdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkge1xuXHRcdFx0XHR2YXIga2V5ID0gdm5vZGUua2V5XG5cdFx0XHRcdGlmIChrZXkgIT0gbnVsbCkgbWFwW2tleV0gPSBzdGFydFxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbWFwXG5cdH1cblx0Ly8gTGlmdGVkIGZyb20gaXZpIGh0dHBzOi8vZ2l0aHViLmNvbS9pdmlqcy9pdmkvXG5cdC8vIHRha2VzIGEgbGlzdCBvZiB1bmlxdWUgbnVtYmVycyAoLTEgaXMgc3BlY2lhbCBhbmQgY2FuXG5cdC8vIG9jY3VyIG11bHRpcGxlIHRpbWVzKSBhbmQgcmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBpbmRpY2VzXG5cdC8vIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBwYXJ0IG9mIHRoZSBsb25nZXN0IGluY3JlYXNpbmdcblx0Ly8gc3Vic2VxdWVjZVxuXHR2YXIgbGlzVGVtcCA9IFtdXG5cdGZ1bmN0aW9uIG1ha2VMaXNJbmRpY2VzKGEpIHtcblx0XHR2YXIgcmVzdWx0ID0gWzBdXG5cdFx0dmFyIHUgPSAwLCB2ID0gMCwgaSA9IDBcblx0XHR2YXIgaWwgPSBsaXNUZW1wLmxlbmd0aCA9IGEubGVuZ3RoXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbDsgaSsrKSBsaXNUZW1wW2ldID0gYVtpXVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWw7ICsraSkge1xuXHRcdFx0aWYgKGFbaV0gPT09IC0xKSBjb250aW51ZVxuXHRcdFx0dmFyIGogPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdXG5cdFx0XHRpZiAoYVtqXSA8IGFbaV0pIHtcblx0XHRcdFx0bGlzVGVtcFtpXSA9IGpcblx0XHRcdFx0cmVzdWx0LnB1c2goaSlcblx0XHRcdFx0Y29udGludWVcblx0XHRcdH1cblx0XHRcdHUgPSAwXG5cdFx0XHR2ID0gcmVzdWx0Lmxlbmd0aCAtIDFcblx0XHRcdHdoaWxlICh1IDwgdikge1xuXHRcdFx0XHQvLyBGYXN0IGludGVnZXIgYXZlcmFnZSB3aXRob3V0IG92ZXJmbG93LlxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHR2YXIgYyA9ICh1ID4+PiAxKSArICh2ID4+PiAxKSArICh1ICYgdiAmIDEpXG5cdFx0XHRcdGlmIChhW3Jlc3VsdFtjXV0gPCBhW2ldKSB7XG5cdFx0XHRcdFx0dSA9IGMgKyAxXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0diA9IGNcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGFbaV0gPCBhW3Jlc3VsdFt1XV0pIHtcblx0XHRcdFx0aWYgKHUgPiAwKSBsaXNUZW1wW2ldID0gcmVzdWx0W3UgLSAxXVxuXHRcdFx0XHRyZXN1bHRbdV0gPSBpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHUgPSByZXN1bHQubGVuZ3RoXG5cdFx0diA9IHJlc3VsdFt1IC0gMV1cblx0XHR3aGlsZSAodS0tID4gMCkge1xuXHRcdFx0cmVzdWx0W3VdID0gdlxuXHRcdFx0diA9IGxpc1RlbXBbdl1cblx0XHR9XG5cdFx0bGlzVGVtcC5sZW5ndGggPSAwXG5cdFx0cmV0dXJuIHJlc3VsdFxuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0TmV4dFNpYmxpbmcodm5vZGVzLCBpLCBuZXh0U2libGluZykge1xuXHRcdGZvciAoOyBpIDwgdm5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodm5vZGVzW2ldICE9IG51bGwgJiYgdm5vZGVzW2ldLmRvbSAhPSBudWxsKSByZXR1cm4gdm5vZGVzW2ldLmRvbVxuXHRcdH1cblx0XHRyZXR1cm4gbmV4dFNpYmxpbmdcblx0fVxuXG5cdC8vIFRoaXMgY292ZXJzIGEgcmVhbGx5IHNwZWNpZmljIGVkZ2UgY2FzZTpcblx0Ly8gLSBQYXJlbnQgbm9kZSBpcyBrZXllZCBhbmQgY29udGFpbnMgY2hpbGRcblx0Ly8gLSBDaGlsZCBpcyByZW1vdmVkLCByZXR1cm5zIHVucmVzb2x2ZWQgcHJvbWlzZSBpbiBgb25iZWZvcmVyZW1vdmVgXG5cdC8vIC0gUGFyZW50IG5vZGUgaXMgbW92ZWQgaW4ga2V5ZWQgZGlmZlxuXHQvLyAtIFJlbWFpbmluZyBjaGlsZHJlbiBzdGlsbCBuZWVkIG1vdmVkIGFwcHJvcHJpYXRlbHlcblx0Ly9cblx0Ly8gSWRlYWxseSwgSSdkIHRyYWNrIHJlbW92ZWQgbm9kZXMgYXMgd2VsbCwgYnV0IHRoYXQgaW50cm9kdWNlcyBhIGxvdCBtb3JlXG5cdC8vIGNvbXBsZXhpdHkgYW5kIEknbSBub3QgZXhhY3RseSBpbnRlcmVzdGVkIGluIGRvaW5nIHRoYXQuXG5cdGZ1bmN0aW9uIG1vdmVOb2RlcyhwYXJlbnQsIHZub2RlLCBuZXh0U2libGluZykge1xuXHRcdHZhciBmcmFnID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHRtb3ZlQ2hpbGRUb0ZyYWcocGFyZW50LCBmcmFnLCB2bm9kZSlcblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZnJhZywgbmV4dFNpYmxpbmcpXG5cdH1cblx0ZnVuY3Rpb24gbW92ZUNoaWxkVG9GcmFnKHBhcmVudCwgZnJhZywgdm5vZGUpIHtcblx0XHQvLyBEb2RnZSB0aGUgcmVjdXJzaW9uIG92ZXJoZWFkIGluIGEgZmV3IG9mIHRoZSBtb3N0IGNvbW1vbiBjYXNlcy5cblx0XHR3aGlsZSAodm5vZGUuZG9tICE9IG51bGwgJiYgdm5vZGUuZG9tLnBhcmVudE5vZGUgPT09IHBhcmVudCkge1xuXHRcdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcgIT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0dm5vZGUgPSB2bm9kZS5pbnN0YW5jZVxuXHRcdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkgY29udGludWVcblx0XHRcdH0gZWxzZSBpZiAodm5vZGUudGFnID09PSBcIjxcIikge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZub2RlLmluc3RhbmNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0ZnJhZy5hcHBlbmRDaGlsZCh2bm9kZS5pbnN0YW5jZVtpXSlcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh2bm9kZS50YWcgIT09IFwiW1wiKSB7XG5cdFx0XHRcdC8vIERvbid0IHJlY3Vyc2UgZm9yIHRleHQgbm9kZXMgKm9yKiBlbGVtZW50cywganVzdCBmcmFnbWVudHNcblx0XHRcdFx0ZnJhZy5hcHBlbmRDaGlsZCh2bm9kZS5kb20pXG5cdFx0XHR9IGVsc2UgaWYgKHZub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHR2bm9kZSA9IHZub2RlLmNoaWxkcmVuWzBdXG5cdFx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSBjb250aW51ZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IHZub2RlLmNoaWxkcmVuW2ldXG5cdFx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwpIG1vdmVDaGlsZFRvRnJhZyhwYXJlbnQsIGZyYWcsIGNoaWxkKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGluc2VydE5vZGUocGFyZW50LCBkb20sIG5leHRTaWJsaW5nKSB7XG5cdFx0aWYgKG5leHRTaWJsaW5nICE9IG51bGwpIHBhcmVudC5pbnNlcnRCZWZvcmUoZG9tLCBuZXh0U2libGluZylcblx0XHRlbHNlIHBhcmVudC5hcHBlbmRDaGlsZChkb20pXG5cdH1cblxuXHRmdW5jdGlvbiBtYXliZVNldENvbnRlbnRFZGl0YWJsZSh2bm9kZSkge1xuXHRcdGlmICh2bm9kZS5hdHRycyA9PSBudWxsIHx8IChcblx0XHRcdHZub2RlLmF0dHJzLmNvbnRlbnRlZGl0YWJsZSA9PSBudWxsICYmIC8vIGF0dHJpYnV0ZVxuXHRcdFx0dm5vZGUuYXR0cnMuY29udGVudEVkaXRhYmxlID09IG51bGwgLy8gcHJvcGVydHlcblx0XHQpKSByZXR1cm4gZmFsc2Vcblx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdGlmIChjaGlsZHJlbiAhPSBudWxsICYmIGNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBjaGlsZHJlblswXS50YWcgPT09IFwiPFwiKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNoaWxkcmVuWzBdLmNoaWxkcmVuXG5cdFx0XHRpZiAodm5vZGUuZG9tLmlubmVySFRNTCAhPT0gY29udGVudCkgdm5vZGUuZG9tLmlubmVySFRNTCA9IGNvbnRlbnRcblx0XHR9XG5cdFx0ZWxzZSBpZiAodm5vZGUudGV4dCAhPSBudWxsIHx8IGNoaWxkcmVuICE9IG51bGwgJiYgY2hpbGRyZW4ubGVuZ3RoICE9PSAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDaGlsZCBub2RlIG9mIGEgY29udGVudGVkaXRhYmxlIG11c3QgYmUgdHJ1c3RlZFwiKVxuXHRcdHJldHVybiB0cnVlXG5cdH1cblxuXHQvL3JlbW92ZVxuXHRmdW5jdGlvbiByZW1vdmVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIGVuZCkge1xuXHRcdGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG5cdFx0XHR2YXIgdm5vZGUgPSB2bm9kZXNbaV1cblx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSByZW1vdmVOb2RlKHBhcmVudCwgdm5vZGUpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHJlbW92ZU5vZGUocGFyZW50LCB2bm9kZSkge1xuXHRcdHZhciBtYXNrID0gMFxuXHRcdHZhciBvcmlnaW5hbCA9IHZub2RlLnN0YXRlXG5cdFx0dmFyIHN0YXRlUmVzdWx0LCBhdHRyc1Jlc3VsdFxuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2bm9kZS5zdGF0ZS5vbmJlZm9yZXJlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS5vbmJlZm9yZXJlbW92ZSwgdm5vZGUpXG5cdFx0XHRpZiAocmVzdWx0ICE9IG51bGwgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0bWFzayA9IDFcblx0XHRcdFx0c3RhdGVSZXN1bHQgPSByZXN1bHRcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHZub2RlLmF0dHJzICYmIHR5cGVvZiB2bm9kZS5hdHRycy5vbmJlZm9yZXJlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gY2FsbEhvb2suY2FsbCh2bm9kZS5hdHRycy5vbmJlZm9yZXJlbW92ZSwgdm5vZGUpXG5cdFx0XHRpZiAocmVzdWx0ICE9IG51bGwgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0bWFzayB8PSAyXG5cdFx0XHRcdGF0dHJzUmVzdWx0ID0gcmVzdWx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNoZWNrU3RhdGUodm5vZGUsIG9yaWdpbmFsKVxuXG5cdFx0Ly8gSWYgd2UgY2FuLCB0cnkgdG8gZmFzdC1wYXRoIGl0IGFuZCBhdm9pZCBhbGwgdGhlIG92ZXJoZWFkIG9mIGF3YWl0aW5nXG5cdFx0aWYgKCFtYXNrKSB7XG5cdFx0XHRvbnJlbW92ZSh2bm9kZSlcblx0XHRcdHJlbW92ZUNoaWxkKHBhcmVudCwgdm5vZGUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChzdGF0ZVJlc3VsdCAhPSBudWxsKSB7XG5cdFx0XHRcdHZhciBuZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHRcdFx0aWYgKG1hc2sgJiAxKSB7IG1hc2sgJj0gMjsgaWYgKCFtYXNrKSByZWFsbHlSZW1vdmUoKSB9XG5cdFx0XHRcdH1cblx0XHRcdFx0c3RhdGVSZXN1bHQudGhlbihuZXh0LCBuZXh0KVxuXHRcdFx0fVxuXHRcdFx0aWYgKGF0dHJzUmVzdWx0ICE9IG51bGwpIHtcblx0XHRcdFx0dmFyIG5leHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0XHRpZiAobWFzayAmIDIpIHsgbWFzayAmPSAxOyBpZiAoIW1hc2spIHJlYWxseVJlbW92ZSgpIH1cblx0XHRcdFx0fVxuXHRcdFx0XHRhdHRyc1Jlc3VsdC50aGVuKG5leHQsIG5leHQpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVhbGx5UmVtb3ZlKCkge1xuXHRcdFx0Y2hlY2tTdGF0ZSh2bm9kZSwgb3JpZ2luYWwpXG5cdFx0XHRvbnJlbW92ZSh2bm9kZSlcblx0XHRcdHJlbW92ZUNoaWxkKHBhcmVudCwgdm5vZGUpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHJlbW92ZUhUTUwocGFyZW50LCB2bm9kZSkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdm5vZGUuaW5zdGFuY2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZCh2bm9kZS5pbnN0YW5jZVtpXSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcmVtb3ZlQ2hpbGQocGFyZW50LCB2bm9kZSkge1xuXHRcdC8vIERvZGdlIHRoZSByZWN1cnNpb24gb3ZlcmhlYWQgaW4gYSBmZXcgb2YgdGhlIG1vc3QgY29tbW9uIGNhc2VzLlxuXHRcdHdoaWxlICh2bm9kZS5kb20gIT0gbnVsbCAmJiB2bm9kZS5kb20ucGFyZW50Tm9kZSA9PT0gcGFyZW50KSB7XG5cdFx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHR2bm9kZSA9IHZub2RlLmluc3RhbmNlXG5cdFx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSBjb250aW51ZVxuXHRcdFx0fSBlbHNlIGlmICh2bm9kZS50YWcgPT09IFwiPFwiKSB7XG5cdFx0XHRcdHJlbW92ZUhUTUwocGFyZW50LCB2bm9kZSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh2bm9kZS50YWcgIT09IFwiW1wiKSB7XG5cdFx0XHRcdFx0cGFyZW50LnJlbW92ZUNoaWxkKHZub2RlLmRvbSlcblx0XHRcdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkodm5vZGUuY2hpbGRyZW4pKSBicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh2bm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR2bm9kZSA9IHZub2RlLmNoaWxkcmVuWzBdXG5cdFx0XHRcdFx0aWYgKHZub2RlICE9IG51bGwpIGNvbnRpbnVlXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIGNoaWxkID0gdm5vZGUuY2hpbGRyZW5baV1cblx0XHRcdFx0XHRcdGlmIChjaGlsZCAhPSBudWxsKSByZW1vdmVDaGlsZChwYXJlbnQsIGNoaWxkKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gb25yZW1vdmUodm5vZGUpIHtcblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Ygdm5vZGUuc3RhdGUub25yZW1vdmUgPT09IFwiZnVuY3Rpb25cIikgY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS5vbnJlbW92ZSwgdm5vZGUpXG5cdFx0aWYgKHZub2RlLmF0dHJzICYmIHR5cGVvZiB2bm9kZS5hdHRycy5vbnJlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSBjYWxsSG9vay5jYWxsKHZub2RlLmF0dHJzLm9ucmVtb3ZlLCB2bm9kZSlcblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0aWYgKHZub2RlLmluc3RhbmNlICE9IG51bGwpIG9ucmVtb3ZlKHZub2RlLmluc3RhbmNlKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuXHRcdFx0XHRcdGlmIChjaGlsZCAhPSBudWxsKSBvbnJlbW92ZShjaGlsZClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vYXR0cnNcblx0ZnVuY3Rpb24gc2V0QXR0cnModm5vZGUsIGF0dHJzLCBucykge1xuXHRcdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdFx0c2V0QXR0cih2bm9kZSwga2V5LCBudWxsLCBhdHRyc1trZXldLCBucylcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gc2V0QXR0cih2bm9kZSwga2V5LCBvbGQsIHZhbHVlLCBucykge1xuXHRcdGlmIChrZXkgPT09IFwia2V5XCIgfHwga2V5ID09PSBcImlzXCIgfHwgdmFsdWUgPT0gbnVsbCB8fCBpc0xpZmVjeWNsZU1ldGhvZChrZXkpIHx8IChvbGQgPT09IHZhbHVlICYmICFpc0Zvcm1BdHRyaWJ1dGUodm5vZGUsIGtleSkpICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuXG5cdFx0aWYgKGtleVswXSA9PT0gXCJvXCIgJiYga2V5WzFdID09PSBcIm5cIikgcmV0dXJuIHVwZGF0ZUV2ZW50KHZub2RlLCBrZXksIHZhbHVlKVxuXHRcdGlmIChrZXkuc2xpY2UoMCwgNikgPT09IFwieGxpbms6XCIpIHZub2RlLmRvbS5zZXRBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiwga2V5LnNsaWNlKDYpLCB2YWx1ZSlcblx0XHRlbHNlIGlmIChrZXkgPT09IFwic3R5bGVcIikgdXBkYXRlU3R5bGUodm5vZGUuZG9tLCBvbGQsIHZhbHVlKVxuXHRcdGVsc2UgaWYgKGhhc1Byb3BlcnR5S2V5KHZub2RlLCBrZXksIG5zKSkge1xuXHRcdFx0aWYgKGtleSA9PT0gXCJ2YWx1ZVwiKSB7XG5cdFx0XHRcdC8vIE9ubHkgZG8gdGhlIGNvZXJjaW9uIGlmIHdlJ3JlIGFjdHVhbGx5IGdvaW5nIHRvIGNoZWNrIHRoZSB2YWx1ZS5cblx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8taW1wbGljaXQtY29lcmNpb24gKi9cblx0XHRcdFx0Ly9zZXR0aW5nIGlucHV0W3ZhbHVlXSB0byBzYW1lIHZhbHVlIGJ5IHR5cGluZyBvbiBmb2N1c2VkIGVsZW1lbnQgbW92ZXMgY3Vyc29yIHRvIGVuZCBpbiBDaHJvbWVcblx0XHRcdFx0aWYgKCh2bm9kZS50YWcgPT09IFwiaW5wdXRcIiB8fCB2bm9kZS50YWcgPT09IFwidGV4dGFyZWFcIikgJiYgdm5vZGUuZG9tLnZhbHVlID09PSBcIlwiICsgdmFsdWUgJiYgdm5vZGUuZG9tID09PSBhY3RpdmVFbGVtZW50KCkpIHJldHVyblxuXHRcdFx0XHQvL3NldHRpbmcgc2VsZWN0W3ZhbHVlXSB0byBzYW1lIHZhbHVlIHdoaWxlIGhhdmluZyBzZWxlY3Qgb3BlbiBibGlua3Mgc2VsZWN0IGRyb3Bkb3duIGluIENocm9tZVxuXHRcdFx0XHRpZiAodm5vZGUudGFnID09PSBcInNlbGVjdFwiICYmIG9sZCAhPT0gbnVsbCAmJiB2bm9kZS5kb20udmFsdWUgPT09IFwiXCIgKyB2YWx1ZSkgcmV0dXJuXG5cdFx0XHRcdC8vc2V0dGluZyBvcHRpb25bdmFsdWVdIHRvIHNhbWUgdmFsdWUgd2hpbGUgaGF2aW5nIHNlbGVjdCBvcGVuIGJsaW5rcyBzZWxlY3QgZHJvcGRvd24gaW4gQ2hyb21lXG5cdFx0XHRcdGlmICh2bm9kZS50YWcgPT09IFwib3B0aW9uXCIgJiYgb2xkICE9PSBudWxsICYmIHZub2RlLmRvbS52YWx1ZSA9PT0gXCJcIiArIHZhbHVlKSByZXR1cm5cblx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1pbXBsaWNpdC1jb2VyY2lvbiAqL1xuXHRcdFx0fVxuXHRcdFx0Ly8gSWYgeW91IGFzc2lnbiBhbiBpbnB1dCB0eXBlIHRoYXQgaXMgbm90IHN1cHBvcnRlZCBieSBJRSAxMSB3aXRoIGFuIGFzc2lnbm1lbnQgZXhwcmVzc2lvbiwgYW4gZXJyb3Igd2lsbCBvY2N1ci5cblx0XHRcdGlmICh2bm9kZS50YWcgPT09IFwiaW5wdXRcIiAmJiBrZXkgPT09IFwidHlwZVwiKSB2bm9kZS5kb20uc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cdFx0XHRlbHNlIHZub2RlLmRvbVtrZXldID0gdmFsdWVcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcblx0XHRcdFx0aWYgKHZhbHVlKSB2bm9kZS5kb20uc2V0QXR0cmlidXRlKGtleSwgXCJcIilcblx0XHRcdFx0ZWxzZSB2bm9kZS5kb20ucmVtb3ZlQXR0cmlidXRlKGtleSlcblx0XHRcdH1cblx0XHRcdGVsc2Ugdm5vZGUuZG9tLnNldEF0dHJpYnV0ZShrZXkgPT09IFwiY2xhc3NOYW1lXCIgPyBcImNsYXNzXCIgOiBrZXksIHZhbHVlKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiByZW1vdmVBdHRyKHZub2RlLCBrZXksIG9sZCwgbnMpIHtcblx0XHRpZiAoa2V5ID09PSBcImtleVwiIHx8IGtleSA9PT0gXCJpc1wiIHx8IG9sZCA9PSBudWxsIHx8IGlzTGlmZWN5Y2xlTWV0aG9kKGtleSkpIHJldHVyblxuXHRcdGlmIChrZXlbMF0gPT09IFwib1wiICYmIGtleVsxXSA9PT0gXCJuXCIgJiYgIWlzTGlmZWN5Y2xlTWV0aG9kKGtleSkpIHVwZGF0ZUV2ZW50KHZub2RlLCBrZXksIHVuZGVmaW5lZClcblx0XHRlbHNlIGlmIChrZXkgPT09IFwic3R5bGVcIikgdXBkYXRlU3R5bGUodm5vZGUuZG9tLCBvbGQsIG51bGwpXG5cdFx0ZWxzZSBpZiAoXG5cdFx0XHRoYXNQcm9wZXJ0eUtleSh2bm9kZSwga2V5LCBucylcblx0XHRcdCYmIGtleSAhPT0gXCJjbGFzc05hbWVcIlxuXHRcdFx0JiYgIShrZXkgPT09IFwidmFsdWVcIiAmJiAoXG5cdFx0XHRcdHZub2RlLnRhZyA9PT0gXCJvcHRpb25cIlxuXHRcdFx0XHR8fCB2bm9kZS50YWcgPT09IFwic2VsZWN0XCIgJiYgdm5vZGUuZG9tLnNlbGVjdGVkSW5kZXggPT09IC0xICYmIHZub2RlLmRvbSA9PT0gYWN0aXZlRWxlbWVudCgpXG5cdFx0XHQpKVxuXHRcdFx0JiYgISh2bm9kZS50YWcgPT09IFwiaW5wdXRcIiAmJiBrZXkgPT09IFwidHlwZVwiKVxuXHRcdCkge1xuXHRcdFx0dm5vZGUuZG9tW2tleV0gPSBudWxsXG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBuc0xhc3RJbmRleCA9IGtleS5pbmRleE9mKFwiOlwiKVxuXHRcdFx0aWYgKG5zTGFzdEluZGV4ICE9PSAtMSkga2V5ID0ga2V5LnNsaWNlKG5zTGFzdEluZGV4ICsgMSlcblx0XHRcdGlmIChvbGQgIT09IGZhbHNlKSB2bm9kZS5kb20ucmVtb3ZlQXR0cmlidXRlKGtleSA9PT0gXCJjbGFzc05hbWVcIiA/IFwiY2xhc3NcIiA6IGtleSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gc2V0TGF0ZVNlbGVjdEF0dHJzKHZub2RlLCBhdHRycykge1xuXHRcdGlmIChcInZhbHVlXCIgaW4gYXR0cnMpIHtcblx0XHRcdGlmKGF0dHJzLnZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdGlmICh2bm9kZS5kb20uc2VsZWN0ZWRJbmRleCAhPT0gLTEpIHZub2RlLmRvbS52YWx1ZSA9IG51bGxcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciBub3JtYWxpemVkID0gXCJcIiArIGF0dHJzLnZhbHVlIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8taW1wbGljaXQtY29lcmNpb25cblx0XHRcdFx0aWYgKHZub2RlLmRvbS52YWx1ZSAhPT0gbm9ybWFsaXplZCB8fCB2bm9kZS5kb20uc2VsZWN0ZWRJbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0XHR2bm9kZS5kb20udmFsdWUgPSBub3JtYWxpemVkXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKFwic2VsZWN0ZWRJbmRleFwiIGluIGF0dHJzKSBzZXRBdHRyKHZub2RlLCBcInNlbGVjdGVkSW5kZXhcIiwgbnVsbCwgYXR0cnMuc2VsZWN0ZWRJbmRleCwgdW5kZWZpbmVkKVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUF0dHJzKHZub2RlLCBvbGQsIGF0dHJzLCBucykge1xuXHRcdGlmIChhdHRycyAhPSBudWxsKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXR0cnMpIHtcblx0XHRcdFx0c2V0QXR0cih2bm9kZSwga2V5LCBvbGQgJiYgb2xkW2tleV0sIGF0dHJzW2tleV0sIG5zKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgdmFsXG5cdFx0aWYgKG9sZCAhPSBudWxsKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2xkKSB7XG5cdFx0XHRcdGlmICgoKHZhbCA9IG9sZFtrZXldKSAhPSBudWxsKSAmJiAoYXR0cnMgPT0gbnVsbCB8fCBhdHRyc1trZXldID09IG51bGwpKSB7XG5cdFx0XHRcdFx0cmVtb3ZlQXR0cih2bm9kZSwga2V5LCB2YWwsIG5zKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGlzRm9ybUF0dHJpYnV0ZSh2bm9kZSwgYXR0cikge1xuXHRcdHJldHVybiBhdHRyID09PSBcInZhbHVlXCIgfHwgYXR0ciA9PT0gXCJjaGVja2VkXCIgfHwgYXR0ciA9PT0gXCJzZWxlY3RlZEluZGV4XCIgfHwgYXR0ciA9PT0gXCJzZWxlY3RlZFwiICYmIHZub2RlLmRvbSA9PT0gYWN0aXZlRWxlbWVudCgpIHx8IHZub2RlLnRhZyA9PT0gXCJvcHRpb25cIiAmJiB2bm9kZS5kb20ucGFyZW50Tm9kZSA9PT0gJGRvYy5hY3RpdmVFbGVtZW50XG5cdH1cblx0ZnVuY3Rpb24gaXNMaWZlY3ljbGVNZXRob2QoYXR0cikge1xuXHRcdHJldHVybiBhdHRyID09PSBcIm9uaW5pdFwiIHx8IGF0dHIgPT09IFwib25jcmVhdGVcIiB8fCBhdHRyID09PSBcIm9udXBkYXRlXCIgfHwgYXR0ciA9PT0gXCJvbnJlbW92ZVwiIHx8IGF0dHIgPT09IFwib25iZWZvcmVyZW1vdmVcIiB8fCBhdHRyID09PSBcIm9uYmVmb3JldXBkYXRlXCJcblx0fVxuXHRmdW5jdGlvbiBoYXNQcm9wZXJ0eUtleSh2bm9kZSwga2V5LCBucykge1xuXHRcdC8vIEZpbHRlciBvdXQgbmFtZXNwYWNlZCBrZXlzXG5cdFx0cmV0dXJuIG5zID09PSB1bmRlZmluZWQgJiYgKFxuXHRcdFx0Ly8gSWYgaXQncyBhIGN1c3RvbSBlbGVtZW50LCBqdXN0IGtlZXAgaXQuXG5cdFx0XHR2bm9kZS50YWcuaW5kZXhPZihcIi1cIikgPiAtMSB8fCB2bm9kZS5hdHRycyAhPSBudWxsICYmIHZub2RlLmF0dHJzLmlzIHx8XG5cdFx0XHQvLyBJZiBpdCdzIGEgbm9ybWFsIGVsZW1lbnQsIGxldCdzIHRyeSB0byBhdm9pZCBhIGZldyBicm93c2VyIGJ1Z3MuXG5cdFx0XHRrZXkgIT09IFwiaHJlZlwiICYmIGtleSAhPT0gXCJsaXN0XCIgJiYga2V5ICE9PSBcImZvcm1cIiAmJiBrZXkgIT09IFwid2lkdGhcIiAmJiBrZXkgIT09IFwiaGVpZ2h0XCIvLyAmJiBrZXkgIT09IFwidHlwZVwiXG5cdFx0XHQvLyBEZWZlciB0aGUgcHJvcGVydHkgY2hlY2sgdW50aWwgKmFmdGVyKiB3ZSBjaGVjayBldmVyeXRoaW5nLlxuXHRcdCkgJiYga2V5IGluIHZub2RlLmRvbVxuXHR9XG5cblx0Ly9zdHlsZVxuXHR2YXIgdXBwZXJjYXNlUmVnZXggPSAvW0EtWl0vZ1xuXHRmdW5jdGlvbiB0b0xvd2VyQ2FzZShjYXBpdGFsKSB7IHJldHVybiBcIi1cIiArIGNhcGl0YWwudG9Mb3dlckNhc2UoKSB9XG5cdGZ1bmN0aW9uIG5vcm1hbGl6ZUtleShrZXkpIHtcblx0XHRyZXR1cm4ga2V5WzBdID09PSBcIi1cIiAmJiBrZXlbMV0gPT09IFwiLVwiID8ga2V5IDpcblx0XHRcdGtleSA9PT0gXCJjc3NGbG9hdFwiID8gXCJmbG9hdFwiIDpcblx0XHRcdFx0a2V5LnJlcGxhY2UodXBwZXJjYXNlUmVnZXgsIHRvTG93ZXJDYXNlKVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKGVsZW1lbnQsIG9sZCwgc3R5bGUpIHtcblx0XHRpZiAob2xkID09PSBzdHlsZSkge1xuXHRcdFx0Ly8gU3R5bGVzIGFyZSBlcXVpdmFsZW50LCBkbyBub3RoaW5nLlxuXHRcdH0gZWxzZSBpZiAoc3R5bGUgPT0gbnVsbCkge1xuXHRcdFx0Ly8gTmV3IHN0eWxlIGlzIG1pc3NpbmcsIGp1c3QgY2xlYXIgaXQuXG5cdFx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBcIlwiXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygc3R5bGUgIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdC8vIE5ldyBzdHlsZSBpcyBhIHN0cmluZywgbGV0IGVuZ2luZSBkZWFsIHdpdGggcGF0Y2hpbmcuXG5cdFx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBzdHlsZVxuXHRcdH0gZWxzZSBpZiAob2xkID09IG51bGwgfHwgdHlwZW9mIG9sZCAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0Ly8gYG9sZGAgaXMgbWlzc2luZyBvciBhIHN0cmluZywgYHN0eWxlYCBpcyBhbiBvYmplY3QuXG5cdFx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBcIlwiXG5cdFx0XHQvLyBBZGQgbmV3IHN0eWxlIHByb3BlcnRpZXNcblx0XHRcdGZvciAodmFyIGtleSBpbiBzdHlsZSkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSBzdHlsZVtrZXldXG5cdFx0XHRcdGlmICh2YWx1ZSAhPSBudWxsKSBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KG5vcm1hbGl6ZUtleShrZXkpLCBTdHJpbmcodmFsdWUpKVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBCb3RoIG9sZCAmIG5ldyBhcmUgKGRpZmZlcmVudCkgb2JqZWN0cy5cblx0XHRcdC8vIFVwZGF0ZSBzdHlsZSBwcm9wZXJ0aWVzIHRoYXQgaGF2ZSBjaGFuZ2VkXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gc3R5bGUpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gc3R5bGVba2V5XVxuXHRcdFx0XHRpZiAodmFsdWUgIT0gbnVsbCAmJiAodmFsdWUgPSBTdHJpbmcodmFsdWUpKSAhPT0gU3RyaW5nKG9sZFtrZXldKSkge1xuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkobm9ybWFsaXplS2V5KGtleSksIHZhbHVlKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBSZW1vdmUgc3R5bGUgcHJvcGVydGllcyB0aGF0IG5vIGxvbmdlciBleGlzdFxuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9sZCkge1xuXHRcdFx0XHRpZiAob2xkW2tleV0gIT0gbnVsbCAmJiBzdHlsZVtrZXldID09IG51bGwpIHtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KG5vcm1hbGl6ZUtleShrZXkpKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gSGVyZSdzIGFuIGV4cGxhbmF0aW9uIG9mIGhvdyB0aGlzIHdvcmtzOlxuXHQvLyAxLiBUaGUgZXZlbnQgbmFtZXMgYXJlIGFsd2F5cyAoYnkgZGVzaWduKSBwcmVmaXhlZCBieSBgb25gLlxuXHQvLyAyLiBUaGUgRXZlbnRMaXN0ZW5lciBpbnRlcmZhY2UgYWNjZXB0cyBlaXRoZXIgYSBmdW5jdGlvbiBvciBhbiBvYmplY3Rcblx0Ly8gICAgd2l0aCBhIGBoYW5kbGVFdmVudGAgbWV0aG9kLlxuXHQvLyAzLiBUaGUgb2JqZWN0IGRvZXMgbm90IGluaGVyaXQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAsIHRvIGF2b2lkXG5cdC8vICAgIGFueSBwb3RlbnRpYWwgaW50ZXJmZXJlbmNlIHdpdGggdGhhdCAoZS5nLiBzZXR0ZXJzKS5cblx0Ly8gNC4gVGhlIGV2ZW50IG5hbWUgaXMgcmVtYXBwZWQgdG8gdGhlIGhhbmRsZXIgYmVmb3JlIGNhbGxpbmcgaXQuXG5cdC8vIDUuIEluIGZ1bmN0aW9uLWJhc2VkIGV2ZW50IGhhbmRsZXJzLCBgZXYudGFyZ2V0ID09PSB0aGlzYC4gV2UgcmVwbGljYXRlXG5cdC8vICAgIHRoYXQgYmVsb3cuXG5cdC8vIDYuIEluIGZ1bmN0aW9uLWJhc2VkIGV2ZW50IGhhbmRsZXJzLCBgcmV0dXJuIGZhbHNlYCBwcmV2ZW50cyB0aGUgZGVmYXVsdFxuXHQvLyAgICBhY3Rpb24gYW5kIHN0b3BzIGV2ZW50IHByb3BhZ2F0aW9uLiBXZSByZXBsaWNhdGUgdGhhdCBiZWxvdy5cblx0ZnVuY3Rpb24gRXZlbnREaWN0KCkge1xuXHRcdC8vIFNhdmUgdGhpcywgc28gdGhlIGN1cnJlbnQgcmVkcmF3IGlzIGNvcnJlY3RseSB0cmFja2VkLlxuXHRcdHRoaXMuXyA9IGN1cnJlbnRSZWRyYXdcblx0fVxuXHRFdmVudERpY3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXHRFdmVudERpY3QucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24gKGV2KSB7XG5cdFx0dmFyIGhhbmRsZXIgPSB0aGlzW1wib25cIiArIGV2LnR5cGVdXG5cdFx0dmFyIHJlc3VsdFxuXHRcdGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSByZXN1bHQgPSBoYW5kbGVyLmNhbGwoZXYuY3VycmVudFRhcmdldCwgZXYpXG5cdFx0ZWxzZSBpZiAodHlwZW9mIGhhbmRsZXIuaGFuZGxlRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgaGFuZGxlci5oYW5kbGVFdmVudChldilcblx0XHRpZiAodGhpcy5fICYmIGV2LnJlZHJhdyAhPT0gZmFsc2UpICgwLCB0aGlzLl8pKClcblx0XHRpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuXHRcdFx0ZXYucHJldmVudERlZmF1bHQoKVxuXHRcdFx0ZXYuc3RvcFByb3BhZ2F0aW9uKClcblx0XHR9XG5cdH1cblxuXHQvL2V2ZW50XG5cdGZ1bmN0aW9uIHVwZGF0ZUV2ZW50KHZub2RlLCBrZXksIHZhbHVlKSB7XG5cdFx0aWYgKHZub2RlLmV2ZW50cyAhPSBudWxsKSB7XG5cdFx0XHRpZiAodm5vZGUuZXZlbnRzW2tleV0gPT09IHZhbHVlKSByZXR1cm5cblx0XHRcdGlmICh2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpKSB7XG5cdFx0XHRcdGlmICh2bm9kZS5ldmVudHNba2V5XSA9PSBudWxsKSB2bm9kZS5kb20uYWRkRXZlbnRMaXN0ZW5lcihrZXkuc2xpY2UoMiksIHZub2RlLmV2ZW50cywgZmFsc2UpXG5cdFx0XHRcdHZub2RlLmV2ZW50c1trZXldID0gdmFsdWVcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh2bm9kZS5ldmVudHNba2V5XSAhPSBudWxsKSB2bm9kZS5kb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihrZXkuc2xpY2UoMiksIHZub2RlLmV2ZW50cywgZmFsc2UpXG5cdFx0XHRcdHZub2RlLmV2ZW50c1trZXldID0gdW5kZWZpbmVkXG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpKSB7XG5cdFx0XHR2bm9kZS5ldmVudHMgPSBuZXcgRXZlbnREaWN0KClcblx0XHRcdHZub2RlLmRvbS5hZGRFdmVudExpc3RlbmVyKGtleS5zbGljZSgyKSwgdm5vZGUuZXZlbnRzLCBmYWxzZSlcblx0XHRcdHZub2RlLmV2ZW50c1trZXldID0gdmFsdWVcblx0XHR9XG5cdH1cblxuXHQvL2xpZmVjeWNsZVxuXHRmdW5jdGlvbiBpbml0TGlmZWN5Y2xlKHNvdXJjZSwgdm5vZGUsIGhvb2tzKSB7XG5cdFx0aWYgKHR5cGVvZiBzb3VyY2Uub25pbml0ID09PSBcImZ1bmN0aW9uXCIpIGNhbGxIb29rLmNhbGwoc291cmNlLm9uaW5pdCwgdm5vZGUpXG5cdFx0aWYgKHR5cGVvZiBzb3VyY2Uub25jcmVhdGUgPT09IFwiZnVuY3Rpb25cIikgaG9va3MucHVzaChjYWxsSG9vay5iaW5kKHNvdXJjZS5vbmNyZWF0ZSwgdm5vZGUpKVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUxpZmVjeWNsZShzb3VyY2UsIHZub2RlLCBob29rcykge1xuXHRcdGlmICh0eXBlb2Ygc291cmNlLm9udXBkYXRlID09PSBcImZ1bmN0aW9uXCIpIGhvb2tzLnB1c2goY2FsbEhvb2suYmluZChzb3VyY2Uub251cGRhdGUsIHZub2RlKSlcblx0fVxuXHRmdW5jdGlvbiBzaG91bGROb3RVcGRhdGUodm5vZGUsIG9sZCkge1xuXHRcdGRvIHtcblx0XHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsICYmIHR5cGVvZiB2bm9kZS5hdHRycy5vbmJlZm9yZXVwZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHZhciBmb3JjZSA9IGNhbGxIb29rLmNhbGwodm5vZGUuYXR0cnMub25iZWZvcmV1cGRhdGUsIHZub2RlLCBvbGQpXG5cdFx0XHRcdGlmIChmb3JjZSAhPT0gdW5kZWZpbmVkICYmICFmb3JjZSkgYnJlYWtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2bm9kZS5zdGF0ZS5vbmJlZm9yZXVwZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHZhciBmb3JjZSA9IGNhbGxIb29rLmNhbGwodm5vZGUuc3RhdGUub25iZWZvcmV1cGRhdGUsIHZub2RlLCBvbGQpXG5cdFx0XHRcdGlmIChmb3JjZSAhPT0gdW5kZWZpbmVkICYmICFmb3JjZSkgYnJlYWtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH0gd2hpbGUgKGZhbHNlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cblx0XHR2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0dm5vZGUuZG9tU2l6ZSA9IG9sZC5kb21TaXplXG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBvbGQuaW5zdGFuY2Vcblx0XHQvLyBPbmUgd291bGQgdGhpbmsgaGF2aW5nIHRoZSBhY3R1YWwgbGF0ZXN0IGF0dHJpYnV0ZXMgd291bGQgYmUgaWRlYWwsXG5cdFx0Ly8gYnV0IGl0IGRvZXNuJ3QgbGV0IHVzIHByb3Blcmx5IGRpZmYgYmFzZWQgb24gb3VyIGN1cnJlbnQgaW50ZXJuYWxcblx0XHQvLyByZXByZXNlbnRhdGlvbi4gV2UgaGF2ZSB0byBzYXZlIG5vdCBvbmx5IHRoZSBvbGQgRE9NIGluZm8sIGJ1dCBhbHNvXG5cdFx0Ly8gdGhlIGF0dHJpYnV0ZXMgdXNlZCB0byBjcmVhdGUgaXQsIGFzIHdlIGRpZmYgKnRoYXQqLCBub3QgYWdhaW5zdCB0aGVcblx0XHQvLyBET00gZGlyZWN0bHkgKHdpdGggYSBmZXcgZXhjZXB0aW9ucyBpbiBgc2V0QXR0cmApLiBBbmQsIG9mIGNvdXJzZSwgd2Vcblx0XHQvLyBuZWVkIHRvIHNhdmUgdGhlIGNoaWxkcmVuIGFuZCB0ZXh0IGFzIHRoZXkgYXJlIGNvbmNlcHR1YWxseSBub3Rcblx0XHQvLyB1bmxpa2Ugc3BlY2lhbCBcImF0dHJpYnV0ZXNcIiBpbnRlcm5hbGx5LlxuXHRcdHZub2RlLmF0dHJzID0gb2xkLmF0dHJzXG5cdFx0dm5vZGUuY2hpbGRyZW4gPSBvbGQuY2hpbGRyZW5cblx0XHR2bm9kZS50ZXh0ID0gb2xkLnRleHRcblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uKGRvbSwgdm5vZGVzLCByZWRyYXcpIHtcblx0XHRpZiAoIWRvbSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkVuc3VyZSB0aGUgRE9NIGVsZW1lbnQgYmVpbmcgcGFzc2VkIHRvIG0ucm91dGUvbS5tb3VudC9tLnJlbmRlciBpcyBub3QgdW5kZWZpbmVkLlwiKVxuXHRcdHZhciBob29rcyA9IFtdXG5cdFx0dmFyIGFjdGl2ZSA9IGFjdGl2ZUVsZW1lbnQoKVxuXHRcdHZhciBuYW1lc3BhY2UgPSBkb20ubmFtZXNwYWNlVVJJXG5cblx0XHQvLyBGaXJzdCB0aW1lIHJlbmRlcmluZyBpbnRvIGEgbm9kZSBjbGVhcnMgaXQgb3V0XG5cdFx0aWYgKGRvbS52bm9kZXMgPT0gbnVsbCkgZG9tLnRleHRDb250ZW50ID0gXCJcIlxuXG5cdFx0dm5vZGVzID0gVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4oQXJyYXkuaXNBcnJheSh2bm9kZXMpID8gdm5vZGVzIDogW3Zub2Rlc10pXG5cdFx0dmFyIHByZXZSZWRyYXcgPSBjdXJyZW50UmVkcmF3XG5cdFx0dHJ5IHtcblx0XHRcdGN1cnJlbnRSZWRyYXcgPSB0eXBlb2YgcmVkcmF3ID09PSBcImZ1bmN0aW9uXCIgPyByZWRyYXcgOiB1bmRlZmluZWRcblx0XHRcdHVwZGF0ZU5vZGVzKGRvbSwgZG9tLnZub2Rlcywgdm5vZGVzLCBob29rcywgbnVsbCwgbmFtZXNwYWNlID09PSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiA/IHVuZGVmaW5lZCA6IG5hbWVzcGFjZSlcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0Y3VycmVudFJlZHJhdyA9IHByZXZSZWRyYXdcblx0XHR9XG5cdFx0ZG9tLnZub2RlcyA9IHZub2Rlc1xuXHRcdC8vIGBkb2N1bWVudC5hY3RpdmVFbGVtZW50YCBjYW4gcmV0dXJuIG51bGw6IGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2ludGVyYWN0aW9uLmh0bWwjZG9tLWRvY3VtZW50LWFjdGl2ZWVsZW1lbnRcblx0XHRpZiAoYWN0aXZlICE9IG51bGwgJiYgYWN0aXZlRWxlbWVudCgpICE9PSBhY3RpdmUgJiYgdHlwZW9mIGFjdGl2ZS5mb2N1cyA9PT0gXCJmdW5jdGlvblwiKSBhY3RpdmUuZm9jdXMoKVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyBpKyspIGhvb2tzW2ldKClcblx0fVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGh0bWwpIHtcblx0aWYgKGh0bWwgPT0gbnVsbCkgaHRtbCA9IFwiXCJcblx0cmV0dXJuIFZub2RlKFwiPFwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaHRtbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG5mdW5jdGlvbiBWbm9kZSh0YWcsIGtleSwgYXR0cnMsIGNoaWxkcmVuLCB0ZXh0LCBkb20pIHtcblx0cmV0dXJuIHt0YWc6IHRhZywga2V5OiBrZXksIGF0dHJzOiBhdHRycywgY2hpbGRyZW46IGNoaWxkcmVuLCB0ZXh0OiB0ZXh0LCBkb206IGRvbSwgZG9tU2l6ZTogdW5kZWZpbmVkLCBzdGF0ZTogdW5kZWZpbmVkLCBldmVudHM6IHVuZGVmaW5lZCwgaW5zdGFuY2U6IHVuZGVmaW5lZH1cbn1cblZub2RlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG5vZGUpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHJldHVybiBWbm9kZShcIltcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKG5vZGUpLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcblx0aWYgKG5vZGUgPT0gbnVsbCB8fCB0eXBlb2Ygbm9kZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiBudWxsXG5cdGlmICh0eXBlb2Ygbm9kZSA9PT0gXCJvYmplY3RcIikgcmV0dXJuIG5vZGVcblx0cmV0dXJuIFZub2RlKFwiI1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgU3RyaW5nKG5vZGUpLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcbn1cblZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0dmFyIGNoaWxkcmVuID0gW11cblx0aWYgKGlucHV0Lmxlbmd0aCkge1xuXHRcdHZhciBpc0tleWVkID0gaW5wdXRbMF0gIT0gbnVsbCAmJiBpbnB1dFswXS5rZXkgIT0gbnVsbFxuXHRcdC8vIE5vdGU6IHRoaXMgaXMgYSAqdmVyeSogcGVyZi1zZW5zaXRpdmUgY2hlY2suXG5cdFx0Ly8gRnVuIGZhY3Q6IG1lcmdpbmcgdGhlIGxvb3AgbGlrZSB0aGlzIGlzIHNvbWVob3cgZmFzdGVyIHRoYW4gc3BsaXR0aW5nXG5cdFx0Ly8gaXQsIG5vdGljZWFibHkgc28uXG5cdFx0Zm9yICh2YXIgaSA9IDE7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKChpbnB1dFtpXSAhPSBudWxsICYmIGlucHV0W2ldLmtleSAhPSBudWxsKSAhPT0gaXNLZXllZCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiVm5vZGVzIG11c3QgZWl0aGVyIGFsd2F5cyBoYXZlIGtleXMgb3IgbmV2ZXIgaGF2ZSBrZXlzIVwiKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjaGlsZHJlbltpXSA9IFZub2RlLm5vcm1hbGl6ZShpbnB1dFtpXSlcblx0XHR9XG5cdH1cblx0cmV0dXJuIGNoaWxkcmVuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gVm5vZGVcbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBQcm9taXNlUG9seWZpbGwgPSByZXF1aXJlKFwiLi9wcm9taXNlL3Byb21pc2VcIilcbnZhciBtb3VudFJlZHJhdyA9IHJlcXVpcmUoXCIuL21vdW50LXJlZHJhd1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3JlcXVlc3QvcmVxdWVzdFwiKSh3aW5kb3csIFByb21pc2VQb2x5ZmlsbCwgbW91bnRSZWRyYXcucmVkcmF3KVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGJ1aWxkUGF0aG5hbWUgPSByZXF1aXJlKFwiLi4vcGF0aG5hbWUvYnVpbGRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkd2luZG93LCBQcm9taXNlLCBvbmNvbXBsZXRpb24pIHtcblx0dmFyIGNhbGxiYWNrQ291bnQgPSAwXG5cblx0ZnVuY3Rpb24gUHJvbWlzZVByb3h5KGV4ZWN1dG9yKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGV4ZWN1dG9yKVxuXHR9XG5cblx0Ly8gSW4gY2FzZSB0aGUgZ2xvYmFsIFByb21pc2UgaXMgc29tZSB1c2VybGFuZCBsaWJyYXJ5J3Mgd2hlcmUgdGhleSByZWx5IG9uXG5cdC8vIGBmb28gaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yYCwgYHRoaXMuY29uc3RydWN0b3IucmVzb2x2ZSh2YWx1ZSlgLCBvclxuXHQvLyBzaW1pbGFyLiBMZXQncyAqbm90KiBicmVhayB0aGVtLlxuXHRQcm9taXNlUHJveHkucHJvdG90eXBlID0gUHJvbWlzZS5wcm90b3R5cGVcblx0UHJvbWlzZVByb3h5Ll9fcHJvdG9fXyA9IFByb21pc2UgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b1xuXG5cdGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KGZhY3RvcnkpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24odXJsLCBhcmdzKSB7XG5cdFx0XHRpZiAodHlwZW9mIHVybCAhPT0gXCJzdHJpbmdcIikgeyBhcmdzID0gdXJsOyB1cmwgPSB1cmwudXJsIH1cblx0XHRcdGVsc2UgaWYgKGFyZ3MgPT0gbnVsbCkgYXJncyA9IHt9XG5cdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0XHRmYWN0b3J5KGJ1aWxkUGF0aG5hbWUodXJsLCBhcmdzLnBhcmFtcyksIGFyZ3MsIGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBhcmdzLnR5cGUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0YVtpXSA9IG5ldyBhcmdzLnR5cGUoZGF0YVtpXSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSBkYXRhID0gbmV3IGFyZ3MudHlwZShkYXRhKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXNvbHZlKGRhdGEpXG5cdFx0XHRcdH0sIHJlamVjdClcblx0XHRcdH0pXG5cdFx0XHRpZiAoYXJncy5iYWNrZ3JvdW5kID09PSB0cnVlKSByZXR1cm4gcHJvbWlzZVxuXHRcdFx0dmFyIGNvdW50ID0gMFxuXHRcdFx0ZnVuY3Rpb24gY29tcGxldGUoKSB7XG5cdFx0XHRcdGlmICgtLWNvdW50ID09PSAwICYmIHR5cGVvZiBvbmNvbXBsZXRpb24gPT09IFwiZnVuY3Rpb25cIikgb25jb21wbGV0aW9uKClcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHdyYXAocHJvbWlzZSlcblxuXHRcdFx0ZnVuY3Rpb24gd3JhcChwcm9taXNlKSB7XG5cdFx0XHRcdHZhciB0aGVuID0gcHJvbWlzZS50aGVuXG5cdFx0XHRcdC8vIFNldCB0aGUgY29uc3RydWN0b3IsIHNvIGVuZ2luZXMga25vdyB0byBub3QgYXdhaXQgb3IgcmVzb2x2ZVxuXHRcdFx0XHQvLyB0aGlzIGFzIGEgbmF0aXZlIHByb21pc2UuIEF0IHRoZSB0aW1lIG9mIHdyaXRpbmcsIHRoaXMgaXNcblx0XHRcdFx0Ly8gb25seSBuZWNlc3NhcnkgZm9yIFY4LCBidXQgdGhlaXIgYmVoYXZpb3IgaXMgdGhlIGNvcnJlY3Rcblx0XHRcdFx0Ly8gYmVoYXZpb3IgcGVyIHNwZWMuIFNlZSB0aGlzIHNwZWMgaXNzdWUgZm9yIG1vcmUgZGV0YWlsczpcblx0XHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvZWNtYTI2Mi9pc3N1ZXMvMTU3Ny4gQWxzbywgc2VlIHRoZVxuXHRcdFx0XHQvLyBjb3JyZXNwb25kaW5nIGNvbW1lbnQgaW4gYHJlcXVlc3QvdGVzdHMvdGVzdC1yZXF1ZXN0LmpzYCBmb3Jcblx0XHRcdFx0Ly8gYSBiaXQgbW9yZSBiYWNrZ3JvdW5kIG9uIHRoZSBpc3N1ZSBhdCBoYW5kLlxuXHRcdFx0XHRwcm9taXNlLmNvbnN0cnVjdG9yID0gUHJvbWlzZVByb3h5XG5cdFx0XHRcdHByb21pc2UudGhlbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGNvdW50Kytcblx0XHRcdFx0XHR2YXIgbmV4dCA9IHRoZW4uYXBwbHkocHJvbWlzZSwgYXJndW1lbnRzKVxuXHRcdFx0XHRcdG5leHQudGhlbihjb21wbGV0ZSwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdFx0Y29tcGxldGUoKVxuXHRcdFx0XHRcdFx0aWYgKGNvdW50ID09PSAwKSB0aHJvdyBlXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRyZXR1cm4gd3JhcChuZXh0KVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBwcm9taXNlXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGFzSGVhZGVyKGFyZ3MsIG5hbWUpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gYXJncy5oZWFkZXJzKSB7XG5cdFx0XHRpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChhcmdzLmhlYWRlcnMsIGtleSkgJiYgbmFtZS50ZXN0KGtleSkpIHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRyZXF1ZXN0OiBtYWtlUmVxdWVzdChmdW5jdGlvbih1cmwsIGFyZ3MsIHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIG1ldGhvZCA9IGFyZ3MubWV0aG9kICE9IG51bGwgPyBhcmdzLm1ldGhvZC50b1VwcGVyQ2FzZSgpIDogXCJHRVRcIlxuXHRcdFx0dmFyIGJvZHkgPSBhcmdzLmJvZHlcblx0XHRcdHZhciBhc3N1bWVKU09OID0gKGFyZ3Muc2VyaWFsaXplID09IG51bGwgfHwgYXJncy5zZXJpYWxpemUgPT09IEpTT04uc2VyaWFsaXplKSAmJiAhKGJvZHkgaW5zdGFuY2VvZiAkd2luZG93LkZvcm1EYXRhKVxuXHRcdFx0dmFyIHJlc3BvbnNlVHlwZSA9IGFyZ3MucmVzcG9uc2VUeXBlIHx8ICh0eXBlb2YgYXJncy5leHRyYWN0ID09PSBcImZ1bmN0aW9uXCIgPyBcIlwiIDogXCJqc29uXCIpXG5cblx0XHRcdHZhciB4aHIgPSBuZXcgJHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpLCBhYm9ydGVkID0gZmFsc2Vcblx0XHRcdHZhciBvcmlnaW5hbCA9IHhociwgcmVwbGFjZWRBYm9ydFxuXHRcdFx0dmFyIGFib3J0ID0geGhyLmFib3J0XG5cblx0XHRcdHhoci5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRhYm9ydGVkID0gdHJ1ZVxuXHRcdFx0XHRhYm9ydC5jYWxsKHRoaXMpXG5cdFx0XHR9XG5cblx0XHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsLCBhcmdzLmFzeW5jICE9PSBmYWxzZSwgdHlwZW9mIGFyZ3MudXNlciA9PT0gXCJzdHJpbmdcIiA/IGFyZ3MudXNlciA6IHVuZGVmaW5lZCwgdHlwZW9mIGFyZ3MucGFzc3dvcmQgPT09IFwic3RyaW5nXCIgPyBhcmdzLnBhc3N3b3JkIDogdW5kZWZpbmVkKVxuXG5cdFx0XHRpZiAoYXNzdW1lSlNPTiAmJiBib2R5ICE9IG51bGwgJiYgIWhhc0hlYWRlcihhcmdzLCAvXmNvbnRlbnQtdHlwZSQvaSkpIHtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpXG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIGFyZ3MuZGVzZXJpYWxpemUgIT09IFwiZnVuY3Rpb25cIiAmJiAhaGFzSGVhZGVyKGFyZ3MsIC9eYWNjZXB0JC9pKSkge1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvKlwiKVxuXHRcdFx0fVxuXHRcdFx0aWYgKGFyZ3Mud2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gYXJncy53aXRoQ3JlZGVudGlhbHNcblx0XHRcdGlmIChhcmdzLnRpbWVvdXQpIHhoci50aW1lb3V0ID0gYXJncy50aW1lb3V0XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlXG5cblx0XHRcdGZvciAodmFyIGtleSBpbiBhcmdzLmhlYWRlcnMpIHtcblx0XHRcdFx0aWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoYXJncy5oZWFkZXJzLCBrZXkpKSB7XG5cdFx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBhcmdzLmhlYWRlcnNba2V5XSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0Ly8gRG9uJ3QgdGhyb3cgZXJyb3JzIG9uIHhoci5hYm9ydCgpLlxuXHRcdFx0XHRpZiAoYWJvcnRlZCkgcmV0dXJuXG5cblx0XHRcdFx0aWYgKGV2LnRhcmdldC5yZWFkeVN0YXRlID09PSA0KSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gKGV2LnRhcmdldC5zdGF0dXMgPj0gMjAwICYmIGV2LnRhcmdldC5zdGF0dXMgPCAzMDApIHx8IGV2LnRhcmdldC5zdGF0dXMgPT09IDMwNCB8fCAoL15maWxlOlxcL1xcLy9pKS50ZXN0KHVybClcblx0XHRcdFx0XHRcdC8vIFdoZW4gdGhlIHJlc3BvbnNlIHR5cGUgaXNuJ3QgXCJcIiBvciBcInRleHRcIixcblx0XHRcdFx0XHRcdC8vIGB4aHIucmVzcG9uc2VUZXh0YCBpcyB0aGUgd3JvbmcgdGhpbmcgdG8gdXNlLlxuXHRcdFx0XHRcdFx0Ly8gQnJvd3NlcnMgZG8gdGhlIHJpZ2h0IHRoaW5nIGFuZCB0aHJvdyBoZXJlLCBhbmQgd2Vcblx0XHRcdFx0XHRcdC8vIHNob3VsZCBob25vciB0aGF0IGFuZCBkbyB0aGUgcmlnaHQgdGhpbmcgYnlcblx0XHRcdFx0XHRcdC8vIHByZWZlcnJpbmcgYHhoci5yZXNwb25zZWAgd2hlcmUgcG9zc2libGUvcHJhY3RpY2FsLlxuXHRcdFx0XHRcdFx0dmFyIHJlc3BvbnNlID0gZXYudGFyZ2V0LnJlc3BvbnNlLCBtZXNzYWdlXG5cblx0XHRcdFx0XHRcdGlmIChyZXNwb25zZVR5cGUgPT09IFwianNvblwiKSB7XG5cdFx0XHRcdFx0XHRcdC8vIEZvciBJRSBhbmQgRWRnZSwgd2hpY2ggZG9uJ3QgaW1wbGVtZW50XG5cdFx0XHRcdFx0XHRcdC8vIGByZXNwb25zZVR5cGU6IFwianNvblwiYC5cblx0XHRcdFx0XHRcdFx0aWYgKCFldi50YXJnZXQucmVzcG9uc2VUeXBlICYmIHR5cGVvZiBhcmdzLmV4dHJhY3QgIT09IFwiZnVuY3Rpb25cIikgcmVzcG9uc2UgPSBKU09OLnBhcnNlKGV2LnRhcmdldC5yZXNwb25zZVRleHQpXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSBcInRleHRcIikge1xuXHRcdFx0XHRcdFx0XHQvLyBPbmx5IHVzZSB0aGlzIGRlZmF1bHQgaWYgaXQncyB0ZXh0LiBJZiBhIHBhcnNlZFxuXHRcdFx0XHRcdFx0XHQvLyBkb2N1bWVudCBpcyBuZWVkZWQgb24gb2xkIElFIGFuZCBmcmllbmRzIChhbGxcblx0XHRcdFx0XHRcdFx0Ly8gdW5zdXBwb3J0ZWQpLCB0aGUgdXNlciBzaG91bGQgdXNlIGEgY3VzdG9tXG5cdFx0XHRcdFx0XHRcdC8vIGBjb25maWdgIGluc3RlYWQuIFRoZXkncmUgYWxyZWFkeSB1c2luZyB0aGlzIGF0XG5cdFx0XHRcdFx0XHRcdC8vIHRoZWlyIG93biByaXNrLlxuXHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UgPT0gbnVsbCkgcmVzcG9uc2UgPSBldi50YXJnZXQucmVzcG9uc2VUZXh0XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgYXJncy5leHRyYWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBhcmdzLmV4dHJhY3QoZXYudGFyZ2V0LCBhcmdzKVxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzID0gdHJ1ZVxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgYXJncy5kZXNlcmlhbGl6ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gYXJncy5kZXNlcmlhbGl6ZShyZXNwb25zZSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChzdWNjZXNzKSByZXNvbHZlKHJlc3BvbnNlKVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7IG1lc3NhZ2UgPSBldi50YXJnZXQucmVzcG9uc2VUZXh0IH1cblx0XHRcdFx0XHRcdFx0Y2F0Y2ggKGUpIHsgbWVzc2FnZSA9IHJlc3BvbnNlIH1cblx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpXG5cdFx0XHRcdFx0XHRcdGVycm9yLmNvZGUgPSBldi50YXJnZXQuc3RhdHVzXG5cdFx0XHRcdFx0XHRcdGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2Vcblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGUpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2YgYXJncy5jb25maWcgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHR4aHIgPSBhcmdzLmNvbmZpZyh4aHIsIGFyZ3MsIHVybCkgfHwgeGhyXG5cblx0XHRcdFx0Ly8gUHJvcGFnYXRlIHRoZSBgYWJvcnRgIHRvIGFueSByZXBsYWNlbWVudCBYSFIgYXMgd2VsbC5cblx0XHRcdFx0aWYgKHhociAhPT0gb3JpZ2luYWwpIHtcblx0XHRcdFx0XHRyZXBsYWNlZEFib3J0ID0geGhyLmFib3J0XG5cdFx0XHRcdFx0eGhyLmFib3J0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRhYm9ydGVkID0gdHJ1ZVxuXHRcdFx0XHRcdFx0cmVwbGFjZWRBYm9ydC5jYWxsKHRoaXMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChib2R5ID09IG51bGwpIHhoci5zZW5kKClcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBhcmdzLnNlcmlhbGl6ZSA9PT0gXCJmdW5jdGlvblwiKSB4aHIuc2VuZChhcmdzLnNlcmlhbGl6ZShib2R5KSlcblx0XHRcdGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiAkd2luZG93LkZvcm1EYXRhKSB4aHIuc2VuZChib2R5KVxuXHRcdFx0ZWxzZSB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShib2R5KSlcblx0XHR9KSxcblx0XHRqc29ucDogbWFrZVJlcXVlc3QoZnVuY3Rpb24odXJsLCBhcmdzLCByZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciBjYWxsYmFja05hbWUgPSBhcmdzLmNhbGxiYWNrTmFtZSB8fCBcIl9taXRocmlsX1wiICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMWUxNikgKyBcIl9cIiArIGNhbGxiYWNrQ291bnQrK1xuXHRcdFx0dmFyIHNjcmlwdCA9ICR3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxuXHRcdFx0JHdpbmRvd1tjYWxsYmFja05hbWVdID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRkZWxldGUgJHdpbmRvd1tjYWxsYmFja05hbWVdXG5cdFx0XHRcdHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdClcblx0XHRcdFx0cmVzb2x2ZShkYXRhKVxuXHRcdFx0fVxuXHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGVsZXRlICR3aW5kb3dbY2FsbGJhY2tOYW1lXVxuXHRcdFx0XHRzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpXG5cdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJKU09OUCByZXF1ZXN0IGZhaWxlZFwiKSlcblx0XHRcdH1cblx0XHRcdHNjcmlwdC5zcmMgPSB1cmwgKyAodXJsLmluZGV4T2YoXCI/XCIpIDwgMCA/IFwiP1wiIDogXCImXCIpICtcblx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3MuY2FsbGJhY2tLZXkgfHwgXCJjYWxsYmFja1wiKSArIFwiPVwiICtcblx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KGNhbGxiYWNrTmFtZSlcblx0XHRcdCR3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKHNjcmlwdClcblx0XHR9KSxcblx0fVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIG1vdW50UmVkcmF3ID0gcmVxdWlyZShcIi4vbW91bnQtcmVkcmF3XCIpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vYXBpL3JvdXRlclwiKSh3aW5kb3csIG1vdW50UmVkcmF3KVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtaXRocmlsXzEgPSByZXF1aXJlKFwiLi4vbWl0aHJpbFwiKTtcbmNvbnN0IExheW91dGVyXzEgPSByZXF1aXJlKFwiLi9MYXlvdXRlclwiKTtcbmNvbnN0IGhzdXRpbF8xID0gcmVxdWlyZShcImhzdXRpbFwiKTtcbmNvbnN0IGxvZyA9IGhzdXRpbF8xLmxvZygnTGF5b3V0Jyk7XG5jbGFzcyBMYXlvdXQge1xuICAgIGdldENvbXBvbmVudHMobm9kZSkge1xuICAgICAgICByZXR1cm4gIUFycmF5LmlzQXJyYXkobm9kZS5hdHRycy5jb250ZW50KSA/IG5vZGUuYXR0cnMuY29udGVudCA6XG4gICAgICAgICAgICBub2RlLmF0dHJzLmNvbnRlbnQubWFwKChjKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGMuY29tcENsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGMuYXR0cnMucm91dGUgPSBub2RlLmF0dHJzLnJvdXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWl0aHJpbF8xLm0oYy5jb21wQ2xhc3MsIGMuYXR0cnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldENTUyhub2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlLmF0dHJzLmNzcyB8fCAnJztcbiAgICB9XG4gICAgbm9ybWFsaXplQ29udGVudChjb21wb25lbnRzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBbbWl0aHJpbF8xLm0oJy5ocy1sZWFmJywgbWl0aHJpbF8xLm0udHJ1c3QoY29tcG9uZW50cykpXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50cy5tYXAoKGNvbXApID0+IChjb21wIGluc3RhbmNlb2YgTGF5b3V0KSA/IGNvbXAgOiBtaXRocmlsXzEubShMYXlvdXQsIHsgY29udGVudDogY29tcCB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtjb21wb25lbnRzXTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLm5vcm1hbGl6ZUNvbnRlbnQodGhpcy5nZXRDb21wb25lbnRzKG5vZGUpKTtcbiAgICAgICAgbGV0IGNzcyA9IExheW91dGVyXzEuTGF5b3V0ZXIuY3JlYXRlTGF5b3V0KG5vZGUuYXR0cnMsIGNvbnRlbnQpO1xuICAgICAgICBjb25zdCBhdHRycyA9IHtcbiAgICAgICAgICAgIHN0eWxlOiBub2RlLnN0eWxlLFxuICAgICAgICAgICAgcm91dGU6IG5vZGUuYXR0cnMucm91dGUsXG4gICAgICAgICAgICBvbmNsaWNrOiBub2RlLmF0dHJzLm9uY2xpY2tcbiAgICAgICAgfTtcbiAgICAgICAgbm9kZS5hdHRycy5yb3V0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKG5vZGUuYXR0cnMuaHJlZikge1xuICAgICAgICAgICAgbG9nLmluZm8oYGhyZWYgJHtub2RlLmF0dHJzLmhyZWZ9YCk7XG4gICAgICAgICAgICBhdHRycy5ocmVmID0gbm9kZS5hdHRycy5ocmVmO1xuICAgICAgICAgICAgYXR0cnMudGFyZ2V0ID0gYXR0cnMudGFyZ2V0IHx8ICdfYmxhbmsnO1xuICAgICAgICAgICAgYXR0cnMub25jcmVhdGUgPSBtaXRocmlsXzEubS5yb3V0ZS5saW5rO1xuICAgICAgICAgICAgYXR0cnMub251cGRhdGUgPSBtaXRocmlsXzEubS5yb3V0ZS5saW5rO1xuICAgICAgICAgICAgcmV0dXJuIG1pdGhyaWxfMS5tKGBhLmhzLWxheW91dCAke2Nzc30gJHt0aGlzLmdldENTUyhub2RlKX1gLCBhdHRycywgY29udGVudC5tYXAoKGMpID0+IGMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtaXRocmlsXzEubShgLmhzLWxheW91dCAke2Nzc30gJHt0aGlzLmdldENTUyhub2RlKX1gLCBhdHRycywgY29udGVudC5tYXAoKGMpID0+IGMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuTGF5b3V0ID0gTGF5b3V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVEdGNWIzVjBMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwzWnBaWGN2VEdGNWIzVjBMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQmNVTkJMSGREUVVGelF6dEJRVU4wUXl4NVEwRkJjME03UVVGRGRFTXNiVU5CUVhORE8wRkJRVU1zVFVGQlRTeEhRVUZITEVkQlFVY3NXVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8wRkJhVU5zUlN4TlFVRmhMRTFCUVUwN1NVRnZRa3dzWVVGQllTeERRVUZETEVsQlFWVTdVVUZET1VJc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFpRVU16UkN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkxMRVZCUVVVc1JVRkJSVHRuUWtGRE4wSXNTVUZCU1N4RFFVRkRMRU5CUVVNc1UwRkJVeXhGUVVGRk8yOUNRVU5pTEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRPMjlDUVVOcVF5eFBRVUZQTEZkQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1UwRkJVeXhGUVVGRkxFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0cFFrRkRiRU03Y1VKQlFVMDdiMEpCUTBnc1QwRkJUeXhEUVVGRExFTkJRVU03YVVKQlExbzdXVUZEVEN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOWUxFTkJRVU03U1VGUlV5eE5RVUZOTEVOQlFVTXNTVUZCVlR0UlFVTjJRaXhQUVVGUExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4SlFVRkpMRVZCUVVVc1EwRkJRenRKUVVOb1F5eERRVUZETzBsQlVVOHNaMEpCUVdkQ0xFTkJRVU1zVlVGQk5rTTdVVUZEYkVVc1NVRkJTU3hQUVVGUExGVkJRVlVzUzBGQlN5eFJRVUZSTEVWQlFVVTdXVUZEYUVNc1QwRkJUeXhEUVVGRExGZEJRVU1zUTBGQlF5eFZRVUZWTEVWQlFVVXNWMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVMEZETDBNN1VVRkRSQ3hKUVVGSkxGVkJRVlVzUTBGQlF5eE5RVUZOTEVkQlFVTXNRMEZCUXl4RlFVRkZPMWxCUTNKQ0xFOUJRVThzVlVGQlZTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVhsQ0xFVkJRVkVzUlVGQlJTeERRVU5zUkN4RFFVRkRMRWxCUVVrc1dVRkJXU3hOUVVGTkxFTkJRVU1zUTBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhYUVVGRExFTkJRVU1zVFVGQlRTeEZRVUZGTEVWQlFVTXNUMEZCVHl4RlFVRkRMRWxCUVVrc1JVRkJReXhEUVVGRExFTkJRMnBGTEVOQlFVTTdVMEZEVER0UlFVVkVMRTlCUVU4c1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF6dEpRVU40UWl4RFFVRkRPMGxCY1VKRUxFbEJRVWtzUTBGQlF5eEpRVUZWTzFGQlExZ3NUVUZCVFN4UFFVRlBMRWRCUVVjc1NVRkJTU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRWxCUVVrc1EwRkJReXhoUVVGaExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTm9SU3hKUVVGSkxFZEJRVWNzUjBGQlJ5eHRRa0ZCVVN4RFFVRkRMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRPMUZCUTNKRUxFMUJRVTBzUzBGQlN5eEhRVUZQTzFsQlEyUXNTMEZCU3l4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTE8xbEJRMnBDTEV0QlFVc3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXM3V1VGRGRrSXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR6dFRRVU01UWl4RFFVRkRPMUZCUTBZc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVkQlFVY3NVMEZCVXl4RFFVRkRPMUZCUXpkQ0xFbEJRVWtzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRVZCUVVVN1dVRkRha0lzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTndReXhMUVVGTExFTkJRVU1zU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRE8xbEJRemRDTEV0QlFVc3NRMEZCUXl4TlFVRk5MRWRCUVVjc1MwRkJTeXhEUVVGRExFMUJRVTBzU1VGQlNTeFJRVUZSTEVOQlFVTTdXVUZEZUVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUjBGQlJ5eFhRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJRenRaUVVNNVFpeExRVUZMTEVOQlFVTXNVVUZCVVN4SFFVRkhMRmRCUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETzFsQlJUbENMRTlCUVU4c1YwRkJReXhEUVVGRExHVkJRV1VzUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVXNzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVONlJqdGhRVUZOTzFsQlEwZ3NUMEZCVHl4WFFVRkRMRU5CUVVNc1kwRkJZeXhIUVVGSExFbEJRVWtzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJTeXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMU5CUTNoR08wbEJRMHdzUTBGQlF6dERRVU5LTzBGQmNrZEVMSGRDUVhGSFF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFRva2Vuc18xID0gcmVxdWlyZShcIi4vVG9rZW5zXCIpO1xuY2xhc3MgTGF5b3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZWFEZXNjKSB7XG4gICAgICAgIHRoaXMuYXJlYURlc2MgPSBhcmVhRGVzYztcbiAgICAgICAgdGhpcy5zcGFjaW5nID0gMDtcbiAgICB9XG4gICAgc3RhdGljIHRyYW5zbGF0ZShwYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKCcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zLm1hcCgocGFyYW0pID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtLmVuZHNXaXRoKCdweCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUb2tlbnNfMS5weChwYXJzZUludChwYXJhbSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGFyYW0uZW5kc1dpdGgoJyUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVG9rZW5zXzEucGMocGFyc2VJbnQocGFyYW0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtLnRvTG93ZXJDYXNlKCkgPT09ICdmaWxsJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVG9rZW5zXzEuRklMTDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgcmVnaXN0ZXIoa2V5d29yZCwgc3R5bGUpIHtcbiAgICAgICAgTGF5b3V0ZXIubGF5b3V0U3R5bGVzW2tleXdvcmRdID0gc3R5bGU7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGVMYXlvdXQoYXR0cnMsIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNzcyA9ICcnO1xuICAgICAgICBPYmplY3Qua2V5cyhMYXlvdXRlci5sYXlvdXRTdHlsZXMpLnNvbWUoa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChhdHRyc1trZXldKSB7XG4gICAgICAgICAgICAgICAgY3NzID0gbmV3IExheW91dGVyLmxheW91dFN0eWxlc1trZXldKExheW91dGVyLnRyYW5zbGF0ZShhdHRyc1trZXldKSkuZ2V0U3R5bGVzKGNvbXBvbmVudHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNzcztcbiAgICB9XG59XG5leHBvcnRzLkxheW91dGVyID0gTGF5b3V0ZXI7XG5MYXlvdXRlci5sYXlvdXRTdHlsZXMgPSB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVRHRjViM1YwWlhJdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12ZG1sbGR5OU1ZWGx2ZFhSbGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVZsQkxIRkRRVUYzUXp0QlFYTkNlRU1zVFVGQmMwSXNVVUZCVVR0SlFYbEZNVUlzV1VGQmJVSXNVVUZCYzBJN1VVRkJkRUlzWVVGQlVTeEhRVUZTTEZGQlFWRXNRMEZCWXp0UlFWSjZReXhaUVVGUExFZEJRVWNzUTBGQlF5eERRVUZETzBsQlVXZERMRU5CUVVNN1NVRjZSSEpETEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1RVRkJkMEk3VVVGRE4wTXNTVUZCU1N4TlFVRk5MRU5CUVVNc1RVRkJUU3hMUVVGTExFTkJRVU1zUlVGQlJUdFpRVUZGTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03VTBGQlJUdFJRVU0zUXl4UFFVRlBMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eExRVUZuUWl4RlFVRkZMRVZCUVVVN1dVRkRia01zU1VGQlNTeFBRVUZQTEV0QlFVc3NTMEZCU3l4UlFVRlJMRVZCUVVVN1owSkJRek5DTEVsQlFVa3NTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJUdHZRa0ZCUlN4UFFVRlBMRmRCUVVVc1EwRkJReXhSUVVGUkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0cFFrRkJSVHRuUWtGRGVrUXNTVUZCU1N4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTzI5Q1FVRkZMRTlCUVU4c1YwRkJSU3hEUVVGRExGRkJRVkVzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmxDUVVGRk8yZENRVU40UkN4SlFVRkpMRXRCUVVzc1EwRkJReXhYUVVGWExFVkJRVVVzUzBGQlJ5eE5RVUZOTEVWQlFVVTdiMEpCUVVVc1QwRkJUeXhoUVVGSkxFTkJRVU03YVVKQlFVTTdZVUZEY0VRN2FVSkJRVTA3WjBKQlEwZ3NUMEZCVHl4TFFVRkxMRU5CUVVNN1lVRkRhRUk3VVVGRFRDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNN1NVRlhUU3hOUVVGTkxFTkJRVU1zVVVGQlVTeERRVUZETEU5QlFXTXNSVUZCUlN4TFFVRnhRanRSUVVWNFJDeFJRVUZSTEVOQlFVTXNXVUZCV1N4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFdEJRVXNzUTBGQlF6dEpRVU16UXl4RFFVRkRPMGxCVlUwc1RVRkJUU3hEUVVGRExGbEJRVmtzUTBGQlF5eExRVUZUTEVWQlFVVXNWVUZCZFVJN1VVRkRla1FzU1VGQlNTeEhRVUZITEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUTJJc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTzFsQlF6RkRMRWxCUVVrc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTzJkQ1FVTmFMRWRCUVVjc1IwRkJSeXhKUVVGSkxGRkJRVkVzUTBGQlF5eFpRVUZaTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1VVRkJVU3hEUVVGRExGTkJRVk1zUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExGTkJRVk1zUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0blFrRkZNMFlzVDBGQlR5eEpRVUZKTEVOQlFVTTdZVUZEWmp0WlFVTkVMRTlCUVU4c1MwRkJTeXhEUVVGRE8xRkJRMnBDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1QwRkJUeXhIUVVGSExFTkJRVU03U1VGRFppeERRVUZET3p0QlFUbEVUQ3cwUWtFd1JrTTdRVUZ5UmxVc2NVSkJRVmtzUjBGQmRVSXNSVUZCUlN4RFFVRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBMYXlvdXRlcl8xID0gcmVxdWlyZShcIi4vTGF5b3V0ZXJcIik7XG5jb25zdCBUb2tlbnNfMSA9IHJlcXVpcmUoXCIuL1Rva2Vuc1wiKTtcbmV4cG9ydHMuUGlsbGFyTGF5b3V0cyA9IFtcbiAgICAnY29sdW1ucycsICdyb3dzJ1xuXTtcbmNvbnN0IGNQYXJhbXMgPSB7XG4gICAgY29sdW1uczoge1xuICAgICAgICBjc3NDbGFzczogJy5ocy1jb2x1bW4tbGF5b3V0JyxcbiAgICAgICAgZmllbGRzOiBbJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcsICdoZWlnaHQnLCAnd2lkdGgnXVxuICAgIH0sXG4gICAgcm93czoge1xuICAgICAgICBjc3NDbGFzczogJy5ocy1yb3ctbGF5b3V0JyxcbiAgICAgICAgZmllbGRzOiBbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ2JvdHRvbScsICd3aWR0aCcsICdoZWlnaHQnXVxuICAgIH1cbn07XG5jbGFzcyBQaWxsYXJMYXlvdXRlciBleHRlbmRzIExheW91dGVyXzEuTGF5b3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcywgYXJlYURlc2MpIHtcbiAgICAgICAgc3VwZXIoYXJlYURlc2MpO1xuICAgICAgICB0aGlzLmFyZWFEZXNjID0gYXJlYURlc2M7XG4gICAgICAgIHRoaXMuZmllbGRzID0gcGFyYW1zLmZpZWxkcztcbiAgICAgICAgdGhpcy5jc3NDbGFzcyA9IHBhcmFtcy5jc3NDbGFzcztcbiAgICAgICAgbGV0IG4gPSBhcmVhRGVzYy5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgZmlyc3QgPSAwO1xuICAgICAgICBsZXQgbGFzdCA9IDA7XG4gICAgICAgIHRoaXMudW5pdCA9IGFyZWFEZXNjLnNvbWUoKGFyZWEpID0+IChhcmVhIGluc3RhbmNlb2YgVG9rZW5zXzEuUGl4ZWxUb2tlbikpID9cbiAgICAgICAgICAgIHRoaXMudW5pdFBpeGVsIDogdGhpcy51bml0UGVyY2VudDtcbiAgICAgICAgYXJlYURlc2Muc29tZSgoYXJlYSwgaSkgPT4gKChhcmVhRGVzY1tpXSBpbnN0YW5jZW9mIFRva2Vuc18xLkRlZmluZWRUb2tlbikgPyArK2ZpcnN0IDwgMCA6IHRydWUpKTtcbiAgICAgICAgYXJlYURlc2Muc29tZSgoYXJlYSwgaSkgPT4gKChhcmVhRGVzY1tuIC0gaV0gaW5zdGFuY2VvZiBUb2tlbnNfMS5EZWZpbmVkVG9rZW4pID8gKytsYXN0IDwgMCA6IHRydWUpKTtcbiAgICAgICAgdGhpcy5maXJzdEZpeGVkID0gZmlyc3Q7XG4gICAgICAgIHRoaXMubGFzdEZpeGVkID0gTWF0aC5taW4obGFzdCwgYXJlYURlc2MubGVuZ3RoIC0gZmlyc3QpO1xuICAgIH1cbiAgICBnZXRTaXplcyhudW0pIHtcbiAgICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLmZpcnN0Rml4ZWQ7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmxhc3RGaXhlZDtcbiAgICAgICAgY29uc3QgZGVzYyA9IHRoaXMuYXJlYURlc2M7XG4gICAgICAgIGNvbnN0IGxlbiA9IGRlc2MubGVuZ3RoO1xuICAgICAgICByZXR1cm4gWy4uLkFycmF5KG51bSkua2V5cygpXS5tYXAoKGkpID0+IHtcbiAgICAgICAgICAgIGxldCBzaXplID0gbnVsbDtcbiAgICAgICAgICAgIGxldCB0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChpID4gbnVtIC0gMSAtIGxhc3QpIHtcbiAgICAgICAgICAgICAgICBzaXplID0gZGVzY1tsZW4gLSAobnVtIC0gaSldLmdldFNpemUoKTtcbiAgICAgICAgICAgICAgICB0ID0gJ2VuZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpIDwgZmlyc3QpIHtcbiAgICAgICAgICAgICAgICBzaXplID0gZGVzY1tpXS5nZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgdCA9ICdzdGFydCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsZW4gPiAwICYmIGxlbiA9PT0gZmlyc3QpIHtcbiAgICAgICAgICAgICAgICBzaXplID0gZGVzY1tsZW4gLSAxXS5nZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgdCA9ICdzdGFydCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBzaXplOiBzaXplLCBjb2RlOiB0LCBmaWVsZHM6IHt9IH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1bml0UGVyY2VudChudW0pIHtcbiAgICAgICAgbGV0IGYgPSB0aGlzLmZpZWxkcztcbiAgICAgICAgbGV0IG1heCA9IDEwMC4wO1xuICAgICAgICBsZXQgc3R5bGVzID0gdGhpcy5nZXRTaXplcyhudW0pO1xuICAgICAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7IGlmIChzdHlsZS5zaXplKSB7XG4gICAgICAgICAgICBtYXggPSBtYXggLSBzdHlsZS5zaXplO1xuICAgICAgICAgICAgbnVtLS07XG4gICAgICAgIH0gfSk7XG4gICAgICAgIGxldCBkZWZEaW0gPSBtYXggLyBudW07XG4gICAgICAgIGZ1bmN0aW9uIHBhc3Moc3R5bGVzLCBpeDAsIGl4MSwgYnJlYWtDb25kKSB7XG4gICAgICAgICAgICBsZXQgc3VtRGltID0gMDtcbiAgICAgICAgICAgIHN0eWxlcy5zb21lKHN0eWxlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IHN0eWxlLnNpemUgfHwgZGVmRGltO1xuICAgICAgICAgICAgICAgIGlmIChicmVha0NvbmQoc3R5bGUuY29kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tpeDBdID0gc3VtRGltICsgJyUnO1xuICAgICAgICAgICAgICAgIHN1bURpbSArPSBzaXplO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tpeDFdID0gKDEwMCAtIHN1bURpbSkgKyAnJSc7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbNV1dID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHBhc3Moc3R5bGVzLCBmWzJdLCBmWzNdLCAoZSkgPT4gZSA9PT0gJ2VuZCcpO1xuICAgICAgICBwYXNzKHN0eWxlcy5yZXZlcnNlKCksIGZbM10sIGZbMl0sIChlKSA9PiBlICE9PSAnZW5kJyk7XG4gICAgICAgIHJldHVybiBzdHlsZXMucmV2ZXJzZSgpO1xuICAgIH1cbiAgICB1bml0UGl4ZWwobnVtKSB7XG4gICAgICAgIGxldCBzdHlsZXMgPSB0aGlzLmdldFNpemVzKG51bSk7XG4gICAgICAgIGxldCBmID0gdGhpcy5maWVsZHM7XG4gICAgICAgIGxldCBkZWZEaW0gPSAxMDAuMCAvIG51bTtcbiAgICAgICAgbGV0IHN1bURpbSA9IDA7XG4gICAgICAgIHN0eWxlcy5zb21lKChzdHlsZSwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0eWxlLmNvZGUgPT09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZlsyXV0gPSBzdW1EaW0gKyAncHgnO1xuICAgICAgICAgICAgICAgIHN1bURpbSArPSBzdHlsZS5zaXplICsgKHRoaXMuc3BhY2luZyB8fCAwKSArICh0aGlzLnNwYWNpbmcgfHwgMCk7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbM11dID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzVdXSA9IHN0eWxlLnNpemUgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3R5bGUuY29kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzJdXSA9IChzdW1EaW0gPiAwKSA/IChzdW1EaW0gKyAncHgnKSA6IChpICogZGVmRGltICsgJyUnKTtcbiAgICAgICAgICAgICAgICBzdW1EaW0gPSAtMTtcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZlszXV0gPSAoMTAwIC0gKGkgKyAxKSAqIGRlZkRpbSkgKyAnJSc7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbNV1dID0gJ2F1dG8nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3R5bGUuY29kZSA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1bURpbSA9IDA7XG4gICAgICAgIHN0eWxlcy5zbGljZSgpLnJldmVyc2UoKS5zb21lKChzdHlsZSwgaSkgPT4ge1xuICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbM11dID0gc3VtRGltICsgJ3B4JztcbiAgICAgICAgICAgIGlmIChzdHlsZS5jb2RlID09PSAnZW5kJykge1xuICAgICAgICAgICAgICAgIHN1bURpbSArPSBzdHlsZS5zaXplICsgKHRoaXMuc3BhY2luZyB8fCAwKSArICh0aGlzLnNwYWNpbmcgfHwgMCk7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbMl1dID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzVdXSA9IHN0eWxlLnNpemUgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1bURpbSA+IDAgJiYgc3R5bGUuY29kZSAhPT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZls1XV0gPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICB9XG4gICAgZ2V0U3R5bGVzKGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGYgPSB0aGlzLmZpZWxkcztcbiAgICAgICAgbGV0IHN0eWxlcyA9IHRoaXMudW5pdChjb21wb25lbnRzLmxlbmd0aCk7XG4gICAgICAgIGNvbXBvbmVudHMubWFwKChjLCBpKSA9PiB7XG4gICAgICAgICAgICBjLnN0eWxlID0gYCR7ZlswXX06MCU7ICR7ZlsxXX06MCU7IGA7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzdHlsZXNbaV0uZmllbGRzKS5mb3JFYWNoKChzdCkgPT4geyBjLnN0eWxlICs9IGAke3N0fTogJHtzdHlsZXNbaV0uZmllbGRzW3N0XX07YDsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5jc3NDbGFzcztcbiAgICB9XG59XG5jbGFzcyBDb2x1bW5zIGV4dGVuZHMgUGlsbGFyTGF5b3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZWFEZXNjKSB7XG4gICAgICAgIHN1cGVyKGNQYXJhbXNbZXhwb3J0cy5QaWxsYXJMYXlvdXRzWzBdXSwgYXJlYURlc2MpO1xuICAgICAgICB0aGlzLmFyZWFEZXNjID0gYXJlYURlc2M7XG4gICAgfVxufVxuY2xhc3MgUm93cyBleHRlbmRzIFBpbGxhckxheW91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihhcmVhRGVzYykge1xuICAgICAgICBzdXBlcihjUGFyYW1zW2V4cG9ydHMuUGlsbGFyTGF5b3V0c1sxXV0sIGFyZWFEZXNjKTtcbiAgICAgICAgdGhpcy5hcmVhRGVzYyA9IGFyZWFEZXNjO1xuICAgIH1cbn1cbkxheW91dGVyXzEuTGF5b3V0ZXIucmVnaXN0ZXIoZXhwb3J0cy5QaWxsYXJMYXlvdXRzWzBdLCBDb2x1bW5zKTtcbkxheW91dGVyXzEuTGF5b3V0ZXIucmVnaXN0ZXIoZXhwb3J0cy5QaWxsYXJMYXlvdXRzWzFdLCBSb3dzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVVHbHNiR0Z5WldSTVlYbHZkWFJsY2k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUwzTnlZeTkyYVdWM0wxQnBiR3hoY21Wa1RHRjViM1YwWlhJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUV5UTBFc2VVTkJRVEJETzBGQlF6RkRMSEZEUVVWM1F6dEJRV2RDTTBJc1VVRkJRU3hoUVVGaExFZEJRVWM3U1VGRGVrSXNVMEZCVXl4RlFVRkZMRTFCUVUwN1EwRkRjRUlzUTBGQlF6dEJRVXRHTEUxQlFVMHNUMEZCVHl4SFFVRkhPMGxCUTFvc1QwRkJUeXhGUVVGblFqdFJRVU51UWl4UlFVRlJMRVZCUVVVc2JVSkJRVzFDTzFGQlF6ZENMRTFCUVUwc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeFJRVUZSTEVWQlFVVXNUVUZCVFN4RlFVRkZMRTlCUVU4c1JVRkJSU3hSUVVGUkxFVkJRVVVzVDBGQlR5eERRVUZETzB0QlEyaEZPMGxCUTBRc1NVRkJTU3hGUVVGblFqdFJRVU5vUWl4UlFVRlJMRVZCUVVVc1owSkJRV2RDTzFGQlF6RkNMRTFCUVUwc1JVRkJSU3hEUVVGRExFMUJRVTBzUlVGQlJTeFBRVUZQTEVWQlFVVXNTMEZCU3l4RlFVRkZMRkZCUVZFc1JVRkJSU3hQUVVGUExFVkJRVVVzVVVGQlVTeERRVUZETzB0QlEyaEZPME5CUTBvc1EwRkJRenRCUVU5R0xFMUJRV1VzWTBGQlpTeFRRVUZSTEcxQ1FVRlJPMGxCWVRGRExGbEJRVmtzVFVGQmJVSXNSVUZCVXl4UlFVRnpRanRSUVVNeFJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkViMElzWVVGQlVTeEhRVUZTTEZGQlFWRXNRMEZCWXp0UlFVVXhSQ3hKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNN1VVRkROVUlzU1VGQlNTeERRVUZETEZGQlFWRXNSMEZCUnl4TlFVRk5MRU5CUVVNc1VVRkJVU3hEUVVGRE8xRkJSV2hETEVsQlFVa3NRMEZCUXl4SFFVRkhMRkZCUVZFc1EwRkJReXhOUVVGTkxFZEJRVU1zUTBGQlF5eERRVUZETzFGQlF6RkNMRWxCUVVrc1MwRkJTeXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU5rTEVsQlFVa3NTVUZCU1N4SFFVRkpMRU5CUVVNc1EwRkJRenRSUVVWa0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFbEJRV2RDTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNc1NVRkJTU3haUVVGWkxHMUNRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkJMRU5CUVVNN1dVRkRNVVVzU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF6dFJRVWQwUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlowSXNSVUZCUlN4RFFVRlJMRVZCUVVVc1JVRkJSU3hEUVVONlF5eERRVUZETEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJReXhaUVVGakxIRkNRVUZaTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1JVRkJSU3hMUVVGTExFZEJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJSMnBGTEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGblFpeEZRVUZGTEVOQlFWRXNSVUZCUlN4RlFVRkZMRU5CUTNwRExFTkJRVU1zUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4SFFVRkRMRU5CUVVNc1EwRkJReXhaUVVGWkxIRkNRVUZaTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFZEJRVU1zUTBGQlF5eERRVUZGTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJSV3BGTEVsQlFVa3NRMEZCUXl4VlFVRlZMRWRCUVVjc1MwRkJTeXhEUVVGRE8xRkJRM2hDTEVsQlFVa3NRMEZCUXl4VFFVRlRMRWRCUVVrc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RFFVRkRMRTFCUVUwc1IwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEpRVU0xUkN4RFFVRkRPMGxCVTA4c1VVRkJVU3hEUVVGRExFZEJRVlU3VVVGRGRrSXNUVUZCVFN4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU01UWl4TlFVRk5MRWxCUVVrc1IwRkJTU3hKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETzFGQlF6ZENMRTFCUVUwc1NVRkJTU3hIUVVGSkxFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTTdVVUZETlVJc1RVRkJUU3hIUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXp0UlFVVjRRaXhQUVVGUExFTkJRVU1zUjBGQlJ5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRlJMRVZCUVVVc1JVRkJSVHRaUVVNelF5eEpRVUZKTEVsQlFVa3NSMEZCVlN4SlFVRkpMRU5CUVVNN1dVRkRka0lzU1VGQlNTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRPMWxCUTJJc1NVRkJTU3hEUVVGRExFZEJRVWNzUjBGQlJ5eEhRVUZETEVOQlFVTXNSMEZCUXl4SlFVRkpMRVZCUVVjN1owSkJRVVVzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4SFFVRkhMRWRCUVVjc1EwRkJReXhIUVVGSExFZEJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJRenRuUWtGQlF5eERRVUZETEVkQlFVY3NTMEZCU3l4RFFVRkRPMkZCUVVVN2FVSkJRM0JGTEVsQlFVa3NRMEZCUXl4SFFVRkhMRXRCUVVzc1JVRkJSenRuUWtGQlJTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETzJkQ1FVRkRMRU5CUVVNc1IwRkJSeXhQUVVGUExFTkJRVU03WVVGQlJUdHBRa0ZETVVRc1NVRkJTU3hIUVVGSExFZEJRVU1zUTBGQlF5eEpRVUZKTEVkQlFVY3NTMEZCUnl4TFFVRkxMRVZCUVVNN1owSkJRVVVzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4SFFVRkhMRWRCUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdaMEpCUVVNc1EwRkJReXhIUVVGSExFOUJRVThzUTBGQlF6dGhRVUZGTzFsQlF6VkZMRTlCUVU4c1JVRkJReXhKUVVGSkxFVkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NSVUZCUXl4RFFVRkRMRVZCUVVVc1RVRkJUU3hGUVVGRExFVkJRVVVzUlVGQlF5eERRVUZETzFGQlF6RkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF6dEpRVVZQTEZkQlFWY3NRMEZCUXl4SFFVRlZPMUZCUXpGQ0xFbEJRVWtzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNN1VVRkRjRUlzU1VGQlNTeEhRVUZITEVkQlFVY3NTMEZCU3l4RFFVRkRPMUZCUTJoQ0xFbEJRVWtzVFVGQlRTeEhRVUZuUWl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFGQlJUZERMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVVXNSMEZCUnl4SlFVRkpMRXRCUVVzc1EwRkJReXhKUVVGSkxFVkJRVVU3V1VGQlJTeEhRVUZITEVkQlFVY3NSMEZCUnl4SFFVRkhMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU03V1VGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0VFFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGFFWXNTVUZCU1N4TlFVRk5MRWRCUVVjc1IwRkJSeXhIUVVGSExFZEJRVWNzUTBGQlF6dFJRVVYyUWl4VFFVRlRMRWxCUVVrc1EwRkJReXhOUVVGdFFpeEZRVUZGTEVkQlFWVXNSVUZCUlN4SFFVRlZMRVZCUVVVc1UwRkJaME03V1VGRGRrWXNTVUZCU1N4TlFVRk5MRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRMllzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1JVRkJSVHRuUWtGRGFFSXNTVUZCU1N4SlFVRkpMRWRCUVVjc1MwRkJTeXhEUVVGRExFbEJRVWtzU1VGQlNTeE5RVUZOTEVOQlFVTTdaMEpCUTJoRExFbEJRVWtzVTBGQlV5eERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSVHR2UWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXp0cFFrRkJSVHRuUWtGRE0wTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eE5RVUZOTEVkQlFVTXNSMEZCUnl4RFFVRkRPMmRDUVVNdlFpeE5RVUZOTEVsQlFVa3NTVUZCU1N4RFFVRkRPMmRDUVVObUxFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFZEJRVU1zVFVGQlRTeERRVUZETEVkQlFVTXNSMEZCUnl4RFFVRkRPMmRDUVVOeVF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEUxQlFVMHNRMEZCUXp0blFrRkROVUlzVDBGQlR5eExRVUZMTEVOQlFVTTdXVUZEYWtJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETzFGQlJVUXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlVTeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRXRCUVVjc1MwRkJTeXhEUVVGRExFTkJRVU03VVVGRGJFUXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCVVN4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVWNzUzBGQlN5eERRVUZETEVOQlFVTTdVVUZETlVRc1QwRkJUeXhOUVVGTkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdTVUZETlVJc1EwRkJRenRKUVVWUExGTkJRVk1zUTBGQlF5eEhRVUZWTzFGQlEzaENMRWxCUVVrc1RVRkJUU3hIUVVGblFpeEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJRemRETEVsQlFVa3NRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU03VVVGRmNFSXNTVUZCU1N4TlFVRk5MRWRCUVVjc1MwRkJTeXhIUVVGRExFZEJRVWNzUTBGQlF6dFJRVWQyUWl4SlFVRkpMRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVU03VVVGRFppeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTzFsQlEzSkNMRWxCUVVrc1MwRkJTeXhEUVVGRExFbEJRVWtzUzBGQlJ5eFBRVUZQTEVWQlFVVTdaMEpCUTNSQ0xFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzVFVGQlRTeEhRVUZGTEVsQlFVa3NRMEZCUXp0blFrRkRiRU1zVFVGQlRTeEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRha1VzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTTdaMEpCUXpWQ0xFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUzBGQlN5eERRVUZETEVsQlFVa3NSMEZCUlN4SlFVRkpMRU5CUVVNN1lVRkRla003YVVKQlFVMHNTVUZCU1N4TFFVRkxMRU5CUVVNc1NVRkJTU3hMUVVGTExFbEJRVWtzUlVGQlJUdG5Ra0ZETlVJc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFMUJRVTBzUjBGQlF5eERRVUZETEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1EwRkJReXhOUVVGTkxFZEJRVVVzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGRExFMUJRVTBzUjBGQlJ5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRia1VzVFVGQlRTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOYUxFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVkQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVNc1EwRkJReXhEUVVGRExFZEJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NSMEZCUnl4RFFVRkRPMmRDUVVNNVF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEUxQlFVMHNRMEZCUXp0aFFVTXZRanRwUWtGQlRTeEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRXRCUVVjc1MwRkJTeXhGUVVGRk8yZENRVU16UWl4UFFVRlBMRWxCUVVrc1EwRkJRenRoUVVObU8xbEJRMFFzVDBGQlR5eExRVUZMTEVOQlFVTTdVVUZEYWtJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGSFNDeE5RVUZOTEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUTFnc1RVRkJUU3hEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEVWQlFVVXNSVUZCUlR0WlFVTjJReXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTTdXVUZEYmtNc1NVRkJTU3hMUVVGTExFTkJRVU1zU1VGQlNTeExRVUZMTEV0QlFVc3NSVUZCUlR0blFrRkRkRUlzVFVGQlRTeEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRha1VzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTTdaMEpCUXpWQ0xFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUzBGQlN5eERRVUZETEVsQlFVa3NSMEZCUXl4SlFVRkpMRU5CUVVNN1lVRkRlRU03YVVKQlFVMDdaMEpCUTBnc1NVRkJTU3hOUVVGTkxFZEJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRXRCUVVzc1QwRkJUeXhGUVVGRk8yOUNRVU53UXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJRenRwUWtGREwwSTdaMEpCUTBRc1QwRkJUeXhKUVVGSkxFTkJRVU03WVVGRFpqdFpRVU5FTEU5QlFVOHNTMEZCU3l4RFFVRkRPMUZCUTJwQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NUMEZCVHl4TlFVRk5MRU5CUVVNN1NVRkRiRUlzUTBGQlF6dEpRVkZUTEZOQlFWTXNRMEZCUXl4VlFVRTRRanRSUVVNNVF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRE8xRkJRM0JDTEVsQlFVa3NUVUZCVFN4SFFVRm5RaXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRSUVVOMlJDeFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJZeXhGUVVGRkxFTkJRVkVzUlVGQlJTeEZRVUZGTzFsQlEzaERMRU5CUVVNc1EwRkJReXhMUVVGTExFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZQTEVOQlFVTTdXVUZEY2tNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNSVUZCVXl4RlFVRkZMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU1zUzBGQlN5eEpRVUZKTEVkQlFVY3NSVUZCUlN4TFFVRkxMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlF6VkhMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzVDBGQlR5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRPMGxCUTNwQ0xFTkJRVU03UTBGRFNqdEJRVEpFUkN4TlFVRk5MRTlCUVZFc1UwRkJVU3hqUVVGak8wbEJRMmhETEZsQlFXMUNMRkZCUVhOQ08xRkJRVWtzUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4eFFrRkJZU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkJja1VzWVVGQlVTeEhRVUZTTEZGQlFWRXNRMEZCWXp0SlFVRnBSQ3hEUVVGRE8wTkJRemxHTzBGQk1rUkVMRTFCUVUwc1NVRkJTeXhUUVVGUkxHTkJRV003U1VGRE4wSXNXVUZCYlVJc1VVRkJjMEk3VVVGQlNTeExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMSEZDUVVGaExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4UlFVRlJMRU5CUVVNc1EwRkJRenRSUVVGeVJTeGhRVUZSTEVkQlFWSXNVVUZCVVN4RFFVRmpPMGxCUVdsRUxFTkJRVU03UTBGRE9VWTdRVUZGUkN4dFFrRkJVU3hEUVVGRExGRkJRVkVzUTBGQlF5eHhRa0ZCWVN4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETzBGQlF6ZERMRzFDUVVGUkxFTkJRVU1zVVVGQlVTeERRVUZETEhGQ1FVRmhMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVXNzU1VGQlNTeERRVUZETEVOQlFVTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBMYXlvdXRlcl8xID0gcmVxdWlyZShcIi4vTGF5b3V0ZXJcIik7XG5jb25zdCBUb2tlbnNfMSA9IHJlcXVpcmUoXCIuL1Rva2Vuc1wiKTtcbmNsYXNzIFRpbGVMYXlvdXRlciBleHRlbmRzIExheW91dGVyXzEuTGF5b3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZWFEZXNjKSB7XG4gICAgICAgIHN1cGVyKGFyZWFEZXNjKTtcbiAgICAgICAgdGhpcy5hcmVhRGVzYyA9IGFyZWFEZXNjO1xuICAgICAgICB0aGlzLnVuaXQgPSBhcmVhRGVzYy5zb21lKChhcmVhKSA9PiAoYXJlYSBpbnN0YW5jZW9mIFRva2Vuc18xLlBpeGVsVG9rZW4pKSA/XG4gICAgICAgICAgICB0aGlzLnVuaXRQaXhlbCA6IHRoaXMudW5pdFBlcmNlbnQ7XG4gICAgfVxuICAgIHVuaXRQZXJjZW50KG51bSkge1xuICAgICAgICBjb25zdCBkZXNjID0gdGhpcy5hcmVhRGVzYztcbiAgICAgICAgY29uc3QgZmlsbCA9IHRoaXMuYXJlYURlc2Muc29tZShhID0+IChhIGluc3RhbmNlb2YgVG9rZW5zXzEuRmlsbFRva2VuKSk7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBNYXRoLnNxcnQobnVtKTtcbiAgICAgICAgY29uc3Qgcm93cyA9IE1hdGgucm91bmQocm9vdCk7XG4gICAgICAgIGxldCBjb2xzID0gTWF0aC5mbG9vcihyb290KTtcbiAgICAgICAgaWYgKHJvb3QgPiBjb2xzKSB7XG4gICAgICAgICAgICBjb2xzKys7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdpZHRoID0gKGRlc2NbMF0gaW5zdGFuY2VvZiBUb2tlbnNfMS5EZWZpbmVkVG9rZW4pID8gZGVzY1swXS5nZXRTaXplKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBoZWlnaHQgPSAoZGVzY1sxXSBpbnN0YW5jZW9mIFRva2Vuc18xLkRlZmluZWRUb2tlbikgPyBkZXNjWzFdLmdldFNpemUoKSA6IHdpZHRoO1xuICAgICAgICB3aWR0aCA9IHdpZHRoIHx8IDEwMCAvIGNvbHM7XG4gICAgICAgIGhlaWdodCA9IGhlaWdodCB8fCAxMDAgLyByb3dzO1xuICAgICAgICBsZXQgbGVmdCA9IDA7XG4gICAgICAgIGxldCB0b3AgPSAwO1xuICAgICAgICBsZXQgc3R5bGVzID0gWy4uLkFycmF5KG51bSkua2V5cygpXS5tYXAoaSA9PiB7XG4gICAgICAgICAgICBsZXQgciA9ICdhdXRvJztcbiAgICAgICAgICAgIGxldCB3ID0gd2lkdGggKyAnJSc7XG4gICAgICAgICAgICBsZXQgYiA9ICdhdXRvJztcbiAgICAgICAgICAgIGxldCBoID0gaGVpZ2h0ICsgJyUnO1xuICAgICAgICAgICAgaWYgKChsZWZ0ICsgMiAqIHdpZHRoKSA+IDEwMCAmJiBmaWxsKSB7XG4gICAgICAgICAgICAgICAgciA9ICcwJSc7XG4gICAgICAgICAgICAgICAgdyA9ICdhdXRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodG9wICsgMiAqIGhlaWdodCkgPiAxMDAgJiYgZmlsbCkge1xuICAgICAgICAgICAgICAgIGIgPSAnMCUnO1xuICAgICAgICAgICAgICAgIGggPSAnYXV0byc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGBcbiAgICAgICAgICAgICAgICB0b3A6ICR7TWF0aC5mbG9vcih0b3ApfSU7IGJvdHRvbToke2J9O1xuICAgICAgICAgICAgICAgIGxlZnQ6ICR7bGVmdH0lOyAgICAgICAgICAgcmlnaHQ6JHtyfTtcbiAgICAgICAgICAgICAgICB3aWR0aDogJHt3fTsgICAgICAgICAgICAgIGhlaWdodDogJHtofTtcbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICBpZiAoTWF0aC5yb3VuZChsZWZ0ICs9IHdpZHRoKSA+IDEwMCAtIE1hdGguZmxvb3Iod2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgdG9wICs9IGhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICAgIHVuaXRQaXhlbChudW0pIHtcbiAgICAgICAgY29uc3QgZGVzYyA9IHRoaXMuYXJlYURlc2M7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBNYXRoLnNxcnQobnVtKTtcbiAgICAgICAgY29uc3Qgcm93cyA9IE1hdGgucm91bmQocm9vdCk7XG4gICAgICAgIGxldCBjb2xzID0gTWF0aC5mbG9vcihyb290KTtcbiAgICAgICAgaWYgKHJvb3QgPiBjb2xzKSB7XG4gICAgICAgICAgICBjb2xzKys7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdpZHRoID0gKGRlc2NbMF0gaW5zdGFuY2VvZiBUb2tlbnNfMS5EZWZpbmVkVG9rZW4pID8gZGVzY1swXS5nZXRTaXplKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBoZWlnaHQgPSAoZGVzY1sxXSBpbnN0YW5jZW9mIFRva2Vuc18xLkRlZmluZWRUb2tlbikgPyBkZXNjWzFdLmdldFNpemUoKSA6IHdpZHRoO1xuICAgICAgICB3aWR0aCA9IHdpZHRoIHx8IDEwMCAvIGNvbHM7XG4gICAgICAgIGhlaWdodCA9IGhlaWdodCB8fCAxMDAgLyByb3dzO1xuICAgICAgICBsZXQgbGVmdCA9IDA7XG4gICAgICAgIGxldCB0b3AgPSAwO1xuICAgICAgICBsZXQgc3R5bGVzID0gWy4uLkFycmF5KG51bSkua2V5cygpXS5tYXAoaSA9PiB7XG4gICAgICAgICAgICBsZXQgciA9ICdhdXRvJztcbiAgICAgICAgICAgIGxldCB3ID0gd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgbGV0IGIgPSAnYXV0byc7XG4gICAgICAgICAgICBsZXQgaCA9IGhlaWdodCArICdweCc7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGBcbiAgICAgICAgICAgICAgICB0b3A6ICR7TWF0aC5mbG9vcih0b3ApfSU7IGJvdHRvbToke2J9O1xuICAgICAgICAgICAgICAgIGxlZnQ6ICR7bGVmdH0lOyAgICAgICAgICAgcmlnaHQ6JHtyfTtcbiAgICAgICAgICAgICAgICB3aWR0aDogJHt3fTsgICAgICAgICAgICAgIGhlaWdodDogJHtofTtcbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICBpZiAoTWF0aC5yb3VuZChsZWZ0ICs9IHdpZHRoKSA+IDEwMCAtIE1hdGguZmxvb3Iod2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgdG9wICs9IGhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICAgIGdldFN0eWxlcyhjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBzdHlsZXMgPSB0aGlzLnVuaXQoY29tcG9uZW50cy5sZW5ndGgpO1xuICAgICAgICBjb21wb25lbnRzLm1hcCgoYywgaSkgPT4ge1xuICAgICAgICAgICAgYy5zdHlsZSA9IHN0eWxlc1tpXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAnLmhzLXRpbGUtbGF5b3V0JztcbiAgICB9XG59XG5MYXlvdXRlcl8xLkxheW91dGVyLnJlZ2lzdGVyKCd0aWxlcycsIFRpbGVMYXlvdXRlcik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWR2xzWlV4aGVXOTFkR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dmMzSmpMM1pwWlhjdlZHbHNaVXhoZVc5MWRHVnlMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQk9FUkJMSGxEUVVFd1F6dEJRVU14UXl4eFEwRkhkME03UVVGUGVFTXNUVUZCVFN4WlFVRmhMRk5CUVZFc2JVSkJRVkU3U1VGUkwwSXNXVUZCYlVJc1VVRkJjMEk3VVVGRGNrTXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8xRkJSRVFzWVVGQlVTeEhRVUZTTEZGQlFWRXNRMEZCWXp0UlFVbHlReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGblFpeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1dVRkJXU3h0UWtGQlZTeERRVUZETEVOQlFVTXNRMEZCUVN4RFFVRkRPMWxCUXpGRkxFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU03U1VGRE1VTXNRMEZCUXp0SlFVVlBMRmRCUVZjc1EwRkJReXhIUVVGVk8xRkJRekZDTEUxQlFVMHNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU03VVVGRE0wSXNUVUZCVFN4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zV1VGQldTeHJRa0ZCVXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVNdlJDeE5RVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFGQlF6VkNMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRPVUlzU1VGQlRTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU01UWl4SlFVRkpMRWxCUVVrc1IwRkJSeXhKUVVGSkxFVkJRVVU3V1VGQlJTeEpRVUZKTEVWQlFVVXNRMEZCUXp0VFFVRkZPMUZCUXpWQ0xFbEJRVWtzUzBGQlN5eEhRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhaUVVGWkxIRkNRVUZaTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhUUVVGVExFTkJRVU03VVVGRE9VVXNTVUZCU1N4TlFVRk5MRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEZsQlFWa3NjVUpCUVZrc1EwRkJReXhEUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXp0UlFVVXhSU3hMUVVGTExFZEJRVWtzUzBGQlN5eEpRVUZMTEVkQlFVY3NSMEZCUXl4SlFVRkpMRU5CUVVNN1VVRkROVUlzVFVGQlRTeEhRVUZITEUxQlFVMHNTVUZCU1N4SFFVRkhMRWRCUVVNc1NVRkJTU3hEUVVGRE8xRkJRelZDTEVsQlFVa3NTVUZCU1N4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVOaUxFbEJRVWtzUjBGQlJ5eEhRVUZKTEVOQlFVTXNRMEZCUXp0UlFVVmlMRWxCUVVrc1RVRkJUU3hIUVVGSExFTkJRVU1zUjBGQlJ5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVN1dVRkRlRU1zU1VGQlNTeERRVUZETEVkQlFVY3NUVUZCVFN4RFFVRkRPMWxCUVVrc1NVRkJTU3hEUVVGRExFZEJRVWNzUzBGQlN5eEhRVUZETEVkQlFVY3NRMEZCUXp0WlFVTnlReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTTdXVUZCU1N4SlFVRkpMRU5CUVVNc1IwRkJSeXhOUVVGTkxFZEJRVU1zUjBGQlJ5eERRVUZETzFsQlEzUkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzUTBGQlF5eEhRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRWRCUVVjc1NVRkJTU3hKUVVGSkxFVkJRVVU3WjBKQlFVVXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJRenRuUWtGQlF5eERRVUZETEVkQlFVY3NUVUZCVFN4RFFVRkRPMkZCUVVVN1dVRkROMFFzU1VGQlNTeERRVUZETEVkQlFVY3NSMEZCUnl4RFFVRkRMRWRCUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUjBGQlJ5eEpRVUZKTEVsQlFVa3NSVUZCUlR0blFrRkJSU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETzJkQ1FVRkRMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU03WVVGQlJUdFpRVU0zUkN4TlFVRk5MRXRCUVVzc1IwRkJSenQxUWtGRFNDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhoUVVGaExFTkJRVU03ZDBKQlF6VkNMRWxCUVVrc2MwSkJRWE5DTEVOQlFVTTdlVUpCUXpGQ0xFTkJRVU1zTUVKQlFUQkNMRU5CUVVNN1lVRkRlRU1zUTBGQlF6dFpRVU5HTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFbEJRVWtzUzBGQlN5eERRVUZETEVkQlFVY3NSMEZCUnl4SFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVVTdaMEpCUVVVc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZCUXl4SFFVRkhMRWxCUVVrc1RVRkJUU3hEUVVGRE8yRkJRVVU3V1VGRGJrWXNUMEZCVHl4TFFVRkxMRU5CUVVNN1VVRkRhRUlzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU2l4UFFVRlBMRTFCUVUwc1EwRkJRenRKUVVOc1FpeERRVUZETzBsQlJVOHNVMEZCVXl4RFFVRkRMRWRCUVZVN1VVRkRlRUlzVFVGQlRTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJRenRSUVVVelFpeE5RVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFGQlF6VkNMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRPVUlzU1VGQlRTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU01UWl4SlFVRkpMRWxCUVVrc1IwRkJSeXhKUVVGSkxFVkJRVVU3V1VGQlJTeEpRVUZKTEVWQlFVVXNRMEZCUXp0VFFVRkZPMUZCUXpWQ0xFbEJRVWtzUzBGQlN5eEhRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhaUVVGWkxIRkNRVUZaTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhUUVVGVExFTkJRVU03VVVGRE9VVXNTVUZCU1N4TlFVRk5MRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEZsQlFWa3NjVUpCUVZrc1EwRkJReXhEUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXp0UlFVVXhSU3hMUVVGTExFZEJRVWtzUzBGQlN5eEpRVUZMTEVkQlFVY3NSMEZCUXl4SlFVRkpMRU5CUVVNN1VVRkROVUlzVFVGQlRTeEhRVUZITEUxQlFVMHNTVUZCU1N4SFFVRkhMRWRCUVVNc1NVRkJTU3hEUVVGRE8xRkJRelZDTEVsQlFVa3NTVUZCU1N4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVOaUxFbEJRVWtzUjBGQlJ5eEhRVUZKTEVOQlFVTXNRMEZCUXp0UlFVVmlMRWxCUVVrc1RVRkJUU3hIUVVGSExFTkJRVU1zUjBGQlJ5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVN1dVRkRlRU1zU1VGQlNTeERRVUZETEVkQlFVY3NUVUZCVFN4RFFVRkRPMWxCUVVrc1NVRkJTU3hEUVVGRExFZEJRVWNzUzBGQlN5eEhRVUZETEVsQlFVa3NRMEZCUXp0WlFVTjBReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTTdXVUZCU1N4SlFVRkpMRU5CUVVNc1IwRkJSeXhOUVVGTkxFZEJRVU1zU1VGQlNTeERRVUZETzFsQlEzWkRMRTFCUVUwc1MwRkJTeXhIUVVGSE8zVkNRVU5JTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExHRkJRV0VzUTBGQlF6dDNRa0ZETlVJc1NVRkJTU3h6UWtGQmMwSXNRMEZCUXp0NVFrRkRNVUlzUTBGQlF5d3dRa0ZCTUVJc1EwRkJRenRoUVVONFF5eERRVUZETzFsQlEwWXNTVUZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzU1VGQlNTeExRVUZMTEVOQlFVTXNSMEZCUnl4SFFVRkhMRWRCUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSVUZCUlR0blFrRkJSU3hKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVRkRMRWRCUVVjc1NVRkJTU3hOUVVGTkxFTkJRVU03WVVGQlJUdFpRVU51Uml4UFFVRlBMRXRCUVVzc1EwRkJRenRSUVVOb1FpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTktMRTlCUVU4c1RVRkJUU3hEUVVGRE8wbEJRMnhDTEVOQlFVTTdTVUZSVXl4VFFVRlRMRU5CUVVNc1ZVRkJPRUk3VVVGRE9VTXNTVUZCU1N4TlFVRk5MRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1VVRkRNVU1zVlVGQlZTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVdNc1JVRkJSU3hEUVVGUkxFVkJRVVVzUlVGQlJUdFpRVU40UXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhIUVVGSExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTjRRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEU5QlFVOHNhVUpCUVdsQ0xFTkJRVU03U1VGRE4wSXNRMEZCUXp0RFFVTktPMEZCUjBRc2JVSkJRVkVzUTBGQlF5eFJRVUZSTEVOQlFVTXNUMEZCVHl4RlFVRkZMRmxCUVZrc1EwRkJReXhEUVVGREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIExheW91dFRva2VuIHtcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgfVxuICAgIGdldFNpemUoKSB7IHJldHVybiB0aGlzLnNpemU7IH1cbn1cbmV4cG9ydHMuTGF5b3V0VG9rZW4gPSBMYXlvdXRUb2tlbjtcbmNsYXNzIERlZmluZWRUb2tlbiBleHRlbmRzIExheW91dFRva2VuIHtcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7IHN1cGVyKHNpemUpOyB9XG59XG5leHBvcnRzLkRlZmluZWRUb2tlbiA9IERlZmluZWRUb2tlbjtcbmNsYXNzIEZpbGxUb2tlbiBleHRlbmRzIExheW91dFRva2VuIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoLTEpOyB9XG59XG5leHBvcnRzLkZpbGxUb2tlbiA9IEZpbGxUb2tlbjtcbmNsYXNzIFBpeGVsVG9rZW4gZXh0ZW5kcyBEZWZpbmVkVG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHsgc3VwZXIoc2l6ZSk7IH1cbn1cbmV4cG9ydHMuUGl4ZWxUb2tlbiA9IFBpeGVsVG9rZW47XG5jbGFzcyBQZXJjZW50VG9rZW4gZXh0ZW5kcyBEZWZpbmVkVG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHsgc3VwZXIoc2l6ZSk7IH1cbn1cbmV4cG9ydHMuUGVyY2VudFRva2VuID0gUGVyY2VudFRva2VuO1xuZnVuY3Rpb24gcHgocHgpIHsgcmV0dXJuIG5ldyBQaXhlbFRva2VuKHB4KTsgfVxuZXhwb3J0cy5weCA9IHB4O1xuZnVuY3Rpb24gcGMocGMpIHsgcmV0dXJuIG5ldyBQZXJjZW50VG9rZW4ocGMpOyB9XG5leHBvcnRzLnBjID0gcGM7XG5leHBvcnRzLkZJTEwgPSBuZXcgRmlsbFRva2VuKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWRzlyWlc1ekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDNacFpYY3ZWRzlyWlc1ekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCVVVFc1RVRkJjMElzVjBGQlZ6dEpRVU0zUWl4WlFVRnZRaXhKUVVGWk8xRkJRVm9zVTBGQlNTeEhRVUZLTEVsQlFVa3NRMEZCVVR0SlFVRkhMRU5CUVVNN1NVRkROMElzVDBGQlR5eExRVUZMTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRGVrTTdRVUZJUkN4clEwRkhRenRCUVV0RUxFMUJRWE5DTEZsQlFXRXNVMEZCVVN4WFFVRlhPMGxCUTJ4RUxGbEJRVmtzU1VGQldTeEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRE4wTTdRVUZHUkN4dlEwRkZRenRCUVV0RUxFMUJRV0VzVTBGQlZTeFRRVUZSTEZkQlFWYzdTVUZEZEVNc1owSkJRV2RDTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dERRVU12UWp0QlFVWkVMRGhDUVVWRE8wRkJTMFFzVFVGQllTeFZRVUZYTEZOQlFWRXNXVUZCV1R0SlFVTjRReXhaUVVGWkxFbEJRVmNzU1VGQlNTeExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wTkJRelZETzBGQlJrUXNaME5CUlVNN1FVRkxSQ3hOUVVGaExGbEJRV0VzVTBGQlVTeFpRVUZaTzBsQlF6RkRMRmxCUVZrc1NVRkJWeXhKUVVGSkxFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1EwRkROVU03UVVGR1JDeHZRMEZGUXp0QlFVMUVMRk5CUVdkQ0xFVkJRVVVzUTBGQlF5eEZRVUZUTEVsQlFVMHNUMEZCVHl4SlFVRkpMRlZCUVZVc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZCT1VRc1owSkJRVGhFTzBGQlRUbEVMRk5CUVdkQ0xFVkJRVVVzUTBGQlF5eEZRVUZUTEVsQlFVMHNUMEZCVHl4SlFVRkpMRmxCUVZrc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZCYUVVc1owSkJRV2RGTzBGQlMyNUVMRkZCUVVFc1NVRkJTU3hIUVVGSExFbEJRVWtzVTBGQlV5eEZRVUZGTEVOQlFVTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBzaG9ydENoZWNrU3VtKHMpIHtcbiAgICB2YXIgY2hrID0gMHgxMjM0NTY3ODtcbiAgICB2YXIgbGVuID0gcy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjaGsgKz0gKHMuY2hhckNvZGVBdChpKSAqIChpICsgMSkpO1xuICAgIH1cbiAgICByZXR1cm4gKGNoayAmIDB4ZmZmZmZmZmYpLnRvU3RyaW5nKDE2KTtcbn1cbmV4cG9ydHMuc2hvcnRDaGVja1N1bSA9IHNob3J0Q2hlY2tTdW07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRMmhsWTJ0emRXMHVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12UTJobFkydHpkVzB1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRlJReXhUUVVGblFpeGhRVUZoTEVOQlFVTXNRMEZCVVR0SlFVTnVReXhKUVVGSkxFZEJRVWNzUjBGQlJ5eFZRVUZWTEVOQlFVTTdTVUZEY2tJc1NVRkJTU3hIUVVGSExFZEJRVWNzUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXp0SlFVTnVRaXhMUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1IwRkJSeXhGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTzFGQlF6RkNMRWRCUVVjc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0TFFVTjBRenRKUVVORUxFOUJRVThzUTBGQlF5eEhRVUZITEVkQlFVY3NWVUZCVlN4RFFVRkRMRU5CUVVNc1VVRkJVU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETzBGQlF6RkRMRU5CUVVNN1FVRlFSQ3h6UTBGUFF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG1vbnRoU3RyID0gW1xuICAgIFsnSmFuJywgJ0phbnVhcnknXSwgWydGZWInLCAnRmVicnVhcnknXSwgWydNYXInLCAnTWFyY2gnXSwgWydBcHInLCAnQXByaWwnXSwgWydNYXknLCAnTWF5J10sIFsnSnVuJywgJ0p1bmUnXSxcbiAgICBbJ0p1bCcsICdKdWx5J10sIFsnQXVnJywgJ0F1Z3VzdCddLCBbJ1NlcCcsICdTZXB0ZW1iZXInXSwgWydPY3QnLCAnT2N0b2JlciddLCBbJ05vdicsICdOb3ZlbWJlciddLCBbJ0RlYycsICdEZWNlbWJlciddXG5dO1xuY29uc3QgZGF5U3RyID0gW1xuICAgIFsnU3VuJywgJ1N1bmRheSddLCBbJ01vbicsICdNb25kYXknXSwgWydUdWUnLCAnVHVlc2RheSddLCBbJ1dlZCcsICdXZWRuZXNkYXknXSwgWydUaHUnLCAnVGh1cnNkYXknXSwgWydGcmknLCAnRnJpZGF5J10sIFsnU2F0JywgJ1NhdHVyZGF5J11cbl07XG5mdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtYmVyLCBkaWdpdHMpIHtcbiAgICB2YXIgciA9ICcnICsgbnVtYmVyO1xuICAgIHdoaWxlIChyLmxlbmd0aCA8IGRpZ2l0cykge1xuICAgICAgICByID0gXCIwXCIgKyByO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbn1cbmZ1bmN0aW9uIGRhdGUoZm9ybWF0U3RyaW5nLCBkYXRlID0gbmV3IERhdGUoKSkge1xuICAgIHJldHVybiAodHlwZW9mIGZvcm1hdFN0cmluZyAhPT0gJ3N0cmluZycgfHwgaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSA/XG4gICAgICAgICdpbnZhbGlkJyA6XG4gICAgICAgIGZvcm1hdFN0cmluZ1xuICAgICAgICAgICAgLnJlcGxhY2UoLyVZWVlZL2csICcnICsgZGF0ZS5nZXRGdWxsWWVhcigpKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVZWS9nLCAnJyArIChkYXRlLmdldEZ1bGxZZWFyKCkgJSAxMDApKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVNTU1NL2csIG1vbnRoU3RyW2RhdGUuZ2V0TW9udGgoKV1bMV0pXG4gICAgICAgICAgICAucmVwbGFjZSgvJU1NTS9nLCBtb250aFN0cltkYXRlLmdldE1vbnRoKCldWzBdKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVNTS9nLCBmb3JtYXROdW1iZXIoZGF0ZS5nZXRNb250aCgpICsgMSwgMikpXG4gICAgICAgICAgICAucmVwbGFjZSgvJU0vZywgJycgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkpXG4gICAgICAgICAgICAucmVwbGFjZSgvJUREREQvZywgZGF5U3RyW2RhdGUuZ2V0RGF5KCldWzFdKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVEREQvZywgZGF5U3RyW2RhdGUuZ2V0RGF5KCldWzBdKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVERC9nLCBmb3JtYXROdW1iZXIoZGF0ZS5nZXREYXRlKCksIDIpKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVEL2csICcnICsgZGF0ZS5nZXREYXRlKCkpXG4gICAgICAgICAgICAucmVwbGFjZSgvJWhoL2csIGZvcm1hdE51bWJlcihkYXRlLmdldEhvdXJzKCksIDIpKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVoL2csICcnICsgZGF0ZS5nZXRIb3VycygpKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVtbS9nLCBmb3JtYXROdW1iZXIoZGF0ZS5nZXRNaW51dGVzKCksIDIpKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVtL2csICcnICsgZGF0ZS5nZXRNaW51dGVzKCkpXG4gICAgICAgICAgICAucmVwbGFjZSgvJXNzL2csIGZvcm1hdE51bWJlcihkYXRlLmdldFNlY29uZHMoKSwgMikpXG4gICAgICAgICAgICAucmVwbGFjZSgvJWpqai9nLCBmb3JtYXROdW1iZXIoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMykpXG4gICAgICAgICAgICAucmVwbGFjZSgvJWpqL2csIGZvcm1hdE51bWJlcihkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAsIDIpKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVqL2csIGZvcm1hdE51bWJlcihkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwLCAxKSk7XG59XG5leHBvcnRzLmRhdGUgPSBkYXRlO1xuZXhwb3J0cy5tcyA9IHtcbiAgICBmcm9tTWludXRlczogKG1pbikgPT4gMTAwMCAqIDYwICogbWluLFxuICAgIGZyb21Ib3VyczogKGgpID0+IDEwMDAgKiA2MCAqIDYwICogaCxcbiAgICBmcm9tRGF5czogKGQpID0+IDEwMDAgKiA2MCAqIDYwICogMjQgKiBkLFxuICAgIGZyb21XZWVrczogKHcpID0+IDEwMDAgKiA2MCAqIDYwICogMjQgKiA3ICogdyxcbiAgICB0b01pbnV0ZXM6IChtcykgPT4gbXMgLyAoMTAwMCAqIDYwKSxcbiAgICB0b0hvdXJzOiAobXMpID0+IG1zIC8gKDEwMDAgKiA2MCAqIDYwKSxcbiAgICB0b0RheXM6IChtcykgPT4gbXMgLyAoMTAwMCAqIDYwICogNjAgKiAyNCksXG4gICAgdG9XZWVrczogKG1zKSA9PiBtcyAvICgxMDAwICogNjAgKiA2MCAqIDI0ICogNylcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lSR0YwWlM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OUVZWFJsTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJaVUVzVFVGQlRTeFJRVUZSTEVkQlFVYzdTVUZEWWl4RFFVRkRMRXRCUVVzc1JVRkJSU3hUUVVGVExFTkJRVU1zUlVGQlJTeERRVUZETEV0QlFVc3NSVUZCUlN4VlFVRlZMRU5CUVVNc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeFBRVUZQTEVOQlFVTXNSVUZCUlN4RFFVRkRMRXRCUVVzc1JVRkJSU3hQUVVGUExFTkJRVU1zUlVGQlJTeERRVUZETEV0QlFVc3NSVUZCUlN4TFFVRkxMRU5CUVVNc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeE5RVUZOTEVOQlFVTTdTVUZETlVjc1EwRkJReXhMUVVGTExFVkJRVVVzVFVGQlRTeERRVUZETEVWQlFVVXNRMEZCUXl4TFFVRkxMRVZCUVVVc1VVRkJVU3hEUVVGRExFVkJRVVVzUTBGQlF5eExRVUZMTEVWQlFVVXNWMEZCVnl4RFFVRkRMRVZCUVVVc1EwRkJReXhMUVVGTExFVkJRVVVzVTBGQlV5eERRVUZETEVWQlFVVXNRMEZCUXl4TFFVRkxMRVZCUVVVc1ZVRkJWU3hEUVVGRExFVkJRVVVzUTBGQlF5eExRVUZMTEVWQlFVVXNWVUZCVlN4RFFVRkRPME5CUVVNc1EwRkJRenRCUVVjMVNDeE5RVUZOTEUxQlFVMHNSMEZCUnp0SlFVTllMRU5CUVVNc1MwRkJTeXhGUVVGRkxGRkJRVkVzUTBGQlF5eEZRVUZETEVOQlFVTXNTMEZCU3l4RlFVRkZMRkZCUVZFc1EwRkJReXhGUVVGRExFTkJRVU1zUzBGQlN5eEZRVUZGTEZOQlFWTXNRMEZCUXl4RlFVRkRMRU5CUVVNc1MwRkJTeXhGUVVGRkxGZEJRVmNzUTBGQlF5eEZRVUZETEVOQlFVTXNTMEZCU3l4RlFVRkZMRlZCUVZVc1EwRkJReXhGUVVGRExFTkJRVU1zUzBGQlN5eEZRVUZGTEZGQlFWRXNRMEZCUXl4RlFVRkRMRU5CUVVNc1MwRkJTeXhGUVVGRkxGVkJRVlVzUTBGQlF6dERRVUZETEVOQlFVTTdRVUZITTBrc1UwRkJVeXhaUVVGWkxFTkJRVU1zVFVGQllTeEZRVUZGTEUxQlFXRTdTVUZET1VNc1NVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZETEUxQlFVMHNRMEZCUXp0SlFVTnNRaXhQUVVGUExFTkJRVU1zUTBGQlF5eE5RVUZOTEVkQlFVY3NUVUZCVFN4RlFVRkZPMUZCUVVVc1EwRkJReXhIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVTTdTMEZCUlR0SlFVTXhReXhQUVVGUExFTkJRVU1zUTBGQlF6dEJRVU5pTEVOQlFVTTdRVUZqUkN4VFFVRm5RaXhKUVVGSkxFTkJRVU1zV1VGQmJVSXNSVUZCUlN4SlFVRkpMRWRCUVVNc1NVRkJTU3hKUVVGSkxFVkJRVVU3U1VGRGNrUXNUMEZCVHl4RFFVRkRMRTlCUVU4c1dVRkJXU3hMUVVGTExGRkJRVkVzU1VGQlNTeExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEyaEZMRk5CUVZNc1EwRkJRU3hEUVVGRE8xRkJRMVlzV1VGQldUdGhRVU5RTEU5QlFVOHNRMEZCUXl4UlFVRlJMRVZCUVVVc1JVRkJSU3hIUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXp0aFFVTjRReXhQUVVGUExFTkJRVU1zVFVGQlRTeEZRVUZKTEVWQlFVVXNSMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVVzUjBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0aFFVTTVReXhQUVVGUExFTkJRVU1zVVVGQlVTeEZRVUZITEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0aFFVTm9SQ3hQUVVGUExFTkJRVU1zVDBGQlR5eEZRVUZKTEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0aFFVTm9SQ3hQUVVGUExFTkJRVU1zVFVGQlRTeEZRVUZKTEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hGUVVGRkxFZEJRVU1zUTBGQlF5eEZRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMkZCUTNCRUxFOUJRVThzUTBGQlF5eExRVUZMTEVWQlFVa3NSVUZCUlN4SFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJTeEhRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMkZCUTNoRExFOUJRVThzUTBGQlF5eFJRVUZSTEVWQlFVY3NUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMkZCUXpWRExFOUJRVThzUTBGQlF5eFBRVUZQTEVWQlFVa3NUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMkZCUXpWRExFOUJRVThzUTBGQlF5eE5RVUZOTEVWQlFVa3NXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0aFFVTnFSQ3hQUVVGUExFTkJRVU1zUzBGQlN5eEZRVUZKTEVWQlFVVXNSMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03WVVGRGJrTXNUMEZCVHl4RFFVRkRMRTFCUVUwc1JVRkJTU3haUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlN4RlFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yRkJRMnhFTEU5QlFVOHNRMEZCUXl4TFFVRkxMRVZCUVVjc1JVRkJSU3hIUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXp0aFFVTnVReXhQUVVGUExFTkJRVU1zVFVGQlRTeEZRVUZKTEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFVkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdZVUZEY0VRc1QwRkJUeXhEUVVGRExFdEJRVXNzUlVGQlNTeEZRVUZGTEVkQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8yRkJRM1JETEU5QlFVOHNRMEZCUXl4TlFVRk5MRVZCUVVrc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVWQlFVVXNSVUZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRoUVVOd1JDeFBRVUZQTEVOQlFVTXNUMEZCVHl4RlFVRkpMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zWlVGQlpTeEZRVUZGTEVWQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1lVRkRNVVFzVDBGQlR5eERRVUZETEUxQlFVMHNSVUZCU1N4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExHVkJRV1VzUlVGQlJTeEhRVUZETEVWQlFVVXNSVUZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRoUVVNMVJDeFBRVUZQTEVOQlFVTXNTMEZCU3l4RlFVRkhMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zWlVGQlpTeEZRVUZGTEVkQlFVTXNSMEZCUnl4RlFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRGVrVXNRMEZCUXp0QlFYUkNSQ3h2UWtGelFrTTdRVUZIV1N4UlFVRkJMRVZCUVVVc1IwRkJSenRKUVVOa0xGZEJRVmNzUlVGQlN5eERRVUZETEVkQlFWVXNSVUZCUlN4RlFVRkZMRU5CUVVNc1NVRkJTU3hIUVVGRExFVkJRVVVzUjBGQlF5eEhRVUZITzBsQlF6TkRMRk5CUVZNc1JVRkJUeXhEUVVGRExFTkJRVkVzUlVGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4SFFVRkRMRVZCUVVVc1IwRkJReXhGUVVGRkxFZEJRVU1zUTBGQlF6dEpRVU0xUXl4UlFVRlJMRVZCUVZFc1EwRkJReXhEUVVGUkxFVkJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NSMEZCUXl4RlFVRkZMRWRCUVVNc1JVRkJSU3hIUVVGRExFVkJRVVVzUjBGQlF5eERRVUZETzBsQlF5OURMRk5CUVZNc1JVRkJUeXhEUVVGRExFTkJRVkVzUlVGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4SFFVRkRMRVZCUVVVc1IwRkJReXhGUVVGRkxFZEJRVU1zUlVGQlJTeEhRVUZETEVOQlFVTXNSMEZCUXl4RFFVRkRPMGxCUTJwRUxGTkJRVk1zUlVGQlR5eERRVUZETEVWQlFWTXNSVUZCUnl4RlFVRkZMRU5CUVVNc1JVRkJSU3hIUVVGRExFTkJRVU1zU1VGQlNTeEhRVUZETEVWQlFVVXNRMEZCUXp0SlFVTTFReXhQUVVGUExFVkJRVk1zUTBGQlF5eEZRVUZUTEVWQlFVY3NSVUZCUlN4RFFVRkRMRVZCUVVVc1IwRkJReXhEUVVGRExFbEJRVWtzUjBGQlF5eEZRVUZGTEVkQlFVTXNSVUZCUlN4RFFVRkRPMGxCUXk5RExFMUJRVTBzUlVGQlZTeERRVUZETEVWQlFWTXNSVUZCUnl4RlFVRkZMRU5CUVVNc1JVRkJSU3hIUVVGRExFTkJRVU1zU1VGQlNTeEhRVUZETEVWQlFVVXNSMEZCUXl4RlFVRkZMRWRCUVVNc1JVRkJSU3hEUVVGRE8wbEJRMnhFTEU5QlFVOHNSVUZCVXl4RFFVRkRMRVZCUVZNc1JVRkJSeXhGUVVGRkxFTkJRVU1zUlVGQlJTeEhRVUZETEVOQlFVTXNTVUZCU1N4SFFVRkRMRVZCUVVVc1IwRkJReXhGUVVGRkxFZEJRVU1zUlVGQlJTeEhRVUZETEVOQlFVTXNRMEZCUXp0RFFVTjJSQ3hEUVVGREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHJvdW5kKG4sIGQgPSAwKSB7XG4gICAgY29uc3QgZiA9IE1hdGgucG93KDEwLCBkKTtcbiAgICBjb25zdCByID0gTWF0aC5yb3VuZChuICogZikgLyBmO1xuICAgIHJldHVybiAnJyArIHI7XG59XG5leHBvcnRzLnJvdW5kID0gcm91bmQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUblZ0WW1WeUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMMDUxYldKbGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVZkRExGTkJRV2RDTEV0QlFVc3NRMEZCUXl4RFFVRlJMRVZCUVVVc1EwRkJReXhIUVVGRExFTkJRVU03U1VGUGFFTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVWQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRla0lzVFVGQlRTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFZEJRVU1zUTBGQlF5eERRVUZETEVkQlFVTXNRMEZCUXl4RFFVRkRPMGxCUXpWQ0xFOUJRVThzUlVGQlJTeEhRVUZETEVOQlFVTXNRMEZCUXp0QlFVTm1MRU5CUVVNN1FVRldSQ3h6UWtGVlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gdGltZW91dChtcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7IHNldFRpbWVvdXQocmVqZWN0LCBtcyk7IH0pO1xufVxuZXhwb3J0cy50aW1lb3V0ID0gdGltZW91dDtcbmZ1bmN0aW9uIGRlbGF5KG1zKSB7XG4gICAgcmV0dXJuIChhcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHJlc29sdmUoYXJncyk7IH0sIG1zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cbmV4cG9ydHMuZGVsYXkgPSBkZWxheTtcbmNsYXNzIFBhY2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhY2UgPSAxMDAsIG1heENvbmN1cnJlbnQgPSAtMSkge1xuICAgICAgICB0aGlzLm1heENvbmN1cnJlbnQgPSAtMTtcbiAgICAgICAgdGhpcy53YWl0VW50aWwgPSAwO1xuICAgICAgICB0aGlzLndhaXRDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuYmVpbmdDYWxsZWQgPSAwO1xuICAgICAgICB0aGlzLnBhY2UgPSBwYWNlICsgNTtcbiAgICAgICAgdGhpcy5tYXhDb25jdXJyZW50ID0gbWF4Q29uY3VycmVudDtcbiAgICB9XG4gICAgZ2V0V2FpdENvdW50KCkgeyByZXR1cm4gdGhpcy53YWl0Q291bnQ7IH1cbiAgICBnZXRDYWxsaW5nQ291bnQoKSB7IHJldHVybiB0aGlzLmJlaW5nQ2FsbGVkOyB9XG4gICAgYWRkKGZuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBhZGRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICh0aGlzLndhaXRVbnRpbCA8IGFkZFRpbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhaXRVbnRpbCA9IGFkZFRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gdGhpcy53YWl0VW50aWwgLSBhZGRUaW1lO1xuICAgICAgICAgICAgdGhpcy53YWl0VW50aWwgKz0gdGhpcy5wYWNlICsgNTtcbiAgICAgICAgICAgIHRoaXMud2FpdENvdW50Kys7XG4gICAgICAgICAgICB5aWVsZCBkZWxheShkaWZmKSgpO1xuICAgICAgICAgICAgeWllbGQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2FpdExvb3AgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heENvbmN1cnJlbnQgPCAwIHx8IHRoaXMuYmVpbmdDYWxsZWQgPCB0aGlzLm1heENvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQod2FpdExvb3AsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgd2FpdExvb3AoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy53YWl0Q291bnQtLTtcbiAgICAgICAgICAgIHRoaXMuYmVpbmdDYWxsZWQrKztcbiAgICAgICAgICAgIGNvbnN0IHJldCA9IHlpZWxkIGZuKERhdGUubm93KCkgLSBhZGRUaW1lKTtcbiAgICAgICAgICAgIHRoaXMuYmVpbmdDYWxsZWQtLTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuUGFjZSA9IFBhY2U7XG5mdW5jdGlvbiBwcm9taXNlQ2hhaW4odGFza3MsIGluaXRpYWxSZXN1bHQgPSBbXSkge1xuICAgIHJldHVybiB0YXNrcy5yZWR1Y2UoKGNoYWluLCB0YXNrKSA9PiBjaGFpbi50aGVuKChfcmVzdWx0cykgPT4gUHJvbWlzZS5yZXNvbHZlKHRhc2soX3Jlc3VsdHMpKS50aGVuKChyKSA9PiB7XG4gICAgICAgIF9yZXN1bHRzLnB1c2gocik7XG4gICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICB9KSksIFByb21pc2UucmVzb2x2ZShpbml0aWFsUmVzdWx0KSk7XG59XG5leHBvcnRzLnByb21pc2VDaGFpbiA9IHByb21pc2VDaGFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVZHbHRaV1JRY205dGFYTmxjeTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMM055WXk5VWFXMWxaRkJ5YjIxcGMyVnpMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenM3TzBGQlYwRXNVMEZCWjBJc1QwRkJUeXhEUVVGRExFVkJRVk03U1VGRE4wSXNUMEZCVHl4SlFVRkpMRTlCUVU4c1EwRkJReXhEUVVGRExFOUJRVThzUlVGQlJTeE5RVUZOTEVWQlFVVXNSVUZCUlN4SFFVRkhMRlZCUVZVc1EwRkJReXhOUVVGTkxFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRCUVVONlJTeERRVUZETzBGQlJrUXNNRUpCUlVNN1FVRjFRa1FzVTBGQlowSXNTMEZCU3l4RFFVRkRMRVZCUVZNN1NVRkRNMElzVDBGQlR5eERRVUZKTEVsQlFVOHNSVUZCWVN4RlFVRkZPMUZCUXpkQ0xFOUJRVThzU1VGQlNTeFBRVUZQTEVOQlFVTXNRMEZCUXl4UFFVRnpRaXhGUVVGRkxFVkJRVVU3V1VGRE1VTXNWVUZCVlN4RFFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF6dFJRVU0zUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU1zUTBGQlF6dEJRVU5PTEVOQlFVTTdRVUZPUkN4elFrRk5RenRCUVdGRUxFMUJRV0VzU1VGQlNUdEpRVmxpTEZsQlFWa3NTVUZCU1N4SFFVRkRMRWRCUVVjc1JVRkJSU3hoUVVGaExFZEJRVU1zUTBGQlF5eERRVUZETzFGQldEbENMR3RDUVVGaExFZEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZGY2tJc1kwRkJVeXhIUVVGVExFTkJRVU1zUTBGQlF6dFJRVU53UWl4alFVRlRMRWRCUVZNc1EwRkJReXhEUVVGRE8xRkJRM0JDTEdkQ1FVRlhMRWRCUVU4c1EwRkJReXhEUVVGRE8xRkJVWGhDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hIUVVGRExFTkJRVU1zUTBGQlF6dFJRVU51UWl4SlFVRkpMRU5CUVVNc1lVRkJZU3hIUVVGSExHRkJRV0VzUTBGQlF6dEpRVU4yUXl4RFFVRkRPMGxCUlVRc1dVRkJXU3hMUVVGUkxFOUJRVThzU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkROVU1zWlVGQlpTeExRVUZMTEU5QlFVOHNTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRExFTkJRVU03U1VGUmVFTXNSMEZCUnl4RFFVRkRMRVZCUVdsRE96dFpRVU4yUXl4TlFVRk5MRTlCUVU4c1IwRkJSeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVOQlFVTTdXVUZETTBJc1NVRkJTU3hKUVVGSkxFTkJRVU1zVTBGQlV5eEhRVUZITEU5QlFVOHNSVUZCUlR0blFrRkJSU3hKUVVGSkxFTkJRVU1zVTBGQlV5eEhRVUZITEU5QlFVOHNRMEZCUXp0aFFVRkZPMWxCUXpORUxFMUJRVTBzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4VFFVRlRMRWRCUVVjc1QwRkJUeXhEUVVGRE8xbEJRM1JETEVsQlFVa3NRMEZCUXl4VFFVRlRMRWxCUVVrc1NVRkJTU3hEUVVGRExFbEJRVWtzUjBGQlJ5eERRVUZETEVOQlFVTTdXVUZEYUVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUlVGQlJTeERRVUZETzFsQlEycENMRTFCUVUwc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTTdXVUZEY0VJc1RVRkJUU3hKUVVGSkxFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlR0blFrRkRlRUlzVFVGQlRTeFJRVUZSTEVkQlFVY3NSMEZCUnl4RlFVRkZPMjlDUVVOc1FpeEpRVUZKTEVsQlFVa3NRMEZCUXl4aFFVRmhMRWRCUVVjc1EwRkJReXhKUVVGSkxFbEJRVWtzUTBGQlF5eFhRVUZYTEVkQlFVY3NTVUZCU1N4RFFVRkRMR0ZCUVdFc1JVRkJSVHQzUWtGRGFrVXNUMEZCVHl4RlFVRkZMRU5CUVVNN2NVSkJRMkk3ZVVKQlFVMDdkMEpCUTBnc1ZVRkJWU3hEUVVGRExGRkJRVkVzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0eFFrRkROVUk3WjBKQlEwd3NRMEZCUXl4RFFVRkRPMmRDUVVOR0xGRkJRVkVzUlVGQlJTeERRVUZETzFsQlEyWXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRTQ3hKUVVGSkxFTkJRVU1zVTBGQlV5eEZRVUZGTEVOQlFVTTdXVUZEYWtJc1NVRkJTU3hEUVVGRExGZEJRVmNzUlVGQlJTeERRVUZETzFsQlEyNUNMRTFCUVUwc1IwRkJSeXhIUVVGSExFMUJRVTBzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRVZCUVVVc1IwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFpRVU42UXl4SlFVRkpMRU5CUVVNc1YwRkJWeXhGUVVGRkxFTkJRVU03V1VGRGJrSXNUMEZCVHl4SFFVRkhMRU5CUVVNN1VVRkRaaXhEUVVGRE8wdEJRVUU3UTBGRFNqdEJRV3BFUkN4dlFrRnBSRU03UVVGWFJDeFRRVUZuUWl4WlFVRlpMRU5CUVVrc1MwRkJjVU1zUlVGQlJTeG5Ra0ZCYTBJc1JVRkJSVHRKUVVOMlJpeFBRVUZQTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhMUVVGclFpeEZRVUZGTEVsQlFTdENMRVZCUVdkQ0xFVkJRVVVzUTBGRmRFWXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExGRkJRVmtzUlVGQlJTeEZRVUZGTEVOQlFVTXNUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGSExFVkJRVVVzUlVGQlJUdFJRVVYwUlN4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEycENMRTlCUVU4c1VVRkJVU3hEUVVGRE8wbEJRM0JDTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUTBnc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eGhRVUZoTEVOQlFVTXNRMEZEYWtNc1EwRkJRenRCUVVOT0xFTkJRVU03UVVGV1JDeHZRMEZWUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFRpbWVkUHJvbWlzZXNfMSA9IHJlcXVpcmUoXCIuL1RpbWVkUHJvbWlzZXNcIik7XG5leHBvcnRzLnRpbWVvdXQgPSBUaW1lZFByb21pc2VzXzEudGltZW91dDtcbmV4cG9ydHMuZGVsYXkgPSBUaW1lZFByb21pc2VzXzEuZGVsYXk7XG52YXIgVGltZWRQcm9taXNlc18yID0gcmVxdWlyZShcIi4vVGltZWRQcm9taXNlc1wiKTtcbmV4cG9ydHMuUGFjZSA9IFRpbWVkUHJvbWlzZXNfMi5QYWNlO1xudmFyIFRpbWVkUHJvbWlzZXNfMyA9IHJlcXVpcmUoXCIuL1RpbWVkUHJvbWlzZXNcIik7XG5leHBvcnRzLnByb21pc2VDaGFpbiA9IFRpbWVkUHJvbWlzZXNfMy5wcm9taXNlQ2hhaW47XG52YXIgQ2hlY2tzdW1fMSA9IHJlcXVpcmUoXCIuL0NoZWNrc3VtXCIpO1xuZXhwb3J0cy5zaG9ydENoZWNrU3VtID0gQ2hlY2tzdW1fMS5zaG9ydENoZWNrU3VtO1xudmFyIERhdGVfMSA9IHJlcXVpcmUoXCIuL0RhdGVcIik7XG5leHBvcnRzLmRhdGUgPSBEYXRlXzEuZGF0ZTtcbmV4cG9ydHMubXMgPSBEYXRlXzEubXM7XG52YXIgTnVtYmVyXzEgPSByZXF1aXJlKFwiLi9OdW1iZXJcIik7XG5leHBvcnRzLnJvdW5kID0gTnVtYmVyXzEucm91bmQ7XG52YXIgbG9nXzEgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5leHBvcnRzLmxvZyA9IGxvZ18xLmxvZztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdmFXNWtaWGd1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkJRU3hwUkVGQmRVUTdRVUZCT1VNc2EwTkJRVUVzVDBGQlR5eERRVUZCTzBGQlFVVXNaME5CUVVFc1MwRkJTeXhEUVVGQk8wRkJRM1pDTEdsRVFVRjFSRHRCUVVFNVF5d3JRa0ZCUVN4SlFVRkpMRU5CUVVFN1FVRkRZaXhwUkVGQmRVUTdRVUZCT1VNc2RVTkJRVUVzV1VGQldTeERRVUZCTzBGQlEzSkNMSFZEUVVGclJEdEJRVUY2UXl4dFEwRkJRU3hoUVVGaExFTkJRVUU3UVVGRGRFSXNLMEpCUVRoRE8wRkJRWEpETEhOQ1FVRkJMRWxCUVVrc1EwRkJRVHRCUVVGRkxHOUNRVUZCTEVWQlFVVXNRMEZCUVR0QlFVTnFRaXh0UTBGQlowUTdRVUZCZGtNc2VVSkJRVUVzUzBGQlN5eERRVUZCTzBGQlEyUXNOa0pCUVRaRE8wRkJRWEJETEc5Q1FVRkJMRWRCUVVjc1EwRkJRU0o5IiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IERhdGVfMSA9IHJlcXVpcmUoXCIuL0RhdGVcIik7XG5jb25zdCBERUJVRyA9IFN5bWJvbCgnREVCVUcnKTtcbmNvbnN0IElORk8gPSBTeW1ib2woJ0lORk8nKTtcbmNvbnN0IFdBUk4gPSBTeW1ib2woJ1dBUk4nKTtcbmNvbnN0IEVSUk9SID0gU3ltYm9sKCdFUlJPUicpO1xubGV0IGdMb2dGaWxlO1xuY29uc3QgZ0xldmVscyA9IHtcbiAgICBbREVCVUddOiB7IGltcG9ydGFuY2U6IDAsIHN5bTogREVCVUcsIGRlc2M6ICdERUJVRycgfSxcbiAgICBbSU5GT106IHsgaW1wb3J0YW5jZTogMSwgc3ltOiBJTkZPLCBkZXNjOiAnSU5GTycgfSxcbiAgICBbV0FSTl06IHsgaW1wb3J0YW5jZTogMiwgc3ltOiBXQVJOLCBkZXNjOiAnV0FSTicgfSxcbiAgICBbRVJST1JdOiB7IGltcG9ydGFuY2U6IDMsIHN5bTogRVJST1IsIGRlc2M6ICdFUlJPUicgfVxufTtcbmxldCBnR2xvYmFsTGV2ZWwgPSBnTGV2ZWxzW0lORk9dO1xuY29uc3QgZGVmRGF0ZUZvcm1hdCA9ICclWVlZWSVNTSVERCAlaGg6JW1tOiVzcy4lampqJztcbmxldCBnRGF0ZUZvcm1hdCA9IGRlZkRhdGVGb3JtYXQ7XG5sZXQgZ0NvbG9ycyA9IGZhbHNlO1xuY29uc3QgY29sb3IgPSB7XG4gICAgcmVkOiAnXFx4MWJbMzFtJyxcbiAgICB5ZWxsb3c6ICdcXHgxYlszM20nLFxuICAgIGJsdWU6ICdcXHgxYlszNm0nLFxuICAgIGdyZWVuOiAnXFx4MWJbMzJtJyxcbiAgICBib2xkOiAnXFx4MWJbMW0nLFxuICAgIGNsZWFyOiAnXFx4MWJbMG0nXG59O1xuZXhwb3J0cy5sb2cgPSBjcmVhdGUoJycsIChmaWxlbmFtZSwgbXNnKSA9PiBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKSwgKHBhdGgpID0+IFByb21pc2UucmVzb2x2ZShwYXRoLmluZGV4T2YoJy8nKSA+PSAwID8gZmFsc2UgOiB0cnVlKSk7XG5mdW5jdGlvbiBjcmVhdGUoX3ByZWZpeCwgbG9nVG9GaWxlLCBwYXRoRXhpc3RzKSB7XG4gICAgY29uc3QgY29udGV4dCA9IHtcbiAgICAgICAgbGV2ZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgcHJlZml4OiBfcHJlZml4LFxuICAgICAgICBsb2dUb0ZpbGU6IGxvZ1RvRmlsZSxcbiAgICAgICAgcGF0aEV4aXN0czogcGF0aEV4aXN0c1xuICAgIH07XG4gICAgZnVuY3Rpb24gbGV2ZWwobmV3TGV2ZWxTeW0sIHNldEdsb2JhbExldmVsID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IG5ld0xldmVsID0gZ0xldmVsc1tuZXdMZXZlbFN5bV0gfHwgZ0dsb2JhbExldmVsO1xuICAgICAgICBsZXQgb2xkTGV2ZWwgPSBjb250ZXh0LmxldmVsIHx8IGdHbG9iYWxMZXZlbDtcbiAgICAgICAgaWYgKG5ld0xldmVsU3ltID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5ld0xldmVsID0gb2xkTGV2ZWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV3TGV2ZWxTeW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRleHQubGV2ZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ0xldmVsc1tuZXdMZXZlbFN5bV0pIHtcbiAgICAgICAgICAgIGlmIChzZXRHbG9iYWxMZXZlbCkge1xuICAgICAgICAgICAgICAgIGdHbG9iYWxMZXZlbCA9IG5ld0xldmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5sZXZlbCA9IG5ld0xldmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbXNnID0gYG5ldyAke3NldEdsb2JhbExldmVsID8gJ2dsb2JhbCcgOiBjb250ZXh0LnByZWZpeH0gbG9nIGxldmVsICR7bmV3TGV2ZWwuZGVzYy50b1VwcGVyQ2FzZSgpfSAod2FzICR7b2xkTGV2ZWwuZGVzYy50b1VwcGVyQ2FzZSgpfSlgO1xuICAgICAgICAgICAgb3V0KChuZXdMZXZlbC5zeW0gPT09IG9sZExldmVsLnN5bSkgPyBERUJVRyA6IElORk8sIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvdXQoRVJST1IsIGB1bmtvd24gbGV2ZWwgJHtuZXdMZXZlbFN5bS50b1N0cmluZygpfTsgbG9nIGxldmVsIHJlbWFpbnMgJHtvbGRMZXZlbC5zeW0udG9TdHJpbmcoKX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3TGV2ZWwuc3ltO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZWJ1Zyhtc2csIGxvZzJGaWxlID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgeyByZXR1cm4geWllbGQgb3V0KERFQlVHLCBtc2csIGxvZzJGaWxlKTsgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluZm8obXNnLCBsb2cyRmlsZSA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsgcmV0dXJuIHlpZWxkIG91dChJTkZPLCBtc2csIGxvZzJGaWxlKTsgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdhcm4obXNnLCBsb2cyRmlsZSA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsgcmV0dXJuIHlpZWxkIG91dChXQVJOLCBtc2csIGxvZzJGaWxlKTsgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVycm9yKG1zZywgbG9nMkZpbGUgPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiB5aWVsZCBvdXQoRVJST1IsIG1zZywgbG9nMkZpbGUpOyB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZm9ybWF0KGZtdFN0cikge1xuICAgICAgICBpZiAoZm10U3RyID09PSBudWxsKSB7XG4gICAgICAgICAgICBnRGF0ZUZvcm1hdCA9IGRlZkRhdGVGb3JtYXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZm10U3RyKSB7XG4gICAgICAgICAgICBnRGF0ZUZvcm1hdCA9IGZtdFN0cjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ0RhdGVGb3JtYXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByZWZpeChwcmYpIHtcbiAgICAgICAgaWYgKHByZikge1xuICAgICAgICAgICAgY29udGV4dC5wcmVmaXggPSBwcmY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRleHQucHJlZml4O1xuICAgIH1cbiAgICBmdW5jdGlvbiBvdXQobHZsLCBtc2csIGxvZzJGaWxlID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgY29sb3JzID0geyBbRVJST1JdOiBjb2xvci5yZWQgKyBjb2xvci5ib2xkLCBbV0FSTl06IGNvbG9yLnllbGxvdyArIGNvbG9yLmJvbGQsIFtERUJVR106IGNvbG9yLmJsdWUsIFtJTkZPXTogY29sb3IuZ3JlZW4gfTtcbiAgICAgICAgICAgIGxldCBkZXNjID0gZ0xldmVsc1tsdmxdO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyTGV2ZWwgPSBjb250ZXh0LmxldmVsIHx8IGdHbG9iYWxMZXZlbDtcbiAgICAgICAgICAgIGlmIChkZXNjLmltcG9ydGFuY2UgPj0gZmlsdGVyTGV2ZWwuaW1wb3J0YW5jZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHIgPSBEYXRlXzEuZGF0ZShnRGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgbGV0IGxpbmUgPSAodHlwZW9mIG1zZyA9PT0gJ3N0cmluZycpID8gbXNnIDogaW5zcGVjdChtc2csIDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvZ0xpbmUgPSBgJHtkYXRlU3RyfSAke2NvbnRleHQucHJlZml4fSAke2Rlc2MuZGVzY30gJHtsaW5lfWA7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3JMaW5lID0gYCR7Y29sb3JzW2x2bF0gfHwgJyd9ICR7ZGF0ZVN0cn0gJHtjb250ZXh0LnByZWZpeH0gJHtkZXNjLmRlc2N9ICR7Y29sb3IuY2xlYXJ9ICR7bGluZX1gO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdDb2xvcnMgPyBjb2xvckxpbmUgOiBsb2dMaW5lKTtcbiAgICAgICAgICAgICAgICBpZiAobXNnICYmIG1zZy5zdGFjaykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cuc3RhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZ0xvZ0ZpbGUgJiYgbG9nMkZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGNvbnRleHQubG9nVG9GaWxlKERhdGVfMS5kYXRlKGdMb2dGaWxlKSwgbG9nTGluZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxvZ0ZpbGUoZmlsZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKGZpbGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBnTG9nRmlsZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgaW5mbyhcImRpc2FibGluZyBsb2dmaWxlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZmlsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGVfMS5kYXRlKGdMb2dGaWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGZpbGUuaW5kZXhPZignLycpID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY29udGV4dC5wYXRoRXhpc3RzKGZpbGUpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChleGlzdHMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdMb2dGaWxlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHdhcm4oYHBhdGggJyR7ZmlsZX0nIGRvZXNuJ3QgZXhpc3RzOyBsb2dmaWxlIGRpc2FibGVkYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZ0xvZ0ZpbGUgPSBmaWxlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgaW5mbyhcIm5vdyBsb2dnaW5nIHRvIGZpbGUgXCIgKyBEYXRlXzEuZGF0ZShmaWxlKSk7XG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGdMb2dGaWxlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgZXJyb3IoYGNoZWNraW5nIHBhdGggJHtmaWxlfTsgbG9nZmlsZSBkaXNhYmxlZGApO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGZpbGUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgZmlsZSA9ICdsb2ctJVlZWVktJU1NLSVERC50eHQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnTG9nRmlsZSA9IGZpbGU7XG4gICAgICAgICAgICByZXR1cm4geWllbGQgaW5mbyhnTG9nRmlsZSA/IGBub3cgbG9nZ2luZyB0byBmaWxlICR7RGF0ZV8xLmRhdGUoZ0xvZ0ZpbGUpfWAgOiAnbG9nZmlsZSBkaXNiYWxlZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29uZmlnKGNmZykge1xuICAgICAgICBpZiAoY2ZnLmNvbG9ycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBnQ29sb3JzID0gY2ZnLmNvbG9ycztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2ZnLmZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3JtYXQoY2ZnLmZvcm1hdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNmZy5sZXZlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXZlbChjZmcubGV2ZWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluc3BlY3QobXNnLCBkZXB0aCA9IDMsIGluZGVudCA9ICcgICAnLCBjb2xvcnMpIHtcbiAgICAgICAgZnVuY3Rpb24gX2luc3BlY3QobXNnLCBkZXB0aCwgbGV2ZWwsIGN1cnJJbmRlbnQpIHtcbiAgICAgICAgICAgIGlmIChtc2cgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1zZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtc2cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2Z1bmN0aW9uJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgbXNnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJyR7bXNnfSdgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtc2cgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlcHRoIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG1zZy5sZW5ndGggPT09IHVuZGVmaW5lZCkgPyAney4uLn0nIDogJ1suLi5dJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1zZy5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFske21zZy5tYXAoKGUpID0+IChlID09PSB1bmRlZmluZWQpID8gJycgOiBfaW5zcGVjdChlLCBkZXB0aCAtIDEsIGxldmVsICsgMSwgY3VyckluZGVudCkpLmpvaW4oJywgJyl9XWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBjb2xvcnMgPyBgPGI+PHNwYW4gc3R5bGU9J2NvbG9yOiR7Y29sb3JzW2xldmVsICUgY29sb3JzLmxlbmd0aF19Oyc+YCA6ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZWZpeCA9IGAke2N9JHtjdXJySW5kZW50fSR7aW5kZW50fWA7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zdGZpeCA9IGNvbG9ycyA/ICc8L3NwYW4+PC9iPicgOiAnJztcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3tcXG4nICsgT2JqZWN0LmtleXMobXNnKS5tYXAoayA9PiBgJHtwcmVmaXh9JHtrfSR7cG9zdGZpeH06ICR7X2luc3BlY3QobXNnW2tdLCBkZXB0aCAtIDEsIGxldmVsICsgMSwgY3VyckluZGVudCArIGluZGVudCl9YCkuam9pbignLFxcbicpICsgYFxcbiR7Y3VyckluZGVudH19YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtc2cudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sb3JzKSB7XG4gICAgICAgICAgICBpbmRlbnQgPSBpbmRlbnQucmVwbGFjZSgvIC9nLCAnJm5ic3A7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9pbnNwZWN0KG1zZywgZGVwdGggPT09IG51bGwgPyA5OTkgOiBkZXB0aCwgMCwgJycpO1xuICAgIH1cbiAgICBjb25zdCBuZXdMb2cgPSAocHJlZml4LCBsb2dUb0ZpbGUgPSBjb250ZXh0LmxvZ1RvRmlsZSwgcGF0aEV4aXN0cyA9IGNvbnRleHQucGF0aEV4aXN0cykgPT4gY3JlYXRlKHByZWZpeCwgbG9nVG9GaWxlLCBwYXRoRXhpc3RzKTtcbiAgICBuZXdMb2cuREVCVUcgPSBERUJVRztcbiAgICBuZXdMb2cuSU5GTyA9IElORk87XG4gICAgbmV3TG9nLldBUk4gPSBXQVJOO1xuICAgIG5ld0xvZy5FUlJPUiA9IEVSUk9SO1xuICAgIG5ld0xvZy5sZXZlbCA9IGxldmVsO1xuICAgIG5ld0xvZy5kZWJ1ZyA9IGRlYnVnO1xuICAgIG5ld0xvZy5pbmZvID0gaW5mbztcbiAgICBuZXdMb2cud2FybiA9IHdhcm47XG4gICAgbmV3TG9nLmVycm9yID0gZXJyb3I7XG4gICAgbmV3TG9nLmZvcm1hdCA9IGZvcm1hdDtcbiAgICBuZXdMb2cucHJlZml4ID0gcHJlZml4O1xuICAgIG5ld0xvZy5vdXQgPSBvdXQ7XG4gICAgbmV3TG9nLmxvZ0ZpbGUgPSBsb2dGaWxlO1xuICAgIG5ld0xvZy5jb25maWcgPSBjb25maWc7XG4gICAgbmV3TG9nLmluc3BlY3QgPSBpbnNwZWN0O1xuICAgIHJldHVybiBuZXdMb2c7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2liRzluTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwyeHZaeTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3pzN096czdPenM3T3p0QlFTdEZRU3hwUTBGQmEwTTdRVUZIYkVNc1RVRkJUU3hMUVVGTExFZEJRVWNzVFVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMEZCUnpsQ0xFMUJRVTBzU1VGQlNTeEhRVUZMTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRCUVVjNVFpeE5RVUZOTEVsQlFVa3NSMEZCU3l4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03UVVGSE9VSXNUVUZCVFN4TFFVRkxMRWRCUVVrc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzBGQlJ5OUNMRWxCUVVrc1VVRkJaMElzUTBGQlF6dEJRVk55UWl4TlFVRk5MRTlCUVU4c1IwRkJSenRKUVVOYUxFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVc3NSVUZCUXl4VlFVRlZMRVZCUVVVc1EwRkJReXhGUVVGRkxFZEJRVWNzUlVGQlJTeExRVUZMTEVWQlFVVXNTVUZCU1N4RlFVRkZMRTlCUVU4c1JVRkJRenRKUVVOMFJDeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRk5MRVZCUVVNc1ZVRkJWU3hGUVVGRkxFTkJRVU1zUlVGQlJTeEhRVUZITEVWQlFVVXNTVUZCU1N4RlFVRkhMRWxCUVVrc1JVRkJSU3hOUVVGTkxFVkJRVU03U1VGRGNrUXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJUU3hGUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrc1JVRkJSeXhKUVVGSkxFVkJRVVVzVFVGQlRTeEZRVUZETzBsQlEzSkVMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVXNzUlVGQlF5eFZRVUZWTEVWQlFVVXNRMEZCUXl4RlFVRkZMRWRCUVVjc1JVRkJSU3hMUVVGTExFVkJRVVVzU1VGQlNTeEZRVUZGTEU5QlFVOHNSVUZCUXp0RFFVTjZSQ3hEUVVGRE8wRkJSMFlzU1VGQlNTeFpRVUZaTEVkQlFXRXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wRkJSek5ETEUxQlFVMHNZVUZCWVN4SFFVRkhMRGhDUVVFNFFpeERRVUZETzBGQlEzSkVMRWxCUVVrc1YwRkJWeXhIUVVGUExHRkJRV0VzUTBGQlF6dEJRVWR3UXl4SlFVRkpMRTlCUVU4c1IwRkJSeXhMUVVGTExFTkJRVU03UVVGSGNFSXNUVUZCVFN4TFFVRkxMRWRCUVVjN1NVRkRWaXhIUVVGSExFVkJRVXNzVlVGQlZUdEpRVU5zUWl4TlFVRk5MRVZCUVVVc1ZVRkJWVHRKUVVOc1FpeEpRVUZKTEVWQlFVa3NWVUZCVlR0SlFVTnNRaXhMUVVGTExFVkJRVWNzVlVGQlZUdEpRVU5zUWl4SlFVRkpMRVZCUVVrc1UwRkJVenRKUVVOcVFpeExRVUZMTEVWQlFVY3NVMEZCVXp0RFFVTndRaXhEUVVGRE8wRkJOa2xYTEZGQlFVRXNSMEZCUnl4SFFVRlhMRTFCUVUwc1EwRkJReXhGUVVGRkxFVkJRMmhETEVOQlFVTXNVVUZCWlN4RlFVRkZMRWRCUVZVc1JVRkJhMElzUlVGQlJTeERRVUZETEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUVVNc1UwRkJVeXhEUVVGRExFVkJSVE5GTEVOQlFVTXNTVUZCVnl4RlFVRnRRaXhGUVVGRkxFTkJRVUVzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZGTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZEZGtZc1EwRkJRenRCUVVWR0xGTkJRVk1zVFVGQlRTeERRVUZETEU5QlFXTXNSVUZCUlN4VFFVRnBRaXhGUVVGRkxGVkJRV2xDTzBsQlEyaEZMRTFCUVUwc1QwRkJUeXhIUVVGSE8xRkJRMW9zUzBGQlN5eEZRVUZyUWl4VFFVRlRPMUZCUTJoRExFMUJRVTBzUlVGQlRTeFBRVUZQTzFGQlEyNUNMRk5CUVZNc1JVRkJXU3hUUVVGVE8xRkJRemxDTEZWQlFWVXNSVUZCVlN4VlFVRlZPMHRCUTJwRExFTkJRVU03U1VGRlJpeFRRVUZUTEV0QlFVc3NRMEZCUXl4WFFVRnRRaXhGUVVGRkxHTkJRV01zUjBGQlF5eExRVUZMTzFGQlEzQkVMRWxCUVVrc1VVRkJVU3hIUVVGSExFOUJRVThzUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4WlFVRlpMRU5CUVVNN1VVRkRjRVFzU1VGQlNTeFJRVUZSTEVkQlFVY3NUMEZCVHl4RFFVRkRMRXRCUVVzc1NVRkJTU3haUVVGWkxFTkJRVU03VVVGRE4wTXNTVUZCU1N4WFFVRlhMRXRCUVVzc1UwRkJVeXhGUVVGRk8xbEJRek5DTEZGQlFWRXNSMEZCUnl4UlFVRlJMRU5CUVVNN1UwRkRka0k3WVVGQlRTeEpRVUZKTEZkQlFWY3NTMEZCU3l4SlFVRkpMRVZCUVVVN1dVRkROMElzVDBGQlR5eERRVUZETEV0QlFVc3NSMEZCUnl4VFFVRlRMRU5CUVVNN1UwRkROMEk3WVVGQlRTeEpRVUZKTEU5QlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNc1JVRkJSVHRaUVVNM1FpeEpRVUZKTEdOQlFXTXNSVUZCUlR0blFrRkJSU3haUVVGWkxFZEJRVWNzVVVGQlVTeERRVUZETzJGQlFVVTdhVUpCUXpWQ08yZENRVUZGTEU5QlFVOHNRMEZCUXl4TFFVRkxMRWRCUVVjc1VVRkJVU3hEUVVGRE8yRkJRVVU3V1VGRGFrUXNUVUZCVFN4SFFVRkhMRWRCUVVjc1QwRkJUeXhqUVVGakxFTkJRVUVzUTBGQlF5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJUeXhEUVVGRExFMUJRVTBzWTBGQll5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRmRCUVZjc1JVRkJSU3hUUVVGVExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RlFVRkZMRWRCUVVjc1EwRkJRenRaUVVNM1NTeEhRVUZITEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1IwRkJSeXhMUVVGTExGRkJRVkVzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVFc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNN1UwRkRNVVE3WVVGQlRUdFpRVU5JTEVkQlFVY3NRMEZCUXl4TFFVRkxMRVZCUVVVc1owSkJRV2RDTEZkQlFWY3NRMEZCUXl4UlFVRlJMRVZCUVVVc2RVSkJRWFZDTEZGQlFWRXNRMEZCUXl4SFFVRkhMRU5CUVVNc1VVRkJVU3hGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzFOQlEzUkhPMUZCUTBRc1QwRkJUeXhSUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETzBsQlEzaENMRU5CUVVNN1NVRkZSQ3hUUVVGbExFdEJRVXNzUTBGQlF5eEhRVUZQTEVWQlFVVXNVVUZCVVN4SFFVRkRMRWxCUVVrN09FUkJRVzlDTEU5QlFVOHNUVUZCVFN4SFFVRkhMRU5CUVVNc1MwRkJTeXhGUVVGRkxFZEJRVWNzUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1MwRkJRVHRKUVVONFJ5eFRRVUZsTEVsQlFVa3NRMEZCUXl4SFFVRlBMRVZCUVVVc1VVRkJVU3hIUVVGRExFbEJRVWs3T0VSQlFXOUNMRTlCUVU4c1RVRkJUU3hIUVVGSExFTkJRVU1zU1VGQlNTeEZRVUZGTEVkQlFVY3NSVUZCUlN4UlFVRlJMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UzBGQlFUdEpRVU4wUnl4VFFVRmxMRWxCUVVrc1EwRkJReXhIUVVGUExFVkJRVVVzVVVGQlVTeEhRVUZETEVsQlFVazdPRVJCUVc5Q0xFOUJRVThzVFVGQlRTeEhRVUZITEVOQlFVTXNTVUZCU1N4RlFVRkZMRWRCUVVjc1JVRkJSU3hSUVVGUkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdTMEZCUVR0SlFVTjBSeXhUUVVGbExFdEJRVXNzUTBGQlF5eEhRVUZQTEVWQlFVVXNVVUZCVVN4SFFVRkRMRWxCUVVrN09FUkJRVzlDTEU5QlFVOHNUVUZCVFN4SFFVRkhMRU5CUVVNc1MwRkJTeXhGUVVGRkxFZEJRVWNzUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1MwRkJRVHRKUVVWNFJ5eFRRVUZUTEUxQlFVMHNRMEZCUXl4TlFVRmpPMUZCUXpGQ0xFbEJRVWtzVFVGQlRTeExRVUZMTEVsQlFVa3NSVUZCUlR0WlFVRkZMRmRCUVZjc1IwRkJSeXhoUVVGaExFTkJRVU03VTBGQlJUdGhRVU5vUkN4SlFVRkpMRTFCUVUwc1JVRkJUVHRaUVVGRkxGZEJRVmNzUjBGQlJ5eE5RVUZOTEVOQlFVTTdVMEZCUlR0UlFVTTVReXhQUVVGUExGZEJRVmNzUTBGQlF6dEpRVU4yUWl4RFFVRkRPMGxCUlVRc1UwRkJVeXhOUVVGTkxFTkJRVU1zUjBGQlZ6dFJRVU4yUWl4SlFVRkpMRWRCUVVjc1JVRkJSVHRaUVVGRkxFOUJRVThzUTBGQlF5eE5RVUZOTEVkQlFVY3NSMEZCUnl4RFFVRkRPMU5CUVVVN1VVRkRiRU1zVDBGQlR5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RFFVRkRPMGxCUXpGQ0xFTkJRVU03U1VGRlJDeFRRVUZsTEVkQlFVY3NRMEZCUXl4SFFVRlZMRVZCUVVVc1IwRkJUeXhGUVVGRkxGRkJRVkVzUjBGQlF5eEpRVUZKT3p0WlFVTnFSQ3hOUVVGTkxFMUJRVTBzUjBGQlJ5eEZRVUZGTEVOQlFVTXNTMEZCU3l4RFFVRkRMRVZCUVVVc1MwRkJTeXhEUVVGRExFZEJRVWNzUjBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVVXNTMEZCU3l4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEV0QlFVc3NRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJRenRaUVVNMVNDeEpRVUZKTEVsQlFVa3NSMEZCUnl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGRGVFSXNUVUZCVFN4WFFVRlhMRWRCUVVjc1QwRkJUeXhEUVVGRExFdEJRVXNzU1VGQlNTeFpRVUZaTEVOQlFVTTdXVUZEYkVRc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeEpRVUZKTEZkQlFWY3NRMEZCUXl4VlFVRlZMRVZCUVVVN1owSkJRek5ETEUxQlFVMHNUMEZCVHl4SFFVRkhMRmRCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF6dG5Ra0ZEYkVNc1NVRkJTU3hKUVVGSkxFZEJRVWNzUTBGQlF5eFBRVUZQTEVkQlFVY3NTMEZCU3l4UlFVRlJMRU5CUVVNc1EwRkJRU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTTFSQ3hOUVVGTkxFOUJRVThzUjBGQmQwSXNSMEZCUnl4UFFVRlBMRWxCUVVrc1QwRkJUeXhEUVVGRExFMUJRVTBzU1VGQlNTeEpRVUZKTEVOQlFVTXNTVUZCU1N4SlFVRkpMRWxCUVVrc1JVRkJSU3hEUVVGRE8yZENRVU42Uml4TlFVRk5MRk5CUVZNc1IwRkJSeXhIUVVGSExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCUlN4RlFVRkZMRWxCUVVrc1QwRkJUeXhKUVVGSkxFOUJRVThzUTBGQlF5eE5RVUZOTEVsQlFVa3NTVUZCU1N4RFFVRkRMRWxCUVVrc1NVRkJTU3hMUVVGTExFTkJRVU1zUzBGQlN5eEpRVUZKTEVsQlFVa3NSVUZCUlN4RFFVRkRPMmRDUVVONFJ5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJRU3hEUVVGRExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRuUWtGRE1VTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1IwRkJSeXhEUVVGRExFdEJRVXNzUlVGQlJUdHZRa0ZCUlN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0cFFrRkJSVHRuUWtGRGFrUXNTVUZCU1N4UlFVRlJMRWxCUVVrc1VVRkJVU3hGUVVGRk8yOUNRVU4wUWl4UFFVRlBMRTFCUVUwc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGQlF5eFhRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03YVVKQlF6TkVPMkZCUTBvN1dVRkRSQ3hQUVVGUExGTkJRVk1zUTBGQlF6dFJRVU55UWl4RFFVRkRPMHRCUVVFN1NVRkZSQ3hUUVVGbExFOUJRVThzUTBGQlF5eEpRVUZaT3p0WlFVTXZRaXhKUVVGSkxFbEJRVWtzUzBGQlN5eEpRVUZKTEVWQlFVVTdaMEpCUTJZc1VVRkJVU3hIUVVGSExGTkJRVk1zUTBGQlF6dG5Ra0ZEY2tJc1QwRkJUeXhOUVVGTkxFbEJRVWtzUTBGQlF5eHRRa0ZCYlVJc1EwRkJReXhEUVVGRE8yRkJRekZETzJsQ1FVRk5MRWxCUVVrc1NVRkJTU3hMUVVGTExGTkJRVk1zUlVGQlJUdG5Ra0ZETTBJc1QwRkJUeXhYUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdZVUZEZWtJN2FVSkJRVTBzU1VGQlNTeEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGRkxFTkJRVU1zUlVGQlJUdG5Ra0ZETjBJc1QwRkJUeXhOUVVGTkxFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRPM0ZDUVVOb1F5eEpRVUZKTEVOQlFVTXNRMEZCVHl4TlFVRmpMRVZCUVVVc1JVRkJSVHR2UWtGRE0wSXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSVHQzUWtGRFZDeFJRVUZSTEVkQlFVY3NVMEZCVXl4RFFVRkRPM2RDUVVOeVFpeFBRVUZQTEUxQlFVMHNTVUZCU1N4RFFVRkRMRk5CUVZNc1NVRkJTU3h2UTBGQmIwTXNRMEZCUXl4RFFVRkRPM0ZDUVVONFJUdHZRa0ZEUkN4UlFVRlJMRWRCUVVjc1NVRkJTU3hEUVVGRE8yOUNRVU5vUWl4UFFVRlBMRTFCUVUwc1NVRkJTU3hEUVVGRExITkNRVUZ6UWl4SFFVRkhMRmRCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzJkQ1FVTXpSQ3hEUVVGRExFTkJRVUVzUTBGQlF6dHhRa0ZEUkN4TFFVRkxMRU5CUVVNc1IwRkJVeXhGUVVGRk8yOUNRVU5rTEZGQlFWRXNSMEZCUnl4VFFVRlRMRU5CUVVNN2IwSkJRM0pDTEU5QlFVOHNUVUZCVFN4TFFVRkxMRU5CUVVNc2FVSkJRV2xDTEVsQlFVa3NiMEpCUVc5Q0xFTkJRVU1zUTBGQlF6dG5Ra0ZEYkVVc1EwRkJReXhEUVVGQkxFTkJRVU1zUTBGQlF6dGhRVU5XTzJsQ1FVRk5MRWxCUVVrc1NVRkJTU3hMUVVGTExFVkJRVVVzUlVGQlJUdG5Ra0ZEY0VJc1NVRkJTU3hIUVVGSExIVkNRVUYxUWl4RFFVRkRPMkZCUTJ4RE8ybENRVUZOTzJGQlEwNDdXVUZEUkN4UlFVRlJMRWRCUVVNc1NVRkJTU3hEUVVGRE8xbEJRMlFzVDBGQlR5eE5RVUZOTEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVFc1EwRkJReXhEUVVGRExIVkNRVUYxUWl4WFFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU1zUTBGQlF6dFJRVU01Uml4RFFVRkRPMHRCUVVFN1NVRkZSQ3hUUVVGVExFMUJRVTBzUTBGQlF5eEhRVUZ4UkR0UlFVTnFSU3hKUVVGSkxFZEJRVWNzUTBGQlF5eE5RVUZOTEV0QlFVY3NVMEZCVXl4RlFVRkZPMWxCUVVVc1QwRkJUeXhIUVVGSExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTTdVMEZCUlR0UlFVTnlSQ3hKUVVGSkxFZEJRVWNzUTBGQlF5eE5RVUZOTEV0QlFVY3NVMEZCVXl4RlFVRkZPMWxCUVVVc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0VFFVRkZPMUZCUTI1RUxFbEJRVWtzUjBGQlJ5eERRVUZETEV0QlFVc3NTMEZCUnl4VFFVRlRMRVZCUVVjN1dVRkJSU3hMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMU5CUVVVN1NVRkRja1FzUTBGQlF6dEpRVVZFTEZOQlFWTXNUMEZCVHl4RFFVRkRMRWRCUVU4c1JVRkJSU3hMUVVGTExFZEJRVU1zUTBGQlF5eEZRVUZGTEUxQlFVMHNSMEZCUXl4TFFVRkxMRVZCUVVVc1RVRkJaMEk3VVVGRE4wUXNVMEZCVXl4UlFVRlJMRU5CUVVNc1IwRkJUeXhGUVVGRkxFdEJRVmtzUlVGQlJTeExRVUZaTEVWQlFVVXNWVUZCYVVJN1dVRkRjRVVzU1VGQlNTeEhRVUZITEV0QlFVc3NTVUZCU1N4RlFVRm5RanRuUWtGQlJTeFBRVUZQTEUxQlFVMHNRMEZCUXp0aFFVRkZPMWxCUTJ4RUxFbEJRVWtzUjBGQlJ5eExRVUZMTEZOQlFWTXNSVUZCVnp0blFrRkJSU3hQUVVGUExGZEJRVmNzUTBGQlF6dGhRVUZGTzFsQlEzWkVMRWxCUVVrc1QwRkJUeXhIUVVGSExFdEJRVXNzVlVGQlZTeEZRVUZITzJkQ1FVRkZMRTlCUVU4c1ZVRkJWU3hEUVVGRE8yRkJRVVU3V1VGRGRFUXNTVUZCU1N4UFFVRlBMRWRCUVVjc1MwRkJTeXhSUVVGUkxFVkJRVXM3WjBKQlFVVXNUMEZCVHl4SlFVRkpMRWRCUVVjc1IwRkJSeXhEUVVGRE8yRkJRVVU3V1VGRGRFUXNTVUZCU1N4UFFVRlBMRWRCUVVjc1MwRkJTeXhSUVVGUkxFVkJRVXM3WjBKQlF6VkNMRWxCUVVrc1MwRkJTeXhIUVVGRExFTkJRVU1zUlVGQlJUdHZRa0ZCUlN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFMUJRVTBzUzBGQlJ5eFRRVUZUTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZQTEVOQlFVTTdhVUpCUVVVN1owSkJRM0JGTEVsQlFVa3NSMEZCUnl4RFFVRkRMRTFCUVUwc1MwRkJTeXhUUVVGVExFVkJRVVU3YjBKQlF6RkNMRTlCUVU4c1NVRkJTU3hIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCU3l4RlFVRkRMRVZCUVVVc1EwRkJRU3hEUVVGRExFTkJRVU1zUzBGQlJ5eFRRVUZUTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVFc1JVRkJSU3hEUVVGQkxFTkJRVU1zUTBGQlFTeFJRVUZSTEVOQlFVTXNRMEZCUXl4RlFVRkZMRXRCUVVzc1IwRkJReXhEUVVGRExFVkJRVVVzUzBGQlN5eEhRVUZETEVOQlFVTXNSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRPMmxDUVVNeFJ6dG5Ra0ZEUml4TlFVRk5MRU5CUVVNc1IwRkJTU3hOUVVGTkxFTkJRVUVzUTBGQlF5eERRVUZETEhsQ1FVRjVRaXhOUVVGTkxFTkJRVU1zUzBGQlN5eEhRVUZITEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTTdaMEpCUTNCR0xFMUJRVTBzVFVGQlRTeEhRVUZITEVkQlFVY3NRMEZCUXl4SFFVRkhMRlZCUVZVc1IwRkJSeXhOUVVGTkxFVkJRVVVzUTBGQlF6dG5Ra0ZETlVNc1RVRkJUU3hQUVVGUExFZEJRVWNzVFVGQlRTeERRVUZCTEVOQlFVTXNRMEZCUXl4aFFVRmhMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF6dG5Ra0ZETTBNc1QwRkJUeXhMUVVGTExFZEJRVWNzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRTFCUVUwc1IwRkJSeXhEUVVGRExFZEJRVWNzVDBGQlR5eExRVU40UkN4UlFVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEV0QlFVc3NSMEZCUXl4RFFVRkRMRVZCUVVVc1MwRkJTeXhIUVVGRExFTkJRVU1zUlVGQlJTeFZRVUZWTEVkQlFVTXNUVUZCVFN4RFFVTjRSQ3hGUVVGRkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1MwRkJTeXhWUVVGVkxFZEJRVWNzUTBGQlF6dGhRVU0xUXp0WlFVTkVMRTlCUVU4c1IwRkJSeXhEUVVGRExGRkJRVkVzUlVGQlJTeERRVUZETzFGQlF6RkNMRU5CUVVNN1VVRkRSQ3hKUVVGSkxFMUJRVTBzUlVGQlJUdFpRVUZGTEUxQlFVMHNSMEZCUnl4TlFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXp0VFFVRkZPMUZCUTNoRUxFOUJRVThzVVVGQlVTeERRVUZETEVkQlFVY3NSVUZCUlN4TFFVRkxMRXRCUVVjc1NVRkJTU3hEUVVGQkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRExFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTTdTVUZETTBRc1EwRkJRenRKUVVWRUxFMUJRVTBzVFVGQlRTeEhRVUZQTEVOQlFVTXNUVUZCWVN4RlFVRkZMRmxCUVd0Q0xFOUJRVThzUTBGQlF5eFRRVUZUTEVWQlFVVXNZVUZCYTBJc1QwRkJUeXhEUVVGRExGVkJRVlVzUlVGQlJTeEZRVUZGTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1JVRkJSU3hUUVVGVExFVkJRVVVzVlVGQlZTeERRVUZETEVOQlFVTTdTVUZGZGtvc1RVRkJUU3hEUVVGRExFdEJRVXNzUjBGQlRTeExRVUZMTEVOQlFVTTdTVUZEZUVJc1RVRkJUU3hEUVVGRExFbEJRVWtzUjBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEZGtJc1RVRkJUU3hEUVVGRExFbEJRVWtzUjBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEZGtJc1RVRkJUU3hEUVVGRExFdEJRVXNzUjBGQlRTeExRVUZMTEVOQlFVTTdTVUZEZUVJc1RVRkJUU3hEUVVGRExFdEJRVXNzUjBGQlRTeExRVUZMTEVOQlFVTTdTVUZEZUVJc1RVRkJUU3hEUVVGRExFdEJRVXNzUjBGQlRTeExRVUZMTEVOQlFVTTdTVUZEZUVJc1RVRkJUU3hEUVVGRExFbEJRVWtzUjBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEZGtJc1RVRkJUU3hEUVVGRExFbEJRVWtzUjBGQlR5eEpRVUZKTEVOQlFVTTdTVUZEZGtJc1RVRkJUU3hEUVVGRExFdEJRVXNzUjBGQlRTeExRVUZMTEVOQlFVTTdTVUZEZUVJc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlN5eE5RVUZOTEVOQlFVTTdTVUZEZWtJc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlN5eE5RVUZOTEVOQlFVTTdTVUZEZWtJc1RVRkJUU3hEUVVGRExFZEJRVWNzUjBGQlVTeEhRVUZITEVOQlFVTTdTVUZEZEVJc1RVRkJUU3hEUVVGRExFOUJRVThzUjBGQlNTeFBRVUZQTEVOQlFVTTdTVUZETVVJc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlN5eE5RVUZOTEVOQlFVTTdTVUZEZWtJc1RVRkJUU3hEUVVGRExFOUJRVThzUjBGQlNTeFBRVUZQTEVOQlFVTTdTVUZETVVJc1QwRkJUeXhOUVVGTkxFTkJRVU03UVVGRGJFSXNRMEZCUXlKOSIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciByZWdpc3RlckltbWVkaWF0ZTtcblxuICAgIGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgICAgLy8gQ2FsbGJhY2sgY2FuIGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24oXCJcIiArIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIC8vIENvcHkgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIH1cbiAgICAgIC8vIFN0b3JlIGFuZCByZWdpc3RlciB0aGUgdGFza1xuICAgICAgdmFyIHRhc2sgPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgYXJnczogYXJncyB9O1xuICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHRhc2s7XG4gICAgICByZWdpc3RlckltbWVkaWF0ZShuZXh0SGFuZGxlKTtcbiAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaGFuZGxlKSB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHRhc2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGFzay5jYWxsYmFjaztcbiAgICAgICAgdmFyIGFyZ3MgPSB0YXNrLmFyZ3M7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSWZQcmVzZW50KGhhbmRsZSkge1xuICAgICAgICAvLyBGcm9tIHRoZSBzcGVjOiBcIldhaXQgdW50aWwgYW55IGludm9jYXRpb25zIG9mIHRoaXMgYWxnb3JpdGhtIHN0YXJ0ZWQgYmVmb3JlIHRoaXMgb25lIGhhdmUgY29tcGxldGVkLlwiXG4gICAgICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgICAgIGlmIChjdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgICAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAgICAgICAvLyBcInRvbyBtdWNoIHJlY3Vyc2lvblwiIGVycm9yLlxuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBydW4odGFzayk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsIFwiKlwiKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZShoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaHRtbC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRoaXMgOiBnbG9iYWwgOiBzZWxmKSk7XG4iLCJ2YXIgc2NvcGUgPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwpIHx8XG4gICAgICAgICAgICAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZikgfHxcbiAgICAgICAgICAgIHdpbmRvdztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHNjb3BlLCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1lZGlhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgVG9nZ2xlQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9Ub2dnbGVCdXR0b25cIik7XG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBUb2dnbGVCdXR0b25fMS5Ub2dnbGVCdXR0b24ge1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIG5vZGUuYXR0cnMuZGVzYy5pdGVtcyA9IFtub2RlLmF0dHJzLmRlc2MubmFtZSB8fCAnYnV0dG9uJ107XG4gICAgICAgIHN1cGVyLm9uaW5pdChub2RlKTtcbiAgICAgICAgVG9nZ2xlQnV0dG9uXzEuVG9nZ2xlQnV0dG9uLmVuc3VyZVNlbGVjdGVkKG5vZGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUW5WMGRHOXVMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDBKMWRIUnZiaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFXZERRU3hwUkVGQk9FTTdRVUZsT1VNc1RVRkJZU3hOUVVGUExGTkJRVkVzTWtKQlFWazdTVUZEY0VNc1RVRkJUU3hEUVVGRExFbEJRVmM3VVVGRFpDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFbEJRVWtzVVVGQlVTeERRVUZETEVOQlFVTTdVVUZETTBRc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTnVRaXd5UWtGQldTeERRVUZETEdOQlFXTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOMFF5eERRVUZETzBOQlEwbzdRVUZPUkN4M1FrRk5ReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY2xhc3MgQ29sbGFwc2libGUge1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIG5vZGUuc3RhdGUuaW50aWFsID0gdHJ1ZTtcbiAgICAgICAgbm9kZS5zdGF0ZS5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICBub2RlLnN0YXRlLnRvZ2dsZSA9ICgpID0+IHtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuZXhwYW5kZWQgPSAhbm9kZS5zdGF0ZS5leHBhbmRlZDtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuaW5pdGlhbCA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgY29uc3QgY3NzID0gbm9kZS5hdHRycy5jc3M7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBub2RlLmF0dHJzLmNvbXBvbmVudHM7XG4gICAgICAgIGNvbnN0IHByZUFycm93ID0gbm9kZS5hdHRycy5wcmVBcnJvdztcbiAgICAgICAgY29uc3QgcG9zdEFycm93ID0gbm9kZS5hdHRycy5wb3N0QXJyb3c7XG4gICAgICAgIGlmIChub2RlLnN0YXRlLmluaXRpYWwgJiYgbm9kZS5hdHRycy5pc0V4cGFuZGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuZXhwYW5kZWQgPSBub2RlLmF0dHJzLmlzRXhwYW5kZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXhwQ1NTID0gbm9kZS5zdGF0ZS5leHBhbmRlZCA/ICdocy1jb2xsYXBzaWJsZS1leHBhbmRlZCcgOiAnJztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShgLmhzLWNvbGxhcHNpYmxlICR7Y3NzfWAsIFtcbiAgICAgICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLWNvbGxhcHNpYmxlLXRpdGxlJywgeyBvbmNsaWNrOiBub2RlLnN0YXRlLnRvZ2dsZSB9LCBbXG4gICAgICAgICAgICAgICAgIXByZUFycm93ID8gaHNsYXlvdXRfMS5tKCcnKSA6IGhzbGF5b3V0XzEubShgLmhzLWNvbGxhcHNpYmxlLXByZSAuaHMtY29sbGFwc2libGUtYXJyb3ctJHtub2RlLnN0YXRlLmV4cGFuZGVkID8gJ2Rvd24nIDogJ3JpZ2h0J31gKSxcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzWzBdLFxuICAgICAgICAgICAgICAgICFwb3N0QXJyb3cgPyBoc2xheW91dF8xLm0oJycpIDogaHNsYXlvdXRfMS5tKGAuaHMtY29sbGFwc2libGUtcG9zdCAuaHMtY29sbGFwc2libGUtYXJyb3ctJHtub2RlLnN0YXRlLmV4cGFuZGVkID8gJ2Rvd24nIDogJ2xlZnQnfWApLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBjb21wb25lbnRzWzFdID8gaHNsYXlvdXRfMS5tKGAuaHMtY29sbGFwc2libGUtY29udGVudCAke2V4cENTU31gLCBjb21wb25lbnRzWzFdLm1hcCgoYykgPT4gaHNsYXlvdXRfMS5tKCcnLCBjKSkpIDogdW5kZWZpbmVkXG4gICAgICAgIF0pO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29sbGFwc2libGUgPSBDb2xsYXBzaWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVEyOXNiR0Z3YzJsaWJHVXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12UTI5c2JHRndjMmxpYkdVdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZwUkVFc2RVTkJRVzlETzBGQlJYQkRMRTFCUVdFc1YwRkJWenRKUVVOd1FpeE5RVUZOTEVOQlFVTXNTVUZCVlR0UlFVTmlMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeEhRVUZITEVsQlFVa3NRMEZCUXp0UlFVTjZRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNSMEZCUnl4TFFVRkxMRU5CUVVNN1VVRkROVUlzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRWRCUVVjc1IwRkJSeXhGUVVGRk8xbEJRM0pDTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNN1dVRkRNME1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRWRCUVVjc1MwRkJTeXhEUVVGRE8xRkJReTlDTEVOQlFVTXNRMEZCUXp0SlFVTk9MRU5CUVVNN1NVRkRSQ3hKUVVGSkxFTkJRVU1zU1VGQlZUdFJRVU5ZTEUxQlFVMHNSMEZCUnl4SFFVRlZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETzFGQlEyeERMRTFCUVUwc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWVUZCVlN4RFFVRkRPMUZCUTNwRExFMUJRVTBzVVVGQlVTeEhRVUZMTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRE8xRkJRM1pETEUxQlFVMHNVMEZCVXl4SFFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZETzFGQlEzaERMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhWUVVGVkxFdEJRVWNzVTBGQlV5eEZRVUZGTzFsQlEzcEVMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1ZVRkJWU3hEUVVGRE8xTkJReTlETzFGQlEwUXNUVUZCVFN4TlFVRk5MRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVRXNRMEZCUXl4RFFVRkJMSGxDUVVGNVFpeERRVUZCTEVOQlFVTXNRMEZCUVN4RlFVRkZMRU5CUVVNN1VVRkRhRVVzVDBGQlR5eFpRVUZETEVOQlFVTXNiVUpCUVcxQ0xFZEJRVWNzUlVGQlJTeEZRVUZGTzFsQlF5OUNMRmxCUVVNc1EwRkJReXgxUWtGQmRVSXNSVUZCUlN4RlFVRkZMRTlCUVU4c1JVRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNSVUZCUXl4RlFVRkZPMmRDUVVOeVJDeERRVUZETEZGQlFWRXNRMEZCUVN4RFFVRkRMRU5CUVVNc1dVRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4WlFVRkRMRU5CUVVNc05rTkJRVFpETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGQkxFTkJRVU1zUTBGQlFTeE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRE8yZENRVU42Unl4VlFVRlZMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU5pTEVOQlFVTXNVMEZCVXl4RFFVRkJMRU5CUVVNc1EwRkJReXhaUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRmxCUVVNc1EwRkJReXc0UTBGQk9FTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVUVzUTBGQlF5eERRVUZCTEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU03WVVGRE4wY3NRMEZCUXp0WlFVTkdMRlZCUVZVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlFTeERRVUZETEVOQlFVTXNXVUZCUXl4RFFVRkRMREpDUVVFeVFpeE5RVUZOTEVWQlFVVXNSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCU3l4RlFVRkZMRVZCUVVVc1EwRkJRU3haUVVGRExFTkJRVU1zUlVGQlJTeEZRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zVTBGQlV6dFRRVU14Unl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRE8wTkJRMG83UVVFelFrUXNhME5CTWtKREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jbGFzcyBMYWJlbCB7XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgICAgICBjb25zdCBzdHlsZSA9IG5vZGUuYXR0cnMuc3R5bGUgfHwgJyc7XG4gICAgICAgIGNvbnN0IHRleHQgPSBub2RlLmF0dHJzLnRleHQgfHwgJ3Vuc3BlY2lmaWVkJztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShgLmhzLWxhYmVsICR7Y3NzfWAsIHsgc3R5bGU6IHN0eWxlIH0sIGhzbGF5b3V0XzEubS50cnVzdCh0ZXh0KSk7XG4gICAgfVxufVxuZXhwb3J0cy5MYWJlbCA9IExhYmVsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVEdGaVpXd3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12VEdGaVpXd3VkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGblEwRXNkVU5CUVhkRE8wRkJXWGhETEUxQlFXRXNTMEZCU3p0SlFVTmtMRWxCUVVrc1EwRkJReXhKUVVGWE8xRkJRMW9zVFVGQlRTeEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFbEJRVWtzUlVGQlJTeERRVUZETzFGQlEycERMRTFCUVUwc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVOeVF5eE5RVUZOTEVsQlFVa3NSMEZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzU1VGQlNTeGhRVUZoTEVOQlFVTTdVVUZETDBNc1QwRkJUeXhaUVVGRExFTkJRVU1zWVVGQllTeEhRVUZITEVWQlFVVXNSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJReXhMUVVGTExFVkJRVVVzUlVGQlJTeFpRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRGFrVXNRMEZCUXp0RFFVTktPMEZCVUVRc2MwSkJUME1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IGhzbGF5b3V0XzIgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBSYWRpb0J1dHRvbl8xID0gcmVxdWlyZShcIi4vUmFkaW9CdXR0b25cIik7XG5jbGFzcyBNZW51IGV4dGVuZHMgUmFkaW9CdXR0b25fMS5SYWRpb0J1dHRvbiB7XG4gICAgdmlldyhub2RlKSB7IHJldHVybiBSYWRpb0J1dHRvbl8xLlJhZGlvQnV0dG9uLnZpZXdHcm91cCgnLmhzLW1lbnUnLCBub2RlKTsgfVxufVxuZXhwb3J0cy5NZW51ID0gTWVudTtcbmNsYXNzIE1lbnVQYW5lbCBleHRlbmRzIGhzbGF5b3V0XzIuTGF5b3V0IHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gbm9kZS5hdHRycy5pdGVtcy5pbmRleE9mKG5vZGUuYXR0cnMuZGVmYXVsdEl0ZW0pO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgbGV0IGl0ZW1zID0gbm9kZS5hdHRycy5pdGVtcztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShoc2xheW91dF8yLkxheW91dCwge1xuICAgICAgICAgICAgcm93czogW1wiMzBweFwiLCBcImZpbGxcIl0sXG4gICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgICAgaHNsYXlvdXRfMS5tKE1lbnUsIHsgZGVzYzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGl0ZW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEl0ZW06IG5vZGUuYXR0cnMuZGVmYXVsdEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkOiAoaXRlbSkgPT4gdGhpcy5zZWxlY3RlZCA9IGl0ZW1zLmluZGV4T2YoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgfSB9KSxcbiAgICAgICAgICAgICAgICBoc2xheW91dF8xLm0oaHNsYXlvdXRfMi5MYXlvdXQsIHsgY3NzOiAnLmhzLW1lbnUtcGFuZWwnLCBjb250ZW50OiBub2RlLmF0dHJzLmNvbnRlbnRbdGhpcy5zZWxlY3RlZF0gfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5NZW51UGFuZWwgPSBNZW51UGFuZWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUV1Z1ZFM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OU5aVzUxTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJhMFpCTEhWRFFVRjNRenRCUVVONFF5eDFRMEZCZDBNN1FVRkRlRU1zSzBOQlFUWkRPMEZCWlRkRExFMUJRV0VzU1VGQlN5eFRRVUZSTEhsQ1FVRlhPMGxCUTJwRExFbEJRVWtzUTBGQlF5eEpRVUZYTEVsQlFWY3NUMEZCVHl4NVFrRkJWeXhEUVVGRExGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wTkJReTlGTzBGQlJrUXNiMEpCUlVNN1FVRnJRa1FzVFVGQllTeFRRVUZWTEZOQlFWRXNhVUpCUVUwN1NVRkZha01zVFVGQlRTeERRVUZETEVsQlFWYzdVVUZEWkN4SlFVRkpMRU5CUVVNc1VVRkJVU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMGxCUTNKRkxFTkJRVU03U1VGRFJDeEpRVUZKTEVOQlFVTXNTVUZCVnp0UlFVTmFMRWxCUVVrc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRPMUZCUXpkQ0xFOUJRVThzV1VGQlF5eERRVUZETEdsQ1FVRk5MRVZCUVVVN1dVRkRZaXhKUVVGSkxFVkJRVU1zUTBGQlF5eE5RVUZOTEVWQlFVVXNUVUZCVFN4RFFVRkRPMWxCUTNKQ0xFOUJRVThzUlVGQlF6dG5Ra0ZEU2l4WlFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFVkJRVVVzU1VGQlNTeEZRVUZGTzNkQ1FVTmFMRXRCUVVzc1JVRkJSU3hMUVVGTE8zZENRVU5hTEZkQlFWY3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRVmM3ZDBKQlEyNURMRTlCUVU4c1JVRkJSU3hEUVVGRExFbEJRVmNzUlVGQlJTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1IwRkJSeXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXp0eFFrRkRhRVVzUlVGQlF5eERRVUZETzJkQ1FVTklMRmxCUVVNc1EwRkJReXhwUWtGQlRTeEZRVUZGTEVWQlFVVXNSMEZCUnl4RlFVRkRMR2RDUVVGblFpeEZRVUZGTEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRVZCUVVVc1EwRkJRenRoUVVOc1JqdFRRVU5LTEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNN1EwRkRTanRCUVc1Q1JDdzRRa0Z0UWtNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBUb29sYmFyQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9Ub29sYmFyQnV0dG9uXCIpO1xuY2xhc3MgTW9kYWwge1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIG5vZGUuc3RhdGUuaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKTtcbiAgICAgICAgbm9kZS5zdGF0ZS5zaG93TW9kYWwgPSBmYWxzZTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLnNob3dNb2RhbCA9IHRydWU7XG4gICAgICAgICAgICBoc2xheW91dF8xLm0ucmVkcmF3KCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGRpc21pc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5vZGUuYXR0cnMuZGlzbWlzcykge1xuICAgICAgICAgICAgICAgIG5vZGUuYXR0cnMuZGlzbWlzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB3ID0gbm9kZS5hdHRycy53aWR0aCB8fCAnYXV0byc7XG4gICAgICAgIGNvbnN0IGggPSBub2RlLmF0dHJzLmhlaWdodCB8fCAnYXV0byc7XG4gICAgICAgIGNvbnN0IGF0dHJzID0geyBzdHlsZTogYHdpZHRoOiR7d307IGhlaWdodDoke2h9O2AgfTtcbiAgICAgICAgaWYgKG5vZGUuYXR0cnMuc2V0VHJpZ2dlcikge1xuICAgICAgICAgICAgbm9kZS5hdHRycy5zZXRUcmlnZ2VyKHRyaWdnZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHJlcXVpcmVkIGF0dHJpYnV0ZSBmdW5jdGlvbiAnc2V0VHJpZ2dlcicgaXMgbm90IGRlZmluZWRgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gIW5vZGUuc3RhdGUuc2hvd01vZGFsID8gaHNsYXlvdXRfMS5tKCdzcGFuJykgOiBoc2xheW91dF8xLm0oJy5ocy1tb2RhbC1mcmFtZScsIFtcbiAgICAgICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLW1vZGFsLWJhY2tncm91bmQnLCB7IG9uY2xpY2s6IGRpc21pc3MgfSwgJycpLFxuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKCcuaHMtbW9kYWwtZm9yZWdyb3VuZCcsIGF0dHJzLCAhbm9kZS5hdHRycy5jb250ZW50ID8gJ21vZGFsIHBhbmUnIDogW1xuICAgICAgICAgICAgICAgIG5vZGUuYXR0cnMuY29udGVudCxcbiAgICAgICAgICAgICAgICBoc2xheW91dF8xLm0oVG9vbGJhckJ1dHRvbl8xLlRvb2xiYXJCdXR0b24sIHsgb25jbGljazogZGlzbWlzcywgc3ltYm9sczogVG9vbGJhckJ1dHRvbl8xLlRvb2xiYXJCdXR0b24uZ2V0U3ltYm9sKCdjcm9zcycpIH0pXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKTtcbiAgICB9XG59XG5leHBvcnRzLk1vZGFsID0gTW9kYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUVzlrWVd3dWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZUVzlrWVd3dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZ2UTBFc2RVTkJRVzlETzBGQlEzQkRMRzFFUVVGblJEdEJRVVZvUkN4TlFVRmhMRXRCUVVzN1NVRkRaQ3hOUVVGTkxFTkJRVU1zU1VGQlZUdFJRVU5pTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1JVRkJSU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hIUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF5OURMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eEhRVUZITEV0QlFVc3NRMEZCUXp0SlFVTnFReXhEUVVGRE8wbEJRMFFzU1VGQlNTeERRVUZETEVsQlFWVTdVVUZEV0N4TlFVRk5MRTlCUVU4c1IwRkJSeXhIUVVGSExFVkJRVVU3V1VGRGFrSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhUUVVGVExFZEJRVWNzU1VGQlNTeERRVUZETzFsQlF6VkNMRmxCUVVNc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF6dFJRVU5tTEVOQlFVTXNRMEZCUXp0UlFVTkdMRTFCUVUwc1QwRkJUeXhIUVVGSExFZEJRVWNzUlVGQlJUdFpRVU5xUWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGTkJRVk1zUjBGQlJ5eExRVUZMTEVOQlFVTTdXVUZETjBJc1NVRkJTU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlR0blFrRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMkZCUVVVN1VVRkRja1FzUTBGQlF5eERRVUZETzFGQlEwWXNUVUZCVFN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVsQlFVc3NUVUZCVFN4RFFVRkRPMUZCUTNSRExFMUJRVTBzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hKUVVGSkxFMUJRVTBzUTBGQlF6dFJRVU4wUXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhGUVVGRkxFdEJRVXNzUlVGQlJTeFRRVUZUTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWRCUVVjc1JVRkJReXhEUVVGRE8xRkJRMjVFTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhWUVVGVkxFVkJRVVU3V1VGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRlZCUVZVc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFRRVUZGTzJGQlEzcEVPMWxCUVVVc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eDVSRUZCZVVRc1EwRkJReXhEUVVGRE8xTkJRVVU3VVVGRGFFWXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZCTEVOQlFVTXNRMEZCUXl4WlFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZsQlFVTXNRMEZCUXl4cFFrRkJhVUlzUlVGQlJUdFpRVU16UkN4WlFVRkRMRU5CUVVNc2MwSkJRWE5DTEVWQlFVVXNSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRExFVkJRVVVzUlVGQlJTeERRVUZETzFsQlEyeEVMRmxCUVVNc1EwRkJReXh6UWtGQmMwSXNSVUZCUlN4TFFVRkxMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUVN4RFFVRkRMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEYWtVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTzJkQ1FVTnNRaXhaUVVGRExFTkJRVU1zTmtKQlFXRXNSVUZCUlN4RlFVRkZMRTlCUVU4c1JVRkJSU3hQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZETERaQ1FVRmhMRU5CUVVNc1UwRkJVeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTEVOQlFVTTdZVUZEYmtZc1EwRkJRenRUUVVOTUxFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdRMEZEU2p0QlFUTkNSQ3h6UWtFeVFrTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgaHNsYXlvdXRfMiA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IFNlbGVjdG9yXzEgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNvbnN0IFNlbGVjdG9yXzIgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNsYXNzIE9wdGlvbnNCdXR0b24gZXh0ZW5kcyBTZWxlY3Rvcl8xLlNlbGVjdG9yIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBTZWxlY3Rvcl8xLlNlbGVjdG9yLmluaXQobm9kZSwgU2VsZWN0b3JfMi5hbnlJdGVtcyk7XG4gICAgfVxuICAgIHN0YXRpYyB2aWV3R3JvdXAoY3NzLCBub2RlKSB7XG4gICAgICAgIGNzcyA9IGAke2Nzc30gJHtub2RlLmF0dHJzLmNzcyB8fCAnJ31gO1xuICAgICAgICBjb25zdCBzdHlsZSA9IG5vZGUuYXR0cnMuc3R5bGUgfHwgJyc7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oY3NzLCB7IHN0eWxlOiBzdHlsZSB9LCBoc2xheW91dF8xLm0oaHNsYXlvdXRfMi5MYXlvdXQsIHtcbiAgICAgICAgICAgIGNvbHVtbnM6IFtdLFxuICAgICAgICAgICAgY29udGVudDogbm9kZS5zdGF0ZS5pdGVtcy5tYXAoKGwsIGkpID0+IFNlbGVjdG9yXzEuU2VsZWN0b3IucmVuZGVySXRlbShub2RlLCBpKSlcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHsgcmV0dXJuIE9wdGlvbnNCdXR0b24udmlld0dyb3VwKCcuaHMtb3B0aW9ucy1idXR0b25zJywgbm9kZSk7IH1cbn1cbmV4cG9ydHMuT3B0aW9uc0J1dHRvbiA9IE9wdGlvbnNCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUM0IwYVc5dWMwSjFkSFJ2Ymk1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OVBjSFJwYjI1elFuVjBkRzl1TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJLMEpCTEhWRFFVRjVRenRCUVVONlF5eDFRMEZCZVVNN1FVRkRla01zZVVOQlFUSkRPMEZCUXpORExIbERRVUV5UXp0QlFXdENNME1zVFVGQllTeGhRVUZqTEZOQlFWRXNiVUpCUVZFN1NVRkRka01zVFVGQlRTeERRVUZETEVsQlFWVTdVVUZEWWl4dFFrRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNiVUpCUVZFc1EwRkJReXhEUVVGRE8wbEJRMnhETEVOQlFVTTdTVUZEUkN4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExFZEJRVlVzUlVGQlJTeEpRVUZYTzFGQlEzQkRMRWRCUVVjc1IwRkJSeXhIUVVGSExFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1NVRkJTU3hGUVVGRkxFVkJRVVVzUTBGQlF6dFJRVU4yUXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NTVUZCU1N4RlFVRkZMRU5CUVVNN1VVRkZja01zVDBGQlR5eFpRVUZETEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVNc1MwRkJTeXhGUVVGRExFdEJRVXNzUlVGQlF5eEZRVUZGTEZsQlFVTXNRMEZCUXl4cFFrRkJUU3hGUVVGRk8xbEJRMjVETEU5QlFVOHNSVUZCUlN4RlFVRkZPMWxCUTFnc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVkVzUlVGQlJTeERRVUZSTEVWQlFVVXNSVUZCUlN4RFFVRkRMRzFDUVVGUkxFTkJRVU1zVlVGQlZTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVOMFJpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlNMRU5CUVVNN1NVRkRSQ3hKUVVGSkxFTkJRVU1zU1VGQlZ5eEpRVUZYTEU5QlFVOHNZVUZCWVN4RFFVRkRMRk5CUVZNc1EwRkJReXh4UWtGQmNVSXNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRE5VWTdRVUZrUkN4elEwRmpReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgaHNsYXlvdXRfMiA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IFNlbGVjdG9yXzEgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNsYXNzIFJhZGlvQnV0dG9uIGV4dGVuZHMgU2VsZWN0b3JfMS5TZWxlY3RvciB7XG4gICAgc3RhdGljIHZpZXdHcm91cChjc3MsIG5vZGUpIHtcbiAgICAgICAgY3NzID0gYCR7Y3NzfSAke25vZGUuYXR0cnMuY3NzIHx8ICcnfWA7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gbm9kZS5hdHRycy5zdHlsZSB8fCAnJztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShjc3MsIHsgc3R5bGU6IHN0eWxlIH0sIGhzbGF5b3V0XzEubShoc2xheW91dF8yLkxheW91dCwge1xuICAgICAgICAgICAgY29sdW1uczogW10sXG4gICAgICAgICAgICBjb250ZW50OiBub2RlLnN0YXRlLml0ZW1zLm1hcCgobCwgaSkgPT4gU2VsZWN0b3JfMS5TZWxlY3Rvci5yZW5kZXJJdGVtKG5vZGUsIGkpKVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIHN1cGVyLm9uaW5pdChub2RlKTtcbiAgICAgICAgU2VsZWN0b3JfMS5TZWxlY3Rvci5lbnN1cmVTZWxlY3RlZChub2RlKTtcbiAgICB9XG4gICAgb251cGRhdGUobm9kZSkge1xuICAgICAgICBzdXBlci5vbnVwZGF0ZShub2RlKTtcbiAgICAgICAgU2VsZWN0b3JfMS5TZWxlY3Rvci5lbnN1cmVTZWxlY3RlZChub2RlKTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7IHJldHVybiBSYWRpb0J1dHRvbi52aWV3R3JvdXAoJy5ocy1yYWRpby1idXR0b25zJywgbm9kZSk7IH1cbn1cbmV4cG9ydHMuUmFkaW9CdXR0b24gPSBSYWRpb0J1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVVtRmthVzlDZFhSMGIyNHVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12VW1Ga2FXOUNkWFIwYjI0dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZwUTBFc2RVTkJRVFJETzBGQlF6VkRMSFZEUVVFMFF6dEJRVU0xUXl4NVEwRkJPRU03UVVGclFqbERMRTFCUVdFc1YwRkJXU3hUUVVGUkxHMUNRVUZSTzBsQlEzSkRMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zUjBGQlZTeEZRVUZGTEVsQlFWYzdVVUZEY0VNc1IwRkJSeXhIUVVGSExFZEJRVWNzUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhKUVVGSkxFVkJRVVVzUlVGQlJTeERRVUZETzFGQlEzWkRMRTFCUVUwc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVWeVF5eFBRVUZQTEZsQlFVTXNRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJReXhMUVVGTExFVkJRVU1zUzBGQlN5eEZRVUZETEVWQlFVVXNXVUZCUXl4RFFVRkRMR2xDUVVGTkxFVkJRVVU3V1VGRGJrTXNUMEZCVHl4RlFVRkZMRVZCUVVVN1dVRkRXQ3hQUVVGUExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlVTeEZRVUZGTEVOQlFWRXNSVUZCUlN4RlFVRkZMRU5CUVVNc2JVSkJRVkVzUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xTkJRM1JHTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFJc1EwRkJRenRKUVVORUxFMUJRVTBzUTBGQlF5eEpRVUZYTzFGQlEyUXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU51UWl4dFFrRkJVU3hEUVVGRExHTkJRV01zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTnNReXhEUVVGRE8wbEJRMFFzVVVGQlVTeERRVUZETEVsQlFWYzdVVUZEYUVJc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTnlRaXh0UWtGQlVTeERRVUZETEdOQlFXTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOc1F5eERRVUZETzBsQlEwUXNTVUZCU1N4RFFVRkRMRWxCUVZjc1NVRkJWeXhQUVVGUExGZEJRVmNzUTBGQlF5eFRRVUZUTEVOQlFVTXNiVUpCUVcxQ0xFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPME5CUTNoR08wRkJia0pFTEd0RFFXMUNReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuZnVuY3Rpb24gb25lT2ZJdGVtcyhpdGVtcywgdGl0bGUpIHtcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uaXNTZWxlY3RlZCA9IChpdGVtLnRpdGxlID09PSB0aXRsZSk7XG4gICAgfSk7XG4gICAgaWYgKCFpdGVtcy5zb21lKChpdGVtKSA9PiBpdGVtLmlzU2VsZWN0ZWQpKSB7XG4gICAgICAgIGl0ZW1zWzBdLmlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlzU2VsZWN0ZWQpWzBdO1xufVxuZXhwb3J0cy5vbmVPZkl0ZW1zID0gb25lT2ZJdGVtcztcbmZ1bmN0aW9uIGFueUl0ZW1zKGl0ZW1zLCB0aXRsZSkge1xuICAgIGl0ZW1zW3RpdGxlXS5pc1NlbGVjdGVkID0gIWl0ZW1zW3RpdGxlXS5pc1NlbGVjdGVkO1xuICAgIHJldHVybiBpdGVtc1t0aXRsZV07XG59XG5leHBvcnRzLmFueUl0ZW1zID0gYW55SXRlbXM7XG5jbGFzcyBTZWxlY3RvciB7XG4gICAgc3RhdGljIHVwZGF0ZUl0ZW1zKG5vZGUpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBub2RlLmF0dHJzLmRlc2MuaXRlbXMgfHwgW107XG4gICAgICAgIGl0ZW1zLm1hcCgoaXRtLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbm9kZS5zdGF0ZS5pdGVtc1tpdG1dIHx8IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaXRtLFxuICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5pdGVtc1tpXSA9IGl0ZW07XG4gICAgICAgICAgICBub2RlLnN0YXRlLml0ZW1zW2l0bV0gPSBpdGVtO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGluaXQobm9kZSwgbW9kZWwgPSBvbmVPZkl0ZW1zKSB7XG4gICAgICAgIG5vZGUuc3RhdGUudXBkYXRlTW9kZWwgPSBtb2RlbDtcbiAgICAgICAgbm9kZS5zdGF0ZS5pdGVtcyA9IFtdO1xuICAgICAgICBub2RlLnN0YXRlLmV2ZW50cyA9IHt9O1xuICAgICAgICBub2RlLnN0YXRlLml0ZW1DbGlja2VkID0gKGl0ZW0pID0+IGl0ZW07XG4gICAgICAgIG5vZGUuc3RhdGUuZGVmYXVsdEl0ZW0gPSBub2RlLmF0dHJzLmRlc2MuZGVmYXVsdEl0ZW07XG4gICAgICAgIG5vZGUuc3RhdGUuZXZlbnRzLm1vdXNlRG93biA9IG5vZGUuYXR0cnMuZGVzYy5tb3VzZURvd247XG4gICAgICAgIG5vZGUuc3RhdGUuZXZlbnRzLm1vdXNlVXAgPSBub2RlLmF0dHJzLmRlc2MubW91c2VVcDtcbiAgICAgICAgbm9kZS5hdHRycy5kZXNjLmNsaWNrZWQgPSBub2RlLmF0dHJzLmRlc2MuY2xpY2tlZCB8fCAoKGl0ZW0pID0+IGNvbnNvbGUubG9nKGBtaXNzaW5nIGNsaWNrZWQoKSBmdW5jdGlvbiBmb3Igc2VsZWN0b3IgaXRlbSAke2l0ZW19YCkpO1xuICAgICAgICBub2RlLnN0YXRlLmV2ZW50cy5jbGlja2VkID0gbm9kZS5hdHRycy5kZXNjLmNsaWNrZWQ7XG4gICAgICAgIFNlbGVjdG9yLnVwZGF0ZUl0ZW1zKG5vZGUpO1xuICAgIH1cbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBTZWxlY3Rvci5pbml0KG5vZGUpO1xuICAgIH1cbiAgICBvbnVwZGF0ZShub2RlKSB7XG4gICAgICAgIFNlbGVjdG9yLnVwZGF0ZUl0ZW1zKG5vZGUpO1xuICAgIH1cbiAgICBzdGF0aWMgZW5zdXJlU2VsZWN0ZWQobm9kZSkge1xuICAgICAgICBpZiAoIW5vZGUuc3RhdGUuaXRlbXMuc29tZSgoaSkgPT4gaS5pc1NlbGVjdGVkKSAmJiBub2RlLnN0YXRlLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChub2RlLnN0YXRlLmRlZmF1bHRJdGVtICYmIG5vZGUuc3RhdGUuaXRlbXNbbm9kZS5zdGF0ZS5kZWZhdWx0SXRlbV0pIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0YXRlLml0ZW1zW25vZGUuc3RhdGUuZGVmYXVsdEl0ZW1dLmlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobm9kZS5zdGF0ZS5pdGVtcykge1xuICAgICAgICAgICAgICAgIG5vZGUuc3RhdGUuaXRlbXNbMF0uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIHJlbmRlckl0ZW0obm9kZSwgaSkge1xuICAgICAgICBjb25zdCByZWFjdG9yID0gKGNhbGxiYWNrKSA9PiAodGl0bGUpID0+IHtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUudXBkYXRlTW9kZWwobm9kZS5zdGF0ZS5pdGVtcywgdGl0bGUpO1xuICAgICAgICAgICAgdGl0bGUgPSBub2RlLnN0YXRlLml0ZW1DbGlja2VkKHRpdGxlKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYGlsbGVnYWwgcmVuZGVyIGluZGV4ICR7aX0gJHtub2RlLnN0YXRlLml0ZW1zLm1hcCgoaSkgPT4gaS50aXRsZSkuam9pbignfCcpfWApO1xuICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbSA9IG5vZGUuc3RhdGUuaXRlbXNbaV07XG4gICAgICAgIGNvbnN0IHRpdGxlID0gaXRlbS50aXRsZSB8fCAnJztcbiAgICAgICAgY29uc3QgaXRlbUNzcyA9IGl0ZW0uY3NzIHx8ICcnO1xuICAgICAgICByZXR1cm4gcmVuZGVyU2VsZWN0YWJsZSh7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICBjc3M6IGl0ZW1Dc3MsXG4gICAgICAgICAgICBpc1NlbGVjdGVkOiBub2RlLnN0YXRlLml0ZW1zW3RpdGxlXSA/IG5vZGUuc3RhdGUuaXRlbXNbdGl0bGVdLmlzU2VsZWN0ZWQgOiBmYWxzZSxcbiAgICAgICAgICAgIG1vdXNlRG93bjogbm9kZS5zdGF0ZS5ldmVudHMubW91c2VEb3duLFxuICAgICAgICAgICAgbW91c2VVcDogbm9kZS5zdGF0ZS5ldmVudHMubW91c2VVcCxcbiAgICAgICAgICAgIGNsaWNrZWQ6IHJlYWN0b3Iobm9kZS5zdGF0ZS5ldmVudHMuY2xpY2tlZClcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5TZWxlY3RvciA9IFNlbGVjdG9yO1xuZnVuY3Rpb24gcmVuZGVyU2VsZWN0YWJsZShkKSB7XG4gICAgY29uc3Qgb25jbGljayA9IGQuY2xpY2tlZCA/ICgpID0+IHsgZC5jbGlja2VkKGQudGl0bGUpOyB9IDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG9ubW91c2Vkb3duID0gZC5tb3VzZURvd24gPyAoKSA9PiB7IGQubW91c2VEb3duKGQudGl0bGUpOyB9IDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG9ubW91c2V1cCA9IGQubW91c2VVcCA/ICgpID0+IHsgZC5tb3VzZVVwKGQudGl0bGUpOyB9IDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBoc2xheW91dF8xLm0oYC5ocy1zZWxlY3RhYmxlICR7ZC5jc3MgfHwgJyd9ICR7ZC5pc1NlbGVjdGVkID8gJ2hzLXNlbGVjdGVkJyA6ICcnfWAsIHsgc3R5bGU6IGQuc3R5bGUsIG9uY2xpY2s6IG9uY2xpY2ssIG9ubW91c2Vkb3duOiBvbm1vdXNlZG93biwgb25tb3VzZXVwOiBvbm1vdXNldXAgfSwgZC50aXRsZSk7XG59XG5leHBvcnRzLnJlbmRlclNlbGVjdGFibGUgPSByZW5kZXJTZWxlY3RhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVTJWc1pXTjBiM0l1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdlUyVnNaV04wYjNJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZ4UWtFc2RVTkJRVzlETzBGQkswTndReXhUUVVGblFpeFZRVUZWTEVOQlFVTXNTMEZCYzBJc1JVRkJSU3hMUVVGWk8wbEJRek5FTEV0QlFVc3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJReXhKUVVGdFFpeEZRVUZGTEVWQlFVVTdVVUZEYkVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRXRCUVVjc1MwRkJTeXhEUVVGRExFTkJRVU03U1VGRE0wTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRWxCUVcxQ0xFVkJRVVVzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1JVRkJSVHRSUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4VlFVRlZMRWRCUVVjc1NVRkJTU3hEUVVGRE8wdEJRVVU3U1VGRE1VWXNUMEZCVHl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zU1VGQmJVSXNSVUZCUlN4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTNKRkxFTkJRVU03UVVGT1JDeG5RMEZOUXp0QlFVMUVMRk5CUVdkQ0xGRkJRVkVzUTBGQlF5eExRVUZ6UWl4RlFVRkZMRXRCUVZrN1NVRkRla1FzUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRlZCUVZVc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4VlFVRlZMRU5CUVVNN1NVRkRia1FzVDBGQlR5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1FVRkRlRUlzUTBGQlF6dEJRVWhFTERSQ1FVZERPMEZCY1VKRUxFMUJRWE5DTEZGQlFWRTdTVUZMTVVJc1RVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZWTzFGQlEzcENMRTFCUVUwc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1NVRkJTU3hGUVVGRkxFTkJRVU03VVVGRE1VTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFZEJRVlVzUlVGQlJTeERRVUZSTEVWQlFVVXNSVUZCUlR0WlFVTXZRaXhOUVVGTkxFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNUdG5Ra0ZEYkVNc1MwRkJTeXhGUVVGRkxFZEJRVWM3WjBKQlExWXNWVUZCVlN4RlFVRkZMRXRCUVVzN1lVRkRjRUlzUTBGQlF6dFpRVU5HTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXp0WlFVTXpRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU03VVVGRGFrTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRE8wbEJWMFFzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRlhMRVZCUVVVc1MwRkJTeXhIUVVGRExGVkJRVlU3VVVGRGNrTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFZEJRVWNzUzBGQlN5eERRVUZETzFGQlF5OUNMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEhRVUZ4UWl4RlFVRkZMRU5CUVVNN1VVRkRlRU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJRM1pDTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1YwRkJWeXhIUVVGSExFTkJRVU1zU1VGQlZ5eEZRVUZGTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNN1VVRkRMME1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WFFVRlhMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRPMUZCUTNKRUxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRk5CUVZNc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNN1VVRkRlRVFzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1QwRkJUeXhIUVVGTExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJRenRSUVVOMFJDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFZEJRVThzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZYTEVWQlFVVXNSVUZCUlN4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zWjBSQlFXZEVMRWxCUVVrc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5vU2l4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVkQlFVc3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETzFGQlEzUkVMRkZCUVZFc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTVUZETDBJc1EwRkJRenRKUVVWRUxFMUJRVTBzUTBGQlF5eEpRVUZYTzFGQlEyUXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU40UWl4RFFVRkRPMGxCUTBRc1VVRkJVU3hEUVVGRExFbEJRVmM3VVVGRGFFSXNVVUZCVVN4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU12UWl4RFFVRkRPMGxCVDFNc1RVRkJUU3hEUVVGRExHTkJRV01zUTBGQlF5eEpRVUZYTzFGQlEzWkRMRWxCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGblFpeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hIUVVGRExFTkJRVU1zUlVGQlJUdFpRVU40Uml4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVjBGQlZ5eEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWMEZCVnl4RFFVRkRMRVZCUVVVN1owSkJRM0JGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF6dGhRVU01UkR0cFFrRkJUU3hKUVVGSkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RlFVRkZPMmRDUVVONlFpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eFZRVUZWTEVkQlFVY3NTVUZCU1N4RFFVRkRPMkZCUTNwRE8xTkJRMG83U1VGRFRDeERRVUZETzBsQlVWTXNUVUZCVFN4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGWExFVkJRVVVzUTBGQlVUdFJRVU0zUXl4TlFVRk5MRTlCUVU4c1IwRkJSeXhEUVVGRExGRkJRVEpDTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNc1MwRkJXU3hGUVVGRkxFVkJRVVU3V1VGRE9VUXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03V1VGRGFFUXNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVjBGQlZ5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMWxCUTNSRExFbEJRVWtzVDBGQlR5eFJRVUZSTEV0QlFVc3NWVUZCVlN4RlFVRkZPMmRDUVVOb1F5eFJRVUZSTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1lVRkRia0k3VVVGRFRDeERRVUZETEVOQlFVTTdVVUZEUml4SlFVRkpMRU5CUVVNc1IwRkJReXhEUVVGRExFVkJRVVU3V1VGQlJTeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMSGRDUVVGM1FpeERRVUZETEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCU3l4RlFVRkRMRVZCUVVVc1EwRkJRU3hEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF6dFpRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1UwRkJSVHRSUVVOcVNDeE5RVUZOTEVsQlFVa3NSMEZCYTBJc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRhRVFzVFVGQlRTeExRVUZMTEVkQlFWVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1NVRkJTU3hGUVVGRkxFTkJRVU03VVVGRGRFTXNUVUZCVFN4UFFVRlBMRWRCUVVjc1NVRkJTU3hEUVVGRExFZEJRVWNzU1VGQlNTeEZRVUZGTEVOQlFVTTdVVUZITDBJc1QwRkJUeXhuUWtGQlowSXNRMEZCUXp0WlFVTndRaXhMUVVGTExFVkJRVVVzUzBGQlN6dFpRVU5hTEVkQlFVY3NSVUZCUlN4UFFVRlBPMWxCUlZvc1ZVRkJWU3hGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzN1dVRkRMMFVzVTBGQlV5eEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExGTkJRVk03V1VGRGRFTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEU5QlFVODdXVUZEYkVNc1QwRkJUeXhGUVVGRkxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU03VTBGRE9VTXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJRenREUVVWS08wRkJOVVpFTERSQ1FUUkdRenRCUVZGRUxGTkJRV2RDTEdkQ1FVRm5RaXhEUVVGRExFTkJRV2RDTzBsQlF6ZERMRTFCUVUwc1QwRkJUeXhIUVVGVExFTkJRVU1zUTBGQlF5eFBRVUZQTEVOQlFVRXNRMEZCUXl4RFFVRkhMRWRCUVVjc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZITEVOQlFVTXNRMEZCUXl4VFFVRlRMRU5CUVVNN1NVRkRMMFVzVFVGQlRTeFhRVUZYTEVkQlFVc3NRMEZCUXl4RFFVRkRMRk5CUVZNc1EwRkJRU3hEUVVGRExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExGTkJRVk1zUTBGQlF6dEpRVU12UlN4TlFVRk5MRk5CUVZNc1IwRkJUeXhEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZCTEVOQlFVTXNRMEZCUnl4SFFVRkhMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlJ5eERRVUZETEVOQlFVTXNVMEZCVXl4RFFVRkRPMGxCUXk5RkxFOUJRVThzV1VGQlF5eERRVUZETEd0Q1FVRnJRaXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNc1ZVRkJWU3hEUVVGQkxFTkJRVU1zUTBGQlFTeGhRVUZoTEVOQlFVRXNRMEZCUXl4RFFVRkRMRVZCUVVVc1JVRkJSU3hGUVVOMFJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4RFFVRkRMRU5CUVVNc1MwRkJTeXhGUVVGRkxFOUJRVThzUlVGQlF5eFBRVUZQTEVWQlFVVXNWMEZCVnl4RlFVRkRMRmRCUVZjc1JVRkJSU3hUUVVGVExFVkJRVU1zVTBGQlV5eEZRVUZGTEVWQlEycEdMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRMVlzUTBGQlF6dEJRVU5PTEVOQlFVTTdRVUZTUkN3MFEwRlJReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY2xhc3MgU2xpZGVyIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBub2RlLnN0YXRlLnJhbmdlID0gW107XG4gICAgICAgIG5vZGUuc3RhdGUudmFsdWUgPSAwLjU7XG4gICAgICAgIG5vZGUuc3RhdGUubW91c2UgPSAtMTtcbiAgICAgICAgbm9kZS5zdGF0ZS5zbGlkZXIgPSAwO1xuICAgICAgICBub2RlLnN0YXRlLm5vdGlmaWVkID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUub25jaGFuZ2UgPSAoKSA9PiB7IH07XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBpZCA9IG5vZGUuYXR0cnMuaWQ7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgICAgICBub2RlLnN0YXRlLnJhbmdlID0gbm9kZS5hdHRycy5yYW5nZSB8fCBbXTtcbiAgICAgICAgbm9kZS5zdGF0ZS5vbmNoYW5nZSA9IG5vZGUuYXR0cnMub25jaGFuZ2U7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oYC5ocy1zbGlkZXIgJHtjc3N9YCwge1xuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgb25tb3VzZWRvd246IChlKSA9PiBtb3VzZWRvd24oZSwgbm9kZSksXG4gICAgICAgICAgICBvbm1vdXNlbW92ZTogKGUpID0+IG1vdXNlbW92ZShlLCBub2RlKSxcbiAgICAgICAgICAgIG9ubW91c2V1cDogKGUpID0+IG1vdXNldXAoZSwgbm9kZSksXG4gICAgICAgICAgICBvbm1vdXNlb3V0OiAoZSkgPT4gbW91c2VvdXQoZSwgbm9kZSlcbiAgICAgICAgfSwgW3JlbmRlclNsaWRlcihub2RlKV0pO1xuICAgIH1cbn1cbmV4cG9ydHMuU2xpZGVyID0gU2xpZGVyO1xuZnVuY3Rpb24gcmVuZGVyU2xpZGVyKG5vZGUpIHtcbiAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCcuaHMtc2xpZGVyLXNsb3QnLCBbXG4gICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1tYXJrZXJzJywgbm9kZS5zdGF0ZS5yYW5nZS5tYXAocmVuZGVyTWFya2VyKSksXG4gICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1oYW5kbGUnLCB7IHN0eWxlOiBgbGVmdDokezEwMCAqIG5vZGUuc3RhdGUudmFsdWV9JWAgfSlcbiAgICBdKTtcbn1cbmZ1bmN0aW9uIHJlbmRlck1hcmtlcih2YWx1ZSwgaSwgbWFya2Vycykge1xuICAgIGNvbnN0IHNoYXJlID0gaSAvIChtYXJrZXJzLmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IGxlZnQgPSBtYXJrZXJzLmxlbmd0aCA8IDIgPyAwIDogMTAwICogc2hhcmU7XG4gICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1tYXJrZXInLCB7IHN0eWxlOiBgbGVmdDogJHtsZWZ0fSVgIH0sIHJlbmRlckxhYmVsKHZhbHVlKSk7XG59XG5mdW5jdGlvbiByZW5kZXJMYWJlbCh2YWx1ZSkge1xuICAgIHJldHVybiBoc2xheW91dF8xLm0oJy5ocy1zbGlkZXItbGFiZWwnLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBnZXRUYXJnZXRPZmZzZXQoZSkge1xuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBsZXQgbGVmdE9mZnNldCA9IDA7XG4gICAgd2hpbGUgKHRhcmdldC5jbGFzc05hbWUudHJpbSgpICE9PSBlLmN1cnJlbnRUYXJnZXQuY2xhc3NOYW1lLnRyaW0oKSkge1xuICAgICAgICBsZWZ0T2Zmc2V0ICs9IHRhcmdldC5vZmZzZXRMZWZ0O1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZnRPZmZzZXQgLSB0YXJnZXQubGFzdENoaWxkLm9mZnNldExlZnQ7XG59XG5mdW5jdGlvbiBnZXRWYWx1ZShlLCBub2RlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc2xvdFdpZHRoID0gZS5jdXJyZW50VGFyZ2V0Lmxhc3RDaGlsZC5jbGllbnRXaWR0aDtcbiAgICBub2RlLnN0YXRlLnZhbHVlID0gKGUuY2xpZW50WCAtIG5vZGUuc3RhdGUubW91c2UpIC8gc2xvdFdpZHRoICsgbm9kZS5zdGF0ZS5zbGlkZXI7XG4gICAgcmV0dXJuIG5vdGlmeShub2RlKTtcbn1cbmZ1bmN0aW9uIG1vdXNlZG93bihlLCBub2RlKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gZ2V0VGFyZ2V0T2Zmc2V0KGUpO1xuICAgIG5vZGUuc3RhdGUubW91c2UgPSBlLmNsaWVudFg7XG4gICAgaWYgKFsnaHMtc2xpZGVyJywgJ2hzLXNsaWRlci1zbG90J10uaW5kZXhPZihlLnRhcmdldC5jbGFzc05hbWUudHJpbSgpKSA+PSAwKSB7XG4gICAgICAgIGNvbnN0IHNsb3RXaWR0aCA9IGUuY3VycmVudFRhcmdldC5sYXN0Q2hpbGQuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhhbmRsZVdpZHRoID0gZS5jdXJyZW50VGFyZ2V0Lmxhc3RDaGlsZC5sYXN0Q2hpbGQuY2xpZW50V2lkdGg7XG4gICAgICAgIG5vZGUuc3RhdGUubW91c2UgLT0gaGFuZGxlV2lkdGggLyAyO1xuICAgICAgICBub2RlLnN0YXRlLnZhbHVlID0gKGUub2Zmc2V0WCAtIGhhbmRsZVdpZHRoIC8gMiArIG9mZnNldCkgLyBzbG90V2lkdGg7XG4gICAgfVxuICAgIG5vZGUuc3RhdGUuc2xpZGVyID0gbm9kZS5zdGF0ZS52YWx1ZTtcbiAgICBnZXRWYWx1ZShlLCBub2RlKTtcbn1cbmZ1bmN0aW9uIG1vdXNlbW92ZShlLCBub2RlKSB7XG4gICAgaWYgKG5vZGUuc3RhdGUubW91c2UgPiAwKSB7XG4gICAgICAgIGdldFZhbHVlKGUsIG5vZGUpO1xuICAgICAgICBpZiAobm9kZS5zdGF0ZS52YWx1ZSA+IDEgfHwgbm9kZS5zdGF0ZS52YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIG1vdXNldXAoZSwgbm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBtb3VzZXVwKGUsIG5vZGUpIHtcbiAgICBpZiAobm9kZS5zdGF0ZS5tb3VzZSA+IDApIHtcbiAgICAgICAgbm9kZS5zdGF0ZS52YWx1ZSA9IGdldFZhbHVlKGUsIG5vZGUpO1xuICAgICAgICBub2RlLnN0YXRlLm1vdXNlID0gLTE7XG4gICAgfVxufVxuZnVuY3Rpb24gbW91c2VvdXQoZSwgbm9kZSkge1xuICAgIGlmIChub2RlLnN0YXRlLm1vdXNlID4gMCAmJiBlLnRhcmdldC5jbGFzc05hbWUudHJpbSgpID09PSAnaHMtc2xpZGVyJykge1xuICAgICAgICBtb3VzZXVwKGUsIG5vZGUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG5vdGlmeShub2RlKSB7XG4gICAgaWYgKChub2RlLnN0YXRlLnJhbmdlLmxlbmd0aCA+IDEpICYmICh0eXBlb2Ygbm9kZS5zdGF0ZS5yYW5nZVswXSA9PT0gJ3N0cmluZycpKSB7XG4gICAgICAgIGNvbnN0IHYgPSBNYXRoLmZsb29yKG5vZGUuc3RhdGUudmFsdWUgKiAobm9kZS5zdGF0ZS5yYW5nZS5sZW5ndGggLSAxKSArIDAuNSk7XG4gICAgICAgIGlmIChub2RlLnN0YXRlLm5vdGlmaWVkICE9PSBub2RlLnN0YXRlLnJhbmdlW3ZdKSB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLm9uY2hhbmdlKG5vZGUuc3RhdGUucmFuZ2Vbdl0pO1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5ub3RpZmllZCA9IG5vZGUuc3RhdGUucmFuZ2Vbdl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHYgLyAobm9kZS5zdGF0ZS5yYW5nZS5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IG51bVJhbmdlID0gbm9kZS5zdGF0ZS5yYW5nZTtcbiAgICAgICAgY29uc3QgdiA9IE1hdGguZmxvb3IoKG51bVJhbmdlWzBdICogKDEgLSBub2RlLnN0YXRlLnZhbHVlKSArIG51bVJhbmdlWzFdICogbm9kZS5zdGF0ZS52YWx1ZSkgKiAxMDApIC8gMTAwO1xuICAgICAgICBub2RlLnN0YXRlLm9uY2hhbmdlKE1hdGgubWluKG5vZGUuc3RhdGUucmFuZ2VbMV0sIE1hdGgubWF4KG5vZGUuc3RhdGUucmFuZ2VbMF0sIHYpKSk7XG4gICAgICAgIHJldHVybiBub2RlLnN0YXRlLnZhbHVlO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVUyeHBaR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwxTnNhV1JsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVEJEUVN4MVEwRkJiME03UVVGdlFuQkRMRTFCUVdFc1RVRkJUVHRKUVVObUxFMUJRVTBzUTBGQlF5eEpRVUZWTzFGQlEySXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFZEJRV2RDTEVWQlFVVXNRMEZCUXp0UlFVTnVReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4SFFVRkhMRU5CUVVNN1VVRkRka0lzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGRFSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETzFGQlEzUkNMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTjZRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNSMEZCUnl4SFFVRkhMRVZCUVVVc1IwRkJSU3hEUVVGRExFTkJRVU03U1VGRGRrTXNRMEZCUXp0SlFVTkhMRWxCUVVrc1EwRkJReXhKUVVGWE8xRkJRMW9zVFVGQlRTeEZRVUZGTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhGUVVGRkxFTkJRVU03VVVGRGVrSXNUVUZCVFN4SFFVRkhMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVsQlFVa3NSVUZCUlN4RFFVRkRPMUZCUTJwRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVTXhReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF6dFJRVU14UXl4UFFVRlBMRmxCUVVNc1EwRkJReXhqUVVGakxFZEJRVWNzUlVGQlJTeEZRVUZGTzFsQlF6RkNMRVZCUVVVc1JVRkJReXhGUVVGRk8xbEJRMHdzVjBGQlZ5eEZRVUZETEVOQlFVTXNRMEZCU3l4RlFVRkZMRVZCUVVVc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXp0WlFVTjZReXhYUVVGWExFVkJRVU1zUTBGQlF5eERRVUZMTEVWQlFVVXNSVUZCUlN4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRExFVkJRVVVzU1VGQlNTeERRVUZETzFsQlEzcERMRk5CUVZNc1JVRkJReXhEUVVGRExFTkJRVXNzUlVGQlNTeEZRVUZGTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU03V1VGRGRrTXNWVUZCVlN4RlFVRkRMRU5CUVVNc1EwRkJTeXhGUVVGSExFVkJRVVVzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJRenRUUVVNelF5eEZRVU5FTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU14UWl4RFFVRkRPME5CUjBvN1FVRjZRa1FzZDBKQmVVSkRPMEZCUlVRc1UwRkJVeXhaUVVGWkxFTkJRVU1zU1VGQlZUdEpRVU0xUWl4UFFVRlBMRmxCUVVNc1EwRkJReXhwUWtGQmFVSXNSVUZCUlR0UlFVTjRRaXhaUVVGRExFTkJRVU1zYjBKQlFXOUNMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRE8xRkJRek5FTEZsQlFVTXNRMEZCUXl4dFFrRkJiVUlzUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4UlFVRlJMRWRCUVVjc1IwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4RlFVRkZMRU5CUVVNN1MwRkRja1VzUTBGQlF5eERRVUZETzBGQlExQXNRMEZCUXp0QlFVVkVMRk5CUVZNc1dVRkJXU3hEUVVGRExFdEJRVzlDTEVWQlFVVXNRMEZCVVN4RlFVRkZMRTlCUVcxQ08wbEJRM0pGTEUxQlFVMHNTMEZCU3l4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eE5RVUZOTEVkQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRja01zVFVGQlRTeEpRVUZKTEVkQlFVY3NUMEZCVHl4RFFVRkRMRTFCUVUwc1IwRkJReXhEUVVGRExFTkJRVUVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhIUVVGRExFdEJRVXNzUTBGQlF6dEpRVU0zUXl4UFFVRlBMRmxCUVVNc1EwRkJReXh0UWtGQmJVSXNSVUZCUlN4RlFVRkRMRXRCUVVzc1JVRkJSU3hUUVVGVExFbEJRVWtzUjBGQlJ5eEZRVUZETEVWQlFVVXNWMEZCVnl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRGFrWXNRMEZCUXp0QlFVVkVMRk5CUVZNc1YwRkJWeXhEUVVGRExFdEJRVzlDTzBsQlEzSkRMRTlCUVU4c1dVRkJReXhEUVVGRExHdENRVUZyUWl4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRE8wRkJRM2hETEVOQlFVTTdRVUZKUkN4VFFVRlRMR1ZCUVdVc1EwRkJReXhEUVVGTE8wbEJRekZDTEVsQlFVa3NUVUZCVFN4SFFVRlBMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU03U1VGRE1VSXNTVUZCU1N4VlFVRlZMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRMjVDTEU5QlFVOHNUVUZCVFN4RFFVRkRMRk5CUVZNc1EwRkJReXhKUVVGSkxFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTXNZVUZCWVN4RFFVRkRMRk5CUVZNc1EwRkJReXhKUVVGSkxFVkJRVVVzUlVGQlJUdFJRVU5xUlN4VlFVRlZMRWxCUVVrc1RVRkJUU3hEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU5vUXl4TlFVRk5MRWRCUVVjc1RVRkJUU3hEUVVGRExGVkJRVlVzUTBGQlF6dExRVU01UWp0SlFVTkVMRTlCUVU4c1ZVRkJWU3hIUVVGSExFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNWVUZCVlN4RFFVRkRPMEZCUTNCRUxFTkJRVU03UVVGRlJDeFRRVUZUTEZGQlFWRXNRMEZCUXl4RFFVRkxMRVZCUVVVc1NVRkJWVHRKUVVNdlFpeERRVUZETEVOQlFVTXNaVUZCWlN4RlFVRkZMRU5CUVVNN1NVRkRjRUlzUTBGQlF5eERRVUZETEdOQlFXTXNSVUZCUlN4RFFVRkRPMGxCUTI1Q0xFMUJRVTBzVTBGQlV5eEhRVUZITEVOQlFVTXNRMEZCUXl4aFFVRmhMRU5CUVVNc1UwRkJVeXhEUVVGRExGZEJRVmNzUTBGQlF6dEpRVU40UkN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4VFFVRlRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTTdTVUZEYkVZc1QwRkJUeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdRVUZEZUVJc1EwRkJRenRCUVVWRUxGTkJRVk1zVTBGQlV5eERRVUZETEVOQlFVc3NSVUZCUlN4SlFVRlZPMGxCUTJoRExFMUJRVTBzVFVGQlRTeEhRVUZITEdWQlFXVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOc1F5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETzBsQlF6ZENMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVVzWjBKQlFXZENMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zU1VGQlJTeERRVUZETEVWQlFVVTdVVUZEZGtVc1RVRkJUU3hUUVVGVExFZEJRVWNzUTBGQlF5eERRVUZETEdGQlFXRXNRMEZCUXl4VFFVRlRMRU5CUVVNc1YwRkJWeXhEUVVGRE8xRkJRM2hFTEUxQlFVMHNWMEZCVnl4SFFVRkhMRU5CUVVNc1EwRkJReXhoUVVGaExFTkJRVU1zVTBGQlV5eERRVUZETEZOQlFWTXNRMEZCUXl4WFFVRlhMRU5CUVVNN1VVRkRjRVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWxCUVVrc1YwRkJWeXhIUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5zUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRWRCUVVjc1YwRkJWeXhIUVVGRExFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTXNSMEZCUnl4VFFVRlRMRU5CUVVNN1MwRkRka1U3U1VGRFJDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXp0SlFVTnlReXhSUVVGUkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMEZCUTNSQ0xFTkJRVU03UVVGRlJDeFRRVUZUTEZOQlFWTXNRMEZCUXl4RFFVRkxMRVZCUVVVc1NVRkJWVHRKUVVOb1F5eEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGRExFTkJRVU1zUlVGQlJUdFJRVU53UWl4UlFVRlJMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEyeENMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVkQlFVY3NRMEZCUXl4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEhRVUZITEVOQlFVTXNSVUZCUlR0WlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVMEZCUlR0TFFVTXhSVHRCUVVOTUxFTkJRVU03UVVGRlJDeFRRVUZUTEU5QlFVOHNRMEZCUXl4RFFVRkxMRVZCUVVVc1NVRkJWVHRKUVVNNVFpeEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGRExFTkJRVU1zUlVGQlJUdFJRVU53UWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM0pETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETzB0QlEzcENPMEZCUTB3c1EwRkJRenRCUVVWRUxGTkJRVk1zVVVGQlVTeERRVUZETEVOQlFVc3NSVUZCUlN4SlFVRlZPMGxCUXk5Q0xFbEJRVWtzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWRCUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hMUVVGTExGZEJRVmNzUlVGQlJUdFJRVU5xUlN4UFFVRlBMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzB0QlEzQkNPMEZCUTB3c1EwRkJRenRCUVVWRUxGTkJRVk1zVFVGQlRTeERRVUZETEVsQlFWVTdTVUZEZEVJc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVa3NVVUZCVVN4RFFVRkRMRVZCUVVVN1VVRkRNMFVzVFVGQlRTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU16UlN4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeExRVUZMTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTzFsQlF6ZERMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEZWtNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVkQlFWY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVMEZEY2tRN1VVRkZSQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUjBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0TFFVTXhRenRUUVVGTk8xRkJRMGdzVFVGQlRTeFJRVUZSTEVkQlFYRkNMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETzFGQlEzQkVMRTFCUVUwc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVU1zUTBGQlF5eERRVUZETEVkQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJReXhIUVVGSExFTkJRVU03VVVGRGFFY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCVXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGVExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnlSeXhQUVVGUExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRPMHRCUXpOQ08wRkJRMHdzUTBGQlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBTZWxlY3Rvcl8xID0gcmVxdWlyZShcIi4vU2VsZWN0b3JcIik7XG5jbGFzcyBUb2dnbGVCdXR0b24gZXh0ZW5kcyBTZWxlY3Rvcl8xLlNlbGVjdG9yIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBzdXBlci5vbmluaXQobm9kZSk7XG4gICAgICAgIG5vZGUuc3RhdGUubW91c2VEb3duQ1NTID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUuZXZlbnRzLm1vdXNlRG93biA9ICgpID0+IG5vZGUuc3RhdGUubW91c2VEb3duQ1NTID0gJy5ocy1idXR0b24tcHJlc3NlZCc7XG4gICAgICAgIG5vZGUuc3RhdGUuZXZlbnRzLm1vdXNlVXAgPSAoKSA9PiBub2RlLnN0YXRlLm1vdXNlRG93bkNTUyA9ICcnO1xuICAgICAgICBub2RlLnN0YXRlLml0ZW1DbGlja2VkID0gKHRpdGxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpID0gbm9kZS5zdGF0ZS5pdGVtcy5tYXAoKGkpID0+IGkudGl0bGUpLmluZGV4T2YodGl0bGUpO1xuICAgICAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBub2RlLnN0YXRlLml0ZW1zWyhpICsgMSkgJSBub2RlLnN0YXRlLml0ZW1zLmxlbmd0aF0udGl0bGU7XG4gICAgICAgICAgICBub2RlLnN0YXRlLml0ZW1zW3RpdGxlXS5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBub2RlLnN0YXRlLml0ZW1zW25ld1RpdGxlXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXdUaXRsZTtcbiAgICAgICAgfTtcbiAgICAgICAgU2VsZWN0b3JfMS5TZWxlY3Rvci5lbnN1cmVTZWxlY3RlZChub2RlKTtcbiAgICB9XG4gICAgb251cGRhdGUobm9kZSkge1xuICAgICAgICBzdXBlci5vbnVwZGF0ZShub2RlKTtcbiAgICAgICAgU2VsZWN0b3JfMS5TZWxlY3Rvci5lbnN1cmVTZWxlY3RlZChub2RlKTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgICAgICBjb25zdCBzdHlsZSA9IG5vZGUuYXR0cnMuc3R5bGUgfHwgJyc7XG4gICAgICAgIGNvbnN0IGkgPSBub2RlLnN0YXRlLml0ZW1zLmZpbmRJbmRleCgoaSkgPT4gaS5pc1NlbGVjdGVkKTtcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShgLmhzLXRvZ2dsZS1idXR0b24gJHtjc3N9ICR7bm9kZS5zdGF0ZS5tb3VzZURvd25DU1N9YCwgeyBzdHlsZTogc3R5bGUgfSwgaHNsYXlvdXRfMS5tKCdzcGFuJywgU2VsZWN0b3JfMS5TZWxlY3Rvci5yZW5kZXJJdGVtKG5vZGUsIGkpKSk7XG4gICAgfVxufVxuZXhwb3J0cy5Ub2dnbGVCdXR0b24gPSBUb2dnbGVCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWRzluWjJ4bFFuVjBkRzl1TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwxUnZaMmRzWlVKMWRIUnZiaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFXbERRU3gxUTBGQmIwUTdRVUZEY0VRc2VVTkJRWE5FTzBGQmJVSjBSQ3hOUVVGaExGbEJRV0VzVTBGQlVTeHRRa0ZCVVR0SlFVTjBReXhOUVVGTkxFTkJRVU1zU1VGQlZUdFJRVU5pTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGJrSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhaUVVGWkxFZEJRVWNzUlVGQlJTeERRVUZETzFGQlF6ZENMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEZOQlFWTXNSMEZCUnl4SFFVRkhMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZsQlFWa3NSMEZCUnl4dlFrRkJiMElzUTBGQlF6dFJRVU51Uml4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVkQlFVc3NSMEZCUnl4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUldwRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWMEZCVnl4SFFVRkZMRU5CUVVNc1MwRkJXU3hGUVVGUExFVkJRVVU3V1VGRE1VTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJaMElzUlVGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0WlFVTTFSU3hOUVVGTkxGRkJRVkVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNN1dVRkRla1VzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zVlVGQlZTeEhRVUZITEV0QlFVc3NRMEZCUXp0WlFVTXpReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhWUVVGVkxFZEJRVWNzU1VGQlNTeERRVUZETzFsQlF6ZERMRTlCUVU4c1VVRkJVU3hEUVVGRE8xRkJRM0JDTEVOQlFVTXNRMEZCUXp0UlFVTkdMRzFDUVVGUkxFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTJ4RExFTkJRVU03U1VGRFJDeFJRVUZSTEVOQlFVTXNTVUZCVnp0UlFVTm9RaXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNKQ0xHMUNRVUZSTEVOQlFVTXNZMEZCWXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRMnhETEVOQlFVTTdTVUZEUkN4SlFVRkpMRU5CUVVNc1NVRkJWenRSUVVOYUxFMUJRVTBzUjBGQlJ5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVU5xUXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NTVUZCU1N4RlFVRkZMRU5CUVVNN1VVRkRja01zVFVGQlRTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCWjBJc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRPMUZCUlhwRkxFOUJRVThzV1VGQlF5eERRVUZETEhGQ1FVRnhRaXhIUVVGSExFbEJRVWtzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WlFVRlpMRVZCUVVVc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlF5eExRVUZMTEVWQlFVTXNSVUZCUlN4WlFVRkRMRU5CUVVNc1RVRkJUU3hGUVVOd1JpeHRRa0ZCVVN4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlF5OUNMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03UTBGRFNqdEJRVGRDUkN4dlEwRTJRa01pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmV4cG9ydHMuQnV0dG9uU3ltYm9scyA9IHtcbiAgICBjcm9zczogeyBzeW06ICcmdGltZXM7JyB9LFxuICAgIG1pbnVzOiB7IHN5bTogJyZtaW51czsnIH0sXG4gICAgcGx1czogeyBzeW06ICcrJyB9LFxuICAgIGRMZWZ0OiB7IHN5bTogJyZsYXF1bzsnIH0sXG4gICAgZFJpZ2h0OiB7IHN5bTogJyZyYXF1bzsnIH0sXG4gICAgbGVmdDogeyBzeW06ICcmbHNhcXVvOycgfSxcbiAgICByaWdodDogeyBzeW06ICcmcnNhcXVvOycgfSxcbiAgICBsZWZ0VHJpOiB7IHN5bTogJyZsdHJpZjsnIH0sXG4gICAgcmlnaHRUcmk6IHsgc3ltOiAnJnJ0cmlmOycgfSxcbiAgICB1cFRyaTogeyBzeW06ICcmdXRyaWY7JyB9LFxuICAgIGRvd25Ucmk6IHsgc3ltOiAnJmR0cmlmOycgfSxcbiAgICB1cDogeyBzeW06ICcmYW5kOycgfSxcbiAgICBkb3duOiB7IHN5bTogJyZvcjsnIH0sXG4gICAgbEFycm93OiB7IHN5bTogJyZsYXJyOycgfSxcbiAgICByQXJyb3c6IHsgc3ltOiAnJnJhcnI7JyB9LFxuICAgIHVBcnJvdzogeyBzeW06ICcmdWFycjsnIH0sXG4gICAgZEFycm93OiB7IHN5bTogJyZkYXJyOycgfSxcbiAgICBlbXB0eTogeyBzeW06ICcmIzk2NzU7JyB9LFxuICAgIGVtcHR5U2xhc2g6IHsgc3ltOiAnJmVtcHR5OycgfSxcbiAgICBvU2xhc2g6IHsgc3ltOiAnJm9zbGFzaDsnIH0sXG4gICAgbzogeyBzeW06ICcmb21pY3JvbjsnIH0sXG4gICAgbGluZXMzOiB7IHN5bTogJyZlcXVpdjsnIH0sXG4gICAgc3VtOiB7IHN5bTogJyZTaWdtYTsnIH0sXG4gICAgZWxsaXBzaXM6IHsgc3ltOiAnJmhlbGxpcDsnIH0sXG4gICAgdmVydEVsbGlwczogeyBzeW06ICcmIzgyODU7JyB9LFxuICAgIGJ1bGxldDogeyBzeW06ICcmYnVsbDsnIH0sXG4gICAgZW50ZXI6IHsgc3ltOiAnJmNyYXJyOycgfSxcbiAgICBhZ2FpbjogeyBzeW06ICcmIzg2MzU7JyB9LFxuICAgIHN0YXJ0OiB7IHN5bTogJyYjODY4OTsnIH0sXG4gICAgZW5kOiB7IHN5bTogJyYjODY5MDsnIH1cbn07XG5jbGFzcyBUb29sYmFyQnV0dG9uIHtcbiAgICBzdGF0aWMgZ2V0U3ltYm9sKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuQnV0dG9uU3ltYm9sc1tuYW1lXSA/IGV4cG9ydHMuQnV0dG9uU3ltYm9sc1tuYW1lXS5zeW0gOiAnJztcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZS5hdHRycy5zeW1ib2xzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnLmhzLWNvcm5lci1idXR0b24nLCB7IG9uY2xpY2s6IG5vZGUuYXR0cnMub25jbGljayB9LCBoc2xheW91dF8xLm0udHJ1c3Qobm9kZS5hdHRycy5zeW1ib2xzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCcuaHMtY29ybmVyLWJ1dHRvbicsIHsgb25jbGljazogbm9kZS5hdHRycy5vbmNsaWNrIH0sIG5vZGUuYXR0cnMuc3ltYm9scy5tYXAoKHN5bSkgPT4gaHNsYXlvdXRfMS5tLnRydXN0KHN5bSkpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuVG9vbGJhckJ1dHRvbiA9IFRvb2xiYXJCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWRzl2YkdKaGNrSjFkSFJ2Ymk1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OVViMjlzWW1GeVFuVjBkRzl1TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJNa1ZCTEhWRFFVRnZRenRCUVVWMlFpeFJRVUZCTEdGQlFXRXNSMEZCUnp0SlFVTjZRaXhMUVVGTExFVkJRVThzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkZPMGxCUXpsQ0xFdEJRVXNzUlVGQlR5eEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVNN1NVRkROMElzU1VGQlNTeEZRVUZSTEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJRenRKUVVOMlFpeExRVUZMTEVWQlFVOHNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRE8wbEJRemRDTEUxQlFVMHNSVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSU3hUUVVGVExFVkJRVU03U1VGRE4wSXNTVUZCU1N4RlFVRlJMRVZCUVVVc1IwRkJSeXhGUVVGRkxGVkJRVlVzUlVGQlF6dEpRVU01UWl4TFFVRkxMRVZCUVU4c1JVRkJSU3hIUVVGSExFVkJRVVVzVlVGQlZTeEZRVUZETzBsQlF6bENMRTlCUVU4c1JVRkJTeXhGUVVGRkxFZEJRVWNzUlVGQlJTeFRRVUZUTEVWQlFVTTdTVUZETjBJc1VVRkJVU3hGUVVGSkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUXp0SlFVTTNRaXhMUVVGTExFVkJRVThzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkRPMGxCUXpkQ0xFOUJRVThzUlVGQlN5eEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVNN1NVRkROMElzUlVGQlJTeEZRVUZWTEVWQlFVVXNSMEZCUnl4RlFVRkZMRTlCUVU4c1JVRkJRenRKUVVNelFpeEpRVUZKTEVWQlFWRXNSVUZCUlN4SFFVRkhMRVZCUVVVc1RVRkJUU3hGUVVGRE8wbEJRekZDTEUxQlFVMHNSVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSU3hSUVVGUkxFVkJRVU03U1VGRE5VSXNUVUZCVFN4RlFVRk5MRVZCUVVVc1IwRkJSeXhGUVVGRkxGRkJRVkVzUlVGQlF6dEpRVU0xUWl4TlFVRk5MRVZCUVUwc1JVRkJSU3hIUVVGSExFVkJRVVVzVVVGQlVTeEZRVUZETzBsQlF6VkNMRTFCUVUwc1JVRkJUU3hGUVVGRkxFZEJRVWNzUlVGQlJTeFJRVUZSTEVWQlFVTTdTVUZETlVJc1MwRkJTeXhGUVVGUExFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUXp0SlFVTTNRaXhWUVVGVkxFVkJRVVVzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkRPMGxCUXpkQ0xFMUJRVTBzUlVGQlRTeEZRVUZGTEVkQlFVY3NSVUZCUlN4VlFVRlZMRVZCUVVNN1NVRkRPVUlzUTBGQlF5eEZRVUZYTEVWQlFVVXNSMEZCUnl4RlFVRkZMRmRCUVZjc1JVRkJRenRKUVVNdlFpeE5RVUZOTEVWQlFVMHNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRE8wbEJRemRDTEVkQlFVY3NSVUZCVXl4RlFVRkZMRWRCUVVjc1JVRkJSU3hUUVVGVExFVkJRVU03U1VGRE4wSXNVVUZCVVN4RlFVRkpMRVZCUVVVc1IwRkJSeXhGUVVGRkxGVkJRVlVzUlVGQlF6dEpRVU01UWl4VlFVRlZMRVZCUVVVc1JVRkJSU3hIUVVGSExFVkJRVVVzVTBGQlV5eEZRVUZETzBsQlF6ZENMRTFCUVUwc1JVRkJUU3hGUVVGRkxFZEJRVWNzUlVGQlJTeFJRVUZSTEVWQlFVTTdTVUZETlVJc1MwRkJTeXhGUVVGUExFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUXp0SlFVTTNRaXhMUVVGTExFVkJRVThzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkRPMGxCUXpkQ0xFdEJRVXNzUlVGQlR5eEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVNN1NVRkROMElzUjBGQlJ5eEZRVUZUTEVWQlFVVXNSMEZCUnl4RlFVRkZMRk5CUVZNc1JVRkJRenREUVVOb1F5eERRVUZETzBGQlJVWXNUVUZCWVN4aFFVRmhPMGxCUlhSQ0xFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNTVUZCVnp0UlFVTjRRaXhQUVVGUExIRkNRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExIRkNRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTTdTVUZETjBRc1EwRkJRenRKUVVORUxFbEJRVWtzUTBGQlF5eEpRVUZWTzFGQlExZ3NTVUZCU1N4UFFVRlBMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eExRVUZMTEZGQlFWRXNSVUZCUlR0WlFVTjRReXhQUVVGUExGbEJRVU1zUTBGQlF5eHRRa0ZCYlVJc1JVRkRlRUlzUlVGQlJTeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGREwwSXNXVUZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVTTVRaXhEUVVGRE8xTkJRMHc3WVVGQlRUdFpRVU5JTEU5QlFVOHNXVUZCUXl4RFFVRkRMRzFDUVVGdFFpeEZRVU53UWl4RlFVRkZMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlN4RlFVTXZRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGVkxFVkJRVVVzUlVGQlJTeERRVUZCTEZsQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGRE1VUXNRMEZCUXp0VFFVTk1PMGxCUTB3c1EwRkJRenREUVVOS08wRkJiRUpFTEhORFFXdENReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuZnVuY3Rpb24gZW1waGFzaXplKGl0ZW0sIG1hdGNoKSB7XG4gICAgY29uc3QgcmUgPSBuZXcgUmVnRXhwKG1hdGNoLCAnZ2knKTtcbiAgICBjb25zdCBkZWNvcmF0aW9ucyA9IGl0ZW1cbiAgICAgICAgLnJlcGxhY2UocmUsIChtKSA9PiBgPGI+JHttfTwvYj5gKVxuICAgICAgICAuc3BsaXQoJzwnKVxuICAgICAgICAubWFwKChzKSA9PiB7XG4gICAgICAgIGlmIChzLnN0YXJ0c1dpdGgoJy9iPicpKSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCdzcGFuJywgeyBuYW1lOiBpdGVtIH0sIHMuc2xpY2UoMykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHMuc3RhcnRzV2l0aCgnYj4nKSkge1xuICAgICAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnYicsIHsgbmFtZTogaXRlbSB9LCBzLnNsaWNlKDIpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oJ3NwYW4nLCB7IG5hbWU6IGl0ZW0gfSwgcyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCdzcGFuJywgZGVjb3JhdGlvbnMpO1xufVxuY2xhc3MgR2V0TGlzdCB7XG4gICAgY29uc3RydWN0b3IobGlzdCwgbWFwKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xuICAgICAgICBpZiAodHlwZW9mIGxpc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBoc2xheW91dF8xLm0ucmVxdWVzdCh7IG1ldGhvZDogXCJHRVRcIiwgdXJsOiBsaXN0IH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHRoaXMuY2FwdHVyZUxpc3QoZGF0YSwgbWFwKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhcHR1cmVMaXN0KGxpc3QsIG1hcCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FwdHVyZUxpc3QobGlzdCwgbWFwKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IG1hcCA/IG1hcChsaXN0KSA6IGxpc3Q7XG4gICAgfVxufVxuY2xhc3MgVHlwZUFoZWFkIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBub2RlLnN0YXRlLmlucHV0Tm9kZSA9ICcnO1xuICAgICAgICBub2RlLnN0YXRlLmhpZGVQb3Bkb3duID0gdHJ1ZTtcbiAgICAgICAgbm9kZS5zdGF0ZS52YWx1ZSA9ICcnO1xuICAgICAgICBub2RlLnN0YXRlLnR5cGVBaGVhZExpc3QgPSBbXTtcbiAgICAgICAgbm9kZS5zdGF0ZS5vbnN1Ym1pdCA9IG5vZGUuYXR0cnMub25zdWJtaXQ7XG4gICAgICAgIG5vZGUuc3RhdGUubGlzdCA9IG5vZGUuYXR0cnMubGlzdDtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGdsID0gbmV3IEdldExpc3Qobm9kZS5zdGF0ZS5saXN0KTtcbiAgICAgICAgY29uc3Qgbm9zdWJtaXQgPSAoKSA9PiBjb25zb2xlLmxvZygnbm8gc3VibWl0IGZ1bmN0aW9uIGRlZmluZWQnKTtcbiAgICAgICAgY29uc3Qgc3VibWl0ID0gKHYpID0+IHtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuaW5wdXROb2RlLnNldFNlbGVjdGlvblJhbmdlKDAsIG5vZGUuc3RhdGUuaW5wdXROb2RlLnZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICBub2RlLnN0YXRlLmhpZGVQb3Bkb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBub2RlLnN0YXRlLm9uc3VibWl0ID8gbm9kZS5zdGF0ZS5vbnN1Ym1pdCh2KSA6IG5vc3VibWl0KCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNlbGVjdCA9IChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIG5vZGUuc3RhdGUuaW5wdXROb2RlLnZhbHVlID0gZS50YXJnZXQuYXR0cmlidXRlcy5uYW1lLnZhbHVlO1xuICAgICAgICAgICAgICAgIHN1Ym1pdChlLnRhcmdldC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBpbnB1dCA9IChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuID0gbm9kZS5zdGF0ZS5pbnB1dE5vZGUgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gbm9kZS5zdGF0ZS52YWx1ZSA9IG4udmFsdWU7XG4gICAgICAgICAgICBjb25zdCB3aXRoaW5JbnB1dCA9IG5ldyBSZWdFeHAoYCR7aW5wdXR9YCwgJ2dpJyk7XG4gICAgICAgICAgICBjb25zdCBiZWdpbm5pbmdPZklucHV0ID0gbmV3IFJlZ0V4cChgXiR7aW5wdXR9YCwgJ2dpJyk7XG4gICAgICAgICAgICBub2RlLnN0YXRlLnR5cGVBaGVhZExpc3QgPSBnbC5saXN0LmZpbHRlcigobCkgPT4gbC5tYXRjaCh3aXRoaW5JbnB1dCkpO1xuICAgICAgICAgICAgbi52YWx1ZSA9IG5vZGUuc3RhdGUudHlwZUFoZWFkTGlzdC5maWx0ZXIoKGwpID0+IGwubWF0Y2goYmVnaW5uaW5nT2ZJbnB1dCkpWzBdIHx8IGlucHV0O1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5oaWRlUG9wZG93biA9IG4udmFsdWUubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgbGV0IHBvcyA9IGlucHV0Lmxlbmd0aDtcbiAgICAgICAgICAgIG4uc2V0U2VsZWN0aW9uUmFuZ2UocG9zLCBuLnZhbHVlLmxlbmd0aCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGtleVByZXNzZWQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbiA9IG5vZGUuc3RhdGUuaW5wdXROb2RlID0gZS50YXJnZXQ7XG4gICAgICAgICAgICBpZiAoZS5jb2RlID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgc3VibWl0KG4udmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZS5jb2RlID09PSAnQmFja3NwYWNlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gbi5maXJzdENoaWxkLmRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbi52YWx1ZSA9IGlucHV0LnNsaWNlKDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgaW5wdXROb2RlID0ge1xuICAgICAgICAgICAgY29udGVudGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IG5vZGUuYXR0cnMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBhdXRvZm9jdXM6IG5vZGUuYXR0cnMuYXV0b2ZvY3VzIHx8IHRydWUsXG4gICAgICAgICAgICBvbmtleWRvd246IGtleVByZXNzZWQsXG4gICAgICAgICAgICBvbmlucHV0OiBpbnB1dFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCcuaHMtZm9ybScsIFtcbiAgICAgICAgICAgIGhzbGF5b3V0XzEubShgaW5wdXQuaHMtdHlwZWFoZWFkLWlucHV0JHtub2RlLnN0YXRlLnZhbHVlID8gJy5ocy10eXBlYWhlYWQtdmFsdWUnIDogJy5ocy10eXBlYWhlYWQtcGxhY2Vob2xkZXInfWAsIGlucHV0Tm9kZSwgaHNsYXlvdXRfMS5tLnRydXN0KG5vZGUuc3RhdGUudmFsdWUgPyBub2RlLnN0YXRlLnZhbHVlIDogbm9kZS5hdHRycy5wbGFjZWhvbGRlcikpLFxuICAgICAgICAgICAgbm9kZS5zdGF0ZS5oaWRlUG9wZG93biA/IHVuZGVmaW5lZCA6XG4gICAgICAgICAgICAgICAgaHNsYXlvdXRfMS5tKCcuaHMtdHlwZWFoZWFkLWxpc3QnLCBub2RlLnN0YXRlLnR5cGVBaGVhZExpc3QubWFwKChsKSA9PiBoc2xheW91dF8xLm0oJycsIHsgb25jbGljazogc2VsZWN0IH0sIGVtcGhhc2l6ZShsLCBub2RlLnN0YXRlLnZhbHVlKSkpKVxuICAgICAgICBdKTtcbiAgICB9XG59XG5leHBvcnRzLlR5cGVBaGVhZCA9IFR5cGVBaGVhZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVZIbHdaVUZvWldGa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMMVI1Y0dWQmFHVmhaQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFUQkRRU3gxUTBGQmIwTTdRVUZIY0VNc1UwRkJVeXhUUVVGVExFTkJRVU1zU1VGQlZ5eEZRVUZGTEV0QlFWazdTVUZEZUVNc1RVRkJUU3hGUVVGRkxFZEJRVWNzU1VGQlNTeE5RVUZOTEVOQlFVTXNTMEZCU3l4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRMjVETEUxQlFVMHNWMEZCVnl4SFFVRkhMRWxCUVVrN1UwRkRia0lzVDBGQlR5eERRVUZETEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVZFc1JVRkJSU3hGUVVGRkxFTkJRVU1zVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXp0VFFVTjRReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETzFOQlExWXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJVU3hGUVVGRkxFVkJRVVU3VVVGRFpDeEpRVUZKTEVOQlFVTXNRMEZCUXl4VlFVRlZMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVVU3V1VGRGNrSXNUMEZCVHl4WlFVRkRMRU5CUVVNc1RVRkJUU3hGUVVGRkxFVkJRVU1zU1VGQlNTeEZRVUZETEVsQlFVa3NSVUZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTTNRenRoUVVGTkxFbEJRVWtzUTBGQlF5eERRVUZETEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSVHRaUVVNelFpeFBRVUZQTEZsQlFVTXNRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJReXhKUVVGSkxFVkJRVU1zU1VGQlNTeEZRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFOQlF6RkRPMkZCUVUwN1dVRkRTQ3hQUVVGUExGbEJRVU1zUTBGQlF5eE5RVUZOTEVWQlFVVXNSVUZCUXl4SlFVRkpMRVZCUVVNc1NVRkJTU3hGUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdVMEZEY0VNN1NVRkRUQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEU5QlFVOHNXVUZCUXl4RFFVRkRMRTFCUVUwc1JVRkJSU3hYUVVGWExFTkJRVU1zUTBGQlF6dEJRVU5zUXl4RFFVRkRPMEZCUlVRc1RVRkJUU3hQUVVGUE8wbEJTMVFzV1VGQldTeEpRVUZ2UWl4RlFVRkZMRWRCUVRKQ08xRkJTblJFTEZOQlFVa3NSMEZCV1N4RlFVRkZMRU5CUVVNN1VVRkxkRUlzU1VGQlNTeFBRVUZQTEVsQlFVa3NTMEZCU3l4UlFVRlJMRVZCUVVVN1dVRkRNVUlzV1VGQlF5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZMRTFCUVUwc1JVRkJSU3hMUVVGTExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NSVUZCUlN4RFFVRkRPMmxDUVVOMFF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SlFVRlZMRVZCUVVVc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU03VTBGRGRFUTdZVUZCVFR0WlFVTklMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMU5CUXk5Q08wbEJRMHdzUTBGQlF6dEpRVlpQTEZkQlFWY3NRMEZCUXl4SlFVRlZMRVZCUVVVc1IwRkJkVUk3VVVGRGJrUXNTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhIUVVGSExFTkJRVUVzUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETzBsQlEzUkRMRU5CUVVNN1EwRlRTanRCUVVWRUxFMUJRV0VzVTBGQlV6dEpRVU5zUWl4TlFVRk5MRU5CUVVNc1NVRkJWVHRSUVVOaUxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVMEZCVXl4SFFVRkhMRVZCUVVVc1EwRkJRenRSUVVNeFFpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRmRCUVZjc1IwRkJSeXhKUVVGSkxFTkJRVU03VVVGRE9VSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFZEJRVWNzUlVGQlJTeERRVUZETzFGQlEzUkNMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zWVVGQllTeEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTTVRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF6dFJRVU14UXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJRenRKUVVOMFF5eERRVUZETzBsQlEwUXNTVUZCU1N4RFFVRkRMRWxCUVZVN1VVRkRXQ3hOUVVGTkxFVkJRVVVzUjBGQlJ5eEpRVUZKTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEzaERMRTFCUVUwc1VVRkJVU3hIUVVGSExFZEJRVWNzUlVGQlJTeERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc05FSkJRVFJDTEVOQlFVTXNRMEZCUXp0UlFVTnFSU3hOUVVGTkxFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFWRXNSVUZCUlN4RlFVRkZPMWxCUTNoQ0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVMEZCVXl4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTXNSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGTkJRVk1zUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1dVRkROMFVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WFFVRlhMRWRCUVVjc1NVRkJTU3hEUVVGRE8xbEJRemxDTEU5QlFVOHNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVUVzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJRenRSUVVOd1JTeERRVUZETEVOQlFVTTdVVUZEUml4TlFVRk5MRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVXNzUlVGQlJTeEZRVUZGTzFsQlFVY3NTVUZCU1N4RFFVRkRMRVZCUVVVN1owSkJReTlDTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1UwRkJVeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETzJkQ1FVTTFSQ3hOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXl4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzJGQlF6RkRPMUZCUVVFc1EwRkJReXhEUVVGRE8xRkJRMGdzVFVGQlRTeExRVUZMTEVkQlFVY3NRMEZCUXl4RFFVRkxMRVZCUVVVc1JVRkJSVHRaUVVOd1FpeE5RVUZOTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGTkJRVk1zUjBGQlJ5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRPMWxCUXpGRExFMUJRVTBzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGSExFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTTdXVUZEZWtNc1RVRkJUU3hYUVVGWExFZEJRVWNzU1VGQlNTeE5RVUZOTEVOQlFVTXNSMEZCUnl4TFFVRkxMRVZCUVVVc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dFpRVU5xUkN4TlFVRk5MR2RDUVVGblFpeEhRVUZITEVsQlFVa3NUVUZCVFN4RFFVRkRMRWxCUVVrc1MwRkJTeXhGUVVGRkxFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdXVUZEZGtRc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eGhRVUZoTEVkQlFVY3NSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZSTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTTVSU3hEUVVGRExFTkJRVU1zUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1lVRkJZU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFWRXNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NTMEZCU3l4RFFVRkRPMWxCUXk5R0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWMEZCVnl4SFFVRkhMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeExRVUZITEVOQlFVTXNRMEZCUXp0WlFVTTFReXhKUVVGSkxFZEJRVWNzUjBGQlJ5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRPMWxCUTNaQ0xFTkJRVU1zUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRSUVVNM1F5eERRVUZETEVOQlFVTTdVVUZEUml4TlFVRk5MRlZCUVZVc1IwRkJSeXhEUVVGRExFTkJRVXNzUlVGQlJTeEZRVUZGTzFsQlEzcENMRTFCUVUwc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVMEZCVXl4SFFVRkhMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU03V1VGRE1VTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExFOUJRVThzUlVGQlJUdG5Ra0ZEY0VJc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0aFFVTnVRanRwUWtGQlRTeEpRVUZKTEVOQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1YwRkJWeXhGUVVGRk8yZENRVU12UWl4TlFVRk5MRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU1zVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXp0blFrRkRhRU1zU1VGQlNTeExRVUZMTEVOQlFVTXNUVUZCVFN4SFFVRkhMRU5CUVVNc1JVRkJSVHR2UWtGRGJFSXNRMEZCUXl4RFFVRkRMRXRCUVVzc1IwRkJSeXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMmxDUVVNMVFqdGhRVU5LTzFGQlEwd3NRMEZCUXl4RFFVRkRPMUZCUTBZc1RVRkJUU3hUUVVGVExFZEJRVWM3V1VGRFpDeGxRVUZsTEVWQlFVTXNTVUZCU1R0WlFVTndRaXhYUVVGWExFVkJRVXNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WFFVRlhPMWxCUTNSRExGTkJRVk1zUlVGQlR5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRk5CUVZNc1NVRkJTU3hKUVVGSk8xbEJRelZETEZOQlFWTXNSVUZCVHl4VlFVRlZPMWxCUXpGQ0xFOUJRVThzUlVGQlV5eExRVUZMTzFOQlEzaENMRU5CUVVNN1VVRkZSaXhQUVVGUExGbEJRVU1zUTBGQlF5eFZRVUZWTEVWQlFVVTdXVUZEYWtJc1dVRkJReXhEUVVGRExESkNRVUV5UWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlFTeERRVUZETEVOQlFVRXNjVUpCUVhGQ0xFTkJRVU1zUTBGQlF5eERRVUZETERKQ1FVRXlRaXhGUVVGRkxFVkJReTlHTEZOQlFWTXNSVUZEVkN4WlFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkJMRU5CUVVNc1EwRkJRU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZEZEVVN1dVRkRSQ3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWY3NRMEZCUVN4RFFVRkRMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU03WjBKQlF5OUNMRmxCUVVNc1EwRkJReXh2UWtGQmIwSXNSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExHRkJRV0VzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRlJMRVZCUVVVc1JVRkJSU3hEUVVNNVJDeFpRVUZETEVOQlFVTXNSVUZCUlN4RlFVRkZMRVZCUVVVc1QwRkJUeXhGUVVGRkxFMUJRVTBzUlVGQlJTeEZRVUZGTEZOQlFWTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1UwRkRka1VzUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXp0RFFVTktPMEZCTjBSRUxEaENRVFpFUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1lbnVfMSA9IHJlcXVpcmUoXCIuL01lbnVcIik7XG5leHBvcnRzLk1lbnUgPSBNZW51XzEuTWVudTtcbnZhciBNZW51XzIgPSByZXF1aXJlKFwiLi9NZW51XCIpO1xuZXhwb3J0cy5NZW51UGFuZWwgPSBNZW51XzIuTWVudVBhbmVsO1xudmFyIEJ1dHRvbl8xID0gcmVxdWlyZShcIi4vQnV0dG9uXCIpO1xuZXhwb3J0cy5CdXR0b24gPSBCdXR0b25fMS5CdXR0b247XG52YXIgTGFiZWxfMSA9IHJlcXVpcmUoXCIuL0xhYmVsXCIpO1xuZXhwb3J0cy5MYWJlbCA9IExhYmVsXzEuTGFiZWw7XG52YXIgU2xpZGVyXzEgPSByZXF1aXJlKFwiLi9TbGlkZXJcIik7XG5leHBvcnRzLlNsaWRlciA9IFNsaWRlcl8xLlNsaWRlcjtcbnZhciBSYWRpb0J1dHRvbl8xID0gcmVxdWlyZShcIi4vUmFkaW9CdXR0b25cIik7XG5leHBvcnRzLlJhZGlvQnV0dG9uID0gUmFkaW9CdXR0b25fMS5SYWRpb0J1dHRvbjtcbnZhciBPcHRpb25zQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9PcHRpb25zQnV0dG9uXCIpO1xuZXhwb3J0cy5PcHRpb25zQnV0dG9uID0gT3B0aW9uc0J1dHRvbl8xLk9wdGlvbnNCdXR0b247XG52YXIgVG9nZ2xlQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9Ub2dnbGVCdXR0b25cIik7XG5leHBvcnRzLlRvZ2dsZUJ1dHRvbiA9IFRvZ2dsZUJ1dHRvbl8xLlRvZ2dsZUJ1dHRvbjtcbnZhciBUb29sYmFyQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9Ub29sYmFyQnV0dG9uXCIpO1xuZXhwb3J0cy5Ub29sYmFyQnV0dG9uID0gVG9vbGJhckJ1dHRvbl8xLlRvb2xiYXJCdXR0b247XG52YXIgVG9vbGJhckJ1dHRvbl8yID0gcmVxdWlyZShcIi4vVG9vbGJhckJ1dHRvblwiKTtcbmV4cG9ydHMuQnV0dG9uU3ltYm9scyA9IFRvb2xiYXJCdXR0b25fMi5CdXR0b25TeW1ib2xzO1xudmFyIENvbGxhcHNpYmxlXzEgPSByZXF1aXJlKFwiLi9Db2xsYXBzaWJsZVwiKTtcbmV4cG9ydHMuQ29sbGFwc2libGUgPSBDb2xsYXBzaWJsZV8xLkNvbGxhcHNpYmxlO1xudmFyIE1vZGFsXzEgPSByZXF1aXJlKFwiLi9Nb2RhbFwiKTtcbmV4cG9ydHMuTW9kYWwgPSBNb2RhbF8xLk1vZGFsO1xudmFyIFR5cGVBaGVhZF8xID0gcmVxdWlyZShcIi4vVHlwZUFoZWFkXCIpO1xuZXhwb3J0cy5UeXBlQWhlYWQgPSBUeXBlQWhlYWRfMS5UeXBlQWhlYWQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZhVzVrWlhndWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZQUVN3clFrRkJjME03UVVGQk4wSXNjMEpCUVVFc1NVRkJTU3hEUVVGQk8wRkJRMklzSzBKQlFYTkRPMEZCUVRkQ0xESkNRVUZCTEZOQlFWTXNRMEZCUVR0QlFVVnNRaXh0UTBGQmQwTTdRVUZCTDBJc01FSkJRVUVzVFVGQlRTeERRVUZCTzBGQlEyWXNhVU5CUVhWRE8wRkJRVGxDTEhkQ1FVRkJMRXRCUVVzc1EwRkJRVHRCUVVOa0xHMURRVUYzUXp0QlFVRXZRaXd3UWtGQlFTeE5RVUZOTEVOQlFVRTdRVUZEWml3MlEwRkJOa003UVVGQmNFTXNiME5CUVVFc1YwRkJWeXhEUVVGQk8wRkJRM0JDTEdsRVFVRXJRenRCUVVGMFF5eDNRMEZCUVN4aFFVRmhMRU5CUVVFN1FVRkRkRUlzSzBOQlFUaERPMEZCUVhKRExITkRRVUZCTEZsQlFWa3NRMEZCUVR0QlFVTnlRaXhwUkVGQkswTTdRVUZCZEVNc2QwTkJRVUVzWVVGQllTeERRVUZCTzBGQlEzUkNMR2xFUVVFclF6dEJRVUYwUXl4M1EwRkJRU3hoUVVGaExFTkJRVUU3UVVGRGRFSXNOa05CUVRaRE8wRkJRWEJETEc5RFFVRkJMRmRCUVZjc1EwRkJRVHRCUVVOd1FpeHBRMEZCZFVNN1FVRkJPVUlzZDBKQlFVRXNTMEZCU3l4RFFVRkJPMEZCUTJRc2VVTkJRVEpETzBGQlFXeERMR2REUVVGQkxGTkJRVk1zUTBGQlFTSjkiXSwic291cmNlUm9vdCI6IiJ9