import { grabData } from "../js/fetDt.js"

var str = "";
//var section = 1;
var prodParent = ""
var prodParents = "";
var cartCost = 0;
var type = "";
var viewOrientation = '';
var imgWidth = '100%';
var loadType = 0;
var selectedItems = [];
var cartItem = [];
var dataLength = 0;
var itemLoadNum = 0;
var removeItem = true;
var cartCost_bkp = 0;
var selectedItems_bkp = [];
var cartItem_bkp = [];
var dataLength_bkp = 0;
/*Main Access To Script */
export async function Func(p) {
    loadType = p;
    if (viewOrientation == undefined) {
        viewOrientation = window.screen.orientation.type;
    } if (viewOrientation.length <= 0) {
        viewOrientation = window.screen.orientation.type;
    }

    /*Orientation Check */
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

    /*Orientation Check */


    /*Func : initMain : Load all databases Files */
    async function initMain() {
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
            window.alert("Internet Connectivity Error OR hourly usage limit exceeded protected for security.");
            /*framesData = fetch('../json/prodFmData.json').then(results => {
                return results.json();
            });*/
        }
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
            window.alert("Internet Connectivity Error OR hourly usage limit exceeded protected for security.");
            /*sunglassData = fetch('../json/prodSgData.json').then(results => {
                return results.json();
            });*/
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
            window.alert("Internet Connectivity Error OR hourly usage limit exceeded protected for security.");
            /*lensData = fetch('../json/prodLnsData.json').then(results => {
                return results.json();
            });*/
        }
        var rdyData = "";
        try {
            var results = fetch('https://api.github.com/gists/2999fc336989306ae76d3e11611c44fe').then(results => {
                return results.json();
            });
            rdyData = await results.then(data => {
                return data.files["prodRdyData.json"].content;
            });
            setTimeout(rdyData = JSON.parse(rdyData), 3000);
            //framesData = (framesData.valueOf("data"))[0];
        } catch (error) {
            window.alert("Internet Connectivity Error OR hourly usage limit exceeded protected for security.");
            /*rdyData = fetch('../json/prodLnsData.json').then(results => {
                return results.json();
            });*/
        }
        var watchData = "";
        try {
            var results = fetch('https://api.github.com/gists/a54c544dee909008b0cb98db283c9f64').then(results => {
                return results.json();
            });
            watchData = await results.then(data => {
                return data.files["prodWatchData.json"].content;
            });
            setTimeout(watchData = JSON.parse(watchData), 3000);
            //framesData = (framesData.valueOf("data"))[0];
        } catch (error) {
            window.alert("Internet Connectivity Error OR hourly usage limit exceeded protected for security.");
            /*watchData = fetch('../json/prodLnsData.json').then(results => {
                return results.json();
            });*/
        }
        //console.log("framesData");
        //console.log(framesData['data']);
        //console.log("sunglassData");
        //console.log(sunglassData['data']);
        //console.log("lensData");
        //console.log(lensData['data']);
        var dbArray = Array.prototype.concat(framesData['data'], sunglassData['data'], lensData['data'], rdyData['data'], watchData['data']);
        //console.log("dbArray");
        //console.log(dbArray);
        //console.log(mergedJSON.valueOf("data"));
        str = dbArray;
        //console.log(str);
        //console.log(str.length);
        //var dataLength = str.length;
    }

    /*Func : initMain : Load all databases Files */


    /*Func : initTest : Test Function for loading database */
    /*async function initTest() {
        str = await grabData(null);
    }
    */
    /*Func : initTest : Test Function for loading database */
    if (loadType == 0) {
        await initMain();
    }


    /* #Call Function : checkOutLater : Cart Item Load,Handle[Add, Remove] */
    checkOutLater(null, null, (await str));
    /* #Call Function : checkOutLater : Cart Item Load,Handle[Add, Remove] */
}

