import { Component } from '../component';
export declare class Helmet extends Component {
    static SSR(body: string): {
        body: string;
        head: string[];
        footer: string[];
    };
    didMount(): void;
    render(): any;
}
//# sourceMappingURL=helmet.d.ts.map