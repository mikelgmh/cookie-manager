import { Banner, BannerOptions } from "./Banner";
import { ModalOptions, Modal } from './Modal';
import "./scss/styles.scss";
export declare class CookiesManager {
    private modalOptions;
    private banner;
    private modal;
    getBanner(): Banner;
    setBanner(banner: Banner): void;
    getModal(): Modal;
    setModal(modal: Modal): void;
    getOptions(): Options;
    constructor(options: Options);
    createBanner(options: BannerOptions): Banner;
    createModal(options: ModalOptions): Modal;
    acceptAllButton(): void;
    hideBanner(): void;
    hideModal(): void;
}
export interface Options {
    cookieCategories: [
        {
            title: string;
            description: string;
            required: boolean;
            scripts: [
                {
                    type: string;
                    gtmCode: string;
                    scriptTag: string;
                }
            ];
        }
    ];
}
