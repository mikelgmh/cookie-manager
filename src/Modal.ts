import { CookieCategory, CookiesManager } from './CookiesManager';
export class Modal {

    private options: ModalOptions;
    private cookiesManager: CookiesManager;

    constructor(cookiesManager: CookiesManager, options: ModalOptions) {
        this.cookiesManager = cookiesManager;
        this.options = options;
        if (cookiesManager.getOptions().modalOptions.inject) {
            this.injectModal();
        }
        this.setEventListeners();
        this.updateSwitchesStatus();
    }


    async show() {
        try {

            const modal = document.querySelector(".c-cookies-config-modal");
            modal!.classList.add(this.options.showModalClass);
            await new Promise(r => setTimeout(r, 10)); // This is to make the show animation work
            // Toggle accordions after showing modal
            var acc = document.getElementsByClassName("cm-accordion");
            var i;
            var self = this;
            for (i = 0; i < acc.length; i++) {
                if (acc[i].classList.contains("cm-active-on-load")) {
                    acc[i].classList.remove("cm-active-on-load");
                    await new Promise(r => setTimeout(r, 100)); // This is to make the show animation work
                    self.toggleAccordion(acc[i]);
                }
            }

            const modalContainer = document.getElementById("modal-container");
            modalContainer!.classList.add(this.options.showModalClass);
            // Hide body scroll
            this.cookiesManager.getBanner().hideScroll();
        } catch (error) {
            console.error("Could not show cookie modal.")
            console.error(error)
        }
    }
    hide(self?: Modal) { // Destucted object, so we can access this context
        const modalContainer = document.getElementById('modal-container');
        modalContainer!.classList.remove(this.options.showModalClass);

        // If banner is not shown, show scroll
        const bannerContainer = document.querySelector(".c-cookies-config-banner .banner-container");
        if (bannerContainer?.classList.contains("show-banner") == false) {
            this.cookiesManager.getBanner().showScroll();
        } else {
            // If the banner is shown, check if the scroll was active. If it was, show the scroll on modal close.
            const wallScroll = this.cookiesManager.getOptions().bannerOptions.wallScroll;
            if (wallScroll) {
                this.cookiesManager.getBanner().showScroll();
            }
        }
    }

