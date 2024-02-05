import { getCookie, setCookie } from './general.js';


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
    var selector = document.querySelector('.selector-skiptranslate');
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
        setTimeout(setCookie('googtrans', ``, 0, ';domain=' + window.location.host), 1500);
        setTimeout(setCookie('googtrans', ``, 0, ';domain=.' + window.location.host), 1500);
    } else {
        //setCookie('googtrans', `/en/${lang}`, 1, ';domain=.' + window.location.host);
        setCookie('googtrans', `/en/${lang}`, 1, ';domain=' + window.location.host);
    }
    document.querySelector('html').setAttribute("lang", lang);
    if (!urlParams.has('googtrans') || override) {
        urlParams.set('googtrans', lang);
        window.location.search = urlParams.toString();
    }
    //window.location.replace(`/#googtrans(${lang})`);
}
var default_lang = await getCookie('lang');
console.log(default_lang);
if (default_lang == null || default_lang.length == 0) {
    // Initialize
    createSelector();
}