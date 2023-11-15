var prevScrollpos = "";
var hidden = false;
var switchOff = false;

export async function navLoader(cls, ind, headTxt) {
    await fetch("../class/navbar.html")
        .then((res) => {
            var val = res.text();
            //console.log(val);
            return val;
        })
        .then((data) => {
            document.getElementById('navbar').innerHTML = data;
            //document.getElementById('navbarhide').onclick = "toggle()";
            toggle();
            markCurrent(cls, ind, headTxt);
        });
    prevScrollpos = window.scrollY;
}
//Func();
export function toggle() {
    var bar = document.getElementById('staticbar');
    var hider = document.getElementById('navbarhide');
    var navSpc = document.getElementById('navbar');
    if (bar.style.display.indexOf('flex') == 0 && hider.textContent.indexOf('\u21D6Hide Navigator') == 0) {
        bar.style.display = 'none';
        hider.textContent = 'Show Navigator\u21D8';
        hider.title = "Click to Show Navigation Bar Temporarily, Click Again to Hide"
        navSpc.style.width = 'fit-content';
    } else {
        bar.style.display = 'flex';
        hider.textContent = '\u21D6Hide Navigator';
        hider.title = "Click to Hide Navigation Bar Temporarily, Click Again to Show"
        navSpc.style.width = '100vw';
    }
}
function markCurrent(cls, ind, headTxt) {
    var navSpc = document.getElementById('navbar');
    var elem = navSpc.getElementsByClassName(cls);
    if (elem.length >= ind) {
        elem[ind].textContent += "*";
        elem[ind].style.background = "linear-gradient(#888787,#4a4a4a,#4a4a4a,#888787)"
    }
    document.getElementById('flexSpcTxt').textContent = headTxt;

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
    console.log(event);
    const root = document.documentElement;
    if (switchOff) {
        /*root.style.setProperty(`--bg-color`, "rgb(50,50,50)");*/
        setTheme('theme-dark');
        switchOff = false;
        //document.querySelector('label.switch span.slider.round p.before').textContent = "☾";
    } else {
        /*root.style.setProperty(`--bg-color`, "#EFEAEA");*/
        setTheme('theme-light');
        switchOff = true;
        //document.querySelector('label.switch span.slider.round p.before').textContent = "☀";
    }

    // function to set a given theme/color-scheme

}
export async function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
export async function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}
// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        switchOff = false;
    } else {
        setTheme('theme-light');
        switchOff = true;
    }
})();
export async function loadThemeBtn() {
    console.log('document body loaded');
    console.log('switchOff:' + switchOff);
    if (switchOff) {
        window.document.querySelector('.switch>input').click();
    }
}

