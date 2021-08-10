import { Component } from '../component';
interface ToolbarProps {
    menu?: boolean;
    back?: boolean;
    actionClick?: Function;
    title?: string;
    children?: any;
}
export declare class Toolbar extends Component<ToolbarProps> {
    static setTitle(title: string): void;
    render(): any;
}
export {};
//# sourceMappingURL=toolbar.d.ts.map