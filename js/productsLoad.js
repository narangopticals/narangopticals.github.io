async function Func() {
    var prodParent = fetch("../prodview.html").then((res) => {
        var val = res.text();
        return val;
    });

    var data = fetch("../json/config.json").then((res) => {
        return res.json();
    }); //.then(d => {return JSON.stringify(d)});
    //console.log(data);
    var str = Object.values((await data).valueOf("data"))[0];
    //console.log(str.length);
    var dataLength = str.length;
    var prodParents = "";
    for (var i = 0; i < dataLength; i++) {
        console.log(prodParent);
        var vW = (await prodParent).replaceAll('grid', 'grid' + i);
        console.log(vW);
        prodParents = prodParents+"\n"+vW;
        console.log(prodParents);
    }
    var pS = prodParents.toString();
    console.log(pS);
    document.getElementById("mainProdView").innerHTML = pS;
    var elemsParents = document.querySelectorAll("div[class^=grid]");
    for (var i = 0; i < dataLength; i++) {
        var valueData = str[i];
        //console.log(valueData.imgfile);
        var elem = elemsParents[i];
        //console.log(elem.querySelector('img').src=valueData.imgfile);
        elem.querySelector("img").src = valueData.imgfile;
        elem.querySelector("h1").textContent = valueData.title;
    }
}
Func();
