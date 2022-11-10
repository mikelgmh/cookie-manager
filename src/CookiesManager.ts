
import { Banner, BannerOptions } from "./Banner";
import { ModalOptions, Modal } from './Modal';
import "./scss/styles.scss";
export class CookiesManager {

    // var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
    private modalOptions: Options;
    private banner: Banner;
    private modal: Modal;

    public getBanner(): Banner {
        return this.banner;
    }

    public setBanner(banner: Banner): void {
        this.banner = banner;
    }

    public getModal(): Modal {
        return this.modal;
    }

    public setModal(modal: Modal): void {
        this.modal = modal;
    }

    public getOptions(): Options {
        return this.modalOptions;
    }


    constructor(options: Options) {
        if (options == null) {
            throw new Error("Options cannot be null");
        } else {
            this.modalOptions = options;
        }

    }


    public createBanner(options: BannerOptions) {
        this.banner = new Banner(this, options);
        return this.banner;
    }
    public createModal(options: ModalOptions) {
        this.modal = new Modal(this, options);
        return this.modal;
    }

    public acceptAllButton() {
        alert("Accepting all!")
        this.modal.hide();
        this.banner.hide();
    }

    public hideBanner(){
        this.banner.hide();
    }

    public hideModal(){
        this.modal.hide();
    }

}

export interface Options {
    cookieCategories: [
        {
            title: string,
            description: string,
            required: boolean,
            scripts: [
                {
                    type: string,
                    gtmCode: string,
                    scriptTag: string,
                }
            ]
        }
    ]
}