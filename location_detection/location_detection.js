function successFunction(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    sessionStorage.setItem('lat', lat);
    sessionStorage.setItem('long', long);
}
  
function errorFunction() {
    window.location.href = "http://www.w3schools.com";
}
  
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} else {
    console.error('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}

function renderWeather(weather) {
    console.log(weather);
    var resultsContainer = document.querySelector("#weather-results");

    var location_name = document.createElement("p");
    location_name.textContent = "Location name " + weather.city.name;
    resultsContainer.append(location_name);

    var dt_text = document.createElement("p");
    dt_text.textContent = "Date time " + weather.list[0].dt_txt;
    resultsContainer.append(dt_text);

    var temp = document.createElement("p");
    temp.textContent = "Temp " + weather.list[0].main.temp;
    resultsContainer.append(temp);

    var temp_max = document.createElement("p");
    temp_max.textContent = "Temp_max " + weather.list[0].main.temp_max;
    resultsContainer.append(temp_max);

    var temp_min = document.createElement("p");
    temp_min.textContent = "Temp_min " + weather.list[0].main.temp_min;
    resultsContainer.append(temp_min);

    var wind_speed = document.createElement("p");
    wind_speed.textContent = "Wind_speed " + weather.list[0].wind.speed;
    resultsContainer.append(wind_speed);

    var wind_deg = document.createElement("p");
    wind_deg.textContent = "Wind_deg " + weather.list[0].wind.deg;
    resultsContainer.append(wind_deg);

    var weather_weather = document.createElement("p");
    weather_weather.textContent = "weather_weather " + weather.list[0].weather[0].main;
    resultsContainer.append(weather_weather);

    if (wind_deg < "5") {
        console.log("lol");
    } else {
        console.log("hah");
    }
}

function fetchWeather() {
    var lat = sessionStorage.getItem('lat');
    var lon = sessionStorage.getItem('long');
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat +"&lon="+ lon +"&appid=2d3575bd2805d5b9687f3320c778f5ec&units=metric";

    fetch(url)
      .then((response) => response.json())
      .then((data) => renderWeather(data))
      .catch((err) => {
        console.error(err);
      });
}

fetchWeather();
