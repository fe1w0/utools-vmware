"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.printVersion = exports.withStyles = exports.createContext = exports.Store = exports.Fragment = exports.renderSSR = exports.task = exports.nodeToString = exports.hydrateLazy = exports.jsx = exports.Component = exports.tick = exports.hydrate = exports.render = exports.h = void 0;
require("./types");
// core
var core_1 = require("./core");
Object.defineProperty(exports, "h", { enumerable: true, get: function () { return core_1.h; } });
Object.defineProperty(exports, "render", { enumerable: true, get: function () { return core_1.render; } });
Object.defineProperty(exports, "hydrate", { enumerable: true, get: function () { return core_1.hydrate; } });
Object.defineProperty(exports, "tick", { enumerable: true, get: function () { return core_1.tick; } });
// component
var component_1 = require("./component");
Object.defineProperty(exports, "Component", { enumerable: true, get: function () { return component_1.Component; } });
// built-in Components
__exportStar(require("./components/index"), exports);
// export some defaults (Nano)
const core_2 = require("./core");
const ssr_1 = require("./ssr");
exports.default = { h: core_2.h, render: core_2.render, hydrate: core_2.hydrate, renderSSR: ssr_1.renderSSR };
// other
var jsx_1 = require("./jsx");
Object.defineProperty(exports, "jsx", { enumerable: true, get: function () { return jsx_1.jsx; } });
var lazy_1 = require("./lazy");
Object.defineProperty(exports, "hydrateLazy", { enumerable: true, get: function () { return lazy_1.hydrateLazy; } });
var helpers_1 = require("./helpers");
Object.defineProperty(exports, "nodeToString", { enumerable: true, get: function () { return helpers_1.nodeToString; } });
Object.defineProperty(exports, "task", { enumerable: true, get: function () { return helpers_1.task; } });
var ssr_2 = require("./ssr");
Object.defineProperty(exports, "renderSSR", { enumerable: true, get: function () { return ssr_2.renderSSR; } });
var fragment_1 = require("./fragment");
Object.defineProperty(exports, "Fragment", { enumerable: true, get: function () { return fragment_1.Fragment; } });
var store_1 = require("./store");
Object.defineProperty(exports, "Store", { enumerable: true, get: function () { return store_1.Store; } });
var context_1 = require("./context");
Object.defineProperty(exports, "createContext", { enumerable: true, get: function () { return context_1.createContext; } });
var withStyles_1 = require("./withStyles");
Object.defineProperty(exports, "withStyles", { enumerable: true, get: function () { return withStyles_1.withStyles; } });
// version
var helpers_2 = require("./helpers");
Object.defineProperty(exports, "printVersion", { enumerable: true, get: function () { return helpers_2.printVersion; } });
var version_1 = require("./version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
//# sourceMappingURL=index.js.map