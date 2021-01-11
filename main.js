
let celsiusValue = document.querySelector('#celsius');
let fahrenheitValue =document.querySelector('#fahrenheit');
let degreeButtons = document.querySelector('.degree-value'); 
let temp =document.querySelector('.current .temp');
let weather_el=document.querySelector('.current .weather');
let high= document.querySelector('.current .high');
let low= document.querySelector('.current .low');
let feels = document.querySelector('.current .feels');
let city=document.querySelector('.location .city');
let date=document.querySelector('.location .date');
// let icon =document.querySelector('.icon');
const celsius = $("#celsius").hasClass("active");
const fahrenheit = $("#fahrenheit").hasClass("active");
const degree_button = document.querySelector('.slider');  
const searchbox = document.querySelector('.search-box');
degreeButtons.style.display = "none";

let mainTemperature= "";
let tempMax= "";
let tempMin= "";
let weatherIcon ="";
let tempFeel="";


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
        
      }
      //-----------------------------------------------      
      degreeButtons.style.display = "flex"; 
      getResults(searchbox.value); // calling a function "getResults" with "searchbox.value" as parameter. "searchbox.value" is the city you typed in the search box    
    
  }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=${api.unit}&APPID=${api.key}`)
      .then(weather => { //function(weather) //.then("this can be anything, it contains the data")
        return weather.json(); //converts to json, easily used in javascript
      }).then(displayResults); // calling function "displayResults"
  } 
  
  function displayResults (weather) {   
    const celsius = $("#celsius").hasClass("active");
const fahrenheit = $("#fahrenheit").hasClass("active"); 
    
    console.log(weather);
    city.innerText = `${weather.name}, ${weather.sys.country}`; 
    mainTemperature = `${weather.main.temp}`;
    tempMax = `${weather.main.temp_max}`;
    tempMin = `${weather.main.temp_min}`;
    tempFeel = `${weather.main.feels_like}`;
    weather_el.innerText = weather.weather[0].main;   
    weatherIcon = weather.weather[0].description;
    console.log(weatherIcon);
    //Date
    let now = new Date();    
    date.innerText = dateBuilder(now);   
    
    

    //set Icon
    setIcons(weatherIcon, document.querySelector(".icon"));

    if(celsius){
      mainTemperature = `${Math.round(mainTemperature)}`;    
      temp.innerHTML = mainTemperature + `<span>°c</span>`;
      high.innerText =("High " + `${Math.round(tempMax )}°c`);    
      low.innerText =("Low " + `${Math.round(tempMin)}°c`);
      feels.innerText =("Feels like  " + `${Math.round(tempFeel)}°c`);
    }
    if(fahrenheit){      
      mainTemperature = `${Math.round(changeToFahrenheit(mainTemperature))}`; 
      temp.innerHTML = mainTemperature + `<span>°F</span>`;    
      high.innerText =("High " + `${Math.round(changeToFahrenheit(tempMax ))}°F`);    
      low.innerText =("Low " + `${Math.round(changeToFahrenheit(tempMin))}°F`);
      feels.innerText =("Feels like  " + `${Math.round(changeToFahrenheit(tempFeel))}°F`);   
    }
    
      
    //console.log(weather.weather[1]);
    
    
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
      feels.innerText = ("Feels like " + `${Math.round(tempFeel)}°c`);
     }
     if(!fahrenheit){
       console.log("fahrenheit");
       celsiusValue.classList.remove("active");
       fahrenheitValue.classList.add("active");       
       mainTemperature =`${Math.round(changeToFahrenheit(mainTemperature))}`; 
       temp.innerHTML =  (`${mainTemperature}°F`)    ;
       high.innerText =("High " + `${Math.round(changeToFahrenheit(tempMax))}°F`);    
      low.innerText =("Low " + `${Math.round(changeToFahrenheit(tempMin))}°F`);
      feels.innerText =("Feels like  " + `${Math.round(changeToFahrenheit(tempFeel))}°F`);
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

function setIcons(weatherIcon, iconID){
  var skycons = new Skycons({"color": "white"});
  //skycons.add(iconID, Skycons.PARTLY_CLOUDY_DAY);   
  if(weatherIcon.indexOf("rain") >= 0) {
		skycons.set(iconID, Skycons.RAIN);
	}

	else if (weatherIcon.indexOf("sunny") >= 0) {
		skycons.set(iconID, Skycons.CLEAR_DAY);
	}

	else if (weatherIcon.indexOf("clear") >= 0) {		
			skycons.set(iconID, Skycons.CLEAR_DAY);		
	}

	else if (weatherIcon.indexOf("cloud") >= 0) {		
			skycons.set(iconID, Skycons.PARTLY_CLOUDY_DAY);	
	}

	else if (weatherIcon.indexOf("thunderstorm") >= 0) {
		skycons.set(iconID, Skycons.SLEET);
	}

	else if (weatherIcon.indexOf("snow") >= 0) {
		skycons.set(iconID, Skycons.SNOW);
	}  
   
   return skycons.play();
   

 }

  

  