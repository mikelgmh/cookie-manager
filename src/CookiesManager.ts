
import { Banner, BannerOptions } from "./Banner";
import { ModalOptions, Modal } from './Modal';
import "./scss/styles.scss";
import { Utils } from './utils';

interface cookieCatergoryCallbackInterface {
    (CookieCategory: CookieCategory): void;
}
export class CookiesManager {

    // var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
    private modalOptions: Options;
    private banner: Banner;
    private modal: Modal;
    private acceptAll: boolean = false;
    private configChanged: boolean = false;
    private onCookieCategoryChange: cookieCatergoryCallbackInterface;


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

    public on(listener, callback: cookieCatergoryCallbackInterface) {
        if (listener == "onCookieCategoryChange") {
            this.onCookieCategoryChange = callback;
        }
    }

    constructor(options: Options) {
        if (options == null) {
            throw new Error("Options for CookiesManager cannot be null.");
        } else {
            if (options.cookieCategories == null) {
                throw new Error("You should provide at least one cookie category");
            }
            // Set all cookie categories as checked by default. Set default value for cookie category
            const mergedCategories = new Array<CookieCategory>;
            options.cookieCategories.forEach(category => {
                //category.checked = true; // Dont set checked to true. Set checked if checked was set
                mergedCategories.push(Utils.mergeRecursively(this.getDefaultCookieCategoryOptions(), category));
            });
            options.cookieCategories = mergedCategories;
            // Merge the default options with user options
            const clonedCategories: CookieCategory[] = options.cookieCategories;
            options = Utils.mergeRecursively(this.getDefaultOptions(), options);
            this.modalOptions = options;
            this.constructorInitializationFunction(options, clonedCategories);
        }
    }

    private constructorInitializationFunction(options, clonedCategories: CookieCategory[]) {
        if (localStorage.getItem("cookiesManagerOptions") != null) { // If there's already configuration saved
            // Prepare the options to compare them.
            // @audit be careful, this function is comparing two strings. The callback functions are being removed, so we need to set them below.
            var optionsComparison = Utils.prepareObjectsForComparison(this.modalOptions.cookieCategories, this.getCookiesOptions());
            // Check if the options in localStorage and the options from the constructor are the same
            if (Utils.objectEquals(optionsComparison.A, optionsComparison.B)) {
                // If the options are the same, just inject the scripts
                this.modalOptions.cookieCategories = this.getCookiesOptions();
                // @audit-ok We need to set the categories events again, as the callback functions were removed.
                this.modalOptions.cookieCategories.forEach((cookieCategory, index) => {
                    cookieCategory.events = clonedCategories[index].events;
                });

            } else {
                localStorage.removeItem("cookiesManagerOptions");
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

    public setEventListeners() {
        this.modal.setEventListeners();
        this.banner.setEventListeners();
    }

    public createBanner(options: BannerOptions) {
        this.banner = new Banner(this, options);
        return this.banner;
    }
    public createModal(options: ModalOptions) {
        this.modal = new Modal(this, options);
        return this.modal;
    }

    public setCookies(): void {
        this.modalOptions.cookieCategories.forEach(category => {
            category.events.setCookiesOnChange.forEach(cookie => {
                let cookieValue;
                if (category.checked) {
                    cookieValue = cookie.valueOnAccept;
                    this.setCookie(cookie.cookieName, cookieValue, cookie.expirationDays, "/");
                } else {
                    cookieValue = cookie.valueOnReject;
                    if (this.getOptions().askAgainIfRejectedAfterDays != -1) {
                        this.setCookie(cookie.cookieName, cookieValue, this.getOptions().askAgainIfRejectedAfterDays, "/");
                    } else {
                        this.setCookie(cookie.cookieName, cookieValue, cookie.expirationDays, "/");
                    }
                }

            })
        });
    }

    public setCookie(cookieName: string, cookieValue: string, expDays = 400, path = '/') {
        try {
            document.cookie = cookieName + '=' + encodeURIComponent(cookieValue) + '; max-age=' + (3600 * (24 * expDays)) + '; path=' + path
        } catch (error) {
            console.error(`Error setting cookie: ${error}`)
        }
    }

    public getCookie(cookieName) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [key, value] = el.split('=');
            cookie[key.trim()] = value;
        })
        return cookie[cookieName];
    }

