const getBtn = document.getElementById("js-new-quote");
const tempBtn = document.getElementById("js-temp");
const conditionBtn = document.getElementById("js-condition");
const humidityBtn = document.getElementById("js-humidity");
const input = document.getElementById("city-input");

const cityDisplay = document.getElementById("js-quote-text");
const infoDisplay = document.getElementById("js-answer-text");
const tempDisplay = document.getElementById("temp-display");
const conditionDisplay = document.getElementById("condition-display");
const humidityDisplay = document.getElementById("humidity-display");

let current = {
  city: "",
  temp: "",
  condition: "",
  humidity: "",
};

getBtn.addEventListener("click", getWeather);
tempBtn.addEventListener("click", showTemp);
conditionBtn.addEventListener("click", showCondition);
humidityBtn.addEventListener("click", showHumidity);

async function getWeather() {
  const city = input.value.trim() || "Boulder";
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




    current.city = name;
    current.temp = temp.toFixed(1);
    current.condition = desc;
    current.humidity = humidity;
    

    cityDisplay.textContent = current.city;

    infoDisplay.textContent = "";
        
  } catch (error) {
    cityDisplay.textContent = "";
    infoDisplay.textContent = "Could not find that city. Try again.";
  }
}


// individual functions to show temp, condition, humidity
function showTemp() {
  if (current.temp) {
    tempDisplay.textContent = `Temperature: ${current.temp}°F`;
  } else {
    tempDisplay.textContent = "Enter city first.";
  }
}

function showCondition() {
  if (current.condition) {
    conditionDisplay.textContent = `Condition: ${current.condition}`;
  } else {
    conditionDisplay.textContent = "Enter city first.";
  }
}

function showHumidity() {
  if (current.humidity) {
    humidityDisplay.textContent = `Humidity: ${current.humidity}%`;
  } else {
    humidityDisplay.textContent = "Enter city first.";
  }
} 


// function showDetails() {
//   infoDisplay.textContent = current.info;
// }

// cityDisplay.textContent = current.city;
// cityDisplay.classList.add("fade");

// function showDetails() {
//   infoDisplay.textContent = current.info;
//   infoDisplay.classList.add("fade");
// }