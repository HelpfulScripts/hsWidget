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
exports.Layouter = Layouter;
Layouter.layoutStyles = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9MYXlvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVlBLHFDQUF3QztBQXlCeEMsTUFBc0IsUUFBUTtJQXlFMUIsWUFBbUIsUUFBc0I7UUFBdEIsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQVJ6QyxZQUFPLEdBQUcsQ0FBQyxDQUFDO0lBUWdDLENBQUM7SUF6RHJDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBd0I7UUFDN0MsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FBRTtRQUM3QyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFnQixFQUFFLEVBQUU7WUFDbkMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFBRSxPQUFPLFdBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFBRTtnQkFDekQsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUFFLE9BQU8sV0FBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUFFO2dCQUN4RCxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBRyxNQUFNLEVBQUU7b0JBQUUsT0FBTyxhQUFJLENBQUM7aUJBQUM7YUFDcEQ7aUJBQU07Z0JBQ0gsT0FBTyxLQUFLLENBQUM7YUFDaEI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFXTSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQWMsRUFBRSxLQUFxQjtRQUV4RCxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMzQyxDQUFDO0lBVU0sTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFTLEVBQUUsVUFBdUI7UUFDekQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNaLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDM0YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBVzRDLENBQUM7O0FBekVsRCw0QkEwRkM7QUFyRlUscUJBQVksR0FBdUIsRUFBRSxDQUFDIn0=

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBd0RBLCtDQUE2QztBQU03QyxNQUFhLElBQUssU0FBUSx5QkFBVztJQUNqQyxJQUFJLENBQUMsSUFBVyxJQUFXLE9BQU8seUJBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUMvRTtBQUZELG9CQUVDIn0=

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oc1dpZGdldC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L0NvbmZpZy5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L2luZGV4LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbWl0aHJpbC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL2FwaS9tb3VudC1yZWRyYXcuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC9ub2RlX21vZHVsZXMvbWl0aHJpbC9hcGkvcm91dGVyLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbm9kZV9tb2R1bGVzL21pdGhyaWwvaHlwZXJzY3JpcHQuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC9ub2RlX21vZHVsZXMvbWl0aHJpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL21vdW50LXJlZHJhdy5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL2J1aWxkLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbm9kZV9tb2R1bGVzL21pdGhyaWwvcGF0aG5hbWUvY29tcGlsZVRlbXBsYXRlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbm9kZV9tb2R1bGVzL21pdGhyaWwvcGF0aG5hbWUvcGFyc2UuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC9ub2RlX21vZHVsZXMvbWl0aHJpbC9wcm9taXNlL3BvbHlmaWxsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbm9kZV9tb2R1bGVzL21pdGhyaWwvcHJvbWlzZS9wcm9taXNlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbm9kZV9tb2R1bGVzL21pdGhyaWwvcXVlcnlzdHJpbmcvYnVpbGQuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC9ub2RlX21vZHVsZXMvbWl0aHJpbC9xdWVyeXN0cmluZy9wYXJzZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9mcmFnbWVudC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9oeXBlcnNjcmlwdC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9oeXBlcnNjcmlwdFZub2RlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyL3JlbmRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci90cnVzdC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci92bm9kZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L25vZGVfbW9kdWxlcy9taXRocmlsL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC9ub2RlX21vZHVsZXMvbWl0aHJpbC9yZXF1ZXN0L3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc2xheW91dC9ub2RlX21vZHVsZXMvbWl0aHJpbC9yb3V0ZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvTGF5b3V0LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvdmlldy9MYXlvdXRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvUGlsbGFyZWRMYXlvdXRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvVGlsZUxheW91dGVyLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvdmlldy9Ub2tlbnMuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Lyh3ZWJwYWNrKS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Lyh3ZWJwYWNrKS9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8od2VicGFjaykvbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vQnV0dG9uLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0NvbGxhcHNpYmxlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0xhYmVsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL01lbnUuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vTW9kYWwuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vT3B0aW9uc0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9SYWRpb0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9TZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9TbGlkZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vVG9nZ2xlQnV0dG9uLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL1Rvb2xiYXJCdXR0b24uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vVHlwZUFoZWFkLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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QTBFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscUJBQXFCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGFBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekIsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLG1CQUFtQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixtQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLG9CQUFvQiwyQkFBMkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRztB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QkFBaUIsNkJBQTZCO0FBQzlDO0FBQ0E7QUFDQSwyQ0FBMkMsbW9DOzs7Ozs7Ozs7OztBQzlCM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FDakc5QjtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGFBQWEsbUJBQU8sQ0FBQyw2QkFBUTtBQUM3QjtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQztBQUNBLGNBQWMsbUJBQU8sQ0FBQywrQkFBUztBQUMvQjtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxpQ0FBVTtBQUNqQztBQUNBLG9CQUFvQixtQkFBTyxDQUFDLDJDQUFlO0FBQzNDO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0NBQWlCO0FBQy9DO0FBQ0EscUJBQXFCLG1CQUFPLENBQUMsNkNBQWdCO0FBQzdDO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0NBQWlCO0FBQy9DO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0NBQWlCO0FBQy9DO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMkNBQWU7QUFDM0M7QUFDQSxjQUFjLG1CQUFPLENBQUMsK0JBQVM7QUFDL0I7QUFDQSxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QztBQUNBLDJDQUEyQywyckIiLCJmaWxlIjoiaHNXaWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Jpbi9pbmRleC5qc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbWl0aHJpbF8xID0gcmVxdWlyZShcIi4vbWl0aHJpbFwiKTtcbmNsYXNzIENvbmZpZyB7XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IG5vZGUuYXR0cnMuY29udGV4dDtcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlLmF0dHJzLnNvdXJjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICghbm9kZS5zdGF0ZS5jZmcpIHtcbiAgICAgICAgICAgICAgICBtaXRocmlsXzEubS5yZXF1ZXN0KHsgbWV0aG9kOiBcIkdFVFwiLCB1cmw6IG5vZGUuYXR0cnMuc291cmNlIH0pLnRoZW4oKHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5jZmcgPSB0cmFuc2xhdGUocywgcy5yb290LCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuY2ZnID0gdHJhbnNsYXRlKG5vZGUuYXR0cnMuc291cmNlLCBub2RlLmF0dHJzLnNvdXJjZS5yb290LCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgY29uc3QgY2ZnID0gbm9kZS5zdGF0ZS5jZmc7XG4gICAgICAgIHJldHVybiAoY2ZnICYmIGNmZy5jb21wQ2xhc3MpID8gbWl0aHJpbF8xLm0oY2ZnLmNvbXBDbGFzcywgT2JqZWN0LmFzc2lnbihjZmcuYXR0cnMsIG5vZGUuYXR0cnMpKSA6IG1pdGhyaWxfMS5tKCdkaXYnLCAnd2FpdGluZycpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29uZmlnID0gQ29uZmlnO1xuZnVuY3Rpb24gdHJhbnNsYXRlKGNvbmZpZywgc3ViY2ZnLCBjb250ZXh0KSB7XG4gICAgaWYgKGlzU3lub255bShjb25maWcsIHN1YmNmZykpIHtcbiAgICAgICAgc3ViY2ZnID0gY29uZmlnW3N1YmNmZ107XG4gICAgfVxuICAgIGlmIChbJ3N0cmluZycsICdudW1iZXInLCAnYm9vbGVhbicsICdmdW5jdGlvbiddLmluZGV4T2YodHlwZW9mIHN1YmNmZykgPj0gMCkge1xuICAgICAgICByZXR1cm4gc3ViY2ZnO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gc3ViY2ZnLmxlbmd0aCA/IFtdIDoge307XG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5rZXlzKHN1YmNmZyk7XG4gICAgb3B0aW9ucy5tYXAoKG9wdCkgPT4ge1xuICAgICAgICBjb25zdCBjbCA9IHJlc29sdmUob3B0LCBjb250ZXh0KTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRyYW5zbGF0ZShjb25maWcsIHN1YmNmZ1tvcHRdLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKGNsKSB7XG4gICAgICAgICAgICBjb25zdCByID0ge1xuICAgICAgICAgICAgICAgIGNvbXBDbGFzczogY2wsXG4gICAgICAgICAgICAgICAgYXR0cnM6IGNvbnRlbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAoIUFycmF5LmlzQXJyYXkoc3ViY2ZnKSAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMSkgP1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHIgOlxuICAgICAgICAgICAgICAgIHJlc3VsdFtvcHRdID0gcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtvcHRdID0gY29udGVudDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiByZXNvbHZlKHN5bSwgY29udGV4dCkge1xuICAgIGxldCBjbDtcbiAgICBjb250ZXh0LnNvbWUoKGMpID0+IGNsID0gY1tzeW1dKTtcbiAgICByZXR1cm4gY2w7XG59XG5mdW5jdGlvbiBpc1N5bm9ueW0oY29uZmlnLCBrZXkpIHsgcmV0dXJuIHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmIGNvbmZpZ1trZXldOyB9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRMjl1Wm1sbkxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMME52Ym1acFp5NTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVRKRVFTeDFRMEZCY1VNN1FVRkxja01zVFVGQllTeE5RVUZOTzBsQlEyWXNUVUZCVFN4RFFVRkRMRWxCUVZVN1VVRkRZaXhOUVVGTkxFOUJRVThzUjBGQlV5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJRenRSUVVONlF5eEpRVUZKTEU5QlFVOHNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFdEJRVXNzVVVGQlVTeEZRVUZGTzFsQlEzWkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NSVUZCUlR0blFrRkJSU3hYUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETEVWQlFVVXNUVUZCVFN4RlFVRkZMRXRCUVVzc1JVRkJSU3hIUVVGSExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVc3NSVUZCUXl4RlFVRkZPMjlDUVVOMFJpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1IwRkJSeXhUUVVGVExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03WjBKQlEyNUVMRU5CUVVNc1EwRkJReXhEUVVGRE8yRkJRVVU3VTBGRFVqdGhRVUZOTzFsQlEwZ3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFZEJRVWNzVTBGQlV5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6dFRRVU5zUmp0SlFVTk1MRU5CUVVNN1NVRkRSQ3hKUVVGSkxFTkJRVU1zU1VGQlZUdFJRVU5ZTEUxQlFVMHNSMEZCUnl4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETzFGQlF6TkNMRTlCUVU4c1EwRkJReXhIUVVGSExFbEJRVWtzUjBGQlJ5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkJMRU5CUVVNc1EwRkJReXhYUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEZOQlFWTXNSVUZCUlN4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZkQlFVTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1UwRkJVeXhEUVVGRExFTkJRVU03U1VGRGFFZ3NRMEZCUXp0RFFVTktPMEZCWmtRc2QwSkJaVU03UVVGaFJDeFRRVUZUTEZOQlFWTXNRMEZCUXl4TlFVRlZMRVZCUVVVc1RVRkJWU3hGUVVGRkxFOUJRV0U3U1VGRmNFUXNTVUZCU1N4VFFVRlRMRU5CUVVNc1RVRkJUU3hGUVVGRkxFMUJRVTBzUTBGQlF5eEZRVUZGTzFGQlFVVXNUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dExRVUZGTzBsQlJUTkVMRWxCUVVrc1EwRkJReXhSUVVGUkxFVkJRVVVzVVVGQlVTeEZRVUZGTEZOQlFWTXNSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zVDBGQlR5eE5RVUZOTEVOQlFVTXNTVUZCUlN4RFFVRkRMRVZCUVVVN1VVRkJSU3hQUVVGUExFMUJRVTBzUTBGQlF6dExRVUZGTzBsQlF6ZEdMRWxCUVVrc1RVRkJUU3hIUVVGSExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVRXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETzBsQlJYQkRMRTFCUVUwc1QwRkJUeXhIUVVGSExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1NVRkRjRU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWRCUVZVc1JVRkJVU3hGUVVGRk8xRkJRemRDTEUxQlFVMHNSVUZCUlN4SFFVRlBMRTlCUVU4c1EwRkJReXhIUVVGSExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdVVUZEY2tNc1RVRkJUU3hQUVVGUExFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNSVUZCUlN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdVVUZEZUVRc1NVRkJTU3hGUVVGRkxFVkJRVVU3V1VGRFNpeE5RVUZOTEVOQlFVTXNSMEZCUnp0blFrRkRUaXhUUVVGVExFVkJRVU1zUlVGQlJUdG5Ra0ZEV2l4TFFVRkxMRVZCUVVNc1QwRkJUenRoUVVOb1FpeERRVUZETzFsQlEwWXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NUMEZCVHl4RFFVRkRMRTFCUVUwc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlFTeERRVUZETzJkQ1FVTTNReXhOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUTFvc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0VFFVTjJRanRoUVVOSk8xbEJRVVVzVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRTlCUVU4c1EwRkJRenRUUVVGRk8wbEJRMjVETEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTBnc1QwRkJUeXhOUVVGTkxFTkJRVU03UVVGRGJFSXNRMEZCUXp0QlFWVkVMRk5CUVZNc1QwRkJUeXhEUVVGRExFZEJRVlVzUlVGQlJTeFBRVUZoTzBsQlEzUkRMRWxCUVVrc1JVRkJUU3hEUVVGRE8wbEJRMWdzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVzc1JVRkJSU3hGUVVGRkxFTkJRVVVzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRM1JETEU5QlFVOHNSVUZCUlN4RFFVRkRPMEZCUTJRc1EwRkJRenRCUVVWRUxGTkJRVk1zVTBGQlV5eERRVUZETEUxQlFWVXNSVUZCUlN4SFFVRlBMRWxCUVVrc1QwRkJUeXhQUVVGUExFZEJRVWNzUzBGQlN5eFJRVUZSTEVsQlFVa3NUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHBpbGxhcnMgPSByZXF1aXJlKFwiLi92aWV3L1BpbGxhcmVkTGF5b3V0ZXJcIik7XG5pZiAocGlsbGFycykgeyB9XG5jb25zdCB0aWxlcyA9IHJlcXVpcmUoXCIuL3ZpZXcvVGlsZUxheW91dGVyXCIpO1xuaWYgKHRpbGVzKSB7IH1cbnZhciBMYXlvdXRfMSA9IHJlcXVpcmUoXCIuL3ZpZXcvTGF5b3V0XCIpO1xuZXhwb3J0cy5MYXlvdXQgPSBMYXlvdXRfMS5MYXlvdXQ7XG52YXIgVG9rZW5zXzEgPSByZXF1aXJlKFwiLi92aWV3L1Rva2Vuc1wiKTtcbmV4cG9ydHMuRklMTCA9IFRva2Vuc18xLkZJTEw7XG5leHBvcnRzLnB4ID0gVG9rZW5zXzEucHg7XG5leHBvcnRzLnBjID0gVG9rZW5zXzEucGM7XG5leHBvcnRzLkxheW91dFRva2VuID0gVG9rZW5zXzEuTGF5b3V0VG9rZW47XG52YXIgTGF5b3V0ZXJfMSA9IHJlcXVpcmUoXCIuL3ZpZXcvTGF5b3V0ZXJcIik7XG5leHBvcnRzLkxheW91dGVyID0gTGF5b3V0ZXJfMS5MYXlvdXRlcjtcbnZhciBDb25maWdfMSA9IHJlcXVpcmUoXCIuL0NvbmZpZ1wiKTtcbmV4cG9ydHMuQ29uZmlnID0gQ29uZmlnXzEuQ29uZmlnO1xudmFyIG1pdGhyaWxfMSA9IHJlcXVpcmUoXCIuL21pdGhyaWxcIik7XG5leHBvcnRzLm0gPSBtaXRocmlsXzEubTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdmFXNWtaWGd1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkpRU3h0UkVGQmRVUTdRVUZCVFN4SlFVRkhMRTlCUVU4c1JVRkJSU3hIUVVGRk8wRkJRek5GTERaRFFVRnRSRHRCUVVGVkxFbEJRVWNzUzBGQlN5eEZRVUZGTEVkQlFVVTdRVUZGZWtVc2QwTkJRVFpETzBGQlFYQkRMREJDUVVGQkxFMUJRVTBzUTBGQlFUdEJRVU5tTEhkRFFVTTJRenRCUVVSd1F5eDNRa0ZCUVN4SlFVRkpMRU5CUVVFN1FVRkJSU3h6UWtGQlFTeEZRVUZGTEVOQlFVRTdRVUZCUlN4elFrRkJRU3hGUVVGRkxFTkJRVUU3UVVGRFdpd3JRa0ZCUVN4WFFVRlhMRU5CUVVFN1FVRkRjRUlzTkVOQlFTdERPMEZCUVhSRExEaENRVUZCTEZGQlFWRXNRMEZCUVR0QlFVTnFRaXh0UTBGQmQwTTdRVUZCTDBJc01FSkJRVUVzVFVGQlRTeERRVUZCTzBGQlEyWXNjVU5CUVhkRE8wRkJRUzlDTEhOQ1FVRkJMRU5CUVVNc1EwRkJRU0o5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm0gPSByZXF1aXJlKFwibWl0aHJpbFwiKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJXbDBhSEpwYkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OXRhWFJvY21sc0xuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCVVdFc1VVRkJRU3hEUVVGRExFZEJRVWNzVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHJlbmRlciwgc2NoZWR1bGUsIGNvbnNvbGUpIHtcblx0dmFyIHN1YnNjcmlwdGlvbnMgPSBbXVxuXHR2YXIgcmVuZGVyaW5nID0gZmFsc2Vcblx0dmFyIHBlbmRpbmcgPSBmYWxzZVxuXG5cdGZ1bmN0aW9uIHN5bmMoKSB7XG5cdFx0aWYgKHJlbmRlcmluZykgdGhyb3cgbmV3IEVycm9yKFwiTmVzdGVkIG0ucmVkcmF3LnN5bmMoKSBjYWxsXCIpXG5cdFx0cmVuZGVyaW5nID0gdHJ1ZVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaXB0aW9ucy5sZW5ndGg7IGkgKz0gMikge1xuXHRcdFx0dHJ5IHsgcmVuZGVyKHN1YnNjcmlwdGlvbnNbaV0sIFZub2RlKHN1YnNjcmlwdGlvbnNbaSArIDFdKSwgcmVkcmF3KSB9XG5cdFx0XHRjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKGUpIH1cblx0XHR9XG5cdFx0cmVuZGVyaW5nID0gZmFsc2Vcblx0fVxuXG5cdGZ1bmN0aW9uIHJlZHJhdygpIHtcblx0XHRpZiAoIXBlbmRpbmcpIHtcblx0XHRcdHBlbmRpbmcgPSB0cnVlXG5cdFx0XHRzY2hlZHVsZShmdW5jdGlvbigpIHtcblx0XHRcdFx0cGVuZGluZyA9IGZhbHNlXG5cdFx0XHRcdHN5bmMoKVxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRyZWRyYXcuc3luYyA9IHN5bmNcblxuXHRmdW5jdGlvbiBtb3VudChyb290LCBjb21wb25lbnQpIHtcblx0XHRpZiAoY29tcG9uZW50ICE9IG51bGwgJiYgY29tcG9uZW50LnZpZXcgPT0gbnVsbCAmJiB0eXBlb2YgY29tcG9uZW50ICE9PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJtLm1vdW50KGVsZW1lbnQsIGNvbXBvbmVudCkgZXhwZWN0cyBhIGNvbXBvbmVudCwgbm90IGEgdm5vZGVcIilcblx0XHR9XG5cblx0XHR2YXIgaW5kZXggPSBzdWJzY3JpcHRpb25zLmluZGV4T2Yocm9vdClcblx0XHRpZiAoaW5kZXggPj0gMCkge1xuXHRcdFx0c3Vic2NyaXB0aW9ucy5zcGxpY2UoaW5kZXgsIDIpXG5cdFx0XHRyZW5kZXIocm9vdCwgW10sIHJlZHJhdylcblx0XHR9XG5cblx0XHRpZiAoY29tcG9uZW50ICE9IG51bGwpIHtcblx0XHRcdHN1YnNjcmlwdGlvbnMucHVzaChyb290LCBjb21wb25lbnQpXG5cdFx0XHRyZW5kZXIocm9vdCwgVm5vZGUoY29tcG9uZW50KSwgcmVkcmF3KVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7bW91bnQ6IG1vdW50LCByZWRyYXc6IHJlZHJhd31cbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcbnZhciBtID0gcmVxdWlyZShcIi4uL3JlbmRlci9oeXBlcnNjcmlwdFwiKVxudmFyIFByb21pc2UgPSByZXF1aXJlKFwiLi4vcHJvbWlzZS9wcm9taXNlXCIpXG5cbnZhciBidWlsZFBhdGhuYW1lID0gcmVxdWlyZShcIi4uL3BhdGhuYW1lL2J1aWxkXCIpXG52YXIgcGFyc2VQYXRobmFtZSA9IHJlcXVpcmUoXCIuLi9wYXRobmFtZS9wYXJzZVwiKVxudmFyIGNvbXBpbGVUZW1wbGF0ZSA9IHJlcXVpcmUoXCIuLi9wYXRobmFtZS9jb21waWxlVGVtcGxhdGVcIilcbnZhciBhc3NpZ24gPSByZXF1aXJlKFwiLi4vcGF0aG5hbWUvYXNzaWduXCIpXG5cbnZhciBzZW50aW5lbCA9IHt9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHdpbmRvdywgbW91bnRSZWRyYXcpIHtcblx0dmFyIGZpcmVBc3luY1xuXG5cdGZ1bmN0aW9uIHNldFBhdGgocGF0aCwgZGF0YSwgb3B0aW9ucykge1xuXHRcdHBhdGggPSBidWlsZFBhdGhuYW1lKHBhdGgsIGRhdGEpXG5cdFx0aWYgKGZpcmVBc3luYyAhPSBudWxsKSB7XG5cdFx0XHRmaXJlQXN5bmMoKVxuXHRcdFx0dmFyIHN0YXRlID0gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdGUgOiBudWxsXG5cdFx0XHR2YXIgdGl0bGUgPSBvcHRpb25zID8gb3B0aW9ucy50aXRsZSA6IG51bGxcblx0XHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMucmVwbGFjZSkgJHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShzdGF0ZSwgdGl0bGUsIHJvdXRlLnByZWZpeCArIHBhdGgpXG5cdFx0XHRlbHNlICR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoc3RhdGUsIHRpdGxlLCByb3V0ZS5wcmVmaXggKyBwYXRoKVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdCR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJvdXRlLnByZWZpeCArIHBhdGhcblx0XHR9XG5cdH1cblxuXHR2YXIgY3VycmVudFJlc29sdmVyID0gc2VudGluZWwsIGNvbXBvbmVudCwgYXR0cnMsIGN1cnJlbnRQYXRoLCBsYXN0VXBkYXRlXG5cblx0dmFyIFNLSVAgPSByb3V0ZS5TS0lQID0ge31cblxuXHRmdW5jdGlvbiByb3V0ZShyb290LCBkZWZhdWx0Um91dGUsIHJvdXRlcykge1xuXHRcdGlmIChyb290ID09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIkVuc3VyZSB0aGUgRE9NIGVsZW1lbnQgdGhhdCB3YXMgcGFzc2VkIHRvIGBtLnJvdXRlYCBpcyBub3QgdW5kZWZpbmVkXCIpXG5cdFx0Ly8gMCA9IHN0YXJ0XG5cdFx0Ly8gMSA9IGluaXRcblx0XHQvLyAyID0gcmVhZHlcblx0XHR2YXIgc3RhdGUgPSAwXG5cblx0XHR2YXIgY29tcGlsZWQgPSBPYmplY3Qua2V5cyhyb3V0ZXMpLm1hcChmdW5jdGlvbihyb3V0ZSkge1xuXHRcdFx0aWYgKHJvdXRlWzBdICE9PSBcIi9cIikgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiUm91dGVzIG11c3Qgc3RhcnQgd2l0aCBhIGAvYFwiKVxuXHRcdFx0aWYgKCgvOihbXlxcL1xcLi1dKykoXFwuezN9KT86LykudGVzdChyb3V0ZSkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFN5bnRheEVycm9yKFwiUm91dGUgcGFyYW1ldGVyIG5hbWVzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggZWl0aGVyIGAvYCwgYC5gLCBvciBgLWBcIilcblx0XHRcdH1cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJvdXRlOiByb3V0ZSxcblx0XHRcdFx0Y29tcG9uZW50OiByb3V0ZXNbcm91dGVdLFxuXHRcdFx0XHRjaGVjazogY29tcGlsZVRlbXBsYXRlKHJvdXRlKSxcblx0XHRcdH1cblx0XHR9KVxuXHRcdHZhciBjYWxsQXN5bmMgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBzZXRUaW1lb3V0XG5cdFx0dmFyIHAgPSBQcm9taXNlLnJlc29sdmUoKVxuXHRcdHZhciBzY2hlZHVsZWQgPSBmYWxzZVxuXHRcdHZhciBvbnJlbW92ZVxuXG5cdFx0ZmlyZUFzeW5jID0gbnVsbFxuXG5cdFx0aWYgKGRlZmF1bHRSb3V0ZSAhPSBudWxsKSB7XG5cdFx0XHR2YXIgZGVmYXVsdERhdGEgPSBwYXJzZVBhdGhuYW1lKGRlZmF1bHRSb3V0ZSlcblxuXHRcdFx0aWYgKCFjb21waWxlZC5zb21lKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLmNoZWNrKGRlZmF1bHREYXRhKSB9KSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJEZWZhdWx0IHJvdXRlIGRvZXNuJ3QgbWF0Y2ggYW55IGtub3duIHJvdXRlc1wiKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlc29sdmVSb3V0ZSgpIHtcblx0XHRcdHNjaGVkdWxlZCA9IGZhbHNlXG5cdFx0XHQvLyBDb25zaWRlciB0aGUgcGF0aG5hbWUgaG9saXN0aWNhbGx5LiBUaGUgcHJlZml4IG1pZ2h0IGV2ZW4gYmUgaW52YWxpZCxcblx0XHRcdC8vIGJ1dCB0aGF0J3Mgbm90IG91ciBwcm9ibGVtLlxuXHRcdFx0dmFyIHByZWZpeCA9ICR3aW5kb3cubG9jYXRpb24uaGFzaFxuXHRcdFx0aWYgKHJvdXRlLnByZWZpeFswXSAhPT0gXCIjXCIpIHtcblx0XHRcdFx0cHJlZml4ID0gJHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKyBwcmVmaXhcblx0XHRcdFx0aWYgKHJvdXRlLnByZWZpeFswXSAhPT0gXCI/XCIpIHtcblx0XHRcdFx0XHRwcmVmaXggPSAkd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgcHJlZml4XG5cdFx0XHRcdFx0aWYgKHByZWZpeFswXSAhPT0gXCIvXCIpIHByZWZpeCA9IFwiL1wiICsgcHJlZml4XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIFRoaXMgc2VlbWluZ2x5IHVzZWxlc3MgYC5jb25jYXQoKWAgc3BlZWRzIHVwIHRoZSB0ZXN0cyBxdWl0ZSBhIGJpdCxcblx0XHRcdC8vIHNpbmNlIHRoZSByZXByZXNlbnRhdGlvbiBpcyBjb25zaXN0ZW50bHkgYSByZWxhdGl2ZWx5IHBvb3JseVxuXHRcdFx0Ly8gb3B0aW1pemVkIGNvbnMgc3RyaW5nLlxuXHRcdFx0dmFyIHBhdGggPSBwcmVmaXguY29uY2F0KClcblx0XHRcdFx0LnJlcGxhY2UoLyg/OiVbYS1mODldW2EtZjAtOV0pKy9naW0sIGRlY29kZVVSSUNvbXBvbmVudClcblx0XHRcdFx0LnNsaWNlKHJvdXRlLnByZWZpeC5sZW5ndGgpXG5cdFx0XHR2YXIgZGF0YSA9IHBhcnNlUGF0aG5hbWUocGF0aClcblxuXHRcdFx0YXNzaWduKGRhdGEucGFyYW1zLCAkd2luZG93Lmhpc3Rvcnkuc3RhdGUpXG5cblx0XHRcdGZ1bmN0aW9uIGZhaWwoKSB7XG5cdFx0XHRcdGlmIChwYXRoID09PSBkZWZhdWx0Um91dGUpIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCByZXNvbHZlIGRlZmF1bHQgcm91dGUgXCIgKyBkZWZhdWx0Um91dGUpXG5cdFx0XHRcdHNldFBhdGgoZGVmYXVsdFJvdXRlLCBudWxsLCB7cmVwbGFjZTogdHJ1ZX0pXG5cdFx0XHR9XG5cblx0XHRcdGxvb3AoMClcblx0XHRcdGZ1bmN0aW9uIGxvb3AoaSkge1xuXHRcdFx0XHQvLyAwID0gaW5pdFxuXHRcdFx0XHQvLyAxID0gc2NoZWR1bGVkXG5cdFx0XHRcdC8vIDIgPSBkb25lXG5cdFx0XHRcdGZvciAoOyBpIDwgY29tcGlsZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAoY29tcGlsZWRbaV0uY2hlY2soZGF0YSkpIHtcblx0XHRcdFx0XHRcdHZhciBwYXlsb2FkID0gY29tcGlsZWRbaV0uY29tcG9uZW50XG5cdFx0XHRcdFx0XHR2YXIgbWF0Y2hlZFJvdXRlID0gY29tcGlsZWRbaV0ucm91dGVcblx0XHRcdFx0XHRcdHZhciBsb2NhbENvbXAgPSBwYXlsb2FkXG5cdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gbGFzdFVwZGF0ZSA9IGZ1bmN0aW9uKGNvbXApIHtcblx0XHRcdFx0XHRcdFx0aWYgKHVwZGF0ZSAhPT0gbGFzdFVwZGF0ZSkgcmV0dXJuXG5cdFx0XHRcdFx0XHRcdGlmIChjb21wID09PSBTS0lQKSByZXR1cm4gbG9vcChpICsgMSlcblx0XHRcdFx0XHRcdFx0Y29tcG9uZW50ID0gY29tcCAhPSBudWxsICYmICh0eXBlb2YgY29tcC52aWV3ID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIGNvbXAgPT09IFwiZnVuY3Rpb25cIik/IGNvbXAgOiBcImRpdlwiXG5cdFx0XHRcdFx0XHRcdGF0dHJzID0gZGF0YS5wYXJhbXMsIGN1cnJlbnRQYXRoID0gcGF0aCwgbGFzdFVwZGF0ZSA9IG51bGxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFJlc29sdmVyID0gcGF5bG9hZC5yZW5kZXIgPyBwYXlsb2FkIDogbnVsbFxuXHRcdFx0XHRcdFx0XHRpZiAoc3RhdGUgPT09IDIpIG1vdW50UmVkcmF3LnJlZHJhdygpXG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHN0YXRlID0gMlxuXHRcdFx0XHRcdFx0XHRcdG1vdW50UmVkcmF3LnJlZHJhdy5zeW5jKClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gVGhlcmUncyBubyB1bmRlcnN0YXRpbmcgaG93IG11Y2ggSSAqd2lzaCogSSBjb3VsZFxuXHRcdFx0XHRcdFx0Ly8gdXNlIGBhc3luY2AvYGF3YWl0YCBoZXJlLi4uXG5cdFx0XHRcdFx0XHRpZiAocGF5bG9hZC52aWV3IHx8IHR5cGVvZiBwYXlsb2FkID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0cGF5bG9hZCA9IHt9XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZShsb2NhbENvbXApXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmIChwYXlsb2FkLm9ubWF0Y2gpIHtcblx0XHRcdFx0XHRcdFx0cC50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcGF5bG9hZC5vbm1hdGNoKGRhdGEucGFyYW1zLCBwYXRoLCBtYXRjaGVkUm91dGUpXG5cdFx0XHRcdFx0XHRcdH0pLnRoZW4odXBkYXRlLCBmYWlsKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB1cGRhdGUoXCJkaXZcIilcblx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRmYWlsKClcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBTZXQgaXQgdW5jb25kaXRpb25hbGx5IHNvIGBtLnJvdXRlLnNldGAgYW5kIGBtLnJvdXRlLkxpbmtgIGJvdGggd29yayxcblx0XHQvLyBldmVuIGlmIG5laXRoZXIgYHB1c2hTdGF0ZWAgbm9yIGBoYXNoY2hhbmdlYCBhcmUgc3VwcG9ydGVkLiBJdCdzXG5cdFx0Ly8gY2xlYXJlZCBpZiBgaGFzaGNoYW5nZWAgaXMgdXNlZCwgc2luY2UgdGhhdCBtYWtlcyBpdCBhdXRvbWF0aWNhbGx5XG5cdFx0Ly8gYXN5bmMuXG5cdFx0ZmlyZUFzeW5jID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIXNjaGVkdWxlZCkge1xuXHRcdFx0XHRzY2hlZHVsZWQgPSB0cnVlXG5cdFx0XHRcdGNhbGxBc3luYyhyZXNvbHZlUm91dGUpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiAkd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdG9ucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZpcmVBc3luYywgZmFsc2UpXG5cdFx0XHR9XG5cdFx0XHQkd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBmaXJlQXN5bmMsIGZhbHNlKVxuXHRcdH0gZWxzZSBpZiAocm91dGUucHJlZml4WzBdID09PSBcIiNcIikge1xuXHRcdFx0ZmlyZUFzeW5jID0gbnVsbFxuXHRcdFx0b25yZW1vdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0JHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCByZXNvbHZlUm91dGUsIGZhbHNlKVxuXHRcdFx0fVxuXHRcdFx0JHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCByZXNvbHZlUm91dGUsIGZhbHNlKVxuXHRcdH1cblxuXHRcdHJldHVybiBtb3VudFJlZHJhdy5tb3VudChyb290LCB7XG5cdFx0XHRvbmJlZm9yZXVwZGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHN0YXRlID0gc3RhdGUgPyAyIDogMVxuXHRcdFx0XHRyZXR1cm4gISghc3RhdGUgfHwgc2VudGluZWwgPT09IGN1cnJlbnRSZXNvbHZlcilcblx0XHRcdH0sXG5cdFx0XHRvbmNyZWF0ZTogcmVzb2x2ZVJvdXRlLFxuXHRcdFx0b25yZW1vdmU6IG9ucmVtb3ZlLFxuXHRcdFx0dmlldzogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICghc3RhdGUgfHwgc2VudGluZWwgPT09IGN1cnJlbnRSZXNvbHZlcikgcmV0dXJuXG5cdFx0XHRcdC8vIFdyYXAgaW4gYSBmcmFnbWVudCB0byBwcmVzZXJ2ZSBleGlzdGluZyBrZXkgc2VtYW50aWNzXG5cdFx0XHRcdHZhciB2bm9kZSA9IFtWbm9kZShjb21wb25lbnQsIGF0dHJzLmtleSwgYXR0cnMpXVxuXHRcdFx0XHRpZiAoY3VycmVudFJlc29sdmVyKSB2bm9kZSA9IGN1cnJlbnRSZXNvbHZlci5yZW5kZXIodm5vZGVbMF0pXG5cdFx0XHRcdHJldHVybiB2bm9kZVxuXHRcdFx0fSxcblx0XHR9KVxuXHR9XG5cdHJvdXRlLnNldCA9IGZ1bmN0aW9uKHBhdGgsIGRhdGEsIG9wdGlvbnMpIHtcblx0XHRpZiAobGFzdFVwZGF0ZSAhPSBudWxsKSB7XG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXHRcdFx0b3B0aW9ucy5yZXBsYWNlID0gdHJ1ZVxuXHRcdH1cblx0XHRsYXN0VXBkYXRlID0gbnVsbFxuXHRcdHNldFBhdGgocGF0aCwgZGF0YSwgb3B0aW9ucylcblx0fVxuXHRyb3V0ZS5nZXQgPSBmdW5jdGlvbigpIHtyZXR1cm4gY3VycmVudFBhdGh9XG5cdHJvdXRlLnByZWZpeCA9IFwiIyFcIlxuXHRyb3V0ZS5MaW5rID0ge1xuXHRcdHZpZXc6IGZ1bmN0aW9uKHZub2RlKSB7XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHZub2RlLmF0dHJzLm9wdGlvbnNcblx0XHRcdC8vIFJlbW92ZSB0aGVzZSBzbyB0aGV5IGRvbid0IGdldCBvdmVyd3JpdHRlblxuXHRcdFx0dmFyIGF0dHJzID0ge30sIG9uY2xpY2ssIGhyZWZcblx0XHRcdGFzc2lnbihhdHRycywgdm5vZGUuYXR0cnMpXG5cdFx0XHQvLyBUaGUgZmlyc3QgdHdvIGFyZSBpbnRlcm5hbCwgYnV0IHRoZSByZXN0IGFyZSBtYWdpYyBhdHRyaWJ1dGVzXG5cdFx0XHQvLyB0aGF0IG5lZWQgY2Vuc29yZWQgdG8gbm90IHNjcmV3IHVwIHJlbmRlcmluZy5cblx0XHRcdGF0dHJzLnNlbGVjdG9yID0gYXR0cnMub3B0aW9ucyA9IGF0dHJzLmtleSA9IGF0dHJzLm9uaW5pdCA9XG5cdFx0XHRhdHRycy5vbmNyZWF0ZSA9IGF0dHJzLm9uYmVmb3JldXBkYXRlID0gYXR0cnMub251cGRhdGUgPVxuXHRcdFx0YXR0cnMub25iZWZvcmVyZW1vdmUgPSBhdHRycy5vbnJlbW92ZSA9IG51bGxcblxuXHRcdFx0Ly8gRG8gdGhpcyBub3cgc28gd2UgY2FuIGdldCB0aGUgbW9zdCBjdXJyZW50IGBocmVmYCBhbmQgYGRpc2FibGVkYC5cblx0XHRcdC8vIFRob3NlIGF0dHJpYnV0ZXMgbWF5IGFsc28gYmUgc3BlY2lmaWVkIGluIHRoZSBzZWxlY3RvciwgYW5kIHdlXG5cdFx0XHQvLyBzaG91bGQgaG9ub3IgdGhhdC5cblx0XHRcdHZhciBjaGlsZCA9IG0odm5vZGUuYXR0cnMuc2VsZWN0b3IgfHwgXCJhXCIsIGF0dHJzLCB2bm9kZS5jaGlsZHJlbilcblxuXHRcdFx0Ly8gTGV0J3MgcHJvdmlkZSBhICpyaWdodCogd2F5IHRvIGRpc2FibGUgYSByb3V0ZSBsaW5rLCByYXRoZXIgdGhhblxuXHRcdFx0Ly8gbGV0dGluZyBwZW9wbGUgc2NyZXcgdXAgYWNjZXNzaWJpbGl0eSBvbiBhY2NpZGVudC5cblx0XHRcdC8vXG5cdFx0XHQvLyBUaGUgYXR0cmlidXRlIGlzIGNvZXJjZWQgc28gdXNlcnMgZG9uJ3QgZ2V0IHN1cnByaXNlZCBvdmVyXG5cdFx0XHQvLyBgZGlzYWJsZWQ6IDBgIHJlc3VsdGluZyBpbiBhIGJ1dHRvbiB0aGF0J3Mgc29tZWhvdyByb3V0YWJsZVxuXHRcdFx0Ly8gZGVzcGl0ZSBiZWluZyB2aXNpYmx5IGRpc2FibGVkLlxuXHRcdFx0aWYgKGNoaWxkLmF0dHJzLmRpc2FibGVkID0gQm9vbGVhbihjaGlsZC5hdHRycy5kaXNhYmxlZCkpIHtcblx0XHRcdFx0Y2hpbGQuYXR0cnMuaHJlZiA9IG51bGxcblx0XHRcdFx0Y2hpbGQuYXR0cnNbXCJhcmlhLWRpc2FibGVkXCJdID0gXCJ0cnVlXCJcblx0XHRcdFx0Ly8gSWYgeW91ICpyZWFsbHkqIGRvIHdhbnQgdG8gZG8gdGhpcyBvbiBhIGRpc2FibGVkIGxpbmssIHVzZVxuXHRcdFx0XHQvLyBhbiBgb25jcmVhdGVgIGhvb2sgdG8gYWRkIGl0LlxuXHRcdFx0XHRjaGlsZC5hdHRycy5vbmNsaWNrID0gbnVsbFxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b25jbGljayA9IGNoaWxkLmF0dHJzLm9uY2xpY2tcblx0XHRcdFx0aHJlZiA9IGNoaWxkLmF0dHJzLmhyZWZcblx0XHRcdFx0Y2hpbGQuYXR0cnMuaHJlZiA9IHJvdXRlLnByZWZpeCArIGhyZWZcblx0XHRcdFx0Y2hpbGQuYXR0cnMub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHR2YXIgcmVzdWx0XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBvbmNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IG9uY2xpY2suY2FsbChlLmN1cnJlbnRUYXJnZXQsIGUpXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChvbmNsaWNrID09IG51bGwgfHwgdHlwZW9mIG9uY2xpY2sgIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0XHRcdC8vIGRvIG5vdGhpbmdcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvbmNsaWNrLmhhbmRsZUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdG9uY2xpY2suaGFuZGxlRXZlbnQoZSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBBZGFwdGVkIGZyb20gUmVhY3QgUm91dGVyJ3MgaW1wbGVtZW50YXRpb246XG5cdFx0XHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0VHJhaW5pbmcvcmVhY3Qtcm91dGVyL2Jsb2IvNTIwYTBhY2Q0OGFlMWIwNjZlYjBiMDdkNmQ0ZDE3OTBhMWQwMjQ4Mi9wYWNrYWdlcy9yZWFjdC1yb3V0ZXItZG9tL21vZHVsZXMvTGluay5qc1xuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0Ly8gVHJ5IHRvIGJlIGZsZXhpYmxlIGFuZCBpbnR1aXRpdmUgaW4gaG93IHdlIGhhbmRsZSBsaW5rcy5cblx0XHRcdFx0XHQvLyBGdW4gZmFjdDogbGlua3MgYXJlbid0IGFzIG9idmlvdXMgdG8gZ2V0IHJpZ2h0IGFzIHlvdVxuXHRcdFx0XHRcdC8vIHdvdWxkIGV4cGVjdC4gVGhlcmUncyBhIGxvdCBtb3JlIHZhbGlkIHdheXMgdG8gY2xpY2sgYVxuXHRcdFx0XHRcdC8vIGxpbmsgdGhhbiB0aGlzLCBhbmQgb25lIG1pZ2h0IHdhbnQgdG8gbm90IHNpbXBseSBjbGljayBhXG5cdFx0XHRcdFx0Ly8gbGluaywgYnV0IHJpZ2h0IGNsaWNrIG9yIGNvbW1hbmQtY2xpY2sgaXQgdG8gY29weSB0aGVcblx0XHRcdFx0XHQvLyBsaW5rIHRhcmdldCwgZXRjLiBOb3BlLCB0aGlzIGlzbid0IGp1c3QgZm9yIGJsaW5kIHBlb3BsZS5cblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHQvLyBTa2lwIGlmIGBvbmNsaWNrYCBwcmV2ZW50ZWQgZGVmYXVsdFxuXHRcdFx0XHRcdFx0cmVzdWx0ICE9PSBmYWxzZSAmJiAhZS5kZWZhdWx0UHJldmVudGVkICYmXG5cdFx0XHRcdFx0XHQvLyBJZ25vcmUgZXZlcnl0aGluZyBidXQgbGVmdCBjbGlja3Ncblx0XHRcdFx0XHRcdChlLmJ1dHRvbiA9PT0gMCB8fCBlLndoaWNoID09PSAwIHx8IGUud2hpY2ggPT09IDEpICYmXG5cdFx0XHRcdFx0XHQvLyBMZXQgdGhlIGJyb3dzZXIgaGFuZGxlIGB0YXJnZXQ9X2JsYW5rYCwgZXRjLlxuXHRcdFx0XHRcdFx0KCFlLmN1cnJlbnRUYXJnZXQudGFyZ2V0IHx8IGUuY3VycmVudFRhcmdldC50YXJnZXQgPT09IFwiX3NlbGZcIikgJiZcblx0XHRcdFx0XHRcdC8vIE5vIG1vZGlmaWVyIGtleXNcblx0XHRcdFx0XHRcdCFlLmN0cmxLZXkgJiYgIWUubWV0YUtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5hbHRLZXlcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdFx0ZS5yZWRyYXcgPSBmYWxzZVxuXHRcdFx0XHRcdFx0cm91dGUuc2V0KGhyZWYsIG51bGwsIG9wdGlvbnMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY2hpbGRcblx0XHR9LFxuXHR9XG5cdHJvdXRlLnBhcmFtID0gZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIGF0dHJzICYmIGtleSAhPSBudWxsID8gYXR0cnNba2V5XSA6IGF0dHJzXG5cdH1cblxuXHRyZXR1cm4gcm91dGVcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBoeXBlcnNjcmlwdCA9IHJlcXVpcmUoXCIuL3JlbmRlci9oeXBlcnNjcmlwdFwiKVxuXG5oeXBlcnNjcmlwdC50cnVzdCA9IHJlcXVpcmUoXCIuL3JlbmRlci90cnVzdFwiKVxuaHlwZXJzY3JpcHQuZnJhZ21lbnQgPSByZXF1aXJlKFwiLi9yZW5kZXIvZnJhZ21lbnRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBoeXBlcnNjcmlwdFxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGh5cGVyc2NyaXB0ID0gcmVxdWlyZShcIi4vaHlwZXJzY3JpcHRcIilcbnZhciByZXF1ZXN0ID0gcmVxdWlyZShcIi4vcmVxdWVzdFwiKVxudmFyIG1vdW50UmVkcmF3ID0gcmVxdWlyZShcIi4vbW91bnQtcmVkcmF3XCIpXG5cbnZhciBtID0gZnVuY3Rpb24gbSgpIHsgcmV0dXJuIGh5cGVyc2NyaXB0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfVxubS5tID0gaHlwZXJzY3JpcHRcbm0udHJ1c3QgPSBoeXBlcnNjcmlwdC50cnVzdFxubS5mcmFnbWVudCA9IGh5cGVyc2NyaXB0LmZyYWdtZW50XG5tLm1vdW50ID0gbW91bnRSZWRyYXcubW91bnRcbm0ucm91dGUgPSByZXF1aXJlKFwiLi9yb3V0ZVwiKVxubS5yZW5kZXIgPSByZXF1aXJlKFwiLi9yZW5kZXJcIilcbm0ucmVkcmF3ID0gbW91bnRSZWRyYXcucmVkcmF3XG5tLnJlcXVlc3QgPSByZXF1ZXN0LnJlcXVlc3Rcbm0uanNvbnAgPSByZXF1ZXN0Lmpzb25wXG5tLnBhcnNlUXVlcnlTdHJpbmcgPSByZXF1aXJlKFwiLi9xdWVyeXN0cmluZy9wYXJzZVwiKVxubS5idWlsZFF1ZXJ5U3RyaW5nID0gcmVxdWlyZShcIi4vcXVlcnlzdHJpbmcvYnVpbGRcIilcbm0ucGFyc2VQYXRobmFtZSA9IHJlcXVpcmUoXCIuL3BhdGhuYW1lL3BhcnNlXCIpXG5tLmJ1aWxkUGF0aG5hbWUgPSByZXF1aXJlKFwiLi9wYXRobmFtZS9idWlsZFwiKVxubS52bm9kZSA9IHJlcXVpcmUoXCIuL3JlbmRlci92bm9kZVwiKVxubS5Qcm9taXNlUG9seWZpbGwgPSByZXF1aXJlKFwiLi9wcm9taXNlL3BvbHlmaWxsXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gbVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIHJlbmRlciA9IHJlcXVpcmUoXCIuL3JlbmRlclwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2FwaS9tb3VudC1yZWRyYXdcIikocmVuZGVyLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIGNvbnNvbGUpXG4iLCJcInVzZSBzdHJpY3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2UpIHtcblx0aWYoc291cmNlKSBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV0gfSlcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBidWlsZFF1ZXJ5U3RyaW5nID0gcmVxdWlyZShcIi4uL3F1ZXJ5c3RyaW5nL2J1aWxkXCIpXG52YXIgYXNzaWduID0gcmVxdWlyZShcIi4vYXNzaWduXCIpXG5cbi8vIFJldHVybnMgYHBhdGhgIGZyb20gYHRlbXBsYXRlYCArIGBwYXJhbXNgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRlbXBsYXRlLCBwYXJhbXMpIHtcblx0aWYgKCgvOihbXlxcL1xcLi1dKykoXFwuezN9KT86LykudGVzdCh0ZW1wbGF0ZSkpIHtcblx0XHR0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJUZW1wbGF0ZSBwYXJhbWV0ZXIgbmFtZXMgKm11c3QqIGJlIHNlcGFyYXRlZFwiKVxuXHR9XG5cdGlmIChwYXJhbXMgPT0gbnVsbCkgcmV0dXJuIHRlbXBsYXRlXG5cdHZhciBxdWVyeUluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihcIj9cIilcblx0dmFyIGhhc2hJbmRleCA9IHRlbXBsYXRlLmluZGV4T2YoXCIjXCIpXG5cdHZhciBxdWVyeUVuZCA9IGhhc2hJbmRleCA8IDAgPyB0ZW1wbGF0ZS5sZW5ndGggOiBoYXNoSW5kZXhcblx0dmFyIHBhdGhFbmQgPSBxdWVyeUluZGV4IDwgMCA/IHF1ZXJ5RW5kIDogcXVlcnlJbmRleFxuXHR2YXIgcGF0aCA9IHRlbXBsYXRlLnNsaWNlKDAsIHBhdGhFbmQpXG5cdHZhciBxdWVyeSA9IHt9XG5cblx0YXNzaWduKHF1ZXJ5LCBwYXJhbXMpXG5cblx0dmFyIHJlc29sdmVkID0gcGF0aC5yZXBsYWNlKC86KFteXFwvXFwuLV0rKShcXC57M30pPy9nLCBmdW5jdGlvbihtLCBrZXksIHZhcmlhZGljKSB7XG5cdFx0ZGVsZXRlIHF1ZXJ5W2tleV1cblx0XHQvLyBJZiBubyBzdWNoIHBhcmFtZXRlciBleGlzdHMsIGRvbid0IGludGVycG9sYXRlIGl0LlxuXHRcdGlmIChwYXJhbXNba2V5XSA9PSBudWxsKSByZXR1cm4gbVxuXHRcdC8vIEVzY2FwZSBub3JtYWwgcGFyYW1ldGVycywgYnV0IG5vdCB2YXJpYWRpYyBvbmVzLlxuXHRcdHJldHVybiB2YXJpYWRpYyA/IHBhcmFtc1trZXldIDogZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhwYXJhbXNba2V5XSkpXG5cdH0pXG5cblx0Ly8gSW4gY2FzZSB0aGUgdGVtcGxhdGUgc3Vic3RpdHV0aW9uIGFkZHMgbmV3IHF1ZXJ5L2hhc2ggcGFyYW1ldGVycy5cblx0dmFyIG5ld1F1ZXJ5SW5kZXggPSByZXNvbHZlZC5pbmRleE9mKFwiP1wiKVxuXHR2YXIgbmV3SGFzaEluZGV4ID0gcmVzb2x2ZWQuaW5kZXhPZihcIiNcIilcblx0dmFyIG5ld1F1ZXJ5RW5kID0gbmV3SGFzaEluZGV4IDwgMCA/IHJlc29sdmVkLmxlbmd0aCA6IG5ld0hhc2hJbmRleFxuXHR2YXIgbmV3UGF0aEVuZCA9IG5ld1F1ZXJ5SW5kZXggPCAwID8gbmV3UXVlcnlFbmQgOiBuZXdRdWVyeUluZGV4XG5cdHZhciByZXN1bHQgPSByZXNvbHZlZC5zbGljZSgwLCBuZXdQYXRoRW5kKVxuXG5cdGlmIChxdWVyeUluZGV4ID49IDApIHJlc3VsdCArPSB0ZW1wbGF0ZS5zbGljZShxdWVyeUluZGV4LCBxdWVyeUVuZClcblx0aWYgKG5ld1F1ZXJ5SW5kZXggPj0gMCkgcmVzdWx0ICs9IChxdWVyeUluZGV4IDwgMCA/IFwiP1wiIDogXCImXCIpICsgcmVzb2x2ZWQuc2xpY2UobmV3UXVlcnlJbmRleCwgbmV3UXVlcnlFbmQpXG5cdHZhciBxdWVyeXN0cmluZyA9IGJ1aWxkUXVlcnlTdHJpbmcocXVlcnkpXG5cdGlmIChxdWVyeXN0cmluZykgcmVzdWx0ICs9IChxdWVyeUluZGV4IDwgMCAmJiBuZXdRdWVyeUluZGV4IDwgMCA/IFwiP1wiIDogXCImXCIpICsgcXVlcnlzdHJpbmdcblx0aWYgKGhhc2hJbmRleCA+PSAwKSByZXN1bHQgKz0gdGVtcGxhdGUuc2xpY2UoaGFzaEluZGV4KVxuXHRpZiAobmV3SGFzaEluZGV4ID49IDApIHJlc3VsdCArPSAoaGFzaEluZGV4IDwgMCA/IFwiXCIgOiBcIiZcIikgKyByZXNvbHZlZC5zbGljZShuZXdIYXNoSW5kZXgpXG5cdHJldHVybiByZXN1bHRcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBwYXJzZVBhdGhuYW1lID0gcmVxdWlyZShcIi4vcGFyc2VcIilcblxuLy8gQ29tcGlsZXMgYSB0ZW1wbGF0ZSBpbnRvIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHJlc29sdmVkIHBhdGggKHdpdGhvdXQgcXVlcnlcbi8vIHN0cmluZ3MpIGFuZCByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0ZW1wbGF0ZSBwYXJhbWV0ZXJzIHdpdGggdGhlaXJcbi8vIHBhcnNlZCB2YWx1ZXMuIFRoaXMgZXhwZWN0cyB0aGUgaW5wdXQgb2YgdGhlIGNvbXBpbGVkIHRlbXBsYXRlIHRvIGJlIHRoZVxuLy8gb3V0cHV0IG9mIGBwYXJzZVBhdGhuYW1lYC4gTm90ZSB0aGF0IGl0IGRvZXMgKm5vdCogcmVtb3ZlIHF1ZXJ5IHBhcmFtZXRlcnNcbi8vIHNwZWNpZmllZCBpbiB0aGUgdGVtcGxhdGUuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG5cdHZhciB0ZW1wbGF0ZURhdGEgPSBwYXJzZVBhdGhuYW1lKHRlbXBsYXRlKVxuXHR2YXIgdGVtcGxhdGVLZXlzID0gT2JqZWN0LmtleXModGVtcGxhdGVEYXRhLnBhcmFtcylcblx0dmFyIGtleXMgPSBbXVxuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChcIl5cIiArIHRlbXBsYXRlRGF0YS5wYXRoLnJlcGxhY2UoXG5cdFx0Ly8gSSBlc2NhcGUgbGl0ZXJhbCB0ZXh0IHNvIHBlb3BsZSBjYW4gdXNlIHRoaW5ncyBsaWtlIGA6ZmlsZS46ZXh0YCBvclxuXHRcdC8vIGA6bGFuZy06bG9jYWxlYCBpbiByb3V0ZXMuIFRoaXMgaXMgYWxsIG1lcmdlZCBpbnRvIG9uZSBwYXNzIHNvIElcblx0XHQvLyBkb24ndCBhbHNvIGFjY2lkZW50YWxseSBlc2NhcGUgYC1gIGFuZCBtYWtlIGl0IGhhcmRlciB0byBkZXRlY3QgaXQgdG9cblx0XHQvLyBiYW4gaXQgZnJvbSB0ZW1wbGF0ZSBwYXJhbWV0ZXJzLlxuXHRcdC86KFteXFwvLi1dKykoXFwuezN9fFxcLig/IVxcLil8LSk/fFtcXFxcXiQqKy4oKXxcXFtcXF17fV0vZyxcblx0XHRmdW5jdGlvbihtLCBrZXksIGV4dHJhKSB7XG5cdFx0XHRpZiAoa2V5ID09IG51bGwpIHJldHVybiBcIlxcXFxcIiArIG1cblx0XHRcdGtleXMucHVzaCh7azoga2V5LCByOiBleHRyYSA9PT0gXCIuLi5cIn0pXG5cdFx0XHRpZiAoZXh0cmEgPT09IFwiLi4uXCIpIHJldHVybiBcIiguKilcIlxuXHRcdFx0aWYgKGV4dHJhID09PSBcIi5cIikgcmV0dXJuIFwiKFteL10rKVxcXFwuXCJcblx0XHRcdHJldHVybiBcIihbXi9dKylcIiArIChleHRyYSB8fCBcIlwiKVxuXHRcdH1cblx0KSArIFwiJFwiKVxuXHRyZXR1cm4gZnVuY3Rpb24oZGF0YSkge1xuXHRcdC8vIEZpcnN0LCBjaGVjayB0aGUgcGFyYW1zLiBVc3VhbGx5LCB0aGVyZSBpc24ndCBhbnksIGFuZCBpdCdzIGp1c3Rcblx0XHQvLyBjaGVja2luZyBhIHN0YXRpYyBzZXQuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wbGF0ZUtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0ZW1wbGF0ZURhdGEucGFyYW1zW3RlbXBsYXRlS2V5c1tpXV0gIT09IGRhdGEucGFyYW1zW3RlbXBsYXRlS2V5c1tpXV0pIHJldHVybiBmYWxzZVxuXHRcdH1cblx0XHQvLyBJZiBubyBpbnRlcnBvbGF0aW9ucyBleGlzdCwgbGV0J3Mgc2tpcCBhbGwgdGhlIGNlcmVtb255XG5cdFx0aWYgKCFrZXlzLmxlbmd0aCkgcmV0dXJuIHJlZ2V4cC50ZXN0KGRhdGEucGF0aClcblx0XHR2YXIgdmFsdWVzID0gcmVnZXhwLmV4ZWMoZGF0YS5wYXRoKVxuXHRcdGlmICh2YWx1ZXMgPT0gbnVsbCkgcmV0dXJuIGZhbHNlXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRkYXRhLnBhcmFtc1trZXlzW2ldLmtdID0ga2V5c1tpXS5yID8gdmFsdWVzW2kgKyAxXSA6IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZXNbaSArIDFdKVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgcGFyc2VRdWVyeVN0cmluZyA9IHJlcXVpcmUoXCIuLi9xdWVyeXN0cmluZy9wYXJzZVwiKVxuXG4vLyBSZXR1cm5zIGB7cGF0aCwgcGFyYW1zfWAgZnJvbSBgdXJsYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmwpIHtcblx0dmFyIHF1ZXJ5SW5kZXggPSB1cmwuaW5kZXhPZihcIj9cIilcblx0dmFyIGhhc2hJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKVxuXHR2YXIgcXVlcnlFbmQgPSBoYXNoSW5kZXggPCAwID8gdXJsLmxlbmd0aCA6IGhhc2hJbmRleFxuXHR2YXIgcGF0aEVuZCA9IHF1ZXJ5SW5kZXggPCAwID8gcXVlcnlFbmQgOiBxdWVyeUluZGV4XG5cdHZhciBwYXRoID0gdXJsLnNsaWNlKDAsIHBhdGhFbmQpLnJlcGxhY2UoL1xcL3syLH0vZywgXCIvXCIpXG5cblx0aWYgKCFwYXRoKSBwYXRoID0gXCIvXCJcblx0ZWxzZSB7XG5cdFx0aWYgKHBhdGhbMF0gIT09IFwiL1wiKSBwYXRoID0gXCIvXCIgKyBwYXRoXG5cdFx0aWYgKHBhdGgubGVuZ3RoID4gMSAmJiBwYXRoW3BhdGgubGVuZ3RoIC0gMV0gPT09IFwiL1wiKSBwYXRoID0gcGF0aC5zbGljZSgwLCAtMSlcblx0fVxuXHRyZXR1cm4ge1xuXHRcdHBhdGg6IHBhdGgsXG5cdFx0cGFyYW1zOiBxdWVyeUluZGV4IDwgMFxuXHRcdFx0PyB7fVxuXHRcdFx0OiBwYXJzZVF1ZXJ5U3RyaW5nKHVybC5zbGljZShxdWVyeUluZGV4ICsgMSwgcXVlcnlFbmQpKSxcblx0fVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcbi8qKiBAY29uc3RydWN0b3IgKi9cbnZhciBQcm9taXNlUG9seWZpbGwgPSBmdW5jdGlvbihleGVjdXRvcikge1xuXHRpZiAoISh0aGlzIGluc3RhbmNlb2YgUHJvbWlzZVBvbHlmaWxsKSkgdGhyb3cgbmV3IEVycm9yKFwiUHJvbWlzZSBtdXN0IGJlIGNhbGxlZCB3aXRoIGBuZXdgXCIpXG5cdGlmICh0eXBlb2YgZXhlY3V0b3IgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvblwiKVxuXG5cdHZhciBzZWxmID0gdGhpcywgcmVzb2x2ZXJzID0gW10sIHJlamVjdG9ycyA9IFtdLCByZXNvbHZlQ3VycmVudCA9IGhhbmRsZXIocmVzb2x2ZXJzLCB0cnVlKSwgcmVqZWN0Q3VycmVudCA9IGhhbmRsZXIocmVqZWN0b3JzLCBmYWxzZSlcblx0dmFyIGluc3RhbmNlID0gc2VsZi5faW5zdGFuY2UgPSB7cmVzb2x2ZXJzOiByZXNvbHZlcnMsIHJlamVjdG9yczogcmVqZWN0b3JzfVxuXHR2YXIgY2FsbEFzeW5jID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0SW1tZWRpYXRlIDogc2V0VGltZW91dFxuXHRmdW5jdGlvbiBoYW5kbGVyKGxpc3QsIHNob3VsZEFic29yYikge1xuXHRcdHJldHVybiBmdW5jdGlvbiBleGVjdXRlKHZhbHVlKSB7XG5cdFx0XHR2YXIgdGhlblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKHNob3VsZEFic29yYiAmJiB2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpICYmIHR5cGVvZiAodGhlbiA9IHZhbHVlLnRoZW4pID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRpZiAodmFsdWUgPT09IHNlbGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIHcvIGl0c2VsZlwiKVxuXHRcdFx0XHRcdGV4ZWN1dGVPbmNlKHRoZW4uYmluZCh2YWx1ZSkpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y2FsbEFzeW5jKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCFzaG91bGRBYnNvcmIgJiYgbGlzdC5sZW5ndGggPT09IDApIGNvbnNvbGUuZXJyb3IoXCJQb3NzaWJsZSB1bmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb246XCIsIHZhbHVlKVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSBsaXN0W2ldKHZhbHVlKVxuXHRcdFx0XHRcdFx0cmVzb2x2ZXJzLmxlbmd0aCA9IDAsIHJlamVjdG9ycy5sZW5ndGggPSAwXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5zdGF0ZSA9IHNob3VsZEFic29yYlxuXHRcdFx0XHRcdFx0aW5zdGFuY2UucmV0cnkgPSBmdW5jdGlvbigpIHtleGVjdXRlKHZhbHVlKX1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3RDdXJyZW50KGUpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGV4ZWN1dGVPbmNlKHRoZW4pIHtcblx0XHR2YXIgcnVucyA9IDBcblx0XHRmdW5jdGlvbiBydW4oZm4pIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0XHRpZiAocnVucysrID4gMCkgcmV0dXJuXG5cdFx0XHRcdGZuKHZhbHVlKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgb25lcnJvciA9IHJ1bihyZWplY3RDdXJyZW50KVxuXHRcdHRyeSB7dGhlbihydW4ocmVzb2x2ZUN1cnJlbnQpLCBvbmVycm9yKX0gY2F0Y2ggKGUpIHtvbmVycm9yKGUpfVxuXHR9XG5cblx0ZXhlY3V0ZU9uY2UoZXhlY3V0b3IpXG59XG5Qcm9taXNlUG9seWZpbGwucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3Rpb24pIHtcblx0dmFyIHNlbGYgPSB0aGlzLCBpbnN0YW5jZSA9IHNlbGYuX2luc3RhbmNlXG5cdGZ1bmN0aW9uIGhhbmRsZShjYWxsYmFjaywgbGlzdCwgbmV4dCwgc3RhdGUpIHtcblx0XHRsaXN0LnB1c2goZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgbmV4dCh2YWx1ZSlcblx0XHRcdGVsc2UgdHJ5IHtyZXNvbHZlTmV4dChjYWxsYmFjayh2YWx1ZSkpfSBjYXRjaCAoZSkge2lmIChyZWplY3ROZXh0KSByZWplY3ROZXh0KGUpfVxuXHRcdH0pXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZS5yZXRyeSA9PT0gXCJmdW5jdGlvblwiICYmIHN0YXRlID09PSBpbnN0YW5jZS5zdGF0ZSkgaW5zdGFuY2UucmV0cnkoKVxuXHR9XG5cdHZhciByZXNvbHZlTmV4dCwgcmVqZWN0TmV4dFxuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7cmVzb2x2ZU5leHQgPSByZXNvbHZlLCByZWplY3ROZXh0ID0gcmVqZWN0fSlcblx0aGFuZGxlKG9uRnVsZmlsbGVkLCBpbnN0YW5jZS5yZXNvbHZlcnMsIHJlc29sdmVOZXh0LCB0cnVlKSwgaGFuZGxlKG9uUmVqZWN0aW9uLCBpbnN0YW5jZS5yZWplY3RvcnMsIHJlamVjdE5leHQsIGZhbHNlKVxuXHRyZXR1cm4gcHJvbWlzZVxufVxuUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS5jYXRjaCA9IGZ1bmN0aW9uKG9uUmVqZWN0aW9uKSB7XG5cdHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3Rpb24pXG59XG5Qcm9taXNlUG9seWZpbGwucHJvdG90eXBlLmZpbmFsbHkgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRyZXR1cm4gdGhpcy50aGVuKFxuXHRcdGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZVBvbHlmaWxsLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0ZnVuY3Rpb24ocmVhc29uKSB7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZVBvbHlmaWxsLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIFByb21pc2VQb2x5ZmlsbC5yZWplY3QocmVhc29uKTtcblx0XHRcdH0pXG5cdFx0fVxuXHQpXG59XG5Qcm9taXNlUG9seWZpbGwucmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2VQb2x5ZmlsbCkgcmV0dXJuIHZhbHVlXG5cdHJldHVybiBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUpIHtyZXNvbHZlKHZhbHVlKX0pXG59XG5Qcm9taXNlUG9seWZpbGwucmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7cmVqZWN0KHZhbHVlKX0pXG59XG5Qcm9taXNlUG9seWZpbGwuYWxsID0gZnVuY3Rpb24obGlzdCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHR2YXIgdG90YWwgPSBsaXN0Lmxlbmd0aCwgY291bnQgPSAwLCB2YWx1ZXMgPSBbXVxuXHRcdGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkgcmVzb2x2ZShbXSlcblx0XHRlbHNlIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0KGZ1bmN0aW9uKGkpIHtcblx0XHRcdFx0ZnVuY3Rpb24gY29uc3VtZSh2YWx1ZSkge1xuXHRcdFx0XHRcdGNvdW50Kytcblx0XHRcdFx0XHR2YWx1ZXNbaV0gPSB2YWx1ZVxuXHRcdFx0XHRcdGlmIChjb3VudCA9PT0gdG90YWwpIHJlc29sdmUodmFsdWVzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChsaXN0W2ldICE9IG51bGwgJiYgKHR5cGVvZiBsaXN0W2ldID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBsaXN0W2ldID09PSBcImZ1bmN0aW9uXCIpICYmIHR5cGVvZiBsaXN0W2ldLnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGxpc3RbaV0udGhlbihjb25zdW1lLCByZWplY3QpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBjb25zdW1lKGxpc3RbaV0pXG5cdFx0XHR9KShpKVxuXHRcdH1cblx0fSlcbn1cblByb21pc2VQb2x5ZmlsbC5yYWNlID0gZnVuY3Rpb24obGlzdCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxpc3RbaV0udGhlbihyZXNvbHZlLCByZWplY3QpXG5cdFx0fVxuXHR9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb21pc2VQb2x5ZmlsbFxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFByb21pc2VQb2x5ZmlsbCA9IHJlcXVpcmUoXCIuL3BvbHlmaWxsXCIpXG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdGlmICh0eXBlb2Ygd2luZG93LlByb21pc2UgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHR3aW5kb3cuUHJvbWlzZSA9IFByb21pc2VQb2x5ZmlsbFxuXHR9IGVsc2UgaWYgKCF3aW5kb3cuUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSkge1xuXHRcdHdpbmRvdy5Qcm9taXNlLnByb3RvdHlwZS5maW5hbGx5ID0gUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS5maW5hbGx5XG5cdH1cblx0bW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuUHJvbWlzZVxufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsLlByb21pc2UgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRnbG9iYWwuUHJvbWlzZSA9IFByb21pc2VQb2x5ZmlsbFxuXHR9IGVsc2UgaWYgKCFnbG9iYWwuUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSkge1xuXHRcdGdsb2JhbC5Qcm9taXNlLnByb3RvdHlwZS5maW5hbGx5ID0gUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS5maW5hbGx5XG5cdH1cblx0bW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuUHJvbWlzZVxufSBlbHNlIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlUG9seWZpbGxcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSAhPT0gXCJbb2JqZWN0IE9iamVjdF1cIikgcmV0dXJuIFwiXCJcblxuXHR2YXIgYXJncyA9IFtdXG5cdGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcblx0XHRkZXN0cnVjdHVyZShrZXksIG9iamVjdFtrZXldKVxuXHR9XG5cblx0cmV0dXJuIGFyZ3Muam9pbihcIiZcIilcblxuXHRmdW5jdGlvbiBkZXN0cnVjdHVyZShrZXksIHZhbHVlKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGRlc3RydWN0dXJlKGtleSArIFwiW1wiICsgaSArIFwiXVwiLCB2YWx1ZVtpXSlcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIikge1xuXHRcdFx0Zm9yICh2YXIgaSBpbiB2YWx1ZSkge1xuXHRcdFx0XHRkZXN0cnVjdHVyZShrZXkgKyBcIltcIiArIGkgKyBcIl1cIiwgdmFsdWVbaV0pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgYXJncy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IFwiXCIgPyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgOiBcIlwiKSlcblx0fVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdHJpbmcpIHtcblx0aWYgKHN0cmluZyA9PT0gXCJcIiB8fCBzdHJpbmcgPT0gbnVsbCkgcmV0dXJuIHt9XG5cdGlmIChzdHJpbmcuY2hhckF0KDApID09PSBcIj9cIikgc3RyaW5nID0gc3RyaW5nLnNsaWNlKDEpXG5cblx0dmFyIGVudHJpZXMgPSBzdHJpbmcuc3BsaXQoXCImXCIpLCBjb3VudGVycyA9IHt9LCBkYXRhID0ge31cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGVudHJ5ID0gZW50cmllc1tpXS5zcGxpdChcIj1cIilcblx0XHR2YXIga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGVudHJ5WzBdKVxuXHRcdHZhciB2YWx1ZSA9IGVudHJ5Lmxlbmd0aCA9PT0gMiA/IGRlY29kZVVSSUNvbXBvbmVudChlbnRyeVsxXSkgOiBcIlwiXG5cblx0XHRpZiAodmFsdWUgPT09IFwidHJ1ZVwiKSB2YWx1ZSA9IHRydWVcblx0XHRlbHNlIGlmICh2YWx1ZSA9PT0gXCJmYWxzZVwiKSB2YWx1ZSA9IGZhbHNlXG5cblx0XHR2YXIgbGV2ZWxzID0ga2V5LnNwbGl0KC9cXF1cXFs/fFxcWy8pXG5cdFx0dmFyIGN1cnNvciA9IGRhdGFcblx0XHRpZiAoa2V5LmluZGV4T2YoXCJbXCIpID4gLTEpIGxldmVscy5wb3AoKVxuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgbGV2ZWxzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHR2YXIgbGV2ZWwgPSBsZXZlbHNbal0sIG5leHRMZXZlbCA9IGxldmVsc1tqICsgMV1cblx0XHRcdHZhciBpc051bWJlciA9IG5leHRMZXZlbCA9PSBcIlwiIHx8ICFpc05hTihwYXJzZUludChuZXh0TGV2ZWwsIDEwKSlcblx0XHRcdGlmIChsZXZlbCA9PT0gXCJcIikge1xuXHRcdFx0XHR2YXIga2V5ID0gbGV2ZWxzLnNsaWNlKDAsIGopLmpvaW4oKVxuXHRcdFx0XHRpZiAoY291bnRlcnNba2V5XSA9PSBudWxsKSB7XG5cdFx0XHRcdFx0Y291bnRlcnNba2V5XSA9IEFycmF5LmlzQXJyYXkoY3Vyc29yKSA/IGN1cnNvci5sZW5ndGggOiAwXG5cdFx0XHRcdH1cblx0XHRcdFx0bGV2ZWwgPSBjb3VudGVyc1trZXldKytcblx0XHRcdH1cblx0XHRcdC8vIERpc2FsbG93IGRpcmVjdCBwcm90b3R5cGUgcG9sbHV0aW9uXG5cdFx0XHRlbHNlIGlmIChsZXZlbCA9PT0gXCJfX3Byb3RvX19cIikgYnJlYWtcblx0XHRcdGlmIChqID09PSBsZXZlbHMubGVuZ3RoIC0gMSkgY3Vyc29yW2xldmVsXSA9IHZhbHVlXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Ly8gUmVhZCBvd24gcHJvcGVydGllcyBleGNsdXNpdmVseSB0byBkaXNhbGxvdyBpbmRpcmVjdFxuXHRcdFx0XHQvLyBwcm90b3R5cGUgcG9sbHV0aW9uXG5cdFx0XHRcdHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjdXJzb3IsIGxldmVsKVxuXHRcdFx0XHRpZiAoZGVzYyAhPSBudWxsKSBkZXNjID0gZGVzYy52YWx1ZVxuXHRcdFx0XHRpZiAoZGVzYyA9PSBudWxsKSBjdXJzb3JbbGV2ZWxdID0gZGVzYyA9IGlzTnVtYmVyID8gW10gOiB7fVxuXHRcdFx0XHRjdXJzb3IgPSBkZXNjXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBkYXRhXG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3JlbmRlci9yZW5kZXJcIikod2luZG93KVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxudmFyIGh5cGVyc2NyaXB0Vm5vZGUgPSByZXF1aXJlKFwiLi9oeXBlcnNjcmlwdFZub2RlXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHZhciB2bm9kZSA9IGh5cGVyc2NyaXB0Vm5vZGUuYXBwbHkoMCwgYXJndW1lbnRzKVxuXG5cdHZub2RlLnRhZyA9IFwiW1wiXG5cdHZub2RlLmNoaWxkcmVuID0gVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4odm5vZGUuY2hpbGRyZW4pXG5cdHJldHVybiB2bm9kZVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxudmFyIGh5cGVyc2NyaXB0Vm5vZGUgPSByZXF1aXJlKFwiLi9oeXBlcnNjcmlwdFZub2RlXCIpXG5cbnZhciBzZWxlY3RvclBhcnNlciA9IC8oPzooXnwjfFxcLikoW14jXFwuXFxbXFxdXSspKXwoXFxbKC4rPykoPzpcXHMqPVxccyooXCJ8J3wpKCg/OlxcXFxbXCInXFxdXXwuKSo/KVxcNSk/XFxdKS9nXG52YXIgc2VsZWN0b3JDYWNoZSA9IHt9XG52YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHlcblxuZnVuY3Rpb24gaXNFbXB0eShvYmplY3QpIHtcblx0Zm9yICh2YXIga2V5IGluIG9iamVjdCkgaWYgKGhhc093bi5jYWxsKG9iamVjdCwga2V5KSkgcmV0dXJuIGZhbHNlXG5cdHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVTZWxlY3RvcihzZWxlY3Rvcikge1xuXHR2YXIgbWF0Y2gsIHRhZyA9IFwiZGl2XCIsIGNsYXNzZXMgPSBbXSwgYXR0cnMgPSB7fVxuXHR3aGlsZSAobWF0Y2ggPSBzZWxlY3RvclBhcnNlci5leGVjKHNlbGVjdG9yKSkge1xuXHRcdHZhciB0eXBlID0gbWF0Y2hbMV0sIHZhbHVlID0gbWF0Y2hbMl1cblx0XHRpZiAodHlwZSA9PT0gXCJcIiAmJiB2YWx1ZSAhPT0gXCJcIikgdGFnID0gdmFsdWVcblx0XHRlbHNlIGlmICh0eXBlID09PSBcIiNcIikgYXR0cnMuaWQgPSB2YWx1ZVxuXHRcdGVsc2UgaWYgKHR5cGUgPT09IFwiLlwiKSBjbGFzc2VzLnB1c2godmFsdWUpXG5cdFx0ZWxzZSBpZiAobWF0Y2hbM11bMF0gPT09IFwiW1wiKSB7XG5cdFx0XHR2YXIgYXR0clZhbHVlID0gbWF0Y2hbNl1cblx0XHRcdGlmIChhdHRyVmFsdWUpIGF0dHJWYWx1ZSA9IGF0dHJWYWx1ZS5yZXBsYWNlKC9cXFxcKFtcIiddKS9nLCBcIiQxXCIpLnJlcGxhY2UoL1xcXFxcXFxcL2csIFwiXFxcXFwiKVxuXHRcdFx0aWYgKG1hdGNoWzRdID09PSBcImNsYXNzXCIpIGNsYXNzZXMucHVzaChhdHRyVmFsdWUpXG5cdFx0XHRlbHNlIGF0dHJzW21hdGNoWzRdXSA9IGF0dHJWYWx1ZSA9PT0gXCJcIiA/IGF0dHJWYWx1ZSA6IGF0dHJWYWx1ZSB8fCB0cnVlXG5cdFx0fVxuXHR9XG5cdGlmIChjbGFzc2VzLmxlbmd0aCA+IDApIGF0dHJzLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbihcIiBcIilcblx0cmV0dXJuIHNlbGVjdG9yQ2FjaGVbc2VsZWN0b3JdID0ge3RhZzogdGFnLCBhdHRyczogYXR0cnN9XG59XG5cbmZ1bmN0aW9uIGV4ZWNTZWxlY3RvcihzdGF0ZSwgdm5vZGUpIHtcblx0dmFyIGF0dHJzID0gdm5vZGUuYXR0cnNcblx0dmFyIGNoaWxkcmVuID0gVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4odm5vZGUuY2hpbGRyZW4pXG5cdHZhciBoYXNDbGFzcyA9IGhhc093bi5jYWxsKGF0dHJzLCBcImNsYXNzXCIpXG5cdHZhciBjbGFzc05hbWUgPSBoYXNDbGFzcyA/IGF0dHJzLmNsYXNzIDogYXR0cnMuY2xhc3NOYW1lXG5cblx0dm5vZGUudGFnID0gc3RhdGUudGFnXG5cdHZub2RlLmF0dHJzID0gbnVsbFxuXHR2bm9kZS5jaGlsZHJlbiA9IHVuZGVmaW5lZFxuXG5cdGlmICghaXNFbXB0eShzdGF0ZS5hdHRycykgJiYgIWlzRW1wdHkoYXR0cnMpKSB7XG5cdFx0dmFyIG5ld0F0dHJzID0ge31cblxuXHRcdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdFx0aWYgKGhhc093bi5jYWxsKGF0dHJzLCBrZXkpKSBuZXdBdHRyc1trZXldID0gYXR0cnNba2V5XVxuXHRcdH1cblxuXHRcdGF0dHJzID0gbmV3QXR0cnNcblx0fVxuXG5cdGZvciAodmFyIGtleSBpbiBzdGF0ZS5hdHRycykge1xuXHRcdGlmIChoYXNPd24uY2FsbChzdGF0ZS5hdHRycywga2V5KSAmJiBrZXkgIT09IFwiY2xhc3NOYW1lXCIgJiYgIWhhc093bi5jYWxsKGF0dHJzLCBrZXkpKXtcblx0XHRcdGF0dHJzW2tleV0gPSBzdGF0ZS5hdHRyc1trZXldXG5cdFx0fVxuXHR9XG5cdGlmIChjbGFzc05hbWUgIT0gbnVsbCB8fCBzdGF0ZS5hdHRycy5jbGFzc05hbWUgIT0gbnVsbCkgYXR0cnMuY2xhc3NOYW1lID1cblx0XHRjbGFzc05hbWUgIT0gbnVsbFxuXHRcdFx0PyBzdGF0ZS5hdHRycy5jbGFzc05hbWUgIT0gbnVsbFxuXHRcdFx0XHQ/IFN0cmluZyhzdGF0ZS5hdHRycy5jbGFzc05hbWUpICsgXCIgXCIgKyBTdHJpbmcoY2xhc3NOYW1lKVxuXHRcdFx0XHQ6IGNsYXNzTmFtZVxuXHRcdFx0OiBzdGF0ZS5hdHRycy5jbGFzc05hbWUgIT0gbnVsbFxuXHRcdFx0XHQ/IHN0YXRlLmF0dHJzLmNsYXNzTmFtZVxuXHRcdFx0XHQ6IG51bGxcblxuXHRpZiAoaGFzQ2xhc3MpIGF0dHJzLmNsYXNzID0gbnVsbFxuXG5cdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdGlmIChoYXNPd24uY2FsbChhdHRycywga2V5KSAmJiBrZXkgIT09IFwia2V5XCIpIHtcblx0XHRcdHZub2RlLmF0dHJzID0gYXR0cnNcblx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0aWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmIGNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBjaGlsZHJlblswXSAhPSBudWxsICYmIGNoaWxkcmVuWzBdLnRhZyA9PT0gXCIjXCIpIHtcblx0XHR2bm9kZS50ZXh0ID0gY2hpbGRyZW5bMF0uY2hpbGRyZW5cblx0fSBlbHNlIHtcblx0XHR2bm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuXG5cdH1cblxuXHRyZXR1cm4gdm5vZGVcbn1cblxuZnVuY3Rpb24gaHlwZXJzY3JpcHQoc2VsZWN0b3IpIHtcblx0aWYgKHNlbGVjdG9yID09IG51bGwgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBzZWxlY3Rvci52aWV3ICE9PSBcImZ1bmN0aW9uXCIpIHtcblx0XHR0aHJvdyBFcnJvcihcIlRoZSBzZWxlY3RvciBtdXN0IGJlIGVpdGhlciBhIHN0cmluZyBvciBhIGNvbXBvbmVudC5cIik7XG5cdH1cblxuXHR2YXIgdm5vZGUgPSBoeXBlcnNjcmlwdFZub2RlLmFwcGx5KDEsIGFyZ3VtZW50cylcblxuXHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKSB7XG5cdFx0dm5vZGUuY2hpbGRyZW4gPSBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbih2bm9kZS5jaGlsZHJlbilcblx0XHRpZiAoc2VsZWN0b3IgIT09IFwiW1wiKSByZXR1cm4gZXhlY1NlbGVjdG9yKHNlbGVjdG9yQ2FjaGVbc2VsZWN0b3JdIHx8IGNvbXBpbGVTZWxlY3RvcihzZWxlY3RvciksIHZub2RlKVxuXHR9XG5cblx0dm5vZGUudGFnID0gc2VsZWN0b3Jcblx0cmV0dXJuIHZub2RlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHlwZXJzY3JpcHRcbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcblxuLy8gQ2FsbCB2aWEgYGh5cGVyc2NyaXB0Vm5vZGUuYXBwbHkoc3RhcnRPZmZzZXQsIGFyZ3VtZW50cylgXG4vL1xuLy8gVGhlIHJlYXNvbiBJIGRvIGl0IHRoaXMgd2F5LCBmb3J3YXJkaW5nIHRoZSBhcmd1bWVudHMgYW5kIHBhc3NpbmcgdGhlIHN0YXJ0XG4vLyBvZmZzZXQgaW4gYHRoaXNgLCBpcyBzbyBJIGRvbid0IGhhdmUgdG8gY3JlYXRlIGEgdGVtcG9yYXJ5IGFycmF5IGluIGFcbi8vIHBlcmZvcm1hbmNlLWNyaXRpY2FsIHBhdGguXG4vL1xuLy8gSW4gbmF0aXZlIEVTNiwgSSdkIGluc3RlYWQgYWRkIGEgZmluYWwgYC4uLmFyZ3NgIHBhcmFtZXRlciB0byB0aGVcbi8vIGBoeXBlcnNjcmlwdGAgYW5kIGBmcmFnbWVudGAgZmFjdG9yaWVzIGFuZCBkZWZpbmUgdGhpcyBhc1xuLy8gYGh5cGVyc2NyaXB0Vm5vZGUoLi4uYXJncylgLCBzaW5jZSBtb2Rlcm4gZW5naW5lcyBkbyBvcHRpbWl6ZSB0aGF0IGF3YXkuIEJ1dFxuLy8gRVM1ICh3aGF0IE1pdGhyaWwgcmVxdWlyZXMgdGhhbmtzIHRvIElFIHN1cHBvcnQpIGRvZXNuJ3QgZ2l2ZSBtZSB0aGF0IGx1eHVyeSxcbi8vIGFuZCBlbmdpbmVzIGFyZW4ndCBuZWFybHkgaW50ZWxsaWdlbnQgZW5vdWdoIHRvIGRvIGVpdGhlciBvZiB0aGVzZTpcbi8vXG4vLyAxLiBFbGlkZSB0aGUgYWxsb2NhdGlvbiBmb3IgYFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKWAgd2hlbiBpdCdzIHBhc3NlZCB0b1xuLy8gICAgYW5vdGhlciBmdW5jdGlvbiBvbmx5IHRvIGJlIGluZGV4ZWQuXG4vLyAyLiBFbGlkZSBhbiBgYXJndW1lbnRzYCBhbGxvY2F0aW9uIHdoZW4gaXQncyBwYXNzZWQgdG8gYW55IGZ1bmN0aW9uIG90aGVyXG4vLyAgICB0aGFuIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgIG9yIGBSZWZsZWN0LmFwcGx5YC5cbi8vXG4vLyBJbiBFUzYsIGl0J2QgcHJvYmFibHkgbG9vayBjbG9zZXIgdG8gdGhpcyAoSSdkIG5lZWQgdG8gcHJvZmlsZSBpdCwgdGhvdWdoKTpcbi8vIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXR0cnMsIC4uLmNoaWxkcmVuKSB7XG4vLyAgICAgaWYgKGF0dHJzID09IG51bGwgfHwgdHlwZW9mIGF0dHJzID09PSBcIm9iamVjdFwiICYmIGF0dHJzLnRhZyA9PSBudWxsICYmICFBcnJheS5pc0FycmF5KGF0dHJzKSkge1xuLy8gICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkoY2hpbGRyZW5bMF0pKSBjaGlsZHJlbiA9IGNoaWxkcmVuWzBdXG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5sZW5ndGggPT09IDAgJiYgQXJyYXkuaXNBcnJheShhdHRycykgPyBhdHRycyA6IFthdHRycywgLi4uY2hpbGRyZW5dXG4vLyAgICAgICAgIGF0dHJzID0gdW5kZWZpbmVkXG4vLyAgICAgfVxuLy9cbi8vICAgICBpZiAoYXR0cnMgPT0gbnVsbCkgYXR0cnMgPSB7fVxuLy8gICAgIHJldHVybiBWbm9kZShcIlwiLCBhdHRycy5rZXksIGF0dHJzLCBjaGlsZHJlbilcbi8vIH1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cdHZhciBhdHRycyA9IGFyZ3VtZW50c1t0aGlzXSwgc3RhcnQgPSB0aGlzICsgMSwgY2hpbGRyZW5cblxuXHRpZiAoYXR0cnMgPT0gbnVsbCkge1xuXHRcdGF0dHJzID0ge31cblx0fSBlbHNlIGlmICh0eXBlb2YgYXR0cnMgIT09IFwib2JqZWN0XCIgfHwgYXR0cnMudGFnICE9IG51bGwgfHwgQXJyYXkuaXNBcnJheShhdHRycykpIHtcblx0XHRhdHRycyA9IHt9XG5cdFx0c3RhcnQgPSB0aGlzXG5cdH1cblxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gc3RhcnQgKyAxKSB7XG5cdFx0Y2hpbGRyZW4gPSBhcmd1bWVudHNbc3RhcnRdXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkgY2hpbGRyZW4gPSBbY2hpbGRyZW5dXG5cdH0gZWxzZSB7XG5cdFx0Y2hpbGRyZW4gPSBbXVxuXHRcdHdoaWxlIChzdGFydCA8IGFyZ3VtZW50cy5sZW5ndGgpIGNoaWxkcmVuLnB1c2goYXJndW1lbnRzW3N0YXJ0KytdKVxuXHR9XG5cblx0cmV0dXJuIFZub2RlKFwiXCIsIGF0dHJzLmtleSwgYXR0cnMsIGNoaWxkcmVuKVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCR3aW5kb3cpIHtcblx0dmFyICRkb2MgPSAkd2luZG93ICYmICR3aW5kb3cuZG9jdW1lbnRcblx0dmFyIGN1cnJlbnRSZWRyYXdcblxuXHR2YXIgbmFtZVNwYWNlID0ge1xuXHRcdHN2ZzogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuXHRcdG1hdGg6IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTFwiXG5cdH1cblxuXHRmdW5jdGlvbiBnZXROYW1lU3BhY2Uodm5vZGUpIHtcblx0XHRyZXR1cm4gdm5vZGUuYXR0cnMgJiYgdm5vZGUuYXR0cnMueG1sbnMgfHwgbmFtZVNwYWNlW3Zub2RlLnRhZ11cblx0fVxuXG5cdC8vc2FuaXR5IGNoZWNrIHRvIGRpc2NvdXJhZ2UgcGVvcGxlIGZyb20gZG9pbmcgYHZub2RlLnN0YXRlID0gLi4uYFxuXHRmdW5jdGlvbiBjaGVja1N0YXRlKHZub2RlLCBvcmlnaW5hbCkge1xuXHRcdGlmICh2bm9kZS5zdGF0ZSAhPT0gb3JpZ2luYWwpIHRocm93IG5ldyBFcnJvcihcImB2bm9kZS5zdGF0ZWAgbXVzdCBub3QgYmUgbW9kaWZpZWRcIilcblx0fVxuXG5cdC8vTm90ZTogdGhlIGhvb2sgaXMgcGFzc2VkIGFzIHRoZSBgdGhpc2AgYXJndW1lbnQgdG8gYWxsb3cgcHJveHlpbmcgdGhlXG5cdC8vYXJndW1lbnRzIHdpdGhvdXQgcmVxdWlyaW5nIGEgZnVsbCBhcnJheSBhbGxvY2F0aW9uIHRvIGRvIHNvLiBJdCBhbHNvXG5cdC8vdGFrZXMgYWR2YW50YWdlIG9mIHRoZSBmYWN0IHRoZSBjdXJyZW50IGB2bm9kZWAgaXMgdGhlIGZpcnN0IGFyZ3VtZW50IGluXG5cdC8vYWxsIGxpZmVjeWNsZSBtZXRob2RzLlxuXHRmdW5jdGlvbiBjYWxsSG9vayh2bm9kZSkge1xuXHRcdHZhciBvcmlnaW5hbCA9IHZub2RlLnN0YXRlXG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiB0aGlzLmFwcGx5KG9yaWdpbmFsLCBhcmd1bWVudHMpXG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGNoZWNrU3RhdGUodm5vZGUsIG9yaWdpbmFsKVxuXHRcdH1cblx0fVxuXG5cdC8vIElFMTEgKGF0IGxlYXN0KSB0aHJvd3MgYW4gVW5zcGVjaWZpZWRFcnJvciB3aGVuIGFjY2Vzc2luZyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IHdoZW5cblx0Ly8gaW5zaWRlIGFuIGlmcmFtZS4gQ2F0Y2ggYW5kIHN3YWxsb3cgdGhpcyBlcnJvciwgYW5kIGhlYXZ5LWhhbmRpZGx5IHJldHVybiBudWxsLlxuXHRmdW5jdGlvbiBhY3RpdmVFbGVtZW50KCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gJGRvYy5hY3RpdmVFbGVtZW50XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9XG5cdH1cblx0Ly9jcmVhdGVcblx0ZnVuY3Rpb24gY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHRmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0dmFyIHZub2RlID0gdm5vZGVzW2ldXG5cdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkge1xuXHRcdFx0XHRjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciB0YWcgPSB2bm9kZS50YWdcblx0XHRpZiAodHlwZW9mIHRhZyA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0dm5vZGUuc3RhdGUgPSB7fVxuXHRcdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwpIGluaXRMaWZlY3ljbGUodm5vZGUuYXR0cnMsIHZub2RlLCBob29rcylcblx0XHRcdHN3aXRjaCAodGFnKSB7XG5cdFx0XHRcdGNhc2UgXCIjXCI6IGNyZWF0ZVRleHQocGFyZW50LCB2bm9kZSwgbmV4dFNpYmxpbmcpOyBicmVha1xuXHRcdFx0XHRjYXNlIFwiPFwiOiBjcmVhdGVIVE1MKHBhcmVudCwgdm5vZGUsIG5zLCBuZXh0U2libGluZyk7IGJyZWFrXG5cdFx0XHRcdGNhc2UgXCJbXCI6IGNyZWF0ZUZyYWdtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpOyBicmVha1xuXHRcdFx0XHRkZWZhdWx0OiBjcmVhdGVFbGVtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgY3JlYXRlQ29tcG9uZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlVGV4dChwYXJlbnQsIHZub2RlLCBuZXh0U2libGluZykge1xuXHRcdHZub2RlLmRvbSA9ICRkb2MuY3JlYXRlVGV4dE5vZGUodm5vZGUuY2hpbGRyZW4pXG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIHZub2RlLmRvbSwgbmV4dFNpYmxpbmcpXG5cdH1cblx0dmFyIHBvc3NpYmxlUGFyZW50cyA9IHtjYXB0aW9uOiBcInRhYmxlXCIsIHRoZWFkOiBcInRhYmxlXCIsIHRib2R5OiBcInRhYmxlXCIsIHRmb290OiBcInRhYmxlXCIsIHRyOiBcInRib2R5XCIsIHRoOiBcInRyXCIsIHRkOiBcInRyXCIsIGNvbGdyb3VwOiBcInRhYmxlXCIsIGNvbDogXCJjb2xncm91cFwifVxuXHRmdW5jdGlvbiBjcmVhdGVIVE1MKHBhcmVudCwgdm5vZGUsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciBtYXRjaCA9IHZub2RlLmNoaWxkcmVuLm1hdGNoKC9eXFxzKj88KFxcdyspL2ltKSB8fCBbXVxuXHRcdC8vIG5vdCB1c2luZyB0aGUgcHJvcGVyIHBhcmVudCBtYWtlcyB0aGUgY2hpbGQgZWxlbWVudChzKSB2YW5pc2guXG5cdFx0Ly8gICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cdFx0Ly8gICAgIGRpdi5pbm5lckhUTUwgPSBcIjx0ZD5pPC90ZD48dGQ+ajwvdGQ+XCJcblx0XHQvLyAgICAgY29uc29sZS5sb2coZGl2LmlubmVySFRNTClcblx0XHQvLyAtLT4gXCJpalwiLCBubyA8dGQ+IGluIHNpZ2h0LlxuXHRcdHZhciB0ZW1wID0gJGRvYy5jcmVhdGVFbGVtZW50KHBvc3NpYmxlUGFyZW50c1ttYXRjaFsxXV0gfHwgXCJkaXZcIilcblx0XHRpZiAobnMgPT09IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIikge1xuXHRcdFx0dGVtcC5pbm5lckhUTUwgPSBcIjxzdmcgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj5cIiArIHZub2RlLmNoaWxkcmVuICsgXCI8L3N2Zz5cIlxuXHRcdFx0dGVtcCA9IHRlbXAuZmlyc3RDaGlsZFxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0ZW1wLmlubmVySFRNTCA9IHZub2RlLmNoaWxkcmVuXG5cdFx0fVxuXHRcdHZub2RlLmRvbSA9IHRlbXAuZmlyc3RDaGlsZFxuXHRcdHZub2RlLmRvbVNpemUgPSB0ZW1wLmNoaWxkTm9kZXMubGVuZ3RoXG5cdFx0Ly8gQ2FwdHVyZSBub2RlcyB0byByZW1vdmUsIHNvIHdlIGRvbid0IGNvbmZ1c2UgdGhlbS5cblx0XHR2bm9kZS5pbnN0YW5jZSA9IFtdXG5cdFx0dmFyIGZyYWdtZW50ID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHR2YXIgY2hpbGRcblx0XHR3aGlsZSAoY2hpbGQgPSB0ZW1wLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHZub2RlLmluc3RhbmNlLnB1c2goY2hpbGQpXG5cdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChjaGlsZClcblx0XHR9XG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIGZyYWdtZW50LCBuZXh0U2libGluZylcblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVGcmFnbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHRpZiAodm5vZGUuY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0dmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHRcdGNyZWF0ZU5vZGVzKGZyYWdtZW50LCBjaGlsZHJlbiwgMCwgY2hpbGRyZW4ubGVuZ3RoLCBob29rcywgbnVsbCwgbnMpXG5cdFx0fVxuXHRcdHZub2RlLmRvbSA9IGZyYWdtZW50LmZpcnN0Q2hpbGRcblx0XHR2bm9kZS5kb21TaXplID0gZnJhZ21lbnQuY2hpbGROb2Rlcy5sZW5ndGhcblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZnJhZ21lbnQsIG5leHRTaWJsaW5nKVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciB0YWcgPSB2bm9kZS50YWdcblx0XHR2YXIgYXR0cnMgPSB2bm9kZS5hdHRyc1xuXHRcdHZhciBpcyA9IGF0dHJzICYmIGF0dHJzLmlzXG5cblx0XHRucyA9IGdldE5hbWVTcGFjZSh2bm9kZSkgfHwgbnNcblxuXHRcdHZhciBlbGVtZW50ID0gbnMgP1xuXHRcdFx0aXMgPyAkZG9jLmNyZWF0ZUVsZW1lbnROUyhucywgdGFnLCB7aXM6IGlzfSkgOiAkZG9jLmNyZWF0ZUVsZW1lbnROUyhucywgdGFnKSA6XG5cdFx0XHRpcyA/ICRkb2MuY3JlYXRlRWxlbWVudCh0YWcsIHtpczogaXN9KSA6ICRkb2MuY3JlYXRlRWxlbWVudCh0YWcpXG5cdFx0dm5vZGUuZG9tID0gZWxlbWVudFxuXG5cdFx0aWYgKGF0dHJzICE9IG51bGwpIHtcblx0XHRcdHNldEF0dHJzKHZub2RlLCBhdHRycywgbnMpXG5cdFx0fVxuXG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIGVsZW1lbnQsIG5leHRTaWJsaW5nKVxuXG5cdFx0aWYgKCFtYXliZVNldENvbnRlbnRFZGl0YWJsZSh2bm9kZSkpIHtcblx0XHRcdGlmICh2bm9kZS50ZXh0ICE9IG51bGwpIHtcblx0XHRcdFx0aWYgKHZub2RlLnRleHQgIT09IFwiXCIpIGVsZW1lbnQudGV4dENvbnRlbnQgPSB2bm9kZS50ZXh0XG5cdFx0XHRcdGVsc2Ugdm5vZGUuY2hpbGRyZW4gPSBbVm5vZGUoXCIjXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB2bm9kZS50ZXh0LCB1bmRlZmluZWQsIHVuZGVmaW5lZCldXG5cdFx0XHR9XG5cdFx0XHRpZiAodm5vZGUuY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdFx0XHRjcmVhdGVOb2RlcyhlbGVtZW50LCBjaGlsZHJlbiwgMCwgY2hpbGRyZW4ubGVuZ3RoLCBob29rcywgbnVsbCwgbnMpXG5cdFx0XHRcdGlmICh2bm9kZS50YWcgPT09IFwic2VsZWN0XCIgJiYgYXR0cnMgIT0gbnVsbCkgc2V0TGF0ZVNlbGVjdEF0dHJzKHZub2RlLCBhdHRycylcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gaW5pdENvbXBvbmVudCh2bm9kZSwgaG9va3MpIHtcblx0XHR2YXIgc2VudGluZWxcblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZy52aWV3ID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHZub2RlLnN0YXRlID0gT2JqZWN0LmNyZWF0ZSh2bm9kZS50YWcpXG5cdFx0XHRzZW50aW5lbCA9IHZub2RlLnN0YXRlLnZpZXdcblx0XHRcdGlmIChzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCAhPSBudWxsKSByZXR1cm5cblx0XHRcdHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkID0gdHJ1ZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2bm9kZS5zdGF0ZSA9IHZvaWQgMFxuXHRcdFx0c2VudGluZWwgPSB2bm9kZS50YWdcblx0XHRcdGlmIChzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCAhPSBudWxsKSByZXR1cm5cblx0XHRcdHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkID0gdHJ1ZVxuXHRcdFx0dm5vZGUuc3RhdGUgPSAodm5vZGUudGFnLnByb3RvdHlwZSAhPSBudWxsICYmIHR5cGVvZiB2bm9kZS50YWcucHJvdG90eXBlLnZpZXcgPT09IFwiZnVuY3Rpb25cIikgPyBuZXcgdm5vZGUudGFnKHZub2RlKSA6IHZub2RlLnRhZyh2bm9kZSlcblx0XHR9XG5cdFx0aW5pdExpZmVjeWNsZSh2bm9kZS5zdGF0ZSwgdm5vZGUsIGhvb2tzKVxuXHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKSBpbml0TGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MpXG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBWbm9kZS5ub3JtYWxpemUoY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS52aWV3LCB2bm9kZSkpXG5cdFx0aWYgKHZub2RlLmluc3RhbmNlID09PSB2bm9kZSkgdGhyb3cgRXJyb3IoXCJBIHZpZXcgY2Fubm90IHJldHVybiB0aGUgdm5vZGUgaXQgcmVjZWl2ZWQgYXMgYXJndW1lbnRcIilcblx0XHRzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCA9IG51bGxcblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVDb21wb25lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdGluaXRDb21wb25lbnQodm5vZGUsIGhvb2tzKVxuXHRcdGlmICh2bm9kZS5pbnN0YW5jZSAhPSBudWxsKSB7XG5cdFx0XHRjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUuaW5zdGFuY2UsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR2bm9kZS5kb20gPSB2bm9kZS5pbnN0YW5jZS5kb21cblx0XHRcdHZub2RlLmRvbVNpemUgPSB2bm9kZS5kb20gIT0gbnVsbCA/IHZub2RlLmluc3RhbmNlLmRvbVNpemUgOiAwXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IDBcblx0XHR9XG5cdH1cblxuXHQvL3VwZGF0ZVxuXHQvKipcblx0ICogQHBhcmFtIHtFbGVtZW50fEZyYWdtZW50fSBwYXJlbnQgLSB0aGUgcGFyZW50IGVsZW1lbnRcblx0ICogQHBhcmFtIHtWbm9kZVtdIHwgbnVsbH0gb2xkIC0gdGhlIGxpc3Qgb2Ygdm5vZGVzIG9mIHRoZSBsYXN0IGByZW5kZXIoKWAgY2FsbCBmb3Jcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBwYXJ0IG9mIHRoZSB0cmVlXG5cdCAqIEBwYXJhbSB7Vm5vZGVbXSB8IG51bGx9IHZub2RlcyAtIGFzIGFib3ZlLCBidXQgZm9yIHRoZSBjdXJyZW50IGByZW5kZXIoKWAgY2FsbC5cblx0ICogQHBhcmFtIHtGdW5jdGlvbltdfSBob29rcyAtIGFuIGFjY3VtdWxhdG9yIG9mIHBvc3QtcmVuZGVyIGhvb2tzIChvbmNyZWF0ZS9vbnVwZGF0ZSlcblx0ICogQHBhcmFtIHtFbGVtZW50IHwgbnVsbH0gbmV4dFNpYmxpbmcgLSB0aGUgbmV4dCBET00gbm9kZSBpZiB3ZSdyZSBkZWFsaW5nIHdpdGggYVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50IHRoYXQgaXMgbm90IHRoZSBsYXN0IGl0ZW0gaW4gaXRzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50XG5cdCAqIEBwYXJhbSB7J3N2ZycgfCAnbWF0aCcgfCBTdHJpbmcgfCBudWxsfSBucykgLSB0aGUgY3VycmVudCBYTUwgbmFtZXNwYWNlLCBpZiBhbnlcblx0ICogQHJldHVybnMgdm9pZFxuXHQgKi9cblx0Ly8gVGhpcyBmdW5jdGlvbiBkaWZmcyBhbmQgcGF0Y2hlcyBsaXN0cyBvZiB2bm9kZXMsIGJvdGgga2V5ZWQgYW5kIHVua2V5ZWQuXG5cdC8vXG5cdC8vIFdlIHdpbGw6XG5cdC8vXG5cdC8vIDEuIGRlc2NyaWJlIGl0cyBnZW5lcmFsIHN0cnVjdHVyZVxuXHQvLyAyLiBmb2N1cyBvbiB0aGUgZGlmZiBhbGdvcml0aG0gb3B0aW1pemF0aW9uc1xuXHQvLyAzLiBkaXNjdXNzIERPTSBub2RlIG9wZXJhdGlvbnMuXG5cblx0Ly8gIyMgT3ZlcnZpZXc6XG5cdC8vXG5cdC8vIFRoZSB1cGRhdGVOb2RlcygpIGZ1bmN0aW9uOlxuXHQvLyAtIGRlYWxzIHdpdGggdHJpdmlhbCBjYXNlc1xuXHQvLyAtIGRldGVybWluZXMgd2hldGhlciB0aGUgbGlzdHMgYXJlIGtleWVkIG9yIHVua2V5ZWQgYmFzZWQgb24gdGhlIGZpcnN0IG5vbi1udWxsIG5vZGVcblx0Ly8gICBvZiBlYWNoIGxpc3QuXG5cdC8vIC0gZGlmZnMgdGhlbSBhbmQgcGF0Y2hlcyB0aGUgRE9NIGlmIG5lZWRlZCAodGhhdCdzIHRoZSBicnVudCBvZiB0aGUgY29kZSlcblx0Ly8gLSBtYW5hZ2VzIHRoZSBsZWZ0b3ZlcnM6IGFmdGVyIGRpZmZpbmcsIGFyZSB0aGVyZTpcblx0Ly8gICAtIG9sZCBub2RlcyBsZWZ0IHRvIHJlbW92ZT9cblx0Ly8gXHQgLSBuZXcgbm9kZXMgdG8gaW5zZXJ0P1xuXHQvLyBcdCBkZWFsIHdpdGggdGhlbSFcblx0Ly9cblx0Ly8gVGhlIGxpc3RzIGFyZSBvbmx5IGl0ZXJhdGVkIG92ZXIgb25jZSwgd2l0aCBhbiBleGNlcHRpb24gZm9yIHRoZSBub2RlcyBpbiBgb2xkYCB0aGF0XG5cdC8vIGFyZSB2aXNpdGVkIGluIHRoZSBmb3VydGggcGFydCBvZiB0aGUgZGlmZiBhbmQgaW4gdGhlIGByZW1vdmVOb2Rlc2AgbG9vcC5cblxuXHQvLyAjIyBEaWZmaW5nXG5cdC8vXG5cdC8vIFJlYWRpbmcgaHR0cHM6Ly9naXRodWIuY29tL2xvY2Fsdm9pZC9pdmkvYmxvYi9kZGMwOWQwNmFiYWVmNDUyNDhlNjEzM2Y3MDQwZDAwZDNjNmJlODUzL3BhY2thZ2VzL2l2aS9zcmMvdmRvbS9pbXBsZW1lbnRhdGlvbi50cyNMNjE3LUw4Mzdcblx0Ly8gbWF5IGJlIGdvb2QgZm9yIGNvbnRleHQgb24gbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlLWJhc2VkIGxvZ2ljIGZvciBtb3Zpbmcgbm9kZXMuXG5cdC8vXG5cdC8vIEluIG9yZGVyIHRvIGRpZmYga2V5ZWQgbGlzdHMsIG9uZSBoYXMgdG9cblx0Ly9cblx0Ly8gMSkgbWF0Y2ggbm9kZXMgaW4gYm90aCBsaXN0cywgcGVyIGtleSwgYW5kIHVwZGF0ZSB0aGVtIGFjY29yZGluZ2x5XG5cdC8vIDIpIGNyZWF0ZSB0aGUgbm9kZXMgcHJlc2VudCBpbiB0aGUgbmV3IGxpc3QsIGJ1dCBhYnNlbnQgaW4gdGhlIG9sZCBvbmVcblx0Ly8gMykgcmVtb3ZlIHRoZSBub2RlcyBwcmVzZW50IGluIHRoZSBvbGQgbGlzdCwgYnV0IGFic2VudCBpbiB0aGUgbmV3IG9uZVxuXHQvLyA0KSBmaWd1cmUgb3V0IHdoYXQgbm9kZXMgaW4gMSkgdG8gbW92ZSBpbiBvcmRlciB0byBtaW5pbWl6ZSB0aGUgRE9NIG9wZXJhdGlvbnMuXG5cdC8vXG5cdC8vIFRvIGFjaGlldmUgMSkgb25lIGNhbiBjcmVhdGUgYSBkaWN0aW9uYXJ5IG9mIGtleXMgPT4gaW5kZXggKGZvciB0aGUgb2xkIGxpc3QpLCB0aGVuIGl0ZXJhdGVcblx0Ly8gb3ZlciB0aGUgbmV3IGxpc3QgYW5kIGZvciBlYWNoIG5ldyB2bm9kZSwgZmluZCB0aGUgY29ycmVzcG9uZGluZyB2bm9kZSBpbiB0aGUgb2xkIGxpc3QgdXNpbmdcblx0Ly8gdGhlIG1hcC5cblx0Ly8gMikgaXMgYWNoaWV2ZWQgaW4gdGhlIHNhbWUgc3RlcDogaWYgYSBuZXcgbm9kZSBoYXMgbm8gY29ycmVzcG9uZGluZyBlbnRyeSBpbiB0aGUgbWFwLCBpdCBpcyBuZXdcblx0Ly8gYW5kIG11c3QgYmUgY3JlYXRlZC5cblx0Ly8gRm9yIHRoZSByZW1vdmFscywgd2UgYWN0dWFsbHkgcmVtb3ZlIHRoZSBub2RlcyB0aGF0IGhhdmUgYmVlbiB1cGRhdGVkIGZyb20gdGhlIG9sZCBsaXN0LlxuXHQvLyBUaGUgbm9kZXMgdGhhdCByZW1haW4gaW4gdGhhdCBsaXN0IGFmdGVyIDEpIGFuZCAyKSBoYXZlIGJlZW4gcGVyZm9ybWVkIGNhbiBiZSBzYWZlbHkgcmVtb3ZlZC5cblx0Ly8gVGhlIGZvdXJ0aCBzdGVwIGlzIGEgYml0IG1vcmUgY29tcGxleCBhbmQgcmVsaWVzIG9uIHRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UgKExJUylcblx0Ly8gYWxnb3JpdGhtLlxuXHQvL1xuXHQvLyB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlIGlzIHRoZSBsaXN0IG9mIG5vZGVzIHRoYXQgY2FuIHJlbWFpbiBpbiBwbGFjZS4gSW1hZ2luZSBnb2luZ1xuXHQvLyBmcm9tIGAxLDIsMyw0LDVgIHRvIGA0LDUsMSwyLDNgIHdoZXJlIHRoZSBudW1iZXJzIGFyZSBub3QgbmVjZXNzYXJpbHkgdGhlIGtleXMsIGJ1dCB0aGUgaW5kaWNlc1xuXHQvLyBjb3JyZXNwb25kaW5nIHRvIHRoZSBrZXllZCBub2RlcyBpbiB0aGUgb2xkIGxpc3QgKGtleWVkIG5vZGVzIGBlLGQsYyxiLGFgID0+IGBiLGEsZSxkLGNgIHdvdWxkXG5cdC8vICBtYXRjaCB0aGUgYWJvdmUgbGlzdHMsIGZvciBleGFtcGxlKS5cblx0Ly9cblx0Ly8gSW4gdGhlcmUgYXJlIHR3byBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlczogYDQsNWAgYW5kIGAxLDIsM2AsIHRoZSBsYXR0ZXIgYmVpbmcgdGhlIGxvbmdlc3QuIFdlXG5cdC8vIGNhbiB1cGRhdGUgdGhvc2Ugbm9kZXMgd2l0aG91dCBtb3ZpbmcgdGhlbSwgYW5kIG9ubHkgY2FsbCBgaW5zZXJ0Tm9kZWAgb24gYDRgIGFuZCBgNWAuXG5cdC8vXG5cdC8vIEBsb2NhbHZvaWQgYWRhcHRlZCB0aGUgYWxnbyB0byBhbHNvIHN1cHBvcnQgbm9kZSBkZWxldGlvbnMgYW5kIGluc2VydGlvbnMgKHRoZSBgbGlzYCBpcyBhY3R1YWxseVxuXHQvLyB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlICpvZiBvbGQgbm9kZXMgc3RpbGwgcHJlc2VudCBpbiB0aGUgbmV3IGxpc3QqKS5cblx0Ly9cblx0Ly8gSXQgaXMgYSBnZW5lcmFsIGFsZ29yaXRobSB0aGF0IGlzIGZpcmVwcm9vZiBpbiBhbGwgY2lyY3Vtc3RhbmNlcywgYnV0IGl0IHJlcXVpcmVzIHRoZSBhbGxvY2F0aW9uXG5cdC8vIGFuZCB0aGUgY29uc3RydWN0aW9uIG9mIGEgYGtleSA9PiBvbGRJbmRleGAgbWFwLCBhbmQgdGhyZWUgYXJyYXlzIChvbmUgd2l0aCBgbmV3SW5kZXggPT4gb2xkSW5kZXhgLFxuXHQvLyB0aGUgYExJU2AgYW5kIGEgdGVtcG9yYXJ5IG9uZSB0byBjcmVhdGUgdGhlIExJUykuXG5cdC8vXG5cdC8vIFNvIHdlIGNoZWF0IHdoZXJlIHdlIGNhbjogaWYgdGhlIHRhaWxzIG9mIHRoZSBsaXN0cyBhcmUgaWRlbnRpY2FsLCB0aGV5IGFyZSBndWFyYW50ZWVkIHRvIGJlIHBhcnQgb2Zcblx0Ly8gdGhlIExJUyBhbmQgY2FuIGJlIHVwZGF0ZWQgd2l0aG91dCBtb3ZpbmcgdGhlbS5cblx0Ly9cblx0Ly8gSWYgdHdvIG5vZGVzIGFyZSBzd2FwcGVkLCB0aGV5IGFyZSBndWFyYW50ZWVkIG5vdCB0byBiZSBwYXJ0IG9mIHRoZSBMSVMsIGFuZCBtdXN0IGJlIG1vdmVkICh3aXRoXG5cdC8vIHRoZSBleGNlcHRpb24gb2YgdGhlIGxhc3Qgbm9kZSBpZiB0aGUgbGlzdCBpcyBmdWxseSByZXZlcnNlZCkuXG5cdC8vXG5cdC8vICMjIEZpbmRpbmcgdGhlIG5leHQgc2libGluZy5cblx0Ly9cblx0Ly8gYHVwZGF0ZU5vZGUoKWAgYW5kIGBjcmVhdGVOb2RlKClgIGV4cGVjdCBhIG5leHRTaWJsaW5nIHBhcmFtZXRlciB0byBwZXJmb3JtIERPTSBvcGVyYXRpb25zLlxuXHQvLyBXaGVuIHRoZSBsaXN0IGlzIGJlaW5nIHRyYXZlcnNlZCB0b3AtZG93biwgYXQgYW55IGluZGV4LCB0aGUgRE9NIG5vZGVzIHVwIHRvIHRoZSBwcmV2aW91c1xuXHQvLyB2bm9kZSByZWZsZWN0IHRoZSBjb250ZW50IG9mIHRoZSBuZXcgbGlzdCwgd2hlcmVhcyB0aGUgcmVzdCBvZiB0aGUgRE9NIG5vZGVzIHJlZmxlY3QgdGhlIG9sZFxuXHQvLyBsaXN0LiBUaGUgbmV4dCBzaWJsaW5nIG11c3QgYmUgbG9va2VkIGZvciBpbiB0aGUgb2xkIGxpc3QgdXNpbmcgYGdldE5leHRTaWJsaW5nKC4uLiBvbGRTdGFydCArIDEgLi4uKWAuXG5cdC8vXG5cdC8vIEluIHRoZSBvdGhlciBzY2VuYXJpb3MgKHN3YXBzLCB1cHdhcmRzIHRyYXZlcnNhbCwgbWFwLWJhc2VkIGRpZmYpLFxuXHQvLyB0aGUgbmV3IHZub2RlcyBsaXN0IGlzIHRyYXZlcnNlZCB1cHdhcmRzLiBUaGUgRE9NIG5vZGVzIGF0IHRoZSBib3R0b20gb2YgdGhlIGxpc3QgcmVmbGVjdCB0aGVcblx0Ly8gYm90dG9tIHBhcnQgb2YgdGhlIG5ldyB2bm9kZXMgbGlzdCwgYW5kIHdlIGNhbiB1c2UgdGhlIGB2LmRvbWAgIHZhbHVlIG9mIHRoZSBwcmV2aW91cyBub2RlXG5cdC8vIGFzIHRoZSBuZXh0IHNpYmxpbmcgKGNhY2hlZCBpbiB0aGUgYG5leHRTaWJsaW5nYCB2YXJpYWJsZSkuXG5cblxuXHQvLyAjIyBET00gbm9kZSBtb3Zlc1xuXHQvL1xuXHQvLyBJbiBtb3N0IHNjZW5hcmlvcyBgdXBkYXRlTm9kZSgpYCBhbmQgYGNyZWF0ZU5vZGUoKWAgcGVyZm9ybSB0aGUgRE9NIG9wZXJhdGlvbnMuIEhvd2V2ZXIsXG5cdC8vIHRoaXMgaXMgbm90IHRoZSBjYXNlIGlmIHRoZSBub2RlIG1vdmVkIChzZWNvbmQgYW5kIGZvdXJ0aCBwYXJ0IG9mIHRoZSBkaWZmIGFsZ28pLiBXZSBtb3ZlXG5cdC8vIHRoZSBvbGQgRE9NIG5vZGVzIGJlZm9yZSB1cGRhdGVOb2RlIHJ1bnMgYmVjYXVzZSBpdCBlbmFibGVzIHVzIHRvIHVzZSB0aGUgY2FjaGVkIGBuZXh0U2libGluZ2Bcblx0Ly8gdmFyaWFibGUgcmF0aGVyIHRoYW4gZmV0Y2hpbmcgaXQgdXNpbmcgYGdldE5leHRTaWJsaW5nKClgLlxuXHQvL1xuXHQvLyBUaGUgZm91cnRoIHBhcnQgb2YgdGhlIGRpZmYgY3VycmVudGx5IGluc2VydHMgbm9kZXMgdW5jb25kaXRpb25hbGx5LCBsZWFkaW5nIHRvIGlzc3Vlc1xuXHQvLyBsaWtlICMxNzkxIGFuZCAjMTk5OS4gV2UgbmVlZCB0byBiZSBzbWFydGVyIGFib3V0IHRob3NlIHNpdHVhdGlvbnMgd2hlcmUgYWRqYXNjZW50IG9sZFxuXHQvLyBub2RlcyByZW1haW4gdG9nZXRoZXIgaW4gdGhlIG5ldyBsaXN0IGluIGEgd2F5IHRoYXQgaXNuJ3QgY292ZXJlZCBieSBwYXJ0cyBvbmUgYW5kXG5cdC8vIHRocmVlIG9mIHRoZSBkaWZmIGFsZ28uXG5cblx0ZnVuY3Rpb24gdXBkYXRlTm9kZXMocGFyZW50LCBvbGQsIHZub2RlcywgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdGlmIChvbGQgPT09IHZub2RlcyB8fCBvbGQgPT0gbnVsbCAmJiB2bm9kZXMgPT0gbnVsbCkgcmV0dXJuXG5cdFx0ZWxzZSBpZiAob2xkID09IG51bGwgfHwgb2xkLmxlbmd0aCA9PT0gMCkgY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIDAsIHZub2Rlcy5sZW5ndGgsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0ZWxzZSBpZiAodm5vZGVzID09IG51bGwgfHwgdm5vZGVzLmxlbmd0aCA9PT0gMCkgcmVtb3ZlTm9kZXMocGFyZW50LCBvbGQsIDAsIG9sZC5sZW5ndGgpXG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgaXNPbGRLZXllZCA9IG9sZFswXSAhPSBudWxsICYmIG9sZFswXS5rZXkgIT0gbnVsbFxuXHRcdFx0dmFyIGlzS2V5ZWQgPSB2bm9kZXNbMF0gIT0gbnVsbCAmJiB2bm9kZXNbMF0ua2V5ICE9IG51bGxcblx0XHRcdHZhciBzdGFydCA9IDAsIG9sZFN0YXJ0ID0gMFxuXHRcdFx0aWYgKCFpc09sZEtleWVkKSB3aGlsZSAob2xkU3RhcnQgPCBvbGQubGVuZ3RoICYmIG9sZFtvbGRTdGFydF0gPT0gbnVsbCkgb2xkU3RhcnQrK1xuXHRcdFx0aWYgKCFpc0tleWVkKSB3aGlsZSAoc3RhcnQgPCB2bm9kZXMubGVuZ3RoICYmIHZub2Rlc1tzdGFydF0gPT0gbnVsbCkgc3RhcnQrK1xuXHRcdFx0aWYgKGlzS2V5ZWQgPT09IG51bGwgJiYgaXNPbGRLZXllZCA9PSBudWxsKSByZXR1cm4gLy8gYm90aCBsaXN0cyBhcmUgZnVsbCBvZiBudWxsc1xuXHRcdFx0aWYgKGlzT2xkS2V5ZWQgIT09IGlzS2V5ZWQpIHtcblx0XHRcdFx0cmVtb3ZlTm9kZXMocGFyZW50LCBvbGQsIG9sZFN0YXJ0LCBvbGQubGVuZ3RoKVxuXHRcdFx0XHRjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIHZub2Rlcy5sZW5ndGgsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHR9IGVsc2UgaWYgKCFpc0tleWVkKSB7XG5cdFx0XHRcdC8vIERvbid0IGluZGV4IHBhc3QgdGhlIGVuZCBvZiBlaXRoZXIgbGlzdCAoY2F1c2VzIGRlb3B0cykuXG5cdFx0XHRcdHZhciBjb21tb25MZW5ndGggPSBvbGQubGVuZ3RoIDwgdm5vZGVzLmxlbmd0aCA/IG9sZC5sZW5ndGggOiB2bm9kZXMubGVuZ3RoXG5cdFx0XHRcdC8vIFJld2luZCBpZiBuZWNlc3NhcnkgdG8gdGhlIGZpcnN0IG5vbi1udWxsIGluZGV4IG9uIGVpdGhlciBzaWRlLlxuXHRcdFx0XHQvLyBXZSBjb3VsZCBhbHRlcm5hdGl2ZWx5IGVpdGhlciBleHBsaWNpdGx5IGNyZWF0ZSBvciByZW1vdmUgbm9kZXMgd2hlbiBgc3RhcnQgIT09IG9sZFN0YXJ0YFxuXHRcdFx0XHQvLyBidXQgdGhhdCB3b3VsZCBiZSBvcHRpbWl6aW5nIGZvciBzcGFyc2UgbGlzdHMgd2hpY2ggYXJlIG1vcmUgcmFyZSB0aGFuIGRlbnNlIG9uZXMuXG5cdFx0XHRcdHN0YXJ0ID0gc3RhcnQgPCBvbGRTdGFydCA/IHN0YXJ0IDogb2xkU3RhcnRcblx0XHRcdFx0Zm9yICg7IHN0YXJ0IDwgY29tbW9uTGVuZ3RoOyBzdGFydCsrKSB7XG5cdFx0XHRcdFx0byA9IG9sZFtzdGFydF1cblx0XHRcdFx0XHR2ID0gdm5vZGVzW3N0YXJ0XVxuXHRcdFx0XHRcdGlmIChvID09PSB2IHx8IG8gPT0gbnVsbCAmJiB2ID09IG51bGwpIGNvbnRpbnVlXG5cdFx0XHRcdFx0ZWxzZSBpZiAobyA9PSBudWxsKSBjcmVhdGVOb2RlKHBhcmVudCwgdiwgaG9va3MsIG5zLCBnZXROZXh0U2libGluZyhvbGQsIHN0YXJ0ICsgMSwgbmV4dFNpYmxpbmcpKVxuXHRcdFx0XHRcdGVsc2UgaWYgKHYgPT0gbnVsbCkgcmVtb3ZlTm9kZShwYXJlbnQsIG8pXG5cdFx0XHRcdFx0ZWxzZSB1cGRhdGVOb2RlKHBhcmVudCwgbywgdiwgaG9va3MsIGdldE5leHRTaWJsaW5nKG9sZCwgc3RhcnQgKyAxLCBuZXh0U2libGluZyksIG5zKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvbGQubGVuZ3RoID4gY29tbW9uTGVuZ3RoKSByZW1vdmVOb2RlcyhwYXJlbnQsIG9sZCwgc3RhcnQsIG9sZC5sZW5ndGgpXG5cdFx0XHRcdGlmICh2bm9kZXMubGVuZ3RoID4gY29tbW9uTGVuZ3RoKSBjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIHZub2Rlcy5sZW5ndGgsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBrZXllZCBkaWZmXG5cdFx0XHRcdHZhciBvbGRFbmQgPSBvbGQubGVuZ3RoIC0gMSwgZW5kID0gdm5vZGVzLmxlbmd0aCAtIDEsIG1hcCwgbywgdiwgb2UsIHZlLCB0b3BTaWJsaW5nXG5cblx0XHRcdFx0Ly8gYm90dG9tLXVwXG5cdFx0XHRcdHdoaWxlIChvbGRFbmQgPj0gb2xkU3RhcnQgJiYgZW5kID49IHN0YXJ0KSB7XG5cdFx0XHRcdFx0b2UgPSBvbGRbb2xkRW5kXVxuXHRcdFx0XHRcdHZlID0gdm5vZGVzW2VuZF1cblx0XHRcdFx0XHRpZiAob2Uua2V5ICE9PSB2ZS5rZXkpIGJyZWFrXG5cdFx0XHRcdFx0aWYgKG9lICE9PSB2ZSkgdXBkYXRlTm9kZShwYXJlbnQsIG9lLCB2ZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdFx0XHRpZiAodmUuZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gdmUuZG9tXG5cdFx0XHRcdFx0b2xkRW5kLS0sIGVuZC0tXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gdG9wLWRvd25cblx0XHRcdFx0d2hpbGUgKG9sZEVuZCA+PSBvbGRTdGFydCAmJiBlbmQgPj0gc3RhcnQpIHtcblx0XHRcdFx0XHRvID0gb2xkW29sZFN0YXJ0XVxuXHRcdFx0XHRcdHYgPSB2bm9kZXNbc3RhcnRdXG5cdFx0XHRcdFx0aWYgKG8ua2V5ICE9PSB2LmtleSkgYnJlYWtcblx0XHRcdFx0XHRvbGRTdGFydCsrLCBzdGFydCsrXG5cdFx0XHRcdFx0aWYgKG8gIT09IHYpIHVwZGF0ZU5vZGUocGFyZW50LCBvLCB2LCBob29rcywgZ2V0TmV4dFNpYmxpbmcob2xkLCBvbGRTdGFydCwgbmV4dFNpYmxpbmcpLCBucylcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBzd2FwcyBhbmQgbGlzdCByZXZlcnNhbHNcblx0XHRcdFx0d2hpbGUgKG9sZEVuZCA+PSBvbGRTdGFydCAmJiBlbmQgPj0gc3RhcnQpIHtcblx0XHRcdFx0XHRpZiAoc3RhcnQgPT09IGVuZCkgYnJlYWtcblx0XHRcdFx0XHRpZiAoby5rZXkgIT09IHZlLmtleSB8fCBvZS5rZXkgIT09IHYua2V5KSBicmVha1xuXHRcdFx0XHRcdHRvcFNpYmxpbmcgPSBnZXROZXh0U2libGluZyhvbGQsIG9sZFN0YXJ0LCBuZXh0U2libGluZylcblx0XHRcdFx0XHRtb3ZlTm9kZXMocGFyZW50LCBvZSwgdG9wU2libGluZylcblx0XHRcdFx0XHRpZiAob2UgIT09IHYpIHVwZGF0ZU5vZGUocGFyZW50LCBvZSwgdiwgaG9va3MsIHRvcFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGlmICgrK3N0YXJ0IDw9IC0tZW5kKSBtb3ZlTm9kZXMocGFyZW50LCBvLCBuZXh0U2libGluZylcblx0XHRcdFx0XHRpZiAobyAhPT0gdmUpIHVwZGF0ZU5vZGUocGFyZW50LCBvLCB2ZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdFx0XHRpZiAodmUuZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gdmUuZG9tXG5cdFx0XHRcdFx0b2xkU3RhcnQrKzsgb2xkRW5kLS1cblx0XHRcdFx0XHRvZSA9IG9sZFtvbGRFbmRdXG5cdFx0XHRcdFx0dmUgPSB2bm9kZXNbZW5kXVxuXHRcdFx0XHRcdG8gPSBvbGRbb2xkU3RhcnRdXG5cdFx0XHRcdFx0diA9IHZub2Rlc1tzdGFydF1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBib3R0b20gdXAgb25jZSBhZ2FpblxuXHRcdFx0XHR3aGlsZSAob2xkRW5kID49IG9sZFN0YXJ0ICYmIGVuZCA+PSBzdGFydCkge1xuXHRcdFx0XHRcdGlmIChvZS5rZXkgIT09IHZlLmtleSkgYnJlYWtcblx0XHRcdFx0XHRpZiAob2UgIT09IHZlKSB1cGRhdGVOb2RlKHBhcmVudCwgb2UsIHZlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGlmICh2ZS5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2ZS5kb21cblx0XHRcdFx0XHRvbGRFbmQtLSwgZW5kLS1cblx0XHRcdFx0XHRvZSA9IG9sZFtvbGRFbmRdXG5cdFx0XHRcdFx0dmUgPSB2bm9kZXNbZW5kXVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChzdGFydCA+IGVuZCkgcmVtb3ZlTm9kZXMocGFyZW50LCBvbGQsIG9sZFN0YXJ0LCBvbGRFbmQgKyAxKVxuXHRcdFx0XHRlbHNlIGlmIChvbGRTdGFydCA+IG9sZEVuZCkgY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQgKyAxLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQvLyBpbnNwaXJlZCBieSBpdmkgaHR0cHM6Ly9naXRodWIuY29tL2l2aWpzL2l2aS8gYnkgQm9yaXMgS2F1bFxuXHRcdFx0XHRcdHZhciBvcmlnaW5hbE5leHRTaWJsaW5nID0gbmV4dFNpYmxpbmcsIHZub2Rlc0xlbmd0aCA9IGVuZCAtIHN0YXJ0ICsgMSwgb2xkSW5kaWNlcyA9IG5ldyBBcnJheSh2bm9kZXNMZW5ndGgpLCBsaT0wLCBpPTAsIHBvcyA9IDIxNDc0ODM2NDcsIG1hdGNoZWQgPSAwLCBtYXAsIGxpc0luZGljZXNcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgdm5vZGVzTGVuZ3RoOyBpKyspIG9sZEluZGljZXNbaV0gPSAtMVxuXHRcdFx0XHRcdGZvciAoaSA9IGVuZDsgaSA+PSBzdGFydDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRpZiAobWFwID09IG51bGwpIG1hcCA9IGdldEtleU1hcChvbGQsIG9sZFN0YXJ0LCBvbGRFbmQgKyAxKVxuXHRcdFx0XHRcdFx0dmUgPSB2bm9kZXNbaV1cblx0XHRcdFx0XHRcdHZhciBvbGRJbmRleCA9IG1hcFt2ZS5rZXldXG5cdFx0XHRcdFx0XHRpZiAob2xkSW5kZXggIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRwb3MgPSAob2xkSW5kZXggPCBwb3MpID8gb2xkSW5kZXggOiAtMSAvLyBiZWNvbWVzIC0xIGlmIG5vZGVzIHdlcmUgcmUtb3JkZXJlZFxuXHRcdFx0XHRcdFx0XHRvbGRJbmRpY2VzW2ktc3RhcnRdID0gb2xkSW5kZXhcblx0XHRcdFx0XHRcdFx0b2UgPSBvbGRbb2xkSW5kZXhdXG5cdFx0XHRcdFx0XHRcdG9sZFtvbGRJbmRleF0gPSBudWxsXG5cdFx0XHRcdFx0XHRcdGlmIChvZSAhPT0gdmUpIHVwZGF0ZU5vZGUocGFyZW50LCBvZSwgdmUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHRcdFx0XHRcdGlmICh2ZS5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2ZS5kb21cblx0XHRcdFx0XHRcdFx0bWF0Y2hlZCsrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5leHRTaWJsaW5nID0gb3JpZ2luYWxOZXh0U2libGluZ1xuXHRcdFx0XHRcdGlmIChtYXRjaGVkICE9PSBvbGRFbmQgLSBvbGRTdGFydCArIDEpIHJlbW92ZU5vZGVzKHBhcmVudCwgb2xkLCBvbGRTdGFydCwgb2xkRW5kICsgMSlcblx0XHRcdFx0XHRpZiAobWF0Y2hlZCA9PT0gMCkgY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQgKyAxLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKHBvcyA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0Ly8gdGhlIGluZGljZXMgb2YgdGhlIGluZGljZXMgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIHBhcnQgb2YgdGhlXG5cdFx0XHRcdFx0XHRcdC8vIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBpbiB0aGUgb2xkSW5kaWNlcyBsaXN0XG5cdFx0XHRcdFx0XHRcdGxpc0luZGljZXMgPSBtYWtlTGlzSW5kaWNlcyhvbGRJbmRpY2VzKVxuXHRcdFx0XHRcdFx0XHRsaSA9IGxpc0luZGljZXMubGVuZ3RoIC0gMVxuXHRcdFx0XHRcdFx0XHRmb3IgKGkgPSBlbmQ7IGkgPj0gc3RhcnQ7IGktLSkge1xuXHRcdFx0XHRcdFx0XHRcdHYgPSB2bm9kZXNbaV1cblx0XHRcdFx0XHRcdFx0XHRpZiAob2xkSW5kaWNlc1tpLXN0YXJ0XSA9PT0gLTEpIGNyZWF0ZU5vZGUocGFyZW50LCB2LCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGxpc0luZGljZXNbbGldID09PSBpIC0gc3RhcnQpIGxpLS1cblx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgbW92ZU5vZGVzKHBhcmVudCwgdiwgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmICh2LmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IHZub2Rlc1tpXS5kb21cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChpID0gZW5kOyBpID49IHN0YXJ0OyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0XHR2ID0gdm5vZGVzW2ldXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG9sZEluZGljZXNbaS1zdGFydF0gPT09IC0xKSBjcmVhdGVOb2RlKHBhcmVudCwgdiwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdFx0XHRcdFx0XHRpZiAodi5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2bm9kZXNbaV0uZG9tXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlTm9kZShwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHR2YXIgb2xkVGFnID0gb2xkLnRhZywgdGFnID0gdm5vZGUudGFnXG5cdFx0aWYgKG9sZFRhZyA9PT0gdGFnKSB7XG5cdFx0XHR2bm9kZS5zdGF0ZSA9IG9sZC5zdGF0ZVxuXHRcdFx0dm5vZGUuZXZlbnRzID0gb2xkLmV2ZW50c1xuXHRcdFx0aWYgKHNob3VsZE5vdFVwZGF0ZSh2bm9kZSwgb2xkKSkgcmV0dXJuXG5cdFx0XHRpZiAodHlwZW9mIG9sZFRhZyA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCkge1xuXHRcdFx0XHRcdHVwZGF0ZUxpZmVjeWNsZSh2bm9kZS5hdHRycywgdm5vZGUsIGhvb2tzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHN3aXRjaCAob2xkVGFnKSB7XG5cdFx0XHRcdFx0Y2FzZSBcIiNcIjogdXBkYXRlVGV4dChvbGQsIHZub2RlKTsgYnJlYWtcblx0XHRcdFx0XHRjYXNlIFwiPFwiOiB1cGRhdGVIVE1MKHBhcmVudCwgb2xkLCB2bm9kZSwgbnMsIG5leHRTaWJsaW5nKTsgYnJlYWtcblx0XHRcdFx0XHRjYXNlIFwiW1wiOiB1cGRhdGVGcmFnbWVudChwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpOyBicmVha1xuXHRcdFx0XHRcdGRlZmF1bHQ6IHVwZGF0ZUVsZW1lbnQob2xkLCB2bm9kZSwgaG9va3MsIG5zKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHVwZGF0ZUNvbXBvbmVudChwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmVtb3ZlTm9kZShwYXJlbnQsIG9sZClcblx0XHRcdGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlVGV4dChvbGQsIHZub2RlKSB7XG5cdFx0aWYgKG9sZC5jaGlsZHJlbi50b1N0cmluZygpICE9PSB2bm9kZS5jaGlsZHJlbi50b1N0cmluZygpKSB7XG5cdFx0XHRvbGQuZG9tLm5vZGVWYWx1ZSA9IHZub2RlLmNoaWxkcmVuXG5cdFx0fVxuXHRcdHZub2RlLmRvbSA9IG9sZC5kb21cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVIVE1MKHBhcmVudCwgb2xkLCB2bm9kZSwgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0aWYgKG9sZC5jaGlsZHJlbiAhPT0gdm5vZGUuY2hpbGRyZW4pIHtcblx0XHRcdHJlbW92ZUhUTUwocGFyZW50LCBvbGQpXG5cdFx0XHRjcmVhdGVIVE1MKHBhcmVudCwgdm5vZGUsIG5zLCBuZXh0U2libGluZylcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gb2xkLmRvbVNpemVcblx0XHRcdHZub2RlLmluc3RhbmNlID0gb2xkLmluc3RhbmNlXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUZyYWdtZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdHVwZGF0ZU5vZGVzKHBhcmVudCwgb2xkLmNoaWxkcmVuLCB2bm9kZS5jaGlsZHJlbiwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHR2YXIgZG9tU2l6ZSA9IDAsIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHR2bm9kZS5kb20gPSBudWxsXG5cdFx0aWYgKGNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGNoaWxkID0gY2hpbGRyZW5baV1cblx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwgJiYgY2hpbGQuZG9tICE9IG51bGwpIHtcblx0XHRcdFx0XHRpZiAodm5vZGUuZG9tID09IG51bGwpIHZub2RlLmRvbSA9IGNoaWxkLmRvbVxuXHRcdFx0XHRcdGRvbVNpemUgKz0gY2hpbGQuZG9tU2l6ZSB8fCAxXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChkb21TaXplICE9PSAxKSB2bm9kZS5kb21TaXplID0gZG9tU2l6ZVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVFbGVtZW50KG9sZCwgdm5vZGUsIGhvb2tzLCBucykge1xuXHRcdHZhciBlbGVtZW50ID0gdm5vZGUuZG9tID0gb2xkLmRvbVxuXHRcdG5zID0gZ2V0TmFtZVNwYWNlKHZub2RlKSB8fCBuc1xuXG5cdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJ0ZXh0YXJlYVwiKSB7XG5cdFx0XHRpZiAodm5vZGUuYXR0cnMgPT0gbnVsbCkgdm5vZGUuYXR0cnMgPSB7fVxuXHRcdFx0aWYgKHZub2RlLnRleHQgIT0gbnVsbCkge1xuXHRcdFx0XHR2bm9kZS5hdHRycy52YWx1ZSA9IHZub2RlLnRleHQgLy9GSVhNRSBoYW5kbGUgbXVsdGlwbGUgY2hpbGRyZW5cblx0XHRcdFx0dm5vZGUudGV4dCA9IHVuZGVmaW5lZFxuXHRcdFx0fVxuXHRcdH1cblx0XHR1cGRhdGVBdHRycyh2bm9kZSwgb2xkLmF0dHJzLCB2bm9kZS5hdHRycywgbnMpXG5cdFx0aWYgKCFtYXliZVNldENvbnRlbnRFZGl0YWJsZSh2bm9kZSkpIHtcblx0XHRcdGlmIChvbGQudGV4dCAhPSBudWxsICYmIHZub2RlLnRleHQgIT0gbnVsbCAmJiB2bm9kZS50ZXh0ICE9PSBcIlwiKSB7XG5cdFx0XHRcdGlmIChvbGQudGV4dC50b1N0cmluZygpICE9PSB2bm9kZS50ZXh0LnRvU3RyaW5nKCkpIG9sZC5kb20uZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSB2bm9kZS50ZXh0XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKG9sZC50ZXh0ICE9IG51bGwpIG9sZC5jaGlsZHJlbiA9IFtWbm9kZShcIiNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG9sZC50ZXh0LCB1bmRlZmluZWQsIG9sZC5kb20uZmlyc3RDaGlsZCldXG5cdFx0XHRcdGlmICh2bm9kZS50ZXh0ICE9IG51bGwpIHZub2RlLmNoaWxkcmVuID0gW1Zub2RlKFwiI1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdm5vZGUudGV4dCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXVxuXHRcdFx0XHR1cGRhdGVOb2RlcyhlbGVtZW50LCBvbGQuY2hpbGRyZW4sIHZub2RlLmNoaWxkcmVuLCBob29rcywgbnVsbCwgbnMpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUNvbXBvbmVudChwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHR2bm9kZS5pbnN0YW5jZSA9IFZub2RlLm5vcm1hbGl6ZShjYWxsSG9vay5jYWxsKHZub2RlLnN0YXRlLnZpZXcsIHZub2RlKSlcblx0XHRpZiAodm5vZGUuaW5zdGFuY2UgPT09IHZub2RlKSB0aHJvdyBFcnJvcihcIkEgdmlldyBjYW5ub3QgcmV0dXJuIHRoZSB2bm9kZSBpdCByZWNlaXZlZCBhcyBhcmd1bWVudFwiKVxuXHRcdHVwZGF0ZUxpZmVjeWNsZSh2bm9kZS5zdGF0ZSwgdm5vZGUsIGhvb2tzKVxuXHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKSB1cGRhdGVMaWZlY3ljbGUodm5vZGUuYXR0cnMsIHZub2RlLCBob29rcylcblx0XHRpZiAodm5vZGUuaW5zdGFuY2UgIT0gbnVsbCkge1xuXHRcdFx0aWYgKG9sZC5pbnN0YW5jZSA9PSBudWxsKSBjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUuaW5zdGFuY2UsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHRlbHNlIHVwZGF0ZU5vZGUocGFyZW50LCBvbGQuaW5zdGFuY2UsIHZub2RlLmluc3RhbmNlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0dm5vZGUuZG9tID0gdm5vZGUuaW5zdGFuY2UuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gdm5vZGUuaW5zdGFuY2UuZG9tU2l6ZVxuXHRcdH1cblx0XHRlbHNlIGlmIChvbGQuaW5zdGFuY2UgIT0gbnVsbCkge1xuXHRcdFx0cmVtb3ZlTm9kZShwYXJlbnQsIG9sZC5pbnN0YW5jZSlcblx0XHRcdHZub2RlLmRvbSA9IHVuZGVmaW5lZFxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IDBcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gb2xkLmRvbVNpemVcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gZ2V0S2V5TWFwKHZub2Rlcywgc3RhcnQsIGVuZCkge1xuXHRcdHZhciBtYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cdFx0Zm9yICg7IHN0YXJ0IDwgZW5kOyBzdGFydCsrKSB7XG5cdFx0XHR2YXIgdm5vZGUgPSB2bm9kZXNbc3RhcnRdXG5cdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkge1xuXHRcdFx0XHR2YXIga2V5ID0gdm5vZGUua2V5XG5cdFx0XHRcdGlmIChrZXkgIT0gbnVsbCkgbWFwW2tleV0gPSBzdGFydFxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbWFwXG5cdH1cblx0Ly8gTGlmdGVkIGZyb20gaXZpIGh0dHBzOi8vZ2l0aHViLmNvbS9pdmlqcy9pdmkvXG5cdC8vIHRha2VzIGEgbGlzdCBvZiB1bmlxdWUgbnVtYmVycyAoLTEgaXMgc3BlY2lhbCBhbmQgY2FuXG5cdC8vIG9jY3VyIG11bHRpcGxlIHRpbWVzKSBhbmQgcmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBpbmRpY2VzXG5cdC8vIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBwYXJ0IG9mIHRoZSBsb25nZXN0IGluY3JlYXNpbmdcblx0Ly8gc3Vic2VxdWVjZVxuXHR2YXIgbGlzVGVtcCA9IFtdXG5cdGZ1bmN0aW9uIG1ha2VMaXNJbmRpY2VzKGEpIHtcblx0XHR2YXIgcmVzdWx0ID0gWzBdXG5cdFx0dmFyIHUgPSAwLCB2ID0gMCwgaSA9IDBcblx0XHR2YXIgaWwgPSBsaXNUZW1wLmxlbmd0aCA9IGEubGVuZ3RoXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbDsgaSsrKSBsaXNUZW1wW2ldID0gYVtpXVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWw7ICsraSkge1xuXHRcdFx0aWYgKGFbaV0gPT09IC0xKSBjb250aW51ZVxuXHRcdFx0dmFyIGogPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdXG5cdFx0XHRpZiAoYVtqXSA8IGFbaV0pIHtcblx0XHRcdFx0bGlzVGVtcFtpXSA9IGpcblx0XHRcdFx0cmVzdWx0LnB1c2goaSlcblx0XHRcdFx0Y29udGludWVcblx0XHRcdH1cblx0XHRcdHUgPSAwXG5cdFx0XHR2ID0gcmVzdWx0Lmxlbmd0aCAtIDFcblx0XHRcdHdoaWxlICh1IDwgdikge1xuXHRcdFx0XHQvLyBGYXN0IGludGVnZXIgYXZlcmFnZSB3aXRob3V0IG92ZXJmbG93LlxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHR2YXIgYyA9ICh1ID4+PiAxKSArICh2ID4+PiAxKSArICh1ICYgdiAmIDEpXG5cdFx0XHRcdGlmIChhW3Jlc3VsdFtjXV0gPCBhW2ldKSB7XG5cdFx0XHRcdFx0dSA9IGMgKyAxXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0diA9IGNcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGFbaV0gPCBhW3Jlc3VsdFt1XV0pIHtcblx0XHRcdFx0aWYgKHUgPiAwKSBsaXNUZW1wW2ldID0gcmVzdWx0W3UgLSAxXVxuXHRcdFx0XHRyZXN1bHRbdV0gPSBpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHUgPSByZXN1bHQubGVuZ3RoXG5cdFx0diA9IHJlc3VsdFt1IC0gMV1cblx0XHR3aGlsZSAodS0tID4gMCkge1xuXHRcdFx0cmVzdWx0W3VdID0gdlxuXHRcdFx0diA9IGxpc1RlbXBbdl1cblx0XHR9XG5cdFx0bGlzVGVtcC5sZW5ndGggPSAwXG5cdFx0cmV0dXJuIHJlc3VsdFxuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0TmV4dFNpYmxpbmcodm5vZGVzLCBpLCBuZXh0U2libGluZykge1xuXHRcdGZvciAoOyBpIDwgdm5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodm5vZGVzW2ldICE9IG51bGwgJiYgdm5vZGVzW2ldLmRvbSAhPSBudWxsKSByZXR1cm4gdm5vZGVzW2ldLmRvbVxuXHRcdH1cblx0XHRyZXR1cm4gbmV4dFNpYmxpbmdcblx0fVxuXG5cdC8vIFRoaXMgY292ZXJzIGEgcmVhbGx5IHNwZWNpZmljIGVkZ2UgY2FzZTpcblx0Ly8gLSBQYXJlbnQgbm9kZSBpcyBrZXllZCBhbmQgY29udGFpbnMgY2hpbGRcblx0Ly8gLSBDaGlsZCBpcyByZW1vdmVkLCByZXR1cm5zIHVucmVzb2x2ZWQgcHJvbWlzZSBpbiBgb25iZWZvcmVyZW1vdmVgXG5cdC8vIC0gUGFyZW50IG5vZGUgaXMgbW92ZWQgaW4ga2V5ZWQgZGlmZlxuXHQvLyAtIFJlbWFpbmluZyBjaGlsZHJlbiBzdGlsbCBuZWVkIG1vdmVkIGFwcHJvcHJpYXRlbHlcblx0Ly9cblx0Ly8gSWRlYWxseSwgSSdkIHRyYWNrIHJlbW92ZWQgbm9kZXMgYXMgd2VsbCwgYnV0IHRoYXQgaW50cm9kdWNlcyBhIGxvdCBtb3JlXG5cdC8vIGNvbXBsZXhpdHkgYW5kIEknbSBub3QgZXhhY3RseSBpbnRlcmVzdGVkIGluIGRvaW5nIHRoYXQuXG5cdGZ1bmN0aW9uIG1vdmVOb2RlcyhwYXJlbnQsIHZub2RlLCBuZXh0U2libGluZykge1xuXHRcdHZhciBmcmFnID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHRtb3ZlQ2hpbGRUb0ZyYWcocGFyZW50LCBmcmFnLCB2bm9kZSlcblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZnJhZywgbmV4dFNpYmxpbmcpXG5cdH1cblx0ZnVuY3Rpb24gbW92ZUNoaWxkVG9GcmFnKHBhcmVudCwgZnJhZywgdm5vZGUpIHtcblx0XHQvLyBEb2RnZSB0aGUgcmVjdXJzaW9uIG92ZXJoZWFkIGluIGEgZmV3IG9mIHRoZSBtb3N0IGNvbW1vbiBjYXNlcy5cblx0XHR3aGlsZSAodm5vZGUuZG9tICE9IG51bGwgJiYgdm5vZGUuZG9tLnBhcmVudE5vZGUgPT09IHBhcmVudCkge1xuXHRcdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcgIT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0dm5vZGUgPSB2bm9kZS5pbnN0YW5jZVxuXHRcdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkgY29udGludWVcblx0XHRcdH0gZWxzZSBpZiAodm5vZGUudGFnID09PSBcIjxcIikge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZub2RlLmluc3RhbmNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0ZnJhZy5hcHBlbmRDaGlsZCh2bm9kZS5pbnN0YW5jZVtpXSlcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh2bm9kZS50YWcgIT09IFwiW1wiKSB7XG5cdFx0XHRcdC8vIERvbid0IHJlY3Vyc2UgZm9yIHRleHQgbm9kZXMgKm9yKiBlbGVtZW50cywganVzdCBmcmFnbWVudHNcblx0XHRcdFx0ZnJhZy5hcHBlbmRDaGlsZCh2bm9kZS5kb20pXG5cdFx0XHR9IGVsc2UgaWYgKHZub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHR2bm9kZSA9IHZub2RlLmNoaWxkcmVuWzBdXG5cdFx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSBjb250aW51ZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IHZub2RlLmNoaWxkcmVuW2ldXG5cdFx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwpIG1vdmVDaGlsZFRvRnJhZyhwYXJlbnQsIGZyYWcsIGNoaWxkKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGluc2VydE5vZGUocGFyZW50LCBkb20sIG5leHRTaWJsaW5nKSB7XG5cdFx0aWYgKG5leHRTaWJsaW5nICE9IG51bGwpIHBhcmVudC5pbnNlcnRCZWZvcmUoZG9tLCBuZXh0U2libGluZylcblx0XHRlbHNlIHBhcmVudC5hcHBlbmRDaGlsZChkb20pXG5cdH1cblxuXHRmdW5jdGlvbiBtYXliZVNldENvbnRlbnRFZGl0YWJsZSh2bm9kZSkge1xuXHRcdGlmICh2bm9kZS5hdHRycyA9PSBudWxsIHx8IChcblx0XHRcdHZub2RlLmF0dHJzLmNvbnRlbnRlZGl0YWJsZSA9PSBudWxsICYmIC8vIGF0dHJpYnV0ZVxuXHRcdFx0dm5vZGUuYXR0cnMuY29udGVudEVkaXRhYmxlID09IG51bGwgLy8gcHJvcGVydHlcblx0XHQpKSByZXR1cm4gZmFsc2Vcblx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdGlmIChjaGlsZHJlbiAhPSBudWxsICYmIGNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBjaGlsZHJlblswXS50YWcgPT09IFwiPFwiKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNoaWxkcmVuWzBdLmNoaWxkcmVuXG5cdFx0XHRpZiAodm5vZGUuZG9tLmlubmVySFRNTCAhPT0gY29udGVudCkgdm5vZGUuZG9tLmlubmVySFRNTCA9IGNvbnRlbnRcblx0XHR9XG5cdFx0ZWxzZSBpZiAodm5vZGUudGV4dCAhPSBudWxsIHx8IGNoaWxkcmVuICE9IG51bGwgJiYgY2hpbGRyZW4ubGVuZ3RoICE9PSAwKSB0aHJvdyBuZXcgRXJyb3IoXCJDaGlsZCBub2RlIG9mIGEgY29udGVudGVkaXRhYmxlIG11c3QgYmUgdHJ1c3RlZFwiKVxuXHRcdHJldHVybiB0cnVlXG5cdH1cblxuXHQvL3JlbW92ZVxuXHRmdW5jdGlvbiByZW1vdmVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIGVuZCkge1xuXHRcdGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG5cdFx0XHR2YXIgdm5vZGUgPSB2bm9kZXNbaV1cblx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSByZW1vdmVOb2RlKHBhcmVudCwgdm5vZGUpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHJlbW92ZU5vZGUocGFyZW50LCB2bm9kZSkge1xuXHRcdHZhciBtYXNrID0gMFxuXHRcdHZhciBvcmlnaW5hbCA9IHZub2RlLnN0YXRlXG5cdFx0dmFyIHN0YXRlUmVzdWx0LCBhdHRyc1Jlc3VsdFxuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2bm9kZS5zdGF0ZS5vbmJlZm9yZXJlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS5vbmJlZm9yZXJlbW92ZSwgdm5vZGUpXG5cdFx0XHRpZiAocmVzdWx0ICE9IG51bGwgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0bWFzayA9IDFcblx0XHRcdFx0c3RhdGVSZXN1bHQgPSByZXN1bHRcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHZub2RlLmF0dHJzICYmIHR5cGVvZiB2bm9kZS5hdHRycy5vbmJlZm9yZXJlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gY2FsbEhvb2suY2FsbCh2bm9kZS5hdHRycy5vbmJlZm9yZXJlbW92ZSwgdm5vZGUpXG5cdFx0XHRpZiAocmVzdWx0ICE9IG51bGwgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0bWFzayB8PSAyXG5cdFx0XHRcdGF0dHJzUmVzdWx0ID0gcmVzdWx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNoZWNrU3RhdGUodm5vZGUsIG9yaWdpbmFsKVxuXG5cdFx0Ly8gSWYgd2UgY2FuLCB0cnkgdG8gZmFzdC1wYXRoIGl0IGFuZCBhdm9pZCBhbGwgdGhlIG92ZXJoZWFkIG9mIGF3YWl0aW5nXG5cdFx0aWYgKCFtYXNrKSB7XG5cdFx0XHRvbnJlbW92ZSh2bm9kZSlcblx0XHRcdHJlbW92ZUNoaWxkKHBhcmVudCwgdm5vZGUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChzdGF0ZVJlc3VsdCAhPSBudWxsKSB7XG5cdFx0XHRcdHZhciBuZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHRcdFx0aWYgKG1hc2sgJiAxKSB7IG1hc2sgJj0gMjsgaWYgKCFtYXNrKSByZWFsbHlSZW1vdmUoKSB9XG5cdFx0XHRcdH1cblx0XHRcdFx0c3RhdGVSZXN1bHQudGhlbihuZXh0LCBuZXh0KVxuXHRcdFx0fVxuXHRcdFx0aWYgKGF0dHJzUmVzdWx0ICE9IG51bGwpIHtcblx0XHRcdFx0dmFyIG5leHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0XHRpZiAobWFzayAmIDIpIHsgbWFzayAmPSAxOyBpZiAoIW1hc2spIHJlYWxseVJlbW92ZSgpIH1cblx0XHRcdFx0fVxuXHRcdFx0XHRhdHRyc1Jlc3VsdC50aGVuKG5leHQsIG5leHQpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVhbGx5UmVtb3ZlKCkge1xuXHRcdFx0Y2hlY2tTdGF0ZSh2bm9kZSwgb3JpZ2luYWwpXG5cdFx0XHRvbnJlbW92ZSh2bm9kZSlcblx0XHRcdHJlbW92ZUNoaWxkKHBhcmVudCwgdm5vZGUpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHJlbW92ZUhUTUwocGFyZW50LCB2bm9kZSkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdm5vZGUuaW5zdGFuY2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZCh2bm9kZS5pbnN0YW5jZVtpXSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcmVtb3ZlQ2hpbGQocGFyZW50LCB2bm9kZSkge1xuXHRcdC8vIERvZGdlIHRoZSByZWN1cnNpb24gb3ZlcmhlYWQgaW4gYSBmZXcgb2YgdGhlIG1vc3QgY29tbW9uIGNhc2VzLlxuXHRcdHdoaWxlICh2bm9kZS5kb20gIT0gbnVsbCAmJiB2bm9kZS5kb20ucGFyZW50Tm9kZSA9PT0gcGFyZW50KSB7XG5cdFx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHR2bm9kZSA9IHZub2RlLmluc3RhbmNlXG5cdFx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSBjb250aW51ZVxuXHRcdFx0fSBlbHNlIGlmICh2bm9kZS50YWcgPT09IFwiPFwiKSB7XG5cdFx0XHRcdHJlbW92ZUhUTUwocGFyZW50LCB2bm9kZSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh2bm9kZS50YWcgIT09IFwiW1wiKSB7XG5cdFx0XHRcdFx0cGFyZW50LnJlbW92ZUNoaWxkKHZub2RlLmRvbSlcblx0XHRcdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkodm5vZGUuY2hpbGRyZW4pKSBicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh2bm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR2bm9kZSA9IHZub2RlLmNoaWxkcmVuWzBdXG5cdFx0XHRcdFx0aWYgKHZub2RlICE9IG51bGwpIGNvbnRpbnVlXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIGNoaWxkID0gdm5vZGUuY2hpbGRyZW5baV1cblx0XHRcdFx0XHRcdGlmIChjaGlsZCAhPSBudWxsKSByZW1vdmVDaGlsZChwYXJlbnQsIGNoaWxkKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gb25yZW1vdmUodm5vZGUpIHtcblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Ygdm5vZGUuc3RhdGUub25yZW1vdmUgPT09IFwiZnVuY3Rpb25cIikgY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS5vbnJlbW92ZSwgdm5vZGUpXG5cdFx0aWYgKHZub2RlLmF0dHJzICYmIHR5cGVvZiB2bm9kZS5hdHRycy5vbnJlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSBjYWxsSG9vay5jYWxsKHZub2RlLmF0dHJzLm9ucmVtb3ZlLCB2bm9kZSlcblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0aWYgKHZub2RlLmluc3RhbmNlICE9IG51bGwpIG9ucmVtb3ZlKHZub2RlLmluc3RhbmNlKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuXHRcdFx0XHRcdGlmIChjaGlsZCAhPSBudWxsKSBvbnJlbW92ZShjaGlsZClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vYXR0cnNcblx0ZnVuY3Rpb24gc2V0QXR0cnModm5vZGUsIGF0dHJzLCBucykge1xuXHRcdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdFx0c2V0QXR0cih2bm9kZSwga2V5LCBudWxsLCBhdHRyc1trZXldLCBucylcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gc2V0QXR0cih2bm9kZSwga2V5LCBvbGQsIHZhbHVlLCBucykge1xuXHRcdGlmIChrZXkgPT09IFwia2V5XCIgfHwga2V5ID09PSBcImlzXCIgfHwgdmFsdWUgPT0gbnVsbCB8fCBpc0xpZmVjeWNsZU1ldGhvZChrZXkpIHx8IChvbGQgPT09IHZhbHVlICYmICFpc0Zvcm1BdHRyaWJ1dGUodm5vZGUsIGtleSkpICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuXG5cdFx0aWYgKGtleVswXSA9PT0gXCJvXCIgJiYga2V5WzFdID09PSBcIm5cIikgcmV0dXJuIHVwZGF0ZUV2ZW50KHZub2RlLCBrZXksIHZhbHVlKVxuXHRcdGlmIChrZXkuc2xpY2UoMCwgNikgPT09IFwieGxpbms6XCIpIHZub2RlLmRvbS5zZXRBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiwga2V5LnNsaWNlKDYpLCB2YWx1ZSlcblx0XHRlbHNlIGlmIChrZXkgPT09IFwic3R5bGVcIikgdXBkYXRlU3R5bGUodm5vZGUuZG9tLCBvbGQsIHZhbHVlKVxuXHRcdGVsc2UgaWYgKGhhc1Byb3BlcnR5S2V5KHZub2RlLCBrZXksIG5zKSkge1xuXHRcdFx0aWYgKGtleSA9PT0gXCJ2YWx1ZVwiKSB7XG5cdFx0XHRcdC8vIE9ubHkgZG8gdGhlIGNvZXJjaW9uIGlmIHdlJ3JlIGFjdHVhbGx5IGdvaW5nIHRvIGNoZWNrIHRoZSB2YWx1ZS5cblx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8taW1wbGljaXQtY29lcmNpb24gKi9cblx0XHRcdFx0Ly9zZXR0aW5nIGlucHV0W3ZhbHVlXSB0byBzYW1lIHZhbHVlIGJ5IHR5cGluZyBvbiBmb2N1c2VkIGVsZW1lbnQgbW92ZXMgY3Vyc29yIHRvIGVuZCBpbiBDaHJvbWVcblx0XHRcdFx0aWYgKCh2bm9kZS50YWcgPT09IFwiaW5wdXRcIiB8fCB2bm9kZS50YWcgPT09IFwidGV4dGFyZWFcIikgJiYgdm5vZGUuZG9tLnZhbHVlID09PSBcIlwiICsgdmFsdWUgJiYgdm5vZGUuZG9tID09PSBhY3RpdmVFbGVtZW50KCkpIHJldHVyblxuXHRcdFx0XHQvL3NldHRpbmcgc2VsZWN0W3ZhbHVlXSB0byBzYW1lIHZhbHVlIHdoaWxlIGhhdmluZyBzZWxlY3Qgb3BlbiBibGlua3Mgc2VsZWN0IGRyb3Bkb3duIGluIENocm9tZVxuXHRcdFx0XHRpZiAodm5vZGUudGFnID09PSBcInNlbGVjdFwiICYmIG9sZCAhPT0gbnVsbCAmJiB2bm9kZS5kb20udmFsdWUgPT09IFwiXCIgKyB2YWx1ZSkgcmV0dXJuXG5cdFx0XHRcdC8vc2V0dGluZyBvcHRpb25bdmFsdWVdIHRvIHNhbWUgdmFsdWUgd2hpbGUgaGF2aW5nIHNlbGVjdCBvcGVuIGJsaW5rcyBzZWxlY3QgZHJvcGRvd24gaW4gQ2hyb21lXG5cdFx0XHRcdGlmICh2bm9kZS50YWcgPT09IFwib3B0aW9uXCIgJiYgb2xkICE9PSBudWxsICYmIHZub2RlLmRvbS52YWx1ZSA9PT0gXCJcIiArIHZhbHVlKSByZXR1cm5cblx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1pbXBsaWNpdC1jb2VyY2lvbiAqL1xuXHRcdFx0fVxuXHRcdFx0Ly8gSWYgeW91IGFzc2lnbiBhbiBpbnB1dCB0eXBlIHRoYXQgaXMgbm90IHN1cHBvcnRlZCBieSBJRSAxMSB3aXRoIGFuIGFzc2lnbm1lbnQgZXhwcmVzc2lvbiwgYW4gZXJyb3Igd2lsbCBvY2N1ci5cblx0XHRcdGlmICh2bm9kZS50YWcgPT09IFwiaW5wdXRcIiAmJiBrZXkgPT09IFwidHlwZVwiKSB2bm9kZS5kb20uc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cdFx0XHRlbHNlIHZub2RlLmRvbVtrZXldID0gdmFsdWVcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcblx0XHRcdFx0aWYgKHZhbHVlKSB2bm9kZS5kb20uc2V0QXR0cmlidXRlKGtleSwgXCJcIilcblx0XHRcdFx0ZWxzZSB2bm9kZS5kb20ucmVtb3ZlQXR0cmlidXRlKGtleSlcblx0XHRcdH1cblx0XHRcdGVsc2Ugdm5vZGUuZG9tLnNldEF0dHJpYnV0ZShrZXkgPT09IFwiY2xhc3NOYW1lXCIgPyBcImNsYXNzXCIgOiBrZXksIHZhbHVlKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiByZW1vdmVBdHRyKHZub2RlLCBrZXksIG9sZCwgbnMpIHtcblx0XHRpZiAoa2V5ID09PSBcImtleVwiIHx8IGtleSA9PT0gXCJpc1wiIHx8IG9sZCA9PSBudWxsIHx8IGlzTGlmZWN5Y2xlTWV0aG9kKGtleSkpIHJldHVyblxuXHRcdGlmIChrZXlbMF0gPT09IFwib1wiICYmIGtleVsxXSA9PT0gXCJuXCIgJiYgIWlzTGlmZWN5Y2xlTWV0aG9kKGtleSkpIHVwZGF0ZUV2ZW50KHZub2RlLCBrZXksIHVuZGVmaW5lZClcblx0XHRlbHNlIGlmIChrZXkgPT09IFwic3R5bGVcIikgdXBkYXRlU3R5bGUodm5vZGUuZG9tLCBvbGQsIG51bGwpXG5cdFx0ZWxzZSBpZiAoXG5cdFx0XHRoYXNQcm9wZXJ0eUtleSh2bm9kZSwga2V5LCBucylcblx0XHRcdCYmIGtleSAhPT0gXCJjbGFzc05hbWVcIlxuXHRcdFx0JiYgIShrZXkgPT09IFwidmFsdWVcIiAmJiAoXG5cdFx0XHRcdHZub2RlLnRhZyA9PT0gXCJvcHRpb25cIlxuXHRcdFx0XHR8fCB2bm9kZS50YWcgPT09IFwic2VsZWN0XCIgJiYgdm5vZGUuZG9tLnNlbGVjdGVkSW5kZXggPT09IC0xICYmIHZub2RlLmRvbSA9PT0gYWN0aXZlRWxlbWVudCgpXG5cdFx0XHQpKVxuXHRcdFx0JiYgISh2bm9kZS50YWcgPT09IFwiaW5wdXRcIiAmJiBrZXkgPT09IFwidHlwZVwiKVxuXHRcdCkge1xuXHRcdFx0dm5vZGUuZG9tW2tleV0gPSBudWxsXG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBuc0xhc3RJbmRleCA9IGtleS5pbmRleE9mKFwiOlwiKVxuXHRcdFx0aWYgKG5zTGFzdEluZGV4ICE9PSAtMSkga2V5ID0ga2V5LnNsaWNlKG5zTGFzdEluZGV4ICsgMSlcblx0XHRcdGlmIChvbGQgIT09IGZhbHNlKSB2bm9kZS5kb20ucmVtb3ZlQXR0cmlidXRlKGtleSA9PT0gXCJjbGFzc05hbWVcIiA/IFwiY2xhc3NcIiA6IGtleSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gc2V0TGF0ZVNlbGVjdEF0dHJzKHZub2RlLCBhdHRycykge1xuXHRcdGlmIChcInZhbHVlXCIgaW4gYXR0cnMpIHtcblx0XHRcdGlmKGF0dHJzLnZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdGlmICh2bm9kZS5kb20uc2VsZWN0ZWRJbmRleCAhPT0gLTEpIHZub2RlLmRvbS52YWx1ZSA9IG51bGxcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciBub3JtYWxpemVkID0gXCJcIiArIGF0dHJzLnZhbHVlIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8taW1wbGljaXQtY29lcmNpb25cblx0XHRcdFx0aWYgKHZub2RlLmRvbS52YWx1ZSAhPT0gbm9ybWFsaXplZCB8fCB2bm9kZS5kb20uc2VsZWN0ZWRJbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0XHR2bm9kZS5kb20udmFsdWUgPSBub3JtYWxpemVkXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKFwic2VsZWN0ZWRJbmRleFwiIGluIGF0dHJzKSBzZXRBdHRyKHZub2RlLCBcInNlbGVjdGVkSW5kZXhcIiwgbnVsbCwgYXR0cnMuc2VsZWN0ZWRJbmRleCwgdW5kZWZpbmVkKVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUF0dHJzKHZub2RlLCBvbGQsIGF0dHJzLCBucykge1xuXHRcdGlmIChhdHRycyAhPSBudWxsKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXR0cnMpIHtcblx0XHRcdFx0c2V0QXR0cih2bm9kZSwga2V5LCBvbGQgJiYgb2xkW2tleV0sIGF0dHJzW2tleV0sIG5zKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgdmFsXG5cdFx0aWYgKG9sZCAhPSBudWxsKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2xkKSB7XG5cdFx0XHRcdGlmICgoKHZhbCA9IG9sZFtrZXldKSAhPSBudWxsKSAmJiAoYXR0cnMgPT0gbnVsbCB8fCBhdHRyc1trZXldID09IG51bGwpKSB7XG5cdFx0XHRcdFx0cmVtb3ZlQXR0cih2bm9kZSwga2V5LCB2YWwsIG5zKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGlzRm9ybUF0dHJpYnV0ZSh2bm9kZSwgYXR0cikge1xuXHRcdHJldHVybiBhdHRyID09PSBcInZhbHVlXCIgfHwgYXR0ciA9PT0gXCJjaGVja2VkXCIgfHwgYXR0ciA9PT0gXCJzZWxlY3RlZEluZGV4XCIgfHwgYXR0ciA9PT0gXCJzZWxlY3RlZFwiICYmIHZub2RlLmRvbSA9PT0gYWN0aXZlRWxlbWVudCgpIHx8IHZub2RlLnRhZyA9PT0gXCJvcHRpb25cIiAmJiB2bm9kZS5kb20ucGFyZW50Tm9kZSA9PT0gJGRvYy5hY3RpdmVFbGVtZW50XG5cdH1cblx0ZnVuY3Rpb24gaXNMaWZlY3ljbGVNZXRob2QoYXR0cikge1xuXHRcdHJldHVybiBhdHRyID09PSBcIm9uaW5pdFwiIHx8IGF0dHIgPT09IFwib25jcmVhdGVcIiB8fCBhdHRyID09PSBcIm9udXBkYXRlXCIgfHwgYXR0ciA9PT0gXCJvbnJlbW92ZVwiIHx8IGF0dHIgPT09IFwib25iZWZvcmVyZW1vdmVcIiB8fCBhdHRyID09PSBcIm9uYmVmb3JldXBkYXRlXCJcblx0fVxuXHRmdW5jdGlvbiBoYXNQcm9wZXJ0eUtleSh2bm9kZSwga2V5LCBucykge1xuXHRcdC8vIEZpbHRlciBvdXQgbmFtZXNwYWNlZCBrZXlzXG5cdFx0cmV0dXJuIG5zID09PSB1bmRlZmluZWQgJiYgKFxuXHRcdFx0Ly8gSWYgaXQncyBhIGN1c3RvbSBlbGVtZW50LCBqdXN0IGtlZXAgaXQuXG5cdFx0XHR2bm9kZS50YWcuaW5kZXhPZihcIi1cIikgPiAtMSB8fCB2bm9kZS5hdHRycyAhPSBudWxsICYmIHZub2RlLmF0dHJzLmlzIHx8XG5cdFx0XHQvLyBJZiBpdCdzIGEgbm9ybWFsIGVsZW1lbnQsIGxldCdzIHRyeSB0byBhdm9pZCBhIGZldyBicm93c2VyIGJ1Z3MuXG5cdFx0XHRrZXkgIT09IFwiaHJlZlwiICYmIGtleSAhPT0gXCJsaXN0XCIgJiYga2V5ICE9PSBcImZvcm1cIiAmJiBrZXkgIT09IFwid2lkdGhcIiAmJiBrZXkgIT09IFwiaGVpZ2h0XCIvLyAmJiBrZXkgIT09IFwidHlwZVwiXG5cdFx0XHQvLyBEZWZlciB0aGUgcHJvcGVydHkgY2hlY2sgdW50aWwgKmFmdGVyKiB3ZSBjaGVjayBldmVyeXRoaW5nLlxuXHRcdCkgJiYga2V5IGluIHZub2RlLmRvbVxuXHR9XG5cblx0Ly9zdHlsZVxuXHR2YXIgdXBwZXJjYXNlUmVnZXggPSAvW0EtWl0vZ1xuXHRmdW5jdGlvbiB0b0xvd2VyQ2FzZShjYXBpdGFsKSB7IHJldHVybiBcIi1cIiArIGNhcGl0YWwudG9Mb3dlckNhc2UoKSB9XG5cdGZ1bmN0aW9uIG5vcm1hbGl6ZUtleShrZXkpIHtcblx0XHRyZXR1cm4ga2V5WzBdID09PSBcIi1cIiAmJiBrZXlbMV0gPT09IFwiLVwiID8ga2V5IDpcblx0XHRcdGtleSA9PT0gXCJjc3NGbG9hdFwiID8gXCJmbG9hdFwiIDpcblx0XHRcdFx0a2V5LnJlcGxhY2UodXBwZXJjYXNlUmVnZXgsIHRvTG93ZXJDYXNlKVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKGVsZW1lbnQsIG9sZCwgc3R5bGUpIHtcblx0XHRpZiAob2xkID09PSBzdHlsZSkge1xuXHRcdFx0Ly8gU3R5bGVzIGFyZSBlcXVpdmFsZW50LCBkbyBub3RoaW5nLlxuXHRcdH0gZWxzZSBpZiAoc3R5bGUgPT0gbnVsbCkge1xuXHRcdFx0Ly8gTmV3IHN0eWxlIGlzIG1pc3NpbmcsIGp1c3QgY2xlYXIgaXQuXG5cdFx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBcIlwiXG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygc3R5bGUgIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdC8vIE5ldyBzdHlsZSBpcyBhIHN0cmluZywgbGV0IGVuZ2luZSBkZWFsIHdpdGggcGF0Y2hpbmcuXG5cdFx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBzdHlsZVxuXHRcdH0gZWxzZSBpZiAob2xkID09IG51bGwgfHwgdHlwZW9mIG9sZCAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0Ly8gYG9sZGAgaXMgbWlzc2luZyBvciBhIHN0cmluZywgYHN0eWxlYCBpcyBhbiBvYmplY3QuXG5cdFx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBcIlwiXG5cdFx0XHQvLyBBZGQgbmV3IHN0eWxlIHByb3BlcnRpZXNcblx0XHRcdGZvciAodmFyIGtleSBpbiBzdHlsZSkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSBzdHlsZVtrZXldXG5cdFx0XHRcdGlmICh2YWx1ZSAhPSBudWxsKSBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KG5vcm1hbGl6ZUtleShrZXkpLCBTdHJpbmcodmFsdWUpKVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBCb3RoIG9sZCAmIG5ldyBhcmUgKGRpZmZlcmVudCkgb2JqZWN0cy5cblx0XHRcdC8vIFVwZGF0ZSBzdHlsZSBwcm9wZXJ0aWVzIHRoYXQgaGF2ZSBjaGFuZ2VkXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gc3R5bGUpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gc3R5bGVba2V5XVxuXHRcdFx0XHRpZiAodmFsdWUgIT0gbnVsbCAmJiAodmFsdWUgPSBTdHJpbmcodmFsdWUpKSAhPT0gU3RyaW5nKG9sZFtrZXldKSkge1xuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkobm9ybWFsaXplS2V5KGtleSksIHZhbHVlKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBSZW1vdmUgc3R5bGUgcHJvcGVydGllcyB0aGF0IG5vIGxvbmdlciBleGlzdFxuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9sZCkge1xuXHRcdFx0XHRpZiAob2xkW2tleV0gIT0gbnVsbCAmJiBzdHlsZVtrZXldID09IG51bGwpIHtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KG5vcm1hbGl6ZUtleShrZXkpKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gSGVyZSdzIGFuIGV4cGxhbmF0aW9uIG9mIGhvdyB0aGlzIHdvcmtzOlxuXHQvLyAxLiBUaGUgZXZlbnQgbmFtZXMgYXJlIGFsd2F5cyAoYnkgZGVzaWduKSBwcmVmaXhlZCBieSBgb25gLlxuXHQvLyAyLiBUaGUgRXZlbnRMaXN0ZW5lciBpbnRlcmZhY2UgYWNjZXB0cyBlaXRoZXIgYSBmdW5jdGlvbiBvciBhbiBvYmplY3Rcblx0Ly8gICAgd2l0aCBhIGBoYW5kbGVFdmVudGAgbWV0aG9kLlxuXHQvLyAzLiBUaGUgb2JqZWN0IGRvZXMgbm90IGluaGVyaXQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAsIHRvIGF2b2lkXG5cdC8vICAgIGFueSBwb3RlbnRpYWwgaW50ZXJmZXJlbmNlIHdpdGggdGhhdCAoZS5nLiBzZXR0ZXJzKS5cblx0Ly8gNC4gVGhlIGV2ZW50IG5hbWUgaXMgcmVtYXBwZWQgdG8gdGhlIGhhbmRsZXIgYmVmb3JlIGNhbGxpbmcgaXQuXG5cdC8vIDUuIEluIGZ1bmN0aW9uLWJhc2VkIGV2ZW50IGhhbmRsZXJzLCBgZXYudGFyZ2V0ID09PSB0aGlzYC4gV2UgcmVwbGljYXRlXG5cdC8vICAgIHRoYXQgYmVsb3cuXG5cdC8vIDYuIEluIGZ1bmN0aW9uLWJhc2VkIGV2ZW50IGhhbmRsZXJzLCBgcmV0dXJuIGZhbHNlYCBwcmV2ZW50cyB0aGUgZGVmYXVsdFxuXHQvLyAgICBhY3Rpb24gYW5kIHN0b3BzIGV2ZW50IHByb3BhZ2F0aW9uLiBXZSByZXBsaWNhdGUgdGhhdCBiZWxvdy5cblx0ZnVuY3Rpb24gRXZlbnREaWN0KCkge1xuXHRcdC8vIFNhdmUgdGhpcywgc28gdGhlIGN1cnJlbnQgcmVkcmF3IGlzIGNvcnJlY3RseSB0cmFja2VkLlxuXHRcdHRoaXMuXyA9IGN1cnJlbnRSZWRyYXdcblx0fVxuXHRFdmVudERpY3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXHRFdmVudERpY3QucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24gKGV2KSB7XG5cdFx0dmFyIGhhbmRsZXIgPSB0aGlzW1wib25cIiArIGV2LnR5cGVdXG5cdFx0dmFyIHJlc3VsdFxuXHRcdGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSByZXN1bHQgPSBoYW5kbGVyLmNhbGwoZXYuY3VycmVudFRhcmdldCwgZXYpXG5cdFx0ZWxzZSBpZiAodHlwZW9mIGhhbmRsZXIuaGFuZGxlRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgaGFuZGxlci5oYW5kbGVFdmVudChldilcblx0XHRpZiAodGhpcy5fICYmIGV2LnJlZHJhdyAhPT0gZmFsc2UpICgwLCB0aGlzLl8pKClcblx0XHRpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuXHRcdFx0ZXYucHJldmVudERlZmF1bHQoKVxuXHRcdFx0ZXYuc3RvcFByb3BhZ2F0aW9uKClcblx0XHR9XG5cdH1cblxuXHQvL2V2ZW50XG5cdGZ1bmN0aW9uIHVwZGF0ZUV2ZW50KHZub2RlLCBrZXksIHZhbHVlKSB7XG5cdFx0aWYgKHZub2RlLmV2ZW50cyAhPSBudWxsKSB7XG5cdFx0XHRpZiAodm5vZGUuZXZlbnRzW2tleV0gPT09IHZhbHVlKSByZXR1cm5cblx0XHRcdGlmICh2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpKSB7XG5cdFx0XHRcdGlmICh2bm9kZS5ldmVudHNba2V5XSA9PSBudWxsKSB2bm9kZS5kb20uYWRkRXZlbnRMaXN0ZW5lcihrZXkuc2xpY2UoMiksIHZub2RlLmV2ZW50cywgZmFsc2UpXG5cdFx0XHRcdHZub2RlLmV2ZW50c1trZXldID0gdmFsdWVcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICh2bm9kZS5ldmVudHNba2V5XSAhPSBudWxsKSB2bm9kZS5kb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihrZXkuc2xpY2UoMiksIHZub2RlLmV2ZW50cywgZmFsc2UpXG5cdFx0XHRcdHZub2RlLmV2ZW50c1trZXldID0gdW5kZWZpbmVkXG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpKSB7XG5cdFx0XHR2bm9kZS5ldmVudHMgPSBuZXcgRXZlbnREaWN0KClcblx0XHRcdHZub2RlLmRvbS5hZGRFdmVudExpc3RlbmVyKGtleS5zbGljZSgyKSwgdm5vZGUuZXZlbnRzLCBmYWxzZSlcblx0XHRcdHZub2RlLmV2ZW50c1trZXldID0gdmFsdWVcblx0XHR9XG5cdH1cblxuXHQvL2xpZmVjeWNsZVxuXHRmdW5jdGlvbiBpbml0TGlmZWN5Y2xlKHNvdXJjZSwgdm5vZGUsIGhvb2tzKSB7XG5cdFx0aWYgKHR5cGVvZiBzb3VyY2Uub25pbml0ID09PSBcImZ1bmN0aW9uXCIpIGNhbGxIb29rLmNhbGwoc291cmNlLm9uaW5pdCwgdm5vZGUpXG5cdFx0aWYgKHR5cGVvZiBzb3VyY2Uub25jcmVhdGUgPT09IFwiZnVuY3Rpb25cIikgaG9va3MucHVzaChjYWxsSG9vay5iaW5kKHNvdXJjZS5vbmNyZWF0ZSwgdm5vZGUpKVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUxpZmVjeWNsZShzb3VyY2UsIHZub2RlLCBob29rcykge1xuXHRcdGlmICh0eXBlb2Ygc291cmNlLm9udXBkYXRlID09PSBcImZ1bmN0aW9uXCIpIGhvb2tzLnB1c2goY2FsbEhvb2suYmluZChzb3VyY2Uub251cGRhdGUsIHZub2RlKSlcblx0fVxuXHRmdW5jdGlvbiBzaG91bGROb3RVcGRhdGUodm5vZGUsIG9sZCkge1xuXHRcdGRvIHtcblx0XHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsICYmIHR5cGVvZiB2bm9kZS5hdHRycy5vbmJlZm9yZXVwZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHZhciBmb3JjZSA9IGNhbGxIb29rLmNhbGwodm5vZGUuYXR0cnMub25iZWZvcmV1cGRhdGUsIHZub2RlLCBvbGQpXG5cdFx0XHRcdGlmIChmb3JjZSAhPT0gdW5kZWZpbmVkICYmICFmb3JjZSkgYnJlYWtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2bm9kZS5zdGF0ZS5vbmJlZm9yZXVwZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHZhciBmb3JjZSA9IGNhbGxIb29rLmNhbGwodm5vZGUuc3RhdGUub25iZWZvcmV1cGRhdGUsIHZub2RlLCBvbGQpXG5cdFx0XHRcdGlmIChmb3JjZSAhPT0gdW5kZWZpbmVkICYmICFmb3JjZSkgYnJlYWtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH0gd2hpbGUgKGZhbHNlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cblx0XHR2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0dm5vZGUuZG9tU2l6ZSA9IG9sZC5kb21TaXplXG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBvbGQuaW5zdGFuY2Vcblx0XHQvLyBPbmUgd291bGQgdGhpbmsgaGF2aW5nIHRoZSBhY3R1YWwgbGF0ZXN0IGF0dHJpYnV0ZXMgd291bGQgYmUgaWRlYWwsXG5cdFx0Ly8gYnV0IGl0IGRvZXNuJ3QgbGV0IHVzIHByb3Blcmx5IGRpZmYgYmFzZWQgb24gb3VyIGN1cnJlbnQgaW50ZXJuYWxcblx0XHQvLyByZXByZXNlbnRhdGlvbi4gV2UgaGF2ZSB0byBzYXZlIG5vdCBvbmx5IHRoZSBvbGQgRE9NIGluZm8sIGJ1dCBhbHNvXG5cdFx0Ly8gdGhlIGF0dHJpYnV0ZXMgdXNlZCB0byBjcmVhdGUgaXQsIGFzIHdlIGRpZmYgKnRoYXQqLCBub3QgYWdhaW5zdCB0aGVcblx0XHQvLyBET00gZGlyZWN0bHkgKHdpdGggYSBmZXcgZXhjZXB0aW9ucyBpbiBgc2V0QXR0cmApLiBBbmQsIG9mIGNvdXJzZSwgd2Vcblx0XHQvLyBuZWVkIHRvIHNhdmUgdGhlIGNoaWxkcmVuIGFuZCB0ZXh0IGFzIHRoZXkgYXJlIGNvbmNlcHR1YWxseSBub3Rcblx0XHQvLyB1bmxpa2Ugc3BlY2lhbCBcImF0dHJpYnV0ZXNcIiBpbnRlcm5hbGx5LlxuXHRcdHZub2RlLmF0dHJzID0gb2xkLmF0dHJzXG5cdFx0dm5vZGUuY2hpbGRyZW4gPSBvbGQuY2hpbGRyZW5cblx0XHR2bm9kZS50ZXh0ID0gb2xkLnRleHRcblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uKGRvbSwgdm5vZGVzLCByZWRyYXcpIHtcblx0XHRpZiAoIWRvbSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkVuc3VyZSB0aGUgRE9NIGVsZW1lbnQgYmVpbmcgcGFzc2VkIHRvIG0ucm91dGUvbS5tb3VudC9tLnJlbmRlciBpcyBub3QgdW5kZWZpbmVkLlwiKVxuXHRcdHZhciBob29rcyA9IFtdXG5cdFx0dmFyIGFjdGl2ZSA9IGFjdGl2ZUVsZW1lbnQoKVxuXHRcdHZhciBuYW1lc3BhY2UgPSBkb20ubmFtZXNwYWNlVVJJXG5cblx0XHQvLyBGaXJzdCB0aW1lIHJlbmRlcmluZyBpbnRvIGEgbm9kZSBjbGVhcnMgaXQgb3V0XG5cdFx0aWYgKGRvbS52bm9kZXMgPT0gbnVsbCkgZG9tLnRleHRDb250ZW50ID0gXCJcIlxuXG5cdFx0dm5vZGVzID0gVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4oQXJyYXkuaXNBcnJheSh2bm9kZXMpID8gdm5vZGVzIDogW3Zub2Rlc10pXG5cdFx0dmFyIHByZXZSZWRyYXcgPSBjdXJyZW50UmVkcmF3XG5cdFx0dHJ5IHtcblx0XHRcdGN1cnJlbnRSZWRyYXcgPSB0eXBlb2YgcmVkcmF3ID09PSBcImZ1bmN0aW9uXCIgPyByZWRyYXcgOiB1bmRlZmluZWRcblx0XHRcdHVwZGF0ZU5vZGVzKGRvbSwgZG9tLnZub2Rlcywgdm5vZGVzLCBob29rcywgbnVsbCwgbmFtZXNwYWNlID09PSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiA/IHVuZGVmaW5lZCA6IG5hbWVzcGFjZSlcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0Y3VycmVudFJlZHJhdyA9IHByZXZSZWRyYXdcblx0XHR9XG5cdFx0ZG9tLnZub2RlcyA9IHZub2Rlc1xuXHRcdC8vIGBkb2N1bWVudC5hY3RpdmVFbGVtZW50YCBjYW4gcmV0dXJuIG51bGw6IGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2ludGVyYWN0aW9uLmh0bWwjZG9tLWRvY3VtZW50LWFjdGl2ZWVsZW1lbnRcblx0XHRpZiAoYWN0aXZlICE9IG51bGwgJiYgYWN0aXZlRWxlbWVudCgpICE9PSBhY3RpdmUgJiYgdHlwZW9mIGFjdGl2ZS5mb2N1cyA9PT0gXCJmdW5jdGlvblwiKSBhY3RpdmUuZm9jdXMoKVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyBpKyspIGhvb2tzW2ldKClcblx0fVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGh0bWwpIHtcblx0aWYgKGh0bWwgPT0gbnVsbCkgaHRtbCA9IFwiXCJcblx0cmV0dXJuIFZub2RlKFwiPFwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaHRtbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG5mdW5jdGlvbiBWbm9kZSh0YWcsIGtleSwgYXR0cnMsIGNoaWxkcmVuLCB0ZXh0LCBkb20pIHtcblx0cmV0dXJuIHt0YWc6IHRhZywga2V5OiBrZXksIGF0dHJzOiBhdHRycywgY2hpbGRyZW46IGNoaWxkcmVuLCB0ZXh0OiB0ZXh0LCBkb206IGRvbSwgZG9tU2l6ZTogdW5kZWZpbmVkLCBzdGF0ZTogdW5kZWZpbmVkLCBldmVudHM6IHVuZGVmaW5lZCwgaW5zdGFuY2U6IHVuZGVmaW5lZH1cbn1cblZub2RlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG5vZGUpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHJldHVybiBWbm9kZShcIltcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKG5vZGUpLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcblx0aWYgKG5vZGUgPT0gbnVsbCB8fCB0eXBlb2Ygbm9kZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiBudWxsXG5cdGlmICh0eXBlb2Ygbm9kZSA9PT0gXCJvYmplY3RcIikgcmV0dXJuIG5vZGVcblx0cmV0dXJuIFZub2RlKFwiI1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgU3RyaW5nKG5vZGUpLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcbn1cblZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0dmFyIGNoaWxkcmVuID0gW11cblx0aWYgKGlucHV0Lmxlbmd0aCkge1xuXHRcdHZhciBpc0tleWVkID0gaW5wdXRbMF0gIT0gbnVsbCAmJiBpbnB1dFswXS5rZXkgIT0gbnVsbFxuXHRcdC8vIE5vdGU6IHRoaXMgaXMgYSAqdmVyeSogcGVyZi1zZW5zaXRpdmUgY2hlY2suXG5cdFx0Ly8gRnVuIGZhY3Q6IG1lcmdpbmcgdGhlIGxvb3AgbGlrZSB0aGlzIGlzIHNvbWVob3cgZmFzdGVyIHRoYW4gc3BsaXR0aW5nXG5cdFx0Ly8gaXQsIG5vdGljZWFibHkgc28uXG5cdFx0Zm9yICh2YXIgaSA9IDE7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKChpbnB1dFtpXSAhPSBudWxsICYmIGlucHV0W2ldLmtleSAhPSBudWxsKSAhPT0gaXNLZXllZCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiVm5vZGVzIG11c3QgZWl0aGVyIGFsd2F5cyBoYXZlIGtleXMgb3IgbmV2ZXIgaGF2ZSBrZXlzIVwiKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjaGlsZHJlbltpXSA9IFZub2RlLm5vcm1hbGl6ZShpbnB1dFtpXSlcblx0XHR9XG5cdH1cblx0cmV0dXJuIGNoaWxkcmVuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gVm5vZGVcbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBQcm9taXNlUG9seWZpbGwgPSByZXF1aXJlKFwiLi9wcm9taXNlL3Byb21pc2VcIilcbnZhciBtb3VudFJlZHJhdyA9IHJlcXVpcmUoXCIuL21vdW50LXJlZHJhd1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3JlcXVlc3QvcmVxdWVzdFwiKSh3aW5kb3csIFByb21pc2VQb2x5ZmlsbCwgbW91bnRSZWRyYXcucmVkcmF3KVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGJ1aWxkUGF0aG5hbWUgPSByZXF1aXJlKFwiLi4vcGF0aG5hbWUvYnVpbGRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkd2luZG93LCBQcm9taXNlLCBvbmNvbXBsZXRpb24pIHtcblx0dmFyIGNhbGxiYWNrQ291bnQgPSAwXG5cblx0ZnVuY3Rpb24gUHJvbWlzZVByb3h5KGV4ZWN1dG9yKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGV4ZWN1dG9yKVxuXHR9XG5cblx0Ly8gSW4gY2FzZSB0aGUgZ2xvYmFsIFByb21pc2UgaXMgc29tZSB1c2VybGFuZCBsaWJyYXJ5J3Mgd2hlcmUgdGhleSByZWx5IG9uXG5cdC8vIGBmb28gaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yYCwgYHRoaXMuY29uc3RydWN0b3IucmVzb2x2ZSh2YWx1ZSlgLCBvclxuXHQvLyBzaW1pbGFyLiBMZXQncyAqbm90KiBicmVhayB0aGVtLlxuXHRQcm9taXNlUHJveHkucHJvdG90eXBlID0gUHJvbWlzZS5wcm90b3R5cGVcblx0UHJvbWlzZVByb3h5Ll9fcHJvdG9fXyA9IFByb21pc2UgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b1xuXG5cdGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KGZhY3RvcnkpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24odXJsLCBhcmdzKSB7XG5cdFx0XHRpZiAodHlwZW9mIHVybCAhPT0gXCJzdHJpbmdcIikgeyBhcmdzID0gdXJsOyB1cmwgPSB1cmwudXJsIH1cblx0XHRcdGVsc2UgaWYgKGFyZ3MgPT0gbnVsbCkgYXJncyA9IHt9XG5cdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0XHRmYWN0b3J5KGJ1aWxkUGF0aG5hbWUodXJsLCBhcmdzLnBhcmFtcyksIGFyZ3MsIGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBhcmdzLnR5cGUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0YVtpXSA9IG5ldyBhcmdzLnR5cGUoZGF0YVtpXSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSBkYXRhID0gbmV3IGFyZ3MudHlwZShkYXRhKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXNvbHZlKGRhdGEpXG5cdFx0XHRcdH0sIHJlamVjdClcblx0XHRcdH0pXG5cdFx0XHRpZiAoYXJncy5iYWNrZ3JvdW5kID09PSB0cnVlKSByZXR1cm4gcHJvbWlzZVxuXHRcdFx0dmFyIGNvdW50ID0gMFxuXHRcdFx0ZnVuY3Rpb24gY29tcGxldGUoKSB7XG5cdFx0XHRcdGlmICgtLWNvdW50ID09PSAwICYmIHR5cGVvZiBvbmNvbXBsZXRpb24gPT09IFwiZnVuY3Rpb25cIikgb25jb21wbGV0aW9uKClcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHdyYXAocHJvbWlzZSlcblxuXHRcdFx0ZnVuY3Rpb24gd3JhcChwcm9taXNlKSB7XG5cdFx0XHRcdHZhciB0aGVuID0gcHJvbWlzZS50aGVuXG5cdFx0XHRcdC8vIFNldCB0aGUgY29uc3RydWN0b3IsIHNvIGVuZ2luZXMga25vdyB0byBub3QgYXdhaXQgb3IgcmVzb2x2ZVxuXHRcdFx0XHQvLyB0aGlzIGFzIGEgbmF0aXZlIHByb21pc2UuIEF0IHRoZSB0aW1lIG9mIHdyaXRpbmcsIHRoaXMgaXNcblx0XHRcdFx0Ly8gb25seSBuZWNlc3NhcnkgZm9yIFY4LCBidXQgdGhlaXIgYmVoYXZpb3IgaXMgdGhlIGNvcnJlY3Rcblx0XHRcdFx0Ly8gYmVoYXZpb3IgcGVyIHNwZWMuIFNlZSB0aGlzIHNwZWMgaXNzdWUgZm9yIG1vcmUgZGV0YWlsczpcblx0XHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvZWNtYTI2Mi9pc3N1ZXMvMTU3Ny4gQWxzbywgc2VlIHRoZVxuXHRcdFx0XHQvLyBjb3JyZXNwb25kaW5nIGNvbW1lbnQgaW4gYHJlcXVlc3QvdGVzdHMvdGVzdC1yZXF1ZXN0LmpzYCBmb3Jcblx0XHRcdFx0Ly8gYSBiaXQgbW9yZSBiYWNrZ3JvdW5kIG9uIHRoZSBpc3N1ZSBhdCBoYW5kLlxuXHRcdFx0XHRwcm9taXNlLmNvbnN0cnVjdG9yID0gUHJvbWlzZVByb3h5XG5cdFx0XHRcdHByb21pc2UudGhlbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGNvdW50Kytcblx0XHRcdFx0XHR2YXIgbmV4dCA9IHRoZW4uYXBwbHkocHJvbWlzZSwgYXJndW1lbnRzKVxuXHRcdFx0XHRcdG5leHQudGhlbihjb21wbGV0ZSwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdFx0Y29tcGxldGUoKVxuXHRcdFx0XHRcdFx0aWYgKGNvdW50ID09PSAwKSB0aHJvdyBlXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRyZXR1cm4gd3JhcChuZXh0KVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBwcm9taXNlXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGFzSGVhZGVyKGFyZ3MsIG5hbWUpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gYXJncy5oZWFkZXJzKSB7XG5cdFx0XHRpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChhcmdzLmhlYWRlcnMsIGtleSkgJiYgbmFtZS50ZXN0KGtleSkpIHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRyZXF1ZXN0OiBtYWtlUmVxdWVzdChmdW5jdGlvbih1cmwsIGFyZ3MsIHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIG1ldGhvZCA9IGFyZ3MubWV0aG9kICE9IG51bGwgPyBhcmdzLm1ldGhvZC50b1VwcGVyQ2FzZSgpIDogXCJHRVRcIlxuXHRcdFx0dmFyIGJvZHkgPSBhcmdzLmJvZHlcblx0XHRcdHZhciBhc3N1bWVKU09OID0gKGFyZ3Muc2VyaWFsaXplID09IG51bGwgfHwgYXJncy5zZXJpYWxpemUgPT09IEpTT04uc2VyaWFsaXplKSAmJiAhKGJvZHkgaW5zdGFuY2VvZiAkd2luZG93LkZvcm1EYXRhKVxuXHRcdFx0dmFyIHJlc3BvbnNlVHlwZSA9IGFyZ3MucmVzcG9uc2VUeXBlIHx8ICh0eXBlb2YgYXJncy5leHRyYWN0ID09PSBcImZ1bmN0aW9uXCIgPyBcIlwiIDogXCJqc29uXCIpXG5cblx0XHRcdHZhciB4aHIgPSBuZXcgJHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpLCBhYm9ydGVkID0gZmFsc2Vcblx0XHRcdHZhciBvcmlnaW5hbCA9IHhociwgcmVwbGFjZWRBYm9ydFxuXHRcdFx0dmFyIGFib3J0ID0geGhyLmFib3J0XG5cblx0XHRcdHhoci5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRhYm9ydGVkID0gdHJ1ZVxuXHRcdFx0XHRhYm9ydC5jYWxsKHRoaXMpXG5cdFx0XHR9XG5cblx0XHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsLCBhcmdzLmFzeW5jICE9PSBmYWxzZSwgdHlwZW9mIGFyZ3MudXNlciA9PT0gXCJzdHJpbmdcIiA/IGFyZ3MudXNlciA6IHVuZGVmaW5lZCwgdHlwZW9mIGFyZ3MucGFzc3dvcmQgPT09IFwic3RyaW5nXCIgPyBhcmdzLnBhc3N3b3JkIDogdW5kZWZpbmVkKVxuXG5cdFx0XHRpZiAoYXNzdW1lSlNPTiAmJiBib2R5ICE9IG51bGwgJiYgIWhhc0hlYWRlcihhcmdzLCAvXmNvbnRlbnQtdHlwZSQvaSkpIHtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpXG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIGFyZ3MuZGVzZXJpYWxpemUgIT09IFwiZnVuY3Rpb25cIiAmJiAhaGFzSGVhZGVyKGFyZ3MsIC9eYWNjZXB0JC9pKSkge1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvKlwiKVxuXHRcdFx0fVxuXHRcdFx0aWYgKGFyZ3Mud2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gYXJncy53aXRoQ3JlZGVudGlhbHNcblx0XHRcdGlmIChhcmdzLnRpbWVvdXQpIHhoci50aW1lb3V0ID0gYXJncy50aW1lb3V0XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlXG5cblx0XHRcdGZvciAodmFyIGtleSBpbiBhcmdzLmhlYWRlcnMpIHtcblx0XHRcdFx0aWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoYXJncy5oZWFkZXJzLCBrZXkpKSB7XG5cdFx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBhcmdzLmhlYWRlcnNba2V5XSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oZXYpIHtcblx0XHRcdFx0Ly8gRG9uJ3QgdGhyb3cgZXJyb3JzIG9uIHhoci5hYm9ydCgpLlxuXHRcdFx0XHRpZiAoYWJvcnRlZCkgcmV0dXJuXG5cblx0XHRcdFx0aWYgKGV2LnRhcmdldC5yZWFkeVN0YXRlID09PSA0KSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gKGV2LnRhcmdldC5zdGF0dXMgPj0gMjAwICYmIGV2LnRhcmdldC5zdGF0dXMgPCAzMDApIHx8IGV2LnRhcmdldC5zdGF0dXMgPT09IDMwNCB8fCAoL15maWxlOlxcL1xcLy9pKS50ZXN0KHVybClcblx0XHRcdFx0XHRcdC8vIFdoZW4gdGhlIHJlc3BvbnNlIHR5cGUgaXNuJ3QgXCJcIiBvciBcInRleHRcIixcblx0XHRcdFx0XHRcdC8vIGB4aHIucmVzcG9uc2VUZXh0YCBpcyB0aGUgd3JvbmcgdGhpbmcgdG8gdXNlLlxuXHRcdFx0XHRcdFx0Ly8gQnJvd3NlcnMgZG8gdGhlIHJpZ2h0IHRoaW5nIGFuZCB0aHJvdyBoZXJlLCBhbmQgd2Vcblx0XHRcdFx0XHRcdC8vIHNob3VsZCBob25vciB0aGF0IGFuZCBkbyB0aGUgcmlnaHQgdGhpbmcgYnlcblx0XHRcdFx0XHRcdC8vIHByZWZlcnJpbmcgYHhoci5yZXNwb25zZWAgd2hlcmUgcG9zc2libGUvcHJhY3RpY2FsLlxuXHRcdFx0XHRcdFx0dmFyIHJlc3BvbnNlID0gZXYudGFyZ2V0LnJlc3BvbnNlLCBtZXNzYWdlXG5cblx0XHRcdFx0XHRcdGlmIChyZXNwb25zZVR5cGUgPT09IFwianNvblwiKSB7XG5cdFx0XHRcdFx0XHRcdC8vIEZvciBJRSBhbmQgRWRnZSwgd2hpY2ggZG9uJ3QgaW1wbGVtZW50XG5cdFx0XHRcdFx0XHRcdC8vIGByZXNwb25zZVR5cGU6IFwianNvblwiYC5cblx0XHRcdFx0XHRcdFx0aWYgKCFldi50YXJnZXQucmVzcG9uc2VUeXBlICYmIHR5cGVvZiBhcmdzLmV4dHJhY3QgIT09IFwiZnVuY3Rpb25cIikgcmVzcG9uc2UgPSBKU09OLnBhcnNlKGV2LnRhcmdldC5yZXNwb25zZVRleHQpXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSBcInRleHRcIikge1xuXHRcdFx0XHRcdFx0XHQvLyBPbmx5IHVzZSB0aGlzIGRlZmF1bHQgaWYgaXQncyB0ZXh0LiBJZiBhIHBhcnNlZFxuXHRcdFx0XHRcdFx0XHQvLyBkb2N1bWVudCBpcyBuZWVkZWQgb24gb2xkIElFIGFuZCBmcmllbmRzIChhbGxcblx0XHRcdFx0XHRcdFx0Ly8gdW5zdXBwb3J0ZWQpLCB0aGUgdXNlciBzaG91bGQgdXNlIGEgY3VzdG9tXG5cdFx0XHRcdFx0XHRcdC8vIGBjb25maWdgIGluc3RlYWQuIFRoZXkncmUgYWxyZWFkeSB1c2luZyB0aGlzIGF0XG5cdFx0XHRcdFx0XHRcdC8vIHRoZWlyIG93biByaXNrLlxuXHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UgPT0gbnVsbCkgcmVzcG9uc2UgPSBldi50YXJnZXQucmVzcG9uc2VUZXh0XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgYXJncy5leHRyYWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBhcmdzLmV4dHJhY3QoZXYudGFyZ2V0LCBhcmdzKVxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzID0gdHJ1ZVxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgYXJncy5kZXNlcmlhbGl6ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gYXJncy5kZXNlcmlhbGl6ZShyZXNwb25zZSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChzdWNjZXNzKSByZXNvbHZlKHJlc3BvbnNlKVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7IG1lc3NhZ2UgPSBldi50YXJnZXQucmVzcG9uc2VUZXh0IH1cblx0XHRcdFx0XHRcdFx0Y2F0Y2ggKGUpIHsgbWVzc2FnZSA9IHJlc3BvbnNlIH1cblx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpXG5cdFx0XHRcdFx0XHRcdGVycm9yLmNvZGUgPSBldi50YXJnZXQuc3RhdHVzXG5cdFx0XHRcdFx0XHRcdGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2Vcblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGUpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2YgYXJncy5jb25maWcgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHR4aHIgPSBhcmdzLmNvbmZpZyh4aHIsIGFyZ3MsIHVybCkgfHwgeGhyXG5cblx0XHRcdFx0Ly8gUHJvcGFnYXRlIHRoZSBgYWJvcnRgIHRvIGFueSByZXBsYWNlbWVudCBYSFIgYXMgd2VsbC5cblx0XHRcdFx0aWYgKHhociAhPT0gb3JpZ2luYWwpIHtcblx0XHRcdFx0XHRyZXBsYWNlZEFib3J0ID0geGhyLmFib3J0XG5cdFx0XHRcdFx0eGhyLmFib3J0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRhYm9ydGVkID0gdHJ1ZVxuXHRcdFx0XHRcdFx0cmVwbGFjZWRBYm9ydC5jYWxsKHRoaXMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChib2R5ID09IG51bGwpIHhoci5zZW5kKClcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBhcmdzLnNlcmlhbGl6ZSA9PT0gXCJmdW5jdGlvblwiKSB4aHIuc2VuZChhcmdzLnNlcmlhbGl6ZShib2R5KSlcblx0XHRcdGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiAkd2luZG93LkZvcm1EYXRhKSB4aHIuc2VuZChib2R5KVxuXHRcdFx0ZWxzZSB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShib2R5KSlcblx0XHR9KSxcblx0XHRqc29ucDogbWFrZVJlcXVlc3QoZnVuY3Rpb24odXJsLCBhcmdzLCByZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciBjYWxsYmFja05hbWUgPSBhcmdzLmNhbGxiYWNrTmFtZSB8fCBcIl9taXRocmlsX1wiICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMWUxNikgKyBcIl9cIiArIGNhbGxiYWNrQ291bnQrK1xuXHRcdFx0dmFyIHNjcmlwdCA9ICR3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxuXHRcdFx0JHdpbmRvd1tjYWxsYmFja05hbWVdID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRkZWxldGUgJHdpbmRvd1tjYWxsYmFja05hbWVdXG5cdFx0XHRcdHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdClcblx0XHRcdFx0cmVzb2x2ZShkYXRhKVxuXHRcdFx0fVxuXHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGVsZXRlICR3aW5kb3dbY2FsbGJhY2tOYW1lXVxuXHRcdFx0XHRzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpXG5cdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJKU09OUCByZXF1ZXN0IGZhaWxlZFwiKSlcblx0XHRcdH1cblx0XHRcdHNjcmlwdC5zcmMgPSB1cmwgKyAodXJsLmluZGV4T2YoXCI/XCIpIDwgMCA/IFwiP1wiIDogXCImXCIpICtcblx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3MuY2FsbGJhY2tLZXkgfHwgXCJjYWxsYmFja1wiKSArIFwiPVwiICtcblx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KGNhbGxiYWNrTmFtZSlcblx0XHRcdCR3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKHNjcmlwdClcblx0XHR9KSxcblx0fVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIG1vdW50UmVkcmF3ID0gcmVxdWlyZShcIi4vbW91bnQtcmVkcmF3XCIpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vYXBpL3JvdXRlclwiKSh3aW5kb3csIG1vdW50UmVkcmF3KVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtaXRocmlsXzEgPSByZXF1aXJlKFwiLi4vbWl0aHJpbFwiKTtcbmNvbnN0IExheW91dGVyXzEgPSByZXF1aXJlKFwiLi9MYXlvdXRlclwiKTtcbmNsYXNzIExheW91dCB7XG4gICAgZ2V0Q29tcG9uZW50cyhub2RlKSB7XG4gICAgICAgIHJldHVybiAhQXJyYXkuaXNBcnJheShub2RlLmF0dHJzLmNvbnRlbnQpID8gbm9kZS5hdHRycy5jb250ZW50IDpcbiAgICAgICAgICAgIG5vZGUuYXR0cnMuY29udGVudC5tYXAoKGMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYy5jb21wQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgYy5hdHRycy5yb3V0ZSA9IG5vZGUuYXR0cnMucm91dGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtaXRocmlsXzEubShjLmNvbXBDbGFzcywgYy5hdHRycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0Q1NTKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgIH1cbiAgICBub3JtYWxpemVDb250ZW50KGNvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnRzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIFttaXRocmlsXzEubSgnLmhzLWxlYWYnLCBtaXRocmlsXzEubS50cnVzdChjb21wb25lbnRzKSldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRzLm1hcCgoY29tcCkgPT4gKGNvbXAgaW5zdGFuY2VvZiBMYXlvdXQpID8gY29tcCA6IG1pdGhyaWxfMS5tKExheW91dCwgeyBjb250ZW50OiBjb21wIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2NvbXBvbmVudHNdO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMubm9ybWFsaXplQ29udGVudCh0aGlzLmdldENvbXBvbmVudHMobm9kZSkpO1xuICAgICAgICBsZXQgY3NzID0gTGF5b3V0ZXJfMS5MYXlvdXRlci5jcmVhdGVMYXlvdXQobm9kZS5hdHRycywgY29udGVudCk7XG4gICAgICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgICAgICAgc3R5bGU6IG5vZGUuc3R5bGUsXG4gICAgICAgICAgICByb3V0ZTogbm9kZS5hdHRycy5yb3V0ZSxcbiAgICAgICAgICAgIG9uY2xpY2s6IG5vZGUuYXR0cnMub25jbGlja1xuICAgICAgICB9O1xuICAgICAgICBub2RlLmF0dHJzLnJvdXRlID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAobm9kZS5hdHRycy5ocmVmKSB7XG4gICAgICAgICAgICBhdHRycy5ocmVmID0gbm9kZS5hdHRycy5ocmVmO1xuICAgICAgICAgICAgYXR0cnMub25jcmVhdGUgPSBtaXRocmlsXzEubS5yb3V0ZS5saW5rO1xuICAgICAgICAgICAgYXR0cnMub251cGRhdGUgPSBtaXRocmlsXzEubS5yb3V0ZS5saW5rO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaXRocmlsXzEubShgLmhzLWxheW91dCAke2Nzc30gJHt0aGlzLmdldENTUyhub2RlKX1gLCBhdHRycywgY29udGVudC5tYXAoKGMpID0+IGMpKTtcbiAgICB9XG59XG5leHBvcnRzLkxheW91dCA9IExheW91dDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVRHRjViM1YwTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dmMzSmpMM1pwWlhjdlRHRjViM1YwTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJhVUpCTEhkRFFVRnpRenRCUVVOMFF5eDVRMEZCYzBNN1FVRjVRblJETEUxQlFXRXNUVUZCVFR0SlFXOUNUQ3hoUVVGaExFTkJRVU1zU1VGQlZUdFJRVU01UWl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xbEJRek5FTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVc3NSVUZCUlN4RlFVRkZPMmRDUVVNM1FpeEpRVUZKTEVOQlFVTXNRMEZCUXl4VFFVRlRMRVZCUVVVN2IwSkJRMklzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTTdiMEpCUTJwRExFOUJRVThzVjBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4VFFVRlRMRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzJsQ1FVTnNRenR4UWtGQlRUdHZRa0ZEU0N4UFFVRlBMRU5CUVVNc1EwRkJRenRwUWtGRFdqdFpRVU5NTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFnc1EwRkJRenRKUVZGVExFMUJRVTBzUTBGQlF5eEpRVUZWTzFGQlEzWkNMRTlCUVU4c1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVsQlFVa3NSVUZCUlN4RFFVRkRPMGxCUTJoRExFTkJRVU03U1VGSFR5eG5Ra0ZCWjBJc1EwRkJReXhWUVVFMlF6dFJRVU5zUlN4SlFVRkpMRTlCUVU4c1ZVRkJWU3hMUVVGTExGRkJRVkVzUlVGQlJUdFpRVU5vUXl4UFFVRlBMRU5CUVVNc1YwRkJReXhEUVVGRExGVkJRVlVzUlVGQlJTeFhRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFRRVU12UXp0UlFVTkVMRWxCUVVrc1ZVRkJWU3hEUVVGRExFMUJRVTBzUjBGQlF5eERRVUZETEVWQlFVVTdXVUZEY2tJc1QwRkJUeXhWUVVGVkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCZVVJc1JVRkJVU3hGUVVGRkxFTkJRMnhFTEVOQlFVTXNTVUZCU1N4WlFVRlpMRTFCUVUwc1EwRkJReXhEUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRmRCUVVNc1EwRkJReXhOUVVGTkxFVkJRVVVzUlVGQlF5eFBRVUZQTEVWQlFVTXNTVUZCU1N4RlFVRkRMRU5CUVVNc1EwRkRha1VzUTBGQlF6dFRRVU5NTzFGQlJVUXNUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRE8wbEJRM2hDTEVOQlFVTTdTVUZ4UWtRc1NVRkJTU3hEUVVGRExFbEJRVlU3VVVGRFdDeE5RVUZOTEU5QlFVOHNSMEZCUnl4SlFVRkpMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNTVUZCU1N4RFFVRkRMR0ZCUVdFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEyaEZMRWxCUVVrc1IwRkJSeXhIUVVGSExHMUNRVUZSTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdVVUZEY2tRc1RVRkJUU3hMUVVGTExFZEJRVTg3V1VGRFpDeExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzN1dVRkRha0lzUzBGQlN5eEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTenRaUVVOMlFpeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUE8xTkJRemxDTEVOQlFVTTdVVUZEUml4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eFRRVUZUTEVOQlFVTTdVVUZETjBJc1NVRkJTU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NSVUZCUlR0WlFVTnFRaXhMUVVGTExFTkJRVU1zU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRE8xbEJRemRDTEV0QlFVc3NRMEZCUXl4UlFVRlJMRWRCUVVjc1YwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTTdXVUZET1VJc1MwRkJTeXhEUVVGRExGRkJRVkVzUjBGQlJ5eFhRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJRenRUUVVOcVF6dFJRVU5FTEU5QlFVOHNWMEZCUXl4RFFVRkRMR05CUVdNc1IwRkJSeXhKUVVGSkxFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTExFVkJRVVVzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVzc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTjZSaXhEUVVGRE8wTkJRMG83UVVFelJrUXNkMEpCTWtaREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFRva2Vuc18xID0gcmVxdWlyZShcIi4vVG9rZW5zXCIpO1xuY2xhc3MgTGF5b3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZWFEZXNjKSB7XG4gICAgICAgIHRoaXMuYXJlYURlc2MgPSBhcmVhRGVzYztcbiAgICAgICAgdGhpcy5zcGFjaW5nID0gMDtcbiAgICB9XG4gICAgc3RhdGljIHRyYW5zbGF0ZShwYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKCcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zLm1hcCgocGFyYW0pID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtLmVuZHNXaXRoKCdweCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUb2tlbnNfMS5weChwYXJzZUludChwYXJhbSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGFyYW0uZW5kc1dpdGgoJyUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVG9rZW5zXzEucGMocGFyc2VJbnQocGFyYW0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtLnRvTG93ZXJDYXNlKCkgPT09ICdmaWxsJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVG9rZW5zXzEuRklMTDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgcmVnaXN0ZXIoa2V5d29yZCwgc3R5bGUpIHtcbiAgICAgICAgTGF5b3V0ZXIubGF5b3V0U3R5bGVzW2tleXdvcmRdID0gc3R5bGU7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGVMYXlvdXQoYXR0cnMsIGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGNzcyA9ICcnO1xuICAgICAgICBPYmplY3Qua2V5cyhMYXlvdXRlci5sYXlvdXRTdHlsZXMpLnNvbWUoa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChhdHRyc1trZXldKSB7XG4gICAgICAgICAgICAgICAgY3NzID0gbmV3IExheW91dGVyLmxheW91dFN0eWxlc1trZXldKExheW91dGVyLnRyYW5zbGF0ZShhdHRyc1trZXldKSkuZ2V0U3R5bGVzKGNvbXBvbmVudHMpO1xuICAgICAgICAgICAgICAgIGF0dHJzW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY3NzO1xuICAgIH1cbiAgICA7XG59XG5leHBvcnRzLkxheW91dGVyID0gTGF5b3V0ZXI7XG5MYXlvdXRlci5sYXlvdXRTdHlsZXMgPSB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVRHRjViM1YwWlhJdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOXpjbU12ZG1sbGR5OU1ZWGx2ZFhSbGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVZsQkxIRkRRVUYzUXp0QlFYbENlRU1zVFVGQmMwSXNVVUZCVVR0SlFYbEZNVUlzV1VGQmJVSXNVVUZCYzBJN1VVRkJkRUlzWVVGQlVTeEhRVUZTTEZGQlFWRXNRMEZCWXp0UlFWSjZReXhaUVVGUExFZEJRVWNzUTBGQlF5eERRVUZETzBsQlVXZERMRU5CUVVNN1NVRjZSSEpETEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1RVRkJkMEk3VVVGRE4wTXNTVUZCU1N4TlFVRk5MRU5CUVVNc1RVRkJUU3hMUVVGTExFTkJRVU1zUlVGQlJUdFpRVUZGTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03VTBGQlJUdFJRVU0zUXl4UFFVRlBMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eExRVUZuUWl4RlFVRkZMRVZCUVVVN1dVRkRia01zU1VGQlNTeFBRVUZQTEV0QlFVc3NTMEZCU3l4UlFVRlJMRVZCUVVVN1owSkJRek5DTEVsQlFVa3NTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJUdHZRa0ZCUlN4UFFVRlBMRmRCUVVVc1EwRkJReXhSUVVGUkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0cFFrRkJSVHRuUWtGRGVrUXNTVUZCU1N4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTzI5Q1FVRkZMRTlCUVU4c1YwRkJSU3hEUVVGRExGRkJRVkVzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRPMmxDUVVGRk8yZENRVU40UkN4SlFVRkpMRXRCUVVzc1EwRkJReXhYUVVGWExFVkJRVVVzUzBGQlJ5eE5RVUZOTEVWQlFVVTdiMEpCUVVVc1QwRkJUeXhoUVVGSkxFTkJRVU03YVVKQlFVTTdZVUZEY0VRN2FVSkJRVTA3WjBKQlEwZ3NUMEZCVHl4TFFVRkxMRU5CUVVNN1lVRkRhRUk3VVVGRFRDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNN1NVRlhUU3hOUVVGTkxFTkJRVU1zVVVGQlVTeERRVUZETEU5QlFXTXNSVUZCUlN4TFFVRnhRanRSUVVWNFJDeFJRVUZSTEVOQlFVTXNXVUZCV1N4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFdEJRVXNzUTBGQlF6dEpRVU16UXl4RFFVRkRPMGxCVlUwc1RVRkJUU3hEUVVGRExGbEJRVmtzUTBGQlF5eExRVUZUTEVWQlFVVXNWVUZCZFVJN1VVRkRla1FzU1VGQlNTeEhRVUZITEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUTJJc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTzFsQlF6RkRMRWxCUVVrc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTzJkQ1FVTmFMRWRCUVVjc1IwRkJSeXhKUVVGSkxGRkJRVkVzUTBGQlF5eFpRVUZaTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1VVRkJVU3hEUVVGRExGTkJRVk1zUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExGTkJRVk1zUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0blFrRkRNMFlzUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRk5CUVZNc1EwRkJRenRuUWtGRGRrSXNUMEZCVHl4SlFVRkpMRU5CUVVNN1lVRkRaanRaUVVORUxFOUJRVThzUzBGQlN5eERRVUZETzFGQlEycENMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzVDBGQlR5eEhRVUZITEVOQlFVTTdTVUZEWml4RFFVRkRPMGxCVnpSRExFTkJRVU03TzBGQmVrVnNSQ3cwUWtFd1JrTTdRVUZ5UmxVc2NVSkJRVmtzUjBGQmRVSXNSVUZCUlN4RFFVRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBMYXlvdXRlcl8xID0gcmVxdWlyZShcIi4vTGF5b3V0ZXJcIik7XG5jb25zdCBUb2tlbnNfMSA9IHJlcXVpcmUoXCIuL1Rva2Vuc1wiKTtcbmV4cG9ydHMuUGlsbGFyTGF5b3V0cyA9IFtcbiAgICAnY29sdW1ucycsICdyb3dzJ1xuXTtcbmNvbnN0IGNQYXJhbXMgPSB7XG4gICAgY29sdW1uczoge1xuICAgICAgICBjc3NDbGFzczogJy5ocy1jb2x1bW4tbGF5b3V0JyxcbiAgICAgICAgZmllbGRzOiBbJ3RvcCcsICdib3R0b20nLCAnbGVmdCcsICdyaWdodCcsICdoZWlnaHQnLCAnd2lkdGgnXVxuICAgIH0sXG4gICAgcm93czoge1xuICAgICAgICBjc3NDbGFzczogJy5ocy1yb3ctbGF5b3V0JyxcbiAgICAgICAgZmllbGRzOiBbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ2JvdHRvbScsICd3aWR0aCcsICdoZWlnaHQnXVxuICAgIH1cbn07XG5jbGFzcyBQaWxsYXJMYXlvdXRlciBleHRlbmRzIExheW91dGVyXzEuTGF5b3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcywgYXJlYURlc2MpIHtcbiAgICAgICAgc3VwZXIoYXJlYURlc2MpO1xuICAgICAgICB0aGlzLmFyZWFEZXNjID0gYXJlYURlc2M7XG4gICAgICAgIHRoaXMuZmllbGRzID0gcGFyYW1zLmZpZWxkcztcbiAgICAgICAgdGhpcy5jc3NDbGFzcyA9IHBhcmFtcy5jc3NDbGFzcztcbiAgICAgICAgbGV0IG4gPSBhcmVhRGVzYy5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgZmlyc3QgPSAwO1xuICAgICAgICBsZXQgbGFzdCA9IDA7XG4gICAgICAgIHRoaXMudW5pdCA9IGFyZWFEZXNjLnNvbWUoKGFyZWEpID0+IChhcmVhIGluc3RhbmNlb2YgVG9rZW5zXzEuUGl4ZWxUb2tlbikpID9cbiAgICAgICAgICAgIHRoaXMudW5pdFBpeGVsIDogdGhpcy51bml0UGVyY2VudDtcbiAgICAgICAgYXJlYURlc2Muc29tZSgoYXJlYSwgaSkgPT4gKChhcmVhRGVzY1tpXSBpbnN0YW5jZW9mIFRva2Vuc18xLkRlZmluZWRUb2tlbikgPyArK2ZpcnN0IDwgMCA6IHRydWUpKTtcbiAgICAgICAgYXJlYURlc2Muc29tZSgoYXJlYSwgaSkgPT4gKChhcmVhRGVzY1tuIC0gaV0gaW5zdGFuY2VvZiBUb2tlbnNfMS5EZWZpbmVkVG9rZW4pID8gKytsYXN0IDwgMCA6IHRydWUpKTtcbiAgICAgICAgdGhpcy5maXJzdEZpeGVkID0gZmlyc3Q7XG4gICAgICAgIHRoaXMubGFzdEZpeGVkID0gTWF0aC5taW4obGFzdCwgYXJlYURlc2MubGVuZ3RoIC0gZmlyc3QpO1xuICAgIH1cbiAgICA7XG4gICAgZ2V0U2l6ZXMobnVtKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5maXJzdEZpeGVkO1xuICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5sYXN0Rml4ZWQ7XG4gICAgICAgIGNvbnN0IGRlc2MgPSB0aGlzLmFyZWFEZXNjO1xuICAgICAgICBjb25zdCBsZW4gPSBkZXNjLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIFsuLi5BcnJheShudW0pLmtleXMoKV0ubWFwKChpKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IG51bGw7XG4gICAgICAgICAgICBsZXQgdCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoaSA+IG51bSAtIDEgLSBsYXN0KSB7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IGRlc2NbbGVuIC0gKG51bSAtIGkpXS5nZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgdCA9ICdlbmQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaSA8IGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IGRlc2NbaV0uZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgICAgIHQgPSAnc3RhcnQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobGVuID4gMCAmJiBsZW4gPT09IGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IGRlc2NbbGVuIC0gMV0uZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgICAgIHQgPSAnc3RhcnQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgc2l6ZTogc2l6ZSwgY29kZTogdCwgZmllbGRzOiB7fSB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdW5pdFBlcmNlbnQobnVtKSB7XG4gICAgICAgIGxldCBmID0gdGhpcy5maWVsZHM7XG4gICAgICAgIGxldCBtYXggPSAxMDAuMDtcbiAgICAgICAgbGV0IHN0eWxlcyA9IHRoaXMuZ2V0U2l6ZXMobnVtKTtcbiAgICAgICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4geyBpZiAoc3R5bGUuc2l6ZSkge1xuICAgICAgICAgICAgbWF4ID0gbWF4IC0gc3R5bGUuc2l6ZTtcbiAgICAgICAgICAgIG51bS0tO1xuICAgICAgICB9IH0pO1xuICAgICAgICBsZXQgZGVmRGltID0gbWF4IC8gbnVtO1xuICAgICAgICBmdW5jdGlvbiBwYXNzKHN0eWxlcywgaXgwLCBpeDEsIGJyZWFrQ29uZCkge1xuICAgICAgICAgICAgbGV0IHN1bURpbSA9IDA7XG4gICAgICAgICAgICBzdHlsZXMuc29tZShzdHlsZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNpemUgPSBzdHlsZS5zaXplIHx8IGRlZkRpbTtcbiAgICAgICAgICAgICAgICBpZiAoYnJlYWtDb25kKHN0eWxlLmNvZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbaXgwXSA9IHN1bURpbSArICclJztcbiAgICAgICAgICAgICAgICBzdW1EaW0gKz0gc2l6ZTtcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbaXgxXSA9ICgxMDAgLSBzdW1EaW0pICsgJyUnO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzVdXSA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBwYXNzKHN0eWxlcywgZlsyXSwgZlszXSwgKGUpID0+IGUgPT09ICdlbmQnKTtcbiAgICAgICAgcGFzcyhzdHlsZXMucmV2ZXJzZSgpLCBmWzNdLCBmWzJdLCAoZSkgPT4gZSAhPT0gJ2VuZCcpO1xuICAgICAgICByZXR1cm4gc3R5bGVzLnJldmVyc2UoKTtcbiAgICB9XG4gICAgO1xuICAgIHVuaXRQaXhlbChudW0pIHtcbiAgICAgICAgbGV0IHN0eWxlcyA9IHRoaXMuZ2V0U2l6ZXMobnVtKTtcbiAgICAgICAgbGV0IGYgPSB0aGlzLmZpZWxkcztcbiAgICAgICAgbGV0IGRlZkRpbSA9IDEwMC4wIC8gbnVtO1xuICAgICAgICBsZXQgc3VtRGltID0gMDtcbiAgICAgICAgc3R5bGVzLnNvbWUoKHN0eWxlLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3R5bGUuY29kZSA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzJdXSA9IHN1bURpbSArICdweCc7XG4gICAgICAgICAgICAgICAgc3VtRGltICs9IHN0eWxlLnNpemUgKyAodGhpcy5zcGFjaW5nIHx8IDApICsgKHRoaXMuc3BhY2luZyB8fCAwKTtcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZlszXV0gPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbNV1dID0gc3R5bGUuc2l6ZSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdHlsZS5jb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbMl1dID0gKHN1bURpbSA+IDApID8gKHN1bURpbSArICdweCcpIDogKGkgKiBkZWZEaW0gKyAnJScpO1xuICAgICAgICAgICAgICAgIHN1bURpbSA9IC0xO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzNdXSA9ICgxMDAgLSAoaSArIDEpICogZGVmRGltKSArICclJztcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZls1XV0gPSAnYXV0byc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdHlsZS5jb2RlID09PSAnZW5kJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VtRGltID0gMDtcbiAgICAgICAgc3R5bGVzLnNsaWNlKCkucmV2ZXJzZSgpLnNvbWUoKHN0eWxlLCBpKSA9PiB7XG4gICAgICAgICAgICBzdHlsZS5maWVsZHNbZlszXV0gPSBzdW1EaW0gKyAncHgnO1xuICAgICAgICAgICAgaWYgKHN0eWxlLmNvZGUgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgc3VtRGltICs9IHN0eWxlLnNpemUgKyAodGhpcy5zcGFjaW5nIHx8IDApICsgKHRoaXMuc3BhY2luZyB8fCAwKTtcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZlsyXV0gPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbNV1dID0gc3R5bGUuc2l6ZSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc3VtRGltID4gMCAmJiBzdHlsZS5jb2RlICE9PSAnc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzVdXSA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH1cbiAgICA7XG4gICAgZ2V0U3R5bGVzKGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IGYgPSB0aGlzLmZpZWxkcztcbiAgICAgICAgbGV0IHN0eWxlcyA9IHRoaXMudW5pdChjb21wb25lbnRzLmxlbmd0aCk7XG4gICAgICAgIGNvbXBvbmVudHMubWFwKChjLCBpKSA9PiB7XG4gICAgICAgICAgICBjLnN0eWxlID0gYCR7ZlswXX06MCU7ICR7ZlsxXX06MCU7IGA7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzdHlsZXNbaV0uZmllbGRzKS5mb3JFYWNoKChzdCkgPT4geyBjLnN0eWxlICs9IGAke3N0fTogJHtzdHlsZXNbaV0uZmllbGRzW3N0XX07YDsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5jc3NDbGFzcztcbiAgICB9XG4gICAgO1xufVxuO1xuY2xhc3MgQ29sdW1ucyBleHRlbmRzIFBpbGxhckxheW91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihhcmVhRGVzYykge1xuICAgICAgICBzdXBlcihjUGFyYW1zW2V4cG9ydHMuUGlsbGFyTGF5b3V0c1swXV0sIGFyZWFEZXNjKTtcbiAgICAgICAgdGhpcy5hcmVhRGVzYyA9IGFyZWFEZXNjO1xuICAgIH1cbiAgICA7XG59XG47XG5jbGFzcyBSb3dzIGV4dGVuZHMgUGlsbGFyTGF5b3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZWFEZXNjKSB7XG4gICAgICAgIHN1cGVyKGNQYXJhbXNbZXhwb3J0cy5QaWxsYXJMYXlvdXRzWzFdXSwgYXJlYURlc2MpO1xuICAgICAgICB0aGlzLmFyZWFEZXNjID0gYXJlYURlc2M7XG4gICAgfVxuICAgIDtcbn1cbjtcbkxheW91dGVyXzEuTGF5b3V0ZXIucmVnaXN0ZXIoZXhwb3J0cy5QaWxsYXJMYXlvdXRzWzBdLCBDb2x1bW5zKTtcbkxheW91dGVyXzEuTGF5b3V0ZXIucmVnaXN0ZXIoZXhwb3J0cy5QaWxsYXJMYXlvdXRzWzFdLCBSb3dzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVVHbHNiR0Z5WldSTVlYbHZkWFJsY2k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUwzTnlZeTkyYVdWM0wxQnBiR3hoY21Wa1RHRjViM1YwWlhJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUV5UTBFc2VVTkJRVEJETzBGQlF6RkRMSEZEUVVWM1F6dEJRV2RDTTBJc1VVRkJRU3hoUVVGaExFZEJRVWM3U1VGRGVrSXNVMEZCVXl4RlFVRkZMRTFCUVUwN1EwRkRjRUlzUTBGQlF6dEJRVXRHTEUxQlFVMHNUMEZCVHl4SFFVRkhPMGxCUTFvc1QwRkJUeXhGUVVGblFqdFJRVU51UWl4UlFVRlJMRVZCUVVVc2JVSkJRVzFDTzFGQlF6ZENMRTFCUVUwc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeFJRVUZSTEVWQlFVVXNUVUZCVFN4RlFVRkZMRTlCUVU4c1JVRkJSU3hSUVVGUkxFVkJRVVVzVDBGQlR5eERRVUZETzB0QlEyaEZPMGxCUTBRc1NVRkJTU3hGUVVGblFqdFJRVU5vUWl4UlFVRlJMRVZCUVVVc1owSkJRV2RDTzFGQlF6RkNMRTFCUVUwc1JVRkJSU3hEUVVGRExFMUJRVTBzUlVGQlJTeFBRVUZQTEVWQlFVVXNTMEZCU3l4RlFVRkZMRkZCUVZFc1JVRkJSU3hQUVVGUExFVkJRVVVzVVVGQlVTeERRVUZETzB0QlEyaEZPME5CUTBvc1EwRkJRenRCUVU5R0xFMUJRV1VzWTBGQlpTeFRRVUZSTEcxQ1FVRlJPMGxCWVRGRExGbEJRVmtzVFVGQmJVSXNSVUZCVXl4UlFVRnpRanRSUVVNeFJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkViMElzWVVGQlVTeEhRVUZTTEZGQlFWRXNRMEZCWXp0UlFVVXhSQ3hKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNN1VVRkROVUlzU1VGQlNTeERRVUZETEZGQlFWRXNSMEZCUnl4TlFVRk5MRU5CUVVNc1VVRkJVU3hEUVVGRE8xRkJSV2hETEVsQlFVa3NRMEZCUXl4SFFVRkhMRkZCUVZFc1EwRkJReXhOUVVGTkxFZEJRVU1zUTBGQlF5eERRVUZETzFGQlF6RkNMRWxCUVVrc1MwRkJTeXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU5rTEVsQlFVa3NTVUZCU1N4SFFVRkpMRU5CUVVNc1EwRkJRenRSUVVWa0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFbEJRV2RDTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNc1NVRkJTU3haUVVGWkxHMUNRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkJMRU5CUVVNN1dVRkRNVVVzU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF6dFJRVWQwUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlowSXNSVUZCUlN4RFFVRlJMRVZCUVVVc1JVRkJSU3hEUVVONlF5eERRVUZETEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJReXhaUVVGakxIRkNRVUZaTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1JVRkJSU3hMUVVGTExFZEJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJSMnBGTEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGblFpeEZRVUZGTEVOQlFWRXNSVUZCUlN4RlFVRkZMRU5CUTNwRExFTkJRVU1zUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4SFFVRkRMRU5CUVVNc1EwRkJReXhaUVVGWkxIRkNRVUZaTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFZEJRVU1zUTBGQlF5eERRVUZGTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJSV3BGTEVsQlFVa3NRMEZCUXl4VlFVRlZMRWRCUVVjc1MwRkJTeXhEUVVGRE8xRkJRM2hDTEVsQlFVa3NRMEZCUXl4VFFVRlRMRWRCUVVrc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RFFVRkRMRTFCUVUwc1IwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEpRVU0xUkN4RFFVRkRPMGxCUVVFc1EwRkJRenRKUVZOTkxGRkJRVkVzUTBGQlF5eEhRVUZWTzFGQlEzWkNMRTFCUVUwc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTTdVVUZET1VJc1RVRkJUU3hKUVVGSkxFZEJRVWtzU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXp0UlFVTTNRaXhOUVVGTkxFbEJRVWtzUjBGQlNTeEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRPMUZCUXpWQ0xFMUJRVTBzUjBGQlJ5eEhRVUZITEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNN1VVRkZlRUlzVDBGQlR5eERRVUZETEVkQlFVY3NTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJVU3hGUVVGRkxFVkJRVVU3V1VGRE0wTXNTVUZCU1N4SlFVRkpMRWRCUVZVc1NVRkJTU3hEUVVGRE8xbEJRM1pDTEVsQlFVa3NRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJRenRaUVVOaUxFbEJRVWtzUTBGQlF5eEhRVUZITEVkQlFVY3NSMEZCUXl4RFFVRkRMRWRCUVVNc1NVRkJTU3hGUVVGSE8yZENRVUZGTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1IwRkJSeXhIUVVGSExFTkJRVU1zUjBGQlJ5eEhRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03WjBKQlFVTXNRMEZCUXl4SFFVRkhMRXRCUVVzc1EwRkJRenRoUVVGRk8ybENRVU53UlN4SlFVRkpMRU5CUVVNc1IwRkJSeXhMUVVGTExFVkJRVWM3WjBKQlFVVXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXp0blFrRkJReXhEUVVGRExFZEJRVWNzVDBGQlR5eERRVUZETzJGQlFVVTdhVUpCUXpGRUxFbEJRVWtzUjBGQlJ5eEhRVUZETEVOQlFVTXNTVUZCU1N4SFFVRkhMRXRCUVVjc1MwRkJTeXhGUVVGRE8yZENRVUZGTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1IwRkJSeXhIUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMmRDUVVGRExFTkJRVU1zUjBGQlJ5eFBRVUZQTEVOQlFVTTdZVUZCUlR0WlFVTTFSU3hQUVVGUExFVkJRVU1zU1VGQlNTeEZRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVNc1EwRkJReXhGUVVGRkxFMUJRVTBzUlVGQlF5eEZRVUZGTEVWQlFVTXNRMEZCUXp0UlFVTXhReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdTVUZGVHl4WFFVRlhMRU5CUVVNc1IwRkJWVHRSUVVNeFFpeEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRE8xRkJRM0JDTEVsQlFVa3NSMEZCUnl4SFFVRkhMRXRCUVVzc1EwRkJRenRSUVVOb1FpeEpRVUZKTEUxQlFVMHNSMEZCWjBJc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVVTNReXhOUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4RlFVRkZMRWRCUVVjc1NVRkJTU3hMUVVGTExFTkJRVU1zU1VGQlNTeEZRVUZGTzFsQlFVVXNSMEZCUnl4SFFVRkhMRWRCUVVjc1IwRkJSeXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETzFsQlFVTXNSMEZCUnl4RlFVRkZMRU5CUVVNN1UwRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEyaEdMRWxCUVVrc1RVRkJUU3hIUVVGSExFZEJRVWNzUjBGQlJ5eEhRVUZITEVOQlFVTTdVVUZGZGtJc1UwRkJVeXhKUVVGSkxFTkJRVU1zVFVGQmJVSXNSVUZCUlN4SFFVRlZMRVZCUVVVc1IwRkJWU3hGUVVGRkxGTkJRV2RETzFsQlEzWkdMRWxCUVVrc1RVRkJUU3hIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU5tTEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVVU3WjBKQlEyaENMRWxCUVVrc1NVRkJTU3hIUVVGSExFdEJRVXNzUTBGQlF5eEpRVUZKTEVsQlFVa3NUVUZCVFN4RFFVRkRPMmRDUVVOb1F5eEpRVUZKTEZOQlFWTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVU3YjBKQlFVVXNUMEZCVHl4SlFVRkpMRU5CUVVNN2FVSkJRVVU3WjBKQlF6TkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NUVUZCVFN4SFFVRkRMRWRCUVVjc1EwRkJRenRuUWtGREwwSXNUVUZCVFN4SlFVRkpMRWxCUVVrc1EwRkJRenRuUWtGRFppeExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eEhRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkRMRWRCUVVjc1EwRkJRenRuUWtGRGNrTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4TlFVRk5MRU5CUVVNN1owSkJRelZDTEU5QlFVOHNTMEZCU3l4RFFVRkRPMWxCUTJwQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExQXNRMEZCUXp0UlFVVkVMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFWRXNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJReXhMUVVGSExFdEJRVXNzUTBGQlF5eERRVUZETzFGQlEyeEVMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVZFc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF5eExRVUZITEV0QlFVc3NRMEZCUXl4RFFVRkRPMUZCUXpWRUxFOUJRVThzVFVGQlRTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMGxCUXpWQ0xFTkJRVU03U1VGQlFTeERRVUZETzBsQlJVMHNVMEZCVXl4RFFVRkRMRWRCUVZVN1VVRkRlRUlzU1VGQlNTeE5RVUZOTEVkQlFXZENMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdVVUZETjBNc1NVRkJTU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXp0UlFVVndRaXhKUVVGSkxFMUJRVTBzUjBGQlJ5eExRVUZMTEVkQlFVTXNSMEZCUnl4RFFVRkRPMUZCUjNaQ0xFbEJRVWtzVFVGQlRTeEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTm1MRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eExRVUZMTEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1dVRkRja0lzU1VGQlNTeExRVUZMTEVOQlFVTXNTVUZCU1N4TFFVRkhMRTlCUVU4c1JVRkJSVHRuUWtGRGRFSXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4TlFVRk5MRWRCUVVVc1NVRkJTU3hEUVVGRE8yZENRVU5zUXl4TlFVRk5MRWxCUVVrc1MwRkJTeXhEUVVGRExFbEJRVWtzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU5xUlN4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJRenRuUWtGRE5VSXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4TFFVRkxMRU5CUVVNc1NVRkJTU3hIUVVGRkxFbEJRVWtzUTBGQlF6dGhRVU42UXp0cFFrRkJUU3hKUVVGSkxFdEJRVXNzUTBGQlF5eEpRVUZKTEV0QlFVc3NTVUZCU1N4RlFVRkZPMmRDUVVNMVFpeExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNUVUZCVFN4SFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGQkxFTkJRVU1zUTBGQlF5eERRVUZETEUxQlFVMHNSMEZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVTXNUVUZCVFN4SFFVRkhMRWRCUVVjc1EwRkJReXhEUVVGRE8yZENRVU51UlN4TlFVRk5MRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlExb3NTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1IwRkJReXhEUVVGRExFTkJRVU1zUjBGQlF5eERRVUZETEVOQlFVTXNSMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhIUVVGSExFTkJRVU03WjBKQlF6bERMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1RVRkJUU3hEUVVGRE8yRkJReTlDTzJsQ1FVRk5MRWxCUVVrc1MwRkJTeXhEUVVGRExFbEJRVWtzUzBGQlJ5eExRVUZMTEVWQlFVVTdaMEpCUVVVc1QwRkJUeXhKUVVGSkxFTkJRVU03WVVGQlJUdFpRVU12UXl4UFFVRlBMRXRCUVVzc1EwRkJRenRSUVVOcVFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVZElMRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVU03VVVGRFdDeE5RVUZOTEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNTMEZCU3l4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRk8xbEJRM1pETEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJRenRaUVVOdVF5eEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRXRCUVVzc1MwRkJTeXhGUVVGRk8yZENRVU4wUWl4TlFVRk5MRWxCUVVrc1MwRkJTeXhEUVVGRExFbEJRVWtzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU5xUlN4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJRenRuUWtGRE5VSXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4TFFVRkxMRU5CUVVNc1NVRkJTU3hIUVVGRExFbEJRVWtzUTBGQlF6dGhRVU40UXp0cFFrRkJUVHRuUWtGRFNDeEpRVUZKTEUxQlFVMHNSMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhEUVVGRExFbEJRVWtzUzBGQlN5eFBRVUZQTEVWQlFVVTdiMEpCUTNCRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzVFVGQlRTeERRVUZETzJsQ1FVTXZRanRuUWtGRFJDeFBRVUZQTEVsQlFVa3NRMEZCUXp0aFFVTm1PMWxCUTBRc1QwRkJUeXhMUVVGTExFTkJRVU03VVVGRGFrSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hQUVVGUExFMUJRVTBzUTBGQlF6dEpRVU5zUWl4RFFVRkRPMGxCUVVFc1EwRkJRenRKUVZGUkxGTkJRVk1zUTBGQlF5eFZRVUU0UWp0UlFVTTVReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRPMUZCUTNCQ0xFbEJRVWtzVFVGQlRTeEhRVUZuUWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0UlFVTjJSQ3hWUVVGVkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCWXl4RlFVRkZMRU5CUVZFc1JVRkJSU3hGUVVGRk8xbEJRM2hETEVOQlFVTXNRMEZCUXl4TFFVRkxMRWRCUVVjc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU03V1VGRGNrTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zUlVGQlV5eEZRVUZGTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNc1MwRkJTeXhKUVVGSkxFZEJRVWNzUlVGQlJTeExRVUZMTEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRelZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1QwRkJUeXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETzBsQlEzcENMRU5CUVVNN1NVRkJRU3hEUVVGRE8wTkJRMHc3UVVGQlFTeERRVUZETzBGQmRVUkdMRTFCUVUwc1QwRkJVU3hUUVVGUkxHTkJRV003U1VGRGFFTXNXVUZCYlVJc1VVRkJjMEk3VVVGQlNTeExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMSEZDUVVGaExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4UlFVRlJMRU5CUVVNc1EwRkJRenRSUVVGeVJTeGhRVUZSTEVkQlFWSXNVVUZCVVN4RFFVRmpPMGxCUVdsRUxFTkJRVU03U1VGQlFTeERRVUZETzBOQlF5OUdPMEZCUVVFc1EwRkJRenRCUVhWRVJpeE5RVUZOTEVsQlFVc3NVMEZCVVN4alFVRmpPMGxCUXpkQ0xGbEJRVzFDTEZGQlFYTkNPMUZCUVVrc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eHhRa0ZCWVN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVTTdVVUZCY2tVc1lVRkJVU3hIUVVGU0xGRkJRVkVzUTBGQll6dEpRVUZwUkN4RFFVRkRPMGxCUVVFc1EwRkJRenREUVVNdlJqdEJRVUZCTEVOQlFVTTdRVUZGUml4dFFrRkJVU3hEUVVGRExGRkJRVkVzUTBGQlF5eHhRa0ZCWVN4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETzBGQlF6ZERMRzFDUVVGUkxFTkJRVU1zVVVGQlVTeERRVUZETEhGQ1FVRmhMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVXNzU1VGQlNTeERRVUZETEVOQlFVTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBMYXlvdXRlcl8xID0gcmVxdWlyZShcIi4vTGF5b3V0ZXJcIik7XG5jb25zdCBUb2tlbnNfMSA9IHJlcXVpcmUoXCIuL1Rva2Vuc1wiKTtcbmNsYXNzIFRpbGVMYXlvdXRlciBleHRlbmRzIExheW91dGVyXzEuTGF5b3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZWFEZXNjKSB7XG4gICAgICAgIHN1cGVyKGFyZWFEZXNjKTtcbiAgICAgICAgdGhpcy5hcmVhRGVzYyA9IGFyZWFEZXNjO1xuICAgICAgICB0aGlzLnVuaXQgPSBhcmVhRGVzYy5zb21lKChhcmVhKSA9PiAoYXJlYSBpbnN0YW5jZW9mIFRva2Vuc18xLlBpeGVsVG9rZW4pKSA/XG4gICAgICAgICAgICB0aGlzLnVuaXRQaXhlbCA6IHRoaXMudW5pdFBlcmNlbnQ7XG4gICAgfVxuICAgIDtcbiAgICB1bml0UGVyY2VudChudW0pIHtcbiAgICAgICAgY29uc3QgZGVzYyA9IHRoaXMuYXJlYURlc2M7XG4gICAgICAgIGNvbnN0IGZpbGwgPSB0aGlzLmFyZWFEZXNjLnNvbWUoYSA9PiAoYSBpbnN0YW5jZW9mIFRva2Vuc18xLkZpbGxUb2tlbikpO1xuICAgICAgICBjb25zdCByb290ID0gTWF0aC5zcXJ0KG51bSk7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBNYXRoLnJvdW5kKHJvb3QpO1xuICAgICAgICBsZXQgY29scyA9IE1hdGguZmxvb3Iocm9vdCk7XG4gICAgICAgIGlmIChyb290ID4gY29scykge1xuICAgICAgICAgICAgY29scysrO1xuICAgICAgICB9XG4gICAgICAgIGxldCB3aWR0aCA9IChkZXNjWzBdIGluc3RhbmNlb2YgVG9rZW5zXzEuRGVmaW5lZFRva2VuKSA/IGRlc2NbMF0uZ2V0U2l6ZSgpIDogdW5kZWZpbmVkO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gKGRlc2NbMV0gaW5zdGFuY2VvZiBUb2tlbnNfMS5EZWZpbmVkVG9rZW4pID8gZGVzY1sxXS5nZXRTaXplKCkgOiB3aWR0aDtcbiAgICAgICAgd2lkdGggPSB3aWR0aCB8fCAxMDAgLyBjb2xzO1xuICAgICAgICBoZWlnaHQgPSBoZWlnaHQgfHwgMTAwIC8gcm93cztcbiAgICAgICAgbGV0IGxlZnQgPSAwO1xuICAgICAgICBsZXQgdG9wID0gMDtcbiAgICAgICAgbGV0IHN0eWxlcyA9IFsuLi5BcnJheShudW0pLmtleXMoKV0ubWFwKGkgPT4ge1xuICAgICAgICAgICAgbGV0IHIgPSAnYXV0byc7XG4gICAgICAgICAgICBsZXQgdyA9IHdpZHRoICsgJyUnO1xuICAgICAgICAgICAgbGV0IGIgPSAnYXV0byc7XG4gICAgICAgICAgICBsZXQgaCA9IGhlaWdodCArICclJztcbiAgICAgICAgICAgIGlmICgobGVmdCArIDIgKiB3aWR0aCkgPiAxMDAgJiYgZmlsbCkge1xuICAgICAgICAgICAgICAgIHIgPSAnMCUnO1xuICAgICAgICAgICAgICAgIHcgPSAnYXV0byc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRvcCArIDIgKiBoZWlnaHQpID4gMTAwICYmIGZpbGwpIHtcbiAgICAgICAgICAgICAgICBiID0gJzAlJztcbiAgICAgICAgICAgICAgICBoID0gJ2F1dG8nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBgXG4gICAgICAgICAgICAgICAgdG9wOiAke01hdGguZmxvb3IodG9wKX0lOyBib3R0b206JHtifTtcbiAgICAgICAgICAgICAgICBsZWZ0OiAke2xlZnR9JTsgICAgICAgICAgIHJpZ2h0OiR7cn07XG4gICAgICAgICAgICAgICAgd2lkdGg6ICR7d307ICAgICAgICAgICAgICBoZWlnaHQ6ICR7aH07XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgaWYgKE1hdGgucm91bmQobGVmdCArPSB3aWR0aCkgPiAxMDAgLSBNYXRoLmZsb29yKHdpZHRoKSkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSAwO1xuICAgICAgICAgICAgICAgIHRvcCArPSBoZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH1cbiAgICA7XG4gICAgdW5pdFBpeGVsKG51bSkge1xuICAgICAgICBjb25zdCBkZXNjID0gdGhpcy5hcmVhRGVzYztcbiAgICAgICAgY29uc3Qgcm9vdCA9IE1hdGguc3FydChudW0pO1xuICAgICAgICBjb25zdCByb3dzID0gTWF0aC5yb3VuZChyb290KTtcbiAgICAgICAgbGV0IGNvbHMgPSBNYXRoLmZsb29yKHJvb3QpO1xuICAgICAgICBpZiAocm9vdCA+IGNvbHMpIHtcbiAgICAgICAgICAgIGNvbHMrKztcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2lkdGggPSAoZGVzY1swXSBpbnN0YW5jZW9mIFRva2Vuc18xLkRlZmluZWRUb2tlbikgPyBkZXNjWzBdLmdldFNpemUoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGhlaWdodCA9IChkZXNjWzFdIGluc3RhbmNlb2YgVG9rZW5zXzEuRGVmaW5lZFRva2VuKSA/IGRlc2NbMV0uZ2V0U2l6ZSgpIDogd2lkdGg7XG4gICAgICAgIHdpZHRoID0gd2lkdGggfHwgMTAwIC8gY29scztcbiAgICAgICAgaGVpZ2h0ID0gaGVpZ2h0IHx8IDEwMCAvIHJvd3M7XG4gICAgICAgIGxldCBsZWZ0ID0gMDtcbiAgICAgICAgbGV0IHRvcCA9IDA7XG4gICAgICAgIGxldCBzdHlsZXMgPSBbLi4uQXJyYXkobnVtKS5rZXlzKCldLm1hcChpID0+IHtcbiAgICAgICAgICAgIGxldCByID0gJ2F1dG8nO1xuICAgICAgICAgICAgbGV0IHcgPSB3aWR0aCArICdweCc7XG4gICAgICAgICAgICBsZXQgYiA9ICdhdXRvJztcbiAgICAgICAgICAgIGxldCBoID0gaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gYFxuICAgICAgICAgICAgICAgIHRvcDogJHtNYXRoLmZsb29yKHRvcCl9JTsgYm90dG9tOiR7Yn07XG4gICAgICAgICAgICAgICAgbGVmdDogJHtsZWZ0fSU7ICAgICAgICAgICByaWdodDoke3J9O1xuICAgICAgICAgICAgICAgIHdpZHRoOiAke3d9OyAgICAgICAgICAgICAgaGVpZ2h0OiAke2h9O1xuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIGlmIChNYXRoLnJvdW5kKGxlZnQgKz0gd2lkdGgpID4gMTAwIC0gTWF0aC5mbG9vcih3aWR0aCkpIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gMDtcbiAgICAgICAgICAgICAgICB0b3AgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICB9XG4gICAgO1xuICAgIGdldFN0eWxlcyhjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBzdHlsZXMgPSB0aGlzLnVuaXQoY29tcG9uZW50cy5sZW5ndGgpO1xuICAgICAgICBjb21wb25lbnRzLm1hcCgoYywgaSkgPT4ge1xuICAgICAgICAgICAgYy5zdHlsZSA9IHN0eWxlc1tpXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAnLmhzLXRpbGUtbGF5b3V0JztcbiAgICB9XG4gICAgO1xufVxuO1xuTGF5b3V0ZXJfMS5MYXlvdXRlci5yZWdpc3RlcigndGlsZXMnLCBUaWxlTGF5b3V0ZXIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVkdsc1pVeGhlVzkxZEdWeUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDNacFpYY3ZWR2xzWlV4aGVXOTFkR1Z5TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJPRVJCTEhsRFFVRXdRenRCUVVNeFF5eHhRMEZIZDBNN1FVRlBlRU1zVFVGQlRTeFpRVUZoTEZOQlFWRXNiVUpCUVZFN1NVRlJMMElzV1VGQmJVSXNVVUZCYzBJN1VVRkRja01zUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMUZCUkVRc1lVRkJVU3hIUVVGU0xGRkJRVkVzUTBGQll6dFJRVWx5UXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SlFVRm5RaXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETEVsQlFVa3NXVUZCV1N4dFFrRkJWU3hEUVVGRExFTkJRVU1zUTBGQlFTeERRVUZETzFsQlF6RkZMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNN1NVRkRNVU1zUTBGQlF6dEpRVUZCTEVOQlFVTTdTVUZGVFN4WFFVRlhMRU5CUVVNc1IwRkJWVHRSUVVNeFFpeE5RVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRE8xRkJRek5DTEUxQlFVMHNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExGbEJRVmtzYTBKQlFWTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRMMFFzVFVGQlRTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU0xUWl4TlFVRk5MRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUXpsQ0xFbEJRVTBzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE9VSXNTVUZCU1N4SlFVRkpMRWRCUVVjc1NVRkJTU3hGUVVGRk8xbEJRVVVzU1VGQlNTeEZRVUZGTEVOQlFVTTdVMEZCUlR0UlFVTTFRaXhKUVVGSkxFdEJRVXNzUjBGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1dVRkJXU3h4UWtGQldTeERRVUZETEVOQlFVRXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1UwRkJVeXhEUVVGRE8xRkJRemxGTEVsQlFVa3NUVUZCVFN4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eFpRVUZaTEhGQ1FVRlpMRU5CUVVNc1EwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTTdVVUZGTVVVc1MwRkJTeXhIUVVGSkxFdEJRVXNzU1VGQlN5eEhRVUZITEVkQlFVTXNTVUZCU1N4RFFVRkRPMUZCUXpWQ0xFMUJRVTBzUjBGQlJ5eE5RVUZOTEVsQlFVa3NSMEZCUnl4SFFVRkRMRWxCUVVrc1EwRkJRenRSUVVNMVFpeEpRVUZKTEVsQlFVa3NSMEZCUnl4RFFVRkRMRU5CUVVNN1VVRkRZaXhKUVVGSkxFZEJRVWNzUjBGQlNTeERRVUZETEVOQlFVTTdVVUZGWWl4SlFVRkpMRTFCUVUwc1IwRkJSeXhEUVVGRExFZEJRVWNzUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZPMWxCUTNoRExFbEJRVWtzUTBGQlF5eEhRVUZITEUxQlFVMHNRMEZCUXp0WlFVRkpMRWxCUVVrc1EwRkJReXhIUVVGSExFdEJRVXNzUjBGQlF5eEhRVUZITEVOQlFVTTdXVUZEY2tNc1NVRkJTU3hEUVVGRExFZEJRVWNzVFVGQlRTeERRVUZETzFsQlFVa3NTVUZCU1N4RFFVRkRMRWRCUVVjc1RVRkJUU3hIUVVGRExFZEJRVWNzUTBGQlF6dFpRVU4wUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFTkJRVU1zUjBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4SFFVRkhMRWxCUVVrc1NVRkJTU3hGUVVGRk8yZENRVUZGTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNN1owSkJRVU1zUTBGQlF5eEhRVUZITEUxQlFVMHNRMEZCUXp0aFFVRkZPMWxCUXpkRUxFbEJRVWtzUTBGQlF5eEhRVUZITEVkQlFVY3NRMEZCUXl4SFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFZEJRVWNzU1VGQlNTeEpRVUZKTEVWQlFVVTdaMEpCUVVVc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF6dG5Ra0ZCUXl4RFFVRkRMRWRCUVVjc1RVRkJUU3hEUVVGRE8yRkJRVVU3V1VGRE4wUXNUVUZCVFN4TFFVRkxMRWRCUVVjN2RVSkJRMGdzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1lVRkJZU3hEUVVGRE8zZENRVU0xUWl4SlFVRkpMSE5DUVVGelFpeERRVUZETzNsQ1FVTXhRaXhEUVVGRExEQkNRVUV3UWl4RFFVRkRPMkZCUTNoRExFTkJRVU03V1VGRFJpeEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hKUVVGSkxFdEJRVXNzUTBGQlF5eEhRVUZITEVkQlFVY3NSMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eEZRVUZGTzJkQ1FVRkZMRWxCUVVrc1IwRkJSeXhEUVVGRExFTkJRVU03WjBKQlFVTXNSMEZCUnl4SlFVRkpMRTFCUVUwc1EwRkJRenRoUVVGRk8xbEJRMjVHTEU5QlFVOHNTMEZCU3l4RFFVRkRPMUZCUTJoQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwb3NUMEZCVHl4TlFVRk5MRU5CUVVNN1NVRkRiRUlzUTBGQlF6dEpRVUZCTEVOQlFVTTdTVUZGVFN4VFFVRlRMRU5CUVVNc1IwRkJWVHRSUVVONFFpeE5RVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRE8xRkJSVE5DTEUxQlFVMHNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdVVUZETlVJc1RVRkJUU3hKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVNNVFpeEpRVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF6bENMRWxCUVVrc1NVRkJTU3hIUVVGSExFbEJRVWtzUlVGQlJUdFpRVUZGTEVsQlFVa3NSVUZCUlN4RFFVRkRPMU5CUVVVN1VVRkROVUlzU1VGQlNTeExRVUZMTEVkQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExGbEJRVmtzY1VKQlFWa3NRMEZCUXl4RFFVRkJMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExGTkJRVk1zUTBGQlF6dFJRVU01UlN4SlFVRkpMRTFCUVUwc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNXVUZCV1N4eFFrRkJXU3hEUVVGRExFTkJRVUVzUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRPMUZCUlRGRkxFdEJRVXNzUjBGQlNTeExRVUZMTEVsQlFVc3NSMEZCUnl4SFFVRkRMRWxCUVVrc1EwRkJRenRSUVVNMVFpeE5RVUZOTEVkQlFVY3NUVUZCVFN4SlFVRkpMRWRCUVVjc1IwRkJReXhKUVVGSkxFTkJRVU03VVVGRE5VSXNTVUZCU1N4SlFVRkpMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJRMklzU1VGQlNTeEhRVUZITEVkQlFVa3NRMEZCUXl4RFFVRkRPMUZCUldJc1NVRkJTU3hOUVVGTkxFZEJRVWNzUTBGQlF5eEhRVUZITEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSVHRaUVVONFF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4TlFVRk5MRU5CUVVNN1dVRkJTU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eExRVUZMTEVkQlFVTXNTVUZCU1N4RFFVRkRPMWxCUTNSRExFbEJRVWtzUTBGQlF5eEhRVUZITEUxQlFVMHNRMEZCUXp0WlFVRkpMRWxCUVVrc1EwRkJReXhIUVVGSExFMUJRVTBzUjBGQlF5eEpRVUZKTEVOQlFVTTdXVUZEZGtNc1RVRkJUU3hMUVVGTExFZEJRVWM3ZFVKQlEwZ3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zWVVGQllTeERRVUZETzNkQ1FVTTFRaXhKUVVGSkxITkNRVUZ6UWl4RFFVRkRPM2xDUVVNeFFpeERRVUZETERCQ1FVRXdRaXhEUVVGRE8yRkJRM2hETEVOQlFVTTdXVUZEUml4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeEpRVUZKTEV0QlFVc3NRMEZCUXl4SFFVRkhMRWRCUVVjc1IwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4RlFVRkZPMmRDUVVGRkxFbEJRVWtzUjBGQlJ5eERRVUZETEVOQlFVTTdaMEpCUVVNc1IwRkJSeXhKUVVGSkxFMUJRVTBzUTBGQlF6dGhRVUZGTzFsQlEyNUdMRTlCUVU4c1MwRkJTeXhEUVVGRE8xRkJRMmhDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBvc1QwRkJUeXhOUVVGTkxFTkJRVU03U1VGRGJFSXNRMEZCUXp0SlFVRkJMRU5CUVVNN1NVRlJVU3hUUVVGVExFTkJRVU1zVlVGQk9FSTdVVUZET1VNc1NVRkJTU3hOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03VVVGRE1VTXNWVUZCVlN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRV01zUlVGQlJTeERRVUZSTEVWQlFVVXNSVUZCUlR0WlFVTjRReXhEUVVGRExFTkJRVU1zUzBGQlN5eEhRVUZITEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVONFFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRTlCUVU4c2FVSkJRV2xDTEVOQlFVTTdTVUZETjBJc1EwRkJRenRKUVVGQkxFTkJRVU03UTBGRFREdEJRVUZCTEVOQlFVTTdRVUZIUml4dFFrRkJVU3hEUVVGRExGRkJRVkVzUTBGQlF5eFBRVUZQTEVWQlFVVXNXVUZCV1N4RFFVRkRMRU5CUVVNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIExheW91dFRva2VuIHtcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgfVxuICAgIGdldFNpemUoKSB7IHJldHVybiB0aGlzLnNpemU7IH1cbn1cbmV4cG9ydHMuTGF5b3V0VG9rZW4gPSBMYXlvdXRUb2tlbjtcbmNsYXNzIERlZmluZWRUb2tlbiBleHRlbmRzIExheW91dFRva2VuIHtcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7IHN1cGVyKHNpemUpOyB9XG59XG5leHBvcnRzLkRlZmluZWRUb2tlbiA9IERlZmluZWRUb2tlbjtcbmNsYXNzIEZpbGxUb2tlbiBleHRlbmRzIExheW91dFRva2VuIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoLTEpOyB9XG59XG5leHBvcnRzLkZpbGxUb2tlbiA9IEZpbGxUb2tlbjtcbmNsYXNzIFBpeGVsVG9rZW4gZXh0ZW5kcyBEZWZpbmVkVG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHsgc3VwZXIoc2l6ZSk7IH1cbn1cbmV4cG9ydHMuUGl4ZWxUb2tlbiA9IFBpeGVsVG9rZW47XG5jbGFzcyBQZXJjZW50VG9rZW4gZXh0ZW5kcyBEZWZpbmVkVG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHsgc3VwZXIoc2l6ZSk7IH1cbn1cbmV4cG9ydHMuUGVyY2VudFRva2VuID0gUGVyY2VudFRva2VuO1xuZnVuY3Rpb24gcHgocHgpIHsgcmV0dXJuIG5ldyBQaXhlbFRva2VuKHB4KTsgfVxuZXhwb3J0cy5weCA9IHB4O1xuZnVuY3Rpb24gcGMocGMpIHsgcmV0dXJuIG5ldyBQZXJjZW50VG9rZW4ocGMpOyB9XG5leHBvcnRzLnBjID0gcGM7XG5leHBvcnRzLkZJTEwgPSBuZXcgRmlsbFRva2VuKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWRzlyWlc1ekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDNacFpYY3ZWRzlyWlc1ekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCVVVFc1RVRkJjMElzVjBGQlZ6dEpRVU0zUWl4WlFVRnZRaXhKUVVGWk8xRkJRVm9zVTBGQlNTeEhRVUZLTEVsQlFVa3NRMEZCVVR0SlFVRkhMRU5CUVVNN1NVRkROMElzVDBGQlR5eExRVUZMTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRGVrTTdRVUZJUkN4clEwRkhRenRCUVV0RUxFMUJRWE5DTEZsQlFXRXNVMEZCVVN4WFFVRlhPMGxCUTJ4RUxGbEJRVmtzU1VGQldTeEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRE4wTTdRVUZHUkN4dlEwRkZRenRCUVV0RUxFMUJRV0VzVTBGQlZTeFRRVUZSTEZkQlFWYzdTVUZEZEVNc1owSkJRV2RDTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dERRVU12UWp0QlFVWkVMRGhDUVVWRE8wRkJTMFFzVFVGQllTeFZRVUZYTEZOQlFWRXNXVUZCV1R0SlFVTjRReXhaUVVGWkxFbEJRVmNzU1VGQlNTeExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wTkJRelZETzBGQlJrUXNaME5CUlVNN1FVRkxSQ3hOUVVGaExGbEJRV0VzVTBGQlVTeFpRVUZaTzBsQlF6RkRMRmxCUVZrc1NVRkJWeXhKUVVGSkxFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1EwRkROVU03UVVGR1JDeHZRMEZGUXp0QlFVMUVMRk5CUVdkQ0xFVkJRVVVzUTBGQlF5eEZRVUZUTEVsQlFVMHNUMEZCVHl4SlFVRkpMRlZCUVZVc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZCT1VRc1owSkJRVGhFTzBGQlRUbEVMRk5CUVdkQ0xFVkJRVVVzUTBGQlF5eEZRVUZUTEVsQlFVMHNUMEZCVHl4SlFVRkpMRmxCUVZrc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZCYUVVc1owSkJRV2RGTzBGQlMyNUVMRkZCUVVFc1NVRkJTU3hIUVVGSExFbEJRVWtzVTBGQlV5eEZRVUZGTEVOQlFVTWlmUT09IiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcbiIsInZhciBzY29wZSA9ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbCkgfHxcbiAgICAgICAgICAgICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmKSB8fFxuICAgICAgICAgICAgd2luZG93O1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwoc2NvcGUsIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuLy8gT24gc29tZSBleG90aWMgZW52aXJvbm1lbnRzLCBpdCdzIG5vdCBjbGVhciB3aGljaCBvYmplY3QgYHNldGltbWVkaWF0ZWAgd2FzXG4vLyBhYmxlIHRvIGluc3RhbGwgb250by4gIFNlYXJjaCBlYWNoIHBvc3NpYmlsaXR5IGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuLy8gYHNldGltbWVkaWF0ZWAgbGlicmFyeS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLnNldEltbWVkaWF0ZSk7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuY2xlYXJJbW1lZGlhdGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBUb2dnbGVCdXR0b25fMSA9IHJlcXVpcmUoXCIuL1RvZ2dsZUJ1dHRvblwiKTtcbmNsYXNzIEJ1dHRvbiBleHRlbmRzIFRvZ2dsZUJ1dHRvbl8xLlRvZ2dsZUJ1dHRvbiB7XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgbm9kZS5hdHRycy5kZXNjLml0ZW1zID0gW25vZGUuYXR0cnMuZGVzYy5uYW1lIHx8ICdidXR0b24nXTtcbiAgICAgICAgc3VwZXIub25pbml0KG5vZGUpO1xuICAgICAgICBUb2dnbGVCdXR0b25fMS5Ub2dnbGVCdXR0b24uZW5zdXJlU2VsZWN0ZWQobm9kZSk7XG4gICAgfVxufVxuZXhwb3J0cy5CdXR0b24gPSBCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRblYwZEc5dUxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMMEoxZEhSdmJpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVdkRFFTeHBSRUZCT0VNN1FVRmxPVU1zVFVGQllTeE5RVUZQTEZOQlFWRXNNa0pCUVZrN1NVRkRjRU1zVFVGQlRTeERRVUZETEVsQlFWYzdVVUZEWkN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVsQlFVa3NVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkRNMFFzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRSUVVOdVFpd3lRa0ZCV1N4RFFVRkRMR05CUVdNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU4wUXl4RFFVRkRPME5CUTBvN1FVRk9SQ3gzUWtGTlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jbGFzcyBDb2xsYXBzaWJsZSB7XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgbm9kZS5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGluaXRpYWw6IHRydWUsXG4gICAgICAgICAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgICAgICAgICB0b2dnbGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBub2RlLnN0YXRlLmV4cGFuZGVkID0gIW5vZGUuc3RhdGUuZXhwYW5kZWQ7XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5pbml0aWFsID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBjc3MgPSBub2RlLmF0dHJzLmNzcztcbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IG5vZGUuYXR0cnMuY29tcG9uZW50cztcbiAgICAgICAgY29uc3QgcHJlQXJyb3cgPSBub2RlLmF0dHJzLnByZUFycm93O1xuICAgICAgICBjb25zdCBwb3N0QXJyb3cgPSBub2RlLmF0dHJzLnBvc3RBcnJvdztcbiAgICAgICAgaWYgKG5vZGUuc3RhdGUuaW5pdGlhbCAmJiBub2RlLmF0dHJzLmlzRXhwYW5kZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5leHBhbmRlZCA9IG5vZGUuYXR0cnMuaXNFeHBhbmRlZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBleHBDU1MgPSBub2RlLnN0YXRlLmV4cGFuZGVkID8gJ2hzLWNvbGxhcHNpYmxlLWV4cGFuZGVkJyA6ICcnO1xuICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKGAuaHMtY29sbGFwc2libGUgJHtjc3N9YCwgW1xuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKCcuaHMtY29sbGFwc2libGUtdGl0bGUnLCB7IG9uY2xpY2s6IG5vZGUuc3RhdGUudG9nZ2xlIH0sIFtcbiAgICAgICAgICAgICAgICAhcHJlQXJyb3cgPyBoc2xheW91dF8xLm0oJycpIDogaHNsYXlvdXRfMS5tKGAuaHMtY29sbGFwc2libGUtcHJlIC5ocy1jb2xsYXBzaWJsZS1hcnJvdy0ke25vZGUuc3RhdGUuZXhwYW5kZWQgPyAnZG93bicgOiAncmlnaHQnfWApLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudHNbMF0sXG4gICAgICAgICAgICAgICAgIXBvc3RBcnJvdyA/IGhzbGF5b3V0XzEubSgnJykgOiBoc2xheW91dF8xLm0oYC5ocy1jb2xsYXBzaWJsZS1wb3N0IC5ocy1jb2xsYXBzaWJsZS1hcnJvdy0ke25vZGUuc3RhdGUuZXhwYW5kZWQgPyAnZG93bicgOiAnbGVmdCd9YCksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGNvbXBvbmVudHNbMV0gPyBoc2xheW91dF8xLm0oYC5ocy1jb2xsYXBzaWJsZS1jb250ZW50ICR7ZXhwQ1NTfWAsIGNvbXBvbmVudHNbMV0ubWFwKChjKSA9PiBoc2xheW91dF8xLm0oJycsIGMpKSkgOiB1bmRlZmluZWRcbiAgICAgICAgXSk7XG4gICAgfVxufVxuZXhwb3J0cy5Db2xsYXBzaWJsZSA9IENvbGxhcHNpYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUTI5c2JHRndjMmxpYkdVdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZRMjlzYkdGd2MybGliR1V1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRnBSRUVzZFVOQlFXOURPMEZCUlhCRExFMUJRV0VzVjBGQlZ6dEpRVU53UWl4TlFVRk5MRU5CUVVNc1NVRkJWVHRSUVVOaUxFbEJRVWtzUTBGQlF5eExRVUZMTEVkQlFVYzdXVUZEVkN4UFFVRlBMRVZCUVVVc1NVRkJTVHRaUVVOaUxGRkJRVkVzUlVGQlJTeExRVUZMTzFsQlEyWXNUVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSVHRuUWtGRFZDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRkZCUVZFc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRPMmRDUVVNelF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1IwRkJSeXhMUVVGTExFTkJRVU03V1VGREwwSXNRMEZCUXp0VFFVTktMRU5CUVVNN1NVRkRUaXhEUVVGRE8wbEJRMFFzU1VGQlNTeERRVUZETEVsQlFWVTdVVUZEV0N4TlFVRk5MRWRCUVVjc1IwRkJWU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXp0UlFVTnNReXhOUVVGTkxGVkJRVlVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRlZCUVZVc1EwRkJRenRSUVVONlF5eE5RVUZOTEZGQlFWRXNSMEZCU3l4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF6dFJRVU4yUXl4TlFVRk5MRk5CUVZNc1IwRkJTU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZOQlFWTXNRMEZCUXp0UlFVTjRReXhKUVVGSkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVlVGQlZTeExRVUZITEZOQlFWTXNSVUZCUlR0WlFVTjZSQ3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGVkJRVlVzUTBGQlF6dFRRVU12UXp0UlFVTkVMRTFCUVUwc1RVRkJUU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkJMRU5CUVVNc1EwRkJRU3g1UWtGQmVVSXNRMEZCUVN4RFFVRkRMRU5CUVVFc1JVRkJSU3hEUVVGRE8xRkJRMmhGTEU5QlFVOHNXVUZCUXl4RFFVRkRMRzFDUVVGdFFpeEhRVUZITEVWQlFVVXNSVUZCUlR0WlFVTXZRaXhaUVVGRExFTkJRVU1zZFVKQlFYVkNMRVZCUVVVc1JVRkJSU3hQUVVGUExFVkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRVZCUVVNc1JVRkJSVHRuUWtGRGNrUXNRMEZCUXl4UlFVRlJMRU5CUVVFc1EwRkJReXhEUVVGRExGbEJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1dVRkJReXhEUVVGRExEWkRRVUUyUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlFTeERRVUZETEVOQlFVRXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF6dG5Ra0ZEZWtjc1ZVRkJWU3hEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEWWl4RFFVRkRMRk5CUVZNc1EwRkJRU3hEUVVGRExFTkJRVU1zV1VGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhaUVVGRExFTkJRVU1zT0VOQlFUaERMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZCTEVOQlFVTXNRMEZCUVN4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETzJGQlF6ZEhMRU5CUVVNN1dVRkRSaXhWUVVGVkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVRXNRMEZCUXl4RFFVRkRMRmxCUVVNc1EwRkJReXd5UWtGQk1rSXNUVUZCVFN4RlFVRkZMRVZCUVVVc1ZVRkJWU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVzc1JVRkJSU3hGUVVGRkxFTkJRVUVzV1VGQlF5eERRVUZETEVWQlFVVXNSVUZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZOQlFWTTdVMEZETVVjc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF6dERRVU5LTzBGQk4wSkVMR3REUVRaQ1F5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jbGFzcyBMYWJlbCB7XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgICAgICBjb25zdCBzdHlsZSA9IG5vZGUuYXR0cnMuc3R5bGUgfHwgJyc7XG4gICAgICAgIGNvbnN0IHRleHQgPSBub2RlLmF0dHJzLnRleHQgfHwgJ3Vuc3BlY2lmaWVkJztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShgLmhzLWxhYmVsICR7Y3NzfWAsIHsgc3R5bGU6IHN0eWxlIH0sIGhzbGF5b3V0XzEubS50cnVzdCh0ZXh0KSk7XG4gICAgfVxufVxuZXhwb3J0cy5MYWJlbCA9IExhYmVsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVEdGaVpXd3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12VEdGaVpXd3VkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGblEwRXNkVU5CUVhkRE8wRkJXWGhETEUxQlFXRXNTMEZCU3p0SlFVTmtMRWxCUVVrc1EwRkJReXhKUVVGWE8xRkJRMW9zVFVGQlRTeEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFbEJRVWtzUlVGQlJTeERRVUZETzFGQlEycERMRTFCUVUwc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVOeVF5eE5RVUZOTEVsQlFVa3NSMEZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzU1VGQlNTeGhRVUZoTEVOQlFVTTdVVUZETDBNc1QwRkJUeXhaUVVGRExFTkJRVU1zWVVGQllTeEhRVUZITEVWQlFVVXNSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJReXhMUVVGTExFVkJRVVVzUlVGQlJTeFpRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRGFrVXNRMEZCUXp0RFFVTktPMEZCVUVRc2MwSkJUME1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUmFkaW9CdXR0b25fMSA9IHJlcXVpcmUoXCIuL1JhZGlvQnV0dG9uXCIpO1xuY2xhc3MgTWVudSBleHRlbmRzIFJhZGlvQnV0dG9uXzEuUmFkaW9CdXR0b24ge1xuICAgIHZpZXcobm9kZSkgeyByZXR1cm4gUmFkaW9CdXR0b25fMS5SYWRpb0J1dHRvbi52aWV3R3JvdXAoJy5ocy1tZW51Jywgbm9kZSk7IH1cbn1cbmV4cG9ydHMuTWVudSA9IE1lbnU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUV1Z1ZFM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OU5aVzUxTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJkMFJCTEN0RFFVRTJRenRCUVUwM1F5eE5RVUZoTEVsQlFVc3NVMEZCVVN4NVFrRkJWenRKUVVOcVF5eEpRVUZKTEVOQlFVTXNTVUZCVnl4SlFVRlhMRTlCUVU4c2VVSkJRVmNzUTBGQlF5eFRRVUZUTEVOQlFVTXNWVUZCVlN4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dERRVU12UlR0QlFVWkVMRzlDUVVWREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBUb29sYmFyQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9Ub29sYmFyQnV0dG9uXCIpO1xuY2xhc3MgTW9kYWwge1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIG5vZGUuc3RhdGUuaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKTtcbiAgICAgICAgbm9kZS5zdGF0ZS5zaG93TW9kYWwgPSBmYWxzZTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLnNob3dNb2RhbCA9IHRydWU7XG4gICAgICAgICAgICBoc2xheW91dF8xLm0ucmVkcmF3KCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGRpc21pc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5vZGUuYXR0cnMuZGlzbWlzcykge1xuICAgICAgICAgICAgICAgIG5vZGUuYXR0cnMuZGlzbWlzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB3ID0gbm9kZS5hdHRycy53aWR0aCB8fCAnYXV0byc7XG4gICAgICAgIGNvbnN0IGggPSBub2RlLmF0dHJzLmhlaWdodCB8fCAnYXV0byc7XG4gICAgICAgIGNvbnN0IGF0dHJzID0geyBzdHlsZTogYHdpZHRoOiR7d307IGhlaWdodDoke2h9O2AgfTtcbiAgICAgICAgaWYgKG5vZGUuYXR0cnMuc2V0VHJpZ2dlcikge1xuICAgICAgICAgICAgbm9kZS5hdHRycy5zZXRUcmlnZ2VyKHRyaWdnZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHJlcXVpcmVkIGF0dHJpYnV0ZSBmdW5jdGlvbiAnc2V0VHJpZ2dlcicgaXMgbm90IGRlZmluZWRgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gIW5vZGUuc3RhdGUuc2hvd01vZGFsID8gaHNsYXlvdXRfMS5tKCdzcGFuJykgOiBoc2xheW91dF8xLm0oJy5ocy1tb2RhbC1mcmFtZScsIFtcbiAgICAgICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLW1vZGFsLWJhY2tncm91bmQnLCB7IG9uY2xpY2s6IGRpc21pc3MgfSwgJycpLFxuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKCcuaHMtbW9kYWwtZm9yZWdyb3VuZCcsIGF0dHJzLCAhbm9kZS5hdHRycy5jb250ZW50ID8gJ21vZGFsIHBhbmUnIDogW1xuICAgICAgICAgICAgICAgIG5vZGUuYXR0cnMuY29udGVudCxcbiAgICAgICAgICAgICAgICBoc2xheW91dF8xLm0oVG9vbGJhckJ1dHRvbl8xLlRvb2xiYXJCdXR0b24sIHsgb25jbGljazogZGlzbWlzcywgc3ltYm9sczogVG9vbGJhckJ1dHRvbl8xLlRvb2xiYXJCdXR0b24uZ2V0U3ltYm9sKCdjcm9zcycpIH0pXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKTtcbiAgICB9XG59XG5leHBvcnRzLk1vZGFsID0gTW9kYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUVzlrWVd3dWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZUVzlrWVd3dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZ2UTBFc2RVTkJRVzlETzBGQlEzQkRMRzFFUVVGblJEdEJRVVZvUkN4TlFVRmhMRXRCUVVzN1NVRkRaQ3hOUVVGTkxFTkJRVU1zU1VGQlZUdFJRVU5pTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1JVRkJSU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hIUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF5OURMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eEhRVUZITEV0QlFVc3NRMEZCUXp0SlFVTnFReXhEUVVGRE8wbEJRMFFzU1VGQlNTeERRVUZETEVsQlFWVTdVVUZEV0N4TlFVRk5MRTlCUVU4c1IwRkJSeXhIUVVGSExFVkJRVVU3V1VGRGFrSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhUUVVGVExFZEJRVWNzU1VGQlNTeERRVUZETzFsQlF6VkNMRmxCUVVNc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF6dFJRVU5tTEVOQlFVTXNRMEZCUXp0UlFVTkdMRTFCUVUwc1QwRkJUeXhIUVVGSExFZEJRVWNzUlVGQlJUdFpRVU5xUWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGTkJRVk1zUjBGQlJ5eExRVUZMTEVOQlFVTTdXVUZETjBJc1NVRkJTU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlR0blFrRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMkZCUVVVN1VVRkRja1FzUTBGQlF5eERRVUZETzFGQlEwWXNUVUZCVFN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVsQlFVc3NUVUZCVFN4RFFVRkRPMUZCUTNSRExFMUJRVTBzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hKUVVGSkxFMUJRVTBzUTBGQlF6dFJRVU4wUXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhGUVVGRkxFdEJRVXNzUlVGQlJTeFRRVUZUTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWRCUVVjc1JVRkJReXhEUVVGRE8xRkJRMjVFTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhWUVVGVkxFVkJRVVU3V1VGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRlZCUVZVc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFRRVUZGTzJGQlEzcEVPMWxCUVVVc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eDVSRUZCZVVRc1EwRkJReXhEUVVGRE8xTkJRVVU3VVVGRGFFWXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZCTEVOQlFVTXNRMEZCUXl4WlFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZsQlFVTXNRMEZCUXl4cFFrRkJhVUlzUlVGQlJUdFpRVU16UkN4WlFVRkRMRU5CUVVNc2MwSkJRWE5DTEVWQlFVVXNSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRExFVkJRVVVzUlVGQlJTeERRVUZETzFsQlEyeEVMRmxCUVVNc1EwRkJReXh6UWtGQmMwSXNSVUZCUlN4TFFVRkxMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUVN4RFFVRkRMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEYWtVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTzJkQ1FVTnNRaXhaUVVGRExFTkJRVU1zTmtKQlFXRXNSVUZCUlN4RlFVRkZMRTlCUVU4c1JVRkJSU3hQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZETERaQ1FVRmhMRU5CUVVNc1UwRkJVeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTEVOQlFVTTdZVUZEYmtZc1EwRkJRenRUUVVOTUxFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdRMEZEU2p0QlFUTkNSQ3h6UWtFeVFrTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgaHNsYXlvdXRfMiA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IFNlbGVjdG9yXzEgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNvbnN0IFNlbGVjdG9yXzIgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNsYXNzIE9wdGlvbnNCdXR0b24gZXh0ZW5kcyBTZWxlY3Rvcl8xLlNlbGVjdG9yIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBTZWxlY3Rvcl8xLlNlbGVjdG9yLmluaXQobm9kZSwgU2VsZWN0b3JfMi5hbnlJdGVtcyk7XG4gICAgfVxuICAgIHN0YXRpYyB2aWV3R3JvdXAoY3NzLCBub2RlKSB7XG4gICAgICAgIGNzcyA9IGAke2Nzc30gJHtub2RlLmF0dHJzLmNzcyB8fCAnJ31gO1xuICAgICAgICBjb25zdCBzdHlsZSA9IG5vZGUuYXR0cnMuc3R5bGUgfHwgJyc7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oY3NzLCB7IHN0eWxlOiBzdHlsZSB9LCBoc2xheW91dF8xLm0oaHNsYXlvdXRfMi5MYXlvdXQsIHtcbiAgICAgICAgICAgIGNvbHVtbnM6IFtdLFxuICAgICAgICAgICAgY29udGVudDogbm9kZS5zdGF0ZS5pdGVtcy5tYXAoKGwsIGkpID0+IFNlbGVjdG9yXzEuU2VsZWN0b3IucmVuZGVySXRlbShub2RlLCBpKSlcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHsgcmV0dXJuIE9wdGlvbnNCdXR0b24udmlld0dyb3VwKCcuaHMtb3B0aW9ucy1idXR0b25zJywgbm9kZSk7IH1cbn1cbmV4cG9ydHMuT3B0aW9uc0J1dHRvbiA9IE9wdGlvbnNCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUM0IwYVc5dWMwSjFkSFJ2Ymk1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OVBjSFJwYjI1elFuVjBkRzl1TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJLMEpCTEhWRFFVRjVRenRCUVVONlF5eDFRMEZCZVVNN1FVRkRla01zZVVOQlFUSkRPMEZCUXpORExIbERRVUV5UXp0QlFXdENNME1zVFVGQllTeGhRVUZqTEZOQlFWRXNiVUpCUVZFN1NVRkRka01zVFVGQlRTeERRVUZETEVsQlFWVTdVVUZEWWl4dFFrRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNiVUpCUVZFc1EwRkJReXhEUVVGRE8wbEJRMnhETEVOQlFVTTdTVUZEUkN4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExFZEJRVlVzUlVGQlJTeEpRVUZYTzFGQlEzQkRMRWRCUVVjc1IwRkJSeXhIUVVGSExFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1NVRkJTU3hGUVVGRkxFVkJRVVVzUTBGQlF6dFJRVU4yUXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NTVUZCU1N4RlFVRkZMRU5CUVVNN1VVRkZja01zVDBGQlR5eFpRVUZETEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVNc1MwRkJTeXhGUVVGRExFdEJRVXNzUlVGQlF5eEZRVUZGTEZsQlFVTXNRMEZCUXl4cFFrRkJUU3hGUVVGRk8xbEJRMjVETEU5QlFVOHNSVUZCUlN4RlFVRkZPMWxCUTFnc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVkVzUlVGQlJTeERRVUZSTEVWQlFVVXNSVUZCUlN4RFFVRkRMRzFDUVVGUkxFTkJRVU1zVlVGQlZTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVOMFJpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlNMRU5CUVVNN1NVRkRSQ3hKUVVGSkxFTkJRVU1zU1VGQlZ5eEpRVUZYTEU5QlFVOHNZVUZCWVN4RFFVRkRMRk5CUVZNc1EwRkJReXh4UWtGQmNVSXNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRE5VWTdRVUZrUkN4elEwRmpReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgaHNsYXlvdXRfMiA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IFNlbGVjdG9yXzEgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNsYXNzIFJhZGlvQnV0dG9uIGV4dGVuZHMgU2VsZWN0b3JfMS5TZWxlY3RvciB7XG4gICAgc3RhdGljIHZpZXdHcm91cChjc3MsIG5vZGUpIHtcbiAgICAgICAgY3NzID0gYCR7Y3NzfSAke25vZGUuYXR0cnMuY3NzIHx8ICcnfWA7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gbm9kZS5hdHRycy5zdHlsZSB8fCAnJztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShjc3MsIHsgc3R5bGU6IHN0eWxlIH0sIGhzbGF5b3V0XzEubShoc2xheW91dF8yLkxheW91dCwge1xuICAgICAgICAgICAgY29sdW1uczogW10sXG4gICAgICAgICAgICBjb250ZW50OiBub2RlLnN0YXRlLml0ZW1zLm1hcCgobCwgaSkgPT4gU2VsZWN0b3JfMS5TZWxlY3Rvci5yZW5kZXJJdGVtKG5vZGUsIGkpKVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIHN1cGVyLm9uaW5pdChub2RlKTtcbiAgICAgICAgU2VsZWN0b3JfMS5TZWxlY3Rvci5lbnN1cmVTZWxlY3RlZChub2RlKTtcbiAgICB9XG4gICAgb251cGRhdGUobm9kZSkge1xuICAgICAgICBzdXBlci5vbnVwZGF0ZShub2RlKTtcbiAgICAgICAgU2VsZWN0b3JfMS5TZWxlY3Rvci5lbnN1cmVTZWxlY3RlZChub2RlKTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7IHJldHVybiBSYWRpb0J1dHRvbi52aWV3R3JvdXAoJy5ocy1yYWRpby1idXR0b25zJywgbm9kZSk7IH1cbn1cbmV4cG9ydHMuUmFkaW9CdXR0b24gPSBSYWRpb0J1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVVtRmthVzlDZFhSMGIyNHVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12VW1Ga2FXOUNkWFIwYjI0dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZwUTBFc2RVTkJRVFJETzBGQlF6VkRMSFZEUVVFMFF6dEJRVU0xUXl4NVEwRkJPRU03UVVGclFqbERMRTFCUVdFc1YwRkJXU3hUUVVGUkxHMUNRVUZSTzBsQlEzSkRMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zUjBGQlZTeEZRVUZGTEVsQlFWYzdVVUZEY0VNc1IwRkJSeXhIUVVGSExFZEJRVWNzUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhKUVVGSkxFVkJRVVVzUlVGQlJTeERRVUZETzFGQlEzWkRMRTFCUVUwc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVWeVF5eFBRVUZQTEZsQlFVTXNRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJReXhMUVVGTExFVkJRVU1zUzBGQlN5eEZRVUZETEVWQlFVVXNXVUZCUXl4RFFVRkRMR2xDUVVGTkxFVkJRVVU3V1VGRGJrTXNUMEZCVHl4RlFVRkZMRVZCUVVVN1dVRkRXQ3hQUVVGUExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlVTeEZRVUZGTEVOQlFWRXNSVUZCUlN4RlFVRkZMRU5CUVVNc2JVSkJRVkVzUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xTkJRM1JHTEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTFJc1EwRkJRenRKUVVORUxFMUJRVTBzUTBGQlF5eEpRVUZYTzFGQlEyUXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU51UWl4dFFrRkJVU3hEUVVGRExHTkJRV01zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTnNReXhEUVVGRE8wbEJRMFFzVVVGQlVTeERRVUZETEVsQlFWYzdVVUZEYUVJc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTnlRaXh0UWtGQlVTeERRVUZETEdOQlFXTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOc1F5eERRVUZETzBsQlEwUXNTVUZCU1N4RFFVRkRMRWxCUVZjc1NVRkJWeXhQUVVGUExGZEJRVmNzUTBGQlF5eFRRVUZUTEVOQlFVTXNiVUpCUVcxQ0xFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPME5CUTNoR08wRkJia0pFTEd0RFFXMUNReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuZnVuY3Rpb24gb25lT2ZJdGVtcyhpdGVtcywgdGl0bGUpIHtcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uaXNTZWxlY3RlZCA9IChpdGVtLnRpdGxlID09PSB0aXRsZSk7XG4gICAgfSk7XG4gICAgaWYgKCFpdGVtcy5zb21lKChpdGVtKSA9PiBpdGVtLmlzU2VsZWN0ZWQpKSB7XG4gICAgICAgIGl0ZW1zWzBdLmlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlzU2VsZWN0ZWQpWzBdO1xufVxuZXhwb3J0cy5vbmVPZkl0ZW1zID0gb25lT2ZJdGVtcztcbmZ1bmN0aW9uIGFueUl0ZW1zKGl0ZW1zLCB0aXRsZSkge1xuICAgIGl0ZW1zW3RpdGxlXS5pc1NlbGVjdGVkID0gIWl0ZW1zW3RpdGxlXS5pc1NlbGVjdGVkO1xuICAgIHJldHVybiBpdGVtc1t0aXRsZV07XG59XG5leHBvcnRzLmFueUl0ZW1zID0gYW55SXRlbXM7XG5jbGFzcyBTZWxlY3RvciB7XG4gICAgc3RhdGljIHVwZGF0ZUl0ZW1zKG5vZGUpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBub2RlLmF0dHJzLmRlc2MuaXRlbXMgfHwgW107XG4gICAgICAgIGl0ZW1zLm1hcCgoaXRtLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbm9kZS5zdGF0ZS5pdGVtc1tpdG1dIHx8IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogaXRtLFxuICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5pdGVtc1tpXSA9IGl0ZW07XG4gICAgICAgICAgICBub2RlLnN0YXRlLml0ZW1zW2l0bV0gPSBpdGVtO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGluaXQobm9kZSwgbW9kZWwgPSBvbmVPZkl0ZW1zKSB7XG4gICAgICAgIG5vZGUuc3RhdGUgPSB7XG4gICAgICAgICAgICB1cGRhdGVNb2RlbDogbW9kZWwsXG4gICAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgICBldmVudHM6IHt9LFxuICAgICAgICAgICAgaXRlbUNsaWNrZWQ6IChpdGVtKSA9PiBpdGVtLFxuICAgICAgICAgICAgZGVmYXVsdEl0ZW06IG5vZGUuYXR0cnMuZGVzYy5kZWZhdWx0SXRlbVxuICAgICAgICB9O1xuICAgICAgICBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZURvd24gPSBub2RlLmF0dHJzLmRlc2MubW91c2VEb3duO1xuICAgICAgICBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZVVwID0gbm9kZS5hdHRycy5kZXNjLm1vdXNlVXA7XG4gICAgICAgIG5vZGUuYXR0cnMuZGVzYy5jbGlja2VkID0gbm9kZS5hdHRycy5kZXNjLmNsaWNrZWQgfHwgKChpdGVtKSA9PiBjb25zb2xlLmxvZyhgbWlzc2luZyBjbGlja2VkKCkgZnVuY3Rpb24gZm9yIHNlbGVjdG9yIGl0ZW0gJHtpdGVtfWApKTtcbiAgICAgICAgbm9kZS5zdGF0ZS5ldmVudHMuY2xpY2tlZCA9IG5vZGUuYXR0cnMuZGVzYy5jbGlja2VkO1xuICAgICAgICBTZWxlY3Rvci51cGRhdGVJdGVtcyhub2RlKTtcbiAgICB9XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgU2VsZWN0b3IuaW5pdChub2RlKTtcbiAgICB9XG4gICAgb251cGRhdGUobm9kZSkge1xuICAgICAgICBTZWxlY3Rvci51cGRhdGVJdGVtcyhub2RlKTtcbiAgICB9XG4gICAgc3RhdGljIGVuc3VyZVNlbGVjdGVkKG5vZGUpIHtcbiAgICAgICAgaWYgKCFub2RlLnN0YXRlLml0ZW1zLnNvbWUoKGkpID0+IGkuaXNTZWxlY3RlZCkgJiYgbm9kZS5zdGF0ZS5pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5zdGF0ZS5kZWZhdWx0SXRlbSAmJiBub2RlLnN0YXRlLml0ZW1zW25vZGUuc3RhdGUuZGVmYXVsdEl0ZW1dKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5pdGVtc1tub2RlLnN0YXRlLmRlZmF1bHRJdGVtXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUuc3RhdGUuaXRlbXNbMF0uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIHJlbmRlckl0ZW0obm9kZSwgaSkge1xuICAgICAgICBjb25zdCByZWFjdG9yID0gKGNhbGxiYWNrKSA9PiAodGl0bGUpID0+IHtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUudXBkYXRlTW9kZWwobm9kZS5zdGF0ZS5pdGVtcywgdGl0bGUpO1xuICAgICAgICAgICAgdGl0bGUgPSBub2RlLnN0YXRlLml0ZW1DbGlja2VkKHRpdGxlKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYGlsbGVnYWwgcmVuZGVyIGluZGV4ICR7aX0gJHtub2RlLnN0YXRlLml0ZW1zLm1hcCgoaSkgPT4gaS50aXRsZSkuam9pbignfCcpfWApO1xuICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbSA9IG5vZGUuc3RhdGUuaXRlbXNbaV07XG4gICAgICAgIGNvbnN0IHRpdGxlID0gaXRlbS50aXRsZSB8fCAnJztcbiAgICAgICAgY29uc3QgaXRlbUNzcyA9IGl0ZW0uY3NzIHx8ICcnO1xuICAgICAgICByZXR1cm4gcmVuZGVyU2VsZWN0YWJsZSh7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICBjc3M6IGl0ZW1Dc3MsXG4gICAgICAgICAgICBpc1NlbGVjdGVkOiBub2RlLnN0YXRlLml0ZW1zW3RpdGxlXSA/IG5vZGUuc3RhdGUuaXRlbXNbdGl0bGVdLmlzU2VsZWN0ZWQgOiBmYWxzZSxcbiAgICAgICAgICAgIG1vdXNlRG93bjogbm9kZS5zdGF0ZS5ldmVudHMubW91c2VEb3duLFxuICAgICAgICAgICAgbW91c2VVcDogbm9kZS5zdGF0ZS5ldmVudHMubW91c2VVcCxcbiAgICAgICAgICAgIGNsaWNrZWQ6IHJlYWN0b3Iobm9kZS5zdGF0ZS5ldmVudHMuY2xpY2tlZClcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5TZWxlY3RvciA9IFNlbGVjdG9yO1xuO1xuZnVuY3Rpb24gcmVuZGVyU2VsZWN0YWJsZShkKSB7XG4gICAgY29uc3Qgb25jbGljayA9IGQuY2xpY2tlZCA/ICgpID0+IHsgZC5jbGlja2VkKGQudGl0bGUpOyB9IDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG9ubW91c2Vkb3duID0gZC5tb3VzZURvd24gPyAoKSA9PiB7IGQubW91c2VEb3duKGQudGl0bGUpOyB9IDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG9ubW91c2V1cCA9IGQubW91c2VVcCA/ICgpID0+IHsgZC5tb3VzZVVwKGQudGl0bGUpOyB9IDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBoc2xheW91dF8xLm0oYC5ocy1zZWxlY3RhYmxlICR7ZC5jc3MgfHwgJyd9ICR7ZC5pc1NlbGVjdGVkID8gJ2hzLXNlbGVjdGVkJyA6ICcnfWAsIHsgc3R5bGU6IGQuc3R5bGUsIG9uY2xpY2s6IG9uY2xpY2ssIG9ubW91c2Vkb3duOiBvbm1vdXNlZG93biwgb25tb3VzZXVwOiBvbm1vdXNldXAgfSwgZC50aXRsZSk7XG59XG5leHBvcnRzLnJlbmRlclNlbGVjdGFibGUgPSByZW5kZXJTZWxlY3RhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVTJWc1pXTjBiM0l1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdlUyVnNaV04wYjNJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZ4UWtFc2RVTkJRVzlETzBGQkswTndReXhUUVVGblFpeFZRVUZWTEVOQlFVTXNTMEZCYzBJc1JVRkJSU3hMUVVGWk8wbEJRek5FTEV0QlFVc3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJReXhKUVVGdFFpeEZRVUZGTEVWQlFVVTdVVUZEYkVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRXRCUVVjc1MwRkJTeXhEUVVGRExFTkJRVU03U1VGRE0wTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRWxCUVcxQ0xFVkJRVVVzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1JVRkJSVHRSUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4VlFVRlZMRWRCUVVjc1NVRkJTU3hEUVVGRE8wdEJRVVU3U1VGRE1VWXNUMEZCVHl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zU1VGQmJVSXNSVUZCUlN4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTNKRkxFTkJRVU03UVVGT1JDeG5RMEZOUXp0QlFVMUVMRk5CUVdkQ0xGRkJRVkVzUTBGQlF5eExRVUZ6UWl4RlFVRkZMRXRCUVZrN1NVRkRla1FzUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRlZCUVZVc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4VlFVRlZMRU5CUVVNN1NVRkRia1FzVDBGQlR5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1FVRkRlRUlzUTBGQlF6dEJRVWhFTERSQ1FVZERPMEZCY1VKRUxFMUJRWE5DTEZGQlFWRTdTVUZMTVVJc1RVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZWTzFGQlEzcENMRTFCUVUwc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1NVRkJTU3hGUVVGRkxFTkJRVU03VVVGRE1VTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFZEJRVlVzUlVGQlJTeERRVUZSTEVWQlFVVXNSVUZCUlR0WlFVTXZRaXhOUVVGTkxFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNUdG5Ra0ZEYkVNc1MwRkJTeXhGUVVGRkxFZEJRVWM3WjBKQlExWXNWVUZCVlN4RlFVRkZMRXRCUVVzN1lVRkRjRUlzUTBGQlF6dFpRVU5HTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXp0WlFVTXpRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU03VVVGRGFrTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRVQ3hEUVVGRE8wbEJWMFFzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRlhMRVZCUVVVc1MwRkJTeXhIUVVGRExGVkJRVlU3VVVGRGNrTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1IwRkJhMEk3V1VGRGVFSXNWMEZCVnl4RlFVRkZMRXRCUVVzN1dVRkRiRUlzUzBGQlN5eEZRVUZ2UWl4RlFVRkZPMWxCUXpOQ0xFMUJRVTBzUlVGQlJTeEZRVUZGTzFsQlExWXNWMEZCVnl4RlFVRkZMRU5CUVVNc1NVRkJWeXhGUVVGRkxFVkJRVVVzUTBGQlF5eEpRVUZKTzFsQlEyeERMRmRCUVZjc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhPMU5CUXpORExFTkJRVU03VVVGRFJpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhUUVVGVExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRE8xRkJRM2hFTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFOUJRVThzUjBGQlN5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03VVVGRGRFUXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZQTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzU1VGQlNTeERRVUZETEVOQlFVTXNTVUZCVnl4RlFVRkZMRVZCUVVVc1EwRkJReXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEdkRVFVRm5SQ3hKUVVGSkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEYUVvc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNUMEZCVHl4SFFVRkxMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXp0UlFVTjBSQ3hSUVVGUkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUXk5Q0xFTkJRVU03U1VGRlJDeE5RVUZOTEVOQlFVTXNTVUZCVnp0UlFVTmtMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTVUZEZUVJc1EwRkJRenRKUVVORUxGRkJRVkVzUTBGQlF5eEpRVUZYTzFGQlEyaENMRkZCUVZFc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTVUZETDBJc1EwRkJRenRKUVU5VExFMUJRVTBzUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCVnp0UlFVTjJReXhKUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlowSXNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExGVkJRVlVzUTBGQlF5eEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUjBGQlF5eERRVUZETEVWQlFVVTdXVUZEZUVZc1NVRkJTU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWY3NTVUZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRmRCUVZjc1EwRkJReXhGUVVGRk8yZENRVU53UlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRExGVkJRVlVzUjBGQlJ5eEpRVUZKTEVOQlFVTTdZVUZET1VRN2FVSkJRVTA3WjBKQlEwZ3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNWVUZCVlN4SFFVRkhMRWxCUVVrc1EwRkJRenRoUVVONlF6dFRRVU5LTzBsQlEwd3NRMEZCUXp0SlFWRlRMRTFCUVUwc1EwRkJReXhWUVVGVkxFTkJRVU1zU1VGQlZ5eEZRVUZGTEVOQlFWRTdVVUZETjBNc1RVRkJUU3hQUVVGUExFZEJRVWNzUTBGQlF5eFJRVUV5UWl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVmtzUlVGQlJTeEZRVUZGTzFsQlF6bEVMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETzFsQlEyaEVMRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWY3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRaUVVOMFF5eEpRVUZKTEU5QlFVOHNVVUZCVVN4TFFVRkxMRlZCUVZVc1JVRkJSVHRuUWtGRGFFTXNVVUZCVVN4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8yRkJRMjVDTzFGQlEwd3NRMEZCUXl4RFFVRkRPMUZCUTBZc1NVRkJTU3hEUVVGRExFZEJRVU1zUTBGQlF5eEZRVUZGTzFsQlFVVXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXgzUWtGQmQwSXNRMEZCUXl4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVzc1JVRkJReXhGUVVGRkxFTkJRVUVzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTTdXVUZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xTkJRVVU3VVVGRGFrZ3NUVUZCVFN4SlFVRkpMRWRCUVd0Q0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMmhFTEUxQlFVMHNTMEZCU3l4SFFVRlZMRWxCUVVrc1EwRkJReXhMUVVGTExFbEJRVWtzUlVGQlJTeERRVUZETzFGQlEzUkRMRTFCUVUwc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF5eEhRVUZITEVsQlFVa3NSVUZCUlN4RFFVRkRPMUZCUnk5Q0xFOUJRVThzWjBKQlFXZENMRU5CUVVNN1dVRkRjRUlzUzBGQlN5eEZRVUZGTEV0QlFVczdXVUZEV2l4SFFVRkhMRVZCUVVVc1QwRkJUenRaUVVWYUxGVkJRVlVzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlFTeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNWVUZCVlN4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTE8xbEJReTlGTEZOQlFWTXNSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eFRRVUZUTzFsQlEzUkRMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBPMWxCUTJ4RExFOUJRVThzUlVGQlJTeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETzFOQlF6bERMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03UTBGRlNqdEJRVGxHUkN3MFFrRTRSa003UVVGQlFTeERRVUZETzBGQlVVWXNVMEZCWjBJc1owSkJRV2RDTEVOQlFVTXNRMEZCWjBJN1NVRkROME1zVFVGQlRTeFBRVUZQTEVkQlFWTXNRMEZCUXl4RFFVRkRMRTlCUVU4c1EwRkJRU3hEUVVGRExFTkJRVWNzUjBGQlJ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVjc1EwRkJReXhEUVVGRExGTkJRVk1zUTBGQlF6dEpRVU12UlN4TlFVRk5MRmRCUVZjc1IwRkJTeXhEUVVGRExFTkJRVU1zVTBGQlV5eERRVUZCTEVOQlFVTXNRMEZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNVMEZCVXl4RFFVRkRPMGxCUXk5RkxFMUJRVTBzVTBGQlV5eEhRVUZQTEVOQlFVTXNRMEZCUXl4UFFVRlBMRU5CUVVFc1EwRkJReXhEUVVGSExFZEJRVWNzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkhMRU5CUVVNc1EwRkJReXhUUVVGVExFTkJRVU03U1VGREwwVXNUMEZCVHl4WlFVRkRMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF5eFZRVUZWTEVOQlFVRXNRMEZCUXl4RFFVRkJMR0ZCUVdFc1EwRkJRU3hEUVVGRExFTkJRVU1zUlVGQlJTeEZRVUZGTEVWQlEzUkZMRVZCUVVVc1MwRkJTeXhGUVVGRkxFTkJRVU1zUTBGQlF5eExRVUZMTEVWQlFVVXNUMEZCVHl4RlFVRkRMRTlCUVU4c1JVRkJSU3hYUVVGWExFVkJRVU1zVjBGQlZ5eEZRVUZGTEZOQlFWTXNSVUZCUXl4VFFVRlRMRVZCUVVVc1JVRkRha1lzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZEVml4RFFVRkRPMEZCUTA0c1EwRkJRenRCUVZKRUxEUkRRVkZESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNsYXNzIFNsaWRlciB7XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgbm9kZS5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHJhbmdlOiBbXSxcbiAgICAgICAgICAgIHZhbHVlOiAwLjUsXG4gICAgICAgICAgICBtb3VzZTogLTEsXG4gICAgICAgICAgICBzbGlkZXI6IDAsXG4gICAgICAgICAgICBub3RpZmllZDogJycsXG4gICAgICAgICAgICBvbmNoYW5nZTogKCkgPT4geyB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBpZCA9IG5vZGUuYXR0cnMuaWQ7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgICAgICBub2RlLnN0YXRlLnJhbmdlID0gbm9kZS5hdHRycy5yYW5nZSB8fCBbXTtcbiAgICAgICAgbm9kZS5zdGF0ZS5vbmNoYW5nZSA9IG5vZGUuYXR0cnMub25jaGFuZ2U7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oYC5ocy1zbGlkZXIgJHtjc3N9YCwge1xuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgb25tb3VzZWRvd246IChlKSA9PiBtb3VzZWRvd24oZSwgbm9kZSksXG4gICAgICAgICAgICBvbm1vdXNlbW92ZTogKGUpID0+IG1vdXNlbW92ZShlLCBub2RlKSxcbiAgICAgICAgICAgIG9ubW91c2V1cDogKGUpID0+IG1vdXNldXAoZSwgbm9kZSksXG4gICAgICAgICAgICBvbm1vdXNlb3V0OiAoZSkgPT4gbW91c2VvdXQoZSwgbm9kZSlcbiAgICAgICAgfSwgW3JlbmRlclNsaWRlcihub2RlKV0pO1xuICAgIH1cbn1cbmV4cG9ydHMuU2xpZGVyID0gU2xpZGVyO1xuZnVuY3Rpb24gcmVuZGVyU2xpZGVyKG5vZGUpIHtcbiAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCcuaHMtc2xpZGVyLXNsb3QnLCBbXG4gICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1tYXJrZXJzJywgbm9kZS5zdGF0ZS5yYW5nZS5tYXAocmVuZGVyTWFya2VyKSksXG4gICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1oYW5kbGUnLCB7IHN0eWxlOiBgbGVmdDokezEwMCAqIG5vZGUuc3RhdGUudmFsdWV9JWAgfSlcbiAgICBdKTtcbn1cbmZ1bmN0aW9uIHJlbmRlck1hcmtlcih2YWx1ZSwgaSwgbWFya2Vycykge1xuICAgIGNvbnN0IHNoYXJlID0gaSAvIChtYXJrZXJzLmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IGxlZnQgPSBtYXJrZXJzLmxlbmd0aCA8IDIgPyAwIDogMTAwICogc2hhcmU7XG4gICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1tYXJrZXInLCB7IHN0eWxlOiBgbGVmdDogJHtsZWZ0fSVgIH0sIHJlbmRlckxhYmVsKHZhbHVlKSk7XG59XG5mdW5jdGlvbiByZW5kZXJMYWJlbCh2YWx1ZSkge1xuICAgIHJldHVybiBoc2xheW91dF8xLm0oJy5ocy1zbGlkZXItbGFiZWwnLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBnZXRUYXJnZXRPZmZzZXQoZSkge1xuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBsZXQgbGVmdE9mZnNldCA9IDA7XG4gICAgd2hpbGUgKHRhcmdldC5jbGFzc05hbWUudHJpbSgpICE9PSBlLmN1cnJlbnRUYXJnZXQuY2xhc3NOYW1lLnRyaW0oKSkge1xuICAgICAgICBsZWZ0T2Zmc2V0ICs9IHRhcmdldC5vZmZzZXRMZWZ0O1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZnRPZmZzZXQgLSB0YXJnZXQubGFzdENoaWxkLm9mZnNldExlZnQ7XG59XG5mdW5jdGlvbiBnZXRWYWx1ZShlLCBub2RlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc2xvdFdpZHRoID0gZS5jdXJyZW50VGFyZ2V0Lmxhc3RDaGlsZC5jbGllbnRXaWR0aDtcbiAgICBub2RlLnN0YXRlLnZhbHVlID0gKGUuY2xpZW50WCAtIG5vZGUuc3RhdGUubW91c2UpIC8gc2xvdFdpZHRoICsgbm9kZS5zdGF0ZS5zbGlkZXI7XG4gICAgcmV0dXJuIG5vdGlmeShub2RlKTtcbn1cbmZ1bmN0aW9uIG1vdXNlZG93bihlLCBub2RlKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gZ2V0VGFyZ2V0T2Zmc2V0KGUpO1xuICAgIG5vZGUuc3RhdGUubW91c2UgPSBlLmNsaWVudFg7XG4gICAgaWYgKFsnaHMtc2xpZGVyJywgJ2hzLXNsaWRlci1zbG90J10uaW5kZXhPZihlLnRhcmdldC5jbGFzc05hbWUudHJpbSgpKSA+PSAwKSB7XG4gICAgICAgIGNvbnN0IHNsb3RXaWR0aCA9IGUuY3VycmVudFRhcmdldC5sYXN0Q2hpbGQuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhhbmRsZVdpZHRoID0gZS5jdXJyZW50VGFyZ2V0Lmxhc3RDaGlsZC5sYXN0Q2hpbGQuY2xpZW50V2lkdGg7XG4gICAgICAgIG5vZGUuc3RhdGUubW91c2UgLT0gaGFuZGxlV2lkdGggLyAyO1xuICAgICAgICBub2RlLnN0YXRlLnZhbHVlID0gKGUub2Zmc2V0WCAtIGhhbmRsZVdpZHRoIC8gMiArIG9mZnNldCkgLyBzbG90V2lkdGg7XG4gICAgfVxuICAgIG5vZGUuc3RhdGUuc2xpZGVyID0gbm9kZS5zdGF0ZS52YWx1ZTtcbiAgICBnZXRWYWx1ZShlLCBub2RlKTtcbn1cbmZ1bmN0aW9uIG1vdXNlbW92ZShlLCBub2RlKSB7XG4gICAgaWYgKG5vZGUuc3RhdGUubW91c2UgPiAwKSB7XG4gICAgICAgIGdldFZhbHVlKGUsIG5vZGUpO1xuICAgICAgICBpZiAobm9kZS5zdGF0ZS52YWx1ZSA+IDEgfHwgbm9kZS5zdGF0ZS52YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIG1vdXNldXAoZSwgbm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBtb3VzZXVwKGUsIG5vZGUpIHtcbiAgICBpZiAobm9kZS5zdGF0ZS5tb3VzZSA+IDApIHtcbiAgICAgICAgbm9kZS5zdGF0ZS52YWx1ZSA9IGdldFZhbHVlKGUsIG5vZGUpO1xuICAgICAgICBub2RlLnN0YXRlLm1vdXNlID0gLTE7XG4gICAgfVxufVxuZnVuY3Rpb24gbW91c2VvdXQoZSwgbm9kZSkge1xuICAgIGlmIChub2RlLnN0YXRlLm1vdXNlID4gMCAmJiBlLnRhcmdldC5jbGFzc05hbWUudHJpbSgpID09PSAnaHMtc2xpZGVyJykge1xuICAgICAgICBtb3VzZXVwKGUsIG5vZGUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG5vdGlmeShub2RlKSB7XG4gICAgaWYgKChub2RlLnN0YXRlLnJhbmdlLmxlbmd0aCA+IDEpICYmICh0eXBlb2Ygbm9kZS5zdGF0ZS5yYW5nZVswXSA9PT0gJ3N0cmluZycpKSB7XG4gICAgICAgIGNvbnN0IHYgPSBNYXRoLmZsb29yKG5vZGUuc3RhdGUudmFsdWUgKiAobm9kZS5zdGF0ZS5yYW5nZS5sZW5ndGggLSAxKSArIDAuNSk7XG4gICAgICAgIGlmIChub2RlLnN0YXRlLm5vdGlmaWVkICE9PSBub2RlLnN0YXRlLnJhbmdlW3ZdKSB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLm9uY2hhbmdlKG5vZGUuc3RhdGUucmFuZ2Vbdl0pO1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5ub3RpZmllZCA9IG5vZGUuc3RhdGUucmFuZ2Vbdl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHYgLyAobm9kZS5zdGF0ZS5yYW5nZS5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IG51bVJhbmdlID0gbm9kZS5zdGF0ZS5yYW5nZTtcbiAgICAgICAgY29uc3QgdiA9IE1hdGguZmxvb3IoKG51bVJhbmdlWzBdICogKDEgLSBub2RlLnN0YXRlLnZhbHVlKSArIG51bVJhbmdlWzFdICogbm9kZS5zdGF0ZS52YWx1ZSkgKiAxMDApIC8gMTAwO1xuICAgICAgICBub2RlLnN0YXRlLm9uY2hhbmdlKE1hdGgubWluKG5vZGUuc3RhdGUucmFuZ2VbMV0sIE1hdGgubWF4KG5vZGUuc3RhdGUucmFuZ2VbMF0sIHYpKSk7XG4gICAgICAgIHJldHVybiBub2RlLnN0YXRlLnZhbHVlO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVUyeHBaR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwxTnNhV1JsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVEJEUVN4MVEwRkJiME03UVVGdlFuQkRMRTFCUVdFc1RVRkJUVHRKUVVObUxFMUJRVTBzUTBGQlF5eEpRVUZWTzFGQlEySXNTVUZCU1N4RFFVRkRMRXRCUVVzc1IwRkJSenRaUVVOVUxFdEJRVXNzUlVGQlpTeEZRVUZGTzFsQlEzUkNMRXRCUVVzc1JVRkJSU3hIUVVGSE8xbEJRMVlzUzBGQlN5eEZRVUZGTEVOQlFVTXNRMEZCUXp0WlFVTlVMRTFCUVUwc1JVRkJReXhEUVVGRE8xbEJRMUlzVVVGQlVTeEZRVUZETEVWQlFVVTdXVUZEV0N4UlFVRlJMRVZCUVVVc1IwRkJSeXhGUVVGRkxFZEJRVVVzUTBGQlF6dFRRVU55UWl4RFFVRkRPMGxCUTA0c1EwRkJRenRKUVVORUxFbEJRVWtzUTBGQlF5eEpRVUZYTzFGQlExb3NUVUZCVFN4RlFVRkZMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEZRVUZGTEVOQlFVTTdVVUZEZWtJc1RVRkJUU3hIUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRWxCUVVrc1JVRkJSU3hEUVVGRE8xRkJRMnBETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVNeFF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRkZCUVZFc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXp0UlFVTXhReXhQUVVGUExGbEJRVU1zUTBGQlF5eGpRVUZqTEVkQlFVY3NSVUZCUlN4RlFVRkZPMWxCUXpGQ0xFVkJRVVVzUlVGQlF5eEZRVUZGTzFsQlEwd3NWMEZCVnl4RlFVRkRMRU5CUVVNc1EwRkJTeXhGUVVGRkxFVkJRVVVzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJRenRaUVVONlF5eFhRVUZYTEVWQlFVTXNRMEZCUXl4RFFVRkxMRVZCUVVVc1JVRkJSU3hEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETEVWQlFVVXNTVUZCU1N4RFFVRkRPMWxCUTNwRExGTkJRVk1zUlVGQlF5eERRVUZETEVOQlFVc3NSVUZCU1N4RlFVRkZMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zUlVGQlJTeEpRVUZKTEVOQlFVTTdXVUZEZGtNc1ZVRkJWU3hGUVVGRExFTkJRVU1zUTBGQlN5eEZRVUZITEVWQlFVVXNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF6dFRRVU16UXl4RlFVTkVMRU5CUVVNc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTXhRaXhEUVVGRE8wTkJSMG83UVVFelFrUXNkMEpCTWtKRE8wRkJSVVFzVTBGQlV5eFpRVUZaTEVOQlFVTXNTVUZCVlR0SlFVTTFRaXhQUVVGUExGbEJRVU1zUTBGQlF5eHBRa0ZCYVVJc1JVRkJSVHRSUVVONFFpeFpRVUZETEVOQlFVTXNiMEpCUVc5Q0xFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExGbEJRVmtzUTBGQlF5eERRVUZETzFGQlF6TkVMRmxCUVVNc1EwRkJReXh0UWtGQmJVSXNSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hSUVVGUkxFZEJRVWNzUjBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1IwRkJSeXhGUVVGRkxFTkJRVU03UzBGRGNrVXNRMEZCUXl4RFFVRkRPMEZCUTFBc1EwRkJRenRCUVVWRUxGTkJRVk1zV1VGQldTeERRVUZETEV0QlFXOUNMRVZCUVVVc1EwRkJVU3hGUVVGRkxFOUJRVzFDTzBsQlEzSkZMRTFCUVUwc1MwRkJTeXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4TlFVRk5MRWRCUVVNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRGNrTXNUVUZCVFN4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRExFMUJRVTBzUjBGQlF5eERRVUZETEVOQlFVRXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eEhRVUZETEV0QlFVc3NRMEZCUXp0SlFVTTNReXhQUVVGUExGbEJRVU1zUTBGQlF5eHRRa0ZCYlVJc1JVRkJSU3hGUVVGRExFdEJRVXNzUlVGQlJTeFRRVUZUTEVsQlFVa3NSMEZCUnl4RlFVRkRMRVZCUVVVc1YwRkJWeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTTdRVUZEYWtZc1EwRkJRenRCUVVWRUxGTkJRVk1zVjBGQlZ5eERRVUZETEV0QlFXOUNPMGxCUTNKRExFOUJRVThzV1VGQlF5eERRVUZETEd0Q1FVRnJRaXhGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETzBGQlEzaERMRU5CUVVNN1FVRkpSQ3hUUVVGVExHVkJRV1VzUTBGQlF5eERRVUZMTzBsQlF6RkNMRWxCUVVrc1RVRkJUU3hIUVVGUExFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTTdTVUZETVVJc1NVRkJTU3hWUVVGVkxFZEJRVWNzUTBGQlF5eERRVUZETzBsQlEyNUNMRTlCUVU4c1RVRkJUU3hEUVVGRExGTkJRVk1zUTBGQlF5eEpRVUZKTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNc1lVRkJZU3hEUVVGRExGTkJRVk1zUTBGQlF5eEpRVUZKTEVWQlFVVXNSVUZCUlR0UlFVTnFSU3hWUVVGVkxFbEJRVWtzVFVGQlRTeERRVUZETEZWQlFWVXNRMEZCUXp0UlFVTm9ReXhOUVVGTkxFZEJRVWNzVFVGQlRTeERRVUZETEZWQlFWVXNRMEZCUXp0TFFVTTVRanRKUVVORUxFOUJRVThzVlVGQlZTeEhRVUZITEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1ZVRkJWU3hEUVVGRE8wRkJRM0JFTEVOQlFVTTdRVUZGUkN4VFFVRlRMRkZCUVZFc1EwRkJReXhEUVVGTExFVkJRVVVzU1VGQlZUdEpRVU12UWl4RFFVRkRMRU5CUVVNc1pVRkJaU3hGUVVGRkxFTkJRVU03U1VGRGNFSXNRMEZCUXl4RFFVRkRMR05CUVdNc1JVRkJSU3hEUVVGRE8wbEJRMjVDTEUxQlFVMHNVMEZCVXl4SFFVRkhMRU5CUVVNc1EwRkJReXhoUVVGaExFTkJRVU1zVTBGQlV5eERRVUZETEZkQlFWY3NRMEZCUXp0SlFVTjRSQ3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGUExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhUUVVGVExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNN1NVRkRiRVlzVDBGQlR5eE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1FVRkRlRUlzUTBGQlF6dEJRVVZFTEZOQlFWTXNVMEZCVXl4RFFVRkRMRU5CUVVzc1JVRkJSU3hKUVVGVk8wbEJRMmhETEUxQlFVMHNUVUZCVFN4SFFVRkhMR1ZCUVdVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5zUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNUMEZCVHl4RFFVRkRPMGxCUXpkQ0xFbEJRVWtzUTBGQlF5eFhRVUZYTEVWQlFVVXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNTVUZCUlN4RFFVRkRMRVZCUVVVN1VVRkRka1VzVFVGQlRTeFRRVUZUTEVkQlFVY3NRMEZCUXl4RFFVRkRMR0ZCUVdFc1EwRkJReXhUUVVGVExFTkJRVU1zVjBGQlZ5eERRVUZETzFGQlEzaEVMRTFCUVUwc1YwRkJWeXhIUVVGSExFTkJRVU1zUTBGQlF5eGhRVUZoTEVOQlFVTXNVMEZCVXl4RFFVRkRMRk5CUVZNc1EwRkJReXhYUVVGWExFTkJRVU03VVVGRGNFVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFbEJRVWtzVjBGQlZ5eEhRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnNReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGUExFZEJRVWNzVjBGQlZ5eEhRVUZETEVOQlFVTXNSMEZCUnl4TlFVRk5MRU5CUVVNc1IwRkJSeXhUUVVGVExFTkJRVU03UzBGRGRrVTdTVUZEUkN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJRenRKUVVOeVF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8wRkJRM1JDTEVOQlFVTTdRVUZGUkN4VFFVRlRMRk5CUVZNc1EwRkJReXhEUVVGTExFVkJRVVVzU1VGQlZUdEpRVU5vUXl4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEhRVUZETEVOQlFVTXNSVUZCUlR0UlFVTndRaXhSUVVGUkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTJ4Q0xFbEJRVWtzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhKUVVGSkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRkhMRU5CUVVNc1JVRkJSVHRaUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1UwRkJSVHRMUVVNeFJUdEJRVU5NTEVOQlFVTTdRVUZGUkN4VFFVRlRMRTlCUVU4c1EwRkJReXhEUVVGTExFVkJRVVVzU1VGQlZUdEpRVU01UWl4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEhRVUZETEVOQlFVTXNSVUZCUlR0UlFVTndRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4UlFVRlJMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEzSkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMHRCUTNwQ08wRkJRMHdzUTBGQlF6dEJRVVZFTEZOQlFWTXNVVUZCVVN4RFFVRkRMRU5CUVVzc1JVRkJSU3hKUVVGVk8wbEJReTlDTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFZEJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExFbEJRVWtzUlVGQlJTeExRVUZMTEZkQlFWY3NSVUZCUlR0UlFVTnFSU3hQUVVGUExFTkJRVU1zUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMHRCUTNCQ08wRkJRMHdzUTBGQlF6dEJRVVZFTEZOQlFWTXNUVUZCVFN4RFFVRkRMRWxCUVZVN1NVRkRkRUlzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVrc1VVRkJVU3hEUVVGRExFVkJRVVU3VVVGRE0wVXNUVUZCVFN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTXpSU3hKUVVGSkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4TFFVRkxMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZPMWxCUXpkRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRla01zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRWRCUVZjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1UwRkRja1E3VVVGRlJDeFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRMUVVNeFF6dFRRVUZOTzFGQlEwZ3NUVUZCVFN4UlFVRlJMRWRCUVhGQ0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRPMUZCUTNCRUxFMUJRVTBzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4UlFVRlJMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJReXhIUVVGSExFTkJRVU1zUjBGQlF5eEhRVUZITEVOQlFVTTdVVUZEYUVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJVeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZUTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOeVJ5eFBRVUZQTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRE8wdEJRek5DTzBGQlEwd3NRMEZCUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IFNlbGVjdG9yXzEgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNsYXNzIFRvZ2dsZUJ1dHRvbiBleHRlbmRzIFNlbGVjdG9yXzEuU2VsZWN0b3Ige1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIHN1cGVyLm9uaW5pdChub2RlKTtcbiAgICAgICAgbm9kZS5zdGF0ZS5tb3VzZURvd25DU1MgPSAnJztcbiAgICAgICAgbm9kZS5zdGF0ZS5ldmVudHMubW91c2VEb3duID0gKCkgPT4gbm9kZS5zdGF0ZS5tb3VzZURvd25DU1MgPSAnLmhzLWJ1dHRvbi1wcmVzc2VkJztcbiAgICAgICAgbm9kZS5zdGF0ZS5ldmVudHMubW91c2VVcCA9ICgpID0+IG5vZGUuc3RhdGUubW91c2VEb3duQ1NTID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUuaXRlbUNsaWNrZWQgPSAodGl0bGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGkgPSBub2RlLnN0YXRlLml0ZW1zLm1hcCgoaSkgPT4gaS50aXRsZSkuaW5kZXhPZih0aXRsZSk7XG4gICAgICAgICAgICBjb25zdCBuZXdUaXRsZSA9IG5vZGUuc3RhdGUuaXRlbXNbKGkgKyAxKSAlIG5vZGUuc3RhdGUuaXRlbXMubGVuZ3RoXS50aXRsZTtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuaXRlbXNbdGl0bGVdLmlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuaXRlbXNbbmV3VGl0bGVdLmlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIG5ld1RpdGxlO1xuICAgICAgICB9O1xuICAgICAgICBTZWxlY3Rvcl8xLlNlbGVjdG9yLmVuc3VyZVNlbGVjdGVkKG5vZGUpO1xuICAgIH1cbiAgICBvbnVwZGF0ZShub2RlKSB7XG4gICAgICAgIHN1cGVyLm9udXBkYXRlKG5vZGUpO1xuICAgICAgICBTZWxlY3Rvcl8xLlNlbGVjdG9yLmVuc3VyZVNlbGVjdGVkKG5vZGUpO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgY29uc3QgY3NzID0gbm9kZS5hdHRycy5jc3MgfHwgJyc7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gbm9kZS5hdHRycy5zdHlsZSB8fCAnJztcbiAgICAgICAgY29uc3QgaSA9IG5vZGUuc3RhdGUuaXRlbXMuZmluZEluZGV4KChpKSA9PiBpLmlzU2VsZWN0ZWQpO1xuICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKGAuaHMtdG9nZ2xlLWJ1dHRvbiAke2Nzc30gJHtub2RlLnN0YXRlLm1vdXNlRG93bkNTU31gLCB7IHN0eWxlOiBzdHlsZSB9LCBoc2xheW91dF8xLm0oJ3NwYW4nLCBTZWxlY3Rvcl8xLlNlbGVjdG9yLnJlbmRlckl0ZW0obm9kZSwgaSkpKTtcbiAgICB9XG59XG5leHBvcnRzLlRvZ2dsZUJ1dHRvbiA9IFRvZ2dsZUJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVZHOW5aMnhsUW5WMGRHOXVMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDFSdloyZHNaVUoxZEhSdmJpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVdsRFFTeDFRMEZCYjBRN1FVRkRjRVFzZVVOQlFYTkVPMEZCYlVKMFJDeE5RVUZoTEZsQlFXRXNVMEZCVVN4dFFrRkJVVHRKUVVOMFF5eE5RVUZOTEVOQlFVTXNTVUZCVlR0UlFVTmlMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEYmtJc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUXpkQ0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRk5CUVZNc1IwRkJSeXhIUVVGSExFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRmxCUVZrc1IwRkJSeXh2UWtGQmIwSXNRMEZCUXp0UlFVTnVSaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRWRCUVVzc1IwRkJSeXhGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WlFVRlpMRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJSV3BGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1YwRkJWeXhIUVVGRkxFTkJRVU1zUzBGQldTeEZRVUZQTEVWQlFVVTdXVUZETVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlowSXNSVUZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRaUVVNMVJTeE5RVUZOTEZGQlFWRXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU03V1VGRGVrVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNWVUZCVlN4SFFVRkhMRXRCUVVzc1EwRkJRenRaUVVNelF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF5eFZRVUZWTEVkQlFVY3NTVUZCU1N4RFFVRkRPMWxCUXpkRExFOUJRVThzVVVGQlVTeERRVUZETzFGQlEzQkNMRU5CUVVNc1EwRkJRenRSUVVOR0xHMUNRVUZSTEVOQlFVTXNZMEZCWXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRMnhETEVOQlFVTTdTVUZEUkN4UlFVRlJMRU5CUVVNc1NVRkJWenRSUVVOb1FpeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM0pDTEcxQ1FVRlJMRU5CUVVNc1kwRkJZeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzBsQlEyeERMRU5CUVVNN1NVRkRSQ3hKUVVGSkxFTkJRVU1zU1VGQlZ6dFJRVU5hTEUxQlFVMHNSMEZCUnl4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVTnFReXhOUVVGTkxFdEJRVXNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1NVRkJTU3hGUVVGRkxFTkJRVU03VVVGRGNrTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNc1EwRkJaMElzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRE8xRkJSWHBGTEU5QlFVOHNXVUZCUXl4RFFVRkRMSEZDUVVGeFFpeEhRVUZITEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhaUVVGWkxFVkJRVVVzUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUXl4TFFVRkxMRVZCUVVNc1JVRkJSU3haUVVGRExFTkJRVU1zVFVGQlRTeEZRVU53Uml4dFFrRkJVU3hEUVVGRExGVkJRVlVzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUXk5Q0xFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdRMEZEU2p0QlFUZENSQ3h2UTBFMlFrTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuZXhwb3J0cy5CdXR0b25TeW1ib2xzID0ge1xuICAgIGNyb3NzOiB7IHN5bTogJyZ0aW1lczsnIH0sXG4gICAgbWludXM6IHsgc3ltOiAnJm1pbnVzOycgfSxcbiAgICBwbHVzOiB7IHN5bTogJysnIH0sXG4gICAgZExlZnQ6IHsgc3ltOiAnJmxhcXVvOycgfSxcbiAgICBkUmlnaHQ6IHsgc3ltOiAnJnJhcXVvOycgfSxcbiAgICBsZWZ0OiB7IHN5bTogJyZsc2FxdW87JyB9LFxuICAgIHJpZ2h0OiB7IHN5bTogJyZyc2FxdW87JyB9LFxuICAgIGxlZnRUcmk6IHsgc3ltOiAnJmx0cmlmOycgfSxcbiAgICByaWdodFRyaTogeyBzeW06ICcmcnRyaWY7JyB9LFxuICAgIHVwVHJpOiB7IHN5bTogJyZ1dHJpZjsnIH0sXG4gICAgZG93blRyaTogeyBzeW06ICcmZHRyaWY7JyB9LFxuICAgIHVwOiB7IHN5bTogJyZhbmQ7JyB9LFxuICAgIGRvd246IHsgc3ltOiAnJm9yOycgfSxcbiAgICBsQXJyb3c6IHsgc3ltOiAnJmxhcnI7JyB9LFxuICAgIHJBcnJvdzogeyBzeW06ICcmcmFycjsnIH0sXG4gICAgdUFycm93OiB7IHN5bTogJyZ1YXJyOycgfSxcbiAgICBkQXJyb3c6IHsgc3ltOiAnJmRhcnI7JyB9LFxuICAgIGVtcHR5OiB7IHN5bTogJyYjOTY3NTsnIH0sXG4gICAgZW1wdHlTbGFzaDogeyBzeW06ICcmZW1wdHk7JyB9LFxuICAgIG9TbGFzaDogeyBzeW06ICcmb3NsYXNoOycgfSxcbiAgICBvOiB7IHN5bTogJyZvbWljcm9uOycgfSxcbiAgICBsaW5lczM6IHsgc3ltOiAnJmVxdWl2OycgfSxcbiAgICBzdW06IHsgc3ltOiAnJlNpZ21hOycgfSxcbiAgICBlbGxpcHNpczogeyBzeW06ICcmaGVsbGlwOycgfSxcbiAgICB2ZXJ0RWxsaXBzOiB7IHN5bTogJyYjODI4NTsnIH0sXG4gICAgYnVsbGV0OiB7IHN5bTogJyZidWxsOycgfSxcbiAgICBlbnRlcjogeyBzeW06ICcmY3JhcnI7JyB9LFxuICAgIGFnYWluOiB7IHN5bTogJyYjODYzNTsnIH0sXG4gICAgc3RhcnQ6IHsgc3ltOiAnJiM4Njg5OycgfSxcbiAgICBlbmQ6IHsgc3ltOiAnJiM4NjkwOycgfVxufTtcbmNsYXNzIFRvb2xiYXJCdXR0b24ge1xuICAgIHN0YXRpYyBnZXRTeW1ib2wobmFtZSkge1xuICAgICAgICByZXR1cm4gZXhwb3J0cy5CdXR0b25TeW1ib2xzW25hbWVdID8gZXhwb3J0cy5CdXR0b25TeW1ib2xzW25hbWVdLnN5bSA6ICcnO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlLmF0dHJzLnN5bWJvbHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCcuaHMtY29ybmVyLWJ1dHRvbicsIHsgb25jbGljazogbm9kZS5hdHRycy5vbmNsaWNrIH0sIGhzbGF5b3V0XzEubS50cnVzdChub2RlLmF0dHJzLnN5bWJvbHMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oJy5ocy1jb3JuZXItYnV0dG9uJywgeyBvbmNsaWNrOiBub2RlLmF0dHJzLm9uY2xpY2sgfSwgbm9kZS5hdHRycy5zeW1ib2xzLm1hcCgoc3ltKSA9PiBoc2xheW91dF8xLm0udHJ1c3Qoc3ltKSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5Ub29sYmFyQnV0dG9uID0gVG9vbGJhckJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVZHOXZiR0poY2tKMWRIUnZiaTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMM055WXk5VWIyOXNZbUZ5UW5WMGRHOXVMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQk1rVkJMSFZEUVVGdlF6dEJRVVYyUWl4UlFVRkJMR0ZCUVdFc1IwRkJSenRKUVVONlFpeExRVUZMTEVWQlFVOHNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRk8wbEJRemxDTEV0QlFVc3NSVUZCVHl4RlFVRkZMRWRCUVVjc1JVRkJSU3hUUVVGVExFVkJRVU03U1VGRE4wSXNTVUZCU1N4RlFVRlJMRVZCUVVVc1IwRkJSeXhGUVVGRkxFZEJRVWNzUlVGQlF6dEpRVU4yUWl4TFFVRkxMRVZCUVU4c1JVRkJSU3hIUVVGSExFVkJRVVVzVTBGQlV5eEZRVUZETzBsQlF6ZENMRTFCUVUwc1JVRkJUU3hGUVVGRkxFZEJRVWNzUlVGQlJTeFRRVUZUTEVWQlFVTTdTVUZETjBJc1NVRkJTU3hGUVVGUkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEZWQlFWVXNSVUZCUXp0SlFVTTVRaXhMUVVGTExFVkJRVThzUlVGQlJTeEhRVUZITEVWQlFVVXNWVUZCVlN4RlFVRkRPMGxCUXpsQ0xFOUJRVThzUlVGQlN5eEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVNN1NVRkROMElzVVVGQlVTeEZRVUZKTEVWQlFVVXNSMEZCUnl4RlFVRkZMRk5CUVZNc1JVRkJRenRKUVVNM1FpeExRVUZMTEVWQlFVOHNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRE8wbEJRemRDTEU5QlFVOHNSVUZCU3l4RlFVRkZMRWRCUVVjc1JVRkJSU3hUUVVGVExFVkJRVU03U1VGRE4wSXNSVUZCUlN4RlFVRlZMRVZCUVVVc1IwRkJSeXhGUVVGRkxFOUJRVThzUlVGQlF6dEpRVU16UWl4SlFVRkpMRVZCUVZFc1JVRkJSU3hIUVVGSExFVkJRVVVzVFVGQlRTeEZRVUZETzBsQlF6RkNMRTFCUVUwc1JVRkJUU3hGUVVGRkxFZEJRVWNzUlVGQlJTeFJRVUZSTEVWQlFVTTdTVUZETlVJc1RVRkJUU3hGUVVGTkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEZGQlFWRXNSVUZCUXp0SlFVTTFRaXhOUVVGTkxFVkJRVTBzUlVGQlJTeEhRVUZITEVWQlFVVXNVVUZCVVN4RlFVRkRPMGxCUXpWQ0xFMUJRVTBzUlVGQlRTeEZRVUZGTEVkQlFVY3NSVUZCUlN4UlFVRlJMRVZCUVVNN1NVRkROVUlzUzBGQlN5eEZRVUZQTEVWQlFVVXNSMEZCUnl4RlFVRkZMRk5CUVZNc1JVRkJRenRKUVVNM1FpeFZRVUZWTEVWQlFVVXNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRE8wbEJRemRDTEUxQlFVMHNSVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSU3hWUVVGVkxFVkJRVU03U1VGRE9VSXNRMEZCUXl4RlFVRlhMRVZCUVVVc1IwRkJSeXhGUVVGRkxGZEJRVmNzUlVGQlF6dEpRVU12UWl4TlFVRk5MRVZCUVUwc1JVRkJSU3hIUVVGSExFVkJRVVVzVTBGQlV5eEZRVUZETzBsQlF6ZENMRWRCUVVjc1JVRkJVeXhGUVVGRkxFZEJRVWNzUlVGQlJTeFRRVUZUTEVWQlFVTTdTVUZETjBJc1VVRkJVU3hGUVVGSkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEZWQlFWVXNSVUZCUXp0SlFVTTVRaXhWUVVGVkxFVkJRVVVzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkRPMGxCUXpkQ0xFMUJRVTBzUlVGQlRTeEZRVUZGTEVkQlFVY3NSVUZCUlN4UlFVRlJMRVZCUVVNN1NVRkROVUlzUzBGQlN5eEZRVUZQTEVWQlFVVXNSMEZCUnl4RlFVRkZMRk5CUVZNc1JVRkJRenRKUVVNM1FpeExRVUZMTEVWQlFVOHNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRE8wbEJRemRDTEV0QlFVc3NSVUZCVHl4RlFVRkZMRWRCUVVjc1JVRkJSU3hUUVVGVExFVkJRVU03U1VGRE4wSXNSMEZCUnl4RlFVRlRMRVZCUVVVc1IwRkJSeXhGUVVGRkxGTkJRVk1zUlVGQlF6dERRVU5vUXl4RFFVRkRPMEZCUlVZc1RVRkJZU3hoUVVGaE8wbEJSWFJDTEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1NVRkJWenRSUVVONFFpeFBRVUZQTEhGQ1FVRmhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVUVzUTBGQlF5eERRVUZETEhGQ1FVRmhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNN1NVRkROMFFzUTBGQlF6dEpRVU5FTEVsQlFVa3NRMEZCUXl4SlFVRlZPMUZCUTFnc1NVRkJTU3hQUVVGUExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4TFFVRkxMRkZCUVZFc1JVRkJSVHRaUVVONFF5eFBRVUZQTEZsQlFVTXNRMEZCUXl4dFFrRkJiVUlzUlVGRGVFSXNSVUZCUlN4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVWQlFVVXNSVUZETDBJc1dVRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVNNVFpeERRVUZETzFOQlEwdzdZVUZCVFR0WlFVTklMRTlCUVU4c1dVRkJReXhEUVVGRExHMUNRVUZ0UWl4RlFVTndRaXhGUVVGRkxFOUJRVThzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1JVRkJSU3hGUVVNdlFpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEhRVUZWTEVWQlFVVXNSVUZCUlN4RFFVRkJMRmxCUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZETVVRc1EwRkJRenRUUVVOTU8wbEJRMHdzUTBGQlF6dERRVU5LTzBGQmJFSkVMSE5EUVd0Q1F5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5mdW5jdGlvbiBlbXBoYXNpemUoaXRlbSwgbWF0Y2gpIHtcbiAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAobWF0Y2gsICdnaScpO1xuICAgIGNvbnN0IGRlY29yYXRpb25zID0gaXRlbVxuICAgICAgICAucmVwbGFjZShyZSwgKG0pID0+IGA8Yj4ke219PC9iPmApXG4gICAgICAgIC5zcGxpdCgnPCcpXG4gICAgICAgIC5tYXAoKHMpID0+IHtcbiAgICAgICAgaWYgKHMuc3RhcnRzV2l0aCgnL2I+JykpIHtcbiAgICAgICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oJ3NwYW4nLCB7IG5hbWU6IGl0ZW0gfSwgcy5zbGljZSgzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocy5zdGFydHNXaXRoKCdiPicpKSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCdiJywgeyBuYW1lOiBpdGVtIH0sIHMuc2xpY2UoMikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnc3BhbicsIHsgbmFtZTogaXRlbSB9LCBzKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBoc2xheW91dF8xLm0oJ3NwYW4nLCBkZWNvcmF0aW9ucyk7XG59XG5jbGFzcyBHZXRMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0LCBtYXApIHtcbiAgICAgICAgdGhpcy5saXN0ID0gW107XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGhzbGF5b3V0XzEubS5yZXF1ZXN0KHsgbWV0aG9kOiBcIkdFVFwiLCB1cmw6IGxpc3QgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gdGhpcy5jYXB0dXJlTGlzdChkYXRhLCBtYXApKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FwdHVyZUxpc3QobGlzdCwgbWFwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXB0dXJlTGlzdChsaXN0LCBtYXApIHtcbiAgICAgICAgdGhpcy5saXN0ID0gbWFwID8gbWFwKGxpc3QpIDogbGlzdDtcbiAgICB9XG59XG5jbGFzcyBUeXBlQWhlYWQge1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIG5vZGUuc3RhdGUuaW5wdXROb2RlID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUuaGlkZVBvcGRvd24gPSB0cnVlO1xuICAgICAgICBub2RlLnN0YXRlLnZhbHVlID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUudHlwZUFoZWFkTGlzdCA9IFtdO1xuICAgICAgICBub2RlLnN0YXRlLm9uc3VibWl0ID0gbm9kZS5hdHRycy5vbnN1Ym1pdDtcbiAgICAgICAgbm9kZS5zdGF0ZS5saXN0ID0gbm9kZS5hdHRycy5saXN0O1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgY29uc3QgZ2wgPSBuZXcgR2V0TGlzdChub2RlLnN0YXRlLmxpc3QpO1xuICAgICAgICBjb25zdCBub3N1Ym1pdCA9ICgpID0+IGNvbnNvbGUubG9nKCdubyBzdWJtaXQgZnVuY3Rpb24gZGVmaW5lZCcpO1xuICAgICAgICBjb25zdCBzdWJtaXQgPSAodikgPT4ge1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5pbnB1dE5vZGUuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgbm9kZS5zdGF0ZS5pbnB1dE5vZGUudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuaGlkZVBvcGRvd24gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUuc3RhdGUub25zdWJtaXQgPyBub2RlLnN0YXRlLm9uc3VibWl0KHYpIDogbm9zdWJtaXQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5pbnB1dE5vZGUudmFsdWUgPSBlLnRhcmdldC5hdHRyaWJ1dGVzLm5hbWUudmFsdWU7XG4gICAgICAgICAgICAgICAgc3VibWl0KGUudGFyZ2V0LmF0dHJpYnV0ZXMubmFtZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGlucHV0ID0gKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBub2RlLnN0YXRlLmlucHV0Tm9kZSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBub2RlLnN0YXRlLnZhbHVlID0gbi52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHdpdGhpbklucHV0ID0gbmV3IFJlZ0V4cChgJHtpbnB1dH1gLCAnZ2knKTtcbiAgICAgICAgICAgIGNvbnN0IGJlZ2lubmluZ09mSW5wdXQgPSBuZXcgUmVnRXhwKGBeJHtpbnB1dH1gLCAnZ2knKTtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUudHlwZUFoZWFkTGlzdCA9IGdsLmxpc3QuZmlsdGVyKChsKSA9PiBsLm1hdGNoKHdpdGhpbklucHV0KSk7XG4gICAgICAgICAgICBuLnZhbHVlID0gbm9kZS5zdGF0ZS50eXBlQWhlYWRMaXN0LmZpbHRlcigobCkgPT4gbC5tYXRjaChiZWdpbm5pbmdPZklucHV0KSlbMF0gfHwgaW5wdXQ7XG4gICAgICAgICAgICBub2RlLnN0YXRlLmhpZGVQb3Bkb3duID0gbi52YWx1ZS5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICBsZXQgcG9zID0gaW5wdXQubGVuZ3RoO1xuICAgICAgICAgICAgbi5zZXRTZWxlY3Rpb25SYW5nZShwb3MsIG4udmFsdWUubGVuZ3RoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qga2V5UHJlc3NlZCA9IChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuID0gbm9kZS5zdGF0ZS5pbnB1dE5vZGUgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGlmIChlLmNvZGUgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICBzdWJtaXQobi52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlLmNvZGUgPT09ICdCYWNrc3BhY2UnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBuLmZpcnN0Q2hpbGQuZGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBuLnZhbHVlID0gaW5wdXQuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBpbnB1dE5vZGUgPSB7XG4gICAgICAgICAgICBjb250ZW50ZWRpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogbm9kZS5hdHRycy5wbGFjZWhvbGRlcixcbiAgICAgICAgICAgIGF1dG9mb2N1czogbm9kZS5hdHRycy5hdXRvZm9jdXMgfHwgdHJ1ZSxcbiAgICAgICAgICAgIG9ua2V5ZG93bjoga2V5UHJlc3NlZCxcbiAgICAgICAgICAgIG9uaW5wdXQ6IGlucHV0XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oJy5ocy1mb3JtJywgW1xuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKGBpbnB1dC5ocy10eXBlYWhlYWQtaW5wdXQke25vZGUuc3RhdGUudmFsdWUgPyAnLmhzLXR5cGVhaGVhZC12YWx1ZScgOiAnLmhzLXR5cGVhaGVhZC1wbGFjZWhvbGRlcid9YCwgaW5wdXROb2RlLCBoc2xheW91dF8xLm0udHJ1c3Qobm9kZS5zdGF0ZS52YWx1ZSA/IG5vZGUuc3RhdGUudmFsdWUgOiBub2RlLmF0dHJzLnBsYWNlaG9sZGVyKSksXG4gICAgICAgICAgICBub2RlLnN0YXRlLmhpZGVQb3Bkb3duID8gdW5kZWZpbmVkIDpcbiAgICAgICAgICAgICAgICBoc2xheW91dF8xLm0oJy5ocy10eXBlYWhlYWQtbGlzdCcsIG5vZGUuc3RhdGUudHlwZUFoZWFkTGlzdC5tYXAoKGwpID0+IGhzbGF5b3V0XzEubSgnJywgeyBvbmNsaWNrOiBzZWxlY3QgfSwgZW1waGFzaXplKGwsIG5vZGUuc3RhdGUudmFsdWUpKSkpXG4gICAgICAgIF0pO1xuICAgIH1cbn1cbmV4cG9ydHMuVHlwZUFoZWFkID0gVHlwZUFoZWFkO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVkhsd1pVRm9aV0ZrTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwxUjVjR1ZCYUdWaFpDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVRCRFFTeDFRMEZCYjBNN1FVRkhjRU1zVTBGQlV5eFRRVUZUTEVOQlFVTXNTVUZCVnl4RlFVRkZMRXRCUVZrN1NVRkRlRU1zVFVGQlRTeEZRVUZGTEVkQlFVY3NTVUZCU1N4TlFVRk5MRU5CUVVNc1MwRkJTeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzBsQlEyNURMRTFCUVUwc1YwRkJWeXhIUVVGSExFbEJRVWs3VTBGRGJrSXNUMEZCVHl4RFFVRkRMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVkVzUlVGQlJTeEZRVUZGTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJRenRUUVVONFF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRPMU5CUTFZc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlVTeEZRVUZGTEVWQlFVVTdVVUZEWkN4SlFVRkpMRU5CUVVNc1EwRkJReXhWUVVGVkxFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVVTdXVUZEY2tJc1QwRkJUeXhaUVVGRExFTkJRVU1zVFVGQlRTeEZRVUZGTEVWQlFVTXNTVUZCU1N4RlFVRkRMRWxCUVVrc1JVRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVNM1F6dGhRVUZOTEVsQlFVa3NRMEZCUXl4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJUdFpRVU16UWl4UFFVRlBMRmxCUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlF5eEpRVUZKTEVWQlFVTXNTVUZCU1N4RlFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMU5CUXpGRE8yRkJRVTA3V1VGRFNDeFBRVUZQTEZsQlFVTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1JVRkJReXhKUVVGSkxFVkJRVU1zU1VGQlNTeEZRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1UwRkRjRU03U1VGRFRDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRTlCUVU4c1dVRkJReXhEUVVGRExFMUJRVTBzUlVGQlJTeFhRVUZYTEVOQlFVTXNRMEZCUXp0QlFVTnNReXhEUVVGRE8wRkJSVVFzVFVGQlRTeFBRVUZQTzBsQlMxUXNXVUZCV1N4SlFVRnZRaXhGUVVGRkxFZEJRVEpDTzFGQlNuUkVMRk5CUVVrc1IwRkJXU3hGUVVGRkxFTkJRVU03VVVGTGRFSXNTVUZCU1N4UFFVRlBMRWxCUVVrc1MwRkJTeXhSUVVGUkxFVkJRVVU3V1VGRE1VSXNXVUZCUXl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRkxFMUJRVTBzUlVGQlJTeExRVUZMTEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrc1JVRkJSU3hEUVVGRE8ybENRVU4wUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGVkxFVkJRVVVzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdVMEZEZEVRN1lVRkJUVHRaUVVOSUxFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8xTkJReTlDTzBsQlEwd3NRMEZCUXp0SlFWWlBMRmRCUVZjc1EwRkJReXhKUVVGVkxFVkJRVVVzUjBGQmRVSTdVVUZEYmtRc1NVRkJTU3hEUVVGRExFbEJRVWtzUjBGQlJ5eEhRVUZITEVOQlFVRXNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRPMGxCUTNSRExFTkJRVU03UTBGVFNqdEJRVVZFTEUxQlFXRXNVMEZCVXp0SlFVTnNRaXhOUVVGTkxFTkJRVU1zU1VGQlZUdFJRVU5pTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1UwRkJVeXhIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU14UWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRVmNzUjBGQlJ5eEpRVUZKTEVOQlFVTTdVVUZET1VJc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUTNSQ0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNZVUZCWVN4SFFVRkhMRVZCUVVVc1EwRkJRenRSUVVNNVFpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRkZCUVZFc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXp0UlFVTXhReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF6dEpRVU4wUXl4RFFVRkRPMGxCUTBRc1NVRkJTU3hEUVVGRExFbEJRVlU3VVVGRFdDeE5RVUZOTEVWQlFVVXNSMEZCUnl4SlFVRkpMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNoRExFMUJRVTBzVVVGQlVTeEhRVUZITEVkQlFVY3NSVUZCUlN4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zTkVKQlFUUkNMRU5CUVVNc1EwRkJRenRSUVVOcVJTeE5RVUZOTEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVZFc1JVRkJSU3hGUVVGRk8xbEJRM2hDTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1UwRkJVeXhEUVVGRExHbENRVUZwUWl4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZOQlFWTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03V1VGRE4wVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFZEJRVWNzU1VGQlNTeERRVUZETzFsQlF6bENMRTlCUVU4c1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVRXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF6dFJRVU53UlN4RFFVRkRMRU5CUVVNN1VVRkRSaXhOUVVGTkxFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVc3NSVUZCUlN4RlFVRkZPMWxCUVVjc1NVRkJTU3hEUVVGRExFVkJRVVU3WjBKQlF5OUNMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExGVkJRVlVzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRPMmRDUVVNMVJDeE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTFCUVUwc1EwRkJReXhWUVVGVkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMkZCUXpGRE8xRkJRVUVzUTBGQlF5eERRVUZETzFGQlEwZ3NUVUZCVFN4TFFVRkxMRWRCUVVjc1EwRkJReXhEUVVGTExFVkJRVVVzUlVGQlJUdFpRVU53UWl4TlFVRk5MRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZOQlFWTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRE8xbEJRekZETEUxQlFVMHNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEhRVUZITEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNN1dVRkRla01zVFVGQlRTeFhRVUZYTEVkQlFVY3NTVUZCU1N4TlFVRk5MRU5CUVVNc1IwRkJSeXhMUVVGTExFVkJRVVVzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0WlFVTnFSQ3hOUVVGTkxHZENRVUZuUWl4SFFVRkhMRWxCUVVrc1RVRkJUU3hEUVVGRExFbEJRVWtzUzBGQlN5eEZRVUZGTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkRka1FzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4aFFVRmhMRWRCUVVjc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRlJMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNNVJTeERRVUZETEVOQlFVTXNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zWVVGQllTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVZFc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4blFrRkJaMElzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhEUVVGRE8xbEJReTlHTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1YwRkJWeXhIUVVGSExFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4TFFVRkhMRU5CUVVNc1EwRkJRenRaUVVNMVF5eEpRVUZKTEVkQlFVY3NSMEZCUnl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRE8xbEJRM1pDTEVOQlFVTXNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dFJRVU0zUXl4RFFVRkRMRU5CUVVNN1VVRkRSaXhOUVVGTkxGVkJRVlVzUjBGQlJ5eERRVUZETEVOQlFVc3NSVUZCUlN4RlFVRkZPMWxCUTNwQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1UwRkJVeXhIUVVGSExFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTTdXVUZETVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEU5QlFVOHNSVUZCUlR0blFrRkRjRUlzVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRoUVVOdVFqdHBRa0ZCVFN4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzVjBGQlZ5eEZRVUZGTzJkQ1FVTXZRaXhOUVVGTkxFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJRenRuUWtGRGFFTXNTVUZCU1N4TFFVRkxMRU5CUVVNc1RVRkJUU3hIUVVGSExFTkJRVU1zUlVGQlJUdHZRa0ZEYkVJc1EwRkJReXhEUVVGRExFdEJRVXNzUjBGQlJ5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8ybENRVU0xUWp0aFFVTktPMUZCUTB3c1EwRkJReXhEUVVGRE8xRkJRMFlzVFVGQlRTeFRRVUZUTEVkQlFVYzdXVUZEWkN4bFFVRmxMRVZCUVVNc1NVRkJTVHRaUVVOd1FpeFhRVUZYTEVWQlFVc3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWE8xbEJRM1JETEZOQlFWTXNSVUZCVHl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGTkJRVk1zU1VGQlNTeEpRVUZKTzFsQlF6VkRMRk5CUVZNc1JVRkJUeXhWUVVGVk8xbEJRekZDTEU5QlFVOHNSVUZCVXl4TFFVRkxPMU5CUTNoQ0xFTkJRVU03VVVGRlJpeFBRVUZQTEZsQlFVTXNRMEZCUXl4VlFVRlZMRVZCUVVVN1dVRkRha0lzV1VGQlF5eERRVUZETERKQ1FVRXlRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUVN4RFFVRkRMRU5CUVVFc2NVSkJRWEZDTEVOQlFVTXNRMEZCUXl4RFFVRkRMREpDUVVFeVFpeEZRVUZGTEVWQlF5OUdMRk5CUVZNc1JVRkRWQ3haUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGQkxFTkJRVU1zUTBGQlFTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkRkRVU3V1VGRFJDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRmRCUVZjc1EwRkJRU3hEUVVGRExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdaMEpCUXk5Q0xGbEJRVU1zUTBGQlF5eHZRa0ZCYjBJc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEdGQlFXRXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGUkxFVkJRVVVzUlVGQlJTeERRVU01UkN4WlFVRkRMRU5CUVVNc1JVRkJSU3hGUVVGRkxFVkJRVVVzVDBGQlR5eEZRVUZGTEUxQlFVMHNSVUZCUlN4RlFVRkZMRk5CUVZNc1EwRkJReXhEUVVGRExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VTBGRGRrVXNRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJRenREUVVOS08wRkJOMFJFTERoQ1FUWkVReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTWVudV8xID0gcmVxdWlyZShcIi4vTWVudVwiKTtcbmV4cG9ydHMuTWVudSA9IE1lbnVfMS5NZW51O1xudmFyIEJ1dHRvbl8xID0gcmVxdWlyZShcIi4vQnV0dG9uXCIpO1xuZXhwb3J0cy5CdXR0b24gPSBCdXR0b25fMS5CdXR0b247XG52YXIgTGFiZWxfMSA9IHJlcXVpcmUoXCIuL0xhYmVsXCIpO1xuZXhwb3J0cy5MYWJlbCA9IExhYmVsXzEuTGFiZWw7XG52YXIgU2xpZGVyXzEgPSByZXF1aXJlKFwiLi9TbGlkZXJcIik7XG5leHBvcnRzLlNsaWRlciA9IFNsaWRlcl8xLlNsaWRlcjtcbnZhciBSYWRpb0J1dHRvbl8xID0gcmVxdWlyZShcIi4vUmFkaW9CdXR0b25cIik7XG5leHBvcnRzLlJhZGlvQnV0dG9uID0gUmFkaW9CdXR0b25fMS5SYWRpb0J1dHRvbjtcbnZhciBPcHRpb25zQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9PcHRpb25zQnV0dG9uXCIpO1xuZXhwb3J0cy5PcHRpb25zQnV0dG9uID0gT3B0aW9uc0J1dHRvbl8xLk9wdGlvbnNCdXR0b247XG52YXIgVG9nZ2xlQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9Ub2dnbGVCdXR0b25cIik7XG5leHBvcnRzLlRvZ2dsZUJ1dHRvbiA9IFRvZ2dsZUJ1dHRvbl8xLlRvZ2dsZUJ1dHRvbjtcbnZhciBUb29sYmFyQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9Ub29sYmFyQnV0dG9uXCIpO1xuZXhwb3J0cy5Ub29sYmFyQnV0dG9uID0gVG9vbGJhckJ1dHRvbl8xLlRvb2xiYXJCdXR0b247XG52YXIgVG9vbGJhckJ1dHRvbl8yID0gcmVxdWlyZShcIi4vVG9vbGJhckJ1dHRvblwiKTtcbmV4cG9ydHMuQnV0dG9uU3ltYm9scyA9IFRvb2xiYXJCdXR0b25fMi5CdXR0b25TeW1ib2xzO1xudmFyIENvbGxhcHNpYmxlXzEgPSByZXF1aXJlKFwiLi9Db2xsYXBzaWJsZVwiKTtcbmV4cG9ydHMuQ29sbGFwc2libGUgPSBDb2xsYXBzaWJsZV8xLkNvbGxhcHNpYmxlO1xudmFyIE1vZGFsXzEgPSByZXF1aXJlKFwiLi9Nb2RhbFwiKTtcbmV4cG9ydHMuTW9kYWwgPSBNb2RhbF8xLk1vZGFsO1xudmFyIFR5cGVBaGVhZF8xID0gcmVxdWlyZShcIi4vVHlwZUFoZWFkXCIpO1xuZXhwb3J0cy5UeXBlQWhlYWQgPSBUeXBlQWhlYWRfMS5UeXBlQWhlYWQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZhVzVrWlhndWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZQUVN3clFrRkJjME03UVVGQk4wSXNjMEpCUVVFc1NVRkJTU3hEUVVGQk8wRkJSV0lzYlVOQlFYZERPMEZCUVM5Q0xEQkNRVUZCTEUxQlFVMHNRMEZCUVR0QlFVTm1MR2xEUVVGMVF6dEJRVUU1UWl4M1FrRkJRU3hMUVVGTExFTkJRVUU3UVVGRFpDeHRRMEZCZDBNN1FVRkJMMElzTUVKQlFVRXNUVUZCVFN4RFFVRkJPMEZCUTJZc05rTkJRVFpETzBGQlFYQkRMRzlEUVVGQkxGZEJRVmNzUTBGQlFUdEJRVU53UWl4cFJFRkJLME03UVVGQmRFTXNkME5CUVVFc1lVRkJZU3hEUVVGQk8wRkJRM1JDTEN0RFFVRTRRenRCUVVGeVF5eHpRMEZCUVN4WlFVRlpMRU5CUVVFN1FVRkRja0lzYVVSQlFTdERPMEZCUVhSRExIZERRVUZCTEdGQlFXRXNRMEZCUVR0QlFVTjBRaXhwUkVGQkswTTdRVUZCZEVNc2QwTkJRVUVzWVVGQllTeERRVUZCTzBGQlEzUkNMRFpEUVVFMlF6dEJRVUZ3UXl4dlEwRkJRU3hYUVVGWExFTkJRVUU3UVVGRGNFSXNhVU5CUVhWRE8wRkJRVGxDTEhkQ1FVRkJMRXRCUVVzc1EwRkJRVHRCUVVOa0xIbERRVUV5UXp0QlFVRnNReXhuUTBGQlFTeFRRVUZUTEVOQlFVRWlmUT09Il0sInNvdXJjZVJvb3QiOiIifQ==