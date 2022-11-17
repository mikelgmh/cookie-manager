import { CookiesManager } from './CookiesManager';
export declare class Banner {
    private options;
    private banner;
    private cookiesManager;
    constructor(cookiesManager: CookiesManager, options: BannerOptions);
    private setEventListeners;
    private generateBanner;
    private getBannerText;
    private getAcceptAllButtonText;
    injectBanner(): void;
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
    wallScroll: boolean;
    wallBlur: boolean;
    acceptAllButton: {
        text: string;
        show: boolean;
    };
    settingsButton: {
        text: string;
        show: boolean;
    };
    acceptRequiredOnlyButton: {
        text: string;
        show: boolean;
    };
    rejectAllButton: {
        text: string;
        show: boolean;
    };
}