    public acceptAllButton(acceptedAll = true) {
        this.getOptions().cookieCategories.forEach((cookieCategory: CookieCategory) => {
            if (cookieCategory.required && acceptedAll == false) {
                cookieCategory.checked = true;
            } else {
                cookieCategory.checked = acceptedAll;
            }
        })
        this.modal.updateSwitchesStatus();
        this.acceptAll = true;
        this.modal.hide();
        this.banner.hide();
        this.injectScripts();
        this.saveCookieOptions();
        this.setCookies();
        this.callIndividualCallbacks();
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

    public callIndividualCallbacks() {
        this.modalOptions.cookieCategories.forEach(category => {
            if (category.checked || this.acceptAll) {
                category.events.onAccept();
            } else if (!category.checked) {
                category.events.onReject();
            }
        });
    }

    private injectScript(src: string, async = false) {
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
            console.error("Couldn't inject GTM.")
        }
    }

    public async init(banner: boolean, modal: boolean) {
        if (this.modalOptions.askOnce) {
            if (localStorage.getItem("cookiesManagerOptions") == null || this.configChanged) {
                await this.initShow(banner, modal)
            } else {
                let initDone = false;
                const cookieOptions: CookieCategory[] = this.getCookiesOptions(); // Cookie options from localStorage
                // Check for the cookies
                for (let [categoryIndex, category] of this.modalOptions.cookieCategories.entries()) {
                    if (initDone) break;
                    for (let [cookieObjectIndex, cookieObject] of category.events.setCookiesOnChange.entries()) {

                        // If the cookie exists
                        if (this.getCookie(cookieObject.cookieName)) {
                            // If the cookie has different values than the set ones, ask again
                            if (![cookieObject.valueOnAccept.toString(), cookieObject.valueOnReject.toString()].includes(this.getCookie(cookieObject.cookieName))) {
                                this.initShow(banner, modal);
                                initDone = true;
                                break;
                            } else {
                                // Los valores son correctos. Comprobar si el usuario ha cambiado la cookie desde devTools
                                // Probablemente haya que meter esto en try catch
                                if (category.checked) {
                                    const savedLocalStorageCookieValue = cookieOptions[categoryIndex].events.setCookiesOnChange[cookieObjectIndex].valueOnAccept; // Valor de la cookie en localstorage
                                    const realCookieValue = this.getCookie(cookieOptions[categoryIndex].events.setCookiesOnChange[cookieObjectIndex].cookieName)
                                    if (savedLocalStorageCookieValue.toString() != realCookieValue) {
                                        this.initShow(banner, modal);
                                        break;
                                    }
                                }

                            }
                        } else {
                            this.initShow(banner, modal)
                            initDone = true;
                            break;
                        }
                    }
                }
            }
        } else {
            await this.initShow(banner, modal)
        }
        if (localStorage.getItem("cookiesManagerOptions") != null) {
            this.injectScripts();
            this.callIndividualCallbacks();
        }
    }

    public async initShow(banner: boolean, modal: boolean) {
        if (this.modalOptions.delay > 0) {
            await new Promise(r => setTimeout(r, this.modalOptions.delay)); // This is to make the show animation work
        }
        if (banner) {
            this.showBanner();
        }
        if (modal) {
            this.showModal();
        }
    }

    public injectScripts() {
        try {

            this.modalOptions.cookieCategories.forEach(category => {
                if (this.onCookieCategoryChange != null) {
                    this.onCookieCategoryChange(category);
                }
                if (category.checked || this.acceptAll) {
                    category.scripts.forEach(script => {
                        if (script["type"] == ScriptType.STANDARD || script["type"] == null) {
                            if (script["scriptSrc"] != null) {
                                this.injectScript(script["scriptSrc"], script["async"])
                            }
                        } else {
                            if (script["gtmCode"] != null) {
                                this.injectGTM(script["gtmCode"]);
                            } else {
                                throw new Error("You should provide a gtmCode for the script");
                            }
                        }
                    });
                }
            });
        } catch (error) {
            console.error(`Couldn't inject scripts: ${error}`)
        }
    }

