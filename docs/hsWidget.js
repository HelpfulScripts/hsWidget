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
const log = new hsutil_1.Log('Config');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQXlGQSx1Q0FBeUM7QUFDekMsbUNBQThCO0FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFLN0QsTUFBYSxNQUFNO0lBQ1QsTUFBTSxDQUFDLElBQVU7O1lBQ25CLE1BQU0sT0FBTyxHQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFBLENBQUM7b0JBQzlDLE1BQU0sV0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLENBQUM7b0JBQzNELENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2xEO1FBQ0wsQ0FBQztLQUFBO0lBQ0QsSUFBSSxDQUFDLElBQVU7UUFDWCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUMzQixPQUFPLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUMsV0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEVB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

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
exports.m = __webpack_require__(/*! mithril */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/index.js");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl0aHJpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taXRocmlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUWEsUUFBQSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDIn0=

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
const log = new hsutil_1.Log('Layout');
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
            log.debug(`href ${node.attrs.href}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvTGF5b3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBcUNBLHdDQUFzQztBQUN0Qyx5Q0FBc0M7QUFDdEMsbUNBQThCO0FBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFpQzdELE1BQWEsTUFBTTtJQW9CTCxhQUFhLENBQUMsSUFBVTtRQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUssRUFBRSxFQUFFO2dCQUM3QixJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7b0JBQ2IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLE9BQU8sV0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQztxQkFBTTtvQkFDSCxPQUFPLENBQUMsQ0FBQztpQkFDWjtZQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQVFTLE1BQU0sQ0FBQyxJQUFVO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFRTyxnQkFBZ0IsQ0FBQyxVQUE2QztRQUNsRSxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxPQUFPLENBQUMsV0FBQyxDQUFDLFVBQVUsRUFBRSxXQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQztRQUNELElBQUksVUFBVSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUU7WUFDckIsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBeUIsRUFBUSxFQUFFLENBQ3RELENBQUMsSUFBSSxZQUFZLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FDN0QsQ0FBQztTQUNMO1FBRUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFxQkQsSUFBSSxDQUFDLElBQVU7UUFDWCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksR0FBRyxHQUFHLG1CQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDckQsTUFBTSxLQUFLLEdBQU87WUFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1NBQzlCLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNqQixHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDN0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQztZQUN4QyxLQUFLLENBQUMsUUFBUSxHQUFHLFdBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzlCLEtBQUssQ0FBQyxRQUFRLEdBQUcsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFFOUIsT0FBTyxXQUFDLENBQUMsZUFBZSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pGO2FBQU07WUFDSCxPQUFPLFdBQUMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEY7SUFDTCxDQUFDO0NBQ0o7QUFyR0Qsd0JBcUdDIn0=

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
            c.style = `${f[4]}:100%;`;
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
    let chk = 0x12345678;
    for (let i = 0; i < s.length; i++) {
        chk += (s.charCodeAt(i) * (i + 1));
    }
    return (chk & 0xffffffff).toString(16);
}
exports.shortCheckSum = shortCheckSum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tzdW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ2hlY2tzdW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQyxTQUFnQixhQUFhLENBQUMsQ0FBUTtJQUNuQyxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUM7SUFDckIsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDM0IsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQU5ELHNDQU1DIn0=

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
    let r = '' + number;
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
    return n.toFixed(d);
}
exports.round = round;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL051bWJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVdDLFNBQWdCLEtBQUssQ0FBQyxDQUFRLEVBQUUsQ0FBQyxHQUFDLENBQUM7SUFHaEMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7QUFKRCxzQkFJQyJ9

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
exports.Log = log_1.Log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBbUQ7QUFBMUMsa0NBQUEsT0FBTyxDQUFBO0FBQUUsZ0NBQUEsS0FBSyxDQUFBO0FBQ3ZCLGlEQUFtRDtBQUExQywrQkFBQSxJQUFJLENBQUE7QUFDYixpREFBbUQ7QUFBMUMsdUNBQUEsWUFBWSxDQUFBO0FBQ3JCLHVDQUE4QztBQUFyQyxtQ0FBQSxhQUFhLENBQUE7QUFDdEIsK0JBQTBDO0FBQWpDLHNCQUFBLElBQUksQ0FBQTtBQUFFLG9CQUFBLEVBQUUsQ0FBQTtBQUNqQixtQ0FBNEM7QUFBbkMseUJBQUEsS0FBSyxDQUFBO0FBQ2QsNkJBQXlDO0FBQWhDLG9CQUFBLEdBQUcsQ0FBQSJ9

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
const COLORS = ['#008', '#080', '#800', '#066', '#660', '#606'];
class Log {
    constructor(prefix) {
        this.reportLevel = undefined;
        this.reportPrefix = '';
        this.reportPrefix = prefix;
    }
    level(newLevelSym, setGlobalLevel) {
        let newLevel = Log.levels[newLevelSym] || Log.globalLevel;
        let oldLevel = this.reportLevel || Log.globalLevel;
        if (newLevelSym === undefined) {
            newLevel = oldLevel;
        }
        else if (newLevelSym === null) {
            this.reportLevel = undefined;
        }
        else if (Log.levels[newLevelSym]) {
            if (setGlobalLevel) {
                Log.globalLevel = newLevel;
            }
            else {
                this.reportLevel = newLevel;
            }
            const msg = `new ${setGlobalLevel ? 'global' : this.reportPrefix} log level ${newLevel.desc.toUpperCase()} (was ${oldLevel.desc.toUpperCase()})`;
            this.out((newLevel.sym === oldLevel.sym) ? Log.DEBUG : Log.INFO, msg);
        }
        else {
            this.out(Log.ERROR, `unkown level ${newLevelSym}; log level remains ${oldLevel.sym}`);
        }
        return newLevel.sym;
    }
    debug(msg, log2File = true) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.out(Log.DEBUG, msg); });
    }
    info(msg, log2File = true) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.out(Log.INFO, msg); });
    }
    warn(msg, log2File = true) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.out(Log.WARN, msg); });
    }
    error(msg, log2File = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg.message) {
                yield this.out(Log.ERROR, msg.message);
                yield this.out(Log.ERROR, msg.stack);
                return msg.message;
            }
            else {
                return yield this.out(Log.ERROR, msg);
            }
        });
    }
    out(lvl, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let desc = Log.levels[lvl];
            const filterLevel = this.reportLevel || Log.globalLevel;
            if (desc.importance >= filterLevel.importance) {
                const dateStr = Date_1.date(Log.dateFormat);
                let line = (typeof msg === 'string') ? msg : this.inspect(msg, 0);
                const logLine = this.makeMessage(line, lvl, dateStr, desc.desc);
                console.log(logLine);
                if (msg && msg.stack) {
                    console.log(msg.stack);
                }
                return Promise.resolve(line);
            }
            return undefined;
        });
    }
    makeMessage(line, lvl, dateStr, desc) {
        return `${dateStr} ${this.reportPrefix} ${desc} ${line}`;
    }
    format(fmtStr) {
        if (fmtStr === null) {
            Log.dateFormat = Log.defDateFormat;
        }
        else if (fmtStr) {
            Log.dateFormat = fmtStr;
        }
        return Log.dateFormat;
    }
    prefix(prf) {
        if (prf) {
            this.reportPrefix = prf;
        }
        return this.reportPrefix;
    }
    config(cfg) {
        if (cfg.format !== undefined) {
            this.format(cfg.format);
        }
        if (cfg.level !== undefined) {
            this.level(cfg.level);
        }
    }
    inspect(msg, depth = 3, indent = '    ', colors = COLORS) {
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
                if (msg.map !== undefined) {
                    return `[${msg.map((e) => (e === undefined) ? '' : _inspect(e, depth - 1, level + 1, currIndent)).join(', ')}]`;
                }
                const [prefix, postfix] = log.getPrePostfix(indent, level, currIndent);
                const cstart = colors ? `<b><span style='color:${colors[level % colors.length]};'>` : '';
                const cstop = colors ? `</span></b>` : '';
                const lf = colors ? '<br>' : '\n';
                return `{${lf}` + Object.keys(msg).map(k => `${cstart}${prefix}${k}${postfix}${cstop}: ${_inspect(msg[k], depth - 1, level + 1, currIndent + indent)}`).join(`,${lf}`) + `${lf}${currIndent}}`;
            }
            return msg.toString();
        }
        const log = this;
        if (colors) {
            indent = indent.replace(/ /g, '&nbsp;');
        }
        return _inspect(msg, depth === null ? 999 : depth, 0, '');
    }
    getPrePostfix(indent, level, currIndent) {
        return [`${currIndent}${indent}`, ''];
    }
}
exports.Log = Log;
Log.defDateFormat = '%YYYY%MM%DD %hh:%mm:%ss.%jjj';
Log.dateFormat = Log.defDateFormat;
Log.DEBUG = 'DEBUG';
Log.INFO = 'INFO';
Log.WARN = 'WARN';
Log.ERROR = 'ERROR';
Log.levels = {
    [Log.DEBUG]: { importance: 0, sym: Log.DEBUG, desc: 'DEBUG' },
    [Log.INFO]: { importance: 1, sym: Log.INFO, desc: 'INFO' },
    [Log.WARN]: { importance: 2, sym: Log.WARN, desc: 'WARN' },
    [Log.ERROR]: { importance: 3, sym: Log.ERROR, desc: 'ERROR' }
};
Log.log = new Log('');
Log.globalLevel = Log.levels[Log.INFO];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQStFQSxpQ0FBOEI7QUFHOUIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBVWhFLE1BQWEsR0FBRztJQWtDWixZQUFZLE1BQWE7UUFIZixnQkFBVyxHQUFrQixTQUFTLENBQUM7UUFDdkMsaUJBQVksR0FBTSxFQUFFLENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztJQUFDLENBQUM7SUFvQm5ELEtBQUssQ0FBQyxXQUFtQixFQUFFLGNBQXVCO1FBQ3JELElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUMxRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDbkQsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQzNCLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDdkI7YUFBTSxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7U0FDaEM7YUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxjQUFjLEVBQUU7Z0JBQUUsR0FBRyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7YUFBRTtpQkFDL0I7Z0JBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7YUFBRTtZQUNwRCxNQUFNLEdBQUcsR0FBRyxPQUFPLGNBQWMsQ0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxjQUFjLFFBQVEsQ0FBQyxJ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

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/api/mount-redraw.js":
/*!****************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/api/mount-redraw.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/vnode.js")

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

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/api/router.js":
/*!**********************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/api/router.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/vnode.js")
var m = __webpack_require__(/*! ../render/hyperscript */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/hyperscript.js")
var Promise = __webpack_require__(/*! ../promise/promise */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/promise/promise.js")

var buildPathname = __webpack_require__(/*! ../pathname/build */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/build.js")
var parsePathname = __webpack_require__(/*! ../pathname/parse */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/parse.js")
var compileTemplate = __webpack_require__(/*! ../pathname/compileTemplate */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/compileTemplate.js")
var assign = __webpack_require__(/*! ../pathname/assign */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/assign.js")

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/node_modules/timers-browserify/main.js */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/hyperscript.js":
/*!***********************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/hyperscript.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hyperscript = __webpack_require__(/*! ./render/hyperscript */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/hyperscript.js")

hyperscript.trust = __webpack_require__(/*! ./render/trust */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/trust.js")
hyperscript.fragment = __webpack_require__(/*! ./render/fragment */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/fragment.js")

module.exports = hyperscript


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/index.js":
/*!*****************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hyperscript = __webpack_require__(/*! ./hyperscript */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/hyperscript.js")
var request = __webpack_require__(/*! ./request */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/request.js")
var mountRedraw = __webpack_require__(/*! ./mount-redraw */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/mount-redraw.js")

var m = function m() { return hyperscript.apply(this, arguments) }
m.m = hyperscript
m.trust = hyperscript.trust
m.fragment = hyperscript.fragment
m.mount = mountRedraw.mount
m.route = __webpack_require__(/*! ./route */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/route.js")
m.render = __webpack_require__(/*! ./render */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render.js")
m.redraw = mountRedraw.redraw
m.request = request.request
m.jsonp = request.jsonp
m.parseQueryString = __webpack_require__(/*! ./querystring/parse */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/querystring/parse.js")
m.buildQueryString = __webpack_require__(/*! ./querystring/build */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/querystring/build.js")
m.parsePathname = __webpack_require__(/*! ./pathname/parse */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/parse.js")
m.buildPathname = __webpack_require__(/*! ./pathname/build */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/build.js")
m.vnode = __webpack_require__(/*! ./render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/vnode.js")
m.PromisePolyfill = __webpack_require__(/*! ./promise/polyfill */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/promise/polyfill.js")

module.exports = m


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/mount-redraw.js":
/*!************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/mount-redraw.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var render = __webpack_require__(/*! ./render */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render.js")

module.exports = __webpack_require__(/*! ./api/mount-redraw */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/api/mount-redraw.js")(render, requestAnimationFrame, console)


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/assign.js":
/*!***************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/assign.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.assign || function(target, source) {
	if(source) Object.keys(source).forEach(function(key) { target[key] = source[key] })
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/build.js":
/*!**************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/build.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildQueryString = __webpack_require__(/*! ../querystring/build */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/querystring/build.js")
var assign = __webpack_require__(/*! ./assign */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/assign.js")

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

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/compileTemplate.js":
/*!************************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/compileTemplate.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parsePathname = __webpack_require__(/*! ./parse */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/parse.js")

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

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/parse.js":
/*!**************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/parse.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseQueryString = __webpack_require__(/*! ../querystring/parse */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/querystring/parse.js")

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

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/promise/polyfill.js":
/*!****************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/promise/polyfill.js ***!
  \****************************************************************************************/
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/node_modules/timers-browserify/main.js */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/promise/promise.js":
/*!***************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/promise/promise.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var PromisePolyfill = __webpack_require__(/*! ./polyfill */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/promise/polyfill.js")

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/querystring/build.js":
/*!*****************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/querystring/build.js ***!
  \*****************************************************************************************/
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

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/querystring/parse.js":
/*!*****************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/querystring/parse.js ***!
  \*****************************************************************************************/
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

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render.js":
/*!******************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./render/render */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/render.js")(window)


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/fragment.js":
/*!***************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/fragment.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/vnode.js")
var hyperscriptVnode = __webpack_require__(/*! ./hyperscriptVnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/hyperscriptVnode.js")

module.exports = function() {
	var vnode = hyperscriptVnode.apply(0, arguments)

	vnode.tag = "["
	vnode.children = Vnode.normalizeChildren(vnode.children)
	return vnode
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/hyperscript.js":
/*!******************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/hyperscript.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/vnode.js")
var hyperscriptVnode = __webpack_require__(/*! ./hyperscriptVnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/hyperscriptVnode.js")

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

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/hyperscriptVnode.js":
/*!***********************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/hyperscriptVnode.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/vnode.js")

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

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/render.js":
/*!*************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/render.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/vnode.js")

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

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/trust.js":
/*!************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/trust.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vnode = __webpack_require__(/*! ../render/vnode */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/vnode.js")

module.exports = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/vnode.js":
/*!************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/render/vnode.js ***!
  \************************************************************************************/
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

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/request.js":
/*!*******************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/request.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PromisePolyfill = __webpack_require__(/*! ./promise/promise */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/promise/promise.js")
var mountRedraw = __webpack_require__(/*! ./mount-redraw */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/mount-redraw.js")

module.exports = __webpack_require__(/*! ./request/request */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/request/request.js")(window, PromisePolyfill, mountRedraw.redraw)


/***/ }),

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/request/request.js":
/*!***************************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/request/request.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildPathname = __webpack_require__(/*! ../pathname/build */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/pathname/build.js")

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

/***/ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/route.js":
/*!*****************************************************************************!*\
  !*** /Users/Shared/Sites/staging/apps/hsDocs/node_modules/mithril/route.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mountRedraw = __webpack_require__(/*! ./mount-redraw */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/mount-redraw.js")

module.exports = __webpack_require__(/*! ./api/router */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/mithril/api/router.js")(window, mountRedraw)


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
        node.state.expanded = node.attrs.isExpanded ? true : false;
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
        const expCSS = node.state.expanded ? 'hs-collapsible-expanded' : '';
        const title = [components[0]];
        if (preArrow) {
            title.unshift(hslayout_1.m(`.hs-collapsible-pre .hs-collapsible-arrow-${node.state.expanded ? 'down' : 'right'}`));
        }
        if (postArrow) {
            title.push(hslayout_1.m(`.hs-collapsible-post .hs-collapsible-arrow-${node.state.expanded ? 'down' : 'left'}`));
        }
        return hslayout_1.m(`.hs-collapsible ${css}`, [
            hslayout_1.m('.hs-collapsible-title', { onclick: node.state.toggle }, title),
            components[1] ? hslayout_1.m(`.hs-collapsible-content ${expCSS}`, components[1].map((c) => hslayout_1.m('', c))) : undefined
        ]);
    }
}
exports.Collapsible = Collapsible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFwc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ29sbGFwc2libGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpREEsdUNBQW9DO0FBRXBDLE1BQWEsV0FBVztJQUNwQixNQUFNLENBQUMsSUFBVTtRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBVTtRQUNYLE1BQU0sR0FBRyxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ2xDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3pDLE1BQU0sUUFBUSxHQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLE1BQU0sU0FBUyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3hDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQSx5QkFBeUIsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFDO1FBQ2hFLE1BQU0sS0FBSyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxRQUFRLEVBQUU7WUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQUMsQ0FBQyw2Q0FBNkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFDeEgsSUFBSSxTQUFTLEVBQUM7WUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQUMsQ0FBQyw4Q0FBOEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFDckgsT0FBTyxZQUFDLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxFQUFFO1lBQy9CLFlBQUMsQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLE9BQU8sRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQyxFQUFFLEtBQUssQ0FBQztZQUMvRCxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLFlBQUMsQ0FBQywyQkFBMkIsTUFBTSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUssRUFBRSxFQUFFLENBQUEsWUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDMUcsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBdkJELGtDQXVCQyJ9

/***/ }),

/***/ "./bin/EditCheckbox.js":
/*!*****************************!*\
  !*** ./bin/EditCheckbox.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
const hsutil_1 = __webpack_require__(/*! hsutil */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/index.js");
const log = new hsutil_1.Log('EditSelect');
class EditCheckbox {
    click() {
        this.checked = !this.checked;
        this.update(this.checked);
    }
    oninit(node) {
        this.checked = node.attrs.checked;
        this.update = node.attrs.update;
    }
    view(node) {
        const css = node.attrs.css || '';
        return hslayout_1.m(`input.hsedit_checkbox${css}`, {
            type: 'checkbox',
            checked: this.checked,
            onclick: this.click.bind(this)
        }, '');
    }
}
exports.EditCheckbox = EditCheckbox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdENoZWNrYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0VkaXRDaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQStCQSx1Q0FBb0M7QUFDcEMsbUNBQWtDO0FBQUUsTUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFHdEUsTUFBYSxZQUFZO0lBSXJCLEtBQUs7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVU7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFVO1FBQ1gsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQ2pDLE9BQU8sWUFBQyxDQUFDLHdCQUF3QixHQUFHLEVBQUUsRUFBRTtZQUNwQyxJQUFJLEVBQUUsVUFBVTtZQUNoQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNqQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRVYsQ0FBQztDQUNKO0FBdkJELG9DQXVCQyJ9

/***/ }),

/***/ "./bin/EditLabel.js":
/*!**************************!*\
  !*** ./bin/EditLabel.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hsutil_1 = __webpack_require__(/*! hsutil */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/index.js");
const log = new hsutil_1.Log('EditLabel');
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
class EditLabel {
    constructor() {
        this.editable = false;
        this.hasFocus = false;
        this.default = '';
    }
    click(e) {
        this.editable = !this.editable;
    }
    blur(e) {
        this.editable = false;
        this.hasFocus = false;
        this.update(e.target.value);
    }
    keyup(key) {
        if (key.which === 13) {
            key.target.blur();
        }
    }
    update(newValue) {
        this.updateCB(newValue);
    }
    onupdate(node) {
        if (this.editable && !this.hasFocus) {
            node.dom.value = node.attrs.content || this.default;
            node.dom.focus();
            node.dom.select();
            this.hasFocus = true;
        }
    }
    view(node) {
        this.updateCB = node.attrs.update;
        const css = node.attrs.css || '';
        return this.editable ?
            hslayout_1.m(`input.hsedit_label${css}`, {
                onblur: this.blur.bind(this),
                onkeyup: this.keyup.bind(this),
            }, '')
            : (node.attrs.content && node.attrs.content.length) ?
                hslayout_1.m(`span.hsedit_label${css}`, { onclick: this.click.bind(this) }, hslayout_1.m.trust(node.attrs.content))
                : hslayout_1.m(`span.hsedit_label.default${css}`, { onclick: this.click.bind(this) }, node.attrs.placeholder || 'click to enter');
    }
}
exports.EditLabel = EditLabel;
class EditDate extends EditLabel {
    constructor() {
        super(...arguments);
        this.default = new Date().toDateString().slice(4);
    }
    update(newValue) {
        if (newValue) {
            const date = new Date(newValue);
            const result = isNaN(date.getTime()) ? 'invalid date' : date.toDateString().slice(4);
            super.update(result);
        }
        else {
            super.update(undefined);
        }
    }
}
exports.EditDate = EditDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdExhYmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0VkaXRMYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXFDQSxtQ0FBa0M7QUFBRSxNQUFNLEdBQUcsR0FBRyxJQUFJLFlBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyRSx1Q0FBb0M7QUFHcEMsTUFBYSxTQUFTO0lBQXRCO1FBQ2MsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLFlBQU8sR0FBRyxFQUFFLENBQUM7SUEyQzNCLENBQUM7SUF6Q2EsS0FBSyxDQUFDLENBQUs7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVTLElBQUksQ0FBQyxDQUFLO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRVMsS0FBSyxDQUFDLEdBQU87UUFDbkIsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVTLE1BQU0sQ0FBQyxRQUFlO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUFVO1FBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRU0sSUFBSSxDQUFDLElBQVU7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBLENBQUM7WUFDakIsWUFBQyxDQUFDLHFCQUFxQixHQUFHLEVBQUUsRUFBRTtnQkFDMUIsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDNUIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNqQyxFQUFDLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7Z0JBQzlDLFlBQUMsQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxZQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9GLENBQUMsQ0FBQyxZQUFDLENBQUMsNEJBQTRCLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksZ0JBQWdCLENBQUMsQ0FBQztJQUM3SCxDQUFDO0NBQ0o7QUEvQ0QsOEJBK0NDO0FBRUQsTUFBYSxRQUFTLFNBQVEsU0FBUztJQUF2Qzs7UUFDYyxZQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFVM0QsQ0FBQztJQVRhLE1BQU0sQ0FBQyxRQUFlO1FBQzVCLElBQUksUUFBUSxFQUFFO1lBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEYsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QjthQUFNO1lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMzQjtJQUNMLENBQUM7Q0FDSjtBQVhELDRCQVdDIn0=

/***/ }),

/***/ "./bin/EditList.js":
/*!*************************!*\
  !*** ./bin/EditList.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
const hsutil_1 = __webpack_require__(/*! hsutil */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/index.js");
const log = new hsutil_1.Log('EditList');
const hslayout_2 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
const EditLabel_1 = __webpack_require__(/*! ./EditLabel */ "./bin/EditLabel.js");
const Collapsible_1 = __webpack_require__(/*! ./Collapsible */ "./bin/Collapsible.js");
const defIsEmpty = (row) => (row && row.length) ? false : true;
const defaultRender = (rows) => {
    return (row, rowNum) => {
        if (row.map) {
            return row.map((e, i) => hslayout_1.m(EditLabel_1.EditLabel, {
                content: e,
                placeholder: 'add...',
                update: (newValue) => row[i] = newValue
            }));
        }
        else if (Object.prototype.toString.call(row) === '[object Object]') {
            return Object.keys(row).map((e) => hslayout_1.m(EditLabel_1.EditLabel, {
                content: row[e],
                placeholder: 'add...',
                update: (newValue) => row[e] = newValue
            }));
        }
        else {
            return hslayout_1.m(EditLabel_1.EditLabel, {
                content: row,
                placeholder: 'add...',
                update: (newValue) => rows[rowNum] = newValue
            });
        }
    };
};
function adjustListRowHeight(dom, indent = '') {
    const height = Math.max(...Array.from(dom.childNodes).map((n) => parseInt(window.getComputedStyle(n).height)));
    if (dom && !dom.classList.contains('hsedit_list_content')) {
        dom.style.height = height > 0 ? `${height}px` : 'auto';
    }
}
class EditList {
    view(node) {
        const css = node.attrs.css || '';
        const sort = node.attrs.sort || (() => 0);
        const rows = node.attrs.rows;
        const isEmpty = node.attrs.isEmpty || defIsEmpty;
        const render = node.attrs.rowRender || defaultRender(rows);
        const def = node.attrs.defaultRow === undefined ? '' : node.attrs.defaultRow;
        const expandRows = node.attrs.expand || expand;
        const collapsible = node.attrs.collapsible === undefined ? true : node.attrs.collapsible;
        if (!rows) {
            log.warn(`EditList${css} rows array is missing`);
        }
        if (!rows || !rows.map) {
            log.warn(`EditList${css} rows must be an array`);
        }
        expandRows(rows, def, isEmpty);
        const content = [
            hslayout_1.m('.hsedit_list_content', {
                onupdate(node) { adjustListRowHeight(node.dom); },
            }, rows.sort(sort).map((row, i) => hslayout_1.m(hslayout_2.Layout, {
                css: '.hsedit_list_row',
                onupdate(node) { adjustListRowHeight(node.dom); },
                columns: node.attrs.columnLayout || [],
                content: render(row, i)
            })))
        ];
        if (collapsible && node.attrs.header) {
            return hslayout_1.m(Collapsible_1.Collapsible, {
                css: `.edit_list${css}`,
                isExpanded: true,
                components: [
                    hslayout_1.m('.hsedit_list_header', node.attrs.header),
                    content
                ]
            });
        }
        else {
            if (node.attrs.header) {
                content.unshift(hslayout_1.m('.hsedit_list_header', node.attrs.header));
            }
            return hslayout_1.m(`.edit_list${css}`, content);
        }
    }
}
exports.EditList = EditList;
function expand(rows, def, isEmpty) {
    const lastRowIndex = rows.length - 1;
    if (lastRowIndex < 0 || !isEmpty(rows[lastRowIndex])) {
        rows.push(def);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRWRpdExpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFzRkEsdUNBQW9DO0FBQ3BDLG1DQUFrQztBQUFFLE1BQU0sR0FBRyxHQUFHLElBQUksWUFBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BFLHVDQUFvQztBQUNwQywyQ0FBd0M7QUFDeEMsK0NBQTRDO0FBYTVDLE1BQU0sVUFBVSxHQUFVLENBQUMsR0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBT3pFLE1BQU0sYUFBYSxHQUFHLENBQUMsSUFBVSxFQUFZLEVBQUU7SUFDM0MsT0FBTyxDQUFDLEdBQU8sRUFBRSxNQUFhLEVBQVEsRUFBRTtRQUNwQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDVCxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFRLEVBQUUsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxZQUFDLENBQUMscUJBQVMsRUFBRTtnQkFDaEQsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsV0FBVyxFQUFFLFFBQVE7Z0JBQ3JCLE1BQU0sRUFBRSxDQUFDLFFBQWUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVE7YUFDakQsQ0FBQyxDQUFDLENBQUM7U0FDUDthQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGlCQUFpQixFQUFFO1lBQ2xFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLFlBQUMsQ0FBQyxxQkFBUyxFQUFFO2dCQUNuRCxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMs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

/***/ }),

/***/ "./bin/EditSelect.js":
/*!***************************!*\
  !*** ./bin/EditSelect.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
const hsutil_1 = __webpack_require__(/*! hsutil */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/index.js");
const log = new hsutil_1.Log('EditSelect');
class EditSelect {
    constructor() {
        this.selectable = false;
    }
    click() {
        this.selectable = true;
    }
    select(e) {
        this.update(e.currentTarget.value);
        this.selectable = false;
    }
    view(node) {
        this.update = node.attrs.update;
        const css = node.attrs.css || '';
        return hslayout_1.m(`select.hsedit_select${css}`, { onchange: this.select.bind(this) }, node.attrs.from.map((o) => node.attrs.selected === o ?
            hslayout_1.m('option.hsedit_select_option.selected', { value: o, selected: true }, o) :
            hslayout_1.m('option.hsedit_select_option', { value: o }, o)));
    }
}
exports.EditSelect = EditSelect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdFNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9FZGl0U2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBcUNBLHVDQUFvQztBQUNwQyxtQ0FBa0M7QUFBRSxNQUFNLEdBQUcsR0FBRyxJQUFJLFlBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUd0RSxNQUFhLFVBQVU7SUFBdkI7UUFFSSxlQUFVLEdBQUcsS0FBSyxDQUFDO0lBbUJ2QixDQUFDO0lBakJHLEtBQUs7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQsTUFBTSxDQUFDLENBQUs7UUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFVO1FBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDakMsT0FBTyxZQUFDLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEVBQ3JFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUcsQ0FBQyxDQUFBLENBQUM7WUFDdEQsWUFBQyxDQUFDLHNDQUFzQyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRSxZQUFDLENBQUMsNkJBQTZCLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Q0FDSjtBQXJCRCxnQ0FxQkMifQ==

/***/ }),

/***/ "./bin/EditTextarea.js":
/*!*****************************!*\
  !*** ./bin/EditTextarea.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hsutil_1 = __webpack_require__(/*! hsutil */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/index.js");
const log = new hsutil_1.Log('EditTextarea');
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
class EditTextarea {
    constructor() {
        this.editable = false;
        this.hasFocus = false;
        this.default = '';
    }
    adjustTextAreaHeight(dom) {
        if (dom && dom.classList) {
            while (!dom.classList.contains('hsedit_textarea')) {
                dom = dom.parentElement;
            }
            const scHeight = dom.scrollHeight;
            const height = parseInt(window.getComputedStyle(dom).height);
            const h = Math.max(height, scHeight);
            dom.style.height = h > 0 ? `${h}px` : 'auto';
            const listRow = dom.parentElement.parentElement;
            if (listRow.classList.contains('hsedit_list_row')) {
                listRow.style.height = h > 0 ? `${h + (this.editable ? 4 : 0)}px` : 'auto';
            }
        }
    }
    click(e) {
        this.editable = !this.editable;
    }
    blur(e) {
        this.editable = false;
        this.hasFocus = false;
        this.update(e.target.value);
    }
    update(newValue) {
        this.updateCB(newValue);
    }
    onupdate(node) {
        if (this.editable) {
            if (!this.hasFocus) {
                node.dom.value = node.attrs.content || this.default;
                node.dom.focus();
                node.dom.select();
                this.hasFocus = true;
            }
            this.adjustTextAreaHeight(node.dom);
        }
    }
    view(node) {
        this.updateCB = node.attrs.update;
        const css = node.attrs.css || '';
        const attrs = {
            onclick: this.click.bind(this),
            onupdate: (node) => this.adjustTextAreaHeight.bind(this)(node.dom)
        };
        const content = hslayout_1.m.trust(node.attrs.content.replace(/\n/g, '<p>'));
        return this.editable ?
            hslayout_1.m(`textarea.hsedit_textarea${css}`, {
                wrap: 'physical',
                onblur: this.blur.bind(this),
            }, content)
            : (node.attrs.content && node.attrs.content.length) ?
                hslayout_1.m(`.hsedit_textarea${css}`, attrs, content)
                : hslayout_1.m(`.hsedit_textarea.default${css}`, attrs, node.attrs.placeholder || 'click to enter');
    }
}
exports.EditTextarea = EditTextarea;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdFRleHRhcmVhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0VkaXRUZXh0YXJlYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXFDQSxtQ0FBa0M7QUFBRSxNQUFNLEdBQUcsR0FBRyxJQUFJLFlBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN4RSx1Q0FBb0M7QUFHcEMsTUFBYSxZQUFZO0lBQXpCO1FBQ2MsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLFlBQU8sR0FBRyxFQUFFLENBQUM7SUEyRDNCLENBQUM7SUF6RGEsb0JBQW9CLENBQUMsR0FBTztRQUNsQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO2FBQUU7WUFDL0UsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztZQUNsQyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUUxQyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztZQUNoRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQy9DLE9BQU8sQ0FBQyxLQUFLLENB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

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
    view(node) {
        this.onupdate(node);
        return RadioButton_1.RadioButton.viewGroup('.hs-menu', node);
    }
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
                hslayout_1.m(Menu, {
                    desc: {
                        items: items,
                        defaultItem: node.attrs.defaultItem,
                        clicked: (item) => this.selected = items.indexOf(item)
                    },
                    css: node.attrs.css,
                    style: node.attrs.style,
                    sizes: node.attrs.sizes
                }),
                hslayout_1.m(hslayout_2.Layout, { css: '.hs-menu-panel', content: node.attrs.content[this.selected] })
            ]
        });
    }
}
exports.MenuPanel = MenuPanel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBOEZBLHVDQUF3QztBQUN4Qyx1Q0FBd0M7QUFDeEMsK0NBQTZDO0FBNEI3QyxNQUFhLElBQUssU0FBUSx5QkFBVztJQUNqQyxJQUFJLENBQUMsSUFBVztRQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsT0FBTyx5QkFBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNKO0FBTEQsb0JBS0M7QUF5QkQsTUFBYSxTQUFVLFNBQVEsaUJBQU07SUFFakMsTUFBTSxDQUFDLElBQVc7UUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBVztRQUNaLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzdCLE9BQU8sWUFBQyxDQUFDLGlCQUFNLEVBQUU7WUFDYixJQUFJLEVBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3JCLE9BQU8sRUFBQztnQkFDSixZQUFDLENBQUMsSUFBSSxFQUFFO29CQUNKLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsS0FBSzt3QkFDWixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO3dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxJQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7cUJBQ2hFO29CQUNELEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7b0JBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7b0JBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7aUJBQzFCLENBQUM7Z0JBQ0YsWUFBQyxDQUFDLGlCQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUMsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2FBQ2xGO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBeEJELDhCQXdCQyJ9

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
            columns: node.attrs.sizes || [],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9CdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmFkaW9CdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpQ0EsdUNBQTRDO0FBQzVDLHVDQUE0QztBQUM1Qyx5Q0FBOEM7QUFtQjlDLE1BQWEsV0FBWSxTQUFRLG1CQUFRO0lBQ3JDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBVSxFQUFFLElBQVc7UUFDcEMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUVyQyxPQUFPLFlBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEVBQUUsWUFBQyxDQUFDLGlCQUFNLEVBQUU7WUFDbkMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDL0IsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVEsRUFBRSxDQUFRLEVBQUUsRUFBRSxDQUFDLG1CQUFRLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0RixDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBVztRQUNkLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsbUJBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFXO1FBQ2hCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckIsbUJBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELElBQUksQ0FBQyxJQUFXLElBQVcsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN4RjtBQW5CRCxrQ0FtQkMifQ==

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
        if (node.state && node.state.items && !node.state.items.some((i) => i.isSelected) && node.state.items.length > 0) {
            if (node.state.defaultItem && node.state.items[node.state.defaultItem]) {
                node.state.items[node.state.defaultItem].isSelected = true;
            }
            else if (node.state.items[0]) {
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
const hsutil_1 = __webpack_require__(/*! hsutil */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hsutil/index.js");
const log = new hsutil_1.Log('TypeAhead');
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
    constructor(map) {
        this.map = map;
        this.list = [];
    }
    search(list) {
        if (typeof list === 'string') {
            if (this.url !== list) {
                this.url = list;
                hslayout_1.m.request({ method: "GET", url: list })
                    .then((data) => this.captureList(data, this.map))
                    .catch((e) => log.warn(`requesting ${list}: ${e.toString()}`));
            }
        }
        else {
            this.captureList(list, this.map);
        }
    }
    captureList(list, map) {
        this.list = map ? map(list) : list;
    }
}
class TypeAhead {
    constructor() {
        this.gl = new GetList();
    }
    oninit(node) {
        node.state.inputNode = '';
        node.state.hidePopdown = true;
        node.state.value = '';
        node.state.typeAheadList = [];
        node.state.onsubmit = node.attrs.onsubmit;
        node.state.autocomplete = node.attrs.autocomplete === undefined ? true : node.attrs.autocomplete;
    }
    view(node) {
        this.gl.search(node.attrs.list);
        const nosubmit = () => console.log('no submit function defined');
        const submit = (v) => {
            node.state.inputNode.setSelectionRange(0, node.state.inputNode.value.length);
            node.state.hidePopdown = true;
            return node.state.onsubmit ? node.state.onsubmit(v, node.state.typeAheadList) : nosubmit();
        };
        const select = (e) => {
            if (e) {
                node.state.inputNode.value = e.target.attributes.name.value;
                submit(e.target.attributes.name.value);
            }
        };
        const oninput = (e) => {
            const n = node.state.inputNode = e.target;
            const typed = node.state.value = n.value;
            if (typed.length > 0) {
                node.state.typeAheadList = this.gl.list.filter((l) => l.match(new RegExp(typed, 'gi')));
                if (node.state.autocomplete) {
                    autoComplete(typed, node);
                }
            }
        };
        const keyPressed = (e) => {
            const n = node.state.inputNode = e.target;
            node.state.hidePopdown = false;
            if (e.code === 'Enter') {
                submit(n.value);
            }
            else if (e.code === 'Backspace' && n.textLength > 0) {
                const input = n.textContent;
                if (input.length > 0) {
                    n.value = input.slice(0);
                }
            }
        };
        const selector = node.state.value ? '.hs-typeahead-value' : '.hs-typeahead-placeholder';
        return hslayout_1.m('.hs-form', [
            hslayout_1.m(`input.hs-typeahead-input${selector}`, {
                contenteditable: true,
                placeholder: node.attrs.placeholder,
                autofocus: node.attrs.autofocus || true,
                onkeydown: keyPressed,
                oninput: oninput
            }, hslayout_1.m.trust(node.state.value ? node.state.value : node.attrs.placeholder)),
            node.state.hidePopdown ? undefined :
                hslayout_1.m('.hs-typeahead-list', node.state.typeAheadList.map((l) => hslayout_1.m('', { onclick: select }, emphasize(l, node.state.value))))
        ]);
    }
}
exports.TypeAhead = TypeAhead;
function autoComplete(typed, node) {
    const n = node.state.inputNode;
    const startOfLineInput = new RegExp(`^${typed}`, 'gi');
    n.value = node.state.typeAheadList.filter((l) => l.match(startOfLineInput))[0] || typed;
    n.setSelectionRange(typed.length, n.value.length);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZUFoZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1R5cGVBaGVhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTZDQSx1Q0FBb0M7QUFDcEMsbUNBQTZCO0FBRTNCLE1BQU0sR0FBRyxHQUFHLElBQUksWUFBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBR25DLFNBQVMsU0FBUyxDQUFDLElBQVcsRUFBRSxLQUFZO0lBQ3hDLE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxNQUFNLFdBQVcsR0FBRyxJQUFJO1NBQ25CLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDeEMsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLEdBQUcsQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFO1FBQ2QsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sWUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7YUFBTSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0gsT0FBTyxZQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxPQUFPLFlBQUMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFD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

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
var EditLabel_1 = __webpack_require__(/*! ./EditLabel */ "./bin/EditLabel.js");
exports.EditLabel = EditLabel_1.EditLabel;
var EditLabel_2 = __webpack_require__(/*! ./EditLabel */ "./bin/EditLabel.js");
exports.EditDate = EditLabel_2.EditDate;
var EditList_1 = __webpack_require__(/*! ./EditList */ "./bin/EditList.js");
exports.EditList = EditList_1.EditList;
var EditSelect_1 = __webpack_require__(/*! ./EditSelect */ "./bin/EditSelect.js");
exports.EditSelect = EditSelect_1.EditSelect;
var EditCheckbox_1 = __webpack_require__(/*! ./EditCheckbox */ "./bin/EditCheckbox.js");
exports.EditCheckbox = EditCheckbox_1.EditCheckbox;
var EditTextarea_1 = __webpack_require__(/*! ./EditTextarea */ "./bin/EditTextarea.js");
exports.EditTextarea = EditTextarea_1.EditTextarea;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSwrQkFBc0M7QUFBN0Isc0JBQUEsSUFBSSxDQUFBO0FBQ2IsK0JBQXNDO0FBQTdCLDJCQUFBLFNBQVMsQ0FBQTtBQUVsQixtQ0FBd0M7QUFBL0IsMEJBQUEsTUFBTSxDQUFBO0FBQ2YsaUNBQXVDO0FBQTlCLHdCQUFBLEtBQUssQ0FBQTtBQUNkLG1DQUF3QztBQUEvQiwwQkFBQSxNQUFNLENBQUE7QUFDZiw2Q0FBNkM7QUFBcEMsb0NBQUEsV0FBVyxDQUFBO0FBQ3BCLGlEQUErQztBQUF0Qyx3Q0FBQSxhQUFhLENBQUE7QUFDdEIsK0NBQThDO0FBQXJDLHNDQUFBLFlBQVksQ0FBQTtBQUNyQixpREFBK0M7QUFBdEMsd0NBQUEsYUFBYSxDQUFBO0FBQ3RCLGlEQUErQztBQUF0Qyx3Q0FBQSxhQUFhLENBQUE7QUFDdEIsNkNBQTZDO0FBQXBDLG9DQUFBLFdBQVcsQ0FBQTtBQUNwQixpQ0FBdUM7QUFBOUIsd0JBQUEsS0FBSyxDQUFBO0FBQ2QseUNBQTJDO0FBQWxDLGdDQUFBLFNBQVMsQ0FBQTtBQUNsQix5Q0FBMkM7QUFBbEMsZ0NBQUEsU0FBUyxDQUFBO0FBQ2xCLHlDQUEyQztBQUFsQywrQkFBQSxRQUFRLENBQUE7QUFDakIsdUNBQTBDO0FBQWpDLDhCQUFBLFFBQVEsQ0FBQTtBQUNqQiwyQ0FBNEM7QUFBbkMsa0NBQUEsVUFBVSxDQUFBO0FBQ25CLCtDQUE4QztBQUFyQyxzQ0FBQSxZQUFZLENBQUE7QUFDckIsK0NBQThDO0FBQXJDLHNDQUFBLFlBQVksQ0FBQSJ9

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oc1dpZGdldC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L0NvbmZpZy5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L2luZGV4LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbWl0aHJpbC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvTGF5b3V0LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvdmlldy9MYXlvdXRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvUGlsbGFyZWRMYXlvdXRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvVGlsZUxheW91dGVyLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvdmlldy9Ub2tlbnMuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc3V0aWwvQ2hlY2tzdW0uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc3V0aWwvRGF0ZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzdXRpbC9OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc3V0aWwvVGltZWRQcm9taXNlcy5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzdXRpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzdXRpbC9sb2cuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL2FwaS9tb3VudC1yZWRyYXcuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL2FwaS9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL2h5cGVyc2NyaXB0LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL21pdGhyaWwvbW91bnQtcmVkcmF3LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9wYXRobmFtZS9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL2J1aWxkLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9wYXRobmFtZS9jb21waWxlVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL3BhcnNlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9wcm9taXNlL3BvbHlmaWxsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9wcm9taXNlL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3F1ZXJ5c3RyaW5nL2J1aWxkLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9xdWVyeXN0cmluZy9wYXJzZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9yZW5kZXIvZnJhZ21lbnQuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9oeXBlcnNjcmlwdC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyL2h5cGVyc2NyaXB0Vm5vZGUuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci90cnVzdC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyL3Zub2RlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9yZXF1ZXN0LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9yZXF1ZXN0L3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3JvdXRlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Lyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8od2VicGFjaykvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8od2VicGFjaykvbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvKHdlYnBhY2spL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9Db2xsYXBzaWJsZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9FZGl0Q2hlY2tib3guanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vRWRpdExhYmVsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0VkaXRMaXN0LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0VkaXRTZWxlY3QuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vRWRpdFRleHRhcmVhLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0xhYmVsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL01lbnUuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vTW9kYWwuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vT3B0aW9uc0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9SYWRpb0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9TZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9TbGlkZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vVG9nZ2xlQnV0dG9uLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL1Rvb2xiYXJCdXR0b24uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vVHlwZUFoZWFkLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQSwyQkFBMkIsK0RBQStELGdCQUFnQixFQUFFLEVBQUU7QUFDOUc7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IscUZBQXFGO0FBQ3BIO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMs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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUMsY0FBYztBQUMvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxxQkFBcUI7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsYUFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QixpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsbUJBQW1CO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0osbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDJCQUEyQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsb0JBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsZUFBZTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7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O0FBQy9DO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMkNBQWU7QUFDM0M7QUFDQSxjQUFjLG1CQUFPLENBQUMsK0JBQVM7QUFDL0I7QUFDQSxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QztBQUNBLGtCQUFrQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3ZDO0FBQ0Esa0JBQWtCLG1CQUFPLENBQUMsdUNBQWE7QUFDdkM7QUFDQSxpQkFBaUIsbUJBQU8sQ0FBQyxxQ0FBWTtBQUNyQztBQUNBLG1CQUFtQixtQkFBTyxDQUFDLHlDQUFjO0FBQ3pDO0FBQ0EscUJBQXFCLG1CQUFPLENBQUMsNkNBQWdCO0FBQzdDO0FBQ0EscUJBQXFCLG1CQUFPLENBQUMsNkNBQWdCO0FBQzdDO0FBQ0EsMkNBQTJDLCsvQiIsImZpbGUiOiJoc1dpZGdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYmluL2luZGV4LmpzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG1pdGhyaWxfMSA9IHJlcXVpcmUoXCIuL21pdGhyaWxcIik7XG5jb25zdCBoc3V0aWxfMSA9IHJlcXVpcmUoXCJoc3V0aWxcIik7XG5jb25zdCBsb2cgPSBuZXcgaHN1dGlsXzEuTG9nKCdDb25maWcnKTtcbmNsYXNzIENvbmZpZyB7XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSBub2RlLmF0dHJzLmNvbnRleHQ7XG4gICAgICAgICAgICBpZiAoIW5vZGUuc3RhdGUuY2ZnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcyA9ICh0eXBlb2Ygbm9kZS5hdHRycy5zb3VyY2UgPT09ICdzdHJpbmcnKSA/XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIG1pdGhyaWxfMS5tLnJlcXVlc3QoeyBtZXRob2Q6IFwiR0VUXCIsIHVybDogbm9kZS5hdHRycy5zb3VyY2UgfSlcbiAgICAgICAgICAgICAgICAgICAgOiBub2RlLmF0dHJzLnNvdXJjZTtcbiAgICAgICAgICAgICAgICBub2RlLnN0YXRlLmNmZyA9IHRyYW5zbGF0ZShzLCBzLnJvb3QsIGNvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGNmZyA9IG5vZGUuc3RhdGUuY2ZnO1xuICAgICAgICByZXR1cm4gKGNmZyAmJiBjZmcuY29tcENsYXNzKSA/IG1pdGhyaWxfMS5tKGNmZy5jb21wQ2xhc3MsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY2ZnLmF0dHJzKSwgbm9kZS5hdHRycykpIDogbWl0aHJpbF8xLm0oJ2RpdicsICd3YWl0aW5nJyk7XG4gICAgfVxufVxuZXhwb3J0cy5Db25maWcgPSBDb25maWc7XG5mdW5jdGlvbiB0cmFuc2xhdGUoY29uZmlnLCBzdWJjZmcsIGNvbnRleHQpIHtcbiAgICBpZiAoaXNTeW5vbnltKGNvbmZpZywgc3ViY2ZnKSkge1xuICAgICAgICBzdWJjZmcgPSBjb25maWdbc3ViY2ZnXTtcbiAgICB9XG4gICAgaWYgKFsnc3RyaW5nJywgJ251bWJlcicsICdib29sZWFuJywgJ2Z1bmN0aW9uJ10uaW5kZXhPZih0eXBlb2Ygc3ViY2ZnKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiBzdWJjZmc7XG4gICAgfVxuICAgIGxldCByZXN1bHQgPSBzdWJjZmcubGVuZ3RoID8gW10gOiB7fTtcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmtleXMoc3ViY2ZnKTtcbiAgICBvcHRpb25zLm1hcCgob3B0KSA9PiB7XG4gICAgICAgIGNvbnN0IGNsID0gcmVzb2x2ZShvcHQsIGNvbnRleHQpO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdHJhbnNsYXRlKGNvbmZpZywgc3ViY2ZnW29wdF0sIGNvbnRleHQpO1xuICAgICAgICBpZiAoY2wpIHtcbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhgcmVzb2x2ZWQgY2xhc3MgJyR7b3B0fScgdG8gJHtsb2cuaW5zcGVjdChjbCwgMSl9YCk7XG4gICAgICAgICAgICBjb25zdCByID0ge1xuICAgICAgICAgICAgICAgIGNvbXBDbGFzczogY2wsXG4gICAgICAgICAgICAgICAgYXR0cnM6IGNvbnRlbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAoIUFycmF5LmlzQXJyYXkoc3ViY2ZnKSAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMSkgP1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHIgOlxuICAgICAgICAgICAgICAgIHJlc3VsdFtvcHRdID0gcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpc05hTihwYXJzZUludChvcHQpKSkge1xuICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhgcmVzb2x2ZWQgZGlyZWN0ICcke29wdH0nIHRvICR7bG9nLmluc3BlY3QoY29udGVudCwgMCl9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRbb3B0XSA9IGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gcmVzb2x2ZShzeW0sIGNvbnRleHQpIHtcbiAgICBsb2cuZGVidWcoYHJlc29sdmluZyAke3N5bX0gaW4gY29udGV4dCAnJHtsb2cuaW5zcGVjdChjb250ZXh0LCAwKX0nYCk7XG4gICAgbGV0IGNsO1xuICAgIGNvbnRleHQuc29tZSgoYykgPT4gY2wgPSBjW3N5bV0pO1xuICAgIGxvZy5kZWJ1ZyhgcmVzb2x2aW5nICR7c3ltfSA9PiAke2xvZy5pbnNwZWN0KGNsLCAwKX1gKTtcbiAgICByZXR1cm4gY2w7XG59XG5mdW5jdGlvbiBpc1N5bm9ueW0oY29uZmlnLCBrZXkpIHsgcmV0dXJuIHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmIGNvbmZpZ1trZXldOyB9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRMjl1Wm1sbkxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMME52Ym1acFp5NTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN096czdPenRCUVhsR1FTeDFRMEZCZVVNN1FVRkRla01zYlVOQlFUaENPMEZCUVVNc1RVRkJUU3hIUVVGSExFZEJRVWNzU1VGQlNTeFpRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkxOMFFzVFVGQllTeE5RVUZOTzBsQlExUXNUVUZCVFN4RFFVRkRMRWxCUVZVN08xbEJRMjVDTEUxQlFVMHNUMEZCVHl4SFFVRlRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETzFsQlEzcERMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NSVUZCUlR0blFrRkRha0lzVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4UFFVRlBMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeExRVUZMTEZGQlFWRXNRMEZCUXl4RFFVRkJMRU5CUVVNN2IwSkJRemxETEUxQlFVMHNWMEZCUXl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRkxFMUJRVTBzUlVGQlJTeExRVUZMTEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeEZRVUZETEVOQlFVTTdiMEpCUXpORUxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJRenRuUWtGRGRFSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFZEJRVWNzVTBGQlV5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETzJGQlEyeEVPMUZCUTB3c1EwRkJRenRMUVVGQk8wbEJRMFFzU1VGQlNTeERRVUZETEVsQlFWVTdVVUZEV0N4TlFVRk5MRWRCUVVjc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXp0UlFVTXpRaXhQUVVGUExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVkQlFVY3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRU3hEUVVGRExFTkJRVU1zVjBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4VFFVRlRMRVZCUVVVc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hIUVVGSExFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZkQlFVTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1UwRkJVeXhEUVVGRExFTkJRVU03U1VGRGJra3NRMEZCUXp0RFFVTktPMEZCWkVRc2QwSkJZME03UVVGaFJDeFRRVUZUTEZOQlFWTXNRMEZCUXl4TlFVRlZMRVZCUVVVc1RVRkJWU3hGUVVGRkxFOUJRV0U3U1VGRmNFUXNTVUZCU1N4VFFVRlRMRU5CUVVNc1RVRkJUU3hGUVVGRkxFMUJRVTBzUTBGQlF5eEZRVUZGTzFGQlFVVXNUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dExRVUZGTzBsQlJUTkVMRWxCUVVrc1EwRkJReXhSUVVGUkxFVkJRVVVzVVVGQlVTeEZRVUZGTEZOQlFWTXNSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zVDBGQlR5eE5RVUZOTEVOQlFVTXNTVUZCUlN4RFFVRkRMRVZCUVVVN1VVRkJSU3hQUVVGUExFMUJRVTBzUTBGQlF6dExRVUZGTzBsQlF6ZEdMRWxCUVVrc1RVRkJUU3hIUVVGSExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVRXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETzBsQlJYQkRMRTFCUVUwc1QwRkJUeXhIUVVGSExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1NVRkRjRU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRWRCUVZVc1JVRkJVU3hGUVVGRk8xRkJRemRDTEUxQlFVMHNSVUZCUlN4SFFVRlBMRTlCUVU4c1EwRkJReXhIUVVGSExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdVVUZEY2tNc1RVRkJUU3hQUVVGUExFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNSVUZCUlN4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdVVUZGZUVRc1NVRkJTU3hGUVVGRkxFVkJRVVU3V1VGRFNpeEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVRkRMRzFDUVVGdFFpeEhRVUZITEZGQlFWRXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUXpsRUxFMUJRVTBzUTBGQlF5eEhRVUZITzJkQ1FVTk9MRk5CUVZNc1JVRkJReXhGUVVGRk8yZENRVU5hTEV0QlFVc3NSVUZCUXl4UFFVRlBPMkZCUTJoQ0xFTkJRVU03V1VGRFJpeERRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeFBRVUZQTEVOQlFVTXNUVUZCVFN4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGQkxFTkJRVU03WjBKQlF6ZERMRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEV2l4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFOQlEzWkNPMkZCUlVrN1dVRkRSQ3hKUVVGSkxFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1JVRkJSVHRuUWtGRGRFSXNSMEZCUnl4RFFVRkRMRXRCUVVzc1EwRkJReXh2UWtGQmIwSXNSMEZCUnl4UlFVRlJMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJRenRoUVVOMlJUdFpRVU5FTEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhQUVVGUExFTkJRVU03VTBGRGVrSTdTVUZEVEN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOSUxFOUJRVThzVFVGQlRTeERRVUZETzBGQlEyeENMRU5CUVVNN1FVRlZSQ3hUUVVGVExFOUJRVThzUTBGQlF5eEhRVUZWTEVWQlFVVXNUMEZCWVR0SlFVTjBReXhIUVVGSExFTkJRVU1zUzBGQlN5eERRVUZETEdGQlFXRXNSMEZCUnl4blFrRkJaMElzUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4UFFVRlBMRVZCUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzBsQlEzSkZMRWxCUVVrc1JVRkJUU3hEUVVGRE8wbEJRMWdzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVzc1JVRkJSU3hGUVVGRkxFTkJRVVVzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRM1JETEVkQlFVY3NRMEZCUXl4TFFVRkxMRU5CUVVNc1lVRkJZU3hIUVVGSExFOUJRVThzUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZMRVZCUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETzBsQlEzUkVMRTlCUVU4c1JVRkJSU3hEUVVGRE8wRkJRMlFzUTBGQlF6dEJRVVZFTEZOQlFWTXNVMEZCVXl4RFFVRkRMRTFCUVZVc1JVRkJSU3hIUVVGUExFbEJRVWtzVDBGQlR5eFBRVUZQTEVkQlFVY3NTMEZCU3l4UlFVRlJMRWxCUVVrc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xucmVxdWlyZShcIi4vdmlldy9QaWxsYXJlZExheW91dGVyXCIpO1xucmVxdWlyZShcIi4vdmlldy9UaWxlTGF5b3V0ZXJcIik7XG52YXIgTGF5b3V0XzEgPSByZXF1aXJlKFwiLi92aWV3L0xheW91dFwiKTtcbmV4cG9ydHMuTGF5b3V0ID0gTGF5b3V0XzEuTGF5b3V0O1xudmFyIFRva2Vuc18xID0gcmVxdWlyZShcIi4vdmlldy9Ub2tlbnNcIik7XG5leHBvcnRzLkZJTEwgPSBUb2tlbnNfMS5GSUxMO1xuZXhwb3J0cy5weCA9IFRva2Vuc18xLnB4O1xuZXhwb3J0cy5wYyA9IFRva2Vuc18xLnBjO1xuZXhwb3J0cy5MYXlvdXRUb2tlbiA9IFRva2Vuc18xLkxheW91dFRva2VuO1xudmFyIExheW91dGVyXzEgPSByZXF1aXJlKFwiLi92aWV3L0xheW91dGVyXCIpO1xuZXhwb3J0cy5MYXlvdXRlciA9IExheW91dGVyXzEuTGF5b3V0ZXI7XG52YXIgQ29uZmlnXzEgPSByZXF1aXJlKFwiLi9Db25maWdcIik7XG5leHBvcnRzLkNvbmZpZyA9IENvbmZpZ18xLkNvbmZpZztcbnZhciBtaXRocmlsXzEgPSByZXF1aXJlKFwiLi9taXRocmlsXCIpO1xuZXhwb3J0cy5tID0gbWl0aHJpbF8xLm07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZhVzVrWlhndWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZMUVN4dFEwRkJhVU03UVVGRGFrTXNLMEpCUVRaQ08wRkJSemRDTEhkRFFVRTJRenRCUVVGd1F5d3dRa0ZCUVN4TlFVRk5MRU5CUVVFN1FVRkRaaXgzUTBGRE5rTTdRVUZFY0VNc2QwSkJRVUVzU1VGQlNTeERRVUZCTzBGQlFVVXNjMEpCUVVFc1JVRkJSU3hEUVVGQk8wRkJRVVVzYzBKQlFVRXNSVUZCUlN4RFFVRkJPMEZCUTFvc0swSkJRVUVzVjBGQlZ5eERRVUZCTzBGQlEzQkNMRFJEUVVFclF6dEJRVUYwUXl3NFFrRkJRU3hSUVVGUkxFTkJRVUU3UVVGRGFrSXNiVU5CUVhkRE8wRkJRUzlDTERCQ1FVRkJMRTFCUVUwc1EwRkJRVHRCUVVObUxIRkRRVUY1UXp0QlFVRm9ReXh6UWtGQlFTeERRVUZETEVOQlFVRWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm0gPSByZXF1aXJlKFwibWl0aHJpbFwiKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJXbDBhSEpwYkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OXRhWFJvY21sc0xuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCVVdFc1VVRkJRU3hEUVVGRExFZEJRVWNzVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtaXRocmlsXzEgPSByZXF1aXJlKFwiLi4vbWl0aHJpbFwiKTtcbmNvbnN0IExheW91dGVyXzEgPSByZXF1aXJlKFwiLi9MYXlvdXRlclwiKTtcbmNvbnN0IGhzdXRpbF8xID0gcmVxdWlyZShcImhzdXRpbFwiKTtcbmNvbnN0IGxvZyA9IG5ldyBoc3V0aWxfMS5Mb2coJ0xheW91dCcpO1xuY2xhc3MgTGF5b3V0IHtcbiAgICBnZXRDb21wb25lbnRzKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuICFBcnJheS5pc0FycmF5KG5vZGUuYXR0cnMuY29udGVudCkgPyBub2RlLmF0dHJzLmNvbnRlbnQgOlxuICAgICAgICAgICAgbm9kZS5hdHRycy5jb250ZW50Lm1hcCgoYykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjLmNvbXBDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICBjLmF0dHJzLnJvdXRlID0gbm9kZS5hdHRycy5yb3V0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1pdGhyaWxfMS5tKGMuY29tcENsYXNzLCBjLmF0dHJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRDU1Mobm9kZSkge1xuICAgICAgICByZXR1cm4gbm9kZS5hdHRycy5jc3MgfHwgJyc7XG4gICAgfVxuICAgIG5vcm1hbGl6ZUNvbnRlbnQoY29tcG9uZW50cykge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gW21pdGhyaWxfMS5tKCcuaHMtbGVhZicsIG1pdGhyaWxfMS5tLnRydXN0KGNvbXBvbmVudHMpKV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXBvbmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudHMubWFwKChjb21wKSA9PiAoY29tcCBpbnN0YW5jZW9mIExheW91dCkgPyBjb21wIDogbWl0aHJpbF8xLm0oTGF5b3V0LCB7IGNvbnRlbnQ6IGNvbXAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbY29tcG9uZW50c107XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5ub3JtYWxpemVDb250ZW50KHRoaXMuZ2V0Q29tcG9uZW50cyhub2RlKSk7XG4gICAgICAgIGxldCBjc3MgPSBMYXlvdXRlcl8xLkxheW91dGVyLmNyZWF0ZUxheW91dChub2RlLmF0dHJzLCBjb250ZW50KTtcbiAgICAgICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICAgICAgICBzdHlsZTogbm9kZS5zdHlsZSxcbiAgICAgICAgICAgIHJvdXRlOiBub2RlLmF0dHJzLnJvdXRlLFxuICAgICAgICAgICAgb25jbGljazogbm9kZS5hdHRycy5vbmNsaWNrXG4gICAgICAgIH07XG4gICAgICAgIG5vZGUuYXR0cnMucm91dGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChub2RlLmF0dHJzLmhyZWYpIHtcbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhgaHJlZiAke25vZGUuYXR0cnMuaHJlZn1gKTtcbiAgICAgICAgICAgIGF0dHJzLmhyZWYgPSBub2RlLmF0dHJzLmhyZWY7XG4gICAgICAgICAgICBhdHRycy50YXJnZXQgPSBhdHRycy50YXJnZXQgfHwgJ19ibGFuayc7XG4gICAgICAgICAgICBhdHRycy5vbmNyZWF0ZSA9IG1pdGhyaWxfMS5tLnJvdXRlLmxpbms7XG4gICAgICAgICAgICBhdHRycy5vbnVwZGF0ZSA9IG1pdGhyaWxfMS5tLnJvdXRlLmxpbms7XG4gICAgICAgICAgICByZXR1cm4gbWl0aHJpbF8xLm0oYGEuaHMtbGF5b3V0ICR7Y3NzfSAke3RoaXMuZ2V0Q1NTKG5vZGUpfWAsIGF0dHJzLCBjb250ZW50Lm1hcCgoYykgPT4gYykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1pdGhyaWxfMS5tKGAuaHMtbGF5b3V0ICR7Y3NzfSAke3RoaXMuZ2V0Q1NTKG5vZGUpfWAsIGF0dHJzLCBjb250ZW50Lm1hcCgoYykgPT4gYykpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5MYXlvdXQgPSBMYXlvdXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUR0Y1YjNWMExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDNacFpYY3ZUR0Y1YjNWMExuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCY1VOQkxIZERRVUZ6UXp0QlFVTjBReXg1UTBGQmMwTTdRVUZEZEVNc2JVTkJRVGhDTzBGQlFVTXNUVUZCVFN4SFFVRkhMRWRCUVVjc1NVRkJTU3haUVVGSExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdRVUZwUXpkRUxFMUJRV0VzVFVGQlRUdEpRVzlDVEN4aFFVRmhMRU5CUVVNc1NVRkJWVHRSUVVNNVFpeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkJMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMWxCUXpORUxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVXNzUlVGQlJTeEZRVUZGTzJkQ1FVTTNRaXhKUVVGSkxFTkJRVU1zUTBGQlF5eFRRVUZUTEVWQlFVVTdiMEpCUTJJc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU03YjBKQlEycERMRTlCUVU4c1YwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eFRRVUZUTEVWQlFVVXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8ybENRVU5zUXp0eFFrRkJUVHR2UWtGRFNDeFBRVUZQTEVOQlFVTXNRMEZCUXp0cFFrRkRXanRaUVVOTUxFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExZ3NRMEZCUXp0SlFWRlRMRTFCUVUwc1EwRkJReXhKUVVGVk8xRkJRM1pDTEU5QlFVOHNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFbEJRVWtzUlVGQlJTeERRVUZETzBsQlEyaERMRU5CUVVNN1NVRlJUeXhuUWtGQlowSXNRMEZCUXl4VlFVRTJRenRSUVVOc1JTeEpRVUZKTEU5QlFVOHNWVUZCVlN4TFFVRkxMRkZCUVZFc1JVRkJSVHRaUVVOb1F5eFBRVUZQTEVOQlFVTXNWMEZCUXl4RFFVRkRMRlZCUVZVc1JVRkJSU3hYUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVNdlF6dFJRVU5FTEVsQlFVa3NWVUZCVlN4RFFVRkRMRTFCUVUwc1IwRkJReXhEUVVGRExFVkJRVVU3V1VGRGNrSXNUMEZCVHl4VlFVRlZMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQmVVSXNSVUZCVVN4RlFVRkZMRU5CUTNSRUxFTkJRVU1zU1VGQlNTeFpRVUZaTEUxQlFVMHNRMEZCUXl4RFFVRkJMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEZkQlFVTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1JVRkJReXhQUVVGUExFVkJRVU1zU1VGQlNTeEZRVUZETEVOQlFVTXNRMEZETjBRc1EwRkJRenRUUVVOTU8xRkJSVVFzVDBGQlR5eERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRPMGxCUTNoQ0xFTkJRVU03U1VGeFFrUXNTVUZCU1N4RFFVRkRMRWxCUVZVN1VVRkRXQ3hOUVVGTkxFOUJRVThzUjBGQlJ5eEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zU1VGQlNTeERRVUZETEdGQlFXRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMmhGTEVsQlFVa3NSMEZCUnl4SFFVRkhMRzFDUVVGUkxFTkJRVU1zV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRGNrUXNUVUZCVFN4TFFVRkxMRWRCUVU4N1dVRkRaQ3hMUVVGTExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVczdXVUZEYWtJc1MwRkJTeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3p0WlFVTjJRaXhQUVVGUExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBPMU5CUXpsQ0xFTkJRVU03VVVGRFJpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1IwRkJSeXhUUVVGVExFTkJRVU03VVVGRE4wSXNTVUZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUlVGQlJUdFpRVU5xUWl4SFFVRkhMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRM0pETEV0QlFVc3NRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTTdXVUZETjBJc1MwRkJTeXhEUVVGRExFMUJRVTBzUjBGQlJ5eExRVUZMTEVOQlFVTXNUVUZCVFN4SlFVRkpMRkZCUVZFc1EwRkJRenRaUVVONFF5eExRVUZMTEVOQlFVTXNVVUZCVVN4SFFVRkhMRmRCUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETzFsQlF6bENMRXRCUVVzc1EwRkJReXhSUVVGUkxFZEJRVWNzVjBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNN1dVRkZPVUlzVDBGQlR5eFhRVUZETEVOQlFVTXNaVUZCWlN4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4RlFVRkZMRXRCUVVzc1JVRkJSU3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCU3l4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFOQlEzcEdPMkZCUVUwN1dVRkRTQ3hQUVVGUExGZEJRVU1zUTBGQlF5eGpRVUZqTEVkQlFVY3NTVUZCU1N4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZMTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VTBGRGVFWTdTVUZEVEN4RFFVRkRPME5CUTBvN1FVRnlSMFFzZDBKQmNVZERJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBUb2tlbnNfMSA9IHJlcXVpcmUoXCIuL1Rva2Vuc1wiKTtcbmNsYXNzIExheW91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihhcmVhRGVzYykge1xuICAgICAgICB0aGlzLmFyZWFEZXNjID0gYXJlYURlc2M7XG4gICAgICAgIHRoaXMuc3BhY2luZyA9IDA7XG4gICAgfVxuICAgIHN0YXRpYyB0cmFuc2xhdGUocGFyYW1zKSB7XG4gICAgICAgIGlmIChwYXJhbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaCgnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmFtcy5tYXAoKHBhcmFtKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbS5lbmRzV2l0aCgncHgnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVG9rZW5zXzEucHgocGFyc2VJbnQocGFyYW0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtLmVuZHNXaXRoKCclJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRva2Vuc18xLnBjKHBhcnNlSW50KHBhcmFtKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJhbS50b0xvd2VyQ2FzZSgpID09PSAnZmlsbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRva2Vuc18xLkZJTEw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHJlZ2lzdGVyKGtleXdvcmQsIHN0eWxlKSB7XG4gICAgICAgIExheW91dGVyLmxheW91dFN0eWxlc1trZXl3b3JkXSA9IHN0eWxlO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlTGF5b3V0KGF0dHJzLCBjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBjc3MgPSAnJztcbiAgICAgICAgT2JqZWN0LmtleXMoTGF5b3V0ZXIubGF5b3V0U3R5bGVzKS5zb21lKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoYXR0cnNba2V5XSkge1xuICAgICAgICAgICAgICAgIGNzcyA9IG5ldyBMYXlvdXRlci5sYXlvdXRTdHlsZXNba2V5XShMYXlvdXRlci50cmFuc2xhdGUoYXR0cnNba2V5XSkpLmdldFN0eWxlcyhjb21wb25lbnRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjc3M7XG4gICAgfVxufVxuZXhwb3J0cy5MYXlvdXRlciA9IExheW91dGVyO1xuTGF5b3V0ZXIubGF5b3V0U3R5bGVzID0ge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUR0Y1YjNWMFpYSXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTl6Y21NdmRtbGxkeTlNWVhsdmRYUmxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFWbEJMSEZEUVVGM1F6dEJRWE5DZUVNc1RVRkJjMElzVVVGQlVUdEpRWGxGTVVJc1dVRkJiVUlzVVVGQmMwSTdVVUZCZEVJc1lVRkJVU3hIUVVGU0xGRkJRVkVzUTBGQll6dFJRVko2UXl4WlFVRlBMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJVV2RETEVOQlFVTTdTVUY2UkhKRExFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNUVUZCZDBJN1VVRkROME1zU1VGQlNTeE5RVUZOTEVOQlFVTXNUVUZCVFN4TFFVRkxMRU5CUVVNc1JVRkJSVHRaUVVGRkxFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNN1UwRkJSVHRSUVVNM1F5eFBRVUZQTEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhMUVVGblFpeEZRVUZGTEVWQlFVVTdXVUZEYmtNc1NVRkJTU3hQUVVGUExFdEJRVXNzUzBGQlN5eFJRVUZSTEVWQlFVVTdaMEpCUXpOQ0xFbEJRVWtzUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSVHR2UWtGQlJTeFBRVUZQTEZkQlFVVXNRMEZCUXl4UlFVRlJMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dHBRa0ZCUlR0blFrRkRla1FzU1VGQlNTeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRk8yOUNRVUZGTEU5QlFVOHNWMEZCUlN4RFFVRkRMRkZCUVZFc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETzJsQ1FVRkZPMmRDUVVONFJDeEpRVUZKTEV0QlFVc3NRMEZCUXl4WFFVRlhMRVZCUVVVc1MwRkJSeXhOUVVGTkxFVkJRVVU3YjBKQlFVVXNUMEZCVHl4aFFVRkpMRU5CUVVNN2FVSkJRVU03WVVGRGNFUTdhVUpCUVUwN1owSkJRMGdzVDBGQlR5eExRVUZMTEVOQlFVTTdZVUZEYUVJN1VVRkRUQ3hEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdTVUZYVFN4TlFVRk5MRU5CUVVNc1VVRkJVU3hEUVVGRExFOUJRV01zUlVGQlJTeExRVUZ4UWp0UlFVVjRSQ3hSUVVGUkxFTkJRVU1zV1VGQldTeERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRXRCUVVzc1EwRkJRenRKUVVNelF5eERRVUZETzBsQlZVMHNUVUZCVFN4RFFVRkRMRmxCUVZrc1EwRkJReXhMUVVGVExFVkJRVVVzVlVGQmRVSTdVVUZEZWtRc1NVRkJTU3hIUVVGSExFZEJRVWNzUlVGQlJTeERRVUZETzFGQlEySXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRk8xbEJRekZETEVsQlFVa3NTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRk8yZENRVU5hTEVkQlFVY3NSMEZCUnl4SlFVRkpMRkZCUVZFc1EwRkJReXhaUVVGWkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNVVUZCVVN4RFFVRkRMRk5CUVZNc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRk5CUVZNc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF6dG5Ra0ZGTTBZc1QwRkJUeXhKUVVGSkxFTkJRVU03WVVGRFpqdFpRVU5FTEU5QlFVOHNTMEZCU3l4RFFVRkRPMUZCUTJwQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NUMEZCVHl4SFFVRkhMRU5CUVVNN1NVRkRaaXhEUVVGRE96dEJRVGxFVEN3MFFrRXdSa003UVVGeVJsVXNjVUpCUVZrc1IwRkJkVUlzUlVGQlJTeERRVUZESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTGF5b3V0ZXJfMSA9IHJlcXVpcmUoXCIuL0xheW91dGVyXCIpO1xuY29uc3QgVG9rZW5zXzEgPSByZXF1aXJlKFwiLi9Ub2tlbnNcIik7XG5leHBvcnRzLlBpbGxhckxheW91dHMgPSBbXG4gICAgJ2NvbHVtbnMnLCAncm93cydcbl07XG5jb25zdCBjUGFyYW1zID0ge1xuICAgIGNvbHVtbnM6IHtcbiAgICAgICAgY3NzQ2xhc3M6ICcuaHMtY29sdW1uLWxheW91dCcsXG4gICAgICAgIGZpZWxkczogWyd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLCAnaGVpZ2h0JywgJ3dpZHRoJ11cbiAgICB9LFxuICAgIHJvd3M6IHtcbiAgICAgICAgY3NzQ2xhc3M6ICcuaHMtcm93LWxheW91dCcsXG4gICAgICAgIGZpZWxkczogWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nLCAnd2lkdGgnLCAnaGVpZ2h0J11cbiAgICB9XG59O1xuY2xhc3MgUGlsbGFyTGF5b3V0ZXIgZXh0ZW5kcyBMYXlvdXRlcl8xLkxheW91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMsIGFyZWFEZXNjKSB7XG4gICAgICAgIHN1cGVyKGFyZWFEZXNjKTtcbiAgICAgICAgdGhpcy5hcmVhRGVzYyA9IGFyZWFEZXNjO1xuICAgICAgICB0aGlzLmZpZWxkcyA9IHBhcmFtcy5maWVsZHM7XG4gICAgICAgIHRoaXMuY3NzQ2xhc3MgPSBwYXJhbXMuY3NzQ2xhc3M7XG4gICAgICAgIGxldCBuID0gYXJlYURlc2MubGVuZ3RoIC0gMTtcbiAgICAgICAgbGV0IGZpcnN0ID0gMDtcbiAgICAgICAgbGV0IGxhc3QgPSAwO1xuICAgICAgICB0aGlzLnVuaXQgPSBhcmVhRGVzYy5zb21lKChhcmVhKSA9PiAoYXJlYSBpbnN0YW5jZW9mIFRva2Vuc18xLlBpeGVsVG9rZW4pKSA/XG4gICAgICAgICAgICB0aGlzLnVuaXRQaXhlbCA6IHRoaXMudW5pdFBlcmNlbnQ7XG4gICAgICAgIGFyZWFEZXNjLnNvbWUoKGFyZWEsIGkpID0+ICgoYXJlYURlc2NbaV0gaW5zdGFuY2VvZiBUb2tlbnNfMS5EZWZpbmVkVG9rZW4pID8gKytmaXJzdCA8IDAgOiB0cnVlKSk7XG4gICAgICAgIGFyZWFEZXNjLnNvbWUoKGFyZWEsIGkpID0+ICgoYXJlYURlc2NbbiAtIGldIGluc3RhbmNlb2YgVG9rZW5zXzEuRGVmaW5lZFRva2VuKSA/ICsrbGFzdCA8IDAgOiB0cnVlKSk7XG4gICAgICAgIHRoaXMuZmlyc3RGaXhlZCA9IGZpcnN0O1xuICAgICAgICB0aGlzLmxhc3RGaXhlZCA9IE1hdGgubWluKGxhc3QsIGFyZWFEZXNjLmxlbmd0aCAtIGZpcnN0KTtcbiAgICB9XG4gICAgZ2V0U2l6ZXMobnVtKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5maXJzdEZpeGVkO1xuICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5sYXN0Rml4ZWQ7XG4gICAgICAgIGNvbnN0IGRlc2MgPSB0aGlzLmFyZWFEZXNjO1xuICAgICAgICBjb25zdCBsZW4gPSBkZXNjLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIFsuLi5BcnJheShudW0pLmtleXMoKV0ubWFwKChpKSA9PiB7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IG51bGw7XG4gICAgICAgICAgICBsZXQgdCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoaSA+IG51bSAtIDEgLSBsYXN0KSB7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IGRlc2NbbGVuIC0gKG51bSAtIGkpXS5nZXRTaXplKCk7XG4gICAgICAgICAgICAgICAgdCA9ICdlbmQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaSA8IGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IGRlc2NbaV0uZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgICAgIHQgPSAnc3RhcnQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobGVuID4gMCAmJiBsZW4gPT09IGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IGRlc2NbbGVuIC0gMV0uZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgICAgIHQgPSAnc3RhcnQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgc2l6ZTogc2l6ZSwgY29kZTogdCwgZmllbGRzOiB7fSB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdW5pdFBlcmNlbnQobnVtKSB7XG4gICAgICAgIGxldCBmID0gdGhpcy5maWVsZHM7XG4gICAgICAgIGxldCBtYXggPSAxMDAuMDtcbiAgICAgICAgbGV0IHN0eWxlcyA9IHRoaXMuZ2V0U2l6ZXMobnVtKTtcbiAgICAgICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4geyBpZiAoc3R5bGUuc2l6ZSkge1xuICAgICAgICAgICAgbWF4ID0gbWF4IC0gc3R5bGUuc2l6ZTtcbiAgICAgICAgICAgIG51bS0tO1xuICAgICAgICB9IH0pO1xuICAgICAgICBsZXQgZGVmRGltID0gbWF4IC8gbnVtO1xuICAgICAgICBmdW5jdGlvbiBwYXNzKHN0eWxlcywgaXgwLCBpeDEsIGJyZWFrQ29uZCkge1xuICAgICAgICAgICAgbGV0IHN1bURpbSA9IDA7XG4gICAgICAgICAgICBzdHlsZXMuc29tZShzdHlsZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNpemUgPSBzdHlsZS5zaXplIHx8IGRlZkRpbTtcbiAgICAgICAgICAgICAgICBpZiAoYnJlYWtDb25kKHN0eWxlLmNvZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbaXgwXSA9IHN1bURpbSArICclJztcbiAgICAgICAgICAgICAgICBzdW1EaW0gKz0gc2l6ZTtcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbaXgxXSA9ICgxMDAgLSBzdW1EaW0pICsgJyUnO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzVdXSA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBwYXNzKHN0eWxlcywgZlsyXSwgZlszXSwgKGUpID0+IGUgPT09ICdlbmQnKTtcbiAgICAgICAgcGFzcyhzdHlsZXMucmV2ZXJzZSgpLCBmWzNdLCBmWzJdLCAoZSkgPT4gZSAhPT0gJ2VuZCcpO1xuICAgICAgICByZXR1cm4gc3R5bGVzLnJldmVyc2UoKTtcbiAgICB9XG4gICAgdW5pdFBpeGVsKG51bSkge1xuICAgICAgICBsZXQgc3R5bGVzID0gdGhpcy5nZXRTaXplcyhudW0pO1xuICAgICAgICBsZXQgZiA9IHRoaXMuZmllbGRzO1xuICAgICAgICBsZXQgZGVmRGltID0gMTAwLjAgLyBudW07XG4gICAgICAgIGxldCBzdW1EaW0gPSAwO1xuICAgICAgICBzdHlsZXMuc29tZSgoc3R5bGUsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChzdHlsZS5jb2RlID09PSAnc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbMl1dID0gc3VtRGltICsgJ3B4JztcbiAgICAgICAgICAgICAgICBzdW1EaW0gKz0gc3R5bGUuc2l6ZSArICh0aGlzLnNwYWNpbmcgfHwgMCkgKyAodGhpcy5zcGFjaW5nIHx8IDApO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzNdXSA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZls1XV0gPSBzdHlsZS5zaXplICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0eWxlLmNvZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZlsyXV0gPSAoc3VtRGltID4gMCkgPyAoc3VtRGltICsgJ3B4JykgOiAoaSAqIGRlZkRpbSArICclJyk7XG4gICAgICAgICAgICAgICAgc3VtRGltID0gLTE7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbM11dID0gKDEwMCAtIChpICsgMSkgKiBkZWZEaW0pICsgJyUnO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzVdXSA9ICdhdXRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0eWxlLmNvZGUgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBzdW1EaW0gPSAwO1xuICAgICAgICBzdHlsZXMuc2xpY2UoKS5yZXZlcnNlKCkuc29tZSgoc3R5bGUsIGkpID0+IHtcbiAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzNdXSA9IHN1bURpbSArICdweCc7XG4gICAgICAgICAgICBpZiAoc3R5bGUuY29kZSA9PT0gJ2VuZCcpIHtcbiAgICAgICAgICAgICAgICBzdW1EaW0gKz0gc3R5bGUuc2l6ZSArICh0aGlzLnNwYWNpbmcgfHwgMCkgKyAodGhpcy5zcGFjaW5nIHx8IDApO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzJdXSA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZls1XV0gPSBzdHlsZS5zaXplICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzdW1EaW0gPiAwICYmIHN0eWxlLmNvZGUgIT09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbNV1dID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICAgIGdldFN0eWxlcyhjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBmID0gdGhpcy5maWVsZHM7XG4gICAgICAgIGxldCBzdHlsZXMgPSB0aGlzLnVuaXQoY29tcG9uZW50cy5sZW5ndGgpO1xuICAgICAgICBjb21wb25lbnRzLm1hcCgoYywgaSkgPT4ge1xuICAgICAgICAgICAgYy5zdHlsZSA9IGAke2ZbNF19OjEwMCU7YDtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHN0eWxlc1tpXS5maWVsZHMpLmZvckVhY2goKHN0KSA9PiB7IGMuc3R5bGUgKz0gYCR7c3R9OiAke3N0eWxlc1tpXS5maWVsZHNbc3RdfTtgOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNzc0NsYXNzO1xuICAgIH1cbn1cbmNsYXNzIENvbHVtbnMgZXh0ZW5kcyBQaWxsYXJMYXlvdXRlciB7XG4gICAgY29uc3RydWN0b3IoYXJlYURlc2MpIHtcbiAgICAgICAgc3VwZXIoY1BhcmFtc1tleHBvcnRzLlBpbGxhckxheW91dHNbMF1dLCBhcmVhRGVzYyk7XG4gICAgICAgIHRoaXMuYXJlYURlc2MgPSBhcmVhRGVzYztcbiAgICB9XG59XG5jbGFzcyBSb3dzIGV4dGVuZHMgUGlsbGFyTGF5b3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZWFEZXNjKSB7XG4gICAgICAgIHN1cGVyKGNQYXJhbXNbZXhwb3J0cy5QaWxsYXJMYXlvdXRzWzFdXSwgYXJlYURlc2MpO1xuICAgICAgICB0aGlzLmFyZWFEZXNjID0gYXJlYURlc2M7XG4gICAgfVxufVxuTGF5b3V0ZXJfMS5MYXlvdXRlci5yZWdpc3RlcihleHBvcnRzLlBpbGxhckxheW91dHNbMF0sIENvbHVtbnMpO1xuTGF5b3V0ZXJfMS5MYXlvdXRlci5yZWdpc3RlcihleHBvcnRzLlBpbGxhckxheW91dHNbMV0sIFJvd3MpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVUdsc2JHRnlaV1JNWVhsdmRYUmxjaTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1TDNOeVl5OTJhV1YzTDFCcGJHeGhjbVZrVEdGNWIzVjBaWEl1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRXlRMEVzZVVOQlFUQkRPMEZCUXpGRExIRkRRVVYzUXp0QlFXZENNMElzVVVGQlFTeGhRVUZoTEVkQlFVYzdTVUZEZWtJc1UwRkJVeXhGUVVGRkxFMUJRVTA3UTBGRGNFSXNRMEZCUXp0QlFVdEdMRTFCUVUwc1QwRkJUeXhIUVVGSE8wbEJRMW9zVDBGQlR5eEZRVUZuUWp0UlFVTnVRaXhSUVVGUkxFVkJRVVVzYlVKQlFXMUNPMUZCUXpkQ0xFMUJRVTBzUlVGQlJTeERRVUZETEV0QlFVc3NSVUZCUlN4UlFVRlJMRVZCUVVVc1RVRkJUU3hGUVVGRkxFOUJRVThzUlVGQlJTeFJRVUZSTEVWQlFVVXNUMEZCVHl4RFFVRkRPMHRCUTJoRk8wbEJRMFFzU1VGQlNTeEZRVUZuUWp0UlFVTm9RaXhSUVVGUkxFVkJRVVVzWjBKQlFXZENPMUZCUXpGQ0xFMUJRVTBzUlVGQlJTeERRVUZETEUxQlFVMHNSVUZCUlN4UFFVRlBMRVZCUVVVc1MwRkJTeXhGUVVGRkxGRkJRVkVzUlVGQlJTeFBRVUZQTEVWQlFVVXNVVUZCVVN4RFFVRkRPMHRCUTJoRk8wTkJRMG9zUTBGQlF6dEJRVTlHTEUxQlFXVXNZMEZCWlN4VFFVRlJMRzFDUVVGUk8wbEJZVEZETEZsQlFWa3NUVUZCYlVJc1JVRkJVeXhSUVVGelFqdFJRVU14UkN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03VVVGRWIwSXNZVUZCVVN4SFFVRlNMRkZCUVZFc1EwRkJZenRSUVVVeFJDeEpRVUZKTEVOQlFVTXNUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU03VVVGRE5VSXNTVUZCU1N4RFFVRkRMRkZCUVZFc1IwRkJSeXhOUVVGTkxFTkJRVU1zVVVGQlVTeERRVUZETzFGQlJXaERMRWxCUVVrc1EwRkJReXhIUVVGSExGRkJRVkVzUTBGQlF5eE5RVUZOTEVkQlFVTXNRMEZCUXl4RFFVRkRPMUZCUXpGQ0xFbEJRVWtzUzBGQlN5eEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTmtMRWxCUVVrc1NVRkJTU3hIUVVGSkxFTkJRVU1zUTBGQlF6dFJRVVZrTEVsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVsQlFXZENMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU1zU1VGQlNTeFpRVUZaTEcxQ1FVRlZMRU5CUVVNc1EwRkJReXhEUVVGQkxFTkJRVU03V1VGRE1VVXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXp0UlFVZDBReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNTVUZCWjBJc1JVRkJSU3hEUVVGUkxFVkJRVVVzUlVGQlJTeERRVU42UXl4RFFVRkRMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF5eFpRVUZqTEhGQ1FVRlpMRU5CUVVNc1EwRkJRU3hEUVVGRExFTkJRVU1zUlVGQlJTeExRVUZMTEVkQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlIycEZMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZuUWl4RlFVRkZMRU5CUVZFc1JVRkJSU3hGUVVGRkxFTkJRM3BETEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhIUVVGRExFTkJRVU1zUTBGQlF5eFpRVUZaTEhGQ1FVRlpMRU5CUVVNc1EwRkJRU3hEUVVGRExFTkJRVU1zUlVGQlJTeEpRVUZKTEVkQlFVTXNRMEZCUXl4RFFVRkZMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlJXcEZMRWxCUVVrc1EwRkJReXhWUVVGVkxFZEJRVWNzUzBGQlN5eERRVUZETzFGQlEzaENMRWxCUVVrc1EwRkJReXhUUVVGVExFZEJRVWtzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRVZCUVVVc1VVRkJVU3hEUVVGRExFMUJRVTBzUjBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0SlFVTTFSQ3hEUVVGRE8wbEJVMDhzVVVGQlVTeERRVUZETEVkQlFWVTdVVUZEZGtJc1RVRkJUU3hMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXp0UlFVTTVRaXhOUVVGTkxFbEJRVWtzUjBGQlNTeEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRPMUZCUXpkQ0xFMUJRVTBzU1VGQlNTeEhRVUZKTEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNN1VVRkROVUlzVFVGQlRTeEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJRenRSUVVWNFFpeFBRVUZQTEVOQlFVTXNSMEZCUnl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGUkxFVkJRVVVzUlVGQlJUdFpRVU16UXl4SlFVRkpMRWxCUVVrc1IwRkJWU3hKUVVGSkxFTkJRVU03V1VGRGRrSXNTVUZCU1N4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRE8xbEJRMklzU1VGQlNTeERRVUZETEVkQlFVY3NSMEZCUnl4SFFVRkRMRU5CUVVNc1IwRkJReXhKUVVGSkxFVkJRVWM3WjBKQlFVVXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhIUVVGSExFZEJRVWNzUTBGQlF5eEhRVUZITEVkQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF6dG5Ra0ZCUXl4RFFVRkRMRWRCUVVjc1MwRkJTeXhEUVVGRE8yRkJRVVU3YVVKQlEzQkZMRWxCUVVrc1EwRkJReXhIUVVGSExFdEJRVXNzUlVGQlJ6dG5Ra0ZCUlN4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMmRDUVVGRExFTkJRVU1zUjBGQlJ5eFBRVUZQTEVOQlFVTTdZVUZCUlR0cFFrRkRNVVFzU1VGQlNTeEhRVUZITEVkQlFVTXNRMEZCUXl4SlFVRkpMRWRCUVVjc1MwRkJSeXhMUVVGTExFVkJRVU03WjBKQlFVVXNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhIUVVGSExFZEJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNN1owSkJRVU1zUTBGQlF5eEhRVUZITEU5QlFVOHNRMEZCUXp0aFFVRkZPMWxCUXpWRkxFOUJRVThzUlVGQlF5eEpRVUZKTEVWQlFVTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1JVRkJReXhEUVVGRExFVkJRVVVzVFVGQlRTeEZRVUZETEVWQlFVVXNSVUZCUXl4RFFVRkRPMUZCUXpGRExFTkJRVU1zUTBGQlF5eERRVUZETzBsQlExQXNRMEZCUXp0SlFVVlBMRmRCUVZjc1EwRkJReXhIUVVGVk8xRkJRekZDTEVsQlFVa3NRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU03VVVGRGNFSXNTVUZCU1N4SFFVRkhMRWRCUVVjc1MwRkJTeXhEUVVGRE8xRkJRMmhDTEVsQlFVa3NUVUZCVFN4SFFVRm5RaXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUlRkRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRVZCUVVVc1IwRkJSeXhKUVVGSkxFdEJRVXNzUTBGQlF5eEpRVUZKTEVWQlFVVTdXVUZCUlN4SFFVRkhMRWRCUVVjc1IwRkJSeXhIUVVGSExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTTdXVUZCUXl4SFFVRkhMRVZCUVVVc1EwRkJRenRUUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEYUVZc1NVRkJTU3hOUVVGTkxFZEJRVWNzUjBGQlJ5eEhRVUZITEVkQlFVY3NRMEZCUXp0UlFVVjJRaXhUUVVGVExFbEJRVWtzUTBGQlF5eE5RVUZ0UWl4RlFVRkZMRWRCUVZVc1JVRkJSU3hIUVVGVkxFVkJRVVVzVTBGQlowTTdXVUZEZGtZc1NVRkJTU3hOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETzFsQlEyWXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUlVGQlJUdG5Ra0ZEYUVJc1NVRkJTU3hKUVVGSkxFZEJRVWNzUzBGQlN5eERRVUZETEVsQlFVa3NTVUZCU1N4TlFVRk5MRU5CUVVNN1owSkJRMmhETEVsQlFVa3NVMEZCVXl4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJUdHZRa0ZCUlN4UFFVRlBMRWxCUVVrc1EwRkJRenRwUWtGQlJUdG5Ra0ZETTBNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4TlFVRk5MRWRCUVVNc1IwRkJSeXhEUVVGRE8yZENRVU12UWl4TlFVRk5MRWxCUVVrc1NVRkJTU3hEUVVGRE8yZENRVU5tTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVkQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVNc1IwRkJSeXhEUVVGRE8yZENRVU55UXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJRenRuUWtGRE5VSXNUMEZCVHl4TFFVRkxMRU5CUVVNN1dVRkRha0lzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEVUN4RFFVRkRPMUZCUlVRc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCVVN4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVWNzUzBGQlN5eERRVUZETEVOQlFVTTdVVUZEYkVRc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJVU3hGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETEV0QlFVY3NTMEZCU3l4RFFVRkRMRU5CUVVNN1VVRkROVVFzVDBGQlR5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNN1NVRkROVUlzUTBGQlF6dEpRVVZQTEZOQlFWTXNRMEZCUXl4SFFVRlZPMUZCUTNoQ0xFbEJRVWtzVFVGQlRTeEhRVUZuUWl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFGQlF6ZERMRWxCUVVrc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTTdVVUZGY0VJc1NVRkJTU3hOUVVGTkxFZEJRVWNzUzBGQlN5eEhRVUZETEVkQlFVY3NRMEZCUXp0UlFVZDJRaXhKUVVGSkxFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVTTdVVUZEWml4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUzBGQlN5eEZRVUZGTEVOQlFVTXNSVUZCUlN4RlFVRkZPMWxCUTNKQ0xFbEJRVWtzUzBGQlN5eERRVUZETEVsQlFVa3NTMEZCUnl4UFFVRlBMRVZCUVVVN1owSkJRM1JDTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NUVUZCVFN4SFFVRkZMRWxCUVVrc1EwRkJRenRuUWtGRGJFTXNUVUZCVFN4SlFVRkpMRXRCUVVzc1EwRkJReXhKUVVGSkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4SlFVRkpMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGFrVXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4TlFVRk5MRU5CUVVNN1owSkJRelZDTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NTMEZCU3l4RFFVRkRMRWxCUVVrc1IwRkJSU3hKUVVGSkxFTkJRVU03WVVGRGVrTTdhVUpCUVUwc1NVRkJTU3hMUVVGTExFTkJRVU1zU1VGQlNTeExRVUZMTEVsQlFVa3NSVUZCUlR0blFrRkROVUlzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEUxQlFVMHNSMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRU3hEUVVGRExFTkJRVU1zUTBGQlF5eE5RVUZOTEVkQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZETEUxQlFVMHNSMEZCUnl4SFFVRkhMRU5CUVVNc1EwRkJRenRuUWtGRGJrVXNUVUZCVFN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRE8yZENRVU5hTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRWRCUVVNc1EwRkJReXhEUVVGRExFZEJRVU1zUTBGQlF5eERRVUZETEVkQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1IwRkJSeXhEUVVGRE8yZENRVU01UXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJRenRoUVVNdlFqdHBRa0ZCVFN4SlFVRkpMRXRCUVVzc1EwRkJReXhKUVVGSkxFdEJRVWNzUzBGQlN5eEZRVUZGTzJkQ1FVTXpRaXhQUVVGUExFbEJRVWtzUTBGQlF6dGhRVU5tTzFsQlEwUXNUMEZCVHl4TFFVRkxMRU5CUVVNN1VVRkRha0lzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZIU0N4TlFVRk5MRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJRMWdzVFVGQlRTeERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSVHRaUVVOMlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEUxQlFVMHNSMEZCUnl4SlFVRkpMRU5CUVVNN1dVRkRia01zU1VGQlNTeExRVUZMTEVOQlFVTXNTVUZCU1N4TFFVRkxMRXRCUVVzc1JVRkJSVHRuUWtGRGRFSXNUVUZCVFN4SlFVRkpMRXRCUVVzc1EwRkJReXhKUVVGSkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4SlFVRkpMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGFrVXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4TlFVRk5MRU5CUVVNN1owSkJRelZDTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NTMEZCU3l4RFFVRkRMRWxCUVVrc1IwRkJReXhKUVVGSkxFTkJRVU03WVVGRGVFTTdhVUpCUVUwN1owSkJRMGdzU1VGQlNTeE5RVUZOTEVkQlFVTXNRMEZCUXl4SlFVRkpMRXRCUVVzc1EwRkJReXhKUVVGSkxFdEJRVXNzVDBGQlR5eEZRVUZGTzI5Q1FVTndReXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFMUJRVTBzUTBGQlF6dHBRa0ZETDBJN1owSkJRMFFzVDBGQlR5eEpRVUZKTEVOQlFVTTdZVUZEWmp0WlFVTkVMRTlCUVU4c1MwRkJTeXhEUVVGRE8xRkJRMnBDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTBnc1QwRkJUeXhOUVVGTkxFTkJRVU03U1VGRGJFSXNRMEZCUXp0SlFWRlRMRk5CUVZNc1EwRkJReXhWUVVFNFFqdFJRVU01UXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETzFGQlEzQkNMRWxCUVVrc1RVRkJUU3hIUVVGblFpeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dFJRVU4yUkN4VlFVRlZMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQll5eEZRVUZGTEVOQlFWRXNSVUZCUlN4RlFVRkZPMWxCUlhoRExFTkJRVU1zUTBGQlF5eExRVUZMTEVkQlFVY3NSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExGRkJRVkVzUTBGQlF6dFpRVU14UWl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eEZRVUZUTEVWQlFVVXNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJReXhMUVVGTExFbEJRVWtzUjBGQlJ5eEZRVUZGTEV0QlFVc3NUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRE5VY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hQUVVGUExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTTdTVUZEZWtJc1EwRkJRenREUVVOS08wRkJNa1JFTEUxQlFVMHNUMEZCVVN4VFFVRlJMR05CUVdNN1NVRkRhRU1zV1VGQmJVSXNVVUZCYzBJN1VVRkJTU3hMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEhGQ1FVRmhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeFJRVUZSTEVOQlFVTXNRMEZCUXp0UlFVRnlSU3hoUVVGUkxFZEJRVklzVVVGQlVTeERRVUZqTzBsQlFXbEVMRU5CUVVNN1EwRkRPVVk3UVVFeVJFUXNUVUZCVFN4SlFVRkxMRk5CUVZFc1kwRkJZenRKUVVNM1FpeFpRVUZ0UWl4UlFVRnpRanRSUVVGSkxFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNjVUpCUVdFc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEZGQlFWRXNRMEZCUXl4RFFVRkRPMUZCUVhKRkxHRkJRVkVzUjBGQlVpeFJRVUZSTEVOQlFXTTdTVUZCYVVRc1EwRkJRenREUVVNNVJqdEJRVVZFTEcxQ1FVRlJMRU5CUVVNc1VVRkJVU3hEUVVGRExIRkNRVUZoTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03UVVGRE4wTXNiVUpCUVZFc1EwRkJReXhSUVVGUkxFTkJRVU1zY1VKQlFXRXNRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJTeXhKUVVGSkxFTkJRVU1zUTBGQlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IExheW91dGVyXzEgPSByZXF1aXJlKFwiLi9MYXlvdXRlclwiKTtcbmNvbnN0IFRva2Vuc18xID0gcmVxdWlyZShcIi4vVG9rZW5zXCIpO1xuY2xhc3MgVGlsZUxheW91dGVyIGV4dGVuZHMgTGF5b3V0ZXJfMS5MYXlvdXRlciB7XG4gICAgY29uc3RydWN0b3IoYXJlYURlc2MpIHtcbiAgICAgICAgc3VwZXIoYXJlYURlc2MpO1xuICAgICAgICB0aGlzLmFyZWFEZXNjID0gYXJlYURlc2M7XG4gICAgICAgIHRoaXMudW5pdCA9IGFyZWFEZXNjLnNvbWUoKGFyZWEpID0+IChhcmVhIGluc3RhbmNlb2YgVG9rZW5zXzEuUGl4ZWxUb2tlbikpID9cbiAgICAgICAgICAgIHRoaXMudW5pdFBpeGVsIDogdGhpcy51bml0UGVyY2VudDtcbiAgICB9XG4gICAgdW5pdFBlcmNlbnQobnVtKSB7XG4gICAgICAgIGNvbnN0IGRlc2MgPSB0aGlzLmFyZWFEZXNjO1xuICAgICAgICBjb25zdCBmaWxsID0gdGhpcy5hcmVhRGVzYy5zb21lKGEgPT4gKGEgaW5zdGFuY2VvZiBUb2tlbnNfMS5GaWxsVG9rZW4pKTtcbiAgICAgICAgY29uc3Qgcm9vdCA9IE1hdGguc3FydChudW0pO1xuICAgICAgICBjb25zdCByb3dzID0gTWF0aC5yb3VuZChyb290KTtcbiAgICAgICAgbGV0IGNvbHMgPSBNYXRoLmZsb29yKHJvb3QpO1xuICAgICAgICBpZiAocm9vdCA+IGNvbHMpIHtcbiAgICAgICAgICAgIGNvbHMrKztcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2lkdGggPSAoZGVzY1swXSBpbnN0YW5jZW9mIFRva2Vuc18xLkRlZmluZWRUb2tlbikgPyBkZXNjWzBdLmdldFNpemUoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGhlaWdodCA9IChkZXNjWzFdIGluc3RhbmNlb2YgVG9rZW5zXzEuRGVmaW5lZFRva2VuKSA/IGRlc2NbMV0uZ2V0U2l6ZSgpIDogd2lkdGg7XG4gICAgICAgIHdpZHRoID0gd2lkdGggfHwgMTAwIC8gY29scztcbiAgICAgICAgaGVpZ2h0ID0gaGVpZ2h0IHx8IDEwMCAvIHJvd3M7XG4gICAgICAgIGxldCBsZWZ0ID0gMDtcbiAgICAgICAgbGV0IHRvcCA9IDA7XG4gICAgICAgIGxldCBzdHlsZXMgPSBbLi4uQXJyYXkobnVtKS5rZXlzKCldLm1hcChpID0+IHtcbiAgICAgICAgICAgIGxldCByID0gJ2F1dG8nO1xuICAgICAgICAgICAgbGV0IHcgPSB3aWR0aCArICclJztcbiAgICAgICAgICAgIGxldCBiID0gJ2F1dG8nO1xuICAgICAgICAgICAgbGV0IGggPSBoZWlnaHQgKyAnJSc7XG4gICAgICAgICAgICBpZiAoKGxlZnQgKyAyICogd2lkdGgpID4gMTAwICYmIGZpbGwpIHtcbiAgICAgICAgICAgICAgICByID0gJzAlJztcbiAgICAgICAgICAgICAgICB3ID0gJ2F1dG8nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0b3AgKyAyICogaGVpZ2h0KSA+IDEwMCAmJiBmaWxsKSB7XG4gICAgICAgICAgICAgICAgYiA9ICcwJSc7XG4gICAgICAgICAgICAgICAgaCA9ICdhdXRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gYFxuICAgICAgICAgICAgICAgIHRvcDogJHtNYXRoLmZsb29yKHRvcCl9JTsgYm90dG9tOiR7Yn07XG4gICAgICAgICAgICAgICAgbGVmdDogJHtsZWZ0fSU7ICAgICAgICAgICByaWdodDoke3J9O1xuICAgICAgICAgICAgICAgIHdpZHRoOiAke3d9OyAgICAgICAgICAgICAgaGVpZ2h0OiAke2h9O1xuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIGlmIChNYXRoLnJvdW5kKGxlZnQgKz0gd2lkdGgpID4gMTAwIC0gTWF0aC5mbG9vcih3aWR0aCkpIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gMDtcbiAgICAgICAgICAgICAgICB0b3AgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICB9XG4gICAgdW5pdFBpeGVsKG51bSkge1xuICAgICAgICBjb25zdCBkZXNjID0gdGhpcy5hcmVhRGVzYztcbiAgICAgICAgY29uc3Qgcm9vdCA9IE1hdGguc3FydChudW0pO1xuICAgICAgICBjb25zdCByb3dzID0gTWF0aC5yb3VuZChyb290KTtcbiAgICAgICAgbGV0IGNvbHMgPSBNYXRoLmZsb29yKHJvb3QpO1xuICAgICAgICBpZiAocm9vdCA+IGNvbHMpIHtcbiAgICAgICAgICAgIGNvbHMrKztcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2lkdGggPSAoZGVzY1swXSBpbnN0YW5jZW9mIFRva2Vuc18xLkRlZmluZWRUb2tlbikgPyBkZXNjWzBdLmdldFNpemUoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGhlaWdodCA9IChkZXNjWzFdIGluc3RhbmNlb2YgVG9rZW5zXzEuRGVmaW5lZFRva2VuKSA/IGRlc2NbMV0uZ2V0U2l6ZSgpIDogd2lkdGg7XG4gICAgICAgIHdpZHRoID0gd2lkdGggfHwgMTAwIC8gY29scztcbiAgICAgICAgaGVpZ2h0ID0gaGVpZ2h0IHx8IDEwMCAvIHJvd3M7XG4gICAgICAgIGxldCBsZWZ0ID0gMDtcbiAgICAgICAgbGV0IHRvcCA9IDA7XG4gICAgICAgIGxldCBzdHlsZXMgPSBbLi4uQXJyYXkobnVtKS5rZXlzKCldLm1hcChpID0+IHtcbiAgICAgICAgICAgIGxldCByID0gJ2F1dG8nO1xuICAgICAgICAgICAgbGV0IHcgPSB3aWR0aCArICdweCc7XG4gICAgICAgICAgICBsZXQgYiA9ICdhdXRvJztcbiAgICAgICAgICAgIGxldCBoID0gaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gYFxuICAgICAgICAgICAgICAgIHRvcDogJHtNYXRoLmZsb29yKHRvcCl9JTsgYm90dG9tOiR7Yn07XG4gICAgICAgICAgICAgICAgbGVmdDogJHtsZWZ0fSU7ICAgICAgICAgICByaWdodDoke3J9O1xuICAgICAgICAgICAgICAgIHdpZHRoOiAke3d9OyAgICAgICAgICAgICAgaGVpZ2h0OiAke2h9O1xuICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIGlmIChNYXRoLnJvdW5kKGxlZnQgKz0gd2lkdGgpID4gMTAwIC0gTWF0aC5mbG9vcih3aWR0aCkpIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gMDtcbiAgICAgICAgICAgICAgICB0b3AgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICB9XG4gICAgZ2V0U3R5bGVzKGNvbXBvbmVudHMpIHtcbiAgICAgICAgbGV0IHN0eWxlcyA9IHRoaXMudW5pdChjb21wb25lbnRzLmxlbmd0aCk7XG4gICAgICAgIGNvbXBvbmVudHMubWFwKChjLCBpKSA9PiB7XG4gICAgICAgICAgICBjLnN0eWxlID0gc3R5bGVzW2ldO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICcuaHMtdGlsZS1sYXlvdXQnO1xuICAgIH1cbn1cbkxheW91dGVyXzEuTGF5b3V0ZXIucmVnaXN0ZXIoJ3RpbGVzJywgVGlsZUxheW91dGVyKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVZHbHNaVXhoZVc5MWRHVnlMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwzWnBaWGN2Vkdsc1pVeGhlVzkxZEdWeUxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCT0VSQkxIbERRVUV3UXp0QlFVTXhReXh4UTBGSGQwTTdRVUZQZUVNc1RVRkJUU3haUVVGaExGTkJRVkVzYlVKQlFWRTdTVUZSTDBJc1dVRkJiVUlzVVVGQmMwSTdVVUZEY2tNc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzFGQlJFUXNZVUZCVVN4SFFVRlNMRkZCUVZFc1EwRkJZenRSUVVseVF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZuUWl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFbEJRVWtzV1VGQldTeHRRa0ZCVlN4RFFVRkRMRU5CUVVNc1EwRkJRU3hEUVVGRE8xbEJRekZGTEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTTdTVUZETVVNc1EwRkJRenRKUVVWUExGZEJRVmNzUTBGQlF5eEhRVUZWTzFGQlF6RkNMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTTdVVUZETTBJc1RVRkJUU3hKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNXVUZCV1N4clFrRkJVeXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU12UkN4TlFVRk5MRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUXpWQ0xFMUJRVTBzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE9VSXNTVUZCVFN4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTTVRaXhKUVVGSkxFbEJRVWtzUjBGQlJ5eEpRVUZKTEVWQlFVVTdXVUZCUlN4SlFVRkpMRVZCUVVVc1EwRkJRenRUUVVGRk8xRkJRelZDTEVsQlFVa3NTMEZCU3l4SFFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eFpRVUZaTEhGQ1FVRlpMRU5CUVVNc1EwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eFRRVUZUTEVOQlFVTTdVVUZET1VVc1NVRkJTU3hOUVVGTkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRmxCUVZrc2NVSkJRVmtzUTBGQlF5eERRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJRenRSUVVVeFJTeExRVUZMTEVkQlFVa3NTMEZCU3l4SlFVRkxMRWRCUVVjc1IwRkJReXhKUVVGSkxFTkJRVU03VVVGRE5VSXNUVUZCVFN4SFFVRkhMRTFCUVUwc1NVRkJTU3hIUVVGSExFZEJRVU1zU1VGQlNTeERRVUZETzFGQlF6VkNMRWxCUVVrc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU5pTEVsQlFVa3NSMEZCUnl4SFFVRkpMRU5CUVVNc1EwRkJRenRSUVVWaUxFbEJRVWtzVFVGQlRTeEhRVUZITEVOQlFVTXNSMEZCUnl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVU3V1VGRGVFTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1RVRkJUU3hEUVVGRE8xbEJRVWtzU1VGQlNTeERRVUZETEVkQlFVY3NTMEZCU3l4SFFVRkRMRWRCUVVjc1EwRkJRenRaUVVOeVF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4TlFVRk5MRU5CUVVNN1dVRkJTU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eE5RVUZOTEVkQlFVTXNSMEZCUnl4RFFVRkRPMWxCUTNSRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NRMEZCUXl4SFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFZEJRVWNzU1VGQlNTeEpRVUZKTEVWQlFVVTdaMEpCUVVVc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF6dG5Ra0ZCUXl4RFFVRkRMRWRCUVVjc1RVRkJUU3hEUVVGRE8yRkJRVVU3V1VGRE4wUXNTVUZCU1N4RFFVRkRMRWRCUVVjc1IwRkJSeXhEUVVGRExFZEJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NSMEZCUnl4SlFVRkpMRWxCUVVrc1JVRkJSVHRuUWtGQlJTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRPMmRDUVVGRExFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTTdZVUZCUlR0WlFVTTNSQ3hOUVVGTkxFdEJRVXNzUjBGQlJ6dDFRa0ZEU0N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eGhRVUZoTEVOQlFVTTdkMEpCUXpWQ0xFbEJRVWtzYzBKQlFYTkNMRU5CUVVNN2VVSkJRekZDTEVOQlFVTXNNRUpCUVRCQ0xFTkJRVU03WVVGRGVFTXNRMEZCUXp0WlFVTkdMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVsQlFVa3NTMEZCU3l4RFFVRkRMRWRCUVVjc1IwRkJSeXhIUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRVZCUVVVN1owSkJRVVVzU1VGQlNTeEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkJReXhIUVVGSExFbEJRVWtzVFVGQlRTeERRVUZETzJGQlFVVTdXVUZEYmtZc1QwRkJUeXhMUVVGTExFTkJRVU03VVVGRGFFSXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTaXhQUVVGUExFMUJRVTBzUTBGQlF6dEpRVU5zUWl4RFFVRkRPMGxCUlU4c1UwRkJVeXhEUVVGRExFZEJRVlU3VVVGRGVFSXNUVUZCVFN4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF6dFJRVVV6UWl4TlFVRk5MRWxCUVVrc1IwRkJSeXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUXpWQ0xFMUJRVTBzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRE9VSXNTVUZCVFN4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTTVRaXhKUVVGSkxFbEJRVWtzUjBGQlJ5eEpRVUZKTEVWQlFVVTdXVUZCUlN4SlFVRkpMRVZCUVVVc1EwRkJRenRUUVVGRk8xRkJRelZDTEVsQlFVa3NTMEZCU3l4SFFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eFpRVUZaTEhGQ1FVRlpMRU5CUVVNc1EwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eFRRVUZUTEVOQlFVTTdVVUZET1VVc1NVRkJTU3hOUVVGTkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRmxCUVZrc2NVSkJRVmtzUTBGQlF5eERRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJRenRSUVVVeFJTeExRVUZMTEVkQlFVa3NTMEZCU3l4SlFVRkxMRWRCUVVjc1IwRkJReXhKUVVGSkxFTkJRVU03VVVGRE5VSXNUVUZCVFN4SFFVRkhMRTFCUVUwc1NVRkJTU3hIUVVGSExFZEJRVU1zU1VGQlNTeERRVUZETzFGQlF6VkNMRWxCUVVrc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU5pTEVsQlFVa3NSMEZCUnl4SFFVRkpMRU5CUVVNc1EwRkJRenRSUVVWaUxFbEJRVWtzVFVGQlRTeEhRVUZITEVOQlFVTXNSMEZCUnl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVU3V1VGRGVFTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1RVRkJUU3hEUVVGRE8xbEJRVWtzU1VGQlNTeERRVUZETEVkQlFVY3NTMEZCU3l4SFFVRkRMRWxCUVVrc1EwRkJRenRaUVVOMFF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4TlFVRk5MRU5CUVVNN1dVRkJTU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eE5RVUZOTEVkQlFVTXNTVUZCU1N4RFFVRkRPMWxCUTNaRExFMUJRVTBzUzBGQlN5eEhRVUZITzNWQ1FVTklMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEdGQlFXRXNRMEZCUXp0M1FrRkROVUlzU1VGQlNTeHpRa0ZCYzBJc1EwRkJRenQ1UWtGRE1VSXNRMEZCUXl3d1FrRkJNRUlzUTBGQlF6dGhRVU40UXl4RFFVRkRPMWxCUTBZc1NVRkJTU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NTVUZCU1N4TFFVRkxMRU5CUVVNc1IwRkJSeXhIUVVGSExFZEJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1JVRkJSVHRuUWtGQlJTeEpRVUZKTEVkQlFVY3NRMEZCUXl4RFFVRkRPMmRDUVVGRExFZEJRVWNzU1VGQlNTeE5RVUZOTEVOQlFVTTdZVUZCUlR0WlFVTnVSaXhQUVVGUExFdEJRVXNzUTBGQlF6dFJRVU5vUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOS0xFOUJRVThzVFVGQlRTeERRVUZETzBsQlEyeENMRU5CUVVNN1NVRlJVeXhUUVVGVExFTkJRVU1zVlVGQk9FSTdVVUZET1VNc1NVRkJTU3hOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03VVVGRE1VTXNWVUZCVlN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRV01zUlVGQlJTeERRVUZSTEVWQlFVVXNSVUZCUlR0WlFVTjRReXhEUVVGRExFTkJRVU1zUzBGQlN5eEhRVUZITEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVONFFpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTklMRTlCUVU4c2FVSkJRV2xDTEVOQlFVTTdTVUZETjBJc1EwRkJRenREUVVOS08wRkJSMFFzYlVKQlFWRXNRMEZCUXl4UlFVRlJMRU5CUVVNc1QwRkJUeXhGUVVGRkxGbEJRVmtzUTBGQlF5eERRVUZESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgTGF5b3V0VG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB9XG4gICAgZ2V0U2l6ZSgpIHsgcmV0dXJuIHRoaXMuc2l6ZTsgfVxufVxuZXhwb3J0cy5MYXlvdXRUb2tlbiA9IExheW91dFRva2VuO1xuY2xhc3MgRGVmaW5lZFRva2VuIGV4dGVuZHMgTGF5b3V0VG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHsgc3VwZXIoc2l6ZSk7IH1cbn1cbmV4cG9ydHMuRGVmaW5lZFRva2VuID0gRGVmaW5lZFRva2VuO1xuY2xhc3MgRmlsbFRva2VuIGV4dGVuZHMgTGF5b3V0VG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigtMSk7IH1cbn1cbmV4cG9ydHMuRmlsbFRva2VuID0gRmlsbFRva2VuO1xuY2xhc3MgUGl4ZWxUb2tlbiBleHRlbmRzIERlZmluZWRUb2tlbiB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSkgeyBzdXBlcihzaXplKTsgfVxufVxuZXhwb3J0cy5QaXhlbFRva2VuID0gUGl4ZWxUb2tlbjtcbmNsYXNzIFBlcmNlbnRUb2tlbiBleHRlbmRzIERlZmluZWRUb2tlbiB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSkgeyBzdXBlcihzaXplKTsgfVxufVxuZXhwb3J0cy5QZXJjZW50VG9rZW4gPSBQZXJjZW50VG9rZW47XG5mdW5jdGlvbiBweChweCkgeyByZXR1cm4gbmV3IFBpeGVsVG9rZW4ocHgpOyB9XG5leHBvcnRzLnB4ID0gcHg7XG5mdW5jdGlvbiBwYyhwYykgeyByZXR1cm4gbmV3IFBlcmNlbnRUb2tlbihwYyk7IH1cbmV4cG9ydHMucGMgPSBwYztcbmV4cG9ydHMuRklMTCA9IG5ldyBGaWxsVG9rZW4oKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVZHOXJaVzV6TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dmMzSmpMM1pwWlhjdlZHOXJaVzV6TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJVVUVzVFVGQmMwSXNWMEZCVnp0SlFVTTNRaXhaUVVGdlFpeEpRVUZaTzFGQlFWb3NVMEZCU1N4SFFVRktMRWxCUVVrc1EwRkJVVHRKUVVGSExFTkJRVU03U1VGRE4wSXNUMEZCVHl4TFFVRkxMRTlCUVU4c1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTTdRMEZEZWtNN1FVRklSQ3hyUTBGSFF6dEJRVXRFTEUxQlFYTkNMRmxCUVdFc1UwRkJVU3hYUVVGWE8wbEJRMnhFTEZsQlFWa3NTVUZCV1N4SlFVRkpMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRMEZETjBNN1FVRkdSQ3h2UTBGRlF6dEJRVXRFTEUxQlFXRXNVMEZCVlN4VFFVRlJMRmRCUVZjN1NVRkRkRU1zWjBKQlFXZENMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0RFFVTXZRanRCUVVaRUxEaENRVVZETzBGQlMwUXNUVUZCWVN4VlFVRlhMRk5CUVZFc1dVRkJXVHRKUVVONFF5eFpRVUZaTEVsQlFWY3NTVUZCU1N4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzBOQlF6VkRPMEZCUmtRc1owTkJSVU03UVVGTFJDeE5RVUZoTEZsQlFXRXNVMEZCVVN4WlFVRlpPMGxCUXpGRExGbEJRVmtzU1VGQlZ5eEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRE5VTTdRVUZHUkN4dlEwRkZRenRCUVUxRUxGTkJRV2RDTEVWQlFVVXNRMEZCUXl4RlFVRlRMRWxCUVUwc1QwRkJUeXhKUVVGSkxGVkJRVlVzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkJPVVFzWjBKQlFUaEVPMEZCVFRsRUxGTkJRV2RDTEVWQlFVVXNRMEZCUXl4RlFVRlRMRWxCUVUwc1QwRkJUeXhKUVVGSkxGbEJRVmtzUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkJhRVVzWjBKQlFXZEZPMEZCUzI1RUxGRkJRVUVzU1VGQlNTeEhRVUZITEVsQlFVa3NVMEZCVXl4RlFVRkZMRU5CUVVNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHNob3J0Q2hlY2tTdW0ocykge1xuICAgIGxldCBjaGsgPSAweDEyMzQ1Njc4O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjaGsgKz0gKHMuY2hhckNvZGVBdChpKSAqIChpICsgMSkpO1xuICAgIH1cbiAgICByZXR1cm4gKGNoayAmIDB4ZmZmZmZmZmYpLnRvU3RyaW5nKDE2KTtcbn1cbmV4cG9ydHMuc2hvcnRDaGVja1N1bSA9IHNob3J0Q2hlY2tTdW07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRMmhsWTJ0emRXMHVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12UTJobFkydHpkVzB1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRlJReXhUUVVGblFpeGhRVUZoTEVOQlFVTXNRMEZCVVR0SlFVTnVReXhKUVVGSkxFZEJRVWNzUjBGQlJ5eFZRVUZWTEVOQlFVTTdTVUZEY2tJc1MwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkRMRU5CUVVNc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVTdVVUZETTBJc1IwRkJSeXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMHRCUTNSRE8wbEJRMFFzVDBGQlR5eERRVUZETEVkQlFVY3NSMEZCUnl4VlFVRlZMRU5CUVVNc1EwRkJReXhSUVVGUkxFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTTdRVUZETVVNc1EwRkJRenRCUVU1RUxITkRRVTFESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbW9udGhTdHIgPSBbXG4gICAgWydKYW4nLCAnSmFudWFyeSddLCBbJ0ZlYicsICdGZWJydWFyeSddLCBbJ01hcicsICdNYXJjaCddLCBbJ0FwcicsICdBcHJpbCddLCBbJ01heScsICdNYXknXSwgWydKdW4nLCAnSnVuZSddLFxuICAgIFsnSnVsJywgJ0p1bHknXSwgWydBdWcnLCAnQXVndXN0J10sIFsnU2VwJywgJ1NlcHRlbWJlciddLCBbJ09jdCcsICdPY3RvYmVyJ10sIFsnTm92JywgJ05vdmVtYmVyJ10sIFsnRGVjJywgJ0RlY2VtYmVyJ11cbl07XG5jb25zdCBkYXlTdHIgPSBbXG4gICAgWydTdW4nLCAnU3VuZGF5J10sIFsnTW9uJywgJ01vbmRheSddLCBbJ1R1ZScsICdUdWVzZGF5J10sIFsnV2VkJywgJ1dlZG5lc2RheSddLCBbJ1RodScsICdUaHVyc2RheSddLCBbJ0ZyaScsICdGcmlkYXknXSwgWydTYXQnLCAnU2F0dXJkYXknXVxuXTtcbmZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW1iZXIsIGRpZ2l0cykge1xuICAgIGxldCByID0gJycgKyBudW1iZXI7XG4gICAgd2hpbGUgKHIubGVuZ3RoIDwgZGlnaXRzKSB7XG4gICAgICAgIHIgPSBcIjBcIiArIHI7XG4gICAgfVxuICAgIHJldHVybiByO1xufVxuZnVuY3Rpb24gZGF0ZShmb3JtYXRTdHJpbmcsIGRhdGUgPSBuZXcgRGF0ZSgpKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgZm9ybWF0U3RyaW5nICE9PSAnc3RyaW5nJyB8fCBpc05hTihkYXRlLmdldFRpbWUoKSkpID9cbiAgICAgICAgJ2ludmFsaWQnIDpcbiAgICAgICAgZm9ybWF0U3RyaW5nXG4gICAgICAgICAgICAucmVwbGFjZSgvJVlZWVkvZywgJycgKyBkYXRlLmdldEZ1bGxZZWFyKCkpXG4gICAgICAgICAgICAucmVwbGFjZSgvJVlZL2csICcnICsgKGRhdGUuZ2V0RnVsbFllYXIoKSAlIDEwMCkpXG4gICAgICAgICAgICAucmVwbGFjZSgvJU1NTU0vZywgbW9udGhTdHJbZGF0ZS5nZXRNb250aCgpXVsxXSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC8lTU1NL2csIG1vbnRoU3RyW2RhdGUuZ2V0TW9udGgoKV1bMF0pXG4gICAgICAgICAgICAucmVwbGFjZSgvJU1NL2csIGZvcm1hdE51bWJlcihkYXRlLmdldE1vbnRoKCkgKyAxLCAyKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC8lTS9nLCAnJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC8lRERERC9nLCBkYXlTdHJbZGF0ZS5nZXREYXkoKV1bMV0pXG4gICAgICAgICAgICAucmVwbGFjZSgvJURERC9nLCBkYXlTdHJbZGF0ZS5nZXREYXkoKV1bMF0pXG4gICAgICAgICAgICAucmVwbGFjZSgvJUREL2csIGZvcm1hdE51bWJlcihkYXRlLmdldERhdGUoKSwgMikpXG4gICAgICAgICAgICAucmVwbGFjZSgvJUQvZywgJycgKyBkYXRlLmdldERhdGUoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC8laGgvZywgZm9ybWF0TnVtYmVyKGRhdGUuZ2V0SG91cnMoKSwgMikpXG4gICAgICAgICAgICAucmVwbGFjZSgvJWgvZywgJycgKyBkYXRlLmdldEhvdXJzKCkpXG4gICAgICAgICAgICAucmVwbGFjZSgvJW1tL2csIGZvcm1hdE51bWJlcihkYXRlLmdldE1pbnV0ZXMoKSwgMikpXG4gICAgICAgICAgICAucmVwbGFjZSgvJW0vZywgJycgKyBkYXRlLmdldE1pbnV0ZXMoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC8lc3MvZywgZm9ybWF0TnVtYmVyKGRhdGUuZ2V0U2Vjb25kcygpLCAyKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC8lampqL2csIGZvcm1hdE51bWJlcihkYXRlLmdldE1pbGxpc2Vjb25kcygpLCAzKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC8lamovZywgZm9ybWF0TnVtYmVyKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMCwgMikpXG4gICAgICAgICAgICAucmVwbGFjZSgvJWovZywgZm9ybWF0TnVtYmVyKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDAsIDEpKTtcbn1cbmV4cG9ydHMuZGF0ZSA9IGRhdGU7XG5leHBvcnRzLm1zID0ge1xuICAgIGZyb21NaW51dGVzOiAobWluKSA9PiAxMDAwICogNjAgKiBtaW4sXG4gICAgZnJvbUhvdXJzOiAoaCkgPT4gMTAwMCAqIDYwICogNjAgKiBoLFxuICAgIGZyb21EYXlzOiAoZCkgPT4gMTAwMCAqIDYwICogNjAgKiAyNCAqIGQsXG4gICAgZnJvbVdlZWtzOiAodykgPT4gMTAwMCAqIDYwICogNjAgKiAyNCAqIDcgKiB3LFxuICAgIHRvTWludXRlczogKG1zKSA9PiBtcyAvICgxMDAwICogNjApLFxuICAgIHRvSG91cnM6IChtcykgPT4gbXMgLyAoMTAwMCAqIDYwICogNjApLFxuICAgIHRvRGF5czogKG1zKSA9PiBtcyAvICgxMDAwICogNjAgKiA2MCAqIDI0KSxcbiAgICB0b1dlZWtzOiAobXMpID0+IG1zIC8gKDEwMDAgKiA2MCAqIDYwICogMjQgKiA3KVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVJHRjBaUzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMM055WXk5RVlYUmxMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlpVRXNUVUZCVFN4UlFVRlJMRWRCUVVjN1NVRkRZaXhEUVVGRExFdEJRVXNzUlVGQlJTeFRRVUZUTEVOQlFVTXNSVUZCUlN4RFFVRkRMRXRCUVVzc1JVRkJSU3hWUVVGVkxFTkJRVU1zUlVGQlJTeERRVUZETEV0QlFVc3NSVUZCUlN4UFFVRlBMRU5CUVVNc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeFBRVUZQTEVOQlFVTXNSVUZCUlN4RFFVRkRMRXRCUVVzc1JVRkJSU3hMUVVGTExFTkJRVU1zUlVGQlJTeERRVUZETEV0QlFVc3NSVUZCUlN4TlFVRk5MRU5CUVVNN1NVRkROVWNzUTBGQlF5eExRVUZMTEVWQlFVVXNUVUZCVFN4RFFVRkRMRVZCUVVVc1EwRkJReXhMUVVGTExFVkJRVVVzVVVGQlVTeERRVUZETEVWQlFVVXNRMEZCUXl4TFFVRkxMRVZCUVVVc1YwRkJWeXhEUVVGRExFVkJRVVVzUTBGQlF5eExRVUZMTEVWQlFVVXNVMEZCVXl4RFFVRkRMRVZCUVVVc1EwRkJReXhMUVVGTExFVkJRVVVzVlVGQlZTeERRVUZETEVWQlFVVXNRMEZCUXl4TFFVRkxMRVZCUVVVc1ZVRkJWU3hEUVVGRE8wTkJRVU1zUTBGQlF6dEJRVWMxU0N4TlFVRk5MRTFCUVUwc1IwRkJSenRKUVVOWUxFTkJRVU1zUzBGQlN5eEZRVUZGTEZGQlFWRXNRMEZCUXl4RlFVRkRMRU5CUVVNc1MwRkJTeXhGUVVGRkxGRkJRVkVzUTBGQlF5eEZRVUZETEVOQlFVTXNTMEZCU3l4RlFVRkZMRk5CUVZNc1EwRkJReXhGUVVGRExFTkJRVU1zUzBGQlN5eEZRVUZGTEZkQlFWY3NRMEZCUXl4RlFVRkRMRU5CUVVNc1MwRkJTeXhGUVVGRkxGVkJRVlVzUTBGQlF5eEZRVUZETEVOQlFVTXNTMEZCU3l4RlFVRkZMRkZCUVZFc1EwRkJReXhGUVVGRExFTkJRVU1zUzBGQlN5eEZRVUZGTEZWQlFWVXNRMEZCUXp0RFFVRkRMRU5CUVVNN1FVRkhNMGtzVTBGQlV5eFpRVUZaTEVOQlFVTXNUVUZCWVN4RlFVRkZMRTFCUVdFN1NVRkRPVU1zU1VGQlNTeERRVUZETEVkQlFVY3NSVUZCUlN4SFFVRkRMRTFCUVUwc1EwRkJRenRKUVVOc1FpeFBRVUZQTEVOQlFVTXNRMEZCUXl4TlFVRk5MRWRCUVVjc1RVRkJUU3hGUVVGRk8xRkJRVVVzUTBGQlF5eEhRVUZITEVkQlFVY3NSMEZCUnl4RFFVRkRMRU5CUVVNN1MwRkJSVHRKUVVNeFF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0QlFVTmlMRU5CUVVNN1FVRmpSQ3hUUVVGblFpeEpRVUZKTEVOQlFVTXNXVUZCYlVJc1JVRkJSU3hKUVVGSkxFZEJRVU1zU1VGQlNTeEpRVUZKTEVWQlFVVTdTVUZEY2tRc1QwRkJUeXhEUVVGRExFOUJRVThzV1VGQldTeExRVUZMTEZGQlFWRXNTVUZCU1N4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTJoRkxGTkJRVk1zUTBGQlFTeERRVUZETzFGQlExWXNXVUZCV1R0aFFVTlFMRTlCUVU4c1EwRkJReXhSUVVGUkxFVkJRVVVzUlVGQlJTeEhRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRoUVVONFF5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RlFVRkpMRVZCUVVVc1IwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVWQlFVVXNSMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRoUVVNNVF5eFBRVUZQTEVOQlFVTXNVVUZCVVN4RlFVRkhMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRoUVVOb1JDeFBRVUZQTEVOQlFVTXNUMEZCVHl4RlFVRkpMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRoUVVOb1JDeFBRVUZQTEVOQlFVTXNUVUZCVFN4RlFVRkpMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeEZRVUZGTEVkQlFVTXNRMEZCUXl4RlFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yRkJRM0JFTEU5QlFVOHNRMEZCUXl4TFFVRkxMRVZCUVVrc1JVRkJSU3hIUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlN4SFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yRkJRM2hETEU5QlFVOHNRMEZCUXl4UlFVRlJMRVZCUVVjc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yRkJRelZETEU5QlFVOHNRMEZCUXl4UFFVRlBMRVZCUVVrc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yRkJRelZETEU5QlFVOHNRMEZCUXl4TlFVRk5MRVZCUVVrc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVWQlFVVXNSVUZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRoUVVOcVJDeFBRVUZQTEVOQlFVTXNTMEZCU3l4RlFVRkpMRVZCUVVVc1IwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdZVUZEYmtNc1QwRkJUeXhEUVVGRExFMUJRVTBzUlVGQlNTeFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1JVRkJSU3hGUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzJGQlEyeEVMRTlCUVU4c1EwRkJReXhMUVVGTExFVkJRVWNzUlVGQlJTeEhRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJRenRoUVVOdVF5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RlFVRkpMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zVlVGQlZTeEZRVUZGTEVWQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1lVRkRjRVFzVDBGQlR5eERRVUZETEV0QlFVc3NSVUZCU1N4RlFVRkZMRWRCUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETzJGQlEzUkRMRTlCUVU4c1EwRkJReXhOUVVGTkxFVkJRVWtzV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRlZMRVZCUVVVc1JVRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dGhRVU53UkN4UFFVRlBMRU5CUVVNc1QwRkJUeXhGUVVGSkxGbEJRVmtzUTBGQlF5eEpRVUZKTEVOQlFVTXNaVUZCWlN4RlFVRkZMRVZCUVVNc1EwRkJReXhEUVVGRExFTkJRVU03WVVGRE1VUXNUMEZCVHl4RFFVRkRMRTFCUVUwc1JVRkJTU3haUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEdWQlFXVXNSVUZCUlN4SFFVRkRMRVZCUVVVc1JVRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dGhRVU0xUkN4UFFVRlBMRU5CUVVNc1MwRkJTeXhGUVVGSExGbEJRVmtzUTBGQlF5eEpRVUZKTEVOQlFVTXNaVUZCWlN4RlFVRkZMRWRCUVVNc1IwRkJSeXhGUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZEZWtVc1EwRkJRenRCUVhSQ1JDeHZRa0Z6UWtNN1FVRkhXU3hSUVVGQkxFVkJRVVVzUjBGQlJ6dEpRVU5rTEZkQlFWY3NSVUZCU3l4RFFVRkRMRWRCUVZVc1JVRkJSU3hGUVVGRkxFTkJRVU1zU1VGQlNTeEhRVUZETEVWQlFVVXNSMEZCUXl4SFFVRkhPMGxCUXpORExGTkJRVk1zUlVGQlR5eERRVUZETEVOQlFWRXNSVUZCU1N4RlFVRkZMRU5CUVVNc1NVRkJTU3hIUVVGRExFVkJRVVVzUjBGQlF5eEZRVUZGTEVkQlFVTXNRMEZCUXp0SlFVTTFReXhSUVVGUkxFVkJRVkVzUTBGQlF5eERRVUZSTEVWQlFVa3NSVUZCUlN4RFFVRkRMRWxCUVVrc1IwRkJReXhGUVVGRkxFZEJRVU1zUlVGQlJTeEhRVUZETEVWQlFVVXNSMEZCUXl4RFFVRkRPMGxCUXk5RExGTkJRVk1zUlVGQlR5eERRVUZETEVOQlFWRXNSVUZCU1N4RlFVRkZMRU5CUVVNc1NVRkJTU3hIUVVGRExFVkJRVVVzUjBGQlF5eEZRVUZGTEVkQlFVTXNSVUZCUlN4SFFVRkRMRU5CUVVNc1IwRkJReXhEUVVGRE8wbEJRMnBFTEZOQlFWTXNSVUZCVHl4RFFVRkRMRVZCUVZNc1JVRkJSeXhGUVVGRkxFTkJRVU1zUlVGQlJTeEhRVUZETEVOQlFVTXNTVUZCU1N4SFFVRkRMRVZCUVVVc1EwRkJRenRKUVVNMVF5eFBRVUZQTEVWQlFWTXNRMEZCUXl4RlFVRlRMRVZCUVVjc1JVRkJSU3hEUVVGRExFVkJRVVVzUjBGQlF5eERRVUZETEVsQlFVa3NSMEZCUXl4RlFVRkZMRWRCUVVNc1JVRkJSU3hEUVVGRE8wbEJReTlETEUxQlFVMHNSVUZCVlN4RFFVRkRMRVZCUVZNc1JVRkJSeXhGUVVGRkxFTkJRVU1zUlVGQlJTeEhRVUZETEVOQlFVTXNTVUZCU1N4SFFVRkRMRVZCUVVVc1IwRkJReXhGUVVGRkxFZEJRVU1zUlVGQlJTeERRVUZETzBsQlEyeEVMRTlCUVU4c1JVRkJVeXhEUVVGRExFVkJRVk1zUlVGQlJ5eEZRVUZGTEVOQlFVTXNSVUZCUlN4SFFVRkRMRU5CUVVNc1NVRkJTU3hIUVVGRExFVkJRVVVzUjBGQlF5eEZRVUZGTEVkQlFVTXNSVUZCUlN4SFFVRkRMRU5CUVVNc1EwRkJRenREUVVOMlJDeERRVUZESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gcm91bmQobiwgZCA9IDApIHtcbiAgICByZXR1cm4gbi50b0ZpeGVkKGQpO1xufVxuZXhwb3J0cy5yb3VuZCA9IHJvdW5kO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVG5WdFltVnlMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDA1MWJXSmxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFWZERMRk5CUVdkQ0xFdEJRVXNzUTBGQlF5eERRVUZSTEVWQlFVVXNRMEZCUXl4SFFVRkRMRU5CUVVNN1NVRkhhRU1zVDBGQlR5eERRVUZETEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJRM1pDTEVOQlFVTTdRVUZLUkN4elFrRkpReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHRpbWVvdXQobXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4geyBzZXRUaW1lb3V0KHJlamVjdCwgbXMpOyB9KTtcbn1cbmV4cG9ydHMudGltZW91dCA9IHRpbWVvdXQ7XG5mdW5jdGlvbiBkZWxheShtcykge1xuICAgIHJldHVybiAoYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByZXNvbHZlKGFyZ3MpOyB9LCBtcyk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5leHBvcnRzLmRlbGF5ID0gZGVsYXk7XG5jbGFzcyBQYWNlIHtcbiAgICBjb25zdHJ1Y3RvcihwYWNlID0gMTAwLCBtYXhDb25jdXJyZW50ID0gLTEpIHtcbiAgICAgICAgdGhpcy5tYXhDb25jdXJyZW50ID0gLTE7XG4gICAgICAgIHRoaXMud2FpdFVudGlsID0gMDtcbiAgICAgICAgdGhpcy53YWl0Q291bnQgPSAwO1xuICAgICAgICB0aGlzLmJlaW5nQ2FsbGVkID0gMDtcbiAgICAgICAgdGhpcy5wYWNlID0gcGFjZSArIDU7XG4gICAgICAgIHRoaXMubWF4Q29uY3VycmVudCA9IG1heENvbmN1cnJlbnQ7XG4gICAgfVxuICAgIGdldFdhaXRDb3VudCgpIHsgcmV0dXJuIHRoaXMud2FpdENvdW50OyB9XG4gICAgZ2V0Q2FsbGluZ0NvdW50KCkgeyByZXR1cm4gdGhpcy5iZWluZ0NhbGxlZDsgfVxuICAgIGFkZChmbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgYWRkVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBpZiAodGhpcy53YWl0VW50aWwgPCBhZGRUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YWl0VW50aWwgPSBhZGRUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGlmZiA9IHRoaXMud2FpdFVudGlsIC0gYWRkVGltZTtcbiAgICAgICAgICAgIHRoaXMud2FpdFVudGlsICs9IHRoaXMucGFjZSArIDU7XG4gICAgICAgICAgICB0aGlzLndhaXRDb3VudCsrO1xuICAgICAgICAgICAgeWllbGQgZGVsYXkoZGlmZikoKTtcbiAgICAgICAgICAgIHlpZWxkIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhaXRMb29wID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhDb25jdXJyZW50IDwgMCB8fCB0aGlzLmJlaW5nQ2FsbGVkIDwgdGhpcy5tYXhDb25jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHdhaXRMb29wLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHdhaXRMb29wKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMud2FpdENvdW50LS07XG4gICAgICAgICAgICB0aGlzLmJlaW5nQ2FsbGVkKys7XG4gICAgICAgICAgICBjb25zdCByZXQgPSB5aWVsZCBmbihEYXRlLm5vdygpIC0gYWRkVGltZSk7XG4gICAgICAgICAgICB0aGlzLmJlaW5nQ2FsbGVkLS07XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLlBhY2UgPSBQYWNlO1xuZnVuY3Rpb24gcHJvbWlzZUNoYWluKHRhc2tzLCBpbml0aWFsUmVzdWx0ID0gW10pIHtcbiAgICByZXR1cm4gdGFza3MucmVkdWNlKChjaGFpbiwgdGFzaykgPT4gY2hhaW4udGhlbigoX3Jlc3VsdHMpID0+IFByb21pc2UucmVzb2x2ZSh0YXNrKF9yZXN1bHRzKSkudGhlbigocikgPT4ge1xuICAgICAgICBfcmVzdWx0cy5wdXNoKHIpO1xuICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgfSkpLCBQcm9taXNlLnJlc29sdmUoaW5pdGlhbFJlc3VsdCkpO1xufVxuZXhwb3J0cy5wcm9taXNlQ2hhaW4gPSBwcm9taXNlQ2hhaW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWR2x0WldSUWNtOXRhWE5sY3k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OVVhVzFsWkZCeWIyMXBjMlZ6TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN096czdPenM3T3pzN08wRkJWMEVzVTBGQlowSXNUMEZCVHl4RFFVRkRMRVZCUVZNN1NVRkROMElzVDBGQlR5eEpRVUZKTEU5QlFVOHNRMEZCUXl4RFFVRkRMRTlCUVU4c1JVRkJSU3hOUVVGTkxFVkJRVVVzUlVGQlJTeEhRVUZITEZWQlFWVXNRMEZCUXl4TlFVRk5MRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTjZSU3hEUVVGRE8wRkJSa1FzTUVKQlJVTTdRVUYxUWtRc1UwRkJaMElzUzBGQlN5eERRVUZETEVWQlFWTTdTVUZETTBJc1QwRkJUeXhEUVVGSkxFbEJRVThzUlVGQllTeEZRVUZGTzFGQlF6ZENMRTlCUVU4c1NVRkJTU3hQUVVGUExFTkJRVU1zUTBGQlF5eFBRVUZ6UWl4RlFVRkZMRVZCUVVVN1dVRkRNVU1zVlVGQlZTeERRVUZETEVkQlFVY3NSVUZCUlN4SFFVRkhMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVNM1F5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlFMRU5CUVVNc1EwRkJRenRCUVVOT0xFTkJRVU03UVVGT1JDeHpRa0ZOUXp0QlFXRkVMRTFCUVdFc1NVRkJTVHRKUVZsaUxGbEJRVmtzU1VGQlNTeEhRVUZETEVkQlFVY3NSVUZCUlN4aFFVRmhMRWRCUVVNc1EwRkJReXhEUVVGRE8xRkJXRGxDTEd0Q1FVRmhMRWRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRmNrSXNZMEZCVXl4SFFVRlRMRU5CUVVNc1EwRkJRenRSUVVOd1FpeGpRVUZUTEVkQlFWTXNRMEZCUXl4RFFVRkRPMUZCUTNCQ0xHZENRVUZYTEVkQlFVOHNRMEZCUXl4RFFVRkRPMUZCVVhoQ0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NTVUZCU1N4SFFVRkRMRU5CUVVNc1EwRkJRenRSUVVOdVFpeEpRVUZKTEVOQlFVTXNZVUZCWVN4SFFVRkhMR0ZCUVdFc1EwRkJRenRKUVVOMlF5eERRVUZETzBsQlJVUXNXVUZCV1N4TFFVRlJMRTlCUVU4c1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETEVOQlFVTTdTVUZETlVNc1pVRkJaU3hMUVVGTExFOUJRVThzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRlJlRU1zUjBGQlJ5eERRVUZETEVWQlFXbERPenRaUVVOMlF5eE5RVUZOTEU5QlFVOHNSMEZCUnl4SlFVRkpMRU5CUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU03V1VGRE0wSXNTVUZCU1N4SlFVRkpMRU5CUVVNc1UwRkJVeXhIUVVGSExFOUJRVThzUlVGQlJUdG5Ra0ZCUlN4SlFVRkpMRU5CUVVNc1UwRkJVeXhIUVVGSExFOUJRVThzUTBGQlF6dGhRVUZGTzFsQlF6TkVMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eFRRVUZUTEVkQlFVY3NUMEZCVHl4RFFVRkRPMWxCUTNSRExFbEJRVWtzUTBGQlF5eFRRVUZUTEVsQlFVa3NTVUZCU1N4RFFVRkRMRWxCUVVrc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGRGFFTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1JVRkJSU3hEUVVGRE8xbEJRMnBDTEUxQlFVMHNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFTkJRVU03V1VGRGNFSXNUVUZCVFN4SlFVRkpMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU1zUlVGQlJUdG5Ra0ZEZUVJc1RVRkJUU3hSUVVGUkxFZEJRVWNzUjBGQlJ5eEZRVUZGTzI5Q1FVTnNRaXhKUVVGSkxFbEJRVWtzUTBGQlF5eGhRVUZoTEVkQlFVY3NRMEZCUXl4SlFVRkpMRWxCUVVrc1EwRkJReXhYUVVGWExFZEJRVWNzU1VGQlNTeERRVUZETEdGQlFXRXNSVUZCUlR0M1FrRkRha1VzVDBGQlR5eEZRVUZGTEVOQlFVTTdjVUpCUTJJN2VVSkJRVTA3ZDBKQlEwZ3NWVUZCVlN4RFFVRkRMRkZCUVZFc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF6dHhRa0ZETlVJN1owSkJRMHdzUTBGQlF5eERRVUZETzJkQ1FVTkdMRkZCUVZFc1JVRkJSU3hEUVVGRE8xbEJRMllzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEU0N4SlFVRkpMRU5CUVVNc1UwRkJVeXhGUVVGRkxFTkJRVU03V1VGRGFrSXNTVUZCU1N4RFFVRkRMRmRCUVZjc1JVRkJSU3hEUVVGRE8xbEJRMjVDTEUxQlFVMHNSMEZCUnl4SFFVRkhMRTFCUVUwc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRaUVVONlF5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1dVRkRia0lzVDBGQlR5eEhRVUZITEVOQlFVTTdVVUZEWml4RFFVRkRPMHRCUVVFN1EwRkRTanRCUVdwRVJDeHZRa0ZwUkVNN1FVRlhSQ3hUUVVGblFpeFpRVUZaTEVOQlFVa3NTMEZCY1VNc1JVRkJSU3huUWtGQmEwSXNSVUZCUlR0SlFVTjJSaXhQUVVGUExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4TFFVRnJRaXhGUVVGRkxFbEJRU3RDTEVWQlFXZENMRVZCUVVVc1EwRkZkRVlzUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRkZCUVZrc1JVRkJSU3hGUVVGRkxFTkJRVU1zVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkhMRVZCUVVVc1JVRkJSVHRSUVVWMFJTeFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMnBDTEU5QlFVOHNVVUZCVVN4RFFVRkRPMGxCUTNCQ0xFTkJRVU1zUTBGQlF5eERRVUZETEVWQlEwZ3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhoUVVGaExFTkJRVU1zUTBGRGFrTXNRMEZCUXp0QlFVTk9MRU5CUVVNN1FVRldSQ3h2UTBGVlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBUaW1lZFByb21pc2VzXzEgPSByZXF1aXJlKFwiLi9UaW1lZFByb21pc2VzXCIpO1xuZXhwb3J0cy50aW1lb3V0ID0gVGltZWRQcm9taXNlc18xLnRpbWVvdXQ7XG5leHBvcnRzLmRlbGF5ID0gVGltZWRQcm9taXNlc18xLmRlbGF5O1xudmFyIFRpbWVkUHJvbWlzZXNfMiA9IHJlcXVpcmUoXCIuL1RpbWVkUHJvbWlzZXNcIik7XG5leHBvcnRzLlBhY2UgPSBUaW1lZFByb21pc2VzXzIuUGFjZTtcbnZhciBUaW1lZFByb21pc2VzXzMgPSByZXF1aXJlKFwiLi9UaW1lZFByb21pc2VzXCIpO1xuZXhwb3J0cy5wcm9taXNlQ2hhaW4gPSBUaW1lZFByb21pc2VzXzMucHJvbWlzZUNoYWluO1xudmFyIENoZWNrc3VtXzEgPSByZXF1aXJlKFwiLi9DaGVja3N1bVwiKTtcbmV4cG9ydHMuc2hvcnRDaGVja1N1bSA9IENoZWNrc3VtXzEuc2hvcnRDaGVja1N1bTtcbnZhciBEYXRlXzEgPSByZXF1aXJlKFwiLi9EYXRlXCIpO1xuZXhwb3J0cy5kYXRlID0gRGF0ZV8xLmRhdGU7XG5leHBvcnRzLm1zID0gRGF0ZV8xLm1zO1xudmFyIE51bWJlcl8xID0gcmVxdWlyZShcIi4vTnVtYmVyXCIpO1xuZXhwb3J0cy5yb3VuZCA9IE51bWJlcl8xLnJvdW5kO1xudmFyIGxvZ18xID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuZXhwb3J0cy5Mb2cgPSBsb2dfMS5Mb2c7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhVzVrWlhndWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZhVzVrWlhndWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVN4cFJFRkJiVVE3UVVGQk1VTXNhME5CUVVFc1QwRkJUeXhEUVVGQk8wRkJRVVVzWjBOQlFVRXNTMEZCU3l4RFFVRkJPMEZCUTNaQ0xHbEVRVUZ0UkR0QlFVRXhReXdyUWtGQlFTeEpRVUZKTEVOQlFVRTdRVUZEWWl4cFJFRkJiVVE3UVVGQk1VTXNkVU5CUVVFc1dVRkJXU3hEUVVGQk8wRkJRM0pDTEhWRFFVRTRRenRCUVVGeVF5eHRRMEZCUVN4aFFVRmhMRU5CUVVFN1FVRkRkRUlzSzBKQlFUQkRPMEZCUVdwRExITkNRVUZCTEVsQlFVa3NRMEZCUVR0QlFVRkZMRzlDUVVGQkxFVkJRVVVzUTBGQlFUdEJRVU5xUWl4dFEwRkJORU03UVVGQmJrTXNlVUpCUVVFc1MwRkJTeXhEUVVGQk8wRkJRMlFzTmtKQlFYbERPMEZCUVdoRExHOUNRVUZCTEVkQlFVY3NRMEZCUVNKOSIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBEYXRlXzEgPSByZXF1aXJlKFwiLi9EYXRlXCIpO1xuY29uc3QgQ09MT1JTID0gWycjMDA4JywgJyMwODAnLCAnIzgwMCcsICcjMDY2JywgJyM2NjAnLCAnIzYwNiddO1xuY2xhc3MgTG9nIHtcbiAgICBjb25zdHJ1Y3RvcihwcmVmaXgpIHtcbiAgICAgICAgdGhpcy5yZXBvcnRMZXZlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5yZXBvcnRQcmVmaXggPSAnJztcbiAgICAgICAgdGhpcy5yZXBvcnRQcmVmaXggPSBwcmVmaXg7XG4gICAgfVxuICAgIGxldmVsKG5ld0xldmVsU3ltLCBzZXRHbG9iYWxMZXZlbCkge1xuICAgICAgICBsZXQgbmV3TGV2ZWwgPSBMb2cubGV2ZWxzW25ld0xldmVsU3ltXSB8fCBMb2cuZ2xvYmFsTGV2ZWw7XG4gICAgICAgIGxldCBvbGRMZXZlbCA9IHRoaXMucmVwb3J0TGV2ZWwgfHwgTG9nLmdsb2JhbExldmVsO1xuICAgICAgICBpZiAobmV3TGV2ZWxTeW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbmV3TGV2ZWwgPSBvbGRMZXZlbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuZXdMZXZlbFN5bSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnRMZXZlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChMb2cubGV2ZWxzW25ld0xldmVsU3ltXSkge1xuICAgICAgICAgICAgaWYgKHNldEdsb2JhbExldmVsKSB7XG4gICAgICAgICAgICAgICAgTG9nLmdsb2JhbExldmVsID0gbmV3TGV2ZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydExldmVsID0gbmV3TGV2ZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBgbmV3ICR7c2V0R2xvYmFsTGV2ZWwgPyAnZ2xvYmFsJyA6IHRoaXMucmVwb3J0UHJlZml4fSBsb2cgbGV2ZWwgJHtuZXdMZXZlbC5kZXNjLnRvVXBwZXJDYXNlKCl9ICh3YXMgJHtvbGRMZXZlbC5kZXNjLnRvVXBwZXJDYXNlKCl9KWA7XG4gICAgICAgICAgICB0aGlzLm91dCgobmV3TGV2ZWwuc3ltID09PSBvbGRMZXZlbC5zeW0pID8gTG9nLkRFQlVHIDogTG9nLklORk8sIG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm91dChMb2cuRVJST1IsIGB1bmtvd24gbGV2ZWwgJHtuZXdMZXZlbFN5bX07IGxvZyBsZXZlbCByZW1haW5zICR7b2xkTGV2ZWwuc3ltfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdMZXZlbC5zeW07XG4gICAgfVxuICAgIGRlYnVnKG1zZywgbG9nMkZpbGUgPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiB5aWVsZCB0aGlzLm91dChMb2cuREVCVUcsIG1zZyk7IH0pO1xuICAgIH1cbiAgICBpbmZvKG1zZywgbG9nMkZpbGUgPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiB5aWVsZCB0aGlzLm91dChMb2cuSU5GTywgbXNnKTsgfSk7XG4gICAgfVxuICAgIHdhcm4obXNnLCBsb2cyRmlsZSA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsgcmV0dXJuIHlpZWxkIHRoaXMub3V0KExvZy5XQVJOLCBtc2cpOyB9KTtcbiAgICB9XG4gICAgZXJyb3IobXNnLCBsb2cyRmlsZSA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmIChtc2cubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMub3V0KExvZy5FUlJPUiwgbXNnLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMub3V0KExvZy5FUlJPUiwgbXNnLnN0YWNrKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbXNnLm1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdGhpcy5vdXQoTG9nLkVSUk9SLCBtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb3V0KGx2bCwgbXNnKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBsZXQgZGVzYyA9IExvZy5sZXZlbHNbbHZsXTtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlckxldmVsID0gdGhpcy5yZXBvcnRMZXZlbCB8fCBMb2cuZ2xvYmFsTGV2ZWw7XG4gICAgICAgICAgICBpZiAoZGVzYy5pbXBvcnRhbmNlID49IGZpbHRlckxldmVsLmltcG9ydGFuY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RyID0gRGF0ZV8xLmRhdGUoTG9nLmRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICAgIGxldCBsaW5lID0gKHR5cGVvZiBtc2cgPT09ICdzdHJpbmcnKSA/IG1zZyA6IHRoaXMuaW5zcGVjdChtc2csIDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvZ0xpbmUgPSB0aGlzLm1ha2VNZXNzYWdlKGxpbmUsIGx2bCwgZGF0ZVN0ciwgZGVzYy5kZXNjKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsb2dMaW5lKTtcbiAgICAgICAgICAgICAgICBpZiAobXNnICYmIG1zZy5zdGFjaykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cuc3RhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGxpbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG1ha2VNZXNzYWdlKGxpbmUsIGx2bCwgZGF0ZVN0ciwgZGVzYykge1xuICAgICAgICByZXR1cm4gYCR7ZGF0ZVN0cn0gJHt0aGlzLnJlcG9ydFByZWZpeH0gJHtkZXNjfSAke2xpbmV9YDtcbiAgICB9XG4gICAgZm9ybWF0KGZtdFN0cikge1xuICAgICAgICBpZiAoZm10U3RyID09PSBudWxsKSB7XG4gICAgICAgICAgICBMb2cuZGF0ZUZvcm1hdCA9IExvZy5kZWZEYXRlRm9ybWF0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZtdFN0cikge1xuICAgICAgICAgICAgTG9nLmRhdGVGb3JtYXQgPSBmbXRTdHI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIExvZy5kYXRlRm9ybWF0O1xuICAgIH1cbiAgICBwcmVmaXgocHJmKSB7XG4gICAgICAgIGlmIChwcmYpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0UHJlZml4ID0gcHJmO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlcG9ydFByZWZpeDtcbiAgICB9XG4gICAgY29uZmlnKGNmZykge1xuICAgICAgICBpZiAoY2ZnLmZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdChjZmcuZm9ybWF0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2ZnLmxldmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwoY2ZnLmxldmVsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnNwZWN0KG1zZywgZGVwdGggPSAzLCBpbmRlbnQgPSAnICAgICcsIGNvbG9ycyA9IENPTE9SUykge1xuICAgICAgICBmdW5jdGlvbiBfaW5zcGVjdChtc2csIGRlcHRoLCBsZXZlbCwgY3VyckluZGVudCkge1xuICAgICAgICAgICAgaWYgKG1zZyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXNnID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1zZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAnZnVuY3Rpb24nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtc2cgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAnJHttc2d9J2A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1zZyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVwdGggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAobXNnLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSA/ICd7Li4ufScgOiAnWy4uLl0nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobXNnLm1hcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgWyR7bXNnLm1hcCgoZSkgPT4gKGUgPT09IHVuZGVmaW5lZCkgPyAnJyA6IF9pbnNwZWN0KGUsIGRlcHRoIC0gMSwgbGV2ZWwgKyAxLCBjdXJySW5kZW50KSkuam9pbignLCAnKX1dYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgW3ByZWZpeCwgcG9zdGZpeF0gPSBsb2cuZ2V0UHJlUG9zdGZpeChpbmRlbnQsIGxldmVsLCBjdXJySW5kZW50KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjc3RhcnQgPSBjb2xvcnMgPyBgPGI+PHNwYW4gc3R5bGU9J2NvbG9yOiR7Y29sb3JzW2xldmVsICUgY29sb3JzLmxlbmd0aF19Oyc+YCA6ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNzdG9wID0gY29sb3JzID8gYDwvc3Bhbj48L2I+YCA6ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxmID0gY29sb3JzID8gJzxicj4nIDogJ1xcbic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGB7JHtsZn1gICsgT2JqZWN0LmtleXMobXNnKS5tYXAoayA9PiBgJHtjc3RhcnR9JHtwcmVmaXh9JHtrfSR7cG9zdGZpeH0ke2NzdG9wfTogJHtfaW5zcGVjdChtc2dba10sIGRlcHRoIC0gMSwgbGV2ZWwgKyAxLCBjdXJySW5kZW50ICsgaW5kZW50KX1gKS5qb2luKGAsJHtsZn1gKSArIGAke2xmfSR7Y3VyckluZGVudH19YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtc2cudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsb2cgPSB0aGlzO1xuICAgICAgICBpZiAoY29sb3JzKSB7XG4gICAgICAgICAgICBpbmRlbnQgPSBpbmRlbnQucmVwbGFjZSgvIC9nLCAnJm5ic3A7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9pbnNwZWN0KG1zZywgZGVwdGggPT09IG51bGwgPyA5OTkgOiBkZXB0aCwgMCwgJycpO1xuICAgIH1cbiAgICBnZXRQcmVQb3N0Zml4KGluZGVudCwgbGV2ZWwsIGN1cnJJbmRlbnQpIHtcbiAgICAgICAgcmV0dXJuIFtgJHtjdXJySW5kZW50fSR7aW5kZW50fWAsICcnXTtcbiAgICB9XG59XG5leHBvcnRzLkxvZyA9IExvZztcbkxvZy5kZWZEYXRlRm9ybWF0ID0gJyVZWVlZJU1NJUREICVoaDolbW06JXNzLiVqamonO1xuTG9nLmRhdGVGb3JtYXQgPSBMb2cuZGVmRGF0ZUZvcm1hdDtcbkxvZy5ERUJVRyA9ICdERUJVRyc7XG5Mb2cuSU5GTyA9ICdJTkZPJztcbkxvZy5XQVJOID0gJ1dBUk4nO1xuTG9nLkVSUk9SID0gJ0VSUk9SJztcbkxvZy5sZXZlbHMgPSB7XG4gICAgW0xvZy5ERUJVR106IHsgaW1wb3J0YW5jZTogMCwgc3ltOiBMb2cuREVCVUcsIGRlc2M6ICdERUJVRycgfSxcbiAgICBbTG9nLklORk9dOiB7IGltcG9ydGFuY2U6IDEsIHN5bTogTG9nLklORk8sIGRlc2M6ICdJTkZPJyB9LFxuICAgIFtMb2cuV0FSTl06IHsgaW1wb3J0YW5jZTogMiwgc3ltOiBMb2cuV0FSTiwgZGVzYzogJ1dBUk4nIH0sXG4gICAgW0xvZy5FUlJPUl06IHsgaW1wb3J0YW5jZTogMywgc3ltOiBMb2cuRVJST1IsIGRlc2M6ICdFUlJPUicgfVxufTtcbkxvZy5sb2cgPSBuZXcgTG9nKCcnKTtcbkxvZy5nbG9iYWxMZXZlbCA9IExvZy5sZXZlbHNbTG9nLklORk9dO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYkc5bkxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMMnh2Wnk1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96czdPenM3T3pzN096dEJRU3RGUVN4cFEwRkJPRUk3UVVGSE9VSXNUVUZCVFN4TlFVRk5MRWRCUVVjc1EwRkJReXhOUVVGTkxFVkJRVVVzVFVGQlRTeEZRVUZGTEUxQlFVMHNSVUZCUlN4TlFVRk5MRVZCUVVVc1RVRkJUU3hGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzBGQlZXaEZMRTFCUVdFc1IwRkJSenRKUVd0RFdpeFpRVUZaTEUxQlFXRTdVVUZJWml4blFrRkJWeXhIUVVGclFpeFRRVUZUTEVOQlFVTTdVVUZEZGtNc2FVSkJRVmtzUjBGQlRTeEZRVUZGTEVOQlFVTTdVVUZGUml4SlFVRkpMRU5CUVVNc1dVRkJXU3hIUVVGSExFMUJRVTBzUTBGQlF6dEpRVUZETEVOQlFVTTdTVUZ2UW01RUxFdEJRVXNzUTBGQlF5eFhRVUZ0UWl4RlFVRkZMR05CUVhWQ08xRkJRM0pFTEVsQlFVa3NVVUZCVVN4SFFVRkhMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVsQlFVa3NSMEZCUnl4RFFVRkRMRmRCUVZjc1EwRkJRenRSUVVNeFJDeEpRVUZKTEZGQlFWRXNSMEZCUnl4SlFVRkpMRU5CUVVNc1YwRkJWeXhKUVVGSkxFZEJRVWNzUTBGQlF5eFhRVUZYTEVOQlFVTTdVVUZEYmtRc1NVRkJTU3hYUVVGWExFdEJRVXNzVTBGQlV5eEZRVUZGTzFsQlF6TkNMRkZCUVZFc1IwRkJSeXhSUVVGUkxFTkJRVU03VTBGRGRrSTdZVUZCVFN4SlFVRkpMRmRCUVZjc1MwRkJTeXhKUVVGSkxFVkJRVVU3V1VGRE4wSXNTVUZCU1N4RFFVRkRMRmRCUVZjc1IwRkJSeXhUUVVGVExFTkJRVU03VTBGRGFFTTdZVUZCVFN4SlFVRkpMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVWQlFVVTdXVUZEYUVNc1NVRkJTU3hqUVVGakxFVkJRVVU3WjBKQlFVVXNSMEZCUnl4RFFVRkRMRmRCUVZjc1IwRkJSeXhSUVVGUkxFTkJRVU03WVVGQlJUdHBRa0ZETDBJN1owSkJRVVVzU1VGQlNTeERRVUZETEZkQlFWY3NSMEZCUnl4UlFVRlJMRU5CUVVNN1lVRkJSVHRaUVVOd1JDeE5RVUZOTEVkQlFVY3NSMEZCUnl4UFFVRlBMR05CUVdNc1EwRkJRU3hEUVVGRExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1dVRkJXU3hqUVVGakxGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RlFVRkZMRk5CUVZNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVWQlFVVXNSMEZCUnl4RFFVRkRPMWxCUTJoS0xFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1IwRkJSeXhMUVVGTExGRkJRVkVzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVFc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF6dFRRVU4yUlR0aFFVRk5PMWxCUTBnc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNTMEZCU3l4RlFVRkZMR2RDUVVGblFpeFhRVUZYTEhWQ1FVRjFRaXhSUVVGUkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVOQlFVTXNRMEZCUXp0VFFVTjZSanRSUVVORUxFOUJRVThzVVVGQlVTeERRVUZETEVkQlFVY3NRMEZCUXp0SlFVTjRRaXhEUVVGRE8wbEJWVmtzUzBGQlN5eERRVUZETEVkQlFVOHNSVUZCUlN4UlFVRlJMRWRCUVVNc1NVRkJTVHM0UkVGQmIwSXNUMEZCVHl4TlFVRk5MRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEV0QlFVc3NSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UzBGQlFUdEpRVlY0Uml4SlFVRkpMRU5CUVVNc1IwRkJUeXhGUVVGRkxGRkJRVkVzUjBGQlF5eEpRVUZKT3poRVFVRnZRaXhQUVVGUExFMUJRVTBzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0TFFVRkJPMGxCVlhSR0xFbEJRVWtzUTBGQlF5eEhRVUZQTEVWQlFVVXNVVUZCVVN4SFFVRkRMRWxCUVVrN09FUkJRVzlDTEU5QlFVOHNUVUZCVFN4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wdEJRVUU3U1VGVGRFWXNTMEZCU3l4RFFVRkRMRWRCUVU4c1JVRkJSU3hSUVVGUkxFZEJRVU1zU1VGQlNUczdXVUZEY2tNc1NVRkJTU3hIUVVGSExFTkJRVU1zVDBGQlR5eEZRVUZGTzJkQ1FVTmlMRTFCUVUwc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNTMEZCU3l4RlFVRkZMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dG5Ra0ZEZGtNc1RVRkJUU3hKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4TFFVRkxMRVZCUVVVc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzJkQ1FVTnlReXhQUVVGUExFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTTdZVUZEZEVJN2FVSkJRVTA3WjBKQlEwZ3NUMEZCVHl4TlFVRk5MRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEV0QlFVc3NSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenRoUVVONlF6dFJRVU5NTEVOQlFVTTdTMEZCUVR0SlFWVmxMRWRCUVVjc1EwRkJReXhIUVVGVkxFVkJRVVVzUjBGQlR6czdXVUZEYmtNc1NVRkJTU3hKUVVGSkxFZEJRV0VzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRaUVVOeVF5eE5RVUZOTEZkQlFWY3NSMEZCUnl4SlFVRkpMRU5CUVVNc1YwRkJWeXhKUVVGSkxFZEJRVWNzUTBGQlF5eFhRVUZYTEVOQlFVTTdXVUZEZUVRc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeEpRVUZKTEZkQlFWY3NRMEZCUXl4VlFVRlZMRVZCUVVVN1owSkJRek5ETEUxQlFVMHNUMEZCVHl4SFFVRkhMRmRCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zVlVGQlZTeERRVUZETEVOQlFVTTdaMEpCUTNKRExFbEJRVWtzU1VGQlNTeEhRVUZITEVOQlFVTXNUMEZCVHl4SFFVRkhMRXRCUVVzc1VVRkJVU3hEUVVGRExFTkJRVUVzUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRMnBGTEUxQlFVMHNUMEZCVHl4SFFVRkhMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeEZRVUZGTEVkQlFVY3NSVUZCUlN4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzJkQ1FVTm9SU3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMmRDUVVOeVFpeEpRVUZKTEVkQlFVY3NTVUZCU1N4SFFVRkhMRU5CUVVNc1MwRkJTeXhGUVVGRk8yOUNRVUZGTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzJsQ1FVRkZPMmRDUVVOcVJDeFBRVUZQTEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03WVVGRGFFTTdXVUZEUkN4UFFVRlBMRk5CUVZNc1EwRkJRenRSUVVOeVFpeERRVUZETzB0QlFVRTdTVUZQVXl4WFFVRlhMRU5CUVVNc1NVRkJWeXhGUVVGRkxFZEJRVlVzUlVGQlJTeFBRVUZqTEVWQlFVVXNTVUZCVnp0UlFVTjBSU3hQUVVGUExFZEJRVWNzVDBGQlR5eEpRVUZKTEVsQlFVa3NRMEZCUXl4WlFVRlpMRWxCUVVrc1NVRkJTU3hKUVVGSkxFbEJRVWtzUlVGQlJTeERRVUZETzBsQlF6ZEVMRU5CUVVNN1NVRlpUU3hOUVVGTkxFTkJRVU1zVFVGQll6dFJRVU40UWl4SlFVRkpMRTFCUVUwc1MwRkJTeXhKUVVGSkxFVkJRVVU3V1VGQlJTeEhRVUZITEVOQlFVTXNWVUZCVlN4SFFVRkhMRWRCUVVjc1EwRkJReXhoUVVGaExFTkJRVU03VTBGQlJUdGhRVU4yUkN4SlFVRkpMRTFCUVUwc1JVRkJUVHRaUVVGRkxFZEJRVWNzUTBGQlF5eFZRVUZWTEVkQlFVY3NUVUZCVFN4RFFVRkRPMU5CUVVVN1VVRkRha1FzVDBGQlR5eEhRVUZITEVOQlFVTXNWVUZCVlN4RFFVRkRPMGxCUXpGQ0xFTkJRVU03U1VGUFRTeE5RVUZOTEVOQlFVTXNSMEZCVnp0UlFVTnlRaXhKUVVGSkxFZEJRVWNzUlVGQlJUdFpRVUZGTEVsQlFVa3NRMEZCUXl4WlFVRlpMRWRCUVVjc1IwRkJSeXhEUVVGRE8xTkJRVVU3VVVGRGNrTXNUMEZCVHl4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRE8wbEJRemRDTEVOQlFVTTdTVUZWVFN4TlFVRk5MRU5CUVVNc1IwRkJjVVE3VVVGREwwUXNTVUZCU1N4SFFVRkhMRU5CUVVNc1RVRkJUU3hMUVVGSExGTkJRVk1zUlVGQlJUdFpRVUZGTEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETzFOQlFVVTdVVUZEZUVRc1NVRkJTU3hIUVVGSExFTkJRVU1zUzBGQlN5eExRVUZITEZOQlFWTXNSVUZCUnp0WlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMU5CUVVVN1NVRkRNVVFzUTBGQlF6dEpRV0ZOTEU5QlFVOHNRMEZCUXl4SFFVRlBMRVZCUVVVc1MwRkJTeXhIUVVGRExFTkJRVU1zUlVGQlJTeE5RVUZOTEVkQlFVTXNUVUZCVFN4RlFVRkZMRTFCUVUwc1IwRkJReXhOUVVGTk8xRkJRM3BFTEZOQlFWTXNVVUZCVVN4RFFVRkRMRWRCUVU4c1JVRkJSU3hMUVVGWkxFVkJRVVVzUzBGQldTeEZRVUZGTEZWQlFXbENPMWxCUTNCRkxFbEJRVWtzUjBGQlJ5eExRVUZMTEVsQlFVa3NSVUZCWjBJN1owSkJRVVVzVDBGQlR5eE5RVUZOTEVOQlFVTTdZVUZCUlR0WlFVTnNSQ3hKUVVGSkxFZEJRVWNzUzBGQlN5eFRRVUZUTEVWQlFWYzdaMEpCUVVVc1QwRkJUeXhYUVVGWExFTkJRVU03WVVGQlJUdFpRVU4yUkN4SlFVRkpMRTlCUVU4c1IwRkJSeXhMUVVGTExGVkJRVlVzUlVGQlJ6dG5Ra0ZCUlN4UFFVRlBMRlZCUVZVc1EwRkJRenRoUVVGRk8xbEJRM1JFTEVsQlFVa3NUMEZCVHl4SFFVRkhMRXRCUVVzc1VVRkJVU3hGUVVGTE8yZENRVUZGTEU5QlFVOHNTVUZCU1N4SFFVRkhMRWRCUVVjc1EwRkJRenRoUVVGRk8xbEJRM1JFTEVsQlFVa3NUMEZCVHl4SFFVRkhMRXRCUVVzc1VVRkJVU3hGUVVGTE8yZENRVU0xUWl4SlFVRkpMRXRCUVVzc1IwRkJReXhEUVVGRExFVkJRVVU3YjBKQlFVVXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhOUVVGTkxFdEJRVWNzVTBGQlV5eERRVUZETEVOQlFVRXNRMEZCUXl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETzJsQ1FVRkZPMmRDUVVOd1JTeEpRVUZKTEVkQlFVY3NRMEZCUXl4SFFVRkhMRXRCUVVzc1UwRkJVeXhGUVVGRk8yOUNRVU4yUWl4UFFVRlBMRWxCUVVrc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVc3NSVUZCUXl4RlFVRkZMRU5CUVVFc1EwRkJReXhEUVVGRExFdEJRVWNzVTBGQlV5eERRVUZETEVOQlFVRXNRMEZCUXl4RFFVRkJMRVZCUVVVc1EwRkJRU3hEUVVGRExFTkJRVUVzVVVGQlVTeERRVUZETEVOQlFVTXNSVUZCUlN4TFFVRkxMRWRCUVVNc1EwRkJReXhGUVVGRkxFdEJRVXNzUjBGQlF5eERRVUZETEVWQlFVVXNWVUZCVlN4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXp0cFFrRkRNVWM3WjBKQlEwWXNUVUZCVFN4RFFVRkRMRTFCUVUwc1JVRkJSU3hQUVVGUExFTkJRVU1zUjBGQlJ5eEhRVUZITEVOQlFVTXNZVUZCWVN4RFFVRkRMRTFCUVUwc1JVRkJSU3hMUVVGTExFVkJRVVVzVlVGQlZTeERRVUZETEVOQlFVTTdaMEpCUTNaRkxFMUJRVTBzVFVGQlRTeEhRVUZKTEUxQlFVMHNRMEZCUVN4RFFVRkRMRU5CUVVNc2VVSkJRWGxDTEUxQlFVMHNRMEZCUXl4TFFVRkxMRWRCUVVjc1RVRkJUU3hEUVVGRExFMUJRVTBzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJRenRuUWtGRGVrWXNUVUZCVFN4TFFVRkxMRWRCUVVzc1RVRkJUU3hEUVVGQkxFTkJRVU1zUTBGQlF5eGhRVUZoTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJRenRuUWtGRE0wTXNUVUZCVFN4RlFVRkZMRWRCUVZFc1RVRkJUU3hEUVVGQkxFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJRenRuUWtGRGRFTXNUMEZCVHl4SlFVRkpMRVZCUVVVc1JVRkJSU3hIUVVGSExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4TlFVRk5MRWRCUVVjc1RVRkJUU3hIUVVGSExFTkJRVU1zUjBGQlJ5eFBRVUZQTEVkQlFVY3NTMEZCU3l4TFFVTTFSU3hSUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRXRCUVVzc1IwRkJReXhEUVVGRExFVkJRVVVzUzBGQlN5eEhRVUZETEVOQlFVTXNSVUZCUlN4VlFVRlZMRWRCUVVNc1RVRkJUU3hEUVVONFJDeEZRVUZGTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFVkJRVVVzUTBGQlF5eEhRVUZITEVkQlFVY3NSVUZCUlN4SFFVRkhMRlZCUVZVc1IwRkJSeXhEUVVGRE8yRkJRMnhFTzFsQlEwUXNUMEZCVHl4SFFVRkhMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU03VVVGRE1VSXNRMEZCUXp0UlFVTkVMRTFCUVUwc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF6dFJRVU5xUWl4SlFVRkpMRTFCUVUwc1JVRkJSVHRaUVVGRkxFMUJRVTBzUjBGQlJ5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1JVRkJSU3hSUVVGUkxFTkJRVU1zUTBGQlF6dFRRVUZGTzFGQlEzaEVMRTlCUVU4c1VVRkJVU3hEUVVGRExFZEJRVWNzUlVGQlJTeExRVUZMTEV0QlFVY3NTVUZCU1N4RFFVRkJMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU03U1VGRE0wUXNRMEZCUXp0SlFVVlRMR0ZCUVdFc1EwRkJReXhOUVVGaExFVkJRVVVzUzBGQldTeEZRVUZGTEZWQlFXbENPMUZCUTJ4RkxFOUJRVThzUTBGQlF5eEhRVUZITEZWQlFWVXNSMEZCUnl4TlFVRk5MRVZCUVVVc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF6dEpRVU14UXl4RFFVRkRPenRCUVhCUFRDeHJRa0Z4VDBNN1FVRnVUMjlDTEdsQ1FVRmhMRWRCUVVjc09FSkJRVGhDTEVOQlFVTTdRVUZETDBNc1kwRkJWU3hIUVVGTkxFZEJRVWNzUTBGQlF5eGhRVUZoTEVOQlFVTTdRVUZIY2tNc1UwRkJTeXhIUVVGSExFOUJRVThzUTBGQlF6dEJRVWRvUWl4UlFVRkpMRWRCUVVzc1RVRkJUU3hEUVVGRE8wRkJSMmhDTEZGQlFVa3NSMEZCU3l4TlFVRk5MRU5CUVVNN1FVRkhhRUlzVTBGQlN5eEhRVUZKTEU5QlFVOHNRMEZCUXp0QlFVZGtMRlZCUVUwc1IwRkJSenRKUVVOMFFpeERRVUZETEVkQlFVY3NRMEZCUXl4TFFVRkxMRU5CUVVNc1JVRkJTeXhGUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1EwRkJReXhMUVVGTExFVkJRVVVzU1VGQlNTeEZRVUZGTEU5QlFVOHNSVUZCUXp0SlFVTTVSQ3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCVFN4RlFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4SlFVRkpMRVZCUVVjc1NVRkJTU3hGUVVGRkxFMUJRVTBzUlVGQlF6dEpRVU0zUkN4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlRTeEZRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRMRVZCUVVVc1IwRkJSeXhGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVWQlFVY3NTVUZCU1N4RlFVRkZMRTFCUVUwc1JVRkJRenRKUVVNM1JDeERRVUZETEVkQlFVY3NRMEZCUXl4TFFVRkxMRU5CUVVNc1JVRkJTeXhGUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1EwRkJReXhMUVVGTExFVkJRVVVzU1VGQlNTeEZRVUZGTEU5QlFVOHNSVUZCUXp0RFFVTnFSU3hEUVVGRE8wRkJSMWtzVDBGQlJ5eEhRVUZITEVsQlFVa3NSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8wRkJSMllzWlVGQlZ5eEhRVUZoTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZESW4wPSIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyZW5kZXIsIHNjaGVkdWxlLCBjb25zb2xlKSB7XG5cdHZhciBzdWJzY3JpcHRpb25zID0gW11cblx0dmFyIHJlbmRlcmluZyA9IGZhbHNlXG5cdHZhciBwZW5kaW5nID0gZmFsc2VcblxuXHRmdW5jdGlvbiBzeW5jKCkge1xuXHRcdGlmIChyZW5kZXJpbmcpIHRocm93IG5ldyBFcnJvcihcIk5lc3RlZCBtLnJlZHJhdy5zeW5jKCkgY2FsbFwiKVxuXHRcdHJlbmRlcmluZyA9IHRydWVcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN1YnNjcmlwdGlvbnMubGVuZ3RoOyBpICs9IDIpIHtcblx0XHRcdHRyeSB7IHJlbmRlcihzdWJzY3JpcHRpb25zW2ldLCBWbm9kZShzdWJzY3JpcHRpb25zW2kgKyAxXSksIHJlZHJhdykgfVxuXHRcdFx0Y2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcihlKSB9XG5cdFx0fVxuXHRcdHJlbmRlcmluZyA9IGZhbHNlXG5cdH1cblxuXHRmdW5jdGlvbiByZWRyYXcoKSB7XG5cdFx0aWYgKCFwZW5kaW5nKSB7XG5cdFx0XHRwZW5kaW5nID0gdHJ1ZVxuXHRcdFx0c2NoZWR1bGUoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHBlbmRpbmcgPSBmYWxzZVxuXHRcdFx0XHRzeW5jKClcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0cmVkcmF3LnN5bmMgPSBzeW5jXG5cblx0ZnVuY3Rpb24gbW91bnQocm9vdCwgY29tcG9uZW50KSB7XG5cdFx0aWYgKGNvbXBvbmVudCAhPSBudWxsICYmIGNvbXBvbmVudC52aWV3ID09IG51bGwgJiYgdHlwZW9mIGNvbXBvbmVudCAhPT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwibS5tb3VudChlbGVtZW50LCBjb21wb25lbnQpIGV4cGVjdHMgYSBjb21wb25lbnQsIG5vdCBhIHZub2RlXCIpXG5cdFx0fVxuXG5cdFx0dmFyIGluZGV4ID0gc3Vic2NyaXB0aW9ucy5pbmRleE9mKHJvb3QpXG5cdFx0aWYgKGluZGV4ID49IDApIHtcblx0XHRcdHN1YnNjcmlwdGlvbnMuc3BsaWNlKGluZGV4LCAyKVxuXHRcdFx0cmVuZGVyKHJvb3QsIFtdLCByZWRyYXcpXG5cdFx0fVxuXG5cdFx0aWYgKGNvbXBvbmVudCAhPSBudWxsKSB7XG5cdFx0XHRzdWJzY3JpcHRpb25zLnB1c2gocm9vdCwgY29tcG9uZW50KVxuXHRcdFx0cmVuZGVyKHJvb3QsIFZub2RlKGNvbXBvbmVudCksIHJlZHJhdylcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge21vdW50OiBtb3VudCwgcmVkcmF3OiByZWRyYXd9XG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG52YXIgbSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvaHlwZXJzY3JpcHRcIilcbnZhciBQcm9taXNlID0gcmVxdWlyZShcIi4uL3Byb21pc2UvcHJvbWlzZVwiKVxuXG52YXIgYnVpbGRQYXRobmFtZSA9IHJlcXVpcmUoXCIuLi9wYXRobmFtZS9idWlsZFwiKVxudmFyIHBhcnNlUGF0aG5hbWUgPSByZXF1aXJlKFwiLi4vcGF0aG5hbWUvcGFyc2VcIilcbnZhciBjb21waWxlVGVtcGxhdGUgPSByZXF1aXJlKFwiLi4vcGF0aG5hbWUvY29tcGlsZVRlbXBsYXRlXCIpXG52YXIgYXNzaWduID0gcmVxdWlyZShcIi4uL3BhdGhuYW1lL2Fzc2lnblwiKVxuXG52YXIgc2VudGluZWwgPSB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCR3aW5kb3csIG1vdW50UmVkcmF3KSB7XG5cdHZhciBmaXJlQXN5bmNcblxuXHRmdW5jdGlvbiBzZXRQYXRoKHBhdGgsIGRhdGEsIG9wdGlvbnMpIHtcblx0XHRwYXRoID0gYnVpbGRQYXRobmFtZShwYXRoLCBkYXRhKVxuXHRcdGlmIChmaXJlQXN5bmMgIT0gbnVsbCkge1xuXHRcdFx0ZmlyZUFzeW5jKClcblx0XHRcdHZhciBzdGF0ZSA9IG9wdGlvbnMgPyBvcHRpb25zLnN0YXRlIDogbnVsbFxuXHRcdFx0dmFyIHRpdGxlID0gb3B0aW9ucyA/IG9wdGlvbnMudGl0bGUgOiBudWxsXG5cdFx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlcGxhY2UpICR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCByb3V0ZS5wcmVmaXggKyBwYXRoKVxuXHRcdFx0ZWxzZSAkd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCB0aXRsZSwgcm91dGUucHJlZml4ICsgcGF0aClcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQkd2luZG93LmxvY2F0aW9uLmhyZWYgPSByb3V0ZS5wcmVmaXggKyBwYXRoXG5cdFx0fVxuXHR9XG5cblx0dmFyIGN1cnJlbnRSZXNvbHZlciA9IHNlbnRpbmVsLCBjb21wb25lbnQsIGF0dHJzLCBjdXJyZW50UGF0aCwgbGFzdFVwZGF0ZVxuXG5cdHZhciBTS0lQID0gcm91dGUuU0tJUCA9IHt9XG5cblx0ZnVuY3Rpb24gcm91dGUocm9vdCwgZGVmYXVsdFJvdXRlLCByb3V0ZXMpIHtcblx0XHRpZiAocm9vdCA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoXCJFbnN1cmUgdGhlIERPTSBlbGVtZW50IHRoYXQgd2FzIHBhc3NlZCB0byBgbS5yb3V0ZWAgaXMgbm90IHVuZGVmaW5lZFwiKVxuXHRcdC8vIDAgPSBzdGFydFxuXHRcdC8vIDEgPSBpbml0XG5cdFx0Ly8gMiA9IHJlYWR5XG5cdFx0dmFyIHN0YXRlID0gMFxuXG5cdFx0dmFyIGNvbXBpbGVkID0gT2JqZWN0LmtleXMocm91dGVzKS5tYXAoZnVuY3Rpb24ocm91dGUpIHtcblx0XHRcdGlmIChyb3V0ZVswXSAhPT0gXCIvXCIpIHRocm93IG5ldyBTeW50YXhFcnJvcihcIlJvdXRlcyBtdXN0IHN0YXJ0IHdpdGggYSBgL2BcIilcblx0XHRcdGlmICgoLzooW15cXC9cXC4tXSspKFxcLnszfSk/Oi8pLnRlc3Qocm91dGUpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBTeW50YXhFcnJvcihcIlJvdXRlIHBhcmFtZXRlciBuYW1lcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGVpdGhlciBgL2AsIGAuYCwgb3IgYC1gXCIpXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRyb3V0ZTogcm91dGUsXG5cdFx0XHRcdGNvbXBvbmVudDogcm91dGVzW3JvdXRlXSxcblx0XHRcdFx0Y2hlY2s6IGNvbXBpbGVUZW1wbGF0ZShyb3V0ZSksXG5cdFx0XHR9XG5cdFx0fSlcblx0XHR2YXIgY2FsbEFzeW5jID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0SW1tZWRpYXRlIDogc2V0VGltZW91dFxuXHRcdHZhciBwID0gUHJvbWlzZS5yZXNvbHZlKClcblx0XHR2YXIgc2NoZWR1bGVkID0gZmFsc2Vcblx0XHR2YXIgb25yZW1vdmVcblxuXHRcdGZpcmVBc3luYyA9IG51bGxcblxuXHRcdGlmIChkZWZhdWx0Um91dGUgIT0gbnVsbCkge1xuXHRcdFx0dmFyIGRlZmF1bHREYXRhID0gcGFyc2VQYXRobmFtZShkZWZhdWx0Um91dGUpXG5cblx0XHRcdGlmICghY29tcGlsZWQuc29tZShmdW5jdGlvbiAoaSkgeyByZXR1cm4gaS5jaGVjayhkZWZhdWx0RGF0YSkgfSkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiRGVmYXVsdCByb3V0ZSBkb2Vzbid0IG1hdGNoIGFueSBrbm93biByb3V0ZXNcIilcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiByZXNvbHZlUm91dGUoKSB7XG5cdFx0XHRzY2hlZHVsZWQgPSBmYWxzZVxuXHRcdFx0Ly8gQ29uc2lkZXIgdGhlIHBhdGhuYW1lIGhvbGlzdGljYWxseS4gVGhlIHByZWZpeCBtaWdodCBldmVuIGJlIGludmFsaWQsXG5cdFx0XHQvLyBidXQgdGhhdCdzIG5vdCBvdXIgcHJvYmxlbS5cblx0XHRcdHZhciBwcmVmaXggPSAkd2luZG93LmxvY2F0aW9uLmhhc2hcblx0XHRcdGlmIChyb3V0ZS5wcmVmaXhbMF0gIT09IFwiI1wiKSB7XG5cdFx0XHRcdHByZWZpeCA9ICR3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgcHJlZml4XG5cdFx0XHRcdGlmIChyb3V0ZS5wcmVmaXhbMF0gIT09IFwiP1wiKSB7XG5cdFx0XHRcdFx0cHJlZml4ID0gJHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHByZWZpeFxuXHRcdFx0XHRcdGlmIChwcmVmaXhbMF0gIT09IFwiL1wiKSBwcmVmaXggPSBcIi9cIiArIHByZWZpeFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBUaGlzIHNlZW1pbmdseSB1c2VsZXNzIGAuY29uY2F0KClgIHNwZWVkcyB1cCB0aGUgdGVzdHMgcXVpdGUgYSBiaXQsXG5cdFx0XHQvLyBzaW5jZSB0aGUgcmVwcmVzZW50YXRpb24gaXMgY29uc2lzdGVudGx5IGEgcmVsYXRpdmVseSBwb29ybHlcblx0XHRcdC8vIG9wdGltaXplZCBjb25zIHN0cmluZy5cblx0XHRcdHZhciBwYXRoID0gcHJlZml4LmNvbmNhdCgpXG5cdFx0XHRcdC5yZXBsYWNlKC8oPzolW2EtZjg5XVthLWYwLTldKSsvZ2ltLCBkZWNvZGVVUklDb21wb25lbnQpXG5cdFx0XHRcdC5zbGljZShyb3V0ZS5wcmVmaXgubGVuZ3RoKVxuXHRcdFx0dmFyIGRhdGEgPSBwYXJzZVBhdGhuYW1lKHBhdGgpXG5cblx0XHRcdGFzc2lnbihkYXRhLnBhcmFtcywgJHdpbmRvdy5oaXN0b3J5LnN0YXRlKVxuXG5cdFx0XHRmdW5jdGlvbiBmYWlsKCkge1xuXHRcdFx0XHRpZiAocGF0aCA9PT0gZGVmYXVsdFJvdXRlKSB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcmVzb2x2ZSBkZWZhdWx0IHJvdXRlIFwiICsgZGVmYXVsdFJvdXRlKVxuXHRcdFx0XHRzZXRQYXRoKGRlZmF1bHRSb3V0ZSwgbnVsbCwge3JlcGxhY2U6IHRydWV9KVxuXHRcdFx0fVxuXG5cdFx0XHRsb29wKDApXG5cdFx0XHRmdW5jdGlvbiBsb29wKGkpIHtcblx0XHRcdFx0Ly8gMCA9IGluaXRcblx0XHRcdFx0Ly8gMSA9IHNjaGVkdWxlZFxuXHRcdFx0XHQvLyAyID0gZG9uZVxuXHRcdFx0XHRmb3IgKDsgaSA8IGNvbXBpbGVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKGNvbXBpbGVkW2ldLmNoZWNrKGRhdGEpKSB7XG5cdFx0XHRcdFx0XHR2YXIgcGF5bG9hZCA9IGNvbXBpbGVkW2ldLmNvbXBvbmVudFxuXHRcdFx0XHRcdFx0dmFyIG1hdGNoZWRSb3V0ZSA9IGNvbXBpbGVkW2ldLnJvdXRlXG5cdFx0XHRcdFx0XHR2YXIgbG9jYWxDb21wID0gcGF5bG9hZFxuXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IGxhc3RVcGRhdGUgPSBmdW5jdGlvbihjb21wKSB7XG5cdFx0XHRcdFx0XHRcdGlmICh1cGRhdGUgIT09IGxhc3RVcGRhdGUpIHJldHVyblxuXHRcdFx0XHRcdFx0XHRpZiAoY29tcCA9PT0gU0tJUCkgcmV0dXJuIGxvb3AoaSArIDEpXG5cdFx0XHRcdFx0XHRcdGNvbXBvbmVudCA9IGNvbXAgIT0gbnVsbCAmJiAodHlwZW9mIGNvbXAudmlldyA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBjb21wID09PSBcImZ1bmN0aW9uXCIpPyBjb21wIDogXCJkaXZcIlxuXHRcdFx0XHRcdFx0XHRhdHRycyA9IGRhdGEucGFyYW1zLCBjdXJyZW50UGF0aCA9IHBhdGgsIGxhc3RVcGRhdGUgPSBudWxsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRSZXNvbHZlciA9IHBheWxvYWQucmVuZGVyID8gcGF5bG9hZCA6IG51bGxcblx0XHRcdFx0XHRcdFx0aWYgKHN0YXRlID09PSAyKSBtb3VudFJlZHJhdy5yZWRyYXcoKVxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRzdGF0ZSA9IDJcblx0XHRcdFx0XHRcdFx0XHRtb3VudFJlZHJhdy5yZWRyYXcuc3luYygpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIFRoZXJlJ3Mgbm8gdW5kZXJzdGF0aW5nIGhvdyBtdWNoIEkgKndpc2gqIEkgY291bGRcblx0XHRcdFx0XHRcdC8vIHVzZSBgYXN5bmNgL2Bhd2FpdGAgaGVyZS4uLlxuXHRcdFx0XHRcdFx0aWYgKHBheWxvYWQudmlldyB8fCB0eXBlb2YgcGF5bG9hZCA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdHBheWxvYWQgPSB7fVxuXHRcdFx0XHRcdFx0XHR1cGRhdGUobG9jYWxDb21wKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAocGF5bG9hZC5vbm1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdHAudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHBheWxvYWQub25tYXRjaChkYXRhLnBhcmFtcywgcGF0aCwgbWF0Y2hlZFJvdXRlKVxuXHRcdFx0XHRcdFx0XHR9KS50aGVuKHVwZGF0ZSwgZmFpbClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgdXBkYXRlKFwiZGl2XCIpXG5cdFx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZmFpbCgpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IGl0IHVuY29uZGl0aW9uYWxseSBzbyBgbS5yb3V0ZS5zZXRgIGFuZCBgbS5yb3V0ZS5MaW5rYCBib3RoIHdvcmssXG5cdFx0Ly8gZXZlbiBpZiBuZWl0aGVyIGBwdXNoU3RhdGVgIG5vciBgaGFzaGNoYW5nZWAgYXJlIHN1cHBvcnRlZC4gSXQnc1xuXHRcdC8vIGNsZWFyZWQgaWYgYGhhc2hjaGFuZ2VgIGlzIHVzZWQsIHNpbmNlIHRoYXQgbWFrZXMgaXQgYXV0b21hdGljYWxseVxuXHRcdC8vIGFzeW5jLlxuXHRcdGZpcmVBc3luYyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCFzY2hlZHVsZWQpIHtcblx0XHRcdFx0c2NoZWR1bGVkID0gdHJ1ZVxuXHRcdFx0XHRjYWxsQXN5bmMocmVzb2x2ZVJvdXRlKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgJHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRvbnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBmaXJlQXN5bmMsIGZhbHNlKVxuXHRcdFx0fVxuXHRcdFx0JHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZmlyZUFzeW5jLCBmYWxzZSlcblx0XHR9IGVsc2UgaWYgKHJvdXRlLnByZWZpeFswXSA9PT0gXCIjXCIpIHtcblx0XHRcdGZpcmVBc3luYyA9IG51bGxcblx0XHRcdG9ucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgcmVzb2x2ZVJvdXRlLCBmYWxzZSlcblx0XHRcdH1cblx0XHRcdCR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgcmVzb2x2ZVJvdXRlLCBmYWxzZSlcblx0XHR9XG5cblx0XHRyZXR1cm4gbW91bnRSZWRyYXcubW91bnQocm9vdCwge1xuXHRcdFx0b25iZWZvcmV1cGRhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzdGF0ZSA9IHN0YXRlID8gMiA6IDFcblx0XHRcdFx0cmV0dXJuICEoIXN0YXRlIHx8IHNlbnRpbmVsID09PSBjdXJyZW50UmVzb2x2ZXIpXG5cdFx0XHR9LFxuXHRcdFx0b25jcmVhdGU6IHJlc29sdmVSb3V0ZSxcblx0XHRcdG9ucmVtb3ZlOiBvbnJlbW92ZSxcblx0XHRcdHZpZXc6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIXN0YXRlIHx8IHNlbnRpbmVsID09PSBjdXJyZW50UmVzb2x2ZXIpIHJldHVyblxuXHRcdFx0XHQvLyBXcmFwIGluIGEgZnJhZ21lbnQgdG8gcHJlc2VydmUgZXhpc3Rpbmcga2V5IHNlbWFudGljc1xuXHRcdFx0XHR2YXIgdm5vZGUgPSBbVm5vZGUoY29tcG9uZW50LCBhdHRycy5rZXksIGF0dHJzKV1cblx0XHRcdFx0aWYgKGN1cnJlbnRSZXNvbHZlcikgdm5vZGUgPSBjdXJyZW50UmVzb2x2ZXIucmVuZGVyKHZub2RlWzBdKVxuXHRcdFx0XHRyZXR1cm4gdm5vZGVcblx0XHRcdH0sXG5cdFx0fSlcblx0fVxuXHRyb3V0ZS5zZXQgPSBmdW5jdGlvbihwYXRoLCBkYXRhLCBvcHRpb25zKSB7XG5cdFx0aWYgKGxhc3RVcGRhdGUgIT0gbnVsbCkge1xuXHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblx0XHRcdG9wdGlvbnMucmVwbGFjZSA9IHRydWVcblx0XHR9XG5cdFx0bGFzdFVwZGF0ZSA9IG51bGxcblx0XHRzZXRQYXRoKHBhdGgsIGRhdGEsIG9wdGlvbnMpXG5cdH1cblx0cm91dGUuZ2V0ID0gZnVuY3Rpb24oKSB7cmV0dXJuIGN1cnJlbnRQYXRofVxuXHRyb3V0ZS5wcmVmaXggPSBcIiMhXCJcblx0cm91dGUuTGluayA9IHtcblx0XHR2aWV3OiBmdW5jdGlvbih2bm9kZSkge1xuXHRcdFx0dmFyIG9wdGlvbnMgPSB2bm9kZS5hdHRycy5vcHRpb25zXG5cdFx0XHQvLyBSZW1vdmUgdGhlc2Ugc28gdGhleSBkb24ndCBnZXQgb3ZlcndyaXR0ZW5cblx0XHRcdHZhciBhdHRycyA9IHt9LCBvbmNsaWNrLCBocmVmXG5cdFx0XHRhc3NpZ24oYXR0cnMsIHZub2RlLmF0dHJzKVxuXHRcdFx0Ly8gVGhlIGZpcnN0IHR3byBhcmUgaW50ZXJuYWwsIGJ1dCB0aGUgcmVzdCBhcmUgbWFnaWMgYXR0cmlidXRlc1xuXHRcdFx0Ly8gdGhhdCBuZWVkIGNlbnNvcmVkIHRvIG5vdCBzY3JldyB1cCByZW5kZXJpbmcuXG5cdFx0XHRhdHRycy5zZWxlY3RvciA9IGF0dHJzLm9wdGlvbnMgPSBhdHRycy5rZXkgPSBhdHRycy5vbmluaXQgPVxuXHRcdFx0YXR0cnMub25jcmVhdGUgPSBhdHRycy5vbmJlZm9yZXVwZGF0ZSA9IGF0dHJzLm9udXBkYXRlID1cblx0XHRcdGF0dHJzLm9uYmVmb3JlcmVtb3ZlID0gYXR0cnMub25yZW1vdmUgPSBudWxsXG5cblx0XHRcdC8vIERvIHRoaXMgbm93IHNvIHdlIGNhbiBnZXQgdGhlIG1vc3QgY3VycmVudCBgaHJlZmAgYW5kIGBkaXNhYmxlZGAuXG5cdFx0XHQvLyBUaG9zZSBhdHRyaWJ1dGVzIG1heSBhbHNvIGJlIHNwZWNpZmllZCBpbiB0aGUgc2VsZWN0b3IsIGFuZCB3ZVxuXHRcdFx0Ly8gc2hvdWxkIGhvbm9yIHRoYXQuXG5cdFx0XHR2YXIgY2hpbGQgPSBtKHZub2RlLmF0dHJzLnNlbGVjdG9yIHx8IFwiYVwiLCBhdHRycywgdm5vZGUuY2hpbGRyZW4pXG5cblx0XHRcdC8vIExldCdzIHByb3ZpZGUgYSAqcmlnaHQqIHdheSB0byBkaXNhYmxlIGEgcm91dGUgbGluaywgcmF0aGVyIHRoYW5cblx0XHRcdC8vIGxldHRpbmcgcGVvcGxlIHNjcmV3IHVwIGFjY2Vzc2liaWxpdHkgb24gYWNjaWRlbnQuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gVGhlIGF0dHJpYnV0ZSBpcyBjb2VyY2VkIHNvIHVzZXJzIGRvbid0IGdldCBzdXJwcmlzZWQgb3ZlclxuXHRcdFx0Ly8gYGRpc2FibGVkOiAwYCByZXN1bHRpbmcgaW4gYSBidXR0b24gdGhhdCdzIHNvbWVob3cgcm91dGFibGVcblx0XHRcdC8vIGRlc3BpdGUgYmVpbmcgdmlzaWJseSBkaXNhYmxlZC5cblx0XHRcdGlmIChjaGlsZC5hdHRycy5kaXNhYmxlZCA9IEJvb2xlYW4oY2hpbGQuYXR0cnMuZGlzYWJsZWQpKSB7XG5cdFx0XHRcdGNoaWxkLmF0dHJzLmhyZWYgPSBudWxsXG5cdFx0XHRcdGNoaWxkLmF0dHJzW1wiYXJpYS1kaXNhYmxlZFwiXSA9IFwidHJ1ZVwiXG5cdFx0XHRcdC8vIElmIHlvdSAqcmVhbGx5KiBkbyB3YW50IHRvIGRvIHRoaXMgb24gYSBkaXNhYmxlZCBsaW5rLCB1c2Vcblx0XHRcdFx0Ly8gYW4gYG9uY3JlYXRlYCBob29rIHRvIGFkZCBpdC5cblx0XHRcdFx0Y2hpbGQuYXR0cnMub25jbGljayA9IG51bGxcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9uY2xpY2sgPSBjaGlsZC5hdHRycy5vbmNsaWNrXG5cdFx0XHRcdGhyZWYgPSBjaGlsZC5hdHRycy5ocmVmXG5cdFx0XHRcdGNoaWxkLmF0dHJzLmhyZWYgPSByb3V0ZS5wcmVmaXggKyBocmVmXG5cdFx0XHRcdGNoaWxkLmF0dHJzLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0dmFyIHJlc3VsdFxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygb25jbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBvbmNsaWNrLmNhbGwoZS5jdXJyZW50VGFyZ2V0LCBlKVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAob25jbGljayA9PSBudWxsIHx8IHR5cGVvZiBvbmNsaWNrICE9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdFx0XHQvLyBkbyBub3RoaW5nXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2Ygb25jbGljay5oYW5kbGVFdmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRvbmNsaWNrLmhhbmRsZUV2ZW50KGUpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gQWRhcHRlZCBmcm9tIFJlYWN0IFJvdXRlcidzIGltcGxlbWVudGF0aW9uOlxuXHRcdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9SZWFjdFRyYWluaW5nL3JlYWN0LXJvdXRlci9ibG9iLzUyMGEwYWNkNDhhZTFiMDY2ZWIwYjA3ZDZkNGQxNzkwYTFkMDI0ODIvcGFja2FnZXMvcmVhY3Qtcm91dGVyLWRvbS9tb2R1bGVzL0xpbmsuanNcblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdC8vIFRyeSB0byBiZSBmbGV4aWJsZSBhbmQgaW50dWl0aXZlIGluIGhvdyB3ZSBoYW5kbGUgbGlua3MuXG5cdFx0XHRcdFx0Ly8gRnVuIGZhY3Q6IGxpbmtzIGFyZW4ndCBhcyBvYnZpb3VzIHRvIGdldCByaWdodCBhcyB5b3Vcblx0XHRcdFx0XHQvLyB3b3VsZCBleHBlY3QuIFRoZXJlJ3MgYSBsb3QgbW9yZSB2YWxpZCB3YXlzIHRvIGNsaWNrIGFcblx0XHRcdFx0XHQvLyBsaW5rIHRoYW4gdGhpcywgYW5kIG9uZSBtaWdodCB3YW50IHRvIG5vdCBzaW1wbHkgY2xpY2sgYVxuXHRcdFx0XHRcdC8vIGxpbmssIGJ1dCByaWdodCBjbGljayBvciBjb21tYW5kLWNsaWNrIGl0IHRvIGNvcHkgdGhlXG5cdFx0XHRcdFx0Ly8gbGluayB0YXJnZXQsIGV0Yy4gTm9wZSwgdGhpcyBpc24ndCBqdXN0IGZvciBibGluZCBwZW9wbGUuXG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0Ly8gU2tpcCBpZiBgb25jbGlja2AgcHJldmVudGVkIGRlZmF1bHRcblx0XHRcdFx0XHRcdHJlc3VsdCAhPT0gZmFsc2UgJiYgIWUuZGVmYXVsdFByZXZlbnRlZCAmJlxuXHRcdFx0XHRcdFx0Ly8gSWdub3JlIGV2ZXJ5dGhpbmcgYnV0IGxlZnQgY2xpY2tzXG5cdFx0XHRcdFx0XHQoZS5idXR0b24gPT09IDAgfHwgZS53aGljaCA9PT0gMCB8fCBlLndoaWNoID09PSAxKSAmJlxuXHRcdFx0XHRcdFx0Ly8gTGV0IHRoZSBicm93c2VyIGhhbmRsZSBgdGFyZ2V0PV9ibGFua2AsIGV0Yy5cblx0XHRcdFx0XHRcdCghZS5jdXJyZW50VGFyZ2V0LnRhcmdldCB8fCBlLmN1cnJlbnRUYXJnZXQudGFyZ2V0ID09PSBcIl9zZWxmXCIpICYmXG5cdFx0XHRcdFx0XHQvLyBObyBtb2RpZmllciBrZXlzXG5cdFx0XHRcdFx0XHQhZS5jdHJsS2V5ICYmICFlLm1ldGFLZXkgJiYgIWUuc2hpZnRLZXkgJiYgIWUuYWx0S2V5XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0XHRcdGUucmVkcmF3ID0gZmFsc2Vcblx0XHRcdFx0XHRcdHJvdXRlLnNldChocmVmLCBudWxsLCBvcHRpb25zKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNoaWxkXG5cdFx0fSxcblx0fVxuXHRyb3V0ZS5wYXJhbSA9IGZ1bmN0aW9uKGtleSkge1xuXHRcdHJldHVybiBhdHRycyAmJiBrZXkgIT0gbnVsbCA/IGF0dHJzW2tleV0gOiBhdHRyc1xuXHR9XG5cblx0cmV0dXJuIHJvdXRlXG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgaHlwZXJzY3JpcHQgPSByZXF1aXJlKFwiLi9yZW5kZXIvaHlwZXJzY3JpcHRcIilcblxuaHlwZXJzY3JpcHQudHJ1c3QgPSByZXF1aXJlKFwiLi9yZW5kZXIvdHJ1c3RcIilcbmh5cGVyc2NyaXB0LmZyYWdtZW50ID0gcmVxdWlyZShcIi4vcmVuZGVyL2ZyYWdtZW50XCIpXG5cbm1vZHVsZS5leHBvcnRzID0gaHlwZXJzY3JpcHRcbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBoeXBlcnNjcmlwdCA9IHJlcXVpcmUoXCIuL2h5cGVyc2NyaXB0XCIpXG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoXCIuL3JlcXVlc3RcIilcbnZhciBtb3VudFJlZHJhdyA9IHJlcXVpcmUoXCIuL21vdW50LXJlZHJhd1wiKVxuXG52YXIgbSA9IGZ1bmN0aW9uIG0oKSB7IHJldHVybiBoeXBlcnNjcmlwdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIH1cbm0ubSA9IGh5cGVyc2NyaXB0XG5tLnRydXN0ID0gaHlwZXJzY3JpcHQudHJ1c3Rcbm0uZnJhZ21lbnQgPSBoeXBlcnNjcmlwdC5mcmFnbWVudFxubS5tb3VudCA9IG1vdW50UmVkcmF3Lm1vdW50XG5tLnJvdXRlID0gcmVxdWlyZShcIi4vcm91dGVcIilcbm0ucmVuZGVyID0gcmVxdWlyZShcIi4vcmVuZGVyXCIpXG5tLnJlZHJhdyA9IG1vdW50UmVkcmF3LnJlZHJhd1xubS5yZXF1ZXN0ID0gcmVxdWVzdC5yZXF1ZXN0XG5tLmpzb25wID0gcmVxdWVzdC5qc29ucFxubS5wYXJzZVF1ZXJ5U3RyaW5nID0gcmVxdWlyZShcIi4vcXVlcnlzdHJpbmcvcGFyc2VcIilcbm0uYnVpbGRRdWVyeVN0cmluZyA9IHJlcXVpcmUoXCIuL3F1ZXJ5c3RyaW5nL2J1aWxkXCIpXG5tLnBhcnNlUGF0aG5hbWUgPSByZXF1aXJlKFwiLi9wYXRobmFtZS9wYXJzZVwiKVxubS5idWlsZFBhdGhuYW1lID0gcmVxdWlyZShcIi4vcGF0aG5hbWUvYnVpbGRcIilcbm0udm5vZGUgPSByZXF1aXJlKFwiLi9yZW5kZXIvdm5vZGVcIilcbm0uUHJvbWlzZVBvbHlmaWxsID0gcmVxdWlyZShcIi4vcHJvbWlzZS9wb2x5ZmlsbFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciByZW5kZXIgPSByZXF1aXJlKFwiLi9yZW5kZXJcIilcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9hcGkvbW91bnQtcmVkcmF3XCIpKHJlbmRlciwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLCBjb25zb2xlKVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHRhcmdldCwgc291cmNlKSB7XG5cdGlmKHNvdXJjZSkgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldIH0pXG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgYnVpbGRRdWVyeVN0cmluZyA9IHJlcXVpcmUoXCIuLi9xdWVyeXN0cmluZy9idWlsZFwiKVxudmFyIGFzc2lnbiA9IHJlcXVpcmUoXCIuL2Fzc2lnblwiKVxuXG4vLyBSZXR1cm5zIGBwYXRoYCBmcm9tIGB0ZW1wbGF0ZWAgKyBgcGFyYW1zYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0ZW1wbGF0ZSwgcGFyYW1zKSB7XG5cdGlmICgoLzooW15cXC9cXC4tXSspKFxcLnszfSk/Oi8pLnRlc3QodGVtcGxhdGUpKSB7XG5cdFx0dGhyb3cgbmV3IFN5bnRheEVycm9yKFwiVGVtcGxhdGUgcGFyYW1ldGVyIG5hbWVzICptdXN0KiBiZSBzZXBhcmF0ZWRcIilcblx0fVxuXHRpZiAocGFyYW1zID09IG51bGwpIHJldHVybiB0ZW1wbGF0ZVxuXHR2YXIgcXVlcnlJbmRleCA9IHRlbXBsYXRlLmluZGV4T2YoXCI/XCIpXG5cdHZhciBoYXNoSW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKFwiI1wiKVxuXHR2YXIgcXVlcnlFbmQgPSBoYXNoSW5kZXggPCAwID8gdGVtcGxhdGUubGVuZ3RoIDogaGFzaEluZGV4XG5cdHZhciBwYXRoRW5kID0gcXVlcnlJbmRleCA8IDAgPyBxdWVyeUVuZCA6IHF1ZXJ5SW5kZXhcblx0dmFyIHBhdGggPSB0ZW1wbGF0ZS5zbGljZSgwLCBwYXRoRW5kKVxuXHR2YXIgcXVlcnkgPSB7fVxuXG5cdGFzc2lnbihxdWVyeSwgcGFyYW1zKVxuXG5cdHZhciByZXNvbHZlZCA9IHBhdGgucmVwbGFjZSgvOihbXlxcL1xcLi1dKykoXFwuezN9KT8vZywgZnVuY3Rpb24obSwga2V5LCB2YXJpYWRpYykge1xuXHRcdGRlbGV0ZSBxdWVyeVtrZXldXG5cdFx0Ly8gSWYgbm8gc3VjaCBwYXJhbWV0ZXIgZXhpc3RzLCBkb24ndCBpbnRlcnBvbGF0ZSBpdC5cblx0XHRpZiAocGFyYW1zW2tleV0gPT0gbnVsbCkgcmV0dXJuIG1cblx0XHQvLyBFc2NhcGUgbm9ybWFsIHBhcmFtZXRlcnMsIGJ1dCBub3QgdmFyaWFkaWMgb25lcy5cblx0XHRyZXR1cm4gdmFyaWFkaWMgPyBwYXJhbXNba2V5XSA6IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcocGFyYW1zW2tleV0pKVxuXHR9KVxuXG5cdC8vIEluIGNhc2UgdGhlIHRlbXBsYXRlIHN1YnN0aXR1dGlvbiBhZGRzIG5ldyBxdWVyeS9oYXNoIHBhcmFtZXRlcnMuXG5cdHZhciBuZXdRdWVyeUluZGV4ID0gcmVzb2x2ZWQuaW5kZXhPZihcIj9cIilcblx0dmFyIG5ld0hhc2hJbmRleCA9IHJlc29sdmVkLmluZGV4T2YoXCIjXCIpXG5cdHZhciBuZXdRdWVyeUVuZCA9IG5ld0hhc2hJbmRleCA8IDAgPyByZXNvbHZlZC5sZW5ndGggOiBuZXdIYXNoSW5kZXhcblx0dmFyIG5ld1BhdGhFbmQgPSBuZXdRdWVyeUluZGV4IDwgMCA/IG5ld1F1ZXJ5RW5kIDogbmV3UXVlcnlJbmRleFxuXHR2YXIgcmVzdWx0ID0gcmVzb2x2ZWQuc2xpY2UoMCwgbmV3UGF0aEVuZClcblxuXHRpZiAocXVlcnlJbmRleCA+PSAwKSByZXN1bHQgKz0gdGVtcGxhdGUuc2xpY2UocXVlcnlJbmRleCwgcXVlcnlFbmQpXG5cdGlmIChuZXdRdWVyeUluZGV4ID49IDApIHJlc3VsdCArPSAocXVlcnlJbmRleCA8IDAgPyBcIj9cIiA6IFwiJlwiKSArIHJlc29sdmVkLnNsaWNlKG5ld1F1ZXJ5SW5kZXgsIG5ld1F1ZXJ5RW5kKVxuXHR2YXIgcXVlcnlzdHJpbmcgPSBidWlsZFF1ZXJ5U3RyaW5nKHF1ZXJ5KVxuXHRpZiAocXVlcnlzdHJpbmcpIHJlc3VsdCArPSAocXVlcnlJbmRleCA8IDAgJiYgbmV3UXVlcnlJbmRleCA8IDAgPyBcIj9cIiA6IFwiJlwiKSArIHF1ZXJ5c3RyaW5nXG5cdGlmIChoYXNoSW5kZXggPj0gMCkgcmVzdWx0ICs9IHRlbXBsYXRlLnNsaWNlKGhhc2hJbmRleClcblx0aWYgKG5ld0hhc2hJbmRleCA+PSAwKSByZXN1bHQgKz0gKGhhc2hJbmRleCA8IDAgPyBcIlwiIDogXCImXCIpICsgcmVzb2x2ZWQuc2xpY2UobmV3SGFzaEluZGV4KVxuXHRyZXR1cm4gcmVzdWx0XG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgcGFyc2VQYXRobmFtZSA9IHJlcXVpcmUoXCIuL3BhcnNlXCIpXG5cbi8vIENvbXBpbGVzIGEgdGVtcGxhdGUgaW50byBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSByZXNvbHZlZCBwYXRoICh3aXRob3V0IHF1ZXJ5XG4vLyBzdHJpbmdzKSBhbmQgcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgdGVtcGxhdGUgcGFyYW1ldGVycyB3aXRoIHRoZWlyXG4vLyBwYXJzZWQgdmFsdWVzLiBUaGlzIGV4cGVjdHMgdGhlIGlucHV0IG9mIHRoZSBjb21waWxlZCB0ZW1wbGF0ZSB0byBiZSB0aGVcbi8vIG91dHB1dCBvZiBgcGFyc2VQYXRobmFtZWAuIE5vdGUgdGhhdCBpdCBkb2VzICpub3QqIHJlbW92ZSBxdWVyeSBwYXJhbWV0ZXJzXG4vLyBzcGVjaWZpZWQgaW4gdGhlIHRlbXBsYXRlLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuXHR2YXIgdGVtcGxhdGVEYXRhID0gcGFyc2VQYXRobmFtZSh0ZW1wbGF0ZSlcblx0dmFyIHRlbXBsYXRlS2V5cyA9IE9iamVjdC5rZXlzKHRlbXBsYXRlRGF0YS5wYXJhbXMpXG5cdHZhciBrZXlzID0gW11cblx0dmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoXCJeXCIgKyB0ZW1wbGF0ZURhdGEucGF0aC5yZXBsYWNlKFxuXHRcdC8vIEkgZXNjYXBlIGxpdGVyYWwgdGV4dCBzbyBwZW9wbGUgY2FuIHVzZSB0aGluZ3MgbGlrZSBgOmZpbGUuOmV4dGAgb3Jcblx0XHQvLyBgOmxhbmctOmxvY2FsZWAgaW4gcm91dGVzLiBUaGlzIGlzIGFsbCBtZXJnZWQgaW50byBvbmUgcGFzcyBzbyBJXG5cdFx0Ly8gZG9uJ3QgYWxzbyBhY2NpZGVudGFsbHkgZXNjYXBlIGAtYCBhbmQgbWFrZSBpdCBoYXJkZXIgdG8gZGV0ZWN0IGl0IHRvXG5cdFx0Ly8gYmFuIGl0IGZyb20gdGVtcGxhdGUgcGFyYW1ldGVycy5cblx0XHQvOihbXlxcLy4tXSspKFxcLnszfXxcXC4oPyFcXC4pfC0pP3xbXFxcXF4kKisuKCl8XFxbXFxde31dL2csXG5cdFx0ZnVuY3Rpb24obSwga2V5LCBleHRyYSkge1xuXHRcdFx0aWYgKGtleSA9PSBudWxsKSByZXR1cm4gXCJcXFxcXCIgKyBtXG5cdFx0XHRrZXlzLnB1c2goe2s6IGtleSwgcjogZXh0cmEgPT09IFwiLi4uXCJ9KVxuXHRcdFx0aWYgKGV4dHJhID09PSBcIi4uLlwiKSByZXR1cm4gXCIoLiopXCJcblx0XHRcdGlmIChleHRyYSA9PT0gXCIuXCIpIHJldHVybiBcIihbXi9dKylcXFxcLlwiXG5cdFx0XHRyZXR1cm4gXCIoW14vXSspXCIgKyAoZXh0cmEgfHwgXCJcIilcblx0XHR9XG5cdCkgKyBcIiRcIilcblx0cmV0dXJuIGZ1bmN0aW9uKGRhdGEpIHtcblx0XHQvLyBGaXJzdCwgY2hlY2sgdGhlIHBhcmFtcy4gVXN1YWxseSwgdGhlcmUgaXNuJ3QgYW55LCBhbmQgaXQncyBqdXN0XG5cdFx0Ly8gY2hlY2tpbmcgYSBzdGF0aWMgc2V0LlxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcGxhdGVLZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGVtcGxhdGVEYXRhLnBhcmFtc1t0ZW1wbGF0ZUtleXNbaV1dICE9PSBkYXRhLnBhcmFtc1t0ZW1wbGF0ZUtleXNbaV1dKSByZXR1cm4gZmFsc2Vcblx0XHR9XG5cdFx0Ly8gSWYgbm8gaW50ZXJwb2xhdGlvbnMgZXhpc3QsIGxldCdzIHNraXAgYWxsIHRoZSBjZXJlbW9ueVxuXHRcdGlmICgha2V5cy5sZW5ndGgpIHJldHVybiByZWdleHAudGVzdChkYXRhLnBhdGgpXG5cdFx0dmFyIHZhbHVlcyA9IHJlZ2V4cC5leGVjKGRhdGEucGF0aClcblx0XHRpZiAodmFsdWVzID09IG51bGwpIHJldHVybiBmYWxzZVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0ZGF0YS5wYXJhbXNba2V5c1tpXS5rXSA9IGtleXNbaV0uciA/IHZhbHVlc1tpICsgMV0gOiBkZWNvZGVVUklDb21wb25lbnQodmFsdWVzW2kgKyAxXSlcblx0XHR9XG5cdFx0cmV0dXJuIHRydWVcblx0fVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIHBhcnNlUXVlcnlTdHJpbmcgPSByZXF1aXJlKFwiLi4vcXVlcnlzdHJpbmcvcGFyc2VcIilcblxuLy8gUmV0dXJucyBge3BhdGgsIHBhcmFtc31gIGZyb20gYHVybGBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXJsKSB7XG5cdHZhciBxdWVyeUluZGV4ID0gdXJsLmluZGV4T2YoXCI/XCIpXG5cdHZhciBoYXNoSW5kZXggPSB1cmwuaW5kZXhPZihcIiNcIilcblx0dmFyIHF1ZXJ5RW5kID0gaGFzaEluZGV4IDwgMCA/IHVybC5sZW5ndGggOiBoYXNoSW5kZXhcblx0dmFyIHBhdGhFbmQgPSBxdWVyeUluZGV4IDwgMCA/IHF1ZXJ5RW5kIDogcXVlcnlJbmRleFxuXHR2YXIgcGF0aCA9IHVybC5zbGljZSgwLCBwYXRoRW5kKS5yZXBsYWNlKC9cXC97Mix9L2csIFwiL1wiKVxuXG5cdGlmICghcGF0aCkgcGF0aCA9IFwiL1wiXG5cdGVsc2Uge1xuXHRcdGlmIChwYXRoWzBdICE9PSBcIi9cIikgcGF0aCA9IFwiL1wiICsgcGF0aFxuXHRcdGlmIChwYXRoLmxlbmd0aCA+IDEgJiYgcGF0aFtwYXRoLmxlbmd0aCAtIDFdID09PSBcIi9cIikgcGF0aCA9IHBhdGguc2xpY2UoMCwgLTEpXG5cdH1cblx0cmV0dXJuIHtcblx0XHRwYXRoOiBwYXRoLFxuXHRcdHBhcmFtczogcXVlcnlJbmRleCA8IDBcblx0XHRcdD8ge31cblx0XHRcdDogcGFyc2VRdWVyeVN0cmluZyh1cmwuc2xpY2UocXVlcnlJbmRleCArIDEsIHF1ZXJ5RW5kKSksXG5cdH1cbn1cbiIsIlwidXNlIHN0cmljdFwiXG4vKiogQGNvbnN0cnVjdG9yICovXG52YXIgUHJvbWlzZVBvbHlmaWxsID0gZnVuY3Rpb24oZXhlY3V0b3IpIHtcblx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2VQb2x5ZmlsbCkpIHRocm93IG5ldyBFcnJvcihcIlByb21pc2UgbXVzdCBiZSBjYWxsZWQgd2l0aCBgbmV3YFwiKVxuXHRpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb25cIilcblxuXHR2YXIgc2VsZiA9IHRoaXMsIHJlc29sdmVycyA9IFtdLCByZWplY3RvcnMgPSBbXSwgcmVzb2x2ZUN1cnJlbnQgPSBoYW5kbGVyKHJlc29sdmVycywgdHJ1ZSksIHJlamVjdEN1cnJlbnQgPSBoYW5kbGVyKHJlamVjdG9ycywgZmFsc2UpXG5cdHZhciBpbnN0YW5jZSA9IHNlbGYuX2luc3RhbmNlID0ge3Jlc29sdmVyczogcmVzb2x2ZXJzLCByZWplY3RvcnM6IHJlamVjdG9yc31cblx0dmFyIGNhbGxBc3luYyA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHNldEltbWVkaWF0ZSA6IHNldFRpbWVvdXRcblx0ZnVuY3Rpb24gaGFuZGxlcihsaXN0LCBzaG91bGRBYnNvcmIpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gZXhlY3V0ZSh2YWx1ZSkge1xuXHRcdFx0dmFyIHRoZW5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmIChzaG91bGRBYnNvcmIgJiYgdmFsdWUgIT0gbnVsbCAmJiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSAmJiB0eXBlb2YgKHRoZW4gPSB2YWx1ZS50aGVuKSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlID09PSBzZWxmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCB3LyBpdHNlbGZcIilcblx0XHRcdFx0XHRleGVjdXRlT25jZSh0aGVuLmJpbmQodmFsdWUpKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNhbGxBc3luYyhmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmICghc2hvdWxkQWJzb3JiICYmIGxpc3QubGVuZ3RoID09PSAwKSBjb25zb2xlLmVycm9yKFwiUG9zc2libGUgdW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uOlwiLCB2YWx1ZSlcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykgbGlzdFtpXSh2YWx1ZSlcblx0XHRcdFx0XHRcdHJlc29sdmVycy5sZW5ndGggPSAwLCByZWplY3RvcnMubGVuZ3RoID0gMFxuXHRcdFx0XHRcdFx0aW5zdGFuY2Uuc3RhdGUgPSBzaG91bGRBYnNvcmJcblx0XHRcdFx0XHRcdGluc3RhbmNlLnJldHJ5ID0gZnVuY3Rpb24oKSB7ZXhlY3V0ZSh2YWx1ZSl9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpIHtcblx0XHRcdFx0cmVqZWN0Q3VycmVudChlKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBleGVjdXRlT25jZSh0aGVuKSB7XG5cdFx0dmFyIHJ1bnMgPSAwXG5cdFx0ZnVuY3Rpb24gcnVuKGZuKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0aWYgKHJ1bnMrKyA+IDApIHJldHVyblxuXHRcdFx0XHRmbih2YWx1ZSlcblx0XHRcdH1cblx0XHR9XG5cdFx0dmFyIG9uZXJyb3IgPSBydW4ocmVqZWN0Q3VycmVudClcblx0XHR0cnkge3RoZW4ocnVuKHJlc29sdmVDdXJyZW50KSwgb25lcnJvcil9IGNhdGNoIChlKSB7b25lcnJvcihlKX1cblx0fVxuXG5cdGV4ZWN1dGVPbmNlKGV4ZWN1dG9yKVxufVxuUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24ob25GdWxmaWxsZWQsIG9uUmVqZWN0aW9uKSB7XG5cdHZhciBzZWxmID0gdGhpcywgaW5zdGFuY2UgPSBzZWxmLl9pbnN0YW5jZVxuXHRmdW5jdGlvbiBoYW5kbGUoY2FsbGJhY2ssIGxpc3QsIG5leHQsIHN0YXRlKSB7XG5cdFx0bGlzdC5wdXNoKGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIG5leHQodmFsdWUpXG5cdFx0XHRlbHNlIHRyeSB7cmVzb2x2ZU5leHQoY2FsbGJhY2sodmFsdWUpKX0gY2F0Y2ggKGUpIHtpZiAocmVqZWN0TmV4dCkgcmVqZWN0TmV4dChlKX1cblx0XHR9KVxuXHRcdGlmICh0eXBlb2YgaW5zdGFuY2UucmV0cnkgPT09IFwiZnVuY3Rpb25cIiAmJiBzdGF0ZSA9PT0gaW5zdGFuY2Uuc3RhdGUpIGluc3RhbmNlLnJldHJ5KClcblx0fVxuXHR2YXIgcmVzb2x2ZU5leHQsIHJlamVjdE5leHRcblx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge3Jlc29sdmVOZXh0ID0gcmVzb2x2ZSwgcmVqZWN0TmV4dCA9IHJlamVjdH0pXG5cdGhhbmRsZShvbkZ1bGZpbGxlZCwgaW5zdGFuY2UucmVzb2x2ZXJzLCByZXNvbHZlTmV4dCwgdHJ1ZSksIGhhbmRsZShvblJlamVjdGlvbiwgaW5zdGFuY2UucmVqZWN0b3JzLCByZWplY3ROZXh0LCBmYWxzZSlcblx0cmV0dXJuIHByb21pc2Vcbn1cblByb21pc2VQb2x5ZmlsbC5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbihvblJlamVjdGlvbikge1xuXHRyZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKVxufVxuUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS5maW5hbGx5ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0cmV0dXJuIHRoaXMudGhlbihcblx0XHRmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIFByb21pc2VQb2x5ZmlsbC5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdFx0fSlcblx0XHR9LFxuXHRcdGZ1bmN0aW9uKHJlYXNvbikge1xuXHRcdFx0cmV0dXJuIFByb21pc2VQb2x5ZmlsbC5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBQcm9taXNlUG9seWZpbGwucmVqZWN0KHJlYXNvbik7XG5cdFx0XHR9KVxuXHRcdH1cblx0KVxufVxuUHJvbWlzZVBvbHlmaWxsLnJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRpZiAodmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlUG9seWZpbGwpIHJldHVybiB2YWx1ZVxuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlKSB7cmVzb2x2ZSh2YWx1ZSl9KVxufVxuUHJvbWlzZVBvbHlmaWxsLnJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge3JlamVjdCh2YWx1ZSl9KVxufVxuUHJvbWlzZVBvbHlmaWxsLmFsbCA9IGZ1bmN0aW9uKGxpc3QpIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dmFyIHRvdGFsID0gbGlzdC5sZW5ndGgsIGNvdW50ID0gMCwgdmFsdWVzID0gW11cblx0XHRpZiAobGlzdC5sZW5ndGggPT09IDApIHJlc29sdmUoW10pXG5cdFx0ZWxzZSBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdChmdW5jdGlvbihpKSB7XG5cdFx0XHRcdGZ1bmN0aW9uIGNvbnN1bWUodmFsdWUpIHtcblx0XHRcdFx0XHRjb3VudCsrXG5cdFx0XHRcdFx0dmFsdWVzW2ldID0gdmFsdWVcblx0XHRcdFx0XHRpZiAoY291bnQgPT09IHRvdGFsKSByZXNvbHZlKHZhbHVlcylcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobGlzdFtpXSAhPSBudWxsICYmICh0eXBlb2YgbGlzdFtpXSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbGlzdFtpXSA9PT0gXCJmdW5jdGlvblwiKSAmJiB0eXBlb2YgbGlzdFtpXS50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRsaXN0W2ldLnRoZW4oY29uc3VtZSwgcmVqZWN0KVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgY29uc3VtZShsaXN0W2ldKVxuXHRcdFx0fSkoaSlcblx0XHR9XG5cdH0pXG59XG5Qcm9taXNlUG9seWZpbGwucmFjZSA9IGZ1bmN0aW9uKGxpc3QpIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsaXN0W2ldLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KVxuXHRcdH1cblx0fSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlUG9seWZpbGxcbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBQcm9taXNlUG9seWZpbGwgPSByZXF1aXJlKFwiLi9wb2x5ZmlsbFwiKVxuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRpZiAodHlwZW9mIHdpbmRvdy5Qcm9taXNlID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0d2luZG93LlByb21pc2UgPSBQcm9taXNlUG9seWZpbGxcblx0fSBlbHNlIGlmICghd2luZG93LlByb21pc2UucHJvdG90eXBlLmZpbmFsbHkpIHtcblx0XHR3aW5kb3cuUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSA9IFByb21pc2VQb2x5ZmlsbC5wcm90b3R5cGUuZmluYWxseVxuXHR9XG5cdG1vZHVsZS5leHBvcnRzID0gd2luZG93LlByb21pc2Vcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRpZiAodHlwZW9mIGdsb2JhbC5Qcm9taXNlID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0Z2xvYmFsLlByb21pc2UgPSBQcm9taXNlUG9seWZpbGxcblx0fSBlbHNlIGlmICghZ2xvYmFsLlByb21pc2UucHJvdG90eXBlLmZpbmFsbHkpIHtcblx0XHRnbG9iYWwuUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseSA9IFByb21pc2VQb2x5ZmlsbC5wcm90b3R5cGUuZmluYWxseVxuXHR9XG5cdG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLlByb21pc2Vcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzID0gUHJvbWlzZVBvbHlmaWxsXG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgIT09IFwiW29iamVjdCBPYmplY3RdXCIpIHJldHVybiBcIlwiXG5cblx0dmFyIGFyZ3MgPSBbXVxuXHRmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG5cdFx0ZGVzdHJ1Y3R1cmUoa2V5LCBvYmplY3Rba2V5XSlcblx0fVxuXG5cdHJldHVybiBhcmdzLmpvaW4oXCImXCIpXG5cblx0ZnVuY3Rpb24gZGVzdHJ1Y3R1cmUoa2V5LCB2YWx1ZSkge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRkZXN0cnVjdHVyZShrZXkgKyBcIltcIiArIGkgKyBcIl1cIiwgdmFsdWVbaV0pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBPYmplY3RdXCIpIHtcblx0XHRcdGZvciAodmFyIGkgaW4gdmFsdWUpIHtcblx0XHRcdFx0ZGVzdHJ1Y3R1cmUoa2V5ICsgXCJbXCIgKyBpICsgXCJdXCIsIHZhbHVlW2ldKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGFyZ3MucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBcIlwiID8gXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpIDogXCJcIikpXG5cdH1cbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RyaW5nKSB7XG5cdGlmIChzdHJpbmcgPT09IFwiXCIgfHwgc3RyaW5nID09IG51bGwpIHJldHVybiB7fVxuXHRpZiAoc3RyaW5nLmNoYXJBdCgwKSA9PT0gXCI/XCIpIHN0cmluZyA9IHN0cmluZy5zbGljZSgxKVxuXG5cdHZhciBlbnRyaWVzID0gc3RyaW5nLnNwbGl0KFwiJlwiKSwgY291bnRlcnMgPSB7fSwgZGF0YSA9IHt9XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBlbnRyeSA9IGVudHJpZXNbaV0uc3BsaXQoXCI9XCIpXG5cdFx0dmFyIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChlbnRyeVswXSlcblx0XHR2YXIgdmFsdWUgPSBlbnRyeS5sZW5ndGggPT09IDIgPyBkZWNvZGVVUklDb21wb25lbnQoZW50cnlbMV0pIDogXCJcIlxuXG5cdFx0aWYgKHZhbHVlID09PSBcInRydWVcIikgdmFsdWUgPSB0cnVlXG5cdFx0ZWxzZSBpZiAodmFsdWUgPT09IFwiZmFsc2VcIikgdmFsdWUgPSBmYWxzZVxuXG5cdFx0dmFyIGxldmVscyA9IGtleS5zcGxpdCgvXFxdXFxbP3xcXFsvKVxuXHRcdHZhciBjdXJzb3IgPSBkYXRhXG5cdFx0aWYgKGtleS5pbmRleE9mKFwiW1wiKSA+IC0xKSBsZXZlbHMucG9wKClcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGxldmVscy5sZW5ndGg7IGorKykge1xuXHRcdFx0dmFyIGxldmVsID0gbGV2ZWxzW2pdLCBuZXh0TGV2ZWwgPSBsZXZlbHNbaiArIDFdXG5cdFx0XHR2YXIgaXNOdW1iZXIgPSBuZXh0TGV2ZWwgPT0gXCJcIiB8fCAhaXNOYU4ocGFyc2VJbnQobmV4dExldmVsLCAxMCkpXG5cdFx0XHRpZiAobGV2ZWwgPT09IFwiXCIpIHtcblx0XHRcdFx0dmFyIGtleSA9IGxldmVscy5zbGljZSgwLCBqKS5qb2luKClcblx0XHRcdFx0aWYgKGNvdW50ZXJzW2tleV0gPT0gbnVsbCkge1xuXHRcdFx0XHRcdGNvdW50ZXJzW2tleV0gPSBBcnJheS5pc0FycmF5KGN1cnNvcikgPyBjdXJzb3IubGVuZ3RoIDogMFxuXHRcdFx0XHR9XG5cdFx0XHRcdGxldmVsID0gY291bnRlcnNba2V5XSsrXG5cdFx0XHR9XG5cdFx0XHQvLyBEaXNhbGxvdyBkaXJlY3QgcHJvdG90eXBlIHBvbGx1dGlvblxuXHRcdFx0ZWxzZSBpZiAobGV2ZWwgPT09IFwiX19wcm90b19fXCIpIGJyZWFrXG5cdFx0XHRpZiAoaiA9PT0gbGV2ZWxzLmxlbmd0aCAtIDEpIGN1cnNvcltsZXZlbF0gPSB2YWx1ZVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdC8vIFJlYWQgb3duIHByb3BlcnRpZXMgZXhjbHVzaXZlbHkgdG8gZGlzYWxsb3cgaW5kaXJlY3Rcblx0XHRcdFx0Ly8gcHJvdG90eXBlIHBvbGx1dGlvblxuXHRcdFx0XHR2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3Vyc29yLCBsZXZlbClcblx0XHRcdFx0aWYgKGRlc2MgIT0gbnVsbCkgZGVzYyA9IGRlc2MudmFsdWVcblx0XHRcdFx0aWYgKGRlc2MgPT0gbnVsbCkgY3Vyc29yW2xldmVsXSA9IGRlc2MgPSBpc051bWJlciA/IFtdIDoge31cblx0XHRcdFx0Y3Vyc29yID0gZGVzY1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZGF0YVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9yZW5kZXIvcmVuZGVyXCIpKHdpbmRvdylcbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcbnZhciBoeXBlcnNjcmlwdFZub2RlID0gcmVxdWlyZShcIi4vaHlwZXJzY3JpcHRWbm9kZVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdm5vZGUgPSBoeXBlcnNjcmlwdFZub2RlLmFwcGx5KDAsIGFyZ3VtZW50cylcblxuXHR2bm9kZS50YWcgPSBcIltcIlxuXHR2bm9kZS5jaGlsZHJlbiA9IFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKHZub2RlLmNoaWxkcmVuKVxuXHRyZXR1cm4gdm5vZGVcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcbnZhciBoeXBlcnNjcmlwdFZub2RlID0gcmVxdWlyZShcIi4vaHlwZXJzY3JpcHRWbm9kZVwiKVxuXG52YXIgc2VsZWN0b3JQYXJzZXIgPSAvKD86KF58I3xcXC4pKFteI1xcLlxcW1xcXV0rKSl8KFxcWyguKz8pKD86XFxzKj1cXHMqKFwifCd8KSgoPzpcXFxcW1wiJ1xcXV18LikqPylcXDUpP1xcXSkvZ1xudmFyIHNlbGVjdG9yQ2FjaGUgPSB7fVxudmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5XG5cbmZ1bmN0aW9uIGlzRW1wdHkob2JqZWN0KSB7XG5cdGZvciAodmFyIGtleSBpbiBvYmplY3QpIGlmIChoYXNPd24uY2FsbChvYmplY3QsIGtleSkpIHJldHVybiBmYWxzZVxuXHRyZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBjb21waWxlU2VsZWN0b3Ioc2VsZWN0b3IpIHtcblx0dmFyIG1hdGNoLCB0YWcgPSBcImRpdlwiLCBjbGFzc2VzID0gW10sIGF0dHJzID0ge31cblx0d2hpbGUgKG1hdGNoID0gc2VsZWN0b3JQYXJzZXIuZXhlYyhzZWxlY3RvcikpIHtcblx0XHR2YXIgdHlwZSA9IG1hdGNoWzFdLCB2YWx1ZSA9IG1hdGNoWzJdXG5cdFx0aWYgKHR5cGUgPT09IFwiXCIgJiYgdmFsdWUgIT09IFwiXCIpIHRhZyA9IHZhbHVlXG5cdFx0ZWxzZSBpZiAodHlwZSA9PT0gXCIjXCIpIGF0dHJzLmlkID0gdmFsdWVcblx0XHRlbHNlIGlmICh0eXBlID09PSBcIi5cIikgY2xhc3Nlcy5wdXNoKHZhbHVlKVxuXHRcdGVsc2UgaWYgKG1hdGNoWzNdWzBdID09PSBcIltcIikge1xuXHRcdFx0dmFyIGF0dHJWYWx1ZSA9IG1hdGNoWzZdXG5cdFx0XHRpZiAoYXR0clZhbHVlKSBhdHRyVmFsdWUgPSBhdHRyVmFsdWUucmVwbGFjZSgvXFxcXChbXCInXSkvZywgXCIkMVwiKS5yZXBsYWNlKC9cXFxcXFxcXC9nLCBcIlxcXFxcIilcblx0XHRcdGlmIChtYXRjaFs0XSA9PT0gXCJjbGFzc1wiKSBjbGFzc2VzLnB1c2goYXR0clZhbHVlKVxuXHRcdFx0ZWxzZSBhdHRyc1ttYXRjaFs0XV0gPSBhdHRyVmFsdWUgPT09IFwiXCIgPyBhdHRyVmFsdWUgOiBhdHRyVmFsdWUgfHwgdHJ1ZVxuXHRcdH1cblx0fVxuXHRpZiAoY2xhc3Nlcy5sZW5ndGggPiAwKSBhdHRycy5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oXCIgXCIpXG5cdHJldHVybiBzZWxlY3RvckNhY2hlW3NlbGVjdG9yXSA9IHt0YWc6IHRhZywgYXR0cnM6IGF0dHJzfVxufVxuXG5mdW5jdGlvbiBleGVjU2VsZWN0b3Ioc3RhdGUsIHZub2RlKSB7XG5cdHZhciBhdHRycyA9IHZub2RlLmF0dHJzXG5cdHZhciBjaGlsZHJlbiA9IFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKHZub2RlLmNoaWxkcmVuKVxuXHR2YXIgaGFzQ2xhc3MgPSBoYXNPd24uY2FsbChhdHRycywgXCJjbGFzc1wiKVxuXHR2YXIgY2xhc3NOYW1lID0gaGFzQ2xhc3MgPyBhdHRycy5jbGFzcyA6IGF0dHJzLmNsYXNzTmFtZVxuXG5cdHZub2RlLnRhZyA9IHN0YXRlLnRhZ1xuXHR2bm9kZS5hdHRycyA9IG51bGxcblx0dm5vZGUuY2hpbGRyZW4gPSB1bmRlZmluZWRcblxuXHRpZiAoIWlzRW1wdHkoc3RhdGUuYXR0cnMpICYmICFpc0VtcHR5KGF0dHJzKSkge1xuXHRcdHZhciBuZXdBdHRycyA9IHt9XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gYXR0cnMpIHtcblx0XHRcdGlmIChoYXNPd24uY2FsbChhdHRycywga2V5KSkgbmV3QXR0cnNba2V5XSA9IGF0dHJzW2tleV1cblx0XHR9XG5cblx0XHRhdHRycyA9IG5ld0F0dHJzXG5cdH1cblxuXHRmb3IgKHZhciBrZXkgaW4gc3RhdGUuYXR0cnMpIHtcblx0XHRpZiAoaGFzT3duLmNhbGwoc3RhdGUuYXR0cnMsIGtleSkgJiYga2V5ICE9PSBcImNsYXNzTmFtZVwiICYmICFoYXNPd24uY2FsbChhdHRycywga2V5KSl7XG5cdFx0XHRhdHRyc1trZXldID0gc3RhdGUuYXR0cnNba2V5XVxuXHRcdH1cblx0fVxuXHRpZiAoY2xhc3NOYW1lICE9IG51bGwgfHwgc3RhdGUuYXR0cnMuY2xhc3NOYW1lICE9IG51bGwpIGF0dHJzLmNsYXNzTmFtZSA9XG5cdFx0Y2xhc3NOYW1lICE9IG51bGxcblx0XHRcdD8gc3RhdGUuYXR0cnMuY2xhc3NOYW1lICE9IG51bGxcblx0XHRcdFx0PyBTdHJpbmcoc3RhdGUuYXR0cnMuY2xhc3NOYW1lKSArIFwiIFwiICsgU3RyaW5nKGNsYXNzTmFtZSlcblx0XHRcdFx0OiBjbGFzc05hbWVcblx0XHRcdDogc3RhdGUuYXR0cnMuY2xhc3NOYW1lICE9IG51bGxcblx0XHRcdFx0PyBzdGF0ZS5hdHRycy5jbGFzc05hbWVcblx0XHRcdFx0OiBudWxsXG5cblx0aWYgKGhhc0NsYXNzKSBhdHRycy5jbGFzcyA9IG51bGxcblxuXHRmb3IgKHZhciBrZXkgaW4gYXR0cnMpIHtcblx0XHRpZiAoaGFzT3duLmNhbGwoYXR0cnMsIGtleSkgJiYga2V5ICE9PSBcImtleVwiKSB7XG5cdFx0XHR2bm9kZS5hdHRycyA9IGF0dHJzXG5cdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSAmJiBjaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgY2hpbGRyZW5bMF0gIT0gbnVsbCAmJiBjaGlsZHJlblswXS50YWcgPT09IFwiI1wiKSB7XG5cdFx0dm5vZGUudGV4dCA9IGNoaWxkcmVuWzBdLmNoaWxkcmVuXG5cdH0gZWxzZSB7XG5cdFx0dm5vZGUuY2hpbGRyZW4gPSBjaGlsZHJlblxuXHR9XG5cblx0cmV0dXJuIHZub2RlXG59XG5cbmZ1bmN0aW9uIGh5cGVyc2NyaXB0KHNlbGVjdG9yKSB7XG5cdGlmIChzZWxlY3RvciA9PSBudWxsIHx8IHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Ygc2VsZWN0b3IgIT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2Ygc2VsZWN0b3IudmlldyAhPT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0dGhyb3cgRXJyb3IoXCJUaGUgc2VsZWN0b3IgbXVzdCBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYSBjb21wb25lbnQuXCIpO1xuXHR9XG5cblx0dmFyIHZub2RlID0gaHlwZXJzY3JpcHRWbm9kZS5hcHBseSgxLCBhcmd1bWVudHMpXG5cblx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHZub2RlLmNoaWxkcmVuID0gVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4odm5vZGUuY2hpbGRyZW4pXG5cdFx0aWYgKHNlbGVjdG9yICE9PSBcIltcIikgcmV0dXJuIGV4ZWNTZWxlY3RvcihzZWxlY3RvckNhY2hlW3NlbGVjdG9yXSB8fCBjb21waWxlU2VsZWN0b3Ioc2VsZWN0b3IpLCB2bm9kZSlcblx0fVxuXG5cdHZub2RlLnRhZyA9IHNlbGVjdG9yXG5cdHJldHVybiB2bm9kZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGh5cGVyc2NyaXB0XG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG5cbi8vIENhbGwgdmlhIGBoeXBlcnNjcmlwdFZub2RlLmFwcGx5KHN0YXJ0T2Zmc2V0LCBhcmd1bWVudHMpYFxuLy9cbi8vIFRoZSByZWFzb24gSSBkbyBpdCB0aGlzIHdheSwgZm9yd2FyZGluZyB0aGUgYXJndW1lbnRzIGFuZCBwYXNzaW5nIHRoZSBzdGFydFxuLy8gb2Zmc2V0IGluIGB0aGlzYCwgaXMgc28gSSBkb24ndCBoYXZlIHRvIGNyZWF0ZSBhIHRlbXBvcmFyeSBhcnJheSBpbiBhXG4vLyBwZXJmb3JtYW5jZS1jcml0aWNhbCBwYXRoLlxuLy9cbi8vIEluIG5hdGl2ZSBFUzYsIEknZCBpbnN0ZWFkIGFkZCBhIGZpbmFsIGAuLi5hcmdzYCBwYXJhbWV0ZXIgdG8gdGhlXG4vLyBgaHlwZXJzY3JpcHRgIGFuZCBgZnJhZ21lbnRgIGZhY3RvcmllcyBhbmQgZGVmaW5lIHRoaXMgYXNcbi8vIGBoeXBlcnNjcmlwdFZub2RlKC4uLmFyZ3MpYCwgc2luY2UgbW9kZXJuIGVuZ2luZXMgZG8gb3B0aW1pemUgdGhhdCBhd2F5LiBCdXRcbi8vIEVTNSAod2hhdCBNaXRocmlsIHJlcXVpcmVzIHRoYW5rcyB0byBJRSBzdXBwb3J0KSBkb2Vzbid0IGdpdmUgbWUgdGhhdCBsdXh1cnksXG4vLyBhbmQgZW5naW5lcyBhcmVuJ3QgbmVhcmx5IGludGVsbGlnZW50IGVub3VnaCB0byBkbyBlaXRoZXIgb2YgdGhlc2U6XG4vL1xuLy8gMS4gRWxpZGUgdGhlIGFsbG9jYXRpb24gZm9yIGBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlgIHdoZW4gaXQncyBwYXNzZWQgdG9cbi8vICAgIGFub3RoZXIgZnVuY3Rpb24gb25seSB0byBiZSBpbmRleGVkLlxuLy8gMi4gRWxpZGUgYW4gYGFyZ3VtZW50c2AgYWxsb2NhdGlvbiB3aGVuIGl0J3MgcGFzc2VkIHRvIGFueSBmdW5jdGlvbiBvdGhlclxuLy8gICAgdGhhbiBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YCBvciBgUmVmbGVjdC5hcHBseWAuXG4vL1xuLy8gSW4gRVM2LCBpdCdkIHByb2JhYmx5IGxvb2sgY2xvc2VyIHRvIHRoaXMgKEknZCBuZWVkIHRvIHByb2ZpbGUgaXQsIHRob3VnaCk6XG4vLyBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGF0dHJzLCAuLi5jaGlsZHJlbikge1xuLy8gICAgIGlmIChhdHRycyA9PSBudWxsIHx8IHR5cGVvZiBhdHRycyA9PT0gXCJvYmplY3RcIiAmJiBhdHRycy50YWcgPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheShhdHRycykpIHtcbi8vICAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KGNoaWxkcmVuWzBdKSkgY2hpbGRyZW4gPSBjaGlsZHJlblswXVxuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGNoaWxkcmVuID0gY2hpbGRyZW4ubGVuZ3RoID09PSAwICYmIEFycmF5LmlzQXJyYXkoYXR0cnMpID8gYXR0cnMgOiBbYXR0cnMsIC4uLmNoaWxkcmVuXVxuLy8gICAgICAgICBhdHRycyA9IHVuZGVmaW5lZFxuLy8gICAgIH1cbi8vXG4vLyAgICAgaWYgKGF0dHJzID09IG51bGwpIGF0dHJzID0ge31cbi8vICAgICByZXR1cm4gVm5vZGUoXCJcIiwgYXR0cnMua2V5LCBhdHRycywgY2hpbGRyZW4pXG4vLyB9XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgYXR0cnMgPSBhcmd1bWVudHNbdGhpc10sIHN0YXJ0ID0gdGhpcyArIDEsIGNoaWxkcmVuXG5cblx0aWYgKGF0dHJzID09IG51bGwpIHtcblx0XHRhdHRycyA9IHt9XG5cdH0gZWxzZSBpZiAodHlwZW9mIGF0dHJzICE9PSBcIm9iamVjdFwiIHx8IGF0dHJzLnRhZyAhPSBudWxsIHx8IEFycmF5LmlzQXJyYXkoYXR0cnMpKSB7XG5cdFx0YXR0cnMgPSB7fVxuXHRcdHN0YXJ0ID0gdGhpc1xuXHR9XG5cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IHN0YXJ0ICsgMSkge1xuXHRcdGNoaWxkcmVuID0gYXJndW1lbnRzW3N0YXJ0XVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIGNoaWxkcmVuID0gW2NoaWxkcmVuXVxuXHR9IGVsc2Uge1xuXHRcdGNoaWxkcmVuID0gW11cblx0XHR3aGlsZSAoc3RhcnQgPCBhcmd1bWVudHMubGVuZ3RoKSBjaGlsZHJlbi5wdXNoKGFyZ3VtZW50c1tzdGFydCsrXSlcblx0fVxuXG5cdHJldHVybiBWbm9kZShcIlwiLCBhdHRycy5rZXksIGF0dHJzLCBjaGlsZHJlbilcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkd2luZG93KSB7XG5cdHZhciAkZG9jID0gJHdpbmRvdyAmJiAkd2luZG93LmRvY3VtZW50XG5cdHZhciBjdXJyZW50UmVkcmF3XG5cblx0dmFyIG5hbWVTcGFjZSA9IHtcblx0XHRzdmc6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcblx0XHRtYXRoOiBcImh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUxcIlxuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0TmFtZVNwYWNlKHZub2RlKSB7XG5cdFx0cmV0dXJuIHZub2RlLmF0dHJzICYmIHZub2RlLmF0dHJzLnhtbG5zIHx8IG5hbWVTcGFjZVt2bm9kZS50YWddXG5cdH1cblxuXHQvL3Nhbml0eSBjaGVjayB0byBkaXNjb3VyYWdlIHBlb3BsZSBmcm9tIGRvaW5nIGB2bm9kZS5zdGF0ZSA9IC4uLmBcblx0ZnVuY3Rpb24gY2hlY2tTdGF0ZSh2bm9kZSwgb3JpZ2luYWwpIHtcblx0XHRpZiAodm5vZGUuc3RhdGUgIT09IG9yaWdpbmFsKSB0aHJvdyBuZXcgRXJyb3IoXCJgdm5vZGUuc3RhdGVgIG11c3Qgbm90IGJlIG1vZGlmaWVkXCIpXG5cdH1cblxuXHQvL05vdGU6IHRoZSBob29rIGlzIHBhc3NlZCBhcyB0aGUgYHRoaXNgIGFyZ3VtZW50IHRvIGFsbG93IHByb3h5aW5nIHRoZVxuXHQvL2FyZ3VtZW50cyB3aXRob3V0IHJlcXVpcmluZyBhIGZ1bGwgYXJyYXkgYWxsb2NhdGlvbiB0byBkbyBzby4gSXQgYWxzb1xuXHQvL3Rha2VzIGFkdmFudGFnZSBvZiB0aGUgZmFjdCB0aGUgY3VycmVudCBgdm5vZGVgIGlzIHRoZSBmaXJzdCBhcmd1bWVudCBpblxuXHQvL2FsbCBsaWZlY3ljbGUgbWV0aG9kcy5cblx0ZnVuY3Rpb24gY2FsbEhvb2sodm5vZGUpIHtcblx0XHR2YXIgb3JpZ2luYWwgPSB2bm9kZS5zdGF0ZVxuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hcHBseShvcmlnaW5hbCwgYXJndW1lbnRzKVxuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRjaGVja1N0YXRlKHZub2RlLCBvcmlnaW5hbClcblx0XHR9XG5cdH1cblxuXHQvLyBJRTExIChhdCBsZWFzdCkgdGhyb3dzIGFuIFVuc3BlY2lmaWVkRXJyb3Igd2hlbiBhY2Nlc3NpbmcgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB3aGVuXG5cdC8vIGluc2lkZSBhbiBpZnJhbWUuIENhdGNoIGFuZCBzd2FsbG93IHRoaXMgZXJyb3IsIGFuZCBoZWF2eS1oYW5kaWRseSByZXR1cm4gbnVsbC5cblx0ZnVuY3Rpb24gYWN0aXZlRWxlbWVudCgpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuICRkb2MuYWN0aXZlRWxlbWVudFxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBudWxsXG5cdFx0fVxuXHR9XG5cdC8vY3JlYXRlXG5cdGZ1bmN0aW9uIGNyZWF0ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCBzdGFydCwgZW5kLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKSB7XG5cdFx0Zm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcblx0XHRcdHZhciB2bm9kZSA9IHZub2Rlc1tpXVxuXHRcdFx0aWYgKHZub2RlICE9IG51bGwpIHtcblx0XHRcdFx0Y3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHR2YXIgdGFnID0gdm5vZGUudGFnXG5cdFx0aWYgKHR5cGVvZiB0YWcgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHZub2RlLnN0YXRlID0ge31cblx0XHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKSBpbml0TGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MpXG5cdFx0XHRzd2l0Y2ggKHRhZykge1xuXHRcdFx0XHRjYXNlIFwiI1wiOiBjcmVhdGVUZXh0KHBhcmVudCwgdm5vZGUsIG5leHRTaWJsaW5nKTsgYnJlYWtcblx0XHRcdFx0Y2FzZSBcIjxcIjogY3JlYXRlSFRNTChwYXJlbnQsIHZub2RlLCBucywgbmV4dFNpYmxpbmcpOyBicmVha1xuXHRcdFx0XHRjYXNlIFwiW1wiOiBjcmVhdGVGcmFnbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKTsgYnJlYWtcblx0XHRcdFx0ZGVmYXVsdDogY3JlYXRlRWxlbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGNyZWF0ZUNvbXBvbmVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZVRleHQocGFyZW50LCB2bm9kZSwgbmV4dFNpYmxpbmcpIHtcblx0XHR2bm9kZS5kb20gPSAkZG9jLmNyZWF0ZVRleHROb2RlKHZub2RlLmNoaWxkcmVuKVxuXHRcdGluc2VydE5vZGUocGFyZW50LCB2bm9kZS5kb20sIG5leHRTaWJsaW5nKVxuXHR9XG5cdHZhciBwb3NzaWJsZVBhcmVudHMgPSB7Y2FwdGlvbjogXCJ0YWJsZVwiLCB0aGVhZDogXCJ0YWJsZVwiLCB0Ym9keTogXCJ0YWJsZVwiLCB0Zm9vdDogXCJ0YWJsZVwiLCB0cjogXCJ0Ym9keVwiLCB0aDogXCJ0clwiLCB0ZDogXCJ0clwiLCBjb2xncm91cDogXCJ0YWJsZVwiLCBjb2w6IFwiY29sZ3JvdXBcIn1cblx0ZnVuY3Rpb24gY3JlYXRlSFRNTChwYXJlbnQsIHZub2RlLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHR2YXIgbWF0Y2ggPSB2bm9kZS5jaGlsZHJlbi5tYXRjaCgvXlxccyo/PChcXHcrKS9pbSkgfHwgW11cblx0XHQvLyBub3QgdXNpbmcgdGhlIHByb3BlciBwYXJlbnQgbWFrZXMgdGhlIGNoaWxkIGVsZW1lbnQocykgdmFuaXNoLlxuXHRcdC8vICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdC8vICAgICBkaXYuaW5uZXJIVE1MID0gXCI8dGQ+aTwvdGQ+PHRkPmo8L3RkPlwiXG5cdFx0Ly8gICAgIGNvbnNvbGUubG9nKGRpdi5pbm5lckhUTUwpXG5cdFx0Ly8gLS0+IFwiaWpcIiwgbm8gPHRkPiBpbiBzaWdodC5cblx0XHR2YXIgdGVtcCA9ICRkb2MuY3JlYXRlRWxlbWVudChwb3NzaWJsZVBhcmVudHNbbWF0Y2hbMV1dIHx8IFwiZGl2XCIpXG5cdFx0aWYgKG5zID09PSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIpIHtcblx0XHRcdHRlbXAuaW5uZXJIVE1MID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+XCIgKyB2bm9kZS5jaGlsZHJlbiArIFwiPC9zdmc+XCJcblx0XHRcdHRlbXAgPSB0ZW1wLmZpcnN0Q2hpbGRcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGVtcC5pbm5lckhUTUwgPSB2bm9kZS5jaGlsZHJlblxuXHRcdH1cblx0XHR2bm9kZS5kb20gPSB0ZW1wLmZpcnN0Q2hpbGRcblx0XHR2bm9kZS5kb21TaXplID0gdGVtcC5jaGlsZE5vZGVzLmxlbmd0aFxuXHRcdC8vIENhcHR1cmUgbm9kZXMgdG8gcmVtb3ZlLCBzbyB3ZSBkb24ndCBjb25mdXNlIHRoZW0uXG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBbXVxuXHRcdHZhciBmcmFnbWVudCA9ICRkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG5cdFx0dmFyIGNoaWxkXG5cdFx0d2hpbGUgKGNoaWxkID0gdGVtcC5maXJzdENoaWxkKSB7XG5cdFx0XHR2bm9kZS5pbnN0YW5jZS5wdXNoKGNoaWxkKVxuXHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXG5cdFx0fVxuXHRcdGluc2VydE5vZGUocGFyZW50LCBmcmFnbWVudCwgbmV4dFNpYmxpbmcpXG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciBmcmFnbWVudCA9ICRkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG5cdFx0aWYgKHZub2RlLmNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRcdHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0XHRjcmVhdGVOb2RlcyhmcmFnbWVudCwgY2hpbGRyZW4sIDAsIGNoaWxkcmVuLmxlbmd0aCwgaG9va3MsIG51bGwsIG5zKVxuXHRcdH1cblx0XHR2bm9kZS5kb20gPSBmcmFnbWVudC5maXJzdENoaWxkXG5cdFx0dm5vZGUuZG9tU2l6ZSA9IGZyYWdtZW50LmNoaWxkTm9kZXMubGVuZ3RoXG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIGZyYWdtZW50LCBuZXh0U2libGluZylcblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHR2YXIgdGFnID0gdm5vZGUudGFnXG5cdFx0dmFyIGF0dHJzID0gdm5vZGUuYXR0cnNcblx0XHR2YXIgaXMgPSBhdHRycyAmJiBhdHRycy5pc1xuXG5cdFx0bnMgPSBnZXROYW1lU3BhY2Uodm5vZGUpIHx8IG5zXG5cblx0XHR2YXIgZWxlbWVudCA9IG5zID9cblx0XHRcdGlzID8gJGRvYy5jcmVhdGVFbGVtZW50TlMobnMsIHRhZywge2lzOiBpc30pIDogJGRvYy5jcmVhdGVFbGVtZW50TlMobnMsIHRhZykgOlxuXHRcdFx0aXMgPyAkZG9jLmNyZWF0ZUVsZW1lbnQodGFnLCB7aXM6IGlzfSkgOiAkZG9jLmNyZWF0ZUVsZW1lbnQodGFnKVxuXHRcdHZub2RlLmRvbSA9IGVsZW1lbnRcblxuXHRcdGlmIChhdHRycyAhPSBudWxsKSB7XG5cdFx0XHRzZXRBdHRycyh2bm9kZSwgYXR0cnMsIG5zKVxuXHRcdH1cblxuXHRcdGluc2VydE5vZGUocGFyZW50LCBlbGVtZW50LCBuZXh0U2libGluZylcblxuXHRcdGlmICghbWF5YmVTZXRDb250ZW50RWRpdGFibGUodm5vZGUpKSB7XG5cdFx0XHRpZiAodm5vZGUudGV4dCAhPSBudWxsKSB7XG5cdFx0XHRcdGlmICh2bm9kZS50ZXh0ICE9PSBcIlwiKSBlbGVtZW50LnRleHRDb250ZW50ID0gdm5vZGUudGV4dFxuXHRcdFx0XHRlbHNlIHZub2RlLmNoaWxkcmVuID0gW1Zub2RlKFwiI1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdm5vZGUudGV4dCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXVxuXHRcdFx0fVxuXHRcdFx0aWYgKHZub2RlLmNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRcdFx0dmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHRcdFx0Y3JlYXRlTm9kZXMoZWxlbWVudCwgY2hpbGRyZW4sIDAsIGNoaWxkcmVuLmxlbmd0aCwgaG9va3MsIG51bGwsIG5zKVxuXHRcdFx0XHRpZiAodm5vZGUudGFnID09PSBcInNlbGVjdFwiICYmIGF0dHJzICE9IG51bGwpIHNldExhdGVTZWxlY3RBdHRycyh2bm9kZSwgYXR0cnMpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGluaXRDb21wb25lbnQodm5vZGUsIGhvb2tzKSB7XG5cdFx0dmFyIHNlbnRpbmVsXG5cdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcudmlldyA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHR2bm9kZS5zdGF0ZSA9IE9iamVjdC5jcmVhdGUodm5vZGUudGFnKVxuXHRcdFx0c2VudGluZWwgPSB2bm9kZS5zdGF0ZS52aWV3XG5cdFx0XHRpZiAoc2VudGluZWwuJCRyZWVudHJhbnRMb2NrJCQgIT0gbnVsbCkgcmV0dXJuXG5cdFx0XHRzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCA9IHRydWVcblx0XHR9IGVsc2Uge1xuXHRcdFx0dm5vZGUuc3RhdGUgPSB2b2lkIDBcblx0XHRcdHNlbnRpbmVsID0gdm5vZGUudGFnXG5cdFx0XHRpZiAoc2VudGluZWwuJCRyZWVudHJhbnRMb2NrJCQgIT0gbnVsbCkgcmV0dXJuXG5cdFx0XHRzZW50aW5lbC4kJHJlZW50cmFudExvY2skJCA9IHRydWVcblx0XHRcdHZub2RlLnN0YXRlID0gKHZub2RlLnRhZy5wcm90b3R5cGUgIT0gbnVsbCAmJiB0eXBlb2Ygdm5vZGUudGFnLnByb3RvdHlwZS52aWV3ID09PSBcImZ1bmN0aW9uXCIpID8gbmV3IHZub2RlLnRhZyh2bm9kZSkgOiB2bm9kZS50YWcodm5vZGUpXG5cdFx0fVxuXHRcdGluaXRMaWZlY3ljbGUodm5vZGUuc3RhdGUsIHZub2RlLCBob29rcylcblx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCkgaW5pdExpZmVjeWNsZSh2bm9kZS5hdHRycywgdm5vZGUsIGhvb2tzKVxuXHRcdHZub2RlLmluc3RhbmNlID0gVm5vZGUubm9ybWFsaXplKGNhbGxIb29rLmNhbGwodm5vZGUuc3RhdGUudmlldywgdm5vZGUpKVxuXHRcdGlmICh2bm9kZS5pbnN0YW5jZSA9PT0gdm5vZGUpIHRocm93IEVycm9yKFwiQSB2aWV3IGNhbm5vdCByZXR1cm4gdGhlIHZub2RlIGl0IHJlY2VpdmVkIGFzIGFyZ3VtZW50XCIpXG5cdFx0c2VudGluZWwuJCRyZWVudHJhbnRMb2NrJCQgPSBudWxsXG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHRpbml0Q29tcG9uZW50KHZub2RlLCBob29rcylcblx0XHRpZiAodm5vZGUuaW5zdGFuY2UgIT0gbnVsbCkge1xuXHRcdFx0Y3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLmluc3RhbmNlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0dm5vZGUuZG9tID0gdm5vZGUuaW5zdGFuY2UuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gdm5vZGUuZG9tICE9IG51bGwgPyB2bm9kZS5pbnN0YW5jZS5kb21TaXplIDogMFxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHZub2RlLmRvbVNpemUgPSAwXG5cdFx0fVxuXHR9XG5cblx0Ly91cGRhdGVcblx0LyoqXG5cdCAqIEBwYXJhbSB7RWxlbWVudHxGcmFnbWVudH0gcGFyZW50IC0gdGhlIHBhcmVudCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7Vm5vZGVbXSB8IG51bGx9IG9sZCAtIHRoZSBsaXN0IG9mIHZub2RlcyBvZiB0aGUgbGFzdCBgcmVuZGVyKClgIGNhbGwgZm9yXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgcGFydCBvZiB0aGUgdHJlZVxuXHQgKiBAcGFyYW0ge1Zub2RlW10gfCBudWxsfSB2bm9kZXMgLSBhcyBhYm92ZSwgYnV0IGZvciB0aGUgY3VycmVudCBgcmVuZGVyKClgIGNhbGwuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gaG9va3MgLSBhbiBhY2N1bXVsYXRvciBvZiBwb3N0LXJlbmRlciBob29rcyAob25jcmVhdGUvb251cGRhdGUpXG5cdCAqIEBwYXJhbSB7RWxlbWVudCB8IG51bGx9IG5leHRTaWJsaW5nIC0gdGhlIG5leHQgRE9NIG5vZGUgaWYgd2UncmUgZGVhbGluZyB3aXRoIGFcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudCB0aGF0IGlzIG5vdCB0aGUgbGFzdCBpdGVtIGluIGl0c1xuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFxuXHQgKiBAcGFyYW0geydzdmcnIHwgJ21hdGgnIHwgU3RyaW5nIHwgbnVsbH0gbnMpIC0gdGhlIGN1cnJlbnQgWE1MIG5hbWVzcGFjZSwgaWYgYW55XG5cdCAqIEByZXR1cm5zIHZvaWRcblx0ICovXG5cdC8vIFRoaXMgZnVuY3Rpb24gZGlmZnMgYW5kIHBhdGNoZXMgbGlzdHMgb2Ygdm5vZGVzLCBib3RoIGtleWVkIGFuZCB1bmtleWVkLlxuXHQvL1xuXHQvLyBXZSB3aWxsOlxuXHQvL1xuXHQvLyAxLiBkZXNjcmliZSBpdHMgZ2VuZXJhbCBzdHJ1Y3R1cmVcblx0Ly8gMi4gZm9jdXMgb24gdGhlIGRpZmYgYWxnb3JpdGhtIG9wdGltaXphdGlvbnNcblx0Ly8gMy4gZGlzY3VzcyBET00gbm9kZSBvcGVyYXRpb25zLlxuXG5cdC8vICMjIE92ZXJ2aWV3OlxuXHQvL1xuXHQvLyBUaGUgdXBkYXRlTm9kZXMoKSBmdW5jdGlvbjpcblx0Ly8gLSBkZWFscyB3aXRoIHRyaXZpYWwgY2FzZXNcblx0Ly8gLSBkZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGxpc3RzIGFyZSBrZXllZCBvciB1bmtleWVkIGJhc2VkIG9uIHRoZSBmaXJzdCBub24tbnVsbCBub2RlXG5cdC8vICAgb2YgZWFjaCBsaXN0LlxuXHQvLyAtIGRpZmZzIHRoZW0gYW5kIHBhdGNoZXMgdGhlIERPTSBpZiBuZWVkZWQgKHRoYXQncyB0aGUgYnJ1bnQgb2YgdGhlIGNvZGUpXG5cdC8vIC0gbWFuYWdlcyB0aGUgbGVmdG92ZXJzOiBhZnRlciBkaWZmaW5nLCBhcmUgdGhlcmU6XG5cdC8vICAgLSBvbGQgbm9kZXMgbGVmdCB0byByZW1vdmU/XG5cdC8vIFx0IC0gbmV3IG5vZGVzIHRvIGluc2VydD9cblx0Ly8gXHQgZGVhbCB3aXRoIHRoZW0hXG5cdC8vXG5cdC8vIFRoZSBsaXN0cyBhcmUgb25seSBpdGVyYXRlZCBvdmVyIG9uY2UsIHdpdGggYW4gZXhjZXB0aW9uIGZvciB0aGUgbm9kZXMgaW4gYG9sZGAgdGhhdFxuXHQvLyBhcmUgdmlzaXRlZCBpbiB0aGUgZm91cnRoIHBhcnQgb2YgdGhlIGRpZmYgYW5kIGluIHRoZSBgcmVtb3ZlTm9kZXNgIGxvb3AuXG5cblx0Ly8gIyMgRGlmZmluZ1xuXHQvL1xuXHQvLyBSZWFkaW5nIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2NhbHZvaWQvaXZpL2Jsb2IvZGRjMDlkMDZhYmFlZjQ1MjQ4ZTYxMzNmNzA0MGQwMGQzYzZiZTg1My9wYWNrYWdlcy9pdmkvc3JjL3Zkb20vaW1wbGVtZW50YXRpb24udHMjTDYxNy1MODM3XG5cdC8vIG1heSBiZSBnb29kIGZvciBjb250ZXh0IG9uIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZS1iYXNlZCBsb2dpYyBmb3IgbW92aW5nIG5vZGVzLlxuXHQvL1xuXHQvLyBJbiBvcmRlciB0byBkaWZmIGtleWVkIGxpc3RzLCBvbmUgaGFzIHRvXG5cdC8vXG5cdC8vIDEpIG1hdGNoIG5vZGVzIGluIGJvdGggbGlzdHMsIHBlciBrZXksIGFuZCB1cGRhdGUgdGhlbSBhY2NvcmRpbmdseVxuXHQvLyAyKSBjcmVhdGUgdGhlIG5vZGVzIHByZXNlbnQgaW4gdGhlIG5ldyBsaXN0LCBidXQgYWJzZW50IGluIHRoZSBvbGQgb25lXG5cdC8vIDMpIHJlbW92ZSB0aGUgbm9kZXMgcHJlc2VudCBpbiB0aGUgb2xkIGxpc3QsIGJ1dCBhYnNlbnQgaW4gdGhlIG5ldyBvbmVcblx0Ly8gNCkgZmlndXJlIG91dCB3aGF0IG5vZGVzIGluIDEpIHRvIG1vdmUgaW4gb3JkZXIgdG8gbWluaW1pemUgdGhlIERPTSBvcGVyYXRpb25zLlxuXHQvL1xuXHQvLyBUbyBhY2hpZXZlIDEpIG9uZSBjYW4gY3JlYXRlIGEgZGljdGlvbmFyeSBvZiBrZXlzID0+IGluZGV4IChmb3IgdGhlIG9sZCBsaXN0KSwgdGhlbiBpdGVyYXRlXG5cdC8vIG92ZXIgdGhlIG5ldyBsaXN0IGFuZCBmb3IgZWFjaCBuZXcgdm5vZGUsIGZpbmQgdGhlIGNvcnJlc3BvbmRpbmcgdm5vZGUgaW4gdGhlIG9sZCBsaXN0IHVzaW5nXG5cdC8vIHRoZSBtYXAuXG5cdC8vIDIpIGlzIGFjaGlldmVkIGluIHRoZSBzYW1lIHN0ZXA6IGlmIGEgbmV3IG5vZGUgaGFzIG5vIGNvcnJlc3BvbmRpbmcgZW50cnkgaW4gdGhlIG1hcCwgaXQgaXMgbmV3XG5cdC8vIGFuZCBtdXN0IGJlIGNyZWF0ZWQuXG5cdC8vIEZvciB0aGUgcmVtb3ZhbHMsIHdlIGFjdHVhbGx5IHJlbW92ZSB0aGUgbm9kZXMgdGhhdCBoYXZlIGJlZW4gdXBkYXRlZCBmcm9tIHRoZSBvbGQgbGlzdC5cblx0Ly8gVGhlIG5vZGVzIHRoYXQgcmVtYWluIGluIHRoYXQgbGlzdCBhZnRlciAxKSBhbmQgMikgaGF2ZSBiZWVuIHBlcmZvcm1lZCBjYW4gYmUgc2FmZWx5IHJlbW92ZWQuXG5cdC8vIFRoZSBmb3VydGggc3RlcCBpcyBhIGJpdCBtb3JlIGNvbXBsZXggYW5kIHJlbGllcyBvbiB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlIChMSVMpXG5cdC8vIGFsZ29yaXRobS5cblx0Ly9cblx0Ly8gdGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBpcyB0aGUgbGlzdCBvZiBub2RlcyB0aGF0IGNhbiByZW1haW4gaW4gcGxhY2UuIEltYWdpbmUgZ29pbmdcblx0Ly8gZnJvbSBgMSwyLDMsNCw1YCB0byBgNCw1LDEsMiwzYCB3aGVyZSB0aGUgbnVtYmVycyBhcmUgbm90IG5lY2Vzc2FyaWx5IHRoZSBrZXlzLCBidXQgdGhlIGluZGljZXNcblx0Ly8gY29ycmVzcG9uZGluZyB0byB0aGUga2V5ZWQgbm9kZXMgaW4gdGhlIG9sZCBsaXN0IChrZXllZCBub2RlcyBgZSxkLGMsYixhYCA9PiBgYixhLGUsZCxjYCB3b3VsZFxuXHQvLyAgbWF0Y2ggdGhlIGFib3ZlIGxpc3RzLCBmb3IgZXhhbXBsZSkuXG5cdC8vXG5cdC8vIEluIHRoZXJlIGFyZSB0d28gaW5jcmVhc2luZyBzdWJzZXF1ZW5jZXM6IGA0LDVgIGFuZCBgMSwyLDNgLCB0aGUgbGF0dGVyIGJlaW5nIHRoZSBsb25nZXN0LiBXZVxuXHQvLyBjYW4gdXBkYXRlIHRob3NlIG5vZGVzIHdpdGhvdXQgbW92aW5nIHRoZW0sIGFuZCBvbmx5IGNhbGwgYGluc2VydE5vZGVgIG9uIGA0YCBhbmQgYDVgLlxuXHQvL1xuXHQvLyBAbG9jYWx2b2lkIGFkYXB0ZWQgdGhlIGFsZ28gdG8gYWxzbyBzdXBwb3J0IG5vZGUgZGVsZXRpb25zIGFuZCBpbnNlcnRpb25zICh0aGUgYGxpc2AgaXMgYWN0dWFsbHlcblx0Ly8gdGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSAqb2Ygb2xkIG5vZGVzIHN0aWxsIHByZXNlbnQgaW4gdGhlIG5ldyBsaXN0KikuXG5cdC8vXG5cdC8vIEl0IGlzIGEgZ2VuZXJhbCBhbGdvcml0aG0gdGhhdCBpcyBmaXJlcHJvb2YgaW4gYWxsIGNpcmN1bXN0YW5jZXMsIGJ1dCBpdCByZXF1aXJlcyB0aGUgYWxsb2NhdGlvblxuXHQvLyBhbmQgdGhlIGNvbnN0cnVjdGlvbiBvZiBhIGBrZXkgPT4gb2xkSW5kZXhgIG1hcCwgYW5kIHRocmVlIGFycmF5cyAob25lIHdpdGggYG5ld0luZGV4ID0+IG9sZEluZGV4YCxcblx0Ly8gdGhlIGBMSVNgIGFuZCBhIHRlbXBvcmFyeSBvbmUgdG8gY3JlYXRlIHRoZSBMSVMpLlxuXHQvL1xuXHQvLyBTbyB3ZSBjaGVhdCB3aGVyZSB3ZSBjYW46IGlmIHRoZSB0YWlscyBvZiB0aGUgbGlzdHMgYXJlIGlkZW50aWNhbCwgdGhleSBhcmUgZ3VhcmFudGVlZCB0byBiZSBwYXJ0IG9mXG5cdC8vIHRoZSBMSVMgYW5kIGNhbiBiZSB1cGRhdGVkIHdpdGhvdXQgbW92aW5nIHRoZW0uXG5cdC8vXG5cdC8vIElmIHR3byBub2RlcyBhcmUgc3dhcHBlZCwgdGhleSBhcmUgZ3VhcmFudGVlZCBub3QgdG8gYmUgcGFydCBvZiB0aGUgTElTLCBhbmQgbXVzdCBiZSBtb3ZlZCAod2l0aFxuXHQvLyB0aGUgZXhjZXB0aW9uIG9mIHRoZSBsYXN0IG5vZGUgaWYgdGhlIGxpc3QgaXMgZnVsbHkgcmV2ZXJzZWQpLlxuXHQvL1xuXHQvLyAjIyBGaW5kaW5nIHRoZSBuZXh0IHNpYmxpbmcuXG5cdC8vXG5cdC8vIGB1cGRhdGVOb2RlKClgIGFuZCBgY3JlYXRlTm9kZSgpYCBleHBlY3QgYSBuZXh0U2libGluZyBwYXJhbWV0ZXIgdG8gcGVyZm9ybSBET00gb3BlcmF0aW9ucy5cblx0Ly8gV2hlbiB0aGUgbGlzdCBpcyBiZWluZyB0cmF2ZXJzZWQgdG9wLWRvd24sIGF0IGFueSBpbmRleCwgdGhlIERPTSBub2RlcyB1cCB0byB0aGUgcHJldmlvdXNcblx0Ly8gdm5vZGUgcmVmbGVjdCB0aGUgY29udGVudCBvZiB0aGUgbmV3IGxpc3QsIHdoZXJlYXMgdGhlIHJlc3Qgb2YgdGhlIERPTSBub2RlcyByZWZsZWN0IHRoZSBvbGRcblx0Ly8gbGlzdC4gVGhlIG5leHQgc2libGluZyBtdXN0IGJlIGxvb2tlZCBmb3IgaW4gdGhlIG9sZCBsaXN0IHVzaW5nIGBnZXROZXh0U2libGluZyguLi4gb2xkU3RhcnQgKyAxIC4uLilgLlxuXHQvL1xuXHQvLyBJbiB0aGUgb3RoZXIgc2NlbmFyaW9zIChzd2FwcywgdXB3YXJkcyB0cmF2ZXJzYWwsIG1hcC1iYXNlZCBkaWZmKSxcblx0Ly8gdGhlIG5ldyB2bm9kZXMgbGlzdCBpcyB0cmF2ZXJzZWQgdXB3YXJkcy4gVGhlIERPTSBub2RlcyBhdCB0aGUgYm90dG9tIG9mIHRoZSBsaXN0IHJlZmxlY3QgdGhlXG5cdC8vIGJvdHRvbSBwYXJ0IG9mIHRoZSBuZXcgdm5vZGVzIGxpc3QsIGFuZCB3ZSBjYW4gdXNlIHRoZSBgdi5kb21gICB2YWx1ZSBvZiB0aGUgcHJldmlvdXMgbm9kZVxuXHQvLyBhcyB0aGUgbmV4dCBzaWJsaW5nIChjYWNoZWQgaW4gdGhlIGBuZXh0U2libGluZ2AgdmFyaWFibGUpLlxuXG5cblx0Ly8gIyMgRE9NIG5vZGUgbW92ZXNcblx0Ly9cblx0Ly8gSW4gbW9zdCBzY2VuYXJpb3MgYHVwZGF0ZU5vZGUoKWAgYW5kIGBjcmVhdGVOb2RlKClgIHBlcmZvcm0gdGhlIERPTSBvcGVyYXRpb25zLiBIb3dldmVyLFxuXHQvLyB0aGlzIGlzIG5vdCB0aGUgY2FzZSBpZiB0aGUgbm9kZSBtb3ZlZCAoc2Vjb25kIGFuZCBmb3VydGggcGFydCBvZiB0aGUgZGlmZiBhbGdvKS4gV2UgbW92ZVxuXHQvLyB0aGUgb2xkIERPTSBub2RlcyBiZWZvcmUgdXBkYXRlTm9kZSBydW5zIGJlY2F1c2UgaXQgZW5hYmxlcyB1cyB0byB1c2UgdGhlIGNhY2hlZCBgbmV4dFNpYmxpbmdgXG5cdC8vIHZhcmlhYmxlIHJhdGhlciB0aGFuIGZldGNoaW5nIGl0IHVzaW5nIGBnZXROZXh0U2libGluZygpYC5cblx0Ly9cblx0Ly8gVGhlIGZvdXJ0aCBwYXJ0IG9mIHRoZSBkaWZmIGN1cnJlbnRseSBpbnNlcnRzIG5vZGVzIHVuY29uZGl0aW9uYWxseSwgbGVhZGluZyB0byBpc3N1ZXNcblx0Ly8gbGlrZSAjMTc5MSBhbmQgIzE5OTkuIFdlIG5lZWQgdG8gYmUgc21hcnRlciBhYm91dCB0aG9zZSBzaXR1YXRpb25zIHdoZXJlIGFkamFzY2VudCBvbGRcblx0Ly8gbm9kZXMgcmVtYWluIHRvZ2V0aGVyIGluIHRoZSBuZXcgbGlzdCBpbiBhIHdheSB0aGF0IGlzbid0IGNvdmVyZWQgYnkgcGFydHMgb25lIGFuZFxuXHQvLyB0aHJlZSBvZiB0aGUgZGlmZiBhbGdvLlxuXG5cdGZ1bmN0aW9uIHVwZGF0ZU5vZGVzKHBhcmVudCwgb2xkLCB2bm9kZXMsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHRpZiAob2xkID09PSB2bm9kZXMgfHwgb2xkID09IG51bGwgJiYgdm5vZGVzID09IG51bGwpIHJldHVyblxuXHRcdGVsc2UgaWYgKG9sZCA9PSBudWxsIHx8IG9sZC5sZW5ndGggPT09IDApIGNyZWF0ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCAwLCB2bm9kZXMubGVuZ3RoLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdGVsc2UgaWYgKHZub2RlcyA9PSBudWxsIHx8IHZub2Rlcy5sZW5ndGggPT09IDApIHJlbW92ZU5vZGVzKHBhcmVudCwgb2xkLCAwLCBvbGQubGVuZ3RoKVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGlzT2xkS2V5ZWQgPSBvbGRbMF0gIT0gbnVsbCAmJiBvbGRbMF0ua2V5ICE9IG51bGxcblx0XHRcdHZhciBpc0tleWVkID0gdm5vZGVzWzBdICE9IG51bGwgJiYgdm5vZGVzWzBdLmtleSAhPSBudWxsXG5cdFx0XHR2YXIgc3RhcnQgPSAwLCBvbGRTdGFydCA9IDBcblx0XHRcdGlmICghaXNPbGRLZXllZCkgd2hpbGUgKG9sZFN0YXJ0IDwgb2xkLmxlbmd0aCAmJiBvbGRbb2xkU3RhcnRdID09IG51bGwpIG9sZFN0YXJ0Kytcblx0XHRcdGlmICghaXNLZXllZCkgd2hpbGUgKHN0YXJ0IDwgdm5vZGVzLmxlbmd0aCAmJiB2bm9kZXNbc3RhcnRdID09IG51bGwpIHN0YXJ0Kytcblx0XHRcdGlmIChpc0tleWVkID09PSBudWxsICYmIGlzT2xkS2V5ZWQgPT0gbnVsbCkgcmV0dXJuIC8vIGJvdGggbGlzdHMgYXJlIGZ1bGwgb2YgbnVsbHNcblx0XHRcdGlmIChpc09sZEtleWVkICE9PSBpc0tleWVkKSB7XG5cdFx0XHRcdHJlbW92ZU5vZGVzKHBhcmVudCwgb2xkLCBvbGRTdGFydCwgb2xkLmxlbmd0aClcblx0XHRcdFx0Y3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCB2bm9kZXMubGVuZ3RoLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0fSBlbHNlIGlmICghaXNLZXllZCkge1xuXHRcdFx0XHQvLyBEb24ndCBpbmRleCBwYXN0IHRoZSBlbmQgb2YgZWl0aGVyIGxpc3QgKGNhdXNlcyBkZW9wdHMpLlxuXHRcdFx0XHR2YXIgY29tbW9uTGVuZ3RoID0gb2xkLmxlbmd0aCA8IHZub2Rlcy5sZW5ndGggPyBvbGQubGVuZ3RoIDogdm5vZGVzLmxlbmd0aFxuXHRcdFx0XHQvLyBSZXdpbmQgaWYgbmVjZXNzYXJ5IHRvIHRoZSBmaXJzdCBub24tbnVsbCBpbmRleCBvbiBlaXRoZXIgc2lkZS5cblx0XHRcdFx0Ly8gV2UgY291bGQgYWx0ZXJuYXRpdmVseSBlaXRoZXIgZXhwbGljaXRseSBjcmVhdGUgb3IgcmVtb3ZlIG5vZGVzIHdoZW4gYHN0YXJ0ICE9PSBvbGRTdGFydGBcblx0XHRcdFx0Ly8gYnV0IHRoYXQgd291bGQgYmUgb3B0aW1pemluZyBmb3Igc3BhcnNlIGxpc3RzIHdoaWNoIGFyZSBtb3JlIHJhcmUgdGhhbiBkZW5zZSBvbmVzLlxuXHRcdFx0XHRzdGFydCA9IHN0YXJ0IDwgb2xkU3RhcnQgPyBzdGFydCA6IG9sZFN0YXJ0XG5cdFx0XHRcdGZvciAoOyBzdGFydCA8IGNvbW1vbkxlbmd0aDsgc3RhcnQrKykge1xuXHRcdFx0XHRcdG8gPSBvbGRbc3RhcnRdXG5cdFx0XHRcdFx0diA9IHZub2Rlc1tzdGFydF1cblx0XHRcdFx0XHRpZiAobyA9PT0gdiB8fCBvID09IG51bGwgJiYgdiA9PSBudWxsKSBjb250aW51ZVxuXHRcdFx0XHRcdGVsc2UgaWYgKG8gPT0gbnVsbCkgY3JlYXRlTm9kZShwYXJlbnQsIHYsIGhvb2tzLCBucywgZ2V0TmV4dFNpYmxpbmcob2xkLCBzdGFydCArIDEsIG5leHRTaWJsaW5nKSlcblx0XHRcdFx0XHRlbHNlIGlmICh2ID09IG51bGwpIHJlbW92ZU5vZGUocGFyZW50LCBvKVxuXHRcdFx0XHRcdGVsc2UgdXBkYXRlTm9kZShwYXJlbnQsIG8sIHYsIGhvb2tzLCBnZXROZXh0U2libGluZyhvbGQsIHN0YXJ0ICsgMSwgbmV4dFNpYmxpbmcpLCBucylcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob2xkLmxlbmd0aCA+IGNvbW1vbkxlbmd0aCkgcmVtb3ZlTm9kZXMocGFyZW50LCBvbGQsIHN0YXJ0LCBvbGQubGVuZ3RoKVxuXHRcdFx0XHRpZiAodm5vZGVzLmxlbmd0aCA+IGNvbW1vbkxlbmd0aCkgY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCB2bm9kZXMubGVuZ3RoLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8ga2V5ZWQgZGlmZlxuXHRcdFx0XHR2YXIgb2xkRW5kID0gb2xkLmxlbmd0aCAtIDEsIGVuZCA9IHZub2Rlcy5sZW5ndGggLSAxLCBtYXAsIG8sIHYsIG9lLCB2ZSwgdG9wU2libGluZ1xuXG5cdFx0XHRcdC8vIGJvdHRvbS11cFxuXHRcdFx0XHR3aGlsZSAob2xkRW5kID49IG9sZFN0YXJ0ICYmIGVuZCA+PSBzdGFydCkge1xuXHRcdFx0XHRcdG9lID0gb2xkW29sZEVuZF1cblx0XHRcdFx0XHR2ZSA9IHZub2Rlc1tlbmRdXG5cdFx0XHRcdFx0aWYgKG9lLmtleSAhPT0gdmUua2V5KSBicmVha1xuXHRcdFx0XHRcdGlmIChvZSAhPT0gdmUpIHVwZGF0ZU5vZGUocGFyZW50LCBvZSwgdmUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHRcdFx0aWYgKHZlLmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IHZlLmRvbVxuXHRcdFx0XHRcdG9sZEVuZC0tLCBlbmQtLVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIHRvcC1kb3duXG5cdFx0XHRcdHdoaWxlIChvbGRFbmQgPj0gb2xkU3RhcnQgJiYgZW5kID49IHN0YXJ0KSB7XG5cdFx0XHRcdFx0byA9IG9sZFtvbGRTdGFydF1cblx0XHRcdFx0XHR2ID0gdm5vZGVzW3N0YXJ0XVxuXHRcdFx0XHRcdGlmIChvLmtleSAhPT0gdi5rZXkpIGJyZWFrXG5cdFx0XHRcdFx0b2xkU3RhcnQrKywgc3RhcnQrK1xuXHRcdFx0XHRcdGlmIChvICE9PSB2KSB1cGRhdGVOb2RlKHBhcmVudCwgbywgdiwgaG9va3MsIGdldE5leHRTaWJsaW5nKG9sZCwgb2xkU3RhcnQsIG5leHRTaWJsaW5nKSwgbnMpXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gc3dhcHMgYW5kIGxpc3QgcmV2ZXJzYWxzXG5cdFx0XHRcdHdoaWxlIChvbGRFbmQgPj0gb2xkU3RhcnQgJiYgZW5kID49IHN0YXJ0KSB7XG5cdFx0XHRcdFx0aWYgKHN0YXJ0ID09PSBlbmQpIGJyZWFrXG5cdFx0XHRcdFx0aWYgKG8ua2V5ICE9PSB2ZS5rZXkgfHwgb2Uua2V5ICE9PSB2LmtleSkgYnJlYWtcblx0XHRcdFx0XHR0b3BTaWJsaW5nID0gZ2V0TmV4dFNpYmxpbmcob2xkLCBvbGRTdGFydCwgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdFx0bW92ZU5vZGVzKHBhcmVudCwgb2UsIHRvcFNpYmxpbmcpXG5cdFx0XHRcdFx0aWYgKG9lICE9PSB2KSB1cGRhdGVOb2RlKHBhcmVudCwgb2UsIHYsIGhvb2tzLCB0b3BTaWJsaW5nLCBucylcblx0XHRcdFx0XHRpZiAoKytzdGFydCA8PSAtLWVuZCkgbW92ZU5vZGVzKHBhcmVudCwgbywgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdFx0aWYgKG8gIT09IHZlKSB1cGRhdGVOb2RlKHBhcmVudCwgbywgdmUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHRcdFx0aWYgKHZlLmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IHZlLmRvbVxuXHRcdFx0XHRcdG9sZFN0YXJ0Kys7IG9sZEVuZC0tXG5cdFx0XHRcdFx0b2UgPSBvbGRbb2xkRW5kXVxuXHRcdFx0XHRcdHZlID0gdm5vZGVzW2VuZF1cblx0XHRcdFx0XHRvID0gb2xkW29sZFN0YXJ0XVxuXHRcdFx0XHRcdHYgPSB2bm9kZXNbc3RhcnRdXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gYm90dG9tIHVwIG9uY2UgYWdhaW5cblx0XHRcdFx0d2hpbGUgKG9sZEVuZCA+PSBvbGRTdGFydCAmJiBlbmQgPj0gc3RhcnQpIHtcblx0XHRcdFx0XHRpZiAob2Uua2V5ICE9PSB2ZS5rZXkpIGJyZWFrXG5cdFx0XHRcdFx0aWYgKG9lICE9PSB2ZSkgdXBkYXRlTm9kZShwYXJlbnQsIG9lLCB2ZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdFx0XHRpZiAodmUuZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gdmUuZG9tXG5cdFx0XHRcdFx0b2xkRW5kLS0sIGVuZC0tXG5cdFx0XHRcdFx0b2UgPSBvbGRbb2xkRW5kXVxuXHRcdFx0XHRcdHZlID0gdm5vZGVzW2VuZF1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoc3RhcnQgPiBlbmQpIHJlbW92ZU5vZGVzKHBhcmVudCwgb2xkLCBvbGRTdGFydCwgb2xkRW5kICsgMSlcblx0XHRcdFx0ZWxzZSBpZiAob2xkU3RhcnQgPiBvbGRFbmQpIGNyZWF0ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCBzdGFydCwgZW5kICsgMSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Ly8gaW5zcGlyZWQgYnkgaXZpIGh0dHBzOi8vZ2l0aHViLmNvbS9pdmlqcy9pdmkvIGJ5IEJvcmlzIEthdWxcblx0XHRcdFx0XHR2YXIgb3JpZ2luYWxOZXh0U2libGluZyA9IG5leHRTaWJsaW5nLCB2bm9kZXNMZW5ndGggPSBlbmQgLSBzdGFydCArIDEsIG9sZEluZGljZXMgPSBuZXcgQXJyYXkodm5vZGVzTGVuZ3RoKSwgbGk9MCwgaT0wLCBwb3MgPSAyMTQ3NDgzNjQ3LCBtYXRjaGVkID0gMCwgbWFwLCBsaXNJbmRpY2VzXG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IHZub2Rlc0xlbmd0aDsgaSsrKSBvbGRJbmRpY2VzW2ldID0gLTFcblx0XHRcdFx0XHRmb3IgKGkgPSBlbmQ7IGkgPj0gc3RhcnQ7IGktLSkge1xuXHRcdFx0XHRcdFx0aWYgKG1hcCA9PSBudWxsKSBtYXAgPSBnZXRLZXlNYXAob2xkLCBvbGRTdGFydCwgb2xkRW5kICsgMSlcblx0XHRcdFx0XHRcdHZlID0gdm5vZGVzW2ldXG5cdFx0XHRcdFx0XHR2YXIgb2xkSW5kZXggPSBtYXBbdmUua2V5XVxuXHRcdFx0XHRcdFx0aWYgKG9sZEluZGV4ICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0cG9zID0gKG9sZEluZGV4IDwgcG9zKSA/IG9sZEluZGV4IDogLTEgLy8gYmVjb21lcyAtMSBpZiBub2RlcyB3ZXJlIHJlLW9yZGVyZWRcblx0XHRcdFx0XHRcdFx0b2xkSW5kaWNlc1tpLXN0YXJ0XSA9IG9sZEluZGV4XG5cdFx0XHRcdFx0XHRcdG9lID0gb2xkW29sZEluZGV4XVxuXHRcdFx0XHRcdFx0XHRvbGRbb2xkSW5kZXhdID0gbnVsbFxuXHRcdFx0XHRcdFx0XHRpZiAob2UgIT09IHZlKSB1cGRhdGVOb2RlKHBhcmVudCwgb2UsIHZlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdFx0XHRpZiAodmUuZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gdmUuZG9tXG5cdFx0XHRcdFx0XHRcdG1hdGNoZWQrK1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRuZXh0U2libGluZyA9IG9yaWdpbmFsTmV4dFNpYmxpbmdcblx0XHRcdFx0XHRpZiAobWF0Y2hlZCAhPT0gb2xkRW5kIC0gb2xkU3RhcnQgKyAxKSByZW1vdmVOb2RlcyhwYXJlbnQsIG9sZCwgb2xkU3RhcnQsIG9sZEVuZCArIDEpXG5cdFx0XHRcdFx0aWYgKG1hdGNoZWQgPT09IDApIGNyZWF0ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCBzdGFydCwgZW5kICsgMSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChwb3MgPT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdC8vIHRoZSBpbmRpY2VzIG9mIHRoZSBpbmRpY2VzIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBwYXJ0IG9mIHRoZVxuXHRcdFx0XHRcdFx0XHQvLyBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UgaW4gdGhlIG9sZEluZGljZXMgbGlzdFxuXHRcdFx0XHRcdFx0XHRsaXNJbmRpY2VzID0gbWFrZUxpc0luZGljZXMob2xkSW5kaWNlcylcblx0XHRcdFx0XHRcdFx0bGkgPSBsaXNJbmRpY2VzLmxlbmd0aCAtIDFcblx0XHRcdFx0XHRcdFx0Zm9yIChpID0gZW5kOyBpID49IHN0YXJ0OyBpLS0pIHtcblx0XHRcdFx0XHRcdFx0XHR2ID0gdm5vZGVzW2ldXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG9sZEluZGljZXNbaS1zdGFydF0gPT09IC0xKSBjcmVhdGVOb2RlKHBhcmVudCwgdiwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChsaXNJbmRpY2VzW2xpXSA9PT0gaSAtIHN0YXJ0KSBsaS0tXG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIG1vdmVOb2RlcyhwYXJlbnQsIHYsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZiAodi5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2bm9kZXNbaV0uZG9tXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGZvciAoaSA9IGVuZDsgaSA+PSBzdGFydDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRcdFx0diA9IHZub2Rlc1tpXVxuXHRcdFx0XHRcdFx0XHRcdGlmIChvbGRJbmRpY2VzW2ktc3RhcnRdID09PSAtMSkgY3JlYXRlTm9kZShwYXJlbnQsIHYsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHYuZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gdm5vZGVzW2ldLmRvbVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZU5vZGUocGFyZW50LCBvbGQsIHZub2RlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKSB7XG5cdFx0dmFyIG9sZFRhZyA9IG9sZC50YWcsIHRhZyA9IHZub2RlLnRhZ1xuXHRcdGlmIChvbGRUYWcgPT09IHRhZykge1xuXHRcdFx0dm5vZGUuc3RhdGUgPSBvbGQuc3RhdGVcblx0XHRcdHZub2RlLmV2ZW50cyA9IG9sZC5ldmVudHNcblx0XHRcdGlmIChzaG91bGROb3RVcGRhdGUodm5vZGUsIG9sZCkpIHJldHVyblxuXHRcdFx0aWYgKHR5cGVvZiBvbGRUYWcgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwpIHtcblx0XHRcdFx0XHR1cGRhdGVMaWZlY3ljbGUodm5vZGUuYXR0cnMsIHZub2RlLCBob29rcylcblx0XHRcdFx0fVxuXHRcdFx0XHRzd2l0Y2ggKG9sZFRhZykge1xuXHRcdFx0XHRcdGNhc2UgXCIjXCI6IHVwZGF0ZVRleHQob2xkLCB2bm9kZSk7IGJyZWFrXG5cdFx0XHRcdFx0Y2FzZSBcIjxcIjogdXBkYXRlSFRNTChwYXJlbnQsIG9sZCwgdm5vZGUsIG5zLCBuZXh0U2libGluZyk7IGJyZWFrXG5cdFx0XHRcdFx0Y2FzZSBcIltcIjogdXBkYXRlRnJhZ21lbnQocGFyZW50LCBvbGQsIHZub2RlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKTsgYnJlYWtcblx0XHRcdFx0XHRkZWZhdWx0OiB1cGRhdGVFbGVtZW50KG9sZCwgdm5vZGUsIGhvb2tzLCBucylcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB1cGRhdGVDb21wb25lbnQocGFyZW50LCBvbGQsIHZub2RlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJlbW92ZU5vZGUocGFyZW50LCBvbGQpXG5cdFx0XHRjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZVRleHQob2xkLCB2bm9kZSkge1xuXHRcdGlmIChvbGQuY2hpbGRyZW4udG9TdHJpbmcoKSAhPT0gdm5vZGUuY2hpbGRyZW4udG9TdHJpbmcoKSkge1xuXHRcdFx0b2xkLmRvbS5ub2RlVmFsdWUgPSB2bm9kZS5jaGlsZHJlblxuXHRcdH1cblx0XHR2bm9kZS5kb20gPSBvbGQuZG9tXG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlSFRNTChwYXJlbnQsIG9sZCwgdm5vZGUsIG5zLCBuZXh0U2libGluZykge1xuXHRcdGlmIChvbGQuY2hpbGRyZW4gIT09IHZub2RlLmNoaWxkcmVuKSB7XG5cdFx0XHRyZW1vdmVIVE1MKHBhcmVudCwgb2xkKVxuXHRcdFx0Y3JlYXRlSFRNTChwYXJlbnQsIHZub2RlLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dm5vZGUuZG9tID0gb2xkLmRvbVxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IG9sZC5kb21TaXplXG5cdFx0XHR2bm9kZS5pbnN0YW5jZSA9IG9sZC5pbnN0YW5jZVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVGcmFnbWVudChwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHR1cGRhdGVOb2RlcyhwYXJlbnQsIG9sZC5jaGlsZHJlbiwgdm5vZGUuY2hpbGRyZW4sIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0dmFyIGRvbVNpemUgPSAwLCBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0dm5vZGUuZG9tID0gbnVsbFxuXHRcdGlmIChjaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG5cdFx0XHRcdGlmIChjaGlsZCAhPSBudWxsICYmIGNoaWxkLmRvbSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0aWYgKHZub2RlLmRvbSA9PSBudWxsKSB2bm9kZS5kb20gPSBjaGlsZC5kb21cblx0XHRcdFx0XHRkb21TaXplICs9IGNoaWxkLmRvbVNpemUgfHwgMVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoZG9tU2l6ZSAhPT0gMSkgdm5vZGUuZG9tU2l6ZSA9IGRvbVNpemVcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlRWxlbWVudChvbGQsIHZub2RlLCBob29rcywgbnMpIHtcblx0XHR2YXIgZWxlbWVudCA9IHZub2RlLmRvbSA9IG9sZC5kb21cblx0XHRucyA9IGdldE5hbWVTcGFjZSh2bm9kZSkgfHwgbnNcblxuXHRcdGlmICh2bm9kZS50YWcgPT09IFwidGV4dGFyZWFcIikge1xuXHRcdFx0aWYgKHZub2RlLmF0dHJzID09IG51bGwpIHZub2RlLmF0dHJzID0ge31cblx0XHRcdGlmICh2bm9kZS50ZXh0ICE9IG51bGwpIHtcblx0XHRcdFx0dm5vZGUuYXR0cnMudmFsdWUgPSB2bm9kZS50ZXh0IC8vRklYTUUgaGFuZGxlIG11bHRpcGxlIGNoaWxkcmVuXG5cdFx0XHRcdHZub2RlLnRleHQgPSB1bmRlZmluZWRcblx0XHRcdH1cblx0XHR9XG5cdFx0dXBkYXRlQXR0cnModm5vZGUsIG9sZC5hdHRycywgdm5vZGUuYXR0cnMsIG5zKVxuXHRcdGlmICghbWF5YmVTZXRDb250ZW50RWRpdGFibGUodm5vZGUpKSB7XG5cdFx0XHRpZiAob2xkLnRleHQgIT0gbnVsbCAmJiB2bm9kZS50ZXh0ICE9IG51bGwgJiYgdm5vZGUudGV4dCAhPT0gXCJcIikge1xuXHRcdFx0XHRpZiAob2xkLnRleHQudG9TdHJpbmcoKSAhPT0gdm5vZGUudGV4dC50b1N0cmluZygpKSBvbGQuZG9tLmZpcnN0Q2hpbGQubm9kZVZhbHVlID0gdm5vZGUudGV4dFxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmIChvbGQudGV4dCAhPSBudWxsKSBvbGQuY2hpbGRyZW4gPSBbVm5vZGUoXCIjXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBvbGQudGV4dCwgdW5kZWZpbmVkLCBvbGQuZG9tLmZpcnN0Q2hpbGQpXVxuXHRcdFx0XHRpZiAodm5vZGUudGV4dCAhPSBudWxsKSB2bm9kZS5jaGlsZHJlbiA9IFtWbm9kZShcIiNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHZub2RlLnRleHQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKV1cblx0XHRcdFx0dXBkYXRlTm9kZXMoZWxlbWVudCwgb2xkLmNoaWxkcmVuLCB2bm9kZS5jaGlsZHJlbiwgaG9va3MsIG51bGwsIG5zKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVDb21wb25lbnQocGFyZW50LCBvbGQsIHZub2RlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKSB7XG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBWbm9kZS5ub3JtYWxpemUoY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS52aWV3LCB2bm9kZSkpXG5cdFx0aWYgKHZub2RlLmluc3RhbmNlID09PSB2bm9kZSkgdGhyb3cgRXJyb3IoXCJBIHZpZXcgY2Fubm90IHJldHVybiB0aGUgdm5vZGUgaXQgcmVjZWl2ZWQgYXMgYXJndW1lbnRcIilcblx0XHR1cGRhdGVMaWZlY3ljbGUodm5vZGUuc3RhdGUsIHZub2RlLCBob29rcylcblx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCkgdXBkYXRlTGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MpXG5cdFx0aWYgKHZub2RlLmluc3RhbmNlICE9IG51bGwpIHtcblx0XHRcdGlmIChvbGQuaW5zdGFuY2UgPT0gbnVsbCkgY3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLmluc3RhbmNlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0ZWxzZSB1cGRhdGVOb2RlKHBhcmVudCwgb2xkLmluc3RhbmNlLCB2bm9kZS5pbnN0YW5jZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdHZub2RlLmRvbSA9IHZub2RlLmluc3RhbmNlLmRvbVxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IHZub2RlLmluc3RhbmNlLmRvbVNpemVcblx0XHR9XG5cdFx0ZWxzZSBpZiAob2xkLmluc3RhbmNlICE9IG51bGwpIHtcblx0XHRcdHJlbW92ZU5vZGUocGFyZW50LCBvbGQuaW5zdGFuY2UpXG5cdFx0XHR2bm9kZS5kb20gPSB1bmRlZmluZWRcblx0XHRcdHZub2RlLmRvbVNpemUgPSAwXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dm5vZGUuZG9tID0gb2xkLmRvbVxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IG9sZC5kb21TaXplXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGdldEtleU1hcCh2bm9kZXMsIHN0YXJ0LCBlbmQpIHtcblx0XHR2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXHRcdGZvciAoOyBzdGFydCA8IGVuZDsgc3RhcnQrKykge1xuXHRcdFx0dmFyIHZub2RlID0gdm5vZGVzW3N0YXJ0XVxuXHRcdFx0aWYgKHZub2RlICE9IG51bGwpIHtcblx0XHRcdFx0dmFyIGtleSA9IHZub2RlLmtleVxuXHRcdFx0XHRpZiAoa2V5ICE9IG51bGwpIG1hcFtrZXldID0gc3RhcnRcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG1hcFxuXHR9XG5cdC8vIExpZnRlZCBmcm9tIGl2aSBodHRwczovL2dpdGh1Yi5jb20vaXZpanMvaXZpL1xuXHQvLyB0YWtlcyBhIGxpc3Qgb2YgdW5pcXVlIG51bWJlcnMgKC0xIGlzIHNwZWNpYWwgYW5kIGNhblxuXHQvLyBvY2N1ciBtdWx0aXBsZSB0aW1lcykgYW5kIHJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgaW5kaWNlc1xuXHQvLyBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgcGFydCBvZiB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nXG5cdC8vIHN1YnNlcXVlY2Vcblx0dmFyIGxpc1RlbXAgPSBbXVxuXHRmdW5jdGlvbiBtYWtlTGlzSW5kaWNlcyhhKSB7XG5cdFx0dmFyIHJlc3VsdCA9IFswXVxuXHRcdHZhciB1ID0gMCwgdiA9IDAsIGkgPSAwXG5cdFx0dmFyIGlsID0gbGlzVGVtcC5sZW5ndGggPSBhLmxlbmd0aFxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWw7IGkrKykgbGlzVGVtcFtpXSA9IGFbaV1cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGlsOyArK2kpIHtcblx0XHRcdGlmIChhW2ldID09PSAtMSkgY29udGludWVcblx0XHRcdHZhciBqID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXVxuXHRcdFx0aWYgKGFbal0gPCBhW2ldKSB7XG5cdFx0XHRcdGxpc1RlbXBbaV0gPSBqXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGkpXG5cdFx0XHRcdGNvbnRpbnVlXG5cdFx0XHR9XG5cdFx0XHR1ID0gMFxuXHRcdFx0diA9IHJlc3VsdC5sZW5ndGggLSAxXG5cdFx0XHR3aGlsZSAodSA8IHYpIHtcblx0XHRcdFx0Ly8gRmFzdCBpbnRlZ2VyIGF2ZXJhZ2Ugd2l0aG91dCBvdmVyZmxvdy5cblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0dmFyIGMgPSAodSA+Pj4gMSkgKyAodiA+Pj4gMSkgKyAodSAmIHYgJiAxKVxuXHRcdFx0XHRpZiAoYVtyZXN1bHRbY11dIDwgYVtpXSkge1xuXHRcdFx0XHRcdHUgPSBjICsgMVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHYgPSBjXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChhW2ldIDwgYVtyZXN1bHRbdV1dKSB7XG5cdFx0XHRcdGlmICh1ID4gMCkgbGlzVGVtcFtpXSA9IHJlc3VsdFt1IC0gMV1cblx0XHRcdFx0cmVzdWx0W3VdID0gaVxuXHRcdFx0fVxuXHRcdH1cblx0XHR1ID0gcmVzdWx0Lmxlbmd0aFxuXHRcdHYgPSByZXN1bHRbdSAtIDFdXG5cdFx0d2hpbGUgKHUtLSA+IDApIHtcblx0XHRcdHJlc3VsdFt1XSA9IHZcblx0XHRcdHYgPSBsaXNUZW1wW3ZdXG5cdFx0fVxuXHRcdGxpc1RlbXAubGVuZ3RoID0gMFxuXHRcdHJldHVybiByZXN1bHRcblx0fVxuXG5cdGZ1bmN0aW9uIGdldE5leHRTaWJsaW5nKHZub2RlcywgaSwgbmV4dFNpYmxpbmcpIHtcblx0XHRmb3IgKDsgaSA8IHZub2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHZub2Rlc1tpXSAhPSBudWxsICYmIHZub2Rlc1tpXS5kb20gIT0gbnVsbCkgcmV0dXJuIHZub2Rlc1tpXS5kb21cblx0XHR9XG5cdFx0cmV0dXJuIG5leHRTaWJsaW5nXG5cdH1cblxuXHQvLyBUaGlzIGNvdmVycyBhIHJlYWxseSBzcGVjaWZpYyBlZGdlIGNhc2U6XG5cdC8vIC0gUGFyZW50IG5vZGUgaXMga2V5ZWQgYW5kIGNvbnRhaW5zIGNoaWxkXG5cdC8vIC0gQ2hpbGQgaXMgcmVtb3ZlZCwgcmV0dXJucyB1bnJlc29sdmVkIHByb21pc2UgaW4gYG9uYmVmb3JlcmVtb3ZlYFxuXHQvLyAtIFBhcmVudCBub2RlIGlzIG1vdmVkIGluIGtleWVkIGRpZmZcblx0Ly8gLSBSZW1haW5pbmcgY2hpbGRyZW4gc3RpbGwgbmVlZCBtb3ZlZCBhcHByb3ByaWF0ZWx5XG5cdC8vXG5cdC8vIElkZWFsbHksIEknZCB0cmFjayByZW1vdmVkIG5vZGVzIGFzIHdlbGwsIGJ1dCB0aGF0IGludHJvZHVjZXMgYSBsb3QgbW9yZVxuXHQvLyBjb21wbGV4aXR5IGFuZCBJJ20gbm90IGV4YWN0bHkgaW50ZXJlc3RlZCBpbiBkb2luZyB0aGF0LlxuXHRmdW5jdGlvbiBtb3ZlTm9kZXMocGFyZW50LCB2bm9kZSwgbmV4dFNpYmxpbmcpIHtcblx0XHR2YXIgZnJhZyA9ICRkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG5cdFx0bW92ZUNoaWxkVG9GcmFnKHBhcmVudCwgZnJhZywgdm5vZGUpXG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIGZyYWcsIG5leHRTaWJsaW5nKVxuXHR9XG5cdGZ1bmN0aW9uIG1vdmVDaGlsZFRvRnJhZyhwYXJlbnQsIGZyYWcsIHZub2RlKSB7XG5cdFx0Ly8gRG9kZ2UgdGhlIHJlY3Vyc2lvbiBvdmVyaGVhZCBpbiBhIGZldyBvZiB0aGUgbW9zdCBjb21tb24gY2FzZXMuXG5cdFx0d2hpbGUgKHZub2RlLmRvbSAhPSBudWxsICYmIHZub2RlLmRvbS5wYXJlbnROb2RlID09PSBwYXJlbnQpIHtcblx0XHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdHZub2RlID0gdm5vZGUuaW5zdGFuY2Vcblx0XHRcdFx0aWYgKHZub2RlICE9IG51bGwpIGNvbnRpbnVlXG5cdFx0XHR9IGVsc2UgaWYgKHZub2RlLnRhZyA9PT0gXCI8XCIpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZS5pbnN0YW5jZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGZyYWcuYXBwZW5kQ2hpbGQodm5vZGUuaW5zdGFuY2VbaV0pXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodm5vZGUudGFnICE9PSBcIltcIikge1xuXHRcdFx0XHQvLyBEb24ndCByZWN1cnNlIGZvciB0ZXh0IG5vZGVzICpvciogZWxlbWVudHMsIGp1c3QgZnJhZ21lbnRzXG5cdFx0XHRcdGZyYWcuYXBwZW5kQ2hpbGQodm5vZGUuZG9tKVxuXHRcdFx0fSBlbHNlIGlmICh2bm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0dm5vZGUgPSB2bm9kZS5jaGlsZHJlblswXVxuXHRcdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkgY29udGludWVcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgY2hpbGQgPSB2bm9kZS5jaGlsZHJlbltpXVxuXHRcdFx0XHRcdGlmIChjaGlsZCAhPSBudWxsKSBtb3ZlQ2hpbGRUb0ZyYWcocGFyZW50LCBmcmFnLCBjaGlsZClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBpbnNlcnROb2RlKHBhcmVudCwgZG9tLCBuZXh0U2libGluZykge1xuXHRcdGlmIChuZXh0U2libGluZyAhPSBudWxsKSBwYXJlbnQuaW5zZXJ0QmVmb3JlKGRvbSwgbmV4dFNpYmxpbmcpXG5cdFx0ZWxzZSBwYXJlbnQuYXBwZW5kQ2hpbGQoZG9tKVxuXHR9XG5cblx0ZnVuY3Rpb24gbWF5YmVTZXRDb250ZW50RWRpdGFibGUodm5vZGUpIHtcblx0XHRpZiAodm5vZGUuYXR0cnMgPT0gbnVsbCB8fCAoXG5cdFx0XHR2bm9kZS5hdHRycy5jb250ZW50ZWRpdGFibGUgPT0gbnVsbCAmJiAvLyBhdHRyaWJ1dGVcblx0XHRcdHZub2RlLmF0dHJzLmNvbnRlbnRFZGl0YWJsZSA9PSBudWxsIC8vIHByb3BlcnR5XG5cdFx0KSkgcmV0dXJuIGZhbHNlXG5cdFx0dmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHRpZiAoY2hpbGRyZW4gIT0gbnVsbCAmJiBjaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgY2hpbGRyZW5bMF0udGFnID09PSBcIjxcIikge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjaGlsZHJlblswXS5jaGlsZHJlblxuXHRcdFx0aWYgKHZub2RlLmRvbS5pbm5lckhUTUwgIT09IGNvbnRlbnQpIHZub2RlLmRvbS5pbm5lckhUTUwgPSBjb250ZW50XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHZub2RlLnRleHQgIT0gbnVsbCB8fCBjaGlsZHJlbiAhPSBudWxsICYmIGNoaWxkcmVuLmxlbmd0aCAhPT0gMCkgdGhyb3cgbmV3IEVycm9yKFwiQ2hpbGQgbm9kZSBvZiBhIGNvbnRlbnRlZGl0YWJsZSBtdXN0IGJlIHRydXN0ZWRcIilcblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG5cblx0Ly9yZW1vdmVcblx0ZnVuY3Rpb24gcmVtb3ZlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQpIHtcblx0XHRmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0dmFyIHZub2RlID0gdm5vZGVzW2ldXG5cdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkgcmVtb3ZlTm9kZShwYXJlbnQsIHZub2RlKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiByZW1vdmVOb2RlKHBhcmVudCwgdm5vZGUpIHtcblx0XHR2YXIgbWFzayA9IDBcblx0XHR2YXIgb3JpZ2luYWwgPSB2bm9kZS5zdGF0ZVxuXHRcdHZhciBzdGF0ZVJlc3VsdCwgYXR0cnNSZXN1bHRcblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Ygdm5vZGUuc3RhdGUub25iZWZvcmVyZW1vdmUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGNhbGxIb29rLmNhbGwodm5vZGUuc3RhdGUub25iZWZvcmVyZW1vdmUsIHZub2RlKVxuXHRcdFx0aWYgKHJlc3VsdCAhPSBudWxsICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdG1hc2sgPSAxXG5cdFx0XHRcdHN0YXRlUmVzdWx0ID0gcmVzdWx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh2bm9kZS5hdHRycyAmJiB0eXBlb2Ygdm5vZGUuYXR0cnMub25iZWZvcmVyZW1vdmUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGNhbGxIb29rLmNhbGwodm5vZGUuYXR0cnMub25iZWZvcmVyZW1vdmUsIHZub2RlKVxuXHRcdFx0aWYgKHJlc3VsdCAhPSBudWxsICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHRcdG1hc2sgfD0gMlxuXHRcdFx0XHRhdHRyc1Jlc3VsdCA9IHJlc3VsdFxuXHRcdFx0fVxuXHRcdH1cblx0XHRjaGVja1N0YXRlKHZub2RlLCBvcmlnaW5hbClcblxuXHRcdC8vIElmIHdlIGNhbiwgdHJ5IHRvIGZhc3QtcGF0aCBpdCBhbmQgYXZvaWQgYWxsIHRoZSBvdmVyaGVhZCBvZiBhd2FpdGluZ1xuXHRcdGlmICghbWFzaykge1xuXHRcdFx0b25yZW1vdmUodm5vZGUpXG5cdFx0XHRyZW1vdmVDaGlsZChwYXJlbnQsIHZub2RlKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoc3RhdGVSZXN1bHQgIT0gbnVsbCkge1xuXHRcdFx0XHR2YXIgbmV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHRcdGlmIChtYXNrICYgMSkgeyBtYXNrICY9IDI7IGlmICghbWFzaykgcmVhbGx5UmVtb3ZlKCkgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdHN0YXRlUmVzdWx0LnRoZW4obmV4dCwgbmV4dClcblx0XHRcdH1cblx0XHRcdGlmIChhdHRyc1Jlc3VsdCAhPSBudWxsKSB7XG5cdFx0XHRcdHZhciBuZXh0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHRcdFx0aWYgKG1hc2sgJiAyKSB7IG1hc2sgJj0gMTsgaWYgKCFtYXNrKSByZWFsbHlSZW1vdmUoKSB9XG5cdFx0XHRcdH1cblx0XHRcdFx0YXR0cnNSZXN1bHQudGhlbihuZXh0LCBuZXh0KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlYWxseVJlbW92ZSgpIHtcblx0XHRcdGNoZWNrU3RhdGUodm5vZGUsIG9yaWdpbmFsKVxuXHRcdFx0b25yZW1vdmUodm5vZGUpXG5cdFx0XHRyZW1vdmVDaGlsZChwYXJlbnQsIHZub2RlKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiByZW1vdmVIVE1MKHBhcmVudCwgdm5vZGUpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZub2RlLmluc3RhbmNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRwYXJlbnQucmVtb3ZlQ2hpbGQodm5vZGUuaW5zdGFuY2VbaV0pXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHJlbW92ZUNoaWxkKHBhcmVudCwgdm5vZGUpIHtcblx0XHQvLyBEb2RnZSB0aGUgcmVjdXJzaW9uIG92ZXJoZWFkIGluIGEgZmV3IG9mIHRoZSBtb3N0IGNvbW1vbiBjYXNlcy5cblx0XHR3aGlsZSAodm5vZGUuZG9tICE9IG51bGwgJiYgdm5vZGUuZG9tLnBhcmVudE5vZGUgPT09IHBhcmVudCkge1xuXHRcdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcgIT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0dm5vZGUgPSB2bm9kZS5pbnN0YW5jZVxuXHRcdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkgY29udGludWVcblx0XHRcdH0gZWxzZSBpZiAodm5vZGUudGFnID09PSBcIjxcIikge1xuXHRcdFx0XHRyZW1vdmVIVE1MKHBhcmVudCwgdm5vZGUpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodm5vZGUudGFnICE9PSBcIltcIikge1xuXHRcdFx0XHRcdHBhcmVudC5yZW1vdmVDaGlsZCh2bm9kZS5kb20pXG5cdFx0XHRcdFx0aWYgKCFBcnJheS5pc0FycmF5KHZub2RlLmNoaWxkcmVuKSkgYnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodm5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dm5vZGUgPSB2bm9kZS5jaGlsZHJlblswXVxuXHRcdFx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSBjb250aW51ZVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHZhciBjaGlsZCA9IHZub2RlLmNoaWxkcmVuW2ldXG5cdFx0XHRcdFx0XHRpZiAoY2hpbGQgIT0gbnVsbCkgcmVtb3ZlQ2hpbGQocGFyZW50LCBjaGlsZClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIG9ucmVtb3ZlKHZub2RlKSB7XG5cdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcgIT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHZub2RlLnN0YXRlLm9ucmVtb3ZlID09PSBcImZ1bmN0aW9uXCIpIGNhbGxIb29rLmNhbGwodm5vZGUuc3RhdGUub25yZW1vdmUsIHZub2RlKVxuXHRcdGlmICh2bm9kZS5hdHRycyAmJiB0eXBlb2Ygdm5vZGUuYXR0cnMub25yZW1vdmUgPT09IFwiZnVuY3Rpb25cIikgY2FsbEhvb2suY2FsbCh2bm9kZS5hdHRycy5vbnJlbW92ZSwgdm5vZGUpXG5cdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcgIT09IFwic3RyaW5nXCIpIHtcblx0XHRcdGlmICh2bm9kZS5pbnN0YW5jZSAhPSBudWxsKSBvbnJlbW92ZSh2bm9kZS5pbnN0YW5jZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dmFyIGNoaWxkID0gY2hpbGRyZW5baV1cblx0XHRcdFx0XHRpZiAoY2hpbGQgIT0gbnVsbCkgb25yZW1vdmUoY2hpbGQpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvL2F0dHJzXG5cdGZ1bmN0aW9uIHNldEF0dHJzKHZub2RlLCBhdHRycywgbnMpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gYXR0cnMpIHtcblx0XHRcdHNldEF0dHIodm5vZGUsIGtleSwgbnVsbCwgYXR0cnNba2V5XSwgbnMpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHNldEF0dHIodm5vZGUsIGtleSwgb2xkLCB2YWx1ZSwgbnMpIHtcblx0XHRpZiAoa2V5ID09PSBcImtleVwiIHx8IGtleSA9PT0gXCJpc1wiIHx8IHZhbHVlID09IG51bGwgfHwgaXNMaWZlY3ljbGVNZXRob2Qoa2V5KSB8fCAob2xkID09PSB2YWx1ZSAmJiAhaXNGb3JtQXR0cmlidXRlKHZub2RlLCBrZXkpKSAmJiB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVyblxuXHRcdGlmIChrZXlbMF0gPT09IFwib1wiICYmIGtleVsxXSA9PT0gXCJuXCIpIHJldHVybiB1cGRhdGVFdmVudCh2bm9kZSwga2V5LCB2YWx1ZSlcblx0XHRpZiAoa2V5LnNsaWNlKDAsIDYpID09PSBcInhsaW5rOlwiKSB2bm9kZS5kb20uc2V0QXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsIGtleS5zbGljZSg2KSwgdmFsdWUpXG5cdFx0ZWxzZSBpZiAoa2V5ID09PSBcInN0eWxlXCIpIHVwZGF0ZVN0eWxlKHZub2RlLmRvbSwgb2xkLCB2YWx1ZSlcblx0XHRlbHNlIGlmIChoYXNQcm9wZXJ0eUtleSh2bm9kZSwga2V5LCBucykpIHtcblx0XHRcdGlmIChrZXkgPT09IFwidmFsdWVcIikge1xuXHRcdFx0XHQvLyBPbmx5IGRvIHRoZSBjb2VyY2lvbiBpZiB3ZSdyZSBhY3R1YWxseSBnb2luZyB0byBjaGVjayB0aGUgdmFsdWUuXG5cdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWltcGxpY2l0LWNvZXJjaW9uICovXG5cdFx0XHRcdC8vc2V0dGluZyBpbnB1dFt2YWx1ZV0gdG8gc2FtZSB2YWx1ZSBieSB0eXBpbmcgb24gZm9jdXNlZCBlbGVtZW50IG1vdmVzIGN1cnNvciB0byBlbmQgaW4gQ2hyb21lXG5cdFx0XHRcdGlmICgodm5vZGUudGFnID09PSBcImlucHV0XCIgfHwgdm5vZGUudGFnID09PSBcInRleHRhcmVhXCIpICYmIHZub2RlLmRvbS52YWx1ZSA9PT0gXCJcIiArIHZhbHVlICYmIHZub2RlLmRvbSA9PT0gYWN0aXZlRWxlbWVudCgpKSByZXR1cm5cblx0XHRcdFx0Ly9zZXR0aW5nIHNlbGVjdFt2YWx1ZV0gdG8gc2FtZSB2YWx1ZSB3aGlsZSBoYXZpbmcgc2VsZWN0IG9wZW4gYmxpbmtzIHNlbGVjdCBkcm9wZG93biBpbiBDaHJvbWVcblx0XHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJzZWxlY3RcIiAmJiBvbGQgIT09IG51bGwgJiYgdm5vZGUuZG9tLnZhbHVlID09PSBcIlwiICsgdmFsdWUpIHJldHVyblxuXHRcdFx0XHQvL3NldHRpbmcgb3B0aW9uW3ZhbHVlXSB0byBzYW1lIHZhbHVlIHdoaWxlIGhhdmluZyBzZWxlY3Qgb3BlbiBibGlua3Mgc2VsZWN0IGRyb3Bkb3duIGluIENocm9tZVxuXHRcdFx0XHRpZiAodm5vZGUudGFnID09PSBcIm9wdGlvblwiICYmIG9sZCAhPT0gbnVsbCAmJiB2bm9kZS5kb20udmFsdWUgPT09IFwiXCIgKyB2YWx1ZSkgcmV0dXJuXG5cdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8taW1wbGljaXQtY29lcmNpb24gKi9cblx0XHRcdH1cblx0XHRcdC8vIElmIHlvdSBhc3NpZ24gYW4gaW5wdXQgdHlwZSB0aGF0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgSUUgMTEgd2l0aCBhbiBhc3NpZ25tZW50IGV4cHJlc3Npb24sIGFuIGVycm9yIHdpbGwgb2NjdXIuXG5cdFx0XHRpZiAodm5vZGUudGFnID09PSBcImlucHV0XCIgJiYga2V5ID09PSBcInR5cGVcIikgdm5vZGUuZG9tLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXHRcdFx0ZWxzZSB2bm9kZS5kb21ba2V5XSA9IHZhbHVlXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSkgdm5vZGUuZG9tLnNldEF0dHJpYnV0ZShrZXksIFwiXCIpXG5cdFx0XHRcdGVsc2Ugdm5vZGUuZG9tLnJlbW92ZUF0dHJpYnV0ZShrZXkpXG5cdFx0XHR9XG5cdFx0XHRlbHNlIHZub2RlLmRvbS5zZXRBdHRyaWJ1dGUoa2V5ID09PSBcImNsYXNzTmFtZVwiID8gXCJjbGFzc1wiIDoga2V5LCB2YWx1ZSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcmVtb3ZlQXR0cih2bm9kZSwga2V5LCBvbGQsIG5zKSB7XG5cdFx0aWYgKGtleSA9PT0gXCJrZXlcIiB8fCBrZXkgPT09IFwiaXNcIiB8fCBvbGQgPT0gbnVsbCB8fCBpc0xpZmVjeWNsZU1ldGhvZChrZXkpKSByZXR1cm5cblx0XHRpZiAoa2V5WzBdID09PSBcIm9cIiAmJiBrZXlbMV0gPT09IFwiblwiICYmICFpc0xpZmVjeWNsZU1ldGhvZChrZXkpKSB1cGRhdGVFdmVudCh2bm9kZSwga2V5LCB1bmRlZmluZWQpXG5cdFx0ZWxzZSBpZiAoa2V5ID09PSBcInN0eWxlXCIpIHVwZGF0ZVN0eWxlKHZub2RlLmRvbSwgb2xkLCBudWxsKVxuXHRcdGVsc2UgaWYgKFxuXHRcdFx0aGFzUHJvcGVydHlLZXkodm5vZGUsIGtleSwgbnMpXG5cdFx0XHQmJiBrZXkgIT09IFwiY2xhc3NOYW1lXCJcblx0XHRcdCYmICEoa2V5ID09PSBcInZhbHVlXCIgJiYgKFxuXHRcdFx0XHR2bm9kZS50YWcgPT09IFwib3B0aW9uXCJcblx0XHRcdFx0fHwgdm5vZGUudGFnID09PSBcInNlbGVjdFwiICYmIHZub2RlLmRvbS5zZWxlY3RlZEluZGV4ID09PSAtMSAmJiB2bm9kZS5kb20gPT09IGFjdGl2ZUVsZW1lbnQoKVxuXHRcdFx0KSlcblx0XHRcdCYmICEodm5vZGUudGFnID09PSBcImlucHV0XCIgJiYga2V5ID09PSBcInR5cGVcIilcblx0XHQpIHtcblx0XHRcdHZub2RlLmRvbVtrZXldID0gbnVsbFxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgbnNMYXN0SW5kZXggPSBrZXkuaW5kZXhPZihcIjpcIilcblx0XHRcdGlmIChuc0xhc3RJbmRleCAhPT0gLTEpIGtleSA9IGtleS5zbGljZShuc0xhc3RJbmRleCArIDEpXG5cdFx0XHRpZiAob2xkICE9PSBmYWxzZSkgdm5vZGUuZG9tLnJlbW92ZUF0dHJpYnV0ZShrZXkgPT09IFwiY2xhc3NOYW1lXCIgPyBcImNsYXNzXCIgOiBrZXkpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHNldExhdGVTZWxlY3RBdHRycyh2bm9kZSwgYXR0cnMpIHtcblx0XHRpZiAoXCJ2YWx1ZVwiIGluIGF0dHJzKSB7XG5cdFx0XHRpZihhdHRycy52YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRpZiAodm5vZGUuZG9tLnNlbGVjdGVkSW5kZXggIT09IC0xKSB2bm9kZS5kb20udmFsdWUgPSBudWxsXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgbm9ybWFsaXplZCA9IFwiXCIgKyBhdHRycy52YWx1ZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWltcGxpY2l0LWNvZXJjaW9uXG5cdFx0XHRcdGlmICh2bm9kZS5kb20udmFsdWUgIT09IG5vcm1hbGl6ZWQgfHwgdm5vZGUuZG9tLnNlbGVjdGVkSW5kZXggPT09IC0xKSB7XG5cdFx0XHRcdFx0dm5vZGUuZG9tLnZhbHVlID0gbm9ybWFsaXplZFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChcInNlbGVjdGVkSW5kZXhcIiBpbiBhdHRycykgc2V0QXR0cih2bm9kZSwgXCJzZWxlY3RlZEluZGV4XCIsIG51bGwsIGF0dHJzLnNlbGVjdGVkSW5kZXgsIHVuZGVmaW5lZClcblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVBdHRycyh2bm9kZSwgb2xkLCBhdHRycywgbnMpIHtcblx0XHRpZiAoYXR0cnMgIT0gbnVsbCkge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG5cdFx0XHRcdHNldEF0dHIodm5vZGUsIGtleSwgb2xkICYmIG9sZFtrZXldLCBhdHRyc1trZXldLCBucylcblx0XHRcdH1cblx0XHR9XG5cdFx0dmFyIHZhbFxuXHRcdGlmIChvbGQgIT0gbnVsbCkge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9sZCkge1xuXHRcdFx0XHRpZiAoKCh2YWwgPSBvbGRba2V5XSkgIT0gbnVsbCkgJiYgKGF0dHJzID09IG51bGwgfHwgYXR0cnNba2V5XSA9PSBudWxsKSkge1xuXHRcdFx0XHRcdHJlbW92ZUF0dHIodm5vZGUsIGtleSwgdmFsLCBucylcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBpc0Zvcm1BdHRyaWJ1dGUodm5vZGUsIGF0dHIpIHtcblx0XHRyZXR1cm4gYXR0ciA9PT0gXCJ2YWx1ZVwiIHx8IGF0dHIgPT09IFwiY2hlY2tlZFwiIHx8IGF0dHIgPT09IFwic2VsZWN0ZWRJbmRleFwiIHx8IGF0dHIgPT09IFwic2VsZWN0ZWRcIiAmJiB2bm9kZS5kb20gPT09IGFjdGl2ZUVsZW1lbnQoKSB8fCB2bm9kZS50YWcgPT09IFwib3B0aW9uXCIgJiYgdm5vZGUuZG9tLnBhcmVudE5vZGUgPT09ICRkb2MuYWN0aXZlRWxlbWVudFxuXHR9XG5cdGZ1bmN0aW9uIGlzTGlmZWN5Y2xlTWV0aG9kKGF0dHIpIHtcblx0XHRyZXR1cm4gYXR0ciA9PT0gXCJvbmluaXRcIiB8fCBhdHRyID09PSBcIm9uY3JlYXRlXCIgfHwgYXR0ciA9PT0gXCJvbnVwZGF0ZVwiIHx8IGF0dHIgPT09IFwib25yZW1vdmVcIiB8fCBhdHRyID09PSBcIm9uYmVmb3JlcmVtb3ZlXCIgfHwgYXR0ciA9PT0gXCJvbmJlZm9yZXVwZGF0ZVwiXG5cdH1cblx0ZnVuY3Rpb24gaGFzUHJvcGVydHlLZXkodm5vZGUsIGtleSwgbnMpIHtcblx0XHQvLyBGaWx0ZXIgb3V0IG5hbWVzcGFjZWQga2V5c1xuXHRcdHJldHVybiBucyA9PT0gdW5kZWZpbmVkICYmIChcblx0XHRcdC8vIElmIGl0J3MgYSBjdXN0b20gZWxlbWVudCwganVzdCBrZWVwIGl0LlxuXHRcdFx0dm5vZGUudGFnLmluZGV4T2YoXCItXCIpID4gLTEgfHwgdm5vZGUuYXR0cnMgIT0gbnVsbCAmJiB2bm9kZS5hdHRycy5pcyB8fFxuXHRcdFx0Ly8gSWYgaXQncyBhIG5vcm1hbCBlbGVtZW50LCBsZXQncyB0cnkgdG8gYXZvaWQgYSBmZXcgYnJvd3NlciBidWdzLlxuXHRcdFx0a2V5ICE9PSBcImhyZWZcIiAmJiBrZXkgIT09IFwibGlzdFwiICYmIGtleSAhPT0gXCJmb3JtXCIgJiYga2V5ICE9PSBcIndpZHRoXCIgJiYga2V5ICE9PSBcImhlaWdodFwiLy8gJiYga2V5ICE9PSBcInR5cGVcIlxuXHRcdFx0Ly8gRGVmZXIgdGhlIHByb3BlcnR5IGNoZWNrIHVudGlsICphZnRlciogd2UgY2hlY2sgZXZlcnl0aGluZy5cblx0XHQpICYmIGtleSBpbiB2bm9kZS5kb21cblx0fVxuXG5cdC8vc3R5bGVcblx0dmFyIHVwcGVyY2FzZVJlZ2V4ID0gL1tBLVpdL2dcblx0ZnVuY3Rpb24gdG9Mb3dlckNhc2UoY2FwaXRhbCkgeyByZXR1cm4gXCItXCIgKyBjYXBpdGFsLnRvTG93ZXJDYXNlKCkgfVxuXHRmdW5jdGlvbiBub3JtYWxpemVLZXkoa2V5KSB7XG5cdFx0cmV0dXJuIGtleVswXSA9PT0gXCItXCIgJiYga2V5WzFdID09PSBcIi1cIiA/IGtleSA6XG5cdFx0XHRrZXkgPT09IFwiY3NzRmxvYXRcIiA/IFwiZmxvYXRcIiA6XG5cdFx0XHRcdGtleS5yZXBsYWNlKHVwcGVyY2FzZVJlZ2V4LCB0b0xvd2VyQ2FzZSlcblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVTdHlsZShlbGVtZW50LCBvbGQsIHN0eWxlKSB7XG5cdFx0aWYgKG9sZCA9PT0gc3R5bGUpIHtcblx0XHRcdC8vIFN0eWxlcyBhcmUgZXF1aXZhbGVudCwgZG8gbm90aGluZy5cblx0XHR9IGVsc2UgaWYgKHN0eWxlID09IG51bGwpIHtcblx0XHRcdC8vIE5ldyBzdHlsZSBpcyBtaXNzaW5nLCBqdXN0IGNsZWFyIGl0LlxuXHRcdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gXCJcIlxuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHN0eWxlICE9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHQvLyBOZXcgc3R5bGUgaXMgYSBzdHJpbmcsIGxldCBlbmdpbmUgZGVhbCB3aXRoIHBhdGNoaW5nLlxuXHRcdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gc3R5bGVcblx0XHR9IGVsc2UgaWYgKG9sZCA9PSBudWxsIHx8IHR5cGVvZiBvbGQgIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdC8vIGBvbGRgIGlzIG1pc3Npbmcgb3IgYSBzdHJpbmcsIGBzdHlsZWAgaXMgYW4gb2JqZWN0LlxuXHRcdFx0ZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gXCJcIlxuXHRcdFx0Ly8gQWRkIG5ldyBzdHlsZSBwcm9wZXJ0aWVzXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gc3R5bGUpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gc3R5bGVba2V5XVxuXHRcdFx0XHRpZiAodmFsdWUgIT0gbnVsbCkgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShub3JtYWxpemVLZXkoa2V5KSwgU3RyaW5nKHZhbHVlKSlcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gQm90aCBvbGQgJiBuZXcgYXJlIChkaWZmZXJlbnQpIG9iamVjdHMuXG5cdFx0XHQvLyBVcGRhdGUgc3R5bGUgcHJvcGVydGllcyB0aGF0IGhhdmUgY2hhbmdlZFxuXHRcdFx0Zm9yICh2YXIga2V5IGluIHN0eWxlKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IHN0eWxlW2tleV1cblx0XHRcdFx0aWYgKHZhbHVlICE9IG51bGwgJiYgKHZhbHVlID0gU3RyaW5nKHZhbHVlKSkgIT09IFN0cmluZyhvbGRba2V5XSkpIHtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KG5vcm1hbGl6ZUtleShrZXkpLCB2YWx1ZSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gUmVtb3ZlIHN0eWxlIHByb3BlcnRpZXMgdGhhdCBubyBsb25nZXIgZXhpc3Rcblx0XHRcdGZvciAodmFyIGtleSBpbiBvbGQpIHtcblx0XHRcdFx0aWYgKG9sZFtrZXldICE9IG51bGwgJiYgc3R5bGVba2V5XSA9PSBudWxsKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShub3JtYWxpemVLZXkoa2V5KSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIEhlcmUncyBhbiBleHBsYW5hdGlvbiBvZiBob3cgdGhpcyB3b3Jrczpcblx0Ly8gMS4gVGhlIGV2ZW50IG5hbWVzIGFyZSBhbHdheXMgKGJ5IGRlc2lnbikgcHJlZml4ZWQgYnkgYG9uYC5cblx0Ly8gMi4gVGhlIEV2ZW50TGlzdGVuZXIgaW50ZXJmYWNlIGFjY2VwdHMgZWl0aGVyIGEgZnVuY3Rpb24gb3IgYW4gb2JqZWN0XG5cdC8vICAgIHdpdGggYSBgaGFuZGxlRXZlbnRgIG1ldGhvZC5cblx0Ly8gMy4gVGhlIG9iamVjdCBkb2VzIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLCB0byBhdm9pZFxuXHQvLyAgICBhbnkgcG90ZW50aWFsIGludGVyZmVyZW5jZSB3aXRoIHRoYXQgKGUuZy4gc2V0dGVycykuXG5cdC8vIDQuIFRoZSBldmVudCBuYW1lIGlzIHJlbWFwcGVkIHRvIHRoZSBoYW5kbGVyIGJlZm9yZSBjYWxsaW5nIGl0LlxuXHQvLyA1LiBJbiBmdW5jdGlvbi1iYXNlZCBldmVudCBoYW5kbGVycywgYGV2LnRhcmdldCA9PT0gdGhpc2AuIFdlIHJlcGxpY2F0ZVxuXHQvLyAgICB0aGF0IGJlbG93LlxuXHQvLyA2LiBJbiBmdW5jdGlvbi1iYXNlZCBldmVudCBoYW5kbGVycywgYHJldHVybiBmYWxzZWAgcHJldmVudHMgdGhlIGRlZmF1bHRcblx0Ly8gICAgYWN0aW9uIGFuZCBzdG9wcyBldmVudCBwcm9wYWdhdGlvbi4gV2UgcmVwbGljYXRlIHRoYXQgYmVsb3cuXG5cdGZ1bmN0aW9uIEV2ZW50RGljdCgpIHtcblx0XHQvLyBTYXZlIHRoaXMsIHNvIHRoZSBjdXJyZW50IHJlZHJhdyBpcyBjb3JyZWN0bHkgdHJhY2tlZC5cblx0XHR0aGlzLl8gPSBjdXJyZW50UmVkcmF3XG5cdH1cblx0RXZlbnREaWN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbClcblx0RXZlbnREaWN0LnByb3RvdHlwZS5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uIChldikge1xuXHRcdHZhciBoYW5kbGVyID0gdGhpc1tcIm9uXCIgKyBldi50eXBlXVxuXHRcdHZhciByZXN1bHRcblx0XHRpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikgcmVzdWx0ID0gaGFuZGxlci5jYWxsKGV2LmN1cnJlbnRUYXJnZXQsIGV2KVxuXHRcdGVsc2UgaWYgKHR5cGVvZiBoYW5kbGVyLmhhbmRsZUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIGhhbmRsZXIuaGFuZGxlRXZlbnQoZXYpXG5cdFx0aWYgKHRoaXMuXyAmJiBldi5yZWRyYXcgIT09IGZhbHNlKSAoMCwgdGhpcy5fKSgpXG5cdFx0aWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcblx0XHRcdGV2LnByZXZlbnREZWZhdWx0KClcblx0XHRcdGV2LnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0fVxuXHR9XG5cblx0Ly9ldmVudFxuXHRmdW5jdGlvbiB1cGRhdGVFdmVudCh2bm9kZSwga2V5LCB2YWx1ZSkge1xuXHRcdGlmICh2bm9kZS5ldmVudHMgIT0gbnVsbCkge1xuXHRcdFx0aWYgKHZub2RlLmV2ZW50c1trZXldID09PSB2YWx1ZSkgcmV0dXJuXG5cdFx0XHRpZiAodmFsdWUgIT0gbnVsbCAmJiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSkge1xuXHRcdFx0XHRpZiAodm5vZGUuZXZlbnRzW2tleV0gPT0gbnVsbCkgdm5vZGUuZG9tLmFkZEV2ZW50TGlzdGVuZXIoa2V5LnNsaWNlKDIpLCB2bm9kZS5ldmVudHMsIGZhbHNlKVxuXHRcdFx0XHR2bm9kZS5ldmVudHNba2V5XSA9IHZhbHVlXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodm5vZGUuZXZlbnRzW2tleV0gIT0gbnVsbCkgdm5vZGUuZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIoa2V5LnNsaWNlKDIpLCB2bm9kZS5ldmVudHMsIGZhbHNlKVxuXHRcdFx0XHR2bm9kZS5ldmVudHNba2V5XSA9IHVuZGVmaW5lZFxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCAmJiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSkge1xuXHRcdFx0dm5vZGUuZXZlbnRzID0gbmV3IEV2ZW50RGljdCgpXG5cdFx0XHR2bm9kZS5kb20uYWRkRXZlbnRMaXN0ZW5lcihrZXkuc2xpY2UoMiksIHZub2RlLmV2ZW50cywgZmFsc2UpXG5cdFx0XHR2bm9kZS5ldmVudHNba2V5XSA9IHZhbHVlXG5cdFx0fVxuXHR9XG5cblx0Ly9saWZlY3ljbGVcblx0ZnVuY3Rpb24gaW5pdExpZmVjeWNsZShzb3VyY2UsIHZub2RlLCBob29rcykge1xuXHRcdGlmICh0eXBlb2Ygc291cmNlLm9uaW5pdCA9PT0gXCJmdW5jdGlvblwiKSBjYWxsSG9vay5jYWxsKHNvdXJjZS5vbmluaXQsIHZub2RlKVxuXHRcdGlmICh0eXBlb2Ygc291cmNlLm9uY3JlYXRlID09PSBcImZ1bmN0aW9uXCIpIGhvb2tzLnB1c2goY2FsbEhvb2suYmluZChzb3VyY2Uub25jcmVhdGUsIHZub2RlKSlcblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVMaWZlY3ljbGUoc291cmNlLCB2bm9kZSwgaG9va3MpIHtcblx0XHRpZiAodHlwZW9mIHNvdXJjZS5vbnVwZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSBob29rcy5wdXNoKGNhbGxIb29rLmJpbmQoc291cmNlLm9udXBkYXRlLCB2bm9kZSkpXG5cdH1cblx0ZnVuY3Rpb24gc2hvdWxkTm90VXBkYXRlKHZub2RlLCBvbGQpIHtcblx0XHRkbyB7XG5cdFx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCAmJiB0eXBlb2Ygdm5vZGUuYXR0cnMub25iZWZvcmV1cGRhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHR2YXIgZm9yY2UgPSBjYWxsSG9vay5jYWxsKHZub2RlLmF0dHJzLm9uYmVmb3JldXBkYXRlLCB2bm9kZSwgb2xkKVxuXHRcdFx0XHRpZiAoZm9yY2UgIT09IHVuZGVmaW5lZCAmJiAhZm9yY2UpIGJyZWFrXG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Ygdm5vZGUuc3RhdGUub25iZWZvcmV1cGRhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHR2YXIgZm9yY2UgPSBjYWxsSG9vay5jYWxsKHZub2RlLnN0YXRlLm9uYmVmb3JldXBkYXRlLCB2bm9kZSwgb2xkKVxuXHRcdFx0XHRpZiAoZm9yY2UgIT09IHVuZGVmaW5lZCAmJiAhZm9yY2UpIGJyZWFrXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9IHdoaWxlIChmYWxzZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG5cdFx0dm5vZGUuZG9tID0gb2xkLmRvbVxuXHRcdHZub2RlLmRvbVNpemUgPSBvbGQuZG9tU2l6ZVxuXHRcdHZub2RlLmluc3RhbmNlID0gb2xkLmluc3RhbmNlXG5cdFx0Ly8gT25lIHdvdWxkIHRoaW5rIGhhdmluZyB0aGUgYWN0dWFsIGxhdGVzdCBhdHRyaWJ1dGVzIHdvdWxkIGJlIGlkZWFsLFxuXHRcdC8vIGJ1dCBpdCBkb2Vzbid0IGxldCB1cyBwcm9wZXJseSBkaWZmIGJhc2VkIG9uIG91ciBjdXJyZW50IGludGVybmFsXG5cdFx0Ly8gcmVwcmVzZW50YXRpb24uIFdlIGhhdmUgdG8gc2F2ZSBub3Qgb25seSB0aGUgb2xkIERPTSBpbmZvLCBidXQgYWxzb1xuXHRcdC8vIHRoZSBhdHRyaWJ1dGVzIHVzZWQgdG8gY3JlYXRlIGl0LCBhcyB3ZSBkaWZmICp0aGF0Kiwgbm90IGFnYWluc3QgdGhlXG5cdFx0Ly8gRE9NIGRpcmVjdGx5ICh3aXRoIGEgZmV3IGV4Y2VwdGlvbnMgaW4gYHNldEF0dHJgKS4gQW5kLCBvZiBjb3Vyc2UsIHdlXG5cdFx0Ly8gbmVlZCB0byBzYXZlIHRoZSBjaGlsZHJlbiBhbmQgdGV4dCBhcyB0aGV5IGFyZSBjb25jZXB0dWFsbHkgbm90XG5cdFx0Ly8gdW5saWtlIHNwZWNpYWwgXCJhdHRyaWJ1dGVzXCIgaW50ZXJuYWxseS5cblx0XHR2bm9kZS5hdHRycyA9IG9sZC5hdHRyc1xuXHRcdHZub2RlLmNoaWxkcmVuID0gb2xkLmNoaWxkcmVuXG5cdFx0dm5vZGUudGV4dCA9IG9sZC50ZXh0XG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXG5cdHJldHVybiBmdW5jdGlvbihkb20sIHZub2RlcywgcmVkcmF3KSB7XG5cdFx0aWYgKCFkb20pIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFbnN1cmUgdGhlIERPTSBlbGVtZW50IGJlaW5nIHBhc3NlZCB0byBtLnJvdXRlL20ubW91bnQvbS5yZW5kZXIgaXMgbm90IHVuZGVmaW5lZC5cIilcblx0XHR2YXIgaG9va3MgPSBbXVxuXHRcdHZhciBhY3RpdmUgPSBhY3RpdmVFbGVtZW50KClcblx0XHR2YXIgbmFtZXNwYWNlID0gZG9tLm5hbWVzcGFjZVVSSVxuXG5cdFx0Ly8gRmlyc3QgdGltZSByZW5kZXJpbmcgaW50byBhIG5vZGUgY2xlYXJzIGl0IG91dFxuXHRcdGlmIChkb20udm5vZGVzID09IG51bGwpIGRvbS50ZXh0Q29udGVudCA9IFwiXCJcblxuXHRcdHZub2RlcyA9IFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKEFycmF5LmlzQXJyYXkodm5vZGVzKSA/IHZub2RlcyA6IFt2bm9kZXNdKVxuXHRcdHZhciBwcmV2UmVkcmF3ID0gY3VycmVudFJlZHJhd1xuXHRcdHRyeSB7XG5cdFx0XHRjdXJyZW50UmVkcmF3ID0gdHlwZW9mIHJlZHJhdyA9PT0gXCJmdW5jdGlvblwiID8gcmVkcmF3IDogdW5kZWZpbmVkXG5cdFx0XHR1cGRhdGVOb2Rlcyhkb20sIGRvbS52bm9kZXMsIHZub2RlcywgaG9va3MsIG51bGwsIG5hbWVzcGFjZSA9PT0gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIgPyB1bmRlZmluZWQgOiBuYW1lc3BhY2UpXG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGN1cnJlbnRSZWRyYXcgPSBwcmV2UmVkcmF3XG5cdFx0fVxuXHRcdGRvbS52bm9kZXMgPSB2bm9kZXNcblx0XHQvLyBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudGAgY2FuIHJldHVybiBudWxsOiBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbnRlcmFjdGlvbi5odG1sI2RvbS1kb2N1bWVudC1hY3RpdmVlbGVtZW50XG5cdFx0aWYgKGFjdGl2ZSAhPSBudWxsICYmIGFjdGl2ZUVsZW1lbnQoKSAhPT0gYWN0aXZlICYmIHR5cGVvZiBhY3RpdmUuZm9jdXMgPT09IFwiZnVuY3Rpb25cIikgYWN0aXZlLmZvY3VzKClcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgaSsrKSBob29rc1tpXSgpXG5cdH1cbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBWbm9kZSA9IHJlcXVpcmUoXCIuLi9yZW5kZXIvdm5vZGVcIilcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihodG1sKSB7XG5cdGlmIChodG1sID09IG51bGwpIGh0bWwgPSBcIlwiXG5cdHJldHVybiBWbm9kZShcIjxcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGh0bWwsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuZnVuY3Rpb24gVm5vZGUodGFnLCBrZXksIGF0dHJzLCBjaGlsZHJlbiwgdGV4dCwgZG9tKSB7XG5cdHJldHVybiB7dGFnOiB0YWcsIGtleToga2V5LCBhdHRyczogYXR0cnMsIGNoaWxkcmVuOiBjaGlsZHJlbiwgdGV4dDogdGV4dCwgZG9tOiBkb20sIGRvbVNpemU6IHVuZGVmaW5lZCwgc3RhdGU6IHVuZGVmaW5lZCwgZXZlbnRzOiB1bmRlZmluZWQsIGluc3RhbmNlOiB1bmRlZmluZWR9XG59XG5Wbm9kZS5ub3JtYWxpemUgPSBmdW5jdGlvbihub2RlKSB7XG5cdGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSByZXR1cm4gVm5vZGUoXCJbXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbihub2RlKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG5cdGlmIChub2RlID09IG51bGwgfHwgdHlwZW9mIG5vZGUgPT09IFwiYm9vbGVhblwiKSByZXR1cm4gbnVsbFxuXHRpZiAodHlwZW9mIG5vZGUgPT09IFwib2JqZWN0XCIpIHJldHVybiBub2RlXG5cdHJldHVybiBWbm9kZShcIiNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFN0cmluZyhub2RlKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG59XG5Wbm9kZS5ub3JtYWxpemVDaGlsZHJlbiA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdHZhciBjaGlsZHJlbiA9IFtdXG5cdGlmIChpbnB1dC5sZW5ndGgpIHtcblx0XHR2YXIgaXNLZXllZCA9IGlucHV0WzBdICE9IG51bGwgJiYgaW5wdXRbMF0ua2V5ICE9IG51bGxcblx0XHQvLyBOb3RlOiB0aGlzIGlzIGEgKnZlcnkqIHBlcmYtc2Vuc2l0aXZlIGNoZWNrLlxuXHRcdC8vIEZ1biBmYWN0OiBtZXJnaW5nIHRoZSBsb29wIGxpa2UgdGhpcyBpcyBzb21laG93IGZhc3RlciB0aGFuIHNwbGl0dGluZ1xuXHRcdC8vIGl0LCBub3RpY2VhYmx5IHNvLlxuXHRcdGZvciAodmFyIGkgPSAxOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICgoaW5wdXRbaV0gIT0gbnVsbCAmJiBpbnB1dFtpXS5rZXkgIT0gbnVsbCkgIT09IGlzS2V5ZWQpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIlZub2RlcyBtdXN0IGVpdGhlciBhbHdheXMgaGF2ZSBrZXlzIG9yIG5ldmVyIGhhdmUga2V5cyFcIilcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y2hpbGRyZW5baV0gPSBWbm9kZS5ub3JtYWxpemUoaW5wdXRbaV0pXG5cdFx0fVxuXHR9XG5cdHJldHVybiBjaGlsZHJlblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZub2RlXG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgUHJvbWlzZVBvbHlmaWxsID0gcmVxdWlyZShcIi4vcHJvbWlzZS9wcm9taXNlXCIpXG52YXIgbW91bnRSZWRyYXcgPSByZXF1aXJlKFwiLi9tb3VudC1yZWRyYXdcIilcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9yZXF1ZXN0L3JlcXVlc3RcIikod2luZG93LCBQcm9taXNlUG9seWZpbGwsIG1vdW50UmVkcmF3LnJlZHJhdylcbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBidWlsZFBhdGhuYW1lID0gcmVxdWlyZShcIi4uL3BhdGhuYW1lL2J1aWxkXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHdpbmRvdywgUHJvbWlzZSwgb25jb21wbGV0aW9uKSB7XG5cdHZhciBjYWxsYmFja0NvdW50ID0gMFxuXG5cdGZ1bmN0aW9uIFByb21pc2VQcm94eShleGVjdXRvcikge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShleGVjdXRvcilcblx0fVxuXG5cdC8vIEluIGNhc2UgdGhlIGdsb2JhbCBQcm9taXNlIGlzIHNvbWUgdXNlcmxhbmQgbGlicmFyeSdzIHdoZXJlIHRoZXkgcmVseSBvblxuXHQvLyBgZm9vIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3RvcmAsIGB0aGlzLmNvbnN0cnVjdG9yLnJlc29sdmUodmFsdWUpYCwgb3Jcblx0Ly8gc2ltaWxhci4gTGV0J3MgKm5vdCogYnJlYWsgdGhlbS5cblx0UHJvbWlzZVByb3h5LnByb3RvdHlwZSA9IFByb21pc2UucHJvdG90eXBlXG5cdFByb21pc2VQcm94eS5fX3Byb3RvX18gPSBQcm9taXNlIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cblxuXHRmdW5jdGlvbiBtYWtlUmVxdWVzdChmYWN0b3J5KSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHVybCwgYXJncykge1xuXHRcdFx0aWYgKHR5cGVvZiB1cmwgIT09IFwic3RyaW5nXCIpIHsgYXJncyA9IHVybDsgdXJsID0gdXJsLnVybCB9XG5cdFx0XHRlbHNlIGlmIChhcmdzID09IG51bGwpIGFyZ3MgPSB7fVxuXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdFx0ZmFjdG9yeShidWlsZFBhdGhuYW1lKHVybCwgYXJncy5wYXJhbXMpLCBhcmdzLCBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgYXJncy50eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGRhdGFbaV0gPSBuZXcgYXJncy50eXBlKGRhdGFbaV0pXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgZGF0YSA9IG5ldyBhcmdzLnR5cGUoZGF0YSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVzb2x2ZShkYXRhKVxuXHRcdFx0XHR9LCByZWplY3QpXG5cdFx0XHR9KVxuXHRcdFx0aWYgKGFyZ3MuYmFja2dyb3VuZCA9PT0gdHJ1ZSkgcmV0dXJuIHByb21pc2Vcblx0XHRcdHZhciBjb3VudCA9IDBcblx0XHRcdGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuXHRcdFx0XHRpZiAoLS1jb3VudCA9PT0gMCAmJiB0eXBlb2Ygb25jb21wbGV0aW9uID09PSBcImZ1bmN0aW9uXCIpIG9uY29tcGxldGlvbigpXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB3cmFwKHByb21pc2UpXG5cblx0XHRcdGZ1bmN0aW9uIHdyYXAocHJvbWlzZSkge1xuXHRcdFx0XHR2YXIgdGhlbiA9IHByb21pc2UudGhlblxuXHRcdFx0XHQvLyBTZXQgdGhlIGNvbnN0cnVjdG9yLCBzbyBlbmdpbmVzIGtub3cgdG8gbm90IGF3YWl0IG9yIHJlc29sdmVcblx0XHRcdFx0Ly8gdGhpcyBhcyBhIG5hdGl2ZSBwcm9taXNlLiBBdCB0aGUgdGltZSBvZiB3cml0aW5nLCB0aGlzIGlzXG5cdFx0XHRcdC8vIG9ubHkgbmVjZXNzYXJ5IGZvciBWOCwgYnV0IHRoZWlyIGJlaGF2aW9yIGlzIHRoZSBjb3JyZWN0XG5cdFx0XHRcdC8vIGJlaGF2aW9yIHBlciBzcGVjLiBTZWUgdGhpcyBzcGVjIGlzc3VlIGZvciBtb3JlIGRldGFpbHM6XG5cdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L2VjbWEyNjIvaXNzdWVzLzE1NzcuIEFsc28sIHNlZSB0aGVcblx0XHRcdFx0Ly8gY29ycmVzcG9uZGluZyBjb21tZW50IGluIGByZXF1ZXN0L3Rlc3RzL3Rlc3QtcmVxdWVzdC5qc2AgZm9yXG5cdFx0XHRcdC8vIGEgYml0IG1vcmUgYmFja2dyb3VuZCBvbiB0aGUgaXNzdWUgYXQgaGFuZC5cblx0XHRcdFx0cHJvbWlzZS5jb25zdHJ1Y3RvciA9IFByb21pc2VQcm94eVxuXHRcdFx0XHRwcm9taXNlLnRoZW4gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRjb3VudCsrXG5cdFx0XHRcdFx0dmFyIG5leHQgPSB0aGVuLmFwcGx5KHByb21pc2UsIGFyZ3VtZW50cylcblx0XHRcdFx0XHRuZXh0LnRoZW4oY29tcGxldGUsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdGNvbXBsZXRlKClcblx0XHRcdFx0XHRcdGlmIChjb3VudCA9PT0gMCkgdGhyb3cgZVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0cmV0dXJuIHdyYXAobmV4dClcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcHJvbWlzZVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGhhc0hlYWRlcihhcmdzLCBuYW1lKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIGFyZ3MuaGVhZGVycykge1xuXHRcdFx0aWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoYXJncy5oZWFkZXJzLCBrZXkpICYmIG5hbWUudGVzdChrZXkpKSByZXR1cm4gdHJ1ZVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0cmVxdWVzdDogbWFrZVJlcXVlc3QoZnVuY3Rpb24odXJsLCBhcmdzLCByZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciBtZXRob2QgPSBhcmdzLm1ldGhvZCAhPSBudWxsID8gYXJncy5tZXRob2QudG9VcHBlckNhc2UoKSA6IFwiR0VUXCJcblx0XHRcdHZhciBib2R5ID0gYXJncy5ib2R5XG5cdFx0XHR2YXIgYXNzdW1lSlNPTiA9IChhcmdzLnNlcmlhbGl6ZSA9PSBudWxsIHx8IGFyZ3Muc2VyaWFsaXplID09PSBKU09OLnNlcmlhbGl6ZSkgJiYgIShib2R5IGluc3RhbmNlb2YgJHdpbmRvdy5Gb3JtRGF0YSlcblx0XHRcdHZhciByZXNwb25zZVR5cGUgPSBhcmdzLnJlc3BvbnNlVHlwZSB8fCAodHlwZW9mIGFyZ3MuZXh0cmFjdCA9PT0gXCJmdW5jdGlvblwiID8gXCJcIiA6IFwianNvblwiKVxuXG5cdFx0XHR2YXIgeGhyID0gbmV3ICR3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKSwgYWJvcnRlZCA9IGZhbHNlXG5cdFx0XHR2YXIgb3JpZ2luYWwgPSB4aHIsIHJlcGxhY2VkQWJvcnRcblx0XHRcdHZhciBhYm9ydCA9IHhoci5hYm9ydFxuXG5cdFx0XHR4aHIuYWJvcnQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0YWJvcnRlZCA9IHRydWVcblx0XHRcdFx0YWJvcnQuY2FsbCh0aGlzKVxuXHRcdFx0fVxuXG5cdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgYXJncy5hc3luYyAhPT0gZmFsc2UsIHR5cGVvZiBhcmdzLnVzZXIgPT09IFwic3RyaW5nXCIgPyBhcmdzLnVzZXIgOiB1bmRlZmluZWQsIHR5cGVvZiBhcmdzLnBhc3N3b3JkID09PSBcInN0cmluZ1wiID8gYXJncy5wYXNzd29yZCA6IHVuZGVmaW5lZClcblxuXHRcdFx0aWYgKGFzc3VtZUpTT04gJiYgYm9keSAhPSBudWxsICYmICFoYXNIZWFkZXIoYXJncywgL15jb250ZW50LXR5cGUkL2kpKSB7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiKVxuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBhcmdzLmRlc2VyaWFsaXplICE9PSBcImZ1bmN0aW9uXCIgJiYgIWhhc0hlYWRlcihhcmdzLCAvXmFjY2VwdCQvaSkpIHtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0LypcIilcblx0XHRcdH1cblx0XHRcdGlmIChhcmdzLndpdGhDcmVkZW50aWFscykgeGhyLndpdGhDcmVkZW50aWFscyA9IGFyZ3Mud2l0aENyZWRlbnRpYWxzXG5cdFx0XHRpZiAoYXJncy50aW1lb3V0KSB4aHIudGltZW91dCA9IGFyZ3MudGltZW91dFxuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZVxuXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJncy5oZWFkZXJzKSB7XG5cdFx0XHRcdGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFyZ3MuaGVhZGVycywga2V5KSkge1xuXHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgYXJncy5oZWFkZXJzW2tleV0pXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRcdC8vIERvbid0IHRocm93IGVycm9ycyBvbiB4aHIuYWJvcnQoKS5cblx0XHRcdFx0aWYgKGFib3J0ZWQpIHJldHVyblxuXG5cdFx0XHRcdGlmIChldi50YXJnZXQucmVhZHlTdGF0ZSA9PT0gNCkge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IChldi50YXJnZXQuc3RhdHVzID49IDIwMCAmJiBldi50YXJnZXQuc3RhdHVzIDwgMzAwKSB8fCBldi50YXJnZXQuc3RhdHVzID09PSAzMDQgfHwgKC9eZmlsZTpcXC9cXC8vaSkudGVzdCh1cmwpXG5cdFx0XHRcdFx0XHQvLyBXaGVuIHRoZSByZXNwb25zZSB0eXBlIGlzbid0IFwiXCIgb3IgXCJ0ZXh0XCIsXG5cdFx0XHRcdFx0XHQvLyBgeGhyLnJlc3BvbnNlVGV4dGAgaXMgdGhlIHdyb25nIHRoaW5nIHRvIHVzZS5cblx0XHRcdFx0XHRcdC8vIEJyb3dzZXJzIGRvIHRoZSByaWdodCB0aGluZyBhbmQgdGhyb3cgaGVyZSwgYW5kIHdlXG5cdFx0XHRcdFx0XHQvLyBzaG91bGQgaG9ub3IgdGhhdCBhbmQgZG8gdGhlIHJpZ2h0IHRoaW5nIGJ5XG5cdFx0XHRcdFx0XHQvLyBwcmVmZXJyaW5nIGB4aHIucmVzcG9uc2VgIHdoZXJlIHBvc3NpYmxlL3ByYWN0aWNhbC5cblx0XHRcdFx0XHRcdHZhciByZXNwb25zZSA9IGV2LnRhcmdldC5yZXNwb25zZSwgbWVzc2FnZVxuXG5cdFx0XHRcdFx0XHRpZiAocmVzcG9uc2VUeXBlID09PSBcImpzb25cIikge1xuXHRcdFx0XHRcdFx0XHQvLyBGb3IgSUUgYW5kIEVkZ2UsIHdoaWNoIGRvbid0IGltcGxlbWVudFxuXHRcdFx0XHRcdFx0XHQvLyBgcmVzcG9uc2VUeXBlOiBcImpzb25cImAuXG5cdFx0XHRcdFx0XHRcdGlmICghZXYudGFyZ2V0LnJlc3BvbnNlVHlwZSAmJiB0eXBlb2YgYXJncy5leHRyYWN0ICE9PSBcImZ1bmN0aW9uXCIpIHJlc3BvbnNlID0gSlNPTi5wYXJzZShldi50YXJnZXQucmVzcG9uc2VUZXh0KVxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICghcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gXCJ0ZXh0XCIpIHtcblx0XHRcdFx0XHRcdFx0Ly8gT25seSB1c2UgdGhpcyBkZWZhdWx0IGlmIGl0J3MgdGV4dC4gSWYgYSBwYXJzZWRcblx0XHRcdFx0XHRcdFx0Ly8gZG9jdW1lbnQgaXMgbmVlZGVkIG9uIG9sZCBJRSBhbmQgZnJpZW5kcyAoYWxsXG5cdFx0XHRcdFx0XHRcdC8vIHVuc3VwcG9ydGVkKSwgdGhlIHVzZXIgc2hvdWxkIHVzZSBhIGN1c3RvbVxuXHRcdFx0XHRcdFx0XHQvLyBgY29uZmlnYCBpbnN0ZWFkLiBUaGV5J3JlIGFscmVhZHkgdXNpbmcgdGhpcyBhdFxuXHRcdFx0XHRcdFx0XHQvLyB0aGVpciBvd24gcmlzay5cblx0XHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlID09IG51bGwpIHJlc3BvbnNlID0gZXYudGFyZ2V0LnJlc3BvbnNlVGV4dFxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGFyZ3MuZXh0cmFjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gYXJncy5leHRyYWN0KGV2LnRhcmdldCwgYXJncylcblx0XHRcdFx0XHRcdFx0c3VjY2VzcyA9IHRydWVcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGFyZ3MuZGVzZXJpYWxpemUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IGFyZ3MuZGVzZXJpYWxpemUocmVzcG9uc2UpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoc3VjY2VzcykgcmVzb2x2ZShyZXNwb25zZSlcblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0cnkgeyBtZXNzYWdlID0gZXYudGFyZ2V0LnJlc3BvbnNlVGV4dCB9XG5cdFx0XHRcdFx0XHRcdGNhdGNoIChlKSB7IG1lc3NhZ2UgPSByZXNwb25zZSB9XG5cdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKVxuXHRcdFx0XHRcdFx0XHRlcnJvci5jb2RlID0gZXYudGFyZ2V0LnN0YXR1c1xuXHRcdFx0XHRcdFx0XHRlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlXG5cdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcilcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3MuY29uZmlnID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0eGhyID0gYXJncy5jb25maWcoeGhyLCBhcmdzLCB1cmwpIHx8IHhoclxuXG5cdFx0XHRcdC8vIFByb3BhZ2F0ZSB0aGUgYGFib3J0YCB0byBhbnkgcmVwbGFjZW1lbnQgWEhSIGFzIHdlbGwuXG5cdFx0XHRcdGlmICh4aHIgIT09IG9yaWdpbmFsKSB7XG5cdFx0XHRcdFx0cmVwbGFjZWRBYm9ydCA9IHhoci5hYm9ydFxuXHRcdFx0XHRcdHhoci5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0YWJvcnRlZCA9IHRydWVcblx0XHRcdFx0XHRcdHJlcGxhY2VkQWJvcnQuY2FsbCh0aGlzKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYm9keSA9PSBudWxsKSB4aHIuc2VuZCgpXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgYXJncy5zZXJpYWxpemUgPT09IFwiZnVuY3Rpb25cIikgeGhyLnNlbmQoYXJncy5zZXJpYWxpemUoYm9keSkpXG5cdFx0XHRlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgJHdpbmRvdy5Gb3JtRGF0YSkgeGhyLnNlbmQoYm9keSlcblx0XHRcdGVsc2UgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoYm9keSkpXG5cdFx0fSksXG5cdFx0anNvbnA6IG1ha2VSZXF1ZXN0KGZ1bmN0aW9uKHVybCwgYXJncywgcmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHR2YXIgY2FsbGJhY2tOYW1lID0gYXJncy5jYWxsYmFja05hbWUgfHwgXCJfbWl0aHJpbF9cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDFlMTYpICsgXCJfXCIgKyBjYWxsYmFja0NvdW50Kytcblx0XHRcdHZhciBzY3JpcHQgPSAkd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIilcblx0XHRcdCR3aW5kb3dbY2FsbGJhY2tOYW1lXSA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0ZGVsZXRlICR3aW5kb3dbY2FsbGJhY2tOYW1lXVxuXHRcdFx0XHRzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpXG5cdFx0XHRcdHJlc29sdmUoZGF0YSlcblx0XHRcdH1cblx0XHRcdHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRlbGV0ZSAkd2luZG93W2NhbGxiYWNrTmFtZV1cblx0XHRcdFx0c2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KVxuXHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiSlNPTlAgcmVxdWVzdCBmYWlsZWRcIikpXG5cdFx0XHR9XG5cdFx0XHRzY3JpcHQuc3JjID0gdXJsICsgKHVybC5pbmRleE9mKFwiP1wiKSA8IDAgPyBcIj9cIiA6IFwiJlwiKSArXG5cdFx0XHRcdGVuY29kZVVSSUNvbXBvbmVudChhcmdzLmNhbGxiYWNrS2V5IHx8IFwiY2FsbGJhY2tcIikgKyBcIj1cIiArXG5cdFx0XHRcdGVuY29kZVVSSUNvbXBvbmVudChjYWxsYmFja05hbWUpXG5cdFx0XHQkd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChzY3JpcHQpXG5cdFx0fSksXG5cdH1cbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBtb3VudFJlZHJhdyA9IHJlcXVpcmUoXCIuL21vdW50LXJlZHJhd1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2FwaS9yb3V0ZXJcIikod2luZG93LCBtb3VudFJlZHJhdylcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciByZWdpc3RlckltbWVkaWF0ZTtcblxuICAgIGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgICAgLy8gQ2FsbGJhY2sgY2FuIGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24oXCJcIiArIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIC8vIENvcHkgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIH1cbiAgICAgIC8vIFN0b3JlIGFuZCByZWdpc3RlciB0aGUgdGFza1xuICAgICAgdmFyIHRhc2sgPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgYXJnczogYXJncyB9O1xuICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHRhc2s7XG4gICAgICByZWdpc3RlckltbWVkaWF0ZShuZXh0SGFuZGxlKTtcbiAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaGFuZGxlKSB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHRhc2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGFzay5jYWxsYmFjaztcbiAgICAgICAgdmFyIGFyZ3MgPSB0YXNrLmFyZ3M7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSWZQcmVzZW50KGhhbmRsZSkge1xuICAgICAgICAvLyBGcm9tIHRoZSBzcGVjOiBcIldhaXQgdW50aWwgYW55IGludm9jYXRpb25zIG9mIHRoaXMgYWxnb3JpdGhtIHN0YXJ0ZWQgYmVmb3JlIHRoaXMgb25lIGhhdmUgY29tcGxldGVkLlwiXG4gICAgICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgICAgIGlmIChjdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgICAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAgICAgICAvLyBcInRvbyBtdWNoIHJlY3Vyc2lvblwiIGVycm9yLlxuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBydW4odGFzayk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsIFwiKlwiKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZShoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaHRtbC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRoaXMgOiBnbG9iYWwgOiBzZWxmKSk7XG4iLCJ2YXIgc2NvcGUgPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwpIHx8XG4gICAgICAgICAgICAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZikgfHxcbiAgICAgICAgICAgIHdpbmRvdztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHNjb3BlLCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1lZGlhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgVG9nZ2xlQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9Ub2dnbGVCdXR0b25cIik7XG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBUb2dnbGVCdXR0b25fMS5Ub2dnbGVCdXR0b24ge1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIG5vZGUuYXR0cnMuZGVzYy5pdGVtcyA9IFtub2RlLmF0dHJzLmRlc2MubmFtZSB8fCAnYnV0dG9uJ107XG4gICAgICAgIHN1cGVyLm9uaW5pdChub2RlKTtcbiAgICAgICAgVG9nZ2xlQnV0dG9uXzEuVG9nZ2xlQnV0dG9uLmVuc3VyZVNlbGVjdGVkKG5vZGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUW5WMGRHOXVMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDBKMWRIUnZiaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFXZERRU3hwUkVGQk9FTTdRVUZsT1VNc1RVRkJZU3hOUVVGUExGTkJRVkVzTWtKQlFWazdTVUZEY0VNc1RVRkJUU3hEUVVGRExFbEJRVmM3VVVGRFpDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFbEJRVWtzVVVGQlVTeERRVUZETEVOQlFVTTdVVUZETTBRc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTnVRaXd5UWtGQldTeERRVUZETEdOQlFXTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOMFF5eERRVUZETzBOQlEwbzdRVUZPUkN4M1FrRk5ReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY2xhc3MgQ29sbGFwc2libGUge1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIG5vZGUuc3RhdGUuaW50aWFsID0gdHJ1ZTtcbiAgICAgICAgbm9kZS5zdGF0ZS5leHBhbmRlZCA9IG5vZGUuYXR0cnMuaXNFeHBhbmRlZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgbm9kZS5zdGF0ZS50b2dnbGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLmV4cGFuZGVkID0gIW5vZGUuc3RhdGUuZXhwYW5kZWQ7XG4gICAgICAgICAgICBub2RlLnN0YXRlLmluaXRpYWwgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzO1xuICAgICAgICBjb25zdCBjb21wb25lbnRzID0gbm9kZS5hdHRycy5jb21wb25lbnRzO1xuICAgICAgICBjb25zdCBwcmVBcnJvdyA9IG5vZGUuYXR0cnMucHJlQXJyb3c7XG4gICAgICAgIGNvbnN0IHBvc3RBcnJvdyA9IG5vZGUuYXR0cnMucG9zdEFycm93O1xuICAgICAgICBjb25zdCBleHBDU1MgPSBub2RlLnN0YXRlLmV4cGFuZGVkID8gJ2hzLWNvbGxhcHNpYmxlLWV4cGFuZGVkJyA6ICcnO1xuICAgICAgICBjb25zdCB0aXRsZSA9IFtjb21wb25lbnRzWzBdXTtcbiAgICAgICAgaWYgKHByZUFycm93KSB7XG4gICAgICAgICAgICB0aXRsZS51bnNoaWZ0KGhzbGF5b3V0XzEubShgLmhzLWNvbGxhcHNpYmxlLXByZSAuaHMtY29sbGFwc2libGUtYXJyb3ctJHtub2RlLnN0YXRlLmV4cGFuZGVkID8gJ2Rvd24nIDogJ3JpZ2h0J31gKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc3RBcnJvdykge1xuICAgICAgICAgICAgdGl0bGUucHVzaChoc2xheW91dF8xLm0oYC5ocy1jb2xsYXBzaWJsZS1wb3N0IC5ocy1jb2xsYXBzaWJsZS1hcnJvdy0ke25vZGUuc3RhdGUuZXhwYW5kZWQgPyAnZG93bicgOiAnbGVmdCd9YCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oYC5ocy1jb2xsYXBzaWJsZSAke2Nzc31gLCBbXG4gICAgICAgICAgICBoc2xheW91dF8xLm0oJy5ocy1jb2xsYXBzaWJsZS10aXRsZScsIHsgb25jbGljazogbm9kZS5zdGF0ZS50b2dnbGUgfSwgdGl0bGUpLFxuICAgICAgICAgICAgY29tcG9uZW50c1sxXSA/IGhzbGF5b3V0XzEubShgLmhzLWNvbGxhcHNpYmxlLWNvbnRlbnQgJHtleHBDU1N9YCwgY29tcG9uZW50c1sxXS5tYXAoKGMpID0+IGhzbGF5b3V0XzEubSgnJywgYykpKSA6IHVuZGVmaW5lZFxuICAgICAgICBdKTtcbiAgICB9XG59XG5leHBvcnRzLkNvbGxhcHNpYmxlID0gQ29sbGFwc2libGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lRMjlzYkdGd2MybGliR1V1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdlEyOXNiR0Z3YzJsaWJHVXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGcFJFRXNkVU5CUVc5RE8wRkJSWEJETEUxQlFXRXNWMEZCVnp0SlFVTndRaXhOUVVGTkxFTkJRVU1zU1VGQlZUdFJRVU5pTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hIUVVGSExFbEJRVWtzUTBGQlF6dFJRVU42UWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRlZCUVZVc1EwRkJRU3hEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNN1VVRkRNVVFzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRWRCUVVjc1IwRkJSeXhGUVVGRk8xbEJRM0pDTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNN1dVRkRNME1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRWRCUVVjc1MwRkJTeXhEUVVGRE8xRkJReTlDTEVOQlFVTXNRMEZCUXp0SlFVTk9MRU5CUVVNN1NVRkRSQ3hKUVVGSkxFTkJRVU1zU1VGQlZUdFJRVU5ZTEUxQlFVMHNSMEZCUnl4SFFVRlZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETzFGQlEyeERMRTFCUVUwc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWVUZCVlN4RFFVRkRPMUZCUTNwRExFMUJRVTBzVVVGQlVTeEhRVUZMTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRE8xRkJRM1pETEUxQlFVMHNVMEZCVXl4SFFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZETzFGQlEzaERMRTFCUVUwc1RVRkJUU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkJMRU5CUVVNc1EwRkJRU3g1UWtGQmVVSXNRMEZCUVN4RFFVRkRMRU5CUVVFc1JVRkJSU3hEUVVGRE8xRkJRMmhGTEUxQlFVMHNTMEZCU3l4SFFVRkhMRU5CUVVNc1ZVRkJWU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZET1VJc1NVRkJTU3hSUVVGUkxFVkJRVVU3V1VGQlJTeExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRmxCUVVNc1EwRkJReXcyUTBGQk5rTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVUVzUTBGQlF5eERRVUZCTEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFOQlFVVTdVVUZEZUVnc1NVRkJTU3hUUVVGVExFVkJRVU03V1VGQlJTeExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRmxCUVVNc1EwRkJReXc0UTBGQk9FTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVUVzUTBGQlF5eERRVUZCTEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFOQlFVVTdVVUZEY2tnc1QwRkJUeXhaUVVGRExFTkJRVU1zYlVKQlFXMUNMRWRCUVVjc1JVRkJSU3hGUVVGRk8xbEJReTlDTEZsQlFVTXNRMEZCUXl4MVFrRkJkVUlzUlVGQlJTeEZRVUZGTEU5QlFVOHNSVUZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUlVGQlF5eEZRVUZGTEV0QlFVc3NRMEZCUXp0WlFVTXZSQ3hWUVVGVkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVRXNRMEZCUXl4RFFVRkRMRmxCUVVNc1EwRkJReXd5UWtGQk1rSXNUVUZCVFN4RlFVRkZMRVZCUVVVc1ZVRkJWU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVzc1JVRkJSU3hGUVVGRkxFTkJRVUVzV1VGQlF5eERRVUZETEVWQlFVVXNSVUZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZOQlFWTTdVMEZETVVjc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF6dERRVU5LTzBGQmRrSkVMR3REUVhWQ1F5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBoc3V0aWxfMSA9IHJlcXVpcmUoXCJoc3V0aWxcIik7XG5jb25zdCBsb2cgPSBuZXcgaHN1dGlsXzEuTG9nKCdFZGl0U2VsZWN0Jyk7XG5jbGFzcyBFZGl0Q2hlY2tib3gge1xuICAgIGNsaWNrKCkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLmNoZWNrZWQpO1xuICAgIH1cbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBub2RlLmF0dHJzLmNoZWNrZWQ7XG4gICAgICAgIHRoaXMudXBkYXRlID0gbm9kZS5hdHRycy51cGRhdGU7XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBjc3MgPSBub2RlLmF0dHJzLmNzcyB8fCAnJztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShgaW5wdXQuaHNlZGl0X2NoZWNrYm94JHtjc3N9YCwge1xuICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgIGNoZWNrZWQ6IHRoaXMuY2hlY2tlZCxcbiAgICAgICAgICAgIG9uY2xpY2s6IHRoaXMuY2xpY2suYmluZCh0aGlzKVxuICAgICAgICB9LCAnJyk7XG4gICAgfVxufVxuZXhwb3J0cy5FZGl0Q2hlY2tib3ggPSBFZGl0Q2hlY2tib3g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lSV1JwZEVOb1pXTnJZbTk0TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwwVmthWFJEYUdWamEySnZlQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFTdENRU3gxUTBGQmIwTTdRVUZEY0VNc2JVTkJRV3RETzBGQlFVVXNUVUZCVFN4SFFVRkhMRWRCUVVjc1NVRkJTU3haUVVGSExFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTTdRVUZIZEVVc1RVRkJZU3haUVVGWk8wbEJTWEpDTEV0QlFVczdVVUZEUkN4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXp0UlFVTTNRaXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRKUVVNNVFpeERRVUZETzBsQlJVUXNUVUZCVFN4RFFVRkRMRWxCUVZVN1VVRkRZaXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRE8xRkJRMnhETEVsQlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTTdTVUZEY2tNc1EwRkJRenRKUVVWRUxFbEJRVWtzUTBGQlF5eEpRVUZWTzFGQlExZ3NUVUZCVFN4SFFVRkhMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVsQlFVa3NSVUZCUlN4RFFVRkRPMUZCUTJwRExFOUJRVThzV1VGQlF5eERRVUZETEhkQ1FVRjNRaXhIUVVGSExFVkJRVVVzUlVGQlJUdFpRVU53UXl4SlFVRkpMRVZCUVVVc1ZVRkJWVHRaUVVOb1FpeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRTlCUVU4N1dVRkRja0lzVDBGQlR5eEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF6dFRRVU5xUXl4RlFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8wbEJSVllzUTBGQlF6dERRVU5LTzBGQmRrSkVMRzlEUVhWQ1F5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzdXRpbF8xID0gcmVxdWlyZShcImhzdXRpbFwiKTtcbmNvbnN0IGxvZyA9IG5ldyBoc3V0aWxfMS5Mb2coJ0VkaXRMYWJlbCcpO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNsYXNzIEVkaXRMYWJlbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRlZmF1bHQgPSAnJztcbiAgICB9XG4gICAgY2xpY2soZSkge1xuICAgICAgICB0aGlzLmVkaXRhYmxlID0gIXRoaXMuZWRpdGFibGU7XG4gICAgfVxuICAgIGJsdXIoZSkge1xuICAgICAgICB0aGlzLmVkaXRhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGUoZS50YXJnZXQudmFsdWUpO1xuICAgIH1cbiAgICBrZXl1cChrZXkpIHtcbiAgICAgICAgaWYgKGtleS53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgIGtleS50YXJnZXQuYmx1cigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNCKG5ld1ZhbHVlKTtcbiAgICB9XG4gICAgb251cGRhdGUobm9kZSkge1xuICAgICAgICBpZiAodGhpcy5lZGl0YWJsZSAmJiAhdGhpcy5oYXNGb2N1cykge1xuICAgICAgICAgICAgbm9kZS5kb20udmFsdWUgPSBub2RlLmF0dHJzLmNvbnRlbnQgfHwgdGhpcy5kZWZhdWx0O1xuICAgICAgICAgICAgbm9kZS5kb20uZm9jdXMoKTtcbiAgICAgICAgICAgIG5vZGUuZG9tLnNlbGVjdCgpO1xuICAgICAgICAgICAgdGhpcy5oYXNGb2N1cyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQ0IgPSBub2RlLmF0dHJzLnVwZGF0ZTtcbiAgICAgICAgY29uc3QgY3NzID0gbm9kZS5hdHRycy5jc3MgfHwgJyc7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRhYmxlID9cbiAgICAgICAgICAgIGhzbGF5b3V0XzEubShgaW5wdXQuaHNlZGl0X2xhYmVsJHtjc3N9YCwge1xuICAgICAgICAgICAgICAgIG9uYmx1cjogdGhpcy5ibHVyLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgb25rZXl1cDogdGhpcy5rZXl1cC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgfSwgJycpXG4gICAgICAgICAgICA6IChub2RlLmF0dHJzLmNvbnRlbnQgJiYgbm9kZS5hdHRycy5jb250ZW50Lmxlbmd0aCkgP1xuICAgICAgICAgICAgICAgIGhzbGF5b3V0XzEubShgc3Bhbi5oc2VkaXRfbGFiZWwke2Nzc31gLCB7IG9uY2xpY2s6IHRoaXMuY2xpY2suYmluZCh0aGlzKSB9LCBoc2xheW91dF8xLm0udHJ1c3Qobm9kZS5hdHRycy5jb250ZW50KSlcbiAgICAgICAgICAgICAgICA6IGhzbGF5b3V0XzEubShgc3Bhbi5oc2VkaXRfbGFiZWwuZGVmYXVsdCR7Y3NzfWAsIHsgb25jbGljazogdGhpcy5jbGljay5iaW5kKHRoaXMpIH0sIG5vZGUuYXR0cnMucGxhY2Vob2xkZXIgfHwgJ2NsaWNrIHRvIGVudGVyJyk7XG4gICAgfVxufVxuZXhwb3J0cy5FZGl0TGFiZWwgPSBFZGl0TGFiZWw7XG5jbGFzcyBFZGl0RGF0ZSBleHRlbmRzIEVkaXRMYWJlbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkuc2xpY2UoNCk7XG4gICAgfVxuICAgIHVwZGF0ZShuZXdWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBpc05hTihkYXRlLmdldFRpbWUoKSkgPyAnaW52YWxpZCBkYXRlJyA6IGRhdGUudG9EYXRlU3RyaW5nKCkuc2xpY2UoNCk7XG4gICAgICAgICAgICBzdXBlci51cGRhdGUocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN1cGVyLnVwZGF0ZSh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5FZGl0RGF0ZSA9IEVkaXREYXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUldScGRFeGhZbVZzTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwwVmthWFJNWVdKbGJDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVhGRFFTeHRRMEZCYTBNN1FVRkJSU3hOUVVGTkxFZEJRVWNzUjBGQlJ5eEpRVUZKTEZsQlFVY3NRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJRenRCUVVOeVJTeDFRMEZCYjBNN1FVRkhjRU1zVFVGQllTeFRRVUZUTzBsQlFYUkNPMUZCUTJNc1lVRkJVU3hIUVVGSExFdEJRVXNzUTBGQlF6dFJRVU5xUWl4aFFVRlJMRWRCUVVjc1MwRkJTeXhEUVVGRE8xRkJSV3BDTEZsQlFVOHNSMEZCUnl4RlFVRkZMRU5CUVVNN1NVRXlRek5DTEVOQlFVTTdTVUY2UTJFc1MwRkJTeXhEUVVGRExFTkJRVXM3VVVGRGFrSXNTVUZCU1N4RFFVRkRMRkZCUVZFc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTTdTVUZEYmtNc1EwRkJRenRKUVVWVExFbEJRVWtzUTBGQlF5eERRVUZMTzFGQlEyaENMRWxCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzUzBGQlN5eERRVUZETzFGQlEzUkNMRWxCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzUzBGQlN5eERRVUZETzFGQlEzUkNMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRKUVVOb1F5eERRVUZETzBsQlJWTXNTMEZCU3l4RFFVRkRMRWRCUVU4N1VVRkRia0lzU1VGQlNTeEhRVUZITEVOQlFVTXNTMEZCU3l4TFFVRkxMRVZCUVVVc1JVRkJSVHRaUVVOc1FpeEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRE8xTkJRM0pDTzBsQlEwd3NRMEZCUXp0SlFVVlRMRTFCUVUwc1EwRkJReXhSUVVGbE8xRkJRelZDTEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03U1VGRE5VSXNRMEZCUXp0SlFVVk5MRkZCUVZFc1EwRkJReXhKUVVGVk8xRkJRM1JDTEVsQlFVa3NTVUZCU1N4RFFVRkRMRkZCUVZFc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVTdXVUZEYWtNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFbEJRVWtzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXp0WlFVTndSQ3hKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRPMWxCUTJwQ0xFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNN1dVRkRiRUlzU1VGQlNTeERRVUZETEZGQlFWRXNSMEZCUnl4SlFVRkpMRU5CUVVNN1UwRkRlRUk3U1VGRFRDeERRVUZETzBsQlJVMHNTVUZCU1N4RFFVRkRMRWxCUVZVN1VVRkRiRUlzU1VGQlNTeERRVUZETEZGQlFWRXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF6dFJRVU5zUXl4TlFVRk5MRWRCUVVjc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NTVUZCU1N4RlFVRkZMRU5CUVVNN1VVRkRha01zVDBGQlR5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkJMRU5CUVVNN1dVRkRha0lzV1VGQlF5eERRVUZETEhGQ1FVRnhRaXhIUVVGSExFVkJRVVVzUlVGQlJUdG5Ra0ZETVVJc1RVRkJUU3hGUVVGRkxFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJRenRuUWtGRE5VSXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXp0aFFVTnFReXhGUVVGRExFVkJRVVVzUTBGQlF6dFpRVU5ZTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZCTEVOQlFVTTdaMEpCUXpsRExGbEJRVU1zUTBGQlF5eHZRa0ZCYjBJc1IwRkJSeXhGUVVGRkxFVkJRVVVzUlVGQlJTeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVXNSVUZCUlN4WlFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1owSkJReTlHTEVOQlFVTXNRMEZCUXl4WlFVRkRMRU5CUVVNc05FSkJRVFJDTEVkQlFVY3NSVUZCUlN4RlFVRkZMRVZCUVVVc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WFFVRlhMRWxCUVVrc1owSkJRV2RDTEVOQlFVTXNRMEZCUXp0SlFVTTNTQ3hEUVVGRE8wTkJRMG83UVVFdlEwUXNPRUpCSzBORE8wRkJSVVFzVFVGQllTeFJRVUZUTEZOQlFWRXNVMEZCVXp0SlFVRjJRenM3VVVGRFl5eFpRVUZQTEVkQlFVY3NTVUZCU1N4SlFVRkpMRVZCUVVVc1EwRkJReXhaUVVGWkxFVkJRVVVzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRlZNMFFzUTBGQlF6dEpRVlJoTEUxQlFVMHNRMEZCUXl4UlFVRmxPMUZCUXpWQ0xFbEJRVWtzVVVGQlVTeEZRVUZGTzFsQlExWXNUVUZCVFN4SlFVRkpMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdXVUZEYUVNc1RVRkJUU3hOUVVGTkxFZEJRVWNzUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJReXhEUVVGQkxFTkJRVU1zUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhaUVVGWkxFVkJRVVVzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRjRVlzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRUUVVONFFqdGhRVUZOTzFsQlEwZ3NTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFRRVU16UWp0SlFVTk1MRU5CUVVNN1EwRkRTanRCUVZoRUxEUkNRVmRESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IGhzdXRpbF8xID0gcmVxdWlyZShcImhzdXRpbFwiKTtcbmNvbnN0IGxvZyA9IG5ldyBoc3V0aWxfMS5Mb2coJ0VkaXRMaXN0Jyk7XG5jb25zdCBoc2xheW91dF8yID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgRWRpdExhYmVsXzEgPSByZXF1aXJlKFwiLi9FZGl0TGFiZWxcIik7XG5jb25zdCBDb2xsYXBzaWJsZV8xID0gcmVxdWlyZShcIi4vQ29sbGFwc2libGVcIik7XG5jb25zdCBkZWZJc0VtcHR5ID0gKHJvdykgPT4gKHJvdyAmJiByb3cubGVuZ3RoKSA/IGZhbHNlIDogdHJ1ZTtcbmNvbnN0IGRlZmF1bHRSZW5kZXIgPSAocm93cykgPT4ge1xuICAgIHJldHVybiAocm93LCByb3dOdW0pID0+IHtcbiAgICAgICAgaWYgKHJvdy5tYXApIHtcbiAgICAgICAgICAgIHJldHVybiByb3cubWFwKChlLCBpKSA9PiBoc2xheW91dF8xLm0oRWRpdExhYmVsXzEuRWRpdExhYmVsLCB7XG4gICAgICAgICAgICAgICAgY29udGVudDogZSxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ2FkZC4uLicsXG4gICAgICAgICAgICAgICAgdXBkYXRlOiAobmV3VmFsdWUpID0+IHJvd1tpXSA9IG5ld1ZhbHVlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJvdykgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMocm93KS5tYXAoKGUpID0+IGhzbGF5b3V0XzEubShFZGl0TGFiZWxfMS5FZGl0TGFiZWwsIHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiByb3dbZV0sXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdhZGQuLi4nLFxuICAgICAgICAgICAgICAgIHVwZGF0ZTogKG5ld1ZhbHVlKSA9PiByb3dbZV0gPSBuZXdWYWx1ZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShFZGl0TGFiZWxfMS5FZGl0TGFiZWwsIHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiByb3csXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdhZGQuLi4nLFxuICAgICAgICAgICAgICAgIHVwZGF0ZTogKG5ld1ZhbHVlKSA9PiByb3dzW3Jvd051bV0gPSBuZXdWYWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbmZ1bmN0aW9uIGFkanVzdExpc3RSb3dIZWlnaHQoZG9tLCBpbmRlbnQgPSAnJykge1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KC4uLkFycmF5LmZyb20oZG9tLmNoaWxkTm9kZXMpLm1hcCgobikgPT4gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUobikuaGVpZ2h0KSkpO1xuICAgIGlmIChkb20gJiYgIWRvbS5jbGFzc0xpc3QuY29udGFpbnMoJ2hzZWRpdF9saXN0X2NvbnRlbnQnKSkge1xuICAgICAgICBkb20uc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ID4gMCA/IGAke2hlaWdodH1weGAgOiAnYXV0byc7XG4gICAgfVxufVxuY2xhc3MgRWRpdExpc3Qge1xuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBjc3MgPSBub2RlLmF0dHJzLmNzcyB8fCAnJztcbiAgICAgICAgY29uc3Qgc29ydCA9IG5vZGUuYXR0cnMuc29ydCB8fCAoKCkgPT4gMCk7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBub2RlLmF0dHJzLnJvd3M7XG4gICAgICAgIGNvbnN0IGlzRW1wdHkgPSBub2RlLmF0dHJzLmlzRW1wdHkgfHwgZGVmSXNFbXB0eTtcbiAgICAgICAgY29uc3QgcmVuZGVyID0gbm9kZS5hdHRycy5yb3dSZW5kZXIgfHwgZGVmYXVsdFJlbmRlcihyb3dzKTtcbiAgICAgICAgY29uc3QgZGVmID0gbm9kZS5hdHRycy5kZWZhdWx0Um93ID09PSB1bmRlZmluZWQgPyAnJyA6IG5vZGUuYXR0cnMuZGVmYXVsdFJvdztcbiAgICAgICAgY29uc3QgZXhwYW5kUm93cyA9IG5vZGUuYXR0cnMuZXhwYW5kIHx8IGV4cGFuZDtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSBub2RlLmF0dHJzLmNvbGxhcHNpYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogbm9kZS5hdHRycy5jb2xsYXBzaWJsZTtcbiAgICAgICAgaWYgKCFyb3dzKSB7XG4gICAgICAgICAgICBsb2cud2FybihgRWRpdExpc3Qke2Nzc30gcm93cyBhcnJheSBpcyBtaXNzaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyb3dzIHx8ICFyb3dzLm1hcCkge1xuICAgICAgICAgICAgbG9nLndhcm4oYEVkaXRMaXN0JHtjc3N9IHJvd3MgbXVzdCBiZSBhbiBhcnJheWApO1xuICAgICAgICB9XG4gICAgICAgIGV4cGFuZFJvd3Mocm93cywgZGVmLCBpc0VtcHR5KTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgICAgIGhzbGF5b3V0XzEubSgnLmhzZWRpdF9saXN0X2NvbnRlbnQnLCB7XG4gICAgICAgICAgICAgICAgb251cGRhdGUobm9kZSkgeyBhZGp1c3RMaXN0Um93SGVpZ2h0KG5vZGUuZG9tKTsgfSxcbiAgICAgICAgICAgIH0sIHJvd3Muc29ydChzb3J0KS5tYXAoKHJvdywgaSkgPT4gaHNsYXlvdXRfMS5tKGhzbGF5b3V0XzIuTGF5b3V0LCB7XG4gICAgICAgICAgICAgICAgY3NzOiAnLmhzZWRpdF9saXN0X3JvdycsXG4gICAgICAgICAgICAgICAgb251cGRhdGUobm9kZSkgeyBhZGp1c3RMaXN0Um93SGVpZ2h0KG5vZGUuZG9tKTsgfSxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBub2RlLmF0dHJzLmNvbHVtbkxheW91dCB8fCBbXSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiByZW5kZXIocm93LCBpKVxuICAgICAgICAgICAgfSkpKVxuICAgICAgICBdO1xuICAgICAgICBpZiAoY29sbGFwc2libGUgJiYgbm9kZS5hdHRycy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oQ29sbGFwc2libGVfMS5Db2xsYXBzaWJsZSwge1xuICAgICAgICAgICAgICAgIGNzczogYC5lZGl0X2xpc3Qke2Nzc31gLFxuICAgICAgICAgICAgICAgIGlzRXhwYW5kZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50czogW1xuICAgICAgICAgICAgICAgICAgICBoc2xheW91dF8xLm0oJy5oc2VkaXRfbGlzdF9oZWFkZXInLCBub2RlLmF0dHJzLmhlYWRlciksXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChub2RlLmF0dHJzLmhlYWRlcikge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQudW5zaGlmdChoc2xheW91dF8xLm0oJy5oc2VkaXRfbGlzdF9oZWFkZXInLCBub2RlLmF0dHJzLmhlYWRlcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShgLmVkaXRfbGlzdCR7Y3NzfWAsIGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5FZGl0TGlzdCA9IEVkaXRMaXN0O1xuZnVuY3Rpb24gZXhwYW5kKHJvd3MsIGRlZiwgaXNFbXB0eSkge1xuICAgIGNvbnN0IGxhc3RSb3dJbmRleCA9IHJvd3MubGVuZ3RoIC0gMTtcbiAgICBpZiAobGFzdFJvd0luZGV4IDwgMCB8fCAhaXNFbXB0eShyb3dzW2xhc3RSb3dJbmRleF0pKSB7XG4gICAgICAgIHJvd3MucHVzaChkZWYpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVJXUnBkRXhwYzNRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZSV1JwZEV4cGMzUXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGelJrRXNkVU5CUVc5RE8wRkJRM0JETEcxRFFVRnJRenRCUVVGRkxFMUJRVTBzUjBGQlJ5eEhRVUZITEVsQlFVa3NXVUZCUnl4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRE8wRkJRM0JGTEhWRFFVRnZRenRCUVVOd1F5d3lRMEZCZDBNN1FVRkRlRU1zSzBOQlFUUkRPMEZCWVRWRExFMUJRVTBzVlVGQlZTeEhRVUZWTEVOQlFVTXNSMEZCVHl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFZEJRVWNzU1VGQlNTeEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRPMEZCVDNwRkxFMUJRVTBzWVVGQllTeEhRVUZITEVOQlFVTXNTVUZCVlN4RlFVRlpMRVZCUVVVN1NVRkRNME1zVDBGQlR5eERRVUZETEVkQlFVOHNSVUZCUlN4TlFVRmhMRVZCUVZFc1JVRkJSVHRSUVVOd1F5eEpRVUZKTEVkQlFVY3NRMEZCUXl4SFFVRkhMRVZCUVVVN1dVRkRWQ3hQUVVGUExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRlJMRVZCUVVVc1EwRkJVU3hGUVVGRkxFVkJRVVVzUTBGQlF5eFpRVUZETEVOQlFVTXNjVUpCUVZNc1JVRkJSVHRuUWtGRGFFUXNUMEZCVHl4RlFVRkZMRU5CUVVNN1owSkJRMVlzVjBGQlZ5eEZRVUZGTEZGQlFWRTdaMEpCUTNKQ0xFMUJRVTBzUlVGQlJTeERRVUZETEZGQlFXVXNSVUZCUlN4RlFVRkZMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEZGQlFWRTdZVUZEYWtRc1EwRkJReXhEUVVGRExFTkJRVU03VTBGRFVEdGhRVUZOTEVsQlFVa3NUVUZCVFN4RFFVRkRMRk5CUVZNc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4TFFVRkxMR2xDUVVGcFFpeEZRVUZGTzFsQlEyeEZMRTlCUVU4c1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGUkxFVkJRVVVzUlVGQlJTeERRVUZETEZsQlFVTXNRMEZCUXl4eFFrRkJVeXhGUVVGRk8yZENRVU51UkN4UFFVRlBMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEWml4WFFVRlhMRVZCUVVVc1VVRkJVVHRuUWtGRGNrSXNUVUZCVFN4RlFVRkZMRU5CUVVNc1VVRkJaU3hGUVVGRkxFVkJRVVVzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1VVRkJVVHRoUVVOcVJDeERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTlFPMkZCUVUwN1dVRkRTQ3hQUVVGUExGbEJRVU1zUTBGQlF5eHhRa0ZCVXl4RlFVRkZPMmRDUVVOb1FpeFBRVUZQTEVWQlFVVXNSMEZCUnp0blFrRkRXaXhYUVVGWExFVkJRVVVzVVVGQlVUdG5Ra0ZEY2tJc1RVRkJUU3hGUVVGRkxFTkJRVU1zVVVGQlpTeEZRVUZGTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzVVVGQlVUdGhRVU4yUkN4RFFVRkRMRU5CUVVNN1UwRkRUanRKUVVOTUxFTkJRVU1zUTBGQlF6dEJRVU5PTEVOQlFVTXNRMEZCUXp0QlFVVkdMRk5CUVZNc2JVSkJRVzFDTEVOQlFVTXNSMEZCVHl4RlFVRkZMRTFCUVUwc1IwRkJReXhGUVVGRk8wbEJRek5ETEUxQlFVMHNUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRlBMRVZCUVVVc1JVRkJSU3hEUVVOc1JTeFJRVUZSTEVOQlFVTXNUVUZCVFN4RFFVRkRMR2RDUVVGblFpeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVNNVF5eERRVUZETEVOQlFVTTdTVUZEU0N4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eFRRVUZUTEVOQlFVTXNVVUZCVVN4RFFVRkRMSEZDUVVGeFFpeERRVUZETEVWQlFVVTdVVUZEZGtRc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVkQlFVY3NUVUZCVFN4SFFVRkRMRU5CUVVNc1EwRkJRU3hEUVVGRExFTkJRVU1zUjBGQlJ5eE5RVUZOTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRE8wdEJRM1pFTzBGQlEwd3NRMEZCUXp0QlFVVkVMRTFCUVdFc1VVRkJVVHRKUVVOcVFpeEpRVUZKTEVOQlFVTXNTVUZCVlR0UlFVTllMRTFCUVUwc1IwRkJSeXhIUVVGVkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVONFF5eE5RVUZOTEVsQlFVa3NSMEZCVXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzU1VGQlNTeERRVUZETEVkQlFVVXNSVUZCUlN4RFFVRkJMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRemxETEUxQlFVMHNTVUZCU1N4SFFVRlRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETzFGQlEyNURMRTFCUVUwc1QwRkJUeXhIUVVGTkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4SlFVRkpMRlZCUVZVc1EwRkJRenRSUVVOd1JDeE5RVUZOTEUxQlFVMHNSMEZCVHl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGTkJRVk1zU1VGQlNTeGhRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRMMFFzVFVGQlRTeEhRVUZITEVkQlFWVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhWUVVGVkxFdEJRVWNzVTBGQlV5eERRVUZCTEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWVUZCVlN4RFFVRkRPMUZCUTJwR0xFMUJRVTBzVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hKUVVGSkxFMUJRVTBzUTBGQlF6dFJRVU12UXl4TlFVRk5MRmRCUVZjc1IwRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWY3NTMEZCUnl4VFFVRlRMRU5CUVVFc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFTkJRVU03VVVGRmNrWXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSVHRaUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNWMEZCVnl4SFFVRkhMSGRDUVVGM1FpeERRVUZETEVOQlFVTTdVMEZCUlR0UlFVTm9SU3hKUVVGSkxFTkJRVU1zU1VGQlNTeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1JVRkJSVHRaUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNWMEZCVnl4SFFVRkhMSGRDUVVGM1FpeERRVUZETEVOQlFVTTdVMEZCUlR0UlFVTTNSU3hWUVVGVkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVkQlFVY3NSVUZCUlN4UFFVRlBMRU5CUVVNc1EwRkJRenRSUVVNdlFpeE5RVUZOTEU5QlFVOHNSMEZCUnp0WlFVTmFMRmxCUVVNc1EwRkJReXh6UWtGQmMwSXNSVUZCUlR0blFrRkRkRUlzVVVGQlVTeERRVUZETEVsQlFWVXNTVUZCU1N4dFFrRkJiVUlzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yRkJRekZFTEVWQlEwY3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRlBMRVZCUVVVc1EwRkJVU3hGUVVGRkxFVkJRVVVzUTBGQlF5eFpRVUZETEVOQlFVTXNhVUpCUVUwc1JVRkJSVHRuUWtGRGFrUXNSMEZCUnl4RlFVRkZMR3RDUVVGclFqdG5Ra0ZEZGtJc1VVRkJVU3hEUVVGRExFbEJRVlVzU1VGQlNTeHRRa0ZCYlVJc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOMlJDeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhaUVVGWkxFbEJRVWtzUlVGQlJUdG5Ra0ZEZEVNc1QwRkJUeXhGUVVGRkxFMUJRVTBzUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRPMkZCUXpGQ0xFTkJRVU1zUTBGQlF5eERRVU5PTzFOQlEwb3NRMEZCUXp0UlFVTkdMRWxCUVVrc1YwRkJWeXhKUVVGSkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RlFVRkZPMWxCUTJ4RExFOUJRVThzV1VGQlF5eERRVUZETEhsQ1FVRlhMRVZCUVVVN1owSkJRMnhDTEVkQlFVY3NSVUZCUlN4aFFVRmhMRWRCUVVjc1JVRkJSVHRuUWtGRGRrSXNWVUZCVlN4RlFVRkZMRWxCUVVrN1owSkJRMmhDTEZWQlFWVXNSVUZCUlR0dlFrRkRVaXhaUVVGRExFTkJRVU1zY1VKQlFYRkNMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTTdiMEpCUXpORExFOUJRVTg3YVVKQlExWTdZVUZEU2l4RFFVRkRMRU5CUVVNN1UwRkRUanRoUVVGTk8xbEJRMGdzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1JVRkJSVHRuUWtGRGJrSXNUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhaUVVGRExFTkJRVU1zY1VKQlFYRkNMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRPMkZCUTJoRk8xbEJRMFFzVDBGQlR5eFpRVUZETEVOQlFVTXNZVUZCWVN4SFFVRkhMRVZCUVVVc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6dFRRVU42UXp0SlFVTk1MRU5CUVVNN1EwRkRTanRCUVRGRFJDdzBRa0V3UTBNN1FVRkZSQ3hUUVVGVExFMUJRVTBzUTBGQlF5eEpRVUZWTEVWQlFVVXNSMEZCVHl4RlFVRkZMRTlCUVdNN1NVRkRMME1zVFVGQlRTeFpRVUZaTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVU03U1VGRGNrTXNTVUZCU1N4WlFVRlpMRWRCUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1EwRkJReXhGUVVGRk8xRkJRMmhFTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03UzBGRGJFSTdRVUZEVEN4RFFVRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgaHN1dGlsXzEgPSByZXF1aXJlKFwiaHN1dGlsXCIpO1xuY29uc3QgbG9nID0gbmV3IGhzdXRpbF8xLkxvZygnRWRpdFNlbGVjdCcpO1xuY2xhc3MgRWRpdFNlbGVjdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0YWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBjbGljaygpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RhYmxlID0gdHJ1ZTtcbiAgICB9XG4gICAgc2VsZWN0KGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoZS5jdXJyZW50VGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RhYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZSA9IG5vZGUuYXR0cnMudXBkYXRlO1xuICAgICAgICBjb25zdCBjc3MgPSBub2RlLmF0dHJzLmNzcyB8fCAnJztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShgc2VsZWN0LmhzZWRpdF9zZWxlY3Qke2Nzc31gLCB7IG9uY2hhbmdlOiB0aGlzLnNlbGVjdC5iaW5kKHRoaXMpIH0sIG5vZGUuYXR0cnMuZnJvbS5tYXAoKG8pID0+IG5vZGUuYXR0cnMuc2VsZWN0ZWQgPT09IG8gP1xuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKCdvcHRpb24uaHNlZGl0X3NlbGVjdF9vcHRpb24uc2VsZWN0ZWQnLCB7IHZhbHVlOiBvLCBzZWxlY3RlZDogdHJ1ZSB9LCBvKSA6XG4gICAgICAgICAgICBoc2xheW91dF8xLm0oJ29wdGlvbi5oc2VkaXRfc2VsZWN0X29wdGlvbicsIHsgdmFsdWU6IG8gfSwgbykpKTtcbiAgICB9XG59XG5leHBvcnRzLkVkaXRTZWxlY3QgPSBFZGl0U2VsZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUldScGRGTmxiR1ZqZEM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OUZaR2wwVTJWc1pXTjBMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQmNVTkJMSFZEUVVGdlF6dEJRVU53UXl4dFEwRkJhME03UVVGQlJTeE5RVUZOTEVkQlFVY3NSMEZCUnl4SlFVRkpMRmxCUVVjc1EwRkJReXhaUVVGWkxFTkJRVU1zUTBGQlF6dEJRVWQwUlN4TlFVRmhMRlZCUVZVN1NVRkJka0k3VVVGRlNTeGxRVUZWTEVkQlFVY3NTMEZCU3l4RFFVRkRPMGxCYlVKMlFpeERRVUZETzBsQmFrSkhMRXRCUVVzN1VVRkRSQ3hKUVVGSkxFTkJRVU1zVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXp0SlFVTXpRaXhEUVVGRE8wbEJSVVFzVFVGQlRTeERRVUZETEVOQlFVczdVVUZEVWl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eGhRVUZoTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1VVRkRia01zU1VGQlNTeERRVUZETEZWQlFWVXNSMEZCUnl4TFFVRkxMRU5CUVVNN1NVRkROVUlzUTBGQlF6dEpRVVZFTEVsQlFVa3NRMEZCUXl4SlFVRlZPMUZCUTFnc1NVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJRenRSUVVOb1F5eE5RVUZOTEVkQlFVY3NSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzU1VGQlNTeEZRVUZGTEVOQlFVTTdVVUZEYWtNc1QwRkJUeXhaUVVGRExFTkJRVU1zZFVKQlFYVkNMRWRCUVVjc1JVRkJSU3hGUVVGRkxFVkJRVVVzVVVGQlVTeEZRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZETEVWQlEzSkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVZFc1JVRkJSU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRXRCUVVjc1EwRkJReXhEUVVGQkxFTkJRVU03V1VGRGRFUXNXVUZCUXl4RFFVRkRMSE5EUVVGelF5eEZRVUZGTEVWQlFVVXNTMEZCU3l4RlFVRkZMRU5CUVVNc1JVRkJSU3hSUVVGUkxFVkJRVU1zU1VGQlNTeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVNelJTeFpRVUZETEVOQlFVTXNOa0pCUVRaQ0xFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEyaEZMRU5CUVVNN1EwRkRTanRCUVhKQ1JDeG5RMEZ4UWtNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzdXRpbF8xID0gcmVxdWlyZShcImhzdXRpbFwiKTtcbmNvbnN0IGxvZyA9IG5ldyBoc3V0aWxfMS5Mb2coJ0VkaXRUZXh0YXJlYScpO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNsYXNzIEVkaXRUZXh0YXJlYSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRlZmF1bHQgPSAnJztcbiAgICB9XG4gICAgYWRqdXN0VGV4dEFyZWFIZWlnaHQoZG9tKSB7XG4gICAgICAgIGlmIChkb20gJiYgZG9tLmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgd2hpbGUgKCFkb20uY2xhc3NMaXN0LmNvbnRhaW5zKCdoc2VkaXRfdGV4dGFyZWEnKSkge1xuICAgICAgICAgICAgICAgIGRvbSA9IGRvbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2NIZWlnaHQgPSBkb20uc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9tKS5oZWlnaHQpO1xuICAgICAgICAgICAgY29uc3QgaCA9IE1hdGgubWF4KGhlaWdodCwgc2NIZWlnaHQpO1xuICAgICAgICAgICAgZG9tLnN0eWxlLmhlaWdodCA9IGggPiAwID8gYCR7aH1weGAgOiAnYXV0byc7XG4gICAgICAgICAgICBjb25zdCBsaXN0Um93ID0gZG9tLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIGlmIChsaXN0Um93LmNsYXNzTGlzdC5jb250YWlucygnaHNlZGl0X2xpc3Rfcm93JykpIHtcbiAgICAgICAgICAgICAgICBsaXN0Um93LnN0eWxlLmhlaWdodCA9IGggPiAwID8gYCR7aCArICh0aGlzLmVkaXRhYmxlID8gNCA6IDApfXB4YCA6ICdhdXRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGljayhlKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSAhdGhpcy5lZGl0YWJsZTtcbiAgICB9XG4gICAgYmx1cihlKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZShlLnRhcmdldC52YWx1ZSk7XG4gICAgfVxuICAgIHVwZGF0ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNCKG5ld1ZhbHVlKTtcbiAgICB9XG4gICAgb251cGRhdGUobm9kZSkge1xuICAgICAgICBpZiAodGhpcy5lZGl0YWJsZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0ZvY3VzKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5kb20udmFsdWUgPSBub2RlLmF0dHJzLmNvbnRlbnQgfHwgdGhpcy5kZWZhdWx0O1xuICAgICAgICAgICAgICAgIG5vZGUuZG9tLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgbm9kZS5kb20uc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNGb2N1cyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFkanVzdFRleHRBcmVhSGVpZ2h0KG5vZGUuZG9tKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDQiA9IG5vZGUuYXR0cnMudXBkYXRlO1xuICAgICAgICBjb25zdCBjc3MgPSBub2RlLmF0dHJzLmNzcyB8fCAnJztcbiAgICAgICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICAgICAgICBvbmNsaWNrOiB0aGlzLmNsaWNrLmJpbmQodGhpcyksXG4gICAgICAgICAgICBvbnVwZGF0ZTogKG5vZGUpID0+IHRoaXMuYWRqdXN0VGV4dEFyZWFIZWlnaHQuYmluZCh0aGlzKShub2RlLmRvbSlcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGhzbGF5b3V0XzEubS50cnVzdChub2RlLmF0dHJzLmNvbnRlbnQucmVwbGFjZSgvXFxuL2csICc8cD4nKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRhYmxlID9cbiAgICAgICAgICAgIGhzbGF5b3V0XzEubShgdGV4dGFyZWEuaHNlZGl0X3RleHRhcmVhJHtjc3N9YCwge1xuICAgICAgICAgICAgICAgIHdyYXA6ICdwaHlzaWNhbCcsXG4gICAgICAgICAgICAgICAgb25ibHVyOiB0aGlzLmJsdXIuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIH0sIGNvbnRlbnQpXG4gICAgICAgICAgICA6IChub2RlLmF0dHJzLmNvbnRlbnQgJiYgbm9kZS5hdHRycy5jb250ZW50Lmxlbmd0aCkgP1xuICAgICAgICAgICAgICAgIGhzbGF5b3V0XzEubShgLmhzZWRpdF90ZXh0YXJlYSR7Y3NzfWAsIGF0dHJzLCBjb250ZW50KVxuICAgICAgICAgICAgICAgIDogaHNsYXlvdXRfMS5tKGAuaHNlZGl0X3RleHRhcmVhLmRlZmF1bHQke2Nzc31gLCBhdHRycywgbm9kZS5hdHRycy5wbGFjZWhvbGRlciB8fCAnY2xpY2sgdG8gZW50ZXInKTtcbiAgICB9XG59XG5leHBvcnRzLkVkaXRUZXh0YXJlYSA9IEVkaXRUZXh0YXJlYTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVJXUnBkRlJsZUhSaGNtVmhMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDBWa2FYUlVaWGgwWVhKbFlTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVhGRFFTeHRRMEZCYTBNN1FVRkJSU3hOUVVGTkxFZEJRVWNzUjBGQlJ5eEpRVUZKTEZsQlFVY3NRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJRenRCUVVONFJTeDFRMEZCYjBNN1FVRkhjRU1zVFVGQllTeFpRVUZaTzBsQlFYcENPMUZCUTJNc1lVRkJVU3hIUVVGSExFdEJRVXNzUTBGQlF6dFJRVU5xUWl4aFFVRlJMRWRCUVVjc1MwRkJTeXhEUVVGRE8xRkJSV3BDTEZsQlFVOHNSMEZCUnl4RlFVRkZMRU5CUVVNN1NVRXlSRE5DTEVOQlFVTTdTVUY2UkdFc2IwSkJRVzlDTEVOQlFVTXNSMEZCVHp0UlFVTnNReXhKUVVGSkxFZEJRVWNzU1VGQlNTeEhRVUZITEVOQlFVTXNVMEZCVXl4RlFVRkZPMWxCUTNSQ0xFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNVMEZCVXl4RFFVRkRMRkZCUVZFc1EwRkJReXhwUWtGQmFVSXNRMEZCUXl4RlFVRkZPMmRDUVVGRkxFZEJRVWNzUjBGQlJ5eEhRVUZITEVOQlFVTXNZVUZCWVN4RFFVRkRPMkZCUVVVN1dVRkRMMFVzVFVGQlRTeFJRVUZSTEVkQlFVY3NSMEZCUnl4RFFVRkRMRmxCUVZrc1EwRkJRenRaUVVOc1F5eE5RVUZOTEUxQlFVMHNSMEZCUnl4UlFVRlJMRU5CUVVNc1RVRkJUU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETzFsQlF6ZEVMRTFCUVUwc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNUVUZCVFN4RlFVRkZMRkZCUVZFc1EwRkJReXhEUVVGRE8xbEJRM0pETEVkQlFVY3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hIUVVGSExFTkJRVU1zUjBGQlF5eERRVUZETEVOQlFVRXNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXp0WlFVVXhReXhOUVVGTkxFOUJRVThzUjBGQlJ5eEhRVUZITEVOQlFVTXNZVUZCWVN4RFFVRkRMR0ZCUVdFc1EwRkJRenRaUVVOb1JDeEpRVUZKTEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUVVNc1VVRkJVU3hEUVVGRExHbENRVUZwUWl4RFFVRkRMRVZCUVVVN1owSkJReTlETEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hIUVVGSExFTkJRVU1zUjBGQlF5eERRVUZETEVOQlFVRXNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUVN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU03WVVGRGVrVTdVMEZEU2p0SlFVTk1MRU5CUVVNN1NVRkRVeXhMUVVGTExFTkJRVU1zUTBGQlN6dFJRVU5xUWl4SlFVRkpMRU5CUVVNc1VVRkJVU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUXp0SlFVTnVReXhEUVVGRE8wbEJSVk1zU1VGQlNTeERRVUZETEVOQlFVczdVVUZEYUVJc1NVRkJTU3hEUVVGRExGRkJRVkVzUjBGQlJ5eExRVUZMTEVOQlFVTTdVVUZEZEVJc1NVRkJTU3hEUVVGRExGRkJRVkVzUjBGQlJ5eExRVUZMTEVOQlFVTTdVVUZEZEVJc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8wbEJRMmhETEVOQlFVTTdTVUZGVXl4TlFVRk5MRU5CUVVNc1VVRkJaVHRSUVVNMVFpeEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8wbEJRelZDTEVOQlFVTTdTVUZGVFN4UlFVRlJMRU5CUVVNc1NVRkJWVHRSUVVOMFFpeEpRVUZKTEVsQlFVa3NRMEZCUXl4UlFVRlJMRVZCUVVVN1dVRkRaaXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlR0blFrRkRhRUlzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVsQlFVa3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJRenRuUWtGRGNFUXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dG5Ra0ZEYWtJc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXp0blFrRkRiRUlzU1VGQlNTeERRVUZETEZGQlFWRXNSMEZCUnl4SlFVRkpMRU5CUVVNN1lVRkRlRUk3V1VGRFJDeEpRVUZKTEVOQlFVTXNiMEpCUVc5Q0xFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMU5CUTNaRE8wbEJRMHdzUTBGQlF6dEpRVVZOTEVsQlFVa3NRMEZCUXl4SlFVRlZPMUZCUTJ4Q0xFbEJRVWtzUTBGQlF5eFJRVUZSTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU03VVVGRGJFTXNUVUZCVFN4SFFVRkhMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVsQlFVa3NSVUZCUlN4RFFVRkRPMUZCUTJwRExFMUJRVTBzUzBGQlN5eEhRVUZITzFsQlExWXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXp0WlFVTTVRaXhSUVVGUkxFVkJRVVVzUTBGQlF5eEpRVUZWTEVWQlFVVXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXh2UWtGQmIwSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXp0VFFVTXpSU3hEUVVGRE8xRkJRMFlzVFVGQlRTeFBRVUZQTEVkQlFVY3NXVUZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUVVNc1MwRkJTeXhGUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEYWtVc1QwRkJUeXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZCTEVOQlFVTTdXVUZEYWtJc1dVRkJReXhEUVVGRExESkNRVUV5UWl4SFFVRkhMRVZCUVVVc1JVRkJSVHRuUWtGRGFFTXNTVUZCU1N4RlFVRkZMRlZCUVZVN1owSkJRMmhDTEUxQlFVMHNSVUZCUlN4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTTdZVUZETDBJc1JVRkJSU3hQUVVGUExFTkJRVU03V1VGRGFrSXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVRXNRMEZCUXp0blFrRkRPVU1zV1VGQlF5eERRVUZETEcxQ1FVRnRRaXhIUVVGSExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNUMEZCVHl4RFFVRkRPMmRDUVVNM1F5eERRVUZETEVOQlFVTXNXVUZCUXl4RFFVRkRMREpDUVVFeVFpeEhRVUZITEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFhRVUZYTEVsQlFVa3NaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dEpRVU12Uml4RFFVRkRPME5CUTBvN1FVRXZSRVFzYjBOQkswUkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY2xhc3MgTGFiZWwge1xuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBjc3MgPSBub2RlLmF0dHJzLmNzcyB8fCAnJztcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBub2RlLmF0dHJzLnN0eWxlIHx8ICcnO1xuICAgICAgICBjb25zdCB0ZXh0ID0gbm9kZS5hdHRycy50ZXh0IHx8ICd1bnNwZWNpZmllZCc7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oYC5ocy1sYWJlbCAke2Nzc31gLCB7IHN0eWxlOiBzdHlsZSB9LCBoc2xheW91dF8xLm0udHJ1c3QodGV4dCkpO1xuICAgIH1cbn1cbmV4cG9ydHMuTGFiZWwgPSBMYWJlbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVRHRmlaV3d1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdlRHRmlaV3d1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRm5RMEVzZFVOQlFYZERPMEZCV1hoRExFMUJRV0VzUzBGQlN6dEpRVU5rTEVsQlFVa3NRMEZCUXl4SlFVRlhPMUZCUTFvc1RVRkJUU3hIUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRWxCUVVrc1JVRkJSU3hEUVVGRE8xRkJRMnBETEUxQlFVMHNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVTnlReXhOUVVGTkxFbEJRVWtzUjBGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1NVRkJTU3hoUVVGaExFTkJRVU03VVVGREwwTXNUMEZCVHl4WlFVRkRMRU5CUVVNc1lVRkJZU3hIUVVGSExFVkJRVVVzUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUXl4TFFVRkxMRVZCUVVVc1JVRkJSU3haUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRha1VzUTBGQlF6dERRVU5LTzBGQlVFUXNjMEpCVDBNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBoc2xheW91dF8yID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgUmFkaW9CdXR0b25fMSA9IHJlcXVpcmUoXCIuL1JhZGlvQnV0dG9uXCIpO1xuY2xhc3MgTWVudSBleHRlbmRzIFJhZGlvQnV0dG9uXzEuUmFkaW9CdXR0b24ge1xuICAgIHZpZXcobm9kZSkge1xuICAgICAgICB0aGlzLm9udXBkYXRlKG5vZGUpO1xuICAgICAgICByZXR1cm4gUmFkaW9CdXR0b25fMS5SYWRpb0J1dHRvbi52aWV3R3JvdXAoJy5ocy1tZW51Jywgbm9kZSk7XG4gICAgfVxufVxuZXhwb3J0cy5NZW51ID0gTWVudTtcbmNsYXNzIE1lbnVQYW5lbCBleHRlbmRzIGhzbGF5b3V0XzIuTGF5b3V0IHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gbm9kZS5hdHRycy5pdGVtcy5pbmRleE9mKG5vZGUuYXR0cnMuZGVmYXVsdEl0ZW0pO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgbGV0IGl0ZW1zID0gbm9kZS5hdHRycy5pdGVtcztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShoc2xheW91dF8yLkxheW91dCwge1xuICAgICAgICAgICAgcm93czogW1wiMzBweFwiLCBcImZpbGxcIl0sXG4gICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgICAgaHNsYXlvdXRfMS5tKE1lbnUsIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzYzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGl0ZW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEl0ZW06IG5vZGUuYXR0cnMuZGVmYXVsdEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkOiAoaXRlbSkgPT4gdGhpcy5zZWxlY3RlZCA9IGl0ZW1zLmluZGV4T2YoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBub2RlLmF0dHJzLmNzcyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IG5vZGUuYXR0cnMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIHNpemVzOiBub2RlLmF0dHJzLnNpemVzXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgaHNsYXlvdXRfMS5tKGhzbGF5b3V0XzIuTGF5b3V0LCB7IGNzczogJy5ocy1tZW51LXBhbmVsJywgY29udGVudDogbm9kZS5hdHRycy5jb250ZW50W3RoaXMuc2VsZWN0ZWRdIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuTWVudVBhbmVsID0gTWVudVBhbmVsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVFdWdWRTNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlOWlc1MUxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCT0VaQkxIVkRRVUYzUXp0QlFVTjRReXgxUTBGQmQwTTdRVUZEZUVNc0swTkJRVFpETzBGQk5FSTNReXhOUVVGaExFbEJRVXNzVTBGQlVTeDVRa0ZCVnp0SlFVTnFReXhKUVVGSkxFTkJRVU1zU1VGQlZ6dFJRVU5hTEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGNFSXNUMEZCVHl4NVFrRkJWeXhEUVVGRExGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRia1FzUTBGQlF6dERRVU5LTzBGQlRFUXNiMEpCUzBNN1FVRjVRa1FzVFVGQllTeFRRVUZWTEZOQlFWRXNhVUpCUVUwN1NVRkZha01zVFVGQlRTeERRVUZETEVsQlFWYzdVVUZEWkN4SlFVRkpMRU5CUVVNc1VVRkJVU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMGxCUTNKRkxFTkJRVU03U1VGRFJDeEpRVUZKTEVOQlFVTXNTVUZCVnp0UlFVTmFMRWxCUVVrc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRPMUZCUXpkQ0xFOUJRVThzV1VGQlF5eERRVUZETEdsQ1FVRk5MRVZCUVVVN1dVRkRZaXhKUVVGSkxFVkJRVU1zUTBGQlF5eE5RVUZOTEVWQlFVVXNUVUZCVFN4RFFVRkRPMWxCUTNKQ0xFOUJRVThzUlVGQlF6dG5Ra0ZEU2l4WlFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRk8yOUNRVU5LTEVsQlFVa3NSVUZCUlR0M1FrRkRSaXhMUVVGTExFVkJRVVVzUzBGQlN6dDNRa0ZEV2l4WFFVRlhMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFhRVUZYTzNkQ1FVTnVReXhQUVVGUExFVkJRVVVzUTBGQlF5eEpRVUZYTEVWQlFVVXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNN2NVSkJRMmhGTzI5Q1FVTkVMRWRCUVVjc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVYzdiMEpCUTI1Q0xFdEJRVXNzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzN2IwSkJRM1pDTEV0QlFVc3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXM3YVVKQlF6RkNMRU5CUVVNN1owSkJRMFlzV1VGQlF5eERRVUZETEdsQ1FVRk5MRVZCUVVVc1JVRkJSU3hIUVVGSExFVkJRVU1zWjBKQlFXZENMRVZCUVVVc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zUlVGQlJTeERRVUZETzJGQlEyeEdPMU5CUTBvc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF6dERRVU5LTzBGQmVFSkVMRGhDUVhkQ1F5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBUb29sYmFyQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9Ub29sYmFyQnV0dG9uXCIpO1xuY2xhc3MgTW9kYWwge1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIG5vZGUuc3RhdGUuaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKTtcbiAgICAgICAgbm9kZS5zdGF0ZS5zaG93TW9kYWwgPSBmYWxzZTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLnNob3dNb2RhbCA9IHRydWU7XG4gICAgICAgICAgICBoc2xheW91dF8xLm0ucmVkcmF3KCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGRpc21pc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5vZGUuYXR0cnMuZGlzbWlzcykge1xuICAgICAgICAgICAgICAgIG5vZGUuYXR0cnMuZGlzbWlzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB3ID0gbm9kZS5hdHRycy53aWR0aCB8fCAnYXV0byc7XG4gICAgICAgIGNvbnN0IGggPSBub2RlLmF0dHJzLmhlaWdodCB8fCAnYXV0byc7XG4gICAgICAgIGNvbnN0IGF0dHJzID0geyBzdHlsZTogYHdpZHRoOiR7d307IGhlaWdodDoke2h9O2AgfTtcbiAgICAgICAgaWYgKG5vZGUuYXR0cnMuc2V0VHJpZ2dlcikge1xuICAgICAgICAgICAgbm9kZS5hdHRycy5zZXRUcmlnZ2VyKHRyaWdnZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHJlcXVpcmVkIGF0dHJpYnV0ZSBmdW5jdGlvbiAnc2V0VHJpZ2dlcicgaXMgbm90IGRlZmluZWRgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gIW5vZGUuc3RhdGUuc2hvd01vZGFsID8gaHNsYXlvdXRfMS5tKCdzcGFuJykgOiBoc2xheW91dF8xLm0oJy5ocy1tb2RhbC1mcmFtZScsIFtcbiAgICAgICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLW1vZGFsLWJhY2tncm91bmQnLCB7IG9uY2xpY2s6IGRpc21pc3MgfSwgJycpLFxuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKCcuaHMtbW9kYWwtZm9yZWdyb3VuZCcsIGF0dHJzLCAhbm9kZS5hdHRycy5jb250ZW50ID8gJ21vZGFsIHBhbmUnIDogW1xuICAgICAgICAgICAgICAgIG5vZGUuYXR0cnMuY29udGVudCxcbiAgICAgICAgICAgICAgICBoc2xheW91dF8xLm0oVG9vbGJhckJ1dHRvbl8xLlRvb2xiYXJCdXR0b24sIHsgb25jbGljazogZGlzbWlzcywgc3ltYm9sczogVG9vbGJhckJ1dHRvbl8xLlRvb2xiYXJCdXR0b24uZ2V0U3ltYm9sKCdjcm9zcycpIH0pXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKTtcbiAgICB9XG59XG5leHBvcnRzLk1vZGFsID0gTW9kYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUVzlrWVd3dWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZUVzlrWVd3dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZ2UTBFc2RVTkJRVzlETzBGQlEzQkRMRzFFUVVGblJEdEJRVVZvUkN4TlFVRmhMRXRCUVVzN1NVRkRaQ3hOUVVGTkxFTkJRVU1zU1VGQlZUdFJRVU5pTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1JVRkJSU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hIUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF5OURMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eEhRVUZITEV0QlFVc3NRMEZCUXp0SlFVTnFReXhEUVVGRE8wbEJRMFFzU1VGQlNTeERRVUZETEVsQlFWVTdVVUZEV0N4TlFVRk5MRTlCUVU4c1IwRkJSeXhIUVVGSExFVkJRVVU3V1VGRGFrSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhUUVVGVExFZEJRVWNzU1VGQlNTeERRVUZETzFsQlF6VkNMRmxCUVVNc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF6dFJRVU5tTEVOQlFVTXNRMEZCUXp0UlFVTkdMRTFCUVUwc1QwRkJUeXhIUVVGSExFZEJRVWNzUlVGQlJUdFpRVU5xUWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGTkJRVk1zUjBGQlJ5eExRVUZMTEVOQlFVTTdXVUZETjBJc1NVRkJTU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlR0blFrRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMkZCUVVVN1VVRkRja1FzUTBGQlF5eERRVUZETzFGQlEwWXNUVUZCVFN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVsQlFVc3NUVUZCVFN4RFFVRkRPMUZCUTNSRExFMUJRVTBzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hKUVVGSkxFMUJRVTBzUTBGQlF6dFJRVU4wUXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhGUVVGRkxFdEJRVXNzUlVGQlJTeFRRVUZUTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWRCUVVjc1JVRkJReXhEUVVGRE8xRkJRMjVFTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhWUVVGVkxFVkJRVVU3V1VGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRlZCUVZVc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFRRVUZGTzJGQlEzcEVPMWxCUVVVc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eDVSRUZCZVVRc1EwRkJReXhEUVVGRE8xTkJRVVU3VVVGRGFFWXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZCTEVOQlFVTXNRMEZCUXl4WlFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZsQlFVTXNRMEZCUXl4cFFrRkJhVUlzUlVGQlJUdFpRVU16UkN4WlFVRkRMRU5CUVVNc2MwSkJRWE5DTEVWQlFVVXNSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRExFVkJRVVVzUlVGQlJTeERRVUZETzFsQlEyeEVMRmxCUVVNc1EwRkJReXh6UWtGQmMwSXNSVUZCUlN4TFFVRkxMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUVN4RFFVRkRMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEYWtVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTzJkQ1FVTnNRaXhaUVVGRExFTkJRVU1zTmtKQlFXRXNSVUZCUlN4RlFVRkZMRTlCUVU4c1JVRkJSU3hQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZETERaQ1FVRmhMRU5CUVVNc1UwRkJVeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTEVOQlFVTTdZVUZEYmtZc1EwRkJRenRUUVVOTUxFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdRMEZEU2p0QlFUTkNSQ3h6UWtFeVFrTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgaHNsYXlvdXRfMiA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IFNlbGVjdG9yXzEgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNvbnN0IFNlbGVjdG9yXzIgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNsYXNzIE9wdGlvbnNCdXR0b24gZXh0ZW5kcyBTZWxlY3Rvcl8xLlNlbGVjdG9yIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBTZWxlY3Rvcl8xLlNlbGVjdG9yLmluaXQobm9kZSwgU2VsZWN0b3JfMi5hbnlJdGVtcyk7XG4gICAgfVxuICAgIHN0YXRpYyB2aWV3R3JvdXAoY3NzLCBub2RlKSB7XG4gICAgICAgIGNzcyA9IGAke2Nzc30gJHtub2RlLmF0dHJzLmNzcyB8fCAnJ31gO1xuICAgICAgICBjb25zdCBzdHlsZSA9IG5vZGUuYXR0cnMuc3R5bGUgfHwgJyc7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oY3NzLCB7IHN0eWxlOiBzdHlsZSB9LCBoc2xheW91dF8xLm0oaHNsYXlvdXRfMi5MYXlvdXQsIHtcbiAgICAgICAgICAgIGNvbHVtbnM6IFtdLFxuICAgICAgICAgICAgY29udGVudDogbm9kZS5zdGF0ZS5pdGVtcy5tYXAoKGwsIGkpID0+IFNlbGVjdG9yXzEuU2VsZWN0b3IucmVuZGVySXRlbShub2RlLCBpKSlcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHsgcmV0dXJuIE9wdGlvbnNCdXR0b24udmlld0dyb3VwKCcuaHMtb3B0aW9ucy1idXR0b25zJywgbm9kZSk7IH1cbn1cbmV4cG9ydHMuT3B0aW9uc0J1dHRvbiA9IE9wdGlvbnNCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUM0IwYVc5dWMwSjFkSFJ2Ymk1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OVBjSFJwYjI1elFuVjBkRzl1TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJLMEpCTEhWRFFVRjVRenRCUVVONlF5eDFRMEZCZVVNN1FVRkRla01zZVVOQlFUSkRPMEZCUXpORExIbERRVUV5UXp0QlFXdENNME1zVFVGQllTeGhRVUZqTEZOQlFWRXNiVUpCUVZFN1NVRkRka01zVFVGQlRTeERRVUZETEVsQlFWVTdVVUZEWWl4dFFrRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNiVUpCUVZFc1EwRkJReXhEUVVGRE8wbEJRMnhETEVOQlFVTTdTVUZEUkN4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExFZEJRVlVzUlVGQlJTeEpRVUZYTzFGQlEzQkRMRWRCUVVjc1IwRkJSeXhIUVVGSExFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1NVRkJTU3hGUVVGRkxFVkJRVVVzUTBGQlF6dFJRVU4yUXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NTVUZCU1N4RlFVRkZMRU5CUVVNN1VVRkZja01zVDBGQlR5eFpRVUZETEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVNc1MwRkJTeXhGUVVGRExFdEJRVXNzUlVGQlF5eEZRVUZGTEZsQlFVTXNRMEZCUXl4cFFrRkJUU3hGUVVGRk8xbEJRMjVETEU5QlFVOHNSVUZCUlN4RlFVRkZPMWxCUTFnc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVkVzUlVGQlJTeERRVUZSTEVWQlFVVXNSVUZCUlN4RFFVRkRMRzFDUVVGUkxFTkJRVU1zVlVGQlZTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVOMFJpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlNMRU5CUVVNN1NVRkRSQ3hKUVVGSkxFTkJRVU1zU1VGQlZ5eEpRVUZYTEU5QlFVOHNZVUZCWVN4RFFVRkRMRk5CUVZNc1EwRkJReXh4UWtGQmNVSXNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRE5VWTdRVUZrUkN4elEwRmpReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgaHNsYXlvdXRfMiA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IFNlbGVjdG9yXzEgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNsYXNzIFJhZGlvQnV0dG9uIGV4dGVuZHMgU2VsZWN0b3JfMS5TZWxlY3RvciB7XG4gICAgc3RhdGljIHZpZXdHcm91cChjc3MsIG5vZGUpIHtcbiAgICAgICAgY3NzID0gYCR7Y3NzfSAke25vZGUuYXR0cnMuY3NzIHx8ICcnfWA7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gbm9kZS5hdHRycy5zdHlsZSB8fCAnJztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShjc3MsIHsgc3R5bGU6IHN0eWxlIH0sIGhzbGF5b3V0XzEubShoc2xheW91dF8yLkxheW91dCwge1xuICAgICAgICAgICAgY29sdW1uczogbm9kZS5hdHRycy5zaXplcyB8fCBbXSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IG5vZGUuc3RhdGUuaXRlbXMubWFwKChsLCBpKSA9PiBTZWxlY3Rvcl8xLlNlbGVjdG9yLnJlbmRlckl0ZW0obm9kZSwgaSkpXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgc3VwZXIub25pbml0KG5vZGUpO1xuICAgICAgICBTZWxlY3Rvcl8xLlNlbGVjdG9yLmVuc3VyZVNlbGVjdGVkKG5vZGUpO1xuICAgIH1cbiAgICBvbnVwZGF0ZShub2RlKSB7XG4gICAgICAgIHN1cGVyLm9udXBkYXRlKG5vZGUpO1xuICAgICAgICBTZWxlY3Rvcl8xLlNlbGVjdG9yLmVuc3VyZVNlbGVjdGVkKG5vZGUpO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHsgcmV0dXJuIFJhZGlvQnV0dG9uLnZpZXdHcm91cCgnLmhzLXJhZGlvLWJ1dHRvbnMnLCBub2RlKTsgfVxufVxuZXhwb3J0cy5SYWRpb0J1dHRvbiA9IFJhZGlvQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVW1Ga2FXOUNkWFIwYjI0dWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZVbUZrYVc5Q2RYUjBiMjR1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRnBRMEVzZFVOQlFUUkRPMEZCUXpWRExIVkRRVUUwUXp0QlFVTTFReXg1UTBGQk9FTTdRVUZ0UWpsRExFMUJRV0VzVjBGQldTeFRRVUZSTEcxQ1FVRlJPMGxCUTNKRExFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNSMEZCVlN4RlFVRkZMRWxCUVZjN1VVRkRjRU1zUjBGQlJ5eEhRVUZITEVkQlFVY3NSMEZCUnl4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVWQlFVVXNSVUZCUlN4RFFVRkRPMUZCUTNaRExFMUJRVTBzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVVZ5UXl4UFFVRlBMRmxCUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlF5eExRVUZMTEVWQlFVTXNTMEZCU3l4RlFVRkRMRVZCUVVVc1dVRkJReXhEUVVGRExHbENRVUZOTEVWQlFVVTdXVUZEYmtNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SlFVRkpMRVZCUVVVN1dVRkRMMElzVDBGQlR5eEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFWRXNSVUZCUlN4RFFVRlJMRVZCUVVVc1JVRkJSU3hEUVVGRExHMUNRVUZSTEVOQlFVTXNWVUZCVlN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dFRRVU4wUml4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOU0xFTkJRVU03U1VGRFJDeE5RVUZOTEVOQlFVTXNTVUZCVnp0UlFVTmtMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEYmtJc2JVSkJRVkVzUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRiRU1zUTBGQlF6dEpRVU5FTEZGQlFWRXNRMEZCUXl4SlFVRlhPMUZCUTJoQ0xFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRja0lzYlVKQlFWRXNRMEZCUXl4alFVRmpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03U1VGRGJFTXNRMEZCUXp0SlFVTkVMRWxCUVVrc1EwRkJReXhKUVVGWExFbEJRVmNzVDBGQlR5eFhRVUZYTEVOQlFVTXNVMEZCVXl4RFFVRkRMRzFDUVVGdFFpeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenREUVVONFJqdEJRVzVDUkN4clEwRnRRa01pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmZ1bmN0aW9uIG9uZU9mSXRlbXMoaXRlbXMsIHRpdGxlKSB7XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmlzU2VsZWN0ZWQgPSAoaXRlbS50aXRsZSA9PT0gdGl0bGUpO1xuICAgIH0pO1xuICAgIGlmICghaXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5pc1NlbGVjdGVkKSkge1xuICAgICAgICBpdGVtc1swXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pc1NlbGVjdGVkKVswXTtcbn1cbmV4cG9ydHMub25lT2ZJdGVtcyA9IG9uZU9mSXRlbXM7XG5mdW5jdGlvbiBhbnlJdGVtcyhpdGVtcywgdGl0bGUpIHtcbiAgICBpdGVtc1t0aXRsZV0uaXNTZWxlY3RlZCA9ICFpdGVtc1t0aXRsZV0uaXNTZWxlY3RlZDtcbiAgICByZXR1cm4gaXRlbXNbdGl0bGVdO1xufVxuZXhwb3J0cy5hbnlJdGVtcyA9IGFueUl0ZW1zO1xuY2xhc3MgU2VsZWN0b3Ige1xuICAgIHN0YXRpYyB1cGRhdGVJdGVtcyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gbm9kZS5hdHRycy5kZXNjLml0ZW1zIHx8IFtdO1xuICAgICAgICBpdGVtcy5tYXAoKGl0bSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IG5vZGUuc3RhdGUuaXRlbXNbaXRtXSB8fCB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGl0bSxcbiAgICAgICAgICAgICAgICBpc1NlbGVjdGVkOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuaXRlbXNbaV0gPSBpdGVtO1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5pdGVtc1tpdG1dID0gaXRlbTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBpbml0KG5vZGUsIG1vZGVsID0gb25lT2ZJdGVtcykge1xuICAgICAgICBub2RlLnN0YXRlLnVwZGF0ZU1vZGVsID0gbW9kZWw7XG4gICAgICAgIG5vZGUuc3RhdGUuaXRlbXMgPSBbXTtcbiAgICAgICAgbm9kZS5zdGF0ZS5ldmVudHMgPSB7fTtcbiAgICAgICAgbm9kZS5zdGF0ZS5pdGVtQ2xpY2tlZCA9IChpdGVtKSA9PiBpdGVtO1xuICAgICAgICBub2RlLnN0YXRlLmRlZmF1bHRJdGVtID0gbm9kZS5hdHRycy5kZXNjLmRlZmF1bHRJdGVtO1xuICAgICAgICBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZURvd24gPSBub2RlLmF0dHJzLmRlc2MubW91c2VEb3duO1xuICAgICAgICBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZVVwID0gbm9kZS5hdHRycy5kZXNjLm1vdXNlVXA7XG4gICAgICAgIG5vZGUuYXR0cnMuZGVzYy5jbGlja2VkID0gbm9kZS5hdHRycy5kZXNjLmNsaWNrZWQgfHwgKChpdGVtKSA9PiBjb25zb2xlLmxvZyhgbWlzc2luZyBjbGlja2VkKCkgZnVuY3Rpb24gZm9yIHNlbGVjdG9yIGl0ZW0gJHtpdGVtfWApKTtcbiAgICAgICAgbm9kZS5zdGF0ZS5ldmVudHMuY2xpY2tlZCA9IG5vZGUuYXR0cnMuZGVzYy5jbGlja2VkO1xuICAgICAgICBTZWxlY3Rvci51cGRhdGVJdGVtcyhub2RlKTtcbiAgICB9XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgU2VsZWN0b3IuaW5pdChub2RlKTtcbiAgICB9XG4gICAgb251cGRhdGUobm9kZSkge1xuICAgICAgICBTZWxlY3Rvci51cGRhdGVJdGVtcyhub2RlKTtcbiAgICB9XG4gICAgc3RhdGljIGVuc3VyZVNlbGVjdGVkKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUuc3RhdGUgJiYgbm9kZS5zdGF0ZS5pdGVtcyAmJiAhbm9kZS5zdGF0ZS5pdGVtcy5zb21lKChpKSA9PiBpLmlzU2VsZWN0ZWQpICYmIG5vZGUuc3RhdGUuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKG5vZGUuc3RhdGUuZGVmYXVsdEl0ZW0gJiYgbm9kZS5zdGF0ZS5pdGVtc1tub2RlLnN0YXRlLmRlZmF1bHRJdGVtXSkge1xuICAgICAgICAgICAgICAgIG5vZGUuc3RhdGUuaXRlbXNbbm9kZS5zdGF0ZS5kZWZhdWx0SXRlbV0uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChub2RlLnN0YXRlLml0ZW1zWzBdKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5pdGVtc1swXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgcmVuZGVySXRlbShub2RlLCBpKSB7XG4gICAgICAgIGNvbnN0IHJlYWN0b3IgPSAoY2FsbGJhY2spID0+ICh0aXRsZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS51cGRhdGVNb2RlbChub2RlLnN0YXRlLml0ZW1zLCB0aXRsZSk7XG4gICAgICAgICAgICB0aXRsZSA9IG5vZGUuc3RhdGUuaXRlbUNsaWNrZWQodGl0bGUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRpdGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgaWxsZWdhbCByZW5kZXIgaW5kZXggJHtpfSAke25vZGUuc3RhdGUuaXRlbXMubWFwKChpKSA9PiBpLnRpdGxlKS5qb2luKCd8Jyl9YCk7XG4gICAgICAgICAgICBpID0gMDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtID0gbm9kZS5zdGF0ZS5pdGVtc1tpXTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBpdGVtLnRpdGxlIHx8ICcnO1xuICAgICAgICBjb25zdCBpdGVtQ3NzID0gaXRlbS5jc3MgfHwgJyc7XG4gICAgICAgIHJldHVybiByZW5kZXJTZWxlY3RhYmxlKHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGNzczogaXRlbUNzcyxcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IG5vZGUuc3RhdGUuaXRlbXNbdGl0bGVdID8gbm9kZS5zdGF0ZS5pdGVtc1t0aXRsZV0uaXNTZWxlY3RlZCA6IGZhbHNlLFxuICAgICAgICAgICAgbW91c2VEb3duOiBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZURvd24sXG4gICAgICAgICAgICBtb3VzZVVwOiBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZVVwLFxuICAgICAgICAgICAgY2xpY2tlZDogcmVhY3Rvcihub2RlLnN0YXRlLmV2ZW50cy5jbGlja2VkKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLlNlbGVjdG9yID0gU2VsZWN0b3I7XG5mdW5jdGlvbiByZW5kZXJTZWxlY3RhYmxlKGQpIHtcbiAgICBjb25zdCBvbmNsaWNrID0gZC5jbGlja2VkID8gKCkgPT4geyBkLmNsaWNrZWQoZC50aXRsZSk7IH0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgb25tb3VzZWRvd24gPSBkLm1vdXNlRG93biA/ICgpID0+IHsgZC5tb3VzZURvd24oZC50aXRsZSk7IH0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgb25tb3VzZXVwID0gZC5tb3VzZVVwID8gKCkgPT4geyBkLm1vdXNlVXAoZC50aXRsZSk7IH0gOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGhzbGF5b3V0XzEubShgLmhzLXNlbGVjdGFibGUgJHtkLmNzcyB8fCAnJ30gJHtkLmlzU2VsZWN0ZWQgPyAnaHMtc2VsZWN0ZWQnIDogJyd9YCwgeyBzdHlsZTogZC5zdHlsZSwgb25jbGljazogb25jbGljaywgb25tb3VzZWRvd246IG9ubW91c2Vkb3duLCBvbm1vdXNldXA6IG9ubW91c2V1cCB9LCBkLnRpdGxlKTtcbn1cbmV4cG9ydHMucmVuZGVyU2VsZWN0YWJsZSA9IHJlbmRlclNlbGVjdGFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lVMlZzWldOMGIzSXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12VTJWc1pXTjBiM0l1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRnhRa0VzZFVOQlFXOURPMEZCSzBOd1F5eFRRVUZuUWl4VlFVRlZMRU5CUVVNc1MwRkJjMElzUlVGQlJTeExRVUZaTzBsQlF6TkVMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eEpRVUZ0UWl4RlFVRkZMRVZCUVVVN1VVRkRiRU1zU1VGQlNTeERRVUZETEZWQlFWVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFdEJRVWNzUzBGQlN5eERRVUZETEVOQlFVTTdTVUZETTBNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFbEJRVzFDTEVWQlFVVXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zUlVGQlJUdFJRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhWUVVGVkxFZEJRVWNzU1VGQlNTeERRVUZETzB0QlFVVTdTVUZETVVZc1QwRkJUeXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNTVUZCYlVJc1JVRkJSU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJRM0pGTEVOQlFVTTdRVUZPUkN4blEwRk5RenRCUVUxRUxGTkJRV2RDTEZGQlFWRXNRMEZCUXl4TFFVRnpRaXhGUVVGRkxFdEJRVms3U1VGRGVrUXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExGVkJRVlVzUjBGQlJ5eERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhWUVVGVkxFTkJRVU03U1VGRGJrUXNUMEZCVHl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03UVVGRGVFSXNRMEZCUXp0QlFVaEVMRFJDUVVkRE8wRkJjVUpFTEUxQlFYTkNMRkZCUVZFN1NVRkxNVUlzVFVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRlZPMUZCUTNwQ0xFMUJRVTBzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzU1VGQlNTeEZRVUZGTEVOQlFVTTdVVUZETVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVkQlFWVXNSVUZCUlN4RFFVRlJMRVZCUVVVc1JVRkJSVHRaUVVNdlFpeE5RVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1R0blFrRkRiRU1zUzBGQlN5eEZRVUZGTEVkQlFVYzdaMEpCUTFZc1ZVRkJWU3hGUVVGRkxFdEJRVXM3WVVGRGNFSXNRMEZCUXp0WlFVTkdMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJRenRaUVVNelFpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTTdVVUZEYWtNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETzBsQlYwUXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGWExFVkJRVVVzUzBGQlN5eEhRVUZETEZWQlFWVTdVVUZEY2tNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFhRVUZYTEVkQlFVY3NTMEZCU3l4RFFVRkRPMUZCUXk5Q0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRnhRaXhGUVVGRkxFTkJRVU03VVVGRGVFTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFZEJRVWNzUlVGQlJTeERRVUZETzFGQlEzWkNMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVjBGQlZ5eEhRVUZITEVOQlFVTXNTVUZCVnl4RlFVRkZMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU03VVVGREwwTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRE8xRkJRM0pFTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExGTkJRVk1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU03VVVGRGVFUXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR5eEhRVUZMTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF6dFJRVU4wUkN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVkQlFVOHNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SlFVRlhMRVZCUVVVc1JVRkJSU3hEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNaMFJCUVdkRUxFbEJRVWtzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTm9TaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRWRCUVVzc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRPMUZCUTNSRUxGRkJRVkVzUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRMMElzUTBGQlF6dEpRVVZFTEUxQlFVMHNRMEZCUXl4SlFVRlhPMUZCUTJRc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTjRRaXhEUVVGRE8wbEJRMFFzVVVGQlVTeERRVUZETEVsQlFWYzdVVUZEYUVJc1VVRkJVU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTXZRaXhEUVVGRE8wbEJUMU1zVFVGQlRTeERRVUZETEdOQlFXTXNRMEZCUXl4SlFVRlhPMUZCUTNaRExFbEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NTVUZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFXZENMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVkQlFVTXNRMEZCUXl4RlFVRkZPMWxCUXpGSUxFbEJRVWtzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WFFVRlhMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFTkJRVU1zUlVGQlJUdG5Ra0ZEY0VVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF5eFZRVUZWTEVkQlFVY3NTVUZCU1N4RFFVRkRPMkZCUXpsRU8ybENRVUZOTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVTdaMEpCUXpWQ0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExGVkJRVlVzUjBGQlJ5eEpRVUZKTEVOQlFVTTdZVUZEZWtNN1UwRkRTanRKUVVOTUxFTkJRVU03U1VGUlV5eE5RVUZOTEVOQlFVTXNWVUZCVlN4RFFVRkRMRWxCUVZjc1JVRkJSU3hEUVVGUk8xRkJRemRETEUxQlFVMHNUMEZCVHl4SFFVRkhMRU5CUVVNc1VVRkJNa0lzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXl4TFFVRlpMRVZCUVVVc1JVRkJSVHRaUVVNNVJDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJRenRaUVVOb1JDeExRVUZMTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdXVUZEZEVNc1NVRkJTU3hQUVVGUExGRkJRVkVzUzBGQlN5eFZRVUZWTEVWQlFVVTdaMEpCUTJoRExGRkJRVkVzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0aFFVTnVRanRSUVVOTUxFTkJRVU1zUTBGQlF6dFJRVU5HTEVsQlFVa3NRMEZCUXl4SFFVRkRMRU5CUVVNc1JVRkJSVHRaUVVGRkxFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNkMEpCUVhkQ0xFTkJRVU1zU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZMTEVWQlFVTXNSVUZCUlN4RFFVRkJMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0VFFVRkZPMUZCUTJwSUxFMUJRVTBzU1VGQlNTeEhRVUZyUWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTm9SQ3hOUVVGTkxFdEJRVXNzUjBGQlZTeEpRVUZKTEVOQlFVTXNTMEZCU3l4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVOMFF5eE5RVUZOTEU5QlFVOHNSMEZCUnl4SlFVRkpMRU5CUVVNc1IwRkJSeXhKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVWN2UWl4UFFVRlBMR2RDUVVGblFpeERRVUZETzFsQlEzQkNMRXRCUVVzc1JVRkJSU3hMUVVGTE8xbEJRMW9zUjBGQlJ5eEZRVUZGTEU5QlFVODdXVUZGV2l4VlFVRlZMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETEVOQlFVTXNTMEZCU3p0WlFVTXZSU3hUUVVGVExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1UwRkJVenRaUVVOMFF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR6dFpRVU5zUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJRenRUUVVNNVF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRPME5CUlVvN1FVRTFSa1FzTkVKQk5FWkRPMEZCVVVRc1UwRkJaMElzWjBKQlFXZENMRU5CUVVNc1EwRkJaMEk3U1VGRE4wTXNUVUZCVFN4UFFVRlBMRWRCUVZNc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlFTeERRVUZETEVOQlFVY3NSMEZCUnl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVWNzUTBGQlF5eERRVUZETEZOQlFWTXNRMEZCUXp0SlFVTXZSU3hOUVVGTkxGZEJRVmNzUjBGQlN5eERRVUZETEVOQlFVTXNVMEZCVXl4RFFVRkJMRU5CUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eERRVUZETEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1UwRkJVeXhEUVVGRE8wbEJReTlGTEUxQlFVMHNVMEZCVXl4SFFVRlBMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVUVzUTBGQlF5eERRVUZITEVkQlFVY3NSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGSExFTkJRVU1zUTBGQlF5eFRRVUZUTEVOQlFVTTdTVUZETDBVc1QwRkJUeXhaUVVGRExFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1EwRkJReXhIUVVGSExFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXl4VlFVRlZMRU5CUVVFc1EwRkJReXhEUVVGQkxHRkJRV0VzUTBGQlFTeERRVUZETEVOQlFVTXNSVUZCUlN4RlFVRkZMRVZCUTNSRkxFVkJRVVVzUzBGQlN5eEZRVUZGTEVOQlFVTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1QwRkJUeXhGUVVGRExFOUJRVThzUlVGQlJTeFhRVUZYTEVWQlFVTXNWMEZCVnl4RlFVRkZMRk5CUVZNc1JVRkJReXhUUVVGVExFVkJRVVVzUlVGRGFrWXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkRWaXhEUVVGRE8wRkJRMDRzUTBGQlF6dEJRVkpFTERSRFFWRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY2xhc3MgU2xpZGVyIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBub2RlLnN0YXRlLnJhbmdlID0gW107XG4gICAgICAgIG5vZGUuc3RhdGUudmFsdWUgPSAwLjU7XG4gICAgICAgIG5vZGUuc3RhdGUubW91c2UgPSAtMTtcbiAgICAgICAgbm9kZS5zdGF0ZS5zbGlkZXIgPSAwO1xuICAgICAgICBub2RlLnN0YXRlLm5vdGlmaWVkID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUub25jaGFuZ2UgPSAoKSA9PiB7IH07XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBpZCA9IG5vZGUuYXR0cnMuaWQ7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgICAgICBub2RlLnN0YXRlLnJhbmdlID0gbm9kZS5hdHRycy5yYW5nZSB8fCBbXTtcbiAgICAgICAgbm9kZS5zdGF0ZS5vbmNoYW5nZSA9IG5vZGUuYXR0cnMub25jaGFuZ2U7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oYC5ocy1zbGlkZXIgJHtjc3N9YCwge1xuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgb25tb3VzZWRvd246IChlKSA9PiBtb3VzZWRvd24oZSwgbm9kZSksXG4gICAgICAgICAgICBvbm1vdXNlbW92ZTogKGUpID0+IG1vdXNlbW92ZShlLCBub2RlKSxcbiAgICAgICAgICAgIG9ubW91c2V1cDogKGUpID0+IG1vdXNldXAoZSwgbm9kZSksXG4gICAgICAgICAgICBvbm1vdXNlb3V0OiAoZSkgPT4gbW91c2VvdXQoZSwgbm9kZSlcbiAgICAgICAgfSwgW3JlbmRlclNsaWRlcihub2RlKV0pO1xuICAgIH1cbn1cbmV4cG9ydHMuU2xpZGVyID0gU2xpZGVyO1xuZnVuY3Rpb24gcmVuZGVyU2xpZGVyKG5vZGUpIHtcbiAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCcuaHMtc2xpZGVyLXNsb3QnLCBbXG4gICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1tYXJrZXJzJywgbm9kZS5zdGF0ZS5yYW5nZS5tYXAocmVuZGVyTWFya2VyKSksXG4gICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1oYW5kbGUnLCB7IHN0eWxlOiBgbGVmdDokezEwMCAqIG5vZGUuc3RhdGUudmFsdWV9JWAgfSlcbiAgICBdKTtcbn1cbmZ1bmN0aW9uIHJlbmRlck1hcmtlcih2YWx1ZSwgaSwgbWFya2Vycykge1xuICAgIGNvbnN0IHNoYXJlID0gaSAvIChtYXJrZXJzLmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IGxlZnQgPSBtYXJrZXJzLmxlbmd0aCA8IDIgPyAwIDogMTAwICogc2hhcmU7XG4gICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1tYXJrZXInLCB7IHN0eWxlOiBgbGVmdDogJHtsZWZ0fSVgIH0sIHJlbmRlckxhYmVsKHZhbHVlKSk7XG59XG5mdW5jdGlvbiByZW5kZXJMYWJlbCh2YWx1ZSkge1xuICAgIHJldHVybiBoc2xheW91dF8xLm0oJy5ocy1zbGlkZXItbGFiZWwnLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBnZXRUYXJnZXRPZmZzZXQoZSkge1xuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBsZXQgbGVmdE9mZnNldCA9IDA7XG4gICAgd2hpbGUgKHRhcmdldC5jbGFzc05hbWUudHJpbSgpICE9PSBlLmN1cnJlbnRUYXJnZXQuY2xhc3NOYW1lLnRyaW0oKSkge1xuICAgICAgICBsZWZ0T2Zmc2V0ICs9IHRhcmdldC5vZmZzZXRMZWZ0O1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZnRPZmZzZXQgLSB0YXJnZXQubGFzdENoaWxkLm9mZnNldExlZnQ7XG59XG5mdW5jdGlvbiBnZXRWYWx1ZShlLCBub2RlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc2xvdFdpZHRoID0gZS5jdXJyZW50VGFyZ2V0Lmxhc3RDaGlsZC5jbGllbnRXaWR0aDtcbiAgICBub2RlLnN0YXRlLnZhbHVlID0gKGUuY2xpZW50WCAtIG5vZGUuc3RhdGUubW91c2UpIC8gc2xvdFdpZHRoICsgbm9kZS5zdGF0ZS5zbGlkZXI7XG4gICAgcmV0dXJuIG5vdGlmeShub2RlKTtcbn1cbmZ1bmN0aW9uIG1vdXNlZG93bihlLCBub2RlKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gZ2V0VGFyZ2V0T2Zmc2V0KGUpO1xuICAgIG5vZGUuc3RhdGUubW91c2UgPSBlLmNsaWVudFg7XG4gICAgaWYgKFsnaHMtc2xpZGVyJywgJ2hzLXNsaWRlci1zbG90J10uaW5kZXhPZihlLnRhcmdldC5jbGFzc05hbWUudHJpbSgpKSA+PSAwKSB7XG4gICAgICAgIGNvbnN0IHNsb3RXaWR0aCA9IGUuY3VycmVudFRhcmdldC5sYXN0Q2hpbGQuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhhbmRsZVdpZHRoID0gZS5jdXJyZW50VGFyZ2V0Lmxhc3RDaGlsZC5sYXN0Q2hpbGQuY2xpZW50V2lkdGg7XG4gICAgICAgIG5vZGUuc3RhdGUubW91c2UgLT0gaGFuZGxlV2lkdGggLyAyO1xuICAgICAgICBub2RlLnN0YXRlLnZhbHVlID0gKGUub2Zmc2V0WCAtIGhhbmRsZVdpZHRoIC8gMiArIG9mZnNldCkgLyBzbG90V2lkdGg7XG4gICAgfVxuICAgIG5vZGUuc3RhdGUuc2xpZGVyID0gbm9kZS5zdGF0ZS52YWx1ZTtcbiAgICBnZXRWYWx1ZShlLCBub2RlKTtcbn1cbmZ1bmN0aW9uIG1vdXNlbW92ZShlLCBub2RlKSB7XG4gICAgaWYgKG5vZGUuc3RhdGUubW91c2UgPiAwKSB7XG4gICAgICAgIGdldFZhbHVlKGUsIG5vZGUpO1xuICAgICAgICBpZiAobm9kZS5zdGF0ZS52YWx1ZSA+IDEgfHwgbm9kZS5zdGF0ZS52YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIG1vdXNldXAoZSwgbm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBtb3VzZXVwKGUsIG5vZGUpIHtcbiAgICBpZiAobm9kZS5zdGF0ZS5tb3VzZSA+IDApIHtcbiAgICAgICAgbm9kZS5zdGF0ZS52YWx1ZSA9IGdldFZhbHVlKGUsIG5vZGUpO1xuICAgICAgICBub2RlLnN0YXRlLm1vdXNlID0gLTE7XG4gICAgfVxufVxuZnVuY3Rpb24gbW91c2VvdXQoZSwgbm9kZSkge1xuICAgIGlmIChub2RlLnN0YXRlLm1vdXNlID4gMCAmJiBlLnRhcmdldC5jbGFzc05hbWUudHJpbSgpID09PSAnaHMtc2xpZGVyJykge1xuICAgICAgICBtb3VzZXVwKGUsIG5vZGUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG5vdGlmeShub2RlKSB7XG4gICAgaWYgKChub2RlLnN0YXRlLnJhbmdlLmxlbmd0aCA+IDEpICYmICh0eXBlb2Ygbm9kZS5zdGF0ZS5yYW5nZVswXSA9PT0gJ3N0cmluZycpKSB7XG4gICAgICAgIGNvbnN0IHYgPSBNYXRoLmZsb29yKG5vZGUuc3RhdGUudmFsdWUgKiAobm9kZS5zdGF0ZS5yYW5nZS5sZW5ndGggLSAxKSArIDAuNSk7XG4gICAgICAgIGlmIChub2RlLnN0YXRlLm5vdGlmaWVkICE9PSBub2RlLnN0YXRlLnJhbmdlW3ZdKSB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLm9uY2hhbmdlKG5vZGUuc3RhdGUucmFuZ2Vbdl0pO1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5ub3RpZmllZCA9IG5vZGUuc3RhdGUucmFuZ2Vbdl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHYgLyAobm9kZS5zdGF0ZS5yYW5nZS5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IG51bVJhbmdlID0gbm9kZS5zdGF0ZS5yYW5nZTtcbiAgICAgICAgY29uc3QgdiA9IE1hdGguZmxvb3IoKG51bVJhbmdlWzBdICogKDEgLSBub2RlLnN0YXRlLnZhbHVlKSArIG51bVJhbmdlWzFdICogbm9kZS5zdGF0ZS52YWx1ZSkgKiAxMDApIC8gMTAwO1xuICAgICAgICBub2RlLnN0YXRlLm9uY2hhbmdlKE1hdGgubWluKG5vZGUuc3RhdGUucmFuZ2VbMV0sIE1hdGgubWF4KG5vZGUuc3RhdGUucmFuZ2VbMF0sIHYpKSk7XG4gICAgICAgIHJldHVybiBub2RlLnN0YXRlLnZhbHVlO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVUyeHBaR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwxTnNhV1JsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVEJEUVN4MVEwRkJiME03UVVGdlFuQkRMRTFCUVdFc1RVRkJUVHRKUVVObUxFMUJRVTBzUTBGQlF5eEpRVUZWTzFGQlEySXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFZEJRV2RDTEVWQlFVVXNRMEZCUXp0UlFVTnVReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4SFFVRkhMRU5CUVVNN1VVRkRka0lzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGRFSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETzFGQlEzUkNMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTjZRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNSMEZCUnl4SFFVRkhMRVZCUVVVc1IwRkJSU3hEUVVGRExFTkJRVU03U1VGRGRrTXNRMEZCUXp0SlFVTkhMRWxCUVVrc1EwRkJReXhKUVVGWE8xRkJRMW9zVFVGQlRTeEZRVUZGTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhGUVVGRkxFTkJRVU03VVVGRGVrSXNUVUZCVFN4SFFVRkhMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVsQlFVa3NSVUZCUlN4RFFVRkRPMUZCUTJwRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVTXhReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF6dFJRVU14UXl4UFFVRlBMRmxCUVVNc1EwRkJReXhqUVVGakxFZEJRVWNzUlVGQlJTeEZRVUZGTzFsQlF6RkNMRVZCUVVVc1JVRkJReXhGUVVGRk8xbEJRMHdzVjBGQlZ5eEZRVUZETEVOQlFVTXNRMEZCU3l4RlFVRkZMRVZCUVVVc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXp0WlFVTjZReXhYUVVGWExFVkJRVU1zUTBGQlF5eERRVUZMTEVWQlFVVXNSVUZCUlN4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRExFVkJRVVVzU1VGQlNTeERRVUZETzFsQlEzcERMRk5CUVZNc1JVRkJReXhEUVVGRExFTkJRVXNzUlVGQlNTeEZRVUZGTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU03V1VGRGRrTXNWVUZCVlN4RlFVRkRMRU5CUVVNc1EwRkJTeXhGUVVGSExFVkJRVVVzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJRenRUUVVNelF5eEZRVU5FTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU14UWl4RFFVRkRPME5CUjBvN1FVRjZRa1FzZDBKQmVVSkRPMEZCUlVRc1UwRkJVeXhaUVVGWkxFTkJRVU1zU1VGQlZUdEpRVU0xUWl4UFFVRlBMRmxCUVVNc1EwRkJReXhwUWtGQmFVSXNSVUZCUlR0UlFVTjRRaXhaUVVGRExFTkJRVU1zYjBKQlFXOUNMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRE8xRkJRek5FTEZsQlFVTXNRMEZCUXl4dFFrRkJiVUlzUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4UlFVRlJMRWRCUVVjc1IwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4RlFVRkZMRU5CUVVNN1MwRkRja1VzUTBGQlF5eERRVUZETzBGQlExQXNRMEZCUXp0QlFVVkVMRk5CUVZNc1dVRkJXU3hEUVVGRExFdEJRVzlDTEVWQlFVVXNRMEZCVVN4RlFVRkZMRTlCUVcxQ08wbEJRM0pGTEUxQlFVMHNTMEZCU3l4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eE5RVUZOTEVkQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRja01zVFVGQlRTeEpRVUZKTEVkQlFVY3NUMEZCVHl4RFFVRkRMRTFCUVUwc1IwRkJReXhEUVVGRExFTkJRVUVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhIUVVGRExFdEJRVXNzUTBGQlF6dEpRVU0zUXl4UFFVRlBMRmxCUVVNc1EwRkJReXh0UWtGQmJVSXNSVUZCUlN4RlFVRkRMRXRCUVVzc1JVRkJSU3hUUVVGVExFbEJRVWtzUjBGQlJ5eEZRVUZETEVWQlFVVXNWMEZCVnl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRGFrWXNRMEZCUXp0QlFVVkVMRk5CUVZNc1YwRkJWeXhEUVVGRExFdEJRVzlDTzBsQlEzSkRMRTlCUVU4c1dVRkJReXhEUVVGRExHdENRVUZyUWl4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRE8wRkJRM2hETEVOQlFVTTdRVUZKUkN4VFFVRlRMR1ZCUVdVc1EwRkJReXhEUVVGTE8wbEJRekZDTEVsQlFVa3NUVUZCVFN4SFFVRlBMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU03U1VGRE1VSXNTVUZCU1N4VlFVRlZMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRMjVDTEU5QlFVOHNUVUZCVFN4RFFVRkRMRk5CUVZNc1EwRkJReXhKUVVGSkxFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTXNZVUZCWVN4RFFVRkRMRk5CUVZNc1EwRkJReXhKUVVGSkxFVkJRVVVzUlVGQlJUdFJRVU5xUlN4VlFVRlZMRWxCUVVrc1RVRkJUU3hEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU5vUXl4TlFVRk5MRWRCUVVjc1RVRkJUU3hEUVVGRExGVkJRVlVzUTBGQlF6dExRVU01UWp0SlFVTkVMRTlCUVU4c1ZVRkJWU3hIUVVGSExFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNWVUZCVlN4RFFVRkRPMEZCUTNCRUxFTkJRVU03UVVGRlJDeFRRVUZUTEZGQlFWRXNRMEZCUXl4RFFVRkxMRVZCUVVVc1NVRkJWVHRKUVVNdlFpeERRVUZETEVOQlFVTXNaVUZCWlN4RlFVRkZMRU5CUVVNN1NVRkRjRUlzUTBGQlF5eERRVUZETEdOQlFXTXNSVUZCUlN4RFFVRkRPMGxCUTI1Q0xFMUJRVTBzVTBGQlV5eEhRVUZITEVOQlFVTXNRMEZCUXl4aFFVRmhMRU5CUVVNc1UwRkJVeXhEUVVGRExGZEJRVmNzUTBGQlF6dEpRVU40UkN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4VFFVRlRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTTdTVUZEYkVZc1QwRkJUeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdRVUZEZUVJc1EwRkJRenRCUVVWRUxGTkJRVk1zVTBGQlV5eERRVUZETEVOQlFVc3NSVUZCUlN4SlFVRlZPMGxCUTJoRExFMUJRVTBzVFVGQlRTeEhRVUZITEdWQlFXVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOc1F5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETzBsQlF6ZENMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVVzWjBKQlFXZENMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zU1VGQlJTeERRVUZETEVWQlFVVTdVVUZEZGtVc1RVRkJUU3hUUVVGVExFZEJRVWNzUTBGQlF5eERRVUZETEdGQlFXRXNRMEZCUXl4VFFVRlRMRU5CUVVNc1YwRkJWeXhEUVVGRE8xRkJRM2hFTEUxQlFVMHNWMEZCVnl4SFFVRkhMRU5CUVVNc1EwRkJReXhoUVVGaExFTkJRVU1zVTBGQlV5eERRVUZETEZOQlFWTXNRMEZCUXl4WFFVRlhMRU5CUVVNN1VVRkRjRVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWxCUVVrc1YwRkJWeXhIUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5zUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRWRCUVVjc1YwRkJWeXhIUVVGRExFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTXNSMEZCUnl4VFFVRlRMRU5CUVVNN1MwRkRka1U3U1VGRFJDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXp0SlFVTnlReXhSUVVGUkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMEZCUTNSQ0xFTkJRVU03UVVGRlJDeFRRVUZUTEZOQlFWTXNRMEZCUXl4RFFVRkxMRVZCUVVVc1NVRkJWVHRKUVVOb1F5eEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGRExFTkJRVU1zUlVGQlJUdFJRVU53UWl4UlFVRlJMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEyeENMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVkQlFVY3NRMEZCUXl4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEhRVUZITEVOQlFVTXNSVUZCUlR0WlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVMEZCUlR0TFFVTXhSVHRCUVVOTUxFTkJRVU03UVVGRlJDeFRRVUZUTEU5QlFVOHNRMEZCUXl4RFFVRkxMRVZCUVVVc1NVRkJWVHRKUVVNNVFpeEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGRExFTkJRVU1zUlVGQlJUdFJRVU53UWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM0pETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETzB0QlEzcENPMEZCUTB3c1EwRkJRenRCUVVWRUxGTkJRVk1zVVVGQlVTeERRVUZETEVOQlFVc3NSVUZCUlN4SlFVRlZPMGxCUXk5Q0xFbEJRVWtzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWRCUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hMUVVGTExGZEJRVmNzUlVGQlJUdFJRVU5xUlN4UFFVRlBMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzB0QlEzQkNPMEZCUTB3c1EwRkJRenRCUVVWRUxGTkJRVk1zVFVGQlRTeERRVUZETEVsQlFWVTdTVUZEZEVJc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVa3NVVUZCVVN4RFFVRkRMRVZCUVVVN1VVRkRNMFVzVFVGQlRTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU16UlN4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeExRVUZMTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTzFsQlF6ZERMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEZWtNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVkQlFWY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVMEZEY2tRN1VVRkZSQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUjBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0TFFVTXhRenRUUVVGTk8xRkJRMGdzVFVGQlRTeFJRVUZSTEVkQlFYRkNMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETzFGQlEzQkVMRTFCUVUwc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVU1zUTBGQlF5eERRVUZETEVkQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJReXhIUVVGSExFTkJRVU03VVVGRGFFY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCVXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGVExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnlSeXhQUVVGUExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRPMHRCUXpOQ08wRkJRMHdzUTBGQlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBTZWxlY3Rvcl8xID0gcmVxdWlyZShcIi4vU2VsZWN0b3JcIik7XG5jbGFzcyBUb2dnbGVCdXR0b24gZXh0ZW5kcyBTZWxlY3Rvcl8xLlNlbGVjdG9yIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBzdXBlci5vbmluaXQobm9kZSk7XG4gICAgICAgIG5vZGUuc3RhdGUubW91c2VEb3duQ1NTID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUuZXZlbnRzLm1vdXNlRG93biA9ICgpID0+IG5vZGUuc3RhdGUubW91c2VEb3duQ1NTID0gJy5ocy1idXR0b24tcHJlc3NlZCc7XG4gICAgICAgIG5vZGUuc3RhdGUuZXZlbnRzLm1vdXNlVXAgPSAoKSA9PiBub2RlLnN0YXRlLm1vdXNlRG93bkNTUyA9ICcnO1xuICAgICAgICBub2RlLnN0YXRlLml0ZW1DbGlja2VkID0gKHRpdGxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpID0gbm9kZS5zdGF0ZS5pdGVtcy5tYXAoKGkpID0+IGkudGl0bGUpLmluZGV4T2YodGl0bGUpO1xuICAgICAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBub2RlLnN0YXRlLml0ZW1zWyhpICsgMSkgJSBub2RlLnN0YXRlLml0ZW1zLmxlbmd0aF0udGl0bGU7XG4gICAgICAgICAgICBub2RlLnN0YXRlLml0ZW1zW3RpdGxlXS5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBub2RlLnN0YXRlLml0ZW1zW25ld1RpdGxlXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXdUaXRsZTtcbiAgICAgICAgfTtcbiAgICAgICAgU2VsZWN0b3JfMS5TZWxlY3Rvci5lbnN1cmVTZWxlY3RlZChub2RlKTtcbiAgICB9XG4gICAgb251cGRhdGUobm9kZSkge1xuICAgICAgICBzdXBlci5vbnVwZGF0ZShub2RlKTtcbiAgICAgICAgU2VsZWN0b3JfMS5TZWxlY3Rvci5lbnN1cmVTZWxlY3RlZChub2RlKTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgICAgICBjb25zdCBzdHlsZSA9IG5vZGUuYXR0cnMuc3R5bGUgfHwgJyc7XG4gICAgICAgIGNvbnN0IGkgPSBub2RlLnN0YXRlLml0ZW1zLmZpbmRJbmRleCgoaSkgPT4gaS5pc1NlbGVjdGVkKTtcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShgLmhzLXRvZ2dsZS1idXR0b24gJHtjc3N9ICR7bm9kZS5zdGF0ZS5tb3VzZURvd25DU1N9YCwgeyBzdHlsZTogc3R5bGUgfSwgaHNsYXlvdXRfMS5tKCdzcGFuJywgU2VsZWN0b3JfMS5TZWxlY3Rvci5yZW5kZXJJdGVtKG5vZGUsIGkpKSk7XG4gICAgfVxufVxuZXhwb3J0cy5Ub2dnbGVCdXR0b24gPSBUb2dnbGVCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWRzluWjJ4bFFuVjBkRzl1TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwxUnZaMmRzWlVKMWRIUnZiaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFXbERRU3gxUTBGQmIwUTdRVUZEY0VRc2VVTkJRWE5FTzBGQmJVSjBSQ3hOUVVGaExGbEJRV0VzVTBGQlVTeHRRa0ZCVVR0SlFVTjBReXhOUVVGTkxFTkJRVU1zU1VGQlZUdFJRVU5pTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGJrSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhaUVVGWkxFZEJRVWNzUlVGQlJTeERRVUZETzFGQlF6ZENMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEZOQlFWTXNSMEZCUnl4SFFVRkhMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZsQlFWa3NSMEZCUnl4dlFrRkJiMElzUTBGQlF6dFJRVU51Uml4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVkQlFVc3NSMEZCUnl4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUldwRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWMEZCVnl4SFFVRkZMRU5CUVVNc1MwRkJXU3hGUVVGUExFVkJRVVU3V1VGRE1VTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJaMElzUlVGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0WlFVTTFSU3hOUVVGTkxGRkJRVkVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNN1dVRkRla1VzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zVlVGQlZTeEhRVUZITEV0QlFVc3NRMEZCUXp0WlFVTXpReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhWUVVGVkxFZEJRVWNzU1VGQlNTeERRVUZETzFsQlF6ZERMRTlCUVU4c1VVRkJVU3hEUVVGRE8xRkJRM0JDTEVOQlFVTXNRMEZCUXp0UlFVTkdMRzFDUVVGUkxFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTJ4RExFTkJRVU03U1VGRFJDeFJRVUZSTEVOQlFVTXNTVUZCVnp0UlFVTm9RaXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNKQ0xHMUNRVUZSTEVOQlFVTXNZMEZCWXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRMnhETEVOQlFVTTdTVUZEUkN4SlFVRkpMRU5CUVVNc1NVRkJWenRSUVVOYUxFMUJRVTBzUjBGQlJ5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVU5xUXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NTVUZCU1N4RlFVRkZMRU5CUVVNN1VVRkRja01zVFVGQlRTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCWjBJc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRPMUZCUlhwRkxFOUJRVThzV1VGQlF5eERRVUZETEhGQ1FVRnhRaXhIUVVGSExFbEJRVWtzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WlFVRlpMRVZCUVVVc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlF5eExRVUZMTEVWQlFVTXNSVUZCUlN4WlFVRkRMRU5CUVVNc1RVRkJUU3hGUVVOd1JpeHRRa0ZCVVN4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlF5OUNMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03UTBGRFNqdEJRVGRDUkN4dlEwRTJRa01pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmV4cG9ydHMuQnV0dG9uU3ltYm9scyA9IHtcbiAgICBjcm9zczogeyBzeW06ICcmdGltZXM7JyB9LFxuICAgIG1pbnVzOiB7IHN5bTogJyZtaW51czsnIH0sXG4gICAgcGx1czogeyBzeW06ICcrJyB9LFxuICAgIGRMZWZ0OiB7IHN5bTogJyZsYXF1bzsnIH0sXG4gICAgZFJpZ2h0OiB7IHN5bTogJyZyYXF1bzsnIH0sXG4gICAgbGVmdDogeyBzeW06ICcmbHNhcXVvOycgfSxcbiAgICByaWdodDogeyBzeW06ICcmcnNhcXVvOycgfSxcbiAgICBsZWZ0VHJpOiB7IHN5bTogJyZsdHJpZjsnIH0sXG4gICAgcmlnaHRUcmk6IHsgc3ltOiAnJnJ0cmlmOycgfSxcbiAgICB1cFRyaTogeyBzeW06ICcmdXRyaWY7JyB9LFxuICAgIGRvd25Ucmk6IHsgc3ltOiAnJmR0cmlmOycgfSxcbiAgICB1cDogeyBzeW06ICcmYW5kOycgfSxcbiAgICBkb3duOiB7IHN5bTogJyZvcjsnIH0sXG4gICAgbEFycm93OiB7IHN5bTogJyZsYXJyOycgfSxcbiAgICByQXJyb3c6IHsgc3ltOiAnJnJhcnI7JyB9LFxuICAgIHVBcnJvdzogeyBzeW06ICcmdWFycjsnIH0sXG4gICAgZEFycm93OiB7IHN5bTogJyZkYXJyOycgfSxcbiAgICBlbXB0eTogeyBzeW06ICcmIzk2NzU7JyB9LFxuICAgIGVtcHR5U2xhc2g6IHsgc3ltOiAnJmVtcHR5OycgfSxcbiAgICBvU2xhc2g6IHsgc3ltOiAnJm9zbGFzaDsnIH0sXG4gICAgbzogeyBzeW06ICcmb21pY3JvbjsnIH0sXG4gICAgbGluZXMzOiB7IHN5bTogJyZlcXVpdjsnIH0sXG4gICAgc3VtOiB7IHN5bTogJyZTaWdtYTsnIH0sXG4gICAgZWxsaXBzaXM6IHsgc3ltOiAnJmhlbGxpcDsnIH0sXG4gICAgdmVydEVsbGlwczogeyBzeW06ICcmIzgyODU7JyB9LFxuICAgIGJ1bGxldDogeyBzeW06ICcmYnVsbDsnIH0sXG4gICAgZW50ZXI6IHsgc3ltOiAnJmNyYXJyOycgfSxcbiAgICBhZ2FpbjogeyBzeW06ICcmIzg2MzU7JyB9LFxuICAgIHN0YXJ0OiB7IHN5bTogJyYjODY4OTsnIH0sXG4gICAgZW5kOiB7IHN5bTogJyYjODY5MDsnIH1cbn07XG5jbGFzcyBUb29sYmFyQnV0dG9uIHtcbiAgICBzdGF0aWMgZ2V0U3ltYm9sKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuQnV0dG9uU3ltYm9sc1tuYW1lXSA/IGV4cG9ydHMuQnV0dG9uU3ltYm9sc1tuYW1lXS5zeW0gOiAnJztcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZS5hdHRycy5zeW1ib2xzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnLmhzLWNvcm5lci1idXR0b24nLCB7IG9uY2xpY2s6IG5vZGUuYXR0cnMub25jbGljayB9LCBoc2xheW91dF8xLm0udHJ1c3Qobm9kZS5hdHRycy5zeW1ib2xzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCcuaHMtY29ybmVyLWJ1dHRvbicsIHsgb25jbGljazogbm9kZS5hdHRycy5vbmNsaWNrIH0sIG5vZGUuYXR0cnMuc3ltYm9scy5tYXAoKHN5bSkgPT4gaHNsYXlvdXRfMS5tLnRydXN0KHN5bSkpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuVG9vbGJhckJ1dHRvbiA9IFRvb2xiYXJCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWRzl2YkdKaGNrSjFkSFJ2Ymk1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OVViMjlzWW1GeVFuVjBkRzl1TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJNa1ZCTEhWRFFVRnZRenRCUVVWMlFpeFJRVUZCTEdGQlFXRXNSMEZCUnp0SlFVTjZRaXhMUVVGTExFVkJRVThzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkZPMGxCUXpsQ0xFdEJRVXNzUlVGQlR5eEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVNN1NVRkROMElzU1VGQlNTeEZRVUZSTEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJRenRKUVVOMlFpeExRVUZMTEVWQlFVOHNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRE8wbEJRemRDTEUxQlFVMHNSVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSU3hUUVVGVExFVkJRVU03U1VGRE4wSXNTVUZCU1N4RlFVRlJMRVZCUVVVc1IwRkJSeXhGUVVGRkxGVkJRVlVzUlVGQlF6dEpRVU01UWl4TFFVRkxMRVZCUVU4c1JVRkJSU3hIUVVGSExFVkJRVVVzVlVGQlZTeEZRVUZETzBsQlF6bENMRTlCUVU4c1JVRkJTeXhGUVVGRkxFZEJRVWNzUlVGQlJTeFRRVUZUTEVWQlFVTTdTVUZETjBJc1VVRkJVU3hGUVVGSkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUXp0SlFVTTNRaXhMUVVGTExFVkJRVThzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkRPMGxCUXpkQ0xFOUJRVThzUlVGQlN5eEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVNN1NVRkROMElzUlVGQlJTeEZRVUZWTEVWQlFVVXNSMEZCUnl4RlFVRkZMRTlCUVU4c1JVRkJRenRKUVVNelFpeEpRVUZKTEVWQlFWRXNSVUZCUlN4SFFVRkhMRVZCUVVVc1RVRkJUU3hGUVVGRE8wbEJRekZDTEUxQlFVMHNSVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSU3hSUVVGUkxFVkJRVU03U1VGRE5VSXNUVUZCVFN4RlFVRk5MRVZCUVVVc1IwRkJSeXhGUVVGRkxGRkJRVkVzUlVGQlF6dEpRVU0xUWl4TlFVRk5MRVZCUVUwc1JVRkJSU3hIUVVGSExFVkJRVVVzVVVGQlVTeEZRVUZETzBsQlF6VkNMRTFCUVUwc1JVRkJUU3hGUVVGRkxFZEJRVWNzUlVGQlJTeFJRVUZSTEVWQlFVTTdTVUZETlVJc1MwRkJTeXhGUVVGUExFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUXp0SlFVTTNRaXhWUVVGVkxFVkJRVVVzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkRPMGxCUXpkQ0xFMUJRVTBzUlVGQlRTeEZRVUZGTEVkQlFVY3NSVUZCUlN4VlFVRlZMRVZCUVVNN1NVRkRPVUlzUTBGQlF5eEZRVUZYTEVWQlFVVXNSMEZCUnl4RlFVRkZMRmRCUVZjc1JVRkJRenRKUVVNdlFpeE5RVUZOTEVWQlFVMHNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRE8wbEJRemRDTEVkQlFVY3NSVUZCVXl4RlFVRkZMRWRCUVVjc1JVRkJSU3hUUVVGVExFVkJRVU03U1VGRE4wSXNVVUZCVVN4RlFVRkpMRVZCUVVVc1IwRkJSeXhGUVVGRkxGVkJRVlVzUlVGQlF6dEpRVU01UWl4VlFVRlZMRVZCUVVVc1JVRkJSU3hIUVVGSExFVkJRVVVzVTBGQlV5eEZRVUZETzBsQlF6ZENMRTFCUVUwc1JVRkJUU3hGUVVGRkxFZEJRVWNzUlVGQlJTeFJRVUZSTEVWQlFVTTdTVUZETlVJc1MwRkJTeXhGUVVGUExFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUXp0SlFVTTNRaXhMUVVGTExFVkJRVThzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkRPMGxCUXpkQ0xFdEJRVXNzUlVGQlR5eEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVNN1NVRkROMElzUjBGQlJ5eEZRVUZUTEVWQlFVVXNSMEZCUnl4RlFVRkZMRk5CUVZNc1JVRkJRenREUVVOb1F5eERRVUZETzBGQlJVWXNUVUZCWVN4aFFVRmhPMGxCUlhSQ0xFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNTVUZCVnp0UlFVTjRRaXhQUVVGUExIRkNRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExIRkNRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTTdTVUZETjBRc1EwRkJRenRKUVVORUxFbEJRVWtzUTBGQlF5eEpRVUZWTzFGQlExZ3NTVUZCU1N4UFFVRlBMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eExRVUZMTEZGQlFWRXNSVUZCUlR0WlFVTjRReXhQUVVGUExGbEJRVU1zUTBGQlF5eHRRa0ZCYlVJc1JVRkRlRUlzUlVGQlJTeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGREwwSXNXVUZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVTTVRaXhEUVVGRE8xTkJRMHc3WVVGQlRUdFpRVU5JTEU5QlFVOHNXVUZCUXl4RFFVRkRMRzFDUVVGdFFpeEZRVU53UWl4RlFVRkZMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlN4RlFVTXZRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGVkxFVkJRVVVzUlVGQlJTeERRVUZCTEZsQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGRE1VUXNRMEZCUXp0VFFVTk1PMGxCUTB3c1EwRkJRenREUVVOS08wRkJiRUpFTEhORFFXdENReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgaHN1dGlsXzEgPSByZXF1aXJlKFwiaHN1dGlsXCIpO1xuY29uc3QgbG9nID0gbmV3IGhzdXRpbF8xLkxvZygnVHlwZUFoZWFkJyk7XG5mdW5jdGlvbiBlbXBoYXNpemUoaXRlbSwgbWF0Y2gpIHtcbiAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAobWF0Y2gsICdnaScpO1xuICAgIGNvbnN0IGRlY29yYXRpb25zID0gaXRlbVxuICAgICAgICAucmVwbGFjZShyZSwgKG0pID0+IGA8Yj4ke219PC9iPmApXG4gICAgICAgIC5zcGxpdCgnPCcpXG4gICAgICAgIC5tYXAoKHMpID0+IHtcbiAgICAgICAgaWYgKHMuc3RhcnRzV2l0aCgnL2I+JykpIHtcbiAgICAgICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oJ3NwYW4nLCB7IG5hbWU6IGl0ZW0gfSwgcy5zbGljZSgzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocy5zdGFydHNXaXRoKCdiPicpKSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCdiJywgeyBuYW1lOiBpdGVtIH0sIHMuc2xpY2UoMikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnc3BhbicsIHsgbmFtZTogaXRlbSB9LCBzKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBoc2xheW91dF8xLm0oJ3NwYW4nLCBkZWNvcmF0aW9ucyk7XG59XG5jbGFzcyBHZXRMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihtYXApIHtcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xuICAgIH1cbiAgICBzZWFyY2gobGlzdCkge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy51cmwgIT09IGxpc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVybCA9IGxpc3Q7XG4gICAgICAgICAgICAgICAgaHNsYXlvdXRfMS5tLnJlcXVlc3QoeyBtZXRob2Q6IFwiR0VUXCIsIHVybDogbGlzdCB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gdGhpcy5jYXB0dXJlTGlzdChkYXRhLCB0aGlzLm1hcCkpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4gbG9nLndhcm4oYHJlcXVlc3RpbmcgJHtsaXN0fTogJHtlLnRvU3RyaW5nKCl9YCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYXB0dXJlTGlzdChsaXN0LCB0aGlzLm1hcCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FwdHVyZUxpc3QobGlzdCwgbWFwKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IG1hcCA/IG1hcChsaXN0KSA6IGxpc3Q7XG4gICAgfVxufVxuY2xhc3MgVHlwZUFoZWFkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nbCA9IG5ldyBHZXRMaXN0KCk7XG4gICAgfVxuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIG5vZGUuc3RhdGUuaW5wdXROb2RlID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUuaGlkZVBvcGRvd24gPSB0cnVlO1xuICAgICAgICBub2RlLnN0YXRlLnZhbHVlID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUudHlwZUFoZWFkTGlzdCA9IFtdO1xuICAgICAgICBub2RlLnN0YXRlLm9uc3VibWl0ID0gbm9kZS5hdHRycy5vbnN1Ym1pdDtcbiAgICAgICAgbm9kZS5zdGF0ZS5hdXRvY29tcGxldGUgPSBub2RlLmF0dHJzLmF1dG9jb21wbGV0ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG5vZGUuYXR0cnMuYXV0b2NvbXBsZXRlO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgdGhpcy5nbC5zZWFyY2gobm9kZS5hdHRycy5saXN0KTtcbiAgICAgICAgY29uc3Qgbm9zdWJtaXQgPSAoKSA9PiBjb25zb2xlLmxvZygnbm8gc3VibWl0IGZ1bmN0aW9uIGRlZmluZWQnKTtcbiAgICAgICAgY29uc3Qgc3VibWl0ID0gKHYpID0+IHtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuaW5wdXROb2RlLnNldFNlbGVjdGlvblJhbmdlKDAsIG5vZGUuc3RhdGUuaW5wdXROb2RlLnZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICBub2RlLnN0YXRlLmhpZGVQb3Bkb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBub2RlLnN0YXRlLm9uc3VibWl0ID8gbm9kZS5zdGF0ZS5vbnN1Ym1pdCh2LCBub2RlLnN0YXRlLnR5cGVBaGVhZExpc3QpIDogbm9zdWJtaXQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5pbnB1dE5vZGUudmFsdWUgPSBlLnRhcmdldC5hdHRyaWJ1dGVzLm5hbWUudmFsdWU7XG4gICAgICAgICAgICAgICAgc3VibWl0KGUudGFyZ2V0LmF0dHJpYnV0ZXMubmFtZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9uaW5wdXQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbiA9IG5vZGUuc3RhdGUuaW5wdXROb2RlID0gZS50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCB0eXBlZCA9IG5vZGUuc3RhdGUudmFsdWUgPSBuLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHR5cGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0YXRlLnR5cGVBaGVhZExpc3QgPSB0aGlzLmdsLmxpc3QuZmlsdGVyKChsKSA9PiBsLm1hdGNoKG5ldyBSZWdFeHAodHlwZWQsICdnaScpKSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuc3RhdGUuYXV0b2NvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZSh0eXBlZCwgbm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBrZXlQcmVzc2VkID0gKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBub2RlLnN0YXRlLmlucHV0Tm9kZSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5oaWRlUG9wZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgIHN1Ym1pdChuLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGUuY29kZSA9PT0gJ0JhY2tzcGFjZScgJiYgbi50ZXh0TGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gbi50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBuLnZhbHVlID0gaW5wdXQuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IG5vZGUuc3RhdGUudmFsdWUgPyAnLmhzLXR5cGVhaGVhZC12YWx1ZScgOiAnLmhzLXR5cGVhaGVhZC1wbGFjZWhvbGRlcic7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oJy5ocy1mb3JtJywgW1xuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKGBpbnB1dC5ocy10eXBlYWhlYWQtaW5wdXQke3NlbGVjdG9yfWAsIHtcbiAgICAgICAgICAgICAgICBjb250ZW50ZWRpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IG5vZGUuYXR0cnMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAgICAgYXV0b2ZvY3VzOiBub2RlLmF0dHJzLmF1dG9mb2N1cyB8fCB0cnVlLFxuICAgICAgICAgICAgICAgIG9ua2V5ZG93bjoga2V5UHJlc3NlZCxcbiAgICAgICAgICAgICAgICBvbmlucHV0OiBvbmlucHV0XG4gICAgICAgICAgICB9LCBoc2xheW91dF8xLm0udHJ1c3Qobm9kZS5zdGF0ZS52YWx1ZSA/IG5vZGUuc3RhdGUudmFsdWUgOiBub2RlLmF0dHJzLnBsYWNlaG9sZGVyKSksXG4gICAgICAgICAgICBub2RlLnN0YXRlLmhpZGVQb3Bkb3duID8gdW5kZWZpbmVkIDpcbiAgICAgICAgICAgICAgICBoc2xheW91dF8xLm0oJy5ocy10eXBlYWhlYWQtbGlzdCcsIG5vZGUuc3RhdGUudHlwZUFoZWFkTGlzdC5tYXAoKGwpID0+IGhzbGF5b3V0XzEubSgnJywgeyBvbmNsaWNrOiBzZWxlY3QgfSwgZW1waGFzaXplKGwsIG5vZGUuc3RhdGUudmFsdWUpKSkpXG4gICAgICAgIF0pO1xuICAgIH1cbn1cbmV4cG9ydHMuVHlwZUFoZWFkID0gVHlwZUFoZWFkO1xuZnVuY3Rpb24gYXV0b0NvbXBsZXRlKHR5cGVkLCBub2RlKSB7XG4gICAgY29uc3QgbiA9IG5vZGUuc3RhdGUuaW5wdXROb2RlO1xuICAgIGNvbnN0IHN0YXJ0T2ZMaW5lSW5wdXQgPSBuZXcgUmVnRXhwKGBeJHt0eXBlZH1gLCAnZ2knKTtcbiAgICBuLnZhbHVlID0gbm9kZS5zdGF0ZS50eXBlQWhlYWRMaXN0LmZpbHRlcigobCkgPT4gbC5tYXRjaChzdGFydE9mTGluZUlucHV0KSlbMF0gfHwgdHlwZWQ7XG4gICAgbi5zZXRTZWxlY3Rpb25SYW5nZSh0eXBlZC5sZW5ndGgsIG4udmFsdWUubGVuZ3RoKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVZIbHdaVUZvWldGa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMMVI1Y0dWQmFHVmhaQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFUWkRRU3gxUTBGQmIwTTdRVUZEY0VNc2JVTkJRVFpDTzBGQlJUTkNMRTFCUVUwc1IwRkJSeXhIUVVGSExFbEJRVWtzV1VGQlJ5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMEZCUjI1RExGTkJRVk1zVTBGQlV5eERRVUZETEVsQlFWY3NSVUZCUlN4TFFVRlpPMGxCUTNoRExFMUJRVTBzUlVGQlJTeEhRVUZITEVsQlFVa3NUVUZCVFN4RFFVRkRMRXRCUVVzc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU51UXl4TlFVRk5MRmRCUVZjc1IwRkJSeXhKUVVGSk8xTkJRMjVDTEU5QlFVOHNRMEZCUXl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGUkxFVkJRVVVzUlVGQlJTeERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNN1UwRkRlRU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXp0VFFVTldMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVkVzUlVGQlJTeEZRVUZGTzFGQlEyUXNTVUZCU1N4RFFVRkRMRU5CUVVNc1ZVRkJWU3hEUVVGRExFdEJRVXNzUTBGQlF5eEZRVUZGTzFsQlEzSkNMRTlCUVU4c1dVRkJReXhEUVVGRExFMUJRVTBzUlVGQlJTeEZRVUZETEVsQlFVa3NSVUZCUXl4SlFVRkpMRVZCUVVNc1JVRkJSU3hEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1UwRkROME03WVVGQlRTeEpRVUZKTEVOQlFVTXNRMEZCUXl4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVU3V1VGRE0wSXNUMEZCVHl4WlFVRkRMRU5CUVVNc1IwRkJSeXhGUVVGRkxFVkJRVU1zU1VGQlNTeEZRVUZETEVsQlFVa3NSVUZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTXhRenRoUVVGTk8xbEJRMGdzVDBGQlR5eFpRVUZETEVOQlFVTXNUVUZCVFN4RlFVRkZMRVZCUVVNc1NVRkJTU3hGUVVGRExFbEJRVWtzUlVGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMU5CUTNCRE8wbEJRMHdzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4UFFVRlBMRmxCUVVNc1EwRkJReXhOUVVGTkxFVkJRVVVzVjBGQlZ5eERRVUZETEVOQlFVTTdRVUZEYkVNc1EwRkJRenRCUVVWRUxFMUJRVTBzVDBGQlR6dEpRVWxVTEZsQlFYTkNMRWRCUVRKQ08xRkJRVE5DTEZGQlFVY3NSMEZCU0N4SFFVRkhMRU5CUVhkQ08xRkJSakZETEZOQlFVa3NSMEZCV1N4RlFVRkZMRU5CUVVNN1NVRkhNVUlzUTBGQlF6dEpRVVZOTEUxQlFVMHNRMEZCUXl4SlFVRnZRanRSUVVNNVFpeEpRVUZKTEU5QlFVOHNTVUZCU1N4TFFVRkxMRkZCUVZFc1JVRkJSVHRaUVVNeFFpeEpRVUZKTEVsQlFVa3NRMEZCUXl4SFFVRkhMRXRCUVVjc1NVRkJTU3hGUVVGRk8yZENRVU5xUWl4SlFVRkpMRU5CUVVNc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF6dG5Ra0ZEYUVJc1dVRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTEUxQlFVMHNSVUZCUlN4TFFVRkxMRVZCUVVVc1IwRkJSeXhGUVVGRkxFbEJRVWtzUlVGQlJTeERRVUZETzNGQ1FVTjBReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZWTEVWQlFVVXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenR4UWtGRGRFUXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJTeXhGUVVGRkxFVkJRVVVzUTBGQlFTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMR05CUVdNc1NVRkJTU3hMUVVGTExFTkJRVU1zUTBGQlF5eFJRVUZSTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRoUVVOeVJUdFRRVU5LTzJGQlFVMDdXVUZEU0N4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1UwRkRjRU03U1VGRFRDeERRVUZETzBsQlJVOHNWMEZCVnl4RFFVRkRMRWxCUVZVc1JVRkJSU3hIUVVGMVFqdFJRVU51UkN4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFZEJRVWNzUTBGQlFTeERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTTdTVUZEZEVNc1EwRkJRenREUVVWS08wRkJSVVFzVFVGQllTeFRRVUZUTzBsQlFYUkNPMUZCUTBrc1QwRkJSU3hIUVVGSExFbEJRVWtzVDBGQlR5eEZRVUZGTEVOQlFVTTdTVUZ6UlhaQ0xFTkJRVU03U1VGeVJVY3NUVUZCVFN4RFFVRkRMRWxCUVZVN1VVRkRZaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZOQlFWTXNSMEZCUnl4RlFVRkZMRU5CUVVNN1VVRkRNVUlzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WFFVRlhMRWRCUVVjc1NVRkJTU3hEUVVGRE8xRkJRemxDTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU4wUWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExHRkJRV0VzUjBGQlJ5eEZRVUZGTEVOQlFVTTdVVUZET1VJc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU03VVVGRE1VTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhaUVVGWkxFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WlFVRlpMRXRCUVVjc1UwRkJVeXhEUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zV1VGQldTeERRVUZETzBsQlEyeEhMRU5CUVVNN1NVRkRSQ3hKUVVGSkxFTkJRVU1zU1VGQlZUdFJRVU5ZTEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRhRU1zVFVGQlRTeFJRVUZSTEVkQlFVY3NSMEZCUnl4RlFVRkZMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5dzBRa0ZCTkVJc1EwRkJReXhEUVVGRE8xRkJSV3BGTEUxQlFVMHNUVUZCVFN4SFFVRkhMRU5CUVVNc1EwRkJVU3hGUVVGRkxFVkJRVVU3V1VGRGVFSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhUUVVGVExFTkJRVU1zYVVKQlFXbENMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVMEZCVXl4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dFpRVU0zUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRVmNzUjBGQlJ5eEpRVUZKTEVOQlFVTTdXVUZET1VJc1QwRkJUeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zWVVGQllTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRE8xRkJRemxHTEVOQlFVTXNRMEZCUXp0UlFVTkdMRTFCUVUwc1RVRkJUU3hIUVVGSExFTkJRVU1zUTBGQlN5eEZRVUZGTEVWQlFVVTdXVUZCUnl4SlFVRkpMRU5CUVVNc1JVRkJSVHRuUWtGREwwSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhUUVVGVExFTkJRVU1zUzBGQlN5eEhRVUZITEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTTdaMEpCUXpWRUxFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdZVUZETVVNN1VVRkJRU3hEUVVGRExFTkJRVU03VVVGTlNDeE5RVUZOTEU5QlFVOHNSMEZCUnl4RFFVRkRMRU5CUVVzc1JVRkJSU3hGUVVGRk8xbEJRM1JDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eEhRVUZITEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNN1dVRkRNVU1zVFVGQlRTeExRVUZMTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFZEJRVWNzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXp0WlFVTjZReXhKUVVGSkxFdEJRVXNzUTBGQlF5eE5RVUZOTEVkQlFVTXNRMEZCUXl4RlFVRkZPMmRDUVVOb1FpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMR0ZCUVdFc1IwRkJSeXhKUVVGSkxFTkJRVU1zUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUXpGRExFTkJRVU1zUTBGQlVTeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzVFVGQlRTeERRVUZETEV0QlFVc3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVOcVJDeERRVUZETzJkQ1FVTkdMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEVWQlFVVTdiMEpCUVVVc1dVRkJXU3hEUVVGRExFdEJRVXNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0cFFrRkJSVHRoUVVNNVJEdFJRVU5NTEVOQlFVTXNRMEZCUXp0UlFVMUdMRTFCUVUwc1ZVRkJWU3hIUVVGSExFTkJRVU1zUTBGQlN5eEZRVUZGTEVWQlFVVTdXVUZEZWtJc1RVRkJUU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4VFFVRlRMRWRCUVVjc1EwRkJReXhEUVVGRExFMUJRVTBzUTBGQlF6dFpRVU14UXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRVmNzUjBGQlJ5eExRVUZMTEVOQlFVTTdXVUZETDBJc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEU5QlFVOHNSVUZCUlR0blFrRkRjRUlzVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRoUVVOdVFqdHBRa0ZCVFN4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzVjBGQlZ5eEpRVUZKTEVOQlFVTXNRMEZCUXl4VlFVRlZMRWRCUVVNc1EwRkJReXhGUVVGRk8yZENRVU5xUkN4TlFVRk5MRXRCUVVzc1IwRkJWU3hEUVVGRExFTkJRVU1zVjBGQlZ5eERRVUZETzJkQ1FVTnVReXhKUVVGSkxFdEJRVXNzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RlFVRkZPMjlDUVVOc1FpeERRVUZETEVOQlFVTXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdhVUpCUXpWQ08yRkJRMG83VVVGRFRDeERRVUZETEVOQlFVTTdVVUZGUml4TlFVRk5MRkZCUVZFc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUVN4RFFVRkRMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTXNRMEZCUXl4RFFVRkRMREpDUVVFeVFpeERRVUZETzFGQlEzWkdMRTlCUVU4c1dVRkJReXhEUVVGRExGVkJRVlVzUlVGQlJUdFpRVU5xUWl4WlFVRkRMRU5CUVVNc01rSkJRVEpDTEZGQlFWRXNSVUZCUlN4RlFVRkZPMmRDUVVOeVF5eGxRVUZsTEVWQlFVTXNTVUZCU1R0blFrRkRjRUlzVjBGQlZ5eEZRVUZMTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1YwRkJWenRuUWtGRGRFTXNVMEZCVXl4RlFVRlBMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eEpRVUZKTEVsQlFVazdaMEpCUXpWRExGTkJRVk1zUlVGQlR5eFZRVUZWTzJkQ1FVTXhRaXhQUVVGUExFVkJRVk1zVDBGQlR6dGhRVU14UWl4RlFVRkZMRmxCUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVFc1EwRkJReXhEUVVGQkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVTnlSVHRaUVVORUxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWMEZCVnl4RFFVRkJMRU5CUVVNc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dG5Ra0ZETDBJc1dVRkJReXhEUVVGRExHOUNRVUZ2UWl4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zWVVGQllTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVZFc1JVRkJSU3hGUVVGRkxFTkJRemxFTEZsQlFVTXNRMEZCUXl4RlFVRkZMRVZCUVVVc1JVRkJSU3hQUVVGUExFVkJRVVVzVFVGQlRTeEZRVUZGTEVWQlFVVXNVMEZCVXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVOMlJTeERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRPME5CUTBvN1FVRjJSVVFzT0VKQmRVVkRPMEZCVDBRc1UwRkJVeXhaUVVGWkxFTkJRVU1zUzBGQldTeEZRVUZGTEVsQlFWVTdTVUZETVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4VFFVRlRMRU5CUVVNN1NVRkZMMElzVFVGQlRTeG5Ra0ZCWjBJc1IwRkJSeXhKUVVGSkxFMUJRVTBzUTBGQlF5eEpRVUZKTEV0QlFVc3NSVUZCUlN4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRM1pFTEVOQlFVTXNRMEZCUXl4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eGhRVUZoTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJVU3hGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMR2RDUVVGblFpeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExFTkJRVU03U1VGRkwwWXNRMEZCUXl4RFFVRkRMR2xDUVVGcFFpeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0QlFVTjBSQ3hEUVVGREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNZW51XzEgPSByZXF1aXJlKFwiLi9NZW51XCIpO1xuZXhwb3J0cy5NZW51ID0gTWVudV8xLk1lbnU7XG52YXIgTWVudV8yID0gcmVxdWlyZShcIi4vTWVudVwiKTtcbmV4cG9ydHMuTWVudVBhbmVsID0gTWVudV8yLk1lbnVQYW5lbDtcbnZhciBCdXR0b25fMSA9IHJlcXVpcmUoXCIuL0J1dHRvblwiKTtcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uXzEuQnV0dG9uO1xudmFyIExhYmVsXzEgPSByZXF1aXJlKFwiLi9MYWJlbFwiKTtcbmV4cG9ydHMuTGFiZWwgPSBMYWJlbF8xLkxhYmVsO1xudmFyIFNsaWRlcl8xID0gcmVxdWlyZShcIi4vU2xpZGVyXCIpO1xuZXhwb3J0cy5TbGlkZXIgPSBTbGlkZXJfMS5TbGlkZXI7XG52YXIgUmFkaW9CdXR0b25fMSA9IHJlcXVpcmUoXCIuL1JhZGlvQnV0dG9uXCIpO1xuZXhwb3J0cy5SYWRpb0J1dHRvbiA9IFJhZGlvQnV0dG9uXzEuUmFkaW9CdXR0b247XG52YXIgT3B0aW9uc0J1dHRvbl8xID0gcmVxdWlyZShcIi4vT3B0aW9uc0J1dHRvblwiKTtcbmV4cG9ydHMuT3B0aW9uc0J1dHRvbiA9IE9wdGlvbnNCdXR0b25fMS5PcHRpb25zQnV0dG9uO1xudmFyIFRvZ2dsZUJ1dHRvbl8xID0gcmVxdWlyZShcIi4vVG9nZ2xlQnV0dG9uXCIpO1xuZXhwb3J0cy5Ub2dnbGVCdXR0b24gPSBUb2dnbGVCdXR0b25fMS5Ub2dnbGVCdXR0b247XG52YXIgVG9vbGJhckJ1dHRvbl8xID0gcmVxdWlyZShcIi4vVG9vbGJhckJ1dHRvblwiKTtcbmV4cG9ydHMuVG9vbGJhckJ1dHRvbiA9IFRvb2xiYXJCdXR0b25fMS5Ub29sYmFyQnV0dG9uO1xudmFyIFRvb2xiYXJCdXR0b25fMiA9IHJlcXVpcmUoXCIuL1Rvb2xiYXJCdXR0b25cIik7XG5leHBvcnRzLkJ1dHRvblN5bWJvbHMgPSBUb29sYmFyQnV0dG9uXzIuQnV0dG9uU3ltYm9scztcbnZhciBDb2xsYXBzaWJsZV8xID0gcmVxdWlyZShcIi4vQ29sbGFwc2libGVcIik7XG5leHBvcnRzLkNvbGxhcHNpYmxlID0gQ29sbGFwc2libGVfMS5Db2xsYXBzaWJsZTtcbnZhciBNb2RhbF8xID0gcmVxdWlyZShcIi4vTW9kYWxcIik7XG5leHBvcnRzLk1vZGFsID0gTW9kYWxfMS5Nb2RhbDtcbnZhciBUeXBlQWhlYWRfMSA9IHJlcXVpcmUoXCIuL1R5cGVBaGVhZFwiKTtcbmV4cG9ydHMuVHlwZUFoZWFkID0gVHlwZUFoZWFkXzEuVHlwZUFoZWFkO1xudmFyIEVkaXRMYWJlbF8xID0gcmVxdWlyZShcIi4vRWRpdExhYmVsXCIpO1xuZXhwb3J0cy5FZGl0TGFiZWwgPSBFZGl0TGFiZWxfMS5FZGl0TGFiZWw7XG52YXIgRWRpdExhYmVsXzIgPSByZXF1aXJlKFwiLi9FZGl0TGFiZWxcIik7XG5leHBvcnRzLkVkaXREYXRlID0gRWRpdExhYmVsXzIuRWRpdERhdGU7XG52YXIgRWRpdExpc3RfMSA9IHJlcXVpcmUoXCIuL0VkaXRMaXN0XCIpO1xuZXhwb3J0cy5FZGl0TGlzdCA9IEVkaXRMaXN0XzEuRWRpdExpc3Q7XG52YXIgRWRpdFNlbGVjdF8xID0gcmVxdWlyZShcIi4vRWRpdFNlbGVjdFwiKTtcbmV4cG9ydHMuRWRpdFNlbGVjdCA9IEVkaXRTZWxlY3RfMS5FZGl0U2VsZWN0O1xudmFyIEVkaXRDaGVja2JveF8xID0gcmVxdWlyZShcIi4vRWRpdENoZWNrYm94XCIpO1xuZXhwb3J0cy5FZGl0Q2hlY2tib3ggPSBFZGl0Q2hlY2tib3hfMS5FZGl0Q2hlY2tib3g7XG52YXIgRWRpdFRleHRhcmVhXzEgPSByZXF1aXJlKFwiLi9FZGl0VGV4dGFyZWFcIik7XG5leHBvcnRzLkVkaXRUZXh0YXJlYSA9IEVkaXRUZXh0YXJlYV8xLkVkaXRUZXh0YXJlYTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdmFXNWtaWGd1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRlBRU3dyUWtGQmMwTTdRVUZCTjBJc2MwSkJRVUVzU1VGQlNTeERRVUZCTzBGQlEySXNLMEpCUVhORE8wRkJRVGRDTERKQ1FVRkJMRk5CUVZNc1EwRkJRVHRCUVVWc1FpeHRRMEZCZDBNN1FVRkJMMElzTUVKQlFVRXNUVUZCVFN4RFFVRkJPMEZCUTJZc2FVTkJRWFZETzBGQlFUbENMSGRDUVVGQkxFdEJRVXNzUTBGQlFUdEJRVU5rTEcxRFFVRjNRenRCUVVFdlFpd3dRa0ZCUVN4TlFVRk5MRU5CUVVFN1FVRkRaaXcyUTBGQk5rTTdRVUZCY0VNc2IwTkJRVUVzVjBGQlZ5eERRVUZCTzBGQlEzQkNMR2xFUVVFclF6dEJRVUYwUXl4M1EwRkJRU3hoUVVGaExFTkJRVUU3UVVGRGRFSXNLME5CUVRoRE8wRkJRWEpETEhORFFVRkJMRmxCUVZrc1EwRkJRVHRCUVVOeVFpeHBSRUZCSzBNN1FVRkJkRU1zZDBOQlFVRXNZVUZCWVN4RFFVRkJPMEZCUTNSQ0xHbEVRVUVyUXp0QlFVRjBReXgzUTBGQlFTeGhRVUZoTEVOQlFVRTdRVUZEZEVJc05rTkJRVFpETzBGQlFYQkRMRzlEUVVGQkxGZEJRVmNzUTBGQlFUdEJRVU53UWl4cFEwRkJkVU03UVVGQk9VSXNkMEpCUVVFc1MwRkJTeXhEUVVGQk8wRkJRMlFzZVVOQlFUSkRPMEZCUVd4RExHZERRVUZCTEZOQlFWTXNRMEZCUVR0QlFVTnNRaXg1UTBGQk1rTTdRVUZCYkVNc1owTkJRVUVzVTBGQlV5eERRVUZCTzBGQlEyeENMSGxEUVVFeVF6dEJRVUZzUXl3clFrRkJRU3hSUVVGUkxFTkJRVUU3UVVGRGFrSXNkVU5CUVRCRE8wRkJRV3BETERoQ1FVRkJMRkZCUVZFc1EwRkJRVHRCUVVOcVFpd3lRMEZCTkVNN1FVRkJia01zYTBOQlFVRXNWVUZCVlN4RFFVRkJPMEZCUTI1Q0xDdERRVUU0UXp0QlFVRnlReXh6UTBGQlFTeFpRVUZaTEVOQlFVRTdRVUZEY2tJc0swTkJRVGhETzBGQlFYSkRMSE5EUVVGQkxGbEJRVmtzUTBGQlFTSjkiXSwic291cmNlUm9vdCI6IiJ9