export declare class Component<P extends Object = any, S = any> {
    props: P;
    id: string;
    private _elements;
    private _skipUnmount;
    private _hasUnmounted;
    constructor(props: P);
    static isClass(): boolean;
    setState(state: S, shouldUpdate?: boolean): void;
    set state(state: S);
    get state(): S;
    set initState(state: S);
    /** Returns all currently rendered node elements */
    get elements(): HTMLElement[];
    set elements(elements: HTMLElement[]);
    private _addNodeRemoveListener;
    private _didMount;
    private _didUnmount;
    willMount(): any;
    didMount(): any;
    didUnmount(): any;
    render(_update?: any): HTMLElement | void;
    /** Will forceRender the component */
    update(update?: any): void;
    private _getHash;
}
//# sourceMappingURL=component.d.ts.map