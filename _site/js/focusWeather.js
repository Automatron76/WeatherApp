document.addEventListener("DOMContentLoaded", () => {
  // Take the city name from the URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const cityNameLowerCase = urlParams.get("city");

  // Function to capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Capitalize the first letter of the city name for display
  const cityNameCapitalized = capitalizeFirstLetter(cityNameLowerCase);
  // Display the capitalized city name 
  document.getElementById("cityName").textContent = cityNameCapitalized;

  //create a variable for each weather data to be displayed in the city focus.
  //currentCityData is a variable that contains the access to weather data object, by passing the cityName variable, this will change based on the city we selected, which in turn will provide the url Params.

  const currentCityData = weatherData[cityNameLowerCase + "_hourly"];
  const time = document.getElementById("time");
  const weatherCode = document.getElementById("weatherCode");
  const temperature_2m = document.getElementById("temperature_2m");
  const wind_speed_10m = document.getElementById("wind_speed_10m");
  const precipitation_probability = document.getElementById(
    "precipitation_probability"
  );
  const relative_humidity_2m = document.getElementById("relative_humidity_2m");

  // create a small object to map all different data to their own unit measurements so they will be displayed next to the actual value fetched from weatherData
  const unitSymbols = {
    temperature_2m: "°C",
    wind_speed_10m: "km/h",
    precipitation_probability: "%",
    relative_humidity_2m: "%",
  };

  //this area of the script is wrapped inside a setInterval function which repeat all of this code every 1 second. This fixed the time of the day which was being displayed only when the page loaded and was not being updated anymore.
  //therefore, all the others parameters were not changing either.
  setInterval(() => {
    const now = dayjs(); // Get the current time
    const currentIndexHour = now.format("H"); // Get the current hour in singular digit format  and use it as index to get the weatherCode. I had to use this instead of HH because a double digit time would have resulted in numbers such as 08, which was not working as index. This ensures we change weather code 24 times.
    const currentIndexDay = now.day();

    if (currentCityData) {
      const currentDataIndex =
        currentIndexDay * 24 + parseInt(currentIndexHour); // to get the correct index of the 160 values during the week, you calculate the following : day of the week * 24 hours + whichever hour is now.

      day.innerHTML = now.format("dddd"); //display Today's day
      time.innerHTML = `${now.format("HH:mm:ss")}`; //display current hour taken from the web browser
      weatherCode.innerHTML =
        currentCityData.hourly.weather_code[currentDataIndex]; // dinamically change the index accessed of the data based on which hour of the day we are in. For instance at hour 8, we will access index 8 of weather_data={weatherCode:[8]}
      temperature_2m.innerHTML = `${currentCityData.hourly.temperature_2m[currentDataIndex]} ${unitSymbols.temperature_2m}`;
      wind_speed_10m.innerHTML = `${currentCityData.hourly.wind_speed_10m[currentDataIndex]} ${unitSymbols.wind_speed_10m}`;
      precipitation_probability.innerHTML = `${currentCityData.hourly.precipitation_probability[currentDataIndex]} ${unitSymbols.precipitation_probability}`;
      relative_humidity_2m.innerHTML = `${currentCityData.hourly.relative_humidity_2m[currentDataIndex]} ${unitSymbols.relative_humidity_2m}`;

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

      // Find the element with weather icon id = weatherIcon
      const weatherIcon = document.getElementById("weatherIcon");

      // Define the path to the weather icons folder
      const iconFolderPath = "images/weather-icons/";

      // Set the weather icon source based on the weather code
      if (weatherCode !== undefined) {
        // Get the filename of the weather icon based on the weather code, which changes thanks to the variable currentIndexHour that follows the 24 hours of a day.
        const iconFilename = getWeatherIconFilename(
          currentCityData.hourly.weather_code[currentIndexHour]
        );

        // Construct the full path to the weather icon
        const iconPath = iconFolderPath + iconFilename;

        // Set the src attribute of the weather icon element to the final construct we just created
        weatherIcon.src = iconPath;
      } else {
        // If weather code is undefined, set a default icon. I used this while testing and it also appear one second before all the data is loaded.
        weatherIcon.src = iconFolderPath + "sun.png";
      }
    } else {
      console.error("Weather data for the current city not found."); // i used this for testing
    }
  }, 1000); // Repeat every 1000 milliseconds (1 second) to have a working clock that refresh , providing all the other parameters too thanks to currentIndexHour.
});
