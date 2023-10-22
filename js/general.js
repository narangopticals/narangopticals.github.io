export async function browserDetect() {
    var usrAgnt = navigator.userAgent;
    if (!(usrAgnt.indexOf('Firefox') > 20 || usrAgnt.indexOf('Chrome') > 20) && (usrAgnt.indexOf('Safari') > 20)) {
        window.alert("Use Firefox or Chrome for Best Experience. Untested Browser, some features may not work as intended.");
    }
    //window.alert(usrAgnt);
}