import { CookiesManager } from './CookiesManager';
export declare class Modal {
    private options;
    private cookiesManager;
    constructor(cookiesManager: CookiesManager, options: ModalOptions);
    show(): void;
    hide(): void;
    setEventListeners(): void;
    injectModal(): void;
    private generateCategoriesBlocks;
    generateModal(): string;
}
export interface ModalOptions {
    acceptAllButton: {
        text: string;
        show: boolean;
    };
    saveButton: {
        text: string;
        show: boolean;
    };
    closeButton: {
        text: string;
        show: boolean;
    };
}
