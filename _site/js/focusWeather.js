document.addEventListener("DOMContentLoaded", () => {
    const currentCity ="amsterdam";
    const currentCityData = weatherData[currentCity + "_daily"];
    const time = document.getElementById("time");
    const weatherCode = document.getElementById("weatherCode");
    const temperature_2m_max = document.getElementById("temperature_2m_max");
    const wind_speed_10m_max = document.getElementById("wind_speed_10m_max");
    const wind_direction_10m_dominant = document.getElementById("wind_direction_10m_dominant");
    const precipitation_probability_max = document.getElementById("precipitation_probability_max");

    if (currentCityData) {
        time.innerHTML = currentCityData.daily.time[0];
        weatherCode.innerHTML = currentCityData.daily.weather_code[0];
        temperature_2m_max.innerHTML = currentCityData.daily.temperature_2m_max[0];
        wind_speed_10m_max.innerHTML = currentCityData.daily.wind_speed_10m_max[0];
        wind_direction_10m_dominant.innerHTML = currentCityData.daily.wind_direction_10m_dominant[0];
        precipitation_probability_max.innerHTML = currentCityData.daily.precipitation_probability_max[0];
    } else {
        console.error("Weather data for the current city not found.");
    }
});
