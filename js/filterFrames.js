var lowCost = null;
var highCost = null;
var keys = null;
export async function setValueHigh() {
    var maxLabel = window.document.getElementById('maxRange');
    //var minLabel = window.document.getElementById('minRange');
    var input_maxCost = window.document.getElementById('costHigh');
    highCost = input_maxCost.value;
    maxLabel.innerHTML = "Cost Maximum: " + highCost;
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
    var filterView = window.document.getElementById('filterView');
    filterView.style.display = 'none';
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
    Func(currentSection);
}
export async function submitFilter() {
    keys = new filterKeys();
    keys.pattern = document.getElementById("pattern").value;
    keys.front = document.getElementById("front").value;
    keys.side = document.getElementById("side").value;
    keys.opacity = document.getElementById("opacity").value;
    keys.resistance = document.getElementById("resistance").value;
    keys.joint = document.getElementById("joint").value;
    keys.surfacing = document.getElementById("surfacing").value;
    /*var string =
        "pattern=" + document.getElementById("pattern").value + "," +
        "front=" + document.getElementById("front").value + "," +
        "side=" + document.getElementById("side").value + "," +
        "opacity=" + document.getElementById("opacity").value + "," +
        "resistance=" + document.getElementById("resistance").value + "," +
        "joint=" + document.getElementById("joint").value + "," +
        "surfacing=" + document.getElementById("surfacing").value;
    setCookie("keys", string, 10);*/
    setHigh(highCost);
    setLow(lowCost);
    var filterView = window.document.getElementById('filterView');
    filterView.style.display = 'none';
    console.log("keys =");
    console.log(keys);
    setKeys(keys);
    Func(currentSection);
}
export async function setSolid() {
    //document.getElementById("opacity").value = "solid";
    var childs = document.getElementById("opacity").querySelectorAll('option');
    console.log(childs);
    for (var i = 0; i < childs.length; i++) {
        var elem = childs[i];
        console.log(elem);
        if (elem.value == 'solid') {
            console.log("elem.value == 'solid'");
            elem.disabled = false;
        } else {
            elem.disabled = true;
        }
    }
    setpattern();
    setjoint();
    setsurfacing();
    console.log(document.getElementById("pattern"));


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

        console.log(document.getElementById("surfacing"));
    }
    function setpattern() {
        //document.getElementById("opacity").value = "solid";
        var childs = document.getElementById("pattern").querySelectorAll('option');
        console.log(childs);
        for (var i = 0; i < childs.length; i++) {
            var elem = childs[i];
            console.log(elem);
            if (elem.value == 'halfshade') {
                elem.disabled = true;
                //console.log("elem.value == 'solid'");
            } else {
                elem.disabled = false;
            }
        }

        console.log(document.getElementById("opacity"));
    }
    function setjoint() {
        //document.getElementById("joint").value = "solid";
        var childs = document.getElementById("joint").querySelectorAll('option');
        console.log(childs);
        for (var i = 0; i < childs.length; i++) {
            var elem = childs[i];
            console.log(elem);
            if (elem.value == 'plastic') {
                elem.disabled = true;
                //console.log("elem.value == 'solid'");
            } else {
                elem.disabled = false;
            }
        }

        console.log(document.getElementById("joint"));
    }
}
export async function unsetSolid() {
    document.getElementById("opacity").value = "";
    var childs = document.getElementById("opacity").querySelectorAll('option');
    //console.log(childs);
    for (var i = 0; i < childs.length; i++) {
        var elem = childs[i].disabled = false;
    }
    console.log(document.getElementById("opacity"));
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

        console.log(document.getElementById("surfacing"));
    }
    function unsetpattern() {
        document.getElementById("pattern").value = "";
        var childs = document.getElementById("pattern").querySelectorAll('option');
        console.log(childs);
        for (var i = 0; i < childs.length; i++) {
            var elem = childs[i];
            console.log(elem);
            elem.disabled = false;
        }

        console.log(document.getElementById("pattern"));
    }
    function unsetjoint() {
        document.getElementById("joint").value = "";
        var childs = document.getElementById("joint").querySelectorAll('option');
        console.log(childs);
        for (var i = 0; i < childs.length; i++) {
            var elem = childs[i];
            console.log(elem);
            elem.disabled = false;

        }

        console.log(document.getElementById("joint"));
    }
}
export async function unsetAll() {
    var childs = document.querySelectorAll('option');
    console.log(childs);
    for (var i = 0; i < childs.length; i++) {
        var elem = childs[i];
        console.log(elem);
        elem.disabled = false;
        elem.parentNode.value = "";
    }
}