
# Weather App ⛅

Read me for the weather app assignment

 
 
## Features ⭐
 
- Index page with a clickable logo that will redirect to the main page
- Header with 3 buttons for each available page
- Main page with a focus card showcasing real-time day of the week along with the hours, minutes and seconds.
- It also display weather icon dynamically, based on the day of the week and the hour, by fetching the weather code provided inside the _hourly dataset.
-  The focus card showcases dynamically 5 different data points fetched from the _hourly dataset so the values displayed are also based on the day and the hour we are in.
- Both features have been implemented by using day.js.
- In the same page, 7 cards are displaying the weather forecast of the next 7 days by fetching data from _daily dataset
- Dashboard page showcases 9 cards, one for each city.
- Cards can be clicked and thanks to url categorization implemented, user will be redirected to the main page and data will be populated in the focus card and the 7 days of the week dynamically.
- Cards in the Display page showcase weather icon based on the weather code of that day (Sunday has index 0 Saturday 6)
- Settings page has buttons for all the cities and settings, however they are not working. I ran out of time to implement this feature.

## Known bugs 🐛

 - 🛠️City names in the main page are lower case. 
 
  While implementing the url categorisation, I first set up an array with all the cities called cities=[ ], then I passed it in a forEach loop to generate all 9 cards.

When the cards are clicked, the url looked like this "?city=Amsterdam ".

This was causing a problem in the main page where data needed to be accessed with the lower case city name as parameter, such as weatherData_amsterdam_daily{}.

So I used this function to pass the city names in lower case :

```js
let cityKey;
        if (city === "New York" || city === "San Francisco") {
            cityKey = city.replace(/\s/g, "_").toLowerCase();
        } else {
            cityKey = city.toLowerCase();
        }
```

I also had to implement a regex to replace the space between two words cities with a lowercase _ due to the fact that "weatherData_New York_daily" is not acceptable. Furthermore I could not get rid of the _ in the focus card.

This fixed the issue of  fetching data in the main page, however when I tried to display the city name with the first capital letter, for some reason I could not get this to work.

here is the function I tried to implement inside focusWeather.js :

```js
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Capitalize the first letter of the city name for display
  const cityNameCapitalized = capitalizeFirstLetter(cityNameLowerCase);
  // Display the capitalized city name 
  document.getElementById("cityName").textContent = cityNameCapitalized;
  ```

  - 🛠️ one line of css
  
  I had to implement one line of css to make the footer stick to the bottom of the page.
  This is the solution I used : https://stackoverflow.com/questions/71514407/how-to-use-bulmas-flexbox-to-make-footer-stick-to-bottom-of-page
 I could not find another way to do it without css.

- 🛠️Settings buttons do not work
I ran out of time to implement logic to the buttons.
I only managed to implement local storage, but even if they are clicked, nothing happens.

- 🛠️ Days of the week starts with Sunday  
 According to Day.js docs ( https://day.js.org/docs/en/get-set/day) days of the week start from index 0 as Sunday to Saturday as 6 :" Accepts numbers from 0 (Sunday) to 6 (Saturday)".The cards in my dashboard were displaying icons that were not corresponding to the weather code in weather_data, because the weather code accessed was being associated with the wrong day. Saturday would provide index 6, Sunday index 0. I could not figure out how to fix this.

dashboard HTML

```html
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/plugin/weekday.js"></script>
    <script>dayjs.extend(window.dayjs_plugin_weekday)</script>
```

dashboardBoxes javascript
```js
  dayjs.extend(window.dayjs_plugin_weekday)

        const now = dayjs().weekday(4);
        const currentIndexDay = now.day();
        ;

        const dayData = weatherData[cityKey.toLowerCase() + "_daily"].daily;
        const weatherCode = dayData.weather_code[currentIndexDay ]; 
```

This ensures that in the dashboard, the icons are displayed following the correct weather code from Monday to Sunday. Without this implementation, Sunday will generate index 0 which from my understanding, in the weather code results as a Monday.

## Acknowledgements 📗

 - [Summer icon](https://icons8.com/icon/cWfpk9mCJWJm/summer)
 - [Partly cloudy icon](https://icons8.com/icon/zIVmoh4T8wh7/partly-cloudy-day)
 - [Fog icon](https://icons8.com/icon/qHIFUjYhnsFU/fog)
 - [Light rain icon](https://icons8.com/icon/QZJFPE7TNi5Q/light-rain)
 - [Light snow icon](https://icons8.com/icon/JBQOSn7KOSuD/light-snow)
 - [Rain icon](https://icons8.com/icon/kKxyuLXD4w0n/rain)
 - [Heavy rain icon](https://icons8.com/icon/7Dcax1eBasEf/heavy-rain)
 - [Snow icon](https://icons8.com/icon/cyZConbteZk9/snow)
 - [Rainfall icon](https://icons8.com/icon/ycLdTupX7dng/rainfall)
 - [Storm icon](https://icons8.com/icon/DlsFhDMp4rhs/storm)
 - [Storm with heavy rain icon](https://icons8.com/icon/6AAyqKfBlzoB/storm-with-heavy-rain)
 



