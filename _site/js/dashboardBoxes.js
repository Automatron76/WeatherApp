document.addEventListener("DOMContentLoaded", () => {
// Define an array of city names
const cities = [" Amsterdam","Berlin", "Copenhagen", "Cork", "New York", "Paris", "San Francisco", "Tromso", "Waterford"];

// Get the section where the cards will be appended
const cardSection = document.getElementById("cardSection");

// Iterate over the cities array and create a card for each city
cities.forEach(city => {
    // Create card container
    const cardColumn = document.createElement("div");
    cardColumn.classList.add("column", "is-4");

    // Card HTML template using template literals
    cardColumn.innerHTML = `
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img src="https://bulma.io/assets/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">${city}</p>
                        <p class="subtitle is-6">Insert weather here</p>
                    </div>
                </div>
                <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                </div>
            </div>
        </div>
    `;

    // Append the card container to the card section
    cardSection.appendChild(cardColumn);
})});
