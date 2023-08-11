import { CookiesManager } from './CookiesManager';
export declare class Banner {
    private options;
    private banner;
    private cookiesManager;
    constructor(cookiesManager: CookiesManager, options: BannerOptions);
    setEventListeners(): void;
    private generateBanner;
    getAcceptAllButton(): string;
    getRejectAllButton(): string;
    getSettingsButton(): string;
    private getBannerText;
    private injectWall;
    injectBanner(): void;
    private generateWall;
    showWall(): void;
    hideWall(): void;
    hideScroll(): void;
    showScroll(): void;
    show(): void;
    hide(): void;
}
export interface BannerOptions {
    bannerText: string;
    wall: boolean;
    injectWall: boolean;
    wallScroll: boolean;
    wallBlur: boolean;
    inject: boolean;
    acceptAllButton: {
        text: string;
        show: boolean;
        onClick: Function;
    };
    settingsButton: {
        text: string;
        show: boolean;
        onClick: Function;
    };
    acceptRequiredOnlyButton: {
        text: string;
        show: boolean;
        onClick: Function;
    };
    rejectAllButton: {
        text: string;
        show: boolean;
        onClick: Function;
    };
}
