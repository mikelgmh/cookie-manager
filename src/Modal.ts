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
              <svg class="close-modal-img" enable-background="new 0 0 26 26" version="1.1" viewBox="0 0 26 26" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25   C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0   L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467   L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468   c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467   C19.033,16.725,19.033,17.138,18.78,17.394z" fill="#030104"/>
              </svg>
            </div>
        
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