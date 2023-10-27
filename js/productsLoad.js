var str;
//var section = 1;
var type = "";
export async function Func(section) {
    var prodParent = fetch("../class/prodview.html").then((res) => {
        var val = res.text();
        return val;
    });
    var data = "";
    if (section == 0) {
        type = "frames";
        try {
            var results = fetch('https://api.github.com/gists/ea3f7fa9a39a62872983e2b813441d53').then(results => {
                return results.json();
            });
            data = await results.then(data => {
                return data.files["prodFmData.json"].content;
            });
            setTimeout(data = JSON.parse(data), 3000);
        } catch (error) {
            window.alert(error);
            data = fetch('../json/prodFmData.json').then(results => {
                return results.json();
            });
        }
        /*data = await results.then(data => {
            return data.files["prodFmData.json"].content;
        });*/

        //console.log(data);
    } else if (section == 1) {
        type = "sunglass";
        try {
            var results = fetch('https://api.github.com/gists/8fef5a38ff904a0c42df470064dda3f9').then(results => {
                return results.json();
            });
            data = await results.then(data => {
                return data.files["prodSgData.json"].content;
            });
            setTimeout(data = JSON.parse(data), 3000);
            //framesData = (framesData.valueOf("data"))[0];
        } catch (error) {
            window.alert(error);
            data = fetch('../json/prodSgData.json').then(results => {
                return results.json();
            });
        }
    } else if (section == 2) {
        type = "lens";
        try {
            var results = fetch('https://api.github.com/gists/2a9920dd79543db4549056de07cc83e7').then(results => {
                return results.json();
            });
            data = await results.then(data => {
                return data.files["prodLnsData.json"].content;
            });
            setTimeout(data = JSON.parse(data), 3000);
            //framesData = (framesData.valueOf("data"))[0];
        } catch (error) {
            window.alert(error);
            data = fetch('../json/prodLnsData.json').then(results => {
                return results.json();
            });
        }
    }
    str = Object.values((await data).valueOf("data"))[0];
    //console.log(str);
    var dataLength = str.length;
    var prodParents = "";
    if (dataLength > 8) {
        await addPagesNavBtn(dataLength);
        await addItemViews(0, 9);
        await loadItems(0, 9, 0);
    } else {
        await addPagesNavBtn(dataLength);
        await addItemViews(0, dataLength);
        await loadItems(0, dataLength, 0);
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
            btn.setAttribute('onclick', 'window.loadItems(' + itemStart + ', ' + (itemStart + 8) + ', ' + i + ')');
            itemStart = itemStart + 9;
        }
        //window.document.getElementById("btnNavProdView2").innerHTML = document.getElementById("btnNavProdView").innerHTML;
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
        //var prodView = document.getElementById("mainProdView");
        var mainView = window.document.getElementById('mainProdView');
        if (mainView == null) {
            mainView = window.document.getElementById('prodView');
        }
        mainView.innerHTML = pS;
        mainView = document.getElementById("mainProdView");
        var prodViews = mainView.querySelectorAll('#prodParent');
        for (var i = startNum; i < endNum; i++) {
            var elem = prodViews[i];
            var whatsappBtn = elem.querySelector("button[class^=whatsappBtn]");
            var cartBtn = elem.querySelector("button[class^=cartBtn]");
            whatsappBtn.addEventListener("click",
                function (e) {
                    msgWhatsapp(e);
                });

            var shareBtn = elem.querySelector("button[class^=shareBtn]");
            shareBtn.addEventListener("click",
                function (e) {
                    var obj = e.currentTarget;
                    var url = obj.value;
                    window.open(url, "_blank");
                });
            checkOutLater(cartBtn, null);
            cartBtn.addEventListener("click",
                function (e) {
                    checkOutLater(null, e.target);
                });
            var prevBtn = elem.querySelector("button[id^=grid" + i + "Prev]");
            prevBtn.value = "grid" + i;
            prevBtn.addEventListener("click",
                function (e) {
                    imgSwitch('prev', e.currentTarget.value, '');
                });
            var nextBtn = elem.querySelector("button[id^=grid" + i + "Next]");
            nextBtn.value = "grid" + i;
            nextBtn.addEventListener("click",
                function (e) {
                    imgSwitch('next', e.currentTarget.value, '');
                });
        }
    }

}
export async function imgSwitch(func, grid, setItem) {
    //console.log("line 143 : imgSwitch : func = " + func + "\n grid = " + grid);
    var mainView = window.document.getElementById('mainProdView');
    if (mainView == null) {
        mainView = window.document.getElementById('prodView');
    }
    var elem = mainView.querySelector('div[class^=' + grid);
    var iframeHolder = elem.querySelector('#iframeHolder');
    //console.log("line 158 : imgSwitch : iframeHolder = ");
    //console.log(iframeHolder);
    var frames = iframeHolder.querySelectorAll('iframe');
    var lenIframes = frames.length;
    //console.log("line 162 : imgSwitch : lenIframes = " + lenIframes);
    var current = Number.parseInt(iframeHolder.value);
    //var setItem;
    if (setItem.length == 0) {

        if (func.trim() == "prev") {
            if (current == 0) {
                setItem = lenIframes - 1;
            } else if (current > 0) {
                setItem = current - 1;
            }
        } else {
            if (current == lenIframes - 1) {
                setItem = 0;
            } else if (current < lenIframes - 1) {
                setItem = current + 1;
            }
        }
    }
    //console.log("line 177 : imgSwitch : setItem = " + setItem + "\n current=" + current);
    if (setItem > -1 && setItem < lenIframes) {
        //console.log("line 179 : imgSwitch : setItem = " + setItem);
        iframeHolder.value = setItem;
        for (var i = 0; i < lenIframes; i++) {
            frames[i].style.display = "none";
            if (i == setItem) {
                frames[i].style.display = "";
            }
        }
    }
}
export async function msgWhatsapp(e) {
    var obj = e.currentTarget;
    var text = obj.values[0];
    //console.log(text.length);
    if (text.length > 0) {
        var devType = navigator.userAgent;
        var wbLink = "";
        if (devType.match(/Android/i)
            || devType.match(/webOS/i)
            || devType.match(/iPhone/i)
            || devType.match(/iPad/i)
            || devType.match(/iPod/i)
            || devType.match(/BlackBerry/i)
            || devType.match(/Windows Phone/i)) {
            wbLink = "https://wa.me/+919756231332?text=";
        } else if (devType.match(/Linux/i)) {
            wbLink = "https://web.whatsapp.com/send/?phone=919756231332&text=";
        } else {
            wbLink = "https://api.whatsapp.com/send/?phone=919756231332&text=";
        }
        window.open(wbLink + text, "_blank");
    }
}
export var selectedItems = [];
export async function checkOutLater(btnLoad, pressedBtn) {
    if (btnLoad == null && pressedBtn == null) {
        await loadCart();
    } else if (pressedBtn != null) {
        updateCart(pressedBtn);
        //console.log(pressedBtn);
    } else if (btnLoad != null) {
        loadButton(btnLoad);
    }
    function loadButton(btn) {
        var idMod = "";
        if (btn != undefined) {
            idMod = btn.value;
        }
        //console.log(idMod.length);
        if (idMod.length > 0) {
            if (selectedItems.length > 0) {
                if (selectedItems.indexOf(idMod) > -1) {
                    //btn.innerHTML = "-";
                    btn.style.background = 'linear-gradient(to bottom, maroon, rgb(172, 23, 23), maroon)';
                    btn.dataCart = 'true';
                    //console.log(selectedItems);
                }
            }
        }
    }
    function modifyCartCount() {
        var cartView = document.getElementById('cartExpand');
        var cartCounter = cartView.querySelector('#cartCounter');
        //console.log(cartCounter);
        cartCounter.textContent = selectedItems.length;
    }
    function addProduct(id, btn) {
        if (selectedItems.indexOf(id) < 0) {
            selectedItems.push(id);
            setCookie("incartItems", selectedItems, 10);
            //btn.textContent = "-";
            //btn.innerHTML = "-";// <span style=\"background:black; font-size:larger;\">&#128722;</span>";
            btn.style.background = 'linear-gradient(to bottom, maroon, rgb(172, 23, 23), maroon)';
            btn.dataCart = 'true';
            //console.log(selectedItems);
            modifyCartCount();
        }
    }
    function removeProduct(id, btn) {
        if (selectedItems.indexOf(id) > -1) {
            var newSelection = [];
            for (let index = 0; index < selectedItems.length; index++) {
                var element = selectedItems[index];
                if (element != id) {
                    newSelection.push(element);
                }
            }
            //btn.textContent = "+";
            //btn.innerHTML = "+";// <span style=\"background:black; font-size:larger;\">&#128722;</span>";
            btn.style.background = 'linear-gradient(to bottom, rgb(55, 55, 55),rgb(22, 22, 22),rgb(0, 0, 0),rgb(22, 22, 22),rgb(55, 55, 55))';
            btn.dataCart = 'false';
            selectedItems = newSelection;
            setCookie("incartItems", selectedItems, 10);
            modifyCartCount();
        }
    }
    function updateProductCount() {
        var totalSelected = selectedItems.length;
        //var prodView = window.document.getElementById('mainProdView');
        var mainView = window.document.getElementById('mainProdView');
        if (mainView == null) {
            mainView = window.document.getElementById('prodView');
        }
        var cartBtns = mainView.querySelectorAll('button[class^=cartBtn]');
        //console.log("updateProductCount:" + totalSelected);
        var idBtnsLen = cartBtns.length;
        //console.log("updateProductCount: idBtnsLen =" + idBtnsLen);

        for (var j = 0; j < idBtnsLen; j++) {
            var currentBtn = cartBtns[j];
            //currentBtn.textContent = "+";
            //currentBtn.innerHTML = "+";// <span style=\"background:black; font-size:larger;\">&#128722;</span>";
            currentBtn.style.background = 'linear-gradient(to bottom, rgb(55, 55, 55),rgb(22, 22, 22),rgb(0, 0, 0),rgb(22, 22, 22),rgb(55, 55, 55))';
            currentBtn.dataCart = 'false';
            var currentBtnVal = currentBtn.value.toString();
            //console.log("updateProductCount: currentBtn.value =" + currentBtnVal);
            //console.log("updateProductCount: selItemID =" + selItemIdstr);
            for (var i = 0; i < totalSelected; i++) {
                var selItemID = selectedItems[i];
                var selItemIdstr = selItemID.toString()
                selItemIdstr = selItemIdstr.trim();
                if (currentBtnVal == selItemIdstr) {
                    //console.log("match found");
                    //console.log(currentBtn);
                    //currentBtn.textContent = "-";
                    //currentBtn.innerHTML = "-";// <span style=\"background:black; font-size:larger;\">&#128722;</span>";
                    currentBtn.style.background = 'linear-gradient(to bottom, maroon, rgb(172, 23, 23), maroon)';
                    currentBtn.dataCart = 'true';
                }
            }
        }
        modifyCartCount();
    }

    function updateCart(btn) {
        var idMod = "";
        //console.log("line 258:");
        //console.log(btn);
        if (btn != undefined) {
            idMod = btn.value;
            //console.log("line 262:");
            //console.log(idMod);
        }
        //console.log(idMod.length);
        //if (idMod != null) {
        if (idMod.length > 0) {
            if (selectedItems.length > 0) {
                if (selectedItems.indexOf(idMod) > -1) {
                    removeProduct(idMod, btn);
                } else {
                    addProduct(idMod, btn);
                }
            } else {
                addProduct(idMod, btn);
            }
        }
        //}

    }
    async function loadCart() {
        var cartString = await getCookie("incartItems");
        //console.log(cartString);
        if (cartString.length > 0) {
            selectedItems = cartString.split(",")
        }
        //console.log(selectedItems);
        updateProductCount();
    }
    async function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    async function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}
