import { Component } from '../component';
interface AppBarProps {
    maxWidth?: number;
    autoHide?: boolean;
    autoMerge?: boolean;
    background?: string;
    color?: string;
}
export declare class AppBar extends Component<AppBarProps> {
    curr_scrollY: number;
    last_scrollY: number;
    curr_scrollingState: string;
    last_scrollingState: string;
    container: HTMLElement;
    calcScrollPosition(): void;
    scroll(): void;
    merge(): void;
    didMount(): void;
    didUnmount(): void;
    render(): HTMLElement;
}
export {};
//# sourceMappingURL=appBar.d.ts.map