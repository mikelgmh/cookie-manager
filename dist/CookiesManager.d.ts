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
    setCookies(): void;
    setCookie(cookieName: string, cookieValue: string, expDays?: number, path?: string): void;
    getCookie(cookieName: any): any;
    acceptAllButton(acceptedAll?: boolean): void;
    showModal(): void;
    showBanner(): void;
    hideBanner(): void;
    hideModal(): void;
    callIndividualCallbacks(): void;
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
export interface Events {
    onAccept: Function;
    onReject: Function;
    setCookiesOnChange: Array<CookieObject>;
}
export interface CookieObject {
    cookieName: string;
    valueOnAccept: string | number;
    valueOnReject: string | number;
    expirationDays: number;
}
export interface Options {
    cookieCategories: Array<CookieCategory>;
    initOnDomContentLoaded: boolean;
    askAgainIfRejectedAfterDays: number;
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
    events: Events;
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
