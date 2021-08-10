interface MenuOptions {
    position: {
        x: number;
        y: number;
    };
    list: any;
}
export declare class Menu {
    defaultParentId: string;
    cssHash: string;
    didUnmount(): void;
    private getParentElement;
    close(): void;
    open(menuOptions: MenuOptions): void;
}
export {};
//# sourceMappingURL=menu.d.ts.map