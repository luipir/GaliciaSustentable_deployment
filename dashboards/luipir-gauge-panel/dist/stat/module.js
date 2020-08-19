define(["@grafana/data","@grafana/runtime","@grafana/ui","react"], function(__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE__grafana_runtime__, __WEBPACK_EXTERNAL_MODULE__grafana_ui__, __WEBPACK_EXTERNAL_MODULE_react__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./stat/module.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./stat/StatMigrations.ts":
/*!********************************!*\
  !*** ./stat/StatMigrations.ts ***!
  \********************************/
/*! exports provided: statPanelChangedHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statPanelChangedHandler", function() { return statPanelChangedHandler; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
 // This is called when the panel changes from another panel

var statPanelChangedHandler = function statPanelChangedHandler(panel, prevPluginId, prevOptions) {
  // This handles most config changes
  var options = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["sharedSingleStatPanelChangedHandler"])(panel, prevPluginId, prevOptions); // Changing from angular singlestat

  if (prevPluginId === 'singlestat' && prevOptions.angular) {
    var oldOptions = prevOptions.angular;
    options.graphMode = oldOptions.sparkline && oldOptions.sparkline.show === true ? _grafana_ui__WEBPACK_IMPORTED_MODULE_0__["BigValueGraphMode"].Area : _grafana_ui__WEBPACK_IMPORTED_MODULE_0__["BigValueGraphMode"].None;

    if (oldOptions.colorBackground) {
      options.colorMode = _grafana_ui__WEBPACK_IMPORTED_MODULE_0__["BigValueColorMode"].Background;
    } else {
      options.colorMode = _grafana_ui__WEBPACK_IMPORTED_MODULE_0__["BigValueColorMode"].Value;
    }
  }

  return options;
};

/***/ }),

/***/ "./stat/StatPanel.tsx":
/*!****************************!*\
  !*** ./stat/StatPanel.tsx ***!
  \****************************/
/*! exports provided: StatPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatPanel", function() { return StatPanel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__);






var StatPanel =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(StatPanel, _super);

  function StatPanel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.renderComponent = function (valueProps, menuProps) {
      var _a = _this.props,
          timeRange = _a.timeRange,
          options = _a.options;
      var value = valueProps.value,
          alignmentFactors = valueProps.alignmentFactors,
          width = valueProps.width,
          height = valueProps.height;
      var openMenu = menuProps.openMenu,
          targetClassName = menuProps.targetClassName;
      var sparkline;
      var grafanaConfig = _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["config"];

      if (value.sparkline) {
        sparkline = {
          data: value.sparkline,
          xMin: timeRange.from.valueOf(),
          xMax: timeRange.to.valueOf(),
          yMin: value.field.min,
          yMax: value.field.max
        };
        var calc = options.reduceOptions.calcs[0];

        if (calc === _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ReducerID"].last) {
          sparkline.highlightIndex = sparkline.data.length - 1;
        }
      }

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["BigValue"], {
        value: value.display,
        sparkline: sparkline,
        colorMode: options.colorMode,
        graphMode: options.graphMode,
        justifyMode: options.justifyMode,
        alignmentFactors: alignmentFactors,
        width: width,
        height: height,
        theme: grafanaConfig.theme,
        onClick: openMenu,
        className: targetClassName
      });
    };

    _this.renderValue = function (valueProps) {
      var value = valueProps.value;
      var getLinks = value.getLinks,
          hasLinks = value.hasLinks;

      if (hasLinks && getLinks) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["DataLinksContextMenu"], {
          links: getLinks
        }, function (api) {
          return _this.renderComponent(valueProps, api);
        });
      }

      return _this.renderComponent(valueProps, {});
    };

    _this.getValues = function () {
      var _a = _this.props,
          data = _a.data,
          options = _a.options,
          replaceVariables = _a.replaceVariables,
          fieldConfig = _a.fieldConfig,
          timeZone = _a.timeZone;
      var grafanaConfig = _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["config"];
      return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["getFieldDisplayValues"])({
        fieldConfig: fieldConfig,
        reduceOptions: options.reduceOptions,
        replaceVariables: replaceVariables,
        theme: grafanaConfig.theme,
        data: data.series,
        sparkline: options.graphMode !== _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["BigValueGraphMode"].None,
        autoMinMax: true,
        timeZone: timeZone
      });
    };

    return _this;
  }

  StatPanel.prototype.render = function () {
    var _a = this.props,
        height = _a.height,
        options = _a.options,
        width = _a.width,
        data = _a.data,
        renderCounter = _a.renderCounter;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["VizRepeater"], {
      getValues: this.getValues,
      getAlignmentFactors: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["getDisplayValueAlignmentFactors"],
      renderValue: this.renderValue,
      width: width,
      height: height,
      source: data,
      itemSpacing: 3,
      renderCounter: renderCounter,
      autoGrid: true,
      orientation: options.orientation
    });
  };

  return StatPanel;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]);



/***/ }),

/***/ "./stat/module.tsx":
/*!*************************!*\
  !*** ./stat/module.tsx ***!
  \*************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./stat/types.ts");
/* harmony import */ var _StatPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StatPanel */ "./stat/StatPanel.tsx");
/* harmony import */ var _StatMigrations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StatMigrations */ "./stat/StatMigrations.ts");





