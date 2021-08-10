import { Component } from '../component';
export declare class Suspense extends Component<{
    fallback: any;
    cache?: boolean;
    [key: string]: any;
}> {
    ready: boolean;
    constructor(props: any);
    didMount(): Promise<void>;
    ssr(): void;
    loadFromCache(cache: boolean): any;
    prepareData(rest: any, fnc: any, cache: boolean): {};
    addDataToChildren(data: any): void;
    render(): any;
}
//# sourceMappingURL=suspense.d.ts.map