async function addItemViews(startNum, endNum) {
    var scrollView = window.document.querySelector('#scrollView');
    if (startNum + 9 >= selectedItems.length) {
        scrollView.style.display = 'none';
    } else {
        scrollView.style.display = '';
    }
    var prodParents = "";
    var prodHolder = window.document.getElementById('prodMain');
    prodHolder.innerHTML += '<div class="mainProdView" id="mainProdView' + startNum + '" style="  height: 100%;\
  width: 100vw;\
  margin: 0;"></div>';
    for (var i = startNum; i < (startNum + 9); i++) {
        /* Useless Detail
        *console.log(prodParent);*/
        var vW = (await prodParent).replaceAll('grid', 'grid' + i);
        /* Useless Detail
        *console.log(vW);*/
        prodParents = prodParents + "\n" + vW;
        /* Useless Detail
        *console.log(prodParents);*/
    }
    var pS = prodParents.toString();
    var prodView = document.getElementById("mainProdView" + startNum);
    prodView.innerHTML = pS;
    var prodView = document.getElementById("mainProdView" + startNum);
    var cartView = document.getElementById('cartViewMini');
    var popElemText = fetch("../class/cartcost.html").then((res) => {
        return res.text();
    });
    cartView.innerHTML = await popElemText;
    var prodViews = prodView.querySelectorAll('#prodParent');
    var enquiryWaBtn = cartView.querySelector('#orderEnquiry');
    var clearBtn = cartView.querySelector('#cartClear');
    //clearBtn.style.height = enquiryWaBtn.offsetHeight + "px";
    clearBtn.addEventListener("click",
        function (e) {
            var cartBtns = window.document.querySelectorAll(".cartBtn");
            /*var prodViews = window.document.querySelectorAll('#prodParent');
            for (var i = 0; i < prodViews.length; i++) {
                var tmp = prodViews[i];
                if (tmp.style.visibility != "hidden") {
                    checkOutLater(null, cartBtns[i], '');
                //console.log(e);
                    //clearBtn.removeEventListener("click", e);
                }
            }*/
            var prodViews = window.document.querySelectorAll('#prodParent');
            var cartElem = window.document.getElementById('cartElemt');
            if (cartElem != null) {
                var trElem = cartElem.querySelectorAll('tr');
                if (trElem.length > 1) {
                    removeItem = true;
                } else {
                    removeItem = false;
                }
                if (removeItem) {
                    selectedItems_bkp = selectedItems;
                    cartItem_bkp = cartItem;
                    dataLength_bkp = dataLength;
                    cartCost_bkp = cartCost;
                    for (var i = 0; i < prodViews.length; i++) {
                        var tmp = prodViews[i];
                        if (tmp.style.visibility != "hidden") {
                            checkOutLater(cartBtns[i], null, '');
                        }
                    }
                    selectedItems = [];
                    cartItem = [];
                    dataLength = 0;
                    cartCost = 0;
                } else {
                    selectedItems = selectedItems_bkp;
                    cartItem = cartItem_bkp;
                    dataLength = dataLength_bkp;
                    cartCost = cartCost_bkp;
                    for (var i = 0; i < prodViews.length; i++) {
                        var tmp = prodViews[i];
                        if (tmp.style.visibility != "hidden") {
                            checkOutLater(cartBtns[i], null, '');
                        }
                    }
                    itemLoadNum = 0;
                }
                if (dataLength > 0) {
                    clearBtn.textContent = "Clear";
                } else {
                    clearBtn.textContent = "Undo";
                }
                var prodMain_elem = window.document.getElementById('prodMain');
                if (prodMain_elem != undefined) {
                    prodMain_elem.innerHTML = '';
                }
                checkOutLater(null, null, null);
                updateCartItem();
            }

        });;
    enquiryWaBtn.addEventListener("click",
        function (e) {
            //var whatsappBtns = prodView.querySelectorAll(".whatsappBtn");
            var text = "";
            var prodViews = prodView.querySelectorAll('#prodParent');
            var cartBtns = window.document.querySelectorAll('.cartBtn');
            if (cartBtns.length == cartItem.length) {
                for (var i = 0; i < prodViews.length; i++) {
                    var tmp = prodViews[i];
                    //console.log("line 148");
                    //console.log(tmp);
                    if (tmp.style.visibility != "hidden") {
                        //console.log("line 152 : not hidden");
                        var cartBtn = tmp.querySelector('.cartBtn');
                        var shareBtn = tmp.querySelector('.shareBtn');
                        if (cartBtn.dataCart == 'true') {
                            //console.log("line 156 : cartBtn.textContent = " + cartBtn.textContent);
                            var tmptxt = encodeURIComponent("\n\nName : ") +
                                encodeURIComponent(cartItem[i].title.replaceAll('/e', '')) +
                                encodeURIComponent("&  Item ID :") +
                                encodeURIComponent(cartItem[i].itemnum) +
                                encodeURIComponent("\t& Rs") + cartItem[i].cost +
                                encodeURIComponent("\nProduct Link : \n") +
                                encodeURIComponent("https://narangopticals.com/product" + shareBtn.value);
                            //console.log("line 159 test:");
                            //console.log(tmptxt);
                            text += tmptxt;
                        }
                    }
                }
            } else {
                for (var i = 0; i < cartItem.length; i++) {
                    var tmptxt = encodeURIComponent("\n\nName : ") +
                        encodeURIComponent(cartItem[i].title.replaceAll('/e', '')) +
                        encodeURIComponent("&  Item ID :") +
                        encodeURIComponent(cartItem[i].itemnum) +
                        encodeURIComponent("\t& Rs") + cartItem[i].cost +
                        encodeURIComponent("\nProduct Link : \n") +
                        encodeURIComponent("https://narangopticals.com/product?type=" + cartItem[i].type + "&itemnum=" + cartItem[i].itemnum);
                    //console.log("line 159 test:");
                    //console.log(tmptxt);
                    text += tmptxt;
                }
            }

            var val = [encodeURIComponent("I want to know More About Your Products") + text +
                "&type=phone_number&app_absent=0&send=1" + encodeURIComponent("\n\nTotal : Rs.") + cartCost];
            //console.log("line 169 :" + val);
            msgWhatsapp(val);
        });

    for (var i = 0; i < prodViews.length; i++) {
        var elem = prodViews[i];
        /*productsload.js = copy*/
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
        //checkOutLater(cartBtn, null, '');
        cartBtn.addEventListener("click",
            function (e) {
                checkOutLater(null, e.target, '');
            });

        /*productsload.js = copy*/
        var prevBtn = elem.querySelector("button[id^=grid" + (i + startNum) + "Prev]");
        //console.log(prevBtn);
        prevBtn.value = "grid" + (i + startNum);
        prevBtn.addEventListener("click",
            function (e) {
                imgSwitch('prev', e.currentTarget.value, '');
            });
        var nextBtn = elem.querySelector("button[id^=grid" + (i + startNum) + "Next]");
        nextBtn.value = "grid" + (i + startNum);
        //console.log(nextBtn);
        nextBtn.addEventListener("click",
            function (e) {
                imgSwitch('next', e.currentTarget.value, '');
            });
        var imgParent = elem.querySelector('.grid' + (i + startNum) + 'Img');
        swipeFeature(imgParent);
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
    //var elem = window.document.getElementById('mainProdView').querySelector('div[class^=' + grid);
    var elem = window.document.querySelector('div[class^=' + grid);
    var iframeHolder = elem.querySelector('#iframeHolder');
    //console.log("line 158 : imgSwitch : iframeHolder = ");
    //console.log(iframeHolder);
    /*var frames = iframeHolder.querySelectorAll('img');
    var lenIframes = frames.length;*/
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
                    elem.querySelector('#imgCount').textContent = (i + 1) + '/' + lenIframes;
                }
            }
        }
    } else {
        elem.querySelector('#imgCount').textContent = 0 + '/' + 0;
    }
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
        if (removeItem) {
            removeProduct(btnLoad.value, btnLoad);
        } else {
            addProduct(btnLoad.value, btnLoad);
        }
    } else if (btnLoad == null && pressedBtn == null && jsonData == null) {
        setCookie("incartItems", selectedItems, 10);
        updateProductCount();
        updateCartItem();
        if (itemLoadNum == 0) {
            addItems();
        }
    }

    function getLoadingObjects(data, selection) {
        var arrSelect = [];
        var newSelection = [];
        for (var j = 0; j < selection.length; j++) {
            //console.log(data);
            var currentItemVal = selection[j];
            //console.log(currentItemVal);
            for (var i = 0; i < data.length; i++) {
                var value = data[i];
                if (value != undefined) {
                    if (value.itemnum.trim() == currentItemVal.trim()) {
                        //console.log(value);
                        arrSelect.push(value);
                        newSelection.push(currentItemVal.trim());
                    }
                }
            }
        }
        if (arrSelect.length != selection.length) {
            selectedItems = newSelection;
            setCookie("incartItems", selectedItems, 10);
        }
        //console.log(arrSelect);
        cartItem = arrSelect;
        cartItem_bkp = cartItem;
    }
    function modifyCartCount() {
        var cartView = document.getElementById('cartExpand');
        var cartCounter = cartView.querySelector('#cartCounter');
        //console.log(cartCounter);
        if (selectedItems != undefined) {
            cartCounter.textContent = selectedItems.length + " (Rs." + cartCost + ")";
        } else {
            cartCounter.textContent = dataLength + " (Rs." + cartCost + ")";
        }
    }
    function addProduct(id, btn) {
        if (selectedItems != undefined) {
            if (selectedItems.indexOf(id) < 0) {
                selectedItems.push(id);
                setCookie("incartItems", selectedItems, 10);
                for (var i = 0; i < cartItem.length; i++) {
                    if (cartItem[i].itemnum == id) {
                        cartCost += Number.parseInt(cartItem[i].cost);
                    }
                }
                //btn.textContent = "-";
            }
        }
        btn.style.background = 'linear-gradient(to bottom, maroon, rgb(172, 23, 23), maroon)';
        btn.dataCart = 'true';
        //console.log(selectedItems);
        modifyCartCount();

    }
    function removeProduct(id, btn) {
        //var itemElems = document.getElementById('mainProdView').querySelectorAll('#prodParent');
        cartCost = 0;
        if (selectedItems != undefined) {
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
        }
        //btn.textContent = "+";
        btn.style.background = 'linear-gradient(to bottom, rgb(55, 55, 55),rgb(22, 22, 22),rgb(0, 0, 0),rgb(22, 22, 22),rgb(55, 55, 55))';
        btn.dataCart = 'false';
        selectedItems = newSelection;
        setCookie("incartItems", selectedItems, 10);
        modifyCartCount();
    }

    function updateProductCount() {
        var totalSelected = selectedItems.length;
        /*var prodView = window.document.getElementById('mainProdView');
        var cartBtns = prodView.querySelectorAll('button[class^=cartBtn]');*/
        var cartBtns = window.document.querySelectorAll('button[class^=cartBtn]');
        //console.log("updateProductCount:" + totalSelected);
        var idBtnsLen = cartBtns.length;
        //console.log("updateProductCount: idBtnsLen =" + idBtnsLen);

        for (var j = 0; j < idBtnsLen; j++) {
            var currentBtn = cartBtns[j];
            if (currentBtn.parentNode.parentNode.style.visibility != "hidden") {
                //currentBtn.textContent = "+";
                currentBtn.style.background = 'linear-gradient(to bottom, rgb(55, 55, 55),rgb(22, 22, 22),rgb(0, 0, 0),rgb(22, 22, 22),rgb(55, 55, 55))';
                currentBtn.dataCart = 'false';
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
                        //currentBtn.textContent = "-";
                        currentBtn.style.background = 'linear-gradient(to bottom, maroon, rgb(172, 23, 23), maroon)';
                        currentBtn.dataCart = 'true';
                    }
                }
            }
        }
        modifyCartCount();
    }

    function updateCart(btn) {
        if (!(btn.nodeName.toLowerCase() === 'font')) {

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
    }


    async function loadCart(jsonData) {
        var cartString = await getCookie("incartItems");
        //console.log(cartString);
        if (cartString.length > 0) {
            selectedItems = cartString.split(",")
        }
        verifyItem(selectedItems);
        //console.log(selectedItems);
        dataLength = selectedItems.length;
        getLoadingObjects(jsonData, selectedItems);
        if (loadType == 1) {
            addItems();
        } else {
            if (dataLength > 8) {
                //await addPagesNavBtn(dataLength);
                await addLoadMoreView();
                await addItemViews(0, 9);
                await loadItems(0, 9, 0);
            } else {
                //await addPagesNavBtn(dataLength);
                await addItemViews(0, 9);
                await loadItems(0, dataLength, 0);
            }
        }
        updateProductCount();
    }
    function verifyItem(selectedItems) {
        for (var i = 0; i < selectedItems.length; i++) {
            if (selectedItems[i].length <= 0) {
                selectedItems.removeItem(i);
            }
        }
        selectedItems_bkp = selectedItems;
    }
    async function addItems() {
        await addItemViews(itemLoadNum, itemLoadNum + 9);
        await loadItems(itemLoadNum, dataLength, 0);
        updateProductCount();
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
                        setTimeout(function () {
                            Func(1);
                        }, 3000);
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
                setTimeout(function () {
                    Func(1);
                }, 3000);
            });
        }

    }
    async function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        if (cvalue != undefined) {
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite = Strict";
        } else {
            document.cookie = cname + "=" + "" + ";" + expires + ";path=/;SameSite = Strict";
        }
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

