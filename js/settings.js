document.addEventListener("DOMContentLoaded", () => {
    // variable with the div 
    const container1 = document.getElementById("city-buttons");
    const container2 = document.getElementById("weather-buttons");

    // Create an array of city names
    const cityView = [
        "Amsterdam",
        "Berlin",
        "Copenhagen",
        "Cork",
        "New York",
        "Paris",
        "San Francisco",
        "Tromso",
        "Waterford"
    ];

    const weatherOptions = [
        "Temperature",
        "Wind Speed",
        "Precipitation Probability",
        "Sunrise",
        "Sunset",
        "Wind Direction",
        "Timezone",
        "Weather Code"
    ];

    // Loop through the city names array and create buttons for each city
    cityView.forEach((city, index) => {
        const card = document.createElement("div");
        const buttonId1 = `city-button-${index}`; // Unique id for each button
        card.innerHTML = `
            <button id="${buttonId1}" class="button is-info is-rounded">
                <label class="checkbox">
                    <input type="checkbox" />
                    ${city}
                </label>
            </button>
        `;
        container1.appendChild(card);
    });
    
    // Loop through the weather settings array and create buttons for each one
    weatherOptions.forEach((opt, index) => {
        const card = document.createElement("div");
        const buttonId2 = `weather-button-${index}`; // Unique id for each button
        card.innerHTML = `
            <button id="${buttonId2}" class="button is-info is-rounded">
                <label class="checkbox">
                    <input type="checkbox" />
                    ${opt}
                </label>
            </button>
        `;
        container2.appendChild(card);
    });
    
    

    // Add event listener to checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('click', (event)=> {
            console.log(event.target);
            console.log(event.target.id);
            console.log(event.target.checked);
        });
    });

    //function that will update the state in local storage.
   // Set the checkboxes based on their stored state in localStorage
   document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
    const cityName = checkbox.id.replace('checkbox-', '');
    const storageKey = `city-${cityName}`; // Unique key for each city
    const isChecked = localStorage.getItem(storageKey) === 'true';
    checkbox.checked = isChecked;
});

// Update localStorage when checkboxes are clicked
document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener('click', (event) => {
        const cityName = event.target.id.replace('checkbox-', '');
        const storageKey = `city-${cityName}`; // Unique key for each city
        const isChecked = event.target.checked;
        localStorage.setItem(storageKey, isChecked);
    });
});

    
    
      
      
      
});
