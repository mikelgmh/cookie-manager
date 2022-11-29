!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t||self).cookieManager={})}(this,function(t){var e,n=/*#__PURE__*/function(){function t(){}return t.encode=function(t){return window.btoa(t)},t.decode=function(t){return window.atob(t)},t.isHTML=function(t){var e=RegExp.prototype.test.bind(/(<([^>]+)>)/i);return t.match(e)},t.wrapString=function(t,e){return this.isHTML(t)?t:"<"+e+">"+t+"</"+e+">"},t.deepEqual=function(t,e){var n=this,o=Object.keys,i=typeof t;return t&&e&&"object"===i&&i===typeof e?o(t).length===o(e).length&&o(t).every(function(o){return n.deepEqual(t[o],e[o])}):t===e},t.compareObjects=function(t,e){var n=function t(e){return Object.entries(e).sort().map(function(e){return e[1]instanceof Object&&(e[1]=t(e[1])),e})};return JSON.stringify(n(t))===JSON.stringify(n(e))},t.objectEquals=function(t,e){var n=function(t){var e={};return JSON.stringify(t,function(t,n){return e[t]=null,n}),JSON.stringify(t,Object.keys(e).sort())};return n(t)===n(e)},t.prepareObjectsForComparison=function(t,e){var n=JSON.parse(JSON.stringify(t)),o=JSON.parse(JSON.stringify(e));return n.forEach(function(t){t.checked=!0}),o.forEach(function(t){t.checked=!0}),{A:n,B:o}},t.mergeRecursively=function(t,e){for(var n in e)try{t[n]=e[n].constructor==Object?this.mergeRecursively(t[n],e[n]):e[n]}catch(o){t[n]=e[n]}return t},t}(),o=/*#__PURE__*/function(){function t(t,e){this.options=void 0,this.banner=void 0,this.cookiesManager=void 0,this.cookiesManager=t,this.options=e,t.getOptions().bannerOptions.inject&&this.injectBanner(),this.setEventListeners()}var e=t.prototype;return e.setEventListeners=function(){try{var t=this;document.querySelector(".cm-banner-accept-all-btn").addEventListener("click",function(){t.cookiesManager.acceptAllButton()}),document.querySelector(".cm-banner-config-btn").addEventListener("click",function(){t.cookiesManager.showModal()})}catch(t){console.log("Can't set the event listener for the cookies modal.")}},e.generateBanner=function(){return'\n                <div class="c-cookies-config-banner">\n                    <div class="banner-container">\n                        '+this.getBannerText()+'\n                        <div class="banner-container__buttons">\n                            '+this.getAcceptAllButton()+"\n                            "+this.getSettingsButton()+"\n                        </div>\n                    </div>\n                </div> \n                "},e.getAcceptAllButton=function(){return this.options.acceptAllButton.show?'<button class="banner-container__button banner-container__accept-all-btn cm-banner-accept-all-btn">'+this.options.acceptAllButton.text+"</button>":""},e.getSettingsButton=function(){return this.options.settingsButton.show?'<button class="banner-container__button-link banner-container__config-btn cm-banner-config-btn">'+this.options.settingsButton.text+"</button>":""},e.getBannerText=function(){return n.wrapString(this.options.bannerText,"p")},e.injectBanner=function(){null!=document.querySelector("body")&&(document.querySelector("body").insertAdjacentHTML("afterend",this.generateWall()),document.querySelector("body").insertAdjacentHTML("afterend",this.generateBanner()))},e.generateWall=function(){return'<div class="c-cookies-config-wall '+(this.options.wallBlur?"c-cookies-config-wall--blurred":"")+'"></div>'},e.showWall=function(){document.querySelector(".c-cookies-config-wall").classList.add("wall-show")},e.hideWall=function(){document.querySelector(".c-cookies-config-wall").classList.remove("wall-show")},e.hideScroll=function(){document.querySelector("body").style.overflow="hidden"},e.showScroll=function(){document.querySelector("body").style.overflow="auto"},e.show=function(){this.options.wall&&this.showWall(),this.options.wallScroll||this.hideScroll(),document.querySelector(".c-cookies-config-banner .banner-container").classList.add("show-banner")},e.hide=function(){document.querySelector(".c-cookies-config-banner").style.display="none",this.hideWall(),this.showScroll()},t}(),i=/*#__PURE__*/function(){function t(t,e){this.options=void 0,this.cookiesManager=void 0,this.cookiesManager=t,this.options=e,t.getOptions().modalOptions.inject&&this.injectModal(),this.setEventListeners()}var e=t.prototype;return e.show=function(){document.getElementById("modal-container").classList.add("show-modal"),document.querySelector("body").style.overflow="hidden"},e.hide=function(){document.getElementById("modal-container").classList.remove("show-modal")},e.setEventListeners=function(){var t=this;try{var e=this;document.querySelectorAll(".close-modal").forEach(function(e){return e.addEventListener("click",t.hide)}),document.querySelector(".cm-modal-accept-all").addEventListener("click",function(){e.cookiesManager.acceptAllButton()}),document.querySelector(".cm-modal-save").addEventListener("click",function(){e.cookiesManager.injectScripts(),e.cookiesManager.hideBanner(),e.cookiesManager.saveButton()}),this.cookiesManager.getOptions().cookieCategories.forEach(function(t,e){document.querySelector(".cm-switch-"+e).addEventListener("change",function(){t.checked=!!this.checked})})}catch(t){console.log("Could not set event listeners for cookie modal.")}},e.injectModal=function(){null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateModal())},e.generateCategoriesBlocks=function(){var t="";return this.cookiesManager.getOptions().cookieCategories.forEach(function(e,n){var o=e.required?"disabled":"";t+='\n            <div class="cookie-category">\n                <div class="cookie-category__header header">\n                    <h2 class="header__title">\n                        '+e.title+'\n                    </h2>\n                    <div class="header__switch">\n                    <label class="switch '+o+'">\n                        <input '+o+' checked class="cm-switch-'+n+'" type="checkbox">\n                        <span class="slider round '+o+'"></span>\n                    </label>\n                    </div>\n                </div>\n            <div class="cookie-category__body body">\n                <p>'+e.description+"</p>\n            </div>\n            </div>\n            "}),t},e.getCloseButton=function(){return this.options.closeButton.show?'<div class="modal__close close-modal" title="Close"><div class="close-modal-img"></div></div>':""},e.getAcceptAllButton=function(){return this.options.acceptAllButton.show?'<button class="modal__button modal__button-width cm-modal-accept-all modal__button-accept-all">'+this.options.acceptAllButton.text+"</button>":""},e.getSaveButton=function(){return this.options.saveButton.show?' <button class="modal__button-link close-modal cm-modal-save modal__button-save-btn"> '+this.options.saveButton.text+" </button>":""},e.generateModal=function(){return'\n        <div class="c-cookies-config-modal">\n        <div class="modal__container" id="modal-container">\n          <div class="modal__content">\n            '+this.getCloseButton()+'\n            <h1 class="modal__title">'+this.options.title+'</h1>\n            <p class="modal__description">'+this.options.description+'</p>\n            <div class="modal__cookie-categories">\n                '+this.generateCategoriesBlocks()+'\n            </div>\n    \n            <div class="modal__footer">\n             '+this.getAcceptAllButton()+"\n             "+this.getSaveButton()+"\n            </div>\n          </div>\n        </div>\n      </div>\n        "},t}(),s=/*#__PURE__*/function(){var e=s.prototype;function s(t){if(this.modalOptions=void 0,this.banner=void 0,this.modal=void 0,this.acceptAll=!1,this.configChanged=!1,null==t)throw new Error("Options cannot be null");if(null==t.cookieCategories)throw new Error("You should provide at least one cookie category");if(t.cookieCategories.forEach(function(t){t.checked=!0}),t=n.mergeRecursively(this.getDefaultOptions(),t),this.modalOptions=t,null!=localStorage.getItem("cookiesManagerOptions")){var e=n.prepareObjectsForComparison(this.modalOptions.cookieCategories,this.getCookiesOptions());n.objectEquals(e.A,e.B)?(this.modalOptions.cookieCategories=this.getCookiesOptions(),this.injectScripts()):this.configChanged=!0}null!=t.modalOptions&&this.createModal(t.modalOptions),null!=t.bannerOptions&&this.createBanner(t.bannerOptions)}return e.getBanner=function(){return this.banner},e.setBanner=function(t){this.banner=t},e.getModal=function(){return this.modal},e.setModal=function(t){this.modal=t},e.getOptions=function(){return this.modalOptions},e.setEventListeners=function(){this.modal.setEventListeners(),this.banner.setEventListeners()},e.createBanner=function(t){return this.banner=new o(this,t),this.banner},e.createModal=function(t){return this.modal=new i(this,t),this.modal},e.acceptAllButton=function(){this.acceptAll=!0,this.modal.hide(),this.banner.hide(),this.injectScripts(),this.saveCookieOptions()},e.showModal=function(){this.modal.show()},e.showBanner=function(){this.banner.show()},e.hideBanner=function(){this.banner.hide()},e.hideModal=function(){this.modal.hide()},e.injectScript=function(t,e){void 0===e&&(e=!1);var n=document.createElement("script");n.setAttribute("src",t),n.async=e,document.body.appendChild(n)},e.injectGTM=function(t){try{!function(t,e,n,o,i){t[o]=t[o]||[],t[o].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var s=e.getElementsByTagName(n)[0],c=e.createElement(n);c.src="https://www.googletagmanager.com/gtm.js?id="+i,s.parentNode.insertBefore(c,s)}(window,document,"script","dataLayer",t),window.dataLayer=window.dataLayer||[]}catch(t){console.log("There was an error loading GTM.")}},e.init=function(t,e){this.modalOptions.askOnce?(null==localStorage.getItem("cookiesManagerOptions")||this.configChanged)&&(t&&this.showBanner(),e&&this.showModal()):(t&&this.showBanner(),e&&this.showModal())},e.injectScripts=function(){var e=this;this.modalOptions.cookieCategories.forEach(function(n){(n.checked||e.acceptAll)&&n.scripts.forEach(function(n){if(n.type==t.ScriptType.STANDARD||null==n.type)null!=n.scriptSrc&&e.injectScript(n.scriptSrc,n.async);else{if(null==n.gtmCode)throw new Error("You should provide a gtmCode for the script");e.injectGTM(n.gtmCode)}})})},e.saveButton=function(){this.saveCookieOptions()},e.saveCookieOptions=function(){var t=n.encode(JSON.stringify(this.modalOptions.cookieCategories));localStorage.setItem("cookiesManagerOptions",t)},e.getCookiesOptions=function(){return JSON.parse(n.decode(localStorage.getItem("cookiesManagerOptions")))},e.getDefaultOptions=function(){return{askOnce:!0,askOnChange:!0,modalOptions:{title:"Cookie settings",description:"Change the settings for the cookies here.",inject:!0,acceptAllButton:{text:"Accept all",show:!0},saveButton:{text:"Save",show:!0},closeButton:{text:"Close",show:!0}},bannerOptions:{inject:!0,wall:!0,wallScroll:!1,wallBlur:!0,bannerText:"This website uses cookies to ensure you get the best experience on our website.",acceptAllButton:{text:"Accept all",show:!0},settingsButton:{text:"Settings",show:!0},acceptRequiredOnlyButton:{text:"Configuración",show:!1},rejectAllButton:{text:"Configuración",show:!1}},cookieCategories:[]}},s}();t.ScriptType=void 0,(e=t.ScriptType||(t.ScriptType={}))[e.GTM=0]="GTM",e[e.STANDARD=1]="STANDARD",t.CookiesManager=s});
//# sourceMappingURL=index.umd.js.map
