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
        // Close modal
        const closeBtn = document.querySelectorAll('.close-modal')
        closeBtn.forEach(c => c.addEventListener('click', this.hide))

        // Accept all btn
        // Estos listeners deberían settearse en CookiesManager probablemente, porque va a haber que llamar métodos de ahí. O eso o Modal debería tener la instancia de CookiesManager.
        const acceptAllBtn = document.querySelectorAll('.modal__button-accept-all')

        acceptAllBtn.forEach(function (item) {
            item.addEventListener('click', function () {
                self.cookiesManager.acceptAllButton();
            });
        });

        // Save button
        const saveButton = document.querySelectorAll('.modal__button-save-btn')

        saveButton.forEach(function (item) {
            item.addEventListener('click', function () {
               self.cookiesManager.injectScripts();
                self.cookiesManager.hideBanner();
                self.cookiesManager.saveButton();
            });
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
            `
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
              <img class="close-modal-img" src="images/content/close.svg" alt="Webpack 5 Template Boilerplate">
            </div>
    
            <img src="assets/img/star-trophy.png" alt="" class="modal__img">
    
            <h1 class="modal__title">Configuración de cookies</h1>
            <p class="modal__description">Configura aquí tus cookies.</p>
            <div class="modal__cookie-categories">
                ${this.generateCategoriesBlocks()}
            </div>
    
            <div class="modal__footer">
              <button class="modal__button modal__button-width modal__button-accept-all">
                Aceptar todas
              </button>
    
              <button class="modal__button-link close-modal modal__button-save-btn">
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