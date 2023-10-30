var lowCost = null;
var highCost = null;
var keys = null;
//export var filterVisible = false;
export async function setValueHigh() {
    var maxLabel = window.document.getElementById('maxRange');
    //var minLabel = window.document.getElementById('minRange');
    var input_maxCost = window.document.getElementById('costHigh');
    highCost = input_maxCost.value;
    maxLabel.innerHTML = "Cost Maximum: " + highCost;
    var highCost_int = Number.parseInt(highCost);
    if (highCost_int <= 400) {
        window.document.getElementById('costLow').value = highCost_int - 100;
        setValueLow();

    }
}
export async function setValueLow() {
    var maxLabel = window.document.getElementById('minRange');
    //var minLabel = window.document.getElementById('minRange');
    var input_minCost = window.document.getElementById('costLow');
    lowCost = input_minCost.value;
    maxLabel.innerHTML = "Cost Minimum: " + lowCost;
}
export async function closeFilterView() {
    highCost = null;
    lowCost = null;
    restoreProduts();
    //filterVisible = false;
}
export async function clearFilterView() {
    highCost = null;
    lowCost = null;
    keys = null;
    var filterView = window.document.getElementById('filterView');
    filterView.style.display = 'none';
    setHigh(highCost);
    setLow(lowCost);
    setKeys(keys);
    restoreProduts();
    Func(currentSection);
}
export async function submitFilter() {
    keys = new filterKeys();
    for (var key in keys) {
        //console.log(key);
        keys[key] = document.getElementById(key).value;
    }
    /*keys.pattern = document.getElementById("pattern").value;
    keys.front = document.getElementById("front").value;
    keys.side = document.getElementById("side").value;
    keys.opacity = document.getElementById("opacity").value;
    keys.resistance = document.getElementById("resistance").value;
    keys.joint = document.getElementById("joint").value;
    keys.surfacing = document.getElementById("surfacing").value;*/
    setHigh(highCost);
    setLow(lowCost);
    //console.log("keys =");
    //console.log(keys);
    setKeys(keys);
    highCost = null;
    lowCost = null;
    keys = null;
    restoreProduts();
    Func(currentSection);
}
export async function restoreProduts() {
    var filterView = window.document.getElementById('filterView');
    filterView.style.display = 'none';
    window.document.getElementById('mainProdView').style.display = "";
}
export async function setSolid() {
    //document.getElementById("opacity").value = "solid";
    var childs = document.getElementById("opacity").querySelectorAll('option');
    //console.log(childs);
    for (var i = 0; i < childs.length; i++) {
        var elem = childs[i];
        //console.log(elem);
        if (elem.value == 'solid') {
            //console.log("elem.value == 'solid'");
            elem.disabled = false;
        } else {
            elem.disabled = true;
        }
    }
    setpattern();
    setjoint();
    setsurfacing();
    //console.log(document.getElementById("pattern"));


    function setsurfacing() {
        //document.getElementById("surfacing").value = "shine";
        var childs = document.getElementById("surfacing").querySelectorAll('option');
        for (var i = 0; i < childs.length; i++) {
            var elem = childs[i];
            if (elem.value == 'matt') {
                elem.disabled = true;
                //console.log("elem.value == 'solid'");
            } else {
                elem.disabled = false;
            }
        }

        //console.log(document.getElementById("surfacing"));
    }
    function setpattern() {
        //document.getElementById("opacity").value = "solid";
        var childs = document.getElementById("pattern").querySelectorAll('option');
        //console.log(childs);
        for (var i = 0; i < childs.length; i++) {
            var elem = childs[i];
            //console.log(elem);
            if (elem.value == 'halfshade') {
                elem.disabled = true;
                //console.log("elem.value == 'solid'");
            } else {
                elem.disabled = false;
            }
        }

        //console.log(document.getElementById("opacity"));
    }
    function setjoint() {
        //document.getElementById("joint").value = "solid";
        var childs = document.getElementById("joint").querySelectorAll('option');
        //console.log(childs);
        for (var i = 0; i < childs.length; i++) {
            var elem = childs[i];
            //console.log(elem);
            if (elem.value == 'plastic') {
                elem.disabled = true;
                //console.log("elem.value == 'solid'");
            } else {
                elem.disabled = false;
            }
        }

        //console.log(document.getElementById("joint"));
    }
}
export async function unsetSolid() {
    document.getElementById("opacity").value = "";
    var childs = document.getElementById("opacity").querySelectorAll('option');
    //console.log(childs);
    for (var i = 0; i < childs.length; i++) {
        var elem = childs[i].disabled = false;
    }
    //console.log(document.getElementById("opacity"));
    unsetpattern();
    unsetjoint();
    unsetsurfacing();




    function unsetsurfacing() {
        document.getElementById("surfacing").value = "";
        var childs = document.getElementById("surfacing").querySelectorAll('option');
        for (var i = 0; i < childs.length; i++) {
            var elem = childs[i];
            elem.disabled = false;
        }

        //console.log(document.getElementById("surfacing"));
    }
    function unsetpattern() {
        document.getElementById("pattern").value = "";
        var childs = document.getElementById("pattern").querySelectorAll('option');
        //console.log(childs);
        for (var i = 0; i < childs.length; i++) {
            var elem = childs[i];
            //console.log(elem);
            elem.disabled = false;
        }

        //console.log(document.getElementById("pattern"));
    }
    function unsetjoint() {
        document.getElementById("joint").value = "";
        var childs = document.getElementById("joint").querySelectorAll('option');
        //console.log(childs);
        for (var i = 0; i < childs.length; i++) {
            var elem = childs[i];
            //console.log(elem);
            elem.disabled = false;

        }

        //console.log(document.getElementById("joint"));
    }
}
export async function unsetAll() {
    var childs = document.querySelectorAll('option');
    //console.log(childs);
    for (var i = 0; i < childs.length; i++) {
        var elem = childs[i];
        //console.log(elem);
        elem.disabled = false;
        elem.parentNode.value = "";
    }
}