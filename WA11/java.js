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
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

 try {
    const response = await fetch(url);
    if (!response.ok) {throw Error("City not found");
    }
    const data = await response.json();
    const cityName = data.name;
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;
    
    current.city = `${cityName}: ${temp}°C`;
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