/* #Function : 
* updateCartItem : load,add/remove item to cart detailed view, calculat total cost
*/
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
                var string = "<tr><td>\u25CF" + (i + 1) + ".</td><td>" + cartItem[i].title.replaceAll('/e', '') + "</td><td>= Rs." + tmp + "</td></tr>";
                costBreakDown.push(string);
            }
        }
    }
    cartCost = cost;
    var totalCost = "<tr><td>" + "</td><td>Total Cost</td><td>= Rs." + cost.toString() + "</td></tr>";
    matterView.innerHTML = costBreakDown.join("") + totalCost;
}
/* #Function : loadItems : load item from databases string into views
*  @param startNum: starting index to load item from.
*  @param endNum: unused
*  @param pgNum: #deprecated
*/
export async function loadItems(startNum, endNum, pgNum) {

    var elemsParents = window.document.querySelectorAll('div[id^=prodParent]');
    //console.log(elemsParents);
    var i = startNum;
    var newEnd = startNum + 9;
    for (var j = startNum; j < newEnd; j++) {
        var elem = elemsParents[j];
        if (i < selectedItems.length) {
            elem.style.visibility = "visible";
            if (i < cartItem.length) {
                var valueData = cartItem[i];
                var imgs = valueData.imgfile;
                var ilen = imgs.length;
                var iframeHolder = elem.querySelector("#iframeHolder");
                iframeHolder.innerHTML = '';
                if (ilen > 0) {
                    iframeHolder.value = 0;
                    for (var k = 0; k < ilen; k++) {
                        if (imgs[k].length > 0) {
                            //v1.1.4b until
                            //var link = "https://drive.google.com/file/d/" + imgs[k] + "/preview";
                            //v1.1.4c [update]
                            var link = "https://drive.google.com/thumbnail?id=" + imgs[k] + "&sz=w450-h450";
                            iframeHolder.innerHTML += "<img style=\"width: " + imgWidth + ";\" id=\"iframe" + j + "img" + k + "\" src=\"" + link + "\"></img>";
                        }
                    }
                }

                /* #CallFunction :
                 * imgSwitch : passing values to switch image of a grid */
                imgSwitch('', 'grid' + j, 0);
                /* #CallFunction :
                 *  imgSwitch : passing values to switch image of a grid */


                var valString = Number.parseInt(await valueData.cost) > 0 ?
                    ("<span>Rs." + valueData.cost + "<br>" + valueData.title.replaceAll('/e', '') + "</span>") :
                    ("<span>" + valueData.title.replaceAll('/e', '') + "</span>");
                //elem.querySelector("h1").innerHTML = valString;
                if (valString != null) {
                    //console.log("valString :" + valString + "\nlength :" + valString.length);
                    elem.querySelector("h1").innerHTML = valString;
                }
                var val = [encodeURIComponent("I want to know More About Your Products") +
                    encodeURIComponent("\nName : ") +
                    encodeURIComponent(valueData.title.replaceAll('/e', '')) +
                    encodeURIComponent(",  Item ID :") +
                    encodeURIComponent(valueData.itemnum) +
                    "&type=phone_number&app_absent=0&send=1"];
                var whatsappBtn = elem.querySelector("button[class^=whatsappBtn]");
                whatsappBtn.values = val;
                var cartBtn = elem.querySelector("button[class^=cartBtn]");
                cartBtn.value = valueData.itemnum;
                cartBtn.activeVal = 'true';
                //checkOutLater(cartBtn, null);

                var shareBtn = elem.querySelector("button[class^=shareBtn]");
                var urlValue = "?type=" + cartItem[i].type + "&itemnum=" + cartItem[i].itemnum;
                shareBtn.value = urlValue;

                i++;
            }
        } else {
            if (elem != undefined) {
                elem.querySelector("#iframeHolder").innerHTML = "";
                elem.querySelector("h1").textContent = "";
                elem.style.visibility = "hidden";
            }
        }
        itemLoadNum = newEnd;
        /*var btnParent = window.document.getElementById("btnNavProdView").getElementsByTagName('button');
        var len = btnParent.length;
        for (var k = 0; k < len; k++) {
            if (k == pgNum) {
                btnParent[k].style.background = 'linear-gradient(to bottom,rgb(48, 48, 48), rgb(132, 132, 132), rgb(105, 105, 105), rgb(63, 63, 63))';
            } else {
                btnParent[k].style.background = 'linear-gradient(to bottom,rgb(135, 134, 134), rgb(152, 144, 144), rgb(105, 105, 105), rgb(152, 144, 144), rgb(135, 134, 134)) ';
            }
        }*/
    }
    /** #CallFunction : updateCartItem :*/
    updateCartItem();
    /** #CallFunction : updateCartItem :*/
    //setTimeout(checkOutLater(null, null), 10000);
}
/* #Function : loadItems : load item from databases string into views*/

/*#Function : path=/;SameSite = Strict";: Show Or Hide Cart Detailed View */
export async function cartToggle(e) {
    var popElemt = document.getElementById('cartViewMini').querySelector('#cartElemt');
    if (popElemt.style.display == "none") {
        popElemt.style.display = "";
        var enquiryWaBtn = document.querySelector('#orderEnquiry');
        var clearBtn = document.querySelector('#cartClear');
        clearBtn.style.height = enquiryWaBtn.offsetHeight + "px";
        //popElemt.querySelector('#cartCloser').style.top = "-45px";
    } else {
        popElemt.style.display = "none";
    }

}
/*#Function : cartToggle: Show Or Hide Cart Detailed View */

/*#DeprecatedFunction : addPagesNavBtn : to add pages button according to content*/
/*async function addPagesNavBtn(dataLength) {
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
}*/

/*DeprecatedFunction : addPagesNavBtn : to add pages button according to content*/