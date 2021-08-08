declare type Milliseconds = number;
interface SnackbarAction {
    name: string;
    id?: string | number;
    color?: string;
}
interface SnackbarActionEvent {
    action: string;
}
interface SnackbarOptions {
    message?: string;
    actions?: SnackbarAction[];
    onAction?: () => SnackbarActionEvent;
    autoHide?: boolean | Milliseconds;
    parentId?: string;
    offsetY?: number;
    consecutive?: boolean;
}
export declare class Snackbar {
    options: SnackbarOptions;
    defaultParentId: string;
    defaultActionColor: string;
    constructor(options?: SnackbarOptions);
    private getParentElement;
    remove(el: HTMLElement): void;
    show(options: SnackbarOptions | null, callback: (event: {
        name: string;
        id: string | number;
    }) => void): void;
    private _show;
}
export {};
//# sourceMappingURL=snackbar.d.ts.map