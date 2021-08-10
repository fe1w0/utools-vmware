import { Component } from '../component';
interface ListProps {
    small?: boolean;
    children?: any;
}
interface ListItemProps {
    onClick?: Function;
    icon?: string;
    avatar?: string;
    square?: string;
    image?: string;
    children?: any;
}
export declare class ListItem extends Component<ListItemProps> {
    render(): any;
}
export declare class List extends Component<ListProps> {
    cssHash: string;
    render(): any;
}
export {};
//# sourceMappingURL=list.d.ts.map