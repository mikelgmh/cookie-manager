class e{static encode(e){return window.btoa(e)}static decode(e){return window.atob(e)}static isHTML(e){var t=RegExp.prototype.test.bind(/(<([^>]+)>)/i);return e.match(t)}static wrapString(e,t){return`<${t}>${e}</${t}>`}static deepEqual(e,t){const n=Object.keys,o=typeof e;return e&&t&&"object"===o&&o===typeof t?n(e).length===n(t).length&&n(e).every(n=>this.deepEqual(e[n],t[n])):e===t}static compareObjects(e,t){let n=e=>Object.entries(e).sort().map(e=>(e[1]instanceof Object&&(e[1]=n(e[1])),e));return JSON.stringify(n(e))===JSON.stringify(n(t))}static objectEquals(e,t){const n=e=>{const t={};return JSON.stringify(e,(e,n)=>(t[e]=null,n)),JSON.stringify(e,Object.keys(t).sort())};return n(e)===n(t)}static prepareObjectsForComparison(e,t){var n=JSON.parse(JSON.stringify(e)),o=JSON.parse(JSON.stringify(t));return n.forEach(e=>{e.checked=!0}),o.forEach(e=>{e.checked=!0}),{A:n,B:o}}}class t{constructor(e,t){this.options=void 0,this.banner=void 0,this.cookiesManager=void 0,this.cookiesManager=e,this.options=t,this.injectBanner(),this.setEventListeners()}setEventListeners(){let e=this;document.querySelector(".banner-container__accept-all-btn").addEventListener("click",function(){e.cookiesManager.acceptAllButton()}),document.querySelector(".banner-container__config-btn").addEventListener("click",function(){e.options.settingsButton.modal.show()})}generateBanner(){return`\n                <div class="c-cookies-config-banner">\n            <div class="banner-container">\n            ${this.getBannerText()}\n            <div class="banner-container__buttons">\n                <button class="banner-container__button banner-container__accept-all-btn">${this.getAcceptAllButtonText()}</button>\n                <button class="banner-container__button-link banner-container__config-btn">Configurar</button>\n            </div>\n            </div>\n        </div> \n        `}getBannerText(){return null!=this.options.bannerText?e.isHTML(this.options.bannerText)?this.options.bannerText:e.wrapString(this.options.bannerText,"p"):'\n                <p>Utilizamos cookies propias y de terceros para analizar el tráfico en nuestra web mediante la obtención de los\n                        datos necesarios para estudiar tu navegación. Puedes obtener más información en la Política de Cookies. Puedes\n                        aceptar todas las cookies pulsando el botón “Aceptar" o configurarlas o rechazar su uso pulsando en\n                        "Configurar".</p>\n                '}getAcceptAllButtonText(){return null!=this.options.acceptAllButton.text?this.options.acceptAllButton.text:"Aceptar todo"}injectBanner(){null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateBanner())}showWall(){document.querySelector("body").insertAdjacentHTML("afterend",'<div class="c-cookies-config-wall"></div>')}hideWall(){document.querySelector(".c-cookies-config-wall").style.display="none"}hideScroll(){document.querySelector("body").style.overflow="hidden"}showScroll(){document.querySelector("body").style.overflow="auto"}show(){this.options.wall&&this.showWall(),this.options.wallScroll||this.hideScroll(),document.querySelector(".c-cookies-config-banner .banner-container").classList.add("show-banner")}hide(){document.querySelector(".c-cookies-config-banner").style.display="none",this.hideWall(),this.showScroll()}}class n{constructor(e,t){this.options=void 0,this.cookiesManager=void 0,this.cookiesManager=e,this.options=t,this.injectModal(),this.setEventListeners()}show(){document.getElementById("modal-container").classList.add("show-modal"),document.querySelector("body").style.overflow="hidden"}hide(){document.getElementById("modal-container").classList.remove("show-modal")}setEventListeners(){var e=this;document.querySelectorAll(".close-modal").forEach(e=>e.addEventListener("click",this.hide)),document.querySelectorAll(".modal__button-accept-all").forEach(function(t){t.addEventListener("click",function(){e.cookiesManager.acceptAllButton()})}),document.querySelectorAll(".modal__button-save-btn").forEach(function(t){t.addEventListener("click",function(){e.cookiesManager.injectScripts(),e.cookiesManager.hideBanner(),e.cookiesManager.saveButton()})}),this.cookiesManager.getOptions().cookieCategories.forEach((e,t)=>{document.querySelector(`.cm-switch-${t}`).addEventListener("change",function(){e.checked=!!this.checked})})}injectModal(){null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateModal())}generateCategoriesBlocks(){let e="";return this.cookiesManager.getOptions().cookieCategories.forEach((t,n)=>{const o=t.required?"disabled":"";e+=`\n            <div class="cookie-category">\n                <div class="cookie-category__header header">\n                    <h2 class="header__title">\n                    ${t.title}\n                    </h2>\n                    <div class="header__switch">\n                    <label class="switch ${o}">\n                        <input ${o} checked class="cm-switch-${n}" type="checkbox">\n                        <span class="slider round"></span>\n                    </label>\n                    </div>\n                </div>\n            <div class="cookie-category__body body">\n                <p>${t.description}</p>\n            </div>\n            </div>\n            `}),e}generateModal(){return`\n        <div class="c-cookies-config-modal">\n        <div class="modal__container" id="modal-container">\n          <div class="modal__content">\n            <div class="modal__close close-modal" title="Close">\n              <img class="close-modal-img" src="images/content/close.svg" alt="Webpack 5 Template Boilerplate">\n            </div>\n        \n            <h1 class="modal__title">Configuración de cookies</h1>\n            <p class="modal__description">Configura aquí tus cookies.</p>\n            <div class="modal__cookie-categories">\n                ${this.generateCategoriesBlocks()}\n            </div>\n    \n            <div class="modal__footer">\n              <button class="modal__button modal__button-width modal__button-accept-all">\n                Aceptar todas\n              </button>\n    \n              <button class="modal__button-link close-modal modal__button-save-btn">\n                Guardar\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n        `}}class o{getBanner(){return this.banner}setBanner(e){this.banner=e}getModal(){return this.modal}setModal(e){this.modal=e}getOptions(){return this.modalOptions}constructor(t){if(this.modalOptions=void 0,this.banner=void 0,this.modal=void 0,this.acceptAll=!1,this.configChanged=!1,null==t)throw new Error("Options cannot be null");if(t.cookieCategories.forEach(e=>{e.checked=!0}),this.modalOptions=t,null!=localStorage.getItem("cookiesManagerOptions")){var n=e.prepareObjectsForComparison(this.modalOptions.cookieCategories,this.getCookiesOptions());e.objectEquals(n.A,n.B)?(this.modalOptions.cookieCategories=this.getCookiesOptions(),this.injectScripts()):this.configChanged=!0}null!=t.modalOptions&&this.createModal(t.modalOptions),null!=t.bannerOptions&&(null!=t.modalOptions&&(t.bannerOptions.settingsButton.modal=this.modal),this.createBanner(t.bannerOptions))}createBanner(e){return this.banner=new t(this,e),this.banner}createModal(e){return this.modal=new n(this,e),this.modal}acceptAllButton(){this.acceptAll=!0,this.modal.hide(),this.banner.hide(),this.injectScripts(),this.saveCookieOptions()}showModal(){this.modal.show()}showBanner(){this.banner.show()}hideBanner(){this.banner.hide()}hideModal(){this.modal.hide()}injectScript(e,t){var n=document.createElement("script");n.setAttribute("src",e),n.async=t,document.body.appendChild(n)}injectGTM(e){try{!function(e,t,n,o,s){e[o]=e[o]||[],e[o].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});const i=t.getElementsByTagName(n)[0],a=t.createElement(n);a.src=`https://www.googletagmanager.com/gtm.js?id=${s}`,i.parentNode.insertBefore(a,i)}(window,document,"script","dataLayer",e),window.dataLayer=window.dataLayer||[]}catch(e){console.log("There was an error loading GTM.")}}init(e,t){this.modalOptions.askOnce?(null==localStorage.getItem("cookiesManagerOptions")||this.modalOptions.askOnChange&&this.configChanged)&&(e&&this.showBanner(),t&&this.showModal()):(e&&this.showBanner(),t&&this.showModal())}injectScripts(){this.modalOptions.cookieCategories.forEach(e=>{(e.checked||this.acceptAll)&&e.scripts.forEach(e=>{e.type==s.STANDARD||null==e.type?this.injectScript(e.scriptSrc,e.async):this.injectGTM(e.gtmCode)})})}saveButton(){this.saveCookieOptions()}saveCookieOptions(){const t=e.encode(JSON.stringify(this.modalOptions.cookieCategories));localStorage.setItem("cookiesManagerOptions",t)}getCookiesOptions(){return JSON.parse(e.decode(localStorage.getItem("cookiesManagerOptions")))}}var s;!function(e){e[e.GTM=0]="GTM",e[e.STANDARD=1]="STANDARD"}(s||(s={}));export{o as CookiesManager,s as ScriptType};
//# sourceMappingURL=index.modern.mjs.map
