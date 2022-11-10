import { Banner, BannerOptions } from "./Banner";
import { ModalOptions, Modal } from './Modal';
import "./scss/styles.scss";
export declare class CookiesManager {
    private modalOptions;
    private banner;
    private modal;
    private acceptAll;
    getBanner(): Banner;
    setBanner(banner: Banner): void;
    getModal(): Modal;
    setModal(modal: Modal): void;
    getOptions(): Options;
    constructor(options: Options);
    createBanner(options: BannerOptions): Banner;
    createModal(options: ModalOptions): Modal;
    acceptAllButton(): void;
    showModal(): void;
    showBanner(): void;
    hideBanner(): void;
    hideModal(): void;
    private injectScript;
    init(banner: boolean, modal: boolean): void;
    injectScripts(): void;
    saveButton(): void;
    setCookie(name?: string, value?: boolean, days?: number): void;
    readCookie(name?: string): string;
}
export interface Options {
    cookieCategories: [
        {
            title: string;
            description: string;
            required: boolean;
            checked: boolean;
            scripts: [
                {
                    type: ScriptType;
                    gtmCode: string;
                    scriptSrc: string;
                    async: boolean;
                }
            ];
        }
    ];
    bannerOptions: BannerOptions;
    modalOptions: ModalOptions;
    askOnce: boolean;
}
export declare enum ScriptType {
    GTM = 0,
    STANDARD = 1
}
