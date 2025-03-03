//weather data
function updateWeatherData(response){
    console.log(response.data.temperature.current);
    let temperatureElement=document.querySelector("#temperature");
    let temperature=response.data.temperature.current;
    let cityElement=document.querySelector("#city");
    
    cityElement.innerHTML=response.data.city;
    temperatureElement.innerHTML=Math.round(temperature);
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
