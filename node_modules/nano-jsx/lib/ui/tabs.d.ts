import { Component } from '../component';
interface TabsProps {
    active?: number;
    scroll?: boolean;
    children?: any[];
}
export declare const Tab: (props: any) => any;
export declare class Tabs extends Component<TabsProps> {
    line: HTMLElement;
    items: HTMLElement[];
    active: number;
    didMount(): void;
    render(): any;
}
export {};
//# sourceMappingURL=tabs.d.ts.map