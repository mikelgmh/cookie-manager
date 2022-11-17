
import { Banner, BannerOptions } from "./Banner";
import { ModalOptions, Modal } from './Modal';
import "./scss/styles.scss";
import { Utils } from './utils';
export class CookiesManager {

    // var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
    private modalOptions: Options;
    private banner: Banner;
    private modal: Modal;
    private acceptAll: boolean = false;
    private configChanged: boolean = false;


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
            // Merge the default options with user options
            options = Utils.mergeRecursively(this.getDefaults(), options);
            this.modalOptions = options;
            // Check options to create banner and modal

            if (localStorage.getItem("cookiesManagerOptions") != null) {
                // Prepare the options to compare them.
                var optionsComparison = Utils.prepareObjectsForComparison(this.modalOptions.cookieCategories, this.getCookiesOptions());

                // Check if the options in localStorage and the options from the constructor are the same
                if (Utils.objectEquals(optionsComparison.A, optionsComparison.B)) {
                    // If the options are the same, just inject the scripts
                    this.modalOptions.cookieCategories = this.getCookiesOptions();
                    this.injectScripts();
                } else {
                    // If the options are different, set the configChanged to true
                    // We are in the constructor. By setting this to true, it might show the banner and modal if the user has set askOnChange to true
                    this.configChanged = true;
                }
            }

            // Generate modal
            if (options.modalOptions != null) {
                this.createModal(options.modalOptions);
            }


            if (options.bannerOptions != null) {
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
        //this.setCookie();
        this.saveCookieOptions();
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

    private injectGTM(gtmCode: string) {
        try {
            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js',
                });
                const f = d.getElementsByTagName(s)[0];
                const j = d.createElement(s) as HTMLInputElement;
                const
                    dl = l != 'dataLayer' ? `&l=${l}` : '';
                //j.async = true;
                j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
                f.parentNode!.insertBefore(j, f);
            }(window, document, 'script', 'dataLayer', gtmCode));
            (window as any).dataLayer = (window as any).dataLayer || [];
        } catch (error) {
            console.log("There was an error loading GTM.")
        }
    }

    public init(banner: boolean, modal: boolean) {
        if (this.modalOptions.askOnce) {
            // TODO ver casuística si askOnChange es false, configChanged es true, se inyectan los scripts? No se intectan si no se muestran los banners Debería haber un else?
            if (localStorage.getItem("cookiesManagerOptions") == null || (this.modalOptions.askOnChange && this.configChanged)) {
                var bannerShown = false;
                var modalShown = false;
                if (banner) {
                    this.showBanner();
                    bannerShown = true;
                }
                if (modal) {
                    this.showModal();
                    modalShown = true;
                }
                // if(!bannerShown && !modalShown && this.configChanged == true && !this.modalOptions.askOnChange){
                //     this.injectScripts();
                // }
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
                    if (script.type == ScriptType.STANDARD || script.type == null) {
                        this.injectScript(script.scriptSrc, script.async)
                    } else {
                        this.injectGTM(script.gtmCode);
                    }
                });
            }
        });
    }

    saveButton() {
        //this.setCookie();
        this.saveCookieOptions();
    }

    saveCookieOptions() {
        const base64Options = Utils.encode(JSON.stringify(this.modalOptions.cookieCategories));
        localStorage.setItem("cookiesManagerOptions", base64Options);
    }

    getCookiesOptions(): any {
        return JSON.parse(Utils.decode(localStorage.getItem("cookiesManagerOptions")));
    }

    private getDefaults(): Options {
        return {
            askOnce: true,
            askOnChange: true,
            modalOptions: {
                acceptAllButton: {
                    text: 'Accept all',
                    show: true,
                },
                saveButton: {
                    text: 'Settings',
                    show: true,
                },
                closeButton: {
                    text: 'Settings',
                    show: true,
                },
            },
            bannerOptions: {
                wall: true,
                wallScroll: false,
                wallBlur: true,
                bannerText: 'This website uses cookies to ensure you get the best experience on our website.',
                acceptAllButton: {
                    text: 'Accept all',
                    show: true,
                },
                settingsButton: {
                    text: 'Settings',
                    show: true,
                },
                acceptRequiredOnlyButton: {
                    text: 'Configuración',
                    show: false,
                },
                rejectAllButton: {
                    text: 'Configuración',
                    show: false,
                }
            },
            cookieCategories: [],
        }
    }



}

export interface Options {
    cookieCategories: Array<CookieCategory>,
    bannerOptions: BannerOptions,
    modalOptions: ModalOptions,
    askOnce: boolean,
    askOnChange: boolean,
}

export interface CookieCategory {
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

export enum ScriptType {
    GTM,
    STANDARD
}