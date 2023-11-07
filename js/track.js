var str;

export async function trackOrder(orderId) {
    if (orderId != null && orderId.length > 0) {
        //console.log("track : line 16:");
        //console.log(data);
        if (str != null) {

            //console.log("track : line 19:");
            //console.log(str);
            var record = "";
            for (var i = 0; i < str.length; i++) {
                var item = str[i];
                //console.log("track : line 24:");
                //console.log(item);
                if (item.trackid.trim() == orderId.trim()) {
                    // //console.log("track : line 27:");
                    //console.log(item.trackid.trim());
                    if (item.trackid.trim().indexOf('/e') < 0) {
                        var status = item.status;

                        //console.log("track : line 31:");
                        //console.log(status);

                        for (var j = 0; j < status.length; j++) {
                            record += "<span><br>" + status[j] + "<br><br></span>";
                        }
                    }
                }
            }
            if (record.length > 0) {
                window.document.getElementById('trackingDetailView').innerHTML = record;
            } else {
                window.document.getElementById('trackingDetailView').innerHTML = "No Record Found!";
            }

        }
    }
}

export async function initId() {
    var data;
    try {
        var results = fetch('https://api.github.com/gists/8e1825129dcf5a90702fb7bc186740bf').then(results => {
            return results.json();
        });
        data = await results.then(data => {
            console.log(data);
            return data.files["trackOrder.json"].content;
        });
        setTimeout(data = JSON.parse(data), 3000);
    } catch (error) {
        window.alert("error:loading . Network Issue Or Too many Requests");
    }
    if (data != null) {
        str = Object.values((await data).valueOf("trackdata"))[0];
    }
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    if (id != null) {
        trackOrder(id);
        window.document.getElementById('trackIdHolder').style.display = "none";
        window.document.getElementById('detailsTrackHolder').style.display = "none";
    }
}


export async function getThatId(btnid) {
    var inputfield = window.document.getElementById(btnid);
    if (inputfield != null) {
        var id = inputfield.value;
        //console.log(id);
        trackOrder(id);
    }
}

export async function formThatID(nameBtnId, dateBtnId, numBtnId) {
    var name = "";
    var date = "";
    var numCode = "";
    var num = "";

    var nameBtn = window.document.getElementById(nameBtnId);
    if (nameBtn != null) {
        name = nameBtn.value;
        //console.log("line 81:");
        //console.log(name);
    }

    var dateBtn = window.document.getElementById(dateBtnId);
    if (dateBtn != null) {
        var tmp = dateBtn.value;
        var dateArr = tmp.split('-');
        date = "";
        for (var j = dateArr.length - 1; j >= 0; j--) {
            date += dateArr[j];
        }
        //console.log("line 87:");
        //console.log(date);
    }
    var numBtn = window.document.getElementById(numBtnId);
    if (numBtn != null) {
        num = numBtn.value;
        //console.log("line 95:");
        //console.log(num);
        for (var i = 0; i < num.length; i++) {
            if (i % 2 == 0) {
                numCode += num[i];
            }
        }

        //console.log("line 107:");
        //console.log(numCode);
    }
    var idPart = date + "-" + numCode;
    //console.log("line 113:");
    //console.log(idPart);
    for (var i = 0; i < str.length; i++) {
        var item = str[i];
        if (item.trackid.trim().indexOf(idPart) > 0) {
            if (item.regnum == num) {
                trackOrder(item.trackid.trim());
            }
        }
    }

}