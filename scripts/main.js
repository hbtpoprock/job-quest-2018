/*jshint esversion: 6 */

$(document).ready(function () {

    function showLoader() {
        $(".loader").hide();
        $("#json-obj").html('<div class="loader"></div>');
        $(".loader").show();
    }

    function showNumErrMsg() {
        $(".loader").hide();
        $("#json-obj").html('<div class="temp"></div>');
        $('.temp').text("The value should be positive integer.");
    }

    function showReqErrMsg() {
        $(".loader").hide();
        $("#json-obj").html('<span class="temp"></span>');
        $('.temp').text('Oops! Something went wrong.');
    }

    function showJokes(jokes) {
        $(".loader").hide();
        $("#json-obj").html(jokes);
    }

    function getNumValue() {
        let num = 1;
        let str = $(".number-input-box").val();

        if (str) {
            num = parseInt(str);
        }
        console.log('$(".number-input-box").val(): ' + $(".number-input-box").val());
        console.log('Boolean($(".number-input-box").val()): ' + Boolean($(".number-input-box").val()));
        console.log("num: " + num);

        return num;
    }

    function getFinalUrl() {
        let num = getNumValue();
        let url = "http://api.icndb.com/jokes/random/";
        let firstName = $('#firstName').val().trim();
        let lastName = $('#lastName').val().trim();

        if (firstName || lastName) {
            url += num;
            url += '?';
            url += 'firstName=' + firstName;
            url += '&';
            url += 'lastName=' + lastName;
        } else {
            url += num;
        }
        console.log("url: " + url);

        return url;
    }

    function getJokes(obj) {
        let jokes = "";

        for (i = 0; i < obj.value.length; i++) {
            let joke = obj.value[i].joke;

            jokes += '<li class="joke">' + joke + "</li>";

            console.log("i: " + i);
            console.log("joke[id: " + obj.value[i].id + "]: " + '"' + joke + '"');
        }
        console.log('jokes: ' + jokes);

        return jokes;
    }

    $("#get-joke-btn").click(function () {
        let intNum = parseInt($(".number-input-box").val());
        let str = $(".number-input-box").val();

        let url = getFinalUrl();
        let req = new XMLHttpRequest();

        req.open("GET", url, true);
        if (str) {
            console.log('$(".number-input-box").val() is not empty string');
            if (intNum > 0 && intNum == str) {
                console.log('and parseInt($(".number-input-box").val()) is greater than 0 && $(".number-input-box").val() is integer');
                console.log('req.status before load: ' + req.status);

                req.send();

                showLoader();
            } else {
                console.log('but parseInt($(".number-input-box").val()) is less than equal to 0 || $(".number-input-box").val() is not integer');

                showNumErrMsg();
            }
        } else {
            console.log('$(".number-input-box").val() is empty string or the input value is not number');
            console.log('req.status before load: ' + req.status);

            req.send();

            showLoader();
        }

        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                console.log('req.status after req sent: ' + req.status);
                if (req.status === 200) {
                    let json = JSON.parse(req.responseText);
                    let jokes = getJokes(json);

                    console.log("json: " + json);
                    console.log("JSON.stringify(json): " + JSON.stringify(json));

                    showJokes(jokes);
                } else {
                    console.log('req.status after req sent: ' + req.status);
                    console.log('req.statusText: ' + req.statusText);

                    showReqErrMsg();
                }
            }
        };
    });
});