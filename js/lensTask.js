export var disabled = true;
var rightSph_elem;
var leftSph_elem;
var rightCyl_elem;
var leftCyl_elem;
var rightAxis_elem;
var leftAxis_elem;
var rightAdd_elem;
var leftAdd_elem;
export async function submit() {
    var rightType = "";
    var leftType = "";
    var rightSph = Number.parseFloat(rightSph_elem.value);
    var leftSph = Number.parseFloat(leftSph_elem.value);
    var rightCyl = Number.parseFloat(rightCyl_elem.value);
    var leftCyl = Number.parseFloat(leftCyl_elem.value);
    var rightAxis = Number.parseFloat(rightAxis_elem.value);
    var leftAxis = Number.parseFloat(leftAxis_elem.value);
    var rightAdd = Number.parseFloat(rightAdd_elem.value);
    var leftAdd = Number.parseFloat(leftAdd_elem.value);
    var rightTranspose = new powerTranspose(rightSph, rightCyl, rightAxis);
    rightSph = rightTranspose.sph;
    rightCyl = rightTranspose.cyl;
    rightAxis = rightTranspose.axis;
    var leftTranspose = new powerTranspose(leftSph, leftCyl, leftAxis);
    leftSph = leftTranspose.sph;
    leftCyl = leftTranspose.cyl;
    leftAxis = leftTranspose.axis;
    var cost = "";
    var numberStringR = "";
    var numberStringL = "";
    if (disabled) {
        rightType = testTypeSV(rightSph, rightCyl);
        leftType = testTypeSV(leftSph, leftCyl);
        rightAdd = NaN;
        leftAdd = NaN;
    } else {
        var lensType_elem = document.querySelector('#lensType');
        var input_elems = lensType_elem.querySelectorAll('input');

        if (input_elems[0].checked) {
            rightType = testTypeSV(rightSph, rightCyl);
            leftType = testTypeSV(leftSph, leftCyl);
            cost = await getPrice(rightType, leftType, 0);
            rightAdd = NaN;
            leftAdd = NaN;
        } else if (input_elems[1].checked) {
            rightType = testTypeKT(rightSph, rightCyl, rightAxis, rightAdd);
            leftType = testTypeKT(leftSph, leftCyl, leftAxis, leftAdd);
            cost = await getPrice(rightType, leftType, 1);
        } else if (input_elems[2].checked) {
            rightType = testTypeProg(rightSph, rightCyl, rightAxis, rightAdd);
            leftType = testTypeProg(leftSph, leftCyl, leftAxis, leftAdd);
            cost = await getPrice(rightType, leftType, 2);
        }
    }

    var numberStringR = generateString(rightSph, rightCyl, rightAxis, rightAdd)
    var numberStringL = generateString(leftSph, leftCyl, leftAxis, leftAdd);
    var textString = "R: " + numberStringR + "<br>" +
        "L: " + numberStringL + "<br>" +
        "Right Type : " + rightType + "<br>Left Type : " + leftType + cost;
    //  console.log(textString);
    document.querySelector('#detailsView').innerHTML = textString;
}
export function generateString(sph, cyl, axis, add) {
    var string = "";
    if (!isNaN(sph)) {
        string += sph + "sph";
    }
    if (!isNaN(sph) && !isNaN(cyl)) {
        string += "/" + cyl + "cyl " + axis;
    } else if (!isNaN(cyl)) {
        string += cyl + "cyl " + axis;
    }
    if (!isNaN(add)) {
        string += " Add : +" + add;
    }
    return string;
}
export async function getPrice(rightType, leftType, type) {
    var data = "";
    if (type == 0) {
        try {
            var results = fetch('https://api.github.com/gists/833f42c511801927fea4026d252eaa61').then(results => {
                return results.json();
            });
            data = await results.then(data => {
                return data.files["lensSVDetails.json"].content;
            });
            setTimeout(data = JSON.parse(data), 3000);
        } catch (error) {
            window.alert(error);
            /*data = fetch('../json/prodFmData.json').then(results => {
                return results.json();
            });*/
        }
    } else if (type == 1) {
        try {
            var results = fetch('https://api.github.com/gists/d60f835029b271e9c33d34836e6459ec').then(results => {
                return results.json();
            });
            data = await results.then(data => {
                return data.files["lensKTDetails.json"].content;
            });
            setTimeout(data = JSON.parse(data), 3000);
        } catch (error) {
            window.alert(error);
            /*data = fetch('../json/prodFmData.json').then(results => {
                return results.json();
            });*/
        }
    } else if (type == 2) {
        try {
            var results = fetch('https://api.github.com/gists/44d674dd8f4ea4c2f2971096f10cf1d5').then(results => {
                return results.json();
            });
            data = await results.then(data => {
                return data.files["lensV2Details.json"].content;
            });
            setTimeout(data = JSON.parse(data), 3000);
        } catch (error) {
            window.alert(error);
            /*data = fetch('../json/prodFmData.json').then(results => {
                return results.json();
            });*/
        }
    }
    data = Object.values((await data).valueOf("data"))[0];
    ////   console.log(data);
    if (data.length > 0) {
        var keys = ["CRHC", "BRC", "Violet", "PGlite",
            "PGdark", "PolyHC", "PolyViolet", "PGViolet", "PhotoBrown"];
        var rightCost = "";
        var leftCost = "";
        var totalCosts = "";
        for (var i in data) {
            var keywords = data[i].keywords;
            for (var k in keywords) {
                if (rightType == keywords[k]) {
                    rightCost = data[i].cost;
                }
                if (leftType == keywords[k]) {
                    leftCost = data[i].cost;
                }
            }

        }
        //console.log("rightCost : " + rightCost);
        //console.log("leftCost : " + leftCost);
        for (var j in keys) {
            //   console.log("j:" + j + "\nkey=" + keys[j]);
            //   console.log(rightCost['"' + keys[j] + '"']);
            //   console.log(leftCost['"' + keys[j] + '"']);
            var totalCost = Number.parseFloat(rightCost[keys[j]]) + Number.parseFloat(leftCost[keys[j]]);
            if (!isNaN(totalCost)) {
                totalCosts += "<br><br> " + keys[j] + " Rs." + (totalCost * 3);
            } else {
                totalCosts += "<br><br> " + keys[j] + " Rx";
            }
        }
        return totalCosts;
    }

}
export class powerTranspose {
    static sph;
    static cyl;
    static axis;
    constructor(inSph, inCyl, inAxis) {
        this.sph = inSph;
        this.cyl = inCyl;
        this.axis = inAxis;

        //  console.log("Line 46 : PowerTranspose :\nsph:" + this.sph + "\ncyl:" + this.cyl + "\naxis:" + this.axis);
        if (!isNaN(this.sph) && !isNaN(this.cyl) && !isNaN(this.axis)) {
            if ((this.sph > 0 && this.cyl < 0) || (this.sph < 0 && this.cyl > 0)) {
                this.sph = this.sph + this.cyl;
                this.cyl = -this.cyl;

                if (this.axis > 90 && this.axis <= 180) {
                    this.axis = this.axis - 90;
                } else {
                    this.axis = this.axis + 90;
                }
                if (this.sph == 0) {
                    this.sph = NaN;
                }
                if (this.cyl == 0) {
                    this.cyl = NaN;
                }
            }
        }
        //  console.log("Line 58 : PowerTranspose End:\nsph:" + this.sph + "\ncyl:" + this.cyl + "\naxis:" + this.axis);
    }


}
export function testTypeKT(sphPower, cylPower, axis, add) {
    /*console.log("line 40 :\n" + "sphPower:" + sphPower + "\ncylPower:" + cylPower +
        "\naxis:" + axis + "\nadd:" + add);*/
    var type = "";
    var sphType = "";
    var cylType = "";
    var axisType = "";
    //var addType = "";
    if (!isNaN(add)) {
        if (isNaN(sphPower) && !isNaN(cylPower)) {
            if (cylPower >= 0 && cylPower <= 1) {
                cylType = "+1";
            } else if (cylPower < 0 && cylPower >= -1) {
                cylType = "-1";
            } else if (cylPower > 1 && cylPower <= 2 && sphPower <= 2) {
                cylType = "+2";
            } else if (cylPower < 1 && cylPower >= -2 && sphPower >= -2) {
                cylType = "-2";
            } else if (cylPower > 1 && cylPower <= 2) {
                cylType = "+2";
            } else if (cylPower < -1 && cylPower >= -2) {
                cylType = "-2";
            } else if (cylPower < -2 && cylPower >= -3) {
                cylType = "-3";
            } else if (cylPower < -3 && cylPower >= -4) {
                cylType = "-4";
            } else if (cylPower > 2 && cylPower <= 3) {
                cylType = "+3";
            } else if (cylPower > 3 && cylPower <= 4) {
                cylType = "+4";
            } else {
                type = "Rx"; console.log("line 69");
            }
        } else if (!isNaN(cylPower)) {
            if (cylPower > 0 && cylPower <= 1) {
                cylType = "+1";
            } else if (cylPower < 0 && cylPower >= -1) {
                cylType = "-1";
            } else if (cylPower > 1 && cylPower <= 2 && sphPower <= 2) {
                cylType = "+2";
            } else if (cylPower < -1 && cylPower >= -2 && sphPower >= -2) {
                cylType = "-2";
            } else {
                type = "Rx"; console.log("line 81");
            }
        }

        if (sphPower >= 0 && sphPower <= 2) {
            sphType = "+2";
        } else if (sphPower < 0 && sphPower >= -2) {
            sphType = "-2";
        } else if (sphPower > 2 && sphPower <= 3) {
            sphType = "+3";
        } else if (sphPower < -2 && sphPower >= -3) {
            sphType = "-3";
        } else if (isNaN(cylPower) && (sphPower < -3 || sphPower > 3)) {
            if (sphPower < -3 && sphPower >= -4) {
                sphType = "-4";
            } else if (sphPower < -4 && sphPower >= -5) {
                sphType = "-5";
            } else if (sphPower < -5 && sphPower >= -6) {
                sphType = "-6";
            } else if (sphPower > 3 && sphPower <= 4) {
                sphPower = "+4";
            } else if (sphPower > 4 && sphPower <= 5) {
                sphType = "+5";
            } else if (sphPower > 5 && sphPower <= 6) {
                sphType = "+6";
            } else {
                type = "Rx";
            }
        }
        if (axis >= 68 && axis <= 112) {
            axisType = " 90";
        } else if ((axis >= 158 && axis <= 180) || (axis <= 22 && axis >= 0)) {
            axisType = " 180";
        } else if (axis >= 23 && axis <= 67) {
            axisType = " 45";
        } else if (axis >= 113 && axis <= 157) {
            axisType = " 135";
        } else if (!isNaN(cylPower)) {
            type = "Error";
        }
        if (add < 1 || add > 3) {
            type = "Rx";
        }
        if (type.length == 0) {
            if (sphType.length > 0 && cylType.length > 0 && axisType.length > 0) {
                type = sphType + "sph/" + cylType + "cyl" + axisType + " KT";
            } else if (sphType.length == 0 && cylType.length > 0 && axisType.length > 0) {
                type = cylType + "cyl" + axisType + " KT";
            } else if (sphType.length > 0 && cylType.length == 0) {
                type = sphType + "sph KT";
            } else {
                type = "Error";
            }
        }
        return type.trim();
    } else {
        return testTypeSV(sphPower, cylPower);
    }
}
export function testTypeProg(sphPower, cylPower, axis, add) {
    /*console.log("line 40 :\n" + "sphPower:" + sphPower + "\ncylPower:" + cylPower +
        "\naxis:" + axis + "\nadd:" + add);*/
    var type = "";
    var sphType = "";
    var cylType = "";
    var axisType = "";
    //var addType = "";
    if (!isNaN(add)) {
        //  console.log("line : 190");
        if (add >= 1 && add <= 3) {
            //  console.log("line : 192");
            if (!isNaN(cylPower) && !isNaN(sphPower)) {
                if ((sphPower < 0 && cylPower > 0) || (sphPower > 0 && cylPower < 0)) {
                    //  console.log("line : 195");
                    type = "Rx";
                } else if (!isNaN(axis)) {
                    if ((sphPower > 3 && cylPower > 1) || (sphPower < -3 && cylPower < -1)) {
                        //  console.log("line : 199");
                        type = "Rx";
                    } else if ((sphPower > 2 && cylPower > 2) || (sphPower < -2 && cylPower < -2)) {
                        //  console.log("line : 199");
                        type = "Rx";
                    }
                }
            } else if (cylPower < 0 && axis != 90) {
                //  console.log("line : 198");
                type = "Rx";
            } else if (cylPower > 0 && axis != 180) {
                //  console.log("line : 200");
                type = "Rx";
            } else if (isNaN(cylPower) && (sphPower > 6 || sphPower < -6)) {
                //  console.log("line : 204");
                type = "Rx";
            }
        } else {
            //  console.log("line : 208");
            type = "Rx";
        }
        if (type.length == 0) {
            //  console.log("line : 212");
            if (isNaN(sphPower) && !isNaN(cylPower)) {
                //  console.log("line : 214");
                if (cylPower > 0 && cylPower <= 2 && axis == 180) {
                    //  console.log("line : 216");
                    cylType = "+2"; axisType = " 180";
                } else if (cylPower < 0 && cylPower >= -2 && axis == 90) {
                    //  console.log("line : 219");
                    cylType = "-2"; axisType = " 90";
                } else if (cylPower > 1 && cylPower <= 2 && axis == 180) {
                    //  console.log("line : 222");
                    cylType = "+2"; axisType = " 180";
                } else if (cylPower < -2 && cylPower >= -3 && axis == 90) {
                    //  console.log("line : 225");
                    cylType = "-3"; axisType = " 90";
                } else if (cylPower > 2 && cylPower <= 3 && axis == 180) {
                    //  console.log("line : 227");
                    cylType = "+3"; axisType = " 180";
                } else if (cylPower < -3 && cylPower >= -4 && axis == 90) {
                    //  console.log("line : 231");
                    cylType = "-4"; axisType = " 90";
                } else if (cylPower > 3 && cylPower <= 4 && axis == 180) {
                    //  console.log("line : 234");
                    cylType = "+4"; axisType = " 180";
                } else {
                    //  console.log("line : 237");
                    type = "Rx"; console.log("line 69");
                }
            } else if (!isNaN(cylPower)) {
                //  console.log("line : 241");
                if (cylPower > 0 && cylPower <= 1 && axis == 180) {
                    //  console.log("line : 243");
                    cylType = "+1"; axisType = " 180";
                } else if (cylPower < 0 && cylPower >= -1 && axis == 90) {
                    //  console.log("line : 246");
                    cylType = "-1"; axisType = " 90";
                } else if (cylPower > 1 && cylPower <= 2 && sphPower <= 2 && axis == 180) {
                    //  console.log("line : 249");
                    cylType = "+2"; axisType = " 180";
                } else if (cylPower < 1 && cylPower >= -2 && sphPower >= -2 && axis == 90) {
                    //  console.log("line : 252");
                    cylType = "-2"; axisType = " 90";
                } else {
                    //  console.log("line : 255");
                    type = "Rx"; console.log("line 81");
                }
            }

            if (sphPower > 0 && sphPower <= 2) {
                //  console.log("line : 261");
                sphType = "+2";
            } else if (sphPower < 0 && sphPower >= -2) {
                //  console.log("line : 264");
                sphType = "-2";
            } else if ((isNaN(cylPower) || cylPower <= 1) && sphPower > 2 && sphPower <= 3) {
                //  console.log("line : 267");
                sphType = "+3";
            } else if ((isNaN(cylPower) || cylPower >= -1) && sphPower < -2 && sphPower >= -3) {
                //  console.log("line : 270");
                sphType = "-3";
            } else if (isNaN(cylPower) && (sphPower < -3 || sphPower > 3)) {
                //  console.log("line : 273");
                if (sphPower < -3 && sphPower >= -4) {
                    //  console.log("line : 275");
                    sphType = "-4";
                } else if (sphPower < -4 && sphPower >= -5) {
                    //  console.log("line : 278");
                    sphType = "-5";
                } else if (sphPower < -5 && sphPower >= -6) {
                    //  console.log("line : 281");
                    sphType = "-6";
                } else if (sphPower > 3 && sphPower <= 4) {
                    //  console.log("line : 284");
                    sphPower = "+4";
                } else if (sphPower > 4 && sphPower <= 5) {
                    //  console.log("line : 287");
                    sphType = "+5";
                } else if (sphPower > 5 && sphPower <= 6) {
                    //  console.log("line : 289");
                    sphType = "+6";
                } else {
                    //  console.log("line : 293");
                    type = "Rx";
                }
            }
            if (add < 1 || add > 3) {
                //  console.log("line : 298");
                type = "Rx";
            }
            if (type.length == 0) {
                //  console.log("line : 302");
                if (sphType.length > 0 && cylType.length > 0 && axisType.length > 0) {
                    //  console.log("line : 304");
                    type = sphType + "sph/" + cylType + "cyl" + axisType + " V2";
                } else if (sphType.length == 0 && cylType.length > 0 && axisType.length > 0) {
                    //  console.log("line : 307");
                    type = cylType + "cyl" + axisType + " V2";
                } else if (sphType.length > 0 && cylType.length == 0) {
                    //  console.log("line : 309");
                    type = sphType + "sph V2";
                } else {
                    //  console.log("line : 313");
                    type = "Error";
                }
            }
        }

        return type;
    } else {
        //  console.log("line : 321");
        return testTypeSV(sphPower, cylPower);
    }
}
export function testTypeSV(sphPower, cylPower) {
    //  console.log("sphPower :" + sphPower + "\n cylPower : " + cylPower);
    //  console.log(cylPower);
    var type = "";
    var sphType = "";
    var cylType = "";
    if (sphPower >= -6 && sphPower <= 0) {
        sphType = "-6";
        //  console.log("line : 291");
    } else if (sphPower >= -8 && sphPower <= -6.25) {
        sphType = "-8";
        //  console.log("line : 294");
    } else if (sphPower >= -10 && sphPower <= -8.25) {
        sphType = "-10";
        //  console.log("line : 397");
    } else if (sphPower <= -10.25) {
        sphType = "Rx";
        //  console.log("line : 300");
    } if (sphPower >= 0 && sphPower <= 4) {
        sphType = "+4";
        //  console.log("line : 303");
    } else if (sphPower > 4 && sphPower <= 6) {
        sphType = "+6";
        //  console.log("line : 306");
    } else if (sphPower > 6 && sphPower <= 8) {
        sphType = "+8";
        //  console.log("line : 309");
    } else if (sphPower > 8.00) {
        sphType = "Rx";
        //  console.log("line : 312");
    }
    if (cylPower >= -2 && cylPower <= 0) {
        cylType = "-2";
        //  console.log("line : 316");
    } else if (cylPower >= -4 && cylPower <= -2.25) {
        cylType = "-4";
        //  console.log("line : 319");
    } else if (cylPower <= -4.25) {
        cylType = "Rx";
        //  console.log("line : 322");
    } else if (cylPower >= 0 && cylPower <= 2) {
        cylType = "+2";
        //  console.log("line : 325");
    } else if (cylPower > 2 && cylPower <= 4) {
        cylType = "+4";
        //  console.log("line : 328");
    } else if (cylPower > 4.00) {
        cylType = "Rx";
        //  console.log("line : 331");
    }
    if (sphType.length == 0) {
        //  console.log("line : 334");
        if (cylType.length > 0 && (cylType.indexOf('Rx') < 0)) {
            //  console.log("line : 336");
            if (cylPower > 0) {
                type = "+6/" + cylType;
                //  console.log("line : 339");
            } else if (cylPower <= 0) {
                type = "-6/" + cylType;
                //  console.log("line : 342");
            } else {
                type = "-6/-2";
                //  console.log("line : 345");
            }
        } else if (cylType.indexOf('Rx') >= 0) {
            type = "Rx";
            //  console.log("line : 249");
        } else {
            type = "Error";
            //  console.log("line : 352");
        }
    }
    if (sphType.length > 0) {
        //  console.log("line : 142");
        if (cylType.length > 0 && (cylType.indexOf('Rx') < 0) && (sphType.indexOf('Rx') < 0)) {
            //  console.log("line : 144");
            if (cylPower > 0) {
                type = sphType + "/" + cylType;
                //  console.log("line : 147");
            } else if (cylPower < 0) {
                type = sphType + "/" + cylType;
                //  console.log("line : 150");
            } else if (sphPower <= 0) {
                type = sphType + "/-2";
                //  console.log("line : 153");
            } else if (sphPower > 0) {
                type = sphType + "/+2";
                //  console.log("line : 156");
            }
        } else if (cylType.indexOf('Rx') >= 0 || (sphType.indexOf('Rx') >= 0)) {
            //  console.log("line : 159");
            type = "Rx";
        } else if (cylType.length == 0 && sphPower <= 0) {
            type = sphType + "/-2";
            //  console.log("line : 163");
        } else if (cylType.length == 0 && sphPower > 0) {
            type = sphType + "/+2";
            //  console.log("line : 166");
        } else {
            type = "Error";
            //  console.log("line : 169");
        }
    }
    return type;
}
export function additionEnter() {
    var add_elems = document.querySelector('#additionLabel').querySelectorAll('select');
    //  console.log(add_elems);
    for (var i = 0; i < add_elems.length; i++) {
        var inp = add_elems[i].value;
        if (inp.length > 0) {
            disabled = false;
            break;
        } else {
            disabled = true;
        }
    }
    var lensType_elem = document.querySelector('#lensType');
    var input_elems = lensType_elem.querySelectorAll('input');
    if (disabled) {
        input_elems[0].click();
    }
    for (var i = 1; i < input_elems.length; i++) {
        var inp = input_elems[i];
        inp.disabled = disabled;
    }
}

