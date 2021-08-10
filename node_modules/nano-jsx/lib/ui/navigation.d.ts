import { Component } from '../component';
interface NavigationProps {
    parentId?: string;
    children?: Component<any>[];
}
interface ActionProps {
    id?: string;
    label: string;
    active?: boolean;
    icon?: any;
    link?: string;
    onClick?: (e: {
        id: string;
        label: string;
        component: NavigationAction;
        navigate: boolean;
    }) => void;
}
export declare class NavigationAction extends Component<ActionProps> {
    willMount(): void;
    render(): any;
}
export declare class Navigation extends Component<NavigationProps> {
    didMount(): void;
    render(): any;
}
export {};
//# sourceMappingURL=navigation.d.ts.map