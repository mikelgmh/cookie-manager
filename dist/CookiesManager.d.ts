import { Banner, BannerOptions } from "./Banner";
import { ModalOptions, Modal } from './Modal';
import "./scss/styles.scss";
interface cookieCatergoryCallbackInterface {
    (CookieCategory: CookieCategory): void;
}
export declare class CookiesManager {
    private modalOptions;
    private banner;
    private modal;
    private acceptAll;
    private configChanged;
    private onCookieCategoryChange;
    getBanner(): Banner;
    setBanner(banner: Banner): void;
    getModal(): Modal;
    setModal(modal: Modal): void;
    getOptions(): Options;
    on(listener: any, callback: cookieCatergoryCallbackInterface): void;
    constructor(options: Options);
    private constructorInitializationFunction;
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
    init(banner: boolean, modal: boolean): Promise<void>;
    initShow(banner: boolean, modal: boolean): Promise<void>;
    injectScripts(): void;
    saveButton(): void;
    saveCookieOptions(): void;
    getCookiesOptions(): any;
    private getDefaultCookieCategoryOptions;
    private getDefaultOptions;
}
export interface Options {
    cookieCategories: Array<CookieCategory>;
    initOnDomContentLoaded: boolean;
    bannerOptions: BannerOptions;
    modalOptions: ModalOptions;
    askOnce: boolean;
    askOnChange: boolean;
    delay: number;
}
export interface CookieCategory {
    title: string;
    id: string;
    description: string;
    required: boolean;
    checked: boolean;
    accordion: Accordion;
    boxedHeader: boolean;
    boxedBody: boolean;
    scripts: [
        {
            type: ScriptType;
            gtmCode: string;
            scriptSrc: string;
            async: boolean;
        }
    ] | [];
}
export interface Accordion {
    enable: boolean;
    enableOnDescriptionLength: number;
    active: boolean;
}
export declare enum ScriptType {
    GTM = 0,
    STANDARD = 1
}
export {};
