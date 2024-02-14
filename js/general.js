//import * as filkeys from "../ts/objng.ts"
export async function browserDetect() {
    var usrAgnt = navigator.userAgent;
    var detectCookie = getCookie('browserDetect');
    if ((await detectCookie).length < 1) {
        if (!(usrAgnt.indexOf('Firefox') > 20) || usrAgnt.indexOf('Safari') > 20) {
            window.alert("Use Firefox or Chrome for Best Experience. Untested Browser, some features may not work as intended.");
            setCookie('browserDetect', 'false', 10);
        }
    } else {
        //console.log("Use Firefox or Chrome for Best Experience. Untested Browser, some features may not work as intended.");
    }
    //window.alert(usrAgnt);
}

export async function loadJS(jsname) {
    fetchGistArr()
}

/*export var filterKeys = {
    pattern : "",
    front : "",
    side : "",
    opacity : "",
    resistance : "",
    joint : "",
    surfacing : "",
};*/
export class filterKeys {
    constructor() {
        this.pattern = "";
        this.front = "";
        this.side = "";
        this.opacity = "";
        this.resistance = "";
        this.joint = "";
        this.surfacing = "";
    }
    length() {
        var len = 0;
        for (var key in this) {
            if (this[key].length > 0) {
                len++;
            }
        }
        return len;
    }
    valuedKeys() {
        //var len = 0;
        var obj = new Object();
        for (var key in this) {
            if (this[key].length > 0) {
                obj[key] = this[key];
            }
        }
        return obj;
    }
};

export async function fetchGistArr(link, file) {
    var str;
    try {
        var results = fetch('https://api.github.com/gists/' + link).then(results => {
            return results.json();
        });
        data = await results.then(data => {
            return data.files[file].content;
        });
        setTimeout(data = JSON.parse(data), 3000);
    } catch (error) {
        window.alert(error);
    }
    if ((await data) != null) {
        str = Object.values((data).valueOf("data"))[0];
    }
    return str;
}

export async function getFiltered(itemArr, costlow, costHigh, keywords) {
    /*var keys = new filterKeys();
    keys.front = "plastic";
    //console.log('line 57 : filterKeys = ');
    //console.log(keys);
    //console.log(keys.valuedKeys());
    var valuedKeys = keys.valuedKeys();*/
    //console.log('itemArr = ');
    //console.log(itemArr);
    //console.log('costlow = ');
    //console.log(costlow);
    //console.log('costHigh = ');
    //console.log(costHigh);
    var costlow_loc = costlow;
    var costHigh_loc = costHigh;
    var keywords_loc = keywords;
    var filteredItems = [];
    var finalItems = [];
    var hasFilter = (costlow_loc != null || costHigh_loc != null || keywords_loc != null);
    //console.log("Line 45 : hasFilter = " + hasFilter);
    if (itemArr != null && hasFilter) {
        if (costHigh_loc != null || costlow_loc != null) {

            if (costHigh_loc == null) {
                //console.log("Line 50 : (costHigh_loc == null)");
                costHigh_loc = 10000;
            } else {
                costHigh_loc = Number.parseInt(costHigh_loc);
            }
            if (costlow_loc == null) {
                //console.log("Line 56 : (costlow_loc == null)");
                costlow_loc = 0;
            } else {
                costlow_loc = Number.parseInt(costlow_loc);
            }
            for (var i = 0; i < itemArr.length; i++) {
                var item = itemArr[i];
                var itemcost = item.cost.trim();
                if (itemcost.length > 0 || itemcost != null) {
                    if (item.cost.trim().indexOf('/e') < 0) {
                        //console.log('item cost = ' + itemcost + "\n costHigh_loc:" + costHigh_loc + "\n costlow_loc:" + costlow_loc)
                        itemcost = Number.parseInt(itemcost);
                        if (itemcost <= Number.parseInt(costHigh_loc) && itemcost >= Number.parseInt(costlow_loc)) {
                            filteredItems.push(item);
                            //console.log(" line 63 : filteredItems.push(item) :");
                            //console.log(item);
                        }
                    }
                }
            }
        }

        if (filteredItems.length < 1) {
            //console.log("line 75: filteredItems.length < 1");
            filteredItems = itemArr;
        }

        //console.log('filteredItems = ');
        //console.log(filteredItems);
        if (keywords_loc != null) {
            //console.log("line 133: keywords != null");
            var keywords_locLength = keywords_loc.length();
            var valuedKeys = keywords_loc.valuedKeys();
            if (keywords_locLength > 0) {
                //console.log("line 136: valuedKeysLength = " + keywords_locLength);
                var minMatch = keywords_locLength > 3 ? Math.round(keywords_locLength / 2) : keywords_locLength;
                //console.log("line 138: minMatch = " + minMatch);
                for (let j = 0; j < filteredItems.length; j++) {
                    var item = filteredItems[j];
                    var matches = 0;
                    for (var key in valuedKeys) {
                        //console.log("line 143 : item.keywords[key] = " + item.keywords[key]);
                        if (keywords_loc[key] == item.keywords[key]) {
                            matches++;
                        }
                    }
                    //console.log("line 147: matches = " + matches);
                    /*for (var k = 0; k < kewords_loc.length; k++) {

                        if (item.keywords.indexOf(kewords_loc[k]) >= 0) {
                            matches++;
                        }
                    }*/
                    if (matches >= minMatch) {
                        //console.log('matches = ');
                        //console.log(matches);
                        //console.log('kewords = ');
                        //console.log(keywords);
                        finalItems.push(item);
                    }
                }
                //console.log(finalItems);
                return finalItems;
            } else {
                finalItems = filteredItems;
            }
            //console.log(finalItems);
            return finalItems;
        } else {
            //console.log(filteredItems);
            return filteredItems;
        }
    } else {
        //console.log(itemArr);
        return itemArr;
    }
}

export async function setCookie(cname, cvalue, exdays, extras) {
    if (extras == null) {
        extras = '';
    }
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    var string = cname + "=" + cvalue + ";" + expires + "; SameSite=Strict;path=/" + extras;
    //console.log(string);
    document.cookie = string;
    var cookie = await getCookie(cname);
    //console.log(cookie);
    //var cookieArr = cookie.split(",");
    //console.log(cookieArr);
}
export async function getCookie(cname) {
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