 
document.addEventListener("DOMContentLoaded", () => {
    const cityName = window.cityName;

    

    // Define an array of city names
    const cities = ["Amsterdam", "Berlin", "Copenhagen", "Cork", "New York", "Paris", "San Francisco", "Tromso", "Waterford"];

    // Remove spaces from the city name
    

    // Get the section where the cards will be appended
    const cardSection = document.getElementById("cardSection");

    // Iterate over the cities array and create a card for each city 
    cities.forEach(city => {
        let cityKey;
        if (city === "New York" || city === "San Francisco") {
            cityKey = city.replace(/\s/g, "_");
        } else {
            cityKey = city;
        }

        // Create card container with a div element and add class ="column is-4"
        const cardColumn = document.createElement("div");
        cardColumn.classList.add("column", "is-4");

        // Card HTML template using template literals
        cardColumn.innerHTML = `
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left"> 
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

        // Append the card container to the card section. So each card generated will be created between the cardSection element
        cardSection.appendChild(cardColumn);

        // Add click event listener to each city card
        cardColumn.addEventListener("click", () => {

            // Update the URL city parameter with the selected city. cityName is in default.js
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('city', cityName);
         
        });
    });
});