    setEventListeners() {

        try {
            var self = this;
            // Modal close button
            const closeBtn = document.querySelectorAll('.close-modal')
            closeBtn.forEach(c => c.addEventListener('click', () => {
                this.hide(self);
            }))

            // Accept all button
            const acceptAllButton = document.querySelector('.cm-modal-accept-all')!;
            if (acceptAllButton) {
                acceptAllButton.addEventListener('click', function () {
                    self.cookiesManager.acceptAllButton();
                    self.cookiesManager.getOptions().modalOptions.acceptAllButton.onClick();
                });
            }

            // Reject all button
            const rejectAllButton = document.querySelector('.cm-modal-reject-all')!;
            if (rejectAllButton) {
                rejectAllButton.addEventListener('click', function () {
                    self.cookiesManager.acceptAllButton(false);
                    self.cookiesManager.getOptions().modalOptions.rejectAllButton.onClick();
                });
            }

            // Save button
            const saveButton = document.querySelector('.cm-modal-save')!;
            if (saveButton) {
                saveButton.addEventListener('click', function () {
                    self.cookiesManager.injectScripts();
                    self.cookiesManager.hideBanner();
                    self.cookiesManager.saveButton();
                    self.cookiesManager.callIndividualCallbacks();
                    self.cookiesManager.getOptions().modalOptions.saveButton.onClick();
                });
            }

            // Switches
            this.cookiesManager.getOptions().cookieCategories.forEach((category: CookieCategory, index) => {
                var checkbox = document.querySelector(`.cm-switch-${index}`)!;
                const cookieCategoryElements = document.querySelectorAll(".c-cookies-config-modal .cookie-category");
                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        category.checked = true;
                        self.toggleSwitch(index, true);
                    } else {
                        category.checked = false;
                        self.toggleSwitch(index, false);
                    }
                });
            });

            // Set accordion toggle on click
            var acc = document.getElementsByClassName("cm-accordion");
            var i;
            var self = this;
            for (i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function () {
                    self.toggleAccordion(this);
                });
            }


        } catch (error) {
            console.error("Could not set event listeners for cookie modal.")
        }
    }

    private updateSwitchDisabledStatus(toggleIndex: number, required: boolean) {
        try {
            const cookieCategoryElements = document.querySelectorAll(".c-cookies-config-modal .cookie-category");
            const checkboxInput = cookieCategoryElements[toggleIndex].querySelector<HTMLInputElement>(`.cm-switch-${toggleIndex}`)!;
            const checkboxSpan = cookieCategoryElements[toggleIndex].querySelector<HTMLInputElement>(`.slider`)!;
            const checkboxLabel = cookieCategoryElements[toggleIndex].querySelector<HTMLInputElement>(`label.switch`)!;
            if (required) {
                checkboxInput.setAttribute("disabled", "")
                checkboxSpan.classList.add("disabled");
                checkboxLabel.classList.add("disabled");
            } else {
                checkboxInput.removeAttribute("disabled");
                checkboxSpan.classList.remove("disabled");
                checkboxLabel.classList.remove("disabled");
            }
        } catch (error) {
            console.error(`Could not change the disabled status from switch cm-switch-${toggleIndex}. Do you have equal switches and cookieCategories? If cm-switch-${toggleIndex} does not exist in your DOM, probably not.`)

        }
    }

    private toggleSwitch(toggleIndex: number, checked: boolean) {
        try {
            const cookieCategoryElements = document.querySelectorAll(".c-cookies-config-modal .cookie-category");
            const checkboxInput = cookieCategoryElements[toggleIndex].querySelector<HTMLInputElement>(`.cm-switch-${toggleIndex}`)!;
            if (!checked) {
                checkboxInput.removeAttribute("checked");
            } else {
                checkboxInput.setAttribute("checked", "")
            }
            checkboxInput.checked = checked;
        } catch (error) {
            console.error(`Could not toggle the switch cm-switch-${toggleIndex}. Do you have equal switches and cookieCategories? If cm-switch-${toggleIndex} does not exist in your DOM, probably not.`)
        }
    }

    private async toggleAccordion(element) {
        element.classList.toggle("cm-active");
        var panel = element.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }

    public injectModal() {
        try {
            if (document.querySelector("body") != null) {
                document.querySelector("body")!.insertAdjacentHTML("afterend", this.generateModal());
            }
        } catch (error) {
            console.error("Could not inject cookie modal.");
        }
    }

    // If we're not injecting the HTML, we need to update the HTML manually after the page is loaded.
    public updateSwitchesStatus() {
        //const cookieCategoryElements = document.querySelectorAll(".c-cookies-config-modal .cookie-category");
        let cookieCategories = this.cookiesManager.getOptions().cookieCategories;
        cookieCategories.forEach((cookieCategory, index) => {
            try {
                this.toggleSwitch(index, cookieCategory.checked)
                this.updateSwitchDisabledStatus(index, cookieCategory.required)
            } catch (error) {
                console.error("You have more cookieCategories defined in javascript than in your HTML. Please, use the same number of cookieCategories.")
            }
        });
    }

    private generateCategoriesBlocks() {
        let categoriesBlocks = "";
        let cookieCategories = this.cookiesManager.getOptions().cookieCategories;
        if (localStorage.getItem("cookiesManagerOptions") != null) {
            cookieCategories = this.cookiesManager.getCookiesOptions();
        }
        cookieCategories.forEach((element, index) => {
            const disabled = element.required ? "disabled" : "";
            const checked = element.checked ? "checked" : "";
            const accordionClass = element.accordion.enable ? "cm-accordion" : "";
            const accordionPanel = element.accordion.enable ? "cm-panel" : "";
            const activeAccordion = element.accordion.active ? "cm-active-on-load" : "";
            const accordionChevron = element.accordion.enable ? "<div class='cc-header__left'></div>" : "";
            const boxedHeader = element.boxedHeader ? "cm-boxed" : "";
            const boxedBody = element.boxedBody ? "cookie-category__body--boxed" : "";
            // const boxedHeaderMArgin = element.accordion.active ? "" : "no-chevron";
            const block = `
            <div class="cookie-category">
                <div class="cookie-category__header cc-header ${accordionClass} ${boxedHeader} ${activeAccordion}">
                    ${accordionChevron}
                    <div class="cc-header__right">
                        <div class="header__title">
                            ${element.title}
                        </div>
                        <div class="header__switch">
                            <label class="switch ${disabled}">
                                <input ${disabled} ${checked} class="cm-switch-${index}" type="checkbox">
                                <span class="slider round ${disabled}"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="cookie-category__body body ${boxedBody} ${accordionPanel}">
                    <p>${element.description}</p>
                </div>
            </div>
            `;
            categoriesBlocks += block;
        });
        return categoriesBlocks;

    }

    getCloseButton() {
        return this.options.closeButton.show ? `<div class="modal__close close-modal" title="Close"><div class="close-modal-img"></div></div>` : "";
    }
    getAcceptAllButton() {
        return this.options.acceptAllButton.show ? `<button class="modal__button modal__button-width cm-modal-accept-all footer__button-accept-all">${this.options.acceptAllButton.text}</button>` : "";
    }
    getRejectAllButton() {
        return this.options.rejectAllButton.show ? `<button class="modal__button modal__button-width cm-modal-reject-all footer__button-reject-all">${this.options.rejectAllButton.text}</button>` : "";
    }
    getSaveButton() {
        return this.options.saveButton.show ? ` <button class="modal__button-link close-modal cm-modal-save footer__button-save-btn"> ${this.options.saveButton.text} </button>` : "";
    }

    generateModal() {
        return `
        <div class="c-cookies-config-modal">
        <div class="modal__container" id="modal-container">
          <div class="modal__content">
            ${this.getCloseButton()}
            <div class="modal__title">${this.options.title}</div>
            <p class="modal__description">${this.options.description}</p>
            <div class="modal__cookie-categories">
                ${this.generateCategoriesBlocks()}
            </div>
    
            <div class="modal__footer">
             ${this.getRejectAllButton()}
             ${this.getAcceptAllButton()}
             ${this.getSaveButton()}
            </div>
          </div>
        </div>
      </div>
        `;
    }

}

export interface ModalOptions {
    inject: boolean,
    title: string,
    description: string,
    showModalClass: string,
    acceptAllButton: {
        text: string,
        show: boolean,
        onClick: Function,
    },
    rejectAllButton: {
        show: boolean,
        text: string,
        onClick: Function,
    },
    saveButton: {
        text: string,
        show: boolean,
        onClick: Function,
    },
    closeButton: {
        text: string,
        show: boolean,
        onClick: Function,
    },
}