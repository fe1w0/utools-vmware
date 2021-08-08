"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setState = exports.getState = exports.useState = void 0;
const state_1 = require("../state");
const useState = (state, id) => {
    const s = {
        setState(state) {
            if (state !== null)
                state_1._state.set(id, state);
        },
        get state() {
            return state_1._state.get(id);
        }
    };
    if (!state_1._state.has(id))
        state_1._state.set(id, state);
    return [s.state, s.setState];
};
exports.useState = useState;
const getState = (id) => {
    return state_1._state.get(id);
};
exports.getState = getState;
const setState = (id, state) => {
    return state_1._state.set(id, state);
};
exports.setState = setState;
//# sourceMappingURL=useState.js.map