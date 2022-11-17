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
        this.injectBanner();
        this.setEventListeners();
    }

    private setEventListeners() {
        let self = this;
        // Accept all button
        document.querySelector(".banner-container__accept-all-btn")!.addEventListener("click", function () {
            self.cookiesManager.acceptAllButton();
        });

        // Config button
        document.querySelector(".banner-container__config-btn")!.addEventListener("click", function () {
            //self.options.settingsButton.modal.show();
            self.cookiesManager.showModal();
        });

    }




    private generateBanner() {
        return `
                <div class="c-cookies-config-banner">
            <div class="banner-container">
            ${this.getBannerText()}
            <div class="banner-container__buttons">
                <button class="banner-container__button banner-container__accept-all-btn">${this.getAcceptAllButtonText()}</button>
                <button class="banner-container__button-link banner-container__config-btn">Configurar</button>
            </div>
            </div>
        </div> 
        `;
    }
    private getBannerText() {

        if (this.options.bannerText != undefined) {
            if (Utils.isHTML(this.options.bannerText)) {
                return this.options.bannerText;
            }
            // Else return wrapped
            return Utils.wrapString(this.options.bannerText, "p");
        }
        return `
                <p>Utilizamos cookies propias y de terceros para analizar el tráfico en nuestra web mediante la obtención de los
                        datos necesarios para estudiar tu navegación. Puedes obtener más información en la Política de Cookies. Puedes
                        aceptar todas las cookies pulsando el botón “Aceptar" o configurarlas o rechazar su uso pulsando en
                        "Configurar".</p>
                `;
    }
    private getAcceptAllButtonText() {
        if (this.options.acceptAllButton.text != undefined) {
            // Else return wrapped
            return this.options.acceptAllButton.text;
        }
        return `Aceptar todo`;
    }

    public injectBanner() {
        if (document.querySelector("body") != null) {

            document.querySelector("body")!.insertAdjacentHTML("afterend", this.generateBanner());
        }
    }

    public showWall() {
        const blur = this.options.wallBlur ? "c-cookies-config-wall--blurred" : "";
        const wall = `<div class="c-cookies-config-wall ${blur}"></div>`;
        document.querySelector("body")!.insertAdjacentHTML("afterend", wall);

    }

    public hideWall() {
        const test = document.querySelector<HTMLElement>(".c-cookies-config-wall")!;
        test.style.display = "none";
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
        const test = document.querySelector<HTMLElement>(".c-cookies-config-banner .banner-container")!;
        test.classList.add("show-banner");
    }
    public hide() {
        const test = document.querySelector<HTMLElement>(".c-cookies-config-banner")!;
        test.style.display = "none";
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
