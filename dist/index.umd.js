!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e||self).cookieManager={})}(this,function(e){var t=/*#__PURE__*/function(){function e(){}return e.encode=function(e){return window.btoa(e)},e.decode=function(e){return window.atob(e)},e.isHTML=function(e){var t=RegExp.prototype.test.bind(/(<([^>]+)>)/i);return e.match(t)},e.wrapString=function(e,t){return this.isHTML(e)?e:"<"+t+">"+e+"</"+t+">"},e.deepEqual=function(e,t){var o=this,n=Object.keys,i=typeof e;return e&&t&&"object"===i&&i===typeof t?n(e).length===n(t).length&&n(e).every(function(n){return o.deepEqual(e[n],t[n])}):e===t},e.compareObjects=function(e,t){var o=function e(t){return Object.entries(t).sort().map(function(t){return t[1]instanceof Object&&(t[1]=e(t[1])),t})};return JSON.stringify(o(e))===JSON.stringify(o(t))},e.objectEquals=function(e,t){var o=function(e){var t={};return JSON.stringify(e,function(e,o){return t[e]=null,o}),JSON.stringify(e,Object.keys(t).sort())};return o(e)===o(t)},e.prepareObjectsForComparison=function(e,t){var o=JSON.parse(JSON.stringify(e)),n=JSON.parse(JSON.stringify(t));return o.forEach(function(e){e.checked=!0}),n.forEach(function(e){e.checked=!0}),{A:o,B:n}},e.mergeRecursively=function(e,t){for(var o in t)try{e[o]=t[o].constructor==Object?this.mergeRecursively(e[o],t[o]):t[o]}catch(n){e[o]=t[o]}return e},e}(),o=/*#__PURE__*/function(){function e(e,t){this.options=void 0,this.banner=void 0,this.cookiesManager=void 0,this.cookiesManager=e,this.options=t,e.getOptions().bannerOptions.inject&&this.injectBanner(),e.getOptions().bannerOptions.injectWall&&this.injectWall(),this.setEventListeners()}var o=e.prototype;return o.setEventListeners=function(){try{var e=this;document.querySelector(".cm-banner-accept-all-btn").addEventListener("click",function(){e.cookiesManager.acceptAllButton()}),document.querySelector(".cm-banner-reject-all-btn").addEventListener("click",function(){e.cookiesManager.acceptAllButton(!1)}),document.querySelector(".cm-banner-config-btn").addEventListener("click",function(){e.cookiesManager.showModal()})}catch(e){console.error("Can't set the event listener for the cookies banner. Can't find the HTML elements.")}},o.generateBanner=function(){return'\n                <div class="c-cookies-config-banner">\n                    <div class="banner-container">\n                        '+this.getBannerText()+'\n                        <div class="banner-container__buttons">\n                            '+this.getRejectAllButton()+"\n                            "+this.getAcceptAllButton()+"\n                            "+this.getSettingsButton()+"\n                        </div>\n                    </div>\n                </div> \n                "},o.getAcceptAllButton=function(){return this.options.acceptAllButton.show?'<button class="banner-container__button banner-container__accept-all-btn cm-banner-accept-all-btn">'+this.options.acceptAllButton.text+"</button>":""},o.getRejectAllButton=function(){return this.options.rejectAllButton.show?'<button class="banner-container__button banner-container__reject-all-btn cm-banner-reject-all-btn">'+this.options.rejectAllButton.text+"</button>":""},o.getSettingsButton=function(){return this.options.settingsButton.show?'<button class="banner-container__button-link banner-container__config-btn cm-banner-config-btn">'+this.options.settingsButton.text+"</button>":""},o.getBannerText=function(){return t.wrapString(this.options.bannerText,"p")},o.injectWall=function(){try{null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateWall())}catch(e){console.error("Couldn't inject the wall.")}},o.injectBanner=function(){try{null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateBanner())}catch(e){console.error("Couldn't inject the banner.")}},o.generateWall=function(){return'<div class="c-cookies-config-wall '+(this.options.wallBlur?"c-cookies-config-wall--blurred":"")+'"></div>'},o.showWall=function(){try{document.querySelector(".c-cookies-config-wall").classList.add("wall-show")}catch(e){console.error("Couldn't apply the background wall.")}},o.hideWall=function(){try{document.querySelector(".c-cookies-config-wall").classList.remove("wall-show")}catch(e){console.error("Unable to hide the background wall.")}},o.hideScroll=function(){try{document.querySelector("body").style.overflow="hidden",document.querySelector("html").style.overflow="hidden"}catch(e){console.error("Unable to hide the scroll.")}},o.showScroll=function(){try{document.querySelector("body").style.overflow="auto",document.querySelector("html").style.overflow="auto"}catch(e){console.error("Unable to show the scroll.")}},o.show=function(){this.options.wall&&this.showWall(),this.options.wallScroll||this.hideScroll();try{document.querySelector(".c-cookies-config-banner .banner-container").classList.add("show-banner")}catch(e){console.error("Unable to show the banner.")}},o.hide=function(){try{document.querySelector(".c-cookies-config-banner").style.display="none"}catch(e){console.error("Unable to hide the banner.")}this.hideWall(),this.showScroll()},e}();function n(e,t,o){if(!e.s){if(o instanceof i){if(!o.s)return void(o.o=n.bind(null,e,t));1&t&&(t=o.s),o=o.v}if(o&&o.then)return void o.then(n.bind(null,e,t),n.bind(null,e,2));e.s=t,e.v=o;const c=e.o;c&&c(e)}}var i=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,o){var i=new e,c=this.s;if(c){var r=1&c?t:o;if(r){try{n(i,1,r(this.v))}catch(e){n(i,2,e)}return i}return this}return this.o=function(e){try{var c=e.v;1&e.s?n(i,1,t?t(c):c):o?n(i,1,o(c)):n(i,2,c)}catch(e){n(i,2,e)}},i},e}();function c(e){return e instanceof i&&1&e.s}var r,s=/*#__PURE__*/function(){function e(e,t){this.options=void 0,this.cookiesManager=void 0,this.cookiesManager=e,this.options=t,e.getOptions().modalOptions.inject&&this.injectModal(),this.setEventListeners(),this.updateSwitchesStatus()}var t=e.prototype;return t.show=function(){try{var e=this;return Promise.resolve(function(t,o){try{var r=(document.querySelector(".c-cookies-config-modal").classList.add(e.options.showModalClass),Promise.resolve(new Promise(function(e){return setTimeout(e,10)})).then(function(){function t(){document.getElementById("modal-container").classList.add(e.options.showModalClass),e.cookiesManager.getBanner().hideScroll()}var o,r=document.getElementsByClassName("cm-accordion"),s=e;o=0;var a=function(e,t,o){for(var r;;){var s=e();if(c(s)&&(s=s.v),!s)return a;if(s.then){r=0;break}var a=o();if(a&&a.then){if(!c(a)){r=1;break}a=a.s}if(t){var l=t();if(l&&l.then&&!c(l)){r=2;break}}}var u=new i,d=n.bind(null,u,2);return(0===r?s.then(f):1===r?a.then(h):l.then(g)).then(void 0,d),u;function h(i){a=i;do{if(t&&(l=t())&&l.then&&!c(l))return void l.then(g).then(void 0,d);if(!(s=e())||c(s)&&!s.v)return void n(u,1,a);if(s.then)return void s.then(f).then(void 0,d);c(a=o())&&(a=a.v)}while(!a||!a.then);a.then(h).then(void 0,d)}function f(e){e?(a=o())&&a.then?a.then(h).then(void 0,d):h(a):n(u,1,a)}function g(){(s=e())?s.then?s.then(f).then(void 0,d):f(s):n(u,1,a)}}(function(){return o<r.length},function(){return o++},function(){var e=function(){if(r[o].classList.contains("cm-active-on-load"))return r[o].classList.remove("cm-active-on-load"),Promise.resolve(new Promise(function(e){return setTimeout(e,100)})).then(function(){s.toggleAccordion(r[o])})}();if(e&&e.then)return e.then(function(){})});return a&&a.then?a.then(t):t()}))}catch(e){return o(e)}return r&&r.then?r.then(void 0,o):r}(0,function(e){console.error("Could not show cookie modal."),console.error(e)}))}catch(e){return Promise.reject(e)}},t.hide=function(e){document.getElementById("modal-container").classList.remove(this.options.showModalClass);var t=document.querySelector(".c-cookies-config-banner .banner-container");(0==(null==t?void 0:t.classList.contains("show-banner"))||this.cookiesManager.getOptions().bannerOptions.wallScroll)&&this.cookiesManager.getBanner().showScroll()},t.setEventListeners=function(){var e=this;try{var t=this;document.querySelectorAll(".close-modal").forEach(function(o){return o.addEventListener("click",function(){e.hide(t)})}),document.querySelector(".cm-modal-accept-all").addEventListener("click",function(){t.cookiesManager.acceptAllButton()}),document.querySelector(".cm-modal-reject-all").addEventListener("click",function(){t.cookiesManager.acceptAllButton(!1)}),document.querySelector(".cm-modal-save").addEventListener("click",function(){t.cookiesManager.injectScripts(),t.cookiesManager.hideBanner(),t.cookiesManager.saveButton(),t.cookiesManager.callIndividualCallbacks()}),this.cookiesManager.getOptions().cookieCategories.forEach(function(e,o){var n=document.querySelector(".cm-switch-"+o);document.querySelectorAll(".c-cookies-config-modal .cookie-category"),n.addEventListener("change",function(){this.checked?(e.checked=!0,t.toggleSwitch(o,!0)):(e.checked=!1,t.toggleSwitch(o,!1))})});var o,n=document.getElementsByClassName("cm-accordion");for(t=this,o=0;o<n.length;o++)n[o].addEventListener("click",function(){t.toggleAccordion(this)})}catch(e){console.error("Could not set event listeners for cookie modal.")}},t.updateSwitchDisabledStatus=function(e,t){try{var o=document.querySelectorAll(".c-cookies-config-modal .cookie-category"),n=o[e].querySelector(".cm-switch-"+e),i=o[e].querySelector(".slider"),c=o[e].querySelector("label.switch");t?(n.setAttribute("disabled",""),i.classList.add("disabled"),c.classList.add("disabled")):(n.removeAttribute("disabled"),i.classList.remove("disabled"),c.classList.remove("disabled"))}catch(t){console.error("Could not change the disabled status from switch cm-switch-"+e+". Do you have equal switches and cookieCategories? If cm-switch-"+e+" does not exist in your DOM, probably not.")}},t.toggleSwitch=function(e,t){try{var o=document.querySelectorAll(".c-cookies-config-modal .cookie-category")[e].querySelector(".cm-switch-"+e);t?o.setAttribute("checked",""):o.removeAttribute("checked"),o.checked=t}catch(t){console.error("Could not toggle the switch cm-switch-"+e+". Do you have equal switches and cookieCategories? If cm-switch-"+e+" does not exist in your DOM, probably not.")}},t.toggleAccordion=function(e){try{e.classList.toggle("cm-active");var t=e.nextElementSibling;return t.style.maxHeight=t.style.maxHeight?null:t.scrollHeight+"px",Promise.resolve()}catch(e){return Promise.reject(e)}},t.injectModal=function(){try{null!=document.querySelector("body")&&document.querySelector("body").insertAdjacentHTML("afterend",this.generateModal())}catch(e){console.error("Could not inject cookie modal.")}},t.updateSwitchesStatus=function(){var e=this;this.cookiesManager.getOptions().cookieCategories.forEach(function(t,o){try{e.toggleSwitch(o,t.checked),e.updateSwitchDisabledStatus(o,t.required)}catch(e){console.error("You have more cookieCategories defined in javascript than in your HTML. Please, use the same number of cookieCategories.")}})},t.generateCategoriesBlocks=function(){var e="",t=this.cookiesManager.getOptions().cookieCategories;return null!=localStorage.getItem("cookiesManagerOptions")&&(t=this.cookiesManager.getCookiesOptions()),t.forEach(function(t,o){var n=t.required?"disabled":"";e+='\n            <div class="cookie-category">\n                <div class="cookie-category__header cc-header '+(t.accordion.enable?"cm-accordion":"")+" "+(t.boxedHeader?"cm-boxed":"")+" "+(t.accordion.active?"cm-active-on-load":"")+'">\n                    '+(t.accordion.enable?"<div class='cc-header__left'></div>":"")+'\n                    <div class="cc-header__right">\n                        <div class="header__title">\n                            '+t.title+'\n                        </div>\n                        <div class="header__switch">\n                            <label class="switch '+n+'">\n                                <input '+n+" "+(t.checked?"checked":"")+' class="cm-switch-'+o+'" type="checkbox">\n                                <span class="slider round '+n+'"></span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class="cookie-category__body body '+(t.boxedBody?"cookie-category__body--boxed":"")+" "+(t.accordion.enable?"cm-panel":"")+'">\n                    <p>'+t.description+"</p>\n                </div>\n            </div>\n            "}),e},t.getCloseButton=function(){return this.options.closeButton.show?'<div class="modal__close close-modal" title="Close"><div class="close-modal-img"></div></div>':""},t.getAcceptAllButton=function(){return this.options.acceptAllButton.show?'<button class="modal__button modal__button-width cm-modal-accept-all footer__button-accept-all">'+this.options.acceptAllButton.text+"</button>":""},t.getRejectAllButton=function(){return this.options.rejectAllButton.show?'<button class="modal__button modal__button-width cm-modal-reject-all footer__button-reject-all">'+this.options.rejectAllButton.text+"</button>":""},t.getSaveButton=function(){return this.options.saveButton.show?' <button class="modal__button-link close-modal cm-modal-save footer__button-save-btn"> '+this.options.saveButton.text+" </button>":""},t.generateModal=function(){return'\n        <div class="c-cookies-config-modal">\n        <div class="modal__container" id="modal-container">\n          <div class="modal__content">\n            '+this.getCloseButton()+'\n            <div class="modal__title">'+this.options.title+'</div>\n            <p class="modal__description">'+this.options.description+'</p>\n            <div class="modal__cookie-categories">\n                '+this.generateCategoriesBlocks()+'\n            </div>\n    \n            <div class="modal__footer">\n            '+this.getRejectAllButton()+"\n             "+this.getAcceptAllButton()+"\n             "+this.getSaveButton()+"\n            </div>\n          </div>\n        </div>\n      </div>\n        "},e}(),a=/*#__PURE__*/function(){var n=i.prototype;function i(e){var o=this;if(this.modalOptions=void 0,this.banner=void 0,this.modal=void 0,this.acceptAll=!1,this.configChanged=!1,this.onCookieCategoryChange=void 0,null==e)throw new Error("Options for CookiesManager cannot be null.");if(null==e.cookieCategories)throw new Error("You should provide at least one cookie category");var n=new Array;e.cookieCategories.forEach(function(e){n.push(t.mergeRecursively(o.getDefaultCookieCategoryOptions(),e))}),e.cookieCategories=n;var i=e.cookieCategories;e=t.mergeRecursively(this.getDefaultOptions(),e),this.modalOptions=e,this.constructorInitializationFunction(e,i)}return n.getBanner=function(){return this.banner},n.setBanner=function(e){this.banner=e},n.getModal=function(){return this.modal},n.setModal=function(e){this.modal=e},n.getOptions=function(){return this.modalOptions},n.on=function(e,t){"onCookieCategoryChange"==e&&(this.onCookieCategoryChange=t)},n.constructorInitializationFunction=function(e,o){if(null!=localStorage.getItem("cookiesManagerOptions")){var n=t.prepareObjectsForComparison(this.modalOptions.cookieCategories,this.getCookiesOptions());t.objectEquals(n.A,n.B)?(this.modalOptions.cookieCategories=this.getCookiesOptions(),this.modalOptions.cookieCategories.forEach(function(e,t){e.events=o[t].events})):(localStorage.removeItem("cookiesManagerOptions"),this.configChanged=!0)}null!=e.modalOptions&&this.createModal(e.modalOptions),null!=e.bannerOptions&&this.createBanner(e.bannerOptions)},n.setEventListeners=function(){this.modal.setEventListeners(),this.banner.setEventListeners()},n.createBanner=function(e){return this.banner=new o(this,e),this.banner},n.createModal=function(e){return this.modal=new s(this,e),this.modal},n.setCookies=function(){var e=this;this.modalOptions.cookieCategories.forEach(function(t){t.events.setCookiesOnChange.forEach(function(o){e.setCookie(o.cookieName,t.checked?o.valueOnAccept:o.valueOnReject,o.expirationDays,"/")})})},n.setCookie=function(e,t,o,n){void 0===o&&(o=400),void 0===n&&(n="/");try{document.cookie=e+"="+encodeURIComponent(t)+"; max-age="+24*o*3600+"; path="+n}catch(e){console.log("Error setting cookie: "+e)}},n.acceptAllButton=function(e){void 0===e&&(e=!0),this.getOptions().cookieCategories.forEach(function(t){t.checked=e}),this.modal.updateSwitchesStatus(),this.acceptAll=!0,this.modal.hide(),this.banner.hide(),this.injectScripts(),this.saveCookieOptions(),this.setCookies(),this.callIndividualCallbacks()},n.showModal=function(){this.modal.show()},n.showBanner=function(){this.banner.show()},n.hideBanner=function(){this.banner.hide()},n.hideModal=function(){this.modal.hide()},n.callIndividualCallbacks=function(){var e=this;this.modalOptions.cookieCategories.forEach(function(t){t.checked||e.acceptAll?t.events.onAccept():t.checked||t.events.onReject()})},n.injectScript=function(e,t){void 0===t&&(t=!1);var o=document.createElement("script");o.setAttribute("src",e),o.async=t,document.body.appendChild(o)},n.injectGTM=function(e){try{!function(e,t,o,n,i){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var c=t.getElementsByTagName(o)[0],r=t.createElement(o);r.src="https://www.googletagmanager.com/gtm.js?id="+i,c.parentNode.insertBefore(r,c)}(window,document,"script","dataLayer",e),window.dataLayer=window.dataLayer||[]}catch(e){console.error("Couldn't inject GTM.")}},n.init=function(e,t){try{var o=function(){null!=localStorage.getItem("cookiesManagerOptions")&&(n.injectScripts(),n.callIndividualCallbacks())},n=this,i=function(){if(!n.modalOptions.askOnce)return Promise.resolve(n.initShow(e,t)).then(function(){});var o=function(){if(null==localStorage.getItem("cookiesManagerOptions")||n.configChanged)return Promise.resolve(n.initShow(e,t)).then(function(){})}();return o&&o.then?o.then(function(){}):void 0}();return Promise.resolve(i&&i.then?i.then(o):o())}catch(e){return Promise.reject(e)}},n.initShow=function(e,t){try{var o=function(){e&&n.showBanner(),t&&n.showModal()},n=this,i=function(){if(n.modalOptions.delay>0)return Promise.resolve(new Promise(function(e){return setTimeout(e,n.modalOptions.delay)})).then(function(){})}();return Promise.resolve(i&&i.then?i.then(o):o())}catch(e){return Promise.reject(e)}},n.injectScripts=function(){var t=this;try{this.modalOptions.cookieCategories.forEach(function(o){null!=t.onCookieCategoryChange&&t.onCookieCategoryChange(o),(o.checked||t.acceptAll)&&o.scripts.forEach(function(o){if(o.type==e.ScriptType.STANDARD||null==o.type)null!=o.scriptSrc&&t.injectScript(o.scriptSrc,o.async);else{if(null==o.gtmCode)throw new Error("You should provide a gtmCode for the script");t.injectGTM(o.gtmCode)}})})}catch(e){console.error("Couldn't inject scripts: "+e)}},n.saveButton=function(){this.saveCookieOptions(),this.setCookies(),this.callIndividualCallbacks()},n.saveCookieOptions=function(){var e=t.encode(JSON.stringify(this.modalOptions.cookieCategories));localStorage.setItem("cookiesManagerOptions",e)},n.getCookiesOptions=function(){return null!=localStorage.getItem("cookiesManagerOptions")?JSON.parse(t.decode(localStorage.getItem("cookiesManagerOptions"))):{}},n.getDefaultCookieCategoryOptions=function(){return{title:"Cookie Category Example",description:"Cookie category description",required:!1,id:"",checked:!0,events:{onAccept:function(){},onReject:function(){},setCookiesOnChange:[]},accordion:{enable:!1,enableOnDescriptionLength:45,active:!1},boxedHeader:!1,boxedBody:!1,scripts:[]}},n.getDefaultOptions=function(){return{askOnce:!0,delay:0,askOnChange:!0,initOnDomContentLoaded:!0,modalOptions:{title:"Cookie settings",description:"Change the settings for the cookies here.",inject:!0,showModalClass:"show-modal",acceptAllButton:{text:"Accept all",show:!0},rejectAllButton:{text:"Reject all",show:!0},saveButton:{text:"Save",show:!0},closeButton:{text:"Close",show:!0}},bannerOptions:{inject:!0,injectWall:!0,wall:!0,wallScroll:!0,wallBlur:!1,bannerText:"This website uses cookies to ensure you get the best experience on our website.",acceptAllButton:{text:"Accept all",show:!0},settingsButton:{text:"Settings",show:!0},acceptRequiredOnlyButton:{text:"Configuración",show:!1},rejectAllButton:{text:"Rechazar todo",show:!0}},cookieCategories:[]}},i}();e.ScriptType=void 0,(r=e.ScriptType||(e.ScriptType={}))[r.GTM=0]="GTM",r[r.STANDARD=1]="STANDARD",e.CookiesManager=a});
//# sourceMappingURL=index.umd.js.map
