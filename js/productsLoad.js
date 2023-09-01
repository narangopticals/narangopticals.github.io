var str = "";

export async function Func() {
    var prodParent = fetch("../class/prodview.html").then((res) => {
        var val = res.text();
        return val;
    });

    var data = fetch("../json/prodData.json").then((res) => {
        return res.json();
    }); //.then(d => {return JSON.stringify(d)});
    //console.log(data);
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
            btn.setAttribute('onclick', 'window.loadItems('+itemStart+', '+(itemStart + 8)+')');
            itemStart = itemStart+9 ;
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
    for (var j = 0; j < 9; j++) {
        var elem = elemsParents[j];
        if (i < str.length){
            elem.style.visibility = "visible";
            var valueData = str[i];
            //console.log(valueData.imgfile);
            console.log(elem);
            elem.querySelector("img").src = valueData.imgfile;
            elem.querySelector("h1").textContent = valueData.title;
            //elem.querySelector("a").href="https://wa.me/+919756231332?text="+encodeURIComponent(encodeURIComponent(valueData.title)+"\n Item ID"+i);
            //elem.querySelector("a").href="https://api.whatsapp.com/send/?phone=919756231332&text="+encodeURIComponent(encodeURIComponent(valueData.title)+"\n Item ID"+i)+"&type=phone_number&app_absent=0";
            elem.querySelector("a").href = "https://web.whatsapp.com/send/?phone=919756231332&text=" + encodeURIComponent(valueData.title) + "\n Item ID" + i + "&type=phone_number&app_absent=0";
            i++;
        }else{
            elem.querySelector("img").src = "";
            elem.querySelector("h1").textContent = "";
            elem.style.visibility = "hidden";
        }
    }
}

Func();
