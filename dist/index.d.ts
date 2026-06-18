export declare interface Accordion {
    enable: boolean;
    enableOnDescriptionLength: number;
    active: boolean;
}

export declare interface BannerOptions {
    inject: boolean;
    injectWall: boolean;
    wall: boolean;
    wallScroll: boolean;
    wallBlur: boolean;
    bannerText: string;
    acceptAllButton: ButtonOptions;
    rejectAllButton: ButtonOptions;
    settingsButton: ButtonOptions;
    acceptRequiredOnlyButton: ButtonOptions;
}

export declare interface ButtonOptions {
    text: string;
    show: boolean;
    onClick: () => void;
}

export declare type CategoryChangeCallback = (category: CookieCategory) => void;

export declare interface CookieCategory {
    id: string;
    title: string;
    description: string;
    required: boolean;
    checked: boolean;
    boxedHeader: boolean;
    boxedBody: boolean;
    accordion: Accordion;
    events: Events;
    scripts: Script[];
}

export declare interface CookieObject {
    cookieName: string;
    valueOnAccept: string | number | boolean;
    valueOnReject: string | number | boolean;
    expirationDays: number;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
    domain?: string;
}

export declare interface CookiesManagerAPI {
    init(options?: InitOptions): Promise<void>;
    onCategoryChange(callback: CategoryChangeCallback): void;
    showBanner(): void;
    hideBanner(): void;
    showModal(): void;
    hideModal(): void;
    acceptAll(): void;
    rejectAll(): void;
    save(): void;
    getOptions(): Options;
    destroy(): void;
}

export declare function createCookiesManager(userOptions?: Partial<Options>): CookiesManagerAPI;

export declare interface Events {
    onAccept: () => void;
    onReject: () => void;
    setCookiesOnChange: CookieObject[];
}

export declare interface InitOptions {
    banner?: boolean;
    modal?: boolean;
}

export declare interface ModalOptions {
    inject: boolean;
    title: string;
    description: string;
    showModalClass: string;
    acceptAllButton: ButtonOptions;
    rejectAllButton: ButtonOptions;
    saveButton: ButtonOptions;
    closeButton: ButtonOptions;
}

export declare interface Options {
    cookieCategories: CookieCategory[];
    askOnce: boolean;
    askOnChange: boolean;
    askAgainIfRejectedAfterDays: number;
    delay: number;
    initOnDomContentLoaded: boolean;
    bannerOptions: BannerOptions;
    modalOptions: ModalOptions;
}

export declare interface Script {
    type: ScriptType;
    gtmCode?: string;
    scriptSrc?: string;
    async: boolean;
}

export declare enum ScriptType {
    GTM = 0,
    STANDARD = 1
}

export { }
