import { Component } from '../component';
interface IconProps {
    src: string;
    active?: boolean;
    color?: string;
    style?: string;
    size?: number;
    onClick?: (e: MouseEvent) => void;
}
export declare class Icon extends Component<IconProps> {
    cssHash: string;
    didUnmount(): void;
    render(): any;
}
export {};
//# sourceMappingURL=icon.d.ts.map