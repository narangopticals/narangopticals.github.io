import { getCookie, setCookie } from './common/functions.js'

var prevScrollpos = "";
var hidden = false;
var switchOff = false;
var loadSet = true;
var mutevent = null;
export function navLoader(cls, ind, headTxt) {
    initFooter();
    fetch("../class/navbar2.html")
        .then((res) => {
            var val = res.text();
            //console.log(val);
            return val;
        })
        .then((data) => {
            mutevent = new MutationDetector(window.document.getElementById('navbar'));

            window.document.getElementById('navbar').innerHTML = data;
            //document.getElementById('navbarhide').onclick = "toggle()";
            /*do {
                setTimeout(loadNavBtns(cls, ind, headTxt), 2000);
            } while ((document.getElementById('navbar').childElementCount == 0) || loadSet)*/
        });
    prevScrollpos = window.scrollY;

}
export function initFooter() {
    fetch("/class/footer.html")
        .then((res) => {
            var val = res.text();
            //console.log(val);
            return val;
        })
        .then((data) => {
            //mutevent = new MutationDetector(window.document.getElementById('navbar'));

            window.document.getElementById('footerbar').innerHTML = data;
            //document.getElementById('navbarhide').onclick = "toggle()";
            /*do {
                setTimeout(loadNavBtns(cls, ind, headTxt), 2000);
            } while ((document.getElementById('navbar').childElementCount == 0) || loadSet)*/
        });
    //prevScrollpos = window.scrollY;

}
export function toFooter() {
    document.querySelector('#footerbar').scrollIntoView();
}
export function loadNavBtns(cls, ind, headTxt) {
    if (mutevent != null) {
        console.log(mutevent);
        mutevent.disconnect();
        console.log(mutevent);
    }
    //toggle();
    markCurrent(cls, ind, headTxt);
    loadThemeBtn();
    loadSet = false;
}
//Func();
export function toggle() {
    var navSpc = window.document.getElementById('navbar');
    console.log(navSpc.innerHTML);
    var bar = navSpc.querySelector('#staticbar');
    console.log(bar);
    //var hider = document.getElementById('navbarhide');
    if (bar.style.display.indexOf('flex') == 0 && hider.textContent.indexOf('\u21D6Hide Navigator') == 0) {
        bar.style.display = 'none';
        //hider.textContent = 'Show Navigator\u21D8';
        //hider.title = "Click to Show Navigation Bar Temporarily, Click Again to Hide"
        navSpc.style.width = 'fit-content';
    } else {
        bar.style.display = 'flex';
        //hider.textContent = '\u21D6Hide Navigator';
        //hider.title = "Click to Hide Navigation Bar Temporarily, Click Again to Show"
        navSpc.style.width = '100vw';
    }
}
function markCurrent(cls, ind, headTxt) {
    var navSpc = document.getElementById('navbar');
    var elem = navSpc.getElementsByClassName(cls);
    if (elem.length >= ind) {
        elem[ind].textContent += "*";
        elem[ind].style.background = "linear-gradient(#888787,#4a4a4a,#4a4a4a,#888787)";
    }
    //document.getElementById('flexSpcTxt').textContent = headTxt;

}

//document.getElementById('navbar');
export async function navScroll() {
    //setInterval(function (e) {
    var body = document.body,
        html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);

    //console.log(height);
    if (window.screen.availHeight < (height * 0.9)) {
        var currentScrollPos = window.scrollY;
        //console.log("currentScrollPos :" + currentScrollPos.toPrecision() + "prevScrollpos : " + prevScrollpos.toPrecision());
        if (prevScrollpos > currentScrollPos) {// && hidden) {
            if (currentScrollPos == 0) {
                window.document.getElementById("navBanner").style.display = "";
            }
            //hidden = false;
        } else {
            window.document.getElementById("navBanner").style.display = "none";
            //hidden = true;
        }
        prevScrollpos = currentScrollPos;
    }

    //}, 1000);
}


export async function switchTheme(event) {
    //   console.log(event);
    const root = document.documentElement;
    if (switchOff) {
        /*root.style.setProperty(`--bg-color`, "rgb(50,50,50)");*/
        setTheme('theme-light');
        switchOff = false;
        //document.querySelector('label.switch span.slider.round p.before').textContent = "☾";
    } else {
        /*root.style.setProperty(`--bg-color`, "#EFEAEA");*/
        setTheme('theme-dark');
        switchOff = true;
        //document.querySelector('label.switch span.slider.round p.before').textContent = "☀";
    }

    // function to set a given theme/color-scheme

}
export async function setTheme(themeName) {
    setCookie('theme', themeName, 7);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
export async function toggleTheme() {
    if (getCookie('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}
// Immediately invoked function to set the theme on initial load
/*(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        switchOff = false;
    } else {
        setTheme('theme-light');
        switchOff = true;
    }
})();*/

/*export function loadThemeBtn() {
    console.log('loadThemeBtn');
    var switchBtn = window.document.querySelector('.switch>input');
    var cookieVal = getCookie('theme');
    if (cookieVal === 'theme-dark') {
        console.log('loadThemeBtn:theme-dark');
        //setTheme('theme-dark');
        if (switchBtn != undefined) {
            console.log('loadThemeBtn:');
            console.log(switchBtn);
            //switchBtn.click();
        }
        setTheme('theme-dark');
        switchOff = false;
    } else {
        console.log('loadThemeBtn:theme-light');
        if (switchBtn != undefined) {
            console.log('loadThemeBtn:');
            console.log(switchBtn);
            switchBtn.click();
        }
        setTheme('theme-light');
        switchOff = true;
    }
}*/
export async function loadThemeBtn() {
    console.log('loadThemeBtn');
    var switchBtn = window.document.querySelector('.switch>input');
    var cookieVal = await getCookie('theme');
    console.log(cookieVal);
    switchOff = cookieVal === 'theme-dark';

    if (switchBtn != undefined) {
        console.log('loadThemeBtn:');
        console.log(switchBtn);
        if (switchOff) {
            setTheme('theme-dark');
        } else {
            switchBtn.checked = !switchOff;
            setTheme('theme-light');
        }

    }

}
class MutationDetector {
    static observer;
    constructor(element) {
        this.observer = new MutationObserver(function (mutations) {
            console.log(mutations);
            if (mutations[0].addedNodes.length > 0) {
                loadNavBtns('menuBtns', 0, 'Home');
            }
        });
        // Configure and start observing the target element for changes in child nodes
        var config = { childList: true, subtree: false };
        this.observer.observe(element, config);
    }

    disconnect() {
        this.observer.disconnect();
    }
}