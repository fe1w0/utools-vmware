"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsx = void 0;
const core_1 = require("./core");
const htm_1 = __importDefault(require("./htm"));
const jsx = htm_1.default.bind(core_1.h);
exports.jsx = jsx;
//# sourceMappingURL=jsx.js.map