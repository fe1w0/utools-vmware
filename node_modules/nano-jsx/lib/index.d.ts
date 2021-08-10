import './types';
export { h, render, hydrate, tick } from './core';
export type { FC } from './core';
export { Component } from './component';
export * from './components/index';
declare const _default: {
    h: (tagNameOrComponent: any, props: any, ...children: any) => any;
    render: (component: any, parent?: HTMLElement | null, removeChildNodes?: boolean) => any;
    hydrate: (component: any, parent?: HTMLElement | null, removeChildNodes?: boolean) => any;
    renderSSR: (component: any, options?: {
        pathname?: string | undefined;
        clearState?: boolean | undefined;
    }) => string;
};
export default _default;
export { jsx } from './jsx';
export { hydrateLazy } from './lazy';
export { nodeToString, task } from './helpers';
export { renderSSR } from './ssr';
export { Fragment } from './fragment';
export { Store } from './store';
export { createContext } from './context';
export { withStyles } from './withStyles';
export { printVersion } from './helpers';
export { VERSION } from './version';
//# sourceMappingURL=index.d.ts.map