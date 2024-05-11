document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get("city");

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]; //array with days of the week
  const container = document.getElementById("cardContainer"); //select the container under which to build the coulumns of each day


  daysOfWeek.forEach((day, index) => {
    //forEach day of the week,create a constant called card and create a <div> element with a Bulma column component
    const card = document.createElement("div");
    card.classList.add("column");
   
    // Populate weather data for the current day onto the card
     
    const dayData = weatherData[city.toLowerCase() + "_daily"].daily; //constant which pulls and holds the data of  these daily objects from weatherData.js 
       const weatherCode = dayData.weather_code[index];
      
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
           }}
        
           const iconFilename = getWeatherIconFilename(weatherCode);
   
    card.innerHTML = `
            <div class="card is-2">
                <div class="card-image">
                    <figure class="image">
                    <img src="/images/weather-icons/bigger-icons/${iconFilename}" alt="weatherIcon">
                    </figure>
                </div>
                <article class="media has-text-centered">
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <h1>${day}</h1>
                                <p>Weather code: <strong id="weatherCode_${day.toLowerCase()}"></strong> </p>
                                <p>Temperature: <strong id="temperature_2m_max_${day.toLowerCase()}"></strong></p>
                                <p>Wind: <strong id="wind_speed_10m_max_${day.toLowerCase()}"></strong></p>
                            </p>
                        </div>
                        <div class="content">
                            <p>Wind Direction: <strong id="wind_direction_10m_dominant_${day.toLowerCase()}"></strong></p>
                        </div>
                        <div class="content">
                            <p>Precipitation probability: <strong id="precipitation_probability_max_${day.toLowerCase()}"></strong></p>
                        </div>
                    </div>
                </article>
            </div>
        `;

    container.appendChild(card);

    
    const unitSymbols = {
      weather_code: "",
      temperature_2m_max: "°C",
      wind_speed_10m_max: "km/h",
      wind_direction_10m_dominant: "°",
      precipitation_probability_max: "%",
      relative_humidity_2m: "%",
    };

    const elementIds = {
      // map each object inside daily with their key:value pair to an id with the same name
      weather_code: `weatherCode_${day.toLowerCase()}`,
      temperature_2m_max: `temperature_2m_max_${day.toLowerCase()}`,
      wind_speed_10m_max: `wind_speed_10m_max_${day.toLowerCase()}`,
      wind_direction_10m_dominant: `wind_direction_10m_dominant_${day.toLowerCase()}`,
      precipitation_probability_max: `precipitation_probability_max_${day.toLowerCase()}`,
      
    };
    
    // Use Object.entries() to get the array of key-value pairs elementIds.
    // then use forEach() and loop. For each object in the array It iterates over each  key:value pair, and for each iteration, it destructures the array into two variables: propertyName and elementId.
    Object.entries(elementIds).forEach(([propertyName, elementId]) => {
      const element = document.getElementById(elementId);  //create a variable called element which retrieves the HTML element corresponding to the ID stored in elementId
      if (element) {   //if element exists
        const data = dayData[propertyName][index];  // create a variable called data which retrieves the data corresponding to the current propertyName from the dayData object and as index, use whichever day of the week we are accessing in the previous forEach.
        const unit = unitSymbols[propertyName];
        element.textContent = `${data} ${unit}`;
      }
    });
 

    

      


  });
});
