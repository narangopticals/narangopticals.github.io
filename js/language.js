import { getCookie, setCookie } from './general.js';

var mutatObj;
export const populateLanguageSelection = (selector, lang, text) => {
    //const ul = document.createElement("ul");
    //const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    const p = document.createElement("button");
    //const langkey = `${lang.toLowerCase()}`;
    p.textContent = text;
    a.appendChild(p);
    a.onclick = () => setLanguage(lang, true);
    //li.appendChild(a);
    //ul.appendChild(li);
    selector.appendChild(a);
}
const createSelector = () => {
    var selector = document.createElement('div');

    selector.className = "language-selection";
    selector.style.position = 'absolute';
    selector.style.top = '50vw';
    selector.style.left = '0';
    selector.style.padding = '5vw';
    selector.style.margin = '5vw';

    selector.style.background = 'grey';
    document.body.appendChild(selector);
    populateLanguageSelection(selector, 'en', 'English');
    populateLanguageSelection(selector, 'hi', 'हिन्दी');
    //const elementsToTranslate = document.querySelectorAll('.translate');
    //elementsToTranslate.forEach(element => updateContentLanguage(element, default_lang));
}
export const createnavSelector = () => {
    var selector = document.querySelector('.selector.skiptranslate');
    if (!!selector) {
        populateLanguageSelection(selector, 'en', 'English');
        populateLanguageSelection(selector, 'hi', 'हिन्दी');
    }
    //const elementsToTranslate = document.querySelectorAll('.translate');
    //elementsToTranslate.forEach(element => updateContentLanguage(element, default_lang));
}
const destroySelector = () => {
    if (!!document.getElementsByClassName('language-selection')[0]) {
        document.body.removeChild(document.getElementsByClassName('language-selection')[0]);
    }
}

export const setLanguage = (lang, override) => {
    destroySelector();
    const urlParams = new URLSearchParams(window.location.search.substring(1));
    setCookie('lang', lang, 7);
    if (lang.indexOf('en') > -1) {
        const cookieTask = setCookie('googtrans', ``, 0, ';domain=' + window.location.host);
        const cookieTask2 = setCookie('googtrans', ``, 0, ';domain=.' + window.location.host);
        cookieTask;
        cookieTask2;
        preventGooglePops(false);
    } else {
        //setCookie('googtrans', `/en/${lang}`, 1, ';domain=.' + window.location.host);
        setCookie('googtrans', `/en/${lang}`, 1, ';domain=' + window.location.host);
        preventGooglePops(true);
    }
    document.querySelector('html').setAttribute("lang", lang);
    if (!urlParams.has('googtrans') || override) {
        urlParams.set('googtrans', lang);
        window.location.search = urlParams.toString();
    }
    //window.location.replace(`/#googtrans(${lang})`);
}
export async function checkLanguage() {
    var default_lang = await getCookie('lang');
    if (default_lang === 'en') {
        setLanguage(default_lang, false);
    }
}
//console.log(default_lang);
/*if (default_lang == null || default_lang.length == 0) {
    // Initialize
    createSelector();
}*/

export function preventGooglePops(start) {
    var body = window.document.body;

    class MutationDetector {
        static obs;
        constructor(element) {
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(m => {
                    var target = m.target;
                    var nodeName = target.nodeName;
                    //console.log(nodeName);
                    var n = nodeName.toLowerCase();
                    if (n.indexOf('font') > -1) {
                        if (target.querySelector('font') == null) {
                            //m.preventDefault();
                            target.addEventListener('click', (e) => {
                                e.preventDefault();
                                //console.log(e.target);
                                e.target.parentElement.parentElement.dispatchEvent(new MouseEvent('click'));
                            });
                        }
                    }
                })
            });
            // Configure and start observing the target element for changes in child nodes
            var config = { childList: true, subtree: true };
            observer.observe(element, config);
            this.obs = observer;

        }
    }

    if (start) {
        if (mutatObj == null) {
            mutatObj = new MutationDetector(body);
            document.querySelectorAll('div[id^=goog]').forEach((e) => {
                //console.log(e);
                e.remove();
            });
        } else {
            mutatObj.obs.disconnect();
            mutatObj = null;
        }
    } else {
        if (mutatObj != null) {
            mutatObj.obs.disconnect();
        }
    }
}