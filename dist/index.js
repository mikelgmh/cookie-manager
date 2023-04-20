var e=/*#__PURE__*/function(){function e(){}return e.encode=function(e){return window.btoa(e)},e.decode=function(e){return window.atob(e)},e.isHTML=function(e){var t=RegExp.prototype.test.bind(/(<([^>]+)>)/i);return e.match(t)},e.wrapString=function(e,t){return this.isHTML(e)?e:"<"+t+">"+e+"</"+t+">"},e.deepEqual=function(e,t){var n=this,o=Object.keys,i=typeof e;return e&&t&&"object"===i&&i===typeof t?o(e).length===o(t).length&&o(e).every(function(o){return n.deepEqual(e[o],t[o])}):e===t},e.compareObjects=function(e,t){var n=function e(t){return Object.entries(t).sort().map(function(t){return t[1]instanceof Object&&(t[1]=e(t[1])),t})};return JSON.stringify(n(e))===JSON.stringify(n(t))},e.objectEquals=function(e,t){var n=function(e){var t={};return JSON.stringify(e,function(e,n){return t[e]=null,n}),JSON.stringify(e,Object.keys(t).sort())};return n(e)===n(t)},e.prepareObjectsForComparison=function(e,t){var n=JSON.parse(JSON.stringify(e)),o=JSON.parse(JSON.stringify(t));return n.forEach(function(e){e.checked=!0}),o.forEach(function(e){e.checked=!0}),{A:n,B:o}},e.mergeRecursively=function(e,t){for(var n in t)try{e[n]=t[n].constructor==Object?this.mergeRecursively(e[n],t[n]):t[n]}catch(o){e[n]=t[n]}return e},e}(),t=/*#__PURE__*/function(){function t(e,t){this.options=void 0,this.banner=void 0,this.cookiesManager=void 0,this.cookiesManager=e,this.options=t,e.getOptions().bannerOptions.inject&&this.injectBanner(),e.getOptions().bannerOptions.injectWall&&this.injectWall(),this.setEventListeners()}var n=t.prototype;return n.setEventListeners=function(){try{var e=this;document.querySelector(".cm-banner-accept-all-btn").addEventListener("click",function(){e.cookiesManager.acceptAllButton()}),document.querySelector(".cm-banner-config-btn").addEventListener("click",function(){e.cookiesManager.showModal()})}catch(e){console.error("Can't set the event listener for the cookies banner. Can't find the HTML elements.")}},n.generateBanner=function(){return'\n                <div class="c-cookies-config-banner">\n                    <div class="banner-container">\n                        '+this.getBannerText()+'\n                        <div class="banner-container__buttons">\n                            '+this.getAcceptAllButton()+"\n                            "+this.getSettingsButton()+"\n                        </div>\n                    </div>\n                </div> \n                "},n.getAcceptAllButton=function(){return this.options.acceptAllButton.show?'<button class="banner-container__button banner-container__accept-all-btn cm-banner-accept-all-btn">'+this.options.acceptAllButton.text+"</button>":""},n.getSettingsButton=function(){return this.options.settingsButton.show?'<button class="banner-container__button-link banner-container__config-btn cm-banner-config-btn">'+this.options.settingsButton.text+"</button>":""},n.getBannerText=function(){return e.wrapString(this.options.bannerText,"p")},n.injectWall=function(){try{null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateWall())}catch(e){console.error("Couldn't inject the wall.")}},n.injectBanner=function(){try{null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateBanner())}catch(e){console.error("Couldn't inject the banner.")}},n.generateWall=function(){return'<div class="c-cookies-config-wall '+(this.options.wallBlur?"c-cookies-config-wall--blurred":"")+'"></div>'},n.showWall=function(){try{document.querySelector(".c-cookies-config-wall").classList.add("wall-show")}catch(e){console.error("Couldn't apply the background wall.")}},n.hideWall=function(){try{document.querySelector(".c-cookies-config-wall").classList.remove("wall-show")}catch(e){console.error("Unable to hide the background wall.")}},n.hideScroll=function(){try{document.querySelector("body").style.overflow="hidden",document.querySelector("html").style.overflow="hidden"}catch(e){console.error("Unable to hide the scroll.")}},n.showScroll=function(){try{document.querySelector("body").style.overflow="auto",document.querySelector("html").style.overflow="auto"}catch(e){console.error("Unable to show the scroll.")}},n.show=function(){this.options.wall&&this.showWall(),this.options.wallScroll||this.hideScroll();try{document.querySelector(".c-cookies-config-banner .banner-container").classList.add("show-banner")}catch(e){console.error("Unable to show the banner.")}},n.hide=function(){try{document.querySelector(".c-cookies-config-banner").style.display="none"}catch(e){console.error("Unable to hide the banner.")}this.hideWall(),this.showScroll()},t}();function n(e,t,i){if(!e.s){if(i instanceof o){if(!i.s)return void(i.o=n.bind(null,e,t));1&t&&(t=i.s),i=i.v}if(i&&i.then)return void i.then(n.bind(null,e,t),n.bind(null,e,2));e.s=t,e.v=i;const c=e.o;c&&c(e)}}var o=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,o){var i=new e,c=this.s;if(c){var r=1&c?t:o;if(r){try{n(i,1,r(this.v))}catch(e){n(i,2,e)}return i}return this}return this.o=function(e){try{var c=e.v;1&e.s?n(i,1,t?t(c):c):o?n(i,1,o(c)):n(i,2,c)}catch(e){n(i,2,e)}},i},e}();function i(e){return e instanceof o&&1&e.s}var c,r=/*#__PURE__*/function(){function e(e,t){this.options=void 0,this.cookiesManager=void 0,this.cookiesManager=e,this.options=t,e.getOptions().modalOptions.inject&&this.injectModal(),this.setEventListeners(),this.updateSwitchesStatus()}var t=e.prototype;return t.show=function(){try{var e=this;return Promise.resolve(function(t,c){try{var r=(document.querySelector(".c-cookies-config-modal").classList.add(e.options.showModalClass),Promise.resolve(new Promise(function(e){return setTimeout(e,10)})).then(function(){function t(){document.getElementById("modal-container").classList.add(e.options.showModalClass),e.cookiesManager.getBanner().hideScroll()}var c,r=document.getElementsByClassName("cm-accordion"),s=e;c=0;var a=function(e,t,c){for(var r;;){var s=e();if(i(s)&&(s=s.v),!s)return a;if(s.then){r=0;break}var a=c();if(a&&a.then){if(!i(a)){r=1;break}a=a.s}if(t){var l=t();if(l&&l.then&&!i(l)){r=2;break}}}var u=new o,d=n.bind(null,u,2);return(0===r?s.then(g):1===r?a.then(h):l.then(f)).then(void 0,d),u;function h(o){a=o;do{if(t&&(l=t())&&l.then&&!i(l))return void l.then(f).then(void 0,d);if(!(s=e())||i(s)&&!s.v)return void n(u,1,a);if(s.then)return void s.then(g).then(void 0,d);i(a=c())&&(a=a.v)}while(!a||!a.then);a.then(h).then(void 0,d)}function g(e){e?(a=c())&&a.then?a.then(h).then(void 0,d):h(a):n(u,1,a)}function f(){(s=e())?s.then?s.then(g).then(void 0,d):g(s):n(u,1,a)}}(function(){return c<r.length},function(){return c++},function(){var e=function(){if(r[c].classList.contains("cm-active-on-load"))return r[c].classList.remove("cm-active-on-load"),Promise.resolve(new Promise(function(e){return setTimeout(e,100)})).then(function(){s.toggleAccordion(r[c])})}();if(e&&e.then)return e.then(function(){})});return a&&a.then?a.then(t):t()}))}catch(e){return c(e)}return r&&r.then?r.then(void 0,c):r}(0,function(e){console.error("Could not show cookie modal."),console.error(e)}))}catch(e){return Promise.reject(e)}},t.hide=function(e){document.getElementById("modal-container").classList.remove(this.options.showModalClass);var t=document.querySelector(".c-cookies-config-banner .banner-container");(0==(null==t?void 0:t.classList.contains("show-banner"))||this.cookiesManager.getOptions().bannerOptions.wallScroll)&&this.cookiesManager.getBanner().showScroll()},t.setEventListeners=function(){var e=this;try{var t=this;document.querySelectorAll(".close-modal").forEach(function(n){return n.addEventListener("click",function(){e.hide(t)})}),document.querySelector(".cm-modal-accept-all").addEventListener("click",function(){t.cookiesManager.acceptAllButton()}),document.querySelector(".cm-modal-save").addEventListener("click",function(){t.cookiesManager.injectScripts(),t.cookiesManager.hideBanner(),t.cookiesManager.saveButton()}),this.cookiesManager.getOptions().cookieCategories.forEach(function(e,n){var o=document.querySelector(".cm-switch-"+n);document.querySelectorAll(".c-cookies-config-modal .cookie-category"),o.addEventListener("change",function(){this.checked?(e.checked=!0,t.toggleSwitch(n,!0)):(e.checked=!1,t.toggleSwitch(n,!1))})});var n,o=document.getElementsByClassName("cm-accordion");for(t=this,n=0;n<o.length;n++)o[n].addEventListener("click",function(){t.toggleAccordion(this)})}catch(e){console.error("Could not set event listeners for cookie modal.")}},t.toggleSwitch=function(e,t){try{var n=document.querySelectorAll(".c-cookies-config-modal .cookie-category")[e].querySelector(".cm-switch-"+e);t?n.setAttribute("checked",""):n.removeAttribute("checked"),n.checked=t}catch(t){console.error("Could not toggle the switch cm-switch-"+e+". Do you have equal switches and cookieCategories? If cm-switch-"+e+" does not exist in your dom, probably not.")}},t.toggleAccordion=function(e){try{e.classList.toggle("cm-active");var t=e.nextElementSibling;return t.style.maxHeight=t.style.maxHeight?null:t.scrollHeight+"px",Promise.resolve()}catch(e){return Promise.reject(e)}},t.injectModal=function(){try{null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateModal())}catch(e){console.error("Could not inject cookie modal.")}},t.updateSwitchesStatus=function(){var e=this;this.cookiesManager.getOptions().cookieCategories.forEach(function(t,n){try{e.toggleSwitch(n,t.checked)}catch(e){console.error("You have more cookieCategories defined in javascript than in your HTML. Please, use the same number of cookieCategories.")}})},t.generateCategoriesBlocks=function(){var e="",t=this.cookiesManager.getOptions().cookieCategories;return null!=localStorage.getItem("cookiesManagerOptions")&&(t=this.cookiesManager.getCookiesOptions()),t.forEach(function(t,n){var o=t.required?"disabled":"";e+='\n            <div class="cookie-category">\n                <div class="cookie-category__header cc-header '+(t.accordion.enable?"cm-accordion":"")+" "+(t.boxedHeader?"cm-boxed":"")+" "+(t.accordion.active?"cm-active-on-load":"")+'">\n                    '+(t.accordion.enable?"<div class='cc-header__left'></div>":"")+'\n                    <div class="cc-header__right">\n                        <div class="header__title">\n                            '+t.title+'\n                        </div>\n                        <div class="header__switch">\n                            <label class="switch '+o+'">\n                                <input '+o+" "+(t.checked?"checked":"")+' class="cm-switch-'+n+'" type="checkbox">\n                                <span class="slider round '+o+'"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class="cookie-category__body body '+(t.boxedBody?"cookie-category__body--boxed":"")+" "+(t.accordion.enable?"cm-panel":"")+'">\n                    <p>'+t.description+"</p>\n                </div>\n            </div>\n            "}),e},t.getCloseButton=function(){return this.options.closeButton.show?'<div class="modal__close close-modal" title="Close"><div class="close-modal-img"></div></div>':""},t.getAcceptAllButton=function(){return this.options.acceptAllButton.show?'<button class="modal__button modal__button-width cm-modal-accept-all modal__button-accept-all">'+this.options.acceptAllButton.text+"</button>":""},t.getSaveButton=function(){return this.options.saveButton.show?' <button class="modal__button-link close-modal cm-modal-save modal__button-save-btn"> '+this.options.saveButton.text+" </button>":""},t.generateModal=function(){return'\n        <div class="c-cookies-config-modal">\n        <div class="modal__container" id="modal-container">\n          <div class="modal__content">\n            '+this.getCloseButton()+'\n            <div class="modal__title">'+this.options.title+'</div>\n            <p class="modal__description">'+this.options.description+'</p>\n            <div class="modal__cookie-categories">\n                '+this.generateCategoriesBlocks()+'\n            </div>\n    \n            <div class="modal__footer">\n             '+this.getAcceptAllButton()+"\n             "+this.getSaveButton()+"\n            </div>\n          </div>\n        </div>\n      </div>\n        "},e}(),s=/*#__PURE__*/function(){var n=o.prototype;function o(t){var n=this;if(this.modalOptions=void 0,this.banner=void 0,this.modal=void 0,this.acceptAll=!1,this.configChanged=!1,this.onCookieCategoryChange=void 0,null==t)throw new Error("Options for CookiesManager cannot be null.");if(null==t.cookieCategories)throw new Error("You should provide at least one cookie category");var o=new Array;t.cookieCategories.forEach(function(t){t.checked=!0,o.push(e.mergeRecursively(n.getDefaultCookieCategoryOptions(),t))}),t.cookieCategories=o,t=e.mergeRecursively(this.getDefaultOptions(),t),this.modalOptions=t,this.constructorInitializationFunction(t)}return n.getBanner=function(){return this.banner},n.setBanner=function(e){this.banner=e},n.getModal=function(){return this.modal},n.setModal=function(e){this.modal=e},n.getOptions=function(){return this.modalOptions},n.on=function(e,t){"onCookieCategoryChange"==e&&(this.onCookieCategoryChange=t)},n.constructorInitializationFunction=function(t){if(null!=localStorage.getItem("cookiesManagerOptions")){var n=e.prepareObjectsForComparison(this.modalOptions.cookieCategories,this.getCookiesOptions());e.objectEquals(n.A,n.B)?this.modalOptions.cookieCategories=this.getCookiesOptions():(localStorage.removeItem("cookiesManagerOptions"),this.configChanged=!0)}null!=t.modalOptions&&this.createModal(t.modalOptions),null!=t.bannerOptions&&this.createBanner(t.bannerOptions)},n.setEventListeners=function(){this.modal.setEventListeners(),this.banner.setEventListeners()},n.createBanner=function(e){return this.banner=new t(this,e),this.banner},n.createModal=function(e){return this.modal=new r(this,e),this.modal},n.acceptAllButton=function(){this.getOptions().cookieCategories.forEach(function(e){e.checked=!0}),this.modal.updateSwitchesStatus(),this.acceptAll=!0,this.modal.hide(),this.banner.hide(),this.injectScripts(),this.saveCookieOptions()},n.showModal=function(){this.modal.show()},n.showBanner=function(){this.banner.show()},n.hideBanner=function(){this.banner.hide()},n.hideModal=function(){this.modal.hide()},n.injectScript=function(e,t){void 0===t&&(t=!1);var n=document.createElement("script");n.setAttribute("src",e),n.async=t,document.body.appendChild(n)},n.injectGTM=function(e){try{!function(e,t,n,o,i){e[o]=e[o]||[],e[o].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var c=t.getElementsByTagName(n)[0],r=t.createElement(n);r.src="https://www.googletagmanager.com/gtm.js?id="+i,c.parentNode.insertBefore(r,c)}(window,document,"script","dataLayer",e),window.dataLayer=window.dataLayer||[]}catch(e){console.error("Couldn't inject GTM.")}},n.init=function(e,t){try{var n=function(){null!=localStorage.getItem("cookiesManagerOptions")&&o.injectScripts()},o=this,i=function(){if(!o.modalOptions.askOnce)return Promise.resolve(o.initShow(e,t)).then(function(){});var n=function(){if(null==localStorage.getItem("cookiesManagerOptions")||o.configChanged)return Promise.resolve(o.initShow(e,t)).then(function(){})}();return n&&n.then?n.then(function(){}):void 0}();return Promise.resolve(i&&i.then?i.then(n):n())}catch(e){return Promise.reject(e)}},n.initShow=function(e,t){try{var n=function(){e&&o.showBanner(),t&&o.showModal()},o=this,i=function(){if(o.modalOptions.delay>0)return Promise.resolve(new Promise(function(e){return setTimeout(e,o.modalOptions.delay)})).then(function(){})}();return Promise.resolve(i&&i.then?i.then(n):n())}catch(e){return Promise.reject(e)}},n.injectScripts=function(){var e=this;try{this.modalOptions.cookieCategories.forEach(function(t){null!=e.onCookieCategoryChange&&e.onCookieCategoryChange(t),(t.checked||e.acceptAll)&&t.scripts.forEach(function(t){if(t.type==exports.ScriptType.STANDARD||null==t.type)null!=t.scriptSrc&&e.injectScript(t.scriptSrc,t.async);else{if(null==t.gtmCode)throw new Error("You should provide a gtmCode for the script");e.injectGTM(t.gtmCode)}})})}catch(e){console.error("Couldn't inject scripts: "+e)}},n.saveButton=function(){this.saveCookieOptions()},n.saveCookieOptions=function(){var t=e.encode(JSON.stringify(this.modalOptions.cookieCategories));localStorage.setItem("cookiesManagerOptions",t)},n.getCookiesOptions=function(){return null!=localStorage.getItem("cookiesManagerOptions")?JSON.parse(e.decode(localStorage.getItem("cookiesManagerOptions"))):{}},n.getDefaultCookieCategoryOptions=function(){return{title:"Cookie Category Example",description:"Cookie category description",required:!1,id:"",checked:!0,accordion:{enable:!1,enableOnDescriptionLength:45,active:!1},boxedHeader:!1,boxedBody:!1,scripts:[]}},n.getDefaultOptions=function(){return{askOnce:!0,delay:0,askOnChange:!0,initOnDomContentLoaded:!0,modalOptions:{title:"Cookie settings",description:"Change the settings for the cookies here.",inject:!0,showModalClass:"show-modal",acceptAllButton:{text:"Accept all",show:!0},saveButton:{text:"Save",show:!0},closeButton:{text:"Close",show:!0}},bannerOptions:{inject:!0,injectWall:!0,wall:!0,wallScroll:!0,wallBlur:!1,bannerText:"This website uses cookies to ensure you get the best experience on our website.",acceptAllButton:{text:"Accept all",show:!0},settingsButton:{text:"Settings",show:!0},acceptRequiredOnlyButton:{text:"Configuración",show:!1},rejectAllButton:{text:"Configuración",show:!1}},cookieCategories:[]}},o}();exports.ScriptType=void 0,(c=exports.ScriptType||(exports.ScriptType={}))[c.GTM=0]="GTM",c[c.STANDARD=1]="STANDARD",exports.CookiesManager=s;
//# sourceMappingURL=index.js.map
