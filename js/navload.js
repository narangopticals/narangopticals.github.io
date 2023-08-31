async function Func() {
    fetch("../navbar.html")
        .then((res) => { var val = res.text();
            //console.log(val);
            return val;
    })
    .then((data) => document.getElementById('main').innerHTML = data);
}
Func();
document.getElementById('main')