

    document.addEventListener("DOMContentLoaded", () => {
            // I had to map the names of the cities because the url param was causing New York and San Franc to not display the data properly due to space between the words. Weather_data.js has new_york with an underscore. Same for San Fran
    const cityMappings = {
        "Amsterdam": "amsterdam",
        "Berlin": "berlin",
        "Copenhagen": "copenhagen",
        "Cork": "cork",
        "New York": "new_york", // Mapping "New York" to "new_york" in weatherData
        "Paris": "paris",
        "San Francisco": "san_francisco", // Mapping "San Francisco" to "san_francisco" in weatherData
        "Tromso": "tromso",
        "Waterford": "waterford"
    };

   
    // Take the city name from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const cityName = urlParams.get('city');

    //constant cityNameElement display the city name in the element with id
    const cityNameElement = document.getElementById('cityName');
    //if a cityName exist, display it in the element with id cityName otherwise, display Enter City here
    if (cityName) {
        cityNameElement.textContent = cityName;
    } else {
        cityNameElement.textContent = "Enter City here";
    }


  
    const currentCityData = weatherData[cityName.toLowerCase() + "_hourly"];
    const time = document.getElementById("time");
    const weatherCode = document.getElementById("weatherCode");
    const temperature_2m = document.getElementById("temperature_2m");
    const wind_speed_10m = document.getElementById("wind_speed_10m");
    const precipitation_probability = document.getElementById("precipitation_probability");
    const relative_humidity_2m = document.getElementById("relative_humidity_2m");

    const unitSymbols = {
        temperature_2m: "°C",
        wind_speed_10m: "km/h",
        precipitation_probability: "%",
        relative_humidity_2m: "%"
    }

   
    
// Update the time every second
        setInterval(() => {
    const now = dayjs(); // Get the current time
    const currentHour = now.format('HH:mm:ss'); // Get the current hour in the format HH:mm:ss
    const currentIndexHour = now.format('H'); // Get the current hour in singular digit format  and use it as index to get the weatherCode.

    if (currentCityData) {
        time.innerHTML = `${currentHour}`;
        day.innerHTML = now.format("dddd");
        weatherCode.innerHTML = currentCityData.hourly.weather_code[currentIndexHour];
        temperature_2m.innerHTML = `${currentCityData.hourly.temperature_2m[currentIndexHour]} ${unitSymbols.temperature_2m}`;
        wind_speed_10m.innerHTML = `${currentCityData.hourly.wind_speed_10m[currentIndexHour]} ${unitSymbols.wind_speed_10m}`;
        precipitation_probability.innerHTML = `${currentCityData.hourly.precipitation_probability[currentIndexHour]} ${unitSymbols.precipitation_probability}`;
        relative_humidity_2m.innerHTML = `${currentCityData.hourly.relative_humidity_2m[currentIndexHour]} ${unitSymbols.relative_humidity_2m}`;

        // Find the element with weather icon id 
        const weatherIcon = document.getElementById("weatherIcon");

        // Define the path to the weather icons folder
        const iconFolderPath = "images/weather-icons/";

        // Set the weather icon source based on the weather code
        if (weatherCode !== undefined) {
            // Get the filename of the weather icon based on the weather code
            const iconFilename = getWeatherIconFilename(currentCityData.hourly.weather_code[currentIndexHour]);

            // Construct the full path to the weather icon
            const iconPath = iconFolderPath + iconFilename;

            // Set the src attribute of the weather icon element
            weatherIcon.src = iconPath;
        } else {
            // If weather code is undefined, set a default icon
            weatherIcon.src = iconFolderPath + "sun.png";
        }
    } else {
        console.error("Weather data for the current city not found.");
    }
}, 1000); // Repeat every 1000 milliseconds (1 second)

        // Define a function to get the filename of the weather icon based on the weather code
        function getWeatherIconFilename(weatherCode) {
         switch (weatherCode) {
        case 0:     
            return "clear-sky.png";
        case 1:
        case 2:
        case 3:
            return "partly-cloud.png";
        case 45:
        case 48:
            return "fog.png";
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            return "drizzle-rain.png";
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            return "rain.png";
        case 71:
        case 73:
        case 75:
        case 77:
            return "snow.png";
        case 80:
        case 81:
        case 82:
            return "heavy-rain.png";
        case 85:
        case 86:
            return "snow.png";
        case 95:
            return "storm.png";
        default:
            return "clear-sky.png";
    }
}
  
    
});
