var str = "";
//var section = 1;

export async function Func(section) {
    var prodParent = fetch("../class/prodview.html").then((res) => {
        var val = res.text();
        return val;
    });
    var data = "";
    if (section == 0) {
        var results = fetch('https://api.github.com/gists/ea3f7fa9a39a62872983e2b813441d53').then(results => {
            return results.json();
        });
        if (results == undefined || results.length ==0){
            results = fetch('../json/prodFmData.json').then(results => {
                return results.json();
            }); 
        }
        var data = await results.then(data => {
            return data.files["prodFmData.json"].content;
        });
        setTimeout(data = JSON.parse(data), 3000);
        //console.log(data);
    } else {
        data = fetch("../json/prodSgdata.json").then((res) => {
            return res.json();
        });
    }
    str = Object.values((await data).valueOf("data"))[0];
    //console.log(str.length);
    var dataLength = str.length;
    var prodParents = "";
    if (dataLength > 8) {
        await addPagesNavBtn(dataLength);
        await addItemViews(0, 9);
        await loadItems(0, 9);
    } else {
        await addPagesNavBtn(dataLength);
        await addItemViews(0, dataLength);
        await loadItems(0, dataLength);
    }

    async function addPagesNavBtn(dataLength) {
        var dtl = dataLength + 1;
        var pagesLen = Math.ceil(dtl / 9);
        var pagesView = fetch("../class/pagesview.html").then((res) => {
            return res.text();
        });
        var pagesBtns = "";
        for (var i = 1; i <= pagesLen; i++) {
            var pagesBtns = pagesBtns + "\n" + (await pagesView)
                .replaceAll('prodPagesBtn', 'prodPagesBtn' + i)
                .replaceAll('</button>', 'Page: ' + i + '</button>');
        }
        var btnParent = document.getElementById("btnNavProdView");
        btnParent.innerHTML = pagesBtns;
        btnParent = document.getElementById("btnNavProdView");
        var btns = btnParent.querySelectorAll('button');
        var itemStart = 0;
        for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];
            btn.setAttribute('onclick', 'window.loadItems(' + itemStart + ', ' + (itemStart + 8) + ')');
            itemStart = itemStart + 9;
        }
        window.document.getElementById("btnNavProdView2").innerHTML = document.getElementById("btnNavProdView").innerHTML;
    }
    async function addItemViews(startNum, endNum) {
        for (var i = startNum; i < endNum; i++) {
            //console.log(prodParent);
            var vW = (await prodParent).replaceAll('grid', 'grid' + i);
            //console.log(vW);
            prodParents = prodParents + "\n" + vW;
            //console.log(prodParents);
        }
        var pS = prodParents.toString();
        document.getElementById("mainProdView").innerHTML = pS;
    }
}
export async function msgWhatsapp(e){
    var obj = e.currentTarget;
    var text = obj.values[0];
    //console.log(text.length);
    if(text.length > 0){
        var devType = navigator.userAgent;
        var wbLink = "";
        if ( devType.match(/Android/i)
            || devType.match(/webOS/i)
            || devType.match(/iPhone/i)
            || devType.match(/iPad/i)
            || devType.match(/iPod/i)
            || devType.match(/BlackBerry/i)
            || devType.match(/Windows Phone/i) )
        {
            wbLink = "https://wa.me/+919756231332?text=";
        } else {
            wbLink = "https://api.whatsapp.com/send/?phone=919756231332&text=";
        }
        window.open(wbLink+text,"_blank");
    }
}
/*export async function zoomIt(e){
    /*if (window.document.getElementById('popupElemt') ==undefined){
        var popUpParent = await fetch("../class/popup.html").then((res) => {
            console.log(res);
            var val = res.text();
            return val;
        });
        console.log(popUpParent);
        var mainProd = window.document.getElementById('mainProdView');
        var elemNew = (new DOMParser()).parseFromString(popUpParent, 'text/html');
        //var elemNew = $.parseHTML(popUpParent);
        console.log(elemNew);
        mainProd.parentNode.insertBefore(popUpParent,mainProd);
    }*//*
    var popElem = window.document.getElementById('popupElemt');
    popElem.style.display="block";
    var obj = e.target;
    //console.log(e);
    var htmlText = obj.innerHTML;
    //console.log(htmlText);
    var popmatterElem = window.document.getElementById('popMatter');
    popmatterElem.innerHTML=htmlText;
    var overlayElem = popmatterElem.querySelector('.overlay');
    var aspRatio = (window.screen.width / window.screen.height);
    if (aspRatio > 1){
        popElem.style.width = "30%";
        overlayElem.style.left="40%";
    }else{
        popElem.style.width = "85%";
        overlayElem.style.left="40%";
    }
}*/
export async function loadItems(startNum, endNum) {
    var elemsParents = window.document.querySelectorAll('div[class^=grid]');
    //console.log(elemsParents);
    var i = startNum;    
    for (var j = 0; j < 9; j++) {
        var elem = elemsParents[j];
        if (i < str.length) {
            elem.style.visibility = "visible";
            /*elem.addEventListener("click",
            function(e){
                zoomIt(e);
            });*/
            var valueData = str[i];
            //console.log(valueData.imgfile);
            //console.log(elem);
            elem.querySelector("iframe").src = valueData.imgfile;
            elem.querySelector("h1").textContent = valueData.title;
            var val =  [ encodeURIComponent("I want to know More About Your Products") +
                        encodeURIComponent("\nName : ") +
                        encodeURIComponent(valueData.title) +
                        encodeURIComponent(",  Item ID :") +
                        encodeURIComponent(valueData.itemnum) +
                        "&type=phone_number&app_absent=0&send=1"];
            elem.querySelector("button").values = val;
            elem.querySelector("button").addEventListener( "click",
                function(e){
                    msgWhatsapp(e);
                });
            i++;
            //elem.querySelector("h1").style.fontSize = "inherit";
        } else {
            elem.querySelector("iframe").src = "";
            elem.querySelector("h1").textContent = "";
            elem.style.visibility = "hidden";
        }
    }
    /*removePopElem();
    function removePopElem() {
        var popElem = document.querySelectorAll('.ndfHFb-c4YZDc-Wrql6b');
        for (var i = 0; i < popElem.length; i++) {
            popElem[i].remove();
        }
        setTimeout(removePopElem, 15000);
        //console.log("popup found = "+popElem.length);
    }*/


}

//Func(0);
