"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._clearState = exports._state = void 0;
/** Holds the state of the whole application. */
exports._state = new Map();
/** Clears the state of the whole application. */
const _clearState = () => {
    exports._state.clear();
};
exports._clearState = _clearState;
//# sourceMappingURL=state.js.map