function Func() {
    var jsonData;
    fetch("../json/config.json")
        .then((res) => {
        return res.json();
    })
    .then((data) => jsonData = data);
}
Func();
document.getElementById("main").innerHTML = text;