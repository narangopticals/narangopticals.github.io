var str = "";
//var section = 1;
var prodParent = ""
var prodParents = "";
var selectedItems = [];
var cartItem = [];
var cartCost = 0;
var type = "";
export async function Func() {

    prodParent = fetch("../class/prodview.html").then((res) => {
        var val = res.text();
        return val;
    });
    var framesData = "";
    try {
        var results = fetch('https://api.github.com/gists/ea3f7fa9a39a62872983e2b813441d53').then(results => {
            return results.json();
        });
        framesData = await results.then(data => {
            return data.files["prodFmData.json"].content;
        });
        setTimeout(framesData = JSON.parse(framesData), 3000);
        //framesData = (framesData.valueOf("data"))[0];
    } catch (error) {
        window.alert(error);
        framesData = fetch('../json/prodFmData.json').then(results => {
            return results.json();
        });
    }
    //console.log(data);
    var sunglassData = "";
    try {
        var results = fetch('https://api.github.com/gists/8fef5a38ff904a0c42df470064dda3f9').then(results => {
            return results.json();
        });
        sunglassData = await results.then(data => {
            return data.files["prodSgData.json"].content;
        });
        setTimeout(sunglassData = JSON.parse(sunglassData), 3000);
        //framesData = (framesData.valueOf("data"))[0];
    } catch (error) {
        window.alert(error);
        sunglassData = fetch('../json/prodSgData.json').then(results => {
            return results.json();
        });
    }

    var lensData = "";
    try {
        var results = fetch('https://api.github.com/gists/2a9920dd79543db4549056de07cc83e7').then(results => {
            return results.json();
        });
        lensData = await results.then(data => {
            return data.files["prodLnsData.json"].content;
        });
        setTimeout(lensData = JSON.parse(lensData), 3000);
        //framesData = (framesData.valueOf("data"))[0];
    } catch (error) {
        window.alert(error);
        lensData = fetch('../json/prodLnsData.json').then(results => {
            return results.json();
        });
    }
    //console.log("framesData");
    //console.log(framesData['data']);
    //console.log("sunglassData");
    //console.log(sunglassData['data']);
    //console.log("lensData");
    //console.log(lensData);
    var dbArray = Array.prototype.concat(framesData['data'], sunglassData['data'], lensData['data'])
    //console.log("mergedJSON");
    //console.log(mergedJSON);
    //console.log(mergedJSON.valueOf("data"));
    str = dbArray;
    //console.log(str);
    //console.log(str.length);
    //var dataLength = str.length;
    checkOutLater(null, null, str);

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
    var prodView = document.getElementById("mainProdView");
    prodView.innerHTML = pS;
    var cartView = document.getElementById('cartViewMini');
    var popElemText = fetch("../class/cartcost.html").then((res) => {
        return res.text();
    });
    cartView.innerHTML = await popElemText;
    var prodViews = prodView.querySelectorAll('#prodParent');
    var clearBtn = cartView.querySelector('#cartClear');
    clearBtn.addEventListener("click",
        function (e) {
            var cartBtns = prodView.querySelectorAll(".cartBtn");
            for (var i = 0; i < prodViews.length; i++) {
                var tmp = prodViews[i];
                if (tmp.style.visibility != "hidden") {
                    checkOutLater(null, cartBtns[i]);
                    //console.log(e);
                    //clearBtn.removeEventListener("click", e);
                }
            }
            if (selectedItems.length > 0) {
                clearBtn.textContent = "Clear";
            } else {
                clearBtn.textContent = "Undo";
            }
        });
    cartView.querySelector('#orderEnquiry').addEventListener("click",
        function (e) {
            //var whatsappBtns = prodView.querySelectorAll(".whatsappBtn");
            var text = "";
            for (var i = 0; i < prodViews.length; i++) {
                var tmp = prodViews[i];
                //console.log("line 148");
                //console.log(tmp);
                if (tmp.style.visibility != "hidden") {
                    //console.log("line 152 : not hidden");
                    var cartBtn = tmp.querySelector('.cartBtn');
                    var shareBtn = tmp.querySelector('.shareBtn');
                    if (cartBtn.textContent == "-") {
                        //console.log("line 156 : cartBtn.textContent = " + cartBtn.textContent);
                        var tmptxt = encodeURIComponent("\n\nName : ") +
                            encodeURIComponent(cartItem[i].title) +
                            encodeURIComponent("&  Item ID :") +
                            encodeURIComponent(cartItem[i].itemnum) +
                            encodeURIComponent("\t& Rs") + cartItem[i].cost +
                            encodeURIComponent("\nProduct Link : \n") +
                            encodeURIComponent("https://narangopticals.github.io/product" + shareBtn.value);
                        //console.log("line 159 test:");
                        //console.log(tmptxt);
                        text += tmptxt;
                    }

                }
            }
            var val = [encodeURIComponent("I want to know More About Your Products") + text +
                "&type=phone_number&app_absent=0&send=1" + encodeURIComponent("\n\nTotal : Rs.") + cartCost];
            //console.log("line 169 :" + val);
            msgWhatsapp(val);
        });

}

