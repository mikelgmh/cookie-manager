
import { Banner, BannerOptions } from "./Banner";
import { ModalOptions, Modal } from './Modal';
import "./scss/styles.scss";
export class CookiesManager {

    // var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
    private modalOptions: Options;
    private banner: Banner;
    private modal: Modal;
    private acceptAll: boolean = false;


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
            options.cookieCategories.forEach(category => {
                category.checked = true;
            });
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
        this.acceptAll = true;
        this.modal.hide();
        this.banner.hide();
        this.injectScripts();
    }

    public hideBanner() {
        this.banner.hide();
    }

    public hideModal() {
        this.modal.hide();
    }

    private injectScript(src: string, async) {
        var s = document.createElement('script');
        s.setAttribute('src', src);
        s.async = async;
        document.body.appendChild(s);
    }

    public injectScripts() {
        this.modalOptions.cookieCategories.forEach(category => {

            if (category.checked || this.acceptAll) {
                category.scripts.forEach(script => {
                    console.log("injecting script: " + script.scriptSrc);
                    this.injectScript(script.scriptSrc, script.async)

                });
            }
        });
    }

}

export interface Options {
    cookieCategories: [
        {
            title: string,
            description: string,
            required: boolean,
            checked: boolean,
            scripts: [
                {
                    type: ScriptType,
                    gtmCode: string,
                    scriptSrc: string,
                    async: boolean,
                }
            ]
        }
    ]
}

export enum ScriptType {
    GTM,
    STANDARD
}