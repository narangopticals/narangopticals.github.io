export async function browserDetect() {
    var usrAgnt = navigator.userAgent;
    if (!(usrAgnt.indexOf('Firefox') > 20) || usrAgnt.indexOf('Safari') > 20) {
        window.alert("Use Firefox or Chrome for Best Experience. Untested Browser, some features may not work as intended.");
    }
    //window.alert(usrAgnt);
}

export async function loadJS(jsname) {
    fetchGistArr()
}

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