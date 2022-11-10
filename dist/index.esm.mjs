var n,t=/*#__PURE__*/function(){function n(){}return n.isHTML=function(n){var t=RegExp.prototype.test.bind(/(<([^>]+)>)/i);return n.match(t)},n.wrapString=function(n,t){return"<"+t+">"+n+"</"+t+">"},n}(),e=/*#__PURE__*/function(){function n(n,t){this.options=void 0,this.banner=void 0,this.cookiesManager=void 0,this.cookiesManager=n,this.options=t,console.log("Setting options:"),console.log(t),this.injectBanner(),this.setEventListeners()}var e=n.prototype;return e.setEventListeners=function(){var n=this;document.querySelector(".banner-container__accept-all-btn").addEventListener("click",function(){n.cookiesManager.acceptAllButton()}),document.querySelector(".banner-container__config-btn").addEventListener("click",function(){n.options.settingsButton.modal.show()})},e.generateBanner=function(){return'\n                <div class="c-cookies-config-banner">\n            <div class="banner-container">\n            '+this.getBannerText()+'\n            <div class="banner-container__buttons">\n                <button class="banner-container__button banner-container__accept-all-btn">'+this.getAcceptAllButtonText()+'</button>\n                <button class="banner-container__button-link banner-container__config-btn">Configurar</button>\n            </div>\n            </div>\n        </div> \n        '},e.getBannerText=function(){return null!=this.options.bannerText?t.isHTML(this.options.bannerText)?this.options.bannerText:t.wrapString(this.options.bannerText,"p"):'\n                <p>Utilizamos cookies propias y de terceros para analizar el tráfico en nuestra web mediante la obtención de los\n                        datos necesarios para estudiar tu navegación. Puedes obtener más información en la Política de Cookies. Puedes\n                        aceptar todas las cookies pulsando el botón “Aceptar" o configurarlas o rechazar su uso pulsando en\n                        "Configurar".</p>\n                '},e.getAcceptAllButtonText=function(){return console.log("Get banner text"),null!=this.options.acceptAllButton.text?this.options.acceptAllButton.text:"Aceptar todo"},e.injectBanner=function(){null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateBanner())},e.showWall=function(){document.querySelector("body").insertAdjacentHTML("afterend",'<div class="c-cookies-config-wall"></div>')},e.hideWall=function(){document.querySelector(".c-cookies-config-wall").style.display="none"},e.hideScroll=function(){document.querySelector("body").style.overflow="hidden"},e.showScroll=function(){document.querySelector("body").style.overflow="auto"},e.show=function(){this.options.wall&&this.showWall(),this.options.wallScroll||this.hideScroll(),document.querySelector(".c-cookies-config-banner").style.display="block"},e.hide=function(){document.querySelector(".c-cookies-config-banner").style.display="none",this.hideWall(),this.showScroll()},n}(),o=/*#__PURE__*/function(){function n(n,t){this.options=void 0,this.cookiesManager=void 0,this.cookiesManager=n,this.options=t,this.injectModal(),this.setEventListeners()}var t=n.prototype;return t.show=function(){document.getElementById("modal-container").classList.add("show-modal"),document.querySelector("body").style.overflow="hidden"},t.hide=function(){document.getElementById("modal-container").classList.remove("show-modal")},t.setEventListeners=function(){var n=this,t=this;document.querySelectorAll(".close-modal").forEach(function(t){return t.addEventListener("click",n.hide)}),document.querySelectorAll(".modal__button-accept-all").forEach(function(n){n.addEventListener("click",function(){t.cookiesManager.acceptAllButton()})}),document.querySelectorAll(".modal__button-save-btn").forEach(function(n){n.addEventListener("click",function(){t.cookiesManager.injectScripts(),t.cookiesManager.hideBanner()})}),this.cookiesManager.getOptions().cookieCategories.forEach(function(n,t){document.querySelector(".cm-switch-"+t).addEventListener("change",function(){n.checked=!!this.checked})})},t.injectModal=function(){null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateModal())},t.generateCategoriesBlocks=function(){var n="";return this.cookiesManager.getOptions().cookieCategories.forEach(function(t,e){var o=t.required?"disabled":"";n+='\n            <div class="cookie-category">\n                <div class="cookie-category__header header">\n                    <h2 class="header__title">\n                    '+t.title+'\n                    </h2>\n                    <div class="header__switch">\n                    <label class="switch '+o+'">\n                        <input '+o+' checked class="cm-switch-'+e+'" type="checkbox">\n                        <span class="slider round"></span>\n                    </label>\n                    </div>\n                </div>\n            <div class="cookie-category__body body">\n                <p>'+t.description+"</p>\n            </div>\n            </div>\n            "}),n},t.generateModal=function(){return'\n        <div class="c-cookies-config-modal">\n        <div class="modal__container" id="modal-container">\n          <div class="modal__content">\n            <div class="modal__close close-modal" title="Close">\n              <img class="close-modal-img" src="images/content/close.svg" alt="Webpack 5 Template Boilerplate">\n            </div>\n    \n            <img src="assets/img/star-trophy.png" alt="" class="modal__img">\n    \n            <h1 class="modal__title">Configuración de cookies</h1>\n            <p class="modal__description">Configura aquí tus cookies.</p>\n            <div class="modal__cookie-categories">\n                '+this.generateCategoriesBlocks()+'\n            </div>\n    \n            <div class="modal__footer">\n              <button class="modal__button modal__button-width modal__button-accept-all">\n                Aceptar todas\n              </button>\n    \n              <button class="modal__button-link close-modal modal__button-save-btn">\n                Guardar\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n        '},n}(),i=/*#__PURE__*/function(){var n=t.prototype;function t(n){if(this.modalOptions=void 0,this.banner=void 0,this.modal=void 0,this.acceptAll=!1,null==n)throw new Error("Options cannot be null");n.cookieCategories.forEach(function(n){n.checked=!0}),this.modalOptions=n}return n.getBanner=function(){return this.banner},n.setBanner=function(n){this.banner=n},n.getModal=function(){return this.modal},n.setModal=function(n){this.modal=n},n.getOptions=function(){return this.modalOptions},n.createBanner=function(n){return this.banner=new e(this,n),this.banner},n.createModal=function(n){return this.modal=new o(this,n),this.modal},n.acceptAllButton=function(){this.acceptAll=!0,this.modal.hide(),this.banner.hide(),this.injectScripts()},n.hideBanner=function(){this.banner.hide()},n.hideModal=function(){this.modal.hide()},n.injectScript=function(n,t){var e=document.createElement("script");e.setAttribute("src",n),e.async=t,document.body.appendChild(e)},n.injectScripts=function(){var n=this;this.modalOptions.cookieCategories.forEach(function(t){(t.checked||n.acceptAll)&&t.scripts.forEach(function(t){console.log("injecting script: "+t.scriptSrc),n.injectScript(t.scriptSrc,t.async)})})},t}();!function(n){n[n.GTM=0]="GTM",n[n.STANDARD=1]="STANDARD"}(n||(n={}));export{i as CookiesManager,n as ScriptType};
//# sourceMappingURL=index.esm.mjs.map
