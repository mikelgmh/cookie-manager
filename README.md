# cookie-manager
This library allows to inject scripts dynamically according to the cookie preferences chosen in a modal. You can also set values for cookies automatically for each cookie category. [GitHub repository](https://github.com/mikelgmh/cookie-manager).


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
    delay: 0, // Sets a timeout to show the banner / modal using the init() method.
    modalOptions: { // Options for the modal
        inject: true, // Inject the HTML of the modal using Javascript. This might cause CSP issues if CSP is on
        showModalClass: "show-modal", // The clas used to show the modal. Use it along with modal__container
        title: "Cookie settings",
        description: "Change the settings for your cookies here.",
        acceptAllButton: {
            text: 'Accept all',
            show: true,
        },
        rejectAllButton: {
            text: 'Reject all',
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
        injectWall: true, // Injects the HTML for the wall.  This might cause CSP issues if CSP is on
        wallScroll: true, // Allow the scroll.
        wallBlur: false, //Blurs the background wall
        bannerText: 'This website uses cookies to ensure you get the best experience on our website.',
        acceptAllButton: {
            text: 'Accept all',
            show: true,
        },
        rejectAllButton: {
            text: 'Reject all',
            show: true,
        },
        settingsButton: {
            text: 'Configure',
            show: true,
        },
    },
    cookieCategories: [ // The cookie categories. These will appear in the cookie modal
        {
            id: "my-custom-id-1", // Custom id. Useful to identify the categories on the onCookieCategoryChange callback.
            title: 'Analytics Cookies',
            description: 'This is a test description. You can change this in the options object.',
            required: false, // Set to true to disable the switch
            checked: false, // Set to true to check the switch
            boxedHeader: false, // Puts the category in a Box
            boxedBody: false, // Adds margins to fit the body in the header's box
            accordion: {
                enable: false, // Enables an accordion for the description
                active: false, // Sets the accordion to active by default
            },
            events: { // You can defined some callbacks or events easily.
                onAccept: () => { }, // Callback function. This method is called when the user accepted this cookieCategory when the user presses the save button.
                onReject: () => { }, // Callback function. This method is called when the user accepted this cookieCategory when the user presses the save button.
                setCookiesOnChange: [ // This array can be empty []. If you want to change some cookie values, you can follow this example:
                    {
                        cookieName: "analyticsCookie",
                        valueOnAccept: true,
                        valueOnReject: false,
                        expirationDays: 365, // Be careful, the limit is 400 days!
                    },
                    {
                        cookieName: "adsCookie",
                        valueOnAccept: true,
                        valueOnReject: false,
                        expirationDays: 365, // Be careful, the limit is 400 days!
                    }
                ]
            },
            scripts: [ // The scripts array can have an empty value [] if you don't want to inject scripts
                {
                    type: ScriptType.STANDARD, // Standart to inject a regular script. GTM if using GTM.
                    // gtmCode: '', // Set this value if using GTM
                    scriptSrc: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js',
                    async: true,
                },
            ],
        },
        {
            id: "my-custom-id-2", // Custom id. Useful to identify the categories on the onCookieCategoryChange callback.
            title: 'Analytics Cookies',
            description: 'This is a test description. You can change this in the options object.',
            required: false,
            scripts: [ // The scripts array can have an empty value [] if you don't want to inject scripts
                {
                    type: ScriptType.STANDARD,
                    // gtmCode: '',
                    scriptSrc: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js',
                    async: true,
                },
            ],
            events: { // You can defined some callbacks or events easily.
                onAccept: () => { }, // Callback function. This method is called when the user accepted this cookieCategory when the user presses the save button.
                onReject: () => { }, // Callback function. This method is called when the user accepted this cookieCategory when the user presses the save button.
                setCookiesOnChange: [ // This array can be empty []. If you want to change some cookie values, you can follow this example:
                    {
                        cookieName: "analyticsCookie",
                        valueOnAccept: true,
                        valueOnReject: false,
                        expirationDays: 365, // Be careful, the limit is 400 days!
                    },
                    {
                        cookieName: "adsCookie",
                        valueOnAccept: true,
                        valueOnReject: false,
                        expirationDays: 365, // Be careful, the limit is 400 days!
                    }
                ]
            },
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
                <button class="banner-container__button banner-container__reject-all-btn cm-banner-reject-all-btn">Reject all</button>
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
                <div class="cookie-category__header cc-header">
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
                <p>This is a test description. You can change this in the options object.</p>
            </div>
            </div>
            
            <div class="cookie-category">
                <div class="cookie-category__header cc-header">
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
                <p>This is a test description. You can change this in the options object.</p>
            </div>
            </div>
            
            </div>

            <div class="modal__footer">
                <button class="modal__button modal__button-width cm-modal-reject-all footer__button-reject-all">Reject all</button>
                <button class="modal__button modal__button-width cm-modal-accept-all footer__button-accept-all">Accept all</button>
                <button class="modal__button-link close-modal cm-modal-save footer__button-save-btn"> Save </button>
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
- The reject all button must have this class: `cm-banner-reject-all-btn`.
- The cookie config button must have this class: `cm-banner-config-btn`.

### Modal

- The modal's parent div must have the following class: `c-cookies-config-modal`. This is used to show / hide the modal.
- Inside the modal there must be an element with the following class:  `modal__container`. This is used to show / hide the modal.
- The modal's close button must have the following class: `close-modal`
- The modal's save button must have the following class: `cm-modal-save`
- The modal's accept all button must have the following class: `cm-modal-accept-all`
- The modal's reject all button must have the following class: `cm-modal-reject-all`
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

## Callbacks

You can set a callback function by calling the `on` method.

⚠️ It is very important to define the callbacks before calling the init() method ⚠️ If you want to use more specific callbacks, refer to the `events` object in each `cookieCategory`.

### Available callbacks

|callback| params | description
|--|--|--|
| onCookieCategoryChange() | cookieCategory | This function is called when the user accepted / rejected a cookie Category after pressing the save button or after initializing the library. If you want an specific callback for each category, check the `events` object in `cookieCategory`.

```javascript
    var options = {...};
    const cookiesManager = new CookiesManager(options);
    cookiesManager.on('onCookieCategoryChange', (cookieCategory) => {
        console.log(cookieCategory);
    });
    cookiesManager.init(true, false);
```

## Working example

```jsx
import '@mikelgmh/cookie-manager/dist/index.css';
import { CookiesManager, ScriptType } from '@mikelgmh/cookie-manager';

var options = {
    cookieCategories: [
        {
            title: 'Cookies funcionales',
            description: 'This is a test description. You can change this in the options object.',
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
            description: 'This is a test description. You can change this in the options object.',
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