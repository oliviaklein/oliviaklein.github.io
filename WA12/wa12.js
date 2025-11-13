const getBtn = document.getElementById("js-new-quote");
const showBtn = document.getElementById("js-tweet");
const input = document.getElementById("city-input");

const cityDisplay = document.getElementById("js-quote-text");
const infoDisplay = document.getElementById("js-answer-text");

let current = {
  city: "",
  info: "",
};

getBtn.addEventListener("click", getWeather);
showBtn.addEventListener("click", showDetails);

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

    current.city = `${name}: ${temp.toFixed(1)}°F`;
    current.info = `Condition: ${desc}, Humidity: ${humidity}%`;

    cityDisplay.textContent = current.city;
    infoDisplay.textContent = "";

  } catch (error) {
    cityDisplay.textContent = "";
    infoDisplay.textContent = "Could not find that city. Try again.";
  }
}

function showDetails() {
  infoDisplay.textContent = current.info;
}