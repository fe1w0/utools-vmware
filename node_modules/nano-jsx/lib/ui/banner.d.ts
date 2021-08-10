import { Component } from '../component';
interface BannerAction {
    name: string;
    id?: string | number;
    color?: string;
}
interface BannerActionEvent {
    action: string;
}
interface BannerProps {
    title?: string;
    body?: string;
    actions?: BannerAction[];
    onAction?: () => BannerActionEvent;
    parentId?: string;
    sticky?: number;
}
export declare class Banner extends Component<BannerProps> {
    defaultActionColor: string;
    render(): any;
}
export {};
//# sourceMappingURL=banner.d.ts.map