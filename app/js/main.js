const APIKEY = "57d6c5170d7fc70e734f2ffe8fbc3b98";
const APIURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(APIURL +  city +`&appid=${APIKEY}`);

    if(response.status  == 404) {
        document.querySelector(".error__city").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else {
        let data = await response.json();

        console.log(data);
    
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km\h";
    
        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
    
        document.querySelector('.weather').style.display = "block";
        document.querySelector(".error__city").style.display = "none";

    }


}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});
