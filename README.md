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
    askOnChange: true, // Ask again if cookieCategories array is modified
    modalOptions: { // Options for the modal
        acceptAllButton: {
            text: 'Aceptar todo',
            show: true,
        },
        settingsButton: {
            text: 'Configuraciónes',
            show: true,
        },
    },
    bannerOptions: { // Options for the banner
        wall: true, // Block the background with a semi-transparent wall
        wallScroll: false, // Block the scroll
        wallBlur: true, //Blurs the background wall
        bannerText: 'This website uses cookies to ensure you get the best experience on our website.',
        acceptAllButton: {
            text: 'Aceptar todas',
            show: true, // Still on development
        },
        settingsButton: {
            text: 'Configurar', // Still on development
            show: true, // Still on development
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