export declare const initSSR: (pathname?: string) => void;
export declare const clearState: () => void;
export declare const renderSSR: (component: any, options?: {
    pathname?: string;
    clearState?: boolean;
}) => string;
export declare class HTMLElementSSR {
    ssr: string;
    tagName: string;
    isSelfClosing: boolean;
    constructor(tag: string);
    get outerHTML(): string;
    get innerHTML(): string;
    get innerText(): string;
    set innerText(text: string);
    get attributes(): {
        length: number;
    };
    setAttributeNS(name: string, value: any): void;
    setAttribute(name: string, value: any): void;
    appendChild(child: any): void;
    replaceChild(newChild: any, _oldChild?: any): void;
    get children(): string[];
    addEventListener(_type: any, _listener: any, _options?: any): void;
}
export declare class DocumentSSR {
    body: HTMLElementSSR;
    head: HTMLElementSSR;
    constructor();
    createElement(tag: string): HTMLElementSSR;
    createElementNS(_URI: string, tag: string): HTMLElementSSR;
    createTextNode(text: string): string;
    querySelector(_query: any): undefined;
}
//# sourceMappingURL=ssr.d.ts.map