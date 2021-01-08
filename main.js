
let celsiusValue = document.querySelector('#celsius');
let fahrenheitValue =document.querySelector('#fahrenheit');
let degreeButtons = document.querySelector('.degree-value'); 
let temp =document.querySelector('.current .temp');
let city=document.querySelector('.location .city');
let date=document.querySelector('.location .date');
let high= document.querySelector('.high');
let weather_el=document.querySelector('.current .weather');
let low= document.querySelector('.low');
let mainTemperature= "";
let calcuclatedTemperature= "";
let tempMax= "";
let tempMin= "";
let celsius = $("#celsius").hasClass("active");
    let fahrenheit = $("#fahrenheit").hasClass("active");






degreeButtons.style.display = "none";
const degree_button = document.querySelector('.slider');  
const searchbox = document.querySelector('.search-box');

const api = {
    key: "f34eae90a5113e73c6a1bbc49c5d8f89",
    base: "https://api.openweathermap.org/data/2.5/",
    unit: "metric",
  };

    
    
  
  
  searchbox.addEventListener('keypress', setQuery); // on a keypress, run function "setQuery"
  
  function setQuery(evt) {
    const celsius = $("#celsius").hasClass("active");
    const fahrenheit = $("#fahrenheit").hasClass("active");
    
    if (evt.keyCode == 13) { // 13 is the "enter-key"      
     //When already have searched for a city before
      if(!celsius && !fahrenheit)  {        
        celsiusValue.classList.add('active');
        console.log($('#celsius').hasClass('active'));
      }
      //-----------------------------------------------      
      degreeButtons.style.display = "flex"; 
      getResults(searchbox.value); // calling a function "getResults" with "searchbox.value" as parameter. "searchbox.value" is the city you typed in the search box    
    
  }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=${api.unit}&APPID=${api.key}`)
      .then(weather => { //function(weather) 
        return weather.json();
      }).then(displayResults); // calling function "displayResults"
  } 
  
  function displayResults (weather) {    
    
    //console.log(weather);
    city.innerText = `${weather.name}, ${weather.sys.country}`; 
    mainTemperature = `${weather.main.temp}`;
    tempMax = `${weather.main.temp_max}`;
    tempMin = `${weather.main.temp_min}`;
   
    //Date
    let now = new Date();    
    date.innerText = dateBuilder(now);   
    const celsius = $("#celsius").hasClass("active");
    const fahrenheit = $("#fahrenheit").hasClass("active");

    if(celsius){
      mainTemperature = `${Math.round(mainTemperature)}`;    
      temp.innerHTML = mainTemperature + `<span>°c</span>`;
      high.innerText =("High " + `${Math.round(tempMax )}°c`);    
      low.innerText =("Low " + `${Math.round(weather.main.temp_min)}°c`);
    }
    if(fahrenheit){      
      mainTemperature = `${Math.round(changeToFahrenheit(mainTemperature))}`; 
      temp.innerHTML = mainTemperature + `<span>°F</span>`;       
    }
      
    //console.log(weather.weather[1]);
    weather_el.innerText = weather.weather[0].main;   
    
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

   degree_button.addEventListener('click', () => {
    const celsius = $("#celsius").hasClass("active");
    const fahrenheit = $("#fahrenheit").hasClass("active");
    
     
     if(!celsius){
       console.log("celsius");
       fahrenheitValue.classList.remove("active");
       celsiusValue.classList.add("active");       
       mainTemperature = `${Math.round(changeToCelsius(mainTemperature))}`;
       temp.innerHTML = (`${mainTemperature}°c`)  ;
       high.innerText =("High " + `${Math.round(tempMax )}°c`);    
      low.innerText =("Low " + `${Math.round(tempMin)}°c`);
     }
     if(!fahrenheit){
       console.log("fahrenheit");
       celsiusValue.classList.remove("active");
       fahrenheitValue.classList.add("active");       
       mainTemperature =`${Math.round(changeToFahrenheit(mainTemperature))}`; 
       temp.innerHTML =  (`${mainTemperature}°F`)    ;
       high.innerText =("High " + `${Math.round(changeToFahrenheit(tempMax))}°F`);    
      low.innerText =("Low " + `${Math.round(changeToFahrenheit(tempMin))}°F`);
     }    
 });

 function changeToFahrenheit(celsius){
  var cTemp = celsius;
  var cToFahr = cTemp * 9 / 5 + 32;
  var message = cTemp+'\xB0C is ' + cToFahr   + ' \xB0F.';
  console.log(message);
  return cToFahr;
   
 }

 function changeToCelsius(fahrenheit) 
{
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
  var message = fTemp+'\xB0F is ' +  fToCel + '\xB0C.';
    console.log(message);
    return fToCel;
} 

  

  