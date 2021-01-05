const api = {
    key: "f34eae90a5113e73c6a1bbc49c5d8f89",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery); // on a keypress, run function "setQuery"
  
  function setQuery(evt) {
    if (evt.keyCode == 13) { // 13 is the "enter-key"
      getResults(searchbox.value); // calling a function "getResults" with "searchbox.value" as parameter. "searchbox.value" is the city you typed in the search box
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => { //function(weather)
        return weather.json();
      }).then(displayResults); // calling function "displayResults"
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    console.log(weather);
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    console.log(weather.weather[1]);
    weather_el.innerText = weather.weather[0].main;
  
    let high = document.querySelector('.high');
    high.innerText =("High " + `${Math.round(weather.main.temp_min)}°c`);
    let low = document.querySelector('.low');
    low.innerText =("Low " + `${Math.round(weather.main.temp_max)}°c`);
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }