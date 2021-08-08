interface DialogAction {
    name: string;
    id?: string | number;
    color?: string;
}
interface DialogActionEvent {
    action: string;
}
interface DialogOptions {
    title?: string;
    body?: string;
    actions?: DialogAction[];
    onAction?: () => DialogActionEvent;
    parentId?: string;
}
export declare class Dialog {
    options: DialogOptions;
    defaultParentId: string;
    defaultActionColor: string;
    constructor(options?: DialogOptions);
    private getParentElement;
    remove(): void;
    show(options: DialogOptions | null, callback: (event: {
        name: string;
        id: string | number;
    }) => void): void;
}
export {};
//# sourceMappingURL=dialog.d.ts.map