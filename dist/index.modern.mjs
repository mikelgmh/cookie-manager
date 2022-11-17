class e{static encode(e){return window.btoa(e)}static decode(e){return window.atob(e)}static isHTML(e){var t=RegExp.prototype.test.bind(/(<([^>]+)>)/i);return e.match(t)}static wrapString(e,t){return this.isHTML(e)?e:`<${t}>${e}</${t}>`}static deepEqual(e,t){const o=Object.keys,n=typeof e;return e&&t&&"object"===n&&n===typeof t?o(e).length===o(t).length&&o(e).every(o=>this.deepEqual(e[o],t[o])):e===t}static compareObjects(e,t){let o=e=>Object.entries(e).sort().map(e=>(e[1]instanceof Object&&(e[1]=o(e[1])),e));return JSON.stringify(o(e))===JSON.stringify(o(t))}static objectEquals(e,t){const o=e=>{const t={};return JSON.stringify(e,(e,o)=>(t[e]=null,o)),JSON.stringify(e,Object.keys(t).sort())};return o(e)===o(t)}static prepareObjectsForComparison(e,t){var o=JSON.parse(JSON.stringify(e)),n=JSON.parse(JSON.stringify(t));return o.forEach(e=>{e.checked=!0}),n.forEach(e=>{e.checked=!0}),{A:o,B:n}}static mergeRecursively(e,t){for(var o in t)try{e[o]=t[o].constructor==Object?this.mergeRecursively(e[o],t[o]):t[o]}catch(n){e[o]=t[o]}return e}}class t{constructor(e,t){this.options=void 0,this.banner=void 0,this.cookiesManager=void 0,this.cookiesManager=e,this.options=t,this.injectBanner(),this.setEventListeners()}setEventListeners(){let e=this;document.querySelector(".cm-banner-accept-all-btn").addEventListener("click",function(){e.cookiesManager.acceptAllButton()}),document.querySelector(".cm-banner-config-btn").addEventListener("click",function(){e.cookiesManager.showModal()})}generateBanner(){return`\n                <div class="c-cookies-config-banner">\n                    <div class="banner-container">\n                        ${this.getBannerText()}\n                        <div class="banner-container__buttons">\n                            ${this.getAcceptAllButton()}\n                            ${this.getSettingsButton()}\n                        </div>\n                    </div>\n                </div> \n                `}getAcceptAllButton(){return this.options.acceptAllButton.show?`<button class="banner-container__button banner-container__accept-all-btn cm-banner-accept-all-btn">${this.options.acceptAllButton.text}</button>`:""}getSettingsButton(){return this.options.settingsButton.show?`<button class="banner-container__button-link banner-container__config-btn cm-banner-config-btn">${this.options.settingsButton.text}</button>`:""}getBannerText(){return e.wrapString(this.options.bannerText,"p")}injectBanner(){null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateBanner())}showWall(){const e=`<div class="c-cookies-config-wall ${this.options.wallBlur?"c-cookies-config-wall--blurred":""}"></div>`;document.querySelector("body").insertAdjacentHTML("afterend",e)}hideWall(){document.querySelector(".c-cookies-config-wall").style.display="none"}hideScroll(){document.querySelector("body").style.overflow="hidden"}showScroll(){document.querySelector("body").style.overflow="auto"}show(){this.options.wall&&this.showWall(),this.options.wallScroll||this.hideScroll(),document.querySelector(".c-cookies-config-banner .banner-container").classList.add("show-banner")}hide(){document.querySelector(".c-cookies-config-banner").style.display="none",this.hideWall(),this.showScroll()}}class o{constructor(e,t){this.options=void 0,this.cookiesManager=void 0,this.cookiesManager=e,this.options=t,this.injectModal(),this.setEventListeners()}show(){document.getElementById("modal-container").classList.add("show-modal"),document.querySelector("body").style.overflow="hidden"}hide(){document.getElementById("modal-container").classList.remove("show-modal")}setEventListeners(){var e=this;document.querySelectorAll(".close-modal").forEach(e=>e.addEventListener("click",this.hide)),document.querySelector(".cm-modal-accept-all").addEventListener("click",function(){e.cookiesManager.acceptAllButton()}),document.querySelector(".cm-modal-save").addEventListener("click",function(){e.cookiesManager.injectScripts(),e.cookiesManager.hideBanner(),e.cookiesManager.saveButton()}),this.cookiesManager.getOptions().cookieCategories.forEach((e,t)=>{document.querySelector(`.cm-switch-${t}`).addEventListener("change",function(){e.checked=!!this.checked})})}injectModal(){null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateModal())}generateCategoriesBlocks(){let e="";return this.cookiesManager.getOptions().cookieCategories.forEach((t,o)=>{const n=t.required?"disabled":"";e+=`\n            <div class="cookie-category">\n                <div class="cookie-category__header header">\n                    <h2 class="header__title">\n                    ${t.title}\n                    </h2>\n                    <div class="header__switch">\n                    <label class="switch ${n}">\n                        <input ${n} checked class="cm-switch-${o}" type="checkbox">\n                        <span class="slider round"></span>\n                    </label>\n                    </div>\n                </div>\n            <div class="cookie-category__body body">\n                <p>${t.description}</p>\n            </div>\n            </div>\n            `}),e}generateModal(){return`\n        <div class="c-cookies-config-modal">\n        <div class="modal__container" id="modal-container">\n          <div class="modal__content">\n            <div class="modal__close close-modal" title="Close">\n                <div class="close-modal-img"></div>\n            </div>\n        \n            <h1 class="modal__title">Configuración de cookies</h1>\n            <p class="modal__description">Configura aquí tus cookies.</p>\n            <div class="modal__cookie-categories">\n                ${this.generateCategoriesBlocks()}\n            </div>\n    \n            <div class="modal__footer">\n              <button class="modal__button modal__button-width cm-modal-accept-all modal__button-accept-all">\n                Aceptar todas\n              </button>\n    \n              <button class="modal__button-link close-modal cm-modal-save modal__button-save-btn">\n                Guardar\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n        `}}class n{getBanner(){return this.banner}setBanner(e){this.banner=e}getModal(){return this.modal}setModal(e){this.modal=e}getOptions(){return this.modalOptions}constructor(t){if(this.modalOptions=void 0,this.banner=void 0,this.modal=void 0,this.acceptAll=!1,this.configChanged=!1,null==t)throw new Error("Options cannot be null");if(null==t.cookieCategories)throw new Error("You should provide at least one cookie category");if(t.cookieCategories.forEach(e=>{e.checked=!0}),t=e.mergeRecursively(this.getDefaultOptions(),t),this.modalOptions=t,null!=localStorage.getItem("cookiesManagerOptions")){var o=e.prepareObjectsForComparison(this.modalOptions.cookieCategories,this.getCookiesOptions());e.objectEquals(o.A,o.B)?(this.modalOptions.cookieCategories=this.getCookiesOptions(),this.injectScripts()):this.configChanged=!0}null!=t.modalOptions&&this.createModal(t.modalOptions),null!=t.bannerOptions&&this.createBanner(t.bannerOptions)}createBanner(e){return this.banner=new t(this,e),this.banner}createModal(e){return this.modal=new o(this,e),this.modal}acceptAllButton(){this.acceptAll=!0,this.modal.hide(),this.banner.hide(),this.injectScripts(),this.saveCookieOptions()}showModal(){this.modal.show()}showBanner(){this.banner.show()}hideBanner(){this.banner.hide()}hideModal(){this.modal.hide()}injectScript(e,t=!1){var o=document.createElement("script");o.setAttribute("src",e),o.async=t,document.body.appendChild(o)}injectGTM(e){try{!function(e,t,o,n,s){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});const i=t.getElementsByTagName(o)[0],a=t.createElement(o);a.src=`https://www.googletagmanager.com/gtm.js?id=${s}`,i.parentNode.insertBefore(a,i)}(window,document,"script","dataLayer",e),window.dataLayer=window.dataLayer||[]}catch(e){console.log("There was an error loading GTM.")}}init(e,t){this.modalOptions.askOnce?(null==localStorage.getItem("cookiesManagerOptions")||this.configChanged)&&(e&&this.showBanner(),t&&this.showModal()):(e&&this.showBanner(),t&&this.showModal())}injectScripts(){this.modalOptions.cookieCategories.forEach(e=>{(e.checked||this.acceptAll)&&e.scripts.forEach(e=>{if(e.type==s.STANDARD||null==e.type){if(null==e.scriptSrc)throw new Error("You should provide a scriptSrc for the script");this.injectScript(e.scriptSrc,e.async)}else{if(null==e.gtmCode)throw new Error("You should provide a gtmCode for the script");this.injectGTM(e.gtmCode)}})})}saveButton(){this.saveCookieOptions()}saveCookieOptions(){const t=e.encode(JSON.stringify(this.modalOptions.cookieCategories));localStorage.setItem("cookiesManagerOptions",t)}getCookiesOptions(){return JSON.parse(e.decode(localStorage.getItem("cookiesManagerOptions")))}getDefaultOptions(){return{askOnce:!0,askOnChange:!0,modalOptions:{acceptAllButton:{text:"Accept all",show:!0},saveButton:{text:"Settings",show:!0},closeButton:{text:"Settings",show:!0}},bannerOptions:{wall:!0,wallScroll:!1,wallBlur:!0,bannerText:"This website uses cookies to ensure you get the best experience on our website.",acceptAllButton:{text:"Accept all",show:!0},settingsButton:{text:"Settings",show:!0},acceptRequiredOnlyButton:{text:"Configuración",show:!1},rejectAllButton:{text:"Configuración",show:!1}},cookieCategories:[]}}}var s;!function(e){e[e.GTM=0]="GTM",e[e.STANDARD=1]="STANDARD"}(s||(s={}));export{n as CookiesManager,s as ScriptType};
//# sourceMappingURL=index.modern.mjs.map
