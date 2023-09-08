var str = "";
//var section = 1;


export async function Func(section) {
    var prodParent = fetch("../class/prodview.html").then((res) => {
        var val = res.text();
        return val;
    });
    var data = "";
    /*data = fetch('').then((res) => {
        return res.json();
    });
    if (data == ""){
        data = fetch("../json/prodData.json").then((res) => {
            return res.json();
        }); //.then(d => {return JSON.stringify(d)});
        //console.log(data);
    }*/
    if (section == 0) {
        data = fetch("../json/prodFmData.json").then((res) => {
            return res.json();
        });
    } else {
        data = fetch("../json/prodSgdata.json").then((res) => {
            return res.json();
        });
    }
    str = Object.values((await data).valueOf("data"))[0];
    //console.log(str.length);
    var dataLength = str.length;
    var prodParents = "";
    if (dataLength > 9) {
        await addPagesNavBtn();
        await addItemViews(0, 9);
        await loadItems(0, 9);
    } else {
        await addItemViews(0, dataLength);
        await loadItems(0, dataLength);
    }

    async function addPagesNavBtn() {
        var pagesLen = dataLength % 10;
        var pagesView = fetch("../class/pagesview.html").then((res) => {
            return res.text();
        });
        var pagesBtns = "";
        for (var i = 1; i <= pagesLen; i++) {
            var pagesBtns = pagesBtns + "\n" + (await pagesView)
                .replaceAll('prodPagesBtn', 'prodPagesBtn' + i)
                .replaceAll('</button>', i + '</button>');
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
    }
    async function addItemViews(startNum, endNum) {
        for (var i = startNum; i < endNum; i++) {
            console.log(prodParent);
            var vW = (await prodParent).replaceAll('grid', 'grid' + i);
            console.log(vW);
            prodParents = prodParents + "\n" + vW;
            console.log(prodParents);
        }
        var pS = prodParents.toString();
        document.getElementById("mainProdView").innerHTML = pS;
    }
}
export async function loadItems(startNum, endNum) {
    var elemsParents = window.document.querySelectorAll('div[class^=grid]');
    console.log(elemsParents);
    var i = startNum;
    var devType = navigator.userAgent;
    var wbLink = "";
    if (devType.match(/Android/i)
        || devType.match(/webOS/i)
        || devType.match(/iPhone/i)
        || devType.match(/iPad/i)
        || devType.match(/iPod/i)
        || devType.match(/BlackBerry/i)
        || devType.match(/Windows Phone/i)) {
        wbLink = "https://api.whatsapp.com/send/?phone=919756231332&text=";
    } else {
        //wbLink = "https://web.whatsapp.com/send/?phone=919756231332&text=";
        wbLink = "intent:#Intent;scheme=startci://open?url_param="
    }
    for (var j = 0; j < 9; j++) {
        var elem = elemsParents[j];
        if (i < str.length) {
            elem.style.visibility = "visible";
            var valueData = str[i];
            //console.log(valueData.imgfile);
            console.log(elem);
            elem.querySelector("iframe").src = valueData.imgfile;
            elem.querySelector("h1").textContent = valueData.title;
            //elem.querySelector("a").href="https://wa.me/+919756231332?text="+encodeURIComponent(encodeURIComponent(valueData.title)+"\n Item ID"+i);
            //elem.querySelector("a").href="https://api.whatsapp.com/send/?phone=919756231332&text="+encodeURIComponent(encodeURIComponent(valueData.title)+"\n Item ID"+i)+"&type=phone_number&app_absent=0";
            //elem.querySelector("a").href = wbLink+"I want to know More About Your Products" + encodeURIComponent("\nName : ") + encodeURIComponent(valueData.title) + encodeURIComponent(",  Item ID :") + valueData.itemcode + "&type=phone_number&app_absent=0&send=1";
            elem.querySelector("a").href = wbLink+"I want to know More About Your Products"+encodeURIComponent("\nName : ") + encodeURIComponent(valueData.title) + encodeURIComponent(",  Item ID :") + valueData.itemcode +";package=com.whatsapp;end"
            i++;
            //elem.querySelector("h1").style.fontSize = "inherit";
        } else {
            elem.querySelector("iframe").src = "";
            elem.querySelector("h1").textContent = "";
            elem.style.visibility = "hidden";
        }var devType = navigator.userAgent;
        var wbLink = "";
        if (devType.match(/Android/i)
            || devType.match(/webOS/i)
            || devType.match(/iPhone/i)
            || devType.match(/iPad/i)
            || devType.match(/iPod/i)
            || devType.match(/BlackBerry/i)
            || devType.match(/Windows Phone/i)) {
            wbLink = "https://wa.me/+919756231332?text";
        } else {
            wbLink = "https://web.whatsapp.com/send/?phone=919756231332&text";
        }var devType = navigator.userAgent;
        var wbLink = "";
        if (devType.match(/Android/i)
            || devType.match(/webOS/i)
            || devType.match(/iPhone/i)
            || devType.match(/iPad/i)
            || devType.match(/iPod/i)
            || devType.match(/BlackBerry/i)
            || devType.match(/Windows Phone/i)) {
            wbLink = "https://wa.me/+919756231332?text";
        } else {
            wbLink = "https://web.whatsapp.com/send/?phone=919756231332&text";
        }
    }
}

//Func(0);
