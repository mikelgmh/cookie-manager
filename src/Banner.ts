import { Modal } from "./Modal";
import { Utils } from './utils';
import { CookiesManager } from './CookiesManager';

export class Banner {
    private options: BannerOptions;
    private banner: string;
    private cookiesManager: CookiesManager;

    constructor(cookiesManager: CookiesManager, options: BannerOptions) {
        this.cookiesManager = cookiesManager;
        this.options = options;
        if (cookiesManager.getOptions().bannerOptions.inject) {
            this.injectBanner();
        }
        if (cookiesManager.getOptions().bannerOptions.injectWall) {
            this.injectWall();
        }
        this.setEventListeners();
    }

    public setEventListeners() {
        try {
            let self = this;
            // Accept all button
            document.querySelector(".cm-banner-accept-all-btn")!.addEventListener("click", function () {
                self.cookiesManager.acceptAllButton();
            });

            // Config button
            document.querySelector(".cm-banner-config-btn")!.addEventListener("click", function () {
                self.cookiesManager.showModal();
            });
        } catch (error) {
            console.error("Can't set the event listener for the cookies banner. Can't find the HTML elements.")
        }

    }




    private generateBanner() {
        return `
                <div class="c-cookies-config-banner">
                    <div class="banner-container">
                        ${this.getBannerText()}
                        <div class="banner-container__buttons">
                            ${this.getAcceptAllButton()}
                            ${this.getSettingsButton()}
                        </div>
                    </div>
                </div> 
                `;
    }

    getAcceptAllButton() {
        return this.options.acceptAllButton.show ? `<button class="banner-container__button banner-container__accept-all-btn cm-banner-accept-all-btn">${this.options.acceptAllButton.text}</button>` : "";
    }
    getSettingsButton() {
        return this.options.settingsButton.show ? `<button class="banner-container__button-link banner-container__config-btn cm-banner-config-btn">${this.options.settingsButton.text}</button>` : "";
    }

    private getBannerText() {
        return Utils.wrapString(this.options.bannerText, "p");
    }

    private injectWall() {
        try {
            if (document.querySelector("body") != null) {
                document.querySelector("body")!.insertAdjacentHTML("afterend", this.generateWall());
            }
        } catch (error) {
            console.error("Couldn't inject the wall.");
        }
    }

    public injectBanner() {
        try {
            if (document.querySelector("body") != null) {
                document.querySelector("body")!.insertAdjacentHTML("afterend", this.generateBanner());
            }
        } catch (error) {
            console.error("Couldn't inject the banner.");
        }
    }

    private generateWall() {
        const blur = this.options.wallBlur ? "c-cookies-config-wall--blurred" : "";
        return `<div class="c-cookies-config-wall ${blur}"></div>`;
    }

    public showWall() {
        try {
            document.querySelector<HTMLElement>(".c-cookies-config-wall")!.classList.add("wall-show");
        } catch (error) {
            console.error("Couldn't apply the background wall.")
        }
    }

    public hideWall() {
        try {
            document.querySelector<HTMLElement>(".c-cookies-config-wall")!.classList.remove("wall-show");
        } catch (error) {
            console.error("Unable to hide the background wall.")
        }
    }

    public hideScroll() {
        try {
            document.querySelector("body")!.style.overflow = "hidden";
            document.querySelector("html")!.style.overflow = "hidden";
        } catch (error) {
            console.error("Unable to hide the scroll.")
        }
    }

    public showScroll() {
        try {
            document.querySelector("body")!.style.overflow = "auto";
            document.querySelector("html")!.style.overflow = "auto";
        } catch (error) {
            console.error("Unable to show the scroll.")
        }
    }

    public show() {
        if (this.options.wall) {
            this.showWall();
        }
        if (!this.options.wallScroll) {
            this.hideScroll();
        }
        try {
            document.querySelector<HTMLElement>(".c-cookies-config-banner .banner-container")!.classList.add("show-banner");
        } catch (error) {
            console.error("Unable to show the banner.")
        }
    }
    public hide() {
        try {
            document.querySelector<HTMLElement>(".c-cookies-config-banner")!.style.display = "none";
        } catch (error) {
            console.error("Unable to hide the banner.")
        }
        this.hideWall();
        this.showScroll();
    }

}




export interface BannerOptions {
    bannerText: string;
    wall: boolean,
    injectWall: boolean,
    wallScroll: boolean,
    wallBlur: boolean,
    inject: boolean,
    acceptAllButton: {
        text: string,
        show: boolean,
    },
    settingsButton: {
        text: string,
        show: boolean,
    },
    acceptRequiredOnlyButton: {
        text: string,
        show: boolean,
    },
    rejectAllButton: {
        text: string,
        show: boolean,
    },
}
