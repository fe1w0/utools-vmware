declare type State = any;
export declare class Store {
    private _state;
    private _prevState;
    private _listeners;
    private _storage;
    private _id;
    /**
     * Create your own Store.
     * @param defaultState Pass the initial State.
     * @param name The name of the Store (only required if you persist the state in localStorage or sessionStorage).
     * @param storage Pass 'memory', 'local' or 'session'.
     */
    constructor(defaultState: Object, name?: string, storage?: 'memory' | 'local' | 'session');
    private persist;
    /** Clears the state of the whole store. */
    clear(): void;
    setState(newState: any): void;
    set state(newState: any);
    get state(): State;
    use(): {
        readonly state: any;
        setState: (newState: State) => void;
        subscribe: (fnc: (newState: State, prevState: State) => void) => void;
        cancel: () => void;
    };
}
export {};
//# sourceMappingURL=store.d.ts.map