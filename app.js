
// interação

const citySearchInput = document.getElementById('city-search-input');
const citySearchButton = document.getElementById('city-search-button');


// exibição

const currentDate = document.getElementById("current-date");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const currentTemperature = document.getElementById("current-temperature");
const feelsLikeTemperature = document.getElementById("feels-like-temperature");
const currentHumidity = document.getElementById("current-humidity");
const windSpeed = document.getElementById("wind-speed");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");


const api_key = "7e17b60660d20421e11f32f4c5e78a8b";

citySearchButton.addEventListener("click", () => {

    let cityName = citySearchInput.value
    getCityWeather(cityName)

})

navigator.geolocation.getCurrentPosition((positon) => {
    console.log(positon);
})


function getCityWeather(cityName) {
    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
}

function displayWeather(data) {
    console.log(data)
    let {
        dt,
        name,
        weather: [{  icon, description  }],
        main:  {temp, feels_like, humidity},
        wind:   {speed},
        sys:    {sunrise, sunset},    
    }= data

    currentDate.textContent = dt
    cityName.textContent = name;
    weatherIcon.src = `assets/${icon}.svg`

    description = description.charAt(0).toUpperCase() + description.slice(1);
    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)}°C`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}Km`;
    feelsLikeTemperature.textContent = `${feels_like}°C`;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);


}

function formatTime(epochTime) {
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
}

function formatDate(epochTime) {
    let date = new Date(epochTime * 1000)
    let formattedDate = date.toLocaleDateString('pt_BR', {mounth: "long", day: 'numeric'})
    return `Hoje, ${formattedDate}`
}

