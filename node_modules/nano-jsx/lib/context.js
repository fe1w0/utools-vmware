"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const createContext = (ctx) => {
    let _ctx = ctx;
    return {
        Provider: (props) => {
            if (props.value)
                _ctx = props.value;
            return props.children;
        },
        Consumer: (props) => {
            return { component: props.children[0](_ctx), props: Object.assign(Object.assign({}, props), { context: _ctx }) };
        },
        get: () => _ctx,
        set: (ctx) => (_ctx = ctx)
    };
};
exports.createContext = createContext;
//# sourceMappingURL=context.js.map