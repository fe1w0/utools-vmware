import { Component } from '../component';
import { FC } from '../core';
export declare class Switch extends Component<{
    fallback?: any;
    children?: any;
}> {
    index: number;
    path: string;
    match: {
        index: number;
        path: string;
    };
    didMount(): void;
    didUnmount(): void;
    handlePop(): void;
    findChild(): void;
    shouldUpdate(): boolean;
    render(): any;
}
export declare const Route: FC<{
    path: string;
    exact?: boolean;
    regex?: {
        [param: string]: RegExp;
    };
    children?: any;
}>;
export declare const to: (to: string, replace?: boolean) => void;
export declare const Link: FC<{
    to: string;
    replace?: boolean;
    children?: any;
}>;
//# sourceMappingURL=router.d.ts.map