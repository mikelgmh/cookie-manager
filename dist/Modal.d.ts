import { CookiesManager } from './CookiesManager';
export declare class Modal {
    private options;
    private cookiesManager;
    constructor(cookiesManager: CookiesManager, options: ModalOptions);
    show(): Promise<void>;
    hide(self?: Modal): void;
    setEventListeners(): void;
    private updateSwitchDisabledStatus;
    private toggleSwitch;
    private toggleAccordion;
    injectModal(): void;
    updateSwitchesStatus(): void;
    private generateCategoriesBlocks;
    getCloseButton(): "" | "<div class=\"modal__close close-modal\" title=\"Close\"><div class=\"close-modal-img\"></div></div>";
    getAcceptAllButton(): string;
    getRejectAllButton(): string;
    getSaveButton(): string;
    generateModal(): string;
}
export interface ModalOptions {
    inject: boolean;
    title: string;
    description: string;
    showModalClass: string;
    acceptAllButton: {
        text: string;
        show: boolean;
    };
    rejectAllButton: {
        show: boolean;
        text: string;
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
