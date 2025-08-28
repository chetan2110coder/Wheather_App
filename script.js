const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temprature = document.querySelector('.temprature');
const description = document.querySelector('.description');
const humidity= document.querySelector('.humidity1');
const wind_speed = document.querySelector('.wind-speed');


async function checkweather(city){
   const  api_key= "8f9e910ec831c253a4b1359f5cbfff38"
    const  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}` ;

    const weather_data= await fetch(`${url}`).then(response => response.json());
     
    // At browser console you want to check so print below statement.
    console.log(weather_data);

    temprature.innerHTML = `${weather_data.main.temp}<sup>o</sup>C`;

     description.innerHTML=`${weather_data.weather[0].description}`

    humidity.innerHTML = `${weather_data.main.humidity}%`

    wind_speed.innerHTML = `${Math.round(weather_data.wind.speed)}Km/H`;

switch(weather_data.weather[0].main.toLowerCase()) {
  

    case 'clouds': 
        weather_img.src = "./images/clouds1.png";
        break;

    case 'rain': 
        weather_img.src = "./images/rainy_img.webp";
        break;

    case 'snow': 
        weather_img.src = "./images/stormy.png";
        break;

    case 'thunderstorm': 
        weather_img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5n8G6n2_ubfZINrS2CWMMFGfuLjvY31Ffgw&s";
        break;
   
}


}


searchBtn.addEventListener('click', () =>{
    checkweather(inputBox.value);
});