class t{static encode(t){return window.btoa(t)}static decode(t){return window.atob(t)}static isHTML(t){var e=RegExp.prototype.test.bind(/(<([^>]+)>)/i);return t.match(e)}static wrapString(t,e){return this.isHTML(t)?t:`<${e}>${t}</${e}>`}static deepEqual(t,e){const o=Object.keys,n=typeof t;return t&&e&&"object"===n&&n===typeof e?o(t).length===o(e).length&&o(t).every(o=>this.deepEqual(t[o],e[o])):t===e}static compareObjects(t,e){let o=t=>Object.entries(t).sort().map(t=>(t[1]instanceof Object&&(t[1]=o(t[1])),t));return JSON.stringify(o(t))===JSON.stringify(o(e))}static objectEquals(t,e){const o=t=>{const e={};return JSON.stringify(t,(t,o)=>(e[t]=null,o)),JSON.stringify(t,Object.keys(e).sort())};return o(t)===o(e)}static prepareObjectsForComparison(t,e){var o=JSON.parse(JSON.stringify(t)),n=JSON.parse(JSON.stringify(e));return o.forEach(t=>{t.checked=!0}),n.forEach(t=>{t.checked=!0}),{A:o,B:n}}static mergeRecursively(t,e){for(var o in e)try{t[o]=e[o].constructor==Object?this.mergeRecursively(t[o],e[o]):e[o]}catch(n){t[o]=e[o]}return t}}class e{constructor(t,e){this.options=void 0,this.banner=void 0,this.cookiesManager=void 0,this.cookiesManager=t,this.options=e,t.getOptions().bannerOptions.inject&&this.injectBanner(),this.setEventListeners()}setEventListeners(){try{let t=this;document.querySelector(".cm-banner-accept-all-btn").addEventListener("click",function(){t.cookiesManager.acceptAllButton()}),document.querySelector(".cm-banner-config-btn").addEventListener("click",function(){t.cookiesManager.showModal()})}catch(t){console.log("Can't set the event listener for the cookies modal.")}}generateBanner(){return`\n                <div class="c-cookies-config-banner">\n                    <div class="banner-container">\n                        ${this.getBannerText()}\n                        <div class="banner-container__buttons">\n                            ${this.getAcceptAllButton()}\n                            ${this.getSettingsButton()}\n                        </div>\n                    </div>\n                </div> \n                `}getAcceptAllButton(){return this.options.acceptAllButton.show?`<button class="banner-container__button banner-container__accept-all-btn cm-banner-accept-all-btn">${this.options.acceptAllButton.text}</button>`:""}getSettingsButton(){return this.options.settingsButton.show?`<button class="banner-container__button-link banner-container__config-btn cm-banner-config-btn">${this.options.settingsButton.text}</button>`:""}getBannerText(){return t.wrapString(this.options.bannerText,"p")}injectBanner(){try{null!=document.querySelector("body")&&(document.querySelector("body").insertAdjacentHTML("afterend",this.generateWall()),document.querySelector("body").insertAdjacentHTML("afterend",this.generateBanner()))}catch(t){console.log("Couldn't inject the banner.")}}generateWall(){return`<div class="c-cookies-config-wall ${this.options.wallBlur?"c-cookies-config-wall--blurred":""}"></div>`}showWall(){try{document.querySelector(".c-cookies-config-wall").classList.add("wall-show")}catch(t){console.log("Couldn't apply the background wall.")}}hideWall(){try{document.querySelector(".c-cookies-config-wall").classList.remove("wall-show")}catch(t){console.log("Unable to hide the background wall.")}}hideScroll(){try{document.querySelector("body").style.overflow="hidden"}catch(t){console.log("Unable to hide the scroll.")}}showScroll(){try{document.querySelector("body").style.overflow="auto"}catch(t){console.log("Unable to show the scroll.")}}show(){this.options.wall&&this.showWall(),this.options.wallScroll||this.hideScroll();try{document.querySelector(".c-cookies-config-banner .banner-container").classList.add("show-banner")}catch(t){console.log("Unable to show the banner.")}}hide(){try{document.querySelector(".c-cookies-config-banner").style.display="none"}catch(t){console.log("Unable to hide the banner.")}this.hideWall(),this.showScroll()}}class o{constructor(t,e){this.options=void 0,this.cookiesManager=void 0,this.cookiesManager=t,this.options=e,t.getOptions().modalOptions.inject&&this.injectModal(),this.setEventListeners()}show(){try{document.getElementById("modal-container").classList.add("show-modal"),document.querySelector("body").style.overflow="hidden"}catch(t){console.log("Could not show cookie modal.")}}hide(){document.getElementById("modal-container").classList.remove("show-modal")}setEventListeners(){try{var t=this;document.querySelectorAll(".close-modal").forEach(t=>t.addEventListener("click",this.hide)),document.querySelector(".cm-modal-accept-all").addEventListener("click",function(){t.cookiesManager.acceptAllButton()}),document.querySelector(".cm-modal-save").addEventListener("click",function(){t.cookiesManager.injectScripts(),t.cookiesManager.hideBanner(),t.cookiesManager.saveButton()}),this.cookiesManager.getOptions().cookieCategories.forEach((t,e)=>{document.querySelector(`.cm-switch-${e}`).addEventListener("change",function(){t.checked=!!this.checked})})}catch(t){console.log("Could not set event listeners for cookie modal.")}}injectModal(){try{null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateModal())}catch(t){console.log("Could not inject cookie modal.")}}generateCategoriesBlocks(){let t="";return this.cookiesManager.getOptions().cookieCategories.forEach((e,o)=>{const n=e.required?"disabled":"";t+=`\n            <div class="cookie-category">\n                <div class="cookie-category__header header">\n                    <h2 class="header__title">\n                        ${e.title}\n                    </h2>\n                    <div class="header__switch">\n                    <label class="switch ${n}">\n                        <input ${n} checked class="cm-switch-${o}" type="checkbox">\n                        <span class="slider round ${n}"></span>\n                    </label>\n                    </div>\n                </div>\n            <div class="cookie-category__body body">\n                <p>${e.description}</p>\n            </div>\n            </div>\n            `}),t}getCloseButton(){return this.options.closeButton.show?'<div class="modal__close close-modal" title="Close"><div class="close-modal-img"></div></div>':""}getAcceptAllButton(){return this.options.acceptAllButton.show?`<button class="modal__button modal__button-width cm-modal-accept-all modal__button-accept-all">${this.options.acceptAllButton.text}</button>`:""}getSaveButton(){return this.options.saveButton.show?` <button class="modal__button-link close-modal cm-modal-save modal__button-save-btn"> ${this.options.saveButton.text} </button>`:""}generateModal(){return`\n        <div class="c-cookies-config-modal">\n        <div class="modal__container" id="modal-container">\n          <div class="modal__content">\n            ${this.getCloseButton()}\n            <h1 class="modal__title">${this.options.title}</h1>\n            <p class="modal__description">${this.options.description}</p>\n            <div class="modal__cookie-categories">\n                ${this.generateCategoriesBlocks()}\n            </div>\n    \n            <div class="modal__footer">\n             ${this.getAcceptAllButton()}\n             ${this.getSaveButton()}\n            </div>\n          </div>\n        </div>\n      </div>\n        `}}class n{getBanner(){return this.banner}setBanner(t){this.banner=t}getModal(){return this.modal}setModal(t){this.modal=t}getOptions(){return this.modalOptions}constructor(e){if(this.modalOptions=void 0,this.banner=void 0,this.modal=void 0,this.acceptAll=!1,this.configChanged=!1,null==e)throw new Error("Options cannot be null");if(null==e.cookieCategories)throw new Error("You should provide at least one cookie category");if(e.cookieCategories.forEach(t=>{t.checked=!0}),e=t.mergeRecursively(this.getDefaultOptions(),e),this.modalOptions=e,null!=localStorage.getItem("cookiesManagerOptions")){var o=t.prepareObjectsForComparison(this.modalOptions.cookieCategories,this.getCookiesOptions());t.objectEquals(o.A,o.B)?(this.modalOptions.cookieCategories=this.getCookiesOptions(),this.injectScripts()):this.configChanged=!0}null!=e.modalOptions&&this.createModal(e.modalOptions),null!=e.bannerOptions&&this.createBanner(e.bannerOptions)}setEventListeners(){this.modal.setEventListeners(),this.banner.setEventListeners()}createBanner(t){return this.banner=new e(this,t),this.banner}createModal(t){return this.modal=new o(this,t),this.modal}acceptAllButton(){this.acceptAll=!0,this.modal.hide(),this.banner.hide(),this.injectScripts(),this.saveCookieOptions()}showModal(){this.modal.show()}showBanner(){this.banner.show()}hideBanner(){this.banner.hide()}hideModal(){this.modal.hide()}injectScript(t,e=!1){var o=document.createElement("script");o.setAttribute("src",t),o.async=e,document.body.appendChild(o)}injectGTM(t){try{!function(t,e,o,n,s){t[n]=t[n]||[],t[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});const i=e.getElementsByTagName(o)[0],c=e.createElement(o);c.src=`https://www.googletagmanager.com/gtm.js?id=${s}`,i.parentNode.insertBefore(c,i)}(window,document,"script","dataLayer",t),window.dataLayer=window.dataLayer||[]}catch(t){console.log("There was an error loading GTM.")}}init(t,e){this.modalOptions.askOnce?(null==localStorage.getItem("cookiesManagerOptions")||this.configChanged)&&(t&&this.showBanner(),e&&this.showModal()):(t&&this.showBanner(),e&&this.showModal())}injectScripts(){this.modalOptions.cookieCategories.forEach(t=>{(t.checked||this.acceptAll)&&t.scripts.forEach(t=>{if(t.type==s.STANDARD||null==t.type)null!=t.scriptSrc&&this.injectScript(t.scriptSrc,t.async);else{if(null==t.gtmCode)throw new Error("You should provide a gtmCode for the script");this.injectGTM(t.gtmCode)}})})}saveButton(){this.saveCookieOptions()}saveCookieOptions(){const e=t.encode(JSON.stringify(this.modalOptions.cookieCategories));localStorage.setItem("cookiesManagerOptions",e)}getCookiesOptions(){return JSON.parse(t.decode(localStorage.getItem("cookiesManagerOptions")))}getDefaultOptions(){return{askOnce:!0,askOnChange:!0,modalOptions:{title:"Cookie settings",description:"Change the settings for the cookies here.",inject:!0,acceptAllButton:{text:"Accept all",show:!0},saveButton:{text:"Save",show:!0},closeButton:{text:"Close",show:!0}},bannerOptions:{inject:!0,wall:!0,wallScroll:!1,wallBlur:!0,bannerText:"This website uses cookies to ensure you get the best experience on our website.",acceptAllButton:{text:"Accept all",show:!0},settingsButton:{text:"Settings",show:!0},acceptRequiredOnlyButton:{text:"Configuración",show:!1},rejectAllButton:{text:"Configuración",show:!1}},cookieCategories:[]}}}var s;!function(t){t[t.GTM=0]="GTM",t[t.STANDARD=1]="STANDARD"}(s||(s={}));export{n as CookiesManager,s as ScriptType};
//# sourceMappingURL=index.modern.mjs.map
