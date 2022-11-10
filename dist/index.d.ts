import "./scss/styles.scss";
import { Options } from "./ModalOptions";
export declare class CookiesManager {
    private modalOptions;
    constructor(options: Options);
    getDefaultOptions(): Options;
    injectModal(): void;
    showModal(modalContent: any): void;
    closeModal(): void;
    setEventListeners(): void;
    getModal(): string;
}
export interface CookiesModalOptions {
    width: string;
}
