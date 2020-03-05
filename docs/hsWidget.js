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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQStFQSxpQ0FBOEI7QUFHOUIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBVWhFLE1BQWEsR0FBRztJQWtDWixZQUFZLE1BQWE7UUFIZixnQkFBVyxHQUFrQixTQUFTLENBQUM7UUFDdkMsaUJBQVksR0FBTSxFQUFFLENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztJQUFDLENBQUM7SUFvQm5ELEtBQUssQ0FBQyxXQUFtQixFQUFFLGNBQXVCO1FBQ3JELElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUMxRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDbkQsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQzNCLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDdkI7YUFBTSxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7U0FDaEM7YUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxjQUFjLEVBQUU7Z0JBQUUsR0FBRyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7YUFBRTtpQkFDL0I7Z0JBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7YUFBRTtZQUNwRCxNQUFNLEdBQUcsR0FBRyxPQUFPLGNBQWMsQ0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxjQUFjLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDO1lBQ2hKLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2RTthQUFNO1lBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGdCQUFnQixXQUFXLHVCQUF1QixRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUN6RjtRQUNELE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUN4QixDQUFDO0lBVVksS0FBSyxDQUFDLEdBQU8sRUFBRSxRQUFRLEdBQUMsSUFBSTs4REFBb0IsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FBQTtJQVV4RixJQUFJLENBQUMsR0FBTyxFQUFFLFFBQVEsR0FBQyxJQUFJOzhEQUFvQixPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUFBO0lBVXRGLElBQUksQ0FBQyxHQUFPLEVBQUUsUUFBUSxHQUFDLElBQUk7OERBQW9CLE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUE7SUFTdEYsS0FBSyxDQUFDLEdBQU8sRUFBRSxRQUFRLEdBQUMsSUFBSTs7WUFDckMsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNiLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUM7YUFDdEI7aUJBQU07Z0JBQ0gsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN6QztRQUNMLENBQUM7S0FBQTtJQVVlLEdBQUcsQ0FBQyxHQUFVLEVBQUUsR0FBTzs7WUFDbkMsSUFBSSxJQUFJLEdBQWEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUM7WUFDeEQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLFdBQVcsQ0FBQyxVQUFVLEVBQUU7Z0JBQzNDLE1BQU0sT0FBTyxHQUFHLFdBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3JDLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO29CQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUFFO2dCQUNqRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEM7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO0tBQUE7SUFPUyxXQUFXLENBQUMsSUFBVyxFQUFFLEdBQVUsRUFBRSxPQUFjLEVBQUUsSUFBVztRQUN0RSxPQUFPLEdBQUcsT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzdELENBQUM7SUFZTSxNQUFNLENBQUMsTUFBYztRQUN4QixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFBRSxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7U0FBRTthQUN2RCxJQUFJLE1BQU0sRUFBTTtZQUFFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1NBQUU7UUFDakQsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQzFCLENBQUM7SUFPTSxNQUFNLENBQUMsR0FBVztRQUNyQixJQUFJLEdBQUcsRUFBRTtZQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1NBQUU7UUFDckMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFVTSxNQUFNLENBQUMsR0FBcUQ7UUFDL0QsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFHLFNBQVMsRUFBRTtZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQUU7UUFDeEQsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFHLFNBQVMsRUFBRztZQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQUU7SUFDMUQsQ0FBQztJQWFNLE9BQU8sQ0FBQyxHQUFPLEVBQUUsS0FBSyxHQUFDLENBQUMsRUFBRSxNQUFNLEdBQUMsTUFBTSxFQUFFLE1BQU0sR0FBQyxNQUFNO1FBQ3pELFNBQVMsUUFBUSxDQUFDLEdBQU8sRUFBRSxLQUFZLEVBQUUsS0FBWSxFQUFFLFVBQWlCO1lBQ3BFLElBQUksR0FBRyxLQUFLLElBQUksRUFBZ0I7Z0JBQUUsT0FBTyxNQUFNLENBQUM7YUFBRTtZQUNsRCxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQVc7Z0JBQUUsT0FBTyxXQUFXLENBQUM7YUFBRTtZQUN2RCxJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVUsRUFBRztnQkFBRSxPQUFPLFVBQVUsQ0FBQzthQUFFO1lBQ3RELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFLO2dCQUFFLE9BQU8sSUFBSSxHQUFHLEdBQUcsQ0FBQzthQUFFO1lBQ3RELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFLO2dCQUM1QixJQUFJLEtBQUssR0FBQyxDQUFDLEVBQUU7b0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUcsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2lCQUFFO2dCQUNwRSxJQUFJLEdBQUcsQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO29CQUN2QixPQUFPLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUssRUFBQyxFQUFFLENBQUEsQ0FBQyxDQUFDLEtBQUcsU0FBUyxDQUFDLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLENBQUEsUUFBUSxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUMsQ0FBQyxFQUFFLEtBQUssR0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDMUc7Z0JBQ0YsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZFLE1BQU0sTUFBTSxHQUFJLE1BQU0sQ0FBQSxDQUFDLENBQUMseUJBQXlCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDekYsTUFBTSxLQUFLLEdBQUssTUFBTSxDQUFBLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDM0MsTUFBTSxFQUFFLEdBQVEsTUFBTSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDdEMsT0FBTyxJQUFJLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxPQUFPLEdBQUcsS0FBSyxLQUM1RSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBQyxDQUFDLEVBQUUsS0FBSyxHQUFDLENBQUMsRUFBRSxVQUFVLEdBQUMsTUFBTSxDQUN4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLFVBQVUsR0FBRyxDQUFDO2FBQ2xEO1lBQ0QsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUNELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLE1BQU0sRUFBRTtZQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUFFO1FBQ3hELE9BQU8sUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLEtBQUcsSUFBSSxDQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVTLGFBQWEsQ0FBQyxNQUFhLEVBQUUsS0FBWSxFQUFFLFVBQWlCO1FBQ2xFLE9BQU8sQ0FBQyxHQUFHLFVBQVUsR0FBRyxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDOztBQXBPTCxrQkFxT0M7QUFuT29CLGlCQUFhLEdBQUcsOEJBQThCLENBQUM7QUFDL0MsY0FBVSxHQUFNLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFHckMsU0FBSyxHQUFHLE9BQU8sQ0FBQztBQUdoQixRQUFJLEdBQUssTUFBTSxDQUFDO0FBR2hCLFFBQUksR0FBSyxNQUFNLENBQUM7QUFHaEIsU0FBSyxHQUFJLE9BQU8sQ0FBQztBQUdkLFVBQU0sR0FBRztJQUN0QixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBSyxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztJQUM5RCxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBTSxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUcsSUFBSSxFQUFFLE1BQU0sRUFBQztJQUM3RCxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBTSxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUcsSUFBSSxFQUFFLE1BQU0sRUFBQztJQUM3RCxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBSyxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztDQUNqRSxDQUFDO0FBR1ksT0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBR2YsZUFBVyxHQUFhLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDIn0=

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
                hslayout_1.m(`span.hsedit_label${css}`, { onclick: this.click.bind(this) }, node.attrs.content)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdExhYmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0VkaXRMYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXFDQSxtQ0FBa0M7QUFBRSxNQUFNLEdBQUcsR0FBRyxJQUFJLFlBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyRSx1Q0FBb0M7QUFHcEMsTUFBYSxTQUFTO0lBQXRCO1FBQ2MsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLFlBQU8sR0FBRyxFQUFFLENBQUM7SUEyQzNCLENBQUM7SUF6Q2EsS0FBSyxDQUFDLENBQUs7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVTLElBQUksQ0FBQyxDQUFLO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRVMsS0FBSyxDQUFDLEdBQU87UUFDbkIsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVTLE1BQU0sQ0FBQyxRQUFlO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUFVO1FBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRU0sSUFBSSxDQUFDLElBQVU7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBLENBQUM7WUFDakIsWUFBQyxDQUFDLHFCQUFxQixHQUFHLEVBQUUsRUFBRTtnQkFDMUIsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDNUIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNqQyxFQUFDLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7Z0JBQzlDLFlBQUMsQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDdEYsQ0FBQyxDQUFDLFlBQUMsQ0FBQyw0QkFBNEIsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdILENBQUM7Q0FDSjtBQS9DRCw4QkErQ0M7QUFFRCxNQUFhLFFBQVMsU0FBUSxTQUFTO0lBQXZDOztRQUNjLFlBQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQVUzRCxDQUFDO0lBVGEsTUFBTSxDQUFDLFFBQWU7UUFDNUIsSUFBSSxRQUFRLEVBQUU7WUFDVixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hCO2FBQU07WUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztDQUNKO0FBWEQsNEJBV0MifQ==

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
const defRender = (rows) => {
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
class EditList {
    view(node) {
        const css = node.attrs.css || '';
        const sort = node.attrs.sort || (() => 0);
        const rows = node.attrs.rows;
        const isEmpty = node.attrs.isEmpty || defIsEmpty;
        const render = node.attrs.rowRender || defRender(rows);
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
            hslayout_1.m('.hsedit_list_content', rows.sort(sort).map((row, i) => hslayout_1.m(hslayout_2.Layout, {
                css: '.hsedit_list_row',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvRWRpdExpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFzRkEsdUNBQW9DO0FBQ3BDLG1DQUFrQztBQUFFLE1BQU0sR0FBRyxHQUFHLElBQUksWUFBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BFLHVDQUFvQztBQUNwQywyQ0FBd0M7QUFDeEMsK0NBQTRDO0FBYTVDLE1BQU0sVUFBVSxHQUFVLENBQUMsR0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBT3pFLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBVSxFQUFZLEVBQUU7SUFDdkMsT0FBTyxDQUFDLEdBQU8sRUFBRSxNQUFhLEVBQUUsRUFBRTtRQUM5QixJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDVCxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFRLEVBQUUsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxZQUFDLENBQUMscUJBQVMsRUFBRTtnQkFDaEQsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsV0FBVyxFQUFFLFFBQVE7Z0JBQ3JCLE1BQU0sRUFBRSxDQUFDLFFBQWUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVE7YUFDakQsQ0FBQyxDQUFDLENBQUM7U0FDUDthQUFNLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGlCQUFpQixFQUFFO1lBQ2xFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLFlBQUMsQ0FBQyxxQkFBUyxFQUFFO2dCQUNuRCxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMs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

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
const log = new hsutil_1.Log('EditLabel');
const hslayout_1 = __webpack_require__(/*! hslayout */ "../../../../../../../../../../Shared/Sites/staging/apps/hsDocs/node_modules/hslayout/index.js");
class EditTextarea {
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
            hslayout_1.m(`textarea.hsedit_textarea${css}`, {
                wrap: 'physical',
                onblur: this.blur.bind(this),
            }, '')
            : (node.attrs.content && node.attrs.content.length) ?
                hslayout_1.m(`div.hsedit_textarea${css}`, { onclick: this.click.bind(this) }, node.attrs.content)
                : hslayout_1.m(`div.hsedit_textarea.default${css}`, { onclick: this.click.bind(this) }, node.attrs.placeholder || 'click to enter');
    }
}
exports.EditTextarea = EditTextarea;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdFRleHRhcmVhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0VkaXRUZXh0YXJlYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXFDQSxtQ0FBa0M7QUFBRSxNQUFNLEdBQUcsR0FBRyxJQUFJLFlBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyRSx1Q0FBb0M7QUFHcEMsTUFBYSxZQUFZO0lBQXpCO1FBQ2MsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLFlBQU8sR0FBRyxFQUFFLENBQUM7SUE0QzNCLENBQUM7SUExQ2EsS0FBSyxDQUFDLENBQUs7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVTLElBQUksQ0FBQyxDQUFLO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRVMsS0FBSyxDQUFDLEdBQU87UUFDbkIsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVTLE1BQU0sQ0FBQyxRQUFlO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUFVO1FBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRU0sSUFBSSxDQUFDLElBQVU7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBLENBQUM7WUFDakIsWUFBQyxDQUFDLDJCQUEyQixHQUFHLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFFL0IsRUFBQyxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO2dCQUM5QyxZQUFDLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQ3hGLENBQUMsQ0FBQyxZQUFDLENBQUMsOEJBQThCLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksZ0JBQWdCLENBQUMsQ0FBQztJQUMvSCxDQUFDO0NBQ0o7QUFoREQsb0NBZ0RDIn0=

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZUFoZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1R5cGVBaGVhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTZDQSx1Q0FBb0M7QUFDcEMsbUNBQTZCO0FBRTNCLE1BQU0sR0FBRyxHQUFHLElBQUksWUFBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBR25DLFNBQVMsU0FBUyxDQUFDLElBQVcsRUFBRSxLQUFZO0lBQ3hDLE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxNQUFNLFdBQVcsR0FBRyxJQUFJO1NBQ25CLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDeEMsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLEdBQUcsQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFO1FBQ2QsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sWUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0M7YUFBTSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0gsT0FBTyxZQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxPQUFPLFlBQUMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVELE1BQU0sT0FBTztJQUlULFlBQXNCLEdBQTJCO1FBQTNCLFFBQUcsR0FBSCxHQUFHLENBQXdCO1FBRjFDLFNBQUksR0FBWSxFQUFFLENBQUM7SUFHMUIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxJQUFvQjtRQUM5QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUMxQixJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUcsSUFBSSxFQUFFO2dCQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDaEIsWUFBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO3FCQUN0QyxJQUFJLENBQUMsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDdEQsS0FBSyxDQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUUsQ0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNyRTtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRU8sV0FBVyxDQUFDLElBQVUsRUFBRSxHQUF1QjtRQUNuRCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdEMsQ0FBQztDQUVKO0FBRUQsTUFBYSxTQUFTO0lBQXRCO1FBQ0ksT0FBRSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUF1RXZCLENBQUM7SUF0RUcsTUFBTSxDQUFDLElBQVU7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUcsU0FBUyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO0lBQ2xHLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBVTtRQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBRWpFLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBUSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlGLENBQUMsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBSyxFQUFFLEVBQUU7WUFBRyxJQUFJLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzVELE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUM7UUFBQSxDQUFDLENBQUM7UUFNSCxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUssRUFBRSxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUN6QyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFO2dCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQzFDLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUNqRCxDQUFDO2dCQUNGLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7b0JBQUUsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFBRTthQUM5RDtRQUNMLENBQUMsQ0FBQztRQU1GLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBSyxFQUFFLEVBQUU7WUFDekIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtnQkFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuQjtpQkFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxFQUFFO2dCQUNqRCxNQUFNLEtBQUssR0FBVSxDQUFDLENBQUMsV0FBVyxDQUFDO2dCQUVuQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNsQixDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzVCO2FBQ0o7UUFDTCxDQUFDLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLDJCQUEyQixDQUFDO1FBQ3ZGLE9BQU8sWUFBQyxDQUFDLFVBQVUsRUFBRTtZQUNqQixZQUFDLENBQUMsMkJBQTJCLFFBQVEsRUFBRSxFQUFFO2dCQUNyQyxlQUFlLEVBQUMsSUFBSTtnQkFDcEIsV0FBVyxFQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztnQkFDdEMsU0FBUyxFQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUk7Z0JBQzVDLFNBQVMsRUFBTyxVQUFVO2dCQUMxQixPQUFPLEVBQVMsT0FBTzthQUMxQixFQUFFLFlBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUNyRTtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDL0IsWUFBQyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFLENBQzlELFlBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUF4RUQsOEJBd0VDO0FBT0QsU0FBUyxZQUFZLENBQUMsS0FBWSxFQUFFLElBQVU7SUFDMUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFFL0IsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUM7SUFFL0YsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0RCxDQUFDIn0=

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oc1dpZGdldC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L0NvbmZpZy5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L2luZGV4LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvbWl0aHJpbC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvTGF5b3V0LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvdmlldy9MYXlvdXRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvUGlsbGFyZWRMYXlvdXRlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzbGF5b3V0L3ZpZXcvVGlsZUxheW91dGVyLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvaHNsYXlvdXQvdmlldy9Ub2tlbnMuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc3V0aWwvQ2hlY2tzdW0uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc3V0aWwvRGF0ZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzdXRpbC9OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9oc3V0aWwvVGltZWRQcm9taXNlcy5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzdXRpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL2hzdXRpbC9sb2cuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL2FwaS9tb3VudC1yZWRyYXcuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL2FwaS9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL2h5cGVyc2NyaXB0LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL21pdGhyaWwvbW91bnQtcmVkcmF3LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9wYXRobmFtZS9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL2J1aWxkLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9wYXRobmFtZS9jb21waWxlVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3BhdGhuYW1lL3BhcnNlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9wcm9taXNlL3BvbHlmaWxsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9wcm9taXNlL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3F1ZXJ5c3RyaW5nL2J1aWxkLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9xdWVyeXN0cmluZy9wYXJzZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9yZW5kZXIvZnJhZ21lbnQuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9oeXBlcnNjcmlwdC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyL2h5cGVyc2NyaXB0Vm5vZGUuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3JlbmRlci90cnVzdC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8vVXNlcnMvU2hhcmVkL1NpdGVzL3N0YWdpbmcvYXBwcy9oc0RvY3Mvbm9kZV9tb2R1bGVzL21pdGhyaWwvcmVuZGVyL3Zub2RlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9yZXF1ZXN0LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly9Vc2Vycy9TaGFyZWQvU2l0ZXMvc3RhZ2luZy9hcHBzL2hzRG9jcy9ub2RlX21vZHVsZXMvbWl0aHJpbC9yZXF1ZXN0L3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvL1VzZXJzL1NoYXJlZC9TaXRlcy9zdGFnaW5nL2FwcHMvaHNEb2NzL25vZGVfbW9kdWxlcy9taXRocmlsL3JvdXRlLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Lyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8od2VicGFjaykvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8od2VicGFjaykvbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvKHdlYnBhY2spL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9Db2xsYXBzaWJsZS5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9FZGl0Q2hlY2tib3guanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vRWRpdExhYmVsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0VkaXRMaXN0LmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0VkaXRTZWxlY3QuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vRWRpdFRleHRhcmVhLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL0xhYmVsLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL01lbnUuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vTW9kYWwuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vT3B0aW9uc0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9SYWRpb0J1dHRvbi5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9TZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9oc1dpZGdldC8uL2Jpbi9TbGlkZXIuanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vVG9nZ2xlQnV0dG9uLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL1Rvb2xiYXJCdXR0b24uanMiLCJ3ZWJwYWNrOi8vaHNXaWRnZXQvLi9iaW4vVHlwZUFoZWFkLmpzIiwid2VicGFjazovL2hzV2lkZ2V0Ly4vYmluL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2I7QUFDQSwyQkFBMkIsK0RBQStELGdCQUFnQixFQUFFLEVBQUU7QUFDOUc7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IscUZBQXFGO0FBQ3BIO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsa0JBQWtCLG1CQUFPLENBQUMs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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUMsY0FBYztBQUMvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxxQkFBcUI7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsYUFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QixpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsbUJBQW1CO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0osbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDJCQUEyQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsb0JBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsZUFBZTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7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LENBQUMscUNBQVk7QUFDckM7QUFDQSxtQkFBbUIsbUJBQU8sQ0FBQyx5Q0FBYztBQUN6QztBQUNBLHFCQUFxQixtQkFBTyxDQUFDLDZDQUFnQjtBQUM3QztBQUNBLHFCQUFxQixtQkFBTyxDQUFDLDZDQUFnQjtBQUM3QztBQUNBLDJDQUEyQywrL0IiLCJmaWxlIjoiaHNXaWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Jpbi9pbmRleC5qc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtaXRocmlsXzEgPSByZXF1aXJlKFwiLi9taXRocmlsXCIpO1xuY29uc3QgaHN1dGlsXzEgPSByZXF1aXJlKFwiaHN1dGlsXCIpO1xuY29uc3QgbG9nID0gbmV3IGhzdXRpbF8xLkxvZygnQ29uZmlnJyk7XG5jbGFzcyBDb25maWcge1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gbm9kZS5hdHRycy5jb250ZXh0O1xuICAgICAgICAgICAgaWYgKCFub2RlLnN0YXRlLmNmZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSAodHlwZW9mIG5vZGUuYXR0cnMuc291cmNlID09PSAnc3RyaW5nJykgP1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCBtaXRocmlsXzEubS5yZXF1ZXN0KHsgbWV0aG9kOiBcIkdFVFwiLCB1cmw6IG5vZGUuYXR0cnMuc291cmNlIH0pXG4gICAgICAgICAgICAgICAgICAgIDogbm9kZS5hdHRycy5zb3VyY2U7XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5jZmcgPSB0cmFuc2xhdGUocywgcy5yb290LCBjb250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBjZmcgPSBub2RlLnN0YXRlLmNmZztcbiAgICAgICAgcmV0dXJuIChjZmcgJiYgY2ZnLmNvbXBDbGFzcykgPyBtaXRocmlsXzEubShjZmcuY29tcENsYXNzLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNmZy5hdHRycyksIG5vZGUuYXR0cnMpKSA6IG1pdGhyaWxfMS5tKCdkaXYnLCAnd2FpdGluZycpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29uZmlnID0gQ29uZmlnO1xuZnVuY3Rpb24gdHJhbnNsYXRlKGNvbmZpZywgc3ViY2ZnLCBjb250ZXh0KSB7XG4gICAgaWYgKGlzU3lub255bShjb25maWcsIHN1YmNmZykpIHtcbiAgICAgICAgc3ViY2ZnID0gY29uZmlnW3N1YmNmZ107XG4gICAgfVxuICAgIGlmIChbJ3N0cmluZycsICdudW1iZXInLCAnYm9vbGVhbicsICdmdW5jdGlvbiddLmluZGV4T2YodHlwZW9mIHN1YmNmZykgPj0gMCkge1xuICAgICAgICByZXR1cm4gc3ViY2ZnO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gc3ViY2ZnLmxlbmd0aCA/IFtdIDoge307XG4gICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5rZXlzKHN1YmNmZyk7XG4gICAgb3B0aW9ucy5tYXAoKG9wdCkgPT4ge1xuICAgICAgICBjb25zdCBjbCA9IHJlc29sdmUob3B0LCBjb250ZXh0KTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRyYW5zbGF0ZShjb25maWcsIHN1YmNmZ1tvcHRdLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKGNsKSB7XG4gICAgICAgICAgICBsb2cuZGVidWcoYHJlc29sdmVkIGNsYXNzICcke29wdH0nIHRvICR7bG9nLmluc3BlY3QoY2wsIDEpfWApO1xuICAgICAgICAgICAgY29uc3QgciA9IHtcbiAgICAgICAgICAgICAgICBjb21wQ2xhc3M6IGNsLFxuICAgICAgICAgICAgICAgIGF0dHJzOiBjb250ZW50XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgKCFBcnJheS5pc0FycmF5KHN1YmNmZykgJiYgb3B0aW9ucy5sZW5ndGggPT09IDEpID9cbiAgICAgICAgICAgICAgICByZXN1bHQgPSByIDpcbiAgICAgICAgICAgICAgICByZXN1bHRbb3B0XSA9IHI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4ocGFyc2VJbnQob3B0KSkpIHtcbiAgICAgICAgICAgICAgICBsb2cuZGVidWcoYHJlc29sdmVkIGRpcmVjdCAnJHtvcHR9JyB0byAke2xvZy5pbnNwZWN0KGNvbnRlbnQsIDApfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W29wdF0gPSBjb250ZW50O1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHJlc29sdmUoc3ltLCBjb250ZXh0KSB7XG4gICAgbG9nLmRlYnVnKGByZXNvbHZpbmcgJHtzeW19IGluIGNvbnRleHQgJyR7bG9nLmluc3BlY3QoY29udGV4dCwgMCl9J2ApO1xuICAgIGxldCBjbDtcbiAgICBjb250ZXh0LnNvbWUoKGMpID0+IGNsID0gY1tzeW1dKTtcbiAgICBsb2cuZGVidWcoYHJlc29sdmluZyAke3N5bX0gPT4gJHtsb2cuaW5zcGVjdChjbCwgMCl9YCk7XG4gICAgcmV0dXJuIGNsO1xufVxuZnVuY3Rpb24gaXNTeW5vbnltKGNvbmZpZywga2V5KSB7IHJldHVybiB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyAmJiBjb25maWdba2V5XTsgfVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUTI5dVptbG5MbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDBOdmJtWnBaeTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3pzN096czdPenM3T3p0QlFYbEdRU3gxUTBGQmVVTTdRVUZEZWtNc2JVTkJRVGhDTzBGQlFVTXNUVUZCVFN4SFFVRkhMRWRCUVVjc1NVRkJTU3haUVVGSExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdRVUZMTjBRc1RVRkJZU3hOUVVGTk8wbEJRMVFzVFVGQlRTeERRVUZETEVsQlFWVTdPMWxCUTI1Q0xFMUJRVTBzVDBGQlR5eEhRVUZUTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRE8xbEJRM3BETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUlVGQlJUdG5Ra0ZEYWtJc1RVRkJUU3hEUVVGRExFZEJRVWNzUTBGQlF5eFBRVUZQTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hMUVVGTExGRkJRVkVzUTBGQlF5eERRVUZCTEVOQlFVTTdiMEpCUXpsRExFMUJRVTBzVjBGQlF5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZMRTFCUVUwc1JVRkJSU3hMUVVGTExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hGUVVGRExFTkJRVU03YjBKQlF6TkVMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXp0blFrRkRkRUlzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRWRCUVVjc1UwRkJVeXhEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTXNTVUZCU1N4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRE8yRkJRMnhFTzFGQlEwd3NRMEZCUXp0TFFVRkJPMGxCUTBRc1NVRkJTU3hEUVVGRExFbEJRVlU3VVVGRFdDeE5RVUZOTEVkQlFVY3NSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF6dFJRVU16UWl4UFFVRlBMRU5CUVVNc1IwRkJSeXhKUVVGSkxFZEJRVWNzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1YwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eFRRVUZUTEVWQlFVVXNUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4SFFVRkhMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExGZEJRVU1zUTBGQlF5eExRVUZMTEVWQlFVVXNVMEZCVXl4RFFVRkRMRU5CUVVNN1NVRkRia2tzUTBGQlF6dERRVU5LTzBGQlpFUXNkMEpCWTBNN1FVRmhSQ3hUUVVGVExGTkJRVk1zUTBGQlF5eE5RVUZWTEVWQlFVVXNUVUZCVlN4RlFVRkZMRTlCUVdFN1NVRkZjRVFzU1VGQlNTeFRRVUZUTEVOQlFVTXNUVUZCVFN4RlFVRkZMRTFCUVUwc1EwRkJReXhGUVVGRk8xRkJRVVVzVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRMUVVGRk8wbEJSVE5FTEVsQlFVa3NRMEZCUXl4UlFVRlJMRVZCUVVVc1VVRkJVU3hGUVVGRkxGTkJRVk1zUlVGQlJTeFZRVUZWTEVOQlFVTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1QwRkJUeXhOUVVGTkxFTkJRVU1zU1VGQlJTeERRVUZETEVWQlFVVTdVVUZCUlN4UFFVRlBMRTFCUVUwc1EwRkJRenRMUVVGRk8wbEJRemRHTEVsQlFVa3NUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhOUVVGTkxFTkJRVUVzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGRE8wbEJSWEJETEUxQlFVMHNUMEZCVHl4SFFVRkhMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdTVUZEY0VNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVkQlFWVXNSVUZCVVN4RlFVRkZPMUZCUXpkQ0xFMUJRVTBzUlVGQlJTeEhRVUZQTEU5QlFVOHNRMEZCUXl4SFFVRkhMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRGNrTXNUVUZCVFN4UFFVRlBMRWRCUVVjc1UwRkJVeXhEUVVGRExFMUJRVTBzUlVGQlJTeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRmVFUXNTVUZCU1N4RlFVRkZMRVZCUVVVN1dVRkRTaXhIUVVGSExFTkJRVU1zUzBGQlN5eERRVUZETEcxQ1FVRnRRaXhIUVVGSExGRkJRVkVzUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETzFsQlF6bEVMRTFCUVUwc1EwRkJReXhIUVVGSE8yZENRVU5PTEZOQlFWTXNSVUZCUXl4RlFVRkZPMmRDUVVOYUxFdEJRVXNzUlVGQlF5eFBRVUZQTzJGQlEyaENMRU5CUVVNN1dVRkRSaXhEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hQUVVGUExFTkJRVU1zVFVGQlRTeExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkJMRU5CUVVNN1owSkJRemRETEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRFdpeE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xTkJRM1pDTzJGQlJVazdXVUZEUkN4SlFVRkpMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSVUZCUlR0blFrRkRkRUlzUjBGQlJ5eERRVUZETEV0QlFVc3NRMEZCUXl4dlFrRkJiMElzUjBGQlJ5eFJRVUZSTEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXp0aFFVTjJSVHRaUVVORUxFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4UFFVRlBMRU5CUVVNN1UwRkRla0k3U1VGRFRDeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTklMRTlCUVU4c1RVRkJUU3hEUVVGRE8wRkJRMnhDTEVOQlFVTTdRVUZWUkN4VFFVRlRMRTlCUVU4c1EwRkJReXhIUVVGVkxFVkJRVVVzVDBGQllUdEpRVU4wUXl4SFFVRkhMRU5CUVVNc1MwRkJTeXhEUVVGRExHRkJRV0VzUjBGQlJ5eG5Ra0ZCWjBJc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eFBRVUZQTEVWQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRM0pGTEVsQlFVa3NSVUZCVFN4RFFVRkRPMGxCUTFnc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVc3NSVUZCUlN4RlFVRkZMRU5CUVVVc1JVRkJSU3hIUVVGSExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTNSRExFZEJRVWNzUTBGQlF5eExRVUZMTEVOQlFVTXNZVUZCWVN4SFFVRkhMRTlCUVU4c1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTEVWQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8wbEJRM1JFTEU5QlFVOHNSVUZCUlN4RFFVRkRPMEZCUTJRc1EwRkJRenRCUVVWRUxGTkJRVk1zVTBGQlV5eERRVUZETEUxQlFWVXNSVUZCUlN4SFFVRlBMRWxCUVVrc1QwRkJUeXhQUVVGUExFZEJRVWNzUzBGQlN5eFJRVUZSTEVsQlFVa3NUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnJlcXVpcmUoXCIuL3ZpZXcvUGlsbGFyZWRMYXlvdXRlclwiKTtcbnJlcXVpcmUoXCIuL3ZpZXcvVGlsZUxheW91dGVyXCIpO1xudmFyIExheW91dF8xID0gcmVxdWlyZShcIi4vdmlldy9MYXlvdXRcIik7XG5leHBvcnRzLkxheW91dCA9IExheW91dF8xLkxheW91dDtcbnZhciBUb2tlbnNfMSA9IHJlcXVpcmUoXCIuL3ZpZXcvVG9rZW5zXCIpO1xuZXhwb3J0cy5GSUxMID0gVG9rZW5zXzEuRklMTDtcbmV4cG9ydHMucHggPSBUb2tlbnNfMS5weDtcbmV4cG9ydHMucGMgPSBUb2tlbnNfMS5wYztcbmV4cG9ydHMuTGF5b3V0VG9rZW4gPSBUb2tlbnNfMS5MYXlvdXRUb2tlbjtcbnZhciBMYXlvdXRlcl8xID0gcmVxdWlyZShcIi4vdmlldy9MYXlvdXRlclwiKTtcbmV4cG9ydHMuTGF5b3V0ZXIgPSBMYXlvdXRlcl8xLkxheW91dGVyO1xudmFyIENvbmZpZ18xID0gcmVxdWlyZShcIi4vQ29uZmlnXCIpO1xuZXhwb3J0cy5Db25maWcgPSBDb25maWdfMS5Db25maWc7XG52YXIgbWl0aHJpbF8xID0gcmVxdWlyZShcIi4vbWl0aHJpbFwiKTtcbmV4cG9ydHMubSA9IG1pdGhyaWxfMS5tO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12YVc1a1pYZ3VkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGTFFTeHRRMEZCYVVNN1FVRkRha01zSzBKQlFUWkNPMEZCUnpkQ0xIZERRVUUyUXp0QlFVRndReXd3UWtGQlFTeE5RVUZOTEVOQlFVRTdRVUZEWml4M1EwRkROa003UVVGRWNFTXNkMEpCUVVFc1NVRkJTU3hEUVVGQk8wRkJRVVVzYzBKQlFVRXNSVUZCUlN4RFFVRkJPMEZCUVVVc2MwSkJRVUVzUlVGQlJTeERRVUZCTzBGQlExb3NLMEpCUVVFc1YwRkJWeXhEUVVGQk8wRkJRM0JDTERSRFFVRXJRenRCUVVGMFF5dzRRa0ZCUVN4UlFVRlJMRU5CUVVFN1FVRkRha0lzYlVOQlFYZERPMEZCUVM5Q0xEQkNRVUZCTEUxQlFVMHNRMEZCUVR0QlFVTm1MSEZEUVVGNVF6dEJRVUZvUXl4elFrRkJRU3hEUVVGRExFTkJRVUVpZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tID0gcmVxdWlyZShcIm1pdGhyaWxcIik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2liV2wwYUhKcGJDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTl0YVhSb2NtbHNMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlVXRXNVVUZCUVN4RFFVRkRMRWRCUVVjc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbWl0aHJpbF8xID0gcmVxdWlyZShcIi4uL21pdGhyaWxcIik7XG5jb25zdCBMYXlvdXRlcl8xID0gcmVxdWlyZShcIi4vTGF5b3V0ZXJcIik7XG5jb25zdCBoc3V0aWxfMSA9IHJlcXVpcmUoXCJoc3V0aWxcIik7XG5jb25zdCBsb2cgPSBuZXcgaHN1dGlsXzEuTG9nKCdMYXlvdXQnKTtcbmNsYXNzIExheW91dCB7XG4gICAgZ2V0Q29tcG9uZW50cyhub2RlKSB7XG4gICAgICAgIHJldHVybiAhQXJyYXkuaXNBcnJheShub2RlLmF0dHJzLmNvbnRlbnQpID8gbm9kZS5hdHRycy5jb250ZW50IDpcbiAgICAgICAgICAgIG5vZGUuYXR0cnMuY29udGVudC5tYXAoKGMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYy5jb21wQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgYy5hdHRycy5yb3V0ZSA9IG5vZGUuYXR0cnMucm91dGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtaXRocmlsXzEubShjLmNvbXBDbGFzcywgYy5hdHRycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0Q1NTKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgIH1cbiAgICBub3JtYWxpemVDb250ZW50KGNvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnRzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIFttaXRocmlsXzEubSgnLmhzLWxlYWYnLCBtaXRocmlsXzEubS50cnVzdChjb21wb25lbnRzKSldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRzLm1hcCgoY29tcCkgPT4gKGNvbXAgaW5zdGFuY2VvZiBMYXlvdXQpID8gY29tcCA6IG1pdGhyaWxfMS5tKExheW91dCwgeyBjb250ZW50OiBjb21wIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2NvbXBvbmVudHNdO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMubm9ybWFsaXplQ29udGVudCh0aGlzLmdldENvbXBvbmVudHMobm9kZSkpO1xuICAgICAgICBsZXQgY3NzID0gTGF5b3V0ZXJfMS5MYXlvdXRlci5jcmVhdGVMYXlvdXQobm9kZS5hdHRycywgY29udGVudCk7XG4gICAgICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgICAgICAgc3R5bGU6IG5vZGUuc3R5bGUsXG4gICAgICAgICAgICByb3V0ZTogbm9kZS5hdHRycy5yb3V0ZSxcbiAgICAgICAgICAgIG9uY2xpY2s6IG5vZGUuYXR0cnMub25jbGlja1xuICAgICAgICB9O1xuICAgICAgICBub2RlLmF0dHJzLnJvdXRlID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAobm9kZS5hdHRycy5ocmVmKSB7XG4gICAgICAgICAgICBsb2cuZGVidWcoYGhyZWYgJHtub2RlLmF0dHJzLmhyZWZ9YCk7XG4gICAgICAgICAgICBhdHRycy5ocmVmID0gbm9kZS5hdHRycy5ocmVmO1xuICAgICAgICAgICAgYXR0cnMudGFyZ2V0ID0gYXR0cnMudGFyZ2V0IHx8ICdfYmxhbmsnO1xuICAgICAgICAgICAgYXR0cnMub25jcmVhdGUgPSBtaXRocmlsXzEubS5yb3V0ZS5saW5rO1xuICAgICAgICAgICAgYXR0cnMub251cGRhdGUgPSBtaXRocmlsXzEubS5yb3V0ZS5saW5rO1xuICAgICAgICAgICAgcmV0dXJuIG1pdGhyaWxfMS5tKGBhLmhzLWxheW91dCAke2Nzc30gJHt0aGlzLmdldENTUyhub2RlKX1gLCBhdHRycywgY29udGVudC5tYXAoKGMpID0+IGMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtaXRocmlsXzEubShgLmhzLWxheW91dCAke2Nzc30gJHt0aGlzLmdldENTUyhub2RlKX1gLCBhdHRycywgY29udGVudC5tYXAoKGMpID0+IGMpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuTGF5b3V0ID0gTGF5b3V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVEdGNWIzVjBMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwzWnBaWGN2VEdGNWIzVjBMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQmNVTkJMSGREUVVGelF6dEJRVU4wUXl4NVEwRkJjME03UVVGRGRFTXNiVU5CUVRoQ08wRkJRVU1zVFVGQlRTeEhRVUZITEVkQlFVY3NTVUZCU1N4WlFVRkhMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03UVVGcFF6ZEVMRTFCUVdFc1RVRkJUVHRKUVc5Q1RDeGhRVUZoTEVOQlFVTXNTVUZCVlR0UlFVTTVRaXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlF6TkVMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVzc1JVRkJSU3hGUVVGRk8yZENRVU0zUWl4SlFVRkpMRU5CUVVNc1EwRkJReXhUUVVGVExFVkJRVVU3YjBKQlEySXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNN2IwSkJRMnBETEU5QlFVOHNWMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhUUVVGVExFVkJRVVVzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMmxDUVVOc1F6dHhRa0ZCVFR0dlFrRkRTQ3hQUVVGUExFTkJRVU1zUTBGQlF6dHBRa0ZEV2p0WlFVTk1MRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMWdzUTBGQlF6dEpRVkZUTEUxQlFVMHNRMEZCUXl4SlFVRlZPMUZCUTNaQ0xFOUJRVThzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRWxCUVVrc1JVRkJSU3hEUVVGRE8wbEJRMmhETEVOQlFVTTdTVUZSVHl4blFrRkJaMElzUTBGQlF5eFZRVUUyUXp0UlFVTnNSU3hKUVVGSkxFOUJRVThzVlVGQlZTeExRVUZMTEZGQlFWRXNSVUZCUlR0WlFVTm9ReXhQUVVGUExFTkJRVU1zVjBGQlF5eERRVUZETEZWQlFWVXNSVUZCUlN4WFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTXZRenRSUVVORUxFbEJRVWtzVlVGQlZTeERRVUZETEUxQlFVMHNSMEZCUXl4RFFVRkRMRVZCUVVVN1dVRkRja0lzVDBGQlR5eFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJlVUlzUlVGQlVTeEZRVUZGTEVOQlEzUkVMRU5CUVVNc1NVRkJTU3haUVVGWkxFMUJRVTBzUTBGQlF5eERRVUZCTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExGZEJRVU1zUTBGQlF5eE5RVUZOTEVWQlFVVXNSVUZCUXl4UFFVRlBMRVZCUVVNc1NVRkJTU3hGUVVGRExFTkJRVU1zUTBGRE4wUXNRMEZCUXp0VFFVTk1PMUZCUlVRc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETzBsQlEzaENMRU5CUVVNN1NVRnhRa1FzU1VGQlNTeERRVUZETEVsQlFWVTdVVUZEV0N4TlFVRk5MRTlCUVU4c1IwRkJSeXhKUVVGSkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1NVRkJTU3hEUVVGRExHRkJRV0VzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTJoRkxFbEJRVWtzUjBGQlJ5eEhRVUZITEcxQ1FVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRja1FzVFVGQlRTeExRVUZMTEVkQlFVODdXVUZEWkN4TFFVRkxMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXM3V1VGRGFrSXNTMEZCU3l4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN6dFpRVU4yUWl4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTzFOQlF6bENMRU5CUVVNN1VVRkRSaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4VFFVRlRMRU5CUVVNN1VVRkROMElzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1JVRkJSVHRaUVVOcVFpeEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVRkRMRkZCUVZFc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRPMWxCUTNKRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU03V1VGRE4wSXNTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJSeXhMUVVGTExFTkJRVU1zVFVGQlRTeEpRVUZKTEZGQlFWRXNRMEZCUXp0WlFVTjRReXhMUVVGTExFTkJRVU1zVVVGQlVTeEhRVUZITEZkQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRE8xbEJRemxDTEV0QlFVc3NRMEZCUXl4UlFVRlJMRWRCUVVjc1YwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTTdXVUZGT1VJc1QwRkJUeXhYUVVGRExFTkJRVU1zWlVGQlpTeEhRVUZITEVsQlFVa3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlN5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xTkJRM3BHTzJGQlFVMDdXVUZEU0N4UFFVRlBMRmRCUVVNc1EwRkJReXhqUVVGakxFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFVkJRVVVzUzBGQlN5eEZRVUZGTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGTExFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1UwRkRlRVk3U1VGRFRDeERRVUZETzBOQlEwbzdRVUZ5UjBRc2QwSkJjVWRESW4wPSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgVG9rZW5zXzEgPSByZXF1aXJlKFwiLi9Ub2tlbnNcIik7XG5jbGFzcyBMYXlvdXRlciB7XG4gICAgY29uc3RydWN0b3IoYXJlYURlc2MpIHtcbiAgICAgICAgdGhpcy5hcmVhRGVzYyA9IGFyZWFEZXNjO1xuICAgICAgICB0aGlzLnNwYWNpbmcgPSAwO1xuICAgIH1cbiAgICBzdGF0aWMgdHJhbnNsYXRlKHBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcGFyYW1zLnB1c2goJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXMubWFwKChwYXJhbSkgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0uZW5kc1dpdGgoJ3B4JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRva2Vuc18xLnB4KHBhcnNlSW50KHBhcmFtKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJhbS5lbmRzV2l0aCgnJScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUb2tlbnNfMS5wYyhwYXJzZUludChwYXJhbSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGFyYW0udG9Mb3dlckNhc2UoKSA9PT0gJ2ZpbGwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUb2tlbnNfMS5GSUxMO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyByZWdpc3RlcihrZXl3b3JkLCBzdHlsZSkge1xuICAgICAgICBMYXlvdXRlci5sYXlvdXRTdHlsZXNba2V5d29yZF0gPSBzdHlsZTtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZUxheW91dChhdHRycywgY29tcG9uZW50cykge1xuICAgICAgICBsZXQgY3NzID0gJyc7XG4gICAgICAgIE9iamVjdC5rZXlzKExheW91dGVyLmxheW91dFN0eWxlcykuc29tZShrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKGF0dHJzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBjc3MgPSBuZXcgTGF5b3V0ZXIubGF5b3V0U3R5bGVzW2tleV0oTGF5b3V0ZXIudHJhbnNsYXRlKGF0dHJzW2tleV0pKS5nZXRTdHlsZXMoY29tcG9uZW50cyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY3NzO1xuICAgIH1cbn1cbmV4cG9ydHMuTGF5b3V0ZXIgPSBMYXlvdXRlcjtcbkxheW91dGVyLmxheW91dFN0eWxlcyA9IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVEdGNWIzVjBaWEl1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk5emNtTXZkbWxsZHk5TVlYbHZkWFJsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVmxCTEhGRFFVRjNRenRCUVhOQ2VFTXNUVUZCYzBJc1VVRkJVVHRKUVhsRk1VSXNXVUZCYlVJc1VVRkJjMEk3VVVGQmRFSXNZVUZCVVN4SFFVRlNMRkZCUVZFc1EwRkJZenRSUVZKNlF5eFpRVUZQTEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCVVdkRExFTkJRVU03U1VGNlJISkRMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zVFVGQmQwSTdVVUZETjBNc1NVRkJTU3hOUVVGTkxFTkJRVU1zVFVGQlRTeExRVUZMTEVOQlFVTXNSVUZCUlR0WlFVRkZMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTTdVMEZCUlR0UlFVTTNReXhQUVVGUExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4TFFVRm5RaXhGUVVGRkxFVkJRVVU3V1VGRGJrTXNTVUZCU1N4UFFVRlBMRXRCUVVzc1MwRkJTeXhSUVVGUkxFVkJRVVU3WjBKQlF6TkNMRWxCUVVrc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlR0dlFrRkJSU3hQUVVGUExGZEJRVVVzUTBGQlF5eFJRVUZSTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRwUWtGQlJUdG5Ra0ZEZWtRc1NVRkJTU3hMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZPMjlDUVVGRkxFOUJRVThzVjBGQlJTeERRVUZETEZGQlFWRXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRE8ybENRVUZGTzJkQ1FVTjRSQ3hKUVVGSkxFdEJRVXNzUTBGQlF5eFhRVUZYTEVWQlFVVXNTMEZCUnl4TlFVRk5MRVZCUVVVN2IwSkJRVVVzVDBGQlR5eGhRVUZKTEVOQlFVTTdhVUpCUVVNN1lVRkRjRVE3YVVKQlFVMDdaMEpCUTBnc1QwRkJUeXhMUVVGTExFTkJRVU03WVVGRGFFSTdVVUZEVEN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03U1VGWFRTeE5RVUZOTEVOQlFVTXNVVUZCVVN4RFFVRkRMRTlCUVdNc1JVRkJSU3hMUVVGeFFqdFJRVVY0UkN4UlFVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEV0QlFVc3NRMEZCUXp0SlFVTXpReXhEUVVGRE8wbEJWVTBzVFVGQlRTeERRVUZETEZsQlFWa3NRMEZCUXl4TFFVRlRMRVZCUVVVc1ZVRkJkVUk3VVVGRGVrUXNTVUZCU1N4SFFVRkhMRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJRMklzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZPMWxCUXpGRExFbEJRVWtzUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZPMmRDUVVOYUxFZEJRVWNzUjBGQlJ5eEpRVUZKTEZGQlFWRXNRMEZCUXl4WlFVRlpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zVVVGQlVTeERRVUZETEZOQlFWTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZOQlFWTXNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRuUWtGRk0wWXNUMEZCVHl4SlFVRkpMRU5CUVVNN1lVRkRaanRaUVVORUxFOUJRVThzUzBGQlN5eERRVUZETzFGQlEycENMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzVDBGQlR5eEhRVUZITEVOQlFVTTdTVUZEWml4RFFVRkRPenRCUVRsRVRDdzBRa0V3UmtNN1FVRnlSbFVzY1VKQlFWa3NSMEZCZFVJc1JVRkJSU3hEUVVGREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IExheW91dGVyXzEgPSByZXF1aXJlKFwiLi9MYXlvdXRlclwiKTtcbmNvbnN0IFRva2Vuc18xID0gcmVxdWlyZShcIi4vVG9rZW5zXCIpO1xuZXhwb3J0cy5QaWxsYXJMYXlvdXRzID0gW1xuICAgICdjb2x1bW5zJywgJ3Jvd3MnXG5dO1xuY29uc3QgY1BhcmFtcyA9IHtcbiAgICBjb2x1bW5zOiB7XG4gICAgICAgIGNzc0NsYXNzOiAnLmhzLWNvbHVtbi1sYXlvdXQnLFxuICAgICAgICBmaWVsZHM6IFsndG9wJywgJ2JvdHRvbScsICdsZWZ0JywgJ3JpZ2h0JywgJ2hlaWdodCcsICd3aWR0aCddXG4gICAgfSxcbiAgICByb3dzOiB7XG4gICAgICAgIGNzc0NsYXNzOiAnLmhzLXJvdy1sYXlvdXQnLFxuICAgICAgICBmaWVsZHM6IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJywgJ3dpZHRoJywgJ2hlaWdodCddXG4gICAgfVxufTtcbmNsYXNzIFBpbGxhckxheW91dGVyIGV4dGVuZHMgTGF5b3V0ZXJfMS5MYXlvdXRlciB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zLCBhcmVhRGVzYykge1xuICAgICAgICBzdXBlcihhcmVhRGVzYyk7XG4gICAgICAgIHRoaXMuYXJlYURlc2MgPSBhcmVhRGVzYztcbiAgICAgICAgdGhpcy5maWVsZHMgPSBwYXJhbXMuZmllbGRzO1xuICAgICAgICB0aGlzLmNzc0NsYXNzID0gcGFyYW1zLmNzc0NsYXNzO1xuICAgICAgICBsZXQgbiA9IGFyZWFEZXNjLmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCBmaXJzdCA9IDA7XG4gICAgICAgIGxldCBsYXN0ID0gMDtcbiAgICAgICAgdGhpcy51bml0ID0gYXJlYURlc2Muc29tZSgoYXJlYSkgPT4gKGFyZWEgaW5zdGFuY2VvZiBUb2tlbnNfMS5QaXhlbFRva2VuKSkgP1xuICAgICAgICAgICAgdGhpcy51bml0UGl4ZWwgOiB0aGlzLnVuaXRQZXJjZW50O1xuICAgICAgICBhcmVhRGVzYy5zb21lKChhcmVhLCBpKSA9PiAoKGFyZWFEZXNjW2ldIGluc3RhbmNlb2YgVG9rZW5zXzEuRGVmaW5lZFRva2VuKSA/ICsrZmlyc3QgPCAwIDogdHJ1ZSkpO1xuICAgICAgICBhcmVhRGVzYy5zb21lKChhcmVhLCBpKSA9PiAoKGFyZWFEZXNjW24gLSBpXSBpbnN0YW5jZW9mIFRva2Vuc18xLkRlZmluZWRUb2tlbikgPyArK2xhc3QgPCAwIDogdHJ1ZSkpO1xuICAgICAgICB0aGlzLmZpcnN0Rml4ZWQgPSBmaXJzdDtcbiAgICAgICAgdGhpcy5sYXN0Rml4ZWQgPSBNYXRoLm1pbihsYXN0LCBhcmVhRGVzYy5sZW5ndGggLSBmaXJzdCk7XG4gICAgfVxuICAgIGdldFNpemVzKG51bSkge1xuICAgICAgICBjb25zdCBmaXJzdCA9IHRoaXMuZmlyc3RGaXhlZDtcbiAgICAgICAgY29uc3QgbGFzdCA9IHRoaXMubGFzdEZpeGVkO1xuICAgICAgICBjb25zdCBkZXNjID0gdGhpcy5hcmVhRGVzYztcbiAgICAgICAgY29uc3QgbGVuID0gZGVzYy5sZW5ndGg7XG4gICAgICAgIHJldHVybiBbLi4uQXJyYXkobnVtKS5rZXlzKCldLm1hcCgoaSkgPT4ge1xuICAgICAgICAgICAgbGV0IHNpemUgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGkgPiBudW0gLSAxIC0gbGFzdCkge1xuICAgICAgICAgICAgICAgIHNpemUgPSBkZXNjW2xlbiAtIChudW0gLSBpKV0uZ2V0U2l6ZSgpO1xuICAgICAgICAgICAgICAgIHQgPSAnZW5kJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPCBmaXJzdCkge1xuICAgICAgICAgICAgICAgIHNpemUgPSBkZXNjW2ldLmdldFNpemUoKTtcbiAgICAgICAgICAgICAgICB0ID0gJ3N0YXJ0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGxlbiA+IDAgJiYgbGVuID09PSBmaXJzdCkge1xuICAgICAgICAgICAgICAgIHNpemUgPSBkZXNjW2xlbiAtIDFdLmdldFNpemUoKTtcbiAgICAgICAgICAgICAgICB0ID0gJ3N0YXJ0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHNpemU6IHNpemUsIGNvZGU6IHQsIGZpZWxkczoge30gfTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVuaXRQZXJjZW50KG51bSkge1xuICAgICAgICBsZXQgZiA9IHRoaXMuZmllbGRzO1xuICAgICAgICBsZXQgbWF4ID0gMTAwLjA7XG4gICAgICAgIGxldCBzdHlsZXMgPSB0aGlzLmdldFNpemVzKG51bSk7XG4gICAgICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHsgaWYgKHN0eWxlLnNpemUpIHtcbiAgICAgICAgICAgIG1heCA9IG1heCAtIHN0eWxlLnNpemU7XG4gICAgICAgICAgICBudW0tLTtcbiAgICAgICAgfSB9KTtcbiAgICAgICAgbGV0IGRlZkRpbSA9IG1heCAvIG51bTtcbiAgICAgICAgZnVuY3Rpb24gcGFzcyhzdHlsZXMsIGl4MCwgaXgxLCBicmVha0NvbmQpIHtcbiAgICAgICAgICAgIGxldCBzdW1EaW0gPSAwO1xuICAgICAgICAgICAgc3R5bGVzLnNvbWUoc3R5bGUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzaXplID0gc3R5bGUuc2l6ZSB8fCBkZWZEaW07XG4gICAgICAgICAgICAgICAgaWYgKGJyZWFrQ29uZChzdHlsZS5jb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2l4MF0gPSBzdW1EaW0gKyAnJSc7XG4gICAgICAgICAgICAgICAgc3VtRGltICs9IHNpemU7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2l4MV0gPSAoMTAwIC0gc3VtRGltKSArICclJztcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZls1XV0gPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcGFzcyhzdHlsZXMsIGZbMl0sIGZbM10sIChlKSA9PiBlID09PSAnZW5kJyk7XG4gICAgICAgIHBhc3Moc3R5bGVzLnJldmVyc2UoKSwgZlszXSwgZlsyXSwgKGUpID0+IGUgIT09ICdlbmQnKTtcbiAgICAgICAgcmV0dXJuIHN0eWxlcy5yZXZlcnNlKCk7XG4gICAgfVxuICAgIHVuaXRQaXhlbChudW0pIHtcbiAgICAgICAgbGV0IHN0eWxlcyA9IHRoaXMuZ2V0U2l6ZXMobnVtKTtcbiAgICAgICAgbGV0IGYgPSB0aGlzLmZpZWxkcztcbiAgICAgICAgbGV0IGRlZkRpbSA9IDEwMC4wIC8gbnVtO1xuICAgICAgICBsZXQgc3VtRGltID0gMDtcbiAgICAgICAgc3R5bGVzLnNvbWUoKHN0eWxlLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3R5bGUuY29kZSA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzJdXSA9IHN1bURpbSArICdweCc7XG4gICAgICAgICAgICAgICAgc3VtRGltICs9IHN0eWxlLnNpemUgKyAodGhpcy5zcGFjaW5nIHx8IDApICsgKHRoaXMuc3BhY2luZyB8fCAwKTtcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZlszXV0gPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbNV1dID0gc3R5bGUuc2l6ZSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdHlsZS5jb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbMl1dID0gKHN1bURpbSA+IDApID8gKHN1bURpbSArICdweCcpIDogKGkgKiBkZWZEaW0gKyAnJScpO1xuICAgICAgICAgICAgICAgIHN1bURpbSA9IC0xO1xuICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzNdXSA9ICgxMDAgLSAoaSArIDEpICogZGVmRGltKSArICclJztcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZls1XV0gPSAnYXV0byc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdHlsZS5jb2RlID09PSAnZW5kJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VtRGltID0gMDtcbiAgICAgICAgc3R5bGVzLnNsaWNlKCkucmV2ZXJzZSgpLnNvbWUoKHN0eWxlLCBpKSA9PiB7XG4gICAgICAgICAgICBzdHlsZS5maWVsZHNbZlszXV0gPSBzdW1EaW0gKyAncHgnO1xuICAgICAgICAgICAgaWYgKHN0eWxlLmNvZGUgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgc3VtRGltICs9IHN0eWxlLnNpemUgKyAodGhpcy5zcGFjaW5nIHx8IDApICsgKHRoaXMuc3BhY2luZyB8fCAwKTtcbiAgICAgICAgICAgICAgICBzdHlsZS5maWVsZHNbZlsyXV0gPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgc3R5bGUuZmllbGRzW2ZbNV1dID0gc3R5bGUuc2l6ZSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc3VtRGltID4gMCAmJiBzdHlsZS5jb2RlICE9PSAnc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLmZpZWxkc1tmWzVdXSA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH1cbiAgICBnZXRTdHlsZXMoY29tcG9uZW50cykge1xuICAgICAgICBsZXQgZiA9IHRoaXMuZmllbGRzO1xuICAgICAgICBsZXQgc3R5bGVzID0gdGhpcy51bml0KGNvbXBvbmVudHMubGVuZ3RoKTtcbiAgICAgICAgY29tcG9uZW50cy5tYXAoKGMsIGkpID0+IHtcbiAgICAgICAgICAgIGMuc3R5bGUgPSBgJHtmWzRdfToxMDAlO2A7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzdHlsZXNbaV0uZmllbGRzKS5mb3JFYWNoKChzdCkgPT4geyBjLnN0eWxlICs9IGAke3N0fTogJHtzdHlsZXNbaV0uZmllbGRzW3N0XX07YDsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5jc3NDbGFzcztcbiAgICB9XG59XG5jbGFzcyBDb2x1bW5zIGV4dGVuZHMgUGlsbGFyTGF5b3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZWFEZXNjKSB7XG4gICAgICAgIHN1cGVyKGNQYXJhbXNbZXhwb3J0cy5QaWxsYXJMYXlvdXRzWzBdXSwgYXJlYURlc2MpO1xuICAgICAgICB0aGlzLmFyZWFEZXNjID0gYXJlYURlc2M7XG4gICAgfVxufVxuY2xhc3MgUm93cyBleHRlbmRzIFBpbGxhckxheW91dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihhcmVhRGVzYykge1xuICAgICAgICBzdXBlcihjUGFyYW1zW2V4cG9ydHMuUGlsbGFyTGF5b3V0c1sxXV0sIGFyZWFEZXNjKTtcbiAgICAgICAgdGhpcy5hcmVhRGVzYyA9IGFyZWFEZXNjO1xuICAgIH1cbn1cbkxheW91dGVyXzEuTGF5b3V0ZXIucmVnaXN0ZXIoZXhwb3J0cy5QaWxsYXJMYXlvdXRzWzBdLCBDb2x1bW5zKTtcbkxheW91dGVyXzEuTGF5b3V0ZXIucmVnaXN0ZXIoZXhwb3J0cy5QaWxsYXJMYXlvdXRzWzFdLCBSb3dzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVVHbHNiR0Z5WldSTVlYbHZkWFJsY2k1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUwzTnlZeTkyYVdWM0wxQnBiR3hoY21Wa1RHRjViM1YwWlhJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUV5UTBFc2VVTkJRVEJETzBGQlF6RkRMSEZEUVVWM1F6dEJRV2RDTTBJc1VVRkJRU3hoUVVGaExFZEJRVWM3U1VGRGVrSXNVMEZCVXl4RlFVRkZMRTFCUVUwN1EwRkRjRUlzUTBGQlF6dEJRVXRHTEUxQlFVMHNUMEZCVHl4SFFVRkhPMGxCUTFvc1QwRkJUeXhGUVVGblFqdFJRVU51UWl4UlFVRlJMRVZCUVVVc2JVSkJRVzFDTzFGQlF6ZENMRTFCUVUwc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeFJRVUZSTEVWQlFVVXNUVUZCVFN4RlFVRkZMRTlCUVU4c1JVRkJSU3hSUVVGUkxFVkJRVVVzVDBGQlR5eERRVUZETzB0QlEyaEZPMGxCUTBRc1NVRkJTU3hGUVVGblFqdFJRVU5vUWl4UlFVRlJMRVZCUVVVc1owSkJRV2RDTzFGQlF6RkNMRTFCUVUwc1JVRkJSU3hEUVVGRExFMUJRVTBzUlVGQlJTeFBRVUZQTEVWQlFVVXNTMEZCU3l4RlFVRkZMRkZCUVZFc1JVRkJSU3hQUVVGUExFVkJRVVVzVVVGQlVTeERRVUZETzB0QlEyaEZPME5CUTBvc1EwRkJRenRCUVU5R0xFMUJRV1VzWTBGQlpTeFRRVUZSTEcxQ1FVRlJPMGxCWVRGRExGbEJRVmtzVFVGQmJVSXNSVUZCVXl4UlFVRnpRanRSUVVNeFJDeExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkViMElzWVVGQlVTeEhRVUZTTEZGQlFWRXNRMEZCWXp0UlFVVXhSQ3hKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNN1VVRkROVUlzU1VGQlNTeERRVUZETEZGQlFWRXNSMEZCUnl4TlFVRk5MRU5CUVVNc1VVRkJVU3hEUVVGRE8xRkJSV2hETEVsQlFVa3NRMEZCUXl4SFFVRkhMRkZCUVZFc1EwRkJReXhOUVVGTkxFZEJRVU1zUTBGQlF5eERRVUZETzFGQlF6RkNMRWxCUVVrc1MwRkJTeXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU5rTEVsQlFVa3NTVUZCU1N4SFFVRkpMRU5CUVVNc1EwRkJRenRSUVVWa0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVkQlFVY3NVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFbEJRV2RDTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNc1NVRkJTU3haUVVGWkxHMUNRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkJMRU5CUVVNN1dVRkRNVVVzU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF6dFJRVWQwUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlowSXNSVUZCUlN4RFFVRlJMRVZCUVVVc1JVRkJSU3hEUVVONlF5eERRVUZETEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJReXhaUVVGakxIRkNRVUZaTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1JVRkJSU3hMUVVGTExFZEJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJSMnBGTEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGblFpeEZRVUZGTEVOQlFWRXNSVUZCUlN4RlFVRkZMRU5CUTNwRExFTkJRVU1zUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4SFFVRkRMRU5CUVVNc1EwRkJReXhaUVVGWkxIRkNRVUZaTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFZEJRVU1zUTBGQlF5eERRVUZGTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJSV3BGTEVsQlFVa3NRMEZCUXl4VlFVRlZMRWRCUVVjc1MwRkJTeXhEUVVGRE8xRkJRM2hDTEVsQlFVa3NRMEZCUXl4VFFVRlRMRWRCUVVrc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RFFVRkRMRTFCUVUwc1IwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEpRVU0xUkN4RFFVRkRPMGxCVTA4c1VVRkJVU3hEUVVGRExFZEJRVlU3VVVGRGRrSXNUVUZCVFN4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU01UWl4TlFVRk5MRWxCUVVrc1IwRkJTU3hKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETzFGQlF6ZENMRTFCUVUwc1NVRkJTU3hIUVVGSkxFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTTdVVUZETlVJc1RVRkJUU3hIUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXp0UlFVVjRRaXhQUVVGUExFTkJRVU1zUjBGQlJ5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRlJMRVZCUVVVc1JVRkJSVHRaUVVNelF5eEpRVUZKTEVsQlFVa3NSMEZCVlN4SlFVRkpMRU5CUVVNN1dVRkRka0lzU1VGQlNTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRPMWxCUTJJc1NVRkJTU3hEUVVGRExFZEJRVWNzUjBGQlJ5eEhRVUZETEVOQlFVTXNSMEZCUXl4SlFVRkpMRVZCUVVjN1owSkJRVVVzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4SFFVRkhMRWRCUVVjc1EwRkJReXhIUVVGSExFZEJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRVZCUVVVc1EwRkJRenRuUWtGQlF5eERRVUZETEVkQlFVY3NTMEZCU3l4RFFVRkRPMkZCUVVVN2FVSkJRM0JGTEVsQlFVa3NRMEZCUXl4SFFVRkhMRXRCUVVzc1JVRkJSenRuUWtGQlJTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFOUJRVThzUlVGQlJTeERRVUZETzJkQ1FVRkRMRU5CUVVNc1IwRkJSeXhQUVVGUExFTkJRVU03WVVGQlJUdHBRa0ZETVVRc1NVRkJTU3hIUVVGSExFZEJRVU1zUTBGQlF5eEpRVUZKTEVkQlFVY3NTMEZCUnl4TFFVRkxMRVZCUVVNN1owSkJRVVVzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4SFFVRkhMRWRCUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdaMEpCUVVNc1EwRkJReXhIUVVGSExFOUJRVThzUTBGQlF6dGhRVUZGTzFsQlF6VkZMRTlCUVU4c1JVRkJReXhKUVVGSkxFVkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NSVUZCUXl4RFFVRkRMRVZCUVVVc1RVRkJUU3hGUVVGRExFVkJRVVVzUlVGQlF5eERRVUZETzFGQlF6RkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF6dEpRVVZQTEZkQlFWY3NRMEZCUXl4SFFVRlZPMUZCUXpGQ0xFbEJRVWtzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNN1VVRkRjRUlzU1VGQlNTeEhRVUZITEVkQlFVY3NTMEZCU3l4RFFVRkRPMUZCUTJoQ0xFbEJRVWtzVFVGQlRTeEhRVUZuUWl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFGQlJUZERMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVVXNSMEZCUnl4SlFVRkpMRXRCUVVzc1EwRkJReXhKUVVGSkxFVkJRVVU3V1VGQlJTeEhRVUZITEVkQlFVY3NSMEZCUnl4SFFVRkhMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU03V1VGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXp0VFFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGFFWXNTVUZCU1N4TlFVRk5MRWRCUVVjc1IwRkJSeXhIUVVGSExFZEJRVWNzUTBGQlF6dFJRVVYyUWl4VFFVRlRMRWxCUVVrc1EwRkJReXhOUVVGdFFpeEZRVUZGTEVkQlFWVXNSVUZCUlN4SFFVRlZMRVZCUVVVc1UwRkJaME03V1VGRGRrWXNTVUZCU1N4TlFVRk5MRWRCUVVjc1EwRkJReXhEUVVGRE8xbEJRMllzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1JVRkJSVHRuUWtGRGFFSXNTVUZCU1N4SlFVRkpMRWRCUVVjc1MwRkJTeXhEUVVGRExFbEJRVWtzU1VGQlNTeE5RVUZOTEVOQlFVTTdaMEpCUTJoRExFbEJRVWtzVTBGQlV5eERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSVHR2UWtGQlJTeFBRVUZQTEVsQlFVa3NRMEZCUXp0cFFrRkJSVHRuUWtGRE0wTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eE5RVUZOTEVkQlFVTXNSMEZCUnl4RFFVRkRPMmRDUVVNdlFpeE5RVUZOTEVsQlFVa3NTVUZCU1N4RFFVRkRPMmRDUVVObUxFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFZEJRVU1zVFVGQlRTeERRVUZETEVkQlFVTXNSMEZCUnl4RFFVRkRPMmRDUVVOeVF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEUxQlFVMHNRMEZCUXp0blFrRkROVUlzVDBGQlR5eExRVUZMTEVOQlFVTTdXVUZEYWtJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFVDeERRVUZETzFGQlJVUXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlVTeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRXRCUVVjc1MwRkJTeXhEUVVGRExFTkJRVU03VVVGRGJFUXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCVVN4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVWNzUzBGQlN5eERRVUZETEVOQlFVTTdVVUZETlVRc1QwRkJUeXhOUVVGTkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdTVUZETlVJc1EwRkJRenRKUVVWUExGTkJRVk1zUTBGQlF5eEhRVUZWTzFGQlEzaENMRWxCUVVrc1RVRkJUU3hIUVVGblFpeEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJRemRETEVsQlFVa3NRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU03VVVGRmNFSXNTVUZCU1N4TlFVRk5MRWRCUVVjc1MwRkJTeXhIUVVGRExFZEJRVWNzUTBGQlF6dFJRVWQyUWl4SlFVRkpMRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVU03VVVGRFppeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1MwRkJTeXhGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTzFsQlEzSkNMRWxCUVVrc1MwRkJTeXhEUVVGRExFbEJRVWtzUzBGQlJ5eFBRVUZQTEVWQlFVVTdaMEpCUTNSQ0xFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzVFVGQlRTeEhRVUZGTEVsQlFVa3NRMEZCUXp0blFrRkRiRU1zVFVGQlRTeEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRha1VzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTTdaMEpCUXpWQ0xFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUzBGQlN5eERRVUZETEVsQlFVa3NSMEZCUlN4SlFVRkpMRU5CUVVNN1lVRkRla003YVVKQlFVMHNTVUZCU1N4TFFVRkxMRU5CUVVNc1NVRkJTU3hMUVVGTExFbEJRVWtzUlVGQlJUdG5Ra0ZETlVJc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFMUJRVTBzUjBGQlF5eERRVUZETEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1EwRkJReXhOUVVGTkxFZEJRVVVzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGRExFMUJRVTBzUjBGQlJ5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRia1VzVFVGQlRTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOYUxFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVkQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVNc1EwRkJReXhEUVVGRExFZEJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NSMEZCUnl4RFFVRkRPMmRDUVVNNVF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEUxQlFVMHNRMEZCUXp0aFFVTXZRanRwUWtGQlRTeEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRXRCUVVjc1MwRkJTeXhGUVVGRk8yZENRVU16UWl4UFFVRlBMRWxCUVVrc1EwRkJRenRoUVVObU8xbEJRMFFzVDBGQlR5eExRVUZMTEVOQlFVTTdVVUZEYWtJc1EwRkJReXhEUVVGRExFTkJRVU03VVVGSFNDeE5RVUZOTEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUTFnc1RVRkJUU3hEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEVWQlFVVXNSVUZCUlR0WlFVTjJReXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTTdXVUZEYmtNc1NVRkJTU3hMUVVGTExFTkJRVU1zU1VGQlNTeExRVUZMTEV0QlFVc3NSVUZCUlR0blFrRkRkRUlzVFVGQlRTeEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0blFrRkRha1VzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTTdaMEpCUXpWQ0xFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUzBGQlN5eERRVUZETEVsQlFVa3NSMEZCUXl4SlFVRkpMRU5CUVVNN1lVRkRlRU03YVVKQlFVMDdaMEpCUTBnc1NVRkJTU3hOUVVGTkxFZEJRVU1zUTBGQlF5eEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRXRCUVVzc1QwRkJUeXhGUVVGRk8yOUNRVU53UXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJRenRwUWtGREwwSTdaMEpCUTBRc1QwRkJUeXhKUVVGSkxFTkJRVU03WVVGRFpqdFpRVU5FTEU5QlFVOHNTMEZCU3l4RFFVRkRPMUZCUTJwQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NUMEZCVHl4TlFVRk5MRU5CUVVNN1NVRkRiRUlzUTBGQlF6dEpRVkZUTEZOQlFWTXNRMEZCUXl4VlFVRTRRanRSUVVNNVF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRE8xRkJRM0JDTEVsQlFVa3NUVUZCVFN4SFFVRm5RaXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRSUVVOMlJDeFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJZeXhGUVVGRkxFTkJRVkVzUlVGQlJTeEZRVUZGTzFsQlJYaERMRU5CUVVNc1EwRkJReXhMUVVGTExFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRkZCUVZFc1EwRkJRenRaUVVNeFFpeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJReXhGUVVGVExFVkJRVVVzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXl4TFFVRkxMRWxCUVVrc1IwRkJSeXhGUVVGRkxFdEJRVXNzVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkROVWNzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU0N4UFFVRlBMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU03U1VGRGVrSXNRMEZCUXp0RFFVTktPMEZCTWtSRUxFMUJRVTBzVDBGQlVTeFRRVUZSTEdOQlFXTTdTVUZEYUVNc1dVRkJiVUlzVVVGQmMwSTdVVUZCU1N4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRExIRkNRVUZoTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hSUVVGUkxFTkJRVU1zUTBGQlF6dFJRVUZ5UlN4aFFVRlJMRWRCUVZJc1VVRkJVU3hEUVVGak8wbEJRV2xFTEVOQlFVTTdRMEZET1VZN1FVRXlSRVFzVFVGQlRTeEpRVUZMTEZOQlFWRXNZMEZCWXp0SlFVTTNRaXhaUVVGdFFpeFJRVUZ6UWp0UlFVRkpMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zY1VKQlFXRXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxGRkJRVkVzUTBGQlF5eERRVUZETzFGQlFYSkZMR0ZCUVZFc1IwRkJVaXhSUVVGUkxFTkJRV003U1VGQmFVUXNRMEZCUXp0RFFVTTVSanRCUVVWRUxHMUNRVUZSTEVOQlFVTXNVVUZCVVN4RFFVRkRMSEZDUVVGaExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNN1FVRkROME1zYlVKQlFWRXNRMEZCUXl4UlFVRlJMRU5CUVVNc2NVSkJRV0VzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCU3l4SlFVRkpMRU5CUVVNc1EwRkJReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBMYXlvdXRlcl8xID0gcmVxdWlyZShcIi4vTGF5b3V0ZXJcIik7XG5jb25zdCBUb2tlbnNfMSA9IHJlcXVpcmUoXCIuL1Rva2Vuc1wiKTtcbmNsYXNzIFRpbGVMYXlvdXRlciBleHRlbmRzIExheW91dGVyXzEuTGF5b3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZWFEZXNjKSB7XG4gICAgICAgIHN1cGVyKGFyZWFEZXNjKTtcbiAgICAgICAgdGhpcy5hcmVhRGVzYyA9IGFyZWFEZXNjO1xuICAgICAgICB0aGlzLnVuaXQgPSBhcmVhRGVzYy5zb21lKChhcmVhKSA9PiAoYXJlYSBpbnN0YW5jZW9mIFRva2Vuc18xLlBpeGVsVG9rZW4pKSA/XG4gICAgICAgICAgICB0aGlzLnVuaXRQaXhlbCA6IHRoaXMudW5pdFBlcmNlbnQ7XG4gICAgfVxuICAgIHVuaXRQZXJjZW50KG51bSkge1xuICAgICAgICBjb25zdCBkZXNjID0gdGhpcy5hcmVhRGVzYztcbiAgICAgICAgY29uc3QgZmlsbCA9IHRoaXMuYXJlYURlc2Muc29tZShhID0+IChhIGluc3RhbmNlb2YgVG9rZW5zXzEuRmlsbFRva2VuKSk7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBNYXRoLnNxcnQobnVtKTtcbiAgICAgICAgY29uc3Qgcm93cyA9IE1hdGgucm91bmQocm9vdCk7XG4gICAgICAgIGxldCBjb2xzID0gTWF0aC5mbG9vcihyb290KTtcbiAgICAgICAgaWYgKHJvb3QgPiBjb2xzKSB7XG4gICAgICAgICAgICBjb2xzKys7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdpZHRoID0gKGRlc2NbMF0gaW5zdGFuY2VvZiBUb2tlbnNfMS5EZWZpbmVkVG9rZW4pID8gZGVzY1swXS5nZXRTaXplKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBoZWlnaHQgPSAoZGVzY1sxXSBpbnN0YW5jZW9mIFRva2Vuc18xLkRlZmluZWRUb2tlbikgPyBkZXNjWzFdLmdldFNpemUoKSA6IHdpZHRoO1xuICAgICAgICB3aWR0aCA9IHdpZHRoIHx8IDEwMCAvIGNvbHM7XG4gICAgICAgIGhlaWdodCA9IGhlaWdodCB8fCAxMDAgLyByb3dzO1xuICAgICAgICBsZXQgbGVmdCA9IDA7XG4gICAgICAgIGxldCB0b3AgPSAwO1xuICAgICAgICBsZXQgc3R5bGVzID0gWy4uLkFycmF5KG51bSkua2V5cygpXS5tYXAoaSA9PiB7XG4gICAgICAgICAgICBsZXQgciA9ICdhdXRvJztcbiAgICAgICAgICAgIGxldCB3ID0gd2lkdGggKyAnJSc7XG4gICAgICAgICAgICBsZXQgYiA9ICdhdXRvJztcbiAgICAgICAgICAgIGxldCBoID0gaGVpZ2h0ICsgJyUnO1xuICAgICAgICAgICAgaWYgKChsZWZ0ICsgMiAqIHdpZHRoKSA+IDEwMCAmJiBmaWxsKSB7XG4gICAgICAgICAgICAgICAgciA9ICcwJSc7XG4gICAgICAgICAgICAgICAgdyA9ICdhdXRvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodG9wICsgMiAqIGhlaWdodCkgPiAxMDAgJiYgZmlsbCkge1xuICAgICAgICAgICAgICAgIGIgPSAnMCUnO1xuICAgICAgICAgICAgICAgIGggPSAnYXV0byc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGBcbiAgICAgICAgICAgICAgICB0b3A6ICR7TWF0aC5mbG9vcih0b3ApfSU7IGJvdHRvbToke2J9O1xuICAgICAgICAgICAgICAgIGxlZnQ6ICR7bGVmdH0lOyAgICAgICAgICAgcmlnaHQ6JHtyfTtcbiAgICAgICAgICAgICAgICB3aWR0aDogJHt3fTsgICAgICAgICAgICAgIGhlaWdodDogJHtofTtcbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICBpZiAoTWF0aC5yb3VuZChsZWZ0ICs9IHdpZHRoKSA+IDEwMCAtIE1hdGguZmxvb3Iod2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgdG9wICs9IGhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICAgIHVuaXRQaXhlbChudW0pIHtcbiAgICAgICAgY29uc3QgZGVzYyA9IHRoaXMuYXJlYURlc2M7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBNYXRoLnNxcnQobnVtKTtcbiAgICAgICAgY29uc3Qgcm93cyA9IE1hdGgucm91bmQocm9vdCk7XG4gICAgICAgIGxldCBjb2xzID0gTWF0aC5mbG9vcihyb290KTtcbiAgICAgICAgaWYgKHJvb3QgPiBjb2xzKSB7XG4gICAgICAgICAgICBjb2xzKys7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdpZHRoID0gKGRlc2NbMF0gaW5zdGFuY2VvZiBUb2tlbnNfMS5EZWZpbmVkVG9rZW4pID8gZGVzY1swXS5nZXRTaXplKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBoZWlnaHQgPSAoZGVzY1sxXSBpbnN0YW5jZW9mIFRva2Vuc18xLkRlZmluZWRUb2tlbikgPyBkZXNjWzFdLmdldFNpemUoKSA6IHdpZHRoO1xuICAgICAgICB3aWR0aCA9IHdpZHRoIHx8IDEwMCAvIGNvbHM7XG4gICAgICAgIGhlaWdodCA9IGhlaWdodCB8fCAxMDAgLyByb3dzO1xuICAgICAgICBsZXQgbGVmdCA9IDA7XG4gICAgICAgIGxldCB0b3AgPSAwO1xuICAgICAgICBsZXQgc3R5bGVzID0gWy4uLkFycmF5KG51bSkua2V5cygpXS5tYXAoaSA9PiB7XG4gICAgICAgICAgICBsZXQgciA9ICdhdXRvJztcbiAgICAgICAgICAgIGxldCB3ID0gd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgbGV0IGIgPSAnYXV0byc7XG4gICAgICAgICAgICBsZXQgaCA9IGhlaWdodCArICdweCc7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGBcbiAgICAgICAgICAgICAgICB0b3A6ICR7TWF0aC5mbG9vcih0b3ApfSU7IGJvdHRvbToke2J9O1xuICAgICAgICAgICAgICAgIGxlZnQ6ICR7bGVmdH0lOyAgICAgICAgICAgcmlnaHQ6JHtyfTtcbiAgICAgICAgICAgICAgICB3aWR0aDogJHt3fTsgICAgICAgICAgICAgIGhlaWdodDogJHtofTtcbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgICBpZiAoTWF0aC5yb3VuZChsZWZ0ICs9IHdpZHRoKSA+IDEwMCAtIE1hdGguZmxvb3Iod2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgdG9wICs9IGhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICAgIGdldFN0eWxlcyhjb21wb25lbnRzKSB7XG4gICAgICAgIGxldCBzdHlsZXMgPSB0aGlzLnVuaXQoY29tcG9uZW50cy5sZW5ndGgpO1xuICAgICAgICBjb21wb25lbnRzLm1hcCgoYywgaSkgPT4ge1xuICAgICAgICAgICAgYy5zdHlsZSA9IHN0eWxlc1tpXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAnLmhzLXRpbGUtbGF5b3V0JztcbiAgICB9XG59XG5MYXlvdXRlcl8xLkxheW91dGVyLnJlZ2lzdGVyKCd0aWxlcycsIFRpbGVMYXlvdXRlcik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWR2xzWlV4aGVXOTFkR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dmMzSmpMM1pwWlhjdlZHbHNaVXhoZVc5MWRHVnlMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQk9FUkJMSGxEUVVFd1F6dEJRVU14UXl4eFEwRkhkME03UVVGUGVFTXNUVUZCVFN4WlFVRmhMRk5CUVZFc2JVSkJRVkU3U1VGUkwwSXNXVUZCYlVJc1VVRkJjMEk3VVVGRGNrTXNTMEZCU3l4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8xRkJSRVFzWVVGQlVTeEhRVUZTTEZGQlFWRXNRMEZCWXp0UlFVbHlReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEhRVUZITEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGblFpeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1dVRkJXU3h0UWtGQlZTeERRVUZETEVOQlFVTXNRMEZCUVN4RFFVRkRPMWxCUXpGRkxFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU03U1VGRE1VTXNRMEZCUXp0SlFVVlBMRmRCUVZjc1EwRkJReXhIUVVGVk8xRkJRekZDTEUxQlFVMHNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU03VVVGRE0wSXNUVUZCVFN4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zV1VGQldTeHJRa0ZCVXl4RFFVRkRMRU5CUVVNc1EwRkJRenRSUVVNdlJDeE5RVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFGQlF6VkNMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRPVUlzU1VGQlRTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU01UWl4SlFVRkpMRWxCUVVrc1IwRkJSeXhKUVVGSkxFVkJRVVU3V1VGQlJTeEpRVUZKTEVWQlFVVXNRMEZCUXp0VFFVRkZPMUZCUXpWQ0xFbEJRVWtzUzBGQlN5eEhRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhaUVVGWkxIRkNRVUZaTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhUUVVGVExFTkJRVU03VVVGRE9VVXNTVUZCU1N4TlFVRk5MRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEZsQlFWa3NjVUpCUVZrc1EwRkJReXhEUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXp0UlFVVXhSU3hMUVVGTExFZEJRVWtzUzBGQlN5eEpRVUZMTEVkQlFVY3NSMEZCUXl4SlFVRkpMRU5CUVVNN1VVRkROVUlzVFVGQlRTeEhRVUZITEUxQlFVMHNTVUZCU1N4SFFVRkhMRWRCUVVNc1NVRkJTU3hEUVVGRE8xRkJRelZDTEVsQlFVa3NTVUZCU1N4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVOaUxFbEJRVWtzUjBGQlJ5eEhRVUZKTEVOQlFVTXNRMEZCUXp0UlFVVmlMRWxCUVVrc1RVRkJUU3hIUVVGSExFTkJRVU1zUjBGQlJ5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVN1dVRkRlRU1zU1VGQlNTeERRVUZETEVkQlFVY3NUVUZCVFN4RFFVRkRPMWxCUVVrc1NVRkJTU3hEUVVGRExFZEJRVWNzUzBGQlN5eEhRVUZETEVkQlFVY3NRMEZCUXp0WlFVTnlReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTTdXVUZCU1N4SlFVRkpMRU5CUVVNc1IwRkJSeXhOUVVGTkxFZEJRVU1zUjBGQlJ5eERRVUZETzFsQlEzUkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzUTBGQlF5eEhRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRWRCUVVjc1NVRkJTU3hKUVVGSkxFVkJRVVU3WjBKQlFVVXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJRenRuUWtGQlF5eERRVUZETEVkQlFVY3NUVUZCVFN4RFFVRkRPMkZCUVVVN1dVRkROMFFzU1VGQlNTeERRVUZETEVkQlFVY3NSMEZCUnl4RFFVRkRMRWRCUVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzUjBGQlJ5eEpRVUZKTEVsQlFVa3NSVUZCUlR0blFrRkJSU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETzJkQ1FVRkRMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU03WVVGQlJUdFpRVU0zUkN4TlFVRk5MRXRCUVVzc1IwRkJSenQxUWtGRFNDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhoUVVGaExFTkJRVU03ZDBKQlF6VkNMRWxCUVVrc2MwSkJRWE5DTEVOQlFVTTdlVUpCUXpGQ0xFTkJRVU1zTUVKQlFUQkNMRU5CUVVNN1lVRkRlRU1zUTBGQlF6dFpRVU5HTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFbEJRVWtzUzBGQlN5eERRVUZETEVkQlFVY3NSMEZCUnl4SFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVWQlFVVTdaMEpCUVVVc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZCUXl4SFFVRkhMRWxCUVVrc1RVRkJUU3hEUVVGRE8yRkJRVVU3V1VGRGJrWXNUMEZCVHl4TFFVRkxMRU5CUVVNN1VVRkRhRUlzUTBGQlF5eERRVUZETEVOQlFVTTdVVUZEU2l4UFFVRlBMRTFCUVUwc1EwRkJRenRKUVVOc1FpeERRVUZETzBsQlJVOHNVMEZCVXl4RFFVRkRMRWRCUVZVN1VVRkRlRUlzVFVGQlRTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJRenRSUVVVelFpeE5RVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFGQlF6VkNMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRPVUlzU1VGQlRTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU01UWl4SlFVRkpMRWxCUVVrc1IwRkJSeXhKUVVGSkxFVkJRVVU3V1VGQlJTeEpRVUZKTEVWQlFVVXNRMEZCUXp0VFFVRkZPMUZCUXpWQ0xFbEJRVWtzUzBGQlN5eEhRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhaUVVGWkxIRkNRVUZaTEVOQlFVTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhUUVVGVExFTkJRVU03VVVGRE9VVXNTVUZCU1N4TlFVRk5MRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEZsQlFWa3NjVUpCUVZrc1EwRkJReXhEUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXp0UlFVVXhSU3hMUVVGTExFZEJRVWtzUzBGQlN5eEpRVUZMTEVkQlFVY3NSMEZCUXl4SlFVRkpMRU5CUVVNN1VVRkROVUlzVFVGQlRTeEhRVUZITEUxQlFVMHNTVUZCU1N4SFFVRkhMRWRCUVVNc1NVRkJTU3hEUVVGRE8xRkJRelZDTEVsQlFVa3NTVUZCU1N4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVOaUxFbEJRVWtzUjBGQlJ5eEhRVUZKTEVOQlFVTXNRMEZCUXp0UlFVVmlMRWxCUVVrc1RVRkJUU3hIUVVGSExFTkJRVU1zUjBGQlJ5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVN1dVRkRlRU1zU1VGQlNTeERRVUZETEVkQlFVY3NUVUZCVFN4RFFVRkRPMWxCUVVrc1NVRkJTU3hEUVVGRExFZEJRVWNzUzBGQlN5eEhRVUZETEVsQlFVa3NRMEZCUXp0WlFVTjBReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTTdXVUZCU1N4SlFVRkpMRU5CUVVNc1IwRkJSeXhOUVVGTkxFZEJRVU1zU1VGQlNTeERRVUZETzFsQlEzWkRMRTFCUVUwc1MwRkJTeXhIUVVGSE8zVkNRVU5JTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExHRkJRV0VzUTBGQlF6dDNRa0ZETlVJc1NVRkJTU3h6UWtGQmMwSXNRMEZCUXp0NVFrRkRNVUlzUTBGQlF5d3dRa0ZCTUVJc1EwRkJRenRoUVVONFF5eERRVUZETzFsQlEwWXNTVUZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzU1VGQlNTeExRVUZMTEVOQlFVTXNSMEZCUnl4SFFVRkhMRWRCUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSVUZCUlR0blFrRkJSU3hKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETzJkQ1FVRkRMRWRCUVVjc1NVRkJTU3hOUVVGTkxFTkJRVU03WVVGQlJUdFpRVU51Uml4UFFVRlBMRXRCUVVzc1EwRkJRenRSUVVOb1FpeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTktMRTlCUVU4c1RVRkJUU3hEUVVGRE8wbEJRMnhDTEVOQlFVTTdTVUZSVXl4VFFVRlRMRU5CUVVNc1ZVRkJPRUk3VVVGRE9VTXNTVUZCU1N4TlFVRk5MRWRCUVVjc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1VVRkRNVU1zVlVGQlZTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVdNc1JVRkJSU3hEUVVGUkxFVkJRVVVzUlVGQlJUdFpRVU40UXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhIUVVGSExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTjRRaXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5JTEU5QlFVOHNhVUpCUVdsQ0xFTkJRVU03U1VGRE4wSXNRMEZCUXp0RFFVTktPMEZCUjBRc2JVSkJRVkVzUTBGQlF5eFJRVUZSTEVOQlFVTXNUMEZCVHl4RlFVRkZMRmxCUVZrc1EwRkJReXhEUVVGREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIExheW91dFRva2VuIHtcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgfVxuICAgIGdldFNpemUoKSB7IHJldHVybiB0aGlzLnNpemU7IH1cbn1cbmV4cG9ydHMuTGF5b3V0VG9rZW4gPSBMYXlvdXRUb2tlbjtcbmNsYXNzIERlZmluZWRUb2tlbiBleHRlbmRzIExheW91dFRva2VuIHtcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7IHN1cGVyKHNpemUpOyB9XG59XG5leHBvcnRzLkRlZmluZWRUb2tlbiA9IERlZmluZWRUb2tlbjtcbmNsYXNzIEZpbGxUb2tlbiBleHRlbmRzIExheW91dFRva2VuIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoLTEpOyB9XG59XG5leHBvcnRzLkZpbGxUb2tlbiA9IEZpbGxUb2tlbjtcbmNsYXNzIFBpeGVsVG9rZW4gZXh0ZW5kcyBEZWZpbmVkVG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHsgc3VwZXIoc2l6ZSk7IH1cbn1cbmV4cG9ydHMuUGl4ZWxUb2tlbiA9IFBpeGVsVG9rZW47XG5jbGFzcyBQZXJjZW50VG9rZW4gZXh0ZW5kcyBEZWZpbmVkVG9rZW4ge1xuICAgIGNvbnN0cnVjdG9yKHNpemUpIHsgc3VwZXIoc2l6ZSk7IH1cbn1cbmV4cG9ydHMuUGVyY2VudFRva2VuID0gUGVyY2VudFRva2VuO1xuZnVuY3Rpb24gcHgocHgpIHsgcmV0dXJuIG5ldyBQaXhlbFRva2VuKHB4KTsgfVxuZXhwb3J0cy5weCA9IHB4O1xuZnVuY3Rpb24gcGMocGMpIHsgcmV0dXJuIG5ldyBQZXJjZW50VG9rZW4ocGMpOyB9XG5leHBvcnRzLnBjID0gcGM7XG5leHBvcnRzLkZJTEwgPSBuZXcgRmlsbFRva2VuKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWRzlyWlc1ekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZjM0pqTDNacFpYY3ZWRzlyWlc1ekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCVVVFc1RVRkJjMElzVjBGQlZ6dEpRVU0zUWl4WlFVRnZRaXhKUVVGWk8xRkJRVm9zVTBGQlNTeEhRVUZLTEVsQlFVa3NRMEZCVVR0SlFVRkhMRU5CUVVNN1NVRkROMElzVDBGQlR5eExRVUZMTEU5QlFVOHNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRGVrTTdRVUZJUkN4clEwRkhRenRCUVV0RUxFMUJRWE5DTEZsQlFXRXNVMEZCVVN4WFFVRlhPMGxCUTJ4RUxGbEJRVmtzU1VGQldTeEpRVUZKTEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRE4wTTdRVUZHUkN4dlEwRkZRenRCUVV0RUxFMUJRV0VzVTBGQlZTeFRRVUZSTEZkQlFWYzdTVUZEZEVNc1owSkJRV2RDTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dERRVU12UWp0QlFVWkVMRGhDUVVWRE8wRkJTMFFzVFVGQllTeFZRVUZYTEZOQlFWRXNXVUZCV1R0SlFVTjRReXhaUVVGWkxFbEJRVmNzU1VGQlNTeExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wTkJRelZETzBGQlJrUXNaME5CUlVNN1FVRkxSQ3hOUVVGaExGbEJRV0VzVTBGQlVTeFpRVUZaTzBsQlF6RkRMRmxCUVZrc1NVRkJWeXhKUVVGSkxFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1EwRkROVU03UVVGR1JDeHZRMEZGUXp0QlFVMUVMRk5CUVdkQ0xFVkJRVVVzUTBGQlF5eEZRVUZUTEVsQlFVMHNUMEZCVHl4SlFVRkpMRlZCUVZVc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZCT1VRc1owSkJRVGhFTzBGQlRUbEVMRk5CUVdkQ0xFVkJRVVVzUTBGQlF5eEZRVUZUTEVsQlFVMHNUMEZCVHl4SlFVRkpMRmxCUVZrc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZCYUVVc1owSkJRV2RGTzBGQlMyNUVMRkZCUVVFc1NVRkJTU3hIUVVGSExFbEJRVWtzVTBGQlV5eEZRVUZGTEVOQlFVTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBzaG9ydENoZWNrU3VtKHMpIHtcbiAgICBsZXQgY2hrID0gMHgxMjM0NTY3ODtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2hrICs9IChzLmNoYXJDb2RlQXQoaSkgKiAoaSArIDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIChjaGsgJiAweGZmZmZmZmZmKS50b1N0cmluZygxNik7XG59XG5leHBvcnRzLnNob3J0Q2hlY2tTdW0gPSBzaG9ydENoZWNrU3VtO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUTJobFkydHpkVzB1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdlEyaGxZMnR6ZFcwdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZSUXl4VFFVRm5RaXhoUVVGaExFTkJRVU1zUTBGQlVUdEpRVU51UXl4SlFVRkpMRWRCUVVjc1IwRkJSeXhWUVVGVkxFTkJRVU03U1VGRGNrSXNTMEZCU3l4SlFVRkpMRU5CUVVNc1IwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZETEVOQlFVTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVU3VVVGRE0wSXNSMEZCUnl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzB0QlEzUkRPMGxCUTBRc1QwRkJUeXhEUVVGRExFZEJRVWNzUjBGQlJ5eFZRVUZWTEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03UVVGRE1VTXNRMEZCUXp0QlFVNUVMSE5EUVUxREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG1vbnRoU3RyID0gW1xuICAgIFsnSmFuJywgJ0phbnVhcnknXSwgWydGZWInLCAnRmVicnVhcnknXSwgWydNYXInLCAnTWFyY2gnXSwgWydBcHInLCAnQXByaWwnXSwgWydNYXknLCAnTWF5J10sIFsnSnVuJywgJ0p1bmUnXSxcbiAgICBbJ0p1bCcsICdKdWx5J10sIFsnQXVnJywgJ0F1Z3VzdCddLCBbJ1NlcCcsICdTZXB0ZW1iZXInXSwgWydPY3QnLCAnT2N0b2JlciddLCBbJ05vdicsICdOb3ZlbWJlciddLCBbJ0RlYycsICdEZWNlbWJlciddXG5dO1xuY29uc3QgZGF5U3RyID0gW1xuICAgIFsnU3VuJywgJ1N1bmRheSddLCBbJ01vbicsICdNb25kYXknXSwgWydUdWUnLCAnVHVlc2RheSddLCBbJ1dlZCcsICdXZWRuZXNkYXknXSwgWydUaHUnLCAnVGh1cnNkYXknXSwgWydGcmknLCAnRnJpZGF5J10sIFsnU2F0JywgJ1NhdHVyZGF5J11cbl07XG5mdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtYmVyLCBkaWdpdHMpIHtcbiAgICBsZXQgciA9ICcnICsgbnVtYmVyO1xuICAgIHdoaWxlIChyLmxlbmd0aCA8IGRpZ2l0cykge1xuICAgICAgICByID0gXCIwXCIgKyByO1xuICAgIH1cbiAgICByZXR1cm4gcjtcbn1cbmZ1bmN0aW9uIGRhdGUoZm9ybWF0U3RyaW5nLCBkYXRlID0gbmV3IERhdGUoKSkge1xuICAgIHJldHVybiAodHlwZW9mIGZvcm1hdFN0cmluZyAhPT0gJ3N0cmluZycgfHwgaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSA/XG4gICAgICAgICdpbnZhbGlkJyA6XG4gICAgICAgIGZvcm1hdFN0cmluZ1xuICAgICAgICAgICAgLnJlcGxhY2UoLyVZWVlZL2csICcnICsgZGF0ZS5nZXRGdWxsWWVhcigpKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVZWS9nLCAnJyArIChkYXRlLmdldEZ1bGxZZWFyKCkgJSAxMDApKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVNTU1NL2csIG1vbnRoU3RyW2RhdGUuZ2V0TW9udGgoKV1bMV0pXG4gICAgICAgICAgICAucmVwbGFjZSgvJU1NTS9nLCBtb250aFN0cltkYXRlLmdldE1vbnRoKCldWzBdKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVNTS9nLCBmb3JtYXROdW1iZXIoZGF0ZS5nZXRNb250aCgpICsgMSwgMikpXG4gICAgICAgICAgICAucmVwbGFjZSgvJU0vZywgJycgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkpXG4gICAgICAgICAgICAucmVwbGFjZSgvJUREREQvZywgZGF5U3RyW2RhdGUuZ2V0RGF5KCldWzFdKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVEREQvZywgZGF5U3RyW2RhdGUuZ2V0RGF5KCldWzBdKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVERC9nLCBmb3JtYXROdW1iZXIoZGF0ZS5nZXREYXRlKCksIDIpKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVEL2csICcnICsgZGF0ZS5nZXREYXRlKCkpXG4gICAgICAgICAgICAucmVwbGFjZSgvJWhoL2csIGZvcm1hdE51bWJlcihkYXRlLmdldEhvdXJzKCksIDIpKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVoL2csICcnICsgZGF0ZS5nZXRIb3VycygpKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVtbS9nLCBmb3JtYXROdW1iZXIoZGF0ZS5nZXRNaW51dGVzKCksIDIpKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVtL2csICcnICsgZGF0ZS5nZXRNaW51dGVzKCkpXG4gICAgICAgICAgICAucmVwbGFjZSgvJXNzL2csIGZvcm1hdE51bWJlcihkYXRlLmdldFNlY29uZHMoKSwgMikpXG4gICAgICAgICAgICAucmVwbGFjZSgvJWpqai9nLCBmb3JtYXROdW1iZXIoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMykpXG4gICAgICAgICAgICAucmVwbGFjZSgvJWpqL2csIGZvcm1hdE51bWJlcihkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAsIDIpKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyVqL2csIGZvcm1hdE51bWJlcihkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwLCAxKSk7XG59XG5leHBvcnRzLmRhdGUgPSBkYXRlO1xuZXhwb3J0cy5tcyA9IHtcbiAgICBmcm9tTWludXRlczogKG1pbikgPT4gMTAwMCAqIDYwICogbWluLFxuICAgIGZyb21Ib3VyczogKGgpID0+IDEwMDAgKiA2MCAqIDYwICogaCxcbiAgICBmcm9tRGF5czogKGQpID0+IDEwMDAgKiA2MCAqIDYwICogMjQgKiBkLFxuICAgIGZyb21XZWVrczogKHcpID0+IDEwMDAgKiA2MCAqIDYwICogMjQgKiA3ICogdyxcbiAgICB0b01pbnV0ZXM6IChtcykgPT4gbXMgLyAoMTAwMCAqIDYwKSxcbiAgICB0b0hvdXJzOiAobXMpID0+IG1zIC8gKDEwMDAgKiA2MCAqIDYwKSxcbiAgICB0b0RheXM6IChtcykgPT4gbXMgLyAoMTAwMCAqIDYwICogNjAgKiAyNCksXG4gICAgdG9XZWVrczogKG1zKSA9PiBtcyAvICgxMDAwICogNjAgKiA2MCAqIDI0ICogNylcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lSR0YwWlM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OUVZWFJsTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJaVUVzVFVGQlRTeFJRVUZSTEVkQlFVYzdTVUZEWWl4RFFVRkRMRXRCUVVzc1JVRkJSU3hUUVVGVExFTkJRVU1zUlVGQlJTeERRVUZETEV0QlFVc3NSVUZCUlN4VlFVRlZMRU5CUVVNc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeFBRVUZQTEVOQlFVTXNSVUZCUlN4RFFVRkRMRXRCUVVzc1JVRkJSU3hQUVVGUExFTkJRVU1zUlVGQlJTeERRVUZETEV0QlFVc3NSVUZCUlN4TFFVRkxMRU5CUVVNc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeE5RVUZOTEVOQlFVTTdTVUZETlVjc1EwRkJReXhMUVVGTExFVkJRVVVzVFVGQlRTeERRVUZETEVWQlFVVXNRMEZCUXl4TFFVRkxMRVZCUVVVc1VVRkJVU3hEUVVGRExFVkJRVVVzUTBGQlF5eExRVUZMTEVWQlFVVXNWMEZCVnl4RFFVRkRMRVZCUVVVc1EwRkJReXhMUVVGTExFVkJRVVVzVTBGQlV5eERRVUZETEVWQlFVVXNRMEZCUXl4TFFVRkxMRVZCUVVVc1ZVRkJWU3hEUVVGRExFVkJRVVVzUTBGQlF5eExRVUZMTEVWQlFVVXNWVUZCVlN4RFFVRkRPME5CUVVNc1EwRkJRenRCUVVjMVNDeE5RVUZOTEUxQlFVMHNSMEZCUnp0SlFVTllMRU5CUVVNc1MwRkJTeXhGUVVGRkxGRkJRVkVzUTBGQlF5eEZRVUZETEVOQlFVTXNTMEZCU3l4RlFVRkZMRkZCUVZFc1EwRkJReXhGUVVGRExFTkJRVU1zUzBGQlN5eEZRVUZGTEZOQlFWTXNRMEZCUXl4RlFVRkRMRU5CUVVNc1MwRkJTeXhGUVVGRkxGZEJRVmNzUTBGQlF5eEZRVUZETEVOQlFVTXNTMEZCU3l4RlFVRkZMRlZCUVZVc1EwRkJReXhGUVVGRExFTkJRVU1zUzBGQlN5eEZRVUZGTEZGQlFWRXNRMEZCUXl4RlFVRkRMRU5CUVVNc1MwRkJTeXhGUVVGRkxGVkJRVlVzUTBGQlF6dERRVUZETEVOQlFVTTdRVUZITTBrc1UwRkJVeXhaUVVGWkxFTkJRVU1zVFVGQllTeEZRVUZGTEUxQlFXRTdTVUZET1VNc1NVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZETEUxQlFVMHNRMEZCUXp0SlFVTnNRaXhQUVVGUExFTkJRVU1zUTBGQlF5eE5RVUZOTEVkQlFVY3NUVUZCVFN4RlFVRkZPMUZCUVVVc1EwRkJReXhIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEVOQlFVTTdTMEZCUlR0SlFVTXhReXhQUVVGUExFTkJRVU1zUTBGQlF6dEJRVU5pTEVOQlFVTTdRVUZqUkN4VFFVRm5RaXhKUVVGSkxFTkJRVU1zV1VGQmJVSXNSVUZCUlN4SlFVRkpMRWRCUVVNc1NVRkJTU3hKUVVGSkxFVkJRVVU3U1VGRGNrUXNUMEZCVHl4RFFVRkRMRTlCUVU4c1dVRkJXU3hMUVVGTExGRkJRVkVzU1VGQlNTeExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEyaEZMRk5CUVZNc1EwRkJRU3hEUVVGRE8xRkJRMVlzV1VGQldUdGhRVU5RTEU5QlFVOHNRMEZCUXl4UlFVRlJMRVZCUVVVc1JVRkJSU3hIUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXp0aFFVTjRReXhQUVVGUExFTkJRVU1zVFVGQlRTeEZRVUZKTEVWQlFVVXNSMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVVzUjBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0aFFVTTVReXhQUVVGUExFTkJRVU1zVVVGQlVTeEZRVUZITEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0aFFVTm9SQ3hQUVVGUExFTkJRVU1zVDBGQlR5eEZRVUZKTEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0aFFVTm9SQ3hQUVVGUExFTkJRVU1zVFVGQlRTeEZRVUZKTEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hGUVVGRkxFZEJRVU1zUTBGQlF5eEZRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMkZCUTNCRUxFOUJRVThzUTBGQlF5eExRVUZMTEVWQlFVa3NSVUZCUlN4SFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJTeEhRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMkZCUTNoRExFOUJRVThzUTBGQlF5eFJRVUZSTEVWQlFVY3NUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMkZCUXpWRExFOUJRVThzUTBGQlF5eFBRVUZQTEVWQlFVa3NUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMkZCUXpWRExFOUJRVThzUTBGQlF5eE5RVUZOTEVWQlFVa3NXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0aFFVTnFSQ3hQUVVGUExFTkJRVU1zUzBGQlN5eEZRVUZKTEVWQlFVVXNSMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03WVVGRGJrTXNUMEZCVHl4RFFVRkRMRTFCUVUwc1JVRkJTU3haUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlN4RlFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8yRkJRMnhFTEU5QlFVOHNRMEZCUXl4TFFVRkxMRVZCUVVjc1JVRkJSU3hIUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXp0aFFVTnVReXhQUVVGUExFTkJRVU1zVFVGQlRTeEZRVUZKTEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFVkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdZVUZEY0VRc1QwRkJUeXhEUVVGRExFdEJRVXNzUlVGQlNTeEZRVUZGTEVkQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRE8yRkJRM1JETEU5QlFVOHNRMEZCUXl4TlFVRk5MRVZCUVVrc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVWQlFVVXNSVUZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRoUVVOd1JDeFBRVUZQTEVOQlFVTXNUMEZCVHl4RlFVRkpMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zWlVGQlpTeEZRVUZGTEVWQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1lVRkRNVVFzVDBGQlR5eERRVUZETEUxQlFVMHNSVUZCU1N4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExHVkJRV1VzUlVGQlJTeEhRVUZETEVWQlFVVXNSVUZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRoUVVNMVJDeFBRVUZQTEVOQlFVTXNTMEZCU3l4RlFVRkhMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zWlVGQlpTeEZRVUZGTEVkQlFVTXNSMEZCUnl4RlFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRGVrVXNRMEZCUXp0QlFYUkNSQ3h2UWtGelFrTTdRVUZIV1N4UlFVRkJMRVZCUVVVc1IwRkJSenRKUVVOa0xGZEJRVmNzUlVGQlN5eERRVUZETEVkQlFWVXNSVUZCUlN4RlFVRkZMRU5CUVVNc1NVRkJTU3hIUVVGRExFVkJRVVVzUjBGQlF5eEhRVUZITzBsQlF6TkRMRk5CUVZNc1JVRkJUeXhEUVVGRExFTkJRVkVzUlVGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4SFFVRkRMRVZCUVVVc1IwRkJReXhGUVVGRkxFZEJRVU1zUTBGQlF6dEpRVU0xUXl4UlFVRlJMRVZCUVZFc1EwRkJReXhEUVVGUkxFVkJRVWtzUlVGQlJTeERRVUZETEVsQlFVa3NSMEZCUXl4RlFVRkZMRWRCUVVNc1JVRkJSU3hIUVVGRExFVkJRVVVzUjBGQlF5eERRVUZETzBsQlF5OURMRk5CUVZNc1JVRkJUeXhEUVVGRExFTkJRVkVzUlVGQlNTeEZRVUZGTEVOQlFVTXNTVUZCU1N4SFFVRkRMRVZCUVVVc1IwRkJReXhGUVVGRkxFZEJRVU1zUlVGQlJTeEhRVUZETEVOQlFVTXNSMEZCUXl4RFFVRkRPMGxCUTJwRUxGTkJRVk1zUlVGQlR5eERRVUZETEVWQlFWTXNSVUZCUnl4RlFVRkZMRU5CUVVNc1JVRkJSU3hIUVVGRExFTkJRVU1zU1VGQlNTeEhRVUZETEVWQlFVVXNRMEZCUXp0SlFVTTFReXhQUVVGUExFVkJRVk1zUTBGQlF5eEZRVUZUTEVWQlFVY3NSVUZCUlN4RFFVRkRMRVZCUVVVc1IwRkJReXhEUVVGRExFbEJRVWtzUjBGQlF5eEZRVUZGTEVkQlFVTXNSVUZCUlN4RFFVRkRPMGxCUXk5RExFMUJRVTBzUlVGQlZTeERRVUZETEVWQlFWTXNSVUZCUnl4RlFVRkZMRU5CUVVNc1JVRkJSU3hIUVVGRExFTkJRVU1zU1VGQlNTeEhRVUZETEVWQlFVVXNSMEZCUXl4RlFVRkZMRWRCUVVNc1JVRkJSU3hEUVVGRE8wbEJRMnhFTEU5QlFVOHNSVUZCVXl4RFFVRkRMRVZCUVZNc1JVRkJSeXhGUVVGRkxFTkJRVU1zUlVGQlJTeEhRVUZETEVOQlFVTXNTVUZCU1N4SFFVRkRMRVZCUVVVc1IwRkJReXhGUVVGRkxFZEJRVU1zUlVGQlJTeEhRVUZETEVOQlFVTXNRMEZCUXp0RFFVTjJSQ3hEUVVGREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHJvdW5kKG4sIGQgPSAwKSB7XG4gICAgcmV0dXJuIG4udG9GaXhlZChkKTtcbn1cbmV4cG9ydHMucm91bmQgPSByb3VuZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVRuVnRZbVZ5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwwNTFiV0psY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVmRETEZOQlFXZENMRXRCUVVzc1EwRkJReXhEUVVGUkxFVkJRVVVzUTBGQlF5eEhRVUZETEVOQlFVTTdTVUZIYUVNc1QwRkJUeXhEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTNaQ0xFTkJRVU03UVVGS1JDeHpRa0ZKUXlKOSIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiB0aW1lb3V0KG1zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHsgc2V0VGltZW91dChyZWplY3QsIG1zKTsgfSk7XG59XG5leHBvcnRzLnRpbWVvdXQgPSB0aW1lb3V0O1xuZnVuY3Rpb24gZGVsYXkobXMpIHtcbiAgICByZXR1cm4gKGFyZ3MpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgcmVzb2x2ZShhcmdzKTsgfSwgbXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuZXhwb3J0cy5kZWxheSA9IGRlbGF5O1xuY2xhc3MgUGFjZSB7XG4gICAgY29uc3RydWN0b3IocGFjZSA9IDEwMCwgbWF4Q29uY3VycmVudCA9IC0xKSB7XG4gICAgICAgIHRoaXMubWF4Q29uY3VycmVudCA9IC0xO1xuICAgICAgICB0aGlzLndhaXRVbnRpbCA9IDA7XG4gICAgICAgIHRoaXMud2FpdENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5iZWluZ0NhbGxlZCA9IDA7XG4gICAgICAgIHRoaXMucGFjZSA9IHBhY2UgKyA1O1xuICAgICAgICB0aGlzLm1heENvbmN1cnJlbnQgPSBtYXhDb25jdXJyZW50O1xuICAgIH1cbiAgICBnZXRXYWl0Q291bnQoKSB7IHJldHVybiB0aGlzLndhaXRDb3VudDsgfVxuICAgIGdldENhbGxpbmdDb3VudCgpIHsgcmV0dXJuIHRoaXMuYmVpbmdDYWxsZWQ7IH1cbiAgICBhZGQoZm4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGFkZFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKHRoaXMud2FpdFVudGlsIDwgYWRkVGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMud2FpdFVudGlsID0gYWRkVGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSB0aGlzLndhaXRVbnRpbCAtIGFkZFRpbWU7XG4gICAgICAgICAgICB0aGlzLndhaXRVbnRpbCArPSB0aGlzLnBhY2UgKyA1O1xuICAgICAgICAgICAgdGhpcy53YWl0Q291bnQrKztcbiAgICAgICAgICAgIHlpZWxkIGRlbGF5KGRpZmYpKCk7XG4gICAgICAgICAgICB5aWVsZCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB3YWl0TG9vcCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4Q29uY3VycmVudCA8IDAgfHwgdGhpcy5iZWluZ0NhbGxlZCA8IHRoaXMubWF4Q29uY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCh3YWl0TG9vcCwgMTApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB3YWl0TG9vcCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLndhaXRDb3VudC0tO1xuICAgICAgICAgICAgdGhpcy5iZWluZ0NhbGxlZCsrO1xuICAgICAgICAgICAgY29uc3QgcmV0ID0geWllbGQgZm4oRGF0ZS5ub3coKSAtIGFkZFRpbWUpO1xuICAgICAgICAgICAgdGhpcy5iZWluZ0NhbGxlZC0tO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5QYWNlID0gUGFjZTtcbmZ1bmN0aW9uIHByb21pc2VDaGFpbih0YXNrcywgaW5pdGlhbFJlc3VsdCA9IFtdKSB7XG4gICAgcmV0dXJuIHRhc2tzLnJlZHVjZSgoY2hhaW4sIHRhc2spID0+IGNoYWluLnRoZW4oKF9yZXN1bHRzKSA9PiBQcm9taXNlLnJlc29sdmUodGFzayhfcmVzdWx0cykpLnRoZW4oKHIpID0+IHtcbiAgICAgICAgX3Jlc3VsdHMucHVzaChyKTtcbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgIH0pKSwgUHJvbWlzZS5yZXNvbHZlKGluaXRpYWxSZXN1bHQpKTtcbn1cbmV4cG9ydHMucHJvbWlzZUNoYWluID0gcHJvbWlzZUNoYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVkdsdFpXUlFjbTl0YVhObGN5NXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlVYVcxbFpGQnliMjFwYzJWekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPenM3T3pzN096czdPMEZCVjBFc1UwRkJaMElzVDBGQlR5eERRVUZETEVWQlFWTTdTVUZETjBJc1QwRkJUeXhKUVVGSkxFOUJRVThzUTBGQlF5eERRVUZETEU5QlFVOHNSVUZCUlN4TlFVRk5MRVZCUVVVc1JVRkJSU3hIUVVGSExGVkJRVlVzUTBGQlF5eE5RVUZOTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dEJRVU42UlN4RFFVRkRPMEZCUmtRc01FSkJSVU03UVVGMVFrUXNVMEZCWjBJc1MwRkJTeXhEUVVGRExFVkJRVk03U1VGRE0wSXNUMEZCVHl4RFFVRkpMRWxCUVU4c1JVRkJZU3hGUVVGRk8xRkJRemRDTEU5QlFVOHNTVUZCU1N4UFFVRlBMRU5CUVVNc1EwRkJReXhQUVVGelFpeEZRVUZGTEVWQlFVVTdXVUZETVVNc1ZVRkJWU3hEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0UlFVTTNReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTXNRMEZCUXp0QlFVTk9MRU5CUVVNN1FVRk9SQ3h6UWtGTlF6dEJRV0ZFTEUxQlFXRXNTVUZCU1R0SlFWbGlMRmxCUVZrc1NVRkJTU3hIUVVGRExFZEJRVWNzUlVGQlJTeGhRVUZoTEVkQlFVTXNRMEZCUXl4RFFVRkRPMUZCV0RsQ0xHdENRVUZoTEVkQlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkZja0lzWTBGQlV5eEhRVUZUTEVOQlFVTXNRMEZCUXp0UlFVTndRaXhqUVVGVExFZEJRVk1zUTBGQlF5eERRVUZETzFGQlEzQkNMR2RDUVVGWExFZEJRVThzUTBGQlF5eERRVUZETzFGQlVYaENMRWxCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzU1VGQlNTeEhRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnVRaXhKUVVGSkxFTkJRVU1zWVVGQllTeEhRVUZITEdGQlFXRXNRMEZCUXp0SlFVTjJReXhEUVVGRE8wbEJSVVFzV1VGQldTeExRVUZSTEU5QlFVOHNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRE5VTXNaVUZCWlN4TFFVRkxMRTlCUVU4c1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZSZUVNc1IwRkJSeXhEUVVGRExFVkJRV2xET3p0WlFVTjJReXhOUVVGTkxFOUJRVThzUjBGQlJ5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RlFVRkZMRU5CUVVNN1dVRkRNMElzU1VGQlNTeEpRVUZKTEVOQlFVTXNVMEZCVXl4SFFVRkhMRTlCUVU4c1JVRkJSVHRuUWtGQlJTeEpRVUZKTEVOQlFVTXNVMEZCVXl4SFFVRkhMRTlCUVU4c1EwRkJRenRoUVVGRk8xbEJRek5FTEUxQlFVMHNTVUZCU1N4SFFVRkhMRWxCUVVrc1EwRkJReXhUUVVGVExFZEJRVWNzVDBGQlR5eERRVUZETzFsQlEzUkRMRWxCUVVrc1EwRkJReXhUUVVGVExFbEJRVWtzU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4RFFVRkRMRU5CUVVNN1dVRkRhRU1zU1VGQlNTeERRVUZETEZOQlFWTXNSVUZCUlN4RFFVRkRPMWxCUTJwQ0xFMUJRVTBzUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNN1dVRkRjRUlzVFVGQlRTeEpRVUZKTEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUVVNc1JVRkJSVHRuUWtGRGVFSXNUVUZCVFN4UlFVRlJMRWRCUVVjc1IwRkJSeXhGUVVGRk8yOUNRVU5zUWl4SlFVRkpMRWxCUVVrc1EwRkJReXhoUVVGaExFZEJRVWNzUTBGQlF5eEpRVUZKTEVsQlFVa3NRMEZCUXl4WFFVRlhMRWRCUVVjc1NVRkJTU3hEUVVGRExHRkJRV0VzUlVGQlJUdDNRa0ZEYWtVc1QwRkJUeXhGUVVGRkxFTkJRVU03Y1VKQlEySTdlVUpCUVUwN2QwSkJRMGdzVlVGQlZTeERRVUZETEZGQlFWRXNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenR4UWtGRE5VSTdaMEpCUTB3c1EwRkJReXhEUVVGRE8yZENRVU5HTEZGQlFWRXNSVUZCUlN4RFFVRkRPMWxCUTJZc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRFNDeEpRVUZKTEVOQlFVTXNVMEZCVXl4RlFVRkZMRU5CUVVNN1dVRkRha0lzU1VGQlNTeERRVUZETEZkQlFWY3NSVUZCUlN4RFFVRkRPMWxCUTI1Q0xFMUJRVTBzUjBGQlJ5eEhRVUZITEUxQlFVMHNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0WlFVTjZReXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEVOQlFVTTdXVUZEYmtJc1QwRkJUeXhIUVVGSExFTkJRVU03VVVGRFppeERRVUZETzB0QlFVRTdRMEZEU2p0QlFXcEVSQ3h2UWtGcFJFTTdRVUZYUkN4VFFVRm5RaXhaUVVGWkxFTkJRVWtzUzBGQmNVTXNSVUZCUlN4blFrRkJhMElzUlVGQlJUdEpRVU4yUml4UFFVRlBMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eExRVUZyUWl4RlFVRkZMRWxCUVN0Q0xFVkJRV2RDTEVWQlFVVXNRMEZGZEVZc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEZGQlFWa3NSVUZCUlN4RlFVRkZMRU5CUVVNc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZITEVWQlFVVXNSVUZCUlR0UlFVVjBSU3hSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUTJwQ0xFOUJRVThzVVVGQlVTeERRVUZETzBsQlEzQkNMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRMGdzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4aFFVRmhMRU5CUVVNc1EwRkRha01zUTBGQlF6dEJRVU5PTEVOQlFVTTdRVUZXUkN4dlEwRlZReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVGltZWRQcm9taXNlc18xID0gcmVxdWlyZShcIi4vVGltZWRQcm9taXNlc1wiKTtcbmV4cG9ydHMudGltZW91dCA9IFRpbWVkUHJvbWlzZXNfMS50aW1lb3V0O1xuZXhwb3J0cy5kZWxheSA9IFRpbWVkUHJvbWlzZXNfMS5kZWxheTtcbnZhciBUaW1lZFByb21pc2VzXzIgPSByZXF1aXJlKFwiLi9UaW1lZFByb21pc2VzXCIpO1xuZXhwb3J0cy5QYWNlID0gVGltZWRQcm9taXNlc18yLlBhY2U7XG52YXIgVGltZWRQcm9taXNlc18zID0gcmVxdWlyZShcIi4vVGltZWRQcm9taXNlc1wiKTtcbmV4cG9ydHMucHJvbWlzZUNoYWluID0gVGltZWRQcm9taXNlc18zLnByb21pc2VDaGFpbjtcbnZhciBDaGVja3N1bV8xID0gcmVxdWlyZShcIi4vQ2hlY2tzdW1cIik7XG5leHBvcnRzLnNob3J0Q2hlY2tTdW0gPSBDaGVja3N1bV8xLnNob3J0Q2hlY2tTdW07XG52YXIgRGF0ZV8xID0gcmVxdWlyZShcIi4vRGF0ZVwiKTtcbmV4cG9ydHMuZGF0ZSA9IERhdGVfMS5kYXRlO1xuZXhwb3J0cy5tcyA9IERhdGVfMS5tcztcbnZhciBOdW1iZXJfMSA9IHJlcXVpcmUoXCIuL051bWJlclwiKTtcbmV4cG9ydHMucm91bmQgPSBOdW1iZXJfMS5yb3VuZDtcbnZhciBsb2dfMSA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbmV4cG9ydHMuTG9nID0gbG9nXzEuTG9nO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12YVc1a1pYZ3VkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3UVVGQlFTeHBSRUZCYlVRN1FVRkJNVU1zYTBOQlFVRXNUMEZCVHl4RFFVRkJPMEZCUVVVc1owTkJRVUVzUzBGQlN5eERRVUZCTzBGQlEzWkNMR2xFUVVGdFJEdEJRVUV4UXl3clFrRkJRU3hKUVVGSkxFTkJRVUU3UVVGRFlpeHBSRUZCYlVRN1FVRkJNVU1zZFVOQlFVRXNXVUZCV1N4RFFVRkJPMEZCUTNKQ0xIVkRRVUU0UXp0QlFVRnlReXh0UTBGQlFTeGhRVUZoTEVOQlFVRTdRVUZEZEVJc0swSkJRVEJETzBGQlFXcERMSE5DUVVGQkxFbEJRVWtzUTBGQlFUdEJRVUZGTEc5Q1FVRkJMRVZCUVVVc1EwRkJRVHRCUVVOcVFpeHRRMEZCTkVNN1FVRkJia01zZVVKQlFVRXNTMEZCU3l4RFFVRkJPMEZCUTJRc05rSkJRWGxETzBGQlFXaERMRzlDUVVGQkxFZEJRVWNzUTBGQlFTSjkiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRGF0ZV8xID0gcmVxdWlyZShcIi4vRGF0ZVwiKTtcbmNvbnN0IENPTE9SUyA9IFsnIzAwOCcsICcjMDgwJywgJyM4MDAnLCAnIzA2NicsICcjNjYwJywgJyM2MDYnXTtcbmNsYXNzIExvZyB7XG4gICAgY29uc3RydWN0b3IocHJlZml4KSB7XG4gICAgICAgIHRoaXMucmVwb3J0TGV2ZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucmVwb3J0UHJlZml4ID0gJyc7XG4gICAgICAgIHRoaXMucmVwb3J0UHJlZml4ID0gcHJlZml4O1xuICAgIH1cbiAgICBsZXZlbChuZXdMZXZlbFN5bSwgc2V0R2xvYmFsTGV2ZWwpIHtcbiAgICAgICAgbGV0IG5ld0xldmVsID0gTG9nLmxldmVsc1tuZXdMZXZlbFN5bV0gfHwgTG9nLmdsb2JhbExldmVsO1xuICAgICAgICBsZXQgb2xkTGV2ZWwgPSB0aGlzLnJlcG9ydExldmVsIHx8IExvZy5nbG9iYWxMZXZlbDtcbiAgICAgICAgaWYgKG5ld0xldmVsU3ltID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5ld0xldmVsID0gb2xkTGV2ZWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV3TGV2ZWxTeW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0TGV2ZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoTG9nLmxldmVsc1tuZXdMZXZlbFN5bV0pIHtcbiAgICAgICAgICAgIGlmIChzZXRHbG9iYWxMZXZlbCkge1xuICAgICAgICAgICAgICAgIExvZy5nbG9iYWxMZXZlbCA9IG5ld0xldmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRMZXZlbCA9IG5ld0xldmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbXNnID0gYG5ldyAke3NldEdsb2JhbExldmVsID8gJ2dsb2JhbCcgOiB0aGlzLnJlcG9ydFByZWZpeH0gbG9nIGxldmVsICR7bmV3TGV2ZWwuZGVzYy50b1VwcGVyQ2FzZSgpfSAod2FzICR7b2xkTGV2ZWwuZGVzYy50b1VwcGVyQ2FzZSgpfSlgO1xuICAgICAgICAgICAgdGhpcy5vdXQoKG5ld0xldmVsLnN5bSA9PT0gb2xkTGV2ZWwuc3ltKSA/IExvZy5ERUJVRyA6IExvZy5JTkZPLCBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vdXQoTG9nLkVSUk9SLCBgdW5rb3duIGxldmVsICR7bmV3TGV2ZWxTeW19OyBsb2cgbGV2ZWwgcmVtYWlucyAke29sZExldmVsLnN5bX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3TGV2ZWwuc3ltO1xuICAgIH1cbiAgICBkZWJ1Zyhtc2csIGxvZzJGaWxlID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgeyByZXR1cm4geWllbGQgdGhpcy5vdXQoTG9nLkRFQlVHLCBtc2cpOyB9KTtcbiAgICB9XG4gICAgaW5mbyhtc2csIGxvZzJGaWxlID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgeyByZXR1cm4geWllbGQgdGhpcy5vdXQoTG9nLklORk8sIG1zZyk7IH0pO1xuICAgIH1cbiAgICB3YXJuKG1zZywgbG9nMkZpbGUgPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiB5aWVsZCB0aGlzLm91dChMb2cuV0FSTiwgbXNnKTsgfSk7XG4gICAgfVxuICAgIGVycm9yKG1zZywgbG9nMkZpbGUgPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAobXNnLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLm91dChMb2cuRVJST1IsIG1zZy5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLm91dChMb2cuRVJST1IsIG1zZy5zdGFjayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1zZy5tZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHRoaXMub3V0KExvZy5FUlJPUiwgbXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG91dChsdmwsIG1zZykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IGRlc2MgPSBMb2cubGV2ZWxzW2x2bF07XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJMZXZlbCA9IHRoaXMucmVwb3J0TGV2ZWwgfHwgTG9nLmdsb2JhbExldmVsO1xuICAgICAgICAgICAgaWYgKGRlc2MuaW1wb3J0YW5jZSA+PSBmaWx0ZXJMZXZlbC5pbXBvcnRhbmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVN0ciA9IERhdGVfMS5kYXRlKExvZy5kYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgICBsZXQgbGluZSA9ICh0eXBlb2YgbXNnID09PSAnc3RyaW5nJykgPyBtc2cgOiB0aGlzLmluc3BlY3QobXNnLCAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2dMaW5lID0gdGhpcy5tYWtlTWVzc2FnZShsaW5lLCBsdmwsIGRhdGVTdHIsIGRlc2MuZGVzYyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobG9nTGluZSk7XG4gICAgICAgICAgICAgICAgaWYgKG1zZyAmJiBtc2cuc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXNnLnN0YWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsaW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtYWtlTWVzc2FnZShsaW5lLCBsdmwsIGRhdGVTdHIsIGRlc2MpIHtcbiAgICAgICAgcmV0dXJuIGAke2RhdGVTdHJ9ICR7dGhpcy5yZXBvcnRQcmVmaXh9ICR7ZGVzY30gJHtsaW5lfWA7XG4gICAgfVxuICAgIGZvcm1hdChmbXRTdHIpIHtcbiAgICAgICAgaWYgKGZtdFN0ciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgTG9nLmRhdGVGb3JtYXQgPSBMb2cuZGVmRGF0ZUZvcm1hdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmbXRTdHIpIHtcbiAgICAgICAgICAgIExvZy5kYXRlRm9ybWF0ID0gZm10U3RyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBMb2cuZGF0ZUZvcm1hdDtcbiAgICB9XG4gICAgcHJlZml4KHByZikge1xuICAgICAgICBpZiAocHJmKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydFByZWZpeCA9IHByZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZXBvcnRQcmVmaXg7XG4gICAgfVxuICAgIGNvbmZpZyhjZmcpIHtcbiAgICAgICAgaWYgKGNmZy5mb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXQoY2ZnLmZvcm1hdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNmZy5sZXZlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsKGNmZy5sZXZlbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5zcGVjdChtc2csIGRlcHRoID0gMywgaW5kZW50ID0gJyAgICAnLCBjb2xvcnMgPSBDT0xPUlMpIHtcbiAgICAgICAgZnVuY3Rpb24gX2luc3BlY3QobXNnLCBkZXB0aCwgbGV2ZWwsIGN1cnJJbmRlbnQpIHtcbiAgICAgICAgICAgIGlmIChtc2cgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1zZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtc2cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2Z1bmN0aW9uJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgbXNnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJyR7bXNnfSdgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBtc2cgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlcHRoIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKG1zZy5sZW5ndGggPT09IHVuZGVmaW5lZCkgPyAney4uLn0nIDogJ1suLi5dJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1zZy5tYXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFske21zZy5tYXAoKGUpID0+IChlID09PSB1bmRlZmluZWQpID8gJycgOiBfaW5zcGVjdChlLCBkZXB0aCAtIDEsIGxldmVsICsgMSwgY3VyckluZGVudCkpLmpvaW4oJywgJyl9XWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IFtwcmVmaXgsIHBvc3RmaXhdID0gbG9nLmdldFByZVBvc3RmaXgoaW5kZW50LCBsZXZlbCwgY3VyckluZGVudCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY3N0YXJ0ID0gY29sb3JzID8gYDxiPjxzcGFuIHN0eWxlPSdjb2xvcjoke2NvbG9yc1tsZXZlbCAlIGNvbG9ycy5sZW5ndGhdfTsnPmAgOiAnJztcbiAgICAgICAgICAgICAgICBjb25zdCBjc3RvcCA9IGNvbG9ycyA/IGA8L3NwYW4+PC9iPmAgOiAnJztcbiAgICAgICAgICAgICAgICBjb25zdCBsZiA9IGNvbG9ycyA/ICc8YnI+JyA6ICdcXG4nO1xuICAgICAgICAgICAgICAgIHJldHVybiBgeyR7bGZ9YCArIE9iamVjdC5rZXlzKG1zZykubWFwKGsgPT4gYCR7Y3N0YXJ0fSR7cHJlZml4fSR7a30ke3Bvc3RmaXh9JHtjc3RvcH06ICR7X2luc3BlY3QobXNnW2tdLCBkZXB0aCAtIDEsIGxldmVsICsgMSwgY3VyckluZGVudCArIGluZGVudCl9YCkuam9pbihgLCR7bGZ9YCkgKyBgJHtsZn0ke2N1cnJJbmRlbnR9fWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbXNnLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbG9nID0gdGhpcztcbiAgICAgICAgaWYgKGNvbG9ycykge1xuICAgICAgICAgICAgaW5kZW50ID0gaW5kZW50LnJlcGxhY2UoLyAvZywgJyZuYnNwOycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfaW5zcGVjdChtc2csIGRlcHRoID09PSBudWxsID8gOTk5IDogZGVwdGgsIDAsICcnKTtcbiAgICB9XG4gICAgZ2V0UHJlUG9zdGZpeChpbmRlbnQsIGxldmVsLCBjdXJySW5kZW50KSB7XG4gICAgICAgIHJldHVybiBbYCR7Y3VyckluZGVudH0ke2luZGVudH1gLCAnJ107XG4gICAgfVxufVxuZXhwb3J0cy5Mb2cgPSBMb2c7XG5Mb2cuZGVmRGF0ZUZvcm1hdCA9ICclWVlZWSVNTSVERCAlaGg6JW1tOiVzcy4lampqJztcbkxvZy5kYXRlRm9ybWF0ID0gTG9nLmRlZkRhdGVGb3JtYXQ7XG5Mb2cuREVCVUcgPSAnREVCVUcnO1xuTG9nLklORk8gPSAnSU5GTyc7XG5Mb2cuV0FSTiA9ICdXQVJOJztcbkxvZy5FUlJPUiA9ICdFUlJPUic7XG5Mb2cubGV2ZWxzID0ge1xuICAgIFtMb2cuREVCVUddOiB7IGltcG9ydGFuY2U6IDAsIHN5bTogTG9nLkRFQlVHLCBkZXNjOiAnREVCVUcnIH0sXG4gICAgW0xvZy5JTkZPXTogeyBpbXBvcnRhbmNlOiAxLCBzeW06IExvZy5JTkZPLCBkZXNjOiAnSU5GTycgfSxcbiAgICBbTG9nLldBUk5dOiB7IGltcG9ydGFuY2U6IDIsIHN5bTogTG9nLldBUk4sIGRlc2M6ICdXQVJOJyB9LFxuICAgIFtMb2cuRVJST1JdOiB7IGltcG9ydGFuY2U6IDMsIHN5bTogTG9nLkVSUk9SLCBkZXNjOiAnRVJST1InIH1cbn07XG5Mb2cubG9nID0gbmV3IExvZygnJyk7XG5Mb2cuZ2xvYmFsTGV2ZWwgPSBMb2cubGV2ZWxzW0xvZy5JTkZPXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWJHOW5MbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDJ4dlp5NTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN096czdPenRCUVN0RlFTeHBRMEZCT0VJN1FVRkhPVUlzVFVGQlRTeE5RVUZOTEVkQlFVY3NRMEZCUXl4TlFVRk5MRVZCUVVVc1RVRkJUU3hGUVVGRkxFMUJRVTBzUlVGQlJTeE5RVUZOTEVWQlFVVXNUVUZCVFN4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8wRkJWV2hGTEUxQlFXRXNSMEZCUnp0SlFXdERXaXhaUVVGWkxFMUJRV0U3VVVGSVppeG5Ra0ZCVnl4SFFVRnJRaXhUUVVGVExFTkJRVU03VVVGRGRrTXNhVUpCUVZrc1IwRkJUU3hGUVVGRkxFTkJRVU03VVVGRlJpeEpRVUZKTEVOQlFVTXNXVUZCV1N4SFFVRkhMRTFCUVUwc1EwRkJRenRKUVVGRExFTkJRVU03U1VGdlFtNUVMRXRCUVVzc1EwRkJReXhYUVVGdFFpeEZRVUZGTEdOQlFYVkNPMUZCUTNKRUxFbEJRVWtzVVVGQlVTeEhRVUZITEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUjBGQlJ5eERRVUZETEZkQlFWY3NRMEZCUXp0UlFVTXhSQ3hKUVVGSkxGRkJRVkVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNWMEZCVnl4SlFVRkpMRWRCUVVjc1EwRkJReXhYUVVGWExFTkJRVU03VVVGRGJrUXNTVUZCU1N4WFFVRlhMRXRCUVVzc1UwRkJVeXhGUVVGRk8xbEJRek5DTEZGQlFWRXNSMEZCUnl4UlFVRlJMRU5CUVVNN1UwRkRka0k3WVVGQlRTeEpRVUZKTEZkQlFWY3NTMEZCU3l4SlFVRkpMRVZCUVVVN1dVRkROMElzU1VGQlNTeERRVUZETEZkQlFWY3NSMEZCUnl4VFFVRlRMRU5CUVVNN1UwRkRhRU03WVVGQlRTeEpRVUZKTEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFVkJRVVU3V1VGRGFFTXNTVUZCU1N4alFVRmpMRVZCUVVVN1owSkJRVVVzUjBGQlJ5eERRVUZETEZkQlFWY3NSMEZCUnl4UlFVRlJMRU5CUVVNN1lVRkJSVHRwUWtGREwwSTdaMEpCUVVVc1NVRkJTU3hEUVVGRExGZEJRVmNzUjBGQlJ5eFJRVUZSTEVOQlFVTTdZVUZCUlR0WlFVTndSQ3hOUVVGTkxFZEJRVWNzUjBGQlJ5eFBRVUZQTEdOQlFXTXNRMEZCUVN4RFFVRkRMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNXVUZCV1N4alFVRmpMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEZOQlFWTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVVzUjBGQlJ5eERRVUZETzFsQlEyaEtMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eFJRVUZSTEVOQlFVTXNSMEZCUnl4TFFVRkxMRkZCUVZFc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlFTeERRVUZETEVOQlFVRXNSMEZCUnl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenRUUVVOMlJUdGhRVUZOTzFsQlEwZ3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zUzBGQlN5eEZRVUZGTEdkQ1FVRm5RaXhYUVVGWExIVkNRVUYxUWl4UlFVRlJMRU5CUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU1zUTBGQlF6dFRRVU42Ump0UlFVTkVMRTlCUVU4c1VVRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF6dEpRVU40UWl4RFFVRkRPMGxCVlZrc1MwRkJTeXhEUVVGRExFZEJRVThzUlVGQlJTeFJRVUZSTEVkQlFVTXNTVUZCU1RzNFJFRkJiMElzVDBGQlR5eE5RVUZOTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFdEJRVXNzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1MwRkJRVHRKUVZWNFJpeEpRVUZKTEVOQlFVTXNSMEZCVHl4RlFVRkZMRkZCUVZFc1IwRkJReXhKUVVGSk96aEVRVUZ2UWl4UFFVRlBMRTFCUVUwc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dExRVUZCTzBsQlZYUkdMRWxCUVVrc1EwRkJReXhIUVVGUExFVkJRVVVzVVVGQlVTeEhRVUZETEVsQlFVazdPRVJCUVc5Q0xFOUJRVThzVFVGQlRTeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFVkJRVVVzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMHRCUVVFN1NVRlRkRVlzUzBGQlN5eERRVUZETEVkQlFVOHNSVUZCUlN4UlFVRlJMRWRCUVVNc1NVRkJTVHM3V1VGRGNrTXNTVUZCU1N4SFFVRkhMRU5CUVVNc1QwRkJUeXhGUVVGRk8yZENRVU5pTEUxQlFVMHNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zUzBGQlN5eEZRVUZGTEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRuUWtGRGRrTXNUVUZCVFN4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEVWQlFVVXNSMEZCUnl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8yZENRVU55UXl4UFFVRlBMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU03WVVGRGRFSTdhVUpCUVUwN1owSkJRMGdzVDBGQlR5eE5RVUZOTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFdEJRVXNzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXp0aFFVTjZRenRSUVVOTUxFTkJRVU03UzBGQlFUdEpRVlZsTEVkQlFVY3NRMEZCUXl4SFFVRlZMRVZCUVVVc1IwRkJUenM3V1VGRGJrTXNTVUZCU1N4SlFVRkpMRWRCUVdFc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0WlFVTnlReXhOUVVGTkxGZEJRVmNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNWMEZCVnl4SlFVRkpMRWRCUVVjc1EwRkJReXhYUVVGWExFTkJRVU03V1VGRGVFUXNTVUZCU1N4SlFVRkpMRU5CUVVNc1ZVRkJWU3hKUVVGSkxGZEJRVmNzUTBGQlF5eFZRVUZWTEVWQlFVVTdaMEpCUXpORExFMUJRVTBzVDBGQlR5eEhRVUZITEZkQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1ZVRkJWU3hEUVVGRExFTkJRVU03WjBKQlEzSkRMRWxCUVVrc1NVRkJTU3hIUVVGSExFTkJRVU1zVDBGQlR5eEhRVUZITEV0QlFVc3NVVUZCVVN4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdaMEpCUTJwRkxFMUJRVTBzVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hGUVVGRkxFZEJRVWNzUlVGQlJTeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8yZENRVU5vUlN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzJkQ1FVTnlRaXhKUVVGSkxFZEJRVWNzU1VGQlNTeEhRVUZITEVOQlFVTXNTMEZCU3l4RlFVRkZPMjlDUVVGRkxFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8ybENRVUZGTzJkQ1FVTnFSQ3hQUVVGUExFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1lVRkRhRU03V1VGRFJDeFBRVUZQTEZOQlFWTXNRMEZCUXp0UlFVTnlRaXhEUVVGRE8wdEJRVUU3U1VGUFV5eFhRVUZYTEVOQlFVTXNTVUZCVnl4RlFVRkZMRWRCUVZVc1JVRkJSU3hQUVVGakxFVkJRVVVzU1VGQlZ6dFJRVU4wUlN4UFFVRlBMRWRCUVVjc1QwRkJUeXhKUVVGSkxFbEJRVWtzUTBGQlF5eFpRVUZaTEVsQlFVa3NTVUZCU1N4SlFVRkpMRWxCUVVrc1JVRkJSU3hEUVVGRE8wbEJRemRFTEVOQlFVTTdTVUZaVFN4TlFVRk5MRU5CUVVNc1RVRkJZenRSUVVONFFpeEpRVUZKTEUxQlFVMHNTMEZCU3l4SlFVRkpMRVZCUVVVN1dVRkJSU3hIUVVGSExFTkJRVU1zVlVGQlZTeEhRVUZITEVkQlFVY3NRMEZCUXl4aFFVRmhMRU5CUVVNN1UwRkJSVHRoUVVOMlJDeEpRVUZKTEUxQlFVMHNSVUZCVFR0WlFVRkZMRWRCUVVjc1EwRkJReXhWUVVGVkxFZEJRVWNzVFVGQlRTeERRVUZETzFOQlFVVTdVVUZEYWtRc1QwRkJUeXhIUVVGSExFTkJRVU1zVlVGQlZTeERRVUZETzBsQlF6RkNMRU5CUVVNN1NVRlBUU3hOUVVGTkxFTkJRVU1zUjBGQlZ6dFJRVU55UWl4SlFVRkpMRWRCUVVjc1JVRkJSVHRaUVVGRkxFbEJRVWtzUTBGQlF5eFpRVUZaTEVkQlFVY3NSMEZCUnl4RFFVRkRPMU5CUVVVN1VVRkRja01zVDBGQlR5eEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRPMGxCUXpkQ0xFTkJRVU03U1VGVlRTeE5RVUZOTEVOQlFVTXNSMEZCY1VRN1VVRkRMMFFzU1VGQlNTeEhRVUZITEVOQlFVTXNUVUZCVFN4TFFVRkhMRk5CUVZNc1JVRkJSVHRaUVVGRkxFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRE8xTkJRVVU3VVVGRGVFUXNTVUZCU1N4SFFVRkhMRU5CUVVNc1MwRkJTeXhMUVVGSExGTkJRVk1zUlVGQlJ6dFpRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzFOQlFVVTdTVUZETVVRc1EwRkJRenRKUVdGTkxFOUJRVThzUTBGQlF5eEhRVUZQTEVWQlFVVXNTMEZCU3l4SFFVRkRMRU5CUVVNc1JVRkJSU3hOUVVGTkxFZEJRVU1zVFVGQlRTeEZRVUZGTEUxQlFVMHNSMEZCUXl4TlFVRk5PMUZCUTNwRUxGTkJRVk1zVVVGQlVTeERRVUZETEVkQlFVOHNSVUZCUlN4TFFVRlpMRVZCUVVVc1MwRkJXU3hGUVVGRkxGVkJRV2xDTzFsQlEzQkZMRWxCUVVrc1IwRkJSeXhMUVVGTExFbEJRVWtzUlVGQlowSTdaMEpCUVVVc1QwRkJUeXhOUVVGTkxFTkJRVU03WVVGQlJUdFpRVU5zUkN4SlFVRkpMRWRCUVVjc1MwRkJTeXhUUVVGVExFVkJRVmM3WjBKQlFVVXNUMEZCVHl4WFFVRlhMRU5CUVVNN1lVRkJSVHRaUVVOMlJDeEpRVUZKTEU5QlFVOHNSMEZCUnl4TFFVRkxMRlZCUVZVc1JVRkJSenRuUWtGQlJTeFBRVUZQTEZWQlFWVXNRMEZCUXp0aFFVRkZPMWxCUTNSRUxFbEJRVWtzVDBGQlR5eEhRVUZITEV0QlFVc3NVVUZCVVN4RlFVRkxPMmRDUVVGRkxFOUJRVThzU1VGQlNTeEhRVUZITEVkQlFVY3NRMEZCUXp0aFFVRkZPMWxCUTNSRUxFbEJRVWtzVDBGQlR5eEhRVUZITEV0QlFVc3NVVUZCVVN4RlFVRkxPMmRDUVVNMVFpeEpRVUZKTEV0QlFVc3NSMEZCUXl4RFFVRkRMRVZCUVVVN2IwSkJRVVVzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4TlFVRk5MRXRCUVVjc1UwRkJVeXhEUVVGRExFTkJRVUVzUTBGQlF5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNc1QwRkJUeXhEUVVGRE8ybENRVUZGTzJkQ1FVTndSU3hKUVVGSkxFZEJRVWNzUTBGQlF5eEhRVUZITEV0QlFVc3NVMEZCVXl4RlFVRkZPMjlDUVVOMlFpeFBRVUZQTEVsQlFVa3NSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVXNzUlVGQlF5eEZRVUZGTEVOQlFVRXNRMEZCUXl4RFFVRkRMRXRCUVVjc1UwRkJVeXhEUVVGRExFTkJRVUVzUTBGQlF5eERRVUZCTEVWQlFVVXNRMEZCUVN4RFFVRkRMRU5CUVVFc1VVRkJVU3hEUVVGRExFTkJRVU1zUlVGQlJTeExRVUZMTEVkQlFVTXNRMEZCUXl4RlFVRkZMRXRCUVVzc1IwRkJReXhEUVVGRExFVkJRVVVzVlVGQlZTeERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF6dHBRa0ZETVVjN1owSkJRMFlzVFVGQlRTeERRVUZETEUxQlFVMHNSVUZCUlN4UFFVRlBMRU5CUVVNc1IwRkJSeXhIUVVGSExFTkJRVU1zWVVGQllTeERRVUZETEUxQlFVMHNSVUZCUlN4TFFVRkxMRVZCUVVVc1ZVRkJWU3hEUVVGRExFTkJRVU03WjBKQlEzWkZMRTFCUVUwc1RVRkJUU3hIUVVGSkxFMUJRVTBzUTBGQlFTeERRVUZETEVOQlFVTXNlVUpCUVhsQ0xFMUJRVTBzUTBGQlF5eExRVUZMTEVkQlFVY3NUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXp0blFrRkRla1lzVFVGQlRTeExRVUZMTEVkQlFVc3NUVUZCVFN4RFFVRkJMRU5CUVVNc1EwRkJReXhoUVVGaExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXp0blFrRkRNME1zVFVGQlRTeEZRVUZGTEVkQlFWRXNUVUZCVFN4RFFVRkJMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXp0blFrRkRkRU1zVDBGQlR5eEpRVUZKTEVWQlFVVXNSVUZCUlN4SFFVRkhMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eE5RVUZOTEVkQlFVY3NUVUZCVFN4SFFVRkhMRU5CUVVNc1IwRkJSeXhQUVVGUExFZEJRVWNzUzBGQlN5eExRVU0xUlN4UlFVRlJMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEV0QlFVc3NSMEZCUXl4RFFVRkRMRVZCUVVVc1MwRkJTeXhIUVVGRExFTkJRVU1zUlVGQlJTeFZRVUZWTEVkQlFVTXNUVUZCVFN4RFFVTjRSQ3hGUVVGRkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRVZCUVVVc1EwRkJReXhIUVVGSExFZEJRVWNzUlVGQlJTeEhRVUZITEZWQlFWVXNSMEZCUnl4RFFVRkRPMkZCUTJ4RU8xbEJRMFFzVDBGQlR5eEhRVUZITEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNN1VVRkRNVUlzUTBGQlF6dFJRVU5FTEUxQlFVMHNSMEZCUnl4SFFVRkhMRWxCUVVrc1EwRkJRenRSUVVOcVFpeEpRVUZKTEUxQlFVMHNSVUZCUlR0WlFVRkZMRTFCUVUwc1IwRkJSeXhOUVVGTkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NSVUZCUlN4UlFVRlJMRU5CUVVNc1EwRkJRenRUUVVGRk8xRkJRM2hFTEU5QlFVOHNVVUZCVVN4RFFVRkRMRWRCUVVjc1JVRkJSU3hMUVVGTExFdEJRVWNzU1VGQlNTeERRVUZCTEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNN1NVRkRNMFFzUTBGQlF6dEpRVVZUTEdGQlFXRXNRMEZCUXl4TlFVRmhMRVZCUVVVc1MwRkJXU3hGUVVGRkxGVkJRV2xDTzFGQlEyeEZMRTlCUVU4c1EwRkJReXhIUVVGSExGVkJRVlVzUjBGQlJ5eE5RVUZOTEVWQlFVVXNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRKUVVNeFF5eERRVUZET3p0QlFYQlBUQ3hyUWtGeFQwTTdRVUZ1VDI5Q0xHbENRVUZoTEVkQlFVY3NPRUpCUVRoQ0xFTkJRVU03UVVGREwwTXNZMEZCVlN4SFFVRk5MRWRCUVVjc1EwRkJReXhoUVVGaExFTkJRVU03UVVGSGNrTXNVMEZCU3l4SFFVRkhMRTlCUVU4c1EwRkJRenRCUVVkb1FpeFJRVUZKTEVkQlFVc3NUVUZCVFN4RFFVRkRPMEZCUjJoQ0xGRkJRVWtzUjBGQlN5eE5RVUZOTEVOQlFVTTdRVUZIYUVJc1UwRkJTeXhIUVVGSkxFOUJRVThzUTBGQlF6dEJRVWRrTEZWQlFVMHNSMEZCUnp0SlFVTjBRaXhEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEVOQlFVTXNSVUZCU3l4RlFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4TFFVRkxMRVZCUVVVc1NVRkJTU3hGUVVGRkxFOUJRVThzUlVGQlF6dEpRVU01UkN4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlRTeEZRVUZETEZWQlFWVXNSVUZCUlN4RFFVRkRMRVZCUVVVc1IwRkJSeXhGUVVGRkxFZEJRVWNzUTBGQlF5eEpRVUZKTEVWQlFVY3NTVUZCU1N4RlFVRkZMRTFCUVUwc1JVRkJRenRKUVVNM1JDeERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJUU3hGUVVGRExGVkJRVlVzUlVGQlJTeERRVUZETEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFVkJRVWNzU1VGQlNTeEZRVUZGTEUxQlFVMHNSVUZCUXp0SlFVTTNSQ3hEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEVOQlFVTXNSVUZCU3l4RlFVRkRMRlZCUVZVc1JVRkJSU3hEUVVGRExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4TFFVRkxMRVZCUVVVc1NVRkJTU3hGUVVGRkxFOUJRVThzUlVGQlF6dERRVU5xUlN4RFFVRkRPMEZCUjFrc1QwRkJSeXhIUVVGSExFbEJRVWtzUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRPMEZCUjJZc1pVRkJWeXhIUVVGaExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGREluMD0iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocmVuZGVyLCBzY2hlZHVsZSwgY29uc29sZSkge1xuXHR2YXIgc3Vic2NyaXB0aW9ucyA9IFtdXG5cdHZhciByZW5kZXJpbmcgPSBmYWxzZVxuXHR2YXIgcGVuZGluZyA9IGZhbHNlXG5cblx0ZnVuY3Rpb24gc3luYygpIHtcblx0XHRpZiAocmVuZGVyaW5nKSB0aHJvdyBuZXcgRXJyb3IoXCJOZXN0ZWQgbS5yZWRyYXcuc3luYygpIGNhbGxcIilcblx0XHRyZW5kZXJpbmcgPSB0cnVlXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzY3JpcHRpb25zLmxlbmd0aDsgaSArPSAyKSB7XG5cdFx0XHR0cnkgeyByZW5kZXIoc3Vic2NyaXB0aW9uc1tpXSwgVm5vZGUoc3Vic2NyaXB0aW9uc1tpICsgMV0pLCByZWRyYXcpIH1cblx0XHRcdGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoZSkgfVxuXHRcdH1cblx0XHRyZW5kZXJpbmcgPSBmYWxzZVxuXHR9XG5cblx0ZnVuY3Rpb24gcmVkcmF3KCkge1xuXHRcdGlmICghcGVuZGluZykge1xuXHRcdFx0cGVuZGluZyA9IHRydWVcblx0XHRcdHNjaGVkdWxlKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRwZW5kaW5nID0gZmFsc2Vcblx0XHRcdFx0c3luYygpXG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG5cdHJlZHJhdy5zeW5jID0gc3luY1xuXG5cdGZ1bmN0aW9uIG1vdW50KHJvb3QsIGNvbXBvbmVudCkge1xuXHRcdGlmIChjb21wb25lbnQgIT0gbnVsbCAmJiBjb21wb25lbnQudmlldyA9PSBudWxsICYmIHR5cGVvZiBjb21wb25lbnQgIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIm0ubW91bnQoZWxlbWVudCwgY29tcG9uZW50KSBleHBlY3RzIGEgY29tcG9uZW50LCBub3QgYSB2bm9kZVwiKVxuXHRcdH1cblxuXHRcdHZhciBpbmRleCA9IHN1YnNjcmlwdGlvbnMuaW5kZXhPZihyb290KVxuXHRcdGlmIChpbmRleCA+PSAwKSB7XG5cdFx0XHRzdWJzY3JpcHRpb25zLnNwbGljZShpbmRleCwgMilcblx0XHRcdHJlbmRlcihyb290LCBbXSwgcmVkcmF3KVxuXHRcdH1cblxuXHRcdGlmIChjb21wb25lbnQgIT0gbnVsbCkge1xuXHRcdFx0c3Vic2NyaXB0aW9ucy5wdXNoKHJvb3QsIGNvbXBvbmVudClcblx0XHRcdHJlbmRlcihyb290LCBWbm9kZShjb21wb25lbnQpLCByZWRyYXcpXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHttb3VudDogbW91bnQsIHJlZHJhdzogcmVkcmF3fVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxudmFyIG0gPSByZXF1aXJlKFwiLi4vcmVuZGVyL2h5cGVyc2NyaXB0XCIpXG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoXCIuLi9wcm9taXNlL3Byb21pc2VcIilcblxudmFyIGJ1aWxkUGF0aG5hbWUgPSByZXF1aXJlKFwiLi4vcGF0aG5hbWUvYnVpbGRcIilcbnZhciBwYXJzZVBhdGhuYW1lID0gcmVxdWlyZShcIi4uL3BhdGhuYW1lL3BhcnNlXCIpXG52YXIgY29tcGlsZVRlbXBsYXRlID0gcmVxdWlyZShcIi4uL3BhdGhuYW1lL2NvbXBpbGVUZW1wbGF0ZVwiKVxudmFyIGFzc2lnbiA9IHJlcXVpcmUoXCIuLi9wYXRobmFtZS9hc3NpZ25cIilcblxudmFyIHNlbnRpbmVsID0ge31cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkd2luZG93LCBtb3VudFJlZHJhdykge1xuXHR2YXIgZmlyZUFzeW5jXG5cblx0ZnVuY3Rpb24gc2V0UGF0aChwYXRoLCBkYXRhLCBvcHRpb25zKSB7XG5cdFx0cGF0aCA9IGJ1aWxkUGF0aG5hbWUocGF0aCwgZGF0YSlcblx0XHRpZiAoZmlyZUFzeW5jICE9IG51bGwpIHtcblx0XHRcdGZpcmVBc3luYygpXG5cdFx0XHR2YXIgc3RhdGUgPSBvcHRpb25zID8gb3B0aW9ucy5zdGF0ZSA6IG51bGxcblx0XHRcdHZhciB0aXRsZSA9IG9wdGlvbnMgPyBvcHRpb25zLnRpdGxlIDogbnVsbFxuXHRcdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZXBsYWNlKSAkd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHN0YXRlLCB0aXRsZSwgcm91dGUucHJlZml4ICsgcGF0aClcblx0XHRcdGVsc2UgJHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgdGl0bGUsIHJvdXRlLnByZWZpeCArIHBhdGgpXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcm91dGUucHJlZml4ICsgcGF0aFxuXHRcdH1cblx0fVxuXG5cdHZhciBjdXJyZW50UmVzb2x2ZXIgPSBzZW50aW5lbCwgY29tcG9uZW50LCBhdHRycywgY3VycmVudFBhdGgsIGxhc3RVcGRhdGVcblxuXHR2YXIgU0tJUCA9IHJvdXRlLlNLSVAgPSB7fVxuXG5cdGZ1bmN0aW9uIHJvdXRlKHJvb3QsIGRlZmF1bHRSb3V0ZSwgcm91dGVzKSB7XG5cdFx0aWYgKHJvb3QgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwiRW5zdXJlIHRoZSBET00gZWxlbWVudCB0aGF0IHdhcyBwYXNzZWQgdG8gYG0ucm91dGVgIGlzIG5vdCB1bmRlZmluZWRcIilcblx0XHQvLyAwID0gc3RhcnRcblx0XHQvLyAxID0gaW5pdFxuXHRcdC8vIDIgPSByZWFkeVxuXHRcdHZhciBzdGF0ZSA9IDBcblxuXHRcdHZhciBjb21waWxlZCA9IE9iamVjdC5rZXlzKHJvdXRlcykubWFwKGZ1bmN0aW9uKHJvdXRlKSB7XG5cdFx0XHRpZiAocm91dGVbMF0gIT09IFwiL1wiKSB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJSb3V0ZXMgbXVzdCBzdGFydCB3aXRoIGEgYC9gXCIpXG5cdFx0XHRpZiAoKC86KFteXFwvXFwuLV0rKShcXC57M30pPzovKS50ZXN0KHJvdXRlKSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJSb3V0ZSBwYXJhbWV0ZXIgbmFtZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBlaXRoZXIgYC9gLCBgLmAsIG9yIGAtYFwiKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0cm91dGU6IHJvdXRlLFxuXHRcdFx0XHRjb21wb25lbnQ6IHJvdXRlc1tyb3V0ZV0sXG5cdFx0XHRcdGNoZWNrOiBjb21waWxlVGVtcGxhdGUocm91dGUpLFxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0dmFyIGNhbGxBc3luYyA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHNldEltbWVkaWF0ZSA6IHNldFRpbWVvdXRcblx0XHR2YXIgcCA9IFByb21pc2UucmVzb2x2ZSgpXG5cdFx0dmFyIHNjaGVkdWxlZCA9IGZhbHNlXG5cdFx0dmFyIG9ucmVtb3ZlXG5cblx0XHRmaXJlQXN5bmMgPSBudWxsXG5cblx0XHRpZiAoZGVmYXVsdFJvdXRlICE9IG51bGwpIHtcblx0XHRcdHZhciBkZWZhdWx0RGF0YSA9IHBhcnNlUGF0aG5hbWUoZGVmYXVsdFJvdXRlKVxuXG5cdFx0XHRpZiAoIWNvbXBpbGVkLnNvbWUoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkuY2hlY2soZGVmYXVsdERhdGEpIH0pKSB7XG5cdFx0XHRcdHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIkRlZmF1bHQgcm91dGUgZG9lc24ndCBtYXRjaCBhbnkga25vd24gcm91dGVzXCIpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVzb2x2ZVJvdXRlKCkge1xuXHRcdFx0c2NoZWR1bGVkID0gZmFsc2Vcblx0XHRcdC8vIENvbnNpZGVyIHRoZSBwYXRobmFtZSBob2xpc3RpY2FsbHkuIFRoZSBwcmVmaXggbWlnaHQgZXZlbiBiZSBpbnZhbGlkLFxuXHRcdFx0Ly8gYnV0IHRoYXQncyBub3Qgb3VyIHByb2JsZW0uXG5cdFx0XHR2YXIgcHJlZml4ID0gJHdpbmRvdy5sb2NhdGlvbi5oYXNoXG5cdFx0XHRpZiAocm91dGUucHJlZml4WzBdICE9PSBcIiNcIikge1xuXHRcdFx0XHRwcmVmaXggPSAkd2luZG93LmxvY2F0aW9uLnNlYXJjaCArIHByZWZpeFxuXHRcdFx0XHRpZiAocm91dGUucHJlZml4WzBdICE9PSBcIj9cIikge1xuXHRcdFx0XHRcdHByZWZpeCA9ICR3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyBwcmVmaXhcblx0XHRcdFx0XHRpZiAocHJlZml4WzBdICE9PSBcIi9cIikgcHJlZml4ID0gXCIvXCIgKyBwcmVmaXhcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gVGhpcyBzZWVtaW5nbHkgdXNlbGVzcyBgLmNvbmNhdCgpYCBzcGVlZHMgdXAgdGhlIHRlc3RzIHF1aXRlIGEgYml0LFxuXHRcdFx0Ly8gc2luY2UgdGhlIHJlcHJlc2VudGF0aW9uIGlzIGNvbnNpc3RlbnRseSBhIHJlbGF0aXZlbHkgcG9vcmx5XG5cdFx0XHQvLyBvcHRpbWl6ZWQgY29ucyBzdHJpbmcuXG5cdFx0XHR2YXIgcGF0aCA9IHByZWZpeC5jb25jYXQoKVxuXHRcdFx0XHQucmVwbGFjZSgvKD86JVthLWY4OV1bYS1mMC05XSkrL2dpbSwgZGVjb2RlVVJJQ29tcG9uZW50KVxuXHRcdFx0XHQuc2xpY2Uocm91dGUucHJlZml4Lmxlbmd0aClcblx0XHRcdHZhciBkYXRhID0gcGFyc2VQYXRobmFtZShwYXRoKVxuXG5cdFx0XHRhc3NpZ24oZGF0YS5wYXJhbXMsICR3aW5kb3cuaGlzdG9yeS5zdGF0ZSlcblxuXHRcdFx0ZnVuY3Rpb24gZmFpbCgpIHtcblx0XHRcdFx0aWYgKHBhdGggPT09IGRlZmF1bHRSb3V0ZSkgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IHJlc29sdmUgZGVmYXVsdCByb3V0ZSBcIiArIGRlZmF1bHRSb3V0ZSlcblx0XHRcdFx0c2V0UGF0aChkZWZhdWx0Um91dGUsIG51bGwsIHtyZXBsYWNlOiB0cnVlfSlcblx0XHRcdH1cblxuXHRcdFx0bG9vcCgwKVxuXHRcdFx0ZnVuY3Rpb24gbG9vcChpKSB7XG5cdFx0XHRcdC8vIDAgPSBpbml0XG5cdFx0XHRcdC8vIDEgPSBzY2hlZHVsZWRcblx0XHRcdFx0Ly8gMiA9IGRvbmVcblx0XHRcdFx0Zm9yICg7IGkgPCBjb21waWxlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChjb21waWxlZFtpXS5jaGVjayhkYXRhKSkge1xuXHRcdFx0XHRcdFx0dmFyIHBheWxvYWQgPSBjb21waWxlZFtpXS5jb21wb25lbnRcblx0XHRcdFx0XHRcdHZhciBtYXRjaGVkUm91dGUgPSBjb21waWxlZFtpXS5yb3V0ZVxuXHRcdFx0XHRcdFx0dmFyIGxvY2FsQ29tcCA9IHBheWxvYWRcblx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBsYXN0VXBkYXRlID0gZnVuY3Rpb24oY29tcCkge1xuXHRcdFx0XHRcdFx0XHRpZiAodXBkYXRlICE9PSBsYXN0VXBkYXRlKSByZXR1cm5cblx0XHRcdFx0XHRcdFx0aWYgKGNvbXAgPT09IFNLSVApIHJldHVybiBsb29wKGkgKyAxKVxuXHRcdFx0XHRcdFx0XHRjb21wb25lbnQgPSBjb21wICE9IG51bGwgJiYgKHR5cGVvZiBjb21wLnZpZXcgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgY29tcCA9PT0gXCJmdW5jdGlvblwiKT8gY29tcCA6IFwiZGl2XCJcblx0XHRcdFx0XHRcdFx0YXR0cnMgPSBkYXRhLnBhcmFtcywgY3VycmVudFBhdGggPSBwYXRoLCBsYXN0VXBkYXRlID0gbnVsbFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50UmVzb2x2ZXIgPSBwYXlsb2FkLnJlbmRlciA/IHBheWxvYWQgOiBudWxsXG5cdFx0XHRcdFx0XHRcdGlmIChzdGF0ZSA9PT0gMikgbW91bnRSZWRyYXcucmVkcmF3KClcblx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0c3RhdGUgPSAyXG5cdFx0XHRcdFx0XHRcdFx0bW91bnRSZWRyYXcucmVkcmF3LnN5bmMoKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyBUaGVyZSdzIG5vIHVuZGVyc3RhdGluZyBob3cgbXVjaCBJICp3aXNoKiBJIGNvdWxkXG5cdFx0XHRcdFx0XHQvLyB1c2UgYGFzeW5jYC9gYXdhaXRgIGhlcmUuLi5cblx0XHRcdFx0XHRcdGlmIChwYXlsb2FkLnZpZXcgfHwgdHlwZW9mIHBheWxvYWQgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRwYXlsb2FkID0ge31cblx0XHRcdFx0XHRcdFx0dXBkYXRlKGxvY2FsQ29tcClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKHBheWxvYWQub25tYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRwLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBwYXlsb2FkLm9ubWF0Y2goZGF0YS5wYXJhbXMsIHBhdGgsIG1hdGNoZWRSb3V0ZSlcblx0XHRcdFx0XHRcdFx0fSkudGhlbih1cGRhdGUsIGZhaWwpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHVwZGF0ZShcImRpdlwiKVxuXHRcdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGZhaWwoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFNldCBpdCB1bmNvbmRpdGlvbmFsbHkgc28gYG0ucm91dGUuc2V0YCBhbmQgYG0ucm91dGUuTGlua2AgYm90aCB3b3JrLFxuXHRcdC8vIGV2ZW4gaWYgbmVpdGhlciBgcHVzaFN0YXRlYCBub3IgYGhhc2hjaGFuZ2VgIGFyZSBzdXBwb3J0ZWQuIEl0J3Ncblx0XHQvLyBjbGVhcmVkIGlmIGBoYXNoY2hhbmdlYCBpcyB1c2VkLCBzaW5jZSB0aGF0IG1ha2VzIGl0IGF1dG9tYXRpY2FsbHlcblx0XHQvLyBhc3luYy5cblx0XHRmaXJlQXN5bmMgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICghc2NoZWR1bGVkKSB7XG5cdFx0XHRcdHNjaGVkdWxlZCA9IHRydWVcblx0XHRcdFx0Y2FsbEFzeW5jKHJlc29sdmVSb3V0ZSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodHlwZW9mICR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0b25yZW1vdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0JHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZmlyZUFzeW5jLCBmYWxzZSlcblx0XHRcdH1cblx0XHRcdCR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZpcmVBc3luYywgZmFsc2UpXG5cdFx0fSBlbHNlIGlmIChyb3V0ZS5wcmVmaXhbMF0gPT09IFwiI1wiKSB7XG5cdFx0XHRmaXJlQXN5bmMgPSBudWxsXG5cdFx0XHRvbnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIHJlc29sdmVSb3V0ZSwgZmFsc2UpXG5cdFx0XHR9XG5cdFx0XHQkd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIHJlc29sdmVSb3V0ZSwgZmFsc2UpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1vdW50UmVkcmF3Lm1vdW50KHJvb3QsIHtcblx0XHRcdG9uYmVmb3JldXBkYXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0c3RhdGUgPSBzdGF0ZSA/IDIgOiAxXG5cdFx0XHRcdHJldHVybiAhKCFzdGF0ZSB8fCBzZW50aW5lbCA9PT0gY3VycmVudFJlc29sdmVyKVxuXHRcdFx0fSxcblx0XHRcdG9uY3JlYXRlOiByZXNvbHZlUm91dGUsXG5cdFx0XHRvbnJlbW92ZTogb25yZW1vdmUsXG5cdFx0XHR2aWV3OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCFzdGF0ZSB8fCBzZW50aW5lbCA9PT0gY3VycmVudFJlc29sdmVyKSByZXR1cm5cblx0XHRcdFx0Ly8gV3JhcCBpbiBhIGZyYWdtZW50IHRvIHByZXNlcnZlIGV4aXN0aW5nIGtleSBzZW1hbnRpY3Ncblx0XHRcdFx0dmFyIHZub2RlID0gW1Zub2RlKGNvbXBvbmVudCwgYXR0cnMua2V5LCBhdHRycyldXG5cdFx0XHRcdGlmIChjdXJyZW50UmVzb2x2ZXIpIHZub2RlID0gY3VycmVudFJlc29sdmVyLnJlbmRlcih2bm9kZVswXSlcblx0XHRcdFx0cmV0dXJuIHZub2RlXG5cdFx0XHR9LFxuXHRcdH0pXG5cdH1cblx0cm91dGUuc2V0ID0gZnVuY3Rpb24ocGF0aCwgZGF0YSwgb3B0aW9ucykge1xuXHRcdGlmIChsYXN0VXBkYXRlICE9IG51bGwpIHtcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cdFx0XHRvcHRpb25zLnJlcGxhY2UgPSB0cnVlXG5cdFx0fVxuXHRcdGxhc3RVcGRhdGUgPSBudWxsXG5cdFx0c2V0UGF0aChwYXRoLCBkYXRhLCBvcHRpb25zKVxuXHR9XG5cdHJvdXRlLmdldCA9IGZ1bmN0aW9uKCkge3JldHVybiBjdXJyZW50UGF0aH1cblx0cm91dGUucHJlZml4ID0gXCIjIVwiXG5cdHJvdXRlLkxpbmsgPSB7XG5cdFx0dmlldzogZnVuY3Rpb24odm5vZGUpIHtcblx0XHRcdHZhciBvcHRpb25zID0gdm5vZGUuYXR0cnMub3B0aW9uc1xuXHRcdFx0Ly8gUmVtb3ZlIHRoZXNlIHNvIHRoZXkgZG9uJ3QgZ2V0IG92ZXJ3cml0dGVuXG5cdFx0XHR2YXIgYXR0cnMgPSB7fSwgb25jbGljaywgaHJlZlxuXHRcdFx0YXNzaWduKGF0dHJzLCB2bm9kZS5hdHRycylcblx0XHRcdC8vIFRoZSBmaXJzdCB0d28gYXJlIGludGVybmFsLCBidXQgdGhlIHJlc3QgYXJlIG1hZ2ljIGF0dHJpYnV0ZXNcblx0XHRcdC8vIHRoYXQgbmVlZCBjZW5zb3JlZCB0byBub3Qgc2NyZXcgdXAgcmVuZGVyaW5nLlxuXHRcdFx0YXR0cnMuc2VsZWN0b3IgPSBhdHRycy5vcHRpb25zID0gYXR0cnMua2V5ID0gYXR0cnMub25pbml0ID1cblx0XHRcdGF0dHJzLm9uY3JlYXRlID0gYXR0cnMub25iZWZvcmV1cGRhdGUgPSBhdHRycy5vbnVwZGF0ZSA9XG5cdFx0XHRhdHRycy5vbmJlZm9yZXJlbW92ZSA9IGF0dHJzLm9ucmVtb3ZlID0gbnVsbFxuXG5cdFx0XHQvLyBEbyB0aGlzIG5vdyBzbyB3ZSBjYW4gZ2V0IHRoZSBtb3N0IGN1cnJlbnQgYGhyZWZgIGFuZCBgZGlzYWJsZWRgLlxuXHRcdFx0Ly8gVGhvc2UgYXR0cmlidXRlcyBtYXkgYWxzbyBiZSBzcGVjaWZpZWQgaW4gdGhlIHNlbGVjdG9yLCBhbmQgd2Vcblx0XHRcdC8vIHNob3VsZCBob25vciB0aGF0LlxuXHRcdFx0dmFyIGNoaWxkID0gbSh2bm9kZS5hdHRycy5zZWxlY3RvciB8fCBcImFcIiwgYXR0cnMsIHZub2RlLmNoaWxkcmVuKVxuXG5cdFx0XHQvLyBMZXQncyBwcm92aWRlIGEgKnJpZ2h0KiB3YXkgdG8gZGlzYWJsZSBhIHJvdXRlIGxpbmssIHJhdGhlciB0aGFuXG5cdFx0XHQvLyBsZXR0aW5nIHBlb3BsZSBzY3JldyB1cCBhY2Nlc3NpYmlsaXR5IG9uIGFjY2lkZW50LlxuXHRcdFx0Ly9cblx0XHRcdC8vIFRoZSBhdHRyaWJ1dGUgaXMgY29lcmNlZCBzbyB1c2VycyBkb24ndCBnZXQgc3VycHJpc2VkIG92ZXJcblx0XHRcdC8vIGBkaXNhYmxlZDogMGAgcmVzdWx0aW5nIGluIGEgYnV0dG9uIHRoYXQncyBzb21laG93IHJvdXRhYmxlXG5cdFx0XHQvLyBkZXNwaXRlIGJlaW5nIHZpc2libHkgZGlzYWJsZWQuXG5cdFx0XHRpZiAoY2hpbGQuYXR0cnMuZGlzYWJsZWQgPSBCb29sZWFuKGNoaWxkLmF0dHJzLmRpc2FibGVkKSkge1xuXHRcdFx0XHRjaGlsZC5hdHRycy5ocmVmID0gbnVsbFxuXHRcdFx0XHRjaGlsZC5hdHRyc1tcImFyaWEtZGlzYWJsZWRcIl0gPSBcInRydWVcIlxuXHRcdFx0XHQvLyBJZiB5b3UgKnJlYWxseSogZG8gd2FudCB0byBkbyB0aGlzIG9uIGEgZGlzYWJsZWQgbGluaywgdXNlXG5cdFx0XHRcdC8vIGFuIGBvbmNyZWF0ZWAgaG9vayB0byBhZGQgaXQuXG5cdFx0XHRcdGNoaWxkLmF0dHJzLm9uY2xpY2sgPSBudWxsXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvbmNsaWNrID0gY2hpbGQuYXR0cnMub25jbGlja1xuXHRcdFx0XHRocmVmID0gY2hpbGQuYXR0cnMuaHJlZlxuXHRcdFx0XHRjaGlsZC5hdHRycy5ocmVmID0gcm91dGUucHJlZml4ICsgaHJlZlxuXHRcdFx0XHRjaGlsZC5hdHRycy5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHZhciByZXN1bHRcblx0XHRcdFx0XHRpZiAodHlwZW9mIG9uY2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gb25jbGljay5jYWxsKGUuY3VycmVudFRhcmdldCwgZSlcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9uY2xpY2sgPT0gbnVsbCB8fCB0eXBlb2Ygb25jbGljayAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRcdFx0Ly8gZG8gbm90aGluZ1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIG9uY2xpY2suaGFuZGxlRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0b25jbGljay5oYW5kbGVFdmVudChlKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIEFkYXB0ZWQgZnJvbSBSZWFjdCBSb3V0ZXIncyBpbXBsZW1lbnRhdGlvbjpcblx0XHRcdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vUmVhY3RUcmFpbmluZy9yZWFjdC1yb3V0ZXIvYmxvYi81MjBhMGFjZDQ4YWUxYjA2NmViMGIwN2Q2ZDRkMTc5MGExZDAyNDgyL3BhY2thZ2VzL3JlYWN0LXJvdXRlci1kb20vbW9kdWxlcy9MaW5rLmpzXG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQvLyBUcnkgdG8gYmUgZmxleGlibGUgYW5kIGludHVpdGl2ZSBpbiBob3cgd2UgaGFuZGxlIGxpbmtzLlxuXHRcdFx0XHRcdC8vIEZ1biBmYWN0OiBsaW5rcyBhcmVuJ3QgYXMgb2J2aW91cyB0byBnZXQgcmlnaHQgYXMgeW91XG5cdFx0XHRcdFx0Ly8gd291bGQgZXhwZWN0LiBUaGVyZSdzIGEgbG90IG1vcmUgdmFsaWQgd2F5cyB0byBjbGljayBhXG5cdFx0XHRcdFx0Ly8gbGluayB0aGFuIHRoaXMsIGFuZCBvbmUgbWlnaHQgd2FudCB0byBub3Qgc2ltcGx5IGNsaWNrIGFcblx0XHRcdFx0XHQvLyBsaW5rLCBidXQgcmlnaHQgY2xpY2sgb3IgY29tbWFuZC1jbGljayBpdCB0byBjb3B5IHRoZVxuXHRcdFx0XHRcdC8vIGxpbmsgdGFyZ2V0LCBldGMuIE5vcGUsIHRoaXMgaXNuJ3QganVzdCBmb3IgYmxpbmQgcGVvcGxlLlxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdC8vIFNraXAgaWYgYG9uY2xpY2tgIHByZXZlbnRlZCBkZWZhdWx0XG5cdFx0XHRcdFx0XHRyZXN1bHQgIT09IGZhbHNlICYmICFlLmRlZmF1bHRQcmV2ZW50ZWQgJiZcblx0XHRcdFx0XHRcdC8vIElnbm9yZSBldmVyeXRoaW5nIGJ1dCBsZWZ0IGNsaWNrc1xuXHRcdFx0XHRcdFx0KGUuYnV0dG9uID09PSAwIHx8IGUud2hpY2ggPT09IDAgfHwgZS53aGljaCA9PT0gMSkgJiZcblx0XHRcdFx0XHRcdC8vIExldCB0aGUgYnJvd3NlciBoYW5kbGUgYHRhcmdldD1fYmxhbmtgLCBldGMuXG5cdFx0XHRcdFx0XHQoIWUuY3VycmVudFRhcmdldC50YXJnZXQgfHwgZS5jdXJyZW50VGFyZ2V0LnRhcmdldCA9PT0gXCJfc2VsZlwiKSAmJlxuXHRcdFx0XHRcdFx0Ly8gTm8gbW9kaWZpZXIga2V5c1xuXHRcdFx0XHRcdFx0IWUuY3RybEtleSAmJiAhZS5tZXRhS2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLmFsdEtleVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0XHRlLnJlZHJhdyA9IGZhbHNlXG5cdFx0XHRcdFx0XHRyb3V0ZS5zZXQoaHJlZiwgbnVsbCwgb3B0aW9ucylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBjaGlsZFxuXHRcdH0sXG5cdH1cblx0cm91dGUucGFyYW0gPSBmdW5jdGlvbihrZXkpIHtcblx0XHRyZXR1cm4gYXR0cnMgJiYga2V5ICE9IG51bGwgPyBhdHRyc1trZXldIDogYXR0cnNcblx0fVxuXG5cdHJldHVybiByb3V0ZVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGh5cGVyc2NyaXB0ID0gcmVxdWlyZShcIi4vcmVuZGVyL2h5cGVyc2NyaXB0XCIpXG5cbmh5cGVyc2NyaXB0LnRydXN0ID0gcmVxdWlyZShcIi4vcmVuZGVyL3RydXN0XCIpXG5oeXBlcnNjcmlwdC5mcmFnbWVudCA9IHJlcXVpcmUoXCIuL3JlbmRlci9mcmFnbWVudFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGh5cGVyc2NyaXB0XG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgaHlwZXJzY3JpcHQgPSByZXF1aXJlKFwiLi9oeXBlcnNjcmlwdFwiKVxudmFyIHJlcXVlc3QgPSByZXF1aXJlKFwiLi9yZXF1ZXN0XCIpXG52YXIgbW91bnRSZWRyYXcgPSByZXF1aXJlKFwiLi9tb3VudC1yZWRyYXdcIilcblxudmFyIG0gPSBmdW5jdGlvbiBtKCkgeyByZXR1cm4gaHlwZXJzY3JpcHQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB9XG5tLm0gPSBoeXBlcnNjcmlwdFxubS50cnVzdCA9IGh5cGVyc2NyaXB0LnRydXN0XG5tLmZyYWdtZW50ID0gaHlwZXJzY3JpcHQuZnJhZ21lbnRcbm0ubW91bnQgPSBtb3VudFJlZHJhdy5tb3VudFxubS5yb3V0ZSA9IHJlcXVpcmUoXCIuL3JvdXRlXCIpXG5tLnJlbmRlciA9IHJlcXVpcmUoXCIuL3JlbmRlclwiKVxubS5yZWRyYXcgPSBtb3VudFJlZHJhdy5yZWRyYXdcbm0ucmVxdWVzdCA9IHJlcXVlc3QucmVxdWVzdFxubS5qc29ucCA9IHJlcXVlc3QuanNvbnBcbm0ucGFyc2VRdWVyeVN0cmluZyA9IHJlcXVpcmUoXCIuL3F1ZXJ5c3RyaW5nL3BhcnNlXCIpXG5tLmJ1aWxkUXVlcnlTdHJpbmcgPSByZXF1aXJlKFwiLi9xdWVyeXN0cmluZy9idWlsZFwiKVxubS5wYXJzZVBhdGhuYW1lID0gcmVxdWlyZShcIi4vcGF0aG5hbWUvcGFyc2VcIilcbm0uYnVpbGRQYXRobmFtZSA9IHJlcXVpcmUoXCIuL3BhdGhuYW1lL2J1aWxkXCIpXG5tLnZub2RlID0gcmVxdWlyZShcIi4vcmVuZGVyL3Zub2RlXCIpXG5tLlByb21pc2VQb2x5ZmlsbCA9IHJlcXVpcmUoXCIuL3Byb21pc2UvcG9seWZpbGxcIilcblxubW9kdWxlLmV4cG9ydHMgPSBtXG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgcmVuZGVyID0gcmVxdWlyZShcIi4vcmVuZGVyXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vYXBpL21vdW50LXJlZHJhd1wiKShyZW5kZXIsIHJlcXVlc3RBbmltYXRpb25GcmFtZSwgY29uc29sZSlcbiIsIlwidXNlIHN0cmljdFwiXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0YXJnZXQsIHNvdXJjZSkge1xuXHRpZihzb3VyY2UpIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XSB9KVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGJ1aWxkUXVlcnlTdHJpbmcgPSByZXF1aXJlKFwiLi4vcXVlcnlzdHJpbmcvYnVpbGRcIilcbnZhciBhc3NpZ24gPSByZXF1aXJlKFwiLi9hc3NpZ25cIilcblxuLy8gUmV0dXJucyBgcGF0aGAgZnJvbSBgdGVtcGxhdGVgICsgYHBhcmFtc2Bcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGVtcGxhdGUsIHBhcmFtcykge1xuXHRpZiAoKC86KFteXFwvXFwuLV0rKShcXC57M30pPzovKS50ZXN0KHRlbXBsYXRlKSkge1xuXHRcdHRocm93IG5ldyBTeW50YXhFcnJvcihcIlRlbXBsYXRlIHBhcmFtZXRlciBuYW1lcyAqbXVzdCogYmUgc2VwYXJhdGVkXCIpXG5cdH1cblx0aWYgKHBhcmFtcyA9PSBudWxsKSByZXR1cm4gdGVtcGxhdGVcblx0dmFyIHF1ZXJ5SW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKFwiP1wiKVxuXHR2YXIgaGFzaEluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihcIiNcIilcblx0dmFyIHF1ZXJ5RW5kID0gaGFzaEluZGV4IDwgMCA/IHRlbXBsYXRlLmxlbmd0aCA6IGhhc2hJbmRleFxuXHR2YXIgcGF0aEVuZCA9IHF1ZXJ5SW5kZXggPCAwID8gcXVlcnlFbmQgOiBxdWVyeUluZGV4XG5cdHZhciBwYXRoID0gdGVtcGxhdGUuc2xpY2UoMCwgcGF0aEVuZClcblx0dmFyIHF1ZXJ5ID0ge31cblxuXHRhc3NpZ24ocXVlcnksIHBhcmFtcylcblxuXHR2YXIgcmVzb2x2ZWQgPSBwYXRoLnJlcGxhY2UoLzooW15cXC9cXC4tXSspKFxcLnszfSk/L2csIGZ1bmN0aW9uKG0sIGtleSwgdmFyaWFkaWMpIHtcblx0XHRkZWxldGUgcXVlcnlba2V5XVxuXHRcdC8vIElmIG5vIHN1Y2ggcGFyYW1ldGVyIGV4aXN0cywgZG9uJ3QgaW50ZXJwb2xhdGUgaXQuXG5cdFx0aWYgKHBhcmFtc1trZXldID09IG51bGwpIHJldHVybiBtXG5cdFx0Ly8gRXNjYXBlIG5vcm1hbCBwYXJhbWV0ZXJzLCBidXQgbm90IHZhcmlhZGljIG9uZXMuXG5cdFx0cmV0dXJuIHZhcmlhZGljID8gcGFyYW1zW2tleV0gOiBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHBhcmFtc1trZXldKSlcblx0fSlcblxuXHQvLyBJbiBjYXNlIHRoZSB0ZW1wbGF0ZSBzdWJzdGl0dXRpb24gYWRkcyBuZXcgcXVlcnkvaGFzaCBwYXJhbWV0ZXJzLlxuXHR2YXIgbmV3UXVlcnlJbmRleCA9IHJlc29sdmVkLmluZGV4T2YoXCI/XCIpXG5cdHZhciBuZXdIYXNoSW5kZXggPSByZXNvbHZlZC5pbmRleE9mKFwiI1wiKVxuXHR2YXIgbmV3UXVlcnlFbmQgPSBuZXdIYXNoSW5kZXggPCAwID8gcmVzb2x2ZWQubGVuZ3RoIDogbmV3SGFzaEluZGV4XG5cdHZhciBuZXdQYXRoRW5kID0gbmV3UXVlcnlJbmRleCA8IDAgPyBuZXdRdWVyeUVuZCA6IG5ld1F1ZXJ5SW5kZXhcblx0dmFyIHJlc3VsdCA9IHJlc29sdmVkLnNsaWNlKDAsIG5ld1BhdGhFbmQpXG5cblx0aWYgKHF1ZXJ5SW5kZXggPj0gMCkgcmVzdWx0ICs9IHRlbXBsYXRlLnNsaWNlKHF1ZXJ5SW5kZXgsIHF1ZXJ5RW5kKVxuXHRpZiAobmV3UXVlcnlJbmRleCA+PSAwKSByZXN1bHQgKz0gKHF1ZXJ5SW5kZXggPCAwID8gXCI/XCIgOiBcIiZcIikgKyByZXNvbHZlZC5zbGljZShuZXdRdWVyeUluZGV4LCBuZXdRdWVyeUVuZClcblx0dmFyIHF1ZXJ5c3RyaW5nID0gYnVpbGRRdWVyeVN0cmluZyhxdWVyeSlcblx0aWYgKHF1ZXJ5c3RyaW5nKSByZXN1bHQgKz0gKHF1ZXJ5SW5kZXggPCAwICYmIG5ld1F1ZXJ5SW5kZXggPCAwID8gXCI/XCIgOiBcIiZcIikgKyBxdWVyeXN0cmluZ1xuXHRpZiAoaGFzaEluZGV4ID49IDApIHJlc3VsdCArPSB0ZW1wbGF0ZS5zbGljZShoYXNoSW5kZXgpXG5cdGlmIChuZXdIYXNoSW5kZXggPj0gMCkgcmVzdWx0ICs9IChoYXNoSW5kZXggPCAwID8gXCJcIiA6IFwiJlwiKSArIHJlc29sdmVkLnNsaWNlKG5ld0hhc2hJbmRleClcblx0cmV0dXJuIHJlc3VsdFxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIHBhcnNlUGF0aG5hbWUgPSByZXF1aXJlKFwiLi9wYXJzZVwiKVxuXG4vLyBDb21waWxlcyBhIHRlbXBsYXRlIGludG8gYSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgcmVzb2x2ZWQgcGF0aCAod2l0aG91dCBxdWVyeVxuLy8gc3RyaW5ncykgYW5kIHJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRlbXBsYXRlIHBhcmFtZXRlcnMgd2l0aCB0aGVpclxuLy8gcGFyc2VkIHZhbHVlcy4gVGhpcyBleHBlY3RzIHRoZSBpbnB1dCBvZiB0aGUgY29tcGlsZWQgdGVtcGxhdGUgdG8gYmUgdGhlXG4vLyBvdXRwdXQgb2YgYHBhcnNlUGF0aG5hbWVgLiBOb3RlIHRoYXQgaXQgZG9lcyAqbm90KiByZW1vdmUgcXVlcnkgcGFyYW1ldGVyc1xuLy8gc3BlY2lmaWVkIGluIHRoZSB0ZW1wbGF0ZS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGVtcGxhdGUpIHtcblx0dmFyIHRlbXBsYXRlRGF0YSA9IHBhcnNlUGF0aG5hbWUodGVtcGxhdGUpXG5cdHZhciB0ZW1wbGF0ZUtleXMgPSBPYmplY3Qua2V5cyh0ZW1wbGF0ZURhdGEucGFyYW1zKVxuXHR2YXIga2V5cyA9IFtdXG5cdHZhciByZWdleHAgPSBuZXcgUmVnRXhwKFwiXlwiICsgdGVtcGxhdGVEYXRhLnBhdGgucmVwbGFjZShcblx0XHQvLyBJIGVzY2FwZSBsaXRlcmFsIHRleHQgc28gcGVvcGxlIGNhbiB1c2UgdGhpbmdzIGxpa2UgYDpmaWxlLjpleHRgIG9yXG5cdFx0Ly8gYDpsYW5nLTpsb2NhbGVgIGluIHJvdXRlcy4gVGhpcyBpcyBhbGwgbWVyZ2VkIGludG8gb25lIHBhc3Mgc28gSVxuXHRcdC8vIGRvbid0IGFsc28gYWNjaWRlbnRhbGx5IGVzY2FwZSBgLWAgYW5kIG1ha2UgaXQgaGFyZGVyIHRvIGRldGVjdCBpdCB0b1xuXHRcdC8vIGJhbiBpdCBmcm9tIHRlbXBsYXRlIHBhcmFtZXRlcnMuXG5cdFx0LzooW15cXC8uLV0rKShcXC57M318XFwuKD8hXFwuKXwtKT98W1xcXFxeJCorLigpfFxcW1xcXXt9XS9nLFxuXHRcdGZ1bmN0aW9uKG0sIGtleSwgZXh0cmEpIHtcblx0XHRcdGlmIChrZXkgPT0gbnVsbCkgcmV0dXJuIFwiXFxcXFwiICsgbVxuXHRcdFx0a2V5cy5wdXNoKHtrOiBrZXksIHI6IGV4dHJhID09PSBcIi4uLlwifSlcblx0XHRcdGlmIChleHRyYSA9PT0gXCIuLi5cIikgcmV0dXJuIFwiKC4qKVwiXG5cdFx0XHRpZiAoZXh0cmEgPT09IFwiLlwiKSByZXR1cm4gXCIoW14vXSspXFxcXC5cIlxuXHRcdFx0cmV0dXJuIFwiKFteL10rKVwiICsgKGV4dHJhIHx8IFwiXCIpXG5cdFx0fVxuXHQpICsgXCIkXCIpXG5cdHJldHVybiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0Ly8gRmlyc3QsIGNoZWNrIHRoZSBwYXJhbXMuIFVzdWFsbHksIHRoZXJlIGlzbid0IGFueSwgYW5kIGl0J3MganVzdFxuXHRcdC8vIGNoZWNraW5nIGEgc3RhdGljIHNldC5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBsYXRlS2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRlbXBsYXRlRGF0YS5wYXJhbXNbdGVtcGxhdGVLZXlzW2ldXSAhPT0gZGF0YS5wYXJhbXNbdGVtcGxhdGVLZXlzW2ldXSkgcmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdC8vIElmIG5vIGludGVycG9sYXRpb25zIGV4aXN0LCBsZXQncyBza2lwIGFsbCB0aGUgY2VyZW1vbnlcblx0XHRpZiAoIWtleXMubGVuZ3RoKSByZXR1cm4gcmVnZXhwLnRlc3QoZGF0YS5wYXRoKVxuXHRcdHZhciB2YWx1ZXMgPSByZWdleHAuZXhlYyhkYXRhLnBhdGgpXG5cdFx0aWYgKHZhbHVlcyA9PSBudWxsKSByZXR1cm4gZmFsc2Vcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGRhdGEucGFyYW1zW2tleXNbaV0ua10gPSBrZXlzW2ldLnIgPyB2YWx1ZXNbaSArIDFdIDogZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlc1tpICsgMV0pXG5cdFx0fVxuXHRcdHJldHVybiB0cnVlXG5cdH1cbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBwYXJzZVF1ZXJ5U3RyaW5nID0gcmVxdWlyZShcIi4uL3F1ZXJ5c3RyaW5nL3BhcnNlXCIpXG5cbi8vIFJldHVybnMgYHtwYXRoLCBwYXJhbXN9YCBmcm9tIGB1cmxgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVybCkge1xuXHR2YXIgcXVlcnlJbmRleCA9IHVybC5pbmRleE9mKFwiP1wiKVxuXHR2YXIgaGFzaEluZGV4ID0gdXJsLmluZGV4T2YoXCIjXCIpXG5cdHZhciBxdWVyeUVuZCA9IGhhc2hJbmRleCA8IDAgPyB1cmwubGVuZ3RoIDogaGFzaEluZGV4XG5cdHZhciBwYXRoRW5kID0gcXVlcnlJbmRleCA8IDAgPyBxdWVyeUVuZCA6IHF1ZXJ5SW5kZXhcblx0dmFyIHBhdGggPSB1cmwuc2xpY2UoMCwgcGF0aEVuZCkucmVwbGFjZSgvXFwvezIsfS9nLCBcIi9cIilcblxuXHRpZiAoIXBhdGgpIHBhdGggPSBcIi9cIlxuXHRlbHNlIHtcblx0XHRpZiAocGF0aFswXSAhPT0gXCIvXCIpIHBhdGggPSBcIi9cIiArIHBhdGhcblx0XHRpZiAocGF0aC5sZW5ndGggPiAxICYmIHBhdGhbcGF0aC5sZW5ndGggLSAxXSA9PT0gXCIvXCIpIHBhdGggPSBwYXRoLnNsaWNlKDAsIC0xKVxuXHR9XG5cdHJldHVybiB7XG5cdFx0cGF0aDogcGF0aCxcblx0XHRwYXJhbXM6IHF1ZXJ5SW5kZXggPCAwXG5cdFx0XHQ/IHt9XG5cdFx0XHQ6IHBhcnNlUXVlcnlTdHJpbmcodXJsLnNsaWNlKHF1ZXJ5SW5kZXggKyAxLCBxdWVyeUVuZCkpLFxuXHR9XG59XG4iLCJcInVzZSBzdHJpY3RcIlxuLyoqIEBjb25zdHJ1Y3RvciAqL1xudmFyIFByb21pc2VQb2x5ZmlsbCA9IGZ1bmN0aW9uKGV4ZWN1dG9yKSB7XG5cdGlmICghKHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlUG9seWZpbGwpKSB0aHJvdyBuZXcgRXJyb3IoXCJQcm9taXNlIG11c3QgYmUgY2FsbGVkIHdpdGggYG5ld2BcIilcblx0aWYgKHR5cGVvZiBleGVjdXRvciAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpXG5cblx0dmFyIHNlbGYgPSB0aGlzLCByZXNvbHZlcnMgPSBbXSwgcmVqZWN0b3JzID0gW10sIHJlc29sdmVDdXJyZW50ID0gaGFuZGxlcihyZXNvbHZlcnMsIHRydWUpLCByZWplY3RDdXJyZW50ID0gaGFuZGxlcihyZWplY3RvcnMsIGZhbHNlKVxuXHR2YXIgaW5zdGFuY2UgPSBzZWxmLl9pbnN0YW5jZSA9IHtyZXNvbHZlcnM6IHJlc29sdmVycywgcmVqZWN0b3JzOiByZWplY3RvcnN9XG5cdHZhciBjYWxsQXN5bmMgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBzZXRUaW1lb3V0XG5cdGZ1bmN0aW9uIGhhbmRsZXIobGlzdCwgc2hvdWxkQWJzb3JiKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGV4ZWN1dGUodmFsdWUpIHtcblx0XHRcdHZhciB0aGVuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoc2hvdWxkQWJzb3JiICYmIHZhbHVlICE9IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikgJiYgdHlwZW9mICh0aGVuID0gdmFsdWUudGhlbikgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gc2VsZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgdy8gaXRzZWxmXCIpXG5cdFx0XHRcdFx0ZXhlY3V0ZU9uY2UodGhlbi5iaW5kKHZhbHVlKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjYWxsQXN5bmMoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoIXNob3VsZEFic29yYiAmJiBsaXN0Lmxlbmd0aCA9PT0gMCkgY29uc29sZS5lcnJvcihcIlBvc3NpYmxlIHVuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbjpcIiwgdmFsdWUpXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIGxpc3RbaV0odmFsdWUpXG5cdFx0XHRcdFx0XHRyZXNvbHZlcnMubGVuZ3RoID0gMCwgcmVqZWN0b3JzLmxlbmd0aCA9IDBcblx0XHRcdFx0XHRcdGluc3RhbmNlLnN0YXRlID0gc2hvdWxkQWJzb3JiXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5yZXRyeSA9IGZ1bmN0aW9uKCkge2V4ZWN1dGUodmFsdWUpfVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKSB7XG5cdFx0XHRcdHJlamVjdEN1cnJlbnQoZSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gZXhlY3V0ZU9uY2UodGhlbikge1xuXHRcdHZhciBydW5zID0gMFxuXHRcdGZ1bmN0aW9uIHJ1bihmbikge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChydW5zKysgPiAwKSByZXR1cm5cblx0XHRcdFx0Zm4odmFsdWUpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciBvbmVycm9yID0gcnVuKHJlamVjdEN1cnJlbnQpXG5cdFx0dHJ5IHt0aGVuKHJ1bihyZXNvbHZlQ3VycmVudCksIG9uZXJyb3IpfSBjYXRjaCAoZSkge29uZXJyb3IoZSl9XG5cdH1cblxuXHRleGVjdXRlT25jZShleGVjdXRvcilcbn1cblByb21pc2VQb2x5ZmlsbC5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKG9uRnVsZmlsbGVkLCBvblJlamVjdGlvbikge1xuXHR2YXIgc2VsZiA9IHRoaXMsIGluc3RhbmNlID0gc2VsZi5faW5zdGFuY2Vcblx0ZnVuY3Rpb24gaGFuZGxlKGNhbGxiYWNrLCBsaXN0LCBuZXh0LCBzdGF0ZSkge1xuXHRcdGxpc3QucHVzaChmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSBuZXh0KHZhbHVlKVxuXHRcdFx0ZWxzZSB0cnkge3Jlc29sdmVOZXh0KGNhbGxiYWNrKHZhbHVlKSl9IGNhdGNoIChlKSB7aWYgKHJlamVjdE5leHQpIHJlamVjdE5leHQoZSl9XG5cdFx0fSlcblx0XHRpZiAodHlwZW9mIGluc3RhbmNlLnJldHJ5ID09PSBcImZ1bmN0aW9uXCIgJiYgc3RhdGUgPT09IGluc3RhbmNlLnN0YXRlKSBpbnN0YW5jZS5yZXRyeSgpXG5cdH1cblx0dmFyIHJlc29sdmVOZXh0LCByZWplY3ROZXh0XG5cdHZhciBwcm9taXNlID0gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtyZXNvbHZlTmV4dCA9IHJlc29sdmUsIHJlamVjdE5leHQgPSByZWplY3R9KVxuXHRoYW5kbGUob25GdWxmaWxsZWQsIGluc3RhbmNlLnJlc29sdmVycywgcmVzb2x2ZU5leHQsIHRydWUpLCBoYW5kbGUob25SZWplY3Rpb24sIGluc3RhbmNlLnJlamVjdG9ycywgcmVqZWN0TmV4dCwgZmFsc2UpXG5cdHJldHVybiBwcm9taXNlXG59XG5Qcm9taXNlUG9seWZpbGwucHJvdG90eXBlLmNhdGNoID0gZnVuY3Rpb24ob25SZWplY3Rpb24pIHtcblx0cmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGlvbilcbn1cblByb21pc2VQb2x5ZmlsbC5wcm90b3R5cGUuZmluYWxseSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdHJldHVybiB0aGlzLnRoZW4oXG5cdFx0ZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHJldHVybiBQcm9taXNlUG9seWZpbGwucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRcdH0pXG5cdFx0fSxcblx0XHRmdW5jdGlvbihyZWFzb24pIHtcblx0XHRcdHJldHVybiBQcm9taXNlUG9seWZpbGwucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZVBvbHlmaWxsLnJlamVjdChyZWFzb24pO1xuXHRcdFx0fSlcblx0XHR9XG5cdClcbn1cblByb21pc2VQb2x5ZmlsbC5yZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0aWYgKHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZVBvbHlmaWxsKSByZXR1cm4gdmFsdWVcblx0cmV0dXJuIG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSkge3Jlc29sdmUodmFsdWUpfSlcbn1cblByb21pc2VQb2x5ZmlsbC5yZWplY3QgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtyZWplY3QodmFsdWUpfSlcbn1cblByb21pc2VQb2x5ZmlsbC5hbGwgPSBmdW5jdGlvbihsaXN0KSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdHZhciB0b3RhbCA9IGxpc3QubGVuZ3RoLCBjb3VudCA9IDAsIHZhbHVlcyA9IFtdXG5cdFx0aWYgKGxpc3QubGVuZ3RoID09PSAwKSByZXNvbHZlKFtdKVxuXHRcdGVsc2UgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQoZnVuY3Rpb24oaSkge1xuXHRcdFx0XHRmdW5jdGlvbiBjb25zdW1lKHZhbHVlKSB7XG5cdFx0XHRcdFx0Y291bnQrK1xuXHRcdFx0XHRcdHZhbHVlc1tpXSA9IHZhbHVlXG5cdFx0XHRcdFx0aWYgKGNvdW50ID09PSB0b3RhbCkgcmVzb2x2ZSh2YWx1ZXMpXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGxpc3RbaV0gIT0gbnVsbCAmJiAodHlwZW9mIGxpc3RbaV0gPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGxpc3RbaV0gPT09IFwiZnVuY3Rpb25cIikgJiYgdHlwZW9mIGxpc3RbaV0udGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0bGlzdFtpXS50aGVuKGNvbnN1bWUsIHJlamVjdClcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGNvbnN1bWUobGlzdFtpXSlcblx0XHRcdH0pKGkpXG5cdFx0fVxuXHR9KVxufVxuUHJvbWlzZVBvbHlmaWxsLnJhY2UgPSBmdW5jdGlvbihsaXN0KSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGlzdFtpXS50aGVuKHJlc29sdmUsIHJlamVjdClcblx0XHR9XG5cdH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvbWlzZVBvbHlmaWxsXG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgUHJvbWlzZVBvbHlmaWxsID0gcmVxdWlyZShcIi4vcG9seWZpbGxcIilcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0aWYgKHR5cGVvZiB3aW5kb3cuUHJvbWlzZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdHdpbmRvdy5Qcm9taXNlID0gUHJvbWlzZVBvbHlmaWxsXG5cdH0gZWxzZSBpZiAoIXdpbmRvdy5Qcm9taXNlLnByb3RvdHlwZS5maW5hbGx5KSB7XG5cdFx0d2luZG93LlByb21pc2UucHJvdG90eXBlLmZpbmFsbHkgPSBQcm9taXNlUG9seWZpbGwucHJvdG90eXBlLmZpbmFsbHlcblx0fVxuXHRtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5Qcm9taXNlXG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWwuUHJvbWlzZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdGdsb2JhbC5Qcm9taXNlID0gUHJvbWlzZVBvbHlmaWxsXG5cdH0gZWxzZSBpZiAoIWdsb2JhbC5Qcm9taXNlLnByb3RvdHlwZS5maW5hbGx5KSB7XG5cdFx0Z2xvYmFsLlByb21pc2UucHJvdG90eXBlLmZpbmFsbHkgPSBQcm9taXNlUG9seWZpbGwucHJvdG90eXBlLmZpbmFsbHlcblx0fVxuXHRtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5Qcm9taXNlXG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cyA9IFByb21pc2VQb2x5ZmlsbFxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QpIHtcblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpICE9PSBcIltvYmplY3QgT2JqZWN0XVwiKSByZXR1cm4gXCJcIlxuXG5cdHZhciBhcmdzID0gW11cblx0Zm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuXHRcdGRlc3RydWN0dXJlKGtleSwgb2JqZWN0W2tleV0pXG5cdH1cblxuXHRyZXR1cm4gYXJncy5qb2luKFwiJlwiKVxuXG5cdGZ1bmN0aW9uIGRlc3RydWN0dXJlKGtleSwgdmFsdWUpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0ZGVzdHJ1Y3R1cmUoa2V5ICsgXCJbXCIgKyBpICsgXCJdXCIsIHZhbHVlW2ldKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSBcIltvYmplY3QgT2JqZWN0XVwiKSB7XG5cdFx0XHRmb3IgKHZhciBpIGluIHZhbHVlKSB7XG5cdFx0XHRcdGRlc3RydWN0dXJlKGtleSArIFwiW1wiICsgaSArIFwiXVwiLCB2YWx1ZVtpXSlcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBhcmdzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gXCJcIiA/IFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSA6IFwiXCIpKVxuXHR9XG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0cmluZykge1xuXHRpZiAoc3RyaW5nID09PSBcIlwiIHx8IHN0cmluZyA9PSBudWxsKSByZXR1cm4ge31cblx0aWYgKHN0cmluZy5jaGFyQXQoMCkgPT09IFwiP1wiKSBzdHJpbmcgPSBzdHJpbmcuc2xpY2UoMSlcblxuXHR2YXIgZW50cmllcyA9IHN0cmluZy5zcGxpdChcIiZcIiksIGNvdW50ZXJzID0ge30sIGRhdGEgPSB7fVxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZW50cnkgPSBlbnRyaWVzW2ldLnNwbGl0KFwiPVwiKVxuXHRcdHZhciBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoZW50cnlbMF0pXG5cdFx0dmFyIHZhbHVlID0gZW50cnkubGVuZ3RoID09PSAyID8gZGVjb2RlVVJJQ29tcG9uZW50KGVudHJ5WzFdKSA6IFwiXCJcblxuXHRcdGlmICh2YWx1ZSA9PT0gXCJ0cnVlXCIpIHZhbHVlID0gdHJ1ZVxuXHRcdGVsc2UgaWYgKHZhbHVlID09PSBcImZhbHNlXCIpIHZhbHVlID0gZmFsc2VcblxuXHRcdHZhciBsZXZlbHMgPSBrZXkuc3BsaXQoL1xcXVxcWz98XFxbLylcblx0XHR2YXIgY3Vyc29yID0gZGF0YVxuXHRcdGlmIChrZXkuaW5kZXhPZihcIltcIikgPiAtMSkgbGV2ZWxzLnBvcCgpXG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBsZXZlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdHZhciBsZXZlbCA9IGxldmVsc1tqXSwgbmV4dExldmVsID0gbGV2ZWxzW2ogKyAxXVxuXHRcdFx0dmFyIGlzTnVtYmVyID0gbmV4dExldmVsID09IFwiXCIgfHwgIWlzTmFOKHBhcnNlSW50KG5leHRMZXZlbCwgMTApKVxuXHRcdFx0aWYgKGxldmVsID09PSBcIlwiKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBsZXZlbHMuc2xpY2UoMCwgaikuam9pbigpXG5cdFx0XHRcdGlmIChjb3VudGVyc1trZXldID09IG51bGwpIHtcblx0XHRcdFx0XHRjb3VudGVyc1trZXldID0gQXJyYXkuaXNBcnJheShjdXJzb3IpID8gY3Vyc29yLmxlbmd0aCA6IDBcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXZlbCA9IGNvdW50ZXJzW2tleV0rK1xuXHRcdFx0fVxuXHRcdFx0Ly8gRGlzYWxsb3cgZGlyZWN0IHByb3RvdHlwZSBwb2xsdXRpb25cblx0XHRcdGVsc2UgaWYgKGxldmVsID09PSBcIl9fcHJvdG9fX1wiKSBicmVha1xuXHRcdFx0aWYgKGogPT09IGxldmVscy5sZW5ndGggLSAxKSBjdXJzb3JbbGV2ZWxdID0gdmFsdWVcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQvLyBSZWFkIG93biBwcm9wZXJ0aWVzIGV4Y2x1c2l2ZWx5IHRvIGRpc2FsbG93IGluZGlyZWN0XG5cdFx0XHRcdC8vIHByb3RvdHlwZSBwb2xsdXRpb25cblx0XHRcdFx0dmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGN1cnNvciwgbGV2ZWwpXG5cdFx0XHRcdGlmIChkZXNjICE9IG51bGwpIGRlc2MgPSBkZXNjLnZhbHVlXG5cdFx0XHRcdGlmIChkZXNjID09IG51bGwpIGN1cnNvcltsZXZlbF0gPSBkZXNjID0gaXNOdW1iZXIgPyBbXSA6IHt9XG5cdFx0XHRcdGN1cnNvciA9IGRlc2Ncblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGRhdGFcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcmVuZGVyL3JlbmRlclwiKSh3aW5kb3cpXG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG52YXIgaHlwZXJzY3JpcHRWbm9kZSA9IHJlcXVpcmUoXCIuL2h5cGVyc2NyaXB0Vm5vZGVcIilcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dmFyIHZub2RlID0gaHlwZXJzY3JpcHRWbm9kZS5hcHBseSgwLCBhcmd1bWVudHMpXG5cblx0dm5vZGUudGFnID0gXCJbXCJcblx0dm5vZGUuY2hpbGRyZW4gPSBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbih2bm9kZS5jaGlsZHJlbilcblx0cmV0dXJuIHZub2RlXG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG52YXIgaHlwZXJzY3JpcHRWbm9kZSA9IHJlcXVpcmUoXCIuL2h5cGVyc2NyaXB0Vm5vZGVcIilcblxudmFyIHNlbGVjdG9yUGFyc2VyID0gLyg/OihefCN8XFwuKShbXiNcXC5cXFtcXF1dKykpfChcXFsoLis/KSg/Olxccyo9XFxzKihcInwnfCkoKD86XFxcXFtcIidcXF1dfC4pKj8pXFw1KT9cXF0pL2dcbnZhciBzZWxlY3RvckNhY2hlID0ge31cbnZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eVxuXG5mdW5jdGlvbiBpc0VtcHR5KG9iamVjdCkge1xuXHRmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSBpZiAoaGFzT3duLmNhbGwob2JqZWN0LCBrZXkpKSByZXR1cm4gZmFsc2Vcblx0cmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gY29tcGlsZVNlbGVjdG9yKHNlbGVjdG9yKSB7XG5cdHZhciBtYXRjaCwgdGFnID0gXCJkaXZcIiwgY2xhc3NlcyA9IFtdLCBhdHRycyA9IHt9XG5cdHdoaWxlIChtYXRjaCA9IHNlbGVjdG9yUGFyc2VyLmV4ZWMoc2VsZWN0b3IpKSB7XG5cdFx0dmFyIHR5cGUgPSBtYXRjaFsxXSwgdmFsdWUgPSBtYXRjaFsyXVxuXHRcdGlmICh0eXBlID09PSBcIlwiICYmIHZhbHVlICE9PSBcIlwiKSB0YWcgPSB2YWx1ZVxuXHRcdGVsc2UgaWYgKHR5cGUgPT09IFwiI1wiKSBhdHRycy5pZCA9IHZhbHVlXG5cdFx0ZWxzZSBpZiAodHlwZSA9PT0gXCIuXCIpIGNsYXNzZXMucHVzaCh2YWx1ZSlcblx0XHRlbHNlIGlmIChtYXRjaFszXVswXSA9PT0gXCJbXCIpIHtcblx0XHRcdHZhciBhdHRyVmFsdWUgPSBtYXRjaFs2XVxuXHRcdFx0aWYgKGF0dHJWYWx1ZSkgYXR0clZhbHVlID0gYXR0clZhbHVlLnJlcGxhY2UoL1xcXFwoW1wiJ10pL2csIFwiJDFcIikucmVwbGFjZSgvXFxcXFxcXFwvZywgXCJcXFxcXCIpXG5cdFx0XHRpZiAobWF0Y2hbNF0gPT09IFwiY2xhc3NcIikgY2xhc3Nlcy5wdXNoKGF0dHJWYWx1ZSlcblx0XHRcdGVsc2UgYXR0cnNbbWF0Y2hbNF1dID0gYXR0clZhbHVlID09PSBcIlwiID8gYXR0clZhbHVlIDogYXR0clZhbHVlIHx8IHRydWVcblx0XHR9XG5cdH1cblx0aWYgKGNsYXNzZXMubGVuZ3RoID4gMCkgYXR0cnMuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKFwiIFwiKVxuXHRyZXR1cm4gc2VsZWN0b3JDYWNoZVtzZWxlY3Rvcl0gPSB7dGFnOiB0YWcsIGF0dHJzOiBhdHRyc31cbn1cblxuZnVuY3Rpb24gZXhlY1NlbGVjdG9yKHN0YXRlLCB2bm9kZSkge1xuXHR2YXIgYXR0cnMgPSB2bm9kZS5hdHRyc1xuXHR2YXIgY2hpbGRyZW4gPSBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbih2bm9kZS5jaGlsZHJlbilcblx0dmFyIGhhc0NsYXNzID0gaGFzT3duLmNhbGwoYXR0cnMsIFwiY2xhc3NcIilcblx0dmFyIGNsYXNzTmFtZSA9IGhhc0NsYXNzID8gYXR0cnMuY2xhc3MgOiBhdHRycy5jbGFzc05hbWVcblxuXHR2bm9kZS50YWcgPSBzdGF0ZS50YWdcblx0dm5vZGUuYXR0cnMgPSBudWxsXG5cdHZub2RlLmNoaWxkcmVuID0gdW5kZWZpbmVkXG5cblx0aWYgKCFpc0VtcHR5KHN0YXRlLmF0dHJzKSAmJiAhaXNFbXB0eShhdHRycykpIHtcblx0XHR2YXIgbmV3QXR0cnMgPSB7fVxuXG5cdFx0Zm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoYXR0cnMsIGtleSkpIG5ld0F0dHJzW2tleV0gPSBhdHRyc1trZXldXG5cdFx0fVxuXG5cdFx0YXR0cnMgPSBuZXdBdHRyc1xuXHR9XG5cblx0Zm9yICh2YXIga2V5IGluIHN0YXRlLmF0dHJzKSB7XG5cdFx0aWYgKGhhc093bi5jYWxsKHN0YXRlLmF0dHJzLCBrZXkpICYmIGtleSAhPT0gXCJjbGFzc05hbWVcIiAmJiAhaGFzT3duLmNhbGwoYXR0cnMsIGtleSkpe1xuXHRcdFx0YXR0cnNba2V5XSA9IHN0YXRlLmF0dHJzW2tleV1cblx0XHR9XG5cdH1cblx0aWYgKGNsYXNzTmFtZSAhPSBudWxsIHx8IHN0YXRlLmF0dHJzLmNsYXNzTmFtZSAhPSBudWxsKSBhdHRycy5jbGFzc05hbWUgPVxuXHRcdGNsYXNzTmFtZSAhPSBudWxsXG5cdFx0XHQ/IHN0YXRlLmF0dHJzLmNsYXNzTmFtZSAhPSBudWxsXG5cdFx0XHRcdD8gU3RyaW5nKHN0YXRlLmF0dHJzLmNsYXNzTmFtZSkgKyBcIiBcIiArIFN0cmluZyhjbGFzc05hbWUpXG5cdFx0XHRcdDogY2xhc3NOYW1lXG5cdFx0XHQ6IHN0YXRlLmF0dHJzLmNsYXNzTmFtZSAhPSBudWxsXG5cdFx0XHRcdD8gc3RhdGUuYXR0cnMuY2xhc3NOYW1lXG5cdFx0XHRcdDogbnVsbFxuXG5cdGlmIChoYXNDbGFzcykgYXR0cnMuY2xhc3MgPSBudWxsXG5cblx0Zm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG5cdFx0aWYgKGhhc093bi5jYWxsKGF0dHJzLCBrZXkpICYmIGtleSAhPT0gXCJrZXlcIikge1xuXHRcdFx0dm5vZGUuYXR0cnMgPSBhdHRyc1xuXHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblxuXHRpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiYgY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIGNoaWxkcmVuWzBdICE9IG51bGwgJiYgY2hpbGRyZW5bMF0udGFnID09PSBcIiNcIikge1xuXHRcdHZub2RlLnRleHQgPSBjaGlsZHJlblswXS5jaGlsZHJlblxuXHR9IGVsc2Uge1xuXHRcdHZub2RlLmNoaWxkcmVuID0gY2hpbGRyZW5cblx0fVxuXG5cdHJldHVybiB2bm9kZVxufVxuXG5mdW5jdGlvbiBoeXBlcnNjcmlwdChzZWxlY3Rvcikge1xuXHRpZiAoc2VsZWN0b3IgPT0gbnVsbCB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHNlbGVjdG9yICE9PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIHNlbGVjdG9yLnZpZXcgIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdHRocm93IEVycm9yKFwiVGhlIHNlbGVjdG9yIG11c3QgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGEgY29tcG9uZW50LlwiKTtcblx0fVxuXG5cdHZhciB2bm9kZSA9IGh5cGVyc2NyaXB0Vm5vZGUuYXBwbHkoMSwgYXJndW1lbnRzKVxuXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIpIHtcblx0XHR2bm9kZS5jaGlsZHJlbiA9IFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKHZub2RlLmNoaWxkcmVuKVxuXHRcdGlmIChzZWxlY3RvciAhPT0gXCJbXCIpIHJldHVybiBleGVjU2VsZWN0b3Ioc2VsZWN0b3JDYWNoZVtzZWxlY3Rvcl0gfHwgY29tcGlsZVNlbGVjdG9yKHNlbGVjdG9yKSwgdm5vZGUpXG5cdH1cblxuXHR2bm9kZS50YWcgPSBzZWxlY3RvclxuXHRyZXR1cm4gdm5vZGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoeXBlcnNjcmlwdFxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFZub2RlID0gcmVxdWlyZShcIi4uL3JlbmRlci92bm9kZVwiKVxuXG4vLyBDYWxsIHZpYSBgaHlwZXJzY3JpcHRWbm9kZS5hcHBseShzdGFydE9mZnNldCwgYXJndW1lbnRzKWBcbi8vXG4vLyBUaGUgcmVhc29uIEkgZG8gaXQgdGhpcyB3YXksIGZvcndhcmRpbmcgdGhlIGFyZ3VtZW50cyBhbmQgcGFzc2luZyB0aGUgc3RhcnRcbi8vIG9mZnNldCBpbiBgdGhpc2AsIGlzIHNvIEkgZG9uJ3QgaGF2ZSB0byBjcmVhdGUgYSB0ZW1wb3JhcnkgYXJyYXkgaW4gYVxuLy8gcGVyZm9ybWFuY2UtY3JpdGljYWwgcGF0aC5cbi8vXG4vLyBJbiBuYXRpdmUgRVM2LCBJJ2QgaW5zdGVhZCBhZGQgYSBmaW5hbCBgLi4uYXJnc2AgcGFyYW1ldGVyIHRvIHRoZVxuLy8gYGh5cGVyc2NyaXB0YCBhbmQgYGZyYWdtZW50YCBmYWN0b3JpZXMgYW5kIGRlZmluZSB0aGlzIGFzXG4vLyBgaHlwZXJzY3JpcHRWbm9kZSguLi5hcmdzKWAsIHNpbmNlIG1vZGVybiBlbmdpbmVzIGRvIG9wdGltaXplIHRoYXQgYXdheS4gQnV0XG4vLyBFUzUgKHdoYXQgTWl0aHJpbCByZXF1aXJlcyB0aGFua3MgdG8gSUUgc3VwcG9ydCkgZG9lc24ndCBnaXZlIG1lIHRoYXQgbHV4dXJ5LFxuLy8gYW5kIGVuZ2luZXMgYXJlbid0IG5lYXJseSBpbnRlbGxpZ2VudCBlbm91Z2ggdG8gZG8gZWl0aGVyIG9mIHRoZXNlOlxuLy9cbi8vIDEuIEVsaWRlIHRoZSBhbGxvY2F0aW9uIGZvciBgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpYCB3aGVuIGl0J3MgcGFzc2VkIHRvXG4vLyAgICBhbm90aGVyIGZ1bmN0aW9uIG9ubHkgdG8gYmUgaW5kZXhlZC5cbi8vIDIuIEVsaWRlIGFuIGBhcmd1bWVudHNgIGFsbG9jYXRpb24gd2hlbiBpdCdzIHBhc3NlZCB0byBhbnkgZnVuY3Rpb24gb3RoZXJcbi8vICAgIHRoYW4gYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAgb3IgYFJlZmxlY3QuYXBwbHlgLlxuLy9cbi8vIEluIEVTNiwgaXQnZCBwcm9iYWJseSBsb29rIGNsb3NlciB0byB0aGlzIChJJ2QgbmVlZCB0byBwcm9maWxlIGl0LCB0aG91Z2gpOlxuLy8gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhdHRycywgLi4uY2hpbGRyZW4pIHtcbi8vICAgICBpZiAoYXR0cnMgPT0gbnVsbCB8fCB0eXBlb2YgYXR0cnMgPT09IFwib2JqZWN0XCIgJiYgYXR0cnMudGFnID09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkoYXR0cnMpKSB7XG4vLyAgICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShjaGlsZHJlblswXSkpIGNoaWxkcmVuID0gY2hpbGRyZW5bMF1cbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLmxlbmd0aCA9PT0gMCAmJiBBcnJheS5pc0FycmF5KGF0dHJzKSA/IGF0dHJzIDogW2F0dHJzLCAuLi5jaGlsZHJlbl1cbi8vICAgICAgICAgYXR0cnMgPSB1bmRlZmluZWRcbi8vICAgICB9XG4vL1xuLy8gICAgIGlmIChhdHRycyA9PSBudWxsKSBhdHRycyA9IHt9XG4vLyAgICAgcmV0dXJuIFZub2RlKFwiXCIsIGF0dHJzLmtleSwgYXR0cnMsIGNoaWxkcmVuKVxuLy8gfVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dmFyIGF0dHJzID0gYXJndW1lbnRzW3RoaXNdLCBzdGFydCA9IHRoaXMgKyAxLCBjaGlsZHJlblxuXG5cdGlmIChhdHRycyA9PSBudWxsKSB7XG5cdFx0YXR0cnMgPSB7fVxuXHR9IGVsc2UgaWYgKHR5cGVvZiBhdHRycyAhPT0gXCJvYmplY3RcIiB8fCBhdHRycy50YWcgIT0gbnVsbCB8fCBBcnJheS5pc0FycmF5KGF0dHJzKSkge1xuXHRcdGF0dHJzID0ge31cblx0XHRzdGFydCA9IHRoaXNcblx0fVxuXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSBzdGFydCArIDEpIHtcblx0XHRjaGlsZHJlbiA9IGFyZ3VtZW50c1tzdGFydF1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSBjaGlsZHJlbiA9IFtjaGlsZHJlbl1cblx0fSBlbHNlIHtcblx0XHRjaGlsZHJlbiA9IFtdXG5cdFx0d2hpbGUgKHN0YXJ0IDwgYXJndW1lbnRzLmxlbmd0aCkgY2hpbGRyZW4ucHVzaChhcmd1bWVudHNbc3RhcnQrK10pXG5cdH1cblxuXHRyZXR1cm4gVm5vZGUoXCJcIiwgYXR0cnMua2V5LCBhdHRycywgY2hpbGRyZW4pXG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHdpbmRvdykge1xuXHR2YXIgJGRvYyA9ICR3aW5kb3cgJiYgJHdpbmRvdy5kb2N1bWVudFxuXHR2YXIgY3VycmVudFJlZHJhd1xuXG5cdHZhciBuYW1lU3BhY2UgPSB7XG5cdFx0c3ZnOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG5cdFx0bWF0aDogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCJcblx0fVxuXG5cdGZ1bmN0aW9uIGdldE5hbWVTcGFjZSh2bm9kZSkge1xuXHRcdHJldHVybiB2bm9kZS5hdHRycyAmJiB2bm9kZS5hdHRycy54bWxucyB8fCBuYW1lU3BhY2Vbdm5vZGUudGFnXVxuXHR9XG5cblx0Ly9zYW5pdHkgY2hlY2sgdG8gZGlzY291cmFnZSBwZW9wbGUgZnJvbSBkb2luZyBgdm5vZGUuc3RhdGUgPSAuLi5gXG5cdGZ1bmN0aW9uIGNoZWNrU3RhdGUodm5vZGUsIG9yaWdpbmFsKSB7XG5cdFx0aWYgKHZub2RlLnN0YXRlICE9PSBvcmlnaW5hbCkgdGhyb3cgbmV3IEVycm9yKFwiYHZub2RlLnN0YXRlYCBtdXN0IG5vdCBiZSBtb2RpZmllZFwiKVxuXHR9XG5cblx0Ly9Ob3RlOiB0aGUgaG9vayBpcyBwYXNzZWQgYXMgdGhlIGB0aGlzYCBhcmd1bWVudCB0byBhbGxvdyBwcm94eWluZyB0aGVcblx0Ly9hcmd1bWVudHMgd2l0aG91dCByZXF1aXJpbmcgYSBmdWxsIGFycmF5IGFsbG9jYXRpb24gdG8gZG8gc28uIEl0IGFsc29cblx0Ly90YWtlcyBhZHZhbnRhZ2Ugb2YgdGhlIGZhY3QgdGhlIGN1cnJlbnQgYHZub2RlYCBpcyB0aGUgZmlyc3QgYXJndW1lbnQgaW5cblx0Ly9hbGwgbGlmZWN5Y2xlIG1ldGhvZHMuXG5cdGZ1bmN0aW9uIGNhbGxIb29rKHZub2RlKSB7XG5cdFx0dmFyIG9yaWdpbmFsID0gdm5vZGUuc3RhdGVcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIHRoaXMuYXBwbHkob3JpZ2luYWwsIGFyZ3VtZW50cylcblx0XHR9IGZpbmFsbHkge1xuXHRcdFx0Y2hlY2tTdGF0ZSh2bm9kZSwgb3JpZ2luYWwpXG5cdFx0fVxuXHR9XG5cblx0Ly8gSUUxMSAoYXQgbGVhc3QpIHRocm93cyBhbiBVbnNwZWNpZmllZEVycm9yIHdoZW4gYWNjZXNzaW5nIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgd2hlblxuXHQvLyBpbnNpZGUgYW4gaWZyYW1lLiBDYXRjaCBhbmQgc3dhbGxvdyB0aGlzIGVycm9yLCBhbmQgaGVhdnktaGFuZGlkbHkgcmV0dXJuIG51bGwuXG5cdGZ1bmN0aW9uIGFjdGl2ZUVsZW1lbnQoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiAkZG9jLmFjdGl2ZUVsZW1lbnRcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblx0fVxuXHQvL2NyZWF0ZVxuXHRmdW5jdGlvbiBjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIGVuZCwgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG5cdFx0XHR2YXIgdm5vZGUgPSB2bm9kZXNbaV1cblx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSB7XG5cdFx0XHRcdGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIHRhZyA9IHZub2RlLnRhZ1xuXHRcdGlmICh0eXBlb2YgdGFnID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHR2bm9kZS5zdGF0ZSA9IHt9XG5cdFx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCkgaW5pdExpZmVjeWNsZSh2bm9kZS5hdHRycywgdm5vZGUsIGhvb2tzKVxuXHRcdFx0c3dpdGNoICh0YWcpIHtcblx0XHRcdFx0Y2FzZSBcIiNcIjogY3JlYXRlVGV4dChwYXJlbnQsIHZub2RlLCBuZXh0U2libGluZyk7IGJyZWFrXG5cdFx0XHRcdGNhc2UgXCI8XCI6IGNyZWF0ZUhUTUwocGFyZW50LCB2bm9kZSwgbnMsIG5leHRTaWJsaW5nKTsgYnJlYWtcblx0XHRcdFx0Y2FzZSBcIltcIjogY3JlYXRlRnJhZ21lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZyk7IGJyZWFrXG5cdFx0XHRcdGRlZmF1bHQ6IGNyZWF0ZUVsZW1lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBjcmVhdGVDb21wb25lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVUZXh0KHBhcmVudCwgdm5vZGUsIG5leHRTaWJsaW5nKSB7XG5cdFx0dm5vZGUuZG9tID0gJGRvYy5jcmVhdGVUZXh0Tm9kZSh2bm9kZS5jaGlsZHJlbilcblx0XHRpbnNlcnROb2RlKHBhcmVudCwgdm5vZGUuZG9tLCBuZXh0U2libGluZylcblx0fVxuXHR2YXIgcG9zc2libGVQYXJlbnRzID0ge2NhcHRpb246IFwidGFibGVcIiwgdGhlYWQ6IFwidGFibGVcIiwgdGJvZHk6IFwidGFibGVcIiwgdGZvb3Q6IFwidGFibGVcIiwgdHI6IFwidGJvZHlcIiwgdGg6IFwidHJcIiwgdGQ6IFwidHJcIiwgY29sZ3JvdXA6IFwidGFibGVcIiwgY29sOiBcImNvbGdyb3VwXCJ9XG5cdGZ1bmN0aW9uIGNyZWF0ZUhUTUwocGFyZW50LCB2bm9kZSwgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIG1hdGNoID0gdm5vZGUuY2hpbGRyZW4ubWF0Y2goL15cXHMqPzwoXFx3KykvaW0pIHx8IFtdXG5cdFx0Ly8gbm90IHVzaW5nIHRoZSBwcm9wZXIgcGFyZW50IG1ha2VzIHRoZSBjaGlsZCBlbGVtZW50KHMpIHZhbmlzaC5cblx0XHQvLyAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcblx0XHQvLyAgICAgZGl2LmlubmVySFRNTCA9IFwiPHRkPmk8L3RkPjx0ZD5qPC90ZD5cIlxuXHRcdC8vICAgICBjb25zb2xlLmxvZyhkaXYuaW5uZXJIVE1MKVxuXHRcdC8vIC0tPiBcImlqXCIsIG5vIDx0ZD4gaW4gc2lnaHQuXG5cdFx0dmFyIHRlbXAgPSAkZG9jLmNyZWF0ZUVsZW1lbnQocG9zc2libGVQYXJlbnRzW21hdGNoWzFdXSB8fCBcImRpdlwiKVxuXHRcdGlmIChucyA9PT0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiKSB7XG5cdFx0XHR0ZW1wLmlubmVySFRNTCA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPlwiICsgdm5vZGUuY2hpbGRyZW4gKyBcIjwvc3ZnPlwiXG5cdFx0XHR0ZW1wID0gdGVtcC5maXJzdENoaWxkXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRlbXAuaW5uZXJIVE1MID0gdm5vZGUuY2hpbGRyZW5cblx0XHR9XG5cdFx0dm5vZGUuZG9tID0gdGVtcC5maXJzdENoaWxkXG5cdFx0dm5vZGUuZG9tU2l6ZSA9IHRlbXAuY2hpbGROb2Rlcy5sZW5ndGhcblx0XHQvLyBDYXB0dXJlIG5vZGVzIHRvIHJlbW92ZSwgc28gd2UgZG9uJ3QgY29uZnVzZSB0aGVtLlxuXHRcdHZub2RlLmluc3RhbmNlID0gW11cblx0XHR2YXIgZnJhZ21lbnQgPSAkZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXHRcdHZhciBjaGlsZFxuXHRcdHdoaWxlIChjaGlsZCA9IHRlbXAuZmlyc3RDaGlsZCkge1xuXHRcdFx0dm5vZGUuaW5zdGFuY2UucHVzaChjaGlsZClcblx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuXHRcdH1cblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZnJhZ21lbnQsIG5leHRTaWJsaW5nKVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSAkZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXHRcdGlmICh2bm9kZS5jaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdFx0Y3JlYXRlTm9kZXMoZnJhZ21lbnQsIGNoaWxkcmVuLCAwLCBjaGlsZHJlbi5sZW5ndGgsIGhvb2tzLCBudWxsLCBucylcblx0XHR9XG5cdFx0dm5vZGUuZG9tID0gZnJhZ21lbnQuZmlyc3RDaGlsZFxuXHRcdHZub2RlLmRvbVNpemUgPSBmcmFnbWVudC5jaGlsZE5vZGVzLmxlbmd0aFxuXHRcdGluc2VydE5vZGUocGFyZW50LCBmcmFnbWVudCwgbmV4dFNpYmxpbmcpXG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlRWxlbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIHRhZyA9IHZub2RlLnRhZ1xuXHRcdHZhciBhdHRycyA9IHZub2RlLmF0dHJzXG5cdFx0dmFyIGlzID0gYXR0cnMgJiYgYXR0cnMuaXNcblxuXHRcdG5zID0gZ2V0TmFtZVNwYWNlKHZub2RlKSB8fCBuc1xuXG5cdFx0dmFyIGVsZW1lbnQgPSBucyA/XG5cdFx0XHRpcyA/ICRkb2MuY3JlYXRlRWxlbWVudE5TKG5zLCB0YWcsIHtpczogaXN9KSA6ICRkb2MuY3JlYXRlRWxlbWVudE5TKG5zLCB0YWcpIDpcblx0XHRcdGlzID8gJGRvYy5jcmVhdGVFbGVtZW50KHRhZywge2lzOiBpc30pIDogJGRvYy5jcmVhdGVFbGVtZW50KHRhZylcblx0XHR2bm9kZS5kb20gPSBlbGVtZW50XG5cblx0XHRpZiAoYXR0cnMgIT0gbnVsbCkge1xuXHRcdFx0c2V0QXR0cnModm5vZGUsIGF0dHJzLCBucylcblx0XHR9XG5cblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZWxlbWVudCwgbmV4dFNpYmxpbmcpXG5cblx0XHRpZiAoIW1heWJlU2V0Q29udGVudEVkaXRhYmxlKHZub2RlKSkge1xuXHRcdFx0aWYgKHZub2RlLnRleHQgIT0gbnVsbCkge1xuXHRcdFx0XHRpZiAodm5vZGUudGV4dCAhPT0gXCJcIikgZWxlbWVudC50ZXh0Q29udGVudCA9IHZub2RlLnRleHRcblx0XHRcdFx0ZWxzZSB2bm9kZS5jaGlsZHJlbiA9IFtWbm9kZShcIiNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHZub2RlLnRleHQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKV1cblx0XHRcdH1cblx0XHRcdGlmICh2bm9kZS5jaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHRcdHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0XHRcdGNyZWF0ZU5vZGVzKGVsZW1lbnQsIGNoaWxkcmVuLCAwLCBjaGlsZHJlbi5sZW5ndGgsIGhvb2tzLCBudWxsLCBucylcblx0XHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJzZWxlY3RcIiAmJiBhdHRycyAhPSBudWxsKSBzZXRMYXRlU2VsZWN0QXR0cnModm5vZGUsIGF0dHJzKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBpbml0Q29tcG9uZW50KHZub2RlLCBob29rcykge1xuXHRcdHZhciBzZW50aW5lbFxuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnLnZpZXcgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0dm5vZGUuc3RhdGUgPSBPYmplY3QuY3JlYXRlKHZub2RlLnRhZylcblx0XHRcdHNlbnRpbmVsID0gdm5vZGUuc3RhdGUudmlld1xuXHRcdFx0aWYgKHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkICE9IG51bGwpIHJldHVyblxuXHRcdFx0c2VudGluZWwuJCRyZWVudHJhbnRMb2NrJCQgPSB0cnVlXG5cdFx0fSBlbHNlIHtcblx0XHRcdHZub2RlLnN0YXRlID0gdm9pZCAwXG5cdFx0XHRzZW50aW5lbCA9IHZub2RlLnRhZ1xuXHRcdFx0aWYgKHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkICE9IG51bGwpIHJldHVyblxuXHRcdFx0c2VudGluZWwuJCRyZWVudHJhbnRMb2NrJCQgPSB0cnVlXG5cdFx0XHR2bm9kZS5zdGF0ZSA9ICh2bm9kZS50YWcucHJvdG90eXBlICE9IG51bGwgJiYgdHlwZW9mIHZub2RlLnRhZy5wcm90b3R5cGUudmlldyA9PT0gXCJmdW5jdGlvblwiKSA/IG5ldyB2bm9kZS50YWcodm5vZGUpIDogdm5vZGUudGFnKHZub2RlKVxuXHRcdH1cblx0XHRpbml0TGlmZWN5Y2xlKHZub2RlLnN0YXRlLCB2bm9kZSwgaG9va3MpXG5cdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwpIGluaXRMaWZlY3ljbGUodm5vZGUuYXR0cnMsIHZub2RlLCBob29rcylcblx0XHR2bm9kZS5pbnN0YW5jZSA9IFZub2RlLm5vcm1hbGl6ZShjYWxsSG9vay5jYWxsKHZub2RlLnN0YXRlLnZpZXcsIHZub2RlKSlcblx0XHRpZiAodm5vZGUuaW5zdGFuY2UgPT09IHZub2RlKSB0aHJvdyBFcnJvcihcIkEgdmlldyBjYW5ub3QgcmV0dXJuIHRoZSB2bm9kZSBpdCByZWNlaXZlZCBhcyBhcmd1bWVudFwiKVxuXHRcdHNlbnRpbmVsLiQkcmVlbnRyYW50TG9jayQkID0gbnVsbFxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0aW5pdENvbXBvbmVudCh2bm9kZSwgaG9va3MpXG5cdFx0aWYgKHZub2RlLmluc3RhbmNlICE9IG51bGwpIHtcblx0XHRcdGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZS5pbnN0YW5jZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdHZub2RlLmRvbSA9IHZub2RlLmluc3RhbmNlLmRvbVxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IHZub2RlLmRvbSAhPSBudWxsID8gdm5vZGUuaW5zdGFuY2UuZG9tU2l6ZSA6IDBcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2bm9kZS5kb21TaXplID0gMFxuXHRcdH1cblx0fVxuXG5cdC8vdXBkYXRlXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR8RnJhZ21lbnR9IHBhcmVudCAtIHRoZSBwYXJlbnQgZWxlbWVudFxuXHQgKiBAcGFyYW0ge1Zub2RlW10gfCBudWxsfSBvbGQgLSB0aGUgbGlzdCBvZiB2bm9kZXMgb2YgdGhlIGxhc3QgYHJlbmRlcigpYCBjYWxsIGZvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIHBhcnQgb2YgdGhlIHRyZWVcblx0ICogQHBhcmFtIHtWbm9kZVtdIHwgbnVsbH0gdm5vZGVzIC0gYXMgYWJvdmUsIGJ1dCBmb3IgdGhlIGN1cnJlbnQgYHJlbmRlcigpYCBjYWxsLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9uW119IGhvb2tzIC0gYW4gYWNjdW11bGF0b3Igb2YgcG9zdC1yZW5kZXIgaG9va3MgKG9uY3JlYXRlL29udXBkYXRlKVxuXHQgKiBAcGFyYW0ge0VsZW1lbnQgfCBudWxsfSBuZXh0U2libGluZyAtIHRoZSBuZXh0IERPTSBub2RlIGlmIHdlJ3JlIGRlYWxpbmcgd2l0aCBhXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQgdGhhdCBpcyBub3QgdGhlIGxhc3QgaXRlbSBpbiBpdHNcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRcblx0ICogQHBhcmFtIHsnc3ZnJyB8ICdtYXRoJyB8IFN0cmluZyB8IG51bGx9IG5zKSAtIHRoZSBjdXJyZW50IFhNTCBuYW1lc3BhY2UsIGlmIGFueVxuXHQgKiBAcmV0dXJucyB2b2lkXG5cdCAqL1xuXHQvLyBUaGlzIGZ1bmN0aW9uIGRpZmZzIGFuZCBwYXRjaGVzIGxpc3RzIG9mIHZub2RlcywgYm90aCBrZXllZCBhbmQgdW5rZXllZC5cblx0Ly9cblx0Ly8gV2Ugd2lsbDpcblx0Ly9cblx0Ly8gMS4gZGVzY3JpYmUgaXRzIGdlbmVyYWwgc3RydWN0dXJlXG5cdC8vIDIuIGZvY3VzIG9uIHRoZSBkaWZmIGFsZ29yaXRobSBvcHRpbWl6YXRpb25zXG5cdC8vIDMuIGRpc2N1c3MgRE9NIG5vZGUgb3BlcmF0aW9ucy5cblxuXHQvLyAjIyBPdmVydmlldzpcblx0Ly9cblx0Ly8gVGhlIHVwZGF0ZU5vZGVzKCkgZnVuY3Rpb246XG5cdC8vIC0gZGVhbHMgd2l0aCB0cml2aWFsIGNhc2VzXG5cdC8vIC0gZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBsaXN0cyBhcmUga2V5ZWQgb3IgdW5rZXllZCBiYXNlZCBvbiB0aGUgZmlyc3Qgbm9uLW51bGwgbm9kZVxuXHQvLyAgIG9mIGVhY2ggbGlzdC5cblx0Ly8gLSBkaWZmcyB0aGVtIGFuZCBwYXRjaGVzIHRoZSBET00gaWYgbmVlZGVkICh0aGF0J3MgdGhlIGJydW50IG9mIHRoZSBjb2RlKVxuXHQvLyAtIG1hbmFnZXMgdGhlIGxlZnRvdmVyczogYWZ0ZXIgZGlmZmluZywgYXJlIHRoZXJlOlxuXHQvLyAgIC0gb2xkIG5vZGVzIGxlZnQgdG8gcmVtb3ZlP1xuXHQvLyBcdCAtIG5ldyBub2RlcyB0byBpbnNlcnQ/XG5cdC8vIFx0IGRlYWwgd2l0aCB0aGVtIVxuXHQvL1xuXHQvLyBUaGUgbGlzdHMgYXJlIG9ubHkgaXRlcmF0ZWQgb3ZlciBvbmNlLCB3aXRoIGFuIGV4Y2VwdGlvbiBmb3IgdGhlIG5vZGVzIGluIGBvbGRgIHRoYXRcblx0Ly8gYXJlIHZpc2l0ZWQgaW4gdGhlIGZvdXJ0aCBwYXJ0IG9mIHRoZSBkaWZmIGFuZCBpbiB0aGUgYHJlbW92ZU5vZGVzYCBsb29wLlxuXG5cdC8vICMjIERpZmZpbmdcblx0Ly9cblx0Ly8gUmVhZGluZyBodHRwczovL2dpdGh1Yi5jb20vbG9jYWx2b2lkL2l2aS9ibG9iL2RkYzA5ZDA2YWJhZWY0NTI0OGU2MTMzZjcwNDBkMDBkM2M2YmU4NTMvcGFja2FnZXMvaXZpL3NyYy92ZG9tL2ltcGxlbWVudGF0aW9uLnRzI0w2MTctTDgzN1xuXHQvLyBtYXkgYmUgZ29vZCBmb3IgY29udGV4dCBvbiBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UtYmFzZWQgbG9naWMgZm9yIG1vdmluZyBub2Rlcy5cblx0Ly9cblx0Ly8gSW4gb3JkZXIgdG8gZGlmZiBrZXllZCBsaXN0cywgb25lIGhhcyB0b1xuXHQvL1xuXHQvLyAxKSBtYXRjaCBub2RlcyBpbiBib3RoIGxpc3RzLCBwZXIga2V5LCBhbmQgdXBkYXRlIHRoZW0gYWNjb3JkaW5nbHlcblx0Ly8gMikgY3JlYXRlIHRoZSBub2RlcyBwcmVzZW50IGluIHRoZSBuZXcgbGlzdCwgYnV0IGFic2VudCBpbiB0aGUgb2xkIG9uZVxuXHQvLyAzKSByZW1vdmUgdGhlIG5vZGVzIHByZXNlbnQgaW4gdGhlIG9sZCBsaXN0LCBidXQgYWJzZW50IGluIHRoZSBuZXcgb25lXG5cdC8vIDQpIGZpZ3VyZSBvdXQgd2hhdCBub2RlcyBpbiAxKSB0byBtb3ZlIGluIG9yZGVyIHRvIG1pbmltaXplIHRoZSBET00gb3BlcmF0aW9ucy5cblx0Ly9cblx0Ly8gVG8gYWNoaWV2ZSAxKSBvbmUgY2FuIGNyZWF0ZSBhIGRpY3Rpb25hcnkgb2Yga2V5cyA9PiBpbmRleCAoZm9yIHRoZSBvbGQgbGlzdCksIHRoZW4gaXRlcmF0ZVxuXHQvLyBvdmVyIHRoZSBuZXcgbGlzdCBhbmQgZm9yIGVhY2ggbmV3IHZub2RlLCBmaW5kIHRoZSBjb3JyZXNwb25kaW5nIHZub2RlIGluIHRoZSBvbGQgbGlzdCB1c2luZ1xuXHQvLyB0aGUgbWFwLlxuXHQvLyAyKSBpcyBhY2hpZXZlZCBpbiB0aGUgc2FtZSBzdGVwOiBpZiBhIG5ldyBub2RlIGhhcyBubyBjb3JyZXNwb25kaW5nIGVudHJ5IGluIHRoZSBtYXAsIGl0IGlzIG5ld1xuXHQvLyBhbmQgbXVzdCBiZSBjcmVhdGVkLlxuXHQvLyBGb3IgdGhlIHJlbW92YWxzLCB3ZSBhY3R1YWxseSByZW1vdmUgdGhlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIHVwZGF0ZWQgZnJvbSB0aGUgb2xkIGxpc3QuXG5cdC8vIFRoZSBub2RlcyB0aGF0IHJlbWFpbiBpbiB0aGF0IGxpc3QgYWZ0ZXIgMSkgYW5kIDIpIGhhdmUgYmVlbiBwZXJmb3JtZWQgY2FuIGJlIHNhZmVseSByZW1vdmVkLlxuXHQvLyBUaGUgZm91cnRoIHN0ZXAgaXMgYSBiaXQgbW9yZSBjb21wbGV4IGFuZCByZWxpZXMgb24gdGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSAoTElTKVxuXHQvLyBhbGdvcml0aG0uXG5cdC8vXG5cdC8vIHRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UgaXMgdGhlIGxpc3Qgb2Ygbm9kZXMgdGhhdCBjYW4gcmVtYWluIGluIHBsYWNlLiBJbWFnaW5lIGdvaW5nXG5cdC8vIGZyb20gYDEsMiwzLDQsNWAgdG8gYDQsNSwxLDIsM2Agd2hlcmUgdGhlIG51bWJlcnMgYXJlIG5vdCBuZWNlc3NhcmlseSB0aGUga2V5cywgYnV0IHRoZSBpbmRpY2VzXG5cdC8vIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGtleWVkIG5vZGVzIGluIHRoZSBvbGQgbGlzdCAoa2V5ZWQgbm9kZXMgYGUsZCxjLGIsYWAgPT4gYGIsYSxlLGQsY2Agd291bGRcblx0Ly8gIG1hdGNoIHRoZSBhYm92ZSBsaXN0cywgZm9yIGV4YW1wbGUpLlxuXHQvL1xuXHQvLyBJbiB0aGVyZSBhcmUgdHdvIGluY3JlYXNpbmcgc3Vic2VxdWVuY2VzOiBgNCw1YCBhbmQgYDEsMiwzYCwgdGhlIGxhdHRlciBiZWluZyB0aGUgbG9uZ2VzdC4gV2Vcblx0Ly8gY2FuIHVwZGF0ZSB0aG9zZSBub2RlcyB3aXRob3V0IG1vdmluZyB0aGVtLCBhbmQgb25seSBjYWxsIGBpbnNlcnROb2RlYCBvbiBgNGAgYW5kIGA1YC5cblx0Ly9cblx0Ly8gQGxvY2Fsdm9pZCBhZGFwdGVkIHRoZSBhbGdvIHRvIGFsc28gc3VwcG9ydCBub2RlIGRlbGV0aW9ucyBhbmQgaW5zZXJ0aW9ucyAodGhlIGBsaXNgIGlzIGFjdHVhbGx5XG5cdC8vIHRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UgKm9mIG9sZCBub2RlcyBzdGlsbCBwcmVzZW50IGluIHRoZSBuZXcgbGlzdCopLlxuXHQvL1xuXHQvLyBJdCBpcyBhIGdlbmVyYWwgYWxnb3JpdGhtIHRoYXQgaXMgZmlyZXByb29mIGluIGFsbCBjaXJjdW1zdGFuY2VzLCBidXQgaXQgcmVxdWlyZXMgdGhlIGFsbG9jYXRpb25cblx0Ly8gYW5kIHRoZSBjb25zdHJ1Y3Rpb24gb2YgYSBga2V5ID0+IG9sZEluZGV4YCBtYXAsIGFuZCB0aHJlZSBhcnJheXMgKG9uZSB3aXRoIGBuZXdJbmRleCA9PiBvbGRJbmRleGAsXG5cdC8vIHRoZSBgTElTYCBhbmQgYSB0ZW1wb3Jhcnkgb25lIHRvIGNyZWF0ZSB0aGUgTElTKS5cblx0Ly9cblx0Ly8gU28gd2UgY2hlYXQgd2hlcmUgd2UgY2FuOiBpZiB0aGUgdGFpbHMgb2YgdGhlIGxpc3RzIGFyZSBpZGVudGljYWwsIHRoZXkgYXJlIGd1YXJhbnRlZWQgdG8gYmUgcGFydCBvZlxuXHQvLyB0aGUgTElTIGFuZCBjYW4gYmUgdXBkYXRlZCB3aXRob3V0IG1vdmluZyB0aGVtLlxuXHQvL1xuXHQvLyBJZiB0d28gbm9kZXMgYXJlIHN3YXBwZWQsIHRoZXkgYXJlIGd1YXJhbnRlZWQgbm90IHRvIGJlIHBhcnQgb2YgdGhlIExJUywgYW5kIG11c3QgYmUgbW92ZWQgKHdpdGhcblx0Ly8gdGhlIGV4Y2VwdGlvbiBvZiB0aGUgbGFzdCBub2RlIGlmIHRoZSBsaXN0IGlzIGZ1bGx5IHJldmVyc2VkKS5cblx0Ly9cblx0Ly8gIyMgRmluZGluZyB0aGUgbmV4dCBzaWJsaW5nLlxuXHQvL1xuXHQvLyBgdXBkYXRlTm9kZSgpYCBhbmQgYGNyZWF0ZU5vZGUoKWAgZXhwZWN0IGEgbmV4dFNpYmxpbmcgcGFyYW1ldGVyIHRvIHBlcmZvcm0gRE9NIG9wZXJhdGlvbnMuXG5cdC8vIFdoZW4gdGhlIGxpc3QgaXMgYmVpbmcgdHJhdmVyc2VkIHRvcC1kb3duLCBhdCBhbnkgaW5kZXgsIHRoZSBET00gbm9kZXMgdXAgdG8gdGhlIHByZXZpb3VzXG5cdC8vIHZub2RlIHJlZmxlY3QgdGhlIGNvbnRlbnQgb2YgdGhlIG5ldyBsaXN0LCB3aGVyZWFzIHRoZSByZXN0IG9mIHRoZSBET00gbm9kZXMgcmVmbGVjdCB0aGUgb2xkXG5cdC8vIGxpc3QuIFRoZSBuZXh0IHNpYmxpbmcgbXVzdCBiZSBsb29rZWQgZm9yIGluIHRoZSBvbGQgbGlzdCB1c2luZyBgZ2V0TmV4dFNpYmxpbmcoLi4uIG9sZFN0YXJ0ICsgMSAuLi4pYC5cblx0Ly9cblx0Ly8gSW4gdGhlIG90aGVyIHNjZW5hcmlvcyAoc3dhcHMsIHVwd2FyZHMgdHJhdmVyc2FsLCBtYXAtYmFzZWQgZGlmZiksXG5cdC8vIHRoZSBuZXcgdm5vZGVzIGxpc3QgaXMgdHJhdmVyc2VkIHVwd2FyZHMuIFRoZSBET00gbm9kZXMgYXQgdGhlIGJvdHRvbSBvZiB0aGUgbGlzdCByZWZsZWN0IHRoZVxuXHQvLyBib3R0b20gcGFydCBvZiB0aGUgbmV3IHZub2RlcyBsaXN0LCBhbmQgd2UgY2FuIHVzZSB0aGUgYHYuZG9tYCAgdmFsdWUgb2YgdGhlIHByZXZpb3VzIG5vZGVcblx0Ly8gYXMgdGhlIG5leHQgc2libGluZyAoY2FjaGVkIGluIHRoZSBgbmV4dFNpYmxpbmdgIHZhcmlhYmxlKS5cblxuXG5cdC8vICMjIERPTSBub2RlIG1vdmVzXG5cdC8vXG5cdC8vIEluIG1vc3Qgc2NlbmFyaW9zIGB1cGRhdGVOb2RlKClgIGFuZCBgY3JlYXRlTm9kZSgpYCBwZXJmb3JtIHRoZSBET00gb3BlcmF0aW9ucy4gSG93ZXZlcixcblx0Ly8gdGhpcyBpcyBub3QgdGhlIGNhc2UgaWYgdGhlIG5vZGUgbW92ZWQgKHNlY29uZCBhbmQgZm91cnRoIHBhcnQgb2YgdGhlIGRpZmYgYWxnbykuIFdlIG1vdmVcblx0Ly8gdGhlIG9sZCBET00gbm9kZXMgYmVmb3JlIHVwZGF0ZU5vZGUgcnVucyBiZWNhdXNlIGl0IGVuYWJsZXMgdXMgdG8gdXNlIHRoZSBjYWNoZWQgYG5leHRTaWJsaW5nYFxuXHQvLyB2YXJpYWJsZSByYXRoZXIgdGhhbiBmZXRjaGluZyBpdCB1c2luZyBgZ2V0TmV4dFNpYmxpbmcoKWAuXG5cdC8vXG5cdC8vIFRoZSBmb3VydGggcGFydCBvZiB0aGUgZGlmZiBjdXJyZW50bHkgaW5zZXJ0cyBub2RlcyB1bmNvbmRpdGlvbmFsbHksIGxlYWRpbmcgdG8gaXNzdWVzXG5cdC8vIGxpa2UgIzE3OTEgYW5kICMxOTk5LiBXZSBuZWVkIHRvIGJlIHNtYXJ0ZXIgYWJvdXQgdGhvc2Ugc2l0dWF0aW9ucyB3aGVyZSBhZGphc2NlbnQgb2xkXG5cdC8vIG5vZGVzIHJlbWFpbiB0b2dldGhlciBpbiB0aGUgbmV3IGxpc3QgaW4gYSB3YXkgdGhhdCBpc24ndCBjb3ZlcmVkIGJ5IHBhcnRzIG9uZSBhbmRcblx0Ly8gdGhyZWUgb2YgdGhlIGRpZmYgYWxnby5cblxuXHRmdW5jdGlvbiB1cGRhdGVOb2RlcyhwYXJlbnQsIG9sZCwgdm5vZGVzLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKSB7XG5cdFx0aWYgKG9sZCA9PT0gdm5vZGVzIHx8IG9sZCA9PSBudWxsICYmIHZub2RlcyA9PSBudWxsKSByZXR1cm5cblx0XHRlbHNlIGlmIChvbGQgPT0gbnVsbCB8fCBvbGQubGVuZ3RoID09PSAwKSBjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2RlcywgMCwgdm5vZGVzLmxlbmd0aCwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRlbHNlIGlmICh2bm9kZXMgPT0gbnVsbCB8fCB2bm9kZXMubGVuZ3RoID09PSAwKSByZW1vdmVOb2RlcyhwYXJlbnQsIG9sZCwgMCwgb2xkLmxlbmd0aClcblx0XHRlbHNlIHtcblx0XHRcdHZhciBpc09sZEtleWVkID0gb2xkWzBdICE9IG51bGwgJiYgb2xkWzBdLmtleSAhPSBudWxsXG5cdFx0XHR2YXIgaXNLZXllZCA9IHZub2Rlc1swXSAhPSBudWxsICYmIHZub2Rlc1swXS5rZXkgIT0gbnVsbFxuXHRcdFx0dmFyIHN0YXJ0ID0gMCwgb2xkU3RhcnQgPSAwXG5cdFx0XHRpZiAoIWlzT2xkS2V5ZWQpIHdoaWxlIChvbGRTdGFydCA8IG9sZC5sZW5ndGggJiYgb2xkW29sZFN0YXJ0XSA9PSBudWxsKSBvbGRTdGFydCsrXG5cdFx0XHRpZiAoIWlzS2V5ZWQpIHdoaWxlIChzdGFydCA8IHZub2Rlcy5sZW5ndGggJiYgdm5vZGVzW3N0YXJ0XSA9PSBudWxsKSBzdGFydCsrXG5cdFx0XHRpZiAoaXNLZXllZCA9PT0gbnVsbCAmJiBpc09sZEtleWVkID09IG51bGwpIHJldHVybiAvLyBib3RoIGxpc3RzIGFyZSBmdWxsIG9mIG51bGxzXG5cdFx0XHRpZiAoaXNPbGRLZXllZCAhPT0gaXNLZXllZCkge1xuXHRcdFx0XHRyZW1vdmVOb2RlcyhwYXJlbnQsIG9sZCwgb2xkU3RhcnQsIG9sZC5sZW5ndGgpXG5cdFx0XHRcdGNyZWF0ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCBzdGFydCwgdm5vZGVzLmxlbmd0aCwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdH0gZWxzZSBpZiAoIWlzS2V5ZWQpIHtcblx0XHRcdFx0Ly8gRG9uJ3QgaW5kZXggcGFzdCB0aGUgZW5kIG9mIGVpdGhlciBsaXN0IChjYXVzZXMgZGVvcHRzKS5cblx0XHRcdFx0dmFyIGNvbW1vbkxlbmd0aCA9IG9sZC5sZW5ndGggPCB2bm9kZXMubGVuZ3RoID8gb2xkLmxlbmd0aCA6IHZub2Rlcy5sZW5ndGhcblx0XHRcdFx0Ly8gUmV3aW5kIGlmIG5lY2Vzc2FyeSB0byB0aGUgZmlyc3Qgbm9uLW51bGwgaW5kZXggb24gZWl0aGVyIHNpZGUuXG5cdFx0XHRcdC8vIFdlIGNvdWxkIGFsdGVybmF0aXZlbHkgZWl0aGVyIGV4cGxpY2l0bHkgY3JlYXRlIG9yIHJlbW92ZSBub2RlcyB3aGVuIGBzdGFydCAhPT0gb2xkU3RhcnRgXG5cdFx0XHRcdC8vIGJ1dCB0aGF0IHdvdWxkIGJlIG9wdGltaXppbmcgZm9yIHNwYXJzZSBsaXN0cyB3aGljaCBhcmUgbW9yZSByYXJlIHRoYW4gZGVuc2Ugb25lcy5cblx0XHRcdFx0c3RhcnQgPSBzdGFydCA8IG9sZFN0YXJ0ID8gc3RhcnQgOiBvbGRTdGFydFxuXHRcdFx0XHRmb3IgKDsgc3RhcnQgPCBjb21tb25MZW5ndGg7IHN0YXJ0KyspIHtcblx0XHRcdFx0XHRvID0gb2xkW3N0YXJ0XVxuXHRcdFx0XHRcdHYgPSB2bm9kZXNbc3RhcnRdXG5cdFx0XHRcdFx0aWYgKG8gPT09IHYgfHwgbyA9PSBudWxsICYmIHYgPT0gbnVsbCkgY29udGludWVcblx0XHRcdFx0XHRlbHNlIGlmIChvID09IG51bGwpIGNyZWF0ZU5vZGUocGFyZW50LCB2LCBob29rcywgbnMsIGdldE5leHRTaWJsaW5nKG9sZCwgc3RhcnQgKyAxLCBuZXh0U2libGluZykpXG5cdFx0XHRcdFx0ZWxzZSBpZiAodiA9PSBudWxsKSByZW1vdmVOb2RlKHBhcmVudCwgbylcblx0XHRcdFx0XHRlbHNlIHVwZGF0ZU5vZGUocGFyZW50LCBvLCB2LCBob29rcywgZ2V0TmV4dFNpYmxpbmcob2xkLCBzdGFydCArIDEsIG5leHRTaWJsaW5nKSwgbnMpXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG9sZC5sZW5ndGggPiBjb21tb25MZW5ndGgpIHJlbW92ZU5vZGVzKHBhcmVudCwgb2xkLCBzdGFydCwgb2xkLmxlbmd0aClcblx0XHRcdFx0aWYgKHZub2Rlcy5sZW5ndGggPiBjb21tb25MZW5ndGgpIGNyZWF0ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCBzdGFydCwgdm5vZGVzLmxlbmd0aCwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGtleWVkIGRpZmZcblx0XHRcdFx0dmFyIG9sZEVuZCA9IG9sZC5sZW5ndGggLSAxLCBlbmQgPSB2bm9kZXMubGVuZ3RoIC0gMSwgbWFwLCBvLCB2LCBvZSwgdmUsIHRvcFNpYmxpbmdcblxuXHRcdFx0XHQvLyBib3R0b20tdXBcblx0XHRcdFx0d2hpbGUgKG9sZEVuZCA+PSBvbGRTdGFydCAmJiBlbmQgPj0gc3RhcnQpIHtcblx0XHRcdFx0XHRvZSA9IG9sZFtvbGRFbmRdXG5cdFx0XHRcdFx0dmUgPSB2bm9kZXNbZW5kXVxuXHRcdFx0XHRcdGlmIChvZS5rZXkgIT09IHZlLmtleSkgYnJlYWtcblx0XHRcdFx0XHRpZiAob2UgIT09IHZlKSB1cGRhdGVOb2RlKHBhcmVudCwgb2UsIHZlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGlmICh2ZS5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2ZS5kb21cblx0XHRcdFx0XHRvbGRFbmQtLSwgZW5kLS1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyB0b3AtZG93blxuXHRcdFx0XHR3aGlsZSAob2xkRW5kID49IG9sZFN0YXJ0ICYmIGVuZCA+PSBzdGFydCkge1xuXHRcdFx0XHRcdG8gPSBvbGRbb2xkU3RhcnRdXG5cdFx0XHRcdFx0diA9IHZub2Rlc1tzdGFydF1cblx0XHRcdFx0XHRpZiAoby5rZXkgIT09IHYua2V5KSBicmVha1xuXHRcdFx0XHRcdG9sZFN0YXJ0KyssIHN0YXJ0Kytcblx0XHRcdFx0XHRpZiAobyAhPT0gdikgdXBkYXRlTm9kZShwYXJlbnQsIG8sIHYsIGhvb2tzLCBnZXROZXh0U2libGluZyhvbGQsIG9sZFN0YXJ0LCBuZXh0U2libGluZyksIG5zKVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIHN3YXBzIGFuZCBsaXN0IHJldmVyc2Fsc1xuXHRcdFx0XHR3aGlsZSAob2xkRW5kID49IG9sZFN0YXJ0ICYmIGVuZCA+PSBzdGFydCkge1xuXHRcdFx0XHRcdGlmIChzdGFydCA9PT0gZW5kKSBicmVha1xuXHRcdFx0XHRcdGlmIChvLmtleSAhPT0gdmUua2V5IHx8IG9lLmtleSAhPT0gdi5rZXkpIGJyZWFrXG5cdFx0XHRcdFx0dG9wU2libGluZyA9IGdldE5leHRTaWJsaW5nKG9sZCwgb2xkU3RhcnQsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdG1vdmVOb2RlcyhwYXJlbnQsIG9lLCB0b3BTaWJsaW5nKVxuXHRcdFx0XHRcdGlmIChvZSAhPT0gdikgdXBkYXRlTm9kZShwYXJlbnQsIG9lLCB2LCBob29rcywgdG9wU2libGluZywgbnMpXG5cdFx0XHRcdFx0aWYgKCsrc3RhcnQgPD0gLS1lbmQpIG1vdmVOb2RlcyhwYXJlbnQsIG8sIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdGlmIChvICE9PSB2ZSkgdXBkYXRlTm9kZShwYXJlbnQsIG8sIHZlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0XHRcdGlmICh2ZS5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSB2ZS5kb21cblx0XHRcdFx0XHRvbGRTdGFydCsrOyBvbGRFbmQtLVxuXHRcdFx0XHRcdG9lID0gb2xkW29sZEVuZF1cblx0XHRcdFx0XHR2ZSA9IHZub2Rlc1tlbmRdXG5cdFx0XHRcdFx0byA9IG9sZFtvbGRTdGFydF1cblx0XHRcdFx0XHR2ID0gdm5vZGVzW3N0YXJ0XVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGJvdHRvbSB1cCBvbmNlIGFnYWluXG5cdFx0XHRcdHdoaWxlIChvbGRFbmQgPj0gb2xkU3RhcnQgJiYgZW5kID49IHN0YXJ0KSB7XG5cdFx0XHRcdFx0aWYgKG9lLmtleSAhPT0gdmUua2V5KSBicmVha1xuXHRcdFx0XHRcdGlmIChvZSAhPT0gdmUpIHVwZGF0ZU5vZGUocGFyZW50LCBvZSwgdmUsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHRcdFx0aWYgKHZlLmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IHZlLmRvbVxuXHRcdFx0XHRcdG9sZEVuZC0tLCBlbmQtLVxuXHRcdFx0XHRcdG9lID0gb2xkW29sZEVuZF1cblx0XHRcdFx0XHR2ZSA9IHZub2Rlc1tlbmRdXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHN0YXJ0ID4gZW5kKSByZW1vdmVOb2RlcyhwYXJlbnQsIG9sZCwgb2xkU3RhcnQsIG9sZEVuZCArIDEpXG5cdFx0XHRcdGVsc2UgaWYgKG9sZFN0YXJ0ID4gb2xkRW5kKSBjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIGVuZCArIDEsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdC8vIGluc3BpcmVkIGJ5IGl2aSBodHRwczovL2dpdGh1Yi5jb20vaXZpanMvaXZpLyBieSBCb3JpcyBLYXVsXG5cdFx0XHRcdFx0dmFyIG9yaWdpbmFsTmV4dFNpYmxpbmcgPSBuZXh0U2libGluZywgdm5vZGVzTGVuZ3RoID0gZW5kIC0gc3RhcnQgKyAxLCBvbGRJbmRpY2VzID0gbmV3IEFycmF5KHZub2Rlc0xlbmd0aCksIGxpPTAsIGk9MCwgcG9zID0gMjE0NzQ4MzY0NywgbWF0Y2hlZCA9IDAsIG1hcCwgbGlzSW5kaWNlc1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCB2bm9kZXNMZW5ndGg7IGkrKykgb2xkSW5kaWNlc1tpXSA9IC0xXG5cdFx0XHRcdFx0Zm9yIChpID0gZW5kOyBpID49IHN0YXJ0OyBpLS0pIHtcblx0XHRcdFx0XHRcdGlmIChtYXAgPT0gbnVsbCkgbWFwID0gZ2V0S2V5TWFwKG9sZCwgb2xkU3RhcnQsIG9sZEVuZCArIDEpXG5cdFx0XHRcdFx0XHR2ZSA9IHZub2Rlc1tpXVxuXHRcdFx0XHRcdFx0dmFyIG9sZEluZGV4ID0gbWFwW3ZlLmtleV1cblx0XHRcdFx0XHRcdGlmIChvbGRJbmRleCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdHBvcyA9IChvbGRJbmRleCA8IHBvcykgPyBvbGRJbmRleCA6IC0xIC8vIGJlY29tZXMgLTEgaWYgbm9kZXMgd2VyZSByZS1vcmRlcmVkXG5cdFx0XHRcdFx0XHRcdG9sZEluZGljZXNbaS1zdGFydF0gPSBvbGRJbmRleFxuXHRcdFx0XHRcdFx0XHRvZSA9IG9sZFtvbGRJbmRleF1cblx0XHRcdFx0XHRcdFx0b2xkW29sZEluZGV4XSA9IG51bGxcblx0XHRcdFx0XHRcdFx0aWYgKG9lICE9PSB2ZSkgdXBkYXRlTm9kZShwYXJlbnQsIG9lLCB2ZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdFx0XHRcdFx0aWYgKHZlLmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IHZlLmRvbVxuXHRcdFx0XHRcdFx0XHRtYXRjaGVkKytcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bmV4dFNpYmxpbmcgPSBvcmlnaW5hbE5leHRTaWJsaW5nXG5cdFx0XHRcdFx0aWYgKG1hdGNoZWQgIT09IG9sZEVuZCAtIG9sZFN0YXJ0ICsgMSkgcmVtb3ZlTm9kZXMocGFyZW50LCBvbGQsIG9sZFN0YXJ0LCBvbGRFbmQgKyAxKVxuXHRcdFx0XHRcdGlmIChtYXRjaGVkID09PSAwKSBjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIGVuZCArIDEsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAocG9zID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHQvLyB0aGUgaW5kaWNlcyBvZiB0aGUgaW5kaWNlcyBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgcGFydCBvZiB0aGVcblx0XHRcdFx0XHRcdFx0Ly8gbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlIGluIHRoZSBvbGRJbmRpY2VzIGxpc3Rcblx0XHRcdFx0XHRcdFx0bGlzSW5kaWNlcyA9IG1ha2VMaXNJbmRpY2VzKG9sZEluZGljZXMpXG5cdFx0XHRcdFx0XHRcdGxpID0gbGlzSW5kaWNlcy5sZW5ndGggLSAxXG5cdFx0XHRcdFx0XHRcdGZvciAoaSA9IGVuZDsgaSA+PSBzdGFydDsgaS0tKSB7XG5cdFx0XHRcdFx0XHRcdFx0diA9IHZub2Rlc1tpXVxuXHRcdFx0XHRcdFx0XHRcdGlmIChvbGRJbmRpY2VzW2ktc3RhcnRdID09PSAtMSkgY3JlYXRlTm9kZShwYXJlbnQsIHYsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAobGlzSW5kaWNlc1tsaV0gPT09IGkgLSBzdGFydCkgbGktLVxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBtb3ZlTm9kZXMocGFyZW50LCB2LCBuZXh0U2libGluZylcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHYuZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gdm5vZGVzW2ldLmRvbVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRmb3IgKGkgPSBlbmQ7IGkgPj0gc3RhcnQ7IGktLSkge1xuXHRcdFx0XHRcdFx0XHRcdHYgPSB2bm9kZXNbaV1cblx0XHRcdFx0XHRcdFx0XHRpZiAob2xkSW5kaWNlc1tpLXN0YXJ0XSA9PT0gLTEpIGNyZWF0ZU5vZGUocGFyZW50LCB2LCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdFx0XHRcdGlmICh2LmRvbSAhPSBudWxsKSBuZXh0U2libGluZyA9IHZub2Rlc1tpXS5kb21cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVOb2RlKHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdHZhciBvbGRUYWcgPSBvbGQudGFnLCB0YWcgPSB2bm9kZS50YWdcblx0XHRpZiAob2xkVGFnID09PSB0YWcpIHtcblx0XHRcdHZub2RlLnN0YXRlID0gb2xkLnN0YXRlXG5cdFx0XHR2bm9kZS5ldmVudHMgPSBvbGQuZXZlbnRzXG5cdFx0XHRpZiAoc2hvdWxkTm90VXBkYXRlKHZub2RlLCBvbGQpKSByZXR1cm5cblx0XHRcdGlmICh0eXBlb2Ygb2xkVGFnID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKSB7XG5cdFx0XHRcdFx0dXBkYXRlTGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MpXG5cdFx0XHRcdH1cblx0XHRcdFx0c3dpdGNoIChvbGRUYWcpIHtcblx0XHRcdFx0XHRjYXNlIFwiI1wiOiB1cGRhdGVUZXh0KG9sZCwgdm5vZGUpOyBicmVha1xuXHRcdFx0XHRcdGNhc2UgXCI8XCI6IHVwZGF0ZUhUTUwocGFyZW50LCBvbGQsIHZub2RlLCBucywgbmV4dFNpYmxpbmcpOyBicmVha1xuXHRcdFx0XHRcdGNhc2UgXCJbXCI6IHVwZGF0ZUZyYWdtZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucyk7IGJyZWFrXG5cdFx0XHRcdFx0ZGVmYXVsdDogdXBkYXRlRWxlbWVudChvbGQsIHZub2RlLCBob29rcywgbnMpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgdXBkYXRlQ29tcG9uZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZW1vdmVOb2RlKHBhcmVudCwgb2xkKVxuXHRcdFx0Y3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVUZXh0KG9sZCwgdm5vZGUpIHtcblx0XHRpZiAob2xkLmNoaWxkcmVuLnRvU3RyaW5nKCkgIT09IHZub2RlLmNoaWxkcmVuLnRvU3RyaW5nKCkpIHtcblx0XHRcdG9sZC5kb20ubm9kZVZhbHVlID0gdm5vZGUuY2hpbGRyZW5cblx0XHR9XG5cdFx0dm5vZGUuZG9tID0gb2xkLmRvbVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUhUTUwocGFyZW50LCBvbGQsIHZub2RlLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHRpZiAob2xkLmNoaWxkcmVuICE9PSB2bm9kZS5jaGlsZHJlbikge1xuXHRcdFx0cmVtb3ZlSFRNTChwYXJlbnQsIG9sZClcblx0XHRcdGNyZWF0ZUhUTUwocGFyZW50LCB2bm9kZSwgbnMsIG5leHRTaWJsaW5nKVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHZub2RlLmRvbSA9IG9sZC5kb21cblx0XHRcdHZub2RlLmRvbVNpemUgPSBvbGQuZG9tU2l6ZVxuXHRcdFx0dm5vZGUuaW5zdGFuY2UgPSBvbGQuaW5zdGFuY2Vcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlRnJhZ21lbnQocGFyZW50LCBvbGQsIHZub2RlLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKSB7XG5cdFx0dXBkYXRlTm9kZXMocGFyZW50LCBvbGQuY2hpbGRyZW4sIHZub2RlLmNoaWxkcmVuLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdHZhciBkb21TaXplID0gMCwgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdHZub2RlLmRvbSA9IG51bGxcblx0XHRpZiAoY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuXHRcdFx0XHRpZiAoY2hpbGQgIT0gbnVsbCAmJiBjaGlsZC5kb20gIT0gbnVsbCkge1xuXHRcdFx0XHRcdGlmICh2bm9kZS5kb20gPT0gbnVsbCkgdm5vZGUuZG9tID0gY2hpbGQuZG9tXG5cdFx0XHRcdFx0ZG9tU2l6ZSArPSBjaGlsZC5kb21TaXplIHx8IDFcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRvbVNpemUgIT09IDEpIHZub2RlLmRvbVNpemUgPSBkb21TaXplXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnQob2xkLCB2bm9kZSwgaG9va3MsIG5zKSB7XG5cdFx0dmFyIGVsZW1lbnQgPSB2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0bnMgPSBnZXROYW1lU3BhY2Uodm5vZGUpIHx8IG5zXG5cblx0XHRpZiAodm5vZGUudGFnID09PSBcInRleHRhcmVhXCIpIHtcblx0XHRcdGlmICh2bm9kZS5hdHRycyA9PSBudWxsKSB2bm9kZS5hdHRycyA9IHt9XG5cdFx0XHRpZiAodm5vZGUudGV4dCAhPSBudWxsKSB7XG5cdFx0XHRcdHZub2RlLmF0dHJzLnZhbHVlID0gdm5vZGUudGV4dCAvL0ZJWE1FIGhhbmRsZSBtdWx0aXBsZSBjaGlsZHJlblxuXHRcdFx0XHR2bm9kZS50ZXh0ID0gdW5kZWZpbmVkXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHVwZGF0ZUF0dHJzKHZub2RlLCBvbGQuYXR0cnMsIHZub2RlLmF0dHJzLCBucylcblx0XHRpZiAoIW1heWJlU2V0Q29udGVudEVkaXRhYmxlKHZub2RlKSkge1xuXHRcdFx0aWYgKG9sZC50ZXh0ICE9IG51bGwgJiYgdm5vZGUudGV4dCAhPSBudWxsICYmIHZub2RlLnRleHQgIT09IFwiXCIpIHtcblx0XHRcdFx0aWYgKG9sZC50ZXh0LnRvU3RyaW5nKCkgIT09IHZub2RlLnRleHQudG9TdHJpbmcoKSkgb2xkLmRvbS5maXJzdENoaWxkLm5vZGVWYWx1ZSA9IHZub2RlLnRleHRcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAob2xkLnRleHQgIT0gbnVsbCkgb2xkLmNoaWxkcmVuID0gW1Zub2RlKFwiI1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgb2xkLnRleHQsIHVuZGVmaW5lZCwgb2xkLmRvbS5maXJzdENoaWxkKV1cblx0XHRcdFx0aWYgKHZub2RlLnRleHQgIT0gbnVsbCkgdm5vZGUuY2hpbGRyZW4gPSBbVm5vZGUoXCIjXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB2bm9kZS50ZXh0LCB1bmRlZmluZWQsIHVuZGVmaW5lZCldXG5cdFx0XHRcdHVwZGF0ZU5vZGVzKGVsZW1lbnQsIG9sZC5jaGlsZHJlbiwgdm5vZGUuY2hpbGRyZW4sIGhvb2tzLCBudWxsLCBucylcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlQ29tcG9uZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdHZub2RlLmluc3RhbmNlID0gVm5vZGUubm9ybWFsaXplKGNhbGxIb29rLmNhbGwodm5vZGUuc3RhdGUudmlldywgdm5vZGUpKVxuXHRcdGlmICh2bm9kZS5pbnN0YW5jZSA9PT0gdm5vZGUpIHRocm93IEVycm9yKFwiQSB2aWV3IGNhbm5vdCByZXR1cm4gdGhlIHZub2RlIGl0IHJlY2VpdmVkIGFzIGFyZ3VtZW50XCIpXG5cdFx0dXBkYXRlTGlmZWN5Y2xlKHZub2RlLnN0YXRlLCB2bm9kZSwgaG9va3MpXG5cdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwpIHVwZGF0ZUxpZmVjeWNsZSh2bm9kZS5hdHRycywgdm5vZGUsIGhvb2tzKVxuXHRcdGlmICh2bm9kZS5pbnN0YW5jZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAob2xkLmluc3RhbmNlID09IG51bGwpIGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZS5pbnN0YW5jZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdGVsc2UgdXBkYXRlTm9kZShwYXJlbnQsIG9sZC5pbnN0YW5jZSwgdm5vZGUuaW5zdGFuY2UsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0XHR2bm9kZS5kb20gPSB2bm9kZS5pbnN0YW5jZS5kb21cblx0XHRcdHZub2RlLmRvbVNpemUgPSB2bm9kZS5pbnN0YW5jZS5kb21TaXplXG5cdFx0fVxuXHRcdGVsc2UgaWYgKG9sZC5pbnN0YW5jZSAhPSBudWxsKSB7XG5cdFx0XHRyZW1vdmVOb2RlKHBhcmVudCwgb2xkLmluc3RhbmNlKVxuXHRcdFx0dm5vZGUuZG9tID0gdW5kZWZpbmVkXG5cdFx0XHR2bm9kZS5kb21TaXplID0gMFxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHZub2RlLmRvbSA9IG9sZC5kb21cblx0XHRcdHZub2RlLmRvbVNpemUgPSBvbGQuZG9tU2l6ZVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBnZXRLZXlNYXAodm5vZGVzLCBzdGFydCwgZW5kKSB7XG5cdFx0dmFyIG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbClcblx0XHRmb3IgKDsgc3RhcnQgPCBlbmQ7IHN0YXJ0KyspIHtcblx0XHRcdHZhciB2bm9kZSA9IHZub2Rlc1tzdGFydF1cblx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSB7XG5cdFx0XHRcdHZhciBrZXkgPSB2bm9kZS5rZXlcblx0XHRcdFx0aWYgKGtleSAhPSBudWxsKSBtYXBba2V5XSA9IHN0YXJ0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBtYXBcblx0fVxuXHQvLyBMaWZ0ZWQgZnJvbSBpdmkgaHR0cHM6Ly9naXRodWIuY29tL2l2aWpzL2l2aS9cblx0Ly8gdGFrZXMgYSBsaXN0IG9mIHVuaXF1ZSBudW1iZXJzICgtMSBpcyBzcGVjaWFsIGFuZCBjYW5cblx0Ly8gb2NjdXIgbXVsdGlwbGUgdGltZXMpIGFuZCByZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIGluZGljZXNcblx0Ly8gb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIHBhcnQgb2YgdGhlIGxvbmdlc3QgaW5jcmVhc2luZ1xuXHQvLyBzdWJzZXF1ZWNlXG5cdHZhciBsaXNUZW1wID0gW11cblx0ZnVuY3Rpb24gbWFrZUxpc0luZGljZXMoYSkge1xuXHRcdHZhciByZXN1bHQgPSBbMF1cblx0XHR2YXIgdSA9IDAsIHYgPSAwLCBpID0gMFxuXHRcdHZhciBpbCA9IGxpc1RlbXAubGVuZ3RoID0gYS5sZW5ndGhcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGlsOyBpKyspIGxpc1RlbXBbaV0gPSBhW2ldXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbDsgKytpKSB7XG5cdFx0XHRpZiAoYVtpXSA9PT0gLTEpIGNvbnRpbnVlXG5cdFx0XHR2YXIgaiA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV1cblx0XHRcdGlmIChhW2pdIDwgYVtpXSkge1xuXHRcdFx0XHRsaXNUZW1wW2ldID0galxuXHRcdFx0XHRyZXN1bHQucHVzaChpKVxuXHRcdFx0XHRjb250aW51ZVxuXHRcdFx0fVxuXHRcdFx0dSA9IDBcblx0XHRcdHYgPSByZXN1bHQubGVuZ3RoIC0gMVxuXHRcdFx0d2hpbGUgKHUgPCB2KSB7XG5cdFx0XHRcdC8vIEZhc3QgaW50ZWdlciBhdmVyYWdlIHdpdGhvdXQgb3ZlcmZsb3cuXG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHRcdHZhciBjID0gKHUgPj4+IDEpICsgKHYgPj4+IDEpICsgKHUgJiB2ICYgMSlcblx0XHRcdFx0aWYgKGFbcmVzdWx0W2NdXSA8IGFbaV0pIHtcblx0XHRcdFx0XHR1ID0gYyArIDFcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR2ID0gY1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoYVtpXSA8IGFbcmVzdWx0W3VdXSkge1xuXHRcdFx0XHRpZiAodSA+IDApIGxpc1RlbXBbaV0gPSByZXN1bHRbdSAtIDFdXG5cdFx0XHRcdHJlc3VsdFt1XSA9IGlcblx0XHRcdH1cblx0XHR9XG5cdFx0dSA9IHJlc3VsdC5sZW5ndGhcblx0XHR2ID0gcmVzdWx0W3UgLSAxXVxuXHRcdHdoaWxlICh1LS0gPiAwKSB7XG5cdFx0XHRyZXN1bHRbdV0gPSB2XG5cdFx0XHR2ID0gbGlzVGVtcFt2XVxuXHRcdH1cblx0XHRsaXNUZW1wLmxlbmd0aCA9IDBcblx0XHRyZXR1cm4gcmVzdWx0XG5cdH1cblxuXHRmdW5jdGlvbiBnZXROZXh0U2libGluZyh2bm9kZXMsIGksIG5leHRTaWJsaW5nKSB7XG5cdFx0Zm9yICg7IGkgPCB2bm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh2bm9kZXNbaV0gIT0gbnVsbCAmJiB2bm9kZXNbaV0uZG9tICE9IG51bGwpIHJldHVybiB2bm9kZXNbaV0uZG9tXG5cdFx0fVxuXHRcdHJldHVybiBuZXh0U2libGluZ1xuXHR9XG5cblx0Ly8gVGhpcyBjb3ZlcnMgYSByZWFsbHkgc3BlY2lmaWMgZWRnZSBjYXNlOlxuXHQvLyAtIFBhcmVudCBub2RlIGlzIGtleWVkIGFuZCBjb250YWlucyBjaGlsZFxuXHQvLyAtIENoaWxkIGlzIHJlbW92ZWQsIHJldHVybnMgdW5yZXNvbHZlZCBwcm9taXNlIGluIGBvbmJlZm9yZXJlbW92ZWBcblx0Ly8gLSBQYXJlbnQgbm9kZSBpcyBtb3ZlZCBpbiBrZXllZCBkaWZmXG5cdC8vIC0gUmVtYWluaW5nIGNoaWxkcmVuIHN0aWxsIG5lZWQgbW92ZWQgYXBwcm9wcmlhdGVseVxuXHQvL1xuXHQvLyBJZGVhbGx5LCBJJ2QgdHJhY2sgcmVtb3ZlZCBub2RlcyBhcyB3ZWxsLCBidXQgdGhhdCBpbnRyb2R1Y2VzIGEgbG90IG1vcmVcblx0Ly8gY29tcGxleGl0eSBhbmQgSSdtIG5vdCBleGFjdGx5IGludGVyZXN0ZWQgaW4gZG9pbmcgdGhhdC5cblx0ZnVuY3Rpb24gbW92ZU5vZGVzKHBhcmVudCwgdm5vZGUsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIGZyYWcgPSAkZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXHRcdG1vdmVDaGlsZFRvRnJhZyhwYXJlbnQsIGZyYWcsIHZub2RlKVxuXHRcdGluc2VydE5vZGUocGFyZW50LCBmcmFnLCBuZXh0U2libGluZylcblx0fVxuXHRmdW5jdGlvbiBtb3ZlQ2hpbGRUb0ZyYWcocGFyZW50LCBmcmFnLCB2bm9kZSkge1xuXHRcdC8vIERvZGdlIHRoZSByZWN1cnNpb24gb3ZlcmhlYWQgaW4gYSBmZXcgb2YgdGhlIG1vc3QgY29tbW9uIGNhc2VzLlxuXHRcdHdoaWxlICh2bm9kZS5kb20gIT0gbnVsbCAmJiB2bm9kZS5kb20ucGFyZW50Tm9kZSA9PT0gcGFyZW50KSB7XG5cdFx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHR2bm9kZSA9IHZub2RlLmluc3RhbmNlXG5cdFx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSBjb250aW51ZVxuXHRcdFx0fSBlbHNlIGlmICh2bm9kZS50YWcgPT09IFwiPFwiKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdm5vZGUuaW5zdGFuY2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRmcmFnLmFwcGVuZENoaWxkKHZub2RlLmluc3RhbmNlW2ldKVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHZub2RlLnRhZyAhPT0gXCJbXCIpIHtcblx0XHRcdFx0Ly8gRG9uJ3QgcmVjdXJzZSBmb3IgdGV4dCBub2RlcyAqb3IqIGVsZW1lbnRzLCBqdXN0IGZyYWdtZW50c1xuXHRcdFx0XHRmcmFnLmFwcGVuZENoaWxkKHZub2RlLmRvbSlcblx0XHRcdH0gZWxzZSBpZiAodm5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdHZub2RlID0gdm5vZGUuY2hpbGRyZW5bMF1cblx0XHRcdFx0aWYgKHZub2RlICE9IG51bGwpIGNvbnRpbnVlXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dmFyIGNoaWxkID0gdm5vZGUuY2hpbGRyZW5baV1cblx0XHRcdFx0XHRpZiAoY2hpbGQgIT0gbnVsbCkgbW92ZUNoaWxkVG9GcmFnKHBhcmVudCwgZnJhZywgY2hpbGQpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaW5zZXJ0Tm9kZShwYXJlbnQsIGRvbSwgbmV4dFNpYmxpbmcpIHtcblx0XHRpZiAobmV4dFNpYmxpbmcgIT0gbnVsbCkgcGFyZW50Lmluc2VydEJlZm9yZShkb20sIG5leHRTaWJsaW5nKVxuXHRcdGVsc2UgcGFyZW50LmFwcGVuZENoaWxkKGRvbSlcblx0fVxuXG5cdGZ1bmN0aW9uIG1heWJlU2V0Q29udGVudEVkaXRhYmxlKHZub2RlKSB7XG5cdFx0aWYgKHZub2RlLmF0dHJzID09IG51bGwgfHwgKFxuXHRcdFx0dm5vZGUuYXR0cnMuY29udGVudGVkaXRhYmxlID09IG51bGwgJiYgLy8gYXR0cmlidXRlXG5cdFx0XHR2bm9kZS5hdHRycy5jb250ZW50RWRpdGFibGUgPT0gbnVsbCAvLyBwcm9wZXJ0eVxuXHRcdCkpIHJldHVybiBmYWxzZVxuXHRcdHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0aWYgKGNoaWxkcmVuICE9IG51bGwgJiYgY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIGNoaWxkcmVuWzBdLnRhZyA9PT0gXCI8XCIpIHtcblx0XHRcdHZhciBjb250ZW50ID0gY2hpbGRyZW5bMF0uY2hpbGRyZW5cblx0XHRcdGlmICh2bm9kZS5kb20uaW5uZXJIVE1MICE9PSBjb250ZW50KSB2bm9kZS5kb20uaW5uZXJIVE1MID0gY29udGVudFxuXHRcdH1cblx0XHRlbHNlIGlmICh2bm9kZS50ZXh0ICE9IG51bGwgfHwgY2hpbGRyZW4gIT0gbnVsbCAmJiBjaGlsZHJlbi5sZW5ndGggIT09IDApIHRocm93IG5ldyBFcnJvcihcIkNoaWxkIG5vZGUgb2YgYSBjb250ZW50ZWRpdGFibGUgbXVzdCBiZSB0cnVzdGVkXCIpXG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXG5cdC8vcmVtb3ZlXG5cdGZ1bmN0aW9uIHJlbW92ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCBzdGFydCwgZW5kKSB7XG5cdFx0Zm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcblx0XHRcdHZhciB2bm9kZSA9IHZub2Rlc1tpXVxuXHRcdFx0aWYgKHZub2RlICE9IG51bGwpIHJlbW92ZU5vZGUocGFyZW50LCB2bm9kZSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcmVtb3ZlTm9kZShwYXJlbnQsIHZub2RlKSB7XG5cdFx0dmFyIG1hc2sgPSAwXG5cdFx0dmFyIG9yaWdpbmFsID0gdm5vZGUuc3RhdGVcblx0XHR2YXIgc3RhdGVSZXN1bHQsIGF0dHJzUmVzdWx0XG5cdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcgIT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHZub2RlLnN0YXRlLm9uYmVmb3JlcmVtb3ZlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHZhciByZXN1bHQgPSBjYWxsSG9vay5jYWxsKHZub2RlLnN0YXRlLm9uYmVmb3JlcmVtb3ZlLCB2bm9kZSlcblx0XHRcdGlmIChyZXN1bHQgIT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRtYXNrID0gMVxuXHRcdFx0XHRzdGF0ZVJlc3VsdCA9IHJlc3VsdFxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodm5vZGUuYXR0cnMgJiYgdHlwZW9mIHZub2RlLmF0dHJzLm9uYmVmb3JlcmVtb3ZlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHZhciByZXN1bHQgPSBjYWxsSG9vay5jYWxsKHZub2RlLmF0dHJzLm9uYmVmb3JlcmVtb3ZlLCB2bm9kZSlcblx0XHRcdGlmIChyZXN1bHQgIT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHRtYXNrIHw9IDJcblx0XHRcdFx0YXR0cnNSZXN1bHQgPSByZXN1bHRcblx0XHRcdH1cblx0XHR9XG5cdFx0Y2hlY2tTdGF0ZSh2bm9kZSwgb3JpZ2luYWwpXG5cblx0XHQvLyBJZiB3ZSBjYW4sIHRyeSB0byBmYXN0LXBhdGggaXQgYW5kIGF2b2lkIGFsbCB0aGUgb3ZlcmhlYWQgb2YgYXdhaXRpbmdcblx0XHRpZiAoIW1hc2spIHtcblx0XHRcdG9ucmVtb3ZlKHZub2RlKVxuXHRcdFx0cmVtb3ZlQ2hpbGQocGFyZW50LCB2bm9kZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHN0YXRlUmVzdWx0ICE9IG51bGwpIHtcblx0XHRcdFx0dmFyIG5leHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0XHRpZiAobWFzayAmIDEpIHsgbWFzayAmPSAyOyBpZiAoIW1hc2spIHJlYWxseVJlbW92ZSgpIH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzdGF0ZVJlc3VsdC50aGVuKG5leHQsIG5leHQpXG5cdFx0XHR9XG5cdFx0XHRpZiAoYXR0cnNSZXN1bHQgIT0gbnVsbCkge1xuXHRcdFx0XHR2YXIgbmV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHRcdGlmIChtYXNrICYgMikgeyBtYXNrICY9IDE7IGlmICghbWFzaykgcmVhbGx5UmVtb3ZlKCkgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdGF0dHJzUmVzdWx0LnRoZW4obmV4dCwgbmV4dClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiByZWFsbHlSZW1vdmUoKSB7XG5cdFx0XHRjaGVja1N0YXRlKHZub2RlLCBvcmlnaW5hbClcblx0XHRcdG9ucmVtb3ZlKHZub2RlKVxuXHRcdFx0cmVtb3ZlQ2hpbGQocGFyZW50LCB2bm9kZSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcmVtb3ZlSFRNTChwYXJlbnQsIHZub2RlKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZS5pbnN0YW5jZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0cGFyZW50LnJlbW92ZUNoaWxkKHZub2RlLmluc3RhbmNlW2ldKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiByZW1vdmVDaGlsZChwYXJlbnQsIHZub2RlKSB7XG5cdFx0Ly8gRG9kZ2UgdGhlIHJlY3Vyc2lvbiBvdmVyaGVhZCBpbiBhIGZldyBvZiB0aGUgbW9zdCBjb21tb24gY2FzZXMuXG5cdFx0d2hpbGUgKHZub2RlLmRvbSAhPSBudWxsICYmIHZub2RlLmRvbS5wYXJlbnROb2RlID09PSBwYXJlbnQpIHtcblx0XHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdHZub2RlID0gdm5vZGUuaW5zdGFuY2Vcblx0XHRcdFx0aWYgKHZub2RlICE9IG51bGwpIGNvbnRpbnVlXG5cdFx0XHR9IGVsc2UgaWYgKHZub2RlLnRhZyA9PT0gXCI8XCIpIHtcblx0XHRcdFx0cmVtb3ZlSFRNTChwYXJlbnQsIHZub2RlKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHZub2RlLnRhZyAhPT0gXCJbXCIpIHtcblx0XHRcdFx0XHRwYXJlbnQucmVtb3ZlQ2hpbGQodm5vZGUuZG9tKVxuXHRcdFx0XHRcdGlmICghQXJyYXkuaXNBcnJheSh2bm9kZS5jaGlsZHJlbikpIGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHZub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHZub2RlID0gdm5vZGUuY2hpbGRyZW5bMF1cblx0XHRcdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkgY29udGludWVcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHR2YXIgY2hpbGQgPSB2bm9kZS5jaGlsZHJlbltpXVxuXHRcdFx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwpIHJlbW92ZUNoaWxkKHBhcmVudCwgY2hpbGQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBvbnJlbW92ZSh2bm9kZSkge1xuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2bm9kZS5zdGF0ZS5vbnJlbW92ZSA9PT0gXCJmdW5jdGlvblwiKSBjYWxsSG9vay5jYWxsKHZub2RlLnN0YXRlLm9ucmVtb3ZlLCB2bm9kZSlcblx0XHRpZiAodm5vZGUuYXR0cnMgJiYgdHlwZW9mIHZub2RlLmF0dHJzLm9ucmVtb3ZlID09PSBcImZ1bmN0aW9uXCIpIGNhbGxIb29rLmNhbGwodm5vZGUuYXR0cnMub25yZW1vdmUsIHZub2RlKVxuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRpZiAodm5vZGUuaW5zdGFuY2UgIT0gbnVsbCkgb25yZW1vdmUodm5vZGUuaW5zdGFuY2UpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG5cdFx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwpIG9ucmVtb3ZlKGNoaWxkKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly9hdHRyc1xuXHRmdW5jdGlvbiBzZXRBdHRycyh2bm9kZSwgYXR0cnMsIG5zKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG5cdFx0XHRzZXRBdHRyKHZub2RlLCBrZXksIG51bGwsIGF0dHJzW2tleV0sIG5zKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBzZXRBdHRyKHZub2RlLCBrZXksIG9sZCwgdmFsdWUsIG5zKSB7XG5cdFx0aWYgKGtleSA9PT0gXCJrZXlcIiB8fCBrZXkgPT09IFwiaXNcIiB8fCB2YWx1ZSA9PSBudWxsIHx8IGlzTGlmZWN5Y2xlTWV0aG9kKGtleSkgfHwgKG9sZCA9PT0gdmFsdWUgJiYgIWlzRm9ybUF0dHJpYnV0ZSh2bm9kZSwga2V5KSkgJiYgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm5cblx0XHRpZiAoa2V5WzBdID09PSBcIm9cIiAmJiBrZXlbMV0gPT09IFwiblwiKSByZXR1cm4gdXBkYXRlRXZlbnQodm5vZGUsIGtleSwgdmFsdWUpXG5cdFx0aWYgKGtleS5zbGljZSgwLCA2KSA9PT0gXCJ4bGluazpcIikgdm5vZGUuZG9tLnNldEF0dHJpYnV0ZU5TKFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLCBrZXkuc2xpY2UoNiksIHZhbHVlKVxuXHRcdGVsc2UgaWYgKGtleSA9PT0gXCJzdHlsZVwiKSB1cGRhdGVTdHlsZSh2bm9kZS5kb20sIG9sZCwgdmFsdWUpXG5cdFx0ZWxzZSBpZiAoaGFzUHJvcGVydHlLZXkodm5vZGUsIGtleSwgbnMpKSB7XG5cdFx0XHRpZiAoa2V5ID09PSBcInZhbHVlXCIpIHtcblx0XHRcdFx0Ly8gT25seSBkbyB0aGUgY29lcmNpb24gaWYgd2UncmUgYWN0dWFsbHkgZ29pbmcgdG8gY2hlY2sgdGhlIHZhbHVlLlxuXHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1pbXBsaWNpdC1jb2VyY2lvbiAqL1xuXHRcdFx0XHQvL3NldHRpbmcgaW5wdXRbdmFsdWVdIHRvIHNhbWUgdmFsdWUgYnkgdHlwaW5nIG9uIGZvY3VzZWQgZWxlbWVudCBtb3ZlcyBjdXJzb3IgdG8gZW5kIGluIENocm9tZVxuXHRcdFx0XHRpZiAoKHZub2RlLnRhZyA9PT0gXCJpbnB1dFwiIHx8IHZub2RlLnRhZyA9PT0gXCJ0ZXh0YXJlYVwiKSAmJiB2bm9kZS5kb20udmFsdWUgPT09IFwiXCIgKyB2YWx1ZSAmJiB2bm9kZS5kb20gPT09IGFjdGl2ZUVsZW1lbnQoKSkgcmV0dXJuXG5cdFx0XHRcdC8vc2V0dGluZyBzZWxlY3RbdmFsdWVdIHRvIHNhbWUgdmFsdWUgd2hpbGUgaGF2aW5nIHNlbGVjdCBvcGVuIGJsaW5rcyBzZWxlY3QgZHJvcGRvd24gaW4gQ2hyb21lXG5cdFx0XHRcdGlmICh2bm9kZS50YWcgPT09IFwic2VsZWN0XCIgJiYgb2xkICE9PSBudWxsICYmIHZub2RlLmRvbS52YWx1ZSA9PT0gXCJcIiArIHZhbHVlKSByZXR1cm5cblx0XHRcdFx0Ly9zZXR0aW5nIG9wdGlvblt2YWx1ZV0gdG8gc2FtZSB2YWx1ZSB3aGlsZSBoYXZpbmcgc2VsZWN0IG9wZW4gYmxpbmtzIHNlbGVjdCBkcm9wZG93biBpbiBDaHJvbWVcblx0XHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJvcHRpb25cIiAmJiBvbGQgIT09IG51bGwgJiYgdm5vZGUuZG9tLnZhbHVlID09PSBcIlwiICsgdmFsdWUpIHJldHVyblxuXHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWltcGxpY2l0LWNvZXJjaW9uICovXG5cdFx0XHR9XG5cdFx0XHQvLyBJZiB5b3UgYXNzaWduIGFuIGlucHV0IHR5cGUgdGhhdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IElFIDExIHdpdGggYW4gYXNzaWdubWVudCBleHByZXNzaW9uLCBhbiBlcnJvciB3aWxsIG9jY3VyLlxuXHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJpbnB1dFwiICYmIGtleSA9PT0gXCJ0eXBlXCIpIHZub2RlLmRvbS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblx0XHRcdGVsc2Ugdm5vZGUuZG9tW2tleV0gPSB2YWx1ZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xuXHRcdFx0XHRpZiAodmFsdWUpIHZub2RlLmRvbS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiKVxuXHRcdFx0XHRlbHNlIHZub2RlLmRvbS5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB2bm9kZS5kb20uc2V0QXR0cmlidXRlKGtleSA9PT0gXCJjbGFzc05hbWVcIiA/IFwiY2xhc3NcIiA6IGtleSwgdmFsdWUpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHJlbW92ZUF0dHIodm5vZGUsIGtleSwgb2xkLCBucykge1xuXHRcdGlmIChrZXkgPT09IFwia2V5XCIgfHwga2V5ID09PSBcImlzXCIgfHwgb2xkID09IG51bGwgfHwgaXNMaWZlY3ljbGVNZXRob2Qoa2V5KSkgcmV0dXJuXG5cdFx0aWYgKGtleVswXSA9PT0gXCJvXCIgJiYga2V5WzFdID09PSBcIm5cIiAmJiAhaXNMaWZlY3ljbGVNZXRob2Qoa2V5KSkgdXBkYXRlRXZlbnQodm5vZGUsIGtleSwgdW5kZWZpbmVkKVxuXHRcdGVsc2UgaWYgKGtleSA9PT0gXCJzdHlsZVwiKSB1cGRhdGVTdHlsZSh2bm9kZS5kb20sIG9sZCwgbnVsbClcblx0XHRlbHNlIGlmIChcblx0XHRcdGhhc1Byb3BlcnR5S2V5KHZub2RlLCBrZXksIG5zKVxuXHRcdFx0JiYga2V5ICE9PSBcImNsYXNzTmFtZVwiXG5cdFx0XHQmJiAhKGtleSA9PT0gXCJ2YWx1ZVwiICYmIChcblx0XHRcdFx0dm5vZGUudGFnID09PSBcIm9wdGlvblwiXG5cdFx0XHRcdHx8IHZub2RlLnRhZyA9PT0gXCJzZWxlY3RcIiAmJiB2bm9kZS5kb20uc2VsZWN0ZWRJbmRleCA9PT0gLTEgJiYgdm5vZGUuZG9tID09PSBhY3RpdmVFbGVtZW50KClcblx0XHRcdCkpXG5cdFx0XHQmJiAhKHZub2RlLnRhZyA9PT0gXCJpbnB1dFwiICYmIGtleSA9PT0gXCJ0eXBlXCIpXG5cdFx0KSB7XG5cdFx0XHR2bm9kZS5kb21ba2V5XSA9IG51bGxcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIG5zTGFzdEluZGV4ID0ga2V5LmluZGV4T2YoXCI6XCIpXG5cdFx0XHRpZiAobnNMYXN0SW5kZXggIT09IC0xKSBrZXkgPSBrZXkuc2xpY2UobnNMYXN0SW5kZXggKyAxKVxuXHRcdFx0aWYgKG9sZCAhPT0gZmFsc2UpIHZub2RlLmRvbS5yZW1vdmVBdHRyaWJ1dGUoa2V5ID09PSBcImNsYXNzTmFtZVwiID8gXCJjbGFzc1wiIDoga2V5KVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBzZXRMYXRlU2VsZWN0QXR0cnModm5vZGUsIGF0dHJzKSB7XG5cdFx0aWYgKFwidmFsdWVcIiBpbiBhdHRycykge1xuXHRcdFx0aWYoYXR0cnMudmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0aWYgKHZub2RlLmRvbS5zZWxlY3RlZEluZGV4ICE9PSAtMSkgdm5vZGUuZG9tLnZhbHVlID0gbnVsbFxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIG5vcm1hbGl6ZWQgPSBcIlwiICsgYXR0cnMudmFsdWUgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1pbXBsaWNpdC1jb2VyY2lvblxuXHRcdFx0XHRpZiAodm5vZGUuZG9tLnZhbHVlICE9PSBub3JtYWxpemVkIHx8IHZub2RlLmRvbS5zZWxlY3RlZEluZGV4ID09PSAtMSkge1xuXHRcdFx0XHRcdHZub2RlLmRvbS52YWx1ZSA9IG5vcm1hbGl6ZWRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoXCJzZWxlY3RlZEluZGV4XCIgaW4gYXR0cnMpIHNldEF0dHIodm5vZGUsIFwic2VsZWN0ZWRJbmRleFwiLCBudWxsLCBhdHRycy5zZWxlY3RlZEluZGV4LCB1bmRlZmluZWQpXG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlQXR0cnModm5vZGUsIG9sZCwgYXR0cnMsIG5zKSB7XG5cdFx0aWYgKGF0dHJzICE9IG51bGwpIHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdFx0XHRzZXRBdHRyKHZub2RlLCBrZXksIG9sZCAmJiBvbGRba2V5XSwgYXR0cnNba2V5XSwgbnMpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciB2YWxcblx0XHRpZiAob2xkICE9IG51bGwpIHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBvbGQpIHtcblx0XHRcdFx0aWYgKCgodmFsID0gb2xkW2tleV0pICE9IG51bGwpICYmIChhdHRycyA9PSBudWxsIHx8IGF0dHJzW2tleV0gPT0gbnVsbCkpIHtcblx0XHRcdFx0XHRyZW1vdmVBdHRyKHZub2RlLCBrZXksIHZhbCwgbnMpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gaXNGb3JtQXR0cmlidXRlKHZub2RlLCBhdHRyKSB7XG5cdFx0cmV0dXJuIGF0dHIgPT09IFwidmFsdWVcIiB8fCBhdHRyID09PSBcImNoZWNrZWRcIiB8fCBhdHRyID09PSBcInNlbGVjdGVkSW5kZXhcIiB8fCBhdHRyID09PSBcInNlbGVjdGVkXCIgJiYgdm5vZGUuZG9tID09PSBhY3RpdmVFbGVtZW50KCkgfHwgdm5vZGUudGFnID09PSBcIm9wdGlvblwiICYmIHZub2RlLmRvbS5wYXJlbnROb2RlID09PSAkZG9jLmFjdGl2ZUVsZW1lbnRcblx0fVxuXHRmdW5jdGlvbiBpc0xpZmVjeWNsZU1ldGhvZChhdHRyKSB7XG5cdFx0cmV0dXJuIGF0dHIgPT09IFwib25pbml0XCIgfHwgYXR0ciA9PT0gXCJvbmNyZWF0ZVwiIHx8IGF0dHIgPT09IFwib251cGRhdGVcIiB8fCBhdHRyID09PSBcIm9ucmVtb3ZlXCIgfHwgYXR0ciA9PT0gXCJvbmJlZm9yZXJlbW92ZVwiIHx8IGF0dHIgPT09IFwib25iZWZvcmV1cGRhdGVcIlxuXHR9XG5cdGZ1bmN0aW9uIGhhc1Byb3BlcnR5S2V5KHZub2RlLCBrZXksIG5zKSB7XG5cdFx0Ly8gRmlsdGVyIG91dCBuYW1lc3BhY2VkIGtleXNcblx0XHRyZXR1cm4gbnMgPT09IHVuZGVmaW5lZCAmJiAoXG5cdFx0XHQvLyBJZiBpdCdzIGEgY3VzdG9tIGVsZW1lbnQsIGp1c3Qga2VlcCBpdC5cblx0XHRcdHZub2RlLnRhZy5pbmRleE9mKFwiLVwiKSA+IC0xIHx8IHZub2RlLmF0dHJzICE9IG51bGwgJiYgdm5vZGUuYXR0cnMuaXMgfHxcblx0XHRcdC8vIElmIGl0J3MgYSBub3JtYWwgZWxlbWVudCwgbGV0J3MgdHJ5IHRvIGF2b2lkIGEgZmV3IGJyb3dzZXIgYnVncy5cblx0XHRcdGtleSAhPT0gXCJocmVmXCIgJiYga2V5ICE9PSBcImxpc3RcIiAmJiBrZXkgIT09IFwiZm9ybVwiICYmIGtleSAhPT0gXCJ3aWR0aFwiICYmIGtleSAhPT0gXCJoZWlnaHRcIi8vICYmIGtleSAhPT0gXCJ0eXBlXCJcblx0XHRcdC8vIERlZmVyIHRoZSBwcm9wZXJ0eSBjaGVjayB1bnRpbCAqYWZ0ZXIqIHdlIGNoZWNrIGV2ZXJ5dGhpbmcuXG5cdFx0KSAmJiBrZXkgaW4gdm5vZGUuZG9tXG5cdH1cblxuXHQvL3N0eWxlXG5cdHZhciB1cHBlcmNhc2VSZWdleCA9IC9bQS1aXS9nXG5cdGZ1bmN0aW9uIHRvTG93ZXJDYXNlKGNhcGl0YWwpIHsgcmV0dXJuIFwiLVwiICsgY2FwaXRhbC50b0xvd2VyQ2FzZSgpIH1cblx0ZnVuY3Rpb24gbm9ybWFsaXplS2V5KGtleSkge1xuXHRcdHJldHVybiBrZXlbMF0gPT09IFwiLVwiICYmIGtleVsxXSA9PT0gXCItXCIgPyBrZXkgOlxuXHRcdFx0a2V5ID09PSBcImNzc0Zsb2F0XCIgPyBcImZsb2F0XCIgOlxuXHRcdFx0XHRrZXkucmVwbGFjZSh1cHBlcmNhc2VSZWdleCwgdG9Mb3dlckNhc2UpXG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlU3R5bGUoZWxlbWVudCwgb2xkLCBzdHlsZSkge1xuXHRcdGlmIChvbGQgPT09IHN0eWxlKSB7XG5cdFx0XHQvLyBTdHlsZXMgYXJlIGVxdWl2YWxlbnQsIGRvIG5vdGhpbmcuXG5cdFx0fSBlbHNlIGlmIChzdHlsZSA9PSBudWxsKSB7XG5cdFx0XHQvLyBOZXcgc3R5bGUgaXMgbWlzc2luZywganVzdCBjbGVhciBpdC5cblx0XHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IFwiXCJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBzdHlsZSAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0Ly8gTmV3IHN0eWxlIGlzIGEgc3RyaW5nLCBsZXQgZW5naW5lIGRlYWwgd2l0aCBwYXRjaGluZy5cblx0XHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlXG5cdFx0fSBlbHNlIGlmIChvbGQgPT0gbnVsbCB8fCB0eXBlb2Ygb2xkICE9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHQvLyBgb2xkYCBpcyBtaXNzaW5nIG9yIGEgc3RyaW5nLCBgc3R5bGVgIGlzIGFuIG9iamVjdC5cblx0XHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IFwiXCJcblx0XHRcdC8vIEFkZCBuZXcgc3R5bGUgcHJvcGVydGllc1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIHN0eWxlKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IHN0eWxlW2tleV1cblx0XHRcdFx0aWYgKHZhbHVlICE9IG51bGwpIGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkobm9ybWFsaXplS2V5KGtleSksIFN0cmluZyh2YWx1ZSkpXG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEJvdGggb2xkICYgbmV3IGFyZSAoZGlmZmVyZW50KSBvYmplY3RzLlxuXHRcdFx0Ly8gVXBkYXRlIHN0eWxlIHByb3BlcnRpZXMgdGhhdCBoYXZlIGNoYW5nZWRcblx0XHRcdGZvciAodmFyIGtleSBpbiBzdHlsZSkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSBzdHlsZVtrZXldXG5cdFx0XHRcdGlmICh2YWx1ZSAhPSBudWxsICYmICh2YWx1ZSA9IFN0cmluZyh2YWx1ZSkpICE9PSBTdHJpbmcob2xkW2tleV0pKSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShub3JtYWxpemVLZXkoa2V5KSwgdmFsdWUpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIFJlbW92ZSBzdHlsZSBwcm9wZXJ0aWVzIHRoYXQgbm8gbG9uZ2VyIGV4aXN0XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2xkKSB7XG5cdFx0XHRcdGlmIChvbGRba2V5XSAhPSBudWxsICYmIHN0eWxlW2tleV0gPT0gbnVsbCkge1xuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkobm9ybWFsaXplS2V5KGtleSkpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBIZXJlJ3MgYW4gZXhwbGFuYXRpb24gb2YgaG93IHRoaXMgd29ya3M6XG5cdC8vIDEuIFRoZSBldmVudCBuYW1lcyBhcmUgYWx3YXlzIChieSBkZXNpZ24pIHByZWZpeGVkIGJ5IGBvbmAuXG5cdC8vIDIuIFRoZSBFdmVudExpc3RlbmVyIGludGVyZmFjZSBhY2NlcHRzIGVpdGhlciBhIGZ1bmN0aW9uIG9yIGFuIG9iamVjdFxuXHQvLyAgICB3aXRoIGEgYGhhbmRsZUV2ZW50YCBtZXRob2QuXG5cdC8vIDMuIFRoZSBvYmplY3QgZG9lcyBub3QgaW5oZXJpdCBmcm9tIGBPYmplY3QucHJvdG90eXBlYCwgdG8gYXZvaWRcblx0Ly8gICAgYW55IHBvdGVudGlhbCBpbnRlcmZlcmVuY2Ugd2l0aCB0aGF0IChlLmcuIHNldHRlcnMpLlxuXHQvLyA0LiBUaGUgZXZlbnQgbmFtZSBpcyByZW1hcHBlZCB0byB0aGUgaGFuZGxlciBiZWZvcmUgY2FsbGluZyBpdC5cblx0Ly8gNS4gSW4gZnVuY3Rpb24tYmFzZWQgZXZlbnQgaGFuZGxlcnMsIGBldi50YXJnZXQgPT09IHRoaXNgLiBXZSByZXBsaWNhdGVcblx0Ly8gICAgdGhhdCBiZWxvdy5cblx0Ly8gNi4gSW4gZnVuY3Rpb24tYmFzZWQgZXZlbnQgaGFuZGxlcnMsIGByZXR1cm4gZmFsc2VgIHByZXZlbnRzIHRoZSBkZWZhdWx0XG5cdC8vICAgIGFjdGlvbiBhbmQgc3RvcHMgZXZlbnQgcHJvcGFnYXRpb24uIFdlIHJlcGxpY2F0ZSB0aGF0IGJlbG93LlxuXHRmdW5jdGlvbiBFdmVudERpY3QoKSB7XG5cdFx0Ly8gU2F2ZSB0aGlzLCBzbyB0aGUgY3VycmVudCByZWRyYXcgaXMgY29ycmVjdGx5IHRyYWNrZWQuXG5cdFx0dGhpcy5fID0gY3VycmVudFJlZHJhd1xuXHR9XG5cdEV2ZW50RGljdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cdEV2ZW50RGljdC5wcm90b3R5cGUuaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiAoZXYpIHtcblx0XHR2YXIgaGFuZGxlciA9IHRoaXNbXCJvblwiICsgZXYudHlwZV1cblx0XHR2YXIgcmVzdWx0XG5cdFx0aWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHJlc3VsdCA9IGhhbmRsZXIuY2FsbChldi5jdXJyZW50VGFyZ2V0LCBldilcblx0XHRlbHNlIGlmICh0eXBlb2YgaGFuZGxlci5oYW5kbGVFdmVudCA9PT0gXCJmdW5jdGlvblwiKSBoYW5kbGVyLmhhbmRsZUV2ZW50KGV2KVxuXHRcdGlmICh0aGlzLl8gJiYgZXYucmVkcmF3ICE9PSBmYWxzZSkgKDAsIHRoaXMuXykoKVxuXHRcdGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG5cdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRldi5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdH1cblx0fVxuXG5cdC8vZXZlbnRcblx0ZnVuY3Rpb24gdXBkYXRlRXZlbnQodm5vZGUsIGtleSwgdmFsdWUpIHtcblx0XHRpZiAodm5vZGUuZXZlbnRzICE9IG51bGwpIHtcblx0XHRcdGlmICh2bm9kZS5ldmVudHNba2V5XSA9PT0gdmFsdWUpIHJldHVyblxuXHRcdFx0aWYgKHZhbHVlICE9IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikpIHtcblx0XHRcdFx0aWYgKHZub2RlLmV2ZW50c1trZXldID09IG51bGwpIHZub2RlLmRvbS5hZGRFdmVudExpc3RlbmVyKGtleS5zbGljZSgyKSwgdm5vZGUuZXZlbnRzLCBmYWxzZSlcblx0XHRcdFx0dm5vZGUuZXZlbnRzW2tleV0gPSB2YWx1ZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHZub2RlLmV2ZW50c1trZXldICE9IG51bGwpIHZub2RlLmRvbS5yZW1vdmVFdmVudExpc3RlbmVyKGtleS5zbGljZSgyKSwgdm5vZGUuZXZlbnRzLCBmYWxzZSlcblx0XHRcdFx0dm5vZGUuZXZlbnRzW2tleV0gPSB1bmRlZmluZWRcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikpIHtcblx0XHRcdHZub2RlLmV2ZW50cyA9IG5ldyBFdmVudERpY3QoKVxuXHRcdFx0dm5vZGUuZG9tLmFkZEV2ZW50TGlzdGVuZXIoa2V5LnNsaWNlKDIpLCB2bm9kZS5ldmVudHMsIGZhbHNlKVxuXHRcdFx0dm5vZGUuZXZlbnRzW2tleV0gPSB2YWx1ZVxuXHRcdH1cblx0fVxuXG5cdC8vbGlmZWN5Y2xlXG5cdGZ1bmN0aW9uIGluaXRMaWZlY3ljbGUoc291cmNlLCB2bm9kZSwgaG9va3MpIHtcblx0XHRpZiAodHlwZW9mIHNvdXJjZS5vbmluaXQgPT09IFwiZnVuY3Rpb25cIikgY2FsbEhvb2suY2FsbChzb3VyY2Uub25pbml0LCB2bm9kZSlcblx0XHRpZiAodHlwZW9mIHNvdXJjZS5vbmNyZWF0ZSA9PT0gXCJmdW5jdGlvblwiKSBob29rcy5wdXNoKGNhbGxIb29rLmJpbmQoc291cmNlLm9uY3JlYXRlLCB2bm9kZSkpXG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlTGlmZWN5Y2xlKHNvdXJjZSwgdm5vZGUsIGhvb2tzKSB7XG5cdFx0aWYgKHR5cGVvZiBzb3VyY2Uub251cGRhdGUgPT09IFwiZnVuY3Rpb25cIikgaG9va3MucHVzaChjYWxsSG9vay5iaW5kKHNvdXJjZS5vbnVwZGF0ZSwgdm5vZGUpKVxuXHR9XG5cdGZ1bmN0aW9uIHNob3VsZE5vdFVwZGF0ZSh2bm9kZSwgb2xkKSB7XG5cdFx0ZG8ge1xuXHRcdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwgJiYgdHlwZW9mIHZub2RlLmF0dHJzLm9uYmVmb3JldXBkYXRlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0dmFyIGZvcmNlID0gY2FsbEhvb2suY2FsbCh2bm9kZS5hdHRycy5vbmJlZm9yZXVwZGF0ZSwgdm5vZGUsIG9sZClcblx0XHRcdFx0aWYgKGZvcmNlICE9PSB1bmRlZmluZWQgJiYgIWZvcmNlKSBicmVha1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcgIT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHZub2RlLnN0YXRlLm9uYmVmb3JldXBkYXRlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0dmFyIGZvcmNlID0gY2FsbEhvb2suY2FsbCh2bm9kZS5zdGF0ZS5vbmJlZm9yZXVwZGF0ZSwgdm5vZGUsIG9sZClcblx0XHRcdFx0aWYgKGZvcmNlICE9PSB1bmRlZmluZWQgJiYgIWZvcmNlKSBicmVha1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fSB3aGlsZSAoZmFsc2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuXHRcdHZub2RlLmRvbSA9IG9sZC5kb21cblx0XHR2bm9kZS5kb21TaXplID0gb2xkLmRvbVNpemVcblx0XHR2bm9kZS5pbnN0YW5jZSA9IG9sZC5pbnN0YW5jZVxuXHRcdC8vIE9uZSB3b3VsZCB0aGluayBoYXZpbmcgdGhlIGFjdHVhbCBsYXRlc3QgYXR0cmlidXRlcyB3b3VsZCBiZSBpZGVhbCxcblx0XHQvLyBidXQgaXQgZG9lc24ndCBsZXQgdXMgcHJvcGVybHkgZGlmZiBiYXNlZCBvbiBvdXIgY3VycmVudCBpbnRlcm5hbFxuXHRcdC8vIHJlcHJlc2VudGF0aW9uLiBXZSBoYXZlIHRvIHNhdmUgbm90IG9ubHkgdGhlIG9sZCBET00gaW5mbywgYnV0IGFsc29cblx0XHQvLyB0aGUgYXR0cmlidXRlcyB1c2VkIHRvIGNyZWF0ZSBpdCwgYXMgd2UgZGlmZiAqdGhhdCosIG5vdCBhZ2FpbnN0IHRoZVxuXHRcdC8vIERPTSBkaXJlY3RseSAod2l0aCBhIGZldyBleGNlcHRpb25zIGluIGBzZXRBdHRyYCkuIEFuZCwgb2YgY291cnNlLCB3ZVxuXHRcdC8vIG5lZWQgdG8gc2F2ZSB0aGUgY2hpbGRyZW4gYW5kIHRleHQgYXMgdGhleSBhcmUgY29uY2VwdHVhbGx5IG5vdFxuXHRcdC8vIHVubGlrZSBzcGVjaWFsIFwiYXR0cmlidXRlc1wiIGludGVybmFsbHkuXG5cdFx0dm5vZGUuYXR0cnMgPSBvbGQuYXR0cnNcblx0XHR2bm9kZS5jaGlsZHJlbiA9IG9sZC5jaGlsZHJlblxuXHRcdHZub2RlLnRleHQgPSBvbGQudGV4dFxuXHRcdHJldHVybiB0cnVlXG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24oZG9tLCB2bm9kZXMsIHJlZHJhdykge1xuXHRcdGlmICghZG9tKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRW5zdXJlIHRoZSBET00gZWxlbWVudCBiZWluZyBwYXNzZWQgdG8gbS5yb3V0ZS9tLm1vdW50L20ucmVuZGVyIGlzIG5vdCB1bmRlZmluZWQuXCIpXG5cdFx0dmFyIGhvb2tzID0gW11cblx0XHR2YXIgYWN0aXZlID0gYWN0aXZlRWxlbWVudCgpXG5cdFx0dmFyIG5hbWVzcGFjZSA9IGRvbS5uYW1lc3BhY2VVUklcblxuXHRcdC8vIEZpcnN0IHRpbWUgcmVuZGVyaW5nIGludG8gYSBub2RlIGNsZWFycyBpdCBvdXRcblx0XHRpZiAoZG9tLnZub2RlcyA9PSBudWxsKSBkb20udGV4dENvbnRlbnQgPSBcIlwiXG5cblx0XHR2bm9kZXMgPSBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbihBcnJheS5pc0FycmF5KHZub2RlcykgPyB2bm9kZXMgOiBbdm5vZGVzXSlcblx0XHR2YXIgcHJldlJlZHJhdyA9IGN1cnJlbnRSZWRyYXdcblx0XHR0cnkge1xuXHRcdFx0Y3VycmVudFJlZHJhdyA9IHR5cGVvZiByZWRyYXcgPT09IFwiZnVuY3Rpb25cIiA/IHJlZHJhdyA6IHVuZGVmaW5lZFxuXHRcdFx0dXBkYXRlTm9kZXMoZG9tLCBkb20udm5vZGVzLCB2bm9kZXMsIGhvb2tzLCBudWxsLCBuYW1lc3BhY2UgPT09IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiID8gdW5kZWZpbmVkIDogbmFtZXNwYWNlKVxuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRjdXJyZW50UmVkcmF3ID0gcHJldlJlZHJhd1xuXHRcdH1cblx0XHRkb20udm5vZGVzID0gdm5vZGVzXG5cdFx0Ly8gYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIGNhbiByZXR1cm4gbnVsbDogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW50ZXJhY3Rpb24uaHRtbCNkb20tZG9jdW1lbnQtYWN0aXZlZWxlbWVudFxuXHRcdGlmIChhY3RpdmUgIT0gbnVsbCAmJiBhY3RpdmVFbGVtZW50KCkgIT09IGFjdGl2ZSAmJiB0eXBlb2YgYWN0aXZlLmZvY3VzID09PSBcImZ1bmN0aW9uXCIpIGFjdGl2ZS5mb2N1cygpXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7IGkrKykgaG9va3NbaV0oKVxuXHR9XG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgVm5vZGUgPSByZXF1aXJlKFwiLi4vcmVuZGVyL3Zub2RlXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaHRtbCkge1xuXHRpZiAoaHRtbCA9PSBudWxsKSBodG1sID0gXCJcIlxuXHRyZXR1cm4gVm5vZGUoXCI8XCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBodG1sLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcbn1cbiIsIlwidXNlIHN0cmljdFwiXG5cbmZ1bmN0aW9uIFZub2RlKHRhZywga2V5LCBhdHRycywgY2hpbGRyZW4sIHRleHQsIGRvbSkge1xuXHRyZXR1cm4ge3RhZzogdGFnLCBrZXk6IGtleSwgYXR0cnM6IGF0dHJzLCBjaGlsZHJlbjogY2hpbGRyZW4sIHRleHQ6IHRleHQsIGRvbTogZG9tLCBkb21TaXplOiB1bmRlZmluZWQsIHN0YXRlOiB1bmRlZmluZWQsIGV2ZW50czogdW5kZWZpbmVkLCBpbnN0YW5jZTogdW5kZWZpbmVkfVxufVxuVm5vZGUubm9ybWFsaXplID0gZnVuY3Rpb24obm9kZSkge1xuXHRpZiAoQXJyYXkuaXNBcnJheShub2RlKSkgcmV0dXJuIFZub2RlKFwiW1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4obm9kZSksIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxuXHRpZiAobm9kZSA9PSBudWxsIHx8IHR5cGVvZiBub2RlID09PSBcImJvb2xlYW5cIikgcmV0dXJuIG51bGxcblx0aWYgKHR5cGVvZiBub2RlID09PSBcIm9iamVjdFwiKSByZXR1cm4gbm9kZVxuXHRyZXR1cm4gVm5vZGUoXCIjXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBTdHJpbmcobm9kZSksIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxufVxuVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4gPSBmdW5jdGlvbihpbnB1dCkge1xuXHR2YXIgY2hpbGRyZW4gPSBbXVxuXHRpZiAoaW5wdXQubGVuZ3RoKSB7XG5cdFx0dmFyIGlzS2V5ZWQgPSBpbnB1dFswXSAhPSBudWxsICYmIGlucHV0WzBdLmtleSAhPSBudWxsXG5cdFx0Ly8gTm90ZTogdGhpcyBpcyBhICp2ZXJ5KiBwZXJmLXNlbnNpdGl2ZSBjaGVjay5cblx0XHQvLyBGdW4gZmFjdDogbWVyZ2luZyB0aGUgbG9vcCBsaWtlIHRoaXMgaXMgc29tZWhvdyBmYXN0ZXIgdGhhbiBzcGxpdHRpbmdcblx0XHQvLyBpdCwgbm90aWNlYWJseSBzby5cblx0XHRmb3IgKHZhciBpID0gMTsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoKGlucHV0W2ldICE9IG51bGwgJiYgaW5wdXRbaV0ua2V5ICE9IG51bGwpICE9PSBpc0tleWVkKSB7XG5cdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJWbm9kZXMgbXVzdCBlaXRoZXIgYWx3YXlzIGhhdmUga2V5cyBvciBuZXZlciBoYXZlIGtleXMhXCIpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNoaWxkcmVuW2ldID0gVm5vZGUubm9ybWFsaXplKGlucHV0W2ldKVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gY2hpbGRyZW5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBWbm9kZVxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIFByb21pc2VQb2x5ZmlsbCA9IHJlcXVpcmUoXCIuL3Byb21pc2UvcHJvbWlzZVwiKVxudmFyIG1vdW50UmVkcmF3ID0gcmVxdWlyZShcIi4vbW91bnQtcmVkcmF3XCIpXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcmVxdWVzdC9yZXF1ZXN0XCIpKHdpbmRvdywgUHJvbWlzZVBvbHlmaWxsLCBtb3VudFJlZHJhdy5yZWRyYXcpXG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgYnVpbGRQYXRobmFtZSA9IHJlcXVpcmUoXCIuLi9wYXRobmFtZS9idWlsZFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCR3aW5kb3csIFByb21pc2UsIG9uY29tcGxldGlvbikge1xuXHR2YXIgY2FsbGJhY2tDb3VudCA9IDBcblxuXHRmdW5jdGlvbiBQcm9taXNlUHJveHkoZXhlY3V0b3IpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZXhlY3V0b3IpXG5cdH1cblxuXHQvLyBJbiBjYXNlIHRoZSBnbG9iYWwgUHJvbWlzZSBpcyBzb21lIHVzZXJsYW5kIGxpYnJhcnkncyB3aGVyZSB0aGV5IHJlbHkgb25cblx0Ly8gYGZvbyBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3JgLCBgdGhpcy5jb25zdHJ1Y3Rvci5yZXNvbHZlKHZhbHVlKWAsIG9yXG5cdC8vIHNpbWlsYXIuIExldCdzICpub3QqIGJyZWFrIHRoZW0uXG5cdFByb21pc2VQcm94eS5wcm90b3R5cGUgPSBQcm9taXNlLnByb3RvdHlwZVxuXHRQcm9taXNlUHJveHkuX19wcm90b19fID0gUHJvbWlzZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG5cblx0ZnVuY3Rpb24gbWFrZVJlcXVlc3QoZmFjdG9yeSkge1xuXHRcdHJldHVybiBmdW5jdGlvbih1cmwsIGFyZ3MpIHtcblx0XHRcdGlmICh0eXBlb2YgdXJsICE9PSBcInN0cmluZ1wiKSB7IGFyZ3MgPSB1cmw7IHVybCA9IHVybC51cmwgfVxuXHRcdFx0ZWxzZSBpZiAoYXJncyA9PSBudWxsKSBhcmdzID0ge31cblx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRcdGZhY3RvcnkoYnVpbGRQYXRobmFtZSh1cmwsIGFyZ3MucGFyYW1zKSwgYXJncywgZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGFyZ3MudHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRkYXRhW2ldID0gbmV3IGFyZ3MudHlwZShkYXRhW2ldKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGRhdGEgPSBuZXcgYXJncy50eXBlKGRhdGEpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJlc29sdmUoZGF0YSlcblx0XHRcdFx0fSwgcmVqZWN0KVxuXHRcdFx0fSlcblx0XHRcdGlmIChhcmdzLmJhY2tncm91bmQgPT09IHRydWUpIHJldHVybiBwcm9taXNlXG5cdFx0XHR2YXIgY291bnQgPSAwXG5cdFx0XHRmdW5jdGlvbiBjb21wbGV0ZSgpIHtcblx0XHRcdFx0aWYgKC0tY291bnQgPT09IDAgJiYgdHlwZW9mIG9uY29tcGxldGlvbiA9PT0gXCJmdW5jdGlvblwiKSBvbmNvbXBsZXRpb24oKVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gd3JhcChwcm9taXNlKVxuXG5cdFx0XHRmdW5jdGlvbiB3cmFwKHByb21pc2UpIHtcblx0XHRcdFx0dmFyIHRoZW4gPSBwcm9taXNlLnRoZW5cblx0XHRcdFx0Ly8gU2V0IHRoZSBjb25zdHJ1Y3Rvciwgc28gZW5naW5lcyBrbm93IHRvIG5vdCBhd2FpdCBvciByZXNvbHZlXG5cdFx0XHRcdC8vIHRoaXMgYXMgYSBuYXRpdmUgcHJvbWlzZS4gQXQgdGhlIHRpbWUgb2Ygd3JpdGluZywgdGhpcyBpc1xuXHRcdFx0XHQvLyBvbmx5IG5lY2Vzc2FyeSBmb3IgVjgsIGJ1dCB0aGVpciBiZWhhdmlvciBpcyB0aGUgY29ycmVjdFxuXHRcdFx0XHQvLyBiZWhhdmlvciBwZXIgc3BlYy4gU2VlIHRoaXMgc3BlYyBpc3N1ZSBmb3IgbW9yZSBkZXRhaWxzOlxuXHRcdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9lY21hMjYyL2lzc3Vlcy8xNTc3LiBBbHNvLCBzZWUgdGhlXG5cdFx0XHRcdC8vIGNvcnJlc3BvbmRpbmcgY29tbWVudCBpbiBgcmVxdWVzdC90ZXN0cy90ZXN0LXJlcXVlc3QuanNgIGZvclxuXHRcdFx0XHQvLyBhIGJpdCBtb3JlIGJhY2tncm91bmQgb24gdGhlIGlzc3VlIGF0IGhhbmQuXG5cdFx0XHRcdHByb21pc2UuY29uc3RydWN0b3IgPSBQcm9taXNlUHJveHlcblx0XHRcdFx0cHJvbWlzZS50aGVuID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0Y291bnQrK1xuXHRcdFx0XHRcdHZhciBuZXh0ID0gdGhlbi5hcHBseShwcm9taXNlLCBhcmd1bWVudHMpXG5cdFx0XHRcdFx0bmV4dC50aGVuKGNvbXBsZXRlLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0XHRjb21wbGV0ZSgpXG5cdFx0XHRcdFx0XHRpZiAoY291bnQgPT09IDApIHRocm93IGVcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdHJldHVybiB3cmFwKG5leHQpXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHByb21pc2Vcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoYXNIZWFkZXIoYXJncywgbmFtZSkge1xuXHRcdGZvciAodmFyIGtleSBpbiBhcmdzLmhlYWRlcnMpIHtcblx0XHRcdGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFyZ3MuaGVhZGVycywga2V5KSAmJiBuYW1lLnRlc3Qoa2V5KSkgcmV0dXJuIHRydWVcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHJlcXVlc3Q6IG1ha2VSZXF1ZXN0KGZ1bmN0aW9uKHVybCwgYXJncywgcmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHR2YXIgbWV0aG9kID0gYXJncy5tZXRob2QgIT0gbnVsbCA/IGFyZ3MubWV0aG9kLnRvVXBwZXJDYXNlKCkgOiBcIkdFVFwiXG5cdFx0XHR2YXIgYm9keSA9IGFyZ3MuYm9keVxuXHRcdFx0dmFyIGFzc3VtZUpTT04gPSAoYXJncy5zZXJpYWxpemUgPT0gbnVsbCB8fCBhcmdzLnNlcmlhbGl6ZSA9PT0gSlNPTi5zZXJpYWxpemUpICYmICEoYm9keSBpbnN0YW5jZW9mICR3aW5kb3cuRm9ybURhdGEpXG5cdFx0XHR2YXIgcmVzcG9uc2VUeXBlID0gYXJncy5yZXNwb25zZVR5cGUgfHwgKHR5cGVvZiBhcmdzLmV4dHJhY3QgPT09IFwiZnVuY3Rpb25cIiA/IFwiXCIgOiBcImpzb25cIilcblxuXHRcdFx0dmFyIHhociA9IG5ldyAkd2luZG93LlhNTEh0dHBSZXF1ZXN0KCksIGFib3J0ZWQgPSBmYWxzZVxuXHRcdFx0dmFyIG9yaWdpbmFsID0geGhyLCByZXBsYWNlZEFib3J0XG5cdFx0XHR2YXIgYWJvcnQgPSB4aHIuYWJvcnRcblxuXHRcdFx0eGhyLmFib3J0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFib3J0ZWQgPSB0cnVlXG5cdFx0XHRcdGFib3J0LmNhbGwodGhpcylcblx0XHRcdH1cblxuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIGFyZ3MuYXN5bmMgIT09IGZhbHNlLCB0eXBlb2YgYXJncy51c2VyID09PSBcInN0cmluZ1wiID8gYXJncy51c2VyIDogdW5kZWZpbmVkLCB0eXBlb2YgYXJncy5wYXNzd29yZCA9PT0gXCJzdHJpbmdcIiA/IGFyZ3MucGFzc3dvcmQgOiB1bmRlZmluZWQpXG5cblx0XHRcdGlmIChhc3N1bWVKU09OICYmIGJvZHkgIT0gbnVsbCAmJiAhaGFzSGVhZGVyKGFyZ3MsIC9eY29udGVudC10eXBlJC9pKSkge1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIilcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgYXJncy5kZXNlcmlhbGl6ZSAhPT0gXCJmdW5jdGlvblwiICYmICFoYXNIZWFkZXIoYXJncywgL15hY2NlcHQkL2kpKSB7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC8qXCIpXG5cdFx0XHR9XG5cdFx0XHRpZiAoYXJncy53aXRoQ3JlZGVudGlhbHMpIHhoci53aXRoQ3JlZGVudGlhbHMgPSBhcmdzLndpdGhDcmVkZW50aWFsc1xuXHRcdFx0aWYgKGFyZ3MudGltZW91dCkgeGhyLnRpbWVvdXQgPSBhcmdzLnRpbWVvdXRcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGVcblxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZ3MuaGVhZGVycykge1xuXHRcdFx0XHRpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChhcmdzLmhlYWRlcnMsIGtleSkpIHtcblx0XHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGFyZ3MuaGVhZGVyc1trZXldKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihldikge1xuXHRcdFx0XHQvLyBEb24ndCB0aHJvdyBlcnJvcnMgb24geGhyLmFib3J0KCkuXG5cdFx0XHRcdGlmIChhYm9ydGVkKSByZXR1cm5cblxuXHRcdFx0XHRpZiAoZXYudGFyZ2V0LnJlYWR5U3RhdGUgPT09IDQpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSAoZXYudGFyZ2V0LnN0YXR1cyA+PSAyMDAgJiYgZXYudGFyZ2V0LnN0YXR1cyA8IDMwMCkgfHwgZXYudGFyZ2V0LnN0YXR1cyA9PT0gMzA0IHx8ICgvXmZpbGU6XFwvXFwvL2kpLnRlc3QodXJsKVxuXHRcdFx0XHRcdFx0Ly8gV2hlbiB0aGUgcmVzcG9uc2UgdHlwZSBpc24ndCBcIlwiIG9yIFwidGV4dFwiLFxuXHRcdFx0XHRcdFx0Ly8gYHhoci5yZXNwb25zZVRleHRgIGlzIHRoZSB3cm9uZyB0aGluZyB0byB1c2UuXG5cdFx0XHRcdFx0XHQvLyBCcm93c2VycyBkbyB0aGUgcmlnaHQgdGhpbmcgYW5kIHRocm93IGhlcmUsIGFuZCB3ZVxuXHRcdFx0XHRcdFx0Ly8gc2hvdWxkIGhvbm9yIHRoYXQgYW5kIGRvIHRoZSByaWdodCB0aGluZyBieVxuXHRcdFx0XHRcdFx0Ly8gcHJlZmVycmluZyBgeGhyLnJlc3BvbnNlYCB3aGVyZSBwb3NzaWJsZS9wcmFjdGljYWwuXG5cdFx0XHRcdFx0XHR2YXIgcmVzcG9uc2UgPSBldi50YXJnZXQucmVzcG9uc2UsIG1lc3NhZ2VcblxuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlVHlwZSA9PT0gXCJqc29uXCIpIHtcblx0XHRcdFx0XHRcdFx0Ly8gRm9yIElFIGFuZCBFZGdlLCB3aGljaCBkb24ndCBpbXBsZW1lbnRcblx0XHRcdFx0XHRcdFx0Ly8gYHJlc3BvbnNlVHlwZTogXCJqc29uXCJgLlxuXHRcdFx0XHRcdFx0XHRpZiAoIWV2LnRhcmdldC5yZXNwb25zZVR5cGUgJiYgdHlwZW9mIGFyZ3MuZXh0cmFjdCAhPT0gXCJmdW5jdGlvblwiKSByZXNwb25zZSA9IEpTT04ucGFyc2UoZXYudGFyZ2V0LnJlc3BvbnNlVGV4dClcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09IFwidGV4dFwiKSB7XG5cdFx0XHRcdFx0XHRcdC8vIE9ubHkgdXNlIHRoaXMgZGVmYXVsdCBpZiBpdCdzIHRleHQuIElmIGEgcGFyc2VkXG5cdFx0XHRcdFx0XHRcdC8vIGRvY3VtZW50IGlzIG5lZWRlZCBvbiBvbGQgSUUgYW5kIGZyaWVuZHMgKGFsbFxuXHRcdFx0XHRcdFx0XHQvLyB1bnN1cHBvcnRlZCksIHRoZSB1c2VyIHNob3VsZCB1c2UgYSBjdXN0b21cblx0XHRcdFx0XHRcdFx0Ly8gYGNvbmZpZ2AgaW5zdGVhZC4gVGhleSdyZSBhbHJlYWR5IHVzaW5nIHRoaXMgYXRcblx0XHRcdFx0XHRcdFx0Ly8gdGhlaXIgb3duIHJpc2suXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNwb25zZSA9PSBudWxsKSByZXNwb25zZSA9IGV2LnRhcmdldC5yZXNwb25zZVRleHRcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBhcmdzLmV4dHJhY3QgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IGFyZ3MuZXh0cmFjdChldi50YXJnZXQsIGFyZ3MpXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3MgPSB0cnVlXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBhcmdzLmRlc2VyaWFsaXplID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBhcmdzLmRlc2VyaWFsaXplKHJlc3BvbnNlKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKHN1Y2Nlc3MpIHJlc29sdmUocmVzcG9uc2UpXG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0dHJ5IHsgbWVzc2FnZSA9IGV2LnRhcmdldC5yZXNwb25zZVRleHQgfVxuXHRcdFx0XHRcdFx0XHRjYXRjaCAoZSkgeyBtZXNzYWdlID0gcmVzcG9uc2UgfVxuXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSlcblx0XHRcdFx0XHRcdFx0ZXJyb3IuY29kZSA9IGV2LnRhcmdldC5zdGF0dXNcblx0XHRcdFx0XHRcdFx0ZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZVxuXHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiBhcmdzLmNvbmZpZyA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHhociA9IGFyZ3MuY29uZmlnKHhociwgYXJncywgdXJsKSB8fCB4aHJcblxuXHRcdFx0XHQvLyBQcm9wYWdhdGUgdGhlIGBhYm9ydGAgdG8gYW55IHJlcGxhY2VtZW50IFhIUiBhcyB3ZWxsLlxuXHRcdFx0XHRpZiAoeGhyICE9PSBvcmlnaW5hbCkge1xuXHRcdFx0XHRcdHJlcGxhY2VkQWJvcnQgPSB4aHIuYWJvcnRcblx0XHRcdFx0XHR4aHIuYWJvcnQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGFib3J0ZWQgPSB0cnVlXG5cdFx0XHRcdFx0XHRyZXBsYWNlZEFib3J0LmNhbGwodGhpcylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGJvZHkgPT0gbnVsbCkgeGhyLnNlbmQoKVxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGFyZ3Muc2VyaWFsaXplID09PSBcImZ1bmN0aW9uXCIpIHhoci5zZW5kKGFyZ3Muc2VyaWFsaXplKGJvZHkpKVxuXHRcdFx0ZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mICR3aW5kb3cuRm9ybURhdGEpIHhoci5zZW5kKGJvZHkpXG5cdFx0XHRlbHNlIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGJvZHkpKVxuXHRcdH0pLFxuXHRcdGpzb25wOiBtYWtlUmVxdWVzdChmdW5jdGlvbih1cmwsIGFyZ3MsIHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIGNhbGxiYWNrTmFtZSA9IGFyZ3MuY2FsbGJhY2tOYW1lIHx8IFwiX21pdGhyaWxfXCIgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxZTE2KSArIFwiX1wiICsgY2FsbGJhY2tDb3VudCsrXG5cdFx0XHR2YXIgc2NyaXB0ID0gJHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXG5cdFx0XHQkd2luZG93W2NhbGxiYWNrTmFtZV0gPSBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdGRlbGV0ZSAkd2luZG93W2NhbGxiYWNrTmFtZV1cblx0XHRcdFx0c2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KVxuXHRcdFx0XHRyZXNvbHZlKGRhdGEpXG5cdFx0XHR9XG5cdFx0XHRzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkZWxldGUgJHdpbmRvd1tjYWxsYmFja05hbWVdXG5cdFx0XHRcdHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdClcblx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIkpTT05QIHJlcXVlc3QgZmFpbGVkXCIpKVxuXHRcdFx0fVxuXHRcdFx0c2NyaXB0LnNyYyA9IHVybCArICh1cmwuaW5kZXhPZihcIj9cIikgPCAwID8gXCI/XCIgOiBcIiZcIikgK1xuXHRcdFx0XHRlbmNvZGVVUklDb21wb25lbnQoYXJncy5jYWxsYmFja0tleSB8fCBcImNhbGxiYWNrXCIpICsgXCI9XCIgK1xuXHRcdFx0XHRlbmNvZGVVUklDb21wb25lbnQoY2FsbGJhY2tOYW1lKVxuXHRcdFx0JHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2NyaXB0KVxuXHRcdH0pLFxuXHR9XG59XG4iLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgbW91bnRSZWRyYXcgPSByZXF1aXJlKFwiLi9tb3VudC1yZWRyYXdcIilcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9hcGkvcm91dGVyXCIpKHdpbmRvdywgbW91bnRSZWRyYXcpXG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuIiwidmFyIHNjb3BlID0gKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsKSB8fFxuICAgICAgICAgICAgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYpIHx8XG4gICAgICAgICAgICB3aW5kb3c7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbChzY29wZSwgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG4vLyBPbiBzb21lIGV4b3RpYyBlbnZpcm9ubWVudHMsIGl0J3Mgbm90IGNsZWFyIHdoaWNoIG9iamVjdCBgc2V0aW1tZWRpYXRlYCB3YXNcbi8vIGFibGUgdG8gaW5zdGFsbCBvbnRvLiAgU2VhcmNoIGVhY2ggcG9zc2liaWxpdHkgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlXG4vLyBgc2V0aW1tZWRpYXRlYCBsaWJyYXJ5LlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuc2V0SW1tZWRpYXRlKTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5jbGVhckltbWVkaWF0ZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFRvZ2dsZUJ1dHRvbl8xID0gcmVxdWlyZShcIi4vVG9nZ2xlQnV0dG9uXCIpO1xuY2xhc3MgQnV0dG9uIGV4dGVuZHMgVG9nZ2xlQnV0dG9uXzEuVG9nZ2xlQnV0dG9uIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBub2RlLmF0dHJzLmRlc2MuaXRlbXMgPSBbbm9kZS5hdHRycy5kZXNjLm5hbWUgfHwgJ2J1dHRvbiddO1xuICAgICAgICBzdXBlci5vbmluaXQobm9kZSk7XG4gICAgICAgIFRvZ2dsZUJ1dHRvbl8xLlRvZ2dsZUJ1dHRvbi5lbnN1cmVTZWxlY3RlZChub2RlKTtcbiAgICB9XG59XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVFuVjBkRzl1TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwwSjFkSFJ2Ymk1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRV2REUVN4cFJFRkJPRU03UVVGbE9VTXNUVUZCWVN4TlFVRlBMRk5CUVZFc01rSkJRVms3U1VGRGNFTXNUVUZCVFN4RFFVRkRMRWxCUVZjN1VVRkRaQ3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRWxCUVVrc1VVRkJVU3hEUVVGRExFTkJRVU03VVVGRE0wUXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU51UWl3eVFrRkJXU3hEUVVGRExHTkJRV01zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTjBReXhEUVVGRE8wTkJRMG83UVVGT1JDeDNRa0ZOUXlKOSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNsYXNzIENvbGxhcHNpYmxlIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBub2RlLnN0YXRlLmludGlhbCA9IHRydWU7XG4gICAgICAgIG5vZGUuc3RhdGUuZXhwYW5kZWQgPSBub2RlLmF0dHJzLmlzRXhwYW5kZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIG5vZGUuc3RhdGUudG9nZ2xlID0gKCkgPT4ge1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5leHBhbmRlZCA9ICFub2RlLnN0YXRlLmV4cGFuZGVkO1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5pbml0aWFsID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBjc3MgPSBub2RlLmF0dHJzLmNzcztcbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IG5vZGUuYXR0cnMuY29tcG9uZW50cztcbiAgICAgICAgY29uc3QgcHJlQXJyb3cgPSBub2RlLmF0dHJzLnByZUFycm93O1xuICAgICAgICBjb25zdCBwb3N0QXJyb3cgPSBub2RlLmF0dHJzLnBvc3RBcnJvdztcbiAgICAgICAgY29uc3QgZXhwQ1NTID0gbm9kZS5zdGF0ZS5leHBhbmRlZCA/ICdocy1jb2xsYXBzaWJsZS1leHBhbmRlZCcgOiAnJztcbiAgICAgICAgY29uc3QgdGl0bGUgPSBbY29tcG9uZW50c1swXV07XG4gICAgICAgIGlmIChwcmVBcnJvdykge1xuICAgICAgICAgICAgdGl0bGUudW5zaGlmdChoc2xheW91dF8xLm0oYC5ocy1jb2xsYXBzaWJsZS1wcmUgLmhzLWNvbGxhcHNpYmxlLWFycm93LSR7bm9kZS5zdGF0ZS5leHBhbmRlZCA/ICdkb3duJyA6ICdyaWdodCd9YCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3N0QXJyb3cpIHtcbiAgICAgICAgICAgIHRpdGxlLnB1c2goaHNsYXlvdXRfMS5tKGAuaHMtY29sbGFwc2libGUtcG9zdCAuaHMtY29sbGFwc2libGUtYXJyb3ctJHtub2RlLnN0YXRlLmV4cGFuZGVkID8gJ2Rvd24nIDogJ2xlZnQnfWApKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKGAuaHMtY29sbGFwc2libGUgJHtjc3N9YCwgW1xuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKCcuaHMtY29sbGFwc2libGUtdGl0bGUnLCB7IG9uY2xpY2s6IG5vZGUuc3RhdGUudG9nZ2xlIH0sIHRpdGxlKSxcbiAgICAgICAgICAgIGNvbXBvbmVudHNbMV0gPyBoc2xheW91dF8xLm0oYC5ocy1jb2xsYXBzaWJsZS1jb250ZW50ICR7ZXhwQ1NTfWAsIGNvbXBvbmVudHNbMV0ubWFwKChjKSA9PiBoc2xheW91dF8xLm0oJycsIGMpKSkgOiB1bmRlZmluZWRcbiAgICAgICAgXSk7XG4gICAgfVxufVxuZXhwb3J0cy5Db2xsYXBzaWJsZSA9IENvbGxhcHNpYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUTI5c2JHRndjMmxpYkdVdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZRMjlzYkdGd2MybGliR1V1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRnBSRUVzZFVOQlFXOURPMEZCUlhCRExFMUJRV0VzVjBGQlZ6dEpRVU53UWl4TlFVRk5MRU5CUVVNc1NVRkJWVHRSUVVOaUxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJRenRSUVVONlFpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRkZCUVZFc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZWQlFWVXNRMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTTdVVUZETVVRc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVkQlFVY3NSMEZCUnl4RlFVRkZPMWxCUTNKQ0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTTdXVUZETTBNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVkQlFVY3NTMEZCU3l4RFFVRkRPMUZCUXk5Q0xFTkJRVU1zUTBGQlF6dEpRVU5PTEVOQlFVTTdTVUZEUkN4SlFVRkpMRU5CUVVNc1NVRkJWVHRSUVVOWUxFMUJRVTBzUjBGQlJ5eEhRVUZWTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRE8xRkJRMnhETEUxQlFVMHNWVUZCVlN4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVlVGQlZTeERRVUZETzFGQlEzcERMRTFCUVUwc1VVRkJVU3hIUVVGTExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRPMUZCUTNaRExFMUJRVTBzVTBGQlV5eEhRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1UwRkJVeXhEUVVGRE8xRkJRM2hETEUxQlFVMHNUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZCTEVOQlFVTXNRMEZCUVN4NVFrRkJlVUlzUTBGQlFTeERRVUZETEVOQlFVRXNSVUZCUlN4RFFVRkRPMUZCUTJoRkxFMUJRVTBzUzBGQlN5eEhRVUZITEVOQlFVTXNWVUZCVlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRE9VSXNTVUZCU1N4UlFVRlJMRVZCUVVVN1dVRkJSU3hMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEZsQlFVTXNRMEZCUXl3MlEwRkJOa01zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVFc1EwRkJReXhEUVVGQkxFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xTkJRVVU3VVVGRGVFZ3NTVUZCU1N4VFFVRlRMRVZCUVVNN1dVRkJSU3hMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEZsQlFVTXNRMEZCUXl3NFEwRkJPRU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVFc1EwRkJReXhEUVVGQkxFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8xTkJRVVU3VVVGRGNrZ3NUMEZCVHl4WlFVRkRMRU5CUVVNc2JVSkJRVzFDTEVkQlFVY3NSVUZCUlN4RlFVRkZPMWxCUXk5Q0xGbEJRVU1zUTBGQlF5eDFRa0ZCZFVJc1JVRkJSU3hGUVVGRkxFOUJRVThzUlVGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1JVRkJReXhGUVVGRkxFdEJRVXNzUTBGQlF6dFpRVU12UkN4VlFVRlZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVUVzUTBGQlF5eERRVUZETEZsQlFVTXNRMEZCUXl3eVFrRkJNa0lzVFVGQlRTeEZRVUZGTEVWQlFVVXNWVUZCVlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVc3NSVUZCUlN4RlFVRkZMRU5CUVVFc1dVRkJReXhEUVVGRExFVkJRVVVzUlVGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExGTkJRVk03VTBGRE1VY3NRMEZCUXl4RFFVRkRPMGxCUTFBc1EwRkJRenREUVVOS08wRkJka0pFTEd0RFFYVkNReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgaHN1dGlsXzEgPSByZXF1aXJlKFwiaHN1dGlsXCIpO1xuY29uc3QgbG9nID0gbmV3IGhzdXRpbF8xLkxvZygnRWRpdFNlbGVjdCcpO1xuY2xhc3MgRWRpdENoZWNrYm94IHtcbiAgICBjbGljaygpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICAgICAgdGhpcy51cGRhdGUodGhpcy5jaGVja2VkKTtcbiAgICB9XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gbm9kZS5hdHRycy5jaGVja2VkO1xuICAgICAgICB0aGlzLnVwZGF0ZSA9IG5vZGUuYXR0cnMudXBkYXRlO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgY29uc3QgY3NzID0gbm9kZS5hdHRycy5jc3MgfHwgJyc7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oYGlucHV0LmhzZWRpdF9jaGVja2JveCR7Y3NzfWAsIHtcbiAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgICAgICBjaGVja2VkOiB0aGlzLmNoZWNrZWQsXG4gICAgICAgICAgICBvbmNsaWNrOiB0aGlzLmNsaWNrLmJpbmQodGhpcylcbiAgICAgICAgfSwgJycpO1xuICAgIH1cbn1cbmV4cG9ydHMuRWRpdENoZWNrYm94ID0gRWRpdENoZWNrYm94O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pUldScGRFTm9aV05yWW05NExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMMFZrYVhSRGFHVmphMkp2ZUM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRU3RDUVN4MVEwRkJiME03UVVGRGNFTXNiVU5CUVd0RE8wRkJRVVVzVFVGQlRTeEhRVUZITEVkQlFVY3NTVUZCU1N4WlFVRkhMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU03UVVGSGRFVXNUVUZCWVN4WlFVRlpPMGxCU1hKQ0xFdEJRVXM3VVVGRFJDeEpRVUZKTEVOQlFVTXNUMEZCVHl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF6dFJRVU0zUWl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0SlFVTTVRaXhEUVVGRE8wbEJSVVFzVFVGQlRTeERRVUZETEVsQlFWVTdVVUZEWWl4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRPMUZCUTJ4RExFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU03U1VGRGNrTXNRMEZCUXp0SlFVVkVMRWxCUVVrc1EwRkJReXhKUVVGVk8xRkJRMWdzVFVGQlRTeEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFbEJRVWtzUlVGQlJTeERRVUZETzFGQlEycERMRTlCUVU4c1dVRkJReXhEUVVGRExIZENRVUYzUWl4SFFVRkhMRVZCUVVVc1JVRkJSVHRaUVVOd1F5eEpRVUZKTEVWQlFVVXNWVUZCVlR0WlFVTm9RaXhQUVVGUExFVkJRVVVzU1VGQlNTeERRVUZETEU5QlFVODdXVUZEY2tJc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJRenRUUVVOcVF5eEZRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRPMGxCUlZZc1EwRkJRenREUVVOS08wRkJka0pFTEc5RFFYVkNReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc3V0aWxfMSA9IHJlcXVpcmUoXCJoc3V0aWxcIik7XG5jb25zdCBsb2cgPSBuZXcgaHN1dGlsXzEuTG9nKCdFZGl0TGFiZWwnKTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jbGFzcyBFZGl0TGFiZWwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVkaXRhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFzRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gJyc7XG4gICAgfVxuICAgIGNsaWNrKGUpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZSA9ICF0aGlzLmVkaXRhYmxlO1xuICAgIH1cbiAgICBibHVyKGUpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlKGUudGFyZ2V0LnZhbHVlKTtcbiAgICB9XG4gICAga2V5dXAoa2V5KSB7XG4gICAgICAgIGlmIChrZXkud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICBrZXkudGFyZ2V0LmJsdXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGUobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDQihuZXdWYWx1ZSk7XG4gICAgfVxuICAgIG9udXBkYXRlKG5vZGUpIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdGFibGUgJiYgIXRoaXMuaGFzRm9jdXMpIHtcbiAgICAgICAgICAgIG5vZGUuZG9tLnZhbHVlID0gbm9kZS5hdHRycy5jb250ZW50IHx8IHRoaXMuZGVmYXVsdDtcbiAgICAgICAgICAgIG5vZGUuZG9tLmZvY3VzKCk7XG4gICAgICAgICAgICBub2RlLmRvbS5zZWxlY3QoKTtcbiAgICAgICAgICAgIHRoaXMuaGFzRm9jdXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUNCID0gbm9kZS5hdHRycy51cGRhdGU7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0YWJsZSA/XG4gICAgICAgICAgICBoc2xheW91dF8xLm0oYGlucHV0LmhzZWRpdF9sYWJlbCR7Y3NzfWAsIHtcbiAgICAgICAgICAgICAgICBvbmJsdXI6IHRoaXMuYmx1ci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIG9ua2V5dXA6IHRoaXMua2V5dXAuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIH0sICcnKVxuICAgICAgICAgICAgOiAobm9kZS5hdHRycy5jb250ZW50ICYmIG5vZGUuYXR0cnMuY29udGVudC5sZW5ndGgpID9cbiAgICAgICAgICAgICAgICBoc2xheW91dF8xLm0oYHNwYW4uaHNlZGl0X2xhYmVsJHtjc3N9YCwgeyBvbmNsaWNrOiB0aGlzLmNsaWNrLmJpbmQodGhpcykgfSwgbm9kZS5hdHRycy5jb250ZW50KVxuICAgICAgICAgICAgICAgIDogaHNsYXlvdXRfMS5tKGBzcGFuLmhzZWRpdF9sYWJlbC5kZWZhdWx0JHtjc3N9YCwgeyBvbmNsaWNrOiB0aGlzLmNsaWNrLmJpbmQodGhpcykgfSwgbm9kZS5hdHRycy5wbGFjZWhvbGRlciB8fCAnY2xpY2sgdG8gZW50ZXInKTtcbiAgICB9XG59XG5leHBvcnRzLkVkaXRMYWJlbCA9IEVkaXRMYWJlbDtcbmNsYXNzIEVkaXREYXRlIGV4dGVuZHMgRWRpdExhYmVsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKS5zbGljZSg0KTtcbiAgICB9XG4gICAgdXBkYXRlKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGlzTmFOKGRhdGUuZ2V0VGltZSgpKSA/ICdpbnZhbGlkIGRhdGUnIDogZGF0ZS50b0RhdGVTdHJpbmcoKS5zbGljZSg0KTtcbiAgICAgICAgICAgIHN1cGVyLnVwZGF0ZShyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIudXBkYXRlKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkVkaXREYXRlID0gRWRpdERhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lSV1JwZEV4aFltVnNMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDBWa2FYUk1ZV0psYkM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRWEZEUVN4dFEwRkJhME03UVVGQlJTeE5RVUZOTEVkQlFVY3NSMEZCUnl4SlFVRkpMRmxCUVVjc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF6dEJRVU55UlN4MVEwRkJiME03UVVGSGNFTXNUVUZCWVN4VFFVRlRPMGxCUVhSQ08xRkJRMk1zWVVGQlVTeEhRVUZITEV0QlFVc3NRMEZCUXp0UlFVTnFRaXhoUVVGUkxFZEJRVWNzUzBGQlN5eERRVUZETzFGQlJXcENMRmxCUVU4c1IwRkJSeXhGUVVGRkxFTkJRVU03U1VFeVF6TkNMRU5CUVVNN1NVRjZRMkVzUzBGQlN5eERRVUZETEVOQlFVczdVVUZEYWtJc1NVRkJTU3hEUVVGRExGRkJRVkVzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNN1NVRkRia01zUTBGQlF6dEpRVVZUTEVsQlFVa3NRMEZCUXl4RFFVRkxPMUZCUTJoQ0xFbEJRVWtzUTBGQlF5eFJRVUZSTEVkQlFVY3NTMEZCU3l4RFFVRkRPMUZCUTNSQ0xFbEJRVWtzUTBGQlF5eFJRVUZSTEVkQlFVY3NTMEZCU3l4RFFVRkRPMUZCUTNSQ0xFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRTFCUVUwc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEpRVU5vUXl4RFFVRkRPMGxCUlZNc1MwRkJTeXhEUVVGRExFZEJRVTg3VVVGRGJrSXNTVUZCU1N4SFFVRkhMRU5CUVVNc1MwRkJTeXhMUVVGTExFVkJRVVVzUlVGQlJUdFpRVU5zUWl4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETzFOQlEzSkNPMGxCUTB3c1EwRkJRenRKUVVWVExFMUJRVTBzUTBGQlF5eFJRVUZsTzFGQlF6VkNMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdTVUZETlVJc1EwRkJRenRKUVVWTkxGRkJRVkVzUTBGQlF5eEpRVUZWTzFGQlEzUkNMRWxCUVVrc1NVRkJTU3hEUVVGRExGRkJRVkVzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRVZCUVVVN1dVRkRha01zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVsQlFVa3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJRenRaUVVOd1JDeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRXRCUVVzc1JVRkJSU3hEUVVGRE8xbEJRMnBDTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU03V1VGRGJFSXNTVUZCU1N4RFFVRkRMRkZCUVZFc1IwRkJSeXhKUVVGSkxFTkJRVU03VTBGRGVFSTdTVUZEVEN4RFFVRkRPMGxCUlUwc1NVRkJTU3hEUVVGRExFbEJRVlU3VVVGRGJFSXNTVUZCU1N4RFFVRkRMRkZCUVZFc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXp0UlFVTnNReXhOUVVGTkxFZEJRVWNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1NVRkJTU3hGUVVGRkxFTkJRVU03VVVGRGFrTXNUMEZCVHl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGQkxFTkJRVU03V1VGRGFrSXNXVUZCUXl4RFFVRkRMSEZDUVVGeFFpeEhRVUZITEVWQlFVVXNSVUZCUlR0blFrRkRNVUlzVFVGQlRTeEZRVUZGTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF6dG5Ra0ZETlVJc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJRenRoUVVOcVF5eEZRVUZETEVWQlFVVXNRMEZCUXp0WlFVTllMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkJMRU5CUVVNN1owSkJRemxETEZsQlFVTXNRMEZCUXl4dlFrRkJiMElzUjBGQlJ5eEZRVUZGTEVWQlFVVXNSVUZCUlN4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXp0blFrRkRkRVlzUTBGQlF5eERRVUZETEZsQlFVTXNRMEZCUXl3MFFrRkJORUlzUjBGQlJ5eEZRVUZGTEVWQlFVVXNSVUZCUlN4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWY3NTVUZCU1N4blFrRkJaMElzUTBGQlF5eERRVUZETzBsQlF6ZElMRU5CUVVNN1EwRkRTanRCUVM5RFJDdzRRa0VyUTBNN1FVRkZSQ3hOUVVGaExGRkJRVk1zVTBGQlVTeFRRVUZUTzBsQlFYWkRPenRSUVVOakxGbEJRVThzUjBGQlJ5eEpRVUZKTEVsQlFVa3NSVUZCUlN4RFFVRkRMRmxCUVZrc1JVRkJSU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0SlFWVXpSQ3hEUVVGRE8wbEJWR0VzVFVGQlRTeERRVUZETEZGQlFXVTdVVUZETlVJc1NVRkJTU3hSUVVGUkxFVkJRVVU3V1VGRFZpeE5RVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFpRVU5vUXl4TlFVRk5MRTFCUVUwc1IwRkJSeXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRmxCUVZrc1JVRkJSU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTndSaXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRPMU5CUTNoQ08yRkJRVTA3V1VGRFNDeExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xTkJRek5DTzBsQlEwd3NRMEZCUXp0RFFVTktPMEZCV0VRc05FSkJWME1pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IGhzdXRpbF8xID0gcmVxdWlyZShcImhzdXRpbFwiKTtcbmNvbnN0IGxvZyA9IG5ldyBoc3V0aWxfMS5Mb2coJ0VkaXRMaXN0Jyk7XG5jb25zdCBoc2xheW91dF8yID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgRWRpdExhYmVsXzEgPSByZXF1aXJlKFwiLi9FZGl0TGFiZWxcIik7XG5jb25zdCBDb2xsYXBzaWJsZV8xID0gcmVxdWlyZShcIi4vQ29sbGFwc2libGVcIik7XG5jb25zdCBkZWZJc0VtcHR5ID0gKHJvdykgPT4gKHJvdyAmJiByb3cubGVuZ3RoKSA/IGZhbHNlIDogdHJ1ZTtcbmNvbnN0IGRlZlJlbmRlciA9IChyb3dzKSA9PiB7XG4gICAgcmV0dXJuIChyb3csIHJvd051bSkgPT4ge1xuICAgICAgICBpZiAocm93Lm1hcCkge1xuICAgICAgICAgICAgcmV0dXJuIHJvdy5tYXAoKGUsIGkpID0+IGhzbGF5b3V0XzEubShFZGl0TGFiZWxfMS5FZGl0TGFiZWwsIHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBlLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnYWRkLi4uJyxcbiAgICAgICAgICAgICAgICB1cGRhdGU6IChuZXdWYWx1ZSkgPT4gcm93W2ldID0gbmV3VmFsdWVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocm93KSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhyb3cpLm1hcCgoZSkgPT4gaHNsYXlvdXRfMS5tKEVkaXRMYWJlbF8xLkVkaXRMYWJlbCwge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJvd1tlXSxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ2FkZC4uLicsXG4gICAgICAgICAgICAgICAgdXBkYXRlOiAobmV3VmFsdWUpID0+IHJvd1tlXSA9IG5ld1ZhbHVlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKEVkaXRMYWJlbF8xLkVkaXRMYWJlbCwge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJvdyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ2FkZC4uLicsXG4gICAgICAgICAgICAgICAgdXBkYXRlOiAobmV3VmFsdWUpID0+IHJvd3Nbcm93TnVtXSA9IG5ld1ZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuY2xhc3MgRWRpdExpc3Qge1xuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBjc3MgPSBub2RlLmF0dHJzLmNzcyB8fCAnJztcbiAgICAgICAgY29uc3Qgc29ydCA9IG5vZGUuYXR0cnMuc29ydCB8fCAoKCkgPT4gMCk7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBub2RlLmF0dHJzLnJvd3M7XG4gICAgICAgIGNvbnN0IGlzRW1wdHkgPSBub2RlLmF0dHJzLmlzRW1wdHkgfHwgZGVmSXNFbXB0eTtcbiAgICAgICAgY29uc3QgcmVuZGVyID0gbm9kZS5hdHRycy5yb3dSZW5kZXIgfHwgZGVmUmVuZGVyKHJvd3MpO1xuICAgICAgICBjb25zdCBkZWYgPSBub2RlLmF0dHJzLmRlZmF1bHRSb3cgPT09IHVuZGVmaW5lZCA/ICcnIDogbm9kZS5hdHRycy5kZWZhdWx0Um93O1xuICAgICAgICBjb25zdCBleHBhbmRSb3dzID0gbm9kZS5hdHRycy5leHBhbmQgfHwgZXhwYW5kO1xuICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9IG5vZGUuYXR0cnMuY29sbGFwc2libGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBub2RlLmF0dHJzLmNvbGxhcHNpYmxlO1xuICAgICAgICBpZiAoIXJvd3MpIHtcbiAgICAgICAgICAgIGxvZy53YXJuKGBFZGl0TGlzdCR7Y3NzfSByb3dzIGFycmF5IGlzIG1pc3NpbmdgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJvd3MgfHwgIXJvd3MubWFwKSB7XG4gICAgICAgICAgICBsb2cud2FybihgRWRpdExpc3Qke2Nzc30gcm93cyBtdXN0IGJlIGFuIGFycmF5YCk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwYW5kUm93cyhyb3dzLCBkZWYsIGlzRW1wdHkpO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKCcuaHNlZGl0X2xpc3RfY29udGVudCcsIHJvd3Muc29ydChzb3J0KS5tYXAoKHJvdywgaSkgPT4gaHNsYXlvdXRfMS5tKGhzbGF5b3V0XzIuTGF5b3V0LCB7XG4gICAgICAgICAgICAgICAgY3NzOiAnLmhzZWRpdF9saXN0X3JvdycsXG4gICAgICAgICAgICAgICAgY29sdW1uczogbm9kZS5hdHRycy5jb2x1bW5MYXlvdXQgfHwgW10sXG4gICAgICAgICAgICAgICAgY29udGVudDogcmVuZGVyKHJvdywgaSlcbiAgICAgICAgICAgIH0pKSlcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKGNvbGxhcHNpYmxlICYmIG5vZGUuYXR0cnMuaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKENvbGxhcHNpYmxlXzEuQ29sbGFwc2libGUsIHtcbiAgICAgICAgICAgICAgICBjc3M6IGAuZWRpdF9saXN0JHtjc3N9YCxcbiAgICAgICAgICAgICAgICBpc0V4cGFuZGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAgaHNsYXlvdXRfMS5tKCcuaHNlZGl0X2xpc3RfaGVhZGVyJywgbm9kZS5hdHRycy5oZWFkZXIpLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAobm9kZS5hdHRycy5oZWFkZXIpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50LnVuc2hpZnQoaHNsYXlvdXRfMS5tKCcuaHNlZGl0X2xpc3RfaGVhZGVyJywgbm9kZS5hdHRycy5oZWFkZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oYC5lZGl0X2xpc3Qke2Nzc31gLCBjb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuRWRpdExpc3QgPSBFZGl0TGlzdDtcbmZ1bmN0aW9uIGV4cGFuZChyb3dzLCBkZWYsIGlzRW1wdHkpIHtcbiAgICBjb25zdCBsYXN0Um93SW5kZXggPSByb3dzLmxlbmd0aCAtIDE7XG4gICAgaWYgKGxhc3RSb3dJbmRleCA8IDAgfHwgIWlzRW1wdHkocm93c1tsYXN0Um93SW5kZXhdKSkge1xuICAgICAgICByb3dzLnB1c2goZGVmKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lSV1JwZEV4cGMzUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12UldScGRFeHBjM1F1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRnpSa0VzZFVOQlFXOURPMEZCUTNCRExHMURRVUZyUXp0QlFVRkZMRTFCUVUwc1IwRkJSeXhIUVVGSExFbEJRVWtzV1VGQlJ5eERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRPMEZCUTNCRkxIVkRRVUZ2UXp0QlFVTndReXd5UTBGQmQwTTdRVUZEZUVNc0swTkJRVFJETzBGQllUVkRMRTFCUVUwc1ZVRkJWU3hIUVVGVkxFTkJRVU1zUjBGQlR5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hIUVVGSExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVRXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETzBGQlQzcEZMRTFCUVUwc1UwRkJVeXhIUVVGSExFTkJRVU1zU1VGQlZTeEZRVUZaTEVWQlFVVTdTVUZEZGtNc1QwRkJUeXhEUVVGRExFZEJRVThzUlVGQlJTeE5RVUZoTEVWQlFVVXNSVUZCUlR0UlFVTTVRaXhKUVVGSkxFZEJRVWNzUTBGQlF5eEhRVUZITEVWQlFVVTdXVUZEVkN4UFFVRlBMRWRCUVVjc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZSTEVWQlFVVXNRMEZCVVN4RlFVRkZMRVZCUVVVc1EwRkJReXhaUVVGRExFTkJRVU1zY1VKQlFWTXNSVUZCUlR0blFrRkRhRVFzVDBGQlR5eEZRVUZGTEVOQlFVTTdaMEpCUTFZc1YwRkJWeXhGUVVGRkxGRkJRVkU3WjBKQlEzSkNMRTFCUVUwc1JVRkJSU3hEUVVGRExGRkJRV1VzUlVGQlJTeEZRVUZGTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExGRkJRVkU3WVVGRGFrUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1UwRkRVRHRoUVVGTkxFbEJRVWtzVFVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEdsQ1FVRnBRaXhGUVVGRk8xbEJRMnhGTEU5QlFVOHNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRlJMRVZCUVVVc1JVRkJSU3hEUVVGRExGbEJRVU1zUTBGQlF5eHhRa0ZCVXl4RlFVRkZPMmRDUVVOdVJDeFBRVUZQTEVWQlFVVXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRFppeFhRVUZYTEVWQlFVVXNVVUZCVVR0blFrRkRja0lzVFVGQlRTeEZRVUZGTEVOQlFVTXNVVUZCWlN4RlFVRkZMRVZCUVVVc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NVVUZCVVR0aFFVTnFSQ3hEUVVGRExFTkJRVU1zUTBGQlF6dFRRVU5RTzJGQlFVMDdXVUZEU0N4UFFVRlBMRmxCUVVNc1EwRkJReXh4UWtGQlV5eEZRVUZGTzJkQ1FVTm9RaXhQUVVGUExFVkJRVVVzUjBGQlJ6dG5Ra0ZEV2l4WFFVRlhMRVZCUVVVc1VVRkJVVHRuUWtGRGNrSXNUVUZCVFN4RlFVRkZMRU5CUVVNc1VVRkJaU3hGUVVGRkxFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1VVRkJVVHRoUVVOMlJDeERRVUZETEVOQlFVTTdVMEZEVGp0SlFVTk1MRU5CUVVNc1EwRkJRenRCUVVOT0xFTkJRVU1zUTBGQlF6dEJRVVZHTEUxQlFXRXNVVUZCVVR0SlFVTnFRaXhKUVVGSkxFTkJRVU1zU1VGQlZUdFJRVU5ZTEUxQlFVMHNSMEZCUnl4SFFVRlZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVTjRReXhOUVVGTkxFbEJRVWtzUjBGQlV5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1NVRkJTU3hEUVVGRExFZEJRVVVzUlVGQlJTeERRVUZCTEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUXpsRExFMUJRVTBzU1VGQlNTeEhRVUZUTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRE8xRkJRMjVETEUxQlFVMHNUMEZCVHl4SFFVRk5MRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eEpRVUZKTEZWQlFWVXNRMEZCUXp0UlFVTndSQ3hOUVVGTkxFMUJRVTBzUjBGQlR5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRk5CUVZNc1NVRkJTU3hUUVVGVExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZETTBRc1RVRkJUU3hIUVVGSExFZEJRVlVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4VlFVRlZMRXRCUVVjc1UwRkJVeXhEUVVGQkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVlVGQlZTeERRVUZETzFGQlEycEdMRTFCUVUwc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4SlFVRkpMRTFCUVUwc1EwRkJRenRSUVVNdlF5eE5RVUZOTEZkQlFWY3NSMEZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRVmNzUzBGQlJ5eFRRVUZUTEVOQlFVRXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WFFVRlhMRU5CUVVNN1VVRkZja1lzU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlR0WlFVRkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEhRVUZITEhkQ1FVRjNRaXhEUVVGRExFTkJRVU03VTBGQlJUdFJRVU5vUlN4SlFVRkpMRU5CUVVNc1NVRkJTU3hKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NSVUZCUlR0WlFVRkZMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEhRVUZITEhkQ1FVRjNRaXhEUVVGRExFTkJRVU03VTBGQlJUdFJRVU0zUlN4VlFVRlZMRU5CUVVNc1NVRkJTU3hGUVVGRkxFZEJRVWNzUlVGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXp0UlFVTXZRaXhOUVVGTkxFOUJRVThzUjBGQlJ6dFpRVU5hTEZsQlFVTXNRMEZCUXl4elFrRkJjMElzUlVGRGNFSXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRlBMRVZCUVVVc1EwRkJVU3hGUVVGRkxFVkJRVVVzUTBGQlF5eFpRVUZETEVOQlFVTXNhVUpCUVUwc1JVRkJSVHRuUWtGRGFrUXNSMEZCUnl4RlFVRkZMR3RDUVVGclFqdG5Ra0ZEZGtJc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNXVUZCV1N4SlFVRkpMRVZCUVVVN1owSkJRM1JETEU5QlFVOHNSVUZCUlN4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU1zUTBGQlF6dGhRVU14UWl4RFFVRkRMRU5CUVVNc1EwRkRUanRUUVVOS0xFTkJRVU03VVVGRFJpeEpRVUZKTEZkQlFWY3NTVUZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUlVGQlJUdFpRVU5zUXl4UFFVRlBMRmxCUVVNc1EwRkJReXg1UWtGQlZ5eEZRVUZGTzJkQ1FVTnNRaXhIUVVGSExFVkJRVVVzWVVGQllTeEhRVUZITEVWQlFVVTdaMEpCUTNaQ0xGVkJRVlVzUlVGQlJTeEpRVUZKTzJkQ1FVTm9RaXhWUVVGVkxFVkJRVVU3YjBKQlExSXNXVUZCUXl4RFFVRkRMSEZDUVVGeFFpeEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRE8yOUNRVU16UXl4UFFVRlBPMmxDUVVOV08yRkJRMG9zUTBGQlF5eERRVUZETzFOQlEwNDdZVUZCVFR0WlFVTklMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVWQlFVVTdaMEpCUTI1Q0xFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNXVUZCUXl4RFFVRkRMSEZDUVVGeFFpeEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF6dGhRVU5vUlR0WlFVTkVMRTlCUVU4c1dVRkJReXhEUVVGRExHRkJRV0VzUjBGQlJ5eEZRVUZGTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNN1UwRkRla003U1VGRFRDeERRVUZETzBOQlEwbzdRVUYyUTBRc05FSkJkVU5ETzBGQlJVUXNVMEZCVXl4TlFVRk5MRU5CUVVNc1NVRkJWU3hGUVVGRkxFZEJRVThzUlVGQlJTeFBRVUZqTzBsQlF5OURMRTFCUVUwc1dVRkJXU3hIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUTNKRExFbEJRVWtzV1VGQldTeEhRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTXNSVUZCUlR0UlFVTm9SQ3hKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMHRCUTJ4Q08wRkJRMHdzUTBGQlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBoc3V0aWxfMSA9IHJlcXVpcmUoXCJoc3V0aWxcIik7XG5jb25zdCBsb2cgPSBuZXcgaHN1dGlsXzEuTG9nKCdFZGl0U2VsZWN0Jyk7XG5jbGFzcyBFZGl0U2VsZWN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RhYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIGNsaWNrKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGFibGUgPSB0cnVlO1xuICAgIH1cbiAgICBzZWxlY3QoZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZShlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xuICAgICAgICB0aGlzLnNlbGVjdGFibGUgPSBmYWxzZTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlID0gbm9kZS5hdHRycy51cGRhdGU7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKGBzZWxlY3QuaHNlZGl0X3NlbGVjdCR7Y3NzfWAsIHsgb25jaGFuZ2U6IHRoaXMuc2VsZWN0LmJpbmQodGhpcykgfSwgbm9kZS5hdHRycy5mcm9tLm1hcCgobykgPT4gbm9kZS5hdHRycy5zZWxlY3RlZCA9PT0gbyA/XG4gICAgICAgICAgICBoc2xheW91dF8xLm0oJ29wdGlvbi5oc2VkaXRfc2VsZWN0X29wdGlvbi5zZWxlY3RlZCcsIHsgdmFsdWU6IG8sIHNlbGVjdGVkOiB0cnVlIH0sIG8pIDpcbiAgICAgICAgICAgIGhzbGF5b3V0XzEubSgnb3B0aW9uLmhzZWRpdF9zZWxlY3Rfb3B0aW9uJywgeyB2YWx1ZTogbyB9LCBvKSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuRWRpdFNlbGVjdCA9IEVkaXRTZWxlY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lSV1JwZEZObGJHVmpkQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMM055WXk5RlpHbDBVMlZzWldOMExuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCY1VOQkxIVkRRVUZ2UXp0QlFVTndReXh0UTBGQmEwTTdRVUZCUlN4TlFVRk5MRWRCUVVjc1IwRkJSeXhKUVVGSkxGbEJRVWNzUTBGQlF5eFpRVUZaTEVOQlFVTXNRMEZCUXp0QlFVZDBSU3hOUVVGaExGVkJRVlU3U1VGQmRrSTdVVUZGU1N4bFFVRlZMRWRCUVVjc1MwRkJTeXhEUVVGRE8wbEJiVUoyUWl4RFFVRkRPMGxCYWtKSExFdEJRVXM3VVVGRFJDeEpRVUZKTEVOQlFVTXNWVUZCVlN4SFFVRkhMRWxCUVVrc1EwRkJRenRKUVVNelFpeERRVUZETzBsQlJVUXNUVUZCVFN4RFFVRkRMRU5CUVVzN1VVRkRVaXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4aFFVRmhMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03VVVGRGJrTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1IwRkJSeXhMUVVGTExFTkJRVU03U1VGRE5VSXNRMEZCUXp0SlFVVkVMRWxCUVVrc1EwRkJReXhKUVVGVk8xRkJRMWdzU1VGQlNTeERRVUZETEUxQlFVMHNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF6dFJRVU5vUXl4TlFVRk5MRWRCUVVjc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NTVUZCU1N4RlFVRkZMRU5CUVVNN1VVRkRha01zVDBGQlR5eFpRVUZETEVOQlFVTXNkVUpCUVhWQ0xFZEJRVWNzUlVGQlJTeEZRVUZGTEVWQlFVVXNVVUZCVVN4RlFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkRMRVZCUTNKRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVkVzUlVGQlJTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFdEJRVWNzUTBGQlF5eERRVUZCTEVOQlFVTTdXVUZEZEVRc1dVRkJReXhEUVVGRExITkRRVUZ6UXl4RlFVRkZMRVZCUVVVc1MwRkJTeXhGUVVGRkxFTkJRVU1zUlVGQlJTeFJRVUZSTEVWQlFVTXNTVUZCU1N4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU16UlN4WlFVRkRMRU5CUVVNc05rSkJRVFpDTEVWQlFVVXNSVUZCUlN4TFFVRkxMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTJoRkxFTkJRVU03UTBGRFNqdEJRWEpDUkN4blEwRnhRa01pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHN1dGlsXzEgPSByZXF1aXJlKFwiaHN1dGlsXCIpO1xuY29uc3QgbG9nID0gbmV3IGhzdXRpbF8xLkxvZygnRWRpdExhYmVsJyk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY2xhc3MgRWRpdFRleHRhcmVhIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVmYXVsdCA9ICcnO1xuICAgIH1cbiAgICBjbGljayhlKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSAhdGhpcy5lZGl0YWJsZTtcbiAgICB9XG4gICAgYmx1cihlKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYXNGb2N1cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZShlLnRhcmdldC52YWx1ZSk7XG4gICAgfVxuICAgIGtleXVwKGtleSkge1xuICAgICAgICBpZiAoa2V5LndoaWNoID09PSAxMykge1xuICAgICAgICAgICAga2V5LnRhcmdldC5ibHVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQ0IobmV3VmFsdWUpO1xuICAgIH1cbiAgICBvbnVwZGF0ZShub2RlKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRhYmxlICYmICF0aGlzLmhhc0ZvY3VzKSB7XG4gICAgICAgICAgICBub2RlLmRvbS52YWx1ZSA9IG5vZGUuYXR0cnMuY29udGVudCB8fCB0aGlzLmRlZmF1bHQ7XG4gICAgICAgICAgICBub2RlLmRvbS5mb2N1cygpO1xuICAgICAgICAgICAgbm9kZS5kb20uc2VsZWN0KCk7XG4gICAgICAgICAgICB0aGlzLmhhc0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDQiA9IG5vZGUuYXR0cnMudXBkYXRlO1xuICAgICAgICBjb25zdCBjc3MgPSBub2RlLmF0dHJzLmNzcyB8fCAnJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdGFibGUgP1xuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKGB0ZXh0YXJlYS5oc2VkaXRfdGV4dGFyZWEke2Nzc31gLCB7XG4gICAgICAgICAgICAgICAgd3JhcDogJ3BoeXNpY2FsJyxcbiAgICAgICAgICAgICAgICBvbmJsdXI6IHRoaXMuYmx1ci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgfSwgJycpXG4gICAgICAgICAgICA6IChub2RlLmF0dHJzLmNvbnRlbnQgJiYgbm9kZS5hdHRycy5jb250ZW50Lmxlbmd0aCkgP1xuICAgICAgICAgICAgICAgIGhzbGF5b3V0XzEubShgZGl2LmhzZWRpdF90ZXh0YXJlYSR7Y3NzfWAsIHsgb25jbGljazogdGhpcy5jbGljay5iaW5kKHRoaXMpIH0sIG5vZGUuYXR0cnMuY29udGVudClcbiAgICAgICAgICAgICAgICA6IGhzbGF5b3V0XzEubShgZGl2LmhzZWRpdF90ZXh0YXJlYS5kZWZhdWx0JHtjc3N9YCwgeyBvbmNsaWNrOiB0aGlzLmNsaWNrLmJpbmQodGhpcykgfSwgbm9kZS5hdHRycy5wbGFjZWhvbGRlciB8fCAnY2xpY2sgdG8gZW50ZXInKTtcbiAgICB9XG59XG5leHBvcnRzLkVkaXRUZXh0YXJlYSA9IEVkaXRUZXh0YXJlYTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVJXUnBkRlJsZUhSaGNtVmhMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZjM0pqTDBWa2FYUlVaWGgwWVhKbFlTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVhGRFFTeHRRMEZCYTBNN1FVRkJSU3hOUVVGTkxFZEJRVWNzUjBGQlJ5eEpRVUZKTEZsQlFVY3NRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJRenRCUVVOeVJTeDFRMEZCYjBNN1FVRkhjRU1zVFVGQllTeFpRVUZaTzBsQlFYcENPMUZCUTJNc1lVRkJVU3hIUVVGSExFdEJRVXNzUTBGQlF6dFJRVU5xUWl4aFFVRlJMRWRCUVVjc1MwRkJTeXhEUVVGRE8xRkJSV3BDTEZsQlFVOHNSMEZCUnl4RlFVRkZMRU5CUVVNN1NVRTBRek5DTEVOQlFVTTdTVUV4UTJFc1MwRkJTeXhEUVVGRExFTkJRVXM3VVVGRGFrSXNTVUZCU1N4RFFVRkRMRkZCUVZFc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTTdTVUZEYmtNc1EwRkJRenRKUVVWVExFbEJRVWtzUTBGQlF5eERRVUZMTzFGQlEyaENMRWxCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzUzBGQlN5eERRVUZETzFGQlEzUkNMRWxCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzUzBGQlN5eERRVUZETzFGQlEzUkNMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRKUVVOb1F5eERRVUZETzBsQlJWTXNTMEZCU3l4RFFVRkRMRWRCUVU4N1VVRkRia0lzU1VGQlNTeEhRVUZITEVOQlFVTXNTMEZCU3l4TFFVRkxMRVZCUVVVc1JVRkJSVHRaUVVOc1FpeEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRE8xTkJRM0pDTzBsQlEwd3NRMEZCUXp0SlFVVlRMRTFCUVUwc1EwRkJReXhSUVVGbE8xRkJRelZDTEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03U1VGRE5VSXNRMEZCUXp0SlFVVk5MRkZCUVZFc1EwRkJReXhKUVVGVk8xRkJRM1JDTEVsQlFVa3NTVUZCU1N4RFFVRkRMRkZCUVZFc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVTdXVUZEYWtNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eExRVUZMTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFbEJRVWtzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXp0WlFVTndSQ3hKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRPMWxCUTJwQ0xFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNN1dVRkRiRUlzU1VGQlNTeERRVUZETEZGQlFWRXNSMEZCUnl4SlFVRkpMRU5CUVVNN1UwRkRlRUk3U1VGRFRDeERRVUZETzBsQlJVMHNTVUZCU1N4RFFVRkRMRWxCUVZVN1VVRkRiRUlzU1VGQlNTeERRVUZETEZGQlFWRXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF6dFJRVU5zUXl4TlFVRk5MRWRCUVVjc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NTVUZCU1N4RlFVRkZMRU5CUVVNN1VVRkRha01zVDBGQlR5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkJMRU5CUVVNN1dVRkRha0lzV1VGQlF5eERRVUZETERKQ1FVRXlRaXhIUVVGSExFVkJRVVVzUlVGQlJUdG5Ra0ZEYUVNc1NVRkJTU3hGUVVGRkxGVkJRVlU3WjBKQlEyaENMRTFCUVUwc1JVRkJSU3hKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNN1lVRkZMMElzUlVGQlF5eEZRVUZGTEVOQlFVTTdXVUZEV0N4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNTVUZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUVN4RFFVRkRPMmRDUVVNNVF5eFpRVUZETEVOQlFVTXNjMEpCUVhOQ0xFZEJRVWNzUlVGQlJTeEZRVUZGTEVWQlFVVXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTTdaMEpCUTNoR0xFTkJRVU1zUTBGQlF5eFpRVUZETEVOQlFVTXNPRUpCUVRoQ0xFZEJRVWNzUlVGQlJTeEZRVUZGTEVWQlFVVXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFhRVUZYTEVsQlFVa3NaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dEpRVU12U0N4RFFVRkRPME5CUTBvN1FVRm9SRVFzYjBOQlowUkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY2xhc3MgTGFiZWwge1xuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBjc3MgPSBub2RlLmF0dHJzLmNzcyB8fCAnJztcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBub2RlLmF0dHJzLnN0eWxlIHx8ICcnO1xuICAgICAgICBjb25zdCB0ZXh0ID0gbm9kZS5hdHRycy50ZXh0IHx8ICd1bnNwZWNpZmllZCc7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oYC5ocy1sYWJlbCAke2Nzc31gLCB7IHN0eWxlOiBzdHlsZSB9LCBoc2xheW91dF8xLm0udHJ1c3QodGV4dCkpO1xuICAgIH1cbn1cbmV4cG9ydHMuTGFiZWwgPSBMYWJlbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVRHRmlaV3d1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdlRHRmlaV3d1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRm5RMEVzZFVOQlFYZERPMEZCV1hoRExFMUJRV0VzUzBGQlN6dEpRVU5rTEVsQlFVa3NRMEZCUXl4SlFVRlhPMUZCUTFvc1RVRkJUU3hIUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SFFVRkhMRWxCUVVrc1JVRkJSU3hEUVVGRE8xRkJRMnBETEUxQlFVMHNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVTnlReXhOUVVGTkxFbEJRVWtzUjBGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1NVRkJTU3hoUVVGaExFTkJRVU03VVVGREwwTXNUMEZCVHl4WlFVRkRMRU5CUVVNc1lVRkJZU3hIUVVGSExFVkJRVVVzUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUXl4TFFVRkxMRVZCUVVVc1JVRkJSU3haUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRha1VzUTBGQlF6dERRVU5LTzBGQlVFUXNjMEpCVDBNaWZRPT0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBoc2xheW91dF8yID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgUmFkaW9CdXR0b25fMSA9IHJlcXVpcmUoXCIuL1JhZGlvQnV0dG9uXCIpO1xuY2xhc3MgTWVudSBleHRlbmRzIFJhZGlvQnV0dG9uXzEuUmFkaW9CdXR0b24ge1xuICAgIHZpZXcobm9kZSkge1xuICAgICAgICB0aGlzLm9udXBkYXRlKG5vZGUpO1xuICAgICAgICByZXR1cm4gUmFkaW9CdXR0b25fMS5SYWRpb0J1dHRvbi52aWV3R3JvdXAoJy5ocy1tZW51Jywgbm9kZSk7XG4gICAgfVxufVxuZXhwb3J0cy5NZW51ID0gTWVudTtcbmNsYXNzIE1lbnVQYW5lbCBleHRlbmRzIGhzbGF5b3V0XzIuTGF5b3V0IHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gbm9kZS5hdHRycy5pdGVtcy5pbmRleE9mKG5vZGUuYXR0cnMuZGVmYXVsdEl0ZW0pO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgbGV0IGl0ZW1zID0gbm9kZS5hdHRycy5pdGVtcztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShoc2xheW91dF8yLkxheW91dCwge1xuICAgICAgICAgICAgcm93czogW1wiMzBweFwiLCBcImZpbGxcIl0sXG4gICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgICAgaHNsYXlvdXRfMS5tKE1lbnUsIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzYzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGl0ZW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEl0ZW06IG5vZGUuYXR0cnMuZGVmYXVsdEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja2VkOiAoaXRlbSkgPT4gdGhpcy5zZWxlY3RlZCA9IGl0ZW1zLmluZGV4T2YoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBub2RlLmF0dHJzLmNzcyxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IG5vZGUuYXR0cnMuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIHNpemVzOiBub2RlLmF0dHJzLnNpemVzXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgaHNsYXlvdXRfMS5tKGhzbGF5b3V0XzIuTGF5b3V0LCB7IGNzczogJy5ocy1tZW51LXBhbmVsJywgY29udGVudDogbm9kZS5hdHRycy5jb250ZW50W3RoaXMuc2VsZWN0ZWRdIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuTWVudVBhbmVsID0gTWVudVBhbmVsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVFdWdWRTNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlOWlc1MUxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCT0VaQkxIVkRRVUYzUXp0QlFVTjRReXgxUTBGQmQwTTdRVUZEZUVNc0swTkJRVFpETzBGQk5FSTNReXhOUVVGaExFbEJRVXNzVTBGQlVTeDVRa0ZCVnp0SlFVTnFReXhKUVVGSkxFTkJRVU1zU1VGQlZ6dFJRVU5hTEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGNFSXNUMEZCVHl4NVFrRkJWeXhEUVVGRExGTkJRVk1zUTBGQlF5eFZRVUZWTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRia1FzUTBGQlF6dERRVU5LTzBGQlRFUXNiMEpCUzBNN1FVRjVRa1FzVFVGQllTeFRRVUZWTEZOQlFWRXNhVUpCUVUwN1NVRkZha01zVFVGQlRTeERRVUZETEVsQlFWYzdVVUZEWkN4SlFVRkpMRU5CUVVNc1VVRkJVU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMGxCUTNKRkxFTkJRVU03U1VGRFJDeEpRVUZKTEVOQlFVTXNTVUZCVnp0UlFVTmFMRWxCUVVrc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRPMUZCUXpkQ0xFOUJRVThzV1VGQlF5eERRVUZETEdsQ1FVRk5MRVZCUVVVN1dVRkRZaXhKUVVGSkxFVkJRVU1zUTBGQlF5eE5RVUZOTEVWQlFVVXNUVUZCVFN4RFFVRkRPMWxCUTNKQ0xFOUJRVThzUlVGQlF6dG5Ra0ZEU2l4WlFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRk8yOUNRVU5LTEVsQlFVa3NSVUZCUlR0M1FrRkRSaXhMUVVGTExFVkJRVVVzUzBGQlN6dDNRa0ZEV2l4WFFVRlhMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFhRVUZYTzNkQ1FVTnVReXhQUVVGUExFVkJRVVVzUTBGQlF5eEpRVUZYTEVWQlFVVXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhSUVVGUkxFZEJRVWNzUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNN2NVSkJRMmhGTzI5Q1FVTkVMRWRCUVVjc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVYzdiMEpCUTI1Q0xFdEJRVXNzUlVGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzN2IwSkJRM1pDTEV0QlFVc3NSVUZCUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXM3YVVKQlF6RkNMRU5CUVVNN1owSkJRMFlzV1VGQlF5eERRVUZETEdsQ1FVRk5MRVZCUVVVc1JVRkJSU3hIUVVGSExFVkJRVU1zWjBKQlFXZENMRVZCUVVVc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zUlVGQlJTeERRVUZETzJGQlEyeEdPMU5CUTBvc1EwRkJReXhEUVVGRE8wbEJRMUFzUTBGQlF6dERRVU5LTzBGQmVFSkVMRGhDUVhkQ1F5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBUb29sYmFyQnV0dG9uXzEgPSByZXF1aXJlKFwiLi9Ub29sYmFyQnV0dG9uXCIpO1xuY2xhc3MgTW9kYWwge1xuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIG5vZGUuc3RhdGUuaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKTtcbiAgICAgICAgbm9kZS5zdGF0ZS5zaG93TW9kYWwgPSBmYWxzZTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLnNob3dNb2RhbCA9IHRydWU7XG4gICAgICAgICAgICBoc2xheW91dF8xLm0ucmVkcmF3KCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGRpc21pc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5vZGUuYXR0cnMuZGlzbWlzcykge1xuICAgICAgICAgICAgICAgIG5vZGUuYXR0cnMuZGlzbWlzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB3ID0gbm9kZS5hdHRycy53aWR0aCB8fCAnYXV0byc7XG4gICAgICAgIGNvbnN0IGggPSBub2RlLmF0dHJzLmhlaWdodCB8fCAnYXV0byc7XG4gICAgICAgIGNvbnN0IGF0dHJzID0geyBzdHlsZTogYHdpZHRoOiR7d307IGhlaWdodDoke2h9O2AgfTtcbiAgICAgICAgaWYgKG5vZGUuYXR0cnMuc2V0VHJpZ2dlcikge1xuICAgICAgICAgICAgbm9kZS5hdHRycy5zZXRUcmlnZ2VyKHRyaWdnZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHJlcXVpcmVkIGF0dHJpYnV0ZSBmdW5jdGlvbiAnc2V0VHJpZ2dlcicgaXMgbm90IGRlZmluZWRgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gIW5vZGUuc3RhdGUuc2hvd01vZGFsID8gaHNsYXlvdXRfMS5tKCdzcGFuJykgOiBoc2xheW91dF8xLm0oJy5ocy1tb2RhbC1mcmFtZScsIFtcbiAgICAgICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLW1vZGFsLWJhY2tncm91bmQnLCB7IG9uY2xpY2s6IGRpc21pc3MgfSwgJycpLFxuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKCcuaHMtbW9kYWwtZm9yZWdyb3VuZCcsIGF0dHJzLCAhbm9kZS5hdHRycy5jb250ZW50ID8gJ21vZGFsIHBhbmUnIDogW1xuICAgICAgICAgICAgICAgIG5vZGUuYXR0cnMuY29udGVudCxcbiAgICAgICAgICAgICAgICBoc2xheW91dF8xLm0oVG9vbGJhckJ1dHRvbl8xLlRvb2xiYXJCdXR0b24sIHsgb25jbGljazogZGlzbWlzcywgc3ltYm9sczogVG9vbGJhckJ1dHRvbl8xLlRvb2xiYXJCdXR0b24uZ2V0U3ltYm9sKCdjcm9zcycpIH0pXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKTtcbiAgICB9XG59XG5leHBvcnRzLk1vZGFsID0gTW9kYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUVzlrWVd3dWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZUVzlrWVd3dWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZ2UTBFc2RVTkJRVzlETzBGQlEzQkRMRzFFUVVGblJEdEJRVVZvUkN4TlFVRmhMRXRCUVVzN1NVRkRaQ3hOUVVGTkxFTkJRVU1zU1VGQlZUdFJRVU5pTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1JVRkJSU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSU3hIUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFGQlF5OURMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eEhRVUZITEV0QlFVc3NRMEZCUXp0SlFVTnFReXhEUVVGRE8wbEJRMFFzU1VGQlNTeERRVUZETEVsQlFWVTdVVUZEV0N4TlFVRk5MRTlCUVU4c1IwRkJSeXhIUVVGSExFVkJRVVU3V1VGRGFrSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhUUVVGVExFZEJRVWNzU1VGQlNTeERRVUZETzFsQlF6VkNMRmxCUVVNc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF6dFJRVU5tTEVOQlFVTXNRMEZCUXp0UlFVTkdMRTFCUVUwc1QwRkJUeXhIUVVGSExFZEJRVWNzUlVGQlJUdFpRVU5xUWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGTkJRVk1zUjBGQlJ5eExRVUZMTEVOQlFVTTdXVUZETjBJc1NVRkJTU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlR0blFrRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMkZCUVVVN1VVRkRja1FzUTBGQlF5eERRVUZETzFGQlEwWXNUVUZCVFN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVsQlFVc3NUVUZCVFN4RFFVRkRPMUZCUTNSRExFMUJRVTBzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hKUVVGSkxFMUJRVTBzUTBGQlF6dFJRVU4wUXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhGUVVGRkxFdEJRVXNzUlVGQlJTeFRRVUZUTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWRCUVVjc1JVRkJReXhEUVVGRE8xRkJRMjVFTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhWUVVGVkxFVkJRVVU3V1VGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRlZCUVZVc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dFRRVUZGTzJGQlEzcEVPMWxCUVVVc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eDVSRUZCZVVRc1EwRkJReXhEUVVGRE8xTkJRVVU3VVVGRGFFWXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZCTEVOQlFVTXNRMEZCUXl4WlFVRkRMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEZsQlFVTXNRMEZCUXl4cFFrRkJhVUlzUlVGQlJUdFpRVU16UkN4WlFVRkRMRU5CUVVNc2MwSkJRWE5DTEVWQlFVVXNSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRExFVkJRVVVzUlVGQlJTeERRVUZETzFsQlEyeEVMRmxCUVVNc1EwRkJReXh6UWtGQmMwSXNSVUZCUlN4TFFVRkxMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUVN4RFFVRkRMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEYWtVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTzJkQ1FVTnNRaXhaUVVGRExFTkJRVU1zTmtKQlFXRXNSVUZCUlN4RlFVRkZMRTlCUVU4c1JVRkJSU3hQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZETERaQ1FVRmhMRU5CUVVNc1UwRkJVeXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTEVOQlFVTTdZVUZEYmtZc1EwRkJRenRUUVVOTUxFTkJRVU1zUTBGQlF6dEpRVU5RTEVOQlFVTTdRMEZEU2p0QlFUTkNSQ3h6UWtFeVFrTWlmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgaHNsYXlvdXRfMiA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IFNlbGVjdG9yXzEgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNvbnN0IFNlbGVjdG9yXzIgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNsYXNzIE9wdGlvbnNCdXR0b24gZXh0ZW5kcyBTZWxlY3Rvcl8xLlNlbGVjdG9yIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBTZWxlY3Rvcl8xLlNlbGVjdG9yLmluaXQobm9kZSwgU2VsZWN0b3JfMi5hbnlJdGVtcyk7XG4gICAgfVxuICAgIHN0YXRpYyB2aWV3R3JvdXAoY3NzLCBub2RlKSB7XG4gICAgICAgIGNzcyA9IGAke2Nzc30gJHtub2RlLmF0dHJzLmNzcyB8fCAnJ31gO1xuICAgICAgICBjb25zdCBzdHlsZSA9IG5vZGUuYXR0cnMuc3R5bGUgfHwgJyc7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oY3NzLCB7IHN0eWxlOiBzdHlsZSB9LCBoc2xheW91dF8xLm0oaHNsYXlvdXRfMi5MYXlvdXQsIHtcbiAgICAgICAgICAgIGNvbHVtbnM6IFtdLFxuICAgICAgICAgICAgY29udGVudDogbm9kZS5zdGF0ZS5pdGVtcy5tYXAoKGwsIGkpID0+IFNlbGVjdG9yXzEuU2VsZWN0b3IucmVuZGVySXRlbShub2RlLCBpKSlcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHsgcmV0dXJuIE9wdGlvbnNCdXR0b24udmlld0dyb3VwKCcuaHMtb3B0aW9ucy1idXR0b25zJywgbm9kZSk7IH1cbn1cbmV4cG9ydHMuT3B0aW9uc0J1dHRvbiA9IE9wdGlvbnNCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUM0IwYVc5dWMwSjFkSFJ2Ymk1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OVBjSFJwYjI1elFuVjBkRzl1TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJLMEpCTEhWRFFVRjVRenRCUVVONlF5eDFRMEZCZVVNN1FVRkRla01zZVVOQlFUSkRPMEZCUXpORExIbERRVUV5UXp0QlFXdENNME1zVFVGQllTeGhRVUZqTEZOQlFWRXNiVUpCUVZFN1NVRkRka01zVFVGQlRTeERRVUZETEVsQlFWVTdVVUZEWWl4dFFrRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNiVUpCUVZFc1EwRkJReXhEUVVGRE8wbEJRMnhETEVOQlFVTTdTVUZEUkN4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExFZEJRVlVzUlVGQlJTeEpRVUZYTzFGQlEzQkRMRWRCUVVjc1IwRkJSeXhIUVVGSExFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1NVRkJTU3hGUVVGRkxFVkJRVVVzUTBGQlF6dFJRVU4yUXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NTVUZCU1N4RlFVRkZMRU5CUVVNN1VVRkZja01zVDBGQlR5eFpRVUZETEVOQlFVTXNSMEZCUnl4RlFVRkZMRVZCUVVNc1MwRkJTeXhGUVVGRExFdEJRVXNzUlVGQlF5eEZRVUZGTEZsQlFVTXNRMEZCUXl4cFFrRkJUU3hGUVVGRk8xbEJRMjVETEU5QlFVOHNSVUZCUlN4RlFVRkZPMWxCUTFnc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVkVzUlVGQlJTeERRVUZSTEVWQlFVVXNSVUZCUlN4RFFVRkRMRzFDUVVGUkxFTkJRVU1zVlVGQlZTeERRVUZETEVsQlFVa3NSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVOMFJpeERRVUZETEVOQlFVTXNRMEZCUXp0SlFVTlNMRU5CUVVNN1NVRkRSQ3hKUVVGSkxFTkJRVU1zU1VGQlZ5eEpRVUZYTEU5QlFVOHNZVUZCWVN4RFFVRkRMRk5CUVZNc1EwRkJReXh4UWtGQmNVSXNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UTBGRE5VWTdRVUZrUkN4elEwRmpReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgaHNsYXlvdXRfMiA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmNvbnN0IFNlbGVjdG9yXzEgPSByZXF1aXJlKFwiLi9TZWxlY3RvclwiKTtcbmNsYXNzIFJhZGlvQnV0dG9uIGV4dGVuZHMgU2VsZWN0b3JfMS5TZWxlY3RvciB7XG4gICAgc3RhdGljIHZpZXdHcm91cChjc3MsIG5vZGUpIHtcbiAgICAgICAgY3NzID0gYCR7Y3NzfSAke25vZGUuYXR0cnMuY3NzIHx8ICcnfWA7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gbm9kZS5hdHRycy5zdHlsZSB8fCAnJztcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShjc3MsIHsgc3R5bGU6IHN0eWxlIH0sIGhzbGF5b3V0XzEubShoc2xheW91dF8yLkxheW91dCwge1xuICAgICAgICAgICAgY29sdW1uczogbm9kZS5hdHRycy5zaXplcyB8fCBbXSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IG5vZGUuc3RhdGUuaXRlbXMubWFwKChsLCBpKSA9PiBTZWxlY3Rvcl8xLlNlbGVjdG9yLnJlbmRlckl0ZW0obm9kZSwgaSkpXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgc3VwZXIub25pbml0KG5vZGUpO1xuICAgICAgICBTZWxlY3Rvcl8xLlNlbGVjdG9yLmVuc3VyZVNlbGVjdGVkKG5vZGUpO1xuICAgIH1cbiAgICBvbnVwZGF0ZShub2RlKSB7XG4gICAgICAgIHN1cGVyLm9udXBkYXRlKG5vZGUpO1xuICAgICAgICBTZWxlY3Rvcl8xLlNlbGVjdG9yLmVuc3VyZVNlbGVjdGVkKG5vZGUpO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHsgcmV0dXJuIFJhZGlvQnV0dG9uLnZpZXdHcm91cCgnLmhzLXJhZGlvLWJ1dHRvbnMnLCBub2RlKTsgfVxufVxuZXhwb3J0cy5SYWRpb0J1dHRvbiA9IFJhZGlvQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pVW1Ga2FXOUNkWFIwYjI0dWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk5emNtTXZVbUZrYVc5Q2RYUjBiMjR1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRnBRMEVzZFVOQlFUUkRPMEZCUXpWRExIVkRRVUUwUXp0QlFVTTFReXg1UTBGQk9FTTdRVUZ0UWpsRExFMUJRV0VzVjBGQldTeFRRVUZSTEcxQ1FVRlJPMGxCUTNKRExFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNSMEZCVlN4RlFVRkZMRWxCUVZjN1VVRkRjRU1zUjBGQlJ5eEhRVUZITEVkQlFVY3NSMEZCUnl4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVWQlFVVXNSVUZCUlN4RFFVRkRPMUZCUTNaRExFMUJRVTBzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVVZ5UXl4UFFVRlBMRmxCUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlF5eExRVUZMTEVWQlFVTXNTMEZCU3l4RlFVRkRMRVZCUVVVc1dVRkJReXhEUVVGRExHbENRVUZOTEVWQlFVVTdXVUZEYmtNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SlFVRkpMRVZCUVVVN1dVRkRMMElzVDBGQlR5eEZRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFWRXNSVUZCUlN4RFFVRlJMRVZCUVVVc1JVRkJSU3hEUVVGRExHMUNRVUZSTEVOQlFVTXNWVUZCVlN4RFFVRkRMRWxCUVVrc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF6dFRRVU4wUml4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOU0xFTkJRVU03U1VGRFJDeE5RVUZOTEVOQlFVTXNTVUZCVnp0UlFVTmtMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZEYmtJc2JVSkJRVkVzUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRiRU1zUTBGQlF6dEpRVU5FTEZGQlFWRXNRMEZCUXl4SlFVRlhPMUZCUTJoQ0xFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRja0lzYlVKQlFWRXNRMEZCUXl4alFVRmpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03U1VGRGJFTXNRMEZCUXp0SlFVTkVMRWxCUVVrc1EwRkJReXhKUVVGWExFbEJRVmNzVDBGQlR5eFhRVUZYTEVOQlFVTXNVMEZCVXl4RFFVRkRMRzFDUVVGdFFpeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenREUVVONFJqdEJRVzVDUkN4clEwRnRRa01pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmZ1bmN0aW9uIG9uZU9mSXRlbXMoaXRlbXMsIHRpdGxlKSB7XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmlzU2VsZWN0ZWQgPSAoaXRlbS50aXRsZSA9PT0gdGl0bGUpO1xuICAgIH0pO1xuICAgIGlmICghaXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5pc1NlbGVjdGVkKSkge1xuICAgICAgICBpdGVtc1swXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pc1NlbGVjdGVkKVswXTtcbn1cbmV4cG9ydHMub25lT2ZJdGVtcyA9IG9uZU9mSXRlbXM7XG5mdW5jdGlvbiBhbnlJdGVtcyhpdGVtcywgdGl0bGUpIHtcbiAgICBpdGVtc1t0aXRsZV0uaXNTZWxlY3RlZCA9ICFpdGVtc1t0aXRsZV0uaXNTZWxlY3RlZDtcbiAgICByZXR1cm4gaXRlbXNbdGl0bGVdO1xufVxuZXhwb3J0cy5hbnlJdGVtcyA9IGFueUl0ZW1zO1xuY2xhc3MgU2VsZWN0b3Ige1xuICAgIHN0YXRpYyB1cGRhdGVJdGVtcyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gbm9kZS5hdHRycy5kZXNjLml0ZW1zIHx8IFtdO1xuICAgICAgICBpdGVtcy5tYXAoKGl0bSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IG5vZGUuc3RhdGUuaXRlbXNbaXRtXSB8fCB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGl0bSxcbiAgICAgICAgICAgICAgICBpc1NlbGVjdGVkOiBmYWxzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuaXRlbXNbaV0gPSBpdGVtO1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5pdGVtc1tpdG1dID0gaXRlbTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBpbml0KG5vZGUsIG1vZGVsID0gb25lT2ZJdGVtcykge1xuICAgICAgICBub2RlLnN0YXRlLnVwZGF0ZU1vZGVsID0gbW9kZWw7XG4gICAgICAgIG5vZGUuc3RhdGUuaXRlbXMgPSBbXTtcbiAgICAgICAgbm9kZS5zdGF0ZS5ldmVudHMgPSB7fTtcbiAgICAgICAgbm9kZS5zdGF0ZS5pdGVtQ2xpY2tlZCA9IChpdGVtKSA9PiBpdGVtO1xuICAgICAgICBub2RlLnN0YXRlLmRlZmF1bHRJdGVtID0gbm9kZS5hdHRycy5kZXNjLmRlZmF1bHRJdGVtO1xuICAgICAgICBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZURvd24gPSBub2RlLmF0dHJzLmRlc2MubW91c2VEb3duO1xuICAgICAgICBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZVVwID0gbm9kZS5hdHRycy5kZXNjLm1vdXNlVXA7XG4gICAgICAgIG5vZGUuYXR0cnMuZGVzYy5jbGlja2VkID0gbm9kZS5hdHRycy5kZXNjLmNsaWNrZWQgfHwgKChpdGVtKSA9PiBjb25zb2xlLmxvZyhgbWlzc2luZyBjbGlja2VkKCkgZnVuY3Rpb24gZm9yIHNlbGVjdG9yIGl0ZW0gJHtpdGVtfWApKTtcbiAgICAgICAgbm9kZS5zdGF0ZS5ldmVudHMuY2xpY2tlZCA9IG5vZGUuYXR0cnMuZGVzYy5jbGlja2VkO1xuICAgICAgICBTZWxlY3Rvci51cGRhdGVJdGVtcyhub2RlKTtcbiAgICB9XG4gICAgb25pbml0KG5vZGUpIHtcbiAgICAgICAgU2VsZWN0b3IuaW5pdChub2RlKTtcbiAgICB9XG4gICAgb251cGRhdGUobm9kZSkge1xuICAgICAgICBTZWxlY3Rvci51cGRhdGVJdGVtcyhub2RlKTtcbiAgICB9XG4gICAgc3RhdGljIGVuc3VyZVNlbGVjdGVkKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUuc3RhdGUgJiYgbm9kZS5zdGF0ZS5pdGVtcyAmJiAhbm9kZS5zdGF0ZS5pdGVtcy5zb21lKChpKSA9PiBpLmlzU2VsZWN0ZWQpICYmIG5vZGUuc3RhdGUuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKG5vZGUuc3RhdGUuZGVmYXVsdEl0ZW0gJiYgbm9kZS5zdGF0ZS5pdGVtc1tub2RlLnN0YXRlLmRlZmF1bHRJdGVtXSkge1xuICAgICAgICAgICAgICAgIG5vZGUuc3RhdGUuaXRlbXNbbm9kZS5zdGF0ZS5kZWZhdWx0SXRlbV0uaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChub2RlLnN0YXRlLml0ZW1zWzBdKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5pdGVtc1swXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgcmVuZGVySXRlbShub2RlLCBpKSB7XG4gICAgICAgIGNvbnN0IHJlYWN0b3IgPSAoY2FsbGJhY2spID0+ICh0aXRsZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS51cGRhdGVNb2RlbChub2RlLnN0YXRlLml0ZW1zLCB0aXRsZSk7XG4gICAgICAgICAgICB0aXRsZSA9IG5vZGUuc3RhdGUuaXRlbUNsaWNrZWQodGl0bGUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRpdGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgaWxsZWdhbCByZW5kZXIgaW5kZXggJHtpfSAke25vZGUuc3RhdGUuaXRlbXMubWFwKChpKSA9PiBpLnRpdGxlKS5qb2luKCd8Jyl9YCk7XG4gICAgICAgICAgICBpID0gMDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtID0gbm9kZS5zdGF0ZS5pdGVtc1tpXTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBpdGVtLnRpdGxlIHx8ICcnO1xuICAgICAgICBjb25zdCBpdGVtQ3NzID0gaXRlbS5jc3MgfHwgJyc7XG4gICAgICAgIHJldHVybiByZW5kZXJTZWxlY3RhYmxlKHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGNzczogaXRlbUNzcyxcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IG5vZGUuc3RhdGUuaXRlbXNbdGl0bGVdID8gbm9kZS5zdGF0ZS5pdGVtc1t0aXRsZV0uaXNTZWxlY3RlZCA6IGZhbHNlLFxuICAgICAgICAgICAgbW91c2VEb3duOiBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZURvd24sXG4gICAgICAgICAgICBtb3VzZVVwOiBub2RlLnN0YXRlLmV2ZW50cy5tb3VzZVVwLFxuICAgICAgICAgICAgY2xpY2tlZDogcmVhY3Rvcihub2RlLnN0YXRlLmV2ZW50cy5jbGlja2VkKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLlNlbGVjdG9yID0gU2VsZWN0b3I7XG5mdW5jdGlvbiByZW5kZXJTZWxlY3RhYmxlKGQpIHtcbiAgICBjb25zdCBvbmNsaWNrID0gZC5jbGlja2VkID8gKCkgPT4geyBkLmNsaWNrZWQoZC50aXRsZSk7IH0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgb25tb3VzZWRvd24gPSBkLm1vdXNlRG93biA/ICgpID0+IHsgZC5tb3VzZURvd24oZC50aXRsZSk7IH0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgb25tb3VzZXVwID0gZC5tb3VzZVVwID8gKCkgPT4geyBkLm1vdXNlVXAoZC50aXRsZSk7IH0gOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGhzbGF5b3V0XzEubShgLmhzLXNlbGVjdGFibGUgJHtkLmNzcyB8fCAnJ30gJHtkLmlzU2VsZWN0ZWQgPyAnaHMtc2VsZWN0ZWQnIDogJyd9YCwgeyBzdHlsZTogZC5zdHlsZSwgb25jbGljazogb25jbGljaywgb25tb3VzZWRvd246IG9ubW91c2Vkb3duLCBvbm1vdXNldXA6IG9ubW91c2V1cCB9LCBkLnRpdGxlKTtcbn1cbmV4cG9ydHMucmVuZGVyU2VsZWN0YWJsZSA9IHJlbmRlclNlbGVjdGFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lVMlZzWldOMGIzSXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12VTJWc1pXTjBiM0l1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRnhRa0VzZFVOQlFXOURPMEZCSzBOd1F5eFRRVUZuUWl4VlFVRlZMRU5CUVVNc1MwRkJjMElzUlVGQlJTeExRVUZaTzBsQlF6TkVMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eEpRVUZ0UWl4RlFVRkZMRVZCUVVVN1VVRkRiRU1zU1VGQlNTeERRVUZETEZWQlFWVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFdEJRVWNzUzBGQlN5eERRVUZETEVOQlFVTTdTVUZETTBNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFNDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFbEJRVzFDTEVWQlFVVXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zUlVGQlJUdFJRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhWUVVGVkxFZEJRVWNzU1VGQlNTeERRVUZETzB0QlFVVTdTVUZETVVZc1QwRkJUeXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNTVUZCYlVJc1JVRkJSU3hGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJRM0pGTEVOQlFVTTdRVUZPUkN4blEwRk5RenRCUVUxRUxGTkJRV2RDTEZGQlFWRXNRMEZCUXl4TFFVRnpRaXhGUVVGRkxFdEJRVms3U1VGRGVrUXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExGVkJRVlVzUjBGQlJ5eERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhWUVVGVkxFTkJRVU03U1VGRGJrUXNUMEZCVHl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03UVVGRGVFSXNRMEZCUXp0QlFVaEVMRFJDUVVkRE8wRkJjVUpFTEUxQlFYTkNMRkZCUVZFN1NVRkxNVUlzVFVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRlZPMUZCUTNwQ0xFMUJRVTBzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzU1VGQlNTeEZRVUZGTEVOQlFVTTdVVUZETVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVkQlFWVXNSVUZCUlN4RFFVRlJMRVZCUVVVc1JVRkJSVHRaUVVNdlFpeE5RVUZOTEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1R0blFrRkRiRU1zUzBGQlN5eEZRVUZGTEVkQlFVYzdaMEpCUTFZc1ZVRkJWU3hGUVVGRkxFdEJRVXM3WVVGRGNFSXNRMEZCUXp0WlFVTkdMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJRenRaUVVNelFpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTTdVVUZEYWtNc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRFVDeERRVUZETzBsQlYwUXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGWExFVkJRVVVzUzBGQlN5eEhRVUZETEZWQlFWVTdVVUZEY2tNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFhRVUZYTEVkQlFVY3NTMEZCU3l4RFFVRkRPMUZCUXk5Q0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRnhRaXhGUVVGRkxFTkJRVU03VVVGRGVFTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFZEJRVWNzUlVGQlJTeERRVUZETzFGQlEzWkNMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVjBGQlZ5eEhRVUZITEVOQlFVTXNTVUZCVnl4RlFVRkZMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU03VVVGREwwTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRE8xRkJRM0pFTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1RVRkJUU3hEUVVGRExGTkJRVk1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU03VVVGRGVFUXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR5eEhRVUZMTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF6dFJRVU4wUkN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eFBRVUZQTEVkQlFVOHNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SlFVRlhMRVZCUVVVc1JVRkJSU3hEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNaMFJCUVdkRUxFbEJRVWtzUlVGQlJTeERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTm9TaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRWRCUVVzc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRPMUZCUTNSRUxGRkJRVkVzUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRMMElzUTBGQlF6dEpRVVZFTEUxQlFVMHNRMEZCUXl4SlFVRlhPMUZCUTJRc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTjRRaXhEUVVGRE8wbEJRMFFzVVVGQlVTeERRVUZETEVsQlFWYzdVVUZEYUVJc1VVRkJVU3hEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SlFVTXZRaXhEUVVGRE8wbEJUMU1zVFVGQlRTeERRVUZETEdOQlFXTXNRMEZCUXl4SlFVRlhPMUZCUTNaRExFbEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NTVUZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFXZENMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU1zUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVkQlFVTXNRMEZCUXl4RlFVRkZPMWxCUXpGSUxFbEJRVWtzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WFFVRlhMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFTkJRVU1zUlVGQlJUdG5Ra0ZEY0VVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF5eFZRVUZWTEVkQlFVY3NTVUZCU1N4RFFVRkRPMkZCUXpsRU8ybENRVUZOTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVTdaMEpCUXpWQ0xFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExGVkJRVlVzUjBGQlJ5eEpRVUZKTEVOQlFVTTdZVUZEZWtNN1UwRkRTanRKUVVOTUxFTkJRVU03U1VGUlV5eE5RVUZOTEVOQlFVTXNWVUZCVlN4RFFVRkRMRWxCUVZjc1JVRkJSU3hEUVVGUk8xRkJRemRETEUxQlFVMHNUMEZCVHl4SFFVRkhMRU5CUVVNc1VVRkJNa0lzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXl4TFFVRlpMRVZCUVVVc1JVRkJSVHRaUVVNNVJDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJRenRaUVVOb1JDeExRVUZMTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhYUVVGWExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdXVUZEZEVNc1NVRkJTU3hQUVVGUExGRkJRVkVzUzBGQlN5eFZRVUZWTEVWQlFVVTdaMEpCUTJoRExGRkJRVkVzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0aFFVTnVRanRSUVVOTUxFTkJRVU1zUTBGQlF6dFJRVU5HTEVsQlFVa3NRMEZCUXl4SFFVRkRMRU5CUVVNc1JVRkJSVHRaUVVGRkxFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNkMEpCUVhkQ0xFTkJRVU1zU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZMTEVWQlFVTXNSVUZCUlN4RFFVRkJMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8xbEJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0VFFVRkZPMUZCUTJwSUxFMUJRVTBzU1VGQlNTeEhRVUZyUWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTm9SQ3hOUVVGTkxFdEJRVXNzUjBGQlZTeEpRVUZKTEVOQlFVTXNTMEZCU3l4SlFVRkpMRVZCUVVVc1EwRkJRenRSUVVOMFF5eE5RVUZOTEU5QlFVOHNSMEZCUnl4SlFVRkpMRU5CUVVNc1IwRkJSeXhKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVWN2UWl4UFFVRlBMR2RDUVVGblFpeERRVUZETzFsQlEzQkNMRXRCUVVzc1JVRkJSU3hMUVVGTE8xbEJRMW9zUjBGQlJ5eEZRVUZGTEU5QlFVODdXVUZGV2l4VlFVRlZMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETEVOQlFVTXNTMEZCU3p0WlFVTXZSU3hUUVVGVExFVkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1UwRkJVenRaUVVOMFF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR6dFpRVU5zUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJRenRUUVVNNVF5eERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRPME5CUlVvN1FVRTFSa1FzTkVKQk5FWkRPMEZCVVVRc1UwRkJaMElzWjBKQlFXZENMRU5CUVVNc1EwRkJaMEk3U1VGRE4wTXNUVUZCVFN4UFFVRlBMRWRCUVZNc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlFTeERRVUZETEVOQlFVY3NSMEZCUnl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVWNzUTBGQlF5eERRVUZETEZOQlFWTXNRMEZCUXp0SlFVTXZSU3hOUVVGTkxGZEJRVmNzUjBGQlN5eERRVUZETEVOQlFVTXNVMEZCVXl4RFFVRkJMRU5CUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eERRVUZETEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1UwRkJVeXhEUVVGRE8wbEJReTlGTEUxQlFVMHNVMEZCVXl4SFFVRlBMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVUVzUTBGQlF5eERRVUZITEVkQlFVY3NSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGSExFTkJRVU1zUTBGQlF5eFRRVUZUTEVOQlFVTTdTVUZETDBVc1QwRkJUeXhaUVVGRExFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1EwRkJReXhIUVVGSExFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXl4VlFVRlZMRU5CUVVFc1EwRkJReXhEUVVGQkxHRkJRV0VzUTBGQlFTeERRVUZETEVOQlFVTXNSVUZCUlN4RlFVRkZMRVZCUTNSRkxFVkJRVVVzUzBGQlN5eEZRVUZGTEVOQlFVTXNRMEZCUXl4TFFVRkxMRVZCUVVVc1QwRkJUeXhGUVVGRExFOUJRVThzUlVGQlJTeFhRVUZYTEVWQlFVTXNWMEZCVnl4RlFVRkZMRk5CUVZNc1JVRkJReXhUUVVGVExFVkJRVVVzUlVGRGFrWXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkRWaXhEUVVGRE8wRkJRMDRzUTBGQlF6dEJRVkpFTERSRFFWRkRJbjA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY2xhc3MgU2xpZGVyIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBub2RlLnN0YXRlLnJhbmdlID0gW107XG4gICAgICAgIG5vZGUuc3RhdGUudmFsdWUgPSAwLjU7XG4gICAgICAgIG5vZGUuc3RhdGUubW91c2UgPSAtMTtcbiAgICAgICAgbm9kZS5zdGF0ZS5zbGlkZXIgPSAwO1xuICAgICAgICBub2RlLnN0YXRlLm5vdGlmaWVkID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUub25jaGFuZ2UgPSAoKSA9PiB7IH07XG4gICAgfVxuICAgIHZpZXcobm9kZSkge1xuICAgICAgICBjb25zdCBpZCA9IG5vZGUuYXR0cnMuaWQ7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgICAgICBub2RlLnN0YXRlLnJhbmdlID0gbm9kZS5hdHRycy5yYW5nZSB8fCBbXTtcbiAgICAgICAgbm9kZS5zdGF0ZS5vbmNoYW5nZSA9IG5vZGUuYXR0cnMub25jaGFuZ2U7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oYC5ocy1zbGlkZXIgJHtjc3N9YCwge1xuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgb25tb3VzZWRvd246IChlKSA9PiBtb3VzZWRvd24oZSwgbm9kZSksXG4gICAgICAgICAgICBvbm1vdXNlbW92ZTogKGUpID0+IG1vdXNlbW92ZShlLCBub2RlKSxcbiAgICAgICAgICAgIG9ubW91c2V1cDogKGUpID0+IG1vdXNldXAoZSwgbm9kZSksXG4gICAgICAgICAgICBvbm1vdXNlb3V0OiAoZSkgPT4gbW91c2VvdXQoZSwgbm9kZSlcbiAgICAgICAgfSwgW3JlbmRlclNsaWRlcihub2RlKV0pO1xuICAgIH1cbn1cbmV4cG9ydHMuU2xpZGVyID0gU2xpZGVyO1xuZnVuY3Rpb24gcmVuZGVyU2xpZGVyKG5vZGUpIHtcbiAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCcuaHMtc2xpZGVyLXNsb3QnLCBbXG4gICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1tYXJrZXJzJywgbm9kZS5zdGF0ZS5yYW5nZS5tYXAocmVuZGVyTWFya2VyKSksXG4gICAgICAgIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1oYW5kbGUnLCB7IHN0eWxlOiBgbGVmdDokezEwMCAqIG5vZGUuc3RhdGUudmFsdWV9JWAgfSlcbiAgICBdKTtcbn1cbmZ1bmN0aW9uIHJlbmRlck1hcmtlcih2YWx1ZSwgaSwgbWFya2Vycykge1xuICAgIGNvbnN0IHNoYXJlID0gaSAvIChtYXJrZXJzLmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IGxlZnQgPSBtYXJrZXJzLmxlbmd0aCA8IDIgPyAwIDogMTAwICogc2hhcmU7XG4gICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnLmhzLXNsaWRlci1tYXJrZXInLCB7IHN0eWxlOiBgbGVmdDogJHtsZWZ0fSVgIH0sIHJlbmRlckxhYmVsKHZhbHVlKSk7XG59XG5mdW5jdGlvbiByZW5kZXJMYWJlbCh2YWx1ZSkge1xuICAgIHJldHVybiBoc2xheW91dF8xLm0oJy5ocy1zbGlkZXItbGFiZWwnLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBnZXRUYXJnZXRPZmZzZXQoZSkge1xuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBsZXQgbGVmdE9mZnNldCA9IDA7XG4gICAgd2hpbGUgKHRhcmdldC5jbGFzc05hbWUudHJpbSgpICE9PSBlLmN1cnJlbnRUYXJnZXQuY2xhc3NOYW1lLnRyaW0oKSkge1xuICAgICAgICBsZWZ0T2Zmc2V0ICs9IHRhcmdldC5vZmZzZXRMZWZ0O1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZnRPZmZzZXQgLSB0YXJnZXQubGFzdENoaWxkLm9mZnNldExlZnQ7XG59XG5mdW5jdGlvbiBnZXRWYWx1ZShlLCBub2RlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc2xvdFdpZHRoID0gZS5jdXJyZW50VGFyZ2V0Lmxhc3RDaGlsZC5jbGllbnRXaWR0aDtcbiAgICBub2RlLnN0YXRlLnZhbHVlID0gKGUuY2xpZW50WCAtIG5vZGUuc3RhdGUubW91c2UpIC8gc2xvdFdpZHRoICsgbm9kZS5zdGF0ZS5zbGlkZXI7XG4gICAgcmV0dXJuIG5vdGlmeShub2RlKTtcbn1cbmZ1bmN0aW9uIG1vdXNlZG93bihlLCBub2RlKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gZ2V0VGFyZ2V0T2Zmc2V0KGUpO1xuICAgIG5vZGUuc3RhdGUubW91c2UgPSBlLmNsaWVudFg7XG4gICAgaWYgKFsnaHMtc2xpZGVyJywgJ2hzLXNsaWRlci1zbG90J10uaW5kZXhPZihlLnRhcmdldC5jbGFzc05hbWUudHJpbSgpKSA+PSAwKSB7XG4gICAgICAgIGNvbnN0IHNsb3RXaWR0aCA9IGUuY3VycmVudFRhcmdldC5sYXN0Q2hpbGQuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGhhbmRsZVdpZHRoID0gZS5jdXJyZW50VGFyZ2V0Lmxhc3RDaGlsZC5sYXN0Q2hpbGQuY2xpZW50V2lkdGg7XG4gICAgICAgIG5vZGUuc3RhdGUubW91c2UgLT0gaGFuZGxlV2lkdGggLyAyO1xuICAgICAgICBub2RlLnN0YXRlLnZhbHVlID0gKGUub2Zmc2V0WCAtIGhhbmRsZVdpZHRoIC8gMiArIG9mZnNldCkgLyBzbG90V2lkdGg7XG4gICAgfVxuICAgIG5vZGUuc3RhdGUuc2xpZGVyID0gbm9kZS5zdGF0ZS52YWx1ZTtcbiAgICBnZXRWYWx1ZShlLCBub2RlKTtcbn1cbmZ1bmN0aW9uIG1vdXNlbW92ZShlLCBub2RlKSB7XG4gICAgaWYgKG5vZGUuc3RhdGUubW91c2UgPiAwKSB7XG4gICAgICAgIGdldFZhbHVlKGUsIG5vZGUpO1xuICAgICAgICBpZiAobm9kZS5zdGF0ZS52YWx1ZSA+IDEgfHwgbm9kZS5zdGF0ZS52YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIG1vdXNldXAoZSwgbm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBtb3VzZXVwKGUsIG5vZGUpIHtcbiAgICBpZiAobm9kZS5zdGF0ZS5tb3VzZSA+IDApIHtcbiAgICAgICAgbm9kZS5zdGF0ZS52YWx1ZSA9IGdldFZhbHVlKGUsIG5vZGUpO1xuICAgICAgICBub2RlLnN0YXRlLm1vdXNlID0gLTE7XG4gICAgfVxufVxuZnVuY3Rpb24gbW91c2VvdXQoZSwgbm9kZSkge1xuICAgIGlmIChub2RlLnN0YXRlLm1vdXNlID4gMCAmJiBlLnRhcmdldC5jbGFzc05hbWUudHJpbSgpID09PSAnaHMtc2xpZGVyJykge1xuICAgICAgICBtb3VzZXVwKGUsIG5vZGUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG5vdGlmeShub2RlKSB7XG4gICAgaWYgKChub2RlLnN0YXRlLnJhbmdlLmxlbmd0aCA+IDEpICYmICh0eXBlb2Ygbm9kZS5zdGF0ZS5yYW5nZVswXSA9PT0gJ3N0cmluZycpKSB7XG4gICAgICAgIGNvbnN0IHYgPSBNYXRoLmZsb29yKG5vZGUuc3RhdGUudmFsdWUgKiAobm9kZS5zdGF0ZS5yYW5nZS5sZW5ndGggLSAxKSArIDAuNSk7XG4gICAgICAgIGlmIChub2RlLnN0YXRlLm5vdGlmaWVkICE9PSBub2RlLnN0YXRlLnJhbmdlW3ZdKSB7XG4gICAgICAgICAgICBub2RlLnN0YXRlLm9uY2hhbmdlKG5vZGUuc3RhdGUucmFuZ2Vbdl0pO1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5ub3RpZmllZCA9IG5vZGUuc3RhdGUucmFuZ2Vbdl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHYgLyAobm9kZS5zdGF0ZS5yYW5nZS5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IG51bVJhbmdlID0gbm9kZS5zdGF0ZS5yYW5nZTtcbiAgICAgICAgY29uc3QgdiA9IE1hdGguZmxvb3IoKG51bVJhbmdlWzBdICogKDEgLSBub2RlLnN0YXRlLnZhbHVlKSArIG51bVJhbmdlWzFdICogbm9kZS5zdGF0ZS52YWx1ZSkgKiAxMDApIC8gMTAwO1xuICAgICAgICBub2RlLnN0YXRlLm9uY2hhbmdlKE1hdGgubWluKG5vZGUuc3RhdGUucmFuZ2VbMV0sIE1hdGgubWF4KG5vZGUuc3RhdGUucmFuZ2VbMF0sIHYpKSk7XG4gICAgICAgIHJldHVybiBub2RlLnN0YXRlLnZhbHVlO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVUyeHBaR1Z5TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwxTnNhV1JsY2k1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVEJEUVN4MVEwRkJiME03UVVGdlFuQkRMRTFCUVdFc1RVRkJUVHRKUVVObUxFMUJRVTBzUTBGQlF5eEpRVUZWTzFGQlEySXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFZEJRV2RDTEVWQlFVVXNRMEZCUXp0UlFVTnVReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4SFFVRkhMRU5CUVVNN1VVRkRka0lzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGRFSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETzFGQlEzUkNMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTjZRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNSMEZCUnl4SFFVRkhMRVZCUVVVc1IwRkJSU3hEUVVGRExFTkJRVU03U1VGRGRrTXNRMEZCUXp0SlFVTkhMRWxCUVVrc1EwRkJReXhKUVVGWE8xRkJRMW9zVFVGQlRTeEZRVUZGTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhGUVVGRkxFTkJRVU03VVVGRGVrSXNUVUZCVFN4SFFVRkhMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEhRVUZITEVsQlFVa3NSVUZCUlN4RFFVRkRPMUZCUTJwRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEpRVUZKTEVWQlFVVXNRMEZCUXp0UlFVTXhReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF6dFJRVU14UXl4UFFVRlBMRmxCUVVNc1EwRkJReXhqUVVGakxFZEJRVWNzUlVGQlJTeEZRVUZGTzFsQlF6RkNMRVZCUVVVc1JVRkJReXhGUVVGRk8xbEJRMHdzVjBGQlZ5eEZRVUZETEVOQlFVTXNRMEZCU3l4RlFVRkZMRVZCUVVVc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXp0WlFVTjZReXhYUVVGWExFVkJRVU1zUTBGQlF5eERRVUZMTEVWQlFVVXNSVUZCUlN4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRExFVkJRVVVzU1VGQlNTeERRVUZETzFsQlEzcERMRk5CUVZNc1JVRkJReXhEUVVGRExFTkJRVXNzUlVGQlNTeEZRVUZGTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU03V1VGRGRrTXNWVUZCVlN4RlFVRkRMRU5CUVVNc1EwRkJTeXhGUVVGSExFVkJRVVVzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJRenRUUVVNelF5eEZRVU5FTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dEpRVU14UWl4RFFVRkRPME5CUjBvN1FVRjZRa1FzZDBKQmVVSkRPMEZCUlVRc1UwRkJVeXhaUVVGWkxFTkJRVU1zU1VGQlZUdEpRVU0xUWl4UFFVRlBMRmxCUVVNc1EwRkJReXhwUWtGQmFVSXNSVUZCUlR0UlFVTjRRaXhaUVVGRExFTkJRVU1zYjBKQlFXOUNMRVZCUVVVc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRE8xRkJRek5FTEZsQlFVTXNRMEZCUXl4dFFrRkJiVUlzUlVGQlJTeEZRVUZGTEV0QlFVc3NSVUZCUlN4UlFVRlJMRWRCUVVjc1IwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4RlFVRkZMRU5CUVVNN1MwRkRja1VzUTBGQlF5eERRVUZETzBGQlExQXNRMEZCUXp0QlFVVkVMRk5CUVZNc1dVRkJXU3hEUVVGRExFdEJRVzlDTEVWQlFVVXNRMEZCVVN4RlFVRkZMRTlCUVcxQ08wbEJRM0pGTEUxQlFVMHNTMEZCU3l4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eE5RVUZOTEVkQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRja01zVFVGQlRTeEpRVUZKTEVkQlFVY3NUMEZCVHl4RFFVRkRMRTFCUVUwc1IwRkJReXhEUVVGRExFTkJRVUVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhIUVVGRExFdEJRVXNzUTBGQlF6dEpRVU0zUXl4UFFVRlBMRmxCUVVNc1EwRkJReXh0UWtGQmJVSXNSVUZCUlN4RlFVRkRMRXRCUVVzc1JVRkJSU3hUUVVGVExFbEJRVWtzUjBGQlJ5eEZRVUZETEVWQlFVVXNWMEZCVnl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRGFrWXNRMEZCUXp0QlFVVkVMRk5CUVZNc1YwRkJWeXhEUVVGRExFdEJRVzlDTzBsQlEzSkRMRTlCUVU4c1dVRkJReXhEUVVGRExHdENRVUZyUWl4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRE8wRkJRM2hETEVOQlFVTTdRVUZKUkN4VFFVRlRMR1ZCUVdVc1EwRkJReXhEUVVGTE8wbEJRekZDTEVsQlFVa3NUVUZCVFN4SFFVRlBMRU5CUVVNc1EwRkJReXhOUVVGTkxFTkJRVU03U1VGRE1VSXNTVUZCU1N4VlFVRlZMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRMjVDTEU5QlFVOHNUVUZCVFN4RFFVRkRMRk5CUVZNc1EwRkJReXhKUVVGSkxFVkJRVVVzUzBGQlN5eERRVUZETEVOQlFVTXNZVUZCWVN4RFFVRkRMRk5CUVZNc1EwRkJReXhKUVVGSkxFVkJRVVVzUlVGQlJUdFJRVU5xUlN4VlFVRlZMRWxCUVVrc1RVRkJUU3hEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU5vUXl4TlFVRk5MRWRCUVVjc1RVRkJUU3hEUVVGRExGVkJRVlVzUTBGQlF6dExRVU01UWp0SlFVTkVMRTlCUVU4c1ZVRkJWU3hIUVVGSExFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNWVUZCVlN4RFFVRkRPMEZCUTNCRUxFTkJRVU03UVVGRlJDeFRRVUZUTEZGQlFWRXNRMEZCUXl4RFFVRkxMRVZCUVVVc1NVRkJWVHRKUVVNdlFpeERRVUZETEVOQlFVTXNaVUZCWlN4RlFVRkZMRU5CUVVNN1NVRkRjRUlzUTBGQlF5eERRVUZETEdOQlFXTXNSVUZCUlN4RFFVRkRPMGxCUTI1Q0xFMUJRVTBzVTBGQlV5eEhRVUZITEVOQlFVTXNRMEZCUXl4aFFVRmhMRU5CUVVNc1UwRkJVeXhEUVVGRExGZEJRVmNzUTBGQlF6dEpRVU40UkN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4VFFVRlRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTTdTVUZEYkVZc1QwRkJUeXhOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdRVUZEZUVJc1EwRkJRenRCUVVWRUxGTkJRVk1zVTBGQlV5eERRVUZETEVOQlFVc3NSVUZCUlN4SlFVRlZPMGxCUTJoRExFMUJRVTBzVFVGQlRTeEhRVUZITEdWQlFXVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOc1F5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETzBsQlF6ZENMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVVzWjBKQlFXZENMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zU1VGQlJTeERRVUZETEVWQlFVVTdVVUZEZGtVc1RVRkJUU3hUUVVGVExFZEJRVWNzUTBGQlF5eERRVUZETEdGQlFXRXNRMEZCUXl4VFFVRlRMRU5CUVVNc1YwRkJWeXhEUVVGRE8xRkJRM2hFTEUxQlFVMHNWMEZCVnl4SFFVRkhMRU5CUVVNc1EwRkJReXhoUVVGaExFTkJRVU1zVTBGQlV5eERRVUZETEZOQlFWTXNRMEZCUXl4WFFVRlhMRU5CUVVNN1VVRkRjRVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWxCUVVrc1YwRkJWeXhIUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5zUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRWRCUVVjc1YwRkJWeXhIUVVGRExFTkJRVU1zUjBGQlJ5eE5RVUZOTEVOQlFVTXNSMEZCUnl4VFFVRlRMRU5CUVVNN1MwRkRka1U3U1VGRFJDeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXp0SlFVTnlReXhSUVVGUkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMEZCUTNSQ0xFTkJRVU03UVVGRlJDeFRRVUZUTEZOQlFWTXNRMEZCUXl4RFFVRkxMRVZCUVVVc1NVRkJWVHRKUVVOb1F5eEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGRExFTkJRVU1zUlVGQlJUdFJRVU53UWl4UlFVRlJMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzFGQlEyeENMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVkQlFVY3NRMEZCUXl4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eEhRVUZITEVOQlFVTXNSVUZCUlR0WlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVMEZCUlR0TFFVTXhSVHRCUVVOTUxFTkJRVU03UVVGRlJDeFRRVUZUTEU5QlFVOHNRMEZCUXl4RFFVRkxMRVZCUVVVc1NVRkJWVHRKUVVNNVFpeEpRVUZKTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGRExFTkJRVU1zUlVGQlJUdFJRVU53UWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUjBGQlJ5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM0pETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETzB0QlEzcENPMEZCUTB3c1EwRkJRenRCUVVWRUxGTkJRVk1zVVVGQlVTeERRVUZETEVOQlFVc3NSVUZCUlN4SlFVRlZPMGxCUXk5Q0xFbEJRVWtzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRWRCUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eE5RVUZOTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hMUVVGTExGZEJRVmNzUlVGQlJUdFJRVU5xUlN4UFFVRlBMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzB0QlEzQkNPMEZCUTB3c1EwRkJRenRCUVVWRUxGTkJRVk1zVFVGQlRTeERRVUZETEVsQlFWVTdTVUZEZEVJc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVa3NVVUZCVVN4RFFVRkRMRVZCUVVVN1VVRkRNMFVzVFVGQlRTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNSMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhIUVVGSExFTkJRVU1zUTBGQlF6dFJRVU16UlN4SlFVRkpMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeExRVUZMTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTzFsQlF6ZERMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEZWtNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVkQlFWY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVMEZEY2tRN1VVRkZSQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUjBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0TFFVTXhRenRUUVVGTk8xRkJRMGdzVFVGQlRTeFJRVUZSTEVkQlFYRkNMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUzBGQlN5eERRVUZETzFGQlEzQkVMRTFCUVUwc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVU1zUTBGQlF5eERRVUZETEVkQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJReXhIUVVGSExFTkJRVU03VVVGRGFFY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCVXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGVExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0UlFVTnlSeXhQUVVGUExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRPMHRCUXpOQ08wRkJRMHdzUTBGQlF5SjkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGhzbGF5b3V0XzEgPSByZXF1aXJlKFwiaHNsYXlvdXRcIik7XG5jb25zdCBTZWxlY3Rvcl8xID0gcmVxdWlyZShcIi4vU2VsZWN0b3JcIik7XG5jbGFzcyBUb2dnbGVCdXR0b24gZXh0ZW5kcyBTZWxlY3Rvcl8xLlNlbGVjdG9yIHtcbiAgICBvbmluaXQobm9kZSkge1xuICAgICAgICBzdXBlci5vbmluaXQobm9kZSk7XG4gICAgICAgIG5vZGUuc3RhdGUubW91c2VEb3duQ1NTID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUuZXZlbnRzLm1vdXNlRG93biA9ICgpID0+IG5vZGUuc3RhdGUubW91c2VEb3duQ1NTID0gJy5ocy1idXR0b24tcHJlc3NlZCc7XG4gICAgICAgIG5vZGUuc3RhdGUuZXZlbnRzLm1vdXNlVXAgPSAoKSA9PiBub2RlLnN0YXRlLm1vdXNlRG93bkNTUyA9ICcnO1xuICAgICAgICBub2RlLnN0YXRlLml0ZW1DbGlja2VkID0gKHRpdGxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpID0gbm9kZS5zdGF0ZS5pdGVtcy5tYXAoKGkpID0+IGkudGl0bGUpLmluZGV4T2YodGl0bGUpO1xuICAgICAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBub2RlLnN0YXRlLml0ZW1zWyhpICsgMSkgJSBub2RlLnN0YXRlLml0ZW1zLmxlbmd0aF0udGl0bGU7XG4gICAgICAgICAgICBub2RlLnN0YXRlLml0ZW1zW3RpdGxlXS5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBub2RlLnN0YXRlLml0ZW1zW25ld1RpdGxlXS5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBuZXdUaXRsZTtcbiAgICAgICAgfTtcbiAgICAgICAgU2VsZWN0b3JfMS5TZWxlY3Rvci5lbnN1cmVTZWxlY3RlZChub2RlKTtcbiAgICB9XG4gICAgb251cGRhdGUobm9kZSkge1xuICAgICAgICBzdXBlci5vbnVwZGF0ZShub2RlKTtcbiAgICAgICAgU2VsZWN0b3JfMS5TZWxlY3Rvci5lbnN1cmVTZWxlY3RlZChub2RlKTtcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGNvbnN0IGNzcyA9IG5vZGUuYXR0cnMuY3NzIHx8ICcnO1xuICAgICAgICBjb25zdCBzdHlsZSA9IG5vZGUuYXR0cnMuc3R5bGUgfHwgJyc7XG4gICAgICAgIGNvbnN0IGkgPSBub2RlLnN0YXRlLml0ZW1zLmZpbmRJbmRleCgoaSkgPT4gaS5pc1NlbGVjdGVkKTtcbiAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubShgLmhzLXRvZ2dsZS1idXR0b24gJHtjc3N9ICR7bm9kZS5zdGF0ZS5tb3VzZURvd25DU1N9YCwgeyBzdHlsZTogc3R5bGUgfSwgaHNsYXlvdXRfMS5tKCdzcGFuJywgU2VsZWN0b3JfMS5TZWxlY3Rvci5yZW5kZXJJdGVtKG5vZGUsIGkpKSk7XG4gICAgfVxufVxuZXhwb3J0cy5Ub2dnbGVCdXR0b24gPSBUb2dnbGVCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWRzluWjJ4bFFuVjBkRzl1TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2YzNKakwxUnZaMmRzWlVKMWRIUnZiaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFXbERRU3gxUTBGQmIwUTdRVUZEY0VRc2VVTkJRWE5FTzBGQmJVSjBSQ3hOUVVGaExGbEJRV0VzVTBGQlVTeHRRa0ZCVVR0SlFVTjBReXhOUVVGTkxFTkJRVU1zU1VGQlZUdFJRVU5pTEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03VVVGRGJrSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhaUVVGWkxFZEJRVWNzUlVGQlJTeERRVUZETzFGQlF6ZENMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEZOQlFWTXNSMEZCUnl4SFFVRkhMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZsQlFWa3NSMEZCUnl4dlFrRkJiMElzUTBGQlF6dFJRVU51Uml4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVkQlFVc3NSMEZCUnl4RlFVRkZMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUldwRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWMEZCVnl4SFFVRkZMRU5CUVVNc1MwRkJXU3hGUVVGUExFVkJRVVU3V1VGRE1VTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJaMElzUlVGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0WlFVTTFSU3hOUVVGTkxGRkJRVkVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNN1dVRkRla1VzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zVlVGQlZTeEhRVUZITEV0QlFVc3NRMEZCUXp0WlFVTXpReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhWUVVGVkxFZEJRVWNzU1VGQlNTeERRVUZETzFsQlF6ZERMRTlCUVU4c1VVRkJVU3hEUVVGRE8xRkJRM0JDTEVOQlFVTXNRMEZCUXp0UlFVTkdMRzFDUVVGUkxFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTJ4RExFTkJRVU03U1VGRFJDeFJRVUZSTEVOQlFVTXNTVUZCVnp0UlFVTm9RaXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMUZCUTNKQ0xHMUNRVUZSTEVOQlFVTXNZMEZCWXl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRMnhETEVOQlFVTTdTVUZEUkN4SlFVRkpMRU5CUVVNc1NVRkJWenRSUVVOYUxFMUJRVTBzUjBGQlJ5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhKUVVGSkxFVkJRVVVzUTBGQlF6dFJRVU5xUXl4TlFVRk5MRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NTVUZCU1N4RlFVRkZMRU5CUVVNN1VVRkRja01zVFVGQlRTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCWjBJc1JVRkJSU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEZWQlFWVXNRMEZCUXl4RFFVRkRPMUZCUlhwRkxFOUJRVThzV1VGQlF5eERRVUZETEhGQ1FVRnhRaXhIUVVGSExFbEJRVWtzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WlFVRlpMRVZCUVVVc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlF5eExRVUZMTEVWQlFVTXNSVUZCUlN4WlFVRkRMRU5CUVVNc1RVRkJUU3hGUVVOd1JpeHRRa0ZCVVN4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGSkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlF5OUNMRU5CUVVNc1EwRkJRenRKUVVOUUxFTkJRVU03UTBGRFNqdEJRVGRDUkN4dlEwRTJRa01pZlE9PSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaHNsYXlvdXRfMSA9IHJlcXVpcmUoXCJoc2xheW91dFwiKTtcbmV4cG9ydHMuQnV0dG9uU3ltYm9scyA9IHtcbiAgICBjcm9zczogeyBzeW06ICcmdGltZXM7JyB9LFxuICAgIG1pbnVzOiB7IHN5bTogJyZtaW51czsnIH0sXG4gICAgcGx1czogeyBzeW06ICcrJyB9LFxuICAgIGRMZWZ0OiB7IHN5bTogJyZsYXF1bzsnIH0sXG4gICAgZFJpZ2h0OiB7IHN5bTogJyZyYXF1bzsnIH0sXG4gICAgbGVmdDogeyBzeW06ICcmbHNhcXVvOycgfSxcbiAgICByaWdodDogeyBzeW06ICcmcnNhcXVvOycgfSxcbiAgICBsZWZ0VHJpOiB7IHN5bTogJyZsdHJpZjsnIH0sXG4gICAgcmlnaHRUcmk6IHsgc3ltOiAnJnJ0cmlmOycgfSxcbiAgICB1cFRyaTogeyBzeW06ICcmdXRyaWY7JyB9LFxuICAgIGRvd25Ucmk6IHsgc3ltOiAnJmR0cmlmOycgfSxcbiAgICB1cDogeyBzeW06ICcmYW5kOycgfSxcbiAgICBkb3duOiB7IHN5bTogJyZvcjsnIH0sXG4gICAgbEFycm93OiB7IHN5bTogJyZsYXJyOycgfSxcbiAgICByQXJyb3c6IHsgc3ltOiAnJnJhcnI7JyB9LFxuICAgIHVBcnJvdzogeyBzeW06ICcmdWFycjsnIH0sXG4gICAgZEFycm93OiB7IHN5bTogJyZkYXJyOycgfSxcbiAgICBlbXB0eTogeyBzeW06ICcmIzk2NzU7JyB9LFxuICAgIGVtcHR5U2xhc2g6IHsgc3ltOiAnJmVtcHR5OycgfSxcbiAgICBvU2xhc2g6IHsgc3ltOiAnJm9zbGFzaDsnIH0sXG4gICAgbzogeyBzeW06ICcmb21pY3JvbjsnIH0sXG4gICAgbGluZXMzOiB7IHN5bTogJyZlcXVpdjsnIH0sXG4gICAgc3VtOiB7IHN5bTogJyZTaWdtYTsnIH0sXG4gICAgZWxsaXBzaXM6IHsgc3ltOiAnJmhlbGxpcDsnIH0sXG4gICAgdmVydEVsbGlwczogeyBzeW06ICcmIzgyODU7JyB9LFxuICAgIGJ1bGxldDogeyBzeW06ICcmYnVsbDsnIH0sXG4gICAgZW50ZXI6IHsgc3ltOiAnJmNyYXJyOycgfSxcbiAgICBhZ2FpbjogeyBzeW06ICcmIzg2MzU7JyB9LFxuICAgIHN0YXJ0OiB7IHN5bTogJyYjODY4OTsnIH0sXG4gICAgZW5kOiB7IHN5bTogJyYjODY5MDsnIH1cbn07XG5jbGFzcyBUb29sYmFyQnV0dG9uIHtcbiAgICBzdGF0aWMgZ2V0U3ltYm9sKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuQnV0dG9uU3ltYm9sc1tuYW1lXSA/IGV4cG9ydHMuQnV0dG9uU3ltYm9sc1tuYW1lXS5zeW0gOiAnJztcbiAgICB9XG4gICAgdmlldyhub2RlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZS5hdHRycy5zeW1ib2xzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnLmhzLWNvcm5lci1idXR0b24nLCB7IG9uY2xpY2s6IG5vZGUuYXR0cnMub25jbGljayB9LCBoc2xheW91dF8xLm0udHJ1c3Qobm9kZS5hdHRycy5zeW1ib2xzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCcuaHMtY29ybmVyLWJ1dHRvbicsIHsgb25jbGljazogbm9kZS5hdHRycy5vbmNsaWNrIH0sIG5vZGUuYXR0cnMuc3ltYm9scy5tYXAoKHN5bSkgPT4gaHNsYXlvdXRfMS5tLnRydXN0KHN5bSkpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuVG9vbGJhckJ1dHRvbiA9IFRvb2xiYXJCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lWRzl2YkdKaGNrSjFkSFJ2Ymk1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OVViMjlzWW1GeVFuVjBkRzl1TG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN08wRkJNa1ZCTEhWRFFVRnZRenRCUVVWMlFpeFJRVUZCTEdGQlFXRXNSMEZCUnp0SlFVTjZRaXhMUVVGTExFVkJRVThzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkZPMGxCUXpsQ0xFdEJRVXNzUlVGQlR5eEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVNN1NVRkROMElzU1VGQlNTeEZRVUZSTEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJRenRKUVVOMlFpeExRVUZMTEVWQlFVOHNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRE8wbEJRemRDTEUxQlFVMHNSVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSU3hUUVVGVExFVkJRVU03U1VGRE4wSXNTVUZCU1N4RlFVRlJMRVZCUVVVc1IwRkJSeXhGUVVGRkxGVkJRVlVzUlVGQlF6dEpRVU01UWl4TFFVRkxMRVZCUVU4c1JVRkJSU3hIUVVGSExFVkJRVVVzVlVGQlZTeEZRVUZETzBsQlF6bENMRTlCUVU4c1JVRkJTeXhGUVVGRkxFZEJRVWNzUlVGQlJTeFRRVUZUTEVWQlFVTTdTVUZETjBJc1VVRkJVU3hGUVVGSkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUXp0SlFVTTNRaXhMUVVGTExFVkJRVThzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkRPMGxCUXpkQ0xFOUJRVThzUlVGQlN5eEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVNN1NVRkROMElzUlVGQlJTeEZRVUZWTEVWQlFVVXNSMEZCUnl4RlFVRkZMRTlCUVU4c1JVRkJRenRKUVVNelFpeEpRVUZKTEVWQlFWRXNSVUZCUlN4SFFVRkhMRVZCUVVVc1RVRkJUU3hGUVVGRE8wbEJRekZDTEUxQlFVMHNSVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSU3hSUVVGUkxFVkJRVU03U1VGRE5VSXNUVUZCVFN4RlFVRk5MRVZCUVVVc1IwRkJSeXhGUVVGRkxGRkJRVkVzUlVGQlF6dEpRVU0xUWl4TlFVRk5MRVZCUVUwc1JVRkJSU3hIUVVGSExFVkJRVVVzVVVGQlVTeEZRVUZETzBsQlF6VkNMRTFCUVUwc1JVRkJUU3hGUVVGRkxFZEJRVWNzUlVGQlJTeFJRVUZSTEVWQlFVTTdTVUZETlVJc1MwRkJTeXhGUVVGUExFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUXp0SlFVTTNRaXhWUVVGVkxFVkJRVVVzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkRPMGxCUXpkQ0xFMUJRVTBzUlVGQlRTeEZRVUZGTEVkQlFVY3NSVUZCUlN4VlFVRlZMRVZCUVVNN1NVRkRPVUlzUTBGQlF5eEZRVUZYTEVWQlFVVXNSMEZCUnl4RlFVRkZMRmRCUVZjc1JVRkJRenRKUVVNdlFpeE5RVUZOTEVWQlFVMHNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRE8wbEJRemRDTEVkQlFVY3NSVUZCVXl4RlFVRkZMRWRCUVVjc1JVRkJSU3hUUVVGVExFVkJRVU03U1VGRE4wSXNVVUZCVVN4RlFVRkpMRVZCUVVVc1IwRkJSeXhGUVVGRkxGVkJRVlVzUlVGQlF6dEpRVU01UWl4VlFVRlZMRVZCUVVVc1JVRkJSU3hIUVVGSExFVkJRVVVzVTBGQlV5eEZRVUZETzBsQlF6ZENMRTFCUVUwc1JVRkJUU3hGUVVGRkxFZEJRVWNzUlVGQlJTeFJRVUZSTEVWQlFVTTdTVUZETlVJc1MwRkJTeXhGUVVGUExFVkJRVVVzUjBGQlJ5eEZRVUZGTEZOQlFWTXNSVUZCUXp0SlFVTTNRaXhMUVVGTExFVkJRVThzUlVGQlJTeEhRVUZITEVWQlFVVXNVMEZCVXl4RlFVRkRPMGxCUXpkQ0xFdEJRVXNzUlVGQlR5eEZRVUZGTEVkQlFVY3NSVUZCUlN4VFFVRlRMRVZCUVVNN1NVRkROMElzUjBGQlJ5eEZRVUZUTEVWQlFVVXNSMEZCUnl4RlFVRkZMRk5CUVZNc1JVRkJRenREUVVOb1F5eERRVUZETzBGQlJVWXNUVUZCWVN4aFFVRmhPMGxCUlhSQ0xFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNTVUZCVnp0UlFVTjRRaXhQUVVGUExIRkNRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVFc1EwRkJReXhEUVVGRExIRkNRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTTdTVUZETjBRc1EwRkJRenRKUVVORUxFbEJRVWtzUTBGQlF5eEpRVUZWTzFGQlExZ3NTVUZCU1N4UFFVRlBMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eExRVUZMTEZGQlFWRXNSVUZCUlR0WlFVTjRReXhQUVVGUExGbEJRVU1zUTBGQlF5eHRRa0ZCYlVJc1JVRkRlRUlzUlVGQlJTeFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFVkJRVVVzUlVGREwwSXNXVUZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVTTVRaXhEUVVGRE8xTkJRMHc3WVVGQlRUdFpRVU5JTEU5QlFVOHNXVUZCUXl4RFFVRkRMRzFDUVVGdFFpeEZRVU53UWl4RlFVRkZMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNSVUZCUlN4RlFVTXZRaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGVkxFVkJRVVVzUlVGQlJTeERRVUZCTEZsQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGRE1VUXNRMEZCUXp0VFFVTk1PMGxCUTB3c1EwRkJRenREUVVOS08wRkJiRUpFTEhORFFXdENReUo5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBoc2xheW91dF8xID0gcmVxdWlyZShcImhzbGF5b3V0XCIpO1xuY29uc3QgaHN1dGlsXzEgPSByZXF1aXJlKFwiaHN1dGlsXCIpO1xuY29uc3QgbG9nID0gbmV3IGhzdXRpbF8xLkxvZygnVHlwZUFoZWFkJyk7XG5mdW5jdGlvbiBlbXBoYXNpemUoaXRlbSwgbWF0Y2gpIHtcbiAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAobWF0Y2gsICdnaScpO1xuICAgIGNvbnN0IGRlY29yYXRpb25zID0gaXRlbVxuICAgICAgICAucmVwbGFjZShyZSwgKG0pID0+IGA8Yj4ke219PC9iPmApXG4gICAgICAgIC5zcGxpdCgnPCcpXG4gICAgICAgIC5tYXAoKHMpID0+IHtcbiAgICAgICAgaWYgKHMuc3RhcnRzV2l0aCgnL2I+JykpIHtcbiAgICAgICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oJ3NwYW4nLCB7IG5hbWU6IGl0ZW0gfSwgcy5zbGljZSgzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocy5zdGFydHNXaXRoKCdiPicpKSB7XG4gICAgICAgICAgICByZXR1cm4gaHNsYXlvdXRfMS5tKCdiJywgeyBuYW1lOiBpdGVtIH0sIHMuc2xpY2UoMikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGhzbGF5b3V0XzEubSgnc3BhbicsIHsgbmFtZTogaXRlbSB9LCBzKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBoc2xheW91dF8xLm0oJ3NwYW4nLCBkZWNvcmF0aW9ucyk7XG59XG5jbGFzcyBHZXRMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihtYXApIHtcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xuICAgIH1cbiAgICBzZWFyY2gobGlzdCkge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy51cmwgIT09IGxpc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVybCA9IGxpc3Q7XG4gICAgICAgICAgICAgICAgaHNsYXlvdXRfMS5tLnJlcXVlc3QoeyBtZXRob2Q6IFwiR0VUXCIsIHVybDogbGlzdCB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gdGhpcy5jYXB0dXJlTGlzdChkYXRhLCB0aGlzLm1hcCkpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4gbG9nLndhcm4oYHJlcXVlc3RpbmcgJHtsaXN0fTogJHtlLnRvU3RyaW5nKCl9YCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYXB0dXJlTGlzdChsaXN0LCB0aGlzLm1hcCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FwdHVyZUxpc3QobGlzdCwgbWFwKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IG1hcCA/IG1hcChsaXN0KSA6IGxpc3Q7XG4gICAgfVxufVxuY2xhc3MgVHlwZUFoZWFkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nbCA9IG5ldyBHZXRMaXN0KCk7XG4gICAgfVxuICAgIG9uaW5pdChub2RlKSB7XG4gICAgICAgIG5vZGUuc3RhdGUuaW5wdXROb2RlID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUuaGlkZVBvcGRvd24gPSB0cnVlO1xuICAgICAgICBub2RlLnN0YXRlLnZhbHVlID0gJyc7XG4gICAgICAgIG5vZGUuc3RhdGUudHlwZUFoZWFkTGlzdCA9IFtdO1xuICAgICAgICBub2RlLnN0YXRlLm9uc3VibWl0ID0gbm9kZS5hdHRycy5vbnN1Ym1pdDtcbiAgICAgICAgbm9kZS5zdGF0ZS5hdXRvY29tcGxldGUgPSBub2RlLmF0dHJzLmF1dG9jb21wbGV0ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG5vZGUuYXR0cnMuYXV0b2NvbXBsZXRlO1xuICAgIH1cbiAgICB2aWV3KG5vZGUpIHtcbiAgICAgICAgdGhpcy5nbC5zZWFyY2gobm9kZS5hdHRycy5saXN0KTtcbiAgICAgICAgY29uc3Qgbm9zdWJtaXQgPSAoKSA9PiBjb25zb2xlLmxvZygnbm8gc3VibWl0IGZ1bmN0aW9uIGRlZmluZWQnKTtcbiAgICAgICAgY29uc3Qgc3VibWl0ID0gKHYpID0+IHtcbiAgICAgICAgICAgIG5vZGUuc3RhdGUuaW5wdXROb2RlLnNldFNlbGVjdGlvblJhbmdlKDAsIG5vZGUuc3RhdGUuaW5wdXROb2RlLnZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICBub2RlLnN0YXRlLmhpZGVQb3Bkb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBub2RlLnN0YXRlLm9uc3VibWl0ID8gbm9kZS5zdGF0ZS5vbnN1Ym1pdCh2LCBub2RlLnN0YXRlLnR5cGVBaGVhZExpc3QpIDogbm9zdWJtaXQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdGF0ZS5pbnB1dE5vZGUudmFsdWUgPSBlLnRhcmdldC5hdHRyaWJ1dGVzLm5hbWUudmFsdWU7XG4gICAgICAgICAgICAgICAgc3VibWl0KGUudGFyZ2V0LmF0dHJpYnV0ZXMubmFtZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9uaW5wdXQgPSAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbiA9IG5vZGUuc3RhdGUuaW5wdXROb2RlID0gZS50YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCB0eXBlZCA9IG5vZGUuc3RhdGUudmFsdWUgPSBuLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHR5cGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0YXRlLnR5cGVBaGVhZExpc3QgPSB0aGlzLmdsLmxpc3QuZmlsdGVyKChsKSA9PiBsLm1hdGNoKG5ldyBSZWdFeHAodHlwZWQsICdnaScpKSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuc3RhdGUuYXV0b2NvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZSh0eXBlZCwgbm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBrZXlQcmVzc2VkID0gKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG4gPSBub2RlLnN0YXRlLmlucHV0Tm9kZSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgbm9kZS5zdGF0ZS5oaWRlUG9wZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgIHN1Ym1pdChuLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGUuY29kZSA9PT0gJ0JhY2tzcGFjZScgJiYgbi50ZXh0TGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gbi50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBuLnZhbHVlID0gaW5wdXQuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IG5vZGUuc3RhdGUudmFsdWUgPyAnLmhzLXR5cGVhaGVhZC12YWx1ZScgOiAnLmhzLXR5cGVhaGVhZC1wbGFjZWhvbGRlcic7XG4gICAgICAgIHJldHVybiBoc2xheW91dF8xLm0oJy5ocy1mb3JtJywgW1xuICAgICAgICAgICAgaHNsYXlvdXRfMS5tKGBpbnB1dC5ocy10eXBlYWhlYWQtaW5wdXQke3NlbGVjdG9yfWAsIHtcbiAgICAgICAgICAgICAgICBjb250ZW50ZWRpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IG5vZGUuYXR0cnMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAgICAgYXV0b2ZvY3VzOiBub2RlLmF0dHJzLmF1dG9mb2N1cyB8fCB0cnVlLFxuICAgICAgICAgICAgICAgIG9ua2V5ZG93bjoga2V5UHJlc3NlZCxcbiAgICAgICAgICAgICAgICBvbmlucHV0OiBvbmlucHV0XG4gICAgICAgICAgICB9LCBoc2xheW91dF8xLm0udHJ1c3Qobm9kZS5zdGF0ZS52YWx1ZSA/IG5vZGUuc3RhdGUudmFsdWUgOiBub2RlLmF0dHJzLnBsYWNlaG9sZGVyKSksXG4gICAgICAgICAgICBub2RlLnN0YXRlLmhpZGVQb3Bkb3duID8gdW5kZWZpbmVkIDpcbiAgICAgICAgICAgICAgICBoc2xheW91dF8xLm0oJy5ocy10eXBlYWhlYWQtbGlzdCcsIG5vZGUuc3RhdGUudHlwZUFoZWFkTGlzdC5tYXAoKGwpID0+IGhzbGF5b3V0XzEubSgnJywgeyBvbmNsaWNrOiBzZWxlY3QgfSwgZW1waGFzaXplKGwsIG5vZGUuc3RhdGUudmFsdWUpKSkpXG4gICAgICAgIF0pO1xuICAgIH1cbn1cbmV4cG9ydHMuVHlwZUFoZWFkID0gVHlwZUFoZWFkO1xuZnVuY3Rpb24gYXV0b0NvbXBsZXRlKHR5cGVkLCBub2RlKSB7XG4gICAgY29uc3QgbiA9IG5vZGUuc3RhdGUuaW5wdXROb2RlO1xuICAgIGNvbnN0IHN0YXJ0T2ZMaW5lSW5wdXQgPSBuZXcgUmVnRXhwKGBeJHt0eXBlZH1gLCAnZ2knKTtcbiAgICBuLnZhbHVlID0gbm9kZS5zdGF0ZS50eXBlQWhlYWRMaXN0LmZpbHRlcigobCkgPT4gbC5tYXRjaChzdGFydE9mTGluZUlucHV0KSlbMF0gfHwgdHlwZWQ7XG4gICAgbi5zZXRTZWxlY3Rpb25SYW5nZSh0eXBlZC5sZW5ndGgsIG4udmFsdWUubGVuZ3RoKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVZIbHdaVUZvWldGa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dmMzSmpMMVI1Y0dWQmFHVmhaQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFUWkRRU3gxUTBGQmIwTTdRVUZEY0VNc2JVTkJRVFpDTzBGQlJUTkNMRTFCUVUwc1IwRkJSeXhIUVVGSExFbEJRVWtzV1VGQlJ5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMEZCUjI1RExGTkJRVk1zVTBGQlV5eERRVUZETEVsQlFWY3NSVUZCUlN4TFFVRlpPMGxCUTNoRExFMUJRVTBzUlVGQlJTeEhRVUZITEVsQlFVa3NUVUZCVFN4RFFVRkRMRXRCUVVzc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU51UXl4TlFVRk5MRmRCUVZjc1IwRkJSeXhKUVVGSk8xTkJRMjVDTEU5QlFVOHNRMEZCUXl4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGUkxFVkJRVVVzUlVGQlJTeERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNN1UwRkRlRU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXp0VFFVTldMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVkVzUlVGQlJTeEZRVUZGTzFGQlEyUXNTVUZCU1N4RFFVRkRMRU5CUVVNc1ZVRkJWU3hEUVVGRExFdEJRVXNzUTBGQlF5eEZRVUZGTzFsQlEzSkNMRTlCUVU4c1dVRkJReXhEUVVGRExFMUJRVTBzUlVGQlJTeEZRVUZETEVsQlFVa3NSVUZCUXl4SlFVRkpMRVZCUVVNc1JVRkJSU3hEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1UwRkROME03WVVGQlRTeEpRVUZKTEVOQlFVTXNRMEZCUXl4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVU3V1VGRE0wSXNUMEZCVHl4WlFVRkRMRU5CUVVNc1IwRkJSeXhGUVVGRkxFVkJRVU1zU1VGQlNTeEZRVUZETEVsQlFVa3NSVUZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTXhRenRoUVVGTk8xbEJRMGdzVDBGQlR5eFpRVUZETEVOQlFVTXNUVUZCVFN4RlFVRkZMRVZCUVVNc1NVRkJTU3hGUVVGRExFbEJRVWtzUlVGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRPMU5CUTNCRE8wbEJRMHdzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEVUN4UFFVRlBMRmxCUVVNc1EwRkJReXhOUVVGTkxFVkJRVVVzVjBGQlZ5eERRVUZETEVOQlFVTTdRVUZEYkVNc1EwRkJRenRCUVVWRUxFMUJRVTBzVDBGQlR6dEpRVWxVTEZsQlFYTkNMRWRCUVRKQ08xRkJRVE5DTEZGQlFVY3NSMEZCU0N4SFFVRkhMRU5CUVhkQ08xRkJSakZETEZOQlFVa3NSMEZCV1N4RlFVRkZMRU5CUVVNN1NVRkhNVUlzUTBGQlF6dEpRVVZOTEUxQlFVMHNRMEZCUXl4SlFVRnZRanRSUVVNNVFpeEpRVUZKTEU5QlFVOHNTVUZCU1N4TFFVRkxMRkZCUVZFc1JVRkJSVHRaUVVNeFFpeEpRVUZKTEVsQlFVa3NRMEZCUXl4SFFVRkhMRXRCUVVjc1NVRkJTU3hGUVVGRk8yZENRVU5xUWl4SlFVRkpMRU5CUVVNc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF6dG5Ra0ZEYUVJc1dVRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eEZRVUZGTEUxQlFVMHNSVUZCUlN4TFFVRkxMRVZCUVVVc1IwRkJSeXhGUVVGRkxFbEJRVWtzUlVGQlJTeERRVUZETzNGQ1FVTjBReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZWTEVWQlFVVXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenR4UWtGRGRFUXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJTeXhGUVVGRkxFVkJRVVVzUTBGQlFTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMR05CUVdNc1NVRkJTU3hMUVVGTExFTkJRVU1zUTBGQlF5eFJRVUZSTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRoUVVOeVJUdFRRVU5LTzJGQlFVMDdXVUZEU0N4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUlVGQlJTeEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1UwRkRjRU03U1VGRFRDeERRVUZETzBsQlJVOHNWMEZCVnl4RFFVRkRMRWxCUVZVc1JVRkJSU3hIUVVGMVFqdFJRVU51UkN4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFZEJRVWNzUTBGQlFTeERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTTdTVUZEZEVNc1EwRkJRenREUVVWS08wRkJSVVFzVFVGQllTeFRRVUZUTzBsQlFYUkNPMUZCUTBrc1QwRkJSU3hIUVVGSExFbEJRVWtzVDBGQlR5eEZRVUZGTEVOQlFVTTdTVUYxUlhaQ0xFTkJRVU03U1VGMFJVY3NUVUZCVFN4RFFVRkRMRWxCUVZVN1VVRkRZaXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZOQlFWTXNSMEZCUnl4RlFVRkZMRU5CUVVNN1VVRkRNVUlzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WFFVRlhMRWRCUVVjc1NVRkJTU3hEUVVGRE8xRkJRemxDTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGSExFVkJRVVVzUTBGQlF6dFJRVU4wUWl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExHRkJRV0VzUjBGQlJ5eEZRVUZGTEVOQlFVTTdVVUZET1VJc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU03VVVGRE1VTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhaUVVGWkxFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4WlFVRlpMRXRCUVVjc1UwRkJVeXhEUVVGQkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zV1VGQldTeERRVUZETzBsQlEyeEhMRU5CUVVNN1NVRkRSQ3hKUVVGSkxFTkJRVU1zU1VGQlZUdFJRVU5ZTEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRhRU1zVFVGQlRTeFJRVUZSTEVkQlFVY3NSMEZCUnl4RlFVRkZMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5dzBRa0ZCTkVJc1EwRkJReXhEUVVGRE8xRkJSV3BGTEUxQlFVMHNUVUZCVFN4SFFVRkhMRU5CUVVNc1EwRkJVU3hGUVVGRkxFVkJRVVU3V1VGRGVFSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhUUVVGVExFTkJRVU1zYVVKQlFXbENMRU5CUVVNc1EwRkJReXhGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVMEZCVXl4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dFpRVU0zUlN4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRVmNzUjBGQlJ5eEpRVUZKTEVOQlFVTTdXVUZET1VJc1QwRkJUeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNRMEZCUVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zWVVGQllTeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRE8xRkJRemxHTEVOQlFVTXNRMEZCUXp0UlFVTkdMRTFCUVUwc1RVRkJUU3hIUVVGSExFTkJRVU1zUTBGQlN5eEZRVUZGTEVWQlFVVTdXVUZCUnl4SlFVRkpMRU5CUVVNc1JVRkJSVHRuUWtGREwwSXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhUUVVGVExFTkJRVU1zUzBGQlN5eEhRVUZITEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTTdaMEpCUXpWRUxFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdZVUZETVVNN1VVRkJRU3hEUVVGRExFTkJRVU03VVVGTlNDeE5RVUZOTEU5QlFVOHNSMEZCUnl4RFFVRkRMRU5CUVVzc1JVRkJSU3hGUVVGRk8xbEJRM1JDTEUxQlFVMHNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eEhRVUZITEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNN1dVRkRNVU1zVFVGQlRTeExRVUZMTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFZEJRVWNzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXp0WlFVTjZReXhKUVVGSkxFdEJRVXNzUTBGQlF5eE5RVUZOTEVkQlFVTXNRMEZCUXl4RlFVRkZPMmRDUVVOb1FpeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMR0ZCUVdFc1IwRkJSeXhKUVVGSkxFTkJRVU1zUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUXpGRExFTkJRVU1zUTBGQlVTeEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzVFVGQlRTeERRVUZETEV0QlFVc3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVOcVJDeERRVUZETzJkQ1FVTkdMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEVWQlFVVTdiMEpCUVVVc1dVRkJXU3hEUVVGRExFdEJRVXNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0cFFrRkJSVHRoUVVNNVJEdFJRVU5NTEVOQlFVTXNRMEZCUXp0UlFVMUdMRTFCUVUwc1ZVRkJWU3hIUVVGSExFTkJRVU1zUTBGQlN5eEZRVUZGTEVWQlFVVTdXVUZEZWtJc1RVRkJUU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4VFFVRlRMRWRCUVVjc1EwRkJReXhEUVVGRExFMUJRVTBzUTBGQlF6dFpRVU14UXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGZEJRVmNzUjBGQlJ5eExRVUZMTEVOQlFVTTdXVUZETDBJc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlNTeExRVUZMTEU5QlFVOHNSVUZCUlR0blFrRkRjRUlzVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRoUVVOdVFqdHBRa0ZCVFN4SlFVRkpMRU5CUVVNc1EwRkJReXhKUVVGSkxFdEJRVXNzVjBGQlZ5eEpRVUZKTEVOQlFVTXNRMEZCUXl4VlFVRlZMRWRCUVVNc1EwRkJReXhGUVVGRk8yZENRVU5xUkN4TlFVRk5MRXRCUVVzc1IwRkJWU3hEUVVGRExFTkJRVU1zVjBGQlZ5eERRVUZETzJkQ1FVVnVReXhKUVVGSkxFdEJRVXNzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RlFVRkZPMjlDUVVOc1FpeERRVUZETEVOQlFVTXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdhVUpCUXpWQ08yRkJRMG83VVVGRFRDeERRVUZETEVOQlFVTTdVVUZGUml4TlFVRk5MRkZCUVZFc1IwRkJSeXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUVN4RFFVRkRMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTXNRMEZCUXl4RFFVRkRMREpDUVVFeVFpeERRVUZETzFGQlEzWkdMRTlCUVU4c1dVRkJReXhEUVVGRExGVkJRVlVzUlVGQlJUdFpRVU5xUWl4WlFVRkRMRU5CUVVNc01rSkJRVEpDTEZGQlFWRXNSVUZCUlN4RlFVRkZPMmRDUVVOeVF5eGxRVUZsTEVWQlFVTXNTVUZCU1R0blFrRkRjRUlzVjBGQlZ5eEZRVUZMTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1YwRkJWenRuUWtGRGRFTXNVMEZCVXl4RlFVRlBMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVTBGQlV5eEpRVUZKTEVsQlFVazdaMEpCUXpWRExGTkJRVk1zUlVGQlR5eFZRVUZWTzJkQ1FVTXhRaXhQUVVGUExFVkJRVk1zVDBGQlR6dGhRVU14UWl4RlFVRkZMRmxCUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRU5CUVVFc1EwRkJReXhEUVVGQkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZkQlFWY3NRMEZCUXl4RFFVTnlSVHRaUVVORUxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNWMEZCVnl4RFFVRkJMRU5CUVVNc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dG5Ra0ZETDBJc1dVRkJReXhEUVVGRExHOUNRVUZ2UWl4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zWVVGQllTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVZFc1JVRkJSU3hGUVVGRkxFTkJRemxFTEZsQlFVTXNRMEZCUXl4RlFVRkZMRVZCUVVVc1JVRkJSU3hQUVVGUExFVkJRVVVzVFVGQlRTeEZRVUZGTEVWQlFVVXNVMEZCVXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVOMlJTeERRVUZETEVOQlFVTTdTVUZEVUN4RFFVRkRPME5CUTBvN1FVRjRSVVFzT0VKQmQwVkRPMEZCVDBRc1UwRkJVeXhaUVVGWkxFTkJRVU1zUzBGQldTeEZRVUZGTEVsQlFWVTdTVUZETVVNc1RVRkJUU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4VFFVRlRMRU5CUVVNN1NVRkZMMElzVFVGQlRTeG5Ra0ZCWjBJc1IwRkJSeXhKUVVGSkxFMUJRVTBzUTBGQlF5eEpRVUZKTEV0QlFVc3NSVUZCUlN4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRM1pFTEVOQlFVTXNRMEZCUXl4TFFVRkxMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eGhRVUZoTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJVU3hGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMR2RDUVVGblFpeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hMUVVGTExFTkJRVU03U1VGRkwwWXNRMEZCUXl4RFFVRkRMR2xDUVVGcFFpeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0QlFVTjBSQ3hEUVVGREluMD0iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNZW51XzEgPSByZXF1aXJlKFwiLi9NZW51XCIpO1xuZXhwb3J0cy5NZW51ID0gTWVudV8xLk1lbnU7XG52YXIgTWVudV8yID0gcmVxdWlyZShcIi4vTWVudVwiKTtcbmV4cG9ydHMuTWVudVBhbmVsID0gTWVudV8yLk1lbnVQYW5lbDtcbnZhciBCdXR0b25fMSA9IHJlcXVpcmUoXCIuL0J1dHRvblwiKTtcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uXzEuQnV0dG9uO1xudmFyIExhYmVsXzEgPSByZXF1aXJlKFwiLi9MYWJlbFwiKTtcbmV4cG9ydHMuTGFiZWwgPSBMYWJlbF8xLkxhYmVsO1xudmFyIFNsaWRlcl8xID0gcmVxdWlyZShcIi4vU2xpZGVyXCIpO1xuZXhwb3J0cy5TbGlkZXIgPSBTbGlkZXJfMS5TbGlkZXI7XG52YXIgUmFkaW9CdXR0b25fMSA9IHJlcXVpcmUoXCIuL1JhZGlvQnV0dG9uXCIpO1xuZXhwb3J0cy5SYWRpb0J1dHRvbiA9IFJhZGlvQnV0dG9uXzEuUmFkaW9CdXR0b247XG52YXIgT3B0aW9uc0J1dHRvbl8xID0gcmVxdWlyZShcIi4vT3B0aW9uc0J1dHRvblwiKTtcbmV4cG9ydHMuT3B0aW9uc0J1dHRvbiA9IE9wdGlvbnNCdXR0b25fMS5PcHRpb25zQnV0dG9uO1xudmFyIFRvZ2dsZUJ1dHRvbl8xID0gcmVxdWlyZShcIi4vVG9nZ2xlQnV0dG9uXCIpO1xuZXhwb3J0cy5Ub2dnbGVCdXR0b24gPSBUb2dnbGVCdXR0b25fMS5Ub2dnbGVCdXR0b247XG52YXIgVG9vbGJhckJ1dHRvbl8xID0gcmVxdWlyZShcIi4vVG9vbGJhckJ1dHRvblwiKTtcbmV4cG9ydHMuVG9vbGJhckJ1dHRvbiA9IFRvb2xiYXJCdXR0b25fMS5Ub29sYmFyQnV0dG9uO1xudmFyIFRvb2xiYXJCdXR0b25fMiA9IHJlcXVpcmUoXCIuL1Rvb2xiYXJCdXR0b25cIik7XG5leHBvcnRzLkJ1dHRvblN5bWJvbHMgPSBUb29sYmFyQnV0dG9uXzIuQnV0dG9uU3ltYm9scztcbnZhciBDb2xsYXBzaWJsZV8xID0gcmVxdWlyZShcIi4vQ29sbGFwc2libGVcIik7XG5leHBvcnRzLkNvbGxhcHNpYmxlID0gQ29sbGFwc2libGVfMS5Db2xsYXBzaWJsZTtcbnZhciBNb2RhbF8xID0gcmVxdWlyZShcIi4vTW9kYWxcIik7XG5leHBvcnRzLk1vZGFsID0gTW9kYWxfMS5Nb2RhbDtcbnZhciBUeXBlQWhlYWRfMSA9IHJlcXVpcmUoXCIuL1R5cGVBaGVhZFwiKTtcbmV4cG9ydHMuVHlwZUFoZWFkID0gVHlwZUFoZWFkXzEuVHlwZUFoZWFkO1xudmFyIEVkaXRMYWJlbF8xID0gcmVxdWlyZShcIi4vRWRpdExhYmVsXCIpO1xuZXhwb3J0cy5FZGl0TGFiZWwgPSBFZGl0TGFiZWxfMS5FZGl0TGFiZWw7XG52YXIgRWRpdExhYmVsXzIgPSByZXF1aXJlKFwiLi9FZGl0TGFiZWxcIik7XG5leHBvcnRzLkVkaXREYXRlID0gRWRpdExhYmVsXzIuRWRpdERhdGU7XG52YXIgRWRpdExpc3RfMSA9IHJlcXVpcmUoXCIuL0VkaXRMaXN0XCIpO1xuZXhwb3J0cy5FZGl0TGlzdCA9IEVkaXRMaXN0XzEuRWRpdExpc3Q7XG52YXIgRWRpdFNlbGVjdF8xID0gcmVxdWlyZShcIi4vRWRpdFNlbGVjdFwiKTtcbmV4cG9ydHMuRWRpdFNlbGVjdCA9IEVkaXRTZWxlY3RfMS5FZGl0U2VsZWN0O1xudmFyIEVkaXRDaGVja2JveF8xID0gcmVxdWlyZShcIi4vRWRpdENoZWNrYm94XCIpO1xuZXhwb3J0cy5FZGl0Q2hlY2tib3ggPSBFZGl0Q2hlY2tib3hfMS5FZGl0Q2hlY2tib3g7XG52YXIgRWRpdFRleHRhcmVhXzEgPSByZXF1aXJlKFwiLi9FZGl0VGV4dGFyZWFcIik7XG5leHBvcnRzLkVkaXRUZXh0YXJlYSA9IEVkaXRUZXh0YXJlYV8xLkVkaXRUZXh0YXJlYTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTl6Y21NdmFXNWtaWGd1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRlBRU3dyUWtGQmMwTTdRVUZCTjBJc2MwSkJRVUVzU1VGQlNTeERRVUZCTzBGQlEySXNLMEpCUVhORE8wRkJRVGRDTERKQ1FVRkJMRk5CUVZNc1EwRkJRVHRCUVVWc1FpeHRRMEZCZDBNN1FVRkJMMElzTUVKQlFVRXNUVUZCVFN4RFFVRkJPMEZCUTJZc2FVTkJRWFZETzBGQlFUbENMSGRDUVVGQkxFdEJRVXNzUTBGQlFUdEJRVU5rTEcxRFFVRjNRenRCUVVFdlFpd3dRa0ZCUVN4TlFVRk5MRU5CUVVFN1FVRkRaaXcyUTBGQk5rTTdRVUZCY0VNc2IwTkJRVUVzVjBGQlZ5eERRVUZCTzBGQlEzQkNMR2xFUVVFclF6dEJRVUYwUXl4M1EwRkJRU3hoUVVGaExFTkJRVUU3UVVGRGRFSXNLME5CUVRoRE8wRkJRWEpETEhORFFVRkJMRmxCUVZrc1EwRkJRVHRCUVVOeVFpeHBSRUZCSzBNN1FVRkJkRU1zZDBOQlFVRXNZVUZCWVN4RFFVRkJPMEZCUTNSQ0xHbEVRVUVyUXp0QlFVRjBReXgzUTBGQlFTeGhRVUZoTEVOQlFVRTdRVUZEZEVJc05rTkJRVFpETzBGQlFYQkRMRzlEUVVGQkxGZEJRVmNzUTBGQlFUdEJRVU53UWl4cFEwRkJkVU03UVVGQk9VSXNkMEpCUVVFc1MwRkJTeXhEUVVGQk8wRkJRMlFzZVVOQlFUSkRPMEZCUVd4RExHZERRVUZCTEZOQlFWTXNRMEZCUVR0QlFVTnNRaXg1UTBGQk1rTTdRVUZCYkVNc1owTkJRVUVzVTBGQlV5eERRVUZCTzBGQlEyeENMSGxEUVVFeVF6dEJRVUZzUXl3clFrRkJRU3hSUVVGUkxFTkJRVUU3UVVGRGFrSXNkVU5CUVRCRE8wRkJRV3BETERoQ1FVRkJMRkZCUVZFc1EwRkJRVHRCUVVOcVFpd3lRMEZCTkVNN1FVRkJia01zYTBOQlFVRXNWVUZCVlN4RFFVRkJPMEZCUTI1Q0xDdERRVUU0UXp0QlFVRnlReXh6UTBGQlFTeFpRVUZaTEVOQlFVRTdRVUZEY2tJc0swTkJRVGhETzBGQlFYSkRMSE5EUVVGQkxGbEJRVmtzUTBGQlFTSjkiXSwic291cmNlUm9vdCI6IiJ9