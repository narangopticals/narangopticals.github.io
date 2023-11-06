/*data Variables*/
var framesData = "";
var sunglassData = "";
var lensData = "";
var rdyData = "";
var watchData = "";
/*data Variables*/

//initMain();

async function initMain() {
    try {
        var results = fetch('https://api.github.com/gists/ea3f7fa9a39a62872983e2b813441d53').then(results => {
            return results.json();
        });
        framesData = await results.then(data => {
            return data.files["prodFmData.json"].content;
        });
        setTimeout(framesData = JSON.parse(framesData), 3000);
        //framesData = (framesData.valueOf("data"))[0];
    } catch (error) {
        window.alert(error);
        framesData = fetch('../json/prodFmData.json').then(results => {
            return results.json();
        });
    }
    //console.log(data);
    try {
        var results = fetch('https://api.github.com/gists/8fef5a38ff904a0c42df470064dda3f9').then(results => {
            return results.json();
        });
        sunglassData = await results.then(data => {
            return data.files["prodSgData.json"].content;
        });
        setTimeout(sunglassData = JSON.parse(sunglassData), 3000);
        //framesData = (framesData.valueOf("data"))[0];
    } catch (error) {
        window.alert(error);
        sunglassData = fetch('../json/prodSgData.json').then(results => {
            return results.json();
        });
    }

    try {
        var results = fetch('https://api.github.com/gists/2a9920dd79543db4549056de07cc83e7').then(results => {
            return results.json();
        });
        lensData = await results.then(data => {
            return data.files["prodLnsData.json"].content;
        });
        setTimeout(lensData = JSON.parse(lensData), 3000);
        //framesData = (framesData.valueOf("data"))[0];
    } catch (error) {
        window.alert(error);
        lensData = fetch('../json/prodLnsData.json').then(results => {
            return results.json();
        });
    }
    try {
        var results = fetch('https://api.github.com/gists/2999fc336989306ae76d3e11611c44fe').then(results => {
            return results.json();
        });
        rdyData = await results.then(data => {
            return data.files["prodRdyData.json"].content;
        });
        setTimeout(rdyData = JSON.parse(rdyData), 3000);
        //framesData = (framesData.valueOf("data"))[0];
    } catch (error) {
        window.alert(error);
        rdyData = fetch('../json/prodLnsData.json').then(results => {
            return results.json();
        });
    }

    try {
        var results = fetch('https://api.github.com/gists/a54c544dee909008b0cb98db283c9f64').then(results => {
            return results.json();
        });
        watchData = await results.then(data => {
            return data.files["prodWatchData.json"].content;
        });
        setTimeout(watchData = JSON.parse(watchData), 3000);
        //framesData = (framesData.valueOf("data"))[0];
    } catch (error) {
        window.alert(error);
        watchData = fetch('../json/prodLnsData.json').then(results => {
            return results.json();
        });
    }
    //console.log("framesData");
    //console.log(framesData['data']);
    //console.log("sunglassData");
    //console.log(sunglassData['data']);
    //console.log("lensData");
    //console.log(lensData);
    //var dbArray = Array.prototype.concat(framesData['data'], sunglassData['data'], lensData['data'], rdyData['data'], watchData['data']);
    //console.log("mergedJSON");
    //console.log(mergedJSON);
    //console.log(mergedJSON.valueOf("data"));
    //str = dbArray;
    //console.log(str);
    //console.log(str.length);
    //var dataLength = str.length;
}
export async function loadAnimation() {

}

export async function animateFlexs() {
    let slideIndex = 0;
    //showSlides(slideIndex);
    let slideCount = 0;
    //let boolPlay = false;
    //const slideshowContainer = document.getElementById("productIntroHolder");
    firstRun();

    var autoBol = false;

    function firstRun() {
        autoBol = false;
        let i;
        let slides = window.document.getElementsByClassName("typeHolder");
        //let slideName = document.getElementsByClassName("slideName");
        for (i = 0; i < slides.length; i++) {
            /*var perc = ((i - slideIndex) * 100);
            slides[i].style.left = + '%';
            console.log("line 127: i =" + i + ", perc= " + perc + ", slideIndex=" + slideIndex);*/
            //slides[i].style.position = 'relative';
            slides[i].style.display = 'none';
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        //slides[slideIndex - 1].style.position = 'absolute';
        var pr = 0;
        /*if (window.screen.availHeight > window.screen.availWidth) {
            pr = -((slideIndex - 1) * 100);
        } else {
            pr = (15 - ((slideIndex - 1) * 45));
        }
        slides[slideIndex - 1].style.left = pr + '%';
        slides[slideIndex - 1].style.visibility = 'visible';
        console.log("line 127:pr= " + pr + ", slideIndex=" + slideIndex);*/
        slides[slideIndex - 1].style.display = '';
        //slides[slideIndex - 1].style.top = '10%';
        setTimeout(firstRun, 5000); // Change image every 2 seconds
    }
    function secondRun() {
        if (slideCount < 5) {
            firstRun();
            slideCount++;
        } else {
            autoBol = true;
        }
    }
    function showSlides(n) {
        var i;
        let slides = window.document.getElementsByClassName("typeHolder");
        //let slideNames = document.getElementsByClassName("typeHolder");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        if (n <= slides.length && n > 0) { slideIndex = n };
        for (i = 0; i < slides.length; i++) {
            slides[i].style.left = ((slideIndex - i) * 20) + '%';
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.left = '0%';
        /*
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                /*for (i = 0; i < slideNames.length; i++) {
                    slideNames[i].className = slideNames[i].className.replace(" active", "");
                }*/
        /*        slides[slideIndex - 1].style.display = "block";*/
        //slideNames[slideIndex - 1].className += " active";
    }
}