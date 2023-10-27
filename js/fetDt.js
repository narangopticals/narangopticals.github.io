export async function grabData(type) {
    var data = "";
    var str = "";
    var valueData;
    try {
        var results = fetch('https://api.github.com/gists/64757e4eb8fc6bb783fcf95f7a94bfa8').then(results => {
            return results.json();
        });
        data = await results.then(data => {
            return data.files["fetchData.json"].content;
        });
        setTimeout(data = JSON.parse(data), 3000);
    } catch (error) {
        window.alert(error);
    }
    if ((await data) != null) {
        str = Object.values((data).valueOf("data"))[0];
        var dataLength = str.length;
        var dbArray = [];
        if (dataLength > 0) {
            var data_sub;
            for (var i = 0; i < dataLength; i++) {
                valueData = str[i];
                if (valueData.dtype.trim() == type) {
                    //valueData.tabname;
                    var results_sub = fetch('https://api.github.com/gists/' + valueData.dloc.trim()).then(results_sub => {
                        return results_sub.json();
                    });
                    data_sub = await results_sub.then(data_sub => {
                        return data_sub.files[valueData.dname.trim()].content;
                    });
                    setTimeout(data_sub = JSON.parse(data_sub), 3000);
                    var str_sub_tmp = Object.values((data_sub).valueOf("data"))[0];
                    if (dbArray == null) {
                        dbArray = Array.prototype.concat(str_sub_tmp);
                    } else {
                        dbArray = Array.prototype.concat(str_sub_tmp, dbArray);
                    }
                } else if (type == null) {
                    var results_sub = fetch('https://api.github.com/gists/' + valueData.dloc.trim()).then(results_sub => {
                        return results_sub.json();
                    });
                    data_sub = await results_sub.then(data_sub => {
                        return data_sub.files[valueData.dname.trim()].content;
                    });
                    setTimeout(data_sub = JSON.parse(data_sub), 3000);
                    var str_sub_tmp = Object.values((data_sub).valueOf("data"))[0];
                    if (dbArray == null) {
                        dbArray = Array.prototype.concat(str_sub_tmp);
                    } else {
                        dbArray = Array.prototype.concat(str_sub_tmp, dbArray);
                    }
                }
            }

            var dataLength_sub = dbArray.length;
            if (dataLength_sub > 0) {
                return dbArray;
            }
        }
    }
    return null;
}