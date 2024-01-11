export async function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    if (cvalue != undefined) {
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite = Strict";
    } else {
        document.cookie = cname + "=" + "" + ";" + expires + ";path=/;SameSite = Strict";
    }
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

export async function setElementCookie(element) {
    console.log("setElementCookie:");
    console.log(element);
    if (element != null) {
        if (element != undefined) {
            var name = element.id;
            var text = '';
            if (element.nodeName == "SPAN" || element.nodeName == "DIV") {
                if (text.length == 0) {
                    var tmp = element.innerHTML;
                    if (tmp != undefined) {
                        text = tmp;
                    }
                }
            }
            if (element.nodeName == "LABEL") {
                var elems = element.querySelectorAll('input');
                for (var i = 0; i < elems.length; i++) {
                    await setElementCookie(elems[i]);
                }
            } else {
                if (text.length == 0) {
                    var tmp = element.value;
                    if (tmp != undefined) {
                        text = tmp;
                    }
                }
                if (text.length == 0) {
                    var tmp = element.textContent;
                    if (tmp != undefined) {
                        text = tmp;
                    }
                }
                if (text.length > 0 && name.length > 0) {

                    console.log("setElementCookie:");
                    console.log(text);
                    await setCookie(name, text, 1);
                }
            }
        }
    }
}
export async function getElementCookie(element) {
    if (element != null) {
        if (element != undefined) {
            var name = element.id;
            var val = await getCookie(name);
            if (val.length > 0) {
                if (element.nodeName == "INPUT") {
                    element.value = val;
                } else if (element.nodeName == "SELECT") {
                    var options = element.querySelectorAll('option');
                    for (var i = 0; i < options.length; i++) {
                        if (options[i].value.trim() == val.trim()) {
                            options[i].click();
                        }
                    }
                } else if (element.nodeName == "SPAN" || element.nodeName == "DIV") {
                    element.innerHTML = val;
                } else if (element.nodeName == "LABEL") {
                    var elems = element.querySelectorAll('input');
                    for (var i = 0; i < elems.length; i++) {
                        getElementCookie(elems[i]);
                    }
                }
            }
        }
    }
}