
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
            // Check options to create banner and modal

            // Generate modal
            if (options.modalOptions != null) {
                this.createModal(options.modalOptions);
            }


            if (options.bannerOptions != null) {
                if (options.modalOptions != null) {
                    options.bannerOptions.settingsButton.modal = this.modal; // The modal was already created
                }
                this.createBanner(options.bannerOptions);
            }

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
        this.setCookie();
    }

    public showModal() {
        this.modal.show();
    }

    public showBanner() {
        this.banner.show();
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

    public init(banner: boolean, modal: boolean) {
        if (this.modalOptions.askOnce) {
            if (this.readCookie() != "true") {
                if (banner) {
                    this.showBanner();
                }
                if (modal) {
                    this.showModal();
                }
            }
        } else {

            if (banner) {
                this.showBanner();
            }
            if (modal) {
                this.showModal();
            }
           
        }
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

    saveButton(){
        this.setCookie();
    }

    setCookie(name = "analyticsCookie", value = true, days = 365) {
        let expires;
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toUTCString()}`;
        } else {
            expires = '';
        }
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/`;
    }

    readCookie(name = "analyticsCookie") {
        const nameEQ = `${encodeURIComponent(name)}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
        // if (readCookie("analyticCookie") === "true") {
        //     launchAnalytics();
        // }
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
    ],
    bannerOptions: BannerOptions,
    modalOptions: ModalOptions,
    askOnce: boolean,
}

export enum ScriptType {
    GTM,
    STANDARD
}