export async function mainShareBtn(btn, type, itemnum) {
    //console.log(btn);
    var url = "/product.html?type=" + type + "&itemnum=" + itemnum;
    btn.href = url;
}
export async function loadItems(startNum, endNum, pgNum) {

    var elemsParents = window.document.querySelectorAll('div[id^=prodParent]');
    //console.log(elemsParents);
    var i = startNum;
    for (var j = 0; j < 9; j++) {
        var elem = elemsParents[j];
        if (i < str.length) {
            var iframeHolder = elem.querySelector("#iframeHolder");
            //console.log("Line 325 : Loading Item: " + i + "\nin view number : " + j);
            iframeHolder.innerHTML = "";
            elem.style.visibility = "visible";
            var valueData = str[i];
            var imgs = valueData.imgfile;
            //console.log(imgs);
            for (var k = 0; k < imgs.length; k++) {
                //console.log("Line 331 : i= " + i + "\nj = " + j + "\nk = " + k);
                iframeHolder.innerHTML += "<iframe style=\"height: 100%;width: 100%;\" id=\"iframe" + j + "img" + k + "\" src=\"" + imgs[k] + "\"></iframe>";
            }
            imgSwitch('', 'grid' + j, 0);
            iframeHolder.value = 0;
            //console.log("ling 335 : elem : ");
            //console.log(elem);
            var valString = Number.parseInt(valueData.cost.trim()) > 0 ?
                        ("Rs. " + valueData.cost + "<br>" + valueData.title) :
                        (valueData.title);
            /*var valString = "";
            if (valueData.type == 'lens') {
            valString = valueData.title;
            } else {
                valString =
                    Number.parseInt(valueData.cost.trim()) > 0 ?
                        ("Rs. " + valueData.cost + "<br>" + valueData.title) :
                        (valueData.title);
            }*/
            elem = elemsParents[j];
            if (valString != null) {
                elem.querySelector("h1").innerHtml = valString;
            }

            var val = [encodeURIComponent("I want to know More About Your Products") +
                encodeURIComponent("\nName : ") +
                encodeURIComponent(valueData.title) +
                encodeURIComponent(",  Item ID :") +
                encodeURIComponent(valueData.itemnum) +
                "&type=phone_number&app_absent=0&send=1"];
            var whatsappBtn = elem.querySelector("button[class^=whatsappBtn]");
            var cartBtn = elem.querySelector("button[class^=cartBtn]");
            whatsappBtn.values = val;
            cartBtn.value = valueData.itemnum;
            var shareBtn = elem.querySelector("button[class^=shareBtn]");
            shareBtn.value = "/product.html?type=" + type + "&itemnum=" + valueData.itemnum;
            i++;
        } else {
            elem.querySelector("#iframeHolder").innerHtml = "";
            elem.querySelector("h1").textContent = "";
            elem.style.visibility = "hidden";
        }

    }
    var btnParent = window.document.getElementById("btnNavProdView").getElementsByTagName('button');
    var len = btnParent.length;
    for (var k = 0; k < len; k++) {
        if (k == pgNum) {
            btnParent[k].style.background = 'linear-gradient(#292929, #252525,#212121, #252525, #292929)';
        } else {
            btnParent[k].style.background = 'linear-gradient(#545454, #3e3e3e,#292929, #3e3e3e, #545454)';
        }
    }
    setTimeout(checkOutLater(null, null), 10000);
}