!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((n||self).cookiesBanner={})}(this,function(n){var e,t=/*#__PURE__*/function(){function n(){}return n.isHTML=function(n){var e=RegExp.prototype.test.bind(/(<([^>]+)>)/i);return n.match(e)},n.wrapString=function(n,e){return"<"+e+">"+n+"</"+e+">"},n}(),o=/*#__PURE__*/function(){function n(n,e){this.options=void 0,this.banner=void 0,this.cookiesManager=void 0,this.cookiesManager=n,this.options=e,console.log("Setting options:"),console.log(e),this.injectBanner(),this.setEventListeners()}var e=n.prototype;return e.setEventListeners=function(){var n=this;document.querySelector(".banner-container__accept-all-btn").addEventListener("click",function(){n.cookiesManager.acceptAllButton()}),document.querySelector(".banner-container__config-btn").addEventListener("click",function(){n.options.settingsButton.modal.show()})},e.generateBanner=function(){return'\n                <div class="c-cookies-config-banner">\n            <div class="banner-container">\n            '+this.getBannerText()+'\n            <div class="banner-container__buttons">\n                <button class="banner-container__button banner-container__accept-all-btn">'+this.getAcceptAllButtonText()+'</button>\n                <button class="banner-container__button-link banner-container__config-btn">Configurar</button>\n            </div>\n            </div>\n        </div> \n        '},e.getBannerText=function(){return null!=this.options.bannerText?t.isHTML(this.options.bannerText)?this.options.bannerText:t.wrapString(this.options.bannerText,"p"):'\n                <p>Utilizamos cookies propias y de terceros para analizar el tráfico en nuestra web mediante la obtención de los\n                        datos necesarios para estudiar tu navegación. Puedes obtener más información en la Política de Cookies. Puedes\n                        aceptar todas las cookies pulsando el botón “Aceptar" o configurarlas o rechazar su uso pulsando en\n                        "Configurar".</p>\n                '},e.getAcceptAllButtonText=function(){return console.log("Get banner text"),null!=this.options.acceptAllButton.text?this.options.acceptAllButton.text:"Aceptar todo"},e.injectBanner=function(){null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateBanner())},e.showWall=function(){document.querySelector("body").insertAdjacentHTML("afterend",'<div class="c-cookies-config-wall"></div>')},e.hideWall=function(){document.querySelector(".c-cookies-config-wall").style.display="none"},e.hideScroll=function(){document.querySelector("body").style.overflow="hidden"},e.showScroll=function(){document.querySelector("body").style.overflow="auto"},e.show=function(){this.options.wall&&this.showWall(),this.options.wallScroll||this.hideScroll(),document.querySelector(".c-cookies-config-banner").style.display="block"},e.hide=function(){document.querySelector(".c-cookies-config-banner").style.display="none",this.hideWall(),this.showScroll()},n}(),i=/*#__PURE__*/function(){function n(n,e){this.options=void 0,this.cookiesManager=void 0,this.cookiesManager=n,this.options=e,this.injectModal(),this.setEventListeners()}var e=n.prototype;return e.show=function(){document.getElementById("modal-container").classList.add("show-modal"),document.querySelector("body").style.overflow="hidden"},e.hide=function(){document.getElementById("modal-container").classList.remove("show-modal")},e.setEventListeners=function(){var n=this,e=this;document.querySelectorAll(".close-modal").forEach(function(e){return e.addEventListener("click",n.hide)}),document.querySelectorAll(".modal__button-accept-all").forEach(function(n){n.addEventListener("click",function(){e.cookiesManager.acceptAllButton()})}),document.querySelectorAll(".modal__button-save-btn").forEach(function(n){n.addEventListener("click",function(){e.cookiesManager.injectScripts(),e.cookiesManager.hideBanner()})}),this.cookiesManager.getOptions().cookieCategories.forEach(function(n,e){document.querySelector(".cm-switch-"+e).addEventListener("change",function(){n.checked=!!this.checked})})},e.injectModal=function(){null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateModal())},e.generateCategoriesBlocks=function(){var n="";return this.cookiesManager.getOptions().cookieCategories.forEach(function(e,t){var o=e.required?"disabled":"";n+='\n            <div class="cookie-category">\n                <div class="cookie-category__header header">\n                    <h2 class="header__title">\n                    '+e.title+'\n                    </h2>\n                    <div class="header__switch">\n                    <label class="switch '+o+'">\n                        <input '+o+' checked class="cm-switch-'+t+'" type="checkbox">\n                        <span class="slider round"></span>\n                    </label>\n                    </div>\n                </div>\n            <div class="cookie-category__body body">\n                <p>'+e.description+"</p>\n            </div>\n            </div>\n            "}),n},e.generateModal=function(){return'\n        <div class="c-cookies-config-modal">\n        <div class="modal__container" id="modal-container">\n          <div class="modal__content">\n            <div class="modal__close close-modal" title="Close">\n              <img class="close-modal-img" src="images/content/close.svg" alt="Webpack 5 Template Boilerplate">\n            </div>\n    \n            <img src="assets/img/star-trophy.png" alt="" class="modal__img">\n    \n            <h1 class="modal__title">Configuración de cookies</h1>\n            <p class="modal__description">Configura aquí tus cookies.</p>\n            <div class="modal__cookie-categories">\n                '+this.generateCategoriesBlocks()+'\n            </div>\n    \n            <div class="modal__footer">\n              <button class="modal__button modal__button-width modal__button-accept-all">\n                Aceptar todas\n              </button>\n    \n              <button class="modal__button-link close-modal modal__button-save-btn">\n                Guardar\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n        '},n}(),c=/*#__PURE__*/function(){var n=e.prototype;function e(n){if(this.modalOptions=void 0,this.banner=void 0,this.modal=void 0,this.acceptAll=!1,null==n)throw new Error("Options cannot be null");n.cookieCategories.forEach(function(n){n.checked=!0}),this.modalOptions=n}return n.getBanner=function(){return this.banner},n.setBanner=function(n){this.banner=n},n.getModal=function(){return this.modal},n.setModal=function(n){this.modal=n},n.getOptions=function(){return this.modalOptions},n.createBanner=function(n){return this.banner=new o(this,n),this.banner},n.createModal=function(n){return this.modal=new i(this,n),this.modal},n.acceptAllButton=function(){this.acceptAll=!0,this.modal.hide(),this.banner.hide(),this.injectScripts()},n.hideBanner=function(){this.banner.hide()},n.hideModal=function(){this.modal.hide()},n.injectScript=function(n,e){var t=document.createElement("script");t.setAttribute("src",n),t.async=e,document.body.appendChild(t)},n.injectScripts=function(){var n=this;this.modalOptions.cookieCategories.forEach(function(e){(e.checked||n.acceptAll)&&e.scripts.forEach(function(e){console.log("injecting script: "+e.scriptSrc),n.injectScript(e.scriptSrc,e.async)})})},e}();n.ScriptType=void 0,(e=n.ScriptType||(n.ScriptType={}))[e.GTM=0]="GTM",e[e.STANDARD=1]="STANDARD",n.CookiesManager=c});
//# sourceMappingURL=index.umd.js.map
