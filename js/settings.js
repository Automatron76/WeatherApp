document.addEventListener("DOMContentLoaded", () => {
    const container1 = document.getElementById("city-buttons");
    const container2 = document.getElementById("weather-buttons");

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
        const checkboxId1 = `city-checkbox-${index}`; // Unique id for each checkbox
        card.innerHTML = `
            <button id="${buttonId1}" class="button is-info is-rounded">
                <label class="checkbox">
                    <input type="checkbox" id="${checkboxId1}" />
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
        const checkboxId2 = `weather-checkbox-${index}`; // Unique id for each checkbox
        card.innerHTML = `
            <button id="${buttonId2}" class="button is-info is-rounded">
                <label class="checkbox">
                    <input type="checkbox" id="${checkboxId2}" />
                    ${opt}
                </label>
            </button>
        `;
        container2.appendChild(card);
    });
    
    // Add event listener to checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('click', (event) => {
            console.log(event.target);
            console.log(event.target.id);
            console.log(event.target.checked);
            
            const idName = event.target.id.replace('id', ''); // Remove 'id' from ID name
            const isChecked =  event.target.checked;
            localStorage.setItem(idName, isChecked);
        });
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        const idName = checkbox.id.replace('id','');
        const isChecked = localStorage.getItem(idName) === 'true';
        checkbox.checked = isChecked;
      });

});
