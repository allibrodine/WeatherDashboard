//apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
var apiKey = "7b6758606bd891fb0f3a6876ad548df4";
var city = document.querySelector("#city");

var getForecast = function() {
    var response = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=32.77&lon=96.79&appid=" + apiKey)
        .then(function(response) {
            response.json().then(function(data) {
                console.log(data);
            });
        });
};

getForecast();



//button click display search results

//store search in localStorage

//UV Index

//Five Day Forecast
