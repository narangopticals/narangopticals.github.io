import { grabData } from "../js/fetDt.js"
import { filterKeys, getFiltered } from "../js/general.js";
var str;
var currentPgNum = -1;
//var section = 1;
var type = "";
var keys = null;
var minCost = null;
var maxCost = null;
var sectionCurrent = 0;
var filtered = false;
var viewOrientation = '';
var imgWidth = '100%';
var swipeUp = false;
var dataLength = 0;
var itemLoadNum = 0;
export function setFiltered(boolVal) {
    //console.log('setFiltered(boolVal) = ' + boolVal);
    filtered = boolVal;
}
export function setKeys(keysnew) {
    //console.log('setKeys(keysnew) = ');
    //console.log(keysnew);
    keys = keysnew;
}
export function setHigh(cost) {
    //console.log('setHigh(cost) = ' + cost);
    maxCost = cost;
}
export function setLow(cost) {
    //console.log('setLow(cost) = ' + cost);
    minCost = cost;
}
export async function Func(section, page) {
    swipeUp = false;
    sectionCurrent = section;
    var data = "";
    if (viewOrientation == undefined) {
        viewOrientation = window.screen.orientation.type;
    } if (viewOrientation.length <= 0) {
        viewOrientation = window.screen.orientation.type;
    }
    var prodParent;
    if (viewOrientation.indexOf('portrait') >= 0) {

        prodParent = fetch("../class/prodviewP.html").then((res) => {
            var val = res.text();
            return val;
        });
        imgWidth = '100vw';
    } else if (viewOrientation.indexOf('landscape') >= 0) {
        prodParent = fetch("../class/prodviewL.html").then((res) => {
            var val = res.text();
            return val;
        });
        imgWidth = '100%';
    }
    async function initMain(section) {
        if (section == 0) {
            document.title = "loading, Frames | Narang Opticals, Kashipur";
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
                window.alert("Internet Connectivity Error , or hourly usage limit exceeded protected for security.");
                /*data = fetch('../json/prodFmData.json').then(results => {
                    return results.json();
                });*/
            }

            //console.log(data);
        } else if (section == 1) {
            document.title = "loading, Sunglasses | Narang Opticals, Kashipur";
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
                window.alert("Internet Connectivity Error , or hourly usage limit exceeded protected for security.");
                /*data = fetch('../json/prodSgData.json').then(results => {
                    return results.json();
                });*/
            }
        } else if (section == 2) {
            document.title = "loading, Lenses | Narang Opticals, Kashipur";
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
                window.alert("Internet Connectivity Error , or hourly usage limit exceeded protected for security.");
                /*data = fetch('../json/prodLnsData.json').then(results => {
                    return results.json();
                });*/
            }
        } else if (section == 3) {
            document.title = "loading, Readymade | Narang Opticals, Kashipur";
            type = "readymade";
            try {
                var results = fetch('https://api.github.com/gists/2999fc336989306ae76d3e11611c44fe').then(results => {
                    return results.json();
                });
                data = await results.then(data => {
                    return data.files["prodRdyData.json"].content;
                });
                setTimeout(data = JSON.parse(data), 3000);
                //framesData = (framesData.valueOf("data"))[0];
            } catch (error) {
                window.alert("Internet Connectivity Error , or hourly usage limit exceeded protected for security.");
                /*data = fetch('../json/prodRdyData.json').then(results => {
                    return results.json();
                });*/
            }
        } else if (section == 4) {
            document.title = "loading, Watches | Narang Opticals, Kashipur";
            type = "watch";
            try {
                var results = fetch('https://api.github.com/gists/a54c544dee909008b0cb98db283c9f64').then(results => {
                    return results.json();
                });
                data = await results.then(data => {
                    return data.files["prodWatchData.json"].content;
                });
                setTimeout(data = JSON.parse(data), 3000);
                //framesData = (framesData.valueOf("data"))[0];
            } catch (error) {
                window.alert("Internet Connectivity Error , or hourly usage limit exceeded protected for security.");
                /*data = fetch('../json/prodRdyData.json').then(results => {
                    return results.json();
                });*/
            }
        }
        str = Object.values((await data).valueOf("data"))[0];
    }

    async function initTest(section) {
        if (section == 0) {
            type = "frames";
        } else if (section == 1) {
            type = "sunglass";
        } else if (section == 2) {
            type = "lens";
        } else if (section == 2) {
            type = "readymade";
        }
        str = await grabData(type);
    }

    if (page == 0) {
        addItems();
    } else {
        await initMain(section);
        if ((await str) != null) {
            /*var keys = new filterKeys();
            keys.front = "plastic";
            keys.pattern = "multicolor";*/
            str = await getFiltered(str, minCost, maxCost, keys);
            dataLength = (await str).length;
            if (dataLength > 8) {
                await addLoadMoreView();
                //await addPagesNavBtn(dataLength);
                await addItemViews(0, 9);
                var starts = 0;
                var pgNum = 0;
                if (page <= Math.ceil(dataLength / 9) && page > 0) {
                    //console.log("line 134");
                    pgNum = (page - 1);
                    starts = (pgNum * 9);
                }

                //console.log("line 137 : starts = " + starts + "\n page=" + pgNum);
                await loadItems(starts, dataLength, pgNum);
            } else {
                //await (dataLength);
                await addItemViews(0, dataLength);
                await loadItems(0, dataLength, 0);
            }
        }
    }
    //await initTest(section);

    //console.log(str);

    async function addItems() {
        await addItemViews(itemLoadNum, itemLoadNum + 9);
        await loadItems(itemLoadNum, dataLength, 0);
    }
    async function addLoadMoreView() {
        var scrollViewElem = document.getElementById("scrollView");

        var devType = navigator.userAgent;
        if (devType.match(/Android/i)
            || devType.match(/webOS/i)
            || devType.match(/iPhone/i)
            || devType.match(/iPad/i)
            || devType.match(/iPod/i)
            || devType.match(/BlackBerry/i)
            || devType.match(/Windows Phone/i)) {

            var sv_touchstartX, sv_touchstartY, sv_touchendX, sv_touchendY;
            scrollViewElem.textContent = "Drag up Twice: Load More";
            scrollViewElem.addEventListener('touchstart', function (event) {
                sv_touchstartX = event.changedTouches[0].screenX;
                sv_touchstartY = event.changedTouches[0].screenY;
            }, false);

            scrollViewElem.addEventListener('touchend', function (event) {
                sv_touchendX = event.changedTouches[0].screenX;
                sv_touchendY = event.changedTouches[0].screenY;
                var changeY = Math.abs(sv_touchendY - sv_touchstartY);
                var changeX = Math.abs(sv_touchendX - sv_touchstartX);
                if (sv_touchendY < sv_touchstartY && changeX < changeY) {
                    //console.log('Swiped Up');
                    if (swipeUp) {
                        setTimeout(Func(sectionCurrent, 0), 3000);
                    }
                    swipeUp = true;
                }

                if (sv_touchendY > sv_touchstartY && changeX < changeY) {
                    //console.log('Swiped Down');
                }
                if (sv_touchendY === sv_touchstartY && sv_touchendX === sv_touchstartX) {
                    //console.log('Tap');
                }
            }, false);
        } else {
            scrollViewElem.textContent = "Click to Load More";
            scrollViewElem.addEventListener("click", function (e) {
                setTimeout(Func(sectionCurrent, 0), 3000);
            });
        }

    }
    /*async function addPagesNavBtn(dataLength) {
        var btnParent = document.getElementById("btnNavProdView");
        var dtl = dataLength + 1;
        var pagesLen = Math.ceil(dtl / 9);
        if (pagesLen > 1) {
            btnParent.style.visibility = 'visible';
            var pagesView = fetch("../class/pagesview.html").then((res) => {
                return res.text();
            });
            var pagesBtns = "";
            for (var i = 1; i <= pagesLen; i++) {
                var pagesBtns = pagesBtns + "\n" + (await pagesView)
                    .replaceAll('prodPagesBtn', 'prodPagesBtn' + i)
                    .replaceAll('</button>', 'Page: ' + i + '</button>');
            }
            btnParent.innerHTML = pagesBtns;
            btnParent = document.getElementById("btnNavProdView");
            var btns = btnParent.querySelectorAll('button');
            var itemStart = 0;
            for (var i = 0; i < btns.length; i++) {
                var btn = btns[i];
                //btn.setAttribute('onclick', 'window.loadItems(' + itemStart + ', ' + (itemStart + 8) + ', ' + i + ')');
                btn.setAttribute('onclick', 'window.loadItems(' + itemStart + ', ' + (itemStart + 8) + ', ' + i + ')');
                itemStart = itemStart + 9;
            }
        } else {
            btnParent.style.visibility = 'hidden';
        }
        //window.document.getElementById("btnNavProdView2").innerHTML = document.getElementById("btnNavProdView").innerHTML;
    }*/
    async function addItemViews(startNum, endNum) {
        var scrollView = window.document.querySelector('#scrollView');
        if (startNum + 9 >= str.length) {
            scrollView.style.display = 'none';
        } else {
            scrollView.style.display = '';
        }
        var prodParents = "";
        var prodHolder = window.document.getElementById('prodMain');
        prodHolder.innerHTML += '<div class="mainProdView" id="mainProdView' + startNum + '" style="  height: 100%;\
  width: 100vw;\
  margin: 0;"></div>';
        for (var i = startNum; i < endNum; i++) {
            //console.log(prodParent);
            var vW = (await prodParent).replaceAll('grid', 'grid' + i);
            //console.log(vW);
            prodParents = prodParents + "\n" + vW;
            //console.log(prodParents);
        }
        var pS = prodParents.toString();
        //var prodView = document.getElementById("mainProdView");
        var mainView = window.document.getElementById('mainProdView' + startNum);
        mainView.innerHTML = pS;
        mainView = document.getElementById('mainProdView' + startNum);
        var prodViews = window.document.querySelectorAll('#prodParent');
        for (var i = 0; i < endNum; i++) {
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
            var imgParent = elem.querySelector('.grid' + i + 'Img');
            swipeFeature(imgParent);
        }
    }

    function swipeFeature(imgParent) {

        var prevBtn = imgParent.parentNode.querySelector("button[id^=grid" + i + "Prev]");
        var nextBtn = imgParent.parentNode.querySelector("button[id^=grid" + i + "Next]");
        //framesTotal = catFrames.length;
        var touchstartX, touchstartY, touchendX, touchendY;
        imgParent.addEventListener('touchstart', function (event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, false);

        imgParent.addEventListener('touchend', function (event) {
            //console.log("event.target:");
            //console.log(event.target);
            //console.log('imgParent:');
            var imgParent = event.target.parentNode.parentNode.parentNode;
            //console.log(imgParent);
            //console.log();
            var prevBtn = imgParent.querySelector('#' + imgParent.className.replaceAll('Img', 'Prev'));
            var nextBtn = imgParent.querySelector('#' + imgParent.className.replaceAll('Img', 'Next'));
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            //autoSwipe = false;
            /*setTimeout(handleGesture();, 500);*/
            var changeY = Math.abs(touchendY - touchstartY);
            var changeX = Math.abs(touchendX - touchstartX);
            if (touchendX < touchstartX && changeX > changeY) {
                //console.log('Swiped Left');
                imgSwitch('next', nextBtn.value, '');
                //autoSwipe = true;
                //setTimeout(firstRun, 5000);
            }

            if (touchendX > touchstartX && changeX > changeY) {
                //console.log('Swiped Right');
                imgSwitch('prev', prevBtn.value, '');
                //autoSwipe = true;
                //setTimeout(firstRun, 5000);
            }
            if (touchendY === touchstartY && touchendX === touchstartX) {
                //console.log('Tap');
                var shareBtn = imgParent.parentNode.querySelector('.shareBtn');
                var url = shareBtn.value;
                window.open(url, "_blank");
            }
        }, false);

    }

}
export async function imgSwitch(func, grid, setItem) {
    //console.log("line 143 : imgSwitch : func = " + func + "\n grid = " + grid);
    /*var mainView = window.document.getElementById('mainProdView');
    if (mainView == null) {
        mainView = window.document.getElementById('prodView');
    }*/
    var elem = window.document.querySelector('div[class^=' + grid + ']');
    var iframeHolder = elem.querySelector('#iframeHolder');
    //console.log("line 158 : imgSwitch : iframeHolder = ");
    //console.log(iframeHolder);
    var frames = iframeHolder.querySelectorAll('[id^=iframe]');
    var lenIframes = frames.length;
    //console.log("line 162 : imgSwitch : lenIframes = " + lenIframes);
    var current = Number.parseInt(iframeHolder.value);
    //var setItem;
    if (lenIframes != 0) {
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
                    //console.log("line 293 " + frames[i].src);
                    if (frames[i].src.length > 0) {
                        elem.querySelector('#imgCount').textContent = (i + 1) + '/' + lenIframes;
                    } else {
                        elem.querySelector('#imgCount').textContent = 0 + '/' + 0;
                    }
                }
            }
        }
    } else {
        elem.querySelector('#imgCount').textContent = 0 + '/' + 0;
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
        if (cartView != undefined) {
            var cartCounter = cartView.querySelector('#cartCounter');
            //console.log(cartCounter);
            cartCounter.textContent = selectedItems.length;
        }
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
        /*var mainView = window.document.getElementById('mainProdView');
        if (mainView == null) {
            mainView = window.document.getElementById('prodView');
        }
        var cartBtns = mainView.querySelectorAll('button[class^=cartBtn]');*/
        //console.log("updateProductCount:" + totalSelected);
        var cartBtns = window.document.querySelectorAll('button[class^=cartBtn]');
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
            selectedItems = cartString.split(",");
        }
        //console.log(selectedItems);
        updateProductCount();
    }
    async function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite = Strict";
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
    if (filtered) {
        window.history.pushState('Page ' + (pgNum + 1), '', '/products.html');
    } else {
        window.history.pushState('Page ' + (pgNum + 1), '', '/products.html?sect=' + sectionCurrent + '&page=' + (pgNum + 1));
    }


    currentPgNum = pgNum;
    /*var home = window.location.origin + "/?";
    var loc = window.location.href;
    if (loc.indexOf(home) > -1 && window.location.pathname.trim() == "/") {
        //console.log("line 451");
        //window.location.href = window.location.origin + "/?sect=" + currentSection + "&page=" + pgNum;
    }*/
    var elemsParents = window.document.querySelectorAll('div[id^=prodParent]');
    //console.log(elemsParents);
    var i = startNum;
    var newEnd = (startNum + 9);
    for (var j = startNum; j < newEnd; j++) {
        var elem = elemsParents[j];
        if (i < str.length) {
            //console.log(elem);
            var iframeHolder = elem.querySelector("#iframeHolder");
            //console.log("Line 325 : Loading Item: " + i + "\nin view number : " + j);
            iframeHolder.innerHTML = "";
            elem.style.visibility = "visible";
            var valueData = str[i];
            var imgs = valueData.imgfile;
            //console.log(imgs);
            var imgLen = imgs.length;
            for (var k = 0; k < imgLen; k++) {
                //console.log("Line 331 : i= " + i + "\nj = " + j + "\nk = " + k);
                if (imgs[k].length > 0) {
                    //v1.1.4b until
                    //var link = "https://drive.google.com/file/d/" + imgs[k] + "/preview";
                    //v1.1.4c [update]
                    var link = "https://drive.google.com/thumbnail?id=" + imgs[k] + "&sz=w450-h450";
                    iframeHolder.innerHTML += "<img style=\"height: 1;\
                    width: " + imgWidth + ";\" id=\"iframe" + j + "img" + k + "\" src=\"" + link + "\"></img>";
                }
            }

            //elem.querySelector('#imgCount').textContent = '1/' + imgLen;
            imgSwitch('', 'grid' + j, 0);
            iframeHolder.value = 0;
            //console.log("ling 335 : elem : ");
            //console.log(elem);
            var cost = "";
            var title = "";
            if (valueData.cost.trim().indexOf('/e') < 0) {
                cost = Number.parseInt(valueData.cost.trim()) > 0 ? ("Rs. " + valueData.cost + "<br>") : "";
            }
            if (valueData.title.trim().indexOf('/e') < 0) {
                title = valueData.title;
            }
            var valString = cost + title;
            //console.log(valString);
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
                //console.log("valString :" + valString + "\nlength :" + valString.length);
                elem.querySelector("h1").innerHTML = valString;
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
            if (elem != undefined) {
                elem.querySelector("#iframeHolder").innerHTML = "";
                elem.querySelector("h1").textContent = "";
                elem.style.visibility = "hidden";
            }
        }
        itemLoadNum = newEnd;
    }


    /*var btnParent = window.document.getElementById("btnNavProdView").getElementsByTagName('button');
    var len = btnParent.length;
    for (var k = 0; k < len; k++) {
        if (k == pgNum) {
            btnParent[k].style.background = 'linear-gradient(#7f7c72, #69665b,#545143, #69665b, #7f7c72)';
        } else {
            btnParent[k].style.background = 'linear-gradient(#212121, #252525,#292929, #252525, #212121)';
        }
    }*/
    document.title = document.title.replaceAll('loading, ', '');
    setTimeout(checkOutLater(null, null), 10000);
}