export function initViews() {
    /**Assign Data Entry Elements to variables**/
    rightSph_elem = document.querySelector('#r_sphPower');
    leftSph_elem = document.querySelector('#l_sphPower');
    rightCyl_elem = document.querySelector('#r_cylPower');
    leftCyl_elem = document.querySelector('#l_cylPower');
    rightAdd_elem = document.querySelector('#reAdd');
    leftAdd_elem = document.querySelector('#leAdd');
    rightAxis_elem = document.querySelector('#reAxis');
    leftAxis_elem = document.querySelector('#leAxis');
    /***Assign Data Entry Elements to variables**/

    var i = -20;
    var opt = '<option value=""></option>';
    rightSph_elem.innerHTML = rightSph_elem.innerHTML + opt;
    leftSph_elem.innerHTML = leftSph_elem.innerHTML + opt;
    rightCyl_elem.innerHTML = rightCyl_elem.innerHTML + opt;
    leftCyl_elem.innerHTML = leftCyl_elem.innerHTML + opt;
    rightAdd_elem.innerHTML = rightAdd_elem.innerHTML + opt;
    leftAdd_elem.innerHTML = leftAdd_elem.innerHTML + opt;
    while (i <= 20) {
        var opt = '<option value="' + i.toFixed(2) + '">' + i.toFixed(2) + '</option>';

        if (i != 0) {
            rightSph_elem.innerHTML = rightSph_elem.innerHTML + opt;
            leftSph_elem.innerHTML = leftSph_elem.innerHTML + opt;
        }
        if (i >= -10 && i <= 10 && i != 0) {
            rightCyl_elem.innerHTML = rightCyl_elem.innerHTML + opt;
            leftCyl_elem.innerHTML = leftCyl_elem.innerHTML + opt;
        }
        if (i <= -10 || i >= 10) {
            i = i + 1;
        } else if (i <= -6 || i >= 6) {
            i = i + 0.50;
        } else {
            i = i + 0.25;
            if (i > 0.50 && i < 4.25) {
                rightAdd_elem.innerHTML = rightAdd_elem.innerHTML + opt;
                leftAdd_elem.innerHTML = leftAdd_elem.innerHTML + opt;
            }
        }
    }
}