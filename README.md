# cookie-manager
This library allows to inject scripts dynamically according to the cookie preferences chosen in a modal. [GitHub repository](https://github.com/mikelgmh/cookie-manager).


![enter image description here](https://i.imgur.com/hxAJYBE.png)

## Installation

```bash
npm install @mikelgmh/cookie-manager
```

## Get started

```jsx
import { CookiesManager, ScriptType } from '@mikelgmh/cookie-manager';
import '@mikelgmh/cookie-manager/dist/index.css'; // Optional. Default styles.

const cookiesManager = new CookiesManager(options); // Check the options object below
cookiesManager.init(true, false); // The first value shows the banner on load, the second value shows the modal on load

// You can manually open or close both
// OPEN
cookiesManager.showBanner();
cookiesManager.showModal();

// CLOSE
cookiesManager.hideBanner();
cookiesManager.hideModal();
```

## Styling

You can optionally import the **default styles**. 

```jsx
import '@mikelgmh/cookie-manager/dist/index.css'; // Optional. Default styles.
```

If you want to use your own styles you can **customize the default template** by importing [this SCSS file](https://github.com/mikelgmh/cookie-manager/blob/master/src/scss/components/_modal.scss) to your project.

## Options

Here’s an example of the options object. Every option has a default value, so the only required option is the `cookieCategories` array.

```jsx
{
    askOnce: true, // If the user already accepted the cookies, don't ask again on page reload
    askOnChange: true, // Ask again if cookieCategories array is modified. This overrides the askOnce option
    initOnDomContentLoaded: true, // Wait for the dom to load before initializing this library.
    delay: 0, // Sets a timeout to show the banner / modal using the init() method.
    modalOptions: { // Options for the modal
        inject: true, // Inject the HTML of the modal using Javascript. This might cause CSP issues if CSP is on
        title: "Cookie settings",
        description: "Change the settings for your cookies here.",
        acceptAllButton: {
            text: 'Accept all',
            show: true,
        },
        saveButton: {
            text: 'Save',
            show: true,
        },
        closeButton: {
            text: 'Close', // Not implemented yet. This shows the X mark in the modal's corner
            show: true,
        },
    },
    bannerOptions: { // Options for the banner
        inject: true, // Inject the HTML of the banner using Javascript. This might cause CSP issues if CSP is on
        wall: true, // Block the background with a semi-transparent wall
        wallScroll: false, // Block the scroll
        wallBlur: true, //Blurs the background wall
        bannerText: 'This website uses cookies to ensure you get the best experience on our website.',
        acceptAllButton: {
            text: 'Aceptar todas',
            show: true,
        },
        settingsButton: {
            text: 'Configurar',
            show: true,
        },
    },
    cookieCategories: [ // The cookie categories. These will appear in the cookie modal
        {
            title: 'Cookies de analíticas',
            description: 'Esta es una descripción chulísima generada a través de la librería.',
            required: true, // These cookies must be accepted
            scripts: [
                {
                    type: ScriptType.STANDARD, // Standart to inject a regular script. GTM if using GTM.
                    // gtmCode: '', // Set this value if using GTM
                    scriptSrc: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js',
                    async: true,
                },
            ],
        },
        {
            title: 'Cookies de analítica',
            description: 'Esta es una descripción chulísima generada a través de la librería.',
            required: false,
            scripts: [
                {
                    type: ScriptType.STANDARD,
                    // gtmCode: '',
                    scriptSrc: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js',
                    async: true,
                },
            ],
        },
    ],
}
```

## Order of scripts

You can change the order of script injection by moving the objects in the `scripts` array up or down.

## Using it together with CSP

This library injects HTML directly to the DOM, so if your CSP configuracion does not allow this, you can manually add the HTML to your project. To get it to work, you need to set the inject value to false in bannerOptions and modalOptions.

1. Copy and paste the HTML elements to your projects:

```html
<div class="c-cookies-config-wall"></div>
```
```html
    <div class="c-cookies-config-banner">
        <div class="banner-container">
            <p>This website uses cookies to ensure you get the best experience on our website.</p>
            <div class="banner-container__buttons">
                <button class="banner-container__button banner-container__accept-all-btn cm-banner-accept-all-btn">Accept all</button>
                <button class="banner-container__button-link banner-container__config-btn cm-banner-config-btn">Settings</button>
            </div>
        </div>
    </div>
```
```html
    <div class="c-cookies-config-modal">
        <div class="modal__container" id="modal-container">
        <div class="modal__content">
            <div class="modal__close close-modal" title="Close">
                <div class="close-modal-img"></div>
            </div>
        
            <h1 class="modal__title">Configuración de cookies</h1>
            <p class="modal__description">Configura aquí tus cookies.</p>
            <div class="modal__cookie-categories">
                
            <div class="cookie-category">
                <div class="cookie-category__header header">
                    <h2 class="header__title">
                    Cookies funcionales
                    </h2>
                    <div class="header__switch">
                    <label class="switch disabled">
                        <input disabled="" checked="" class="cm-switch-0" type="checkbox">
                        <span class="slider round"></span>
                    </label>
                    </div>
                </div>
            <div class="cookie-category__body body">
                <p>Esta es una descripción chulísima generada a través de la librería.</p>
            </div>
            </div>
            
            <div class="cookie-category">
                <div class="cookie-category__header header">
                    <h2 class="header__title">
                    Cookies de analítica
                    </h2>
                    <div class="header__switch">
                    <label class="switch ">
                        <input checked="" class="cm-switch-1" type="checkbox">
                        <span class="slider round"></span>
                    </label>
                    </div>
                </div>
            <div class="cookie-category__body body">
                <p>Esta es una descripción chulísima generada a través de la librería.</p>
            </div>
            </div>
            
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
```

2. Call the init method:
```javascript
    // First, set the inject value to false in the banner and modal options
    var options = {
        cookieCategories: [...],
        bannerOptions: {
            inject: false,
        },
        modalOptions: {
            inject: false
        }
    };

    const cookiesManager = new CookiesManager(options);
    cookiesManager.init(true, false); // This method will automatically add the event listeners
```

## Custom HTML
You can create you own banner or modal, you just need to add some classes to your inputs or buttons. Your components should respect these rules
### Banner

- The banner's parent div must have the following class: `c-cookies-config-banner`. This is used to show / hide the banner.
- Inside the banner there must be an element with the following class:  `banner-container`. This is used to show / hide the banner.
- The accept all button must have this class: `cm-banner-accept-all-btn`.
- The cookie config button must have this class: `cm-banner-config-btn`.

### Modal

- The modal's parent div must have the following class: `c-cookies-config-modal`. This is used to show / hide the modal.
- Inside the modal there must be an element with the following class:  `modal__container`. This is used to show / hide the modal.
- The modal's close button must have the following class: `close-modal`
- The modal's save button must have the following class: `cm-modal-save`
- The modal's accept all button must have the following class: `cm-modal-accept-all`
- The checkbox inputs for each cookieCategory must use this syntax: `cm-switch-[index]`, where index is the switch number starting from 0.
- Watch out! The cookie categories (inside the `cookieCategories` array in the `options` object) MUST be in the same order as they're printed on screen.

### Wall

- The wall must have this class: `c-cookies-config-wall`
- The wall on its blurred variant also has this class: `c-cookies-config-wall--blurred`

To start using the library set the inject values to false in both the banner and modal.

```javascript
    // First, set the inject value to false in the banner and modal options
    var options = {
        cookieCategories: [...],
        bannerOptions: {
            inject: false,
        },
        modalOptions: {
            inject: false
        }
    };

    const cookiesManager = new CookiesManager(options);
    cookiesManager.init(true, false); // This method will automatically add the event listeners
```


## Working example

```jsx
import '@mikelgmh/cookie-manager/dist/index.css';
import { CookiesManager, ScriptType } from '@mikelgmh/cookie-manager';

var options = {
    cookieCategories: [
        {
            title: 'Cookies funcionales',
            description: 'Esta es una descripción chulísima generada a través de la librería.',
            required: true,
            scripts: [
                {
                    type: ScriptType.STANDARD,
                    // gtmCode: '',
                    scriptSrc: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js',
                    async: true,
                },
            ],
        },
        {
            title: 'Cookies de analítica',
            description: 'Esta es una descripción chulísima generada a través de la librería.',
            required: false,
            scripts: [
                {
                    type: ScriptType.GTM,
                    gtmCode: 'GTM-XXXXXXX',
                    async: true,
                },
            ],
        },
    ],
};

const cookiesManager = new CookiesManager(options);
cookiesManager.init(true, false);
```

# Upcoming features

- Optional close button in modal
- Optional settings / accept and reject button in modal and banner
- Callbacks when user accepts or rejects cookies
- Change the text of some of the buttons.
- Allow to just set the event listeners and let the user use his own HTML.