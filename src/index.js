console.log("Hello from Marthania and the SheCodes Team!");
//weather data
function updateWeatherData(response){
    console.log(response.data.temperature.current);
    let temperatureElement=document.querySelector("#temperature");
    let temperature=response.data.temperature.current;
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let timeElement=document.querySelector("#time");
    let date=new Date(response.data.time*1000);
    let iconElement=document.querySelector("#icon");
    console.log(response.data);


    iconElement.innerHTML=`<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    timeElement.innerHTML=formatDate(date);
    humidityElement.innerHTML=response.data.temperature.humidity;
    windElement.innerHTML=response.data.wind.speed;
    descriptionElement.innerHTML=response.data.condition.description;
    cityElement.innerHTML=response.data.city;
    temperatureElement.innerHTML=Math.round(temperature);

    getForecast(response.data.city);
}
//format date
function formatDate(date){
    let hours=date.getHours();
    if(hours<10){
        hours=`0${hours}`;
    }
    let minutes=date.getMinutes();
    if(minutes<10){
        minutes=`0${minutes}`;
    }
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}
//api key
function searchCity(city){
    let apiKey  = "88bf2d049e3o03c506t04489abf0bb1a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeatherData); 
    }
//searchForm
function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput=document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}
//formatdate for forcast
function formatDateForForecast(timestamp){
    let date=new Date(timestamp*1000);
    let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return days[date.getDay()];
    
}
//forecastdata
function getForecast(city){
    let apiKey="88bf2d049e3o03c506t04489abf0bb1a";
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}
//forecast
function displayForecast(response){
let forecastHtml="";
response.data.daily.forEach(function(day,index){
    if(index<5){
    forecastHtml=forecastHtml+`
    <div class="weather-forecast-data">
    <div class="weather-forecast-day">${formatDateForForecast(day.time)}</div>
    <div class="weather-forecast-icon"><img src="${day.condition.icon_url}" style="width:68px"; /></div>
    <div class="weather-forecast-temperature">
    <div class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°</div>
    <div class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</div>
    </div>
    </div>`;}});

let forecastElement=document.querySelector("#forecast");
forecastElement.innerHTML=forecastHtml;}

let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);

searchCity("Bulawayo");
getForecast("Bulawayo");
setInterval(formatDate,10000);



