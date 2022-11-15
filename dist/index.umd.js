!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((n||self).cookiesBanner={})}(this,function(n){var t,e=/*#__PURE__*/function(){function n(){}return n.encode=function(n){return window.btoa(n)},n.decode=function(n){return window.atob(n)},n.isHTML=function(n){var t=RegExp.prototype.test.bind(/(<([^>]+)>)/i);return n.match(t)},n.wrapString=function(n,t){return"<"+t+">"+n+"</"+t+">"},n.deepEqual=function(n,t){var e=this,o=Object.keys,i=typeof n;return n&&t&&"object"===i&&i===typeof t?o(n).length===o(t).length&&o(n).every(function(o){return e.deepEqual(n[o],t[o])}):n===t},n.compareObjects=function(n,t){var e=function n(t){return Object.entries(t).sort().map(function(t){return t[1]instanceof Object&&(t[1]=n(t[1])),t})};return JSON.stringify(e(n))===JSON.stringify(e(t))},n.objectEquals=function(n,t){var e=function(n){var t={};return JSON.stringify(n,function(n,e){return t[n]=null,e}),JSON.stringify(n,Object.keys(t).sort())};return e(n)===e(t)},n.prepareObjectsForComparison=function(n,t){var e=JSON.parse(JSON.stringify(n)),o=JSON.parse(JSON.stringify(t));return e.forEach(function(n){n.checked=!0}),o.forEach(function(n){n.checked=!0}),{A:e,B:o}},n}(),o=/*#__PURE__*/function(){function n(n,t){this.options=void 0,this.banner=void 0,this.cookiesManager=void 0,this.cookiesManager=n,this.options=t,this.injectBanner(),this.setEventListeners()}var t=n.prototype;return t.setEventListeners=function(){var n=this;document.querySelector(".banner-container__accept-all-btn").addEventListener("click",function(){n.cookiesManager.acceptAllButton()}),document.querySelector(".banner-container__config-btn").addEventListener("click",function(){n.options.settingsButton.modal.show()})},t.generateBanner=function(){return'\n                <div class="c-cookies-config-banner">\n            <div class="banner-container">\n            '+this.getBannerText()+'\n            <div class="banner-container__buttons">\n                <button class="banner-container__button banner-container__accept-all-btn">'+this.getAcceptAllButtonText()+'</button>\n                <button class="banner-container__button-link banner-container__config-btn">Configurar</button>\n            </div>\n            </div>\n        </div> \n        '},t.getBannerText=function(){return null!=this.options.bannerText?e.isHTML(this.options.bannerText)?this.options.bannerText:e.wrapString(this.options.bannerText,"p"):'\n                <p>Utilizamos cookies propias y de terceros para analizar el tráfico en nuestra web mediante la obtención de los\n                        datos necesarios para estudiar tu navegación. Puedes obtener más información en la Política de Cookies. Puedes\n                        aceptar todas las cookies pulsando el botón “Aceptar" o configurarlas o rechazar su uso pulsando en\n                        "Configurar".</p>\n                '},t.getAcceptAllButtonText=function(){return null!=this.options.acceptAllButton.text?this.options.acceptAllButton.text:"Aceptar todo"},t.injectBanner=function(){null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateBanner())},t.showWall=function(){document.querySelector("body").insertAdjacentHTML("afterend",'<div class="c-cookies-config-wall"></div>')},t.hideWall=function(){document.querySelector(".c-cookies-config-wall").style.display="none"},t.hideScroll=function(){document.querySelector("body").style.overflow="hidden"},t.showScroll=function(){document.querySelector("body").style.overflow="auto"},t.show=function(){this.options.wall&&this.showWall(),this.options.wallScroll||this.hideScroll(),document.querySelector(".c-cookies-config-banner .banner-container").classList.add("show-banner")},t.hide=function(){document.querySelector(".c-cookies-config-banner").style.display="none",this.hideWall(),this.showScroll()},n}(),i=/*#__PURE__*/function(){function n(n,t){this.options=void 0,this.cookiesManager=void 0,this.cookiesManager=n,this.options=t,this.injectModal(),this.setEventListeners()}var t=n.prototype;return t.show=function(){document.getElementById("modal-container").classList.add("show-modal"),document.querySelector("body").style.overflow="hidden"},t.hide=function(){document.getElementById("modal-container").classList.remove("show-modal")},t.setEventListeners=function(){var n=this,t=this;document.querySelectorAll(".close-modal").forEach(function(t){return t.addEventListener("click",n.hide)}),document.querySelectorAll(".modal__button-accept-all").forEach(function(n){n.addEventListener("click",function(){t.cookiesManager.acceptAllButton()})}),document.querySelectorAll(".modal__button-save-btn").forEach(function(n){n.addEventListener("click",function(){t.cookiesManager.injectScripts(),t.cookiesManager.hideBanner(),t.cookiesManager.saveButton()})}),this.cookiesManager.getOptions().cookieCategories.forEach(function(n,t){document.querySelector(".cm-switch-"+t).addEventListener("change",function(){n.checked=!!this.checked})})},t.injectModal=function(){null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateModal())},t.generateCategoriesBlocks=function(){var n="";return this.cookiesManager.getOptions().cookieCategories.forEach(function(t,e){var o=t.required?"disabled":"";n+='\n            <div class="cookie-category">\n                <div class="cookie-category__header header">\n                    <h2 class="header__title">\n                    '+t.title+'\n                    </h2>\n                    <div class="header__switch">\n                    <label class="switch '+o+'">\n                        <input '+o+' checked class="cm-switch-'+e+'" type="checkbox">\n                        <span class="slider round"></span>\n                    </label>\n                    </div>\n                </div>\n            <div class="cookie-category__body body">\n                <p>'+t.description+"</p>\n            </div>\n            </div>\n            "}),n},t.generateModal=function(){return'\n        <div class="c-cookies-config-modal">\n        <div class="modal__container" id="modal-container">\n          <div class="modal__content">\n            <div class="modal__close close-modal" title="Close">\n              <img class="close-modal-img" src="images/content/close.svg" alt="Webpack 5 Template Boilerplate">\n            </div>\n        \n            <h1 class="modal__title">Configuración de cookies</h1>\n            <p class="modal__description">Configura aquí tus cookies.</p>\n            <div class="modal__cookie-categories">\n                '+this.generateCategoriesBlocks()+'\n            </div>\n    \n            <div class="modal__footer">\n              <button class="modal__button modal__button-width modal__button-accept-all">\n                Aceptar todas\n              </button>\n    \n              <button class="modal__button-link close-modal modal__button-save-btn">\n                Guardar\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n        '},n}(),a=/*#__PURE__*/function(){var t=a.prototype;function a(n){if(this.modalOptions=void 0,this.banner=void 0,this.modal=void 0,this.acceptAll=!1,this.configChanged=!1,null==n)throw new Error("Options cannot be null");if(n.cookieCategories.forEach(function(n){n.checked=!0}),this.modalOptions=n,null!=localStorage.getItem("cookiesManagerOptions")){var t=e.prepareObjectsForComparison(this.modalOptions.cookieCategories,this.getCookiesOptions());e.objectEquals(t.A,t.B)?(this.modalOptions.cookieCategories=this.getCookiesOptions(),this.injectScripts()):this.configChanged=!0}null!=n.modalOptions&&this.createModal(n.modalOptions),null!=n.bannerOptions&&(null!=n.modalOptions&&(n.bannerOptions.settingsButton.modal=this.modal),this.createBanner(n.bannerOptions))}return t.getBanner=function(){return this.banner},t.setBanner=function(n){this.banner=n},t.getModal=function(){return this.modal},t.setModal=function(n){this.modal=n},t.getOptions=function(){return this.modalOptions},t.createBanner=function(n){return this.banner=new o(this,n),this.banner},t.createModal=function(n){return this.modal=new i(this,n),this.modal},t.acceptAllButton=function(){this.acceptAll=!0,this.modal.hide(),this.banner.hide(),this.injectScripts(),this.saveCookieOptions()},t.showModal=function(){this.modal.show()},t.showBanner=function(){this.banner.show()},t.hideBanner=function(){this.banner.hide()},t.hideModal=function(){this.modal.hide()},t.injectScript=function(n,t){var e=document.createElement("script");e.setAttribute("src",n),e.async=t,document.body.appendChild(e)},t.injectGTM=function(n){try{!function(n,t,e,o,i){n[o]=n[o]||[],n[o].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var a=t.getElementsByTagName(e)[0],s=t.createElement(e);s.src="https://www.googletagmanager.com/gtm.js?id="+i,a.parentNode.insertBefore(s,a)}(window,document,"script","dataLayer",n),window.dataLayer=window.dataLayer||[]}catch(n){console.log("There was an error loading GTM.")}},t.init=function(n,t){this.modalOptions.askOnce?(null==localStorage.getItem("cookiesManagerOptions")||this.modalOptions.askOnChange&&this.configChanged)&&(n&&this.showBanner(),t&&this.showModal()):(n&&this.showBanner(),t&&this.showModal())},t.injectScripts=function(){var t=this;this.modalOptions.cookieCategories.forEach(function(e){(e.checked||t.acceptAll)&&e.scripts.forEach(function(e){e.type==n.ScriptType.STANDARD||null==e.type?t.injectScript(e.scriptSrc,e.async):t.injectGTM(e.gtmCode)})})},t.saveButton=function(){this.saveCookieOptions()},t.saveCookieOptions=function(){var n=e.encode(JSON.stringify(this.modalOptions.cookieCategories));localStorage.setItem("cookiesManagerOptions",n)},t.getCookiesOptions=function(){return JSON.parse(e.decode(localStorage.getItem("cookiesManagerOptions")))},a}();n.ScriptType=void 0,(t=n.ScriptType||(n.ScriptType={}))[t.GTM=0]="GTM",t[t.STANDARD=1]="STANDARD",n.CookiesManager=a});
//# sourceMappingURL=index.umd.js.map
