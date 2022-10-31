function formatDate(timestamp) {
  let now = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let mins = now.getMinutes();

  if (hours < 10) {
    hours = "0".concat(`${hours}`);
  }
  if (mins < 10) {
    mins = "0".concat(`${mins}`);
  }
  return `${day}, ${hours}:${mins}`;
}

function showWeather(response) {
  //console.log(response);

  document.querySelector(
    "#city-name"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#temp-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function searchWeather(city) {
  let tempUnit = "metric";
  let apiKey = "40b745c14eadad7b7c4e6e4bf3b70103";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempUnit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  console.log(searchCity.value);
  if (searchCity.value !== null) {
    searchWeather(searchCity.value);
  } else {
    alert("Enter a city or zipcode.");
  }
}

function convertTempC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "";
}

function convertTempF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round((0 * 9) / 5 + 32);
}

function showMyLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let tempUnit = "metric";
  let apiKey = "40b745c14eadad7b7c4e6e4bf3b70103";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${tempUnit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMyLocation);
}

//let currentTime = document.querySelector("#date");
//currentTime.innerHTML = formatDate();
//console.log(formatDate());

let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", searchCity);

//let linkC = document.querySelector("#celsius-link");
//linkC.addEventListener("click", convertTempC);

//let linkF = document.querySelector("#fahrenhite-link");
//linkF.addEventListener("click", convertTempF);

let myLocationButton = document.querySelector("#my-location");
myLocationButton.addEventListener("click", getMyLocation);

searchWeather("Bengaluru");