export function shareLinkOpen(e) {

    var obj = e.currentTarget;
    var url = "";
    if (window.document.href == "narangopticals") {
        url = "/product" + obj.value;
    } else {
        url = "/product.html" + obj.value;
    }

    window.open(url, "_blank");
}
export async function msgWhatsapp(text) {
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
export async function checkOutLater(btnLoad, pressedBtn, jsonData) {
    if (btnLoad == null && pressedBtn == null && jsonData != undefined) {
        await loadCart(jsonData);
    } else if (pressedBtn != null) {
        updateCart(pressedBtn);
        //console.log(pressedBtn);
    } else if (btnLoad != null) {

    }

    function getLoadingObjects(data, selection) {
        var arrSelect = [];
        for (var j = 0; j < selection.length; j++) {
            //console.log(data);
            var currentItemVal = selection[j];
            //console.log(currentItemVal);
            for (var i = 0; i < data.length; i++) {
                var value = data[i];
                if (value.itemnum.trim() == currentItemVal.trim()) {
                    //console.log(value);
                    arrSelect.push(value);
                }
            }
        }
        if (arrSelect.length != selection.length) {
            setCookie("incartItems", "", 10);
        }
        //console.log(arrSelect);
        cartItem = arrSelect;
    }
    function modifyCartCount() {
        var cartView = document.getElementById('cartExpand');
        var cartCounter = cartView.querySelector('#cartCounter');
        //console.log(cartCounter);
        cartCounter.textContent = selectedItems.length + " (Rs." + cartCost + ")";
    }
    function addProduct(id, btn) {
        if (selectedItems.indexOf(id) < 0) {
            selectedItems.push(id);
            setCookie("incartItems", selectedItems, 10);
            for (var i = 0; i < cartItem.length; i++) {
                if (cartItem[i].itemnum == id) {
                    cartCost += Number.parseInt(cartItem[i].cost);
                }
            }
            btn.textContent = "-";
            btn.style.background = 'linear-gradient(to bottom, maroon, rgb(172, 23, 23), maroon)';
            //console.log(selectedItems);
            modifyCartCount();
        }
    }
    function removeProduct(id, btn) {
        var itemElems = document.getElementById('mainProdView').querySelectorAll('#prodParent');
        cartCost = 0;
        if (selectedItems.indexOf(id) > -1) {
            var newSelection = [];
            cartCost = 0;
            for (let i = 0; i < selectedItems.length; i++) {
                var element = selectedItems[i];
                if (element != id) {
                    newSelection.push(element);
                    //console.log("index " + i);
                    if (cartItem[i].cost.length > 0) {
                        cartCost += Number.parseInt(cartItem[i].cost);
                    }
                }
            }
        }
        btn.textContent = "+";
        btn.style.background = 'linear-gradient(to bottom, rgb(107, 128, 0),rgb(150, 179, 3),rgb(107, 128, 0))';
        selectedItems = newSelection;
        setCookie("incartItems", selectedItems, 10);
        modifyCartCount();
    }

    function updateProductCount() {
        var totalSelected = selectedItems.length;
        var prodView = window.document.getElementById('mainProdView');
        var cartBtns = prodView.querySelectorAll('button[class^=cartBtn]');
        //console.log("updateProductCount:" + totalSelected);
        var idBtnsLen = cartBtns.length;
        //console.log("updateProductCount: idBtnsLen =" + idBtnsLen);

        for (var j = 0; j < idBtnsLen; j++) {
            var currentBtn = cartBtns[j];
            if (currentBtn.parentNode.parentNode.style.visibility != "hidden") {
                currentBtn.textContent = "+";
                currentBtn.style.background = 'linear-gradient(to bottom, rgb(107, 128, 0),rgb(150, 179, 3),rgb(107, 128, 0))';
                var currentBtnVal = currentBtn.value.toString();
                //console.log("updateProductCount: currentBtn.value =" + currentBtnVal);
                //console.log("updateProductCount: selItemID =" + selItemIdstr);
                for (var i = 0; i < totalSelected; i++) {
                    var selItemID = selectedItems[i];
                    var selItemIdstr = selItemID.toString();
                    selItemIdstr = selItemIdstr.trim();
                    if (currentBtnVal == selItemIdstr) {
                        //console.log("match found");
                        //console.log(currentBtn);
                        currentBtn.textContent = "-";
                        currentBtn.style.background = 'linear-gradient(to bottom, maroon, rgb(172, 23, 23), maroon)';
                    }
                }
            }
        }
        modifyCartCount();
    }

    function updateCart(btn) {
        var idMod = "";
        if (btn != undefined) {
            idMod = btn.value;
        }
        //console.log(idMod.length);
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
        updateCartItem();
    }


    async function loadCart(jsonData) {
        var cartString = await getCookie("incartItems");
        //console.log(cartString);
        if (cartString.length > 0) {
            selectedItems = cartString.split(",")
        }
        //console.log(selectedItems);
        var dataLength = selectedItems.length;
        getLoadingObjects(jsonData, selectedItems);
        if (dataLength > 8) {
            await addPagesNavBtn(dataLength);
            await addItemViews(0, 9);
            await loadItems(0, 9, 0);
        } else {
            await addPagesNavBtn(dataLength);
            await addItemViews(0, 9);
            await loadItems(0, dataLength, 0);
        }
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
function updateCartItem() {
    var cartView = window.document.getElementById('cartViewMini');
    var popElemt = cartView.querySelector('#cartElemt');
    var matterView = popElemt.querySelector('#cartMatter');
    var costs = [];
    var cost = 0;
    var costBreakDown = [];
    for (var j = 0; j < selectedItems.length; j++) {
        var selItemNum = selectedItems[j];
        for (var i = 0; i < cartItem.length; i++) {
            var curCartItem = cartItem[i];
            var curCartItemNum = curCartItem.itemnum;
            if (curCartItemNum == selItemNum) {
                var tmp = curCartItem.cost;
                costs.push(tmp);
                cost += Number.parseInt(tmp);
                var string = "<tr><td>\u25CF" + (i + 1) + ".</td><td>" + cartItem[i].title + "</td><td>= Rs." + tmp + "</td></tr>";
                costBreakDown.push(string);
            }
        }
    }
    cartCost = cost;
    var totalCost = "<tr><td>" + "</td><td>Total Cost</td><td>= Rs." + cost.toString() + "</td></tr>";
    matterView.innerHTML = costBreakDown.join("") + totalCost;
}
export async function loadItems(startNum, endNum, pgNum) {

    var elemsParents = window.document.querySelectorAll('div[class^=grid]');
    //console.log(elemsParents);
    var i = startNum;
    for (var j = 0; j < 9; j++) {
        var elem = elemsParents[j];
        if (i < selectedItems.length) {
            elem.style.visibility = "visible";
            if (i < cartItem.length) {
                var valueData = cartItem[i];
                elem.querySelector("iframe").src = await valueData.imgfile;
                var valString = Number.parseInt(await valueData.cost) > 0 ?
                    ("<span>Rs." + valueData.cost + "<br>" + valueData.title + "</span>") :
                    ("<span>" + valueData.title + "</span>");
                elem.querySelector("h1").innerHTML = valString;
                var val = [encodeURIComponent("I want to know More About Your Products") +
                    encodeURIComponent("\nName : ") +
                    encodeURIComponent(valueData.title) +
                    encodeURIComponent(",  Item ID :") +
                    encodeURIComponent(valueData.itemnum) +
                    "&type=phone_number&app_absent=0&send=1"];
                var whatsappBtn = elem.querySelector("button[class^=whatsappBtn]");
                whatsappBtn.values = val;
                whatsappBtn.addEventListener("click",
                    function (e) {

                        var obj = e.currentTarget;
                        var text = obj.values[0];
                        msgWhatsapp(text);
                    });
                var cartBtn = elem.querySelector("button[class^=cartBtn]");
                cartBtn.value = valueData.itemnum;
                //checkOutLater(cartBtn, null);
                cartBtn.addEventListener("click",
                    function (e) {
                        checkOutLater(null, e.target);
                    });
                var shareBtn = elem.querySelector("button[class^=shareBtn]");
                var urlValue = "?type=" + cartItem[i].type + "&itemnum=" + cartItem[i].itemnum;
                shareBtn.value = urlValue;
                shareBtn.addEventListener("click",
                    function (e) {
                        shareLinkOpen(e);
                    });
                i++;
            }
        } else {
            elem.querySelector("iframe").src = "";
            elem.querySelector("h1").innerHTML = "";
            elem.style.visibility = "hidden";
        }
        var btnParent = window.document.getElementById("btnNavProdView").getElementsByTagName('button');
        var len = btnParent.length;
        for (var k = 0; k < len; k++) {
            if (k == pgNum) {
                btnParent[k].style.background = 'linear-gradient(to bottom,rgb(48, 48, 48), rgb(132, 132, 132), rgb(105, 105, 105), rgb(63, 63, 63))';
            } else {
                btnParent[k].style.background = 'linear-gradient(to bottom,rgb(135, 134, 134), rgb(152, 144, 144), rgb(105, 105, 105), rgb(152, 144, 144), rgb(135, 134, 134)) ';
            }
        }
    }
    updateCartItem();
    //setTimeout(checkOutLater(null, null), 10000);
}

export async function cartToggle(e) {
    var popElemt = document.getElementById('cartViewMini').querySelector('#cartElemt');
    if (popElemt.style.display == "none") {
        popElemt.style.display = "";
        //popElemt.querySelector('#cartCloser').style.top = "-45px";
    } else {
        popElemt.style.display = "none";
    }

}