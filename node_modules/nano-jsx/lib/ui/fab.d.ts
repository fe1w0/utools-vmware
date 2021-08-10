import { Component } from '../component';
interface FabProps {
    onClick?: (e: MouseEvent) => void;
    offsetY?: number;
    center?: boolean;
    left?: boolean;
    extended?: boolean;
    mini?: boolean;
    background?: string;
    color?: string;
}
export declare class Fab extends Component<FabProps> {
    render(): any;
}
export {};
//# sourceMappingURL=fab.d.ts.map