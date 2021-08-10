"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
class Store {
    /**
     * Create your own Store.
     * @param defaultState Pass the initial State.
     * @param name The name of the Store (only required if you persist the state in localStorage or sessionStorage).
     * @param storage Pass 'memory', 'local' or 'session'.
     */
    constructor(defaultState, name = '', storage = 'memory') {
        this._listeners = new Map();
        if (typeof isSSR !== 'undefined')
            storage = 'memory';
        this._id = name;
        this._storage = storage;
        this._state = this._prevState = defaultState;
        if (storage === 'memory' || !storage)
            return;
        const Storage = storage === 'local' ? localStorage : sessionStorage;
        // get/set initial state of Storage
        const item = Storage.getItem(this._id);
        if (item) {
            this._state = this._prevState = JSON.parse(item);
        }
        else
            Storage.setItem(this._id, JSON.stringify(defaultState));
    }
    persist(newState) {
        if (this._storage === 'memory')
            return;
        const Storage = this._storage === 'local' ? localStorage : sessionStorage;
        Storage.setItem(this._id, JSON.stringify(newState));
    }
    /** Clears the state of the whole store. */
    clear() {
        this._state = this._prevState = undefined;
        if (this._storage === 'local')
            localStorage.removeItem(this._id);
        else if (this._storage === 'session')
            sessionStorage.removeItem(this._id);
    }
    setState(newState) {
        this.state = newState;
    }
    set state(newState) {
        this._prevState = this._state;
        this._state = newState;
        this.persist(newState);
        this._listeners.forEach(fnc => {
            fnc(this._state, this._prevState);
        });
    }
    get state() {
        return this._state;
    }
    use() {
        const id = Math.random().toString(36).substr(2, 9);
        const _this = this;
        return {
            get state() {
                return _this.state;
            },
            setState: (newState) => {
                this.state = newState;
            },
            subscribe: (fnc) => {
                this._listeners.set(id, fnc);
            },
            cancel: () => {
                this._listeners.delete(id);
            }
        };
    }
}
exports.Store = Store;
//# sourceMappingURL=store.js.map