    saveButton() {
        this.saveCookieOptions();
        this.setCookies();
        this.callIndividualCallbacks();
    }

    saveCookieOptions() {
        const base64Options = Utils.encode(JSON.stringify(this.modalOptions.cookieCategories));
        localStorage.setItem("cookiesManagerOptions", base64Options);
    }

    getCookiesOptions(): any {
        if (localStorage.getItem("cookiesManagerOptions") != null) {
            return JSON.parse(Utils.decode(localStorage.getItem("cookiesManagerOptions")));
        }
        return {};
    }

    private getDefaultCookieCategoryOptions(): CookieCategory {
        return {
            title: "Cookie Category Example",
            description: "Cookie category description",
            required: false,
            id: "",
            checked: true,
            events: {
                onAccept: () => { },
                onReject: () => { },
                setCookiesOnChange: []
            },
            accordion: {
                enable: false,
                enableOnDescriptionLength: 45,
                active: false,
            },
            boxedHeader: false,
            boxedBody: false,
            scripts: []
        }
    }

    private getDefaultOptions(): Options {
        return {
            askOnce: true,
            askAgainIfRejectedAfterDays: -1,
            delay: 0,
            askOnChange: true,
            initOnDomContentLoaded: true,
            modalOptions: {
                title: "Cookie settings",
                description: "Change the settings for the cookies here.",
                inject: true,
                showModalClass: "show-modal",
                acceptAllButton: {
                    text: 'Accept all',
                    show: true,
                    onClick: () => { },
                },
                rejectAllButton: {
                    text: 'Reject all',
                    show: true,
                    onClick: () => { },
                },
                saveButton: {
                    text: 'Save',
                    show: true,
                    onClick: () => { },
                },
                closeButton: {
                    text: 'Close',
                    show: true,
                    onClick: () => { },
                },
            },
            bannerOptions: {
                inject: true,
                injectWall: true,
                wall: true,
                wallScroll: true,
                wallBlur: false,
                bannerText: 'This website uses cookies to ensure you get the best experience on our website.',
                acceptAllButton: {
                    text: 'Accept all',
                    show: true,
                    onClick: () => { },
                },
                settingsButton: {
                    text: 'Settings',
                    show: true,
                    onClick: () => { },
                },
                acceptRequiredOnlyButton: {
                    text: 'Configuración',
                    show: false,
                    onClick: () => { },
                },
                rejectAllButton: {
                    text: 'Rechazar todo',
                    show: true,
                    onClick: () => { },
                }
            },
            cookieCategories: [],
        }
    }



}
export interface Events {
    onAccept: Function,
    onReject: Function,
    setCookiesOnChange: Array<CookieObject>,
}

export interface CookieObject {
    cookieName: string,
    valueOnAccept: string | number,
    valueOnReject: string | number,
    expirationDays: number,
}

export interface Options {
    cookieCategories: Array<CookieCategory>,
    initOnDomContentLoaded: boolean,
    askAgainIfRejectedAfterDays: number,
    bannerOptions: BannerOptions,
    modalOptions: ModalOptions,
    askOnce: boolean,
    askOnChange: boolean,
    delay: number,
}

export interface CookieCategory {
    title: string,
    id: string,
    description: string,
    required: boolean,
    checked: boolean,
    events: Events,
    accordion: Accordion,
    boxedHeader: boolean,
    boxedBody: boolean,
    scripts: [
        {
            type: ScriptType,
            gtmCode: string,
            scriptSrc: string,
            async: boolean,
        }
    ] | []
}

export interface Accordion {
    enable: boolean,
    enableOnDescriptionLength: number,
    active: boolean,
}

export enum ScriptType {
    GTM,
    STANDARD
}