
document.addEventListener("DOMContentLoaded", () => {
    const cityName = window.cityName;

    // Define an array of city names
    const cities = ["Amsterdam", "Berlin", "Copenhagen", "Cork", "New York", "Paris", "San Francisco", "Tromso", "Waterford"];

    // Remove spaces from the city name
    
    
    // Get the section where the cards will be appended
    const cardSection = document.getElementById("cardSection");

    // Iterate over the cities array and create a card for each city. I had to remove the space between two words cities because it was causing a bug in the focus card. Instead of pulling weatherData.new_york, it was attempting to access weatherData.new York which would break the function. I used regex https://www.w3schools.com/js/js_regexp.asp
    cities.forEach(city => {
        let cityKey;
        if (city === "New York" || city === "San Francisco") {
            cityKey = city.replace(/\s/g, "_").toLowerCase();
        } else {
            cityKey = city.toLowerCase();
        }
         
        dayjs.extend(window.dayjs_plugin_weekday)

        const now = dayjs().weekday(4);
        const currentIndexDay = now.day();
        ;

        const dayData = weatherData[cityKey.toLowerCase() + "_daily"].daily;
        const weatherCode = dayData.weather_code[currentIndexDay ]; 

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
        // Get the filename of the weather icon based on the weather code
        const iconFilename = getWeatherIconFilename(weatherCode);

        // Create card container with a div element and add class ="column is-4"
        const cardColumn = document.createElement("div");
        cardColumn.classList.add("column", "is-4");

        // Card HTML template using template literals
        cardColumn.innerHTML = `
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-right"> 
                         <figure class="image is-64x64">
                            <img src="/images/weather-icons/${iconFilename}" alt="Image" />
                         </figure>
                        </div>
                        <div class="media-content">
                            <a href="/index.html?city=${cityKey}" class="title is-4">${city}</a>   
                        </div>
                    </div>
                    <div class="content">
                    </div>
                </div>
            </div>
        `;

        // Append the card container to the  section with id = cardSection. So each card generated will be created between the cardSection element
        cardSection.appendChild(cardColumn);

        // Add click event listener to each city card
        cardColumn.addEventListener("click", () => {

            // Update the URL city parameter with the selected city. cityName is in default.js
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('city', cityName);
         
        });

        
    });
});
