const getBtn = document.getElementById("js-new-quote");
const showBtn = document.getElementById("js-tweet");
const input = document.getElementById("city-input");

const cityDisplay = document.getElementById("js-quote-text");
const infoDisplay = document.getElementById("js-answer-text");
const messageDisplay = document.getElementById("js-message");
const lastList = document.getElementById("last-cities");
const clearBtn = document.getElementById("clear-history");

let current = {
  city: "",
  tempF: null,
  desc: "",
  humidity: "",
};

let lastCities = [];

getBtn.addEventListener("click", getWeather);
showBtn.addEventListener("click", showDetails);
clearBtn.addEventListener("click", clearHistory) 

async function getWeather() {
  const city = input.value.trim() || "New York";
  const apiKey = "ec2d56ad7c9c61b50a44ce3fcb6f60d8";

  try {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const geoResponse = await fetch(geoUrl);
    if (!geoResponse.ok) throw Error("City not found");
    const geoData = await geoResponse.json();

    if (!geoData.length) throw Error("City not found");
    const { lat, lon, name } = geoData[0];

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) throw Error("Weather data not available");
    const data = await weatherResponse.json();

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;

    // current.city = `${name}: ${temp.toFixed(1)}°F`;
    // current.info = `Condition: ${desc}, Humidity: ${humidity}%`;

    current.city = name;
    current.tempF = temp;
    current.desc = desc;
    current.humidity = humidity;

    cityDisplay.textContent = current.city;

    messageDisplay.textContent = getTempMessage(current.tempF);

    infoDisplay.textContent = "";

    document.getElementById("weather-box").style.opacity = "1";
    updateLastCities(current.city);


    showBtn.style.display = "inline-block";


  } catch (error) {
    cityDisplay.textContent = "";
    messageDisplay.textContent = "";
    infoDisplay.textContent = "Could not find that city. Try again.";
    document.getElementById("weather-box").style.opacity = "0";
    showBtn.style.display = "none";
  }
}

// generate message based on temperature that will pop up with city 
function getTempMessage(tempF) {
    if (tempF < 32) {
        return "BRRR, get out your winter jacket!";
    } else if (tempF < 60) {
        return "A bit chilly, wear a sweater!";
    } else if (tempF < 80) {
        return "Lovely weather!";
    } else {
        return "It's hot outside, stay hydrated!";
    }
}

// show weather details when button clicked
function showDetails() {
    if (current.tempF === null) {
     infoDisplay.textContent = "No weather data available.";
        return;
    }

    infoDisplay.innerHTML =
    `Temperature: ${current.tempF.toFixed(1)}°F<br>
    Condition: ${current.desc}<br>
    Humidity: ${current.humidity}%`;

    infoDisplay.classList.add("fade");
}

// history
function updateLastCities(cityName) {
    if (!cityName) return;
    lastCities=lastCities.filter(c => c !== cityName);
    lastCities.unshift(cityName);
    if (lastCities.length > 3) {
        lastCities=lastCities.slice(0, 3);
    }
    lastList.innerHTML = "";
    lastCities.forEach((city) => {
        const li = document.createElement("li");
        li.textContent = city;

    li.classList.add("history-item");

   li.addEventListener("click", () => {
        input.value = city;
        getWeather();
    });

    lastList.appendChild(li);
    });

    
    document.getElementById("last-box").style.opacity = "1";
    clearBtn.classList.remove("hidden");
}

// clear search history button
function clearHistory() {
    lastCities = [];
    lastList.innerHTML = "";
    clearBtn.classList.add("hidden");
    document.getElementById("last-box").style.opacity = "0"; 

    cityDisplay.textContent = "";
    messageDisplay.textContent = "";
    infoDisplay.textContent = "";

    current = {
      city: "",
      tempF: null,
      desc: "",
      humidity: "",
    };

    document.getElementById("weather-box").style.opacity = "0";
    showBtn.style.display = "none";

    input.value = "";
}

// // from WA5 clear data button
// const clearDataBtn = document.getElementById('clearDataBtn');
// if (clearDataBtn) {
//   clearDataBtn.addEventListener('click', () => {
//     localStorage.clear();
//     alert("Your saved data has been cleared!");
//     document.body.className = 'light';
// //   });
// // }