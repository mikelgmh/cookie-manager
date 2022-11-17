import { CookiesManager } from './CookiesManager';
export class Modal {

    private options: ModalOptions;
    private cookiesManager: CookiesManager;

    constructor(cookiesManager: CookiesManager, options: ModalOptions) {
        this.cookiesManager = cookiesManager;
        this.options = options;
        this.injectModal();
        this.setEventListeners();
    }


    show() {
        const modalContainer = document.getElementById("modal-container");
        modalContainer!.classList.add('show-modal');
        // Hide body scroll
        document.querySelector("body")!.style.overflow = "hidden";
    }
    hide() {
        const modalContainer = document.getElementById('modal-container')
        modalContainer!.classList.remove('show-modal')

    }

    setEventListeners() {

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
    }

    public injectModal() {
        if (document.querySelector("body") != null) {
            document.querySelector("body")!.insertAdjacentHTML("afterend", this.generateModal());
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
                        <span class="slider round"></span>
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

    generateModal() {
        return `
        <div class="c-cookies-config-modal">
        <div class="modal__container" id="modal-container">
          <div class="modal__content">
            <div class="modal__close close-modal" title="Close">
                <div class="close-modal-img"></div>
            </div>
        
            <h1 class="modal__title">Configuración de cookies</h1>
            <p class="modal__description">Configura aquí tus cookies.</p>
            <div class="modal__cookie-categories">
                ${this.generateCategoriesBlocks()}
            </div>
    
            <div class="modal__footer">
              <button class="modal__button modal__button-width cm-modal-accept-all modal__button-accept-all">
                Aceptar todas
              </button>
    
              <button class="modal__button-link close-modal cm-modal-save modal__button-save-btn">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
        `;
    }

}

export interface ModalOptions {
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