function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let speedElement = document.querySelector("#speed");
  speedElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#time");

  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="weather-app-icon"
    />`;
}

function searchCity(city) {
  let apiKey = "o2fc983ae14c1cca5af4054122tfbfe2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
