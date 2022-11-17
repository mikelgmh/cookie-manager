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
        this.setEventListeners();
    }

    public setEventListeners() {
        let self = this;
        // Accept all button
        document.querySelector(".cm-banner-accept-all-btn")!.addEventListener("click", function () {
            self.cookiesManager.acceptAllButton();
        });

        // Config button
        document.querySelector(".cm-banner-config-btn")!.addEventListener("click", function () {
            self.cookiesManager.showModal();
        });

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

    public injectBanner() {
        if (document.querySelector("body") != null) {
            document.querySelector("body")!.insertAdjacentHTML("afterend", this.generateWall());
            document.querySelector("body")!.insertAdjacentHTML("afterend", this.generateBanner());
        }
    }

    private generateWall(){
        const blur = this.options.wallBlur ? "c-cookies-config-wall--blurred" : "";
        return `<div class="c-cookies-config-wall ${blur}"></div>`;
    }

    public showWall() {
        document.querySelector<HTMLElement>(".c-cookies-config-wall")!.classList.add("wall-show");
    }

    public hideWall() {
        document.querySelector<HTMLElement>(".c-cookies-config-wall")!.classList.remove("wall-show");
    }

    public hideScroll() {
        document.querySelector("body")!.style.overflow = "hidden";
    }

    public showScroll() {
        document.querySelector("body")!.style.overflow = "auto";
    }

    public show() {
        //document.querySelector<HTMLElement>(".c-cookies-config-banner")!.style("display", "blockxº");
        if (this.options.wall) {
            this.showWall();
        }
        if (!this.options.wallScroll) {
            this.hideScroll();
        }
        document.querySelector<HTMLElement>(".c-cookies-config-banner .banner-container")!.classList.add("show-banner");
    }
    public hide() {
        document.querySelector<HTMLElement>(".c-cookies-config-banner")!.style.display = "none";
        this.hideWall();
        this.showScroll();
        // document.querySelector(".c-cookies-config-banner")!.style("display", "none");
        // Array.from(document.querySelector(".c-cookies-config-banner") as unknown as HTMLCollectionOf<HTMLElement>);
    }

}




export interface BannerOptions {
    bannerText: string;
    wall: boolean,
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
