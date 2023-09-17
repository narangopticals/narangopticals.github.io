export async function navLoader(cls,ind,headTxt) {
    await fetch("../class/navbar.html")
        .then((res) => {
            var val = res.text();
            //console.log(val);
            return val;
        })
        .then((data) => {
            document.getElementById('navSpace').innerHTML = data;
            //document.getElementById('barHider').onclick = "toggle()";
            toggle();
            markCurrent(cls,ind,headTxt);
        });
        
}
//Func();
export function toggle() {
    var bar = document.getElementById('staticbar');
    var hider = document.getElementById('barHider');
    var navSpc = document.getElementById('navSpace');
    if (bar.style.display.indexOf('flex') == 0 && hider.textContent.indexOf('Hide Navigator') == 0) {
        bar.style.display = 'none';
        hider.textContent = 'Show Navigator';
        hider.title = "Click to Show Navigation Bar Temporarily, Click Again to Hide"
        navSpc.style.width = 'fit-content';
    } else {
        bar.style.display = 'flex';
        hider.textContent = 'Hide Navigator';
        hider.title = "Click to Hide Navigation Bar Temporarily, Click Again to Show"
        navSpc.style.width = '100%';
    }
}
function markCurrent(cls,ind,headTxt){
    var navSpc = document.getElementById('navSpace');
    var elem = navSpc.getElementsByClassName(cls);
    if (elem.length >= ind){
        elem[ind].textContent += "*";
        elem[ind].style.background="linear-gradient(#888787,#4a4a4a,#4a4a4a,#888787)"
    }
    document.getElementById('flexSpcTxt').textContent = headTxt;
    
}

//document.getElementById('navSpace');