var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["PanelPlugin"](_StatPanel__WEBPACK_IMPORTED_MODULE_3__["StatPanel"]).useFieldConfig().setPanelOptions(function (builder) {
  Object(_types__WEBPACK_IMPORTED_MODULE_2__["addStandardDataReduceOptions"])(builder);
  builder.addRadio({
    path: 'colorMode',
    name: 'Color mode',
    description: 'Color either the value or the background',
    defaultValue: 'value',
    settings: {
      options: [{
        value: 'value',
        label: 'Value'
      }, {
        value: 'background',
        label: 'Background'
      }]
    }
  }).addRadio({
    path: 'graphMode',
    name: 'Graph mode',
    description: 'Stat panel graph / sparkline mode',
    defaultValue: 'area',
    settings: {
      options: [{
        value: 'none',
        label: 'None'
      }, {
        value: 'area',
        label: 'Area'
      }]
    }
  }).addRadio({
    path: 'justifyMode',
    name: 'Alignment mode',
    description: 'Value & title posititioning',
    defaultValue: 'auto',
    settings: {
      options: [{
        value: 'auto',
        label: 'Auto'
      }, {
        value: 'center',
        label: 'Center'
      }]
    }
  });
}).setNoPadding().setPanelChangeHandler(_StatMigrations__WEBPACK_IMPORTED_MODULE_4__["statPanelChangedHandler"]).setMigrationHandler(_grafana_ui__WEBPACK_IMPORTED_MODULE_0__["sharedSingleStatMigrationHandler"]);

/***/ }),

/***/ "./stat/types.ts":
/*!***********************!*\
  !*** ./stat/types.ts ***!
  \***********************/
/*! exports provided: colorModes, graphModes, justifyModes, addStandardDataReduceOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorModes", function() { return colorModes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphModes", function() { return graphModes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "justifyModes", function() { return justifyModes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addStandardDataReduceOptions", function() { return addStandardDataReduceOptions; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "@grafana/ui");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_2__);



var colorModes = [{
  value: _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["BigValueColorMode"].Value,
  label: 'Value'
}, {
  value: _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["BigValueColorMode"].Background,
  label: 'Background'
}];
var graphModes = [{
  value: _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["BigValueGraphMode"].None,
  label: 'None'
}, {
  value: _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["BigValueGraphMode"].Area,
  label: 'Area graph'
}];
var justifyModes = [{
  value: _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["BigValueJustifyMode"].Auto,
  label: 'Auto'
}, {
  value: _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["BigValueJustifyMode"].Center,
  label: 'Center'
}];
function addStandardDataReduceOptions(builder, includeOrientation, includeFieldMatcher) {
  var _this = this;

  if (includeOrientation === void 0) {
    includeOrientation = true;
  }

  if (includeFieldMatcher === void 0) {
    includeFieldMatcher = true;
  }

  builder.addRadio({
    path: 'reduceOptions.values',
    name: 'Show',
    description: 'Calculate a single value per column or series or show each row',
    settings: {
      options: [{
        value: false,
        label: 'Calculate'
      }, {
        value: true,
        label: 'All values'
      }]
    },
    defaultValue: false
  });
  builder.addNumberInput({
    path: 'reduceOptions.limit',
    name: 'Limit',
    description: 'Max number of rows to display',
    settings: {
      placeholder: '5000',
      integer: true,
      min: 1,
      max: 5000
    },
    showIf: function showIf(options) {
      return options.reduceOptions.values === true;
    }
  });
  builder.addCustomEditor({
    id: 'reduceOptions.calcs',
    path: 'reduceOptions.calcs',
    name: 'Value',
    description: 'Choose a reducer function / calculation',
    editor: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["standardEditorsRegistry"].get('stats-picker').editor,
    defaultValue: [_grafana_data__WEBPACK_IMPORTED_MODULE_2__["ReducerID"].mean],
    // Hides it when all values mode is on
    showIf: function showIf(currentConfig) {
      return currentConfig.reduceOptions.values === false;
    }
  });

  if (includeFieldMatcher) {
    builder.addSelect({
      path: 'reduceOptions.fields',
      name: 'Fields',
      description: 'Select the fields that should be included in the panel',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: function getOptions(context) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var options, _a, _b, frame, _c, _d, field, name, value;

            var e_1, _e, e_2, _f;

            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_g) {
              options = [{
                value: '',
                label: 'Numeric Fields'
              }, {
                value: '/.*/',
                label: 'All Fields'
              }];

              if (context && context.data) {
                try {
                  for (_a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(context.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                    frame = _b.value;

                    try {
                      for (_c = (e_2 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(frame.fields)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        field = _d.value;
                        name = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["getFieldDisplayName"])(field, frame, context.data);
                        value = "/^" + Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["escapeStringForRegex"])(name) + "$/";
                        options.push({
                          value: value,
                          label: name
                        });
                      }
                    } catch (e_2_1) {
                      e_2 = {
                        error: e_2_1
                      };
                    } finally {
                      try {
                        if (_d && !_d.done && (_f = _c["return"])) _f.call(_c);
                      } finally {
                        if (e_2) throw e_2.error;
                      }
                    }
                  }
                } catch (e_1_1) {
                  e_1 = {
                    error: e_1_1
                  };
                } finally {
                  try {
                    if (_b && !_b.done && (_e = _a["return"])) _e.call(_a);
                  } finally {
                    if (e_1) throw e_1.error;
                  }
                }
              }

              return [2
              /*return*/
              , Promise.resolve(options)];
            });
          });
        }
      },
      defaultValue: ''
    });
  }

  if (includeOrientation) {
    builder.addRadio({
      path: 'orientation',
      name: 'Orientation',
      description: 'Stacking direction in case of multiple series or fields',
      settings: {
        options: [{
          value: 'auto',
          label: 'Auto'
        }, {
          value: 'horizontal',
          label: 'Horizontal'
        }, {
          value: 'vertical',
          label: 'Vertical'
        }]
      },
      defaultValue: 'auto'
    });
  }
}

/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "@grafana/runtime":
/*!***********************************!*\
  !*** external "@grafana/runtime" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_runtime__;

/***/ }),

/***/ "@grafana/ui":
/*!******************************!*\
  !*** external "@grafana/ui" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_ui__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map