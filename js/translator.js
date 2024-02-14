export async function loadTranslator(boolVal) {
    if (boolVal) {
        await fetch("../class/translate.html")
            .then((res) => {
                var val = res.text();
                //console.log(val);
                return val;
            }).then((data) => {
                windows.document.body.innerHTML += data;
            });
    }
}