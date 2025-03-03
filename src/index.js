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
    console.log(response.data);


    timeElement.innerHTML=formatDate(date);
    humidityElement.innerHTML=response.data.temperature.humidity;
    windElement.innerHTML=response.data.wind.speed;
    descriptionElement.innerHTML=response.data.condition.description;
    cityElement.innerHTML=response.data.city;
    temperatureElement.innerHTML=Math.round(temperature);
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

let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);

searchCity("Bulawayo")
