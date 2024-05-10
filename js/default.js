
document.addEventListener("DOMContentLoaded", () => {
    window.cityName = cityName;  // Declare cityName in a global scope

    // Take the current URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Take the city name from the URL parameters
    cityName = urlParams.get('city');

    // If cityName is null from the url , set a default value to "amsterdam"
    if (!cityName) {
        cityName = "amsterdam";

        // Update the URL parameters with the default city name
        urlParams.set('city', cityName);
        const newUrl = 'index.html' + '?' + urlParams.toString();
        window.location.href = newUrl;
    }

    // Get the element where you want to display the city name
    const cityNameElement = document.getElementById('cityName');

    // Update the content of the element with the city name
    cityNameElement.textContent = cityName;
});
