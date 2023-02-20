import { CookiesManager } from './CookiesManager';
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
    }


    async show() {
        try {
            const modal = document.querySelector(".c-cookies-config-modal");
            modal!.classList.add("show-modal");
            await new Promise(r => setTimeout(r, 10)); // This is to make the show animation work
            const modalContainer = document.getElementById("modal-container");
            modalContainer!.classList.add('show-modal');
            // Hide body scroll
            document.querySelector("body")!.style.overflow = "hidden";
        } catch (error) {
            console.error("Could not show cookie modal.")
            console.error(error)
        }
    }
    hide() {
        const modalContainer = document.getElementById('modal-container')
        modalContainer!.classList.remove('show-modal')

    }

    setEventListeners() {

        try {
            var self = this;
            // Modal close button
            const closeBtn = document.querySelectorAll('.close-modal')
            closeBtn.forEach(c => c.addEventListener('click', this.hide))

            // Accept all button
            const acceptAllBtn = document.querySelector('.cm-modal-accept-all')!;
            acceptAllBtn.addEventListener('click', function () {
                self.cookiesManager.acceptAllButton();
            });

            // Save button
            const saveButton = document.querySelector('.cm-modal-save')!;
            saveButton.addEventListener('click', function () {
                self.cookiesManager.injectScripts();
                self.cookiesManager.hideBanner();
                self.cookiesManager.saveButton();
            });

            // Switches
            this.cookiesManager.getOptions().cookieCategories.forEach((category, index) => {
                var checkbox = document.querySelector(`.cm-switch-${index}`)!;
                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        category.checked = true;
                    } else {
                        category.checked = false;
                    }
                });
            });
        } catch (error) {
            console.error("Could not set event listeners for cookie modal.")
        }
    }

    public injectModal() {
        try {
            if (document.querySelector("body") != null) {
                document.querySelector("body")!.insertAdjacentHTML("afterend", this.generateModal());
            }
        } catch (error) {
            console.error("Could not inject cookie modal.")
        }
    }

    private generateCategoriesBlocks() {
        let categoriesBlocks = "";
        this.cookiesManager.getOptions().cookieCategories.forEach((element, index) => {
            const disabled = element.required ? "disabled" : "";
            const checked = element.required ? "checked" : "";
            const block = `
            <div class="cookie-category">
                <div class="cookie-category__header header">
                    <h2 class="header__title">
                        ${element.title}
                    </h2>
                    <div class="header__switch">
                    <label class="switch ${disabled}">
                        <input ${disabled} checked class="cm-switch-${index}" type="checkbox">
                        <span class="slider round ${disabled}"></span>
                    </label>
                    </div>
                </div>
            <div class="cookie-category__body body">
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
        return this.options.acceptAllButton.show ? `<button class="modal__button modal__button-width cm-modal-accept-all modal__button-accept-all">${this.options.acceptAllButton.text}</button>` : "";
    }
    getSaveButton() {
        return this.options.saveButton.show ? ` <button class="modal__button-link close-modal cm-modal-save modal__button-save-btn"> ${this.options.saveButton.text} </button>` : "";
    }

    generateModal() {
        return `
        <div class="c-cookies-config-modal">
        <div class="modal__container" id="modal-container">
          <div class="modal__content">
            ${this.getCloseButton()}
            <h1 class="modal__title">${this.options.title}</h1>
            <p class="modal__description">${this.options.description}</p>
            <div class="modal__cookie-categories">
                ${this.generateCategoriesBlocks()}
            </div>
    
            <div class="modal__footer">
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
    acceptAllButton: {
        text: string,
        show: boolean,
    },
    saveButton: {
        text: string,
        show: boolean,
    },
    closeButton: {
        text: string,
        show: boolean,
    },
}