//apiUrl = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key};
var apiKey = "7b6758606bd891fb0f3a6876ad548df4";
var city = document.querySelector("#city");
var button = document.querySelector("#searchbtn");
var cityList = document.querySelector(".city-list");
var cityArray = JSON.parse(localStorage.getItem("citySearch")) || [];

//buttons for cities searched
for (var i = 0; i < cityArray.length; i++) {
    var btn = document.createElement("button");
    btn.value = cityArray[i];
    btn.innerText = cityArray[i];
    btn.addEventListener("click", getForecast);
    cityList.appendChild(btn);    
}

button.addEventListener("click", getForecast);

function getForecast(event) {
    event.preventDefault();
    
    console.log(cityArray.includes(city.value));

    if (city.value.trim() == "" || cityArray.includes(city.value) == true) {

    } else {
        cityArray.push(city.value);

        //store search in localStorage
        localStorage.setItem("citySearch", JSON.stringify(cityArray));

        var btn = document.createElement("button");
        btn.value = city.value;
        btn.innerText = city.value;
        btn.addEventListener("click", getForecast);
        cityList.appendChild(btn); 
    }
    
    var response = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&appid=" + apiKey)
        .then(function(response) {
            response.json().then(function(data) {
                console.log(data);
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                getForecast2(lat, lon);
            });
        });
};

var getForecast2 = function(lat, lon) {
    var response = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
        .then(function(response) {
            response.json().then(function(data) {
                console.log(data);
                
                for (var i = 0; i <= 6; i++) {
                    var temp = document.querySelector(`#temp${i + 1}`)
                    temp.innerText = data.daily[i].temp.max //convert temp

                    var wind = document.querySelector(`#wind${i + 1}`)
                    wind.innerText = data.daily[i].wind_speed

                    var humidity = document.querySelector(`#humidity${i + 1}`)
                    humidity.innerText = data.daily[i].humidity

                    var uvIndex = document.querySelector(`#uvIndex${i + 1}`)
                    uvIndex.innerText = data.daily[i].uvi 
                }
                    
            });
        });
};


//Five Day Forecast
