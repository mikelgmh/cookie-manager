class e{static encode(e){return window.btoa(e)}static decode(e){return window.atob(e)}static isHTML(e){var t=RegExp.prototype.test.bind(/(<([^>]+)>)/i);return e.match(t)}static wrapString(e,t){return this.isHTML(e)?e:`<${t}>${e}</${t}>`}static deepEqual(e,t){const o=Object.keys,n=typeof e;return e&&t&&"object"===n&&n===typeof t?o(e).length===o(t).length&&o(e).every(o=>this.deepEqual(e[o],t[o])):e===t}static compareObjects(e,t){let o=e=>Object.entries(e).sort().map(e=>(e[1]instanceof Object&&(e[1]=o(e[1])),e));return JSON.stringify(o(e))===JSON.stringify(o(t))}static objectEquals(e,t){const o=e=>{const t={};return JSON.stringify(e,(e,o)=>(t[e]=null,o)),JSON.stringify(e,Object.keys(t).sort())};return o(e)===o(t)}static prepareObjectsForComparison(e,t){var o=JSON.parse(JSON.stringify(e)),n=JSON.parse(JSON.stringify(t));return o.forEach(e=>{e.checked=!0}),n.forEach(e=>{e.checked=!0}),{A:o,B:n}}static mergeRecursively(e,t){for(var o in t)try{e[o]=t[o].constructor==Object?this.mergeRecursively(e[o],t[o]):t[o]}catch(n){e[o]=t[o]}return e}}class t{constructor(e,t){this.options=void 0,this.banner=void 0,this.cookiesManager=void 0,this.cookiesManager=e,this.options=t,e.getOptions().bannerOptions.inject&&this.injectBanner(),e.getOptions().bannerOptions.injectWall&&this.injectWall(),this.setEventListeners()}setEventListeners(){try{let e=this;document.querySelector(".cm-banner-accept-all-btn").addEventListener("click",function(){e.cookiesManager.acceptAllButton()}),document.querySelector(".cm-banner-config-btn").addEventListener("click",function(){e.cookiesManager.showModal()})}catch(e){console.error("Can't set the event listener for the cookies banner. Can't find the HTML elements.")}}generateBanner(){return`\n                <div class="c-cookies-config-banner">\n                    <div class="banner-container">\n                        ${this.getBannerText()}\n                        <div class="banner-container__buttons">\n                            ${this.getAcceptAllButton()}\n                            ${this.getSettingsButton()}\n                        </div>\n                    </div>\n                </div> \n                `}getAcceptAllButton(){return this.options.acceptAllButton.show?`<button class="banner-container__button banner-container__accept-all-btn cm-banner-accept-all-btn">${this.options.acceptAllButton.text}</button>`:""}getSettingsButton(){return this.options.settingsButton.show?`<button class="banner-container__button-link banner-container__config-btn cm-banner-config-btn">${this.options.settingsButton.text}</button>`:""}getBannerText(){return e.wrapString(this.options.bannerText,"p")}injectWall(){try{null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateWall())}catch(e){console.error("Couldn't inject the wall.")}}injectBanner(){try{null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateBanner())}catch(e){console.error("Couldn't inject the banner.")}}generateWall(){return`<div class="c-cookies-config-wall ${this.options.wallBlur?"c-cookies-config-wall--blurred":""}"></div>`}showWall(){try{document.querySelector(".c-cookies-config-wall").classList.add("wall-show")}catch(e){console.error("Couldn't apply the background wall.")}}hideWall(){try{document.querySelector(".c-cookies-config-wall").classList.remove("wall-show")}catch(e){console.error("Unable to hide the background wall.")}}hideScroll(){try{document.querySelector("body").style.overflow="hidden",document.querySelector("html").style.overflow="hidden"}catch(e){console.error("Unable to hide the scroll.")}}showScroll(){try{document.querySelector("body").style.overflow="auto",document.querySelector("html").style.overflow="auto"}catch(e){console.error("Unable to show the scroll.")}}show(){this.options.wall&&this.showWall(),this.options.wallScroll||this.hideScroll();try{document.querySelector(".c-cookies-config-banner .banner-container").classList.add("show-banner")}catch(e){console.error("Unable to show the banner.")}}hide(){try{document.querySelector(".c-cookies-config-banner").style.display="none"}catch(e){console.error("Unable to hide the banner.")}this.hideWall(),this.showScroll()}}class o{constructor(e,t){this.options=void 0,this.cookiesManager=void 0,this.cookiesManager=e,this.options=t,e.getOptions().modalOptions.inject&&this.injectModal(),this.setEventListeners()}async show(){try{document.querySelector(".c-cookies-config-modal").classList.add(this.options.showModalClass),await new Promise(e=>setTimeout(e,10));var e,t=document.getElementsByClassName("cm-accordion");for(e=0;e<t.length;e++)t[e].classList.contains("cm-active-on-load")&&(t[e].classList.remove("cm-active-on-load"),await new Promise(e=>setTimeout(e,100)),this.toggleAccordion(t[e]));document.getElementById("modal-container").classList.add(this.options.showModalClass),document.querySelector("body").style.overflow="hidden",document.querySelector("html").style.overflow="hidden"}catch(e){console.error("Could not show cookie modal."),console.error(e)}}hide(e){document.getElementById("modal-container").classList.remove(this.options.showModalClass);const t=document.querySelector(".c-cookies-config-banner .banner-container");0==(null==t?void 0:t.classList.contains("show-banner"))&&this.cookiesManager.getBanner().showScroll()}setEventListeners(){try{var e=this;document.querySelectorAll(".close-modal").forEach(t=>t.addEventListener("click",()=>{this.hide(e)})),document.querySelector(".cm-modal-accept-all").addEventListener("click",function(){e.cookiesManager.acceptAllButton()}),document.querySelector(".cm-modal-save").addEventListener("click",function(){e.cookiesManager.injectScripts(),e.cookiesManager.hideBanner(),e.cookiesManager.saveButton()}),this.cookiesManager.getOptions().cookieCategories.forEach((e,t)=>{document.querySelector(`.cm-switch-${t}`).addEventListener("change",function(){e.checked=!!this.checked})});var t,o=document.getElementsByClassName("cm-accordion");for(e=this,t=0;t<o.length;t++)o[t].addEventListener("click",function(){e.toggleAccordion(this)})}catch(e){console.error("Could not set event listeners for cookie modal.")}}async toggleAccordion(e){e.classList.toggle("cm-active");var t=e.nextElementSibling;t.style.maxHeight=t.style.maxHeight?null:t.scrollHeight+"px"}injectModal(){try{null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateModal())}catch(e){console.error("Could not inject cookie modal.")}}generateCategoriesBlocks(){let e="",t=this.cookiesManager.getOptions().cookieCategories;return null!=localStorage.getItem("cookiesManagerOptions")&&(t=this.cookiesManager.getCookiesOptions()),t.forEach((t,o)=>{const n=t.required?"disabled":"";e+=`\n            <div class="cookie-category">\n                <div class="cookie-category__header cc-header ${t.accordion.enable?"cm-accordion":""} ${t.boxedHeader?"cm-boxed":""} ${t.accordion.active?"cm-active-on-load":""}">\n                    ${t.accordion.enable?"<div class='cc-header__left'></div>":""}\n                    <div class="cc-header__right">\n                        <div class="header__title">\n                            ${t.title}\n                        </div>\n                        <div class="header__switch">\n                            <label class="switch ${n}">\n                                <input ${n} ${t.checked?"checked":""} class="cm-switch-${o}" type="checkbox">\n                                <span class="slider round ${n}"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class="cookie-category__body body ${t.boxedBody?"cookie-category__body--boxed":""} ${t.accordion.enable?"cm-panel":""}">\n                    <p>${t.description}</p>\n                </div>\n            </div>\n            `}),e}getCloseButton(){return this.options.closeButton.show?'<div class="modal__close close-modal" title="Close"><div class="close-modal-img"></div></div>':""}getAcceptAllButton(){return this.options.acceptAllButton.show?`<button class="modal__button modal__button-width cm-modal-accept-all modal__button-accept-all">${this.options.acceptAllButton.text}</button>`:""}getSaveButton(){return this.options.saveButton.show?` <button class="modal__button-link close-modal cm-modal-save modal__button-save-btn"> ${this.options.saveButton.text} </button>`:""}generateModal(){return`\n        <div class="c-cookies-config-modal">\n        <div class="modal__container" id="modal-container">\n          <div class="modal__content">\n            ${this.getCloseButton()}\n            <div class="modal__title">${this.options.title}</div>\n            <p class="modal__description">${this.options.description}</p>\n            <div class="modal__cookie-categories">\n                ${this.generateCategoriesBlocks()}\n            </div>\n    \n            <div class="modal__footer">\n             ${this.getAcceptAllButton()}\n             ${this.getSaveButton()}\n            </div>\n          </div>\n        </div>\n      </div>\n        `}}class n{getBanner(){return this.banner}setBanner(e){this.banner=e}getModal(){return this.modal}setModal(e){this.modal=e}getOptions(){return this.modalOptions}on(e,t){"onCookieCategoryChange"==e&&(this.onCookieCategoryChange=t)}constructor(t){if(this.modalOptions=void 0,this.banner=void 0,this.modal=void 0,this.acceptAll=!1,this.configChanged=!1,this.onCookieCategoryChange=void 0,null==t)throw new Error("Options for CookiesManager cannot be null.");{if(null==t.cookieCategories)throw new Error("You should provide at least one cookie category");const o=new Array;t.cookieCategories.forEach(t=>{t.checked=!0,o.push(e.mergeRecursively(this.getDefaultCookieCategoryOptions(),t))}),t.cookieCategories=o,t=e.mergeRecursively(this.getDefaultOptions(),t),this.modalOptions=t,this.constructorInitializationFunction(t)}}constructorInitializationFunction(t){if(null!=localStorage.getItem("cookiesManagerOptions")){var o=e.prepareObjectsForComparison(this.modalOptions.cookieCategories,this.getCookiesOptions());e.objectEquals(o.A,o.B)?this.modalOptions.cookieCategories=this.getCookiesOptions():(localStorage.removeItem("cookiesManagerOptions"),this.configChanged=!0)}null!=t.modalOptions&&this.createModal(t.modalOptions),null!=t.bannerOptions&&this.createBanner(t.bannerOptions)}setEventListeners(){this.modal.setEventListeners(),this.banner.setEventListeners()}createBanner(e){return this.banner=new t(this,e),this.banner}createModal(e){return this.modal=new o(this,e),this.modal}acceptAllButton(){this.getOptions().cookieCategories.forEach(e=>{e.checked=!0}),this.acceptAll=!0,this.modal.hide(),this.banner.hide(),this.injectScripts(),this.saveCookieOptions()}showModal(){this.modal.show()}showBanner(){this.banner.show()}hideBanner(){this.banner.hide()}hideModal(){this.modal.hide()}injectScript(e,t=!1){var o=document.createElement("script");o.setAttribute("src",e),o.async=t,document.body.appendChild(o)}injectGTM(e){try{!function(e,t,o,n,i){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});const s=t.getElementsByTagName(o)[0],c=t.createElement(o);c.src=`https://www.googletagmanager.com/gtm.js?id=${i}`,s.parentNode.insertBefore(c,s)}(window,document,"script","dataLayer",e),window.dataLayer=window.dataLayer||[]}catch(e){console.error("Couldn't inject GTM.")}}async init(e,t){this.modalOptions.askOnce?(null==localStorage.getItem("cookiesManagerOptions")||this.configChanged)&&await this.initShow(e,t):await this.initShow(e,t),null!=localStorage.getItem("cookiesManagerOptions")&&this.injectScripts()}async initShow(e,t){this.modalOptions.delay>0&&await new Promise(e=>setTimeout(e,this.modalOptions.delay)),e&&this.showBanner(),t&&this.showModal()}injectScripts(){try{this.modalOptions.cookieCategories.forEach(e=>{null!=this.onCookieCategoryChange&&this.onCookieCategoryChange(e),(e.checked||this.acceptAll)&&e.scripts.forEach(e=>{if(e.type==i.STANDARD||null==e.type)null!=e.scriptSrc&&this.injectScript(e.scriptSrc,e.async);else{if(null==e.gtmCode)throw new Error("You should provide a gtmCode for the script");this.injectGTM(e.gtmCode)}})})}catch(e){console.error(`Couldn't inject scripts: ${e}`)}}saveButton(){this.saveCookieOptions()}saveCookieOptions(){const t=e.encode(JSON.stringify(this.modalOptions.cookieCategories));localStorage.setItem("cookiesManagerOptions",t)}getCookiesOptions(){return null!=localStorage.getItem("cookiesManagerOptions")?JSON.parse(e.decode(localStorage.getItem("cookiesManagerOptions"))):{}}getDefaultCookieCategoryOptions(){return{title:"Cookie Category Example",description:"Cookie category description",required:!1,checked:!0,accordion:{enable:!1,enableOnDescriptionLength:45,active:!1},boxedHeader:!1,boxedBody:!1,scripts:[]}}getDefaultOptions(){return{askOnce:!0,delay:0,askOnChange:!0,initOnDomContentLoaded:!0,modalOptions:{title:"Cookie settings",description:"Change the settings for the cookies here.",inject:!0,showModalClass:"show-modal",acceptAllButton:{text:"Accept all",show:!0},saveButton:{text:"Save",show:!0},closeButton:{text:"Close",show:!0}},bannerOptions:{inject:!0,injectWall:!0,wall:!0,wallScroll:!1,wallBlur:!0,bannerText:"This website uses cookies to ensure you get the best experience on our website.",acceptAllButton:{text:"Accept all",show:!0},settingsButton:{text:"Settings",show:!0},acceptRequiredOnlyButton:{text:"Configuración",show:!1},rejectAllButton:{text:"Configuración",show:!1}},cookieCategories:[]}}}var i;!function(e){e[e.GTM=0]="GTM",e[e.STANDARD=1]="STANDARD"}(i||(i={}));export{n as CookiesManager,i as ScriptType};
//# sourceMappingURL=index.modern.mjs.map
