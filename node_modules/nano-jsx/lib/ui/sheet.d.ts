import { Component } from '../component';
interface SheetProps {
    height?: string;
    width?: string;
    radius?: boolean;
    mode?: 'side' | 'bottom' | 'right' | 'left' | 'custom';
    title?: string;
    subtitle?: string;
}
export declare class Sheet extends Component<SheetProps> {
    static show(sheet: Sheet): void;
    static close(): void;
    render(): HTMLElement;
}
export {};
//# sourceMappingURL=sheet.d.ts.map