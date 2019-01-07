/*jshint esversion: 6 */

$(document).ready(function () {
    let joke;
    let num = 1;

    function getNumValue() {
        if ($(".input-box").val()) {
            num = $(".input-box").val();
        } else {
            num = 1;
        }
    }

    $("#get-joke-btn").click(function () {
        let url = "http://api.icndb.com/jokes/random/";

        getNumValue();
        console.log("num: " + num);

        url += num;
        console.log("url:" + url);

        req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.send();

        req.onload = function () {
            let content = "";

            json = JSON.parse(req.responseText);

            console.log("json:" + json);
            console.log("JSON.stringify(json):" + JSON.stringify(json));

            for (i = 0; i < json.value.length; i++) {
                joke = json.value[i].joke;

                content += '<p class="content">' + (i + 1) + "." + " " + joke + "</p>";

                console.log("i:" + i);
                console.log("joke: " + joke);
            }

            $("#json-obj").html(content);
        };
    });
});