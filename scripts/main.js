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

        return url;
    }

    function getJokes(obj) {
        let jokes = "";

        for (i = 0; i < obj.value.length; i++) {
            let joke = obj.value[i].joke;

            jokes += '<li class="joke">' + joke + "</li>";
        }

        return jokes;
    }

    $("#get-joke-btn").click(function () {
        let intNum = parseInt($(".number-input-box").val());
        let str = $(".number-input-box").val();

        let url = getFinalUrl();
        let req = new XMLHttpRequest();

        req.open("GET", url, true);

        if (str) {
            if (intNum > 0 && intNum == str) {
                req.send();

                showLoader();
            } else {
                showNumErrMsg();
            }
        } else {
            req.send();

            showLoader();
        }

        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    let json = JSON.parse(req.responseText);
                    let jokes = getJokes(json);

                    showJokes(jokes);
                } else {
                    showReqErrMsg();
                }
            }
        };
    });
});