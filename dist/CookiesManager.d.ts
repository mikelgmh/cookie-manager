import { Banner, BannerOptions } from "./Banner";
import { ModalOptions, Modal } from './Modal';
import "./scss/styles.scss";
export declare class CookiesManager {
    private modalOptions;
    private banner;
    private modal;
    private acceptAll;
    private configChanged;
    getBanner(): Banner;
    setBanner(banner: Banner): void;
    getModal(): Modal;
    setModal(modal: Modal): void;
    getOptions(): Options;
    constructor(options: Options);
    setEventListeners(): void;
    createBanner(options: BannerOptions): Banner;
    createModal(options: ModalOptions): Modal;
    acceptAllButton(): void;
    showModal(): void;
    showBanner(): void;
    hideBanner(): void;
    hideModal(): void;
    private injectScript;
    private injectGTM;
    init(banner: boolean, modal: boolean): void;
    injectScripts(): void;
    saveButton(): void;
    saveCookieOptions(): void;
    getCookiesOptions(): any;
    private getDefaultOptions;
}
export interface Options {
    cookieCategories: Array<CookieCategory>;
    bannerOptions: BannerOptions;
    modalOptions: ModalOptions;
    askOnce: boolean;
    askOnChange: boolean;
}
export interface CookieCategory {
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
export declare enum ScriptType {
    GTM = 0,
    STANDARD = 1
}
